import{CharCode as l}from"../../../base/common/charCode.js";import*as b from"../../../base/common/strings.js";class a{static _nextVisibleColumn(e,t,o){return e===l.Tab?a.nextRenderTabStop(t,o):b.isFullWidthCharacter(e)||b.isEmojiImprecise(e)?t+2:t+1}static visibleColumnFromColumn(e,t,o){const u=Math.min(t-1,e.length),n=e.substring(0,u),r=new b.GraphemeIterator(n);let i=0;for(;!r.eol();){const m=b.getNextCodePoint(n,u,r.offset);r.nextGraphemeLength(),i=this._nextVisibleColumn(m,i,o)}return i}static toStatusbarColumn(e,t,o){const u=e.substring(0,Math.min(t-1,e.length)),n=new b.CodePointIterator(u);let r=0;for(;!n.eol();)n.nextCodePoint()===l.Tab?r=a.nextRenderTabStop(r,o):r=r+1;return r+1}static columnFromVisibleColumn(e,t,o){if(t<=0)return 1;const u=e.length,n=new b.GraphemeIterator(e);let r=0,i=1;for(;!n.eol();){const m=b.getNextCodePoint(e,u,n.offset);n.nextGraphemeLength();const s=this._nextVisibleColumn(m,r,o),c=n.offset+1;if(s>=t){const p=t-r;return s-t<p?c:i}r=s,i=c}return u+1}static nextRenderTabStop(e,t){return e+t-e%t}static nextIndentTabStop(e,t){return a.nextRenderTabStop(e,t)}static prevRenderTabStop(e,t){return Math.max(0,e-1-(e-1)%t)}static prevIndentTabStop(e,t){return a.prevRenderTabStop(e,t)}}export{a as CursorColumns};
