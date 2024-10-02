import{EditorInput as n}from"../../../common/editor/editorInput.js";import{localize as r}from"../../../../nls.js";import"../../../../base/common/themables.js";import{Codicon as t}from"../../../../base/common/codicons.js";import{registerIcon as i}from"../../../../platform/theme/common/iconRegistry.js";const s=i("disassembly-editor-label-icon",t.debug,r("disassemblyEditorLabelIcon","Icon of the disassembly editor label."));class e extends n{static ID="debug.disassemblyView.input";get typeId(){return e.ID}static _instance;static get instance(){return(!e._instance||e._instance.isDisposed())&&(e._instance=new e),e._instance}resource=void 0;getName(){return r("disassemblyInputName","Disassembly")}getIcon(){return s}matches(o){return o instanceof e}}export{e as DisassemblyViewInput};
