var k=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var _=(c,e,i,r)=>{for(var o=r>1?void 0:r?b(e,i):e,t=c.length-1,s;t>=0;t--)(s=c[t])&&(o=(r?s(e,i,o):s(o))||o);return r&&o&&k(e,i,o),o},l=(c,e)=>(i,r)=>e(i,r,c);import{CancellationToken as C}from"../../../../base/common/cancellation.js";import{toDisposable as U}from"../../../../base/common/lifecycle.js";import{LinkedList as P}from"../../../../base/common/linkedList.js";import{ResourceMap as R,ResourceSet as G}from"../../../../base/common/map.js";import"../../../../base/common/uri.js";import{isCodeEditor as x,isDiffEditor as O}from"../../../../editor/browser/editorBrowser.js";import{IBulkEditService as W,ResourceFileEdit as f,ResourceTextEdit as m}from"../../../../editor/browser/services/bulkEditService.js";import{EditorOption as T}from"../../../../editor/common/config/editorOptions.js";import"../../../../editor/common/languages.js";import{localize as n}from"../../../../nls.js";import{IConfigurationService as B}from"../../../../platform/configuration/common/configuration.js";import{Extensions as A}from"../../../../platform/configuration/common/configurationRegistry.js";import{IDialogService as H}from"../../../../platform/dialogs/common/dialogs.js";import{InstantiationType as D,registerSingleton as L}from"../../../../platform/instantiation/common/extensions.js";import{IInstantiationService as w}from"../../../../platform/instantiation/common/instantiation.js";import{ILogService as E}from"../../../../platform/log/common/log.js";import{Progress as N}from"../../../../platform/progress/common/progress.js";import{Registry as F}from"../../../../platform/registry/common/platform.js";import{UndoRedoGroup as M}from"../../../../platform/undoRedo/common/undoRedo.js";import{BulkCellEdits as z,ResourceNotebookCellEdit as y}from"./bulkCellEdits.js";import{BulkFileEdits as q}from"./bulkFileEdits.js";import{BulkTextEdits as j}from"./bulkTextEdits.js";import{IEditorService as J}from"../../../services/editor/common/editorService.js";import{ILifecycleService as V,ShutdownReason as S}from"../../../services/lifecycle/common/lifecycle.js";import{IWorkingCopyService as Q}from"../../../services/workingCopy/common/workingCopyService.js";function K(c){return c.map(e=>{if(m.is(e))return m.lift(e);if(f.is(e))return f.lift(e);if(y.is(e))return y.lift(e);throw new Error("Unsupported edit")})}let u=class{constructor(e,i,r,o,t,s,d,v,g,a,h){this._label=e;this._code=i;this._editor=r;this._progress=o;this._token=t;this._edits=s;this._undoRedoGroup=d;this._undoRedoSource=v;this._confirmBeforeUndo=g;this._instaService=a;this._logService=h}ariaMessage(){const e=new R,i=new R;let r=0;for(const o of this._edits)o instanceof m?(r+=1,i.set(o.resource,!0)):o instanceof f&&e.set(o.oldResource??o.newResource,!0);return this._edits.length===0?n("summary.0","Made no edits"):e.size===0?r>1&&i.size>1?n("summary.nm","Made {0} text edits in {1} files",r,i.size):n("summary.n0","Made {0} text edits in one file",r):n("summary.textFiles","Made {0} text edits in {1} files, also created or deleted {2} files",r,i.size,e.size)}async perform(){if(this._edits.length===0)return[];const e=[1];for(let s=1;s<this._edits.length;s++)Object.getPrototypeOf(this._edits[s-1])===Object.getPrototypeOf(this._edits[s])?e[e.length-1]++:e.push(1);const i=this._edits.length>1?0:void 0;this._progress.report({increment:i,total:100});const r={report:s=>this._progress.report({increment:100/this._edits.length})},o=[];let t=0;for(const s of e){if(this._token.isCancellationRequested)break;const d=this._edits.slice(t,t+s);d[0]instanceof f?o.push(await this._performFileEdits(d,this._undoRedoGroup,this._undoRedoSource,this._confirmBeforeUndo,r)):d[0]instanceof m?o.push(await this._performTextEdits(d,this._undoRedoGroup,this._undoRedoSource,r)):d[0]instanceof y&&o.push(await this._performCellEdits(d,this._undoRedoGroup,this._undoRedoSource,r)),t=t+s}return o.flat()}async _performFileEdits(e,i,r,o,t){return this._logService.debug("_performFileEdits",JSON.stringify(e)),await this._instaService.createInstance(q,this._label||n("workspaceEdit","Workspace Edit"),this._code||"undoredo.workspaceEdit",i,r,o,t,this._token,e).apply()}async _performTextEdits(e,i,r,o){return this._logService.debug("_performTextEdits",JSON.stringify(e)),await this._instaService.createInstance(j,this._label||n("workspaceEdit","Workspace Edit"),this._code||"undoredo.workspaceEdit",this._editor,i,r,o,this._token,e).apply()}async _performCellEdits(e,i,r,o){return this._logService.debug("_performCellEdits",JSON.stringify(e)),await this._instaService.createInstance(z,i,r,o,this._token,e).apply()}};u=_([l(9,w),l(10,E)],u);let p=class{constructor(e,i,r,o,t,s,d){this._instaService=e;this._logService=i;this._editorService=r;this._lifecycleService=o;this._dialogService=t;this._workingCopyService=s;this._configService=d}_activeUndoRedoGroups=new P;_previewHandler;setPreviewHandler(e){return this._previewHandler=e,U(()=>{this._previewHandler===e&&(this._previewHandler=void 0)})}hasPreviewHandler(){return!!this._previewHandler}async apply(e,i){let r=K(Array.isArray(e)?e:e.edits);if(r.length===0)return{ariaSummary:n("nothing","Made no edits"),isApplied:!1};this._previewHandler&&(i?.showPreview||r.some(a=>a.metadata?.needsConfirmation))&&(r=await this._previewHandler(r,i));let o=i?.editor;if(!o){const a=this._editorService.activeTextEditorControl;x(a)?o=a:O(a)&&(o=a.getModifiedEditor())}o&&o.getOption(T.readOnly)&&(o=void 0);let t,s=()=>{};if(typeof i?.undoRedoGroupId=="number"){for(const a of this._activeUndoRedoGroups)if(a.id===i.undoRedoGroupId){t=a;break}}t||(t=new M,s=this._activeUndoRedoGroups.push(t));const d=i?.quotableLabel||i?.label,v=this._instaService.createInstance(u,d,i?.code,o,i?.progress??N.None,i?.token??C.None,r,t,i?.undoRedoSource,!!i?.confirmBeforeUndo);let g;try{g=this._lifecycleService.onBeforeShutdown(h=>h.veto(this._shouldVeto(d,h.reason),"veto.blukEditService"));const a=await v.perform();return i?.respectAutoSaveConfig&&this._configService.getValue(I)===!0&&a.length>1&&await this._saveAll(a),{ariaSummary:v.ariaMessage(),isApplied:r.length>0}}catch(a){throw this._logService.error(a),a}finally{g?.dispose(),s()}}async _saveAll(e){const i=new G(e),r=this._workingCopyService.dirtyWorkingCopies.map(async t=>{i.has(t.resource)&&await t.save()}),o=await Promise.allSettled(r);for(const t of o)t.status==="rejected"&&this._logService.warn(t.reason)}async _shouldVeto(e,i){let r,o;switch(i){case S.CLOSE:r=n("closeTheWindow.message","Are you sure you want to close the window?"),o=n({key:"closeTheWindow",comment:["&& denotes a mnemonic"]},"&&Close Window");break;case S.LOAD:r=n("changeWorkspace.message","Are you sure you want to change the workspace?"),o=n({key:"changeWorkspace",comment:["&& denotes a mnemonic"]},"Change &&Workspace");break;case S.RELOAD:r=n("reloadTheWindow.message","Are you sure you want to reload the window?"),o=n({key:"reloadTheWindow",comment:["&& denotes a mnemonic"]},"&&Reload Window");break;default:r=n("quit.message","Are you sure you want to quit?"),o=n({key:"quit",comment:["&& denotes a mnemonic"]},"&&Quit");break}return!(await this._dialogService.confirm({message:r,detail:n("areYouSureQuiteBulkEdit.detail","'{0}' is in progress.",e||n("fileOperation","File operation")),primaryButton:o})).confirmed}};p=_([l(0,w),l(1,E),l(2,J),l(3,V),l(4,H),l(5,Q),l(6,B)],p),L(W,p,D.Delayed);const I="files.refactoring.autoSave";F.as(A.Configuration).registerConfiguration({id:"files",properties:{[I]:{description:n("refactoring.autoSave","Controls if files that were part of a refactoring are saved automatically"),default:!0,type:"boolean"}}});export{p as BulkEditService};
