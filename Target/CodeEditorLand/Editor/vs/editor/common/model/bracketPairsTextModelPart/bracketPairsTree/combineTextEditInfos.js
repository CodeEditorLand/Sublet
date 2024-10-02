import{ArrayQueue as B}from"../../../../../base/common/arrays.js";import{TextEditInfo as O}from"./beforeEditPositionMapper.js";import{lengthAdd as c,lengthDiffNonNegative as u,lengthEquals as T,lengthIsZero as m,lengthToObj as w,lengthZero as a,sumLengths as E}from"./length.js";function y(g,n){if(g.length===0)return n;if(n.length===0)return g;const i=new B(M(g)),o=M(n);o.push({modified:!1,lengthBefore:void 0,lengthAfter:void 0});let s=i.dequeue();function p(e){if(e===void 0){const t=i.takeWhile(f=>!0)||[];return s&&t.unshift(s),t}const h=[];for(;s&&!m(e);){const[t,f]=s.splitAt(e);h.push(t),e=u(t.lengthAfter,e),s=f??i.dequeue()}return m(e)||h.push(new l(!1,e,e)),h}const r=[];function L(e,h,t){if(r.length>0&&T(r[r.length-1].endOffset,e)){const f=r[r.length-1];r[r.length-1]=new O(f.startOffset,h,c(f.newLength,t))}else r.push({startOffset:e,endOffset:h,newLength:t})}let d=a;for(const e of o){const h=p(e.lengthBefore);if(e.modified){const t=E(h,A=>A.lengthBefore),f=c(d,t);L(d,f,e.lengthAfter),d=f}else for(const t of h){const f=d;d=c(d,t.lengthBefore),t.modified&&L(f,d,t.lengthAfter)}}return r}class l{constructor(n,i,o){this.modified=n;this.lengthBefore=i;this.lengthAfter=o}splitAt(n){const i=u(n,this.lengthAfter);return T(i,a)?[this,void 0]:this.modified?[new l(this.modified,this.lengthBefore,n),new l(this.modified,a,i)]:[new l(this.modified,n,n),new l(this.modified,i,i)]}toString(){return`${this.modified?"M":"U"}:${w(this.lengthBefore)} -> ${w(this.lengthAfter)}`}}function M(g){const n=[];let i=a;for(const o of g){const s=u(i,o.startOffset);m(s)||n.push(new l(!1,s,s));const p=u(o.startOffset,o.endOffset);n.push(new l(!0,p,o.newLength)),i=o.endOffset}return n}export{y as combineTextEditInfos};
