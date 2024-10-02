import{URI as c}from"../../../../../../base/common/uri.js";import"../../../../../../editor/common/encodedTokenAttributes.js";import"../../../../../../editor/common/model/mirrorTextModel.js";import{TMGrammarFactory as g}from"../../../common/TMGrammarFactory.js";import"../../../common/TMScopeRegistry.js";import{TextMateWorkerTokenizer as d}from"./textMateWorkerTokenizer.js";import{importAMDNodeModule as l}from"../../../../../../amdX.js";import"../../../../../../base/common/worker/simpleWorker.js";import{TextMateWorkerHost as u}from"./textMateWorkerHost.js";function O(s){return new p(s)}class p{_requestHandlerBrand;_host;_models=new Map;_grammarCache=[];_grammarFactory=Promise.resolve(null);constructor(e){this._host=u.getChannel(e)}async $init(e){const a=e.grammarDefinitions.map(r=>({location:c.revive(r.location),language:r.language,scopeName:r.scopeName,embeddedLanguages:r.embeddedLanguages,tokenTypes:r.tokenTypes,injectTo:r.injectTo,balancedBracketSelectors:r.balancedBracketSelectors,unbalancedBracketSelectors:r.unbalancedBracketSelectors,sourceExtensionId:r.sourceExtensionId}));this._grammarFactory=this._loadTMGrammarFactory(a,e.onigurumaWASMUri)}async _loadTMGrammarFactory(e,a){const r=await l("vscode-textmate","release/main.js"),t=await l("vscode-oniguruma","release/main.js"),i=await(await fetch(a)).arrayBuffer();await t.loadWASM(i);const m=Promise.resolve({createOnigScanner:o=>t.createOnigScanner(o),createOnigString:o=>t.createOnigString(o)});return new g({logTrace:o=>{},logError:(o,T)=>{},readFile:o=>this._host.$readFile(o)},e,r,m)}$acceptNewModel(e){const a=c.revive(e.uri),r=this;this._models.set(e.controllerId,new d(a,e.lines,e.EOL,e.versionId,{async getOrCreateGrammar(t,n){const i=await r._grammarFactory;return i?(r._grammarCache[n]||(r._grammarCache[n]=i.createGrammar(t,n)),r._grammarCache[n]):Promise.resolve(null)},setTokensAndStates(t,n,i){r._host.$setTokensAndStates(e.controllerId,t,n,i)},reportTokenizationTime(t,n,i,m,o){r._host.$reportTokenizationTime(t,n,i,m,o)}},e.languageId,e.encodedLanguageId,e.maxTokenizationLineLength))}$acceptModelChanged(e,a){this._models.get(e).onEvents(a)}$retokenize(e,a,r){this._models.get(e).retokenize(a,r)}$acceptModelLanguageChanged(e,a,r){this._models.get(e).onLanguageId(a,r)}$acceptRemovedModel(e){const a=this._models.get(e);a&&(a.dispose(),this._models.delete(e))}async $acceptTheme(e,a){(await this._grammarFactory)?.setTheme(e,a)}$acceptMaxTokenizationLineLength(e,a){this._models.get(e).acceptMaxTokenizationLineLength(a)}}export{p as TextMateTokenizationWorker,O as create};
