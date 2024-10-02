var ce=Object.defineProperty;var de=Object.getOwnPropertyDescriptor;var w=(T,s,e,t)=>{for(var i=t>1?void 0:t?de(s,e):s,n=T.length-1,o;n>=0;n--)(o=T[n])&&(i=(t?o(s,e,i):o(i))||i);return t&&i&&ce(s,e,i),i},h=(T,s)=>(e,t)=>s(e,t,T);import{$ as c,addDisposableListener as R,addStandardDisposableListener as le,append as u,clearNode as O,EventHelper as j,EventType as A,isAncestorOfActiveElement as ue}from"../../../../base/browser/dom.js";import{ActionBar as pe}from"../../../../base/browser/ui/actionbar/actionbar.js";import{ButtonBar as G}from"../../../../base/browser/ui/button/button.js";import{InputBox as he,MessageType as N}from"../../../../base/browser/ui/inputbox/inputBox.js";import{DomScrollableElement as me}from"../../../../base/browser/ui/scrollbar/scrollableElement.js";import"../../../../base/browser/ui/table/table.js";import{Action as Y}from"../../../../base/common/actions.js";import"../../../../base/common/cancellation.js";import{Codicon as y}from"../../../../base/common/codicons.js";import{debounce as fe}from"../../../../base/common/decorators.js";import{Emitter as H}from"../../../../base/common/event.js";import{KeyCode as b,KeyMod as q}from"../../../../base/common/keyCodes.js";import{normalizeDriveLetter as $}from"../../../../base/common/labels.js";import{Disposable as Te,DisposableStore as W}from"../../../../base/common/lifecycle.js";import{parseLinkedText as z}from"../../../../base/common/linkedText.js";import{Schemas as D}from"../../../../base/common/network.js";import{ScrollbarVisibility as X}from"../../../../base/common/scrollable.js";import{URI as Ie}from"../../../../base/common/uri.js";import{localize as r}from"../../../../nls.js";import{ConfigurationScope as J,Extensions as be}from"../../../../platform/configuration/common/configurationRegistry.js";import{IContextViewService as ge}from"../../../../platform/contextview/browser/contextView.js";import{IFileDialogService as ve}from"../../../../platform/dialogs/common/dialogs.js";import{IInstantiationService as Q}from"../../../../platform/instantiation/common/instantiation.js";import{ILabelService as Z}from"../../../../platform/label/common/label.js";import{WorkbenchTable as ke}from"../../../../platform/list/browser/listService.js";import{Link as ee}from"../../../../platform/opener/browser/link.js";import{Registry as Ee}from"../../../../platform/registry/common/platform.js";import{isVirtualResource as te,isVirtualWorkspace as we}from"../../../../platform/workspace/common/virtualWorkspace.js";import{IStorageService as Se}from"../../../../platform/storage/common/storage.js";import{ITelemetryService as ye}from"../../../../platform/telemetry/common/telemetry.js";import{asCssVariable as P,buttonBackground as xe,buttonSecondaryBackground as Ce,editorErrorForeground as Ue}from"../../../../platform/theme/common/colorRegistry.js";import{IWorkspaceContextService as re,toWorkspaceIdentifier as We,WorkbenchState as f}from"../../../../platform/workspace/common/workspace.js";import{IThemeService as De}from"../../../../platform/theme/common/themeService.js";import{ThemeIcon as x}from"../../../../base/common/themables.js";import{IWorkspaceTrustManagementService as ie}from"../../../../platform/workspace/common/workspaceTrust.js";import{EditorPane as Le}from"../../../browser/parts/editor/editorPane.js";import"../../../common/editor.js";import{debugIconStartForeground as Me}from"../../debug/browser/debugColors.js";import{IExtensionsWorkbenchService as Ae,LIST_WORKSPACE_UNSUPPORTED_EXTENSIONS_COMMAND_ID as se}from"../../extensions/common/extensions.js";import{IWorkbenchConfigurationService as He}from"../../../services/configuration/common/configuration.js";import{IExtensionManifestPropertiesService as Pe}from"../../../services/extensions/common/extensionManifestPropertiesService.js";import{IUriIdentityService as ne}from"../../../../platform/uriIdentity/common/uriIdentity.js";import"../../../services/workspaces/browser/workspaceTrustEditorInput.js";import"../../../../platform/editor/common/editor.js";import{getExtensionDependencies as Fe}from"../../../../platform/extensionManagement/common/extensionManagementUtil.js";import{EnablementState as F,IWorkbenchExtensionEnablementService as Be}from"../../../services/extensionManagement/common/extensionManagement.js";import{posix as B,win32 as _e}from"../../../../base/common/path.js";import{hasDriveLetter as oe,toSlashes as Re}from"../../../../base/common/extpath.js";import{StandardKeyboardEvent as Oe}from"../../../../base/browser/keyboardEvent.js";import{IProductService as Ne}from"../../../../platform/product/common/productService.js";import{registerIcon as C}from"../../../../platform/theme/common/iconRegistry.js";import{defaultButtonStyles as ae,defaultInputBoxStyles as Ye}from"../../../../platform/theme/browser/defaultStyles.js";import{isMacintosh as K}from"../../../../base/common/platform.js";import{IKeybindingService as qe}from"../../../../platform/keybinding/common/keybinding.js";import"../../../../base/common/keybindings.js";import{basename as Ke,dirname as Ve}from"../../../../base/common/resources.js";import"../../../services/editor/common/editorGroupsService.js";const je=C("workspace-trust-banner",y.shield,r("shieldIcon","Icon for workspace trust ion the banner.")),Ge=C("workspace-trust-editor-check",y.check,r("checkListIcon","Icon for the checkmark in the workspace trust editor.")),$e=C("workspace-trust-editor-cross",y.x,r("xListIcon","Icon for the cross in the workspace trust editor.")),ze=C("workspace-trust-editor-folder-picker",y.folder,r("folderPickerIcon","Icon for the pick folder icon in the workspace trust editor.")),Xe=C("workspace-trust-editor-edit-folder",y.edit,r("editIcon","Icon for the edit folder icon in the workspace trust editor.")),Je=C("workspace-trust-editor-remove-folder",y.close,r("removeIcon","Icon for the remove folder icon in the workspace trust editor."));let L=class extends Te{constructor(e,t,i,n,o,l,a){super();this.container=e;this.instantiationService=t;this.workspaceService=i;this.workspaceTrustManagementService=n;this.uriService=o;this.labelService=l;this.fileDialogService=a;this.descriptionElement=e.appendChild(c(".workspace-trusted-folders-description"));const d=e.appendChild(c(".trusted-uris-table")),p=e.appendChild(c(".trusted-uris-button-bar"));this.table=this.instantiationService.createInstance(ke,"WorkspaceTrust",d,new U,[{label:r("hostColumnLabel","Host"),tooltip:"",weight:1,templateId:k.TEMPLATE_ID,project(m){return m}},{label:r("pathColumnLabel","Path"),tooltip:"",weight:8,templateId:v.TEMPLATE_ID,project(m){return m}},{label:"",tooltip:"",weight:1,minimumWidth:75,maximumWidth:75,templateId:g.TEMPLATE_ID,project(m){return m}}],[this.instantiationService.createInstance(k),this.instantiationService.createInstance(v,this),this.instantiationService.createInstance(g,this,this.currentWorkspaceUri)],{horizontalScrolling:!1,alwaysConsumeMouseWheel:!1,openOnSingleClick:!1,multipleSelectionSupport:!1,accessibilityProvider:{getAriaLabel:m=>{const M=_(this.labelService,m);return M===void 0||M.length===0?r("trustedFolderAriaLabel","{0}, trusted",this.labelService.getUriLabel(m.uri)):r("trustedFolderWithHostAriaLabel","{0} on {1}, trusted",this.labelService.getUriLabel(m.uri),M)},getWidgetAriaLabel:()=>r("trustedFoldersAndWorkspaces","Trusted Folders & Workspaces")},identityProvider:{getId(m){return m.uri.toString()}}}),this._register(this.table.onDidOpen(m=>{m&&m.element&&!m.browserEvent?.defaultPrevented&&this.edit(m.element,!0)}));const I=this._register(new G(p)),E=this._register(I.addButton({title:r("addButton","Add Folder"),...ae}));E.label=r("addButton","Add Folder"),this._register(E.onDidClick(async()=>{const m=await this.fileDialogService.showOpenDialog({canSelectFiles:!1,canSelectFolders:!0,canSelectMany:!1,defaultUri:this.currentWorkspaceUri,openLabel:r("trustUri","Trust Folder"),title:r("selectTrustedUri","Select Folder To Trust")});m&&this.workspaceTrustManagementService.setUrisTrust(m,!0)})),this._register(this.workspaceTrustManagementService.onDidChangeTrustedFolders(()=>{this.updateTable()}))}_onDidAcceptEdit=this._register(new H);onDidAcceptEdit=this._onDidAcceptEdit.event;_onDidRejectEdit=this._register(new H);onDidRejectEdit=this._onDidRejectEdit.event;_onEdit=this._register(new H);onEdit=this._onEdit.event;_onDelete=this._register(new H);onDelete=this._onDelete.event;table;descriptionElement;getIndexOfTrustedUriEntry(e){const t=this.trustedUriEntries.indexOf(e);if(t===-1){for(let i=0;i<this.trustedUriEntries.length;i++)if(this.trustedUriEntries[i].uri===e.uri)return i}return t}selectTrustedUriEntry(e,t=!0){const i=this.getIndexOfTrustedUriEntry(e);i!==-1&&(t&&(this.table.domFocus(),this.table.setFocus([i])),this.table.setSelection([i]))}get currentWorkspaceUri(){return this.workspaceService.getWorkspace().folders[0]?.uri||Ie.file("/")}get trustedUriEntries(){const e=this.workspaceService.getWorkspace(),t=e.folders.map(o=>o.uri);return e.configuration&&t.push(e.configuration),this.workspaceTrustManagementService.getTrustedUris().map(o=>{let l=!1;for(const a of t)l=l||this.uriService.extUri.isEqualOrParent(a,o);return{uri:o,parentOfWorkspaceItem:l}}).sort((o,l)=>{if(o.uri.scheme!==l.uri.scheme){if(o.uri.scheme===D.file)return-1;if(l.uri.scheme===D.file)return 1}const a=o.uri.path.endsWith(".code-workspace"),d=l.uri.path.endsWith(".code-workspace");if(a!==d){if(a)return 1;if(d)return-1}return o.uri.fsPath.localeCompare(l.uri.fsPath)})}layout(){this.table.layout(this.trustedUriEntries.length*U.ROW_HEIGHT+U.HEADER_ROW_HEIGHT,void 0)}updateTable(){const e=this.trustedUriEntries;this.container.classList.toggle("empty",e.length===0),this.descriptionElement.innerText=e.length?r("trustedFoldersDescription","You trust the following folders, their subfolders, and workspace files."):r("noTrustedFoldersDescriptions","You haven't trusted any folders or workspace files yet."),this.table.splice(0,Number.POSITIVE_INFINITY,this.trustedUriEntries),this.layout()}validateUri(e,t){if(!t)return null;if(t.uri.scheme==="vscode-vfs"){const i=e.split(B.sep).filter(n=>n.length);if(i.length===0&&e.startsWith(B.sep))return{type:N.WARNING,content:r({key:"trustAll",comment:["The {0} will be a host name where repositories are hosted."]},"You will trust all repositories on {0}.",_(this.labelService,t))};if(i.length===1)return{type:N.WARNING,content:r({key:"trustOrg",comment:["The {0} will be an organization or user name.","The {1} will be a host name where repositories are hosted."]},"You will trust all repositories and forks under '{0}' on {1}.",i[0],_(this.labelService,t))};if(i.length>2)return{type:N.ERROR,content:r("invalidTrust","You cannot trust individual folders within a repository.",e)}}return null}acceptEdit(e,t){const i=this.workspaceTrustManagementService.getTrustedUris(),n=i.findIndex(o=>this.uriService.extUri.isEqual(o,e.uri));n>=i.length||n===-1?i.push(t):i[n]=t,this.workspaceTrustManagementService.setTrustedUris(i),this._onDidAcceptEdit.fire(e)}rejectEdit(e){this._onDidRejectEdit.fire(e)}async delete(e){this.table.focusNext(),await this.workspaceTrustManagementService.setUrisTrust([e.uri],!1),this.table.getFocus().length===0&&this.table.focusLast(),this._onDelete.fire(e),this.table.domFocus()}async edit(e,t){if((e.uri.scheme===D.file||e.uri.scheme===this.currentWorkspaceUri.scheme&&this.uriService.extUri.isEqualAuthority(this.currentWorkspaceUri.authority,e.uri.authority)&&!te(e.uri))&&t){const n=await this.fileDialogService.showOpenDialog({canSelectFiles:!1,canSelectFolders:!0,canSelectMany:!1,defaultUri:e.uri,openLabel:r("trustUri","Trust Folder"),title:r("selectTrustedUri","Select Folder To Trust")});n?this.acceptEdit(e,n[0]):this.rejectEdit(e)}else this.selectTrustedUriEntry(e),this._onEdit.fire(e)}};L=w([h(1,Q),h(2,re),h(3,ie),h(4,ne),h(5,Z),h(6,ve)],L);class U{static HEADER_ROW_HEIGHT=30;static ROW_HEIGHT=24;headerRowHeight=U.HEADER_ROW_HEIGHT;getHeight(s){return U.ROW_HEIGHT}}let g=class{constructor(s,e,t){this.table=s;this.currentWorkspaceUri=e;this.uriService=t}static TEMPLATE_ID="actions";templateId=g.TEMPLATE_ID;renderTemplate(s){const e=s.appendChild(c(".actions"));return{actionBar:new pe(e)}}renderElement(s,e,t,i){t.actionBar.clear();const n=s.uri.scheme===D.file||s.uri.scheme===this.currentWorkspaceUri.scheme&&this.uriService.extUri.isEqualAuthority(this.currentWorkspaceUri.authority,s.uri.authority)&&!te(s.uri),o=[];n&&o.push(this.createPickerAction(s)),o.push(this.createEditAction(s)),o.push(this.createDeleteAction(s)),t.actionBar.push(o,{icon:!0})}createEditAction(s){return{label:"",class:x.asClassName(Xe),enabled:!0,id:"editTrustedUri",tooltip:r("editTrustedUri","Edit Path"),run:()=>{this.table.edit(s,!1)}}}createPickerAction(s){return{label:"",class:x.asClassName(ze),enabled:!0,id:"pickerTrustedUri",tooltip:r("pickerTrustedUri","Open File Picker"),run:()=>{this.table.edit(s,!0)}}}createDeleteAction(s){return{label:"",class:x.asClassName(Je),enabled:!0,id:"deleteTrustedUri",tooltip:r("deleteTrustedUri","Delete Path"),run:async()=>{await this.table.delete(s)}}}disposeTemplate(s){s.actionBar.dispose()}};g=w([h(2,ne)],g);let v=class{constructor(s,e){this.table=s;this.contextViewService=e}static TEMPLATE_ID="path";templateId=v.TEMPLATE_ID;currentItem;renderTemplate(s){const e=s.appendChild(c(".path")),t=e.appendChild(c("div.path-label")),i=new he(e,this.contextViewService,{validationOptions:{validation:l=>this.table.validateUri(l,this.currentItem)},inputBoxStyles:Ye}),n=new W,o=n.add(new W);return{element:e,pathLabel:t,pathInput:i,disposables:n,renderDisposables:o}}renderElement(s,e,t,i){t.renderDisposables.clear(),this.currentItem=s,t.renderDisposables.add(this.table.onEdit(async d=>{s===d&&(t.element.classList.add("input-mode"),t.pathInput.focus(),t.pathInput.select(),t.element.parentElement.style.paddingLeft="0px")})),t.renderDisposables.add(R(t.pathInput.element,A.DBLCLICK,d=>{j.stop(d)}));const n=()=>{t.element.classList.remove("input-mode"),t.element.parentElement.style.paddingLeft="5px"},o=()=>{n();const d=t.pathInput.value,p=oe(d)?s.uri.with({path:B.sep+Re(d)}):s.uri.with({path:d});t.pathLabel.innerText=this.formatPath(p),p&&this.table.acceptEdit(s,p)},l=()=>{n(),t.pathInput.value=a,this.table.rejectEdit(s)};t.renderDisposables.add(le(t.pathInput.inputElement,A.KEY_DOWN,d=>{let p=!1;d.equals(b.Enter)?(o(),p=!0):d.equals(b.Escape)&&(l(),p=!0),p&&(d.preventDefault(),d.stopPropagation())})),t.renderDisposables.add(R(t.pathInput.inputElement,A.BLUR,()=>{l()}));const a=this.formatPath(s.uri);t.pathInput.value=a,t.pathLabel.innerText=a,t.element.classList.toggle("current-workspace-parent",s.parentOfWorkspaceItem)}disposeTemplate(s){s.disposables.dispose(),s.renderDisposables.dispose()}formatPath(s){if(s.scheme===D.file)return $(s.fsPath);if(s.path.startsWith(B.sep)){const e=s.path.substring(1);if(oe(e,!0))return $(_e.normalize(e),!0)}return s.path}};v=w([h(1,ge)],v);function _(T,s){return s.uri.authority?T.getHostLabel(s.uri.scheme,s.uri.authority):r("localAuthority","Local")}let k=class{constructor(s){this.labelService=s}static TEMPLATE_ID="host";templateId=k.TEMPLATE_ID;renderTemplate(s){const e=new W,t=e.add(new W),i=s.appendChild(c(".host")),n=i.appendChild(c("div.host-label")),o=i.appendChild(c("div.button-bar"));return{element:i,hostContainer:n,buttonBarContainer:o,disposables:e,renderDisposables:t}}renderElement(s,e,t,i){t.renderDisposables.clear(),t.renderDisposables.add({dispose:()=>{O(t.buttonBarContainer)}}),t.hostContainer.innerText=_(this.labelService,s),t.element.classList.toggle("current-workspace-parent",s.parentOfWorkspaceItem),t.hostContainer.style.display="",t.buttonBarContainer.style.display="none"}disposeTemplate(s){s.disposables.dispose()}};k=w([h(0,Z)],k);let S=class extends Le{constructor(e,t,i,n,o,l,a,d,p,I,E,m,M){super(S.ID,e,t,i,n);this.workspaceService=o;this.extensionWorkbenchService=l;this.extensionManifestPropertiesService=a;this.instantiationService=d;this.workspaceTrustManagementService=p;this.configurationService=I;this.extensionEnablementService=E;this.productService=m;this.keybindingService=M}static ID="workbench.editor.workspaceTrust";rootElement;headerContainer;headerTitleContainer;headerTitleIcon;headerTitleText;headerDescription;bodyScrollBar;affectedFeaturesContainer;trustedContainer;untrustedContainer;configurationContainer;workspaceTrustedUrisTable;createEditor(e){this.rootElement=u(e,c(".workspace-trust-editor",{tabindex:"0"})),this.createHeaderElement(this.rootElement);const t=c(".workspace-trust-editor-body");this.bodyScrollBar=this._register(new me(t,{horizontal:X.Hidden,vertical:X.Auto})),u(this.rootElement,this.bodyScrollBar.getDomNode()),this.createAffectedFeaturesElement(t),this.createConfigurationElement(t),this.rootElement.style.setProperty("--workspace-trust-selected-color",P(xe)),this.rootElement.style.setProperty("--workspace-trust-unselected-color",P(Ce)),this.rootElement.style.setProperty("--workspace-trust-check-color",P(Me)),this.rootElement.style.setProperty("--workspace-trust-x-color",P(Ue)),this._register(R(this.rootElement,A.KEY_DOWN,i=>{const n=new Oe(i);if(n.equals(b.UpArrow)||n.equals(b.DownArrow)){const o=[this.headerContainer,this.trustedContainer,this.untrustedContainer,this.configurationContainer];let a=o.findIndex(d=>ue(d));n.equals(b.DownArrow)?a++:n.equals(b.UpArrow)&&(a=Math.max(0,a),a--),a+=o.length,a%=o.length,o[a].focus()}else n.equals(b.Escape)?this.rootElement.focus():n.equals(q.CtrlCmd|b.Enter)?this.workspaceTrustManagementService.canSetWorkspaceTrust()&&this.workspaceTrustManagementService.setWorkspaceTrust(!this.workspaceTrustManagementService.isWorkspaceTrusted()):n.equals(q.CtrlCmd|q.Shift|b.Enter)&&this.workspaceTrustManagementService.canSetParentFolderTrust()&&this.workspaceTrustManagementService.setParentFolderTrust(!0)}))}focus(){super.focus(),this.rootElement.focus()}async setInput(e,t,i,n){await super.setInput(e,t,i,n),!n.isCancellationRequested&&(await this.workspaceTrustManagementService.workspaceTrustInitialized,this.registerListeners(),await this.render())}registerListeners(){this._register(this.extensionWorkbenchService.onChange(()=>this.render())),this._register(this.configurationService.onDidChangeRestrictedSettings(()=>this.render())),this._register(this.workspaceTrustManagementService.onDidChangeTrust(()=>this.render())),this._register(this.workspaceTrustManagementService.onDidChangeTrustedFolders(()=>this.render()))}getHeaderContainerClass(e){return e?"workspace-trust-header workspace-trust-trusted":"workspace-trust-header workspace-trust-untrusted"}getHeaderTitleText(e){if(e){if(this.workspaceTrustManagementService.isWorkspaceTrustForced())return r("trustedUnsettableWindow","This window is trusted");switch(this.workspaceService.getWorkbenchState()){case f.EMPTY:return r("trustedHeaderWindow","You trust this window");case f.FOLDER:return r("trustedHeaderFolder","You trust this folder");case f.WORKSPACE:return r("trustedHeaderWorkspace","You trust this workspace")}}return r("untrustedHeader","You are in Restricted Mode")}getHeaderTitleIconClassNames(e){return x.asClassNameArray(je)}getFeaturesHeaderText(e){let t="",i="";switch(this.workspaceService.getWorkbenchState()){case f.EMPTY:{t=e?r("trustedWindow","In a Trusted Window"):r("untrustedWorkspace","In Restricted Mode"),i=e?r("trustedWindowSubtitle","You trust the authors of the files in the current window. All features are enabled:"):r("untrustedWindowSubtitle","You do not trust the authors of the files in the current window. The following features are disabled:");break}case f.FOLDER:{t=e?r("trustedFolder","In a Trusted Folder"):r("untrustedWorkspace","In Restricted Mode"),i=e?r("trustedFolderSubtitle","You trust the authors of the files in the current folder. All features are enabled:"):r("untrustedFolderSubtitle","You do not trust the authors of the files in the current folder. The following features are disabled:");break}case f.WORKSPACE:{t=e?r("trustedWorkspace","In a Trusted Workspace"):r("untrustedWorkspace","In Restricted Mode"),i=e?r("trustedWorkspaceSubtitle","You trust the authors of the files in the current workspace. All features are enabled:"):r("untrustedWorkspaceSubtitle","You do not trust the authors of the files in the current workspace. The following features are disabled:");break}}return[t,i]}rendering=!1;rerenderDisposables=this._register(new W);async render(){if(this.rendering)return;this.rendering=!0,this.rerenderDisposables.clear();const e=this.workspaceTrustManagementService.isWorkspaceTrusted();this.rootElement.classList.toggle("trusted",e),this.rootElement.classList.toggle("untrusted",!e),this.headerTitleText.innerText=this.getHeaderTitleText(e),this.headerTitleIcon.className="workspace-trust-title-icon",this.headerTitleIcon.classList.add(...this.getHeaderTitleIconClassNames(e)),this.headerDescription.innerText="";const t=u(this.headerDescription,c("div"));t.innerText=e?r("trustedDescription","All features are enabled because trust has been granted to the workspace."):r("untrustedDescription","{0} is in a restricted mode intended for safe code browsing.",this.productService.nameShort);const i=u(this.headerDescription,c("div")),n=r({key:"workspaceTrustEditorHeaderActions",comment:["Please ensure the markdown link syntax is not broken up with whitespace [text block](link block)"]},"[Configure your settings]({0}) or [learn more](https://aka.ms/vscode-workspace-trust).","command:workbench.trust.configure");for(const d of z(n).nodes)typeof d=="string"?u(i,document.createTextNode(d)):this.rerenderDisposables.add(this.instantiationService.createInstance(ee,i,{...d,tabIndex:-1},{}));this.headerContainer.className=this.getHeaderContainerClass(e),this.rootElement.setAttribute("aria-label",`${r("root element label","Manage Workspace Trust")}:  ${this.headerContainer.innerText}`);const o=this.configurationService.restrictedSettings,l=Ee.as(be.Configuration),a=o.default.filter(d=>{const p=l.getConfigurationProperties()[d];if(p.scope===J.APPLICATION||p.scope===J.MACHINE)return!1;if(p.deprecationMessage||p.markdownDeprecationMessage){if(o.workspace?.includes(d))return!0;if(o.workspaceFolder){for(const I of o.workspaceFolder.values())if(I.includes(d))return!0}return!1}return!0}).length;this.renderAffectedFeatures(a,this.getExtensionCount()),this.workspaceTrustedUrisTable.updateTable(),this.bodyScrollBar.getDomNode().style.height=`calc(100% - ${this.headerContainer.clientHeight}px)`,this.bodyScrollBar.scanDomNode(),this.rendering=!1}getExtensionCount(){const e=new Set,t=we(this.workspaceService.getWorkspace()),i=this.extensionWorkbenchService.local.filter(n=>n.local).map(n=>n.local);for(const n of i){const o=this.extensionEnablementService.getEnablementState(n);if(o!==F.EnabledGlobally&&o!==F.EnabledWorkspace&&o!==F.DisabledByTrustRequirement&&o!==F.DisabledByExtensionDependency||t&&this.extensionManifestPropertiesService.getExtensionVirtualWorkspaceSupportType(n.manifest)===!1)continue;if(this.extensionManifestPropertiesService.getExtensionUntrustedWorkspaceSupportType(n.manifest)!==!0){e.add(n.identifier.id);continue}Fe(i,n).some(a=>this.extensionManifestPropertiesService.getExtensionUntrustedWorkspaceSupportType(a.manifest)===!1)&&e.add(n.identifier.id)}return e.size}createHeaderElement(e){this.headerContainer=u(e,c(".workspace-trust-header",{tabIndex:"0"})),this.headerTitleContainer=u(this.headerContainer,c(".workspace-trust-title")),this.headerTitleIcon=u(this.headerTitleContainer,c(".workspace-trust-title-icon")),this.headerTitleText=u(this.headerTitleContainer,c(".workspace-trust-title-text")),this.headerDescription=u(this.headerContainer,c(".workspace-trust-description"))}createConfigurationElement(e){this.configurationContainer=u(e,c(".workspace-trust-settings",{tabIndex:"0"}));const t=u(this.configurationContainer,c(".workspace-trusted-folders-title"));t.innerText=r("trustedFoldersAndWorkspaces","Trusted Folders & Workspaces"),this.workspaceTrustedUrisTable=this._register(this.instantiationService.createInstance(L,this.configurationContainer))}createAffectedFeaturesElement(e){this.affectedFeaturesContainer=u(e,c(".workspace-trust-features")),this.trustedContainer=u(this.affectedFeaturesContainer,c(".workspace-trust-limitations.trusted",{tabIndex:"0"})),this.untrustedContainer=u(this.affectedFeaturesContainer,c(".workspace-trust-limitations.untrusted",{tabIndex:"0"}))}async renderAffectedFeatures(e,t){O(this.trustedContainer),O(this.untrustedContainer);const[i,n]=this.getFeaturesHeaderText(!0);this.renderLimitationsHeaderElement(this.trustedContainer,i,n);const o=this.workspaceService.getWorkbenchState()===f.EMPTY?[r("trustedTasks","Tasks are allowed to run"),r("trustedDebugging","Debugging is enabled"),r("trustedExtensions","All enabled extensions are activated")]:[r("trustedTasks","Tasks are allowed to run"),r("trustedDebugging","Debugging is enabled"),r("trustedSettings","All workspace settings are applied"),r("trustedExtensions","All enabled extensions are activated")];this.renderLimitationsListElement(this.trustedContainer,o,x.asClassNameArray(Ge));const[l,a]=this.getFeaturesHeaderText(!1);this.renderLimitationsHeaderElement(this.untrustedContainer,l,a);const d=this.workspaceService.getWorkbenchState()===f.EMPTY?[r("untrustedTasks","Tasks are not allowed to run"),r("untrustedDebugging","Debugging is disabled"),V(r({key:"untrustedExtensions",comment:["Please ensure the markdown link syntax is not broken up with whitespace [text block](link block)"]},"[{0} extensions]({1}) are disabled or have limited functionality",t,`command:${se}`))]:[r("untrustedTasks","Tasks are not allowed to run"),r("untrustedDebugging","Debugging is disabled"),V(e?r({key:"untrustedSettings",comment:["Please ensure the markdown link syntax is not broken up with whitespace [text block](link block)"]},"[{0} workspace settings]({1}) are not applied",e,"command:settings.filterUntrusted"):r("no untrustedSettings","Workspace settings requiring trust are not applied")),V(r({key:"untrustedExtensions",comment:["Please ensure the markdown link syntax is not broken up with whitespace [text block](link block)"]},"[{0} extensions]({1}) are disabled or have limited functionality",t,`command:${se}`))];this.renderLimitationsListElement(this.untrustedContainer,d,x.asClassNameArray($e)),this.workspaceTrustManagementService.isWorkspaceTrusted()?this.workspaceTrustManagementService.canSetWorkspaceTrust()?this.addDontTrustButtonToElement(this.untrustedContainer):this.addTrustedTextToElement(this.untrustedContainer):this.workspaceTrustManagementService.canSetWorkspaceTrust()&&this.addTrustButtonToElement(this.trustedContainer)}createButtonRow(e,t,i){const n=u(e,c(".workspace-trust-buttons-row")),o=u(n,c(".workspace-trust-buttons")),l=this.rerenderDisposables.add(new G(o));for(const{action:a,keybinding:d}of t){const p=l.addButtonWithDescription(ae);p.label=a.label,p.enabled=i!==void 0?i:a.enabled,p.description=d.getLabel(),p.element.ariaLabel=a.label+", "+r("keyboardShortcut","Keyboard Shortcut: {0}",d.getAriaLabel()),this.rerenderDisposables.add(p.onDidClick(I=>{I&&j.stop(I,!0),a.run()}))}}addTrustButtonToElement(e){const i=[{action:new Y("workspace.trust.button.action.grant",r("trustButton","Trust"),void 0,!0,async()=>{await this.workspaceTrustManagementService.setWorkspaceTrust(!0)}),keybinding:this.keybindingService.resolveUserBinding(K?"Cmd+Enter":"Ctrl+Enter")[0]}];if(this.workspaceTrustManagementService.canSetParentFolderTrust()){const n=We(this.workspaceService.getWorkspace()),o=Ke(Ve(n.uri)),l=u(e,c(".trust-message-box"));l.innerText=r("trustMessage","Trust the authors of all files in the current folder or its parent '{0}'.",o);const a=new Y("workspace.trust.button.action.grantParent",r("trustParentButton","Trust Parent"),void 0,!0,async()=>{await this.workspaceTrustManagementService.setParentFolderTrust(!0)});i.push({action:a,keybinding:this.keybindingService.resolveUserBinding(K?"Cmd+Shift+Enter":"Ctrl+Shift+Enter")[0]})}this.createButtonRow(e,i)}addDontTrustButtonToElement(e){this.createButtonRow(e,[{action:new Y("workspace.trust.button.action.deny",r("dontTrustButton","Don't Trust"),void 0,!0,async()=>{await this.workspaceTrustManagementService.setWorkspaceTrust(!1)}),keybinding:this.keybindingService.resolveUserBinding(K?"Cmd+Enter":"Ctrl+Enter")[0]}])}addTrustedTextToElement(e){if(this.workspaceService.getWorkbenchState()===f.EMPTY)return;const t=u(e,c(".workspace-trust-untrusted-description"));this.workspaceTrustManagementService.isWorkspaceTrustForced()?t.innerText=r("trustedForcedReason","This window is trusted by nature of the workspace that is opened."):t.innerText=this.workspaceService.getWorkbenchState()===f.WORKSPACE?r("untrustedWorkspaceReason","This workspace is trusted via the bolded entries in the trusted folders below."):r("untrustedFolderReason","This folder is trusted via the bolded entries in the the trusted folders below.")}renderLimitationsHeaderElement(e,t,i){const n=u(e,c(".workspace-trust-limitations-header")),o=u(n,c(".workspace-trust-limitations-title")),l=u(o,c(".workspace-trust-limitations-title-text")),a=u(n,c(".workspace-trust-limitations-subtitle"));l.innerText=t,a.innerText=i}renderLimitationsListElement(e,t,i){const n=u(e,c(".workspace-trust-limitations-list-container")),o=u(n,c("ul"));for(const l of t){const a=u(o,c("li")),d=u(a,c(".list-item-icon")),p=u(a,c(".list-item-text"));d.classList.add(...i);const I=z(l);for(const E of I.nodes)typeof E=="string"?u(p,document.createTextNode(E)):this.rerenderDisposables.add(this.instantiationService.createInstance(ee,p,{...E,tabIndex:-1},{}))}}layoutParticipants=[];layout(e){this.isVisible()&&(this.workspaceTrustedUrisTable.layout(),this.layoutParticipants.forEach(t=>{t.layout()}),this.bodyScrollBar.scanDomNode())}};w([fe(100)],S.prototype,"render",1),S=w([h(1,ye),h(2,De),h(3,Se),h(4,re),h(5,Ae),h(6,Pe),h(7,Q),h(8,ie),h(9,He),h(10,Be),h(11,Ne),h(12,qe)],S);function V(T){const s=/(.*)\[(.+)\]\s*\((.+)\)(.*)/;return T.replace(s,"$1[$2]($3)$4")}export{S as WorkspaceTrustEditor,je as shieldIcon};
