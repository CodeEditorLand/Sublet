import*as l from"../../../../nls.js";import{matchesFuzzy as m}from"../../../../base/common/filters.js";import"./debugSource.js";import{IQuickInputService as I}from"../../../../platform/quickinput/common/quickInput.js";import{IDebugService as g}from"./debug.js";import{IEditorService as p}from"../../../services/editor/common/editorService.js";import{getIconClasses as S}from"../../../../editor/common/services/getIconClasses.js";import{IModelService as k}from"../../../../editor/common/services/model.js";import{ILanguageService as f}from"../../../../editor/common/languages/language.js";import{DisposableStore as b}from"../../../../base/common/lifecycle.js";import{dirname as v}from"../../../../base/common/resources.js";import"../../../../platform/instantiation/common/instantiation.js";import{ILabelService as P}from"../../../../platform/label/common/label.js";async function U(i){const a=i.get(I),u=i.get(g),s=i.get(p),n=u.getModel().getSessions(!1),c=i.get(k),t=i.get(f),o=i.get(P),r=new b,e=a.createQuickPick({useSeparators:!0});r.add(e),e.matchOnLabel=e.matchOnDescription=e.matchOnDetail=e.sortByLabel=!1,e.placeholder=l.localize("moveFocusedView.selectView","Search loaded scripts by name"),e.items=await d(e.value,n,s,c,t,o),r.add(e.onDidChangeValue(async()=>{e.items=await d(e.value,n,s,c,t,o)})),r.add(e.onDidAccept(()=>{e.selectedItems[0].accept(),e.hide(),r.dispose()})),e.show()}async function h(i,a,u,s,n,c){const t=[];return t.push({type:"separator",label:i.name}),(await i.getLoadedSources()).forEach(r=>{const e=D(r,a,u,s,n,c);e&&t.push(e)}),t}async function d(i,a,u,s,n,c){const t=[],o=await Promise.all(a.map(r=>h(r,i,u,s,n,c)));for(const r of o)for(const e of r)t.push(e);return t}function D(i,a,u,s,n,c){const t=c.getUriBasenameLabel(i.uri),o=c.getUriLabel(v(i.uri)),r=m(a,t,!0),e=m(a,o,!0);if(r||e)return{label:t,description:o==="."?void 0:o,highlights:{label:r??void 0,description:e??void 0},iconClasses:S(s,n,i.uri),accept:()=>{i.available&&i.openInEditor(u,{startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0})}}}export{U as showLoadedScriptMenu};
