var Q=Object.defineProperty;var Y=Object.getOwnPropertyDescriptor;var C=(f,i,t,e)=>{for(var o=e>1?void 0:e?Y(i,t):i,l=f.length-1,a;l>=0;l--)(a=f[l])&&(o=(e?a(i,t,o):a(o))||o);return e&&o&&Q(i,t,o),o},g=(f,i)=>(t,e)=>i(t,e,f);import"../../../../../../base/common/cancellation.js";import{HierarchicalKind as U}from"../../../../../../base/common/hierarchicalKind.js";import{Disposable as Z,DisposableStore as b}from"../../../../../../base/common/lifecycle.js";import{isEqual as ee}from"../../../../../../base/common/resources.js";import"../../../../../../editor/browser/editorBrowser.js";import{IBulkEditService as O,ResourceTextEdit as _}from"../../../../../../editor/browser/services/bulkEditService.js";import{trimTrailingWhitespace as te}from"../../../../../../editor/common/commands/trimTrailingWhitespaceCommand.js";import{Position as oe}from"../../../../../../editor/common/core/position.js";import{Range as $}from"../../../../../../editor/common/core/range.js";import"../../../../../../editor/common/core/selection.js";import{CodeActionTriggerType as ie}from"../../../../../../editor/common/languages.js";import"../../../../../../editor/common/model.js";import{IEditorWorkerService as re}from"../../../../../../editor/common/services/editorWorker.js";import{ILanguageFeaturesService as D}from"../../../../../../editor/common/services/languageFeatures.js";import{ITextModelService as B}from"../../../../../../editor/common/services/resolverService.js";import{ApplyCodeActionReason as z,applyCodeAction as X,getCodeActions as ne}from"../../../../../../editor/contrib/codeAction/browser/codeAction.js";import{CodeActionKind as P,CodeActionTriggerSource as ae}from"../../../../../../editor/contrib/codeAction/common/types.js";import{FormattingMode as se,getDocumentFormattingEditsWithSelectedProvider as ce}from"../../../../../../editor/contrib/format/browser/format.js";import{SnippetController2 as le}from"../../../../../../editor/contrib/snippet/browser/snippetController2.js";import{localize as I}from"../../../../../../nls.js";import{IConfigurationService as E}from"../../../../../../platform/configuration/common/configuration.js";import{IInstantiationService as A}from"../../../../../../platform/instantiation/common/instantiation.js";import{ILogService as K}from"../../../../../../platform/log/common/log.js";import"../../../../../../platform/progress/common/progress.js";import{Registry as de}from"../../../../../../platform/registry/common/platform.js";import{IWorkspaceTrustManagementService as pe}from"../../../../../../platform/workspace/common/workspaceTrust.js";import{Extensions as ue}from"../../../../../common/contributions.js";import{SaveReason as x}from"../../../../../common/editor.js";import{getNotebookEditorFromEditorPane as J}from"../../notebookBrowser.js";import"../../../common/model/notebookTextModel.js";import{CellKind as j,NotebookSetting as V}from"../../../common/notebookCommon.js";import{NotebookFileWorkingCopyModel as M}from"../../../common/notebookEditorModel.js";import{IEditorService as H}from"../../../../../services/editor/common/editorService.js";import{LifecyclePhase as ge}from"../../../../../services/lifecycle/common/lifecycle.js";import"../../../../../services/workingCopy/common/storedFileWorkingCopy.js";import{IWorkingCopyFileService as ve}from"../../../../../services/workingCopy/common/workingCopyFileService.js";import{NotebookMultiCursorController as me,NotebookMultiCursorState as Se}from"../multicursor/notebookMulticursor.js";class q{constructor(i){this._editorService=i}canParticipate(){const t=J(this._editorService.activeEditorPane)?.getContribution(me.id);return t?t.getState()!==Se.Editing:!0}}let W=class{constructor(i,t,e,o,l,a){this.editorWorkerService=i;this.languageFeaturesService=t;this.instantiationService=e;this.textModelService=o;this.bulkEditService=l;this.configurationService=a}async participate(i,t,e,o){if(!i.model||!(i.model instanceof M)||t.reason===x.AUTO||!this.configurationService.getValue(V.formatOnSave))return;e.report({message:I("notebookFormatSave.formatting","Formatting")});const a=i.model.notebookModel,p=await this.instantiationService.invokeFunction(h.checkAndRunFormatCodeAction,a,e,o),d=new b;try{if(!p){const v=await Promise.all(a.cells.map(async u=>{const n=await this.textModelService.createModelReference(u.uri);d.add(n);const s=n.object.textEditorModel,r=await ce(this.editorWorkerService,this.languageFeaturesService,s,se.Silent,o),m=[];return r?(m.push(...r.map(c=>new _(s.uri,c,s.getVersionId()))),m):[]}));await this.bulkEditService.apply(v.flat(),{label:I("formatNotebook","Format Notebook"),code:"undoredo.formatNotebook"})}}finally{e.report({increment:100}),d.dispose()}}};W=C([g(0,re),g(1,D),g(2,A),g(3,B),g(4,O),g(5,E)],W);let T=class extends q{constructor(t,e,o,l){super(e);this.configurationService=t;this.editorService=e;this.textModelService=o;this.bulkEditService=l}async participate(t,e,o,l){const a=this.configurationService.getValue("files.trimTrailingWhitespace"),p=this.configurationService.getValue("files.trimTrailingWhitespaceInRegexAndStrings");a&&this.canParticipate()&&await this.doTrimTrailingWhitespace(t,e.reason===x.AUTO,p,o)}async doTrimTrailingWhitespace(t,e,o,l){if(!t.model||!(t.model instanceof M))return;const a=new b,p=t.model.notebookModel,d=G(this.editorService);let v=[],u=[];try{const s=(await Promise.all(p.cells.map(async r=>{if(r.cellKind!==j.Code)return[];const m=await this.textModelService.createModelReference(r.uri);a.add(m);const c=m.object.textEditorModel;if(d&&r.uri.toString()===d.getModel()?.uri.toString()&&(u=d.getSelections()??[],e)){v=u.map(F=>F.getPosition());const y=le.get(d)?.getSessionEnclosingRange();if(y)for(let F=y.startLineNumber;F<=y.endLineNumber;F++)v.push(new oe(F,c.getLineMaxColumn(F)))}const S=te(c,v,o);return S.length?S.map(y=>new _(c.uri,{...y,text:y.text||""},c.getVersionId())):[]}))).flat().filter(r=>r!==void 0);await this.bulkEditService.apply(s,{label:I("trimNotebookWhitespace","Notebook Trim Trailing Whitespace"),code:"undoredo.notebookTrimTrailingWhitespace"})}finally{l.report({increment:100}),a.dispose()}}};T=C([g(0,E),g(1,H),g(2,B),g(3,O)],T);let w=class extends q{constructor(t,e,o){super(e);this.configurationService=t;this.editorService=e;this.bulkEditService=o}async participate(t,e,o,l){this.configurationService.getValue("files.trimFinalNewlines")&&this.canParticipate()&&await this.doTrimFinalNewLines(t,e.reason===x.AUTO,o)}findLastNonEmptyLine(t){for(let e=t.getLineCount();e>=1;e--)if(t.getLineLength(e))return e;return 0}async doTrimFinalNewLines(t,e,o){if(!t.model||!(t.model instanceof M))return;const l=new b,a=t.model.notebookModel,p=G(this.editorService);try{const v=(await Promise.all(a.cells.map(async u=>{if(u.cellKind!==j.Code)return;let n=0;const s=p&&u.uri.toString()===p.getModel()?.uri.toString();if(e&&s){const S=p.getSelections()??[];for(const y of S)n=Math.max(n,y.selectionStartLineNumber)}const r=u.textBuffer,m=this.findLastNonEmptyLine(r),c=Math.max(m+1,n+1);if(c>r.getLineCount())return;const k=new $(c,1,r.getLineCount(),r.getLineLastNonWhitespaceColumn(r.getLineCount()));if(!k.isEmpty())return new _(u.uri,{range:k,text:""},u.textModel?.getVersionId())}))).flat().filter(u=>u!==void 0);await this.bulkEditService.apply(v,{label:I("trimNotebookNewlines","Trim Final New Lines"),code:"undoredo.trimFinalNewLines"})}finally{o.report({increment:100}),l.dispose()}}};w=C([g(0,E),g(1,H),g(2,O)],w);let L=class extends q{constructor(t,e,o){super(o);this.configurationService=t;this.bulkEditService=e;this.editorService=o}async participate(t,e,o,l){this.configurationService.getValue(V.insertFinalNewline)&&this.canParticipate()&&await this.doInsertFinalNewLine(t,e.reason===x.AUTO,o)}async doInsertFinalNewLine(t,e,o){if(!t.model||!(t.model instanceof M))return;const l=new b,a=t.model.notebookModel,p=G(this.editorService);let d;p&&(d=p.getSelections()??[]);try{const u=(await Promise.all(a.cells.map(async n=>{if(n.cellKind!==j.Code)return;const s=n.textBuffer.getLineCount(),r=n.textBuffer.getLineFirstNonWhitespaceColumn(s)===0;if(!(!s||r))return new _(n.uri,{range:new $(s+1,n.textBuffer.getLineLength(s),s+1,n.textBuffer.getLineLength(s)),text:n.textBuffer.getEOL()},n.textModel?.getVersionId())}))).filter(n=>n!==void 0);await this.bulkEditService.apply(u,{label:I("insertFinalNewLine","Insert Final New Line"),code:"undoredo.insertFinalNewLine"}),p&&d&&p.setSelections(d)}finally{o.report({increment:100}),l.dispose()}}};L=C([g(0,E),g(1,O),g(2,H)],L);let N=class{constructor(i,t,e,o,l){this.configurationService=i;this.logService=t;this.workspaceTrustManagementService=e;this.textModelService=o;this.instantiationService=l}async participate(i,t,e,o){if(!this.workspaceTrustManagementService.isWorkspaceTrusted()||!i.model||!(i.model instanceof M))return;let a="";if(t.reason===x.AUTO)return;if(t.reason===x.EXPLICIT)a="explicit";else return;const p=i.model.notebookModel,d=this.configurationService.getValue(V.codeActionsOnSave),v=Array.isArray(d)?d:Object.keys(d).filter(c=>d[c]),u=this.createCodeActionsOnSave(v),n=u.filter(c=>d[c.value]==="never"||d[c.value]===!1),s=u.filter(c=>d[c.value]===a||d[c.value]===!0),r=s.filter(c=>!P.Notebook.contains(c)),m=s.filter(c=>P.Notebook.contains(c));if(m.length){const c=new b;e.report({message:I("notebookSaveParticipants.notebookCodeActions","Running 'Notebook' code actions")});try{const k=p.cells[0],S=await this.textModelService.createModelReference(k.uri);c.add(S);const y=S.object.textEditorModel;await this.instantiationService.invokeFunction(h.applyOnSaveGenericCodeActions,y,m,n,e,o)}catch{this.logService.error("Failed to apply notebook code action on save")}finally{e.report({increment:100}),c.dispose()}}if(r.length){Array.isArray(d)||r.sort((k,S)=>P.SourceFixAll.contains(k)?P.SourceFixAll.contains(S)?0:-1:P.SourceFixAll.contains(S)?1:0);const c=new b;e.report({message:I("notebookSaveParticipants.cellCodeActions","Running 'Cell' code actions")});try{await Promise.all(p.cells.map(async k=>{const S=await this.textModelService.createModelReference(k.uri);c.add(S);const y=S.object.textEditorModel;await this.instantiationService.invokeFunction(h.applyOnSaveGenericCodeActions,y,r,n,e,o)}))}catch{this.logService.error("Failed to apply code action on save")}finally{e.report({increment:100}),c.dispose()}}}createCodeActionsOnSave(i){const t=i.map(e=>new U(e));return t.filter(e=>t.every(o=>o.equals(e)||!o.contains(e)))}};N=C([g(0,E),g(1,K),g(2,pe),g(3,B),g(4,A)],N);class h{static async checkAndRunFormatCodeAction(i,t,e,o){const l=i.get(A),a=i.get(B),p=i.get(K),d=i.get(E),v=new b;let u=!1;e.report({message:I("notebookSaveParticipants.formatCodeActions","Running 'Format' code actions")});try{const n=t.cells[0],s=await a.createModelReference(n.uri);v.add(s);const r=s.object.textEditorModel,m=d.getValue(V.defaultFormatter);u=await l.invokeFunction(h.applyOnSaveFormatCodeAction,r,new U("notebook.format"),[],m,e,o)}catch{p.error("Failed to apply notebook format action on save")}finally{e.report({increment:100}),v.dispose()}return u}static async applyOnSaveGenericCodeActions(i,t,e,o,l,a){const p=i.get(A),d=i.get(D),v=i.get(K),u=new class{_names=new Set;_report(){l.report({message:I({key:"codeaction.get2",comment:["[configure]({1}) is a link. Only translate `configure`. Do not change brackets and parentheses or {1}"]},"Getting code actions from '{0}' ([configure]({1})).",[...this._names].map(n=>`'${n}'`).join(", "),"command:workbench.action.openSettings?%5B%22notebook.codeActionsOnSave%22%5D")})}report(n){n.displayName&&!this._names.has(n.displayName)&&(this._names.add(n.displayName),this._report())}};for(const n of e){const s=await h.getActionsToRun(t,n,o,d,u,a);if(a.isCancellationRequested){s.dispose();return}try{for(const r of s.validActions){const m=r.action.edit?.edits;let c=!1;if(!r.action.kind?.startsWith("notebook"))for(const k of m??[]){const S=k;if(!(S.resource&&ee(S.resource,t.uri))){c=!0;break}}if(c){v.warn("Failed to apply code action on save, applied to multiple resources.");continue}if(l.report({message:I("codeAction.apply","Applying code action '{0}'.",r.action.title)}),await p.invokeFunction(X,r,z.OnSave,{},a),a.isCancellationRequested)return}}catch{}finally{s.dispose()}}}static async applyOnSaveFormatCodeAction(i,t,e,o,l,a,p){const d=i.get(A),v=i.get(D),u=i.get(K),n=new class{_names=new Set;_report(){a.report({message:I({key:"codeaction.get2",comment:["[configure]({1}) is a link. Only translate `configure`. Do not change brackets and parentheses or {1}"]},"Getting code actions from '{0}' ([configure]({1})).",[...this._names].map(r=>`'${r}'`).join(", "),"command:workbench.action.openSettings?%5B%22notebook.defaultFormatter%22%5D")})}report(r){r.displayName&&!this._names.has(r.displayName)&&(this._names.add(r.displayName),this._report())}},s=await h.getActionsToRun(t,e,o,v,n,p);if(s.validActions.length>1&&!l&&u.warn("More than one format code action is provided, the 0th one will be used. A default can be specified via `notebook.defaultFormatter` in your settings."),p.isCancellationRequested)return s.dispose(),!1;try{const r=l?s.validActions.find(m=>m.provider?.extensionId===l):s.validActions[0];if(!r||(a.report({message:I("codeAction.apply","Applying code action '{0}'.",r.action.title)}),await d.invokeFunction(X,r,z.OnSave,{},p),p.isCancellationRequested))return!1}catch{return u.error("Failed to apply notebook format code action on save"),!1}finally{s.dispose()}return!0}static getActionsToRun(i,t,e,o,l,a){return ne(o.codeActionProvider,i,i.getFullModelRange(),{type:ie.Invoke,triggerAction:ae.OnSave,filter:{include:t,excludes:e,includeSourceActions:!0}},l,a)}}function G(f){const i=f.activeEditorPane;return J(i)?.activeCodeEditor}let R=class extends Z{constructor(t,e){super();this.instantiationService=t;this.workingCopyFileService=e;this.registerSaveParticipants()}registerSaveParticipants(){this._register(this.workingCopyFileService.addSaveParticipant(this.instantiationService.createInstance(T))),this._register(this.workingCopyFileService.addSaveParticipant(this.instantiationService.createInstance(N))),this._register(this.workingCopyFileService.addSaveParticipant(this.instantiationService.createInstance(W))),this._register(this.workingCopyFileService.addSaveParticipant(this.instantiationService.createInstance(L))),this._register(this.workingCopyFileService.addSaveParticipant(this.instantiationService.createInstance(w)))}};R=C([g(0,A),g(1,ve)],R);const fe=de.as(ue.Workbench);fe.registerWorkbenchContribution(R,ge.Restored);export{h as CodeActionParticipantUtils,R as SaveParticipantsContribution};
