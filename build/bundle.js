!function(t){var e={};function s(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);var n=class{constructor(){this.eventMap=new Map}addListener(t,e){this.eventMap.has(t)||this.eventMap.set(t,[]),this.eventMap.get(t).push(e)}removeListener(t,e){if(!this.eventMap.has(t))return;const s=this.eventMap.get(t);s.splice(s.indexOf(e),1)}clearListeners(t){this.eventMap.has(t)&&(this.eventMap.get(t).length=0)}countListeners(t){return this.eventMap.has(t)?this.eventMap.get(t).length:0}getListeners(t){return this.eventMap.get(t)}emit(t){if(!this.eventMap.has(t))return;const e=Array.prototype.splice.call(arguments,1),s=this.eventMap.get(t),n=s.length;let i=0;for(;i<n;)s[i].apply(null,e)?(s.splice(i,1),--i):++i;this.onEventProcessed(t,e)}on(t,e){this.addListener(t,e)}once(t,e){this.addListener(t,()=>(e(),!0))}onEventProcessed(t,e){}};var i=class{constructor(t,e){this.x=0,this.y=0,this.scrollX=0,this.scrollY=0,this.events=new n,this._canvas=t,this._element=e,this._mouseup=this.onMouseUp.bind(this),this._mousedown=this.onMouseDown.bind(this),this._mouseclick=this.onMouseClick.bind(this),this._mousemove=this.onMouseMove.bind(this),this._wheel=this.onMouseWheel.bind(this),this._touchstart=this.onTouchStart.bind(this),this._touchmove=this.onTouchMove.bind(this),this._touchstop=this.onTouchStop.bind(this),this._element.addEventListener("mouseup",this._mouseup),this._element.addEventListener("mousedown",this._mousedown),this._element.addEventListener("click",this._mouseclick),this._element.addEventListener("mousemove",this._mousemove),this._element.addEventListener("wheel",this._wheel),this._element.addEventListener("touchstart",this._touchstart)}destroy(){this._element.removeEventListener("mouseup",this._mouseup),this._element.removeEventListener("mousedown",this._mousedown),this._element.removeEventListener("click",this._mouseclick),this._element.removeEventListener("mousemove",this._mousemove),this._element.removeEventListener("wheel",this._wheel),this._element.removeEventListener("touchstart",this._touchstart)}onMouseUp(t){this.onMouseMove(t),this.events.emit("mouseup",this)}onMouseDown(t){this.onMouseMove(t),this.events.emit("mousedown",this)}onMouseClick(t){this.onMouseMove(t),this.events.emit("mouseclick",this)}onMouseWheel(t){this.scrollX+=t.deltaX,this.scrollY+=t.deltaY,this.events.emit("wheel",this,t.deltaX,t.deltaY)}onMouseMove(t){const e=this._canvas.getBoundingClientRect();this.x=t.clientX-e.left,this.y=t.clientY-e.top}onTouchStart(t){const e=t.touches[0].target;e.addEventListener("touchmove",this._touchmove),e.addEventListener("touchend",this._touchstop),e.addEventListener("touchcancel",this._touchstop)}onTouchStop(t){const e=t.touches[0].target;e.removeEventListener("touchmove",this._touchmove),e.removeEventListener("touchend",this._touchstop),e.removeEventListener("touchcancel",this._touchstop)}onTouchMove(t){this.onMouseMove(t.touches[0])}};const o=16,h=12,r=o*o,a=document.getElementById("content"),c=a.getContext("2d"),l=new i(a,document),u=new class{constructor(){this.targetSource=null,this.targetDestination=null,this.states=[],this.nextAvailableStateID=0}createNewState(){const t={x:Math.random()*a.width,y:Math.random()*a.height,id:this.nextAvailableStateID++,accept:!1};return this.states.push(t),t}toggleAcceptState(t){t.accept=!t.accept}makeInitialState(t){this.states.splice(this.states.indexOf(t),1),this.states.unshift(t)}markTarget(t,e){this.targetSource=this.getStateByPosition(t,e),this.isSelfTargeting=!0}releaseTarget(t,e){if(null===this.targetSource)return;const s=this.getStateByPosition(t,e);(this.isSelfTargeting||null===this.targetDestination)&&s===this.targetSource&&this.toggleAcceptState(s),this.targetSource=null,this.targetDestination=null}getStateByPosition(t,e){for(const s of this.states){const n=t-s.x,i=e-s.y;if(n*n+i*i<r)return s}return null}onUpdate(){if(null!==this.targetSource){const t=this.getStateByPosition(l.x,l.y);this.isSelfTargeting&&t!==this.targetSource&&(this.isSelfTargeting=!1),this.isSelfTargeting||(this.targetDestination=t)}}onRender(){const t=c.fillStyle="yellow";c.strokeStyle="black",c.font="12px Arial",c.textAlign="center";if(this.states.length>0){const t=this.states[0],e=t.x,s=t.y;c.beginPath(),c.moveTo(e-o,s),c.lineTo(e-2*o,s-o),c.lineTo(e-2*o,s+o),c.closePath(),c.fill(),c.stroke()}for(const e of this.states){const s=e.x,n=e.y;c.beginPath(),c.arc(s,n,o,0,2*Math.PI),c.fill(),c.stroke(),e.accept&&(c.beginPath(),c.arc(s,n,h,0,2*Math.PI),c.stroke()),c.fillStyle="black",c.fillText("q"+e.id,s,n+4),c.fillStyle=t}if(null!==this.targetSource&&!this.isSelfTargeting){const t=this.targetSource.x,e=this.targetSource.y,s=null===this.targetDestination?l.x:this.targetDestination.x,n=null===this.targetDestination?l.y:this.targetDestination.y,i=8,o=Math.atan2(n-e,s-t);c.beginPath(),c.moveTo(t,e),c.lineTo(s,n),c.lineTo(s-i*Math.cos(o-Math.PI/6),n-i*Math.sin(o-Math.PI/6)),c.moveTo(s,n),c.lineTo(s-i*Math.cos(o+Math.PI/6),n-i*Math.sin(o+Math.PI/6)),c.stroke()}}};function d(t){a.width=window.innerWidth,a.height=window.innerHeight}l.events.on("mousedown",function(t){u.markTarget(t.x,t.y)}),l.events.on("mouseup",function(t){u.releaseTarget(t.x,t.y)}),document.getElementById("newstate").addEventListener("click",function(t){u.createNewState()}),window.addEventListener("load",d),window.addEventListener("resize",d),window.requestAnimationFrame(function t(e){c.clearRect(0,0,a.width,a.height);u.onUpdate();u.onRender();window.requestAnimationFrame(t)})}]);