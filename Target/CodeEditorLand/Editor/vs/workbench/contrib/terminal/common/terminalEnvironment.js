import*as u from"../../../../base/common/path.js";import{URI as _}from"../../../../base/common/uri.js";import"../../../../platform/workspace/common/workspace.js";import"../../../services/configurationResolver/common/configurationResolver.js";import{sanitizeProcessEnvironment as w}from"../../../../base/common/processes.js";import{WindowsShellType as m}from"../../../../platform/terminal/common/terminal.js";import{isWindows as g,isMacintosh as L,language as h,OperatingSystem as c}from"../../../../base/common/platform.js";import{escapeNonWindowsPath as p,sanitizeCwd as I}from"../../../../platform/terminal/common/terminalEnvironment.js";import{isString as y}from"../../../../base/common/types.js";import"../../../services/history/common/history.js";import"../../../../platform/log/common/log.js";function P(n,e){if(e)if(g)for(const i in e){let r=i;for(const a in n)if(i.toLowerCase()===a.toLowerCase()){r=a;break}const s=e[i];s!==void 0&&v(n,r,s)}else Object.keys(e).forEach(i=>{const r=e[i];r!==void 0&&v(n,i,r)})}function v(n,e,i){typeof i=="string"?n[e]=i:delete n[e]}function N(n,e,i,r){n.TERM_PROGRAM="vscode",e&&(n.TERM_PROGRAM_VERSION=e),C(n,r)&&(n.LANG=D(i)),n.COLORTERM="truecolor"}function O(n,e){if(e)for(const i of Object.keys(e)){const r=e[i];r!=null&&(n[i]=r)}}async function S(n,e){return await Promise.all(Object.entries(e).map(async([i,r])=>{if(typeof r=="string")try{e[i]=await n(r)}catch{e[i]=r}})),e}function C(n,e){if(e==="on")return!0;if(e==="auto"){const i=n.LANG;return!i||i.search(/\.UTF\-8$/)===-1&&i.search(/\.utf8$/)===-1&&i.search(/\.euc.+/)===-1}return!1}function D(n){const e=n?n.split("-"):[],i=e.length;if(i===0)return"en_US.UTF-8";if(i===1){const r={af:"ZA",am:"ET",be:"BY",bg:"BG",ca:"ES",cs:"CZ",da:"DK",de:"DE",el:"GR",en:"US",es:"ES",et:"EE",eu:"ES",fi:"FI",fr:"FR",he:"IL",hr:"HR",hu:"HU",hy:"AM",is:"IS",it:"IT",ja:"JP",kk:"KZ",ko:"KR",lt:"LT",nl:"NL",no:"NO",pl:"PL",pt:"BR",ro:"RO",ru:"RU",sk:"SK",sl:"SI",sr:"YU",sv:"SE",tr:"TR",uk:"UA",zh:"CN"};e[0]in r&&e.push(r[e[0]])}else e[1]=e[1].toUpperCase();return e.join("_")+".UTF-8"}async function q(n,e,i,r,s,a){if(n.cwd){const t=typeof n.cwd=="object"?n.cwd.fsPath:n.cwd,f=await R(t,i);return I(f||t)}let o;return!n.ignoreConfigurationCwd&&s&&(i&&(s=await R(s,i,a)),s&&(u.isAbsolute(s)?o=s:r&&(o=u.join(r.fsPath,s)))),o||(o=r?r.fsPath:e||""),I(o)}async function R(n,e,i){if(e)try{return await e(n)}catch(r){i?.error("Could not resolve terminal cwd",r);return}return n}function Q(n,e,i){if(i)return r=>i.resolveWithEnvironment(e,n,r)}async function ee(n,e,i,r,s,a){const o={};if(n.strictEnv)O(o,n.env);else{O(o,a);const t={...e};i&&(t&&await S(i,t),n.env&&await S(i,n.env)),L&&(o.VSCODE_NODE_OPTIONS&&(o.NODE_OPTIONS=o.VSCODE_NODE_OPTIONS,delete o.VSCODE_NODE_OPTIONS),o.VSCODE_NODE_REPL_EXTERNAL_MODULE&&(o.NODE_REPL_EXTERNAL_MODULE=o.VSCODE_NODE_REPL_EXTERNAL_MODULE,delete o.VSCODE_NODE_REPL_EXTERNAL_MODULE)),w(o,"VSCODE_IPC_HOOK_CLI"),P(o,t),P(o,n.env),N(o,r,h,s)}return o}async function ne(n,e,i,r,s,a,o=g){let t;if(y(n)?t=n:(t=n.fsPath,o&&a!==c.Windows?t=t.replace(/\\/g,"/"):!o&&a===c.Windows&&(t=t.replace(/\//g,"\\"))),!e)return t;const f=t.includes(" "),T=t.includes("(")||t.includes(")"),l=u.basename(e,".exe"),E=l==="pwsh"||i==="pwsh"||l==="powershell"||i==="powershell";if(E&&(f||t.includes("'")))return`& '${t.replace(/'/g,"''")}'`;if(T&&E)return`& '${t}'`;if(a===c.Windows){if(r!==void 0)return r===m.GitBash?p(t.replace(/\\/g,"/")):r===m.Wsl?s?.getWslPath(t,"win-to-unix")||t:f?`"${t}"`:t;const d=e.toLowerCase();return d.includes("wsl")||d.includes("bash.exe")&&!d.toLowerCase().includes("git")?s?.getWslPath(t,"win-to-unix")||t:f?`"${t}"`:t}return p(t)}function ie(n,e,i){const r=typeof n=="string"?_.parse(n):n;let s=r?e.getWorkspaceFolder(r)??void 0:void 0;if(!s){const a=i.getLastActiveWorkspaceRoot();s=a?e.getWorkspaceFolder(a)??void 0:void 0}return s}export{N as addTerminalEnvironmentKeys,ee as createTerminalEnvironment,Q as createVariableResolver,q as getCwd,D as getLangEnvVariable,ie as getWorkspaceForTerminal,P as mergeEnvironments,ne as preparePathForShell,C as shouldSetLangEnvVariable};
