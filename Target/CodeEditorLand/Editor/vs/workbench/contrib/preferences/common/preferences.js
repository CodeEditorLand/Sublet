import{raceTimeout as _}from"../../../../base/common/async.js";import{CancellationToken as I}from"../../../../base/common/cancellation.js";import"../../../../base/common/collections.js";import"../../../../base/common/product.js";import{RawContextKey as e}from"../../../../platform/contextkey/common/contextkey.js";import"../../../../platform/extensionManagement/common/extensionManagement.js";import{createDecorator as S}from"../../../../platform/instantiation/common/instantiation.js";import"../../../../platform/product/common/productService.js";import"../../../services/preferences/common/preferences.js";const M=S("preferencesSearchService"),K="settings.action.clearSearchResults",h="settings.action.showContextMenu",Y="settings.action.suggestFilters",k=new e("inSettingsEditor",!1),B=new e("inSettingsJSONEditor",!1),P=new e("inSettingsSearch",!1),L=new e("settingsTocRowFocus",!1),U=new e("settingRowFocus",!1),F=new e("inKeybindings",!1),w=new e("inKeybindingsSearch",!1),H=new e("keybindingFocus",!1),W=new e("whenFocus",!1),X="keybindings.editor.searchKeybindings",v="keybindings.editor.clearSearchResults",J="keybindings.editor.clearSearchHistory",j="keybindings.editor.recordSearchKeys",q="keybindings.editor.toggleSortByPrecedence",Q="keybindings.editor.defineKeybinding",V="keybindings.editor.addKeybinding",z="keybindings.editor.defineWhenExpression",Z="keybindings.editor.acceptWhenExpression",$="keybindings.editor.rejectWhenExpression",ee="keybindings.editor.removeKeybinding",ne="keybindings.editor.resetKeybinding",oe="keybindings.editor.copyKeybindingEntry",te="keybindings.editor.copyCommandKeybindingEntry",re="keybindings.editor.copyCommandTitle",ie="keybindings.editor.showConflicts",se="keybindings.editor.focusKeybindings",Ee="keybindings.editor.showDefaultKeybindings",ae="keybindings.editor.showUserKeybindings",ce="keybindings.editor.showExtensionKeybindings",_e="modified",Ie="ext:",Se="feature:",Ne="id:",de="lang:",Te="tag:",le="hasPolicy",De="workspaceTrust",ge="requireTrustedWorkspace",Oe="workbench.action.openKeyboardLayoutPicker",xe=!0,N=!0,d=1e3;let E;async function Re(i,n){if(N&&i.isEnabled()){if(E)return E;if(n.extensionRecommendations&&n.commonlyUsedSettings){const o={};Object.keys(n.extensionRecommendations).forEach(r=>{const s=n.extensionRecommendations[r];s.onSettingsEditorOpen&&(o[r]=s)});const t={};for(const r in o){const s=r,c=n.quality==="stable";try{const a=await _(i.getExtensions([{id:s,preRelease:!c}],I.None),d);if(a?.length===1)t[r]=a[0];else return}catch{return}}return E={settingsEditorRecommendedExtensions:o,recommendedExtensionsGalleryInfo:t,commonlyUsed:n.commonlyUsedSettings},E}}}function pe(i,n){const o=i??Number.MAX_SAFE_INTEGER,t=n??Number.MAX_SAFE_INTEGER;return o<t?-1:o>t?1:0}export{F as CONTEXT_KEYBINDINGS_EDITOR,w as CONTEXT_KEYBINDINGS_SEARCH_FOCUS,H as CONTEXT_KEYBINDING_FOCUS,k as CONTEXT_SETTINGS_EDITOR,B as CONTEXT_SETTINGS_JSON_EDITOR,U as CONTEXT_SETTINGS_ROW_FOCUS,P as CONTEXT_SETTINGS_SEARCH_FOCUS,L as CONTEXT_TOC_ROW_FOCUS,W as CONTEXT_WHEN_FOCUS,N as ENABLE_EXTENSION_TOGGLE_SETTINGS,xe as ENABLE_LANGUAGE_FILTER,d as EXTENSION_FETCH_TIMEOUT_MS,Ie as EXTENSION_SETTING_TAG,Se as FEATURE_SETTING_TAG,Te as GENERAL_TAG_SETTING_TAG,Ne as ID_SETTING_TAG,M as IPreferencesSearchService,Z as KEYBINDINGS_EDITOR_COMMAND_ACCEPT_WHEN,V as KEYBINDINGS_EDITOR_COMMAND_ADD,J as KEYBINDINGS_EDITOR_COMMAND_CLEAR_SEARCH_HISTORY,v as KEYBINDINGS_EDITOR_COMMAND_CLEAR_SEARCH_RESULTS,oe as KEYBINDINGS_EDITOR_COMMAND_COPY,te as KEYBINDINGS_EDITOR_COMMAND_COPY_COMMAND,re as KEYBINDINGS_EDITOR_COMMAND_COPY_COMMAND_TITLE,Q as KEYBINDINGS_EDITOR_COMMAND_DEFINE,z as KEYBINDINGS_EDITOR_COMMAND_DEFINE_WHEN,se as KEYBINDINGS_EDITOR_COMMAND_FOCUS_KEYBINDINGS,j as KEYBINDINGS_EDITOR_COMMAND_RECORD_SEARCH_KEYS,$ as KEYBINDINGS_EDITOR_COMMAND_REJECT_WHEN,ee as KEYBINDINGS_EDITOR_COMMAND_REMOVE,ne as KEYBINDINGS_EDITOR_COMMAND_RESET,X as KEYBINDINGS_EDITOR_COMMAND_SEARCH,ie as KEYBINDINGS_EDITOR_COMMAND_SHOW_SIMILAR,q as KEYBINDINGS_EDITOR_COMMAND_SORTBY_PRECEDENCE,Ee as KEYBINDINGS_EDITOR_SHOW_DEFAULT_KEYBINDINGS,ce as KEYBINDINGS_EDITOR_SHOW_EXTENSION_KEYBINDINGS,ae as KEYBINDINGS_EDITOR_SHOW_USER_KEYBINDINGS,Oe as KEYBOARD_LAYOUT_OPEN_PICKER,de as LANGUAGE_SETTING_TAG,_e as MODIFIED_SETTING_TAG,le as POLICY_SETTING_TAG,ge as REQUIRE_TRUSTED_WORKSPACE_SETTING_TAG,K as SETTINGS_EDITOR_COMMAND_CLEAR_SEARCH_RESULTS,h as SETTINGS_EDITOR_COMMAND_SHOW_CONTEXT_MENU,Y as SETTINGS_EDITOR_COMMAND_SUGGEST_FILTERS,De as WORKSPACE_TRUST_SETTING_TAG,pe as compareTwoNullableNumbers,Re as getExperimentalExtensionToggleData};
