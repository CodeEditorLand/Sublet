import{timeout as o}from"../../../../base/common/async.js";async function s(e,i){return new Promise((r,n)=>{const t=o(2e3);t.then(()=>n("Writing to xterm is taking longer than 2 seconds")),e.write(i,()=>{t.cancel(),r()})})}export{s as writeP};
