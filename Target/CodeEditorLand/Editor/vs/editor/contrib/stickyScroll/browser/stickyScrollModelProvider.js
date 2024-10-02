var R=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var u=(s,n,e,t)=>{for(var i=t>1?void 0:t?N(n,e):n,r=s.length-1,o;r>=0;r--)(o=s[r])&&(i=(t?o(n,e,i):o(i))||i);return t&&i&&R(n,e,i),i},c=(s,n)=>(e,t)=>n(e,t,s);import{Disposable as E,DisposableStore as C}from"../../../../base/common/lifecycle.js";import"../../../browser/editorBrowser.js";import{ILanguageFeaturesService as k}from"../../../common/services/languageFeatures.js";import{OutlineElement as D,OutlineGroup as T,OutlineModel as w}from"../../documentSymbols/browser/outlineModel.js";import"../../../../base/common/cancellation.js";import{createCancelablePromise as A,Delayer as F}from"../../../../base/common/async.js";import{FoldingController as V,RangesLimitReporter as x}from"../../folding/browser/folding.js";import{SyntaxRangeProvider as G}from"../../folding/browser/syntaxRangeProvider.js";import{IndentRangeProvider as U}from"../../folding/browser/indentRangeProvider.js";import{ILanguageConfigurationService as q}from"../../../common/languages/languageConfigurationRegistry.js";import"../../folding/browser/foldingRanges.js";import{onUnexpectedError as S}from"../../../../base/common/errors.js";import{StickyElement as f,StickyModel as L,StickyRange as y}from"./stickyScrollElement.js";import{Iterable as P}from"../../../../base/common/iterator.js";import{IInstantiationService as z}from"../../../../platform/instantiation/common/instantiation.js";import{EditorOption as j}from"../../../common/config/editorOptions.js";var B=(t=>(t.OUTLINE_MODEL="outlineModel",t.FOLDING_PROVIDER_MODEL="foldingProviderModel",t.INDENTATION_MODEL="indentationModel",t))(B||{}),H=(t=>(t[t.VALID=0]="VALID",t[t.INVALID=1]="INVALID",t[t.CANCELED=2]="CANCELED",t))(H||{});let _=class extends E{constructor(e,t,i,r){super();this._editor=e;switch(this._editor.getOption(j.stickyScroll).defaultModel){case"outlineModel":this._modelProviders.push(new m(this._editor,r));case"foldingProviderModel":this._modelProviders.push(new g(this._editor,t,r));case"indentationModel":this._modelProviders.push(new p(this._editor,i));break}}_modelProviders=[];_modelPromise=null;_updateScheduler=this._register(new F(300));_updateOperation=this._register(new C);dispose(){this._modelProviders.forEach(e=>e.dispose()),this._updateOperation.clear(),this._cancelModelPromise(),super.dispose()}_cancelModelPromise(){this._modelPromise&&(this._modelPromise.cancel(),this._modelPromise=null)}async update(e){return this._updateOperation.clear(),this._updateOperation.add({dispose:()=>{this._cancelModelPromise(),this._updateScheduler.cancel()}}),this._cancelModelPromise(),await this._updateScheduler.trigger(async()=>{for(const t of this._modelProviders){const{statusPromise:i,modelPromise:r}=t.computeStickyModel(e);this._modelPromise=r;const o=await i;if(this._modelPromise!==r)return null;switch(o){case 2:return this._updateOperation.clear(),null;case 0:return t.stickyModel}}return null}).catch(t=>(S(t),null))}};_=u([c(2,z),c(3,k)],_);class O extends E{constructor(e){super();this._editor=e}_stickyModel=null;get stickyModel(){return this._stickyModel}_invalid(){return this._stickyModel=null,1}computeStickyModel(e){if(e.isCancellationRequested||!this.isProviderValid())return{statusPromise:this._invalid(),modelPromise:null};const t=A(i=>this.createModelFromProvider(i));return{statusPromise:t.then(i=>this.isModelValid(i)?e.isCancellationRequested?2:(this._stickyModel=this.createStickyModel(e,i),0):this._invalid()).then(void 0,i=>(S(i),2)),modelPromise:t}}isModelValid(e){return!0}isProviderValid(){return!0}}let m=class extends O{constructor(e,t){super(e);this._languageFeaturesService=t}createModelFromProvider(e){return w.create(this._languageFeaturesService.documentSymbolProvider,this._editor.getModel(),e)}createStickyModel(e,t){const{stickyOutlineElement:i,providerID:r}=this._stickyModelFromOutlineModel(t,this._stickyModel?.outlineProviderId),o=this._editor.getModel();return new L(o.uri,o.getVersionId(),i,r)}isModelValid(e){return e&&e.children.size>0}_stickyModelFromOutlineModel(e,t){let i;if(P.first(e.children.values())instanceof T){const l=P.find(e.children.values(),d=>d.id===t);if(l)i=l.children;else{let d="",h=-1,v;for(const[J,b]of e.children.entries()){const M=this._findSumOfRangesOfGroup(b);M>h&&(v=b,h=M,d=b.id)}t=d,i=v.children}}else i=e.children;const r=[],o=Array.from(i.values()).sort((l,d)=>{const h=new y(l.symbol.range.startLineNumber,l.symbol.range.endLineNumber),v=new y(d.symbol.range.startLineNumber,d.symbol.range.endLineNumber);return this._comparator(h,v)});for(const l of o)r.push(this._stickyModelFromOutlineElement(l,l.symbol.selectionRange.startLineNumber));return{stickyOutlineElement:new f(void 0,r,void 0),providerID:t}}_stickyModelFromOutlineElement(e,t){const i=[];for(const o of e.children.values())if(o.symbol.selectionRange.startLineNumber!==o.symbol.range.endLineNumber)if(o.symbol.selectionRange.startLineNumber!==t)i.push(this._stickyModelFromOutlineElement(o,o.symbol.selectionRange.startLineNumber));else for(const a of o.children.values())i.push(this._stickyModelFromOutlineElement(a,o.symbol.selectionRange.startLineNumber));i.sort((o,a)=>this._comparator(o.range,a.range));const r=new y(e.symbol.selectionRange.startLineNumber,e.symbol.range.endLineNumber);return new f(r,i,void 0)}_comparator(e,t){return e.startLineNumber!==t.startLineNumber?e.startLineNumber-t.startLineNumber:t.endLineNumber-e.endLineNumber}_findSumOfRangesOfGroup(e){let t=0;for(const i of e.children.values())t+=this._findSumOfRangesOfGroup(i);return e instanceof D?t+e.symbol.range.endLineNumber-e.symbol.selectionRange.startLineNumber:t}};m=u([c(1,k)],m);class I extends O{_foldingLimitReporter;constructor(n){super(n),this._foldingLimitReporter=new x(n)}createStickyModel(n,e){const t=this._fromFoldingRegions(e),i=this._editor.getModel();return new L(i.uri,i.getVersionId(),t,void 0)}isModelValid(n){return n!==null}_fromFoldingRegions(n){const e=n.length,t=[],i=new f(void 0,[],void 0);for(let r=0;r<e;r++){const o=n.getParentIndex(r);let a;o!==-1?a=t[o]:a=i;const l=new f(new y(n.getStartLineNumber(r),n.getEndLineNumber(r)+1),[],a);a.children.push(l),t.push(l)}return i}}let p=class extends I{constructor(e,t){super(e);this._languageConfigurationService=t;this.provider=this._register(new U(e.getModel(),this._languageConfigurationService,this._foldingLimitReporter))}provider;async createModelFromProvider(e){return this.provider.compute(e)}};p=u([c(1,q)],p);let g=class extends I{constructor(e,t,i){super(e);this._languageFeaturesService=i;const r=V.getFoldingRangeProviders(this._languageFeaturesService,e.getModel());r.length>0&&(this.provider=this._register(new G(e.getModel(),r,t,this._foldingLimitReporter,void 0)))}provider;isProviderValid(){return this.provider!==void 0}async createModelFromProvider(e){return this.provider?.compute(e)??null}};g=u([c(2,k)],g);export{_ as StickyModelProvider};
