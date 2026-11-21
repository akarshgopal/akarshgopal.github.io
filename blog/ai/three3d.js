(()=>{var Qh=0,oc=1,eu=2;var Tr=1,tu=2,Ds=3,Tn=0,Ht=1,Ut=2,$n=0,Ns=1,Ar=2,lc=3,cc=4,nu=5;var Zi=100,iu=101,su=102,ru=103,au=104,ou=200,lu=201,cu=202,hu=203,hc=204,uc=205,uu=206,du=207,fu=208,pu=209,mu=210,gu=211,xu=212,yu=213,_u=214,wa=0,Ta=1,Aa=2,Ms=3,Ra=4,Ca=5,Ia=6,Pa=7,Rr=0,vu=1,Mu=2,Hn=0,dc=1,fc=2,pc=3,Cr=4,mc=5,gc=6,xc=7;var yc=300,Di=301,Ji=302,uo=303,fo=304,Ir=306,Wi=1e3,Wn=1001,La=1002,$t=1003,bu=1004;var Pr=1005;var Kt=1006,po=1007;var Ni=1008;var fn=1009,_c=1010,vc=1011,Us=1012,mo=1013,Gn=1014,An=1015,zn=1016,go=1017,xo=1018,Fs=1020,Mc=35902,bc=35899,Ec=1021,Sc=1022,Rn=1023,Xn=1026,Ui=1027,yo=1028,_o=1029,Fi=1030,vo=1031;var Mo=1033,Lr=33776,Dr=33777,Nr=33778,Ur=33779,bo=35840,Eo=35841,So=35842,wo=35843,To=36196,Ao=37492,Ro=37496,Co=37488,Io=37489,Fr=37490,Po=37491,Lo=37808,Do=37809,No=37810,Uo=37811,Fo=37812,Bo=37813,Oo=37814,Ho=37815,Go=37816,zo=37817,ko=37818,Vo=37819,Wo=37820,Xo=37821,qo=36492,Yo=36494,$o=36495,Zo=36283,Jo=36284,Br=36285,Ko=36286;var ir=2300,Da=2301,Ea=2302,Kl=2303,jl=2400,Ql=2401,ec=2402;var Eu=3200;var Bs=0,Su=1,Cn="",Vt="srgb",sr="srgb-linear",rr="linear",_t="srgb";var Ai=7680,wc=7681;var Tc=517;var jo=519,wu=512,Tu=513,Au=514,Qo=515,Ru=516,Cu=517,el=518,Iu=519,Pu=35044;var Ac="300 es",Nn=2e3,bs=2001;function tf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function nf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Lu(){let i=ar("canvas");return i.style.display="block",i}var vh={},Es=null;function Rc(...i){let e="THREE."+i.shift();Es?Es("log",e,...i):console.log(e,...i)}function Du(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Je(...i){i=Du(i);let e="THREE."+i.shift();if(Es)Es("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function et(...i){i=Du(i);let e="THREE."+i.shift();if(Es)Es("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Vi(...i){let e=i.join(" ");e in vh||(vh[e]=!0,Je(...i))}function Nu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Uu={[wa]:Ta,[Aa]:Ia,[Ra]:Pa,[Ms]:Ca,[Ta]:wa,[Ia]:Aa,[Pa]:Ra,[Ca]:Ms},qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Sa=Math.PI/180,Na=180/Math.PI;function Or(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function ht(i,e,t){return Math.max(e,Math.min(t,i))}function sf(i,e){return(i%e+e)%e}function El(i,e,t){return(1-t)*i+t*e}function Ys(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function un(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Nc=class Nc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Nc.prototype.isVector2=!0;var Ue=Nc,Yn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],y=r[a+3];if(d!==y||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*y;m<0&&(u=-u,f=-f,g=-g,y=-y,m=-m);let p=1-o;if(m<.9995){let w=Math.acos(m),D=Math.sin(w);p=Math.sin(p*w)/D,o=Math.sin(o*w)/D,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+y*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+y*o;let w=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=w,c*=w,h*=w,d*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-o*f,e[t+2]=c*g+h*f+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Uc=class Uc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Sl.copy(this).projectOnVector(e),this.sub(Sl)}reflect(e){return this.sub(Sl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Uc.prototype.isVector3=!0;var R=Uc,Sl=new R,Mh=new Yn,Fc=class Fc{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],y=s[0],m=s[3],p=s[6],w=s[1],D=s[4],v=s[7],E=s[2],b=s[5],I=s[8];return r[0]=a*y+o*w+l*E,r[3]=a*m+o*D+l*b,r[6]=a*p+o*v+l*I,r[1]=c*y+h*w+d*E,r[4]=c*m+h*D+d*b,r[7]=c*p+h*v+d*I,r[2]=u*y+f*w+g*E,r[5]=u*m+f*D+g*b,r[8]=u*p+f*v+g*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=t*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=d*y,e[1]=(s*c-h*n)*y,e[2]=(o*n-s*a)*y,e[3]=u*y,e[4]=(h*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Vi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(wl.makeScale(e,t)),this}rotate(e){return Vi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(wl.makeRotation(-e)),this}translate(e,t){return Vi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(wl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Fc.prototype.isMatrix3=!0;var st=Fc,wl=new st,bh=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Eh=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function rf(){let i={enabled:!0,workingColorSpace:sr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===_t&&(s.r=li(s.r),s.g=li(s.g),s.b=li(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===_t&&(s.r=vs(s.r),s.g=vs(s.g),s.b=vs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Cn?rr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Vi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Vi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[sr]:{primaries:e,whitePoint:n,transfer:rr,toXYZ:bh,fromXYZ:Eh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Vt},outputColorSpaceConfig:{drawingBufferColorSpace:Vt}},[Vt]:{primaries:e,whitePoint:n,transfer:_t,toXYZ:bh,fromXYZ:Eh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Vt}}}),i}var ft=rf();function li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var as,Ua=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{as===void 0&&(as=ar("canvas")),as.width=e.width,as.height=e.height;let s=as.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=as}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ar("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=li(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(li(t[n]/255)*255):t[n]=li(t[n]);return{data:t,width:e.width,height:e.height}}else return Je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},af=0,Ss=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=Or(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Tl(s[a].image)):r.push(Tl(s[a]))}else r=Tl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Tl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ua.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Je("Texture: Unable to serialize Texture."),{})}var of=0,Al=new R,ln=class i extends qn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Wn,s=Wn,r=Kt,a=Ni,o=Rn,l=fn,c=i.DEFAULT_ANISOTROPY,h=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=Or(),this.name="",this.source=new Ss(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Al).x}get height(){return this.source.getSize(Al).y}get depth(){return this.source.getSize(Al).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Je(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wi:e.x=e.x-Math.floor(e.x);break;case Wn:e.x=e.x<0?0:1;break;case La:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wi:e.y=e.y-Math.floor(e.y);break;case Wn:e.y=e.y<0?0:1;break;case La:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=yc;ln.DEFAULT_ANISOTROPY=1;var Bc=class Bc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let D=(c+1)/2,v=(f+1)/2,E=(p+1)/2,b=(h+u)/4,I=(d+y)/4,_=(g+m)/4;return D>v&&D>E?D<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(D),s=b/n,r=I/n):v>E?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=b/s,r=_/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=I/r,s=_/r),this.set(n,s,r,t),this}let w=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(d-y)/w,this.z=(u-h)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Bc.prototype.isVector4=!0;var It=Bc,Fa=class extends qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new ln(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ss(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},dn=class extends Fa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},or=class extends ln{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ba=class extends ln{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ho=class ho{constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,y,m)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,y,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ho().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/os.setFromMatrixColumn(e,0).length(),r=1/os.setFromMatrixColumn(e,1).length(),a=1/os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,f=a*d,g=o*h,y=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-y*c,t[9]=-o*l,t[2]=y-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,g=c*h,y=c*d;t[0]=u+y*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=y+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,g=c*h,y=c*d;t[0]=u-y*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=y-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,g=o*h,y=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+y,t[1]=l*d,t[5]=y*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,g=o*l,y=o*c;t[0]=l*h,t[4]=y-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-y*d}else if(e.order==="XZY"){let u=a*l,f=a*c,g=o*l,y=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+y,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lf,e,cf)}lookAt(e,t,n){let s=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),bi.crossVectors(n,mn),bi.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),bi.crossVectors(n,mn)),bi.normalize(),Kr.crossVectors(mn,bi),s[0]=bi.x,s[4]=Kr.x,s[8]=mn.x,s[1]=bi.y,s[5]=Kr.y,s[9]=mn.y,s[2]=bi.z,s[6]=Kr.z,s[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],y=n[6],m=n[10],p=n[14],w=n[3],D=n[7],v=n[11],E=n[15],b=s[0],I=s[4],_=s[8],S=s[12],N=s[1],B=s[5],O=s[9],F=s[13],A=s[2],U=s[6],k=s[10],Y=s[14],z=s[3],P=s[7],H=s[11],L=s[15];return r[0]=a*b+o*N+l*A+c*z,r[4]=a*I+o*B+l*U+c*P,r[8]=a*_+o*O+l*k+c*H,r[12]=a*S+o*F+l*Y+c*L,r[1]=h*b+d*N+u*A+f*z,r[5]=h*I+d*B+u*U+f*P,r[9]=h*_+d*O+u*k+f*H,r[13]=h*S+d*F+u*Y+f*L,r[2]=g*b+y*N+m*A+p*z,r[6]=g*I+y*B+m*U+p*P,r[10]=g*_+y*O+m*k+p*H,r[14]=g*S+y*F+m*Y+p*L,r[3]=w*b+D*N+v*A+E*z,r[7]=w*I+D*B+v*U+E*P,r[11]=w*_+D*O+v*k+E*H,r[15]=w*S+D*F+v*Y+E*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],y=e[7],m=e[11],p=e[15],w=l*f-c*u,D=o*f-c*d,v=o*u-l*d,E=a*f-c*h,b=a*u-l*h,I=a*d-o*h;return t*(y*w-m*D+p*v)-n*(g*w-m*E+p*b)+s*(g*D-y*E+p*I)-r*(g*v-y*b+m*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],y=e[13],m=e[14],p=e[15],w=t*o-n*a,D=t*l-s*a,v=t*c-r*a,E=n*l-s*o,b=n*c-r*o,I=s*c-r*l,_=h*y-d*g,S=h*m-u*g,N=h*p-f*g,B=d*m-u*y,O=d*p-f*y,F=u*p-f*m,A=w*F-D*O+v*B+E*N-b*S+I*_;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/A;return e[0]=(o*F-l*O+c*B)*U,e[1]=(s*O-n*F-r*B)*U,e[2]=(y*I-m*b+p*E)*U,e[3]=(u*b-d*I-f*E)*U,e[4]=(l*N-a*F-c*S)*U,e[5]=(t*F-s*N+r*S)*U,e[6]=(m*v-g*I-p*D)*U,e[7]=(h*I-u*v+f*D)*U,e[8]=(a*O-o*N+c*_)*U,e[9]=(n*N-t*O-r*_)*U,e[10]=(g*b-y*v+p*w)*U,e[11]=(d*v-h*b-f*w)*U,e[12]=(o*S-a*B-l*_)*U,e[13]=(t*B-n*S+s*_)*U,e[14]=(y*D-g*E-m*w)*U,e[15]=(h*E-d*D+u*w)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,y=a*h,m=a*d,p=o*d,w=l*c,D=l*h,v=l*d,E=n.x,b=n.y,I=n.z;return s[0]=(1-(y+p))*E,s[1]=(f+v)*E,s[2]=(g-D)*E,s[3]=0,s[4]=(f-v)*b,s[5]=(1-(u+p))*b,s[6]=(m+w)*b,s[7]=0,s[8]=(g+D)*I,s[9]=(m-w)*I,s[10]=(1-(u+y))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=os.set(s[0],s[1],s[2]).length(),o=os.set(s[4],s[5],s[6]).length(),l=os.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Pn.copy(this);let c=1/a,h=1/o,d=1/l;return Pn.elements[0]*=c,Pn.elements[1]*=c,Pn.elements[2]*=c,Pn.elements[4]*=h,Pn.elements[5]*=h,Pn.elements[6]*=h,Pn.elements[8]*=d,Pn.elements[9]*=d,Pn.elements[10]*=d,t.setFromRotationMatrix(Pn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Nn,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),g,y;if(l)g=r/(a-r),y=a*r/(a-r);else if(o===Nn)g=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===bs)g=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Nn,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s),g,y;if(l)g=1/(a-r),y=a/(a-r);else if(o===Nn)g=-2/(a-r),y=-(a+r)/(a-r);else if(o===bs)g=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ho.prototype.isMatrix4=!0;var mt=ho,os=new R,Pn=new mt,lf=new R(0,0,0),cf=new R(1,1,1),bi=new R,Kr=new R,mn=new R,Sh=new mt,wh=new Yn,Un=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wh.setFromEuler(this),this.setFromQuaternion(wh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Un.DEFAULT_ORDER="XYZ";var ws=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},hf=0,Th=new R,ls=new Yn,ni=new mt,jr=new R,$s=new R,uf=new R,df=new Yn,Ah=new R(1,0,0),Rh=new R(0,1,0),Ch=new R(0,0,1),Ih={type:"added"},ff={type:"removed"},cs={type:"childadded",child:null},Rl={type:"childremoved",child:null},kt=class i extends qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=Or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new R,t=new Un,n=new Yn,s=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new mt},normalMatrix:{value:new st}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(Ah,e)}rotateY(e){return this.rotateOnAxis(Rh,e)}rotateZ(e){return this.rotateOnAxis(Ch,e)}translateOnAxis(e,t){return Th.copy(e).applyQuaternion(this.quaternion),this.position.add(Th.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ah,e)}translateY(e){return this.translateOnAxis(Rh,e)}translateZ(e){return this.translateOnAxis(Ch,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?jr.copy(e):jr.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt($s,jr,this.up):ni.lookAt(jr,$s,this.up),this.quaternion.setFromRotationMatrix(ni),s&&(ni.extractRotation(s.matrixWorld),ls.setFromRotationMatrix(ni),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ih),cs.child=e,this.dispatchEvent(cs),cs.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ff),Rl.child=e,this.dispatchEvent(Rl),Rl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ih),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,e,uf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,df,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};kt.DEFAULT_UP=new R(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var be=class extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},pf={type:"move"},Ts=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new be,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new be,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new be,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),p=this._getHandJoint(c,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new be;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Fu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},Qr={h:0,s:0,l:0};function Cl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Oe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,ft.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ft.workingColorSpace){if(e=sf(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Cl(a,r,e+1/3),this.g=Cl(a,r,e),this.b=Cl(a,r,e-1/3)}return ft.colorSpaceToWorking(this,s),this}setStyle(e,t=Vt){function n(r){r!==void 0&&parseFloat(r)<1&&Je("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Je("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vt){let n=Fu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=li(e.r),this.g=li(e.g),this.b=li(e.b),this}copyLinearToSRGB(e){return this.r=vs(e.r),this.g=vs(e.g),this.b=vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vt){return ft.workingToColorSpace(nn.copy(this),e),Math.round(ht(nn.r*255,0,255))*65536+Math.round(ht(nn.g*255,0,255))*256+Math.round(ht(nn.b*255,0,255))}getHexString(e=Vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.workingToColorSpace(nn.copy(this),t);let n=nn.r,s=nn.g,r=nn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ft.workingColorSpace){return ft.workingToColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=Vt){ft.workingToColorSpace(nn.copy(this),e);let t=nn.r,n=nn.g,s=nn.b;return e!==Vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ei),this.setHSL(Ei.h+e,Ei.s+t,Ei.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ei),e.getHSL(Qr);let n=El(Ei.h,Qr.h,t),s=El(Ei.s,Qr.s,t),r=El(Ei.l,Qr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new Oe;Oe.NAMES=Fu;var Xi=class extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ln=new R,ii=new R,Il=new R,si=new R,hs=new R,us=new R,Ph=new R,Pl=new R,Ll=new R,Dl=new R,Nl=new It,Ul=new It,Fl=new It,oi=class i{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Ln.subVectors(e,t),s.cross(Ln);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Ln.subVectors(s,t),ii.subVectors(n,t),Il.subVectors(e,t);let a=Ln.dot(Ln),o=Ln.dot(ii),l=Ln.dot(Il),c=ii.dot(ii),h=ii.dot(Il),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,si.x),l.addScaledVector(a,si.y),l.addScaledVector(o,si.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Nl.setScalar(0),Ul.setScalar(0),Fl.setScalar(0),Nl.fromBufferAttribute(e,t),Ul.fromBufferAttribute(e,n),Fl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Nl,r.x),a.addScaledVector(Ul,r.y),a.addScaledVector(Fl,r.z),a}static isFrontFacing(e,t,n,s){return Ln.subVectors(n,t),ii.subVectors(e,t),Ln.cross(ii).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),Ln.cross(ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;hs.subVectors(s,n),us.subVectors(r,n),Pl.subVectors(e,n);let l=hs.dot(Pl),c=us.dot(Pl);if(l<=0&&c<=0)return t.copy(n);Ll.subVectors(e,s);let h=hs.dot(Ll),d=us.dot(Ll);if(h>=0&&d<=h)return t.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(hs,a);Dl.subVectors(e,r);let f=hs.dot(Dl),g=us.dot(Dl);if(g>=0&&f<=g)return t.copy(r);let y=f*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(us,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Ph.subVectors(r,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(Ph,o);let p=1/(m+y+u);return a=y*p,o=u*p,t.copy(n).addScaledVector(hs,a).addScaledVector(us,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},cn=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Dn):Dn.fromBufferAttribute(r,a),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ea.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ea.copy(n.boundingBox)),ea.applyMatrix4(e.matrixWorld),this.union(ea)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),ta.subVectors(this.max,Zs),ds.subVectors(e.a,Zs),fs.subVectors(e.b,Zs),ps.subVectors(e.c,Zs),Si.subVectors(fs,ds),wi.subVectors(ps,fs),Hi.subVectors(ds,ps);let t=[0,-Si.z,Si.y,0,-wi.z,wi.y,0,-Hi.z,Hi.y,Si.z,0,-Si.x,wi.z,0,-wi.x,Hi.z,0,-Hi.x,-Si.y,Si.x,0,-wi.y,wi.x,0,-Hi.y,Hi.x,0];return!Bl(t,ds,fs,ps,ta)||(t=[1,0,0,0,1,0,0,0,1],!Bl(t,ds,fs,ps,ta))?!1:(na.crossVectors(Si,wi),t=[na.x,na.y,na.z],Bl(t,ds,fs,ps,ta))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ri=[new R,new R,new R,new R,new R,new R,new R,new R],Dn=new R,ea=new cn,ds=new R,fs=new R,ps=new R,Si=new R,wi=new R,Hi=new R,Zs=new R,ta=new R,na=new R,Gi=new R;function Bl(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Gi.fromArray(i,r);let o=s.x*Math.abs(Gi.x)+s.y*Math.abs(Gi.y)+s.z*Math.abs(Gi.z),l=e.dot(Gi),c=t.dot(Gi),h=n.dot(Gi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var zt=new R,ia=new Ue,mf=0,on=class extends qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pu,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ia.fromBufferAttribute(this,t),ia.applyMatrix3(e),this.setXY(t,ia.x,ia.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ys(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=un(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ys(t,this.array)),t}setX(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ys(t,this.array)),t}setY(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ys(t,this.array)),t}setZ(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ys(t,this.array)),t}setW(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=un(t,this.array),n=un(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=un(t,this.array),n=un(n,this.array),s=un(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=un(t,this.array),n=un(n,this.array),s=un(s,this.array),r=un(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var lr=class extends on{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var cr=class extends on{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var at=class extends on{constructor(e,t,n){super(new Float32Array(e),t,n)}},gf=new cn,Js=new R,Ol=new R,ci=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):gf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Js.subVectors(e,this.center);let t=Js.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Js,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ol.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Js.copy(e.center).add(Ol)),this.expandByPoint(Js.copy(e.center).sub(Ol))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},xf=0,Sn=new mt,Hl=new kt,ms=new R,gn=new cn,Ks=new cn,Yt=new R,wt=class i extends qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=Or(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(tf(e)?cr:lr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,n){return Sn.makeTranslation(e,t,n),this.applyMatrix4(Sn),this}scale(e,t,n){return Sn.makeScale(e,t,n),this.applyMatrix4(Sn),this}lookAt(e){return Hl.lookAt(e),Hl.updateMatrix(),this.applyMatrix4(Hl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new at(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];gn.setFromBufferAttribute(r),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Yt.addVectors(gn.min,Ks.min),gn.expandByPoint(Yt),Yt.addVectors(gn.max,Ks.max),gn.expandByPoint(Yt)):(gn.expandByPoint(Ks.min),gn.expandByPoint(Ks.max))}gn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Yt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Yt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Yt.fromBufferAttribute(o,c),l&&(ms.fromBufferAttribute(e,c),Yt.add(ms)),s=Math.max(s,n.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new on(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new R,l[_]=new R;let c=new R,h=new R,d=new R,u=new Ue,f=new Ue,g=new Ue,y=new R,m=new R;function p(_,S,N){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,N),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,N),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let B=1/(f.x*g.y-g.x*f.y);isFinite(B)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(B),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(B),o[_].add(y),o[S].add(y),o[N].add(y),l[_].add(m),l[S].add(m),l[N].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let _=0,S=w.length;_<S;++_){let N=w[_],B=N.start,O=N.count;for(let F=B,A=B+O;F<A;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let D=new R,v=new R,E=new R,b=new R;function I(_){E.fromBufferAttribute(s,_),b.copy(E);let S=o[_];D.copy(S),D.sub(E.multiplyScalar(E.dot(S))).normalize(),v.crossVectors(b,S);let B=v.dot(l[_])<0?-1:1;a.setXYZW(_,D.x,D.y,D.z,B)}for(let _=0,S=w.length;_<S;++_){let N=w[_],B=N.start,O=N.count;for(let F=B,A=B+O;F<A;F+=3)I(e.getX(F+0)),I(e.getX(F+1)),I(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new on(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new R,r=new R,a=new R,o=new R,l=new R,c=new R,h=new R,d=new R;if(e)for(let u=0,f=e.count;u<f;u+=3){let g=e.getX(u+0),y=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Yt.fromBufferAttribute(e,t),Yt.normalize(),e.setXYZ(t,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new on(u,h,d)}if(this.index===null)return Je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Gl=new R,yf=new R,_f=new st,xn=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Gl.subVectors(n,t).cross(yf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Gl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||_f.getNormalMatrix(e),s=this.coplanarPoint(Gl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},vf=0,Fn=class extends qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=Or(),this.name="",this.type="Material",this.blending=Ns,this.side=Tn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hc,this.blendDst=uc,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Je(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Oe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new xn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ue().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ai=new R,zl=new R,sa=new R,ra=new R,As=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){zl.copy(e).add(t).multiplyScalar(.5),sa.copy(t).sub(e).normalize(),ra.copy(this.origin).sub(zl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(sa),o=ra.dot(this.direction),l=-ra.dot(sa),c=ra.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let y=1/h;d*=y,u*=y,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(zl).addScaledVector(sa,u),f}intersectSphere(e,t){if(e.radius<0)return null;ai.subVectors(e.center,this.origin);let n=ai.dot(this.direction),s=ai.dot(ai)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,g=t.x-a.x,y=t.y-a.y,m=t.z-a.z,p=n.x-a.x,w=n.y-a.y,D=n.z-a.z,v=Math.abs(l),E=Math.abs(c),b=Math.abs(h),I,_,S,N,B,O,F,A,U,k,Y,z;if(v>=E&&v>=b?(S=l,O=d,U=g,z=p,l>=0?(I=c,_=h,N=u,B=f,F=y,A=m,k=w,Y=D):(I=h,_=c,N=f,B=u,F=m,A=y,k=D,Y=w)):E>=b?(S=c,O=u,U=y,z=w,c>=0?(I=h,_=l,N=f,B=d,F=m,A=g,k=D,Y=p):(I=l,_=h,N=d,B=f,F=g,A=m,k=p,Y=D)):(S=h,O=f,U=m,z=D,h>=0?(I=l,_=c,N=d,B=u,F=g,A=y,k=p,Y=w):(I=c,_=l,N=u,B=d,F=y,A=g,k=w,Y=p)),S===0)return null;let P=I/S,H=_/S,L=1/S,$=N-P*O,te=B-H*O,ce=F-P*U,pe=A-H*U,se=k-P*z,X=Y-H*z,Z=se*pe-X*ce,me=$*X-te*se,de=ce*te-pe*$;if(s){if(Z<0||me<0||de<0)return null}else if((Z<0||me<0||de<0)&&(Z>0||me>0||de>0))return null;let _e=Z+me+de;if(_e===0)return null;let $e=L*(Z*O+me*U+de*z);return(_e>0?$e<0:$e>0)?null:this.at($e/_e,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},sn=class extends Fn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Rr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Lh=new mt,zi=new As,aa=new ci,Dh=new R,oa=new R,la=new R,ca=new R,kl=new R,ha=new R,Nh=new R,ua=new R,W=class extends kt{constructor(e=new wt,t=new sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){ha.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(kl.fromBufferAttribute(d,e),a?ha.addScaledVector(kl,h):ha.addScaledVector(kl.sub(t),h))}t.add(ha)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),aa.copy(n.boundingSphere),aa.applyMatrix4(r),zi.copy(e.ray).recast(e.near),!(aa.containsPoint(zi.origin)===!1&&(zi.intersectSphere(aa,Dh)===null||zi.origin.distanceToSquared(Dh)>(e.far-e.near)**2))&&(Lh.copy(r).invert(),zi.copy(e.ray).applyMatrix4(Lh),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){let m=u[g],p=a[m.materialIndex],w=Math.max(m.start,f.start),D=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=w,E=D;v<E;v+=3){let b=o.getX(v),I=o.getX(v+1),_=o.getX(v+2);s=da(this,p,e,n,c,h,d,b,I,_),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){let w=o.getX(m),D=o.getX(m+1),v=o.getX(m+2);s=da(this,a,e,n,c,h,d,w,D,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){let m=u[g],p=a[m.materialIndex],w=Math.max(m.start,f.start),D=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=w,E=D;v<E;v+=3){let b=v,I=v+1,_=v+2;s=da(this,p,e,n,c,h,d,b,I,_),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){let w=m,D=m+1,v=m+2;s=da(this,a,e,n,c,h,d,w,D,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Mf(i,e,t,n,s,r,a,o){let l;if(e.side===Ht?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Tn,o),l===null)return null;ua.copy(o),ua.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ua);return c<t.near||c>t.far?null:{distance:c,point:ua.clone(),object:i}}function da(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,oa),i.getVertexPosition(l,la),i.getVertexPosition(c,ca);let h=Mf(i,e,t,n,oa,la,ca,Nh);if(h){let d=new R;oi.getBarycoord(Nh,oa,la,ca,d),s&&(h.uv=oi.getInterpolatedAttribute(s,o,l,c,d,new Ue)),r&&(h.uv1=oi.getInterpolatedAttribute(r,o,l,c,d,new Ue)),a&&(h.normal=oi.getInterpolatedAttribute(a,o,l,c,d,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new R,materialIndex:0};oi.getNormal(oa,la,ca,u.normal),h.face=u,h.barycoord=d}return h}var hr=class extends ln{constructor(e=null,t=1,n=1,s,r,a,o,l,c=$t,h=$t,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rs=class extends on{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},gs=new mt,Uh=new mt,fa=[],Fh=new cn,bf=new mt,js=new W,Qs=new ci,hi=class extends W{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Rs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,bf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new cn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gs),Fh.copy(e.boundingBox).applyMatrix4(gs),this.boundingBox.union(Fh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ci),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gs),Qs.copy(e.boundingSphere).applyMatrix4(gs),this.boundingSphere.union(Qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(js.geometry=this.geometry,js.material=this.material,js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qs.copy(this.boundingSphere),Qs.applyMatrix4(n),e.ray.intersectsSphere(Qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,gs),Uh.multiplyMatrices(n,gs),js.matrixWorld=Uh,js.raycast(e,fa);for(let a=0,o=fa.length;a<o;a++){let l=fa[a];l.instanceId=r,l.object=this,t.push(l)}fa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Rs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new hr(new Float32Array(s*this.count),s,this.count,yo,An));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ki=new ci,Ef=new Ue(.5,.5),pa=new R,Cs=class{constructor(e=new xn,t=new xn,n=new xn,s=new xn,r=new xn,a=new xn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Nn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],y=r[9],m=r[10],p=r[11],w=r[12],D=r[13],v=r[14],E=r[15];if(s[0].setComponents(c-a,f-h,p-g,E-w).normalize(),s[1].setComponents(c+a,f+h,p+g,E+w).normalize(),s[2].setComponents(c+o,f+d,p+y,E+D).normalize(),s[3].setComponents(c-o,f-d,p-y,E-D).normalize(),n)s[4].setComponents(l,u,m,v).normalize(),s[5].setComponents(c-l,f-u,p-m,E-v).normalize();else if(s[4].setComponents(c-l,f-u,p-m,E-v).normalize(),t===Nn)s[5].setComponents(c+l,f+u,p+m,E+v).normalize();else if(t===bs)s[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){ki.center.set(0,0,0);let t=Ef.distanceTo(e.center);return ki.radius=.7071067811865476+t,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(pa.x=s.normal.x>0?e.max.x:e.min.x,pa.y=s.normal.y>0?e.max.y:e.min.y,pa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(pa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Pt=class extends Fn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Oa=new R,Ha=new R,Bh=new mt,er=new As,ma=new ci,Vl=new R,Oh=new R,ur=class extends kt{constructor(e=new wt,t=new Pt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Oa.fromBufferAttribute(t,s-1),Ha.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Oa.distanceTo(Ha);e.setAttribute("lineDistance",new at(n,1))}else Je("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(s),ma.radius+=r,e.ray.intersectsSphere(ma)===!1)return;Bh.copy(s).invert(),er.copy(e.ray).applyMatrix4(Bh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=f,m=g-1;y<m;y+=c){let p=h.getX(y),w=h.getX(y+1),D=ga(this,e,er,l,p,w,y);D&&t.push(D)}if(this.isLineLoop){let y=h.getX(g-1),m=h.getX(f),p=ga(this,e,er,l,y,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=f,m=g-1;y<m;y+=c){let p=ga(this,e,er,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=ga(this,e,er,l,g-1,f,g-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ga(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Oa.fromBufferAttribute(o,s),Ha.fromBufferAttribute(o,r),t.distanceSqToSegment(Oa,Ha,Vl,Oh)>n)return;Vl.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Vl);if(!(c<e.near||c>e.far))return{distance:c,point:Oh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Hh=new R,Gh=new R,Lt=class extends ur{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Hh.fromBufferAttribute(t,s),Gh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Hh.distanceTo(Gh);e.setAttribute("lineDistance",new at(n,1))}else Je("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var dr=class extends ln{constructor(e=[],t=Di,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},wn=class extends ln{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ri=class extends ln{constructor(e,t,n=Gn,s,r,a,o=$t,l=$t,c,h=Xn,d=1){if(h!==Xn&&h!==Ui)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ss(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ga=class extends Ri{constructor(e,t=Gn,n=Di,s,r,a=$t,o=$t,l,c=Xn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},fr=class extends ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},we=class i extends wt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(d,2));function g(y,m,p,w,D,v,E,b,I,_,S){let N=v/I,B=E/_,O=v/2,F=E/2,A=b/2,U=I+1,k=_+1,Y=0,z=0,P=new R;for(let H=0;H<k;H++){let L=H*B-F;for(let $=0;$<U;$++){let te=$*N-O;P[y]=te*w,P[m]=L*D,P[p]=A,c.push(P.x,P.y,P.z),P[y]=0,P[m]=0,P[p]=b>0?1:-1,h.push(P.x,P.y,P.z),d.push($/I),d.push(1-H/_),Y+=1}}for(let H=0;H<_;H++)for(let L=0;L<I;L++){let $=u+L+U*H,te=u+L+U*(H+1),ce=u+(L+1)+U*(H+1),pe=u+(L+1)+U*H;l.push($,te,pe),l.push(te,ce,pe),z+=6}o.addGroup(f,z,S),f+=z,u+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},qi=class i extends wt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,g=n*2+r,y=s+1,m=new R,p=new R;for(let w=0;w<=g;w++){let D=0,v=0,E=0,b=0;if(w<=n){let S=w/n,N=S*Math.PI/2;v=-h-e*Math.cos(N),E=e*Math.sin(N),b=-e*Math.cos(N),D=S*d}else if(w<=n+r){let S=(w-n)/r;v=-h+S*t,E=e,b=0,D=d+S*u}else{let S=(w-n-r)/n,N=S*Math.PI/2;v=h+e*Math.sin(N),E=e*Math.cos(N),b=e*Math.sin(N),D=d+u+S*d}let I=Math.max(0,Math.min(1,D/f)),_=0;w===0?_=.5/s:w===g&&(_=-.5/s);for(let S=0;S<=s;S++){let N=S/s,B=N*Math.PI*2,O=Math.sin(B),F=Math.cos(B);p.x=-E*F,p.y=v,p.z=E*O,o.push(p.x,p.y,p.z),m.set(-E*F,b,E*O),m.normalize(),l.push(m.x,m.y,m.z),c.push(N+_,I)}if(w>0){let S=(w-1)*y;for(let N=0;N<s;N++){let B=S+N,O=S+N+1,F=w*y+N,A=w*y+N+1;a.push(B,O,F),a.push(O,A,F)}}}this.setIndex(a),this.setAttribute("position",new at(o,3)),this.setAttribute("normal",new at(l,3)),this.setAttribute("uv",new at(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},pr=class i extends wt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new R,h=new Ue;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new at(a,3)),this.setAttribute("normal",new at(o,3)),this.setAttribute("uv",new at(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Le=class i extends wt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,y=[],m=n/2,p=0;w(),a===!1&&(e>0&&D(!0),t>0&&D(!1)),this.setIndex(h),this.setAttribute("position",new at(d,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(f,2));function w(){let v=new R,E=new R,b=0,I=(t-e)/n;for(let _=0;_<=r;_++){let S=[],N=_/r,B=N*(t-e)+e;for(let O=0;O<=s;O++){let F=O/s,A=F*l+o,U=Math.sin(A),k=Math.cos(A);E.x=B*U,E.y=-N*n+m,E.z=B*k,d.push(E.x,E.y,E.z),v.set(U,I,k).normalize(),u.push(v.x,v.y,v.z),f.push(F,1-N),S.push(g++)}y.push(S)}for(let _=0;_<s;_++)for(let S=0;S<r;S++){let N=y[S][_],B=y[S+1][_],O=y[S+1][_+1],F=y[S][_+1];(e>0||S!==0)&&(h.push(N,B,F),b+=3),(t>0||S!==r-1)&&(h.push(B,O,F),b+=3)}c.addGroup(p,b,0),p+=b}function D(v){let E=g,b=new Ue,I=new R,_=0,S=v===!0?e:t,N=v===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,m*N,0),u.push(0,N,0),f.push(.5,.5),g++;let B=g;for(let O=0;O<=s;O++){let A=O/s*l+o,U=Math.cos(A),k=Math.sin(A);I.x=S*k,I.y=m*N,I.z=S*U,d.push(I.x,I.y,I.z),u.push(0,N,0),b.x=U*.5+.5,b.y=k*.5*N+.5,f.push(b.x,b.y),g++}for(let O=0;O<s;O++){let F=E+O,A=B+O;v===!0?h.push(A,A+1,F):h.push(A+1,A,F),_+=3}c.addGroup(p,_,v===!0?1:2),p+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},za=class i extends Le{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var xa=new R,ya=new R,Wl=new R,_a=new oi,Ot=class extends wt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(Sa*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:y,b:m,c:p}=_a;if(y.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),_a.getNormal(Wl),d[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let w=0;w<3;w++){let D=(w+1)%3,v=d[w],E=d[D],b=_a[h[w]],I=_a[h[D]],_=`${v}_${E}`,S=`${E}_${v}`;S in u&&u[S]?(Wl.dot(u[S].normal)<=r&&(f.push(b.x,b.y,b.z),f.push(I.x,I.y,I.z)),u[S]=null):_ in u||(u[_]={index0:c[w],index1:c[D],normal:Wl.clone()})}}for(let g in u)if(u[g]){let{index0:y,index1:m}=u[g];xa.fromBufferAttribute(o,y),ya.fromBufferAttribute(o,m),f.push(xa.x,xa.y,xa.z),f.push(ya.x,ya.y,ya.z)}this.setAttribute("position",new at(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},yn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Je("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new Ue:new R);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new R,s=[],r=[],a=[],o=new R,l=new mt;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new R)}r[0]=new R,a[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(ht(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(ht(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},mr=class extends yn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Ue){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ka=class extends mr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Cc(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var zh=new R,kh=new R,Xl=new Cc,ql=new Cc,Yl=new Cc,Va=class extends yn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new R){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(kh.subVectors(s[0],s[1]).add(s[0]),c=kh);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(zh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=zh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),Xl.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,y,m),ql.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,y,m),Yl.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,y,m)}else this.curveType==="catmullrom"&&(Xl.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),ql.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Yl.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Xl.calc(l),ql.calc(l),Yl.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new R().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Vh(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Sf(i,e){let t=1-i;return t*t*e}function wf(i,e){return 2*(1-i)*i*e}function Tf(i,e){return i*i*e}function tr(i,e,t,n){return Sf(i,e)+wf(i,t)+Tf(i,n)}function Af(i,e){let t=1-i;return t*t*t*e}function Rf(i,e){let t=1-i;return 3*t*t*i*e}function Cf(i,e){return 3*(1-i)*i*i*e}function If(i,e){return i*i*i*e}function nr(i,e,t,n,s){return Af(i,e)+Rf(i,t)+Cf(i,n)+If(i,s)}var Wa=class extends yn{constructor(e=new Ue,t=new Ue,n=new Ue,s=new Ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Ue){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(nr(e,s.x,r.x,a.x,o.x),nr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Xa=class extends yn{constructor(e=new R,t=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new R){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(nr(e,s.x,r.x,a.x,o.x),nr(e,s.y,r.y,a.y,o.y),nr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},qa=class extends yn{constructor(e=new Ue,t=new Ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ue){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Is=class extends yn{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ya=class extends yn{constructor(e=new Ue,t=new Ue,n=new Ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Ue){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(tr(e,s.x,r.x,a.x),tr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yi=class extends yn{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(tr(e,s.x,r.x,a.x),tr(e,s.y,r.y,a.y),tr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$a=class extends yn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ue){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Vh(o,l.x,c.x,h.x,d.x),Vh(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new Ue().fromArray(s))}return this}},tc=Object.freeze({__proto__:null,ArcCurve:ka,CatmullRomCurve3:Va,CubicBezierCurve:Wa,CubicBezierCurve3:Xa,EllipseCurve:mr,LineCurve:qa,LineCurve3:Is,QuadraticBezierCurve:Ya,QuadraticBezierCurve3:Yi,SplineCurve:$a}),gr=class extends yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new tc[s.type]().fromJSON(s))}return this}};var Bn=class i extends wt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],g=[],y=[],m=[];for(let p=0;p<h;p++){let w=p*u-a;for(let D=0;D<c;D++){let v=D*d-r;g.push(v,-w,0),y.push(0,0,1),m.push(D/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){let D=w+c*p,v=w+c*(p+1),E=w+1+c*(p+1),b=w+1+c*p;f.push(D,v,b),f.push(v,E,b)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(y,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ze=class i extends wt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new R,u=new R,f=[],g=[],y=[],m=[];for(let p=0;p<=n;p++){let w=[],D=p/n,v=a+D*o,E=e*Math.cos(v),b=Math.sqrt(e*e-E*E),I=0;p===0&&a===0?I=.5/t:p===n&&l===Math.PI&&(I=-.5/t);for(let _=0;_<=t;_++){let S=_/t,N=s+S*r;d.x=-b*Math.cos(N),d.y=E,d.z=b*Math.sin(N),g.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),m.push(S+I,1-D),w.push(c++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<t;w++){let D=h[p][w+1],v=h[p][w],E=h[p+1][w],b=h[p+1][w+1];(p!==0||a>0)&&f.push(D,v,b),(p!==n-1||l<Math.PI)&&f.push(v,E,b)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(y,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Nt=class i extends wt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new R,f=new R,g=new R;for(let y=0;y<=n;y++){let m=a+y/n*o;for(let p=0;p<=s;p++){let w=p/s*r;f.x=(e+t*Math.cos(m))*Math.cos(w),f.y=(e+t*Math.cos(m))*Math.sin(w),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),u.x=e*Math.cos(w),u.y=e*Math.sin(w),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/s),d.push(y/n)}}for(let y=1;y<=n;y++)for(let m=1;m<=s;m++){let p=(s+1)*y+m-1,w=(s+1)*(y-1)+m-1,D=(s+1)*(y-1)+m,v=(s+1)*y+m;l.push(p,w,v),l.push(w,D,v)}this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var $i=class i extends wt{constructor(e=new Yi(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new R,l=new R,c=new Ue,h=new R,d=[],u=[],f=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new at(d,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(f,2));function y(){for(let D=0;D<t;D++)m(D);m(r===!1?t:0),w(),p()}function m(D){h=e.getPointAt(D/t,h);let v=a.normals[D],E=a.binormals[D];for(let b=0;b<=s;b++){let I=b/s*Math.PI*2,_=Math.sin(I),S=-Math.cos(I);l.x=S*v.x+_*E.x,l.y=S*v.y+_*E.y,l.z=S*v.z+_*E.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let D=1;D<=t;D++)for(let v=1;v<=s;v++){let E=(s+1)*(D-1)+(v-1),b=(s+1)*D+(v-1),I=(s+1)*D+v,_=(s+1)*(D-1)+v;g.push(E,b,_),g.push(b,I,_)}}function w(){for(let D=0;D<=t;D++)for(let v=0;v<=s;v++)c.x=D/t,c.y=v/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new tc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Ki(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Wh(s))s.isRenderTargetTexture?(Je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Wh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function rn(i){let e={};for(let t=0;t<i.length;t++){let n=Ki(i[t]);for(let s in n)e[s]=n[s]}return e}function Wh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Pf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ic(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}var Bu={clone:Ki,merge:rn},Lf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Df=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,hn=class extends Fn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lf,this.fragmentShader=Df,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ki(e.uniforms),this.uniformsGroups=Pf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Oe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ue().fromArray(s.value);break;case"v3":this.uniforms[n].value=new R().fromArray(s.value);break;case"v4":this.uniforms[n].value=new It().fromArray(s.value);break;case"m3":this.uniforms[n].value=new st().fromArray(s.value);break;case"m4":this.uniforms[n].value=new mt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Za=class extends hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},On=class extends Fn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bs,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xr=class extends On{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Oe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Oe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Oe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},yr=class extends Fn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Oe(16777215),this.specular=new Oe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bs,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Rr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var _r=class extends Fn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bs,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Rr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ja=class extends Fn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Eu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ka=class extends Fn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function xs(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function $l(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ci=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ja=class extends Ci{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jl,endingEnd:jl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ql:r=e,o=2*t-n;break;case ec:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ql:a=e,l=2*n-t;break;case ec:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),y=g*g,m=y*g,p=-u*m+2*u*y-u*g,w=(1+u)*m+(-1.5-2*u)*y+(-.5+u)*g+1,D=(-1-f)*m+(1.5+f)*y+.5*g,v=f*m-f*y;for(let E=0;E!==o;++E)r[E]=p*a[h+E]+w*a[c+E]+D*a[l+E]+v*a[d+E];return r}},Qa=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},eo=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},to=class extends Ci{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-t)/(s-t),y=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*y+a[l+m]*g;return r}let u=o*2,f=e-1;for(let g=0;g!==o;++g){let y=a[c+g],m=a[l+g],p=f*u+g*2,w=d[p],D=d[p+1],v=e*u+g*2,E=h[v],b=h[v+1],I=Uf(n,t,w,E,s);r[g]=Ou(I,y,D,b,m)}return r}};function Ou(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Nf(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Uf(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=Ou(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Nf(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var _n=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=xs(t,this.TimeBufferType),this.values=xs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xs(e.times,Array),values:xs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),$l(e.settings)&&(n.settings={inTangents:xs(e.settings.inTangents,Array),outTangents:xs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new eo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new to(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ir:t=this.InterpolantFactoryMethodDiscrete;break;case Da:t=this.InterpolantFactoryMethodLinear;break;case Ea:t=this.InterpolantFactoryMethodSmooth;break;case Kl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Je("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ir;case this.InterpolantFactoryMethodLinear:return Da;case this.InterpolantFactoryMethodSmooth:return Ea;case this.InterpolantFactoryMethodBezier:return Kl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;$l(this.settings)&&(Xh(this.settings.inTangents,e),Xh(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(et("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(et("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){et("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){et("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&nf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){et("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ea,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let y=t[d+g];if(y!==t[u+g]||y!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,$l(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Xh(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}_n.prototype.ValueTypeName="";_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=Da;var Ii=class extends _n{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="bool";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=ir;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var no=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}};no.prototype.ValueTypeName="color";var io=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}};io.prototype.ValueTypeName="number";var so=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)Yn.slerpFlat(r,0,a,c-o,a,c,l);return r}},vr=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new so(this.times,this.values,this.getValueSize(),e)}};vr.prototype.ValueTypeName="quaternion";vr.prototype.InterpolantFactoryMethodSmooth=void 0;var Pi=class extends _n{constructor(e,t,n){super(e,t,n)}};Pi.prototype.ValueTypeName="string";Pi.prototype.ValueBufferType=Array;Pi.prototype.DefaultInterpolation=ir;Pi.prototype.InterpolantFactoryMethodLinear=void 0;Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var ro=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}};ro.prototype.ValueTypeName="vector";var ao=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Hu=new ao,oo=class{constructor(e){this.manager=e!==void 0?e:Hu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};oo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ps=class extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Mr=class extends Ps{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Zl=new mt,qh=new R,Yh=new R,br=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cs,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;qh.setFromMatrixPosition(e.matrixWorld),t.position.copy(qh),Yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Zl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Zl,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===bs||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Zl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},va=new R,Ma=new Yn,Vn=new R,Er=class extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=Nn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(va,Ma,Vn),Vn.x===1&&Vn.y===1&&Vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,Vn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(va,Ma,Vn),Vn.x===1&&Vn.y===1&&Vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,Vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ti=new R,$h=new Ue,Zh=new Ue,Jt=class extends Er{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Na*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Sa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Na*2*Math.atan(Math.tan(Sa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,$h,Zh),t.subVectors(Zh,$h)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Sa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var nc=class extends br{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0}},Sr=class extends Ps{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new nc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ls=class extends Er{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ic=class extends br{constructor(){super(new Ls(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Li=class extends Ps{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new ic}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ys=-90,_s=1,lo=class extends kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Jt(ys,_s,e,t);s.layers=this.layers,this.add(s);let r=new Jt(ys,_s,e,t);r.layers=this.layers,this.add(r);let a=new Jt(ys,_s,e,t);a.layers=this.layers,this.add(a);let o=new Jt(ys,_s,e,t);o.layers=this.layers,this.add(o);let l=new Jt(ys,_s,e,t);l.layers=this.layers,this.add(l);let c=new Jt(ys,_s,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===bs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},co=class extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Pc="\\[\\]\\.:\\/",Ff=new RegExp("["+Pc+"]","g"),Lc="[^"+Pc+"]",Bf="[^"+Pc.replace("\\.","")+"]",Of=/((?:WC+[\/:])*)/.source.replace("WC",Lc),Hf=/(WCOD+)?/.source.replace("WCOD",Bf),Gf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lc),zf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lc),kf=new RegExp("^"+Of+Hf+Gf+zf+"$"),Vf=["material","materials","bones","map"],sc=class{constructor(e,t,n){let s=n||Ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ct=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ff,"")}static parseTrackName(e){let t=kf.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Vf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Je("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){et("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){et("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){et("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){et("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){et("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){et("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){et("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;et("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){et("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){et("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ct.Composite=sc;Ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ct.prototype.GetterByBindingType=[Ct.prototype._getValue_direct,Ct.prototype._getValue_array,Ct.prototype._getValue_arrayElement,Ct.prototype._getValue_toArray];Ct.prototype.SetterByBindingTypeAndVersioning=[[Ct.prototype._setValue_direct,Ct.prototype._setValue_direct_setNeedsUpdate,Ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_array,Ct.prototype._setValue_array_setNeedsUpdate,Ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_arrayElement,Ct.prototype._setValue_arrayElement_setNeedsUpdate,Ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_fromArray,Ct.prototype._setValue_fromArray_setNeedsUpdate,Ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var xy=new Float32Array(1);var Jh=new mt,ui=class{constructor(e,t,n=0,s=1/0){this.ray=new As(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ws,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):et("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Jh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jh),this}intersectObject(e,t=!0,n=[]){return rc(e,this,n,t),n.sort(Kh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)rc(e[s],this,n,t);return n.sort(Kh),n}};function Kh(i,e){return i.distance-e.distance}function rc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)rc(r[a],e,t,!0)}}var Oc=class Oc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Oc.prototype.isMatrix2=!0;var ac=Oc;var jh=new R,ba,Jl,wr=class extends kt{constructor(e=new R(0,0,1),t=new R(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",ba===void 0&&(ba=new wt,ba.setAttribute("position",new at([0,0,0,0,1,0],3)),Jl=new za(.5,1,5,1),Jl.translate(0,-.5,0)),this.position.copy(t),this.line=new ur(ba,new Pt({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new W(Jl,new sn({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{jh.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(jh,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}};function Dc(i,e,t,n){let s=Wf(n);switch(t){case Ec:return i*e;case yo:return i*e/s.components*s.byteLength;case _o:return i*e/s.components*s.byteLength;case Fi:return i*e*2/s.components*s.byteLength;case vo:return i*e*2/s.components*s.byteLength;case Sc:return i*e*3/s.components*s.byteLength;case Rn:return i*e*4/s.components*s.byteLength;case Mo:return i*e*4/s.components*s.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Nr:case Ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Eo:case wo:return Math.max(i,16)*Math.max(e,8)/4;case bo:case So:return Math.max(i,8)*Math.max(e,8)/2;case To:case Ao:case Co:case Io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ro:case Fr:case Po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case No:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Fo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Bo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ho:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Go:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case zo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ko:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Vo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Xo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case qo:case Yo:case $o:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Zo:case Jo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Br:case Ko:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Wf(i){switch(i){case fn:case _c:return{byteLength:1,components:1};case Us:case vc:case zn:return{byteLength:2,components:1};case go:case xo:return{byteLength:2,components:4};case Gn:case mo:case An:return{byteLength:4,components:1};case Mc:case bc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function od(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Kf(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],y=d[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let y=d[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var jf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qf=`#ifdef USE_ALPHAHASH
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
#endif`,ep=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,np=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ip=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sp=`#ifdef USE_AOMAP
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
#endif`,rp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ap=`#ifdef USE_BATCHING
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
#endif`,op=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,up=`#ifdef USE_IRIDESCENCE
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
#endif`,dp=`#ifdef USE_BUMPMAP
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
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,vp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Mp=`#define PI 3.141592653589793
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
} // validated`,bp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ep=`vec3 transformedNormal = objectNormal;
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
#endif`,Sp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ap=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ip=`#ifdef USE_ENVMAP
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
#endif`,Pp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
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
#endif`,Dp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
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
#endif`,Up=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Op=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hp=`#ifdef USE_GRADIENTMAP
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
}`,Gp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Wp=`#ifdef USE_ENVMAP
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
#endif`,Xp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zp=`PhysicalMaterial material;
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
#endif`,Jp=`uniform sampler2D dfgLUT;
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
}`,Kp=`
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
#endif`,jp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,e0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,t0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,n0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,i0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,s0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,r0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,a0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,o0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,l0=`#if defined( USE_POINTS_UV )
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
#endif`,c0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,h0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,u0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,d0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,f0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,p0=`#ifdef USE_MORPHTARGETS
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
#endif`,m0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,g0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,x0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,y0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,v0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,M0=`#ifdef USE_NORMALMAP
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
#endif`,b0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,E0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,S0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,w0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,T0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,A0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,R0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,C0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,I0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,P0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,L0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,D0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,N0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,U0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,F0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,B0=`float getShadowMask() {
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
}`,O0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,H0=`#ifdef USE_SKINNING
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
#endif`,G0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,z0=`#ifdef USE_SKINNING
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
#endif`,k0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,V0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,W0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,X0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,q0=`#ifdef USE_TRANSMISSION
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
#endif`,Y0=`#ifdef USE_TRANSMISSION
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
#endif`,$0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,J0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,K0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,j0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Q0=`uniform sampler2D t2D;
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
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,im=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`#include <common>
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
}`,rm=`#if DEPTH_PACKING == 3200
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
}`,am=`#define DISTANCE
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
}`,om=`#define DISTANCE
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
}`,lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hm=`uniform float scale;
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
}`,um=`uniform vec3 diffuse;
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
}`,dm=`#include <common>
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
}`,fm=`uniform vec3 diffuse;
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
}`,pm=`#define LAMBERT
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
}`,mm=`#define LAMBERT
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
}`,gm=`#define MATCAP
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
}`,xm=`#define MATCAP
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
}`,ym=`#define NORMAL
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
}`,_m=`#define NORMAL
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
}`,vm=`#define PHONG
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
}`,Mm=`#define PHONG
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
}`,bm=`#define STANDARD
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
}`,Em=`#define STANDARD
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
}`,Sm=`#define TOON
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
}`,wm=`#define TOON
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
}`,Tm=`uniform float size;
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
}`,Am=`uniform vec3 diffuse;
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
}`,Rm=`#include <common>
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
}`,Cm=`uniform vec3 color;
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
}`,Im=`uniform float rotation;
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
}`,Pm=`uniform vec3 diffuse;
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
}`,ct={alphahash_fragment:jf,alphahash_pars_fragment:Qf,alphamap_fragment:ep,alphamap_pars_fragment:tp,alphatest_fragment:np,alphatest_pars_fragment:ip,aomap_fragment:sp,aomap_pars_fragment:rp,batching_pars_vertex:ap,batching_vertex:op,begin_vertex:lp,beginnormal_vertex:cp,bsdfs:hp,iridescence_fragment:up,bumpmap_pars_fragment:dp,clipping_planes_fragment:fp,clipping_planes_pars_fragment:pp,clipping_planes_pars_vertex:mp,clipping_planes_vertex:gp,color_fragment:xp,color_pars_fragment:yp,color_pars_vertex:_p,color_vertex:vp,common:Mp,cube_uv_reflection_fragment:bp,defaultnormal_vertex:Ep,displacementmap_pars_vertex:Sp,displacementmap_vertex:wp,emissivemap_fragment:Tp,emissivemap_pars_fragment:Ap,colorspace_fragment:Rp,colorspace_pars_fragment:Cp,envmap_fragment:Ip,envmap_common_pars_fragment:Pp,envmap_pars_fragment:Lp,envmap_pars_vertex:Dp,envmap_physical_pars_fragment:Wp,envmap_vertex:Np,fog_vertex:Up,fog_pars_vertex:Fp,fog_fragment:Bp,fog_pars_fragment:Op,gradientmap_pars_fragment:Hp,lightmap_pars_fragment:Gp,lights_lambert_fragment:zp,lights_lambert_pars_fragment:kp,lights_pars_begin:Vp,lights_toon_fragment:Xp,lights_toon_pars_fragment:qp,lights_phong_fragment:Yp,lights_phong_pars_fragment:$p,lights_physical_fragment:Zp,lights_physical_pars_fragment:Jp,lights_fragment_begin:Kp,lights_fragment_maps:jp,lights_fragment_end:Qp,lightprobes_pars_fragment:e0,logdepthbuf_fragment:t0,logdepthbuf_pars_fragment:n0,logdepthbuf_pars_vertex:i0,logdepthbuf_vertex:s0,map_fragment:r0,map_pars_fragment:a0,map_particle_fragment:o0,map_particle_pars_fragment:l0,metalnessmap_fragment:c0,metalnessmap_pars_fragment:h0,morphinstance_vertex:u0,morphcolor_vertex:d0,morphnormal_vertex:f0,morphtarget_pars_vertex:p0,morphtarget_vertex:m0,normal_fragment_begin:g0,normal_fragment_maps:x0,normal_pars_fragment:y0,normal_pars_vertex:_0,normal_vertex:v0,normalmap_pars_fragment:M0,clearcoat_normal_fragment_begin:b0,clearcoat_normal_fragment_maps:E0,clearcoat_pars_fragment:S0,iridescence_pars_fragment:w0,opaque_fragment:T0,packing:A0,premultiplied_alpha_fragment:R0,project_vertex:C0,dithering_fragment:I0,dithering_pars_fragment:P0,roughnessmap_fragment:L0,roughnessmap_pars_fragment:D0,shadowmap_pars_fragment:N0,shadowmap_pars_vertex:U0,shadowmap_vertex:F0,shadowmask_pars_fragment:B0,skinbase_vertex:O0,skinning_pars_vertex:H0,skinning_vertex:G0,skinnormal_vertex:z0,specularmap_fragment:k0,specularmap_pars_fragment:V0,tonemapping_fragment:W0,tonemapping_pars_fragment:X0,transmission_fragment:q0,transmission_pars_fragment:Y0,uv_pars_fragment:$0,uv_pars_vertex:Z0,uv_vertex:J0,worldpos_vertex:K0,background_vert:j0,background_frag:Q0,backgroundCube_vert:em,backgroundCube_frag:tm,cube_vert:nm,cube_frag:im,depth_vert:sm,depth_frag:rm,distance_vert:am,distance_frag:om,equirect_vert:lm,equirect_frag:cm,linedashed_vert:hm,linedashed_frag:um,meshbasic_vert:dm,meshbasic_frag:fm,meshlambert_vert:pm,meshlambert_frag:mm,meshmatcap_vert:gm,meshmatcap_frag:xm,meshnormal_vert:ym,meshnormal_frag:_m,meshphong_vert:vm,meshphong_frag:Mm,meshphysical_vert:bm,meshphysical_frag:Em,meshtoon_vert:Sm,meshtoon_frag:wm,points_vert:Tm,points_frag:Am,shadow_vert:Rm,shadow_frag:Cm,sprite_vert:Im,sprite_frag:Pm},Ce={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Jn={basic:{uniforms:rn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:rn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Oe(0)},envMapIntensity:{value:1}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:rn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:rn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:rn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Oe(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:rn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:rn([Ce.points,Ce.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:rn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:rn([Ce.common,Ce.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:rn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:rn([Ce.sprite,Ce.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distance:{uniforms:rn([Ce.common,Ce.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distance_vert,fragmentShader:ct.distance_frag},shadow:{uniforms:rn([Ce.lights,Ce.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};Jn.physical={uniforms:rn([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};var tl={r:0,b:0,g:0},Lm=new mt,ld=new st;ld.set(-1,0,0,0,1,0,0,0,1);function Dm(i,e,t,n,s,r){let a=new Oe(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(w){let D=w.isScene===!0?w.background:null;if(D&&D.isTexture){let v=w.backgroundBlurriness>0;D=e.get(D,v)}return D}function g(w){let D=!1,v=f(w);v===null?m(a,o):v&&v.isColor&&(m(v,1),D=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||D)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(w,D){let v=f(D);v&&(v.isCubeTexture||v.mapping===Ir)?(c===void 0&&(c=new W(new we(1,1,1),new hn({name:"BackgroundCubeMaterial",uniforms:Ki(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,b,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Lm.makeRotationFromEuler(D.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ld),c.material.toneMapped=ft.getTransfer(v.colorSpace)!==_t,(h!==v||d!==v.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new W(new Bn(2,2),new hn({name:"BackgroundMaterial",uniforms:Ki(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,l.material.toneMapped=ft.getTransfer(v.colorSpace)!==_t,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function m(w,D){w.getRGB(tl,Ic(i)),t.buffers.color.setClear(tl.r,tl.g,tl.b,D,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,D=1){a.set(w),o=D,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,m(a,o)},render:g,addToRenderList:y,dispose:p}}function Nm(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(B,O,F,A,U){let k=!1,Y=d(B,A,F,O);r!==Y&&(r=Y,c(r.object)),k=f(B,A,F,U),k&&g(B,A,F,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,v(B,O,F,A),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return i.createVertexArray()}function c(B){return i.bindVertexArray(B)}function h(B){return i.deleteVertexArray(B)}function d(B,O,F,A){let U=A.wireframe===!0,k=n[O.id];k===void 0&&(k={},n[O.id]=k);let Y=B.isInstancedMesh===!0?B.id:0,z=k[Y];z===void 0&&(z={},k[Y]=z);let P=z[F.id];P===void 0&&(P={},z[F.id]=P);let H=P[U];return H===void 0&&(H=u(l()),P[U]=H),H}function u(B){let O=[],F=[],A=[];for(let U=0;U<t;U++)O[U]=0,F[U]=0,A[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:F,attributeDivisors:A,object:B,attributes:{},index:null}}function f(B,O,F,A){let U=r.attributes,k=O.attributes,Y=0,z=F.getAttributes();for(let P in z)if(z[P].location>=0){let L=U[P],$=k[P];if($===void 0&&(P==="instanceMatrix"&&B.instanceMatrix&&($=B.instanceMatrix),P==="instanceColor"&&B.instanceColor&&($=B.instanceColor)),L===void 0||L.attribute!==$||$&&L.data!==$.data)return!0;Y++}return r.attributesNum!==Y||r.index!==A}function g(B,O,F,A){let U={},k=O.attributes,Y=0,z=F.getAttributes();for(let P in z)if(z[P].location>=0){let L=k[P];L===void 0&&(P==="instanceMatrix"&&B.instanceMatrix&&(L=B.instanceMatrix),P==="instanceColor"&&B.instanceColor&&(L=B.instanceColor));let $={};$.attribute=L,L&&L.data&&($.data=L.data),U[P]=$,Y++}r.attributes=U,r.attributesNum=Y,r.index=A}function y(){let B=r.newAttributes;for(let O=0,F=B.length;O<F;O++)B[O]=0}function m(B){p(B,0)}function p(B,O){let F=r.newAttributes,A=r.enabledAttributes,U=r.attributeDivisors;F[B]=1,A[B]===0&&(i.enableVertexAttribArray(B),A[B]=1),U[B]!==O&&(i.vertexAttribDivisor(B,O),U[B]=O)}function w(){let B=r.newAttributes,O=r.enabledAttributes;for(let F=0,A=O.length;F<A;F++)O[F]!==B[F]&&(i.disableVertexAttribArray(F),O[F]=0)}function D(B,O,F,A,U,k,Y){Y===!0?i.vertexAttribIPointer(B,O,F,U,k):i.vertexAttribPointer(B,O,F,A,U,k)}function v(B,O,F,A){y();let U=A.attributes,k=F.getAttributes(),Y=O.defaultAttributeValues;for(let z in k){let P=k[z];if(P.location>=0){let H=U[z];if(H===void 0&&(z==="instanceMatrix"&&B.instanceMatrix&&(H=B.instanceMatrix),z==="instanceColor"&&B.instanceColor&&(H=B.instanceColor)),H!==void 0){let L=H.normalized,$=H.itemSize,te=e.get(H);if(te===void 0)continue;let ce=te.buffer,pe=te.type,se=te.bytesPerElement,X=pe===i.INT||pe===i.UNSIGNED_INT||H.gpuType===mo;if(H.isInterleavedBufferAttribute){let Z=H.data,me=Z.stride,de=H.offset;if(Z.isInstancedInterleavedBuffer){for(let _e=0;_e<P.locationSize;_e++)p(P.location+_e,Z.meshPerAttribute);B.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let _e=0;_e<P.locationSize;_e++)m(P.location+_e);i.bindBuffer(i.ARRAY_BUFFER,ce);for(let _e=0;_e<P.locationSize;_e++)D(P.location+_e,$/P.locationSize,pe,L,me*se,(de+$/P.locationSize*_e)*se,X)}else{if(H.isInstancedBufferAttribute){for(let Z=0;Z<P.locationSize;Z++)p(P.location+Z,H.meshPerAttribute);B.isInstancedMesh!==!0&&A._maxInstanceCount===void 0&&(A._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let Z=0;Z<P.locationSize;Z++)m(P.location+Z);i.bindBuffer(i.ARRAY_BUFFER,ce);for(let Z=0;Z<P.locationSize;Z++)D(P.location+Z,$/P.locationSize,pe,L,$*se,$/P.locationSize*Z*se,X)}}else if(Y!==void 0){let L=Y[z];if(L!==void 0)switch(L.length){case 2:i.vertexAttrib2fv(P.location,L);break;case 3:i.vertexAttrib3fv(P.location,L);break;case 4:i.vertexAttrib4fv(P.location,L);break;default:i.vertexAttrib1fv(P.location,L)}}}}w()}function E(){S();for(let B in n){let O=n[B];for(let F in O){let A=O[F];for(let U in A){let k=A[U];for(let Y in k)h(k[Y].object),delete k[Y];delete A[U]}}delete n[B]}}function b(B){if(n[B.id]===void 0)return;let O=n[B.id];for(let F in O){let A=O[F];for(let U in A){let k=A[U];for(let Y in k)h(k[Y].object),delete k[Y];delete A[U]}}delete n[B.id]}function I(B){for(let O in n){let F=n[O];for(let A in F){let U=F[A];if(U[B.id]===void 0)continue;let k=U[B.id];for(let Y in k)h(k[Y].object),delete k[Y];delete U[B.id]}}}function _(B){for(let O in n){let F=n[O],A=B.isInstancedMesh===!0?B.id:0,U=F[A];if(U!==void 0){for(let k in U){let Y=U[k];for(let z in Y)h(Y[z].object),delete Y[z];delete U[k]}delete F[A],Object.keys(F).length===0&&delete n[O]}}}function S(){N(),a=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:N,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:I,initAttributes:y,enableAttribute:m,disableUnusedAttributes:w}}function Um(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Fm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==Rn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){let _=I===zn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==fn&&I!==An&&!_&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Je("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Je("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),D=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:D,maxFragmentUniforms:v,maxSamples:E,samples:b}}function Bm(i){let e=this,t=null,n=0,s=!1,r=!1,a=new xn,o=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let w=r?0:n,D=w*4,v=p.clippingState||null;l.value=v,v=h(g,u,D,f);for(let E=0;E!==D;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){let y=d!==null?d.length:0,m=null;if(y!==0){if(m=l.value,g!==!0||m===null){let p=f+y*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let D=0,v=f;D!==y;++D,v+=4)a.copy(d[D]).applyMatrix4(w,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}var Hs=4,Om=6,Hm=20,Gm=256,Hr=new Ls,Gu=new Oe,Hc=null,Gc=0,zc=0,kc=!1,zm=new R,ji=new R,zs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=zm}=r;Hc=this._renderer.getRenderTarget(),Gc=this._renderer.getActiveCubeFace(),zc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ku(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Hc,Gc,zc),this._renderer.xr.enabled=kc,e.scissorTest=!1,Os(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Di||e.mapping===Ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hc=this._renderer.getRenderTarget(),Gc=this._renderer.getActiveCubeFace(),zc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:zn,format:Rn,colorSpace:sr,depthBuffer:!1},s=zu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zu(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=km(r)),this._blurMaterial=Wm(r,e,t),this._ggxMaterial=Vm(r,e,t)}return s}_compileMaterial(e){let t=new W(new wt,e);this._renderer.compile(t,Hr)}_sceneToCubeUV(e,t,n,s,r){let l=new Jt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Gu),d.toneMapping=Hn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new W(new we,new sn({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,m=y.material,p=!1,w=e.background;w?w.isColor&&(m.color.copy(w),e.background=null,p=!0):(m.color.copy(Gu),p=!0);for(let D=0;D<6;D++){let v=D%3;v===0?(l.up.set(0,c[D],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[D],r.y,r.z)):v===1?(l.up.set(0,0,c[D]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[D],r.z)):(l.up.set(0,c[D],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[D]));let E=this._cubeSize;Os(s,v*E,D>2?E:0,E,E),d.setRenderTarget(s),p&&d.render(y,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=w}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Di||e.mapping===Ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ku());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Os(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Hr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,y=this._sizeLods[n],m=3*y*(n>g-Hs?n-g+Hs:0),p=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Os(r,m,p,3*y,2*y),s.setRenderTarget(r),s.render(o,Hr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Os(e,m,p,3*y,2*y),s.setRenderTarget(e),s.render(o,Hr)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-Hs?s-this._lodMax+Hs:0),u=4*(this._cubeSize-h);Os(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,Hr)}};function km(i){let e=[],t=[],n=i,s=i-Hs+1+Om;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),y=new Float32Array(f*u*d);for(let p=0;p<d;p++){let w=p%3*2/3-1,D=p>2?0:-1,v=[w,D,0,w+2/3,D,0,w+2/3,D+1,0,w,D,0,w+2/3,D+1,0,w,D+1,0];g.set(v,f*u*p);for(let E=0;E<u;E++){let b=h[E*2]*2-1,I=h[E*2+1]*2-1;p===0?ji.set(1,I,b):p===1?ji.set(-b,1,-I):p===2?ji.set(-b,I,1):p===3?ji.set(-1,I,-b):p===4?ji.set(-b,-1,I):ji.set(b,I,-1),ji.toArray(y,(p*u+E)*f)}}let m=new wt;m.setAttribute("position",new on(g,f)),m.setAttribute("outputDirection",new on(y,f)),t.push(new W(m,null)),n>Hs&&n--}return{lodMeshes:t,sizeLods:e}}function zu(i,e,t){let n=new dn(i,e,t);return n.texture.mapping=Ir,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Os(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Vm(i,e,t){return new hn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rl(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Wm(i,e,t){return new hn({name:"SphericalGaussianBlur",defines:{SAMPLES:Hm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:rl(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function ku(){return new hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rl(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Vu(){return new hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function rl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var il=class extends dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new dr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new we(5,5,5),r=new hn({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:$n});r.uniforms.tEquirect.value=t;let a=new W(s,r),o=t.minFilter;return t.minFilter===Ni&&(t.minFilter=Kt),new lo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function Xm(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===uo||f===fo)if(e.has(u)){let g=e.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let y=new il(g.height);return y.fromEquirectangularTexture(i,u),e.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===uo||f===fo,y=f===Di||f===Ji;if(g||y){let m=t.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new zs(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let w=u.image;return g&&w&&w.height>0||y&&w&&l(w)?(n===null&&(n=new zs(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===uo?u.mapping=Di:f===fo&&(u.mapping=Ji),u}function l(u){let f=0,g=6;for(let y=0;y<g;y++)u[y]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function qm(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Vi("WebGLRenderer: "+n+" extension not supported."),s}}}function Ym(i,e,t,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,y=0;if(g===void 0)return;if(f!==null){let w=f.array;y=f.version;for(let D=0,v=w.length;D<v;D+=3){let E=w[D+0],b=w[D+1],I=w[D+2];u.push(E,b,b,I,I,E)}}else{let w=g.array;y=g.version;for(let D=0,v=w.length/3-1;D<v;D+=3){let E=D+0,b=D+1,I=D+2;u.push(E,b,b,I,I,E)}}let m=new(g.count>=65535?cr:lr)(u,1);m.version=y;let p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function $m(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let y=0;for(let m=0;m<f;m++)y+=u[m];t.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Zm(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:et("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Jm(i,e,t){let n=new WeakMap,s=new It;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let S=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],D=0;f===!0&&(D=1),g===!0&&(D=2),y===!0&&(D=3);let v=o.attributes.position.count*D,E=1;v>e.maxTextureSize&&(E=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let b=new Float32Array(v*E*4*d),I=new or(b,v,E,d);I.type=An,I.needsUpdate=!0;let _=D*4;for(let N=0;N<d;N++){let B=m[N],O=p[N],F=w[N],A=v*E*4*N;for(let U=0;U<B.count;U++){let k=U*_;f===!0&&(s.fromBufferAttribute(B,U),b[A+k+0]=s.x,b[A+k+1]=s.y,b[A+k+2]=s.z,b[A+k+3]=0),g===!0&&(s.fromBufferAttribute(O,U),b[A+k+4]=s.x,b[A+k+5]=s.y,b[A+k+6]=s.z,b[A+k+7]=0),y===!0&&(s.fromBufferAttribute(F,U),b[A+k+8]=s.x,b[A+k+9]=s.y,b[A+k+10]=s.z,b[A+k+11]=F.itemSize===4?s.w:1)}}u={count:d,texture:I,size:new Ue(v,E)},n.set(o,u),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Km(i,e,t,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var jm={[dc]:"LINEAR_TONE_MAPPING",[fc]:"REINHARD_TONE_MAPPING",[pc]:"CINEON_TONE_MAPPING",[Cr]:"ACES_FILMIC_TONE_MAPPING",[gc]:"AGX_TONE_MAPPING",[xc]:"NEUTRAL_TONE_MAPPING",[mc]:"CUSTOM_TONE_MAPPING"};function Qm(i,e,t,n,s,r){let a=new dn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new wt;c.setAttribute("position",new at([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new at([0,2,0,0,2,0],2));let h=new Za({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new W(c,h),u=new Ls(-1,1,1,-1,0,1),f=null,g=null,y=!1,m,p=null,w=[],D=!1;this.setSize=function(v,E){a.setSize(v,E),o!==null&&o.setSize(v,E),l!==null&&l.setSize(v,E);for(let b=0;b<w.length;b++){let I=w[b];I.setSize&&I.setSize(v,E)}},this.setEffects=function(v){w=v,D=w.length>0&&w[0].isRenderPass===!0;let E=a.width,b=a.height;w.length>0&&o===null&&(o=new dn(E,b,{type:zn,depthBuffer:!1,stencilBuffer:!1}),l=new dn(E,b,{type:zn,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<w.length;I++){let _=w[I];_.setSize&&_.setSize(E,b)}},this.begin=function(v,E){if(y||v.toneMapping===Hn&&w.length===0)return!1;if(p=E,E!==null){let b=E.width,I=E.height;(a.width!==b||a.height!==I)&&this.setSize(b,I)}return D===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=Hn,!0},this.hasRenderPass=function(){return D},this.end=function(v,E){v.toneMapping=m,y=!0;let b=a,I=o;for(let _=0;_<w.length;_++){let S=w[_];S.enabled!==!1&&(S.render(v,I,b,E),S.needsSwap!==!1&&(b=I,I=I===o?l:o))}if(f!==v.outputColorSpace||g!==v.toneMapping){f=v.outputColorSpace,g=v.toneMapping,h.defines={},ft.getTransfer(f)===_t&&(h.defines.SRGB_TRANSFER="");let _=jm[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,v.setRenderTarget(p),v.render(d,u),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var cd=new ln,Xc=new Ri(1,1),hd=new or,ud=new Ba,dd=new dr,Wu=[],Xu=[],qu=new Float32Array(16),Yu=new Float32Array(9),$u=new Float32Array(4);function ks(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Wu[s];if(r===void 0&&(r=new Float32Array(s),Wu[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function al(i,e){let t=Xu[e];t===void 0&&(t=new Int32Array(e),Xu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function eg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function tg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2fv(this.addr,e),Xt(t,e)}}function ng(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;i.uniform3fv(this.addr,e),Xt(t,e)}}function ig(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4fv(this.addr,e),Xt(t,e)}}function sg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;$u.set(n),i.uniformMatrix2fv(this.addr,!1,$u),Xt(t,n)}}function rg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Yu.set(n),i.uniformMatrix3fv(this.addr,!1,Yu),Xt(t,n)}}function ag(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;qu.set(n),i.uniformMatrix4fv(this.addr,!1,qu),Xt(t,n)}}function og(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function lg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2iv(this.addr,e),Xt(t,e)}}function cg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3iv(this.addr,e),Xt(t,e)}}function hg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4iv(this.addr,e),Xt(t,e)}}function ug(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function dg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2uiv(this.addr,e),Xt(t,e)}}function fg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3uiv(this.addr,e),Xt(t,e)}}function pg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4uiv(this.addr,e),Xt(t,e)}}function mg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Xc.compareFunction=t.isReversedDepthBuffer()?el:Qo,r=Xc):r=cd,t.setTexture2D(e||r,s)}function gg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ud,s)}function xg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||dd,s)}function yg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||hd,s)}function _g(i){switch(i){case 5126:return eg;case 35664:return tg;case 35665:return ng;case 35666:return ig;case 35674:return sg;case 35675:return rg;case 35676:return ag;case 5124:case 35670:return og;case 35667:case 35671:return lg;case 35668:case 35672:return cg;case 35669:case 35673:return hg;case 5125:return ug;case 36294:return dg;case 36295:return fg;case 36296:return pg;case 35678:case 36198:case 36298:case 36306:case 35682:return mg;case 35679:case 36299:case 36307:return gg;case 35680:case 36300:case 36308:case 36293:return xg;case 36289:case 36303:case 36311:case 36292:return yg}}function vg(i,e){i.uniform1fv(this.addr,e)}function Mg(i,e){let t=ks(e,this.size,2);i.uniform2fv(this.addr,t)}function bg(i,e){let t=ks(e,this.size,3);i.uniform3fv(this.addr,t)}function Eg(i,e){let t=ks(e,this.size,4);i.uniform4fv(this.addr,t)}function Sg(i,e){let t=ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function wg(i,e){let t=ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Tg(i,e){let t=ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ag(i,e){i.uniform1iv(this.addr,e)}function Rg(i,e){i.uniform2iv(this.addr,e)}function Cg(i,e){i.uniform3iv(this.addr,e)}function Ig(i,e){i.uniform4iv(this.addr,e)}function Pg(i,e){i.uniform1uiv(this.addr,e)}function Lg(i,e){i.uniform2uiv(this.addr,e)}function Dg(i,e){i.uniform3uiv(this.addr,e)}function Ng(i,e){i.uniform4uiv(this.addr,e)}function Ug(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Xc:a=cd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Fg(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ud,r[a])}function Bg(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||dd,r[a])}function Og(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hd,r[a])}function Hg(i){switch(i){case 5126:return vg;case 35664:return Mg;case 35665:return bg;case 35666:return Eg;case 35674:return Sg;case 35675:return wg;case 35676:return Tg;case 5124:case 35670:return Ag;case 35667:case 35671:return Rg;case 35668:case 35672:return Cg;case 35669:case 35673:return Ig;case 5125:return Pg;case 36294:return Lg;case 36295:return Dg;case 36296:return Ng;case 35678:case 36198:case 36298:case 36306:case 35682:return Ug;case 35679:case 36299:case 36307:return Fg;case 35680:case 36300:case 36308:case 36293:return Bg;case 36289:case 36303:case 36311:case 36292:return Og}}var qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=_g(t.type)}},Yc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Hg(t.type)}},$c=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Vc=/(\w+)(\])?(\[|\.)?/g;function Zu(i,e){i.seq.push(e),i.map[e.id]=e}function Gg(i,e,t){let n=i.name,s=n.length;for(Vc.lastIndex=0;;){let r=Vc.exec(n),a=Vc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Zu(t,c===void 0?new qc(o,i,e):new Yc(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new $c(o),Zu(t,d)),t=d}}}var Gs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Gg(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Ju(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var zg=37297,kg=0;function Vg(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Ku=new st;function Wg(i){ft._getMatrix(Ku,ft.workingColorSpace,i);let e=`mat3( ${Ku.elements.map(t=>t.toFixed(4))} )`;switch(ft.getTransfer(i)){case rr:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return Je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ju(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Vg(i.getShaderSource(e),o)}else return r}function Xg(i,e){let t=Wg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var qg={[dc]:"Linear",[fc]:"Reinhard",[pc]:"Cineon",[Cr]:"ACESFilmic",[gc]:"AgX",[xc]:"Neutral",[mc]:"Custom"};function Yg(i,e){let t=qg[e];return t===void 0?(Je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var nl=new R;function $g(){ft.getLuminanceCoefficients(nl);let i=nl.x.toFixed(4),e=nl.y.toFixed(4),t=nl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zr).join(`
`)}function Jg(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Kg(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function zr(i){return i!==""}function Qu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ed(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var jg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zc(i){return i.replace(jg,ex)}var Qg=new Map;function ex(i,e){let t=ct[e];if(t===void 0){let n=Qg.get(e);if(n!==void 0)t=ct[n],Je('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Zc(t)}var tx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function td(i){return i.replace(tx,nx)}function nx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nd(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var ix={[Tr]:"SHADOWMAP_TYPE_PCF",[Ds]:"SHADOWMAP_TYPE_VSM"};function sx(i){return ix[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var rx={[Di]:"ENVMAP_TYPE_CUBE",[Ji]:"ENVMAP_TYPE_CUBE",[Ir]:"ENVMAP_TYPE_CUBE_UV"};function ax(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":rx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var ox={[Ji]:"ENVMAP_MODE_REFRACTION"};function lx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":ox[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var cx={[Rr]:"ENVMAP_BLENDING_MULTIPLY",[vu]:"ENVMAP_BLENDING_MIX",[Mu]:"ENVMAP_BLENDING_ADD"};function hx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":cx[i.combine]||"ENVMAP_BLENDING_NONE"}function ux(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function dx(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=sx(t),c=ax(t),h=lx(t),d=hx(t),u=ux(t),f=Zg(t),g=Jg(r),y=s.createProgram(),m,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(zr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(zr).join(`
`),p.length>0&&(p+=`
`)):(m=[nd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zr).join(`
`),p=[nd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?ct.tonemapping_pars_fragment:"",t.toneMapping!==Hn?Yg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,Xg("linearToOutputTexel",t.outputColorSpace),$g(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zr).join(`
`)),a=Zc(a),a=Qu(a,t),a=ed(a,t),o=Zc(o),o=Qu(o,t),o=ed(o,t),a=td(a),o=td(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let D=w+m+a,v=w+p+o,E=Ju(s,s.VERTEX_SHADER,D),b=Ju(s,s.FRAGMENT_SHADER,v);s.attachShader(y,E),s.attachShader(y,b),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function I(B){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(y)||"",F=s.getShaderInfoLog(E)||"",A=s.getShaderInfoLog(b)||"",U=O.trim(),k=F.trim(),Y=A.trim(),z=!0,P=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,E,b);else{let H=ju(s,E,"vertex"),L=ju(s,b,"fragment");et("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+U+`
`+H+`
`+L)}else U!==""?Je("WebGLProgram: Program Info Log:",U):(k===""||Y==="")&&(P=!1);P&&(B.diagnostics={runnable:z,programLog:U,vertexShader:{log:k,prefix:m},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(E),s.deleteShader(b),_=new Gs(s,y),S=Kg(s,y)}let _;this.getUniforms=function(){return _===void 0&&I(this),_};let S;this.getAttributes=function(){return S===void 0&&I(this),S};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(y,zg)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kg++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=E,this.fragmentShader=b,this}var fx=0,Jc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Kc(e),t.set(e,n)),n}},Kc=class{constructor(e){this.id=fx++,this.code=e,this.usedTimes=0}};function px(i){return i===Fi||i===Fr||i===Br}function mx(i,e,t,n,s,r){let a=new ws,o=new Jc,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function y(_,S,N,B,O,F){let A=B.fog,U=O.geometry,k=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?B.environment:null,Y=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,z=e.get(_.envMap||k,Y),P=z&&z.mapping===Ir?z.image.height:null,H=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Je("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let L=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,$=L!==void 0?L.length:0,te=0;U.morphAttributes.position!==void 0&&(te=1),U.morphAttributes.normal!==void 0&&(te=2),U.morphAttributes.color!==void 0&&(te=3);let ce,pe,se,X;if(H){let xt=Jn[H];ce=xt.vertexShader,pe=xt.fragmentShader}else{ce=_.vertexShader,pe=_.fragmentShader;let xt=o.getVertexShaderStage(_),rt=o.getFragmentShaderStage(_);o.update(_,xt,rt),se=xt.id,X=rt.id}let Z=i.getRenderTarget(),me=i.state.buffers.depth.getReversed(),de=O.isInstancedMesh===!0,_e=O.isBatchedMesh===!0,$e=!!_.map,dt=!!_.matcap,Ke=!!z,tt=!!_.aoMap,je=!!_.lightMap,ee=!!_.bumpMap&&_.wireframe===!1,ve=!!_.normalMap,Qe=!!_.displacementMap,nt=!!_.emissiveMap,Xe=!!_.metalnessMap,j=!!_.roughnessMap,C=_.anisotropy>0,fe=_.clearcoat>0,ye=_.dispersion>0,M=_.retroreflectivity>0,x=_.iridescence>0,V=_.sheen>0,G=_.transmission>0,Q=C&&!!_.anisotropyMap,he=fe&&!!_.clearcoatMap,ge=fe&&!!_.clearcoatNormalMap,re=fe&&!!_.clearcoatRoughnessMap,oe=x&&!!_.iridescenceMap,xe=x&&!!_.iridescenceThicknessMap,Te=V&&!!_.sheenColorMap,Ee=V&&!!_.sheenRoughnessMap,Ae=!!_.specularMap,Ve=!!_.specularColorMap,Ye=!!_.specularIntensityMap,it=G&&!!_.transmissionMap,q=G&&!!_.thicknessMap,Se=!!_.gradientMap,le=!!_.alphaMap,Me=_.alphaTest>0,Re=!!_.alphaHash,ue=!!_.extensions,He=Hn;_.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(He=i.toneMapping);let Ne={shaderID:H,shaderType:_.type,shaderName:_.name,vertexShader:ce,fragmentShader:pe,defines:_.defines,customVertexShaderID:se,customFragmentShaderID:X,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:_e,batchingColor:_e&&O._colorsTexture!==null,instancing:de,instancingColor:de&&O.instanceColor!==null,instancingMorph:de&&O.morphTexture!==null,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:ft.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:$e,matcap:dt,envMap:Ke,envMapMode:Ke&&z.mapping,envMapCubeUVHeight:P,aoMap:tt,lightMap:je,bumpMap:ee,normalMap:ve,displacementMap:Qe,emissiveMap:nt,normalMapObjectSpace:ve&&_.normalMapType===Su,normalMapTangentSpace:ve&&_.normalMapType===Bs,packedNormalMap:ve&&_.normalMapType===Bs&&px(_.normalMap.format),metalnessMap:Xe,roughnessMap:j,anisotropy:C,anisotropyMap:Q,clearcoat:fe,clearcoatMap:he,clearcoatNormalMap:ge,clearcoatRoughnessMap:re,dispersion:ye,retroreflection:M,iridescence:x,iridescenceMap:oe,iridescenceThicknessMap:xe,sheen:V,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:Ae,specularColorMap:Ve,specularIntensityMap:Ye,transmission:G,transmissionMap:it,thicknessMap:q,gradientMap:Se,opaque:_.transparent===!1&&_.blending===Ns&&_.alphaToCoverage===!1,alphaMap:le,alphaTest:Me,alphaHash:Re,combine:_.combine,mapUv:$e&&g(_.map.channel),aoMapUv:tt&&g(_.aoMap.channel),lightMapUv:je&&g(_.lightMap.channel),bumpMapUv:ee&&g(_.bumpMap.channel),normalMapUv:ve&&g(_.normalMap.channel),displacementMapUv:Qe&&g(_.displacementMap.channel),emissiveMapUv:nt&&g(_.emissiveMap.channel),metalnessMapUv:Xe&&g(_.metalnessMap.channel),roughnessMapUv:j&&g(_.roughnessMap.channel),anisotropyMapUv:Q&&g(_.anisotropyMap.channel),clearcoatMapUv:he&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ge&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&g(_.sheenRoughnessMap.channel),specularMapUv:Ae&&g(_.specularMap.channel),specularColorMapUv:Ve&&g(_.specularColorMap.channel),specularIntensityMapUv:Ye&&g(_.specularIntensityMap.channel),transmissionMapUv:it&&g(_.transmissionMap.channel),thicknessMapUv:q&&g(_.thicknessMap.channel),alphaMapUv:le&&g(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ve||C),vertexNormals:!!U.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!U.attributes.uv&&($e||le),fog:!!A,useFog:_.fog===!0,fogExp2:!!A&&A.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||U.attributes.normal===void 0&&ve===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:me,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:te,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:He,decodeVideoTexture:$e&&_.map.isVideoTexture===!0&&ft.getTransfer(_.map.colorSpace)===_t,decodeVideoTextureEmissive:nt&&_.emissiveMap.isVideoTexture===!0&&ft.getTransfer(_.emissiveMap.colorSpace)===_t,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ut,flipSided:_.side===Ht,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ue&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ue&&_.extensions.multiDraw===!0||_e)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function m(_){let S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(let N in _.defines)S.push(N),S.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(p(S,_),w(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function p(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numSunLights),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numSunLightShadows),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function w(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function D(_){let S=f[_.type],N;if(S){let B=Jn[S];N=Bu.clone(B.uniforms)}else N=_.uniforms;return N}function v(_,S){let N=h.get(S);return N!==void 0?++N.usedTimes:(N=new dx(i,S,_,s),c.push(N),h.set(S,N)),N}function E(_){if(--_.usedTimes===0){let S=c.indexOf(_);c[S]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function I(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:D,acquireProgram:v,releaseProgram:E,releaseShaderCache:b,programs:c,dispose:I}}function gx(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function xx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function id(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function sd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,y,m,p){let w=i[e];return w===void 0?(w={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:m,group:p},i[e]=w):(w.id=u.id,w.object=u,w.geometry=f,w.material=g,w.materialVariant=a(u),w.groupOrder=y,w.renderOrder=u.renderOrder,w.z=m,w.group=p),e++,w}function l(u,f,g,y,m,p,w){w.reversedDepth===!0&&(m=-m);let D=o(u,f,g,y,m,p);g.transmission>0?n.push(D):g.transparent===!0?s.push(D):t.push(D)}function c(u,f,g,y,m,p){let w=o(u,f,g,y,m,p);g.transmission>0?n.unshift(w):g.transparent===!0?s.unshift(w):t.unshift(w)}function h(u,f){t.length>1&&t.sort(u||xx),n.length>1&&n.sort(f||id),s.length>1&&s.sort(f||id)}function d(){for(let u=e,f=i.length;u<f;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function yx(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new sd,i.set(n,[a])):s>=r.length?(a=new sd,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function _x(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new R,color:new Oe};break;case"SpotLight":t={position:new R,direction:new R,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new R,halfWidth:new R,halfHeight:new R};break}return i[e.id]=t,t}}}function vx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Mx=0;function bx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Ex(i){let e=new _x,t=vx(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new R);let s=new R,r=new mt,a=new mt;function o(c){let h=0,d=0,u=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let f=0,g=0,y=0,m=0,p=0,w=0,D=0,v=0,E=0,b=0,I=0,_=0,S=0,N=0;c.sort(bx);for(let O=0,F=c.length;O<F;O++){let A=c[O],U=A.color,k=A.intensity,Y=A.distance,z=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===Fi?z=A.shadow.map.texture:z=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)h+=U.r*k,d+=U.g*k,u+=U.b*k;else if(A.isLightProbe){for(let P=0;P<9;P++)n.probe[P].addScaledVector(A.sh.coefficients[P],k);N++}else if(A.isSunLight){let P=e.get(A);if(P.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let H=A.shadow,L=t.get(A);L.shadowIntensity=H.intensity,L.shadowBias=H.bias,L.shadowNormalBias=H.normalBias,L.shadowRadius=H.radius,L.shadowMapSize.copy(H.mapSize).multiply(H.getFrameExtents()),n.sunShadow[g]=L,n.sunShadowMap[g]=z;let $=H.getViewportCount();for(let te=0;te<$;te++)n.sunShadowMatrix[y+te]=H.getMatrix(te),n.sunShadowCascade[y+te]=H._cascadeData[te];y+=$,g++}n.sun[f]=P,f++}else if(A.isDirectionalLight){let P=e.get(A);if(P.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let H=A.shadow,L=t.get(A);L.shadowIntensity=H.intensity,L.shadowBias=H.bias,L.shadowNormalBias=H.normalBias,L.shadowRadius=H.radius,L.shadowMapSize=H.mapSize,n.directionalShadow[m]=L,n.directionalShadowMap[m]=z,n.directionalShadowMatrix[m]=A.shadow.matrix,E++}n.directional[m]=P,m++}else if(A.isSpotLight){let P=e.get(A);P.position.setFromMatrixPosition(A.matrixWorld),P.color.copy(U).multiplyScalar(k),P.distance=Y,P.coneCos=Math.cos(A.angle),P.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),P.decay=A.decay,n.spot[w]=P;let H=A.shadow;if(A.map&&(n.spotLightMap[_]=A.map,_++,H.updateMatrices(A),A.castShadow&&S++),n.spotLightMatrix[w]=H.matrix,A.castShadow){let L=t.get(A);L.shadowIntensity=H.intensity,L.shadowBias=H.bias,L.shadowNormalBias=H.normalBias,L.shadowRadius=H.radius,L.shadowMapSize=H.mapSize,n.spotShadow[w]=L,n.spotShadowMap[w]=z,I++}w++}else if(A.isRectAreaLight){let P=e.get(A);P.color.copy(U).multiplyScalar(k),P.halfWidth.set(A.width*.5,0,0),P.halfHeight.set(0,A.height*.5,0),n.rectArea[D]=P,D++}else if(A.isPointLight){let P=e.get(A);if(P.color.copy(A.color).multiplyScalar(A.intensity),P.distance=A.distance,P.decay=A.decay,A.castShadow){let H=A.shadow,L=t.get(A);L.shadowIntensity=H.intensity,L.shadowBias=H.bias,L.shadowNormalBias=H.normalBias,L.shadowRadius=H.radius,L.shadowMapSize=H.mapSize,L.shadowCameraNear=H.camera.near,L.shadowCameraFar=H.camera.far,n.pointShadow[p]=L,n.pointShadowMap[p]=z,n.pointShadowMatrix[p]=A.shadow.matrix,b++}n.point[p]=P,p++}else if(A.isHemisphereLight){let P=e.get(A);P.skyColor.copy(A.color).multiplyScalar(k),P.groundColor.copy(A.groundColor).multiplyScalar(k),n.hemi[v]=P,v++}}D>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let B=n.hash;(B.sunLength!==f||B.directionalLength!==m||B.pointLength!==p||B.spotLength!==w||B.rectAreaLength!==D||B.hemiLength!==v||B.numSunShadows!==g||B.numDirectionalShadows!==E||B.numPointShadows!==b||B.numSpotShadows!==I||B.numSpotMaps!==_||B.numLightProbes!==N)&&(n.sun.length=f,n.directional.length=m,n.spot.length=w,n.rectArea.length=D,n.point.length=p,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=I,n.spotShadowMap.length=I,n.spotLightMatrix.length=I+_-S,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=N,B.sunLength=f,B.directionalLength=m,B.pointLength=p,B.spotLength=w,B.rectAreaLength=D,B.hemiLength=v,B.numSunShadows=g,B.numDirectionalShadows=E,B.numPointShadows=b,B.numSpotShadows=I,B.numSpotMaps=_,B.numLightProbes=N,n.version=Mx++)}function l(c,h){let d=0,u=0,f=0,g=0,y=0,m=0,p=h.matrixWorldInverse;for(let w=0,D=c.length;w<D;w++){let v=c[w];if(v.isSunLight){let E=n.sun[d];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(p),d++}else if(v.isDirectionalLight){let E=n.directional[u];E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),u++}else if(v.isSpotLight){let E=n.spot[g];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),g++}else if(v.isRectAreaLight){let E=n.rectArea[y];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),a.identity(),r.copy(v.matrixWorld),r.premultiply(p),a.extractRotation(r),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),y++}else if(v.isPointLight){let E=n.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){let E=n.hemi[m];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function rd(i){let e=new Ex(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Sx(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new rd(i),e.set(s,[o])):r>=a.length?(o=new rd(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var wx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tx=`uniform sampler2D shadow_pass;
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
}`,Ax=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],Rx=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],ad=new mt,Gr=new R,Wc=new R;function Cx(i,e,t){let n=new Cs,s=new Ue,r=new Ue,a=new It,o=new Ja,l=new Ka,c={},h=t.maxTextureSize,d={[Tn]:Ht,[Ht]:Tn,[Ut]:Ut},u=new hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:wx,fragmentShader:Tx}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new wt;g.setAttribute("position",new on(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new W(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tr;let p=this.type;this.render=function(b,I,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===tu&&(Je("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Tr);let S=i.getRenderTarget(),N=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),O=i.state;O.setBlending($n),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let F=p!==this.type;F&&I.traverse(function(A){A.material&&(Array.isArray(A.material)?A.material.forEach(U=>U.needsUpdate=!0):A.material.needsUpdate=!0)});for(let A=0,U=b.length;A<U;A++){let k=b[A],Y=k.shadow;if(Y===void 0){Je("WebGLShadowMap:",k,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);let z=Y.getFrameExtents();s.multiply(z),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/z.x),s.x=r.x*z.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/z.y),s.y=r.y*z.y,Y.mapSize.y=r.y));let P=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=P,Y.map===null||F===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===Ds){if(k.isPointLight){Je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new dn(s.x,s.y,{format:Fi,type:zn,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),Y.map.texture.name=k.name+".shadowMap",Y.map.depthTexture=new Ri(s.x,s.y,An),Y.map.depthTexture.name=k.name+".shadowMapDepth",Y.map.depthTexture.format=Xn,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=$t,Y.map.depthTexture.magFilter=$t}else k.isPointLight?(Y.map=new il(s.x),Y.map.depthTexture=new Ga(s.x,Gn)):(Y.map=new dn(s.x,s.y),Y.map.depthTexture=new Ri(s.x,s.y,Gn)),Y.map.depthTexture.name=k.name+".shadowMap",Y.map.depthTexture.format=Xn,this.type===Tr?(Y.map.depthTexture.compareFunction=P?el:Qo,Y.map.depthTexture.minFilter=Kt,Y.map.depthTexture.magFilter=Kt):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=$t,Y.map.depthTexture.magFilter=$t);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==s.x||Y.map.height!==s.y)&&Y.map.setSize(s.x,s.y);let H=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();k.isPointLight!==!0&&Y.updateMatrices(k,_);for(let L=0;L<H;L++){let $=Y.getCamera(L);if(k.isPointLight){let te=Y.camera,ce=Y.matrix,pe=k.distance||te.far;pe!==te.far&&(te.far=pe,te.updateProjectionMatrix()),Gr.setFromMatrixPosition(k.matrixWorld),te.position.copy(Gr),Wc.copy(te.position),Wc.add(Ax[L]),te.up.copy(Rx[L]),te.lookAt(Wc),te.updateMatrixWorld(),ce.makeTranslation(-Gr.x,-Gr.y,-Gr.z),ad.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(ad,te.coordinateSystem,te.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,L),i.clear();else{L===0&&(i.setRenderTarget(Y.map),i.clear());let te=Y.getViewport(L);a.set(r.x*te.x,r.y*te.y,r.x*te.z,r.y*te.w),O.viewport(a)}n=Y.getFrustum(L),v(I,_,$,k,this.type)}Y.isPointLightShadow!==!0&&this.type===Ds&&w(Y,_),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,N,B)};function w(b,I){let _=e.update(y);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new dn(s.x,s.y,{format:Fi,type:zn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(I,null,_,u,y,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(I,null,_,f,y,null)}function D(b,I,_,S){let N=null,B=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(B!==void 0)N=B;else if(N=_.isPointLight===!0?l:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let O=N.uuid,F=I.uuid,A=c[O];A===void 0&&(A={},c[O]=A);let U=A[F];U===void 0&&(U=N.clone(),A[F]=U,I.addEventListener("dispose",E)),N=U}if(N.visible=I.visible,N.wireframe=I.wireframe,S===Ds?N.side=I.shadowSide!==null?I.shadowSide:I.side:N.side=I.shadowSide!==null?I.shadowSide:d[I.side],N.alphaMap=I.alphaMap,N.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,N.map=I.map,N.clipShadows=I.clipShadows,N.clippingPlanes=I.clippingPlanes,N.clipIntersection=I.clipIntersection,N.displacementMap=I.displacementMap,N.displacementScale=I.displacementScale,N.displacementBias=I.displacementBias,N.wireframeLinewidth=I.wireframeLinewidth,N.linewidth=I.linewidth,_.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let O=i.properties.get(N);O.light=_}return N}function v(b,I,_,S,N){if(b.visible===!1)return;if(b.layers.test(I.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&N===Ds)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);let F=e.update(b),A=b.material;if(Array.isArray(A)){let U=F.groups;for(let k=0,Y=U.length;k<Y;k++){let z=U[k],P=A[z.materialIndex];if(P&&P.visible){let H=D(b,P,S,N);b.onBeforeShadow(i,b,I,_,F,H,z),i.renderBufferDirect(_,null,F,H,b,z),b.onAfterShadow(i,b,I,_,F,H,z)}}}else if(A.visible){let U=D(b,A,S,N);b.onBeforeShadow(i,b,I,_,F,U,null),i.renderBufferDirect(_,null,F,U,b,null),b.onAfterShadow(i,b,I,_,F,U,null)}}let O=b.children;for(let F=0,A=O.length;F<A;F++)v(O[F],I,_,S,N)}function E(b){b.target.removeEventListener("dispose",E);for(let _ in c){let S=c[_],N=b.target.uuid;N in S&&(S[N].dispose(),delete S[N])}}}function Ix(i,e){function t(){let q=!1,Se=new It,le=null,Me=new It(0,0,0,0);return{setMask:function(Re){le!==Re&&!q&&(i.colorMask(Re,Re,Re,Re),le=Re)},setLocked:function(Re){q=Re},setClear:function(Re,ue,He,Ne,xt){xt===!0&&(Re*=Ne,ue*=Ne,He*=Ne),Se.set(Re,ue,He,Ne),Me.equals(Se)===!1&&(i.clearColor(Re,ue,He,Ne),Me.copy(Se))},reset:function(){q=!1,le=null,Me.set(-1,0,0,0)}}}function n(){let q=!1,Se=!1,le=null,Me=null,Re=null;return{setReversed:function(ue){if(Se!==ue){let He=e.get("EXT_clip_control");ue?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),Se=ue;let Ne=Re;Re=null,this.setClear(Ne)}},getReversed:function(){return Se},setTest:function(ue){ue?Z(i.DEPTH_TEST):me(i.DEPTH_TEST)},setMask:function(ue){le!==ue&&!q&&(i.depthMask(ue),le=ue)},setFunc:function(ue){if(Se&&(ue=Uu[ue]),Me!==ue){switch(ue){case wa:i.depthFunc(i.NEVER);break;case Ta:i.depthFunc(i.ALWAYS);break;case Aa:i.depthFunc(i.LESS);break;case Ms:i.depthFunc(i.LEQUAL);break;case Ra:i.depthFunc(i.EQUAL);break;case Ca:i.depthFunc(i.GEQUAL);break;case Ia:i.depthFunc(i.GREATER);break;case Pa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Me=ue}},setLocked:function(ue){q=ue},setClear:function(ue){Re!==ue&&(Re=ue,Se&&(ue=1-ue),i.clearDepth(ue))},reset:function(){q=!1,le=null,Me=null,Re=null,Se=!1}}}function s(){let q=!1,Se=null,le=null,Me=null,Re=null,ue=null,He=null,Ne=null,xt=null;return{setTest:function(rt){q||(rt?Z(i.STENCIL_TEST):me(i.STENCIL_TEST))},setMask:function(rt){Se!==rt&&!q&&(i.stencilMask(rt),Se=rt)},setFunc:function(rt,Qt,pn){(le!==rt||Me!==Qt||Re!==pn)&&(i.stencilFunc(rt,Qt,pn),le=rt,Me=Qt,Re=pn)},setOp:function(rt,Qt,pn){(ue!==rt||He!==Qt||Ne!==pn)&&(i.stencilOp(rt,Qt,pn),ue=rt,He=Qt,Ne=pn)},setLocked:function(rt){q=rt},setClear:function(rt){xt!==rt&&(i.clearStencil(rt),xt=rt)},reset:function(){q=!1,Se=null,le=null,Me=null,Re=null,ue=null,He=null,Ne=null,xt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],y=null,m=!1,p=null,w=null,D=null,v=null,E=null,b=null,I=null,_=new Oe(0,0,0),S=0,N=!1,B=null,O=null,F=null,A=null,U=null,k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,z=0,P=i.getParameter(i.VERSION);P.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(P)[1]),Y=z>=1):P.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),Y=z>=2);let H=null,L={},$=i.getParameter(i.SCISSOR_BOX),te=i.getParameter(i.VIEWPORT),ce=new It().fromArray($),pe=new It().fromArray(te);function se(q,Se,le,Me){let Re=new Uint8Array(4),ue=i.createTexture();i.bindTexture(q,ue),i.texParameteri(q,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(q,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let He=0;He<le;He++)q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?i.texImage3D(Se,0,i.RGBA,1,1,Me,0,i.RGBA,i.UNSIGNED_BYTE,Re):i.texImage2D(Se+He,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Re);return ue}let X={};X[i.TEXTURE_2D]=se(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=se(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=se(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=se(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(i.DEPTH_TEST),a.setFunc(Ms),ee(!1),ve(oc),Z(i.CULL_FACE),tt($n);function Z(q){h[q]!==!0&&(i.enable(q),h[q]=!0)}function me(q){h[q]!==!1&&(i.disable(q),h[q]=!1)}function de(q,Se){return u[q]!==Se?(i.bindFramebuffer(q,Se),u[q]=Se,q===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Se),q===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Se),!0):!1}function _e(q,Se){let le=g,Me=!1;if(q){le=f.get(Se),le===void 0&&(le=[],f.set(Se,le));let Re=q.textures;if(le.length!==Re.length||le[0]!==i.COLOR_ATTACHMENT0){for(let ue=0,He=Re.length;ue<He;ue++)le[ue]=i.COLOR_ATTACHMENT0+ue;le.length=Re.length,Me=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,Me=!0);Me&&i.drawBuffers(le)}function $e(q){return y!==q?(i.useProgram(q),y=q,!0):!1}let dt={[Zi]:i.FUNC_ADD,[iu]:i.FUNC_SUBTRACT,[su]:i.FUNC_REVERSE_SUBTRACT};dt[ru]=i.MIN,dt[au]=i.MAX;let Ke={[ou]:i.ZERO,[lu]:i.ONE,[cu]:i.SRC_COLOR,[hc]:i.SRC_ALPHA,[mu]:i.SRC_ALPHA_SATURATE,[fu]:i.DST_COLOR,[uu]:i.DST_ALPHA,[hu]:i.ONE_MINUS_SRC_COLOR,[uc]:i.ONE_MINUS_SRC_ALPHA,[pu]:i.ONE_MINUS_DST_COLOR,[du]:i.ONE_MINUS_DST_ALPHA,[gu]:i.CONSTANT_COLOR,[xu]:i.ONE_MINUS_CONSTANT_COLOR,[yu]:i.CONSTANT_ALPHA,[_u]:i.ONE_MINUS_CONSTANT_ALPHA};function tt(q,Se,le,Me,Re,ue,He,Ne,xt,rt){if(q===$n){m===!0&&(me(i.BLEND),m=!1);return}if(m===!1&&(Z(i.BLEND),m=!0),q!==nu){if(q!==p||rt!==N){if((w!==Zi||E!==Zi)&&(i.blendEquation(i.FUNC_ADD),w=Zi,E=Zi),rt)switch(q){case Ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ar:i.blendFunc(i.ONE,i.ONE);break;case lc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:et("WebGLState: Invalid blending: ",q);break}else switch(q){case Ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ar:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case lc:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case cc:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",q);break}D=null,v=null,b=null,I=null,_.set(0,0,0),S=0,p=q,N=rt}return}Re=Re||Se,ue=ue||le,He=He||Me,(Se!==w||Re!==E)&&(i.blendEquationSeparate(dt[Se],dt[Re]),w=Se,E=Re),(le!==D||Me!==v||ue!==b||He!==I)&&(i.blendFuncSeparate(Ke[le],Ke[Me],Ke[ue],Ke[He]),D=le,v=Me,b=ue,I=He),(Ne.equals(_)===!1||xt!==S)&&(i.blendColor(Ne.r,Ne.g,Ne.b,xt),_.copy(Ne),S=xt),p=q,N=!1}function je(q,Se){q.side===Ut?me(i.CULL_FACE):Z(i.CULL_FACE);let le=q.side===Ht;Se&&(le=!le),ee(le),q.blending===Ns&&q.transparent===!1?tt($n):tt(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),a.setFunc(q.depthFunc),a.setTest(q.depthTest),a.setMask(q.depthWrite),r.setMask(q.colorWrite);let Me=q.stencilWrite;o.setTest(Me),Me&&(o.setMask(q.stencilWriteMask),o.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),o.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),nt(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):me(i.SAMPLE_ALPHA_TO_COVERAGE)}function ee(q){B!==q&&(q?i.frontFace(i.CW):i.frontFace(i.CCW),B=q)}function ve(q){q!==Qh?(Z(i.CULL_FACE),q!==O&&(q===oc?i.cullFace(i.BACK):q===eu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):me(i.CULL_FACE),O=q}function Qe(q){q!==F&&(Y&&i.lineWidth(q),F=q)}function nt(q,Se,le){q?(Z(i.POLYGON_OFFSET_FILL),(A!==Se||U!==le)&&(A=Se,U=le,a.getReversed()&&(Se=-Se),i.polygonOffset(Se,le))):me(i.POLYGON_OFFSET_FILL)}function Xe(q){q?Z(i.SCISSOR_TEST):me(i.SCISSOR_TEST)}function j(q){q===void 0&&(q=i.TEXTURE0+k-1),H!==q&&(i.activeTexture(q),H=q)}function C(q,Se,le){le===void 0&&(H===null?le=i.TEXTURE0+k-1:le=H);let Me=L[le];Me===void 0&&(Me={type:void 0,texture:void 0},L[le]=Me),(Me.type!==q||Me.texture!==Se)&&(H!==le&&(i.activeTexture(le),H=le),i.bindTexture(q,Se||X[q]),Me.type=q,Me.texture=Se)}function fe(){let q=L[H];q!==void 0&&q.type!==void 0&&(i.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function ye(){try{i.compressedTexImage2D(...arguments)}catch(q){et("WebGLState:",q)}}function M(){try{i.compressedTexImage3D(...arguments)}catch(q){et("WebGLState:",q)}}function x(){try{i.texSubImage2D(...arguments)}catch(q){et("WebGLState:",q)}}function V(){try{i.texSubImage3D(...arguments)}catch(q){et("WebGLState:",q)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(q){et("WebGLState:",q)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(q){et("WebGLState:",q)}}function he(){try{i.texStorage2D(...arguments)}catch(q){et("WebGLState:",q)}}function ge(){try{i.texStorage3D(...arguments)}catch(q){et("WebGLState:",q)}}function re(){try{i.texImage2D(...arguments)}catch(q){et("WebGLState:",q)}}function oe(){try{i.texImage3D(...arguments)}catch(q){et("WebGLState:",q)}}function xe(q){return d[q]!==void 0?d[q]:i.getParameter(q)}function Te(q,Se){d[q]!==Se&&(i.pixelStorei(q,Se),d[q]=Se)}function Ee(q){ce.equals(q)===!1&&(i.scissor(q.x,q.y,q.z,q.w),ce.copy(q))}function Ae(q){pe.equals(q)===!1&&(i.viewport(q.x,q.y,q.z,q.w),pe.copy(q))}function Ve(q,Se){let le=c.get(Se);le===void 0&&(le=new WeakMap,c.set(Se,le));let Me=le.get(q);Me===void 0&&(Me=i.getUniformBlockIndex(Se,q.name),le.set(q,Me))}function Ye(q,Se){let Me=c.get(Se).get(q);l.get(Se)!==Me&&(i.uniformBlockBinding(Se,Me,q.__bindingPointIndex),l.set(Se,Me))}function it(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},H=null,L={},u={},f=new WeakMap,g=[],y=null,m=!1,p=null,w=null,D=null,v=null,E=null,b=null,I=null,_=new Oe(0,0,0),S=0,N=!1,B=null,O=null,F=null,A=null,U=null,ce.set(0,0,i.canvas.width,i.canvas.height),pe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Z,disable:me,bindFramebuffer:de,drawBuffers:_e,useProgram:$e,setBlending:tt,setMaterial:je,setFlipSided:ee,setCullFace:ve,setLineWidth:Qe,setPolygonOffset:nt,setScissorTest:Xe,activeTexture:j,bindTexture:C,unbindTexture:fe,compressedTexImage2D:ye,compressedTexImage3D:M,texImage2D:re,texImage3D:oe,pixelStorei:Te,getParameter:xe,updateUBOMapping:Ve,uniformBlockBinding:Ye,texStorage2D:he,texStorage3D:ge,texSubImage2D:x,texSubImage3D:V,compressedTexSubImage2D:G,compressedTexSubImage3D:Q,scissor:Ee,viewport:Ae,reset:it}}function Px(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ue,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(M,x){return g?new OffscreenCanvas(M,x):ar("canvas")}function m(M,x,V){let G=1,Q=ye(M);if((Q.width>V||Q.height>V)&&(G=V/Math.max(Q.width,Q.height)),G<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){let he=Math.floor(G*Q.width),ge=Math.floor(G*Q.height);u===void 0&&(u=y(he,ge));let re=x?y(he,ge):u;return re.width=he,re.height=ge,re.getContext("2d").drawImage(M,0,0,he,ge),Je("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+he+"x"+ge+")."),re}else return"data"in M&&Je("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),M;return M}function p(M){return M.generateMipmaps}function w(M){i.generateMipmap(M)}function D(M){return M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?i.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(M,x,V,G,Q,he=!1){if(M!==null){if(i[M]!==void 0)return i[M];Je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let ge;G&&(ge=e.get("EXT_texture_norm16"),ge||Je("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=x;if(x===i.RED&&(V===i.FLOAT&&(re=i.R32F),V===i.HALF_FLOAT&&(re=i.R16F),V===i.UNSIGNED_BYTE&&(re=i.R8),V===i.UNSIGNED_SHORT&&ge&&(re=ge.R16_EXT),V===i.SHORT&&ge&&(re=ge.R16_SNORM_EXT)),x===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(re=i.R8UI),V===i.UNSIGNED_SHORT&&(re=i.R16UI),V===i.UNSIGNED_INT&&(re=i.R32UI),V===i.BYTE&&(re=i.R8I),V===i.SHORT&&(re=i.R16I),V===i.INT&&(re=i.R32I)),x===i.RG&&(V===i.FLOAT&&(re=i.RG32F),V===i.HALF_FLOAT&&(re=i.RG16F),V===i.UNSIGNED_BYTE&&(re=i.RG8),V===i.UNSIGNED_SHORT&&ge&&(re=ge.RG16_EXT),V===i.SHORT&&ge&&(re=ge.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(re=i.RG8UI),V===i.UNSIGNED_SHORT&&(re=i.RG16UI),V===i.UNSIGNED_INT&&(re=i.RG32UI),V===i.BYTE&&(re=i.RG8I),V===i.SHORT&&(re=i.RG16I),V===i.INT&&(re=i.RG32I)),x===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(re=i.RGB8UI),V===i.UNSIGNED_SHORT&&(re=i.RGB16UI),V===i.UNSIGNED_INT&&(re=i.RGB32UI),V===i.BYTE&&(re=i.RGB8I),V===i.SHORT&&(re=i.RGB16I),V===i.INT&&(re=i.RGB32I)),x===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(re=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(re=i.RGBA16UI),V===i.UNSIGNED_INT&&(re=i.RGBA32UI),V===i.BYTE&&(re=i.RGBA8I),V===i.SHORT&&(re=i.RGBA16I),V===i.INT&&(re=i.RGBA32I)),x===i.RGB&&(V===i.UNSIGNED_SHORT&&ge&&(re=ge.RGB16_EXT),V===i.SHORT&&ge&&(re=ge.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&(re=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(re=i.R11F_G11F_B10F)),x===i.RGBA){let oe=he?rr:ft.getTransfer(Q);V===i.FLOAT&&(re=i.RGBA32F),V===i.HALF_FLOAT&&(re=i.RGBA16F),V===i.UNSIGNED_BYTE&&(re=oe===_t?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&ge&&(re=ge.RGBA16_EXT),V===i.SHORT&&ge&&(re=ge.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&(re=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(re=i.RGB5_A1)}return(re===i.R16F||re===i.R32F||re===i.RG16F||re===i.RG32F||re===i.RGBA16F||re===i.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function E(M,x){let V;return M?x===null||x===Gn||x===Fs?V=i.DEPTH24_STENCIL8:x===An?V=i.DEPTH32F_STENCIL8:x===Us&&(V=i.DEPTH24_STENCIL8,Je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Gn||x===Fs?V=i.DEPTH_COMPONENT24:x===An?V=i.DEPTH_COMPONENT32F:x===Us&&(V=i.DEPTH_COMPONENT16),V}function b(M,x){return p(M)===!0||M.isFramebufferTexture&&M.minFilter!==$t&&M.minFilter!==Kt?Math.log2(Math.max(x.width,x.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?x.mipmaps.length:1}function I(M){let x=M.target;x.removeEventListener("dispose",I),S(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function _(M){let x=M.target;x.removeEventListener("dispose",_),B(x)}function S(M){let x=n.get(M);if(x.__webglInit===void 0)return;let V=M.source,G=f.get(V);if(G){let Q=G[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&N(M),Object.keys(G).length===0&&f.delete(V)}n.remove(M)}function N(M){let x=n.get(M);i.deleteTexture(x.__webglTexture);let V=M.source,G=f.get(V);delete G[x.__cacheKey],a.memory.textures--}function B(M){let x=n.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),n.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(x.__webglFramebuffer[G]))for(let Q=0;Q<x.__webglFramebuffer[G].length;Q++)i.deleteFramebuffer(x.__webglFramebuffer[G][Q]);else i.deleteFramebuffer(x.__webglFramebuffer[G]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[G])}else{if(Array.isArray(x.__webglFramebuffer))for(let G=0;G<x.__webglFramebuffer.length;G++)i.deleteFramebuffer(x.__webglFramebuffer[G]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let G=0;G<x.__webglColorRenderbuffer.length;G++)x.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[G]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let V=M.textures;for(let G=0,Q=V.length;G<Q;G++){let he=n.get(V[G]);he.__webglTexture&&(i.deleteTexture(he.__webglTexture),a.memory.textures--),n.remove(V[G])}n.remove(M)}let O=0;function F(){O=0}function A(){return O}function U(M){O=M}function k(){let M=O;return M>=s.maxTextures&&Je("WebGLTextures: Trying to use "+(M+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,M}function Y(M){let x=[];return x.push(M.wrapS),x.push(M.wrapT),x.push(M.wrapR||0),x.push(M.magFilter),x.push(M.minFilter),x.push(M.anisotropy),x.push(M.internalFormat),x.push(M.format),x.push(M.type),x.push(M.generateMipmaps),x.push(M.premultiplyAlpha),x.push(M.flipY),x.push(M.unpackAlignment),x.push(M.colorSpace),x.join()}function z(M,x){let V=n.get(M);if(M.isVideoTexture&&C(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&V.__version!==M.version){let G=M.image;if(G===null)Je("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Je("WebGLRenderer: Texture marked for update but image is incomplete");else{me(V,M,x);return}}else M.isExternalTexture&&(V.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+x)}function P(M,x){let V=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&V.__version!==M.version){me(V,M,x);return}else M.isExternalTexture&&(V.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+x)}function H(M,x){let V=n.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&V.__version!==M.version){me(V,M,x);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+x)}function L(M,x){let V=n.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&V.__version!==M.version){de(V,M,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+x)}let $={[Wi]:i.REPEAT,[Wn]:i.CLAMP_TO_EDGE,[La]:i.MIRRORED_REPEAT},te={[$t]:i.NEAREST,[bu]:i.NEAREST_MIPMAP_NEAREST,[Pr]:i.NEAREST_MIPMAP_LINEAR,[Kt]:i.LINEAR,[po]:i.LINEAR_MIPMAP_NEAREST,[Ni]:i.LINEAR_MIPMAP_LINEAR},ce={[wu]:i.NEVER,[Iu]:i.ALWAYS,[Tu]:i.LESS,[Qo]:i.LEQUAL,[Au]:i.EQUAL,[el]:i.GEQUAL,[Ru]:i.GREATER,[Cu]:i.NOTEQUAL};function pe(M,x){if(x.type===An&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Kt||x.magFilter===po||x.magFilter===Pr||x.magFilter===Ni||x.minFilter===Kt||x.minFilter===po||x.minFilter===Pr||x.minFilter===Ni)&&Je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(M,i.TEXTURE_WRAP_S,$[x.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,$[x.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,$[x.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,te[x.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,te[x.minFilter]),x.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,ce[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===$t||x.minFilter!==Pr&&x.minFilter!==Ni||x.type===An&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(M,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function se(M,x){let V=!1;M.__webglInit===void 0&&(M.__webglInit=!0,x.addEventListener("dispose",I));let G=x.source,Q=f.get(G);Q===void 0&&(Q={},f.set(G,Q));let he=Y(x);if(he!==M.__cacheKey){Q[he]===void 0&&(Q[he]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),Q[he].usedTimes++;let ge=Q[M.__cacheKey];ge!==void 0&&(Q[M.__cacheKey].usedTimes--,ge.usedTimes===0&&N(x)),M.__cacheKey=he,M.__webglTexture=Q[he].texture}return V}function X(M,x,V){return Math.floor(Math.floor(M/V)/x)}function Z(M,x,V,G){let he=M.updateRanges;if(he.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,V,G,x.data);else{he.sort((Te,Ee)=>Te.start-Ee.start);let ge=0;for(let Te=1;Te<he.length;Te++){let Ee=he[ge],Ae=he[Te],Ve=Ee.start+Ee.count,Ye=X(Ae.start,x.width,4),it=X(Ee.start,x.width,4);Ae.start<=Ve+1&&Ye===it&&X(Ae.start+Ae.count-1,x.width,4)===Ye?Ee.count=Math.max(Ee.count,Ae.start+Ae.count-Ee.start):(++ge,he[ge]=Ae)}he.length=ge+1;let re=t.getParameter(i.UNPACK_ROW_LENGTH),oe=t.getParameter(i.UNPACK_SKIP_PIXELS),xe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Te=0,Ee=he.length;Te<Ee;Te++){let Ae=he[Te],Ve=Math.floor(Ae.start/4),Ye=Math.ceil(Ae.count/4),it=Ve%x.width,q=Math.floor(Ve/x.width),Se=Ye,le=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,it),t.pixelStorei(i.UNPACK_SKIP_ROWS,q),t.texSubImage2D(i.TEXTURE_2D,0,it,q,Se,le,V,G,x.data)}M.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,re),t.pixelStorei(i.UNPACK_SKIP_PIXELS,oe),t.pixelStorei(i.UNPACK_SKIP_ROWS,xe)}}function me(M,x,V){let G=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(G=i.TEXTURE_3D);let Q=se(M,x),he=x.source;t.bindTexture(G,M.__webglTexture,i.TEXTURE0+V);let ge=n.get(he);if(he.version!==ge.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let le=ft.getPrimaries(ft.workingColorSpace),Me=x.colorSpace===Cn?null:ft.getPrimaries(x.colorSpace),Re=x.colorSpace===Cn||le===Me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let oe=m(x.image,!1,s.maxTextureSize);oe=fe(x,oe);let xe=r.convert(x.format,x.colorSpace),Te=r.convert(x.type),Ee=v(x.internalFormat,xe,Te,x.normalized,x.colorSpace,x.isVideoTexture);pe(G,x);let Ae,Ve=x.mipmaps,Ye=x.isVideoTexture!==!0,it=ge.__version===void 0||Q===!0,q=he.dataReady,Se=b(x,oe);if(x.isDepthTexture)Ee=E(x.format===Ui,x.type),it&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,Ee,oe.width,oe.height):t.texImage2D(i.TEXTURE_2D,0,Ee,oe.width,oe.height,0,xe,Te,null));else if(x.isDataTexture)if(Ve.length>0){Ye&&it&&t.texStorage2D(i.TEXTURE_2D,Se,Ee,Ve[0].width,Ve[0].height);for(let le=0,Me=Ve.length;le<Me;le++)Ae=Ve[le],Ye?q&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,Ae.width,Ae.height,xe,Te,Ae.data):t.texImage2D(i.TEXTURE_2D,le,Ee,Ae.width,Ae.height,0,xe,Te,Ae.data);x.generateMipmaps=!1}else Ye?(it&&t.texStorage2D(i.TEXTURE_2D,Se,Ee,oe.width,oe.height),q&&Z(x,oe,xe,Te)):t.texImage2D(i.TEXTURE_2D,0,Ee,oe.width,oe.height,0,xe,Te,oe.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ye&&it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ee,Ve[0].width,Ve[0].height,oe.depth);for(let le=0,Me=Ve.length;le<Me;le++)if(Ae=Ve[le],x.format!==Rn)if(xe!==null)if(Ye){if(q)if(x.layerUpdates.size>0){let Re=Dc(Ae.width,Ae.height,x.format,x.type);for(let ue of x.layerUpdates){let He=Ae.data.subarray(ue*Re/Ae.data.BYTES_PER_ELEMENT,(ue+1)*Re/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,ue,Ae.width,Ae.height,1,xe,He)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,Ae.width,Ae.height,oe.depth,xe,Ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,le,Ee,Ae.width,Ae.height,oe.depth,0,Ae.data,0,0);else Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?q&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,Ae.width,Ae.height,oe.depth,xe,Te,Ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,le,Ee,Ae.width,Ae.height,oe.depth,0,xe,Te,Ae.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{Ye&&it&&t.texStorage2D(i.TEXTURE_2D,Se,Ee,Ve[0].width,Ve[0].height);for(let le=0,Me=Ve.length;le<Me;le++)Ae=Ve[le],x.format!==Rn?xe!==null?Ye?q&&t.compressedTexSubImage2D(i.TEXTURE_2D,le,0,0,Ae.width,Ae.height,xe,Ae.data):t.compressedTexImage2D(i.TEXTURE_2D,le,Ee,Ae.width,Ae.height,0,Ae.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?q&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,Ae.width,Ae.height,xe,Te,Ae.data):t.texImage2D(i.TEXTURE_2D,le,Ee,Ae.width,Ae.height,0,xe,Te,Ae.data)}else if(x.isDataArrayTexture)if(Ye){if(it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ee,oe.width,oe.height,oe.depth),q)if(x.layerUpdates.size>0){let le=Dc(oe.width,oe.height,x.format,x.type);for(let Me of x.layerUpdates){let Re=oe.data.subarray(Me*le/oe.data.BYTES_PER_ELEMENT,(Me+1)*le/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Me,oe.width,oe.height,1,xe,Te,Re)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,xe,Te,oe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,oe.width,oe.height,oe.depth,0,xe,Te,oe.data);else if(x.isData3DTexture)Ye?(it&&t.texStorage3D(i.TEXTURE_3D,Se,Ee,oe.width,oe.height,oe.depth),q&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,xe,Te,oe.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,oe.width,oe.height,oe.depth,0,xe,Te,oe.data);else if(x.isFramebufferTexture){if(it)if(Ye)t.texStorage2D(i.TEXTURE_2D,Se,Ee,oe.width,oe.height);else{let le=oe.width,Me=oe.height;for(let Re=0;Re<Se;Re++)t.texImage2D(i.TEXTURE_2D,Re,Ee,le,Me,0,xe,Te,null),le>>=1,Me>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let le=i.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),oe.parentNode!==le){le.appendChild(oe),d.add(x),le.onpaint=Me=>{let Re=Me.changedElements;for(let ue of d)Re.includes(ue.image)&&(ue.needsUpdate=!0)},le.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,oe);else{let Re=i.RGBA,ue=i.RGBA,He=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Re,ue,He,oe)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ve.length>0){if(Ye&&it){let le=ye(Ve[0]);t.texStorage2D(i.TEXTURE_2D,Se,Ee,le.width,le.height)}for(let le=0,Me=Ve.length;le<Me;le++)Ae=Ve[le],Ye?q&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,xe,Te,Ae):t.texImage2D(i.TEXTURE_2D,le,Ee,xe,Te,Ae);x.generateMipmaps=!1}else if(Ye){if(it){let le=ye(oe);t.texStorage2D(i.TEXTURE_2D,Se,Ee,le.width,le.height)}q&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Te,oe)}else t.texImage2D(i.TEXTURE_2D,0,Ee,xe,Te,oe);p(x)&&w(G),ge.__version=he.version,x.onUpdate&&x.onUpdate(x)}M.__version=x.version}function de(M,x,V){if(x.image.length!==6)return;let G=se(M,x),Q=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+V);let he=n.get(Q);if(Q.version!==he.__version||G===!0){t.activeTexture(i.TEXTURE0+V);let ge=ft.getPrimaries(ft.workingColorSpace),re=x.colorSpace===Cn?null:ft.getPrimaries(x.colorSpace),oe=x.colorSpace===Cn||ge===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let xe=x.isCompressedTexture||x.image[0].isCompressedTexture,Te=x.image[0]&&x.image[0].isDataTexture,Ee=[];for(let ue=0;ue<6;ue++)!xe&&!Te?Ee[ue]=m(x.image[ue],!0,s.maxCubemapSize):Ee[ue]=Te?x.image[ue].image:x.image[ue],Ee[ue]=fe(x,Ee[ue]);let Ae=Ee[0],Ve=r.convert(x.format,x.colorSpace),Ye=r.convert(x.type),it=v(x.internalFormat,Ve,Ye,x.normalized,x.colorSpace),q=x.isVideoTexture!==!0,Se=he.__version===void 0||G===!0,le=Q.dataReady,Me=b(x,Ae);pe(i.TEXTURE_CUBE_MAP,x);let Re;if(xe){q&&Se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,it,Ae.width,Ae.height);for(let ue=0;ue<6;ue++){Re=Ee[ue].mipmaps;for(let He=0;He<Re.length;He++){let Ne=Re[He];x.format!==Rn?Ve!==null?q?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,He,0,0,Ne.width,Ne.height,Ve,Ne.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,He,it,Ne.width,Ne.height,0,Ne.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):q?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,He,0,0,Ne.width,Ne.height,Ve,Ye,Ne.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,He,it,Ne.width,Ne.height,0,Ve,Ye,Ne.data)}}}else{if(Re=x.mipmaps,q&&Se){Re.length>0&&Me++;let ue=ye(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,it,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(Te){q?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Ee[ue].width,Ee[ue].height,Ve,Ye,Ee[ue].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,it,Ee[ue].width,Ee[ue].height,0,Ve,Ye,Ee[ue].data);for(let He=0;He<Re.length;He++){let xt=Re[He].image[ue].image;q?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,He+1,0,0,xt.width,xt.height,Ve,Ye,xt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,He+1,it,xt.width,xt.height,0,Ve,Ye,xt.data)}}else{q?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Ve,Ye,Ee[ue]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,it,Ve,Ye,Ee[ue]);for(let He=0;He<Re.length;He++){let Ne=Re[He];q?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,He+1,0,0,Ve,Ye,Ne.image[ue]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,He+1,it,Ve,Ye,Ne.image[ue])}}}p(x)&&w(i.TEXTURE_CUBE_MAP),he.__version=Q.version,x.onUpdate&&x.onUpdate(x)}M.__version=x.version}function _e(M,x,V,G,Q,he){let ge=r.convert(V.format,V.colorSpace),re=r.convert(V.type),oe=v(V.internalFormat,ge,re,V.normalized,V.colorSpace),xe=n.get(x),Te=n.get(V);if(Te.__renderTarget=x,!xe.__hasExternalTextures){let Ee=Math.max(1,x.width>>he),Ae=Math.max(1,x.height>>he);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,he,oe,Ee,Ae,x.depth,0,ge,re,null):t.texImage2D(Q,he,oe,Ee,Ae,0,ge,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,M),j(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,Q,Te.__webglTexture,0,Xe(x)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,Q,Te.__webglTexture,he),t.bindFramebuffer(i.FRAMEBUFFER,null)}function $e(M,x,V){if(i.bindRenderbuffer(i.RENDERBUFFER,M),x.depthBuffer){let G=x.depthTexture,Q=G&&G.isDepthTexture?G.type:null,he=E(x.stencilBuffer,Q),ge=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;j(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xe(x),he,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xe(x),he,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,he,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ge,i.RENDERBUFFER,M)}else{let G=x.textures;for(let Q=0;Q<G.length;Q++){let he=G[Q],ge=r.convert(he.format,he.colorSpace),re=r.convert(he.type),oe=v(he.internalFormat,ge,re,he.normalized,he.colorSpace);j(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xe(x),oe,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xe(x),oe,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,oe,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function dt(M,x,V){let G=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,M),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(x.depthTexture);if(Q.__renderTarget=x,(!Q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,x.depthTexture.addEventListener("dispose",I)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),pe(i.TEXTURE_CUBE_MAP,x.depthTexture);let xe=r.convert(x.depthTexture.format),Te=r.convert(x.depthTexture.type),Ee;x.depthTexture.format===Xn?Ee=i.DEPTH_COMPONENT24:x.depthTexture.format===Ui&&(Ee=i.DEPTH24_STENCIL8);for(let Ae=0;Ae<6;Ae++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,Ee,x.width,x.height,0,xe,Te,null)}}else z(x.depthTexture,0);let he=Q.__webglTexture,ge=Xe(x),re=G?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,oe=x.depthTexture.format===Ui?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Xn)j(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,oe,re,he,0,ge):i.framebufferTexture2D(i.FRAMEBUFFER,oe,re,he,0);else if(x.depthTexture.format===Ui)j(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,oe,re,he,0,ge):i.framebufferTexture2D(i.FRAMEBUFFER,oe,re,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ke(M){let x=n.get(M),V=M.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==M.depthTexture){let G=M.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),G){let Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,G.removeEventListener("dispose",Q)};G.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=G}if(M.depthTexture&&!x.__autoAllocateDepthBuffer)if(V)for(let G=0;G<6;G++)dt(x.__webglFramebuffer[G],M,G);else{let G=M.texture.mipmaps;G&&G.length>0?dt(x.__webglFramebuffer[0],M,0):dt(x.__webglFramebuffer,M,0)}else if(V){x.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[G]),x.__webglDepthbuffer[G]===void 0)x.__webglDepthbuffer[G]=i.createRenderbuffer(),$e(x.__webglDepthbuffer[G],M,!1);else{let Q=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=x.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,he)}}else{let G=M.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),$e(x.__webglDepthbuffer,M,!1);else{let Q=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,he),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,he)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function tt(M,x,V){let G=n.get(M);x!==void 0&&_e(G.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Ke(M)}function je(M){let x=M.texture,V=n.get(M),G=n.get(x);M.addEventListener("dispose",_);let Q=M.textures,he=M.isWebGLCubeRenderTarget===!0,ge=Q.length>1;if(ge||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=x.version,a.memory.textures++),he){V.__webglFramebuffer=[];for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer[re]=[];for(let oe=0;oe<x.mipmaps.length;oe++)V.__webglFramebuffer[re][oe]=i.createFramebuffer()}else V.__webglFramebuffer[re]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer=[];for(let re=0;re<x.mipmaps.length;re++)V.__webglFramebuffer[re]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(ge)for(let re=0,oe=Q.length;re<oe;re++){let xe=n.get(Q[re]);xe.__webglTexture===void 0&&(xe.__webglTexture=i.createTexture(),a.memory.textures++)}if(M.samples>0&&j(M)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let re=0;re<Q.length;re++){let oe=Q[re];V.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[re]);let xe=r.convert(oe.format,oe.colorSpace),Te=r.convert(oe.type),Ee=v(oe.internalFormat,xe,Te,oe.normalized,oe.colorSpace,M.isXRRenderTarget===!0),Ae=Xe(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,Ee,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,V.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),$e(V.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(he){t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),pe(i.TEXTURE_CUBE_MAP,x);for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0)for(let oe=0;oe<x.mipmaps.length;oe++)_e(V.__webglFramebuffer[re][oe],M,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,oe);else _e(V.__webglFramebuffer[re],M,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);p(x)&&w(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let re=0,oe=Q.length;re<oe;re++){let xe=Q[re],Te=n.get(xe),Ee=i.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(Ee=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ee,Te.__webglTexture),pe(Ee,xe),_e(V.__webglFramebuffer,M,xe,i.COLOR_ATTACHMENT0+re,Ee,0),p(xe)&&w(Ee)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(re=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,G.__webglTexture),pe(re,x),x.mipmaps&&x.mipmaps.length>0)for(let oe=0;oe<x.mipmaps.length;oe++)_e(V.__webglFramebuffer[oe],M,x,i.COLOR_ATTACHMENT0,re,oe);else _e(V.__webglFramebuffer,M,x,i.COLOR_ATTACHMENT0,re,0);p(x)&&w(re),t.unbindTexture()}M.depthBuffer&&Ke(M)}function ee(M){let x=M.textures;for(let V=0,G=x.length;V<G;V++){let Q=x[V];if(p(Q)){let he=D(M),ge=n.get(Q).__webglTexture;t.bindTexture(he,ge),w(he),t.unbindTexture()}}}let ve=[],Qe=[];function nt(M){if(M.samples>0){if(j(M)===!1){let x=M.textures,V=M.width,G=M.height,Q=i.COLOR_BUFFER_BIT,he=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=n.get(M),re=x.length>1;if(re)for(let xe=0;xe<x.length;xe++)t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);let oe=M.texture.mipmaps;oe&&oe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let xe=0;xe<x.length;xe++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ge.__webglColorRenderbuffer[xe]);let Te=n.get(x[xe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Te,0)}i.blitFramebuffer(0,0,V,G,0,0,V,G,Q,i.NEAREST),l===!0&&(ve.length=0,Qe.length=0,ve.push(i.COLOR_ATTACHMENT0+xe),M.depthBuffer&&M.storeMultisampledDepthBuffer===!1&&(ve.push(he),Qe.push(he),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Qe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ve))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let xe=0;xe<x.length;xe++){t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,ge.__webglColorRenderbuffer[xe]);let Te=n.get(x[xe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,Te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.storeMultisampledDepthBuffer===!1&&l){let x=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Xe(M){return Math.min(s.maxSamples,M.samples)}function j(M){let x=n.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function C(M){let x=a.render.frame;h.get(M)!==x&&(h.set(M,x),M.update())}function fe(M,x){let V=M.colorSpace,G=M.format,Q=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||V!==sr&&V!==Cn&&(ft.getTransfer(V)===_t?(G!==Rn||Q!==fn)&&Je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",V)),x}function ye(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=F,this.getTextureUnits=A,this.setTextureUnits=U,this.setTexture2D=z,this.setTexture2DArray=P,this.setTexture3D=H,this.setTextureCube=L,this.rebindTextures=tt,this.setupRenderTarget=je,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Lx(i,e){function t(n,s=Cn){let r,a=ft.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===go)return i.UNSIGNED_SHORT_4_4_4_4;if(n===xo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Mc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===bc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===_c)return i.BYTE;if(n===vc)return i.SHORT;if(n===Us)return i.UNSIGNED_SHORT;if(n===mo)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===zn)return i.HALF_FLOAT;if(n===Ec)return i.ALPHA;if(n===Sc)return i.RGB;if(n===Rn)return i.RGBA;if(n===Xn)return i.DEPTH_COMPONENT;if(n===Ui)return i.DEPTH_STENCIL;if(n===yo)return i.RED;if(n===_o)return i.RED_INTEGER;if(n===Fi)return i.RG;if(n===vo)return i.RG_INTEGER;if(n===Mo)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Nr||n===Ur)if(a===_t)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===bo||n===Eo||n===So||n===wo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===bo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Eo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===So)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===To||n===Ao||n===Ro||n===Co||n===Io||n===Fr||n===Po)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===To||n===Ao)return a===_t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ro)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Co)return r.COMPRESSED_R11_EAC;if(n===Io)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Fr)return r.COMPRESSED_RG11_EAC;if(n===Po)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Lo||n===Do||n===No||n===Uo||n===Fo||n===Bo||n===Oo||n===Ho||n===Go||n===zo||n===ko||n===Vo||n===Wo||n===Xo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Lo)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Do)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===No)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uo)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fo)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Bo)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oo)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ho)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Go)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zo)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ko)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vo)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wo)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xo)return a===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===qo||n===Yo||n===$o)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===qo)return a===_t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$o)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zo||n===Jo||n===Br||n===Ko)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Zo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Jo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Br)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Fs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Dx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nx=`
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

}`,jc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new fr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new hn({vertexShader:Dx,fragmentShader:Nx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new W(new Bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Qc=class extends qn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,y=typeof XRWebGLBinding<"u",m=new jc,p={},w=t.getContextAttributes(),D=null,v=null,E=[],b=[],I=new Ue,_=null,S=null,N=new Jt;N.viewport=new It;let B=new Jt;B.viewport=new It;let O=[N,B],F=new co,A=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Z=E[X];return Z===void 0&&(Z=new Ts,E[X]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(X){let Z=E[X];return Z===void 0&&(Z=new Ts,E[X]=Z),Z.getGripSpace()},this.getHand=function(X){let Z=E[X];return Z===void 0&&(Z=new Ts,E[X]=Z),Z.getHandSpace()};function k(X){let Z=b.indexOf(X.inputSource);if(Z===-1)return;let me=E[Z];me!==void 0&&(me.update(X.inputSource,X.frame,c||a),me.dispatchEvent({type:X.type,data:X.inputSource}))}function Y(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",z);for(let X=0;X<E.length;X++){let Z=b[X];Z!==null&&(b[X]=null,E[X].disconnect(Z))}A=null,U=null,m.reset();for(let X in p)delete p[X];if(e.setRenderTarget(D),f=null,u=null,d=null,s=null,v=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(I.width,I.height,!1),S!==null){let X=S.camera;X.fov=S.fov,X.zoom=S.zoom,X.updateProjectionMatrix(),S=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&Je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&Je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(D=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",z),w.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(I),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,de=null,_e=null;w.depth&&(_e=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=w.stencil?Ui:Xn,de=w.stencil?Fs:Gn);let $e={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer($e),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new dn(u.textureWidth,u.textureHeight,{format:Rn,type:fn,depthTexture:new Ri(u.textureWidth,u.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let me={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new dn(f.framebufferWidth,f.framebufferHeight,{format:Rn,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),se.setContext(s),se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function z(X){for(let Z=0;Z<X.removed.length;Z++){let me=X.removed[Z],de=b.indexOf(me);de>=0&&(b[de]=null,E[de].disconnect(me))}for(let Z=0;Z<X.added.length;Z++){let me=X.added[Z],de=b.indexOf(me);if(de===-1){for(let $e=0;$e<E.length;$e++)if($e>=b.length){b.push(me),de=$e;break}else if(b[$e]===null){b[$e]=me,de=$e;break}if(de===-1)break}let _e=E[de];_e&&_e.connect(me)}}let P=new R,H=new R;function L(X,Z,me){P.setFromMatrixPosition(Z.matrixWorld),H.setFromMatrixPosition(me.matrixWorld);let de=P.distanceTo(H),_e=Z.projectionMatrix.elements,$e=me.projectionMatrix.elements,dt=_e[14]/(_e[10]-1),Ke=_e[14]/(_e[10]+1),tt=(_e[9]+1)/_e[5],je=(_e[9]-1)/_e[5],ee=(_e[8]-1)/_e[0],ve=($e[8]+1)/$e[0],Qe=dt*ee,nt=dt*ve,Xe=de/(-ee+ve),j=Xe*-ee;if(Z.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(j),X.translateZ(Xe),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),_e[10]===-1)X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let C=dt+Xe,fe=Ke+Xe,ye=Qe-j,M=nt+(de-j),x=tt*Ke/fe*C,V=je*Ke/fe*C;X.projectionMatrix.makePerspective(ye,M,x,V,C,fe),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function $(X,Z){Z===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Z.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Z=X.near,me=X.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(me=m.depthFar)),F.near=B.near=N.near=Z,F.far=B.far=N.far=me,(A!==F.near||U!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),A=F.near,U=F.far),F.layers.mask=X.layers.mask|6,N.layers.mask=F.layers.mask&-5,B.layers.mask=F.layers.mask&-3;let de=X.parent,_e=F.cameras;$(F,de);for(let $e=0;$e<_e.length;$e++)$(_e[$e],de);_e.length===2?L(F,N,B):F.projectionMatrix.copy(N.projectionMatrix),S===null&&X.isPerspectiveCamera&&(S={camera:X,fov:X.fov,zoom:X.zoom}),te(X,F,de)};function te(X,Z,me){me===null?X.matrix.copy(Z.matrixWorld):(X.matrix.copy(me.matrixWorld),X.matrix.invert(),X.matrix.multiply(Z.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Na*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(X){return p[X]};let ce=null;function pe(X,Z){if(h=Z.getViewerPose(c||a),g=Z,h!==null){let me=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let de=!1;me.length!==F.cameras.length&&(F.cameras.length=0,de=!0);for(let Ke=0;Ke<me.length;Ke++){let tt=me[Ke],je=null;if(f!==null)je=f.getViewport(tt);else{let ve=d.getViewSubImage(u,tt);je=ve.viewport,Ke===0&&(e.setRenderTargetTextures(v,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(v))}let ee=O[Ke];ee===void 0&&(ee=new Jt,ee.layers.enable(Ke),ee.viewport=new It,O[Ke]=ee),ee.matrix.fromArray(tt.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(tt.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(je.x,je.y,je.width,je.height),Ke===0&&(F.matrix.copy(ee.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),de===!0&&F.cameras.push(ee)}let _e=s.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let Ke=d.getDepthInformation(me[0]);Ke&&Ke.isValid&&Ke.texture&&m.init(Ke,s.renderState)}if(_e&&_e.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let Ke=0;Ke<me.length;Ke++){let tt=me[Ke].camera;if(tt){let je=p[tt];je||(je=new fr,p[tt]=je);let ee=d.getCameraImage(tt);je.sourceTexture=ee}}}}for(let me=0;me<E.length;me++){let de=b[me],_e=E[me];de!==null&&_e!==void 0&&_e.update(de,Z,c||a)}ce&&ce(X,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}let se=new od;se.setAnimationLoop(pe),this.setAnimationLoop=function(X){ce=X},this.dispose=function(){}}},Ux=new mt,fd=new st;fd.set(-1,0,0,0,1,0,0,0,1);function Fx(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ic(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,D,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,D):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let w=e.get(p),D=w.envMap,v=w.envMapRotation;D&&(m.envMap.value=D,m.envMapRotation.value.setFromMatrix4(Ux.makeRotationFromEuler(v)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(fd),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,D){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=D*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ht&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let w=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Bx(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,E){let b=E.program;n.uniformBlockBinding(v,b)}function c(v,E){let b=s[v.id];b===void 0&&(m(v),b=h(v),s[v.id]=b,v.addEventListener("dispose",w));let I=E.program;n.updateUBOMapping(v,I);let _=e.render.frame;r[v.id]!==_&&(u(v),r[v.id]=_)}function h(v){let E=d();v.__bindingPointIndex=E;let b=i.createBuffer(),I=v.__size,_=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,I,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,b),b}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let E=s[v.id],b=v.uniforms,I=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let _=0,S=b.length;_<S;_++){let N=b[_];if(Array.isArray(N))for(let B=0,O=N.length;B<O;B++)f(N[B],_,B,I);else f(N,_,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,E,b,I){if(y(v,E,b,I)===!0){let _=v.__offset,S=v.value;if(Array.isArray(S)){let N=0;for(let B=0;B<S.length;B++){let O=S[B],F=p(O);g(O,v.__data,N),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(N+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(S,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,v.__data)}}function g(v,E,b){typeof v=="number"||typeof v=="boolean"?E[0]=v:v.isMatrix3?(E[0]=v.elements[0],E[1]=v.elements[1],E[2]=v.elements[2],E[3]=0,E[4]=v.elements[3],E[5]=v.elements[4],E[6]=v.elements[5],E[7]=0,E[8]=v.elements[6],E[9]=v.elements[7],E[10]=v.elements[8],E[11]=0):ArrayBuffer.isView(v)?E.set(new v.constructor(v.buffer,v.byteOffset,E.length)):v.toArray(E,b)}function y(v,E,b,I){let _=v.value,S=E+"_"+b;if(I[S]===void 0)return typeof _=="number"||typeof _=="boolean"?I[S]=_:ArrayBuffer.isView(_)?I[S]=_.slice():I[S]=_.clone(),!0;{let N=I[S];if(typeof _=="number"||typeof _=="boolean"){if(N!==_)return I[S]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(N.equals(_)===!1)return N.copy(_),!0}}return!1}function m(v){let E=v.uniforms,b=0,I=16;for(let S=0,N=E.length;S<N;S++){let B=Array.isArray(E[S])?E[S]:[E[S]];for(let O=0,F=B.length;O<F;O++){let A=B[O],U=Array.isArray(A.value)?A.value:[A.value];for(let k=0,Y=U.length;k<Y;k++){let z=U[k],P=p(z),H=b%I,L=H%P.boundary,$=H+L;b+=L,$!==0&&I-$<P.storage&&(b+=I-$),A.__data=new Float32Array(P.storage/Float32Array.BYTES_PER_ELEMENT),A.__offset=b,b+=P.storage}}}let _=b%I;return _>0&&(b+=I-_),v.__size=b,v.__cache={},this}function p(v){let E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?Je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(E.boundary=16,E.storage=v.byteLength):Je("WebGLRenderer: Unsupported uniform value type.",v),E}function w(v){let E=v.target;E.removeEventListener("dispose",w);let b=a.indexOf(E.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function D(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:D}}var Ox=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Zn=null;function Hx(){return Zn===null&&(Zn=new hr(Ox,16,16,Fi,zn),Zn.name="DFG_LUT",Zn.minFilter=Kt,Zn.magFilter=Kt,Zn.wrapS=Wn,Zn.wrapT=Wn,Zn.generateMipmaps=!1,Zn.needsUpdate=!0),Zn}var sl=class{constructor(e={}){let{canvas:t=Lu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=fn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let y=f,m=new Set([Mo,vo,_o]),p=new Set([fn,Gn,Us,Fs,go,xo]),w=new Uint32Array(4),D=new Int32Array(4),v=new R,E=null,b=null,I=[],_=[],S=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,B=!1,O=null,F=null,A=null,U=null;this._outputColorSpace=Vt;let k=0,Y=0,z=null,P=-1,H=null,L=new It,$=new It,te=null,ce=new Oe(0),pe=0,se=t.width,X=t.height,Z=1,me=null,de=null,_e=new It(0,0,se,X),$e=new It(0,0,se,X),dt=!1,Ke=new Cs,tt=!1,je=!1,ee=new mt,ve=new R,Qe=new It,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xe=!1;function j(){return z===null?Z:1}let C=n;function fe(T,K){return t.getContext(T,K)}let ye,M,x,V,G,Q,he,ge,re,oe,xe,Te,Ee,Ae,Ve,Ye,it,q,Se,le,Me,Re,ue;try{let T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",xt,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Qt,!1),C===null){let K="webgl2";if(C=fe(K,T),C===null)throw fe(K)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}He()}catch(T){throw t.removeEventListener("webglcontextlost",xt,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),et("WebGLRenderer: "+T.message),T}function He(){ye=new qm(C),ye.init(),Me=new Lx(C,ye),M=new Fm(C,ye,e,Me),x=new Ix(C,ye),M.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),F=C.createFramebuffer(),A=C.createFramebuffer(),U=C.createFramebuffer(),V=new Zm(C),G=new gx,Q=new Px(C,ye,x,G,M,Me,V),he=new Xm(N),ge=new Kf(C),Re=new Nm(C,ge),re=new Ym(C,ge,V,Re),oe=new Km(C,re,ge,Re,V),q=new Jm(C,M,Q),Ve=new Bm(G),xe=new mx(N,he,ye,M,Re,Ve),Te=new Fx(N,G),Ee=new yx,Ae=new Sx(ye),it=new Dm(N,he,x,oe,g,l),Ye=new Cx(N,oe,M),ue=new Bx(C,V,M,x),Se=new Um(C,ye,V),le=new $m(C,ye,V),V.programs=xe.programs,N.capabilities=M,N.extensions=ye,N.properties=G,N.renderLists=Ee,N.shadowMap=Ye,N.state=x,N.info=V}y!==fn&&(S=new Qm(y,t.width,t.height,o,s,r));let Ne=new Qc(N,C);this.xr=Ne,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let T=ye.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=ye.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(T){T!==void 0&&(Z=T,this.setSize(se,X,!1))},this.getSize=function(T){return T.set(se,X)},this.setSize=function(T,K,ae=!0){if(Ne.isPresenting){Je("WebGLRenderer: Can't change size while VR device is presenting.");return}se=T,X=K,t.width=Math.floor(T*Z),t.height=Math.floor(K*Z),ae===!0&&(t.style.width=T+"px",t.style.height=K+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,T,K)},this.getDrawingBufferSize=function(T){return T.set(se*Z,X*Z).floor()},this.setDrawingBufferSize=function(T,K,ae){se=T,X=K,Z=ae,t.width=Math.floor(T*ae),t.height=Math.floor(K*ae),this.setViewport(0,0,T,K)},this.setEffects=function(T){if(y===fn){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let K=0;K<T.length;K++)if(T[K].isOutputPass===!0){Je("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(_e)},this.setViewport=function(T,K,ae,ne){T.isVector4?_e.set(T.x,T.y,T.z,T.w):_e.set(T,K,ae,ne),x.viewport(L.copy(_e).multiplyScalar(Z).round())},this.getScissor=function(T){return T.copy($e)},this.setScissor=function(T,K,ae,ne){T.isVector4?$e.set(T.x,T.y,T.z,T.w):$e.set(T,K,ae,ne),x.scissor($.copy($e).multiplyScalar(Z).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(T){x.setScissorTest(dt=T)},this.setOpaqueSort=function(T){me=T},this.setTransparentSort=function(T){de=T},this.getClearColor=function(T){return T.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(T=!0,K=!0,ae=!0){let ne=0;if(T){let ie=!1;if(z!==null){let Pe=z.texture.format;ie=m.has(Pe)}if(ie){let Pe=z.texture.type,Be=p.has(Pe),Ie=it.getClearColor(),Ge=it.getClearAlpha(),qe=Ie.r,lt=Ie.g,ut=Ie.b;Be?(w[0]=qe,w[1]=lt,w[2]=ut,w[3]=Ge,C.clearBufferuiv(C.COLOR,0,w)):(D[0]=qe,D[1]=lt,D[2]=ut,D[3]=Ge,C.clearBufferiv(C.COLOR,0,D))}else ne|=C.COLOR_BUFFER_BIT}K&&(ne|=C.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ae&&(ne|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&C.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),O=T},this.dispose=function(){t.removeEventListener("webglcontextlost",xt,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),it.dispose(),Ee.dispose(),Ae.dispose(),G.dispose(),he.dispose(),oe.dispose(),Re.dispose(),ue.dispose(),xe.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",uh),Ne.removeEventListener("sessionend",dh),Oi.stop()};function xt(T){T.preventDefault(),Rc("WebGLRenderer: Context Lost."),B=!0}function rt(){Rc("WebGLRenderer: Context Restored."),B=!1;let T=V.autoReset,K=Ye.enabled,ae=Ye.autoUpdate,ne=Ye.needsUpdate,ie=Ye.type;He(),V.autoReset=T,Ye.enabled=K,Ye.autoUpdate=ae,Ye.needsUpdate=ne,Ye.type=ie}function Qt(T){et("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function pn(T){let K=T.target;K.removeEventListener("dispose",pn),$d(K)}function $d(T){Zd(T),G.remove(T)}function Zd(T){let K=G.get(T).programs;K!==void 0&&(K.forEach(function(ae){xe.releaseProgram(ae)}),T.isShaderMaterial&&xe.releaseShaderCache(T))}this.renderBufferDirect=function(T,K,ae,ne,ie,Pe){K===null&&(K=nt);let Be=ie.isMesh&&ie.matrixWorld.determinantAffine()<0,Ie=jd(T,K,ae,ne,ie);x.setMaterial(ne,Be);let Ge=ae.index,qe=1;if(ne.wireframe===!0){if(Ge=re.getWireframeAttribute(ae),Ge===void 0)return;qe=2}let lt=ae.drawRange,ut=ae.attributes.position,ze=lt.start*qe,yt=(lt.start+lt.count)*qe;Pe!==null&&(ze=Math.max(ze,Pe.start*qe),yt=Math.min(yt,(Pe.start+Pe.count)*qe)),Ge!==null?(ze=Math.max(ze,0),yt=Math.min(yt,Ge.count)):ut!=null&&(ze=Math.max(ze,0),yt=Math.min(yt,ut.count));let Gt=yt-ze;if(Gt<0||Gt===1/0)return;Re.setup(ie,ne,Ie,ae,Ge);let Rt,St=Se;if(Ge!==null&&(Rt=ge.get(Ge),St=le,St.setIndex(Rt)),ie.isMesh)ne.wireframe===!0?(x.setLineWidth(ne.wireframeLinewidth*j()),St.setMode(C.LINES)):St.setMode(C.TRIANGLES);else if(ie.isLine){let en=ne.linewidth;en===void 0&&(en=1),x.setLineWidth(en*j()),ie.isLineSegments?St.setMode(C.LINES):ie.isLineLoop?St.setMode(C.LINE_LOOP):St.setMode(C.LINE_STRIP)}else ie.isPoints?St.setMode(C.POINTS):ie.isSprite&&St.setMode(C.TRIANGLES);if(ie.isBatchedMesh)if(ye.get("WEBGL_multi_draw"))St.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{let en=ie._multiDrawStarts,Fe=ie._multiDrawCounts,an=ie._multiDrawCount,pt=Ge?ge.get(Ge).bytesPerElement:1,En=G.get(ne).currentProgram.getUniforms();for(let kn=0;kn<an;kn++)En.setValue(C,"_gl_DrawID",kn),St.render(en[kn]/pt,Fe[kn])}else if(ie.isInstancedMesh)St.renderInstances(ze,Gt,ie.count);else if(ae.isInstancedBufferGeometry){let en=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,Fe=Math.min(ae.instanceCount,en);St.renderInstances(ze,Gt,Fe)}else St.render(ze,Gt)};function hh(T,K,ae,ne){O!==null&&T.isNodeMaterial&&O.setObject(ne,T),tt===!0&&Ve.setState(T,ae,!1),T.transparent===!0&&T.side===Ut&&T.forceSinglePass===!1?(T.side=Ht,T.needsUpdate=!0,Jr(T,K,ne),T.side=Tn,T.needsUpdate=!0,Jr(T,K,ne),T.side=Ut):Jr(T,K,ne)}this.compile=function(T,K,ae=null){ae===null&&(ae=T),O!==null&&O.renderStart(T,K,ae),b=Ae.get(ae),b.init(K),_.push(b),ae.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(b.pushLight(ie),ie.castShadow&&b.pushShadow(ie))}),T!==ae&&T.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(b.pushLight(ie),ie.castShadow&&b.pushShadow(ie))}),b.setupLights(),O!==null&&O.updateLights(b.state.lightsArray),je=this.localClippingEnabled,tt=Ve.init(this.clippingPlanes,je),tt===!0&&Ve.setGlobalState(this.clippingPlanes,K),O!==null&&Ye.render(b.state.shadowsArray,ae,K);let ne=new Set;return T.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;let Pe=ie.material;if(Pe)if(Array.isArray(Pe))for(let Be=0;Be<Pe.length;Be++){let Ie=Pe[Be];hh(Ie,ae,K,ie),ne.add(Ie)}else hh(Pe,ae,K,ie),ne.add(Pe)}),b=_.pop(),O!==null&&O.renderEnd(),ne},this.compileAsync=function(T,K,ae=null){let ne=this.compile(T,K,ae);return new Promise(ie=>{function Pe(){if(ne.forEach(function(Be){let Ge=G.get(Be).currentProgram;(Ge===void 0||Ge.isReady())&&ne.delete(Be)}),ne.size===0){ie(T);return}setTimeout(Pe,10)}ye.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let Ml=null;function Jd(T){Ml&&Ml(T)}function uh(){Oi.stop()}function dh(){Oi.start()}let Oi=new od;Oi.setAnimationLoop(Jd),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(T){Ml=T,Ne.setAnimationLoop(T),T===null?Oi.stop():Oi.start()},Ne.addEventListener("sessionstart",uh),Ne.addEventListener("sessionend",dh),this.render=function(T,K){if(K!==void 0&&K.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;O!==null&&O.renderStart(T,K);let ae=Ne.enabled===!0&&Ne.isPresenting===!0,ne=S!==null&&(z===null||ae)&&S.begin(N,z);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(K),K=Ne.getCamera()),T.isScene===!0&&T.onBeforeRender(N,T,K,z),b=Ae.get(T,_.length),b.init(K),b.state.textureUnits=Q.getTextureUnits(),_.push(b),ee.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),Ke.setFromProjectionMatrix(ee,Nn,K.reversedDepth),je=this.localClippingEnabled,tt=Ve.init(this.clippingPlanes,je),E=Ee.get(T,I.length),E.init(),I.push(E),Ne.enabled===!0&&Ne.isPresenting===!0){let Be=N.xr.getDepthSensingMesh();Be!==null&&bl(Be,K,-1/0,N.sortObjects)}bl(T,K,0,N.sortObjects),E.finish(),O!==null&&O.updateLights(b.state.lightsArray),N.sortObjects===!0&&E.sort(me,de),Xe=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,Xe&&it.addToRenderList(E,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),tt===!0&&Ve.beginShadows();let ie=b.state.shadowsArray;if(Ye.render(ie,T,K),tt===!0&&Ve.endShadows(),(ne&&S.hasRenderPass())===!1){let Be=E.opaque,Ie=E.transmissive;if(b.setupLights(),K.isArrayCamera){let Ge=K.cameras;if(Ie.length>0)for(let qe=0,lt=Ge.length;qe<lt;qe++){let ut=Ge[qe];ph(Be,Ie,T,ut)}Xe&&it.render(T);for(let qe=0,lt=Ge.length;qe<lt;qe++){let ut=Ge[qe];fh(E,T,ut,ut.viewport)}}else Ie.length>0&&ph(Be,Ie,T,K),Xe&&it.render(T),fh(E,T,K)}z!==null&&Y===0&&(Q.updateMultisampleRenderTarget(z),Q.updateRenderTargetMipmap(z)),ne&&S.end(N),T.isScene===!0&&T.onAfterRender(N,T,K),Re.resetDefaultState(),P=-1,H=null,_.pop(),_.length>0?(b=_[_.length-1],Q.setTextureUnits(b.state.textureUnits),tt===!0&&Ve.setGlobalState(N.clippingPlanes,b.state.camera)):b=null,I.pop(),I.length>0?E=I[I.length-1]:E=null,O!==null&&O.renderEnd()};function bl(T,K,ae,ne){if(T.visible===!1)return;if(T.layers.test(K.layers)){if(T.isGroup)ae=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(K);else if(T.isLightProbeGrid)b.pushLightProbeGrid(T);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Ke)){ne&&Qe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ee);let Be=oe.update(T),Ie=T.material;Ie.visible&&E.push(T,Be,Ie,ae,Qe.z,null,K)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Ke))){let Be=oe.update(T),Ie=T.material;if(ne&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Qe.copy(T.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),Qe.copy(Be.boundingSphere.center)),Qe.applyMatrix4(T.matrixWorld).applyMatrix4(ee)),Array.isArray(Ie)){let Ge=Be.groups;for(let qe=0,lt=Ge.length;qe<lt;qe++){let ut=Ge[qe],ze=Ie[ut.materialIndex];ze&&ze.visible&&E.push(T,Be,ze,ae,Qe.z,ut,K)}}else Ie.visible&&E.push(T,Be,Ie,ae,Qe.z,null,K)}}let Pe=T.children;for(let Be=0,Ie=Pe.length;Be<Ie;Be++)bl(Pe[Be],K,ae,ne)}function fh(T,K,ae,ne){let{opaque:ie,transmissive:Pe,transparent:Be}=T;b.setupLightsView(ae),tt===!0&&Ve.setGlobalState(N.clippingPlanes,ae),ne&&x.viewport(L.copy(ne)),ie.length>0&&Zr(ie,K,ae),Pe.length>0&&Zr(Pe,K,ae),Be.length>0&&Zr(Be,K,ae),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function ph(T,K,ae,ne){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[ne.id]===void 0){let ze=ye.has("EXT_color_buffer_half_float")||ye.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[ne.id]=new dn(1,1,{generateMipmaps:!0,type:ze?zn:fn,minFilter:Ni,samples:Math.max(4,M.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ft.workingColorSpace})}let Pe=b.state.transmissionRenderTarget[ne.id],Be=ne.viewport||L;Pe.setSize(Be.z*N.transmissionResolutionScale,Be.w*N.transmissionResolutionScale);let Ie=N.getRenderTarget(),Ge=N.getActiveCubeFace(),qe=N.getActiveMipmapLevel();N.setRenderTarget(Pe),N.getClearColor(ce),pe=N.getClearAlpha(),pe<1&&N.setClearColor(16777215,.5),N.clear(),Xe&&it.render(ae);let lt=N.toneMapping;N.toneMapping=Hn;let ut=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),b.setupLightsView(ne),tt===!0&&Ve.setGlobalState(N.clippingPlanes,ne),Zr(T,ae,ne),Q.updateMultisampleRenderTarget(Pe),Q.updateRenderTargetMipmap(Pe),ye.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let yt=0,Gt=K.length;yt<Gt;yt++){let Rt=K[yt],{object:St,geometry:en,material:Fe,group:an}=Rt;if(Fe.side===Ut&&St.layers.test(ne.layers)){let pt=Fe.side;Fe.side=Ht,Fe.needsUpdate=!0,mh(St,ae,ne,en,Fe,an),Fe.side=pt,Fe.needsUpdate=!0,ze=!0}}ze===!0&&(Q.updateMultisampleRenderTarget(Pe),Q.updateRenderTargetMipmap(Pe))}N.setRenderTarget(Ie,Ge,qe),N.setClearColor(ce,pe),ut!==void 0&&(ne.viewport=ut),N.toneMapping=lt}function Zr(T,K,ae){let ne=K.isScene===!0?K.overrideMaterial:null;for(let ie=0,Pe=T.length;ie<Pe;ie++){let Be=T[ie],{object:Ie,geometry:Ge,group:qe}=Be,lt=Be.material;lt.allowOverride===!0&&ne!==null&&(lt=ne),Ie.layers.test(ae.layers)&&mh(Ie,K,ae,Ge,lt,qe)}}function mh(T,K,ae,ne,ie,Pe){O!==null&&ie.isNodeMaterial&&O.setObject(T,ie),T.onBeforeRender(N,K,ae,ne,ie,Pe),T.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),ie.onBeforeRender(N,K,ae,ne,T,Pe),ie.transparent===!0&&ie.side===Ut&&ie.forceSinglePass===!1?(ie.side=Ht,ie.needsUpdate=!0,N.renderBufferDirect(ae,K,ne,ie,T,Pe),ie.side=Tn,ie.needsUpdate=!0,N.renderBufferDirect(ae,K,ne,ie,T,Pe),ie.side=Ut):N.renderBufferDirect(ae,K,ne,ie,T,Pe),T.onAfterRender(N,K,ae,ne,ie,Pe)}function Jr(T,K,ae){K.isScene!==!0&&(K=nt);let ne=G.get(T),ie=b.state.lights,Pe=b.state.shadowsArray,Be=ie.state.version,Ie=xe.getParameters(T,ie.state,Pe,K,ae,b.state.lightProbeGridArray),Ge=xe.getProgramCacheKey(Ie),qe=ne.programs;ne.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?K.environment:null,ne.fog=K.fog;let lt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;ne.envMap=he.get(T.envMap||ne.environment,lt),ne.envMapRotation=ne.environment!==null&&T.envMap===null?K.environmentRotation:T.envMapRotation,qe===void 0&&(T.addEventListener("dispose",pn),qe=new Map,ne.programs=qe);let ut=qe.get(Ge);if(ut!==void 0){if(ne.currentProgram===ut&&ne.lightsStateVersion===Be)return xh(T,Ie),ut}else Ie.uniforms=xe.getUniforms(T),O!==null&&T.isNodeMaterial&&O.build(T,ae,Ie),T.onBeforeCompile(Ie,N),ut=xe.acquireProgram(Ie,Ge),qe.set(Ge,ut),ne.uniforms=Ie.uniforms;let ze=ne.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(ze.clippingPlanes=Ve.uniform),xh(T,Ie),ne.needsLights=ef(T),ne.lightsStateVersion=Be,ne.needsLights&&(ze.ambientLightColor.value=ie.state.ambient,ze.lightProbe.value=ie.state.probe,ze.sunLights.value=ie.state.sun,ze.sunLightShadows.value=ie.state.sunShadow,ze.directionalLights.value=ie.state.directional,ze.directionalLightShadows.value=ie.state.directionalShadow,ze.spotLights.value=ie.state.spot,ze.spotLightShadows.value=ie.state.spotShadow,ze.rectAreaLights.value=ie.state.rectArea,ze.ltc_1.value=ie.state.rectAreaLTC1,ze.ltc_2.value=ie.state.rectAreaLTC2,ze.pointLights.value=ie.state.point,ze.pointLightShadows.value=ie.state.pointShadow,ze.hemisphereLights.value=ie.state.hemi,ze.sunShadowMatrix.value=ie.state.sunShadowMatrix,ze.sunShadowCascade.value=ie.state.sunShadowCascade,ze.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,ze.spotLightMatrix.value=ie.state.spotLightMatrix,ze.spotLightMap.value=ie.state.spotLightMap,ze.pointShadowMatrix.value=ie.state.pointShadowMatrix),ne.lightProbeGrid=b.state.lightProbeGridArray.length>0,ne.currentProgram=ut,ne.uniformsList=null,ut}function gh(T){if(T.uniformsList===null){let K=T.currentProgram.getUniforms();T.uniformsList=Gs.seqWithValue(K.seq,T.uniforms)}return T.uniformsList}function xh(T,K){let ae=G.get(T);ae.outputColorSpace=K.outputColorSpace,ae.batching=K.batching,ae.batchingColor=K.batchingColor,ae.instancing=K.instancing,ae.instancingColor=K.instancingColor,ae.instancingMorph=K.instancingMorph,ae.skinning=K.skinning,ae.morphTargets=K.morphTargets,ae.morphNormals=K.morphNormals,ae.morphColors=K.morphColors,ae.morphTargetsCount=K.morphTargetsCount,ae.numClippingPlanes=K.numClippingPlanes,ae.numIntersection=K.numClipIntersection,ae.vertexAlphas=K.vertexAlphas,ae.vertexTangents=K.vertexTangents,ae.toneMapping=K.toneMapping}function Kd(T,K){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;v.setFromMatrixPosition(K.matrixWorld);for(let ae=0,ne=T.length;ae<ne;ae++){let ie=T[ae];if(ie.texture!==null&&ie.boundingBox.containsPoint(v))return ie}return null}function jd(T,K,ae,ne,ie){K.isScene!==!0&&(K=nt),Q.resetTextureUnits();let Pe=K.fog,Be=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?K.environment:null,Ie=z===null?N.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:ft.workingColorSpace,Ge=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,qe=he.get(ne.envMap||Be,Ge),lt=ne.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,ut=!!ae.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),ze=!!ae.morphAttributes.position,yt=!!ae.morphAttributes.normal,Gt=!!ae.morphAttributes.color,Rt=Hn;ne.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(Rt=N.toneMapping);let St=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,en=St!==void 0?St.length:0,Fe=G.get(ne),an=b.state.lights;if(tt===!0&&(je===!0||T!==H)){let At=T===H&&ne.id===P;Ve.setState(ne,T,At)}let pt=!1;ne.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==an.state.version||Fe.outputColorSpace!==Ie||ie.isBatchedMesh&&Fe.batching===!1||!ie.isBatchedMesh&&Fe.batching===!0||ie.isBatchedMesh&&Fe.batchingColor===!0&&ie._colorsTexture===null||ie.isBatchedMesh&&Fe.batchingColor===!1&&ie._colorsTexture!==null||ie.isInstancedMesh&&Fe.instancing===!1||!ie.isInstancedMesh&&Fe.instancing===!0||ie.isSkinnedMesh&&Fe.skinning===!1||!ie.isSkinnedMesh&&Fe.skinning===!0||ie.isInstancedMesh&&Fe.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&Fe.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&Fe.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&Fe.instancingMorph===!1&&ie.morphTexture!==null||Fe.envMap!==qe||ne.fog===!0&&Fe.fog!==Pe||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==Ve.numPlanes||Fe.numIntersection!==Ve.numIntersection)||Fe.vertexAlphas!==lt||Fe.vertexTangents!==ut||Fe.morphTargets!==ze||Fe.morphNormals!==yt||Fe.morphColors!==Gt||Fe.toneMapping!==Rt||Fe.morphTargetsCount!==en||!!Fe.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(pt=!0):(pt=!0,Fe.__version=ne.version);let En=Fe.currentProgram;pt===!0&&(En=Jr(ne,K,ie),O&&ne.isNodeMaterial&&O.onUpdateProgram(ne,En,Fe));let kn=!1,_i=!1,ss=!1,Et=En.getUniforms(),Bt=Fe.uniforms;if(x.useProgram(En.program)&&(kn=!0,_i=!0,ss=!0),ne.id!==P&&(P=ne.id,_i=!0),Fe.needsLights){let At=Kd(b.state.lightProbeGridArray,ie);Fe.lightProbeGrid!==At&&(Fe.lightProbeGrid=At,_i=!0)}if(kn||H!==T){x.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Et.setValue(C,"projectionMatrix",T.projectionMatrix),Et.setValue(C,"viewMatrix",T.matrixWorldInverse);let Mi=Et.map.cameraPosition;Mi!==void 0&&Mi.setValue(C,ve.setFromMatrixPosition(T.matrixWorld)),M.logarithmicDepthBuffer&&Et.setValue(C,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Et.setValue(C,"isOrthographic",T.isOrthographicCamera===!0),H!==T&&(H=T,_i=!0,ss=!0)}if(Fe.needsLights&&(an.state.sunShadowMap.length>0&&Et.setValue(C,"sunShadowMap",an.state.sunShadowMap,Q),an.state.directionalShadowMap.length>0&&Et.setValue(C,"directionalShadowMap",an.state.directionalShadowMap,Q),an.state.spotShadowMap.length>0&&Et.setValue(C,"spotShadowMap",an.state.spotShadowMap,Q),an.state.pointShadowMap.length>0&&Et.setValue(C,"pointShadowMap",an.state.pointShadowMap,Q)),ie.isSkinnedMesh){Et.setOptional(C,ie,"bindMatrix"),Et.setOptional(C,ie,"bindMatrixInverse");let At=ie.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),Et.setValue(C,"boneTexture",At.boneTexture,Q))}ie.isBatchedMesh&&(Et.setOptional(C,ie,"batchingTexture"),Et.setValue(C,"batchingTexture",ie._matricesTexture,Q),Et.setOptional(C,ie,"batchingIdTexture"),Et.setValue(C,"batchingIdTexture",ie._indirectTexture,Q),Et.setOptional(C,ie,"batchingColorTexture"),ie._colorsTexture!==null&&Et.setValue(C,"batchingColorTexture",ie._colorsTexture,Q));let vi=ae.morphAttributes;if((vi.position!==void 0||vi.normal!==void 0||vi.color!==void 0)&&q.update(ie,ae,En),(_i||Fe.receiveShadow!==ie.receiveShadow)&&(Fe.receiveShadow=ie.receiveShadow,Et.setValue(C,"receiveShadow",ie.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&K.environment!==null&&(Bt.envMapIntensity.value=K.environmentIntensity),Bt.dfgLUT!==void 0&&(Bt.dfgLUT.value=Hx()),_i){if(Et.setValue(C,"toneMappingExposure",N.toneMappingExposure),Fe.needsLights&&Qd(Bt,ss),Pe&&ne.fog===!0&&Te.refreshFogUniforms(Bt,Pe),Te.refreshMaterialUniforms(Bt,ne,Z,X,b.state.transmissionRenderTarget[T.id]),Fe.needsLights&&Fe.lightProbeGrid){let At=Fe.lightProbeGrid;Bt.probesSH.value=At.texture,Bt.probesMin.value.copy(At.boundingBox.min),Bt.probesMax.value.copy(At.boundingBox.max),Bt.probesResolution.value.copy(At.resolution)}Gs.upload(C,gh(Fe),Bt,Q)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Gs.upload(C,gh(Fe),Bt,Q),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Et.setValue(C,"center",ie.center),Et.setValue(C,"modelViewMatrix",ie.modelViewMatrix),Et.setValue(C,"normalMatrix",ie.normalMatrix),Et.setValue(C,"modelMatrix",ie.matrixWorld),ne.uniformsGroups!==void 0){let At=ne.uniformsGroups;for(let Mi=0,rs=At.length;Mi<rs;Mi++){let _h=At[Mi];ue.update(_h,En),ue.bind(_h,En)}}return En}function Qd(T,K){T.ambientLightColor.needsUpdate=K,T.lightProbe.needsUpdate=K,T.sunLights.needsUpdate=K,T.sunLightShadows.needsUpdate=K,T.directionalLights.needsUpdate=K,T.directionalLightShadows.needsUpdate=K,T.pointLights.needsUpdate=K,T.pointLightShadows.needsUpdate=K,T.spotLights.needsUpdate=K,T.spotLightShadows.needsUpdate=K,T.rectAreaLights.needsUpdate=K,T.hemisphereLights.needsUpdate=K}function ef(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(T,K,ae){let ne=G.get(T);ne.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),G.get(T.texture).__webglTexture=K,G.get(T.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:ae,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,K){let ae=G.get(T);ae.__webglFramebuffer=K,ae.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(T,K=0,ae=0){z=T,k=K,Y=ae;let ne=null,ie=!1,Pe=!1;if(T){let Ie=G.get(T);if(Ie.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(C.FRAMEBUFFER,Ie.__webglFramebuffer),L.copy(T.viewport),$.copy(T.scissor),te=T.scissorTest,x.viewport(L),x.scissor($),x.setScissorTest(te),P=-1;return}else if(Ie.__webglFramebuffer===void 0)Q.setupRenderTarget(T);else if(Ie.__hasExternalTextures)Q.rebindTextures(T,G.get(T.texture).__webglTexture,G.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let lt=T.depthTexture;if(Ie.__boundDepthTexture!==lt){if(lt!==null&&G.has(lt)&&(T.width!==lt.image.width||T.height!==lt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(T)}}let Ge=T.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Pe=!0);let qe=G.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(qe[K])?ne=qe[K][ae]:ne=qe[K],ie=!0):T.samples>0&&Q.useMultisampledRTT(T)===!1?ne=G.get(T).__webglMultisampledFramebuffer:Array.isArray(qe)?ne=qe[ae]:ne=qe,L.copy(T.viewport),$.copy(T.scissor),te=T.scissorTest}else L.copy(_e).multiplyScalar(Z).floor(),$.copy($e).multiplyScalar(Z).floor(),te=dt;if(ae!==0&&(ne=F),x.bindFramebuffer(C.FRAMEBUFFER,ne)&&x.drawBuffers(T,ne),x.viewport(L),x.scissor($),x.setScissorTest(te),ie){let Ie=G.get(T.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ie.__webglTexture,ae)}else if(Pe){let Ie=K;for(let Ge=0;Ge<T.textures.length;Ge++){let qe=G.get(T.textures[Ge]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ge,qe.__webglTexture,ae,Ie)}}else if(T!==null&&ae!==0){let Ie=G.get(T.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ie.__webglTexture,ae)}P=-1};function yh(T){let K=G.get(T);return(K.__readFormat!==T.format||K.__readType!==T.type)&&(K.__readFormat=T.format,K.__readType=T.type,K.__formatReadable=M.textureFormatReadable(T.format),K.__typeReadable=M.textureTypeReadable(T.type)),K}this.readRenderTargetPixels=function(T,K,ae,ne,ie,Pe,Be,Ie=0){if(!(T&&T.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=G.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Be!==void 0&&(Ge=Ge[Be]),Ge){x.bindFramebuffer(C.FRAMEBUFFER,Ge);try{let qe=T.textures[Ie],lt=qe.format,ut=qe.type;T.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ie);let ze=yh(qe);if(ze.__formatReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ze.__typeReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=T.width-ne&&ae>=0&&ae<=T.height-ie&&C.readPixels(K,ae,ne,ie,Me.convert(lt),Me.convert(ut),Pe)}finally{let qe=z!==null?G.get(z).__webglFramebuffer:null;x.bindFramebuffer(C.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(T,K,ae,ne,ie,Pe,Be,Ie=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=G.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Be!==void 0&&(Ge=Ge[Be]),Ge)if(K>=0&&K<=T.width-ne&&ae>=0&&ae<=T.height-ie){x.bindFramebuffer(C.FRAMEBUFFER,Ge);let qe=T.textures[Ie],lt=qe.format,ut=qe.type;T.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+Ie);let ze=yh(qe);if(ze.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ze.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let yt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,yt),C.bufferData(C.PIXEL_PACK_BUFFER,Pe.byteLength,C.STREAM_READ),C.readPixels(K,ae,ne,ie,Me.convert(lt),Me.convert(ut),0),C.bindBuffer(C.PIXEL_PACK_BUFFER,null);let Gt=z!==null?G.get(z).__webglFramebuffer:null;x.bindFramebuffer(C.FRAMEBUFFER,Gt);let Rt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Nu(C,Rt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,yt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,Pe),C.bindBuffer(C.PIXEL_PACK_BUFFER,null),C.deleteBuffer(yt),C.deleteSync(Rt),Pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,K=null,ae=0){let ne=Math.pow(2,-ae),ie=Math.floor(T.image.width*ne),Pe=Math.floor(T.image.height*ne),Be=K!==null?K.x:0,Ie=K!==null?K.y:0;Q.setTexture2D(T,0),C.copyTexSubImage2D(C.TEXTURE_2D,ae,0,0,Be,Ie,ie,Pe),x.unbindTexture()},this.copyTextureToTexture=function(T,K,ae=null,ne=null,ie=0,Pe=0){let Be,Ie,Ge,qe,lt,ut,ze,yt,Gt,Rt=T.isCompressedTexture?T.mipmaps[Pe]:T.image;if(ae!==null)Be=ae.max.x-ae.min.x,Ie=ae.max.y-ae.min.y,Ge=ae.isBox3?ae.max.z-ae.min.z:1,qe=ae.min.x,lt=ae.min.y,ut=ae.isBox3?ae.min.z:0;else{let Bt=Math.pow(2,-ie);Be=Math.floor(Rt.width*Bt),Ie=Math.floor(Rt.height*Bt),T.isDataArrayTexture?Ge=Rt.depth:T.isData3DTexture?Ge=Math.floor(Rt.depth*Bt):Ge=1,qe=0,lt=0,ut=0}ne!==null?(ze=ne.x,yt=ne.y,Gt=ne.z):(ze=0,yt=0,Gt=0);let St=Me.convert(K.format),en=Me.convert(K.type),Fe;K.isData3DTexture?(Q.setTexture3D(K,0),Fe=C.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(Q.setTexture2DArray(K,0),Fe=C.TEXTURE_2D_ARRAY):(Q.setTexture2D(K,0),Fe=C.TEXTURE_2D),x.activeTexture(C.TEXTURE0),x.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,K.flipY),x.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),x.pixelStorei(C.UNPACK_ALIGNMENT,K.unpackAlignment);let an=x.getParameter(C.UNPACK_ROW_LENGTH),pt=x.getParameter(C.UNPACK_IMAGE_HEIGHT),En=x.getParameter(C.UNPACK_SKIP_PIXELS),kn=x.getParameter(C.UNPACK_SKIP_ROWS),_i=x.getParameter(C.UNPACK_SKIP_IMAGES);x.pixelStorei(C.UNPACK_ROW_LENGTH,Rt.width),x.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Rt.height),x.pixelStorei(C.UNPACK_SKIP_PIXELS,qe),x.pixelStorei(C.UNPACK_SKIP_ROWS,lt),x.pixelStorei(C.UNPACK_SKIP_IMAGES,ut);let ss=T.isDataArrayTexture||T.isData3DTexture,Et=K.isDataArrayTexture||K.isData3DTexture;if(T.isDepthTexture){let Bt=G.get(T),vi=G.get(K),At=G.get(Bt.__renderTarget),Mi=G.get(vi.__renderTarget);x.bindFramebuffer(C.READ_FRAMEBUFFER,At.__webglFramebuffer),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let rs=0;rs<Ge;rs++)ss&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,G.get(T).__webglTexture,ie,ut+rs),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,G.get(K).__webglTexture,Pe,Gt+rs)),C.blitFramebuffer(qe,lt,Be,Ie,ze,yt,Be,Ie,C.DEPTH_BUFFER_BIT,C.NEAREST);x.bindFramebuffer(C.READ_FRAMEBUFFER,null),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(ie!==0||T.isRenderTargetTexture||G.has(T)){let Bt=G.get(T),vi=G.get(K);x.bindFramebuffer(C.READ_FRAMEBUFFER,A),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,U);for(let At=0;At<Ge;At++)ss?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Bt.__webglTexture,ie,ut+At):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Bt.__webglTexture,ie),Et?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,vi.__webglTexture,Pe,Gt+At):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,vi.__webglTexture,Pe),ie!==0?C.blitFramebuffer(qe,lt,Be,Ie,ze,yt,Be,Ie,C.COLOR_BUFFER_BIT,C.NEAREST):Et?C.copyTexSubImage3D(Fe,Pe,ze,yt,Gt+At,qe,lt,Be,Ie):C.copyTexSubImage2D(Fe,Pe,ze,yt,qe,lt,Be,Ie);x.bindFramebuffer(C.READ_FRAMEBUFFER,null),x.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Et?T.isDataTexture||T.isData3DTexture?C.texSubImage3D(Fe,Pe,ze,yt,Gt,Be,Ie,Ge,St,en,Rt.data):K.isCompressedArrayTexture?C.compressedTexSubImage3D(Fe,Pe,ze,yt,Gt,Be,Ie,Ge,St,Rt.data):C.texSubImage3D(Fe,Pe,ze,yt,Gt,Be,Ie,Ge,St,en,Rt):T.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,Pe,ze,yt,Be,Ie,St,en,Rt.data):T.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,Pe,ze,yt,Rt.width,Rt.height,St,Rt.data):C.texSubImage2D(C.TEXTURE_2D,Pe,ze,yt,Be,Ie,St,en,Rt);x.pixelStorei(C.UNPACK_ROW_LENGTH,an),x.pixelStorei(C.UNPACK_IMAGE_HEIGHT,pt),x.pixelStorei(C.UNPACK_SKIP_PIXELS,En),x.pixelStorei(C.UNPACK_SKIP_ROWS,kn),x.pixelStorei(C.UNPACK_SKIP_IMAGES,_i),Pe===0&&K.generateMipmaps&&C.generateMipmap(Fe),x.unbindTexture()},this.initRenderTarget=function(T){G.get(T).__webglFramebuffer===void 0&&Q.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Q.setTextureCube(T,0):T.isData3DTexture?Q.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Q.setTexture2DArray(T,0):Q.setTexture2D(T,0),x.unbindTexture()},this.resetState=function(){k=0,Y=0,z=null,x.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ft._getDrawingBufferColorSpace(e),t.unpackColorSpace=ft._getUnpackColorSpace()}};var ol=class extends Xi{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new we;e.deleteAttribute("uv");let t=new On({side:Ht}),n=new On,s=new Sr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new W(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new hi(e,n,6),o=new kt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new W(e,Vs(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new W(e,Vs(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new W(e,Vs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new W(e,Vs(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new W(e,Vs(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new W(e,Vs(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Vs(i){return new _r({color:0,emissive:16777215,emissiveIntensity:i})}var Gx=new Set(["BoxGeometry","RoundedBoxGeometry","CylinderGeometry","ConeGeometry","SphereGeometry","IcosahedronGeometry","OctahedronGeometry","DodecahedronGeometry","CapsuleGeometry"]),pd=new Set(["PlaneGeometry","CircleGeometry","RingGeometry","ShapeGeometry"]),zx=`
uniform vec2 uRes; uniform float uPx; uniform float uUsePos; uniform float uR;
#include <clipping_planes_pars_vertex>
void main() {
  vec3 d = uUsePos > 0.5 ? normalize(position + vec3(1e-5)) : normal;
  mat4 mm = modelMatrix;
  #ifdef USE_INSTANCING
    mm = modelMatrix * instanceMatrix;
  #endif
  vec4 mvPosition = viewMatrix * mm * vec4(position, 1.0);
  vec4 clip = projectionMatrix * mvPosition;
  vec3 dv = mat3(viewMatrix * mm) * d;
  vec2 dir = dv.xy; float L = length(dir);
  dir = L > 1e-5 ? dir / L : vec2(0.0);
  // LOD: parts smaller than ~18px on screen get a thinner (then no) outline, so far racks never go to black mush
  float rW = uR * length(mm[0].xyz);
  float rPx = rW * projectionMatrix[1][1] / max(clip.w, 1e-4) * uRes.y * 0.5;
  float k = clamp((rPx - 4.0) / 14.0, 0.0, 1.0);
  clip.xy += dir * uPx * k * 2.0 / uRes * clip.w;
  gl_Position = clip;
  #include <clipping_planes_vertex>
}`,kx=`
uniform vec3 uCol; uniform float uOp;
#include <clipping_planes_pars_fragment>
void main() {
  #include <clipping_planes_fragment>
  gl_FragColor = vec4(uCol, uOp);
}`;function md(){return{uRes:{value:new Ue(1e3,600)},uPx:{value:1.25}}}function Vx(i,e,t,n,s,r){return new hn({uniforms:{uRes:i.uRes,uPx:i.uPx,uUsePos:{value:e?1:0},uR:{value:r},uCol:{value:new Oe(t)},uOp:{value:n}},vertexShader:zx,fragmentShader:kx,side:Ht,transparent:n<1,depthWrite:!0,clipping:!!(s&&s.length),clippingPlanes:s&&s.length?s:null})}function eh(i,e,t={}){let n=t.color??2762274,s=t.minR??0,r=[];i.traverse(o=>{if(!o.isMesh||o.userData.isInk||o.userData.noInk||o.userData._inked)return;let l=o.geometry,c=o.material;if(!l||!l.attributes||!l.attributes.position||!l.attributes.normal||pd.has(l.type)||!c||Array.isArray(c)||c.isShaderMaterial||c.isPointsMaterial)return;let h=o.userData._revOp!=null?o.userData._revOp:c.opacity??1,d=!!(c.userData&&c.userData.isGlass)||o.userData.inkGlass===!0;h<(d?.02:.97)||(d&&(o.userData._inkGlass=!0),c.blending!==Ar&&(!d&&c.clippingPlanes&&c.clippingPlanes.length||s&&(l.boundingSphere||l.computeBoundingSphere(),l.boundingSphere.radius*o.scale.x<s)||r.push(o)))});let a=0;for(let o of r){let l=!!o.userData._inkGlass,c=Gx.has(o.geometry.type)||o.userData.inkPosDir===!0;o.geometry.boundingSphere||o.geometry.computeBoundingSphere();let h=Vx(e,c,n,1,o.material.clippingPlanes,o.geometry.boundingSphere.radius),d=o.isInstancedMesh?new hi(o.geometry,h,o.count):new W(o.geometry,h);o.isInstancedMesh&&(d.instanceMatrix=o.instanceMatrix,d.count=o.count),d.userData.isInk=!0,o.userData._inked=!0,d.raycast=()=>{},d.renderOrder=o.renderOrder,d.frustumCulled=o.frustumCulled;let u=t.opacity??.92;if(l){let f=o.material;f.stencilWrite||(a=1,f.stencilWrite=!0,f.stencilRef=a,f.stencilFunc=jo,f.stencilZPass=wc,f.needsUpdate=!0),h.stencilWrite=!0,h.stencilRef=f.stencilRef,h.stencilFunc=Tc,h.stencilZPass=Ai,h.stencilFail=Ai,h.stencilZFail=Ai,h.transparent=!0,h.depthWrite=!1,d.renderOrder=o.renderOrder+1;let g=o.userData._revOp!=null?o.userData._revOp:f.opacity||1;d.onBeforeRender=()=>{let y=o.material&&o.material.opacity!=null?o.material.opacity:g;h.uniforms.uOp.value=.8*Math.min(1,y/Math.max(g,.001)),d.visible=o.material?o.material.visible!==!1:!0},o.add(d);continue}d.onBeforeRender=()=>{let f=o.material,g=f&&f.opacity!=null?f.opacity:1;h.uniforms.uOp.value=u*g;let y=g<.999||u<1;h.transparent!==y&&(h.transparent=y,h.needsUpdate=!0),d.visible=f?f.visible!==!1:!0},o.add(d)}return r.length}var ll=null;function Wx(){if(ll)return ll;let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,4,64,64,63);return t.addColorStop(0,"rgba(0,0,0,1)"),t.addColorStop(.45,"rgba(0,0,0,0.55)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),ll=new wn(i),ll}function th(i,e={}){let t=new cn,n=new cn,s=!1;if(i.traverse(l=>{l.userData._revPending&&(s=!0)}),s||(i.traverse(l=>{if(!l.isMesh||l.userData.isInk||l.userData.isShadow||l.userData.noShadowBox||l.geometry&&pd.has(l.geometry.type))return;let c=!0;for(let h=l;h;h=h.parent)if(h.visible===!1){c=!1;break}c&&(n.setFromObject(l),n.isEmpty()||t.union(n))}),t.isEmpty()))return null;let r=t.getSize(new R),a=t.getCenter(new R),o=i.userData._contactShadow;return o||(o=new W(new Bn(1,1),new sn({color:1709072,alphaMap:Wx(),transparent:!0,opacity:e.opacity??.2,depthWrite:!1})),o.rotation.x=-Math.PI/2,o.userData.isShadow=!0,o.renderOrder=-1,o.raycast=()=>{},i.add(o),i.userData._contactShadow=o),o.position.set(a.x,t.min.y-.004*Math.max(r.x,r.z),a.z),o.scale.set(r.x*1.35,r.z*1.45,1),o}function vt(i,e){let t=e.ui,n;try{let L=document.createElement("canvas");if(!(L.getContext("webgl2")||L.getContext("webgl")))return null;n=new sl({antialias:!0,alpha:!0,stencil:!0,powerPreference:"low-power",preserveDrawingBuffer:!0})}catch{return null}let s=document.createElement("div");s.className="canvas-wrap three-wrap",i.appendChild(s);let r=n.domElement;r.setAttribute("role","img"),r.setAttribute("aria-label",e.label),r.tabIndex=0,s.appendChild(r),n.outputColorSpace=Vt,n.toneMapping=Cr,n.toneMappingExposure=e.exposure??1.05,n.setClearColor(16053490,0),e.localClipping&&(n.localClippingEnabled=!0);let a=new Xi;a.userData.renderer=n;let o=new Jt(e.fov||34,1.6,.05,500),l=e.target&&e.target.clone?e.target.clone():new R(0,0,0),c={yaw:e.yaw??0,pitch:e.pitch??.6,dist:8},h=[],d=!0,u=0,f=0,g=!0,y=0,m=0,p=e.radius||3,w=e.radiusY||p*.6,D=e.autoFit!==!1,v=md(),E=!1,b=e.contactShadow===!1?2:0,I=0;function _(){e.ink!==!1&&(eh(a,v,{color:e.inkColor,opacity:e.inkOpacity,minR:e.inkMinR}),E=!0)}function S(){if(e.place){e.place(o,l,c);return}let L=Math.cos(c.pitch);o.position.set(l.x+c.dist*Math.sin(c.yaw)*L,l.y+c.dist*Math.sin(c.pitch),l.z+c.dist*Math.cos(c.yaw)*L),o.lookAt(l)}function N(){if(!D)return;let L=o.fov*Math.PI/360,$=Math.atan(Math.tan(L)*o.aspect),te=e.fitPadX??e.fitPad??1.08,ce=e.fitPadY??e.fitPad??1.08;c.dist=Math.max(p/Math.tan($)*te,w/Math.tan(L)*ce)}function B(){y=s.clientWidth||600,m=e.height(y),n.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),n.setSize(y,m,!0);{let L=n.getPixelRatio();v.uRes.value.set(y*L,m*L),v.uPx.value=(e.inkPx??.85)*L}o.aspect=y/m,o.updateProjectionMatrix(),N(),e.onResize&&e.onResize(y,m),U()}function O(){S(),n.render(a,o);let L=new R;for(let $ of h){let te=$.pos();if(!te){$.el.style.display="none";continue}L.copy(te).project(o);let ce=(L.x+1)/2*y,pe=(1-L.y)/2*m,se=L.z<1&&ce>4&&ce<y-4&&pe>4&&pe<m-4;$.el.style.display=se?"":"none",$.el.style.transform=`translate(${Math.round(ce)}px, ${Math.round(pe)}px) translate(-50%, ${$.below?"8px":"calc(-100% - 8px)"})`}g=!1}function F(L){u=0;let $=Math.min(.05,(L-f)/1e3||.016);f=L;let te=!1;if(e.step&&(t.isPlaying()||e.busy&&e.busy()))try{te=!!e.step($)}catch{te=!1,g=!0}b===1&&(I+=$,I>.25&&th(a,{opacity:e.shadowOpacity})&&(b=2,g=!0)),(g||te)&&O(),!u&&d&&(te||g)&&(u=requestAnimationFrame(F))}function A(){!u&&d&&(g||t.isPlaying()&&e.busy&&e.busy()||e.busy&&e.busy())&&(f=performance.now(),u=requestAnimationFrame(F))}function U(){g=!0,A()}new IntersectionObserver(L=>{let $=d;d=L[0].isIntersecting,d&&!$&&e.onShow&&e.onShow(),A()},{threshold:.15}).observe(r),t.onPlayChange(()=>A()),new ResizeObserver(B).observe(s);let k=new ui,Y=new Ue,z=null;r.style.touchAction="pan-y",r.style.cursor="grab",r.addEventListener("pointerdown",L=>{z={x:L.clientX,y:L.clientY,yaw:c.yaw,pitch:c.pitch,moved:!1,mouse:L.pointerType==="mouse"};try{r.setPointerCapture(L.pointerId)}catch{}}),r.addEventListener("pointermove",L=>{if(!z)return;let $=L.clientX-z.x,te=L.clientY-z.y;!z.moved&&Math.hypot($,te)<6||(z.moved=!0,r.style.cursor="grabbing",c.yaw=z.yaw-$*.008,z.mouse&&(c.pitch=Math.max(.15,Math.min(1.45,z.pitch+te*.006))),e.onTurn&&e.onTurn(),U())}),r.addEventListener("pointerup",L=>{if(z&&!z.moved&&e.onTap&&e.pickable){let $=r.getBoundingClientRect();Y.set((L.clientX-$.left)/$.width*2-1,-((L.clientY-$.top)/$.height)*2+1),S(),k.setFromCamera(Y,o);let te=k.intersectObject(e.pickable(),!0)[0];te&&e.onTap(te.point,te)}z=null,r.style.cursor="grab"}),r.addEventListener("pointercancel",()=>{z=null,r.style.cursor="grab"}),r.addEventListener("keydown",L=>{let $={ArrowLeft:[-.12,0],ArrowRight:[.12,0],ArrowUp:[0,.08],ArrowDown:[0,-.08]}[L.key];$?(c.yaw+=$[0],c.pitch=Math.max(.15,Math.min(1.45,c.pitch+$[1])),U(),L.preventDefault()):(L.key==="Enter"||L.key===" ")&&e.onKey&&(e.onKey(),L.preventDefault())});function P(L,$,te="",ce=!1){let pe=document.createElement("div");pe.className="l3d "+te,pe.innerHTML=L,pe.setAttribute("aria-hidden","true"),s.appendChild(pe);let se={el:pe,pos:$,below:ce};return h.push(se),se}function H(L={}){L.target&&l.copy(L.target),L.radius!=null&&(p=L.radius),L.radiusY!=null&&(w=L.radiusY),L.dist!=null?c.dist=L.dist:N(),L.yaw!=null&&(c.yaw=L.yaw),L.pitch!=null&&(c.pitch=L.pitch),U()}return B(),{scene:a,camera:o,renderer:n,wrap:s,canvas:r,view:c,target:l,invalidate:U,kick:A,label:P,setFocus:H,ready(){E||_(),b===0&&(b=1),g=!0,d?A():(d=!0,O())},inkNew(L){e.ink!==!1&&eh(L||a,v,{color:e.inkColor,opacity:e.inkOpacity,minR:e.inkMinR})},reshadow(){b===2&&e.contactShadow!==!1&&(th(a,{opacity:e.shadowOpacity}),U())},get visible(){return d},get radius(){return p}}}var cl=null;function Xx(i){if(cl)return cl;let e=new zs(i);return cl=e.fromScene(new ol,.04),e.dispose(),cl}function Mt(i,e={}){let t=new Mr(e.sky??16774890,e.ground??9083048,e.hemi??.95);i.add(t);let n=new Li(e.key??16773856,e.keyI??1.25);n.position.set(e.keyPos?.[0]??3.5,e.keyPos?.[1]??6.5,e.keyPos?.[2]??4),i.add(n);let s=new Li(e.fill??14543103,e.fillI??.38);s.position.set(e.fillPos?.[0]??-4,e.fillPos?.[1]??2.5,e.fillPos?.[2]??-2.5),i.add(s);let r=new Li(e.rim??15266047,e.rimI??.45);r.position.set(e.rimPos?.[0]??-2.5,e.rimPos?.[1]??3.5,e.rimPos?.[2]??-5),i.add(r);let a=null;e.glint!==!1&&(a=new Li(e.glintCol??16773336,e.glintI??.55),a.position.set(e.glintPos?.[0]??6.5,e.glintPos?.[1]??8.5,e.glintPos?.[2]??1.2),i.add(a));let o=e.renderer||i.userData.renderer;if(o&&e.envI!==0)try{if(!i.environment){let l=Xx(o);i.environment=l.texture}i.environmentIntensity=e.envI??.75}catch{}return{hemi:t,key:n,fill:s,rim:r,glint:a}}var kr=new R;function In(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;kr.copy(e),kr[n]=0,kr.normalize();let c=.5*a/(a+o),h=1-kr.angleTo(i)/l;return Math.sign(kr[t])===1?h*c:o/(a+o)+c+c*(1-h)}var hl=class i extends we{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new R,c=new R,h=new R(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,g=d.length/6,y=new R,m=.5/a;for(let p=0,w=0;p<d.length;p+=3,w+=2)switch(l.fromArray(d,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),d[p+0]=h.x*Math.sign(l.x)+c.x*r,d[p+1]=h.y*Math.sign(l.y)+c.y*r,d[p+2]=h.z*Math.sign(l.z)+c.z*r,u[p+0]=c.x,u[p+1]=c.y,u[p+2]=c.z,Math.floor(p/g)){case 0:y.set(1,0,0),f[w+0]=In(y,c,"z","y",r,n),f[w+1]=1-In(y,c,"y","z",r,t);break;case 1:y.set(-1,0,0),f[w+0]=1-In(y,c,"z","y",r,n),f[w+1]=1-In(y,c,"y","z",r,t);break;case 2:y.set(0,1,0),f[w+0]=1-In(y,c,"x","z",r,e),f[w+1]=In(y,c,"z","x",r,n);break;case 3:y.set(0,-1,0),f[w+0]=1-In(y,c,"x","z",r,e),f[w+1]=1-In(y,c,"z","x",r,n);break;case 4:y.set(0,0,1),f[w+0]=1-In(y,c,"x","y",r,e),f[w+1]=1-In(y,c,"y","x",r,t);break;case 5:y.set(0,0,-1),f[w+0]=In(y,c,"x","y",r,e),f[w+1]=1-In(y,c,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};var qx=typeof window<"u"&&window.AIX_STYLE||"clean",gd=qx==="clean";function Yx(i){let e=new Oe(i),t={};e.getHSL(t);let n=.105+(t.h-.105)*.75,s=Math.min(.92,Math.max(.74,.8+.45*(t.s-.4))),r=Math.min(.52,Math.max(.28,.1+.68*t.l));return e.setHSL(n,s,r).getHex()}function xd(i,e){let t=new Oe(e),n={};t.getHSL(n),t.setHSL(n.h,Math.min(1,n.s*.9),Math.min(.82,n.l*1.12+.06)),i.side=Ut;let s=i.onBeforeCompile;i.onBeforeCompile=(o,l)=>{s&&s(o,l),o.uniforms.uSec={value:new R(t.r,t.g,t.b)},o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 uSec;`).replace("#include <dithering_fragment>",`#include <dithering_fragment>
  if (!gl_FrontFacing) gl_FragColor.rgb = uSec;`)};let r=i.customProgramCacheKey?.bind(i);i.customProgramCacheKey=()=>(r?r():"")+"sectionCap";let a=i.clone.bind(i);return i.clone=()=>{let o=a();return xd(o,e)},i}function We(i,e={}){let t=e.opacity??1,n=new yr({color:i,transparent:t<1,opacity:t,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??0,shininess:e.shininess??28,specular:e.specular??4473924,flatShading:!1,side:e.side??Tn,depthWrite:t>=.95,clippingPlanes:e.clip||e.clippingPlanes||[],clipShadows:!!(e.clip||e.clippingPlanes)});return e.map&&(n.map=e.map),n}var nh=new Map;function $x(i=128,e=1){let t=i+":"+e.toFixed(2);if(nh.has(t))return nh.get(t);let n=document.createElement("canvas");n.width=i,n.height=i;let s=document.createElement("canvas");s.width=i,s.height=i;let r=n.getContext("2d"),a=s.getContext("2d"),o=r.createImageData(i,i),l=a.createImageData(i,i);for(let u=0;u<i;u++){let f=Math.sin(u*1.15)*.55+Math.sin(u*2.7)*.28+Math.sin(u*5.1)*.12+Math.sin(u*11.3)*.06,g=.55+f*.38+Math.sin(u*.37)*.1;for(let y=0;y<i;y++){let m=Math.sin(y*.04+u*.015)*.08,p=f+m,w=Math.max(0,Math.min(255,Math.floor(128+p*55*e))),D=Math.max(0,Math.min(255,Math.floor(128+Math.sin(y*.55+u*.08)*6*e))),v=(u*i+y)*4;o.data[v]=w,o.data[v+1]=D,o.data[v+2]=255,o.data[v+3]=255;let E=Math.max(0,Math.min(255,Math.floor((g+m*.35)*255)));l.data[v]=E,l.data[v+1]=E,l.data[v+2]=E,l.data[v+3]=255}}r.putImageData(o,0,0),a.putImageData(l,0,0);let c=new wn(n);c.wrapS=c.wrapT=Wi,c.colorSpace=Cn,c.anisotropy=4;let h=new wn(s);h.wrapS=h.wrapT=Wi,h.colorSpace=Cn,h.anisotropy=4;let d={normalMap:c,roughnessMap:h};return nh.set(t,d),d}function J(i,e={}){if(e.phong)return We(i,{shininess:e.shininess??72,specular:e.specular??11184810,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??.04,opacity:e.opacity??1,side:e.side,map:e.map,clip:e.clip});let t=e.opacity??1;if(gd&&e.brush!=="force"){let a=new Oe(i).getHSL({}),o=!e._fromBrass&&a.s<.16&&a.l>.34&&e.emissive==null,l=new On({color:i,metalness:o?.12:Math.min(e.metalness??.82,e._fromBrass?.22:.42),roughness:Math.max(e.roughness??.28,.4),emissive:o?i:e.emissive??0,emissiveIntensity:o?.16:e.emissiveIntensity??.04,transparent:t<1,opacity:t,side:e.side??Tn,depthWrite:t>=.95,clippingPlanes:e.clip||e.clippingPlanes||[],clipShadows:!!(e.clip||e.clippingPlanes),envMapIntensity:o?.3:Math.min(e.envMapIntensity??.7,.5)});return e.map&&(l.map=e.map),(e.clip||e.clippingPlanes)&&e.section!==!1&&xd(l,i),e.streak==="force"&&ul(l,{axis:e.brushAxis??"x",...e.streakOpts||{}}),l}let n=e.clearcoat!=null?e.clearcoat:0,s=n>0?xr:On,r=new s({color:i,metalness:e.metalness??.82,roughness:e.roughness??.28,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??.04,transparent:t<1,opacity:t,side:e.side??Tn,depthWrite:t>=.95,clippingPlanes:e.clip||e.clippingPlanes||[],clipShadows:!!(e.clip||e.clippingPlanes),envMapIntensity:e.envMapIntensity??.7});if(n>0&&(r.clearcoat=n,r.clearcoatRoughness=e.clearcoatRoughness??.2),e.map&&(r.map=e.map),e.brush!==!1){let a=e.brushStrength??1.15,o=$x(e.brushSize??128,a),l=e.brushRepeatU??e.brushRepeat??2.5,c=e.brushRepeatV??(e.brushRepeat!=null?e.brushRepeat*2.2:7);r.normalMap=o.normalMap,r.normalScale=new Ue(e.normalScaleX??1.25,e.normalScaleY??.22),r.normalMap.repeat.set(l,c),e.roughnessMap!==!1&&(r.roughnessMap=o.roughnessMap,r.roughnessMap.repeat.set(l,c))}return e.streak&&!e._fromBrass&&ul(r,{axis:e.brushAxis??"x",...e.streakOpts||{}}),r}function di(i,e={}){let t=e.opacity??.18,n=new On({color:i,metalness:.05,roughness:e.roughness??.12,transparent:!0,opacity:t,side:e.side??Ut,depthWrite:!1,envMapIntensity:e.envMapIntensity??.35});return n.userData.isGlass=!0,n}function ul(i,e={}){let t=e.axis??"x",n={uStreakI:{value:e.intensity??.42},uStreakExp:{value:e.exp??90},uGrainF:{value:e.freq??70},uGrainAmt:{value:e.grain??.1}};i.userData.streak=n;let s={x:"vec3(1.0, 0.0, 0.0)",y:"vec3(0.0, 1.0, 0.0)",z:"vec3(0.0, 0.0, 1.0)",circ:"normalize(vec3(-position.z, 0.0, position.x) + vec3(1e-5))"}[t],r={x:"(vObjP.y * 0.8 + vObjP.z * 0.6)",y:"(vObjP.x * 0.8 + vObjP.z * 0.6)",z:"(vObjP.x * 0.6 + vObjP.y * 0.8)",circ:"vObjP.y"}[t],a=i.onBeforeCompile;i.onBeforeCompile=(h,d)=>{a&&a(h,d),Object.assign(h.uniforms,n),h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vBrushT;
varying vec3 vObjP;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vObjP = position;
vBrushT = normalize(mat3(modelViewMatrix) * ${s});`),h.fragmentShader=h.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vBrushT;
varying vec3 vObjP;
uniform float uStreakI, uStreakExp, uGrainF, uGrainAmt;
float bHash(float n) { return fract(sin(n * 12.9898) * 43758.5453); }`).replace("#include <opaque_fragment>",`{
  float gc = ${r} * uGrainF;
  float grain = 0.55 * bHash(floor(gc)) + 0.3 * bHash(floor(gc * 0.31) + 17.0) + 0.15 * bHash(floor(gc * 2.3) + 5.0);
  vec3 Nn = normalize(normal);
  vec3 T = vBrushT - Nn * dot(Nn, vBrushT);
  T = length(T) > 1e-4 ? normalize(T) : vec3(1.0, 0.0, 0.0);
  vec3 Vv = normalize(vViewPosition);
  vec3 streak = vec3(0.0);
  #if NUM_DIR_LIGHTS > 0
  for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
    vec3 L = directionalLights[i].direction;
    vec3 H = normalize(L + Vv);
    float th = dot(T, H);
    float s = pow(max(0.0, 1.0 - th * th), uStreakExp * 0.5);
    streak += directionalLights[i].color * s * smoothstep(0.0, 0.25, dot(Nn, L));
  }
  #endif
  vec3 warm = clamp(diffuseColor.rgb * vec3(1.25, 1.05, 0.72), 0.0, 1.0);
  outgoingLight *= (1.0 - uGrainAmt) + uGrainAmt * 2.0 * grain;
  outgoingLight += warm * streak * uStreakI * (0.45 + 0.9 * grain);
}
#include <opaque_fragment>`)};let o=i.clone.bind(i);i.clone=()=>ul(o(),e);let l="brushStreak:"+t,c=i.customProgramCacheKey?.bind(i);return i.customProgramCacheKey=()=>(c?c():"")+l,i}function qt(i=13936736,e={}){if(gd&&e.brush!=="force"){let n=e.cleanHex??Yx(i);return J(n,{clip:e.clip,side:e.side,opacity:e.opacity,map:e.map,metalness:.22,roughness:.44,envMapIntensity:.35,emissive:n,emissiveIntensity:Math.min(.07,(e.emissiveIntensity??.3)*.2),streak:e.streak==="force"?"force":!1,brushAxis:e.brushAxis,streakOpts:e.streakOpts,_fromBrass:!0})}let t=J(i,{metalness:e.metalness??.58,roughness:e.roughness??.2,emissive:e.emissive??10512416,emissiveIntensity:e.emissiveIntensity??.3,envMapIntensity:e.envMapIntensity??.55,clearcoat:e.clearcoat??.32,clearcoatRoughness:e.clearcoatRoughness??.28,brushStrength:e.brushStrength??2,brushSize:e.brushSize??128,normalScaleX:e.normalScaleX??1.55,normalScaleY:e.normalScaleY??.18,...e,_fromBrass:!0});return e.streak!==!1&&ul(t,{axis:e.brushAxis??"x",...e.streakOpts||{}}),t}function Kn(i,e={}){return We(i,{shininess:e.shininess??18,specular:e.specular??3355443,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,opacity:e.opacity??1,side:e.side,map:e.map})}function Qi(i=220,e={}){let t=i-3<<16|i<<8|Math.min(255,i+8);return Kn(t,{emissive:t,emissiveIntensity:e.lift??.42,envMapIntensity:.15,...e})}function fi(i=14474456,e={}){return Kn(i,{emissive:i,emissiveIntensity:e.lift??.32,...e})}function jt(i,e,t,n=.04,s=3){let r=Math.min(n,i*.45,e*.45,t*.45);return new hl(i,e,t,s,r)}function dl(i,e=28){if(i&&i.type==="RoundedBoxGeometry"&&i.parameters){let t=i.parameters;return new Ot(new we(t.width*.998,t.height*.998,t.depth*.998),e)}return new Ot(i,e)}function ke(i,e,t,n,s=.04,r=3){return new W(jt(i,e,t,s,r),n)}function fl(i,e,t,n,s,r=0){let a=new W(new we(e+.04,Math.min(.05,t*.25),n+.04),s);return a.position.y=r,i.add(a),a}function ot(i,e,t,n,s,r={}){let a=r.t??.045,o=r.railH??.07,l=r.overhang??.03,c=new W(new we(e+l*2,a,t+l*2),s);c.position.y=n,i.add(c);let h=n-o/2+a/2;for(let[d,u,f,g]of[[0,t/2+l/2,e+l*2,a],[0,-t/2-l/2,e+l*2,a],[e/2+l/2,0,a,t+l*2],[-e/2-l/2,0,a,t+l*2]]){let y=new W(new we(f,o,g),s);y.position.set(d,h,u),i.add(y)}return c}function Ws(i,e,t,n,s,r={}){let a=new W(new Nt(e,t??.035,r.radial??8,r.tubular??48),s);return a.rotation.x=Math.PI/2,a.position.y=n,(r.scaleX||r.scaleZ)&&a.scale.set(r.scaleX??1,1,r.scaleZ??1),i.add(a),a}function bt(i,e={}){let t=e.dur??1.15,n=l=>l*l*(3-2*l),s=i.map((l,c)=>{let h=l.obj,d=l.delay??c/Math.max(1,i.length-1)*.45,u=h.position.y;h.userData._revPending=!0;let f=l.fromY??u-(l.drop??.35);return h.position.y=f,h.scale.setScalar(l.fromScale??.55),h.traverse(g=>{g.isMesh&&g.material&&(g.userData._revMat||(g.material=g.material.clone(),g.userData._revMat=!0),g.material.transparent=!0,g.userData._revOp=g.material.opacity??1,g.material.opacity=0)}),{obj:h,delay:d,baseY:u,fromY:f,fromScale:l.fromScale??.55}}),r=0,a=!1,o=!1;return{get done(){return o},arm(){o||(a=!0,r=0)},tick(l){if(!a||o)return!o&&a;r+=l;let c=!0;for(let h of s){let d=Math.max(0,Math.min(1,(r-h.delay)/t)),u=n(d);h.obj.position.y=h.fromY+(h.baseY-h.fromY)*u;let f=h.fromScale+(1-h.fromScale)*u;h.obj.scale.setScalar(f),h.obj.traverse(g=>{g.isMesh&&g.material&&g.userData._revOp!=null&&(g.material.opacity=g.userData._revOp*u,u>=.99&&g.userData._revOp>=.95&&(g.material.transparent=g.userData._revOp<1,g.material.opacity=g.userData._revOp))}),d<1&&(c=!1)}if(c){o=!0,a=!1;for(let h of s)delete h.obj.userData._revPending}return!0}}}var es=(i,e)=>.12*(i-1.2)**2+1.5*(e-.35*Math.sin(1.7*i))**2,pl=(i,e)=>{let t=e-.35*Math.sin(1.7*i);return[.24*(i-1.2)+3*t*(-.595*Math.cos(1.7*i)),3*t]},Vr={x:1.2,y:.35*Math.sin(2.04)},yd={X0:-3,X1:3,Y0:-1.6,Y1:1.6};var{X0:jn,X1:pi,Y0:mi,Y1:Qn}=yd,Zx=.62,_d=(i,e)=>Zx*Math.log(1+es(i,e)),Wr=(i,e,t)=>Math.max(e,Math.min(t,i)),ih=i=>[1,3,5].map(e=>parseInt(i.slice(e,e+2),16));function vd(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var Md=i=>Math.sqrt(-2*Math.log(i()||1e-9))*Math.cos(2*Math.PI*i());function Jx(){let t=document.createElement("canvas");t.width=900,t.height=480;let n=t.getContext("2d"),s=n.createImageData(900,480),r=ih("#f3eefc"),a=ih("#4f3080"),o=ih("#3a2560"),l=new Int16Array(900*480),c=new Float32Array(900*480);for(let d=0;d<480;d++)for(let u=0;u<900;u++){let f=jn+(u+.5)/900*(pi-jn),g=Qn-(d+.5)/480*(Qn-mi),y=Math.log(1+es(f,g));c[d*900+u]=y,l[d*900+u]=Math.floor(y*5)}for(let d=0;d<480;d++)for(let u=0;u<900;u++){let f=d*900+u,g=l[f],y=Wr(g/5/2.4,0,1),m=u+1<900&&l[f+1]!==g||d+1<480&&l[f+900]!==g,p=r.map((D,v)=>D+(a[v]-D)*y),w=m?.45:0;s.data.set([p[0]+(o[0]-p[0])*w,p[1]+(o[1]-p[1])*w,p[2]+(o[2]-p[2])*w,255],f*4)}n.putImageData(s,0,0);let h=new wn(t);return h.colorSpace=Vt,h.anisotropy=4,h}function bd(i,e){let t=e.ui,n=t.C,s=e.mode==="pair",r=ee=>ee<560,a=.06,o=.9,l=.01,c=10,h=500,d=ee=>{es(ee.p.x,ee.p.y)<l?ee.hold++||(ee.since=ee.n):ee.hold=0,ee.hold>=c?ee.done=ee.since:ee.n>=h&&(ee.done=-1)},u=.25,f=s?{x:-2.5,y:1.25}:{x:-2.4,y:1.2},g=0,y=vd(2),m=0,p=!0,w=[],D=()=>{y=vd(2),w=(s?[0,1]:[0]).map(ee=>({k:ee,p:{...f},v:{x:0,y:0},trail:[{...f}],n:0,done:0,hold:0,since:0})),_=!0},v=ee=>{let ve=pl(ee.x,ee.y);return g?[ve[0]+g*Md(y)*.6,ve[1]+g*Md(y)*.6]:ve};function E(){for(let ee of w){if(ee.done)continue;let ve=v(ee.p);s?ee.k===0?(ee.p={x:ee.p.x-a*ve[0],y:ee.p.y-a*ve[1]},ee.n++,d(ee)):(ee.v={x:o*ee.v.x-a*ve[0],y:o*ee.v.y-a*ve[1]},ee.p={x:ee.p.x+ee.v.x,y:ee.p.y+ee.v.y},ee.n++,d(ee)):(ee.p={x:ee.p.x-u*ve[0],y:ee.p.y-u*ve[1]},ee.n++,(Math.hypot(...pl(ee.p.x,ee.p.y))<.004||ee.n>600||!isFinite(ee.p.x)||Math.abs(ee.p.y)>50)&&(ee.done=ee.n)),ee.trail.push(ee.p),ee.trail.length>600&&ee.trail.shift()}_=!0}let b=()=>w.some(ee=>!ee.done),I=()=>{let ee=0;for(;b()&&ee++<2e3;)E()},_=!0,S=null,N=vt(i,{ui:t,label:s?"Two balls rolling down the same three-dimensional error valley: plain steps and steps with momentum. Drag sideways to turn it; tap to drop the balls somewhere else.":"A three-dimensional error landscape for two knobs; a ball rolls downhill by gradient descent. Drag sideways to turn it; tap to drop the ball somewhere else.",height:ee=>r(ee)?Math.round(Math.max(280,ee*.78)):Math.round(Math.min(440,ee*.5)),radius:3.6,radiusY:2.7,yaw:-.42,pitch:.8,target:new R(0,.25,.1),busy:()=>S&&!S.done||p===!1&&b(),step(ee){return S&&!S.done?(S.tick(ee),!0):p||!b()?!1:(m+=ee,m<(s?.04:.11)?!0:(m=0,E(),s&&E(),_e(),b()))},onShow(){S?.arm(),p&&(p=!1,t.isPlaying()||I(),_e(),N&&N.kick())},pickable:()=>Y,onTap(ee){f={x:Wr(ee.x,jn,pi),y:Wr(-ee.z,mi,Qn)},D(),p=!1,t.isPlaying()||I(),_e(),je()},onKey(){D(),p=!1,t.isPlaying()||I(),_e()},onTurn(){je()}});if(!N)return!1;let{scene:B}=N;Mt(B,{hemi:.85,keyI:1.2,fillI:.35,rimI:.4,envI:.5,sky:16775423,ground:10129584});let O=new be;B.add(O);let F=150,A=80,U=new Bn(pi-jn,Qn-mi,F,A);U.rotateX(-Math.PI/2);let k=U.attributes.position;for(let ee=0;ee<k.count;ee++){let ve=k.getX(ee),Qe=-k.getZ(ee);k.setY(ee,_d(ve,Qe))}U.computeVertexNormals();let Y=new W(U,We(16777215,{map:Jx(),side:Ut,shininess:22,specular:5592439}));O.add(Y);let z=-.05,P=Kn(14275558,{side:Ut}),H=ee=>{let ve=new wt,Qe=[];for(let nt=0;nt<ee.length-1;nt++){let[Xe,j]=[ee[nt],ee[nt+1]];Qe.push(Xe.x,Xe.y,Xe.z,j.x,j.y,j.z,j.x,z,j.z,Xe.x,Xe.y,Xe.z,j.x,z,j.z,Xe.x,z,Xe.z)}ve.setAttribute("position",new at(Qe,3)),ve.computeVertexNormals(),O.add(new W(ve,P))},L=(ee,ve,Qe=0)=>new R(ee,_d(ee,ve)+Qe,-ve);for(let ee of[[jn,pi,mi,mi],[jn,pi,Qn,Qn],[jn,jn,mi,Qn],[pi,pi,mi,Qn]]){let ve=[];for(let Qe=0;Qe<=120;Qe++){let nt=Qe/120;ve.push(L(ee[0]+(ee[1]-ee[0])*nt,ee[2]+(ee[3]-ee[2])*nt))}H(ve)}let $=new W(new Nt(.11,.022,8,32),new sn({color:16777215}));$.rotation.x=-Math.PI/2,$.position.copy(L(Vr.x,Vr.y,.02)),O.add($),N.label("lowest point",()=>L(Vr.x,Vr.y,0),"l3d-ink",!0);let te=s?[16777215,new Oe(n.on).getHex()]:[new Oe(n.on).getHex()],ce=.12,pe=te.map(ee=>{let ve=new W(new Ze(ce,32,16),J(ee,{emissive:ee,emissiveIntensity:.14,roughness:.28,metalness:.55,clearcoat:.4,brush:!1}));return B.add(ve),ve}),se=te.map(()=>{let ee=new W(new Ze(ce*1.16,32,16),new sn({color:new Oe(n.ink),side:Ht}));return B.add(ee),ee}),X=te.map(ee=>new sn({color:ee})),Z=te.map(()=>null),me=ee=>isFinite(ee.x)&&ee.x>=jn&&ee.x<=pi&&ee.y>=mi&&ee.y<=Qn,de=s?null:new wr(new R(1,0,0),new R,.6,16777215,.18,.11);de&&B.add(de),S=bt([{obj:O,delay:0,drop:.35,fromScale:.92}],{dur:.85}),s&&(N.label("plain steps",()=>me(w[0].p)?L(w[0].p.x,w[0].p.y,ce*5.5):null,"l3d-white"),N.label("with momentum",()=>me(w[1].p)?L(w[1].p.x,w[1].p.y,ce*5.5):null,"l3d-yellow"));function _e(){if(w.forEach((ee,ve)=>{let Qe=me(ee.p);if(pe[ve].visible=se[ve].visible=Qe,Qe){let nt=L(ee.p.x,ee.p.y,ce*.9);pe[ve].position.copy(nt),se[ve].position.copy(nt)}if(_){Z[ve]&&(B.remove(Z[ve]),Z[ve].geometry.dispose(),Z[ve]=null);let nt=ee.trail.filter(me).map(Xe=>L(Xe.x,Xe.y,.035));if(nt.length>1){let Xe=new gr;for(let j=0;j<nt.length-1;j++)Xe.add(new Is(nt[j],nt[j+1]));Z[ve]=new W(new $i(Xe,Math.min(1200,(nt.length-1)*2),.022,5,!1),X[ve]),B.add(Z[ve])}}}),_=!1,de){let ee=w[0],ve=pl(ee.p.x,ee.p.y),Qe=Math.hypot(...ve);if(de.visible=me(ee.p)&&isFinite(Qe)&&Qe>.01,de.visible){let nt=L(ee.p.x,ee.p.y,ce*.9),Xe=.32,j=L(Wr(ee.p.x-ve[0]/Qe*Xe,jn,pi),Wr(ee.p.y-ve[1]/Qe*Xe,mi,Qn),ce*.9),C=j.sub(nt).normalize();de.position.copy(nt.addScaledVector(C,ce*1.05)),de.setDirection(C)}}Ke(),N.invalidate()}let $e=t.controls(i);s?t.slider($e,{label:"Noise in each step (smaller batches)",name:"noise",min:0,max:1,step:.05,value:g,color:n.learn,fmt:ee=>ee===0?"none":ee.toFixed(2),oninput:ee=>{g=ee,D(),p=!1,t.isPlaying()||I(),_e()}}):t.slider($e,{label:"Step size",name:"lr",min:.02,max:.75,step:.01,value:u,color:n.learn,fmt:ee=>ee.toFixed(2),oninput:ee=>{u=ee,D(),p=!1,t.isPlaying()||I(),_e()}}),t.button($e,"Roll again",()=>{D(),p=!1,t.isPlaying()||I(),_e()},{name:s?"sgd-again":"lv-again"});let dt=t.readout(i);function Ke(){if(s){let nt=Xe=>Xe.done>0?`on the floor in <b>${Xe.done}</b> steps`:Xe.done<0?`still not settled after ${h} steps (error ${es(Xe.p.x,Xe.p.y).toFixed(3)})`:`error ${es(Xe.p.x,Xe.p.y).toFixed(2)} after ${Xe.n} steps`;dt.innerHTML=`To the floor (error below ${l} and staying there): <span class="c-grey">plain steps</span> ${nt(w[0])}; <span class="c-yellow">with momentum</span> ${nt(w[1])}.`;return}let ee=w[0],ve=es(ee.p.x,ee.p.y),Qe=!isFinite(ve)||ve>50||!me(ee.p);dt.innerHTML=Qe?"The steps are so big the ball <b>flies out of the valley</b>: each step overshoots further than the last.":`Error <b>${ve.toFixed(3)}</b> after <b>${ee.n}</b> steps; the white arrow is the steepest way down.`}let tt=t.hint(i,s?"drag sideways to turn the valley, and tap it to drop both balls somewhere else. Then add noise: each step sees only part of the data, so the slope it measures wobbles.":"drag sideways to turn the landscape, and tap it to drop the ball somewhere else. Then push the step size up until the ball zigzags across the valley.");function je(){tt&&tt.classList&&tt.classList.add("done")}return D(),t.isPlaying()||(p=!1,I()),_e(),!0}var Xs=(i,e,t)=>Math.max(e,Math.min(t,i)),Ed=.02585,Sd=1.2,FM=Sd*Ed*Math.LN10,ts=.7,ei=(i,e)=>Math.log1p(Math.exp((i-e)/(2*Sd*Ed)))**2,sh={si:11578532,siMid:10262672,siDark:8420468,source:9089240,drain:6985928,oxide:10135728,gate:6980760,channel:5165e3,fin:12631220,wire:13949148,contact:13936736,spacer:13683908,ild:12106948,cut:15769696};function Kx(i,e={}){return We(i,{opacity:e.opacity??1,side:e.side,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,clip:e.clip,shininess:e.shininess??34,specular:e.specular??6710886})}function qs(i,e,t,n,s=12){let r=new be,a=Math.max(.01,i-e);r.add(new W(new we(a,e,t),n));let o=e/2,l=new W(new Le(o,o,t,s),n);l.rotation.x=Math.PI/2,l.position.x=-i/2+o,r.add(l);let c=l.clone();return c.position.x=i/2-o,r.add(c),r}function jx(i,e,t,n){let s=new be,r=t/2,a=Math.max(.01,e-t);s.add(new W(new we(i-t,a,t),n));let o=new W(new Le(r,r,i-t,16),n);o.rotation.z=Math.PI/2,o.position.y=a/2,s.add(o);let l=o.clone();l.position.y=-a/2,s.add(l);for(let c of[-1,1]){let h=new W(new Ze(r,14,12),n);h.scale.set(1,e/t,1),h.position.set(c*(i/2-r),0,0),s.add(h)}return s}function rh(i,e,t,n,s,r,a){let o=new be,l=new W(new Le(.065,.07,s,16),r);l.position.y=s/2,o.add(l);let c=new W(new Le(.13,.13,.045,18),a);return c.position.y=s+.02,o.add(c),o.position.set(e,t,n),i.add(o),o}function wd(i,e){let t=e.ui,n=t.C,s=M=>M<560,r=1.15,a=M=>.25+.55*(Math.min(M,1.15)/2),o=a(1.15),l=.55,c=.35,h=[],d=null,u=new xn(new R(-1,0,0),0),f=vt(i,{ui:t,label:"A MOSFET cut open in three dimensions. Drag sideways to turn it; Peek morphs planar \u2192 FinFET \u2192 GAA; Gate opens the channel.",height:M=>M<560?400:440,radius:1.08,radiusY:.86,yaw:.6,pitch:.26,target:new R(0,.5,0),localClipping:!0,fitPadY:1.22,fitPadX:1.1,fov:34,busy:()=>d&&!d.done||h.length>0&&l>c*.6,onShow(){d?.arm(),f&&f.invalidate()},step(M){try{d&&!d.done&&d.tick(M);let x=ei(l,c)/ei(ts,c),V=x*55*M;for(let G=0;G<V;G++)h.length<100&&h.push({t:Math.random()*.12,lane:Math.random()});for(let G of h)G.t+=M*(.55+x*.95);for(let G=h.length-1;G>=0;G--)h[G].t>1&&h.splice(G,1);return Xe(),h.length>0}catch{return!1}}});if(!f)return!1;let{scene:g}=f;Mt(g,{hemi:.4,keyI:1.55,fillI:.22,rimI:.62,sky:16769216,ground:3813408,keyPos:[5,6,4],fillPos:[-4,2,-2],envI:.25,glintI:.18,glintPos:[8,7,1.5]});let y=new be;g.add(y);let m=[u],p=qt(12623984,{clip:m,metalness:.55,emissiveIntensity:.26,envMapIntensity:.28,brushStrength:1.9,clearcoat:.14,clearcoatRoughness:.32}),w=qt(11569232,{clip:m,metalness:.55,emissiveIntensity:.24,envMapIntensity:.28,brushStrength:1.6,clearcoat:.12,clearcoatRoughness:.32}),D=J(13157564,{clip:m,roughness:.42,metalness:.3,envMapIntensity:.35}),v=J(5935060,{clip:m,roughness:.35,metalness:.4,emissive:2777e3,emissiveIntensity:.3,envMapIntensity:.3}),E=J(5935060,{clip:m,roughness:.35,metalness:.4,emissive:2777e3,emissiveIntensity:.3,envMapIntensity:.3}),b=J(sh.oxide,{clip:m,roughness:.42,metalness:.15,opacity:.38,brush:!1,envMapIntensity:.18}),I=qt(15319375,{clip:m,metalness:.55,emissive:11569184,emissiveIntensity:.34,clearcoat:.2,clearcoatRoughness:.28,brushStrength:1.6,envMapIntensity:.3}),_=Kx(sh.channel,{clip:m,emissive:sh.channel,emissiveIntensity:.4,opacity:.9}),S=qt(12623984,{clip:m,metalness:.52,emissiveIntensity:.26,brushStrength:1.3,envMapIntensity:.28,clearcoat:.15}),N=qt(13676656,{clip:m,metalness:.58,emissiveIntensity:.28,clearcoat:.22,clearcoatRoughness:.25,brushStrength:1.4,envMapIntensity:.3}),B=qt(13146184,{clip:m,emissiveIntensity:.26,brushStrength:1.8,clearcoat:.14,clearcoatRoughness:.3,envMapIntensity:.28}),O=J(11573360,{clip:m,roughness:.35,metalness:.5,brushStrength:.7,emissive:5259304,emissiveIntensity:.08,envMapIntensity:.3}),F=J(9472112,{clip:m,roughness:.45,metalness:.25,opacity:.38,brush:!1,envMapIntensity:.18}),A=ke(3.2,.42,2,p,.07);A.position.y=-.02,y.add(A),ot(y,3.15,1.95,.18,qt(13148256,{clip:m,emissiveIntensity:.3,clearcoat:.18,clearcoatRoughness:.28,envMapIntensity:.3}),{t:.032,railH:.04,overhang:.025});{let M=ke(3.15,.09,1.95,w,.04);M.position.set(0,.22,0),y.add(M)}{let M=ke(3.22,.07,2.02,D,.035);M.position.set(0,-.26,0),y.add(M)}for(let M=0;M<11;M++){let x=-.9+M*.18,V=new W(new we(2.95,.028,.045),B);V.position.set(0,.245,x),y.add(V)}for(let M=0;M<7;M++){let x=-1.35+M*.45,V=new W(new we(.04,.03,1.75),qt(12093512,{clip:m,emissiveIntensity:.2,brushStrength:1,envMapIntensity:.35}));V.position.set(x,.248,0),y.add(V)}for(let M of[-.85,.85]){let x=ke(2.8,.06,.12,D,.02);x.position.set(0,.2,M),y.add(x)}let U=qs(.95,.28,1.3,v,16);U.position.set(-.95,.3,0),y.add(U);let k=qs(.95,.28,1.3,E,16);k.position.set(.95,.3,0),y.add(k);{let M=qs(.78,.06,1.1,B,12);M.position.set(-.95,.46,0),y.add(M)}{let M=qs(.78,.06,1.1,B,12);M.position.set(.95,.46,0),y.add(M)}for(let M of[-.95,.95])for(let x of[-.35,0,.35]){let V=new W(new we(.55,.035,.12),B);V.position.set(M,.5,x),y.add(V)}let Y=new W(new we(1.4,.04,1.3),F);Y.position.y=.46,y.add(Y);let z=new W(new we(1.05,.045,1.15),b);z.position.set(0,.44,0),y.add(z);let P=qs(.98,.13,1.1,I,12);P.position.set(0,.54,0),y.add(P);for(let M of[-1,1]){let x=new W(new we(.08,.16,1.05),O);x.position.set(M*.55,.52,0),y.add(x)}let H=new be;y.add(H);let L=jx(1.2,.55,.18,S);L.position.set(0,.58,0),H.add(L);let $=new W(new we(1.1,.48,.035),b);$.position.set(0,.58,.12),H.add($);let te=$.clone();te.position.z=-.12,H.add(te);let ce=new W(new Le(.125,.125,1.1,16,1,!1,0,Math.PI));ce.material=b,ce.rotation.z=Math.PI/2,ce.position.set(0,.84,0),H.add(ce);let pe=new W(new we(.95,.48,.08),I);pe.position.set(0,.58,.165),H.add(pe);let se=pe.clone();se.position.z=-.165,H.add(se);let X=new W(new Le(.18,.18,.95,20,1,!1,0,Math.PI));X.material=I,X.rotation.z=Math.PI/2,X.position.set(0,.9,0),H.add(X);for(let M of[-1,1]){let x=new W(new we(.1,.5,.38),O);x.position.set(M*.55,.6,0),H.add(x)}let Z=new be;y.add(Z);let me=[];for(let M=0;M<3;M++){let x=.42+M*.28,V=new be;V.add(new W(new we(1.15,.07,.26),S));for(let he of[-1,1]){let ge=new W(new Ze(.07,12,10),S);ge.scale.set(1,1,1.85),ge.position.set(he*.575,0,0),V.add(ge)}V.position.y=x,Z.add(V);let G=new W(new we(.72,.13,.34),b);G.position.set(0,x,0),Z.add(G);let Q=qs(.7,.16,.4,I,10);Q.position.set(0,x,0),Z.add(Q),me.push(Q)}for(let M of[-1,1]){let x=new W(new we(.12,.85,.2),S);x.position.set(M*.7,.7,0),Z.add(x)}let de=new W(new qi(.055,.85,6,14),_);de.rotation.z=Math.PI/2,de.position.set(0,.34,0),y.add(de);let _e=rh(y,-.95,.42,.45,.28,N,B),$e=rh(y,.95,.42,.45,.28,N,B),dt=rh(y,0,.55,-.55,.32,N,B),Ke=new Ze(.028,10,10),tt=We(3836128,{emissive:3836128,emissiveIntensity:.55}),je=[];for(let M=0;M<100;M++){let x=new W(Ke,tt);x.visible=!1,y.add(x),je.push(x)}let ee=new Pt({color:3815476,transparent:!0,opacity:.12,clippingPlanes:m});for(let M of[A,U,k])if(M?.geometry)try{M.add(new Lt(new Ot(M.geometry,24),ee.clone()))}catch{}let ve=new cn;f.label('<span class="c-yellow">gate</span>',()=>{let M=r<.45?P:r<1.45?X:me[2];M.updateWorldMatrix(!0,!0),ve.setFromObject(M);let x=Math.min(ve.max.x,u.constant);return new R((ve.min.x+x)/2,ve.max.y,(ve.min.z+ve.max.z)/2)},"");function Qe(){let M=Xs(1-r,0,1),x=Xs(1-Math.abs(r-1),0,1),V=Xs(r-1,0,1);z.visible=P.visible=M>.08,z.scale.set(1,.5+.5*M,1),P.scale.setScalar(.7+.3*M),P.traverse(Q=>{Q.isMesh&&Q.material&&Q.material.emissiveIntensity!=null&&(Q.material.emissiveIntensity=.05+.14*(l/ts)*M)}),H.visible=x>.06,H.scale.set(1,.55+.45*x,.75+.25*x),Z.visible=V>.06,Z.scale.set(1,.6+.4*V,1);let G=Xs(ei(l,c)/ei(ts,c),0,1);de.position.y=.32+.16*x+.26*V,de.scale.set(1,.7+.5*x,.8+.4*x),de.material.opacity=.12+.82*G,de.material.emissiveIntensity=.12+.75*G,de.visible=G>.02,dt.position.y=r>1.3?.55:r>.6?.45:.38,Y.material.opacity=.25+.35*(1-Math.max(x,V))}function nt(){let M=1.5-o*3;u.constant=M}function Xe(){let M=ei(l,c)/ei(ts,c),x=de.position.y,V=.08+.07*Xs(r,0,1);for(let G=0;G<je.length;G++){let Q=je[G],he=h[G];if(!he||M<.05){Q.visible=!1;continue}Q.visible=!0,Q.position.set(-.5+he.t*1,x+(r>1.2?(G%3-1)*.22*Xs(r-1,0,1):0),(he.lane-.5)*V*2)}f.invalidate()}function j(){Qe(),nt(),Xe();let M=ei(l,c)/ei(ts,c),x=ei(ts,c)/Math.max(1e-12,ei(0,c)),V=r<.45?"planar":r<1.45?"FinFET":"GAA",G=Math.floor(Math.log10(Math.max(M,1e-12))),Q=M>=.01?`${Math.round(M*100)}%`:`${(M/10**G).toFixed(1)}\xD710<sup>${G}</sup>`;fe.innerHTML=`<b class="c-blue">${V}</b> \xB7 gate <b>${l.toFixed(2)} V</b> \u2192 channel <b class="c-cyan">${Q}</b> \xB7 on/off \u2248 <b>${x>=1e6?(x/1e6).toPrecision(2)+"M":Math.round(x).toLocaleString("en-GB")}\xD7</b>.`,f.invalidate()}let C=t.controls(i);t.slider(C,{label:"Peek",name:"gen",min:0,max:2,step:.01,value:r,color:n.compute,fmt:M=>M<.45?"planar":M<1.45?"FinFET":"GAA",oninput:M=>{r=M,o=a(M),j()}}),t.slider(C,{label:"Gate",name:"vg",min:0,max:ts,step:.01,value:l,color:n.cyan,fmt:M=>`${M.toFixed(2)} V`,oninput:M=>{l=M,j()}});let fe=t.readout(i);t.hint(i,'<span class="c-blue">gate</span> fills <span class="c-cyan">channel</span> \xB7 <span class="c-blue">source</span>\u2190 \u2192<span class="c-blue">drain</span> \xB7 Peek: planar \u2192 FinFET \u2192 GAA'),j();let ye=bt([{obj:A,delay:0,drop:.15},{obj:U,delay:.1,drop:.18},{obj:k,delay:.15,drop:.18},{obj:P,delay:.25,drop:.2},{obj:H,delay:.35,drop:.22},{obj:Z,delay:.45,drop:.22}],{dur:.95});return d=ye,ye.arm(),f.view.dist<3.4&&(f.view.dist=3.4),f.ready(),!0}var vn={usdPerEur:1,h100:{tdpW:700,bf16:9894e11,name:"H100 SXM"},dgxH100:{maxW:10200,gpus:8},pue:{best:1.09,avg:1.56},mfu:{lo:.38,hi:.43},eniac:{addPerS:5e3,W:15e4,tubes:17468},dcTWh2024:415,dcTWh2030:945,usDcTWh:{2014:58,2018:76,2023:176,lo2028:325,hi2028:580},irelandDc:{twh2024:6.969,share2024:.22,share2015:.05},colossus:{gpus:1e5,MW:150},ember:{world2025:31734,world2024:30913,us2024:4405,china2024:10070,europe2024:5094,japan2024:1016,ireland2024:36.1},ieaRegions:{us:[186.75,426.75],china:[103.75,278.75],europe:[62.25,107.25],japan:[18.75,33.75]},iea2035:{base:1200,liftOff:1700,highEff:970,headwinds:700},gb200RackKW:120,h100DieMM2:814,dgxH100USD:269e3,chipLifeYears:4,llama3GPUs:16384,nerc2024MW:1500};function ah(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new wt,c=0;for(let h=0;h<i.length;++h){let d=i[h],u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,d=[];for(let u=0;u<i.length;++u){let f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(let h in r){let d=Td(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let y=0;y<a[h].length;++y)f.push(a[h][y][u]);let g=Td(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function Td(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new on(a,t,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let d=l/t;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<t;g++){let y=h.getComponent(u,g);o.setComponent(u+d,g,y)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}var gi=(i,e,t)=>Math.max(e,Math.min(t,i)),Mn=(i,e,t)=>i+(e-i)*t,Qx=i=>i*i*(3-2*i),Bi=[{key:"die",name:"one GPU die",W:vn.h100.tdpW,note:`H100 SXM \xB7 ${vn.h100.tdpW} W TDP \xB7 ${vn.h100DieMM2} mm\xB2 die`},{key:"board",name:"one server",W:vn.dgxH100.maxW,note:`DGX H100 \xB7 ${vn.dgxH100.maxW/1e3} kW max \xB7 ${vn.dgxH100.gpus} GPUs`},{key:"rack",name:"one rack",W:4*vn.dgxH100.maxW,note:"four DGX-class servers in one cabinet (packing assumed)"},{key:"hall",name:"the GPU hall",W:vn.colossus.gpus/8*vn.dgxH100.maxW,note:`${vn.colossus.gpus.toLocaleString("en-GB")} GPUs \xB7 servers only`},{key:"building",name:"the building",W:vn.colossus.MW*1e6,note:`Colossus \xB7 utility ${vn.colossus.MW} MW for everything inside`}];function Dt(i,e={}){return We(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function De(i,e,t,n,s=0,r=0,a=0){let o=new W(new we(i,e,t),n);return o.position.set(s,r,a),o}function gt(i,e,t,n,s=0,r=0,a=0,o=.04){let l=ke(i,e,t,n,o);return l.position.set(s,r,a),l}function ey(i,{minDim:e=.1,color:t=1844270,opacity:n=.5}={}){i.updateMatrixWorld(!0);let s=new mt().copy(i.matrixWorld).invert(),r=[],a=new R,o=new mt,l=[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]];i.traverse(d=>{if(!d.isMesh||!d.geometry||d.isInstancedMesh)return;let u=d.geometry;u.boundingBox||u.computeBoundingBox();let f=u.boundingBox,g=new R;if(f.getSize(g),Math.max(g.x,g.y,g.z)<e)return;o.multiplyMatrices(s,d.matrixWorld);let y=[];for(let m=0;m<8;m++)a.set(m&1?f.max.x:f.min.x,m&2?f.max.y:f.min.y,m&4?f.max.z:f.min.z).applyMatrix4(o),y.push(a.clone());for(let[m,p]of l)r.push(y[m].x,y[m].y,y[m].z,y[p].x,y[p].y,y[p].z)});let c=new wt;c.setAttribute("position",new at(r,3));let h=new Lt(c,new Pt({color:t,transparent:!0,opacity:n}));return h.userData.ink=n,i.add(h),h}function oh(i,e,t,n=.04,s=14){let r=i.clone().add(e).multiplyScalar(.5);r.y-=t;let a=new Yi(i,r,e);return new $i(a,s,n,6,!1)}function Xr(i,e,t,n,s,r){let a=new hi(new we(t,n,s),r,e.length),o=new mt;return e.forEach((l,c)=>{o.makeTranslation(l[0],l[1],l[2]),a.setMatrixAt(c,o)}),a.instanceMatrix.needsUpdate=!0,i.add(a),a}var Ad=i=>i>=1e6?`${+(i/1e6).toPrecision(3)} MW`:i>=1e3?`${+(i/1e3).toPrecision(3)} kW`:`${Math.round(i)} W`;function Rd(i,e){let t=e.ui,n=t.C,s=j=>j<560,r=1,a=null,o=0,l=null,c=[{dist:3.6,y:.28,pitch:.62,yaw:-.55},{dist:11.5,y:1.05,pitch:.48,yaw:-.72},{dist:30,y:4.4,pitch:.24,yaw:-.82},{dist:132,y:-3,pitch:.5,yaw:-.95},{dist:195,y:20,pitch:.26,yaw:.88}],h=vt(i,{ui:t,label:"A continuous three-dimensional zoom from one GPU die out through the server, rack and hall to the whole building. Drag sideways to turn; use the zoom control to pull out.",height:j=>s(j)?Math.round(Math.max(320,j*.95)):Math.round(Math.min(460,j*.55)),radius:4,radiusY:2.5,yaw:c[1].yaw,pitch:c[1].pitch,target:new R(0,c[1].y,0),autoFit:!1,contactShadow:!1,fov:34,busy:()=>a!=null||!!(l&&!l.done),onShow(){l?.arm(),ee(!0),ve(),h&&h.invalidate()},step(j){if(o+=j,l&&!l.done)return l.tick(j),!0;if(a!=null){let C=a-r;return Math.abs(C)<.004?(r=a,a=null):r+=C*Math.min(1,j*5.5),ee(!0),ve(),Qe(!1),!0}if(w){if(w.material.emissiveIntensity=.28+.14*Math.sin(o*2.2),b.visible){for(let C of N){let fe=(C.ph+o*.45)%1;C.m.position.x=C.dir*(-2.75+fe*5.5)}B.emissiveIntensity=.16+.12*(.5+.5*Math.sin(o*2.6))}return h.invalidate(),!0}return!1}});if(!h)return!1;let{scene:d,view:u,target:f}=h;u.dist=c[1].dist,Mt(d,{hemi:.95,keyI:1.35,fillI:.38,rimI:.42,keyPos:[-5,12,7],fillPos:[7,3,-5],envI:.8,glintI:.4});let g=new W(new pr(140,64),Dt(15001824));g.rotation.x=-Math.PI/2,g.position.y=-.04,d.add(g);let y=new be;d.add(y);let m=new be;y.add(m);let p=Dt(14711354,{emissive:14711354,emissiveIntensity:.32}),w=De(1.05,.14,1.05,p,0,.1,0);m.add(w);let D=Dt(15769696,{emissive:16777215,emissiveIntensity:.06});for(let j=0;j<5;j++)for(let C=0;C<5;C++)m.add(De(.15,.035,.15,D,-.4+C*.2,.19,-.4+j*.2));let v=Dt(4168260,{emissive:4168260,emissiveIntensity:.1}),E=Dt(13686992);for(let j of[-1,1])for(let C=0;C<8;C++){let fe=C%2?3115602:4168260;m.add(De(.28,.055,.7,Dt(fe,{emissive:2783796,emissiveIntensity:.08}),j*.78,.06+C*.07,0)),C<7&&m.add(De(.26,.012,.65,E,j*.78,.09+C*.07,0))}m.add(gt(2,.07,1.5,J(13685980,{roughness:.42,metalness:.45}),0,.01,0,.04)),m.add(gt(1.95,.03,1.45,J(12106948,{roughness:.35}),0,.05,0,.03)),ot(m,1.95,1.45,.08,J(11055288),{t:.025,railH:.04,overhang:.02}),ot(m,1.05,1.05,.2,J(15769696),{t:.02,railH:.03,overhang:.015});for(let j=0;j<24;j++){let C=j/24*Math.PI*2,fe=.92;m.add(De(.04,.035,.04,Dt(12886112),Math.cos(C)*fe,-.01,Math.sin(C)*fe*.7))}for(let j=-3;j<=3;j++)for(let C=-2;C<=2;C++)Math.abs(j)+Math.abs(C)<2||m.add(De(.035,.025,.035,Dt(12095568),j*.18,-.015,C*.18));let b=new be;y.add(b),b.position.set(0,-.08,0);let I=Dt(14474456),_=gt(6.4,.1,3.6,fi(14474456),0,0,0,.04);b.add(_),b.add(De(6.8,.55,4,Dt(12108496),0,-.28,0)),b.add(De(6,.04,.1,Dt(9080984),0,.08,1.5)),b.add(De(6,.04,.1,Dt(9080984),0,.08,-1.5)),ot(b,6.4,3.6,.08,J(11842736),{t:.035,railH:.05,overhang:.03});for(let j=-4;j<=4;j++)b.add(De(5.8,.015,.035,Dt(4880984,{opacity:.75}),0,.06,j*.32));let S=Dt(16765802,{emissive:16756778,emissiveIntensity:.95}),N=[];for(let j=-4;j<=4;j++)for(let C=0;C<2;C++){let fe=De(.5,.03,.085,S,0,.118,j*.32);b.add(fe),N.push({m:fe,ph:((j+4)*.37+C*.5)%1,dir:j%2?1:-1})}let B=Dt(14711354,{emissive:14711354,emissiveIntensity:.12}),O=[];for(let j=0;j<8;j++){if(j===2)continue;let C=new be,fe=j%2,ye=Math.floor(j/2),M=fe?1.4:-1.4,x=-1.2+ye*.8;C.position.set(M,.12,x),C.add(De(.5,.1,.5,B)),ot(C,.5,.5,.08,J(15769696),{t:.015,railH:.025,overhang:.01});for(let V of[-.38,.38])for(let G=0;G<4;G++)C.add(De(.14,.035,.35,v,V,.02+G*.04,0)),G<3&&C.add(De(.12,.008,.32,E,V,.04+G*.04,0));b.add(C),O.push(C)}let F=new be;y.add(F);let A=J(4874114,{roughness:.4,metalness:.7}),U=J(5927576,{roughness:.45,metalness:.55,opacity:.88}),k=J(4018030,{roughness:.42,metalness:.65}),Y=J(11582664,{roughness:.35,metalness:.7}),z=J(5924984,{roughness:.4,metalness:.75}),P=fi(13684940),H=J(14711354,{emissive:14711354,emissiveIntensity:.28,roughness:.38,metalness:.6});for(let j of[-3.5,3.5])for(let C of[-2,2])F.add(gt(.22,9,.22,A,j,4.3,C,.06));F.add(gt(.12,8.8,4,U,-3.55,4.3,0,.02)),F.add(gt(.12,8.8,4,U,3.55,4.3,0,.02)),F.add(gt(7.2,.2,4.2,k,0,.05,0,.06)),F.add(gt(7.2,.2,4.2,k,0,8.7,0,.06));for(let j of[3,6])F.add(gt(7,.1,.12,A,0,j,-2,.03)),F.add(gt(7,.1,.12,A,0,j,2,.03));for(let j=0;j<4;j++){let C=1.1+j*2,fe=new be;fe.position.y=C,F.add(fe),fe.add(gt(6.8,.16,3.8,k,0,-.55,0,.05)),fe.add(gt(.16,1.55,3.6,Y,-3.2,0,0,.04)),fe.add(gt(.16,1.55,3.6,Y,3.2,0,0,.04)),fe.add(gt(6.6,1.55,.16,J(10529976,{roughness:.38,metalness:.7}),0,0,-1.85,.04)),fe.add(gt(6.2,.1,.1,J(9083048),0,.55,1.85,.03)),fe.add(gt(6,.06,.06,We(5162176,{emissive:5162176,emissiveIntensity:.55}),0,.55,1.92,.02)),ot(fe,6.6,3.6,.22,J(11056320),{t:.03,railH:.04,overhang:.02});for(let ye=-1;ye<=1;ye++){let M=gt(.9,.7,.55,z,ye*1.8,-.1,-1.5,.04);fe.add(M);for(let V=0;V<4;V++)fe.add(gt(.7,.04,.03,J(3817544),ye*1.8,-.3+V*.14,-1.2,.01));let x=new W(new Le(.12,.12,.04,12),J(9080984));x.rotation.x=Math.PI/2,x.position.set(ye*1.8,-.1,-1.2),fe.add(x)}j!==0&&fe.add(gt(5.5,.08,2.8,P,0,.05,0,.04));for(let ye of[-1.55,-.52,.52,1.55]){fe.add(gt(.78,.09,.72,J(13685980,{roughness:.36,metalness:.78}),ye,.14,.05,.04)),fe.add(gt(.62,.16,.56,H,ye,.28,.05,.04)),fe.add(gt(.56,.07,.48,J(4116420,{roughness:.34,metalness:.55,emissive:1940114,emissiveIntensity:.38}),ye,.4,.05,.025));for(let M of[-.14,.14])fe.add(gt(.06,.12,.06,J(3127470,{roughness:.3,metalness:.6,emissive:1940114,emissiveIntensity:.3}),ye+M,.47,-.2,.02));fe.add(gt(.55,.04,.08,J(12093520,{roughness:.3,metalness:.7,emissive:8413216,emissiveIntensity:.15}),ye,.15,-.4,.02));for(let M of[-.28,.28])for(let x=0;x<4;x++){let V=x%2?3115602:4168260;fe.add(gt(.12,.035,.36,We(V,{emissive:2783796,emissiveIntensity:.14}),ye+M,.16+x*.038,.05,.015))}}for(let[ye,M,x]of[[-.24,4116420,1940114],[-.36,2789064,1728152]]){let V=new W(new Le(.045,.045,4,10),J(M,{roughness:.32,metalness:.6,emissive:x,emissiveIntensity:.35,brush:!1}));V.rotation.z=Math.PI/2,V.position.set(0,.53,ye),fe.add(V)}for(let[ye,M]of[[-1.55,-.52],[.52,1.55]])for(let x=0;x<6;x++)fe.add(gt(.95,.04,.05,J(8015560,{roughness:.32,metalness:.65,emissive:5910184,emissiveIntensity:.22}),(ye+M)/2,.22,-.2+x*.09,.015));for(let ye=-5;ye<=5;ye++)fe.add(gt(.09,.42,.72,J(3836506,{roughness:.4,metalness:.5,emissive:2779716,emissiveIntensity:.06}),ye*.55,.35,1.1,.025));fe.add(gt(6.2,.08,.08,We(5162176,{emissive:5162176,emissiveIntensity:.75}),0,.65,1.95,.02))}for(let j of[-1,1])for(let C of[1.5,2.5,3.5,4.5,5.5,6.5,7.5]){F.add(gt(.26,.26,3.4,J(2764856,{roughness:.5}),j*3.72,C,0,.05));for(let fe=0;fe<5;fe++){let ye=new W(new Le(.035,.035,.95,8),J(4870232));ye.rotation.z=Math.PI/2,ye.position.set(j*3.95,C,-1.2+fe*.6),F.add(ye)}F.add(gt(.12,.12,.12,J(13215820,{roughness:.3,metalness:.8,emissive:10518576,emissiveIntensity:.12}),j*3.85,C,1.55,.03))}{let j=[];for(let ye of[-1,1])for(let M of[1.5,2.5,3.5,4.5,5.5,6.5,7.5])for(let[x,V]of[[-1.6,-.2],[0,1.4]])j.push(oh(new R(ye*4.02,M,x),new R(ye*4.02,M,V),.32,.04,14));F.add(new W(ah(j,!1),J(1974824,{roughness:.5,metalness:.35,brush:!1})));let C=J(6977672,{roughness:.35,metalness:.65,emissive:1713200,emissiveIntensity:.15,brush:!1}),fe=J(13215820,{roughness:.28,metalness:.8,emissive:8411680,emissiveIntensity:.18,brush:!1});for(let ye=0;ye<4;ye++){let M=1.1+ye*2;for(let x=0;x<10;x++)F.add(gt(.42,.32,.05,C,-2.55+x*.567,M+.25,1.98,.015));for(let x of[-3.05,3.05])F.add(gt(.08,.9,.1,fe,x,M,2,.03));F.add(gt(.07,.07,.04,We(6221962,{emissive:4120688,emissiveIntensity:.9}),2.75,M+.25,2.02,.01))}}b.position.y=1.15,m.position.set(0,1.35,0);let L=new be;y.add(L),L.add(De(86,.25,54,J(3820120,{roughness:.55,metalness:.4,brush:!1}),0,-.15,0)),L.add(De(78,.08,5.5,J(8308932,{roughness:.45,metalness:.3,emissive:3844260,emissiveIntensity:.2,brush:!1}),0,.02,0));for(let j of[-18,-9,9,18])L.add(De(78,.06,2.2,J(13138e3,{roughness:.5,metalness:.25,emissive:10506288,emissiveIntensity:.12,brush:!1}),0,.02,j));let $=J(5930700,{roughness:.4,metalness:.55,emissive:3825324,emissiveIntensity:.14,brush:!1}),te=J(5925506,{roughness:.42,metalness:.5,brush:!1}),ce=J(8030888,{roughness:.4,metalness:.55,brush:!1}),pe=J(14711354,{roughness:.38,metalness:.55,emissive:14711354,emissiveIntensity:.28,brush:!1}),se=We(5162176,{emissive:5162176,emissiveIntensity:.4}),X=5,Z=9;for(let j=0;j<X;j++)for(let C=0;C<Z;C++){if(j===2&&C===4)continue;let fe=(C-(Z-1)/2)*7.4,ye=(j-(X-1)/2)*9;for(let M of[-1.25,1.25])for(let x of[-.65,.65])L.add(De(.16,7.6,.16,$,fe+M,3.9,ye+x));L.add(De(2.7,.14,1.5,$,fe,.18,ye)),L.add(De(2.7,.14,1.5,$,fe,7.5,ye));for(let M=0;M<5;M++){let x=.85+M*1.3;L.add(De(2.5,.09,1.4,te,fe,x-.4,ye)),L.add(De(2.35,.85,.07,ce,fe,x,ye-.62)),L.add(De(.07,.85,1.2,ce,fe-1.15,x,ye)),L.add(De(.07,.85,1.2,ce,fe+1.15,x,ye));for(let V of[-.65,.65])L.add(De(.7,.18,.55,pe,fe+V,x-.22,ye+.05)),L.add(De(.65,.05,.5,J(4116420,{roughness:.4,metalness:.45,emissive:1940114,emissiveIntensity:.2,brush:!1}),fe+V,x-.34,ye+.05));M%2===0&&L.add(De(2,.05,.05,se,fe,x+.32,ye+.72))}L.add(De(2,.08,.07,se,fe,6.5,ye+.78)),L.add(De(.14,6.8,.14,J(2764856,{roughness:.5,brush:!1}),fe-1.42,3.6,ye)),L.add(De(.14,6.8,.14,J(2764856,{roughness:.5,brush:!1}),fe+1.42,3.6,ye));for(let M=0;M<6;M++)L.add(De(.22,.12,.35,J(4870232,{roughness:.42,metalness:.55,brush:!1}),fe-1.55,1+M*1.05,ye+.15)),L.add(De(.55,.05,.05,J(13215820,{roughness:.32,metalness:.75,brush:!1}),fe-1.85,1+M*1.05,ye+.15));for(let M=0;M<4;M++)L.add(De(.08,5.5,.08,J(3819608,{roughness:.5,brush:!1}),fe-.6+M*.4,3.2,ye-.85))}for(let j=-4;j<=4;j++){L.add(De(84,.28,.28,J(11055264,{roughness:.4,metalness:.6,brush:!1}),0,9.6,j*5.5)),L.add(De(84,.14,.7,J(6975608,{roughness:.45,metalness:.5,brush:!1}),0,9.15,j*5.5+1.5));for(let C=-5;C<=5;C++)L.add(De(.18,.55,.18,J(3817544,{roughness:.5,brush:!1}),C*7.2,8.7,j*5.5+1.5))}for(let j of[-18,-9,0,9,18]){L.add(De(76,.12,.55,J(5922920,{roughness:.48,metalness:.45,brush:!1}),0,.12,j));for(let C=-6;C<=6;C++)L.add(De(.35,.08,.35,J(2764856,{roughness:.5,brush:!1}),C*5.5,.22,j))}for(let j of[-24,24])for(let C of[-32,-16,0,16,32])L.add(De(4.2,3,2,J(11581632,{roughness:.4,metalness:.55,brush:!1}),C,1.6,j)),L.add(De(1.1,.7,1.1,J(9080984,{roughness:.35,metalness:.7,brush:!1}),C,3.4,j)),L.add(De(3.5,.14,.14,We(5162176,{emissive:5162176,emissiveIntensity:.55}),C,2.6,j+(j>0?-1.1:1.1)));for(let j=0;j<8;j++){let C=(j-3.5)*7.4;L.add(De(.08,7.2,8.5,J(8030360,{roughness:.45,metalness:.35,opacity:.55,brush:!1}),C+3.5,3.8,0))}{let j=[],C=[],fe=[],ye=[],M=[],x=[];for(let G=0;G<X;G++)for(let Q=0;Q<Z;Q++){if(G===2&&Q===4)continue;let he=(Q-(Z-1)/2)*7.4,ge=(G-(X-1)/2)*9;for(let oe=0;oe<5;oe++){let xe=.85+oe*1.3,Te=ge+.69;j.push([he,xe,Te]);for(let Ee=0;Ee<8;Ee++)C.push([he-.98+Ee*.28,xe+.06,Te+.03]);fe.push([he+1,xe+.3,Te+.04]),(G+Q+oe)%3===0&&ye.push([he+.86,xe+.3,Te+.04]),M.push([he-1.08,xe,Te+.06]),M.push([he+1.08,xe,Te+.06])}let re=Math.round(ge/5.5)*5.5+1.5;for(let oe of[-.7,.7])x.push(oh(new R(he+oe,7.6,ge-.3),new R(he+oe*1.6,9.1,re),-.45,.07,10));Q<Z-1&&!(G===2&&Q===3)&&x.push(oh(new R(he+1.3,7.3,ge-.5),new R(he+7.4-1.3,7.3,ge-.5),.9,.055,12))}Xr(L,j,2.3,1,.05,J(2765376,{roughness:.45,metalness:.5,brush:!1})),Xr(L,C,.2,.62,.04,J(9083566,{roughness:.35,metalness:.6,emissive:2767438,emissiveIntensity:.2,brush:!1})),Xr(L,fe,.09,.09,.04,We(6221962,{emissive:4120688,emissiveIntensity:.9})),Xr(L,ye,.09,.09,.04,We(16756800,{emissive:16748576,emissiveIntensity:.9})),Xr(L,M,.07,.7,.08,J(13215820,{roughness:.3,metalness:.75,emissive:8413216,emissiveIntensity:.15,brush:!1}));let V=ah(x,!1);L.add(new W(V,J(2238511,{roughness:.55,metalness:.3,brush:!1})))}let me=ey(L,{minDim:.3,color:1581098,opacity:.5}),de=new be;y.add(de);let _e=Dt(14868698),$e=Dt(13157564),dt=Dt(11578532);de.add(De(108,28,1.6,_e,0,14,-40)),de.add(De(1.6,28,82,_e,-54,14,0)),de.add(De(1.6,28,22,_e,54,14,-30)),de.add(De(28,28,1.6,_e,-40,14,40)),de.add(De(1.2,28,1.2,dt,54,14,-19)),de.add(De(1.2,28,1.2,dt,-26,14,40)),de.add(De(70,1,36,$e,-18,28.2,-22)),de.add(De(36,1,28,$e,-36,28.2,12));for(let j=0;j<6;j++)de.add(De(.8,1.6,48,Dt(10131086),-6+j*14,28.2,4));for(let j=0;j<9;j++){let C=-48+j*12;de.add(De(9,4.2,7,J(11581632,{roughness:.4,metalness:.55,brush:!1}),C,31.2,-12)),de.add(De(2.5,2.6,2.5,J(9080984,{roughness:.35,metalness:.7,brush:!1}),C-2.3,34.2,-12)),de.add(De(2.5,2.6,2.5,J(9080984,{roughness:.35,metalness:.7,brush:!1}),C+2.3,34.2,-12)),de.add(De(8,.3,.3,We(5162176,{emissive:5162176,emissiveIntensity:.35}),C,33.2,-8.2))}for(let j=0;j<6;j++){let C=-36+j*14;de.add(De(5,8,5,J(10134445,{roughness:.42,metalness:.5,brush:!1}),C,32.5,18)),de.add(De(3.5,1.2,3.5,J(8028810,{roughness:.4,metalness:.6,brush:!1}),C,37.2,18))}for(let j=0;j<7;j++)de.add(De(6,5.5,4.2,J(6975608,{roughness:.4,metalness:.6,brush:!1}),-62,2.6,-30+j*11)),de.add(De(1.3,3.2,1.3,J(4870232,{roughness:.4,metalness:.65,brush:!1}),-62,7,-30+j*11)),de.add(De(.4,4,.4,J(13215820,{roughness:.35,metalness:.8,brush:!1}),-58,4,-30+j*11));for(let j=0;j<4;j++)de.add(De(10,4,5,J(5924984,{roughness:.4,metalness:.55,brush:!1}),68,2.2,-20+j*14)),de.add(De(3,2.5,3,J(3819608,{roughness:.4,metalness:.6,brush:!1}),68,5.5,-20+j*14));for(let j=0;j<20;j++)de.add(De(.35,3.5,.35,J(6975592,{roughness:.5,brush:!1}),-75+j*8,1.6,55));de.add(De(160,.3,120,Dt(6975592),0,-.4,0)),de.add(De(40,.2,20,Dt(12107944),70,-.2,30));for(let j=0;j<5;j++)for(let C=0;C<14;C++)de.add(De(5.2,2.4,.35,Dt(10402e3,{emissive:8035e3,emissiveIntensity:.1}),-48+C*7.2,4.5+j*4.8,-40.6));de.add(De(18,.5,8,Dt(11055264),20,8,44)),de.add(De(.6,8,.6,dt,12,4,44)),de.add(De(.6,8,.6,dt,28,4,44)),l=bt([{obj:m,delay:0,drop:.25,fromScale:.7},{obj:b,delay:.2,drop:.2,fromScale:.85}],{dur:.9});let Ke=new Pt({color:1974822,transparent:!0,opacity:.4});[m,b,F].forEach(j=>j.traverse(C=>{if(!(!C.isMesh||!C.geometry))try{C.add(new Lt(new Ot(C.geometry,26),Ke.clone()))}catch{}})),h.label('<span class="c-orange">die</span>',()=>r<.9?new R(m.position.x,m.position.y+.55,m.position.z):null,""),h.label("DGX server",()=>r>.55&&r<1.42?new R(0,b.position.y+1.2,0):null,""),h.label("rack",()=>r>1.42&&r<2.45?new R(0,11.2,0):null,""),h.label("GPU hall",()=>r>2.4&&r<3.55?new R(0,8,22):null,""),h.label("building \xB7 150 MW",()=>r>3.4?new R(0,34,0):null,"");function tt(j){let C=gi(Math.floor(j),0,c.length-2),fe=Qx(j-C),ye=C===1?Math.pow(fe,.22):C===0?Math.pow(fe,.35):fe,M=C===1?Math.pow(fe,.28):C===0?Math.pow(fe,.4):fe,x=Math.exp(Mn(Math.log(c[C].dist),Math.log(c[C+1].dist),ye)),V=Mn(c[C].y,c[C+1].y,M),G=Mn(c[C].pitch,c[C+1].pitch,fe);return C===0&&fe>=.25&&(x=Math.max(x,Mn(c[C].dist,c[C+1].dist,Math.max(.55,fe*.95))),V=Math.max(V,Mn(c[C].y,c[C+1].y,.55)),G=Math.min(G,Mn(c[C].pitch,c[C+1].pitch,.85))),C===1&&fe>=.4&&(x=Math.max(x,Mn(c[C].dist,c[C+1].dist,.92)),V=Math.max(V,Mn(c[C].y,c[C+1].y,.7)),G=Math.min(G,Mn(c[C].pitch,c[C+1].pitch,.9))),{dist:x,y:V,pitch:G,yaw:Mn(c[C].yaw,c[C+1].yaw,fe)}}let je=c[1].yaw;function ee(j=!1){let C=tt(r);u.dist=C.dist,u.pitch=C.pitch,j&&(je=C.yaw,u.yaw=je);let fe=r<.5?Mn(m.position.y+.15,C.y,r/.5):C.y;f.set(0,fe,0),h.invalidate()}function ve(){let j=r;m.visible=j<1.5,m.scale.setScalar(j<1?1:Mn(1,.4,gi((j-1)/.45,0,1))),b.visible=j<2.5;let C=j<.35?Mn(.35,1,j/.35):gi(1-(j-2)/.45,.15,1);_.material.transparent=C<.99,_.material.opacity=C,F.visible=j>1.28&&j<3.4,F.traverse(M=>{if(!M.isMesh)return;let x=gi((j-1.28)/.22,0,1);M.material.transparent=x<.99,M.material.opacity=x,M.visible=x>.02}),L.visible=j>2.25;let fe=gi((j-2.25)/.45,0,1);L.traverse(M=>{M.isMesh&&(M.material.transparent=fe<.99,M.material.opacity=Math.max(.25,fe))}),me.material.opacity=me.userData.ink*fe,de.visible=j>3.05;let ye=gi((j-3.05)/.45,0,1);de.traverse(M=>{if(!M.isMesh)return;M.material.transparent=ye<.99;let x=M.position.y>26;M.material.opacity=Math.max(x?.55:.85,ye)}),j>3.5&&(L.visible=!0,L.traverse(M=>{M.isMesh&&(M.material.transparent=!1,M.material.opacity=1)})),g.material.transparent=!0,g.visible=j>3.2,g.material.opacity=j>3.2?gi((j-3.2)/.5,.2,1):0}function Qe(j=!0){if(ee(),ve(),j){let C=gi(Math.round(r),0,Bi.length-1),fe=Bi[C],ye=Bi[Math.min(Bi.length-1,C+1)];Xe.innerHTML=`<b>${fe.name[0].toUpperCase()+fe.name.slice(1)}</b>: <b>${Ad(fe.W)}</b> \xB7 ${fe.note}. ${C<Bi.length-1?`Pull out toward <span class="c-orange">${ye.name}</span> (${Ad(ye.W)}).`:"Site power is the utility figure, not a sum of dies."}`}h.invalidate()}let nt=t.controls(i);t.slider(nt,{label:"Zoom",name:"zoom",min:0,max:Bi.length-1,step:.01,value:r,color:n.heat,fmt:j=>Bi[gi(Math.round(j),0,Bi.length-1)].key,oninput:j=>{a=null,r=j,ee(!0),ve(),Qe()}});let Xe=t.readout(i);return t.hint(i,"drag to turn \xB7 Zoom: die \u2192 building"),Qe(),h.ready(),!0}var Cd=20,Id=250,ml=.14,ty=.5,Pd=.94,ny=(ty-ml)/(Pd-ml);function Ld(i,e){let t=e.ui,n=t.C,s=se=>se<560,r=-4,a=!0,o=null,l=[],c=()=>a?Math.max(0,r+Id/Cd)**1.5/(Id/Cd)**1.5:0,h=vt(i,{ui:t,label:"A vacuum triode in three dimensions: electrons leave a hot cathode; the grid voltage lets them through to the plate or turns them back. Drag sideways to turn the tube.",height:se=>s(se)?Math.round(Math.max(300,se*.9)):Math.round(Math.min(400,se*.5)),radius:1.7,radiusY:2.05,yaw:.55,pitch:.22,target:new R(0,.95,0),fitPadY:1.32,fitPadX:1.08,fov:34,busy:()=>a||o&&!o.done,onShow(){o?.arm(),h&&h.invalidate()},step(se){o&&!o.done&&o.tick(se);let X=a?90*se:0;for(let Z=0;Z<X;Z++)l.length<140&&l.push({a:Math.random()*Math.PI*2,y:.64+Math.random()*.34,t:0,pass:Math.random()<c()/1.6,v:.55+Math.random()*.35,turn:ny*Math.max(.12,1+Math.min(0,r)/22)*(.8+Math.random()*.25),back:!1});for(let Z of l)!Z.pass&&!Z.back&&Z.t>=Z.turn&&(Z.back=!0),Z.t+=Z.v*se*(Z.back?-1.15:1);for(let Z=l.length-1;Z>=0;Z--)(l[Z].t>1.05||l[Z].t<-.02)&&l.splice(Z,1);return L(),a}});if(!h)return!1;let{scene:d}=h;Mt(d,{hemi:.42,keyI:1.85,fillI:.22,rimI:.75,sky:16769216,ground:4864040,keyPos:[4,5,5],fillPos:[-4,2,-2],envI:.42,glintI:.7,glintPos:[7,6,2]});let u=new be;d.add(u);let f=new W(new Le(1.2,1.2,2.2,48,1,!0),di(12112096,{opacity:.07}));f.position.y=.95,u.add(f);let g=new W(new Ze(1.2,36,18,0,Math.PI*2,0,Math.PI/2),di(12112096,{opacity:.08}));g.position.y=2.05,u.add(g);let y=new W(new Le(1.25,1.35,.38,40),qt(9070656,{brushAxis:"circ",metalness:.58,roughness:.28,brushStrength:1.4,clearcoat:.35,envMapIntensity:.4}));y.position.y=-.25,u.add(y),Ws(u,1.28,.045,-.05,qt(13148256,{emissiveIntensity:.22,clearcoat:.4,envMapIntensity:.45})),Ws(u,1.18,.03,1.75,J(12635352,{roughness:.25,metalness:.7,clearcoat:.4,opacity:.75}));for(let se=0;se<10;se++){let X=se/10*Math.PI*2,Z=new W(new Le(.055,.05,.42,10),qt(13936736,{emissiveIntensity:.28,clearcoat:.5,brushStrength:1.2}));Z.position.set(Math.cos(X)*.72,-.58,Math.sin(X)*.72),u.add(Z);let me=new W(new Ze(.05,10,8),J(15253624,{roughness:.18,metalness:.95,clearcoat:.6}));me.position.set(Math.cos(X)*.72,-.8,Math.sin(X)*.72),u.add(me)}let m=We(14711354,{emissive:14711354,emissiveIntensity:.6}),p=new W(new Le(.14,.14,1,18),m);p.position.y=.5,u.add(p);let w=new be;u.add(w);let D=J(5935060,{roughness:.35,metalness:.7,emissive:3438800,emissiveIntensity:.18});for(let se=0;se<14;se++){let X=new W(new Nt(.5,.016,8,40),D);X.rotation.x=Math.PI/2,X.position.y=.18+se*.1,w.add(X)}for(let se of[-.5,.5]){let X=new W(new Le(.018,.018,1.35,8),D);X.position.set(se,.7,0),w.add(X)}let v=qt(14196816,{cleanHex:14197792,brushAxis:"circ",emissiveIntensity:.34,brushStrength:2.1,clearcoat:.6,clearcoatRoughness:.12,envMapIntensity:.7,side:Ut}),E=qt(15253624,{cleanHex:14725168,emissive:12093488,emissiveIntensity:.28,clearcoat:.65,clearcoatRoughness:.1,brushStrength:1.9,envMapIntensity:.72}),b=Math.PI*.2,I=Math.PI*1.6,_=new be;_.rotation.y=.55,u.add(_);let S=new W(new Le(1.05,1.05,1.35,48,1,!1,b,I),v);S.position.y=1.25,_.add(S);let N=new W(new Le(.94,.94,1.28,40,1,!0,b,I),qt(9070656,{metalness:.55,roughnessIntensity:.12,envMapIntensity:.4,brushStrength:.8}));N.position.y=1.25,_.add(N);for(let se of[b,b+I]){let X=new W(new we(.07,1.32,.12),E);X.position.set(Math.sin(se)*1,1.25,Math.cos(se)*1),X.rotation.y=se,_.add(X)}for(let[se,X]of[[1.9,1.15],[.6,1.12]]){let Z=new W(new Le(X,X,.1,40,1,!1,b,I),E);Z.position.y=se,_.add(Z)}let B=new W(new Le(1.1,1.05,.12,40,1,!1,b,I),E);B.position.y=1.95,_.add(B);for(let se of[Math.PI*.55,Math.PI*1,Math.PI*1.45]){let X=new W(jt(.05,1.18,.16,.018),E);X.position.set(Math.sin(se)*1.12,1.25,Math.cos(se)*1.12),X.rotation.y=se,_.add(X)}let O=_,F=We(15260872,{transparent:!0,opacity:.7});for(let se of[.12,1.85]){let X=new W(new Le(.85,.85,.035,28),F);X.position.y=se,u.add(X)}let A=new W(new Ze(.48,20,14,0,Math.PI*1.1,0,Math.PI*.55),J(13160664,{shininess:95,specular:16777215,opacity:.5}));A.position.set(.4,1.7,.25),u.add(A);let U=new W(new Nt(.06,.012,6,16),We(16764006,{emissive:16755251,emissiveIntensity:.7}));U.position.y=.55,U.rotation.x=Math.PI/2,u.add(U);let k=new W(new Nt(.96,.02,8,40),We(11059408,{transparent:!0,opacity:.35}));k.rotation.x=Math.PI/2,k.position.y=2,u.add(k);let Y=new Pt({color:5914672,transparent:!0,opacity:.3});try{y.add(new Lt(new Ot(y.geometry,28),Y.clone()))}catch{}u.traverse(se=>{if(!se.isMesh||!se.geometry||!se.material||se===y)return;let X=se.material;if(X.metalness>.4&&(X.emissiveIntensity||0)>.05)try{se.add(new Lt(new Ot(se.geometry,28),Y.clone()))}catch{}});let z=new Ze(.03,6,6),P=We(3832020,{emissive:3832020,emissiveIntensity:.55}),H=[];for(let se=0;se<140;se++){let X=new W(z,P);X.visible=!1,u.add(X),H.push(X)}h.label('<span class="c-blue">grid</span>',()=>new R(.75,.85,0),"");function L(){m.emissiveIntensity=a?.55+.25*Math.sin(performance.now()/200):.02,m.color.setHex(a?14711354:6971480);for(let se=0;se<H.length;se++){let X=H[se],Z=l[se];if(!Z){X.visible=!1;continue}X.visible=!0;let me=ml+Z.t*(Pd-ml);X.position.set(Math.cos(Z.a)*me,Z.y,Math.sin(Z.a)*me)}h.invalidate()}function $(){let se=c();ce.innerHTML=a?se===0?`<span class="c-blue">Grid</span> <b>${String(r).replace("-","\u2212")} V</b> turns every electron back \u2014 tube off.`:`<span class="c-blue">Grid</span> <b>${String(r).replace("-","\u2212")} V</b> \xB7 plate current <b>${Math.round(se*100)}%</b> of 0 V.`:'Heater off: no electrons leave the <span class="c-orange">cathode</span>.',L()}let te=t.controls(i);t.slider(te,{label:"Grid",name:"vg",min:-20,max:2,step:.5,value:r,color:n.compute,fmt:se=>`${se} V`,oninput:se=>{r=se,$()}}),t.button(te,"Heater on / off",()=>{a=!a,$()},{name:"tr3-heat"});let ce=t.readout(i);t.hint(i,'drag to turn \xB7 <span class="c-orange">cathode</span> \xB7 <span class="c-blue">grid</span> \xB7 plate \xB7 pull Grid negative to cut'),$();let pe=bt([{obj:y,delay:0,drop:.2},{obj:p,delay:.12,drop:.25},{obj:w,delay:.28,drop:.22},{obj:O,delay:.42,drop:.28},{obj:f,delay:.55,drop:.15}],{dur:1});return o=pe,pe.arm(),h.ready(),!0}var iy=(i,e,t)=>Math.max(e,Math.min(t,i)),Dd={rho:997,cp:4180};function gl(i,e,t,n,s,r,a,o){let l=new W(new we(e,t,n),s);return l.position.set(r,a,o),i.add(l),l}function xi(i,e,t,n,s=.13){let r=new R().subVectors(t,e),a=r.length(),o=new W(new Le(s,s,a,16),J(n,{roughness:.32,metalness:.65,emissive:n,emissiveIntensity:.18}));return o.position.copy(e).add(t).multiplyScalar(.5),o.quaternion.setFromUnitVectors(new R(0,1,0),r.clone().normalize()),i.add(o),o}function Nd(i,e){let t=e.ui,n=t.C,s=$=>$<560,r=40.8,a=50,o=[],l=()=>a/6e4*Dd.rho,c=()=>r*1e3/(l()*Dd.cp),h,d=null,u=[],f=vt(i,{ui:t,label:"A cold plate over a hot die with inlet and outlet pipes. Water carries the heat; outlet rise follows \u0394T = P / (\u1E41 c). Drag sideways to turn.",height:$=>s($)?Math.round(Math.max(240,$*.64)):Math.round(Math.min(400,$*.5)),radius:3.35,radiusY:1.95,yaw:-.42,pitch:.48,target:new R(0,.42,0),fitPad:1.28,busy:()=>!0,onShow(){d?.arm(),f&&f.invalidate()},step($){d&&d.tick($);let te=.28+a*.007,ce=5,pe=(7+a*.18)*$;for(let Z=0;Z<pe;Z++)o.length<60&&o.push({u:-.04-Math.random()*.06,lane:Math.floor(Math.random()*ce)});for(let Z of o)Z.u+=te*$*(.92+Z.lane%3*.04);for(let Z=o.length-1;Z>=0;Z--)o[Z].u>1.08&&o.splice(Z,1);let se=iy(c()/25,0,1),X=Z=>-.48+Z*.24;for(let Z=0;Z<u.length;Z++){let me=u[Z],de=o[Z];if(!de){me.visible=!1;continue}me.visible=!0,me.position.set(-1.05+de.u*2.1,.56,X(de.lane));let _e=Math.max(0,(de.u-.4)/.55)*se;me.material.color.setRGB(.18+.75*_e,.88-.45*_e,.82-.72*_e),me.material.opacity=1;let $e=.9+.18*Math.sin(de.u*8+de.lane);me.scale.setScalar($e)}return h&&(h.material.emissiveIntensity=.45+.35*Math.min(1,r/100)+.1*Math.sin(performance.now()/160)),!0}});if(!f)return!1;let{scene:g}=f;Mt(g,{hemi:.88,keyI:1.4,fillI:.35,rimI:.5,envI:.9,glintI:.45});let y=new be;g.add(y);let m=ke(4.6,.1,3,fi(14474456),.04);m.position.set(0,0,0),y.add(m),ot(y,4.5,2.9,.07,J(11842736),{t:.035,railH:.05,overhang:.03});for(let $=-4;$<=4;$++){let te=new W(new we(4,.012,.035),J(12886112,{roughness:.4}));te.position.set(0,.06,$*.28),y.add(te)}let p=new be;y.add(p),h=ke(1.5,.16,1.5,We(14711354,{emissive:16736288,emissiveIntensity:.7,shininess:50}),.045),h.position.set(0,.18,.25),p.add(h),ot(p,1.5,1.5,.25,J(15769696),{t:.025,railH:.035,overhang:.015});let w=new W(new Ze(.95,20,16),We(16736288,{opacity:.1,emissive:16728080,emissiveIntensity:.4,shininess:5}));w.position.set(0,.22,.25),p.add(w);for(let $=-2;$<=2;$++)for(let te=-2;te<=2;te++){if(Math.abs($)+Math.abs(te)<1)continue;let ce=new W(new Le(.04,.04,.02,8),J(14205040));ce.position.set($*.22,.25,.15+te*.22),p.add(ce)}let D=ke(1.55,.04,1.55,We(8947840),.02);D.position.set(0,.28,.1),y.add(D);let v=new be;y.add(v);let E=J(12109008,{roughness:.28,metalness:.85,brushStrength:1.1}),b=J(10136504,{roughness:.35}),I=ke(2.6,.1,2,E,.04);I.position.set(0,.36,0),v.add(I);let _=ke(.14,.42,2,E,.03);_.position.set(-1.25,.52,0),v.add(_);let S=ke(.14,.42,2,E,.03);S.position.set(1.25,.52,0),v.add(S);let N=ke(2.6,.42,.14,E,.03);N.position.set(0,.52,-.95),v.add(N);let B=ke(2.4,.08,.12,E,.02);B.position.set(0,.38,.95),v.add(B);for(let[$,te,ce]of[[-1.32,.04,2.05],[1.32,.04,2.05]]){let pe=new W(new we(te,.06,ce),J(10531008));pe.position.set($,.74,0),v.add(pe)}for(let[$,te,ce]of[[-1.02,2.6,.04]]){let pe=new W(new we(te,.06,ce),J(10531008));pe.position.set(0,.74,$),v.add(pe)}let O=[-.48,-.24,0,.24,.48];for(let $=0;$<O.length-1;$++){let te=(O[$]+O[$+1])/2;gl(v,2.15,.16,.05,qt(13138496,{metalness:.6,emissiveIntensity:.16,brushStrength:1,envMapIntensity:.35}),0,.5,te)}for(let $ of O)gl(v,2.1,.035,.18,qt(13666896,{metalness:.55,emissiveIntensity:.18,brushStrength:1.2,envMapIntensity:.4}),0,.42,$);{let $=ke(2.35,.03,.28,J(11582664,{roughness:.3,opacity:.35}),.015);$.position.set(0,.74,-.7),v.add($)}gl(v,.18,.28,.9,J(9083560),-1.05,.55,0),gl(v,.18,.28,.9,J(9083560),1.05,.55,0);for(let[$,te]of[[-1.15,-.85],[1.15,-.85],[-1.15,.85],[1.15,.85]]){let ce=new W(new Le(.05,.05,.1,10),J(6975608));ce.position.set($,.78,te),v.add(ce)}let F=new be;y.add(F),xi(F,new R(-1.95,.62,.3),new R(-1.15,.62,.3),1940114,.17),xi(F,new R(-1.95,.62,.3),new R(-1.95,.62,-.85),1940114,.17),xi(F,new R(-1.95,.62,-.85),new R(-1.95,.2,-.85),1940114,.17),xi(F,new R(1.15,.62,.3),new R(1.95,.62,.3),14513188,.17),xi(F,new R(1.95,.62,.3),new R(1.95,.62,-.85),14513188,.17),xi(F,new R(1.95,.62,-.85),new R(1.95,.2,-.85),14513188,.17),xi(F,new R(-1,.34,1.15),new R(1,.34,1.15),2795684,.1),xi(F,new R(-1,.34,1.15),new R(-1,.34,.65),2795684,.1),xi(F,new R(1,.34,1.15),new R(1,.34,.65),2795684,.1);for(let $ of[-1.45,-1.75,1.45,1.75]){let te=new W(new Nt(.18,.03,8,16),J(9080984));te.rotation.y=Math.PI/2,te.position.set($,.62,.3),F.add(te)}let A=new W(new Ze(.2,14,14),J(1940114,{roughness:.3,metalness:.7,emissive:1940114,emissiveIntensity:.25}));A.position.set(-1.15,.62,.3),F.add(A);let U=new W(new Ze(.2,14,14),J(14513188,{roughness:.3,metalness:.7,emissive:14513188,emissiveIntensity:.25}));U.position.set(1.15,.62,.3),F.add(U);let k=new Pt({color:2829098,transparent:!0,opacity:.2});y.traverse($=>{if(!$.isMesh||!$.geometry)return;let te=$.geometry.type;if(!(te==="SphereGeometry"||te==="CylinderGeometry"))try{$.add(new Lt(new Ot($.geometry,28),k.clone()))}catch{}});let Y=new Ze(.055,12,12);u=[];for(let $=0;$<80;$++){let te=new W(Y,new sn({color:4116420,transparent:!1,opacity:1,depthWrite:!0}));te.visible=!1,y.add(te),u.push(te)}for(let $=0;$<5;$++)for(let te=0;te<4;te++)o.push({u:(te+.35)/4.5+$%2*.05,lane:$});f.label('<span class="c-cyan">in</span>',()=>new R(-2,1.4,.35),""),f.label('<span class="c-orange">out</span>',()=>new R(2,1.4,.35),"");let z=t.controls(i),P=t.readout(i);function H(){let $=c();P.innerHTML=`Heat load <b>${r>=1?r.toFixed(1)+" kW":Math.round(r*1e3)+" W"}</b> \xB7 flow <b>${a} L/min</b> \u2192 outlet \u0394T <b>${$<10?$.toFixed(1):Math.round($)} \xB0C</b> (model P = \u1E41 c \u0394T).`,f.invalidate()}t.slider(z,{label:"Heat load",name:"kw",min:.7,max:120,step:.1,value:r,color:n.heat,fmt:$=>$>=1?`${+$.toPrecision(3)} kW`:`${Math.round($*1e3)} W`,oninput:$=>{r=$,H()}}),t.slider(z,{label:"Flow",name:"lpm",min:5,max:120,step:1,value:a,color:n.cyan,fmt:$=>`${$} L/min`,oninput:$=>{a=$,H()}}),t.hint(i,'drag to turn \xB7 <span class="c-orange">die</span> glow under open plate \xB7 raise heat or slow the flow'),H();let L=bt([{obj:p,delay:0,drop:.18},{obj:v,delay:.12,drop:.28}],{dur:.85});return d=L,L.arm(),f.view.dist<7&&(f.view.dist=7),f.ready(),!0}function Ft(i,e={}){return e.metal?J(i,e):We(i,{shininess:e.shininess??36,specular:e.specular??5592405,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,opacity:e.opacity??1})}function ti(i,e,t,n,s,r,a,o){let l=new W(new we(e,t,n,1,1,1),s);return l.position.set(r,a,o),i.add(l),l}function Ud(i,e){let t=e.ui,n=t.C,s=z=>z<560,r=10,a=.42,o=null,l=null,c=[],h=[],d=vt(i,{ui:t,label:"A GPU package in three dimensions: logic die, HBM stacks beside it, NVLink pads at the edge. A pulse follows the path a number travels. Drag sideways to turn.",height:z=>s(z)?Math.round(Math.max(300,z*.9)):Math.round(Math.min(420,z*.52)),radius:2.85,radiusY:1.85,yaw:-.72,pitch:.42,target:new R(0,.35,0),fitPad:1.2,fov:30,busy:()=>!0,onShow(){o?.arm(),d&&d.invalidate()},step(z){try{if(o&&o.tick(z),!l)return!0;let P=Number(z)||.016;a=(a+P*.32)%1,Number.isFinite(a)||(a=0);let H=a,L=h;if(!L||L.length<2)return!0;let $=L.length-1,te=H*$,ce=Math.max(0,Math.min($-1,Math.floor(te))),pe=te-ce,se=L[ce],X=L[ce+1];if(!se||!X)return!0;l.position.set(se.x+(X.x-se.x)*pe,se.y+(X.y-se.y)*pe,se.z+(X.z-se.z)*pe),l.material.emissiveIntensity=.45+.35*Math.sin(a*Math.PI*2);let Z=ce===2;for(let me=0;me<c.length;me++)c[me].emissiveIntensity=Z?.22:.06}catch{}return!0}});if(!d)return!1;let{scene:u}=d;Mt(u,{hemi:1.45,keyI:1.25,fillI:.5,rimI:.35});let f=new be;u.add(f);let g=ke(4.6,.14,4,Ft(14210248),.06);g.position.set(0,0,0),f.add(g);let y=ke(4.4,.07,3.8,J(13684942,{roughness:.4,metalness:.55}),.05);y.position.set(0,.1,0),f.add(y);let m=ke(4.5,.04,3.9,J(12632254,{roughness:.35}),.04);m.position.set(0,.15,0),f.add(m),ot(f,4.5,3.9,.17,J(11842736),{t:.035,railH:.05,overhang:.03});let p=new be;f.add(p);let w=ke(2,.16,2,Ft(5935060,{emissive:3438800,emissiveIntensity:.14}),.045);w.position.set(0,.3,0),p.add(w);let D=ke(1.92,.04,1.92,Ft(6988e3),.03);D.position.set(0,.4,0),p.add(D);for(let z=-3;z<=3;z++)for(let P=-3;P<=3;P++)Math.abs(z)+Math.abs(P)>5||ti(p,.18,.025,.18,Ft(4882372),z*.24,.43,P*.24);let v=new W(new Ze(.12,18,18),Ft(15255626,{emissive:15255626,emissiveIntensity:.55}));v.position.set(0,.55,0),f.add(v);let E=new be;f.add(E),ti(E,1.6,.09,.45,Ft(10276714,{emissive:7317562,emissiveIntensity:.1}),0,.44,.7),ot(E,1.6,.45,.5,J(7909448),{t:.02,railH:.035,overhang:.015});for(let z=-3;z<=3;z++){let P=new W(new we(.16,.04,.28),Ft(3115618));P.position.set(z*.22,.5,.7),E.add(P)}ot(f,2,2,.42,J(4882372),{t:.035,railH:.05,overhang:.025});let b=Ft(14205040,{emissive:11575360,emissiveIntensity:.12,metal:!0});for(let z=-4;z<=4;z++)for(let P=-4;P<=4;P++){if(Math.abs(z)+Math.abs(P)<2||(Math.abs(z)+Math.abs(P))%2===0)continue;let H=new W(new Le(.035,.035,.025,8),b);H.position.set(z*.18,.455,P*.18),f.add(H)}function I(z){let P=new be;P.position.set(z,.22,0),f.add(P);let H=12;for(let L=0;L<H;L++){let $=L%3===0?8962121:L%3===1?9750616:10670184,te=Ft($,{emissive:1927752,emissiveIntensity:.06});c.push(te);let ce=new W(new we(.58,.055,1.55),te);if(ce.position.y=L*.068,P.add(ce),L<H-1){let pe=new W(new we(.54,.012,1.48),Ft(13686992));if(pe.position.y=L*.068+.034,P.add(pe),L%2===0){let se=new W(new we(.5,.008,1.4),J(12886112));se.position.y=L*.068+.04,P.add(se)}}}ti(P,.52,.04,1.45,Ft(8947840),0,-.06,0),ti(P,.54,.03,1.48,Ft(3844210),0,H*.068,0),ot(P,.58,1.55,H*.068+.02,J(7317562),{t:.025,railH:.04,overhang:.02}),ti(P,.02,H*.068,1.52,Ft(7317562),.3,H*.034,0),ti(P,.02,H*.068,1.52,Ft(7317562),-.3,H*.034,0);for(let L=-1;L<=1;L++)for(let $=-2;$<=2;$++){let te=new W(new Ze(.03,8,8),J(14205040));te.position.set(L*.15,H*.068+.04,$*.22),P.add(te)}return P}let _=I(-1.55),S=I(1.55),N=new be;f.add(N),ti(N,3.4,.05,.58,Ft(5916792),0,.1,1.72),ot(N,3.4,.58,.14,J(6969488),{t:.03,railH:.045,overhang:.02});for(let z=-7;z<=7;z++)ti(N,.16,.09,.4,Ft(9071316,{emissive:6965940,emissiveIntensity:.16}),z*.22,.16,1.72),ti(N,.13,.03,.08,Ft(14205040,{emissive:11575360,emissiveIntensity:.2}),z*.22,.22,1.9);for(let z of[-1.55,1.55])for(let P=0;P<12;P++){let H=new W(new Le(.022,.022,.7,8),J(12886112));H.position.set(z+P%3*.1-.1,.5,-.55+Math.floor(P/3)*.28),f.add(H)}let B=Ft(12886112,{emissive:10780736,emissiveIntensity:.08});for(let z=-9;z<=9;z++)for(let P=-7;P<=7;P++){if((Math.abs(z)+Math.abs(P))%2===1||Math.abs(z)<2&&Math.abs(P)<2)continue;let H=new W(new Ze(.048,10,10),B);H.position.set(z*.28,-.1,P*.28),f.add(H)}for(let z=0;z<40;z++){let P=z/40*Math.PI*2,H=2.2,L=new W(new Le(.025,.025,.09,8),Ft(12886112));L.position.set(Math.cos(P)*H*.95,.05,Math.sin(P)*H*.85),f.add(L)}for(let z=-4;z<=4;z++)ti(f,.04,.02,3.2,Ft(11055296),z*.45,.17,0);let O=new Pt({color:2829098,transparent:!0,opacity:.12});f.traverse(z=>{if(!(!z.isMesh||!z.geometry||z.geometry.type==="SphereGeometry"||z.geometry.type==="CylinderGeometry"))try{z.add(new Lt(new Ot(z.geometry,28),O.clone()))}catch{}}),l=new W(new Ze(.09,14,14),Ft(14711354,{emissive:14711354,emissiveIntensity:.6})),f.add(l),h.push(new R(0,.55,0),new R(0,.42,.55),new R(1.55,.55,0),new R(0,.12,1.55));let F=Ft(14205040,{emissive:11575360,emissiveIntensity:.15});for(let z=-3;z<=3;z++)for(let P=-2;P<=2;P++){if(Math.abs(z)+Math.abs(P)<1)continue;let H=new W(new Le(.04,.04,.03,8),F);H.position.set(z*.22,.72,P*.22),f.add(H)}d.label('<span class="c-green">HBM</span>',()=>new R(1.55,1.1,0),""),d.label('<span class="c-violet">NVLink</span>',()=>new R(0,.38,2.05),"",!0);let A=t.controls(i),U=t.readout(i);function k(){let z=4.6000000000000005,P=640/r,H=z+P;U.innerHTML=`Path: register \u2192 <b class="c-green">SRAM (5 pJ)</b> \u2192 <b class="c-green">HBM/DRAM (640 pJ)</b> \u2192 NVLink (900 GB/s). Horowitz 45 nm via Han et al. Reuse <b>${r}\xD7</b> \u2192 ~<b>${+(z+P).toPrecision(3)} pJ</b> per multiply-add; <b>${Math.round(P/H*100)}%</b> is moving data.`,d.invalidate()}t.slider(A,{label:"Reuse",name:"reuse",min:1,max:1e3,step:1,value:r,color:n.memory||n.cyan||"#2f8a62",fmt:z=>`${z}\xD7`,oninput:z=>{r=Math.round(z),k()}}),t.hint(i,"drag to turn \xB7 raise reuse to cut memory\u2019s share of each multiply-add"),k();let Y=bt([{obj:p,delay:0,drop:.28},{obj:E,delay:.12,drop:.22},{obj:_,delay:.22,drop:.42},{obj:S,delay:.32,drop:.42},{obj:N,delay:.48,drop:.3,fromScale:.45}],{dur:.95});return f.userData.reveal=Y,o=Y,Y.arm(),d.view.dist<6.3&&(d.view.dist=6.3),d.ready(),!0}var sy=(i,e,t)=>Math.max(e,Math.min(t,i)),Fd=.02585,ry=1.2,bn=.7,ay=.35,qr=i=>Math.log1p(Math.exp((i-ay)/(2*ry*Fd)))**2,xl=(i,e)=>qr(i)*(1-Math.exp(-Math.max(0,e)/Fd)),oy=xl(bn,bn);function ly(i){let e=0,t=bn;for(let s=0;s<40;s++){let r=(e+t)/2;xl(i,r)-xl(bn-i,bn-r)<0?e=r:t=r}let n=(e+t)/2;return{vo:n,i:xl(i,n)/oy,gn:qr(i)/qr(bn),gp:qr(bn-i)/qr(bn)}}function Bd(i,e){let t=e.ui,n=t.C,s=P=>P<560,r=.32,a=null,o,l,c,h,d=vt(i,{ui:t,label:"A CMOS inverter in three dimensions: a p-type transistor above an n-type, sharing the output node. Drag to turn; Input voltage flips the output.",height:P=>s(P)?Math.round(Math.max(300,P*.9)):Math.round(Math.min(600,P*.8)),radius:1.7,radiusY:1.6,yaw:.78,pitch:.38,target:new R(0,.95,0),fitPadY:1.08,fitPadX:.95,fov:32,autoFit:!0,busy:()=>!!(a&&!a.done),onShow(){a?.arm(),d&&d.invalidate()},step(P){return a&&!a.done?(a.tick(P),!0):!1}});if(!d)return!1;let{scene:u}=d;Mt(u,{hemi:.55,keyI:1.55,fillI:.25,rimI:.6,envI:.6,glintI:.5});let f=new be;u.add(f);let g=new be;f.add(g),g.add(ke(2.45,.2,1.35,J(13158596,{roughness:.42,metalness:.4,brush:!1}),.05)),g.children[0].position.set(0,-.28,0),ot(g,2.4,1.3,-.16,J(13158596,{roughness:.4}),{t:.03,railH:.05,overhang:.025});let y=new be;f.add(y);let m=ke(2.25,.14,.72,J(12095552,{roughness:.28,metalness:.85,emissive:8937504,emissiveIntensity:.1,clearcoat:.45,clearcoatRoughness:.15}),.045);m.position.set(0,1.95,0),y.add(m);let p=ke(2.25,.14,.72,J(6975608,{roughness:.4,metalness:.7}),.045);p.position.set(0,-.05,0),y.add(p);let w=new be;f.add(w),o=ke(1.15,.38,.95,J(4881100,{roughness:.28,metalness:.78,emissive:2775724,emissiveIntensity:.1,brushStrength:1.2,clearcoat:.35}),.06),o.position.set(0,1.45,0),w.add(o),ot(w,1.1,.9,1.66,J(9090288,{roughness:.32}),{t:.028,railH:.045,overhang:.018});let D=ke(.22,.58,1,J(9090288,{roughness:.3,metalness:.65}),.04);D.position.set(-.72,1.45,0),w.add(D);for(let P of[-.28,.28]){let H=new W(new Le(.07,.07,.035,12),J(12886112,{roughness:.28,metalness:.85}));H.position.set(.28,1.68,P),w.add(H)}let v=new be;f.add(v),l=ke(1.15,.38,.95,J(3832e3,{roughness:.28,metalness:.78,emissive:1726624,emissiveIntensity:.1,brushStrength:1.2,clearcoat:.35}),.06),l.position.set(0,.4,0),v.add(l),ot(v,1.1,.9,.61,J(8037600,{roughness:.32}),{t:.028,railH:.045,overhang:.018});let E=ke(.22,.58,1,J(9090288,{roughness:.3,metalness:.65}),.04);E.position.set(-.72,.4,0),v.add(E);for(let P of[-.28,.28]){let H=new W(new Le(.07,.07,.035,12),J(12886112,{roughness:.28,metalness:.85}));H.position.set(.28,.63,P),v.add(H)}let b=new be;f.add(b);let I=J(14212324,{roughness:.4,metalness:.2,opacity:.55,brush:!1}),_=J(14736596,{roughness:.5,metalness:.25});for(let P of[1.45,.4]){let H=ke(.07,.42,.88,I,.02);H.position.set(-.56,P,0),b.add(H);for(let L of[-1,1]){let $=ke(.13,.4,.11,_,.025);$.position.set(-.5,P,L*.44),b.add($)}}let S=new be;f.add(S);let N=J(12101752,{roughness:.3,metalness:.8,emissive:11044952,emissiveIntensity:.08});for(let[P,H,L]of[[.55,1.95,.25],[.55,.92,.25],[.55,-.05,.25]]){let $=new W(new Le(.065,.065,.22,12),N);$.position.set(P,H,L),S.add($);let te=new W(new Le(.11,.11,.045,12),N);te.position.set(P,H+.11,L),S.add(te)}c=new W(new Ze(.17,18,18),J(15255626,{roughness:.28,metalness:.7,emissive:15255626,emissiveIntensity:.4})),c.position.set(0,.92,0),S.add(c);let B=J(11580604,{roughness:.35,metalness:.75});for(let[P,H]of[[.38,1.72],[.52,.92],[.32,.18]]){let L=new W(new Le(.085,.085,P,14),B);L.position.set(0,H,0),S.add(L)}let O=J(4882372,{roughness:.32,metalness:.65,emissive:2777e3,emissiveIntensity:.18}),F=new W(new Le(.045,.045,1.2,12),O);F.position.set(-.72,.92,0),S.add(F);let A=new W(new Ze(.11,14,14),O);A.position.set(-.72,.92,.58),S.add(A),h=new W(new qi(.11,1.4,6,12),We(14711354,{emissive:14711354,emissiveIntensity:.5,opacity:0})),h.position.set(0,.95,0),f.add(h),d.label('<span class="c-yellow">out</span>',()=>new R(.5,.92,.4),"");let U=t.controls(i),k=t.readout(i);function Y(){let{vo:P,i:H,gn:L,gp:$}=ly(r);o?.material&&(o.material.emissiveIntensity=.06+.4*$),l?.material&&(l.material.emissiveIntensity=.06+.4*L),o.scale.set(1,.88+.22*$,1),l.scale.set(1,.88+.22*L,1),c.material.emissiveIntensity=.2+.55*(P/bn),c.material.color.setHex(P>bn/2?15255626:9080984);let te=sy(1-Math.abs(r-bn/2)/(bn/2),0,1),ce=.05+.55*te*Math.min(1,H*8);h.visible=ce>.08,h.material.opacity=ce,h.material.emissiveIntensity=.2+.7*te,h.material.transparent=!0;let pe=Math.floor(Math.log10(Math.max(H,1e-12))),se=H>=.01?`${Math.round(H*100)}%`:`${(H/10**pe).toFixed(1)}\xD710<sup>${pe}</sup>`;k.innerHTML=`<span class="c-blue">in</span> <b>${r.toFixed(2)} V</b> \u2192 <span class="c-yellow">out</span> <b>${P.toFixed(2)} V</b> \xB7 <span class="c-blue">pMOS</span>/<span class="c-blue">nMOS</span> current <b class="c-orange">${se}</b>${te>.4?" \xB7 both open":""}`,d.invalidate()}t.slider(U,{label:"Input",name:"vin",min:0,max:bn,step:.01,value:r,color:n.compute,fmt:P=>`${P.toFixed(2)} V`,oninput:P=>{r=P,Y()}}),t.hint(i,'drag to turn \xB7 <span class="c-blue">pMOS</span> above \xB7 <span class="c-blue">nMOS</span> below \xB7 slide Input through the middle'),Y();let z=bt([{obj:g,delay:0,drop:.2},{obj:y,delay:.08,drop:.22},{obj:w,delay:.18,drop:.28},{obj:v,delay:.28,drop:.28},{obj:b,delay:.38,drop:.15},{obj:S,delay:.48,drop:.2}],{dur:.9});return a=z,z.arm(),d.view.dist=Math.max(d.view.dist,7.4),d.ready(),!0}var Tt=4,ns=3*Tt-2,cy=1.05,hy=[[1,2,0,1],[0,1,1,2],[2,0,1,1],[1,1,0,2]],uy=[[1,0,2,1],[2,1,0,1],[0,2,1,0],[1,1,1,2]];function Od(i,e={}){return We(i,e)}function Hd(i,e){let t=e.ui,n=P=>P<560,s=Tt+.55,r=!0,a=.4,o=null,l=vt(i,{ui:t,label:"A four-by-four systolic array in three dimensions. Inputs march along rows, weights down columns; each cell multiplies the pair that meet and keeps a running total.",height:P=>n(P)?Math.round(Math.max(340,P*.95)):Math.round(Math.min(460,P*.55)),radius:3.2,radiusY:2.4,yaw:-.55,pitch:.48,target:new R(1.35,.35,1.35),fitPad:1.12,fov:30,busy:()=>r||o&&!o.done,onShow(){o?.arm(),l&&l.invalidate()},step(P){return o&&o.tick(P),!r&&!(o&&!o.done)?!1:a>0?(a-=P,U(),!0):(s=Math.min(ns+.999,s+P*cy),s>=ns+.999&&(r=!1,s=ns),U(),r)}});if(!l)return!1;Mt(l.scene,{hemi:1.4,keyI:1.15,fillI:.45,rimI:.35});let c=new be;l.scene.add(c);let h=.95,d=We(14869214,{shininess:30,specular:5592405}),u=J(13158596,{shininess:70}),f=J(11842736,{shininess:55}),g=J(12886112),y=[],m=new Oe(15319375),p=new Oe(14977104),w=new Oe;function D(P){let H=document.createElement("canvas");H.width=128,H.height=128;let L=H.getContext("2d");L.clearRect(0,0,128,128),L.font="700 56px ui-sans-serif, system-ui, sans-serif",L.textAlign="center",L.textBaseline="middle",L.fillStyle="#1a1a18",L.fillText(P,64,68);let $=new wn(H);$.colorSpace=Vt;let te=new sn({map:$,transparent:!0,depthWrite:!1}),ce=new W(new Bn(.5,.5),te);return ce.rotation.x=-Math.PI/2,ce.userData.canvas=H,ce.userData.ctx=L,ce.userData.tex=$,ce}for(let P=0;P<Tt;P++)for(let H=0;H<Tt;H++){let L=new be,$=ke(.7,.28,.7,d.clone(),.05);L.add($);let te=ke(.74,.035,.74,u,.02);te.position.y=.15,L.add(te);for(let se of[-1,1])for(let X=0;X<3;X++){let Z=new W(new we(.03,.14,.12),f);Z.position.set(se*.36,.02,-.18+X*.18),L.add(Z)}for(let se of[-1,1])for(let X=0;X<3;X++){let Z=new W(new we(.12,.14,.03),f);Z.position.set(-.18+X*.18,.02,se*.36),L.add(Z)}for(let se=0;se<8;se++){let X=se/8*Math.PI*2,Z=new W(new Le(.028,.028,.035,8),g);Z.position.set(Math.cos(X)*.28,.16,Math.sin(X)*.28),L.add(Z)}let ce=new W(new Ze(.045,10,10),We(4116420,{emissive:1940114,emissiveIntensity:.1}));ce.position.set(.22,.2,-.22),L.add(ce);let pe=D("0");pe.position.y=.2,L.add(pe),L.position.set(H*h,0,P*h),c.add(L),y.push({g:L,body:$,i:P,j:H,mat:$.material,glyph:pe,led:ce})}let v=Tt*h+.7,E=Tt*h+.7,b=new be;b.position.set((Tt-1)*h/2,-.2,(Tt-1)*h/2),c.add(b);let I=new W(jt(v,.1,E,.04),fi(14474456));b.add(I),ot(b,v-.08,E-.08,.07,J(11842736),{t:.035,railH:.05,overhang:.03}),fl(b,v-.12,.03,E-.12,J(13158596),.09);for(let P=0;P<Tt;P++){let H=new W(new we(Tt*h+.3,.015,.05),J(8962121,{shininess:60}));H.position.set((Tt-1)*h/2,-.13,P*h),c.add(H);let L=new W(new we(.05,.015,Tt*h+.3),J(5162176,{shininess:60}));L.position.set(P*h,-.125,(Tt-1)*h/2),c.add(L)}let _=bt([{obj:b,delay:0,drop:.18,fromScale:.7}].concat(y.map((P,H)=>({obj:P.g,delay:.12+H*.04,drop:.32,fromScale:.35}))),{dur:.75});o=_,_.arm();let S=Od(8962121,{emissive:5937706,emissiveIntensity:.3}),N=Od(5950401,{emissive:2795684,emissiveIntensity:.3}),B=[],O=[];for(let P=0;P<Tt;P++)for(let H=0;H<Tt;H++){let L=new W(new Ze(.12,12,12),S);L.visible=!1,c.add(L),B.push({mesh:L,i:P,k:H})}for(let P=0;P<Tt;P++)for(let H=0;H<Tt;H++){let L=new W(new Ze(.12,12,12),N);L.visible=!1,c.add(L),O.push({mesh:L,j:P,k:H})}let F=new Pt({color:2829098,transparent:!0,opacity:.1});c.traverse(P=>{if(!(!P.isMesh||!P.geometry||P.geometry.type==="SphereGeometry"||P.geometry.type==="CylinderGeometry"))try{P.add(new Lt(dl(P.geometry,28),F.clone()))}catch{}}),l.label('<span class="c-green">A \u2192</span>',()=>new R(-1.15,.55,(Tt-1)*h/2),""),l.label('<span class="c-cyan">B \u2193</span>',()=>new R((Tt-1)*h/2,.55,-1.15),"");function A(P,H,L){let $=0;for(let te=0;te<Tt;te++)te+P+H<=L&&($+=hy[P][te]*uy[te][H]);return $}function U(){let P=Math.floor(s),H=s-P,L=(ce,pe)=>H<=ce?0:H>=pe?1:(se=>se*se*(3-2*se))((H-ce)/(pe-ce)),$=P+L(.35,.7),te=P+L(.7,1);for(let{body:ce,i:pe,j:se,glyph:X,led:Z}of y){let me=ce.material,de=P-pe-se,_e=de>=0&&de<Tt,$e=P>=pe+se+Tt-1,dt=A(pe,se,P),Ke=A(pe,se,1e9)||1,tt=Math.max(0,Math.min(1,dt/Ke));if(w.setHex(14869214).lerp(m,Math.min(1,tt*1.6)).lerp(p,$e?1:Math.max(0,tt-.4)/.6*.7),me.color.copy(_e?m:w),me.emissive.copy(_e?m:w),me.emissiveIntensity=_e?.28:tt>0?.12:0,ce.scale.y=_e?1.15:1,Z&&(Z.material.emissiveIntensity=_e?.7:$e?.25:.08,Z.material.color.setHex(_e?15319375:$e?14977104:13158596)),X){let je=X.userData.ctx,ee=X.userData.tex;je.clearRect(0,0,128,128),je.font="700 56px ui-sans-serif, system-ui, sans-serif",je.textAlign="center",je.textBaseline="middle",je.fillStyle=$e?"#ffffff":dt?"#2a2622":"#9aa0a8",je.fillText(String(dt),64,68),ee.needsUpdate=!0}}for(let{mesh:ce,i:pe,k:se}of B){let X=$-se-pe,Z=X>-1.2&&X<Tt+.2;ce.visible=Z,Z&&ce.position.set(X*h,.35,pe*h)}for(let{mesh:ce,j:pe,k:se}of O){let X=te-se-pe,Z=X>-1.2&&X<Tt+.2;ce.visible=Z,Z&&ce.position.set(pe*h,.35,X*h)}z(),l.invalidate()}let k=t.controls(i),Y=t.readout(i);function z(){let P=Math.min(Math.floor(s),ns),H=0;for(let L=0;L<Tt;L++)for(let $=0;$<Tt;$++){let te=P-L-$;te>=0&&te<Tt&&H++}Y.innerHTML=P>=ns?`Done in <b>${ns}</b> ticks: <b class="c-blue">64</b> multiply-adds from <b>32</b> numbers, each reused four times.`:`Tick <b>${P}</b>: <b class="c-blue">${H}</b> of 16 cells multiplying \u2014 no cell goes back to memory.`}return t.button(k,"Play",()=>{s=0,a=.25,r=!0,U(),l.kick()},{kind:"primary",name:"sy3-play"}),t.button(k,"Next tick",()=>{r=!1,s=(Math.floor(s)+1)%(ns+1),U()},{name:"sy3-step"}),t.hint(i,'mid-wave \xB7 <span class="c-green">inputs</span> and <span class="c-cyan">weights</span> meet; sums warm to <span class="c-orange">orange</span>'),U(),l.view.dist<6.2&&(l.view.dist=6.2),l.ready(),!0}function is(i,e={}){return We(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function Gd(i,e){let t=new be;t.position.x=e,i.add(t),t.add(ke(2.2,.18,1.6,J(14211286,{roughness:.45,metalness:.4}),.05)),ot(t,2.15,1.55,.1,J(12632254),{t:.03,railH:.05,overhang:.025});let n=ke(2,.12,1.4,J(12632254,{roughness:.4}),.04);n.position.set(0,.14,0),t.add(n);let s=ke(.95,.14,.85,J(5219046,{emissive:2781104,emissiveIntensity:.12,roughness:.45,metalness:.3}),.035);s.position.set(0,.28,0),t.add(s),ot(t,.95,.85,.36,J(4163272),{t:.025,railH:.04,overhang:.02});for(let l=-2;l<=2;l++)for(let c=-1;c<=1;c++){if(Math.abs(l)+Math.abs(c)<1)continue;let h=new W(new Le(.03,.03,.02,8),J(14205040));h.position.set(l*.14,.37,c*.16),t.add(h)}let r=is(4168260,{emissive:2783796,emissiveIntensity:.15});for(let l of[-.85,.85])for(let c=0;c<8;c++){let h=c%2?3115602:4168260,d=new W(jt(.28,.048,.55,.012),is(h,{emissive:2783796,emissiveIntensity:.12}));if(d.position.set(l,.2+c*.055,0),t.add(d),c<7){let u=new W(new we(.26,.01,.5),is(13160648));u.position.set(l,.228+c*.055,0),t.add(u)}}let a=new W(jt(1.4,.06,.28,.02),is(9071288,{emissive:6965912,emissiveIntensity:.2}));a.position.set(0,.12,.75),t.add(a);let o=is(12886112);for(let l=-3;l<=3;l++)for(let c=-2;c<=2;c++){let h=new W(new Ze(.04,8,8),o);h.position.set(l*.22,-.12,c*.2),t.add(h)}return t}function zd(i,e){let t=e.ui,n=E=>E<560,s=.45,r=!0,a=null,o={a:new R(-2.2,.22,.75),b:new R(2.2,.22,.75),pulse:null},l=vt(i,{ui:t,label:"Two GPU packages on one board, joined by NVLink. A pulse crosses the link at Epoch\u2019s 900 GB/s bandwidth.",height:E=>n(E)?300:280,radius:2.38,radiusY:1.52,yaw:-.58,pitch:.32,target:new R(0,.1,.1),fitPad:1.18,fov:28,busy:()=>r||a&&!a.done,onShow(){a?.arm(),l&&l.invalidate()},step(E){return a&&a.tick(E),o.pulse?(s=(s+E*.35)%1,o.pulse.position.lerpVectors(o.a,o.b,s),l.invalidate(),!0):!!(a&&!a.done)}});if(!l)return!1;Mt(l.scene,{hemi:.95,keyI:1.25,fillI:.36,rimI:.45,envI:1});let c=new be;l.scene.add(c);let h=ke(6.8,.12,2.8,fi(14474456),.04);h.position.y=-.28,c.add(h),ot(c,6.7,2.7,-.2,J(11842736),{t:.035,railH:.05,overhang:.03});let d=is(4880984,{opacity:.7});for(let E=-2;E<=2;E++){let b=new W(new we(6.4,.02,.04),d);b.position.set(0,-.2,E*.35),c.add(b)}let u=Gd(c,-2.2),f=Gd(c,2.2),g=new be;c.add(g);let y=J(9071288,{emissive:6965912,emissiveIntensity:.42,roughness:.28,metalness:.82,brushStrength:1.25}),m=ke(2.7,.03,.55,J(6965912,{roughness:.35,metalness:.7,emissive:4860536,emissiveIntensity:.18}),.02);m.position.set(0,.14,.5),g.add(m);for(let E=-3;E<=3;E++){let b=ke(2.65,.07,.075,y,.022);b.position.set(0,.2,.5+E*.085),g.add(b)}for(let E of[-1.25,1.25])for(let b=-3;b<=3;b++){let I=new W(new Le(.055,.055,.09,12),J(14205040,{roughness:.32,metalness:.85}));I.rotation.z=Math.PI/2,I.position.set(E,.2,.5+b*.085),g.add(I)}let p=new W(new Ze(.11,14,14),is(14711354,{emissive:14711354,emissiveIntensity:.55}));p.position.lerpVectors(o.a,o.b,s),c.add(p),o.pulse=p;let w=new Pt({color:2829098,transparent:!0,opacity:.22});c.traverse(E=>{if(!(!E.isMesh||!E.geometry||E.geometry.type==="SphereGeometry"))try{E.add(new Lt(dl(E.geometry,28),w.clone()))}catch{}}),l.label('<span class="c-violet">NVLink</span>',()=>new R(0,.55,1.15),"");let D=t.readout(i);D.innerHTML='Pulse on <b class="c-violet">NVLink</b> \xB7 Epoch <b>900 GB/s</b> (bandwidth only). Leaving package A is the off-die hop.',t.hint(i,'packages <span class="c-blue">A</span>/<span class="c-blue">B</span> \xB7 <span class="c-violet">NVLink</span> 900 GB/s \xB7 mid-crossing');let v=bt([{obj:u,delay:0,drop:.35},{obj:f,delay:.15,drop:.35},{obj:g,delay:.35,drop:.2,fromScale:.5}],{dur:.9});return a=v,v.arm(),l.view.dist<5.9&&(l.view.dist=5.9),l.ready(),!0}function dy(i){let e=i>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function yl(i,e={}){return We(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function kd(i,e){let t=e.ui,n=A=>A<560,s=150,r=20,a=.1,o=!1,l=null,c=vt(i,{ui:t,label:"A three-hundred-millimetre wafer with random defects. Drag die size; good dies stay blue.",height:A=>(n(A),400),radius:2.45,radiusY:1.8,yaw:-.2,pitch:.44,target:new R(0,.15,0),fitPad:1.1,fov:28,busy:()=>!!(l&&!l.done),onShow(){l?.arm(),c&&c.invalidate()},step(A){return l&&!l.done?(l.tick(A),!0):!1}});if(!c)return!1;Mt(c.scene,{hemi:.95,keyI:1.3,fillI:.38,rimI:.42,envI:1});let h=new be;c.scene.add(h);let d=1/58,u=s*d,f=J(14212326,{roughness:.28,metalness:.55,brush:!1,emissive:11581640,emissiveIntensity:.04}),g=new W(new Le(u*.55,u*.7,.18,48),J(9080984,{roughness:.4,metalness:.75}));g.position.y=-.14,h.add(g),ot(h,u*1.15,u*1.15,-.02,J(10528944),{t:.03,railH:.05,overhang:.02});let y=new W(new Le(u,u,.08,64),f);h.add(y);let m=new W(new Nt(u-.02,.035,8,64),J(12633808,{roughness:.35,metalness:.7}));m.rotation.x=Math.PI/2,m.position.y=.04,h.add(m);let p=new W(new Nt(u-.08,.018,6,64),J(14212326,{shininess:90}));p.rotation.x=Math.PI/2,p.position.y=.05,h.add(p);let w=new W(jt(.18,.1,.12,.025),yl(12107464));w.position.set(0,.02,-u+.02),h.add(w);for(let A=0;A<6;A++){let U=A/6*Math.PI*2,k=new W(new Le(.04,.04,.04,10),J(5922920));k.position.set(Math.cos(U)*u*.35,-.04,Math.sin(U)*u*.35),h.add(k)}let D=new be;h.add(D);let v=new be;h.add(v);let E=yl(4878292,{emissive:2772916,emissiveIntensity:.12}),b=yl(13660240,{emissive:11554864,emissiveIntensity:.15}),I=yl(2829098,{emissive:1118481,emissiveIntensity:.1});function _(){let A=dy(11),U=Math.round(a*Math.PI*15**2),k=[];for(;k.length<U;){let H=(A()*2-1)*s,L=(A()*2-1)*s;H*H+L*L<s*s&&k.push([H,L])}let Y=o?r/2:r,z=[],P=0;for(let H=-s;H<s;H+=Y)for(let L=-s;L<s;L+=Y){if([[L,H],[L+Y,H],[L,H+Y],[L+Y,H+Y]].some(([te,ce])=>te*te+ce*ce>(s-3)**2))continue;let $=k.some(([te,ce])=>te>=L&&te<L+Y&&ce>=H&&ce<H+Y);$||P++,z.push([L,H,$])}return{dies:z,defects:k,gross:z.length,good:P,a:Y}}function S(){for(;D.children.length;)D.remove(D.children[0]);for(;v.children.length;)v.remove(v.children[0]);let{dies:A,defects:U,a:k}=_(),z=Math.max(.04,k*d-.015),P=.07,H=J(4878292,{emissive:2772916,emissiveIntensity:.14,roughness:.45,metalness:.55,brush:!1}),L=J(13660240,{emissive:11554864,emissiveIntensity:.18,roughness:.45,metalness:.5,brush:!1}),$=J(6983636),te=J(14717040);for(let[ce,pe,se]of A){let Z=z>.07?ke(z,P,z,se?L:H,Math.min(.02,z*.15)):new W(new we(z,P,z),se?b:E);if(Z.position.set((ce+k/2)*d,.08,(pe+k/2)*d),D.add(Z),z>.1){let me=ke(z+.012,.014,z+.012,se?te:$,.008);me.position.set((ce+k/2)*d,.08+P/2+.005,(pe+k/2)*d),D.add(me)}}for(let[ce,pe]of U){let se=new W(new Ze(.035,8,8),I);se.position.set(ce*d,.14,pe*d),v.add(se)}O(),c.invalidate()}let N=t.controls(i),B=t.readout(i);function O(){let{gross:A,good:U}=_(),k=r*r/100,Y=Math.exp(o?-k/4*a:-k*a);B.innerHTML=o?`Four <span class="c-blue">chiplets</span> of ${r/2}\xD7${r/2} mm: <b>${U}</b> of ${A} good (~${Math.round(Y*100)}%) \u2192 ${Math.floor(U/4)} complete chips.`:`<b>${r}\xD7${r} mm</b> die (${(k*100).toFixed(0)} mm\xB2): <b class="c-blue">${U}</b> of ${A} good (~${Math.round(Y*100)}% by formula).`}t.slider(N,{label:"Die side (mm)",name:"yd-side",min:5,max:30,step:1,value:r,color:t.C.compute,fmt:A=>`${A}`,oninput:A=>{r=A,S()}}),t.slider(N,{label:"Defects / cm\xB2",name:"yd-d0",min:.02,max:.5,step:.01,value:a,color:t.C.heat,fmt:A=>A.toFixed(2),oninput:A=>{a=A,S()}}),t.button(N,"Split into four chiplets",()=>{o=!o,S()},{name:"yd3-chip"}),t.hint(i,'<span class="c-blue">good dies</span> \xB7 <span class="c-orange">defects</span> \xB7 drag size'),S();let F=bt([{obj:g,delay:0,drop:.15},{obj:y,delay:.12,drop:.18},{obj:D,delay:.3,drop:.12},{obj:v,delay:.45,drop:.1}],{dur:.9});return l=F,F.arm(),c.view.dist<7.05&&(c.view.dist=7.05),c.ready(),!0}var fy=(i,e,t,n)=>i+(e-i)*Math.min(1,t*n);function Yr(i,e,t,n,s){let r=new be;r.position.set(e,t,n),i.add(r);let a=Qi(204),o=J(4878292,{emissive:2772916,emissiveIntensity:.05}),l=J(12886112,{shininess:55,specular:8939059}),c=J(10134188,{shininess:60}),h=J(14209216,{shininess:80,specular:16777215}),d=ke(1.4,.1,.9,a,.04);d.position.y=0,r.add(d);let u=new W(new Le(.14,.14,.85,20),o);u.rotation.z=Math.PI/2,u.position.set(0,.32,0),r.add(u);for(let E=0;E<9;E++){let b=new W(new Nt(.2,.035,8,20),l);b.rotation.y=Math.PI/2,b.position.set(-.36+E*.09,.32,0),r.add(b)}let f=new W(jt(.08,.55,.55,.025),J(10923188));f.position.set(-.55,.35,0),r.add(f);let g=new W(jt(.08,.55,.55,.025),J(10923188));g.position.set(.55,.35,0),r.add(g);let y=new be;y.position.set(.62,.62,0),r.add(y);let m=new W(jt(.95,.08,.22,.025),c);m.position.set(.4,0,0),y.add(m);let p=new W(new we(.95,.02,.24),J(9080984));p.position.set(.4,.05,0),y.add(p);let w=new W(new Ze(.07,14,14),h);w.position.set(.88,0,0),y.add(w);let D=new W(new Ze(.06,12,12),h);D.position.set(1.35,.48,0),r.add(D);let v=new W(new Le(.04,.04,.35,10),J(9080984));return v.position.set(1.35,.28,0),r.add(v),{g:r,armRoot:y,tip:w,core:u,mCoil:o,label:s}}function Vd(i,e){let t=e.ui,n=O=>O<560,s={a:!0,b:!0,arm:[.92,.35],series:!0},r=[0,0],a=null,o=vt(i,{ui:t,label:"Two soft-solid relays. Each coil pulls an armature that closes a contact. Series = AND, parallel = OR.",height:O=>n(O)?420:380,radius:2.75,radiusY:1.55,yaw:-.42,pitch:.36,target:new R(.5,.45,.15),fitPad:1.24,fov:28,busy:()=>!0,onShow(){a?.arm(),o&&o.invalidate()},step(O){if(a&&!a.done)return a.tick(O),b(),!0;let F=!1;return[s.a,s.b].forEach((A,U)=>{let k=A?1:0,Y=s.arm[U],z=fy(Y,k,12,O);s.arm[U]=Math.abs(z-k)<.002?k:z,Math.abs(s.arm[U]-k)>.002&&(F=!0),Y<.9&&s.arm[U]>=.9&&(r[U]=.45),r[U]>0&&(r[U]-=O)}),b(),F||r[0]>0||r[1]>0||t.isPlaying()}});if(!o)return!1;Mt(o.scene,{hemi:1.4,keyI:1.2,fillI:.45,rimI:.32});let l=new be;o.scene.add(l);let c=ke(4.6,.12,2.6,Qi(222),.05);c.position.set(.5,-.12,.05),l.add(c),ot(l,4.5,2.5,-.04,Qi(196,{lift:.3}),{t:.035,railH:.05,overhang:.03});let h=Yr(l,-1.3,0,.2,"A"),d=Yr(l,.9,0,.2,"B"),u=[h,d],f=new be;f.position.set(2.6,.35,.2),l.add(f);let g=new W(new Ze(.28,20,20),We(15000800,{shininess:40}));f.add(g);let y=new W(new Le(.18,.22,.2,14),J(9080984));y.position.y=-.3,f.add(y);let m=J(5924976,{shininess:40}),p=J(15255626,{emissive:15255626,emissiveIntensity:.45,shininess:50}),w=[];function D(O,F,A,U){let k=A-O,Y=U-F,z=Math.hypot(k,Y),P=new W(new we(z,.03,.05),m.clone());return P.position.set((O+A)/2,.02,(F+U)/2),P.rotation.y=-Math.atan2(Y,k),l.add(P),w.push(P),P}D(-1.3,.2,.9,.2),D(.9,.2,2.4,.2),D(-1.3,-.5,2.4,-.5),o.label('<span class="c-orange">A</span>',()=>new R(-1.3,.85,.2),""),o.label('<span class="c-orange">B</span>',()=>new R(.9,.85,.2),""),o.label('<span class="c-yellow">lamp</span>',()=>new R(2.6,.85,.2),"");let v=[o.label('<span class="c-orange">click</span>',()=>new R(-.1,.85,.2),""),o.label('<span class="c-orange">click</span>',()=>new R(2.1,.85,.2),"")],E=[];[[-1.3,-1],[.9,-1]].forEach(([O,F],A)=>{let U=new W(jt(.45,.18,.45,.05),Kn(14212326,{emissive:0,emissiveIntensity:0}));U.position.set(O,.05,F),U.userData.key=A,l.add(U),E.push(U)});function b(){u.forEach((Y,z)=>{let P=s.arm[z];Y.armRoot.rotation.z=-.42+(.02- -.42)*P;let H=[s.a,s.b][z];Y.mCoil.emissiveIntensity=H?.35:.05,Y.mCoil.color.setHex(H?6986464:4878292),E[z].material.emissive=new Oe(H?4878292:0),E[z].material.emissiveIntensity=H?.25:0,E[z].position.y=H?0:.05,v[z].el.style.opacity=r[z]>0?String(Math.min(1,r[z]*3)):"0"});let A=s.arm[0]>.92,U=s.arm[1]>.92,k=s.series?A&&U:A||U;g.material.emissive=new Oe(k?15245344:0),g.material.emissiveIntensity=k?.7:0,g.material.color.setHex(k?15910991:15000800),w.forEach((Y,z)=>{let P=k||z===0&&A;Y.material.color.copy(P?p.color:m.color),Y.material.emissive.copy(P?p.emissive:m.emissive),Y.material.emissiveIntensity=P?.4:0}),S(),o.invalidate()}let I=t.controls(i),_=t.readout(i);function S(){let O=s.series?s.arm[0]>.92&&s.arm[1]>.92:s.arm[0]>.92||s.arm[1]>.92;_.innerHTML=s.series?`Series = <b>AND</b>: both <span class="c-blue">coils</span> must pull. Lamp is <b>${O?"on":"off"}</b>.`:`Parallel = <b>OR</b>: either <span class="c-blue">armature</span> closes the lamp. Lamp is <b>${O?"on":"off"}</b>.`}t.segmented&&t.segmented(I,{label:"Contacts",value:!0,options:[{label:"series (AND)",value:!0,name:"rl3-ser"},{label:"parallel (OR)",value:!1,name:"rl3-par"}],onchange:O=>{s.series=O,b(),o.kick()}}),t.button(I,"Toggle A",()=>{s.a=!s.a,o.kick()},{name:"rl3-a"}),t.button(I,"Toggle B",()=>{s.b=!s.b,o.kick()},{name:"rl3-b"}),t.hint(i,'tap keys or buttons \xB7 watch the <span class="c-blue">armature</span> click'),o.canvas.addEventListener("pointerup",O=>{});let N=new ui,B=new Ue;return o.canvas.addEventListener("click",O=>{let F=o.canvas.getBoundingClientRect();B.set((O.clientX-F.left)/F.width*2-1,-((O.clientY-F.top)/F.height)*2+1),N.setFromCamera(B,o.camera);let A=N.intersectObjects(E,!0)[0];A&&(A.object.userData.key===0?s.a=!s.a:s.b=!s.b,o.kick())}),a=bt([{obj:c,delay:0,drop:.2},{obj:h.g,delay:.1,drop:.28},{obj:d.g,delay:.25,drop:.28},{obj:f,delay:.4,drop:.22}]),b(),o.view.dist<6&&(o.view.dist=6),o.ready(),!0}var yi=[{k:"g",label:"g-line 436 nm",lam:436,na:.45,yr:"1980s"},{k:"i",label:"i-line 365 nm",lam:365,na:.6,yr:"1990s"},{k:"krf",label:"KrF 248 nm",lam:248,na:.8,yr:"around 2000"},{k:"arf",label:"ArF 193 nm",lam:193,na:.93,yr:"2000s"},{k:"arfi",label:"ArF immersion",lam:193,na:1.35,yr:"since ~2007"},{k:"euv",label:"EUV 13.5 nm",lam:13.5,na:.33,yr:"since 2019"},{k:"hna",label:"High-NA EUV",lam:13.5,na:.55,yr:"2025\u201326"}];var py=(i,e,t)=>Math.max(e,Math.min(t,i)),lh=.4,my=(i,e,t)=>{let n=i/(2*t*e),s=py((2-n)/.2,0,1),r=.5,a=1/Math.PI;return s?s*2*r*a/(s*(r*r+a*a)+(1-s)*r*r):0},$r=i=>i.lam<20;function Wd(i,e){let t=e.ui,n=G=>G<560,s=4,r=60,a=0,o=null,l=!1,c=()=>my(yi[s].lam,yi[s].na,r),h=vt(i,{ui:t,label:"Light through a chrome mask onto photoresist on a wafer. Features blur as half-pitch nears the wavelength limit.",height:G=>n(G)?400:380,radius:2,radiusY:1.75,yaw:.36,pitch:.48,target:new R(0,.9,0),fitPad:1.14,fov:32,busy:()=>!0,onShow(){o?.arm(),h&&h.invalidate()},step(G){return o&&!o.done&&o.tick(G),a+=G,u.forEach((Q,he)=>{Q.material.opacity=(Q.userData.op??1)*(.25+.35*(.5+.5*Math.sin(a*4+he*.4)))}),h.invalidate(),t.isPlaying()}});if(!h)return!1;Mt(h.scene,{hemi:.95,keyI:1.25,fillI:.36,rimI:.42,envI:1});let d=new be;h.scene.add(d);let u=[],f=[],g=[],y=null,m=new W(new Le(1.6,1.6,.12,48),J(12173514,{roughness:.35,metalness:.55,brush:!1}));m.position.y=0,d.add(m),Ws(d,1.55,.04,.06,J(11055288)),Ws(d,1.4,.02,.08,J(12634320,{shininess:90}));let p=new W(new Le(1.45,1.45,.06,40),We(7259296,{opacity:.55,shininess:20}));p.position.y=.12,d.add(p),y=new W(new Le(1.35,1.35,.05,40),di(8308968,{opacity:0,shininess:95,specular:16777215})),y.position.y=.22,y.visible=!1,d.add(y);let w=ke(2.6,.06,1.4,di(13162728,{opacity:.4}),.03);w.position.y=1.15,d.add(w);let D=new be;d.add(D);let v=ke(2.7,.04,1.5,J(9080984,{roughness:.3,metalness:.8}),.025);v.position.y=1.12,D.add(v),ot(D,2.7,1.5,1.16,J(10133672),{t:.03,railH:.05,overhang:.025});let E=ke(2.6,.06,1.4,J(5926028,{roughness:.2,metalness:.85}),.03);E.position.y=1.15,E.visible=!1,D.add(E);let b=(G,Q)=>new R(G,Q,0),I={x:-1.2,y:3.3,sx:.8},_=6*Math.PI/180,S=b(I.x,I.y-.07),N=b(-2.45,2.55),B=b(S.x-1.6*Math.sin(_),S.y-1.6*Math.cos(_)),O=b(S.x+.9*Math.sin(_),S.y-.9*Math.cos(_)),F=b(1.3,2.85),A=b(.5,2.4),U=b(1.6,1.55),k=b(1.2,.85),Y=b(0,1.4),z=b(0,.18),P=new be;P.visible=!1,d.add(P);let H=J(14673130,{roughness:.1,metalness:.92}),L=J(8028296,{roughness:.35,metalness:.8}),$=(G,Q,he,ge)=>{let re=new be,oe=new W(new Le(1,1,.2,40),L);oe.position.y=.27,re.add(oe);let xe=new Ze(3,40,6,0,Math.PI*2,0,Math.asin(1/3));xe.translate(0,-3*Math.cos(Math.asin(1/3)),0);let Te=new W(xe,H);Te.material.side=Ut,Te.userData.noInk=!0,re.add(Te);let Ee=Q.clone().sub(G).normalize().add(he.clone().sub(G).normalize()).normalize();return re.quaternion.setFromUnitVectors(new R(0,-1,0),Ee),re.position.copy(G),re.scale.setScalar(ge),P.add(re),re};$(B,N,S,.2),$(O,S,F,.2),$(F,O,A,.22),$(A,F,U,.2),$(U,A,k,.22),$(k,U,Y,.16);let te=$(Y,k,z,.5),ce=new R(0,-1,0).applyQuaternion(te.quaternion),pe=new be;pe.position.copy(N),P.add(pe);let se=B.clone().sub(N).normalize(),X=new W(new Ze(.42,32,10,0,Math.PI*2,0,Math.PI*.42),H);X.material=H.clone(),X.material.side=Ut,X.quaternion.setFromUnitVectors(new R(0,1,0),se.clone().negate()),X.userData.noInk=!0,pe.add(X);let Z=new W(new Ze(.07,16,12),We(14268671,{emissive:11566335,emissiveIntensity:1}));Z.userData.noInk=!0,pe.add(Z);let me=J(12106948,{roughness:.25,metalness:.9});for(let G=-4;G<=4;G++)if(G){let Q=new W(new Ze(.028,10,8),me);Q.position.set(0,0,G*.14),pe.add(Q)}let de=dt(N.clone().addScaledVector(se,-.9),N,.035,We(14696490,{emissive:13643808,emissiveIntensity:.6,opacity:.85}));de.position.z=0,de.position.sub(N),pe.add(de);let _e=G=>{let Q=Math.asin(G),he=new R(-ce.y,ce.x,0),ge=.1;for(let re=0;re<40;re++){let oe=Y.clone().addScaledVector(he,ge),xe=Y.clone().addScaledVector(he,-ge),Te=(Math.abs(Math.atan2(oe.x-z.x,oe.y-z.y))+Math.abs(Math.atan2(xe.x-z.x,xe.y-z.y)))/2;ge*=Q/Te}return ge},$e=new Lt(new Ot(new we(5.4,3.85,2.2)),new Pt({color:9080984,transparent:!0,opacity:.55}));$e.position.set(-.5,1.68,0),P.add($e);function dt(G,Q,he,ge){let re=Q.x-G.x,oe=Q.y-G.y,xe=Math.hypot(re,oe),Te=new W(new we(he,xe,.07),ge);return Te.position.set((G.x+Q.x)/2,(G.y+Q.y)/2,0),Te.rotation.z=Math.atan2(oe,re)-Math.PI/2,Te}let Ke=new W(new Le(.85,.95,.22,40),di(11061480,{opacity:.38,shininess:95}));Ke.position.y=.72,d.add(Ke);let tt=new W(new Le(1,1.05,.08,40),J(10923188));tt.position.y=.58,d.add(tt);let je=new W(new Nt(1.32,.025,8,48),di(10410224,{opacity:.55}));je.rotation.x=Math.PI/2,je.position.y=.24,je.userData.noInk=!0,d.add(je),y.userData.meniscus=je;let ee=new be;d.add(ee);let ve=new W(new Le(.35,.4,.18,24),We(15319375,{emissive:15245344,emissiveIntensity:.45,shininess:20}));ve.position.y=2.05,ee.add(ve);let Qe=new W(new Le(.45,.45,.12,24),J(6975608,{roughness:.3,metalness:.8}));Qe.position.y=2.2,ee.add(Qe);let nt=new W(new Le(.55,.4,.14,24),di(13162728,{opacity:.35}));nt.position.y=1.85,ee.add(nt),ot(ee,.9,.9,2.28,J(8028296),{t:.025,railH:.04,overhang:.02});function Xe(){g.forEach(q=>{d.remove(q),q.geometry?.dispose()}),f.forEach(q=>{d.remove(q),q.geometry?.dispose()}),u.forEach(q=>{d.remove(q),q.geometry?.dispose()}),g=[],f=[],u=[];let G=c(),Q=$r(yi[s]),he=yi[s].k==="arfi";w.visible=!Q,E.visible=Q,P.visible=Q,Ke.visible=tt.visible=nt.visible=!Q,ee.visible=!Q,D.position.set(Q?I.x:0,Q?I.y-1.15:0,0),D.scale.x=Q?I.sx:1,Q&&te.scale.setScalar(_e(yi[s].na)),Q!==l&&(l=Q,h.setFocus(Q?{target:new R(-.5,1.7,0),radius:2.95,radiusY:2.2,yaw:.85,pitch:.3}:{target:new R(0,.9,0),radius:2,radiusY:1.75,yaw:.36,pitch:.48})),y&&(y.visible=he,y.material.opacity=he?.42:0,y.material.transparent=!0,y.userData.meniscus&&(y.userData.meniscus.visible=he));let ge=7,re=2.2,oe=re/ge,xe=oe*.45,Te=oe-xe,Ee=Math.max(0,(1-G)*xe*.65),Ae=J(3815992,{shininess:90,specular:16777215}),Ve=-re/2;for(let q=0;q<ge;q++){let Se=Ve+q*oe+Te+xe/2,le=Ve+q*oe+Te/2,Me=new W(new we(Math.max(.02,Te),.035,1.2),Ae);Q?(Me.position.set(I.x+le*I.sx,I.y-.07,0),Me.scale.set(I.sx,2.2,1)):Me.position.set(le,1.185,0),d.add(Me),g.push(Me);let Re=We(15314992,{opacity:.4,emissive:15245344,emissiveIntensity:.3,shininess:5});if(!Q){let ue=new W(new we(xe*.65,.95,.07),Re);ue.position.set(Se,.62,0),d.add(ue),u.push(ue)}if(G>lh){let ue=We(2787944,{opacity:Math.min(.95,.4+G*.55),emissive:1731144,emissiveIntensity:.12}),He=Math.max(.035,xe-2*Ee),Ne=new W(new we(He,.05,1.05),ue);Ne.position.set(Se,.16,0),d.add(Ne),f.push(Ne)}}let Ye=new W(new we(Math.max(.02,Te),.035,1.2),Ae),it=Ve+ge*oe+Te/2;if(Q?(Ye.position.set(I.x+it*I.sx,I.y-.07,0),Ye.scale.set(I.sx,2.2,1)):Ye.position.set(it,1.185,0),d.add(Ye),g.push(Ye),Q){let q=()=>We(15314992,{opacity:.4,emissive:15245344,emissiveIntensity:.3,shininess:5});[[N,B],[B,S],[S,O],[O,F],[F,A],[A,U],[U,k],[k,Y]].forEach(([rt,Qt])=>{let pn=dt(rt,Qt,.07,q());d.add(pn),u.push(pn)});let Se=te.scale.x,le=new R(-ce.y,ce.x,0),Me=new R(0,0,1),Re=[z.x,z.y,z.z];for(let rt=0;rt<=40;rt++){let Qt=rt/40*Math.PI*2;Re.push(...Y.clone().addScaledVector(le,Se*Math.cos(Qt)).addScaledVector(Me,Se*Math.sin(Qt)).toArray())}let ue=[];for(let rt=1;rt<=40;rt++)ue.push(0,rt,rt+1);let He=new wt;He.setAttribute("position",new at(Re,3)),He.setIndex(ue),He.computeVertexNormals();let Ne=q();Ne.side=Ut,Ne.depthWrite=!1;let xt=new W(He,Ne);xt.userData.op=.55,d.add(xt),u.push(xt)}if(G<=lh){let q=new W(new we(2.2,.04,1.05),We(8947848,{opacity:.35}));q.position.set(0,.16,0),d.add(q),f.push(q)}x(),h.invalidate()}let j=h.label('<span class="c-grey">mask</span>',()=>$r(yi[s])?new R(I.x+1.1*I.sx,I.y+.06,0):new R(1.7,1.35,0),""),C=G=>()=>$r(yi[s])?G():null;h.label('<span class="c-grey">mirrors</span>',C(()=>new R(F.x+.1,F.y+.25,0)),""),h.label('<span class="c-grey">vacuum</span>',C(()=>new R(-2.6,3.6,-1.1)),""),h.label('<span class="c-grey">wafer</span>',C(()=>new R(-2.1,.12,.9)),"",!0);let fe=h.label("",C(()=>new R(-3,.4,.4)),"");h.label('<span class="c-grey">tin plasma,<br>hit by a CO\u2082 laser</span>',C(()=>new R(N.x-.55,N.y-.3,0)),"",!0);let ye=t.controls(i),M=t.readout(i);function x(){let G=yi[s],Q=G.lam/(4*G.na),he=c();j.el.innerHTML=$r(G)?'<span class="c-grey">reflective mask, lit at ~6\xB0</span>':'<span class="c-grey">mask</span>',fe.el.innerHTML=`<span class="c-yellow">NA ${G.na} cone</span>${G.k==="hna"?'<br><span class="c-grey">anamorphic 4\xD7/8\xD7</span>':""}`,M.innerHTML=`${G.label} \xB7 NA ${G.na}${G.k==="arfi"?' \xB7 <span class="c-cyan">immersion film</span>':$r(G)?" \xB7 vacuum, reflective mask, mirrors":""}: <b>${r} nm</b> lines (k\u2081 = ${(r*G.na/G.lam).toFixed(2)}) at <b>${Math.round(he*100)}%</b> contrast${he>lh?"":", too little to print"}. Floor \u2248 <b>${Math.round(Q*10)/10} nm</b>.`}t.segmented&&t.segmented(ye,{label:"Source",value:s,options:yi.map((G,Q)=>({label:G.k==="arfi"?"ArFi":G.k==="hna"?"High-NA":G.k.toUpperCase(),value:Q,name:"li3-"+G.k})),onchange:G=>{s=G,Xe()}}),t.slider(ye,{label:"Half-pitch (nm)",name:"li3-hp",min:5,max:500,step:1,value:r,color:t.C.memory,fmt:G=>`${G}`,oninput:G=>{r=G,Xe()}}),t.hint(i,'<span class="c-yellow">\u03BB</span> through mask \u2192 <span class="c-green">resist</span> on <span class="c-blue">wafer</span> \xB7 drag pitch until blur'),Xe();let V=bt([{obj:m,delay:0,drop:.18},{obj:p,delay:.1,drop:.12},{obj:Ke,delay:.22,drop:.2},{obj:w,delay:.35,drop:.22},{obj:Qe,delay:.48,drop:.25}],{dur:.95});return o=V,V.arm(),h.view.dist<6.7&&(h.view.dist=6.7),h.ready(),!0}var _l=[{name:"embed",short:"embed",cost:"1\xD7",col:12886112,em:10780736},{name:"attention",short:"attn",cost:"4\xD7",col:6986464,em:4881088},{name:"MLP",short:"MLP",cost:"8\xD7",col:4878292,em:2772916},{name:"unembed",short:"out",cost:"1\xD7",col:9071288,em:6965912}];function Xd(i,e){let t=e.ui,n=I=>I<560,s=1,r=0,a=null,o=vt(i,{ui:t,label:"One transformer block as four stages. Token ribbons feed embed and leave unembed; attention arcs cross the context.",height:I=>n(I)?320:300,radius:3.5,radiusY:1.48,yaw:-.42,pitch:.42,target:new R(1.72,.45,0),fitPad:1.35,fov:28,busy:()=>!0,step(I){return a&&a.tick(I),r+=I,f.forEach((_,S)=>{let N=(r*.35+S*.17)%1;_.bead.position.lerpVectors(_.a,_.b,N)}),m.forEach((_,S)=>{_.mat.opacity=.15+.35*(s===1?.5+.5*Math.sin(r*3+S):.25)}),o.invalidate(),!0},onShow(){a?.arm(),o&&o.invalidate()}});if(!o)return!1;Mt(o.scene,{hemi:1.35,keyI:1.15,fillI:.4,rimI:.32});let l=new be;o.scene.add(l);let c=1.72,h=ke(4.7,.12,2,Kn(15264486),.05);h.position.set(c,-.18,0),l.add(h);let d=ke(4.75,.04,2.05,J(13685964,{roughness:.38}),.03);d.position.set(c,-.12,0),l.add(d);{let I=new be;I.position.x=c,l.add(I),ot(I,4.65,1.95,-.1,J(13159620),{t:.03,railH:.05,overhang:.025})}let u=[];_l.forEach((I,_)=>{let S=new be;S.position.set(_*1.15,0,0),l.add(S);let N=J(I.col,{emissive:I.em,emissiveIntensity:.1,roughness:.42,metalness:.55,brush:!0}),B=.55+(I.cost==="8\xD7"?.45:I.cost==="4\xD7"?.25:0),O=ke(.9,B,1,N,.05);O.position.y=B/2,S.add(O),ot(S,.9,1,B+.02,J(12107976),{t:.035,railH:.05,overhang:.025});for(let F of[-1,1])for(let A=0;A<3;A++){let U=new W(new we(.035,B*.55,.18),J(11055288));U.position.set(F*.42,B*.35,-.2+A*.2),S.add(U)}for(let F=0;F<4;F++){let A=new W(new we(.7,.03,.03),J(10134445));A.position.set(0,.12+F*(B*.2),.52),S.add(A)}for(let F of[-.3,.3]){let A=new W(new Ze(.04,10,10),We(I.col,{emissive:I.em,emissiveIntensity:.35}));A.position.set(F,B+.08,-.35),S.add(A)}if(u.push({g:S,body:O,mat:N,h:B}),_<3){let F=new W(new Le(.07,.07,.22,12),J(10134445,{shininess:70}));F.rotation.z=Math.PI/2,F.position.set(_*1.15+.55,.38,0),l.add(F);for(let A of[_*1.15+.45,_*1.15+.65]){let U=new W(new Le(.1,.1,.06,12),J(9080984));U.rotation.z=Math.PI/2,U.position.set(A,.38,0),l.add(U)}}});let f=[],g=We(15255626,{emissive:15255626,emissiveIntensity:.25,opacity:.85,shininess:20});function y(I,_,S,N,B,O){let F=new R(I,_,S),A=new R(N,B,O),U=F.distanceTo(A),k=new W(new we(U,.04,.1),g.clone());k.position.copy(F).add(A).multiplyScalar(.5),k.lookAt(A),k.rotateY(Math.PI/2),k.rotation.set(0,0,0),k.scale.set(1,1,1);let Y=N-I,z=O-S;k.geometry.dispose(),k.geometry=new we(Math.hypot(Y,z)||U,.035,.09),k.position.set((I+N)/2,(_+B)/2,(S+O)/2),k.rotation.y=-Math.atan2(z,Y),l.add(k);let P=new W(new Ze(.09,12,12),We(16764006,{emissive:16755251,emissiveIntensity:.55}));P.position.copy(F),l.add(P),f.push({a:F,b:A,bead:P,rib:k})}y(-1.15,.35,-.55,-.35,.35,-.3),y(-1.15,.28,-.2,-.35,.4,-.05),y(-1.15,.42,.15,-.35,.3,.2),y(-1.15,.32,.45,-.35,.38,.4),y(-1.15,.48,.65,-.35,.28,.55),y(.45,.55,.35,.85,.65,.35),y(.45,.4,-.25,.85,.5,-.25),y(1.6,.7,-.35,2,.85,-.35),y(1.6,.55,.3,2,.7,.3),y(2.75,.95,.25,3.15,.55,.25),y(2.75,.75,-.3,3.15,.45,-.3),y(3.85,.4,-.4,4.7,.35,-.55),y(3.85,.35,-.05,4.7,.38,.05),y(3.85,.42,.3,4.7,.4,.4),y(3.85,.3,.55,4.7,.32,.6);let m=[];for(let I=0;I<11;I++){let _=We(6986464,{opacity:.28,emissive:4881088,emissiveIntensity:.22,shininess:10}),S=new W(new Nt(.28+I*.07,.015,6,28,Math.PI*.95),_);S.rotation.x=Math.PI/2,S.rotation.z=-.55+I*.12,S.position.set(1.15,u[1].h+.22+I%4*.05,-.15+I%3*.1),l.add(S),m.push({mesh:S,mat:_})}o.label('<span class="c-yellow">embed</span>',()=>new R(0,u[0].h+.55,-.15),""),o.label('<span class="c-blue">attn</span>',()=>new R(1.15,u[1].h+.7,-.15),""),o.label('<span class="c-blue">MLP</span>',()=>new R(2.3,u[2].h+.55,-.15),"");function p(){u.forEach((I,_)=>{let S=_===s;I.mat.emissiveIntensity=S?.42:.08,I.body.scale.setScalar(S?1.06:1)}),E(),o.invalidate()}let w=t.controls(i),D=t.readout(i),v=["Tokens become vectors \u2014 table lookup, small next to what follows.","Every token looks at earlier ones. Cost grows with context \xD7 width.","Feed-forward MLP dominates FLOPs in a dense block (~\u2154 of arithmetic).","Vectors \u2192 next-token logits. Softmax over the vocabulary."];function E(){D.innerHTML=`<b class="c-blue">${_l[s].name}</b> (~${_l[s].cost}): ${v[s]} Dense forward \u2248 <b>2N</b> FLOPs/token.`}t.slider(w,{label:"Stage",name:"xf-stage",min:0,max:3,step:1,value:s,color:t.C.learn,fmt:I=>_l[Math.round(I)].short,oninput:I=>{s=Math.round(I),p()}}),t.hint(i,'<span class="c-yellow">token</span> ribbons \xB7 height \u2248 FLOPs \xB7 mid on <span class="c-blue">attention</span> \xB7 out in prose'),p();let b=bt(u.map((I,_)=>({obj:I.g,delay:_*.1,drop:.35,fromScale:.45})),{dur:.9});return a=b,b.arm(),o.view.dist<6.8&&(o.view.dist=6.8),o.ready(),!0}var gy=(i,e,t,n)=>i+(e-i)*Math.min(1,t*n);function qd(i,e){let t=e.ui,n=B=>B<560,s={a:!0,arm:[.92,.55]},r=null,a=vt(i,{ui:t,label:"Relay cascade: the first contact energises the second coil. Logic stacks without a hand on the second key.",height:B=>n(B)?360:320,radius:2.6,radiusY:1.4,yaw:-.4,pitch:.36,target:new R(.5,.55,.2),fitPad:1.15,fov:26,busy:()=>!0,onShow(){r?.arm(),a&&a.invalidate()},step(B){if(r&&!r.done)return r.tick(B),E(),!0;let O=s.a,F=s.arm[0]>.9;return[[O,0],[F,1]].forEach(([A,U])=>{let k=A?1:0,Y=gy(s.arm[U],k,10,B);s.arm[U]=Math.abs(Y-k)<.002?k:Y}),E(),!0}});if(!a)return!1;Mt(a.scene,{hemi:1.4,keyI:1.2,fillI:.45,rimI:.32});let o=new be;a.scene.add(o);let l=ke(4.4,.12,2.1,Qi(222),.05);l.position.set(.55,-.1,-.05),o.add(l),ot(o,4.3,2,-.02,Qi(196,{lift:.3}),{t:.035,railH:.05,overhang:.03});let c=Yr(o,-1.2,0,.55,"A"),h=Yr(o,.7,0,-.55,"B"),d=[c,h];[[-1.6,.55],[-.4,.2],[.9,-.35],[2,-.4]].forEach(([B,O],F,A)=>{if(F===A.length-1)return;let[U,k]=A[F+1],Y=U-B,z=k-O,P=Math.hypot(Y,z),H=new W(new we(P,.02,.07),J(13215820,{shininess:55}));H.position.set((B+U)/2,-.04,(O+k)/2),H.rotation.y=-Math.atan2(z,Y),o.add(H)});let u=new W(new we(1.6,.04,.08),J(15255626,{emissive:15255626,emissiveIntensity:.2}));u.position.set(-.15,.55,.05),u.rotation.y=-.55,o.add(u);let f=new W(new we(1.55,.03,.05),J(13938762,{emissive:15255626,emissiveIntensity:.12}));f.position.set(-.15,.48,.12),f.rotation.y=-.55,o.add(f);let g=[];for(let B=0;B<3;B++){let O=new W(new Ze(.055,10,10),We(16764006,{emissive:16755251,emissiveIntensity:.4}));O.position.set(-.9+B*.55,.58,.35-B*.28),o.add(O),g.push(O)}let y=new be;y.position.set(2.5,.35,-.4),o.add(y);let m=new W(new Le(.22,.28,.12,16),J(9080984));m.position.y=-.28,y.add(m);let p=new W(new Ze(.26,18,18),We(15000800,{shininess:40}));y.add(p);let w=new W(new we(1.1,.03,.05),J(13215820));w.position.set(1.85,.12,-.4),o.add(w);let D=new W(jt(.45,.18,.45,.05),Kn(14212326,{emissive:0,emissiveIntensity:0}));D.position.set(-1.2,.05,1.05),o.add(D);let v=new W(new Le(.06,.06,.2,10),J(10134445));v.position.set(-1.2,-.02,1.05),o.add(v),a.label('<span class="c-orange">A</span>',()=>new R(-1.2,.85,.55),""),a.label('<span class="c-orange">B</span> <span class="c-grey">driven</span>',()=>new R(.7,.85,-.55),""),a.label('<span class="c-yellow">lamp</span>',()=>new R(2.5,.85,-.4),""),a.label('<span class="c-orange">cascade</span>',()=>new R(-.1,.85,.2),"");function E(){d.forEach((A,U)=>{let k=s.arm[U];A.armRoot.rotation.z=-.42+(.02- -.42)*k;let Y=U===0?s.a:s.arm[0]>.9;A.mCoil.emissiveIntensity=Y?.35:.05,A.mCoil.color.setHex(Y?6986464:4878292)});let F=s.arm[1]>.9;p.material.emissive=new Oe(F?15245344:0),p.material.emissiveIntensity=F?.7:0,p.material.color.setHex(F?15910991:15000800),u.material.emissiveIntensity=s.arm[0]>.9?.55:.12,f.material.emissiveIntensity=s.arm[0]>.9?.4:.08,g.forEach((A,U)=>{let k=s.arm[0]>.9;A.material.emissiveIntensity=k?.65:.1,A.visible=k||U===0}),D.material.emissiveIntensity=s.a?.25:0,D.position.y=s.a?0:.05,_(),a.invalidate()}let b=t.controls(i),I=t.readout(i);function _(){I.innerHTML=s.a?`Key A down: coil A pulls \u2192 contact feeds <b class="c-blue">coil B</b>. Lamp <b>${s.arm[1]>.9?"on":"catching up"}</b>.`:"Release A and both armatures fall. Stacked contacts \u2014 Shannon depth, lever mass still hurts."}t.button(b,"Toggle A",()=>{s.a=!s.a,a.kick()},{kind:"primary",name:"rc3-a"}),t.hint(i,'one key \xB7 <span class="c-orange">cascade</span> throws the second coil');let S=new ui,N=new Ue;return a.canvas.addEventListener("click",B=>{let O=a.canvas.getBoundingClientRect();N.set((B.clientX-O.left)/O.width*2-1,-((B.clientY-O.top)/O.height)*2+1),S.setFromCamera(N,a.camera),S.intersectObject(D,!0)[0]&&(s.a=!s.a,a.kick())}),r=bt([{obj:l,delay:0,drop:.2},{obj:c.g,delay:.12,drop:.28},{obj:h.g,delay:.28,drop:.28},{obj:y,delay:.42,drop:.22},{obj:D,delay:.5,drop:.15,fromScale:.6}]),E(),a.view.dist<6&&(a.view.dist=6),a.ready(),!0}var ch=(i,e,t)=>Math.max(e,Math.min(t,i));function vl(i,e={}){return We(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function Yd(i,e){let t=e.ui,n=t.C,s=A=>A<560,r=20,a=2.2,o=20,l=null,c=vt(i,{ui:t,label:"Two piles on a desk: model parameters and training tokens. The height ratio is tokens per parameter. Drag sideways to turn; the slider sets the ratio. About 20:1 is compute-optimal (Chinchilla).",height:A=>s(A)?Math.round(Math.max(300,A*.9)):Math.round(Math.min(420,A*.52)),radius:3.8,radiusY:2.8,yaw:-.55,pitch:.48,target:new R(0,1.35,0),fitPad:1.25,fov:36,busy:()=>!!(l&&!l.done)||t.isPlaying(),onShow(){l?.arm(),c&&c.invalidate()},step(A){if(l&&!l.done)return l.tick(A),!0;if(!t.isPlaying())return E.forEach(k=>k.m.visible=!1),!1;let U=S(v);return E.forEach(k=>{k.t+=A/1.1,k.t>=1&&(k.t-=1,k.x=(Math.random()-.5)*.7,k.z=(Math.random()-.5)*.7);let Y=k.t*k.t;k.m.visible=k.t>0,k.m.position.set(1.5+k.x,U+1.5-1.38*Y,k.z),k.m.rotation.set(k.t*2.1,k.t*1.3,0)}),!0}});if(!c)return!1;let{scene:h}=c;Mt(h,{hemi:.95,keyI:1.3,fillI:.38,rimI:.45,envI:1});let d=new be;h.add(d);let u=ke(5.2,.12,2.9,J(12888186,{roughness:.45,metalness:.35,brush:!1}),.04);u.position.y=0,d.add(u);{let A=ke(5.35,.08,3.05,J(11044960,{roughness:.4,metalness:.4,brush:!1}),.03);A.position.set(0,-.08,0),d.add(A)}ot(d,5.15,2.85,.08,J(12097640),{t:.035,railH:.05,overhang:.03});let f=new be;f.position.set(-1.4,.06,0),d.add(f);let g=vl(4878292,{emissive:2772916,emissiveIntensity:.12}),y=J(14205040);for(let A=0;A<4;A++)for(let U=0;U<3;U++)for(let k=0;k<3;k++){let Y=new W(new we(.32,.32,.32),g);if(Y.position.set((U-1)*.36,.2+A*.36,(k-1)*.36),f.add(Y),A===3){let z=new W(new we(.34,.03,.34),J(6983636));z.position.copy(Y.position),z.position.y+=.175,f.add(z)}}fl(f,1.15,.04,1.15,J(3825588),1.55);let m=new be;m.position.set(1.5,.06,0),d.add(m);let p=vl(4168260,{emissive:2783796,emissiveIntensity:.1}),w=[],D=24;for(let A=0;A<D;A++)for(let U=0;U<4;U++)for(let k=0;k<4;k++){if(A>8&&(U+k+A)%3===0)continue;let Y=new W(new we(.22,.22,.22),p.clone());Y.position.set((U-1.5)*.26+A%2*.05,.14+A*.23,(k-1.5)*.26+A%2*.04),Y.visible=!1,m.add(Y),w.push({mesh:Y,layer:A})}let v=2,E=[0,-.36,-.7].map(A=>{let U=new W(new we(.22,.22,.22),p);return U.visible=!1,d.add(U),{m:U,t:A,x:(Math.random()-.5)*.7,z:(Math.random()-.5)*.7}}),b=new W(new we(2.4,.06,.08),vl(6971480));b.position.set(.05,.55,1.2),d.add(b);let I=new W(new Ze(.1,12,12),vl(14711354,{emissive:14711354,emissiveIntensity:.4}));I.position.set(.05,.7,1.2),d.add(I);let _=new Pt({color:2829098,transparent:!0,opacity:.2});d.traverse(A=>{if(!(!A.isMesh||!A.geometry||A.geometry.type==="SphereGeometry"))try{A.add(new Lt(new Ot(A.geometry,30),_.clone()))}catch{}}),c.label('<span class="c-blue">parameters</span>',()=>new R(-1.4,1.85,0),""),c.label('<span class="c-green">tokens</span>',()=>new R(2.8,a,.25),""),c.label("~20:1 optimal",()=>Math.abs(r-o)<3?new R(.05,1,1.2):null,"");function S(A){return .14+Math.max(0,A-1)*.23+.12}function N(){let A=ch(Math.round(2+Math.log10(Math.max(r,1))*8.5),2,16);v=A;for(let{mesh:z,layer:P}of w)z.visible=P<A;let U=S(A),k=ch(.85+U*.35,1,2.4);c.setFocus({target:new R(0,k,0),radius:3.8,radiusY:Math.max(2.4,U*.85+.6),pitch:.46});let Y=ch(Math.log10(r/2)/Math.log10(100/2),0,1);I.position.x=-1+Y*2.1,a=Math.max(.5,U*.62),c.invalidate()}let B=t.controls(i),O=t.readout(i);function F(){let A=r>=o?r>o*1.5?"past compute-optimal \u2014 more tokens than Chinchilla would spend on this model size":"near compute-optimal (Chinchilla ~20 tokens per parameter)":"under-trained vs Chinchilla \u2014 more parameters than the token budget warrants";O.innerHTML=`<b>${r>=10?Math.round(r):r.toPrecision(2)} tokens per parameter</b> \xB7 ${A}.`,N()}return t.slider(B,{label:"Tokens / param",name:"ratio",min:1,max:200,step:1,value:r,color:n.learn||n.cyan||"#3f9a44",fmt:A=>`${A}\xD7`,oninput:A=>{r=A,F()}}),t.hint(i,"raise toward 20\xD7 (Chinchilla)"),F(),c.view.dist=Math.max(c.view.dist,7.6),l=bt([{obj:u,delay:0,drop:.15},{obj:f,delay:.15,drop:.35},{obj:m,delay:.35,drop:.45}]),c.ready(),!0}window.AIX3D={lossSurface:bd,mosfet3d:wd,factoryZoom:Rd,triode3d:Ld,coldPlate3d:Nd,package3d:Ud,tokenBalance3d:Yd,cmos3d:Bd,systolic3d:Hd,nvlinkPair3d:zd,yield3d:kd,relay3d:Vd,litho3d:Wd,transformer3d:Xd,cascade3d:qd};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
