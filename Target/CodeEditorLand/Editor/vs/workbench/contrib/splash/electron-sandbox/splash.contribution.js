var d=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var m=(i,r,t,s)=>{for(var o=s>1?void 0:s?h(r,t):r,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=(s?n(r,t,o):n(o))||o);return s&&o&&d(r,t,o),o},p=(i,r)=>(t,s)=>r(t,s,i);import{WorkbenchPhase as I,registerWorkbenchContribution2 as c}from"../../../common/contributions.js";import{ISplashStorageService as f}from"../browser/splash.js";import{INativeHostService as v}from"../../../../platform/native/common/native.js";import{InstantiationType as S,registerSingleton as P}from"../../../../platform/instantiation/common/extensions.js";import{PartsSplash as l}from"../browser/partsSplash.js";import"../../../../platform/theme/common/themeService.js";let e=class{_serviceBrand;saveWindowSplash;constructor(r){this.saveWindowSplash=r.saveWindowSplash.bind(r)}};e=m([p(0,v)],e),P(f,e,S.Delayed),c(l.ID,l,I.BlockStartup);
