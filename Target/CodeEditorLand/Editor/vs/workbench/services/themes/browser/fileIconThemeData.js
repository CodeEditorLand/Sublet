import"../../../../base/common/uri.js";import*as T from"../../../../nls.js";import*as K from"../../../../base/common/path.js";import*as M from"../../../../base/common/resources.js";import*as U from"../../../../base/common/json.js";import{ExtensionData as J}from"../common/workbenchThemeService.js";import{getParseErrorMessage as Y}from"../../../../base/common/jsonErrorMessages.js";import{asCSSUrl as y}from"../../../../base/browser/dom.js";import{StorageScope as W,StorageTarget as q}from"../../../../platform/storage/common/storage.js";import"../../../../platform/extensionResourceLoader/common/extensionResourceLoader.js";import"../../../../editor/common/languages/language.js";import{mainWindow as B}from"../../../../base/browser/window.js";class m{static STORAGE_KEY="iconThemeData";id;label;settingsId;description;hasFileIcons;hasFolderIcons;hidesExplorerArrows;isLoaded;location;extensionData;watch;styleSheetContent;constructor(e,r,o){this.id=e,this.label=r,this.settingsId=o,this.isLoaded=!1,this.hasFileIcons=!1,this.hasFolderIcons=!1,this.hidesExplorerArrows=!1}ensureLoaded(e){return this.isLoaded?Promise.resolve(this.styleSheetContent):this.load(e)}reload(e){return this.load(e)}load(e){return e.load(this)}static fromExtensionTheme(e,r,o){const s=o.extensionId+"-"+e.id,d=e.label||K.basename(e.path),S=e.id,u=new m(s,d,S);return u.description=e.description,u.location=r,u.extensionData=o,u.watch=e._watch,u.isLoaded=!1,u}static _noIconTheme=null;static get noIconTheme(){let e=m._noIconTheme;return e||(e=m._noIconTheme=new m("","",null),e.hasFileIcons=!1,e.hasFolderIcons=!1,e.hidesExplorerArrows=!1,e.isLoaded=!0,e.extensionData=void 0,e.watch=!1),e}static createUnloadedTheme(e){const r=new m(e,"","__"+e);return r.isLoaded=!1,r.hasFileIcons=!1,r.hasFolderIcons=!1,r.hidesExplorerArrows=!1,r.extensionData=void 0,r.watch=!1,r}static fromStorageData(e){const r=e.get(m.STORAGE_KEY,W.PROFILE);if(r)try{const o=JSON.parse(r),s=new m("","",null);for(const d in o)switch(d){case"id":case"label":case"description":case"settingsId":case"styleSheetContent":case"hasFileIcons":case"hidesExplorerArrows":case"hasFolderIcons":case"watch":s[d]=o[d];break;case"location":break;case"extensionData":s.extensionData=J.fromJSONObject(o.extensionData);break}return s}catch{return}}toStorage(e){const r=JSON.stringify({id:this.id,label:this.label,description:this.description,settingsId:this.settingsId,styleSheetContent:this.styleSheetContent,hasFileIcons:this.hasFileIcons,hasFolderIcons:this.hasFolderIcons,hidesExplorerArrows:this.hidesExplorerArrows,extensionData:J.toJSONObject(this.extensionData),watch:this.watch});e.store(m.STORAGE_KEY,r,W.PROFILE,q.MACHINE)}}class le{constructor(e,r){this.fileService=e;this.languageService=r}load(e){return e.location?this.loadIconThemeDocument(e.location).then(r=>{const o=this.processIconThemeDocument(e.id,e.location,r);return e.styleSheetContent=o.content,e.hasFileIcons=o.hasFileIcons,e.hasFolderIcons=o.hasFolderIcons,e.hidesExplorerArrows=o.hidesExplorerArrows,e.isLoaded=!0,e.styleSheetContent}):Promise.resolve(e.styleSheetContent)}loadIconThemeDocument(e){return this.fileService.readExtensionResource(e).then(r=>{const o=[],s=U.parse(r,o);return o.length>0?Promise.reject(new Error(T.localize("error.cannotparseicontheme","Problems parsing file icons file: {0}",o.map(d=>Y(d.error)).join(", ")))):U.getNodeType(s)!=="object"?Promise.reject(new Error(T.localize("error.invalidformat","Invalid format for file icons theme file: Object expected."))):Promise.resolve(s)})}processIconThemeDocument(e,r,o){const s={content:"",hasFileIcons:!1,hasFolderIcons:!1,hidesExplorerArrows:!!o.hidesExplorerArrows};let d=!1;if(!o.iconDefinitions)return s;const S={},u={},G=M.dirname(r);function k(t){return M.joinPath(G,t)}function E(t,c){function n(i,f){if(f){let $=S[f];$||($=S[f]=[]),$.push(i)}}if(t){let i=".show-file-icons";c&&(i=c+" "+i);const f=".monaco-tl-twistie.collapsible:not(.collapsed) + .monaco-tl-contents";t.folder&&(n(`${i} .folder-icon::before`,t.folder),s.hasFolderIcons=!0),t.folderExpanded&&(n(`${i} ${f} .folder-icon::before`,t.folderExpanded),s.hasFolderIcons=!0);const $=t.rootFolder||t.folder,O=t.rootFolderExpanded||t.folderExpanded;$&&(n(`${i} .rootfolder-icon::before`,$),s.hasFolderIcons=!0),O&&(n(`${i} ${f} .rootfolder-icon::before`,O),s.hasFolderIcons=!0),t.file&&(n(`${i} .file-icon::before`,t.file),s.hasFileIcons=!0);const v=t.folderNames;if(v)for(const l in v){const a=[],F=L(l.toLowerCase(),a);a.push(`.${h(F)}-name-folder-icon`),n(`${i} ${a.join("")}.folder-icon::before`,v[l]),s.hasFolderIcons=!0}const C=t.folderNamesExpanded;if(C)for(const l in C){const a=[],F=L(l.toLowerCase(),a);a.push(`.${h(F)}-name-folder-icon`),n(`${i} ${f} ${a.join("")}.folder-icon::before`,C[l]),s.hasFolderIcons=!0}const A=t.rootFolderNames;if(A)for(const l in A){const a=l.toLowerCase();n(`${i} .${h(a)}-root-name-folder-icon.rootfolder-icon::before`,A[l]),s.hasFolderIcons=!0}const P=t.rootFolderNamesExpanded;if(P)for(const l in P){const a=l.toLowerCase();n(`${i} ${f} .${h(a)}-root-name-folder-icon.rootfolder-icon::before`,P[l]),s.hasFolderIcons=!0}const I=t.languageIds;if(I){!I.jsonc&&I.json&&(I.jsonc=I.json);for(const l in I)n(`${i} .${h(l)}-lang-file-icon.file-icon::before`,I[l]),s.hasFileIcons=!0,d=!0,u[l]=!0}const j=t.fileExtensions;if(j)for(const l in j){const a=[],x=L(l.toLowerCase(),a).split(".");if(x.length){for(let b=0;b<x.length;b++)a.push(`.${h(x.slice(b).join("."))}-ext-file-icon`);a.push(".ext-file-icon")}n(`${i} ${a.join("")}.file-icon::before`,j[l]),s.hasFileIcons=!0,d=!0}const D=t.fileNames;if(D)for(const l in D){const a=[],F=L(l.toLowerCase(),a);a.push(`.${h(F)}-name-file-icon`),a.push(".name-file-icon");const x=F.split(".");if(x.length){for(let b=1;b<x.length;b++)a.push(`.${h(x.slice(b).join("."))}-ext-file-icon`);a.push(".ext-file-icon")}n(`${i} ${a.join("")}.file-icon::before`,D[l]),s.hasFileIcons=!0,d=!0}}}if(E(o),E(o.light,".vs"),E(o.highContrast,".hc-black"),E(o.highContrast,".hc-light"),!s.hasFileIcons&&!s.hasFolderIcons)return s;const z=o.showLanguageModeIcons===!0||d&&o.showLanguageModeIcons!==!1,p=[],w=o.fonts,R=new Map;if(Array.isArray(w)){const t=this.tryNormalizeFontSize(w[0].size)||"150%";w.forEach(c=>{const n=c.src.map(f=>`${y(k(f.path))} format('${f.format}')`).join(", ");p.push(`@font-face { src: ${n}; font-family: '${c.id}'; font-weight: ${c.weight}; font-style: ${c.style}; font-display: block; }`);const i=this.tryNormalizeFontSize(c.size);i!==void 0&&i!==t&&R.set(c.id,i)}),p.push(`.show-file-icons .file-icon::before, .show-file-icons .folder-icon::before, .show-file-icons .rootfolder-icon::before { font-family: '${w[0].id}'; font-size: ${t}; }`)}const N="\\2001";for(const t in S){const c=S[t],n=o.iconDefinitions[t];if(n){if(n.iconPath)p.push(`${c.join(", ")} { content: '${N}'; background-image: ${y(k(n.iconPath))}; }`);else if(n.fontCharacter||n.fontColor){const i=[];n.fontColor&&i.push(`color: ${n.fontColor};`),n.fontCharacter&&i.push(`content: '${n.fontCharacter}';`);const f=n.fontSize??(n.fontId?R.get(n.fontId):void 0);f&&i.push(`font-size: ${f};`),n.fontId&&i.push(`font-family: ${n.fontId};`),z&&i.push("background-image: unset;"),p.push(`${c.join(", ")} { ${i.join(" ")} }`)}}}if(z){for(const t of this.languageService.getRegisteredLanguageIds())if(!u[t]){const c=this.languageService.getIcon(t);if(c){const n=`.show-file-icons .${h(t)}-lang-file-icon.file-icon::before`;p.push(`${n} { content: '${N}'; background-image: ${y(c.dark)}; }`),p.push(`.vs ${n} { content: '${N}'; background-image: ${y(c.light)}; }`)}}}return s.content=p.join(`
`),s}tryNormalizeFontSize(e){if(!e)return;const r=13;if(e.endsWith("px")){const o=parseInt(e,10);if(!isNaN(o))return Math.round(o/r*100)+"%"}return e}}function L(g,e){const r=g.lastIndexOf("/");if(r>=0){const o=g.substring(0,r);return e.push(`.${h(o)}-name-dir-icon`),g.substring(r+1)}return g}function h(g){return g=g.replace(/[\s]/g,"/"),B.CSS.escape(g)}export{m as FileIconThemeData,le as FileIconThemeLoader};
