import{Position as o}from"./position.js";import{Range as s}from"./range.js";var l=(t=>(t[t.LTR=0]="LTR",t[t.RTL=1]="RTL",t))(l||{});class i extends s{selectionStartLineNumber;selectionStartColumn;positionLineNumber;positionColumn;constructor(e,t,n,r){super(e,t,n,r),this.selectionStartLineNumber=e,this.selectionStartColumn=t,this.positionLineNumber=n,this.positionColumn=r}toString(){return"["+this.selectionStartLineNumber+","+this.selectionStartColumn+" -> "+this.positionLineNumber+","+this.positionColumn+"]"}equalsSelection(e){return i.selectionsEqual(this,e)}static selectionsEqual(e,t){return e.selectionStartLineNumber===t.selectionStartLineNumber&&e.selectionStartColumn===t.selectionStartColumn&&e.positionLineNumber===t.positionLineNumber&&e.positionColumn===t.positionColumn}getDirection(){return this.selectionStartLineNumber===this.startLineNumber&&this.selectionStartColumn===this.startColumn?0:1}setEndPosition(e,t){return this.getDirection()===0?new i(this.startLineNumber,this.startColumn,e,t):new i(e,t,this.startLineNumber,this.startColumn)}getPosition(){return new o(this.positionLineNumber,this.positionColumn)}getSelectionStart(){return new o(this.selectionStartLineNumber,this.selectionStartColumn)}setStartPosition(e,t){return this.getDirection()===0?new i(e,t,this.endLineNumber,this.endColumn):new i(this.endLineNumber,this.endColumn,e,t)}static fromPositions(e,t=e){return new i(e.lineNumber,e.column,t.lineNumber,t.column)}static fromRange(e,t){return t===0?new i(e.startLineNumber,e.startColumn,e.endLineNumber,e.endColumn):new i(e.endLineNumber,e.endColumn,e.startLineNumber,e.startColumn)}static liftSelection(e){return new i(e.selectionStartLineNumber,e.selectionStartColumn,e.positionLineNumber,e.positionColumn)}static selectionsArrEqual(e,t){if(e&&!t||!e&&t)return!1;if(!e&&!t)return!0;if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(!this.selectionsEqual(e[n],t[n]))return!1;return!0}static isISelection(e){return e&&typeof e.selectionStartLineNumber=="number"&&typeof e.selectionStartColumn=="number"&&typeof e.positionLineNumber=="number"&&typeof e.positionColumn=="number"}static createWithDirection(e,t,n,r,u){return u===0?new i(e,t,n,r):new i(n,r,e,t)}}export{i as Selection,l as SelectionDirection};
