var m=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var l=(i,o,r,t)=>{for(var e=t>1?void 0:t?y(o,r):o,n=i.length-1,c;n>=0;n--)(c=i[n])&&(e=(t?c(o,r,e):c(e))||e);return t&&e&&m(o,r,e),e},a=(i,o)=>(r,t)=>o(r,t,i);import{registerWorkbenchContribution2 as g,WorkbenchPhase as h}from"../../../common/contributions.js";import{IBannerService as d}from"../../../services/banner/browser/bannerService.js";import{asJson as f,IRequestService as v}from"../../../../platform/request/common/request.js";import{IProductService as p}from"../../../../platform/product/common/productService.js";import{CancellationToken as u}from"../../../../base/common/cancellation.js";import{ILogService as b}from"../../../../platform/log/common/log.js";import{Codicon as I}from"../../../../base/common/codicons.js";import{arch as S,platform as A}from"../../../../base/common/process.js";let s=class{constructor(o,r,t,e){this.bannerService=o;this.requestService=r;this.productService=t;this.logService=e;if(t.quality!=="insider")return;const n=t.emergencyAlertUrl;n&&this.fetchAlerts(n)}static ID="workbench.contrib.emergencyAlert";async fetchAlerts(o){try{await this.doFetchAlerts(o)}catch(r){this.logService.error(r)}}async doFetchAlerts(o){const r=await this.requestService.request({type:"GET",url:o},u.None);if(r.res.statusCode!==200)throw new Error(`Failed to fetch emergency alerts: HTTP ${r.res.statusCode}`);const t=await f(r);if(t)for(const e of t.alerts){if(e.commit!==this.productService.commit||e.platform&&e.platform!==A||e.arch&&e.arch!==S)return;this.bannerService.show({id:"emergencyAlert.banner",icon:I.warning,message:e.message,actions:e.actions});break}}};s=l([a(0,d),a(1,v),a(2,p),a(3,b)],s),g("workbench.emergencyAlert",s,h.Eventually);export{s as EmergencyAlert};
