var R=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var C=(p,n,e,t)=>{for(var i=t>1?void 0:t?k(n,e):n,s=p.length-1,o;s>=0;s--)(o=p[s])&&(i=(t?o(n,e,i):o(i))||i);return t&&i&&R(n,e,i),i},a=(p,n)=>(e,t)=>n(e,t,p);import*as v from"../../../../base/browser/dom.js";import{Button as N}from"../../../../base/browser/ui/button/button.js";import{toAction as K}from"../../../../base/common/actions.js";import"../../../../base/common/cancellation.js";import{toErrorMessage as w}from"../../../../base/common/errorMessage.js";import{isCancellationError as M}from"../../../../base/common/errors.js";import{Event as x}from"../../../../base/common/event.js";import{Disposable as _,MutableDisposable as A,toDisposable as D}from"../../../../base/common/lifecycle.js";import"./postEditWidget.css";import{ContentWidgetPositionPreference as B}from"../../../browser/editorBrowser.js";import{IBulkEditService as P}from"../../../browser/services/bulkEditService.js";import"../../../common/core/range.js";import"../../../common/languages.js";import{TrackedRangeStickiness as W}from"../../../common/model.js";import{createCombinedWorkspaceEdit as L}from"./edit.js";import{localize as T}from"../../../../nls.js";import{IContextKeyService as $}from"../../../../platform/contextkey/common/contextkey.js";import{IContextMenuService as q}from"../../../../platform/contextview/browser/contextView.js";import{IInstantiationService as H}from"../../../../platform/instantiation/common/instantiation.js";import{IKeybindingService as O}from"../../../../platform/keybinding/common/keybinding.js";import{INotificationService as z}from"../../../../platform/notification/common/notification.js";let l=class extends _{constructor(e,t,i,s,o,d,c,g,h,m){super();this.typeId=e;this.editor=t;this.showCommand=s;this.range=o;this.edits=d;this.onSelectNewEdit=c;this._contextMenuService=g;this._keybindingService=m;this.create(),this.visibleContext=i.bindTo(h),this.visibleContext.set(!0),this._register(D(()=>this.visibleContext.reset())),this.editor.addContentWidget(this),this.editor.layoutContentWidget(this),this._register(D(()=>this.editor.removeContentWidget(this))),this._register(this.editor.onDidChangeCursorPosition(E=>{o.containsPosition(E.position)||this.dispose()})),this._register(x.runAndSubscribe(m.onDidUpdateKeybindings,()=>{this._updateButtonTitle()}))}static baseId="editor.widget.postEditWidget";allowEditorOverflow=!0;suppressMouseDown=!0;domNode;button;visibleContext;_updateButtonTitle(){const e=this._keybindingService.lookupKeybinding(this.showCommand.id)?.getLabel();this.button.element.title=this.showCommand.label+(e?` (${e})`:"")}create(){this.domNode=v.$(".post-edit-widget"),this.button=this._register(new N(this.domNode,{supportIcons:!0})),this.button.label="$(insert)",this._register(v.addDisposableListener(this.domNode,v.EventType.CLICK,()=>this.showSelector()))}getId(){return l.baseId+"."+this.typeId}getDomNode(){return this.domNode}getPosition(){return{position:this.range.getEndPosition(),preference:[B.BELOW]}}showSelector(){this._contextMenuService.showContextMenu({getAnchor:()=>{const e=v.getDomNodePagePosition(this.button.element);return{x:e.left+e.width,y:e.top+e.height}},getActions:()=>this.edits.allEdits.map((e,t)=>K({id:"",label:e.title,checked:t===this.edits.activeEditIndex,run:()=>{if(t!==this.edits.activeEditIndex)return this.onSelectNewEdit(t)}}))})}};l=C([a(7,q),a(8,$),a(9,O)],l);let y=class extends _{constructor(e,t,i,s,o,d,c){super();this._id=e;this._editor=t;this._visibleContext=i;this._showCommand=s;this._instantiationService=o;this._bulkEditService=d;this._notificationService=c;this._register(x.any(t.onDidChangeModel,t.onDidChangeModelContent)(()=>this.clear()))}_currentWidget=this._register(new A);async applyEditAndShowIfNeeded(e,t,i,s,o){const d=this._editor.getModel();if(!d||!e.length)return;const c=t.allEdits.at(t.activeEditIndex);if(!c)return;const g=async r=>{const u=this._editor.getModel();u&&(await u.undo(),this.applyEditAndShowIfNeeded(e,{activeEditIndex:r,allEdits:t.allEdits},i,s,o))},h=(r,u)=>{M(r)||(this._notificationService.error(u),i&&this.show(e[0],t,g))};let m;try{m=await s(c,o)}catch(r){return h(r,T("resolveError",`Error resolving edit '{0}':
{1}`,c.title,w(r)))}if(o.isCancellationRequested)return;const E=L(d.uri,e,m),b=e[0],f=d.deltaDecorations([],[{range:b,options:{description:"paste-line-suffix",stickiness:W.AlwaysGrowsWhenTypingAtEdges}}]);this._editor.focus();let I,S;try{I=await this._bulkEditService.apply(E,{editor:this._editor,token:o}),S=d.getDecorationRange(f[0])}catch(r){return h(r,T("applyError",`Error applying edit '{0}':
{1}`,c.title,w(r)))}finally{d.deltaDecorations(f,[])}o.isCancellationRequested||i&&I.isApplied&&t.allEdits.length>1&&this.show(S??b,t,g)}show(e,t,i){this.clear(),this._editor.hasModel()&&(this._currentWidget.value=this._instantiationService.createInstance(l,this._id,this._editor,this._visibleContext,this._showCommand,e,t,i))}clear(){this._currentWidget.clear()}tryShowSelector(){this._currentWidget.value?.showSelector()}};y=C([a(4,H),a(5,P),a(6,z)],y);export{y as PostEditWidgetManager};
