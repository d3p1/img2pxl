(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class Qt{constructor(e,t,n,r,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),Qt.nextNameID=Qt.nextNameID||0,this.$name.id=`lil-gui-name-${++Qt.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Hl extends Qt{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function ys(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Gl={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:ys,toHexString:ys},Gi={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},ql={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,e,t=1){const n=Gi.fromHexString(i);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([i,e,t],n=1){n=255/n;const r=i*n<<16^e*n<<8^t*n<<0;return Gi.toHexString(r)}},Xl={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){const n=Gi.fromHexString(i);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:i,g:e,b:t},n=1){n=255/n;const r=i*n<<16^e*n<<8^t*n<<0;return Gi.toHexString(r)}},Kl=[Gl,Gi,ql,Xl];function Zl(i){return Kl.find(e=>e.match(i))}class Yl extends Qt{constructor(e,t,n,r){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Zl(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=ys(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Hr extends Qt{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class jl extends Qt{constructor(e,t,n,r,s,a){super(e,t,n,"number"),this._initInput(),this.min(r),this.max(s);const o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let b=parseFloat(this.$input.value);isNaN(b)||(this._stepExplicit&&(b=this._snap(b)),this.setValue(this._clamp(b)))},n=b=>{const T=parseFloat(this.$input.value);isNaN(T)||(this._snapClampSetValue(T+b),this.$input.value=this.getValue())},r=b=>{b.key==="Enter"&&this.$input.blur(),b.code==="ArrowUp"&&(b.preventDefault(),n(this._step*this._arrowKeyMultiplier(b))),b.code==="ArrowDown"&&(b.preventDefault(),n(this._step*this._arrowKeyMultiplier(b)*-1))},s=b=>{this._inputFocused&&(b.preventDefault(),n(this._step*this._normalizeMouseWheel(b)))};let a=!1,o,l,c,h,d;const f=5,m=b=>{o=b.clientX,l=c=b.clientY,a=!0,h=this.getValue(),d=0,window.addEventListener("mousemove",x),window.addEventListener("mouseup",S)},x=b=>{if(a){const T=b.clientX-o,y=b.clientY-l;Math.abs(y)>f?(b.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(T)>f&&S()}if(!a){const T=b.clientY-c;d-=T*this._step*this._arrowKeyMultiplier(b),h+d>this._max?d=this._max-h:h+d<this._min&&(d=this._min-h),this._snapClampSetValue(h+d)}c=b.clientY},S=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",x),window.removeEventListener("mouseup",S)},p=()=>{this._inputFocused=!0},u=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",m),this.$input.addEventListener("focus",p),this.$input.addEventListener("blur",u)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(u,b,T,y,D)=>(u-b)/(T-b)*(D-y)+y,t=u=>{const b=this.$slider.getBoundingClientRect();let T=e(u,b.left,b.right,this._min,this._max);this._snapClampSetValue(T)},n=u=>{this._setDraggingStyle(!0),t(u.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",s)},r=u=>{t(u.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",s)};let a=!1,o,l;const c=u=>{u.preventDefault(),this._setDraggingStyle(!0),t(u.touches[0].clientX),a=!1},h=u=>{u.touches.length>1||(this._hasScrollBar?(o=u.touches[0].clientX,l=u.touches[0].clientY,a=!0):c(u),window.addEventListener("touchmove",d,{passive:!1}),window.addEventListener("touchend",f))},d=u=>{if(a){const b=u.touches[0].clientX-o,T=u.touches[0].clientY-l;Math.abs(b)>Math.abs(T)?c(u):(window.removeEventListener("touchmove",d),window.removeEventListener("touchend",f))}else u.preventDefault(),t(u.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",d),window.removeEventListener("touchend",f)},m=this._callOnFinishChange.bind(this),x=400;let S;const p=u=>{if(Math.abs(u.deltaX)<Math.abs(u.deltaY)&&this._hasScrollBar)return;u.preventDefault();const T=this._normalizeMouseWheel(u)*this._step;this._snapClampSetValue(this.getValue()+T),this.$input.value=this.getValue(),clearTimeout(S),S=setTimeout(m,x)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",p,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Jl extends Qt{constructor(e,t,n,r){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class Ql extends Qt{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var $l=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function ec(i){const e=document.createElement("style");e.innerHTML=i;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Ia=!1;class fa{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:r,title:s="Controls",closeFolders:a=!1,injectStyles:o=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!Ia&&o&&(ec($l),Ia=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=a}add(e,t,n,r,s){if(Object(n)===n)return new Jl(this,e,t,n);const a=e[t];switch(typeof a){case"number":return new jl(this,e,t,n,r,s);case"boolean":return new Hl(this,e,t);case"string":return new Ql(this,e,t);case"function":return new Hr(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new Yl(this,e,t,n)}addFolder(e){const t=new fa({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Hr||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Hr)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pa="173",tc=0,Fa=1,nc=2,Wo=1,ic=2,an=3,wn=0,Tt=1,un=2,bn=0,pi=1,Na=2,Oa=3,Va=4,rc=5,kn=100,sc=101,ac=102,oc=103,lc=104,cc=200,uc=201,hc=202,dc=203,Ts=204,bs=205,fc=206,pc=207,mc=208,gc=209,vc=210,xc=211,_c=212,Sc=213,Mc=214,As=0,ws=1,Rs=2,_i=3,Cs=4,Ps=5,Us=6,Ls=7,Ho=0,Ec=1,yc=2,An=0,Tc=1,bc=2,Ac=3,wc=4,Rc=5,Cc=6,Pc=7,Go=300,Si=301,Mi=302,Ds=303,Is=304,Vr=306,Fr=1e3,Hn=1001,Fs=1002,Xt=1003,Uc=1004,tr=1005,jt=1006,Gr=1007,Gn=1008,pn=1009,qo=1010,Xo=1011,qi=1012,ma=1013,Xn=1014,hn=1015,Ki=1016,ga=1017,va=1018,Ei=1020,Ko=35902,Zo=1021,Yo=1022,qt=1023,jo=1024,Jo=1025,mi=1026,yi=1027,Qo=1028,xa=1029,$o=1030,_a=1031,Sa=1033,Ar=33776,wr=33777,Rr=33778,Cr=33779,Ns=35840,Os=35841,Vs=35842,zs=35843,Bs=36196,ks=37492,Ws=37496,Hs=37808,Gs=37809,qs=37810,Xs=37811,Ks=37812,Zs=37813,Ys=37814,js=37815,Js=37816,Qs=37817,$s=37818,ea=37819,ta=37820,na=37821,Pr=36492,ia=36494,ra=36495,el=36283,sa=36284,aa=36285,oa=36286,Lc=3200,Dc=3201,Ic=0,Fc=1,Tn="",Ft="srgb",Ti="srgb-linear",Nr="linear",Ze="srgb",Yn=7680,za=519,Nc=512,Oc=513,Vc=514,tl=515,zc=516,Bc=517,kc=518,Wc=519,Ba=35044,ka="300 es",dn=2e3,Or=2001;class Ai{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qr=Math.PI/180,la=180/Math.PI;function Zi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vt[i&255]+vt[i>>8&255]+vt[i>>16&255]+vt[i>>24&255]+"-"+vt[e&255]+vt[e>>8&255]+"-"+vt[e>>16&15|64]+vt[e>>24&255]+"-"+vt[t&63|128]+vt[t>>8&255]+"-"+vt[t>>16&255]+vt[t>>24&255]+vt[n&255]+vt[n>>8&255]+vt[n>>16&255]+vt[n>>24&255]).toLowerCase()}function Ie(i,e,t){return Math.max(e,Math.min(t,i))}function Hc(i,e){return(i%e+e)%e}function Xr(i,e,t){return(1-t)*i+t*e}function Pi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function yt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ye{constructor(e=0,t=0){Ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ie(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ie(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Pe{constructor(e,t,n,r,s,a,o,l,c){Pe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],m=n[5],x=n[8],S=r[0],p=r[3],u=r[6],b=r[1],T=r[4],y=r[7],D=r[2],U=r[5],w=r[8];return s[0]=a*S+o*b+l*D,s[3]=a*p+o*T+l*U,s[6]=a*u+o*y+l*w,s[1]=c*S+h*b+d*D,s[4]=c*p+h*T+d*U,s[7]=c*u+h*y+d*w,s[2]=f*S+m*b+x*D,s[5]=f*p+m*T+x*U,s[8]=f*u+m*y+x*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,f=o*l-h*s,m=c*s-a*l,x=t*d+n*f+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/x;return e[0]=d*S,e[1]=(r*c-h*n)*S,e[2]=(o*n-r*a)*S,e[3]=f*S,e[4]=(h*t-r*l)*S,e[5]=(r*s-o*t)*S,e[6]=m*S,e[7]=(n*l-c*t)*S,e[8]=(a*t-n*s)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Kr.makeScale(e,t)),this}rotate(e){return this.premultiply(Kr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Kr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Kr=new Pe;function nl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Xi(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gc(){const i=Xi("canvas");return i.style.display="block",i}const Wa={};function ci(i){i in Wa||(Wa[i]=!0,console.warn(i))}function qc(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Xc(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Kc(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ha=new Pe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ga=new Pe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zc(){const i={enabled:!0,workingColorSpace:Ti,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ze&&(r.r=fn(r.r),r.g=fn(r.g),r.b=fn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(r.r=gi(r.r),r.g=gi(r.g),r.b=gi(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Tn?Nr:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ti]:{primaries:e,whitePoint:n,transfer:Nr,toXYZ:Ha,fromXYZ:Ga,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ft},outputColorSpaceConfig:{drawingBufferColorSpace:Ft}},[Ft]:{primaries:e,whitePoint:n,transfer:Ze,toXYZ:Ha,fromXYZ:Ga,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ft}}}),i}const We=Zc();function fn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let jn;class Yc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{jn===void 0&&(jn=Xi("canvas")),jn.width=e.width,jn.height=e.height;const n=jn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=jn}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xi("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=fn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(fn(t[n]/255)*255):t[n]=fn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jc=0;class il{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jc++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Zr(r[a].image)):s.push(Zr(r[a]))}else s=Zr(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Zr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Jc=0;class _t extends Ai{constructor(e=_t.DEFAULT_IMAGE,t=_t.DEFAULT_MAPPING,n=Hn,r=Hn,s=jt,a=Gn,o=qt,l=pn,c=_t.DEFAULT_ANISOTROPY,h=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jc++}),this.uuid=Zi(),this.name="",this.source=new il(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Go)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fr:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case Fs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fr:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case Fs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_t.DEFAULT_IMAGE=null;_t.DEFAULT_MAPPING=Go;_t.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,t=0,n=0,r=1){ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],h=l[4],d=l[8],f=l[1],m=l[5],x=l[9],S=l[2],p=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-S)<.01&&Math.abs(x-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+S)<.1&&Math.abs(x+p)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,y=(m+1)/2,D=(u+1)/2,U=(h+f)/4,w=(d+S)/4,I=(x+p)/4;return T>y&&T>D?T<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(T),r=U/n,s=w/n):y>D?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=U/r,s=I/r):D<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),n=w/s,r=I/s),this.set(n,r,s,t),this}let b=Math.sqrt((p-x)*(p-x)+(d-S)*(d-S)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(p-x)/b,this.y=(d-S)/b,this.z=(f-h)/b,this.w=Math.acos((c+m+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this.z=Ie(this.z,e.z,t.z),this.w=Ie(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this.z=Ie(this.z,e,t),this.w=Ie(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ie(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qc extends Ai{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new _t(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new il(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kn extends Qc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class rl extends _t{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $c extends _t{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],d=n[r+3];const f=s[a+0],m=s[a+1],x=s[a+2],S=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=x,e[t+3]=S;return}if(d!==S||l!==f||c!==m||h!==x){let p=1-o;const u=l*f+c*m+h*x+d*S,b=u>=0?1:-1,T=1-u*u;if(T>Number.EPSILON){const D=Math.sqrt(T),U=Math.atan2(D,u*b);p=Math.sin(p*U)/D,o=Math.sin(o*U)/D}const y=o*b;if(l=l*p+f*y,c=c*p+m*y,h=h*p+x*y,d=d*p+S*y,p===1-o){const D=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=D,c*=D,h*=D,d*=D}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],d=s[a],f=s[a+1],m=s[a+2],x=s[a+3];return e[t]=o*x+h*d+l*m-c*f,e[t+1]=l*x+h*f+c*d-o*m,e[t+2]=c*x+h*m+o*f-l*d,e[t+3]=h*x-o*d-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),d=o(s/2),f=l(n/2),m=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=f*h*d+c*m*x,this._y=c*m*d-f*h*x,this._z=c*h*x+f*m*d,this._w=c*h*d-f*m*x;break;case"YXZ":this._x=f*h*d+c*m*x,this._y=c*m*d-f*h*x,this._z=c*h*x-f*m*d,this._w=c*h*d+f*m*x;break;case"ZXY":this._x=f*h*d-c*m*x,this._y=c*m*d+f*h*x,this._z=c*h*x+f*m*d,this._w=c*h*d-f*m*x;break;case"ZYX":this._x=f*h*d-c*m*x,this._y=c*m*d+f*h*x,this._z=c*h*x-f*m*d,this._w=c*h*d+f*m*x;break;case"YZX":this._x=f*h*d+c*m*x,this._y=c*m*d+f*h*x,this._z=c*h*x-f*m*d,this._w=c*h*d-f*m*x;break;case"XZY":this._x=f*h*d-c*m*x,this._y=c*m*d-f*h*x,this._z=c*h*x+f*m*d,this._w=c*h*d+f*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],f=n+o+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ie(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,n=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this.z=Ie(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this.z=Ie(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ie(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yr.copy(this).projectOnVector(e),this.sub(Yr)}reflect(e){return this.sub(Yr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ie(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yr=new V,qa=new Yi;class ji{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,zt):zt.fromBufferAttribute(s,a),zt.applyMatrix4(e.matrixWorld),this.expandByPoint(zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),nr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),nr.copy(n.boundingBox)),nr.applyMatrix4(e.matrixWorld),this.union(nr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,zt),zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ui),ir.subVectors(this.max,Ui),Jn.subVectors(e.a,Ui),Qn.subVectors(e.b,Ui),$n.subVectors(e.c,Ui),vn.subVectors(Qn,Jn),xn.subVectors($n,Qn),Un.subVectors(Jn,$n);let t=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Un.z,Un.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Un.z,0,-Un.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Un.y,Un.x,0];return!jr(t,Jn,Qn,$n,ir)||(t=[1,0,0,0,1,0,0,0,1],!jr(t,Jn,Qn,$n,ir))?!1:(rr.crossVectors(vn,xn),t=[rr.x,rr.y,rr.z],jr(t,Jn,Qn,$n,ir))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(en[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),en[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),en[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),en[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),en[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),en[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),en[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),en[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(en),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const en=[new V,new V,new V,new V,new V,new V,new V,new V],zt=new V,nr=new ji,Jn=new V,Qn=new V,$n=new V,vn=new V,xn=new V,Un=new V,Ui=new V,ir=new V,rr=new V,Ln=new V;function jr(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Ln.fromArray(i,s);const o=r.x*Math.abs(Ln.x)+r.y*Math.abs(Ln.y)+r.z*Math.abs(Ln.z),l=e.dot(Ln),c=t.dot(Ln),h=n.dot(Ln);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const eu=new ji,Li=new V,Jr=new V;class zr{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):eu.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Li.subVectors(e,this.center);const t=Li.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Li,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Li.copy(e.center).add(Jr)),this.expandByPoint(Li.copy(e.center).sub(Jr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const tn=new V,Qr=new V,sr=new V,_n=new V,$r=new V,ar=new V,es=new V;class Ma{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,tn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=tn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(tn.copy(this.origin).addScaledVector(this.direction,t),tn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Qr.copy(e).add(t).multiplyScalar(.5),sr.copy(t).sub(e).normalize(),_n.copy(this.origin).sub(Qr);const s=e.distanceTo(t)*.5,a=-this.direction.dot(sr),o=_n.dot(this.direction),l=-_n.dot(sr),c=_n.lengthSq(),h=Math.abs(1-a*a);let d,f,m,x;if(h>0)if(d=a*l-o,f=a*o-l,x=s*h,d>=0)if(f>=-x)if(f<=x){const S=1/h;d*=S,f*=S,m=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=s,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;else f<=-x?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),m=-d*d+f*(f+2*l)+c):f<=x?(d=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),m=-d*d+f*(f+2*l)+c);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Qr).addScaledVector(sr,f),m}intersectSphere(e,t){tn.subVectors(e.center,this.origin);const n=tn.dot(this.direction),r=tn.dot(tn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,tn)!==null}intersectTriangle(e,t,n,r,s){$r.subVectors(t,e),ar.subVectors(n,e),es.crossVectors($r,ar);let a=this.direction.dot(es),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_n.subVectors(this.origin,e);const l=o*this.direction.dot(ar.crossVectors(_n,ar));if(l<0)return null;const c=o*this.direction.dot($r.cross(_n));if(c<0||l+c>a)return null;const h=-o*_n.dot(es);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,n,r,s,a,o,l,c,h,d,f,m,x,S,p){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,d,f,m,x,S,p)}set(e,t,n,r,s,a,o,l,c,h,d,f,m,x,S,p){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=m,u[7]=x,u[11]=S,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ei.setFromMatrixColumn(e,0).length(),s=1/ei.setFromMatrixColumn(e,1).length(),a=1/ei.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*h,m=a*d,x=o*h,S=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=m+x*c,t[5]=f-S*c,t[9]=-o*l,t[2]=S-f*c,t[6]=x+m*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*h,m=l*d,x=c*h,S=c*d;t[0]=f+S*o,t[4]=x*o-m,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=m*o-x,t[6]=S+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*h,m=l*d,x=c*h,S=c*d;t[0]=f-S*o,t[4]=-a*d,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*h,t[9]=S-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*h,m=a*d,x=o*h,S=o*d;t[0]=l*h,t[4]=x*c-m,t[8]=f*c+S,t[1]=l*d,t[5]=S*c+f,t[9]=m*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,m=a*c,x=o*l,S=o*c;t[0]=l*h,t[4]=S-f*d,t[8]=x*d+m,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=m*d+x,t[10]=f-S*d}else if(e.order==="XZY"){const f=a*l,m=a*c,x=o*l,S=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=f*d+S,t[5]=a*h,t[9]=m*d-x,t[2]=x*d-m,t[6]=o*h,t[10]=S*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tu,e,nu)}lookAt(e,t,n){const r=this.elements;return wt.subVectors(e,t),wt.lengthSq()===0&&(wt.z=1),wt.normalize(),Sn.crossVectors(n,wt),Sn.lengthSq()===0&&(Math.abs(n.z)===1?wt.x+=1e-4:wt.z+=1e-4,wt.normalize(),Sn.crossVectors(n,wt)),Sn.normalize(),or.crossVectors(wt,Sn),r[0]=Sn.x,r[4]=or.x,r[8]=wt.x,r[1]=Sn.y,r[5]=or.y,r[9]=wt.y,r[2]=Sn.z,r[6]=or.z,r[10]=wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],m=n[13],x=n[2],S=n[6],p=n[10],u=n[14],b=n[3],T=n[7],y=n[11],D=n[15],U=r[0],w=r[4],I=r[8],M=r[12],_=r[1],R=r[5],H=r[9],z=r[13],Z=r[2],Y=r[6],q=r[10],J=r[14],k=r[3],se=r[7],he=r[11],_e=r[15];return s[0]=a*U+o*_+l*Z+c*k,s[4]=a*w+o*R+l*Y+c*se,s[8]=a*I+o*H+l*q+c*he,s[12]=a*M+o*z+l*J+c*_e,s[1]=h*U+d*_+f*Z+m*k,s[5]=h*w+d*R+f*Y+m*se,s[9]=h*I+d*H+f*q+m*he,s[13]=h*M+d*z+f*J+m*_e,s[2]=x*U+S*_+p*Z+u*k,s[6]=x*w+S*R+p*Y+u*se,s[10]=x*I+S*H+p*q+u*he,s[14]=x*M+S*z+p*J+u*_e,s[3]=b*U+T*_+y*Z+D*k,s[7]=b*w+T*R+y*Y+D*se,s[11]=b*I+T*H+y*q+D*he,s[15]=b*M+T*z+y*J+D*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],f=e[10],m=e[14],x=e[3],S=e[7],p=e[11],u=e[15];return x*(+s*l*d-r*c*d-s*o*f+n*c*f+r*o*m-n*l*m)+S*(+t*l*m-t*c*f+s*a*f-r*a*m+r*c*h-s*l*h)+p*(+t*c*d-t*o*m-s*a*d+n*a*m+s*o*h-n*c*h)+u*(-r*o*h-t*l*d+t*o*f+r*a*d-n*a*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],f=e[10],m=e[11],x=e[12],S=e[13],p=e[14],u=e[15],b=d*p*c-S*f*c+S*l*m-o*p*m-d*l*u+o*f*u,T=x*f*c-h*p*c-x*l*m+a*p*m+h*l*u-a*f*u,y=h*S*c-x*d*c+x*o*m-a*S*m-h*o*u+a*d*u,D=x*d*l-h*S*l-x*o*f+a*S*f+h*o*p-a*d*p,U=t*b+n*T+r*y+s*D;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/U;return e[0]=b*w,e[1]=(S*f*s-d*p*s-S*r*m+n*p*m+d*r*u-n*f*u)*w,e[2]=(o*p*s-S*l*s+S*r*c-n*p*c-o*r*u+n*l*u)*w,e[3]=(d*l*s-o*f*s-d*r*c+n*f*c+o*r*m-n*l*m)*w,e[4]=T*w,e[5]=(h*p*s-x*f*s+x*r*m-t*p*m-h*r*u+t*f*u)*w,e[6]=(x*l*s-a*p*s-x*r*c+t*p*c+a*r*u-t*l*u)*w,e[7]=(a*f*s-h*l*s+h*r*c-t*f*c-a*r*m+t*l*m)*w,e[8]=y*w,e[9]=(x*d*s-h*S*s-x*n*m+t*S*m+h*n*u-t*d*u)*w,e[10]=(a*S*s-x*o*s+x*n*c-t*S*c-a*n*u+t*o*u)*w,e[11]=(h*o*s-a*d*s-h*n*c+t*d*c+a*n*m-t*o*m)*w,e[12]=D*w,e[13]=(h*S*r-x*d*r+x*n*f-t*S*f-h*n*p+t*d*p)*w,e[14]=(x*o*r-a*S*r-x*n*l+t*S*l+a*n*p-t*o*p)*w,e[15]=(a*d*r-h*o*r+h*n*l-t*d*l-a*n*f+t*o*f)*w,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,f=s*c,m=s*h,x=s*d,S=a*h,p=a*d,u=o*d,b=l*c,T=l*h,y=l*d,D=n.x,U=n.y,w=n.z;return r[0]=(1-(S+u))*D,r[1]=(m+y)*D,r[2]=(x-T)*D,r[3]=0,r[4]=(m-y)*U,r[5]=(1-(f+u))*U,r[6]=(p+b)*U,r[7]=0,r[8]=(x+T)*w,r[9]=(p-b)*w,r[10]=(1-(f+S))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=ei.set(r[0],r[1],r[2]).length();const a=ei.set(r[4],r[5],r[6]).length(),o=ei.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Bt.copy(this);const c=1/s,h=1/a,d=1/o;return Bt.elements[0]*=c,Bt.elements[1]*=c,Bt.elements[2]*=c,Bt.elements[4]*=h,Bt.elements[5]*=h,Bt.elements[6]*=h,Bt.elements[8]*=d,Bt.elements[9]*=d,Bt.elements[10]*=d,t.setFromRotationMatrix(Bt),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=dn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r);let m,x;if(o===dn)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Or)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=dn){const l=this.elements,c=1/(t-e),h=1/(n-r),d=1/(a-s),f=(t+e)*c,m=(n+r)*h;let x,S;if(o===dn)x=(a+s)*d,S=-2*d;else if(o===Or)x=s*d,S=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=S,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ei=new V,Bt=new at,tu=new V(0,0,0),nu=new V(1,1,1),Sn=new V,or=new V,wt=new V,Xa=new at,Ka=new Yi;class mn{constructor(e=0,t=0,n=0,r=mn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ie(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Xa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ka.setFromEuler(this),this.setFromQuaternion(Ka,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mn.DEFAULT_ORDER="XYZ";class Ea{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let iu=0;const Za=new V,ti=new Yi,nn=new at,lr=new V,Di=new V,ru=new V,su=new Yi,Ya=new V(1,0,0),ja=new V(0,1,0),Ja=new V(0,0,1),Qa={type:"added"},au={type:"removed"},ni={type:"childadded",child:null},ts={type:"childremoved",child:null};class bt extends Ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new V,t=new mn,n=new Yi,r=new V(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new Pe}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ea,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ti.setFromAxisAngle(e,t),this.quaternion.multiply(ti),this}rotateOnWorldAxis(e,t){return ti.setFromAxisAngle(e,t),this.quaternion.premultiply(ti),this}rotateX(e){return this.rotateOnAxis(Ya,e)}rotateY(e){return this.rotateOnAxis(ja,e)}rotateZ(e){return this.rotateOnAxis(Ja,e)}translateOnAxis(e,t){return Za.copy(e).applyQuaternion(this.quaternion),this.position.add(Za.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ya,e)}translateY(e){return this.translateOnAxis(ja,e)}translateZ(e){return this.translateOnAxis(Ja,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(nn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?lr.copy(e):lr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Di.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?nn.lookAt(Di,lr,this.up):nn.lookAt(lr,Di,this.up),this.quaternion.setFromRotationMatrix(nn),r&&(nn.extractRotation(r.matrixWorld),ti.setFromRotationMatrix(nn),this.quaternion.premultiply(ti.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qa),ni.child=e,this.dispatchEvent(ni),ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(au),ts.child=e,this.dispatchEvent(ts),ts.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(nn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qa),ni.child=e,this.dispatchEvent(ni),ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Di,e,ru),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Di,su,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),f=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=r,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}bt.DEFAULT_UP=new V(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kt=new V,rn=new V,ns=new V,sn=new V,ii=new V,ri=new V,$a=new V,is=new V,rs=new V,ss=new V,as=new ct,os=new ct,ls=new ct;class Gt{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),kt.subVectors(e,t),r.cross(kt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){kt.subVectors(r,t),rn.subVectors(n,t),ns.subVectors(e,t);const a=kt.dot(kt),o=kt.dot(rn),l=kt.dot(ns),c=rn.dot(rn),h=rn.dot(ns),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,m=(c*l-o*h)*f,x=(a*h-o*l)*f;return s.set(1-m-x,x,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,sn)===null?!1:sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,sn.x),l.addScaledVector(a,sn.y),l.addScaledVector(o,sn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return as.setScalar(0),os.setScalar(0),ls.setScalar(0),as.fromBufferAttribute(e,t),os.fromBufferAttribute(e,n),ls.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(as,s.x),a.addScaledVector(os,s.y),a.addScaledVector(ls,s.z),a}static isFrontFacing(e,t,n,r){return kt.subVectors(n,t),rn.subVectors(e,t),kt.cross(rn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kt.subVectors(this.c,this.b),rn.subVectors(this.a,this.b),kt.cross(rn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Gt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Gt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;ii.subVectors(r,n),ri.subVectors(s,n),is.subVectors(e,n);const l=ii.dot(is),c=ri.dot(is);if(l<=0&&c<=0)return t.copy(n);rs.subVectors(e,r);const h=ii.dot(rs),d=ri.dot(rs);if(h>=0&&d<=h)return t.copy(r);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ii,a);ss.subVectors(e,s);const m=ii.dot(ss),x=ri.dot(ss);if(x>=0&&m<=x)return t.copy(s);const S=m*c-l*x;if(S<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(n).addScaledVector(ri,o);const p=h*x-m*d;if(p<=0&&d-h>=0&&m-x>=0)return $a.subVectors(s,r),o=(d-h)/(d-h+(m-x)),t.copy(r).addScaledVector($a,o);const u=1/(p+S+f);return a=S*u,o=f*u,t.copy(n).addScaledVector(ii,a).addScaledVector(ri,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const sl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mn={h:0,s:0,l:0},cr={h:0,s:0,l:0};function cs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=We.workingColorSpace){return this.r=e,this.g=t,this.b=n,We.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=We.workingColorSpace){if(e=Hc(e,1),t=Ie(t,0,1),n=Ie(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=cs(a,s,e+1/3),this.g=cs(a,s,e),this.b=cs(a,s,e-1/3)}return We.toWorkingColorSpace(this,r),this}setStyle(e,t=Ft){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){const n=sl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fn(e.r),this.g=fn(e.g),this.b=fn(e.b),this}copyLinearToSRGB(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return We.fromWorkingColorSpace(xt.copy(this),e),Math.round(Ie(xt.r*255,0,255))*65536+Math.round(Ie(xt.g*255,0,255))*256+Math.round(Ie(xt.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.fromWorkingColorSpace(xt.copy(this),t);const n=xt.r,r=xt.g,s=xt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=We.workingColorSpace){return We.fromWorkingColorSpace(xt.copy(this),t),e.r=xt.r,e.g=xt.g,e.b=xt.b,e}getStyle(e=Ft){We.fromWorkingColorSpace(xt.copy(this),e);const t=xt.r,n=xt.g,r=xt.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Mn),this.setHSL(Mn.h+e,Mn.s+t,Mn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mn),e.getHSL(cr);const n=Xr(Mn.h,cr.h,t),r=Xr(Mn.s,cr.s,t),s=Xr(Mn.l,cr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xt=new Ke;Ke.NAMES=sl;let ou=0;class Ji extends Ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=pi,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ts,this.blendDst=bs,this.blendEquation=kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=_i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yn,this.stencilZFail=Yn,this.stencilZPass=Yn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pi&&(n.blending=this.blending),this.side!==wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ts&&(n.blendSrc=this.blendSrc),this.blendDst!==bs&&(n.blendDst=this.blendDst),this.blendEquation!==kn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==za&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ya extends Ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=Ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ht=new V,ur=new Ye;let lu=0;class Nt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ba,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ur.fromBufferAttribute(this,t),ur.applyMatrix3(e),this.setXY(t,ur.x,ur.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pi(t,this.array)),t}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pi(t,this.array)),t}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pi(t,this.array)),t}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),r=yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),r=yt(r,this.array),s=yt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ba&&(e.usage=this.usage),e}}class al extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ol extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class qn extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let cu=0;const Dt=new at,us=new bt,si=new V,Rt=new ji,Ii=new ji,pt=new V;class Rn extends Ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nl(e)?ol:al)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Pe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dt.makeRotationFromQuaternion(e),this.applyMatrix4(Dt),this}rotateX(e){return Dt.makeRotationX(e),this.applyMatrix4(Dt),this}rotateY(e){return Dt.makeRotationY(e),this.applyMatrix4(Dt),this}rotateZ(e){return Dt.makeRotationZ(e),this.applyMatrix4(Dt),this}translate(e,t,n){return Dt.makeTranslation(e,t,n),this.applyMatrix4(Dt),this}scale(e,t,n){return Dt.makeScale(e,t,n),this.applyMatrix4(Dt),this}lookAt(e){return us.lookAt(e),us.updateMatrix(),this.applyMatrix4(us.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(si).negate(),this.translate(si.x,si.y,si.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new qn(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ji);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Rt.setFromBufferAttribute(s),this.morphTargetsRelative?(pt.addVectors(this.boundingBox.min,Rt.min),this.boundingBox.expandByPoint(pt),pt.addVectors(this.boundingBox.max,Rt.max),this.boundingBox.expandByPoint(pt)):(this.boundingBox.expandByPoint(Rt.min),this.boundingBox.expandByPoint(Rt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const n=this.boundingSphere.center;if(Rt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ii.setFromBufferAttribute(o),this.morphTargetsRelative?(pt.addVectors(Rt.min,Ii.min),Rt.expandByPoint(pt),pt.addVectors(Rt.max,Ii.max),Rt.expandByPoint(pt)):(Rt.expandByPoint(Ii.min),Rt.expandByPoint(Ii.max))}Rt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)pt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(pt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)pt.fromBufferAttribute(o,c),l&&(si.fromBufferAttribute(e,c),pt.add(si)),r=Math.max(r,n.distanceToSquared(pt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new V,l[I]=new V;const c=new V,h=new V,d=new V,f=new Ye,m=new Ye,x=new Ye,S=new V,p=new V;function u(I,M,_){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,_),f.fromBufferAttribute(s,I),m.fromBufferAttribute(s,M),x.fromBufferAttribute(s,_),h.sub(c),d.sub(c),m.sub(f),x.sub(f);const R=1/(m.x*x.y-x.x*m.y);isFinite(R)&&(S.copy(h).multiplyScalar(x.y).addScaledVector(d,-m.y).multiplyScalar(R),p.copy(d).multiplyScalar(m.x).addScaledVector(h,-x.x).multiplyScalar(R),o[I].add(S),o[M].add(S),o[_].add(S),l[I].add(p),l[M].add(p),l[_].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let I=0,M=b.length;I<M;++I){const _=b[I],R=_.start,H=_.count;for(let z=R,Z=R+H;z<Z;z+=3)u(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const T=new V,y=new V,D=new V,U=new V;function w(I){D.fromBufferAttribute(r,I),U.copy(D);const M=o[I];T.copy(M),T.sub(D.multiplyScalar(D.dot(M))).normalize(),y.crossVectors(U,M);const R=y.dot(l[I])<0?-1:1;a.setXYZW(I,T.x,T.y,T.z,R)}for(let I=0,M=b.length;I<M;++I){const _=b[I],R=_.start,H=_.count;for(let z=R,Z=R+H;z<Z;z+=3)w(e.getX(z+0)),w(e.getX(z+1)),w(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const r=new V,s=new V,a=new V,o=new V,l=new V,c=new V,h=new V,d=new V;if(e)for(let f=0,m=e.count;f<m;f+=3){const x=e.getX(f+0),S=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,S),a.fromBufferAttribute(t,p),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,S),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(S,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)pt.fromBufferAttribute(e,t),pt.normalize(),e.setXYZ(t,pt.x,pt.y,pt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h);let m=0,x=0;for(let S=0,p=l.length;S<p;S++){o.isInterleavedBufferAttribute?m=l[S]*o.data.stride+o.offset:m=l[S]*h;for(let u=0;u<h;u++)f[x++]=c[m++]}return new Nt(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Rn,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){const f=c[h],m=e(f,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const m=c[d];h.push(m.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let f=0,m=d.length;f<m;f++)h.push(d[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eo=new at,Dn=new Ma,hr=new zr,to=new V,dr=new V,fr=new V,pr=new V,hs=new V,mr=new V,no=new V,gr=new V;class Jt extends bt{constructor(e=new Rn,t=new ya){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){mr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],d=s[l];h!==0&&(hs.fromBufferAttribute(d,e),a?mr.addScaledVector(hs,h):mr.addScaledVector(hs.sub(t),h))}t.add(mr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere),hr.applyMatrix4(s),Dn.copy(e.ray).recast(e.near),!(hr.containsPoint(Dn.origin)===!1&&(Dn.intersectSphere(hr,to)===null||Dn.origin.distanceToSquared(to)>(e.far-e.near)**2))&&(eo.copy(s).invert(),Dn.copy(e.ray).applyMatrix4(eo),!(n.boundingBox!==null&&Dn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Dn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,f=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,S=f.length;x<S;x++){const p=f[x],u=a[p.materialIndex],b=Math.max(p.start,m.start),T=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let y=b,D=T;y<D;y+=3){const U=o.getX(y),w=o.getX(y+1),I=o.getX(y+2);r=vr(this,u,e,n,c,h,d,U,w,I),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const x=Math.max(0,m.start),S=Math.min(o.count,m.start+m.count);for(let p=x,u=S;p<u;p+=3){const b=o.getX(p),T=o.getX(p+1),y=o.getX(p+2);r=vr(this,a,e,n,c,h,d,b,T,y),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,S=f.length;x<S;x++){const p=f[x],u=a[p.materialIndex],b=Math.max(p.start,m.start),T=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let y=b,D=T;y<D;y+=3){const U=y,w=y+1,I=y+2;r=vr(this,u,e,n,c,h,d,U,w,I),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const x=Math.max(0,m.start),S=Math.min(l.count,m.start+m.count);for(let p=x,u=S;p<u;p+=3){const b=p,T=p+1,y=p+2;r=vr(this,a,e,n,c,h,d,b,T,y),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function uu(i,e,t,n,r,s,a,o){let l;if(e.side===Tt?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===wn,o),l===null)return null;gr.copy(o),gr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(gr);return c<t.near||c>t.far?null:{distance:c,point:gr.clone(),object:i}}function vr(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,dr),i.getVertexPosition(l,fr),i.getVertexPosition(c,pr);const h=uu(i,e,t,n,dr,fr,pr,no);if(h){const d=new V;Gt.getBarycoord(no,dr,fr,pr,d),r&&(h.uv=Gt.getInterpolatedAttribute(r,o,l,c,d,new Ye)),s&&(h.uv1=Gt.getInterpolatedAttribute(s,o,l,c,d,new Ye)),a&&(h.normal=Gt.getInterpolatedAttribute(a,o,l,c,d,new V),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new V,materialIndex:0};Gt.getNormal(dr,fr,pr,f.normal),h.face=f,h.barycoord=d}return h}class Qi extends Rn{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],d=[];let f=0,m=0;x("z","y","x",-1,-1,n,t,e,a,s,0),x("z","y","x",1,-1,n,t,-e,a,s,1),x("x","z","y",1,1,e,n,t,r,a,2),x("x","z","y",1,-1,e,n,-t,r,a,3),x("x","y","z",1,-1,e,t,n,r,s,4),x("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new qn(c,3)),this.setAttribute("normal",new qn(h,3)),this.setAttribute("uv",new qn(d,2));function x(S,p,u,b,T,y,D,U,w,I,M){const _=y/w,R=D/I,H=y/2,z=D/2,Z=U/2,Y=w+1,q=I+1;let J=0,k=0;const se=new V;for(let he=0;he<q;he++){const _e=he*R-z;for(let De=0;De<Y;De++){const je=De*_-H;se[S]=je*b,se[p]=_e*T,se[u]=Z,c.push(se.x,se.y,se.z),se[S]=0,se[p]=0,se[u]=U>0?1:-1,h.push(se.x,se.y,se.z),d.push(De/w),d.push(1-he/I),J+=1}}for(let he=0;he<I;he++)for(let _e=0;_e<w;_e++){const De=f+_e+Y*he,je=f+_e+Y*(he+1),G=f+(_e+1)+Y*(he+1),te=f+(_e+1)+Y*he;l.push(De,je,te),l.push(je,G,te),k+=6}o.addGroup(m,k,M),m+=k,f+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function bi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Mt(i){const e={};for(let t=0;t<i.length;t++){const n=bi(i[t]);for(const r in n)e[r]=n[r]}return e}function hu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ll(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const du={clone:bi,merge:Mt};var fu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gn extends Ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fu,this.fragmentShader=pu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=bi(e.uniforms),this.uniformsGroups=hu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class cl extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=dn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new V,io=new Ye,ro=new Ye;class Ht extends cl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=la*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return la*2*Math.atan(Math.tan(qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(En.x,En.y).multiplyScalar(-e/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(En.x,En.y).multiplyScalar(-e/En.z)}getViewSize(e,t){return this.getViewBounds(e,io,ro),t.subVectors(ro,io)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ai=-90,oi=1;class mu extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ht(ai,oi,e,t);r.layers=this.layers,this.add(r);const s=new Ht(ai,oi,e,t);s.layers=this.layers,this.add(s);const a=new Ht(ai,oi,e,t);a.layers=this.layers,this.add(a);const o=new Ht(ai,oi,e,t);o.layers=this.layers,this.add(o);const l=new Ht(ai,oi,e,t);l.layers=this.layers,this.add(l);const c=new Ht(ai,oi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===dn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Or)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(d,f,m),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class ul extends _t{constructor(e,t,n,r,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Si,super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gu extends Kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ul(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Qi(5,5,5),s=new gn({name:"CubemapFromEquirect",uniforms:bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Tt,blending:bn});s.uniforms.tEquirect.value=t;const a=new Jt(r,s),o=t.minFilter;return t.minFilter===Gn&&(t.minFilter=jt),new mu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}class xr extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vu={type:"move"};class ds{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const S of e.hand.values()){const p=t.getJointPose(S,n),u=this._getHandJoint(c,S);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),m=.02,x=.005;c.inputState.pinching&&f>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vu)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new xr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class xu extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const fs=new V,_u=new V,Su=new Pe;class Vn{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=fs.subVectors(n,t).cross(_u.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(fs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Su.getNormalMatrix(e),r=this.coplanarPoint(fs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const In=new zr,_r=new V;class hl{constructor(e=new Vn,t=new Vn,n=new Vn,r=new Vn,s=new Vn,a=new Vn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dn){const n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],h=r[5],d=r[6],f=r[7],m=r[8],x=r[9],S=r[10],p=r[11],u=r[12],b=r[13],T=r[14],y=r[15];if(n[0].setComponents(l-s,f-c,p-m,y-u).normalize(),n[1].setComponents(l+s,f+c,p+m,y+u).normalize(),n[2].setComponents(l+a,f+h,p+x,y+b).normalize(),n[3].setComponents(l-a,f-h,p-x,y-b).normalize(),n[4].setComponents(l-o,f-d,p-S,y-T).normalize(),t===dn)n[5].setComponents(l+o,f+d,p+S,y+T).normalize();else if(t===Or)n[5].setComponents(o,d,S,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),In.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),In.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(In)}intersectsSprite(e){return In.center.set(0,0,0),In.radius=.7071067811865476,In.applyMatrix4(e.matrixWorld),this.intersectsSphere(In)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(_r.x=r.normal.x>0?e.max.x:e.min.x,_r.y=r.normal.y>0?e.max.y:e.min.y,_r.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_r)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mu extends Ji{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const so=new at,ca=new Ma,Sr=new zr,Mr=new V;class Eu extends bt{constructor(e=new Rn,t=new Mu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(r),Sr.radius+=s,e.ray.intersectsSphere(Sr)===!1)return;so.copy(r).invert(),ca.copy(e.ray).applyMatrix4(so);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let x=f,S=m;x<S;x++){const p=c.getX(x);Mr.fromBufferAttribute(d,p),ao(Mr,p,l,r,e,t,this)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let x=f,S=m;x<S;x++)Mr.fromBufferAttribute(d,x),ao(Mr,x,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ao(i,e,t,n,r,s,a){const o=ca.distanceSqToPoint(i);if(o<t){const l=new V;ca.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class yu extends _t{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class dl extends _t{constructor(e,t,n,r,s,a,o,l,c,h=mi){if(h!==mi&&h!==yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===mi&&(n=Xn),n===void 0&&h===yi&&(n=Ei),super(null,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Xt,this.minFilter=l!==void 0?l:Xt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class wi extends Rn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,d=e/o,f=t/l,m=[],x=[],S=[],p=[];for(let u=0;u<h;u++){const b=u*f-a;for(let T=0;T<c;T++){const y=T*d-s;x.push(y,-b,0),S.push(0,0,1),p.push(T/o),p.push(1-u/l)}}for(let u=0;u<l;u++)for(let b=0;b<o;b++){const T=b+c*u,y=b+c*(u+1),D=b+1+c*(u+1),U=b+1+c*u;m.push(T,y,U),m.push(y,D,U)}this.setIndex(m),this.setAttribute("position",new qn(x,3)),this.setAttribute("normal",new qn(S,3)),this.setAttribute("uv",new qn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Tu extends Ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class bu extends Ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const oo={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Au{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=c.length;d<f;d+=2){const m=c[d],x=c[d+1];if(m.global&&(m.lastIndex=0),m.test(h))return x}return null}}}const wu=new Au;class Ta{constructor(e){this.manager=e!==void 0?e:wu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ta.DEFAULT_MATERIAL_NAME="__DEFAULT";class Ru extends Ta{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=oo.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=Xi("img");function l(){h(),oo.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){h(),r&&r(d),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class fl extends Ta{constructor(e){super(e)}load(e,t,n,r){const s=new _t,a=new Ru(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class pl extends cl{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cu extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class Wt{constructor(e){this.value=e}clone(){return new Wt(this.value.clone===void 0?this.value:this.value.clone())}}const lo=new at;class Pu{constructor(e,t,n=0,r=1/0){this.ray=new Ma(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ea,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return lo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(lo),this}intersectObject(e,t=!0,n=[]){return ua(e,this,n,t),n.sort(co),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)ua(e[r],this,n,t);return n.sort(co),n}}function co(i,e){return i.distance-e.distance}function ua(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)ua(s[a],e,t,!0)}}function uo(i,e,t,n){const r=Uu(n);switch(t){case Zo:return i*e;case jo:return i*e;case Jo:return i*e*2;case Qo:return i*e/r.components*r.byteLength;case xa:return i*e/r.components*r.byteLength;case $o:return i*e*2/r.components*r.byteLength;case _a:return i*e*2/r.components*r.byteLength;case Yo:return i*e*3/r.components*r.byteLength;case qt:return i*e*4/r.components*r.byteLength;case Sa:return i*e*4/r.components*r.byteLength;case Ar:case wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Rr:case Cr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Os:case zs:return Math.max(i,16)*Math.max(e,8)/4;case Ns:case Vs:return Math.max(i,8)*Math.max(e,8)/2;case Bs:case ks:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ws:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Hs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Gs:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case qs:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xs:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ks:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Zs:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ys:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case js:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Js:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Qs:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case $s:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ea:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ta:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case na:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Pr:case ia:case ra:return Math.ceil(i/4)*Math.ceil(e/4)*16;case el:case sa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case aa:case oa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Uu(i){switch(i){case pn:case qo:return{byteLength:1,components:1};case qi:case Xo:case Ki:return{byteLength:2,components:1};case ga:case va:return{byteLength:2,components:4};case Xn:case ma:case hn:return{byteLength:4,components:1};case Ko:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pa);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ml(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Lu(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((m,x)=>m.start-x.start);let f=0;for(let m=1;m<d.length;m++){const x=d[f],S=d[m];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++f,d[f]=S)}d.length=f+1;for(let m=0,x=d.length;m<x;m++){const S=d[m];i.bufferSubData(c,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Du=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Iu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Nu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ou=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Bu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ku=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Wu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ku=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Zu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Yu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ju=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ju=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$u=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,eh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,th=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,nh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ih=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,sh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ah=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,oh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ch="gl_FragColor = linearToOutputTexel( gl_FragColor );",uh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,dh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ph=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_h=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Mh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Eh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Th=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,bh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ah=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ch=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ph=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Uh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Lh=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Dh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ih=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Nh=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Oh=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vh=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Wh=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zh=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Yh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Jh=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$h=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ed=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,td=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,nd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,id=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ad=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,od=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ld=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ud=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,md=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_d=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Md=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ed=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Td=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ad=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Rd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Cd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ud=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ld=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Dd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Id=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Od=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Bd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Wd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Hd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Kd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Jd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$d=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ef=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,rf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,af=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,of=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,hf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,df=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Le={alphahash_fragment:Du,alphahash_pars_fragment:Iu,alphamap_fragment:Fu,alphamap_pars_fragment:Nu,alphatest_fragment:Ou,alphatest_pars_fragment:Vu,aomap_fragment:zu,aomap_pars_fragment:Bu,batching_pars_vertex:ku,batching_vertex:Wu,begin_vertex:Hu,beginnormal_vertex:Gu,bsdfs:qu,iridescence_fragment:Xu,bumpmap_pars_fragment:Ku,clipping_planes_fragment:Zu,clipping_planes_pars_fragment:Yu,clipping_planes_pars_vertex:ju,clipping_planes_vertex:Ju,color_fragment:Qu,color_pars_fragment:$u,color_pars_vertex:eh,color_vertex:th,common:nh,cube_uv_reflection_fragment:ih,defaultnormal_vertex:rh,displacementmap_pars_vertex:sh,displacementmap_vertex:ah,emissivemap_fragment:oh,emissivemap_pars_fragment:lh,colorspace_fragment:ch,colorspace_pars_fragment:uh,envmap_fragment:hh,envmap_common_pars_fragment:dh,envmap_pars_fragment:fh,envmap_pars_vertex:ph,envmap_physical_pars_fragment:bh,envmap_vertex:mh,fog_vertex:gh,fog_pars_vertex:vh,fog_fragment:xh,fog_pars_fragment:_h,gradientmap_pars_fragment:Sh,lightmap_pars_fragment:Mh,lights_lambert_fragment:Eh,lights_lambert_pars_fragment:yh,lights_pars_begin:Th,lights_toon_fragment:Ah,lights_toon_pars_fragment:wh,lights_phong_fragment:Rh,lights_phong_pars_fragment:Ch,lights_physical_fragment:Ph,lights_physical_pars_fragment:Uh,lights_fragment_begin:Lh,lights_fragment_maps:Dh,lights_fragment_end:Ih,logdepthbuf_fragment:Fh,logdepthbuf_pars_fragment:Nh,logdepthbuf_pars_vertex:Oh,logdepthbuf_vertex:Vh,map_fragment:zh,map_pars_fragment:Bh,map_particle_fragment:kh,map_particle_pars_fragment:Wh,metalnessmap_fragment:Hh,metalnessmap_pars_fragment:Gh,morphinstance_vertex:qh,morphcolor_vertex:Xh,morphnormal_vertex:Kh,morphtarget_pars_vertex:Zh,morphtarget_vertex:Yh,normal_fragment_begin:jh,normal_fragment_maps:Jh,normal_pars_fragment:Qh,normal_pars_vertex:$h,normal_vertex:ed,normalmap_pars_fragment:td,clearcoat_normal_fragment_begin:nd,clearcoat_normal_fragment_maps:id,clearcoat_pars_fragment:rd,iridescence_pars_fragment:sd,opaque_fragment:ad,packing:od,premultiplied_alpha_fragment:ld,project_vertex:cd,dithering_fragment:ud,dithering_pars_fragment:hd,roughnessmap_fragment:dd,roughnessmap_pars_fragment:fd,shadowmap_pars_fragment:pd,shadowmap_pars_vertex:md,shadowmap_vertex:gd,shadowmask_pars_fragment:vd,skinbase_vertex:xd,skinning_pars_vertex:_d,skinning_vertex:Sd,skinnormal_vertex:Md,specularmap_fragment:Ed,specularmap_pars_fragment:yd,tonemapping_fragment:Td,tonemapping_pars_fragment:bd,transmission_fragment:Ad,transmission_pars_fragment:wd,uv_pars_fragment:Rd,uv_pars_vertex:Cd,uv_vertex:Pd,worldpos_vertex:Ud,background_vert:Ld,background_frag:Dd,backgroundCube_vert:Id,backgroundCube_frag:Fd,cube_vert:Nd,cube_frag:Od,depth_vert:Vd,depth_frag:zd,distanceRGBA_vert:Bd,distanceRGBA_frag:kd,equirect_vert:Wd,equirect_frag:Hd,linedashed_vert:Gd,linedashed_frag:qd,meshbasic_vert:Xd,meshbasic_frag:Kd,meshlambert_vert:Zd,meshlambert_frag:Yd,meshmatcap_vert:jd,meshmatcap_frag:Jd,meshnormal_vert:Qd,meshnormal_frag:$d,meshphong_vert:ef,meshphong_frag:tf,meshphysical_vert:nf,meshphysical_frag:rf,meshtoon_vert:sf,meshtoon_frag:af,points_vert:of,points_frag:lf,shadow_vert:cf,shadow_frag:uf,sprite_vert:hf,sprite_frag:df},ne={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pe},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pe}},envmap:{envMap:{value:null},envMapRotation:{value:new Pe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pe},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0},uvTransform:{value:new Pe}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pe},alphaMap:{value:null},alphaMapTransform:{value:new Pe},alphaTest:{value:0}}},Zt={basic:{uniforms:Mt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:Le.meshbasic_vert,fragmentShader:Le.meshbasic_frag},lambert:{uniforms:Mt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Le.meshlambert_vert,fragmentShader:Le.meshlambert_frag},phong:{uniforms:Mt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Le.meshphong_vert,fragmentShader:Le.meshphong_frag},standard:{uniforms:Mt([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag},toon:{uniforms:Mt([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Le.meshtoon_vert,fragmentShader:Le.meshtoon_frag},matcap:{uniforms:Mt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:Le.meshmatcap_vert,fragmentShader:Le.meshmatcap_frag},points:{uniforms:Mt([ne.points,ne.fog]),vertexShader:Le.points_vert,fragmentShader:Le.points_frag},dashed:{uniforms:Mt([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Le.linedashed_vert,fragmentShader:Le.linedashed_frag},depth:{uniforms:Mt([ne.common,ne.displacementmap]),vertexShader:Le.depth_vert,fragmentShader:Le.depth_frag},normal:{uniforms:Mt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:Le.meshnormal_vert,fragmentShader:Le.meshnormal_frag},sprite:{uniforms:Mt([ne.sprite,ne.fog]),vertexShader:Le.sprite_vert,fragmentShader:Le.sprite_frag},background:{uniforms:{uvTransform:{value:new Pe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Le.background_vert,fragmentShader:Le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pe}},vertexShader:Le.backgroundCube_vert,fragmentShader:Le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Le.cube_vert,fragmentShader:Le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Le.equirect_vert,fragmentShader:Le.equirect_frag},distanceRGBA:{uniforms:Mt([ne.common,ne.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Le.distanceRGBA_vert,fragmentShader:Le.distanceRGBA_frag},shadow:{uniforms:Mt([ne.lights,ne.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Le.shadow_vert,fragmentShader:Le.shadow_frag}};Zt.physical={uniforms:Mt([Zt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pe},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pe},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pe},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pe},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pe},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pe}}]),vertexShader:Le.meshphysical_vert,fragmentShader:Le.meshphysical_frag};const Er={r:0,b:0,g:0},Fn=new mn,ff=new at;function pf(i,e,t,n,r,s,a){const o=new Ke(0);let l=s===!0?0:1,c,h,d=null,f=0,m=null;function x(T){let y=T.isScene===!0?T.background:null;return y&&y.isTexture&&(y=(T.backgroundBlurriness>0?t:e).get(y)),y}function S(T){let y=!1;const D=x(T);D===null?u(o,l):D&&D.isColor&&(u(D,1),y=!0);const U=i.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,a):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(T,y){const D=x(y);D&&(D.isCubeTexture||D.mapping===Vr)?(h===void 0&&(h=new Jt(new Qi(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:bi(Zt.backgroundCube.uniforms),vertexShader:Zt.backgroundCube.vertexShader,fragmentShader:Zt.backgroundCube.fragmentShader,side:Tt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(U,w,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Fn.copy(y.backgroundRotation),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),h.material.uniforms.envMap.value=D,h.material.uniforms.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ff.makeRotationFromEuler(Fn)),h.material.toneMapped=We.getTransfer(D.colorSpace)!==Ze,(d!==D||f!==D.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=D,f=D.version,m=i.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):D&&D.isTexture&&(c===void 0&&(c=new Jt(new wi(2,2),new gn({name:"BackgroundMaterial",uniforms:bi(Zt.background.uniforms),vertexShader:Zt.background.vertexShader,fragmentShader:Zt.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=D,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=We.getTransfer(D.colorSpace)!==Ze,D.matrixAutoUpdate===!0&&D.updateMatrix(),c.material.uniforms.uvTransform.value.copy(D.matrix),(d!==D||f!==D.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=D,f=D.version,m=i.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function u(T,y){T.getRGB(Er,ll(i)),n.buffers.color.setClear(Er.r,Er.g,Er.b,y,a)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(T,y=1){o.set(T),l=y,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,u(o,l)},render:S,addToRenderList:p,dispose:b}}function mf(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,a=!1;function o(_,R,H,z,Z){let Y=!1;const q=d(z,H,R);s!==q&&(s=q,c(s.object)),Y=m(_,z,H,Z),Y&&x(_,z,H,Z),Z!==null&&e.update(Z,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,y(_,R,H,z),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function d(_,R,H){const z=H.wireframe===!0;let Z=n[_.id];Z===void 0&&(Z={},n[_.id]=Z);let Y=Z[R.id];Y===void 0&&(Y={},Z[R.id]=Y);let q=Y[z];return q===void 0&&(q=f(l()),Y[z]=q),q}function f(_){const R=[],H=[],z=[];for(let Z=0;Z<t;Z++)R[Z]=0,H[Z]=0,z[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:H,attributeDivisors:z,object:_,attributes:{},index:null}}function m(_,R,H,z){const Z=s.attributes,Y=R.attributes;let q=0;const J=H.getAttributes();for(const k in J)if(J[k].location>=0){const he=Z[k];let _e=Y[k];if(_e===void 0&&(k==="instanceMatrix"&&_.instanceMatrix&&(_e=_.instanceMatrix),k==="instanceColor"&&_.instanceColor&&(_e=_.instanceColor)),he===void 0||he.attribute!==_e||_e&&he.data!==_e.data)return!0;q++}return s.attributesNum!==q||s.index!==z}function x(_,R,H,z){const Z={},Y=R.attributes;let q=0;const J=H.getAttributes();for(const k in J)if(J[k].location>=0){let he=Y[k];he===void 0&&(k==="instanceMatrix"&&_.instanceMatrix&&(he=_.instanceMatrix),k==="instanceColor"&&_.instanceColor&&(he=_.instanceColor));const _e={};_e.attribute=he,he&&he.data&&(_e.data=he.data),Z[k]=_e,q++}s.attributes=Z,s.attributesNum=q,s.index=z}function S(){const _=s.newAttributes;for(let R=0,H=_.length;R<H;R++)_[R]=0}function p(_){u(_,0)}function u(_,R){const H=s.newAttributes,z=s.enabledAttributes,Z=s.attributeDivisors;H[_]=1,z[_]===0&&(i.enableVertexAttribArray(_),z[_]=1),Z[_]!==R&&(i.vertexAttribDivisor(_,R),Z[_]=R)}function b(){const _=s.newAttributes,R=s.enabledAttributes;for(let H=0,z=R.length;H<z;H++)R[H]!==_[H]&&(i.disableVertexAttribArray(H),R[H]=0)}function T(_,R,H,z,Z,Y,q){q===!0?i.vertexAttribIPointer(_,R,H,Z,Y):i.vertexAttribPointer(_,R,H,z,Z,Y)}function y(_,R,H,z){S();const Z=z.attributes,Y=H.getAttributes(),q=R.defaultAttributeValues;for(const J in Y){const k=Y[J];if(k.location>=0){let se=Z[J];if(se===void 0&&(J==="instanceMatrix"&&_.instanceMatrix&&(se=_.instanceMatrix),J==="instanceColor"&&_.instanceColor&&(se=_.instanceColor)),se!==void 0){const he=se.normalized,_e=se.itemSize,De=e.get(se);if(De===void 0)continue;const je=De.buffer,G=De.type,te=De.bytesPerElement,ge=G===i.INT||G===i.UNSIGNED_INT||se.gpuType===ma;if(se.isInterleavedBufferAttribute){const ae=se.data,Te=ae.stride,He=se.offset;if(ae.isInstancedInterleavedBuffer){for(let be=0;be<k.locationSize;be++)u(k.location+be,ae.meshPerAttribute);_.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let be=0;be<k.locationSize;be++)p(k.location+be);i.bindBuffer(i.ARRAY_BUFFER,je);for(let be=0;be<k.locationSize;be++)T(k.location+be,_e/k.locationSize,G,he,Te*te,(He+_e/k.locationSize*be)*te,ge)}else{if(se.isInstancedBufferAttribute){for(let ae=0;ae<k.locationSize;ae++)u(k.location+ae,se.meshPerAttribute);_.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ae=0;ae<k.locationSize;ae++)p(k.location+ae);i.bindBuffer(i.ARRAY_BUFFER,je);for(let ae=0;ae<k.locationSize;ae++)T(k.location+ae,_e/k.locationSize,G,he,_e*te,_e/k.locationSize*ae*te,ge)}}else if(q!==void 0){const he=q[J];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(k.location,he);break;case 3:i.vertexAttrib3fv(k.location,he);break;case 4:i.vertexAttrib4fv(k.location,he);break;default:i.vertexAttrib1fv(k.location,he)}}}}b()}function D(){I();for(const _ in n){const R=n[_];for(const H in R){const z=R[H];for(const Z in z)h(z[Z].object),delete z[Z];delete R[H]}delete n[_]}}function U(_){if(n[_.id]===void 0)return;const R=n[_.id];for(const H in R){const z=R[H];for(const Z in z)h(z[Z].object),delete z[Z];delete R[H]}delete n[_.id]}function w(_){for(const R in n){const H=n[R];if(H[_.id]===void 0)continue;const z=H[_.id];for(const Z in z)h(z[Z].object),delete z[Z];delete H[_.id]}}function I(){M(),a=!0,s!==r&&(s=r,c(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:M,dispose:D,releaseStatesOfGeometry:U,releaseStatesOfProgram:w,initAttributes:S,enableAttribute:p,disableUnusedAttributes:b}}function gf(i,e,t){let n;function r(c){n=c}function s(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let m=0;for(let x=0;x<d;x++)m+=h[x];t.update(m,n,1)}function l(c,h,d,f){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<c.length;x++)a(c[x],h[x],f[x]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,d);let x=0;for(let S=0;S<d;S++)x+=h[S]*f[S];t.update(x,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function vf(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==qt&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const I=w===Ki&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==pn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==hn&&!I)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=x>0,U=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:p,maxAttributes:u,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:y,vertexTextures:D,maxSamples:U}}function xf(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Vn,o=new Pe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||n!==0||r;return r=f,n=d.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,m){const x=d.clippingPlanes,S=d.clipIntersection,p=d.clipShadows,u=i.get(d);if(!r||x===null||x.length===0||s&&!p)s?h(null):c();else{const b=s?0:n,T=b*4;let y=u.clippingState||null;l.value=y,y=h(x,f,T,m);for(let D=0;D!==T;++D)y[D]=t[D];u.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,f,m,x){const S=d!==null?d.length:0;let p=null;if(S!==0){if(p=l.value,x!==!0||p===null){const u=m+S*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<u)&&(p=new Float32Array(u));for(let T=0,y=m;T!==S;++T,y+=4)a.copy(d[T]).applyMatrix4(b,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}function _f(i){let e=new WeakMap;function t(a,o){return o===Ds?a.mapping=Si:o===Is&&(a.mapping=Mi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ds||o===Is)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new gu(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const hi=4,ho=[.125,.215,.35,.446,.526,.582],Wn=20,ps=new pl,fo=new Ke;let ms=null,gs=0,vs=0,xs=!1;const zn=(1+Math.sqrt(5))/2,li=1/zn,po=[new V(-zn,li,0),new V(zn,li,0),new V(-li,0,zn),new V(li,0,zn),new V(0,zn,-li),new V(0,zn,li),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class mo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){ms=this._renderer.getRenderTarget(),gs=this._renderer.getActiveCubeFace(),vs=this._renderer.getActiveMipmapLevel(),xs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ms,gs,vs),this._renderer.xr.enabled=xs,e.scissorTest=!1,yr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Si||e.mapping===Mi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ms=this._renderer.getRenderTarget(),gs=this._renderer.getActiveCubeFace(),vs=this._renderer.getActiveMipmapLevel(),xs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:Ki,format:qt,colorSpace:Ti,depthBuffer:!1},r=go(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=go(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sf(s)),this._blurMaterial=Mf(s,e,t)}return r}_compileMaterial(e){const t=new Jt(this._lodPlanes[0],e);this._renderer.compile(t,ps)}_sceneToCubeUV(e,t,n,r){const o=new Ht(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(fo),h.toneMapping=An,h.autoClear=!1;const m=new ya({name:"PMREM.Background",side:Tt,depthWrite:!1,depthTest:!1}),x=new Jt(new Qi,m);let S=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,S=!0):(m.color.copy(fo),S=!0);for(let u=0;u<6;u++){const b=u%3;b===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):b===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const T=this._cubeSize;yr(r,b*T,u>2?T:0,T,T),h.setRenderTarget(r),S&&h.render(x,o),h.render(e,o)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=f,h.autoClear=d,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Si||e.mapping===Mi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=xo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vo());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Jt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;yr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ps)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=po[(r-s-1)%po.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Jt(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Wn-1),S=s/x,p=isFinite(s)?1+Math.floor(h*S):Wn;p>Wn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Wn}`);const u=[];let b=0;for(let w=0;w<Wn;++w){const I=w/S,M=Math.exp(-I*I/2);u.push(M),w===0?b+=M:w<p&&(b+=2*M)}for(let w=0;w<u.length;w++)u[w]=u[w]/b;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:T}=this;f.dTheta.value=x,f.mipInt.value=T-n;const y=this._sizeLods[r],D=3*y*(r>T-hi?r-T+hi:0),U=4*(this._cubeSize-y);yr(t,D,U,3*y,2*y),l.setRenderTarget(t),l.render(d,ps)}}function Sf(i){const e=[],t=[],n=[];let r=i;const s=i-hi+1+ho.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>i-hi?l=ho[a-i+hi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,x=6,S=3,p=2,u=1,b=new Float32Array(S*x*m),T=new Float32Array(p*x*m),y=new Float32Array(u*x*m);for(let U=0;U<m;U++){const w=U%3*2/3-1,I=U>2?0:-1,M=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];b.set(M,S*x*U),T.set(f,p*x*U);const _=[U,U,U,U,U,U];y.set(_,u*x*U)}const D=new Rn;D.setAttribute("position",new Nt(b,S)),D.setAttribute("uv",new Nt(T,p)),D.setAttribute("faceIndex",new Nt(y,u)),e.push(D),r>hi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function go(i,e,t){const n=new Kn(i,e,t);return n.texture.mapping=Vr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function yr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Mf(i,e,t){const n=new Float32Array(Wn),r=new V(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:Wn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function vo(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function xo(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function ba(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ef(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ds||l===Is,h=l===Si||l===Mi;if(c||h){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new mo(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return c&&m&&m.height>0||h&&m&&r(m)?(t===null&&(t=new mo(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function yf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&ci("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Tf(i,e,t,n){const r={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",a),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const m in f)e.update(f[m],i.ARRAY_BUFFER)}function c(d){const f=[],m=d.index,x=d.attributes.position;let S=0;if(m!==null){const b=m.array;S=m.version;for(let T=0,y=b.length;T<y;T+=3){const D=b[T+0],U=b[T+1],w=b[T+2];f.push(D,U,U,w,w,D)}}else if(x!==void 0){const b=x.array;S=x.version;for(let T=0,y=b.length/3-1;T<y;T+=3){const D=T+0,U=T+1,w=T+2;f.push(D,U,U,w,w,D)}}else return;const p=new(nl(f)?ol:al)(f,1);p.version=S;const u=s.get(d);u&&e.remove(u),s.set(d,p)}function h(d){const f=s.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function bf(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function l(f,m){i.drawElements(n,m,s,f*a),t.update(m,n,1)}function c(f,m,x){x!==0&&(i.drawElementsInstanced(n,m,s,f*a,x),t.update(m,n,x))}function h(f,m,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,s,f,0,x);let p=0;for(let u=0;u<x;u++)p+=m[u];t.update(p,n,1)}function d(f,m,x,S){if(x===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<f.length;u++)c(f[u]/a,m[u],S[u]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,s,f,0,S,0,x);let u=0;for(let b=0;b<x;b++)u+=m[b]*S[b];t.update(u,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Af(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function wf(i,e,t){const n=new WeakMap,r=new ct;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let _=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var m=_;f!==void 0&&f.texture.dispose();const x=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let y=0;x===!0&&(y=1),S===!0&&(y=2),p===!0&&(y=3);let D=o.attributes.position.count*y,U=1;D>e.maxTextureSize&&(U=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const w=new Float32Array(D*U*4*d),I=new rl(w,D,U,d);I.type=hn,I.needsUpdate=!0;const M=y*4;for(let R=0;R<d;R++){const H=u[R],z=b[R],Z=T[R],Y=D*U*4*R;for(let q=0;q<H.count;q++){const J=q*M;x===!0&&(r.fromBufferAttribute(H,q),w[Y+J+0]=r.x,w[Y+J+1]=r.y,w[Y+J+2]=r.z,w[Y+J+3]=0),S===!0&&(r.fromBufferAttribute(z,q),w[Y+J+4]=r.x,w[Y+J+5]=r.y,w[Y+J+6]=r.z,w[Y+J+7]=0),p===!0&&(r.fromBufferAttribute(Z,q),w[Y+J+8]=r.x,w[Y+J+9]=r.y,w[Y+J+10]=r.z,w[Y+J+11]=Z.itemSize===4?r.w:1)}}f={count:d,texture:I,size:new Ye(D,U)},n.set(o,f),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let x=0;for(let p=0;p<c.length;p++)x+=c[p];const S=o.morphTargetsRelative?1:1-x;l.getUniforms().setValue(i,"morphTargetBaseInfluence",S),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function Rf(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return d}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const gl=new _t,_o=new dl(1,1),vl=new rl,xl=new $c,_l=new ul,So=[],Mo=[],Eo=new Float32Array(16),yo=new Float32Array(9),To=new Float32Array(4);function Ri(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=So[r];if(s===void 0&&(s=new Float32Array(r),So[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function dt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ft(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Br(i,e){let t=Mo[e];t===void 0&&(t=new Int32Array(e),Mo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Cf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Pf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2fv(this.addr,e),ft(t,e)}}function Uf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(dt(t,e))return;i.uniform3fv(this.addr,e),ft(t,e)}}function Lf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4fv(this.addr,e),ft(t,e)}}function Df(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ft(t,e)}else{if(dt(t,n))return;To.set(n),i.uniformMatrix2fv(this.addr,!1,To),ft(t,n)}}function If(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ft(t,e)}else{if(dt(t,n))return;yo.set(n),i.uniformMatrix3fv(this.addr,!1,yo),ft(t,n)}}function Ff(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(dt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ft(t,e)}else{if(dt(t,n))return;Eo.set(n),i.uniformMatrix4fv(this.addr,!1,Eo),ft(t,n)}}function Nf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Of(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2iv(this.addr,e),ft(t,e)}}function Vf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;i.uniform3iv(this.addr,e),ft(t,e)}}function zf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4iv(this.addr,e),ft(t,e)}}function Bf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function kf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dt(t,e))return;i.uniform2uiv(this.addr,e),ft(t,e)}}function Wf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dt(t,e))return;i.uniform3uiv(this.addr,e),ft(t,e)}}function Hf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dt(t,e))return;i.uniform4uiv(this.addr,e),ft(t,e)}}function Gf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(_o.compareFunction=tl,s=_o):s=gl,t.setTexture2D(e||s,r)}function qf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||xl,r)}function Xf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||_l,r)}function Kf(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||vl,r)}function Zf(i){switch(i){case 5126:return Cf;case 35664:return Pf;case 35665:return Uf;case 35666:return Lf;case 35674:return Df;case 35675:return If;case 35676:return Ff;case 5124:case 35670:return Nf;case 35667:case 35671:return Of;case 35668:case 35672:return Vf;case 35669:case 35673:return zf;case 5125:return Bf;case 36294:return kf;case 36295:return Wf;case 36296:return Hf;case 35678:case 36198:case 36298:case 36306:case 35682:return Gf;case 35679:case 36299:case 36307:return qf;case 35680:case 36300:case 36308:case 36293:return Xf;case 36289:case 36303:case 36311:case 36292:return Kf}}function Yf(i,e){i.uniform1fv(this.addr,e)}function jf(i,e){const t=Ri(e,this.size,2);i.uniform2fv(this.addr,t)}function Jf(i,e){const t=Ri(e,this.size,3);i.uniform3fv(this.addr,t)}function Qf(i,e){const t=Ri(e,this.size,4);i.uniform4fv(this.addr,t)}function $f(i,e){const t=Ri(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ep(i,e){const t=Ri(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function tp(i,e){const t=Ri(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function np(i,e){i.uniform1iv(this.addr,e)}function ip(i,e){i.uniform2iv(this.addr,e)}function rp(i,e){i.uniform3iv(this.addr,e)}function sp(i,e){i.uniform4iv(this.addr,e)}function ap(i,e){i.uniform1uiv(this.addr,e)}function op(i,e){i.uniform2uiv(this.addr,e)}function lp(i,e){i.uniform3uiv(this.addr,e)}function cp(i,e){i.uniform4uiv(this.addr,e)}function up(i,e,t){const n=this.cache,r=e.length,s=Br(t,r);dt(n,s)||(i.uniform1iv(this.addr,s),ft(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||gl,s[a])}function hp(i,e,t){const n=this.cache,r=e.length,s=Br(t,r);dt(n,s)||(i.uniform1iv(this.addr,s),ft(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||xl,s[a])}function dp(i,e,t){const n=this.cache,r=e.length,s=Br(t,r);dt(n,s)||(i.uniform1iv(this.addr,s),ft(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||_l,s[a])}function fp(i,e,t){const n=this.cache,r=e.length,s=Br(t,r);dt(n,s)||(i.uniform1iv(this.addr,s),ft(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||vl,s[a])}function pp(i){switch(i){case 5126:return Yf;case 35664:return jf;case 35665:return Jf;case 35666:return Qf;case 35674:return $f;case 35675:return ep;case 35676:return tp;case 5124:case 35670:return np;case 35667:case 35671:return ip;case 35668:case 35672:return rp;case 35669:case 35673:return sp;case 5125:return ap;case 36294:return op;case 36295:return lp;case 36296:return cp;case 35678:case 36198:case 36298:case 36306:case 35682:return up;case 35679:case 36299:case 36307:return hp;case 35680:case 36300:case 36308:case 36293:return dp;case 36289:case 36303:case 36311:case 36292:return fp}}class mp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Zf(t.type)}}class gp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pp(t.type)}}class vp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const _s=/(\w+)(\])?(\[|\.)?/g;function bo(i,e){i.seq.push(e),i.map[e.id]=e}function xp(i,e,t){const n=i.name,r=n.length;for(_s.lastIndex=0;;){const s=_s.exec(n),a=_s.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){bo(t,c===void 0?new mp(o,i,e):new gp(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new vp(o),bo(t,d)),t=d}}}class Ur{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);xp(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Ao(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const _p=37297;let Sp=0;function Mp(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const wo=new Pe;function Ep(i){We._getMatrix(wo,We.workingColorSpace,i);const e=`mat3( ${wo.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(i)){case Nr:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ro(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Mp(i.getShaderSource(e),a)}else return r}function yp(i,e){const t=Ep(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Tp(i,e){let t;switch(e){case Tc:t="Linear";break;case bc:t="Reinhard";break;case Ac:t="Cineon";break;case wc:t="ACESFilmic";break;case Cc:t="AgX";break;case Pc:t="Neutral";break;case Rc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Tr=new V;function bp(){We.getLuminanceCoefficients(Tr);const i=Tr.x.toFixed(4),e=Tr.y.toFixed(4),t=Tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ap(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Oi).join(`
`)}function wp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Rp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Oi(i){return i!==""}function Co(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Po(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Cp=/^[ \t]*#include +<([\w\d./]+)>/gm;function ha(i){return i.replace(Cp,Up)}const Pp=new Map;function Up(i,e){let t=Le[e];if(t===void 0){const n=Pp.get(e);if(n!==void 0)t=Le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ha(t)}const Lp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uo(i){return i.replace(Lp,Dp)}function Dp(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Lo(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ip(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Wo?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ic?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===an&&(e="SHADOWMAP_TYPE_VSM"),e}function Fp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Si:case Mi:e="ENVMAP_TYPE_CUBE";break;case Vr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Np(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Mi:e="ENVMAP_MODE_REFRACTION";break}return e}function Op(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ho:e="ENVMAP_BLENDING_MULTIPLY";break;case Ec:e="ENVMAP_BLENDING_MIX";break;case yc:e="ENVMAP_BLENDING_ADD";break}return e}function Vp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function zp(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Ip(t),c=Fp(t),h=Np(t),d=Op(t),f=Vp(t),m=Ap(t),x=wp(s),S=r.createProgram();let p,u,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Oi).join(`
`),p.length>0&&(p+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Oi).join(`
`),u.length>0&&(u+=`
`)):(p=[Lo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oi).join(`
`),u=[Lo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?Le.tonemapping_pars_fragment:"",t.toneMapping!==An?Tp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Le.colorspace_pars_fragment,yp("linearToOutputTexel",t.outputColorSpace),bp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Oi).join(`
`)),a=ha(a),a=Co(a,t),a=Po(a,t),o=ha(o),o=Co(o,t),o=Po(o,t),a=Uo(a),o=Uo(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",t.glslVersion===ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const T=b+p+a,y=b+u+o,D=Ao(r,r.VERTEX_SHADER,T),U=Ao(r,r.FRAGMENT_SHADER,y);r.attachShader(S,D),r.attachShader(S,U),t.index0AttributeName!==void 0?r.bindAttribLocation(S,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function w(R){if(i.debug.checkShaderErrors){const H=r.getProgramInfoLog(S).trim(),z=r.getShaderInfoLog(D).trim(),Z=r.getShaderInfoLog(U).trim();let Y=!0,q=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,S,D,U);else{const J=Ro(r,D,"vertex"),k=Ro(r,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+H+`
`+J+`
`+k)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(z===""||Z==="")&&(q=!1);q&&(R.diagnostics={runnable:Y,programLog:H,vertexShader:{log:z,prefix:p},fragmentShader:{log:Z,prefix:u}})}r.deleteShader(D),r.deleteShader(U),I=new Ur(r,S),M=Rp(r,S)}let I;this.getUniforms=function(){return I===void 0&&w(this),I};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(S,_p)),_},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sp++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=D,this.fragmentShader=U,this}let Bp=0;class kp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Wp(e),t.set(e,n)),n}}class Wp{constructor(e){this.id=Bp++,this.code=e,this.usedTimes=0}}function Hp(i,e,t,n,r,s,a){const o=new Ea,l=new kp,c=new Set,h=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(M){return c.add(M),M===0?"uv":`uv${M}`}function p(M,_,R,H,z){const Z=H.fog,Y=z.geometry,q=M.isMeshStandardMaterial?H.environment:null,J=(M.isMeshStandardMaterial?t:e).get(M.envMap||q),k=J&&J.mapping===Vr?J.image.height:null,se=x[M.type];M.precision!==null&&(m=r.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const he=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,_e=he!==void 0?he.length:0;let De=0;Y.morphAttributes.position!==void 0&&(De=1),Y.morphAttributes.normal!==void 0&&(De=2),Y.morphAttributes.color!==void 0&&(De=3);let je,G,te,ge;if(se){const Xe=Zt[se];je=Xe.vertexShader,G=Xe.fragmentShader}else je=M.vertexShader,G=M.fragmentShader,l.update(M),te=l.getVertexShaderID(M),ge=l.getFragmentShaderID(M);const ae=i.getRenderTarget(),Te=i.state.buffers.depth.getReversed(),He=z.isInstancedMesh===!0,be=z.isBatchedMesh===!0,ot=!!M.map,nt=!!M.matcap,Fe=!!J,A=!!M.aoMap,Pt=!!M.lightMap,Ne=!!M.bumpMap,Oe=!!M.normalMap,Se=!!M.displacementMap,et=!!M.emissiveMap,xe=!!M.metalnessMap,E=!!M.roughnessMap,g=M.anisotropy>0,F=M.clearcoat>0,X=M.dispersion>0,j=M.iridescence>0,W=M.sheen>0,ve=M.transmission>0,oe=g&&!!M.anisotropyMap,de=F&&!!M.clearcoatMap,ze=F&&!!M.clearcoatNormalMap,$=F&&!!M.clearcoatRoughnessMap,fe=j&&!!M.iridescenceMap,ye=j&&!!M.iridescenceThicknessMap,Ae=W&&!!M.sheenColorMap,pe=W&&!!M.sheenRoughnessMap,Ve=!!M.specularMap,Ue=!!M.specularColorMap,Qe=!!M.specularIntensityMap,C=ve&&!!M.transmissionMap,ie=ve&&!!M.thicknessMap,B=!!M.gradientMap,K=!!M.alphaMap,ce=M.alphaTest>0,le=!!M.alphaHash,Ce=!!M.extensions;let it=An;M.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(it=i.toneMapping);const gt={shaderID:se,shaderType:M.type,shaderName:M.name,vertexShader:je,fragmentShader:G,defines:M.defines,customVertexShaderID:te,customFragmentShaderID:ge,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:be,batchingColor:be&&z._colorsTexture!==null,instancing:He,instancingColor:He&&z.instanceColor!==null,instancingMorph:He&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Ti,alphaToCoverage:!!M.alphaToCoverage,map:ot,matcap:nt,envMap:Fe,envMapMode:Fe&&J.mapping,envMapCubeUVHeight:k,aoMap:A,lightMap:Pt,bumpMap:Ne,normalMap:Oe,displacementMap:f&&Se,emissiveMap:et,normalMapObjectSpace:Oe&&M.normalMapType===Fc,normalMapTangentSpace:Oe&&M.normalMapType===Ic,metalnessMap:xe,roughnessMap:E,anisotropy:g,anisotropyMap:oe,clearcoat:F,clearcoatMap:de,clearcoatNormalMap:ze,clearcoatRoughnessMap:$,dispersion:X,iridescence:j,iridescenceMap:fe,iridescenceThicknessMap:ye,sheen:W,sheenColorMap:Ae,sheenRoughnessMap:pe,specularMap:Ve,specularColorMap:Ue,specularIntensityMap:Qe,transmission:ve,transmissionMap:C,thicknessMap:ie,gradientMap:B,opaque:M.transparent===!1&&M.blending===pi&&M.alphaToCoverage===!1,alphaMap:K,alphaTest:ce,alphaHash:le,combine:M.combine,mapUv:ot&&S(M.map.channel),aoMapUv:A&&S(M.aoMap.channel),lightMapUv:Pt&&S(M.lightMap.channel),bumpMapUv:Ne&&S(M.bumpMap.channel),normalMapUv:Oe&&S(M.normalMap.channel),displacementMapUv:Se&&S(M.displacementMap.channel),emissiveMapUv:et&&S(M.emissiveMap.channel),metalnessMapUv:xe&&S(M.metalnessMap.channel),roughnessMapUv:E&&S(M.roughnessMap.channel),anisotropyMapUv:oe&&S(M.anisotropyMap.channel),clearcoatMapUv:de&&S(M.clearcoatMap.channel),clearcoatNormalMapUv:ze&&S(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&S(M.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&S(M.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&S(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&S(M.sheenColorMap.channel),sheenRoughnessMapUv:pe&&S(M.sheenRoughnessMap.channel),specularMapUv:Ve&&S(M.specularMap.channel),specularColorMapUv:Ue&&S(M.specularColorMap.channel),specularIntensityMapUv:Qe&&S(M.specularIntensityMap.channel),transmissionMapUv:C&&S(M.transmissionMap.channel),thicknessMapUv:ie&&S(M.thicknessMap.channel),alphaMapUv:K&&S(M.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Oe||g),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Y.attributes.uv&&(ot||K),fog:!!Z,useFog:M.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Te,skinning:z.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:De,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:it,decodeVideoTexture:ot&&M.map.isVideoTexture===!0&&We.getTransfer(M.map.colorSpace)===Ze,decodeVideoTextureEmissive:et&&M.emissiveMap.isVideoTexture===!0&&We.getTransfer(M.emissiveMap.colorSpace)===Ze,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===un,flipSided:M.side===Tt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ce&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&M.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return gt.vertexUv1s=c.has(1),gt.vertexUv2s=c.has(2),gt.vertexUv3s=c.has(3),c.clear(),gt}function u(M){const _=[];if(M.shaderID?_.push(M.shaderID):(_.push(M.customVertexShaderID),_.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)_.push(R),_.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(b(_,M),T(_,M),_.push(i.outputColorSpace)),_.push(M.customProgramCacheKey),_.join()}function b(M,_){M.push(_.precision),M.push(_.outputColorSpace),M.push(_.envMapMode),M.push(_.envMapCubeUVHeight),M.push(_.mapUv),M.push(_.alphaMapUv),M.push(_.lightMapUv),M.push(_.aoMapUv),M.push(_.bumpMapUv),M.push(_.normalMapUv),M.push(_.displacementMapUv),M.push(_.emissiveMapUv),M.push(_.metalnessMapUv),M.push(_.roughnessMapUv),M.push(_.anisotropyMapUv),M.push(_.clearcoatMapUv),M.push(_.clearcoatNormalMapUv),M.push(_.clearcoatRoughnessMapUv),M.push(_.iridescenceMapUv),M.push(_.iridescenceThicknessMapUv),M.push(_.sheenColorMapUv),M.push(_.sheenRoughnessMapUv),M.push(_.specularMapUv),M.push(_.specularColorMapUv),M.push(_.specularIntensityMapUv),M.push(_.transmissionMapUv),M.push(_.thicknessMapUv),M.push(_.combine),M.push(_.fogExp2),M.push(_.sizeAttenuation),M.push(_.morphTargetsCount),M.push(_.morphAttributeCount),M.push(_.numDirLights),M.push(_.numPointLights),M.push(_.numSpotLights),M.push(_.numSpotLightMaps),M.push(_.numHemiLights),M.push(_.numRectAreaLights),M.push(_.numDirLightShadows),M.push(_.numPointLightShadows),M.push(_.numSpotLightShadows),M.push(_.numSpotLightShadowsWithMaps),M.push(_.numLightProbes),M.push(_.shadowMapType),M.push(_.toneMapping),M.push(_.numClippingPlanes),M.push(_.numClipIntersection),M.push(_.depthPacking)}function T(M,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reverseDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),M.push(o.mask)}function y(M){const _=x[M.type];let R;if(_){const H=Zt[_];R=du.clone(H.uniforms)}else R=M.uniforms;return R}function D(M,_){let R;for(let H=0,z=h.length;H<z;H++){const Z=h[H];if(Z.cacheKey===_){R=Z,++R.usedTimes;break}}return R===void 0&&(R=new zp(i,_,M,s),h.push(R)),R}function U(M){if(--M.usedTimes===0){const _=h.indexOf(M);h[_]=h[h.length-1],h.pop(),M.destroy()}}function w(M){l.remove(M)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:y,acquireProgram:D,releaseProgram:U,releaseShaderCache:w,programs:h,dispose:I}}function Gp(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function qp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Do(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Io(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d,f,m,x,S,p){let u=i[e];return u===void 0?(u={id:d.id,object:d,geometry:f,material:m,groupOrder:x,renderOrder:d.renderOrder,z:S,group:p},i[e]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=m,u.groupOrder=x,u.renderOrder=d.renderOrder,u.z=S,u.group=p),e++,u}function o(d,f,m,x,S,p){const u=a(d,f,m,x,S,p);m.transmission>0?n.push(u):m.transparent===!0?r.push(u):t.push(u)}function l(d,f,m,x,S,p){const u=a(d,f,m,x,S,p);m.transmission>0?n.unshift(u):m.transparent===!0?r.unshift(u):t.unshift(u)}function c(d,f){t.length>1&&t.sort(d||qp),n.length>1&&n.sort(f||Do),r.length>1&&r.sort(f||Do)}function h(){for(let d=e,f=i.length;d<f;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:h,sort:c}}function Xp(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Io,i.set(n,[a])):r>=s.length?(a=new Io,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Kp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new Ke};break;case"SpotLight":t={position:new V,direction:new V,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new V,halfWidth:new V,halfHeight:new V};break}return i[e.id]=t,t}}}function Zp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Yp=0;function jp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Jp(i){const e=new Kp,t=Zp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new V);const r=new V,s=new at,a=new at;function o(c){let h=0,d=0,f=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let m=0,x=0,S=0,p=0,u=0,b=0,T=0,y=0,D=0,U=0,w=0;c.sort(jp);for(let M=0,_=c.length;M<_;M++){const R=c[M],H=R.color,z=R.intensity,Z=R.distance,Y=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=H.r*z,d+=H.g*z,f+=H.b*z;else if(R.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(R.sh.coefficients[q],z);w++}else if(R.isDirectionalLight){const q=e.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const J=R.shadow,k=t.get(R);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,n.directionalShadow[m]=k,n.directionalShadowMap[m]=Y,n.directionalShadowMatrix[m]=R.shadow.matrix,b++}n.directional[m]=q,m++}else if(R.isSpotLight){const q=e.get(R);q.position.setFromMatrixPosition(R.matrixWorld),q.color.copy(H).multiplyScalar(z),q.distance=Z,q.coneCos=Math.cos(R.angle),q.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),q.decay=R.decay,n.spot[S]=q;const J=R.shadow;if(R.map&&(n.spotLightMap[D]=R.map,D++,J.updateMatrices(R),R.castShadow&&U++),n.spotLightMatrix[S]=J.matrix,R.castShadow){const k=t.get(R);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,n.spotShadow[S]=k,n.spotShadowMap[S]=Y,y++}S++}else if(R.isRectAreaLight){const q=e.get(R);q.color.copy(H).multiplyScalar(z),q.halfWidth.set(R.width*.5,0,0),q.halfHeight.set(0,R.height*.5,0),n.rectArea[p]=q,p++}else if(R.isPointLight){const q=e.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),q.distance=R.distance,q.decay=R.decay,R.castShadow){const J=R.shadow,k=t.get(R);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,k.shadowCameraNear=J.camera.near,k.shadowCameraFar=J.camera.far,n.pointShadow[x]=k,n.pointShadowMap[x]=Y,n.pointShadowMatrix[x]=R.shadow.matrix,T++}n.point[x]=q,x++}else if(R.isHemisphereLight){const q=e.get(R);q.skyColor.copy(R.color).multiplyScalar(z),q.groundColor.copy(R.groundColor).multiplyScalar(z),n.hemi[u]=q,u++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ne.LTC_FLOAT_1,n.rectAreaLTC2=ne.LTC_FLOAT_2):(n.rectAreaLTC1=ne.LTC_HALF_1,n.rectAreaLTC2=ne.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==m||I.pointLength!==x||I.spotLength!==S||I.rectAreaLength!==p||I.hemiLength!==u||I.numDirectionalShadows!==b||I.numPointShadows!==T||I.numSpotShadows!==y||I.numSpotMaps!==D||I.numLightProbes!==w)&&(n.directional.length=m,n.spot.length=S,n.rectArea.length=p,n.point.length=x,n.hemi.length=u,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=y+D-U,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=U,n.numLightProbes=w,I.directionalLength=m,I.pointLength=x,I.spotLength=S,I.rectAreaLength=p,I.hemiLength=u,I.numDirectionalShadows=b,I.numPointShadows=T,I.numSpotShadows=y,I.numSpotMaps=D,I.numLightProbes=w,n.version=Yp++)}function l(c,h){let d=0,f=0,m=0,x=0,S=0;const p=h.matrixWorldInverse;for(let u=0,b=c.length;u<b;u++){const T=c[u];if(T.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),d++}else if(T.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),m++}else if(T.isRectAreaLight){const y=n.rectArea[x];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),a.identity(),s.copy(T.matrixWorld),s.premultiply(p),a.extractRotation(s),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),x++}else if(T.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),f++}else if(T.isHemisphereLight){const y=n.hemi[S];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(p),S++}}}return{setup:o,setupView:l,state:n}}function Fo(i){const e=new Jp(i),t=[],n=[];function r(h){c.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Qp(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Fo(i),e.set(r,[o])):s>=a.length?(o=new Fo(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const $p=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,em=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function tm(i,e,t){let n=new hl;const r=new Ye,s=new Ye,a=new ct,o=new Tu({depthPacking:Dc}),l=new bu,c={},h=t.maxTextureSize,d={[wn]:Tt,[Tt]:wn,[un]:un},f=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:$p,fragmentShader:em}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const x=new Rn;x.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Jt(x,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wo;let u=this.type;this.render=function(U,w,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||U.length===0)return;const M=i.getRenderTarget(),_=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),H=i.state;H.setBlending(bn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const z=u!==an&&this.type===an,Z=u===an&&this.type!==an;for(let Y=0,q=U.length;Y<q;Y++){const J=U[Y],k=J.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const se=k.getFrameExtents();if(r.multiply(se),s.copy(k.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/se.x),r.x=s.x*se.x,k.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/se.y),r.y=s.y*se.y,k.mapSize.y=s.y)),k.map===null||z===!0||Z===!0){const _e=this.type!==an?{minFilter:Xt,magFilter:Xt}:{};k.map!==null&&k.map.dispose(),k.map=new Kn(r.x,r.y,_e),k.map.texture.name=J.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const he=k.getViewportCount();for(let _e=0;_e<he;_e++){const De=k.getViewport(_e);a.set(s.x*De.x,s.y*De.y,s.x*De.z,s.y*De.w),H.viewport(a),k.updateMatrices(J,_e),n=k.getFrustum(),y(w,I,k.camera,J,this.type)}k.isPointLightShadow!==!0&&this.type===an&&b(k,I),k.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(M,_,R)};function b(U,w){const I=e.update(S);f.defines.VSM_SAMPLES!==U.blurSamples&&(f.defines.VSM_SAMPLES=U.blurSamples,m.defines.VSM_SAMPLES=U.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new Kn(r.x,r.y)),f.uniforms.shadow_pass.value=U.map.texture,f.uniforms.resolution.value=U.mapSize,f.uniforms.radius.value=U.radius,i.setRenderTarget(U.mapPass),i.clear(),i.renderBufferDirect(w,null,I,f,S,null),m.uniforms.shadow_pass.value=U.mapPass.texture,m.uniforms.resolution.value=U.mapSize,m.uniforms.radius.value=U.radius,i.setRenderTarget(U.map),i.clear(),i.renderBufferDirect(w,null,I,m,S,null)}function T(U,w,I,M){let _=null;const R=I.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(R!==void 0)_=R;else if(_=I.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const H=_.uuid,z=w.uuid;let Z=c[H];Z===void 0&&(Z={},c[H]=Z);let Y=Z[z];Y===void 0&&(Y=_.clone(),Z[z]=Y,w.addEventListener("dispose",D)),_=Y}if(_.visible=w.visible,_.wireframe=w.wireframe,M===an?_.side=w.shadowSide!==null?w.shadowSide:w.side:_.side=w.shadowSide!==null?w.shadowSide:d[w.side],_.alphaMap=w.alphaMap,_.alphaTest=w.alphaTest,_.map=w.map,_.clipShadows=w.clipShadows,_.clippingPlanes=w.clippingPlanes,_.clipIntersection=w.clipIntersection,_.displacementMap=w.displacementMap,_.displacementScale=w.displacementScale,_.displacementBias=w.displacementBias,_.wireframeLinewidth=w.wireframeLinewidth,_.linewidth=w.linewidth,I.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const H=i.properties.get(_);H.light=I}return _}function y(U,w,I,M,_){if(U.visible===!1)return;if(U.layers.test(w.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&_===an)&&(!U.frustumCulled||n.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,U.matrixWorld);const z=e.update(U),Z=U.material;if(Array.isArray(Z)){const Y=z.groups;for(let q=0,J=Y.length;q<J;q++){const k=Y[q],se=Z[k.materialIndex];if(se&&se.visible){const he=T(U,se,M,_);U.onBeforeShadow(i,U,w,I,z,he,k),i.renderBufferDirect(I,null,z,he,U,k),U.onAfterShadow(i,U,w,I,z,he,k)}}}else if(Z.visible){const Y=T(U,Z,M,_);U.onBeforeShadow(i,U,w,I,z,Y,null),i.renderBufferDirect(I,null,z,Y,U,null),U.onAfterShadow(i,U,w,I,z,Y,null)}}const H=U.children;for(let z=0,Z=H.length;z<Z;z++)y(H[z],w,I,M,_)}function D(U){U.target.removeEventListener("dispose",D);for(const I in c){const M=c[I],_=U.target.uuid;_ in M&&(M[_].dispose(),delete M[_])}}}const nm={[As]:ws,[Rs]:Us,[Cs]:Ls,[_i]:Ps,[ws]:As,[Us]:Rs,[Ls]:Cs,[Ps]:_i};function im(i,e){function t(){let C=!1;const ie=new ct;let B=null;const K=new ct(0,0,0,0);return{setMask:function(ce){B!==ce&&!C&&(i.colorMask(ce,ce,ce,ce),B=ce)},setLocked:function(ce){C=ce},setClear:function(ce,le,Ce,it,gt){gt===!0&&(ce*=it,le*=it,Ce*=it),ie.set(ce,le,Ce,it),K.equals(ie)===!1&&(i.clearColor(ce,le,Ce,it),K.copy(ie))},reset:function(){C=!1,B=null,K.set(-1,0,0,0)}}}function n(){let C=!1,ie=!1,B=null,K=null,ce=null;return{setReversed:function(le){if(ie!==le){const Ce=e.get("EXT_clip_control");ie?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT);const it=ce;ce=null,this.setClear(it)}ie=le},getReversed:function(){return ie},setTest:function(le){le?ae(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(le){B!==le&&!C&&(i.depthMask(le),B=le)},setFunc:function(le){if(ie&&(le=nm[le]),K!==le){switch(le){case As:i.depthFunc(i.NEVER);break;case ws:i.depthFunc(i.ALWAYS);break;case Rs:i.depthFunc(i.LESS);break;case _i:i.depthFunc(i.LEQUAL);break;case Cs:i.depthFunc(i.EQUAL);break;case Ps:i.depthFunc(i.GEQUAL);break;case Us:i.depthFunc(i.GREATER);break;case Ls:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=le}},setLocked:function(le){C=le},setClear:function(le){ce!==le&&(ie&&(le=1-le),i.clearDepth(le),ce=le)},reset:function(){C=!1,B=null,K=null,ce=null,ie=!1}}}function r(){let C=!1,ie=null,B=null,K=null,ce=null,le=null,Ce=null,it=null,gt=null;return{setTest:function(Xe){C||(Xe?ae(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(Xe){ie!==Xe&&!C&&(i.stencilMask(Xe),ie=Xe)},setFunc:function(Xe,Ot,$t){(B!==Xe||K!==Ot||ce!==$t)&&(i.stencilFunc(Xe,Ot,$t),B=Xe,K=Ot,ce=$t)},setOp:function(Xe,Ot,$t){(le!==Xe||Ce!==Ot||it!==$t)&&(i.stencilOp(Xe,Ot,$t),le=Xe,Ce=Ot,it=$t)},setLocked:function(Xe){C=Xe},setClear:function(Xe){gt!==Xe&&(i.clearStencil(Xe),gt=Xe)},reset:function(){C=!1,ie=null,B=null,K=null,ce=null,le=null,Ce=null,it=null,gt=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let h={},d={},f=new WeakMap,m=[],x=null,S=!1,p=null,u=null,b=null,T=null,y=null,D=null,U=null,w=new Ke(0,0,0),I=0,M=!1,_=null,R=null,H=null,z=null,Z=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,J=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(k)[1]),q=J>=1):k.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),q=J>=2);let se=null,he={};const _e=i.getParameter(i.SCISSOR_BOX),De=i.getParameter(i.VIEWPORT),je=new ct().fromArray(_e),G=new ct().fromArray(De);function te(C,ie,B,K){const ce=new Uint8Array(4),le=i.createTexture();i.bindTexture(C,le),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ce=0;Ce<B;Ce++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(ie,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,ce):i.texImage2D(ie+Ce,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ce);return le}const ge={};ge[i.TEXTURE_2D]=te(i.TEXTURE_2D,i.TEXTURE_2D,1),ge[i.TEXTURE_CUBE_MAP]=te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[i.TEXTURE_2D_ARRAY]=te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ge[i.TEXTURE_3D]=te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ae(i.DEPTH_TEST),a.setFunc(_i),Ne(!1),Oe(Fa),ae(i.CULL_FACE),A(bn);function ae(C){h[C]!==!0&&(i.enable(C),h[C]=!0)}function Te(C){h[C]!==!1&&(i.disable(C),h[C]=!1)}function He(C,ie){return d[C]!==ie?(i.bindFramebuffer(C,ie),d[C]=ie,C===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ie),C===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ie),!0):!1}function be(C,ie){let B=m,K=!1;if(C){B=f.get(ie),B===void 0&&(B=[],f.set(ie,B));const ce=C.textures;if(B.length!==ce.length||B[0]!==i.COLOR_ATTACHMENT0){for(let le=0,Ce=ce.length;le<Ce;le++)B[le]=i.COLOR_ATTACHMENT0+le;B.length=ce.length,K=!0}}else B[0]!==i.BACK&&(B[0]=i.BACK,K=!0);K&&i.drawBuffers(B)}function ot(C){return x!==C?(i.useProgram(C),x=C,!0):!1}const nt={[kn]:i.FUNC_ADD,[sc]:i.FUNC_SUBTRACT,[ac]:i.FUNC_REVERSE_SUBTRACT};nt[oc]=i.MIN,nt[lc]=i.MAX;const Fe={[cc]:i.ZERO,[uc]:i.ONE,[hc]:i.SRC_COLOR,[Ts]:i.SRC_ALPHA,[vc]:i.SRC_ALPHA_SATURATE,[mc]:i.DST_COLOR,[fc]:i.DST_ALPHA,[dc]:i.ONE_MINUS_SRC_COLOR,[bs]:i.ONE_MINUS_SRC_ALPHA,[gc]:i.ONE_MINUS_DST_COLOR,[pc]:i.ONE_MINUS_DST_ALPHA,[xc]:i.CONSTANT_COLOR,[_c]:i.ONE_MINUS_CONSTANT_COLOR,[Sc]:i.CONSTANT_ALPHA,[Mc]:i.ONE_MINUS_CONSTANT_ALPHA};function A(C,ie,B,K,ce,le,Ce,it,gt,Xe){if(C===bn){S===!0&&(Te(i.BLEND),S=!1);return}if(S===!1&&(ae(i.BLEND),S=!0),C!==rc){if(C!==p||Xe!==M){if((u!==kn||y!==kn)&&(i.blendEquation(i.FUNC_ADD),u=kn,y=kn),Xe)switch(C){case pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Na:i.blendFunc(i.ONE,i.ONE);break;case Oa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Va:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Na:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Oa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Va:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}b=null,T=null,D=null,U=null,w.set(0,0,0),I=0,p=C,M=Xe}return}ce=ce||ie,le=le||B,Ce=Ce||K,(ie!==u||ce!==y)&&(i.blendEquationSeparate(nt[ie],nt[ce]),u=ie,y=ce),(B!==b||K!==T||le!==D||Ce!==U)&&(i.blendFuncSeparate(Fe[B],Fe[K],Fe[le],Fe[Ce]),b=B,T=K,D=le,U=Ce),(it.equals(w)===!1||gt!==I)&&(i.blendColor(it.r,it.g,it.b,gt),w.copy(it),I=gt),p=C,M=!1}function Pt(C,ie){C.side===un?Te(i.CULL_FACE):ae(i.CULL_FACE);let B=C.side===Tt;ie&&(B=!B),Ne(B),C.blending===pi&&C.transparent===!1?A(bn):A(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),s.setMask(C.colorWrite);const K=C.stencilWrite;o.setTest(K),K&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),et(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(C){_!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),_=C)}function Oe(C){C!==tc?(ae(i.CULL_FACE),C!==R&&(C===Fa?i.cullFace(i.BACK):C===nc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),R=C}function Se(C){C!==H&&(q&&i.lineWidth(C),H=C)}function et(C,ie,B){C?(ae(i.POLYGON_OFFSET_FILL),(z!==ie||Z!==B)&&(i.polygonOffset(ie,B),z=ie,Z=B)):Te(i.POLYGON_OFFSET_FILL)}function xe(C){C?ae(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function E(C){C===void 0&&(C=i.TEXTURE0+Y-1),se!==C&&(i.activeTexture(C),se=C)}function g(C,ie,B){B===void 0&&(se===null?B=i.TEXTURE0+Y-1:B=se);let K=he[B];K===void 0&&(K={type:void 0,texture:void 0},he[B]=K),(K.type!==C||K.texture!==ie)&&(se!==B&&(i.activeTexture(B),se=B),i.bindTexture(C,ie||ge[C]),K.type=C,K.texture=ie)}function F(){const C=he[se];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function X(){try{i.compressedTexImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function j(){try{i.compressedTexImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function W(){try{i.texSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ve(){try{i.texSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function oe(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function de(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ze(){try{i.texStorage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function $(){try{i.texStorage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function fe(){try{i.texImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ye(){try{i.texImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ae(C){je.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),je.copy(C))}function pe(C){G.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),G.copy(C))}function Ve(C,ie){let B=c.get(ie);B===void 0&&(B=new WeakMap,c.set(ie,B));let K=B.get(C);K===void 0&&(K=i.getUniformBlockIndex(ie,C.name),B.set(C,K))}function Ue(C,ie){const K=c.get(ie).get(C);l.get(ie)!==K&&(i.uniformBlockBinding(ie,K,C.__bindingPointIndex),l.set(ie,K))}function Qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},se=null,he={},d={},f=new WeakMap,m=[],x=null,S=!1,p=null,u=null,b=null,T=null,y=null,D=null,U=null,w=new Ke(0,0,0),I=0,M=!1,_=null,R=null,H=null,z=null,Z=null,je.set(0,0,i.canvas.width,i.canvas.height),G.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ae,disable:Te,bindFramebuffer:He,drawBuffers:be,useProgram:ot,setBlending:A,setMaterial:Pt,setFlipSided:Ne,setCullFace:Oe,setLineWidth:Se,setPolygonOffset:et,setScissorTest:xe,activeTexture:E,bindTexture:g,unbindTexture:F,compressedTexImage2D:X,compressedTexImage3D:j,texImage2D:fe,texImage3D:ye,updateUBOMapping:Ve,uniformBlockBinding:Ue,texStorage2D:ze,texStorage3D:$,texSubImage2D:W,texSubImage3D:ve,compressedTexSubImage2D:oe,compressedTexSubImage3D:de,scissor:Ae,viewport:pe,reset:Qe}}function rm(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ye,h=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(E,g){return m?new OffscreenCanvas(E,g):Xi("canvas")}function S(E,g,F){let X=1;const j=xe(E);if((j.width>F||j.height>F)&&(X=F/Math.max(j.width,j.height)),X<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const W=Math.floor(X*j.width),ve=Math.floor(X*j.height);d===void 0&&(d=x(W,ve));const oe=g?x(W,ve):d;return oe.width=W,oe.height=ve,oe.getContext("2d").drawImage(E,0,0,W,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+W+"x"+ve+")."),oe}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),E;return E}function p(E){return E.generateMipmaps}function u(E){i.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(E,g,F,X,j=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let W=g;if(g===i.RED&&(F===i.FLOAT&&(W=i.R32F),F===i.HALF_FLOAT&&(W=i.R16F),F===i.UNSIGNED_BYTE&&(W=i.R8)),g===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.R8UI),F===i.UNSIGNED_SHORT&&(W=i.R16UI),F===i.UNSIGNED_INT&&(W=i.R32UI),F===i.BYTE&&(W=i.R8I),F===i.SHORT&&(W=i.R16I),F===i.INT&&(W=i.R32I)),g===i.RG&&(F===i.FLOAT&&(W=i.RG32F),F===i.HALF_FLOAT&&(W=i.RG16F),F===i.UNSIGNED_BYTE&&(W=i.RG8)),g===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RG8UI),F===i.UNSIGNED_SHORT&&(W=i.RG16UI),F===i.UNSIGNED_INT&&(W=i.RG32UI),F===i.BYTE&&(W=i.RG8I),F===i.SHORT&&(W=i.RG16I),F===i.INT&&(W=i.RG32I)),g===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RGB8UI),F===i.UNSIGNED_SHORT&&(W=i.RGB16UI),F===i.UNSIGNED_INT&&(W=i.RGB32UI),F===i.BYTE&&(W=i.RGB8I),F===i.SHORT&&(W=i.RGB16I),F===i.INT&&(W=i.RGB32I)),g===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),F===i.UNSIGNED_INT&&(W=i.RGBA32UI),F===i.BYTE&&(W=i.RGBA8I),F===i.SHORT&&(W=i.RGBA16I),F===i.INT&&(W=i.RGBA32I)),g===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),g===i.RGBA){const ve=j?Nr:We.getTransfer(X);F===i.FLOAT&&(W=i.RGBA32F),F===i.HALF_FLOAT&&(W=i.RGBA16F),F===i.UNSIGNED_BYTE&&(W=ve===Ze?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function y(E,g){let F;return E?g===null||g===Xn||g===Ei?F=i.DEPTH24_STENCIL8:g===hn?F=i.DEPTH32F_STENCIL8:g===qi&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Xn||g===Ei?F=i.DEPTH_COMPONENT24:g===hn?F=i.DEPTH_COMPONENT32F:g===qi&&(F=i.DEPTH_COMPONENT16),F}function D(E,g){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==Xt&&E.minFilter!==jt?Math.log2(Math.max(g.width,g.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?g.mipmaps.length:1}function U(E){const g=E.target;g.removeEventListener("dispose",U),I(g),g.isVideoTexture&&h.delete(g)}function w(E){const g=E.target;g.removeEventListener("dispose",w),_(g)}function I(E){const g=n.get(E);if(g.__webglInit===void 0)return;const F=E.source,X=f.get(F);if(X){const j=X[g.__cacheKey];j.usedTimes--,j.usedTimes===0&&M(E),Object.keys(X).length===0&&f.delete(F)}n.remove(E)}function M(E){const g=n.get(E);i.deleteTexture(g.__webglTexture);const F=E.source,X=f.get(F);delete X[g.__cacheKey],a.memory.textures--}function _(E){const g=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(g.__webglFramebuffer[X]))for(let j=0;j<g.__webglFramebuffer[X].length;j++)i.deleteFramebuffer(g.__webglFramebuffer[X][j]);else i.deleteFramebuffer(g.__webglFramebuffer[X]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[X])}else{if(Array.isArray(g.__webglFramebuffer))for(let X=0;X<g.__webglFramebuffer.length;X++)i.deleteFramebuffer(g.__webglFramebuffer[X]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let X=0;X<g.__webglColorRenderbuffer.length;X++)g.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[X]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const F=E.textures;for(let X=0,j=F.length;X<j;X++){const W=n.get(F[X]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),a.memory.textures--),n.remove(F[X])}n.remove(E)}let R=0;function H(){R=0}function z(){const E=R;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),R+=1,E}function Z(E){const g=[];return g.push(E.wrapS),g.push(E.wrapT),g.push(E.wrapR||0),g.push(E.magFilter),g.push(E.minFilter),g.push(E.anisotropy),g.push(E.internalFormat),g.push(E.format),g.push(E.type),g.push(E.generateMipmaps),g.push(E.premultiplyAlpha),g.push(E.flipY),g.push(E.unpackAlignment),g.push(E.colorSpace),g.join()}function Y(E,g){const F=n.get(E);if(E.isVideoTexture&&Se(E),E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){const X=E.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(F,E,g);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+g)}function q(E,g){const F=n.get(E);if(E.version>0&&F.__version!==E.version){G(F,E,g);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+g)}function J(E,g){const F=n.get(E);if(E.version>0&&F.__version!==E.version){G(F,E,g);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+g)}function k(E,g){const F=n.get(E);if(E.version>0&&F.__version!==E.version){te(F,E,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+g)}const se={[Fr]:i.REPEAT,[Hn]:i.CLAMP_TO_EDGE,[Fs]:i.MIRRORED_REPEAT},he={[Xt]:i.NEAREST,[Uc]:i.NEAREST_MIPMAP_NEAREST,[tr]:i.NEAREST_MIPMAP_LINEAR,[jt]:i.LINEAR,[Gr]:i.LINEAR_MIPMAP_NEAREST,[Gn]:i.LINEAR_MIPMAP_LINEAR},_e={[Nc]:i.NEVER,[Wc]:i.ALWAYS,[Oc]:i.LESS,[tl]:i.LEQUAL,[Vc]:i.EQUAL,[kc]:i.GEQUAL,[zc]:i.GREATER,[Bc]:i.NOTEQUAL};function De(E,g){if(g.type===hn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===jt||g.magFilter===Gr||g.magFilter===tr||g.magFilter===Gn||g.minFilter===jt||g.minFilter===Gr||g.minFilter===tr||g.minFilter===Gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,se[g.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,se[g.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,se[g.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,he[g.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,he[g.minFilter]),g.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,_e[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Xt||g.minFilter!==tr&&g.minFilter!==Gn||g.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function je(E,g){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,g.addEventListener("dispose",U));const X=g.source;let j=f.get(X);j===void 0&&(j={},f.set(X,j));const W=Z(g);if(W!==E.__cacheKey){j[W]===void 0&&(j[W]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),j[W].usedTimes++;const ve=j[E.__cacheKey];ve!==void 0&&(j[E.__cacheKey].usedTimes--,ve.usedTimes===0&&M(g)),E.__cacheKey=W,E.__webglTexture=j[W].texture}return F}function G(E,g,F){let X=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(X=i.TEXTURE_3D);const j=je(E,g),W=g.source;t.bindTexture(X,E.__webglTexture,i.TEXTURE0+F);const ve=n.get(W);if(W.version!==ve.__version||j===!0){t.activeTexture(i.TEXTURE0+F);const oe=We.getPrimaries(We.workingColorSpace),de=g.colorSpace===Tn?null:We.getPrimaries(g.colorSpace),ze=g.colorSpace===Tn||oe===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let $=S(g.image,!1,r.maxTextureSize);$=et(g,$);const fe=s.convert(g.format,g.colorSpace),ye=s.convert(g.type);let Ae=T(g.internalFormat,fe,ye,g.colorSpace,g.isVideoTexture);De(X,g);let pe;const Ve=g.mipmaps,Ue=g.isVideoTexture!==!0,Qe=ve.__version===void 0||j===!0,C=W.dataReady,ie=D(g,$);if(g.isDepthTexture)Ae=y(g.format===yi,g.type),Qe&&(Ue?t.texStorage2D(i.TEXTURE_2D,1,Ae,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,Ae,$.width,$.height,0,fe,ye,null));else if(g.isDataTexture)if(Ve.length>0){Ue&&Qe&&t.texStorage2D(i.TEXTURE_2D,ie,Ae,Ve[0].width,Ve[0].height);for(let B=0,K=Ve.length;B<K;B++)pe=Ve[B],Ue?C&&t.texSubImage2D(i.TEXTURE_2D,B,0,0,pe.width,pe.height,fe,ye,pe.data):t.texImage2D(i.TEXTURE_2D,B,Ae,pe.width,pe.height,0,fe,ye,pe.data);g.generateMipmaps=!1}else Ue?(Qe&&t.texStorage2D(i.TEXTURE_2D,ie,Ae,$.width,$.height),C&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,$.width,$.height,fe,ye,$.data)):t.texImage2D(i.TEXTURE_2D,0,Ae,$.width,$.height,0,fe,ye,$.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Ue&&Qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ie,Ae,Ve[0].width,Ve[0].height,$.depth);for(let B=0,K=Ve.length;B<K;B++)if(pe=Ve[B],g.format!==qt)if(fe!==null)if(Ue){if(C)if(g.layerUpdates.size>0){const ce=uo(pe.width,pe.height,g.format,g.type);for(const le of g.layerUpdates){const Ce=pe.data.subarray(le*ce/pe.data.BYTES_PER_ELEMENT,(le+1)*ce/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,le,pe.width,pe.height,1,fe,Ce)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,0,pe.width,pe.height,$.depth,fe,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,B,Ae,pe.width,pe.height,$.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?C&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,0,pe.width,pe.height,$.depth,fe,ye,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,B,Ae,pe.width,pe.height,$.depth,0,fe,ye,pe.data)}else{Ue&&Qe&&t.texStorage2D(i.TEXTURE_2D,ie,Ae,Ve[0].width,Ve[0].height);for(let B=0,K=Ve.length;B<K;B++)pe=Ve[B],g.format!==qt?fe!==null?Ue?C&&t.compressedTexSubImage2D(i.TEXTURE_2D,B,0,0,pe.width,pe.height,fe,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,B,Ae,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?C&&t.texSubImage2D(i.TEXTURE_2D,B,0,0,pe.width,pe.height,fe,ye,pe.data):t.texImage2D(i.TEXTURE_2D,B,Ae,pe.width,pe.height,0,fe,ye,pe.data)}else if(g.isDataArrayTexture)if(Ue){if(Qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ie,Ae,$.width,$.height,$.depth),C)if(g.layerUpdates.size>0){const B=uo($.width,$.height,g.format,g.type);for(const K of g.layerUpdates){const ce=$.data.subarray(K*B/$.data.BYTES_PER_ELEMENT,(K+1)*B/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,$.width,$.height,1,fe,ye,ce)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,fe,ye,$.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,$.width,$.height,$.depth,0,fe,ye,$.data);else if(g.isData3DTexture)Ue?(Qe&&t.texStorage3D(i.TEXTURE_3D,ie,Ae,$.width,$.height,$.depth),C&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,fe,ye,$.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,$.width,$.height,$.depth,0,fe,ye,$.data);else if(g.isFramebufferTexture){if(Qe)if(Ue)t.texStorage2D(i.TEXTURE_2D,ie,Ae,$.width,$.height);else{let B=$.width,K=$.height;for(let ce=0;ce<ie;ce++)t.texImage2D(i.TEXTURE_2D,ce,Ae,B,K,0,fe,ye,null),B>>=1,K>>=1}}else if(Ve.length>0){if(Ue&&Qe){const B=xe(Ve[0]);t.texStorage2D(i.TEXTURE_2D,ie,Ae,B.width,B.height)}for(let B=0,K=Ve.length;B<K;B++)pe=Ve[B],Ue?C&&t.texSubImage2D(i.TEXTURE_2D,B,0,0,fe,ye,pe):t.texImage2D(i.TEXTURE_2D,B,Ae,fe,ye,pe);g.generateMipmaps=!1}else if(Ue){if(Qe){const B=xe($);t.texStorage2D(i.TEXTURE_2D,ie,Ae,B.width,B.height)}C&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,ye,$)}else t.texImage2D(i.TEXTURE_2D,0,Ae,fe,ye,$);p(g)&&u(X),ve.__version=W.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function te(E,g,F){if(g.image.length!==6)return;const X=je(E,g),j=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+F);const W=n.get(j);if(j.version!==W.__version||X===!0){t.activeTexture(i.TEXTURE0+F);const ve=We.getPrimaries(We.workingColorSpace),oe=g.colorSpace===Tn?null:We.getPrimaries(g.colorSpace),de=g.colorSpace===Tn||ve===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const ze=g.isCompressedTexture||g.image[0].isCompressedTexture,$=g.image[0]&&g.image[0].isDataTexture,fe=[];for(let K=0;K<6;K++)!ze&&!$?fe[K]=S(g.image[K],!0,r.maxCubemapSize):fe[K]=$?g.image[K].image:g.image[K],fe[K]=et(g,fe[K]);const ye=fe[0],Ae=s.convert(g.format,g.colorSpace),pe=s.convert(g.type),Ve=T(g.internalFormat,Ae,pe,g.colorSpace),Ue=g.isVideoTexture!==!0,Qe=W.__version===void 0||X===!0,C=j.dataReady;let ie=D(g,ye);De(i.TEXTURE_CUBE_MAP,g);let B;if(ze){Ue&&Qe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ie,Ve,ye.width,ye.height);for(let K=0;K<6;K++){B=fe[K].mipmaps;for(let ce=0;ce<B.length;ce++){const le=B[ce];g.format!==qt?Ae!==null?Ue?C&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,0,0,le.width,le.height,Ae,le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,Ve,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?C&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,0,0,le.width,le.height,Ae,pe,le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce,Ve,le.width,le.height,0,Ae,pe,le.data)}}}else{if(B=g.mipmaps,Ue&&Qe){B.length>0&&ie++;const K=xe(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ie,Ve,K.width,K.height)}for(let K=0;K<6;K++)if($){Ue?C&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,fe[K].width,fe[K].height,Ae,pe,fe[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ve,fe[K].width,fe[K].height,0,Ae,pe,fe[K].data);for(let ce=0;ce<B.length;ce++){const Ce=B[ce].image[K].image;Ue?C&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,0,0,Ce.width,Ce.height,Ae,pe,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,Ve,Ce.width,Ce.height,0,Ae,pe,Ce.data)}}else{Ue?C&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ae,pe,fe[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ve,Ae,pe,fe[K]);for(let ce=0;ce<B.length;ce++){const le=B[ce];Ue?C&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,0,0,Ae,pe,le.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ce+1,Ve,Ae,pe,le.image[K])}}}p(g)&&u(i.TEXTURE_CUBE_MAP),W.__version=j.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function ge(E,g,F,X,j,W){const ve=s.convert(F.format,F.colorSpace),oe=s.convert(F.type),de=T(F.internalFormat,ve,oe,F.colorSpace),ze=n.get(g),$=n.get(F);if($.__renderTarget=g,!ze.__hasExternalTextures){const fe=Math.max(1,g.width>>W),ye=Math.max(1,g.height>>W);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,W,de,fe,ye,g.depth,0,ve,oe,null):t.texImage2D(j,W,de,fe,ye,0,ve,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),Oe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,j,$.__webglTexture,0,Ne(g)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,j,$.__webglTexture,W),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(E,g,F){if(i.bindRenderbuffer(i.RENDERBUFFER,E),g.depthBuffer){const X=g.depthTexture,j=X&&X.isDepthTexture?X.type:null,W=y(g.stencilBuffer,j),ve=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=Ne(g);Oe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,oe,W,g.width,g.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,W,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,W,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,E)}else{const X=g.textures;for(let j=0;j<X.length;j++){const W=X[j],ve=s.convert(W.format,W.colorSpace),oe=s.convert(W.type),de=T(W.internalFormat,ve,oe,W.colorSpace),ze=Ne(g);F&&Oe(g)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ze,de,g.width,g.height):Oe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ze,de,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,de,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Te(E,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(g.depthTexture);X.__renderTarget=g,(!X.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),Y(g.depthTexture,0);const j=X.__webglTexture,W=Ne(g);if(g.depthTexture.format===mi)Oe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(g.depthTexture.format===yi)Oe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function He(E){const g=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==E.depthTexture){const X=E.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),X){const j=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,X.removeEventListener("dispose",j)};X.addEventListener("dispose",j),g.__depthDisposeCallback=j}g.__boundDepthTexture=X}if(E.depthTexture&&!g.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Te(g.__webglFramebuffer,E)}else if(F){g.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[X]),g.__webglDepthbuffer[X]===void 0)g.__webglDepthbuffer[X]=i.createRenderbuffer(),ae(g.__webglDepthbuffer[X],E,!1);else{const j=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=g.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,W)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),ae(g.__webglDepthbuffer,E,!1);else{const X=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,j)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function be(E,g,F){const X=n.get(E);g!==void 0&&ge(X.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&He(E)}function ot(E){const g=E.texture,F=n.get(E),X=n.get(g);E.addEventListener("dispose",w);const j=E.textures,W=E.isWebGLCubeRenderTarget===!0,ve=j.length>1;if(ve||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=g.version,a.memory.textures++),W){F.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer[oe]=[];for(let de=0;de<g.mipmaps.length;de++)F.__webglFramebuffer[oe][de]=i.createFramebuffer()}else F.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){F.__webglFramebuffer=[];for(let oe=0;oe<g.mipmaps.length;oe++)F.__webglFramebuffer[oe]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(ve)for(let oe=0,de=j.length;oe<de;oe++){const ze=n.get(j[oe]);ze.__webglTexture===void 0&&(ze.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&Oe(E)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let oe=0;oe<j.length;oe++){const de=j[oe];F.__webglColorRenderbuffer[oe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[oe]);const ze=s.convert(de.format,de.colorSpace),$=s.convert(de.type),fe=T(de.internalFormat,ze,$,de.colorSpace,E.isXRRenderTarget===!0),ye=Ne(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,fe,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,F.__webglColorRenderbuffer[oe])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),ae(F.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),De(i.TEXTURE_CUBE_MAP,g);for(let oe=0;oe<6;oe++)if(g.mipmaps&&g.mipmaps.length>0)for(let de=0;de<g.mipmaps.length;de++)ge(F.__webglFramebuffer[oe][de],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,de);else ge(F.__webglFramebuffer[oe],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);p(g)&&u(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let oe=0,de=j.length;oe<de;oe++){const ze=j[oe],$=n.get(ze);t.bindTexture(i.TEXTURE_2D,$.__webglTexture),De(i.TEXTURE_2D,ze),ge(F.__webglFramebuffer,E,ze,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,0),p(ze)&&u(i.TEXTURE_2D)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(oe=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,X.__webglTexture),De(oe,g),g.mipmaps&&g.mipmaps.length>0)for(let de=0;de<g.mipmaps.length;de++)ge(F.__webglFramebuffer[de],E,g,i.COLOR_ATTACHMENT0,oe,de);else ge(F.__webglFramebuffer,E,g,i.COLOR_ATTACHMENT0,oe,0);p(g)&&u(oe),t.unbindTexture()}E.depthBuffer&&He(E)}function nt(E){const g=E.textures;for(let F=0,X=g.length;F<X;F++){const j=g[F];if(p(j)){const W=b(E),ve=n.get(j).__webglTexture;t.bindTexture(W,ve),u(W),t.unbindTexture()}}}const Fe=[],A=[];function Pt(E){if(E.samples>0){if(Oe(E)===!1){const g=E.textures,F=E.width,X=E.height;let j=i.COLOR_BUFFER_BIT;const W=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(E),oe=g.length>1;if(oe)for(let de=0;de<g.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let de=0;de<g.length;de++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),oe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[de]);const ze=n.get(g[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ze,0)}i.blitFramebuffer(0,0,F,X,0,0,F,X,j,i.NEAREST),l===!0&&(Fe.length=0,A.length=0,Fe.push(i.COLOR_ATTACHMENT0+de),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Fe.push(W),A.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,A)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Fe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),oe)for(let de=0;de<g.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,ve.__webglColorRenderbuffer[de]);const ze=n.get(g[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,ze,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const g=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function Ne(E){return Math.min(r.maxSamples,E.samples)}function Oe(E){const g=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function Se(E){const g=a.render.frame;h.get(E)!==g&&(h.set(E,g),E.update())}function et(E,g){const F=E.colorSpace,X=E.format,j=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==Ti&&F!==Tn&&(We.getTransfer(F)===Ze?(X!==qt||j!==pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),g}function xe(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=H,this.setTexture2D=Y,this.setTexture2DArray=q,this.setTexture3D=J,this.setTextureCube=k,this.rebindTextures=be,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Oe}function sm(i,e){function t(n,r=Tn){let s;const a=We.getTransfer(r);if(n===pn)return i.UNSIGNED_BYTE;if(n===ga)return i.UNSIGNED_SHORT_4_4_4_4;if(n===va)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ko)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qo)return i.BYTE;if(n===Xo)return i.SHORT;if(n===qi)return i.UNSIGNED_SHORT;if(n===ma)return i.INT;if(n===Xn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===Ki)return i.HALF_FLOAT;if(n===Zo)return i.ALPHA;if(n===Yo)return i.RGB;if(n===qt)return i.RGBA;if(n===jo)return i.LUMINANCE;if(n===Jo)return i.LUMINANCE_ALPHA;if(n===mi)return i.DEPTH_COMPONENT;if(n===yi)return i.DEPTH_STENCIL;if(n===Qo)return i.RED;if(n===xa)return i.RED_INTEGER;if(n===$o)return i.RG;if(n===_a)return i.RG_INTEGER;if(n===Sa)return i.RGBA_INTEGER;if(n===Ar||n===wr||n===Rr||n===Cr)if(a===Ze)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ar)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Cr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ar)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Cr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ns||n===Os||n===Vs||n===zs)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ns)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Os)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Vs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===zs)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Bs||n===ks||n===Ws)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Bs||n===ks)return a===Ze?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ws)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Hs||n===Gs||n===qs||n===Xs||n===Ks||n===Zs||n===Ys||n===js||n===Js||n===Qs||n===$s||n===ea||n===ta||n===na)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Hs)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Gs)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===qs)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xs)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ks)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Zs)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ys)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===js)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Js)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Qs)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$s)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ea)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ta)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===na)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pr||n===ia||n===ra)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Pr)return a===Ze?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ia)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ra)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===el||n===sa||n===aa||n===oa)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Pr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===sa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===aa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===oa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ei?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const am=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,om=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class lm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new _t,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new gn({vertexShader:am,fragmentShader:om,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Jt(new wi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cm extends Ai{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,m=null,x=null;const S=new lm,p=t.getContextAttributes();let u=null,b=null;const T=[],y=[],D=new Ye;let U=null;const w=new Ht;w.viewport=new ct;const I=new Ht;I.viewport=new ct;const M=[w,I],_=new Cu;let R=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let te=T[G];return te===void 0&&(te=new ds,T[G]=te),te.getTargetRaySpace()},this.getControllerGrip=function(G){let te=T[G];return te===void 0&&(te=new ds,T[G]=te),te.getGripSpace()},this.getHand=function(G){let te=T[G];return te===void 0&&(te=new ds,T[G]=te),te.getHandSpace()};function z(G){const te=y.indexOf(G.inputSource);if(te===-1)return;const ge=T[te];ge!==void 0&&(ge.update(G.inputSource,G.frame,c||a),ge.dispatchEvent({type:G.type,data:G.inputSource}))}function Z(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",Y);for(let G=0;G<T.length;G++){const te=y[G];te!==null&&(y[G]=null,T[G].disconnect(te))}R=null,H=null,S.reset(),e.setRenderTarget(u),m=null,f=null,d=null,r=null,b=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",Y),p.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(D),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,ae=null,Te=null;p.depth&&(Te=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=p.stencil?yi:mi,ae=p.stencil?Ei:Xn);const He={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:s};d=new XRWebGLBinding(r,t),f=d.createProjectionLayer(He),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Kn(f.textureWidth,f.textureHeight,{format:qt,type:pn,depthTexture:new dl(f.textureWidth,f.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}else{const ge={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,ge),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new Kn(m.framebufferWidth,m.framebufferHeight,{format:qt,type:pn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),je.setContext(r),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function Y(G){for(let te=0;te<G.removed.length;te++){const ge=G.removed[te],ae=y.indexOf(ge);ae>=0&&(y[ae]=null,T[ae].disconnect(ge))}for(let te=0;te<G.added.length;te++){const ge=G.added[te];let ae=y.indexOf(ge);if(ae===-1){for(let He=0;He<T.length;He++)if(He>=y.length){y.push(ge),ae=He;break}else if(y[He]===null){y[He]=ge,ae=He;break}if(ae===-1)break}const Te=T[ae];Te&&Te.connect(ge)}}const q=new V,J=new V;function k(G,te,ge){q.setFromMatrixPosition(te.matrixWorld),J.setFromMatrixPosition(ge.matrixWorld);const ae=q.distanceTo(J),Te=te.projectionMatrix.elements,He=ge.projectionMatrix.elements,be=Te[14]/(Te[10]-1),ot=Te[14]/(Te[10]+1),nt=(Te[9]+1)/Te[5],Fe=(Te[9]-1)/Te[5],A=(Te[8]-1)/Te[0],Pt=(He[8]+1)/He[0],Ne=be*A,Oe=be*Pt,Se=ae/(-A+Pt),et=Se*-A;if(te.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(et),G.translateZ(Se),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),Te[10]===-1)G.projectionMatrix.copy(te.projectionMatrix),G.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const xe=be+Se,E=ot+Se,g=Ne-et,F=Oe+(ae-et),X=nt*ot/E*xe,j=Fe*ot/E*xe;G.projectionMatrix.makePerspective(g,F,X,j,xe,E),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function se(G,te){te===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(te.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let te=G.near,ge=G.far;S.texture!==null&&(S.depthNear>0&&(te=S.depthNear),S.depthFar>0&&(ge=S.depthFar)),_.near=I.near=w.near=te,_.far=I.far=w.far=ge,(R!==_.near||H!==_.far)&&(r.updateRenderState({depthNear:_.near,depthFar:_.far}),R=_.near,H=_.far),w.layers.mask=G.layers.mask|2,I.layers.mask=G.layers.mask|4,_.layers.mask=w.layers.mask|I.layers.mask;const ae=G.parent,Te=_.cameras;se(_,ae);for(let He=0;He<Te.length;He++)se(Te[He],ae);Te.length===2?k(_,w,I):_.projectionMatrix.copy(w.projectionMatrix),he(G,_,ae)};function he(G,te,ge){ge===null?G.matrix.copy(te.matrixWorld):(G.matrix.copy(ge.matrixWorld),G.matrix.invert(),G.matrix.multiply(te.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(te.projectionMatrix),G.projectionMatrixInverse.copy(te.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=la*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=G)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(_)};let _e=null;function De(G,te){if(h=te.getViewerPose(c||a),x=te,h!==null){const ge=h.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let ae=!1;ge.length!==_.cameras.length&&(_.cameras.length=0,ae=!0);for(let be=0;be<ge.length;be++){const ot=ge[be];let nt=null;if(m!==null)nt=m.getViewport(ot);else{const A=d.getViewSubImage(f,ot);nt=A.viewport,be===0&&(e.setRenderTargetTextures(b,A.colorTexture,f.ignoreDepthValues?void 0:A.depthStencilTexture),e.setRenderTarget(b))}let Fe=M[be];Fe===void 0&&(Fe=new Ht,Fe.layers.enable(be),Fe.viewport=new ct,M[be]=Fe),Fe.matrix.fromArray(ot.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(ot.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(nt.x,nt.y,nt.width,nt.height),be===0&&(_.matrix.copy(Fe.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ae===!0&&_.cameras.push(Fe)}const Te=r.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&d){const be=d.getDepthInformation(ge[0]);be&&be.isValid&&be.texture&&S.init(e,be,r.renderState)}}for(let ge=0;ge<T.length;ge++){const ae=y[ge],Te=T[ge];ae!==null&&Te!==void 0&&Te.update(ae,te,c||a)}_e&&_e(G,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),x=null}const je=new ml;je.setAnimationLoop(De),this.setAnimationLoop=function(G){_e=G},this.dispose=function(){}}}const Nn=new mn,um=new at;function hm(i,e){function t(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,ll(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function r(p,u,b,T,y){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(p,u):u.isMeshToonMaterial?(s(p,u),d(p,u)):u.isMeshPhongMaterial?(s(p,u),h(p,u)):u.isMeshStandardMaterial?(s(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,y)):u.isMeshMatcapMaterial?(s(p,u),x(p,u)):u.isMeshDepthMaterial?s(p,u):u.isMeshDistanceMaterial?(s(p,u),S(p,u)):u.isMeshNormalMaterial?s(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?l(p,u,b,T):u.isSpriteMaterial?c(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,t(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Tt&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,t(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Tt&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,t(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,t(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const b=e.get(u),T=b.envMap,y=b.envMapRotation;T&&(p.envMap.value=T,Nn.copy(y),Nn.x*=-1,Nn.y*=-1,Nn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Nn.y*=-1,Nn.z*=-1),p.envMapRotation.value.setFromMatrix4(um.makeRotationFromEuler(Nn)),p.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap&&(p.lightMap.value=u.lightMap,p.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,p.lightMapTransform)),u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,b,T){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*b,p.scale.value=T*.5,u.map&&(p.map.value=u.map,t(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function c(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,t(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,t(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function d(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,p.roughnessMapTransform)),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,b){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Tt&&p.clearcoatNormalScale.value.negate())),u.dispersion>0&&(p.dispersion.value=u.dispersion),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,u){u.matcap&&(p.matcap.value=u.matcap)}function S(p,u){const b=e.get(u).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function dm(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,T){const y=T.program;n.uniformBlockBinding(b,y)}function c(b,T){let y=r[b.id];y===void 0&&(x(b),y=h(b),r[b.id]=y,b.addEventListener("dispose",p));const D=T.program;n.updateUBOMapping(b,D);const U=e.render.frame;s[b.id]!==U&&(f(b),s[b.id]=U)}function h(b){const T=d();b.__bindingPointIndex=T;const y=i.createBuffer(),D=b.__size,U=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,D,U),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,y),y}function d(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const T=r[b.id],y=b.uniforms,D=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let U=0,w=y.length;U<w;U++){const I=Array.isArray(y[U])?y[U]:[y[U]];for(let M=0,_=I.length;M<_;M++){const R=I[M];if(m(R,U,M,D)===!0){const H=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let Z=0;for(let Y=0;Y<z.length;Y++){const q=z[Y],J=S(q);typeof q=="number"||typeof q=="boolean"?(R.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,H+Z,R.__data)):q.isMatrix3?(R.__data[0]=q.elements[0],R.__data[1]=q.elements[1],R.__data[2]=q.elements[2],R.__data[3]=0,R.__data[4]=q.elements[3],R.__data[5]=q.elements[4],R.__data[6]=q.elements[5],R.__data[7]=0,R.__data[8]=q.elements[6],R.__data[9]=q.elements[7],R.__data[10]=q.elements[8],R.__data[11]=0):(q.toArray(R.__data,Z),Z+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(b,T,y,D){const U=b.value,w=T+"_"+y;if(D[w]===void 0)return typeof U=="number"||typeof U=="boolean"?D[w]=U:D[w]=U.clone(),!0;{const I=D[w];if(typeof U=="number"||typeof U=="boolean"){if(I!==U)return D[w]=U,!0}else if(I.equals(U)===!1)return I.copy(U),!0}return!1}function x(b){const T=b.uniforms;let y=0;const D=16;for(let w=0,I=T.length;w<I;w++){const M=Array.isArray(T[w])?T[w]:[T[w]];for(let _=0,R=M.length;_<R;_++){const H=M[_],z=Array.isArray(H.value)?H.value:[H.value];for(let Z=0,Y=z.length;Z<Y;Z++){const q=z[Z],J=S(q),k=y%D,se=k%J.boundary,he=k+se;y+=se,he!==0&&D-he<J.storage&&(y+=D-he),H.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=y,y+=J.storage}}}const U=y%D;return U>0&&(y+=D-U),b.__size=y,b.__cache={},this}function S(b){const T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=48,T.storage=48):b.isMatrix4?(T.boundary=64,T.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),T}function p(b){const T=b.target;T.removeEventListener("dispose",p);const y=a.indexOf(T.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function u(){for(const b in r)i.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:u}}class fm{constructor(e={}){const{canvas:t=Gc(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const x=new Uint32Array(4),S=new Int32Array(4);let p=null,u=null;const b=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ft,this.toneMapping=An,this.toneMappingExposure=1;const y=this;let D=!1,U=0,w=0,I=null,M=-1,_=null;const R=new ct,H=new ct;let z=null;const Z=new Ke(0);let Y=0,q=t.width,J=t.height,k=1,se=null,he=null;const _e=new ct(0,0,q,J),De=new ct(0,0,q,J);let je=!1;const G=new hl;let te=!1,ge=!1;this.transmissionResolutionScale=1;const ae=new at,Te=new at,He=new V,be=new ct,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let nt=!1;function Fe(){return I===null?k:1}let A=n;function Pt(v,P){return t.getContext(v,P)}try{const v={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${pa}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",le,!1),A===null){const P="webgl2";if(A=Pt(P,v),A===null)throw Pt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Ne,Oe,Se,et,xe,E,g,F,X,j,W,ve,oe,de,ze,$,fe,ye,Ae,pe,Ve,Ue,Qe,C;function ie(){Ne=new yf(A),Ne.init(),Ue=new sm(A,Ne),Oe=new vf(A,Ne,e,Ue),Se=new im(A,Ne),Oe.reverseDepthBuffer&&f&&Se.buffers.depth.setReversed(!0),et=new Af(A),xe=new Gp,E=new rm(A,Ne,Se,xe,Oe,Ue,et),g=new _f(y),F=new Ef(y),X=new Lu(A),Qe=new mf(A,X),j=new Tf(A,X,et,Qe),W=new Rf(A,j,X,et),Ae=new wf(A,Oe,E),$=new xf(xe),ve=new Hp(y,g,F,Ne,Oe,Qe,$),oe=new hm(y,xe),de=new Xp,ze=new Qp(Ne),ye=new pf(y,g,F,Se,W,m,l),fe=new tm(y,W,Oe),C=new dm(A,et,Oe,Se),pe=new gf(A,Ne,et),Ve=new bf(A,Ne,et),et.programs=ve.programs,y.capabilities=Oe,y.extensions=Ne,y.properties=xe,y.renderLists=de,y.shadowMap=fe,y.state=Se,y.info=et}ie();const B=new cm(y,A);this.xr=B,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const v=Ne.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Ne.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(v){v!==void 0&&(k=v,this.setSize(q,J,!1))},this.getSize=function(v){return v.set(q,J)},this.setSize=function(v,P,N=!0){if(B.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=v,J=P,t.width=Math.floor(v*k),t.height=Math.floor(P*k),N===!0&&(t.style.width=v+"px",t.style.height=P+"px"),this.setViewport(0,0,v,P)},this.getDrawingBufferSize=function(v){return v.set(q*k,J*k).floor()},this.setDrawingBufferSize=function(v,P,N){q=v,J=P,k=N,t.width=Math.floor(v*N),t.height=Math.floor(P*N),this.setViewport(0,0,v,P)},this.getCurrentViewport=function(v){return v.copy(R)},this.getViewport=function(v){return v.copy(_e)},this.setViewport=function(v,P,N,O){v.isVector4?_e.set(v.x,v.y,v.z,v.w):_e.set(v,P,N,O),Se.viewport(R.copy(_e).multiplyScalar(k).round())},this.getScissor=function(v){return v.copy(De)},this.setScissor=function(v,P,N,O){v.isVector4?De.set(v.x,v.y,v.z,v.w):De.set(v,P,N,O),Se.scissor(H.copy(De).multiplyScalar(k).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(v){Se.setScissorTest(je=v)},this.setOpaqueSort=function(v){se=v},this.setTransparentSort=function(v){he=v},this.getClearColor=function(v){return v.copy(ye.getClearColor())},this.setClearColor=function(){ye.setClearColor.apply(ye,arguments)},this.getClearAlpha=function(){return ye.getClearAlpha()},this.setClearAlpha=function(){ye.setClearAlpha.apply(ye,arguments)},this.clear=function(v=!0,P=!0,N=!0){let O=0;if(v){let L=!1;if(I!==null){const Q=I.texture.format;L=Q===Sa||Q===_a||Q===xa}if(L){const Q=I.texture.type,re=Q===pn||Q===Xn||Q===qi||Q===Ei||Q===ga||Q===va,ue=ye.getClearColor(),me=ye.getClearAlpha(),we=ue.r,Re=ue.g,Me=ue.b;re?(x[0]=we,x[1]=Re,x[2]=Me,x[3]=me,A.clearBufferuiv(A.COLOR,0,x)):(S[0]=we,S[1]=Re,S[2]=Me,S[3]=me,A.clearBufferiv(A.COLOR,0,S))}else O|=A.COLOR_BUFFER_BIT}P&&(O|=A.DEPTH_BUFFER_BIT),N&&(O|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",le,!1),ye.dispose(),de.dispose(),ze.dispose(),xe.dispose(),g.dispose(),F.dispose(),W.dispose(),Qe.dispose(),C.dispose(),ve.dispose(),B.dispose(),B.removeEventListener("sessionstart",wa),B.removeEventListener("sessionend",Ra),Cn.stop()};function K(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function ce(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const v=et.autoReset,P=fe.enabled,N=fe.autoUpdate,O=fe.needsUpdate,L=fe.type;ie(),et.autoReset=v,fe.enabled=P,fe.autoUpdate=N,fe.needsUpdate=O,fe.type=L}function le(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Ce(v){const P=v.target;P.removeEventListener("dispose",Ce),it(P)}function it(v){gt(v),xe.remove(v)}function gt(v){const P=xe.get(v).programs;P!==void 0&&(P.forEach(function(N){ve.releaseProgram(N)}),v.isShaderMaterial&&ve.releaseShaderCache(v))}this.renderBufferDirect=function(v,P,N,O,L,Q){P===null&&(P=ot);const re=L.isMesh&&L.matrixWorld.determinant()<0,ue=Ol(v,P,N,O,L);Se.setMaterial(O,re);let me=N.index,we=1;if(O.wireframe===!0){if(me=j.getWireframeAttribute(N),me===void 0)return;we=2}const Re=N.drawRange,Me=N.attributes.position;let Be=Re.start*we,Ge=(Re.start+Re.count)*we;Q!==null&&(Be=Math.max(Be,Q.start*we),Ge=Math.min(Ge,(Q.start+Q.count)*we)),me!==null?(Be=Math.max(Be,0),Ge=Math.min(Ge,me.count)):Me!=null&&(Be=Math.max(Be,0),Ge=Math.min(Ge,Me.count));const ut=Ge-Be;if(ut<0||ut===1/0)return;Qe.setup(L,O,ue,N,me);let rt,ke=pe;if(me!==null&&(rt=X.get(me),ke=Ve,ke.setIndex(rt)),L.isMesh)O.wireframe===!0?(Se.setLineWidth(O.wireframeLinewidth*Fe()),ke.setMode(A.LINES)):ke.setMode(A.TRIANGLES);else if(L.isLine){let Ee=O.linewidth;Ee===void 0&&(Ee=1),Se.setLineWidth(Ee*Fe()),L.isLineSegments?ke.setMode(A.LINES):L.isLineLoop?ke.setMode(A.LINE_LOOP):ke.setMode(A.LINE_STRIP)}else L.isPoints?ke.setMode(A.POINTS):L.isSprite&&ke.setMode(A.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)ke.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))ke.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{const Ee=L._multiDrawStarts,mt=L._multiDrawCounts,qe=L._multiDrawCount,Vt=me?X.get(me).bytesPerElement:1,Zn=xe.get(O).currentProgram.getUniforms();for(let At=0;At<qe;At++)Zn.setValue(A,"_gl_DrawID",At),ke.render(Ee[At]/Vt,mt[At])}else if(L.isInstancedMesh)ke.renderInstances(Be,ut,L.count);else if(N.isInstancedBufferGeometry){const Ee=N._maxInstanceCount!==void 0?N._maxInstanceCount:1/0,mt=Math.min(N.instanceCount,Ee);ke.renderInstances(Be,ut,mt)}else ke.render(Be,ut)};function Xe(v,P,N){v.transparent===!0&&v.side===un&&v.forceSinglePass===!1?(v.side=Tt,v.needsUpdate=!0,er(v,P,N),v.side=wn,v.needsUpdate=!0,er(v,P,N),v.side=un):er(v,P,N)}this.compile=function(v,P,N=null){N===null&&(N=v),u=ze.get(N),u.init(P),T.push(u),N.traverseVisible(function(L){L.isLight&&L.layers.test(P.layers)&&(u.pushLight(L),L.castShadow&&u.pushShadow(L))}),v!==N&&v.traverseVisible(function(L){L.isLight&&L.layers.test(P.layers)&&(u.pushLight(L),L.castShadow&&u.pushShadow(L))}),u.setupLights();const O=new Set;return v.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;const Q=L.material;if(Q)if(Array.isArray(Q))for(let re=0;re<Q.length;re++){const ue=Q[re];Xe(ue,N,L),O.add(ue)}else Xe(Q,N,L),O.add(Q)}),T.pop(),u=null,O},this.compileAsync=function(v,P,N=null){const O=this.compile(v,P,N);return new Promise(L=>{function Q(){if(O.forEach(function(re){xe.get(re).currentProgram.isReady()&&O.delete(re)}),O.size===0){L(v);return}setTimeout(Q,10)}Ne.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Ot=null;function $t(v){Ot&&Ot(v)}function wa(){Cn.stop()}function Ra(){Cn.start()}const Cn=new ml;Cn.setAnimationLoop($t),typeof self<"u"&&Cn.setContext(self),this.setAnimationLoop=function(v){Ot=v,B.setAnimationLoop(v),v===null?Cn.stop():Cn.start()},B.addEventListener("sessionstart",wa),B.addEventListener("sessionend",Ra),this.render=function(v,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),B.enabled===!0&&B.isPresenting===!0&&(B.cameraAutoUpdate===!0&&B.updateCamera(P),P=B.getCamera()),v.isScene===!0&&v.onBeforeRender(y,v,P,I),u=ze.get(v,T.length),u.init(P),T.push(u),Te.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),G.setFromProjectionMatrix(Te),ge=this.localClippingEnabled,te=$.init(this.clippingPlanes,ge),p=de.get(v,b.length),p.init(),b.push(p),B.enabled===!0&&B.isPresenting===!0){const Q=y.xr.getDepthSensingMesh();Q!==null&&kr(Q,P,-1/0,y.sortObjects)}kr(v,P,0,y.sortObjects),p.finish(),y.sortObjects===!0&&p.sort(se,he),nt=B.enabled===!1||B.isPresenting===!1||B.hasDepthSensing()===!1,nt&&ye.addToRenderList(p,v),this.info.render.frame++,te===!0&&$.beginShadows();const N=u.state.shadowsArray;fe.render(N,v,P),te===!0&&$.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=p.opaque,L=p.transmissive;if(u.setupLights(),P.isArrayCamera){const Q=P.cameras;if(L.length>0)for(let re=0,ue=Q.length;re<ue;re++){const me=Q[re];Pa(O,L,v,me)}nt&&ye.render(v);for(let re=0,ue=Q.length;re<ue;re++){const me=Q[re];Ca(p,v,me,me.viewport)}}else L.length>0&&Pa(O,L,v,P),nt&&ye.render(v),Ca(p,v,P);I!==null&&w===0&&(E.updateMultisampleRenderTarget(I),E.updateRenderTargetMipmap(I)),v.isScene===!0&&v.onAfterRender(y,v,P),Qe.resetDefaultState(),M=-1,_=null,T.pop(),T.length>0?(u=T[T.length-1],te===!0&&$.setGlobalState(y.clippingPlanes,u.state.camera)):u=null,b.pop(),b.length>0?p=b[b.length-1]:p=null};function kr(v,P,N,O){if(v.visible===!1)return;if(v.layers.test(P.layers)){if(v.isGroup)N=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(P);else if(v.isLight)u.pushLight(v),v.castShadow&&u.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||G.intersectsSprite(v)){O&&be.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Te);const re=W.update(v),ue=v.material;ue.visible&&p.push(v,re,ue,N,be.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||G.intersectsObject(v))){const re=W.update(v),ue=v.material;if(O&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),be.copy(v.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),be.copy(re.boundingSphere.center)),be.applyMatrix4(v.matrixWorld).applyMatrix4(Te)),Array.isArray(ue)){const me=re.groups;for(let we=0,Re=me.length;we<Re;we++){const Me=me[we],Be=ue[Me.materialIndex];Be&&Be.visible&&p.push(v,re,Be,N,be.z,Me)}}else ue.visible&&p.push(v,re,ue,N,be.z,null)}}const Q=v.children;for(let re=0,ue=Q.length;re<ue;re++)kr(Q[re],P,N,O)}function Ca(v,P,N,O){const L=v.opaque,Q=v.transmissive,re=v.transparent;u.setupLightsView(N),te===!0&&$.setGlobalState(y.clippingPlanes,N),O&&Se.viewport(R.copy(O)),L.length>0&&$i(L,P,N),Q.length>0&&$i(Q,P,N),re.length>0&&$i(re,P,N),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Pa(v,P,N,O){if((N.isScene===!0?N.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[O.id]===void 0&&(u.state.transmissionRenderTarget[O.id]=new Kn(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?Ki:pn,minFilter:Gn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:We.workingColorSpace}));const Q=u.state.transmissionRenderTarget[O.id],re=O.viewport||R;Q.setSize(re.z*y.transmissionResolutionScale,re.w*y.transmissionResolutionScale);const ue=y.getRenderTarget();y.setRenderTarget(Q),y.getClearColor(Z),Y=y.getClearAlpha(),Y<1&&y.setClearColor(16777215,.5),y.clear(),nt&&ye.render(N);const me=y.toneMapping;y.toneMapping=An;const we=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),u.setupLightsView(O),te===!0&&$.setGlobalState(y.clippingPlanes,O),$i(v,N,O),E.updateMultisampleRenderTarget(Q),E.updateRenderTargetMipmap(Q),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let Me=0,Be=P.length;Me<Be;Me++){const Ge=P[Me],ut=Ge.object,rt=Ge.geometry,ke=Ge.material,Ee=Ge.group;if(ke.side===un&&ut.layers.test(O.layers)){const mt=ke.side;ke.side=Tt,ke.needsUpdate=!0,Ua(ut,N,O,rt,ke,Ee),ke.side=mt,ke.needsUpdate=!0,Re=!0}}Re===!0&&(E.updateMultisampleRenderTarget(Q),E.updateRenderTargetMipmap(Q))}y.setRenderTarget(ue),y.setClearColor(Z,Y),we!==void 0&&(O.viewport=we),y.toneMapping=me}function $i(v,P,N){const O=P.isScene===!0?P.overrideMaterial:null;for(let L=0,Q=v.length;L<Q;L++){const re=v[L],ue=re.object,me=re.geometry,we=O===null?re.material:O,Re=re.group;ue.layers.test(N.layers)&&Ua(ue,P,N,me,we,Re)}}function Ua(v,P,N,O,L,Q){v.onBeforeRender(y,P,N,O,L,Q),v.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),L.onBeforeRender(y,P,N,O,v,Q),L.transparent===!0&&L.side===un&&L.forceSinglePass===!1?(L.side=Tt,L.needsUpdate=!0,y.renderBufferDirect(N,P,O,L,v,Q),L.side=wn,L.needsUpdate=!0,y.renderBufferDirect(N,P,O,L,v,Q),L.side=un):y.renderBufferDirect(N,P,O,L,v,Q),v.onAfterRender(y,P,N,O,L,Q)}function er(v,P,N){P.isScene!==!0&&(P=ot);const O=xe.get(v),L=u.state.lights,Q=u.state.shadowsArray,re=L.state.version,ue=ve.getParameters(v,L.state,Q,P,N),me=ve.getProgramCacheKey(ue);let we=O.programs;O.environment=v.isMeshStandardMaterial?P.environment:null,O.fog=P.fog,O.envMap=(v.isMeshStandardMaterial?F:g).get(v.envMap||O.environment),O.envMapRotation=O.environment!==null&&v.envMap===null?P.environmentRotation:v.envMapRotation,we===void 0&&(v.addEventListener("dispose",Ce),we=new Map,O.programs=we);let Re=we.get(me);if(Re!==void 0){if(O.currentProgram===Re&&O.lightsStateVersion===re)return Da(v,ue),Re}else ue.uniforms=ve.getUniforms(v),v.onBeforeCompile(ue,y),Re=ve.acquireProgram(ue,me),we.set(me,Re),O.uniforms=ue.uniforms;const Me=O.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Me.clippingPlanes=$.uniform),Da(v,ue),O.needsLights=zl(v),O.lightsStateVersion=re,O.needsLights&&(Me.ambientLightColor.value=L.state.ambient,Me.lightProbe.value=L.state.probe,Me.directionalLights.value=L.state.directional,Me.directionalLightShadows.value=L.state.directionalShadow,Me.spotLights.value=L.state.spot,Me.spotLightShadows.value=L.state.spotShadow,Me.rectAreaLights.value=L.state.rectArea,Me.ltc_1.value=L.state.rectAreaLTC1,Me.ltc_2.value=L.state.rectAreaLTC2,Me.pointLights.value=L.state.point,Me.pointLightShadows.value=L.state.pointShadow,Me.hemisphereLights.value=L.state.hemi,Me.directionalShadowMap.value=L.state.directionalShadowMap,Me.directionalShadowMatrix.value=L.state.directionalShadowMatrix,Me.spotShadowMap.value=L.state.spotShadowMap,Me.spotLightMatrix.value=L.state.spotLightMatrix,Me.spotLightMap.value=L.state.spotLightMap,Me.pointShadowMap.value=L.state.pointShadowMap,Me.pointShadowMatrix.value=L.state.pointShadowMatrix),O.currentProgram=Re,O.uniformsList=null,Re}function La(v){if(v.uniformsList===null){const P=v.currentProgram.getUniforms();v.uniformsList=Ur.seqWithValue(P.seq,v.uniforms)}return v.uniformsList}function Da(v,P){const N=xe.get(v);N.outputColorSpace=P.outputColorSpace,N.batching=P.batching,N.batchingColor=P.batchingColor,N.instancing=P.instancing,N.instancingColor=P.instancingColor,N.instancingMorph=P.instancingMorph,N.skinning=P.skinning,N.morphTargets=P.morphTargets,N.morphNormals=P.morphNormals,N.morphColors=P.morphColors,N.morphTargetsCount=P.morphTargetsCount,N.numClippingPlanes=P.numClippingPlanes,N.numIntersection=P.numClipIntersection,N.vertexAlphas=P.vertexAlphas,N.vertexTangents=P.vertexTangents,N.toneMapping=P.toneMapping}function Ol(v,P,N,O,L){P.isScene!==!0&&(P=ot),E.resetTextureUnits();const Q=P.fog,re=O.isMeshStandardMaterial?P.environment:null,ue=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ti,me=(O.isMeshStandardMaterial?F:g).get(O.envMap||re),we=O.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,Re=!!N.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Me=!!N.morphAttributes.position,Be=!!N.morphAttributes.normal,Ge=!!N.morphAttributes.color;let ut=An;O.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ut=y.toneMapping);const rt=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ke=rt!==void 0?rt.length:0,Ee=xe.get(O),mt=u.state.lights;if(te===!0&&(ge===!0||v!==_)){const St=v===_&&O.id===M;$.setState(O,v,St)}let qe=!1;O.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==mt.state.version||Ee.outputColorSpace!==ue||L.isBatchedMesh&&Ee.batching===!1||!L.isBatchedMesh&&Ee.batching===!0||L.isBatchedMesh&&Ee.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&Ee.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&Ee.instancing===!1||!L.isInstancedMesh&&Ee.instancing===!0||L.isSkinnedMesh&&Ee.skinning===!1||!L.isSkinnedMesh&&Ee.skinning===!0||L.isInstancedMesh&&Ee.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&Ee.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&Ee.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&Ee.instancingMorph===!1&&L.morphTexture!==null||Ee.envMap!==me||O.fog===!0&&Ee.fog!==Q||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==$.numPlanes||Ee.numIntersection!==$.numIntersection)||Ee.vertexAlphas!==we||Ee.vertexTangents!==Re||Ee.morphTargets!==Me||Ee.morphNormals!==Be||Ee.morphColors!==Ge||Ee.toneMapping!==ut||Ee.morphTargetsCount!==ke)&&(qe=!0):(qe=!0,Ee.__version=O.version);let Vt=Ee.currentProgram;qe===!0&&(Vt=er(O,P,L));let Zn=!1,At=!1,Ci=!1;const tt=Vt.getUniforms(),Ut=Ee.uniforms;if(Se.useProgram(Vt.program)&&(Zn=!0,At=!0,Ci=!0),O.id!==M&&(M=O.id,At=!0),Zn||_!==v){Se.buffers.depth.getReversed()?(ae.copy(v.projectionMatrix),Xc(ae),Kc(ae),tt.setValue(A,"projectionMatrix",ae)):tt.setValue(A,"projectionMatrix",v.projectionMatrix),tt.setValue(A,"viewMatrix",v.matrixWorldInverse);const Et=tt.map.cameraPosition;Et!==void 0&&Et.setValue(A,He.setFromMatrixPosition(v.matrixWorld)),Oe.logarithmicDepthBuffer&&tt.setValue(A,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&tt.setValue(A,"isOrthographic",v.isOrthographicCamera===!0),_!==v&&(_=v,At=!0,Ci=!0)}if(L.isSkinnedMesh){tt.setOptional(A,L,"bindMatrix"),tt.setOptional(A,L,"bindMatrixInverse");const St=L.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),tt.setValue(A,"boneTexture",St.boneTexture,E))}L.isBatchedMesh&&(tt.setOptional(A,L,"batchingTexture"),tt.setValue(A,"batchingTexture",L._matricesTexture,E),tt.setOptional(A,L,"batchingIdTexture"),tt.setValue(A,"batchingIdTexture",L._indirectTexture,E),tt.setOptional(A,L,"batchingColorTexture"),L._colorsTexture!==null&&tt.setValue(A,"batchingColorTexture",L._colorsTexture,E));const Lt=N.morphAttributes;if((Lt.position!==void 0||Lt.normal!==void 0||Lt.color!==void 0)&&Ae.update(L,N,Vt),(At||Ee.receiveShadow!==L.receiveShadow)&&(Ee.receiveShadow=L.receiveShadow,tt.setValue(A,"receiveShadow",L.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Ut.envMap.value=me,Ut.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&P.environment!==null&&(Ut.envMapIntensity.value=P.environmentIntensity),At&&(tt.setValue(A,"toneMappingExposure",y.toneMappingExposure),Ee.needsLights&&Vl(Ut,Ci),Q&&O.fog===!0&&oe.refreshFogUniforms(Ut,Q),oe.refreshMaterialUniforms(Ut,O,k,J,u.state.transmissionRenderTarget[v.id]),Ur.upload(A,La(Ee),Ut,E)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Ur.upload(A,La(Ee),Ut,E),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&tt.setValue(A,"center",L.center),tt.setValue(A,"modelViewMatrix",L.modelViewMatrix),tt.setValue(A,"normalMatrix",L.normalMatrix),tt.setValue(A,"modelMatrix",L.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const St=O.uniformsGroups;for(let Et=0,Wr=St.length;Et<Wr;Et++){const Pn=St[Et];C.update(Pn,Vt),C.bind(Pn,Vt)}}return Vt}function Vl(v,P){v.ambientLightColor.needsUpdate=P,v.lightProbe.needsUpdate=P,v.directionalLights.needsUpdate=P,v.directionalLightShadows.needsUpdate=P,v.pointLights.needsUpdate=P,v.pointLightShadows.needsUpdate=P,v.spotLights.needsUpdate=P,v.spotLightShadows.needsUpdate=P,v.rectAreaLights.needsUpdate=P,v.hemisphereLights.needsUpdate=P}function zl(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(v,P,N){xe.get(v.texture).__webglTexture=P,xe.get(v.depthTexture).__webglTexture=N;const O=xe.get(v);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=N===void 0,O.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(v,P){const N=xe.get(v);N.__webglFramebuffer=P,N.__useDefaultFramebuffer=P===void 0};const Bl=A.createFramebuffer();this.setRenderTarget=function(v,P=0,N=0){I=v,U=P,w=N;let O=!0,L=null,Q=!1,re=!1;if(v){const me=xe.get(v);if(me.__useDefaultFramebuffer!==void 0)Se.bindFramebuffer(A.FRAMEBUFFER,null),O=!1;else if(me.__webglFramebuffer===void 0)E.setupRenderTarget(v);else if(me.__hasExternalTextures)E.rebindTextures(v,xe.get(v.texture).__webglTexture,xe.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Me=v.depthTexture;if(me.__boundDepthTexture!==Me){if(Me!==null&&xe.has(Me)&&(v.width!==Me.image.width||v.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(v)}}const we=v.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(re=!0);const Re=xe.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Re[P])?L=Re[P][N]:L=Re[P],Q=!0):v.samples>0&&E.useMultisampledRTT(v)===!1?L=xe.get(v).__webglMultisampledFramebuffer:Array.isArray(Re)?L=Re[N]:L=Re,R.copy(v.viewport),H.copy(v.scissor),z=v.scissorTest}else R.copy(_e).multiplyScalar(k).floor(),H.copy(De).multiplyScalar(k).floor(),z=je;if(N!==0&&(L=Bl),Se.bindFramebuffer(A.FRAMEBUFFER,L)&&O&&Se.drawBuffers(v,L),Se.viewport(R),Se.scissor(H),Se.setScissorTest(z),Q){const me=xe.get(v.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+P,me.__webglTexture,N)}else if(re){const me=xe.get(v.texture),we=P;A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,me.__webglTexture,N,we)}else if(v!==null&&N!==0){const me=xe.get(v.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,me.__webglTexture,N)}M=-1},this.readRenderTargetPixels=function(v,P,N,O,L,Q,re){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=xe.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&re!==void 0&&(ue=ue[re]),ue){Se.bindFramebuffer(A.FRAMEBUFFER,ue);try{const me=v.texture,we=me.format,Re=me.type;if(!Oe.textureFormatReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=v.width-O&&N>=0&&N<=v.height-L&&A.readPixels(P,N,O,L,Ue.convert(we),Ue.convert(Re),Q)}finally{const me=I!==null?xe.get(I).__webglFramebuffer:null;Se.bindFramebuffer(A.FRAMEBUFFER,me)}}},this.readRenderTargetPixelsAsync=async function(v,P,N,O,L,Q,re){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=xe.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&re!==void 0&&(ue=ue[re]),ue){const me=v.texture,we=me.format,Re=me.type;if(!Oe.textureFormatReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(P>=0&&P<=v.width-O&&N>=0&&N<=v.height-L){Se.bindFramebuffer(A.FRAMEBUFFER,ue);const Me=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Me),A.bufferData(A.PIXEL_PACK_BUFFER,Q.byteLength,A.STREAM_READ),A.readPixels(P,N,O,L,Ue.convert(we),Ue.convert(Re),0);const Be=I!==null?xe.get(I).__webglFramebuffer:null;Se.bindFramebuffer(A.FRAMEBUFFER,Be);const Ge=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await qc(A,Ge,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Me),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,Q),A.deleteBuffer(Me),A.deleteSync(Ge),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,P=null,N=0){v.isTexture!==!0&&(ci("WebGLRenderer: copyFramebufferToTexture function signature has changed."),P=arguments[0]||null,v=arguments[1]);const O=Math.pow(2,-N),L=Math.floor(v.image.width*O),Q=Math.floor(v.image.height*O),re=P!==null?P.x:0,ue=P!==null?P.y:0;E.setTexture2D(v,0),A.copyTexSubImage2D(A.TEXTURE_2D,N,0,0,re,ue,L,Q),Se.unbindTexture()};const kl=A.createFramebuffer(),Wl=A.createFramebuffer();this.copyTextureToTexture=function(v,P,N=null,O=null,L=0,Q=null){v.isTexture!==!0&&(ci("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,v=arguments[1],P=arguments[2],Q=arguments[3]||0,N=null),Q===null&&(L!==0?(ci("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=L,L=0):Q=0);let re,ue,me,we,Re,Me,Be,Ge,ut;const rt=v.isCompressedTexture?v.mipmaps[Q]:v.image;if(N!==null)re=N.max.x-N.min.x,ue=N.max.y-N.min.y,me=N.isBox3?N.max.z-N.min.z:1,we=N.min.x,Re=N.min.y,Me=N.isBox3?N.min.z:0;else{const Lt=Math.pow(2,-L);re=Math.floor(rt.width*Lt),ue=Math.floor(rt.height*Lt),v.isDataArrayTexture?me=rt.depth:v.isData3DTexture?me=Math.floor(rt.depth*Lt):me=1,we=0,Re=0,Me=0}O!==null?(Be=O.x,Ge=O.y,ut=O.z):(Be=0,Ge=0,ut=0);const ke=Ue.convert(P.format),Ee=Ue.convert(P.type);let mt;P.isData3DTexture?(E.setTexture3D(P,0),mt=A.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(E.setTexture2DArray(P,0),mt=A.TEXTURE_2D_ARRAY):(E.setTexture2D(P,0),mt=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,P.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,P.unpackAlignment);const qe=A.getParameter(A.UNPACK_ROW_LENGTH),Vt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Zn=A.getParameter(A.UNPACK_SKIP_PIXELS),At=A.getParameter(A.UNPACK_SKIP_ROWS),Ci=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,rt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,rt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,we),A.pixelStorei(A.UNPACK_SKIP_ROWS,Re),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Me);const tt=v.isDataArrayTexture||v.isData3DTexture,Ut=P.isDataArrayTexture||P.isData3DTexture;if(v.isDepthTexture){const Lt=xe.get(v),St=xe.get(P),Et=xe.get(Lt.__renderTarget),Wr=xe.get(St.__renderTarget);Se.bindFramebuffer(A.READ_FRAMEBUFFER,Et.__webglFramebuffer),Se.bindFramebuffer(A.DRAW_FRAMEBUFFER,Wr.__webglFramebuffer);for(let Pn=0;Pn<me;Pn++)tt&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,xe.get(v).__webglTexture,L,Me+Pn),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,xe.get(P).__webglTexture,Q,ut+Pn)),A.blitFramebuffer(we,Re,re,ue,Be,Ge,re,ue,A.DEPTH_BUFFER_BIT,A.NEAREST);Se.bindFramebuffer(A.READ_FRAMEBUFFER,null),Se.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(L!==0||v.isRenderTargetTexture||xe.has(v)){const Lt=xe.get(v),St=xe.get(P);Se.bindFramebuffer(A.READ_FRAMEBUFFER,kl),Se.bindFramebuffer(A.DRAW_FRAMEBUFFER,Wl);for(let Et=0;Et<me;Et++)tt?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Lt.__webglTexture,L,Me+Et):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Lt.__webglTexture,L),Ut?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,St.__webglTexture,Q,ut+Et):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,St.__webglTexture,Q),L!==0?A.blitFramebuffer(we,Re,re,ue,Be,Ge,re,ue,A.COLOR_BUFFER_BIT,A.NEAREST):Ut?A.copyTexSubImage3D(mt,Q,Be,Ge,ut+Et,we,Re,re,ue):A.copyTexSubImage2D(mt,Q,Be,Ge,we,Re,re,ue);Se.bindFramebuffer(A.READ_FRAMEBUFFER,null),Se.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else Ut?v.isDataTexture||v.isData3DTexture?A.texSubImage3D(mt,Q,Be,Ge,ut,re,ue,me,ke,Ee,rt.data):P.isCompressedArrayTexture?A.compressedTexSubImage3D(mt,Q,Be,Ge,ut,re,ue,me,ke,rt.data):A.texSubImage3D(mt,Q,Be,Ge,ut,re,ue,me,ke,Ee,rt):v.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,Q,Be,Ge,re,ue,ke,Ee,rt.data):v.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,Q,Be,Ge,rt.width,rt.height,ke,rt.data):A.texSubImage2D(A.TEXTURE_2D,Q,Be,Ge,re,ue,ke,Ee,rt);A.pixelStorei(A.UNPACK_ROW_LENGTH,qe),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Vt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Zn),A.pixelStorei(A.UNPACK_SKIP_ROWS,At),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Ci),Q===0&&P.generateMipmaps&&A.generateMipmap(mt),Se.unbindTexture()},this.copyTextureToTexture3D=function(v,P,N=null,O=null,L=0){return v.isTexture!==!0&&(ci("WebGLRenderer: copyTextureToTexture3D function signature has changed."),N=arguments[0]||null,O=arguments[1]||null,v=arguments[2],P=arguments[3],L=arguments[4]||0),ci('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(v,P,N,O,L)},this.initRenderTarget=function(v){xe.get(v).__webglFramebuffer===void 0&&E.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?E.setTextureCube(v,0):v.isData3DTexture?E.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?E.setTexture2DArray(v,0):E.setTexture2D(v,0),Se.unbindTexture()},this.resetState=function(){U=0,w=0,I=null,Se.reset(),Qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}var pm=Object.defineProperty,Sl=i=>{throw TypeError(i)},mm=(i,e,t)=>e in i?pm(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,Ct=(i,e,t)=>mm(i,typeof e!="symbol"?e+"":e,t),Aa=(i,e,t)=>e.has(i)||Sl("Cannot "+t),ee=(i,e,t)=>(Aa(i,e,"read from private field"),t?t.call(i):e.get(i)),Je=(i,e,t)=>e.has(i)?Sl("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),st=(i,e,t,n)=>(Aa(i,e,"write to private field"),e.set(i,t),t),$e=(i,e,t)=>(Aa(i,e,"access private method"),t);class gm{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=Ss(),this._delta=0,this._elapsed=0,this._timescale=1,this._usePageVisibilityAPI=typeof document<"u"&&document.hidden!==void 0,this._usePageVisibilityAPI===!0&&(this._pageVisibilityHandler=vm.bind(this),document.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=Ss()-this._startTime,this}dispose(){return this._usePageVisibilityAPI===!0&&document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this}update(e){return this._usePageVisibilityAPI===!0&&document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:Ss())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Ss(){return performance.now()}function vm(){document.hidden===!1&&this.reset()}var xm=`attribute float aDisAngle;
attribute float aDisAmplitude;

uniform float     uTime;
uniform float     uDisFrequency;
uniform float     uDisAmplitude;
uniform sampler2D uDisTexture;
uniform float     uNoiseFrequency;
uniform float     uNoiseAmplitude;
uniform sampler2D uNoiseTexture;

varying vec4 vColor;`,_m=`vec3 vertexPosition = position;

vec2  noiseUv            = vec2(uv.x - uNoiseFrequency * uTime, uv.y);
float noiseFactor        = texture(uNoiseTexture, noiseUv).r * uNoiseAmplitude;
float noiseX             = cos(aDisAngle) * noiseFactor;
float noiseY             = sin(aDisAngle) * noiseFactor;
vec2  noise              = vec2(noiseX, noiseY);
      vertexPosition.xy += noise;

float disFactor  = texture(uDisTexture, uv).r;
      disFactor  = smoothstep(0.2, 0.8, disFactor);
      disFactor  = (sin(uDisFrequency * uTime) + 1.5) / (2.5) *
                   disFactor                                  *
                   uDisAmplitude;
      disFactor *= aDisAmplitude;

float displacementX      = cos(aDisAngle) * disFactor;
float displacementY      = sin(aDisAngle) * disFactor;
vec2  displacement       = vec2(displacementX, displacementY);
      vertexPosition.xy += displacement;`,lt,Yt,on,Vi,vi,Ml,El,No,Oo;class Sm{constructor(e,t,n,r,s,a=.1,o=5,l=5,c=50){Je(this,vi),Je(this,lt),Je(this,Yt),Je(this,on),Je(this,Vi),st(this,lt,e),st(this,Yt,t),st(this,on,n),st(this,Vi,r),$e(this,vi,Ml).call(this,s,a,o,l,c),$e(this,vi,El).call(this)}update(e){ee(this,lt).points.material.uniforms.uTime&&(ee(this,lt).points.material.uniforms.uTime.value=e,ee(this,Yt).update()),ee(this,on).update()}debug(){const e=ee(this,Vi).addFolder("General");e.add({noiseFrequency:ee(this,lt).points.material.uniforms.uNoiseFrequency.value},"noiseFrequency").min(0).max(2*Math.PI).step(.01).onChange(t=>ee(this,lt).points.material.uniforms.uNoiseFrequency.value=t),e.add({noiseAmplitude:ee(this,lt).points.material.uniforms.uNoiseAmplitude.value},"noiseAmplitude").min(0).max(ee(this,on).width).step(1).onChange(t=>ee(this,lt).points.material.uniforms.uNoiseAmplitude.value=t),e.add({displacementFrequency:ee(this,lt).points.material.uniforms.uDisFrequency.value},"displacementFrequency").min(0).max(10*2*Math.PI).step(.01).onChange(t=>ee(this,lt).points.material.uniforms.uDisFrequency.value=t),e.add({displacementAmplitude:ee(this,lt).points.material.uniforms.uDisAmplitude.value},"displacementAmplitude").min(0).max(ee(this,on).width).step(1).onChange(t=>ee(this,lt).points.material.uniforms.uDisAmplitude.value=t),ee(this,lt).debug(),ee(this,Yt).debug()}dispose(){ee(this,lt).dispose(),ee(this,Yt).dispose(),ee(this,on).dispose(),ee(this,Vi).destroy()}}lt=new WeakMap,Yt=new WeakMap,on=new WeakMap,Vi=new WeakMap,vi=new WeakSet,Ml=function(i,e,t,n,r){$e(this,vi,Oo).call(this),$e(this,vi,No).call(this,i,e,t,n,r),ee(this,on).scene.add(ee(this,lt).points)},El=function(){ee(this,Yt).raycasterPlane.position.copy(ee(this,lt).points.position),ee(this,Yt).raycasterPlane.position.z+=.01,ee(this,on).scene.add(ee(this,Yt).raycasterPlane)},No=function(i,e,t,n,r){const s=new fl().load(i);s.wrapS=Fr,ee(this,lt).points.material.onBeforeCompile=a=>{a.uniforms.uTime=new Wt(0),a.uniforms.uDisFrequency=new Wt(n),a.uniforms.uDisAmplitude=new Wt(r),a.uniforms.uDisTexture=new Wt(ee(this,Yt).canvas.texture),a.uniforms.uNoiseFrequency=new Wt(e),a.uniforms.uNoiseAmplitude=new Wt(t),a.uniforms.uNoiseTexture=new Wt(s),a.vertexShader=a.vertexShader.replace("varying vec4 vColor;",xm),a.vertexShader=a.vertexShader.replace("vec3 vertexPosition = position;",_m)}},Oo=function(){const i=ee(this,lt).points.geometry.attributes.position.count,e=new Float32Array(i),t=new Float32Array(i);for(let n=0;n<i;n++)e[n]=Math.random()*2*Math.PI,t[n]=Math.random();ee(this,lt).points.geometry.setAttribute("aDisAngle",new Nt(e,1)),ee(this,lt).points.geometry.setAttribute("aDisAmplitude",new Nt(t,1))};var Bn,yl,Tl,bl,Al,wl;class Mm{constructor(e,t){Je(this,Bn),Ct(this,"scene"),Ct(this,"renderer"),Ct(this,"camera"),Ct(this,"width"),Ct(this,"height"),Ct(this,"dpr"),this.width=e,this.height=t,$e(this,Bn,yl).call(this),$e(this,Bn,bl).call(this),$e(this,Bn,Tl).call(this)}update(){this.renderer.render(this.scene,this.camera)}dispose(){$e(this,Bn,wl).call(this),$e(this,Bn,Al).call(this)}}Bn=new WeakSet,yl=function(){const i=document.createElement("canvas");document.body.append(i),this.dpr=Math.min(window.devicePixelRatio,2);let e=!1;this.dpr<=1&&(e=!0),this.renderer=new fm({canvas:i,antialias:e}),this.renderer.setPixelRatio(this.dpr),this.renderer.setSize(this.width,this.height)},Tl=function(){const i=-this.renderer.domElement.width/2,e=this.renderer.domElement.width/2,t=this.renderer.domElement.height/2,n=-this.renderer.domElement.height/2,r=.1,s=1;this.camera=new pl(i,e,t,n,r,s),this.scene.add(this.camera),this.camera.position.z=s-.1},bl=function(){this.scene=new xu},Al=function(){this.renderer.dispose()},wl=function(){for(;this.scene.children.length>0;)this.scene.remove(this.scene.children[0])};var Em=`uniform sampler2D uImageTexture;
uniform float     uPointSize;

varying vec4 vColor;

void main() {
    vec3 vertexPosition = position;

    vec4 modelPosition      = modelMatrix      * vec4(vertexPosition, 1.0);
    vec4 viewPosition       = viewMatrix       * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position  = projectionPosition;
    gl_PointSize = uPointSize;

    vColor = texture(uImageTexture, uv);
}`,ym=`varying vec4 vColor;

void main() {
    gl_FragColor = vColor;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`,Fi,Ni,br,On,Vo,Ms,Es,zo;let Tm=(zo=class{constructor(i,e,t,n,r,s=1){Je(this,On),Ct(this,"points"),Je(this,Fi),Je(this,Ni),Je(this,br),st(this,Ni,i),st(this,br,e),$e(this,On,Vo).call(this,t,n,r,s)}debug(){const i=ee(this,br).addFolder("Image");i.add({resolutionWidth:this.points.geometry.parameters.widthSegments},"resolutionWidth").min(0).max(this.points.geometry.parameters.width).step(1).onFinishChange(e=>{$e(this,On,Ms).call(this,e,this.points.geometry.parameters.heightSegments)}),i.add({resolutionHeight:this.points.geometry.parameters.heightSegments},"resolutionHeight").min(0).max(this.points.geometry.parameters.height).step(1).onFinishChange(e=>{$e(this,On,Ms).call(this,this.points.geometry.parameters.widthSegments,e)}),i.add({pointSize:this.points.material.uniforms.uPointSize.value},"pointSize").min(1).max(100).step(1).onFinishChange(e=>{this.points.material.uniforms.uPointSize.value=e})}dispose(){this.points.geometry.dispose(),this.points.material.dispose(),ee(this,Fi).dispose()}},Fi=new WeakMap,Ni=new WeakMap,br=new WeakMap,On=new WeakSet,Vo=function(i,e,t,n){const r=new fl;st(this,Fi,r.load(i));const s=$e(this,On,Es).call(this,e,t),a=new gn({vertexShader:Em,fragmentShader:ym,uniforms:{uImageTexture:new Wt(ee(this,Fi)),uPointSize:new Wt(n)},transparent:!0,depthWrite:!1});this.points=new Eu(s,a)},Ms=function(i,e){const t=this.points.geometry.attributes;this.points.geometry.dispose(),this.points.geometry=$e(this,On,Es).call(this,i,e,t)},Es=function(i,e,t=null){const n=new wi(ee(this,Ni).width,ee(this,Ni).height,i,e);return n.setIndex(null),n.deleteAttribute("normal"),t&&(n.attributes={...t,...n.attributes}),n},zo);var Kt,zi,Bi,xi,Bo,ko,Rl,Cl;class bm{constructor(e,t){Je(this,xi),Ct(this,"coord"),Ct(this,"canvas"),Ct(this,"raycaster"),Ct(this,"raycasterPlane"),Je(this,Kt),Je(this,zi),Je(this,Bi),this.canvas=t,this.coord=new Ye(void 0,void 0),st(this,Kt,e),$e(this,xi,Rl).call(this)}update(){let e=null,t=null;if(this.coord.x&&this.coord.y){this.raycaster.setFromCamera(this.coord,ee(this,Kt).camera);const n=this.raycaster.intersectObject(this.raycasterPlane);if(n.length){const r=n[0].uv;e=r.x*this.canvas.element.width,t=(1-r.y)*this.canvas.element.height}}this.canvas.update(e,t)}debug(){this.canvas.debug()}dispose(){this.canvas.dispose(),$e(this,xi,Cl).call(this)}}Kt=new WeakMap,zi=new WeakMap,Bi=new WeakMap,xi=new WeakSet,Bo=function(i){const e=i.target;this.coord.x=(i.offsetX/e.width-.5)*2,this.coord.y=-(i.offsetY/e.height-.5)*2},ko=function(){this.coord.x=void 0,this.coord.y=void 0},Rl=function(){this.raycaster=new Pu,st(this,zi,$e(this,xi,Bo).bind(this)),ee(this,Kt).renderer.domElement.addEventListener("pointermove",ee(this,zi)),st(this,Bi,$e(this,xi,ko).bind(this)),ee(this,Kt).renderer.domElement.addEventListener("pointerleave",ee(this,Bi)),this.raycasterPlane=new Jt(new wi(ee(this,Kt).width,ee(this,Kt).height),new ya),this.raycasterPlane.visible=!1},Cl=function(){ee(this,Kt).renderer.domElement.removeEventListener("pointermove",ee(this,zi)),ee(this,Kt).renderer.domElement.removeEventListener("pointerleave",ee(this,Bi)),this.raycasterPlane.geometry.dispose(),this.raycasterPlane.material.dispose()};var Lr,It,ki,ln,Wi,yn,Pl,Ul,Ll,Dl,da;class Am{constructor(e,t,n,r,s=.1,a=.05){Je(this,yn),Je(this,Lr),Ct(this,"texture"),Ct(this,"element"),Je(this,It),Je(this,ki),Je(this,ln),Je(this,Wi),st(this,Lr,e),st(this,Wi,a),$e(this,yn,Ll).call(this,t,n),$e(this,yn,Dl).call(this,r,s)}update(e,t){$e(this,yn,Ul).call(this),e&&t&&$e(this,yn,Pl).call(this,e,t),this.texture.needsUpdate=!0}debug(){const e=ee(this,Lr).addFolder("Pointer Canvas");e.add({displacementSize:ee(this,ln)/this.element.width},"displacementSize").min(0).max(1).step(.01).onChange(t=>st(this,ln,this.element.width*t)),e.add({displacementTrailingFactor:ee(this,Wi)},"displacementTrailingFactor").min(0).max(1).step(.01).onChange(t=>$e(this,yn,da).call(this,t)),e.add({isCanvasShown:!1},"isCanvasShown").onChange(t=>{t?(document.body.appendChild(this.element),this.element.style.position="fixed",this.element.style.top="0",this.element.style.left="0",this.element.style.border="1px solid #fff"):document.body.removeChild(this.element)})}dispose(){this.texture.dispose()}}Lr=new WeakMap,It=new WeakMap,ki=new WeakMap,ln=new WeakMap,Wi=new WeakMap,yn=new WeakSet,Pl=function(i,e){i-=ee(this,ln)/2,e-=ee(this,ln)/2,ee(this,It).save(),ee(this,It).globalCompositeOperation="lighten",ee(this,It).drawImage(ee(this,ki),i,e,ee(this,ln),ee(this,ln)),ee(this,It).restore()},Ul=function(){ee(this,It).save(),ee(this,It).globalAlpha=ee(this,Wi),ee(this,It).fillStyle="#000",ee(this,It).fillRect(0,0,this.element.width,this.element.height),ee(this,It).restore()},Ll=function(i,e){this.element=document.createElement("canvas"),this.element.width=i,this.element.height=e,this.texture=new yu(this.element),st(this,It,this.element.getContext("2d"))},Dl=function(i,e){st(this,ki,new Image),ee(this,ki).src=i,$e(this,yn,da).call(this,e)},da=function(i){st(this,ln,i*this.element.width)};const wm="data:image/png;base64,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",Rm="data:image/png;base64,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";var di,fi,cn,ui,Dr,Hi,Ir,Il,Fl;class Cm{constructor(e,t,n,r,s,a=1,o=wm,l=.05,c=3,h=Rm,d=.15,f=.01,m=5,x=40){Je(this,Ir),Je(this,di),Je(this,fi),Je(this,cn),Je(this,ui),Je(this,Dr),Je(this,Hi),st(this,ui,new gm),st(this,di,new Mm(t,n)),$e(this,Ir,Fl).call(this),$e(this,Ir,Il).call(this,e,r,s,a,o,l,c,h,d,f,m,x)}render(e=0){ee(this,ui).update(e),ee(this,fi).update(ee(this,ui).getElapsed()),st(this,Dr,requestAnimationFrame(this.render.bind(this)))}debug(e){e.key==="d"&&ee(this,cn)._hidden&&ee(this,cn).show()&&ee(this,fi).debug()}dispose(){cancelAnimationFrame(ee(this,Dr)),window.removeEventListener("keydown",ee(this,Hi)),ee(this,ui).dispose(),ee(this,fi).dispose()}}di=new WeakMap,fi=new WeakMap,cn=new WeakMap,ui=new WeakMap,Dr=new WeakMap,Hi=new WeakMap,Ir=new WeakSet,Il=function(i,e,t,n,r,s,a,o,l,c,h,d){st(this,fi,new Sm(new Tm(ee(this,di),ee(this,cn),i,e,t,n),new bm(ee(this,di),new Am(ee(this,cn),e,t,o,l,c)),ee(this,di),ee(this,cn),r,s,a,h,d))},Fl=function(){st(this,cn,new fa),ee(this,cn).hide(),st(this,Hi,this.debug.bind(this)),window.addEventListener("keydown",ee(this,Hi))};const Nl=new Cm("/img2pxl/media/images/logo.png",280,280,64,64,3);Nl.render();window.addEventListener("keydown",i=>{i.key==="Escape"&&Nl.dispose()});
//# sourceMappingURL=index-CBo8toBO.js.map
