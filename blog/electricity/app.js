(()=>{var r0=Object.defineProperty;var a0=(i,e)=>{for(var t in e)r0(i,t,{get:e[t],enumerable:!0})};var Cl=[],ta=!0,Wh=new Set,o0=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;o0&&(ta=!1);function Zt(){return ta}function Vh(i){ta=i,Wh.forEach(e=>e(i)),Cl.forEach(e=>e._kick())}function na(i){Wh.add(i)}var Gh=typeof IntersectionObserver<"u"?new IntersectionObserver(i=>{for(let e of i){let t=e.target.__fig;t&&(t.visible=e.isIntersecting,t._kick())}},{rootMargin:"120px 0px"}):null,Qe=class{constructor(e,t){this.opts=t,this.container=e,this.wrap=document.createElement("div"),this.wrap.className="canvas-wrap",this.canvas=document.createElement("canvas"),this.canvas.setAttribute("role","img"),this.canvas.setAttribute("aria-label",t.label||"Interactive figure"),this.wrap.appendChild(this.canvas),e.appendChild(this.wrap),this.ctx=this.canvas.getContext("2d"),this.w=0,this.h=0,this.dpr=1,this.visible=!1,this.t=0,this._raf=0,this._dirty=!0,this._last=0,this.pointer=null,this.canvas.__fig=this,Cl.push(this),Gh?Gh.observe(this.canvas):this.visible=!0,typeof ResizeObserver<"u"&&new ResizeObserver(()=>this.resize()).observe(this.wrap),window.addEventListener("resize",()=>this.resize()),this.resize()}get animated(){return!!this.opts.animated&&ta}resize(){let e=Math.max(200,Math.round(this.wrap.clientWidth||600)),t=Math.round(this.opts.height?this.opts.height(e):e*(this.opts.aspect||.6)),n=Math.min(3,window.devicePixelRatio||1);e===this.w&&t===this.h&&n===this.dpr||(this.w=e,this.h=t,this.dpr=n,this.canvas.style.width=e+"px",this.canvas.style.height=t+"px",this.canvas.width=Math.round(e*n),this.canvas.height=Math.round(t*n),this.opts.onResize&&this.opts.onResize(e,t,this),this._drawn&&(this.render(),this._dirty=!1),this.invalidate())}invalidate(){this._dirty=!0,this._kick()}_kick(){this._raf||this.visible&&(!this._dirty&&!this.animated||(this._last=performance.now(),this._raf=requestAnimationFrame(e=>this._frame(e))))}_frame(e){this._raf=0;let t=(e-this._last)/1e3;this._last=e,t>0||(t=1/60),t=Math.min(t,1/20),this.animated&&this.opts.step&&(this.t+=t,this.opts.step(t,this)),this.render(),this._dirty=!1,this.animated&&this.visible&&(this._raf=requestAnimationFrame(n=>this._frame(n)))}render(){let{ctx:e,dpr:t}=this;e.setTransform(t,0,0,t,0,0),e.clearRect(0,0,this.w,this.h),this.canvas.__dpr=t,globalThis.__AUDIT&&(this.canvas.__texts=[]),this.opts.draw(e,this.w,this.h,this),this._drawn=!0}stepOnce(e){this.opts.step&&(this.t+=e,this.opts.step(e,this)),this.invalidate()}interact(e){let t=this.canvas;t.style.touchAction="pan-y pinch-zoom";let n=null,s=o=>{let a=t.getBoundingClientRect();return[o.clientX-a.left,o.clientY-a.top]},r=e.touchHit||e.hit;t.addEventListener("touchstart",o=>{if(!r||o.touches.length!==1)return;let a=t.getBoundingClientRect(),d=o.touches[0];r(d.clientX-a.left,d.clientY-a.top)&&o.preventDefault()},{passive:!1}),t.addEventListener("pointerdown",o=>{let[a,d]=s(o),c=o.pointerType==="touch"?r?r(a,d):!0:e.hit?e.hit(a,d):!0;c&&(n=c,t.setPointerCapture(o.pointerId),t.classList.add("dragging"),e.down&&e.down(c,a,d,o),this.invalidate(),o.preventDefault())}),t.addEventListener("pointermove",o=>{let[a,d]=s(o);if(n){e.move&&e.move(n,a,d,o),this.invalidate();return}let c=e.hit?e.hit(a,d):null;t.style.cursor=c?e.cursor||"grab":"default",e.hover&&(e.hover(c,a,d),this.invalidate())});let l=()=>{n&&(e.up&&e.up(n),n=null,t.classList.remove("dragging"),this.invalidate())};t.addEventListener("pointerup",l),t.addEventListener("pointercancel",l),t.addEventListener("pointerleave",()=>{!n&&e.hover&&(e.hover(null,-1,-1),this.invalidate())})}};function Hh(){Cl.forEach(i=>i.invalidate())}function $h(i){function e(){document.querySelectorAll("[data-fig]").forEach(n=>{let s=i[n.dataset.fig];if(!s){console.warn("unknown figure",n.dataset.fig);return}try{s(n)}catch(l){console.error("figure failed",n.dataset.fig,l),n.classList.add("fig-error")}let r=n.querySelector(":scope > figcaption");r&&n.appendChild(r)});let t=document.getElementById("play-toggle");if(t){let n=()=>{t.setAttribute("aria-pressed",Zt()),t.textContent=Zt()?"\u275A\u275A Pause":"\u25B6 Play",t.title=t.ariaLabel=Zt()?"Pause all animations":"Play all animations"};t.addEventListener("click",()=>Vh(!Zt())),na(n),n()}document.fonts&&document.fonts.ready&&document.fonts.ready.then(Hh)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()}var v={ink:"#2f2d2a",ink2:"#5b5852",ink3:"#8d897f",grid:"#e7e3da",grid2:"#d8d3c8",paper:"#fbfaf6",bg:"#f4f2ec",white:"#ffffff",solar:"#e3a922",wind:"#4f9fcb",hydro:"#2c6795",nuclear:"#8e62b5",lignite:"#8b6a4c",coal:"#55524d",gas:"#e0773f",peaker:"#c5473f",oil:"#a8423a",storage:"#2fa58a",biomass:"#7aa354",imports:"#a7a299",mustrun:"#9c8a73",demand:"#2f2d2a",price:"#b52f6a",procurement:"#e0a03a",network:"#6a7db0",taxes:"#a49d90",spot:"#b52f6a",phaseA:"#d1495b",phaseB:"#e8a33c",phaseC:"#1f8a9b",electron:"#3a78d4",field:"#d1495b",hot:"#d94a2b",cold:"#3a78d4",north:"#c84a4a",south:"#3f6fb3",freq:"#1f8a9b"};function se(i,e){let t=i.replace("#",""),n=parseInt(t.slice(0,2),16),s=parseInt(t.slice(2,4),16),r=parseInt(t.slice(4,6),16);return`rgba(${n},${s},${r},${e})`}function Ot(i,e,t){let n=i.replace("#",""),s=e.replace("#",""),r=(d,c)=>parseInt(d.slice(c,c+2),16),l=Math.round(r(n,0)*(1-t)+r(s,0)*t),o=Math.round(r(n,2)*(1-t)+r(s,2)*t),a=Math.round(r(n,4)*(1-t)+r(s,4)*t);return"#"+[l,o,a].map(d=>d.toString(16).padStart(2,"0")).join("")}function St(i,e){return Ot(i,"#ffffff",e)}function ot(i,e){return Ot(i,"#000000",e)}var qs={};a0(qs,{FONT:()=>qh,approach:()=>vi,arrow:()=>qn,axes:()=>dt,circle:()=>Ce,clamp:()=>Ae,font:()=>ia,lerp:()=>Xt,line:()=>Me,measure:()=>at,niceTicks:()=>Xs,pathLine:()=>$e,rrect:()=>He,scale:()=>Qt,sizeFor:()=>Pl,smooth:()=>l0,tag:()=>Pn,text:()=>X,typo:()=>Yh});var qh='"Inter", "Helvetica Neue", Arial, sans-serif';function ia(i,e=450){return`${e} ${i}px ${qh}`}function Yh(i){return String(i).replace(/([€$])-(?=\d)/g,"\u2212$1").replace(/(^|[\s(\[/:=,])-(?=[\d.]|[€$]\d)/g,"$1\u2212")}var Xh=11,Pl=(i,e=12,t={})=>!t.small&&i.canvas&&i.canvas.clientWidth&&i.canvas.clientWidth<600&&e<Xh?Xh:e;function X(i,e,t,n,s={}){if(e=Yh(e),i.save(),s={...s,size:Pl(i,s.size||12,s)},i.font=ia(s.size,s.weight||450),i.fillStyle=s.color||v.ink2,i.textAlign=s.align||"left",i.textBaseline=s.baseline||"alphabetic",!s.noclamp&&i.canvas.clientWidth){let r=i.getTransform(),l=i.canvas.__dpr||i.canvas.width/i.canvas.clientWidth||1;if(r.b===0&&r.c===0&&r.a>0){let o=(2*l-r.e)/r.a,a=((i.canvas.clientWidth-2)*l-r.e)/r.a,d=i.measureText(e).width;if(d>a-o){let u=(a-o)/d;i.font=ia((s.size||12)*u,s.weight||450),d=i.measureText(e).width}let c=i.textAlign,p=c==="right"||c==="end"?t-d:c==="center"?t-d/2:t;p<o?t+=o-p:p+d>a&&(t-=p+d-a)}}if(s.halo&&(i.lineWidth=s.halo===!0?4:s.halo,i.strokeStyle=s.haloColor||v.paper,i.lineJoin="round",i.strokeText(e,t,n)),i.fillText(e,t,n),globalThis.__AUDIT&&i.canvas.__texts){let r=i.measureText(e),l=i.getTransform(),o=i.canvas.__dpr||1,a=t-r.actualBoundingBoxLeft,d=t+r.actualBoundingBoxRight,c=n-r.actualBoundingBoxAscent,p=n+r.actualBoundingBoxDescent,u=[[a,c],[d,c],[a,p],[d,p]].map(([y,m])=>[(l.a*y+l.c*m+l.e)/o,(l.b*y+l.d*m+l.f)/o]),h=u.map(y=>y[0]),f=u.map(y=>y[1]);i.canvas.__texts.push({s:String(e),x0:Math.min(...h),x1:Math.max(...h),y0:Math.min(...f),y1:Math.max(...f),px:parseFloat(i.font.match(/([\d.]+)px/)[1])*l.a/o})}i.restore()}function at(i,e,t=12,n=450){i.save(),i.font=ia(Pl(i,t),n);let s=i.measureText(e).width;return i.restore(),s}function He(i,e,t,n,s,r){r=Math.max(0,Math.min(r,Math.abs(n)/2,Math.abs(s)/2)),i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}function Me(i,e,t,n,s,r,l=1,o){i.save(),i.strokeStyle=r,i.lineWidth=l,o&&i.setLineDash(o),i.beginPath(),i.moveTo(e,t),i.lineTo(n,s),i.stroke(),i.restore()}function Ce(i,e,t,n,s,r,l=1){i.beginPath(),i.arc(e,t,n,0,Math.PI*2),s&&(i.fillStyle=s,i.fill()),r&&(i.strokeStyle=r,i.lineWidth=l,i.stroke())}function qn(i,e,t,n,s,r,l=1.5,o=7){let a=Math.atan2(s-t,n-e);i.save(),i.strokeStyle=r,i.fillStyle=r,i.lineWidth=l,i.lineCap="round",i.beginPath(),i.moveTo(e,t),i.lineTo(n-Math.cos(a)*o*.6,s-Math.sin(a)*o*.6),i.stroke(),i.beginPath(),i.moveTo(n,s),i.lineTo(n-Math.cos(a-.45)*o,s-Math.sin(a-.45)*o),i.lineTo(n-Math.cos(a+.45)*o,s-Math.sin(a+.45)*o),i.closePath(),i.fill(),i.restore()}var Xt=(i,e,t)=>i+(e-i)*t,Ae=(i,e,t)=>Math.max(e,Math.min(t,i)),l0=i=>i*i*(3-2*i);function Qt(i,e,t,n){let s=r=>t+(r-i)/(e-i)*(n-t);return s.inv=r=>i+(r-t)/(n-t)*(e-i),s}function Xs(i,e,t=5){let s=(e-i)/t,r=Math.pow(10,Math.floor(Math.log10(s))),l=s/r,o=(l>=7.5?10:l>=3.5?5:l>=1.5?2:1)*r,a=[];for(let d=Math.ceil(i/o)*o;d<=e+o*1e-9;d+=o)a.push(+d.toFixed(10));return a}function dt(i,e){let{l:t,t:n,r:s,b:r}=e.box,l=Qt(e.x0,e.x1,t,s),o=Qt(e.y0,e.y1,r,n),a=e.xticks||Xs(e.x0,e.x1,e.nx||6),d=e.yticks||Xs(e.y0,e.y1,e.ny||4);i.save(),i.lineWidth=1;for(let c of d){let p=Math.round(o(c))+.5;i.strokeStyle=c===0?v.grid2:v.grid,(e.grid!==!1||c===0)&&(i.beginPath(),i.moveTo(t,p),i.lineTo(s,p),i.stroke());let u=(e.yfmt||String)(c),h=at(i,u,11);X(i,u,Math.max(t-6,h+2),p+4,{size:11,align:"right",color:v.ink3})}for(let c of a){let p=l(c);e.xgrid&&(i.strokeStyle=v.grid,i.beginPath(),i.moveTo(Math.round(p)+.5,n),i.lineTo(Math.round(p)+.5,r),i.stroke());let u=(e.xfmt||String)(c),h=at(i,u,11)/2,f=i.canvas.clientWidth||1e9;X(i,u,Math.min(Math.max(p,h+2),f-h-2),r+15,{size:11,align:"center",color:v.ink3})}return i.strokeStyle=v.grid2,i.beginPath(),i.moveTo(t,r+.5),i.lineTo(s,r+.5),i.stroke(),e.ylabel&&X(i,e.ylabel,t-4,n-10,{size:11,color:v.ink3,weight:500,align:e.ylabelAlign||"left"}),e.xlabel&&X(i,e.xlabel,s,r+30,{size:11,color:v.ink3,align:"right",weight:500}),i.restore(),{sx:l,sy:o}}function $e(i,e,t,n=2,s){e.length&&(i.save(),i.strokeStyle=t,i.lineWidth=n,i.lineJoin="round",i.lineCap="round",s&&i.setLineDash(s),i.beginPath(),e.forEach(([r,l],o)=>o?i.lineTo(r,l):i.moveTo(r,l)),i.stroke(),i.restore())}function Pn(i,e,t,n,s={}){let r=s.size||11.5,l=at(i,e,r,s.weight||550)+12,o=r+9,a=s.align==="right"?t-l:s.align==="center"?t-l/2:t;return i.save(),He(i,a,n-o/2,l,o,o/2),i.fillStyle=s.bg||v.ink,i.fill(),i.restore(),X(i,e,a+l/2,n+r*.36,{size:r,weight:s.weight||550,color:s.color||"#fff",align:"center"}),l}function vi(i,e,t,n){return e+(i-e)*Math.exp(-t*n)}var c0=0;function tt(i,e=""){let t=document.createElement("div");return t.className="controls "+e,i.appendChild(t),t}function Ie(i,e){let t="sl"+ ++c0,n=document.createElement("div");n.className="ctl slider",e.color&&n.style.setProperty("--c",e.color),e.wide&&n.classList.add("wide");let s=document.createElement("label");s.htmlFor=t;let r=document.createElement("span");r.className="name",r.innerHTML=e.label;let l=document.createElement("output");l.htmlFor=t,s.append(r,l);let o=document.createElement("input");o.type="range",o.id=t,o.min=e.min,o.max=e.max,o.step=e.step??"any",o.value=e.value,e.name&&(o.dataset.name=e.name);let a=e.fmt||(c=>String(c)),d=()=>{let c=+o.value;l.innerHTML=a(c),o.setAttribute("aria-valuetext",a(c));let p=(c-e.min)/(e.max-e.min)*100;o.style.setProperty("--p",p+"%")};return o.addEventListener("input",()=>{d(),e.oninput&&e.oninput(+o.value)}),d(),n.append(s,o),i.appendChild(n),{el:o,get value(){return+o.value},set(c,p=!1){o.value=c,d(),p&&e.oninput&&e.oninput(+o.value)}}}function rt(i,e){let t=document.createElement("div");if(t.className="ctl segmented",e.color&&t.style.setProperty("--c",e.color),e.label){let o=document.createElement("span");o.className="seg-label",o.innerHTML=e.label,t.appendChild(o)}let n=document.createElement("div");n.className="seg-group",n.setAttribute("role","group"),e.label&&n.setAttribute("aria-label",e.label.replace(/<[^>]+>/g,"")),t.appendChild(n);let s=e.value,r=e.options.map(o=>{let a=document.createElement("button");return a.type="button",a.innerHTML=o.label,o.name&&(a.dataset.name=o.name),a.addEventListener("click",()=>{l(o.value,!0)}),n.appendChild(a),[a,o.value]});function l(o,a){s=o,r.forEach(([d,c])=>{d.setAttribute("aria-pressed",String(c===o))}),a&&e.onchange&&e.onchange(o)}return l(s,!1),i.appendChild(t),{get value(){return s},set:l}}function zt(i,e,t,n={}){let s=document.createElement("button");return s.type="button",s.className="ctl btn "+(n.kind||""),s.innerHTML=e,n.name&&(s.dataset.name=n.name),n.color&&s.style.setProperty("--c",n.color),s.addEventListener("click",t),i.appendChild(s),s}function ct(i,e=""){let t=document.createElement("div");return t.className="readout "+e,t.setAttribute("aria-live","polite"),i.appendChild(t),t}function dn(i,e){return document.createElement("p")}function ln(i,e="More controls"){let t=document.createElement("details");t.className="ctl more";let n=document.createElement("summary");n.innerHTML=e;let s=document.createElement("div");return s.className="more-in",t.append(n,s),i.appendChild(t),s}function Jh(i){let t=1602e-22,n=15e-7,s={I:10,closed:!1,front:0,mode:"dc",phase:0,lamp:0},l=Array.from({length:150},()=>({x:Math.random(),y:Math.random(),vx:0,vy:0,off:0})),o=[];for(let h=0;h<26;h++)for(let f=0;f<5;f++)o.push([(h+f%2*.5+.25)/26,(f+.5)/5]);let a=new Qe(i,{label:"A close-up of electrons in a copper wire and an overview of a circuit with a switch and a lamp",height:h=>Math.max(300,Math.min(420,h*.52)),animated:!0,step(h){s.closed?s.front=Math.min(1.2,s.front+h*2.2):s.front=Math.max(0,s.front-h*3),s.phase+=h*2*Math.PI*.6;let f=s.closed&&s.front>=1;s.lamp=vi(s.lamp,f?1:0,10,h);let y=s.I/16*.09;for(let m of l){m.vx+=(Math.random()-.5)*2.2*h*60*.004,m.vy+=(Math.random()-.5)*2.2*h*60*.004,m.vx*=.92,m.vy*=.92;let g=0;s.closed&&s.front>.02&&(g=s.mode==="dc"?-y:-y*2.2*Math.cos(s.phase)),m.x+=m.vx+g*h,m.y+=m.vy,m.y<.03&&(m.y=.03,m.vy*=-1),m.y>.97&&(m.y=.97,m.vy*=-1),m.x<0&&(m.x+=1),m.x>1&&(m.x-=1)}},draw(h,f,y){let _=f-36,x=y*.46;X(h,"Inside the copper (close-up, not to scale)",18,20,{size:12,color:v.ink3,weight:500}),h.save(),He(h,18,34,_,x,14);let T=h.createLinearGradient(0,34,0,34+x);T.addColorStop(0,"#f3dcc4"),T.addColorStop(.5,"#efd2b6"),T.addColorStop(1,"#e8c6a6"),h.fillStyle=T,h.fill(),h.clip();for(let[z,V]of o)Ce(h,18+z*_,34+V*x,3.2,se("#b07a4f",.35));for(let z of l)Ce(h,18+z.x*_,34+z.y*x,3,v.electron);let w=l[0];if(Ce(h,18+w.x*_,34+w.y*x,7,null,v.ink,1.5),h.restore(),h.save(),He(h,18,34,_,x,14),h.strokeStyle=se("#9b6b45",.35),h.lineWidth=1,h.stroke(),h.restore(),s.closed&&s.front>.02){let z=s.mode==="dc"?1:Math.cos(s.phase),V=18+_-70,U=34+x+16;qn(h,V,U,V+50*z,U,v.field,2),X(h,"field",V+25,U+16,{size:11,color:v.field,align:"center"}),qn(h,88,U,88-40*z*(s.I/16+.2),U,v.electron,2),X(h,"electron drift",88,U+16,{size:11,color:v.electron,align:"center"})}let E=34+x+58,b=y-E-14,S=74,A=f-18-64,R=E+10,I=E+b-6;X(h,"The whole circuit",18,E-14,{size:12,color:v.ink3,weight:500}),h.save(),h.lineCap="round";let O="#c99060";h.strokeStyle=O,h.lineWidth=5,h.beginPath(),h.moveTo(S+30,R),h.lineTo(A,R),h.lineTo(A,I),h.lineTo(S,I),h.lineTo(S,R+18),h.stroke();let D=S,L=R;Ce(h,D,L+18,4,v.ink),h.strokeStyle=v.ink,h.lineWidth=3,h.beginPath(),h.moveTo(D,L+18),s.closed?h.lineTo(D+30,L):h.lineTo(D+26,L-16),h.stroke(),Ce(h,D+30,L,4,v.ink);let P=(R+I)/2;if(h.fillStyle=v.paper,h.fillRect(S-14,P-14,28,28),Me(h,S-14,P-6,S+14,P-6,v.ink,3),Me(h,S-8,P+6,S+8,P+6,v.ink,3),X(h,"+",S+22,P-2,{size:13,color:v.ink2}),s.front>0){let z=A-(S+30)+(I-R)+(A-S),V=Math.min(1,s.front)*z;h.strokeStyle=se(v.field,.85),h.lineWidth=5,h.beginPath(),h.moveTo(S+30,R);let U=A-(S+30),H=I-R;V<=U?h.lineTo(S+30+V,R):(h.lineTo(A,R),V<=U+H?h.lineTo(A,R+V-U):(h.lineTo(A,I),h.lineTo(A-(V-U-H),I))),h.stroke(),h.beginPath(),h.moveTo(S,P+14),h.lineTo(S,I),h.stroke()}let F=A,G=(R+I)/2;if(h.fillStyle=v.paper,h.fillRect(F-16,G-16,32,32),s.lamp>.01){let z=h.createRadialGradient(F,G,2,F,G,46);z.addColorStop(0,se("#ffd76a",.9*s.lamp)),z.addColorStop(1,se("#ffd76a",0)),h.fillStyle=z,h.beginPath(),h.arc(F,G,46,0,7),h.fill()}Ce(h,F,G,13,Ot("#ffffff","#ffd25a",s.lamp),v.ink,2),h.strokeStyle=v.ink,h.lineWidth=1.5,h.beginPath(),h.moveTo(F-9,G-9),h.lineTo(F+9,G+9),h.moveTo(F+9,G-9),h.lineTo(F-9,G+9),h.stroke(),h.restore(),X(h,"10 m of wire",(S+A)/2,R-8,{size:11,color:v.ink3,align:"center"})}}),d=tt(i),c=zt(d,"Close the switch",()=>{s.closed=!s.closed,c.innerHTML=s.closed?"Open the switch":"Close the switch",u(),a.invalidate()},{name:"switch",kind:"primary"});rt(d,{options:[{label:"DC",value:"dc"},{label:"AC 50 Hz",value:"ac"}],value:"dc",onchange:h=>{s.mode=h,u()}}),Ie(d,{label:"Current",min:.5,max:16,step:.5,value:s.I,color:v.electron,fmt:h=>h.toFixed(1)+" A",oninput:h=>{s.I=h,u()}});let p=ct(i);function u(){let h=s.I/(85e27*n*t),f=1/h,y=h*Math.SQRT2/(2*Math.PI*50),m=10/(.7*3e8);p.innerHTML=s.mode==="dc"?`Drift speed in 1.5 mm\xB2 copper: <b>${(h*1e3).toFixed(2)} mm/s</b> \u2014 about <b>${(f/60).toFixed(0)} minutes</b> to crawl one metre. The field that pushes them reaches a lamp 10 m away in roughly <b>${(m*1e9).toFixed(0)} ns</b>.`:`With 50 Hz AC the electrons never get anywhere: they shuffle back and forth by about <b>${(y*1e6).toFixed(1)} \xB5m</b>, a hundred times a second.`}u()}function Zh(i){let e={V:12,R:12,s:0},t=46,n=Array.from({length:t},(a,d)=>d/t),s=new Qe(i,{label:"A circuit unrolled into a landscape: the battery lifts charges up, the lamp lets them down",height:a=>Math.max(260,Math.min(360,a*.45)),animated:!0,step(a){e.s=(e.s+a*(e.V/e.R)*.12)%1},draw(a,d,c){let u=d-30,h=c-46,y=(c-110)/24,m=h-e.V*y,g=A=>40+A*(u-40),M=A=>A<.18?Xt(h,m,A/.18):A<.52?m:A<.82?Xt(m,h,(A-.52)/.3):h;a.save(),a.beginPath(),a.moveTo(g(0),h);for(let A=0;A<=200;A++){let R=A/200;a.lineTo(g(R),M(R))}a.lineTo(g(1),h+20),a.lineTo(g(0),h+20),a.closePath();let _=a.createLinearGradient(0,m,0,h+20);_.addColorStop(0,St(v.field,.75)),_.addColorStop(1,St(v.electron,.85)),a.fillStyle=_,a.fill(),a.restore();let x=[];for(let A=0;A<=200;A++){let R=A/200;x.push([g(R),M(R)])}$e(a,x,v.ink2,2),X(a,"battery",g(.09),h+38,{size:12,color:v.ink2,align:"center",weight:550}),X(a,"wire",g(.35),h+38,{size:12,color:v.ink3,align:"center"}),X(a,"lamp",g(.67),h+38,{size:12,color:v.ink2,align:"center",weight:550}),X(a,"wire",g(.91),h+38,{size:12,color:v.ink3,align:"center"}),a.save(),a.strokeStyle=se(v.ink,.25),a.lineWidth=1;for(let A=0;A<8;A++){let R=(A/8+e.s*3)%1*.18;a.beginPath(),a.moveTo(g(R),M(R)+3),a.lineTo(g(R),h+20),a.stroke()}a.restore();let T=e.V*e.V/e.R,w=Ae(T/30,0,1),E=g(.67),b=M(.67)-34,S=a.createRadialGradient(E,b,2,E,b,70);S.addColorStop(0,se("#ffcf4d",.85*w)),S.addColorStop(1,se("#ffcf4d",0)),a.fillStyle=S,a.beginPath(),a.arc(E,b,70,0,7),a.fill(),Ce(a,E,b,11,Ot("#ffffff","#ffcf4d",w),v.ink2,1.5),Me(a,26,h,26,m,v.ink3,1),Me(a,22,m,30,m,v.ink3,1),Me(a,22,h,30,h,v.ink3,1),X(a,e.V.toFixed(1)+" V",36,(m+h)/2-2,{size:12,color:v.field,weight:600});for(let A of n){let R=(A+e.s)%1;Ce(a,g(R),M(R)-6,4.2,v.electron,"#fff",1.2)}X(a,"height = energy per unit of charge (volts)",u,22,{size:12,color:v.ink3,align:"right"}),X(a,"spacing & speed of dots = flow of charge (amps)",u,40,{size:12,color:v.ink3,align:"right"})}}),r=tt(i),l=ct(i),o=()=>{let a=e.V/e.R,d=e.V*a;l.innerHTML=`I = V / R = <b>${a.toFixed(2)} A</b> &nbsp;\xB7&nbsp; power delivered to the lamp P = V \xD7 I = <b>${d.toFixed(1)} W</b>`,s.invalidate()};Ie(r,{label:"Voltage",min:1,max:24,step:.5,value:e.V,color:v.field,fmt:a=>a.toFixed(1)+" V",oninput:a=>{e.V=a,o()}}),Ie(r,{label:"Lamp resistance",min:2,max:60,step:1,value:e.R,color:v.ink2,fmt:a=>a+" \u03A9",oninput:a=>{e.R=a,o()}}),o()}function Kh(i){let e=[{k:"led",label:"LED bulb",W:10},{k:"laptop",label:"Laptop",W:60},{k:"fridge",label:"Fridge",W:100},{k:"kettle",label:"Kettle",W:2e3},{k:"hp",label:"Heat pump",W:2500}],t={led:!0,laptop:!0,fridge:!0,kettle:!1,hp:!1},n=[],s=[],r=0,l=0,o=60,a=500,d={led:"#e2b33c",laptop:"#5b7fc0",fridge:"#5aa6a0",kettle:"#d8644a",hp:"#8a6bb8"},c=Object.fromEntries(e.map(_=>[_.k,0])),p=()=>e.map(_=>t[_.k]?_.W:0),u=()=>e.reduce((_,x)=>_+(t[x.k]?x.W:0),0);for(let _=0;_<o;_++)n.push(u()),s.push(p());for(let _=42;_<45;_++)n[_]+=2e3,s[_]=s[_].map((x,T)=>e[T].k==="kettle"?2e3:x);let h=new Qe(i,{label:"Power drawn over the last hour, with energy accumulating as the area under the curve",height:_=>Math.max(240,Math.min(320,_*.4)),animated:!0,step(_){l+=_,r+=u()/1e3*(_/60);for(let x of e)t[x.k]&&(c[x.k]+=x.W/1e3*(_/60));for(;l>=1;)l-=1,n.push(u()),s.push(p()),n.length>o&&(n.shift(),s.shift());n[n.length-1]=u(),s[s.length-1]=p()},draw(_,x,T){let w={l:52,r:x-150,t:28,b:T-34},E=[500,1e3,2e3,3e3,5e3,6e3].find(P=>P>=Math.max(...n)*1.15)||6e3;a=Math.abs(a-E)<5?E:a+(E-a)*.12;let b=E<=500?100:E<=1e3?250:E<=3e3?500:1e3,S=[];for(let P=0;P<=a+1;P+=b)S.push(P);let{sx:A,sy:R}=dt(_,{box:w,x0:-o,x1:0,y0:0,y1:a,yticks:S,yfmt:P=>P<1e3?P+" W":P/1e3+" kW",xticks:w.r-w.l<300?[-60,-30,0]:[-60,-45,-30,-15,0],xfmt:P=>P===0?"now":P+" min",ylabel:"power"});_.save(),_.beginPath(),_.moveTo(A(-o),R(0)),n.forEach((P,F)=>{let G=A(-o+F-l),z=A(-o+F+1-l);_.lineTo(Math.max(w.l,G),R(P)),_.lineTo(Math.max(w.l,z),R(P))}),_.lineTo(A(0),R(n[n.length-1])),_.lineTo(A(0),R(0)),_.closePath(),_.restore(),_.save(),_.beginPath(),_.rect(w.l,w.t-2,w.r-w.l,w.b-w.t+2),_.clip();let I=s.map(()=>0);e.forEach((P,F)=>{if(s.some(G=>G[F]>0)){_.beginPath(),s.forEach((G,z)=>{let V=Math.max(w.l,A(-o+z-l)),U=Math.max(w.l,A(-o+z+1-l));_.lineTo(V,R(I[z]+G[F])),_.lineTo(U,R(I[z]+G[F]))});for(let G=s.length-1;G>=0;G--){let z=Math.max(w.l,A(-o+G-l)),V=Math.max(w.l,A(-o+G+1-l));_.lineTo(V,R(I[G])),_.lineTo(z,R(I[G]))}_.closePath(),_.fillStyle=se(d[P.k],.55),_.fill(),s.forEach((G,z)=>{I[z]+=G[F]})}}),_.beginPath(),_.moveTo(A(-o),R(0)),n.forEach((P,F)=>{let G=A(-o+F-l),z=A(-o+F+1-l);_.lineTo(Math.max(w.l,G),R(P)),_.lineTo(Math.max(w.l,z),R(P))}),_.lineTo(A(0),R(n[n.length-1])),_.strokeStyle=v.ink2,_.lineWidth=1.6,_.stroke(),_.restore();{let P=0,F=s[s.length-1],G=1e9;e.forEach((z,V)=>{let U=F[V];if(!U)return;let H=R(P+U/2);P+=U,!(R(P-U)-R(P)<11||G-H<12)&&(G=H,X(_,z.label,A(0)-6,H+4,{size:10.5,weight:600,color:ot(d[z.k],.35),align:"right",halo:!0}))})}let O=3500/8760*1e3;Me(_,w.l,R(O),w.r,R(O),v.ink3,1,[4,4]),X(_,(w.r-w.l<330?"average household \u2248 ":"average German household (3,500 kWh/yr) \u2248 ")+O.toFixed(0)+" W",w.l+6,R(O)-6,{size:11,color:v.ink3,halo:!0});let D=x-130,L=34;if(He(_,D,L,118,92,10),_.fillStyle="#2f2d2a",_.fill(),X(_,"ENERGY USED",D+59,L+20,{size:10,color:"#bdb6a8",align:"center",weight:600}),X(_,r.toFixed(3),D+59,L+52,{size:24,color:"#f3efe6",align:"center",weight:600}),X(_,"kWh",D+59,L+72,{size:11,color:"#bdb6a8",align:"center"}),X(_,"right now",D+59,L+114,{size:11,color:v.ink3,align:"center"}),X(_,(u()/1e3).toFixed(2)+" kW",D+59,L+134,{size:18,color:v.ink,align:"center",weight:600}),r>1e-6&&T>220){let P=D,F=L+150;X(_,"energy by appliance",D,F-4,{size:9.5,color:v.ink3});let G=e.reduce((z,V)=>c[V.k]>c[z.k]?V:z);for(let z of e){let V=118*c[z.k]/r;V>.3&&(_.fillStyle=d[z.k],_.fillRect(P,F,V,9),P+=V)}X(_,`${G.label}: ${Math.round(c[G.k]/r*100)}%`,D,F+22,{size:10,color:ot(d[G.k],.35),weight:600})}X(_,"1 s here = 1 min",D+59,T-12,{size:10.5,color:v.ink3,align:"center"})}}),f=tt(i),y=document.createElement("div");y.className="ctl toggles",f.appendChild(y);for(let _ of e){let x=zt(y,`${_.label} <small>${_.W>=1e3?_.W/1e3+" kW":_.W+" W"}</small>`,()=>{t[_.k]=!t[_.k],x.setAttribute("aria-pressed",t[_.k]),h.invalidate()},{kind:"toggle",name:_.k});x.setAttribute("aria-pressed",t[_.k])}zt(f,"Reset meter",()=>{r=0;for(let _ in c)c[_]=0;h.invalidate()},{kind:"ghost"});let m=ct(i),g=-1,M=()=>{let _=u();if(_===g)return;g=_;let x=_*8.76;m.innerHTML=`Drawing <b>${_>=1e3?(_/1e3).toFixed(2)+" kW":_+" W"}</b> now. Left on for an hour that is <b>${(_/1e3).toFixed(2)} kWh</b>; all year it would be <b>${Math.round(x).toLocaleString("en")} kWh</b> \u2014 ${Math.round(x/3500*100)}% of a typical household\u2019s 3,500 kWh.`};f.addEventListener("click",()=>setTimeout(M,0)),M(),dn(i,"switch on the kettle and watch the meter speed up: the same 2 kW for an hour is 2 kWh.")}var jh="#c98a55",h0="#9a6236";function u0(i,e,t,n,s,r=0){i.save(),i.translate(e,t),i.rotate(r);let l=i.createLinearGradient(0,-s/2,0,s/2);l.addColorStop(0,St(v.north,.25)),l.addColorStop(1,ot(v.north,.12));let o=i.createLinearGradient(0,-s/2,0,s/2);o.addColorStop(0,St(v.south,.25)),o.addColorStop(1,ot(v.south,.12)),He(i,0,-s/2,n/2,s,4),i.fillStyle=l,i.fill(),He(i,-n/2,-s/2,n/2,s,4),i.fillStyle=o,i.fill(),X(i,"N",n/4,4.5,{size:13,color:"#fff",weight:650,align:"center"}),X(i,"S",-n/4,4.5,{size:13,color:"#fff",weight:650,align:"center"}),i.restore()}function d0(i,e=7){let t=[],n=[i*.8,0],s=[-i*.8,0];for(let r=0;r<e;r++){let l=(r+.5)/e*Math.PI,o=[n[0]+Math.cos(l-Math.PI/2+Math.PI/2)*4,0];o=[n[0]+5*Math.cos(l*.999-0),5*Math.sin(l)];let a=[o.slice()];for(let d=0;d<900;d++){let c=o[0]-n[0],p=o[1]-n[1],u=c*c+p*p,h=o[0]-s[0],f=o[1]-s[1],y=h*h+f*f,m=c/u-h/y,g=p/u-f/y,M=Math.hypot(m,g)||1;if(m/=M,g/=M,o=[o[0]+m*2.5,o[1]+g*2.5],a.push(o.slice()),Math.hypot(o[0]-s[0],o[1]-s[1])<6||Math.abs(o[0])>600||Math.abs(o[1])>400)break}t.push(a),t.push(a.map(([d,c])=>[d,-c]))}return t}function Qh(i){let e={x:-1,vx:0,auto:!0,t:0,emf:0,phi:0,dragging:!1,hist:new Array(360).fill(0),flow:0},t=7,n=c=>{let p=0;for(let u=0;u<t;u++){let h=(u/(t-1)-.5)*.38,f=(c-h)/.16;p+=1/Math.pow(1+f*f,1.5)}return p/t},s=null,r=0,l={};new Qe(i,{label:"A bar magnet that can be dragged through a coil of wire, with a meter and a trace of the induced voltage",height:c=>Math.max(320,Math.min(440,c*.56)),animated:!0,step(c){e.t+=c;let p=e.phi;if(!e.dragging&&e.auto){let h=Math.sin(e.t*1.4)*1.05;e.x=h}e.phi=n(e.x);let u=-(e.phi-p)/c*.55;e.emf=vi(e.emf,Ae(u,-1.4,1.4),25,c),e.flow+=e.emf*c*3,e.hist.push(e.emf),e.hist.length>360&&e.hist.shift()},onResize(c,p){s=null},draw(c,p,u){let h=p/2,f=u*.33,y=p*.42,m=Math.min(170,p*.26),g=30,M=y*.38*2*.5,_=Math.min(56,u*.13);l={cx:h,cy:f,span:y,magLen:m,magT:g};let x=h+e.x*y;(!s||r!==m/2)&&(s=d0(m/2,6),r=m/2),c.save(),c.beginPath(),c.rect(0,0,p,u*.62-56),c.clip(),c.translate(x,f);{let L=Math.max(40,Math.min(f-4,u*.62-56-f)),P=c.createRadialGradient(0,0,0,0,0,L);P.addColorStop(0,se(v.ink3,.42)),P.addColorStop(.7,se(v.ink3,.34)),P.addColorStop(1,se(v.ink3,0)),c.strokeStyle=P}c.lineWidth=1;for(let L of s)c.beginPath(),L.forEach(([P,F],G)=>G?c.lineTo(P,F):c.moveTo(P,F)),c.stroke();c.restore();let T=L=>h+(L/(t-1)-.5)*.38*y,w=L=>{for(let P=0;P<t;P++){let F=T(P);c.beginPath(),c.ellipse(F,f,_*.32,_,0,L?-Math.PI/2:Math.PI/2,L?Math.PI/2:Math.PI*1.5),c.strokeStyle=L?jh:h0,c.lineWidth=5,c.lineCap="round",c.stroke()}};w(!1),u0(c,x,f,m,g),w(!0);let E=e.emf;if(Math.abs(E)>.01)for(let L=0;L<t;L++){let P=T(L);for(let F=0;F<3;F++){let G=-Math.PI/2+((F/3+e.flow)%1+1)%1*Math.PI;Ce(c,P+Math.cos(G)*_*.32,f+Math.sin(G)*_,2.4,se(v.electron,Ae(Math.abs(E)*1.5,.2,1)))}}let b=h-y*.55,S=u*.62;c.strokeStyle=jh,c.lineWidth=3,c.beginPath(),c.moveTo(T(0),f+_),c.lineTo(T(0),S-10),c.lineTo(b+40,S-10),c.stroke(),c.beginPath(),c.moveTo(T(t-1),f+_),c.lineTo(T(t-1),S+6),c.lineTo(b+40,S+6),c.stroke();let A=Math.min(48,p*.07);Ce(c,b,S,A+4,"#fff",v.grid2,1.5),c.save(),c.strokeStyle=v.ink3,c.lineWidth=1;for(let L=-4;L<=4;L++){let P=-Math.PI/2+L*.22;c.beginPath(),c.moveTo(b+Math.cos(P)*A*.78,S+8+Math.sin(P)*A*.78),c.lineTo(b+Math.cos(P)*A*.92,S+8+Math.sin(P)*A*.92),c.stroke()}c.restore();let R=-Math.PI/2+Ae(e.emf,-1.2,1.2)*.75;Me(c,b,S+8,b+Math.cos(R)*A*.86,S+8+Math.sin(R)*A*.86,v.field,2.5),Ce(c,b,S+8,3.5,v.ink),X(c,"meter",b,S+A+22,{size:11,color:v.ink3,align:"center"});let I={l:b+A+70,r:p-18,t:S-44,b:u-26},{sx:O,sy:D}=dt(c,{box:I,x0:0,x1:360,y0:-1.4,y1:1.4,yticks:[0],xticks:[],yfmt:()=>"0"});X(c,"induced voltage",I.l+4,I.t+4,{size:11,color:v.field,weight:550}),$e(c,e.hist.map((L,P)=>[O(P+360-e.hist.length),D(L)]),v.field,2),X(c,"time \u2192",I.r,I.b+16,{size:11,color:v.ink3,align:"right"}),!e.auto&&!e.dragging&&X(c,"drag the magnet \u2194",x,f-g-14,{size:12,color:v.ink2,align:"center",weight:550,halo:!0})}}).interact({hit:(c,p)=>{let u=l,h=u.cx+e.x*u.span;return Math.abs(c-h)<u.magLen/2+10&&Math.abs(p-u.cy)<u.magT?"mag":null},down:(c,p)=>{e.dragging=!0,e.auto=!1,d.set("drag"),e.off=p-(l.cx+e.x*l.span)},move:(c,p)=>{e.x=Ae((p-e.off-l.cx)/l.span,-1.25,1.25)},up:()=>{e.dragging=!1}});let a=tt(i),d=rt(a,{options:[{label:"Wave it for me",value:"auto"},{label:"I\u2019ll drag it",value:"drag"}],value:"auto",onchange:c=>{e.auto=c==="auto",e.t=Math.asin(Ae(e.x/1.05,-1,1))/1.4}})}var Au=0,fc=1,Ru=2;var Rr=1,Cu=2,Ls=3,Li=0,un=1,Qn=2,ei=0,Ds=1,pc=2,mc=3,gc=4,Pu=5;var Zi=100,Iu=101,Lu=102,Du=103,Nu=104,Uu=200,Fu=201,ku=202,Ou=203,yc=204,_c=205,Bu=206,zu=207,Gu=208,Wu=209,Vu=210,Hu=211,$u=212,Xu=213,qu=214,Aa=0,Ra=1,Ca=2,ys=3,Pa=4,Ia=5,La=6,Da=7,vc=0,Yu=1,Ju=2,Bn=0,bc=1,Mc=2,xc=3,Cr=4,Sc=5,wc=6,Tc=7;var Ec=300,Di=301,Ki=302,uo=303,fo=304,Pr=306,Na=1e3,Jn=1001,Ua=1002,Yt=1003,Zu=1004;var Ir=1005;var Kt=1006,po=1007;var Ni=1008;var mn=1009,Ac=1010,Rc=1011,Ns=1012,mo=1013,zn=1014,Gn=1015,Wn=1016,go=1017,yo=1018,Us=1020,Cc=35902,Pc=35899,Ic=1021,Lc=1022,Rn=1023,Zn=1026,Ui=1027,Dc=1028,_o=1029,Fi=1030,vo=1031;var bo=1033,Lr=33776,Dr=33777,Nr=33778,Ur=33779,Mo=35840,xo=35841,So=35842,wo=35843,To=36196,Eo=37492,Ao=37496,Ro=37488,Co=37489,Fr=37490,Po=37491,Io=37808,Lo=37809,Do=37810,No=37811,Uo=37812,Fo=37813,ko=37814,Oo=37815,Bo=37816,zo=37817,Go=37818,Wo=37819,Vo=37820,Ho=37821,$o=36492,Xo=36494,qo=36495,Yo=36283,Jo=36284,kr=36285,Zo=36286;var nr=2300,Fa=2301,Ta=2302,ic=2303,sc=2400,rc=2401,ac=2402;var Ku=3200;var Ko=0,ju=1,fi="",cn="srgb",ir="srgb-linear",sr="linear",Mt="srgb";var Ea=7680;var Qu=519,ed=512,td=513,nd=514,jo=515,id=516,sd=517,Qo=518,rd=519,ad=35044;var Nc="300 es",Un=2e3,_s=2001;function f0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function p0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function rr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function od(){let i=rr("canvas");return i.style.display="block",i}var eu={},vs=null;function Uc(...i){let e="THREE."+i.shift();vs?vs("log",e,...i):console.log(e,...i)}function ld(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function it(...i){i=ld(i);let e="THREE."+i.shift();if(vs)vs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function st(...i){i=ld(i);let e="THREE."+i.shift();if(vs)vs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function $i(...i){let e=i.join(" ");e in eu||(eu[e]=!0,it(...i))}function cd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var hd={[Aa]:Ra,[Ca]:La,[Pa]:Da,[ys]:Ia,[Ra]:Aa,[La]:Ca,[Da]:Pa,[Ia]:ys},Kn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,l=s.length;r<l;r++)s[r].call(this,e);e.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Il=Math.PI/180,ka=180/Math.PI;function Fs(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function gt(i,e,t){return Math.max(e,Math.min(t,i))}function m0(i,e){return(i%e+e)%e}function Ll(i,e,t){return(1-t)*i+t*e}function Ys(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function fn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Gc=class Gc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,l=this.y-e.y;return this.x=r*n-l*s+e.x,this.y=r*s+l*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Gc.prototype.isVector2=!0;var Le=Gc,jn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,l,o){let a=n[s+0],d=n[s+1],c=n[s+2],p=n[s+3],u=r[l+0],h=r[l+1],f=r[l+2],y=r[l+3];if(p!==y||a!==u||d!==h||c!==f){let m=a*u+d*h+c*f+p*y;m<0&&(u=-u,h=-h,f=-f,y=-y,m=-m);let g=1-o;if(m<.9995){let M=Math.acos(m),_=Math.sin(M);g=Math.sin(g*M)/_,o=Math.sin(o*M)/_,a=a*g+u*o,d=d*g+h*o,c=c*g+f*o,p=p*g+y*o}else{a=a*g+u*o,d=d*g+h*o,c=c*g+f*o,p=p*g+y*o;let M=1/Math.sqrt(a*a+d*d+c*c+p*p);a*=M,d*=M,c*=M,p*=M}}e[t]=a,e[t+1]=d,e[t+2]=c,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,s,r,l){let o=n[s],a=n[s+1],d=n[s+2],c=n[s+3],p=r[l],u=r[l+1],h=r[l+2],f=r[l+3];return e[t]=o*f+c*p+a*h-d*u,e[t+1]=a*f+c*u+d*p-o*h,e[t+2]=d*f+c*h+o*u-a*p,e[t+3]=c*f-o*p-a*u-d*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,l=e._order,o=Math.cos,a=Math.sin,d=o(n/2),c=o(s/2),p=o(r/2),u=a(n/2),h=a(s/2),f=a(r/2);switch(l){case"XYZ":this._x=u*c*p+d*h*f,this._y=d*h*p-u*c*f,this._z=d*c*f+u*h*p,this._w=d*c*p-u*h*f;break;case"YXZ":this._x=u*c*p+d*h*f,this._y=d*h*p-u*c*f,this._z=d*c*f-u*h*p,this._w=d*c*p+u*h*f;break;case"ZXY":this._x=u*c*p-d*h*f,this._y=d*h*p+u*c*f,this._z=d*c*f+u*h*p,this._w=d*c*p-u*h*f;break;case"ZYX":this._x=u*c*p-d*h*f,this._y=d*h*p+u*c*f,this._z=d*c*f-u*h*p,this._w=d*c*p+u*h*f;break;case"YZX":this._x=u*c*p+d*h*f,this._y=d*h*p+u*c*f,this._z=d*c*f-u*h*p,this._w=d*c*p-u*h*f;break;case"XZY":this._x=u*c*p-d*h*f,this._y=d*h*p-u*c*f,this._z=d*c*f+u*h*p,this._w=d*c*p+u*h*f;break;default:it("Quaternion: .setFromEuler() encountered an unknown order: "+l)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],l=t[1],o=t[5],a=t[9],d=t[2],c=t[6],p=t[10],u=n+o+p;if(u>0){let h=.5/Math.sqrt(u+1);this._w=.25/h,this._x=(c-a)*h,this._y=(r-d)*h,this._z=(l-s)*h}else if(n>o&&n>p){let h=2*Math.sqrt(1+n-o-p);this._w=(c-a)/h,this._x=.25*h,this._y=(s+l)/h,this._z=(r+d)/h}else if(o>p){let h=2*Math.sqrt(1+o-n-p);this._w=(r-d)/h,this._x=(s+l)/h,this._y=.25*h,this._z=(a+c)/h}else{let h=2*Math.sqrt(1+p-n-o);this._w=(l-s)/h,this._x=(r+d)/h,this._y=(a+c)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,l=e._w,o=t._x,a=t._y,d=t._z,c=t._w;return this._x=n*c+l*o+s*d-r*a,this._y=s*c+l*a+r*o-n*d,this._z=r*c+l*d+n*a-s*o,this._w=l*c-n*o-s*a-r*d,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,l=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,l=-l,o=-o);let a=1-t;if(o<.9995){let d=Math.acos(o),c=Math.sin(d);a=Math.sin(a*d)/c,t=Math.sin(t*d)/c,this._x=this._x*a+n*t,this._y=this._y*a+s*t,this._z=this._z*a+r*t,this._w=this._w*a+l*t,this._onChangeCallback()}else this._x=this._x*a+n*t,this._y=this._y*a+s*t,this._z=this._z*a+r*t,this._w=this._w*a+l*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Wc=class Wc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,l=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*l,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*l,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*l,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,l=e.y,o=e.z,a=e.w,d=2*(l*s-o*n),c=2*(o*t-r*s),p=2*(r*n-l*t);return this.x=t+a*d+l*p-o*c,this.y=n+a*c+o*d-r*p,this.z=s+a*p+r*c-l*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,l=t.x,o=t.y,a=t.z;return this.x=s*a-r*o,this.y=r*l-n*a,this.z=n*o-s*l,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Dl.copy(this).projectOnVector(e),this.sub(Dl)}reflect(e){return this.sub(Dl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Wc.prototype.isVector3=!0;var te=Wc,Dl=new te,tu=new jn,Vc=class Vc{constructor(e,t,n,s,r,l,o,a,d){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,l,o,a,d)}set(e,t,n,s,r,l,o,a,d){let c=this.elements;return c[0]=e,c[1]=s,c[2]=o,c[3]=t,c[4]=r,c[5]=a,c[6]=n,c[7]=l,c[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,l=n[0],o=n[3],a=n[6],d=n[1],c=n[4],p=n[7],u=n[2],h=n[5],f=n[8],y=s[0],m=s[3],g=s[6],M=s[1],_=s[4],x=s[7],T=s[2],w=s[5],E=s[8];return r[0]=l*y+o*M+a*T,r[3]=l*m+o*_+a*w,r[6]=l*g+o*x+a*E,r[1]=d*y+c*M+p*T,r[4]=d*m+c*_+p*w,r[7]=d*g+c*x+p*E,r[2]=u*y+h*M+f*T,r[5]=u*m+h*_+f*w,r[8]=u*g+h*x+f*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],l=e[4],o=e[5],a=e[6],d=e[7],c=e[8];return t*l*c-t*o*d-n*r*c+n*o*a+s*r*d-s*l*a}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],l=e[4],o=e[5],a=e[6],d=e[7],c=e[8],p=c*l-o*d,u=o*a-c*r,h=d*r-l*a,f=t*p+n*u+s*h;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/f;return e[0]=p*y,e[1]=(s*d-c*n)*y,e[2]=(o*n-s*l)*y,e[3]=u*y,e[4]=(c*t-s*a)*y,e[5]=(s*r-o*t)*y,e[6]=h*y,e[7]=(n*a-d*t)*y,e[8]=(l*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,l,o){let a=Math.cos(r),d=Math.sin(r);return this.set(n*a,n*d,-n*(a*l+d*o)+l+e,-s*d,s*a,-s*(-d*l+a*o)+o+t,0,0,1),this}scale(e,t){return $i("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Nl.makeScale(e,t)),this}rotate(e){return $i("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Nl.makeRotation(-e)),this}translate(e,t){return $i("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Nl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Vc.prototype.isMatrix3=!0;var lt=Vc,Nl=new lt,nu=new lt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),iu=new lt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function g0(){let i={enabled:!0,workingColorSpace:ir,spaces:{},convert:function(s,r,l){return this.enabled===!1||r===l||!r||!l||(this.spaces[r].transfer===Mt&&(s.r=ui(s.r),s.g=ui(s.g),s.b=ui(s.b)),this.spaces[r].primaries!==this.spaces[l].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[l].fromXYZ)),this.spaces[l].transfer===Mt&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===fi?sr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,l){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[l].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return $i("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return $i("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ir]:{primaries:e,whitePoint:n,transfer:sr,toXYZ:nu,fromXYZ:iu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:cn},outputColorSpaceConfig:{drawingBufferColorSpace:cn}},[cn]:{primaries:e,whitePoint:n,transfer:Mt,toXYZ:nu,fromXYZ:iu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:cn}}}),i}var yt=g0();function ui(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var is,Oa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{is===void 0&&(is=rr("canvas")),is.width=e.width,is.height=e.height;let s=is.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=is}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=rr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let l=0;l<r.length;l++)r[l]=ui(r[l]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ui(t[n]/255)*255):t[n]=ui(t[n]);return{data:t,width:e.width,height:e.height}}else return it("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},y0=0,bs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:y0++}),this.uuid=Fs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let l=0,o=s.length;l<o;l++)s[l].isDataTexture?r.push(Ul(s[l].image)):r.push(Ul(s[l]))}else r=Ul(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ul(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Oa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(it("Texture: Unable to serialize Texture."),{})}var _0=0,Fl=new te,hn=class i extends Kn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Jn,s=Jn,r=Kt,l=Ni,o=Rn,a=mn,d=i.DEFAULT_ANISOTROPY,c=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_0++}),this.uuid=Fs(),this.name="",this.source=new bs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=l,this.anisotropy=d,this.format=o,this.internalFormat=null,this.type=a,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fl).x}get height(){return this.source.getSize(Fl).y}get depth(){return this.source.getSize(Fl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){it(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){it(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ec)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Na:e.x=e.x-Math.floor(e.x);break;case Jn:e.x=e.x<0?0:1;break;case Ua:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Na:e.y=e.y-Math.floor(e.y);break;case Jn:e.y=e.y<0?0:1;break;case Ua:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=Ec;hn.DEFAULT_ANISOTROPY=1;var Hc=class Hc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,l=e.elements;return this.x=l[0]*t+l[4]*n+l[8]*s+l[12]*r,this.y=l[1]*t+l[5]*n+l[9]*s+l[13]*r,this.z=l[2]*t+l[6]*n+l[10]*s+l[14]*r,this.w=l[3]*t+l[7]*n+l[11]*s+l[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,a=e.elements,d=a[0],c=a[4],p=a[8],u=a[1],h=a[5],f=a[9],y=a[2],m=a[6],g=a[10];if(Math.abs(c-u)<.01&&Math.abs(p-y)<.01&&Math.abs(f-m)<.01){if(Math.abs(c+u)<.1&&Math.abs(p+y)<.1&&Math.abs(f+m)<.1&&Math.abs(d+h+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(d+1)/2,x=(h+1)/2,T=(g+1)/2,w=(c+u)/4,E=(p+y)/4,b=(f+m)/4;return _>x&&_>T?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=w/n,r=E/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=w/s,r=b/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=E/r,s=b/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-f)*(m-f)+(p-y)*(p-y)+(u-c)*(u-c));return Math.abs(M)<.001&&(M=1),this.x=(m-f)/M,this.y=(p-y)/M,this.z=(u-c)/M,this.w=Math.acos((d+h+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this.w=gt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this.w=gt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Hc.prototype.isVector4=!0;var Dt=Hc,Ba=class extends Kn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new hn(s),l=n.count;for(let o=0;o<l;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new bs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},pn=class extends Ba{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ar=class extends hn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var za=class extends hn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ho=class ho{constructor(e,t,n,s,r,l,o,a,d,c,p,u,h,f,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,l,o,a,d,c,p,u,h,f,y,m)}set(e,t,n,s,r,l,o,a,d,c,p,u,h,f,y,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=l,g[9]=o,g[13]=a,g[2]=d,g[6]=c,g[10]=p,g[14]=u,g[3]=h,g[7]=f,g[11]=y,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ho().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/ss.setFromMatrixColumn(e,0).length(),r=1/ss.setFromMatrixColumn(e,1).length(),l=1/ss.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*l,t[9]=n[9]*l,t[10]=n[10]*l,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,l=Math.cos(n),o=Math.sin(n),a=Math.cos(s),d=Math.sin(s),c=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){let u=l*c,h=l*p,f=o*c,y=o*p;t[0]=a*c,t[4]=-a*p,t[8]=d,t[1]=h+f*d,t[5]=u-y*d,t[9]=-o*a,t[2]=y-u*d,t[6]=f+h*d,t[10]=l*a}else if(e.order==="YXZ"){let u=a*c,h=a*p,f=d*c,y=d*p;t[0]=u+y*o,t[4]=f*o-h,t[8]=l*d,t[1]=l*p,t[5]=l*c,t[9]=-o,t[2]=h*o-f,t[6]=y+u*o,t[10]=l*a}else if(e.order==="ZXY"){let u=a*c,h=a*p,f=d*c,y=d*p;t[0]=u-y*o,t[4]=-l*p,t[8]=f+h*o,t[1]=h+f*o,t[5]=l*c,t[9]=y-u*o,t[2]=-l*d,t[6]=o,t[10]=l*a}else if(e.order==="ZYX"){let u=l*c,h=l*p,f=o*c,y=o*p;t[0]=a*c,t[4]=f*d-h,t[8]=u*d+y,t[1]=a*p,t[5]=y*d+u,t[9]=h*d-f,t[2]=-d,t[6]=o*a,t[10]=l*a}else if(e.order==="YZX"){let u=l*a,h=l*d,f=o*a,y=o*d;t[0]=a*c,t[4]=y-u*p,t[8]=f*p+h,t[1]=p,t[5]=l*c,t[9]=-o*c,t[2]=-d*c,t[6]=h*p+f,t[10]=u-y*p}else if(e.order==="XZY"){let u=l*a,h=l*d,f=o*a,y=o*d;t[0]=a*c,t[4]=-p,t[8]=d*c,t[1]=u*p+y,t[5]=l*c,t[9]=h*p-f,t[2]=f*p-h,t[6]=o*c,t[10]=y*p+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(v0,e,b0)}lookAt(e,t,n){let s=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),bi.crossVectors(n,vn),bi.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),bi.crossVectors(n,vn)),bi.normalize(),sa.crossVectors(vn,bi),s[0]=bi.x,s[4]=sa.x,s[8]=vn.x,s[1]=bi.y,s[5]=sa.y,s[9]=vn.y,s[2]=bi.z,s[6]=sa.z,s[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,l=n[0],o=n[4],a=n[8],d=n[12],c=n[1],p=n[5],u=n[9],h=n[13],f=n[2],y=n[6],m=n[10],g=n[14],M=n[3],_=n[7],x=n[11],T=n[15],w=s[0],E=s[4],b=s[8],S=s[12],A=s[1],R=s[5],I=s[9],O=s[13],D=s[2],L=s[6],P=s[10],F=s[14],G=s[3],z=s[7],V=s[11],U=s[15];return r[0]=l*w+o*A+a*D+d*G,r[4]=l*E+o*R+a*L+d*z,r[8]=l*b+o*I+a*P+d*V,r[12]=l*S+o*O+a*F+d*U,r[1]=c*w+p*A+u*D+h*G,r[5]=c*E+p*R+u*L+h*z,r[9]=c*b+p*I+u*P+h*V,r[13]=c*S+p*O+u*F+h*U,r[2]=f*w+y*A+m*D+g*G,r[6]=f*E+y*R+m*L+g*z,r[10]=f*b+y*I+m*P+g*V,r[14]=f*S+y*O+m*F+g*U,r[3]=M*w+_*A+x*D+T*G,r[7]=M*E+_*R+x*L+T*z,r[11]=M*b+_*I+x*P+T*V,r[15]=M*S+_*O+x*F+T*U,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],l=e[1],o=e[5],a=e[9],d=e[13],c=e[2],p=e[6],u=e[10],h=e[14],f=e[3],y=e[7],m=e[11],g=e[15],M=a*h-d*u,_=o*h-d*p,x=o*u-a*p,T=l*h-d*c,w=l*u-a*c,E=l*p-o*c;return t*(y*M-m*_+g*x)-n*(f*M-m*T+g*w)+s*(f*_-y*T+g*E)-r*(f*x-y*w+m*E)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],l=e[5],o=e[9],a=e[2],d=e[6],c=e[10];return t*(l*c-o*d)-n*(r*c-o*a)+s*(r*d-l*a)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],l=e[4],o=e[5],a=e[6],d=e[7],c=e[8],p=e[9],u=e[10],h=e[11],f=e[12],y=e[13],m=e[14],g=e[15],M=t*o-n*l,_=t*a-s*l,x=t*d-r*l,T=n*a-s*o,w=n*d-r*o,E=s*d-r*a,b=c*y-p*f,S=c*m-u*f,A=c*g-h*f,R=p*m-u*y,I=p*g-h*y,O=u*g-h*m,D=M*O-_*I+x*R+T*A-w*S+E*b;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let L=1/D;return e[0]=(o*O-a*I+d*R)*L,e[1]=(s*I-n*O-r*R)*L,e[2]=(y*E-m*w+g*T)*L,e[3]=(u*w-p*E-h*T)*L,e[4]=(a*A-l*O-d*S)*L,e[5]=(t*O-s*A+r*S)*L,e[6]=(m*x-f*E-g*_)*L,e[7]=(c*E-u*x+h*_)*L,e[8]=(l*I-o*A+d*b)*L,e[9]=(n*A-t*I-r*b)*L,e[10]=(f*w-y*x+g*M)*L,e[11]=(p*x-c*w-h*M)*L,e[12]=(o*S-l*R-a*b)*L,e[13]=(t*R-n*S+s*b)*L,e[14]=(y*_-f*T-m*M)*L,e[15]=(c*T-p*_+u*M)*L,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,l=e.x,o=e.y,a=e.z,d=r*l,c=r*o;return this.set(d*l+n,d*o-s*a,d*a+s*o,0,d*o+s*a,c*o+n,c*a-s*l,0,d*a-s*o,c*a+s*l,r*a*a+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,l){return this.set(1,n,r,0,e,1,l,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,l=t._y,o=t._z,a=t._w,d=r+r,c=l+l,p=o+o,u=r*d,h=r*c,f=r*p,y=l*c,m=l*p,g=o*p,M=a*d,_=a*c,x=a*p,T=n.x,w=n.y,E=n.z;return s[0]=(1-(y+g))*T,s[1]=(h+x)*T,s[2]=(f-_)*T,s[3]=0,s[4]=(h-x)*w,s[5]=(1-(u+g))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(f+_)*E,s[9]=(m-M)*E,s[10]=(1-(u+y))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let l=ss.set(s[0],s[1],s[2]).length(),o=ss.set(s[4],s[5],s[6]).length(),a=ss.set(s[8],s[9],s[10]).length();r<0&&(l=-l),In.copy(this);let d=1/l,c=1/o,p=1/a;return In.elements[0]*=d,In.elements[1]*=d,In.elements[2]*=d,In.elements[4]*=c,In.elements[5]*=c,In.elements[6]*=c,In.elements[8]*=p,In.elements[9]*=p,In.elements[10]*=p,t.setFromRotationMatrix(In),n.x=l,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,l,o=Un,a=!1){let d=this.elements,c=2*r/(t-e),p=2*r/(n-s),u=(t+e)/(t-e),h=(n+s)/(n-s),f,y;if(a)f=r/(l-r),y=l*r/(l-r);else if(o===Un)f=-(l+r)/(l-r),y=-2*l*r/(l-r);else if(o===_s)f=-l/(l-r),y=-l*r/(l-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return d[0]=c,d[4]=0,d[8]=u,d[12]=0,d[1]=0,d[5]=p,d[9]=h,d[13]=0,d[2]=0,d[6]=0,d[10]=f,d[14]=y,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,t,n,s,r,l,o=Un,a=!1){let d=this.elements,c=2/(t-e),p=2/(n-s),u=-(t+e)/(t-e),h=-(n+s)/(n-s),f,y;if(a)f=1/(l-r),y=l/(l-r);else if(o===Un)f=-2/(l-r),y=-(l+r)/(l-r);else if(o===_s)f=-1/(l-r),y=-r/(l-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return d[0]=c,d[4]=0,d[8]=0,d[12]=u,d[1]=0,d[5]=p,d[9]=0,d[13]=h,d[2]=0,d[6]=0,d[10]=f,d[14]=y,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ho.prototype.isMatrix4=!0;var Lt=ho,ss=new te,In=new Lt,v0=new te(0,0,0),b0=new te(1,1,1),bi=new te,sa=new te,vn=new te,su=new Lt,ru=new jn,di=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],l=s[4],o=s[8],a=s[1],d=s[5],c=s[9],p=s[2],u=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,h),this._z=Math.atan2(-l,r)):(this._x=Math.atan2(u,d),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(a,d)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(gt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,h),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(a,r));break;case"ZYX":this._y=Math.asin(-gt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,h),this._z=Math.atan2(a,r)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,d),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(u,d),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,h),this._y=0);break;default:it("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return su.makeRotationFromQuaternion(e),this.setFromRotationMatrix(su,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ru.setFromEuler(this),this.setFromQuaternion(ru,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};di.DEFAULT_ORDER="XYZ";var or=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},M0=0,au=new te,rs=new jn,ai=new Lt,ra=new te,Js=new te,x0=new te,S0=new jn,ou=new te(1,0,0),lu=new te(0,1,0),cu=new te(0,0,1),hu={type:"added"},w0={type:"removed"},as={type:"childadded",child:null},kl={type:"childremoved",child:null},sn=class i extends Kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=Fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new te,t=new di,n=new jn,s=new te(1,1,1);function r(){n.setFromEuler(t,!1)}function l(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Lt},normalMatrix:{value:new lt}}),this.matrix=new Lt,this.matrixWorld=new Lt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new or,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(ou,e)}rotateY(e){return this.rotateOnAxis(lu,e)}rotateZ(e){return this.rotateOnAxis(cu,e)}translateOnAxis(e,t){return au.copy(e).applyQuaternion(this.quaternion),this.position.add(au.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ou,e)}translateY(e){return this.translateOnAxis(lu,e)}translateZ(e){return this.translateOnAxis(cu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ra.copy(e):ra.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(Js,ra,this.up):ai.lookAt(ra,Js,this.up),this.quaternion.setFromRotationMatrix(ai),s&&(ai.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(ai),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(st("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hu),as.child=e,this.dispatchEvent(as),as.child=null):st("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(w0),kl.child=e,this.dispatchEvent(kl),kl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hu),as.child=e,this.dispatchEvent(as),as.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let l=this.children[n].getObjectByProperty(e,t);if(l!==void 0)return l}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,l=s.length;r<l;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,e,x0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,S0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let l=0,o=r.length;l<o;l++)r[l].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,a){return o[a.uuid]===void 0&&(o[a.uuid]=a.toJSON(e)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let a=o.shapes;if(Array.isArray(a))for(let d=0,c=a.length;d<c;d++){let p=a[d];r(e.shapes,p)}else r(e.shapes,a)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let a=0,d=this.material.length;a<d;a++)o.push(r(e.materials,this.material[a]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let a=this.animations[o];s.animations.push(r(e.animations,a))}}if(t){let o=l(e.geometries),a=l(e.materials),d=l(e.textures),c=l(e.images),p=l(e.shapes),u=l(e.skeletons),h=l(e.animations),f=l(e.nodes);o.length>0&&(n.geometries=o),a.length>0&&(n.materials=a),d.length>0&&(n.textures=d),c.length>0&&(n.images=c),p.length>0&&(n.shapes=p),u.length>0&&(n.skeletons=u),h.length>0&&(n.animations=h),f.length>0&&(n.nodes=f)}return n.object=s,n;function l(o){let a=[];for(let d in o){let c=o[d];delete c.metadata,a.push(c)}return a}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};sn.DEFAULT_UP=new te(0,1,0);sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Fn=class extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}},T0={type:"move"},Ms=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new te,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new te),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new te,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new te,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,l=null,o=this._targetRay,a=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){l=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),g=this._getHandJoint(d,y);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let c=d.joints["index-finger-tip"],p=d.joints["thumb-tip"],u=c.position.distanceTo(p.position),h=.02,f=.005;d.inputState.pinching&&u>h+f?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&u<=h-f&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else a!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,a.eventsEnabled&&a.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(T0)))}return o!==null&&(o.visible=s!==null),a!==null&&(a.visible=r!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Fn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ud={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},aa={h:0,s:0,l:0};function Ol(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ut=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,yt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=yt.workingColorSpace){return this.r=e,this.g=t,this.b=n,yt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=yt.workingColorSpace){if(e=m0(e,1),t=gt(t,0,1),n=gt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,l=2*n-r;this.r=Ol(l,r,e+1/3),this.g=Ol(l,r,e),this.b=Ol(l,r,e-1/3)}return yt.colorSpaceToWorking(this,s),this}setStyle(e,t=cn){function n(r){r!==void 0&&parseFloat(r)<1&&it("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,l=s[1],o=s[2];switch(l){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:it("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],l=r.length;if(l===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(l===6)return this.setHex(parseInt(r,16),t);it("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=cn){let n=ud[e.toLowerCase()];return n!==void 0?this.setHex(n,t):it("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=gs(e.r),this.g=gs(e.g),this.b=gs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=cn){return yt.workingToColorSpace(tn.copy(this),e),Math.round(gt(tn.r*255,0,255))*65536+Math.round(gt(tn.g*255,0,255))*256+Math.round(gt(tn.b*255,0,255))}getHexString(e=cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=yt.workingColorSpace){yt.workingToColorSpace(tn.copy(this),t);let n=tn.r,s=tn.g,r=tn.b,l=Math.max(n,s,r),o=Math.min(n,s,r),a,d,c=(o+l)/2;if(o===l)a=0,d=0;else{let p=l-o;switch(d=c<=.5?p/(l+o):p/(2-l-o),l){case n:a=(s-r)/p+(s<r?6:0);break;case s:a=(r-n)/p+2;break;case r:a=(n-s)/p+4;break}a/=6}return e.h=a,e.s=d,e.l=c,e}getRGB(e,t=yt.workingColorSpace){return yt.workingToColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=cn){yt.workingToColorSpace(tn.copy(this),e);let t=tn.r,n=tn.g,s=tn.b;return e!==cn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Mi),this.setHSL(Mi.h+e,Mi.s+t,Mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mi),e.getHSL(aa);let n=Ll(Mi.h,aa.h,t),s=Ll(Mi.s,aa.s,t),r=Ll(Mi.l,aa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},tn=new ut;ut.NAMES=ud;var lr=class extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ln=new te,oi=new te,Bl=new te,li=new te,os=new te,ls=new te,uu=new te,zl=new te,Gl=new te,Wl=new te,Vl=new Dt,Hl=new Dt,$l=new Dt,Ti=class i{constructor(e=new te,t=new te,n=new te){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Ln.subVectors(e,t),s.cross(Ln);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Ln.subVectors(s,t),oi.subVectors(n,t),Bl.subVectors(e,t);let l=Ln.dot(Ln),o=Ln.dot(oi),a=Ln.dot(Bl),d=oi.dot(oi),c=oi.dot(Bl),p=l*d-o*o;if(p===0)return r.set(0,0,0),null;let u=1/p,h=(d*a-o*c)*u,f=(l*c-o*a)*u;return r.set(1-h-f,f,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getInterpolation(e,t,n,s,r,l,o,a){return this.getBarycoord(e,t,n,s,li)===null?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(r,li.x),a.addScaledVector(l,li.y),a.addScaledVector(o,li.z),a)}static getInterpolatedAttribute(e,t,n,s,r,l){return Vl.setScalar(0),Hl.setScalar(0),$l.setScalar(0),Vl.fromBufferAttribute(e,t),Hl.fromBufferAttribute(e,n),$l.fromBufferAttribute(e,s),l.setScalar(0),l.addScaledVector(Vl,r.x),l.addScaledVector(Hl,r.y),l.addScaledVector($l,r.z),l}static isFrontFacing(e,t,n,s){return Ln.subVectors(n,t),oi.subVectors(e,t),Ln.cross(oi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),Ln.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,l,o;os.subVectors(s,n),ls.subVectors(r,n),zl.subVectors(e,n);let a=os.dot(zl),d=ls.dot(zl);if(a<=0&&d<=0)return t.copy(n);Gl.subVectors(e,s);let c=os.dot(Gl),p=ls.dot(Gl);if(c>=0&&p<=c)return t.copy(s);let u=a*p-c*d;if(u<=0&&a>=0&&c<=0)return l=a/(a-c),t.copy(n).addScaledVector(os,l);Wl.subVectors(e,r);let h=os.dot(Wl),f=ls.dot(Wl);if(f>=0&&h<=f)return t.copy(r);let y=h*d-a*f;if(y<=0&&d>=0&&f<=0)return o=d/(d-f),t.copy(n).addScaledVector(ls,o);let m=c*f-h*p;if(m<=0&&p-c>=0&&h-f>=0)return uu.subVectors(r,s),o=(p-c)/(p-c+(h-f)),t.copy(s).addScaledVector(uu,o);let g=1/(m+y+u);return l=y*g,o=u*g,t.copy(n).addScaledVector(os,l).addScaledVector(ls,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ei=class{constructor(e=new te(1/0,1/0,1/0),t=new te(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let l=0,o=r.count;l<o;l++)e.isMesh===!0?e.getVertexPosition(l,Dn):Dn.fromBufferAttribute(r,l),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),oa.copy(n.boundingBox)),oa.applyMatrix4(e.matrixWorld),this.union(oa)}let s=e.children;for(let r=0,l=s.length;r<l;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),la.subVectors(this.max,Zs),cs.subVectors(e.a,Zs),hs.subVectors(e.b,Zs),us.subVectors(e.c,Zs),xi.subVectors(hs,cs),Si.subVectors(us,hs),zi.subVectors(cs,us);let t=[0,-xi.z,xi.y,0,-Si.z,Si.y,0,-zi.z,zi.y,xi.z,0,-xi.x,Si.z,0,-Si.x,zi.z,0,-zi.x,-xi.y,xi.x,0,-Si.y,Si.x,0,-zi.y,zi.x,0];return!Xl(t,cs,hs,us,la)||(t=[1,0,0,0,1,0,0,0,1],!Xl(t,cs,hs,us,la))?!1:(ca.crossVectors(xi,Si),t=[ca.x,ca.y,ca.z],Xl(t,cs,hs,us,la))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ci=[new te,new te,new te,new te,new te,new te,new te,new te],Dn=new te,oa=new Ei,cs=new te,hs=new te,us=new te,xi=new te,Si=new te,zi=new te,Zs=new te,la=new te,ca=new te,Gi=new te;function Xl(i,e,t,n,s){for(let r=0,l=i.length-3;r<=l;r+=3){Gi.fromArray(i,r);let o=s.x*Math.abs(Gi.x)+s.y*Math.abs(Gi.y)+s.z*Math.abs(Gi.z),a=e.dot(Gi),d=t.dot(Gi),c=n.dot(Gi);if(Math.max(-Math.max(a,d,c),Math.min(a,d,c))>o)return!1}return!0}var Gt=new te,ha=new Le,E0=0,An=class extends Kn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:E0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ad,this.updateRanges=[],this.gpuType=Gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ha.fromBufferAttribute(this,t),ha.applyMatrix3(e),this.setXY(t,ha.x,ha.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ys(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=fn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ys(t,this.array)),t}setX(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ys(t,this.array)),t}setY(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ys(t,this.array)),t}setZ(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ys(t,this.array)),t}setW(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),n=fn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),n=fn(n,this.array),s=fn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),n=fn(n,this.array),s=fn(s,this.array),r=fn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var cr=class extends An{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var hr=class extends An{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Wt=class extends An{constructor(e,t,n){super(new Float32Array(e),t,n)}},A0=new Ei,Ks=new te,ql=new te,xs=class{constructor(e=new te,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):A0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,l=e.length;r<l;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ks.subVectors(e,this.center);let t=Ks.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ks,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ql.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ks.copy(e.center).add(ql)),this.expandByPoint(Ks.copy(e.center).sub(ql))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},R0=0,En=new Lt,Yl=new sn,ds=new te,bn=new Ei,js=new Ei,qt=new te,Mn=class i extends Kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=Fs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(f0(e)?hr:cr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new lt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return En.makeRotationFromQuaternion(e),this.applyMatrix4(En),this}rotateX(e){return En.makeRotationX(e),this.applyMatrix4(En),this}rotateY(e){return En.makeRotationY(e),this.applyMatrix4(En),this}rotateZ(e){return En.makeRotationZ(e),this.applyMatrix4(En),this}translate(e,t,n){return En.makeTranslation(e,t,n),this.applyMatrix4(En),this}scale(e,t,n){return En.makeScale(e,t,n),this.applyMatrix4(En),this}lookAt(e){return Yl.lookAt(e),Yl.updateMatrix(),this.applyMatrix4(Yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let l=e[s];n.push(l.x,l.y,l.z||0)}this.setAttribute("position",new Wt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&it("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new te(-1/0,-1/0,-1/0),new te(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];bn.setFromBufferAttribute(r),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&st('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xs);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new te,1/0);return}if(e){let n=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,l=t.length;r<l;r++){let o=t[r];js.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(bn.min,js.min),bn.expandByPoint(qt),qt.addVectors(bn.max,js.max),bn.expandByPoint(qt)):(bn.expandByPoint(js.min),bn.expandByPoint(js.max))}bn.getCenter(n);let s=0;for(let r=0,l=e.count;r<l;r++)qt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(qt));if(t)for(let r=0,l=t.length;r<l;r++){let o=t[r],a=this.morphTargetsRelative;for(let d=0,c=o.count;d<c;d++)qt.fromBufferAttribute(o,d),a&&(ds.fromBufferAttribute(e,d),qt.add(ds)),s=Math.max(s,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&st('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){st("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,l=this.getAttribute("tangent");(l===void 0||l.count!==n.count)&&(l=new An(new Float32Array(4*n.count),4),this.setAttribute("tangent",l));let o=[],a=[];for(let b=0;b<n.count;b++)o[b]=new te,a[b]=new te;let d=new te,c=new te,p=new te,u=new Le,h=new Le,f=new Le,y=new te,m=new te;function g(b,S,A){d.fromBufferAttribute(n,b),c.fromBufferAttribute(n,S),p.fromBufferAttribute(n,A),u.fromBufferAttribute(r,b),h.fromBufferAttribute(r,S),f.fromBufferAttribute(r,A),c.sub(d),p.sub(d),h.sub(u),f.sub(u);let R=1/(h.x*f.y-f.x*h.y);isFinite(R)&&(y.copy(c).multiplyScalar(f.y).addScaledVector(p,-h.y).multiplyScalar(R),m.copy(p).multiplyScalar(h.x).addScaledVector(c,-f.x).multiplyScalar(R),o[b].add(y),o[S].add(y),o[A].add(y),a[b].add(m),a[S].add(m),a[A].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let b=0,S=M.length;b<S;++b){let A=M[b],R=A.start,I=A.count;for(let O=R,D=R+I;O<D;O+=3)g(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let _=new te,x=new te,T=new te,w=new te;function E(b){T.fromBufferAttribute(s,b),w.copy(T);let S=o[b];_.copy(S),_.sub(T.multiplyScalar(T.dot(S))).normalize(),x.crossVectors(w,S);let R=x.dot(a[b])<0?-1:1;l.setXYZW(b,_.x,_.y,_.z,R)}for(let b=0,S=M.length;b<S;++b){let A=M[b],R=A.start,I=A.count;for(let O=R,D=R+I;O<D;O+=3)E(e.getX(O+0)),E(e.getX(O+1)),E(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,h=n.count;u<h;u++)n.setXYZ(u,0,0,0);let s=new te,r=new te,l=new te,o=new te,a=new te,d=new te,c=new te,p=new te;if(e)for(let u=0,h=e.count;u<h;u+=3){let f=e.getX(u+0),y=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,f),r.fromBufferAttribute(t,y),l.fromBufferAttribute(t,m),c.subVectors(l,r),p.subVectors(s,r),c.cross(p),o.fromBufferAttribute(n,f),a.fromBufferAttribute(n,y),d.fromBufferAttribute(n,m),o.add(c),a.add(c),d.add(c),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(y,a.x,a.y,a.z),n.setXYZ(m,d.x,d.y,d.z)}else for(let u=0,h=t.count;u<h;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),l.fromBufferAttribute(t,u+2),c.subVectors(l,r),p.subVectors(s,r),c.cross(p),n.setXYZ(u+0,c.x,c.y,c.z),n.setXYZ(u+1,c.x,c.y,c.z),n.setXYZ(u+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,a){let d=o.array,c=o.itemSize,p=o.normalized,u=new d.constructor(a.length*c),h=0,f=0;for(let y=0,m=a.length;y<m;y++){o.isInterleavedBufferAttribute?h=a[y]*o.data.stride+o.offset:h=a[y]*c;for(let g=0;g<c;g++)u[f++]=d[h++]}return new An(u,c,p)}if(this.index===null)return it("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let a=s[o],d=e(a,n);t.setAttribute(o,d)}let r=this.morphAttributes;for(let o in r){let a=[],d=r[o];for(let c=0,p=d.length;c<p;c++){let u=d[c],h=e(u,n);a.push(h)}t.morphAttributes[o]=a}t.morphTargetsRelative=this.morphTargetsRelative;let l=this.groups;for(let o=0,a=l.length;o<a;o++){let d=l[o];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let a=this.parameters;for(let d in a)a[d]!==void 0&&(e[d]=a[d]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let a in n){let d=n[a];e.data.attributes[a]=d.toJSON(e.data)}let s={},r=!1;for(let a in this.morphAttributes){let d=this.morphAttributes[a],c=[];for(let p=0,u=d.length;p<u;p++){let h=d[p];c.push(h.toJSON(e.data))}c.length>0&&(s[a]=c,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let l=this.groups;l.length>0&&(e.data.groups=JSON.parse(JSON.stringify(l)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let d in s){let c=s[d];this.setAttribute(d,c.clone(t))}let r=e.morphAttributes;for(let d in r){let c=[],p=r[d];for(let u=0,h=p.length;u<h;u++)c.push(p[u].clone(t));this.morphAttributes[d]=c}this.morphTargetsRelative=e.morphTargetsRelative;let l=e.groups;for(let d=0,c=l.length;d<c;d++){let p=l[d];this.addGroup(p.start,p.count,p.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let a=e.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Jl=new te,C0=new te,P0=new lt,Nn=class{constructor(e=new te(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Jl.subVectors(n,t).cross(C0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Jl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let l=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(l<0||l>1)?null:t.copy(e.start).addScaledVector(s,l)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||P0.getNormalMatrix(e),s=this.coplanarPoint(Jl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},I0=0,Ai=class extends Kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:I0++}),this.uuid=Fs(),this.name="",this.type="Material",this.blending=Ds,this.side=Li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yc,this.blendDst=_c,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ut(0,0,0),this.blendAlpha=0,this.depthFunc=ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ea,this.stencilZFail=Ea,this.stencilZPass=Ea,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){it(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){it(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let l=[];for(let o in r){let a=r[o];delete a.metadata,l.push(a)}return l}if(t){let r=s(e.textures),l=s(e.images);r.length>0&&(n.textures=r),l.length>0&&(n.images=l)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ut().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Nn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Le().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Le().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var hi=new te,Zl=new te,ua=new te,da=new te,Ga=class{constructor(e=new te,t=new te(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Zl.copy(e).add(t).multiplyScalar(.5),ua.copy(t).sub(e).normalize(),da.copy(this.origin).sub(Zl);let r=e.distanceTo(t)*.5,l=-this.direction.dot(ua),o=da.dot(this.direction),a=-da.dot(ua),d=da.lengthSq(),c=Math.abs(1-l*l),p,u,h,f;if(c>0)if(p=l*a-o,u=l*o-a,f=r*c,p>=0)if(u>=-f)if(u<=f){let y=1/c;p*=y,u*=y,h=p*(p+l*u+2*o)+u*(l*p+u+2*a)+d}else u=r,p=Math.max(0,-(l*u+o)),h=-p*p+u*(u+2*a)+d;else u=-r,p=Math.max(0,-(l*u+o)),h=-p*p+u*(u+2*a)+d;else u<=-f?(p=Math.max(0,-(-l*r+o)),u=p>0?-r:Math.min(Math.max(-r,-a),r),h=-p*p+u*(u+2*a)+d):u<=f?(p=0,u=Math.min(Math.max(-r,-a),r),h=u*(u+2*a)+d):(p=Math.max(0,-(l*r+o)),u=p>0?r:Math.min(Math.max(-r,-a),r),h=-p*p+u*(u+2*a)+d);else u=l>0?-r:r,p=Math.max(0,-(l*u+o)),h=-p*p+u*(u+2*a)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Zl).addScaledVector(ua,u),h}intersectSphere(e,t){if(e.radius<0)return null;hi.subVectors(e.center,this.origin);let n=hi.dot(this.direction),s=hi.dot(hi)-n*n,r=e.radius*e.radius;if(s>r)return null;let l=Math.sqrt(r-s),o=n-l,a=n+l;return a<0?null:o<0?this.at(a,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,l,o,a,d=1/this.direction.x,c=1/this.direction.y,p=1/this.direction.z,u=this.origin;return d>=0?(n=(e.min.x-u.x)*d,s=(e.max.x-u.x)*d):(n=(e.max.x-u.x)*d,s=(e.min.x-u.x)*d),c>=0?(r=(e.min.y-u.y)*c,l=(e.max.y-u.y)*c):(r=(e.max.y-u.y)*c,l=(e.min.y-u.y)*c),n>l||r>s||((r>n||isNaN(n))&&(n=r),(l<s||isNaN(s))&&(s=l),p>=0?(o=(e.min.z-u.z)*p,a=(e.max.z-u.z)*p):(o=(e.max.z-u.z)*p,a=(e.min.z-u.z)*p),n>a||o>s)||((o>n||n!==n)&&(n=o),(a<s||s!==s)&&(s=a),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,n,s,r){let l=this.origin,o=this.direction,a=o.x,d=o.y,c=o.z,p=e.x-l.x,u=e.y-l.y,h=e.z-l.z,f=t.x-l.x,y=t.y-l.y,m=t.z-l.z,g=n.x-l.x,M=n.y-l.y,_=n.z-l.z,x=Math.abs(a),T=Math.abs(d),w=Math.abs(c),E,b,S,A,R,I,O,D,L,P,F,G;if(x>=T&&x>=w?(S=a,I=p,L=f,G=g,a>=0?(E=d,b=c,A=u,R=h,O=y,D=m,P=M,F=_):(E=c,b=d,A=h,R=u,O=m,D=y,P=_,F=M)):T>=w?(S=d,I=u,L=y,G=M,d>=0?(E=c,b=a,A=h,R=p,O=m,D=f,P=_,F=g):(E=a,b=c,A=p,R=h,O=f,D=m,P=g,F=_)):(S=c,I=h,L=m,G=_,c>=0?(E=a,b=d,A=p,R=u,O=f,D=y,P=g,F=M):(E=d,b=a,A=u,R=p,O=y,D=f,P=M,F=g)),S===0)return null;let z=E/S,V=b/S,U=1/S,H=A-z*I,K=R-V*I,ce=O-z*L,Z=D-V*L,Y=P-z*G,B=F-V*G,N=Y*Z-B*ce,q=H*B-K*Y,re=ce*K-Z*H;if(s){if(N<0||q<0||re<0)return null}else if((N<0||q<0||re<0)&&(N>0||q>0||re>0))return null;let ae=N+q+re;if(ae===0)return null;let he=U*(N*I+q*L+re*G);return(ae>0?he<0:he>0)?null:this.at(he/ae,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xi=class extends Ai{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},du=new Lt,Wi=new Ga,fa=new xs,fu=new te,pa=new te,ma=new te,ga=new te,Kl=new te,ya=new te,pu=new te,_a=new te,Ut=class extends sn{constructor(e=new Mn,t=new Xi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,l=s.length;r<l;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,l=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){ya.set(0,0,0);for(let a=0,d=r.length;a<d;a++){let c=o[a],p=r[a];c!==0&&(Kl.fromBufferAttribute(p,e),l?ya.addScaledVector(Kl,c):ya.addScaledVector(Kl.sub(t),c))}t.add(ya)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fa.copy(n.boundingSphere),fa.applyMatrix4(r),Wi.copy(e.ray).recast(e.near),!(fa.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(fa,fu)===null||Wi.origin.distanceToSquared(fu)>(e.far-e.near)**2))&&(du.copy(r).invert(),Wi.copy(e.ray).applyMatrix4(du),!(n.boundingBox!==null&&Wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wi)))}_computeIntersections(e,t,n){let s,r=this.geometry,l=this.material,o=r.index,a=r.attributes.position,d=r.attributes.uv,c=r.attributes.uv1,p=r.attributes.normal,u=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(l))for(let f=0,y=u.length;f<y;f++){let m=u[f],g=l[m.materialIndex],M=Math.max(m.start,h.start),_=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let x=M,T=_;x<T;x+=3){let w=o.getX(x),E=o.getX(x+1),b=o.getX(x+2);s=va(this,g,e,n,d,c,p,w,E,b),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let f=Math.max(0,h.start),y=Math.min(o.count,h.start+h.count);for(let m=f,g=y;m<g;m+=3){let M=o.getX(m),_=o.getX(m+1),x=o.getX(m+2);s=va(this,l,e,n,d,c,p,M,_,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(a!==void 0)if(Array.isArray(l))for(let f=0,y=u.length;f<y;f++){let m=u[f],g=l[m.materialIndex],M=Math.max(m.start,h.start),_=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let x=M,T=_;x<T;x+=3){let w=x,E=x+1,b=x+2;s=va(this,g,e,n,d,c,p,w,E,b),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let f=Math.max(0,h.start),y=Math.min(a.count,h.start+h.count);for(let m=f,g=y;m<g;m+=3){let M=m,_=m+1,x=m+2;s=va(this,l,e,n,d,c,p,M,_,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function L0(i,e,t,n,s,r,l,o){let a;if(e.side===un?a=n.intersectTriangle(l,r,s,!0,o):a=n.intersectTriangle(s,r,l,e.side===Li,o),a===null)return null;_a.copy(o),_a.applyMatrix4(i.matrixWorld);let d=t.ray.origin.distanceTo(_a);return d<t.near||d>t.far?null:{distance:d,point:_a.clone(),object:i}}function va(i,e,t,n,s,r,l,o,a,d){i.getVertexPosition(o,pa),i.getVertexPosition(a,ma),i.getVertexPosition(d,ga);let c=L0(i,e,t,n,pa,ma,ga,pu);if(c){let p=new te;Ti.getBarycoord(pu,pa,ma,ga,p),s&&(c.uv=Ti.getInterpolatedAttribute(s,o,a,d,p,new Le)),r&&(c.uv1=Ti.getInterpolatedAttribute(r,o,a,d,p,new Le)),l&&(c.normal=Ti.getInterpolatedAttribute(l,o,a,d,p,new te),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));let u={a:o,b:a,c:d,normal:new te,materialIndex:0};Ti.getNormal(pa,ma,ga,u.normal),c.face=u,c.barycoord=p}return c}var Wa=class extends hn{constructor(e=null,t=1,n=1,s,r,l,o,a,d=Yt,c=Yt,p,u){super(null,l,o,a,d,c,s,r,p,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Vi=new xs,D0=new Le(.5,.5),ba=new te,Ss=class{constructor(e=new Nn,t=new Nn,n=new Nn,s=new Nn,r=new Nn,l=new Nn){this.planes=[e,t,n,s,r,l]}set(e,t,n,s,r,l){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(l),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Un,n=!1){let s=this.planes,r=e.elements,l=r[0],o=r[1],a=r[2],d=r[3],c=r[4],p=r[5],u=r[6],h=r[7],f=r[8],y=r[9],m=r[10],g=r[11],M=r[12],_=r[13],x=r[14],T=r[15];if(s[0].setComponents(d-l,h-c,g-f,T-M).normalize(),s[1].setComponents(d+l,h+c,g+f,T+M).normalize(),s[2].setComponents(d+o,h+p,g+y,T+_).normalize(),s[3].setComponents(d-o,h-p,g-y,T-_).normalize(),n)s[4].setComponents(a,u,m,x).normalize(),s[5].setComponents(d-a,h-u,g-m,T-x).normalize();else if(s[4].setComponents(d-a,h-u,g-m,T-x).normalize(),t===Un)s[5].setComponents(d+a,h+u,g+m,T+x).normalize();else if(t===_s)s[5].setComponents(a,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(e){Vi.center.set(0,0,0);let t=D0.distanceTo(e.center);return Vi.radius=.7071067811865476+t,Vi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ba.x=s.normal.x>0?e.max.x:e.min.x,ba.y=s.normal.y>0?e.max.y:e.min.y,ba.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ba)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ur=class extends hn{constructor(e=[],t=Di,n,s,r,l,o,a,d,c){super(e,t,n,s,r,l,o,a,d,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},dr=class extends hn{constructor(e,t,n,s,r,l,o,a,d){super(e,t,n,s,r,l,o,a,d),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ri=class extends hn{constructor(e,t,n=zn,s,r,l,o=Yt,a=Yt,d,c=Zn,p=1){if(c!==Zn&&c!==Ui)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:p};super(u,s,r,l,o,a,c,n,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new bs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Va=class extends Ri{constructor(e,t=zn,n=Di,s,r,l=Yt,o=Yt,a,d=Zn){let c={width:e,height:e,depth:1},p=[c,c,c,c,c,c];super(e,e,t,n,s,r,l,o,a,d),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},fr=class extends hn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},kn=class i extends Mn{constructor(e=1,t=1,n=1,s=1,r=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:l};let o=this;s=Math.floor(s),r=Math.floor(r),l=Math.floor(l);let a=[],d=[],c=[],p=[],u=0,h=0;f("z","y","x",-1,-1,n,t,e,l,r,0),f("z","y","x",1,-1,n,t,-e,l,r,1),f("x","z","y",1,1,e,n,t,s,l,2),f("x","z","y",1,-1,e,n,-t,s,l,3),f("x","y","z",1,-1,e,t,n,s,r,4),f("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(a),this.setAttribute("position",new Wt(d,3)),this.setAttribute("normal",new Wt(c,3)),this.setAttribute("uv",new Wt(p,2));function f(y,m,g,M,_,x,T,w,E,b,S){let A=x/E,R=T/b,I=x/2,O=T/2,D=w/2,L=E+1,P=b+1,F=0,G=0,z=new te;for(let V=0;V<P;V++){let U=V*R-O;for(let H=0;H<L;H++){let K=H*A-I;z[y]=K*M,z[m]=U*_,z[g]=D,d.push(z.x,z.y,z.z),z[y]=0,z[m]=0,z[g]=w>0?1:-1,c.push(z.x,z.y,z.z),p.push(H/E),p.push(1-V/b),F+=1}}for(let V=0;V<b;V++)for(let U=0;U<E;U++){let H=u+U+L*V,K=u+U+L*(V+1),ce=u+(U+1)+L*(V+1),Z=u+(U+1)+L*V;a.push(H,K,Z),a.push(K,ce,Z),G+=6}o.addGroup(h,G,S),h+=G,u+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var ws=class i extends Mn{constructor(e=1,t=1,n=1,s=32,r=1,l=!1,o=0,a=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:l,thetaStart:o,thetaLength:a};let d=this;s=Math.floor(s),r=Math.floor(r);let c=[],p=[],u=[],h=[],f=0,y=[],m=n/2,g=0;M(),l===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(c),this.setAttribute("position",new Wt(p,3)),this.setAttribute("normal",new Wt(u,3)),this.setAttribute("uv",new Wt(h,2));function M(){let x=new te,T=new te,w=0,E=(t-e)/n;for(let b=0;b<=r;b++){let S=[],A=b/r,R=A*(t-e)+e;for(let I=0;I<=s;I++){let O=I/s,D=O*a+o,L=Math.sin(D),P=Math.cos(D);T.x=R*L,T.y=-A*n+m,T.z=R*P,p.push(T.x,T.y,T.z),x.set(L,E,P).normalize(),u.push(x.x,x.y,x.z),h.push(O,1-A),S.push(f++)}y.push(S)}for(let b=0;b<s;b++)for(let S=0;S<r;S++){let A=y[S][b],R=y[S+1][b],I=y[S+1][b+1],O=y[S][b+1];(e>0||S!==0)&&(c.push(A,R,O),w+=3),(t>0||S!==r-1)&&(c.push(R,I,O),w+=3)}d.addGroup(g,w,0),g+=w}function _(x){let T=f,w=new Le,E=new te,b=0,S=x===!0?e:t,A=x===!0?1:-1;for(let I=1;I<=s;I++)p.push(0,m*A,0),u.push(0,A,0),h.push(.5,.5),f++;let R=f;for(let I=0;I<=s;I++){let D=I/s*a+o,L=Math.cos(D),P=Math.sin(D);E.x=S*P,E.y=m*A,E.z=S*L,p.push(E.x,E.y,E.z),u.push(0,A,0),w.x=L*.5+.5,w.y=P*.5*A+.5,h.push(w.x,w.y),f++}for(let I=0;I<s;I++){let O=T+I,D=R+I;x===!0?c.push(D,D+1,O):c.push(D+1,D,O),b+=3}d.addGroup(g,b,x===!0?1:2),g+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var xn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){it("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let l=1;l<=e;l++)n=this.getPoint(l/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,l;t?l=t:l=e*n[r-1];let o=0,a=r-1,d;for(;o<=a;)if(s=Math.floor(o+(a-o)/2),d=n[s]-l,d<0)o=s+1;else if(d>0)a=s-1;else{a=s;break}if(s=a,n[s]===l)return s/(r-1);let c=n[s],u=n[s+1]-c,h=(l-c)/u;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let l=this.getPoint(s),o=this.getPoint(r),a=t||(l.isVector2?new Le:new te);return a.copy(o).sub(l).normalize(),a}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new te,s=[],r=[],l=[],o=new te,a=new Lt;for(let h=0;h<=e;h++){let f=h/e;s[h]=this.getTangentAt(f,new te)}r[0]=new te,l[0]=new te;let d=Number.MAX_VALUE,c=Math.abs(s[0].x),p=Math.abs(s[0].y),u=Math.abs(s[0].z);c<=d&&(d=c,n.set(1,0,0)),p<=d&&(d=p,n.set(0,1,0)),u<=d&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),l[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),l[h]=l[h-1].clone(),o.crossVectors(s[h-1],s[h]),o.length()>Number.EPSILON){o.normalize();let f=Math.acos(gt(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(a.makeRotationAxis(o,f))}l[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(gt(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(h=-h);for(let f=1;f<=e;f++)r[f].applyMatrix4(a.makeRotationAxis(s[f],h*f)),l[f].crossVectors(s[f],r[f])}return{tangents:s,normals:r,binormals:l}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ts=class extends xn{constructor(e=0,t=0,n=1,s=1,r=0,l=Math.PI*2,o=!1,a=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=l,this.aClockwise=o,this.aRotation=a}getPoint(e,t=new Le){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,l=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(l?r=0:r=s),this.aClockwise===!0&&!l&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,a=this.aX+this.xRadius*Math.cos(o),d=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let c=Math.cos(this.aRotation),p=Math.sin(this.aRotation),u=a-this.aX,h=d-this.aY;a=u*c-h*p+this.aX,d=u*p+h*c+this.aY}return n.set(a,d)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ha=class extends Ts{constructor(e,t,n,s,r,l){super(e,t,n,n,s,r,l),this.isArcCurve=!0,this.type="ArcCurve"}};function Fc(){let i=0,e=0,t=0,n=0;function s(r,l,o,a){i=r,e=o,t=-3*r+3*l-2*o-a,n=2*r-2*l+o+a}return{initCatmullRom:function(r,l,o,a,d){s(l,o,d*(o-r),d*(a-l))},initNonuniformCatmullRom:function(r,l,o,a,d,c,p){let u=(l-r)/d-(o-r)/(d+c)+(o-l)/c,h=(o-l)/c-(a-l)/(c+p)+(a-o)/p;u*=c,h*=c,s(l,o,u,h)},calc:function(r){let l=r*r,o=l*r;return i+e*r+t*l+n*o}}}var mu=new te,gu=new te,jl=new Fc,Ql=new Fc,ec=new Fc,Es=class extends xn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new te){let n=t,s=this.points,r=s.length,l=(r-(this.closed?0:1))*e,o=Math.floor(l),a=l-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:a===0&&o===r-1&&(o=r-2,a=1);let d,c;this.closed||o>0?d=s[(o-1)%r]:(gu.subVectors(s[0],s[1]).add(s[0]),d=gu);let p=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?c=s[(o+2)%r]:(mu.subVectors(s[r-1],s[r-2]).add(s[r-1]),c=mu),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,f=Math.pow(d.distanceToSquared(p),h),y=Math.pow(p.distanceToSquared(u),h),m=Math.pow(u.distanceToSquared(c),h);y<1e-4&&(y=1),f<1e-4&&(f=y),m<1e-4&&(m=y),jl.initNonuniformCatmullRom(d.x,p.x,u.x,c.x,f,y,m),Ql.initNonuniformCatmullRom(d.y,p.y,u.y,c.y,f,y,m),ec.initNonuniformCatmullRom(d.z,p.z,u.z,c.z,f,y,m)}else this.curveType==="catmullrom"&&(jl.initCatmullRom(d.x,p.x,u.x,c.x,this.tension),Ql.initCatmullRom(d.y,p.y,u.y,c.y,this.tension),ec.initCatmullRom(d.z,p.z,u.z,c.z,this.tension));return n.set(jl.calc(a),Ql.calc(a),ec.calc(a)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new te().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function yu(i,e,t,n,s){let r=(n-e)*.5,l=(s-t)*.5,o=i*i,a=i*o;return(2*t-2*n+r+l)*a+(-3*t+3*n-2*r-l)*o+r*i+t}function N0(i,e){let t=1-i;return t*t*e}function U0(i,e){return 2*(1-i)*i*e}function F0(i,e){return i*i*e}function er(i,e,t,n){return N0(i,e)+U0(i,t)+F0(i,n)}function k0(i,e){let t=1-i;return t*t*t*e}function O0(i,e){let t=1-i;return 3*t*t*i*e}function B0(i,e){return 3*(1-i)*i*i*e}function z0(i,e){return i*i*i*e}function tr(i,e,t,n,s){return k0(i,e)+O0(i,t)+B0(i,n)+z0(i,s)}var pr=class extends xn{constructor(e=new Le,t=new Le,n=new Le,s=new Le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Le){let n=t,s=this.v0,r=this.v1,l=this.v2,o=this.v3;return n.set(tr(e,s.x,r.x,l.x,o.x),tr(e,s.y,r.y,l.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},$a=class extends xn{constructor(e=new te,t=new te,n=new te,s=new te){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new te){let n=t,s=this.v0,r=this.v1,l=this.v2,o=this.v3;return n.set(tr(e,s.x,r.x,l.x,o.x),tr(e,s.y,r.y,l.y,o.y),tr(e,s.z,r.z,l.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},mr=class extends xn{constructor(e=new Le,t=new Le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Le){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xa=class extends xn{constructor(e=new te,t=new te){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new te){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new te){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},gr=class extends xn{constructor(e=new Le,t=new Le,n=new Le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Le){let n=t,s=this.v0,r=this.v1,l=this.v2;return n.set(er(e,s.x,r.x,l.x),er(e,s.y,r.y,l.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},yr=class extends xn{constructor(e=new te,t=new te,n=new te){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new te){let n=t,s=this.v0,r=this.v1,l=this.v2;return n.set(er(e,s.x,r.x,l.x),er(e,s.y,r.y,l.y),er(e,s.z,r.z,l.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_r=class extends xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Le){let n=t,s=this.points,r=(s.length-1)*e,l=Math.floor(r),o=r-l,a=s[l===0?l:l-1],d=s[l],c=s[l>s.length-2?s.length-1:l+1],p=s[l>s.length-3?s.length-1:l+2];return n.set(yu(o,a.x,d.x,c.x,p.x),yu(o,a.y,d.y,c.y,p.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new Le().fromArray(s))}return this}},qa=Object.freeze({__proto__:null,ArcCurve:Ha,CatmullRomCurve3:Es,CubicBezierCurve:pr,CubicBezierCurve3:$a,EllipseCurve:Ts,LineCurve:mr,LineCurve3:Xa,QuadraticBezierCurve:gr,QuadraticBezierCurve3:yr,SplineCurve:_r}),As=class extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new qa[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let l=s[r]-n,o=this.curves[r],a=o.getLength(),d=a===0?0:1-l/a;return o.getPointAt(d,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let l=r[s],o=l.isEllipseCurve?e*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?e*l.points.length:e,a=l.getPoints(o);for(let d=0;d<a.length;d++){let c=a[d];n&&n.equals(c)||(t.push(c),n=c)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new qa[s.type]().fromJSON(s))}return this}},qi=class extends As{constructor(e){super(),this.type="Path",this.currentPoint=new Le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new mr(this.currentPoint.clone(),new Le(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new gr(this.currentPoint.clone(),new Le(e,t),new Le(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,l){let o=new pr(this.currentPoint.clone(),new Le(e,t),new Le(n,s),new Le(r,l));return this.curves.push(o),this.currentPoint.set(r,l),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new _r(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,l){let o=this.currentPoint.x,a=this.currentPoint.y;return this.absarc(e+o,t+a,n,s,r,l),this}absarc(e,t,n,s,r,l){return this.absellipse(e,t,n,n,s,r,l),this}ellipse(e,t,n,s,r,l,o,a){let d=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+d,t+c,n,s,r,l,o,a),this}absellipse(e,t,n,s,r,l,o,a){let d=new Ts(e,t,n,s,r,l,o,a);if(this.curves.length>0){let p=d.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(d);let c=d.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Rs=class extends qi{constructor(e){super(e),this.uuid=Fs(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new qi().fromJSON(s))}return this}};function G0(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=dd(i,0,s,t,!0),l=[];if(!r||r.next===r.prev)return l;let o,a,d;if(n&&(r=X0(i,e,r,t)),i.length>80*t){o=i[0],a=i[1];let c=o,p=a;for(let u=t;u<s;u+=t){let h=i[u],f=i[u+1];h<o&&(o=h),f<a&&(a=f),h>c&&(c=h),f>p&&(p=f)}d=Math.max(c-o,p-a),d=d!==0?32767/d:0}return vr(r,l,t,o,a,d,0),l}function dd(i,e,t,n,s){let r;if(s===ip(i,e,t,n)>0)for(let l=e;l<t;l+=n)r=_u(l/n|0,i[l],i[l+1],r);else for(let l=t-n;l>=e;l-=n)r=_u(l/n|0,i[l],i[l+1],r);return r&&Cs(r,r.next)&&(Mr(r),r=r.next),r}function Yi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Cs(t,t.next)||Nt(t.prev,t,t.next)===0)){if(Mr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function vr(i,e,t,n,s,r,l){if(!i)return;!l&&r&&K0(i,n,s,r);let o=i;for(;i.prev!==i.next;){let a=i.prev,d=i.next;if(r?V0(i,n,s,r):W0(i)){e.push(a.i,i.i,d.i),Mr(i),i=d.next,o=d.next;continue}if(i=d,i===o){l?l===1?(i=H0(Yi(i),e),vr(i,e,t,n,s,r,2)):l===2&&$0(i,e,t,n,s,r):vr(Yi(i),e,t,n,s,r,1);break}}}function W0(i){let e=i.prev,t=i,n=i.next;if(Nt(e,t,n)>=0)return!1;let s=e.x,r=t.x,l=n.x,o=e.y,a=t.y,d=n.y,c=Math.min(s,r,l),p=Math.min(o,a,d),u=Math.max(s,r,l),h=Math.max(o,a,d),f=n.next;for(;f!==e;){if(f.x>=c&&f.x<=u&&f.y>=p&&f.y<=h&&Qs(s,o,r,a,l,d,f.x,f.y)&&Nt(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function V0(i,e,t,n){let s=i.prev,r=i,l=i.next;if(Nt(s,r,l)>=0)return!1;let o=s.x,a=r.x,d=l.x,c=s.y,p=r.y,u=l.y,h=Math.min(o,a,d),f=Math.min(c,p,u),y=Math.max(o,a,d),m=Math.max(c,p,u),g=oc(h,f,e,t,n),M=oc(y,m,e,t,n),_=i.prevZ,x=i.nextZ;for(;_&&_.z>=g&&x&&x.z<=M;){if(_.x>=h&&_.x<=y&&_.y>=f&&_.y<=m&&_!==s&&_!==l&&Qs(o,c,a,p,d,u,_.x,_.y)&&Nt(_.prev,_,_.next)>=0||(_=_.prevZ,x.x>=h&&x.x<=y&&x.y>=f&&x.y<=m&&x!==s&&x!==l&&Qs(o,c,a,p,d,u,x.x,x.y)&&Nt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;_&&_.z>=g;){if(_.x>=h&&_.x<=y&&_.y>=f&&_.y<=m&&_!==s&&_!==l&&Qs(o,c,a,p,d,u,_.x,_.y)&&Nt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;x&&x.z<=M;){if(x.x>=h&&x.x<=y&&x.y>=f&&x.y<=m&&x!==s&&x!==l&&Qs(o,c,a,p,d,u,x.x,x.y)&&Nt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function H0(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Cs(n,s)&&pd(n,t,t.next,s)&&br(n,s)&&br(s,n)&&(e.push(n.i,t.i,s.i),Mr(t),Mr(t.next),t=i=s),t=t.next}while(t!==i);return Yi(t)}function $0(i,e,t,n,s,r){let l=i;do{let o=l.next.next;for(;o!==l.prev;){if(l.i!==o.i&&ep(l,o)){let a=md(l,o);l=Yi(l,l.next),a=Yi(a,a.next),vr(l,e,t,n,s,r,0),vr(a,e,t,n,s,r,0);return}o=o.next}l=l.next}while(l!==i)}function X0(i,e,t,n){let s=[];for(let r=0,l=e.length;r<l;r++){let o=e[r]*n,a=r<l-1?e[r+1]*n:i.length,d=dd(i,o,a,n,!1);d===d.next&&(d.steiner=!0),s.push(Q0(d))}s.sort(q0);for(let r=0;r<s.length;r++)t=Y0(s[r],t);return t}function q0(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Y0(i,e){let t=J0(i,e);if(!t)return e;let n=md(t,i);return Yi(n,n.next),Yi(t,t.next)}function J0(i,e){let t=e,n=i.x,s=i.y,r=-1/0,l;if(Cs(i,t))return t;do{if(Cs(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let p=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=n&&p>r&&(r=p,l=t.x<t.next.x?t:t.next,p===n))return l}t=t.next}while(t!==e);if(!l)return null;let o=l,a=l.x,d=l.y,c=1/0;t=l;do{if(n>=t.x&&t.x>=a&&n!==t.x&&fd(s<d?n:r,s,a,d,s<d?r:n,s,t.x,t.y)){let p=Math.abs(s-t.y)/(n-t.x);br(t,i)&&(p<c||p===c&&(t.x>l.x||t.x===l.x&&Z0(l,t)))&&(l=t,c=p)}t=t.next}while(t!==o);return l}function Z0(i,e){return Nt(i.prev,i,e.prev)<0&&Nt(e.next,i,i.next)<0}function K0(i,e,t,n){let s=i;do s.z===0&&(s.z=oc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,j0(s)}function j0(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let l=n,o=0;for(let d=0;d<t&&(o++,l=l.nextZ,!!l);d++);let a=t;for(;o>0||a>0&&l;)o!==0&&(a===0||!l||n.z<=l.z)?(s=n,n=n.nextZ,o--):(s=l,l=l.nextZ,a--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=l}r.nextZ=null,t*=2}while(e>1);return i}function oc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Q0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function fd(i,e,t,n,s,r,l,o){return(s-l)*(e-o)>=(i-l)*(r-o)&&(i-l)*(n-o)>=(t-l)*(e-o)&&(t-l)*(r-o)>=(s-l)*(n-o)}function Qs(i,e,t,n,s,r,l,o){return!(i===l&&e===o)&&fd(i,e,t,n,s,r,l,o)}function ep(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!tp(i,e)&&(br(i,e)&&br(e,i)&&np(i,e)&&(Nt(i.prev,i,e.prev)||Nt(i,e.prev,e))||Cs(i,e)&&Nt(i.prev,i,i.next)>0&&Nt(e.prev,e,e.next)>0)}function Nt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Cs(i,e){return i.x===e.x&&i.y===e.y}function pd(i,e,t,n){let s=xa(Nt(i,e,t)),r=xa(Nt(i,e,n)),l=xa(Nt(t,n,i)),o=xa(Nt(t,n,e));return!!(s!==r&&l!==o||s===0&&Ma(i,t,e)||r===0&&Ma(i,n,e)||l===0&&Ma(t,i,n)||o===0&&Ma(t,e,n))}function Ma(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function xa(i){return i>0?1:i<0?-1:0}function tp(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&pd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function br(i,e){return Nt(i.prev,i,i.next)<0?Nt(i,e,i.next)>=0&&Nt(i,i.prev,e)>=0:Nt(i,e,i.prev)<0||Nt(i,i.next,e)<0}function np(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function md(i,e){let t=lc(i.i,i.x,i.y),n=lc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function _u(i,e,t,n){let s=lc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Mr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function lc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ip(i,e,t,n){let s=0;for(let r=e,l=t-n;r<t;r+=n)s+=(i[l]-i[r])*(i[r+1]+i[l+1]),l=r;return s}var cc=class{static triangulate(e,t,n=2){return G0(e,t,n)}},Hi=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];vu(e),bu(n,e);let l=e.length;t.forEach(vu);for(let a=0;a<t.length;a++)s.push(l),l+=t[a].length,bu(n,t[a]);let o=cc.triangulate(n,s);for(let a=0;a<o.length;a+=3)r.push(o.slice(a,a+3));return r}};function vu(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function bu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var xr=class i extends Mn{constructor(e=new Rs([new Le(.5,.5),new Le(-.5,.5),new Le(-.5,-.5),new Le(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,a=e.length;o<a;o++){let d=e[o];l(d)}this.setAttribute("position",new Wt(s,3)),this.setAttribute("uv",new Wt(r,2)),this.computeVertexNormals();function l(o){let a=[],d=t.curveSegments!==void 0?t.curveSegments:12,c=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,h=t.bevelThickness!==void 0?t.bevelThickness:.2,f=t.bevelSize!==void 0?t.bevelSize:h-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:sp,_,x=!1,T,w,E,b;if(g){_=g.getSpacedPoints(c),x=!0,u=!1;let ne=g.isCatmullRomCurve3?g.closed:!1;T=g.computeFrenetFrames(c,ne),w=new te,E=new te,b=new te}u||(m=0,h=0,f=0,y=0);let S=o.extractPoints(d),A=S.shape,R=S.holes;if(!Hi.isClockWise(A)){A=A.reverse();for(let ne=0,fe=R.length;ne<fe;ne++){let me=R[ne];Hi.isClockWise(me)&&(R[ne]=me.reverse())}}function O(ne){let me=10000000000000001e-36,ye=ne[0];for(let Q=1;Q<=ne.length;Q++){let _e=Q%ne.length,Te=ne[_e],ue=Te.x-ye.x,we=Te.y-ye.y,$=ue*ue+we*we,ze=Math.max(Math.abs(Te.x),Math.abs(Te.y),Math.abs(ye.x),Math.abs(ye.y)),Ye=me*ze*ze;if($<=Ye){ne.splice(_e,1),Q--;continue}ye=Te}}O(A),R.forEach(O);let D=R.length,L=A;for(let ne=0;ne<D;ne++){let fe=R[ne];A=A.concat(fe)}function P(ne,fe,me){return fe||st("ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(fe,me)}let F=A.length;function G(ne,fe,me){let ye,Q,_e,Te=ne.x-fe.x,ue=ne.y-fe.y,we=me.x-ne.x,$=me.y-ne.y,ze=Te*Te+ue*ue,Ye=Te*$-ue*we;if(Math.abs(Ye)>Number.EPSILON){let W=Math.sqrt(ze),C=Math.sqrt(we*we+$*$),ee=fe.x-ue/W,ie=fe.y+Te/W,pe=me.x-$/C,Ee=me.y+we/C,Re=((pe-ee)*$-(Ee-ie)*we)/(Te*$-ue*we);ye=ee+Te*Re-ne.x,Q=ie+ue*Re-ne.y;let ge=ye*ye+Q*Q;if(ge<=2)return new Le(ye,Q);_e=Math.sqrt(ge/2)}else{let W=!1;Te>Number.EPSILON?we>Number.EPSILON&&(W=!0):Te<-Number.EPSILON?we<-Number.EPSILON&&(W=!0):Math.sign(ue)===Math.sign($)&&(W=!0),W?(ye=-ue,Q=Te,_e=Math.sqrt(ze)):(ye=Te,Q=ue,_e=Math.sqrt(ze/2))}return new Le(ye/_e,Q/_e)}let z=[];for(let ne=0,fe=L.length,me=fe-1,ye=ne+1;ne<fe;ne++,me++,ye++)me===fe&&(me=0),ye===fe&&(ye=0),z[ne]=G(L[ne],L[me],L[ye]);let V=[],U,H=z.concat();for(let ne=0,fe=D;ne<fe;ne++){let me=R[ne];U=[];for(let ye=0,Q=me.length,_e=Q-1,Te=ye+1;ye<Q;ye++,_e++,Te++)_e===Q&&(_e=0),Te===Q&&(Te=0),U[ye]=G(me[ye],me[_e],me[Te]);V.push(U),H=H.concat(U)}let K;if(m===0)K=Hi.triangulateShape(L,R);else{let ne=[],fe=[];for(let me=0;me<m;me++){let ye=me/m,Q=h*Math.cos(ye*Math.PI/2),_e=f*Math.sin(ye*Math.PI/2)+y;for(let Te=0,ue=L.length;Te<ue;Te++){let we=P(L[Te],z[Te],_e);q(we.x,we.y,-Q),ye===0&&ne.push(we)}for(let Te=0,ue=D;Te<ue;Te++){let we=R[Te];U=V[Te];let $=[];for(let ze=0,Ye=we.length;ze<Ye;ze++){let W=P(we[ze],U[ze],_e);q(W.x,W.y,-Q),ye===0&&$.push(W)}ye===0&&fe.push($)}}K=Hi.triangulateShape(ne,fe)}let ce=K.length,Z=f+y;for(let ne=0;ne<F;ne++){let fe=u?P(A[ne],H[ne],Z):A[ne];x?(E.copy(T.normals[0]).multiplyScalar(fe.x),w.copy(T.binormals[0]).multiplyScalar(fe.y),b.copy(_[0]).add(E).add(w),q(b.x,b.y,b.z)):q(fe.x,fe.y,0)}for(let ne=1;ne<=c;ne++)for(let fe=0;fe<F;fe++){let me=u?P(A[fe],H[fe],Z):A[fe];x?(E.copy(T.normals[ne]).multiplyScalar(me.x),w.copy(T.binormals[ne]).multiplyScalar(me.y),b.copy(_[ne]).add(E).add(w),q(b.x,b.y,b.z)):q(me.x,me.y,p/c*ne)}for(let ne=m-1;ne>=0;ne--){let fe=ne/m,me=h*Math.cos(fe*Math.PI/2),ye=f*Math.sin(fe*Math.PI/2)+y;for(let Q=0,_e=L.length;Q<_e;Q++){let Te=P(L[Q],z[Q],ye);q(Te.x,Te.y,p+me)}for(let Q=0,_e=R.length;Q<_e;Q++){let Te=R[Q];U=V[Q];for(let ue=0,we=Te.length;ue<we;ue++){let $=P(Te[ue],U[ue],ye);x?q($.x,$.y+_[c-1].y,_[c-1].x+me):q($.x,$.y,p+me)}}}Y(),B();function Y(){let ne=s.length/3;if(u){let fe=0,me=F*fe;for(let ye=0;ye<ce;ye++){let Q=K[ye];re(Q[2]+me,Q[1]+me,Q[0]+me)}fe=c+m*2,me=F*fe;for(let ye=0;ye<ce;ye++){let Q=K[ye];re(Q[0]+me,Q[1]+me,Q[2]+me)}}else{for(let fe=0;fe<ce;fe++){let me=K[fe];re(me[2],me[1],me[0])}for(let fe=0;fe<ce;fe++){let me=K[fe];re(me[0]+F*c,me[1]+F*c,me[2]+F*c)}}n.addGroup(ne,s.length/3-ne,0)}function B(){let ne=s.length/3,fe=0;N(L,fe),fe+=L.length;for(let me=0,ye=R.length;me<ye;me++){let Q=R[me];N(Q,fe),fe+=Q.length}n.addGroup(ne,s.length/3-ne,1)}function N(ne,fe){let me=ne.length;for(;--me>=0;){let ye=me,Q=me-1;Q<0&&(Q=ne.length-1);for(let _e=0,Te=c+m*2;_e<Te;_e++){let ue=F*_e,we=F*(_e+1),$=fe+ye+ue,ze=fe+Q+ue,Ye=fe+Q+we,W=fe+ye+we;ae($,ze,Ye,W)}}}function q(ne,fe,me){a.push(ne),a.push(fe),a.push(me)}function re(ne,fe,me){he(ne),he(fe),he(me);let ye=s.length/3,Q=M.generateTopUV(n,s,ye-3,ye-2,ye-1);xe(Q[0]),xe(Q[1]),xe(Q[2])}function ae(ne,fe,me,ye){he(ne),he(fe),he(ye),he(fe),he(me),he(ye);let Q=s.length/3,_e=M.generateSideWallUV(n,s,Q-6,Q-3,Q-2,Q-1);xe(_e[0]),xe(_e[1]),xe(_e[3]),xe(_e[1]),xe(_e[2]),xe(_e[3])}function he(ne){s.push(a[ne*3+0]),s.push(a[ne*3+1]),s.push(a[ne*3+2])}function xe(ne){r.push(ne.x),r.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return rp(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,l=e.shapes.length;r<l;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new qa[s.type]().fromJSON(s)),new i(n,e.options)}},sp={generateTopUV:function(i,e,t,n,s){let r=e[t*3],l=e[t*3+1],o=e[n*3],a=e[n*3+1],d=e[s*3],c=e[s*3+1];return[new Le(r,l),new Le(o,a),new Le(d,c)]},generateSideWallUV:function(i,e,t,n,s,r){let l=e[t*3],o=e[t*3+1],a=e[t*3+2],d=e[n*3],c=e[n*3+1],p=e[n*3+2],u=e[s*3],h=e[s*3+1],f=e[s*3+2],y=e[r*3],m=e[r*3+1],g=e[r*3+2];return Math.abs(o-c)<Math.abs(l-d)?[new Le(l,1-a),new Le(d,1-p),new Le(u,1-f),new Le(y,1-g)]:[new Le(o,1-a),new Le(c,1-p),new Le(h,1-f),new Le(m,1-g)]}};function rp(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ji=class i extends Mn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,l=t/2,o=Math.floor(n),a=Math.floor(s),d=o+1,c=a+1,p=e/o,u=t/a,h=[],f=[],y=[],m=[];for(let g=0;g<c;g++){let M=g*u-l;for(let _=0;_<d;_++){let x=_*p-r;f.push(x,-M,0),y.push(0,0,1),m.push(_/o),m.push(1-g/a)}}for(let g=0;g<a;g++)for(let M=0;M<o;M++){let _=M+d*g,x=M+d*(g+1),T=M+1+d*(g+1),w=M+1+d*g;h.push(_,x,w),h.push(x,T,w)}this.setIndex(h),this.setAttribute("position",new Wt(f,3)),this.setAttribute("normal",new Wt(y,3)),this.setAttribute("uv",new Wt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Sr=class i extends Mn{constructor(e=new yr(new te(-1,-1,0),new te(-1,1,0),new te(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let l=e.computeFrenetFrames(t,r);this.tangents=l.tangents,this.normals=l.normals,this.binormals=l.binormals;let o=new te,a=new te,d=new Le,c=new te,p=[],u=[],h=[],f=[];y(),this.setIndex(f),this.setAttribute("position",new Wt(p,3)),this.setAttribute("normal",new Wt(u,3)),this.setAttribute("uv",new Wt(h,2));function y(){for(let _=0;_<t;_++)m(_);m(r===!1?t:0),M(),g()}function m(_){c=e.getPointAt(_/t,c);let x=l.normals[_],T=l.binormals[_];for(let w=0;w<=s;w++){let E=w/s*Math.PI*2,b=Math.sin(E),S=-Math.cos(E);a.x=S*x.x+b*T.x,a.y=S*x.y+b*T.y,a.z=S*x.z+b*T.z,a.normalize(),u.push(a.x,a.y,a.z),o.x=c.x+n*a.x,o.y=c.y+n*a.y,o.z=c.z+n*a.z,p.push(o.x,o.y,o.z)}}function g(){for(let _=1;_<=t;_++)for(let x=1;x<=s;x++){let T=(s+1)*(_-1)+(x-1),w=(s+1)*_+(x-1),E=(s+1)*_+x,b=(s+1)*(_-1)+x;f.push(T,w,b),f.push(w,E,b)}}function M(){for(let _=0;_<=t;_++)for(let x=0;x<=s;x++)d.x=_/t,d.y=x/s,h.push(d.x,d.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new qa[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function ji(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Mu(s))s.isRenderTargetTexture?(it("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Mu(s[0])){let r=[];for(let l=0,o=s.length;l<o;l++)r[l]=s[l].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function rn(i){let e={};for(let t=0;t<i.length;t++){let n=ji(i[t]);for(let s in n)e[s]=n[s]}return e}function Mu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function ap(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function kc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:yt.workingColorSpace}var gd={clone:ji,merge:rn},op=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Sn=class extends Ai{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=op,this.fragmentShader=lp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=ap(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let l=this.uniforms[s].value;l&&l.isTexture?t.uniforms[s]={type:"t",value:l.toJSON(e).uuid}:l&&l.isColor?t.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?t.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?t.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?t.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?t.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?t.uniforms[s]={type:"m4",value:l.toArray()}:t.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ut().setHex(s.value);break;case"v2":this.uniforms[n].value=new Le().fromArray(s.value);break;case"v3":this.uniforms[n].value=new te().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Dt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new lt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Lt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ya=class extends Sn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},On=class extends Ai{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ko,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Ja=class extends Ai{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Za=class extends Ai{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function fs(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function tc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ci=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let l;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}l=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let a=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(s=r,r=t[--n-1],e>=r)break e}l=n,n=0;break t}break n}for(;n<l;){let o=n+l>>>1;e<t[o]?l=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let l=0;l!==s;++l)t[l]=n[r+l];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ka=class extends Ci{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sc,endingEnd:sc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,l=e+1,o=s[r],a=s[l];if(o===void 0)switch(this.getSettings_().endingStart){case rc:r=e,o=2*t-n;break;case ac:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(a===void 0)switch(this.getSettings_().endingEnd){case rc:l=e,a=2*n-t;break;case ac:l=1,a=n+s[1]-s[0];break;default:l=e-1,a=t}let d=(n-t)*.5,c=this.valueSize;this._weightPrev=d/(t-o),this._weightNext=d/(a-n),this._offsetPrev=r*c,this._offsetNext=l*c}interpolate_(e,t,n,s){let r=this.resultBuffer,l=this.sampleValues,o=this.valueSize,a=e*o,d=a-o,c=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,h=this._weightNext,f=(n-t)/(s-t),y=f*f,m=y*f,g=-u*m+2*u*y-u*f,M=(1+u)*m+(-1.5-2*u)*y+(-.5+u)*f+1,_=(-1-h)*m+(1.5+h)*y+.5*f,x=h*m-h*y;for(let T=0;T!==o;++T)r[T]=g*l[c+T]+M*l[d+T]+_*l[a+T]+x*l[p+T];return r}},ja=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,l=this.sampleValues,o=this.valueSize,a=e*o,d=a-o,c=(n-t)/(s-t),p=1-c;for(let u=0;u!==o;++u)r[u]=l[d+u]*p+l[a+u]*c;return r}},Qa=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},eo=class extends Ci{interpolate_(e,t,n,s){let r=this.resultBuffer,l=this.sampleValues,o=this.valueSize,a=e*o,d=a-o,c=this.inTangents,p=this.outTangents;if(!c||!p){let f=(n-t)/(s-t),y=1-f;for(let m=0;m!==o;++m)r[m]=l[d+m]*y+l[a+m]*f;return r}let u=o*2,h=e-1;for(let f=0;f!==o;++f){let y=l[d+f],m=l[a+f],g=h*u+f*2,M=p[g],_=p[g+1],x=e*u+f*2,T=c[x],w=c[x+1],E=hp(n,t,M,T,s);r[f]=yd(E,y,_,w,m)}return r}};function yd(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function cp(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function hp(i,e,t,n,s){let r=(i-e)/(s-e);for(let l=0;l<8;l++){let o=yd(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let a=cp(r,e,t,n,s);if(Math.abs(a)<1e-10)break;r=Math.max(0,Math.min(1,r-o/a))}return r}var wn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=fs(t,this.TimeBufferType),this.values=fs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:fs(e.times,Array),values:fs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),tc(e.settings)&&(n.settings={inTangents:fs(e.settings.inTangents,Array),outTangents:fs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ka(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new eo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case nr:t=this.InterpolantFactoryMethodDiscrete;break;case Fa:t=this.InterpolantFactoryMethodLinear;break;case Ta:t=this.InterpolantFactoryMethodSmooth;break;case ic:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return it("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return nr;case this.InterpolantFactoryMethodLinear:return Fa;case this.InterpolantFactoryMethodSmooth:return Ta;case this.InterpolantFactoryMethodBezier:return ic}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;tc(this.settings)&&(xu(this.settings.inTangents,e),xu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,l=s-1;for(;r!==s&&n[r]<e;)++r;for(;l!==-1&&n[l]>t;)--l;if(++l,r!==0||l!==s){r>=l&&(l=Math.max(l,1),r=l-1);let o=this.getValueSize();this.times=n.slice(r,l),this.values=this.values.slice(r*o,l*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(st("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(st("KeyframeTrack: Track is empty.",this),e=!1);let l=null;for(let o=0;o!==r;o++){let a=n[o];if(typeof a=="number"&&isNaN(a)){st("KeyframeTrack: Time is not a valid number.",this,o,a),e=!1;break}if(l!==null&&l>a){st("KeyframeTrack: Out of order keys.",this,o,a,l),e=!1;break}l=a}if(s!==void 0&&p0(s))for(let o=0,a=s.length;o!==a;++o){let d=s[o];if(isNaN(d)){st("KeyframeTrack: Value is not a valid number.",this,o,d),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ta,r=e.length-1,l=1;for(let o=1;o<r;++o){let a=!1,d=e[o],c=e[o+1];if(d!==c&&(o!==1||d!==e[0]))if(s)a=!0;else{let p=o*n,u=p-n,h=p+n;for(let f=0;f!==n;++f){let y=t[p+f];if(y!==t[u+f]||y!==t[h+f]){a=!0;break}}}if(a){if(o!==l){e[l]=e[o];let p=o*n,u=l*n;for(let h=0;h!==n;++h)t[u+h]=t[p+h]}++l}}if(r>0){e[l]=e[r];for(let o=r*n,a=l*n,d=0;d!==n;++d)t[a+d]=t[o+d];++l}return l!==e.length?(this.times=e.slice(0,l),this.values=t.slice(0,l*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,tc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function xu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}wn.prototype.ValueTypeName="";wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=Fa;var Pi=class extends wn{constructor(e,t,n){super(e,t,n)}};Pi.prototype.ValueTypeName="bool";Pi.prototype.ValueBufferType=Array;Pi.prototype.DefaultInterpolation=nr;Pi.prototype.InterpolantFactoryMethodLinear=void 0;Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var to=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}};to.prototype.ValueTypeName="color";var no=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}};no.prototype.ValueTypeName="number";var io=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,l=this.sampleValues,o=this.valueSize,a=(n-t)/(s-t),d=e*o;for(let c=d+o;d!==c;d+=4)jn.slerpFlat(r,0,l,d-o,l,d,a);return r}},wr=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new io(this.times,this.values,this.getValueSize(),e)}};wr.prototype.ValueTypeName="quaternion";wr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends wn{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="string";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=nr;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var so=class extends wn{constructor(e,t,n,s){super(e,t,n,s)}};so.prototype.ValueTypeName="vector";var ro=class{constructor(e,t,n){let s=this,r=!1,l=0,o=0,a,d=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(c){o++,r===!1&&s.onStart!==void 0&&s.onStart(c,l,o),r=!0},this.itemEnd=function(c){l++,s.onProgress!==void 0&&s.onProgress(c,l,o),l===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(c){s.onError!==void 0&&s.onError(c)},this.resolveURL=function(c){return c=c.normalize("NFC"),a?a(c):c},this.setURLModifier=function(c){return a=c,this},this.addHandler=function(c,p){return d.push(c,p),this},this.removeHandler=function(c){let p=d.indexOf(c);return p!==-1&&d.splice(p,2),this},this.getHandler=function(c){for(let p=0,u=d.length;p<u;p+=2){let h=d[p],f=d[p+1];if(h.global&&(h.lastIndex=0),h.test(c))return f}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},_d=new ro,ao=class{constructor(e){this.manager=e!==void 0?e:_d,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ao.DEFAULT_MATERIAL_NAME="__DEFAULT";var Tr=class extends sn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ut(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Er=class extends Tr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ut(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},nc=new Lt,Su=new te,wu=new te,oo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.mapType=mn,this.map=null,this.mapPass=null,this.matrix=new Lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ss,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Su.setFromMatrixPosition(e.matrixWorld),t.position.copy(Su),wu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(wu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){nc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(nc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,l=s?s.z/r.x:1,o=s?s.w/r.y:1,a=s?s.x/r.x:0,d=s?s.y/r.y:0;e.coordinateSystem===_s||e.reversedDepth?t.set(.5*l,0,0,.5*l+a,0,.5*o,0,.5*o+d,0,0,1,0,0,0,0,1):t.set(.5*l,0,0,.5*l+a,0,.5*o,0,.5*o+d,0,0,.5,.5,0,0,0,1),t.multiply(nc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Sa=new te,wa=new jn,Yn=new te,Ar=class extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Lt,this.projectionMatrix=new Lt,this.projectionMatrixInverse=new Lt,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Sa,wa,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sa,wa,Yn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Sa,wa,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sa,wa,Yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},wi=new te,Tu=new Le,Eu=new Le,nn=class extends Ar{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ka*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Il*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ka*2*Math.atan(Math.tan(Il*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wi.x,wi.y).multiplyScalar(-e/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wi.x,wi.y).multiplyScalar(-e/wi.z)}getViewSize(e,t){return this.getViewBounds(e,Tu,Eu),t.subVectors(Eu,Tu)}setViewOffset(e,t,n,s,r,l){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Il*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,l=this.view;if(this.view!==null&&this.view.enabled){let a=l.fullWidth,d=l.fullHeight;r+=l.offsetX*s/a,t-=l.offsetY*n/d,s*=l.width/a,n*=l.height/d}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ps=class extends Ar{constructor(e=-1,t=1,n=1,s=-1,r=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=l,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,l=n+e,o=s+t,a=s-t;if(this.view!==null&&this.view.enabled){let d=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=d*this.view.offsetX,l=r+d*this.view.width,o-=c*this.view.offsetY,a=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,l,o,a,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},hc=class extends oo{constructor(){super(new Ps(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Is=class extends Tr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(sn.DEFAULT_UP),this.updateMatrix(),this.target=new sn,this.shadow=new hc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ps=-90,ms=1,lo=class extends sn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new nn(ps,ms,e,t);s.layers=this.layers,this.add(s);let r=new nn(ps,ms,e,t);r.layers=this.layers,this.add(r);let l=new nn(ps,ms,e,t);l.layers=this.layers,this.add(l);let o=new nn(ps,ms,e,t);o.layers=this.layers,this.add(o);let a=new nn(ps,ms,e,t);a.layers=this.layers,this.add(a);let d=new nn(ps,ms,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,l,o,a]=t;for(let d of t)this.remove(d);if(e===Un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1);else if(e===_s)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,l,o,a,d,c]=this.children,p=e.getRenderTarget(),u=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),f=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(p,u,h),e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},co=class extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Oc="\\[\\]\\.:\\/",up=new RegExp("["+Oc+"]","g"),Bc="[^"+Oc+"]",dp="[^"+Oc.replace("\\.","")+"]",fp=/((?:WC+[\/:])*)/.source.replace("WC",Bc),pp=/(WCOD+)?/.source.replace("WCOD",dp),mp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bc),gp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bc),yp=new RegExp("^"+fp+pp+mp+gp+"$"),_p=["material","materials","bones","map"],uc=class{constructor(e,t,n){let s=n||Pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Pt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(up,"")}static parseTrackName(e){let t=yp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);_p.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let l=0;l<r.length;l++){let o=r[l];if(o.name===t||o.uuid===t)return o;let a=n(o.children);if(a)return a}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){it("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let d=t.objectIndex;switch(n){case"materials":if(!e.material){st("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){st("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){st("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let c=0;c<e.length;c++)if(e[c].name===d){d=c;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){st("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){st("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){st("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(d!==void 0){if(e[d]===void 0){st("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[d]}}let l=e[s];if(l===void 0){let d=t.nodeName;st("PropertyBinding: Trying to update property for track: "+d+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){st("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){st("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}a=this.BindingType.ArrayElement,this.resolvedProperty=l,this.propertyIndex=r}else l.fromArray!==void 0&&l.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=l):Array.isArray(l)?(a=this.BindingType.EntireArray,this.resolvedProperty=l):this.propertyName=s;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Pt.Composite=uc;Pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pt.prototype.GetterByBindingType=[Pt.prototype._getValue_direct,Pt.prototype._getValue_array,Pt.prototype._getValue_arrayElement,Pt.prototype._getValue_toArray];Pt.prototype.SetterByBindingTypeAndVersioning=[[Pt.prototype._setValue_direct,Pt.prototype._setValue_direct_setNeedsUpdate,Pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_array,Pt.prototype._setValue_array_setNeedsUpdate,Pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_arrayElement,Pt.prototype._setValue_arrayElement_setNeedsUpdate,Pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_fromArray,Pt.prototype._setValue_fromArray_setNeedsUpdate,Pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var m_=new Float32Array(1);var $c=class $c{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};$c.prototype.isMatrix2=!0;var dc=$c;function zc(i,e,t,n){let s=vp(n);switch(t){case Ic:return i*e;case Dc:return i*e/s.components*s.byteLength;case _o:return i*e/s.components*s.byteLength;case Fi:return i*e*2/s.components*s.byteLength;case vo:return i*e*2/s.components*s.byteLength;case Lc:return i*e*3/s.components*s.byteLength;case Rn:return i*e*4/s.components*s.byteLength;case bo:return i*e*4/s.components*s.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Nr:case Ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xo:case wo:return Math.max(i,16)*Math.max(e,8)/4;case Mo:case So:return Math.max(i,8)*Math.max(e,8)/2;case To:case Eo:case Ro:case Co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ao:case Fr:case Po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case No:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Fo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ko:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Oo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Bo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case zo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Go:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Wo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Vo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ho:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case $o:case Xo:case qo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Yo:case Jo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case kr:case Zo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function vp(i){switch(i){case mn:case Ac:return{byteLength:1,components:1};case Ns:case Rc:case Wn:return{byteLength:2,components:1};case go:case yo:return{byteLength:2,components:4};case zn:case mo:case Gn:return{byteLength:4,components:1};case Cc:case Pc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?it("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function zd(){let i=null,e=!1,t=null,n=null;function s(r,l){n=i.requestAnimationFrame(s),t(r,l)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Mp(i){let e=new WeakMap;function t(o,a){let d=o.array,c=o.usage,p=d.byteLength,u=i.createBuffer();i.bindBuffer(a,u),i.bufferData(a,d,c),o.onUploadCallback();let h;if(d instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)h=i.HALF_FLOAT;else if(d instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)h=i.SHORT;else if(d instanceof Uint32Array)h=i.UNSIGNED_INT;else if(d instanceof Int32Array)h=i.INT;else if(d instanceof Int8Array)h=i.BYTE;else if(d instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:u,type:h,bytesPerElement:d.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,a,d){let c=a.array,p=a.updateRanges;if(i.bindBuffer(d,o),p.length===0)i.bufferSubData(d,0,c);else{p.sort((h,f)=>h.start-f.start);let u=0;for(let h=1;h<p.length;h++){let f=p[u],y=p[h];y.start<=f.start+f.count+1?f.count=Math.max(f.count,y.start+y.count-f.start):(++u,p[u]=y)}p.length=u+1;for(let h=0,f=p.length;h<f;h++){let y=p[h];i.bufferSubData(d,y.start*c.BYTES_PER_ELEMENT,c,y.start,y.count)}a.clearUpdateRanges()}a.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let a=e.get(o);a&&(i.deleteBuffer(a.buffer),e.delete(o))}function l(o,a){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let c=e.get(o);(!c||c.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let d=e.get(o);if(d===void 0)e.set(o,t(o,a));else if(d.version<o.version){if(d.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,o,a),d.version=o.version}}return{get:s,remove:r,update:l}}var xp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sp=`#ifdef USE_ALPHAHASH
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
#endif`,wp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ep=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ap=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rp=`#ifdef USE_AOMAP
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
#endif`,Cp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pp=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ip=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Np=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Up=`#ifdef USE_IRIDESCENCE
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
#endif`,Fp=`#ifdef USE_BUMPMAP
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
#endif`,kp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Op=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Wp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Vp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Hp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,$p=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,Xp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qp=`vec3 transformedNormal = objectNormal;
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
#endif`,Yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,em=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,tm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
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
#endif`,im=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,am=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,om=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cm=`#ifdef USE_GRADIENTMAP
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
}`,hm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,um=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fm=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,pm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,mm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ym=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_m=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,bm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mm=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Tm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Em=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Am=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Im=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lm=`#if defined( USE_POINTS_UV )
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
#endif`,Dm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Um=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,km=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Om=`#ifdef USE_MORPHTARGETS
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
#endif`,Bm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,$m=`#ifdef USE_NORMALMAP
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
#endif`,Xm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ym=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Km=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,jm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,e1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,t1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,n1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,i1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,s1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,r1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,a1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,o1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,l1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,c1=`#ifdef USE_SKINNING
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
#endif`,h1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,u1=`#ifdef USE_SKINNING
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
#endif`,d1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,f1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,p1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,m1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,g1=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,y1=`#ifdef USE_TRANSMISSION
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
#endif`,_1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,v1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,M1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,x1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,S1=`uniform sampler2D t2D;
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
}`,w1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,A1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R1=`#include <common>
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
}`,C1=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,P1=`#define DISTANCE
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
}`,I1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,L1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,D1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N1=`uniform float scale;
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
}`,U1=`uniform vec3 diffuse;
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
}`,F1=`#include <common>
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
}`,k1=`uniform vec3 diffuse;
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
}`,O1=`#define LAMBERT
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
}`,B1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,z1=`#define MATCAP
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
}`,G1=`#define MATCAP
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
}`,W1=`#define NORMAL
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
}`,V1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,H1=`#define PHONG
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
}`,$1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,X1=`#define STANDARD
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
}`,q1=`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,Y1=`#define TOON
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
}`,J1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,Z1=`uniform float size;
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
}`,K1=`uniform vec3 diffuse;
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
}`,j1=`#include <common>
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
}`,Q1=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,eg=`uniform float rotation;
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
}`,tg=`uniform vec3 diffuse;
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
}`,pt={alphahash_fragment:xp,alphahash_pars_fragment:Sp,alphamap_fragment:wp,alphamap_pars_fragment:Tp,alphatest_fragment:Ep,alphatest_pars_fragment:Ap,aomap_fragment:Rp,aomap_pars_fragment:Cp,batching_pars_vertex:Pp,batching_vertex:Ip,begin_vertex:Lp,beginnormal_vertex:Dp,bsdfs:Np,iridescence_fragment:Up,bumpmap_pars_fragment:Fp,clipping_planes_fragment:kp,clipping_planes_pars_fragment:Op,clipping_planes_pars_vertex:Bp,clipping_planes_vertex:zp,color_fragment:Gp,color_pars_fragment:Wp,color_pars_vertex:Vp,color_vertex:Hp,common:$p,cube_uv_reflection_fragment:Xp,defaultnormal_vertex:qp,displacementmap_pars_vertex:Yp,displacementmap_vertex:Jp,emissivemap_fragment:Zp,emissivemap_pars_fragment:Kp,colorspace_fragment:jp,colorspace_pars_fragment:Qp,envmap_fragment:em,envmap_common_pars_fragment:tm,envmap_pars_fragment:nm,envmap_pars_vertex:im,envmap_physical_pars_fragment:pm,envmap_vertex:sm,fog_vertex:rm,fog_pars_vertex:am,fog_fragment:om,fog_pars_fragment:lm,gradientmap_pars_fragment:cm,lightmap_pars_fragment:hm,lights_lambert_fragment:um,lights_lambert_pars_fragment:dm,lights_pars_begin:fm,lights_toon_fragment:mm,lights_toon_pars_fragment:gm,lights_phong_fragment:ym,lights_phong_pars_fragment:_m,lights_physical_fragment:vm,lights_physical_pars_fragment:bm,lights_fragment_begin:Mm,lights_fragment_maps:xm,lights_fragment_end:Sm,lightprobes_pars_fragment:wm,logdepthbuf_fragment:Tm,logdepthbuf_pars_fragment:Em,logdepthbuf_pars_vertex:Am,logdepthbuf_vertex:Rm,map_fragment:Cm,map_pars_fragment:Pm,map_particle_fragment:Im,map_particle_pars_fragment:Lm,metalnessmap_fragment:Dm,metalnessmap_pars_fragment:Nm,morphinstance_vertex:Um,morphcolor_vertex:Fm,morphnormal_vertex:km,morphtarget_pars_vertex:Om,morphtarget_vertex:Bm,normal_fragment_begin:zm,normal_fragment_maps:Gm,normal_pars_fragment:Wm,normal_pars_vertex:Vm,normal_vertex:Hm,normalmap_pars_fragment:$m,clearcoat_normal_fragment_begin:Xm,clearcoat_normal_fragment_maps:qm,clearcoat_pars_fragment:Ym,iridescence_pars_fragment:Jm,opaque_fragment:Zm,packing:Km,premultiplied_alpha_fragment:jm,project_vertex:Qm,dithering_fragment:e1,dithering_pars_fragment:t1,roughnessmap_fragment:n1,roughnessmap_pars_fragment:i1,shadowmap_pars_fragment:s1,shadowmap_pars_vertex:r1,shadowmap_vertex:a1,shadowmask_pars_fragment:o1,skinbase_vertex:l1,skinning_pars_vertex:c1,skinning_vertex:h1,skinnormal_vertex:u1,specularmap_fragment:d1,specularmap_pars_fragment:f1,tonemapping_fragment:p1,tonemapping_pars_fragment:m1,transmission_fragment:g1,transmission_pars_fragment:y1,uv_pars_fragment:_1,uv_pars_vertex:v1,uv_vertex:b1,worldpos_vertex:M1,background_vert:x1,background_frag:S1,backgroundCube_vert:w1,backgroundCube_frag:T1,cube_vert:E1,cube_frag:A1,depth_vert:R1,depth_frag:C1,distance_vert:P1,distance_frag:I1,equirect_vert:L1,equirect_frag:D1,linedashed_vert:N1,linedashed_frag:U1,meshbasic_vert:F1,meshbasic_frag:k1,meshlambert_vert:O1,meshlambert_frag:B1,meshmatcap_vert:z1,meshmatcap_frag:G1,meshnormal_vert:W1,meshnormal_frag:V1,meshphong_vert:H1,meshphong_frag:$1,meshphysical_vert:X1,meshphysical_frag:q1,meshtoon_vert:Y1,meshtoon_frag:J1,points_vert:Z1,points_frag:K1,shadow_vert:j1,shadow_frag:Q1,sprite_vert:eg,sprite_frag:tg},ke={common:{diffuse:{value:new ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new lt}},envmap:{envMap:{value:null},envMapRotation:{value:new lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new lt},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new te},probesMax:{value:new te},probesResolution:{value:new te}},points:{diffuse:{value:new ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0},uvTransform:{value:new lt}},sprite:{diffuse:{value:new ut(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new lt},alphaMap:{value:null},alphaMapTransform:{value:new lt},alphaTest:{value:0}}},ni={basic:{uniforms:rn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:rn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new ut(0)},envMapIntensity:{value:1}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:rn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new ut(0)},specular:{value:new ut(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:rn([ke.common,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.roughnessmap,ke.metalnessmap,ke.fog,ke.lights,{emissive:{value:new ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:rn([ke.common,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.gradientmap,ke.fog,ke.lights,{emissive:{value:new ut(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:rn([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:rn([ke.points,ke.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:rn([ke.common,ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:rn([ke.common,ke.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:rn([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:rn([ke.sprite,ke.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new lt}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distance:{uniforms:rn([ke.common,ke.displacementmap,{referencePosition:{value:new te},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distance_vert,fragmentShader:pt.distance_frag},shadow:{uniforms:rn([ke.lights,ke.fog,{color:{value:new ut(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};ni.physical={uniforms:rn([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new lt},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new lt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new lt},sheen:{value:0},sheenColor:{value:new ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new lt},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new lt},attenuationDistance:{value:0},attenuationColor:{value:new ut(0)},specularColor:{value:new ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new lt},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new lt}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};var el={r:0,b:0,g:0},ng=new Lt,Gd=new lt;Gd.set(-1,0,0,0,1,0,0,0,1);function ig(i,e,t,n,s,r){let l=new ut(0),o=s===!0?0:1,a,d,c=null,p=0,u=null;function h(M){let _=M.isScene===!0?M.background:null;if(_&&_.isTexture){let x=M.backgroundBlurriness>0;_=e.get(_,x)}return _}function f(M){let _=!1,x=h(M);x===null?m(l,o):x&&x.isColor&&(m(x,1),_=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||_)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(M,_){let x=h(_);x&&(x.isCubeTexture||x.mapping===Pr)?(d===void 0&&(d=new Ut(new kn(1,1,1),new Sn({name:"BackgroundCubeMaterial",uniforms:ji(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(T,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(d)),d.material.uniforms.envMap.value=x,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(ng.makeRotationFromEuler(_.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(Gd),d.material.toneMapped=yt.getTransfer(x.colorSpace)!==Mt,(c!==x||p!==x.version||u!==i.toneMapping)&&(d.material.needsUpdate=!0,c=x,p=x.version,u=i.toneMapping),d.layers.enableAll(),M.unshift(d,d.geometry,d.material,0,0,null)):x&&x.isTexture&&(a===void 0&&(a=new Ut(new Ji(2,2),new Sn({name:"BackgroundMaterial",uniforms:ji(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:Li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),a.geometry.deleteAttribute("normal"),Object.defineProperty(a.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(a)),a.material.uniforms.t2D.value=x,a.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,a.material.toneMapped=yt.getTransfer(x.colorSpace)!==Mt,x.matrixAutoUpdate===!0&&x.updateMatrix(),a.material.uniforms.uvTransform.value.copy(x.matrix),(c!==x||p!==x.version||u!==i.toneMapping)&&(a.material.needsUpdate=!0,c=x,p=x.version,u=i.toneMapping),a.layers.enableAll(),M.unshift(a,a.geometry,a.material,0,0,null))}function m(M,_){M.getRGB(el,kc(i)),t.buffers.color.setClear(el.r,el.g,el.b,_,r)}function g(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),a!==void 0&&(a.geometry.dispose(),a.material.dispose(),a=void 0)}return{getClearColor:function(){return l},setClearColor:function(M,_=1){l.set(M),o=_,m(l,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(l,o)},render:f,addToRenderList:y,dispose:g}}function sg(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,l=!1;function o(R,I,O,D,L){let P=!1,F=p(R,D,O,I);r!==F&&(r=F,d(r.object)),P=h(R,D,O,L),P&&f(R,D,O,L),L!==null&&e.update(L,i.ELEMENT_ARRAY_BUFFER),(P||l)&&(l=!1,x(R,I,O,D),L!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(L).buffer))}function a(){return i.createVertexArray()}function d(R){return i.bindVertexArray(R)}function c(R){return i.deleteVertexArray(R)}function p(R,I,O,D){let L=D.wireframe===!0,P=n[I.id];P===void 0&&(P={},n[I.id]=P);let F=R.isInstancedMesh===!0?R.id:0,G=P[F];G===void 0&&(G={},P[F]=G);let z=G[O.id];z===void 0&&(z={},G[O.id]=z);let V=z[L];return V===void 0&&(V=u(a()),z[L]=V),V}function u(R){let I=[],O=[],D=[];for(let L=0;L<t;L++)I[L]=0,O[L]=0,D[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:D,object:R,attributes:{},index:null}}function h(R,I,O,D){let L=r.attributes,P=I.attributes,F=0,G=O.getAttributes();for(let z in G)if(G[z].location>=0){let U=L[z],H=P[z];if(H===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(H=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(H=R.instanceColor)),U===void 0||U.attribute!==H||H&&U.data!==H.data)return!0;F++}return r.attributesNum!==F||r.index!==D}function f(R,I,O,D){let L={},P=I.attributes,F=0,G=O.getAttributes();for(let z in G)if(G[z].location>=0){let U=P[z];U===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(U=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(U=R.instanceColor));let H={};H.attribute=U,U&&U.data&&(H.data=U.data),L[z]=H,F++}r.attributes=L,r.attributesNum=F,r.index=D}function y(){let R=r.newAttributes;for(let I=0,O=R.length;I<O;I++)R[I]=0}function m(R){g(R,0)}function g(R,I){let O=r.newAttributes,D=r.enabledAttributes,L=r.attributeDivisors;O[R]=1,D[R]===0&&(i.enableVertexAttribArray(R),D[R]=1),L[R]!==I&&(i.vertexAttribDivisor(R,I),L[R]=I)}function M(){let R=r.newAttributes,I=r.enabledAttributes;for(let O=0,D=I.length;O<D;O++)I[O]!==R[O]&&(i.disableVertexAttribArray(O),I[O]=0)}function _(R,I,O,D,L,P,F){F===!0?i.vertexAttribIPointer(R,I,O,L,P):i.vertexAttribPointer(R,I,O,D,L,P)}function x(R,I,O,D){y();let L=D.attributes,P=O.getAttributes(),F=I.defaultAttributeValues;for(let G in P){let z=P[G];if(z.location>=0){let V=L[G];if(V===void 0&&(G==="instanceMatrix"&&R.instanceMatrix&&(V=R.instanceMatrix),G==="instanceColor"&&R.instanceColor&&(V=R.instanceColor)),V!==void 0){let U=V.normalized,H=V.itemSize,K=e.get(V);if(K===void 0)continue;let ce=K.buffer,Z=K.type,Y=K.bytesPerElement,B=Z===i.INT||Z===i.UNSIGNED_INT||V.gpuType===mo;if(V.isInterleavedBufferAttribute){let N=V.data,q=N.stride,re=V.offset;if(N.isInstancedInterleavedBuffer){for(let ae=0;ae<z.locationSize;ae++)g(z.location+ae,N.meshPerAttribute);R.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let ae=0;ae<z.locationSize;ae++)m(z.location+ae);i.bindBuffer(i.ARRAY_BUFFER,ce);for(let ae=0;ae<z.locationSize;ae++)_(z.location+ae,H/z.locationSize,Z,U,q*Y,(re+H/z.locationSize*ae)*Y,B)}else{if(V.isInstancedBufferAttribute){for(let N=0;N<z.locationSize;N++)g(z.location+N,V.meshPerAttribute);R.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let N=0;N<z.locationSize;N++)m(z.location+N);i.bindBuffer(i.ARRAY_BUFFER,ce);for(let N=0;N<z.locationSize;N++)_(z.location+N,H/z.locationSize,Z,U,H*Y,H/z.locationSize*N*Y,B)}}else if(F!==void 0){let U=F[G];if(U!==void 0)switch(U.length){case 2:i.vertexAttrib2fv(z.location,U);break;case 3:i.vertexAttrib3fv(z.location,U);break;case 4:i.vertexAttrib4fv(z.location,U);break;default:i.vertexAttrib1fv(z.location,U)}}}}M()}function T(){S();for(let R in n){let I=n[R];for(let O in I){let D=I[O];for(let L in D){let P=D[L];for(let F in P)c(P[F].object),delete P[F];delete D[L]}}delete n[R]}}function w(R){if(n[R.id]===void 0)return;let I=n[R.id];for(let O in I){let D=I[O];for(let L in D){let P=D[L];for(let F in P)c(P[F].object),delete P[F];delete D[L]}}delete n[R.id]}function E(R){for(let I in n){let O=n[I];for(let D in O){let L=O[D];if(L[R.id]===void 0)continue;let P=L[R.id];for(let F in P)c(P[F].object),delete P[F];delete L[R.id]}}}function b(R){for(let I in n){let O=n[I],D=R.isInstancedMesh===!0?R.id:0,L=O[D];if(L!==void 0){for(let P in L){let F=L[P];for(let G in F)c(F[G].object),delete F[G];delete L[P]}delete O[D],Object.keys(O).length===0&&delete n[I]}}}function S(){A(),l=!0,r!==s&&(r=s,d(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:A,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:b,releaseStatesOfProgram:E,initAttributes:y,enableAttribute:m,disableUnusedAttributes:M}}function rg(i,e,t){let n;function s(a){n=a}function r(a,d){i.drawArrays(n,a,d),t.update(d,n,1)}function l(a,d,c){c!==0&&(i.drawArraysInstanced(n,a,d,c),t.update(d,n,c))}function o(a,d,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,a,0,d,0,c);let u=0;for(let h=0;h<c;h++)u+=d[h];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=l,this.renderMultiDraw=o}function ag(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function l(E){return!(E!==Rn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let b=E===Wn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==mn&&E!==Gn&&!b&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function a(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp",c=a(d);c!==d&&(it("WebGLRenderer:",d,"not supported, using",c,"instead."),d=c);let p=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&it("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:a,textureFormatReadable:l,textureTypeReadable:o,precision:d,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:y,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:M,maxVaryings:_,maxFragmentUniforms:x,maxSamples:T,samples:w}}function og(i){let e=this,t=null,n=0,s=!1,r=!1,l=new Nn,o=new lt,a={value:null,needsUpdate:!1};this.uniform=a,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let h=p.length!==0||u||n!==0||s;return s=u,n=p.length,h},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,u){t=c(p,u,0)},this.setState=function(p,u,h){let f=p.clippingPlanes,y=p.clipIntersection,m=p.clipShadows,g=i.get(p);if(!s||f===null||f.length===0||r&&!m)r?c(null):d();else{let M=r?0:n,_=M*4,x=g.clippingState||null;a.value=x,x=c(f,u,_,h);for(let T=0;T!==_;++T)x[T]=t[T];g.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function d(){a.value!==t&&(a.value=t,a.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function c(p,u,h,f){let y=p!==null?p.length:0,m=null;if(y!==0){if(m=a.value,f!==!0||m===null){let g=h+y*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<g)&&(m=new Float32Array(g));for(let _=0,x=h;_!==y;++_,x+=4)l.copy(p[_]).applyMatrix4(M,o),l.normal.toArray(m,x),m[x+3]=l.constant}a.value=m,a.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}var Os=4,lg=6,cg=20,hg=256,Or=new Ps,vd=new ut,Xc=null,qc=0,Yc=0,Jc=!1,ug=new te,Qi=new te,nl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:l=256,position:o=ug}=r;Xc=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(l);let a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,s,a,o),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Md(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Xc,qc,Yc),this._renderer.xr.enabled=Jc,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Di||e.mapping===Ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xc=this._renderer.getRenderTarget(),qc=this._renderer.getActiveCubeFace(),Yc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:Wn,format:Rn,colorSpace:ir,depthBuffer:!1},s=bd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bd(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=dg(r)),this._blurMaterial=pg(r,e,t),this._ggxMaterial=fg(r,e,t)}return s}_compileMaterial(e){let t=new Ut(new Mn,e);this._renderer.compile(t,Or)}_sceneToCubeUV(e,t,n,s,r){let a=new nn(90,1,t,n),d=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,h=p.toneMapping;p.getClearColor(vd),p.toneMapping=Bn,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ut(new kn,new Xi({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,m=y.material,g=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,g=!0):(m.color.copy(vd),g=!0);for(let _=0;_<6;_++){let x=_%3;x===0?(a.up.set(0,d[_],0),a.position.set(r.x,r.y,r.z),a.lookAt(r.x+c[_],r.y,r.z)):x===1?(a.up.set(0,0,d[_]),a.position.set(r.x,r.y,r.z),a.lookAt(r.x,r.y+c[_],r.z)):(a.up.set(0,d[_],0),a.position.set(r.x,r.y,r.z),a.lookAt(r.x,r.y,r.z+c[_]));let T=this._cubeSize;ks(s,x*T,_>2?T:0,T,T),p.setRenderTarget(s),g&&p.render(y,a),p.render(e,a)}p.toneMapping=h,p.autoClear=u,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Di||e.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=xd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Md());let r=s?this._cubemapMaterial:this._equirectMaterial,l=this._lodMeshes[0];l.material=r;let o=r.uniforms;o.envMap.value=e;let a=this._cubeSize;ks(t,0,0,3*a,2*a),n.setRenderTarget(t),n.render(l,Or)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,l=this._ggxMaterial,o=this._lodMeshes[n];o.material=l;let a=l.uniforms,d=n/(this._lodMeshes.length-1),c=t/(this._lodMeshes.length-1),p=Math.sqrt(d*d-c*c),u=d*1.25,h=p*u,{_lodMax:f}=this,y=this._sizeLods[n],m=3*y*(n>f-Os?n-f+Os:0),g=4*(this._cubeSize-y);a.envMap.value=e.texture,a.roughness.value=h,a.mipInt.value=f-t,ks(r,m,g,3*y,2*y),s.setRenderTarget(r),s.render(o,Or),a.envMap.value=r.texture,a.roughness.value=0,a.mipInt.value=f-n,ks(e,m,g,3*y,2*y),s.setRenderTarget(e),s.render(o,Or)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,l=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,l),this._blurPass(r,e,n,n,l)}_blurPass(e,t,n,s,r){let l=this._renderer,o=this._blurMaterial,a=this._lodMeshes[s];a.material=o;let d=o.uniforms;d.envMap.value=e.texture,d.sigma.value=r,d.mipInt.value=this._lodMax-n;let c=this._sizeLods[s],p=3*c*(s>this._lodMax-Os?s-this._lodMax+Os:0),u=4*(this._cubeSize-c);ks(t,p,u,3*c,2*c),l.setRenderTarget(t),l.render(a,Or)}};function dg(i){let e=[],t=[],n=i,s=i-Os+1+lg;for(let r=0;r<s;r++){let l=Math.pow(2,n);e.push(l);let o=1/(l-2),a=-o,d=1+o,c=[a,a,d,a,d,d,a,a,d,d,a,d],p=6,u=6,h=3,f=new Float32Array(h*u*p),y=new Float32Array(h*u*p);for(let g=0;g<p;g++){let M=g%3*2/3-1,_=g>2?0:-1,x=[M,_,0,M+2/3,_,0,M+2/3,_+1,0,M,_,0,M+2/3,_+1,0,M,_+1,0];f.set(x,h*u*g);for(let T=0;T<u;T++){let w=c[T*2]*2-1,E=c[T*2+1]*2-1;g===0?Qi.set(1,E,w):g===1?Qi.set(-w,1,-E):g===2?Qi.set(-w,E,1):g===3?Qi.set(-1,E,-w):g===4?Qi.set(-w,-1,E):Qi.set(w,E,-1),Qi.toArray(y,(g*u+T)*h)}}let m=new Mn;m.setAttribute("position",new An(f,h)),m.setAttribute("outputDirection",new An(y,h)),t.push(new Ut(m,null)),n>Os&&n--}return{lodMeshes:t,sizeLods:e}}function bd(i,e,t){let n=new pn(i,e,t);return n.texture.mapping=Pr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ks(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function fg(i,e,t){return new Sn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:hg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function pg(i,e,t){return new Sn({name:"SphericalGaussianBlur",defines:{SAMPLES:cg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:rl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function Md(){return new Sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rl(),fragmentShader:`

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
		`,blending:ei,depthTest:!1,depthWrite:!1})}function xd(){return new Sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ei,depthTest:!1,depthWrite:!1})}function rl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var il=class extends pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ur(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new kn(5,5,5),r=new Sn({name:"CubemapFromEquirect",uniforms:ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:un,blending:ei});r.uniforms.tEquirect.value=t;let l=new Ut(s,r),o=t.minFilter;return t.minFilter===Ni&&(t.minFilter=Kt),new lo(1,10,this).update(e,l),t.minFilter=o,l.geometry.dispose(),l.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let l=0;l<6;l++)e.setRenderTarget(this,l),e.clear(t,n,s);e.setRenderTarget(r)}};function mg(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,h=!1){return u==null?null:h?l(u):r(u)}function r(u){if(u&&u.isTexture){let h=u.mapping;if(h===uo||h===fo)if(e.has(u)){let f=e.get(u).texture;return o(f,u.mapping)}else{let f=u.image;if(f&&f.height>0){let y=new il(f.height);return y.fromEquirectangularTexture(i,u),e.set(u,y),u.addEventListener("dispose",d),o(y.texture,u.mapping)}else return null}}return u}function l(u){if(u&&u.isTexture){let h=u.mapping,f=h===uo||h===fo,y=h===Di||h===Ki;if(f||y){let m=t.get(u),g=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new nl(i)),m=f?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let M=u.image;return f&&M&&M.height>0||y&&M&&a(M)?(n===null&&(n=new nl(i)),m=f?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",c),m.texture):null}}}return u}function o(u,h){return h===uo?u.mapping=Di:h===fo&&(u.mapping=Ki),u}function a(u){let h=0,f=6;for(let y=0;y<f;y++)u[y]!==void 0&&h++;return h===f}function d(u){let h=u.target;h.removeEventListener("dispose",d);let f=e.get(h);f!==void 0&&(e.delete(h),f.dispose())}function c(u){let h=u.target;h.removeEventListener("dispose",c);let f=t.get(h);f!==void 0&&(t.delete(h),f.dispose())}function p(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function gg(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&$i("WebGLRenderer: "+n+" extension not supported."),s}}}function yg(i,e,t,n){let s={},r=new WeakMap;function l(p){let u=p.target;u.index!==null&&e.remove(u.index);for(let f in u.attributes)e.remove(u.attributes[f]);u.removeEventListener("dispose",l),delete s[u.id];let h=r.get(u);h&&(e.remove(h),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",l),s[u.id]=!0,t.memory.geometries++),u}function a(p){let u=p.attributes;for(let h in u)e.update(u[h],i.ARRAY_BUFFER)}function d(p){let u=[],h=p.index,f=p.attributes.position,y=0;if(f===void 0)return;if(h!==null){let M=h.array;y=h.version;for(let _=0,x=M.length;_<x;_+=3){let T=M[_+0],w=M[_+1],E=M[_+2];u.push(T,w,w,E,E,T)}}else{let M=f.array;y=f.version;for(let _=0,x=M.length/3-1;_<x;_+=3){let T=_+0,w=_+1,E=_+2;u.push(T,w,w,E,E,T)}}let m=new(f.count>=65535?hr:cr)(u,1);m.version=y;let g=r.get(p);g&&e.remove(g),r.set(p,m)}function c(p){let u=r.get(p);if(u){let h=p.index;h!==null&&u.version<h.version&&d(p)}else d(p);return r.get(p)}return{get:o,update:a,getWireframeAttribute:c}}function _g(i,e,t){let n;function s(p){n=p}let r,l;function o(p){r=p.type,l=p.bytesPerElement}function a(p,u){i.drawElements(n,u,r,p*l),t.update(u,n,1)}function d(p,u,h){h!==0&&(i.drawElementsInstanced(n,u,r,p*l,h),t.update(u,n,h))}function c(p,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,p,0,h);let y=0;for(let m=0;m<h;m++)y+=u[m];t.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=a,this.renderInstances=d,this.renderMultiDraw=c}function vg(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,l,o){switch(t.calls++,l){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:st("WebGLInfo: Unknown draw mode:",l);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function bg(i,e,t){let n=new WeakMap,s=new Dt;function r(l,o,a){let d=l.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=c!==void 0?c.length:0,u=n.get(o);if(u===void 0||u.count!==p){let S=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();let h=o.morphAttributes.position!==void 0,f=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],_=0;h===!0&&(_=1),f===!0&&(_=2),y===!0&&(_=3);let x=o.attributes.position.count*_,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let w=new Float32Array(x*T*4*p),E=new ar(w,x,T,p);E.type=Gn,E.needsUpdate=!0;let b=_*4;for(let A=0;A<p;A++){let R=m[A],I=g[A],O=M[A],D=x*T*4*A;for(let L=0;L<R.count;L++){let P=L*b;h===!0&&(s.fromBufferAttribute(R,L),w[D+P+0]=s.x,w[D+P+1]=s.y,w[D+P+2]=s.z,w[D+P+3]=0),f===!0&&(s.fromBufferAttribute(I,L),w[D+P+4]=s.x,w[D+P+5]=s.y,w[D+P+6]=s.z,w[D+P+7]=0),y===!0&&(s.fromBufferAttribute(O,L),w[D+P+8]=s.x,w[D+P+9]=s.y,w[D+P+10]=s.z,w[D+P+11]=O.itemSize===4?s.w:1)}}u={count:p,texture:E,size:new Le(x,T)},n.set(o,u),o.addEventListener("dispose",S)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)a.getUniforms().setValue(i,"morphTexture",l.morphTexture,t);else{let h=0;for(let y=0;y<d.length;y++)h+=d[y];let f=o.morphTargetsRelative?1:1-h;a.getUniforms().setValue(i,"morphTargetBaseInfluence",f),a.getUniforms().setValue(i,"morphTargetInfluences",d)}a.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),a.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Mg(i,e,t,n,s){let r=new WeakMap;function l(d){let c=s.render.frame,p=d.geometry,u=e.get(d,p);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),d.isInstancedMesh&&(d.hasEventListener("dispose",a)===!1&&d.addEventListener("dispose",a),r.get(d)!==c&&(t.update(d.instanceMatrix,i.ARRAY_BUFFER),d.instanceColor!==null&&t.update(d.instanceColor,i.ARRAY_BUFFER),r.set(d,c))),d.isSkinnedMesh){let h=d.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return u}function o(){r=new WeakMap}function a(d){let c=d.target;c.removeEventListener("dispose",a),n.releaseStatesOfObject(c),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:l,dispose:o}}var xg={[bc]:"LINEAR_TONE_MAPPING",[Mc]:"REINHARD_TONE_MAPPING",[xc]:"CINEON_TONE_MAPPING",[Cr]:"ACES_FILMIC_TONE_MAPPING",[wc]:"AGX_TONE_MAPPING",[Tc]:"NEUTRAL_TONE_MAPPING",[Sc]:"CUSTOM_TONE_MAPPING"};function Sg(i,e,t,n,s,r){let l=new pn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,a=null,d=new Mn;d.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Wt([0,2,0,0,2,0],2));let c=new Ya({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new Ut(d,c),u=new Ps(-1,1,1,-1,0,1),h=null,f=null,y=!1,m,g=null,M=[],_=!1;this.setSize=function(x,T){l.setSize(x,T),o!==null&&o.setSize(x,T),a!==null&&a.setSize(x,T);for(let w=0;w<M.length;w++){let E=M[w];E.setSize&&E.setSize(x,T)}},this.setEffects=function(x){M=x,_=M.length>0&&M[0].isRenderPass===!0;let T=l.width,w=l.height;M.length>0&&o===null&&(o=new pn(T,w,{type:Wn,depthBuffer:!1,stencilBuffer:!1}),a=new pn(T,w,{type:Wn,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<M.length;E++){let b=M[E];b.setSize&&b.setSize(T,w)}},this.begin=function(x,T){if(y||x.toneMapping===Bn&&M.length===0)return!1;if(g=T,T!==null){let w=T.width,E=T.height;(l.width!==w||l.height!==E)&&this.setSize(w,E)}return _===!1&&x.setRenderTarget(l),m=x.toneMapping,x.toneMapping=Bn,!0},this.hasRenderPass=function(){return _},this.end=function(x,T){x.toneMapping=m,y=!0;let w=l,E=o;for(let b=0;b<M.length;b++){let S=M[b];S.enabled!==!1&&(S.render(x,E,w,T),S.needsSwap!==!1&&(w=E,E=E===o?a:o))}if(h!==x.outputColorSpace||f!==x.toneMapping){h=x.outputColorSpace,f=x.toneMapping,c.defines={},yt.getTransfer(h)===Mt&&(c.defines.SRGB_TRANSFER="");let b=xg[f];b&&(c.defines[b]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,x.setRenderTarget(g),x.render(p,u),g=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){l.dispose(),o!==null&&o.dispose(),a!==null&&a.dispose(),d.dispose(),c.dispose()}}var Wd=new hn,jc=new Ri(1,1),Vd=new ar,Hd=new za,$d=new ur,Sd=[],wd=[],Td=new Float32Array(16),Ed=new Float32Array(9),Ad=new Float32Array(4);function zs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Sd[s];if(r===void 0&&(r=new Float32Array(s),Sd[s]=r),e!==0){n.toArray(r,0);for(let l=1,o=0;l!==e;++l)o+=t,i[l].toArray(r,o)}return r}function Ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function $t(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function al(i,e){let t=wd[e];t===void 0&&(t=new Int32Array(e),wd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function wg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Tg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2fv(this.addr,e),$t(t,e)}}function Eg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;i.uniform3fv(this.addr,e),$t(t,e)}}function Ag(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4fv(this.addr,e),$t(t,e)}}function Rg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),$t(t,e)}else{if(Ht(t,n))return;Ad.set(n),i.uniformMatrix2fv(this.addr,!1,Ad),$t(t,n)}}function Cg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),$t(t,e)}else{if(Ht(t,n))return;Ed.set(n),i.uniformMatrix3fv(this.addr,!1,Ed),$t(t,n)}}function Pg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),$t(t,e)}else{if(Ht(t,n))return;Td.set(n),i.uniformMatrix4fv(this.addr,!1,Td),$t(t,n)}}function Ig(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Lg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2iv(this.addr,e),$t(t,e)}}function Dg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3iv(this.addr,e),$t(t,e)}}function Ng(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4iv(this.addr,e),$t(t,e)}}function Ug(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Fg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2uiv(this.addr,e),$t(t,e)}}function kg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3uiv(this.addr,e),$t(t,e)}}function Og(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4uiv(this.addr,e),$t(t,e)}}function Bg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(jc.compareFunction=t.isReversedDepthBuffer()?Qo:jo,r=jc):r=Wd,t.setTexture2D(e||r,s)}function zg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Hd,s)}function Gg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||$d,s)}function Wg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Vd,s)}function Vg(i){switch(i){case 5126:return wg;case 35664:return Tg;case 35665:return Eg;case 35666:return Ag;case 35674:return Rg;case 35675:return Cg;case 35676:return Pg;case 5124:case 35670:return Ig;case 35667:case 35671:return Lg;case 35668:case 35672:return Dg;case 35669:case 35673:return Ng;case 5125:return Ug;case 36294:return Fg;case 36295:return kg;case 36296:return Og;case 35678:case 36198:case 36298:case 36306:case 35682:return Bg;case 35679:case 36299:case 36307:return zg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Wg}}function Hg(i,e){i.uniform1fv(this.addr,e)}function $g(i,e){let t=zs(e,this.size,2);i.uniform2fv(this.addr,t)}function Xg(i,e){let t=zs(e,this.size,3);i.uniform3fv(this.addr,t)}function qg(i,e){let t=zs(e,this.size,4);i.uniform4fv(this.addr,t)}function Yg(i,e){let t=zs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Jg(i,e){let t=zs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Zg(i,e){let t=zs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Kg(i,e){i.uniform1iv(this.addr,e)}function jg(i,e){i.uniform2iv(this.addr,e)}function Qg(i,e){i.uniform3iv(this.addr,e)}function e2(i,e){i.uniform4iv(this.addr,e)}function t2(i,e){i.uniform1uiv(this.addr,e)}function n2(i,e){i.uniform2uiv(this.addr,e)}function i2(i,e){i.uniform3uiv(this.addr,e)}function s2(i,e){i.uniform4uiv(this.addr,e)}function r2(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));let l;this.type===i.SAMPLER_2D_SHADOW?l=jc:l=Wd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||l,r[o])}function a2(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let l=0;l!==s;++l)t.setTexture3D(e[l]||Hd,r[l])}function o2(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let l=0;l!==s;++l)t.setTextureCube(e[l]||$d,r[l])}function l2(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Ht(n,r)||(i.uniform1iv(this.addr,r),$t(n,r));for(let l=0;l!==s;++l)t.setTexture2DArray(e[l]||Vd,r[l])}function c2(i){switch(i){case 5126:return Hg;case 35664:return $g;case 35665:return Xg;case 35666:return qg;case 35674:return Yg;case 35675:return Jg;case 35676:return Zg;case 5124:case 35670:return Kg;case 35667:case 35671:return jg;case 35668:case 35672:return Qg;case 35669:case 35673:return e2;case 5125:return t2;case 36294:return n2;case 36295:return i2;case 36296:return s2;case 35678:case 36198:case 36298:case 36306:case 35682:return r2;case 35679:case 36299:case 36307:return a2;case 35680:case 36300:case 36308:case 36293:return o2;case 36289:case 36303:case 36311:case 36292:return l2}}var Qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Vg(t.type)}},eh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=c2(t.type)}},th=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,l=s.length;r!==l;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Zc=/(\w+)(\])?(\[|\.)?/g;function Rd(i,e){i.seq.push(e),i.map[e.id]=e}function h2(i,e,t){let n=i.name,s=n.length;for(Zc.lastIndex=0;;){let r=Zc.exec(n),l=Zc.lastIndex,o=r[1],a=r[2]==="]",d=r[3];if(a&&(o=o|0),d===void 0||d==="["&&l+2===s){Rd(t,d===void 0?new Qc(o,i,e):new eh(o,i,e));break}else{let p=t.map[o];p===void 0&&(p=new th(o),Rd(t,p)),t=p}}}var Bs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let l=0;l<n;++l){let o=e.getActiveUniform(t,l),a=e.getUniformLocation(t,o.name);h2(o,a,this)}let s=[],r=[];for(let l of this.seq)l.type===e.SAMPLER_2D_SHADOW||l.type===e.SAMPLER_CUBE_SHADOW||l.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(l):r.push(l);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,l=t.length;r!==l;++r){let o=t[r],a=n[o.id];a.needsUpdate!==!1&&o.setValue(e,a.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let l=e[s];l.id in t&&n.push(l)}return n}};function Cd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var u2=37297,d2=0;function f2(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let l=s;l<r;l++){let o=l+1;n.push(`${o===e?">":" "} ${o}: ${t[l]}`)}return n.join(`
`)}var Pd=new lt;function p2(i){yt._getMatrix(Pd,yt.workingColorSpace,i);let e=`mat3( ${Pd.elements.map(t=>t.toFixed(4))} )`;switch(yt.getTransfer(i)){case sr:return[e,"LinearTransferOETF"];case Mt:return[e,"sRGBTransferOETF"];default:return it("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Id(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let l=/ERROR: 0:(\d+)/.exec(r);if(l){let o=parseInt(l[1]);return t.toUpperCase()+`

`+r+`

`+f2(i.getShaderSource(e),o)}else return r}function m2(i,e){let t=p2(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var g2={[bc]:"Linear",[Mc]:"Reinhard",[xc]:"Cineon",[Cr]:"ACESFilmic",[wc]:"AgX",[Tc]:"Neutral",[Sc]:"Custom"};function y2(i,e){let t=g2[e];return t===void 0?(it("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var tl=new te;function _2(){yt.getLuminanceCoefficients(tl);let i=tl.x.toFixed(4),e=tl.y.toFixed(4),t=tl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function v2(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zr).join(`
`)}function b2(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function M2(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),l=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[l]={type:r.type,location:i.getAttribLocation(e,l),locationSize:o}}return t}function zr(i){return i!==""}function Ld(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var x2=/^[ \t]*#include +<([\w\d./]+)>/gm;function nh(i){return i.replace(x2,w2)}var S2=new Map;function w2(i,e){let t=pt[e];if(t===void 0){let n=S2.get(e);if(n!==void 0)t=pt[n],it('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return nh(t)}var T2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nd(i){return i.replace(T2,E2)}function E2(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ud(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var A2={[Rr]:"SHADOWMAP_TYPE_PCF",[Ls]:"SHADOWMAP_TYPE_VSM"};function R2(i){return A2[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var C2={[Di]:"ENVMAP_TYPE_CUBE",[Ki]:"ENVMAP_TYPE_CUBE",[Pr]:"ENVMAP_TYPE_CUBE_UV"};function P2(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":C2[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var I2={[Ki]:"ENVMAP_MODE_REFRACTION"};function L2(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":I2[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var D2={[vc]:"ENVMAP_BLENDING_MULTIPLY",[Yu]:"ENVMAP_BLENDING_MIX",[Ju]:"ENVMAP_BLENDING_ADD"};function N2(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":D2[i.combine]||"ENVMAP_BLENDING_NONE"}function U2(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function F2(i,e,t,n){let s=i.getContext(),r=t.defines,l=t.vertexShader,o=t.fragmentShader,a=R2(t),d=P2(t),c=L2(t),p=N2(t),u=U2(t),h=v2(t),f=b2(r),y=s.createProgram(),m,g,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(zr).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(zr).join(`
`),g.length>0&&(g+=`
`)):(m=[Ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zr).join(`
`),g=[Ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+c:"",t.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?pt.tonemapping_pars_fragment:"",t.toneMapping!==Bn?y2("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,m2("linearToOutputTexel",t.outputColorSpace),_2(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zr).join(`
`)),l=nh(l),l=Ld(l,t),l=Dd(l,t),o=nh(o),o=Ld(o,t),o=Dd(o,t),l=Nd(l),o=Nd(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Nc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let _=M+m+l,x=M+g+o,T=Cd(s,s.VERTEX_SHADER,_),w=Cd(s,s.FRAGMENT_SHADER,x);s.attachShader(y,T),s.attachShader(y,w),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function E(R){if(i.debug.checkShaderErrors){let I=s.getProgramInfoLog(y)||"",O=s.getShaderInfoLog(T)||"",D=s.getShaderInfoLog(w)||"",L=I.trim(),P=O.trim(),F=D.trim(),G=!0,z=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,T,w);else{let V=Id(s,T,"vertex"),U=Id(s,w,"fragment");st("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+L+`
`+V+`
`+U)}else L!==""?it("WebGLProgram: Program Info Log:",L):(P===""||F==="")&&(z=!1);z&&(R.diagnostics={runnable:G,programLog:L,vertexShader:{log:P,prefix:m},fragmentShader:{log:F,prefix:g}})}s.deleteShader(T),s.deleteShader(w),b=new Bs(s,y),S=M2(s,y)}let b;this.getUniforms=function(){return b===void 0&&E(this),b};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(y,u2)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=d2++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=w,this}var k2=0,ih=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new sh(e),t.set(e,n)),n}},sh=class{constructor(e){this.id=k2++,this.code=e,this.usedTimes=0}};function O2(i){return i===Fi||i===Fr||i===kr}function B2(i,e,t,n,s,r){let l=new or,o=new ih,a=new Set,d=[],c=new Map,p=n.logarithmicDepthBuffer,u=n.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(b){return a.add(b),b===0?"uv":`uv${b}`}function y(b,S,A,R,I,O){let D=R.fog,L=I.geometry,P=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?R.environment:null,F=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,G=e.get(b.envMap||P,F),z=G&&G.mapping===Pr?G.image.height:null,V=h[b.type];b.precision!==null&&(u=n.getMaxPrecision(b.precision),u!==b.precision&&it("WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));let U=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,H=U!==void 0?U.length:0,K=0;L.morphAttributes.position!==void 0&&(K=1),L.morphAttributes.normal!==void 0&&(K=2),L.morphAttributes.color!==void 0&&(K=3);let ce,Z,Y,B;if(V){let Tt=ni[V];ce=Tt.vertexShader,Z=Tt.fragmentShader}else{ce=b.vertexShader,Z=b.fragmentShader;let Tt=o.getVertexShaderStage(b),vt=o.getFragmentShaderStage(b);o.update(b,Tt,vt),Y=Tt.id,B=vt.id}let N=i.getRenderTarget(),q=i.state.buffers.depth.getReversed(),re=I.isInstancedMesh===!0,ae=I.isBatchedMesh===!0,he=!!b.map,xe=!!b.matcap,ne=!!G,fe=!!b.aoMap,me=!!b.lightMap,ye=!!b.bumpMap&&b.wireframe===!1,Q=!!b.normalMap,_e=!!b.displacementMap,Te=!!b.emissiveMap,ue=!!b.metalnessMap,we=!!b.roughnessMap,$=b.anisotropy>0,ze=b.clearcoat>0,Ye=b.dispersion>0,W=b.retroreflectivity>0,C=b.iridescence>0,ee=b.sheen>0,ie=b.transmission>0,pe=$&&!!b.anisotropyMap,Ee=ze&&!!b.clearcoatMap,Re=ze&&!!b.clearcoatNormalMap,ge=ze&&!!b.clearcoatRoughnessMap,ve=C&&!!b.iridescenceMap,Pe=C&&!!b.iridescenceThicknessMap,Ke=ee&&!!b.sheenColorMap,Fe=ee&&!!b.sheenRoughnessMap,De=!!b.specularMap,je=!!b.specularColorMap,nt=!!b.specularIntensityMap,ht=ie&&!!b.transmissionMap,j=ie&&!!b.thicknessMap,Ne=!!b.gradientMap,be=!!b.alphaMap,Ue=b.alphaTest>0,Ge=!!b.alphaHash,Se=!!b.extensions,et=Bn;b.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(et=i.toneMapping);let Je={shaderID:V,shaderType:b.type,shaderName:b.name,vertexShader:ce,fragmentShader:Z,defines:b.defines,customVertexShaderID:Y,customFragmentShaderID:B,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:ae,batchingColor:ae&&I._colorsTexture!==null,instancing:re,instancingColor:re&&I.instanceColor!==null,instancingMorph:re&&I.morphTexture!==null,outputColorSpace:N===null?i.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:yt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:he,matcap:xe,envMap:ne,envMapMode:ne&&G.mapping,envMapCubeUVHeight:z,aoMap:fe,lightMap:me,bumpMap:ye,normalMap:Q,displacementMap:_e,emissiveMap:Te,normalMapObjectSpace:Q&&b.normalMapType===ju,normalMapTangentSpace:Q&&b.normalMapType===Ko,packedNormalMap:Q&&b.normalMapType===Ko&&O2(b.normalMap.format),metalnessMap:ue,roughnessMap:we,anisotropy:$,anisotropyMap:pe,clearcoat:ze,clearcoatMap:Ee,clearcoatNormalMap:Re,clearcoatRoughnessMap:ge,dispersion:Ye,retroreflection:W,iridescence:C,iridescenceMap:ve,iridescenceThicknessMap:Pe,sheen:ee,sheenColorMap:Ke,sheenRoughnessMap:Fe,specularMap:De,specularColorMap:je,specularIntensityMap:nt,transmission:ie,transmissionMap:ht,thicknessMap:j,gradientMap:Ne,opaque:b.transparent===!1&&b.blending===Ds&&b.alphaToCoverage===!1,alphaMap:be,alphaTest:Ue,alphaHash:Ge,combine:b.combine,mapUv:he&&f(b.map.channel),aoMapUv:fe&&f(b.aoMap.channel),lightMapUv:me&&f(b.lightMap.channel),bumpMapUv:ye&&f(b.bumpMap.channel),normalMapUv:Q&&f(b.normalMap.channel),displacementMapUv:_e&&f(b.displacementMap.channel),emissiveMapUv:Te&&f(b.emissiveMap.channel),metalnessMapUv:ue&&f(b.metalnessMap.channel),roughnessMapUv:we&&f(b.roughnessMap.channel),anisotropyMapUv:pe&&f(b.anisotropyMap.channel),clearcoatMapUv:Ee&&f(b.clearcoatMap.channel),clearcoatNormalMapUv:Re&&f(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&f(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&f(b.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&f(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ke&&f(b.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&f(b.sheenRoughnessMap.channel),specularMapUv:De&&f(b.specularMap.channel),specularColorMapUv:je&&f(b.specularColorMap.channel),specularIntensityMapUv:nt&&f(b.specularIntensityMap.channel),transmissionMapUv:ht&&f(b.transmissionMap.channel),thicknessMapUv:j&&f(b.thicknessMap.channel),alphaMapUv:be&&f(b.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Q||$),vertexNormals:!!L.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!L.attributes.uv&&(he||be),fog:!!D,useFog:b.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||L.attributes.normal===void 0&&Q===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:q,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:H,morphTextureStride:K,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:et,decodeVideoTexture:he&&b.map.isVideoTexture===!0&&yt.getTransfer(b.map.colorSpace)===Mt,decodeVideoTextureEmissive:Te&&b.emissiveMap.isVideoTexture===!0&&yt.getTransfer(b.emissiveMap.colorSpace)===Mt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Qn,flipSided:b.side===un,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Se&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&b.extensions.multiDraw===!0||ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Je.vertexUv1s=a.has(1),Je.vertexUv2s=a.has(2),Je.vertexUv3s=a.has(3),a.clear(),Je}function m(b){let S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(let A in b.defines)S.push(A),S.push(b.defines[A]);return b.isRawShaderMaterial===!1&&(g(S,b),M(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function g(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numSunLights),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numSunLightShadows),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function M(b,S){l.disableAll(),S.instancing&&l.enable(0),S.instancingColor&&l.enable(1),S.instancingMorph&&l.enable(2),S.matcap&&l.enable(3),S.envMap&&l.enable(4),S.normalMapObjectSpace&&l.enable(5),S.normalMapTangentSpace&&l.enable(6),S.clearcoat&&l.enable(7),S.iridescence&&l.enable(8),S.alphaTest&&l.enable(9),S.vertexColors&&l.enable(10),S.vertexAlphas&&l.enable(11),S.vertexUv1s&&l.enable(12),S.vertexUv2s&&l.enable(13),S.vertexUv3s&&l.enable(14),S.vertexTangents&&l.enable(15),S.anisotropy&&l.enable(16),S.alphaHash&&l.enable(17),S.batching&&l.enable(18),S.dispersion&&l.enable(19),S.retroreflection&&l.enable(24),S.batchingColor&&l.enable(20),S.gradientMap&&l.enable(21),S.packedNormalMap&&l.enable(22),S.vertexNormals&&l.enable(23),b.push(l.mask),l.disableAll(),S.fog&&l.enable(0),S.useFog&&l.enable(1),S.flatShading&&l.enable(2),S.logarithmicDepthBuffer&&l.enable(3),S.reversedDepthBuffer&&l.enable(4),S.skinning&&l.enable(5),S.morphTargets&&l.enable(6),S.morphNormals&&l.enable(7),S.morphColors&&l.enable(8),S.premultipliedAlpha&&l.enable(9),S.shadowMapEnabled&&l.enable(10),S.doubleSided&&l.enable(11),S.flipSided&&l.enable(12),S.useDepthPacking&&l.enable(13),S.dithering&&l.enable(14),S.transmission&&l.enable(15),S.sheen&&l.enable(16),S.opaque&&l.enable(17),S.pointsUvs&&l.enable(18),S.decodeVideoTexture&&l.enable(19),S.decodeVideoTextureEmissive&&l.enable(20),S.alphaToCoverage&&l.enable(21),S.numLightProbeGrids>0&&l.enable(22),S.hasPositionAttribute&&l.enable(23),b.push(l.mask)}function _(b){let S=h[b.type],A;if(S){let R=ni[S];A=gd.clone(R.uniforms)}else A=b.uniforms;return A}function x(b,S){let A=c.get(S);return A!==void 0?++A.usedTimes:(A=new F2(i,S,b,s),d.push(A),c.set(S,A)),A}function T(b){if(--b.usedTimes===0){let S=d.indexOf(b);d[S]=d[d.length-1],d.pop(),c.delete(b.cacheKey),b.destroy()}}function w(b){o.remove(b)}function E(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:_,acquireProgram:x,releaseProgram:T,releaseShaderCache:w,programs:d,dispose:E}}function z2(){let i=new WeakMap;function e(l){return i.has(l)}function t(l){let o=i.get(l);return o===void 0&&(o={},i.set(l,o)),o}function n(l){i.delete(l)}function s(l,o,a){i.get(l)[o]=a}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function G2(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Fd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function kd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function l(u){let h=0;return u.isInstancedMesh&&(h+=2),u.isSkinnedMesh&&(h+=1),h}function o(u,h,f,y,m,g){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:h,material:f,materialVariant:l(u),groupOrder:y,renderOrder:u.renderOrder,z:m,group:g},i[e]=M):(M.id=u.id,M.object=u,M.geometry=h,M.material=f,M.materialVariant=l(u),M.groupOrder=y,M.renderOrder=u.renderOrder,M.z=m,M.group=g),e++,M}function a(u,h,f,y,m,g,M){M.reversedDepth===!0&&(m=-m);let _=o(u,h,f,y,m,g);f.transmission>0?n.push(_):f.transparent===!0?s.push(_):t.push(_)}function d(u,h,f,y,m,g){let M=o(u,h,f,y,m,g);f.transmission>0?n.unshift(M):f.transparent===!0?s.unshift(M):t.unshift(M)}function c(u,h){t.length>1&&t.sort(u||G2),n.length>1&&n.sort(h||Fd),s.length>1&&s.sort(h||Fd)}function p(){for(let u=e,h=i.length;u<h;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:d,finish:p,sort:c}}function W2(){let i=new WeakMap;function e(n,s){let r=i.get(n),l;return r===void 0?(l=new kd,i.set(n,[l])):s>=r.length?(l=new kd,r.push(l)):l=r[s],l}function t(){i=new WeakMap}return{get:e,dispose:t}}function V2(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new te,color:new ut};break;case"SpotLight":t={position:new te,direction:new te,color:new ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new te,color:new ut,distance:0,decay:0};break;case"HemisphereLight":t={direction:new te,skyColor:new ut,groundColor:new ut};break;case"RectAreaLight":t={color:new ut,position:new te,halfWidth:new te,halfHeight:new te};break}return i[e.id]=t,t}}}function H2(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var $2=0;function X2(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function q2(i){let e=new V2,t=H2(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new te);let s=new te,r=new Lt,l=new Lt;function o(d){let c=0,p=0,u=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let h=0,f=0,y=0,m=0,g=0,M=0,_=0,x=0,T=0,w=0,E=0,b=0,S=0,A=0;d.sort(X2);for(let I=0,O=d.length;I<O;I++){let D=d[I],L=D.color,P=D.intensity,F=D.distance,G=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Fi?G=D.shadow.map.texture:G=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)c+=L.r*P,p+=L.g*P,u+=L.b*P;else if(D.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(D.sh.coefficients[z],P);A++}else if(D.isSunLight){let z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let V=D.shadow,U=t.get(D);U.shadowIntensity=V.intensity,U.shadowBias=V.bias,U.shadowNormalBias=V.normalBias,U.shadowRadius=V.radius,U.shadowMapSize.copy(V.mapSize).multiply(V.getFrameExtents()),n.sunShadow[f]=U,n.sunShadowMap[f]=G;let H=V.getViewportCount();for(let K=0;K<H;K++)n.sunShadowMatrix[y+K]=V.getMatrix(K),n.sunShadowCascade[y+K]=V._cascadeData[K];y+=H,f++}n.sun[h]=z,h++}else if(D.isDirectionalLight){let z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let V=D.shadow,U=t.get(D);U.shadowIntensity=V.intensity,U.shadowBias=V.bias,U.shadowNormalBias=V.normalBias,U.shadowRadius=V.radius,U.shadowMapSize=V.mapSize,n.directionalShadow[m]=U,n.directionalShadowMap[m]=G,n.directionalShadowMatrix[m]=D.shadow.matrix,T++}n.directional[m]=z,m++}else if(D.isSpotLight){let z=e.get(D);z.position.setFromMatrixPosition(D.matrixWorld),z.color.copy(L).multiplyScalar(P),z.distance=F,z.coneCos=Math.cos(D.angle),z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),z.decay=D.decay,n.spot[M]=z;let V=D.shadow;if(D.map&&(n.spotLightMap[b]=D.map,b++,V.updateMatrices(D),D.castShadow&&S++),n.spotLightMatrix[M]=V.matrix,D.castShadow){let U=t.get(D);U.shadowIntensity=V.intensity,U.shadowBias=V.bias,U.shadowNormalBias=V.normalBias,U.shadowRadius=V.radius,U.shadowMapSize=V.mapSize,n.spotShadow[M]=U,n.spotShadowMap[M]=G,E++}M++}else if(D.isRectAreaLight){let z=e.get(D);z.color.copy(L).multiplyScalar(P),z.halfWidth.set(D.width*.5,0,0),z.halfHeight.set(0,D.height*.5,0),n.rectArea[_]=z,_++}else if(D.isPointLight){let z=e.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),z.distance=D.distance,z.decay=D.decay,D.castShadow){let V=D.shadow,U=t.get(D);U.shadowIntensity=V.intensity,U.shadowBias=V.bias,U.shadowNormalBias=V.normalBias,U.shadowRadius=V.radius,U.shadowMapSize=V.mapSize,U.shadowCameraNear=V.camera.near,U.shadowCameraFar=V.camera.far,n.pointShadow[g]=U,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=D.shadow.matrix,w++}n.point[g]=z,g++}else if(D.isHemisphereLight){let z=e.get(D);z.skyColor.copy(D.color).multiplyScalar(P),z.groundColor.copy(D.groundColor).multiplyScalar(P),n.hemi[x]=z,x++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ke.LTC_FLOAT_1,n.rectAreaLTC2=ke.LTC_FLOAT_2):(n.rectAreaLTC1=ke.LTC_HALF_1,n.rectAreaLTC2=ke.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=p,n.ambient[2]=u;let R=n.hash;(R.sunLength!==h||R.directionalLength!==m||R.pointLength!==g||R.spotLength!==M||R.rectAreaLength!==_||R.hemiLength!==x||R.numSunShadows!==f||R.numDirectionalShadows!==T||R.numPointShadows!==w||R.numSpotShadows!==E||R.numSpotMaps!==b||R.numLightProbes!==A)&&(n.sun.length=h,n.directional.length=m,n.spot.length=M,n.rectArea.length=_,n.point.length=g,n.hemi.length=x,n.sunShadow.length=f,n.sunShadowMap.length=f,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+b-S,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,R.sunLength=h,R.directionalLength=m,R.pointLength=g,R.spotLength=M,R.rectAreaLength=_,R.hemiLength=x,R.numSunShadows=f,R.numDirectionalShadows=T,R.numPointShadows=w,R.numSpotShadows=E,R.numSpotMaps=b,R.numLightProbes=A,n.version=$2++)}function a(d,c){let p=0,u=0,h=0,f=0,y=0,m=0,g=c.matrixWorldInverse;for(let M=0,_=d.length;M<_;M++){let x=d[M];if(x.isSunLight){let T=n.sun[p];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(g),p++}else if(x.isDirectionalLight){let T=n.directional[u];T.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),u++}else if(x.isSpotLight){let T=n.spot[f];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),f++}else if(x.isRectAreaLight){let T=n.rectArea[y];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(g),l.identity(),r.copy(x.matrixWorld),r.premultiply(g),l.extractRotation(r),T.halfWidth.set(x.width*.5,0,0),T.halfHeight.set(0,x.height*.5,0),T.halfWidth.applyMatrix4(l),T.halfHeight.applyMatrix4(l),y++}else if(x.isPointLight){let T=n.point[h];T.position.setFromMatrixPosition(x.matrixWorld),T.position.applyMatrix4(g),h++}else if(x.isHemisphereLight){let T=n.hemi[m];T.direction.setFromMatrixPosition(x.matrixWorld),T.direction.transformDirection(g),m++}}}return{setup:o,setupView:a,state:n}}function Od(i){let e=new q2(i),t=[],n=[],s=[];function r(u){p.camera=u,t.length=0,n.length=0,s.length=0}function l(u){t.push(u)}function o(u){n.push(u)}function a(u){s.push(u)}function d(){e.setup(t)}function c(u){e.setupView(t,u)}let p={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:d,setupLightsView:c,pushLight:l,pushShadow:o,pushLightProbeGrid:a}}function Y2(i){let e=new WeakMap;function t(s,r=0){let l=e.get(s),o;return l===void 0?(o=new Od(i),e.set(s,[o])):r>=l.length?(o=new Od(i),l.push(o)):o=l[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var J2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Z2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,K2=[new te(1,0,0),new te(-1,0,0),new te(0,1,0),new te(0,-1,0),new te(0,0,1),new te(0,0,-1)],j2=[new te(0,-1,0),new te(0,-1,0),new te(0,0,1),new te(0,0,-1),new te(0,-1,0),new te(0,-1,0)],Bd=new Lt,Br=new te,Kc=new te;function Q2(i,e,t){let n=new Ss,s=new Le,r=new Le,l=new Dt,o=new Ja,a=new Za,d={},c=t.maxTextureSize,p={[Li]:un,[un]:Li,[Qn]:Qn},u=new Sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:J2,fragmentShader:Z2}),h=u.clone();h.defines.HORIZONTAL_PASS=1;let f=new Mn;f.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Ut(f,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rr;let g=this.type;this.render=function(w,E,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Cu&&(it("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Rr);let S=i.getRenderTarget(),A=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),I=i.state;I.setBlending(ei),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let O=g!==this.type;O&&E.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(L=>L.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,L=w.length;D<L;D++){let P=w[D],F=P.shadow;if(F===void 0){it("WebGLShadowMap:",P,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);let G=F.getFrameExtents();s.multiply(G),r.copy(F.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/G.x),s.x=r.x*G.x,F.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/G.y),s.y=r.y*G.y,F.mapSize.y=r.y));let z=i.state.buffers.depth.getReversed();if(F.camera._reversedDepth=z,F.map===null||O===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Ls){if(P.isPointLight){it("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new pn(s.x,s.y,{format:Fi,type:Wn,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),F.map.texture.name=P.name+".shadowMap",F.map.depthTexture=new Ri(s.x,s.y,Gn),F.map.depthTexture.name=P.name+".shadowMapDepth",F.map.depthTexture.format=Zn,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Yt,F.map.depthTexture.magFilter=Yt}else P.isPointLight?(F.map=new il(s.x),F.map.depthTexture=new Va(s.x,zn)):(F.map=new pn(s.x,s.y),F.map.depthTexture=new Ri(s.x,s.y,zn)),F.map.depthTexture.name=P.name+".shadowMap",F.map.depthTexture.format=Zn,this.type===Rr?(F.map.depthTexture.compareFunction=z?Qo:jo,F.map.depthTexture.minFilter=Kt,F.map.depthTexture.magFilter=Kt):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Yt,F.map.depthTexture.magFilter=Yt);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==s.x||F.map.height!==s.y)&&F.map.setSize(s.x,s.y);let V=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();P.isPointLight!==!0&&F.updateMatrices(P,b);for(let U=0;U<V;U++){let H=F.getCamera(U);if(P.isPointLight){let K=F.camera,ce=F.matrix,Z=P.distance||K.far;Z!==K.far&&(K.far=Z,K.updateProjectionMatrix()),Br.setFromMatrixPosition(P.matrixWorld),K.position.copy(Br),Kc.copy(K.position),Kc.add(K2[U]),K.up.copy(j2[U]),K.lookAt(Kc),K.updateMatrixWorld(),ce.makeTranslation(-Br.x,-Br.y,-Br.z),Bd.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Bd,K.coordinateSystem,K.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)i.setRenderTarget(F.map,U),i.clear();else{U===0&&(i.setRenderTarget(F.map),i.clear());let K=F.getViewport(U);l.set(r.x*K.x,r.y*K.y,r.x*K.z,r.y*K.w),I.viewport(l)}n=F.getFrustum(U),x(E,b,H,P,this.type)}F.isPointLightShadow!==!0&&this.type===Ls&&M(F,b),F.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(S,A,R)};function M(w,E){let b=e.update(y);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,h.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,h.needsUpdate=!0),w.mapPass===null?w.mapPass=new pn(s.x,s.y,{format:Fi,type:Wn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(E,null,b,u,y,null),h.uniforms.shadow_pass.value=w.mapPass.texture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(E,null,b,h,y,null)}function _(w,E,b,S){let A=null,R=b.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)A=R;else if(A=b.isPointLight===!0?a:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let I=A.uuid,O=E.uuid,D=d[I];D===void 0&&(D={},d[I]=D);let L=D[O];L===void 0&&(L=A.clone(),D[O]=L,E.addEventListener("dispose",T)),A=L}if(A.visible=E.visible,A.wireframe=E.wireframe,S===Ls?A.side=E.shadowSide!==null?E.shadowSide:E.side:A.side=E.shadowSide!==null?E.shadowSide:p[E.side],A.alphaMap=E.alphaMap,A.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,A.map=E.map,A.clipShadows=E.clipShadows,A.clippingPlanes=E.clippingPlanes,A.clipIntersection=E.clipIntersection,A.displacementMap=E.displacementMap,A.displacementScale=E.displacementScale,A.displacementBias=E.displacementBias,A.wireframeLinewidth=E.wireframeLinewidth,A.linewidth=E.linewidth,b.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let I=i.properties.get(A);I.light=b}return A}function x(w,E,b,S,A){if(w.visible===!1)return;if(w.layers.test(E.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&A===Ls)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,w.matrixWorld);let O=e.update(w),D=w.material;if(Array.isArray(D)){let L=O.groups;for(let P=0,F=L.length;P<F;P++){let G=L[P],z=D[G.materialIndex];if(z&&z.visible){let V=_(w,z,S,A);w.onBeforeShadow(i,w,E,b,O,V,G),i.renderBufferDirect(b,null,O,V,w,G),w.onAfterShadow(i,w,E,b,O,V,G)}}}else if(D.visible){let L=_(w,D,S,A);w.onBeforeShadow(i,w,E,b,O,L,null),i.renderBufferDirect(b,null,O,L,w,null),w.onAfterShadow(i,w,E,b,O,L,null)}}let I=w.children;for(let O=0,D=I.length;O<D;O++)x(I[O],E,b,S,A)}function T(w){w.target.removeEventListener("dispose",T);for(let b in d){let S=d[b],A=w.target.uuid;A in S&&(S[A].dispose(),delete S[A])}}}function ey(i,e){function t(){let j=!1,Ne=new Dt,be=null,Ue=new Dt(0,0,0,0);return{setMask:function(Ge){be!==Ge&&!j&&(i.colorMask(Ge,Ge,Ge,Ge),be=Ge)},setLocked:function(Ge){j=Ge},setClear:function(Ge,Se,et,Je,Tt){Tt===!0&&(Ge*=Je,Se*=Je,et*=Je),Ne.set(Ge,Se,et,Je),Ue.equals(Ne)===!1&&(i.clearColor(Ge,Se,et,Je),Ue.copy(Ne))},reset:function(){j=!1,be=null,Ue.set(-1,0,0,0)}}}function n(){let j=!1,Ne=!1,be=null,Ue=null,Ge=null;return{setReversed:function(Se){if(Ne!==Se){let et=e.get("EXT_clip_control");Se?et.clipControlEXT(et.LOWER_LEFT_EXT,et.ZERO_TO_ONE_EXT):et.clipControlEXT(et.LOWER_LEFT_EXT,et.NEGATIVE_ONE_TO_ONE_EXT),Ne=Se;let Je=Ge;Ge=null,this.setClear(Je)}},getReversed:function(){return Ne},setTest:function(Se){Se?N(i.DEPTH_TEST):q(i.DEPTH_TEST)},setMask:function(Se){be!==Se&&!j&&(i.depthMask(Se),be=Se)},setFunc:function(Se){if(Ne&&(Se=hd[Se]),Ue!==Se){switch(Se){case Aa:i.depthFunc(i.NEVER);break;case Ra:i.depthFunc(i.ALWAYS);break;case Ca:i.depthFunc(i.LESS);break;case ys:i.depthFunc(i.LEQUAL);break;case Pa:i.depthFunc(i.EQUAL);break;case Ia:i.depthFunc(i.GEQUAL);break;case La:i.depthFunc(i.GREATER);break;case Da:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ue=Se}},setLocked:function(Se){j=Se},setClear:function(Se){Ge!==Se&&(Ge=Se,Ne&&(Se=1-Se),i.clearDepth(Se))},reset:function(){j=!1,be=null,Ue=null,Ge=null,Ne=!1}}}function s(){let j=!1,Ne=null,be=null,Ue=null,Ge=null,Se=null,et=null,Je=null,Tt=null;return{setTest:function(vt){j||(vt?N(i.STENCIL_TEST):q(i.STENCIL_TEST))},setMask:function(vt){Ne!==vt&&!j&&(i.stencilMask(vt),Ne=vt)},setFunc:function(vt,Cn,$n){(be!==vt||Ue!==Cn||Ge!==$n)&&(i.stencilFunc(vt,Cn,$n),be=vt,Ue=Cn,Ge=$n)},setOp:function(vt,Cn,$n){(Se!==vt||et!==Cn||Je!==$n)&&(i.stencilOp(vt,Cn,$n),Se=vt,et=Cn,Je=$n)},setLocked:function(vt){j=vt},setClear:function(vt){Tt!==vt&&(i.clearStencil(vt),Tt=vt)},reset:function(){j=!1,Ne=null,be=null,Ue=null,Ge=null,Se=null,et=null,Je=null,Tt=null}}}let r=new t,l=new n,o=new s,a=new WeakMap,d=new WeakMap,c={},p={},u={},h=new WeakMap,f=[],y=null,m=!1,g=null,M=null,_=null,x=null,T=null,w=null,E=null,b=new ut(0,0,0),S=0,A=!1,R=null,I=null,O=null,D=null,L=null,P=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,G=0,z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(z)[1]),F=G>=1):z.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),F=G>=2);let V=null,U={},H=i.getParameter(i.SCISSOR_BOX),K=i.getParameter(i.VIEWPORT),ce=new Dt().fromArray(H),Z=new Dt().fromArray(K);function Y(j,Ne,be,Ue){let Ge=new Uint8Array(4),Se=i.createTexture();i.bindTexture(j,Se),i.texParameteri(j,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(j,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let et=0;et<be;et++)j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?i.texImage3D(Ne,0,i.RGBA,1,1,Ue,0,i.RGBA,i.UNSIGNED_BYTE,Ge):i.texImage2D(Ne+et,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ge);return Se}let B={};B[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),B[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),B[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),B[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),l.setClear(1),o.setClear(0),N(i.DEPTH_TEST),l.setFunc(ys),ye(!1),Q(fc),N(i.CULL_FACE),fe(ei);function N(j){c[j]!==!0&&(i.enable(j),c[j]=!0)}function q(j){c[j]!==!1&&(i.disable(j),c[j]=!1)}function re(j,Ne){return u[j]!==Ne?(i.bindFramebuffer(j,Ne),u[j]=Ne,j===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Ne),j===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Ne),!0):!1}function ae(j,Ne){let be=f,Ue=!1;if(j){be=h.get(Ne),be===void 0&&(be=[],h.set(Ne,be));let Ge=j.textures;if(be.length!==Ge.length||be[0]!==i.COLOR_ATTACHMENT0){for(let Se=0,et=Ge.length;Se<et;Se++)be[Se]=i.COLOR_ATTACHMENT0+Se;be.length=Ge.length,Ue=!0}}else be[0]!==i.BACK&&(be[0]=i.BACK,Ue=!0);Ue&&i.drawBuffers(be)}function he(j){return y!==j?(i.useProgram(j),y=j,!0):!1}let xe={[Zi]:i.FUNC_ADD,[Iu]:i.FUNC_SUBTRACT,[Lu]:i.FUNC_REVERSE_SUBTRACT};xe[Du]=i.MIN,xe[Nu]=i.MAX;let ne={[Uu]:i.ZERO,[Fu]:i.ONE,[ku]:i.SRC_COLOR,[yc]:i.SRC_ALPHA,[Vu]:i.SRC_ALPHA_SATURATE,[Gu]:i.DST_COLOR,[Bu]:i.DST_ALPHA,[Ou]:i.ONE_MINUS_SRC_COLOR,[_c]:i.ONE_MINUS_SRC_ALPHA,[Wu]:i.ONE_MINUS_DST_COLOR,[zu]:i.ONE_MINUS_DST_ALPHA,[Hu]:i.CONSTANT_COLOR,[$u]:i.ONE_MINUS_CONSTANT_COLOR,[Xu]:i.CONSTANT_ALPHA,[qu]:i.ONE_MINUS_CONSTANT_ALPHA};function fe(j,Ne,be,Ue,Ge,Se,et,Je,Tt,vt){if(j===ei){m===!0&&(q(i.BLEND),m=!1);return}if(m===!1&&(N(i.BLEND),m=!0),j!==Pu){if(j!==g||vt!==A){if((M!==Zi||T!==Zi)&&(i.blendEquation(i.FUNC_ADD),M=Zi,T=Zi),vt)switch(j){case Ds:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pc:i.blendFunc(i.ONE,i.ONE);break;case mc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:st("WebGLState: Invalid blending: ",j);break}else switch(j){case Ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case mc:st("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gc:st("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:st("WebGLState: Invalid blending: ",j);break}_=null,x=null,w=null,E=null,b.set(0,0,0),S=0,g=j,A=vt}return}Ge=Ge||Ne,Se=Se||be,et=et||Ue,(Ne!==M||Ge!==T)&&(i.blendEquationSeparate(xe[Ne],xe[Ge]),M=Ne,T=Ge),(be!==_||Ue!==x||Se!==w||et!==E)&&(i.blendFuncSeparate(ne[be],ne[Ue],ne[Se],ne[et]),_=be,x=Ue,w=Se,E=et),(Je.equals(b)===!1||Tt!==S)&&(i.blendColor(Je.r,Je.g,Je.b,Tt),b.copy(Je),S=Tt),g=j,A=!1}function me(j,Ne){j.side===Qn?q(i.CULL_FACE):N(i.CULL_FACE);let be=j.side===un;Ne&&(be=!be),ye(be),j.blending===Ds&&j.transparent===!1?fe(ei):fe(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),l.setFunc(j.depthFunc),l.setTest(j.depthTest),l.setMask(j.depthWrite),r.setMask(j.colorWrite);let Ue=j.stencilWrite;o.setTest(Ue),Ue&&(o.setMask(j.stencilWriteMask),o.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),o.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),Te(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?N(i.SAMPLE_ALPHA_TO_COVERAGE):q(i.SAMPLE_ALPHA_TO_COVERAGE)}function ye(j){R!==j&&(j?i.frontFace(i.CW):i.frontFace(i.CCW),R=j)}function Q(j){j!==Au?(N(i.CULL_FACE),j!==I&&(j===fc?i.cullFace(i.BACK):j===Ru?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):q(i.CULL_FACE),I=j}function _e(j){j!==O&&(F&&i.lineWidth(j),O=j)}function Te(j,Ne,be){j?(N(i.POLYGON_OFFSET_FILL),(D!==Ne||L!==be)&&(D=Ne,L=be,l.getReversed()&&(Ne=-Ne),i.polygonOffset(Ne,be))):q(i.POLYGON_OFFSET_FILL)}function ue(j){j?N(i.SCISSOR_TEST):q(i.SCISSOR_TEST)}function we(j){j===void 0&&(j=i.TEXTURE0+P-1),V!==j&&(i.activeTexture(j),V=j)}function $(j,Ne,be){be===void 0&&(V===null?be=i.TEXTURE0+P-1:be=V);let Ue=U[be];Ue===void 0&&(Ue={type:void 0,texture:void 0},U[be]=Ue),(Ue.type!==j||Ue.texture!==Ne)&&(V!==be&&(i.activeTexture(be),V=be),i.bindTexture(j,Ne||B[j]),Ue.type=j,Ue.texture=Ne)}function ze(){let j=U[V];j!==void 0&&j.type!==void 0&&(i.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function Ye(){try{i.compressedTexImage2D(...arguments)}catch(j){st("WebGLState:",j)}}function W(){try{i.compressedTexImage3D(...arguments)}catch(j){st("WebGLState:",j)}}function C(){try{i.texSubImage2D(...arguments)}catch(j){st("WebGLState:",j)}}function ee(){try{i.texSubImage3D(...arguments)}catch(j){st("WebGLState:",j)}}function ie(){try{i.compressedTexSubImage2D(...arguments)}catch(j){st("WebGLState:",j)}}function pe(){try{i.compressedTexSubImage3D(...arguments)}catch(j){st("WebGLState:",j)}}function Ee(){try{i.texStorage2D(...arguments)}catch(j){st("WebGLState:",j)}}function Re(){try{i.texStorage3D(...arguments)}catch(j){st("WebGLState:",j)}}function ge(){try{i.texImage2D(...arguments)}catch(j){st("WebGLState:",j)}}function ve(){try{i.texImage3D(...arguments)}catch(j){st("WebGLState:",j)}}function Pe(j){return p[j]!==void 0?p[j]:i.getParameter(j)}function Ke(j,Ne){p[j]!==Ne&&(i.pixelStorei(j,Ne),p[j]=Ne)}function Fe(j){ce.equals(j)===!1&&(i.scissor(j.x,j.y,j.z,j.w),ce.copy(j))}function De(j){Z.equals(j)===!1&&(i.viewport(j.x,j.y,j.z,j.w),Z.copy(j))}function je(j,Ne){let be=d.get(Ne);be===void 0&&(be=new WeakMap,d.set(Ne,be));let Ue=be.get(j);Ue===void 0&&(Ue=i.getUniformBlockIndex(Ne,j.name),be.set(j,Ue))}function nt(j,Ne){let Ue=d.get(Ne).get(j);a.get(Ne)!==Ue&&(i.uniformBlockBinding(Ne,Ue,j.__bindingPointIndex),a.set(Ne,Ue))}function ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),l.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),c={},p={},V=null,U={},u={},h=new WeakMap,f=[],y=null,m=!1,g=null,M=null,_=null,x=null,T=null,w=null,E=null,b=new ut(0,0,0),S=0,A=!1,R=null,I=null,O=null,D=null,L=null,ce.set(0,0,i.canvas.width,i.canvas.height),Z.set(0,0,i.canvas.width,i.canvas.height),r.reset(),l.reset(),o.reset()}return{buffers:{color:r,depth:l,stencil:o},enable:N,disable:q,bindFramebuffer:re,drawBuffers:ae,useProgram:he,setBlending:fe,setMaterial:me,setFlipSided:ye,setCullFace:Q,setLineWidth:_e,setPolygonOffset:Te,setScissorTest:ue,activeTexture:we,bindTexture:$,unbindTexture:ze,compressedTexImage2D:Ye,compressedTexImage3D:W,texImage2D:ge,texImage3D:ve,pixelStorei:Ke,getParameter:Pe,updateUBOMapping:je,uniformBlockBinding:nt,texStorage2D:Ee,texStorage3D:Re,texSubImage2D:C,texSubImage3D:ee,compressedTexSubImage2D:ie,compressedTexSubImage3D:pe,scissor:Fe,viewport:De,reset:ht}}function ty(i,e,t,n,s,r,l){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,a=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Le,c=new WeakMap,p=new Set,u,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(W,C){return f?new OffscreenCanvas(W,C):rr("canvas")}function m(W,C,ee){let ie=1,pe=Ye(W);if((pe.width>ee||pe.height>ee)&&(ie=ee/Math.max(pe.width,pe.height)),ie<1)if(typeof HTMLImageElement<"u"&&W instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&W instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&W instanceof ImageBitmap||typeof VideoFrame<"u"&&W instanceof VideoFrame){let Ee=Math.floor(ie*pe.width),Re=Math.floor(ie*pe.height);u===void 0&&(u=y(Ee,Re));let ge=C?y(Ee,Re):u;return ge.width=Ee,ge.height=Re,ge.getContext("2d").drawImage(W,0,0,Ee,Re),it("WebGLRenderer: Texture has been resized from ("+pe.width+"x"+pe.height+") to ("+Ee+"x"+Re+")."),ge}else return"data"in W&&it("WebGLRenderer: Image in DataTexture is too big ("+pe.width+"x"+pe.height+")."),W;return W}function g(W){return W.generateMipmaps}function M(W){i.generateMipmap(W)}function _(W){return W.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:W.isWebGL3DRenderTarget?i.TEXTURE_3D:W.isWebGLArrayRenderTarget||W.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(W,C,ee,ie,pe,Ee=!1){if(W!==null){if(i[W]!==void 0)return i[W];it("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+W+"'")}let Re;ie&&(Re=e.get("EXT_texture_norm16"),Re||it("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ge=C;if(C===i.RED&&(ee===i.FLOAT&&(ge=i.R32F),ee===i.HALF_FLOAT&&(ge=i.R16F),ee===i.UNSIGNED_BYTE&&(ge=i.R8),ee===i.UNSIGNED_SHORT&&Re&&(ge=Re.R16_EXT),ee===i.SHORT&&Re&&(ge=Re.R16_SNORM_EXT)),C===i.RED_INTEGER&&(ee===i.UNSIGNED_BYTE&&(ge=i.R8UI),ee===i.UNSIGNED_SHORT&&(ge=i.R16UI),ee===i.UNSIGNED_INT&&(ge=i.R32UI),ee===i.BYTE&&(ge=i.R8I),ee===i.SHORT&&(ge=i.R16I),ee===i.INT&&(ge=i.R32I)),C===i.RG&&(ee===i.FLOAT&&(ge=i.RG32F),ee===i.HALF_FLOAT&&(ge=i.RG16F),ee===i.UNSIGNED_BYTE&&(ge=i.RG8),ee===i.UNSIGNED_SHORT&&Re&&(ge=Re.RG16_EXT),ee===i.SHORT&&Re&&(ge=Re.RG16_SNORM_EXT)),C===i.RG_INTEGER&&(ee===i.UNSIGNED_BYTE&&(ge=i.RG8UI),ee===i.UNSIGNED_SHORT&&(ge=i.RG16UI),ee===i.UNSIGNED_INT&&(ge=i.RG32UI),ee===i.BYTE&&(ge=i.RG8I),ee===i.SHORT&&(ge=i.RG16I),ee===i.INT&&(ge=i.RG32I)),C===i.RGB_INTEGER&&(ee===i.UNSIGNED_BYTE&&(ge=i.RGB8UI),ee===i.UNSIGNED_SHORT&&(ge=i.RGB16UI),ee===i.UNSIGNED_INT&&(ge=i.RGB32UI),ee===i.BYTE&&(ge=i.RGB8I),ee===i.SHORT&&(ge=i.RGB16I),ee===i.INT&&(ge=i.RGB32I)),C===i.RGBA_INTEGER&&(ee===i.UNSIGNED_BYTE&&(ge=i.RGBA8UI),ee===i.UNSIGNED_SHORT&&(ge=i.RGBA16UI),ee===i.UNSIGNED_INT&&(ge=i.RGBA32UI),ee===i.BYTE&&(ge=i.RGBA8I),ee===i.SHORT&&(ge=i.RGBA16I),ee===i.INT&&(ge=i.RGBA32I)),C===i.RGB&&(ee===i.UNSIGNED_SHORT&&Re&&(ge=Re.RGB16_EXT),ee===i.SHORT&&Re&&(ge=Re.RGB16_SNORM_EXT),ee===i.UNSIGNED_INT_5_9_9_9_REV&&(ge=i.RGB9_E5),ee===i.UNSIGNED_INT_10F_11F_11F_REV&&(ge=i.R11F_G11F_B10F)),C===i.RGBA){let ve=Ee?sr:yt.getTransfer(pe);ee===i.FLOAT&&(ge=i.RGBA32F),ee===i.HALF_FLOAT&&(ge=i.RGBA16F),ee===i.UNSIGNED_BYTE&&(ge=ve===Mt?i.SRGB8_ALPHA8:i.RGBA8),ee===i.UNSIGNED_SHORT&&Re&&(ge=Re.RGBA16_EXT),ee===i.SHORT&&Re&&(ge=Re.RGBA16_SNORM_EXT),ee===i.UNSIGNED_SHORT_4_4_4_4&&(ge=i.RGBA4),ee===i.UNSIGNED_SHORT_5_5_5_1&&(ge=i.RGB5_A1)}return(ge===i.R16F||ge===i.R32F||ge===i.RG16F||ge===i.RG32F||ge===i.RGBA16F||ge===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ge}function T(W,C){let ee;return W?C===null||C===zn||C===Us?ee=i.DEPTH24_STENCIL8:C===Gn?ee=i.DEPTH32F_STENCIL8:C===Ns&&(ee=i.DEPTH24_STENCIL8,it("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===zn||C===Us?ee=i.DEPTH_COMPONENT24:C===Gn?ee=i.DEPTH_COMPONENT32F:C===Ns&&(ee=i.DEPTH_COMPONENT16),ee}function w(W,C){return g(W)===!0||W.isFramebufferTexture&&W.minFilter!==Yt&&W.minFilter!==Kt?Math.log2(Math.max(C.width,C.height))+1:W.mipmaps!==void 0&&W.mipmaps.length>0?W.mipmaps.length:W.isCompressedTexture&&Array.isArray(W.image)?C.mipmaps.length:1}function E(W){let C=W.target;C.removeEventListener("dispose",E),S(C),C.isVideoTexture&&c.delete(C),C.isHTMLTexture&&p.delete(C)}function b(W){let C=W.target;C.removeEventListener("dispose",b),R(C)}function S(W){let C=n.get(W);if(C.__webglInit===void 0)return;let ee=W.source,ie=h.get(ee);if(ie){let pe=ie[C.__cacheKey];pe.usedTimes--,pe.usedTimes===0&&A(W),Object.keys(ie).length===0&&h.delete(ee)}n.remove(W)}function A(W){let C=n.get(W);i.deleteTexture(C.__webglTexture);let ee=W.source,ie=h.get(ee);delete ie[C.__cacheKey],l.memory.textures--}function R(W){let C=n.get(W);if(W.depthTexture&&(W.depthTexture.dispose(),n.remove(W.depthTexture)),W.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(C.__webglFramebuffer[ie]))for(let pe=0;pe<C.__webglFramebuffer[ie].length;pe++)i.deleteFramebuffer(C.__webglFramebuffer[ie][pe]);else i.deleteFramebuffer(C.__webglFramebuffer[ie]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[ie])}else{if(Array.isArray(C.__webglFramebuffer))for(let ie=0;ie<C.__webglFramebuffer.length;ie++)i.deleteFramebuffer(C.__webglFramebuffer[ie]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let ie=0;ie<C.__webglColorRenderbuffer.length;ie++)C.__webglColorRenderbuffer[ie]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[ie]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}let ee=W.textures;for(let ie=0,pe=ee.length;ie<pe;ie++){let Ee=n.get(ee[ie]);Ee.__webglTexture&&(i.deleteTexture(Ee.__webglTexture),l.memory.textures--),n.remove(ee[ie])}n.remove(W)}let I=0;function O(){I=0}function D(){return I}function L(W){I=W}function P(){let W=I;return W>=s.maxTextures&&it("WebGLTextures: Trying to use "+(W+1)+" texture units while this GPU supports only "+s.maxTextures),I+=1,W}function F(W){let C=[];return C.push(W.wrapS),C.push(W.wrapT),C.push(W.wrapR||0),C.push(W.magFilter),C.push(W.minFilter),C.push(W.anisotropy),C.push(W.internalFormat),C.push(W.format),C.push(W.type),C.push(W.generateMipmaps),C.push(W.premultiplyAlpha),C.push(W.flipY),C.push(W.unpackAlignment),C.push(W.colorSpace),C.join()}function G(W,C){let ee=n.get(W);if(W.isVideoTexture&&$(W),W.isRenderTargetTexture===!1&&W.isExternalTexture!==!0&&W.version>0&&ee.__version!==W.version){let ie=W.image;if(ie===null)it("WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)it("WebGLRenderer: Texture marked for update but image is incomplete");else{q(ee,W,C);return}}else W.isExternalTexture&&(ee.__webglTexture=W.sourceTexture?W.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,ee.__webglTexture,i.TEXTURE0+C)}function z(W,C){let ee=n.get(W);if(W.isRenderTargetTexture===!1&&W.version>0&&ee.__version!==W.version){q(ee,W,C);return}else W.isExternalTexture&&(ee.__webglTexture=W.sourceTexture?W.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,ee.__webglTexture,i.TEXTURE0+C)}function V(W,C){let ee=n.get(W);if(W.isRenderTargetTexture===!1&&W.version>0&&ee.__version!==W.version){q(ee,W,C);return}t.bindTexture(i.TEXTURE_3D,ee.__webglTexture,i.TEXTURE0+C)}function U(W,C){let ee=n.get(W);if(W.isCubeDepthTexture!==!0&&W.version>0&&ee.__version!==W.version){re(ee,W,C);return}t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture,i.TEXTURE0+C)}let H={[Na]:i.REPEAT,[Jn]:i.CLAMP_TO_EDGE,[Ua]:i.MIRRORED_REPEAT},K={[Yt]:i.NEAREST,[Zu]:i.NEAREST_MIPMAP_NEAREST,[Ir]:i.NEAREST_MIPMAP_LINEAR,[Kt]:i.LINEAR,[po]:i.LINEAR_MIPMAP_NEAREST,[Ni]:i.LINEAR_MIPMAP_LINEAR},ce={[ed]:i.NEVER,[rd]:i.ALWAYS,[td]:i.LESS,[jo]:i.LEQUAL,[nd]:i.EQUAL,[Qo]:i.GEQUAL,[id]:i.GREATER,[sd]:i.NOTEQUAL};function Z(W,C){if(C.type===Gn&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===Kt||C.magFilter===po||C.magFilter===Ir||C.magFilter===Ni||C.minFilter===Kt||C.minFilter===po||C.minFilter===Ir||C.minFilter===Ni)&&it("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(W,i.TEXTURE_WRAP_S,H[C.wrapS]),i.texParameteri(W,i.TEXTURE_WRAP_T,H[C.wrapT]),(W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY)&&i.texParameteri(W,i.TEXTURE_WRAP_R,H[C.wrapR]),i.texParameteri(W,i.TEXTURE_MAG_FILTER,K[C.magFilter]),i.texParameteri(W,i.TEXTURE_MIN_FILTER,K[C.minFilter]),C.compareFunction&&(i.texParameteri(W,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(W,i.TEXTURE_COMPARE_FUNC,ce[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Yt||C.minFilter!==Ir&&C.minFilter!==Ni||C.type===Gn&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){let ee=e.get("EXT_texture_filter_anisotropic");i.texParameterf(W,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function Y(W,C){let ee=!1;W.__webglInit===void 0&&(W.__webglInit=!0,C.addEventListener("dispose",E));let ie=C.source,pe=h.get(ie);pe===void 0&&(pe={},h.set(ie,pe));let Ee=F(C);if(Ee!==W.__cacheKey){pe[Ee]===void 0&&(pe[Ee]={texture:i.createTexture(),usedTimes:0},l.memory.textures++,ee=!0),pe[Ee].usedTimes++;let Re=pe[W.__cacheKey];Re!==void 0&&(pe[W.__cacheKey].usedTimes--,Re.usedTimes===0&&A(C)),W.__cacheKey=Ee,W.__webglTexture=pe[Ee].texture}return ee}function B(W,C,ee){return Math.floor(Math.floor(W/ee)/C)}function N(W,C,ee,ie){let Ee=W.updateRanges;if(Ee.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,C.width,C.height,ee,ie,C.data);else{Ee.sort((Ke,Fe)=>Ke.start-Fe.start);let Re=0;for(let Ke=1;Ke<Ee.length;Ke++){let Fe=Ee[Re],De=Ee[Ke],je=Fe.start+Fe.count,nt=B(De.start,C.width,4),ht=B(Fe.start,C.width,4);De.start<=je+1&&nt===ht&&B(De.start+De.count-1,C.width,4)===nt?Fe.count=Math.max(Fe.count,De.start+De.count-Fe.start):(++Re,Ee[Re]=De)}Ee.length=Re+1;let ge=t.getParameter(i.UNPACK_ROW_LENGTH),ve=t.getParameter(i.UNPACK_SKIP_PIXELS),Pe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,C.width);for(let Ke=0,Fe=Ee.length;Ke<Fe;Ke++){let De=Ee[Ke],je=Math.floor(De.start/4),nt=Math.ceil(De.count/4),ht=je%C.width,j=Math.floor(je/C.width),Ne=nt,be=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ht),t.pixelStorei(i.UNPACK_SKIP_ROWS,j),t.texSubImage2D(i.TEXTURE_2D,0,ht,j,Ne,be,ee,ie,C.data)}W.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ge),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ve),t.pixelStorei(i.UNPACK_SKIP_ROWS,Pe)}}function q(W,C,ee){let ie=i.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ie=i.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ie=i.TEXTURE_3D);let pe=Y(W,C),Ee=C.source;t.bindTexture(ie,W.__webglTexture,i.TEXTURE0+ee);let Re=n.get(Ee);if(Ee.version!==Re.__version||pe===!0){if(t.activeTexture(i.TEXTURE0+ee),(typeof ImageBitmap<"u"&&C.image instanceof ImageBitmap)===!1){let be=yt.getPrimaries(yt.workingColorSpace),Ue=C.colorSpace===fi?null:yt.getPrimaries(C.colorSpace),Ge=C.colorSpace===fi||be===Ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge)}t.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment);let ve=m(C.image,!1,s.maxTextureSize);ve=ze(C,ve);let Pe=r.convert(C.format,C.colorSpace),Ke=r.convert(C.type),Fe=x(C.internalFormat,Pe,Ke,C.normalized,C.colorSpace,C.isVideoTexture);Z(ie,C);let De,je=C.mipmaps,nt=C.isVideoTexture!==!0,ht=Re.__version===void 0||pe===!0,j=Ee.dataReady,Ne=w(C,ve);if(C.isDepthTexture)Fe=T(C.format===Ui,C.type),ht&&(nt?t.texStorage2D(i.TEXTURE_2D,1,Fe,ve.width,ve.height):t.texImage2D(i.TEXTURE_2D,0,Fe,ve.width,ve.height,0,Pe,Ke,null));else if(C.isDataTexture)if(je.length>0){nt&&ht&&t.texStorage2D(i.TEXTURE_2D,Ne,Fe,je[0].width,je[0].height);for(let be=0,Ue=je.length;be<Ue;be++)De=je[be],nt?j&&t.texSubImage2D(i.TEXTURE_2D,be,0,0,De.width,De.height,Pe,Ke,De.data):t.texImage2D(i.TEXTURE_2D,be,Fe,De.width,De.height,0,Pe,Ke,De.data);C.generateMipmaps=!1}else nt?(ht&&t.texStorage2D(i.TEXTURE_2D,Ne,Fe,ve.width,ve.height),j&&N(C,ve,Pe,Ke)):t.texImage2D(i.TEXTURE_2D,0,Fe,ve.width,ve.height,0,Pe,Ke,ve.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){nt&&ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ne,Fe,je[0].width,je[0].height,ve.depth);for(let be=0,Ue=je.length;be<Ue;be++)if(De=je[be],C.format!==Rn)if(Pe!==null)if(nt){if(j)if(C.layerUpdates.size>0){let Ge=zc(De.width,De.height,C.format,C.type);for(let Se of C.layerUpdates){let et=De.data.subarray(Se*Ge/De.data.BYTES_PER_ELEMENT,(Se+1)*Ge/De.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,be,0,0,Se,De.width,De.height,1,Pe,et)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,be,0,0,0,De.width,De.height,ve.depth,Pe,De.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,be,Fe,De.width,De.height,ve.depth,0,De.data,0,0);else it("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else nt?j&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,be,0,0,0,De.width,De.height,ve.depth,Pe,Ke,De.data):t.texImage3D(i.TEXTURE_2D_ARRAY,be,Fe,De.width,De.height,ve.depth,0,Pe,Ke,De.data);C.layerUpdates.size>0&&C.clearLayerUpdates()}else{nt&&ht&&t.texStorage2D(i.TEXTURE_2D,Ne,Fe,je[0].width,je[0].height);for(let be=0,Ue=je.length;be<Ue;be++)De=je[be],C.format!==Rn?Pe!==null?nt?j&&t.compressedTexSubImage2D(i.TEXTURE_2D,be,0,0,De.width,De.height,Pe,De.data):t.compressedTexImage2D(i.TEXTURE_2D,be,Fe,De.width,De.height,0,De.data):it("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?j&&t.texSubImage2D(i.TEXTURE_2D,be,0,0,De.width,De.height,Pe,Ke,De.data):t.texImage2D(i.TEXTURE_2D,be,Fe,De.width,De.height,0,Pe,Ke,De.data)}else if(C.isDataArrayTexture)if(nt){if(ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ne,Fe,ve.width,ve.height,ve.depth),j)if(C.layerUpdates.size>0){let be=zc(ve.width,ve.height,C.format,C.type);for(let Ue of C.layerUpdates){let Ge=ve.data.subarray(Ue*be/ve.data.BYTES_PER_ELEMENT,(Ue+1)*be/ve.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ue,ve.width,ve.height,1,Pe,Ke,Ge)}C.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ve.width,ve.height,ve.depth,Pe,Ke,ve.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Fe,ve.width,ve.height,ve.depth,0,Pe,Ke,ve.data);else if(C.isData3DTexture)nt?(ht&&t.texStorage3D(i.TEXTURE_3D,Ne,Fe,ve.width,ve.height,ve.depth),j&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ve.width,ve.height,ve.depth,Pe,Ke,ve.data)):t.texImage3D(i.TEXTURE_3D,0,Fe,ve.width,ve.height,ve.depth,0,Pe,Ke,ve.data);else if(C.isFramebufferTexture){if(ht)if(nt)t.texStorage2D(i.TEXTURE_2D,Ne,Fe,ve.width,ve.height);else{let be=ve.width,Ue=ve.height;for(let Ge=0;Ge<Ne;Ge++)t.texImage2D(i.TEXTURE_2D,Ge,Fe,be,Ue,0,Pe,Ke,null),be>>=1,Ue>>=1}}else if(C.isHTMLTexture){if("texElementImage2D"in i){let be=i.canvas;if(be.hasAttribute("layoutsubtree")||be.setAttribute("layoutsubtree","true"),ve.parentNode!==be){be.appendChild(ve),p.add(C),be.onpaint=Ue=>{let Ge=Ue.changedElements;for(let Se of p)Ge.includes(Se.image)&&(Se.needsUpdate=!0)},be.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ve);else{let Ge=i.RGBA,Se=i.RGBA,et=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ge,Se,et,ve)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(je.length>0){if(nt&&ht){let be=Ye(je[0]);t.texStorage2D(i.TEXTURE_2D,Ne,Fe,be.width,be.height)}for(let be=0,Ue=je.length;be<Ue;be++)De=je[be],nt?j&&t.texSubImage2D(i.TEXTURE_2D,be,0,0,Pe,Ke,De):t.texImage2D(i.TEXTURE_2D,be,Fe,Pe,Ke,De);C.generateMipmaps=!1}else if(nt){if(ht){let be=Ye(ve);t.texStorage2D(i.TEXTURE_2D,Ne,Fe,be.width,be.height)}j&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Pe,Ke,ve)}else t.texImage2D(i.TEXTURE_2D,0,Fe,Pe,Ke,ve);g(C)&&M(ie),Re.__version=Ee.version,C.onUpdate&&C.onUpdate(C)}W.__version=C.version}function re(W,C,ee){if(C.image.length!==6)return;let ie=Y(W,C),pe=C.source;t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+ee);let Ee=n.get(pe);if(pe.version!==Ee.__version||ie===!0){t.activeTexture(i.TEXTURE0+ee);let Re=yt.getPrimaries(yt.workingColorSpace),ge=C.colorSpace===fi?null:yt.getPrimaries(C.colorSpace),ve=C.colorSpace===fi||Re===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let Pe=C.isCompressedTexture||C.image[0].isCompressedTexture,Ke=C.image[0]&&C.image[0].isDataTexture,Fe=[];for(let Se=0;Se<6;Se++)!Pe&&!Ke?Fe[Se]=m(C.image[Se],!0,s.maxCubemapSize):Fe[Se]=Ke?C.image[Se].image:C.image[Se],Fe[Se]=ze(C,Fe[Se]);let De=Fe[0],je=r.convert(C.format,C.colorSpace),nt=r.convert(C.type),ht=x(C.internalFormat,je,nt,C.normalized,C.colorSpace),j=C.isVideoTexture!==!0,Ne=Ee.__version===void 0||ie===!0,be=pe.dataReady,Ue=w(C,De);Z(i.TEXTURE_CUBE_MAP,C);let Ge;if(Pe){j&&Ne&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ue,ht,De.width,De.height);for(let Se=0;Se<6;Se++){Ge=Fe[Se].mipmaps;for(let et=0;et<Ge.length;et++){let Je=Ge[et];C.format!==Rn?je!==null?j?be&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et,0,0,Je.width,Je.height,je,Je.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et,ht,Je.width,Je.height,0,Je.data):it("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):j?be&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et,0,0,Je.width,Je.height,je,nt,Je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et,ht,Je.width,Je.height,0,je,nt,Je.data)}}}else{if(Ge=C.mipmaps,j&&Ne){Ge.length>0&&Ue++;let Se=Ye(Fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ue,ht,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(Ke){j?be&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Fe[Se].width,Fe[Se].height,je,nt,Fe[Se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ht,Fe[Se].width,Fe[Se].height,0,je,nt,Fe[Se].data);for(let et=0;et<Ge.length;et++){let Tt=Ge[et].image[Se].image;j?be&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et+1,0,0,Tt.width,Tt.height,je,nt,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et+1,ht,Tt.width,Tt.height,0,je,nt,Tt.data)}}else{j?be&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,je,nt,Fe[Se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ht,je,nt,Fe[Se]);for(let et=0;et<Ge.length;et++){let Je=Ge[et];j?be&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et+1,0,0,je,nt,Je.image[Se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,et+1,ht,je,nt,Je.image[Se])}}}g(C)&&M(i.TEXTURE_CUBE_MAP),Ee.__version=pe.version,C.onUpdate&&C.onUpdate(C)}W.__version=C.version}function ae(W,C,ee,ie,pe,Ee){let Re=r.convert(ee.format,ee.colorSpace),ge=r.convert(ee.type),ve=x(ee.internalFormat,Re,ge,ee.normalized,ee.colorSpace),Pe=n.get(C),Ke=n.get(ee);if(Ke.__renderTarget=C,!Pe.__hasExternalTextures){let Fe=Math.max(1,C.width>>Ee),De=Math.max(1,C.height>>Ee);pe===i.TEXTURE_3D||pe===i.TEXTURE_2D_ARRAY?t.texImage3D(pe,Ee,ve,Fe,De,C.depth,0,Re,ge,null):t.texImage2D(pe,Ee,ve,Fe,De,0,Re,ge,null)}t.bindFramebuffer(i.FRAMEBUFFER,W),we(C)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,pe,Ke.__webglTexture,0,ue(C)):(pe===i.TEXTURE_2D||pe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&pe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ie,pe,Ke.__webglTexture,Ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function he(W,C,ee){if(i.bindRenderbuffer(i.RENDERBUFFER,W),C.depthBuffer){let ie=C.depthTexture,pe=ie&&ie.isDepthTexture?ie.type:null,Ee=T(C.stencilBuffer,pe),Re=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;we(C)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue(C),Ee,C.width,C.height):ee?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue(C),Ee,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,Ee,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Re,i.RENDERBUFFER,W)}else{let ie=C.textures;for(let pe=0;pe<ie.length;pe++){let Ee=ie[pe],Re=r.convert(Ee.format,Ee.colorSpace),ge=r.convert(Ee.type),ve=x(Ee.internalFormat,Re,ge,Ee.normalized,Ee.colorSpace);we(C)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue(C),ve,C.width,C.height):ee?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue(C),ve,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,ve,C.width,C.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xe(W,C,ee){let ie=C.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,W),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let pe=n.get(C.depthTexture);if(pe.__renderTarget=C,(!pe.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),ie){if(pe.__webglInit===void 0&&(pe.__webglInit=!0,C.depthTexture.addEventListener("dispose",E)),pe.__webglTexture===void 0){pe.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,pe.__webglTexture),Z(i.TEXTURE_CUBE_MAP,C.depthTexture);let Pe=r.convert(C.depthTexture.format),Ke=r.convert(C.depthTexture.type),Fe;C.depthTexture.format===Zn?Fe=i.DEPTH_COMPONENT24:C.depthTexture.format===Ui&&(Fe=i.DEPTH24_STENCIL8);for(let De=0;De<6;De++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,Fe,C.width,C.height,0,Pe,Ke,null)}}else G(C.depthTexture,0);let Ee=pe.__webglTexture,Re=ue(C),ge=ie?i.TEXTURE_CUBE_MAP_POSITIVE_X+ee:i.TEXTURE_2D,ve=C.depthTexture.format===Ui?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(C.depthTexture.format===Zn)we(C)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ve,ge,Ee,0,Re):i.framebufferTexture2D(i.FRAMEBUFFER,ve,ge,Ee,0);else if(C.depthTexture.format===Ui)we(C)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ve,ge,Ee,0,Re):i.framebufferTexture2D(i.FRAMEBUFFER,ve,ge,Ee,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(W){let C=n.get(W),ee=W.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==W.depthTexture){let ie=W.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),ie){let pe=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,ie.removeEventListener("dispose",pe)};ie.addEventListener("dispose",pe),C.__depthDisposeCallback=pe}C.__boundDepthTexture=ie}if(W.depthTexture&&!C.__autoAllocateDepthBuffer)if(ee)for(let ie=0;ie<6;ie++)xe(C.__webglFramebuffer[ie],W,ie);else{let ie=W.texture.mipmaps;ie&&ie.length>0?xe(C.__webglFramebuffer[0],W,0):xe(C.__webglFramebuffer,W,0)}else if(ee){C.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)if(t.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[ie]),C.__webglDepthbuffer[ie]===void 0)C.__webglDepthbuffer[ie]=i.createRenderbuffer(),he(C.__webglDepthbuffer[ie],W,!1);else{let pe=W.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=C.__webglDepthbuffer[ie];i.bindRenderbuffer(i.RENDERBUFFER,Ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,pe,i.RENDERBUFFER,Ee)}}else{let ie=W.texture.mipmaps;if(ie&&ie.length>0?t.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=i.createRenderbuffer(),he(C.__webglDepthbuffer,W,!1);else{let pe=W.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ee=C.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,pe,i.RENDERBUFFER,Ee)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function fe(W,C,ee){let ie=n.get(W);C!==void 0&&ae(ie.__webglFramebuffer,W,W.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),ee!==void 0&&ne(W)}function me(W){let C=W.texture,ee=n.get(W),ie=n.get(C);W.addEventListener("dispose",b);let pe=W.textures,Ee=W.isWebGLCubeRenderTarget===!0,Re=pe.length>1;if(Re||(ie.__webglTexture===void 0&&(ie.__webglTexture=i.createTexture()),ie.__version=C.version,l.memory.textures++),Ee){ee.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(C.mipmaps&&C.mipmaps.length>0){ee.__webglFramebuffer[ge]=[];for(let ve=0;ve<C.mipmaps.length;ve++)ee.__webglFramebuffer[ge][ve]=i.createFramebuffer()}else ee.__webglFramebuffer[ge]=i.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){ee.__webglFramebuffer=[];for(let ge=0;ge<C.mipmaps.length;ge++)ee.__webglFramebuffer[ge]=i.createFramebuffer()}else ee.__webglFramebuffer=i.createFramebuffer();if(Re)for(let ge=0,ve=pe.length;ge<ve;ge++){let Pe=n.get(pe[ge]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=i.createTexture(),l.memory.textures++)}if(W.samples>0&&we(W)===!1){ee.__webglMultisampledFramebuffer=i.createFramebuffer(),ee.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,ee.__webglMultisampledFramebuffer);for(let ge=0;ge<pe.length;ge++){let ve=pe[ge];ee.__webglColorRenderbuffer[ge]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,ee.__webglColorRenderbuffer[ge]);let Pe=r.convert(ve.format,ve.colorSpace),Ke=r.convert(ve.type),Fe=x(ve.internalFormat,Pe,Ke,ve.normalized,ve.colorSpace,W.isXRRenderTarget===!0),De=ue(W);i.renderbufferStorageMultisample(i.RENDERBUFFER,De,Fe,W.width,W.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,ee.__webglColorRenderbuffer[ge])}i.bindRenderbuffer(i.RENDERBUFFER,null),W.depthBuffer&&(ee.__webglDepthRenderbuffer=i.createRenderbuffer(),he(ee.__webglDepthRenderbuffer,W,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Ee){t.bindTexture(i.TEXTURE_CUBE_MAP,ie.__webglTexture),Z(i.TEXTURE_CUBE_MAP,C);for(let ge=0;ge<6;ge++)if(C.mipmaps&&C.mipmaps.length>0)for(let ve=0;ve<C.mipmaps.length;ve++)ae(ee.__webglFramebuffer[ge][ve],W,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,ve);else ae(ee.__webglFramebuffer[ge],W,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);g(C)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ge=0,ve=pe.length;ge<ve;ge++){let Pe=pe[ge],Ke=n.get(Pe),Fe=i.TEXTURE_2D;(W.isWebGL3DRenderTarget||W.isWebGLArrayRenderTarget)&&(Fe=W.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Fe,Ke.__webglTexture),Z(Fe,Pe),ae(ee.__webglFramebuffer,W,Pe,i.COLOR_ATTACHMENT0+ge,Fe,0),g(Pe)&&M(Fe)}t.unbindTexture()}else{let ge=i.TEXTURE_2D;if((W.isWebGL3DRenderTarget||W.isWebGLArrayRenderTarget)&&(ge=W.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,ie.__webglTexture),Z(ge,C),C.mipmaps&&C.mipmaps.length>0)for(let ve=0;ve<C.mipmaps.length;ve++)ae(ee.__webglFramebuffer[ve],W,C,i.COLOR_ATTACHMENT0,ge,ve);else ae(ee.__webglFramebuffer,W,C,i.COLOR_ATTACHMENT0,ge,0);g(C)&&M(ge),t.unbindTexture()}W.depthBuffer&&ne(W)}function ye(W){let C=W.textures;for(let ee=0,ie=C.length;ee<ie;ee++){let pe=C[ee];if(g(pe)){let Ee=_(W),Re=n.get(pe).__webglTexture;t.bindTexture(Ee,Re),M(Ee),t.unbindTexture()}}}let Q=[],_e=[];function Te(W){if(W.samples>0){if(we(W)===!1){let C=W.textures,ee=W.width,ie=W.height,pe=i.COLOR_BUFFER_BIT,Ee=W.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=n.get(W),ge=C.length>1;if(ge)for(let Pe=0;Pe<C.length;Pe++)t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer);let ve=W.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Pe=0;Pe<C.length;Pe++){if(W.resolveDepthBuffer&&(W.depthBuffer&&(pe|=i.DEPTH_BUFFER_BIT),W.stencilBuffer&&W.resolveStencilBuffer&&(pe|=i.STENCIL_BUFFER_BIT)),ge){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Re.__webglColorRenderbuffer[Pe]);let Ke=n.get(C[Pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ke,0)}i.blitFramebuffer(0,0,ee,ie,0,0,ee,ie,pe,i.NEAREST),a===!0&&(Q.length=0,_e.length=0,Q.push(i.COLOR_ATTACHMENT0+Pe),W.depthBuffer&&W.storeMultisampledDepthBuffer===!1&&(Q.push(Ee),_e.push(Ee),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,_e)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ge)for(let Pe=0;Pe<C.length;Pe++){t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.RENDERBUFFER,Re.__webglColorRenderbuffer[Pe]);let Ke=n.get(C[Pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pe,i.TEXTURE_2D,Ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(W.depthBuffer&&W.storeMultisampledDepthBuffer===!1&&a){let C=W.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[C])}}}function ue(W){return Math.min(s.maxSamples,W.samples)}function we(W){let C=n.get(W);return W.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function $(W){let C=l.render.frame;c.get(W)!==C&&(c.set(W,C),W.update())}function ze(W,C){let ee=W.colorSpace,ie=W.format,pe=W.type;return W.isCompressedTexture===!0||W.isVideoTexture===!0||ee!==ir&&ee!==fi&&(yt.getTransfer(ee)===Mt?(ie!==Rn||pe!==mn)&&it("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):st("WebGLTextures: Unsupported texture color space:",ee)),C}function Ye(W){return typeof HTMLImageElement<"u"&&W instanceof HTMLImageElement?(d.width=W.naturalWidth||W.width,d.height=W.naturalHeight||W.height):typeof VideoFrame<"u"&&W instanceof VideoFrame?(d.width=W.displayWidth,d.height=W.displayHeight):(d.width=W.width,d.height=W.height),d}this.allocateTextureUnit=P,this.resetTextureUnits=O,this.getTextureUnits=D,this.setTextureUnits=L,this.setTexture2D=G,this.setTexture2DArray=z,this.setTexture3D=V,this.setTextureCube=U,this.rebindTextures=fe,this.setupRenderTarget=me,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=we,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function ny(i,e){function t(n,s=fi){let r,l=yt.getTransfer(s);if(n===mn)return i.UNSIGNED_BYTE;if(n===go)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Cc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Pc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ac)return i.BYTE;if(n===Rc)return i.SHORT;if(n===Ns)return i.UNSIGNED_SHORT;if(n===mo)return i.INT;if(n===zn)return i.UNSIGNED_INT;if(n===Gn)return i.FLOAT;if(n===Wn)return i.HALF_FLOAT;if(n===Ic)return i.ALPHA;if(n===Lc)return i.RGB;if(n===Rn)return i.RGBA;if(n===Zn)return i.DEPTH_COMPONENT;if(n===Ui)return i.DEPTH_STENCIL;if(n===Dc)return i.RED;if(n===_o)return i.RED_INTEGER;if(n===Fi)return i.RG;if(n===vo)return i.RG_INTEGER;if(n===bo)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Nr||n===Ur)if(l===Mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mo||n===xo||n===So||n===wo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===So)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===To||n===Eo||n===Ao||n===Ro||n===Co||n===Fr||n===Po)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===To||n===Eo)return l===Mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ao)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ro)return r.COMPRESSED_R11_EAC;if(n===Co)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Fr)return r.COMPRESSED_RG11_EAC;if(n===Po)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Io||n===Lo||n===Do||n===No||n===Uo||n===Fo||n===ko||n===Oo||n===Bo||n===zo||n===Go||n===Wo||n===Vo||n===Ho)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Io)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lo)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Do)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===No)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Uo)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fo)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ko)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oo)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bo)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zo)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Go)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wo)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vo)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ho)return l===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$o||n===Xo||n===qo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===$o)return l===Mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Yo||n===Jo||n===kr||n===Zo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Yo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Jo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===kr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Zo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Us?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var iy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sy=`
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

}`,rh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new fr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Sn({vertexShader:iy,fragmentShader:sy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ut(new Ji(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ah=class extends Kn{constructor(e,t){super();let n=this,s=null,r=1,l=null,o="local-floor",a=1,d=null,c=null,p=null,u=null,h=null,f=null,y=typeof XRWebGLBinding<"u",m=new rh,g={},M=t.getContextAttributes(),_=null,x=null,T=[],w=[],E=new Le,b=null,S=null,A=new nn;A.viewport=new Dt;let R=new nn;R.viewport=new Dt;let I=[A,R],O=new co,D=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let N=T[B];return N===void 0&&(N=new Ms,T[B]=N),N.getTargetRaySpace()},this.getControllerGrip=function(B){let N=T[B];return N===void 0&&(N=new Ms,T[B]=N),N.getGripSpace()},this.getHand=function(B){let N=T[B];return N===void 0&&(N=new Ms,T[B]=N),N.getHandSpace()};function P(B){let N=w.indexOf(B.inputSource);if(N===-1)return;let q=T[N];q!==void 0&&(q.update(B.inputSource,B.frame,d||l),q.dispatchEvent({type:B.type,data:B.inputSource}))}function F(){s.removeEventListener("select",P),s.removeEventListener("selectstart",P),s.removeEventListener("selectend",P),s.removeEventListener("squeeze",P),s.removeEventListener("squeezestart",P),s.removeEventListener("squeezeend",P),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",G);for(let B=0;B<T.length;B++){let N=w[B];N!==null&&(w[B]=null,T[B].disconnect(N))}D=null,L=null,m.reset();for(let B in g)delete g[B];if(e.setRenderTarget(_),h=null,u=null,p=null,s=null,x=null,Y.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(E.width,E.height,!1),S!==null){let B=S.camera;B.fov=S.fov,B.zoom=S.zoom,B.updateProjectionMatrix(),S=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,n.isPresenting===!0&&it("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,n.isPresenting===!0&&it("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(B){d=B},this.getBaseLayer=function(){return u!==null?u:h},this.getBinding=function(){return p===null&&y&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return f},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(_=e.getRenderTarget(),s.addEventListener("select",P),s.addEventListener("selectstart",P),s.addEventListener("selectend",P),s.addEventListener("squeeze",P),s.addEventListener("squeezestart",P),s.addEventListener("squeezeend",P),s.addEventListener("end",F),s.addEventListener("inputsourceschange",G),M.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(E),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let q=null,re=null,ae=null;M.depth&&(ae=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=M.stencil?Ui:Zn,re=M.stencil?Us:zn);let he={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};p=this.getBinding(),u=p.createProjectionLayer(he),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new pn(u.textureWidth,u.textureHeight,{format:Rn,type:mn,depthTexture:new Ri(u.textureWidth,u.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let q={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,q),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),x=new pn(h.framebufferWidth,h.framebufferHeight,{format:Rn,type:mn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(a),d=null,l=await s.requestReferenceSpace(o),Y.setContext(s),Y.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G(B){for(let N=0;N<B.removed.length;N++){let q=B.removed[N],re=w.indexOf(q);re>=0&&(w[re]=null,T[re].disconnect(q))}for(let N=0;N<B.added.length;N++){let q=B.added[N],re=w.indexOf(q);if(re===-1){for(let he=0;he<T.length;he++)if(he>=w.length){w.push(q),re=he;break}else if(w[he]===null){w[he]=q,re=he;break}if(re===-1)break}let ae=T[re];ae&&ae.connect(q)}}let z=new te,V=new te;function U(B,N,q){z.setFromMatrixPosition(N.matrixWorld),V.setFromMatrixPosition(q.matrixWorld);let re=z.distanceTo(V),ae=N.projectionMatrix.elements,he=q.projectionMatrix.elements,xe=ae[14]/(ae[10]-1),ne=ae[14]/(ae[10]+1),fe=(ae[9]+1)/ae[5],me=(ae[9]-1)/ae[5],ye=(ae[8]-1)/ae[0],Q=(he[8]+1)/he[0],_e=xe*ye,Te=xe*Q,ue=re/(-ye+Q),we=ue*-ye;if(N.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(we),B.translateZ(ue),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),ae[10]===-1)B.projectionMatrix.copy(N.projectionMatrix),B.projectionMatrixInverse.copy(N.projectionMatrixInverse);else{let $=xe+ue,ze=ne+ue,Ye=_e-we,W=Te+(re-we),C=fe*ne/ze*$,ee=me*ne/ze*$;B.projectionMatrix.makePerspective(Ye,W,C,ee,$,ze),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function H(B,N){N===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(N.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;let N=B.near,q=B.far;m.texture!==null&&(m.depthNear>0&&(N=m.depthNear),m.depthFar>0&&(q=m.depthFar)),O.near=R.near=A.near=N,O.far=R.far=A.far=q,(D!==O.near||L!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),D=O.near,L=O.far),O.layers.mask=B.layers.mask|6,A.layers.mask=O.layers.mask&-5,R.layers.mask=O.layers.mask&-3;let re=B.parent,ae=O.cameras;H(O,re);for(let he=0;he<ae.length;he++)H(ae[he],re);ae.length===2?U(O,A,R):O.projectionMatrix.copy(A.projectionMatrix),S===null&&B.isPerspectiveCamera&&(S={camera:B,fov:B.fov,zoom:B.zoom}),K(B,O,re)};function K(B,N,q){q===null?B.matrix.copy(N.matrixWorld):(B.matrix.copy(q.matrixWorld),B.matrix.invert(),B.matrix.multiply(N.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(N.projectionMatrix),B.projectionMatrixInverse.copy(N.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=ka*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&h===null))return a},this.setFoveation=function(B){a=B,u!==null&&(u.fixedFoveation=B),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=B)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(B){return g[B]};let ce=null;function Z(B,N){if(c=N.getViewerPose(d||l),f=N,c!==null){let q=c.views;h!==null&&(e.setRenderTargetFramebuffer(x,h.framebuffer),e.setRenderTarget(x));let re=!1;q.length!==O.cameras.length&&(O.cameras.length=0,re=!0);for(let ne=0;ne<q.length;ne++){let fe=q[ne],me=null;if(h!==null)me=h.getViewport(fe);else{let Q=p.getViewSubImage(u,fe);me=Q.viewport,ne===0&&(e.setRenderTargetTextures(x,Q.colorTexture,Q.depthStencilTexture),e.setRenderTarget(x))}let ye=I[ne];ye===void 0&&(ye=new nn,ye.layers.enable(ne),ye.viewport=new Dt,I[ne]=ye),ye.matrix.fromArray(fe.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(fe.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(me.x,me.y,me.width,me.height),ne===0&&(O.matrix.copy(ye.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),re===!0&&O.cameras.push(ye)}let ae=s.enabledFeatures;if(ae&&ae.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){p=n.getBinding();let ne=p.getDepthInformation(q[0]);ne&&ne.isValid&&ne.texture&&m.init(ne,s.renderState)}if(ae&&ae.includes("camera-access")&&y){e.state.unbindTexture(),p=n.getBinding();for(let ne=0;ne<q.length;ne++){let fe=q[ne].camera;if(fe){let me=g[fe];me||(me=new fr,g[fe]=me);let ye=p.getCameraImage(fe);me.sourceTexture=ye}}}}for(let q=0;q<T.length;q++){let re=w[q],ae=T[q];re!==null&&ae!==void 0&&ae.update(re,N,d||l)}ce&&ce(B,N),N.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:N}),f=null}let Y=new zd;Y.setAnimationLoop(Z),this.setAnimationLoop=function(B){ce=B},this.dispose=function(){}}},ry=new Lt,Xd=new lt;Xd.set(-1,0,0,0,1,0,0,0,1);function ay(i,e){function t(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,kc(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,M,_,x){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),p(m,g)):g.isMeshPhongMaterial?(r(m,g),c(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),u(m,g),g.isMeshPhysicalMaterial&&h(m,g,x)):g.isMeshMatcapMaterial?(r(m,g),f(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),y(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(l(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?a(m,g,M,_):g.isSpriteMaterial?d(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,t(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===un&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,t(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===un&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,t(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,t(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let M=e.get(g),_=M.envMap,x=M.envMapRotation;_&&(m.envMap.value=_,m.envMapRotation.value.setFromMatrix4(ry.makeRotationFromEuler(x)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Xd),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,m.aoMapTransform))}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function a(m,g,M,_){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*M,m.scale.value=_*.5,g.map&&(m.map.value=g.map,t(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function d(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,t(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,t(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function p(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function u(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function h(m,g,M){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===un&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,m.specularIntensityMapTransform))}function f(m,g){g.matcap&&(m.matcap.value=g.matcap)}function y(m,g){let M=e.get(g).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function oy(i,e,t,n){let s={},r={},l=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function a(x,T){let w=T.program;n.uniformBlockBinding(x,w)}function d(x,T){let w=s[x.id];w===void 0&&(m(x),w=c(x),s[x.id]=w,x.addEventListener("dispose",M));let E=T.program;n.updateUBOMapping(x,E);let b=e.render.frame;r[x.id]!==b&&(u(x),r[x.id]=b)}function c(x){let T=p();x.__bindingPointIndex=T;let w=i.createBuffer(),E=x.__size,b=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,E,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,w),w}function p(){for(let x=0;x<o;x++)if(l.indexOf(x)===-1)return l.push(x),x;return st("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let T=s[x.id],w=x.uniforms,E=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let b=0,S=w.length;b<S;b++){let A=w[b];if(Array.isArray(A))for(let R=0,I=A.length;R<I;R++)h(A[R],b,R,E);else h(A,b,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(x,T,w,E){if(y(x,T,w,E)===!0){let b=x.__offset,S=x.value;if(Array.isArray(S)){let A=0;for(let R=0;R<S.length;R++){let I=S[R],O=g(I);f(I,x.__data,A),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(A+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else f(S,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,b,x.__data)}}function f(x,T,w){typeof x=="number"||typeof x=="boolean"?T[0]=x:x.isMatrix3?(T[0]=x.elements[0],T[1]=x.elements[1],T[2]=x.elements[2],T[3]=0,T[4]=x.elements[3],T[5]=x.elements[4],T[6]=x.elements[5],T[7]=0,T[8]=x.elements[6],T[9]=x.elements[7],T[10]=x.elements[8],T[11]=0):ArrayBuffer.isView(x)?T.set(new x.constructor(x.buffer,x.byteOffset,T.length)):x.toArray(T,w)}function y(x,T,w,E){let b=x.value,S=T+"_"+w;if(E[S]===void 0)return typeof b=="number"||typeof b=="boolean"?E[S]=b:ArrayBuffer.isView(b)?E[S]=b.slice():E[S]=b.clone(),!0;{let A=E[S];if(typeof b=="number"||typeof b=="boolean"){if(A!==b)return E[S]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(A.equals(b)===!1)return A.copy(b),!0}}return!1}function m(x){let T=x.uniforms,w=0,E=16;for(let S=0,A=T.length;S<A;S++){let R=Array.isArray(T[S])?T[S]:[T[S]];for(let I=0,O=R.length;I<O;I++){let D=R[I],L=Array.isArray(D.value)?D.value:[D.value];for(let P=0,F=L.length;P<F;P++){let G=L[P],z=g(G),V=w%E,U=V%z.boundary,H=V+U;w+=U,H!==0&&E-H<z.storage&&(w+=E-H),D.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=z.storage}}}let b=w%E;return b>0&&(w+=E-b),x.__size=w,x.__cache={},this}function g(x){let T={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(T.boundary=4,T.storage=4):x.isVector2?(T.boundary=8,T.storage=8):x.isVector3||x.isColor?(T.boundary=16,T.storage=12):x.isVector4?(T.boundary=16,T.storage=16):x.isMatrix3?(T.boundary=48,T.storage=48):x.isMatrix4?(T.boundary=64,T.storage=64):x.isTexture?it("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(T.boundary=16,T.storage=x.byteLength):it("WebGLRenderer: Unsupported uniform value type.",x),T}function M(x){let T=x.target;T.removeEventListener("dispose",M);let w=l.indexOf(T.__bindingPointIndex);l.splice(w,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function _(){for(let x in s)i.deleteBuffer(s[x]);l=[],s={},r={}}return{bind:a,update:d,dispose:_}}var ly=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ti=null;function cy(){return ti===null&&(ti=new Wa(ly,16,16,Fi,Wn),ti.name="DFG_LUT",ti.minFilter=Kt,ti.magFilter=Kt,ti.wrapS=Jn,ti.wrapT=Jn,ti.generateMipmaps=!1,ti.needsUpdate=!0),ti}var sl=class{constructor(e={}){let{canvas:t=od(),context:n=null,depth:s=!0,stencil:r=!1,alpha:l=!1,antialias:o=!1,premultipliedAlpha:a=!0,preserveDrawingBuffer:d=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:h=mn}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=l;let y=h,m=new Set([bo,vo,_o]),g=new Set([mn,zn,Ns,Us,go,yo]),M=new Uint32Array(4),_=new Int32Array(4),x=new te,T=null,w=null,E=[],b=[],S=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,R=!1,I=null,O=null,D=null,L=null;this._outputColorSpace=cn;let P=0,F=0,G=null,z=-1,V=null,U=new Dt,H=new Dt,K=null,ce=new ut(0),Z=0,Y=t.width,B=t.height,N=1,q=null,re=null,ae=new Dt(0,0,Y,B),he=new Dt(0,0,Y,B),xe=!1,ne=new Ss,fe=!1,me=!1,ye=new Lt,Q=new te,_e=new Dt,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ue=!1;function we(){return G===null?N:1}let $=n;function ze(k,J){return t.getContext(k,J)}let Ye,W,C,ee,ie,pe,Ee,Re,ge,ve,Pe,Ke,Fe,De,je,nt,ht,j,Ne,be,Ue,Ge,Se;try{let k={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:a,preserveDrawingBuffer:d,powerPreference:c,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",vt,!1),t.addEventListener("webglcontextcreationerror",Cn,!1),$===null){let J="webgl2";if($=ze(J,k),$===null)throw ze(J)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}et()}catch(k){throw t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",vt,!1),t.removeEventListener("webglcontextcreationerror",Cn,!1),st("WebGLRenderer: "+k.message),k}function et(){Ye=new gg($),Ye.init(),Ue=new ny($,Ye),W=new ag($,Ye,e,Ue),C=new ey($,Ye),W.reversedDepthBuffer&&u&&C.buffers.depth.setReversed(!0),O=$.createFramebuffer(),D=$.createFramebuffer(),L=$.createFramebuffer(),ee=new vg($),ie=new z2,pe=new ty($,Ye,C,ie,W,Ue,ee),Ee=new mg(A),Re=new Mp($),Ge=new sg($,Re),ge=new yg($,Re,ee,Ge),ve=new Mg($,ge,Re,Ge,ee),j=new bg($,W,pe),je=new og(ie),Pe=new B2(A,Ee,Ye,W,Ge,je),Ke=new ay(A,ie),Fe=new W2,De=new Y2(Ye),ht=new ig(A,Ee,C,ve,f,a),nt=new Q2(A,ve,W),Se=new oy($,ee,W,C),Ne=new rg($,Ye,ee),be=new _g($,Ye,ee),ee.programs=Pe.programs,A.capabilities=W,A.extensions=Ye,A.properties=ie,A.renderLists=Fe,A.shadowMap=nt,A.state=C,A.info=ee}y!==mn&&(S=new Sg(y,t.width,t.height,o,s,r));let Je=new ah(A,$);this.xr=Je,this.getContext=function(){return $},this.getContextAttributes=function(){return $.getContextAttributes()},this.forceContextLoss=function(){let k=Ye.get("WEBGL_lose_context");k&&k.loseContext()},this.forceContextRestore=function(){let k=Ye.get("WEBGL_lose_context");k&&k.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(k){k!==void 0&&(N=k,this.setSize(Y,B,!1))},this.getSize=function(k){return k.set(Y,B)},this.setSize=function(k,J,de=!0){if(Je.isPresenting){it("WebGLRenderer: Can't change size while VR device is presenting.");return}Y=k,B=J,t.width=Math.floor(k*N),t.height=Math.floor(J*N),de===!0&&(t.style.width=k+"px",t.style.height=J+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,k,J)},this.getDrawingBufferSize=function(k){return k.set(Y*N,B*N).floor()},this.setDrawingBufferSize=function(k,J,de){Y=k,B=J,N=de,t.width=Math.floor(k*de),t.height=Math.floor(J*de),this.setViewport(0,0,k,J)},this.setEffects=function(k){if(y===mn){st("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(k){for(let J=0;J<k.length;J++)if(k[J].isOutputPass===!0){it("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(k||[])},this.getCurrentViewport=function(k){return k.copy(U)},this.getViewport=function(k){return k.copy(ae)},this.setViewport=function(k,J,de,oe){k.isVector4?ae.set(k.x,k.y,k.z,k.w):ae.set(k,J,de,oe),C.viewport(U.copy(ae).multiplyScalar(N).round())},this.getScissor=function(k){return k.copy(he)},this.setScissor=function(k,J,de,oe){k.isVector4?he.set(k.x,k.y,k.z,k.w):he.set(k,J,de,oe),C.scissor(H.copy(he).multiplyScalar(N).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(k){C.setScissorTest(xe=k)},this.setOpaqueSort=function(k){q=k},this.setTransparentSort=function(k){re=k},this.getClearColor=function(k){return k.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor(...arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha(...arguments)},this.clear=function(k=!0,J=!0,de=!0){let oe=0;if(k){let le=!1;if(G!==null){let Be=G.texture.format;le=m.has(Be)}if(le){let Be=G.texture.type,Ve=g.has(Be),Oe=ht.getClearColor(),Xe=ht.getClearAlpha(),Ze=Oe.r,ft=Oe.g,mt=Oe.b;Ve?(M[0]=Ze,M[1]=ft,M[2]=mt,M[3]=Xe,$.clearBufferuiv($.COLOR,0,M)):(_[0]=Ze,_[1]=ft,_[2]=mt,_[3]=Xe,$.clearBufferiv($.COLOR,0,_))}else oe|=$.COLOR_BUFFER_BIT}J&&(oe|=$.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),de&&(oe|=$.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),oe!==0&&$.clear(oe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(k){k.setRenderer(this),I=k},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",vt,!1),t.removeEventListener("webglcontextcreationerror",Cn,!1),ht.dispose(),Fe.dispose(),De.dispose(),ie.dispose(),Ee.dispose(),ve.dispose(),Ge.dispose(),Se.dispose(),Pe.dispose(),Je.dispose(),Je.removeEventListener("sessionstart",Lh),Je.removeEventListener("sessionend",Dh),Bi.stop()};function Tt(k){k.preventDefault(),Uc("WebGLRenderer: Context Lost."),R=!0}function vt(){Uc("WebGLRenderer: Context Restored."),R=!1;let k=ee.autoReset,J=nt.enabled,de=nt.autoUpdate,oe=nt.needsUpdate,le=nt.type;et(),ee.autoReset=k,nt.enabled=J,nt.autoUpdate=de,nt.needsUpdate=oe,nt.type=le}function Cn(k){st("WebGLRenderer: A WebGL context could not be created. Reason: ",k.statusMessage)}function $n(k){let J=k.target;J.removeEventListener("dispose",$n),jf(J)}function jf(k){Qf(k),ie.remove(k)}function Qf(k){let J=ie.get(k).programs;J!==void 0&&(J.forEach(function(de){Pe.releaseProgram(de)}),k.isShaderMaterial&&Pe.releaseShaderCache(k))}this.renderBufferDirect=function(k,J,de,oe,le,Be){J===null&&(J=Te);let Ve=le.isMesh&&le.matrixWorld.determinantAffine()<0,Oe=n0(k,J,de,oe,le);C.setMaterial(oe,Ve);let Xe=de.index,Ze=1;if(oe.wireframe===!0){if(Xe=ge.getWireframeAttribute(de),Xe===void 0)return;Ze=2}let ft=de.drawRange,mt=de.attributes.position,qe=ft.start*Ze,bt=(ft.start+ft.count)*Ze;Be!==null&&(qe=Math.max(qe,Be.start*Ze),bt=Math.min(bt,(Be.start+Be.count)*Ze)),Xe!==null?(qe=Math.max(qe,0),bt=Math.min(bt,Xe.count)):mt!=null&&(qe=Math.max(qe,0),bt=Math.min(bt,mt.count));let Bt=bt-qe;if(Bt<0||Bt===1/0)return;Ge.setup(le,oe,Oe,de,Xe);let Ct,wt=Ne;if(Xe!==null&&(Ct=Re.get(Xe),wt=be,wt.setIndex(Ct)),le.isMesh)oe.wireframe===!0?(C.setLineWidth(oe.wireframeLinewidth*we()),wt.setMode($.LINES)):wt.setMode($.TRIANGLES);else if(le.isLine){let jt=oe.linewidth;jt===void 0&&(jt=1),C.setLineWidth(jt*we()),le.isLineSegments?wt.setMode($.LINES):le.isLineLoop?wt.setMode($.LINE_LOOP):wt.setMode($.LINE_STRIP)}else le.isPoints?wt.setMode($.POINTS):le.isSprite&&wt.setMode($.TRIANGLES);if(le.isBatchedMesh)if(Ye.get("WEBGL_multi_draw"))wt.renderMultiDraw(le._multiDrawStarts,le._multiDrawCounts,le._multiDrawCount);else{let jt=le._multiDrawStarts,We=le._multiDrawCounts,on=le._multiDrawCount,_t=Xe?Re.get(Xe).bytesPerElement:1,Tn=ie.get(oe).currentProgram.getUniforms();for(let Xn=0;Xn<on;Xn++)Tn.setValue($,"_gl_DrawID",Xn),wt.render(jt[Xn]/_t,We[Xn])}else if(le.isInstancedMesh)wt.renderInstances(qe,Bt,le.count);else if(de.isInstancedBufferGeometry){let jt=de._maxInstanceCount!==void 0?de._maxInstanceCount:1/0,We=Math.min(de.instanceCount,jt);wt.renderInstances(qe,Bt,We)}else wt.render(qe,Bt)};function Ih(k,J,de,oe){I!==null&&k.isNodeMaterial&&I.setObject(oe,k),fe===!0&&je.setState(k,de,!1),k.transparent===!0&&k.side===Qn&&k.forceSinglePass===!1?(k.side=un,k.needsUpdate=!0,ea(k,J,oe),k.side=Li,k.needsUpdate=!0,ea(k,J,oe),k.side=Qn):ea(k,J,oe)}this.compile=function(k,J,de=null){de===null&&(de=k),I!==null&&I.renderStart(k,J,de),w=De.get(de),w.init(J),b.push(w),de.traverseVisible(function(le){le.isLight&&le.layers.test(J.layers)&&(w.pushLight(le),le.castShadow&&w.pushShadow(le))}),k!==de&&k.traverseVisible(function(le){le.isLight&&le.layers.test(J.layers)&&(w.pushLight(le),le.castShadow&&w.pushShadow(le))}),w.setupLights(),I!==null&&I.updateLights(w.state.lightsArray),me=this.localClippingEnabled,fe=je.init(this.clippingPlanes,me),fe===!0&&je.setGlobalState(this.clippingPlanes,J),I!==null&&nt.render(w.state.shadowsArray,de,J);let oe=new Set;return k.traverse(function(le){if(!(le.isMesh||le.isPoints||le.isLine||le.isSprite))return;let Be=le.material;if(Be)if(Array.isArray(Be))for(let Ve=0;Ve<Be.length;Ve++){let Oe=Be[Ve];Ih(Oe,de,J,le),oe.add(Oe)}else Ih(Be,de,J,le),oe.add(Be)}),w=b.pop(),I!==null&&I.renderEnd(),oe},this.compileAsync=function(k,J,de=null){let oe=this.compile(k,J,de);return new Promise(le=>{function Be(){if(oe.forEach(function(Ve){let Xe=ie.get(Ve).currentProgram;(Xe===void 0||Xe.isReady())&&oe.delete(Ve)}),oe.size===0){le(k);return}setTimeout(Be,10)}Ye.get("KHR_parallel_shader_compile")!==null?Be():setTimeout(Be,10)})};let Al=null;function e0(k){Al&&Al(k)}function Lh(){Bi.stop()}function Dh(){Bi.start()}let Bi=new zd;Bi.setAnimationLoop(e0),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(k){Al=k,Je.setAnimationLoop(k),k===null?Bi.stop():Bi.start()},Je.addEventListener("sessionstart",Lh),Je.addEventListener("sessionend",Dh),this.render=function(k,J){if(J!==void 0&&J.isCamera!==!0){st("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;I!==null&&I.renderStart(k,J);let de=Je.enabled===!0&&Je.isPresenting===!0,oe=S!==null&&(G===null||de)&&S.begin(A,G);if(k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(J),J=Je.getCamera()),k.isScene===!0&&k.onBeforeRender(A,k,J,G),w=De.get(k,b.length),w.init(J),w.state.textureUnits=pe.getTextureUnits(),b.push(w),ye.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),ne.setFromProjectionMatrix(ye,Un,J.reversedDepth),me=this.localClippingEnabled,fe=je.init(this.clippingPlanes,me),T=Fe.get(k,E.length),T.init(),E.push(T),Je.enabled===!0&&Je.isPresenting===!0){let Ve=A.xr.getDepthSensingMesh();Ve!==null&&Rl(Ve,J,-1/0,A.sortObjects)}Rl(k,J,0,A.sortObjects),T.finish(),I!==null&&I.updateLights(w.state.lightsArray),A.sortObjects===!0&&T.sort(q,re),ue=Je.enabled===!1||Je.isPresenting===!1||Je.hasDepthSensing()===!1,ue&&ht.addToRenderList(T,k),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),fe===!0&&je.beginShadows();let le=w.state.shadowsArray;if(nt.render(le,k,J),fe===!0&&je.endShadows(),(oe&&S.hasRenderPass())===!1){let Ve=T.opaque,Oe=T.transmissive;if(w.setupLights(),J.isArrayCamera){let Xe=J.cameras;if(Oe.length>0)for(let Ze=0,ft=Xe.length;Ze<ft;Ze++){let mt=Xe[Ze];Uh(Ve,Oe,k,mt)}ue&&ht.render(k);for(let Ze=0,ft=Xe.length;Ze<ft;Ze++){let mt=Xe[Ze];Nh(T,k,mt,mt.viewport)}}else Oe.length>0&&Uh(Ve,Oe,k,J),ue&&ht.render(k),Nh(T,k,J)}G!==null&&F===0&&(pe.updateMultisampleRenderTarget(G),pe.updateRenderTargetMipmap(G)),oe&&S.end(A),k.isScene===!0&&k.onAfterRender(A,k,J),Ge.resetDefaultState(),z=-1,V=null,b.pop(),b.length>0?(w=b[b.length-1],pe.setTextureUnits(w.state.textureUnits),fe===!0&&je.setGlobalState(A.clippingPlanes,w.state.camera)):w=null,E.pop(),E.length>0?T=E[E.length-1]:T=null,I!==null&&I.renderEnd()};function Rl(k,J,de,oe){if(k.visible===!1)return;if(k.layers.test(J.layers)){if(k.isGroup)de=k.renderOrder;else if(k.isLOD)k.autoUpdate===!0&&k.update(J);else if(k.isLightProbeGrid)w.pushLightProbeGrid(k);else if(k.isLight)w.pushLight(k),k.castShadow&&w.pushShadow(k);else if(k.isSprite){if(!k.frustumCulled||k.intersectsFrustum(ne)){oe&&_e.setFromMatrixPosition(k.matrixWorld).applyMatrix4(ye);let Ve=ve.update(k),Oe=k.material;Oe.visible&&T.push(k,Ve,Oe,de,_e.z,null,J)}}else if((k.isMesh||k.isLine||k.isPoints)&&(!k.frustumCulled||k.intersectsFrustum(ne))){let Ve=ve.update(k),Oe=k.material;if(oe&&(k.boundingSphere!==void 0?(k.boundingSphere===null&&k.computeBoundingSphere(),_e.copy(k.boundingSphere.center)):(Ve.boundingSphere===null&&Ve.computeBoundingSphere(),_e.copy(Ve.boundingSphere.center)),_e.applyMatrix4(k.matrixWorld).applyMatrix4(ye)),Array.isArray(Oe)){let Xe=Ve.groups;for(let Ze=0,ft=Xe.length;Ze<ft;Ze++){let mt=Xe[Ze],qe=Oe[mt.materialIndex];qe&&qe.visible&&T.push(k,Ve,qe,de,_e.z,mt,J)}}else Oe.visible&&T.push(k,Ve,Oe,de,_e.z,null,J)}}let Be=k.children;for(let Ve=0,Oe=Be.length;Ve<Oe;Ve++)Rl(Be[Ve],J,de,oe)}function Nh(k,J,de,oe){let{opaque:le,transmissive:Be,transparent:Ve}=k;w.setupLightsView(de),fe===!0&&je.setGlobalState(A.clippingPlanes,de),oe&&C.viewport(U.copy(oe)),le.length>0&&Qr(le,J,de),Be.length>0&&Qr(Be,J,de),Ve.length>0&&Qr(Ve,J,de),C.buffers.depth.setTest(!0),C.buffers.depth.setMask(!0),C.buffers.color.setMask(!0),C.setPolygonOffset(!1)}function Uh(k,J,de,oe){if((de.isScene===!0?de.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[oe.id]===void 0){let qe=Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[oe.id]=new pn(1,1,{generateMipmaps:!0,type:qe?Wn:mn,minFilter:Ni,samples:Math.max(4,W.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:yt.workingColorSpace})}let Be=w.state.transmissionRenderTarget[oe.id],Ve=oe.viewport||U;Be.setSize(Ve.z*A.transmissionResolutionScale,Ve.w*A.transmissionResolutionScale);let Oe=A.getRenderTarget(),Xe=A.getActiveCubeFace(),Ze=A.getActiveMipmapLevel();A.setRenderTarget(Be),A.getClearColor(ce),Z=A.getClearAlpha(),Z<1&&A.setClearColor(16777215,.5),A.clear(),ue&&ht.render(de);let ft=A.toneMapping;A.toneMapping=Bn;let mt=oe.viewport;if(oe.viewport!==void 0&&(oe.viewport=void 0),w.setupLightsView(oe),fe===!0&&je.setGlobalState(A.clippingPlanes,oe),Qr(k,de,oe),pe.updateMultisampleRenderTarget(Be),pe.updateRenderTargetMipmap(Be),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let bt=0,Bt=J.length;bt<Bt;bt++){let Ct=J[bt],{object:wt,geometry:jt,material:We,group:on}=Ct;if(We.side===Qn&&wt.layers.test(oe.layers)){let _t=We.side;We.side=un,We.needsUpdate=!0,Fh(wt,de,oe,jt,We,on),We.side=_t,We.needsUpdate=!0,qe=!0}}qe===!0&&(pe.updateMultisampleRenderTarget(Be),pe.updateRenderTargetMipmap(Be))}A.setRenderTarget(Oe,Xe,Ze),A.setClearColor(ce,Z),mt!==void 0&&(oe.viewport=mt),A.toneMapping=ft}function Qr(k,J,de){let oe=J.isScene===!0?J.overrideMaterial:null;for(let le=0,Be=k.length;le<Be;le++){let Ve=k[le],{object:Oe,geometry:Xe,group:Ze}=Ve,ft=Ve.material;ft.allowOverride===!0&&oe!==null&&(ft=oe),Oe.layers.test(de.layers)&&Fh(Oe,J,de,Xe,ft,Ze)}}function Fh(k,J,de,oe,le,Be){I!==null&&le.isNodeMaterial&&I.setObject(k,le),k.onBeforeRender(A,J,de,oe,le,Be),k.modelViewMatrix.multiplyMatrices(de.matrixWorldInverse,k.matrixWorld),k.normalMatrix.getNormalMatrix(k.modelViewMatrix),le.onBeforeRender(A,J,de,oe,k,Be),le.transparent===!0&&le.side===Qn&&le.forceSinglePass===!1?(le.side=un,le.needsUpdate=!0,A.renderBufferDirect(de,J,oe,le,k,Be),le.side=Li,le.needsUpdate=!0,A.renderBufferDirect(de,J,oe,le,k,Be),le.side=Qn):A.renderBufferDirect(de,J,oe,le,k,Be),k.onAfterRender(A,J,de,oe,le,Be)}function ea(k,J,de){J.isScene!==!0&&(J=Te);let oe=ie.get(k),le=w.state.lights,Be=w.state.shadowsArray,Ve=le.state.version,Oe=Pe.getParameters(k,le.state,Be,J,de,w.state.lightProbeGridArray),Xe=Pe.getProgramCacheKey(Oe),Ze=oe.programs;oe.environment=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?J.environment:null,oe.fog=J.fog;let ft=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap;oe.envMap=Ee.get(k.envMap||oe.environment,ft),oe.envMapRotation=oe.environment!==null&&k.envMap===null?J.environmentRotation:k.envMapRotation,Ze===void 0&&(k.addEventListener("dispose",$n),Ze=new Map,oe.programs=Ze);let mt=Ze.get(Xe);if(mt!==void 0){if(oe.currentProgram===mt&&oe.lightsStateVersion===Ve)return Oh(k,Oe),mt}else Oe.uniforms=Pe.getUniforms(k),I!==null&&k.isNodeMaterial&&I.build(k,de,Oe),k.onBeforeCompile(Oe,A),mt=Pe.acquireProgram(Oe,Xe),Ze.set(Xe,mt),oe.uniforms=Oe.uniforms;let qe=oe.uniforms;return(!k.isShaderMaterial&&!k.isRawShaderMaterial||k.clipping===!0)&&(qe.clippingPlanes=je.uniform),Oh(k,Oe),oe.needsLights=s0(k),oe.lightsStateVersion=Ve,oe.needsLights&&(qe.ambientLightColor.value=le.state.ambient,qe.lightProbe.value=le.state.probe,qe.sunLights.value=le.state.sun,qe.sunLightShadows.value=le.state.sunShadow,qe.directionalLights.value=le.state.directional,qe.directionalLightShadows.value=le.state.directionalShadow,qe.spotLights.value=le.state.spot,qe.spotLightShadows.value=le.state.spotShadow,qe.rectAreaLights.value=le.state.rectArea,qe.ltc_1.value=le.state.rectAreaLTC1,qe.ltc_2.value=le.state.rectAreaLTC2,qe.pointLights.value=le.state.point,qe.pointLightShadows.value=le.state.pointShadow,qe.hemisphereLights.value=le.state.hemi,qe.sunShadowMatrix.value=le.state.sunShadowMatrix,qe.sunShadowCascade.value=le.state.sunShadowCascade,qe.directionalShadowMatrix.value=le.state.directionalShadowMatrix,qe.spotLightMatrix.value=le.state.spotLightMatrix,qe.spotLightMap.value=le.state.spotLightMap,qe.pointShadowMatrix.value=le.state.pointShadowMatrix),oe.lightProbeGrid=w.state.lightProbeGridArray.length>0,oe.currentProgram=mt,oe.uniformsList=null,mt}function kh(k){if(k.uniformsList===null){let J=k.currentProgram.getUniforms();k.uniformsList=Bs.seqWithValue(J.seq,k.uniforms)}return k.uniformsList}function Oh(k,J){let de=ie.get(k);de.outputColorSpace=J.outputColorSpace,de.batching=J.batching,de.batchingColor=J.batchingColor,de.instancing=J.instancing,de.instancingColor=J.instancingColor,de.instancingMorph=J.instancingMorph,de.skinning=J.skinning,de.morphTargets=J.morphTargets,de.morphNormals=J.morphNormals,de.morphColors=J.morphColors,de.morphTargetsCount=J.morphTargetsCount,de.numClippingPlanes=J.numClippingPlanes,de.numIntersection=J.numClipIntersection,de.vertexAlphas=J.vertexAlphas,de.vertexTangents=J.vertexTangents,de.toneMapping=J.toneMapping}function t0(k,J){if(k.length===0)return null;if(k.length===1)return k[0].texture!==null?k[0]:null;x.setFromMatrixPosition(J.matrixWorld);for(let de=0,oe=k.length;de<oe;de++){let le=k[de];if(le.texture!==null&&le.boundingBox.containsPoint(x))return le}return null}function n0(k,J,de,oe,le){J.isScene!==!0&&(J=Te),pe.resetTextureUnits();let Be=J.fog,Ve=oe.isMeshStandardMaterial||oe.isMeshLambertMaterial||oe.isMeshPhongMaterial?J.environment:null,Oe=G===null?A.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:yt.workingColorSpace,Xe=oe.isMeshStandardMaterial||oe.isMeshLambertMaterial&&!oe.envMap||oe.isMeshPhongMaterial&&!oe.envMap,Ze=Ee.get(oe.envMap||Ve,Xe),ft=oe.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,mt=!!de.attributes.tangent&&(!!oe.normalMap||oe.anisotropy>0),qe=!!de.morphAttributes.position,bt=!!de.morphAttributes.normal,Bt=!!de.morphAttributes.color,Ct=Bn;oe.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(Ct=A.toneMapping);let wt=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,jt=wt!==void 0?wt.length:0,We=ie.get(oe),on=w.state.lights;if(fe===!0&&(me===!0||k!==V)){let Et=k===V&&oe.id===z;je.setState(oe,k,Et)}let _t=!1;oe.version===We.__version?(We.needsLights&&We.lightsStateVersion!==on.state.version||We.outputColorSpace!==Oe||le.isBatchedMesh&&We.batching===!1||!le.isBatchedMesh&&We.batching===!0||le.isBatchedMesh&&We.batchingColor===!0&&le._colorsTexture===null||le.isBatchedMesh&&We.batchingColor===!1&&le._colorsTexture!==null||le.isInstancedMesh&&We.instancing===!1||!le.isInstancedMesh&&We.instancing===!0||le.isSkinnedMesh&&We.skinning===!1||!le.isSkinnedMesh&&We.skinning===!0||le.isInstancedMesh&&We.instancingColor===!0&&le.instanceColor===null||le.isInstancedMesh&&We.instancingColor===!1&&le.instanceColor!==null||le.isInstancedMesh&&We.instancingMorph===!0&&le.morphTexture===null||le.isInstancedMesh&&We.instancingMorph===!1&&le.morphTexture!==null||We.envMap!==Ze||oe.fog===!0&&We.fog!==Be||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==je.numPlanes||We.numIntersection!==je.numIntersection)||We.vertexAlphas!==ft||We.vertexTangents!==mt||We.morphTargets!==qe||We.morphNormals!==bt||We.morphColors!==Bt||We.toneMapping!==Ct||We.morphTargetsCount!==jt||!!We.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(_t=!0):(_t=!0,We.__version=oe.version);let Tn=We.currentProgram;_t===!0&&(Tn=ea(oe,J,le),I&&oe.isNodeMaterial&&I.onUpdateProgram(oe,Tn,We));let Xn=!1,gi=!1,ts=!1,xt=Tn.getUniforms(),kt=We.uniforms;if(C.useProgram(Tn.program)&&(Xn=!0,gi=!0,ts=!0),oe.id!==z&&(z=oe.id,gi=!0),We.needsLights){let Et=t0(w.state.lightProbeGridArray,le);We.lightProbeGrid!==Et&&(We.lightProbeGrid=Et,gi=!0)}if(Xn||V!==k){C.buffers.depth.getReversed()&&k.reversedDepth!==!0&&(k._reversedDepth=!0,k.updateProjectionMatrix()),xt.setValue($,"projectionMatrix",k.projectionMatrix),xt.setValue($,"viewMatrix",k.matrixWorldInverse);let _i=xt.map.cameraPosition;_i!==void 0&&_i.setValue($,Q.setFromMatrixPosition(k.matrixWorld)),W.logarithmicDepthBuffer&&xt.setValue($,"logDepthBufFC",2/(Math.log(k.far+1)/Math.LN2)),(oe.isMeshPhongMaterial||oe.isMeshToonMaterial||oe.isMeshLambertMaterial||oe.isMeshBasicMaterial||oe.isMeshStandardMaterial||oe.isShaderMaterial)&&xt.setValue($,"isOrthographic",k.isOrthographicCamera===!0),V!==k&&(V=k,gi=!0,ts=!0)}if(We.needsLights&&(on.state.sunShadowMap.length>0&&xt.setValue($,"sunShadowMap",on.state.sunShadowMap,pe),on.state.directionalShadowMap.length>0&&xt.setValue($,"directionalShadowMap",on.state.directionalShadowMap,pe),on.state.spotShadowMap.length>0&&xt.setValue($,"spotShadowMap",on.state.spotShadowMap,pe),on.state.pointShadowMap.length>0&&xt.setValue($,"pointShadowMap",on.state.pointShadowMap,pe)),le.isSkinnedMesh){xt.setOptional($,le,"bindMatrix"),xt.setOptional($,le,"bindMatrixInverse");let Et=le.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),xt.setValue($,"boneTexture",Et.boneTexture,pe))}le.isBatchedMesh&&(xt.setOptional($,le,"batchingTexture"),xt.setValue($,"batchingTexture",le._matricesTexture,pe),xt.setOptional($,le,"batchingIdTexture"),xt.setValue($,"batchingIdTexture",le._indirectTexture,pe),xt.setOptional($,le,"batchingColorTexture"),le._colorsTexture!==null&&xt.setValue($,"batchingColorTexture",le._colorsTexture,pe));let yi=de.morphAttributes;if((yi.position!==void 0||yi.normal!==void 0||yi.color!==void 0)&&j.update(le,de,Tn),(gi||We.receiveShadow!==le.receiveShadow)&&(We.receiveShadow=le.receiveShadow,xt.setValue($,"receiveShadow",le.receiveShadow)),(oe.isMeshStandardMaterial||oe.isMeshLambertMaterial||oe.isMeshPhongMaterial)&&oe.envMap===null&&J.environment!==null&&(kt.envMapIntensity.value=J.environmentIntensity),kt.dfgLUT!==void 0&&(kt.dfgLUT.value=cy()),gi){if(xt.setValue($,"toneMappingExposure",A.toneMappingExposure),We.needsLights&&i0(kt,ts),Be&&oe.fog===!0&&Ke.refreshFogUniforms(kt,Be),Ke.refreshMaterialUniforms(kt,oe,N,B,w.state.transmissionRenderTarget[k.id]),We.needsLights&&We.lightProbeGrid){let Et=We.lightProbeGrid;kt.probesSH.value=Et.texture,kt.probesMin.value.copy(Et.boundingBox.min),kt.probesMax.value.copy(Et.boundingBox.max),kt.probesResolution.value.copy(Et.resolution)}Bs.upload($,kh(We),kt,pe)}if(oe.isShaderMaterial&&oe.uniformsNeedUpdate===!0&&(Bs.upload($,kh(We),kt,pe),oe.uniformsNeedUpdate=!1),oe.isSpriteMaterial&&xt.setValue($,"center",le.center),xt.setValue($,"modelViewMatrix",le.modelViewMatrix),xt.setValue($,"normalMatrix",le.normalMatrix),xt.setValue($,"modelMatrix",le.matrixWorld),oe.uniformsGroups!==void 0){let Et=oe.uniformsGroups;for(let _i=0,ns=Et.length;_i<ns;_i++){let zh=Et[_i];Se.update(zh,Tn),Se.bind(zh,Tn)}}return Tn}function i0(k,J){k.ambientLightColor.needsUpdate=J,k.lightProbe.needsUpdate=J,k.sunLights.needsUpdate=J,k.sunLightShadows.needsUpdate=J,k.directionalLights.needsUpdate=J,k.directionalLightShadows.needsUpdate=J,k.pointLights.needsUpdate=J,k.pointLightShadows.needsUpdate=J,k.spotLights.needsUpdate=J,k.spotLightShadows.needsUpdate=J,k.rectAreaLights.needsUpdate=J,k.hemisphereLights.needsUpdate=J}function s0(k){return k.isMeshLambertMaterial||k.isMeshToonMaterial||k.isMeshPhongMaterial||k.isMeshStandardMaterial||k.isShadowMaterial||k.isShaderMaterial&&k.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(k,J,de){let oe=ie.get(k);oe.__autoAllocateDepthBuffer=k.resolveDepthBuffer===!1,oe.__autoAllocateDepthBuffer===!1&&(oe.__useRenderToTexture=!1),ie.get(k.texture).__webglTexture=J,ie.get(k.depthTexture).__webglTexture=oe.__autoAllocateDepthBuffer?void 0:de,oe.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(k,J){let de=ie.get(k);de.__webglFramebuffer=J,de.__useDefaultFramebuffer=J===void 0},this.setRenderTarget=function(k,J=0,de=0){G=k,P=J,F=de;let oe=null,le=!1,Be=!1;if(k){let Oe=ie.get(k);if(Oe.__useDefaultFramebuffer!==void 0){C.bindFramebuffer($.FRAMEBUFFER,Oe.__webglFramebuffer),U.copy(k.viewport),H.copy(k.scissor),K=k.scissorTest,C.viewport(U),C.scissor(H),C.setScissorTest(K),z=-1;return}else if(Oe.__webglFramebuffer===void 0)pe.setupRenderTarget(k);else if(Oe.__hasExternalTextures)pe.rebindTextures(k,ie.get(k.texture).__webglTexture,ie.get(k.depthTexture).__webglTexture);else if(k.depthBuffer){let ft=k.depthTexture;if(Oe.__boundDepthTexture!==ft){if(ft!==null&&ie.has(ft)&&(k.width!==ft.image.width||k.height!==ft.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");pe.setupDepthRenderbuffer(k)}}let Xe=k.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Be=!0);let Ze=ie.get(k).__webglFramebuffer;k.isWebGLCubeRenderTarget?(Array.isArray(Ze[J])?oe=Ze[J][de]:oe=Ze[J],le=!0):k.samples>0&&pe.useMultisampledRTT(k)===!1?oe=ie.get(k).__webglMultisampledFramebuffer:Array.isArray(Ze)?oe=Ze[de]:oe=Ze,U.copy(k.viewport),H.copy(k.scissor),K=k.scissorTest}else U.copy(ae).multiplyScalar(N).floor(),H.copy(he).multiplyScalar(N).floor(),K=xe;if(de!==0&&(oe=O),C.bindFramebuffer($.FRAMEBUFFER,oe)&&C.drawBuffers(k,oe),C.viewport(U),C.scissor(H),C.setScissorTest(K),le){let Oe=ie.get(k.texture);$.framebufferTexture2D($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_CUBE_MAP_POSITIVE_X+J,Oe.__webglTexture,de)}else if(Be){let Oe=J;for(let Xe=0;Xe<k.textures.length;Xe++){let Ze=ie.get(k.textures[Xe]);$.framebufferTextureLayer($.FRAMEBUFFER,$.COLOR_ATTACHMENT0+Xe,Ze.__webglTexture,de,Oe)}}else if(k!==null&&de!==0){let Oe=ie.get(k.texture);$.framebufferTexture2D($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_2D,Oe.__webglTexture,de)}z=-1};function Bh(k){let J=ie.get(k);return(J.__readFormat!==k.format||J.__readType!==k.type)&&(J.__readFormat=k.format,J.__readType=k.type,J.__formatReadable=W.textureFormatReadable(k.format),J.__typeReadable=W.textureTypeReadable(k.type)),J}this.readRenderTargetPixels=function(k,J,de,oe,le,Be,Ve,Oe=0){if(!(k&&k.isWebGLRenderTarget)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xe=ie.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&Ve!==void 0&&(Xe=Xe[Ve]),Xe){C.bindFramebuffer($.FRAMEBUFFER,Xe);try{let Ze=k.textures[Oe],ft=Ze.format,mt=Ze.type;k.textures.length>1&&$.readBuffer($.COLOR_ATTACHMENT0+Oe);let qe=Bh(Ze);if(qe.__formatReadable===!1){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(qe.__typeReadable===!1){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=k.width-oe&&de>=0&&de<=k.height-le&&$.readPixels(J,de,oe,le,Ue.convert(ft),Ue.convert(mt),Be)}finally{let Ze=G!==null?ie.get(G).__webglFramebuffer:null;C.bindFramebuffer($.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(k,J,de,oe,le,Be,Ve,Oe=0){if(!(k&&k.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xe=ie.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&Ve!==void 0&&(Xe=Xe[Ve]),Xe)if(J>=0&&J<=k.width-oe&&de>=0&&de<=k.height-le){C.bindFramebuffer($.FRAMEBUFFER,Xe);let Ze=k.textures[Oe],ft=Ze.format,mt=Ze.type;k.textures.length>1&&$.readBuffer($.COLOR_ATTACHMENT0+Oe);let qe=Bh(Ze);if(qe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(qe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let bt=$.createBuffer();$.bindBuffer($.PIXEL_PACK_BUFFER,bt),$.bufferData($.PIXEL_PACK_BUFFER,Be.byteLength,$.STREAM_READ),$.readPixels(J,de,oe,le,Ue.convert(ft),Ue.convert(mt),0),$.bindBuffer($.PIXEL_PACK_BUFFER,null);let Bt=G!==null?ie.get(G).__webglFramebuffer:null;C.bindFramebuffer($.FRAMEBUFFER,Bt);let Ct=$.fenceSync($.SYNC_GPU_COMMANDS_COMPLETE,0);return $.flush(),await cd($,Ct,4),$.bindBuffer($.PIXEL_PACK_BUFFER,bt),$.getBufferSubData($.PIXEL_PACK_BUFFER,0,Be),$.bindBuffer($.PIXEL_PACK_BUFFER,null),$.deleteBuffer(bt),$.deleteSync(Ct),Be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(k,J=null,de=0){let oe=Math.pow(2,-de),le=Math.floor(k.image.width*oe),Be=Math.floor(k.image.height*oe),Ve=J!==null?J.x:0,Oe=J!==null?J.y:0;pe.setTexture2D(k,0),$.copyTexSubImage2D($.TEXTURE_2D,de,0,0,Ve,Oe,le,Be),C.unbindTexture()},this.copyTextureToTexture=function(k,J,de=null,oe=null,le=0,Be=0){let Ve,Oe,Xe,Ze,ft,mt,qe,bt,Bt,Ct=k.isCompressedTexture?k.mipmaps[Be]:k.image;if(de!==null)Ve=de.max.x-de.min.x,Oe=de.max.y-de.min.y,Xe=de.isBox3?de.max.z-de.min.z:1,Ze=de.min.x,ft=de.min.y,mt=de.isBox3?de.min.z:0;else{let kt=Math.pow(2,-le);Ve=Math.floor(Ct.width*kt),Oe=Math.floor(Ct.height*kt),k.isDataArrayTexture?Xe=Ct.depth:k.isData3DTexture?Xe=Math.floor(Ct.depth*kt):Xe=1,Ze=0,ft=0,mt=0}oe!==null?(qe=oe.x,bt=oe.y,Bt=oe.z):(qe=0,bt=0,Bt=0);let wt=Ue.convert(J.format),jt=Ue.convert(J.type),We;J.isData3DTexture?(pe.setTexture3D(J,0),We=$.TEXTURE_3D):J.isDataArrayTexture||J.isCompressedArrayTexture?(pe.setTexture2DArray(J,0),We=$.TEXTURE_2D_ARRAY):(pe.setTexture2D(J,0),We=$.TEXTURE_2D),C.activeTexture($.TEXTURE0),C.pixelStorei($.UNPACK_FLIP_Y_WEBGL,J.flipY),C.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),C.pixelStorei($.UNPACK_ALIGNMENT,J.unpackAlignment);let on=C.getParameter($.UNPACK_ROW_LENGTH),_t=C.getParameter($.UNPACK_IMAGE_HEIGHT),Tn=C.getParameter($.UNPACK_SKIP_PIXELS),Xn=C.getParameter($.UNPACK_SKIP_ROWS),gi=C.getParameter($.UNPACK_SKIP_IMAGES);C.pixelStorei($.UNPACK_ROW_LENGTH,Ct.width),C.pixelStorei($.UNPACK_IMAGE_HEIGHT,Ct.height),C.pixelStorei($.UNPACK_SKIP_PIXELS,Ze),C.pixelStorei($.UNPACK_SKIP_ROWS,ft),C.pixelStorei($.UNPACK_SKIP_IMAGES,mt);let ts=k.isDataArrayTexture||k.isData3DTexture,xt=J.isDataArrayTexture||J.isData3DTexture;if(k.isDepthTexture){let kt=ie.get(k),yi=ie.get(J),Et=ie.get(kt.__renderTarget),_i=ie.get(yi.__renderTarget);C.bindFramebuffer($.READ_FRAMEBUFFER,Et.__webglFramebuffer),C.bindFramebuffer($.DRAW_FRAMEBUFFER,_i.__webglFramebuffer);for(let ns=0;ns<Xe;ns++)ts&&($.framebufferTextureLayer($.READ_FRAMEBUFFER,$.COLOR_ATTACHMENT0,ie.get(k).__webglTexture,le,mt+ns),$.framebufferTextureLayer($.DRAW_FRAMEBUFFER,$.COLOR_ATTACHMENT0,ie.get(J).__webglTexture,Be,Bt+ns)),$.blitFramebuffer(Ze,ft,Ve,Oe,qe,bt,Ve,Oe,$.DEPTH_BUFFER_BIT,$.NEAREST);C.bindFramebuffer($.READ_FRAMEBUFFER,null),C.bindFramebuffer($.DRAW_FRAMEBUFFER,null)}else if(le!==0||k.isRenderTargetTexture||ie.has(k)){let kt=ie.get(k),yi=ie.get(J);C.bindFramebuffer($.READ_FRAMEBUFFER,D),C.bindFramebuffer($.DRAW_FRAMEBUFFER,L);for(let Et=0;Et<Xe;Et++)ts?$.framebufferTextureLayer($.READ_FRAMEBUFFER,$.COLOR_ATTACHMENT0,kt.__webglTexture,le,mt+Et):$.framebufferTexture2D($.READ_FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_2D,kt.__webglTexture,le),xt?$.framebufferTextureLayer($.DRAW_FRAMEBUFFER,$.COLOR_ATTACHMENT0,yi.__webglTexture,Be,Bt+Et):$.framebufferTexture2D($.DRAW_FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_2D,yi.__webglTexture,Be),le!==0?$.blitFramebuffer(Ze,ft,Ve,Oe,qe,bt,Ve,Oe,$.COLOR_BUFFER_BIT,$.NEAREST):xt?$.copyTexSubImage3D(We,Be,qe,bt,Bt+Et,Ze,ft,Ve,Oe):$.copyTexSubImage2D(We,Be,qe,bt,Ze,ft,Ve,Oe);C.bindFramebuffer($.READ_FRAMEBUFFER,null),C.bindFramebuffer($.DRAW_FRAMEBUFFER,null)}else xt?k.isDataTexture||k.isData3DTexture?$.texSubImage3D(We,Be,qe,bt,Bt,Ve,Oe,Xe,wt,jt,Ct.data):J.isCompressedArrayTexture?$.compressedTexSubImage3D(We,Be,qe,bt,Bt,Ve,Oe,Xe,wt,Ct.data):$.texSubImage3D(We,Be,qe,bt,Bt,Ve,Oe,Xe,wt,jt,Ct):k.isDataTexture?$.texSubImage2D($.TEXTURE_2D,Be,qe,bt,Ve,Oe,wt,jt,Ct.data):k.isCompressedTexture?$.compressedTexSubImage2D($.TEXTURE_2D,Be,qe,bt,Ct.width,Ct.height,wt,Ct.data):$.texSubImage2D($.TEXTURE_2D,Be,qe,bt,Ve,Oe,wt,jt,Ct);C.pixelStorei($.UNPACK_ROW_LENGTH,on),C.pixelStorei($.UNPACK_IMAGE_HEIGHT,_t),C.pixelStorei($.UNPACK_SKIP_PIXELS,Tn),C.pixelStorei($.UNPACK_SKIP_ROWS,Xn),C.pixelStorei($.UNPACK_SKIP_IMAGES,gi),Be===0&&J.generateMipmaps&&$.generateMipmap(We),C.unbindTexture()},this.initRenderTarget=function(k){ie.get(k).__webglFramebuffer===void 0&&pe.setupRenderTarget(k)},this.initTexture=function(k){k.isCubeTexture?pe.setTextureCube(k,0):k.isData3DTexture?pe.setTexture3D(k,0):k.isDataArrayTexture||k.isCompressedArrayTexture?pe.setTexture2DArray(k,0):pe.setTexture2D(k,0),C.unbindTexture()},this.resetState=function(){P=0,F=0,G=null,C.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=yt._getDrawingBufferColorSpace(e),t.unpackColorSpace=yt._getUnpackColorSpace()}};function qd(i){let e=document.createElement("div");e.className="canvas-wrap three-wrap",i.appendChild(e);let t;try{t=new sl({antialias:!0,alpha:!0,powerPreference:"low-power"})}catch{e.innerHTML='<p class="nowebgl">This 3D figure needs WebGL, which isn\u2019t available in this browser. Everything else on the page is 2D and will work.</p>';return}let n=t.domElement;n.setAttribute("role","img"),n.setAttribute("aria-label","A three-dimensional generator: a two-pole magnet spins inside six copper coils that glow as voltage is induced in each of three phases. Drag to rotate."),e.appendChild(n),t.outputColorSpace=cn,t.toneMapping=Cr,t.toneMappingExposure=1.05;let s=new lr,r=new nn(32,1.6,.1,100);r.position.set(0,.5,9.2),r.lookAt(0,0,0),s.add(new Er(16775406,12103842,1.3));let l=new Is(16777215,2.2);l.position.set(4,6,7),s.add(l);let o=new Is(14674175,.9);o.position.set(-6,2,-5),s.add(o);let a=new Fn;s.add(a);let d=1.6,c=new Rs;c.absarc(0,0,2.55,0,Math.PI*2,!1);let p=new qi;p.absarc(0,0,2.05,0,Math.PI*2,!0),c.holes.push(p);let u=new xr(c,{depth:d,bevelEnabled:!0,bevelThickness:.05,bevelSize:.05,bevelSegments:3,curveSegments:96});u.translate(0,0,-d/2);let h=new On({color:13617856,roughness:.48,metalness:.55});a.add(new Ut(u,h));let f=new ut("#c98a55"),y=[v.phaseA,v.phaseC,v.phaseB,v.phaseA,v.phaseC,v.phaseB].map(B=>new ut(B)),m=[];for(let B=0;B<6;B++){let N=B*Math.PI/3,q=new Fn;q.rotation.z=N;let re=new Ut(new kn(.62,.42,d*.92),h);re.position.x=1.78,q.add(re);let ae=new Ut(new kn(.12,.78,d*.92),h);ae.position.x=1.47,q.add(ae);let he=new On({color:f.clone(),roughness:.32,metalness:.75,emissive:y[B].clone(),emissiveIntensity:0});for(let xe=0;xe<4;xe++){let ne=new As,fe=.5,me=d*.98,ye=.12,Q=[];for(let ue=0;ue<=64;ue++){let we=ue/64*Math.PI*2,$=Math.cos(we),ze=Math.sin(we),Ye=Math.sign($)*Math.min(1,Math.abs($)*4),W=Math.sign(ze)*Math.min(1,Math.abs(ze)*4);Q.push(new te(0,fe/2*Ye*(1-ye)+$*ye*0+.02*Ye,me/2*W))}let _e=new Es(Q,!0),Te=new Ut(new Sr(_e,96,.055,8,!0),he);Te.position.x=1.6+xe*.115,q.add(Te)}a.add(q),m.push(he)}let g=new Fn,M=B=>{let N=new ws(1.32,1.32,d*.98,64,1,!1,B,Math.PI);return N.rotateX(Math.PI/2),N},_=new On({color:new ut(v.north),roughness:.42,metalness:.15}),x=new On({color:new ut(v.south),roughness:.42,metalness:.15});g.add(new Ut(M(0),_)),g.add(new Ut(M(Math.PI),x));let T=new Ut(new ws(.2,.2,d*2.6,32),new On({color:12433323,roughness:.3,metalness:.8}));T.rotation.x=Math.PI/2,g.add(T);let w=new Ut(new kn(.5,.06,.02),new On({color:16777215}));w.position.set(.85,0,d*.5),g.add(w),a.add(g);let E=new Ut(new kn(3.4,.35,d*1.2),new On({color:11117204,roughness:.7,metalness:.2}));E.position.y=-2.75,a.add(E);let b=document.createElement("canvas");b.width=b.height=128;let S=b.getContext("2d"),A=S.createRadialGradient(64,64,4,64,64,64);A.addColorStop(0,"rgba(60,50,40,0.35)"),A.addColorStop(1,"rgba(60,50,40,0)"),S.fillStyle=A,S.fillRect(0,0,128,128);let R=new Ut(new Ji(7,3),new Xi({map:new dr(b),transparent:!0,depthWrite:!1}));R.rotation.x=-Math.PI/2,R.position.y=-2.93,a.add(R);let I=-.55,O=.22,D=.35,L=0,P=!0,F=!1,G=0,z=0;a.rotation.set(O,I,0);function V(){let B=e.clientWidth||600,N=Math.round(Math.max(300,Math.min(520,B*.62)));t.setPixelRatio(Math.min(2.5,window.devicePixelRatio||1)),t.setSize(B,N,!0),r.aspect=B/N,r.position.z=B<500?11.5:9.2,r.updateProjectionMatrix(),U()}function U(){g.rotation.z=L;for(let B=0;B<6;B++){let N=Math.sin(L-B*Math.PI/3);m[B].emissiveIntensity=P?Math.pow(Math.abs(N),2)*.9:0}a.rotation.set(O,I,0),t.render(s,r)}function H(B){G=0;let N=Math.min(.05,(B-z)/1e3||.016);z=B,L+=D*2*Math.PI*N,U(),F&&Zt()&&(G=requestAnimationFrame(H))}function K(){!G&&F&&Zt()?(z=performance.now(),G=requestAnimationFrame(H)):Zt()||U()}new IntersectionObserver(B=>{F=B[0].isIntersecting,K()},{rootMargin:"100px"}).observe(n),na(()=>K()),new ResizeObserver(V).observe(e);let ce=null;n.style.touchAction="pan-y",n.style.cursor="grab",n.addEventListener("pointerdown",B=>{ce=[B.clientX,B.clientY,I,O],n.setPointerCapture(B.pointerId),n.style.cursor="grabbing"}),n.addEventListener("pointermove",B=>{ce&&(I=ce[2]+(B.clientX-ce[0])*.008,O=Math.max(-1.1,Math.min(1.1,ce[3]+(B.clientY-ce[1])*.006)),Zt()||U())});let Z=()=>{ce=null,n.style.cursor="grab"};n.addEventListener("pointerup",Z),n.addEventListener("pointercancel",Z);let Y=tt(i);Ie(Y,{label:"Rotor speed (slowed)",min:0,max:1.5,step:.01,value:D,color:v.north,fmt:B=>B.toFixed(2)+" rev/s",oninput:B=>{D=B,Zt()||U()}}),rt(Y,{options:[{label:"Show induced voltage",value:!0},{label:"Plain",value:!1}],value:!0,onchange:B=>{P=B,U()}}),V()}var ki=273.15,Gr=i=>Ot(v.cold,v.hot,Ae(i,0,1));function Zd(i){let e={Th:540,Tc:30,s:0,blade:0},t=new Qe(i,{label:"A steam power-plant cycle beside a chart of maximum efficiency against steam temperature",height:o=>o<620?640:Math.max(330,Math.min(400,o*.46)),animated:!0,step(o){e.s=(e.s+o*.12)%1,e.blade+=o*9},draw(o,a,d){let c=a<620,p=c?{x:16,y:16,w:a-32,h:300}:{x:10,y:20,w:a*.44,h:d-40},{x:u,y:h}=p,f=p.w,y=p.h,m={x:u+f*.06,y:h+y*.55,w:f*.26,h:y*.36},g={x:u+f*.36,y:h+y*.16},M={x:u+f*.66,y:h+y*.16},_={x:u+f*.7,y:h+y*.42,w:f*.24,h:y*.3},x={x:u+f*.55,y:h+y*.86},T=[[m.x+m.w*.5,m.y],[m.x+m.w*.5,g.y],[g.x,g.y],[M.x,M.y],[_.x+_.w*.5,M.y],[_.x+_.w*.5,_.y],[_.x+_.w*.5,_.y+_.h],[_.x+_.w*.5,x.y],[x.x,x.y],[m.x+m.w*.8,x.y],[m.x+m.w*.8,m.y+m.h],[m.x+m.w*.5,m.y+m.h*.4],[m.x+m.w*.5,m.y]],w=Ae((e.Th-100)/600,.25,1),E=[w,w,w,.35,.33,.3,.05,.05,.07,.08,.1,.6,w];o.save(),o.lineCap="round",o.lineJoin="round";for(let U=0;U<T.length-1;U++){if(U===2||U>=5&&U<=5)continue;let H=o.createLinearGradient(T[U][0],T[U][1],T[U+1][0],T[U+1][1]);H.addColorStop(0,se(Gr(E[U]),.55)),H.addColorStop(1,se(Gr(E[U+1]),.55)),o.strokeStyle=H,o.lineWidth=9,o.beginPath(),o.moveTo(...T[U]),o.lineTo(...T[U+1]),o.stroke()}o.restore(),He(o,m.x,m.y,m.w,m.h,10),o.fillStyle="#efe7da",o.fill(),o.strokeStyle="#d6cbb8",o.stroke();for(let U=0;U<5;U++){let H=m.x+m.w*(.15+U*.17),K=m.y+m.h-8,ce=m.h*(.32+.12*Math.sin(e.blade*.7+U*1.7))*(.6+w*.5);o.beginPath(),o.moveTo(H-7,K),o.quadraticCurveTo(H-4,K-ce*.6,H,K-ce),o.quadraticCurveTo(H+4,K-ce*.6,H+7,K),o.closePath(),o.fillStyle=se(Ot("#f2b134","#e0503a",.5+.5*Math.sin(U)),.8),o.fill()}X(o,"boiler",m.x+m.w/2,m.y-8,{size:11.5,color:v.ink2,align:"center",weight:550});let b=16,S=46;o.beginPath(),o.moveTo(g.x,g.y-b),o.lineTo(M.x,M.y-S),o.lineTo(M.x,M.y+S),o.lineTo(g.x,g.y+b),o.closePath();let A=o.createLinearGradient(g.x,0,M.x,0);A.addColorStop(0,St(Gr(w),.55)),A.addColorStop(1,St(Gr(.35),.6)),o.fillStyle=A,o.fill(),o.strokeStyle="#b9b0a0",o.stroke(),o.save(),o.clip();for(let U=0;U<14;U++){let H=g.x+(U/14+e.blade*.02)%1*(M.x-g.x),K=Xt(b,S,(H-g.x)/(M.x-g.x));Me(o,H,g.y-K,H+6,g.y+K,se(v.ink2,.35),1.5)}o.restore(),X(o,"turbine",(g.x+M.x)/2,g.y-S-8,{size:11.5,color:v.ink2,align:"center",weight:550}),Me(o,M.x,M.y,M.x+10,M.y,v.ink3,3),He(o,_.x,_.y,_.w,_.h,10),o.fillStyle="#e3edf3",o.fill(),o.strokeStyle="#c1d3de",o.stroke();for(let U=0;U<4;U++){let H=_.y+_.h*(.25+U*.17);o.beginPath();for(let K=0;K<=20;K++){let ce=_.x+8+K/20*(_.w-16);o.lineTo(ce,H+Math.sin(K*.9+e.blade*.5)*2.5)}o.strokeStyle=se(v.cold,.6),o.lineWidth=1.6,o.stroke()}X(o,"condenser",_.x+_.w/2,_.y+_.h+16,{size:11.5,color:v.ink2,align:"center",weight:550}),X(o,"\u2192 waste heat "+Math.round(100-n().ca)+"%",_.x+_.w/2+8,_.y+_.h+32,{size:10.5,color:v.cold,align:"left",weight:600}),Ce(o,x.x,x.y,11,"#fff",v.ink3,1.5),o.save(),o.translate(x.x,x.y),o.rotate(e.blade*.6),Me(o,-7,0,7,0,v.ink3,2),Me(o,0,-7,0,7,v.ink3,2),o.restore(),X(o,"pump",x.x,x.y+26,{size:11,color:v.ink3,align:"center"});let R=[],I=0;for(let U=0;U<T.length-1;U++){let H=Math.hypot(T[U+1][0]-T[U][0],T[U+1][1]-T[U][1]);R.push(H),I+=H}for(let U=0;U<34;U++){let H=(U/34+e.s)%1*I,K=0;for(;K<R.length-1&&H>R[K];)H-=R[K],K++;let ce=R[K]?H/R[K]:0,Z=Xt(T[K][0],T[K+1][0],ce),Y=Xt(T[K][1],T[K+1][1],ce),B=Xt(E[K],E[K+1],ce),N=K<=5;Ce(o,Z,Y,N?3.4:2.6,Gr(B),"#fff",1)}X(o,Math.round(e.Th)+" \xB0C steam",g.x-6,g.y+b+18,{size:11.5,color:v.hot,weight:600,align:"center"}),X(o,Math.round(e.Tc)+" \xB0C",_.x+_.w+2,_.y-6,{size:11.5,color:v.cold,weight:600,align:"right"});let O=c?{l:52,r:a-20,t:p.y+p.h+50,b:d-40}:{l:u+f+64,r:a-18,t:36,b:d-44},D=dt(o,{box:O,x0:100,x1:700,y0:0,y1:75,xticks:[100,200,300,400,500,600,700],yticks:[0,25,50,75],xfmt:U=>U+"\xB0",yfmt:U=>U+"%",ylabel:"efficiency",xlabel:"steam temperature, \xB0C"}),{sx:L,sy:P}=D;o.fillStyle=se(v.coal,.08),o.fillRect(L(538),O.t,L(600)-L(538),O.b-O.t),X(o,"1960s plateau",(L(538)+L(600))/2,O.b-30,{size:10.5,color:v.ink3,align:"center"}),X(o,"538\u2013600 \xB0C",(L(538)+L(600))/2,O.b-16,{size:10.5,color:v.ink3,align:"center"});let F=e.Tc+ki,G=[],z=[];for(let U=100;U<=700;U+=5)G.push([L(U),P(100*(1-F/(U+ki)))]),z.push([L(U),P(100*(1-Math.sqrt(F/(U+ki))))]);$e(o,G,v.ink2,1.5,[5,4]),$e(o,z,v.hot,2.2),X(o,"Carnot limit",L(112),P(100*(1-F/(112+ki)))-12,{size:11,color:v.ink2,align:"left",halo:!0}),X(o,"practical estimate",L(400),P(100*(1-Math.sqrt(F/(400+ki))))+18,{size:11,color:v.hot,align:"left",halo:!0}),Ce(o,L(315),P(1e-9+100*(1-Math.sqrt(F/(315+ki)))),0,null),Me(o,L(315),O.b,L(315),O.b-8,v.ink3,1.5),X(o,"1920s \u2248315\xB0",L(315),O.b-12,{size:10.5,color:v.ink3,align:"center"}),Ce(o,L(540),P(35),4.5,v.coal,"#fff",1.5),X(o,"1970s US subcritical \u224835%",L(540)-8,P(35)+4,{size:10.5,color:v.coal,align:"right",halo:!0}),Ce(o,L(610),P(45),4.5,v.coal,"#fff",1.5),X(o,"modern ultra-supercritical >45%",L(610)-8,P(45)-10,{size:10.5,color:v.coal,align:"right",halo:!0});let V=n();Me(o,L(e.Th),O.t,L(e.Th),O.b,se(v.hot,.35),1),Ce(o,L(e.Th),P(V.carnot),5,"#fff",v.ink2,2),Ce(o,L(e.Th),P(V.ca),6,v.hot,"#fff",2)}});function n(){let o=e.Tc+ki,a=e.Th+ki;return{carnot:100*(1-o/a),ca:100*(1-Math.sqrt(o/a))}}let s=tt(i),r=ct(i),l=()=>{let o=n();r.innerHTML=`Carnot ceiling <b>${o.carnot.toFixed(0)}%</b>; a realistic plant gets closer to <b>${o.ca.toFixed(0)}%</b> \u2014 so each MWh of electricity costs about <b>${(100/o.ca).toFixed(1)} MWh</b> of fuel heat.`,t.invalidate()};Ie(s,{label:"Steam temperature",min:150,max:700,step:5,value:e.Th,color:v.hot,fmt:o=>o+" \xB0C",oninput:o=>{e.Th=o,l()},name:"th"}),Ie(s,{label:"Cooling water",min:5,max:50,step:1,value:e.Tc,color:v.cold,fmt:o=>o+" \xB0C",oninput:o=>{e.Tc=o,l()}}),l()}function Kd(i){let n=Math.PI*130*130/4,s=4,r=.45,l=h=>h<3||h>25?0:Math.min(s,.5*1.225*n*h*h*h*r/1e6),o=h=>.5*1.225*n*h*h*h/1e6,a={v:9,rot:0,streaks:Array.from({length:40},()=>[Math.random(),Math.random()])},d=new Qe(i,{label:"A wind turbine beside its power curve: output rises with the cube of wind speed until it hits its rated power",height:h=>h<600?620:Math.max(320,Math.min(400,h*.46)),animated:!0,step(h){let f=a.v<3||a.v>25?0:Math.min(a.v,11)*.11;a.rot+=f*h*2;for(let y of a.streaks)y[0]+=h*a.v*.035,y[0]>1&&(y[0]-=1,y[1]=Math.random())},draw(h,f,y){let m=f<600,g=m?{x:0,y:0,w:f,h:300}:{x:0,y:0,w:f*.4,h:y};for(let[R,I]of a.streaks){let O=g.x+R*g.w,D=g.y+20+I*(g.h-70);Me(h,O,D,O+10+a.v*1.6,D,se(v.wind,.35),1.5)}let M=g.x+g.w*.5,_=g.y+g.h*.38,x=Math.min(g.h*.32,g.w*.36);h.beginPath(),h.moveTo(M-4,_),h.lineTo(M+4,_),h.lineTo(M+8,g.y+g.h-22),h.lineTo(M-8,g.y+g.h-22),h.closePath(),h.fillStyle="#e8e3da",h.fill(),h.strokeStyle="#cfc7b8",h.stroke(),Me(h,g.x+10,g.y+g.h-22,g.x+g.w-10,g.y+g.h-22,v.grid2,1.5);for(let R=0;R<3;R++){let I=a.rot+R*2*Math.PI/3;h.save(),h.translate(M,_),h.rotate(I),h.beginPath(),h.moveTo(0,-4),h.quadraticCurveTo(x*.25,-9,x,-1.5),h.lineTo(x,1.5),h.quadraticCurveTo(x*.3,6,0,4),h.closePath(),h.fillStyle="#f7f5f0",h.fill(),h.strokeStyle="#bdb4a3",h.lineWidth=1,h.stroke(),h.restore()}Ce(h,M,_,7,"#efebe3","#bdb4a3",1),X(h,"130 m rotor",M,g.y+g.h-6,{size:11,color:v.ink3,align:"center"});let T=m?{l:52,r:f-20,t:g.h+40,b:y-40}:{l:g.w+60,r:f-20,t:32,b:y-42},{sx:w,sy:E}=dt(h,{box:T,x0:0,x1:28,y0:0,y1:10,xticks:[0,5,10,15,20,25],yticks:[0,2,4,6,8,10],xfmt:R=>R,yfmt:R=>R+" MW",ylabel:"power",xlabel:"wind speed, m/s"}),b=[],S=[],A=[];for(let R=0;R<=28;R+=.1)b.push([w(R),E(Math.min(11,o(R)))]),S.push([w(R),E(Math.min(11,o(R)*16/27))]),A.push([w(R),E(l(R))]);h.save(),h.beginPath(),h.rect(T.l,T.t-4,T.r-T.l,T.b-T.t+4),h.clip(),$e(h,b,v.ink3,1.5,[5,4]),$e(h,S,se(v.wind,.6),1.5,[2,3]),h.beginPath(),h.moveTo(w(0),E(0)),A.forEach(([R,I])=>h.lineTo(R,I)),h.lineTo(w(28),E(0)),h.closePath(),h.fillStyle=se(v.wind,.14),h.fill(),$e(h,A,v.wind,2.5),h.restore(),X(h,"power in the wind \u221D v\xB3",w(7.4),E(9.2),{size:11,color:v.ink3,align:"right",halo:!0}),X(h,"Betz limit (59%)",w(9.6),E(6.6),{size:11,color:v.wind,align:"left",halo:!0}),X(h,"turbine output",w(19),E(s)-8,{size:11.5,color:v.wind,weight:600,align:"center"}),X(h,"cut-out",w(25)+6,E(s*.25),{size:10.5,color:v.ink3,align:"left",halo:!0}),Me(h,w(a.v),T.t,w(a.v),T.b,se(v.wind,.35),1),Ce(h,w(a.v),E(Math.min(10.4,o(a.v))),4,"#fff",v.ink3,1.5),Ce(h,w(a.v),E(l(a.v)),6,v.wind,"#fff",2)}}),c=tt(i),p=ct(i),u=()=>{let h=o(a.v),f=l(a.v);p.innerHTML=`The wind crossing the rotor carries <b>${h.toFixed(1)} MW</b>; the turbine delivers <b>${f.toFixed(2)} MW</b>${a.v>25?" \u2014 it has feathered its blades to protect itself":a.v<3?" \u2014 too little wind to bother":f>=s-1e-6?" \u2014 capped at its rated power":""}.`,d.invalidate()};Ie(c,{label:"Wind speed",min:0,max:28,step:.5,value:a.v,color:v.wind,fmt:h=>h.toFixed(1)+" m/s",oninput:h=>{a.v=h,u()},name:"v"}),u()}function jd(i){let e={a:.2,s:0},t=Array.from({length:70},(a,d)=>({u:Math.random(),r:d%14/13*2-1,inside:d<56})),n=new Qe(i,{label:"A stream tube of air slowing down and widening as it passes a turbine rotor, with the fraction of power extracted",height:a=>a<600?560:Math.max(260,Math.min(320,a*.36)),animated:!0,step(a){for(let d of t)d.u+=a*.12*s(d.u,d.inside),d.u>1&&(d.u-=1)},draw(a,d,c){let p=d<600,u=p?{x:10,y:10,w:d-20,h:260}:{x:10,y:10,w:d*.62,h:c-20},h=u.x+u.w*.5,f=u.y+u.h/2,y=u.h*.25,m=e.a,g=y*Math.sqrt(1-m),M=y*Math.sqrt((1-m)/Math.max(.02,1-2*m)),_=S=>y*Math.sqrt((1-m)/Math.max(.03,s(S,!0))),x=S=>u.x+S*u.w;a.beginPath();for(let S=0;S<=100;S++){let A=S/100;a.lineTo(x(A),f-_(A))}for(let S=100;S>=0;S--){let A=S/100;a.lineTo(x(A),f+_(A))}a.closePath(),a.fillStyle=se(v.wind,.1),a.fill(),a.strokeStyle=se(v.wind,.5),a.lineWidth=1.2,a.stroke();for(let S of t){let A=S.inside?f+S.r*_(S.u)*.92:f+Math.sign(S.r||1)*(y*1.6+Math.abs(S.r)*u.h*.15),R=s(S.u,S.inside);Me(a,x(S.u)-10*R,A,x(S.u),A,se(v.wind,S.inside?.9:.35),2)}He(a,h-4,f-y,8,2*y,4),a.fillStyle=se(v.ink2,.75),a.fill(),X(a,"rotor",h,f-y-8,{size:11.5,color:v.ink2,align:"center",weight:550}),X(a,"wind in: v",u.x+4,f-g-10,{size:11,color:v.ink3}),X(a,"wake: "+(1-2*m).toFixed(2)+" v",u.x+u.w-4,Math.max(u.y+14,f-M-10),{size:11,color:v.ink3,align:"right",halo:!0});let T=p?{l:50,r:d-20,t:u.h+50,b:c-40}:{l:u.x+u.w+56,r:d-16,t:30,b:c-42},{sx:w,sy:E}=dt(a,{box:T,x0:0,x1:.5,y0:0,y1:.65,xticks:[0,.1,.2,.3,.4,.5],yticks:[0,.2,.4,.6],xfmt:S=>Math.round(S*100)+"%",yfmt:S=>Math.round(S*100)+"%",ylabel:"share of wind power captured",xlabel:"slow-down at rotor"}),b=[];for(let S=0;S<=.5;S+=.005)b.push([w(S),E(4*S*(1-S)*(1-S))]);$e(a,b,v.wind,2.4),Me(a,T.l,E(16/27),T.r,E(16/27),v.ink3,1,[4,4]),X(a,"Betz: 16/27 \u2248 59.3%",T.r,E(16/27)-6,{size:11,color:v.ink3,align:"right"}),Ce(a,w(m),E(4*m*(1-m)*(1-m)),6,v.wind,"#fff",2)}});function s(a,d){if(!d)return 1;let c=(a-.5)*6;return 1-e.a*(1+Math.tanh(c*.9))}let r=tt(i),l=ct(i),o=()=>{let a=4*e.a*(1-e.a)**2;l.innerHTML=`Slowing the air by ${(e.a*100).toFixed(0)}% at the rotor captures <b>${(a*100).toFixed(1)}%</b> of the wind\u2019s power. Brake it harder and air simply goes around.`,n.invalidate()};Ie(r,{label:"How hard the rotor brakes the air",min:0,max:.48,step:.005,value:e.a,color:v.wind,fmt:a=>(a*100).toFixed(0)+"%",oninput:a=>{e.a=a,o()}}),o()}var Vn=52.5*Math.PI/180,Gs=35*Math.PI/180,Qd="Berlin, 52.5\xB0 N",Yd=[["Berlin",52.5],["Delhi",28.6],["Lahore",31.5],["Riyadh",24.7],["Houston",29.8],["Nairobi",-1.3],["Atacama",-22.5],["Sydney",-33.9]];function Jd(i,e){Vn=e*Math.PI/180;let t=Math.max(5,Math.min(35,Math.abs(e)*.75));Gs=Math.sign(e||1)*t*Math.PI/180,Qd=`${i}, ${Math.abs(e)}\xB0 ${e>=0?"N":"S"}`}function ol(i,e){let t=23.44*Math.PI/180*Math.sin(2*Math.PI*(284+i)/365),n=(e-12)*15*Math.PI/180,s=Math.sin(Vn)*Math.sin(t)+Math.cos(Vn)*Math.cos(t)*Math.cos(n),r=Math.asin(s),l=Math.sin(t)*Math.sin(Vn-Gs)+Math.cos(t)*Math.cos(Vn-Gs)*Math.cos(n),o=0;if(r>.01){let d=1/Math.max(.05,s),c=1353*Math.pow(.7,Math.pow(d,.678)),p=.1*c;o=(c*Math.max(0,l)+p*(1+Math.cos(Gs))/2)/1e3*.85}let a=Math.atan2(Math.sin(n),Math.cos(n)*Math.sin(Vn)-Math.tan(t)*Math.cos(Vn));return{el:r,az:a,out:Math.min(1.05,o),H:n}}function oh(i,e){let t=0;for(let n=0;n<24;n+=.25)t+=ol(i,n).out*.25;return t*(1-.72*e)}function ef(i){let e={hour:13,day:172,cloud:0,cfYear:0},t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=new Qe(i,{label:"The sun crossing the sky over a solar panel at a chosen location, with the panel output through the day",height:a=>a<600?600:Math.max(330,Math.min(400,a*.46)),draw(a,d,c){let p=d<600,u=p?{x:0,y:0,w:d,h:280}:{x:0,y:0,w:d*.46,h:c},h=ol(e.day,e.hour),f=u.y+u.h*.72,y=Ae(h.el/(Math.PI/3),-.3,1),m=a.createLinearGradient(0,u.y,0,f),g=Ot("#cfdbe6","#a9c8e3",Ae(y,0,1)),M="#e9d6c6";m.addColorStop(0,y>0?g:"#c8cbd6"),m.addColorStop(1,y>.15?St(g,.5):M),He(a,u.x+8,u.y+8,u.w-16,f-u.y-8,12),a.fillStyle=m,a.fill();let _=u.x+u.w/2,x=Math.min(u.w*.42,(f-u.y)*.95),T=Vn<0?-1:1,w=(P,F)=>[_+T*Math.sin(F)*Math.cos(P)*x,f-Math.sin(P)*x];a.save(),a.beginPath(),a.rect(u.x+8,u.y+8,u.w-16,f-u.y-8),a.clip(),a.beginPath();let E=!0;for(let P=0;P<=24;P+=.1){let F=ol(e.day,P);if(F.el<-.05){E=!0;continue}let[G,z]=w(F.el,F.az);E?a.moveTo(G,z):a.lineTo(G,z),E=!1}if(a.strokeStyle=se("#ffffff",.9),a.setLineDash([3,5]),a.lineWidth=1.5,a.stroke(),a.setLineDash([]),h.el>-.05){let[P,F]=w(h.el,h.az),G=a.createRadialGradient(P,F,2,P,F,40);G.addColorStop(0,se("#ffe08a",.9)),G.addColorStop(1,se("#ffe08a",0)),a.fillStyle=G,a.beginPath(),a.arc(P,F,40,0,7),a.fill(),Ce(a,P,F,11,"#ffd34d","#f0b429",1.5)}if(e.cloud>.02)for(let P=0;P<Math.round(e.cloud*7);P++){let F=u.x+30+P*97%(u.w-60),G=u.y+30+P*53%70;a.fillStyle=se("#ffffff",.75),[[0,0,18],[16,4,14],[-16,5,13],[6,-8,13]].forEach(([z,V,U])=>{a.beginPath(),a.arc(F+z,G+V,U,0,7),a.fill()})}a.restore(),He(a,u.x+8,f,u.w-16,u.y+u.h-f-8,12),a.fillStyle="#e6e0d2",a.fill();let b=_,S=f+4;a.save(),a.translate(b,S),Me(a,0,0,0,-10,v.ink3,3),a.rotate(-Math.abs(Gs)*.9);let A=Ae(h.out*(1-.72*e.cloud),0,1);He(a,-46,-16,92,10,2),a.fillStyle=Ot("#33475e","#7fb0d8",A*.8),a.fill();for(let P=1;P<6;P++)Me(a,-46+P*15.3,-16,-46+P*15.3,-6,se("#ffffff",.35),1);a.restore(),X(a,Vn<0?"N":"S",_,f+26,{size:10.5,color:v.ink3,align:"center"}),X(a,Vn<0?"W":"E",u.x+22,f+26,{size:10.5,color:v.ink3}),X(a,Vn<0?"E":"W",u.x+u.w-22,f+26,{size:10.5,color:v.ink3,align:"right"}),X(a,`${Qd} \xB7 panel facing the equator, tilted ${Math.round(Math.abs(Gs)*180/Math.PI)}\xB0`,_,u.y+u.h-16,{size:10.5,color:v.ink3,align:"center"});let R=p?{l:52,r:d-20,t:u.h+36,b:c-40}:{l:u.w+56,r:d-18,t:32,b:c-42},{sx:I,sy:O}=dt(a,{box:R,x0:0,x1:24,y0:0,y1:1,xticks:[0,4,8,12,16,20,24],yticks:[0,.25,.5,.75,1],xfmt:P=>P+":00",yfmt:P=>Math.round(P*100)+"%",ylabel:"output, % of rated",xlabel:"solar time"}),D=[];for(let P=0;P<=24;P+=.1)D.push([I(P),O(ol(e.day,P).out*(1-.72*e.cloud))]);a.beginPath(),a.moveTo(I(0),O(0)),D.forEach(([P,F])=>a.lineTo(P,F)),a.lineTo(I(24),O(0)),a.closePath(),a.fillStyle=se(v.solar,.22),a.fill(),$e(a,D,v.solar,2.4);let L=oh(e.day,e.cloud);Me(a,R.l,O(L/24),R.r,O(L/24),v.ink3,1,[4,4]),X(a,"same energy spread flat: "+Math.round(L/24*100)+"%",R.r,O(L/24)-6,{size:11,color:v.ink3,align:"right",halo:!0}),Me(a,I(e.hour),R.t,I(e.hour),R.b,se(v.solar,.5),1),Ce(a,I(e.hour),O(h.out*(1-.72*e.cloud)),6,v.solar,"#fff",2)}}),s=tt(i),r=ct(i),l=a=>{let d=0;for(let c=1;c<=365;c+=2)d+=oh(c,a);return d*2/(365*24)},o=()=>{let a=oh(e.day,e.cloud);r.innerHTML=`This day: <b>${a.toFixed(1)} kWh per kW</b> of panels, a capacity factor of <b>${(a/24*100).toFixed(0)}%</b>. Over a whole year with this sky: about <b>${(l(e.cloud)*100).toFixed(0)}%</b>.`,n.invalidate()};Jd("Berlin",52.5),rt(s,{label:"Location",options:Yd.map(([a,d])=>({label:a,value:a,name:"loc-"+a.toLowerCase()})),value:"Berlin",onchange:a=>{let d=Yd.find(c=>c[0]===a);Jd(d[0],d[1]),o()}}),Ie(s,{label:"Time of day",min:0,max:24,step:.1,value:e.hour,color:v.solar,fmt:a=>`${Math.floor(a)}:${String(Math.round(a%1*60)%60).padStart(2,"0")}`,oninput:a=>{e.hour=a,o()}}),Ie(s,{label:"Day of year",min:1,max:365,step:1,value:e.day,color:v.solar,fmt:a=>{let d=new Date(2026,0,a);return d.getDate()+" "+t[d.getMonth()]},oninput:a=>{e.day=a,o()}}),Ie(s,{label:"Cloudiness",min:0,max:1,step:.01,value:e.cloud,color:v.ink3,fmt:a=>a<.05?"clear":Math.round(a*100)+"%",oninput:a=>{e.cloud=a,o()}}),o()}var gn="#c98a55",Ws=[v.phaseA,v.phaseB,v.phaseC],tf=["A","B","C"];function ll(i,e,t,n,s){Ce(i,e,t,n+18,"#e9e5dc",null),Ce(i,e,t,n+2,v.paper,null),i.save(),i.strokeStyle="#cfc8ba",i.lineWidth=1,i.beginPath(),i.arc(e,t,n+18,0,7),i.stroke(),i.restore();for(let r of s){let l=e+Math.cos(r.a)*(n+6),o=t+Math.sin(r.a)*(n+6);i.save(),i.translate(l,o),i.rotate(r.a),He(i,-8,-15,16,30,5),i.fillStyle=r.col||gn,i.fill(),i.restore();let a=Math.abs(r.e||0);if(a>.06){Ce(i,l,o,6.5,"#fff");let d=se(v.ink,.35+.65*Math.min(1,a));r.e>0?Ce(i,l,o,2.6,d):(Me(i,l-3.5,o-3.5,l+3.5,o+3.5,d,2),Me(i,l+3.5,o-3.5,l-3.5,o+3.5,d,2))}}}function cl(i,e,t,n,s,r=1,l=!1){for(let o=0;o<2*r;o++){let a=s+(o-.5)*Math.PI/r,d=a+Math.PI/r;i.beginPath(),i.moveTo(e,t),i.arc(e,t,n,a,d),i.closePath();let c=o%2===0?v.north:v.south,p=i.createRadialGradient(e,t,n*.2,e,t,n);p.addColorStop(0,St(c,.35)),p.addColorStop(1,c),i.fillStyle=p,i.fill();let u=(a+d)/2;X(i,o%2===0?"N":"S",e+Math.cos(u)*n*.68,t+Math.sin(u)*n*.68+4.5,{size:13,color:"#fff",weight:650,align:"center"})}if(Ce(i,e,t,n*.16,"#ddd6c8","#bfb6a5",1),l){let o=e+Math.cos(s)*n*.92,a=t+Math.sin(s)*n*.92;Ce(i,o,a,9,"#fff",v.ink,2),X(i,"\u27F3",o,a+4,{size:11,color:v.ink,align:"center",weight:700})}}function lh(i,e,t,n,s,r,l){for(let o=0;o<s;o++){let a=t+(n-t)*(o+.5)/s;i.beginPath(),i.ellipse(e,a,l*.9,Math.max(1.5,(n-t)/s*.32),0,0,Math.PI*2),i.strokeStyle=r,i.lineWidth=s>20?1.4:2.6,i.stroke()}}var hl=[.4,10,20,110,220,380,765];function uy(i,e,t,n,s){let r=[[0,46,18],[20,70,22],[46,38,16],[66,58,20],[90,30,14]];for(let[l,o,a]of r){let d=e+l*n/104,c=a*n/104;i.fillStyle="#d8d1c3",i.fillRect(d,t-o,c,o);for(let p=0;p<Math.floor(o/10);p++)for(let u=0;u<Math.floor(c/7);u++){let h=(p*7+u*13+l)%10/10<s;i.fillStyle=h?"#f4c84f":"#bfb7a8",i.fillRect(d+2+u*7,t-o+4+p*10,3.5,5)}}}function dy(i,e,t){i.fillStyle="#d8d1c3",i.fillRect(e,t-40,50,40),i.beginPath(),i.moveTo(e+56,t),i.quadraticCurveTo(e+62,t-30,e+58,t-62),i.lineTo(e+84,t-62),i.quadraticCurveTo(e+80,t-30,e+86,t),i.closePath(),i.fillStyle="#e4ded2",i.fill(),i.strokeStyle="#cbc3b4",i.stroke()}function nf(i){let e={vi:5,km:300,MW:1e3,flow:0},t=.03,n=()=>{let a=hl[e.vi]*1e3,d=e.MW*1e6,c=t*e.km,p=d/(Math.sqrt(3)*a),u=d*d*c/(a*a);return{V:a,I:p,loss:u/1e6,frac:u/d}},s=new Qe(i,{label:"A power station sending electricity over a long line to a city; the line heats up and wastes power at low voltage",height:a=>Math.max(280,Math.min(340,a*.4)),animated:!0,step(a){let d=n();e.flow+=a*Ae(Math.log10(d.I+1)-1.5,.2,4)*.25},draw(a,d,c){let p=n(),u=c*.66;Me(a,10,u,d-10,u,v.grid2,1.5),dy(a,18,u);let h=Ae(1-p.frac,0,1);uy(a,d-128,u,110,h);let f=120,y=d-140,m=Math.max(3,Math.round((y-f)/120)),g=[];for(let R=0;R<=m;R++)g.push(f+(y-f)*R/m);let M=70;for(let R of g)a.strokeStyle="#a69e8f",a.lineWidth=1.5,a.beginPath(),a.moveTo(R-10,u),a.lineTo(R,u-M),a.lineTo(R+10,u),a.moveTo(R-16,u-M+12),a.lineTo(R+16,u-M+12),a.moveTo(R-7,u-25),a.lineTo(R+7,u-25),a.stroke();let _=Ae(Math.sqrt(p.frac*2.5),0,1),x=Ot("#7b7468","#e8552c",_);for(let R of[-M+12,-M+12,-M+22])for(let I=0;I<g.length-1;I++){let O=g[I],D=g[I+1],L=12+_*10,P=(R===-M+22,0);a.beginPath(),a.moveTo(O+(R===-M+22,0),u+R),a.quadraticCurveTo((O+D)/2,u+R+L*2,D,u+R),a.strokeStyle=x,a.lineWidth=1.6+_*1.5,a.stroke(),_>.2&&(a.strokeStyle=se("#ff8a4a",_*.25),a.lineWidth=8,a.stroke())}let T=Ae(Math.round(Math.log10(p.I)*6),4,30);for(let R=0;R<T;R++){let I=(R/T+e.flow)%1,O=f+I*(y-f),D=Math.min(g.length-2,Math.floor(I*m)),L=I*m-D,P=12+_*10,F=u-M+12+2*L*(1-L)*P*2*.5*2;Ce(a,O,F,2.6,v.electron)}X(a,hl[e.vi]+" kV",(f+y)/2,u-M-10,{size:13,color:v.ink,weight:650,align:"center"}),X(a,e.km+" km",(f+y)/2,u+18,{size:11,color:v.ink3,align:"center"});let w=40,E=d-80,b=c-40,S=16,A=Ae(p.frac,0,1);He(a,w,b,E,S,8),a.fillStyle="#ece8df",a.fill(),a.save(),He(a,w,b,E,S,8),a.clip(),a.fillStyle=se(v.storage,.8),a.fillRect(w,b,E*(1-A),S),a.fillStyle=se(v.hot,.85),a.fillRect(w+E*(1-A),b,E*A,S),a.restore(),X(a,p.frac>=1?"nothing arrives: all lost as heat \u2014 the line would melt long before this":`arrives: ${((1-A)*100).toFixed(1)}%`,w,b-6,{size:11.5,color:p.frac>=1?v.hot:v.storage,weight:600}),p.frac<1&&X(a,`lost as heat: ${(A*100).toFixed(A<.01?2:1)}%`,w+E,b-6,{size:11.5,color:v.hot,weight:600,align:"right"})}}),r=tt(i),l=ct(i),o=()=>{let a=n();l.innerHTML=`Current in each wire: <b>${a.I>=1e3?(a.I/1e3).toFixed(1)+" kA":a.I.toFixed(0)+" A"}</b>. Heat lost: <b>${a.loss>=1e4?"\u221E":a.loss.toFixed(a.loss<10?1:0)} MW</b> of the ${e.MW} MW sent. Losses fall with the <i>square</i> of voltage.`,s.invalidate()};Ie(r,{label:"Line voltage",min:0,max:hl.length-1,step:1,value:e.vi,color:v.network,fmt:a=>hl[a]+" kV",oninput:a=>{e.vi=a,o()},name:"kv"}),Ie(r,{label:"Distance",min:10,max:800,step:10,value:e.km,color:v.ink2,fmt:a=>a+" km",oninput:a=>{e.km=a,o()}}),Ie(r,{label:"Power sent",min:50,max:2e3,step:50,value:e.MW,color:v.storage,fmt:a=>a+" MW",oninput:a=>{e.MW=a,o()}}),o()}function sf(i){let e={ratio:18.095238095238095,ph:0,ang:0},t=21,n=500,s=new Qe(i,{label:"The generator from section 2 feeds a transformer: two coils on an iron core. The ratio of turns sets how voltage and current trade off",height:a=>a<560?560:Math.max(320,Math.min(380,a*.44)),animated:!0,step(a){e.ph+=a*2*Math.PI*.5,e.ang=e.ph},draw(a,d,c){let p=d<560,u=p?34:40,h=u+26,f=p?128:c*.4,y=Math.sin(e.ang);ll(a,h,f,u,[{a:Math.PI,col:gn,e:y},{a:0,col:gn,e:-y}]),cl(a,h,f,u*.78,e.ang,1),X(a,"generator",h,f+u+34,{size:11,color:v.ink3,align:"center"});let m=p?22:26,g=h+u+46,M=p?d-g-16:d*.42-g+70,_=p?220:Math.min(c-90,230),x=f-_/2;He(a,g,x,M,_,14),a.fillStyle="#c9c2b4",a.fill(),He(a,g+m,x+m,M-2*m,_-2*m,6),a.fillStyle=v.paper,a.fill();let T=Math.cos(e.ph),w=2*(M-m)+2*(_-m);for(let V=0;V<26;V++){let U=((V/26+Math.sin(e.ph)*.06)%1+1)%1*w,H=M-m,K=_-m,ce,Z,Y=g+m/2,B=x+m/2;U<H?(ce=Y+U,Z=B):(U-=H)<K?(ce=Y+H,Z=B+U):(U-=K)<H?(ce=Y+H-U,Z=B+K):(U-=H,ce=Y,Z=B+K-U),Ce(a,ce,Z,2.2,se(v.nuclear,.25+.6*Math.abs(T)))}let E=g+m/2,b=g+M-m/2;Me(a,h,f-u-18,h,x-10,gn,2),Me(a,h,x-10,E,x-10,gn,2),Me(a,E,x-10,E,x+m+4,gn,2),Me(a,h,f+u+18,h,x+_+10,gn,2),Me(a,h,x+_+10,E,x+_+10,gn,2),Me(a,E,x+_+10,E,x+_-m-4,gn,2);let S=6,A=Ae(Math.round(6*e.ratio/6),1,36);lh(a,E,x+m+4,x+_-m-4,S,gn,m),lh(a,b,x+m+4,x+_-m-4,A,"#b4703d",m),Me(a,b,x+m+4,b,x-10,"#b4703d",2),Me(a,b,x-10,b+(p?10:30),x-10,"#b4703d",2),X(a,"to the grid",b+(p?0:30),Math.max(12,x-16),{size:11,color:v.ink3,align:"right"}),X(a,`${S*10} turns`,E,x+_+28,{size:11,color:v.ink2,align:"center"}),X(a,`${Math.round(S*10*e.ratio)} turns`,b,x+_+28,{size:11,color:v.ink2,align:"center"});let R=t*e.ratio,I=n/(Math.sqrt(3)*t),O=I/e.ratio,D=[["voltage","kV",v.field,t,R],["current","kA",v.electron,I,O]],L=p?16:g+M+70,P=p?d-32:d-L-20,F=p?x+_+46:20,G=p?(c-F-16)/2:(c-30)/2,z=V=>V<10?V.toFixed(2):V.toFixed(0);D.forEach(([V,U,H,K,ce],Z)=>{let Y=F+Z*G+G/2+8,B=Math.max(K,ce),N=G*.32;Me(a,L,Y,L+P,Y,v.grid2,1);for(let[q,re,ae]of[[K,se(H,.45),2],[ce,H,2.2]]){let he=N*q/B,xe=[];for(let ne=0;ne<=120;ne++)xe.push([L+ne/120*P,Y-Math.sin(e.ph-ne/120*4*Math.PI)*he]);$e(a,xe,re,ae)}X(a,V,L,Y-G/2+4,{size:11,color:v.ink3}),X(a,`in ${z(K)} ${U}`,L+P-92,Y-G/2+4,{size:11.5,color:se(H,.75),align:"right",weight:600}),X(a,`out ${z(ce)} ${U}`,L+P,Y-G/2+4,{size:11.5,color:H,align:"right",weight:700})})}}),r=tt(i),l=ct(i),o=()=>{let a=t*e.ratio,d=n/(Math.sqrt(3)*t),c=d/e.ratio;l.innerHTML=`${n} MW goes in at ${t} kV and <b>${d.toFixed(1)} kA</b>; it comes out at <b>${a.toFixed(0)} kV</b> and <b>${(c*1e3).toFixed(0)} A</b>. Voltage \xD7 current is unchanged, minus a fraction of a percent of heat in a good transformer.`,s.invalidate()};Ie(r,{label:"Turns ratio (grid : generator)",min:.2,max:20,step:"any",value:e.ratio,color:"#b4703d",fmt:a=>a.toFixed(1)+" : 1",oninput:a=>{e.ratio=a,o()}}),o()}var Wr=50,ul=300,ch=[49,48.8,48.6,48.4,48.2],hh={inertia:"#8d7b6a",relief:"#b9b1a3",fcr:v.freq,afrr:v.storage,shed:v.peaker};function rf(i){let e={},t=[{tech:"nuclear",label:"Nuclear"},{tech:"lignite",label:"Lignite"},{tech:"coal",label:"Hard coal"},{tech:"gas",label:"Gas"},{tech:"hydro",label:"Hydro"},{tech:"gas",label:"Gas"}];function n(){Object.assign(e,{df:0,fcr:0,afrr:0,shed:0,stages:0,lost:0,dload:0,t:0,acc:0,hist:[],events:[],blackout:!1,theta:t.map((f,y)=>y*.7),tripped:t.map(()=>!1),needle:0})}n(),Object.assign(e,{H:4.5,fcrOn:!0,afrrOn:!0,speed:2});let s=240;function r(f){if(e.blackout)return;let y=ul+e.dload-e.shed,m=-y*.01*e.df,g=y-m,_=ul-e.lost+e.fcr+e.afrr-g,x=Math.max(50,ul-e.lost),T=e.H*x;e.df+=Wr*_/(2*T)*f;let w=e.fcrOn?Ae(-15*e.df,-3,3):0;e.fcr+=(w-e.fcr)*Math.min(1,f/7),e.afrrOn?e.afrr=Ae(e.afrr+(-.02*18*e.df-0*e.afrr)*f,-15,15):e.afrr=vi(e.afrr,0,.05,f);let E=Wr+e.df;for(;e.stages<ch.length&&E<ch[e.stages];)e.shed+=.05*ul,e.events.push({t:e.t,label:`load shed ${ch[e.stages].toFixed(1)} Hz`,col:v.peaker}),e.stages++;E<47.5&&(e.blackout=!0,e.events.push({t:e.t,label:"blackout",col:v.ink})),e.t+=f;let b=-_;e.last={inertia:b,relief:m,fcr:e.fcr,afrr:e.afrr,shed:e.shed}}function l(f){let y=Math.ceil(f/.02);for(let m=0;m<y;m++)r(f/y),e.acc+=f/y,e.acc>=.25&&(e.acc-=.25,e.hist.push({t:e.t,f:Wr+e.df,...e.last}),e.hist.length>s*4+8&&e.hist.shift());for(let m=0;m<t.length;m++)e.tripped[m]||(e.theta[m]+=2*Math.PI*e.df*f*3)}e.last={inertia:0,relief:0,fcr:0,afrr:0,shed:0};let o=new Qe(i,{label:"Simulation of grid frequency: a frequency gauge, a row of synchronised generators viewed under a 50 Hz strobe, a frequency trace and a chart of which reserves cover a lost power plant",height:f=>f<640?830:Math.max(500,Math.min(540,f*.56)),animated:!0,step(f){l(f*e.speed),e.needle=vi(e.needle,e.df,12,f)},draw(f,y,m){let g=y<640,M=Wr+e.df,_=g?Math.min(y*.3,112):Math.min(120,y*.15),x=g?y/2:_+40,T=_+30,w=48.5,E=51.5,b=ue=>Math.PI+(Ae(ue,w,E)-w)/(E-w)*Math.PI,S=(ue,we,$,ze)=>{f.beginPath(),f.arc(x,T,_,b(ue),b(we)),f.strokeStyle=$,f.lineWidth=ze,f.stroke()};f.save(),f.lineCap="butt",S(w,E,"#ebe7df",16),S(49,49.8,se(v.solar,.55),16),S(50.2,51,se(v.solar,.55),16),S(w,49,se(v.peaker,.6),16),S(51,E,se(v.peaker,.6),16),S(49.8,50.2,se(v.storage,.6),16),f.restore();for(let ue=48.5;ue<=51.5+1e-9;ue+=.5){let we=b(ue);Me(f,x+Math.cos(we)*(_-12),T+Math.sin(we)*(_-12),x+Math.cos(we)*(_+10),T+Math.sin(we)*(_+10),v.ink3,1),X(f,ue.toFixed(1),x+Math.cos(we)*(_+24),T+Math.sin(we)*(_+24)+4,{size:10.5,color:v.ink3,align:"center"})}let A=b(Wr+e.needle);f.save(),f.lineCap="round",Me(f,x,T,x+Math.cos(A)*(_-6),T+Math.sin(A)*(_-6),v.ink,3),f.restore(),Ce(f,x,T,7,v.ink),X(f,M.toFixed(3)+" Hz",x,T+34,{size:20,color:Math.abs(e.df)>1?v.peaker:Math.abs(e.df)>.2?"#b07a12":v.ink,weight:650,align:"center"}),X(f,e.blackout?"system collapsed":Math.abs(e.df)<.02?"balanced":e.df<0?"demand > supply: slowing":"supply > demand: speeding up",x,T+54,{size:11.5,color:v.ink3,align:"center"});let R=Math.round(Ae(e.H/6,0,1)*6),I=g?20:x+_+60,O=g?y-40:y-I-16,D=g?T+80:26,L=g?3:6,P=g?2:1,F=O/L,G=Math.min(F*.32,g?27:34);X(f,g?"Generators under a 50 Hz strobe":"Synchronised generators, seen under a strobe flashing 50 times a second",I,D+2,{size:11.5,color:v.ink3,weight:500}),t.forEach((ue,we)=>{let $=I+F*(we%L+.5),ze=D+26+G+Math.floor(we/L)*(G*2+52),Ye=we<R,W=v[ue.tech];if(Ye){let C=e.tripped[we];Ce(f,$,ze,G+5,C?"#ece9e3":St(W,.75));let ee=f.createRadialGradient($-G*.3,ze-G*.3,2,$,ze,G);if(ee.addColorStop(0,C?"#ddd":St(W,.35)),ee.addColorStop(1,C?"#c9c5bd":W),Ce(f,$,ze,G,ee),C)Me(f,$-G*.5,ze-G*.5,$+G*.5,ze+G*.5,v.peaker,3),Me(f,$+G*.5,ze-G*.5,$-G*.5,ze+G*.5,v.peaker,3);else{let ie=e.theta[we];for(let pe=0;pe<2;pe++){let Ee=ie+pe*Math.PI;Me(f,$+Math.cos(Ee)*G*.2,ze+Math.sin(Ee)*G*.2,$+Math.cos(Ee)*G*.92,ze+Math.sin(Ee)*G*.92,"#fff",3)}Ce(f,$+Math.cos(ie)*G*.7,ze+Math.sin(ie)*G*.7,3.5,v.ink)}if(Ce(f,$,ze,4,"#efebe4",v.ink3,1),X(f,ue.label,$,ze+G+18,{size:11,color:C?v.ink3:v.ink2,align:"center",weight:550}),!C&&e.fcrOn&&Math.abs(e.fcr)>.05){let ie=e.fcr>0,pe=ze-G-10;qn(f,$+G+4,ie?pe+12:pe,$+G+4,ie?pe:pe+12,se(v.freq,Ae(Math.abs(e.fcr)/3,.25,1)),2,6)}}else{He(f,$-G,ze-G*.7,G*2,G*1.4,8),f.fillStyle=e.tripped[we]?"#e7e3db":St(v.solar,.7),f.fill(),f.strokeStyle=se(v.solar,.8),f.stroke(),f.beginPath();for(let C=0;C<=30;C++){let ee=$-G*.7+C/30*G*1.4;f.lineTo(ee,ze-Math.sin(C/30*Math.PI*2)*G*.3)}f.strokeStyle=v.ink2,f.lineWidth=1.5,f.stroke(),X(f,"inverter",$,ze+G+16,{size:11,color:v.ink2,align:"center"}),at(f,"wind / solar / battery",10)<F-6&&X(f,"wind / solar / battery",$,ze+G+30,{size:10,color:v.ink3,align:"center"})}});let z=e.t,V=Math.max(0,z-s),U=g?{l:52,r:y-16,t:D+26+2*(2*G+52)+34,b:0}:{l:I+36,r:y-18,t:D+G*2+96,b:0};g?U.b=U.t+(m-U.t-20)*.48:U.b=Math.max(U.t+140,T+84);let H=e.hist.filter(ue=>ue.t>=V),K=Math.min(49.7,...H.map(ue=>ue.f))-.05,ce=Math.max(50.3,...H.map(ue=>ue.f))+.05,Z=[],Y=ce-K>1.2?.5:.2;for(let ue=Math.ceil(K/Y)*Y;ue<=ce;ue+=Y)Z.push(+ue.toFixed(2));let B=dt(f,{box:U,x0:V,x1:V+s,y0:K,y1:ce,yticks:Z,xticks:[],yfmt:ue=>ue.toFixed(1),ylabel:"frequency, Hz"});for(let[ue,we]of[[49.8,v.solar],[50.2,v.solar],[49,v.peaker]])ue>K&&ue<ce&&Me(f,U.l,B.sy(ue),U.r,B.sy(ue),se(we,.7),1,[3,4]);49.8>K&&X(f,"\xB1200 mHz: reserves fully deployed",U.r,B.sy(49.8)+13,{size:10.5,color:"#a77a10",align:"right"}),49>K&&X(f,"49.0 Hz: automatic load shedding begins",U.r,B.sy(49)+13,{size:10.5,color:v.peaker,align:"right"}),$e(f,H.map(ue=>[B.sx(ue.t),B.sy(ue.f)]),v.freq,2.2);let N=-1e9,q=0;for(let ue of e.events)if(ue.t>=V){let we=B.sx(ue.t);q=we-N<110?q+1:0,N=we,Me(f,we,U.t,we,U.b,se(ue.col,.5),1),X(f,ue.label,we+4,U.t+12+q*14,{size:10.5,color:ue.col,weight:600,halo:!0})}let re=[["inertia","spinning mass"],["relief","load self-regulation"],["fcr","primary reserve (FCR)"],["afrr","secondary reserve (aFRR)"],["shed","load shedding"]],ae=re.reduce((ue,[,we])=>ue+26+at(f,we,10.5)*1.05,0),he=g?U.l:56,xe=g||he+130+ae>y-8,ne={l:he,r:U.r,t:U.b+(xe?74:40),b:m-30},fe=Math.max(3.5,...H.map(ue=>Math.abs(ue.inertia)+Math.abs(ue.relief)+Math.abs(ue.fcr)+Math.abs(ue.afrr)+ue.shed))*1.1,me=dt(f,{box:ne,x0:V,x1:V+s,y0:-fe*.25,y1:fe,xticks:[],yfmt:ue=>ue.toFixed(0)+" GW",ylabel:"who covers the gap",ny:3}),ye=["inertia","relief","fcr","afrr","shed"];if(H.length>1){let ue=H.map(()=>0);for(let we of ye){let $=H.map((ze,Ye)=>ue[Ye]+Math.max(0,ze[we]));f.beginPath(),H.forEach((ze,Ye)=>{let W=me.sx(ze.t),C=me.sy($[Ye]);Ye?f.lineTo(W,C):f.moveTo(W,C)});for(let ze=H.length-1;ze>=0;ze--)f.lineTo(me.sx(H[ze].t),me.sy(ue[ze]));f.closePath(),f.fillStyle=se(hh[we],.75),f.fill(),ue=$}}let Q=ne.r-at(f,`simulated time ${a(e.t)} \xB7 ${e.speed}\xD7 speed`,10.5)-8;for(let ue=Math.ceil(V/60)*60;ue<=V+s&&me.sx(ue)+20<Q;ue+=60)X(f,(ue/60).toFixed(0)+" min",me.sx(ue),ne.b+16,{size:10.5,color:v.ink3,align:"center"});let _e=ne.l+130,Te=ne.t-9;if(xe){let ue=g?2:3;re.forEach(([we,$],ze)=>{let Ye=ne.l-30+ze%ue*(ne.r-ne.l+30)/ue,W=ne.t-54+Math.floor(ze/ue)*13;He(f,Ye,W-8,9,9,2),f.fillStyle=hh[we],f.fill(),X(f,$,Ye+12,W,{size:9.5,color:v.ink2})})}else for(let[ue,we]of re)He(f,_e,Te-8,10,10,2),f.fillStyle=hh[ue],f.fill(),X(f,we,_e+14,Te+1,{size:10.5,color:v.ink2}),_e+=26+f.measureText(we).width*1.05;X(f,`simulated time ${a(e.t)} \xB7 ${e.speed}\xD7 speed`,ne.r,m-6,{size:10.5,color:v.ink3,align:"right"})}});function a(f){let y=Math.floor(f/60),m=Math.floor(f%60);return`${y}:${String(m).padStart(2,"0")}`}function d(f,y){if(e.blackout)return;e.lost+=f;let m=e.tripped.findIndex((g,M)=>!g&&M<Math.round(Ae(e.H/6,0,1)*6));m>=0&&(e.tripped[m]=!0),e.events.push({t:e.t,label:y,col:v.ink}),Zt()||l(1),o.invalidate()}let c=tt(i),p=document.createElement("div");p.className="ctl btnrow",c.appendChild(p),zt(p,"Trip a 1 GW plant",()=>d(1,"\u22121 GW"),{kind:"danger",name:"trip1"}),zt(p,"Trip 3 GW <small>(design incident)</small>",()=>d(3,"\u22123 GW"),{kind:"danger",name:"trip3"}),zt(p,"Lose 15 GW",()=>d(15,"\u221215 GW"),{kind:"danger",name:"trip15"}),zt(p,"Reset",()=>{n(),h.set(0),o.invalidate()},{kind:"ghost",name:"reset"});let u=ln(c,"More: inertia and reserves");Ie(u,{label:"System inertia H",min:1,max:8,step:.1,value:e.H,color:v.lignite,fmt:f=>f.toFixed(1)+" s",oninput:f=>{e.H=f,o.invalidate()},name:"H"});let h=Ie(u,{label:"Extra demand <small>(drag)</small>",min:-6,max:6,step:.1,value:0,color:v.demand,fmt:f=>(f>0?"+":"")+f.toFixed(1)+" GW",oninput:f=>{e.dload=f,o.invalidate()},name:"demand"});if(rt(u,{label:"Primary reserve",options:[{label:"on",value:!0},{label:"off",value:!1}],value:!0,onchange:f=>{e.fcrOn=f},color:v.freq}),rt(u,{label:"Secondary reserve",options:[{label:"on",value:!0},{label:"off",value:!1}],value:!0,onchange:f=>{e.afrrOn=f},color:v.storage}),rt(u,{label:"Speed",options:[{label:"1\xD7",value:1},{label:"2\xD7",value:2},{label:"8\xD7",value:8}],value:2,onchange:f=>{e.speed=f}}),typeof IntersectionObserver<"u"){let f=new IntersectionObserver(y=>{y.some(m=>m.isIntersecting)&&(f.disconnect(),setTimeout(()=>{Zt()&&!e.events.length&&!e.blackout&&d(1,"\u22121 GW")},1500))},{threshold:.6});f.observe(i)}i.__sim={st:e,trip:d,advance:l,fig:o}}var Vt={legacy:{name:"Wind & solar on fixed tariffs",short:"Subsidised VRE",color:v.solar},mustrun:{name:"Must-run CHP / biomass",short:"Must-run",color:v.mustrun},hydro:{name:"Hydro (run-of-river)",short:"Hydro",color:v.hydro},wind:{name:"Wind",short:"Wind",color:v.wind},solar:{name:"Solar",short:"Solar",color:v.solar},nuclear:{name:"Nuclear",short:"Nuclear",color:v.nuclear},lignite:{name:"Lignite",short:"Lignite",color:v.lignite},coal:{name:"Hard coal",short:"Hard coal",color:v.coal},gas:{name:"Gas combined-cycle",short:"Gas CCGT",color:v.gas},peaker:{name:"Gas & oil peakers",short:"Peakers",color:v.peaker},imports:{name:"Imports",short:"Imports",color:v.imports},storage:{name:"Battery discharge",short:"Battery",color:v.storage},scarcity:{name:"Demand response / scarcity",short:"Scarcity",color:"#6b5f5a"}},fy={lignite:.4,coal:.34,gas:.2,oil:.27},py=[["nuclear",2,.33,"uranium",4],["nuclear",2,.33,"uranium",5],["nuclear",2,.33,"uranium",6],["nuclear",2,.33,"uranium",7],["lignite",2.5,.41,"lignite",4],["lignite",2.5,.39,"lignite",4],["lignite",2.5,.37,"lignite",4],["lignite",2.5,.35,"lignite",4],["lignite",2,.33,"lignite",4],["coal",2,.45,"coal",3],["coal",2,.43,"coal",3],["coal",2.5,.41,"coal",3],["coal",2.5,.39,"coal",3],["coal",2,.36,"coal",3],["gas",3,.6,"gas",2],["gas",3,.58,"gas",2],["gas",3,.56,"gas",2],["gas",3,.53,"gas",2],["gas",3,.5,"gas",2],["gas",3,.46,"gas",2],["peaker",2,.39,"gas",5],["peaker",2,.35,"gas",5],["peaker",2,.32,"gas",6],["peaker",1.5,.33,"oil",6]],my={gas:35,co2:75,lignite:6,coal:12,oil:50,uranium:3};function gy(i={}){let e={...my,...i},t=e.scale||{};return py.map(([n,s,r,l,o],a)=>{let d=s*(t[n]??1),p=e[l]/r,u=(fy[l]||0)*e.co2/r;return{id:n+a,tech:n,cap:d,eff:r,fuel:l,fuelCost:p,co2Cost:u,vom:o,price:p+u+o}})}function dl(i){let e=[],t=(i.wind||0)+(i.solar||0),n=t*(i.legacyShare??0),s=t>0?(i.wind||0)/t:.5;n>0&&(e.push({id:"legacyW",tech:"wind",cap:n*s,price:-60,legacy:!0}),e.push({id:"legacyS",tech:"solar",cap:n*(1-s),price:-60,legacy:!0})),i.mustrun&&e.push({id:"mustrun",tech:"mustrun",cap:i.mustrun,price:i.inflexible?-90:-20}),i.hydro&&e.push({id:"hydro",tech:"hydro",cap:i.hydro,price:i.inflexible?-80:1}),i.wind&&e.push({id:"wind",tech:"wind",cap:i.wind*(1-(i.legacyShare??0)),price:0}),i.solar&&e.push({id:"solar",tech:"solar",cap:i.solar*(1-(i.legacyShare??0)),price:0});for(let r of gy({gas:i.gas,co2:i.co2,...i.coal!=null?{coal:i.coal}:{},...i.scale?{scale:i.scale}:{}}))r.cap<1e-6||i.noNuclear&&r.tech==="nuclear"||e.push({...r});return i.storageOut&&e.push({id:"storage",tech:"storage",cap:i.storageOut,price:-1}),i.imports&&e.push({id:"imports",tech:"imports",cap:i.imports,price:i.importPrice??140}),e.push({id:"scarcity",tech:"scarcity",cap:i.scarcity??3,price:600}),e.filter(r=>r.cap>1e-6).sort((r,l)=>r.price-l.price||(r.id<l.id?-1:1))}var Ft=1e3;function fl(i,e){let t=Array.from(new Set([...i.map(h=>h.price),...e.map(h=>h.price),Ft])).sort((h,f)=>h-f),n=h=>i.reduce((f,y)=>f+(y.price<=h?y.cap:0),0),s=h=>e.reduce((f,y)=>f+(y.price>=h?y.cap:0),0),r=Ft,l=0;for(let h of t)if(n(h)>=s(h)-1e-9){r=h;break}let o=t.filter(h=>h<r),a=Math.min(n(r),s(r));r===Ft&&n(Ft)<s(Ft)&&(l=s(Ft)-n(Ft));let d=a,c={},p=null;for(let h=0;h<i.length;){let f=h;for(;f<i.length&&i[f].price===i[h].price;)f++;let y=i.slice(h,f),m=y.reduce((M,_)=>M+_.cap,0),g=Math.max(0,Math.min(m,d));for(let M of y){let _=m>0?M.cap*g/m:0;M.q=_,_>0&&(c[M.tech]=(c[M.tech]||0)+_,p=M)}d-=g,h=f}let u=a;for(let h of[...e].sort((f,y)=>y.price-f.price))h.q=Math.max(0,Math.min(h.cap,u)),u-=h.q;return{price:r,qty:a,dispatch:c,marginal:p,shortfall:l,below:o}}function uh(i,e="summer",t=!1){let n=e==="winter"?52:44,s=e==="winter"?17:15,r=Math.exp(-Math.pow((i-9.5)/3.2,2)),l=Math.exp(-Math.pow((i-(e==="winter"?18:19.5))/2.4,2)),o=Math.exp(-Math.pow((i-3.5)/3,2)),a=n+s*(.85*r+.95*l)-5*o+(i>11&&i<15?2:0)*Math.exp(-Math.pow((i-13)/2,2));return t&&(a*=.85),a}function dh(i,e="summer"){let t=e==="winter"?8.2:e==="spring"?6.2:5,n=e==="winter"?16:e==="spring"?18.3:21.2;if(i<=t||i>=n)return 0;let s=(i-t)/(n-t);return(e==="winter"?.22:e==="spring"?.62:.72)*Math.pow(Math.sin(Math.PI*s),1.6)}function yy(i,e,t=0){return Math.max(0,e*(1+.12*Math.sin((i+t)/24*2*Math.PI*1.3)+.06*Math.sin(i*2.7+t)))}function Vr(i){let e=i.steps||96,t=[],n=(c,p)=>{let u=(c+.5)*24/e,h=uh(u,i.season,i.weekend)*(i.loadScale??1)+(p.load||0),f=(i.solarCap||0)*dh(u,i.season),y=yy(u,i.windLevel||0,i.seed||0),m=dl({wind:y,solar:f,legacyShare:i.legacyShare??.7,mustrun:i.mustrun??7,hydro:i.hydro??2,inflexible:!0,imports:i.imports??8,importPrice:150,gas:i.gas??35,co2:i.co2??75,storageOut:p.dis||0,noNuclear:i.noNuclear,...i.coal!=null?{coal:i.coal}:{},...i.scale?{scale:i.scale}:{}}),g=[{cap:h,price:Ft},{cap:i.exportGW??10,price:15}];p.ch&&g.push({cap:p.ch,price:500}),i.flexGW&&g.push({cap:i.flexGW,price:30});let M=fl(m,g),_=y+f,x=(M.dispatch.wind||0)+(M.dispatch.solar||0);return{h:u,load:h,solar:f,wind:y,price:M.price,dispatch:M.dispatch,curtail:Math.max(0,_-x),exported:g[1].q,flex:i.flexGW?g[g.length-1].q:0,marginal:M.marginal,shortfall:M.shortfall,ch:p.ch||0,dis:p.dis||0}};for(let c=0;c<e;c++)t.push(n(c,{}));if(i.storageGW>0){let c=i.storageGW*(i.storageH||4),p=24/e,u=Math.max(1,Math.round((i.storageH||4)/p)),h=t.map((g,M)=>M),f=[...h].sort((g,M)=>t[g].price-t[M].price).slice(0,u),y=[...h].sort((g,M)=>t[M].price-t[g].price).filter(g=>!f.includes(g)).slice(0,Math.round(u*.88)),m=h.map(()=>({}));f.forEach(g=>m[g].ch=i.storageGW),y.forEach(g=>m[g].dis=i.storageGW);for(let g=0;g<e;g++)(m[g].ch||m[g].dis)&&(t[g]=n(g,m[g]))}let s=t.reduce((c,p)=>c+p.price,0)/e,r=t.reduce((c,p)=>c+(p.dispatch.solar||0),0),l=t.reduce((c,p)=>c+(p.dispatch.solar||0)*p.price,0),o=r>0?l/r:NaN,a=t.filter(c=>c.price<0).length*24/e,d=t.reduce((c,p)=>c+p.curtail,0)*24/e;return{periods:t,avg:s,capture:o,neg:a,curtail:d,captureRate:o/s}}var pl=null;function _y(i){if(pl)return pl;let e=document.createElement("canvas");e.width=e.height=8;let t=e.getContext("2d");return t.strokeStyle="rgba(255,255,255,0.55)",t.lineWidth=2,t.beginPath(),t.moveTo(-2,10),t.lineTo(10,-2),t.stroke(),pl=i.createPattern(e,"repeat"),pl}var af=1.13,ii={de:{label:"Germany",name:"rg-de",legacy:.6,mustrun:6,hydro:3,coal:13.7,scale:{nuclear:0},set:{D:62,wind:18,solar:8,gas:36,co2:75}},coal:{label:"Coal-heavy (India, China)",name:"rg-coal",legacy:0,mustrun:4,hydro:10,coal:13.7,scale:{nuclear:.5,lignite:.4,coal:3.4,gas:.25,peaker:.5},set:{D:70,wind:8,solar:10,gas:36,co2:0}},gas:{label:"Gas-heavy (Texas, Gulf)",name:"rg-gas",legacy:0,mustrun:2,hydro:0,coal:13.7,scale:{nuclear:.6,lignite:0,coal:.6,gas:2.4,peaker:1.5},set:{D:70,wind:20,solar:10,gas:10.6,co2:0}},hydro:{label:"Hydro-heavy (Brazil, Norway)",name:"rg-hydro",legacy:0,mustrun:3,hydro:38,coal:13.7,scale:{nuclear:.25,lignite:0,coal:.2,gas:.7,peaker:.6},set:{D:60,wind:10,solar:6,gas:36,co2:0}},solar:{label:"Solar-heavy noon (California, Australia)",name:"rg-solar",legacy:0,mustrun:3,hydro:4,coal:13.7,scale:{nuclear:0,lignite:.6,coal:1.4,gas:.8,peaker:.8},set:{D:48,wind:8,solar:40,gas:36,co2:0}}},of=i=>{let e=7;for(let n of i)e=(e*31+n.charCodeAt(0))%9973;let t=Math.sin(e*12.9898)*43758.5453;return t-Math.floor(t)};function ml(i,e={}){let t=e.stage||3,n={D:62,wind:18,solar:8,gas:35,co2:75,rent:!1,hover:null,jump:null,disp:new Map,region:"de",cur:"USD",unsorted:t===1};t===2&&(n.wind=24),e.preset&&Object.assign(n,e.preset);let s=null,r=null,l=()=>n.cur==="USD"?"$":"\u20AC",o=(b,S=0)=>{let A=n.cur==="USD"?b*af:b;return(A<0?"\u2212":"")+l()+Math.abs(A).toFixed(S)},a=160,d=-80,c=300,p=()=>({wind:n.wind,solar:n.solar,legacyShare:t<3?0:ii[n.region].legacy,mustrun:ii[n.region].mustrun,hydro:ii[n.region].hydro,gas:n.gas,co2:n.co2,coal:ii[n.region].coal,scale:ii[n.region].scale,scarcity:4});function u(){let b=dl(p()),S=[{cap:n.D,price:Ft}],A=fl(b,S),R=0,I=n.unsorted?b.filter(D=>D.tech!=="scarcity").sort((D,L)=>of(D.id)-of(L.id)).concat(b.filter(D=>D.tech==="scarcity")):b;for(let D of I)D.x=R,R+=D.cap;let O=b.find(D=>D.id==="wind");return{blocks:b,r:A,total:R,windEnd:O?O.x+O.cap:null}}let h=new Qe(i,{label:"The merit order: power plants stacked from cheapest to most expensive running cost, with a draggable demand line setting the market price",height:b=>t<3?b<600?400:Math.max(360,Math.min(440,b*.48)):b<600?480:Math.max(400,Math.min(470,b*.5)),animated:!0,draw(b,S,A){let{blocks:R,r:I,total:O,windEnd:D}=u();r={blocks:R,r:I,windEnd:D},a=Math.max(Math.ceil((n.D+8)/20)*20,Math.ceil(O*1.04/20)*20);let L={l:58,r:S-16,t:46,b:A-44},P=Math.max(150,...R.filter(N=>N.price<Ft&&N.tech!=="scarcity").map(N=>N.price))*1.12,F=Math.ceil(P/50)*50;n.yTop=n.yTop==null||!Zt()?F:Xt(n.yTop,F,.12),c=n.yTop;let{sx:G,sy:z}=dt(b,{box:L,x0:0,x1:a,y0:d,y1:c,yticks:(()=>{let N=n.cur==="USD"?af:1,q=c*N>380?100:50,re=[];for(let ae=Math.ceil(d*N/q)*q;ae<=c*N;ae+=q)re.push(ae/N);return re})(),xticks:Array.from({length:a/20+1},(N,q)=>q*20),yfmt:N=>o(N,0),xfmt:N=>N,ylabel:S<600?l()+"/MWh":`running cost (SRMC), ${l()}/MWh`,xlabel:"cumulative capacity, GW"});s={box:L,sx:G,sy:z};let V=!Zt();b.save(),b.beginPath(),b.rect(L.l,L.t-40,L.r-L.l,L.b-L.t+40),b.clip();let U=!V&&n.pd!=null&&n.pd<Ft&&I.price<Ft,H=performance.now(),K=Math.min(.25,(H-(n.tE||H))/1e3);n.tE=H,n.pd=U?Math.abs(n.pd-I.price)<.05?I.price:I.price+(n.pd-I.price)*Math.exp(-K*9):I.price;let ce=n.pd;(ce!==I.price||n.pulse>0)&&requestAnimationFrame(()=>h.invalidate());let Z=I.marginal?I.marginal.id:null;Z!==n.lastMarg&&(n.lastMarg!==void 0&&!V&&(n.pulse=1,n.lastP!=null&&I.price<Ft&&Math.abs(I.price-n.lastP)>3&&(n.jump={from:n.lastP,to:I.price,a:1})),n.lastMarg=Z),n.lastP=I.price<Ft?I.price:null;for(let N of R){let q=n.disp.get(N.id);q||(q={x:N.x,p:N.price,c:N.cap},n.disp.set(N.id,q));let re=V?1:.22;q.x=Xt(q.x,N.x,re),q.p=Xt(q.p,N.price,re),q.c=Xt(q.c,N.cap,re);let ae=G(q.x),he=G(q.x+q.c),xe=z(0),ne=z(Math.min(q.p,c+20)),fe=(N.q||0)/N.cap,me=Vt[N.tech].color,ye=I.marginal&&I.marginal.id===N.id,Q=Math.max(Math.abs(q.p)<3?7:2,Math.abs(ne-xe)),_e=Math.abs(q.p)<3?xe-Q:Math.min(xe,ne);if(n.rent&&fe>0&&N.price<ce&&ce<Ft&&(b.fillStyle=se(v.price,.13),b.fillRect(ae,z(ce),(he-ae)*fe,z(Math.max(N.price,d))-z(ce))),b.fillStyle=fe>0?me:St(me,.62),b.fillRect(ae,_e,he-ae,Q),fe>0&&fe<1&&(b.fillStyle=se("#ffffff",.55),b.fillRect(ae+(he-ae)*fe,_e,(he-ae)*(1-fe),Q)),N.legacy&&(b.fillStyle=_y(b),b.fillRect(ae,_e,he-ae,Q)),b.strokeStyle=v.paper,b.lineWidth=1,b.strokeRect(Math.round(ae)+.5,_e,Math.max(0,he-ae-1),Q),ye&&(b.strokeStyle=v.ink,b.lineWidth=2,b.strokeRect(ae,_e,he-ae,Q)),ye&&n.pulse>0){let Te=(1-n.pulse)*14;b.strokeStyle=se(v.price,n.pulse),b.lineWidth=3,b.strokeRect(ae-Te,_e-Te,he-ae+2*Te,Q+2*Te),n.pulse=Math.max(0,n.pulse-K*1.6)}n.hover===N.id&&(b.strokeStyle=se(v.ink,.6),b.lineWidth=1.5,b.strokeRect(ae,_e,he-ae,Q)),N.price>c&&he-ae>26&&X(b,o(N.price,0)+" \u2191",(ae+he)/2,z(c)+12,{size:10,color:"#fff",align:"center",weight:600})}if(b.restore(),n.unsorted){let N=S<600?"Offers in the order they arrived.":"Offers in the order they arrived. Which plants should run?";X(b,N,(L.l+L.r)/2,L.t-18,{size:13,weight:650,color:v.ink,align:"center",halo:!0});return}if(t===2){let N=n.disp.get("wind"),q=G(N?N.x+N.c:0),re=z(0);Me(b,q,re-46,q,re+14,v.wind,2),Ce(b,q,re-46,11,v.wind,"#fff",2),X(b,"\u2194",q,re-42,{size:11,color:"#fff",align:"center",weight:700});let ae="wind "+n.wind.toFixed(0)+" GW",he=at(b,ae,12,650),xe=q+16+he<L.r;X(b,ae,xe?q+16:q-16,re-42,{size:12,weight:650,color:ot(v.wind,.15),halo:!0,align:xe?"left":"right"}),s.windX=q,s.windY=re-46}let Y=G(n.D);Me(b,Y,L.t-26,Y,L.b,v.demand,2),He(b,Y-9,L.t-40,18,18,9),b.fillStyle=v.demand,b.fill(),X(b,"\u2194",Y,L.t-27,{size:11,color:"#fff",align:"center",weight:700});{let N="demand "+n.D.toFixed(0)+" GW",q=at(b,N,12,600),re=Y+14+q<S-4;X(b,N,re?Y+14:Y-14,L.t-27,{size:12,color:v.ink,weight:600,halo:!0,align:re?"left":"right"})}let B=null;if(I.marginal&&ce<Ft){let N=I.marginal,q=n.disp.get(N.id),re=G(q.x+q.c/2),ae=z(Ae(q.p,d,c)),he="sets the price: "+Vt[N.tech].short+(N.eff?` (${Math.round(N.eff*100)}% efficient)`:""),xe=at(b,he,11.5,600),ne=Ae(re-xe/2,L.l+4,L.r-xe-4),fe=L.l+6+at(b,`${o(ce,0)}/MWh`,12,700)+22,me=S<600&&ne<fe;B={label:he,x0:ne,x1:ne+xe,y:ae<L.t+60?ae+40:ae-34,tagBelow:me&&ae>=L.t+60}}if(ce<Ft){let N=z(Ae(ce,d,c));Me(b,L.l,N,Y,N,v.price,2,[6,4]),Ce(b,Y,N,5.5,v.price,"#fff",2);let q=B&&B.tagBelow?N+6:N-14;if(Pn(b,`${o(ce,0)}/MWh`,L.l+6,q,{bg:v.price}),n.jump&&n.jump.a>0){let re=n.jump,ae=z(Ae(re.from,d,c)),he=z(Ae(re.to,d,c)),xe=Y+16,ne=Math.min(1,re.a*1.6);b.globalAlpha=ne,Me(b,L.l,ae,Y,ae,se(v.price,.5),1,[2,3]),qn(b,xe,ae,xe,he,v.price,2);let fe=re.to-re.from,me=(fe>0?"+":"\u2212")+o(Math.abs(fe),0).replace("\u2212","")+" for every MWh",ye=xe+8+at(b,me,12,650)<L.r,Q=at(b,me,12,650),_e=ye?xe+8:xe-24-Q,Te=_e+Q,ue=L.l+6+at(b,`${o(ce,0)}/MWh`,12,700)+22,we=Ye=>B&&Te>B.x0-4&&_e<B.x1+4&&Math.abs(Ye-B.y)<16||_e<ue&&Math.abs(Ye-(q+4))<20||t===2&&s.windX!=null&&Math.abs(Ye-(s.windY+4))<18&&Te>s.windX-140&&_e<s.windX+140||Ye<L.t+4||Ye>L.b-2,$=(ae+he)/2+4,ze=[$,$-18,$+18,N+22,N-52,N+44,$-36,$+36].find(Ye=>!we(Ye))??$;X(b,me,ye?xe+8:xe-24,ze,{size:12,weight:650,color:v.price,halo:!0,align:ye?"left":"right"}),b.globalAlpha=1,re.a=Math.max(0,re.a-(K||.016)*.35),re.a>0&&requestAnimationFrame(()=>h.invalidate())}}else Pn(b,"supply exhausted: scarcity",L.l+6,L.t+4,{bg:v.peaker});if(B&&X(b,B.label,B.x0,B.y,{size:11.5,color:v.ink,weight:600,halo:!0}),n.hover){let N=R.find(q=>q.id===n.hover);if(N){let q=[Vt[N.tech].name+(N.legacy?" (fixed tariff)":""),`${N.cap.toFixed(1)} GW`];N.fuelCost!==void 0?q.push(`fuel ${o(N.fuelCost,0)} + CO\u2082 ${o(N.co2Cost,0)} + O&M ${o(N.vom,0)}`,`= ${o(N.price,0)}/MWh`):q.push(N.price<0?`bids ${o(N.price,0)}/MWh: would rather pay than stop`:`bids \u2248 ${o(N.price,0)}/MWh`);let re=n.disp.get(N.id),ae=Ae(G(re.x+re.c/2)+10,L.l,L.r-210),he=L.t+6;He(b,ae,he,210,18+q.length*16,8),b.fillStyle=se("#ffffff",.96),b.fill(),b.strokeStyle=v.grid2,b.stroke(),q.forEach((xe,ne)=>X(b,xe,ae+10,he+20+ne*16,{size:11.5,color:ne?v.ink2:v.ink,weight:ne?450:600}))}}}}),f=b=>{let S=r&&r.windEnd;S!=null&&(n.wind=Ae(Math.round(n.wind+s.sx.inv(b)-S),0,50),g.wind&&g.wind.set(n.wind),E(),r=u())};h.interact({hit:(b,S)=>!s||n.unsorted?null:t===2&&s.windX!=null&&Math.hypot(b-s.windX,S-s.windY)<22||t===2&&s.windX!=null&&Math.abs(b-s.windX)<12&&S>s.windY&&S<s.box.b+14?"wind":b>s.box.l-6&&b<s.box.r+6&&S>s.box.t-44&&S<s.box.b+6?"demand":null,touchHit:(b,S)=>!s||n.unsorted?null:t===2&&s.windX!=null&&(Math.hypot(b-s.windX,S-s.windY)<26||Math.abs(b-s.windX)<18&&S>s.windY&&S<s.box.b+14)?"wind":Math.abs(b-s.sx(n.D))<22&&S>s.box.t-46&&S<s.box.b+6?"demand":null,cursor:"ew-resize",down:(b,S)=>{b==="demand"&&(n.D=Ae(Math.round(s.sx.inv(S)),20,140),M.set(n.D),E())},move:(b,S)=>{if(b==="wind")return f(S);n.D=Ae(Math.round(s.sx.inv(S)),20,140),M.set(n.D),E()},hover:(b,S,A)=>{if(n.hover=null,!(!s||!r||b==="wind"))for(let R of r.blocks){let I=n.disp.get(R.id);if(!I)continue;let O=s.sx(I.x),D=s.sx(I.x+I.c),L=s.sy(0),P=s.sy(Math.min(I.p,c));if(S>=O&&S<=D&&A>=Math.min(L,P)-2&&A<=Math.max(L,P)+2){n.hover=R.id;break}}}});let y=tt(i),m={"Calm weekday":{D:62,wind:18,solar:8,gas:35,co2:75},"Sunny Sunday noon":{D:44,wind:14,solar:46,gas:35,co2:75},"Windy night":{D:46,wind:42,solar:0,gas:35,co2:75},"Dark, still evening":{D:76,wind:3,solar:0,gas:35,co2:75},"2022-style gas shock":{D:64,wind:12,solar:6,gas:150,co2:85}},g={},M,_;if(t<3){t===1&&rt(y,{label:"Order the offers",options:[{label:"As they arrived",value:!0,name:"ms-arrived"},{label:"Cheapest first",value:!1,name:"ms-sorted"}],value:n.unsorted,onchange:A=>{n.unsorted=A,E()}});let b=ln(y,t===1?"More: set demand with a slider":"More: sliders instead of dragging");M=Ie(b,{label:"Demand",min:20,max:140,step:1,value:n.D,color:v.demand,fmt:A=>A+" GW",oninput:A=>{n.D=A,E()},name:"D",wide:!0}),g.D=M,t===2&&(g.wind=Ie(b,{label:"Wind output",min:0,max:50,step:1,value:n.wind,color:v.wind,fmt:A=>A+" GW",oninput:A=>{n.wind=A,E()},name:"wind"}));let S=ct(i);_=()=>{let{r:A}=u();if(n.unsorted)S.innerHTML="Each block is one plant\u2019s offer: <b>width</b> is how much it can produce, <b>height</b> is what one more MWh costs it to make. In this order the market can\u2019t tell which plants to run. Pick <b>Cheapest first</b>.";else if(A.price>=Ft)S.innerHTML="Demand is beyond everything on offer: <b>scarcity</b>. Drag back to the left.";else if(t===1)S.innerHTML=`Demand <b>${n.D} GW</b> is met by every plant left of the line. The last one needed, <b>${Vt[A.marginal.tech].short}</b>, sets the price: <b>${o(A.price,0)}/MWh</b>, paid to all of them.`;else{let R=fl(dl({...p(),wind:0}),[{cap:n.D,price:Ft}]),I=R.price<Ft?o(R.price,0)+"/MWh":"scarcity";S.innerHTML=`With <b>${n.wind} GW</b> of wind the price is <b>${o(A.price,0)}/MWh</b>, set by <b>${Vt[A.marginal.tech].short}</b>. With no wind it would be <b>${I}</b>${R.marginal&&R.marginal.id!==A.marginal.id?`, set by ${Vt[R.marginal.tech].short}`:""}.`}h.invalidate()},E=_,dn(i,t===1?"pick <b>Cheapest first</b>, then drag (or tap) anywhere on the chart to move the demand line.":'drag the <span class="c-wind">wind</span> handle to the right and watch the whole stack shift, and the price fall.'),E(),i.__sim={st:n,compute:u,set:A=>{Object.assign(n,A);for(let R in g)R in A&&g[R].set(n[R]);E()}};return}g.gas=Ie(y,{label:"Gas price",min:10,max:200,step:1,value:n.gas,color:v.gas,fmt:b=>o(b,0)+" per MWh of gas",oninput:b=>{n.gas=b,E()},name:"gas"}),g.co2=Ie(y,{label:"Carbon price",min:0,max:160,step:1,value:n.co2,color:v.coal,fmt:b=>o(b,0)+"/t",oninput:b=>{n.co2=b,E()},name:"co2"});let x=ln(y,"More: situations, regions, demand, wind and solar"),T=document.createElement("div");T.className="ctl btnrow presets",x.appendChild(T);for(let[b,S]of Object.entries(m))zt(T,b,()=>{Object.assign(n,S);for(let A in g)g[A].set(n[A]);E()},{kind:"chip",name:"preset-"+b});rt(x,{label:"Region (stylised fleet)",options:Object.entries(ii).map(([b,S])=>({label:S.label,value:b,name:S.name})),value:n.region,onchange:b=>{n.region=b,n.disp.clear(),Object.assign(n,ii[b].set);for(let S in g)g[S].set(n[S]);E()}}),g.wind=Ie(x,{label:"Wind output",min:0,max:50,step:1,value:n.wind,color:v.wind,fmt:b=>b+" GW",oninput:b=>{n.wind=b,E()},name:"wind"}),g.solar=Ie(x,{label:"Solar output",min:0,max:50,step:1,value:n.solar,color:v.solar,fmt:b=>b+" GW",oninput:b=>{n.solar=b,E()},name:"solar"}),M=Ie(x,{label:"Demand",min:20,max:140,step:1,value:n.D,color:v.demand,fmt:b=>b+" GW",oninput:b=>{n.D=b,E()},name:"D",wide:!0}),g.D=M,rt(x,{label:"Who profits?",options:[{label:"Hide",value:!1},{label:"Show infra-marginal rent",value:!0}],value:n.rent,onchange:b=>{n.rent=b,E()}});let w=ct(i);function E(){let{blocks:b,r:S}=u(),A=S.price<Ft?S.price*S.qty/1e3:NaN,R=b.reduce((I,O)=>I+(O.q||0)*Math.max(0,O.price),0)/1e3;w.innerHTML=S.price>=Ft?"Demand exceeds everything on offer. The price jumps to the cap and the operator must cut load \u2014 this is <b>scarcity</b>.":`Every MWh this hour clears at <b>${o(S.price,0)}</b>, the running cost of the last plant needed: <b>${Vt[S.marginal.tech].short}</b>. `+(n.rent?`Buyers pay about <b>${o(A,1)} m</b> for the hour; generators\u2019 running costs are about ${o(Math.max(0,R),1)} m. The difference is the <span class="c-price">infra-marginal rent</span> that pays back power plants\u2019 capital.`:"Every cheaper plant is paid the same price."),h.invalidate()}dn(i,'slide <span class="c-gas">gas</span> and carbon and watch the blocks swap places; drag anywhere on the chart to move demand.'),E(),i.__sim={st:n,compute:u,set:b=>{Object.assign(n,b);for(let S in g)S in b&&g[S].set(n[S]);E()}}}var pi={lazard:{"solar-pv-utility":[[2008,359,437],[2009,323,394],[2010,248,394],[2011,150,300],[2012,105,221],[2013,72,160],[2014,59,103],[2015,50,70],[2016,46,61],[2017,43,48],[2018,36,46],[2019,32,44],[2020,29,42],[2021,26,42],[2022,24,96],[2023,24,96],[2024,29,92],[2025,38,78],[2026,40,98]],"wind-onshore":[[2008,101,169],[2009,82,127],[2010,82,127],[2011,70,127],[2012,60,87],[2013,37,81],[2014,37,81],[2015,32,77],[2016,32,62],[2017,30,60],[2018,29,56],[2019,26,54],[2020,26,54],[2021,26,50],[2022,24,75],[2023,24,75],[2024,27,73],[2025,37,86],[2026,37,99]],"gas-ccgt":[[2008,78,106],[2009,79,103],[2010,79,103],[2011,76,115],[2012,65,100],[2013,61,87],[2014,61,87],[2015,52,78],[2016,48,78],[2017,42,78],[2018,41,74],[2019,44,68],[2020,44,73],[2021,45,74],[2022,39,101],[2023,39,101],[2024,45,108],[2025,48,109],[2026,51,129]],coal:[[2008,94,145],[2009,91,143],[2010,91,143],[2011,89,142],[2012,89,142],[2013,65,150],[2014,66,151],[2015,65,150],[2016,57,148],[2017,60,143],[2018,60,143],[2019,66,152],[2020,65,159],[2021,65,159],[2022,68,166],[2023,68,166],[2024,69,168],[2025,71,173],[2026,72,177]],nuclear:[[2008,97,115],[2009,104,115],[2010,104,115],[2011,97,115],[2012,97,115],[2013,92,132],[2014,92,132],[2015,97,136],[2016,97,136],[2017,112,189],[2018,112,189],[2019,118,192],[2020,129,198],[2021,131,204],[2022,141,221],[2023,141,221],[2024,142,222],[2025,141,220],[2026,175,255]],"wind-offshore":[[2015,177,234],[2016,131,232],[2017,103,201],[2018,89,142],[2019,86,132],[2020,83,152],[2021,83,150],[2022,83,190],[2023,72,140],[2024,74,139],[2025,70,157],[2026,105,167]],"gas-peaker":[[2015,179,230],[2016,151,198],[2017,151,198],[2018,160,261],[2019,151,198],[2020,151,198],[2021,121,188],[2022,115,221],[2023,115,221],[2024,110,228],[2025,149,251],[2026,144,276]]},lazardLcos:[{year:2025,config:"utility_100MW_4h",low:115,high:254},{year:2025,config:"utility_100MW_2h",low:129,high:277},{year:2026,config:"utility_100MW_4h",low:210,high:292},{year:2026,config:"utility_100MW_2h",low:215,high:414}],bdew:[[2015,8.3,6.3,15,29.6],[2016,7.5,6.6,15.7,29.8],[2017,6.6,7.6,16.2,30.4],[2018,7,7.3,16.1,30.4],[2019,7.8,7.3,16.1,31.2],[2020,8.3,7.7,16.3,32.3],[2021,8.6,7.7,16.5,32.8],[2022,24.1,8,14.2,46.3],[2023,25.1,9.3,12.6,47],[2024,17,11.4,11.7,40.1],[2025,16,10.9,12.7,39.6],[2026,15.2,9.2,12.6,37]],emberAnnual:[[2015,31.76],[2016,28.96],[2017,34.64],[2018,43.46],[2019,37.81],[2020,30.37],[2021,97.27],[2022,235.53],[2023,95.39],[2024,77.75],[2025,89.72],[2026,107.61]],emberMonthly:[["2015-01",29.94],["2015-02",36.69],["2015-03",31.3],["2015-04",29.78],["2015-05",25.33],["2015-06",30.11],["2015-07",34.98],["2015-08",31.61],["2015-09",31.89],["2015-10",39.37],["2015-11",32.38],["2015-12",27.79],["2016-01",29.03],["2016-02",22],["2016-03",24.3],["2016-04",24.21],["2016-05",22.55],["2016-06",27.7],["2016-07",27.18],["2016-08",27.18],["2016-09",30.51],["2016-10",37.14],["2016-11",38.21],["2016-12",37.47],["2017-01",52.41],["2017-02",39.68],["2017-03",31.69],["2017-04",28.72],["2017-05",30.61],["2017-06",30],["2017-07",33.01],["2017-08",30.86],["2017-09",34.3],["2017-10",28.29],["2017-11",40.38],["2017-12",35.71],["2018-01",29.5],["2018-02",40.12],["2018-03",37.36],["2018-04",36.33],["2018-05",37.18],["2018-06",41.55],["2018-07",45.14],["2018-08",48.46],["2018-09",47.76],["2018-10",53.22],["2018-11",56.86],["2018-12",48.08],["2019-01",49.95],["2019-02",43.01],["2019-03",30.7],["2019-04",37.54],["2019-05",38.09],["2019-06",32.87],["2019-07",39.49],["2019-08",36.65],["2019-09",35.36],["2019-10",37.22],["2019-11",40.96],["2019-12",31.93],["2020-01",34.61],["2020-02",21.69],["2020-03",22.47],["2020-04",17.51],["2020-05",17.75],["2020-06",26],["2020-07",30.37],["2020-08",34.4],["2020-09",43.65],["2020-10",34.05],["2020-11",38.22],["2020-12",43.75],["2021-01",53.31],["2021-02",48.98],["2021-03",46.68],["2021-04",54.73],["2021-05",53.49],["2021-06",73.87],["2021-07",81.5],["2021-08",82.18],["2021-09",128.98],["2021-10",142.22],["2021-11",176.28],["2021-12",225.08],["2022-01",167.81],["2022-02",129.86],["2022-03",252.07],["2022-04",168.78],["2022-05",177.04],["2022-06",218.17],["2022-07",317.03],["2022-08",463.59],["2022-09",352.81],["2022-10",155.3],["2022-11",173.2],["2022-12",250.71],["2023-01",117.22],["2023-02",127.81],["2023-03",101.23],["2023-04",102.14],["2023-05",82.03],["2023-06",93.9],["2023-07",78.12],["2023-08",94.35],["2023-09",100.81],["2023-10",87.1],["2023-11",90.9],["2023-12",69.08],["2024-01",76.23],["2024-02",61.23],["2024-03",63.18],["2024-04",61.96],["2024-05",67.53],["2024-06",72.88],["2024-07",68.4],["2024-08",81.76],["2024-09",78.55],["2024-10",83.98],["2024-11",111.61],["2024-12",105.65],["2025-01",114.19],["2025-02",129.35],["2025-03",94.06],["2025-04",77.4],["2025-05",66.74],["2025-06",64.14],["2025-07",87.55],["2025-08",77.8],["2025-09",84.28],["2025-10",84.49],["2025-11",102.99],["2025-12",93.67],["2026-01",109.73],["2026-02",96.69],["2026-03",99.44],["2026-04",80.53],["2026-05",95.56],["2026-06",111.13],["2026-07",106.79],["2026-08",126.14],["2026-09",142.47]],owidWorld:{solar:[[2010,407.7],[2011,343.8],[2012,259.8],[2013,202.6],[2014,180.8],[2015,133.7],[2016,117.4],[2017,93.6],[2018,79.2],[2019,68.5],[2020,60.8],[2021,54.3],[2022,50.5],[2023,42.6],[2024,43],[2025,43.5]],onshore:[[1984,369],[1985,342.6],[1986,304.1],[1987,295],[1988,243.3],[1989,225],[1990,239.2],[1991,229.5],[1992,229.9],[1993,241.9],[1994,227.8],[1995,238.2],[1996,212.7],[1997,186.1],[1998,174.5],[1999,171.8],[2e3,183.9],[2001,161.4],[2002,149.2],[2003,130.7],[2004,132.9],[2005,124.5],[2006,128.1],[2007,116.6],[2008,122.8],[2009,120.4],[2010,113.6],[2011,107.7],[2012,98.8],[2013,99],[2014,87.6],[2015,76],[2016,69.8],[2017,64.8],[2018,55.6],[2019,49.3],[2020,40.9],[2021,36.1],[2022,34],[2023,33.1],[2024,34.3],[2025,32.9]],offshore:[[2e3,190.4],[2001,180.1],[2002,152.6],[2003,140.7],[2004,199.6],[2005,167.9],[2006,165.4],[2007,236.6],[2008,239.3],[2009,220.1],[2010,208.4],[2011,221.2],[2012,188.8],[2013,155.3],[2014,196.7],[2015,157.3],[2016,129.9],[2017,118.6],[2018,115],[2019,94.3],[2020,92.2],[2021,81.6],[2022,80.7],[2023,76.7],[2024,80.7],[2025,77.9]]}};var an=Object.freeze({2015:1.109512890625,2016:1.1069031128405,2017:1.1296811764706,2018:1.1809545098039,2019:1.1194745098039,2020:1.1421961089494,2021:1.1827403100775,2022:1.0530486381323,2023:1.081268627451,2024:1.08238046875,2025:1.1299831372549,2026:1.159679797979798}),vy="USD",OM=Object.freeze({source:"European Central Bank",series:"EXR.A.USD.EUR.SP00.A",title:"US dollar/Euro ECB reference exchange rate, annual average",url:"https://data.ecb.europa.eu/data/datasets/EXR/EXR.A.USD.EUR.SP00.A",fetched:"2026-10-10",ytd2026:Object.freeze({series:"EXR.D.USD.EUR.SP00.A",from:"2026-01-02",to:"2026-10-09",n:198,sumUsdPerEur:229.6166})}),by=Object.keys(an).map(Number).sort((i,e)=>i-e);var BM=Object.freeze(Object.fromEntries(by.map(i=>{let e=an[i];return[i,Object.freeze({usdPerEur:e,eurPerUsd:1/e})]})));var fh=new WeakMap;function My(i,e,t){let n=i&&i.querySelector("figcaption");if(!n)return!1;fh.has(n)||fh.set(n,n.innerHTML);let s=fh.get(n);return n.innerHTML=e==="USD"?gl(s,"USD",t,!1,!0):s,!0}function mi(i,e,t="cur",{caption:n=an[2025]}={}){let s=i.closest("figure");if(n){let r=0,l=()=>{!My(s,"USD",n)&&r++<120&&requestAnimationFrame(l)};requestAnimationFrame(l)}return{get value(){return"USD"},set(){}}}function gl(i,e,t=an[2025],n=!1,s=!1){if(e!=="USD"||typeof i!="string")return i;let r=l=>{let o=(l.split(".")[1]||"").length,a=parseFloat(l.replace(/,/g,""))*t;if(n&&o===0&&a>=100&&a<1e3&&(a=Math.round(a/10)*10),n&&o===0&&a>=1e3){let d=Math.pow(10,Math.floor(Math.log10(a))-2);a=Math.round(a/d)*d}return l.includes(",")||a>=1e4?a.toLocaleString("en-US",{minimumFractionDigits:o,maximumFractionDigits:o}):a.toFixed(o)};return i.replace(/€(\s?)([−-]?)(\d[\d,]*(?:\.\d+)?)(?:([–-])(\d[\d,]*(?:\.\d+)?))?/g,(l,o,a,d,c,p)=>"$"+o+a+r(d)+(p?c+r(p):"")).replace(/(\d[\d,]*(?:\.\d+)?)\s?ct\b/g,(l,o)=>r(o)+" \xA2").replace(s?/€(?=\/[A-Za-z])/g:/€/g,"$").replace(/\bct\/kWh/g,"\xA2/kWh")}function yl(i,e=an[2025]){let t=(s,r)=>gl(r,s&&s.__cur,e),n=(s,r)=>r&&((...l)=>t(s,r(...l)));return{text:(s,r,...l)=>i.text(s,t(s,r),...l),measure:(s,r,...l)=>i.measure(s,t(s,r),...l),tag:(s,r,...l)=>i.tag(s,t(s,r),...l),axes:(s,r)=>{let l={...r,ylabel:t(s,r.ylabel),xlabel:t(s,r.xlabel),yfmt:n(s,r.yfmt),xfmt:n(s,r.xfmt)};if(s&&s.__cur==="USD")for(let o of["y","x"]){let a=r[o+"fmt"],d=r[o+"0"],c=r[o+"1"],p=r[o+"ticks"];if(!p&&a&&d!=null&&c!=null){let S=r["n"+o]||5;p=Array.from({length:S+1},(A,R)=>d+(c-d)*R/S)}if(!p||p.length<2||!a||!String(a(p[1])).includes("\u20AC"))continue;let u=Math.min(...p)*e,h=Math.max(...p)*e,f=(h-u)/(p.length-1),y=Math.pow(10,Math.floor(Math.log10(f))),m=[1,2,5,10].map(S=>S*y).find(S=>S>=f*.95),g=o==="y"?[r.y0,r.y1]:[r.x0,r.x1],M=g[0]==null?h*1.08:Math.max(...g)*e,_=[];for(let S=Math.ceil(u/m-1e-9)*m;S<=M+1e-9;S+=m)_.push(S/e);l[o+"ticks"]=_.filter(S=>g[0]==null||S>=Math.min(...g)-1e-9&&S<=Math.max(...g)+1e-9);let x=String(a(p[1])),T=x.match(/€\s?([\d.,]+)(.*)$/),w=T?parseFloat(T[1].replace(/,/g,"")):NaN,E=w&&isFinite(p[1]/w)?p[1]/w:1,b=T?T[2]:"";l[o+"fmt"]=S=>{let A=S*e/E,R=m/E,I=R<1?R<.1?2:1:0;return Math.abs(A)<1e-9&&/^0$/.test(String(a(0)))?"0":(A<0?"\u2212":"")+"$"+Math.abs(A).toFixed(I).replace(/\B(?=(\d{3})+(?!\d))/g,",")+b}}return i.axes(s,l)}}}function es(i,e,t,n,s=an[2025]){let r=vy,l=new WeakMap,o=u=>{let h=l.get(u);h!=null&&(u.innerHTML=r==="USD"?gl(h,"USD",s,u.tagName==="OUTPUT"):h)},a=[...i.querySelectorAll(".readout, output")],d=new MutationObserver(u=>{let h=new Set;for(let f of u){let y=f.target.nodeType===1?f.target:f.target.parentElement;for(;y&&!a.includes(y);)y=y.parentElement;y&&h.add(y)}h.forEach(f=>{l.set(f,f.innerHTML),o(f)}),d.takeRecords()});a.forEach(u=>{l.set(u,u.innerHTML),d.observe(u,{childList:!0,characterData:!0,subtree:!0})});let c=[...i.querySelectorAll("button")].filter(u=>u.textContent.includes("\u20AC")).map(u=>[u,u.innerHTML]),p=()=>{a.forEach(o),c.forEach(([u,h])=>{u.innerHTML=r==="USD"?gl(h,"USD",s,!0):h}),d.takeRecords(),e.ctx.__cur=r,e.invalidate()};mi(t,u=>{r=u,p()},n),p()}var Hr=(i,e)=>i==="USD"?an[Math.min(2026,Math.max(2015,Math.floor(e)))]:1;function xy(i){let e=i>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function lf(i){let s={now:9,seed:7,playing:!1},r=null,l=()=>{let M=xy(s.seed),_=9+(M()-.5)*10,x=[],T=(M()-.5)*7;for(let w=-14;w<=18;w+=.25){let E=18-w,b=.35+.17*E;T=T*.97+(M()-.5)*.35;let S=_+T*Math.min(1,E/20+.08);x.push({t:w,fc:S,sd:b})}r={truth:_,pts:x}};l();let o=M=>{let _=r.pts,x=Ae(Math.round((M- -14)/.25),0,_.length-1);return _[x]},a=-12,d=-9,c=18-5/60,p=()=>{let M=o(a).fc,_=s.now>=d?o(Math.min(s.now,c)).fc-M:0,x=s.now>=19?r.truth:null;return{daPos:M,idPos:_,delivered:x,imb:x!=null?x-M-_:null}},u=new Qe(i,{label:"Timeline from day-ahead auction to delivery, showing a wind forecast narrowing and the positions traded in each market",height:M=>M<600?470:400,animated:!0,step(M){s.playing&&(s.now+=M*2.2,s.now>19.6&&(s.now=19.6,s.playing=!1,f.textContent="Play"),y.set(s.now),g())},draw(M,_,x){let T=_<600,w={l:46,r:_-16,t:26,b:T?x-190:x-150},{sx:E,sy:b}=dt(M,{box:w,x0:-14,x1:19.6,y0:0,y1:20,xticks:[-12,-6,0,6,12,18],xfmt:z=>z<0?`${String(24+z).padStart(2,"0")}:00 D\u22121`:`${String(z).padStart(2,"0")}:00`,yfmt:z=>z,ylabel:"forecast wind output for 18:00\u201319:00 on day D (GW)"}),S=(z,V,U,H)=>{M.fillStyle=se(U,.09),M.fillRect(E(z),w.t,E(V)-E(z),w.b-w.t),X(M,H,E(z)+4,w.b-6,{size:10.5,color:ot(U,.2),weight:600})};S(-14,a,v.ink3,T?"":"bids"),S(d,c,v.wind,"intraday trading"),S(18,19,v.peaker,T?"":"delivery"),Me(M,E(a),w.t,E(a),w.b,v.ink2,1.5,[4,3]),Pn(M,"Day-ahead auction 12:00",E(a)+4,w.t+10,{size:10.5,bg:v.ink2});let A=r.pts.filter(z=>z.t<=s.now);A.length>1&&(M.beginPath(),A.forEach((z,V)=>{let U=E(z.t),H=b(z.fc+1.64*z.sd);V?M.lineTo(U,H):M.moveTo(U,H)}),[...A].reverse().forEach(z=>M.lineTo(E(z.t),b(Math.max(0,z.fc-1.64*z.sd)))),M.closePath(),M.fillStyle=se(v.wind,.18),M.fill(),$e(M,A.map(z=>[E(z.t),b(z.fc)]),v.wind,2.2));let R=o(Math.min(s.now,18));s.now<18&&(M.save(),M.setLineDash([3,4]),M.strokeStyle=se(v.wind,.6),M.lineWidth=1,M.beginPath(),M.moveTo(E(s.now),b(R.fc+1.64*R.sd)),M.lineTo(E(18),b(R.fc+1.64*R.sd)),M.moveTo(E(s.now),b(Math.max(0,R.fc-1.64*R.sd))),M.lineTo(E(18),b(Math.max(0,R.fc-1.64*R.sd))),M.stroke(),M.restore()),s.now>=19&&(Ce(M,E(18+.5),b(r.truth),6,v.ink),X(M,`actual ${r.truth.toFixed(1)} GW`,E(18+.5)-10,b(r.truth)-10,{size:11,align:"right",weight:650,halo:!0})),Me(M,E(s.now),w.t-6,E(s.now),w.b,v.ink,2),Ce(M,E(s.now),b(R.fc),4.5,v.wind,"#fff",2);let I=p(),O=w.b+46,D=T?16:46,L=_-D-16;X(M,"The wind farm\u2019s book for that hour",D,O-10,{size:12,weight:650});let P=Qt(0,20,D+110,D+L),F=(z,V,U,H,K,ce)=>{let Z=O+6+z*26;if(X(M,V,D,Z+13,{size:11.5,color:v.ink2}),U==null){X(M,ce||"\u2014",D+110,Z+13,{size:11,color:v.ink3});return}let Y=P(Math.min(U,H)),B=P(Math.max(U,H));He(M,Y,Z+2,Math.max(2,B-Y),16,4),M.fillStyle=K,M.fill(),X(M,ce,B+6,Z+14,{size:11,color:v.ink2})};F(0,"Day-ahead sold",s.now>=a?0:null,I.daPos,v.ink2,s.now>=a?`${I.daPos.toFixed(1)} GW at the auction price`:"not yet \u2014 bids due by noon");let G=I.idPos;F(1,"Intraday",s.now>=d?I.daPos:null,I.daPos+G,G>=0?v.wind:v.gas,s.now>=d?`${G>=0?"sold +":"bought back "}${Math.abs(G).toFixed(1)} GW as forecasts update`:"opens 15:00 D\u22121"),F(2,"Imbalance",I.imb!=null?I.daPos+G:null,I.delivered,v.peaker,I.imb!=null?`${I.imb>=0?"+":"\u2212"}${Math.abs(I.imb).toFixed(1)} GW settled at the imbalance price`:"whatever is left after gate closure")}}),h=tt(i),f=zt(h,"Play",()=>{s.now>=19.6&&(s.now=-14),s.playing=!s.playing,f.textContent=s.playing?"Pause":"Play",u.invalidate()},{name:"play"});zt(h,"Different weather",()=>{s.seed=(s.seed*7+13)%997,l(),g()},{kind:"ghost",name:"reroll"});let y=Ie(h,{label:"Now",min:-14,max:19.6,step:.05,value:s.now,wide:!0,color:v.ink,fmt:M=>{let _=M<0?"D\u22121":"D",x=(M%24+24)%24;return`${String(Math.floor(x)).padStart(2,"0")}:${String(Math.floor(x%1*60)).padStart(2,"0")} ${_}`},oninput:M=>{s.now=M,s.playing=!1,f.textContent="Play",g()},name:"now"}),m=ct(i);function g(){let M=18-s.now;m.innerHTML=s.now<a?`Bids for tomorrow are due at noon. The forecast for 18:00 tomorrow is still uncertain by about <b>\xB1${(1.64*o(s.now).sd).toFixed(1)} GW</b>.`:s.now<18?`${M.toFixed(1)} hours to delivery. Forecast spread: <b>\xB1${(1.64*o(s.now).sd).toFixed(1)} GW</b>. Every update can be traded on the intraday market.`:s.now<19?"Delivery. Trading has closed; the grid operator\u2019s reserves cover any remaining mismatch.":"Settlement. The wind farm pays (or is paid) the imbalance price for whatever it got wrong.",u.invalidate()}g()}function cf(i){let e={mode:"monthly",hover:null,cur:"USD"},t,n,s=()=>{t=pi.emberMonthly.map(([d,c])=>{let p=+d.slice(0,4)+(+d.slice(5,7)-.5)/12;return[p,c*Hr(e.cur,p),d]}),n=pi.emberAnnual.map(([d,c])=>[d,c*Hr(e.cur,d)])};s();let r=()=>e.cur==="USD"?"$":"\u20AC",l=null,o=new Qe(i,{label:"German day-ahead wholesale electricity price, monthly averages 2015 to 2026 (Ember data)",height:d=>d<600?320:360,draw(d,c,p){let u={l:46,r:c-14,t:30,b:p-34},{sx:h,sy:f}=dt(d,{box:u,x0:2015,x1:2026.75,y0:0,y1:520,yticks:[0,100,200,300,400,500],xticks:[2015,2017,2019,2021,2023,2025],ylabel:`${r()}/MWh (day-ahead, Germany\u2013Luxembourg${e.cur==="USD"?", at each year\u2019s ECB rate":""})`});if(l={sx:h,sy:f,box:u},d.fillStyle=se(v.gas,.09),d.fillRect(h(2021.6),u.t,h(2023.1)-h(2021.6),u.b-u.t),X(d,"gas crisis",h(2021.65)+3,u.b-8,{size:10.5,color:ot(v.gas,.2),weight:600}),e.mode==="monthly"){d.beginPath(),t.forEach(([m,g],M)=>M?d.lineTo(h(m),f(g)):d.moveTo(h(m),f(g))),d.lineTo(h(t.at(-1)[0]),f(0)),d.lineTo(h(t[0][0]),f(0)),d.closePath(),d.fillStyle=se(v.price,.08),d.fill(),$e(d,t.map(([m,g])=>[h(m),f(g)]),v.price,2);let y=t.reduce((m,g)=>g[1]>m[1]?g:m);Ce(d,h(y[0]),f(y[1]),4,v.price),X(d,`Aug 2022: ${r()}${y[1].toFixed(0)}`,h(y[0])+8,f(y[1])+4,{size:11,weight:650,halo:!0})}else n.forEach(([y,m])=>{let g=h(y+.12),M=h(y+.88);He(d,g,f(m),M-g,f(0)-f(m),3),d.fillStyle=y===2026?se(v.price,.4):v.price,d.fill(),X(d,m.toFixed(0),(g+M)/2,f(m)-5,{size:10.5,align:"center",color:v.ink2,weight:600})}),X(d,"2026: Jan\u2013Sep only",h(2026.5),f(n.at(-1)[1])-20,{size:10,align:"center",color:v.ink3});if(e.hover){let[y,m,g]=e.hover;Me(d,h(y),u.t,h(y),u.b,se(v.ink,.3),1),Ce(d,h(y),f(m),4.5,"#fff",v.price,2),Pn(d,`${g}: ${r()}${m.toFixed(1)}/MWh`,Ae(h(y),u.l+70,u.r-70),u.t+6,{align:"center",size:11})}}});o.interact({hit:()=>null,hover:(d,c)=>{if(!l||c<0){e.hover=null;return}let p=l.sx.inv?l.sx.inv(c):null;if(p!=null)if(e.mode==="monthly"){let u=t[0];for(let h of t)Math.abs(h[0]-p)<Math.abs(u[0]-p)&&(u=h);e.hover=u}else{let u=Math.floor(p),h=n.find(f=>f[0]===u);e.hover=h?[u+.5,h[1],String(u)]:null}}});let a=tt(i);rt(a,{options:[{label:"Monthly",value:"monthly"},{label:"Annual average",value:"annual"}],value:e.mode,onchange:d=>{e.mode=d,e.hover=null,o.invalidate()}}),mi(a,d=>{e.cur=d,s(),e.hover=null,o.invalidate()},"sp",{caption:!1,value:"EUR"})}var Sy=[["VAT (19%)",5.91],["Electricity tax",2.05],["Concession fee",1.666],["\xA719 grid surcharge",1.559],["Offshore grid levy",.941],["CHP levy",.446]];function hf(i){let e={year:2026,hover:-1,cur:"USD"},t,n=()=>{t=pi.bdew.map(([p,...u])=>[p,...u.map(h=>h*Hr(e.cur,p))])};n();let s=p=>(pi.emberAnnual.find(u=>u[0]===p)||[0,NaN])[1]/10*Hr(e.cur,p),r=()=>e.cur==="USD"?"\xA2/kWh":"ct/kWh",l=null,o=new Qe(i,{label:"German household electricity price components 2015 to 2026 (BDEW), with the year-average wholesale price marked; a waterfall decomposes the selected year",height:p=>p<600?660:420,draw(p,u,h){let f=u<600,y=f?{l:40,r:u-12,t:64,b:300}:{l:44,r:u*.56,t:u<900?62:46,b:h-34},{sx:m,sy:g}=dt(p,{box:y,x0:2014.5,x1:2026.5,y0:0,y1:55,yticks:[0,10,20,30,40,50],xticks:f?[2015,2018,2021,2024,2026]:[2015,2017,2019,2021,2023,2025],ylabel:`${r()}, household (BDEW${e.cur==="USD"?", at each year\u2019s ECB rate":""})`});l={sx:m,left:y},t.forEach(([U,H,K,ce,Z])=>{let Y=(m(1)-m(0))*.7,B=m(U)-Y/2,N=U===e.year,q=N?1:.55,re=0;for(let[he,xe]of[[H,v.procurement],[K,v.network],[ce,v.taxes]])p.fillStyle=se(xe,q),p.fillRect(B,g(re+he),Y,g(re)-g(re+he)-1),re+=he;N&&(p.strokeStyle=v.ink,p.lineWidth=1.5,p.strokeRect(B-1.5,g(Z)-1.5,Y+3,g(0)-g(Z)+3)),X(p,Z.toFixed(1),m(U),g(Z)-5,{size:f?9:10.5,align:"center",color:N?v.ink:v.ink3,weight:600});let ae=s(U);isFinite(ae)&&Me(p,B-2,g(ae),B+Y+2,g(ae),v.spot,2.5)});let M=y.l-30,_=10,x=[["Procurement & sales",v.procurement],["Network",v.network],["Taxes & levies",v.taxes],["Wholesale year-avg",v.spot]],T=f||x.reduce((U,[H])=>U+32+at(p,H,10.5),M)>y.r+20;for(let[U,H]of x)U.startsWith("Wholesale")?Me(p,M,_,M+12,_,H,2.5):(p.fillStyle=H,p.fillRect(M,_-5,12,10)),M+=18,X(p,U,M,_+4,{size:10.5,color:v.ink2}),M+=at(p,U,10.5)+14,T&&U==="Network"&&(M=y.l-30,_+=16);let w=t.find(U=>U[0]===e.year),[E,b,S,A,R]=w,I=s(E),O=f?{l:20,r:u-16,t:360,b:h-40}:{l:u*.62,r:u-16,t:40,b:h-50},D=`${E}: from wholesale to meter${E===2026?" (spot Jan\u2013Sep)":""}`;X(p,at(p,D,12.5,650)>u-O.l-8?`${E}: wholesale to meter${E===2026?" (Jan\u2013Sep)":""}`:D,O.l,O.t-16,{size:12.5,weight:650});let L=[["Wholesale",I,v.spot],["Hedging, shape, sales, margin",b-I,St(v.procurement,.1)],["Network",S,v.network],["Taxes & levies",A,v.taxes]],F=Qt(0,55,O.l+4,O.r-46),G=0,z=Math.min(34,(O.b-O.t)/6);L.forEach(([U,H,K],ce)=>{let Z=O.t+6+ce*(z+14),Y=G,B=G+H;G=B;let N=F(Math.min(Y,B)),q=F(Math.max(Y,B));He(p,N,Z+12,Math.max(2,q-N),z-12,3),p.fillStyle=H<0?se(K,.35):K,p.fill(),H<0&&(p.strokeStyle=K,p.setLineDash([3,2]),p.stroke(),p.setLineDash([])),X(p,U,O.l,Z+7,{size:11,color:v.ink2}),X(p,`${H>=0?ce?"+":"":"\u2212"}${Math.abs(H).toFixed(1)}`,q+5,Z+12+(z-12)/2+4,{size:11,weight:650}),ce<L.length-1&&Me(p,F(B),Z+z,F(B),Z+z+26,v.grid2,1,[2,2])});let V=O.t+6+4*(z+14);if(He(p,F(0),V+12,F(R)-F(0),z-12,3),p.fillStyle=v.ink,p.fill(),X(p,"What a new household contract costs",O.l,V+7,{size:11,color:v.ink,weight:600}),X(p,`${R.toFixed(1)} ${r()}`,F(R)+5,V+12+(z-12)/2+4,{size:11.5,weight:700}),E===2026){let U=V+z+22;X(p,"Taxes & levies, 2026:",O.l,U,{size:10.5,color:v.ink3,weight:600}),U+=14;let H=Sy.map(([B,N])=>`${B} ${(N*Hr(e.cur,2026)).toFixed(2)}`),K=Math.max(...H.filter((B,N)=>!(N%2)).map(B=>at(p,B,10.5)))+14,ce=Math.max(...H.filter((B,N)=>N%2).map(B=>at(p,B,10.5))),Z=O.l+K+ce>u-4?10.5*(u-4-O.l)/(K+ce):10.5,Y=Math.max((O.r-O.l)/2,K)*Z/10.5;H.forEach((B,N)=>X(p,B,O.l+N%2*Y,U+Math.floor(N/2)*14,{size:Z,color:v.ink3}))}}});o.interact({hit:(p,u)=>!l||u>l.left.b||p<l.left.l||p>l.left.r?null:{x:p},cursor:"pointer",down:p=>a(p.x),move:(p,u)=>a(u)});let a=p=>{let u=Ae(Math.round(l.sx.inv(p)),2015,2026);u!==e.year&&(e.year=u,c.set(u),o.invalidate())},d=tt(i),c=Ie(d,{label:"Year",min:2015,max:2026,step:1,value:e.year,color:v.procurement,fmt:p=>p,oninput:p=>{e.year=p,o.invalidate()},name:"year",wide:!0});mi(d,p=>{e.cur=p,n(),o.invalidate()},"bl",{caption:!1,value:"EUR"})}var _l={years:[2016,2019,2021,2022,2023,2024,2025],res:[12.55,13.01,13.66,15.04,16,16.48,17.3],com:[10.43,10.68,11.22,12.41,12.59,12.75,13.41],ind:[6.76,6.81,7.18,8.32,8.04,8.13,8.62]},wy=[[2019,27.32],[2020,21.77],[2021,39.78],[2022,80.14],[2023,31.08],[2024,33.74]];function uf(i){let e=new Qe(i,{label:"US average retail electricity prices by sector compared with the PJM real-time wholesale price",height:t=>t<600?300:320,draw(t,n,s){let r={l:40,r:n-(n<600?70:120),t:28,b:s-32},{sx:l,sy:o}=dt(t,{box:r,x0:2016,x1:2025,y0:0,y1:20,yticks:[0,5,10,15,20],xticks:[2016,2018,2020,2022,2024],ylabel:"\xA2/kWh (nominal)"});[["Residential",_l.res,v.ink],["Commercial",_l.com,v.ink2],["Industrial",_l.ind,v.ink3]].forEach(([c,p,u])=>{let h=_l.years.map((f,y)=>[l(f),o(p[y])]);$e(t,h,u,2),h.forEach(f=>Ce(t,f[0],f[1],2.8,u)),X(t,`${c} ${p.at(-1).toFixed(1)}`,l(2025)+6,o(p.at(-1))+4,{size:11,color:u,weight:600})});let d=wy.map(([c,p])=>[l(c),o(p/10)]);$e(t,d,v.spot,2.2,[5,3]),d.forEach(c=>Ce(t,c[0],c[1],3,v.spot)),X(t,"PJM wholesale (real-time LMP)",l(2019),o(2.732)+22,{size:11,color:v.spot,weight:600,halo:!0})}})}var Hn={solar:{name:"Utility solar",capex:1150,fom:15,cf:25,life:30,fuel:0,hr:0,vom:0,band:[40,98],col:v.solar},wind:{name:"Onshore wind",capex:1500,fom:40,cf:38,life:25,fuel:0,hr:0,vom:0,band:[37,99],col:v.wind},gas:{name:"Gas combined cycle",capex:1300,fom:25,cf:55,life:30,fuel:3.5,hr:6.4,vom:4,band:[51,129],col:v.gas},nuclear:{name:"New nuclear",capex:14e3,fom:130,cf:92,life:40,fuel:0,hr:0,vom:10,band:[175,255],col:v.nuclear}},$r=(i,e)=>i===0?1/e:i*(1+i)**e/((1+i)**e-1);function ph(i,e){let t=i.capex*$r(e,i.life)/(8.76*i.cf/100),n=i.fom/(8.76*i.cf/100),s=i.fuel*i.hr+i.vom;return{cap:t,fom:n,fuel:s,total:t+n+s}}function df(i){let e={tech:"solar",wacc:7.5,p:{...Hn.solar}},t=new Qe(i,{label:"Levelised cost of electricity calculator: capital, fixed operating and fuel costs per megawatt-hour, and how the total changes with the cost of capital",height:d=>d<600?520:340,draw(d,c,p){let u=c<600,h=ph(e.p,e.wacc/100),f=Hn[e.tech],y=u?{l:46,r:c-20,t:30,b:210}:{l:50,r:c*.42,t:30,b:p-34},m=Math.max(300,h.total*1.15),{sx:g,sy:M}=dt(d,{box:y,x0:0,x1:1,y0:0,y1:m,xticks:[],ylabel:"$/MWh"}),_=y.l+(y.r-y.l)*.18,x=(y.r-y.l)*.28,T=0,w=1e9,E=[];for(let[O,D,L]of[["capital",h.cap,f.col],["fixed O&M",h.fom,St(f.col,.45)],["fuel & variable",h.fuel,v.ink3]]){if(D<=.01)continue;d.fillStyle=L,d.fillRect(_,M(T+D),x,M(T)-M(T+D)-1);let P=Math.min(M(T+D/2)+4,w-13);w=P,E.push(P),X(d,`${O} ${D.toFixed(0)}`,_+x+8,P,{size:11,color:v.ink2}),T+=D}X(d,`$${h.total.toFixed(0)}/MWh`,_+x/2,M(h.total)-8,{size:13,weight:700,align:"center"});let b=y.l+(y.r-y.l)*.06;d.fillStyle=se(v.ink,.08),d.fillRect(b-7,M(f.band[1]),14,M(f.band[0])-M(f.band[1])),Me(d,b-7,M(f.band[0]),b+7,M(f.band[0]),v.ink2,1.5),Me(d,b-7,M(f.band[1]),b+7,M(f.band[1]),v.ink2,1.5),Me(d,b,M(f.band[0]),b,M(f.band[1]),v.ink2,1.5);{let O=F=>F<y.b-2&&F>12&&Math.abs(M(h.total)-8-F)>16&&E.every(G=>Math.abs(G-F)>13),D=M(f.band[1])-8,L=M(f.band[0])+16,P=O(D)?D:O(L)?L:null;P!==null&&X(d,"Lazard 2026 (v19) range",b-8,P,{size:10,color:v.ink3,weight:600})}let S=u?{l:46,r:c-20,t:268,b:p-34}:{l:c*.52,r:c-20,t:30,b:p-34},A=dt(d,{box:S,x0:0,x1:15,y0:0,y1:m,xticks:[0,3,6,9,12,15],xfmt:O=>O+"%",ylabel:"LCOE vs cost of capital",xlabel:"cost of capital (WACC)"}),R={solar:"Solar",wind:"Wind",gas:"Gas CC",nuclear:"Nuclear"},I=[];Object.entries(Hn).forEach(([O,D])=>{let L=O===e.tech?e.p:D,P=[];for(let G=0;G<=15.01;G+=.25)P.push([A.sx(G),A.sy(Math.min(m,ph(L,G/100).total))]);$e(d,P,O===e.tech?D.col:se(D.col,.3),O===e.tech?2.6:1.4);let F=P.at(-1);I.push({s:R[O],y:F[1]-6,x:F[0]-2,col:O===e.tech?ot(D.col,.2):se(v.ink,.4),wgt:O===e.tech?650:450})}),I.sort((O,D)=>O.y-D.y);for(let O=1;O<I.length;O++)I[O].y-I[O-1].y<12&&(I[O].y=I[O-1].y+12);I.forEach(O=>X(d,O.s,O.x,O.y,{size:10,color:O.col,weight:O.wgt,align:"right",halo:!0})),Ce(d,A.sx(e.wacc),A.sy(Math.min(m,h.total)),5,f.col,"#fff",2)}}),n=tt(i),s={};rt(n,{options:Object.entries(Hn).map(([d,c])=>({label:c.name,value:d})),value:e.tech,onchange:d=>{e.tech=d,e.p={...Hn[d]};for(let c in s)s[c].set(e.p[c]);l(),a()},name:"tech"}),s.capex=Ie(n,{label:"Build cost",min:300,max:16e3,step:50,value:e.p.capex,fmt:d=>"$"+d.toLocaleString("en-US")+"/kW",color:v.ink2,oninput:d=>{e.p.capex=d,a()},name:"capex"});let r=Ie(n,{label:"Cost of capital",min:0,max:15,step:.25,value:e.wacc,fmt:d=>d.toFixed(2)+"%",color:v.price,oninput:d=>{e.wacc=d,a()},name:"wacc"});s.cf=Ie(n,{label:"Capacity factor",min:5,max:95,step:1,value:e.p.cf,fmt:d=>d+"%",color:v.wind,oninput:d=>{e.p.cf=d,a()},name:"cf"}),s.fuel=Ie(n,{label:"Gas price",min:1,max:15,step:.1,value:3.5,fmt:d=>"$"+d.toFixed(1)+"/MMBtu",color:v.gas,oninput:d=>{e.p.fuel=d,a()},name:"fuel"});let l=()=>{let d=s.fuel.el.closest(".ctl"),c=e.tech==="gas";d.style.opacity=c?"":.45,d.querySelectorAll("input").forEach(u=>{u.disabled=!c}),d.title=c?"":"Only gas burns fuel: solar, wind and nuclear costs do not depend on the gas price";let p=d.querySelector(".fuelnote");p||(p=document.createElement("small"),p.className="fuelnote",p.style.cssText="display:block;color:#777;margin-top:2px",d.appendChild(p)),p.textContent=c?"":"Only applies to gas: the other technologies burn no fuel."};l();let o=ct(i);function a(){let d=ph(e.p,e.wacc/100),c=d.cap/d.total;o.innerHTML=`<b>$${d.total.toFixed(0)}/MWh</b>. Capital is <b>${(c*100).toFixed(0)}%</b> of the cost \u2014 ${c>.6?"so the interest rate matters almost as much as the hardware.":"so the fuel price matters more than the interest rate."}`,t.invalidate()}a(),i.__sim={st:e,upd:a}}var mh=[["solar-pv-utility","Utility solar",v.solar],["wind-onshore","Onshore wind",v.wind],["gas-ccgt","Gas combined cycle",v.gas],["coal","Coal",v.coal],["nuclear","Nuclear",v.nuclear],["wind-offshore","Offshore wind",ot(v.wind,.3)],["gas-peaker","Gas peaker",v.peaker]];function ff(i){let e={on:new Set(["solar-pv-utility","wind-onshore","gas-ccgt","nuclear"]),irena:!1,hover:null},t=o=>(pi.lazard[o]||[]).filter(a=>a[0]!==2022),n=null,s=new Qe(i,{label:"Lazard levelised cost ranges 2008 to 2026 for several technologies",height:o=>o<600?360:400,draw(o,a,d){let c={l:46,r:a-(a<600?16:130),t:26,b:d-34},{sx:p,sy:u}=dt(o,{box:c,x0:2008,x1:2026,y0:0,y1:450,yticks:[0,100,200,300,400],xticks:[2008,2012,2016,2020,2024],ylabel:"US$/MWh, unsubsidised (Lazard edition year)"});n={sx:p,box:c},o.fillStyle=se(v.ink,.05),o.fillRect(p(2021),c.t,p(2026)-p(2021),c.b-c.t),X(o,"rates, supply chains",p(2021)+4,c.t+12,{size:10.5,color:v.ink3,weight:600});let h=[];for(let[f,y,m]of mh){if(!e.on.has(f))continue;let g=t(f);if(!g.length)continue;o.beginPath(),g.forEach(([_,x],T)=>T?o.lineTo(p(_),u(x)):o.moveTo(p(_),u(x))),[...g].reverse().forEach(([_,x,T])=>o.lineTo(p(_),u(T))),o.closePath(),o.fillStyle=se(m,.16),o.fill(),$e(o,g.map(([_,x,T])=>[p(_),u((x+T)/2)]),m,2.2);let M=g.at(-1);h.push({s:`${y} ${((M[1]+M[2])/2).toFixed(0)}`,y:u((M[1]+M[2])/2)+4,col:m})}if(a>=600){h.sort((f,y)=>f.y-y.y);for(let f=1;f<h.length;f++)h[f].y-h[f-1].y<14&&(h[f].y=h[f-1].y+14);h.forEach(f=>X(o,f.s,c.r+6,f.y,{size:10.5,color:ot(f.col,.15),weight:600}))}if(e.irena){for(let[f,y]of[["solar",v.solar],["onshore",v.wind]]){let m=pi.owidWorld[f].filter(g=>g[0]>=2008);$e(o,m.map(([g,M])=>[p(g),u(M)]),ot(y,.25),1.6,[4,3])}X(o,"dashed: IRENA global realised averages (via OWID)",c.l+8,c.t+28,{size:10.5,color:v.ink2})}if(e.hover!=null){let f=e.hover;Me(o,p(f),c.t,p(f),c.b,se(v.ink,.3));let y=mh.filter(([g])=>e.on.has(g)).map(([g,M])=>{let _=t(g).find(x=>x[0]===f);return _?`${M}: ${_[1]}\u2013${_[2]}`:null}).filter(Boolean),m=Ae(p(f)+8,c.l,c.r-170);He(o,m,c.t+34,170,18+y.length*15,6),o.fillStyle=se("#fff",.94),o.fill(),o.strokeStyle=v.grid2,o.stroke(),X(o,String(f),m+8,c.t+48,{size:11,weight:700}),y.forEach((g,M)=>X(o,g,m+8,c.t+64+M*15,{size:10.5,color:v.ink2}))}}});s.interact({hit:()=>null,hover:(o,a)=>{if(!n||a<0){e.hover=null;return}let d=Math.round(n.sx.inv(a));e.hover=d>=2008&&d<=2026&&d!==2022?d:null}});let r=tt(i,"chips");for(let[o,a,d]of mh){let c=zt(r,a,()=>{e.on.has(o)?e.on.delete(o):e.on.add(o),c.setAttribute("aria-pressed",e.on.has(o)),s.invalidate()},{kind:"chip",color:d});c.setAttribute("aria-pressed",e.on.has(o))}let l=zt(r,"IRENA global",()=>{e.irena=!e.irena,l.setAttribute("aria-pressed",e.irena),s.invalidate()},{kind:"chip",color:v.ink2});l.setAttribute("aria-pressed",!1)}var yh=1.13,Ty=3.412,_h={today:{label:"Section 7\u2019s market",gas:35,co2:75},shock:{label:"2022-style gas shock",gas:150,co2:85,imports:.001}},Ey=[["winter",!1,.25],["winter",!0,.08],["spring",!1,.36],["spring",!0,.14],["summer",!1,.12],["summer",!0,.05]],pf=[8,14,22],Ay=[[1,.35],[.6,.4],[.25,.25]],gh={};function Ry(i){if(gh[i])return gh[i];let e=_h[i],t=[],n=0;for(let[s,r,l]of Ey)for(let o of pf)for(let[a,d]of Ay){let c=Vr({season:s,weekend:r,solarCap:110*a,windLevel:o,steps:24,noNuclear:!0,gas:e.gas,co2:e.co2,...e.imports!=null?{imports:e.imports}:{}}),p=l/pf.length*d;for(let u of c.periods)t.push({w:p,price:Math.min(u.price,500)*yh,solar:u.solar/110,wind:u.wind/45}),n+=p}for(let s of t)s.w*=8760/n;return gh[i]=t}function mf(i){let e={tech:"solar",wacc:7.5,market:"today",p:{...Hn.solar}},t=null,n=null,s=()=>{if(e.tech!=="gas")return e.p.vom;let y=_h[e.market];return y.gas*yh/Ty*e.p.hr+e.p.vom+.34*y.co2*yh};function r(){let y=Ry(e.market),m=s(),g=e.p,M=0,_=0,x=0,T=e.tech==="solar"?(P=>P.solar):e.tech==="wind"?(P=>P.wind):(()=>1),w=0;for(let P of y)w+=T(P)*P.w;let E=e.tech==="solar"||e.tech==="wind"?g.cf/100*8760/w:e.tech==="nuclear"?.92:1,b=[];for(let P of y){let F=T(P)*E,G=P.price>=m&&F>0;G&&(M+=F*P.w,_+=F*P.w*(P.price-m),x+=P.w),b.push({...P,g:G?F:0})}let S=M/8760,A=g.capex*$r(e.wacc/100,g.life)+g.fom,R=M/1e3,I={fuel:m};I.cap=g.capex*$r(e.wacc/100,g.life)/R,I.fom=g.fom/R;let O=I.cap+I.fom+I.fuel,D=M>0?_/M+m:0,L=M>0?_/M:0;return n={run:b,cf:S,fixed:A,lc:I,total:O,earn:D,margin:L,m,out:M,runH:x,cover:A>0?_/1e3/A:0}}let l=new Qe(i,{label:"Build a power plant: its full cost per megawatt-hour against what the merit-order market pays it over a year, with a draggable cost-of-capital curve and the year\u2019s prices sorted from highest to lowest",height:y=>y<600?740:460,draw(y,m,g){let M=m<600,_=r(),x=Hn[e.tech],T=x.col,w=M?{l:46,r:m-12,t:34,b:250}:{l:52,r:m*.46,t:34,b:270},E=Math.max(160,Math.ceil(Math.max(_.total,_.earn,x.band[1])*1.15/50)*50),b=dt(y,{box:w,x0:0,x1:1,y0:0,y1:E,xticks:[],ylabel:"$/MWh",ny:4});X(y,"what it costs",w.l+(w.r-w.l)*.32,w.b+16,{size:11.5,weight:650,align:"center",color:v.ink2}),X(y,"what it earns",w.l+(w.r-w.l)*.74,w.b+16,{size:11.5,weight:650,align:"center",color:v.ink2});let S=(w.r-w.l)*.26,A=w.l+(w.r-w.l)*.32-S/2,R=w.l+(w.r-w.l)*.74-S/2,I=0,O=1e9;for(let[q,re,ae]of[["capital",_.lc.cap,T],["upkeep",_.lc.fom,St(T,.45)],[e.tech==="gas"?"fuel + CO\u2082":"running",_.lc.fuel,v.ink3]]){if(re<.5)continue;let he=b.sy(Math.min(E,I)),xe=b.sy(Math.min(E,I+re));y.fillStyle=ae,y.fillRect(A,xe,S,he-xe-1);let ne=Math.min((he+xe)/2+4,O-12);O=ne,X(y,`${q} ${re.toFixed(0)}`,A-6,ne,{size:10.5,color:v.ink2,align:"right"}),I+=re}X(y,`$${_.total.toFixed(0)}`,A+S/2,b.sy(Math.min(E,_.total))-7,{size:13,weight:700,align:"center"});let D=A+S+8;y.strokeStyle=v.ink3,y.lineWidth=1.5,y.beginPath(),y.moveTo(D,b.sy(x.band[0])),y.lineTo(D+5,b.sy(x.band[0])),y.moveTo(D+5,b.sy(x.band[0])),y.lineTo(D+5,b.sy(x.band[1])),y.lineTo(D,b.sy(x.band[1])),y.stroke(),M?X(y,"Lazard",D+3,b.sy(x.band[1])-6,{size:9.5,color:v.ink3,align:"center",halo:!0}):(X(y,"Lazard",D+8,b.sy(x.band[1])+10,{size:9.5,color:v.ink3}),X(y,"US range",D+8,b.sy(x.band[1])+21,{size:9.5,color:v.ink3}));let L=_.earn>=_.total-.5;y.fillStyle=v.ink3,y.fillRect(R,b.sy(_.m),S,b.sy(0)-b.sy(_.m)-1),y.fillStyle=se(v.price,.75),y.fillRect(R,b.sy(Math.min(E,_.earn)),S,b.sy(_.m)-b.sy(Math.min(E,_.earn))),X(y,`$${_.earn.toFixed(0)}`,R+S/2,b.sy(Math.min(E,_.earn))-7,{size:13,weight:700,align:"center",color:v.price}),Me(y,A,b.sy(Math.min(E,_.total)),R+S,b.sy(Math.min(E,_.total)),se(v.ink,.5),1,[4,3]),Pn(y,L?"pays for itself":`short $${(_.total-_.earn).toFixed(0)}/MWh`,R+S/2-(L?46:54),w.t-24,{bg:L?ot(v.wind,.1):v.price});let P=M?{l:46,r:m-12,t:296,b:430}:{l:m*.56,r:m-16,t:34,b:270},F=Math.max(E,100),G=dt(y,{box:P,x0:0,x1:15,y0:0,y1:F,xticks:[0,5,10,15],xfmt:q=>q+"%",xlabel:"cost of capital",ylabel:"cost, $/MWh",ny:4}),z=[];for(let q=0;q<=15.01;q+=.25){let re=e.p.capex*$r(q/100,e.p.life)/(_.out/1e3)+_.lc.fom+_.lc.fuel;z.push([G.sx(q),G.sy(Math.min(F,re))])}$e(y,z,T,2.4),Me(y,P.l,G.sy(Math.min(F,_.earn)),P.r,G.sy(Math.min(F,_.earn)),se(v.price,.8),1.5,[5,4]),X(y,"earns",P.r,G.sy(Math.min(F,_.earn))-5,{size:10.5,color:v.price,align:"right",halo:!0,weight:600});let V=G.sx(e.wacc),U=G.sy(Math.min(F,_.total));Ce(y,V,U,9,T,"#fff",2.5),X(y,"\u2194",V,U+4,{size:10,color:"#fff",align:"center",weight:700}),X(y,`${e.wacc.toFixed(1)}%`,Math.max(V,P.l+24),U-14,{size:11,weight:650,align:"center",halo:!0});let H=M?{l:46,r:m-12,t:486,b:g-50}:{l:52,r:m-16,t:330,b:g-30},K=[..._.run].sort((q,re)=>re.price-q.price),ce=Math.max(250,Math.ceil(Math.max(...K.map(q=>q.price).filter(q=>q<560))*1.08/50)*50),Z=-50,Y=dt(y,{box:H,x0:0,x1:8760,y0:Z,y1:ce,xticks:[0,2190,4380,6570,8760],xfmt:q=>q===0?"0 h":(q/1e3).toFixed(1).replace(".0","")+"k h",yfmt:q=>"$"+q,ylabel:"the year\u2019s prices, highest first ($/MWh)",ny:4}),B=0,N=[];for(let q of K){let re=Y.sx(B),ae=Y.sx(B+q.w),he=Y.sy(Ae(q.price,Z,ce));q.g>0&&q.price>_.m&&(y.fillStyle=se(v.price,.12+.55*q.g),y.fillRect(re,he,ae-re+.5,Y.sy(Math.max(Z,_.m))-he)),N.push([re,he],[ae,he]),B+=q.w}$e(y,N,v.ink,1.8),Me(y,H.l,Y.sy(Ae(_.m,Z,ce)),H.r,Y.sy(Ae(_.m,Z,ce)),ot(T,.2),1.5,[5,4]),X(y,`its running cost $${_.m.toFixed(0)}`,H.r,Y.sy(Ae(_.m,Z,ce))-5,{size:10.5,color:ot(T,.3),align:"right",halo:!0,weight:600}),X(y,M?"shaded: hours it runs \xD7 price above its cost":"shaded: the hours it runs; height above its running cost is the rent that pays back its build cost",M?H.l:H.r,M?H.b+34:H.t-8,{size:10.5,color:v.price,align:M?"left":"right",halo:!0}),t={b:G,B:P,dot:[V,U]}}});l.interact({hit:(y,m)=>t&&y>t.B.l-10&&y<t.B.r+10&&m>t.B.t-10&&m<t.B.b+10?"wacc":null,touchHit:(y,m)=>t&&t.dot&&Math.hypot(y-t.dot[0],m-t.dot[1])<26?"wacc":null,cursor:"ew-resize",down:(y,m)=>o(t.b.sx.inv(m)),move:(y,m)=>o(t.b.sx.inv(m))});let o=y=>{e.wacc=Math.round(Ae(y,0,15)*4)/4,p.set(e.wacc),f()},a=tt(i),d={};rt(a,{options:Object.entries(Hn).map(([y,m])=>({label:m.name,value:y,name:"bp-"+y})),value:e.tech,onchange:y=>{e.tech=y,e.p={...Hn[y]};for(let m in d)d[m].set(e.p[m]);u(),f()},name:"tech"}),d.capex=Ie(a,{label:"Build cost",min:300,max:16e3,step:50,value:e.p.capex,fmt:y=>"$"+y.toLocaleString("en-US")+"/kW",color:v.ink2,oninput:y=>{e.p.capex=y,f()},name:"capex"}),rt(a,{label:"Market it sells into",options:Object.entries(_h).map(([y,m])=>({label:m.label,value:y,name:"bm-"+y})),value:e.market,onchange:y=>{e.market=y,f()}});let c=ln(a,"More: site quality and cost of capital");d.cf=Ie(c,{label:"Capacity factor (site quality; wind and solar only)",min:5,max:60,step:1,value:e.p.cf,fmt:y=>y+"%",color:v.wind,oninput:y=>{e.p.cf=y,f()},name:"cf"});let p=Ie(c,{label:"Cost of capital (or drag the dot)",min:0,max:15,step:.25,value:e.wacc,fmt:y=>y.toFixed(2)+"%",color:v.price,oninput:y=>{e.wacc=y,f()},name:"wacc"}),u=()=>{let y=d.cf.el.closest(".ctl"),m=e.tech==="solar"||e.tech==="wind";y.style.opacity=m?"":.45,y.querySelectorAll("input").forEach(g=>{g.disabled=!m})};u();let h=ct(i);function f(){let y=r(),m=Hn[e.tech].name.toLowerCase(),g=e.tech==="gas"||e.tech==="nuclear";h.innerHTML=`This ${m} plant costs <b>$${y.total.toFixed(0)}/MWh</b> over its life, ${Math.round(y.lc.cap/y.total*100)}% of it capital. In the market it bids its running cost, <b>$${y.m.toFixed(0)}</b>, `+(g?`so it runs <b>${Math.round(y.runH/87.6)}%</b> of hours`:y.cf<e.p.cf/100-.015?`switches off when the price is below zero, so its ${e.p.cf}% site yields a <b>${Math.round(y.cf*100)}%</b> capacity factor,`:`produces at a <b>${Math.round(y.cf*100)}%</b> capacity factor`)+` and is paid on average <b>$${y.earn.toFixed(0)}/MWh</b>. The rent above its running cost covers <b>${Math.round(y.cover*100)}%</b> of what it costs to build and keep.`,l.invalidate()}dn(i,"drag the dot on the cost-of-capital curve; then try <b>New nuclear</b>, and the <b>2022-style gas shock</b>."),f(),i.__sim={st:e,compute:r}}var vh=60,Cy=3e3/60*2*Math.PI/vh;function bh(i,e={}){let t=e.stage||1,n=t>=2,s={ang:.4,omega:0,spin:!0,rpm:3e3,p:1,mode:"v",hist:[],drag:null,lastA:null},r=300,l=u=>s.omega/Cy*Math.sin(s.p*s.ang-u*2*Math.PI/3),o=new Qe(i,{label:n?"A generator with three coils a third of a turn apart: three voltages 120 degrees out of step, their sum, and their power":"A generator seen end-on: turn the magnet by hand inside one coil and watch the flux and the voltage it induces",height:u=>u<560?Math.round(u*.78+250):Math.max(320,Math.min(390,u*.46)),animated:!0,step(u){if(s.drag==null){let f=s.spin?s.rpm/60*2*Math.PI/vh:0;s.omega+=(f-s.omega)*Math.min(1,u*(s.spin?3:1.2)),s.ang+=s.omega*u}let h=[0,1,2].map(l);s.hist.push({phi:Math.cos(s.p*s.ang),v:h}),s.hist.length>r&&s.hist.shift()},draw(u,h,f){let y=h<560,m=y?Math.min(h*.3,120):Math.min(f*.38,h*.17),g=y?h/2:m+44,M=y?m+30:f/2,_=[],x=n?[0,1,2]:[0];for(let I of x)for(let O=0;O<2*s.p;O++){let D=Math.PI+O*Math.PI/s.p+I*2*Math.PI/3/s.p;_.push({a:D,col:n?Ws[I]:gn,e:(O%2?-1:1)*l(I)})}if(ll(u,g,M,m,_),cl(u,g,M,m*.78,s.ang,s.p,!n),n&&!y)for(let I of x){let O=Math.PI+I*2*Math.PI/3/s.p;X(u,tf[I],g+Math.cos(O)*(m+34),M+Math.sin(O)*(m+34)+4,{size:12,weight:700,color:Ws[I],align:"center"})}s.geom={cx:g,cy:M,R:m};let T=y?{l:40,r:h-14,t:2*m+92,b:f-26}:{l:g+m+80,r:h-16,t:34,b:f-34},w=s.mode==="p"?1.9:1.7,{sx:E,sy:b}=dt(u,{box:T,x0:0,x1:r,y0:s.mode==="p"?0:-w,y1:w,yticks:s.mode==="p"?[0]:[0],xticks:[],yfmt:()=>"0"}),S=s.hist,A=r-S.length,R=I=>E(I+A);if(!n)$e(u,S.map((I,O)=>[R(O),b(I.phi)]),se(v.ink3,.9),1.5,[4,4]),$e(u,S.map((I,O)=>[R(O),b(Ae(I.v[0],-w,w))]),gn,2.4),X(u,"magnetic flux through the coil",T.l+6,T.t-6,{size:11,color:v.ink3}),X(u,"voltage across the coil",T.l+6,T.t+10,{size:11,color:"#9a6236",weight:600});else if(s.mode==="v"||s.mode==="sum"){for(let I of x)$e(u,S.map((O,D)=>[R(D),b(Ae(O.v[I],-w,w))]),s.mode==="sum"?se(Ws[I],.45):Ws[I],2);s.mode==="sum"&&$e(u,S.map((I,O)=>[R(O),b(I.v[0]+I.v[1]+I.v[2])]),v.ink,2.6),X(u,s.mode==="sum"?"A + B + C: zero at every instant":"voltages of coils A, B and C",T.l+6,T.t-6,{size:11,color:s.mode==="sum"?v.ink:v.ink2,weight:600})}else{let I=S.map(()=>0);for(let O of x){let D=S.map((L,P)=>I[P]+L.v[O]**2);u.beginPath(),D.forEach((L,P)=>u.lineTo(R(P),b(L)));for(let L=S.length-1;L>=0;L--)u.lineTo(R(L),b(I[L]));u.closePath(),u.fillStyle=se(Ws[O],.55),u.fill(),I=D}$e(u,S.map((O,D)=>[R(D),b(I[D])]),v.ink,2),X(u,"power of A, B and C, stacked: the total is flat",T.l+6,T.t-6,{size:11,color:v.ink,weight:600})}X(u,`animation slowed ${vh}\xD7`,T.r,T.b+18,{size:11,color:v.ink3,align:"right"})}});for(let u=0;u<r;u++)o.opts.step(1/60);o.interact({hit:(u,h)=>{let f=s.geom;return f&&Math.hypot(u-f.cx,h-f.cy)<f.R+10?"rotor":null},cursor:"grab",down:(u,h,f)=>{let y=s.geom;s.drag=Math.atan2(f-y.cy,h-y.cx)-s.ang,s.t0=performance.now(),s.spin=!1,c&&c.set&&c.set(!1)},move:(u,h,f)=>{let y=s.geom,m=performance.now(),g=Math.max(1,m-s.t0)/1e3;s.t0=m;let M=Math.atan2(f-y.cy,h-y.cx)-s.drag,_=M-s.ang;_=Math.atan2(Math.sin(_),Math.cos(_)),s.ang+=_,s.omega=s.omega*.6+_/g*.4},up:()=>{s.drag=null,p()}});let a=tt(i),d=ct(i),c=null,p=()=>{let u=s.p*s.rpm/60;d.innerHTML=n?s.mode==="v"?"Three coils a third of a turn apart see the same magnet a third of a turn later: three identical voltages, each <b>120\xB0</b> behind the last.":s.mode==="sum"?"Add the three voltages and you get <b>zero</b>, at every instant. The three wires can be each other\u2019s return path.":"Each coil\u2019s power pulses, but the three add up to a <b>constant</b> total: a smooth, steady load on the shaft.":s.spin?`${s.p*2} poles at ${s.rpm} rpm \u2192 <b>${u.toFixed(1)} Hz</b>. ${Math.abs(u-50)<.3?"That\u2019s Europe\u2019s grid frequency.":Math.abs(u-60)<.3?"That\u2019s North America\u2019s.":""}`:"Turn the magnet: the faster you turn it, the faster the flux through the coil changes, and the bigger the voltage. Each half-turn the flux reverses and so does the voltage.",o.invalidate()};if(n)rt(a,{options:[{label:"Voltages",value:"v",name:"g3-v"},{label:"Add them up",value:"sum",name:"g3-sum"},{label:"Power",value:"p",name:"g3-p"}],value:s.mode,onchange:u=>{s.mode=u,p()}}),dn(i,"pick <b>Add them up</b>, then <b>Power</b>. You can still grab the rotor and turn it.");else{c=rt(a,{label:"Rotor",options:[{label:"Turn it by hand",value:!1,name:"g-hand"},{label:"Let it spin",value:!0,name:"g-spin"}],value:s.spin,onchange:h=>{s.spin=h,p()}});let u=ln(a,"More: speed and poles");Ie(u,{label:"Rotor speed",min:0,max:3600,step:50,value:s.rpm,color:v.field,fmt:h=>h.toFixed(0)+" rpm",oninput:h=>{s.rpm=h,p()},name:"rpm"}),rt(u,{label:"Pole pairs",options:[{label:"1",value:1},{label:"2",value:2},{label:"3",value:3}],value:1,onchange:h=>{s.p=h,p()}}),dn(i,"grab the magnet and turn it, slowly and then fast; then pick <b>Let it spin</b>.")}p(),i.__sim={st:s}}var{text:si,measure:gf,axes:Sh,tag:Sx}=yl(qs),yf={de:{solarCap:110,windLevel:12},coal:{solarCap:60,windLevel:8},gas:{solarCap:50,windLevel:22},hydro:{solarCap:30,windLevel:10},solar:{solarCap:80,windLevel:8,loadScale:.7}},_f=i=>(i<-.5?"\u2212\u20AC":"\u20AC")+Math.abs(i).toFixed(0),Mh=["mustrun","hydro","wind","solar","nuclear","lignite","coal","gas","peaker","storage","imports","scarcity"],xh=i=>`${String(Math.floor(i)).padStart(2,"0")}:${String(Math.round(i%1*60)%60).padStart(2,"0")}`;function vf(i){let e=l=>Math.round(l||0),t=e(i.solar),n=e(i.wind),s=Math.min(t,e(i.dispatch.solar)),r=Math.min(n,e(i.dispatch.wind));return{sa:t,wa:n,su:s,wu:r,sc:t-s,wc:n-r,load:e(i.load),exp:e(i.exported),ch:e(i.ch),dis:e(i.dis),flex:e(Math.max(0,i.flex||0)),price:i.price}}var Py=()=>typeof matchMedia<"u"&&matchMedia("(min-width: 1000px)").matches;function wh(i,e={}){let t=!!e.futures,n={season:"spring",weekend:!0,solarCap:110,windLevel:12,storageGW:0,flexGW:0,hour:13,region:"de",...e.init||{}},s=null,r=null,l=null,o=0,a=()=>{let M=ii[n.region],_=n.region==="de";s=Vr({..._?{}:{legacyShare:M.legacy,mustrun:M.mustrun,hydro:M.hydro,coal:M.coal,scale:M.scale,gas:M.set.gas,co2:M.set.co2,imports:2,exportGW:3,loadScale:yf[n.region].loadScale??1},season:n.season,solarCap:n.solarCap,windLevel:n.windLevel,weekend:n.weekend,storageGW:n.storageGW,storageH:4,flexGW:n.flexGW,noNuclear:_,steps:96})};a();let d=()=>{let M=s.periods,_=24/M.length;return M[Ae(Math.floor(n.hour/_),0,M.length-1)]},c=new Qe(i,{label:t?"A day on the grid with batteries and flexible demand absorbing the midday solar surplus":"A day on an illustrative grid: generation by source against demand, and the market price it produces",height:M=>M<600?660:Math.max(420,Math.min(500,M*.66)),draw(M,_,x){let T=s.periods,w=_<600,E={l:w?46:58,r:_-14,t:50,b:x*.6},b=Math.max(...T.map(Q=>Object.values(Q.dispatch).reduce((_e,Te)=>_e+Math.max(0,Te||0),0)+(Q.curtail||0)),n.region==="de"?100:50),S=Math.ceil(b*1.05/25)*25,A=w?[0,6,12,18,24]:[0,3,6,9,12,15,18,21,24],R=Sh(M,{box:E,x0:0,x1:24,y0:0,y1:S,xticks:A,yticks:Array.from({length:Math.floor(S/25)+1},(Q,_e)=>_e*25).filter(Q=>S<=150||Q%50===0),xfmt:Q=>Q+":00",yfmt:Q=>Q+(w?"":" GW"),ylabel:w?"GW":"generation and demand"});r={top:E,A:R},l&&l.invalidate();let I=24/T.length,O=T.map(()=>0),D=[];for(let Q of Mh){let _e=T.map(ue=>ue.dispatch[Q]||0);if(!_e.some(ue=>ue>.01))continue;let Te=O.map((ue,we)=>ue+_e[we]);M.beginPath(),T.forEach((ue,we)=>{M.lineTo(R.sx(we*I),R.sy(Te[we])),M.lineTo(R.sx((we+1)*I),R.sy(Te[we]))});for(let ue=T.length-1;ue>=0;ue--)M.lineTo(R.sx((ue+1)*I),R.sy(O[ue])),M.lineTo(R.sx(ue*I),R.sy(O[ue]));M.closePath(),M.fillStyle=se(Vt[Q].color,Q==="storage"?.95:.85),M.fill(),D.push({tech:Q,lo:O,hi:Te}),O=Te}let L=T.map(Q=>Q.curtail);if(L.some(Q=>Q>.1)){M.beginPath(),T.forEach((Q,_e)=>{M.lineTo(R.sx(_e*I),R.sy(O[_e]+L[_e])),M.lineTo(R.sx((_e+1)*I),R.sy(O[_e]+L[_e]))});for(let Q=T.length-1;Q>=0;Q--)M.lineTo(R.sx((Q+1)*I),R.sy(O[Q])),M.lineTo(R.sx(Q*I),R.sy(O[Q]));M.closePath(),M.fillStyle=se(v.solar,.16),M.fill(),M.strokeStyle=se(v.solar,.7),M.setLineDash([3,3]),M.stroke(),M.setLineDash([])}$e(M,T.map((Q,_e)=>[R.sx((_e+.5)*I),R.sy(Q.load)]),v.demand,2.4),$e(M,T.map((Q,_e)=>[R.sx((_e+.5)*I),R.sy(Math.max(0,Q.load-Q.solar-Q.wind))]),se(v.ink,.55),1.5,[5,4]);let P=d(),F=vf(P),G=R.sx(n.hour),z=[xh(n.hour)+(F.price<0?" \xB7 price below zero":""),`demand ${F.load} GW`,F.sc>0?`solar ${F.sa} GW: ${F.su} used, ${F.sc} curtailed`:`solar ${F.sa} GW`,F.wc>0?`wind ${F.wa} GW: ${F.wu} used, ${F.wc} curtailed`:`wind ${F.wa} GW`,`price ${_f(P.price)}/MWh`];F.exp>0&&z.push(`exported ${F.exp} GW`),F.ch>0&&z.push(`batteries charging ${F.ch} GW`),F.dis>0&&z.push(`batteries discharging ${F.dis} GW`),F.flex>0&&z.push(`flexible demand +${F.flex} GW`);let V=w?196:214,U=Math.max(E.l+4,G+12+V>E.r?G-12-V:G+12),H=E.t+4,K={x0:U-2,x1:U+V+2,y0:H-2,y1:H+16+z.length*15},ce=[],Z=(Q,_e,Te,ue)=>{let we=gf(M,Q,ue.size,ue.weight||450),$=ue.align==="right"?_e-we:ue.align==="center"?_e-we/2:_e;return{x0:$-3,x1:$+we+3,y0:Te-ue.size-1,y1:Te+4}},Y=(Q,_e)=>!(Q.x0>_e.x1||Q.x1<_e.x0||Q.y0>_e.y1||Q.y1<_e.y0),B=(Q,_e,Te,ue)=>{let we=Z(Q,_e,Te,ue);return Y(we,K)?!1:(si(M,Q,_e,Te,ue),ce.push(we),!0)},N=Math.round(13/I);B("demand",R.sx(22.6),R.sy(T[Math.round(22.6/I)].load)-8,{size:11.5,color:v.ink,weight:600,align:"right",halo:!0});let q=T.map(Q=>Math.max(0,Q.load-Q.solar-Q.wind)),re=q.indexOf(Math.min(...q));B(w?"demand \u2212 wind & solar":"demand minus wind & solar",Ae(R.sx(re*I),E.l+70,E.r-70),Math.min(R.sy(q[re])+16,E.b-8),{size:11,color:v.ink2,align:"center",halo:!0}),L[N]>1&&B("curtailed",R.sx(13),R.sy(O[N]+L[N])-6,{size:11,color:"#a87b10",align:"center",halo:!0});let ae=Mh.filter(Q=>T.some(_e=>(_e.dispatch[Q]||0)>.05)),he=[];for(let Q of D){let _e=w?9.5:11.5,Te=Vt[Q.tech].short,ue=gf(M,Te,_e,650),we=Math.max(2,Math.ceil((ue+8)/(R.sx(I)-R.sx(0))/2)),$=[];for(let W=we;W<T.length-we;W++){let C=1/0;for(let ee=W-we;ee<=W+we;ee++)C=Math.min(C,R.sy(Q.lo[ee])-R.sy(Q.hi[ee]));C>=_e+3&&$.push([C,W])}$.sort((W,C)=>C[0]-W[0]);let ze={size:_e,weight:650,color:ot(Vt[Q.tech].color,.62),align:"center"},Ye=!1;for(let[,W]of $){let C=R.sx((W+.5)*I),ee=(R.sy(Q.lo[W])+R.sy(Q.hi[W]))/2+_e*.36,ie=Z(Te,C,ee,ze);if(ie.x0<E.l||ie.x1>E.r||ce.some(ge=>Y(ie,ge))||Y(ie,K))continue;let pe=Ae(Math.floor(R.sx.inv(ie.x0)/I),0,T.length-1),Ee=Ae(Math.ceil(R.sx.inv(ie.x1)/I),0,T.length-1),Re=!1;for(let ge=pe;ge<=Ee&&!Re;ge++){let ve=R.sy(T[ge].load),Pe=R.sy(q[ge]);(ve>ie.y0-2&&ve<ie.y1+2||Pe>ie.y0-2&&Pe<ie.y1+2)&&(Re=!0)}if(!Re){si(M,Te,C,ee,ze),ce.push(ie),Ye=!0;break}}Ye||he.push(Q.tech)}if(he.length){let Q="also: "+he.map(_e=>Vt[_e].short).join(", ")+" (see the strip)";si(M,Q,E.l-(w?40:0),12,{size:10.5,color:v.ink3})}let xe={l:E.l,r:E.r,t:E.b+46,b:x-30},ne=T.map(Q=>Q.price),fe=Math.min(-40,...ne)-10,me=Math.max(160,...ne.filter(Q=>Q<900))+10,ye=Sh(M,{box:xe,x0:0,x1:24,y0:fe,y1:me,xticks:A,xfmt:Q=>Q+":00",yfmt:Q=>"\u20AC"+Q,ylabel:w?"\u20AC/MWh":"day-ahead price, \u20AC/MWh",ny:4});if(T.forEach((Q,_e)=>{Q.price<0&&(M.fillStyle=se(v.wind,.18),M.fillRect(ye.sx(_e*I),xe.t,ye.sx(I)-ye.sx(0)+.5,xe.b-xe.t))}),Me(M,xe.l,ye.sy(0),xe.r,ye.sy(0),se(v.ink,.35),1),M.beginPath(),T.forEach((Q,_e)=>{let Te=ye.sy(Ae(Q.price,fe,me));M.lineTo(ye.sx(_e*I),Te),M.lineTo(ye.sx((_e+1)*I),Te)}),M.strokeStyle=v.price,M.lineWidth=2.2,M.lineJoin="round",M.stroke(),Me(M,xe.l,ye.sy(s.avg),xe.r,ye.sy(s.avg),se(v.price,.6),1,[4,4]),si(M,`average ${_f(s.avg)}`,xe.r,ye.sy(s.avg)-5,{size:11,color:v.price,align:"right",halo:!0}),s.neg>0){let Q=T.findIndex(_e=>_e.price<0);si(M,`${s.neg%1?s.neg.toFixed(1):s.neg} h below zero`,ye.sx(Q*I)+5,xe.t+13,{size:11,color:ot(v.wind,.2),weight:650,halo:!0})}Me(M,G,E.t-4,G,xe.b,se(v.ink,.55),1),Ce(M,G,ye.sy(Ae(P.price,fe,me)),5,v.price,"#fff",2),He(M,G-10,E.b+13,20,20,10),M.fillStyle=v.ink,M.fill(),si(M,"\u2194",G,E.b+27,{size:12,color:"#fff",align:"center",weight:700}),He(M,U,H,V,14+z.length*15,8),M.fillStyle=se("#ffffff",.94),M.fill(),M.strokeStyle=v.grid2,M.stroke(),z.forEach((Q,_e)=>si(M,Q,U+9,H+18+_e*15,{size:11,color:_e?v.ink2:v.ink,weight:_e?450:650}))}});l=new Qe(i,{label:"Where the power comes from and where it goes at the selected time: generation by source on the left; demand, battery charging, flexible demand and exports on the right; curtailed wind and solar below",height:M=>Py()?Math.max(280,c.h||430):M<600?280:Math.max(230,Math.ceil(M*.24)),animated:!0,step(M){o+=M},draw(M,_,x){if(!s)return;let T=d(),w=vf(T),E=_<600;si(M,`At ${xh(n.hour)}: where the power comes from, and where it goes`,14,16,{size:12.5,weight:650,color:v.ink});let b=N=>N==="solar"?w.su:N==="wind"?w.wu:T.dispatch[N]||0,S=Mh.map(N=>({k:N,v:b(N),col:Vt[N].color,lab:Vt[N].short})).filter(N=>N.v>.05),A=[{k:"load",v:T.load,col:v.demand,lab:"demand"},{k:"ch",v:T.ch||0,col:v.storage,lab:E?"batteries":"charging batteries"},{k:"flex",v:Math.max(0,T.flex||0),col:v.nuclear,lab:E?"flexible":"flexible demand"},{k:"exp",v:T.exported||0,col:v.ink2,lab:"exports"}].filter(N=>N.v>.05),R=S.reduce((N,q)=>N+q.v,0),I=A.reduce((N,q)=>N+q.v,0);if(R<.1||I<.1)return;let O=w.sc+w.wc,D=30,L=x-10,P=E?96:160,F=_-(E?108:200),G=12,z=O>0?26:0,V=(L-D-z-(O>0?12:0))/R,U=0;for(let N of S)N.a=U,U+=N.v;let H=0;for(let N of A)N.a=H,H+=N.v/I*R,N.b=H;let K=N=>D+N*V,ce=[];for(let N of S)for(let q of A){let re=Math.max(N.a,q.a),ae=Math.min(N.a+N.v,q.b);ae-re>1e-6&&ce.push({y0:K(re),y1:K(ae),col:N.col,gw:ae-re})}let Z=(P+G+F)/2;for(let N of ce)M.beginPath(),M.moveTo(P+G,N.y0),M.lineTo(F,N.y0),M.lineTo(F,N.y1),M.lineTo(P+G,N.y1),M.closePath(),M.fillStyle=se(N.col,.3),M.fill();ce.forEach((N,q)=>{let re=Math.round(N.gw/1.5),ae=Math.max(1,Math.round((N.y1-N.y0)/7));for(let he=0;he<re;he++){let xe=Math.sin((q+1)*91.7+he*12.9898)*43758.5453,ne=xe-Math.floor(xe),fe=(o*.3+he/re+ne*.6/re+q*.137)%1,me=Math.floor(ne*ae);Ce(M,P+G+fe*(F-P-G),N.y0+(me+.5)*(N.y1-N.y0)/ae,1.9,ot(N.col,.15),null)}});let Y=(N,q,re,ae={})=>si(M,N,q,re,{size:11,color:v.ink2,...ae}),B=-99;for(let N of S){let q=K(N.a),re=K(N.a+N.v);M.fillStyle=N.col,M.fillRect(P,q,G,Math.max(1,re-q));let ae=Math.max((q+re)/2+4,B+12);Y(`${N.lab} ${N.v<.95?N.v.toFixed(1):Math.round(N.v)} GW`,P-6,ae,{align:"right"}),B=ae}B=-99;for(let N of A){let q=K(N.a),re=K(N.b);M.fillStyle=N.col,M.fillRect(F,q,G,Math.max(1,re-q));let ae=Math.max((q+re)/2+4,B+12);Y(`${N.lab} ${Math.round(N.v)} GW`,F+G+6,ae,{weight:N.k==="load"?650:450}),B=ae}if(O>0){let N=L-z,q=Math.min(F-P,O*V*3);M.fillStyle=se(v.solar,.14),M.fillRect(P,N,G,z),M.setLineDash([3,3]),M.strokeStyle=se(v.solar,.85),M.strokeRect(P,N,G,z),M.setLineDash([]),Y("curtailed",P-6,N+z/2+4,{align:"right",color:ot(v.solar,.35),weight:600}),Y(E?`${O} GW switched off`:`${[w.sc?`${w.sc} GW solar`:"",w.wc?`${w.wc} GW wind`:""].filter(Boolean).join(" + ")} switched off: nobody can use it`,P+G+8,N+z/2+4,{color:ot(v.solar,.35)})}}}),c.interact({hit:(M,_)=>r&&M>r.top.l&&M<r.top.r?"cursor":null,touchHit:(M,_)=>r&&Math.abs(M-r.A.sx(n.hour))<22?"cursor":null,cursor:"ew-resize",down:(M,_)=>{n.hour=Ae(r.A.sx.inv(_),0,23.99),g.set(n.hour),l.invalidate()},move:(M,_)=>{n.hour=Ae(r.A.sx.inv(_),0,23.99),g.set(n.hour),l.invalidate()}});{let M=document.createElement("div");M.className="day-pair",i.insertBefore(M,c.wrap),M.append(c.wrap,l.wrap)}let p=tt(i),u=ct(i),h=()=>{a();let M=s.captureRate;u.innerHTML=`Average price <b>${s.avg<-.5?"\u2212":""}\u20AC${Math.abs(s.avg).toFixed(0)}/MWh</b> \xB7 <b>${+s.neg.toFixed(1)} h</b> of negative prices \xB7 ${(()=>{if(!isFinite(M))return"no solar output";let _=M*s.avg;return _<-.5?`solar\u2019s output sold for <b>\u2212\u20AC${Math.abs(_).toFixed(0)}/MWh</b> on average: it <b>paid</b> to produce`:Math.abs(_)<=.5?"solar earned <b>almost nothing</b>: its output landed in the below-zero hours":s.avg<=1?`solar earned <b>\u20AC${_.toFixed(0)}/MWh</b> on average`:M<.2?`solar earned only <b>\u20AC${_.toFixed(0)}/MWh</b>, ${Math.round(M*100)}% of that average (its <i>capture rate</i>)`:`solar earned <b>${Math.round(M*100)}%</b> of that average (its <i>capture rate</i>)`})()} \xB7 <b>${s.curtail.toFixed(0)} GWh</b> of wind and solar curtailed.`,c.invalidate(),l.invalidate()};rt(p,{options:[{label:"Winter",value:"winter"},{label:"Spring",value:"spring"},{label:"Summer",value:"summer"}],value:n.season,onchange:M=>{n.season=M,h()},name:"season"});let f=null,y=null;t||(f=Ie(p,{label:"Installed solar",min:0,max:200,step:5,value:n.solarCap,color:v.solar,fmt:M=>M+" GW",oninput:M=>{n.solarCap=M,h()},name:"solar"})),t&&(Ie(p,{label:"Batteries (4-hour)",min:0,max:40,step:1,value:n.storageGW,color:v.storage,fmt:M=>M+" GW",oninput:M=>{n.storageGW=M,h()},name:"storage"}),Ie(p,{label:"Flexible demand (EVs, heat pumps, electrolysers)",min:0,max:30,step:1,value:n.flexGW,color:v.nuclear,fmt:M=>M+" GW",oninput:M=>{n.flexGW=M,h()},name:"flex"}));let m=ln(p,t?"Solar, wind, day and time":"More: weekday, wind, other grids, time slider");rt(m,{options:[{label:"Weekday",value:!1},{label:"Sunday",value:!0}],value:n.weekend,onchange:M=>{n.weekend=M,h()}});let g=Ie(m,{label:"Time of day (or drag on the chart)",min:0,max:23.99,step:.25,value:n.hour,color:v.ink,fmt:xh,oninput:M=>{n.hour=M,c.invalidate(),l.invalidate()}});t||rt(m,{label:"Grid (stylised fleet)",options:Object.entries(ii).map(([M,_])=>({label:_.label.replace(" noon",""),value:M,name:"gd-"+M})),value:n.region,onchange:M=>{n.region=M,Object.assign(n,yf[M]),f&&f.set(n.solarCap),y&&y.set(n.windLevel),h()}}),t&&(f=Ie(m,{label:"Installed solar",min:0,max:200,step:5,value:n.solarCap,color:v.solar,fmt:M=>M+" GW",oninput:M=>{n.solarCap=M,h()},name:"solar"})),y=Ie(m,{label:"Average wind output",min:0,max:45,step:1,value:n.windLevel,color:v.wind,fmt:M=>M+" GW",oninput:M=>{n.windLevel=M,h()},name:"wind"}),t||dn(i,e.hint||'drag across the chart to move through the day; slide the <span class="c-solar">solar</span> and watch the noon price.'),es(i,c,p,t?"eu-futureday":e.euName||"eu-gridday"),h(),i.__sim={st:n,upd:h,get sim(){return s}}}function bf(i){let e={cap:90,storage:0},t=[["winter",!1,.25],["winter",!0,.08],["spring",!1,.36],["spring",!0,.14],["summer",!1,.12],["summer",!0,.05]],n=[8,14,22],s=[[1,.35],[.6,.4],[.25,.25]],r=new Map;function l(u,h){let f=u+"|"+h;if(r.has(f))return r.get(f);let y=0,m=0,g=0,M=0;for(let[x,T,w]of t)for(let E of n)for(let[b,S]of s){let A=Vr({season:x,weekend:T,solarCap:u*b,windLevel:E,steps:24,storageGW:h,storageH:4,noNuclear:!0}),R=w/n.length*S;for(let I of A.periods){m+=I.price*R,y+=R;let O=I.dispatch.solar||0;g+=O*R,M+=O*I.price*R}}let _={avg:m/y,capture:g>0?M/g/(m/y):NaN,solarPrice:g>0?M/g:NaN};return r.set(f,_),_}let o=[];for(let u=10;u<=200;u+=10)o.push(u);let a=new Qe(i,{label:"As more solar is installed, the average price solar panels earn falls relative to the average market price",height:u=>Math.max(300,Math.min(360,u*.42)),draw(u,h,f){let y={l:58,r:h-20,t:30,b:f-40},{sx:m,sy:g}=Sh(u,{box:y,x0:0,x1:200,y0:0,y1:1.1,yticks:[0,.25,.5,.75,1],xticks:[0,50,100,150,200],yfmt:_=>Math.round(_*100)+"%",xfmt:_=>_+" GW",ylabel:"solar capture rate (solar-weighted \xF7 average price)",xlabel:"installed solar"});for(let[_,x,T,w]of[[0,v.solar,null,"no batteries"],[30,v.storage,[6,4],h<560?"with 30 GW batteries":"with 30 GW of 4-hour batteries"]]){let E=o.map(S=>[m(S),g(Ae(l(S,_).capture,0,1.1))]);$e(u,E,x,2.4,T);let b=E[_?13:11];si(u,w,b[0]+(_?6:-6),b[1]+(_?-12:20),{size:11,color:x,weight:600,align:_?"left":"right",halo:!0})}let M=l(e.cap,e.storage);Me(u,m(e.cap),y.t,m(e.cap),y.b,se(v.ink,.3),1),Ce(u,m(e.cap),g(Ae(M.capture,0,1.1)),6,e.storage?v.storage:v.solar,"#fff",2),Me(u,y.l,g(1),y.r,g(1),v.grid2,1,[2,3])}}),d=tt(i),c=ct(i),p=()=>{let u=l(e.cap,e.storage);c.innerHTML=`With ${e.cap} GW of solar${e.storage?" and 30 GW of batteries":""}, the average price over the model year is <b>\u20AC${u.avg.toFixed(0)}</b>, but a MWh of solar sells for only <b>\u20AC${u.solarPrice.toFixed(0)}</b> \u2014 a capture rate of <b>${Math.round(u.capture*100)}%</b>.`,a.invalidate()};Ie(d,{label:"Installed solar",min:10,max:200,step:10,value:e.cap,color:v.solar,fmt:u=>u+" GW",oninput:u=>{e.cap=u,p()}}),rt(d,{options:[{label:"No batteries",value:0},{label:"30 GW batteries",value:30}],value:0,onchange:u=>{e.storage=u,p()}}),es(i,a,d,"eu-capture"),p()}function Mf(i,e,t){let n=i.length,s=e.map(x=>({a:x.a.slice(),op:x.op,b:x.b}));t&&t.forEach((x,T)=>{if(isFinite(x)){let w=new Array(n).fill(0);w[T]=1,s.push({a:w,op:"<=",b:x})}});for(let x of s)x.b<0&&(x.a=x.a.map(T=>-T),x.b=-x.b,x.op=x.op==="<="?">=":x.op===">="?"<=":"=");let r=s.length,l=0,o=0;for(let x of s)x.op!=="="&&l++,x.op!=="<="&&o++;let a=n+l+o,d=[],c=[],p=n,u=n+l,h=[];for(let x of s){let T=new Float64Array(a+1);for(let w=0;w<n;w++)T[w]=x.a[w];x.op==="<="?(T[p]=1,c.push(p),p++):x.op===">="?(T[p]=-1,p++,T[u]=1,c.push(u),h.push(u),u++):(T[u]=1,c.push(u),h.push(u),u++),T[a]=x.b,d.push(T)}let f=(x,T)=>{let w=d[x][T];for(let E=0;E<=a;E++)d[x][E]/=w;for(let E=0;E<r;E++)if(E!==x){let b=d[E][T];if(b!==0)for(let S=0;S<=a;S++)d[E][S]-=b*d[x][S]}c[x]=T},y=(x,T)=>{for(let w=0;w<5e3;w++){let E=-1;for(let A=0;A<a;A++){if(!T(A)||c.includes(A))continue;let R=x[A]||0;for(let I=0;I<r;I++)R-=(x[c[I]]||0)*d[I][A];if(R<-1e-9){E=A;break}}if(E<0)return!0;let b=-1,S=1/0;for(let A=0;A<r;A++)if(d[A][E]>1e-12){let R=d[A][a]/d[A][E];(R<S-1e-12||Math.abs(R-S)<1e-12&&c[A]<c[b])&&(S=R,b=A)}if(b<0)return!1;f(b,E)}return!1};if(o){let x=new Array(a).fill(0);if(h.forEach(w=>x[w]=1),y(x,()=>!0),d.reduce((w,E,b)=>w+(h.includes(c[b])?E[a]:0),0)>1e-6)return{status:"infeasible"};for(let w=0;w<r;w++)if(h.includes(c[w])){for(let E=0;E<n+l;E++)if(Math.abs(d[w][E])>1e-9){f(w,E);break}}}let m=new Array(a).fill(0);for(let x=0;x<n;x++)m[x]=i[x];if(!y(m,x=>!h.includes(x)))return{status:"unbounded"};let M=new Array(n).fill(0);for(let x=0;x<r;x++)c[x]<n&&(M[c[x]]=d[x][a]);let _=M.reduce((x,T,w)=>x+T*i[w],0);return{status:"optimal",x:M,obj:_}}function xf(i,e,t){let n=[];for(let a=0;a<i;a++)a!==t&&n.push(a);let s=n.length,r=Array.from({length:s},()=>new Array(s).fill(0)),l=a=>n.indexOf(a);for(let a of e){let d=1/a.x,c=l(a.from),p=l(a.to);c>=0&&(r[c][c]+=d),p>=0&&(r[p][p]+=d),c>=0&&p>=0&&(r[c][p]-=d,r[p][c]-=d)}let o=Iy(r);return e.map(a=>{let d=new Array(i).fill(0);for(let c=0;c<i;c++){if(c===t)continue;let p=u=>u===t?0:o[l(u)][l(c)];d[c]=(p(a.from)-p(a.to))/a.x}return d})}function Iy(i){let e=i.length,t=i.map((n,s)=>[...n,...Array.from({length:e},(r,l)=>s===l?1:0)]);for(let n=0;n<e;n++){let s=n;for(let l=n+1;l<e;l++)Math.abs(t[l][n])>Math.abs(t[s][n])&&(s=l);[t[n],t[s]]=[t[s],t[n]];let r=t[n][n];for(let l=0;l<2*e;l++)t[n][l]/=r;for(let l=0;l<e;l++)if(l!==n){let o=t[l][n];for(let a=0;a<2*e;a++)t[l][a]-=o*t[n][a]}}return t.map(n=>n.slice(e))}var _n=[{id:"N",name:"North coast",x:.48,y:.12},{id:"E",name:"East",x:.8,y:.42},{id:"W",name:"West",x:.18,y:.5},{id:"S",name:"South",x:.55,y:.86}],yn=[{from:0,to:1,x:1,limit:7},{from:0,to:2,x:1,limit:7},{from:1,to:3,x:1,limit:6},{from:2,to:3,x:1,limit:6},{from:2,to:1,x:1.5,limit:5}];function Ly(i){return[{node:0,tech:"wind",cap:i.windN,cost:0},{node:1,tech:"lignite",cap:9,cost:85},{node:2,tech:"gas",cap:14,cost:100},{node:3,tech:"gas",cap:8,cost:108},{node:3,tech:"peaker",cap:14,cost:150},...[0,1,2,3].map(e=>({node:e,tech:"scarcity",cap:40,cost:1e3}))]}function Dy(i){return[5,7,11,i.loadS]}function vl(i,e,t,n){let s=Ly(i),r=Dy(i).map((h,f)=>h+(n&&n[f]||0)),l=xf(4,yn,3),o=s.map(h=>h.cost),a=[{a:s.map(()=>1),op:"=",b:r.reduce((h,f)=>h+f,0)}];t&&yn.forEach((h,f)=>{let y=s.map(g=>l[f][g.node]),m=r.reduce((g,M,_)=>g+l[f][_]*M,0);a.push({a:y,op:"<=",b:e[f]+m}),a.push({a:y,op:">=",b:-e[f]+m})});let d=Mf(o,a,s.map(h=>h.cap));if(d.status!=="optimal")return null;let c=[0,0,0,0];s.forEach((h,f)=>c[h.node]+=d.x[f]);let p=c.map((h,f)=>h-r[f]),u=yn.map((h,f)=>p.reduce((y,m,g)=>y+l[f][g]*m,0));return{x:d.x,obj:d.obj,G:s,D:r,inj:c,flows:u}}function bl(i,e,t){let n=vl(i,e,!0),s=vl(i,e,!1),r=.01,l=[0,1,2,3].map(c=>{let p=[0,0,0,0];p[c]=r;let u=vl(i,e,!0,p);return u&&n?(u.obj-n.obj)/r:NaN}),o=[0,0,0,0].map(()=>0),a=vl(i,e,!1,[r,0,0,0]),d=a&&s?(a.obj-s.obj)/r:NaN;return{con:n,unc:s,lmp:l,zonal:d,redispatchCost:n&&s?n.obj-s.obj:NaN,mode:t,dz:o}}var{text:At,measure:Sf,axes:Ox,tag:Bx}=yl(qs),Ml=i=>{if(!isFinite(i))return"#999";let e=Ae(i/160,0,1);return e<.5?Ot("#3f7fb8","#e9d9b0",e*2):Ot("#e9d9b0","#c2413a",(e-.5)*2)};function wf(i){let e={mode:"nodal",windN:12,loadS:24,limits:yn.map(_=>_.limit),sel:3,phase:0,res:null,hover:-1,day:!1,hour:12,playing:!1,dayRes:null},t=_=>.62+.38*Math.cos(2*Math.PI*(_-3)/24),n=_=>Math.min(1,.68+.17*Math.exp(-(((_-8.5)/2.4)**2))+.32*Math.exp(-(((_-18.5)/2.6)**2))),s=_=>e.day?{windN:e.windN*t(_),loadS:Math.max(10,e.loadS*n(_))}:{windN:e.windN,loadS:e.loadS},r=()=>{e.dayRes=e.day?Array.from({length:25},(_,x)=>bl(s(x%24),e.limits)):null},l=null,o=null,a=(_=!0)=>{e.res=bl(s(e.hour),e.limits),_&&r()},d=null,c=()=>{let _=e.loadS+"|"+e.limits.join(",");if(d&&d.key===_)return d;let x=[],T=null;for(let w=0;w<=30;w+=.5){let E=bl({windN:w,loadS:e.loadS},e.limits);!E||!E.con||(x.push({w,lmp:E.lmp}),T==null&&Math.max(...E.lmp)<999&&Math.max(...E.lmp)-Math.min(...E.lmp)>.5&&(T=w))}return d={key:_,pts:x,onset:T}};a();let p=new Qe(i,{label:"A four-node transmission network. In nodal mode each node has its own price; in zonal mode there is one price and the operator redispatches plants to respect line limits",height:_=>_<600?730:Math.max(460,Math.min(500,_*.52)),animated:!0,step(_){if(e.phase+=_,e.day&&e.playing){let x=Math.floor(e.hour*4);e.hour=(e.hour+_*2)%24,Math.floor(e.hour*4)!==x&&(o&&o.set(Math.floor(e.hour*4)/4),a(!1),M())}},draw(_,x,T){let w=x<600,E=e.res;if(!E||!E.con){At(_,"no feasible dispatch",20,30);return}let b=e.mode==="nodal",S=w?{x:20,y:22,w:x-40,h:T*.5}:{x:16,y:16,w:x*.62,h:T-32},A=G=>[S.x+_n[G].x*S.w,S.y+_n[G].y*S.h];l={P:A,map:S};let R=_n.map((G,z)=>A(z)),I=R.reduce((G,z)=>G+z[0],0)/4;b||(_.save(),He(_,S.x+2,S.y+2,S.w-4,S.h-4,18),_.fillStyle=se(Ml(E.zonal),.12),_.fill(),_.setLineDash([6,5]),_.strokeStyle=se(v.ink2,.5),_.lineWidth=1.5,_.stroke(),_.restore(),At(_,`one bidding zone \xB7 one price: \u20AC${E.zonal.toFixed(0)}/MWh`,I,S.y+S.h+2,{size:12,color:v.ink2,align:"center",weight:600,halo:!0}));let O=E.con.flows,D=E.unc.flows;yn.forEach((G,z)=>{let[V,U]=A(G.from),[H,K]=A(G.to),ce=O[z],Z=e.limits[z],Y=Math.abs(ce)/Z,B=!b&&Math.abs(D[z])>Z+1e-6,N=Y>.999?v.peaker:Y>.8?"#d49a2a":"#8c9aae",q=3+Math.abs(ce)*1.1;_.save(),_.lineCap="round",Me(_,V,U,H,K,se(N,.25),q+6),Me(_,V,U,H,K,N,q);let re=ce>=0?1:-1,ae=Math.hypot(H-V,K-U),he=(H-V)/ae,xe=(K-U)/ae,ne=Math.min(60,8+Math.abs(ce)*6);for(let _e=(e.phase*ne*re%26+26)%26;_e<ae&&!(Math.abs(ce)<.05);_e+=26){let Te=V+he*_e,ue=U+xe*_e,we=Te+he*7*re,$=ue+xe*7*re;Me(_,Te,ue,we,$,se("#ffffff",.85),Math.max(1.5,q*.45))}_.restore();let fe=(V+H)/2,me=(U+K)/2,ye=`${Math.abs(ce).toFixed(1)} / ${Z.toFixed(1)} GW`+(B&&!w?` \xB7 wanted ${Math.abs(D[z]).toFixed(1)}`:""),Q=Sf(_,ye,11,600)+30;if(He(_,fe-Q/2,me-11,Q,22,11),_.fillStyle=z===e.sel?v.ink:"#fff",_.fill(),_.strokeStyle=Y>.999?v.peaker:v.grid2,_.lineWidth=1.5,_.stroke(),At(_,"\u2039",fe-Q/2+9,me+4,{size:12,color:z===e.sel?"#fff":v.ink3,align:"center",weight:700}),At(_,"\u203A",fe+Q/2-9,me+4,{size:12,color:z===e.sel?"#fff":v.ink3,align:"center",weight:700}),At(_,ye,fe,me+4,{size:11,color:z===e.sel?"#fff":Y>.999?v.peaker:v.ink2,align:"center",weight:600}),Math.abs(ce)>.05){let _e=fe+he*re*(Q/2+14),Te=me+xe*re*(Q/2+14);qn(_,_e-he*re*8,Te-xe*re*8,_e+he*re*4,Te+xe*re*4,N,2,8)}}),_n.forEach((G,z)=>{let[V,U]=A(z),H=b?E.lmp[z]:E.zonal,K=w?22:Math.min(34,S.w*.07);Ce(_,V,U,K+4,"#fff"),Ce(_,V,U,K,Ml(H),se(v.ink,.15),1);let ce=H>=999?"short!":"\u20AC"+Math.max(0,Math.round(H)===0?0:Math.round(H));At(_,ce,V,U+5,{size:w?12:14,color:H>120||H<30?"#fff":v.ink,align:"center",weight:700});let Z=E.con.G,Y=E.con.x,B=E.unc.x,N=w?[]:Z.map((he,xe)=>({g:he,q:Y[xe],qu:B[xe]})).filter(he=>he.g.node===z&&he.g.tech!=="scarcity"),q=z===2,re=q?V-48:V+K+10,ae=q?U+K+22:U-26;At(_,G.name,V,U-K-10,{size:12,color:v.ink,align:"center",weight:650,halo:!0}),w||At(_,`demand ${E.con.D[z].toFixed(0)} GW`,re,ae,{size:10.5,color:v.ink3,halo:!0}),N.forEach((he,xe)=>{let ne=ae+8+xe*16,fe=60,me=he.q/Math.max(1e-6,he.g.cap);He(_,re,ne,fe,9,3),_.fillStyle=St(Vt[he.g.tech].color,.7),_.fill(),He(_,re,ne,fe*Ae(me,0,1),9,3),_.fillStyle=Vt[he.g.tech].color,_.fill();let ye=`${Vt[he.g.tech].short} ${he.q.toFixed(1)}`+(he.g.tech==="wind"&&he.q<he.g.cap-.05?` of ${he.g.cap.toFixed(0)}`:"");if(At(_,ye,re+fe+5,ne+8.5,{size:10.5,color:v.ink2,halo:!0}),!b){let Q=he.q-he.qu;Math.abs(Q)>.05&&At(_,(Q>0?"\u25B2 +":"\u25BC ")+Q.toFixed(1),re+fe+10+Sf(_,ye,10.5),ne+8.5,{size:10.5,color:Q>0?v.peaker:v.hydro,weight:700,halo:!0})}})});let L=w?{x:16,y:S.y+S.h+26,w:x-32}:{x:S.x+S.w+48,y:30,w:x-S.w-80},P=L.y,F=(G,z={})=>{At(_,G,L.x,P,{size:12,color:v.ink2,...z}),P+=z.gap||18};if(w&&(_n.forEach((G,z)=>{let V=E.con.G.map((U,H)=>({g:U,q:E.con.x[H],qu:E.unc.x[H]})).filter(U=>U.g.node===z&&U.g.tech!=="scarcity"&&(U.q>.05||U.qu>.05)).map(U=>`${Vt[U.g.tech].short} ${U.q.toFixed(1)}`+(!b&&Math.abs(U.q-U.qu)>.05?` (${U.q>U.qu?"+":""}${(U.q-U.qu).toFixed(1)})`:""));He(_,L.x,P-10,10,10,3),_.fillStyle=Ml(b?E.lmp[z]:E.zonal),_.fill(),At(_,`${G.name} \xB7 demand ${E.con.D[z].toFixed(0)} \xB7 ${V.join(", ")||"no generation"}`,L.x+16,P,{size:11,color:v.ink2}),P+=17}),P+=6),b){F("Nodal pricing (LMP)",{weight:650,color:v.ink,size:13,gap:22}),_n.forEach((z,V)=>{He(_,L.x,P-10,12,12,3),_.fillStyle=Ml(E.lmp[V]),_.fill(),At(_,`${z.name}: ${E.lmp[V]>=999?"shortage":"\u20AC"+Math.max(0,Math.round(E.lmp[V]))+"/MWh"}`,L.x+18,P,{size:12,color:v.ink2}),P+=18}),P+=8;let G=yn.reduce((z,V,U)=>z+Math.abs(E.con.flows[U])*Math.abs(E.lmp[V.to]-E.lmp[V.from]),0);F(`Congestion rent: \u20AC${(G/1e3).toFixed(2)} m per hour`,{size:11.5}),F("(flow \xD7 price difference, collected",{size:11,color:v.ink3,gap:14}),F("by the grid operator)",{size:11,color:v.ink3})}else{F("Zonal pricing + redispatch",{weight:650,color:v.ink,size:13,gap:22}),F(`Market price everywhere: \u20AC${E.zonal.toFixed(0)}/MWh`);let G=yn.filter((V,U)=>Math.abs(E.unc.flows[U])>e.limits[U]+1e-6).length;F(G?`The market\u2019s dispatch overloads ${G} line${G>1?"s":""}.`:"The market\u2019s dispatch fits the grid.",{color:G?v.peaker:v.storage,weight:600});let z=E.con.x.reduce((V,U,H)=>V+Math.max(0,E.unc.x[H]-U),0);G&&(F(`The operator turns ${z.toFixed(1)} GW down`,{size:11.5}),F("and the same amount up elsewhere.",{size:11.5}),F(`Redispatch cost: \u20AC${(E.redispatchCost/1e3).toFixed(2)} m per hour,`,{size:11.5,weight:600,color:v.ink}),F("recovered through network charges.",{size:11.5,color:v.ink3}))}if(!e.day&&L.w>150&&T-P>120){let G=Math.min(w?L.w-40:250,L.w-40),z=w?70:84;P+=w?4:12,At(_,"Node prices as northern wind rises",L.x,P,{size:12.5,weight:650,color:v.ink});let V=P+10,U=c(),H=N=>L.x+N/30*G,K=N=>V+z-Ae(N,0,170)/170*z;_.fillStyle=se(v.ink3,.06),_.fillRect(L.x,V,G,z),U.onset!=null&&(_.fillStyle=se(v.peaker,.08),_.fillRect(H(U.onset),V,L.x+G-H(U.onset),z),Me(_,H(U.onset),V,H(U.onset),V+z,se(v.peaker,.7),1,[3,3]));let ce=["#3f7fb8","#b9975b","#d08a5c","#c2413a"];[1,2,0,3].forEach(N=>$e(_,U.pts.filter(q=>q.lmp[N]<999).map(q=>[H(q.w),K(Math.max(0,q.lmp[N]))]),ce[N],N===3||N===0?2.2:1.4)),Me(_,H(e.windN),V-3,H(e.windN),V+z,v.ink,1.5);let Z=U.pts.reduce((N,q,re)=>Math.abs(q.w-e.windN)<Math.abs(U.pts[N].w-e.windN)?re:N,0),Y=[0,1,2,3].map(N=>({n:N,y:K(Ae(U.pts[Z].lmp[N],0,170))})).sort((N,q)=>N.y-q.y);for(let N=1;N<4;N++)Y[N].y-Y[N-1].y<11&&(Y[N].y=Y[N-1].y+11);let B=e.windN<24;Y.forEach(N=>At(_,_n[N.n].id,H(e.windN)+(B?5:-5),N.y+4,{size:11,weight:700,color:ce[N.n],align:B?"left":"right",halo:!0})),At(_,"0",L.x,V+z+13,{size:11,color:v.ink3}),At(_,"30 GW",L.x+G,V+z+13,{size:11,color:v.ink3,align:"right"}),U.onset!=null&&At(_,`a line fills at ${U.onset} GW`,Ae(H(U.onset),L.x+60,L.x+G-60),V+z+13,{size:11,color:v.peaker,weight:650,align:"center"}),P=V+z+30}if(!w&&L.w>150){P+=14,F("Line loading",{weight:650,color:v.ink,size:13,gap:20});let G=Math.min(170,L.w-70);yn.forEach((V,U)=>{let H=Math.abs(b?E.con.flows[U]:E.unc.flows[U]),K=e.limits[U],ce=H/K,Z=_n[V.from].id+"\u2013"+_n[V.to].id,Y=ce>1.001?v.peaker:ce>.98?ot(v.peaker,.1):v.network;At(_,Z,L.x,P,{size:11,color:U===e.sel?v.ink:v.ink2,weight:U===e.sel?700:500}),He(_,L.x+34,P-9,G,10,3),_.fillStyle=se(v.ink3,.15),_.fill(),He(_,L.x+34,P-9,G*Math.min(1,ce),10,3),_.fillStyle=se(Y,.85),_.fill(),ce>1.001&&Me(_,L.x+34+G,P-12,L.x+34+G,P+4,v.peaker,2),At(_,ce>1.001?`${Math.round(ce*100)}% \u2715`:`${Math.round(ce*100)}%`,L.x+40+G,P,{size:10.5,color:ce>.98?v.peaker:v.ink3,weight:ce>.98?700:450}),P+=17}),F(b?"Full lines (100%) split the price.":"Market flows; over 100% must be redispatched.",{size:11,color:v.ink3,gap:24}),yn.some((V,U)=>Math.abs(b?E.con.flows[U]:E.unc.flows[U])>=e.limits[U]-.001)?(F("Drag a full line\u2019s label right to raise",{size:11.5,weight:600,color:v.ink2}),F("its limit and the prices converge.",{size:11.5,weight:600,color:v.ink2})):(F("No line is full: one price everywhere.",{size:11.5,weight:600,color:v.ink2}),F("Drag a label left to tighten a line.",{size:11.5,weight:600,color:v.ink2}))}if(e.day&&e.dayRes&&!w&&L.w>150){P+=16;let G=Math.min(250,L.w-6),z=92,V=P+6;At(_,b?"Node prices through the day":"Market price through the day",L.x,P,{size:12.5,weight:650,color:v.ink});let U=e.dayRes.map(B=>B&&B.con?b?B.lmp:B.lmp.map(()=>B.zonal):null),H=Math.max(60,...U.flat().filter(B=>B!=null&&B<999))*1.08,K=B=>L.x+B/24*G,ce=B=>V+z-Math.min(B,H)/H*z;_.fillStyle=se(v.ink3,.06),_.fillRect(L.x,V,G,z);let Z=["#3f7fb8","#b9975b","#d08a5c","#c2413a"],Y=[];_n.forEach((B,N)=>{let q=U.map((ae,he)=>ae?[K(he),ce(Math.max(0,ae[N]))]:null).filter(Boolean);$e(_,q,Z[N],N===3||N===0?2.2:1.5);let re=Math.min(23,Math.round(e.hour));U[re]&&Y.push({n:N,y:ce(Math.max(0,U[re][N]))})}),Y.sort((B,N)=>B.y-N.y);for(let B=1;B<Y.length;B++)Y[B].y-Y[B-1].y<11&&(Y[B].y=Y[B-1].y+11);Y.forEach(B=>At(_,_n[B.n].id,K(e.hour)+(e.hour>18?-6:6),B.y+4,{size:10,weight:700,color:Z[B.n],align:e.hour>18?"right":"left",halo:!0})),[0,6,12,18,24].forEach(B=>At(_,B===24?"":String(B).padStart(2,"0")+":00",K(B),V+z+13,{size:9.5,color:v.ink3,align:B?"center":"left"})),Me(_,K(e.hour),V-2,K(e.hour),V+z,v.ink,1.5),At(_,"\u20AC"+Math.round(H/1.08),L.x+G+3,V+8,{size:9.5,color:v.ink3}),At(_,"\u20AC0",L.x+G+3,V+z,{size:9.5,color:v.ink3}),At(_,"N, E, W, S = node; the dark line is the hour shown on the map.",L.x,V+z+30,{size:10.5,color:v.ink3})}}});p.interact({hit:(_,x)=>{if(!l)return null;for(let T=0;T<yn.length;T++){let[w,E]=l.P(yn[T].from),[b,S]=l.P(yn[T].to),A=(w+b)/2,R=(E+S)/2;if(Math.abs(_-A)<56&&Math.abs(x-R)<14)return{li:T,x0:_,l0:e.limits[T]}}return null},cursor:"ew-resize",down:_=>{e.sel=_.li,f.set(e.limits[_.li])},move:(_,x)=>{e.limits[_.li]=Ae(Math.round((_.l0+(x-_.x0)/12)*2)/2,.5,20),f.set(e.limits[_.li]),a(),M()}});let u=tt(i);rt(u,{options:[{label:"Nodal (one price per node)",value:"nodal"},{label:"Zonal (one price + redispatch)",value:"zonal"}],value:e.mode,onchange:_=>{e.mode=_,M()},name:"mode"}),Ie(u,{label:"Wind in the north",min:0,max:30,step:.5,value:e.windN,color:v.wind,fmt:_=>_+" GW",oninput:_=>{e.windN=_,a(),M()},name:"windN"});let h=ln(u,"More: demand, line limits, a whole day");Ie(h,{label:"Demand in the south",min:10,max:32,step:.5,value:e.loadS,color:v.demand,fmt:_=>_+" GW",oninput:_=>{e.loadS=_,a(),M()},name:"loadS"});let f=Ie(h,{label:"Limit of the selected line <small>(or drag a line\u2019s label)</small>",min:.5,max:20,step:.5,value:e.limits[e.sel],color:v.network,fmt:_=>_+" GW",oninput:_=>{e.limits[e.sel]=_,a(),M()},name:"limit"});rt(h,{label:"Time",options:[{label:"One hour",value:!1,name:"nw-hour"},{label:"A day",value:!0,name:"nw-day"}],value:!1,onchange:_=>{e.day=_,y.style.display=_?"":"none",_||(e.playing=!1,m.textContent="Play the day"),a(),M()}});let y=document.createElement("div");y.className="ctl-row",y.style.display="none",h.appendChild(y);let m=zt(y,"Play the day",()=>{e.playing=!e.playing,m.textContent=e.playing?"Pause":"Play the day"},{name:"nw-play"});o=Ie(y,{label:"Hour",min:0,max:23.75,step:.25,value:e.hour,color:v.ink,fmt:_=>`${String(Math.floor(_)).padStart(2,"0")}:${String(Math.round(_%1*60)).padStart(2,"0")}`,oninput:_=>{e.hour=_,a(!1),M()},name:"nw-hour-sl"});let g=ct(i);function M(){let _=e.res;if(!_||!_.con){g.textContent="No feasible dispatch.",p.invalidate();return}let x=yn[e.sel],T=Math.floor(e.hour*4+1e-6)/4,w=e.day?`At ${String(Math.floor(T)).padStart(2,"0")}:${String(Math.round(T%1*60)).padStart(2,"0")}: wind ${s(e.hour).windN.toFixed(1)} GW, southern demand ${s(e.hour).loadS.toFixed(1)} GW. `:"";g.innerHTML=w+(e.mode==="nodal"?Math.max(..._.lmp)-Math.min(..._.lmp)<.5&&Math.max(..._.lmp)<999?`Every node pays <b>\u20AC${Math.max(0,Math.round(_.lmp[0]))}</b>: no line is holding power back, so there is one price.`:`Prices range from <b>\u20AC${Math.max(0,Math.round(Math.min(..._.lmp)))}</b> to <b>${Math.max(..._.lmp)>=999?"shortage":"\u20AC"+Math.max(..._.lmp).toFixed(0)}</b>. Where a line is full, the price on either side splits.`:`One price, <b>\u20AC${_.zonal.toFixed(0)}</b>, for everyone \u2014 and a redispatch bill of <b>\u20AC${(_.redispatchCost/1e3).toFixed(2)} m per hour</b> that lands in network tariffs.`)+` <span style="color:#777">Selected line: ${_n[x.from].name} \u2013 ${_n[x.to].name}.</span>`,p.invalidate()}es(i,p,u,"eu-network"),dn(i,"the wind is set exactly where the first line fills. Drag it down a notch and the four prices merge; push it up and they split further apart."),M(),i.__sim={st:e,recompute:a,upd:M}}var Tf=[[1892,515],[1970,9.7]],Th=[[1902,16.2],[1973,2.45],[1974,3.1],[1980,5.4],[2016,12.55],[2019,13.01],[2021,13.66],[2022,15.04],[2023,16],[2024,16.48],[2025,17.3]],Vs=[{id:"physics",name:"Physics",col:v.hot},{id:"scale",name:"Scale & demand",col:v.wind},{id:"fuel",name:"Fuel",col:v.gas},{id:"inst",name:"Institutions",col:v.nuclear}],Ef=[{y:1882,lane:"scale",t:"Pearl Street",d:"Edison\u2019s first central station in Manhattan: DC, a few hundred customers, a walkable service area."},{y:1925,lane:"physics",t:"~315 \xB0C steam",d:"Typical US steam inlet temperatures in the 1920s were around 600 \xB0F (\u2248315 \xB0C). Hotter steam means a higher Carnot ceiling."},{y:1949,lane:"scale",t:"Demand +7\xBE%/yr",d:"From 1949 to 1973 US electricity demand grew roughly 7\xBE% a year \u2014 doubling about every nine years \u2014 so every new plant could be bigger than the last."},{y:1962,lane:"physics",t:"538\u2013600 \xB0C plateau",d:"By the 1960s inlet temperatures reached ~1,000\u20131,100 \xB0F (538\u2013600 \xB0C) and stalled: the steels of the day could not take more heat without creep and corrosion."},{y:1968,lane:"scale",t:"Units > 1,000 MW",d:"Units pushed past ~1,000 MW ran into reliability, construction and maintenance problems; the economies of scale that had paid for decades of price cuts reversed (Hirsh\u2019s \u201Ctechnological stasis\u201D)."},{y:1970,lane:"inst",t:"Clean Air Act",d:"The 1970 Clean Air Act and its follow-ons required controls such as scrubbers \u2014 about 15% added to coal unit capital cost; with cooling towers about 20% (Joskow & Rose)."},{y:1973,lane:"fuel",t:"Oil embargo",d:"Oil was 16.9% of US generation in 1973 (314 of 1,861 TWh). Crude went from about $3 to $12 a barrel between Sept 1973 and Jan 1974, and fuel-adjustment clauses passed it straight through."},{y:1975,lane:"inst",t:"Nuclear schedules 7 \u2192 12 yrs",d:"Construction schedules for US reactors stretched from about 7 to 12 years; interest and escalation came to dominate costs. Why is contested \u2014 Cohen blames a regulatory ratchet, others legitimate safety learning; Lovering et al. show France and Korea fared better."},{y:1978,lane:"inst",t:"PURPA",d:"PURPA (1978) obliged utilities to buy power from independent producers \u2014 the first crack in the vertically integrated monopoly."},{y:1978.6,lane:"fuel",t:"Fuel Use Act",d:"The Powerplant and Industrial Fuel Use Act (1978) restricted new gas-fired power plants. It was repealed in 1987."},{y:1979,lane:"inst",t:"Three Mile Island",d:"The 1979 accident hardened the political climate for nuclear construction."},{y:1987,lane:"fuel",t:"FUA repealed",d:"Repeal of the Fuel Use Act re-opened gas for power generation; combined-cycle gas turbines arrived in the 1990s."},{y:1992,lane:"inst",t:"EPAct 1992",d:"The Energy Policy Act opened wholesale competition; organised markets such as PJM grew from here."},{y:2008,lane:"fuel",t:"Shale gas",d:"Shale gas pushed US gas prices down for a decade, and with them the marginal price of power."},{y:2010,lane:"physics",t:"Solar learning curve",d:"Solar module and project costs fell steeply; world-average solar LCOE fell from about $408/MWh in 2010 to about $43/MWh in 2025 (IRENA via OWID)."},{y:2022,lane:"fuel",t:"Gas crisis",d:"Europe\u2019s gas shock pushed German day-ahead prices to an August 2022 monthly average of \u20AC464/MWh."}];function Af(i){let e={year:1973},t=null,n=new Qe(i,{label:"Electricity prices since 1890 on a log scale, with four lanes of events: physics, scale, fuel and institutions",height:o=>o<600?570:540,draw(o,a,d){let c=a<600,p={l:c?40:56,r:a-16,t:28,b:c?230:250},u=Qt(1880,2027,p.l,p.r),h=D=>Math.log10(D),f=Qt(h(.5),h(800),p.b,p.t);for(let D of[.5,1,2,5,10,20,50,100,200,500]){let L=Math.round(f(h(D)))+.5;Me(o,p.l,L,p.r,L,D===.5?v.grid2:v.grid,1),X(o,D+"\xA2",p.l-6,L+4,{size:10.5,color:v.ink3,align:"right"})}for(let D of[1900,1920,1940,1960,1980,2e3,2020])X(o,D,u(D),p.b+15,{size:10.5,color:v.ink3,align:"center"});X(o,"US residential electricity, \xA2 per kWh (log scale)",p.l,p.t-12,{size:11,color:v.ink3,weight:500}),o.fillStyle=se(v.peaker,.07),o.fillRect(u(1970),p.t,u(1982)-u(1970),p.b-p.t);let[y,m]=Tf;$e(o,[[u(y[0]),f(h(y[1]))],[u(m[0]),f(h(m[1]))]],v.ink,2.4),Tf.forEach(([D,L])=>Ce(o,u(D),f(h(L)),4,v.ink)),X(o,"real price (2002 $), falling ~5% a year",u(1928),f(h(515/Math.pow(1.05,36)*1.8)),{size:11,color:v.ink,weight:600,halo:!0});let g=[];for(let D=1970;D<=2025;D+=1)g.push([u(D),f(h(9.7/Math.pow(1.05,D-1970)))]);$e(o,g,se(v.ink,.35),1.5,[4,4]),X(o,"if the old trend had continued",u(2024),f(h(9.7/Math.pow(1.05,54)))-8,{size:10.5,color:v.ink3,align:"right",halo:!0}),Th.forEach(([D,L],P)=>{Ce(o,u(D),f(h(L)),3.5,"#fff",v.price,2)}),$e(o,Th.slice(1,4).map(([D,L])=>[u(D),f(h(L))]),se(v.price,.6),1.4,[3,3]),$e(o,Th.slice(4).map(([D,L])=>[u(D),f(h(L))]),se(v.price,.6),1.4,[3,3]),X(o,"nominal",u(1902)+8,f(h(16.2))-6,{size:11,color:v.price,weight:600,halo:!0}),X(o,"1973: 2.5\xA2",u(1973)-6,f(h(2.45))+16,{size:10.5,color:v.price,weight:600,align:"right",halo:!0}),X(o,"2025: 17.3\xA2",u(2025),f(h(17.3))-9,{size:10.5,color:v.price,weight:600,align:"right",halo:!0});let M=p.b+34,_=c?40:46;Vs.forEach((D,L)=>{let P=M+L*_;o.fillStyle=se(D.col,.06),o.fillRect(p.l,P,p.r-p.l,_-6),X(o,D.name,p.l+4,P+12,{size:10.5,weight:650,color:ot(D.col,.2)})});let x=Ef.reduce((D,L)=>Math.abs(L.y-e.year)<Math.abs(D.y-e.year)?L:D);Ef.forEach(D=>{let L=Vs.findIndex(z=>z.id===D.lane),P=M+L*_+(_-6)/2+4,F=u(D.y),G=D===x;Ce(o,F,P,G?7:4.5,G?Vs[L].col:"#fff",Vs[L].col,2)});let T=u(e.year);Me(o,T,p.t,T,M+4*_-6,se(v.ink,.5),1.5),Pn(o,String(Math.round(e.year)),T,p.t+2,{align:"center",size:11});let w=M+4*_+8,E=Math.min(a-32,640),b=Ae(u(x.y)-E/2,16,a-16-E),S=x.d.split(" "),A=[],R="";for(let D of S){let L=R?R+" "+D:D;at(o,L,12)>E-24?(A.push(R),R=D):R=L}A.push(R);let I=30+A.length*17;He(o,b,w,E,I,8),o.fillStyle="#fff",o.fill(),o.strokeStyle=v.grid2,o.lineWidth=1,o.stroke();let O=Vs.findIndex(D=>D.id===x.lane);X(o,`${Math.floor(x.y)} \xB7 ${x.t}`,b+12,w+19,{size:12.5,weight:700,color:ot(Vs[O].col,.25)}),A.forEach((D,L)=>X(o,D,b+12,w+38+L*17,{size:12,color:v.ink2})),t={sx:u,box:p,lt:M,lh:_}}});n.interact({hit:(o,a)=>t&&o>=t.box.l&&o<=t.box.r&&a<t.lt+4*t.lh?{}:null,cursor:"ew-resize",down:(o,a)=>s(t.sx.inv(a)),move:(o,a)=>s(t.sx.inv(a))});let s=o=>{e.year=Ae(o,1880,2026),l.set(Math.round(e.year)),n.invalidate()},r=tt(i),l=Ie(r,{label:"Year",min:1880,max:2026,step:1,value:e.year,wide:!0,color:v.ink,fmt:o=>o,oninput:o=>{e.year=o,n.invalidate()},name:"year"})}function Rf(i){let e={engine:!1,fuel:!0,infl:!0,env:!0},t=1950,n=1990,s=a=>{let d=[],c=.45,p=.55;for(let u=t;u<=n;u+=.25){let h=u<1965||a.engine?1:0,f=.25;c*=Math.exp(-(h?.015:.002)*f),p*=Math.exp(-(h?.03:-.005)*f);let y=1,m=1,g=0;a.fuel&&u>=1973.7&&(y=1+1.3*Math.min(1,(u-1973.7)/1.5)*(u>1982?Math.max(.35,1-(u-1982)*.12):1)),a.infl&&u>=1969&&(m=1+.6*Math.min(1,(u-1969)/12)*(u>1984?Math.max(.5,1-(u-1984)*.08):1)),a.env&&u>=1971&&(g=.08*Math.min(1,(u-1971)/8)),d.push([u,c*y+p*m+g,c*y,p*m,g])}return d},r=new Qe(i,{label:"Illustrative toy model: an electricity cost index as engines of cheapening switch off and shocks switch on",height:a=>a<600?300:320,draw(a,d,c){let p={l:46,r:d-16,t:26,b:c-32},{sx:u,sy:h}=dt(a,{box:p,x0:t,x1:n,y0:0,y1:1.6,yticks:[0,.5,1,1.5],yfmt:_=>_.toFixed(1),xticks:[1950,1960,1970,1980,1990],ylabel:"real cost index (1950 = 1) \u2014 illustrative"}),f=s({engine:!0,fuel:!1,infl:!1,env:!1});$e(a,f.map(_=>[u(_[0]),h(_[1])]),se(v.ink,.25),1.6,[4,4]),X(a,"if nothing had changed",u(1982),h(f.find(_=>_[0]>=1982)[1])+16,{size:10.5,color:v.ink3});let y=s(e),m=[[2,v.gas,"fuel"],[3,v.network,"capital"],[4,v.nuclear,"retrofits"]],g=y.map(()=>0);for(let[_,x]of m){let T=y.map((w,E)=>g[E]+w[_]);a.beginPath(),y.forEach((w,E)=>E?a.lineTo(u(w[0]),h(T[E])):a.moveTo(u(w[0]),h(T[E])));for(let w=y.length-1;w>=0;w--)a.lineTo(u(y[w][0]),h(g[w]));a.closePath(),a.fillStyle=se(x,.22),a.fill(),g=T}$e(a,y.map(_=>[u(_[0]),h(_[1])]),v.ink,2.4),Me(a,u(1965),p.t,u(1965),p.b,se(v.ink,.3),1,[2,3]),X(a,"stasis begins",u(1965)+4,p.t+10,{size:10.5,color:v.ink3});let M=p.l+8;for(let[,_,x]of m)a.fillStyle=se(_,.5),a.fillRect(M,p.b-16,10,10),M+=14,X(a,x,M,p.b-7,{size:10.5,color:v.ink2}),M+=at(a,x,10.5)+12}}),l=tt(i,"chips"),o=(a,d,c)=>{let p=zt(l,d,()=>{e[a]=!e[a],p.setAttribute("aria-pressed",e[a]),r.invalidate()},{kind:"chip",color:c,name:a});p.setAttribute("aria-pressed",e[a])};o("engine","Efficiency & scale gains continue after 1965",v.storage),o("fuel","Oil & fuel shock 1973",v.gas),o("infl","Inflation & interest rates",v.network),o("env","Environmental retrofits",v.nuclear)}var xl=(i,e)=>{let t=e+273.15+5,n=i+273.15-5;return Ae(.5*t/Math.max(5,t-n),1,8)};function Cf(i){let e={tOut:2,tFlow:45,elec:37,gas:12,phase:0},t=new Qe(i,{label:"Heat pump explorer: efficiency versus outdoor and radiator temperature, and running cost compared with a gas boiler",height:a=>a<600?560:360,animated:!0,step(a){e.phase+=a*xl(e.tOut,e.tFlow)*.25},draw(a,d,c){let p=a.__cur==="USD"?an[2025]:1,u=a.__cur==="USD"?"US \xA2":"\u20AC ct",h=d<600,f=xl(e.tOut,e.tFlow),y=h?{x:16,y:16,w:d-32,h:220}:{x:16,y:20,w:d*.44,h:c-40},m=y.x+y.w*.52,g=y.y+y.h*.18,M=y.w*.44,_=y.h*.68;a.beginPath(),a.moveTo(m,g+_*.3),a.lineTo(m+M/2,g),a.lineTo(m+M,g+_*.3),a.lineTo(m+M,g+_),a.lineTo(m,g+_),a.closePath(),a.fillStyle=Ot("#f6e3d3","#e9c4a8",Ae((e.tFlow-30)/40,0,1)),a.fill(),a.strokeStyle=v.ink2,a.lineWidth=1.5,a.stroke(),X(a,`radiators ${e.tFlow} \xB0C`,m+M/2,g+_*.66,{size:11,align:"center",color:v.ink2,weight:600});let x=y.x+4,T=g+_*.48,w=y.w*.3,E=_*.42;He(a,x,T,w,E,6),a.fillStyle="#e8eaec",a.fill(),a.strokeStyle=v.ink3,a.stroke();let b=x+w/2,S=T+E/2,A=Math.min(w,E)*.36;Ce(a,b,S,A,"#fff",v.ink3,1);for(let V=0;V<3;V++){let U=e.phase*6+V*2.094;a.beginPath(),a.ellipse(b+Math.cos(U)*A*.45,S+Math.sin(U)*A*.45,A*.5,A*.18,U,0,Math.PI*2),a.fillStyle=se(v.ink3,.5),a.fill()}X(a,`outside ${e.tOut} \xB0C`,x+w/2,h?T-7:T+E+16,{size:11,align:"center",color:v.cold,weight:600});let R=y.y+y.h-(h?2:6),I=Math.min(26,(y.w-20)/(f+2)),O=y.x+4;a.fillStyle=v.electron,a.fillRect(O,R-14,I,12),a.fillStyle=se(v.cold,.35),a.fillRect(O+I,R-14,I*(f-1),12),X(a,"1 kWh electricity",O,R-20,{size:10.5,color:v.electron,weight:600}),X(a,`+ ${(f-1).toFixed(1)} kWh from outside air = ${f.toFixed(1)} kWh heat`,O+I+4,R+12,{size:10.5,color:v.ink2});for(let V=0;V<10;V++){let U=(e.phase*.5+V/10)%1,H=Xt(x+w,m,U),K=Xt(S,g+_*.75,U)-Math.sin(U*Math.PI)*12;Ce(a,H,K,3,Ot(v.cold,v.hot,U))}let D=h?{l:46,r:d-16,t:280,b:c-34}:{l:d*.52,r:d-16,t:30,b:c-34},{sx:L,sy:P}=dt(a,{box:D,x0:-15,x1:15,y0:0,y1:40,yticks:[0,10,20,30,40].filter(V=>V/p<=40.01).map(V=>V/p),yfmt:V=>String(Math.round(V*p)),xticks:[-15,-10,-5,0,5,10,15],xfmt:V=>V+"\xB0",ylabel:`${u} per kWh of heat`,xlabel:"outdoor temperature"}),F=e.gas/.9;Me(a,D.l,P(F),D.r,P(F),v.gas,2.2),X(a,`gas boiler ${(F*p).toFixed(1)} ${u}`,D.r-4,P(F)+(e.elec/f>F?15:-6),{size:11,align:"right",color:ot(v.gas,.15),weight:600,halo:!0});let G=[];for(let V=-15;V<=15;V+=.5)G.push([L(V),P(Ae(e.elec/xl(V,e.tFlow),0,40))]);$e(a,G,v.electron,2.4);let z=e.elec/f;Ce(a,L(e.tOut),P(Math.min(40,z)),5.5,v.electron,"#fff",2),X(a,`heat pump ${(z*p).toFixed(1)} ${u}`,L(e.tOut)+9,P(Math.min(40,z))+(z>F?-10:16),{size:11,color:v.electron,weight:650,halo:!0})}}),n=tt(i),s={};s.tOut=Ie(n,{label:"Outdoor temperature",min:-15,max:15,step:1,value:e.tOut,color:v.cold,fmt:a=>a+" \xB0C",oninput:a=>{e.tOut=a,o()},name:"tout"}),Ie(n,{label:"Radiator (flow) temperature",min:30,max:70,step:1,value:e.tFlow,color:v.hot,fmt:a=>a+" \xB0C",oninput:a=>{e.tFlow=a,o()},name:"tflow"});let r={de:{elec:37,gas:12,tOut:2},uk:{elec:31,gas:7.4,tOut:5},us:{elec:15.3,gas:4.5,tOut:0}};rt(n,{label:"Household prices",options:[{label:"Germany",value:"de",name:"hp-de"},{label:"UK",value:"uk",name:"hp-uk"},{label:"US",value:"us",name:"hp-us"}],value:"de",onchange:a=>{Object.assign(e,r[a]);for(let d in s)s[d].set(e[d]);o()}}),s.elec=Ie(n,{label:"Electricity price",min:10,max:50,step:.5,value:e.elec,color:v.electron,fmt:a=>a.toFixed(1)+" ct/kWh",oninput:a=>{e.elec=a,o()},name:"elec"}),s.gas=Ie(n,{label:"Gas price <small>(set your own)</small>",min:4,max:25,step:.5,value:e.gas,color:v.gas,fmt:a=>a.toFixed(1)+" ct/kWh",oninput:a=>{e.gas=a,o()},name:"gas"});let l=ct(i);function o(){let a=xl(e.tOut,e.tFlow),d=e.elec/(e.gas/.9);l.innerHTML=`COP <b>${a.toFixed(1)}</b>. The heat pump beats the boiler whenever its COP exceeds <b>${d.toFixed(1)}</b> \u2014 the ratio of the electricity price to the cost of heat from gas. ${d>3.5?"At these prices, that is a high bar: <i>the price ratio, not the physics, decides.</i>":""}`,t.invalidate()}es(i,t,n,"eu-heatpump"),o()}var Ny=i=>{let e=[.38,.3,.09,.05,.04,.07,.33],t=Math.floor(i),n=i-t,s=e[Ae(t,0,6)],r=e[Ae(t+1,0,6)];return Xt(s,r,n*n*(3-2*n))};function Pf(i){let e={today:{wind:70,solar:100,firm:75,sGW:15,sGWh:30},vre:{wind:160,solar:250,firm:30,sGW:40,sGWh:160},ldes:{wind:160,solar:250,firm:30,sGW:40,sGWh:2500},firm:{wind:160,solar:250,firm:65,sGW:40,sGWh:160}},t={...e.vre,preset:"vre"},n=null,s=()=>{let p=[],u=t.sGWh*.9,h=0,f=0,y=0,m=0;for(let g=0;g<168;g++){let M=g%24,_=g/24,x=uh(M+.5,"winter",Math.floor(_)>=5)*1.15,T=t.wind*Ny(_)*(1+.1*Math.sin(g*.37)),w=t.solar*dh(M+.5,"winter")*.45,E=x-T-w,b={i:g,D:x,W:Math.min(T,x),S:0,F:0,Sd:0,U:0,ch:0};if(b.S=Math.max(0,Math.min(w,x-b.W)),E<=0){let S=Math.min(-E,t.sGW,(t.sGWh-u)/.85);u+=S*.85,b.ch=S,y+=-E-S}else{if(b.F=Math.min(E,t.firm),E-=b.F,E>0)b.Sd=Math.min(E,t.sGW,u),u-=b.Sd,E-=b.Sd;else{let S=t.firm-b.F,A=Math.min(S,t.sGW,(t.sGWh-u)/.85);u+=A*.85,b.ch=A}b.U=Math.max(0,E),b.U>.01&&f++,h+=b.U}m+=b.F,b.soc=u,p.push(b)}n={out:p,uns:h,unsH:f,curt:y,firmE:m}};s();let r=new Qe(i,{label:"A winter week with a four-day wind lull: generation, storage and firm capacity against demand, and any demand left unserved",height:c=>c<600?460:420,draw(c,p,u){let h={l:50,r:p-16,t:28,b:u*.68},{sx:f,sy:y}=dt(c,{box:h,x0:0,x1:168,y0:0,y1:100,xticks:[0,24,48,72,96,120,144,168],xfmt:w=>w===168?"":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][w/24],yticks:[0,25,50,75,100],yfmt:w=>w+" GW",ylabel:"supply and demand (illustrative)"});c.fillStyle=se(v.ink,.05),c.fillRect(f(52),h.t,f(140)-f(52),h.b-h.t),X(c,"dark, still: the Dunkelflaute",f(56),h.t+12,{size:10.5,color:v.ink3,weight:600});let m=n.out,g=m.map(()=>0);for(let[w,E]of[["W",v.wind],["S",v.solar],["F",v.gas],["Sd",v.storage],["U",v.peaker]]){let b=m.map((S,A)=>g[A]+S[w]);c.beginPath(),m.forEach((S,A)=>{c.lineTo(f(A),y(b[A])),c.lineTo(f(A+1),y(b[A]))});for(let S=m.length-1;S>=0;S--)c.lineTo(f(S+1),y(g[S])),c.lineTo(f(S),y(g[S]));c.closePath(),c.fillStyle=w==="U"?v.peaker:se(E,.8),c.fill(),g=b}$e(c,m.map((w,E)=>[f(E+.5),y(w.D)]),v.ink,1.6),Me(c,h.l,y(t.firm),h.r,y(t.firm),se(v.gas,.9),1,[5,4]),X(c,`firm capacity ${t.firm} GW`,h.r-4,Math.min(y(t.firm)-5,h.b-26),{size:10.5,color:ot(v.gas,.2),align:"right",halo:!0});let M={l:h.l,r:h.r,t:h.b+34,b:u-22},_=dt(c,{box:M,x0:0,x1:168,y0:0,y1:Math.max(1,t.sGWh),xticks:[],yticks:[0,Math.max(1,t.sGWh)],yfmt:w=>w>=1e3?(w/1e3).toFixed(1)+" TWh":w.toFixed(0)+" GWh",ylabel:"storage state of charge"});c.beginPath(),m.forEach((w,E)=>c.lineTo(_.sx(E+1),_.sy(w.soc))),c.lineTo(_.sx(168),_.sy(0)),c.lineTo(_.sx(0),_.sy(0)),c.closePath(),c.fillStyle=se(v.storage,.25),c.fill(),$e(c,m.map((w,E)=>[_.sx(E+1),_.sy(w.soc)]),v.storage,1.8);let x=h.l+8,T=h.b-10;for(let[w,E]of[["wind",v.wind],["solar",v.solar],["firm",v.gas],["storage",v.storage],["unserved",v.peaker]])c.fillStyle=E,c.fillRect(x,T-8,10,10),x+=14,X(c,w,x,T+1,{size:10.5,color:v.ink2,halo:!0}),x+=at(c,w,10.5)+12}}),l=tt(i),o={};rt(l,{options:[{label:"Today-ish",value:"today"},{label:"Lots of wind & solar, little firm",value:"vre"},{label:"+ multi-day storage",value:"ldes"},{label:"+ firm backup",value:"firm"}],value:"vre",onchange:c=>{Object.assign(t,e[c]);for(let p in o)o[p].set(t[p]);s(),d()},name:"preset"}),o.wind=Ie(l,{label:"Wind capacity",min:0,max:250,step:5,value:t.wind,color:v.wind,fmt:c=>c+" GW",oninput:c=>{t.wind=c,s(),d()}}),o.solar=Ie(l,{label:"Solar capacity",min:0,max:400,step:10,value:t.solar,color:v.solar,fmt:c=>c+" GW",oninput:c=>{t.solar=c,s(),d()}}),o.firm=Ie(l,{label:"Firm capacity <small>(gas, hydro, imports\u2026)</small>",min:0,max:100,step:1,value:t.firm,color:v.gas,fmt:c=>c+" GW",oninput:c=>{t.firm=c,s(),d()},name:"firm"}),o.sGW=Ie(l,{label:"Storage power",min:0,max:80,step:1,value:t.sGW,color:v.storage,fmt:c=>c+" GW",oninput:c=>{t.sGW=c,s(),d()}}),o.sGWh=Ie(l,{label:"Storage energy",min:0,max:4e3,step:10,value:t.sGWh,color:v.storage,fmt:c=>c>=1e3?(c/1e3).toFixed(2)+" TWh":c+" GWh",oninput:c=>{t.sGWh=c,s(),d()}});let a=ct(i);function d(){let c=n.out.reduce((p,u)=>p+u.D,0);a.innerHTML=n.uns>.5?`<b style="color:${v.peaker}">${n.uns.toFixed(0)} GWh unserved</b> over ${n.unsH} hours (${(n.uns/c*100).toFixed(1)}% of the week\u2019s demand). Storage hours: ${(t.sGWh/Math.max(1,t.sGW)).toFixed(0)}.`:`<b style="color:${v.storage}">Demand met every hour.</b> Firm plants ran for ${(n.firmE/1e3).toFixed(1)} TWh; ${(n.curt/1e3).toFixed(1)} TWh of wind and solar had nowhere to go.`,r.invalidate()}d()}var Hs={pvModule:[[1975,132.3757,54e-5],[1976,99.5976,.00108],[1977,72.6611,.00216],[1978,51.4082,.00351],[1979,43.1951,.005235],[1980,36.605,.007965],[1981,29.2664,.01288],[1982,26.2952,.01941],[1983,21.2281,.02925],[1984,19.725,.0467],[1985,17.2204,.06646],[1986,14.2447,.08915],[1987,12.1104,.1137],[1988,11.3116,.1406],[1989,11.6901,.1734],[1990,12.0911,.2123],[1991,11.2008,.2571],[1992,10.4351,.309],[1993,9.7587,.3659],[1994,9.2315,.4238],[1995,8.5355,.4893],[1996,7.9798,.565],[1997,7.952,.6508],[1998,7.1656,.771],[1999,6.6193,.9145],[2e3,6.4959,1.103],[2001,6.2844,1.373],[2002,5.7473,1.738],[2003,5.4638,2.229],[2004,4.6955,2.916],[2005,4.7457,4.391],[2006,5.1727,5.912],[2007,5.2111,8.266],[2008,4.7492,14.45],[2009,3.1743,22.48],[2010,2.5118,39.85],[2011,2.0609,70.43],[2012,1.1107,99.54],[2013,.8566,134.7],[2014,.7905,173],[2015,.7357,220.2],[2016,.6803,291.7],[2017,.5714,384.9],[2018,.5091,479],[2019,.4669,580.5],[2020,.3697,710.7],[2021,.3319,854.8],[2022,.3658,1046],[2023,.3218,1411],[2024,.2652,1867]],pvLcoe:[[2010,407.7,41.49],[2011,343.8,72.66],[2012,259.8,102.82],[2013,202.6,139.69],[2014,180.8,178.85],[2015,133.7,226.6],[2016,117.4,298.51],[2017,93.6,392.34],[2018,79.2,487.85],[2019,68.5,590.12],[2020,60.8,721.22],[2021,54.3,865.92],[2022,50.5,1057.87],[2023,42.6,1423.99],[2024,43,1883.18],[2025,43.5,2396.71]],windLcoe:[[2e3,183.9,16.96],[2001,161.4,23.95],[2002,149.2,30.72],[2003,130.7,38.66],[2004,132.9,47.66],[2005,124.5,58.46],[2006,128.1,73.14],[2007,116.6,91.52],[2008,122.8,115.47],[2009,120.4,150.1],[2010,113.6,180.84],[2011,107.7,220.18],[2012,98.8,266.94],[2013,99,299.76],[2014,87.6,349.49],[2015,76,416.38],[2016,69.8,467.32],[2017,64.8,514.97],[2018,55.6,563.52],[2019,49.3,623.08],[2020,40.9,733.27],[2021,36.1,824.19],[2022,34,903.01],[2023,33.1,1018.32],[2024,34.3,1132.59],[2025,32.9,1291.02]],energyShare:[[1970,7.7],[1975,10.2],[1980,13.1],[1981,13.3],[1982,12.8],[1983,11.5],[1984,10.8],[1985,10.1],[1986,8.4],[1987,8.2],[1988,7.9],[1989,7.8],[1990,8],[1991,7.7],[1992,7.3],[1993,7.2],[1994,6.9],[1995,6.7],[1996,6.9],[1997,6.6],[1998,5.8],[1999,5.8],[2e3,6.7],[2001,6.6],[2002,6.1],[2003,6.6],[2004,7.1],[2005,8],[2006,8.4],[2007,8.5],[2008,9.5],[2009,7.4],[2010,8.1],[2011,8.9],[2012,8.3],[2013,8.2],[2014,7.9],[2015,6.2],[2016,5.5],[2017,5.8],[2018,6.2],[2019,5.7],[2020,4.7],[2021,5.6],[2022,6.6],[2023,5.6],[2024,5.2]]},If=[[1969.92,1970.83],[1973.83,1975.17],[1980,1980.5],[1981.5,1982.83],[1990.5,1991.17],[2001.17,2001.83],[2007.92,2009.42],[2020.08,2020.25]];var Rt=Math.log10;function Xr(i){let e=i.length,t=0,n=0,s=0,r=0;for(let[a,d]of i){let c=Rt(a),p=Rt(d);t+=c,n+=p,s+=c*c,r+=c*p}let l=(e*r-t*n)/(e*s-t*t);return{a:(n-l*t)/e,b:l,lr:1-Math.pow(2,l)}}var Sl=i=>i>=1e3?(i/1e3).toFixed(i>=1e4?0:1)+" TW":i>=1?i.toFixed(i>=100||i>=10?0:1)+" GW":(i*1e3).toFixed(i*1e3>=10?0:1)+" MW",Lf={module:{name:"Solar modules",unit:"$/W",fmt:i=>i>=10?"$"+i.toFixed(0)+"/W":i>=1?"$"+i.toFixed(1)+"/W":"$"+i.toFixed(2)+"/W",pts:Hs.pvModule.map(([i,e,t])=>[t,e,i]),col:v.solar,what:"module price (2025 US$ per watt)",capWhat:"cumulative solar PV installed worldwide",recent:2010},pv:{name:"Solar electricity",unit:"$/MWh",fmt:i=>"$"+i.toFixed(0)+"/MWh",pts:Hs.pvLcoe.map(([i,e,t])=>[t,e,i]),col:ot(v.solar,.15),what:"global average LCOE of new utility PV (2025 US$/MWh)",capWhat:"cumulative solar PV installed worldwide",recent:2016},wind:{name:"Onshore wind electricity",unit:"$/MWh",fmt:i=>"$"+i.toFixed(0)+"/MWh",pts:Hs.windLcoe.map(([i,e,t])=>[t,e,i]),col:v.wind,what:"global average LCOE of new onshore wind (2025 US$/MWh)",capWhat:"cumulative wind installed worldwide (on- and offshore)",recent:2015}};function Df(i){let e={s:"module",win:"all",lr:null,mult:4,hover:null},t=()=>Lf[e.s],n=()=>t().pts.filter(c=>e.win==="all"||c[2]>=t().recent),s=null,r=new Qe(i,{label:"Learning curves: the cost of solar modules, solar electricity and wind electricity against cumulative installed capacity on logarithmic axes, with a fitted learning rate and an adjustable projection",height:c=>c<600?440:Math.max(380,Math.min(460,c*.5)),draw(c,p,u){let h=t(),f=h.pts,y=Xr(n()),m=e.lr??y.lr,g=f[f.length-1],M=g[0]*Math.max(e.mult,1)*1.6,_=f.map(H=>H[0]),x=f.map(H=>H[1]),T=Math.pow(10,Math.floor(Rt(Math.min(..._)))),w=Math.pow(10,Math.ceil(Rt(M))),E=g[1]*Math.pow(1-Math.min(.45,m+.05),Math.log2(e.mult)),b=Math.pow(10,Math.floor(Rt(Math.min(...x,E)*.9))),S=Math.pow(10,Math.ceil(Rt(Math.max(...x)*1.05))),A={l:62,r:p-18,t:34,b:u-44},R=H=>A.l+(Rt(H)-Rt(T))/(Rt(w)-Rt(T))*(A.r-A.l),I=H=>A.b-(Rt(H)-Rt(b))/(Rt(S)-Rt(b))*(A.b-A.t);R.inv=H=>Math.pow(10,Rt(T)+(H-A.l)/(A.r-A.l)*(Rt(w)-Rt(T))),s={sx:R,sy:I,box:A},c.save(),c.lineWidth=1;for(let H=Rt(b);H<=Rt(S)+1e-9;H++)for(let K of[1,2,5]){let ce=K*Math.pow(10,H);if(ce>S*1.0001)continue;let Z=Math.round(I(ce))+.5;c.strokeStyle=K===1?v.grid2:v.grid,Me(c,A.l,Z,A.r,Z,K===1?v.grid2:se(v.grid,.8),1),(K===1||Rt(S)-Rt(b)<=2)&&X(c,h.fmt(ce).replace("/MWh","").replace("/W",""),A.l-6,Z+4,{size:11,color:v.ink3,align:"right"})}{let H=R(10)-R(1),K=Math.max(1,Math.ceil(50/H));for(let ce=Rt(T);ce<=Rt(w)+1e-9;ce++){let Z=Math.pow(10,ce),Y=Math.round(R(Z))+.5;Me(c,Y,A.t,Y,A.b,v.grid,1),Math.round(ce)%K===0&&X(c,Sl(Z),Y,A.b+15,{size:11,color:v.ink3,align:"center"})}}if(c.restore(),Me(c,A.l,A.b+.5,A.r,A.b+.5,v.grid2,1),X(c,h.what,A.l-4,A.t-12,{size:11,color:v.ink3,weight:500}),X(c,h.capWhat+" (log scale)",A.r,A.b+32,{size:11,color:v.ink3,weight:500,align:"right"}),e.win!=="all"){let H=R(f.find(K=>K[2]>=h.recent)[0]);c.fillStyle=se(h.col,.06),c.fillRect(H,A.t,R(g[0])-H,A.b-A.t)}let O=n(),D=H=>Math.pow(10,y.a+y.b*Rt(H));$e(c,[[R(O[0][0]),I(D(O[0][0]))],[R(g[0]),I(D(g[0]))]],se(v.ink,.55),1.5,[5,4]);let L=Math.max(0,m-.05),P=Math.min(.6,m+.05),F=(H,K)=>g[1]*Math.pow(1-H,Math.log2(K));if(e.mult>1){let K=[],ce=[],Z=[];for(let B=0;B<=30;B++){let N=Math.pow(e.mult,B/30),q=g[0]*N;K.push([R(q),I(F(L,N))]),ce.push([R(q),I(F(P,N))]),Z.push([R(q),I(F(m,N))])}c.beginPath(),K.forEach(([B,N],q)=>q?c.lineTo(B,N):c.moveTo(B,N));for(let B=ce.length-1;B>=0;B--)c.lineTo(ce[B][0],ce[B][1]);c.closePath(),c.fillStyle=se(h.col,.14),c.fill(),$e(c,Z,h.col,2.2,[6,4]);let Y=Z[30];Ce(c,Y[0],Y[1],5,"#fff",h.col,2);{let B=`${h.fmt(F(m,e.mult))} at ${Sl(g[0]*e.mult)}?`,N=at(c,B,11.5,650),q=Y[0]+10+N<A.r;X(c,B,q?Y[0]+10:Y[0]-8,Math.min(A.b-6,q?Y[1]+4:Y[1]+22),{size:11.5,weight:650,color:ot(h.col,.25),align:q?"left":"right",halo:!0})}}let G=f[0][2],z=g[2];$e(c,f.map(H=>[R(H[0]),I(H[1])]),se(h.col,.5),1.2);for(let H of f){let K=(H[2]-G)/Math.max(1,z-G);Ce(c,R(H[0]),I(H[1]),H===e.hover?5.5:3.6,Ot(St(h.col,.45),ot(h.col,.35),K),H===e.hover?v.ink:"#fff",1)}let V=new Set([f[0][2],g[2],...[1980,1990,2e3,2010,2015,2020].filter(H=>H>f[0][2]+3&&H<g[2]-2)]),U=-1e9;for(let H of f)if(V.has(H[2])){let K=R(H[0]);if(K-U<34&&H!==g)continue;U=K,X(c,String(H[2]),K+6,I(H[1])-7,{size:10.5,color:v.ink2,weight:600,halo:!0})}if(X(c,`fitted learning rate ${(y.lr*100).toFixed(0)}% per doubling (${e.win==="all"?`${O[0][2]}\u2013${g[2]}`:`since ${h.recent}`})`,A.r-4,A.t+4,{size:11,color:v.ink2,align:"right",weight:600,halo:!0}),e.hover){let H=e.hover,K=`${H[2]}: ${h.fmt(H[1])} \xB7 ${Sl(H[0])} installed`,ce=at(c,K,11.5,600)+16,Z=Ae(R(H[0])+10,A.l,A.r-ce),Y=I(H[1])+12;He(c,Z,Y,ce,22,6),c.fillStyle=se("#fff",.95),c.fill(),c.strokeStyle=v.grid2,c.stroke(),X(c,K,Z+8,Y+15,{size:11.5,weight:600,color:v.ink})}}});r.interact({hit:(c,p)=>{if(!s)return null;let u=null,h=18;for(let f of t().pts){let y=Math.hypot(s.sx(f[0])-c,s.sy(f[1])-p);y<h&&(h=y,u=f)}return u},cursor:"pointer",hover:c=>{e.hover=c}});let l=tt(i),o=ct(i),a=()=>{let c=t(),p=Xr(n()),u=e.lr??p.lr,h=c.pts[c.pts.length-1],f=c.pts[0],y=h[1]*Math.pow(1-u,Math.log2(e.mult));o.innerHTML=`From ${f[2]} to ${h[2]}, ${c.name.toLowerCase()} fell from <b>${c.fmt(f[1])}</b> to <b>${c.fmt(h[1])}</b> while capacity grew ${(()=>{let m=h[0]/f[0];return m>=1e6?(m/1e6).toPrecision(2)+" million":m>=1e4?Math.round(m/1e3).toLocaleString("en-US")+",000":Math.round(m).toLocaleString("en-US")})()}-fold. The fitted curve says each doubling cut the cost by <b>${(p.lr*100).toFixed(0)}%</b>. `+(e.mult>1?`<i>If</i> a ${(u*100).toFixed(0)}% rate held for ${Math.log2(e.mult).toFixed(0)} more doubling${e.mult>2?"s":""} (to ${Sl(h[0]*e.mult)}), the cost would be about <b>${c.fmt(y)}</b> \u2014 an extrapolation, not a forecast.`:""),r.invalidate()};rt(l,{options:Object.entries(Lf).map(([c,p])=>({label:p.name,value:c,name:c})),value:e.s,onchange:c=>{e.s=c,e.lr=null,d.set(Math.round(Xr(n()).lr*100)),a()}}),rt(l,{label:"Fit",options:[{label:"All years",value:"all"},{label:"Recent",value:"recent"}],value:e.win,onchange:c=>{e.win=c,e.lr=null,d.set(Math.round(Xr(n()).lr*100)),a()}});let d=Ie(l,{label:"Learning rate for the projection",min:0,max:40,step:1,value:Math.round(Xr(n()).lr*100),color:v.ink2,fmt:c=>c+"% per doubling",oninput:c=>{e.lr=c/100,a()},name:"lr"});Ie(l,{label:"Future capacity",min:0,max:4,step:1,value:2,color:v.solar,fmt:c=>c===0?"today":`\xD7${2**c} today`,oninput:c=>{e.mult=2**c,a()},name:"mult"}),a()}var qr=[{name:"Vogtle 3 & 4",where:"USA \xB7 2 \xD7 AP1000 \xB7 2.2 GW",first:14,latest:35,unit:"$bn",basis:"total project cost, nominal",status:"online 2023\u201324, ~7 years late",n:21},{name:"Flamanville 3",where:"France \xB7 EPR \xB7 1.6 GW",first:3.3,latest:13.2,unit:"\u20ACbn",basis:"construction only; \u20AC23.7bn (2023 \u20AC) with financing",status:"grid-connected Dec 2024, ~12 years late",n:22},{name:"Hinkley Point C",where:"UK \xB7 2 \xD7 EPR \xB7 3.3 GW",first:18,latest:35,unit:"\xA3bn",basis:"2015 \xA3, excl. interest",status:"unit 1 now expected 2030 (was 2025)",n:23},{name:"NuScale / UAMPS",where:"USA \xB7 6 \xD7 77 MW SMR",first:58,latest:89,unit:"$/MWh",basis:"target power price, after subsidies",status:"cancelled Nov 2023 before construction",n:24},{name:"Darlington BWRX-300",where:"Canada \xB7 4 \xD7 300 MW SMR",first:20.9,latest:null,unit:"C$bn",basis:"4 units, 2024 C$, incl. interest & contingency",status:"unit 1 under construction, due 2030",n:25}];function Nf(i){let e=-1,t=new Qe(i,{label:"How the cost estimates of recent nuclear projects grew between first estimate and latest figure: Vogtle, Flamanville 3, Hinkley Point C, NuScale UAMPS, and the Darlington SMR budget",height:n=>n<600?470:330,draw(n,s,r){let l=s<600,o=l?{l:14,r:s-16,t:44,b:r-34}:{l:230,r:s-150,t:40,b:r-34},a=c=>o.l+Rt(c)/Rt(6)*(o.r-o.l),d=(o.b-o.t)/qr.length;for(let c of[1,1.5,2,3,4,6]){let p=Math.round(a(c))+.5;Me(n,p,o.t-6,p,o.b,c===1?v.grid2:v.grid,1),X(n,`\xD7${c}`,p,o.b+16,{size:11,color:v.ink3,align:"center"})}if(X(n,"latest figure \xF7 first estimate (log scale)",o.l,o.t-22,{size:11,color:v.ink3,weight:500}),qr.forEach((c,p)=>{let u=o.t+d*(p+.5)+(l?8:0);p===e&&(n.fillStyle=se(v.nuclear,.06),n.fillRect(l?0:8,o.t+d*p,s-(l?0:16),d));let h=l?o.l:14,f=l?u-16:u-3;if(X(n,c.name,h,f,{size:12.5,weight:650,color:v.ink}),l||X(n,c.where,h,f+15,{size:10.5,color:v.ink3}),c.latest==null){Ce(n,a(1),u,6,"#fff",v.nuclear,2),X(n,`budget C$${c.first}bn \u2014 no outturn yet`,a(1)+12,u+4,{size:11,color:v.ink2,weight:600});return}let y=c.latest/c.first;Me(n,a(1),u,a(y),u,se(v.nuclear,.55),5),Ce(n,a(1),u,5,"#fff",v.nuclear,2),Ce(n,a(y),u,6,v.nuclear,"#fff",2);let m=`${c.unit.startsWith("$/")?"$"+c.first+"\u2192$"+c.latest+"/MWh":(c.unit==="$bn"?"$":c.unit[0])+c.first+"bn \u2192 "+(c.unit==="$bn"?"$":c.unit[0])+c.latest+"bn"}  \xD7${y.toFixed(1)}`;X(n,m,a(y)+11,u+4,{size:11,weight:650,color:ot(v.nuclear,.25)}),l||X(n,c.status,a(y)+11,u+18,{size:10,color:v.ink3})}),e>=0){let c=qr[e],p=`${c.name}: ${c.basis}. ${c.status}.`;X(n,p,l?o.l:14,r-8,{size:10.5,color:v.ink2})}}});t.interact({hit:(n,s)=>{let l=t.w<600?44:40,o=t.h-34,a=Math.floor((s-l)/((o-l)/qr.length));return a>=0&&a<qr.length?{i:a}:null},cursor:"help",hover:n=>{e=n?n.i:-1}})}function Uy(i){return()=>{i|=0,i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Oi=8760,Fy=(()=>{let i=Uy(20261009),e=()=>{let u=0,h=0;for(;!u;)u=i();return h=i(),Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*h)},t=new Float32Array(Oi),n=new Float32Array(Oi),s=new Float32Array(Oi),r=51*Math.PI/180,l=0,o=0,a=Math.exp(-1/40),d=new Float32Array(365);for(let u=0;u<365;u++){l=.6*l+.8*e();let h=.5+.5*Math.cos(2*Math.PI*(u-10)/365);d[u]=Ae(.62-.22*h+.22*l,.08,1)}for(let u=0;u<Oi;u++){let h=Math.floor(u/24),f=u%24,y=(h+3)%7,m=y>=5,g=Math.cos(2*Math.PI*(h-15)/365),M=.82+.14*Math.exp(-((f-11)**2)/18)+.16*Math.exp(-((f-18.5)**2)/6)+(f>=7&&f<=20?.08:0);t[u]=58*(1+.13*g)*M*(m?.88:1);let _=23.44*Math.PI/180*Math.sin(2*Math.PI*(284+h)/365),x=(f+.5-12.5)*15*Math.PI/180,T=Math.sin(r)*Math.sin(_)+Math.cos(r)*Math.cos(_)*Math.cos(x);n[u]=T>0?Math.pow(T,1.25)*d[h]:0,o=a*o+Math.sqrt(1-a*a)*e();let w=Math.exp(.55*o)*(1+.28*g);s[u]=Ae(.06+.33*w**2.2/(1+.25*w**2.2)*1.2,0,.95)}for(let u=384;u<528;u++)s[u]*=.15,n[u]*=.35;let c=(u,h)=>{let f=0;for(let m of u)f+=m;let y=h*Oi/f;for(let m=0;m<Oi;m++)u[m]=Math.min(1,u[m]*y)};c(n,.105),c(s,.27);let p=0;for(let u of t)p+=u;return{dem:t,sol:n,win:s,D:p}})(),Yr=(i,e)=>i*(1+i)**e/((1+i)**e-1),Jt={solar:{capex:1150,life:30,fom:15},wind:{capex:1500,life:25,fom:40},gas:{capex:1300,life:30,fom:25,fuel:3.5*6.4+4,co2:.34},batt:{kw:200,kwh:250,life:20},nuc:{life:40,fom:130,vom:10,avail:.9}};function ky(i){let{dem:e,sol:t,win:n,D:s}=Fy,r=.85,l=i.bGW*i.bH,o=l*.5,a=0,d=0,c=0,p=0,u=0,h=0,f=0,y=0,m=new Float32Array(365*7),g=i.keepHourly?new Float32Array(Oi*8):null;for(let E=0;E<Oi;E++){let b=e[E],S=Math.min(i.nGW*Jt.nuc.avail,b),A=i.sGW*t[E],R=i.wGW*n[E],I=b-S-A-R,O=0,D=0,L=0,P=0,F=0,G=A,z=R;if(I<0){O=Math.min(-I,i.bGW,(l-o)/r),o+=O*r,F=-I-O;let U=A+R||1;G=A-F*A/U,z=R-F*R/U}else{D=Math.min(I,i.bGW,o),o-=D;let U=I-D;L=Math.min(U,i.gGW),P=U-L}if(i.gGW>L&&o<l*.3&&I>0){let U=Math.min(i.gGW-L,i.bGW-D,(l*.3-o)/r);U>0&&(L+=U,o+=U*r)}a+=F,d+=P,P>.05&&c++,p+=L,u+=S,h+=G,f+=z,y+=D;let V=Math.floor(E/24)*7;if(m[V]+=S,m[V+1]+=z,m[V+2]+=G,m[V+3]+=D,m[V+4]+=L,m[V+5]+=F,m[V+6]+=P,g){let U=E*8;g[U]=S,g[U+1]=z,g[U+2]=G,g[U+3]=D,g[U+4]=L,g[U+5]=F,g[U+6]=b,g[U+7]=l>0?o/l:0}}let M=i.wacc,_={solar:i.sGW*(Jt.solar.capex*Yr(M,Jt.solar.life)+Jt.solar.fom),wind:i.wGW*(Jt.wind.capex*Yr(M,Jt.wind.life)+Jt.wind.fom),nuclear:i.nGW*(i.nucCapex*Yr(M,Jt.nuc.life)+Jt.nuc.fom)+u*Jt.nuc.vom/1e3,storage:(i.bGW*Jt.batt.kw+l*Jt.batt.kwh)*(Yr(M,Jt.batt.life)+.025),gasFixed:i.gGW*(Jt.gas.capex*Yr(M,Jt.gas.life)+Jt.gas.fom),gasFuel:p*((i.gasPrice??3.5)*6.4+4)/1e3,carbon:p*Jt.gas.co2*i.co2/1e3},x=s-d,T=Object.values(_).reduce((E,b)=>E+b,0),w={};for(let E in _)w[E]=_[E]/x*1e3;return{day:m,hourly:g,curt:a,uns:d,unsH:c,gasE:p,nucE:u,solE:h,winE:f,disE:y,D:s,served:x,perMWh:w,total:T/x*1e3,curtPct:a/(i.sGW*0+(h+f+a)||1)*100,gasShare:p/x,co2:p*Jt.gas.co2/x*1e3}}var Eh={gas:{name:"Mostly gas",sGW:60,wGW:60,bGW:0,bH:4,nGW:0,gGW:90},vre:{name:"Wind + solar + batteries",sGW:220,wGW:160,bGW:40,bH:4,nGW:0,gGW:0},vreGas:{name:"\u2026 plus gas backup",sGW:220,wGW:160,bGW:40,bH:4,nGW:0,gGW:75},nuc:{name:"Mostly nuclear",sGW:30,wGW:20,bGW:10,bH:4,nGW:55,gGW:30},mix:{name:"A blend",sGW:130,wGW:110,bGW:30,bH:6,nGW:20,gGW:55}},Ah=[["nuclear",v.nuclear,"nuclear"],["wind",v.wind,"wind"],["solar",v.solar,"solar"],["batt",v.storage,"storage out"],["gas",v.gas,"gas"]];function Uf(i){let e={...Eh.mix,nucCapex:14e3,co2:80,gasPrice:3.5,wacc:.07,week:16,preset:"mix"},t=null,n=null,s=()=>{t=ky({...e,keepHourly:!0})};s();let r=new Qe(i,{label:"Build a clean grid: choose solar, wind, batteries, nuclear and gas backup; see a synthetic year day by day, a zoomed week hour by hour, and the resulting system cost, curtailment and unserved hours",height:y=>y<640?700:Math.max(440,Math.min(480,y*.47)),draw(y,m,g){let M=m<640,_=M?null:{l:m-210,r:m-14,t:34,b:g-30},x=M?m-14:_.l-34,T={l:52,r:x,t:34,b:M?160:g*.34},w=2.6,E=(T.r-T.l)/365,b=Z=>T.b-Z/1e3/w*(T.b-T.t);X(y,"every day of a synthetic year (TWh per day)",T.l-4,T.t-14,{size:11,color:v.ink3,weight:500});for(let Z of[0,1,2])Me(y,T.l,Math.round(b(Z*1e3))+.5,T.r,Math.round(b(Z*1e3))+.5,Z?v.grid:v.grid2,1),X(y,String(Z),T.l-6,b(Z*1e3)+4,{size:11,color:v.ink3,align:"right"});for(let Z=0;Z<365;Z++){let Y=Z*7,B=0,N=T.l+Z*E;for(let q=0;q<5;q++){let re=t.day[Y+q];re<=0||(y.fillStyle=se(Ah[q][1],.9),y.fillRect(N,b(B+re),Math.max(1,E+.3),b(B)-b(B+re)),B+=re)}t.day[Y+5]>1&&(y.fillStyle=se(v.solar,.22),y.fillRect(N,b(Math.min(w*1e3,B+t.day[Y+5])),Math.max(1,E+.3),b(B)-b(Math.min(w*1e3,B+t.day[Y+5])))),t.day[Y+6]>.5&&(y.fillStyle=v.peaker,y.fillRect(N,T.b+3,Math.max(1.5,E+.3),6))}["J","F","M","A","M","J","J","A","S","O","N","D"].forEach((Z,Y)=>X(y,M?Z:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][Y],T.l+(Y+.5)*30.42*E,T.b+22,{size:10.5,color:v.ink3,align:"center"}));let A=T.l+e.week*E,R=A+7*E;y.strokeStyle=v.ink,y.lineWidth=1.5,y.strokeRect(A,T.t-2,R-A,T.b-T.t+12),y.fillStyle=se(v.ink,.05),y.fillRect(A,T.t-2,R-A,T.b-T.t+12);let I={l:52,r:x,t:T.b+56,b:M?400:g-34},O=e.week*24,D=0;for(let Z=O;Z<O+168;Z++){let Y=Z*8;D=Math.max(D,t.hourly[Y+6],t.hourly[Y]+t.hourly[Y+1]+t.hourly[Y+2]+t.hourly[Y+3]+t.hourly[Y+4]+t.hourly[Y+5])}let L=Math.max(100,Math.ceil(D*1.05/50)*50),P=dt(y,{box:I,x0:0,x1:168,y0:0,y1:L,xticks:[],yticks:L>300?[0,100,200,300,400,500].filter(Z=>Z<=L):[0,50,100,150,200,250,300].filter(Z=>Z<=L),yfmt:Z=>Z+" GW",ylabel:`the week starting ${o(e.week)}, hour by hour`}),F=1,G=new Float32Array(168);for(let Z=0;Z<6;Z++){let Y=Z<5?Ah[Z][1]:null;y.beginPath();for(let B=0;B<168;B++){let N=t.hourly[(O+B)*8+Z];y.lineTo(P.sx(B),P.sy(G[B]+N)),y.lineTo(P.sx(B+F),P.sy(G[B]+N))}for(let B=167;B>=0;B--)y.lineTo(P.sx(B+F),P.sy(G[B])),y.lineTo(P.sx(B),P.sy(G[B]));y.closePath(),y.fillStyle=Y?se(Y,.88):se(v.solar,.18),y.fill(),Y||(y.strokeStyle=se(v.solar,.6),y.setLineDash([3,3]),y.stroke(),y.setLineDash([]));for(let B=0;B<168;B++)G[B]+=t.hourly[(O+B)*8+Z]}$e(y,Array.from({length:168},(Z,Y)=>[P.sx(Y+.5),P.sy(t.hourly[(O+Y)*8+6])]),v.demand,2);{let Z=-1,Y=0;for(let B=0;B<168;B++){let N=(O+B)*8,q=t.hourly[N]+t.hourly[N+1]+t.hourly[N+2]+t.hourly[N+3]+t.hourly[N+4],re=q-t.hourly[N+6];if(re>.5){let ae=P.sy(q),he=P.sy(t.hourly[N+6]);y.fillStyle=se("#ffffff",.38),y.fillRect(P.sx(B),ae,P.sx(B+1)-P.sx(B),he-ae),re>Z&&B>14&&B<150&&(Z=re,Y=B)}}if(Z>2){let B=(O+Y)*8,N=t.hourly[B]+t.hourly[B+1]+t.hourly[B+2]+t.hourly[B+3]+t.hourly[B+4];X(y,"above the line: charging batteries",P.sx(Y+.5),P.sy(N)-6,{size:10.5,weight:600,color:v.ink2,align:"center",halo:!0})}}for(let Z=0;Z<168;Z++){let Y=(O+Z)*8,B=t.hourly[Y]+t.hourly[Y+1]+t.hourly[Y+2]+t.hourly[Y+3]+t.hourly[Y+4];t.hourly[Y+6]-B>.05&&(y.fillStyle=se(v.peaker,.35),y.fillRect(P.sx(Z),P.sy(t.hourly[Y+6]),P.sx(1)-P.sx(0)+.3,P.sy(B)-P.sy(t.hourly[Y+6])))}for(let Z=0;Z<=7;Z++){let Y=P.sx(Z*24);Me(y,Y,I.b,Y,I.b+4,v.grid2,1),Z<7&&X(y,["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][(e.week+Z+3)%7],P.sx(Z*24+12),I.b+15,{size:10.5,color:v.ink3,align:"center"})}let z=[...Ah.map(Z=>[Z[2],Z[1]]),["curtailed",se(v.solar,.3)],["unserved",v.peaker]],V=I.l,U=I.t-30+0;M?U=I.b+34:(V=I.l+at(y,`the week starting ${o(e.week)}, hour by hour`,11,500)+24,U=I.t-14);for(let[Z,Y]of z){let B=at(y,Z,10.5)+26;V+B>x&&(V=I.l,U+=15),He(y,V,U-8,10,10,2),y.fillStyle=Y,y.fill(),X(y,Z,V+14,U+1,{size:10.5,color:v.ink2}),V+=B}let H=M?{l:16,r:m-16,t:U+34,b:g-14}:_,K=[["solar",v.solar,"solar"],["wind",v.wind,"wind"],["nuclear",v.nuclear,"nuclear"],["storage",v.storage,"storage"],["gasFixed",St(v.gas,.25),"gas plants"],["gasFuel",v.gas,"gas fuel"],["carbon",ot(v.gas,.3),"CO\u2082 price"]],ce=t.total;if(M){X(y,`system cost $${ce.toFixed(0)}/MWh`,H.l,H.t,{size:15,weight:700,color:v.ink});let Z=H.r-H.l,Y=Math.max(150,Math.ceil(ce/50)*50),B=H.l;for(let[ae,he]of K){let xe=t.perMWh[ae];if(xe<.5)continue;let ne=Z*xe/Y;y.fillStyle=he,y.fillRect(B,H.t+10,ne-1,16),B+=ne}let N=H.t+46,q=H.l;l().forEach(([ae,he,xe],ne)=>{let fe=H.l+ne%2*(H.r-H.l)/2,me=N+Math.floor(ne/2)*32;X(y,ae,fe,me,{size:10.5,color:v.ink3}),X(y,he,fe,me+15,{size:12,weight:650,color:xe||v.ink})})}else{X(y,"system cost",H.l,H.t-14,{size:11,color:v.ink3,weight:500}),X(y,`$${ce.toFixed(0)}`,H.l,H.t+22,{size:30,weight:700,color:v.ink}),X(y,"per MWh of demand served",H.l,H.t+40,{size:11,color:v.ink3});let Z=H.t+58,Y=H.t+58+Math.min(230,H.b-H.t-200),B=Math.max(150,Math.ceil(ce/50)*50),N=he=>(Y-Z)*he/B,q=Y,re=[];for(let[he,xe,ne]of K){let fe=t.perMWh[he];if(fe<.5)continue;let me=N(fe);y.fillStyle=xe,y.fillRect(H.l,q-me,42,me-1),re.push([ne+" "+fe.toFixed(0),q-me/2]),q-=me}for(let he=0;he<re.length;he++)he&&re[he-1][1]-re[he][1]<13&&(re[he][1]=re[he-1][1]-13);for(let[he,xe]of re)X(y,he,H.l+50,xe+4,{size:10.5,color:v.ink2});Me(y,H.l-4,Y+.5,H.l+46,Y+.5,v.grid2,1);let ae=Y+26;for(let[he,xe,ne]of l())X(y,he,H.l,ae,{size:11,color:v.ink3}),X(y,xe,H.r,ae,{size:12,weight:650,color:ne||v.ink,align:"right"}),ae+=19}n={Y:T,dx:E}}});function l(){return[["clean share",`${((1-t.gasShare)*100).toFixed(0)}%`],["CO\u2082 intensity",`${t.co2.toFixed(0)} g/kWh`],["wind & solar curtailed",`${(t.curt/Math.max(1,t.solE+t.winE+t.curt)*100).toFixed(0)}%`],["hours with unserved demand",`${t.unsH}`,t.unsH?v.peaker:v.storage]]}function o(y){return new Date(Date.UTC(2027,0,1+y)).toLocaleDateString("en-GB",{day:"numeric",month:"short",timeZone:"UTC"})}r.interact({hit:(y,m)=>n&&m>n.Y.t-6&&m<n.Y.b+30&&y>n.Y.l&&y<n.Y.r?"week":null,cursor:"ew-resize",down:(y,m)=>{e.week=Ae(Math.round((m-n.Y.l)/n.dx-3.5),0,358)},move:(y,m)=>{e.week=Ae(Math.round((m-n.Y.l)/n.dx-3.5),0,358)}});let a=tt(i),d=ct(i),c={},p=()=>{s();let y=t;d.innerHTML=`<b>$${y.total.toFixed(0)}/MWh</b> for the whole system, before networks. ${y.unsH?`<b style="color:${v.peaker}">${y.unsH.toLocaleString("en-US")} hour${y.unsH===1?"":"s"}</b> in which demand could not be met (${(y.uns/y.D*100).toFixed(y.uns/y.D<.01?2:1)}% of the year\u2019s energy)`:"<b>No</b> hours of unserved demand"}; ${((1-y.gasShare)*100).toFixed(0)}% of demand met without gas; ${(y.curt/Math.max(1,y.solE+y.winE+y.curt)*100).toFixed(0)}% of wind and solar output thrown away.`,r.invalidate()},u=rt(a,{label:"Start from",options:Object.entries(Eh).map(([y,m])=>({label:m.name,value:y,name:"mix-"+y})),value:e.preset,onchange:y=>{Object.assign(e,Eh[y]),e.preset=y;for(let m of["sGW","wGW","bGW","bH","nGW","gGW"])c[m].set(e[m]);p()}}),h=(y,m,g,M,_,x)=>{c[y]=Ie(a,{label:m,min:0,max:g,step:M,value:e[y],color:_,fmt:x,oninput:T=>{e[y]=T,u.set(null),p()},name:y})};h("sGW","Solar",400,10,v.solar,y=>y+" GW"),h("wGW","Wind",300,10,v.wind,y=>y+" GW"),h("bGW","Batteries",100,5,v.storage,y=>y+" GW"),h("nGW","Nuclear",90,5,v.nuclear,y=>y+" GW"),h("gGW","Gas backup",120,5,v.gas,y=>y+" GW");let f=ln(a,"More: battery hours, costs and prices");c.bH=Ie(f,{label:"Battery duration",min:1,max:12,step:1,value:e.bH,color:v.storage,fmt:y=>y+" h",oninput:y=>{e.bH=y,u.set(null),p()},name:"bH"}),Ie(f,{label:"Nuclear build cost",min:3e3,max:16e3,step:250,value:e.nucCapex,color:v.nuclear,fmt:y=>"$"+y.toLocaleString("en-US")+"/kW",oninput:y=>{e.nucCapex=y,p()},name:"nucCapex"}),Ie(f,{label:"Gas price",min:2,max:20,step:.5,value:e.gasPrice,color:v.gas,fmt:y=>"$"+y.toFixed(1)+"/MMBtu",oninput:y=>{e.gasPrice=y,p()},name:"gasPrice"}),Ie(f,{label:"CO\u2082 price",min:0,max:200,step:5,value:e.co2,color:ot(v.gas,.3),fmt:y=>"$"+y+"/t",oninput:y=>{e.co2=y,p()},name:"co2"}),p(),i.__sim={st:e,get sim(){return t}}}function kf(i){let e=Hs.energyShare,t=null,n=null;new Qe(i,{label:"US spending on energy as a share of GDP, 1970 to 2024, with recessions shaded",height:r=>r<600?320:340,draw(r,l,o){let a=l<600,d={l:44,r:l-16,t:34,b:o-34},{sx:c,sy:p}=dt(r,{box:d,x0:1969,x1:2025,y0:0,y1:15,yticks:[0,5,10,15],xticks:a?[1970,1990,2010]:[1970,1980,1990,2e3,2010,2020],yfmt:m=>m+"%",ylabel:"US energy expenditure as a share of GDP"});n={sx:c,sy:p,box:d};for(let[m,g]of If)r.fillStyle=se(v.ink,.07),r.fillRect(c(m),d.t,Math.max(2,c(g)-c(m)),d.b-d.t);let u=[],h=null;for(let m of e)h&&m[0]-h[0]>1&&$e(r,[[c(h[0]),p(h[1])],[c(m[0]),p(m[1])]],se(v.price,.5),1.5,[3,3]),h=m;let f=[];h=null;for(let m of e)h&&m[0]-h[0]>1&&($e(r,f,v.price,2.2),f=[]),f.push([c(m[0]),p(m[1])]),h=m;$e(r,f,v.price,2.2);for(let m of e)Ce(r,c(m[0]),p(m[1]),m===t?5:2.4,v.price,m===t?"#fff":null,m===t?2:0);let y=a?[[1981,"1981: 13.3%","right"]]:[[1975,"1973\u201374 oil embargo","left"],[1981,"1979 Iranian revolution \u2192 1981: 13.3%","left"],[2008,"2008 oil spike","center"],[2022,"2022","center"]];for(let[m,g,M]of y){let _=e.find(x=>x[0]===m);_&&X(r,g,c(_[0])+(M==="left"?8:M==="right"?-8:0),p(_[1])-10,{size:10.5,color:v.ink2,weight:600,align:M,halo:!0})}if(X(r,"grey bands: US recessions (NBER)",d.r,d.t+2,{size:10.5,color:v.ink3,align:"right"}),t){let m=`${t[0]}: ${t[1].toFixed(1)}% of GDP`,g=at(r,m,11.5,600)+14,M=Ae(c(t[0])-g/2,d.l,d.r-g);He(r,M,d.b-30,g,22,6),r.fillStyle=se("#fff",.95),r.fill(),r.strokeStyle=v.grid2,r.stroke(),X(r,m,M+7,d.b-15,{size:11.5,weight:600,color:v.ink})}}}).interact({hit:r=>{if(!n)return null;let l=null,o=1e9;for(let a of e){let d=Math.abs(n.sx(a[0])-r);d<o&&(o=d,l=a)}return o<20?l:null},cursor:"crosshair",hover:r=>{t=r}})}var Ff=[{k:"alu",name:"Primary aluminium",per:"tonne",kwh:14e3,col:"#8a9bb0",note:"\u224814 MWh per tonne at the smelter (IAI world average)",fmt:i=>"\u20AC"+Math.round(i).toLocaleString("en-US")},{k:"steel",name:"Green steel (H\u2082 direct reduction)",per:"tonne",kwh:3480,col:"#6f6a64",note:"3.48 MWh per tonne of liquid steel (Vogl et al.)",fmt:i=>"\u20AC"+Math.round(i).toLocaleString("en-US")},{k:"h2",name:"Green hydrogen",per:"kg",kwh:55,col:"#3fa1a8",note:"\u224855 kWh/kg: US DOE status value for today\u2019s electrolyser systems (as in Part 5)",fmt:i=>"\u20AC"+i.toFixed(2),ref:[1,"US DOE \u201CHydrogen Shot\u201D: $1/kg all-in target"]},{k:"efuel",name:"E-kerosene (power-to-liquid)",per:"litre",kwh:34,col:"#b07a3a",note:"38\u201347 kWh/kg (aireg) \u2192 \u224834 kWh per litre",fmt:i=>"\u20AC"+i.toFixed(2)},{k:"water",name:"Desalinated seawater",per:"m\xB3",kwh:3.5,col:v.wind,note:"3\u20134 kWh/m\xB3 for modern reverse osmosis",fmt:i=>"\u20AC"+i.toFixed(2)},{k:"gpu",name:"One H100 GPU for an hour",per:"GPU-hour",kwh:10.2/8*1.3,col:"#6c5bb5",note:"DGX H100: 10.2 kW for 8 GPUs, \xD7 PUE 1.3",fmt:i=>"\u20AC"+i.toFixed(3)},{k:"home",name:"A German household\u2019s year",per:"year",kwh:3500,col:v.procurement,note:"3,500 kWh \u2014 energy only, before grid fees and taxes",fmt:i=>"\u20AC"+Math.round(i).toLocaleString("en-US")}];function Of(i){let e=(pi.emberAnnual.find(h=>h[0]===2025)||[0,90])[1],t={p:60,cur:"USD"},n=()=>t.cur==="USD"?"$":"\u20AC",s=()=>t.cur==="USD"?an[2025]:1,r=[[50,"Industriestrompreis floor","floor"],[87.44,"2026 reference","reference"],[e,"German day-ahead 2025 avg","day-ahead"],[172,"German SME industry tariff","SME"],[370,"German household","household"]],l=()=>r.map(([h,f,y])=>{let m=Math.round(h*s());return[h*s(),`${f} ${n()}${m}`,`${y} ${n()}${m}`]}),o=null,a=new Qe(i,{label:"What a megawatt-hour price unlocks: the electricity cost of a tonne of aluminium or green steel, a kilogram of hydrogen, a litre of e-kerosene, a cubic metre of desalinated water, an hour of a GPU and a household year, as the power price changes",height:h=>h<600?664:484,draw(h,f,y){let m=f<600,g={l:m?16:24,r:f-(m?16:24),y:m?84:76},M=Qt(0,400,g.l,g.r);o={sx:M,A:g},X(h,`electricity price, ${n()}/MWh`,g.l,16,{size:11,color:v.ink3,weight:500}),Me(h,g.l,g.y,g.r,g.y,v.grid2,6),Me(h,g.l,g.y,M(t.p),g.y,v.ink,6);for(let b of[0,100,200,300,400])X(h,n()+b,M(b),g.y+24,{size:10.5,color:v.ink3,align:"center"});let _=[-1e9,-1e9,-1e9];l().forEach(([b,S,A])=>{let R=m?A:S,I=M(b),O=at(h,R,10,550),D=I+O/2>g.r?"right":I-O/2<g.l?"left":"center",L=D==="right"?I-O:D==="left"?I:I-O/2,P=_.findIndex(F=>L>F+8);P<0&&(P=2),_[P]=L+O,Me(h,I,g.y-9-P*14,I,g.y-4,v.ink3,1),X(h,R,I,g.y-12-P*14,{size:10,color:v.ink2,weight:550,align:D})}),Ce(h,M(t.p),g.y,10,"#fff",v.ink,2.5),X(h,`${n()}${t.p}/MWh  =  ${(t.p/10).toFixed(1)} ${t.cur==="USD"?"\xA2":"ct"}/kWh`,M(t.p),g.y+42,{size:13,weight:700,color:v.ink,align:"center"});let x=g.y+66,T=(y-x-10)/Ff.length,w=m?16:Math.min(300,f*.36),E=f-(m?16:120);Ff.forEach((b,S)=>{let A=x+S*T,R=b.kwh*t.p/1e3,I=b.kwh*400/1e3;S%2===0&&(h.fillStyle=se(v.bg,.6),h.fillRect(0,A,f,T));let O=m?A+16:A+T/2-3;X(h,b.name,m?16:18,O,{size:12.5,weight:650,color:v.ink}),X(h,b.note,m?16:18,O+14,{size:10,color:v.ink3});let D=m?A+T-22:A+T/2-9,L=Qt(0,I,w,E);He(h,w,D,E-w,14,4),h.fillStyle=se(b.col,.12),h.fill(),He(h,w,D,Math.max(2,L(R)-w),14,4),h.fillStyle=b.col,h.fill();let P=`${b.fmt(R).replace("\u20AC",n())} / ${b.per}`;if(m?X(h,P,E,O,{size:12,weight:700,color:ot(b.col,.3),align:"right"}):X(h,P,E+8,D+11,{size:12,weight:700,color:ot(b.col,.3)}),b.ref){let F=L(b.ref[0]/(t.cur==="USD"?1:an[2025]));F<E&&(Me(h,F,D-4,F,D+18,v.ink,1.5),X(h,m?"$1/kg target":b.ref[1],F+4,D-3,{size:9.5,color:v.ink2,weight:600}))}})}});a.interact({hit:(h,f)=>o&&Math.abs(f-o.A.y)<24?"p":null,cursor:"ew-resize",touchAction:"pan-y",down:(h,f)=>{t.p=Ae(Math.round(o.sx.inv(f)),0,400),u.set(t.p),p()},move:(h,f)=>{t.p=Ae(Math.round(o.sx.inv(f)),0,400),u.set(t.p),p()}});let d=tt(i),c=ct(i),p=()=>{let h=55*t.p/1e3,f=14*t.p,y=t.p*1e3*8760/1e6;c.innerHTML=`At <b>\u20AC${t.p}/MWh</b>, electricity alone costs <b>\u20AC${f.toLocaleString("en-US")}</b> per tonne of aluminium and <b>\u20AC${h.toFixed(2)}</b> per kg of hydrogen; every extra \u20AC10/MWh adds \u20AC140 to the tonne and \u20AC0.55 to the kilo. A 1 GW data-centre campus running all year buys 8.76 TWh: <b>\u20AC${Math.round(y).toLocaleString("en-US")} million</b> a year at this price.`.replace(/€/g,n()),a.invalidate()},u=Ie(d,{label:"Electricity price",min:0,max:400,step:1,value:t.p,color:v.ink,fmt:h=>`${n()}${h}/MWh`,oninput:h=>{t.p=h,p()},name:"price",wide:!0});mi(d,h=>{let f=s();t.cur=h,t.p=Ae(Math.round(t.p/f*s()),0,400),u.set(t.p),p()},"ul"),p()}var It={fetched:"2026-10-10",licence:"CC BY 4.0",sourceUrl:"https://ember-energy.org/data/yearly-electricity-data/",fileUrl:"https://files.ember-energy.org/public-downloads/generation/outputs/release_generation_yearly_global.csv",sha256:"b2ac49fa9b27035fedda3c6afb85917bf136de9253bfcbaf09c3410904ec7cd1",years:[2e3,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025],latest:2025,sources:[{id:"coal",label:"Coal",short:"Coal",ember:"Coal"},{id:"gas",label:"Gas",short:"Gas",ember:"Gas"},{id:"otherFossil",label:"Oil and other fossil",short:"Oil & other fossil",ember:"Other fossil"},{id:"nuclear",label:"Nuclear",short:"Nuclear",ember:"Nuclear"},{id:"hydro",label:"Hydro",short:"Hydro",ember:"Hydro"},{id:"bioenergy",label:"Bioenergy",short:"Bioenergy",ember:"Bioenergy"},{id:"otherRenewables",label:"Other renewables",short:"Other renewables",ember:"Other renewables"},{id:"wind",label:"Wind",short:"Wind",ember:"Wind"},{id:"solar",label:"Solar",short:"Solar",ember:"Solar"}],regions:[{id:"world",name:"World",short:"World",iso:""},{id:"china",name:"China",short:"China",iso:"CHN"},{id:"us",name:"United States",short:"United States",iso:"USA"},{id:"eu",name:"EU",short:"EU",iso:""},{id:"india",name:"India",short:"India",iso:"IND"},{id:"me",name:"Middle East",short:"Middle East",iso:""},{id:"africa",name:"Africa",short:"Africa",iso:""},{id:"lac",name:"Latin America and Caribbean",short:"Latin America",iso:""},{id:"asean",name:"ASEAN",short:"ASEAN",iso:""},{id:"japan",name:"Japan",short:"Japan",iso:"JPN"},{id:"korea",name:"South Korea",short:"South Korea",iso:"KOR"},{id:"australia",name:"Australia",short:"Australia",iso:"AUS"},{id:"brazil",name:"Brazil",short:"Brazil",iso:"BRA"},{id:"germany",name:"Germany",short:"Germany",iso:"DEU"}],gen:{world:{coal:[5841.094,5923.057,6177.975,6608.631,6830.911,7200.982,7601.817,8089.077,8112.695,7988.93,8510.353,8972.389,9025.17,9499.632,9658.865,9335.693,9379.253,9714.411,10099.779,9889.996,9508.343,10245.896,10365.139,10530.963,10652.818,10605.842],gas:[2747.104,2916.353,3106.378,3257.059,3504.638,3682.1,3902.129,4220.812,4362.538,4383.894,4826.365,4879.86,5176.426,5073.559,5229.007,5553.449,5857.426,5982.423,6221.433,6402.875,6395.711,6570.172,6604.593,6711.548,6894.588,6920.565],otherFossil:[1329.122,1290.029,1276.62,1301.043,1268.479,1282.709,1180.587,1200.87,1176.532,1075.976,1062.315,1168.622,1219.865,1181.275,1129.213,1121.391,1061.74,969.799,891.379,868.67,793.361,867.297,919.245,904.227,894.116,886.964],nuclear:[2540.468,2613.171,2654.774,2601.052,2719.408,2726.976,2761.593,2703.489,2694.736,2656.771,2726.211,2610.145,2431.887,2448.415,2499.124,2533.428,2571.47,2594.215,2658.698,2754.08,2648.779,2760.493,2640.435,2696.658,2774.98,2804.922],hydro:[2632.566,2566.624,2614.507,2614.865,2806.184,2915.412,3021.681,3066.283,3248.852,3245.005,3436.766,3496.35,3668.076,3798.704,3877.629,3889.712,4022.886,4061.449,4183.846,4234.733,4353.974,4296.714,4336.704,4253.602,4463.047,4446.161],bioenergy:[159.034,154.577,167.946,181.609,197.813,218.354,232.413,255.063,272.264,292.452,327.21,344.895,374.31,404.46,437.063,470.81,482.468,501.436,527.098,549.816,572.633,608.351,606.799,615.498,635.446,652.362],otherRenewables:[43.648,44.154,45.834,46.608,48.264,48.594,50.758,52.811,56.589,58.655,59.717,61.076,62.844,64.324,69.526,73.078,75.869,78.819,81.72,82.95,86.123,86.328,87.935,88.404,88.45,91.369],wind:[31.159,38.2,52.224,63.202,85.471,104.395,133.184,171.147,220.849,276.248,346.051,440.041,529.307,634.253,706.243,829.842,960.589,1139.392,1268.26,1421.118,1591.663,1856.32,2105.707,2317.38,2506.144,2705.059],solar:[1.082,1.43,1.79,2.191,2.855,4.031,5.489,7.369,11.929,19.88,32.275,63.646,96.998,131.799,197.798,256.07,327.522,444.144,575.162,697.865,852.503,1054.362,1335.139,1669.84,2160.356,2806.624],demand:[15325.277,15547.595,16098.049,16676.261,17464.025,18183.554,18889.652,19766.92,20156.987,19997.812,21327.264,22037.024,22584.883,23236.421,23804.468,24063.473,24739.223,25486.088,26507.376,26902.103,26803.091,28345.934,29001.697,29788.12,31069.945,31919.868],total:[15325.277,15547.595,16098.049,16676.261,17464.025,18183.554,18889.652,19766.92,20156.987,19997.812,21327.264,22037.024,22584.883,23236.421,23804.468,24063.473,24739.223,25486.088,26507.376,26902.103,26803.091,28345.934,29001.697,29788.12,31069.945,31919.868]},china:{coal:[1060.259,1129.143,1282.567,1519.968,1722.421,1980.148,2302.421,2656.702,2708.913,2911.52,3243.712,3702.292,3759.652,4090.2,4218.029,4058.84,4165.506,4443.197,4776.274,4865.086,4930.977,5341.047,5422.278,5761.32,5836.352,5755.915],gas:[5.773,4.934,4.194,5.155,7.46,12.142,23.819,33.907,34.566,56.559,77.727,108.767,110.252,116.388,133.283,166.907,188.28,203.2,215.5,232.5,252.5,287.1,275.624,297.8,320.719,337.61],otherFossil:[47.268,48.517,50.706,54.832,65.534,50.513,37.917,28.094,18.809,12.124,20.842,18.787,17.361,18.859,20.629,23.133,27.679,32.66,39.439,45.866,56.054,73.717,81.895,88.007,93.014,97.026],nuclear:[16.737,17.472,25.127,43.342,50.469,53.088,54.843,62.13,68.394,70.05,74.742,87.2,98.318,111.501,133.218,171.378,213.178,248.1,295,348.7,366.2,407.5,417.78,434.72,450.85,485.23],hydro:[222.41,277.43,287.97,283.68,353.544,397.017,435.786,485.264,636.96,615.644,711.383,688.045,862.794,909.612,1059.692,1114.515,1153.268,1165.065,1198.887,1272.538,1321.709,1300.6,1303.9,1232.15,1363.81,1392.157],bioenergy:[2.537,2.554,2.546,2.536,2.528,5.322,7.133,9.863,14.866,20.859,17.865,20.319,23.218,27.757,33.142,38.973,47.08,57.025,65.434,77.538,90.52,103.085,109,118.725,124.183,136.642],otherRenewables:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],wind:[.59,.719,.837,.997,1.278,1.946,3.712,5.479,13.1,27.615,49.4,74.1,103.05,138.264,159.763,185.591,240.86,304.6,365.8,405.3,466.5,655.8,762.67,885.87,997.04,1127.92],solar:[.022,.031,.048,.064,.076,.084,.095,.114,.152,.279,.701,2.61,3.595,8.374,23.512,39.481,66.528,117.8,176.9,224,261.1,327,427.27,584.15,839.04,1173.24],demand:[1346.842,1472.2,1645.592,1903.21,2197.234,2494.077,2858.844,3271.238,3482.958,3703.271,4182.857,4689.374,4967.461,5409.724,5769.859,5786.374,6089.657,6558.6,7118.015,7454.731,7728.518,8481.611,8787.467,9385.662,10008.008,10486.272],total:[1355.596,1480.8,1653.996,1910.574,2203.31,2500.26,2865.726,3281.553,3495.76,3714.651,4196.371,4702.119,4978.24,5420.955,5781.267,5798.818,6102.38,6571.647,7133.233,7471.528,7745.56,8495.849,8800.417,9402.742,10025.008,10505.74]},us:{coal:[1966.27,1903.96,1933.13,1973.74,1978.3,2012.87,1990.51,2016.46,1985.8,1755.9,1847.29,1733.43,1514.04,1581.11,1581.71,1352.4,1239.15,1205.84,1149.49,964.96,773.39,898,831.51,675.11,652.16,737.15],gas:[614.99,639.13,691.01,649.91,710.1,760.96,816.44,896.59,882.98,920.98,987.7,1013.69,1225.89,1124.84,1126.61,1333.48,1378.31,1296.44,1469.13,1585.81,1624.17,1579.19,1687.06,1806.06,1869.9,1807.34],otherFossil:[116.02,135.59,103.69,132.38,129.88,126.13,71.61,75.19,55.43,48.53,47.5,41.81,39.09,40.26,43.69,44.44,39.5,37.89,42.68,37.44,34.34,35.2,38.64,33.13,30.47,31.72],nuclear:[753.89,768.83,780.06,763.73,788.53,781.99,787.22,806.42,806.21,798.85,806.97,790.2,769.33,789.02,797.17,797.18,805.69,804.95,807.08,809.41,789.88,779.65,771.54,774.87,781.86,784.78],hydro:[270.03,208.14,255.59,267.27,259.93,263.76,282.69,240.61,248.54,268.82,254.7,312.93,271.29,263.88,253.19,243.99,261.13,293.84,286.62,282.61,279.95,246.47,248.76,239.01,237.04,241.7],bioenergy:[60.73,49.75,53.71,53.34,53.54,54.28,54.86,55.54,55.03,54.49,56.09,56.67,57.62,60.86,63.99,63.63,62.76,62.73,61.83,57.51,54.7,54.25,51.85,47.2,46.42,46.19],otherRenewables:[14.09,14.89,16.14,16.85,16.95,16.64,16.51,16.7,17.32,17.47,17.83,18.14,18.26,18.76,19.08,19.12,19.16,19.04,18.69,17.87,18.09,18.24,18.16,18.45,17.52,17.7],wind:[5.59,6.74,10.35,11.19,14.14,17.81,26.59,34.45,55.36,73.89,94.65,120.18,140.82,167.84,181.65,190.72,226.99,254.3,272.67,295.88,337.94,378.2,434.3,421.14,451.9,464.39],solar:[.49,.54,.55,.53,.58,.55,.51,.61,.86,.89,1.21,1.82,4.33,9.04,28.92,39.03,54.87,77.28,93.36,106.89,130.72,164.42,205.07,238.94,303.75,388.82],demand:[3835.86,3749.6,3865.21,3875.36,3963.26,4059.77,4065.36,4173.82,4140.35,3973.87,4139.92,4126.12,4087.93,4113.49,4149.22,4150.66,4154.06,4108.62,4246.01,4197.42,4090.49,4192.93,4328.1,4272.81,4404.83,4532.142],total:[3802.1,3727.57,3844.23,3868.94,3951.95,4034.99,4046.94,4142.57,4107.53,3939.82,4113.94,4088.87,4040.67,4055.61,4096.01,4083.99,4087.56,4052.31,4201.55,4158.38,4043.18,4153.62,4286.89,4253.91,4391.02,4519.79]},eu:{coal:[800.33,792.92,814.34,849.04,835.42,808.89,816.5,828.74,757.01,703.55,701.2,724.81,742.68,728.9,692.78,705.03,659.16,638.86,595.54,450.79,352.33,419,448.43,318.59,271.83,258.326],gas:[328.19,351.41,374.6,418.9,458.48,512.54,540.05,571.96,611.65,564.03,587.36,556.85,482.7,413.43,355.41,394.84,464.77,523.62,488.95,568.62,559.7,547.04,533.95,454.82,431.23,466.531],otherFossil:[226.81,229.35,240.85,227.38,205.03,203.41,194.13,178.6,165.74,144.78,149.76,143.31,137.27,128.23,125.99,127.87,128.2,126.88,120.86,110.91,97.76,100.41,105.87,91.08,89.11,87.331],nuclear:[859.95,888.9,902.34,907.18,928.46,916.08,914.44,872.24,884.73,824.92,854.47,837.77,811.95,806.23,812.57,786.69,767.95,759.4,761.94,765.34,683.51,731.71,609.26,619.6,649.55,652.009],hydro:[350.17,373.43,312.6,304.64,323.19,307.02,309.98,307.72,325.59,329,371.82,307.43,331.67,368.02,370.06,336,345.6,294.34,343.84,320.29,347.09,348.25,276.11,330.44,369.68,325.261],bioenergy:[30.11,31.9,36.8,43.16,52.76,61,69.86,78.43,88.09,97.24,111.47,118.98,132.87,139.13,144.25,149.37,151.09,153.64,155.46,159.65,162.59,171.56,165.27,156.84,156.85,155.796],otherRenewables:[5.29,5.09,5.25,5.92,5.99,5.87,6.08,6.24,6.2,5.99,6.09,6.42,6.28,6.44,6.79,7.09,7.23,7.23,7.14,7.23,7.23,7.03,6.93,6.72,6.68,7.493],wind:[21.28,25.75,35.06,43.31,57.54,68.1,78.75,99.95,113.26,124.61,139.88,165.41,187.55,209.55,222.46,263.28,266.91,312.43,320.76,367.29,398.16,386.94,421.83,478.06,489.368,479.515],solar:[.05,.17,.28,.4,.68,1.48,2.52,3.83,7.51,14.22,23.49,47.71,70.5,83.76,93.6,100.2,100.49,106.58,114.13,124.38,144.72,163.05,209.76,254.04,307.26,366.226],demand:[2631.02,2695.57,2729.24,2797.84,2855.74,2891.72,2932.77,2958.35,2971.81,2825.63,2950.46,2909.65,2910.23,2881.88,2818.88,2863.72,2892.05,2918.43,2917.46,2877.43,2767.06,2882.27,2790.35,2709.72,2759.248,2774.508],total:[2622.18,2698.92,2722.12,2799.93,2867.55,2884.39,2932.31,2947.71,2959.78,2808.34,2945.54,2908.69,2903.47,2883.69,2823.91,2870.37,2891.4,2922.98,2908.62,2874.5,2753.09,2874.99,2777.41,2710.19,2771.558,2798.488]},india:{coal:[390.23,408.29,426.7,441.47,463.01,478.48,505.46,533.27,573.12,611.11,642.97,701.25,787.13,847.97,949.93,1006.55,1073.6,1115.24,1198.86,1198.76,1143.78,1255.56,1344.42,1445.44,1517.9,1474.156],gas:[55.96,55.93,62.88,72.8,76.58,75.47,74.7,90.05,85.88,104.37,118.03,117.56,96.25,66.31,64.01,64.77,72.62,74.99,71.26,71.95,74.79,60.4,46.17,50.8,56.44,48.516],otherFossil:[29.16,26.79,27.93,31.09,28.27,25.37,19.08,13.36,15.27,13.08,10.78,9.35,10.07,10.65,11.55,9.26,9.41,8.79,6.4,3.07,3.09,3.39,3.48,3.85,4.09,4.095],nuclear:[15.77,18.89,19.35,18.14,21.26,17.73,17.63,17.83,15.23,16.82,23.08,32.22,33.14,33.31,34.69,38.31,37.9,37.41,39.05,45.16,44.61,43.92,46.19,48.2,54.7,53.811],hydro:[76.99,72.02,68.54,69.3,100.64,97.42,112.62,122.61,115.17,106.34,108.74,131.7,115.78,131.98,139,133.48,128.55,135.98,139.92,162.29,163.94,160.57,175.09,149.43,156.53,177.95],bioenergy:[1.69,2.07,2.14,2.71,3.31,4.04,5.59,7.4,9.3,10.56,13.22,15.46,16.52,17.57,21.14,18.36,17.2,14.99,18.4,18.99,19.88,21.2,23.29,23.01,22.25,23.033],otherRenewables:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],wind:[1.58,2.09,2.09,2.6,5.23,5.99,9.34,11.68,14.38,16.27,19.46,23.95,27.43,30.01,33.45,32.74,43.45,52.63,60.31,63.31,60.43,68.09,70.05,82.11,81.54,104.002],solar:[.01,.01,.01,.02,.02,.02,.01,.06,.06,.08,.11,.83,2.1,3.43,4.91,7.09,12.2,22.36,37.45,37.45,51.575,64.255,94.599,114.094,141.747,194.681],demand:[572.69,587.38,610.99,639.82,700.02,706.07,747.17,801.2,834.25,883.93,941.94,1037.44,1093.06,1145.18,1259.25,1310.65,1393.84,1460.8,1567.81,1597.84,1561.985,1677.355,1801.559,1914.874,2032.897,2081.468],total:[571.39,586.09,609.64,638.13,698.32,704.52,744.43,796.26,828.41,878.63,936.39,1032.32,1088.42,1141.23,1258.68,1310.56,1394.93,1462.39,1571.65,1600.98,1562.095,1677.385,1803.289,1916.934,2035.197,2080.244]},me:{coal:[29.704,33.402,35.616,36.562,36.966,36.731,36.274,37.855,35.74,34.726,34.593,35.575,39.12,32.539,30.63,29.622,24.648,22.719,21.242,22.714,20.529,20.644,17.412,13.814,12.229,3.544],gas:[242.629,269.515,292.03,315.961,339.944,383.611,401.394,436.781,453.167,478.49,546.336,521.489,553.88,560.815,651.641,716.618,778.64,859.954,908.518,885.291,914.254,967.032,992.827,1028.963,1051.234,1092.655],otherFossil:[202.445,198.065,204.468,210.274,212.817,214.369,234.107,243.32,272.292,287.548,299.98,345.632,347.935,379.524,367.906,357.519,326.767,325.64,291.105,321.674,314.934,315.517,325.172,342.156,372.709,363.318],nuclear:[0,0,0,0,0,0,0,0,0,0,0,.107,1.452,4.255,4.07,3.495,6.474,6.958,6.885,6.411,7.957,13.603,27.162,39.698,46.037,44.441],hydro:[8.131,8.532,11.722,14.198,17.793,25.898,29.299,27.829,14.238,12.523,18.532,17.964,20.942,23.724,20.034,16.752,20.142,20.612,12.768,40.555,29.205,18.577,18.134,25.665,22.353,15.118],bioenergy:[.03,.03,.03,.04,.04,.03,.04,.04,.05,.082,.11,.132,.153,.179,.247,.246,.282,.184,.354,.301,.333,.323,.335,.437,1.015,1.137],otherRenewables:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],wind:[.036,.044,.04,.038,.056,.081,.135,.151,.206,.236,.179,.222,.293,.24,.233,.292,.616,.993,1.695,1.858,2.752,3.096,5.795,6.871,7.164,7.238],solar:[0,0,0,0,0,0,0,0,.001,.027,.093,.217,.421,.669,1.335,1.746,2.667,3.726,5.389,10.563,14.699,18.936,25.435,37.276,47.196,64.317],demand:[482.975,509.588,543.907,577.073,607.617,660.72,701.249,745.976,775.694,813.632,899.824,921.338,964.195,1001.945,1076.095,1126.292,1160.236,1240.785,1247.957,1289.365,1304.663,1357.728,1412.27,1494.88,1559.936,1591.768],total:[482.975,509.588,543.907,577.073,607.617,660.72,701.249,745.976,775.694,813.632,899.824,921.338,964.195,1001.945,1076.095,1126.292,1160.236,1240.785,1247.957,1289.365,1304.663,1357.728,1412.27,1494.88,1559.936,1591.768]},africa:{coal:[211.52,216.72,224.76,237.76,248.66,251.4,258.49,265.04,259.87,250.16,259.66,262.77,257.77,253.6,255.18,254.69,256.68,257.12,265.06,264.18,251.77,248.74,241.11,231.63,246.093,238.321],gas:[91.848,100.981,115.961,124.005,141.058,151.33,164.28,174.672,184.137,188.209,218.903,236.835,263.805,267.716,277.42,289.107,309.094,324.699,345.955,361.868,358.243,387.328,393.976,398.213,400.717,409.017],otherFossil:[47.202,47.728,46.957,48.846,46.038,52.783,56.021,58.704,62.178,66.797,64.15,56.979,68.578,78.129,84.399,91.98,80.35,74.912,65.21,56.516,49.213,50.726,57.017,64.872,69.954,74.829],nuclear:[13.01,10.72,11.99,12.66,13.37,11.29,10.03,11.32,13,12.81,13.53,12.9,12.97,14.11,13.79,12.24,15.03,14.19,11.58,13.25,9.9,12.35,10.1,8.1,7.8,10.21],hydro:[74.848,80.304,84.604,82.009,86.542,89.494,92.624,95.548,96.936,100.652,109.274,112.1,114.568,118.216,124.297,122.393,120.818,126.398,136.664,140.921,148.36,155.554,163.328,160.492,166.738,179.486],bioenergy:[2.04,2.1,2.58,2.53,2.66,2.66,3.47,2.89,3.02,2.92,3.03,2.75,2.77,2.92,2.82,3,3.3,3.41,2.92,3,2.96,3.04,3.06,3.95,3.376,3.545],otherRenewables:[.43,.48,.39,.79,1.03,1,1.01,1.02,1.19,1.36,1.47,1.51,1.59,1.91,3.21,4.48,4.69,4.76,5.13,5.24,5.06,5.04,5.55,6.06,6.03,6.472],wind:[.17,.419,.442,.526,.764,.78,.845,1.012,1.31,1.597,2.279,2.415,2.586,3.827,5.168,8.985,11.207,13.44,14.877,19.52,19.132,23.196,24.697,27.719,28.367,32.474],solar:[0,.001,.021,.021,.021,.021,.031,.031,.041,.072,.205,.515,.894,.555,1.86,3.252,4.724,6.783,8.453,11.549,16.553,19.871,24.389,29.931,36.094,41.209],demand:[441.069,459.452,487.706,509.146,540.142,560.757,586.801,610.237,621.682,624.577,672.502,688.773,725.531,740.984,768.144,790.126,805.891,825.711,855.849,876.043,861.19,905.846,923.227,930.967,965.169,995.562],total:[441.069,459.452,487.706,509.146,540.142,560.757,586.801,610.237,621.682,624.577,672.502,688.773,725.531,740.984,768.144,790.126,805.891,825.711,855.849,876.043,861.19,905.846,923.227,930.967,965.169,995.562]},lac:{coal:[43.956,44.782,46.932,54.878,52.207,61.832,65.437,68.615,60.248,67.283,80.367,84.382,92.852,108.693,107.713,112.122,113.345,98.669,97.056,95.16,81.05,79.778,70.921,68.309,67.95,64.915],gas:[137.587,159.08,176.112,197.64,224.436,218.401,248.325,262.887,282.723,279,342.547,335.41,382.693,431.301,454.953,472.422,459.493,464.776,463.889,494.454,485.352,503.873,452.44,474.782,505.341,512.809],otherFossil:[200.714,199.27,189.21,183.879,188.29,196.625,179.846,193.206,204.141,195.526,178.701,182.388,193.293,192.539,183.27,184.625,168.261,151.785,139.946,132.612,108.424,132.752,128.52,127.766,101.483,95.418],nuclear:[20.444,30.064,29.404,31.426,28.674,27.533,32.341,30.024,31.167,31.641,27.917,31.961,30.87,33.354,30.979,33.845,35.114,32.706,36.101,35.761,35.241,36.797,32.878,35.853,38.523,36.663],hydro:[584.303,542.932,564.383,582.849,611.076,647.822,678.057,696.645,712.64,717.028,732.25,774.028,754.327,735.852,705.096,697.723,715.408,726.101,743.405,715.837,718.432,703.579,771.559,765.573,759.84,750.498],bioenergy:[18.48,20.603,21.721,24.46,25.774,27.707,28.069,34.064,36.498,40.822,52.294,54.366,58.177,65.162,72.085,76.35,78.546,79.261,80.031,81.35,86.236,84.765,82.733,84.075,89.518,90.608],otherRenewables:[2.12,2.39,2.55,2.45,2.71,2.74,2.92,3.23,3.37,3.36,3.29,3.4,3.78,4.07,4.11,3.95,4.06,4.01,4.25,4.69,5.02,4.96,5,5.06,5.139,4.909],wind:[.245,.322,.455,.508,.533,.514,.772,1.362,1.88,2.631,4.683,5.943,11.417,14.356,25.021,40.291,55.719,66.324,78.062,95.347,104.77,127.167,138.119,154.342,168.75,182.865],solar:[.017,.018,.018,.018,.019,.019,.02,.019,.039,.057,.081,.163,.409,.746,1.453,3.066,5.232,8.745,16.141,29.189,41.978,57.85,77.729,104.82,133.853,158.383],demand:[1007.867,999.461,1030.785,1078.107,1133.72,1183.194,1235.788,1290.054,1332.707,1337.348,1422.13,1472.042,1527.817,1586.073,1584.68,1624.395,1635.178,1632.377,1658.88,1684.399,1666.504,1731.521,1759.899,1820.581,1870.397,1897.068],total:[1007.867,999.461,1030.785,1078.107,1133.72,1183.194,1235.788,1290.054,1332.707,1337.348,1422.13,1472.042,1527.817,1586.073,1584.68,1624.395,1635.178,1632.377,1658.88,1684.399,1666.504,1731.521,1759.899,1820.581,1870.397,1897.068]},asean:{coal:[108.301,118.643,127.098,135.705,148.623,158.316,172.923,192.947,190.542,200.948,224.311,256.257,292.523,313.496,319.265,356.967,403.502,428.943,487.26,546.31,570.286,583.591,602.188,666.78,726.465,748.98],gas:[165.814,191.965,210.485,228.075,245.719,254.851,264.223,275.575,294.65,310.37,328.78,306.642,336.702,361.716,374.785,379.487,381.324,363.629,363.503,385.612,337.361,341.815,361.058,380.387,392.423,365.001],otherFossil:[70.041,56.021,59.105,58.181,64.299,70.451,64.96,63.244,64.037,53.482,65.117,72.321,52.572,39.543,41.955,47.593,36.879,32.227,30.375,26.521,20.274,18.749,22.914,22.714,22.637,23.902],nuclear:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],hydro:[53.332,57.235,56.203,56.103,56.573,57.537,64.156,66.752,73.466,77.422,86.741,106.135,121.853,133.865,136.87,128.514,150.802,185.774,194.055,168.858,184.086,202.265,231.904,214.671,226.84,247.546],bioenergy:[10.794,11.479,11.765,12.691,13.796,14.391,14.336,15.989,16.433,16.88,20.126,22.065,23.592,25.044,25.59,33.728,37.199,41.129,46.253,48.156,46.694,50.042,51.553,57.166,57.463,56.645],otherRenewables:[16.928,16.404,16.614,15.738,16.574,16.504,17.128,17.241,19.029,19.615,19.287,19.326,19.694,19.034,20.366,21.098,21.729,23.329,24.77,24.8,26.332,25.928,27.115,27.374,27.202,27.847],wind:[0,0,0,0,0,.02,.05,.06,.062,.076,.108,.14,.142,.49,.615,1.203,1.57,2.549,3.468,5.918,5.707,8.61,13.543,16.936,18.217,20.064],solar:[.07,.07,.07,.07,.07,.07,.106,.109,.109,.114,.135,.171,.584,1.49,2.274,2.903,5.199,6.37,6.851,13.271,20.613,37.573,40.442,45.483,54.45,58.861],demand:[425.28,451.817,481.34,506.563,545.654,572.14,597.883,631.917,658.328,678.908,744.604,783.057,847.661,894.678,921.721,971.492,1038.204,1083.951,1156.535,1219.447,1211.353,1268.572,1350.718,1431.511,1525.697,1548.846],total:[425.28,451.817,481.34,506.563,545.654,572.14,597.883,631.917,658.328,678.908,744.604,783.057,847.661,894.678,921.721,971.492,1038.204,1083.951,1156.535,1219.447,1211.353,1268.572,1350.718,1431.511,1525.697,1548.846]},japan:{coal:[238.242,253.908,264.425,292.064,295.393,319.197,311.34,317.312,333.702,312.077,316.848,285.067,334.3,362.551,355.602,349.638,338.59,363.468,360.657,350.774,340.253,348.257,350.986,326.926,327.465,327.011],gas:[258.496,256.523,252.763,273.101,257.859,253.091,280.04,296.845,324.826,324.723,326.087,379.828,435.489,423.578,450.884,417.498,458.43,464.134,445.608,416.946,409.436,385.776,378.84,346.978,346.979,336.347],otherFossil:[182.779,153.855,172.987,185.218,169.644,184.948,154.212,185.183,171.451,105.288,102.496,162.871,207.771,166.478,122.344,104.441,97.232,56.89,52.207,37.633,25.308,31.268,45.78,32.502,24.701,24.467],nuclear:[319.122,320.538,314.258,230.078,285.866,293.038,304.291,279.009,251.744,274.651,292.355,162.927,17.991,14.603,0,4.524,17.678,29.073,49.106,65.636,43,61.223,51.774,77.461,84.906,94.065],hydro:[84.468,81.537,80.6,92.472,91.667,77.561,88.807,74.51,75.164,70.466,88.503,82.487,77.1,79.332,81.709,85.765,79.426,79.243,80.997,73.919,78.332,79.626,74.868,74.531,79.482,74.253],bioenergy:[16.111,16.029,16.939,17.876,18.053,21.686,21.528,22.198,21.293,20.326,21.827,21.105,22.13,23.177,23.628,28.485,23.671,23.814,25.74,27.578,30.372,34.795,37.828,42.008,43.602,47.585],otherRenewables:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],wind:[.109,.252,.413,.832,1.44,1.91,2.135,2.74,2.945,3.427,3.926,4.459,4.727,5.133,5.014,5.223,5.341,6.222,7.367,7.455,8.405,9.536,9.415,9.957,11.051,12.837],solar:[.344,.5,.695,.954,1.272,1.63,1.996,2.312,2.594,3.046,3.981,5.439,7.372,12.909,23.548,34.54,43.326,53.481,61.178,67.35,75.664,84.18,91.058,96.358,96.789,110.787],demand:[1099.671,1083.142,1103.081,1092.595,1121.193,1153.062,1164.348,1180.109,1183.72,1114.003,1156.023,1104.183,1106.88,1087.76,1062.729,1030.114,1063.694,1076.326,1082.861,1047.291,1010.77,1034.66,1040.55,1006.722,1014.974,1027.353],total:[1099.671,1083.142,1103.081,1092.595,1121.193,1153.062,1164.348,1180.109,1183.72,1114.003,1156.023,1104.183,1106.88,1087.76,1062.729,1030.114,1063.694,1076.326,1082.861,1047.291,1010.77,1034.66,1040.55,1006.722,1014.974,1027.353]},korea:{coal:[114.88,127.36,137.492,139.125,143.411,150.364,153.988,170.888,190.946,209.354,218.408,225.083,223.431,223.752,226.072,232.675,232.907,260.794,257.665,245.042,207.969,214.337,209.324,203.075,186.508,195.216],gas:[29.655,33.674,42.933,45.507,63.182,64.488,74.844,84.403,81.7,71.377,104.302,115.342,128.936,143.854,130.838,122.034,130.523,135.163,163.282,155.414,162.545,179.969,175.312,171.587,180.421,175.976],otherFossil:[32.833,34.283,29.059,28.347,26.064,23.77,21.429,22.716,14.564,19.342,18.033,15.617,20.342,20.553,14.169,13.133,17.434,9.7,10.647,7.429,6.015,7.342,6.411,6.738,6.389,6.316],nuclear:[108.964,112.133,119.103,129.672,130.715,146.779,148.749,142.937,150.958,147.771,148.596,154.723,150.327,138.784,156.407,164.762,161.995,148.427,133.505,145.91,160.184,158.015,176.054,180.494,188.754,184.693],hydro:[4.01,2.33,3.233,4.886,4.311,3.673,3.468,3.632,3.07,2.813,3.682,4.598,3.969,4.289,2.751,2.146,2.846,2.809,3.359,2.789,3.877,3.055,3.541,3.716,4.3,3.805],bioenergy:[.079,.088,.179,.188,.293,.26,.241,.384,.653,.539,.418,1.019,2.156,3.121,6.301,7.479,8.08,9.611,11.815,13.351,14.034,17.153,17.848,18.716,20.226,20.302],otherRenewables:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],wind:[.017,.013,.015,.025,.047,.13,.239,.376,.436,.685,.817,.863,.913,1.148,1.146,1.342,1.683,2.169,2.465,2.679,3.15,3.18,3.369,3.392,3.737,3.666],solar:[.005,.006,.007,.008,.01,.014,.031,.071,.284,.566,.773,.923,1.127,1.668,2.694,4.23,5.516,7.739,10.168,14.193,19.338,24.718,30.726,33.236,37.45,37.861],demand:[290.443,309.886,332.021,347.756,368.034,389.48,402.989,425.407,442.611,452.447,495.028,518.168,531.202,537.169,540.379,547.802,560.985,576.412,592.905,586.806,577.112,607.768,622.585,620.954,627.784,627.835],total:[290.443,309.886,332.021,347.756,368.034,389.48,402.989,425.407,442.611,452.447,495.028,518.168,531.202,537.169,540.379,547.802,560.985,576.412,592.905,586.806,577.112,607.768,622.585,620.954,627.784,627.835]},australia:{coal:[180.26,179.877,171.862,173.606,178.961,182.975,185.764,185.486,184.24,182.022,176.02,171.984,165.384,155.447,155.229,162.203,162.357,159.169,156.556,149.841,142.935,137.398,129.208,125.974,127.804,122.658],gas:[16.758,24.5,30.553,30.147,27.361,23.264,27.288,33.403,36.308,41.123,46.791,48.784,49.812,52.724,53.655,49.706,48.11,55.088,51.465,55.711,53.053,47.631,50.818,46.924,48.844,44.219],otherFossil:[2.274,2.615,3.127,3.529,3.525,3.78,3.802,4.006,5.714,6.6,6.001,4.913,5.204,5.865,6.003,6.283,6.015,5.521,5.118,5.092,4.891,5.147,5.453,5.72,5.762,5.356],nuclear:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],hydro:[16.466,16.124,16.095,16.211,15.687,15.466,14.945,13.049,11.815,12.642,13.746,19.572,17.036,19.089,14.484,14.087,17.629,13.5,17.311,14.021,14.421,15.943,16.661,15.098,13.337,12.611],bioenergy:[.89,.798,1.267,1.692,2.815,3.871,3.932,4.275,3.696,2.787,2.442,2.574,3.098,3.332,3.546,3.678,3.628,3.562,3.588,3.468,3.41,3.344,3.187,3.3,3.43,3.105],otherRenewables:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],wind:[.134,.287,.534,.704,.795,1.299,2.162,2.852,3.458,4.438,4.985,6.432,7.725,9.259,9.777,11.833,13.04,13.211,16.262,19.472,22.607,26.796,30.05,31.843,32.894,39.594],solar:[.047,.054,.058,.063,.073,.084,.097,.114,.139,.29,.978,2.045,2.412,3.847,4.952,6.196,7.44,8.918,12.332,18.297,23.845,31.194,37.544,45.922,51.849,58.381],demand:[216.829,224.255,223.495,225.952,229.217,230.74,237.991,243.185,245.371,249.902,250.962,256.304,250.672,249.563,247.647,253.984,258.219,258.967,262.632,265.9,265.162,267.452,272.922,274.78,283.92,285.922],total:[216.829,224.255,223.495,225.952,229.217,230.74,237.991,243.185,245.371,249.902,250.962,256.304,250.672,249.563,247.647,253.984,258.219,258.967,262.632,265.9,265.162,267.452,272.922,274.78,283.92,285.922]},brazil:{coal:[10.93,11.078,9.123,9.013,10.371,10.682,10.466,10.078,11.958,9.966,11.29,12.596,14.471,21.97,26.898,26.982,25.673,22.852,20.802,21.677,17.746,24.236,14.398,13.313,14.126,15.622],gas:[4.068,9.921,12.406,13.11,19.264,18.811,18.258,15.497,28.778,13.332,36.476,25.095,46.76,69.003,81.073,79.49,56.485,65.593,54.622,65.958,59.48,86.957,42.11,38.589,47.792,59.401],otherFossil:[15.617,16.34,13.934,11.287,12.874,12.542,13.083,14.483,17.941,14.802,16.101,14.741,19.069,25.867,34.448,28.715,15.056,18.119,15.009,14.116,14.563,22.63,12.201,11.528,12.1,9.507],nuclear:[6.046,14.279,13.836,13.358,11.611,9.855,13.754,12.35,13.969,12.957,14.523,15.659,16.038,15.45,15.378,14.734,15.864,15.739,15.674,16.129,14.053,14.705,14.559,14.504,15.767,15.797],hydro:[304.403,267.876,286.092,305.616,320.797,337.457,348.805,374.015,369.556,390.988,403.29,428.333,415.342,390.992,373.439,359.743,380.911,370.906,388.971,397.877,396.381,362.818,427.114,425.996,421.799,397.896],bioenergy:[7.855,9.022,10.27,11.939,12.515,13.643,14.846,18.063,19.786,22.876,31.942,32.629,35.766,40.972,47.079,49.88,51.335,52.912,54.382,54.921,58.742,56.011,55.022,57.756,61.433,61.596],otherRenewables:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],wind:[.001,.035,.061,.061,.061,.093,.237,.663,1.183,1.238,2.177,2.705,5.05,6.576,12.21,21.626,33.489,42.373,48.475,55.986,57.051,72.286,81.632,95.801,107.654,115.837],solar:[0,0,0,0,0,0,0,0,0,0,0,0,.002,.005,.016,.059,.085,.832,3.461,6.655,10.748,16.752,30.126,50.633,70.665,88.016],demand:[391.914,366.405,382.286,402.579,424.877,442.125,460.613,483.981,505.384,506.142,550.448,567.644,592.753,611.169,624.317,615.651,619.693,625.682,636.375,658.275,653.482,679.499,690.07,723.227,762.924,775.261],total:[348.921,328.551,345.723,364.385,387.492,403.083,419.449,445.149,463.172,466.158,515.799,531.758,552.498,570.835,590.542,581.228,578.898,589.327,601.396,633.318,628.764,656.396,677.162,708.119,751.335,763.673]},germany:{coal:[296.68,293.74,299.6,304.63,298.77,288.14,288.93,297.1,275.21,253.45,262.89,262.46,276.23,288.2,274.41,272.2,261.75,241.26,228.16,171.45,134.6,164.65,179.93,124.78,106.33,104.262],gas:[49.2,55.5,56.3,62.59,62.67,72.19,74.73,77.45,88.48,80.27,88.76,85.67,75.95,67,60.61,61.47,80.62,86.04,81.56,90,95,90.31,79.05,76.66,78.41,83.498],otherFossil:[18.05,20.52,18.53,23.08,23.12,26.53,26.71,26.58,25.74,23.23,26.59,24.47,24.77,25.25,24.67,25.57,25.39,25.16,23.63,22.4,21.28,22.24,21.65,20.96,20.39,18.705],nuclear:[169.61,171.3,164.84,165.06,167.07,163.05,167.27,140.53,148.49,134.93,140.56,107.97,99.46,97.29,97.13,91.79,84.63,76.32,76,75.07,64.38,69.13,34.71,7.22,0,0],hydro:[21.73,22.73,23.12,18.32,20.75,19.64,20.03,21.17,20.44,19.03,20.95,17.67,21.75,23,19.59,18.98,20.55,20.15,17.69,19.73,18.72,19.66,17.62,21.24,23.83,18.278],bioenergy:[4.33,4.59,5.31,8.95,10.64,14.71,18.94,24.62,28.02,30.89,33.92,36.89,43.2,45.51,48.29,50.33,50.93,50.92,50.79,50.13,50.93,49.1,48.6,51.26,51.08,50.089],otherRenewables:[0,0,0,0,0,0,0,0,.02,.02,.03,.02,.03,.08,.1,.13,.17,.16,.18,.2,.23,.24,.21,.19,.22,.227],wind:[9.35,10.46,15.86,19.09,26.02,27.77,31.32,40.51,41.38,39.42,38.55,49.86,51.68,52.74,58.5,80.62,79.92,105.69,109.95,125.89,132.11,114.16,124.81,140.54,137.429,132.272],solar:[0,.1,.2,.31,.56,1.31,2.27,3.14,4.51,6.72,11.96,19.99,26.74,30.62,35.45,38.08,37.56,38.76,44.32,45.22,49.5,49.34,60.3,63.87,74.13,89.704],demand:[572.01,582.6,593.76,598.76,606.98,608.77,613.22,614.54,612.19,575.69,609.26,601.23,599.27,597.5,584.87,590.89,591,592,583.54,567.42,547.72,560.25,539.62,515.94,518.089,516.525],total:[568.95,578.94,583.76,602.03,609.6,613.34,630.2,631.1,632.29,587.96,624.21,605,619.81,629.69,618.75,639.17,641.52,644.46,632.28,600.09,566.75,578.83,566.88,506.72,491.819,497.035]}},cap:{china:{solar:[.03,.04,.06,.07,.08,.14,.16,.2,.25,.41,1.02,3.11,6.72,17.76,28.4,43.55,77.82,130.83,175.26,204.97,253.86,306.97,393.03,609.92,887.1,1202.18],wind:[.34,.38,.45,.55,.76,1.06,2.07,4.2,8.39,17.6,29.63,46.35,61.6,76.73,96.82,131.05,148.52,164.37,184.66,209.58,281.99,328.97,365.96,441.89,521.27,640.63],solarAdd:[null,.01,.02,.01,.01,.06,.02,.04,.05,.16,.61,2.09,3.61,11.04,10.64,15.15,34.27,53.01,44.43,29.71,48.89,53.11,86.06,216.89,277.18,315.08],windAdd:[null,.04,.07,.1,.21,.3,1.01,2.13,4.19,9.21,12.03,16.72,15.25,15.13,20.09,34.23,17.47,15.85,20.29,24.92,72.41,46.98,36.99,75.93,79.38,119.36]},us:{solar:[.59,.46,.46,.68,.75,.88,1.1,1.44,1.62,2.09,3.38,5.64,8.61,13.04,17.65,23.44,34.72,43.11,51.57,60.83,75.79,94.79,112.84,139.93,177.59,211.61],wind:[2.38,3.86,4.42,5.99,6.46,8.71,11.33,16.51,24.65,34.3,39.13,45.68,59.08,59.97,64.23,72.57,81.29,87.6,94.52,103.67,118.48,132.85,141.5,147.52,152.65,158.83],solarAdd:[null,-.13,0,.22,.07,.13,.22,.34,.18,.47,1.29,2.26,2.97,4.43,4.61,5.79,11.28,8.39,8.46,9.26,14.96,19,18.05,27.09,37.66,34.02],windAdd:[null,1.48,.56,1.57,.47,2.25,2.62,5.18,8.14,9.65,4.83,6.55,13.4,.89,4.26,8.34,8.72,6.31,6.92,9.15,14.81,14.37,8.65,6.02,5.13,6.18]},india:{solar:[0,.01,.01,.01,.01,.01,.01,.03,.03,.04,.07,.57,.99,1.6,3.78,5.7,9.98,18.26,27.48,35.25,39.71,49.98,63.48,73.05,98.48,135.5],wind:[.94,1.56,1.61,2.46,3.81,4.43,6.32,7.84,10.24,10.93,13.18,16.18,17.3,18.42,22.47,25.09,28.7,32.85,35.29,37.51,38.56,40.07,41.93,44.74,48.16,54.51],solarAdd:[null,.01,0,0,0,0,0,.02,0,.01,.03,.5,.42,.61,2.18,1.92,4.28,8.28,9.22,7.77,4.46,10.27,13.5,9.57,25.43,37.02],windAdd:[null,.62,.05,.85,1.35,.62,1.89,1.52,2.4,.69,2.25,3,1.12,1.12,4.05,2.62,3.61,4.15,2.44,2.22,1.05,1.51,1.86,2.81,3.42,6.35]},eu:{solar:[.19,.28,.37,.6,1.31,2.29,3.25,5.01,10.46,17.03,30.49,53.1,70.84,79.43,83.28,87.22,90.94,94.94,102.89,118.81,136.96,163.65,196.1,250.54,310.11,366.39],wind:[12.3,16.84,22.6,27.25,33.15,38.76,45.59,53.42,60.11,70.85,78.93,87.4,97.15,105.63,115.62,127.17,137.97,148.91,157.21,167.16,176.99,187.83,203.71,218.86,231.15,243.43],solarAdd:[null,.09,.09,.23,.71,.98,.96,1.76,5.45,6.57,13.46,22.61,17.74,8.59,3.85,3.94,3.72,4,7.95,15.92,18.15,26.69,32.45,54.44,59.57,56.28],windAdd:[null,4.54,5.76,4.65,5.9,5.61,6.83,7.83,6.69,10.74,8.08,8.47,9.75,8.48,9.99,11.55,10.8,10.94,8.3,9.95,9.83,10.84,15.88,15.15,12.29,12.28]}},implicitZero:["china:2000:otherRenewables","china:2001:otherRenewables","china:2002:otherRenewables","china:2003:otherRenewables","china:2004:otherRenewables","china:2005:otherRenewables","china:2006:otherRenewables","china:2007:otherRenewables","china:2008:otherRenewables","china:2009:otherRenewables","china:2010:otherRenewables","china:2011:otherRenewables","china:2012:otherRenewables","china:2013:otherRenewables","china:2014:otherRenewables","china:2015:otherRenewables","china:2016:otherRenewables","china:2017:otherRenewables","china:2018:otherRenewables","china:2019:otherRenewables","china:2020:otherRenewables","china:2021:otherRenewables","china:2022:otherRenewables","china:2023:otherRenewables","china:2024:otherRenewables","china:2025:otherRenewables","india:2000:otherRenewables","india:2001:otherRenewables","india:2002:otherRenewables","india:2003:otherRenewables","india:2004:otherRenewables","india:2005:otherRenewables","india:2006:otherRenewables","india:2007:otherRenewables","india:2008:otherRenewables","india:2009:otherRenewables","india:2010:otherRenewables","india:2011:otherRenewables","india:2012:otherRenewables","india:2013:otherRenewables","india:2014:otherRenewables","india:2015:otherRenewables","india:2016:otherRenewables","india:2017:otherRenewables","india:2018:otherRenewables","india:2019:otherRenewables","india:2020:otherRenewables","india:2021:otherRenewables","india:2022:otherRenewables","india:2023:otherRenewables","india:2024:otherRenewables","india:2025:otherRenewables","japan:2000:otherRenewables","japan:2001:otherRenewables","japan:2002:otherRenewables","japan:2003:otherRenewables","japan:2004:otherRenewables","japan:2005:otherRenewables","japan:2006:otherRenewables","japan:2007:otherRenewables","japan:2008:otherRenewables","japan:2009:otherRenewables","japan:2010:otherRenewables","japan:2011:otherRenewables","japan:2012:otherRenewables","japan:2013:otherRenewables","japan:2014:otherRenewables","japan:2015:otherRenewables","japan:2016:otherRenewables","japan:2017:otherRenewables","japan:2018:otherRenewables","japan:2019:otherRenewables","japan:2020:otherRenewables","japan:2021:otherRenewables","japan:2022:otherRenewables","japan:2023:otherRenewables","japan:2024:otherRenewables","japan:2025:otherRenewables","korea:2000:otherRenewables","korea:2001:otherRenewables","korea:2002:otherRenewables","korea:2003:otherRenewables","korea:2004:otherRenewables","korea:2005:otherRenewables","korea:2006:otherRenewables","korea:2007:otherRenewables","korea:2008:otherRenewables","korea:2009:otherRenewables","korea:2010:otherRenewables","korea:2011:otherRenewables","korea:2012:otherRenewables","korea:2013:otherRenewables","korea:2014:otherRenewables","korea:2015:otherRenewables","korea:2016:otherRenewables","korea:2017:otherRenewables","korea:2018:otherRenewables","korea:2019:otherRenewables","korea:2020:otherRenewables","korea:2021:otherRenewables","korea:2022:otherRenewables","korea:2023:otherRenewables","korea:2024:otherRenewables","korea:2025:otherRenewables","australia:2000:nuclear+otherRenewables","australia:2001:nuclear+otherRenewables","australia:2002:nuclear+otherRenewables","australia:2003:nuclear+otherRenewables","australia:2004:nuclear+otherRenewables","australia:2005:nuclear+otherRenewables","australia:2006:otherRenewables","australia:2007:otherRenewables","australia:2008:otherRenewables","australia:2009:otherRenewables","australia:2010:otherRenewables","australia:2011:otherRenewables","australia:2012:otherRenewables","australia:2013:otherRenewables","australia:2014:otherRenewables","australia:2015:otherRenewables","australia:2016:otherRenewables","australia:2017:otherRenewables","australia:2018:otherRenewables","australia:2019:otherRenewables","australia:2020:otherRenewables","australia:2021:otherRenewables","australia:2022:otherRenewables","australia:2023:otherRenewables","australia:2024:otherRenewables","australia:2025:otherRenewables","brazil:2000:otherRenewables","brazil:2001:otherRenewables","brazil:2002:otherRenewables","brazil:2003:otherRenewables","brazil:2004:otherRenewables","brazil:2005:otherRenewables","brazil:2006:otherRenewables","brazil:2007:otherRenewables","brazil:2008:otherRenewables","brazil:2009:otherRenewables","brazil:2010:otherRenewables","brazil:2011:otherRenewables","brazil:2012:otherRenewables","brazil:2013:otherRenewables","brazil:2014:otherRenewables","brazil:2015:otherRenewables","brazil:2016:otherRenewables","brazil:2017:otherRenewables","brazil:2018:otherRenewables","brazil:2019:otherRenewables","brazil:2020:otherRenewables","brazil:2021:otherRenewables","brazil:2022:otherRenewables","brazil:2023:otherRenewables","brazil:2024:otherRenewables","brazil:2025:otherRenewables"]};var Tl={coal:v.coal,gas:v.gas,otherFossil:v.oil,nuclear:v.nuclear,hydro:v.hydro,bioenergy:v.biomass,otherRenewables:v.storage,wind:v.wind,solar:v.solar},Oy={world:"world",china:"china",us:"us",eu:"eu",india:"india",me:"middleeast",africa:"africa",lac:"latam",asean:"asean",japan:"japan",korea:"korea",australia:"australia",brazil:"brazil",germany:"germany"},El=2015,Ch=It.years.indexOf(El),Kr=It.years.length-1,Jr=It.years[Kr],Zr=It.regions.filter(i=>i.id!=="world");function Bf(i){return It.regions.find(e=>e.id===i)}function By(i,e=4){if(!(i>0))return 1;let t=i/e,n=Math.pow(10,Math.floor(Math.log10(t))),s=t/n,r=(s>=7.5?10:s>=3.5?5:s>=1.5?2:1)*n;return Math.ceil((i-1e-9)/r)*r}function zy(i,e){let t=Math.max(i,1)/e,n=Math.pow(10,Math.floor(Math.log10(t))),s=t/n;return(s>=7.5?10:s>=3.5?5:s>=1.5?2:1)*n}function Gy(i){return i<460?4:i<980?2:1}function zf(i){return{top:26,bottom:48+(Gy(i)-1)*16}}function Rh(i){let e=Math.round(i);return(e<0?"\u2212":"")+Math.abs(e).toLocaleString("en-US")}function wl(i){let e=Math.round(i);return e>0?"+"+e.toLocaleString("en-US"):e<0?"\u2212"+Math.abs(e).toLocaleString("en-US"):"0"}function Wy(i,e){return e?(Math.round(100*i/e*10)/10).toFixed(1)+"%":"0%"}function Gf(i){let e=It.gen[i],t={total:e.total[Kr]-e.total[Ch]};for(let n of It.sources)t[n.id]=e[n.id][Kr]-e[n.id][Ch];return t}function Vy(i,e){return e>=520?i.short:i.id==="us"?"US":i.id==="lac"?"Lat. America":i.id==="korea"?"S. Korea":i.id==="me"?"M. East":i.short}function Wf(i,e,t,n){let r=e,l=t;for(let o of It.sources){let a=o.short,d=14+at(i,a,11);r>e&&r+d>n&&(r=e,l+=16),i.fillStyle=Tl[o.id],i.fillRect(r,l-5,10,10),X(i,a,r+14,l,{size:11,baseline:"middle",color:v.ink2,noclamp:!0}),r+=d+12}}function Vf(i,e){let t=[],n=(r,l)=>Math.abs(r.x-l.x)<(r.w+l.w)/2+6,s=i.find(r=>r.keep);s&&t.push(s);for(let r of i)r.keep||t.some(l=>n(l,r))||r.x-r.w/2<1||r.x+r.w/2>e-1||t.push(r);return t}function Hf(i){let e={view:"mix",region:"world",hoverYear:null,hoverId:null},t=null,n=()=>{if(e.view==="growth"){let M=e.hoverId||(e.region!=="world"?e.region:null);if(!M){let w=It.gen.world.total[Kr]-It.gen.world.total[Ch];return`<b>World</b>, ${El} to ${Jr}: generation <b>${wl(w)} TWh</b>. The bars are regions, drawn on one scale. They overlap, so they are not slices of this total. Hover a bar for the split by source.`}let _=Bf(M),x=Gf(M),T=It.sources.filter(w=>Math.abs(x[w.id])>=.5).map(w=>`${w.label} ${wl(x[w.id])}`);return`<b>${_.name}</b>, ${El} to ${Jr}: generation <b>${wl(x.total)} TWh</b>. ${T.join(", ")}.`}let u=Bf(e.region),h=e.hoverYear==null?Kr:e.hoverYear,f=It.gen[u.id],y=f.total[h],m=It.sources.filter(M=>Math.abs(f[M.id][h])>=.5).map(M=>`${M.label} ${Rh(f[M.id][h])} (${Wy(f[M.id][h],y)})`),g=`<b>${u.name}</b>, ${It.years[h]}: <b>${Rh(y)} TWh</b>. ${m.join(", ")}.`;return Math.abs(f.demand[h]-y)>=1&&(g+=` Demand ${Rh(f.demand[h])} TWh.`),g},s=new Qe(i,{label:"Electricity generation by source, 2000 to 2025, for the world and for selected regions. A second view shows the change from 2015 to 2025 by region, split by source.",height(u){let{top:h,bottom:f}=zf(u);return e.view==="growth"?h+Zr.length*(u<600?24:28)+f+4:h+(u<600?248:292)+f+4},draw(u,h,f){let y=h<600,{top:m,bottom:g}=zf(h);e.view==="growth"?l(u,h,f,m,g,y):r(u,h,f,m,g,y)}});function r(u,h,f,y,m,g){let M=It.gen[e.region],_=By(Math.max(...M.total)*1.04),x=Xs(0,_,g?3:4).filter(F=>F>=0&&F<=_+1e-6),T=x.map(F=>Math.round(F).toLocaleString("en-US")),w=Math.max(0,...T.map(F=>at(u,F,11))),E=g||w>58?x.map(F=>F>=1e3?F/1e3+"k":String(Math.round(F))):T,b=Math.max(0,...E.map(F=>at(u,F,11))),S={l:Math.ceil(b)+12,r:h-12,t:y,b:f-m},A=Qt(It.years[0],Jr,S.l+16,S.r-16),R=Qt(0,_,S.b,S.t);x.forEach((F,G)=>{let z=Math.round(R(F))+.5;X(u,E[G],S.l-6,z+4,{size:11,align:"right",color:v.ink3,noclamp:!0})});let O=(g?[2e3,2010,2020]:[2e3,2005,2010,2015,2020,2025]).map(F=>({s:String(F),x:A(F),w:at(u,String(F),11),keep:!1}));for(let F of Vf(O,h))X(u,F.s,F.x,S.b+15,{size:11,align:"center",color:v.ink3,noclamp:!0});X(u,g?"TWh":"Generation, TWh",S.r,14,{size:11,align:"right",color:v.ink3,weight:500,noclamp:!0}),u.save(),u.beginPath(),u.rect(S.l,S.t,S.r-S.l,S.b-S.t),u.clip();let L=M.total.map(()=>0),P=It.years.map(F=>A(F));for(let F of It.sources){let G=M[F.id].map((z,V)=>L[V]+Math.max(0,z));u.beginPath(),G.forEach((z,V)=>V?u.lineTo(P[V],R(z)):u.moveTo(P[V],R(z)));for(let z=P.length-1;z>=0;z--)u.lineTo(P[z],R(L[z]));u.closePath(),u.fillStyle=Tl[F.id],u.fill(),L=G}for(let F of x){if(F===0)continue;let G=Math.round(R(F))+.5;Me(u,S.l,G,S.r,G,"rgba(255,255,255,0.42)",1)}if(e.hoverYear!=null){let F=A(It.years[e.hoverYear]);Me(u,F,S.t,F,S.b,se(v.ink,.55),1.25)}u.restore(),Me(u,S.l,S.b+.5,S.r,S.b+.5,v.grid2,1),Wf(u,S.l,S.b+34,S.r),t={view:"mix",box:S,sx:A}}function l(u,h,f,y,m,g){let M=0,_=0,x=Zr.map(Z=>{let Y=Gf(Z.id),B=0,N=0;for(let q of It.sources)Y[q.id]>=0?N+=Y[q.id]:B+=Y[q.id];return M=Math.min(M,B),_=Math.max(_,N),Y}),T=zy(_-M,g?3:5),w=Math.min(0,Math.floor(M*1.06/T)*T),E=Math.max(T,Math.ceil(_*1.04/T)*T),b=(f-y-m)/Zr.length,S=g?11:12,A=0,R=Zr.map(Z=>{let Y=Vy(Z,h);return A=Math.max(A,at(u,Y,S,650)),Y}),I=11,O=0,D=x.map(Z=>{let Y=wl(Z.total);return O=Math.max(O,at(u,Y,I,600)),Y}),L=h>380,P={l:Math.ceil(A)+14,r:h-(L?Math.ceil(O)+14:10),t:y,b:f-m},F=Qt(w,E,P.l,P.r),G=[];for(let Z=w;Z<=E+T*.01;Z+=T)G.push(Math.round(Z));let z=P.b+15,V=G.map(Z=>{let Y=(Z<0?"\u2212":"")+Math.abs(Z).toLocaleString("en-US");return{v:Z,s:Y,x:F(Z),w:at(u,Y,11),keep:Z===0}});for(let Z of Vf(V,h))X(u,Z.s,Z.x,z,{size:11,align:"center",color:v.ink3,noclamp:!0});let U=g?"Change, TWh":`Change from ${El} to ${Jr}, TWh`,H=at(u,U,11,500);P.r-H>P.l+8?X(u,U,P.r,14,{size:11,align:"right",color:v.ink3,weight:500,noclamp:!0}):X(u,"TWh",P.r,14,{size:11,align:"right",color:v.ink3,weight:500,noclamp:!0});let K=[];Zr.forEach((Z,Y)=>{let B=P.t+Y*b,N=B+b/2,q=e.hoverId===Z.id||!e.hoverId&&e.region===Z.id;q&&(u.fillStyle=se(v.ink,.05),u.fillRect(0,B+1,h,b-2)),X(u,R[Y],P.l-8,N,{size:S,align:"right",baseline:"middle",color:q?v.ink:v.ink2,weight:q?650:450,noclamp:!0});let re=x[Y],ae=Math.max(8,Math.min(16,b-8)),he=N-ae/2,xe=0,ne=0;for(let fe of It.sources){let me=re[fe.id];if(me>.05){let ye=F(xe),Q=F(xe+me);u.fillStyle=Tl[fe.id],u.fillRect(ye,he,Math.max(.7,Q-ye),ae),xe+=me}else if(me<-.05){let ye=F(ne+me),Q=F(ne);u.fillStyle=Tl[fe.id],u.fillRect(ye,he,Math.max(.7,Q-ye),ae),ne+=me}}L&&X(u,D[Y],P.r+6,N,{size:I,baseline:"middle",color:v.ink2,weight:600,noclamp:!0}),K.push({id:Z.id,y0:B,y1:B+b})});let ce=F(0);Me(u,ce,P.t,ce,P.b,v.ink3,1),Wf(u,8,P.b+34,h-8),t={view:"growth",box:P,rows:K,sx:F}}function o(u,h){if(!t)return null;if(t.view==="mix"){if(u<t.box.l||u>t.box.r||h<t.box.t||h>t.box.b)return null;let y=Ae(Math.round(t.sx.inv(u)),It.years[0],Jr);return{kind:"year",i:It.years.indexOf(y)}}let f=t.rows.find(y=>h>=y.y0&&h<y.y1);return f?{kind:"row",id:f.id}:null}s.interact({hit:o,cursor:"crosshair",hover(u){a(u)},down(u,h,f){a(o(h,f))},move(u,h,f){a(o(h,f))}});function a(u){let h=u&&u.kind==="year"?u.i:null,f=u&&u.kind==="row"?u.id:null;h===e.hoverYear&&f===e.hoverId||(e.hoverYear=h,e.hoverId=f,c.innerHTML=n())}let d=tt(i),c=ct(i),p=()=>{c.innerHTML=n(),s.resize(),s.invalidate()};rt(d,{label:"Show",options:[{label:"Mix over time",value:"mix",name:"wm-view-mix"},{label:"Growth since 2015",value:"growth",name:"wm-view-growth"}],value:e.view,onchange:u=>{e.view=u,e.hoverYear=null,e.hoverId=null,p()}}),rt(d,{label:"Region",options:It.regions.map(u=>({label:u.short,value:u.id,name:"wm-"+Oy[u.id]})),value:e.region,onchange:u=>{e.region=u,p()}}),c.innerHTML=n()}var jr={Bangladesh:[[1991,14.3],[1992,9.9],[1993,12.7],[1994,17.8],[1995,18.3],[1996,21.1],[1997,22.4],[1998,26.7],[1999,29.5],[2e3,32],[2001,35],[2002,37.8],[2003,40.5],[2004,40.6],[2005,44.2],[2006,50.5],[2007,46.5],[2008,54.3],[2009,57.1],[2010,55.3],[2011,59.6],[2012,65.5],[2013,61.5],[2014,62.4],[2015,74],[2016,75.9],[2017,88],[2018,86.9],[2019,92.2],[2020,96.2],[2021,99],[2022,99.4],[2023,99.5],[2024,99.5]],Brazil:[[1990,87.5],[1991,90.6],[1992,88.8],[1993,90],[1994,91.9],[1995,91.7],[1996,92.9],[1997,93.4],[1998,94.2],[1999,94.8],[2e3,94.4],[2001,96],[2002,96.7],[2003,97],[2004,96.8],[2005,97.1],[2006,97.6],[2007,98.1],[2008,98.5],[2009,98.9],[2010,98.6],[2011,99.3],[2012,99.5],[2013,99.6],[2014,99.7],[2015,99.7],[2016,99.7],[2017,99.8],[2018,99.7],[2019,99.8],[2020,99.7],[2021,99.5],[2022,100],[2023,99.8],[2024,99.8]],China:[[2e3,96.7],[2001,97],[2002,97.2],[2003,97.4],[2004,97.7],[2005,97.9],[2006,98.2],[2007,98.5],[2008,98.8],[2009,99.1],[2010,99.7],[2011,99.9],[2012,99.9],[2013,100],[2014,100],[2015,100],[2016,100],[2017,100],[2018,100],[2019,100],[2020,100],[2021,100],[2022,100],[2023,100],[2024,100]],"Democratic Republic of Congo":[[2e3,6.7],[2001,7.1],[2002,7.7],[2003,8.3],[2004,9],[2005,6],[2006,10.2],[2007,15.2],[2008,11.6],[2009,12.3],[2010,13],[2011,13.7],[2012,15.4],[2013,15.2],[2014,13.5],[2015,16.6],[2016,17.3],[2017,18],[2018,18.7],[2019,19.1],[2020,20.1],[2021,20.8],[2022,21.5],[2023,22.1],[2024,22.5]],Ethiopia:[[2e3,12.7],[2001,10.2],[2002,11.9],[2003,13.5],[2004,15.2],[2005,14],[2006,18.6],[2007,20.3],[2008,22],[2009,23.7],[2010,25.5],[2011,23],[2012,29],[2013,30.8],[2014,27.2],[2015,29],[2016,42.9],[2017,44.3],[2018,44.8],[2019,48],[2020,51.1],[2021,54.2],[2022,55],[2023,55.4],[2024,56.6]],India:[[1993,50.9],[1994,49.8],[1995,51.4],[1996,53],[1997,54.6],[1998,56.2],[1999,60.1],[2e3,60.3],[2001,62],[2002,62.3],[2003,65.4],[2004,64.4],[2005,68.8],[2006,67.9],[2007,72.3],[2008,74.1],[2009,75],[2010,76.3],[2011,79.5],[2012,79.9],[2013,83.1],[2014,85.1],[2015,88],[2016,89.6],[2017,91.8],[2018,95.7],[2019,95.9],[2020,96.5],[2021,99.6],[2022,99.2],[2023,99.5],[2024,99.9]],Indonesia:[[1991,48.9],[1992,66.7],[1993,55.4],[1994,62.8],[1995,66.9],[1996,72.4],[1997,80.3],[1998,80.9],[1999,83.7],[2e3,86.3],[2001,86.3],[2002,87.6],[2003,87.9],[2004,89],[2005,84.8],[2006,90.6],[2007,91.1],[2008,92.7],[2009,93.6],[2010,94.2],[2011,94.8],[2012,96],[2013,96.5],[2014,97],[2015,97.5],[2016,97.6],[2017,98.1],[2018,98.5],[2019,98.8],[2020,97],[2021,99.2],[2022,100],[2023,99.4],[2024,99.9]],Kenya:[[1993,10.9],[1994,3.5],[1995,5.4],[1996,7.4],[1997,9.3],[1998,14.5],[1999,13.2],[2e3,15.2],[2001,17],[2002,18.9],[2003,16],[2004,22.6],[2005,24.5],[2006,26.4],[2007,28.3],[2008,30.3],[2009,23],[2010,19.2],[2011,36.2],[2012,38.1],[2013,40.1],[2014,36],[2015,41.6],[2016,53.1],[2017,55.8],[2018,61.2],[2019,69.7],[2020,71.5],[2021,76.5],[2022,76],[2023,76.2],[2024,77]],Nigeria:[[1990,27.3],[1991,35.2],[1992,36.1],[1993,37],[1994,37.8],[1995,38.7],[1996,39.5],[1997,40.4],[1998,41.3],[1999,44.9],[2e3,43.2],[2001,43.9],[2002,44.6],[2003,52.2],[2004,46.1],[2005,46.8],[2006,47.6],[2007,50.1],[2008,50.3],[2009,50],[2010,48],[2011,55.9],[2012,53],[2013,55.6],[2014,54.2],[2015,52.5],[2016,59.3],[2017,54.4],[2018,56.5],[2019,55.4],[2020,55.4],[2021,59.5],[2022,60.5],[2023,61.2],[2024,62.5]],Pakistan:[[1998,70.5],[1999,70.3],[2e3,72.8],[2001,73.9],[2002,74.9],[2003,76],[2004,77],[2005,78.1],[2006,79.1],[2007,80.2],[2008,81.4],[2009,82.5],[2010,87.1],[2011,87.8],[2012,88.6],[2013,89.3],[2014,90.1],[2015,91],[2016,91.8],[2017,92.7],[2018,93.4],[2019,93.9],[2020,94.5],[2021,94.9],[2022,95],[2023,95.6],[2024,95.7]],"South Africa":[[1996,57.6],[1997,69.5],[1998,64.9],[1999,71.3],[2e3,72.4],[2001,70.2],[2002,76.7],[2003,78.8],[2004,80.6],[2005,80.8],[2006,80.7],[2007,82],[2008,81.9],[2009,82.6],[2010,82.8],[2011,83.6],[2012,85.2],[2013,85.2],[2014,85.9],[2015,85.3],[2016,83.9],[2017,84.4],[2018,84.7],[2019,85],[2020,90],[2021,89.3],[2022,86.5],[2023,87.7],[2024,90.2]],"Sub-Saharan Africa (WB)":[[1996,28.5],[1997,28.4],[1998,28.6],[1999,30.1],[2e3,25.7],[2001,26.2],[2002,27.3],[2003,29.6],[2004,29.4],[2005,29.4],[2006,31.2],[2007,32.5],[2008,32.4],[2009,32.6],[2010,33.3],[2011,35.9],[2012,36.8],[2013,38],[2014,38.4],[2015,39.2],[2016,43.8],[2017,43.8],[2018,46.4],[2019,47.2],[2020,48.5],[2021,50.7],[2022,51.5],[2023,53.3],[2024,55.1]],Vietnam:[[1997,78.4],[1998,86.2],[1999,87],[2e3,88.2],[2001,88.9],[2002,89.1],[2003,90.3],[2004,91],[2005,96.1],[2006,96],[2007,93.1],[2008,93.8],[2009,96.1],[2010,97.4],[2011,99],[2012,97.9],[2013,98.5],[2014,99.2],[2015,99.3],[2016,99.2],[2017,100],[2018,100],[2019,99.4],[2020,99.8],[2021,100],[2022,100],[2023,99.8],[2024,100]],World:[[1998,73.2],[1999,74.5],[2e3,78.2],[2001,78.7],[2002,79.1],[2003,80],[2004,80],[2005,80.7],[2006,81.4],[2007,82],[2008,82.7],[2009,82.9],[2010,83.5],[2011,84.5],[2012,84.9],[2013,85.7],[2014,86.2],[2015,86.9],[2016,88.1],[2017,88.9],[2018,89.8],[2019,90.1],[2020,90.4],[2021,91.3],[2022,91.3],[2023,91.6],[2024,91.9]]};var ri=[["Germany",[14.81,11.3,12.41],[13.26,10.12,11.11]],["Belgium",[15.41,11.96,7.99],[13.72,10.65,7.11]],["Denmark",[9.64,7.9,16.59],[7.37,6.04,12.7]],["Ireland",[22.9,12.45,-1.59],[19.35,10.52,-1.34]],["Czechia",[14.94,9.47,7.96],[17.96,11.38,9.57]],["Italy",[18,4.44,8.88],[18.82,4.64,9.28]],["Austria",[16,9.59,5.3],[13.93,8.35,4.62]],["EU average",[12.46,8.15,8.26],[12.56,8.06,8.28]],["Sweden",[6.87,10.67,9.36],[5.64,8.75,7.68]],["Spain",[11.08,7.12,8.18],[12.35,7.94,9.12]],["Poland",[7.72,7.25,11.29],[10.59,9.94,15.48]],["France",[10.88,7.59,7.73],[9.99,6.97,7.1]],["Netherlands",[14.67,11.35,-1.36],[12.5,9.67,-1.16]],["Portugal",[11.8,4.26,8.04],[14.31,5.17,9.76]],["Romania",[10.86,7.38,5.68],[18.58,12.63,9.73]],["Greece",[16.11,3.34,3.93],[19.82,4.11,4.84]],["Finland",[7.38,8.42,6.86],[6.14,7.01,5.71]],["Norway",[6.29,9.67,3.51],[5.12,7.87,2.86]],["Bulgaria",[7.66,3.41,2.21],[12.48,5.55,3.6]],["Hungary",[2.53,5.96,2.29],[3.53,8.32,3.2]],["T\xFCrkiye",[1.74,3.47,.61],[4.66,9.29,1.63]]],$f={Italy:1.478,Germany:1.317,Denmark:1.019,France:1.289,Spain:1.57,Australia:1.062,Chile:2.03,Japan:1.523,Kenya:3.037,"South Africa":2.38,Philippines:2.762,US:1,Norway:1.126,Brazil:2.135,"South Korea":1.563,Canada:1.104,Mexico:1.695,Indonesia:3.106,Vietnam:3.375,China:2.027,India:4.205,T\u00FCrkiye:2.614,Pakistan:4.295,Bangladesh:3.504,"Saudi Arabia":1.992,Nigeria:5.57,Egypt:6.516,Ethiopia:3.372};var Ph={asia:{label:"Asia",name:"ac-asia",list:["China","Vietnam","Indonesia","India","Bangladesh","Pakistan"]},africa:{label:"Africa",name:"ac-africa",list:["South Africa","Kenya","Nigeria","Ethiopia","Sub-Saharan Africa (WB)","Democratic Republic of Congo"]}},Xf=["#c0392b","#2e86c1","#d68910","#7d3c98","#17a589","#6e5f4f"],Hy={"Sub-Saharan Africa (WB)":"Sub-Saharan Africa","Democratic Republic of Congo":"DR Congo"};function Yf(i){let e={g:"asia",hover:null},t=new Qe(i,{label:"Share of the population with access to electricity, 1990 to 2024, for the world and selected countries in Asia or Africa",height:l=>l<600?360:340,draw(l,o,a){let d=o<600,c={l:d?40:56,r:o-(d?112:170),t:30,b:a-34},{sx:p,sy:u}=dt(l,{box:c,x0:1990,x1:2024,y0:0,y1:100,xticks:d?[1990,2005,2020]:[1990,1995,2e3,2005,2010,2015,2020],yticks:[0,25,50,75,100],xfmt:String,yfmt:m=>m+"%",ylabel:"share of people with electricity"}),h=["World",...Ph[e.g].list],f=[];h.forEach((m,g)=>{let M=jr[m];if(!M)return;let _=m==="World"?v.ink:Xf[(g-1)%Xf.length],x=e.hover===m,T=m==="World"||x?3:2;$e(l,M.map(([b,S])=>[p(b),u(S)]),e.hover&&!x&&m!=="World"?se(_,.35):_,T);let[w,E]=M[M.length-1];Ce(l,p(w),u(E),3,_),f.push({n:m,col:_,y:u(E),v:E,x:p(w)})}),f.sort((m,g)=>m.y-g.y);let y=14;for(let m=1;m<f.length;m++)f[m].y<f[m-1].y+y&&(f[m].y=f[m-1].y+y);for(let m=f.length-1;m>=0;m--){let g=c.b+4-(f.length-1-m)*y;f[m].y>g&&(f[m].y=g),m<f.length-1&&f[m].y>f[m+1].y-y&&(f[m].y=f[m+1].y-y)}f.forEach(m=>{Me(l,m.x+4,u(m.v),c.r+6,m.y-4,se(m.col,.4),1),X(l,`${Hy[m.n]||m.n} ${Math.round(m.v)}%`,c.r+9,m.y,{size:d?9.5:10.5,weight:m.n==="World"?700:600,color:ot(m.col,.1)})})}}),n=tt(i),s=ct(i);rt(n,{label:"Countries",options:Object.entries(Ph).map(([l,o])=>({label:o.label,value:l,name:o.name})),value:e.g,onchange:l=>{e.g=l,r()}});function r(){let l=Ph[e.g].list,o=d=>jr[d][0],a=d=>jr[d][jr[d].length-1];s.innerHTML=e.g==="asia"?`India went from <b>${o("India")[1]}%</b> of people with electricity in ${o("India")[0]} to <b>${a("India")[1]}%</b> in ${a("India")[0]}; Bangladesh from ${o("Bangladesh")[1]}% to ${a("Bangladesh")[1]}%. Most of Asia\u2019s electrification gap has closed in one generation.`:`In ${a("Sub-Saharan Africa (WB)")[0]}, only <b>${a("Sub-Saharan Africa (WB)")[1]}%</b> of people in sub-Saharan Africa had electricity, and <b>${a("Democratic Republic of Congo")[1]}%</b> in the DR Congo. Kenya rose from ${o("Kenya")[1]}% in ${o("Kenya")[0]} to ${a("Kenya")[1]}%, much of it through off-grid solar and mini-grids.`,t.invalidate()}r()}var qf=[{k:"vi",n:"Vertically integrated, state-owned",ex:"China (State Grid, CSG, provincial dispatch), Saudi Arabia, most of Africa (Eskom, KPLC), Vietnam (EVN)",how:"One company \u2014 usually the state \u2014 owns generation, the grid and retail. Tariffs are set by government; plants run in an order chosen by the operator or by quota, not by bids.",col:"#7d3c98"},{k:"sb",n:"Single buyer",ex:"India (state DISCOMs buying under long-term PPAs), Indonesia (PLN), Malaysia, Gulf IPPs (UAE, Oman)",how:"Private plants sell under long contracts to one state-owned buyer, which passes costs on through regulated tariffs. India adds exchanges (IEX) for a small share of power.",col:"#2e86c1"},{k:"vir",n:"Regulated utilities (cost of service)",ex:"US South-east and West outside ISOs, Japan before 2016, South Korea (KEPCO)",how:"Investor- or state-owned monopolies earn a regulated return on assets; regulators approve rates and investment.",col:"#6e5f4f"},{k:"eo",n:"Energy-only market",ex:"Texas (ERCOT), Australia (NEM)",how:"Generators are paid only for energy. High price caps (US$5,000/MWh in ERCOT; A$20,300/MWh in the NEM for 2025\u201326) must fund new capacity through rare scarcity hours.",col:"#c0392b"},{k:"cm",n:"Energy market + capacity market",ex:"PJM and other US eastern ISOs, Great Britain, Italy, Japan (since 2020 auction)",how:"A separate auction pays plants to be available years ahead, on top of energy revenues.",col:"#d68910"},{k:"z",n:"Zonal pricing",ex:"EU (Germany\u2013Luxembourg is one zone; Italy, Nordics split), Australia NEM (five regions), Japan (JEPX areas)",how:"One price per large zone; congestion inside a zone is fixed afterwards by redispatch.",col:"#17a589"},{k:"n",n:"Nodal pricing",ex:"ERCOT, PJM, CAISO, MISO, New Zealand, Singapore, Chile (cost-based)",how:"Each substation has its own price, including the cost of congestion and losses.",col:"#1f618d"}];function Jf(i){let e={sel:3},t=[],n=new Qe(i,{label:"Seven ways electricity systems are organised around the world, with examples; hover a row for details",height:l=>l<600?300:258,draw(l,o,a){let d=o<600,c=d?40:34;t=[],qf.forEach((p,u)=>{let h=10+u*c,f=e.sel===u;f&&(l.fillStyle=se(p.col,.1),He(l,0,h,o,c-4,6),l.fill()),l.fillStyle=p.col,He(l,6,h+6,6,c-16,3),l.fill(),X(l,p.n,20,h+(d?15:(c-4)/2+4),{size:d?11:12,weight:f?700:600,color:v.ink});let y=p.ex,m=d?20:300,g=o-m-8,M=d?9.5:10.5;for(;at(l,y,M)>g&&y.length>10;)y=y.slice(0,y.lastIndexOf(",")>0?y.lastIndexOf(","):y.length-4)+"\u2026";X(l,y,m,h+(d?30:(c-4)/2+4),{size:M,color:v.ink2}),t.push({i:u,y0:h,y1:h+c})})}});n.interact({hit:(l,o)=>t.find(a=>o>=a.y0&&o<a.y1),hover:l=>{l&&l.i!==e.sel&&(e.sel=l.i,r())},down:l=>{l&&(e.sel=l.i,r())},cursor:l=>l?"pointer":null});let s=ct(i);function r(){let l=qf[e.sel];s.innerHTML=`<b>${l.n}.</b> ${l.how} <i>Examples:</i> ${l.ex}.`,n.invalidate()}r()}var $s=[["Italy",.415,.408],["Germany",.409,.284],["Denmark",.352,.228],["France",.276,.186],["Spain",.259,.134],["Australia",.259,.244],["Chile",.231,.172],["Japan",.227,.2],["Kenya",.218,.175],["South Africa",.215,.108],["Philippines",.211,.158],["US",.19,.15],["Norway",.169,.117],["Brazil",.166,.134],["South Korea",.126,.119],["Canada",.123,.11],["Mexico",.11,.212],["Indonesia",.09,.069],["Vietnam",.078,.078],["China",.076,.109],["India",.076,.122],["T\xFCrkiye",.067,.135],["Pakistan",.063,.152],["Bangladesh",.063,.102],["Saudi Arabia",.052,.07],["Nigeria",.036,.05],["Egypt",.023,.039],["Ethiopia",.006,.019]];function Zf(i){let e={cur:"USD",hover:null,ppp:!1},t=c=>e.ppp&&$f[c]||1,n=()=>$s.map(([c,p,u])=>[c,p*t(c),u*t(c)]).sort((c,p)=>p[1]-c[1]),s=()=>!e.ppp&&e.cur==="EUR"?1/an[2026]:1,r=()=>!e.ppp&&e.cur==="EUR"?"\u20AC":"$",l=new Qe(i,{label:"Household and business electricity prices in 28 countries, third quarter of 2026, including taxes",height:c=>(c<600?15:16)*$s.length+82,draw(c,p,u){let h=p<600,f=h?15:16;e.rh=f;let y=h?84:110,m=p-(h?40:60),g=34,M=e.ppp?.72:.45,_=x=>y+x/M*(m-y);X(c,e.ppp?"international dollars (PPP) per kWh":r()==="\u20AC"?"euros per kWh":"US dollars per kWh",m,g+f*$s.length+30,{size:9.5,color:v.ink3,align:"right"}),X(c,"households",y,14,{size:10.5,weight:700,color:v.solar}),X(c,"\u25C6 businesses",y+76,14,{size:10.5,weight:700,color:v.ink2}),(e.ppp?[0,.2,.4,.6]:[0,.1,.2,.3,.4]).forEach(x=>{Me(c,_(x),g-6,_(x),g+f*$s.length,se(v.ink,.08),1),X(c,r()+(x*s()).toFixed(2),_(x),g+f*$s.length+14,{size:9.5,color:v.ink3,align:"center"})}),n().forEach(([x,T,w],E)=>{let b=g+E*f,S=e.hover===E||x==="Germany"||x==="US"||x==="China"||x==="India";X(c,x,y-6,b+f*.7,{size:h?9.5:10.5,align:"right",weight:S?700:450,color:S?v.ink:v.ink2}),c.fillStyle=e.hover===E?v.solar:se(v.solar,S?.85:.6),He(c,y,b+2,_(T)-y,f-5,2),c.fill();let A=_(w),R=b+f/2;c.fillStyle=v.ink2,c.beginPath(),c.moveTo(A,R-4),c.lineTo(A+4,R),c.lineTo(A,R+4),c.lineTo(A-4,R),c.fill(),(e.hover===E||!h)&&X(c,(T*s()*100).toFixed(1),Math.max(_(T),A)+7,b+f*.7,{size:9,color:v.ink3})})}}),o=tt(i),a=ct(i);l.interact({hit:(c,p)=>{let u=Math.floor((p-34)/(e.rh||16));return u>=0&&u<$s.length?{i:u}:null},hover:c=>{let p=c?c.i:null;p!==e.hover&&(e.hover=p,d())},down:c=>{c&&(e.hover=c.i,d())},cursor:c=>c?"pointer":null}),rt(o,{label:"Exchange rate",options:[{label:"Market",value:!1,name:"rw-fx"},{label:"Purchasing power",value:!0,name:"rw-ppp"}],value:!1,onchange:c=>{e.ppp=c,e.hover=null,d()}}),mi(o,c=>{e.cur=c,d()},"rw");function d(){let c=p=>(p*s()*100).toFixed(1)+(e.ppp?" PPP \xA2":e.cur==="EUR"?" euro cents":"\xA2");if(e.hover!=null){let[p,u,h]=n()[e.hover];a.innerHTML=`<b>${p}</b>: households pay <b>${c(u)}</b> per kWh, businesses <b>${c(h)}</b>.`}else if(e.ppp){let p=u=>n().find(h=>h[0]===u)[1];a.innerHTML=`Measured by what money buys locally, an Indian household pays <b>${c(p("India"))}</b> per kWh, a Nigerian one <b>${c(p("Nigeria"))}</b> and a Kenyan one <b>${c(p("Kenya"))}</b> \u2014 against <b>${c(p("US"))}</b> in the US. Electricity is cheap in poor countries only at market exchange rates.`}else a.innerHTML=`A German household pays <b>${c(.409)}</b> per kWh, an American one <b>${c(.19)}</b>, a Chinese or Indian one about <b>${c(.076)}</b>. Where households pay less than businesses (China, India, Pakistan, Mexico), tariffs are being used as social policy.`;l.invalidate()}d()}function Kf(i){let e={view:"nom",cur:"USD",hover:null},t=[["energy & supply",v.procurement],["network",v.network],["taxes & levies",v.taxes]],n=()=>e.view==="pps"?1:e.cur==="USD"?an[2025]:1,s=()=>e.view==="pps"?" PPS \xA2":e.cur==="USD"?"\xA2":" euro \xA2",r=()=>ri.map((c,p)=>p).sort((c,p)=>{let u=h=>ri[h][e.view==="pps"?2:1].reduce((f,y)=>f+y,0);return u(p)-u(c)}),l=new Qe(i,{label:"Household electricity prices in 2025 in 20 European countries and the EU average, split into energy and supply, network charges, and taxes and levies, in nominal terms or at purchasing-power standards",height:c=>(c<600?16:17)*ri.length+80,draw(c,p,u){let h=p<600,f=h?16:17;e.rh=f;let y=h?82:104,m=p-(h?30:50),g=38,M=-3,_=50,x=w=>y+(w-M)/(_-M)*(m-y),T=y;t.forEach(([w,E])=>{c.fillStyle=E,c.fillRect(T,8,10,10),X(c,w,T+14,17,{size:10.5,color:v.ink2}),T+=26+at(c,w,10.5)}),[0,10,20,30,40,50].forEach(w=>{Me(c,x(w),g-4,x(w),g+f*ri.length,se(v.ink,w===0?.3:.08),1),X(c,String(w),x(w),g+f*ri.length+14,{size:9.5,color:v.ink3,align:"center"})}),X(c,e.view==="pps"?"PPS cents per kWh":e.cur==="USD"?"US cents per kWh":"euro cents per kWh",m,g+f*ri.length+28,{size:9.5,color:v.ink3,align:"right"}),r().forEach((w,E)=>{let[b,S,A]=ri[w],R=(e.view==="pps"?A:S).map(P=>P*n()),I=g+E*f,O=e.hover===E||b==="Germany"||b==="EU average";X(c,b,y-6,I+f*.7,{size:h?9.5:10.5,align:"right",weight:O?700:450,color:O?v.ink:v.ink2});let D=0;R.forEach((P,F)=>{let G=P>=0?D:0,z=P>=0?D+P:P;c.fillStyle=e.hover!=null&&e.hover!==E?se(t[F][1],.45):t[F][1],c.fillRect(x(Math.min(G,z)),I+2,Math.abs(x(z)-x(G)),f-5),P>=0&&(D+=P)});let L=R.reduce((P,F)=>P+F,0);(!h||e.hover===E)&&X(c,L.toFixed(1),x(D)+5,I+f*.7,{size:9,color:v.ink3})})}});l.interact({hit:(c,p)=>{let u=Math.floor((p-38)/(e.rh||17));return u>=0&&u<ri.length?{i:u}:null},hover:c=>{let p=c?c.i:null;p!==e.hover&&(e.hover=p,d())},down:c=>{c&&(e.hover=c.i,d())},cursor:c=>c?"pointer":null});let o=tt(i),a=ct(i);rt(o,{label:"View",options:[{label:"Nominal",value:"nom",name:"bw-nom"},{label:"Purchasing power",value:"pps",name:"bw-pps"}],value:"nom",onchange:c=>{e.view=c,d()}}),mi(o,c=>{e.cur=c,d()},"bw");function d(){let c=p=>(p*n()).toFixed(1)+s();if(e.hover!=null){let[p,u,h]=ri[r()[e.hover]],f=e.view==="pps"?h:u;a.innerHTML=`<b>${p}</b>: energy and supply <b>${c(f[0])}</b>, network <b>${c(f[1])}</b>, taxes and levies <b>${c(f[2])}</b>; total ${c(f[0]+f[1]+f[2])} per kWh.`}else a.innerHTML=e.view==="pps"?"Adjusted for what money buys locally, the ranking changes: Romanian, Czech and Polish households pay the most in Europe, more than German ones; Hungarian, Turkish and Norwegian households the least. Purchasing-power standards (PPS) are an artificial currency in which one PPS buys the same basket everywhere in the EU.":"In Germany, Denmark, Sweden and Poland less than 40% of the bill is energy; in Ireland, Greece and Italy most of it is. In Denmark taxes are the largest part; in Ireland and the Netherlands tax credits push the tax layer below zero. Hover a row to read it.";l.invalidate()}d()}var $y={hero3d:qd,drift:Jh,potential:Zh,powerEnergy:Kh,faraday:Qh,rankine:Zd,windPower:Kd,betz:jd,solarDay:ef,losses:nf,transformer:sf,frequency:rf,merit:ml,gridDay:wh,capture:bf,network:wf,timeline:lf,spot:cf,bill:hf,usCompare:uf,lcoe:df,lazardHistory:ff,historyChart:Af,offset:Rf,heatPump:Cf,adequacy:Pf,learning:Df,foak:Nf,cleanGrid:Uf,energyShare:kf,unlock:Of,worldMix:Hf,accessWorld:Yf,marketDesigns:Jf,retailWorld:Zf,billWorld:Kf,buildPlant:mf,rotor:i=>bh(i,{stage:1}),threePhase:i=>bh(i,{stage:2}),meritStack:i=>ml(i,{stage:1}),meritWind:i=>ml(i,{stage:2}),futureDay:i=>wh(i,{futures:!0,init:{season:"summer",weekend:!0,solarCap:150,windLevel:12,storageGW:20,flexGW:10}})};$h($y);})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
