var a=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var v=(m,r,o,i)=>{for(var e=i>1?void 0:i?p(r,o):r,c=m.length-1,I;c>=0;c--)(I=m[c])&&(e=(i?I(r,o,e):I(e))||e);return i&&e&&a(r,o,e),e},t=(m,r)=>(o,i)=>r(o,i,m);import{ILogService as s}from"../../../../platform/log/common/log.js";import{IUserDataProfilesService as S}from"../../../../platform/userDataProfile/common/userDataProfile.js";import{IUriIdentityService as f}from"../../../../platform/uriIdentity/common/uriIdentity.js";import{ITelemetryService as l}from"../../../../platform/telemetry/common/telemetry.js";import{AbstractExtensionsProfileScannerService as y,IExtensionsProfileScannerService as g}from"../../../../platform/extensionManagement/common/extensionsProfileScannerService.js";import{IFileService as d}from"../../../../platform/files/common/files.js";import{InstantiationType as D,registerSingleton as U}from"../../../../platform/instantiation/common/extensions.js";import{IWorkbenchEnvironmentService as b}from"../../environment/common/environmentService.js";let n=class extends y{constructor(r,o,i,e,c,I){super(r.userRoamingDataHome,o,i,e,c,I)}};n=v([t(0,b),t(1,d),t(2,S),t(3,f),t(4,l),t(5,s)],n),U(g,n,D.Delayed);export{n as ExtensionsProfileScannerService};
