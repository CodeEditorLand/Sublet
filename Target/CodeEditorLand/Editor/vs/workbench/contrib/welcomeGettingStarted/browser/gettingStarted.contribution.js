var q=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var O=(t,e,o,r)=>{for(var n=r>1?void 0:r?F(e,o):e,s=t.length-1,a;s>=0;s--)(a=t[s])&&(n=(r?a(e,o,n):a(n))||n);return r&&n&&q(e,o,n),n},v=(t,e)=>(o,r)=>e(o,r,t);import{localize as c,localize2 as f}from"../../../../nls.js";import{GettingStartedInputSerializer as K,GettingStartedPage as k,inWelcomeContext as Q}from"./gettingStarted.js";import{Registry as b}from"../../../../platform/registry/common/platform.js";import{EditorExtensions as M}from"../../../common/editor.js";import{MenuId as B,registerAction2 as h,Action2 as S}from"../../../../platform/actions/common/actions.js";import{IInstantiationService as z}from"../../../../platform/instantiation/common/instantiation.js";import{ContextKeyExpr as H,IContextKeyService as G,RawContextKey as L}from"../../../../platform/contextkey/common/contextkey.js";import{IEditorService as E,SIDE_GROUP as I}from"../../../services/editor/common/editorService.js";import{KeybindingWeight as N}from"../../../../platform/keybinding/common/keybindingsRegistry.js";import{KeyCode as _}from"../../../../base/common/keyCodes.js";import{EditorPaneDescriptor as $}from"../../../browser/editor.js";import{SyncDescriptor as j}from"../../../../platform/instantiation/common/descriptors.js";import{IWalkthroughsService as x}from"./gettingStartedService.js";import{GettingStartedInput as p}from"./gettingStartedInput.js";import{registerWorkbenchContribution2 as C,WorkbenchPhase as P}from"../../../common/contributions.js";import{ConfigurationScope as R,Extensions as J}from"../../../../platform/configuration/common/configurationRegistry.js";import{workbenchConfigurationNodeBase as X}from"../../../common/configuration.js";import{IEditorGroupsService as Y}from"../../../services/editor/common/editorGroupsService.js";import{CommandsRegistry as Z,ICommandService as T}from"../../../../platform/commands/common/commands.js";import{IQuickInputService as ee}from"../../../../platform/quickinput/common/quickInput.js";import{IRemoteAgentService as te}from"../../../services/remote/common/remoteAgentService.js";import{isLinux as oe,isMacintosh as re,isWindows as ie,OperatingSystem as W}from"../../../../base/common/platform.js";import{IExtensionManagementServerService as ne}from"../../../services/extensionManagement/common/extensionManagement.js";import{IExtensionService as se}from"../../../services/extensions/common/extensions.js";import{StartupPageEditorResolverContribution as D,StartupPageRunnerContribution as V}from"./startupPage.js";import{ExtensionsInput as ce}from"../../extensions/common/extensionsInput.js";import{Categories as ae}from"../../../../platform/action/common/actionCommonCategories.js";import{DisposableStore as de}from"../../../../base/common/lifecycle.js";import{AccessibleViewRegistry as le}from"../../../../platform/accessibility/browser/accessibleViewRegistry.js";import{GettingStartedAccessibleView as pe}from"./gettingStartedAccessibleView.js";import*as Xe from"./gettingStartedIcons.js";h(class extends S{constructor(){super({id:"workbench.action.openWalkthrough",title:f("miWelcome","Welcome"),category:ae.Help,f1:!0,menu:{id:B.MenubarHelpMenu,group:"1_welcome",order:1},metadata:{description:f("minWelcomeDescription","Opens a Walkthrough to help you get started in VS Code.")}})}run(t,e,o){const r=t.get(Y),n=t.get(z),s=t.get(E),a=t.get(T);if(e){const i=typeof e=="string"?e:e.category;let d;if(typeof e=="object"&&"category"in e&&"step"in e?d=`${e.category}#${e.step}`:d=void 0,!i&&!d){s.openEditor({resource:p.RESOURCE,options:{preserveFocus:o??!1}},o?I:void 0);return}for(const l of r.groups)if(l.activeEditor instanceof p){const u=l.activeEditor;u.showWelcome=!1,l.activeEditorPane.makeCategoryVisibleWhenAvailable(i,d);return}const U=s.findEditors({typeId:p.ID,editorId:void 0,resource:p.RESOURCE});for(const{editor:l,groupId:u}of U)if(l instanceof p){const A=r.getGroup(u);if(!l.selectedCategory&&A){l.selectedCategory=i,l.selectedStep=d,l.showWelcome=!1,A.openEditor(l,{revealIfOpened:!0});return}}const g=s.activeEditor;if(d&&g instanceof p&&g.selectedCategory===i){g.showWelcome=!1,a.executeCommand("walkthroughs.selectStep",d);return}if(g instanceof ce)r.activeGroup.replaceEditors([{editor:g,replacement:n.createInstance(p,{selectedCategory:i,selectedStep:d,showWelcome:!1})}]);else{const l={selectedCategory:i,selectedStep:d,showWelcome:!1,preserveFocus:o??!1};s.openEditor({resource:p.RESOURCE,options:l},o?I:void 0).then(u=>{u?.makeCategoryVisibleWhenAvailable(i,d)})}}else s.openEditor({resource:p.RESOURCE,options:{preserveFocus:o??!1}},o?I:void 0)}}),b.as(M.EditorFactory).registerEditorSerializer(p.ID,K),b.as(M.EditorPane).registerEditorPane($.create(k,k.ID,c("welcome","Welcome")),[new j(p)]);const y=f("welcome","Welcome");h(class extends S{constructor(){super({id:"welcome.goBack",title:f("welcome.goBack","Go Back"),category:y,keybinding:{weight:N.EditorContrib,primary:_.Escape,when:Q},precondition:H.equals("activeEditor","gettingStartedPage"),f1:!0})}run(t){const o=t.get(E).activeEditorPane;o instanceof k&&o.escape()}}),Z.registerCommand({id:"walkthroughs.selectStep",handler:(t,e)=>{const r=t.get(E).activeEditorPane;r instanceof k&&r.selectStepLoose(e)}}),h(class extends S{constructor(){super({id:"welcome.markStepComplete",title:c("welcome.markStepComplete","Mark Step Complete"),category:y})}run(t,e){if(!e)return;t.get(x).progressStep(e)}}),h(class extends S{constructor(){super({id:"welcome.markStepIncomplete",title:c("welcome.markStepInomplete","Mark Step Incomplete"),category:y})}run(t,e){if(!e)return;t.get(x).deprogressStep(e)}}),h(class extends S{constructor(){super({id:"welcome.showAllWalkthroughs",title:f("welcome.showAllWalkthroughs","Open Walkthrough..."),category:y,f1:!0})}async getQuickPickItems(t,e){return(await e.getWalkthroughs()).filter(r=>t.contextMatchesRules(r.when)).map(r=>({id:r.id,label:r.title,detail:r.description,description:r.source}))}async run(t){const e=t.get(T),o=t.get(G),r=t.get(ee),n=t.get(x),s=t.get(se),a=new de,i=a.add(r.createQuickPick());i.canSelectMany=!1,i.matchOnDescription=!0,i.matchOnDetail=!0,i.placeholder=c("pickWalkthroughs","Select a walkthrough to open"),i.items=await this.getQuickPickItems(o,n),i.busy=!0,a.add(i.onDidAccept(()=>{const d=i.selectedItems[0];d&&e.executeCommand("workbench.action.openWalkthrough",d.id),i.hide()})),a.add(i.onDidHide(()=>a.dispose())),await s.whenInstalledExtensionsRegistered(),n.onDidAddWalkthrough(async()=>{i.items=await this.getQuickPickItems(o,n)}),i.show(),i.busy=!1}});const w=new L("workspacePlatform",void 0,c("workspacePlatform","The platform of the current workspace, which in remote or serverless contexts may be different from the platform of the UI"));let m=class{constructor(e,o,r){this.extensionManagementServerService=e;this.remoteAgentService=o;this.contextService=r;this.remoteAgentService.getEnvironment().then(n=>{const s=n?.os,a=s===W.Macintosh?"mac":s===W.Windows?"windows":s===W.Linux?"linux":void 0;a?w.bindTo(this.contextService).set(a):this.extensionManagementServerService.localExtensionManagementServer?re?w.bindTo(this.contextService).set("mac"):oe?w.bindTo(this.contextService).set("linux"):ie&&w.bindTo(this.contextService).set("windows"):this.extensionManagementServerService.webExtensionManagementServer&&w.bindTo(this.contextService).set("webworker")})}static ID="workbench.contrib.workspacePlatform"};m=O([v(0,ne),v(1,te),v(2,G)],m);const me=b.as(J.Configuration);me.registerConfiguration({...X,properties:{"workbench.welcomePage.walkthroughs.openOnInstall":{scope:R.MACHINE,type:"boolean",default:!0,description:c("workbench.welcomePage.walkthroughs.openOnInstall","When enabled, an extension's walkthrough will open upon install of the extension.")},"workbench.startupEditor":{scope:R.RESOURCE,type:"string",enum:["none","welcomePage","readme","newUntitledFile","welcomePageInEmptyWorkbench","terminal"],enumDescriptions:[c({comment:["This is the description for a setting. Values surrounded by single quotes are not to be translated."],key:"workbench.startupEditor.none"},"Start without an editor."),c({comment:["This is the description for a setting. Values surrounded by single quotes are not to be translated."],key:"workbench.startupEditor.welcomePage"},"Open the Welcome page, with content to aid in getting started with VS Code and extensions."),c({comment:["This is the description for a setting. Values surrounded by single quotes are not to be translated."],key:"workbench.startupEditor.readme"},"Open the README when opening a folder that contains one, fallback to 'welcomePage' otherwise. Note: This is only observed as a global configuration, it will be ignored if set in a workspace or folder configuration."),c({comment:["This is the description for a setting. Values surrounded by single quotes are not to be translated."],key:"workbench.startupEditor.newUntitledFile"},"Open a new untitled text file (only applies when opening an empty window)."),c({comment:["This is the description for a setting. Values surrounded by single quotes are not to be translated."],key:"workbench.startupEditor.welcomePageInEmptyWorkbench"},"Open the Welcome page when opening an empty workbench."),c({comment:["This is the description for a setting. Values surrounded by single quotes are not to be translated."],key:"workbench.startupEditor.terminal"},"Open a new terminal in the editor area.")],default:"welcomePage",description:c("workbench.startupEditor","Controls which editor is shown at startup, if none are restored from the previous session.")},"workbench.welcomePage.preferReducedMotion":{scope:R.APPLICATION,type:"boolean",default:!1,deprecationMessage:c("deprecationMessage","Deprecated, use the global `workbench.reduceMotion`."),description:c("workbench.welcomePage.preferReducedMotion","When enabled, reduce motion in welcome page.")}}}),C(m.ID,m,P.AfterRestored),C(D.ID,D,P.BlockRestore),C(V.ID,V,P.AfterRestored),le.register(new pe);export{w as WorkspacePlatform,Xe as icons};
