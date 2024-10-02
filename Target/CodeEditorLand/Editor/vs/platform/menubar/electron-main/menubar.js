var F=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var U=(y,M,e,n)=>{for(var i=n>1?void 0:n?D(M,e):M,o=y.length-1,t;o>=0;o--)(t=y[o])&&(i=(n?t(M,e,i):t(i))||i);return n&&i&&F(M,e,i),i},h=(y,M)=>(e,n)=>M(e,n,y);import{app as z,BrowserWindow as k,Menu as l,MenuItem as r}from"electron";import"../../../base/common/actions.js";import{RunOnceScheduler as T}from"../../../base/common/async.js";import{CancellationToken as L}from"../../../base/common/cancellation.js";import{mnemonicMenuLabel as E}from"../../../base/common/labels.js";import{isMacintosh as d,language as R}from"../../../base/common/platform.js";import{URI as K}from"../../../base/common/uri.js";import*as s from"../../../nls.js";import{IAuxiliaryWindowsMainService as O}from"../../auxiliaryWindow/electron-main/auxiliaryWindows.js";import{IConfigurationService as N}from"../../configuration/common/configuration.js";import{IEnvironmentMainService as x}from"../../environment/electron-main/environmentMainService.js";import{ILifecycleMainService as B}from"../../lifecycle/electron-main/lifecycleMainService.js";import{ILogService as q}from"../../log/common/log.js";import{isMenubarMenuItemAction as P,isMenubarMenuItemRecentAction as V,isMenubarMenuItemSeparator as G,isMenubarMenuItemSubmenu as $}from"../common/menubar.js";import{INativeHostMainService as _}from"../../native/electron-main/nativeHostMainService.js";import{IProductService as Q}from"../../product/common/productService.js";import{IStateService as j}from"../../state/node/state.js";import{ITelemetryService as Y}from"../../telemetry/common/telemetry.js";import{IUpdateService as Z,StateType as f}from"../../update/common/update.js";import{hasNativeTitlebar as H}from"../../window/common/window.js";import{IWindowsMainService as J,OpenContext as W}from"../../windows/electron-main/windows.js";import{IWorkspacesHistoryMainService as X}from"../../workspaces/electron-main/workspacesHistoryMainService.js";import{Disposable as ee}from"../../../base/common/lifecycle.js";const C="menu";let I=class extends ee{constructor(e,n,i,o,t,a,c,u,w,p,m,v){super();this.updateService=e;this.configurationService=n;this.windowsMainService=i;this.environmentMainService=o;this.telemetryService=t;this.workspacesHistoryMainService=a;this.stateService=c;this.lifecycleMainService=u;this.logService=w;this.nativeHostMainService=p;this.productService=m;this.auxiliaryWindowsMainService=v;this.menuUpdater=new T(()=>this.doUpdateMenu(),0),this.menuGC=new T(()=>{this.oldMenus=[]},1e4),this.menubarMenus=Object.create(null),this.keybindings=Object.create(null),(d||H(n))&&this.restoreCachedMenubarData(),this.addFallbackHandlers(),this.closedLastWindow=!1,this.noActiveMainWindow=!1,this.oldMenus=[],this.install(),this.registerListeners()}static lastKnownMenubarStorageKey="lastKnownMenubarData";willShutdown;appMenuInstalled;closedLastWindow;noActiveMainWindow;menuUpdater;menuGC;oldMenus;menubarMenus;keybindings;fallbackMenuHandlers=Object.create(null);restoreCachedMenubarData(){const e=this.stateService.getItem(I.lastKnownMenubarStorageKey);e&&(e.menus&&(this.menubarMenus=e.menus),e.keybindings&&(this.keybindings=e.keybindings))}addFallbackHandlers(){this.fallbackMenuHandlers["workbench.action.files.newUntitledFile"]=(a,c,u)=>{this.runActionInRenderer({type:"commandId",commandId:"workbench.action.files.newUntitledFile"})||this.windowsMainService.openEmptyWindow({context:W.MENU,contextWindowId:c?.id})},this.fallbackMenuHandlers["workbench.action.newWindow"]=(a,c,u)=>this.windowsMainService.openEmptyWindow({context:W.MENU,contextWindowId:c?.id}),this.fallbackMenuHandlers["workbench.action.files.openFileFolder"]=(a,c,u)=>this.nativeHostMainService.pickFileFolderAndOpen(void 0,{forceNewWindow:this.isOptionClick(u),telemetryExtraData:{from:C}}),this.fallbackMenuHandlers["workbench.action.files.openFolder"]=(a,c,u)=>this.nativeHostMainService.pickFolderAndOpen(void 0,{forceNewWindow:this.isOptionClick(u),telemetryExtraData:{from:C}}),this.fallbackMenuHandlers["workbench.action.openWorkspace"]=(a,c,u)=>this.nativeHostMainService.pickWorkspaceAndOpen(void 0,{forceNewWindow:this.isOptionClick(u),telemetryExtraData:{from:C}}),this.fallbackMenuHandlers["workbench.action.clearRecentFiles"]=()=>this.workspacesHistoryMainService.clearRecentlyOpened({confirm:!0});const e=this.productService.youTubeUrl;e&&(this.fallbackMenuHandlers["workbench.action.openYouTubeUrl"]=()=>this.openUrl(e,"openYouTubeUrl"));const n=this.productService.requestFeatureUrl;n&&(this.fallbackMenuHandlers["workbench.action.openRequestFeatureUrl"]=()=>this.openUrl(n,"openUserVoiceUrl"));const i=this.productService.reportIssueUrl;i&&(this.fallbackMenuHandlers["workbench.action.openIssueReporter"]=()=>this.openUrl(i,"openReportIssues"));const o=this.productService.licenseUrl;o&&(this.fallbackMenuHandlers["workbench.action.openLicenseUrl"]=()=>{if(R){const a=o.indexOf("?")>0?"&":"?";this.openUrl(`${o}${a}lang=${R}`,"openLicenseUrl")}else this.openUrl(o,"openLicenseUrl")});const t=this.productService.privacyStatementUrl;t&&o&&(this.fallbackMenuHandlers["workbench.action.openPrivacyStatementUrl"]=()=>{this.openUrl(t,"openPrivacyStatement")})}registerListeners(){this._register(this.lifecycleMainService.onWillShutdown(()=>this.willShutdown=!0)),this._register(this.windowsMainService.onDidChangeWindowsCount(e=>this.onDidChangeWindowsCount(e))),this._register(this.nativeHostMainService.onDidBlurMainWindow(()=>this.onDidChangeWindowFocus())),this._register(this.nativeHostMainService.onDidFocusMainWindow(()=>this.onDidChangeWindowFocus()))}get currentEnableMenuBarMnemonics(){const e=this.configurationService.getValue("window.enableMenuBarMnemonics");return typeof e!="boolean"?!0:e}get currentEnableNativeTabs(){if(!d)return!1;const e=this.configurationService.getValue("window.nativeTabs");return typeof e!="boolean"?!1:e}updateMenu(e,n){this.menubarMenus=e.menus,this.keybindings=e.keybindings,this.stateService.setItem(I.lastKnownMenubarStorageKey,e),this.scheduleUpdateMenu()}scheduleUpdateMenu(){this.menuUpdater.schedule()}doUpdateMenu(){this.willShutdown||setTimeout(()=>{this.willShutdown||this.install()},10)}onDidChangeWindowsCount(e){d&&(e.oldCount===0&&e.newCount>0||e.oldCount>0&&e.newCount===0)&&(this.closedLastWindow=e.newCount===0,this.scheduleUpdateMenu())}onDidChangeWindowFocus(){if(!d)return;const e=k.getFocusedWindow();this.noActiveMainWindow=!e||!!this.auxiliaryWindowsMainService.getWindowByWebContents(e.webContents),this.scheduleUpdateMenu()}install(){const e=l.getApplicationMenu();if(e&&this.oldMenus.push(e),Object.keys(this.menubarMenus).length===0){this.doSetApplicationMenu(d?new l:null);return}const n=new l;let i;if(d){const t=new l;i=new r({label:this.productService.nameShort,submenu:t}),this.setMacApplicationMenu(t),n.append(i)}if(d&&!this.appMenuInstalled){this.appMenuInstalled=!0;const t=new l;t.append(new r({label:this.mnemonicLabel(s.localize({key:"miNewWindow",comment:["&& denotes a mnemonic"]},"New &&Window")),click:()=>this.windowsMainService.openEmptyWindow({context:W.DOCK})})),z.dock.setMenu(t)}if(this.shouldDrawMenu("File")){const t=new l,a=new r({label:this.mnemonicLabel(s.localize({key:"mFile",comment:["&& denotes a mnemonic"]},"&&File")),submenu:t});this.setMenuById(t,"File"),n.append(a)}if(this.shouldDrawMenu("Edit")){const t=new l,a=new r({label:this.mnemonicLabel(s.localize({key:"mEdit",comment:["&& denotes a mnemonic"]},"&&Edit")),submenu:t});this.setMenuById(t,"Edit"),n.append(a)}if(this.shouldDrawMenu("Selection")){const t=new l,a=new r({label:this.mnemonicLabel(s.localize({key:"mSelection",comment:["&& denotes a mnemonic"]},"&&Selection")),submenu:t});this.setMenuById(t,"Selection"),n.append(a)}if(this.shouldDrawMenu("View")){const t=new l,a=new r({label:this.mnemonicLabel(s.localize({key:"mView",comment:["&& denotes a mnemonic"]},"&&View")),submenu:t});this.setMenuById(t,"View"),n.append(a)}if(this.shouldDrawMenu("Go")){const t=new l,a=new r({label:this.mnemonicLabel(s.localize({key:"mGoto",comment:["&& denotes a mnemonic"]},"&&Go")),submenu:t});this.setMenuById(t,"Go"),n.append(a)}if(this.shouldDrawMenu("Run")){const t=new l,a=new r({label:this.mnemonicLabel(s.localize({key:"mRun",comment:["&& denotes a mnemonic"]},"&&Run")),submenu:t});this.setMenuById(t,"Run"),n.append(a)}if(this.shouldDrawMenu("Terminal")){const t=new l,a=new r({label:this.mnemonicLabel(s.localize({key:"mTerminal",comment:["&& denotes a mnemonic"]},"&&Terminal")),submenu:t});this.setMenuById(t,"Terminal"),n.append(a)}let o;if(this.shouldDrawMenu("Window")){const t=new l;o=new r({label:this.mnemonicLabel(s.localize("mWindow","Window")),submenu:t,role:"window"}),this.setMacWindowMenu(t)}if(o&&n.append(o),this.shouldDrawMenu("Help")){const t=new l,a=new r({label:this.mnemonicLabel(s.localize({key:"mHelp",comment:["&& denotes a mnemonic"]},"&&Help")),submenu:t,role:"help"});this.setMenuById(t,"Help"),n.append(a)}n.items&&n.items.length>0?this.doSetApplicationMenu(n):this.doSetApplicationMenu(null),this.menuGC.schedule()}doSetApplicationMenu(e){if(l.setApplicationMenu(e),e)for(const n of this.auxiliaryWindowsMainService.getWindows())n.win?.setMenu(null)}setMacApplicationMenu(e){const n=this.createMenuItem(s.localize("mAbout","About {0}",this.productService.nameLong),"workbench.action.showAboutDialog"),i=this.getUpdateMenuItems();let o;if(this.shouldDrawMenu("Preferences")){const v=new l;this.setMenuById(v,"Preferences"),o=new r({label:this.mnemonicLabel(s.localize({key:"miPreferences",comment:["&& denotes a mnemonic"]},"&&Preferences")),submenu:v})}const t=new l,a=new r({label:s.localize("mServices","Services"),role:"services",submenu:t}),c=new r({label:s.localize("mHide","Hide {0}",this.productService.nameLong),role:"hide",accelerator:"Command+H"}),u=new r({label:s.localize("mHideOthers","Hide Others"),role:"hideOthers",accelerator:"Command+Alt+H"}),w=new r({label:s.localize("mShowAll","Show All"),role:"unhide"}),p=new r(this.likeAction("workbench.action.quit",{label:s.localize("miQuit","Quit {0}",this.productService.nameLong),click:async(v,A,g)=>{const S=this.windowsMainService.getLastActiveWindow();(this.windowsMainService.getWindowCount()===0||k.getFocusedWindow()||S?.win?.isMinimized())&&await this.confirmBeforeQuit(g)&&this.nativeHostMainService.quit(void 0)}})),m=[n];m.push(...i),o&&m.push(b(),o),m.push(b(),a,b(),c,u,w,b(),p),m.forEach(v=>e.append(v))}async confirmBeforeQuit(e){if(this.windowsMainService.getWindowCount()===0)return!0;const n=this.configurationService.getValue("window.confirmBeforeClose");if(n==="always"||n==="keyboardOnly"&&this.isKeyboardEvent(e)){const{response:i}=await this.nativeHostMainService.showMessageBox(this.windowsMainService.getFocusedWindow()?.id,{type:"question",buttons:[s.localize({key:"quit",comment:["&& denotes a mnemonic"]},"&&Quit"),s.localize("cancel","Cancel")],message:s.localize("quitMessage","Are you sure you want to quit?")});return i===0}return!0}shouldDrawMenu(e){if(!d&&!H(this.configurationService))return!1;switch(e){case"File":case"Help":if(d)return this.windowsMainService.getWindowCount()===0&&this.closedLastWindow||this.windowsMainService.getWindowCount()>0&&this.noActiveMainWindow||!!this.menubarMenus&&!!this.menubarMenus[e];case"Window":if(d)return this.windowsMainService.getWindowCount()===0&&this.closedLastWindow||this.windowsMainService.getWindowCount()>0&&this.noActiveMainWindow||!!this.menubarMenus;default:return this.windowsMainService.getWindowCount()>0&&!!this.menubarMenus&&!!this.menubarMenus[e]}}setMenu(e,n){n.forEach(i=>{if(G(i))e.append(b());else if($(i)){const o=new l,t=new r({label:this.mnemonicLabel(i.label),submenu:o});this.setMenu(o,i.submenu.items),e.append(t)}else V(i)?e.append(this.createOpenRecentMenuItem(i)):P(i)&&(i.id==="workbench.action.showAboutDialog"&&this.insertCheckForUpdatesItems(e),d?this.windowsMainService.getWindowCount()===0&&this.closedLastWindow||this.windowsMainService.getWindowCount()>0&&this.noActiveMainWindow?this.fallbackMenuHandlers[i.id]?e.append(new r(this.likeAction(i.id,{label:this.mnemonicLabel(i.label),click:this.fallbackMenuHandlers[i.id]}))):e.append(this.createMenuItem(i.label,i.id,!1,i.checked)):e.append(this.createMenuItem(i.label,i.id,i.enabled!==!1,!!i.checked)):e.append(this.createMenuItem(i.label,i.id,i.enabled!==!1,!!i.checked)))})}setMenuById(e,n){this.menubarMenus&&this.menubarMenus[n]&&this.setMenu(e,this.menubarMenus[n].items)}insertCheckForUpdatesItems(e){const n=this.getUpdateMenuItems();n.length&&(n.forEach(i=>e.append(i)),e.append(b()))}createOpenRecentMenuItem(e){const n=K.revive(e.uri),i=e.id,o=i==="openRecentFile"?{fileUri:n}:i==="openRecentWorkspace"?{workspaceUri:n}:{folderUri:n};return new r(this.likeAction(i,{label:e.label,click:async(t,a,c)=>{const u=this.isOptionClick(c);(await this.windowsMainService.open({context:W.MENU,cli:this.environmentMainService.args,urisToOpen:[o],forceNewWindow:u,gotoLineMode:!1,remoteAuthority:e.remoteAuthority})).length>0||await this.workspacesHistoryMainService.removeRecentlyOpened([n])}},!1))}isOptionClick(e){return!!(e&&(!d&&(e.ctrlKey||e.shiftKey)||d&&(e.metaKey||e.altKey)))}isKeyboardEvent(e){return!!(e.triggeredByAccelerator||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)}createRoleMenuItem(e,n,i){const o={label:this.mnemonicLabel(e),role:i,enabled:!0};return new r(this.withKeybinding(n,o))}setMacWindowMenu(e){const n=new r({label:s.localize("mMinimize","Minimize"),role:"minimize",accelerator:"Command+M",enabled:this.windowsMainService.getWindowCount()>0}),i=new r({label:s.localize("mZoom","Zoom"),role:"zoom",enabled:this.windowsMainService.getWindowCount()>0}),o=new r({label:s.localize("mBringToFront","Bring All to Front"),role:"front",enabled:this.windowsMainService.getWindowCount()>0}),t=this.createMenuItem(s.localize({key:"miSwitchWindow",comment:["&& denotes a mnemonic"]},"Switch &&Window..."),"workbench.action.switchWindow"),a=[];this.currentEnableNativeTabs&&(a.push(b()),a.push(this.createMenuItem(s.localize("mNewTab","New Tab"),"workbench.action.newWindowTab")),a.push(this.createRoleMenuItem(s.localize("mShowPreviousTab","Show Previous Tab"),"workbench.action.showPreviousWindowTab","selectPreviousTab")),a.push(this.createRoleMenuItem(s.localize("mShowNextTab","Show Next Tab"),"workbench.action.showNextWindowTab","selectNextTab")),a.push(this.createRoleMenuItem(s.localize("mMoveTabToNewWindow","Move Tab to New Window"),"workbench.action.moveWindowTabToNewWindow","moveTabToNewWindow")),a.push(this.createRoleMenuItem(s.localize("mMergeAllWindows","Merge All Windows"),"workbench.action.mergeAllWindowTabs","mergeAllWindows"))),[n,i,b(),t,...a,b(),o].forEach(c=>e.append(c))}getUpdateMenuItems(){switch(this.updateService.state.type){case f.Idle:return[new r({label:this.mnemonicLabel(s.localize("miCheckForUpdates","Check for &&Updates...")),click:()=>setTimeout(()=>{this.reportMenuActionTelemetry("CheckForUpdate"),this.updateService.checkForUpdates(!0)},0)})];case f.CheckingForUpdates:return[new r({label:s.localize("miCheckingForUpdates","Checking for Updates..."),enabled:!1})];case f.AvailableForDownload:return[new r({label:this.mnemonicLabel(s.localize("miDownloadUpdate","D&&ownload Available Update")),click:()=>{this.updateService.downloadUpdate()}})];case f.Downloading:return[new r({label:s.localize("miDownloadingUpdate","Downloading Update..."),enabled:!1})];case f.Downloaded:return d?[]:[new r({label:this.mnemonicLabel(s.localize("miInstallUpdate","Install &&Update...")),click:()=>{this.reportMenuActionTelemetry("InstallUpdate"),this.updateService.applyUpdate()}})];case f.Updating:return[new r({label:s.localize("miInstallingUpdate","Installing Update..."),enabled:!1})];case f.Ready:return[new r({label:this.mnemonicLabel(s.localize("miRestartToUpdate","Restart to &&Update")),click:()=>{this.reportMenuActionTelemetry("RestartToUpdate"),this.updateService.quitAndInstall()}})];default:return[]}}createMenuItem(e,n,i,o){const t=this.mnemonicLabel(e),a=typeof n=="function"?n:(m,v,A)=>{const g=m?m.userSettingsLabel:null;let S=n;Array.isArray(n)&&(S=this.isOptionClick(A)?n[1]:n[0]),g&&A.triggeredByAccelerator?this.runActionInRenderer({type:"keybinding",userSettingsLabel:g}):this.runActionInRenderer({type:"commandId",commandId:S})},c=typeof i=="boolean"?i:this.windowsMainService.getWindowCount()>0,u=typeof o=="boolean"?o:!1,w={label:t,click:a,enabled:c};u&&(w.type="checkbox",w.checked=u);let p;return typeof n=="string"?p=n:Array.isArray(n)&&(p=n[0]),d&&(p==="editor.action.clipboardCutAction"?w.role="cut":p==="editor.action.clipboardCopyAction"?w.role="copy":p==="editor.action.clipboardPasteAction"&&(w.role="paste"),p==="undo"?w.click=this.makeContextAwareClickHandler(a,{inDevTools:m=>m.undo(),inNoWindow:()=>l.sendActionToFirstResponder("undo:")}):p==="redo"?w.click=this.makeContextAwareClickHandler(a,{inDevTools:m=>m.redo(),inNoWindow:()=>l.sendActionToFirstResponder("redo:")}):p==="editor.action.selectAll"&&(w.click=this.makeContextAwareClickHandler(a,{inDevTools:m=>m.selectAll(),inNoWindow:()=>l.sendActionToFirstResponder("selectAll:")}))),new r(this.withKeybinding(p,w))}makeContextAwareClickHandler(e,n){return(i,o,t)=>{const a=k.getFocusedWindow();if(!a)return n.inNoWindow();if(a.webContents.isDevToolsFocused()&&a.webContents.devToolsWebContents)return n.inDevTools(a.webContents.devToolsWebContents);e(i,o||a,t)}}runActionInRenderer(e){let n=k.getFocusedWindow();if(n){const o=this.auxiliaryWindowsMainService.getWindowByWebContents(n.webContents);o&&(n=this.windowsMainService.getWindowById(o.parentId)?.win??null)}if(!n){const o=this.windowsMainService.getLastActiveWindow();o?.win?.isMinimized()&&(n=o.win)}const i=n?this.windowsMainService.getWindowById(n.id):void 0;if(i){if(this.logService.trace("menubar#runActionInRenderer",e),d&&!this.environmentMainService.isBuilt&&!i.isReady&&(e.type==="commandId"&&e.commandId==="workbench.action.toggleDevTools"||e.type!=="commandId"&&e.userSettingsLabel==="alt+cmd+i"))return!1;if(e.type==="commandId"){const o={id:e.commandId,from:"menu"};i.sendWhenReady("vscode:runAction",L.None,o)}else{const o={userSettingsLabel:e.userSettingsLabel};i.sendWhenReady("vscode:runKeybinding",L.None,o)}return!0}else return this.logService.trace("menubar#runActionInRenderer: no active window found",e),!1}withKeybinding(e,n){const i=typeof e=="string"?this.keybindings[e]:void 0;if(i?.label){if(i.isNative!==!1)n.accelerator=i.label,n.userSettingsLabel=i.userSettingsLabel;else if(typeof n.label=="string"){const o=n.label.indexOf("[");o>=0?n.label=`${n.label.substr(0,o)} [${i.label}]`:n.label=`${n.label} [${i.label}]`}}else n.accelerator=void 0;return n}likeAction(e,n,i=!n.accelerator){i&&(n=this.withKeybinding(e,n));const o=n.click;return n.click=(t,a,c)=>{this.reportMenuActionTelemetry(e),o?.(t,a,c)},n}openUrl(e,n){this.nativeHostMainService.openExternal(void 0,e),this.reportMenuActionTelemetry(n)}reportMenuActionTelemetry(e){this.telemetryService.publicLog2("workbenchActionExecuted",{id:e,from:C})}mnemonicLabel(e){return E(e,!this.currentEnableMenuBarMnemonics)}};I=U([h(0,Z),h(1,N),h(2,J),h(3,x),h(4,Y),h(5,X),h(6,j),h(7,B),h(8,q),h(9,_),h(10,Q),h(11,O)],I);function b(){return new r({type:"separator"})}export{I as Menubar};
