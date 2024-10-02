import"./terminal.js";import{DynamicListEventMultiplexer as c,Event as r,EventMultiplexer as M}from"../../../../base/common/event.js";import{DisposableMap as I,DisposableStore as D}from"../../../../base/common/lifecycle.js";import"../../../../platform/terminal/common/capabilities/capabilities.js";function A(l,d,p,s,b){const a=new D,m=a.add(new M),t=a.add(new I);function o(e,i){const v=m.add(r.map(b(i),C=>({instance:e,data:C})));let n=t.get(e.instanceId);n||(n=new I,t.set(e.instanceId,n)),n.set(i,v)}for(const e of l){const i=e.capabilities.get(s);i&&o(e,i)}a.add(p(e=>{t.deleteAndDispose(e.instanceId)}));const T=a.add(new c(l,d,p,e=>r.map(e.capabilities.onDidAddCapability,i=>({instance:e,changeEvent:i}))));a.add(T.event(e=>{e.changeEvent.id===s&&o(e.instance,e.changeEvent.capability)}));const y=a.add(new c(l,d,p,e=>r.map(e.capabilities.onDidRemoveCapability,i=>({instance:e,changeEvent:i}))));return a.add(y.event(e=>{e.changeEvent.id===s&&t.get(e.instance.instanceId)?.deleteAndDispose(e.changeEvent.id)})),{dispose:()=>a.dispose(),event:m.event}}export{A as createInstanceCapabilityEventMultiplexer};
