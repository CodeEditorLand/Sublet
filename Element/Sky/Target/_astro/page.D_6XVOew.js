function C(e){e=e||1;var t=[],n=0;function r(a){t.push(a)>1||o()}function i(){n--,o()}function o(){n<e&&t.length>0&&(t.shift()(),n++)}return[r,i]}function I(e,t){const n=t?.timeout??50,r=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,n-(Date.now()-r))}})},1)}const P=window.requestIdleCallback||I;var D=P;const p=["mouseenter","touchstart","focus"],b=new Set,w=new Set;function y({href:e}){try{const t=new URL(e);return window.location.origin===t.origin&&window.location.pathname!==t.pathname&&!b.has(e)}catch{}return!1}let E,f;function O(e){b.add(e.href),f.observe(e),p.map(t=>e.addEventListener(t,v,{passive:!0,once:!0}))}function q(e){f.unobserve(e),p.map(t=>e.removeEventListener(t,v))}function v({target:e}){e instanceof HTMLAnchorElement&&S(e)}async function S(e){q(e);const{href:t}=e;try{const n=await fetch(t).then(o=>o.text());E||=new DOMParser;const r=E.parseFromString(n,"text/html"),i=Array.from(r.querySelectorAll('link[rel="stylesheet"]'));await Promise.all(i.filter(o=>!w.has(o.href)).map(o=>(w.add(o.href),fetch(o.href))))}catch{}}function H({selector:e='a[href][rel~="prefetch"]',throttle:t=1,intentSelector:n='a[href][rel~="prefetch-intent"]'}){if(!navigator.onLine)return Promise.reject(new Error("Cannot prefetch, no network connection"));if("connection"in navigator){const o=navigator.connection;if(o.saveData)return Promise.reject(new Error("Cannot prefetch, Save-Data is enabled"));if(/(2|3)g/.test(o.effectiveType))return Promise.reject(new Error("Cannot prefetch, network conditions are poor"))}const[r,i]=C(t);f=f||new IntersectionObserver(o=>{o.forEach(a=>{if(a.isIntersecting&&a.target instanceof HTMLAnchorElement){const d=a.target.getAttribute("rel")||"";let s=!1;Array.isArray(n)?s=n.some(h=>d.includes(h)):s=d.includes(n),s||r(()=>S(a.target).finally(i))}})}),D(()=>{[...document.querySelectorAll(e)].filter(y).forEach(O);const a=Array.isArray(n)?n.join(","):n;[...document.querySelectorAll(a)].filter(y).forEach(s=>{p.map(h=>s.addEventListener(h,v,{passive:!0,once:!0}))})})}const A=new Set,u=new WeakSet;let m=!0,T="hover",L=!1;function M(e){L||(L=!0,m??=!1,T??="hover",j(),N(),x(),U())}function j(){for(const e of["touchstart","mousedown"])document.body.addEventListener(e,t=>{c(t.target,"tap")&&l(t.target.href,{ignoreSlowConnection:!0})},{passive:!0})}function N(){let e;document.body.addEventListener("focusin",r=>{c(r.target,"hover")&&t(r)},{passive:!0}),document.body.addEventListener("focusout",n,{passive:!0}),g(()=>{for(const r of document.getElementsByTagName("a"))u.has(r)||c(r,"hover")&&(u.add(r),r.addEventListener("mouseenter",t,{passive:!0}),r.addEventListener("mouseleave",n,{passive:!0}))});function t(r){const i=r.target.href;e&&clearTimeout(e),e=setTimeout(()=>{l(i)},80)}function n(){e&&(clearTimeout(e),e=0)}}function x(){let e;g(()=>{for(const t of document.getElementsByTagName("a"))u.has(t)||c(t,"viewport")&&(u.add(t),e??=R(),e.observe(t))})}function R(){const e=new WeakMap;return new IntersectionObserver((t,n)=>{for(const r of t){const i=r.target,o=e.get(i);r.isIntersecting?(o&&clearTimeout(o),e.set(i,setTimeout(()=>{n.unobserve(i),e.delete(i),l(i.href)},300))):o&&(clearTimeout(o),e.delete(i))}})}function U(){g(()=>{for(const e of document.getElementsByTagName("a"))c(e,"load")&&l(e.href)})}function l(e,t){e=e.replace(/#.*/,"");const n=t?.ignoreSlowConnection??!1;if(V(e,n))if(A.add(e),HTMLScriptElement.supports?.("speculationrules"))B(e);else if(document.createElement("link").relList?.supports?.("prefetch")&&t?.with!=="fetch"){const r=document.createElement("link");r.rel="prefetch",r.setAttribute("href",e),document.head.append(r)}else fetch(e,{priority:"low"})}function V(e,t){if(!navigator.onLine||!t&&k())return!1;try{const n=new URL(e,location.href);return location.origin===n.origin&&(location.pathname!==n.pathname||location.search!==n.search)&&!A.has(e)}catch{}return!1}function c(e,t){if(e?.tagName!=="A")return!1;const n=e.dataset.astroPrefetch;return n==="false"?!1:t==="tap"&&(n!=null||m)&&k()?!0:n==null&&m||n===""?t===T:n===t}function k(){if("connection"in navigator){const e=navigator.connection;return e.saveData||/2g/.test(e.effectiveType)}return!1}function g(e){e();let t=!1;document.addEventListener("astro:page-load",()=>{if(!t){t=!0;return}e()})}function B(e){const t=document.createElement("script");t.type="speculationrules",t.textContent=JSON.stringify({prerender:[{source:"list",urls:[e]}],prefetch:[{source:"list",urls:[e]}]}),document.head.append(t)}H({});M();
