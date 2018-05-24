!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);var i={__events:new Map,addListener(t,e){this.__events.has(t)||this.__events.set(t,[]),this.__events.get(t).push(e)},removeListener(t,e){if(!this.__events.has(t))return;const s=this.__events.get(t);s.splice(s.indexOf(e),1)},clearListeners(t){if(!this.__events.has(t))return;this.__events.get(t).length=0},countListeners(t){return this.__events.has(t)?this.__events.get(t).length:0},getListeners(t){return this.__events.get(t)},emit(t){if(!this.__events.has(t))return;const e=Array.prototype.splice.call(arguments,1),s=this.__events.get(t),i=s.length;let n=0;for(;n<i;){s[n].apply(null,e)?(s.splice(n,1),--n):++n}this.onEventProcessed(t,e)},on(t,e){this.addListener(t,e)},once(t,e){this.addListener(t,()=>(e(),!0))},onEventProcessed(t,e){}};const n=!0;class o{constructor(t,e){this.x=0,this.y=0,this.scrollX=0,this.scrollY=0,this._canvas=t,this._element=e,this._mouseup=this.onMouseUp.bind(this),this._mousedown=this.onMouseDown.bind(this),this._mouseclick=this.onMouseClick.bind(this),this._mousemove=this.onMouseMove.bind(this),this._wheel=this.onMouseWheel.bind(this),this._touchstart=this.onTouchStart.bind(this),this._touchmove=this.onTouchMove.bind(this),this._touchstop=this.onTouchStop.bind(this),this._contextmenu=(t=>!n||(t.preventDefault(),!1)),this._element.addEventListener("contextmenu",this._contextmenu,!1),this._element.addEventListener("mouseup",this._mouseup),this._element.addEventListener("mousedown",this._mousedown),this._element.addEventListener("click",this._mouseclick),this._element.addEventListener("mousemove",this._mousemove),this._element.addEventListener("wheel",this._wheel),this._element.addEventListener("touchstart",this._touchstart)}destroy(){this._element.removeEventListener("contextmenu",this._contextmenu),this._element.removeEventListener("mouseup",this._mouseup),this._element.removeEventListener("mousedown",this._mousedown),this._element.removeEventListener("click",this._mouseclick),this._element.removeEventListener("mousemove",this._mousemove),this._element.removeEventListener("wheel",this._wheel),this._element.removeEventListener("touchstart",this._touchstart)}onMouseUp(t){this.onMouseMove(t),this.emit("mouseup",this,t.which)}onMouseDown(t){this.onMouseMove(t),this.emit("mousedown",this,t.which)}onMouseClick(t){this.onMouseMove(t),this.emit("mouseclick",this,t.which)}onMouseWheel(t){this.scrollX+=t.deltaX,this.scrollY+=t.deltaY,this.emit("mousewheel",this,t.deltaX,t.deltaY)}onMouseMove(t){const e=this._canvas.getBoundingClientRect();this.x=t.clientX-e.left,this.y=t.clientY-e.top}onTouchStart(t){const e=t.touches[0].target;e.addEventListener("touchmove",this._touchmove),e.addEventListener("touchend",this._touchstop),e.addEventListener("touchcancel",this._touchstop)}onTouchStop(t){const e=t.touches[0].target;e.removeEventListener("touchmove",this._touchmove),e.removeEventListener("touchend",this._touchstop),e.removeEventListener("touchcancel",this._touchstop)}onTouchMove(t){this.onMouseMove(t.touches[0])}}o.BUTTON_LEFT=0,o.BUTTON_MIDDLE=1,o.BUTTON_RIGHT=2,Object.assign(o.prototype,i);var h=o;class r{constructor(t){this.nodes=[],this.edges=[],this.graphLabelStates=document.getElementById("graph-states"),this.canvas=t,this._offsetX=0,this._offsetY=0,this.nextOffsetX=0,this.nextOffsetY=0}get centerX(){return this.canvas.width/2+this._offsetX}get centerY(){return this.canvas.height/2+this._offsetY}get offsetX(){return this._offsetX}get offsetY(){return this._offsetY}set offsetX(t){this.nextOffsetX=t}set offsetY(t){this.nextOffsetY=t}onCreateNode(t){const e=document.createElement("label");e.setAttribute("contenteditable","true"),e.addEventListener("input",s=>{t.label=e.textContent}),e.innerHTML=t.label,t._element=e,this.graphLabelStates.appendChild(e)}onDestroyNode(t){this.graphLabelStates.removeChild(t._element)}createNewNode(){const t=new a(this,0,0);return 0==this.nodes.length&&this.emit("newInitial",t,null),this.nodes.push(t),this.emit("nodeCreate",t),t}destroyNode(t){this.nodes.splice(this.nodes.indexOf(t),1),this.emit("nodeDestroy",t)}createNewEdge(t,e){const s=new l(this,t,e);return t==e&&(s.y=t.y-SELF_LOOP_HEIGHT),this.edges.push(s),this.emit("edgeCreate",s),s}destroyEdge(t){this.edges.splice(this.edges.indexOf(t),1),this.emit("edgeDestroy",result)}clear(){for(let t of this.nodes)this.emit("nodeDestroy",t);this.nodes.length=0;for(let t of this.edges)this.emit("edgeDestroy",t);this.edges.length=0}update(t){this._offsetX=c(this._offsetX,this.nextOffsetX,t),this._offsetY=c(this._offsetY,this.nextOffsetY,t);for(let e of this.nodes)e.update(t)}setInitialState(t){if(this.nodes.length<=1)return;this.nodes.splice(this.nodes.indexOf(t),1);const e=this.nodes[0];this.nodes.unshift(t),this.emit("newInitial",t,e)}toggleAcceptState(t){t.accept=!t.accept,this.emit("toggleAccept",t)}getInitialState(){return this.nodes.length>0?this.nodes[0]:null}}Object.assign(r.prototype,i);class a{constructor(t,e=0,s=0,i="q"){this.graph=t,this.label=i,this._x=e,this._y=s,this.nextX=e,this.nextY=s,this.accept=!1}get x(){return this._x+this.graph.centerX}get y(){return this._y+this.graph.centerY}set x(t){this.nextX=t}set y(t){this.nextY=t}update(t){this._x=c(this._x,this.nextX,t),this._y=c(this._y,this.nextY,t)}}class l{constructor(t,e,s,i="#"){this.graph=t,this.label=i,this.from=e,this.to=s,this.quad=null}get centerX(){return this.from.x+(this.to.x-this.from.x)/2}get centerY(){return this.from.y+(this.to.y-this.from.y)/2}get x(){const t=this.centerX;return null!=this.quad?this.quad.x+t:t}get y(){const t=this.centerY;return null!=this.quad?this.quad.y+t:t}set x(t){null==this.quad&&(this.quad={x:0,y:0}),this.quad.x=t-this.centerX,Math.abs(this.quad.x)<8&&(this.quad.x=0),0==this.quad.x&&0==this.quad.y&&(this.quad=null)}set y(t){null==this.quad&&(this.quad={x:0,y:0}),this.quad.y=t-this.centerY,Math.abs(this.quad.y)<8&&(this.quad.y=0),0==this.quad.x&&0==this.quad.y&&(this.quad=null)}isSelfLoop(){return this.from==this.to}}function c(t,e,s){return t*(1-s)+e*s}function u(t,e){const s=e.x,i=e.y,n=e.label,o=e.accept;t.fillStyle=NODE_FILL_STYLE,t.beginPath(),t.arc(s,i,NODE_RADIUS,0,PI2),t.fill(),t.stroke(),o&&(t.beginPath(),t.arc(s,i,NODE_RADIUS_INNER,0,PI2),t.stroke()),t.fillStyle=NODE_TEXT_FILL_STYLE,t.fillText(n,s,i+4)}function d(t,e){const s=e.from,i=e.to,n=e.x,o=e.y,h=e.centerX,r=e.centerY,l=e.quad,c=e.label;let u=0,d=0,_=0;if(null==l){const e=s.x-i.x,n=s.y-i.y,o=-Math.atan2(n,e)-HALF_PI,h=NODE_RADIUS*Math.sin(o),r=NODE_RADIUS*Math.cos(o),l=s.x+h,c=s.y+r;u=i.x-(i instanceof a?h:0),d=i.y-(i instanceof a?r:0),_=Math.atan2(l-u,c-d)+Math.PI,t.beginPath(),t.moveTo(l,c),t.lineTo(u,d)}else{const e=h+2*l.x,n=r+2*l.y,o=s.x-e,c=s.y-n,g=-Math.atan2(c,o)-HALF_PI+(s==i?FOURTH_PI:0),m=NODE_RADIUS*Math.sin(g),v=NODE_RADIUS*Math.cos(g),f=e-i.x,E=n-i.y,y=-Math.atan2(E,f)-HALF_PI+(s==i?-FOURTH_PI:0),p=NODE_RADIUS*Math.sin(y),x=NODE_RADIUS*Math.cos(y),S=s.x+m,T=s.y+v;u=i.x-(i instanceof a?p:0),d=i.y-(i instanceof a?x:0),_=Math.atan2(e-u,n-d)+Math.PI,t.beginPath(),t.moveTo(S,T),t.quadraticCurveTo(e,n,u,d)}if(t.moveTo(u-ARROW_WIDTH*Math.sin(_-SIXTH_PI),d-ARROW_WIDTH*Math.cos(_-SIXTH_PI)),t.lineTo(u,d),t.lineTo(u-ARROW_WIDTH*Math.sin(_+SIXTH_PI),d-ARROW_WIDTH*Math.cos(_+SIXTH_PI)),t.stroke(),t.closePath(),c.length>0){let e=null==l?h:n,s=null==l?r:o+8*Math.sign(l.y);const i=3*c.length;t.clearRect(e-i-2,s-5,2*i+4,10),t.fillText(c,e,s+4)}}var _=new class{constructor(){this.hoverAngle=0}render(t,e,s){if(this.drawNodes(t,s.nodes),s.nodes.length>0){const e=s.getInitialState();t.save(),function(t,e){const s=e.x,i=e.y;t.strokeStyle=EDGE_STROKE_STYLE,t.beginPath(),t.moveTo(s-NODE_RADIUS,i),t.lineTo(s-NODE_DIAMETER,i-NODE_RADIUS),t.lineTo(s-NODE_DIAMETER,i+NODE_RADIUS),t.closePath(),t.stroke()}(t,e),t.restore()}this.drawEdges(t,s.edges),this.hoverAngle=(this.hoverAngle+HOVER_ANGLE_SPEED)%PI2}drawNodes(t,e){if(t.save(),t.font=NODE_FONT,t.textAlign=NODE_TEXT_ALIGN,t.strokeStyle=NODE_STROKE_STYLE,t.fillStyle=NODE_FILL_STYLE,Array.isArray(e))for(let s of e)u(t,s);else u(t,e);t.restore()}drawEdges(t,e){if(t.save(),t.font=EDGE_FONT,t.textAlign=EDGE_TEXT_ALIGN,t.strokeStyle=EDGE_STROKE_STYLE,Array.isArray(e))for(let s of e)d(t,s);else d(t,e);t.restore()}drawHoverCircle(t,e,s,i){t.save();{const n=this.hoverAngle;t.strokeStyle=HOVER_STROKE_STYLE,t.lineWidth=HOVER_LINE_WIDTH,t.beginPath(),t.setLineDash(HOVER_LINE_DASH),t.arc(e,s,i,0+n,PI2+n),t.stroke()}t.restore()}};var g=new class{constructor(){this._simulatePhysics=!1}sort(){this._simulatePhysics=!0}update(t,e){if(this._simulatePhysics){let t=!1;for(const s of e.nodes)for(const i of e.nodes){if(s==i)continue;const e=s.nextX-i.nextX,n=s.nextY-i.nextY;e*e+n*n<PADDING_RADIUS_SQU&&(s.nextX+=.5*e,s.nextY+=.5*n,t=!0)}this._simulatePhysics=t}}};var m=class{constructor(t,e,s){this.canvas=t,this.mouse=e,this.graph=s,this.targetSource=null,this.targetDestination=null,this.prevMouse={x:0,y:0},this.moveTarget=null,this.moveGraph=null,this.selectorAngle=0,this.selectEdge=new l(null,null,"")}load(){this.mouse.on("mousedown",(t,e)=>{3==e?this.startMove(t.x,t.y):this.markTarget(t.x,t.y),this.prevMouse.x=t.x,this.prevMouse.y=t.y}),this.mouse.on("mouseup",(t,e)=>{3==e?this.endMove(t.x,t.y):this.releaseTarget(t.x,t.y),this.prevMouse.x=t.x,this.prevMouse.y=t.y}),document.getElementById("new_state").addEventListener("click",t=>{this.createNewState()}),document.getElementById("clear_graph").addEventListener("click",t=>{this.graph.clear()}),document.getElementById("simulate_physics").addEventListener("click",t=>{g.sort()}),document.getElementById("export_image").addEventListener("click",t=>{const e=this.canvas.toDataURL("image/png");download(e,EXPORT_FILE_NAME,"image/png")})}draw(t,e){let s=this.getStateByPosition(this.mouse.x,this.mouse.y);null!=this.targetSource&&(this.isSelfMode&&s!=this.targetSource&&(this.isSelfMode=!1),this.isSelfMode||(this.targetDestination=s)),null==this.targetSource||this.isSelfMode||(this.selectEdge.from=this.targetSource,this.selectEdge.to=this.targetDestination||this.mouse,this.targetSource==this.targetDestination?this.selectEdge.y=this.selectEdge.from.y-SELF_LOOP_HEIGHT:this.selectEdge.quad=null,_.drawEdges(t,this.selectEdge)),null!=this.moveTarget&&(this.moveTarget instanceof l?(this.moveTarget.x=this.mouse.x,this.moveTarget.y=this.mouse.y):(this.moveTarget.x=this.mouse.x-this.graph.centerX,this.moveTarget.y=this.mouse.y-this.graph.centerY),s=this.moveTarget),null!=this.moveGraph&&(this.graph.offsetX=this.mouse.x-this.moveGraph.x,this.graph.offsetY=this.mouse.y-this.moveGraph.y),null==s&&(s=this.getEdgeByPosition(this.mouse.x,this.mouse.y)),null!=s&&_.drawHoverCircle(t,s.x,s.y,NODE_RADIUS+4)}createNewState(){const t=Math.random()*SPAWN_RADIUS*2-SPAWN_RADIUS,e=Math.random()*SPAWN_RADIUS*2-SPAWN_RADIUS,s=this.graph.createNewNode();return s.x=t,s.y=e,s.accept=!1,s}createNewTransition(t,e){const s=this.graph.createNewEdge(t,e);return s.label="0",s}markTarget(t,e){this.targetSource=this.getStateByPosition(t,e),this.isSelfMode=!0}releaseTarget(t,e){if(null==this.targetSource){const s=t-this.prevMouse.x,i=e-this.prevMouse.y;if(s*s+i*i<CLICK_RADIUS_SQU){const s=this.graph.createNewNode();s.x=t-this.graph.centerX,s.y=e-this.graph.centerY,s.accept=!1}return}const s=this.getStateByPosition(t,e);this.isSelfMode||null==this.targetDestination?s==this.targetSource&&this.graph.toggleAcceptState(s):this.createNewTransition(this.targetSource,this.targetDestination),this.targetSource=null,this.targetDestination=null}startMove(t,e){this.moveTarget=this.getEdgeByPosition(t,e)||this.getStateByPosition(t,e),null==this.moveTarget&&(this.moveGraph={x:this.mouse.x,y:this.mouse.y})}endMove(t,e){null!=this.moveTarget&&(this.moveTarget instanceof l?(this.moveTarget.x=this.mouse.x,this.moveTarget.y=this.mouse.y):(this.moveTarget.x=this.mouse.x-this.graph.centerX,this.moveTarget.y=this.mouse.y-this.graph.centerY),this.moveTarget=null),null!=this.moveGraph&&(this.graph.offsetX=this.mouse.x-this.moveGraph.x,this.graph.offsetY=this.mouse.y-this.moveGraph.y,this.moveGraph=null)}getStateByPosition(t,e){for(const s of this.graph.nodes){const i=t-s.x,n=e-s.y;if(i*i+n*n<RADIUS_SQU)return s}return null}getEdgeByPosition(t,e){for(const s of this.graph.edges){const i=t-s.x,n=e-s.y;if(i*i+n*n<EDGE_RADIUS_SQU)return s}return null}};const v=document.getElementById("canvas"),f=v.getContext("2d"),E=new h(v,v);function y(t){v.width=window.innerWidth,v.height=window.innerHeight}window.addEventListener("load",y),window.addEventListener("resize",y),window.onload=function(){let t=null,e=null,s=null;(t=p.createNewNode()).x=-64,t.y=0,t.label="q0",(e=p.createNewNode()).x=64,e.y=0,e.label="q1",(s=p.createNewEdge(t,e)).label="abc",x.load()},window.requestAnimationFrame(function t(e){f.clearRect(0,0,v.width,v.height);!function(t,e){const s=(e-T)/S;p.update(s),g.update(s,p),_.render(t,s,p),x.draw(t,s),T=e}(f,e);window.requestAnimationFrame(t)});const p=new r(v),x=new m(v,E,p);let S=60,T=0}]);