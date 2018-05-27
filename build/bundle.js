!function(t){var e={};function s(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);var o={__events:new Map,addListener(t,e){this.__events.has(t)||this.__events.set(t,[]),this.__events.get(t).push(e)},removeListener(t,e){if(!this.__events.has(t))return;const s=this.__events.get(t);s.splice(s.indexOf(e),1)},clearListeners(t){if(!this.__events.has(t))return;this.__events.get(t).length=0},countListeners(t){return this.__events.has(t)?this.__events.get(t).length:0},getListeners(t){return this.__events.get(t)},emit(t){if(!this.__events.has(t))return;const e=Array.prototype.splice.call(arguments,1),s=this.__events.get(t),o=s.length;let i=0;for(;i<o;){s[i].apply(null,e)?(s.splice(i,1),--i):++i}this.onEventProcessed(t,e)},on(t,e){this.addListener(t,e)},once(t,e){this.addListener(t,()=>(e(),!0))},onEventProcessed(t,e){}};const i=!0;class r{constructor(t,e){this.x=0,this.y=0,this.scrollX=0,this.scrollY=0,this._canvas=t,this._element=e,this._mouseup=this.onMouseUp.bind(this),this._mousedown=this.onMouseDown.bind(this),this._mouseclick=this.onMouseClick.bind(this),this._mousemove=this.onMouseMove.bind(this),this._wheel=this.onMouseWheel.bind(this),this._touchstart=this.onTouchStart.bind(this),this._touchmove=this.onTouchMove.bind(this),this._touchstop=this.onTouchStop.bind(this),this._contextmenu=(t=>!i||(t.preventDefault(),!1)),this._element.addEventListener("contextmenu",this._contextmenu,!1),this._element.addEventListener("mouseup",this._mouseup),this._element.addEventListener("mousedown",this._mousedown),this._element.addEventListener("click",this._mouseclick),this._element.addEventListener("mousemove",this._mousemove),this._element.addEventListener("wheel",this._wheel),this._element.addEventListener("touchstart",this._touchstart)}destroy(){this._element.removeEventListener("contextmenu",this._contextmenu),this._element.removeEventListener("mouseup",this._mouseup),this._element.removeEventListener("mousedown",this._mousedown),this._element.removeEventListener("click",this._mouseclick),this._element.removeEventListener("mousemove",this._mousemove),this._element.removeEventListener("wheel",this._wheel),this._element.removeEventListener("touchstart",this._touchstart)}onMouseUp(t){this.onMouseMove(t),this.emit("mouseup",this,t.which)}onMouseDown(t){this.onMouseMove(t),this.emit("mousedown",this,t.which)}onMouseClick(t){this.onMouseMove(t),this.emit("mouseclick",this,t.which)}onMouseWheel(t){this.scrollX+=t.deltaX,this.scrollY+=t.deltaY,this.emit("mousewheel",this,t.deltaX,t.deltaY)}onMouseMove(t){const e=this._canvas.getBoundingClientRect();this.x=t.clientX-e.left,this.y=t.clientY-e.top}onTouchStart(t){const e=t.touches[0].target;e.addEventListener("touchmove",this._touchmove),e.addEventListener("touchend",this._touchstop),e.addEventListener("touchcancel",this._touchstop)}onTouchStop(t){const e=t.touches[0].target;e.removeEventListener("touchmove",this._touchmove),e.removeEventListener("touchend",this._touchstop),e.removeEventListener("touchcancel",this._touchstop)}onTouchMove(t){this.onMouseMove(t.touches[0])}}r.BUTTON_LEFT=0,r.BUTTON_MIDDLE=1,r.BUTTON_RIGHT=2,Object.assign(r.prototype,o);var n=r;class h{constructor(t){this.nodes=[],this.edges=[],this.canvas=t,this._offsetX=0,this._offsetY=0,this.nextOffsetX=0,this.nextOffsetY=0}get centerX(){return this.canvas.width/2+this._offsetX}get centerY(){return this.canvas.height/2+this._offsetY}get offsetX(){return this._offsetX}get offsetY(){return this._offsetY}set offsetX(t){this.nextOffsetX=t}set offsetY(t){this.nextOffsetY=t}createNewNode(){const t=new a(this,0,0);return 0==this.nodes.length&&this.emit("newInitial",t,null),this.nodes.push(t),this.emit("nodeCreate",t),t}destroyNode(t){this.nodes.splice(this.nodes.indexOf(t),1),this.emit("nodeDestroy",t)}createNewEdge(t,e){const s=new u(this,t,e);return s.isSelfLoop()&&(s.y=t.y-SELF_LOOP_HEIGHT),this.edges.push(s),this.emit("edgeCreate",s),s}destroyEdge(t){this.edges.splice(this.edges.indexOf(t),1),this.emit("edgeDestroy",t)}clear(){for(let t of this.nodes)this.emit("nodeDestroy",t);this.nodes.length=0;for(let t of this.edges)this.emit("edgeDestroy",t);this.edges.length=0}update(t){this._offsetX=l(this._offsetX,this.nextOffsetX,t),this._offsetY=l(this._offsetY,this.nextOffsetY,t);for(let e of this.nodes)e.update(t)}setInitialState(t){if(this.nodes.length<=1)return;this.nodes.splice(this.nodes.indexOf(t),1);const e=this.nodes[0];this.nodes.unshift(t),this.emit("newInitial",t,e)}toggleAcceptState(t){t.accept=!t.accept,this.emit("toggleAccept",t)}getInitialState(){return this.nodes.length>0?this.nodes[0]:null}}Object.assign(h.prototype,o);class a{constructor(t,e=0,s=0,o="q"){this.graph=t,this.label=o,this._x=e,this._y=s,this.nextX=e,this.nextY=s,this.accept=!1}get x(){return this._x+this.graph.centerX}get y(){return this._y+this.graph.centerY}set x(t){this.nextX=t}set y(t){this.nextY=t}update(t){this._x=l(this._x,this.nextX,t),this._y=l(this._y,this.nextY,t)}}class u{constructor(t,e,s,o="#"){this.graph=t,this.label=o,this.from=e,this.to=s,this.quad=null}getStartPoint(){if(null==this.quad){const t=this.from.x-this.to.x,e=this.from.y-this.to.y,s=-Math.atan2(e,t)-HALF_PI,o=NODE_RADIUS*Math.sin(s),i=NODE_RADIUS*Math.cos(s);return[this.from.x+o,this.from.y+i]}{const t=this.getMidPoint(),e=t[0]+2*this.quad.x,s=t[1]+2*this.quad.y,o=this.from.x-e,i=this.from.y-s,r=-Math.atan2(i,o)-HALF_PI+(this.isSelfLoop()?FOURTH_PI:0),n=NODE_RADIUS*Math.sin(r),h=NODE_RADIUS*Math.cos(r),a=t;return a[0]=this.from.x+n,a[1]=this.from.y+h,a}}getCenterPoint(){const t=this.getMidPoint();return null!=this.quad&&(t[0]+=this.quad.x,t[1]+=this.quad.y),t}getEndPoint(){if(null==this.quad){const t=this.from.x-this.to.x,e=this.from.y-this.to.y,s=-Math.atan2(e,t)-HALF_PI,o=NODE_RADIUS*Math.sin(s),i=NODE_RADIUS*Math.cos(s);return[this.to.x-o,this.to.y-i]}{const t=this.getMidPoint(),e=t[0]+2*this.quad.x,s=t[1]+2*this.quad.y,o=e-this.to.x,i=s-this.to.y,r=-Math.atan2(i,o)-HALF_PI+(this.isSelfLoop()?-FOURTH_PI:0),n=NODE_RADIUS*Math.sin(r),h=NODE_RADIUS*Math.cos(r),a=t;return a[0]=this.to.x-n,a[1]=this.to.y-h,a}}getMidPoint(){return[this.from.x+(this.to.x-this.from.x)/2,this.from.y+(this.to.y-this.from.y)/2]}get centerX(){return this.from.x+(this.to.x-this.from.x)/2}get centerY(){return this.from.y+(this.to.y-this.from.y)/2}get x(){const t=this.centerX;return null!=this.quad?this.quad.x+t:t}get y(){const t=this.centerY;return null!=this.quad?this.quad.y+t:t}set x(t){null==this.quad&&(this.quad={x:0,y:0}),this.quad.x=t-this.centerX,Math.abs(this.quad.x)<8&&(this.quad.x=0),0==this.quad.x&&0==this.quad.y&&(this.quad=null)}set y(t){null==this.quad&&(this.quad={x:0,y:0}),this.quad.y=t-this.centerY,Math.abs(this.quad.y)<8&&(this.quad.y=0),0==this.quad.x&&0==this.quad.y&&(this.quad=null)}isSelfLoop(){return this.from==this.to}}function l(t,e,s){return t*(1-s)+e*s}function c(t,e){const s=e.x,o=e.y,i=e.label,r=e.accept;t.fillStyle=NODE_FILL_STYLE,t.beginPath(),t.arc(s,o,NODE_RADIUS,0,PI2),t.fill(),t.stroke(),r&&(t.beginPath(),t.arc(s,o,NODE_RADIUS_INNER,0,PI2),t.stroke()),t.fillStyle=NODE_TEXT_FILL_STYLE,t.fillText(i,s,o+4)}function d(t,e){e.from,e.to;const s=e.x,o=e.y,i=e.getMidPoint(),r=i[0],n=i[1],h=e.quad,u=e.label;let l=0,c=0,d=0;const g=e.getStartPoint(),_=e.to instanceof a?e.getEndPoint():[e.to.x,e.to.y];if(l=_[0],c=_[1],t.beginPath(),t.moveTo(g[0],g[1]),null==h)d=Math.atan2(g[0]-_[0],g[1]-_[1])+Math.PI,t.lineTo(_[0],_[1]);else{const s=e.getCenterPoint();s[0]+=e.quad.x,s[1]+=e.quad.y,d=Math.atan2(s[0]-_[0],s[1]-_[1])+Math.PI,t.quadraticCurveTo(s[0],s[1],_[0],_[1])}if(t.moveTo(l-ARROW_WIDTH*Math.sin(d-SIXTH_PI),c-ARROW_WIDTH*Math.cos(d-SIXTH_PI)),t.lineTo(l,c),t.lineTo(l-ARROW_WIDTH*Math.sin(d+SIXTH_PI),c-ARROW_WIDTH*Math.cos(d+SIXTH_PI)),t.stroke(),t.closePath(),u.length>0){const e=u.split(" ");let i=0;for(let a of e){let e=0,u=0,l=3*a.length,c=0;null==h?(e=r,u=n):(c=Math.sign(h.y),e=s,u=o+8*c),u+=i*(-c||1),t.clearRect(e-l-2,u-5,2*l+4,10),t.fillText(a,e,u+4),i-=12}}}var g=new class{constructor(){this.hoverAngle=0}render(t,e,s){if(this.drawNodes(t,s.nodes),s.nodes.length>0){const e=s.getInitialState();t.save(),function(t,e){const s=e.x,o=e.y;t.strokeStyle=EDGE_STROKE_STYLE,t.beginPath(),t.moveTo(s-NODE_RADIUS,o),t.lineTo(s-NODE_DIAMETER,o-NODE_RADIUS),t.lineTo(s-NODE_DIAMETER,o+NODE_RADIUS),t.closePath(),t.stroke()}(t,e),t.restore()}this.drawEdges(t,s.edges),this.hoverAngle=(this.hoverAngle+HOVER_ANGLE_SPEED)%PI2}drawNodes(t,e){if(t.save(),t.font=NODE_FONT,t.textAlign=NODE_TEXT_ALIGN,t.strokeStyle=NODE_STROKE_STYLE,t.fillStyle=NODE_FILL_STYLE,Array.isArray(e))for(let s of e)c(t,s);else c(t,e);t.restore()}drawEdges(t,e){if(t.save(),t.font=EDGE_FONT,t.textAlign=EDGE_TEXT_ALIGN,t.strokeStyle=EDGE_STROKE_STYLE,Array.isArray(e))for(let s of e)d(t,s);else d(t,e);t.restore()}drawHoverCircle(t,e,s,o){t.save();{const i=this.hoverAngle;t.strokeStyle=HOVER_STROKE_STYLE,t.lineWidth=HOVER_LINE_WIDTH,t.beginPath(),t.setLineDash(HOVER_LINE_DASH),t.arc(e,s,o,0+i,PI2+i),t.stroke()}t.restore()}};var _=new class{constructor(){this._simulatePhysics=!1}sort(){this._simulatePhysics=!0}update(t,e){if(this._simulatePhysics){let t=!1;for(const s of e.nodes)for(const o of e.nodes){if(s==o)continue;const e=s.nextX-o.nextX,i=s.nextY-o.nextY;e*e+i*i<PADDING_RADIUS_SQU&&(s.nextX+=.5*e,s.nextY+=.5*i,t=!0)}this._simulatePhysics=t}}};var E=class{constructor(t,e){this.graph=t,this.cursor=e,this.mouse=this.cursor.mouse,this.prevEdgeQuad=null}beginMove(t,e){if(this.cursor.targetSource=this.cursor.getEdgeAt(t,e))this.cursor.targetMode="move-edge";else if(this.cursor.targetSource=this.cursor.getNodeAt(t,e))this.cursor.targetMode="move-state";else if(this.cursor.targetSource=this.cursor.getEdgeByEndPointAt(t,e)){this.cursor.targetMode="move-endpoint";const t=this.cursor.targetSource.quad;this.prevEdgeQuad=null!=t?{x:t.x,y:t.y}:null}else this.cursor.targetSource={x:t,y:e},this.cursor.targetMode="move-graph"}updateMove(t,e){if(null!=this.cursor.targetMode){if(null==this.cursor.targetSource)throw new Error("Trying to resolve target mode '"+this.cursor.targetMode+"' with missing source");"move-edge"==this.cursor.targetMode?(this.cursor.targetSource.x=t,this.cursor.targetSource.y=e):"move-endpoint"==this.cursor.targetMode?this.resolveEdge(t,e,this.cursor.targetSource):"move-state"==this.cursor.targetMode?(this.cursor.targetSource.x=t-this.graph.centerX,this.cursor.targetSource.y=e-this.graph.centerY):"move-graph"==this.cursor.targetMode&&(this.graph.offsetX=t-this.cursor.targetSource.x,this.graph.offsetY=e-this.cursor.targetSource.y)}}endMove(t,e){if(null!=this.cursor.targetMode){if(null==this.cursor.targetSource)throw new Error("Trying to resolve target mode '"+this.cursor.targetMode+"' with missing source");this.updateMove(t,e),"move-endpoint"==this.cursor.targetMode&&(null==this.cursor.targetDestination&&this.graph.destroyEdge(this.cursor.targetSource),this.prevEdgeQuad=null)}}resolveEdge(t,e,s){if(s.to=this.cursor.targetDestination||this.cursor.mouse,s.isSelfLoop()){const o=s.from.x-t,i=s.from.y-e,r=Math.atan2(i,o);s.x=s.from.x-Math.cos(r)*SELF_LOOP_HEIGHT,s.y=s.from.y-Math.sin(r)*SELF_LOOP_HEIGHT}else null!=this.prevEdgeQuad?(null==s.quad&&(s.quad={x:0,y:0}),s.quad.x=this.prevEdgeQuad.x,s.quad.y=this.prevEdgeQuad.y):s.quad=null}};class m{constructor(t,e){this.graph=t,this.mouse=e,this.targetSource=null,this.targetDestination=null,this.targetMode=null}getNodeAt(t,e){for(const s of this.graph.nodes){const o=t-s.x,i=e-s.y;if(o*o+i*i<NODE_RADIUS_SQU)return s}return null}getEdgeAt(t,e){for(const s of this.graph.edges){const o=t-s.x,i=e-s.y;if(o*o+i*i<EDGE_RADIUS_SQU)return s}return null}getEdgeByEndPointAt(t,e){for(const s of this.graph.edges){const o=s.getEndPoint(),i=t-o[0],r=e-o[1];if(i*i+r*r<ENDPOINT_RADIUS_SQU)return s}return null}}Object.assign(m.prototype,o);var f=m;var v=class{constructor(t,e,s){this.canvas=t,this.mouse=e,this.graph=s,this.labelEditor=document.getElementById("label-editor"),this.labelEditorInput=document.getElementById("label-editor-input"),this.labelEditorInput.addEventListener("keyup",t=>{13==t.keyCode?this.closeLabelEditor(!0):27==t.keyCode&&this.closeLabelEditor(!1)}),this.labelEditorInput.addEventListener("blur",t=>{this.closeLabelEditor(!1)}),this.labelEditorSource=null,this.cursor=new f(s,e),this.moveController=new E(s,this.cursor),this.moveMode=!1,this.proxyEdge=new u(null,null,""),this.prevMouse={x:0,y:0}}load(){this.mouse.on("mousedown",(t,e)=>{this.moveMode=3==e,this.markTarget(t.x,t.y),this.prevMouse.x=t.x,this.prevMouse.y=t.y}),this.mouse.on("mouseup",(t,e)=>{this.moveMode=3==e,this.releaseTarget(t.x,t.y),this.prevMouse.x=t.x,this.prevMouse.y=t.y}),document.getElementById("new_state").addEventListener("click",t=>{this.createNewState()}),document.getElementById("clear_graph").addEventListener("click",t=>{this.graph.clear()}),document.getElementById("simulate_physics").addEventListener("click",t=>{_.sort()}),document.getElementById("export_image").addEventListener("click",t=>{const e=this.canvas.toDataURL("image/png");download(e,EXPORT_FILE_NAME,"image/png")})}draw(t,e){const s=this.mouse.x,o=this.mouse.y;this.cursor.targetDestination=this.cursor.getNodeAt(s,o),"state"==this.cursor.targetMode&&this.cursor.targetSource!=this.cursor.targetDestination&&(this.cursor.targetMode="create-edge",this.proxyEdge.from=this.cursor.targetSource),"create-edge"==this.cursor.targetMode&&(this.moveController.resolveEdge(s,o,this.proxyEdge),g.drawEdges(t,this.proxyEdge)),this.cursor.targetMode&&this.cursor.targetMode.startsWith("move")&&this.moveController.updateMove(s,o);let i=null,r=null;if((i=this.cursor.targetDestination)?r="state":(i=this.cursor.getEdgeAt(s,o))?r="edge":(i=this.cursor.getEdgeByEndPointAt(s,o))&&(r="endpoint"),null!=i){let e=0,n=0,h=CURSOR_RADIUS;switch(r){case"state":e=i.x,n=i.y,h=NODE_RADIUS;break;case"edge":e=i.x,n=i.y,h=EDGE_RADIUS;break;case"endpoint":const t=i.getEndPoint();e=t[0],n=t[1],h=ENDPOINT_RADIUS;break;default:e=s,n=o}g.drawHoverCircle(t,e,n,h+HOVER_RADIUS_OFFSET)}}createNewState(t,e){const s=this.graph.createNewNode();return s.label="q"+(this.graph.nodes.length-1),s.x=t||Math.random()*SPAWN_RADIUS*2-SPAWN_RADIUS,s.y=e||Math.random()*SPAWN_RADIUS*2-SPAWN_RADIUS,s}createNewTransition(t,e){const s=this.graph.createNewEdge(t,e);return s.label="0",s}markTarget(t,e){if(this.closeLabelEditor(!1))return this.cursor.targetSource=null,this.cursor.targetDestination=null,void(this.cursor.targetMode="label-edit");this.moveMode?this.moveController.beginMove(t,e):(this.cursor.targetSource=this.cursor.getEdgeAt(t,e))?this.cursor.targetMode="edge":(this.cursor.targetSource=this.cursor.getNodeAt(t,e))?this.cursor.targetMode="state":(this.cursor.targetSource=this.cursor.getEdgeByEndPointAt(t,e))?this.cursor.targetMode="endpoint":(this.cursor.targetSource=null,this.cursor.targetMode=null)}releaseTarget(t,e){if(this.moveMode)this.moveController.endMove(t,e);else if("state"==this.cursor.targetMode)this.graph.toggleAcceptState(this.cursor.targetSource);else if("edge"==this.cursor.targetMode)this.openLabelEditor(this.cursor.targetSource);else if("create-edge"==this.cursor.targetMode){if(null!=this.cursor.targetDestination){const t=this.createNewTransition(this.cursor.targetSource,this.cursor.targetDestination);null!=this.proxyEdge.quad&&(t.x=this.proxyEdge.x,t.y=this.proxyEdge.y),this.openLabelEditor(t)}}else if("endpoint"==this.cursor.targetMode);else if(null==this.cursor.targetMode&&null==this.cursor.targetSource){const s=t-this.prevMouse.x,o=e-this.prevMouse.y;s*s+o*o<CURSOR_RADIUS_SQU&&this.createNewState(t-this.graph.centerX,e-this.graph.centerY)}this.cursor.targetSource=null,this.cursor.targetMode=null}openLabelEditor(t){return this.labelEditorSource!=t&&(this.labelEditor.style.left=t.x-this.labelEditor.offsetWidth/2+"px",this.labelEditor.style.top=t.y-this.labelEditor.offsetHeight/2+"px",this.labelEditorInput.value=t.label,this.labelEditor.style.visibility="visible",this.labelEditorSource=t,this.labelEditorInput.focus(),this.labelEditorInput.select(),!0)}closeLabelEditor(t){return null!=this.labelEditorSource&&(t&&(this.labelEditorSource.label=this.labelEditorInput.value),this.labelEditor.style.visibility="hidden",this.labelEditorSource=null,!0)}};var p=class{constructor(t){this.graph=t,this.graphLabelStates=document.getElementById("graph-states"),this.graph.on("nodeCreate",this.onNodeCreate.bind(this)),this.graph.on("nodeDestroy",this.onNodeDestroy.bind(this))}onNodeCreate(t){const e=document.createElement("label");e.setAttribute("contenteditable","true"),e.addEventListener("input",s=>{t.label=e.textContent}),e.innerHTML=t.label,t._element=e,this.graphLabelStates.appendChild(e)}onNodeDestroy(t){this.graphLabelStates.removeChild(t._element)}};const y=document.getElementById("canvas"),S=y.getContext("2d"),x=new n(y,y);function M(t){y.width=window.innerWidth,y.height=window.innerHeight}window.addEventListener("load",M),window.addEventListener("resize",M),window.onload=function(){let t=null,e=null,s=null;(t=D.createNewNode()).x=-64,t.y=0,t.label="q0",(e=D.createNewNode()).x=64,e.y=0,e.label="q1",(s=D.createNewEdge(t,e)).label="abc 0",I.load()},window.requestAnimationFrame(function t(e){S.clearRect(0,0,y.width,y.height);!function(t,e){const s=(e-b)/L;D.update(s),_.update(s,D),g.render(t,s,D),I.draw(t,s),b=e}(S,e);window.requestAnimationFrame(t)});const D=new h(y),I=new v(y,x,D);new p(D);let L=60,b=0}]);