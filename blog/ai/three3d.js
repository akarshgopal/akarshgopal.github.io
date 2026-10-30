(()=>{var Qh=0,oc=1,eu=2;var Tr=1,tu=2,Ds=3,Tn=0,Ht=1,Ut=2,Zn=0,Ns=1,Ar=2,lc=3,cc=4,nu=5;var Zi=100,iu=101,su=102,ru=103,au=104,ou=200,lu=201,cu=202,hu=203,hc=204,uc=205,uu=206,du=207,fu=208,pu=209,mu=210,gu=211,xu=212,yu=213,_u=214,wa=0,Ta=1,Aa=2,Ms=3,Ra=4,Ca=5,Ia=6,Pa=7,Rr=0,vu=1,Mu=2,Gn=0,dc=1,fc=2,pc=3,Cr=4,mc=5,gc=6,xc=7;var yc=300,Di=301,Ji=302,uo=303,fo=304,Ir=306,Wi=1e3,Xn=1001,La=1002,Zt=1003,bu=1004;var Pr=1005;var Kt=1006,po=1007;var Ni=1008;var dn=1009,_c=1010,vc=1011,Us=1012,mo=1013,zn=1014,An=1015,kn=1016,go=1017,xo=1018,Fs=1020,Mc=35902,bc=35899,Ec=1021,Sc=1022,Rn=1023,qn=1026,Ui=1027,yo=1028,_o=1029,Fi=1030,vo=1031;var Mo=1033,Lr=33776,Dr=33777,Nr=33778,Ur=33779,bo=35840,Eo=35841,So=35842,wo=35843,To=36196,Ao=37492,Ro=37496,Co=37488,Io=37489,Fr=37490,Po=37491,Lo=37808,Do=37809,No=37810,Uo=37811,Fo=37812,Bo=37813,Oo=37814,Ho=37815,Go=37816,zo=37817,ko=37818,Vo=37819,Wo=37820,Xo=37821,qo=36492,Yo=36494,$o=36495,Zo=36283,Jo=36284,Br=36285,Ko=36286;var ir=2300,Da=2301,Ea=2302,Kl=2303,jl=2400,Ql=2401,ec=2402;var Eu=3200;var Bs=0,Su=1,Cn="",Vt="srgb",sr="srgb-linear",rr="linear",bt="srgb";var Ai=7680,wc=7681;var Tc=517;var jo=519,wu=512,Tu=513,Au=514,Qo=515,Ru=516,Cu=517,el=518,Iu=519,Pu=35044;var Ac="300 es",Un=2e3,bs=2001;function nf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function sf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Lu(){let i=ar("canvas");return i.style.display="block",i}var vh={},Es=null;function Rc(...i){let e="THREE."+i.shift();Es?Es("log",e,...i):console.log(e,...i)}function Du(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ke(...i){i=Du(i);let e="THREE."+i.shift();if(Es)Es("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Qe(...i){i=Du(i);let e="THREE."+i.shift();if(Es)Es("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Vi(...i){let e=i.join(" ");e in vh||(vh[e]=!0,Ke(...i))}function Nu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Uu={[wa]:Ta,[Aa]:Ia,[Ra]:Pa,[Ms]:Ca,[Ta]:wa,[Ia]:Aa,[Pa]:Ra,[Ca]:Ms},Yn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Sa=Math.PI/180,Na=180/Math.PI;function Or(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function ht(i,e,t){return Math.max(e,Math.min(t,i))}function rf(i,e){return(i%e+e)%e}function El(i,e,t){return(1-t)*i+t*e}function Ys(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function hn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Nc=class Nc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Nc.prototype.isVector2=!0;var Ue=Nc,$n=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],m=r[a+2],y=r[a+3];if(d!==y||l!==u||c!==f||h!==m){let g=l*u+c*f+h*m+d*y;g<0&&(u=-u,f=-f,m=-m,y=-y,g=-g);let p=1-o;if(g<.9995){let w=Math.acos(g),P=Math.sin(w);p=Math.sin(p*w)/P,o=Math.sin(o*w)/P,l=l*p+u*o,c=c*p+f*o,h=h*p+m*o,d=d*p+y*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+m*o,d=d*p+y*o;let w=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=w,c*=w,h*=w,d*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+h*d+l*f-c*u,e[t+1]=l*m+h*u+c*d-o*f,e[t+2]=c*m+h*f+o*u-l*d,e[t+3]=h*m-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Uc=class Uc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Sl.copy(this).projectOnVector(e),this.sub(Sl)}reflect(e){return this.sub(Sl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Uc.prototype.isVector3=!0;var C=Uc,Sl=new C,Mh=new $n,Fc=class Fc{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],y=s[0],g=s[3],p=s[6],w=s[1],P=s[4],v=s[7],b=s[2],E=s[5],I=s[8];return r[0]=a*y+o*w+l*b,r[3]=a*g+o*P+l*E,r[6]=a*p+o*v+l*I,r[1]=c*y+h*w+d*b,r[4]=c*g+h*P+d*E,r[7]=c*p+h*v+d*I,r[2]=u*y+f*w+m*b,r[5]=u*g+f*P+m*E,r[8]=u*p+f*v+m*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,m=t*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return e[0]=d*y,e[1]=(s*c-h*n)*y,e[2]=(o*n-s*a)*y,e[3]=u*y,e[4]=(h*t-s*l)*y,e[5]=(s*r-o*t)*y,e[6]=f*y,e[7]=(n*l-c*t)*y,e[8]=(a*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Vi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(wl.makeScale(e,t)),this}rotate(e){return Vi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(wl.makeRotation(-e)),this}translate(e,t){return Vi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(wl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Fc.prototype.isMatrix3=!0;var st=Fc,wl=new st,bh=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Eh=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function af(){let i={enabled:!0,workingColorSpace:sr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===bt&&(s.r=li(s.r),s.g=li(s.g),s.b=li(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===bt&&(s.r=vs(s.r),s.g=vs(s.g),s.b=vs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Cn?rr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Vi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Vi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[sr]:{primaries:e,whitePoint:n,transfer:rr,toXYZ:bh,fromXYZ:Eh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Vt},outputColorSpaceConfig:{drawingBufferColorSpace:Vt}},[Vt]:{primaries:e,whitePoint:n,transfer:bt,toXYZ:bh,fromXYZ:Eh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Vt}}}),i}var ft=af();function li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var as,Ua=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{as===void 0&&(as=ar("canvas")),as.width=e.width,as.height=e.height;let s=as.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=as}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ar("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=li(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(li(t[n]/255)*255):t[n]=li(t[n]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},of=0,Ss=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=Or(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Tl(s[a].image)):r.push(Tl(s[a]))}else r=Tl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Tl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ua.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}var lf=0,Al=new C,ln=class i extends Yn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Xn,s=Xn,r=Kt,a=Ni,o=Rn,l=dn,c=i.DEFAULT_ANISOTROPY,h=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lf++}),this.uuid=Or(),this.name="",this.source=new Ss(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Al).x}get height(){return this.source.getSize(Al).y}get depth(){return this.source.getSize(Al).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wi:e.x=e.x-Math.floor(e.x);break;case Xn:e.x=e.x<0?0:1;break;case La:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wi:e.y=e.y-Math.floor(e.y);break;case Xn:e.y=e.y<0?0:1;break;case La:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=yc;ln.DEFAULT_ANISOTROPY=1;var Bc=class Bc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],y=l[2],g=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let P=(c+1)/2,v=(f+1)/2,b=(p+1)/2,E=(h+u)/4,I=(d+y)/4,_=(m+g)/4;return P>v&&P>b?P<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(P),s=E/n,r=I/n):v>b?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=E/s,r=_/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=I/r,s=_/r),this.set(n,s,r,t),this}let w=Math.sqrt((g-m)*(g-m)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(g-m)/w,this.y=(d-y)/w,this.z=(u-h)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Bc.prototype.isVector4=!0;var It=Bc,Fa=class extends Yn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new ln(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ss(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends Fa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},or=class extends ln{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ba=class extends ln{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ho=class ho{constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,m,y,g)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,m,y,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ho().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/os.setFromMatrixColumn(e,0).length(),r=1/os.setFromMatrixColumn(e,1).length(),a=1/os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,f=a*d,m=o*h,y=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=u-y*c,t[9]=-o*l,t[2]=y-u*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,m=c*h,y=c*d;t[0]=u+y*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=y+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,m=c*h,y=c*d;t[0]=u-y*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=y-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,m=o*h,y=o*d;t[0]=l*h,t[4]=m*c-f,t[8]=u*c+y,t[1]=l*d,t[5]=y*c+u,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*h,t[4]=y-u*d,t[8]=m*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+m,t[10]=u-y*d}else if(e.order==="XZY"){let u=a*l,f=a*c,m=o*l,y=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+y,t[5]=a*h,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*h,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(cf,e,hf)}lookAt(e,t,n){let s=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),bi.crossVectors(n,pn),bi.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),bi.crossVectors(n,pn)),bi.normalize(),Kr.crossVectors(pn,bi),s[0]=bi.x,s[4]=Kr.x,s[8]=pn.x,s[1]=bi.y,s[5]=Kr.y,s[9]=pn.y,s[2]=bi.z,s[6]=Kr.z,s[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],w=n[3],P=n[7],v=n[11],b=n[15],E=s[0],I=s[4],_=s[8],S=s[12],N=s[1],B=s[5],O=s[9],F=s[13],R=s[2],U=s[6],G=s[10],q=s[14],H=s[3],L=s[7],z=s[11],D=s[15];return r[0]=a*E+o*N+l*R+c*H,r[4]=a*I+o*B+l*U+c*L,r[8]=a*_+o*O+l*G+c*z,r[12]=a*S+o*F+l*q+c*D,r[1]=h*E+d*N+u*R+f*H,r[5]=h*I+d*B+u*U+f*L,r[9]=h*_+d*O+u*G+f*z,r[13]=h*S+d*F+u*q+f*D,r[2]=m*E+y*N+g*R+p*H,r[6]=m*I+y*B+g*U+p*L,r[10]=m*_+y*O+g*G+p*z,r[14]=m*S+y*F+g*q+p*D,r[3]=w*E+P*N+v*R+b*H,r[7]=w*I+P*B+v*U+b*L,r[11]=w*_+P*O+v*G+b*z,r[15]=w*S+P*F+v*q+b*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],m=e[3],y=e[7],g=e[11],p=e[15],w=l*f-c*u,P=o*f-c*d,v=o*u-l*d,b=a*f-c*h,E=a*u-l*h,I=a*d-o*h;return t*(y*w-g*P+p*v)-n*(m*w-g*b+p*E)+s*(m*P-y*b+p*I)-r*(m*v-y*E+g*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],m=e[12],y=e[13],g=e[14],p=e[15],w=t*o-n*a,P=t*l-s*a,v=t*c-r*a,b=n*l-s*o,E=n*c-r*o,I=s*c-r*l,_=h*y-d*m,S=h*g-u*m,N=h*p-f*m,B=d*g-u*y,O=d*p-f*y,F=u*p-f*g,R=w*F-P*O+v*B+b*N-E*S+I*_;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let U=1/R;return e[0]=(o*F-l*O+c*B)*U,e[1]=(s*O-n*F-r*B)*U,e[2]=(y*I-g*E+p*b)*U,e[3]=(u*E-d*I-f*b)*U,e[4]=(l*N-a*F-c*S)*U,e[5]=(t*F-s*N+r*S)*U,e[6]=(g*v-m*I-p*P)*U,e[7]=(h*I-u*v+f*P)*U,e[8]=(a*O-o*N+c*_)*U,e[9]=(n*N-t*O-r*_)*U,e[10]=(m*E-y*v+p*w)*U,e[11]=(d*v-h*E-f*w)*U,e[12]=(o*S-a*B-l*_)*U,e[13]=(t*B-n*S+s*_)*U,e[14]=(y*P-m*b-g*w)*U,e[15]=(h*b-d*P+u*w)*U,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,m=r*d,y=a*h,g=a*d,p=o*d,w=l*c,P=l*h,v=l*d,b=n.x,E=n.y,I=n.z;return s[0]=(1-(y+p))*b,s[1]=(f+v)*b,s[2]=(m-P)*b,s[3]=0,s[4]=(f-v)*E,s[5]=(1-(u+p))*E,s[6]=(g+w)*E,s[7]=0,s[8]=(m+P)*I,s[9]=(g-w)*I,s[10]=(1-(u+y))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=os.set(s[0],s[1],s[2]).length(),o=os.set(s[4],s[5],s[6]).length(),l=os.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ln.copy(this);let c=1/a,h=1/o,d=1/l;return Ln.elements[0]*=c,Ln.elements[1]*=c,Ln.elements[2]*=c,Ln.elements[4]*=h,Ln.elements[5]*=h,Ln.elements[6]*=h,Ln.elements[8]*=d,Ln.elements[9]*=d,Ln.elements[10]*=d,t.setFromRotationMatrix(Ln),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Un,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),m,y;if(l)m=r/(a-r),y=a*r/(a-r);else if(o===Un)m=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===bs)m=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Un,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s),m,y;if(l)m=1/(a-r),y=a/(a-r);else if(o===Un)m=-2/(a-r),y=-(a+r)/(a-r);else if(o===bs)m=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ho.prototype.isMatrix4=!0;var mt=ho,os=new C,Ln=new mt,cf=new C(0,0,0),hf=new C(1,1,1),bi=new C,Kr=new C,pn=new C,Sh=new mt,wh=new $n,Fn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Sh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wh.setFromEuler(this),this.setFromQuaternion(wh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Fn.DEFAULT_ORDER="XYZ";var ws=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},uf=0,Th=new C,ls=new $n,ni=new mt,jr=new C,$s=new C,df=new C,ff=new $n,Ah=new C(1,0,0),Rh=new C(0,1,0),Ch=new C(0,0,1),Ih={type:"added"},pf={type:"removed"},cs={type:"childadded",child:null},Rl={type:"childremoved",child:null},kt=class i extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=Or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new Fn,n=new $n,s=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new mt},normalMatrix:{value:new st}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ws,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(Ah,e)}rotateY(e){return this.rotateOnAxis(Rh,e)}rotateZ(e){return this.rotateOnAxis(Ch,e)}translateOnAxis(e,t){return Th.copy(e).applyQuaternion(this.quaternion),this.position.add(Th.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ah,e)}translateY(e){return this.translateOnAxis(Rh,e)}translateZ(e){return this.translateOnAxis(Ch,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?jr.copy(e):jr.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt($s,jr,this.up):ni.lookAt(jr,$s,this.up),this.quaternion.setFromRotationMatrix(ni),s&&(ni.extractRotation(s.matrixWorld),ls.setFromRotationMatrix(ni),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ih),cs.child=e,this.dispatchEvent(cs),cs.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pf),Rl.child=e,this.dispatchEvent(Rl),Rl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ih),cs.child=e,this.dispatchEvent(cs),cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,e,df),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,ff,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};kt.DEFAULT_UP=new C(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Me=class extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},mf={type:"move"},Ts=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Me,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Me,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Me,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let y of e.hand.values()){let g=t.getJointPose(y,n),p=this._getHandJoint(c,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Me;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Fu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},Qr={h:0,s:0,l:0};function Cl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var He=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,ft.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ft.workingColorSpace){if(e=rf(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Cl(a,r,e+1/3),this.g=Cl(a,r,e),this.b=Cl(a,r,e-1/3)}return ft.colorSpaceToWorking(this,s),this}setStyle(e,t=Vt){function n(r){r!==void 0&&parseFloat(r)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vt){let n=Fu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=li(e.r),this.g=li(e.g),this.b=li(e.b),this}copyLinearToSRGB(e){return this.r=vs(e.r),this.g=vs(e.g),this.b=vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vt){return ft.workingToColorSpace(nn.copy(this),e),Math.round(ht(nn.r*255,0,255))*65536+Math.round(ht(nn.g*255,0,255))*256+Math.round(ht(nn.b*255,0,255))}getHexString(e=Vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.workingToColorSpace(nn.copy(this),t);let n=nn.r,s=nn.g,r=nn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ft.workingColorSpace){return ft.workingToColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=Vt){ft.workingToColorSpace(nn.copy(this),e);let t=nn.r,n=nn.g,s=nn.b;return e!==Vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ei),this.setHSL(Ei.h+e,Ei.s+t,Ei.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ei),e.getHSL(Qr);let n=El(Ei.h,Qr.h,t),s=El(Ei.s,Qr.s,t),r=El(Ei.l,Qr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new He;He.NAMES=Fu;var Xi=class extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Dn=new C,ii=new C,Il=new C,si=new C,hs=new C,us=new C,Ph=new C,Pl=new C,Ll=new C,Dl=new C,Nl=new It,Ul=new It,Fl=new It,oi=class i{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Dn.subVectors(e,t),s.cross(Dn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Dn.subVectors(s,t),ii.subVectors(n,t),Il.subVectors(e,t);let a=Dn.dot(Dn),o=Dn.dot(ii),l=Dn.dot(Il),c=ii.dot(ii),h=ii.dot(Il),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,si.x),l.addScaledVector(a,si.y),l.addScaledVector(o,si.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Nl.setScalar(0),Ul.setScalar(0),Fl.setScalar(0),Nl.fromBufferAttribute(e,t),Ul.fromBufferAttribute(e,n),Fl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Nl,r.x),a.addScaledVector(Ul,r.y),a.addScaledVector(Fl,r.z),a}static isFrontFacing(e,t,n,s){return Dn.subVectors(n,t),ii.subVectors(e,t),Dn.cross(ii).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dn.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),Dn.cross(ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;hs.subVectors(s,n),us.subVectors(r,n),Pl.subVectors(e,n);let l=hs.dot(Pl),c=us.dot(Pl);if(l<=0&&c<=0)return t.copy(n);Ll.subVectors(e,s);let h=hs.dot(Ll),d=us.dot(Ll);if(h>=0&&d<=h)return t.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(hs,a);Dl.subVectors(e,r);let f=hs.dot(Dl),m=us.dot(Dl);if(m>=0&&f<=m)return t.copy(r);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(us,o);let g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return Ph.subVectors(r,s),o=(d-h)/(d-h+(f-m)),t.copy(s).addScaledVector(Ph,o);let p=1/(g+y+u);return a=y*p,o=u*p,t.copy(n).addScaledVector(hs,a).addScaledVector(us,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},xn=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Nn):Nn.fromBufferAttribute(r,a),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ea.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ea.copy(n.boundingBox)),ea.applyMatrix4(e.matrixWorld),this.union(ea)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),ta.subVectors(this.max,Zs),ds.subVectors(e.a,Zs),fs.subVectors(e.b,Zs),ps.subVectors(e.c,Zs),Si.subVectors(fs,ds),wi.subVectors(ps,fs),Hi.subVectors(ds,ps);let t=[0,-Si.z,Si.y,0,-wi.z,wi.y,0,-Hi.z,Hi.y,Si.z,0,-Si.x,wi.z,0,-wi.x,Hi.z,0,-Hi.x,-Si.y,Si.x,0,-wi.y,wi.x,0,-Hi.y,Hi.x,0];return!Bl(t,ds,fs,ps,ta)||(t=[1,0,0,0,1,0,0,0,1],!Bl(t,ds,fs,ps,ta))?!1:(na.crossVectors(Si,wi),t=[na.x,na.y,na.z],Bl(t,ds,fs,ps,ta))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ri=[new C,new C,new C,new C,new C,new C,new C,new C],Nn=new C,ea=new xn,ds=new C,fs=new C,ps=new C,Si=new C,wi=new C,Hi=new C,Zs=new C,ta=new C,na=new C,Gi=new C;function Bl(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Gi.fromArray(i,r);let o=s.x*Math.abs(Gi.x)+s.y*Math.abs(Gi.y)+s.z*Math.abs(Gi.z),l=e.dot(Gi),c=t.dot(Gi),h=n.dot(Gi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var zt=new C,ia=new Ue,gf=0,on=class extends Yn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Pu,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ia.fromBufferAttribute(this,t),ia.applyMatrix3(e),this.setXY(t,ia.x,ia.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ys(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=hn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ys(t,this.array)),t}setX(e,t){return this.normalized&&(t=hn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ys(t,this.array)),t}setY(e,t){return this.normalized&&(t=hn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ys(t,this.array)),t}setZ(e,t){return this.normalized&&(t=hn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ys(t,this.array)),t}setW(e,t){return this.normalized&&(t=hn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=hn(t,this.array),n=hn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=hn(t,this.array),n=hn(n,this.array),s=hn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=hn(t,this.array),n=hn(n,this.array),s=hn(s,this.array),r=hn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var lr=class extends on{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var cr=class extends on{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var ot=class extends on{constructor(e,t,n){super(new Float32Array(e),t,n)}},xf=new xn,Js=new C,Ol=new C,ci=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):xf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Js.subVectors(e,this.center);let t=Js.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Js,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ol.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Js.copy(e.center).add(Ol)),this.expandByPoint(Js.copy(e.center).sub(Ol))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},yf=0,Sn=new mt,Hl=new kt,ms=new C,mn=new xn,Ks=new xn,$t=new C,wt=class i extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=Or(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nf(e)?cr:lr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new st().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,n){return Sn.makeTranslation(e,t,n),this.applyMatrix4(Sn),this}scale(e,t,n){return Sn.makeScale(e,t,n),this.applyMatrix4(Sn),this}lookAt(e){return Hl.lookAt(e),Hl.updateMatrix(),this.applyMatrix4(Hl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ot(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];mn.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ks.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(mn.min,Ks.min),mn.expandByPoint($t),$t.addVectors(mn.max,Ks.max),mn.expandByPoint($t)):(mn.expandByPoint(Ks.min),mn.expandByPoint(Ks.max))}mn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)$t.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared($t));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)$t.fromBufferAttribute(o,c),l&&(ms.fromBufferAttribute(e,c),$t.add(ms)),s=Math.max(s,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new on(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new C,l[_]=new C;let c=new C,h=new C,d=new C,u=new Ue,f=new Ue,m=new Ue,y=new C,g=new C;function p(_,S,N){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,N),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,N),h.sub(c),d.sub(c),f.sub(u),m.sub(u);let B=1/(f.x*m.y-m.x*f.y);isFinite(B)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(B),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(B),o[_].add(y),o[S].add(y),o[N].add(y),l[_].add(g),l[S].add(g),l[N].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let _=0,S=w.length;_<S;++_){let N=w[_],B=N.start,O=N.count;for(let F=B,R=B+O;F<R;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let P=new C,v=new C,b=new C,E=new C;function I(_){b.fromBufferAttribute(s,_),E.copy(b);let S=o[_];P.copy(S),P.sub(b.multiplyScalar(b.dot(S))).normalize(),v.crossVectors(E,S);let B=v.dot(l[_])<0?-1:1;a.setXYZW(_,P.x,P.y,P.z,B)}for(let _=0,S=w.length;_<S;++_){let N=w[_],B=N.start,O=N.count;for(let F=B,R=B+O;F<R;F+=3)I(e.getX(F+0)),I(e.getX(F+1)),I(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new on(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,d=new C;if(e)for(let u=0,f=e.count;u<f;u+=3){let m=e.getX(u+0),y=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,y),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,m=0;for(let y=0,g=l.length;y<g;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let p=0;p<h;p++)u[m++]=c[f++]}return new on(u,h,d)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Gl=new C,_f=new C,vf=new st,gn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Gl.subVectors(n,t).cross(_f.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Gl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||vf.getNormalMatrix(e),s=this.coplanarPoint(Gl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Mf=0,Bn=class extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mf++}),this.uuid=Or(),this.name="",this.type="Material",this.blending=Ns,this.side=Tn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hc,this.blendDst=uc,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new He().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new gn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ue().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ai=new C,zl=new C,sa=new C,ra=new C,As=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){zl.copy(e).add(t).multiplyScalar(.5),sa.copy(t).sub(e).normalize(),ra.copy(this.origin).sub(zl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(sa),o=ra.dot(this.direction),l=-ra.dot(sa),c=ra.lengthSq(),h=Math.abs(1-a*a),d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=r*h,d>=0)if(u>=-m)if(u<=m){let y=1/h;d*=y,u*=y,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(zl).addScaledVector(sa,u),f}intersectSphere(e,t){if(e.radius<0)return null;ai.subVectors(e.center,this.origin);let n=ai.dot(this.direction),s=ai.dot(ai)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,m=t.x-a.x,y=t.y-a.y,g=t.z-a.z,p=n.x-a.x,w=n.y-a.y,P=n.z-a.z,v=Math.abs(l),b=Math.abs(c),E=Math.abs(h),I,_,S,N,B,O,F,R,U,G,q,H;if(v>=b&&v>=E?(S=l,O=d,U=m,H=p,l>=0?(I=c,_=h,N=u,B=f,F=y,R=g,G=w,q=P):(I=h,_=c,N=f,B=u,F=g,R=y,G=P,q=w)):b>=E?(S=c,O=u,U=y,H=w,c>=0?(I=h,_=l,N=f,B=d,F=g,R=m,G=P,q=p):(I=l,_=h,N=d,B=f,F=m,R=g,G=p,q=P)):(S=h,O=f,U=g,H=P,h>=0?(I=l,_=c,N=d,B=u,F=m,R=y,G=p,q=w):(I=c,_=l,N=u,B=d,F=y,R=m,G=w,q=p)),S===0)return null;let L=I/S,z=_/S,D=1/S,Z=N-L*O,te=B-z*O,ue=F-L*U,pe=R-z*U,se=G-L*H,X=q-z*H,$=se*pe-X*ue,me=Z*X-te*se,ge=ue*te-pe*Z;if(s){if($<0||me<0||ge<0)return null}else if(($<0||me<0||ge<0)&&($>0||me>0||ge>0))return null;let _e=$+me+ge;if(_e===0)return null;let Ye=D*($*O+me*U+ge*H);return(_e>0?Ye<0:Ye>0)?null:this.at(Ye/_e,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},sn=class extends Bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=Rr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Lh=new mt,zi=new As,aa=new ci,Dh=new C,oa=new C,la=new C,ca=new C,kl=new C,ha=new C,Nh=new C,ua=new C,k=class extends kt{constructor(e=new wt,t=new sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){ha.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(kl.fromBufferAttribute(d,e),a?ha.addScaledVector(kl,h):ha.addScaledVector(kl.sub(t),h))}t.add(ha)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),aa.copy(n.boundingSphere),aa.applyMatrix4(r),zi.copy(e.ray).recast(e.near),!(aa.containsPoint(zi.origin)===!1&&(zi.intersectSphere(aa,Dh)===null||zi.origin.distanceToSquared(Dh)>(e.far-e.near)**2))&&(Lh.copy(r).invert(),zi.copy(e.ray).applyMatrix4(Lh),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,y=u.length;m<y;m++){let g=u[m],p=a[g.materialIndex],w=Math.max(g.start,f.start),P=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=w,b=P;v<b;v+=3){let E=o.getX(v),I=o.getX(v+1),_=o.getX(v+2);s=da(this,p,e,n,c,h,d,E,I,_),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let w=o.getX(g),P=o.getX(g+1),v=o.getX(g+2);s=da(this,a,e,n,c,h,d,w,P,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,y=u.length;m<y;m++){let g=u[m],p=a[g.materialIndex],w=Math.max(g.start,f.start),P=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=w,b=P;v<b;v+=3){let E=v,I=v+1,_=v+2;s=da(this,p,e,n,c,h,d,E,I,_),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let w=g,P=g+1,v=g+2;s=da(this,a,e,n,c,h,d,w,P,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function bf(i,e,t,n,s,r,a,o){let l;if(e.side===Ht?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Tn,o),l===null)return null;ua.copy(o),ua.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ua);return c<t.near||c>t.far?null:{distance:c,point:ua.clone(),object:i}}function da(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,oa),i.getVertexPosition(l,la),i.getVertexPosition(c,ca);let h=bf(i,e,t,n,oa,la,ca,Nh);if(h){let d=new C;oi.getBarycoord(Nh,oa,la,ca,d),s&&(h.uv=oi.getInterpolatedAttribute(s,o,l,c,d,new Ue)),r&&(h.uv1=oi.getInterpolatedAttribute(r,o,l,c,d,new Ue)),a&&(h.normal=oi.getInterpolatedAttribute(a,o,l,c,d,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new C,materialIndex:0};oi.getNormal(oa,la,ca,u.normal),h.face=u,h.barycoord=d}return h}var hr=class extends ln{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Zt,h=Zt,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rs=class extends on{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},gs=new mt,Uh=new mt,fa=[],Fh=new xn,Ef=new mt,js=new k,Qs=new ci,hi=class extends k{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Rs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ef)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gs),Fh.copy(e.boundingBox).applyMatrix4(gs),this.boundingBox.union(Fh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ci),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gs),Qs.copy(e.boundingSphere).applyMatrix4(gs),this.boundingSphere.union(Qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(js.geometry=this.geometry,js.material=this.material,js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qs.copy(this.boundingSphere),Qs.applyMatrix4(n),e.ray.intersectsSphere(Qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,gs),Uh.multiplyMatrices(n,gs),js.matrixWorld=Uh,js.raycast(e,fa);for(let a=0,o=fa.length;a<o;a++){let l=fa[a];l.instanceId=r,l.object=this,t.push(l)}fa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Rs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new hr(new Float32Array(s*this.count),s,this.count,yo,An));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ki=new ci,Sf=new Ue(.5,.5),pa=new C,Cs=class{constructor(e=new gn,t=new gn,n=new gn,s=new gn,r=new gn,a=new gn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Un,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],y=r[9],g=r[10],p=r[11],w=r[12],P=r[13],v=r[14],b=r[15];if(s[0].setComponents(c-a,f-h,p-m,b-w).normalize(),s[1].setComponents(c+a,f+h,p+m,b+w).normalize(),s[2].setComponents(c+o,f+d,p+y,b+P).normalize(),s[3].setComponents(c-o,f-d,p-y,b-P).normalize(),n)s[4].setComponents(l,u,g,v).normalize(),s[5].setComponents(c-l,f-u,p-g,b-v).normalize();else if(s[4].setComponents(c-l,f-u,p-g,b-v).normalize(),t===Un)s[5].setComponents(c+l,f+u,p+g,b+v).normalize();else if(t===bs)s[5].setComponents(l,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){ki.center.set(0,0,0);let t=Sf.distanceTo(e.center);return ki.radius=.7071067811865476+t,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(pa.x=s.normal.x>0?e.max.x:e.min.x,pa.y=s.normal.y>0?e.max.y:e.min.y,pa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(pa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Pt=class extends Bn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Oa=new C,Ha=new C,Bh=new mt,er=new As,ma=new ci,Vl=new C,Oh=new C,ur=class extends kt{constructor(e=new wt,t=new Pt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Oa.fromBufferAttribute(t,s-1),Ha.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Oa.distanceTo(Ha);e.setAttribute("lineDistance",new ot(n,1))}else Ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(s),ma.radius+=r,e.ray.intersectsSphere(ma)===!1)return;Bh.copy(s).invert(),er.copy(e.ray).applyMatrix4(Bh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let y=f,g=m-1;y<g;y+=c){let p=h.getX(y),w=h.getX(y+1),P=ga(this,e,er,l,p,w,y);P&&t.push(P)}if(this.isLineLoop){let y=h.getX(m-1),g=h.getX(f),p=ga(this,e,er,l,y,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let y=f,g=m-1;y<g;y+=c){let p=ga(this,e,er,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){let y=ga(this,e,er,l,m-1,f,m-1);y&&t.push(y)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ga(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Oa.fromBufferAttribute(o,s),Ha.fromBufferAttribute(o,r),t.distanceSqToSegment(Oa,Ha,Vl,Oh)>n)return;Vl.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Vl);if(!(c<e.near||c>e.far))return{distance:c,point:Oh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Hh=new C,Gh=new C,Dt=class extends ur{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Hh.fromBufferAttribute(t,s),Gh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Hh.distanceTo(Gh);e.setAttribute("lineDistance",new ot(n,1))}else Ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var dr=class extends ln{constructor(e=[],t=Di,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},wn=class extends ln{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ri=class extends ln{constructor(e,t,n=zn,s,r,a,o=Zt,l=Zt,c,h=qn,d=1){if(h!==qn&&h!==Ui)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ss(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ga=class extends Ri{constructor(e,t=zn,n=Di,s,r,a=Zt,o=Zt,l,c=qn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},fr=class extends ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ve=class i extends wt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,s,a,2),m("x","z","y",1,-1,e,n,-t,s,a,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(d,2));function m(y,g,p,w,P,v,b,E,I,_,S){let N=v/I,B=b/_,O=v/2,F=b/2,R=E/2,U=I+1,G=_+1,q=0,H=0,L=new C;for(let z=0;z<G;z++){let D=z*B-F;for(let Z=0;Z<U;Z++){let te=Z*N-O;L[y]=te*w,L[g]=D*P,L[p]=R,c.push(L.x,L.y,L.z),L[y]=0,L[g]=0,L[p]=E>0?1:-1,h.push(L.x,L.y,L.z),d.push(Z/I),d.push(1-z/_),q+=1}}for(let z=0;z<_;z++)for(let D=0;D<I;D++){let Z=u+D+U*z,te=u+D+U*(z+1),ue=u+(D+1)+U*(z+1),pe=u+(D+1)+U*z;l.push(Z,te,pe),l.push(te,ue,pe),H+=6}o.addGroup(f,H,S),f+=H,u+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},qi=class i extends wt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,m=n*2+r,y=s+1,g=new C,p=new C;for(let w=0;w<=m;w++){let P=0,v=0,b=0,E=0;if(w<=n){let S=w/n,N=S*Math.PI/2;v=-h-e*Math.cos(N),b=e*Math.sin(N),E=-e*Math.cos(N),P=S*d}else if(w<=n+r){let S=(w-n)/r;v=-h+S*t,b=e,E=0,P=d+S*u}else{let S=(w-n-r)/n,N=S*Math.PI/2;v=h+e*Math.sin(N),b=e*Math.cos(N),E=e*Math.sin(N),P=d+u+S*d}let I=Math.max(0,Math.min(1,P/f)),_=0;w===0?_=.5/s:w===m&&(_=-.5/s);for(let S=0;S<=s;S++){let N=S/s,B=N*Math.PI*2,O=Math.sin(B),F=Math.cos(B);p.x=-b*F,p.y=v,p.z=b*O,o.push(p.x,p.y,p.z),g.set(-b*F,E,b*O),g.normalize(),l.push(g.x,g.y,g.z),c.push(N+_,I)}if(w>0){let S=(w-1)*y;for(let N=0;N<s;N++){let B=S+N,O=S+N+1,F=w*y+N,R=w*y+N+1;a.push(B,O,F),a.push(O,R,F)}}}this.setIndex(a),this.setAttribute("position",new ot(o,3)),this.setAttribute("normal",new ot(l,3)),this.setAttribute("uv",new ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},pr=class i extends wt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new C,h=new Ue;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ot(a,3)),this.setAttribute("normal",new ot(o,3)),this.setAttribute("uv",new ot(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Re=class i extends wt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],m=0,y=[],g=n/2,p=0;w(),a===!1&&(e>0&&P(!0),t>0&&P(!1)),this.setIndex(h),this.setAttribute("position",new ot(d,3)),this.setAttribute("normal",new ot(u,3)),this.setAttribute("uv",new ot(f,2));function w(){let v=new C,b=new C,E=0,I=(t-e)/n;for(let _=0;_<=r;_++){let S=[],N=_/r,B=N*(t-e)+e;for(let O=0;O<=s;O++){let F=O/s,R=F*l+o,U=Math.sin(R),G=Math.cos(R);b.x=B*U,b.y=-N*n+g,b.z=B*G,d.push(b.x,b.y,b.z),v.set(U,I,G).normalize(),u.push(v.x,v.y,v.z),f.push(F,1-N),S.push(m++)}y.push(S)}for(let _=0;_<s;_++)for(let S=0;S<r;S++){let N=y[S][_],B=y[S+1][_],O=y[S+1][_+1],F=y[S][_+1];(e>0||S!==0)&&(h.push(N,B,F),E+=3),(t>0||S!==r-1)&&(h.push(B,O,F),E+=3)}c.addGroup(p,E,0),p+=E}function P(v){let b=m,E=new Ue,I=new C,_=0,S=v===!0?e:t,N=v===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,g*N,0),u.push(0,N,0),f.push(.5,.5),m++;let B=m;for(let O=0;O<=s;O++){let R=O/s*l+o,U=Math.cos(R),G=Math.sin(R);I.x=S*G,I.y=g*N,I.z=S*U,d.push(I.x,I.y,I.z),u.push(0,N,0),E.x=U*.5+.5,E.y=G*.5*N+.5,f.push(E.x,E.y),m++}for(let O=0;O<s;O++){let F=b+O,R=B+O;v===!0?h.push(R,R+1,F):h.push(R+1,R,F),_+=3}c.addGroup(p,_,v===!0?1:2),p+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},za=class i extends Re{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var xa=new C,ya=new C,Wl=new C,_a=new oi,Ot=class extends wt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(Sa*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let m=0;m<l;m+=3){a?(c[0]=a.getX(m),c[1]=a.getX(m+1),c[2]=a.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:y,b:g,c:p}=_a;if(y.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),_a.getNormal(Wl),d[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,d[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let w=0;w<3;w++){let P=(w+1)%3,v=d[w],b=d[P],E=_a[h[w]],I=_a[h[P]],_=`${v}_${b}`,S=`${b}_${v}`;S in u&&u[S]?(Wl.dot(u[S].normal)<=r&&(f.push(E.x,E.y,E.z),f.push(I.x,I.y,I.z)),u[S]=null):_ in u||(u[_]={index0:c[w],index1:c[P],normal:Wl.clone()})}}for(let m in u)if(u[m]){let{index0:y,index1:g}=u[m];xa.fromBufferAttribute(o,y),ya.fromBufferAttribute(o,g),f.push(xa.x,xa.y,xa.z),f.push(ya.x,ya.y,ya.z)}this.setAttribute("position",new ot(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},yn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new Ue:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,s=[],r=[],a=[],o=new C,l=new mt;for(let f=0;f<=e;f++){let m=f/e;s[f]=this.getTangentAt(m,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(ht(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(ht(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},mr=class extends yn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Ue){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ka=class extends mr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Cc(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var zh=new C,kh=new C,Xl=new Cc,ql=new Cc,Yl=new Cc,Va=class extends yn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new C){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(kh.subVectors(s[0],s[1]).add(s[0]),c=kh);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(zh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=zh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),Xl.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,m,y,g),ql.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,m,y,g),Yl.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(Xl.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),ql.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Yl.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Xl.calc(l),ql.calc(l),Yl.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Vh(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function wf(i,e){let t=1-i;return t*t*e}function Tf(i,e){return 2*(1-i)*i*e}function Af(i,e){return i*i*e}function tr(i,e,t,n){return wf(i,e)+Tf(i,t)+Af(i,n)}function Rf(i,e){let t=1-i;return t*t*t*e}function Cf(i,e){let t=1-i;return 3*t*t*i*e}function If(i,e){return 3*(1-i)*i*i*e}function Pf(i,e){return i*i*i*e}function nr(i,e,t,n,s){return Rf(i,e)+Cf(i,t)+If(i,n)+Pf(i,s)}var Wa=class extends yn{constructor(e=new Ue,t=new Ue,n=new Ue,s=new Ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new Ue){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(nr(e,s.x,r.x,a.x,o.x),nr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Xa=class extends yn{constructor(e=new C,t=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new C){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(nr(e,s.x,r.x,a.x,o.x),nr(e,s.y,r.y,a.y,o.y),nr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},qa=class extends yn{constructor(e=new Ue,t=new Ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Ue){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Is=class extends yn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ya=class extends yn{constructor(e=new Ue,t=new Ue,n=new Ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Ue){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(tr(e,s.x,r.x,a.x),tr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yi=class extends yn{constructor(e=new C,t=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new C){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(tr(e,s.x,r.x,a.x),tr(e,s.y,r.y,a.y),tr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$a=class extends yn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Ue){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Vh(o,l.x,c.x,h.x,d.x),Vh(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new Ue().fromArray(s))}return this}},tc=Object.freeze({__proto__:null,ArcCurve:ka,CatmullRomCurve3:Va,CubicBezierCurve:Wa,CubicBezierCurve3:Xa,EllipseCurve:mr,LineCurve:qa,LineCurve3:Is,QuadraticBezierCurve:Ya,QuadraticBezierCurve3:Yi,SplineCurve:$a}),gr=class extends yn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new tc[s.type]().fromJSON(s))}return this}};var On=class i extends wt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let w=p*u-a;for(let P=0;P<c;P++){let v=P*d-r;m.push(v,-w,0),y.push(0,0,1),g.push(P/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){let P=w+c*p,v=w+c*(p+1),b=w+1+c*(p+1),E=w+1+c*p;f.push(P,v,E),f.push(v,b,E)}this.setIndex(f),this.setAttribute("position",new ot(m,3)),this.setAttribute("normal",new ot(y,3)),this.setAttribute("uv",new ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ze=class i extends wt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new C,u=new C,f=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){let w=[],P=p/n,v=a+P*o,b=e*Math.cos(v),E=Math.sqrt(e*e-b*b),I=0;p===0&&a===0?I=.5/t:p===n&&l===Math.PI&&(I=-.5/t);for(let _=0;_<=t;_++){let S=_/t,N=s+S*r;d.x=-E*Math.cos(N),d.y=b,d.z=E*Math.sin(N),m.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),g.push(S+I,1-P),w.push(c++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<t;w++){let P=h[p][w+1],v=h[p][w],b=h[p+1][w],E=h[p+1][w+1];(p!==0||a>0)&&f.push(P,v,E),(p!==n-1||l<Math.PI)&&f.push(v,b,E)}this.setIndex(f),this.setAttribute("position",new ot(m,3)),this.setAttribute("normal",new ot(y,3)),this.setAttribute("uv",new ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Lt=class i extends wt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new C,f=new C,m=new C;for(let y=0;y<=n;y++){let g=a+y/n*o;for(let p=0;p<=s;p++){let w=p/s*r;f.x=(e+t*Math.cos(g))*Math.cos(w),f.y=(e+t*Math.cos(g))*Math.sin(w),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),u.x=e*Math.cos(w),u.y=e*Math.sin(w),m.subVectors(f,u).normalize(),h.push(m.x,m.y,m.z),d.push(p/s),d.push(y/n)}}for(let y=1;y<=n;y++)for(let g=1;g<=s;g++){let p=(s+1)*y+g-1,w=(s+1)*(y-1)+g-1,P=(s+1)*(y-1)+g,v=(s+1)*y+g;l.push(p,w,v),l.push(w,P,v)}this.setIndex(l),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var $i=class i extends wt{constructor(e=new Yi(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new C,l=new C,c=new Ue,h=new C,d=[],u=[],f=[],m=[];y(),this.setIndex(m),this.setAttribute("position",new ot(d,3)),this.setAttribute("normal",new ot(u,3)),this.setAttribute("uv",new ot(f,2));function y(){for(let P=0;P<t;P++)g(P);g(r===!1?t:0),w(),p()}function g(P){h=e.getPointAt(P/t,h);let v=a.normals[P],b=a.binormals[P];for(let E=0;E<=s;E++){let I=E/s*Math.PI*2,_=Math.sin(I),S=-Math.cos(I);l.x=S*v.x+_*b.x,l.y=S*v.y+_*b.y,l.z=S*v.z+_*b.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let P=1;P<=t;P++)for(let v=1;v<=s;v++){let b=(s+1)*(P-1)+(v-1),E=(s+1)*P+(v-1),I=(s+1)*P+v,_=(s+1)*(P-1)+v;m.push(b,E,_),m.push(E,I,_)}}function w(){for(let P=0;P<=t;P++)for(let v=0;v<=s;v++)c.x=P/t,c.y=v/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new tc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Ki(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Wh(s))s.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Wh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function rn(i){let e={};for(let t=0;t<i.length;t++){let n=Ki(i[t]);for(let s in n)e[s]=n[s]}return e}function Wh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Lf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Ic(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}var Bu={clone:Ki,merge:rn},Df=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,cn=class extends Bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Df,this.fragmentShader=Nf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ki(e.uniforms),this.uniformsGroups=Lf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new He().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ue().fromArray(s.value);break;case"v3":this.uniforms[n].value=new C().fromArray(s.value);break;case"v4":this.uniforms[n].value=new It().fromArray(s.value);break;case"m3":this.uniforms[n].value=new st().fromArray(s.value);break;case"m4":this.uniforms[n].value=new mt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Za=class extends cn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Hn=class extends Bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bs,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xr=class extends Hn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new He(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new He(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new He(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},yr=class extends Bn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new He(16777215),this.specular=new He(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bs,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=Rr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var _r=class extends Bn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bs,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=Rr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ja=class extends Bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Eu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ka=class extends Bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function xs(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function $l(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ci=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ja=class extends Ci{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jl,endingEnd:jl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ql:r=e,o=2*t-n;break;case ec:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ql:a=e,l=2*n-t;break;case ec:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),y=m*m,g=y*m,p=-u*g+2*u*y-u*m,w=(1+u)*g+(-1.5-2*u)*y+(-.5+u)*m+1,P=(-1-f)*g+(1.5+f)*y+.5*m,v=f*g-f*y;for(let b=0;b!==o;++b)r[b]=p*a[h+b]+w*a[c+b]+P*a[l+b]+v*a[d+b];return r}},Qa=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},eo=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},to=class extends Ci{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let m=(n-t)/(s-t),y=1-m;for(let g=0;g!==o;++g)r[g]=a[c+g]*y+a[l+g]*m;return r}let u=o*2,f=e-1;for(let m=0;m!==o;++m){let y=a[c+m],g=a[l+m],p=f*u+m*2,w=d[p],P=d[p+1],v=e*u+m*2,b=h[v],E=h[v+1],I=Ff(n,t,w,b,s);r[m]=Ou(I,y,P,E,g)}return r}};function Ou(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Uf(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Ff(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=Ou(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Uf(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var _n=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=xs(t,this.TimeBufferType),this.values=xs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:xs(e.times,Array),values:xs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),$l(e.settings)&&(n.settings={inTangents:xs(e.settings.inTangents,Array),outTangents:xs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new eo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new to(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ir:t=this.InterpolantFactoryMethodDiscrete;break;case Da:t=this.InterpolantFactoryMethodLinear;break;case Ea:t=this.InterpolantFactoryMethodSmooth;break;case Kl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ke("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ir;case this.InterpolantFactoryMethodLinear:return Da;case this.InterpolantFactoryMethodSmooth:return Ea;case this.InterpolantFactoryMethodBezier:return Kl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;$l(this.settings)&&(Xh(this.settings.inTangents,e),Xh(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Qe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Qe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Qe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&sf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Qe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ea,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let m=0;m!==n;++m){let y=t[d+m];if(y!==t[u+m]||y!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,$l(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Xh(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}_n.prototype.ValueTypeName="";_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=Da;var Ii=class extends _n{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="bool";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=ir;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var no=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}};no.prototype.ValueTypeName="color";var io=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}};io.prototype.ValueTypeName="number";var so=class extends Ci{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)$n.slerpFlat(r,0,a,c-o,a,c,l);return r}},vr=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new so(this.times,this.values,this.getValueSize(),e)}};vr.prototype.ValueTypeName="quaternion";vr.prototype.InterpolantFactoryMethodSmooth=void 0;var Pi=class extends _n{constructor(e,t,n){super(e,t,n)}};Pi.prototype.ValueTypeName="string";Pi.prototype.ValueBufferType=Array;Pi.prototype.DefaultInterpolation=ir;Pi.prototype.InterpolantFactoryMethodLinear=void 0;Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var ro=class extends _n{constructor(e,t,n,s){super(e,t,n,s)}};ro.prototype.ValueTypeName="vector";var ao=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Hu=new ao,oo=class{constructor(e){this.manager=e!==void 0?e:Hu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};oo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ps=class extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Mr=class extends Ps{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Zl=new mt,qh=new C,Yh=new C,br=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.mapType=dn,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cs,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;qh.setFromMatrixPosition(e.matrixWorld),t.position.copy(qh),Yh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Zl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Zl,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===bs||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Zl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},va=new C,Ma=new $n,Wn=new C,Er=class extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(va,Ma,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(va,Ma,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,Ma,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ti=new C,$h=new Ue,Zh=new Ue,Jt=class extends Er{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Na*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Sa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Na*2*Math.atan(Math.tan(Sa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,$h,Zh),t.subVectors(Zh,$h)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Sa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var nc=class extends br{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0}},Sr=class extends Ps{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new nc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ls=class extends Er{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ic=class extends br{constructor(){super(new Ls(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Li=class extends Ps{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new ic}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ys=-90,_s=1,lo=class extends kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Jt(ys,_s,e,t);s.layers=this.layers,this.add(s);let r=new Jt(ys,_s,e,t);r.layers=this.layers,this.add(r);let a=new Jt(ys,_s,e,t);a.layers=this.layers,this.add(a);let o=new Jt(ys,_s,e,t);o.layers=this.layers,this.add(o);let l=new Jt(ys,_s,e,t);l.layers=this.layers,this.add(l);let c=new Jt(ys,_s,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===bs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},co=class extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Pc="\\[\\]\\.:\\/",Bf=new RegExp("["+Pc+"]","g"),Lc="[^"+Pc+"]",Of="[^"+Pc.replace("\\.","")+"]",Hf=/((?:WC+[\/:])*)/.source.replace("WC",Lc),Gf=/(WCOD+)?/.source.replace("WCOD",Of),zf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lc),kf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lc),Vf=new RegExp("^"+Hf+Gf+zf+kf+"$"),Wf=["material","materials","bones","map"],sc=class{constructor(e,t,n){let s=n||Ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ct=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Bf,"")}static parseTrackName(e){let t=Vf.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Wf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ke("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Qe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Qe("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ct.Composite=sc;Ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ct.prototype.GetterByBindingType=[Ct.prototype._getValue_direct,Ct.prototype._getValue_array,Ct.prototype._getValue_arrayElement,Ct.prototype._getValue_toArray];Ct.prototype.SetterByBindingTypeAndVersioning=[[Ct.prototype._setValue_direct,Ct.prototype._setValue_direct_setNeedsUpdate,Ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_array,Ct.prototype._setValue_array_setNeedsUpdate,Ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_arrayElement,Ct.prototype._setValue_arrayElement_setNeedsUpdate,Ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ct.prototype._setValue_fromArray,Ct.prototype._setValue_fromArray_setNeedsUpdate,Ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var yy=new Float32Array(1);var Jh=new mt,ui=class{constructor(e,t,n=0,s=1/0){this.ray=new As(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ws,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Jh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jh),this}intersectObject(e,t=!0,n=[]){return rc(e,this,n,t),n.sort(Kh),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)rc(e[s],this,n,t);return n.sort(Kh),n}};function Kh(i,e){return i.distance-e.distance}function rc(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)rc(r[a],e,t,!0)}}var Oc=class Oc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Oc.prototype.isMatrix2=!0;var ac=Oc;var jh=new C,ba,Jl,wr=class extends kt{constructor(e=new C(0,0,1),t=new C(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",ba===void 0&&(ba=new wt,ba.setAttribute("position",new ot([0,0,0,0,1,0],3)),Jl=new za(.5,1,5,1),Jl.translate(0,-.5,0)),this.position.copy(t),this.line=new ur(ba,new Pt({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new k(Jl,new sn({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{jh.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(jh,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}};function Dc(i,e,t,n){let s=Xf(n);switch(t){case Ec:return i*e;case yo:return i*e/s.components*s.byteLength;case _o:return i*e/s.components*s.byteLength;case Fi:return i*e*2/s.components*s.byteLength;case vo:return i*e*2/s.components*s.byteLength;case Sc:return i*e*3/s.components*s.byteLength;case Rn:return i*e*4/s.components*s.byteLength;case Mo:return i*e*4/s.components*s.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Nr:case Ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Eo:case wo:return Math.max(i,16)*Math.max(e,8)/4;case bo:case So:return Math.max(i,8)*Math.max(e,8)/2;case To:case Ao:case Co:case Io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ro:case Fr:case Po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case No:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Fo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Bo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ho:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Go:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case zo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ko:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Vo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Xo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case qo:case Yo:case $o:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Zo:case Jo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Br:case Ko:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Xf(i){switch(i){case dn:case _c:return{byteLength:1,components:1};case Us:case vc:case kn:return{byteLength:2,components:1};case go:case xo:return{byteLength:2,components:4};case zn:case mo:case An:return{byteLength:4,components:1};case Mc:case bc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function od(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function jf(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],y=d[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let y=d[f];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ep=`#ifdef USE_ALPHAHASH
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
#endif`,tp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,np=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ip=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rp=`#ifdef USE_AOMAP
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
#endif`,ap=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,op=`#ifdef USE_BATCHING
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
#endif`,lp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,up=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dp=`#ifdef USE_IRIDESCENCE
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
#endif`,fp=`#ifdef USE_BUMPMAP
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
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,_p=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,vp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,bp=`#define PI 3.141592653589793
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
} // validated`,Ep=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Sp=`vec3 transformedNormal = objectNormal;
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
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ap=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ip=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pp=`#ifdef USE_ENVMAP
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
#endif`,Lp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Dp=`#ifdef USE_ENVMAP
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
#endif`,Np=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Up=`#ifdef USE_ENVMAP
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
#endif`,Fp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Op=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gp=`#ifdef USE_GRADIENTMAP
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
}`,zp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Xp=`#ifdef USE_ENVMAP
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
#endif`,qp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$p=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jp=`PhysicalMaterial material;
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
#endif`,Kp=`uniform sampler2D dfgLUT;
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
}`,jp=`
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
#endif`,Qp=`#if defined( RE_IndirectDiffuse )
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
#endif`,e0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,t0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,n0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,i0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,s0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,a0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,o0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,l0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,c0=`#if defined( USE_POINTS_UV )
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
#endif`,h0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,u0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,d0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,f0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,p0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,m0=`#ifdef USE_MORPHTARGETS
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
#endif`,g0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,x0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,y0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,v0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,b0=`#ifdef USE_NORMALMAP
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
#endif`,E0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,S0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,w0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,T0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,A0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,R0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,C0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,I0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,P0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,L0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,D0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,N0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,U0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,F0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,B0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,O0=`float getShadowMask() {
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
}`,H0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,G0=`#ifdef USE_SKINNING
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
#endif`,z0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,k0=`#ifdef USE_SKINNING
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
#endif`,V0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,W0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,X0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,q0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Y0=`#ifdef USE_TRANSMISSION
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
#endif`,$0=`#ifdef USE_TRANSMISSION
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
#endif`,Z0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,J0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,K0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,j0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Q0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,em=`uniform sampler2D t2D;
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
}`,tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rm=`#include <common>
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
}`,am=`#if DEPTH_PACKING == 3200
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
}`,om=`#define DISTANCE
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
}`,lm=`#define DISTANCE
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
}`,cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`uniform float scale;
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
}`,dm=`uniform vec3 diffuse;
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
}`,fm=`#include <common>
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
}`,pm=`uniform vec3 diffuse;
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
}`,mm=`#define LAMBERT
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
}`,gm=`#define LAMBERT
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
}`,xm=`#define MATCAP
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
}`,ym=`#define MATCAP
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
}`,_m=`#define NORMAL
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
}`,vm=`#define NORMAL
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
}`,Mm=`#define PHONG
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
}`,bm=`#define PHONG
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
}`,Em=`#define STANDARD
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
}`,Sm=`#define STANDARD
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
}`,wm=`#define TOON
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
}`,Tm=`#define TOON
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
}`,Am=`uniform float size;
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
}`,Rm=`uniform vec3 diffuse;
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
}`,Cm=`#include <common>
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
}`,Im=`uniform vec3 color;
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
}`,Pm=`uniform float rotation;
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
}`,Lm=`uniform vec3 diffuse;
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
}`,ct={alphahash_fragment:Qf,alphahash_pars_fragment:ep,alphamap_fragment:tp,alphamap_pars_fragment:np,alphatest_fragment:ip,alphatest_pars_fragment:sp,aomap_fragment:rp,aomap_pars_fragment:ap,batching_pars_vertex:op,batching_vertex:lp,begin_vertex:cp,beginnormal_vertex:hp,bsdfs:up,iridescence_fragment:dp,bumpmap_pars_fragment:fp,clipping_planes_fragment:pp,clipping_planes_pars_fragment:mp,clipping_planes_pars_vertex:gp,clipping_planes_vertex:xp,color_fragment:yp,color_pars_fragment:_p,color_pars_vertex:vp,color_vertex:Mp,common:bp,cube_uv_reflection_fragment:Ep,defaultnormal_vertex:Sp,displacementmap_pars_vertex:wp,displacementmap_vertex:Tp,emissivemap_fragment:Ap,emissivemap_pars_fragment:Rp,colorspace_fragment:Cp,colorspace_pars_fragment:Ip,envmap_fragment:Pp,envmap_common_pars_fragment:Lp,envmap_pars_fragment:Dp,envmap_pars_vertex:Np,envmap_physical_pars_fragment:Xp,envmap_vertex:Up,fog_vertex:Fp,fog_pars_vertex:Bp,fog_fragment:Op,fog_pars_fragment:Hp,gradientmap_pars_fragment:Gp,lightmap_pars_fragment:zp,lights_lambert_fragment:kp,lights_lambert_pars_fragment:Vp,lights_pars_begin:Wp,lights_toon_fragment:qp,lights_toon_pars_fragment:Yp,lights_phong_fragment:$p,lights_phong_pars_fragment:Zp,lights_physical_fragment:Jp,lights_physical_pars_fragment:Kp,lights_fragment_begin:jp,lights_fragment_maps:Qp,lights_fragment_end:e0,lightprobes_pars_fragment:t0,logdepthbuf_fragment:n0,logdepthbuf_pars_fragment:i0,logdepthbuf_pars_vertex:s0,logdepthbuf_vertex:r0,map_fragment:a0,map_pars_fragment:o0,map_particle_fragment:l0,map_particle_pars_fragment:c0,metalnessmap_fragment:h0,metalnessmap_pars_fragment:u0,morphinstance_vertex:d0,morphcolor_vertex:f0,morphnormal_vertex:p0,morphtarget_pars_vertex:m0,morphtarget_vertex:g0,normal_fragment_begin:x0,normal_fragment_maps:y0,normal_pars_fragment:_0,normal_pars_vertex:v0,normal_vertex:M0,normalmap_pars_fragment:b0,clearcoat_normal_fragment_begin:E0,clearcoat_normal_fragment_maps:S0,clearcoat_pars_fragment:w0,iridescence_pars_fragment:T0,opaque_fragment:A0,packing:R0,premultiplied_alpha_fragment:C0,project_vertex:I0,dithering_fragment:P0,dithering_pars_fragment:L0,roughnessmap_fragment:D0,roughnessmap_pars_fragment:N0,shadowmap_pars_fragment:U0,shadowmap_pars_vertex:F0,shadowmap_vertex:B0,shadowmask_pars_fragment:O0,skinbase_vertex:H0,skinning_pars_vertex:G0,skinning_vertex:z0,skinnormal_vertex:k0,specularmap_fragment:V0,specularmap_pars_fragment:W0,tonemapping_fragment:X0,tonemapping_pars_fragment:q0,transmission_fragment:Y0,transmission_pars_fragment:$0,uv_pars_fragment:Z0,uv_pars_vertex:J0,uv_vertex:K0,worldpos_vertex:j0,background_vert:Q0,background_frag:em,backgroundCube_vert:tm,backgroundCube_frag:nm,cube_vert:im,cube_frag:sm,depth_vert:rm,depth_frag:am,distance_vert:om,distance_frag:lm,equirect_vert:cm,equirect_frag:hm,linedashed_vert:um,linedashed_frag:dm,meshbasic_vert:fm,meshbasic_frag:pm,meshlambert_vert:mm,meshlambert_frag:gm,meshmatcap_vert:xm,meshmatcap_frag:ym,meshnormal_vert:_m,meshnormal_frag:vm,meshphong_vert:Mm,meshphong_frag:bm,meshphysical_vert:Em,meshphysical_frag:Sm,meshtoon_vert:wm,meshtoon_frag:Tm,points_vert:Am,points_frag:Rm,shadow_vert:Cm,shadow_frag:Im,sprite_vert:Pm,sprite_frag:Lm},Ie={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Kn={basic:{uniforms:rn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:rn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new He(0)},envMapIntensity:{value:1}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:rn([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:rn([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:rn([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new He(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:rn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:rn([Ie.points,Ie.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:rn([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:rn([Ie.common,Ie.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:rn([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:rn([Ie.sprite,Ie.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distance:{uniforms:rn([Ie.common,Ie.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distance_vert,fragmentShader:ct.distance_frag},shadow:{uniforms:rn([Ie.lights,Ie.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};Kn.physical={uniforms:rn([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};var tl={r:0,b:0,g:0},Dm=new mt,ld=new st;ld.set(-1,0,0,0,1,0,0,0,1);function Nm(i,e,t,n,s,r){let a=new He(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(w){let P=w.isScene===!0?w.background:null;if(P&&P.isTexture){let v=w.backgroundBlurriness>0;P=e.get(P,v)}return P}function m(w){let P=!1,v=f(w);v===null?g(a,o):v&&v.isColor&&(g(v,1),P=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||P)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(w,P){let v=f(P);v&&(v.isCubeTexture||v.mapping===Ir)?(c===void 0&&(c=new k(new ve(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:Ki(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,E,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Dm.makeRotationFromEuler(P.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(ld),c.material.toneMapped=ft.getTransfer(v.colorSpace)!==bt,(h!==v||d!==v.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new k(new On(2,2),new cn({name:"BackgroundMaterial",uniforms:Ki(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,l.material.toneMapped=ft.getTransfer(v.colorSpace)!==bt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function g(w,P){w.getRGB(tl,Ic(i)),t.buffers.color.setClear(tl.r,tl.g,tl.b,P,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,P=1){a.set(w),o=P,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,g(a,o)},render:m,addToRenderList:y,dispose:p}}function Um(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(B,O,F,R,U){let G=!1,q=d(B,R,F,O);r!==q&&(r=q,c(r.object)),G=f(B,R,F,U),G&&m(B,R,F,U),U!==null&&e.update(U,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,v(B,O,F,R),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return i.createVertexArray()}function c(B){return i.bindVertexArray(B)}function h(B){return i.deleteVertexArray(B)}function d(B,O,F,R){let U=R.wireframe===!0,G=n[O.id];G===void 0&&(G={},n[O.id]=G);let q=B.isInstancedMesh===!0?B.id:0,H=G[q];H===void 0&&(H={},G[q]=H);let L=H[F.id];L===void 0&&(L={},H[F.id]=L);let z=L[U];return z===void 0&&(z=u(l()),L[U]=z),z}function u(B){let O=[],F=[],R=[];for(let U=0;U<t;U++)O[U]=0,F[U]=0,R[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:F,attributeDivisors:R,object:B,attributes:{},index:null}}function f(B,O,F,R){let U=r.attributes,G=O.attributes,q=0,H=F.getAttributes();for(let L in H)if(H[L].location>=0){let D=U[L],Z=G[L];if(Z===void 0&&(L==="instanceMatrix"&&B.instanceMatrix&&(Z=B.instanceMatrix),L==="instanceColor"&&B.instanceColor&&(Z=B.instanceColor)),D===void 0||D.attribute!==Z||Z&&D.data!==Z.data)return!0;q++}return r.attributesNum!==q||r.index!==R}function m(B,O,F,R){let U={},G=O.attributes,q=0,H=F.getAttributes();for(let L in H)if(H[L].location>=0){let D=G[L];D===void 0&&(L==="instanceMatrix"&&B.instanceMatrix&&(D=B.instanceMatrix),L==="instanceColor"&&B.instanceColor&&(D=B.instanceColor));let Z={};Z.attribute=D,D&&D.data&&(Z.data=D.data),U[L]=Z,q++}r.attributes=U,r.attributesNum=q,r.index=R}function y(){let B=r.newAttributes;for(let O=0,F=B.length;O<F;O++)B[O]=0}function g(B){p(B,0)}function p(B,O){let F=r.newAttributes,R=r.enabledAttributes,U=r.attributeDivisors;F[B]=1,R[B]===0&&(i.enableVertexAttribArray(B),R[B]=1),U[B]!==O&&(i.vertexAttribDivisor(B,O),U[B]=O)}function w(){let B=r.newAttributes,O=r.enabledAttributes;for(let F=0,R=O.length;F<R;F++)O[F]!==B[F]&&(i.disableVertexAttribArray(F),O[F]=0)}function P(B,O,F,R,U,G,q){q===!0?i.vertexAttribIPointer(B,O,F,U,G):i.vertexAttribPointer(B,O,F,R,U,G)}function v(B,O,F,R){y();let U=R.attributes,G=F.getAttributes(),q=O.defaultAttributeValues;for(let H in G){let L=G[H];if(L.location>=0){let z=U[H];if(z===void 0&&(H==="instanceMatrix"&&B.instanceMatrix&&(z=B.instanceMatrix),H==="instanceColor"&&B.instanceColor&&(z=B.instanceColor)),z!==void 0){let D=z.normalized,Z=z.itemSize,te=e.get(z);if(te===void 0)continue;let ue=te.buffer,pe=te.type,se=te.bytesPerElement,X=pe===i.INT||pe===i.UNSIGNED_INT||z.gpuType===mo;if(z.isInterleavedBufferAttribute){let $=z.data,me=$.stride,ge=z.offset;if($.isInstancedInterleavedBuffer){for(let _e=0;_e<L.locationSize;_e++)p(L.location+_e,$.meshPerAttribute);B.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let _e=0;_e<L.locationSize;_e++)g(L.location+_e);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let _e=0;_e<L.locationSize;_e++)P(L.location+_e,Z/L.locationSize,pe,D,me*se,(ge+Z/L.locationSize*_e)*se,X)}else{if(z.isInstancedBufferAttribute){for(let $=0;$<L.locationSize;$++)p(L.location+$,z.meshPerAttribute);B.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let $=0;$<L.locationSize;$++)g(L.location+$);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let $=0;$<L.locationSize;$++)P(L.location+$,Z/L.locationSize,pe,D,Z*se,Z/L.locationSize*$*se,X)}}else if(q!==void 0){let D=q[H];if(D!==void 0)switch(D.length){case 2:i.vertexAttrib2fv(L.location,D);break;case 3:i.vertexAttrib3fv(L.location,D);break;case 4:i.vertexAttrib4fv(L.location,D);break;default:i.vertexAttrib1fv(L.location,D)}}}}w()}function b(){S();for(let B in n){let O=n[B];for(let F in O){let R=O[F];for(let U in R){let G=R[U];for(let q in G)h(G[q].object),delete G[q];delete R[U]}}delete n[B]}}function E(B){if(n[B.id]===void 0)return;let O=n[B.id];for(let F in O){let R=O[F];for(let U in R){let G=R[U];for(let q in G)h(G[q].object),delete G[q];delete R[U]}}delete n[B.id]}function I(B){for(let O in n){let F=n[O];for(let R in F){let U=F[R];if(U[B.id]===void 0)continue;let G=U[B.id];for(let q in G)h(G[q].object),delete G[q];delete U[B.id]}}}function _(B){for(let O in n){let F=n[O],R=B.isInstancedMesh===!0?B.id:0,U=F[R];if(U!==void 0){for(let G in U){let q=U[G];for(let H in q)h(q[H].object),delete q[H];delete U[G]}delete F[R],Object.keys(F).length===0&&delete n[O]}}}function S(){N(),a=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:N,dispose:b,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:I,initAttributes:y,enableAttribute:g,disableUnusedAttributes:w}}function Fm(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Bm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==Rn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){let _=I===kn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==dn&&I!==An&&!_&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Ke("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),P=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:w,maxVaryings:P,maxFragmentUniforms:v,maxSamples:b,samples:E}}function Om(i){let e=this,t=null,n=0,s=!1,r=!1,a=new gn,o=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{let w=r?0:n,P=w*4,v=p.clippingState||null;l.value=v,v=h(m,u,P,f);for(let b=0;b!==P;++b)v[b]=t[b];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,m){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=l.value,m!==!0||g===null){let p=f+y*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(g===null||g.length<p)&&(g=new Float32Array(p));for(let P=0,v=f;P!==y;++P,v+=4)a.copy(d[P]).applyMatrix4(w,o),a.normal.toArray(g,v),g[v+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,g}}var Hs=4,Hm=6,Gm=20,zm=256,Hr=new Ls,Gu=new He,Hc=null,Gc=0,zc=0,kc=!1,km=new C,ji=new C,zs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=km}=r;Hc=this._renderer.getRenderTarget(),Gc=this._renderer.getActiveCubeFace(),zc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ku(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Hc,Gc,zc),this._renderer.xr.enabled=kc,e.scissorTest=!1,Os(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Di||e.mapping===Ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hc=this._renderer.getRenderTarget(),Gc=this._renderer.getActiveCubeFace(),zc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:kn,format:Rn,colorSpace:sr,depthBuffer:!1},s=zu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zu(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Vm(r)),this._blurMaterial=Xm(r,e,t),this._ggxMaterial=Wm(r,e,t)}return s}_compileMaterial(e){let t=new k(new wt,e);this._renderer.compile(t,Hr)}_sceneToCubeUV(e,t,n,s,r){let l=new Jt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Gu),d.toneMapping=Gn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new k(new ve,new sn({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,w=e.background;w?w.isColor&&(g.color.copy(w),e.background=null,p=!0):(g.color.copy(Gu),p=!0);for(let P=0;P<6;P++){let v=P%3;v===0?(l.up.set(0,c[P],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[P],r.y,r.z)):v===1?(l.up.set(0,0,c[P]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[P],r.z)):(l.up.set(0,c[P],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[P]));let b=this._cubeSize;Os(s,v*b,P>2?b:0,b,b),d.setRenderTarget(s),p&&d.render(y,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=w}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Di||e.mapping===Ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ku());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Os(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Hr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:m}=this,y=this._sizeLods[n],g=3*y*(n>m-Hs?n-m+Hs:0),p=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,Os(r,g,p,3*y,2*y),s.setRenderTarget(r),s.render(o,Hr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,Os(e,g,p,3*y,2*y),s.setRenderTarget(e),s.render(o,Hr)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-Hs?s-this._lodMax+Hs:0),u=4*(this._cubeSize-h);Os(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,Hr)}};function Vm(i){let e=[],t=[],n=i,s=i-Hs+1+Hm;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,m=new Float32Array(f*u*d),y=new Float32Array(f*u*d);for(let p=0;p<d;p++){let w=p%3*2/3-1,P=p>2?0:-1,v=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];m.set(v,f*u*p);for(let b=0;b<u;b++){let E=h[b*2]*2-1,I=h[b*2+1]*2-1;p===0?ji.set(1,I,E):p===1?ji.set(-E,1,-I):p===2?ji.set(-E,I,1):p===3?ji.set(-1,I,-E):p===4?ji.set(-E,-1,I):ji.set(E,I,-1),ji.toArray(y,(p*u+b)*f)}}let g=new wt;g.setAttribute("position",new on(m,f)),g.setAttribute("outputDirection",new on(y,f)),t.push(new k(g,null)),n>Hs&&n--}return{lodMeshes:t,sizeLods:e}}function zu(i,e,t){let n=new un(i,e,t);return n.texture.mapping=Ir,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Os(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Wm(i,e,t){return new cn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:zm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:rl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Xm(i,e,t){return new cn({name:"SphericalGaussianBlur",defines:{SAMPLES:Gm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:rl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function ku(){return new cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Vu(){return new cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function rl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var il=class extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new dr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ve(5,5,5),r=new cn({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:Zn});r.uniforms.tEquirect.value=t;let a=new k(s,r),o=t.minFilter;return t.minFilter===Ni&&(t.minFilter=Kt),new lo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function qm(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===uo||f===fo)if(e.has(u)){let m=e.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let y=new il(m.height);return y.fromEquirectangularTexture(i,u),e.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,m=f===uo||f===fo,y=f===Di||f===Ji;if(m||y){let g=t.get(u),p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new zs(i)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let w=u.image;return m&&w&&w.height>0||y&&w&&l(w)?(n===null&&(n=new zs(i)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===uo?u.mapping=Di:f===fo&&(u.mapping=Ji),u}function l(u){let f=0,m=6;for(let y=0;y<m;y++)u[y]!==void 0&&f++;return f===m}function c(u){let f=u.target;f.removeEventListener("dispose",c);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Ym(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Vi("WebGLRenderer: "+n+" extension not supported."),s}}}function $m(i,e,t,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,m=d.attributes.position,y=0;if(m===void 0)return;if(f!==null){let w=f.array;y=f.version;for(let P=0,v=w.length;P<v;P+=3){let b=w[P+0],E=w[P+1],I=w[P+2];u.push(b,E,E,I,I,b)}}else{let w=m.array;y=m.version;for(let P=0,v=w.length/3-1;P<v;P+=3){let b=P+0,E=P+1,I=P+2;u.push(b,E,E,I,I,b)}}let g=new(m.count>=65535?cr:lr)(u,1);g.version=y;let p=r.get(d);p&&e.remove(p),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Zm(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let y=0;for(let g=0;g<f;g++)y+=u[g];t.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Jm(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Km(i,e,t){let n=new WeakMap,s=new It;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let S=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],P=0;f===!0&&(P=1),m===!0&&(P=2),y===!0&&(P=3);let v=o.attributes.position.count*P,b=1;v>e.maxTextureSize&&(b=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let E=new Float32Array(v*b*4*d),I=new or(E,v,b,d);I.type=An,I.needsUpdate=!0;let _=P*4;for(let N=0;N<d;N++){let B=g[N],O=p[N],F=w[N],R=v*b*4*N;for(let U=0;U<B.count;U++){let G=U*_;f===!0&&(s.fromBufferAttribute(B,U),E[R+G+0]=s.x,E[R+G+1]=s.y,E[R+G+2]=s.z,E[R+G+3]=0),m===!0&&(s.fromBufferAttribute(O,U),E[R+G+4]=s.x,E[R+G+5]=s.y,E[R+G+6]=s.z,E[R+G+7]=0),y===!0&&(s.fromBufferAttribute(F,U),E[R+G+8]=s.x,E[R+G+9]=s.y,E[R+G+10]=s.z,E[R+G+11]=F.itemSize===4?s.w:1)}}u={count:d,texture:I,size:new Ue(v,b)},n.set(o,u),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function jm(i,e,t,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Qm={[dc]:"LINEAR_TONE_MAPPING",[fc]:"REINHARD_TONE_MAPPING",[pc]:"CINEON_TONE_MAPPING",[Cr]:"ACES_FILMIC_TONE_MAPPING",[gc]:"AGX_TONE_MAPPING",[xc]:"NEUTRAL_TONE_MAPPING",[mc]:"CUSTOM_TONE_MAPPING"};function eg(i,e,t,n,s,r){let a=new un(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new wt;c.setAttribute("position",new ot([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ot([0,2,0,0,2,0],2));let h=new Za({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new k(c,h),u=new Ls(-1,1,1,-1,0,1),f=null,m=null,y=!1,g,p=null,w=[],P=!1;this.setSize=function(v,b){a.setSize(v,b),o!==null&&o.setSize(v,b),l!==null&&l.setSize(v,b);for(let E=0;E<w.length;E++){let I=w[E];I.setSize&&I.setSize(v,b)}},this.setEffects=function(v){w=v,P=w.length>0&&w[0].isRenderPass===!0;let b=a.width,E=a.height;w.length>0&&o===null&&(o=new un(b,E,{type:kn,depthBuffer:!1,stencilBuffer:!1}),l=new un(b,E,{type:kn,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<w.length;I++){let _=w[I];_.setSize&&_.setSize(b,E)}},this.begin=function(v,b){if(y||v.toneMapping===Gn&&w.length===0)return!1;if(p=b,b!==null){let E=b.width,I=b.height;(a.width!==E||a.height!==I)&&this.setSize(E,I)}return P===!1&&v.setRenderTarget(a),g=v.toneMapping,v.toneMapping=Gn,!0},this.hasRenderPass=function(){return P},this.end=function(v,b){v.toneMapping=g,y=!0;let E=a,I=o;for(let _=0;_<w.length;_++){let S=w[_];S.enabled!==!1&&(S.render(v,I,E,b),S.needsSwap!==!1&&(E=I,I=I===o?l:o))}if(f!==v.outputColorSpace||m!==v.toneMapping){f=v.outputColorSpace,m=v.toneMapping,h.defines={},ft.getTransfer(f)===bt&&(h.defines.SRGB_TRANSFER="");let _=Qm[m];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,v.setRenderTarget(p),v.render(d,u),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var cd=new ln,Xc=new Ri(1,1),hd=new or,ud=new Ba,dd=new dr,Wu=[],Xu=[],qu=new Float32Array(16),Yu=new Float32Array(9),$u=new Float32Array(4);function ks(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Wu[s];if(r===void 0&&(r=new Float32Array(s),Wu[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function al(i,e){let t=Xu[e];t===void 0&&(t=new Int32Array(e),Xu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function tg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ng(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2fv(this.addr,e),Xt(t,e)}}function ig(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;i.uniform3fv(this.addr,e),Xt(t,e)}}function sg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4fv(this.addr,e),Xt(t,e)}}function rg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;$u.set(n),i.uniformMatrix2fv(this.addr,!1,$u),Xt(t,n)}}function ag(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Yu.set(n),i.uniformMatrix3fv(this.addr,!1,Yu),Xt(t,n)}}function og(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;qu.set(n),i.uniformMatrix4fv(this.addr,!1,qu),Xt(t,n)}}function lg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function cg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2iv(this.addr,e),Xt(t,e)}}function hg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3iv(this.addr,e),Xt(t,e)}}function ug(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4iv(this.addr,e),Xt(t,e)}}function dg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function fg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2uiv(this.addr,e),Xt(t,e)}}function pg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3uiv(this.addr,e),Xt(t,e)}}function mg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4uiv(this.addr,e),Xt(t,e)}}function gg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Xc.compareFunction=t.isReversedDepthBuffer()?el:Qo,r=Xc):r=cd,t.setTexture2D(e||r,s)}function xg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ud,s)}function yg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||dd,s)}function _g(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||hd,s)}function vg(i){switch(i){case 5126:return tg;case 35664:return ng;case 35665:return ig;case 35666:return sg;case 35674:return rg;case 35675:return ag;case 35676:return og;case 5124:case 35670:return lg;case 35667:case 35671:return cg;case 35668:case 35672:return hg;case 35669:case 35673:return ug;case 5125:return dg;case 36294:return fg;case 36295:return pg;case 36296:return mg;case 35678:case 36198:case 36298:case 36306:case 35682:return gg;case 35679:case 36299:case 36307:return xg;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return _g}}function Mg(i,e){i.uniform1fv(this.addr,e)}function bg(i,e){let t=ks(e,this.size,2);i.uniform2fv(this.addr,t)}function Eg(i,e){let t=ks(e,this.size,3);i.uniform3fv(this.addr,t)}function Sg(i,e){let t=ks(e,this.size,4);i.uniform4fv(this.addr,t)}function wg(i,e){let t=ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Tg(i,e){let t=ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ag(i,e){let t=ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Rg(i,e){i.uniform1iv(this.addr,e)}function Cg(i,e){i.uniform2iv(this.addr,e)}function Ig(i,e){i.uniform3iv(this.addr,e)}function Pg(i,e){i.uniform4iv(this.addr,e)}function Lg(i,e){i.uniform1uiv(this.addr,e)}function Dg(i,e){i.uniform2uiv(this.addr,e)}function Ng(i,e){i.uniform3uiv(this.addr,e)}function Ug(i,e){i.uniform4uiv(this.addr,e)}function Fg(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Xc:a=cd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Bg(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ud,r[a])}function Og(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||dd,r[a])}function Hg(i,e,t){let n=this.cache,s=e.length,r=al(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hd,r[a])}function Gg(i){switch(i){case 5126:return Mg;case 35664:return bg;case 35665:return Eg;case 35666:return Sg;case 35674:return wg;case 35675:return Tg;case 35676:return Ag;case 5124:case 35670:return Rg;case 35667:case 35671:return Cg;case 35668:case 35672:return Ig;case 35669:case 35673:return Pg;case 5125:return Lg;case 36294:return Dg;case 36295:return Ng;case 36296:return Ug;case 35678:case 36198:case 36298:case 36306:case 35682:return Fg;case 35679:case 36299:case 36307:return Bg;case 35680:case 36300:case 36308:case 36293:return Og;case 36289:case 36303:case 36311:case 36292:return Hg}}var qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=vg(t.type)}},Yc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gg(t.type)}},$c=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Vc=/(\w+)(\])?(\[|\.)?/g;function Zu(i,e){i.seq.push(e),i.map[e.id]=e}function zg(i,e,t){let n=i.name,s=n.length;for(Vc.lastIndex=0;;){let r=Vc.exec(n),a=Vc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Zu(t,c===void 0?new qc(o,i,e):new Yc(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new $c(o),Zu(t,d)),t=d}}}var Gs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);zg(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Ju(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var kg=37297,Vg=0;function Wg(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Ku=new st;function Xg(i){ft._getMatrix(Ku,ft.workingColorSpace,i);let e=`mat3( ${Ku.elements.map(t=>t.toFixed(4))} )`;switch(ft.getTransfer(i)){case rr:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ju(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Wg(i.getShaderSource(e),o)}else return r}function qg(i,e){let t=Xg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Yg={[dc]:"Linear",[fc]:"Reinhard",[pc]:"Cineon",[Cr]:"ACESFilmic",[gc]:"AgX",[xc]:"Neutral",[mc]:"Custom"};function $g(i,e){let t=Yg[e];return t===void 0?(Ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var nl=new C;function Zg(){ft.getLuminanceCoefficients(nl);let i=nl.x.toFixed(4),e=nl.y.toFixed(4),t=nl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zr).join(`
`)}function Kg(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function jg(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function zr(i){return i!==""}function Qu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ed(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Qg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zc(i){return i.replace(Qg,tx)}var ex=new Map;function tx(i,e){let t=ct[e];if(t===void 0){let n=ex.get(e);if(n!==void 0)t=ct[n],Ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Zc(t)}var nx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function td(i){return i.replace(nx,ix)}function ix(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nd(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var sx={[Tr]:"SHADOWMAP_TYPE_PCF",[Ds]:"SHADOWMAP_TYPE_VSM"};function rx(i){return sx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ax={[Di]:"ENVMAP_TYPE_CUBE",[Ji]:"ENVMAP_TYPE_CUBE",[Ir]:"ENVMAP_TYPE_CUBE_UV"};function ox(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":ax[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var lx={[Ji]:"ENVMAP_MODE_REFRACTION"};function cx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":lx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var hx={[Rr]:"ENVMAP_BLENDING_MULTIPLY",[vu]:"ENVMAP_BLENDING_MIX",[Mu]:"ENVMAP_BLENDING_ADD"};function ux(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":hx[i.combine]||"ENVMAP_BLENDING_NONE"}function dx(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function fx(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=rx(t),c=ox(t),h=cx(t),d=ux(t),u=dx(t),f=Jg(t),m=Kg(r),y=s.createProgram(),g,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(zr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(zr).join(`
`),p.length>0&&(p+=`
`)):(g=[nd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zr).join(`
`),p=[nd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?ct.tonemapping_pars_fragment:"",t.toneMapping!==Gn?$g("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,qg("linearToOutputTexel",t.outputColorSpace),Zg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zr).join(`
`)),a=Zc(a),a=Qu(a,t),a=ed(a,t),o=Zc(o),o=Qu(o,t),o=ed(o,t),a=td(a),o=td(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let P=w+g+a,v=w+p+o,b=Ju(s,s.VERTEX_SHADER,P),E=Ju(s,s.FRAGMENT_SHADER,v);s.attachShader(y,b),s.attachShader(y,E),t.index0AttributeName!==void 0?s.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function I(B){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(y)||"",F=s.getShaderInfoLog(b)||"",R=s.getShaderInfoLog(E)||"",U=O.trim(),G=F.trim(),q=R.trim(),H=!0,L=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,b,E);else{let z=ju(s,b,"vertex"),D=ju(s,E,"fragment");Qe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+U+`
`+z+`
`+D)}else U!==""?Ke("WebGLProgram: Program Info Log:",U):(G===""||q==="")&&(L=!1);L&&(B.diagnostics={runnable:H,programLog:U,vertexShader:{log:G,prefix:g},fragmentShader:{log:q,prefix:p}})}s.deleteShader(b),s.deleteShader(E),_=new Gs(s,y),S=jg(s,y)}let _;this.getUniforms=function(){return _===void 0&&I(this),_};let S;this.getAttributes=function(){return S===void 0&&I(this),S};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(y,kg)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vg++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=b,this.fragmentShader=E,this}var px=0,Jc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Kc(e),t.set(e,n)),n}},Kc=class{constructor(e){this.id=px++,this.code=e,this.usedTimes=0}};function mx(i){return i===Fi||i===Fr||i===Br}function gx(i,e,t,n,s,r){let a=new ws,o=new Jc,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function y(_,S,N,B,O,F){let R=B.fog,U=O.geometry,G=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?B.environment:null,q=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,H=e.get(_.envMap||G,q),L=H&&H.mapping===Ir?H.image.height:null,z=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Ke("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let D=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Z=D!==void 0?D.length:0,te=0;U.morphAttributes.position!==void 0&&(te=1),U.morphAttributes.normal!==void 0&&(te=2),U.morphAttributes.color!==void 0&&(te=3);let ue,pe,se,X;if(z){let vt=Kn[z];ue=vt.vertexShader,pe=vt.fragmentShader}else{ue=_.vertexShader,pe=_.fragmentShader;let vt=o.getVertexShaderStage(_),at=o.getFragmentShaderStage(_);o.update(_,vt,at),se=vt.id,X=at.id}let $=i.getRenderTarget(),me=i.state.buffers.depth.getReversed(),ge=O.isInstancedMesh===!0,_e=O.isBatchedMesh===!0,Ye=!!_.map,dt=!!_.matcap,Je=!!H,et=!!_.aoMap,tt=!!_.lightMap,Q=!!_.bumpMap&&_.wireframe===!1,we=!!_.normalMap,je=!!_.displacementMap,nt=!!_.emissiveMap,qe=!!_.metalnessMap,j=!!_.roughnessMap,M=_.anisotropy>0,re=_.clearcoat>0,he=_.dispersion>0,A=_.retroreflectivity>0,x=_.iridescence>0,J=_.sheen>0,V=_.transmission>0,ee=M&&!!_.anisotropyMap,fe=re&&!!_.clearcoatMap,ye=re&&!!_.clearcoatNormalMap,ae=re&&!!_.clearcoatRoughnessMap,le=x&&!!_.iridescenceMap,xe=x&&!!_.iridescenceThicknessMap,Te=J&&!!_.sheenColorMap,Ee=J&&!!_.sheenRoughnessMap,Ae=!!_.specularMap,We=!!_.specularColorMap,$e=!!_.specularIntensityMap,it=V&&!!_.transmissionMap,Y=V&&!!_.thicknessMap,Se=!!_.gradientMap,ce=!!_.alphaMap,be=_.alphaTest>0,Ce=!!_.alphaHash,de=!!_.extensions,ze=Gn;_.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(ze=i.toneMapping);let Ne={shaderID:z,shaderType:_.type,shaderName:_.name,vertexShader:ue,fragmentShader:pe,defines:_.defines,customVertexShaderID:se,customFragmentShaderID:X,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:_e,batchingColor:_e&&O._colorsTexture!==null,instancing:ge,instancingColor:ge&&O.instanceColor!==null,instancingMorph:ge&&O.morphTexture!==null,outputColorSpace:$===null?i.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:ft.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ye,matcap:dt,envMap:Je,envMapMode:Je&&H.mapping,envMapCubeUVHeight:L,aoMap:et,lightMap:tt,bumpMap:Q,normalMap:we,displacementMap:je,emissiveMap:nt,normalMapObjectSpace:we&&_.normalMapType===Su,normalMapTangentSpace:we&&_.normalMapType===Bs,packedNormalMap:we&&_.normalMapType===Bs&&mx(_.normalMap.format),metalnessMap:qe,roughnessMap:j,anisotropy:M,anisotropyMap:ee,clearcoat:re,clearcoatMap:fe,clearcoatNormalMap:ye,clearcoatRoughnessMap:ae,dispersion:he,retroreflection:A,iridescence:x,iridescenceMap:le,iridescenceThicknessMap:xe,sheen:J,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:Ae,specularColorMap:We,specularIntensityMap:$e,transmission:V,transmissionMap:it,thicknessMap:Y,gradientMap:Se,opaque:_.transparent===!1&&_.blending===Ns&&_.alphaToCoverage===!1,alphaMap:ce,alphaTest:be,alphaHash:Ce,combine:_.combine,mapUv:Ye&&m(_.map.channel),aoMapUv:et&&m(_.aoMap.channel),lightMapUv:tt&&m(_.lightMap.channel),bumpMapUv:Q&&m(_.bumpMap.channel),normalMapUv:we&&m(_.normalMap.channel),displacementMapUv:je&&m(_.displacementMap.channel),emissiveMapUv:nt&&m(_.emissiveMap.channel),metalnessMapUv:qe&&m(_.metalnessMap.channel),roughnessMapUv:j&&m(_.roughnessMap.channel),anisotropyMapUv:ee&&m(_.anisotropyMap.channel),clearcoatMapUv:fe&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:ye&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(_.sheenRoughnessMap.channel),specularMapUv:Ae&&m(_.specularMap.channel),specularColorMapUv:We&&m(_.specularColorMap.channel),specularIntensityMapUv:$e&&m(_.specularIntensityMap.channel),transmissionMapUv:it&&m(_.transmissionMap.channel),thicknessMapUv:Y&&m(_.thicknessMap.channel),alphaMapUv:ce&&m(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(we||M),vertexNormals:!!U.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!U.attributes.uv&&(Ye||ce),fog:!!R,useFog:_.fog===!0,fogExp2:!!R&&R.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||U.attributes.normal===void 0&&we===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:me,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:te,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:ze,decodeVideoTexture:Ye&&_.map.isVideoTexture===!0&&ft.getTransfer(_.map.colorSpace)===bt,decodeVideoTextureEmissive:nt&&_.emissiveMap.isVideoTexture===!0&&ft.getTransfer(_.emissiveMap.colorSpace)===bt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ut,flipSided:_.side===Ht,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:de&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&_.extensions.multiDraw===!0||_e)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function g(_){let S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(let N in _.defines)S.push(N),S.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(p(S,_),w(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function p(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numSunLights),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numSunLightShadows),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function w(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function P(_){let S=f[_.type],N;if(S){let B=Kn[S];N=Bu.clone(B.uniforms)}else N=_.uniforms;return N}function v(_,S){let N=h.get(S);return N!==void 0?++N.usedTimes:(N=new fx(i,S,_,s),c.push(N),h.set(S,N)),N}function b(_){if(--_.usedTimes===0){let S=c.indexOf(_);c[S]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function E(_){o.remove(_)}function I(){o.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:P,acquireProgram:v,releaseProgram:b,releaseShaderCache:E,programs:c,dispose:I}}function xx(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function yx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function id(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function sd(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,y,g,p){let w=i[e];return w===void 0?(w={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:g,group:p},i[e]=w):(w.id=u.id,w.object=u,w.geometry=f,w.material=m,w.materialVariant=a(u),w.groupOrder=y,w.renderOrder=u.renderOrder,w.z=g,w.group=p),e++,w}function l(u,f,m,y,g,p,w){w.reversedDepth===!0&&(g=-g);let P=o(u,f,m,y,g,p);m.transmission>0?n.push(P):m.transparent===!0?s.push(P):t.push(P)}function c(u,f,m,y,g,p){let w=o(u,f,m,y,g,p);m.transmission>0?n.unshift(w):m.transparent===!0?s.unshift(w):t.unshift(w)}function h(u,f){t.length>1&&t.sort(u||yx),n.length>1&&n.sort(f||id),s.length>1&&s.sort(f||id)}function d(){for(let u=e,f=i.length;u<f;u++){let m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function _x(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new sd,i.set(n,[a])):s>=r.length?(a=new sd,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function vx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new C,color:new He};break;case"SpotLight":t={position:new C,direction:new C,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function Mx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var bx=0;function Ex(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Sx(i){let e=new vx,t=Mx(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);let s=new C,r=new mt,a=new mt;function o(c){let h=0,d=0,u=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,w=0,P=0,v=0,b=0,E=0,I=0,_=0,S=0,N=0;c.sort(Ex);for(let O=0,F=c.length;O<F;O++){let R=c[O],U=R.color,G=R.intensity,q=R.distance,H=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Fi?H=R.shadow.map.texture:H=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=U.r*G,d+=U.g*G,u+=U.b*G;else if(R.isLightProbe){for(let L=0;L<9;L++)n.probe[L].addScaledVector(R.sh.coefficients[L],G);N++}else if(R.isSunLight){let L=e.get(R);if(L.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let z=R.shadow,D=t.get(R);D.shadowIntensity=z.intensity,D.shadowBias=z.bias,D.shadowNormalBias=z.normalBias,D.shadowRadius=z.radius,D.shadowMapSize.copy(z.mapSize).multiply(z.getFrameExtents()),n.sunShadow[m]=D,n.sunShadowMap[m]=H;let Z=z.getViewportCount();for(let te=0;te<Z;te++)n.sunShadowMatrix[y+te]=z.getMatrix(te),n.sunShadowCascade[y+te]=z._cascadeData[te];y+=Z,m++}n.sun[f]=L,f++}else if(R.isDirectionalLight){let L=e.get(R);if(L.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let z=R.shadow,D=t.get(R);D.shadowIntensity=z.intensity,D.shadowBias=z.bias,D.shadowNormalBias=z.normalBias,D.shadowRadius=z.radius,D.shadowMapSize=z.mapSize,n.directionalShadow[g]=D,n.directionalShadowMap[g]=H,n.directionalShadowMatrix[g]=R.shadow.matrix,b++}n.directional[g]=L,g++}else if(R.isSpotLight){let L=e.get(R);L.position.setFromMatrixPosition(R.matrixWorld),L.color.copy(U).multiplyScalar(G),L.distance=q,L.coneCos=Math.cos(R.angle),L.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),L.decay=R.decay,n.spot[w]=L;let z=R.shadow;if(R.map&&(n.spotLightMap[_]=R.map,_++,z.updateMatrices(R),R.castShadow&&S++),n.spotLightMatrix[w]=z.matrix,R.castShadow){let D=t.get(R);D.shadowIntensity=z.intensity,D.shadowBias=z.bias,D.shadowNormalBias=z.normalBias,D.shadowRadius=z.radius,D.shadowMapSize=z.mapSize,n.spotShadow[w]=D,n.spotShadowMap[w]=H,I++}w++}else if(R.isRectAreaLight){let L=e.get(R);L.color.copy(U).multiplyScalar(G),L.halfWidth.set(R.width*.5,0,0),L.halfHeight.set(0,R.height*.5,0),n.rectArea[P]=L,P++}else if(R.isPointLight){let L=e.get(R);if(L.color.copy(R.color).multiplyScalar(R.intensity),L.distance=R.distance,L.decay=R.decay,R.castShadow){let z=R.shadow,D=t.get(R);D.shadowIntensity=z.intensity,D.shadowBias=z.bias,D.shadowNormalBias=z.normalBias,D.shadowRadius=z.radius,D.shadowMapSize=z.mapSize,D.shadowCameraNear=z.camera.near,D.shadowCameraFar=z.camera.far,n.pointShadow[p]=D,n.pointShadowMap[p]=H,n.pointShadowMatrix[p]=R.shadow.matrix,E++}n.point[p]=L,p++}else if(R.isHemisphereLight){let L=e.get(R);L.skyColor.copy(R.color).multiplyScalar(G),L.groundColor.copy(R.groundColor).multiplyScalar(G),n.hemi[v]=L,v++}}P>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ie.LTC_FLOAT_1,n.rectAreaLTC2=Ie.LTC_FLOAT_2):(n.rectAreaLTC1=Ie.LTC_HALF_1,n.rectAreaLTC2=Ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let B=n.hash;(B.sunLength!==f||B.directionalLength!==g||B.pointLength!==p||B.spotLength!==w||B.rectAreaLength!==P||B.hemiLength!==v||B.numSunShadows!==m||B.numDirectionalShadows!==b||B.numPointShadows!==E||B.numSpotShadows!==I||B.numSpotMaps!==_||B.numLightProbes!==N)&&(n.sun.length=f,n.directional.length=g,n.spot.length=w,n.rectArea.length=P,n.point.length=p,n.hemi.length=v,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=I,n.spotShadowMap.length=I,n.spotLightMatrix.length=I+_-S,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=N,B.sunLength=f,B.directionalLength=g,B.pointLength=p,B.spotLength=w,B.rectAreaLength=P,B.hemiLength=v,B.numSunShadows=m,B.numDirectionalShadows=b,B.numPointShadows=E,B.numSpotShadows=I,B.numSpotMaps=_,B.numLightProbes=N,n.version=bx++)}function l(c,h){let d=0,u=0,f=0,m=0,y=0,g=0,p=h.matrixWorldInverse;for(let w=0,P=c.length;w<P;w++){let v=c[w];if(v.isSunLight){let b=n.sun[d];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(p),d++}else if(v.isDirectionalLight){let b=n.directional[u];b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),u++}else if(v.isSpotLight){let b=n.spot[m];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),b.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(p),m++}else if(v.isRectAreaLight){let b=n.rectArea[y];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),a.identity(),r.copy(v.matrixWorld),r.premultiply(p),a.extractRotation(r),b.halfWidth.set(v.width*.5,0,0),b.halfHeight.set(0,v.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),y++}else if(v.isPointLight){let b=n.point[f];b.position.setFromMatrixPosition(v.matrixWorld),b.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){let b=n.hemi[g];b.direction.setFromMatrixPosition(v.matrixWorld),b.direction.transformDirection(p),g++}}}return{setup:o,setupView:l,state:n}}function rd(i){let e=new Sx(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function wx(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new rd(i),e.set(s,[o])):r>=a.length?(o=new rd(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Tx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ax=`uniform sampler2D shadow_pass;
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
}`,Rx=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],Cx=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],ad=new mt,Gr=new C,Wc=new C;function Ix(i,e,t){let n=new Cs,s=new Ue,r=new Ue,a=new It,o=new Ja,l=new Ka,c={},h=t.maxTextureSize,d={[Tn]:Ht,[Ht]:Tn,[Ut]:Ut},u=new cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:Tx,fragmentShader:Ax}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new wt;m.setAttribute("position",new on(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new k(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tr;let p=this.type;this.render=function(E,I,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;this.type===tu&&(Ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Tr);let S=i.getRenderTarget(),N=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Zn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let F=p!==this.type;F&&I.traverse(function(R){R.material&&(Array.isArray(R.material)?R.material.forEach(U=>U.needsUpdate=!0):R.material.needsUpdate=!0)});for(let R=0,U=E.length;R<U;R++){let G=E[R],q=G.shadow;if(q===void 0){Ke("WebGLShadowMap:",G,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let H=q.getFrameExtents();s.multiply(H),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/H.x),s.x=r.x*H.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/H.y),s.y=r.y*H.y,q.mapSize.y=r.y));let L=i.state.buffers.depth.getReversed();if(q.camera._reversedDepth=L,q.map===null||F===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===Ds){if(G.isPointLight){Ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new un(s.x,s.y,{format:Fi,type:kn,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),q.map.texture.name=G.name+".shadowMap",q.map.depthTexture=new Ri(s.x,s.y,An),q.map.depthTexture.name=G.name+".shadowMapDepth",q.map.depthTexture.format=qn,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Zt,q.map.depthTexture.magFilter=Zt}else G.isPointLight?(q.map=new il(s.x),q.map.depthTexture=new Ga(s.x,zn)):(q.map=new un(s.x,s.y),q.map.depthTexture=new Ri(s.x,s.y,zn)),q.map.depthTexture.name=G.name+".shadowMap",q.map.depthTexture.format=qn,this.type===Tr?(q.map.depthTexture.compareFunction=L?el:Qo,q.map.depthTexture.minFilter=Kt,q.map.depthTexture.magFilter=Kt):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Zt,q.map.depthTexture.magFilter=Zt);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);let z=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();G.isPointLight!==!0&&q.updateMatrices(G,_);for(let D=0;D<z;D++){let Z=q.getCamera(D);if(G.isPointLight){let te=q.camera,ue=q.matrix,pe=G.distance||te.far;pe!==te.far&&(te.far=pe,te.updateProjectionMatrix()),Gr.setFromMatrixPosition(G.matrixWorld),te.position.copy(Gr),Wc.copy(te.position),Wc.add(Rx[D]),te.up.copy(Cx[D]),te.lookAt(Wc),te.updateMatrixWorld(),ue.makeTranslation(-Gr.x,-Gr.y,-Gr.z),ad.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),q._frustum.setFromProjectionMatrix(ad,te.coordinateSystem,te.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)i.setRenderTarget(q.map,D),i.clear();else{D===0&&(i.setRenderTarget(q.map),i.clear());let te=q.getViewport(D);a.set(r.x*te.x,r.y*te.y,r.x*te.z,r.y*te.w),O.viewport(a)}n=q.getFrustum(D),v(I,_,Z,G,this.type)}q.isPointLightShadow!==!0&&this.type===Ds&&w(q,_),q.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,N,B)};function w(E,I){let _=e.update(y);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new un(s.x,s.y,{format:Fi,type:kn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(I,null,_,u,y,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(I,null,_,f,y,null)}function P(E,I,_,S){let N=null,B=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(B!==void 0)N=B;else if(N=_.isPointLight===!0?l:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let O=N.uuid,F=I.uuid,R=c[O];R===void 0&&(R={},c[O]=R);let U=R[F];U===void 0&&(U=N.clone(),R[F]=U,I.addEventListener("dispose",b)),N=U}if(N.visible=I.visible,N.wireframe=I.wireframe,S===Ds?N.side=I.shadowSide!==null?I.shadowSide:I.side:N.side=I.shadowSide!==null?I.shadowSide:d[I.side],N.alphaMap=I.alphaMap,N.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,N.map=I.map,N.clipShadows=I.clipShadows,N.clippingPlanes=I.clippingPlanes,N.clipIntersection=I.clipIntersection,N.displacementMap=I.displacementMap,N.displacementScale=I.displacementScale,N.displacementBias=I.displacementBias,N.wireframeLinewidth=I.wireframeLinewidth,N.linewidth=I.linewidth,_.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let O=i.properties.get(N);O.light=_}return N}function v(E,I,_,S,N){if(E.visible===!1)return;if(E.layers.test(I.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&N===Ds)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);let F=e.update(E),R=E.material;if(Array.isArray(R)){let U=F.groups;for(let G=0,q=U.length;G<q;G++){let H=U[G],L=R[H.materialIndex];if(L&&L.visible){let z=P(E,L,S,N);E.onBeforeShadow(i,E,I,_,F,z,H),i.renderBufferDirect(_,null,F,z,E,H),E.onAfterShadow(i,E,I,_,F,z,H)}}}else if(R.visible){let U=P(E,R,S,N);E.onBeforeShadow(i,E,I,_,F,U,null),i.renderBufferDirect(_,null,F,U,E,null),E.onAfterShadow(i,E,I,_,F,U,null)}}let O=E.children;for(let F=0,R=O.length;F<R;F++)v(O[F],I,_,S,N)}function b(E){E.target.removeEventListener("dispose",b);for(let _ in c){let S=c[_],N=E.target.uuid;N in S&&(S[N].dispose(),delete S[N])}}}function Px(i,e){function t(){let Y=!1,Se=new It,ce=null,be=new It(0,0,0,0);return{setMask:function(Ce){ce!==Ce&&!Y&&(i.colorMask(Ce,Ce,Ce,Ce),ce=Ce)},setLocked:function(Ce){Y=Ce},setClear:function(Ce,de,ze,Ne,vt){vt===!0&&(Ce*=Ne,de*=Ne,ze*=Ne),Se.set(Ce,de,ze,Ne),be.equals(Se)===!1&&(i.clearColor(Ce,de,ze,Ne),be.copy(Se))},reset:function(){Y=!1,ce=null,be.set(-1,0,0,0)}}}function n(){let Y=!1,Se=!1,ce=null,be=null,Ce=null;return{setReversed:function(de){if(Se!==de){let ze=e.get("EXT_clip_control");de?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),Se=de;let Ne=Ce;Ce=null,this.setClear(Ne)}},getReversed:function(){return Se},setTest:function(de){de?$(i.DEPTH_TEST):me(i.DEPTH_TEST)},setMask:function(de){ce!==de&&!Y&&(i.depthMask(de),ce=de)},setFunc:function(de){if(Se&&(de=Uu[de]),be!==de){switch(de){case wa:i.depthFunc(i.NEVER);break;case Ta:i.depthFunc(i.ALWAYS);break;case Aa:i.depthFunc(i.LESS);break;case Ms:i.depthFunc(i.LEQUAL);break;case Ra:i.depthFunc(i.EQUAL);break;case Ca:i.depthFunc(i.GEQUAL);break;case Ia:i.depthFunc(i.GREATER);break;case Pa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}be=de}},setLocked:function(de){Y=de},setClear:function(de){Ce!==de&&(Ce=de,Se&&(de=1-de),i.clearDepth(de))},reset:function(){Y=!1,ce=null,be=null,Ce=null,Se=!1}}}function s(){let Y=!1,Se=null,ce=null,be=null,Ce=null,de=null,ze=null,Ne=null,vt=null;return{setTest:function(at){Y||(at?$(i.STENCIL_TEST):me(i.STENCIL_TEST))},setMask:function(at){Se!==at&&!Y&&(i.stencilMask(at),Se=at)},setFunc:function(at,Qt,fn){(ce!==at||be!==Qt||Ce!==fn)&&(i.stencilFunc(at,Qt,fn),ce=at,be=Qt,Ce=fn)},setOp:function(at,Qt,fn){(de!==at||ze!==Qt||Ne!==fn)&&(i.stencilOp(at,Qt,fn),de=at,ze=Qt,Ne=fn)},setLocked:function(at){Y=at},setClear:function(at){vt!==at&&(i.clearStencil(at),vt=at)},reset:function(){Y=!1,Se=null,ce=null,be=null,Ce=null,de=null,ze=null,Ne=null,vt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,m=[],y=null,g=!1,p=null,w=null,P=null,v=null,b=null,E=null,I=null,_=new He(0,0,0),S=0,N=!1,B=null,O=null,F=null,R=null,U=null,G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,H=0,L=i.getParameter(i.VERSION);L.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(L)[1]),q=H>=1):L.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(L)[1]),q=H>=2);let z=null,D={},Z=i.getParameter(i.SCISSOR_BOX),te=i.getParameter(i.VIEWPORT),ue=new It().fromArray(Z),pe=new It().fromArray(te);function se(Y,Se,ce,be){let Ce=new Uint8Array(4),de=i.createTexture();i.bindTexture(Y,de),i.texParameteri(Y,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(Y,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<ce;ze++)Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?i.texImage3D(Se,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,Ce):i.texImage2D(Se+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ce);return de}let X={};X[i.TEXTURE_2D]=se(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=se(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=se(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=se(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(i.DEPTH_TEST),a.setFunc(Ms),Q(!1),we(oc),$(i.CULL_FACE),et(Zn);function $(Y){h[Y]!==!0&&(i.enable(Y),h[Y]=!0)}function me(Y){h[Y]!==!1&&(i.disable(Y),h[Y]=!1)}function ge(Y,Se){return u[Y]!==Se?(i.bindFramebuffer(Y,Se),u[Y]=Se,Y===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Se),Y===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Se),!0):!1}function _e(Y,Se){let ce=m,be=!1;if(Y){ce=f.get(Se),ce===void 0&&(ce=[],f.set(Se,ce));let Ce=Y.textures;if(ce.length!==Ce.length||ce[0]!==i.COLOR_ATTACHMENT0){for(let de=0,ze=Ce.length;de<ze;de++)ce[de]=i.COLOR_ATTACHMENT0+de;ce.length=Ce.length,be=!0}}else ce[0]!==i.BACK&&(ce[0]=i.BACK,be=!0);be&&i.drawBuffers(ce)}function Ye(Y){return y!==Y?(i.useProgram(Y),y=Y,!0):!1}let dt={[Zi]:i.FUNC_ADD,[iu]:i.FUNC_SUBTRACT,[su]:i.FUNC_REVERSE_SUBTRACT};dt[ru]=i.MIN,dt[au]=i.MAX;let Je={[ou]:i.ZERO,[lu]:i.ONE,[cu]:i.SRC_COLOR,[hc]:i.SRC_ALPHA,[mu]:i.SRC_ALPHA_SATURATE,[fu]:i.DST_COLOR,[uu]:i.DST_ALPHA,[hu]:i.ONE_MINUS_SRC_COLOR,[uc]:i.ONE_MINUS_SRC_ALPHA,[pu]:i.ONE_MINUS_DST_COLOR,[du]:i.ONE_MINUS_DST_ALPHA,[gu]:i.CONSTANT_COLOR,[xu]:i.ONE_MINUS_CONSTANT_COLOR,[yu]:i.CONSTANT_ALPHA,[_u]:i.ONE_MINUS_CONSTANT_ALPHA};function et(Y,Se,ce,be,Ce,de,ze,Ne,vt,at){if(Y===Zn){g===!0&&(me(i.BLEND),g=!1);return}if(g===!1&&($(i.BLEND),g=!0),Y!==nu){if(Y!==p||at!==N){if((w!==Zi||b!==Zi)&&(i.blendEquation(i.FUNC_ADD),w=Zi,b=Zi),at)switch(Y){case Ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ar:i.blendFunc(i.ONE,i.ONE);break;case lc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Qe("WebGLState: Invalid blending: ",Y);break}else switch(Y){case Ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ar:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case lc:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case cc:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",Y);break}P=null,v=null,E=null,I=null,_.set(0,0,0),S=0,p=Y,N=at}return}Ce=Ce||Se,de=de||ce,ze=ze||be,(Se!==w||Ce!==b)&&(i.blendEquationSeparate(dt[Se],dt[Ce]),w=Se,b=Ce),(ce!==P||be!==v||de!==E||ze!==I)&&(i.blendFuncSeparate(Je[ce],Je[be],Je[de],Je[ze]),P=ce,v=be,E=de,I=ze),(Ne.equals(_)===!1||vt!==S)&&(i.blendColor(Ne.r,Ne.g,Ne.b,vt),_.copy(Ne),S=vt),p=Y,N=!1}function tt(Y,Se){Y.side===Ut?me(i.CULL_FACE):$(i.CULL_FACE);let ce=Y.side===Ht;Se&&(ce=!ce),Q(ce),Y.blending===Ns&&Y.transparent===!1?et(Zn):et(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),a.setFunc(Y.depthFunc),a.setTest(Y.depthTest),a.setMask(Y.depthWrite),r.setMask(Y.colorWrite);let be=Y.stencilWrite;o.setTest(be),be&&(o.setMask(Y.stencilWriteMask),o.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),o.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),nt(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?$(i.SAMPLE_ALPHA_TO_COVERAGE):me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Q(Y){B!==Y&&(Y?i.frontFace(i.CW):i.frontFace(i.CCW),B=Y)}function we(Y){Y!==Qh?($(i.CULL_FACE),Y!==O&&(Y===oc?i.cullFace(i.BACK):Y===eu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):me(i.CULL_FACE),O=Y}function je(Y){Y!==F&&(q&&i.lineWidth(Y),F=Y)}function nt(Y,Se,ce){Y?($(i.POLYGON_OFFSET_FILL),(R!==Se||U!==ce)&&(R=Se,U=ce,a.getReversed()&&(Se=-Se),i.polygonOffset(Se,ce))):me(i.POLYGON_OFFSET_FILL)}function qe(Y){Y?$(i.SCISSOR_TEST):me(i.SCISSOR_TEST)}function j(Y){Y===void 0&&(Y=i.TEXTURE0+G-1),z!==Y&&(i.activeTexture(Y),z=Y)}function M(Y,Se,ce){ce===void 0&&(z===null?ce=i.TEXTURE0+G-1:ce=z);let be=D[ce];be===void 0&&(be={type:void 0,texture:void 0},D[ce]=be),(be.type!==Y||be.texture!==Se)&&(z!==ce&&(i.activeTexture(ce),z=ce),i.bindTexture(Y,Se||X[Y]),be.type=Y,be.texture=Se)}function re(){let Y=D[z];Y!==void 0&&Y.type!==void 0&&(i.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function he(){try{i.compressedTexImage2D(...arguments)}catch(Y){Qe("WebGLState:",Y)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(Y){Qe("WebGLState:",Y)}}function x(){try{i.texSubImage2D(...arguments)}catch(Y){Qe("WebGLState:",Y)}}function J(){try{i.texSubImage3D(...arguments)}catch(Y){Qe("WebGLState:",Y)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(Y){Qe("WebGLState:",Y)}}function ee(){try{i.compressedTexSubImage3D(...arguments)}catch(Y){Qe("WebGLState:",Y)}}function fe(){try{i.texStorage2D(...arguments)}catch(Y){Qe("WebGLState:",Y)}}function ye(){try{i.texStorage3D(...arguments)}catch(Y){Qe("WebGLState:",Y)}}function ae(){try{i.texImage2D(...arguments)}catch(Y){Qe("WebGLState:",Y)}}function le(){try{i.texImage3D(...arguments)}catch(Y){Qe("WebGLState:",Y)}}function xe(Y){return d[Y]!==void 0?d[Y]:i.getParameter(Y)}function Te(Y,Se){d[Y]!==Se&&(i.pixelStorei(Y,Se),d[Y]=Se)}function Ee(Y){ue.equals(Y)===!1&&(i.scissor(Y.x,Y.y,Y.z,Y.w),ue.copy(Y))}function Ae(Y){pe.equals(Y)===!1&&(i.viewport(Y.x,Y.y,Y.z,Y.w),pe.copy(Y))}function We(Y,Se){let ce=c.get(Se);ce===void 0&&(ce=new WeakMap,c.set(Se,ce));let be=ce.get(Y);be===void 0&&(be=i.getUniformBlockIndex(Se,Y.name),ce.set(Y,be))}function $e(Y,Se){let be=c.get(Se).get(Y);l.get(Se)!==be&&(i.uniformBlockBinding(Se,be,Y.__bindingPointIndex),l.set(Se,be))}function it(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},z=null,D={},u={},f=new WeakMap,m=[],y=null,g=!1,p=null,w=null,P=null,v=null,b=null,E=null,I=null,_=new He(0,0,0),S=0,N=!1,B=null,O=null,F=null,R=null,U=null,ue.set(0,0,i.canvas.width,i.canvas.height),pe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:me,bindFramebuffer:ge,drawBuffers:_e,useProgram:Ye,setBlending:et,setMaterial:tt,setFlipSided:Q,setCullFace:we,setLineWidth:je,setPolygonOffset:nt,setScissorTest:qe,activeTexture:j,bindTexture:M,unbindTexture:re,compressedTexImage2D:he,compressedTexImage3D:A,texImage2D:ae,texImage3D:le,pixelStorei:Te,getParameter:xe,updateUBOMapping:We,uniformBlockBinding:$e,texStorage2D:fe,texStorage3D:ye,texSubImage2D:x,texSubImage3D:J,compressedTexSubImage2D:V,compressedTexSubImage3D:ee,scissor:Ee,viewport:Ae,reset:it}}function Lx(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ue,h=new WeakMap,d=new Set,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(A,x){return m?new OffscreenCanvas(A,x):ar("canvas")}function g(A,x,J){let V=1,ee=he(A);if((ee.width>J||ee.height>J)&&(V=J/Math.max(ee.width,ee.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let fe=Math.floor(V*ee.width),ye=Math.floor(V*ee.height);u===void 0&&(u=y(fe,ye));let ae=x?y(fe,ye):u;return ae.width=fe,ae.height=ye,ae.getContext("2d").drawImage(A,0,0,fe,ye),Ke("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+fe+"x"+ye+")."),ae}else return"data"in A&&Ke("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),A;return A}function p(A){return A.generateMipmaps}function w(A){i.generateMipmap(A)}function P(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(A,x,J,V,ee,fe=!1){if(A!==null){if(i[A]!==void 0)return i[A];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ye;V&&(ye=e.get("EXT_texture_norm16"),ye||Ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ae=x;if(x===i.RED&&(J===i.FLOAT&&(ae=i.R32F),J===i.HALF_FLOAT&&(ae=i.R16F),J===i.UNSIGNED_BYTE&&(ae=i.R8),J===i.UNSIGNED_SHORT&&ye&&(ae=ye.R16_EXT),J===i.SHORT&&ye&&(ae=ye.R16_SNORM_EXT)),x===i.RED_INTEGER&&(J===i.UNSIGNED_BYTE&&(ae=i.R8UI),J===i.UNSIGNED_SHORT&&(ae=i.R16UI),J===i.UNSIGNED_INT&&(ae=i.R32UI),J===i.BYTE&&(ae=i.R8I),J===i.SHORT&&(ae=i.R16I),J===i.INT&&(ae=i.R32I)),x===i.RG&&(J===i.FLOAT&&(ae=i.RG32F),J===i.HALF_FLOAT&&(ae=i.RG16F),J===i.UNSIGNED_BYTE&&(ae=i.RG8),J===i.UNSIGNED_SHORT&&ye&&(ae=ye.RG16_EXT),J===i.SHORT&&ye&&(ae=ye.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(J===i.UNSIGNED_BYTE&&(ae=i.RG8UI),J===i.UNSIGNED_SHORT&&(ae=i.RG16UI),J===i.UNSIGNED_INT&&(ae=i.RG32UI),J===i.BYTE&&(ae=i.RG8I),J===i.SHORT&&(ae=i.RG16I),J===i.INT&&(ae=i.RG32I)),x===i.RGB_INTEGER&&(J===i.UNSIGNED_BYTE&&(ae=i.RGB8UI),J===i.UNSIGNED_SHORT&&(ae=i.RGB16UI),J===i.UNSIGNED_INT&&(ae=i.RGB32UI),J===i.BYTE&&(ae=i.RGB8I),J===i.SHORT&&(ae=i.RGB16I),J===i.INT&&(ae=i.RGB32I)),x===i.RGBA_INTEGER&&(J===i.UNSIGNED_BYTE&&(ae=i.RGBA8UI),J===i.UNSIGNED_SHORT&&(ae=i.RGBA16UI),J===i.UNSIGNED_INT&&(ae=i.RGBA32UI),J===i.BYTE&&(ae=i.RGBA8I),J===i.SHORT&&(ae=i.RGBA16I),J===i.INT&&(ae=i.RGBA32I)),x===i.RGB&&(J===i.UNSIGNED_SHORT&&ye&&(ae=ye.RGB16_EXT),J===i.SHORT&&ye&&(ae=ye.RGB16_SNORM_EXT),J===i.UNSIGNED_INT_5_9_9_9_REV&&(ae=i.RGB9_E5),J===i.UNSIGNED_INT_10F_11F_11F_REV&&(ae=i.R11F_G11F_B10F)),x===i.RGBA){let le=fe?rr:ft.getTransfer(ee);J===i.FLOAT&&(ae=i.RGBA32F),J===i.HALF_FLOAT&&(ae=i.RGBA16F),J===i.UNSIGNED_BYTE&&(ae=le===bt?i.SRGB8_ALPHA8:i.RGBA8),J===i.UNSIGNED_SHORT&&ye&&(ae=ye.RGBA16_EXT),J===i.SHORT&&ye&&(ae=ye.RGBA16_SNORM_EXT),J===i.UNSIGNED_SHORT_4_4_4_4&&(ae=i.RGBA4),J===i.UNSIGNED_SHORT_5_5_5_1&&(ae=i.RGB5_A1)}return(ae===i.R16F||ae===i.R32F||ae===i.RG16F||ae===i.RG32F||ae===i.RGBA16F||ae===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function b(A,x){let J;return A?x===null||x===zn||x===Fs?J=i.DEPTH24_STENCIL8:x===An?J=i.DEPTH32F_STENCIL8:x===Us&&(J=i.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===zn||x===Fs?J=i.DEPTH_COMPONENT24:x===An?J=i.DEPTH_COMPONENT32F:x===Us&&(J=i.DEPTH_COMPONENT16),J}function E(A,x){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Zt&&A.minFilter!==Kt?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function I(A){let x=A.target;x.removeEventListener("dispose",I),S(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function _(A){let x=A.target;x.removeEventListener("dispose",_),B(x)}function S(A){let x=n.get(A);if(x.__webglInit===void 0)return;let J=A.source,V=f.get(J);if(V){let ee=V[x.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&N(A),Object.keys(V).length===0&&f.delete(J)}n.remove(A)}function N(A){let x=n.get(A);i.deleteTexture(x.__webglTexture);let J=A.source,V=f.get(J);delete V[x.__cacheKey],a.memory.textures--}function B(A){let x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(x.__webglFramebuffer[V]))for(let ee=0;ee<x.__webglFramebuffer[V].length;ee++)i.deleteFramebuffer(x.__webglFramebuffer[V][ee]);else i.deleteFramebuffer(x.__webglFramebuffer[V]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[V])}else{if(Array.isArray(x.__webglFramebuffer))for(let V=0;V<x.__webglFramebuffer.length;V++)i.deleteFramebuffer(x.__webglFramebuffer[V]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let V=0;V<x.__webglColorRenderbuffer.length;V++)x.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[V]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let J=A.textures;for(let V=0,ee=J.length;V<ee;V++){let fe=n.get(J[V]);fe.__webglTexture&&(i.deleteTexture(fe.__webglTexture),a.memory.textures--),n.remove(J[V])}n.remove(A)}let O=0;function F(){O=0}function R(){return O}function U(A){O=A}function G(){let A=O;return A>=s.maxTextures&&Ke("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,A}function q(A){let x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function H(A,x){let J=n.get(A);if(A.isVideoTexture&&M(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&J.__version!==A.version){let V=A.image;if(V===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{me(J,A,x);return}}else A.isExternalTexture&&(J.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,J.__webglTexture,i.TEXTURE0+x)}function L(A,x){let J=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&J.__version!==A.version){me(J,A,x);return}else A.isExternalTexture&&(J.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,J.__webglTexture,i.TEXTURE0+x)}function z(A,x){let J=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&J.__version!==A.version){me(J,A,x);return}t.bindTexture(i.TEXTURE_3D,J.__webglTexture,i.TEXTURE0+x)}function D(A,x){let J=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&J.__version!==A.version){ge(J,A,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture,i.TEXTURE0+x)}let Z={[Wi]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[La]:i.MIRRORED_REPEAT},te={[Zt]:i.NEAREST,[bu]:i.NEAREST_MIPMAP_NEAREST,[Pr]:i.NEAREST_MIPMAP_LINEAR,[Kt]:i.LINEAR,[po]:i.LINEAR_MIPMAP_NEAREST,[Ni]:i.LINEAR_MIPMAP_LINEAR},ue={[wu]:i.NEVER,[Iu]:i.ALWAYS,[Tu]:i.LESS,[Qo]:i.LEQUAL,[Au]:i.EQUAL,[el]:i.GEQUAL,[Ru]:i.GREATER,[Cu]:i.NOTEQUAL};function pe(A,x){if(x.type===An&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Kt||x.magFilter===po||x.magFilter===Pr||x.magFilter===Ni||x.minFilter===Kt||x.minFilter===po||x.minFilter===Pr||x.minFilter===Ni)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Z[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Z[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Z[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,te[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,te[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ue[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Zt||x.minFilter!==Pr&&x.minFilter!==Ni||x.type===An&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let J=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function se(A,x){let J=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",I));let V=x.source,ee=f.get(V);ee===void 0&&(ee={},f.set(V,ee));let fe=q(x);if(fe!==A.__cacheKey){ee[fe]===void 0&&(ee[fe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,J=!0),ee[fe].usedTimes++;let ye=ee[A.__cacheKey];ye!==void 0&&(ee[A.__cacheKey].usedTimes--,ye.usedTimes===0&&N(x)),A.__cacheKey=fe,A.__webglTexture=ee[fe].texture}return J}function X(A,x,J){return Math.floor(Math.floor(A/J)/x)}function $(A,x,J,V){let fe=A.updateRanges;if(fe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,J,V,x.data);else{fe.sort((Te,Ee)=>Te.start-Ee.start);let ye=0;for(let Te=1;Te<fe.length;Te++){let Ee=fe[ye],Ae=fe[Te],We=Ee.start+Ee.count,$e=X(Ae.start,x.width,4),it=X(Ee.start,x.width,4);Ae.start<=We+1&&$e===it&&X(Ae.start+Ae.count-1,x.width,4)===$e?Ee.count=Math.max(Ee.count,Ae.start+Ae.count-Ee.start):(++ye,fe[ye]=Ae)}fe.length=ye+1;let ae=t.getParameter(i.UNPACK_ROW_LENGTH),le=t.getParameter(i.UNPACK_SKIP_PIXELS),xe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let Te=0,Ee=fe.length;Te<Ee;Te++){let Ae=fe[Te],We=Math.floor(Ae.start/4),$e=Math.ceil(Ae.count/4),it=We%x.width,Y=Math.floor(We/x.width),Se=$e,ce=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,it),t.pixelStorei(i.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(i.TEXTURE_2D,0,it,Y,Se,ce,J,V,x.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ae),t.pixelStorei(i.UNPACK_SKIP_PIXELS,le),t.pixelStorei(i.UNPACK_SKIP_ROWS,xe)}}function me(A,x,J){let V=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=i.TEXTURE_3D);let ee=se(A,x),fe=x.source;t.bindTexture(V,A.__webglTexture,i.TEXTURE0+J);let ye=n.get(fe);if(fe.version!==ye.__version||ee===!0){if(t.activeTexture(i.TEXTURE0+J),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let ce=ft.getPrimaries(ft.workingColorSpace),be=x.colorSpace===Cn?null:ft.getPrimaries(x.colorSpace),Ce=x.colorSpace===Cn||ce===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce)}t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let le=g(x.image,!1,s.maxTextureSize);le=re(x,le);let xe=r.convert(x.format,x.colorSpace),Te=r.convert(x.type),Ee=v(x.internalFormat,xe,Te,x.normalized,x.colorSpace,x.isVideoTexture);pe(V,x);let Ae,We=x.mipmaps,$e=x.isVideoTexture!==!0,it=ye.__version===void 0||ee===!0,Y=fe.dataReady,Se=E(x,le);if(x.isDepthTexture)Ee=b(x.format===Ui,x.type),it&&($e?t.texStorage2D(i.TEXTURE_2D,1,Ee,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,Ee,le.width,le.height,0,xe,Te,null));else if(x.isDataTexture)if(We.length>0){$e&&it&&t.texStorage2D(i.TEXTURE_2D,Se,Ee,We[0].width,We[0].height);for(let ce=0,be=We.length;ce<be;ce++)Ae=We[ce],$e?Y&&t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Ae.width,Ae.height,xe,Te,Ae.data):t.texImage2D(i.TEXTURE_2D,ce,Ee,Ae.width,Ae.height,0,xe,Te,Ae.data);x.generateMipmaps=!1}else $e?(it&&t.texStorage2D(i.TEXTURE_2D,Se,Ee,le.width,le.height),Y&&$(x,le,xe,Te)):t.texImage2D(i.TEXTURE_2D,0,Ee,le.width,le.height,0,xe,Te,le.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){$e&&it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ee,We[0].width,We[0].height,le.depth);for(let ce=0,be=We.length;ce<be;ce++)if(Ae=We[ce],x.format!==Rn)if(xe!==null)if($e){if(Y)if(x.layerUpdates.size>0){let Ce=Dc(Ae.width,Ae.height,x.format,x.type);for(let de of x.layerUpdates){let ze=Ae.data.subarray(de*Ce/Ae.data.BYTES_PER_ELEMENT,(de+1)*Ce/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,de,Ae.width,Ae.height,1,xe,ze)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,0,Ae.width,Ae.height,le.depth,xe,Ae.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ce,Ee,Ae.width,Ae.height,le.depth,0,Ae.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?Y&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,0,Ae.width,Ae.height,le.depth,xe,Te,Ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ce,Ee,Ae.width,Ae.height,le.depth,0,xe,Te,Ae.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{$e&&it&&t.texStorage2D(i.TEXTURE_2D,Se,Ee,We[0].width,We[0].height);for(let ce=0,be=We.length;ce<be;ce++)Ae=We[ce],x.format!==Rn?xe!==null?$e?Y&&t.compressedTexSubImage2D(i.TEXTURE_2D,ce,0,0,Ae.width,Ae.height,xe,Ae.data):t.compressedTexImage2D(i.TEXTURE_2D,ce,Ee,Ae.width,Ae.height,0,Ae.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?Y&&t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Ae.width,Ae.height,xe,Te,Ae.data):t.texImage2D(i.TEXTURE_2D,ce,Ee,Ae.width,Ae.height,0,xe,Te,Ae.data)}else if(x.isDataArrayTexture)if($e){if(it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Ee,le.width,le.height,le.depth),Y)if(x.layerUpdates.size>0){let ce=Dc(le.width,le.height,x.format,x.type);for(let be of x.layerUpdates){let Ce=le.data.subarray(be*ce/le.data.BYTES_PER_ELEMENT,(be+1)*ce/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,be,le.width,le.height,1,xe,Te,Ce)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,xe,Te,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,le.width,le.height,le.depth,0,xe,Te,le.data);else if(x.isData3DTexture)$e?(it&&t.texStorage3D(i.TEXTURE_3D,Se,Ee,le.width,le.height,le.depth),Y&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,xe,Te,le.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,le.width,le.height,le.depth,0,xe,Te,le.data);else if(x.isFramebufferTexture){if(it)if($e)t.texStorage2D(i.TEXTURE_2D,Se,Ee,le.width,le.height);else{let ce=le.width,be=le.height;for(let Ce=0;Ce<Se;Ce++)t.texImage2D(i.TEXTURE_2D,Ce,Ee,ce,be,0,xe,Te,null),ce>>=1,be>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let ce=i.canvas;if(ce.hasAttribute("layoutsubtree")||ce.setAttribute("layoutsubtree","true"),le.parentNode!==ce){ce.appendChild(le),d.add(x),ce.onpaint=be=>{let Ce=be.changedElements;for(let de of d)Ce.includes(de.image)&&(de.needsUpdate=!0)},ce.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,le);else{let Ce=i.RGBA,de=i.RGBA,ze=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ce,de,ze,le)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(We.length>0){if($e&&it){let ce=he(We[0]);t.texStorage2D(i.TEXTURE_2D,Se,Ee,ce.width,ce.height)}for(let ce=0,be=We.length;ce<be;ce++)Ae=We[ce],$e?Y&&t.texSubImage2D(i.TEXTURE_2D,ce,0,0,xe,Te,Ae):t.texImage2D(i.TEXTURE_2D,ce,Ee,xe,Te,Ae);x.generateMipmaps=!1}else if($e){if(it){let ce=he(le);t.texStorage2D(i.TEXTURE_2D,Se,Ee,ce.width,ce.height)}Y&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Te,le)}else t.texImage2D(i.TEXTURE_2D,0,Ee,xe,Te,le);p(x)&&w(V),ye.__version=fe.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function ge(A,x,J){if(x.image.length!==6)return;let V=se(A,x),ee=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+J);let fe=n.get(ee);if(ee.version!==fe.__version||V===!0){t.activeTexture(i.TEXTURE0+J);let ye=ft.getPrimaries(ft.workingColorSpace),ae=x.colorSpace===Cn?null:ft.getPrimaries(x.colorSpace),le=x.colorSpace===Cn||ye===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);let xe=x.isCompressedTexture||x.image[0].isCompressedTexture,Te=x.image[0]&&x.image[0].isDataTexture,Ee=[];for(let de=0;de<6;de++)!xe&&!Te?Ee[de]=g(x.image[de],!0,s.maxCubemapSize):Ee[de]=Te?x.image[de].image:x.image[de],Ee[de]=re(x,Ee[de]);let Ae=Ee[0],We=r.convert(x.format,x.colorSpace),$e=r.convert(x.type),it=v(x.internalFormat,We,$e,x.normalized,x.colorSpace),Y=x.isVideoTexture!==!0,Se=fe.__version===void 0||V===!0,ce=ee.dataReady,be=E(x,Ae);pe(i.TEXTURE_CUBE_MAP,x);let Ce;if(xe){Y&&Se&&t.texStorage2D(i.TEXTURE_CUBE_MAP,be,it,Ae.width,Ae.height);for(let de=0;de<6;de++){Ce=Ee[de].mipmaps;for(let ze=0;ze<Ce.length;ze++){let Ne=Ce[ze];x.format!==Rn?We!==null?Y?ce&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze,0,0,Ne.width,Ne.height,We,Ne.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze,it,Ne.width,Ne.height,0,Ne.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze,0,0,Ne.width,Ne.height,We,$e,Ne.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze,it,Ne.width,Ne.height,0,We,$e,Ne.data)}}}else{if(Ce=x.mipmaps,Y&&Se){Ce.length>0&&be++;let de=he(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,be,it,de.width,de.height)}for(let de=0;de<6;de++)if(Te){Y?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,Ee[de].width,Ee[de].height,We,$e,Ee[de].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,it,Ee[de].width,Ee[de].height,0,We,$e,Ee[de].data);for(let ze=0;ze<Ce.length;ze++){let vt=Ce[ze].image[de].image;Y?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze+1,0,0,vt.width,vt.height,We,$e,vt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze+1,it,vt.width,vt.height,0,We,$e,vt.data)}}else{Y?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,We,$e,Ee[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,it,We,$e,Ee[de]);for(let ze=0;ze<Ce.length;ze++){let Ne=Ce[ze];Y?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze+1,0,0,We,$e,Ne.image[de]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,ze+1,it,We,$e,Ne.image[de])}}}p(x)&&w(i.TEXTURE_CUBE_MAP),fe.__version=ee.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function _e(A,x,J,V,ee,fe){let ye=r.convert(J.format,J.colorSpace),ae=r.convert(J.type),le=v(J.internalFormat,ye,ae,J.normalized,J.colorSpace),xe=n.get(x),Te=n.get(J);if(Te.__renderTarget=x,!xe.__hasExternalTextures){let Ee=Math.max(1,x.width>>fe),Ae=Math.max(1,x.height>>fe);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,fe,le,Ee,Ae,x.depth,0,ye,ae,null):t.texImage2D(ee,fe,le,Ee,Ae,0,ye,ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),j(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,ee,Te.__webglTexture,0,qe(x)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,ee,Te.__webglTexture,fe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(A,x,J){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){let V=x.depthTexture,ee=V&&V.isDepthTexture?V.type:null,fe=b(x.stencilBuffer,ee),ye=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;j(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qe(x),fe,x.width,x.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,qe(x),fe,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,fe,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,A)}else{let V=x.textures;for(let ee=0;ee<V.length;ee++){let fe=V[ee],ye=r.convert(fe.format,fe.colorSpace),ae=r.convert(fe.type),le=v(fe.internalFormat,ye,ae,fe.normalized,fe.colorSpace);j(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,qe(x),le,x.width,x.height):J?i.renderbufferStorageMultisample(i.RENDERBUFFER,qe(x),le,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,le,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function dt(A,x,J){let V=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ee=n.get(x.depthTexture);if(ee.__renderTarget=x,(!ee.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,x.depthTexture.addEventListener("dispose",I)),ee.__webglTexture===void 0){ee.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),pe(i.TEXTURE_CUBE_MAP,x.depthTexture);let xe=r.convert(x.depthTexture.format),Te=r.convert(x.depthTexture.type),Ee;x.depthTexture.format===qn?Ee=i.DEPTH_COMPONENT24:x.depthTexture.format===Ui&&(Ee=i.DEPTH24_STENCIL8);for(let Ae=0;Ae<6;Ae++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,Ee,x.width,x.height,0,xe,Te,null)}}else H(x.depthTexture,0);let fe=ee.__webglTexture,ye=qe(x),ae=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+J:i.TEXTURE_2D,le=x.depthTexture.format===Ui?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===qn)j(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,le,ae,fe,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,le,ae,fe,0);else if(x.depthTexture.format===Ui)j(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,le,ae,fe,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,le,ae,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Je(A){let x=n.get(A),J=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){let V=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){let ee=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",ee)};V.addEventListener("dispose",ee),x.__depthDisposeCallback=ee}x.__boundDepthTexture=V}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(J)for(let V=0;V<6;V++)dt(x.__webglFramebuffer[V],A,V);else{let V=A.texture.mipmaps;V&&V.length>0?dt(x.__webglFramebuffer[0],A,0):dt(x.__webglFramebuffer,A,0)}else if(J){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=i.createRenderbuffer(),Ye(x.__webglDepthbuffer[V],A,!1);else{let ee=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=x.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,fe)}}else{let V=A.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Ye(x.__webglDepthbuffer,A,!1);else{let ee=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,fe)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function et(A,x,J){let V=n.get(A);x!==void 0&&_e(V.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),J!==void 0&&Je(A)}function tt(A){let x=A.texture,J=n.get(A),V=n.get(x);A.addEventListener("dispose",_);let ee=A.textures,fe=A.isWebGLCubeRenderTarget===!0,ye=ee.length>1;if(ye||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=x.version,a.memory.textures++),fe){J.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0){J.__webglFramebuffer[ae]=[];for(let le=0;le<x.mipmaps.length;le++)J.__webglFramebuffer[ae][le]=i.createFramebuffer()}else J.__webglFramebuffer[ae]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){J.__webglFramebuffer=[];for(let ae=0;ae<x.mipmaps.length;ae++)J.__webglFramebuffer[ae]=i.createFramebuffer()}else J.__webglFramebuffer=i.createFramebuffer();if(ye)for(let ae=0,le=ee.length;ae<le;ae++){let xe=n.get(ee[ae]);xe.__webglTexture===void 0&&(xe.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&j(A)===!1){J.__webglMultisampledFramebuffer=i.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let ae=0;ae<ee.length;ae++){let le=ee[ae];J.__webglColorRenderbuffer[ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,J.__webglColorRenderbuffer[ae]);let xe=r.convert(le.format,le.colorSpace),Te=r.convert(le.type),Ee=v(le.internalFormat,xe,Te,le.normalized,le.colorSpace,A.isXRRenderTarget===!0),Ae=qe(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,Ee,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,J.__webglColorRenderbuffer[ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(J.__webglDepthRenderbuffer=i.createRenderbuffer(),Ye(J.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(fe){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),pe(i.TEXTURE_CUBE_MAP,x);for(let ae=0;ae<6;ae++)if(x.mipmaps&&x.mipmaps.length>0)for(let le=0;le<x.mipmaps.length;le++)_e(J.__webglFramebuffer[ae][le],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,le);else _e(J.__webglFramebuffer[ae],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);p(x)&&w(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let ae=0,le=ee.length;ae<le;ae++){let xe=ee[ae],Te=n.get(xe),Ee=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Ee=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ee,Te.__webglTexture),pe(Ee,xe),_e(J.__webglFramebuffer,A,xe,i.COLOR_ATTACHMENT0+ae,Ee,0),p(xe)&&w(Ee)}t.unbindTexture()}else{let ae=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ae=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,V.__webglTexture),pe(ae,x),x.mipmaps&&x.mipmaps.length>0)for(let le=0;le<x.mipmaps.length;le++)_e(J.__webglFramebuffer[le],A,x,i.COLOR_ATTACHMENT0,ae,le);else _e(J.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,ae,0);p(x)&&w(ae),t.unbindTexture()}A.depthBuffer&&Je(A)}function Q(A){let x=A.textures;for(let J=0,V=x.length;J<V;J++){let ee=x[J];if(p(ee)){let fe=P(A),ye=n.get(ee).__webglTexture;t.bindTexture(fe,ye),w(fe),t.unbindTexture()}}}let we=[],je=[];function nt(A){if(A.samples>0){if(j(A)===!1){let x=A.textures,J=A.width,V=A.height,ee=i.COLOR_BUFFER_BIT,fe=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(A),ae=x.length>1;if(ae)for(let xe=0;xe<x.length;xe++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);let le=A.texture.mipmaps;le&&le.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let xe=0;xe<x.length;xe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[xe]);let Te=n.get(x[xe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Te,0)}i.blitFramebuffer(0,0,J,V,0,0,J,V,ee,i.NEAREST),l===!0&&(we.length=0,je.length=0,we.push(i.COLOR_ATTACHMENT0+xe),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(we.push(fe),je.push(fe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,je)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,we))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ae)for(let xe=0;xe<x.length;xe++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,ye.__webglColorRenderbuffer[xe]);let Te=n.get(x[xe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,Te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){let x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function qe(A){return Math.min(s.maxSamples,A.samples)}function j(A){let x=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function M(A){let x=a.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function re(A,x){let J=A.colorSpace,V=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||J!==sr&&J!==Cn&&(ft.getTransfer(J)===bt?(V!==Rn||ee!==dn)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",J)),x}function he(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=F,this.getTextureUnits=R,this.setTextureUnits=U,this.setTexture2D=H,this.setTexture2DArray=L,this.setTexture3D=z,this.setTextureCube=D,this.rebindTextures=et,this.setupRenderTarget=tt,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=nt,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Dx(i,e){function t(n,s=Cn){let r,a=ft.getTransfer(s);if(n===dn)return i.UNSIGNED_BYTE;if(n===go)return i.UNSIGNED_SHORT_4_4_4_4;if(n===xo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Mc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===bc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===_c)return i.BYTE;if(n===vc)return i.SHORT;if(n===Us)return i.UNSIGNED_SHORT;if(n===mo)return i.INT;if(n===zn)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===kn)return i.HALF_FLOAT;if(n===Ec)return i.ALPHA;if(n===Sc)return i.RGB;if(n===Rn)return i.RGBA;if(n===qn)return i.DEPTH_COMPONENT;if(n===Ui)return i.DEPTH_STENCIL;if(n===yo)return i.RED;if(n===_o)return i.RED_INTEGER;if(n===Fi)return i.RG;if(n===vo)return i.RG_INTEGER;if(n===Mo)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Nr||n===Ur)if(a===bt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===bo||n===Eo||n===So||n===wo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===bo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Eo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===So)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===To||n===Ao||n===Ro||n===Co||n===Io||n===Fr||n===Po)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===To||n===Ao)return a===bt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ro)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Co)return r.COMPRESSED_R11_EAC;if(n===Io)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Fr)return r.COMPRESSED_RG11_EAC;if(n===Po)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Lo||n===Do||n===No||n===Uo||n===Fo||n===Bo||n===Oo||n===Ho||n===Go||n===zo||n===ko||n===Vo||n===Wo||n===Xo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Lo)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Do)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===No)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uo)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fo)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Bo)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oo)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ho)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Go)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zo)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ko)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vo)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wo)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xo)return a===bt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===qo||n===Yo||n===$o)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===qo)return a===bt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$o)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zo||n===Jo||n===Br||n===Ko)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Zo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Jo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Br)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Fs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Nx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ux=`
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

}`,jc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new fr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new cn({vertexShader:Nx,fragmentShader:Ux,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new k(new On(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Qc=class extends Yn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null,y=typeof XRWebGLBinding<"u",g=new jc,p={},w=t.getContextAttributes(),P=null,v=null,b=[],E=[],I=new Ue,_=null,S=null,N=new Jt;N.viewport=new It;let B=new Jt;B.viewport=new It;let O=[N,B],F=new co,R=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let $=b[X];return $===void 0&&($=new Ts,b[X]=$),$.getTargetRaySpace()},this.getControllerGrip=function(X){let $=b[X];return $===void 0&&($=new Ts,b[X]=$),$.getGripSpace()},this.getHand=function(X){let $=b[X];return $===void 0&&($=new Ts,b[X]=$),$.getHandSpace()};function G(X){let $=E.indexOf(X.inputSource);if($===-1)return;let me=b[$];me!==void 0&&(me.update(X.inputSource,X.frame,c||a),me.dispatchEvent({type:X.type,data:X.inputSource}))}function q(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",H);for(let X=0;X<b.length;X++){let $=E[X];$!==null&&(E[X]=null,b[X].disconnect($))}R=null,U=null,g.reset();for(let X in p)delete p[X];if(e.setRenderTarget(P),f=null,u=null,d=null,s=null,v=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(I.width,I.height,!1),S!==null){let X=S.camera;X.fov=S.fov,X.zoom=S.zoom,X.updateProjectionMatrix(),S=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(P=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",q),s.addEventListener("inputsourceschange",H),w.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(I),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,ge=null,_e=null;w.depth&&(_e=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=w.stencil?Ui:qn,ge=w.stencil?Fs:zn);let Ye={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ye),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new un(u.textureWidth,u.textureHeight,{format:Rn,type:dn,depthTexture:new Ri(u.textureWidth,u.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let me={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new un(f.framebufferWidth,f.framebufferHeight,{format:Rn,type:dn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),se.setContext(s),se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(X){for(let $=0;$<X.removed.length;$++){let me=X.removed[$],ge=E.indexOf(me);ge>=0&&(E[ge]=null,b[ge].disconnect(me))}for(let $=0;$<X.added.length;$++){let me=X.added[$],ge=E.indexOf(me);if(ge===-1){for(let Ye=0;Ye<b.length;Ye++)if(Ye>=E.length){E.push(me),ge=Ye;break}else if(E[Ye]===null){E[Ye]=me,ge=Ye;break}if(ge===-1)break}let _e=b[ge];_e&&_e.connect(me)}}let L=new C,z=new C;function D(X,$,me){L.setFromMatrixPosition($.matrixWorld),z.setFromMatrixPosition(me.matrixWorld);let ge=L.distanceTo(z),_e=$.projectionMatrix.elements,Ye=me.projectionMatrix.elements,dt=_e[14]/(_e[10]-1),Je=_e[14]/(_e[10]+1),et=(_e[9]+1)/_e[5],tt=(_e[9]-1)/_e[5],Q=(_e[8]-1)/_e[0],we=(Ye[8]+1)/Ye[0],je=dt*Q,nt=dt*we,qe=ge/(-Q+we),j=qe*-Q;if($.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(j),X.translateZ(qe),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),_e[10]===-1)X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let M=dt+qe,re=Je+qe,he=je-j,A=nt+(ge-j),x=et*Je/re*M,J=tt*Je/re*M;X.projectionMatrix.makePerspective(he,A,x,J,M,re),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function Z(X,$){$===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices($.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let $=X.near,me=X.far;g.texture!==null&&(g.depthNear>0&&($=g.depthNear),g.depthFar>0&&(me=g.depthFar)),F.near=B.near=N.near=$,F.far=B.far=N.far=me,(R!==F.near||U!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),R=F.near,U=F.far),F.layers.mask=X.layers.mask|6,N.layers.mask=F.layers.mask&-5,B.layers.mask=F.layers.mask&-3;let ge=X.parent,_e=F.cameras;Z(F,ge);for(let Ye=0;Ye<_e.length;Ye++)Z(_e[Ye],ge);_e.length===2?D(F,N,B):F.projectionMatrix.copy(N.projectionMatrix),S===null&&X.isPerspectiveCamera&&(S={camera:X,fov:X.fov,zoom:X.zoom}),te(X,F,ge)};function te(X,$,me){me===null?X.matrix.copy($.matrixWorld):(X.matrix.copy(me.matrixWorld),X.matrix.invert(),X.matrix.multiply($.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Na*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(X){return p[X]};let ue=null;function pe(X,$){if(h=$.getViewerPose(c||a),m=$,h!==null){let me=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ge=!1;me.length!==F.cameras.length&&(F.cameras.length=0,ge=!0);for(let Je=0;Je<me.length;Je++){let et=me[Je],tt=null;if(f!==null)tt=f.getViewport(et);else{let we=d.getViewSubImage(u,et);tt=we.viewport,Je===0&&(e.setRenderTargetTextures(v,we.colorTexture,we.depthStencilTexture),e.setRenderTarget(v))}let Q=O[Je];Q===void 0&&(Q=new Jt,Q.layers.enable(Je),Q.viewport=new It,O[Je]=Q),Q.matrix.fromArray(et.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(et.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(tt.x,tt.y,tt.width,tt.height),Je===0&&(F.matrix.copy(Q.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ge===!0&&F.cameras.push(Q)}let _e=s.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let Je=d.getDepthInformation(me[0]);Je&&Je.isValid&&Je.texture&&g.init(Je,s.renderState)}if(_e&&_e.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let Je=0;Je<me.length;Je++){let et=me[Je].camera;if(et){let tt=p[et];tt||(tt=new fr,p[et]=tt);let Q=d.getCameraImage(et);tt.sourceTexture=Q}}}}for(let me=0;me<b.length;me++){let ge=E[me],_e=b[me];ge!==null&&_e!==void 0&&_e.update(ge,$,c||a)}ue&&ue(X,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),m=null}let se=new od;se.setAnimationLoop(pe),this.setAnimationLoop=function(X){ue=X},this.dispose=function(){}}},Fx=new mt,fd=new st;fd.set(-1,0,0,0,1,0,0,0,1);function Bx(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Ic(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,w,P,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,w,P):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ht&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ht&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let w=e.get(p),P=w.envMap,v=w.envMapRotation;P&&(g.envMap.value=P,g.envMapRotation.value.setFromMatrix4(Fx.makeRotationFromEuler(v)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(fd),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,w,P){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*w,g.scale.value=P*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,w){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ht&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let w=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ox(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,b){let E=b.program;n.uniformBlockBinding(v,E)}function c(v,b){let E=s[v.id];E===void 0&&(g(v),E=h(v),s[v.id]=E,v.addEventListener("dispose",w));let I=b.program;n.updateUBOMapping(v,I);let _=e.render.frame;r[v.id]!==_&&(u(v),r[v.id]=_)}function h(v){let b=d();v.__bindingPointIndex=b;let E=i.createBuffer(),I=v.__size,_=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,I,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,E),E}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let b=s[v.id],E=v.uniforms,I=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let _=0,S=E.length;_<S;_++){let N=E[_];if(Array.isArray(N))for(let B=0,O=N.length;B<O;B++)f(N[B],_,B,I);else f(N,_,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,b,E,I){if(y(v,b,E,I)===!0){let _=v.__offset,S=v.value;if(Array.isArray(S)){let N=0;for(let B=0;B<S.length;B++){let O=S[B],F=p(O);m(O,v.__data,N),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(N+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(S,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,v.__data)}}function m(v,b,E){typeof v=="number"||typeof v=="boolean"?b[0]=v:v.isMatrix3?(b[0]=v.elements[0],b[1]=v.elements[1],b[2]=v.elements[2],b[3]=0,b[4]=v.elements[3],b[5]=v.elements[4],b[6]=v.elements[5],b[7]=0,b[8]=v.elements[6],b[9]=v.elements[7],b[10]=v.elements[8],b[11]=0):ArrayBuffer.isView(v)?b.set(new v.constructor(v.buffer,v.byteOffset,b.length)):v.toArray(b,E)}function y(v,b,E,I){let _=v.value,S=b+"_"+E;if(I[S]===void 0)return typeof _=="number"||typeof _=="boolean"?I[S]=_:ArrayBuffer.isView(_)?I[S]=_.slice():I[S]=_.clone(),!0;{let N=I[S];if(typeof _=="number"||typeof _=="boolean"){if(N!==_)return I[S]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(N.equals(_)===!1)return N.copy(_),!0}}return!1}function g(v){let b=v.uniforms,E=0,I=16;for(let S=0,N=b.length;S<N;S++){let B=Array.isArray(b[S])?b[S]:[b[S]];for(let O=0,F=B.length;O<F;O++){let R=B[O],U=Array.isArray(R.value)?R.value:[R.value];for(let G=0,q=U.length;G<q;G++){let H=U[G],L=p(H),z=E%I,D=z%L.boundary,Z=z+D;E+=D,Z!==0&&I-Z<L.storage&&(E+=I-Z),R.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),R.__offset=E,E+=L.storage}}}let _=E%I;return _>0&&(E+=I-_),v.__size=E,v.__cache={},this}function p(v){let b={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=48,b.storage=48):v.isMatrix4?(b.boundary=64,b.storage=64):v.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(b.boundary=16,b.storage=v.byteLength):Ke("WebGLRenderer: Unsupported uniform value type.",v),b}function w(v){let b=v.target;b.removeEventListener("dispose",w);let E=a.indexOf(b.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function P(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:P}}var Hx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Jn=null;function Gx(){return Jn===null&&(Jn=new hr(Hx,16,16,Fi,kn),Jn.name="DFG_LUT",Jn.minFilter=Kt,Jn.magFilter=Kt,Jn.wrapS=Xn,Jn.wrapT=Xn,Jn.generateMipmaps=!1,Jn.needsUpdate=!0),Jn}var sl=class{constructor(e={}){let{canvas:t=Lu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=dn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let y=f,g=new Set([Mo,vo,_o]),p=new Set([dn,zn,Us,Fs,go,xo]),w=new Uint32Array(4),P=new Int32Array(4),v=new C,b=null,E=null,I=[],_=[],S=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,B=!1,O=null,F=null,R=null,U=null;this._outputColorSpace=Vt;let G=0,q=0,H=null,L=-1,z=null,D=new It,Z=new It,te=null,ue=new He(0),pe=0,se=t.width,X=t.height,$=1,me=null,ge=null,_e=new It(0,0,se,X),Ye=new It(0,0,se,X),dt=!1,Je=new Cs,et=!1,tt=!1,Q=new mt,we=new C,je=new It,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qe=!1;function j(){return H===null?$:1}let M=n;function re(T,K){return t.getContext(T,K)}let he,A,x,J,V,ee,fe,ye,ae,le,xe,Te,Ee,Ae,We,$e,it,Y,Se,ce,be,Ce,de;try{let T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",vt,!1),t.addEventListener("webglcontextrestored",at,!1),t.addEventListener("webglcontextcreationerror",Qt,!1),M===null){let K="webgl2";if(M=re(K,T),M===null)throw re(K)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ze()}catch(T){throw t.removeEventListener("webglcontextlost",vt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),Qe("WebGLRenderer: "+T.message),T}function ze(){he=new Ym(M),he.init(),be=new Dx(M,he),A=new Bm(M,he,e,be),x=new Px(M,he),A.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),F=M.createFramebuffer(),R=M.createFramebuffer(),U=M.createFramebuffer(),J=new Jm(M),V=new xx,ee=new Lx(M,he,x,V,A,be,J),fe=new qm(N),ye=new jf(M),Ce=new Um(M,ye),ae=new $m(M,ye,J,Ce),le=new jm(M,ae,ye,Ce,J),Y=new Km(M,A,ee),We=new Om(V),xe=new gx(N,fe,he,A,Ce,We),Te=new Bx(N,V),Ee=new _x,Ae=new wx(he),it=new Nm(N,fe,x,le,m,l),$e=new Ix(N,le,A),de=new Ox(M,J,A,x),Se=new Fm(M,he,J),ce=new Zm(M,he,J),J.programs=xe.programs,N.capabilities=A,N.extensions=he,N.properties=V,N.renderLists=Ee,N.shadowMap=$e,N.state=x,N.info=J}y!==dn&&(S=new eg(y,t.width,t.height,o,s,r));let Ne=new Qc(N,M);this.xr=Ne,this.getContext=function(){return M},this.getContextAttributes=function(){return M.getContextAttributes()},this.forceContextLoss=function(){let T=he.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=he.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(T){T!==void 0&&($=T,this.setSize(se,X,!1))},this.getSize=function(T){return T.set(se,X)},this.setSize=function(T,K,oe=!0){if(Ne.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}se=T,X=K,t.width=Math.floor(T*$),t.height=Math.floor(K*$),oe===!0&&(t.style.width=T+"px",t.style.height=K+"px"),S!==null&&S.setSize(t.width,t.height),this.setViewport(0,0,T,K)},this.getDrawingBufferSize=function(T){return T.set(se*$,X*$).floor()},this.setDrawingBufferSize=function(T,K,oe){se=T,X=K,$=oe,t.width=Math.floor(T*oe),t.height=Math.floor(K*oe),this.setViewport(0,0,T,K)},this.setEffects=function(T){if(y===dn){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let K=0;K<T.length;K++)if(T[K].isOutputPass===!0){Ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(D)},this.getViewport=function(T){return T.copy(_e)},this.setViewport=function(T,K,oe,ne){T.isVector4?_e.set(T.x,T.y,T.z,T.w):_e.set(T,K,oe,ne),x.viewport(D.copy(_e).multiplyScalar($).round())},this.getScissor=function(T){return T.copy(Ye)},this.setScissor=function(T,K,oe,ne){T.isVector4?Ye.set(T.x,T.y,T.z,T.w):Ye.set(T,K,oe,ne),x.scissor(Z.copy(Ye).multiplyScalar($).round())},this.getScissorTest=function(){return dt},this.setScissorTest=function(T){x.setScissorTest(dt=T)},this.setOpaqueSort=function(T){me=T},this.setTransparentSort=function(T){ge=T},this.getClearColor=function(T){return T.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(T=!0,K=!0,oe=!0){let ne=0;if(T){let ie=!1;if(H!==null){let Le=H.texture.format;ie=g.has(Le)}if(ie){let Le=H.texture.type,Be=p.has(Le),Pe=it.getClearColor(),ke=it.getClearAlpha(),Xe=Pe.r,lt=Pe.g,ut=Pe.b;Be?(w[0]=Xe,w[1]=lt,w[2]=ut,w[3]=ke,M.clearBufferuiv(M.COLOR,0,w)):(P[0]=Xe,P[1]=lt,P[2]=ut,P[3]=ke,M.clearBufferiv(M.COLOR,0,P))}else ne|=M.COLOR_BUFFER_BIT}K&&(ne|=M.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),oe&&(ne|=M.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&M.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),O=T},this.dispose=function(){t.removeEventListener("webglcontextlost",vt,!1),t.removeEventListener("webglcontextrestored",at,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),it.dispose(),Ee.dispose(),Ae.dispose(),V.dispose(),fe.dispose(),le.dispose(),Ce.dispose(),de.dispose(),xe.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",uh),Ne.removeEventListener("sessionend",dh),Oi.stop()};function vt(T){T.preventDefault(),Rc("WebGLRenderer: Context Lost."),B=!0}function at(){Rc("WebGLRenderer: Context Restored."),B=!1;let T=J.autoReset,K=$e.enabled,oe=$e.autoUpdate,ne=$e.needsUpdate,ie=$e.type;ze(),J.autoReset=T,$e.enabled=K,$e.autoUpdate=oe,$e.needsUpdate=ne,$e.type=ie}function Qt(T){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function fn(T){let K=T.target;K.removeEventListener("dispose",fn),Zd(K)}function Zd(T){Jd(T),V.remove(T)}function Jd(T){let K=V.get(T).programs;K!==void 0&&(K.forEach(function(oe){xe.releaseProgram(oe)}),T.isShaderMaterial&&xe.releaseShaderCache(T))}this.renderBufferDirect=function(T,K,oe,ne,ie,Le){K===null&&(K=nt);let Be=ie.isMesh&&ie.matrixWorld.determinantAffine()<0,Pe=Qd(T,K,oe,ne,ie);x.setMaterial(ne,Be);let ke=oe.index,Xe=1;if(ne.wireframe===!0){if(ke=ae.getWireframeAttribute(oe),ke===void 0)return;Xe=2}let lt=oe.drawRange,ut=oe.attributes.position,Ve=lt.start*Xe,Mt=(lt.start+lt.count)*Xe;Le!==null&&(Ve=Math.max(Ve,Le.start*Xe),Mt=Math.min(Mt,(Le.start+Le.count)*Xe)),ke!==null?(Ve=Math.max(Ve,0),Mt=Math.min(Mt,ke.count)):ut!=null&&(Ve=Math.max(Ve,0),Mt=Math.min(Mt,ut.count));let Gt=Mt-Ve;if(Gt<0||Gt===1/0)return;Ce.setup(ie,ne,Pe,oe,ke);let Rt,St=Se;if(ke!==null&&(Rt=ye.get(ke),St=ce,St.setIndex(Rt)),ie.isMesh)ne.wireframe===!0?(x.setLineWidth(ne.wireframeLinewidth*j()),St.setMode(M.LINES)):St.setMode(M.TRIANGLES);else if(ie.isLine){let en=ne.linewidth;en===void 0&&(en=1),x.setLineWidth(en*j()),ie.isLineSegments?St.setMode(M.LINES):ie.isLineLoop?St.setMode(M.LINE_LOOP):St.setMode(M.LINE_STRIP)}else ie.isPoints?St.setMode(M.POINTS):ie.isSprite&&St.setMode(M.TRIANGLES);if(ie.isBatchedMesh)if(he.get("WEBGL_multi_draw"))St.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{let en=ie._multiDrawStarts,Fe=ie._multiDrawCounts,an=ie._multiDrawCount,pt=ke?ye.get(ke).bytesPerElement:1,En=V.get(ne).currentProgram.getUniforms();for(let Vn=0;Vn<an;Vn++)En.setValue(M,"_gl_DrawID",Vn),St.render(en[Vn]/pt,Fe[Vn])}else if(ie.isInstancedMesh)St.renderInstances(Ve,Gt,ie.count);else if(oe.isInstancedBufferGeometry){let en=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,Fe=Math.min(oe.instanceCount,en);St.renderInstances(Ve,Gt,Fe)}else St.render(Ve,Gt)};function hh(T,K,oe,ne){O!==null&&T.isNodeMaterial&&O.setObject(ne,T),et===!0&&We.setState(T,oe,!1),T.transparent===!0&&T.side===Ut&&T.forceSinglePass===!1?(T.side=Ht,T.needsUpdate=!0,Jr(T,K,ne),T.side=Tn,T.needsUpdate=!0,Jr(T,K,ne),T.side=Ut):Jr(T,K,ne)}this.compile=function(T,K,oe=null){oe===null&&(oe=T),O!==null&&O.renderStart(T,K,oe),E=Ae.get(oe),E.init(K),_.push(E),oe.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(E.pushLight(ie),ie.castShadow&&E.pushShadow(ie))}),T!==oe&&T.traverseVisible(function(ie){ie.isLight&&ie.layers.test(K.layers)&&(E.pushLight(ie),ie.castShadow&&E.pushShadow(ie))}),E.setupLights(),O!==null&&O.updateLights(E.state.lightsArray),tt=this.localClippingEnabled,et=We.init(this.clippingPlanes,tt),et===!0&&We.setGlobalState(this.clippingPlanes,K),O!==null&&$e.render(E.state.shadowsArray,oe,K);let ne=new Set;return T.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;let Le=ie.material;if(Le)if(Array.isArray(Le))for(let Be=0;Be<Le.length;Be++){let Pe=Le[Be];hh(Pe,oe,K,ie),ne.add(Pe)}else hh(Le,oe,K,ie),ne.add(Le)}),E=_.pop(),O!==null&&O.renderEnd(),ne},this.compileAsync=function(T,K,oe=null){let ne=this.compile(T,K,oe);return new Promise(ie=>{function Le(){if(ne.forEach(function(Be){let ke=V.get(Be).currentProgram;(ke===void 0||ke.isReady())&&ne.delete(Be)}),ne.size===0){ie(T);return}setTimeout(Le,10)}he.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let Ml=null;function Kd(T){Ml&&Ml(T)}function uh(){Oi.stop()}function dh(){Oi.start()}let Oi=new od;Oi.setAnimationLoop(Kd),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(T){Ml=T,Ne.setAnimationLoop(T),T===null?Oi.stop():Oi.start()},Ne.addEventListener("sessionstart",uh),Ne.addEventListener("sessionend",dh),this.render=function(T,K){if(K!==void 0&&K.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;O!==null&&O.renderStart(T,K);let oe=Ne.enabled===!0&&Ne.isPresenting===!0,ne=S!==null&&(H===null||oe)&&S.begin(N,H);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(K),K=Ne.getCamera()),T.isScene===!0&&T.onBeforeRender(N,T,K,H),E=Ae.get(T,_.length),E.init(K),E.state.textureUnits=ee.getTextureUnits(),_.push(E),Q.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),Je.setFromProjectionMatrix(Q,Un,K.reversedDepth),tt=this.localClippingEnabled,et=We.init(this.clippingPlanes,tt),b=Ee.get(T,I.length),b.init(),I.push(b),Ne.enabled===!0&&Ne.isPresenting===!0){let Be=N.xr.getDepthSensingMesh();Be!==null&&bl(Be,K,-1/0,N.sortObjects)}bl(T,K,0,N.sortObjects),b.finish(),O!==null&&O.updateLights(E.state.lightsArray),N.sortObjects===!0&&b.sort(me,ge),qe=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,qe&&it.addToRenderList(b,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),et===!0&&We.beginShadows();let ie=E.state.shadowsArray;if($e.render(ie,T,K),et===!0&&We.endShadows(),(ne&&S.hasRenderPass())===!1){let Be=b.opaque,Pe=b.transmissive;if(E.setupLights(),K.isArrayCamera){let ke=K.cameras;if(Pe.length>0)for(let Xe=0,lt=ke.length;Xe<lt;Xe++){let ut=ke[Xe];ph(Be,Pe,T,ut)}qe&&it.render(T);for(let Xe=0,lt=ke.length;Xe<lt;Xe++){let ut=ke[Xe];fh(b,T,ut,ut.viewport)}}else Pe.length>0&&ph(Be,Pe,T,K),qe&&it.render(T),fh(b,T,K)}H!==null&&q===0&&(ee.updateMultisampleRenderTarget(H),ee.updateRenderTargetMipmap(H)),ne&&S.end(N),T.isScene===!0&&T.onAfterRender(N,T,K),Ce.resetDefaultState(),L=-1,z=null,_.pop(),_.length>0?(E=_[_.length-1],ee.setTextureUnits(E.state.textureUnits),et===!0&&We.setGlobalState(N.clippingPlanes,E.state.camera)):E=null,I.pop(),I.length>0?b=I[I.length-1]:b=null,O!==null&&O.renderEnd()};function bl(T,K,oe,ne){if(T.visible===!1)return;if(T.layers.test(K.layers)){if(T.isGroup)oe=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(K);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Je)){ne&&je.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Q);let Be=le.update(T),Pe=T.material;Pe.visible&&b.push(T,Be,Pe,oe,je.z,null,K)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Je))){let Be=le.update(T),Pe=T.material;if(ne&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),je.copy(T.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),je.copy(Be.boundingSphere.center)),je.applyMatrix4(T.matrixWorld).applyMatrix4(Q)),Array.isArray(Pe)){let ke=Be.groups;for(let Xe=0,lt=ke.length;Xe<lt;Xe++){let ut=ke[Xe],Ve=Pe[ut.materialIndex];Ve&&Ve.visible&&b.push(T,Be,Ve,oe,je.z,ut,K)}}else Pe.visible&&b.push(T,Be,Pe,oe,je.z,null,K)}}let Le=T.children;for(let Be=0,Pe=Le.length;Be<Pe;Be++)bl(Le[Be],K,oe,ne)}function fh(T,K,oe,ne){let{opaque:ie,transmissive:Le,transparent:Be}=T;E.setupLightsView(oe),et===!0&&We.setGlobalState(N.clippingPlanes,oe),ne&&x.viewport(D.copy(ne)),ie.length>0&&Zr(ie,K,oe),Le.length>0&&Zr(Le,K,oe),Be.length>0&&Zr(Be,K,oe),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function ph(T,K,oe,ne){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[ne.id]===void 0){let Ve=he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[ne.id]=new un(1,1,{generateMipmaps:!0,type:Ve?kn:dn,minFilter:Ni,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ft.workingColorSpace})}let Le=E.state.transmissionRenderTarget[ne.id],Be=ne.viewport||D;Le.setSize(Be.z*N.transmissionResolutionScale,Be.w*N.transmissionResolutionScale);let Pe=N.getRenderTarget(),ke=N.getActiveCubeFace(),Xe=N.getActiveMipmapLevel();N.setRenderTarget(Le),N.getClearColor(ue),pe=N.getClearAlpha(),pe<1&&N.setClearColor(16777215,.5),N.clear(),qe&&it.render(oe);let lt=N.toneMapping;N.toneMapping=Gn;let ut=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),E.setupLightsView(ne),et===!0&&We.setGlobalState(N.clippingPlanes,ne),Zr(T,oe,ne),ee.updateMultisampleRenderTarget(Le),ee.updateRenderTargetMipmap(Le),he.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let Mt=0,Gt=K.length;Mt<Gt;Mt++){let Rt=K[Mt],{object:St,geometry:en,material:Fe,group:an}=Rt;if(Fe.side===Ut&&St.layers.test(ne.layers)){let pt=Fe.side;Fe.side=Ht,Fe.needsUpdate=!0,mh(St,oe,ne,en,Fe,an),Fe.side=pt,Fe.needsUpdate=!0,Ve=!0}}Ve===!0&&(ee.updateMultisampleRenderTarget(Le),ee.updateRenderTargetMipmap(Le))}N.setRenderTarget(Pe,ke,Xe),N.setClearColor(ue,pe),ut!==void 0&&(ne.viewport=ut),N.toneMapping=lt}function Zr(T,K,oe){let ne=K.isScene===!0?K.overrideMaterial:null;for(let ie=0,Le=T.length;ie<Le;ie++){let Be=T[ie],{object:Pe,geometry:ke,group:Xe}=Be,lt=Be.material;lt.allowOverride===!0&&ne!==null&&(lt=ne),Pe.layers.test(oe.layers)&&mh(Pe,K,oe,ke,lt,Xe)}}function mh(T,K,oe,ne,ie,Le){O!==null&&ie.isNodeMaterial&&O.setObject(T,ie),T.onBeforeRender(N,K,oe,ne,ie,Le),T.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),ie.onBeforeRender(N,K,oe,ne,T,Le),ie.transparent===!0&&ie.side===Ut&&ie.forceSinglePass===!1?(ie.side=Ht,ie.needsUpdate=!0,N.renderBufferDirect(oe,K,ne,ie,T,Le),ie.side=Tn,ie.needsUpdate=!0,N.renderBufferDirect(oe,K,ne,ie,T,Le),ie.side=Ut):N.renderBufferDirect(oe,K,ne,ie,T,Le),T.onAfterRender(N,K,oe,ne,ie,Le)}function Jr(T,K,oe){K.isScene!==!0&&(K=nt);let ne=V.get(T),ie=E.state.lights,Le=E.state.shadowsArray,Be=ie.state.version,Pe=xe.getParameters(T,ie.state,Le,K,oe,E.state.lightProbeGridArray),ke=xe.getProgramCacheKey(Pe),Xe=ne.programs;ne.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?K.environment:null,ne.fog=K.fog;let lt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;ne.envMap=fe.get(T.envMap||ne.environment,lt),ne.envMapRotation=ne.environment!==null&&T.envMap===null?K.environmentRotation:T.envMapRotation,Xe===void 0&&(T.addEventListener("dispose",fn),Xe=new Map,ne.programs=Xe);let ut=Xe.get(ke);if(ut!==void 0){if(ne.currentProgram===ut&&ne.lightsStateVersion===Be)return xh(T,Pe),ut}else Pe.uniforms=xe.getUniforms(T),O!==null&&T.isNodeMaterial&&O.build(T,oe,Pe),T.onBeforeCompile(Pe,N),ut=xe.acquireProgram(Pe,ke),Xe.set(ke,ut),ne.uniforms=Pe.uniforms;let Ve=ne.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ve.clippingPlanes=We.uniform),xh(T,Pe),ne.needsLights=tf(T),ne.lightsStateVersion=Be,ne.needsLights&&(Ve.ambientLightColor.value=ie.state.ambient,Ve.lightProbe.value=ie.state.probe,Ve.sunLights.value=ie.state.sun,Ve.sunLightShadows.value=ie.state.sunShadow,Ve.directionalLights.value=ie.state.directional,Ve.directionalLightShadows.value=ie.state.directionalShadow,Ve.spotLights.value=ie.state.spot,Ve.spotLightShadows.value=ie.state.spotShadow,Ve.rectAreaLights.value=ie.state.rectArea,Ve.ltc_1.value=ie.state.rectAreaLTC1,Ve.ltc_2.value=ie.state.rectAreaLTC2,Ve.pointLights.value=ie.state.point,Ve.pointLightShadows.value=ie.state.pointShadow,Ve.hemisphereLights.value=ie.state.hemi,Ve.sunShadowMatrix.value=ie.state.sunShadowMatrix,Ve.sunShadowCascade.value=ie.state.sunShadowCascade,Ve.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,Ve.spotLightMatrix.value=ie.state.spotLightMatrix,Ve.spotLightMap.value=ie.state.spotLightMap,Ve.pointShadowMatrix.value=ie.state.pointShadowMatrix),ne.lightProbeGrid=E.state.lightProbeGridArray.length>0,ne.currentProgram=ut,ne.uniformsList=null,ut}function gh(T){if(T.uniformsList===null){let K=T.currentProgram.getUniforms();T.uniformsList=Gs.seqWithValue(K.seq,T.uniforms)}return T.uniformsList}function xh(T,K){let oe=V.get(T);oe.outputColorSpace=K.outputColorSpace,oe.batching=K.batching,oe.batchingColor=K.batchingColor,oe.instancing=K.instancing,oe.instancingColor=K.instancingColor,oe.instancingMorph=K.instancingMorph,oe.skinning=K.skinning,oe.morphTargets=K.morphTargets,oe.morphNormals=K.morphNormals,oe.morphColors=K.morphColors,oe.morphTargetsCount=K.morphTargetsCount,oe.numClippingPlanes=K.numClippingPlanes,oe.numIntersection=K.numClipIntersection,oe.vertexAlphas=K.vertexAlphas,oe.vertexTangents=K.vertexTangents,oe.toneMapping=K.toneMapping}function jd(T,K){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;v.setFromMatrixPosition(K.matrixWorld);for(let oe=0,ne=T.length;oe<ne;oe++){let ie=T[oe];if(ie.texture!==null&&ie.boundingBox.containsPoint(v))return ie}return null}function Qd(T,K,oe,ne,ie){K.isScene!==!0&&(K=nt),ee.resetTextureUnits();let Le=K.fog,Be=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?K.environment:null,Pe=H===null?N.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:ft.workingColorSpace,ke=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,Xe=fe.get(ne.envMap||Be,ke),lt=ne.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,ut=!!oe.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Ve=!!oe.morphAttributes.position,Mt=!!oe.morphAttributes.normal,Gt=!!oe.morphAttributes.color,Rt=Gn;ne.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(Rt=N.toneMapping);let St=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,en=St!==void 0?St.length:0,Fe=V.get(ne),an=E.state.lights;if(et===!0&&(tt===!0||T!==z)){let At=T===z&&ne.id===L;We.setState(ne,T,At)}let pt=!1;ne.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==an.state.version||Fe.outputColorSpace!==Pe||ie.isBatchedMesh&&Fe.batching===!1||!ie.isBatchedMesh&&Fe.batching===!0||ie.isBatchedMesh&&Fe.batchingColor===!0&&ie._colorsTexture===null||ie.isBatchedMesh&&Fe.batchingColor===!1&&ie._colorsTexture!==null||ie.isInstancedMesh&&Fe.instancing===!1||!ie.isInstancedMesh&&Fe.instancing===!0||ie.isSkinnedMesh&&Fe.skinning===!1||!ie.isSkinnedMesh&&Fe.skinning===!0||ie.isInstancedMesh&&Fe.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&Fe.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&Fe.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&Fe.instancingMorph===!1&&ie.morphTexture!==null||Fe.envMap!==Xe||ne.fog===!0&&Fe.fog!==Le||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==We.numPlanes||Fe.numIntersection!==We.numIntersection)||Fe.vertexAlphas!==lt||Fe.vertexTangents!==ut||Fe.morphTargets!==Ve||Fe.morphNormals!==Mt||Fe.morphColors!==Gt||Fe.toneMapping!==Rt||Fe.morphTargetsCount!==en||!!Fe.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(pt=!0):(pt=!0,Fe.__version=ne.version);let En=Fe.currentProgram;pt===!0&&(En=Jr(ne,K,ie),O&&ne.isNodeMaterial&&O.onUpdateProgram(ne,En,Fe));let Vn=!1,_i=!1,ss=!1,Et=En.getUniforms(),Bt=Fe.uniforms;if(x.useProgram(En.program)&&(Vn=!0,_i=!0,ss=!0),ne.id!==L&&(L=ne.id,_i=!0),Fe.needsLights){let At=jd(E.state.lightProbeGridArray,ie);Fe.lightProbeGrid!==At&&(Fe.lightProbeGrid=At,_i=!0)}if(Vn||z!==T){x.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Et.setValue(M,"projectionMatrix",T.projectionMatrix),Et.setValue(M,"viewMatrix",T.matrixWorldInverse);let Mi=Et.map.cameraPosition;Mi!==void 0&&Mi.setValue(M,we.setFromMatrixPosition(T.matrixWorld)),A.logarithmicDepthBuffer&&Et.setValue(M,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Et.setValue(M,"isOrthographic",T.isOrthographicCamera===!0),z!==T&&(z=T,_i=!0,ss=!0)}if(Fe.needsLights&&(an.state.sunShadowMap.length>0&&Et.setValue(M,"sunShadowMap",an.state.sunShadowMap,ee),an.state.directionalShadowMap.length>0&&Et.setValue(M,"directionalShadowMap",an.state.directionalShadowMap,ee),an.state.spotShadowMap.length>0&&Et.setValue(M,"spotShadowMap",an.state.spotShadowMap,ee),an.state.pointShadowMap.length>0&&Et.setValue(M,"pointShadowMap",an.state.pointShadowMap,ee)),ie.isSkinnedMesh){Et.setOptional(M,ie,"bindMatrix"),Et.setOptional(M,ie,"bindMatrixInverse");let At=ie.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),Et.setValue(M,"boneTexture",At.boneTexture,ee))}ie.isBatchedMesh&&(Et.setOptional(M,ie,"batchingTexture"),Et.setValue(M,"batchingTexture",ie._matricesTexture,ee),Et.setOptional(M,ie,"batchingIdTexture"),Et.setValue(M,"batchingIdTexture",ie._indirectTexture,ee),Et.setOptional(M,ie,"batchingColorTexture"),ie._colorsTexture!==null&&Et.setValue(M,"batchingColorTexture",ie._colorsTexture,ee));let vi=oe.morphAttributes;if((vi.position!==void 0||vi.normal!==void 0||vi.color!==void 0)&&Y.update(ie,oe,En),(_i||Fe.receiveShadow!==ie.receiveShadow)&&(Fe.receiveShadow=ie.receiveShadow,Et.setValue(M,"receiveShadow",ie.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&K.environment!==null&&(Bt.envMapIntensity.value=K.environmentIntensity),Bt.dfgLUT!==void 0&&(Bt.dfgLUT.value=Gx()),_i){if(Et.setValue(M,"toneMappingExposure",N.toneMappingExposure),Fe.needsLights&&ef(Bt,ss),Le&&ne.fog===!0&&Te.refreshFogUniforms(Bt,Le),Te.refreshMaterialUniforms(Bt,ne,$,X,E.state.transmissionRenderTarget[T.id]),Fe.needsLights&&Fe.lightProbeGrid){let At=Fe.lightProbeGrid;Bt.probesSH.value=At.texture,Bt.probesMin.value.copy(At.boundingBox.min),Bt.probesMax.value.copy(At.boundingBox.max),Bt.probesResolution.value.copy(At.resolution)}Gs.upload(M,gh(Fe),Bt,ee)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Gs.upload(M,gh(Fe),Bt,ee),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Et.setValue(M,"center",ie.center),Et.setValue(M,"modelViewMatrix",ie.modelViewMatrix),Et.setValue(M,"normalMatrix",ie.normalMatrix),Et.setValue(M,"modelMatrix",ie.matrixWorld),ne.uniformsGroups!==void 0){let At=ne.uniformsGroups;for(let Mi=0,rs=At.length;Mi<rs;Mi++){let _h=At[Mi];de.update(_h,En),de.bind(_h,En)}}return En}function ef(T,K){T.ambientLightColor.needsUpdate=K,T.lightProbe.needsUpdate=K,T.sunLights.needsUpdate=K,T.sunLightShadows.needsUpdate=K,T.directionalLights.needsUpdate=K,T.directionalLightShadows.needsUpdate=K,T.pointLights.needsUpdate=K,T.pointLightShadows.needsUpdate=K,T.spotLights.needsUpdate=K,T.spotLightShadows.needsUpdate=K,T.rectAreaLights.needsUpdate=K,T.hemisphereLights.needsUpdate=K}function tf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(T,K,oe){let ne=V.get(T);ne.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),V.get(T.texture).__webglTexture=K,V.get(T.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:oe,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,K){let oe=V.get(T);oe.__webglFramebuffer=K,oe.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(T,K=0,oe=0){H=T,G=K,q=oe;let ne=null,ie=!1,Le=!1;if(T){let Pe=V.get(T);if(Pe.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(M.FRAMEBUFFER,Pe.__webglFramebuffer),D.copy(T.viewport),Z.copy(T.scissor),te=T.scissorTest,x.viewport(D),x.scissor(Z),x.setScissorTest(te),L=-1;return}else if(Pe.__webglFramebuffer===void 0)ee.setupRenderTarget(T);else if(Pe.__hasExternalTextures)ee.rebindTextures(T,V.get(T.texture).__webglTexture,V.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let lt=T.depthTexture;if(Pe.__boundDepthTexture!==lt){if(lt!==null&&V.has(lt)&&(T.width!==lt.image.width||T.height!==lt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(T)}}let ke=T.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Le=!0);let Xe=V.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Xe[K])?ne=Xe[K][oe]:ne=Xe[K],ie=!0):T.samples>0&&ee.useMultisampledRTT(T)===!1?ne=V.get(T).__webglMultisampledFramebuffer:Array.isArray(Xe)?ne=Xe[oe]:ne=Xe,D.copy(T.viewport),Z.copy(T.scissor),te=T.scissorTest}else D.copy(_e).multiplyScalar($).floor(),Z.copy(Ye).multiplyScalar($).floor(),te=dt;if(oe!==0&&(ne=F),x.bindFramebuffer(M.FRAMEBUFFER,ne)&&x.drawBuffers(T,ne),x.viewport(D),x.scissor(Z),x.setScissorTest(te),ie){let Pe=V.get(T.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_CUBE_MAP_POSITIVE_X+K,Pe.__webglTexture,oe)}else if(Le){let Pe=K;for(let ke=0;ke<T.textures.length;ke++){let Xe=V.get(T.textures[ke]);M.framebufferTextureLayer(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0+ke,Xe.__webglTexture,oe,Pe)}}else if(T!==null&&oe!==0){let Pe=V.get(T.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,Pe.__webglTexture,oe)}L=-1};function yh(T){let K=V.get(T);return(K.__readFormat!==T.format||K.__readType!==T.type)&&(K.__readFormat=T.format,K.__readType=T.type,K.__formatReadable=A.textureFormatReadable(T.format),K.__typeReadable=A.textureTypeReadable(T.type)),K}this.readRenderTargetPixels=function(T,K,oe,ne,ie,Le,Be,Pe=0){if(!(T&&T.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Be!==void 0&&(ke=ke[Be]),ke){x.bindFramebuffer(M.FRAMEBUFFER,ke);try{let Xe=T.textures[Pe],lt=Xe.format,ut=Xe.type;T.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+Pe);let Ve=yh(Xe);if(Ve.__formatReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ve.__typeReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=T.width-ne&&oe>=0&&oe<=T.height-ie&&M.readPixels(K,oe,ne,ie,be.convert(lt),be.convert(ut),Le)}finally{let Xe=H!==null?V.get(H).__webglFramebuffer:null;x.bindFramebuffer(M.FRAMEBUFFER,Xe)}}},this.readRenderTargetPixelsAsync=async function(T,K,oe,ne,ie,Le,Be,Pe=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Be!==void 0&&(ke=ke[Be]),ke)if(K>=0&&K<=T.width-ne&&oe>=0&&oe<=T.height-ie){x.bindFramebuffer(M.FRAMEBUFFER,ke);let Xe=T.textures[Pe],lt=Xe.format,ut=Xe.type;T.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+Pe);let Ve=yh(Xe);if(Ve.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ve.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Mt=M.createBuffer();M.bindBuffer(M.PIXEL_PACK_BUFFER,Mt),M.bufferData(M.PIXEL_PACK_BUFFER,Le.byteLength,M.STREAM_READ),M.readPixels(K,oe,ne,ie,be.convert(lt),be.convert(ut),0),M.bindBuffer(M.PIXEL_PACK_BUFFER,null);let Gt=H!==null?V.get(H).__webglFramebuffer:null;x.bindFramebuffer(M.FRAMEBUFFER,Gt);let Rt=M.fenceSync(M.SYNC_GPU_COMMANDS_COMPLETE,0);return M.flush(),await Nu(M,Rt,4),M.bindBuffer(M.PIXEL_PACK_BUFFER,Mt),M.getBufferSubData(M.PIXEL_PACK_BUFFER,0,Le),M.bindBuffer(M.PIXEL_PACK_BUFFER,null),M.deleteBuffer(Mt),M.deleteSync(Rt),Le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,K=null,oe=0){let ne=Math.pow(2,-oe),ie=Math.floor(T.image.width*ne),Le=Math.floor(T.image.height*ne),Be=K!==null?K.x:0,Pe=K!==null?K.y:0;ee.setTexture2D(T,0),M.copyTexSubImage2D(M.TEXTURE_2D,oe,0,0,Be,Pe,ie,Le),x.unbindTexture()},this.copyTextureToTexture=function(T,K,oe=null,ne=null,ie=0,Le=0){let Be,Pe,ke,Xe,lt,ut,Ve,Mt,Gt,Rt=T.isCompressedTexture?T.mipmaps[Le]:T.image;if(oe!==null)Be=oe.max.x-oe.min.x,Pe=oe.max.y-oe.min.y,ke=oe.isBox3?oe.max.z-oe.min.z:1,Xe=oe.min.x,lt=oe.min.y,ut=oe.isBox3?oe.min.z:0;else{let Bt=Math.pow(2,-ie);Be=Math.floor(Rt.width*Bt),Pe=Math.floor(Rt.height*Bt),T.isDataArrayTexture?ke=Rt.depth:T.isData3DTexture?ke=Math.floor(Rt.depth*Bt):ke=1,Xe=0,lt=0,ut=0}ne!==null?(Ve=ne.x,Mt=ne.y,Gt=ne.z):(Ve=0,Mt=0,Gt=0);let St=be.convert(K.format),en=be.convert(K.type),Fe;K.isData3DTexture?(ee.setTexture3D(K,0),Fe=M.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(ee.setTexture2DArray(K,0),Fe=M.TEXTURE_2D_ARRAY):(ee.setTexture2D(K,0),Fe=M.TEXTURE_2D),x.activeTexture(M.TEXTURE0),x.pixelStorei(M.UNPACK_FLIP_Y_WEBGL,K.flipY),x.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),x.pixelStorei(M.UNPACK_ALIGNMENT,K.unpackAlignment);let an=x.getParameter(M.UNPACK_ROW_LENGTH),pt=x.getParameter(M.UNPACK_IMAGE_HEIGHT),En=x.getParameter(M.UNPACK_SKIP_PIXELS),Vn=x.getParameter(M.UNPACK_SKIP_ROWS),_i=x.getParameter(M.UNPACK_SKIP_IMAGES);x.pixelStorei(M.UNPACK_ROW_LENGTH,Rt.width),x.pixelStorei(M.UNPACK_IMAGE_HEIGHT,Rt.height),x.pixelStorei(M.UNPACK_SKIP_PIXELS,Xe),x.pixelStorei(M.UNPACK_SKIP_ROWS,lt),x.pixelStorei(M.UNPACK_SKIP_IMAGES,ut);let ss=T.isDataArrayTexture||T.isData3DTexture,Et=K.isDataArrayTexture||K.isData3DTexture;if(T.isDepthTexture){let Bt=V.get(T),vi=V.get(K),At=V.get(Bt.__renderTarget),Mi=V.get(vi.__renderTarget);x.bindFramebuffer(M.READ_FRAMEBUFFER,At.__webglFramebuffer),x.bindFramebuffer(M.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let rs=0;rs<ke;rs++)ss&&(M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,V.get(T).__webglTexture,ie,ut+rs),M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,V.get(K).__webglTexture,Le,Gt+rs)),M.blitFramebuffer(Xe,lt,Be,Pe,Ve,Mt,Be,Pe,M.DEPTH_BUFFER_BIT,M.NEAREST);x.bindFramebuffer(M.READ_FRAMEBUFFER,null),x.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else if(ie!==0||T.isRenderTargetTexture||V.has(T)){let Bt=V.get(T),vi=V.get(K);x.bindFramebuffer(M.READ_FRAMEBUFFER,R),x.bindFramebuffer(M.DRAW_FRAMEBUFFER,U);for(let At=0;At<ke;At++)ss?M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,Bt.__webglTexture,ie,ut+At):M.framebufferTexture2D(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,Bt.__webglTexture,ie),Et?M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,vi.__webglTexture,Le,Gt+At):M.framebufferTexture2D(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,vi.__webglTexture,Le),ie!==0?M.blitFramebuffer(Xe,lt,Be,Pe,Ve,Mt,Be,Pe,M.COLOR_BUFFER_BIT,M.NEAREST):Et?M.copyTexSubImage3D(Fe,Le,Ve,Mt,Gt+At,Xe,lt,Be,Pe):M.copyTexSubImage2D(Fe,Le,Ve,Mt,Xe,lt,Be,Pe);x.bindFramebuffer(M.READ_FRAMEBUFFER,null),x.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else Et?T.isDataTexture||T.isData3DTexture?M.texSubImage3D(Fe,Le,Ve,Mt,Gt,Be,Pe,ke,St,en,Rt.data):K.isCompressedArrayTexture?M.compressedTexSubImage3D(Fe,Le,Ve,Mt,Gt,Be,Pe,ke,St,Rt.data):M.texSubImage3D(Fe,Le,Ve,Mt,Gt,Be,Pe,ke,St,en,Rt):T.isDataTexture?M.texSubImage2D(M.TEXTURE_2D,Le,Ve,Mt,Be,Pe,St,en,Rt.data):T.isCompressedTexture?M.compressedTexSubImage2D(M.TEXTURE_2D,Le,Ve,Mt,Rt.width,Rt.height,St,Rt.data):M.texSubImage2D(M.TEXTURE_2D,Le,Ve,Mt,Be,Pe,St,en,Rt);x.pixelStorei(M.UNPACK_ROW_LENGTH,an),x.pixelStorei(M.UNPACK_IMAGE_HEIGHT,pt),x.pixelStorei(M.UNPACK_SKIP_PIXELS,En),x.pixelStorei(M.UNPACK_SKIP_ROWS,Vn),x.pixelStorei(M.UNPACK_SKIP_IMAGES,_i),Le===0&&K.generateMipmaps&&M.generateMipmap(Fe),x.unbindTexture()},this.initRenderTarget=function(T){V.get(T).__webglFramebuffer===void 0&&ee.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?ee.setTextureCube(T,0):T.isData3DTexture?ee.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?ee.setTexture2DArray(T,0):ee.setTexture2D(T,0),x.unbindTexture()},this.resetState=function(){G=0,q=0,H=null,x.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ft._getDrawingBufferColorSpace(e),t.unpackColorSpace=ft._getUnpackColorSpace()}};var ol=class extends Xi{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new ve;e.deleteAttribute("uv");let t=new Hn({side:Ht}),n=new Hn,s=new Sr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new k(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new hi(e,n,6),o=new kt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new k(e,Vs(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new k(e,Vs(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new k(e,Vs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new k(e,Vs(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new k(e,Vs(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new k(e,Vs(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Vs(i){return new _r({color:0,emissive:16777215,emissiveIntensity:i})}var zx=new Set(["BoxGeometry","RoundedBoxGeometry","CylinderGeometry","ConeGeometry","SphereGeometry","IcosahedronGeometry","OctahedronGeometry","DodecahedronGeometry","CapsuleGeometry"]),pd=new Set(["PlaneGeometry","CircleGeometry","RingGeometry","ShapeGeometry"]),kx=`
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
}`,Vx=`
uniform vec3 uCol; uniform float uOp;
#include <clipping_planes_pars_fragment>
void main() {
  #include <clipping_planes_fragment>
  gl_FragColor = vec4(uCol, uOp);
}`;function md(){return{uRes:{value:new Ue(1e3,600)},uPx:{value:1.25}}}function Wx(i,e,t,n,s,r){return new cn({uniforms:{uRes:i.uRes,uPx:i.uPx,uUsePos:{value:e?1:0},uR:{value:r},uCol:{value:new He(t)},uOp:{value:n}},vertexShader:kx,fragmentShader:Vx,side:Ht,transparent:n<1,depthWrite:!0,clipping:!!(s&&s.length),clippingPlanes:s&&s.length?s:null})}function eh(i,e,t={}){let n=t.color??2762274,s=t.minR??0,r=[];i.traverse(o=>{if(!o.isMesh||o.userData.isInk||o.userData.noInk||o.userData._inked)return;let l=o.geometry,c=o.material;if(!l||!l.attributes||!l.attributes.position||!l.attributes.normal||pd.has(l.type)||!c||Array.isArray(c)||c.isShaderMaterial||c.isPointsMaterial)return;let h=o.userData._revOp!=null?o.userData._revOp:c.opacity??1,d=!!(c.userData&&c.userData.isGlass)||o.userData.inkGlass===!0;h<(d?.02:.97)||(d&&(o.userData._inkGlass=!0),c.blending!==Ar&&(!d&&c.clippingPlanes&&c.clippingPlanes.length||s&&(l.boundingSphere||l.computeBoundingSphere(),l.boundingSphere.radius*o.scale.x<s)||r.push(o)))});let a=0;for(let o of r){let l=!!o.userData._inkGlass,c=zx.has(o.geometry.type)||o.userData.inkPosDir===!0;o.geometry.boundingSphere||o.geometry.computeBoundingSphere();let h=Wx(e,c,n,1,o.material.clippingPlanes,o.geometry.boundingSphere.radius),d=o.isInstancedMesh?new hi(o.geometry,h,o.count):new k(o.geometry,h);o.isInstancedMesh&&(d.instanceMatrix=o.instanceMatrix,d.count=o.count),d.userData.isInk=!0,o.userData._inked=!0,d.raycast=()=>{},d.renderOrder=o.renderOrder,d.frustumCulled=o.frustumCulled;let u=t.opacity??.92;if(l){let f=o.material;f.stencilWrite||(a=1,f.stencilWrite=!0,f.stencilRef=a,f.stencilFunc=jo,f.stencilZPass=wc,f.needsUpdate=!0),h.stencilWrite=!0,h.stencilRef=f.stencilRef,h.stencilFunc=Tc,h.stencilZPass=Ai,h.stencilFail=Ai,h.stencilZFail=Ai,h.transparent=!0,h.depthWrite=!1,d.renderOrder=o.renderOrder+1;let m=o.userData._revOp!=null?o.userData._revOp:f.opacity||1;d.onBeforeRender=()=>{let y=o.material&&o.material.opacity!=null?o.material.opacity:m;h.uniforms.uOp.value=.8*Math.min(1,y/Math.max(m,.001)),d.visible=o.material?o.material.visible!==!1:!0},o.add(d);continue}d.onBeforeRender=()=>{let f=o.material,m=f&&f.opacity!=null?f.opacity:1;h.uniforms.uOp.value=u*m;let y=m<.999||u<1;h.transparent!==y&&(h.transparent=y,h.needsUpdate=!0),d.visible=f?f.visible!==!1:!0},o.add(d)}return r.length}var ll=null;function Xx(){if(ll)return ll;let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,4,64,64,63);return t.addColorStop(0,"rgba(0,0,0,1)"),t.addColorStop(.45,"rgba(0,0,0,0.55)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),ll=new wn(i),ll}function th(i,e={}){let t=new xn,n=new xn,s=!1;if(i.traverse(l=>{l.userData._revPending&&(s=!0)}),s||(i.traverse(l=>{if(!l.isMesh||l.userData.isInk||l.userData.isShadow||l.userData.noShadowBox||l.geometry&&pd.has(l.geometry.type))return;let c=!0;for(let h=l;h;h=h.parent)if(h.visible===!1){c=!1;break}c&&(n.setFromObject(l),n.isEmpty()||t.union(n))}),t.isEmpty()))return null;let r=t.getSize(new C),a=t.getCenter(new C),o=i.userData._contactShadow;return o||(o=new k(new On(1,1),new sn({color:1709072,alphaMap:Xx(),transparent:!0,opacity:e.opacity??.2,depthWrite:!1})),o.rotation.x=-Math.PI/2,o.userData.isShadow=!0,o.renderOrder=-1,o.raycast=()=>{},i.add(o),i.userData._contactShadow=o),o.position.set(a.x,t.min.y-.004*Math.max(r.x,r.z),a.z),o.scale.set(r.x*1.35,r.z*1.45,1),o}function xt(i,e){let t=e.ui,n;try{let D=document.createElement("canvas");if(!(D.getContext("webgl2")||D.getContext("webgl")))return null;n=new sl({antialias:!0,alpha:!0,stencil:!0,powerPreference:"low-power",preserveDrawingBuffer:!0})}catch{return null}let s=document.createElement("div");s.className="canvas-wrap three-wrap",i.appendChild(s);let r=n.domElement;r.setAttribute("role","img"),r.setAttribute("aria-label",e.label),r.tabIndex=0,s.appendChild(r),n.outputColorSpace=Vt,n.toneMapping=Cr,n.toneMappingExposure=e.exposure??1.05,n.setClearColor(16053490,0),e.localClipping&&(n.localClippingEnabled=!0);let a=new Xi;a.userData.renderer=n;let o=new Jt(e.fov||34,1.6,.05,500),l=e.target&&e.target.clone?e.target.clone():new C(0,0,0),c={yaw:e.yaw??0,pitch:e.pitch??.6,dist:8},h=[],d=!0,u=0,f=0,m=!0,y=0,g=0,p=e.radius||3,w=e.radiusY||p*.6,P=e.autoFit!==!1,v=md(),b=!1,E=e.contactShadow===!1?2:0,I=0;function _(){e.ink!==!1&&(eh(a,v,{color:e.inkColor,opacity:e.inkOpacity,minR:e.inkMinR}),b=!0)}function S(){if(e.place){e.place(o,l,c);return}let D=Math.cos(c.pitch);o.position.set(l.x+c.dist*Math.sin(c.yaw)*D,l.y+c.dist*Math.sin(c.pitch),l.z+c.dist*Math.cos(c.yaw)*D),o.lookAt(l)}function N(){if(!P)return;let D=o.fov*Math.PI/360,Z=Math.atan(Math.tan(D)*o.aspect),te=e.fitPadX??e.fitPad??1.08,ue=e.fitPadY??e.fitPad??1.08;c.dist=Math.max(p/Math.tan(Z)*te,w/Math.tan(D)*ue)}function B(){y=s.clientWidth||600,g=e.height(y),n.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),n.setSize(y,g,!0);{let D=n.getPixelRatio();v.uRes.value.set(y*D,g*D),v.uPx.value=(e.inkPx??.85)*D}o.aspect=y/g,o.updateProjectionMatrix(),N(),e.onResize&&e.onResize(y,g),U()}function O(){S(),n.render(a,o);let D=new C;for(let Z of h){let te=Z.pos();if(!te){Z.el.style.display="none";continue}D.copy(te).project(o);let ue=(D.x+1)/2*y,pe=(1-D.y)/2*g,se=D.z<1&&ue>4&&ue<y-4&&pe>4&&pe<g-4;Z.el.style.display=se?"":"none",Z.el.style.transform=`translate(${Math.round(ue)}px, ${Math.round(pe)}px) translate(-50%, ${Z.below?"8px":"calc(-100% - 8px)"})`}m=!1}function F(D){u=0;let Z=Math.min(.05,(D-f)/1e3||.016);f=D;let te=!1;if(e.step&&(t.isPlaying()||e.busy&&e.busy()))try{te=!!e.step(Z)}catch{te=!1,m=!0}E===1&&(I+=Z,I>.25&&th(a,{opacity:e.shadowOpacity})&&(E=2,m=!0)),(m||te)&&O(),!u&&d&&(te||m)&&(u=requestAnimationFrame(F))}function R(){!u&&d&&(m||t.isPlaying()&&e.busy&&e.busy()||e.busy&&e.busy())&&(f=performance.now(),u=requestAnimationFrame(F))}function U(){m=!0,R()}new IntersectionObserver(D=>{let Z=d;d=D[0].isIntersecting,d&&!Z&&e.onShow&&e.onShow(),R()},{threshold:.15}).observe(r),t.onPlayChange(()=>R()),new ResizeObserver(B).observe(s);let G=new ui,q=new Ue,H=null;r.style.touchAction="pan-y",r.style.cursor="grab",r.addEventListener("pointerdown",D=>{H={x:D.clientX,y:D.clientY,yaw:c.yaw,pitch:c.pitch,moved:!1,mouse:D.pointerType==="mouse"};try{r.setPointerCapture(D.pointerId)}catch{}}),r.addEventListener("pointermove",D=>{if(!H)return;let Z=D.clientX-H.x,te=D.clientY-H.y;!H.moved&&Math.hypot(Z,te)<6||(H.moved=!0,r.style.cursor="grabbing",c.yaw=H.yaw-Z*.008,H.mouse&&(c.pitch=Math.max(.15,Math.min(1.45,H.pitch+te*.006))),e.onTurn&&e.onTurn(),U())}),r.addEventListener("pointerup",D=>{if(H&&!H.moved&&e.onTap&&e.pickable){let Z=r.getBoundingClientRect();q.set((D.clientX-Z.left)/Z.width*2-1,-((D.clientY-Z.top)/Z.height)*2+1),S(),G.setFromCamera(q,o);let te=G.intersectObject(e.pickable(),!0)[0];te&&e.onTap(te.point,te)}H=null,r.style.cursor="grab"}),r.addEventListener("pointercancel",()=>{H=null,r.style.cursor="grab"}),r.addEventListener("keydown",D=>{let Z={ArrowLeft:[-.12,0],ArrowRight:[.12,0],ArrowUp:[0,.08],ArrowDown:[0,-.08]}[D.key];Z?(c.yaw+=Z[0],c.pitch=Math.max(.15,Math.min(1.45,c.pitch+Z[1])),U(),D.preventDefault()):(D.key==="Enter"||D.key===" ")&&e.onKey&&(e.onKey(),D.preventDefault())});function L(D,Z,te="",ue=!1){let pe=document.createElement("div");pe.className="l3d "+te,pe.innerHTML=D,pe.setAttribute("aria-hidden","true"),s.appendChild(pe);let se={el:pe,pos:Z,below:ue};return h.push(se),se}function z(D={}){D.target&&l.copy(D.target),D.radius!=null&&(p=D.radius),D.radiusY!=null&&(w=D.radiusY),D.dist!=null?c.dist=D.dist:N(),D.yaw!=null&&(c.yaw=D.yaw),D.pitch!=null&&(c.pitch=D.pitch),U()}return B(),{scene:a,camera:o,renderer:n,wrap:s,canvas:r,view:c,target:l,invalidate:U,kick:R,label:L,setFocus:z,ready(){b||_(),E===0&&(E=1),m=!0,d?R():(d=!0,O())},inkNew(D){e.ink!==!1&&eh(D||a,v,{color:e.inkColor,opacity:e.inkOpacity,minR:e.inkMinR})},reshadow(){E===2&&e.contactShadow!==!1&&(th(a,{opacity:e.shadowOpacity}),U())},get visible(){return d},get radius(){return p}}}var cl=null;function qx(i){if(cl)return cl;let e=new zs(i);return cl=e.fromScene(new ol,.04),e.dispose(),cl}function yt(i,e={}){let t=new Mr(e.sky??16774890,e.ground??9083048,e.hemi??.95);i.add(t);let n=new Li(e.key??16773856,e.keyI??1.25);n.position.set(e.keyPos?.[0]??3.5,e.keyPos?.[1]??6.5,e.keyPos?.[2]??4),i.add(n);let s=new Li(e.fill??14543103,e.fillI??.38);s.position.set(e.fillPos?.[0]??-4,e.fillPos?.[1]??2.5,e.fillPos?.[2]??-2.5),i.add(s);let r=new Li(e.rim??15266047,e.rimI??.45);r.position.set(e.rimPos?.[0]??-2.5,e.rimPos?.[1]??3.5,e.rimPos?.[2]??-5),i.add(r);let a=null;e.glint!==!1&&(a=new Li(e.glintCol??16773336,e.glintI??.55),a.position.set(e.glintPos?.[0]??6.5,e.glintPos?.[1]??8.5,e.glintPos?.[2]??1.2),i.add(a));let o=e.renderer||i.userData.renderer;if(o&&e.envI!==0)try{if(!i.environment){let l=qx(o);i.environment=l.texture}i.environmentIntensity=e.envI??.75}catch{}return{hemi:t,key:n,fill:s,rim:r,glint:a}}var kr=new C;function In(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;kr.copy(e),kr[n]=0,kr.normalize();let c=.5*a/(a+o),h=1-kr.angleTo(i)/l;return Math.sign(kr[t])===1?h*c:o/(a+o)+c+c*(1-h)}var hl=class i extends ve{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new C,c=new C,h=new C(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,m=d.length/6,y=new C,g=.5/a;for(let p=0,w=0;p<d.length;p+=3,w+=2)switch(l.fromArray(d,p),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),d[p+0]=h.x*Math.sign(l.x)+c.x*r,d[p+1]=h.y*Math.sign(l.y)+c.y*r,d[p+2]=h.z*Math.sign(l.z)+c.z*r,u[p+0]=c.x,u[p+1]=c.y,u[p+2]=c.z,Math.floor(p/m)){case 0:y.set(1,0,0),f[w+0]=In(y,c,"z","y",r,n),f[w+1]=1-In(y,c,"y","z",r,t);break;case 1:y.set(-1,0,0),f[w+0]=1-In(y,c,"z","y",r,n),f[w+1]=1-In(y,c,"y","z",r,t);break;case 2:y.set(0,1,0),f[w+0]=1-In(y,c,"x","z",r,e),f[w+1]=In(y,c,"z","x",r,n);break;case 3:y.set(0,-1,0),f[w+0]=1-In(y,c,"x","z",r,e),f[w+1]=1-In(y,c,"z","x",r,n);break;case 4:y.set(0,0,1),f[w+0]=1-In(y,c,"x","y",r,e),f[w+1]=1-In(y,c,"y","x",r,t);break;case 5:y.set(0,0,-1),f[w+0]=In(y,c,"x","y",r,e),f[w+1]=1-In(y,c,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};var Yx=typeof window<"u"&&window.AIX_STYLE||"clean",gd=Yx==="clean";function $x(i){let e=new He(i),t={};e.getHSL(t);let n=.105+(t.h-.105)*.75,s=Math.min(.92,Math.max(.74,.8+.45*(t.s-.4))),r=Math.min(.52,Math.max(.28,.1+.68*t.l));return e.setHSL(n,s,r).getHex()}function xd(i,e){let t=new He(e),n={};t.getHSL(n),t.setHSL(n.h,Math.min(1,n.s*.9),Math.min(.82,n.l*1.12+.06)),i.side=Ut;let s=i.onBeforeCompile;i.onBeforeCompile=(o,l)=>{s&&s(o,l),o.uniforms.uSec={value:new C(t.r,t.g,t.b)},o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 uSec;`).replace("#include <dithering_fragment>",`#include <dithering_fragment>
  if (!gl_FrontFacing) gl_FragColor.rgb = uSec;`)};let r=i.customProgramCacheKey?.bind(i);i.customProgramCacheKey=()=>(r?r():"")+"sectionCap";let a=i.clone.bind(i);return i.clone=()=>{let o=a();return xd(o,e)},i}function Ge(i,e={}){let t=e.opacity??1,n=new yr({color:i,transparent:t<1,opacity:t,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??0,shininess:e.shininess??28,specular:e.specular??4473924,flatShading:!1,side:e.side??Tn,depthWrite:t>=.95,clippingPlanes:e.clip||e.clippingPlanes||[],clipShadows:!!(e.clip||e.clippingPlanes)});return e.map&&(n.map=e.map),n}var nh=new Map;function Zx(i=128,e=1){let t=i+":"+e.toFixed(2);if(nh.has(t))return nh.get(t);let n=document.createElement("canvas");n.width=i,n.height=i;let s=document.createElement("canvas");s.width=i,s.height=i;let r=n.getContext("2d"),a=s.getContext("2d"),o=r.createImageData(i,i),l=a.createImageData(i,i);for(let u=0;u<i;u++){let f=Math.sin(u*1.15)*.55+Math.sin(u*2.7)*.28+Math.sin(u*5.1)*.12+Math.sin(u*11.3)*.06,m=.55+f*.38+Math.sin(u*.37)*.1;for(let y=0;y<i;y++){let g=Math.sin(y*.04+u*.015)*.08,p=f+g,w=Math.max(0,Math.min(255,Math.floor(128+p*55*e))),P=Math.max(0,Math.min(255,Math.floor(128+Math.sin(y*.55+u*.08)*6*e))),v=(u*i+y)*4;o.data[v]=w,o.data[v+1]=P,o.data[v+2]=255,o.data[v+3]=255;let b=Math.max(0,Math.min(255,Math.floor((m+g*.35)*255)));l.data[v]=b,l.data[v+1]=b,l.data[v+2]=b,l.data[v+3]=255}}r.putImageData(o,0,0),a.putImageData(l,0,0);let c=new wn(n);c.wrapS=c.wrapT=Wi,c.colorSpace=Cn,c.anisotropy=4;let h=new wn(s);h.wrapS=h.wrapT=Wi,h.colorSpace=Cn,h.anisotropy=4;let d={normalMap:c,roughnessMap:h};return nh.set(t,d),d}function W(i,e={}){if(e.phong)return Ge(i,{shininess:e.shininess??72,specular:e.specular??11184810,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??.04,opacity:e.opacity??1,side:e.side,map:e.map,clip:e.clip});let t=e.opacity??1;if(gd&&e.brush!=="force"){let a=new He(i).getHSL({}),o=!e._fromBrass&&a.s<.16&&a.l>.34&&e.emissive==null,l=new Hn({color:i,metalness:o?.12:Math.min(e.metalness??.82,e._fromBrass?.22:.42),roughness:Math.max(e.roughness??.28,.4),emissive:o?i:e.emissive??0,emissiveIntensity:o?.16:e.emissiveIntensity??.04,transparent:t<1,opacity:t,side:e.side??Tn,depthWrite:t>=.95,clippingPlanes:e.clip||e.clippingPlanes||[],clipShadows:!!(e.clip||e.clippingPlanes),envMapIntensity:o?.3:Math.min(e.envMapIntensity??.7,.5)});return e.map&&(l.map=e.map),(e.clip||e.clippingPlanes)&&e.section!==!1&&xd(l,i),e.streak==="force"&&ul(l,{axis:e.brushAxis??"x",...e.streakOpts||{}}),l}let n=e.clearcoat!=null?e.clearcoat:0,s=n>0?xr:Hn,r=new s({color:i,metalness:e.metalness??.82,roughness:e.roughness??.28,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??.04,transparent:t<1,opacity:t,side:e.side??Tn,depthWrite:t>=.95,clippingPlanes:e.clip||e.clippingPlanes||[],clipShadows:!!(e.clip||e.clippingPlanes),envMapIntensity:e.envMapIntensity??.7});if(n>0&&(r.clearcoat=n,r.clearcoatRoughness=e.clearcoatRoughness??.2),e.map&&(r.map=e.map),e.brush!==!1){let a=e.brushStrength??1.15,o=Zx(e.brushSize??128,a),l=e.brushRepeatU??e.brushRepeat??2.5,c=e.brushRepeatV??(e.brushRepeat!=null?e.brushRepeat*2.2:7);r.normalMap=o.normalMap,r.normalScale=new Ue(e.normalScaleX??1.25,e.normalScaleY??.22),r.normalMap.repeat.set(l,c),e.roughnessMap!==!1&&(r.roughnessMap=o.roughnessMap,r.roughnessMap.repeat.set(l,c))}return e.streak&&!e._fromBrass&&ul(r,{axis:e.brushAxis??"x",...e.streakOpts||{}}),r}function di(i,e={}){let t=e.opacity??.18,n=new Hn({color:i,metalness:.05,roughness:e.roughness??.12,transparent:!0,opacity:t,side:e.side??Ut,depthWrite:!1,envMapIntensity:e.envMapIntensity??.35});return n.userData.isGlass=!0,n}function ul(i,e={}){let t=e.axis??"x",n={uStreakI:{value:e.intensity??.42},uStreakExp:{value:e.exp??90},uGrainF:{value:e.freq??70},uGrainAmt:{value:e.grain??.1}};i.userData.streak=n;let s={x:"vec3(1.0, 0.0, 0.0)",y:"vec3(0.0, 1.0, 0.0)",z:"vec3(0.0, 0.0, 1.0)",circ:"normalize(vec3(-position.z, 0.0, position.x) + vec3(1e-5))"}[t],r={x:"(vObjP.y * 0.8 + vObjP.z * 0.6)",y:"(vObjP.x * 0.8 + vObjP.z * 0.6)",z:"(vObjP.x * 0.6 + vObjP.y * 0.8)",circ:"vObjP.y"}[t],a=i.onBeforeCompile;i.onBeforeCompile=(h,d)=>{a&&a(h,d),Object.assign(h.uniforms,n),h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
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
#include <opaque_fragment>`)};let o=i.clone.bind(i);i.clone=()=>ul(o(),e);let l="brushStreak:"+t,c=i.customProgramCacheKey?.bind(i);return i.customProgramCacheKey=()=>(c?c():"")+l,i}function Yt(i=13936736,e={}){if(gd&&e.brush!=="force"){let n=e.cleanHex??$x(i);return W(n,{clip:e.clip,side:e.side,opacity:e.opacity,map:e.map,metalness:.22,roughness:.44,envMapIntensity:.35,emissive:n,emissiveIntensity:Math.min(.07,(e.emissiveIntensity??.3)*.2),streak:e.streak==="force"?"force":!1,brushAxis:e.brushAxis,streakOpts:e.streakOpts,_fromBrass:!0})}let t=W(i,{metalness:e.metalness??.58,roughness:e.roughness??.2,emissive:e.emissive??10512416,emissiveIntensity:e.emissiveIntensity??.3,envMapIntensity:e.envMapIntensity??.55,clearcoat:e.clearcoat??.32,clearcoatRoughness:e.clearcoatRoughness??.28,brushStrength:e.brushStrength??2,brushSize:e.brushSize??128,normalScaleX:e.normalScaleX??1.55,normalScaleY:e.normalScaleY??.18,...e,_fromBrass:!0});return e.streak!==!1&&ul(t,{axis:e.brushAxis??"x",...e.streakOpts||{}}),t}function Pn(i,e={}){return Ge(i,{shininess:e.shininess??18,specular:e.specular??3355443,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,opacity:e.opacity??1,side:e.side,map:e.map})}function Qi(i=220,e={}){let t=i-3<<16|i<<8|Math.min(255,i+8);return Pn(t,{emissive:t,emissiveIntensity:e.lift??.42,envMapIntensity:.15,...e})}function fi(i=14474456,e={}){return Pn(i,{emissive:i,emissiveIntensity:e.lift??.32,...e})}function jt(i,e,t,n=.04,s=3){let r=Math.min(n,i*.45,e*.45,t*.45);return new hl(i,e,t,s,r)}function dl(i,e=28){if(i&&i.type==="RoundedBoxGeometry"&&i.parameters){let t=i.parameters;return new Ot(new ve(t.width*.998,t.height*.998,t.depth*.998),e)}return new Ot(i,e)}function Oe(i,e,t,n,s=.04,r=3){return new k(jt(i,e,t,s,r),n)}function fl(i,e,t,n,s,r=0){let a=new k(new ve(e+.04,Math.min(.05,t*.25),n+.04),s);return a.position.y=r,i.add(a),a}function rt(i,e,t,n,s,r={}){let a=r.t??.045,o=r.railH??.07,l=r.overhang??.03,c=new k(new ve(e+l*2,a,t+l*2),s);c.position.y=n,i.add(c);let h=n-o/2+a/2;for(let[d,u,f,m]of[[0,t/2+l/2,e+l*2,a],[0,-t/2-l/2,e+l*2,a],[e/2+l/2,0,a,t+l*2],[-e/2-l/2,0,a,t+l*2]]){let y=new k(new ve(f,o,m),s);y.position.set(d,h,u),i.add(y)}return c}function Ws(i,e,t,n,s,r={}){let a=new k(new Lt(e,t??.035,r.radial??8,r.tubular??48),s);return a.rotation.x=Math.PI/2,a.position.y=n,(r.scaleX||r.scaleZ)&&a.scale.set(r.scaleX??1,1,r.scaleZ??1),i.add(a),a}function _t(i,e={}){let t=e.dur??1.15,n=l=>l*l*(3-2*l),s=i.map((l,c)=>{let h=l.obj,d=l.delay??c/Math.max(1,i.length-1)*.45,u=h.position.y;h.userData._revPending=!0;let f=l.fromY??u-(l.drop??.35);return h.position.y=f,h.scale.setScalar(l.fromScale??.55),h.traverse(m=>{m.isMesh&&m.material&&(m.userData._revMat||(m.material=m.material.clone(),m.userData._revMat=!0),m.material.transparent=!0,m.userData._revOp=m.material.opacity??1,m.material.opacity=0)}),{obj:h,delay:d,baseY:u,fromY:f,fromScale:l.fromScale??.55}}),r=0,a=!1,o=!1;return{get done(){return o},arm(){o||(a=!0,r=0)},tick(l){if(!a||o)return!o&&a;r+=l;let c=!0;for(let h of s){let d=Math.max(0,Math.min(1,(r-h.delay)/t)),u=n(d);h.obj.position.y=h.fromY+(h.baseY-h.fromY)*u;let f=h.fromScale+(1-h.fromScale)*u;h.obj.scale.setScalar(f),h.obj.traverse(m=>{m.isMesh&&m.material&&m.userData._revOp!=null&&(m.material.opacity=m.userData._revOp*u,u>=.99&&m.userData._revOp>=.95&&(m.material.transparent=m.userData._revOp<1,m.material.opacity=m.userData._revOp))}),d<1&&(c=!1)}if(c){o=!0,a=!1;for(let h of s)delete h.obj.userData._revPending}return!0}}}var es=(i,e)=>.12*(i-1.2)**2+1.5*(e-.35*Math.sin(1.7*i))**2,pl=(i,e)=>{let t=e-.35*Math.sin(1.7*i);return[.24*(i-1.2)+3*t*(-.595*Math.cos(1.7*i)),3*t]},Vr={x:1.2,y:.35*Math.sin(2.04)},yd={X0:-3,X1:3,Y0:-1.6,Y1:1.6};var{X0:jn,X1:pi,Y0:mi,Y1:Qn}=yd,Jx=.62,_d=(i,e)=>Jx*Math.log(1+es(i,e)),Wr=(i,e,t)=>Math.max(e,Math.min(t,i)),ih=i=>[1,3,5].map(e=>parseInt(i.slice(e,e+2),16));function vd(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var Md=i=>Math.sqrt(-2*Math.log(i()||1e-9))*Math.cos(2*Math.PI*i());function Kx(){let t=document.createElement("canvas");t.width=900,t.height=480;let n=t.getContext("2d"),s=n.createImageData(900,480),r=ih("#f3eefc"),a=ih("#4f3080"),o=ih("#3a2560"),l=new Int16Array(900*480),c=new Float32Array(900*480);for(let d=0;d<480;d++)for(let u=0;u<900;u++){let f=jn+(u+.5)/900*(pi-jn),m=Qn-(d+.5)/480*(Qn-mi),y=Math.log(1+es(f,m));c[d*900+u]=y,l[d*900+u]=Math.floor(y*5)}for(let d=0;d<480;d++)for(let u=0;u<900;u++){let f=d*900+u,m=l[f],y=Wr(m/5/2.4,0,1),g=u+1<900&&l[f+1]!==m||d+1<480&&l[f+900]!==m,p=r.map((P,v)=>P+(a[v]-P)*y),w=g?.45:0;s.data.set([p[0]+(o[0]-p[0])*w,p[1]+(o[1]-p[1])*w,p[2]+(o[2]-p[2])*w,255],f*4)}n.putImageData(s,0,0);let h=new wn(t);return h.colorSpace=Vt,h.anisotropy=4,h}function bd(i,e){let t=e.ui,n=t.C,s=e.mode==="pair",r=Q=>Q<560,a=.06,o=.9,l=.01,c=10,h=500,d=Q=>{es(Q.p.x,Q.p.y)<l?Q.hold++||(Q.since=Q.n):Q.hold=0,Q.hold>=c?Q.done=Q.since:Q.n>=h&&(Q.done=-1)},u=.25,f=s?{x:-2.5,y:1.25}:{x:-2.4,y:1.2},m=0,y=vd(2),g=0,p=!0,w=[],P=()=>{y=vd(2),w=(s?[0,1]:[0]).map(Q=>({k:Q,p:{...f},v:{x:0,y:0},trail:[{...f}],n:0,done:0,hold:0,since:0})),_=!0},v=Q=>{let we=pl(Q.x,Q.y);return m?[we[0]+m*Md(y)*.6,we[1]+m*Md(y)*.6]:we};function b(){for(let Q of w){if(Q.done)continue;let we=v(Q.p);s?Q.k===0?(Q.p={x:Q.p.x-a*we[0],y:Q.p.y-a*we[1]},Q.n++,d(Q)):(Q.v={x:o*Q.v.x-a*we[0],y:o*Q.v.y-a*we[1]},Q.p={x:Q.p.x+Q.v.x,y:Q.p.y+Q.v.y},Q.n++,d(Q)):(Q.p={x:Q.p.x-u*we[0],y:Q.p.y-u*we[1]},Q.n++,(Math.hypot(...pl(Q.p.x,Q.p.y))<.004||Q.n>600||!isFinite(Q.p.x)||Math.abs(Q.p.y)>50)&&(Q.done=Q.n)),Q.trail.push(Q.p),Q.trail.length>600&&Q.trail.shift()}_=!0}let E=()=>w.some(Q=>!Q.done),I=()=>{let Q=0;for(;E()&&Q++<2e3;)b()},_=!0,S=null,N=xt(i,{ui:t,label:s?"Two balls rolling down the same three-dimensional error valley: plain steps and steps with momentum. Drag sideways to turn it; tap to drop the balls somewhere else.":"A three-dimensional error landscape for two knobs; a ball rolls downhill by gradient descent. Drag sideways to turn it; tap to drop the ball somewhere else.",height:Q=>r(Q)?Math.round(Math.max(280,Q*.78)):Math.round(Math.min(440,Q*.5)),radius:3.6,radiusY:2.7,yaw:-.42,pitch:.8,target:new C(0,.25,.1),busy:()=>S&&!S.done||p===!1&&E(),step(Q){return S&&!S.done?(S.tick(Q),!0):p||!E()?!1:(g+=Q,g<(s?.04:.11)?!0:(g=0,b(),s&&b(),_e(),E()))},onShow(){S?.arm(),p&&(p=!1,t.isPlaying()||I(),_e(),N&&N.kick())},pickable:()=>q,onTap(Q){f={x:Wr(Q.x,jn,pi),y:Wr(-Q.z,mi,Qn)},P(),p=!1,t.isPlaying()||I(),_e(),tt()},onKey(){P(),p=!1,t.isPlaying()||I(),_e()},onTurn(){tt()}});if(!N)return!1;let{scene:B}=N;yt(B,{hemi:.85,keyI:1.2,fillI:.35,rimI:.4,envI:.5,sky:16775423,ground:10129584});let O=new Me;B.add(O);let F=150,R=80,U=new On(pi-jn,Qn-mi,F,R);U.rotateX(-Math.PI/2);let G=U.attributes.position;for(let Q=0;Q<G.count;Q++){let we=G.getX(Q),je=-G.getZ(Q);G.setY(Q,_d(we,je))}U.computeVertexNormals();let q=new k(U,Ge(16777215,{map:Kx(),side:Ut,shininess:22,specular:5592439}));O.add(q);let H=-.05,L=Pn(14275558,{side:Ut}),z=Q=>{let we=new wt,je=[];for(let nt=0;nt<Q.length-1;nt++){let[qe,j]=[Q[nt],Q[nt+1]];je.push(qe.x,qe.y,qe.z,j.x,j.y,j.z,j.x,H,j.z,qe.x,qe.y,qe.z,j.x,H,j.z,qe.x,H,qe.z)}we.setAttribute("position",new ot(je,3)),we.computeVertexNormals(),O.add(new k(we,L))},D=(Q,we,je=0)=>new C(Q,_d(Q,we)+je,-we);for(let Q of[[jn,pi,mi,mi],[jn,pi,Qn,Qn],[jn,jn,mi,Qn],[pi,pi,mi,Qn]]){let we=[];for(let je=0;je<=120;je++){let nt=je/120;we.push(D(Q[0]+(Q[1]-Q[0])*nt,Q[2]+(Q[3]-Q[2])*nt))}z(we)}let Z=new k(new Lt(.11,.022,8,32),new sn({color:16777215}));Z.rotation.x=-Math.PI/2,Z.position.copy(D(Vr.x,Vr.y,.02)),O.add(Z),N.label("lowest point",()=>D(Vr.x,Vr.y,0),"l3d-ink",!0);let te=s?[16777215,new He(n.on).getHex()]:[new He(n.on).getHex()],ue=.12,pe=te.map(Q=>{let we=new k(new Ze(ue,32,16),W(Q,{emissive:Q,emissiveIntensity:.14,roughness:.28,metalness:.55,clearcoat:.4,brush:!1}));return B.add(we),we}),se=te.map(()=>{let Q=new k(new Ze(ue*1.16,32,16),new sn({color:new He(n.ink),side:Ht}));return B.add(Q),Q}),X=te.map(Q=>new sn({color:Q})),$=te.map(()=>null),me=Q=>isFinite(Q.x)&&Q.x>=jn&&Q.x<=pi&&Q.y>=mi&&Q.y<=Qn,ge=s?null:new wr(new C(1,0,0),new C,.6,16777215,.18,.11);ge&&B.add(ge),S=_t([{obj:O,delay:0,drop:.35,fromScale:.92}],{dur:.85}),s&&(N.label("plain steps",()=>me(w[0].p)?D(w[0].p.x,w[0].p.y,ue*5.5):null,"l3d-white"),N.label("with momentum",()=>me(w[1].p)?D(w[1].p.x,w[1].p.y,ue*5.5):null,"l3d-yellow"));function _e(){if(w.forEach((Q,we)=>{let je=me(Q.p);if(pe[we].visible=se[we].visible=je,je){let nt=D(Q.p.x,Q.p.y,ue*.9);pe[we].position.copy(nt),se[we].position.copy(nt)}if(_){$[we]&&(B.remove($[we]),$[we].geometry.dispose(),$[we]=null);let nt=Q.trail.filter(me).map(qe=>D(qe.x,qe.y,.035));if(nt.length>1){let qe=new gr;for(let j=0;j<nt.length-1;j++)qe.add(new Is(nt[j],nt[j+1]));$[we]=new k(new $i(qe,Math.min(1200,(nt.length-1)*2),.022,5,!1),X[we]),B.add($[we])}}}),_=!1,ge){let Q=w[0],we=pl(Q.p.x,Q.p.y),je=Math.hypot(...we);if(ge.visible=me(Q.p)&&isFinite(je)&&je>.01,ge.visible){let nt=D(Q.p.x,Q.p.y,ue*.9),qe=.32,j=D(Wr(Q.p.x-we[0]/je*qe,jn,pi),Wr(Q.p.y-we[1]/je*qe,mi,Qn),ue*.9),M=j.sub(nt).normalize();ge.position.copy(nt.addScaledVector(M,ue*1.05)),ge.setDirection(M)}}Je(),N.invalidate()}let Ye=t.controls(i);s?t.slider(Ye,{label:"Noise in each step (smaller batches)",name:"noise",min:0,max:1,step:.05,value:m,color:n.learn,fmt:Q=>Q===0?"none":Q.toFixed(2),oninput:Q=>{m=Q,P(),p=!1,t.isPlaying()||I(),_e()}}):t.slider(Ye,{label:"Step size",name:"lr",min:.02,max:.75,step:.01,value:u,color:n.learn,fmt:Q=>Q.toFixed(2),oninput:Q=>{u=Q,P(),p=!1,t.isPlaying()||I(),_e()}}),t.button(Ye,"Roll again",()=>{P(),p=!1,t.isPlaying()||I(),_e()},{name:s?"sgd-again":"lv-again"});let dt=t.readout(i);function Je(){if(s){let nt=qe=>qe.done>0?`on the floor in <b>${qe.done}</b> steps`:qe.done<0?`still not settled after ${h} steps (error ${es(qe.p.x,qe.p.y).toFixed(3)})`:`error ${es(qe.p.x,qe.p.y).toFixed(2)} after ${qe.n} steps`;dt.innerHTML=`To the floor (error below ${l} and staying there): <span class="c-grey">plain steps</span> ${nt(w[0])}; <span class="c-yellow">with momentum</span> ${nt(w[1])}.`;return}let Q=w[0],we=es(Q.p.x,Q.p.y),je=!isFinite(we)||we>50||!me(Q.p);dt.innerHTML=je?"The steps are so big the ball <b>flies out of the valley</b>: each step overshoots further than the last.":`Error <b>${we.toFixed(3)}</b> after <b>${Q.n}</b> steps; the white arrow is the steepest way down.`}let et=t.hint(i,s?"drag sideways to turn the valley, and tap it to drop both balls somewhere else. Then add noise: each step sees only part of the data, so the slope it measures wobbles.":"drag sideways to turn the landscape, and tap it to drop the ball somewhere else. Then push the step size up until the ball zigzags across the valley.");function tt(){et&&et.classList&&et.classList.add("done")}return P(),t.isPlaying()||(p=!1,I()),_e(),!0}var Xs=(i,e,t)=>Math.max(e,Math.min(t,i)),Ed=.02585,Sd=1.2,BM=Sd*Ed*Math.LN10,ts=.7,ei=(i,e)=>Math.log1p(Math.exp((i-e)/(2*Sd*Ed)))**2,sh={si:11578532,siMid:10262672,siDark:8420468,source:9089240,drain:6985928,oxide:10135728,gate:6980760,channel:5165e3,fin:12631220,wire:13949148,contact:13936736,spacer:13683908,ild:12106948,cut:15769696};function jx(i,e={}){return Ge(i,{opacity:e.opacity??1,side:e.side,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,clip:e.clip,shininess:e.shininess??34,specular:e.specular??6710886})}function qs(i,e,t,n,s=12){let r=new Me,a=Math.max(.01,i-e);r.add(new k(new ve(a,e,t),n));let o=e/2,l=new k(new Re(o,o,t,s),n);l.rotation.x=Math.PI/2,l.position.x=-i/2+o,r.add(l);let c=l.clone();return c.position.x=i/2-o,r.add(c),r}function Qx(i,e,t,n){let s=new Me,r=t/2,a=Math.max(.01,e-t);s.add(new k(new ve(i-t,a,t),n));let o=new k(new Re(r,r,i-t,16),n);o.rotation.z=Math.PI/2,o.position.y=a/2,s.add(o);let l=o.clone();l.position.y=-a/2,s.add(l);for(let c of[-1,1]){let h=new k(new Ze(r,14,12),n);h.scale.set(1,e/t,1),h.position.set(c*(i/2-r),0,0),s.add(h)}return s}function rh(i,e,t,n,s,r,a){let o=new Me,l=new k(new Re(.065,.07,s,16),r);l.position.y=s/2,o.add(l);let c=new k(new Re(.13,.13,.045,18),a);return c.position.y=s+.02,o.add(c),o.position.set(e,t,n),i.add(o),o}function wd(i,e){let t=e.ui,n=t.C,s=M=>M<560,r=1.15,a=.25+.55*(1.15/2),o=.55,l=.35,c=[],h=null,d=new gn(new C(-1,0,0),0),u=xt(i,{ui:t,label:"A MOSFET cut open in three dimensions. Drag sideways to turn it; Peek morphs planar \u2192 FinFET \u2192 GAA; Gate opens the channel.",height:M=>M<560?400:440,radius:1.08,radiusY:.86,yaw:.6,pitch:.26,target:new C(0,.5,0),localClipping:!0,fitPadY:1.22,fitPadX:1.1,fov:34,busy:()=>h&&!h.done||c.length>0&&o>l*.6,onShow(){h?.arm(),u&&u.invalidate()},step(M){try{h&&!h.done&&h.tick(M);let re=ei(o,l)/ei(ts,l),he=re*55*M;for(let A=0;A<he;A++)c.length<100&&c.push({t:Math.random()*.12,lane:Math.random()});for(let A of c)A.t+=M*(.55+re*.95);for(let A=c.length-1;A>=0;A--)c[A].t>1&&c.splice(A,1);return we(),c.length>0}catch{return!1}}});if(!u)return!1;let{scene:f}=u;yt(f,{hemi:.4,keyI:1.55,fillI:.22,rimI:.62,sky:16769216,ground:3813408,keyPos:[5,6,4],fillPos:[-4,2,-2],envI:.25,glintI:.18,glintPos:[8,7,1.5]});let m=new Me;f.add(m);let y=[d],g=Yt(12623984,{clip:y,metalness:.55,emissiveIntensity:.26,envMapIntensity:.28,brushStrength:1.9,clearcoat:.14,clearcoatRoughness:.32}),p=Yt(11569232,{clip:y,metalness:.55,emissiveIntensity:.24,envMapIntensity:.28,brushStrength:1.6,clearcoat:.12,clearcoatRoughness:.32}),w=W(13157564,{clip:y,roughness:.42,metalness:.3,envMapIntensity:.35}),P=W(5935060,{clip:y,roughness:.35,metalness:.4,emissive:2777e3,emissiveIntensity:.3,envMapIntensity:.3}),v=W(5935060,{clip:y,roughness:.35,metalness:.4,emissive:2777e3,emissiveIntensity:.3,envMapIntensity:.3}),b=W(sh.oxide,{clip:y,roughness:.42,metalness:.15,opacity:.38,brush:!1,envMapIntensity:.18}),E=Yt(15319375,{clip:y,metalness:.55,emissive:11569184,emissiveIntensity:.34,clearcoat:.2,clearcoatRoughness:.28,brushStrength:1.6,envMapIntensity:.3}),I=jx(sh.channel,{clip:y,emissive:sh.channel,emissiveIntensity:.4,opacity:.9}),_=Yt(12623984,{clip:y,metalness:.52,emissiveIntensity:.26,brushStrength:1.3,envMapIntensity:.28,clearcoat:.15}),S=Yt(13676656,{clip:y,metalness:.58,emissiveIntensity:.28,clearcoat:.22,clearcoatRoughness:.25,brushStrength:1.4,envMapIntensity:.3}),N=Yt(13146184,{clip:y,emissiveIntensity:.26,brushStrength:1.8,clearcoat:.14,clearcoatRoughness:.3,envMapIntensity:.28}),B=W(11573360,{clip:y,roughness:.35,metalness:.5,brushStrength:.7,emissive:5259304,emissiveIntensity:.08,envMapIntensity:.3}),O=W(9472112,{clip:y,roughness:.45,metalness:.25,opacity:.38,brush:!1,envMapIntensity:.18}),F=Oe(3.2,.42,2,g,.07);F.position.y=-.02,m.add(F),rt(m,3.15,1.95,.18,Yt(13148256,{clip:y,emissiveIntensity:.3,clearcoat:.18,clearcoatRoughness:.28,envMapIntensity:.3}),{t:.032,railH:.04,overhang:.025});{let M=Oe(3.15,.09,1.95,p,.04);M.position.set(0,.22,0),m.add(M)}{let M=Oe(3.22,.07,2.02,w,.035);M.position.set(0,-.26,0),m.add(M)}for(let M=0;M<11;M++){let re=-.9+M*.18,he=new k(new ve(2.95,.028,.045),N);he.position.set(0,.245,re),m.add(he)}for(let M=0;M<7;M++){let re=-1.35+M*.45,he=new k(new ve(.04,.03,1.75),Yt(12093512,{clip:y,emissiveIntensity:.2,brushStrength:1,envMapIntensity:.35}));he.position.set(re,.248,0),m.add(he)}for(let M of[-.85,.85]){let re=Oe(2.8,.06,.12,w,.02);re.position.set(0,.2,M),m.add(re)}let R=qs(.95,.28,1.3,P,16);R.position.set(-.95,.3,0),m.add(R);let U=qs(.95,.28,1.3,v,16);U.position.set(.95,.3,0),m.add(U);{let M=qs(.78,.06,1.1,N,12);M.position.set(-.95,.46,0),m.add(M)}{let M=qs(.78,.06,1.1,N,12);M.position.set(.95,.46,0),m.add(M)}for(let M of[-.95,.95])for(let re of[-.35,0,.35]){let he=new k(new ve(.55,.035,.12),N);he.position.set(M,.5,re),m.add(he)}let G=new k(new ve(1.4,.04,1.3),O);G.position.y=.46,m.add(G);let q=new k(new ve(1.05,.045,1.15),b);q.position.set(0,.44,0),m.add(q);let H=qs(.98,.13,1.1,E,12);H.position.set(0,.54,0),m.add(H);for(let M of[-1,1]){let re=new k(new ve(.08,.16,1.05),B);re.position.set(M*.55,.52,0),m.add(re)}let L=new Me;m.add(L);let z=Qx(1.2,.55,.18,_);z.position.set(0,.58,0),L.add(z);let D=new k(new ve(1.1,.48,.035),b);D.position.set(0,.58,.12),L.add(D);let Z=D.clone();Z.position.z=-.12,L.add(Z);let te=new k(new Re(.125,.125,1.1,16,1,!1,0,Math.PI));te.material=b,te.rotation.z=Math.PI/2,te.position.set(0,.84,0),L.add(te);let ue=new k(new ve(.95,.48,.08),E);ue.position.set(0,.58,.165),L.add(ue);let pe=ue.clone();pe.position.z=-.165,L.add(pe);let se=new k(new Re(.18,.18,.95,20,1,!1,0,Math.PI));se.material=E,se.rotation.z=Math.PI/2,se.position.set(0,.9,0),L.add(se);for(let M of[-1,1]){let re=new k(new ve(.1,.5,.38),B);re.position.set(M*.55,.6,0),L.add(re)}let X=new Me;m.add(X);for(let M=0;M<3;M++){let re=.42+M*.28,he=new Me;he.add(new k(new ve(1.15,.07,.26),_));for(let J of[-1,1]){let V=new k(new Ze(.07,12,10),_);V.scale.set(1,1,1.85),V.position.set(J*.575,0,0),he.add(V)}he.position.y=re,X.add(he);let A=new k(new ve(.72,.13,.34),b);A.position.set(0,re,0),X.add(A);let x=qs(.7,.16,.4,E,10);x.position.set(0,re,0),X.add(x)}for(let M of[-1,1]){let re=new k(new ve(.12,.85,.2),_);re.position.set(M*.7,.7,0),X.add(re)}let $=new k(new qi(.055,.85,6,14),I);$.rotation.z=Math.PI/2,$.position.set(0,.34,0),m.add($);let me=rh(m,-.95,.42,.45,.28,S,N),ge=rh(m,.95,.42,.45,.28,S,N),_e=rh(m,0,.55,-.55,.32,S,N),Ye=new Ze(.028,10,10),dt=Ge(3836128,{emissive:3836128,emissiveIntensity:.55}),Je=[];for(let M=0;M<100;M++){let re=new k(Ye,dt);re.visible=!1,m.add(re),Je.push(re)}let et=new Pt({color:3815476,transparent:!0,opacity:.12,clippingPlanes:y});for(let M of[F,R,U])if(M?.geometry)try{M.add(new Dt(new Ot(M.geometry,24),et.clone()))}catch{}u.label('<span class="c-yellow">gate</span>',()=>new C(0,r>1.4?1.45:r>.5?1.22:.85,-.55),"");function tt(){let M=Xs(1-r,0,1),re=Xs(1-Math.abs(r-1),0,1),he=Xs(r-1,0,1);q.visible=H.visible=M>.08,q.scale.set(1,.5+.5*M,1),H.scale.setScalar(.7+.3*M),H.traverse(x=>{x.isMesh&&x.material&&x.material.emissiveIntensity!=null&&(x.material.emissiveIntensity=.05+.14*(o/ts)*M)}),L.visible=re>.06,L.scale.set(1,.55+.45*re,.75+.25*re),X.visible=he>.06,X.scale.set(1,.6+.4*he,1);let A=Xs(ei(o,l)/ei(ts,l),0,1);$.position.y=.32+.16*re+.26*he,$.scale.set(1,.7+.5*re,.8+.4*re),$.material.opacity=.12+.82*A,$.material.emissiveIntensity=.12+.75*A,$.visible=A>.02,_e.position.y=r>1.3?.55:r>.6?.45:.38,G.material.opacity=.25+.35*(1-Math.max(re,he))}function Q(){let M=1.5-a*3;d.constant=M}function we(){let M=ei(o,l)/ei(ts,l),re=$.position.y,he=.08+.07*Xs(r,0,1);for(let A=0;A<Je.length;A++){let x=Je[A],J=c[A];if(!J||M<.05){x.visible=!1;continue}x.visible=!0,x.position.set(-.5+J.t*1,re+(r>1.2?(A%3-1)*.22*Xs(r-1,0,1):0),(J.lane-.5)*he*2)}u.invalidate()}function je(){tt(),Q(),we();let M=ei(o,l)/ei(ts,l),re=ei(ts,l)/Math.max(1e-12,ei(0,l)),he=r<.45?"planar":r<1.45?"FinFET":"GAA",A=Math.floor(Math.log10(Math.max(M,1e-12))),x=M>=.01?`${Math.round(M*100)}%`:`${(M/10**A).toFixed(1)}\xD710<sup>${A}</sup>`;qe.innerHTML=`<b class="c-blue">${he}</b> \xB7 gate <b>${o.toFixed(2)} V</b> \u2192 channel <b class="c-cyan">${x}</b> \xB7 on/off \u2248 <b>${re>=1e6?(re/1e6).toPrecision(2)+"M":Math.round(re).toLocaleString("en-GB")}\xD7</b>.`,u.invalidate()}let nt=t.controls(i);t.slider(nt,{label:"Peek",name:"gen",min:0,max:2,step:.01,value:r,color:n.compute,fmt:M=>M<.45?"planar":M<1.45?"FinFET":"GAA",oninput:M=>{r=M,a=.25+.55*(M/2),je()}}),t.slider(nt,{label:"Gate",name:"vg",min:0,max:ts,step:.01,value:o,color:n.cyan,fmt:M=>`${M.toFixed(2)} V`,oninput:M=>{o=M,je()}});let qe=t.readout(i);t.hint(i,'<span class="c-blue">gate</span> fills <span class="c-cyan">channel</span> \xB7 <span class="c-blue">source</span>\u2190 \u2192<span class="c-blue">drain</span> \xB7 Peek: planar \u2192 FinFET \u2192 GAA'),je();let j=_t([{obj:F,delay:0,drop:.15},{obj:R,delay:.1,drop:.18},{obj:U,delay:.15,drop:.18},{obj:H,delay:.25,drop:.2},{obj:L,delay:.35,drop:.22},{obj:X,delay:.45,drop:.22}],{dur:.95});return h=j,j.arm(),u.view.dist<3.4&&(u.view.dist=3.4),u.ready(),!0}var vn={usdPerEur:1.13,h100:{tdpW:700,bf16:9894e11,name:"H100 SXM"},dgxH100:{maxW:10200,gpus:8},pue:{best:1.09,avg:1.56},mfu:{lo:.38,hi:.43},eniac:{addPerS:5e3,W:15e4,tubes:17468},dcTWh2024:415,dcTWh2030:945,usDcTWh:{2014:58,2018:76,2023:176,lo2028:325,hi2028:580},irelandDc:{twh2024:6.969,share2024:.22,share2015:.05},colossus:{gpus:1e5,MW:150},ember:{world2025:31734,world2024:30913,us2024:4405,china2024:10070,europe2024:5094,japan2024:1016,ireland2024:36.1},ieaRegions:{us:[186.75,426.75],china:[103.75,278.75],europe:[62.25,107.25],japan:[18.75,33.75]},iea2035:{base:1200,liftOff:1700,highEff:970,headwinds:700},gb200RackKW:120,h100DieMM2:814,dgxH100USD:269e3,chipLifeYears:4,llama3GPUs:16384,nerc2024MW:1500};function ah(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new wt,c=0;for(let h=0;h<i.length;++h){let d=i[h],u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,d=[];for(let u=0;u<i.length;++u){let f=i[u].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(let h in r){let d=Td(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let y=0;y<a[h].length;++y)f.push(a[h][y][u]);let m=Td(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}}return l}function Td(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new on(a,t,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let d=l/t;for(let u=0,f=h.count;u<f;u++)for(let m=0;m<t;m++){let y=h.getComponent(u,m);o.setComponent(u+d,m,y)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}var gi=(i,e,t)=>Math.max(e,Math.min(t,i)),Mn=(i,e,t)=>i+(e-i)*t,ey=i=>i*i*(3-2*i),Bi=[{key:"die",name:"one GPU die",W:vn.h100.tdpW,note:`H100 SXM \xB7 ${vn.h100.tdpW} W TDP \xB7 ${vn.h100DieMM2} mm\xB2 die`},{key:"board",name:"one server",W:vn.dgxH100.maxW,note:`DGX H100 \xB7 ${vn.dgxH100.maxW/1e3} kW max \xB7 ${vn.dgxH100.gpus} GPUs`},{key:"rack",name:"one rack",W:4*vn.dgxH100.maxW,note:"four DGX-class servers in one cabinet (packing assumed)"},{key:"hall",name:"the GPU hall",W:vn.colossus.gpus/8*vn.dgxH100.maxW,note:`${vn.colossus.gpus.toLocaleString("en-GB")} GPUs \xB7 servers only`},{key:"building",name:"the building",W:vn.colossus.MW*1e6,note:`Colossus \xB7 utility ${vn.colossus.MW} MW for everything inside`}];function Nt(i,e={}){return Ge(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function De(i,e,t,n,s=0,r=0,a=0){let o=new k(new ve(i,e,t),n);return o.position.set(s,r,a),o}function gt(i,e,t,n,s=0,r=0,a=0,o=.04){let l=Oe(i,e,t,n,o);return l.position.set(s,r,a),l}function ty(i,{minDim:e=.1,color:t=1844270,opacity:n=.5}={}){i.updateMatrixWorld(!0);let s=new mt().copy(i.matrixWorld).invert(),r=[],a=new C,o=new mt,l=[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]];i.traverse(d=>{if(!d.isMesh||!d.geometry||d.isInstancedMesh)return;let u=d.geometry;u.boundingBox||u.computeBoundingBox();let f=u.boundingBox,m=new C;if(f.getSize(m),Math.max(m.x,m.y,m.z)<e)return;o.multiplyMatrices(s,d.matrixWorld);let y=[];for(let g=0;g<8;g++)a.set(g&1?f.max.x:f.min.x,g&2?f.max.y:f.min.y,g&4?f.max.z:f.min.z).applyMatrix4(o),y.push(a.clone());for(let[g,p]of l)r.push(y[g].x,y[g].y,y[g].z,y[p].x,y[p].y,y[p].z)});let c=new wt;c.setAttribute("position",new ot(r,3));let h=new Dt(c,new Pt({color:t,transparent:!0,opacity:n}));return h.userData.ink=n,i.add(h),h}function oh(i,e,t,n=.04,s=14){let r=i.clone().add(e).multiplyScalar(.5);r.y-=t;let a=new Yi(i,r,e);return new $i(a,s,n,6,!1)}function Xr(i,e,t,n,s,r){let a=new hi(new ve(t,n,s),r,e.length),o=new mt;return e.forEach((l,c)=>{o.makeTranslation(l[0],l[1],l[2]),a.setMatrixAt(c,o)}),a.instanceMatrix.needsUpdate=!0,i.add(a),a}var Ad=i=>i>=1e6?`${+(i/1e6).toPrecision(3)} MW`:i>=1e3?`${+(i/1e3).toPrecision(3)} kW`:`${Math.round(i)} W`;function Rd(i,e){let t=e.ui,n=t.C,s=j=>j<560,r=1,a=null,o=0,l=null,c=[{dist:3.6,y:.28,pitch:.62,yaw:-.55},{dist:11.5,y:1.05,pitch:.48,yaw:-.72},{dist:30,y:4.4,pitch:.24,yaw:-.82},{dist:132,y:-3,pitch:.5,yaw:-.95},{dist:195,y:20,pitch:.26,yaw:.88}],h=xt(i,{ui:t,label:"A continuous three-dimensional zoom from one GPU die out through the server, rack and hall to the whole building. Drag sideways to turn; use the zoom control to pull out.",height:j=>s(j)?Math.round(Math.max(320,j*.95)):Math.round(Math.min(460,j*.55)),radius:4,radiusY:2.5,yaw:c[1].yaw,pitch:c[1].pitch,target:new C(0,c[1].y,0),autoFit:!1,contactShadow:!1,fov:34,busy:()=>a!=null||!!(l&&!l.done),onShow(){l?.arm(),Q(!0),we(),h&&h.invalidate()},step(j){if(o+=j,l&&!l.done)return l.tick(j),!0;if(a!=null){let M=a-r;return Math.abs(M)<.004?(r=a,a=null):r+=M*Math.min(1,j*5.5),Q(!0),we(),je(!1),!0}if(w){if(w.material.emissiveIntensity=.28+.14*Math.sin(o*2.2),E.visible){for(let M of N){let re=(M.ph+o*.45)%1;M.m.position.x=M.dir*(-2.75+re*5.5)}B.emissiveIntensity=.16+.12*(.5+.5*Math.sin(o*2.6))}return h.invalidate(),!0}return!1}});if(!h)return!1;let{scene:d,view:u,target:f}=h;u.dist=c[1].dist,yt(d,{hemi:.95,keyI:1.35,fillI:.38,rimI:.42,keyPos:[-5,12,7],fillPos:[7,3,-5],envI:.8,glintI:.4});let m=new k(new pr(140,64),Nt(15001824));m.rotation.x=-Math.PI/2,m.position.y=-.04,d.add(m);let y=new Me;d.add(y);let g=new Me;y.add(g);let p=Nt(14711354,{emissive:14711354,emissiveIntensity:.32}),w=De(1.05,.14,1.05,p,0,.1,0);g.add(w);let P=Nt(15769696,{emissive:16777215,emissiveIntensity:.06});for(let j=0;j<5;j++)for(let M=0;M<5;M++)g.add(De(.15,.035,.15,P,-.4+M*.2,.19,-.4+j*.2));let v=Nt(4168260,{emissive:4168260,emissiveIntensity:.1}),b=Nt(13686992);for(let j of[-1,1])for(let M=0;M<8;M++){let re=M%2?3115602:4168260;g.add(De(.28,.055,.7,Nt(re,{emissive:2783796,emissiveIntensity:.08}),j*.78,.06+M*.07,0)),M<7&&g.add(De(.26,.012,.65,b,j*.78,.09+M*.07,0))}g.add(gt(2,.07,1.5,W(13685980,{roughness:.42,metalness:.45}),0,.01,0,.04)),g.add(gt(1.95,.03,1.45,W(12106948,{roughness:.35}),0,.05,0,.03)),rt(g,1.95,1.45,.08,W(11055288),{t:.025,railH:.04,overhang:.02}),rt(g,1.05,1.05,.2,W(15769696),{t:.02,railH:.03,overhang:.015});for(let j=0;j<24;j++){let M=j/24*Math.PI*2,re=.92;g.add(De(.04,.035,.04,Nt(12886112),Math.cos(M)*re,-.01,Math.sin(M)*re*.7))}for(let j=-3;j<=3;j++)for(let M=-2;M<=2;M++)Math.abs(j)+Math.abs(M)<2||g.add(De(.035,.025,.035,Nt(12095568),j*.18,-.015,M*.18));let E=new Me;y.add(E),E.position.set(0,-.08,0);let I=Nt(14474456),_=gt(6.4,.1,3.6,fi(14474456),0,0,0,.04);E.add(_),E.add(De(6.8,.55,4,Nt(12108496),0,-.28,0)),E.add(De(6,.04,.1,Nt(9080984),0,.08,1.5)),E.add(De(6,.04,.1,Nt(9080984),0,.08,-1.5)),rt(E,6.4,3.6,.08,W(11842736),{t:.035,railH:.05,overhang:.03});for(let j=-4;j<=4;j++)E.add(De(5.8,.015,.035,Nt(4880984,{opacity:.75}),0,.06,j*.32));let S=Nt(16765802,{emissive:16756778,emissiveIntensity:.95}),N=[];for(let j=-4;j<=4;j++)for(let M=0;M<2;M++){let re=De(.5,.03,.085,S,0,.118,j*.32);E.add(re),N.push({m:re,ph:((j+4)*.37+M*.5)%1,dir:j%2?1:-1})}let B=Nt(14711354,{emissive:14711354,emissiveIntensity:.12}),O=[];for(let j=0;j<8;j++){if(j===2)continue;let M=new Me,re=j%2,he=Math.floor(j/2),A=re?1.4:-1.4,x=-1.2+he*.8;M.position.set(A,.12,x),M.add(De(.5,.1,.5,B)),rt(M,.5,.5,.08,W(15769696),{t:.015,railH:.025,overhang:.01});for(let J of[-.38,.38])for(let V=0;V<4;V++)M.add(De(.14,.035,.35,v,J,.02+V*.04,0)),V<3&&M.add(De(.12,.008,.32,b,J,.04+V*.04,0));E.add(M),O.push(M)}let F=new Me;y.add(F);let R=W(4874114,{roughness:.4,metalness:.7}),U=W(5927576,{roughness:.45,metalness:.55,opacity:.88}),G=W(4018030,{roughness:.42,metalness:.65}),q=W(11582664,{roughness:.35,metalness:.7}),H=W(5924984,{roughness:.4,metalness:.75}),L=fi(13684940),z=W(14711354,{emissive:14711354,emissiveIntensity:.28,roughness:.38,metalness:.6});for(let j of[-3.5,3.5])for(let M of[-2,2])F.add(gt(.22,9,.22,R,j,4.3,M,.06));F.add(gt(.12,8.8,4,U,-3.55,4.3,0,.02)),F.add(gt(.12,8.8,4,U,3.55,4.3,0,.02)),F.add(gt(7.2,.2,4.2,G,0,.05,0,.06)),F.add(gt(7.2,.2,4.2,G,0,8.7,0,.06));for(let j of[3,6])F.add(gt(7,.1,.12,R,0,j,-2,.03)),F.add(gt(7,.1,.12,R,0,j,2,.03));for(let j=0;j<4;j++){let M=1.1+j*2,re=new Me;re.position.y=M,F.add(re),re.add(gt(6.8,.16,3.8,G,0,-.55,0,.05)),re.add(gt(.16,1.55,3.6,q,-3.2,0,0,.04)),re.add(gt(.16,1.55,3.6,q,3.2,0,0,.04)),re.add(gt(6.6,1.55,.16,W(10529976,{roughness:.38,metalness:.7}),0,0,-1.85,.04)),re.add(gt(6.2,.1,.1,W(9083048),0,.55,1.85,.03)),re.add(gt(6,.06,.06,Ge(5162176,{emissive:5162176,emissiveIntensity:.55}),0,.55,1.92,.02)),rt(re,6.6,3.6,.22,W(11056320),{t:.03,railH:.04,overhang:.02});for(let he=-1;he<=1;he++){let A=gt(.9,.7,.55,H,he*1.8,-.1,-1.5,.04);re.add(A);for(let J=0;J<4;J++)re.add(gt(.7,.04,.03,W(3817544),he*1.8,-.3+J*.14,-1.2,.01));let x=new k(new Re(.12,.12,.04,12),W(9080984));x.rotation.x=Math.PI/2,x.position.set(he*1.8,-.1,-1.2),re.add(x)}j!==0&&re.add(gt(5.5,.08,2.8,L,0,.05,0,.04));for(let he of[-1.55,-.52,.52,1.55]){re.add(gt(.78,.09,.72,W(13685980,{roughness:.36,metalness:.78}),he,.14,.05,.04)),re.add(gt(.62,.16,.56,z,he,.28,.05,.04)),re.add(gt(.56,.07,.48,W(4116420,{roughness:.34,metalness:.55,emissive:1940114,emissiveIntensity:.38}),he,.4,.05,.025));for(let A of[-.14,.14])re.add(gt(.06,.12,.06,W(3127470,{roughness:.3,metalness:.6,emissive:1940114,emissiveIntensity:.3}),he+A,.47,-.2,.02));re.add(gt(.55,.04,.08,W(12093520,{roughness:.3,metalness:.7,emissive:8413216,emissiveIntensity:.15}),he,.15,-.4,.02));for(let A of[-.28,.28])for(let x=0;x<4;x++){let J=x%2?3115602:4168260;re.add(gt(.12,.035,.36,Ge(J,{emissive:2783796,emissiveIntensity:.14}),he+A,.16+x*.038,.05,.015))}}for(let[he,A,x]of[[-.24,4116420,1940114],[-.36,2789064,1728152]]){let J=new k(new Re(.045,.045,4,10),W(A,{roughness:.32,metalness:.6,emissive:x,emissiveIntensity:.35,brush:!1}));J.rotation.z=Math.PI/2,J.position.set(0,.53,he),re.add(J)}for(let[he,A]of[[-1.55,-.52],[.52,1.55]])for(let x=0;x<6;x++)re.add(gt(.95,.04,.05,W(8015560,{roughness:.32,metalness:.65,emissive:5910184,emissiveIntensity:.22}),(he+A)/2,.22,-.2+x*.09,.015));for(let he=-5;he<=5;he++)re.add(gt(.09,.42,.72,W(3836506,{roughness:.4,metalness:.5,emissive:2779716,emissiveIntensity:.06}),he*.55,.35,1.1,.025));re.add(gt(6.2,.08,.08,Ge(5162176,{emissive:5162176,emissiveIntensity:.75}),0,.65,1.95,.02))}for(let j of[-1,1])for(let M of[1.5,2.5,3.5,4.5,5.5,6.5,7.5]){F.add(gt(.26,.26,3.4,W(2764856,{roughness:.5}),j*3.72,M,0,.05));for(let re=0;re<5;re++){let he=new k(new Re(.035,.035,.95,8),W(4870232));he.rotation.z=Math.PI/2,he.position.set(j*3.95,M,-1.2+re*.6),F.add(he)}F.add(gt(.12,.12,.12,W(13215820,{roughness:.3,metalness:.8,emissive:10518576,emissiveIntensity:.12}),j*3.85,M,1.55,.03))}{let j=[];for(let he of[-1,1])for(let A of[1.5,2.5,3.5,4.5,5.5,6.5,7.5])for(let[x,J]of[[-1.6,-.2],[0,1.4]])j.push(oh(new C(he*4.02,A,x),new C(he*4.02,A,J),.32,.04,14));F.add(new k(ah(j,!1),W(1974824,{roughness:.5,metalness:.35,brush:!1})));let M=W(6977672,{roughness:.35,metalness:.65,emissive:1713200,emissiveIntensity:.15,brush:!1}),re=W(13215820,{roughness:.28,metalness:.8,emissive:8411680,emissiveIntensity:.18,brush:!1});for(let he=0;he<4;he++){let A=1.1+he*2;for(let x=0;x<10;x++)F.add(gt(.42,.32,.05,M,-2.55+x*.567,A+.25,1.98,.015));for(let x of[-3.05,3.05])F.add(gt(.08,.9,.1,re,x,A,2,.03));F.add(gt(.07,.07,.04,Ge(6221962,{emissive:4120688,emissiveIntensity:.9}),2.75,A+.25,2.02,.01))}}E.position.y=1.15,g.position.set(0,1.35,0);let D=new Me;y.add(D),D.add(De(86,.25,54,W(3820120,{roughness:.55,metalness:.4,brush:!1}),0,-.15,0)),D.add(De(78,.08,5.5,W(8308932,{roughness:.45,metalness:.3,emissive:3844260,emissiveIntensity:.2,brush:!1}),0,.02,0));for(let j of[-18,-9,9,18])D.add(De(78,.06,2.2,W(13138e3,{roughness:.5,metalness:.25,emissive:10506288,emissiveIntensity:.12,brush:!1}),0,.02,j));let Z=W(5930700,{roughness:.4,metalness:.55,emissive:3825324,emissiveIntensity:.14,brush:!1}),te=W(5925506,{roughness:.42,metalness:.5,brush:!1}),ue=W(8030888,{roughness:.4,metalness:.55,brush:!1}),pe=W(14711354,{roughness:.38,metalness:.55,emissive:14711354,emissiveIntensity:.28,brush:!1}),se=Ge(5162176,{emissive:5162176,emissiveIntensity:.4}),X=5,$=9;for(let j=0;j<X;j++)for(let M=0;M<$;M++){if(j===2&&M===4)continue;let re=(M-($-1)/2)*7.4,he=(j-(X-1)/2)*9;for(let A of[-1.25,1.25])for(let x of[-.65,.65])D.add(De(.16,7.6,.16,Z,re+A,3.9,he+x));D.add(De(2.7,.14,1.5,Z,re,.18,he)),D.add(De(2.7,.14,1.5,Z,re,7.5,he));for(let A=0;A<5;A++){let x=.85+A*1.3;D.add(De(2.5,.09,1.4,te,re,x-.4,he)),D.add(De(2.35,.85,.07,ue,re,x,he-.62)),D.add(De(.07,.85,1.2,ue,re-1.15,x,he)),D.add(De(.07,.85,1.2,ue,re+1.15,x,he));for(let J of[-.65,.65])D.add(De(.7,.18,.55,pe,re+J,x-.22,he+.05)),D.add(De(.65,.05,.5,W(4116420,{roughness:.4,metalness:.45,emissive:1940114,emissiveIntensity:.2,brush:!1}),re+J,x-.34,he+.05));A%2===0&&D.add(De(2,.05,.05,se,re,x+.32,he+.72))}D.add(De(2,.08,.07,se,re,6.5,he+.78)),D.add(De(.14,6.8,.14,W(2764856,{roughness:.5,brush:!1}),re-1.42,3.6,he)),D.add(De(.14,6.8,.14,W(2764856,{roughness:.5,brush:!1}),re+1.42,3.6,he));for(let A=0;A<6;A++)D.add(De(.22,.12,.35,W(4870232,{roughness:.42,metalness:.55,brush:!1}),re-1.55,1+A*1.05,he+.15)),D.add(De(.55,.05,.05,W(13215820,{roughness:.32,metalness:.75,brush:!1}),re-1.85,1+A*1.05,he+.15));for(let A=0;A<4;A++)D.add(De(.08,5.5,.08,W(3819608,{roughness:.5,brush:!1}),re-.6+A*.4,3.2,he-.85))}for(let j=-4;j<=4;j++){D.add(De(84,.28,.28,W(11055264,{roughness:.4,metalness:.6,brush:!1}),0,9.6,j*5.5)),D.add(De(84,.14,.7,W(6975608,{roughness:.45,metalness:.5,brush:!1}),0,9.15,j*5.5+1.5));for(let M=-5;M<=5;M++)D.add(De(.18,.55,.18,W(3817544,{roughness:.5,brush:!1}),M*7.2,8.7,j*5.5+1.5))}for(let j of[-18,-9,0,9,18]){D.add(De(76,.12,.55,W(5922920,{roughness:.48,metalness:.45,brush:!1}),0,.12,j));for(let M=-6;M<=6;M++)D.add(De(.35,.08,.35,W(2764856,{roughness:.5,brush:!1}),M*5.5,.22,j))}for(let j of[-24,24])for(let M of[-32,-16,0,16,32])D.add(De(4.2,3,2,W(11581632,{roughness:.4,metalness:.55,brush:!1}),M,1.6,j)),D.add(De(1.1,.7,1.1,W(9080984,{roughness:.35,metalness:.7,brush:!1}),M,3.4,j)),D.add(De(3.5,.14,.14,Ge(5162176,{emissive:5162176,emissiveIntensity:.55}),M,2.6,j+(j>0?-1.1:1.1)));for(let j=0;j<8;j++){let M=(j-3.5)*7.4;D.add(De(.08,7.2,8.5,W(8030360,{roughness:.45,metalness:.35,opacity:.55,brush:!1}),M+3.5,3.8,0))}{let j=[],M=[],re=[],he=[],A=[],x=[];for(let V=0;V<X;V++)for(let ee=0;ee<$;ee++){if(V===2&&ee===4)continue;let fe=(ee-($-1)/2)*7.4,ye=(V-(X-1)/2)*9;for(let le=0;le<5;le++){let xe=.85+le*1.3,Te=ye+.69;j.push([fe,xe,Te]);for(let Ee=0;Ee<8;Ee++)M.push([fe-.98+Ee*.28,xe+.06,Te+.03]);re.push([fe+1,xe+.3,Te+.04]),(V+ee+le)%3===0&&he.push([fe+.86,xe+.3,Te+.04]),A.push([fe-1.08,xe,Te+.06]),A.push([fe+1.08,xe,Te+.06])}let ae=Math.round(ye/5.5)*5.5+1.5;for(let le of[-.7,.7])x.push(oh(new C(fe+le,7.6,ye-.3),new C(fe+le*1.6,9.1,ae),-.45,.07,10));ee<$-1&&!(V===2&&ee===3)&&x.push(oh(new C(fe+1.3,7.3,ye-.5),new C(fe+7.4-1.3,7.3,ye-.5),.9,.055,12))}Xr(D,j,2.3,1,.05,W(2765376,{roughness:.45,metalness:.5,brush:!1})),Xr(D,M,.2,.62,.04,W(9083566,{roughness:.35,metalness:.6,emissive:2767438,emissiveIntensity:.2,brush:!1})),Xr(D,re,.09,.09,.04,Ge(6221962,{emissive:4120688,emissiveIntensity:.9})),Xr(D,he,.09,.09,.04,Ge(16756800,{emissive:16748576,emissiveIntensity:.9})),Xr(D,A,.07,.7,.08,W(13215820,{roughness:.3,metalness:.75,emissive:8413216,emissiveIntensity:.15,brush:!1}));let J=ah(x,!1);D.add(new k(J,W(2238511,{roughness:.55,metalness:.3,brush:!1})))}let me=ty(D,{minDim:.3,color:1581098,opacity:.5}),ge=new Me;y.add(ge);let _e=Nt(14868698),Ye=Nt(13157564),dt=Nt(11578532);ge.add(De(108,28,1.6,_e,0,14,-40)),ge.add(De(1.6,28,82,_e,-54,14,0)),ge.add(De(1.6,28,22,_e,54,14,-30)),ge.add(De(28,28,1.6,_e,-40,14,40)),ge.add(De(1.2,28,1.2,dt,54,14,-19)),ge.add(De(1.2,28,1.2,dt,-26,14,40)),ge.add(De(70,1,36,Ye,-18,28.2,-22)),ge.add(De(36,1,28,Ye,-36,28.2,12));for(let j=0;j<6;j++)ge.add(De(.8,1.6,48,Nt(10131086),-6+j*14,28.2,4));for(let j=0;j<9;j++){let M=-48+j*12;ge.add(De(9,4.2,7,W(11581632,{roughness:.4,metalness:.55,brush:!1}),M,31.2,-12)),ge.add(De(2.5,2.6,2.5,W(9080984,{roughness:.35,metalness:.7,brush:!1}),M-2.3,34.2,-12)),ge.add(De(2.5,2.6,2.5,W(9080984,{roughness:.35,metalness:.7,brush:!1}),M+2.3,34.2,-12)),ge.add(De(8,.3,.3,Ge(5162176,{emissive:5162176,emissiveIntensity:.35}),M,33.2,-8.2))}for(let j=0;j<6;j++){let M=-36+j*14;ge.add(De(5,8,5,W(10134445,{roughness:.42,metalness:.5,brush:!1}),M,32.5,18)),ge.add(De(3.5,1.2,3.5,W(8028810,{roughness:.4,metalness:.6,brush:!1}),M,37.2,18))}for(let j=0;j<7;j++)ge.add(De(6,5.5,4.2,W(6975608,{roughness:.4,metalness:.6,brush:!1}),-62,2.6,-30+j*11)),ge.add(De(1.3,3.2,1.3,W(4870232,{roughness:.4,metalness:.65,brush:!1}),-62,7,-30+j*11)),ge.add(De(.4,4,.4,W(13215820,{roughness:.35,metalness:.8,brush:!1}),-58,4,-30+j*11));for(let j=0;j<4;j++)ge.add(De(10,4,5,W(5924984,{roughness:.4,metalness:.55,brush:!1}),68,2.2,-20+j*14)),ge.add(De(3,2.5,3,W(3819608,{roughness:.4,metalness:.6,brush:!1}),68,5.5,-20+j*14));for(let j=0;j<20;j++)ge.add(De(.35,3.5,.35,W(6975592,{roughness:.5,brush:!1}),-75+j*8,1.6,55));ge.add(De(160,.3,120,Nt(6975592),0,-.4,0)),ge.add(De(40,.2,20,Nt(12107944),70,-.2,30));for(let j=0;j<5;j++)for(let M=0;M<14;M++)ge.add(De(5.2,2.4,.35,Nt(10402e3,{emissive:8035e3,emissiveIntensity:.1}),-48+M*7.2,4.5+j*4.8,-40.6));ge.add(De(18,.5,8,Nt(11055264),20,8,44)),ge.add(De(.6,8,.6,dt,12,4,44)),ge.add(De(.6,8,.6,dt,28,4,44)),l=_t([{obj:g,delay:0,drop:.25,fromScale:.7},{obj:E,delay:.2,drop:.2,fromScale:.85}],{dur:.9});let Je=new Pt({color:1974822,transparent:!0,opacity:.4});[g,E,F].forEach(j=>j.traverse(M=>{if(!(!M.isMesh||!M.geometry))try{M.add(new Dt(new Ot(M.geometry,26),Je.clone()))}catch{}})),h.label('<span class="c-orange">die</span>',()=>r<.9?new C(g.position.x,g.position.y+.55,g.position.z):null,""),h.label("DGX server",()=>r>.55&&r<1.42?new C(0,E.position.y+1.2,0):null,""),h.label("rack",()=>r>1.42&&r<2.45?new C(0,11.2,0):null,""),h.label("GPU hall",()=>r>2.4&&r<3.55?new C(0,8,22):null,""),h.label("building \xB7 150 MW",()=>r>3.4?new C(0,34,0):null,"");function et(j){let M=gi(Math.floor(j),0,c.length-2),re=ey(j-M),he=M===1?Math.pow(re,.22):M===0?Math.pow(re,.35):re,A=M===1?Math.pow(re,.28):M===0?Math.pow(re,.4):re,x=Math.exp(Mn(Math.log(c[M].dist),Math.log(c[M+1].dist),he)),J=Mn(c[M].y,c[M+1].y,A),V=Mn(c[M].pitch,c[M+1].pitch,re);return M===0&&re>=.25&&(x=Math.max(x,Mn(c[M].dist,c[M+1].dist,Math.max(.55,re*.95))),J=Math.max(J,Mn(c[M].y,c[M+1].y,.55)),V=Math.min(V,Mn(c[M].pitch,c[M+1].pitch,.85))),M===1&&re>=.4&&(x=Math.max(x,Mn(c[M].dist,c[M+1].dist,.92)),J=Math.max(J,Mn(c[M].y,c[M+1].y,.7)),V=Math.min(V,Mn(c[M].pitch,c[M+1].pitch,.9))),{dist:x,y:J,pitch:V,yaw:Mn(c[M].yaw,c[M+1].yaw,re)}}let tt=c[1].yaw;function Q(j=!1){let M=et(r);u.dist=M.dist,u.pitch=M.pitch,j&&(tt=M.yaw,u.yaw=tt);let re=r<.5?Mn(g.position.y+.15,M.y,r/.5):M.y;f.set(0,re,0),h.invalidate()}function we(){let j=r;g.visible=j<1.5,g.scale.setScalar(j<1?1:Mn(1,.4,gi((j-1)/.45,0,1))),E.visible=j<2.5;let M=j<.35?Mn(.35,1,j/.35):gi(1-(j-2)/.45,.15,1);_.material.transparent=M<.99,_.material.opacity=M,F.visible=j>1.28&&j<3.4,F.traverse(A=>{if(!A.isMesh)return;let x=gi((j-1.28)/.22,0,1);A.material.transparent=x<.99,A.material.opacity=x,A.visible=x>.02}),D.visible=j>2.25;let re=gi((j-2.25)/.45,0,1);D.traverse(A=>{A.isMesh&&(A.material.transparent=re<.99,A.material.opacity=Math.max(.25,re))}),me.material.opacity=me.userData.ink*re,ge.visible=j>3.05;let he=gi((j-3.05)/.45,0,1);ge.traverse(A=>{if(!A.isMesh)return;A.material.transparent=he<.99;let x=A.position.y>26;A.material.opacity=Math.max(x?.55:.85,he)}),j>3.5&&(D.visible=!0,D.traverse(A=>{A.isMesh&&(A.material.transparent=!1,A.material.opacity=1)})),m.material.transparent=!0,m.visible=j>3.2,m.material.opacity=j>3.2?gi((j-3.2)/.5,.2,1):0}function je(j=!0){if(Q(),we(),j){let M=gi(Math.round(r),0,Bi.length-1),re=Bi[M],he=Bi[Math.min(Bi.length-1,M+1)];qe.innerHTML=`<b>${re.name[0].toUpperCase()+re.name.slice(1)}</b>: <b>${Ad(re.W)}</b> \xB7 ${re.note}. ${M<Bi.length-1?`Pull out toward <span class="c-orange">${he.name}</span> (${Ad(he.W)}).`:"Site power is the utility figure, not a sum of dies."}`}h.invalidate()}let nt=t.controls(i);t.slider(nt,{label:"Zoom",name:"zoom",min:0,max:Bi.length-1,step:.01,value:r,color:n.heat,fmt:j=>Bi[gi(Math.round(j),0,Bi.length-1)].key,oninput:j=>{a=null,r=j,Q(!0),we(),je()}});let qe=t.readout(i);return t.hint(i,"drag to turn \xB7 Zoom: die \u2192 building"),je(),h.ready(),!0}var Cd=20,Id=250,ml=.14,ny=.5,Pd=.94,iy=(ny-ml)/(Pd-ml);function Ld(i,e){let t=e.ui,n=t.C,s=se=>se<560,r=-4,a=!0,o=null,l=[],c=()=>a?Math.max(0,r+Id/Cd)**1.5/(Id/Cd)**1.5:0,h=xt(i,{ui:t,label:"A vacuum triode in three dimensions: electrons leave a hot cathode; the grid voltage lets them through to the plate or turns them back. Drag sideways to turn the tube.",height:se=>s(se)?Math.round(Math.max(300,se*.9)):Math.round(Math.min(400,se*.5)),radius:1.7,radiusY:2.05,yaw:.55,pitch:.22,target:new C(0,.95,0),fitPadY:1.32,fitPadX:1.08,fov:34,busy:()=>a||o&&!o.done,onShow(){o?.arm(),h&&h.invalidate()},step(se){o&&!o.done&&o.tick(se);let X=a?90*se:0;for(let $=0;$<X;$++)l.length<140&&l.push({a:Math.random()*Math.PI*2,y:.64+Math.random()*.34,t:0,pass:Math.random()<c()/1.6,v:.55+Math.random()*.35,turn:iy*Math.max(.12,1+Math.min(0,r)/22)*(.8+Math.random()*.25),back:!1});for(let $ of l)!$.pass&&!$.back&&$.t>=$.turn&&($.back=!0),$.t+=$.v*se*($.back?-1.15:1);for(let $=l.length-1;$>=0;$--)(l[$].t>1.05||l[$].t<-.02)&&l.splice($,1);return D(),a}});if(!h)return!1;let{scene:d}=h;yt(d,{hemi:.42,keyI:1.85,fillI:.22,rimI:.75,sky:16769216,ground:4864040,keyPos:[4,5,5],fillPos:[-4,2,-2],envI:.42,glintI:.7,glintPos:[7,6,2]});let u=new Me;d.add(u);let f=new k(new Re(1.2,1.2,2.2,48,1,!0),di(12112096,{opacity:.07}));f.position.y=.95,u.add(f);let m=new k(new Ze(1.2,36,18,0,Math.PI*2,0,Math.PI/2),di(12112096,{opacity:.08}));m.position.y=2.05,u.add(m);let y=new k(new Re(1.25,1.35,.38,40),Yt(9070656,{brushAxis:"circ",metalness:.58,roughness:.28,brushStrength:1.4,clearcoat:.35,envMapIntensity:.4}));y.position.y=-.25,u.add(y),Ws(u,1.28,.045,-.05,Yt(13148256,{emissiveIntensity:.22,clearcoat:.4,envMapIntensity:.45})),Ws(u,1.18,.03,1.75,W(12635352,{roughness:.25,metalness:.7,clearcoat:.4,opacity:.75}));for(let se=0;se<10;se++){let X=se/10*Math.PI*2,$=new k(new Re(.055,.05,.42,10),Yt(13936736,{emissiveIntensity:.28,clearcoat:.5,brushStrength:1.2}));$.position.set(Math.cos(X)*.72,-.58,Math.sin(X)*.72),u.add($);let me=new k(new Ze(.05,10,8),W(15253624,{roughness:.18,metalness:.95,clearcoat:.6}));me.position.set(Math.cos(X)*.72,-.8,Math.sin(X)*.72),u.add(me)}let g=Ge(14711354,{emissive:14711354,emissiveIntensity:.6}),p=new k(new Re(.14,.14,1,18),g);p.position.y=.5,u.add(p);let w=new Me;u.add(w);let P=W(5935060,{roughness:.35,metalness:.7,emissive:3438800,emissiveIntensity:.18});for(let se=0;se<14;se++){let X=new k(new Lt(.5,.016,8,40),P);X.rotation.x=Math.PI/2,X.position.y=.18+se*.1,w.add(X)}for(let se of[-.5,.5]){let X=new k(new Re(.018,.018,1.35,8),P);X.position.set(se,.7,0),w.add(X)}let v=Yt(14196816,{cleanHex:14197792,brushAxis:"circ",emissiveIntensity:.34,brushStrength:2.1,clearcoat:.6,clearcoatRoughness:.12,envMapIntensity:.7,side:Ut}),b=Yt(15253624,{cleanHex:14725168,emissive:12093488,emissiveIntensity:.28,clearcoat:.65,clearcoatRoughness:.1,brushStrength:1.9,envMapIntensity:.72}),E=Math.PI*.2,I=Math.PI*1.6,_=new Me;_.rotation.y=.55,u.add(_);let S=new k(new Re(1.05,1.05,1.35,48,1,!1,E,I),v);S.position.y=1.25,_.add(S);let N=new k(new Re(.94,.94,1.28,40,1,!0,E,I),Yt(9070656,{metalness:.55,roughnessIntensity:.12,envMapIntensity:.4,brushStrength:.8}));N.position.y=1.25,_.add(N);for(let se of[E,E+I]){let X=new k(new ve(.07,1.32,.12),b);X.position.set(Math.sin(se)*1,1.25,Math.cos(se)*1),X.rotation.y=se,_.add(X)}for(let[se,X]of[[1.9,1.15],[.6,1.12]]){let $=new k(new Re(X,X,.1,40,1,!1,E,I),b);$.position.y=se,_.add($)}let B=new k(new Re(1.1,1.05,.12,40,1,!1,E,I),b);B.position.y=1.95,_.add(B);for(let se of[Math.PI*.55,Math.PI*1,Math.PI*1.45]){let X=new k(jt(.05,1.18,.16,.018),b);X.position.set(Math.sin(se)*1.12,1.25,Math.cos(se)*1.12),X.rotation.y=se,_.add(X)}let O=_,F=Ge(15260872,{transparent:!0,opacity:.7});for(let se of[.12,1.85]){let X=new k(new Re(.85,.85,.035,28),F);X.position.y=se,u.add(X)}let R=new k(new Ze(.48,20,14,0,Math.PI*1.1,0,Math.PI*.55),W(13160664,{shininess:95,specular:16777215,opacity:.5}));R.position.set(.4,1.7,.25),u.add(R);let U=new k(new Lt(.06,.012,6,16),Ge(16764006,{emissive:16755251,emissiveIntensity:.7}));U.position.y=.55,U.rotation.x=Math.PI/2,u.add(U);let G=new k(new Lt(.96,.02,8,40),Ge(11059408,{transparent:!0,opacity:.35}));G.rotation.x=Math.PI/2,G.position.y=2,u.add(G);let q=new Pt({color:5914672,transparent:!0,opacity:.3});try{y.add(new Dt(new Ot(y.geometry,28),q.clone()))}catch{}u.traverse(se=>{if(!se.isMesh||!se.geometry||!se.material||se===y)return;let X=se.material;if(X.metalness>.4&&(X.emissiveIntensity||0)>.05)try{se.add(new Dt(new Ot(se.geometry,28),q.clone()))}catch{}});let H=new Ze(.03,6,6),L=Ge(3832020,{emissive:3832020,emissiveIntensity:.55}),z=[];for(let se=0;se<140;se++){let X=new k(H,L);X.visible=!1,u.add(X),z.push(X)}h.label('<span class="c-blue">grid</span>',()=>new C(.75,.85,0),"");function D(){g.emissiveIntensity=a?.55+.25*Math.sin(performance.now()/200):.02,g.color.setHex(a?14711354:6971480);for(let se=0;se<z.length;se++){let X=z[se],$=l[se];if(!$){X.visible=!1;continue}X.visible=!0;let me=ml+$.t*(Pd-ml);X.position.set(Math.cos($.a)*me,$.y,Math.sin($.a)*me)}h.invalidate()}function Z(){let se=c();ue.innerHTML=a?se===0?`<span class="c-blue">Grid</span> <b>${String(r).replace("-","\u2212")} V</b> turns every electron back \u2014 tube off.`:`<span class="c-blue">Grid</span> <b>${String(r).replace("-","\u2212")} V</b> \xB7 plate current <b>${Math.round(se*100)}%</b> of 0 V.`:'Heater off: no electrons leave the <span class="c-orange">cathode</span>.',D()}let te=t.controls(i);t.slider(te,{label:"Grid",name:"vg",min:-20,max:2,step:.5,value:r,color:n.compute,fmt:se=>`${se} V`,oninput:se=>{r=se,Z()}}),t.button(te,"Heater on / off",()=>{a=!a,Z()},{name:"tr3-heat"});let ue=t.readout(i);t.hint(i,'drag to turn \xB7 <span class="c-orange">cathode</span> \xB7 <span class="c-blue">grid</span> \xB7 plate \xB7 pull Grid negative to cut'),Z();let pe=_t([{obj:y,delay:0,drop:.2},{obj:p,delay:.12,drop:.25},{obj:w,delay:.28,drop:.22},{obj:O,delay:.42,drop:.28},{obj:f,delay:.55,drop:.15}],{dur:1});return o=pe,pe.arm(),h.ready(),!0}var sy=(i,e,t)=>Math.max(e,Math.min(t,i)),Dd={rho:997,cp:4180};function gl(i,e,t,n,s,r,a,o){let l=new k(new ve(e,t,n),s);return l.position.set(r,a,o),i.add(l),l}function xi(i,e,t,n,s=.13){let r=new C().subVectors(t,e),a=r.length(),o=new k(new Re(s,s,a,16),W(n,{roughness:.32,metalness:.65,emissive:n,emissiveIntensity:.18}));return o.position.copy(e).add(t).multiplyScalar(.5),o.quaternion.setFromUnitVectors(new C(0,1,0),r.clone().normalize()),i.add(o),o}function Nd(i,e){let t=e.ui,n=t.C,s=Z=>Z<560,r=40.8,a=50,o=[],l=()=>a/6e4*Dd.rho,c=()=>r*1e3/(l()*Dd.cp),h,d=null,u=[],f=xt(i,{ui:t,label:"A cold plate over a hot die with inlet and outlet pipes. Water carries the heat; outlet rise follows \u0394T = P / (\u1E41 c). Drag sideways to turn.",height:Z=>s(Z)?Math.round(Math.max(300,Z*.9)):Math.round(Math.min(400,Z*.5)),radius:3.35,radiusY:1.95,yaw:-.42,pitch:.48,target:new C(0,.42,0),fitPad:1.28,busy:()=>!0,onShow(){d?.arm(),f&&f.invalidate()},step(Z){d&&d.tick(Z);let te=.28+a*.007,ue=5,pe=(7+a*.18)*Z;for(let $=0;$<pe;$++)o.length<60&&o.push({u:-.04-Math.random()*.06,lane:Math.floor(Math.random()*ue)});for(let $ of o)$.u+=te*Z*(.92+$.lane%3*.04);for(let $=o.length-1;$>=0;$--)o[$].u>1.08&&o.splice($,1);let se=sy(c()/25,0,1),X=$=>-.48+$*.24;for(let $=0;$<u.length;$++){let me=u[$],ge=o[$];if(!ge){me.visible=!1;continue}me.visible=!0,me.position.set(-1.05+ge.u*2.1,.56,X(ge.lane));let _e=Math.max(0,(ge.u-.4)/.55)*se;me.material.color.setRGB(.18+.75*_e,.88-.45*_e,.82-.72*_e),me.material.opacity=1;let Ye=.9+.18*Math.sin(ge.u*8+ge.lane);me.scale.setScalar(Ye)}return h&&(h.material.emissiveIntensity=.45+.35*Math.min(1,r/100)+.1*Math.sin(performance.now()/160)),!0}});if(!f)return!1;let{scene:m}=f;yt(m,{hemi:.88,keyI:1.4,fillI:.35,rimI:.5,envI:.9,glintI:.45});let y=new Me;m.add(y);let g=Oe(4.6,.1,3,fi(14474456),.04);g.position.set(0,0,0),y.add(g),rt(y,4.5,2.9,.07,W(11842736),{t:.035,railH:.05,overhang:.03});for(let Z=-4;Z<=4;Z++){let te=new k(new ve(4,.012,.035),W(12886112,{roughness:.4}));te.position.set(0,.06,Z*.28),y.add(te)}let p=new Me;y.add(p),h=Oe(1.5,.16,1.5,Ge(14711354,{emissive:16736288,emissiveIntensity:.7,shininess:50}),.045),h.position.set(0,.18,.25),p.add(h),rt(p,1.5,1.5,.25,W(15769696),{t:.025,railH:.035,overhang:.015});let w=new k(new Ze(.95,20,16),Ge(16736288,{opacity:.1,emissive:16728080,emissiveIntensity:.4,shininess:5}));w.position.set(0,.22,.25),p.add(w);for(let Z=-2;Z<=2;Z++)for(let te=-2;te<=2;te++){if(Math.abs(Z)+Math.abs(te)<1)continue;let ue=new k(new Re(.04,.04,.02,8),W(14205040));ue.position.set(Z*.22,.25,.15+te*.22),p.add(ue)}let P=Oe(1.55,.04,1.55,Ge(8947840),.02);P.position.set(0,.28,.1),y.add(P);let v=new Me;y.add(v);let b=W(12109008,{roughness:.28,metalness:.85,brushStrength:1.1}),E=W(10136504,{roughness:.35}),I=Oe(2.6,.1,2,b,.04);I.position.set(0,.36,0),v.add(I);let _=Oe(.14,.42,2,b,.03);_.position.set(-1.25,.52,0),v.add(_);let S=Oe(.14,.42,2,b,.03);S.position.set(1.25,.52,0),v.add(S);let N=Oe(2.6,.42,.14,b,.03);N.position.set(0,.52,-.95),v.add(N);let B=Oe(2.4,.08,.12,b,.02);B.position.set(0,.38,.95),v.add(B);for(let[Z,te,ue]of[[-1.32,.04,2.05],[1.32,.04,2.05]]){let pe=new k(new ve(te,.06,ue),W(10531008));pe.position.set(Z,.74,0),v.add(pe)}for(let[Z,te,ue]of[[-1.02,2.6,.04]]){let pe=new k(new ve(te,.06,ue),W(10531008));pe.position.set(0,.74,Z),v.add(pe)}let O=[-.48,-.24,0,.24,.48];for(let Z=0;Z<O.length-1;Z++){let te=(O[Z]+O[Z+1])/2;gl(v,2.15,.16,.05,Yt(13138496,{metalness:.6,emissiveIntensity:.16,brushStrength:1,envMapIntensity:.35}),0,.5,te)}for(let Z of O)gl(v,2.1,.035,.18,Yt(13666896,{metalness:.55,emissiveIntensity:.18,brushStrength:1.2,envMapIntensity:.4}),0,.42,Z);{let Z=Oe(2.35,.03,.28,W(11582664,{roughness:.3,opacity:.35}),.015);Z.position.set(0,.74,-.7),v.add(Z)}gl(v,.18,.28,.9,W(9083560),-1.05,.55,0),gl(v,.18,.28,.9,W(9083560),1.05,.55,0);for(let[Z,te]of[[-1.15,-.85],[1.15,-.85],[-1.15,.85],[1.15,.85]]){let ue=new k(new Re(.05,.05,.1,10),W(6975608));ue.position.set(Z,.78,te),v.add(ue)}let F=new Me;y.add(F),xi(F,new C(-1.95,.62,.3),new C(-1.15,.62,.3),1940114,.17),xi(F,new C(-1.95,.62,.3),new C(-1.95,.62,-.85),1940114,.17),xi(F,new C(-1.95,.62,-.85),new C(-1.95,.2,-.85),1940114,.17),xi(F,new C(1.15,.62,.3),new C(1.95,.62,.3),14513188,.17),xi(F,new C(1.95,.62,.3),new C(1.95,.62,-.85),14513188,.17),xi(F,new C(1.95,.62,-.85),new C(1.95,.2,-.85),14513188,.17),xi(F,new C(-1,.34,1.15),new C(1,.34,1.15),2795684,.1),xi(F,new C(-1,.34,1.15),new C(-1,.34,.65),2795684,.1),xi(F,new C(1,.34,1.15),new C(1,.34,.65),2795684,.1);for(let Z of[-1.45,-1.75,1.45,1.75]){let te=new k(new Lt(.18,.03,8,16),W(9080984));te.rotation.y=Math.PI/2,te.position.set(Z,.62,.3),F.add(te)}let R=new k(new Ze(.2,14,14),W(1940114,{roughness:.3,metalness:.7,emissive:1940114,emissiveIntensity:.25}));R.position.set(-1.15,.62,.3),F.add(R);let U=new k(new Ze(.2,14,14),W(14513188,{roughness:.3,metalness:.7,emissive:14513188,emissiveIntensity:.25}));U.position.set(1.15,.62,.3),F.add(U);let G=new Pt({color:2829098,transparent:!0,opacity:.2});y.traverse(Z=>{if(!Z.isMesh||!Z.geometry)return;let te=Z.geometry.type;if(!(te==="SphereGeometry"||te==="CylinderGeometry"))try{Z.add(new Dt(new Ot(Z.geometry,28),G.clone()))}catch{}});let q=new Ze(.055,12,12);u=[];for(let Z=0;Z<80;Z++){let te=new k(q,new sn({color:4116420,transparent:!1,opacity:1,depthWrite:!0}));te.visible=!1,y.add(te),u.push(te)}for(let Z=0;Z<5;Z++)for(let te=0;te<4;te++)o.push({u:(te+.35)/4.5+Z%2*.05,lane:Z});f.label('<span class="c-cyan">in</span>',()=>new C(-2,1.05,.35),""),f.label('<span class="c-orange">out</span>',()=>new C(2,1.05,.35),"");let H=t.controls(i),L=t.readout(i);function z(){let Z=c();L.innerHTML=`Heat load <b>${r>=1?r.toFixed(1)+" kW":Math.round(r*1e3)+" W"}</b> \xB7 flow <b>${a} L/min</b> \u2192 outlet \u0394T <b>${Z<10?Z.toFixed(1):Math.round(Z)} \xB0C</b> (model P = \u1E41 c \u0394T).`,f.invalidate()}t.slider(H,{label:"Heat load",name:"kw",min:.7,max:120,step:.1,value:r,color:n.heat,fmt:Z=>Z>=1?`${+Z.toPrecision(3)} kW`:`${Math.round(Z*1e3)} W`,oninput:Z=>{r=Z,z()}}),t.slider(H,{label:"Flow",name:"lpm",min:5,max:120,step:1,value:a,color:n.cyan,fmt:Z=>`${Z} L/min`,oninput:Z=>{a=Z,z()}}),t.hint(i,'drag to turn \xB7 <span class="c-orange">die</span> glow under open plate \xB7 raise heat or slow the flow'),z();let D=_t([{obj:p,delay:0,drop:.18},{obj:v,delay:.12,drop:.28}],{dur:.85});return d=D,D.arm(),f.view.dist<7&&(f.view.dist=7),f.ready(),!0}function Ft(i,e={}){return e.metal?W(i,e):Ge(i,{shininess:e.shininess??36,specular:e.specular??5592405,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,opacity:e.opacity??1})}function ti(i,e,t,n,s,r,a,o){let l=new k(new ve(e,t,n,1,1,1),s);return l.position.set(r,a,o),i.add(l),l}function Ud(i,e){let t=e.ui,n=t.C,s=H=>H<560,r=10,a=.42,o=null,l=null,c=[],h=[],d=xt(i,{ui:t,label:"A GPU package in three dimensions: logic die, HBM stacks beside it, NVLink pads at the edge. A pulse follows the path a number travels. Drag sideways to turn.",height:H=>s(H)?Math.round(Math.max(300,H*.9)):Math.round(Math.min(420,H*.52)),radius:2.85,radiusY:1.85,yaw:-.72,pitch:.42,target:new C(0,.35,0),fitPad:1.2,fov:30,busy:()=>!0,onShow(){o?.arm(),d&&d.invalidate()},step(H){try{if(o&&o.tick(H),!l)return!0;let L=Number(H)||.016;a=(a+L*.32)%1,Number.isFinite(a)||(a=0);let z=a,D=h;if(!D||D.length<2)return!0;let Z=D.length-1,te=z*Z,ue=Math.max(0,Math.min(Z-1,Math.floor(te))),pe=te-ue,se=D[ue],X=D[ue+1];if(!se||!X)return!0;l.position.set(se.x+(X.x-se.x)*pe,se.y+(X.y-se.y)*pe,se.z+(X.z-se.z)*pe),l.material.emissiveIntensity=.45+.35*Math.sin(a*Math.PI*2);let $=ue===2;for(let me=0;me<c.length;me++)c[me].emissiveIntensity=$?.22:.06}catch{}return!0}});if(!d)return!1;let{scene:u}=d;yt(u,{hemi:1.45,keyI:1.25,fillI:.5,rimI:.35});let f=new Me;u.add(f);let m=Oe(4.6,.14,4,Ft(14210248),.06);m.position.set(0,0,0),f.add(m);let y=Oe(4.4,.07,3.8,W(13684942,{roughness:.4,metalness:.55}),.05);y.position.set(0,.1,0),f.add(y);let g=Oe(4.5,.04,3.9,W(12632254,{roughness:.35}),.04);g.position.set(0,.15,0),f.add(g),rt(f,4.5,3.9,.17,W(11842736),{t:.035,railH:.05,overhang:.03});let p=new Me;f.add(p);let w=Oe(2,.16,2,Ft(5935060,{emissive:3438800,emissiveIntensity:.14}),.045);w.position.set(0,.3,0),p.add(w);let P=Oe(1.92,.04,1.92,Ft(6988e3),.03);P.position.set(0,.4,0),p.add(P);for(let H=-3;H<=3;H++)for(let L=-3;L<=3;L++)Math.abs(H)+Math.abs(L)>5||ti(p,.18,.025,.18,Ft(4882372),H*.24,.43,L*.24);let v=new k(new Ze(.12,18,18),Ft(15255626,{emissive:15255626,emissiveIntensity:.55}));v.position.set(0,.55,0),f.add(v);let b=new Me;f.add(b),ti(b,1.6,.09,.45,Ft(10276714,{emissive:7317562,emissiveIntensity:.1}),0,.44,.7),rt(b,1.6,.45,.5,W(7909448),{t:.02,railH:.035,overhang:.015});for(let H=-3;H<=3;H++){let L=new k(new ve(.16,.04,.28),Ft(3115618));L.position.set(H*.22,.5,.7),b.add(L)}rt(f,2,2,.42,W(4882372),{t:.035,railH:.05,overhang:.025});let E=Ft(14205040,{emissive:11575360,emissiveIntensity:.12,metal:!0});for(let H=-4;H<=4;H++)for(let L=-4;L<=4;L++){if(Math.abs(H)+Math.abs(L)<2||(Math.abs(H)+Math.abs(L))%2===0)continue;let z=new k(new Re(.035,.035,.025,8),E);z.position.set(H*.18,.455,L*.18),f.add(z)}function I(H){let L=new Me;L.position.set(H,.22,0),f.add(L);let z=12;for(let D=0;D<z;D++){let Z=D%3===0?8962121:D%3===1?9750616:10670184,te=Ft(Z,{emissive:1927752,emissiveIntensity:.06});c.push(te);let ue=new k(new ve(.58,.055,1.55),te);if(ue.position.y=D*.068,L.add(ue),D<z-1){let pe=new k(new ve(.54,.012,1.48),Ft(13686992));if(pe.position.y=D*.068+.034,L.add(pe),D%2===0){let se=new k(new ve(.5,.008,1.4),W(12886112));se.position.y=D*.068+.04,L.add(se)}}}ti(L,.52,.04,1.45,Ft(8947840),0,-.06,0),ti(L,.54,.03,1.48,Ft(3844210),0,z*.068,0),rt(L,.58,1.55,z*.068+.02,W(7317562),{t:.025,railH:.04,overhang:.02}),ti(L,.02,z*.068,1.52,Ft(7317562),.3,z*.034,0),ti(L,.02,z*.068,1.52,Ft(7317562),-.3,z*.034,0);for(let D=-1;D<=1;D++)for(let Z=-2;Z<=2;Z++){let te=new k(new Ze(.03,8,8),W(14205040));te.position.set(D*.15,z*.068+.04,Z*.22),L.add(te)}return L}let _=I(-1.55),S=I(1.55),N=new Me;f.add(N),ti(N,3.4,.05,.58,Ft(5916792),0,.1,1.72),rt(N,3.4,.58,.14,W(6969488),{t:.03,railH:.045,overhang:.02});for(let H=-7;H<=7;H++)ti(N,.16,.09,.4,Ft(9071316,{emissive:6965940,emissiveIntensity:.16}),H*.22,.16,1.72),ti(N,.13,.03,.08,Ft(14205040,{emissive:11575360,emissiveIntensity:.2}),H*.22,.22,1.9);for(let H of[-1.55,1.55])for(let L=0;L<12;L++){let z=new k(new Re(.022,.022,.7,8),W(12886112));z.position.set(H+L%3*.1-.1,.5,-.55+Math.floor(L/3)*.28),f.add(z)}let B=Ft(12886112,{emissive:10780736,emissiveIntensity:.08});for(let H=-9;H<=9;H++)for(let L=-7;L<=7;L++){if((Math.abs(H)+Math.abs(L))%2===1||Math.abs(H)<2&&Math.abs(L)<2)continue;let z=new k(new Ze(.048,10,10),B);z.position.set(H*.28,-.1,L*.28),f.add(z)}for(let H=0;H<40;H++){let L=H/40*Math.PI*2,z=2.2,D=new k(new Re(.025,.025,.09,8),Ft(12886112));D.position.set(Math.cos(L)*z*.95,.05,Math.sin(L)*z*.85),f.add(D)}for(let H=-4;H<=4;H++)ti(f,.04,.02,3.2,Ft(11055296),H*.45,.17,0);let O=new Pt({color:2829098,transparent:!0,opacity:.12});f.traverse(H=>{if(!(!H.isMesh||!H.geometry||H.geometry.type==="SphereGeometry"||H.geometry.type==="CylinderGeometry"))try{H.add(new Dt(new Ot(H.geometry,28),O.clone()))}catch{}}),l=new k(new Ze(.09,14,14),Ft(14711354,{emissive:14711354,emissiveIntensity:.6})),f.add(l),h.push(new C(0,.55,0),new C(0,.42,.55),new C(1.55,.55,0),new C(0,.12,1.55));let F=Ft(14205040,{emissive:11575360,emissiveIntensity:.15});for(let H=-3;H<=3;H++)for(let L=-2;L<=2;L++){if(Math.abs(H)+Math.abs(L)<1)continue;let z=new k(new Re(.04,.04,.03,8),F);z.position.set(H*.22,.72,L*.22),f.add(z)}d.label('<span class="c-green">HBM</span>',()=>new C(1.55,1.1,0),""),d.label('<span class="c-violet">NVLink</span>',()=>new C(0,.38,2.05),"",!0);let R=t.controls(i),U=t.readout(i);function G(){let H=4.6000000000000005,L=640/r,z=H+L;U.innerHTML=`Path: register \u2192 <b class="c-green">SRAM (5 pJ)</b> \u2192 <b class="c-green">HBM/DRAM (640 pJ)</b> \u2192 NVLink (900 GB/s). Horowitz 45 nm via Han et al. Reuse <b>${r}\xD7</b> \u2192 ~<b>${+(H+L).toPrecision(3)} pJ</b> per multiply-add; <b>${Math.round(L/z*100)}%</b> is moving data.`,d.invalidate()}t.slider(R,{label:"Reuse",name:"reuse",min:1,max:1e3,step:1,value:r,color:n.memory||n.cyan||"#2f8a62",fmt:H=>`${H}\xD7`,oninput:H=>{r=Math.round(H),G()}}),t.hint(i,"drag to turn \xB7 raise reuse to cut memory\u2019s share of each multiply-add"),G();let q=_t([{obj:p,delay:0,drop:.28},{obj:b,delay:.12,drop:.22},{obj:_,delay:.22,drop:.42},{obj:S,delay:.32,drop:.42},{obj:N,delay:.48,drop:.3,fromScale:.45}],{dur:.95});return f.userData.reveal=q,o=q,q.arm(),d.view.dist<6.3&&(d.view.dist=6.3),d.ready(),!0}var ry=(i,e,t)=>Math.max(e,Math.min(t,i)),Fd=.02585,ay=1.2,bn=.7,oy=.35,qr=i=>Math.log1p(Math.exp((i-oy)/(2*ay*Fd)))**2,xl=(i,e)=>qr(i)*(1-Math.exp(-Math.max(0,e)/Fd)),ly=xl(bn,bn);function cy(i){let e=0,t=bn;for(let s=0;s<40;s++){let r=(e+t)/2;xl(i,r)-xl(bn-i,bn-r)<0?e=r:t=r}let n=(e+t)/2;return{vo:n,i:xl(i,n)/ly,gn:qr(i)/qr(bn),gp:qr(bn-i)/qr(bn)}}function Bd(i,e){let t=e.ui,n=t.C,s=L=>L<560,r=.32,a=null,o,l,c,h,d=xt(i,{ui:t,label:"A CMOS inverter in three dimensions: a p-type transistor above an n-type, sharing the output node. Drag to turn; Input voltage flips the output.",height:L=>s(L)?Math.round(Math.max(300,L*.9)):Math.round(Math.min(600,L*.8)),radius:1.7,radiusY:1.6,yaw:.78,pitch:.38,target:new C(0,.95,0),fitPadY:1.08,fitPadX:.95,fov:32,autoFit:!0,busy:()=>!!(a&&!a.done),onShow(){a?.arm(),d&&d.invalidate()},step(L){return a&&!a.done?(a.tick(L),!0):!1}});if(!d)return!1;let{scene:u}=d;yt(u,{hemi:.55,keyI:1.55,fillI:.25,rimI:.6,envI:.6,glintI:.5});let f=new Me;u.add(f);let m=new Me;f.add(m),m.add(Oe(2.45,.2,1.35,W(13158596,{roughness:.42,metalness:.4,brush:!1}),.05)),m.children[0].position.set(0,-.28,0),rt(m,2.4,1.3,-.16,W(13158596,{roughness:.4}),{t:.03,railH:.05,overhang:.025});let y=new Me;f.add(y);let g=Oe(2.25,.14,.72,W(12095552,{roughness:.28,metalness:.85,emissive:8937504,emissiveIntensity:.1,clearcoat:.45,clearcoatRoughness:.15}),.045);g.position.set(0,1.95,0),y.add(g);let p=Oe(2.25,.14,.72,W(6975608,{roughness:.4,metalness:.7}),.045);p.position.set(0,-.05,0),y.add(p);let w=new Me;f.add(w),o=Oe(1.15,.38,.95,W(4881100,{roughness:.28,metalness:.78,emissive:2775724,emissiveIntensity:.1,brushStrength:1.2,clearcoat:.35}),.06),o.position.set(0,1.45,0),w.add(o),rt(w,1.1,.9,1.66,W(9090288,{roughness:.32}),{t:.028,railH:.045,overhang:.018});let P=Oe(.22,.58,1,W(9090288,{roughness:.3,metalness:.65}),.04);P.position.set(-.72,1.45,0),w.add(P);for(let L of[-.28,.28]){let z=new k(new Re(.07,.07,.035,12),W(12886112,{roughness:.28,metalness:.85}));z.position.set(.28,1.68,L),w.add(z)}let v=new Me;f.add(v),l=Oe(1.15,.38,.95,W(3832e3,{roughness:.28,metalness:.78,emissive:1726624,emissiveIntensity:.1,brushStrength:1.2,clearcoat:.35}),.06),l.position.set(0,.4,0),v.add(l),rt(v,1.1,.9,.61,W(8037600,{roughness:.32}),{t:.028,railH:.045,overhang:.018});let b=Oe(.22,.58,1,W(9090288,{roughness:.3,metalness:.65}),.04);b.position.set(-.72,.4,0),v.add(b);for(let L of[-.28,.28]){let z=new k(new Re(.07,.07,.035,12),W(12886112,{roughness:.28,metalness:.85}));z.position.set(.28,.63,L),v.add(z)}let E=new Me;f.add(E);let I=W(14212324,{roughness:.4,metalness:.2,opacity:.55,brush:!1}),_=W(14736596,{roughness:.5,metalness:.25});for(let L of[1.45,.4]){let z=Oe(.07,.42,.88,I,.02);z.position.set(-.56,L,0),E.add(z);for(let D of[-1,1]){let Z=Oe(.13,.4,.11,_,.025);Z.position.set(-.5,L,D*.44),E.add(Z)}}let S=new Me;f.add(S);let N=W(12101752,{roughness:.3,metalness:.8,emissive:11044952,emissiveIntensity:.08});for(let[L,z,D]of[[.55,1.95,.25],[.55,.92,.25],[.55,-.05,.25]]){let Z=new k(new Re(.065,.065,.22,12),N);Z.position.set(L,z,D),S.add(Z);let te=new k(new Re(.11,.11,.045,12),N);te.position.set(L,z+.11,D),S.add(te)}c=new k(new Ze(.17,18,18),W(15255626,{roughness:.28,metalness:.7,emissive:15255626,emissiveIntensity:.4})),c.position.set(0,.92,0),S.add(c);let B=W(11580604,{roughness:.35,metalness:.75});for(let[L,z]of[[.38,1.72],[.52,.92],[.32,.18]]){let D=new k(new Re(.085,.085,L,14),B);D.position.set(0,z,0),S.add(D)}let O=W(4882372,{roughness:.32,metalness:.65,emissive:2777e3,emissiveIntensity:.18}),F=new k(new Re(.045,.045,1.2,12),O);F.position.set(-.72,.92,0),S.add(F);let R=new k(new Ze(.11,14,14),O);R.position.set(-.72,.92,.58),S.add(R),h=new k(new qi(.11,1.4,6,12),Ge(14711354,{emissive:14711354,emissiveIntensity:.5,opacity:0})),h.position.set(0,.95,0),f.add(h),d.label('<span class="c-yellow">out</span>',()=>new C(.5,.92,.4),"");let U=t.controls(i),G=t.readout(i);function q(){let{vo:L,i:z,gn:D,gp:Z}=cy(r);o?.material&&(o.material.emissiveIntensity=.06+.4*Z),l?.material&&(l.material.emissiveIntensity=.06+.4*D),o.scale.set(1,.88+.22*Z,1),l.scale.set(1,.88+.22*D,1),c.material.emissiveIntensity=.2+.55*(L/bn),c.material.color.setHex(L>bn/2?15255626:9080984);let te=ry(1-Math.abs(r-bn/2)/(bn/2),0,1),ue=.05+.55*te*Math.min(1,z*8);h.visible=ue>.08,h.material.opacity=ue,h.material.emissiveIntensity=.2+.7*te,h.material.transparent=!0;let pe=Math.floor(Math.log10(Math.max(z,1e-12))),se=z>=.01?`${Math.round(z*100)}%`:`${(z/10**pe).toFixed(1)}\xD710<sup>${pe}</sup>`;G.innerHTML=`<span class="c-blue">in</span> <b>${r.toFixed(2)} V</b> \u2192 <span class="c-yellow">out</span> <b>${L.toFixed(2)} V</b> \xB7 <span class="c-blue">pMOS</span>/<span class="c-blue">nMOS</span> current <b class="c-orange">${se}</b>${te>.4?" \xB7 both open":""}`,d.invalidate()}t.slider(U,{label:"Input",name:"vin",min:0,max:bn,step:.01,value:r,color:n.compute,fmt:L=>`${L.toFixed(2)} V`,oninput:L=>{r=L,q()}}),t.hint(i,'drag to turn \xB7 <span class="c-blue">pMOS</span> above \xB7 <span class="c-blue">nMOS</span> below \xB7 slide Input through the middle'),q();let H=_t([{obj:m,delay:0,drop:.2},{obj:y,delay:.08,drop:.22},{obj:w,delay:.18,drop:.28},{obj:v,delay:.28,drop:.28},{obj:E,delay:.38,drop:.15},{obj:S,delay:.48,drop:.2}],{dur:.9});return a=H,H.arm(),d.view.dist=Math.max(d.view.dist,7.4),d.ready(),!0}var Tt=4,ns=3*Tt-2,hy=1.05,uy=[[1,2,0,1],[0,1,1,2],[2,0,1,1],[1,1,0,2]],dy=[[1,0,2,1],[2,1,0,1],[0,2,1,0],[1,1,1,2]];function Od(i,e={}){return Ge(i,e)}function Hd(i,e){let t=e.ui,n=L=>L<560,s=Tt+.55,r=!0,a=.4,o=null,l=xt(i,{ui:t,label:"A four-by-four systolic array in three dimensions. Inputs march along rows, weights down columns; each cell multiplies the pair that meet and keeps a running total.",height:L=>n(L)?Math.round(Math.max(340,L*.95)):Math.round(Math.min(460,L*.55)),radius:3.2,radiusY:2.4,yaw:-.55,pitch:.48,target:new C(1.35,.35,1.35),fitPad:1.12,fov:30,busy:()=>r||o&&!o.done,onShow(){o?.arm(),l&&l.invalidate()},step(L){return o&&o.tick(L),!r&&!(o&&!o.done)?!1:a>0?(a-=L,U(),!0):(s=Math.min(ns+.999,s+L*hy),s>=ns+.999&&(r=!1,s=ns),U(),r)}});if(!l)return!1;yt(l.scene,{hemi:1.4,keyI:1.15,fillI:.45,rimI:.35});let c=new Me;l.scene.add(c);let h=.95,d=Ge(14869214,{shininess:30,specular:5592405}),u=W(13158596,{shininess:70}),f=W(11842736,{shininess:55}),m=W(12886112),y=[],g=new He(15319375),p=new He(14977104),w=new He;function P(L){let z=document.createElement("canvas");z.width=128,z.height=128;let D=z.getContext("2d");D.clearRect(0,0,128,128),D.font="700 56px ui-sans-serif, system-ui, sans-serif",D.textAlign="center",D.textBaseline="middle",D.fillStyle="#1a1a18",D.fillText(L,64,68);let Z=new wn(z);Z.colorSpace=Vt;let te=new sn({map:Z,transparent:!0,depthWrite:!1}),ue=new k(new On(.5,.5),te);return ue.rotation.x=-Math.PI/2,ue.userData.canvas=z,ue.userData.ctx=D,ue.userData.tex=Z,ue}for(let L=0;L<Tt;L++)for(let z=0;z<Tt;z++){let D=new Me,Z=Oe(.7,.28,.7,d.clone(),.05);D.add(Z);let te=Oe(.74,.035,.74,u,.02);te.position.y=.15,D.add(te);for(let se of[-1,1])for(let X=0;X<3;X++){let $=new k(new ve(.03,.14,.12),f);$.position.set(se*.36,.02,-.18+X*.18),D.add($)}for(let se of[-1,1])for(let X=0;X<3;X++){let $=new k(new ve(.12,.14,.03),f);$.position.set(-.18+X*.18,.02,se*.36),D.add($)}for(let se=0;se<8;se++){let X=se/8*Math.PI*2,$=new k(new Re(.028,.028,.035,8),m);$.position.set(Math.cos(X)*.28,.16,Math.sin(X)*.28),D.add($)}let ue=new k(new Ze(.045,10,10),Ge(4116420,{emissive:1940114,emissiveIntensity:.1}));ue.position.set(.22,.2,-.22),D.add(ue);let pe=P("0");pe.position.y=.2,D.add(pe),D.position.set(z*h,0,L*h),c.add(D),y.push({g:D,body:Z,i:L,j:z,mat:Z.material,glyph:pe,led:ue})}let v=Tt*h+.7,b=Tt*h+.7,E=new Me;E.position.set((Tt-1)*h/2,-.2,(Tt-1)*h/2),c.add(E);let I=new k(jt(v,.1,b,.04),fi(14474456));E.add(I),rt(E,v-.08,b-.08,.07,W(11842736),{t:.035,railH:.05,overhang:.03}),fl(E,v-.12,.03,b-.12,W(13158596),.09);for(let L=0;L<Tt;L++){let z=new k(new ve(Tt*h+.3,.015,.05),W(8962121,{shininess:60}));z.position.set((Tt-1)*h/2,-.13,L*h),c.add(z);let D=new k(new ve(.05,.015,Tt*h+.3),W(5162176,{shininess:60}));D.position.set(L*h,-.125,(Tt-1)*h/2),c.add(D)}let _=_t([{obj:E,delay:0,drop:.18,fromScale:.7}].concat(y.map((L,z)=>({obj:L.g,delay:.12+z*.04,drop:.32,fromScale:.35}))),{dur:.75});o=_,_.arm();let S=Od(8962121,{emissive:5937706,emissiveIntensity:.3}),N=Od(5950401,{emissive:2795684,emissiveIntensity:.3}),B=[],O=[];for(let L=0;L<Tt;L++)for(let z=0;z<Tt;z++){let D=new k(new Ze(.12,12,12),S);D.visible=!1,c.add(D),B.push({mesh:D,i:L,k:z})}for(let L=0;L<Tt;L++)for(let z=0;z<Tt;z++){let D=new k(new Ze(.12,12,12),N);D.visible=!1,c.add(D),O.push({mesh:D,j:L,k:z})}let F=new Pt({color:2829098,transparent:!0,opacity:.1});c.traverse(L=>{if(!(!L.isMesh||!L.geometry||L.geometry.type==="SphereGeometry"||L.geometry.type==="CylinderGeometry"))try{L.add(new Dt(dl(L.geometry,28),F.clone()))}catch{}}),l.label('<span class="c-green">A \u2192</span>',()=>new C(-1.15,.55,(Tt-1)*h/2),""),l.label('<span class="c-cyan">B \u2193</span>',()=>new C((Tt-1)*h/2,.55,-1.15),"");function R(L,z,D){let Z=0;for(let te=0;te<Tt;te++)te+L+z<=D&&(Z+=uy[L][te]*dy[te][z]);return Z}function U(){let L=Math.floor(s),z=s-L,D=(ue,pe)=>z<=ue?0:z>=pe?1:(se=>se*se*(3-2*se))((z-ue)/(pe-ue)),Z=L+D(.35,.7),te=L+D(.7,1);for(let{body:ue,i:pe,j:se,glyph:X,led:$}of y){let me=ue.material,ge=L-pe-se,_e=ge>=0&&ge<Tt,Ye=L>=pe+se+Tt-1,dt=R(pe,se,L),Je=R(pe,se,1e9)||1,et=Math.max(0,Math.min(1,dt/Je));if(w.setHex(14869214).lerp(g,Math.min(1,et*1.6)).lerp(p,Ye?1:Math.max(0,et-.4)/.6*.7),me.color.copy(_e?g:w),me.emissive.copy(_e?g:w),me.emissiveIntensity=_e?.28:et>0?.12:0,ue.scale.y=_e?1.15:1,$&&($.material.emissiveIntensity=_e?.7:Ye?.25:.08,$.material.color.setHex(_e?15319375:Ye?14977104:13158596)),X){let tt=X.userData.ctx,Q=X.userData.tex;tt.clearRect(0,0,128,128),tt.font="700 56px ui-sans-serif, system-ui, sans-serif",tt.textAlign="center",tt.textBaseline="middle",tt.fillStyle=Ye?"#ffffff":dt?"#2a2622":"#9aa0a8",tt.fillText(String(dt),64,68),Q.needsUpdate=!0}}for(let{mesh:ue,i:pe,k:se}of B){let X=Z-se-pe,$=X>-1.2&&X<Tt+.2;ue.visible=$,$&&ue.position.set(X*h,.35,pe*h)}for(let{mesh:ue,j:pe,k:se}of O){let X=te-se-pe,$=X>-1.2&&X<Tt+.2;ue.visible=$,$&&ue.position.set(pe*h,.35,X*h)}H(),l.invalidate()}let G=t.controls(i),q=t.readout(i);function H(){let L=Math.min(Math.floor(s),ns),z=0;for(let D=0;D<Tt;D++)for(let Z=0;Z<Tt;Z++){let te=L-D-Z;te>=0&&te<Tt&&z++}q.innerHTML=L>=ns?`Done in <b>${ns}</b> ticks: <b class="c-blue">64</b> multiply-adds from <b>32</b> numbers, each reused four times.`:`Tick <b>${L}</b>: <b class="c-blue">${z}</b> of 16 cells multiplying \u2014 no cell goes back to memory.`}return t.button(G,"Play",()=>{s=0,a=.25,r=!0,U(),l.kick()},{kind:"primary",name:"sy3-play"}),t.button(G,"Next tick",()=>{r=!1,s=(Math.floor(s)+1)%(ns+1),U()},{name:"sy3-step"}),t.hint(i,'mid-wave \xB7 <span class="c-green">inputs</span> and <span class="c-cyan">weights</span> meet; sums warm to <span class="c-orange">orange</span>'),U(),l.view.dist<6.2&&(l.view.dist=6.2),l.ready(),!0}function is(i,e={}){return Ge(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function Gd(i,e){let t=new Me;t.position.x=e,i.add(t),t.add(Oe(2.2,.18,1.6,W(14211286,{roughness:.45,metalness:.4}),.05)),rt(t,2.15,1.55,.1,W(12632254),{t:.03,railH:.05,overhang:.025});let n=Oe(2,.12,1.4,W(12632254,{roughness:.4}),.04);n.position.set(0,.14,0),t.add(n);let s=Oe(.95,.14,.85,W(5219046,{emissive:2781104,emissiveIntensity:.12,roughness:.45,metalness:.3}),.035);s.position.set(0,.28,0),t.add(s),rt(t,.95,.85,.36,W(4163272),{t:.025,railH:.04,overhang:.02});for(let l=-2;l<=2;l++)for(let c=-1;c<=1;c++){if(Math.abs(l)+Math.abs(c)<1)continue;let h=new k(new Re(.03,.03,.02,8),W(14205040));h.position.set(l*.14,.37,c*.16),t.add(h)}let r=is(4168260,{emissive:2783796,emissiveIntensity:.15});for(let l of[-.85,.85])for(let c=0;c<8;c++){let h=c%2?3115602:4168260,d=new k(jt(.28,.048,.55,.012),is(h,{emissive:2783796,emissiveIntensity:.12}));if(d.position.set(l,.2+c*.055,0),t.add(d),c<7){let u=new k(new ve(.26,.01,.5),is(13160648));u.position.set(l,.228+c*.055,0),t.add(u)}}let a=new k(jt(1.4,.06,.28,.02),is(9071288,{emissive:6965912,emissiveIntensity:.2}));a.position.set(0,.12,.75),t.add(a);let o=is(12886112);for(let l=-3;l<=3;l++)for(let c=-2;c<=2;c++){let h=new k(new Ze(.04,8,8),o);h.position.set(l*.22,-.12,c*.2),t.add(h)}return t}function zd(i,e){let t=e.ui,n=b=>b<560,s=.45,r=!0,a=null,o={a:new C(-2.2,.22,.75),b:new C(2.2,.22,.75),pulse:null},l=xt(i,{ui:t,label:"Two GPU packages on one board, joined by NVLink. A pulse crosses the link at Epoch\u2019s 900 GB/s bandwidth.",height:b=>n(b)?300:280,radius:2.38,radiusY:1.52,yaw:-.58,pitch:.32,target:new C(0,.1,.1),fitPad:1.18,fov:28,busy:()=>r||a&&!a.done,onShow(){a?.arm(),l&&l.invalidate()},step(b){return a&&a.tick(b),o.pulse?(s=(s+b*.35)%1,o.pulse.position.lerpVectors(o.a,o.b,s),l.invalidate(),!0):!!(a&&!a.done)}});if(!l)return!1;yt(l.scene,{hemi:.95,keyI:1.25,fillI:.36,rimI:.45,envI:1});let c=new Me;l.scene.add(c);let h=Oe(6.8,.12,2.8,fi(14474456),.04);h.position.y=-.28,c.add(h),rt(c,6.7,2.7,-.2,W(11842736),{t:.035,railH:.05,overhang:.03});let d=is(4880984,{opacity:.7});for(let b=-2;b<=2;b++){let E=new k(new ve(6.4,.02,.04),d);E.position.set(0,-.2,b*.35),c.add(E)}let u=Gd(c,-2.2),f=Gd(c,2.2),m=new Me;c.add(m);let y=W(9071288,{emissive:6965912,emissiveIntensity:.42,roughness:.28,metalness:.82,brushStrength:1.25}),g=Oe(2.7,.03,.55,W(6965912,{roughness:.35,metalness:.7,emissive:4860536,emissiveIntensity:.18}),.02);g.position.set(0,.14,.5),m.add(g);for(let b=-3;b<=3;b++){let E=Oe(2.65,.07,.075,y,.022);E.position.set(0,.2,.5+b*.085),m.add(E)}for(let b of[-1.25,1.25])for(let E=-3;E<=3;E++){let I=new k(new Re(.055,.055,.09,12),W(14205040,{roughness:.32,metalness:.85}));I.rotation.z=Math.PI/2,I.position.set(b,.2,.5+E*.085),m.add(I)}let p=new k(new Ze(.11,14,14),is(14711354,{emissive:14711354,emissiveIntensity:.55}));p.position.lerpVectors(o.a,o.b,s),c.add(p),o.pulse=p;let w=new Pt({color:2829098,transparent:!0,opacity:.22});c.traverse(b=>{if(!(!b.isMesh||!b.geometry||b.geometry.type==="SphereGeometry"))try{b.add(new Dt(dl(b.geometry,28),w.clone()))}catch{}}),l.label('<span class="c-violet">NVLink</span>',()=>new C(0,.55,1.15),"");let P=t.readout(i);P.innerHTML='Pulse on <b class="c-violet">NVLink</b> \xB7 Epoch <b>900 GB/s</b> (bandwidth only). Leaving package A is the off-die hop.',t.hint(i,'packages <span class="c-blue">A</span>/<span class="c-blue">B</span> \xB7 <span class="c-violet">NVLink</span> 900 GB/s \xB7 mid-crossing');let v=_t([{obj:u,delay:0,drop:.35},{obj:f,delay:.15,drop:.35},{obj:m,delay:.35,drop:.2,fromScale:.5}],{dur:.9});return a=v,v.arm(),l.view.dist<5.9&&(l.view.dist=5.9),l.ready(),!0}function fy(i){let e=i>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function yl(i,e={}){return Ge(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function kd(i,e){let t=e.ui,n=R=>R<560,s=150,r=20,a=.1,o=!1,l=null,c=xt(i,{ui:t,label:"A three-hundred-millimetre wafer with random defects. Drag die size; good dies stay blue.",height:R=>(n(R),400),radius:2.45,radiusY:1.8,yaw:-.2,pitch:.44,target:new C(0,.15,0),fitPad:1.1,fov:28,busy:()=>!!(l&&!l.done),onShow(){l?.arm(),c&&c.invalidate()},step(R){return l&&!l.done?(l.tick(R),!0):!1}});if(!c)return!1;yt(c.scene,{hemi:.95,keyI:1.3,fillI:.38,rimI:.42,envI:1});let h=new Me;c.scene.add(h);let d=1/58,u=s*d,f=W(14212326,{roughness:.28,metalness:.55,brush:!1,emissive:11581640,emissiveIntensity:.04}),m=new k(new Re(u*.55,u*.7,.18,48),W(9080984,{roughness:.4,metalness:.75}));m.position.y=-.14,h.add(m),rt(h,u*1.15,u*1.15,-.02,W(10528944),{t:.03,railH:.05,overhang:.02});let y=new k(new Re(u,u,.08,64),f);h.add(y);let g=new k(new Lt(u-.02,.035,8,64),W(12633808,{roughness:.35,metalness:.7}));g.rotation.x=Math.PI/2,g.position.y=.04,h.add(g);let p=new k(new Lt(u-.08,.018,6,64),W(14212326,{shininess:90}));p.rotation.x=Math.PI/2,p.position.y=.05,h.add(p);let w=new k(jt(.18,.1,.12,.025),yl(12107464));w.position.set(0,.02,-u+.02),h.add(w);for(let R=0;R<6;R++){let U=R/6*Math.PI*2,G=new k(new Re(.04,.04,.04,10),W(5922920));G.position.set(Math.cos(U)*u*.35,-.04,Math.sin(U)*u*.35),h.add(G)}let P=new Me;h.add(P);let v=new Me;h.add(v);let b=yl(4878292,{emissive:2772916,emissiveIntensity:.12}),E=yl(13660240,{emissive:11554864,emissiveIntensity:.15}),I=yl(2829098,{emissive:1118481,emissiveIntensity:.1});function _(){let R=fy(11),U=Math.round(a*Math.PI*15**2),G=[];for(;G.length<U;){let z=(R()*2-1)*s,D=(R()*2-1)*s;z*z+D*D<s*s&&G.push([z,D])}let q=o?r/2:r,H=[],L=0;for(let z=-s;z<s;z+=q)for(let D=-s;D<s;D+=q){if([[D,z],[D+q,z],[D,z+q],[D+q,z+q]].some(([te,ue])=>te*te+ue*ue>(s-3)**2))continue;let Z=G.some(([te,ue])=>te>=D&&te<D+q&&ue>=z&&ue<z+q);Z||L++,H.push([D,z,Z])}return{dies:H,defects:G,gross:H.length,good:L,a:q}}function S(){for(;P.children.length;)P.remove(P.children[0]);for(;v.children.length;)v.remove(v.children[0]);let{dies:R,defects:U,a:G}=_(),H=Math.max(.04,G*d-.015),L=.07,z=W(4878292,{emissive:2772916,emissiveIntensity:.14,roughness:.45,metalness:.55,brush:!1}),D=W(13660240,{emissive:11554864,emissiveIntensity:.18,roughness:.45,metalness:.5,brush:!1}),Z=W(6983636),te=W(14717040);for(let[ue,pe,se]of R){let $=H>.07?Oe(H,L,H,se?D:z,Math.min(.02,H*.15)):new k(new ve(H,L,H),se?E:b);if($.position.set((ue+G/2)*d,.08,(pe+G/2)*d),P.add($),H>.1){let me=Oe(H+.012,.014,H+.012,se?te:Z,.008);me.position.set((ue+G/2)*d,.08+L/2+.005,(pe+G/2)*d),P.add(me)}}for(let[ue,pe]of U){let se=new k(new Ze(.035,8,8),I);se.position.set(ue*d,.14,pe*d),v.add(se)}O(),c.invalidate()}let N=t.controls(i),B=t.readout(i);function O(){let{gross:R,good:U}=_(),G=r*r/100,q=Math.exp(o?-G/4*a:-G*a);B.innerHTML=o?`Four <span class="c-blue">chiplets</span> of ${r/2}\xD7${r/2} mm: <b>${U}</b> of ${R} good (~${Math.round(q*100)}%) \u2192 ${Math.floor(U/4)} complete chips.`:`<b>${r}\xD7${r} mm</b> die (${(G*100).toFixed(0)} mm\xB2): <b class="c-blue">${U}</b> of ${R} good (~${Math.round(q*100)}% by formula).`}t.slider(N,{label:"Die side (mm)",name:"yd-side",min:5,max:30,step:1,value:r,color:t.C.compute,fmt:R=>`${R}`,oninput:R=>{r=R,S()}}),t.slider(N,{label:"Defects / cm\xB2",name:"yd-d0",min:.02,max:.5,step:.01,value:a,color:t.C.heat,fmt:R=>R.toFixed(2),oninput:R=>{a=R,S()}}),t.button(N,"Split into four chiplets",()=>{o=!o,S()},{name:"yd3-chip"}),t.hint(i,'<span class="c-blue">good dies</span> \xB7 <span class="c-orange">defects</span> \xB7 drag size'),S();let F=_t([{obj:m,delay:0,drop:.15},{obj:y,delay:.12,drop:.18},{obj:P,delay:.3,drop:.12},{obj:v,delay:.45,drop:.1}],{dur:.9});return l=F,F.arm(),c.view.dist<7.05&&(c.view.dist=7.05),c.ready(),!0}var py=(i,e,t,n)=>i+(e-i)*Math.min(1,t*n);function Yr(i,e,t,n,s){let r=new Me;r.position.set(e,t,n),i.add(r);let a=Qi(204),o=W(4878292,{emissive:2772916,emissiveIntensity:.05}),l=W(12886112,{shininess:55,specular:8939059}),c=W(10134188,{shininess:60}),h=W(14209216,{shininess:80,specular:16777215}),d=Oe(1.4,.1,.9,a,.04);d.position.y=0,r.add(d);let u=new k(new Re(.14,.14,.85,20),o);u.rotation.z=Math.PI/2,u.position.set(0,.32,0),r.add(u);for(let b=0;b<9;b++){let E=new k(new Lt(.2,.035,8,20),l);E.rotation.y=Math.PI/2,E.position.set(-.36+b*.09,.32,0),r.add(E)}let f=new k(jt(.08,.55,.55,.025),W(10923188));f.position.set(-.55,.35,0),r.add(f);let m=new k(jt(.08,.55,.55,.025),W(10923188));m.position.set(.55,.35,0),r.add(m);let y=new Me;y.position.set(.62,.62,0),r.add(y);let g=new k(jt(.95,.08,.22,.025),c);g.position.set(.4,0,0),y.add(g);let p=new k(new ve(.95,.02,.24),W(9080984));p.position.set(.4,.05,0),y.add(p);let w=new k(new Ze(.07,14,14),h);w.position.set(.88,0,0),y.add(w);let P=new k(new Ze(.06,12,12),h);P.position.set(1.35,.48,0),r.add(P);let v=new k(new Re(.04,.04,.35,10),W(9080984));return v.position.set(1.35,.28,0),r.add(v),{g:r,armRoot:y,tip:w,core:u,mCoil:o,label:s}}function Vd(i,e){let t=e.ui,n=O=>O<560,s={a:!0,b:!0,arm:[.92,.35],series:!0},r=[0,0],a=null,o=xt(i,{ui:t,label:"Two soft-solid relays. Each coil pulls an armature that closes a contact. Series = AND, parallel = OR.",height:O=>n(O)?420:380,radius:2.75,radiusY:1.55,yaw:-.42,pitch:.36,target:new C(.5,.45,.15),fitPad:1.24,fov:28,busy:()=>!0,onShow(){a?.arm(),o&&o.invalidate()},step(O){if(a&&!a.done)return a.tick(O),E(),!0;let F=!1;return[s.a,s.b].forEach((R,U)=>{let G=R?1:0,q=s.arm[U],H=py(q,G,12,O);s.arm[U]=Math.abs(H-G)<.002?G:H,Math.abs(s.arm[U]-G)>.002&&(F=!0),q<.9&&s.arm[U]>=.9&&(r[U]=.45),r[U]>0&&(r[U]-=O)}),E(),F||r[0]>0||r[1]>0||t.isPlaying()}});if(!o)return!1;yt(o.scene,{hemi:1.4,keyI:1.2,fillI:.45,rimI:.32});let l=new Me;o.scene.add(l);let c=Oe(4.6,.12,2.6,Qi(222),.05);c.position.set(.5,-.12,.05),l.add(c),rt(l,4.5,2.5,-.04,Qi(196,{lift:.3}),{t:.035,railH:.05,overhang:.03});let h=Yr(l,-1.3,0,.2,"A"),d=Yr(l,.9,0,.2,"B"),u=[h,d],f=new Me;f.position.set(2.6,.35,.2),l.add(f);let m=new k(new Ze(.28,20,20),Ge(15000800,{shininess:40}));f.add(m);let y=new k(new Re(.18,.22,.2,14),W(9080984));y.position.y=-.3,f.add(y);let g=W(5924976,{shininess:40}),p=W(15255626,{emissive:15255626,emissiveIntensity:.45,shininess:50}),w=[];function P(O,F,R,U){let G=R-O,q=U-F,H=Math.hypot(G,q),L=new k(new ve(H,.03,.05),g.clone());return L.position.set((O+R)/2,.02,(F+U)/2),L.rotation.y=-Math.atan2(q,G),l.add(L),w.push(L),L}P(-1.3,.2,.9,.2),P(.9,.2,2.4,.2),P(-1.3,-.5,2.4,-.5),o.label('<span class="c-orange">A</span>',()=>new C(-1.3,1.35,.2),""),o.label('<span class="c-orange">B</span>',()=>new C(.9,1.35,.2),""),o.label('<span class="c-yellow">lamp</span>',()=>new C(2.6,.85,.2),"");let v=[o.label('<span class="c-orange">click</span>',()=>new C(-.1,.85,.2),""),o.label('<span class="c-orange">click</span>',()=>new C(2.1,.85,.2),"")],b=[];[[-1.3,-1],[.9,-1]].forEach(([O,F],R)=>{let U=new k(jt(.45,.18,.45,.05),Pn(14212326,{emissive:0,emissiveIntensity:0}));U.position.set(O,.05,F),U.userData.key=R,l.add(U),b.push(U)});function E(){u.forEach((q,H)=>{let L=s.arm[H];q.armRoot.rotation.z=-.42+(.02- -.42)*L;let z=[s.a,s.b][H];q.mCoil.emissiveIntensity=z?.35:.05,q.mCoil.color.setHex(z?6986464:4878292),b[H].material.emissive=new He(z?4878292:0),b[H].material.emissiveIntensity=z?.25:0,b[H].position.y=z?0:.05,v[H].el.style.opacity=r[H]>0?String(Math.min(1,r[H]*3)):"0"});let R=s.arm[0]>.92,U=s.arm[1]>.92,G=s.series?R&&U:R||U;m.material.emissive=new He(G?15245344:0),m.material.emissiveIntensity=G?.7:0,m.material.color.setHex(G?15910991:15000800),w.forEach((q,H)=>{let L=G||H===0&&R;q.material.color.copy(L?p.color:g.color),q.material.emissive.copy(L?p.emissive:g.emissive),q.material.emissiveIntensity=L?.4:0}),S(),o.invalidate()}let I=t.controls(i),_=t.readout(i);function S(){let O=s.series?s.arm[0]>.92&&s.arm[1]>.92:s.arm[0]>.92||s.arm[1]>.92;_.innerHTML=s.series?`Series = <b>AND</b>: both <span class="c-blue">coils</span> must pull. Lamp is <b>${O?"on":"off"}</b>.`:`Parallel = <b>OR</b>: either <span class="c-blue">armature</span> closes the lamp. Lamp is <b>${O?"on":"off"}</b>.`}t.segmented&&t.segmented(I,{label:"Contacts",value:!0,options:[{label:"series (AND)",value:!0,name:"rl3-ser"},{label:"parallel (OR)",value:!1,name:"rl3-par"}],onchange:O=>{s.series=O,E(),o.kick()}}),t.button(I,"Toggle A",()=>{s.a=!s.a,o.kick()},{name:"rl3-a"}),t.button(I,"Toggle B",()=>{s.b=!s.b,o.kick()},{name:"rl3-b"}),t.hint(i,'tap keys or buttons \xB7 watch the <span class="c-blue">armature</span> click'),o.canvas.addEventListener("pointerup",O=>{});let N=new ui,B=new Ue;return o.canvas.addEventListener("click",O=>{let F=o.canvas.getBoundingClientRect();B.set((O.clientX-F.left)/F.width*2-1,-((O.clientY-F.top)/F.height)*2+1),N.setFromCamera(B,o.camera);let R=N.intersectObjects(b,!0)[0];R&&(R.object.userData.key===0?s.a=!s.a:s.b=!s.b,o.kick())}),a=_t([{obj:c,delay:0,drop:.2},{obj:h.g,delay:.1,drop:.28},{obj:d.g,delay:.25,drop:.28},{obj:f,delay:.4,drop:.22}]),E(),o.view.dist<6&&(o.view.dist=6),o.ready(),!0}var yi=[{k:"g",label:"g-line 436 nm",lam:436,na:.45,yr:"1980s"},{k:"i",label:"i-line 365 nm",lam:365,na:.6,yr:"1990s"},{k:"krf",label:"KrF 248 nm",lam:248,na:.8,yr:"around 2000"},{k:"arf",label:"ArF 193 nm",lam:193,na:.93,yr:"2000s"},{k:"arfi",label:"ArF immersion",lam:193,na:1.35,yr:"since ~2007"},{k:"euv",label:"EUV 13.5 nm",lam:13.5,na:.33,yr:"since 2019"},{k:"hna",label:"High-NA EUV",lam:13.5,na:.55,yr:"2025\u201326"}];var my=(i,e,t)=>Math.max(e,Math.min(t,i)),lh=.4,gy=(i,e,t)=>{let n=i/(2*t*e),s=my((2-n)/.2,0,1),r=.5,a=1/Math.PI;return s?s*2*r*a/(s*(r*r+a*a)+(1-s)*r*r):0},$r=i=>i.lam<20;function Wd(i,e){let t=e.ui,n=V=>V<560,s=4,r=60,a=0,o=null,l=!1,c=()=>gy(yi[s].lam,yi[s].na,r),h=xt(i,{ui:t,label:"Light through a chrome mask onto photoresist on a wafer. Features blur as half-pitch nears the wavelength limit.",height:V=>n(V)?400:380,radius:2,radiusY:1.75,yaw:.36,pitch:.48,target:new C(0,.9,0),fitPad:1.14,fov:32,busy:()=>!0,onShow(){o?.arm(),h&&h.invalidate()},step(V){return o&&!o.done&&o.tick(V),a+=V,u.forEach((ee,fe)=>{ee.material.opacity=(ee.userData.op??1)*(.25+.35*(.5+.5*Math.sin(a*4+fe*.4)))}),h.invalidate(),t.isPlaying()}});if(!h)return!1;yt(h.scene,{hemi:.95,keyI:1.25,fillI:.36,rimI:.42,envI:1});let d=new Me;h.scene.add(d);let u=[],f=[],m=[],y=null,g=new k(new Re(1.6,1.6,.12,48),W(12173514,{roughness:.35,metalness:.55,brush:!1}));g.position.y=0,d.add(g),Ws(d,1.55,.04,.06,W(11055288)),Ws(d,1.4,.02,.08,W(12634320,{shininess:90}));let p=new k(new Re(1.45,1.45,.06,40),Ge(7259296,{opacity:.55,shininess:20}));p.position.y=.12,d.add(p),y=new k(new Re(1.35,1.35,.05,40),di(8308968,{opacity:0,shininess:95,specular:16777215})),y.position.y=.22,y.visible=!1,d.add(y);let w=Oe(2.6,.06,1.4,di(13162728,{opacity:.4}),.03);w.position.y=1.15,d.add(w);let P=new Me;d.add(P);let v=Oe(2.7,.04,1.5,W(9080984,{roughness:.3,metalness:.8}),.025);v.position.y=1.12,P.add(v),rt(P,2.7,1.5,1.16,W(10133672),{t:.03,railH:.05,overhang:.025});let b=Oe(2.6,.06,1.4,W(5926028,{roughness:.2,metalness:.85}),.03);b.position.y=1.15,b.visible=!1,P.add(b);let E=(V,ee)=>new C(V,ee,0),I={x:-1.2,y:3.3,sx:.8},_=6*Math.PI/180,S=E(I.x,I.y-.07),N=E(-2.45,2.55),B=E(S.x-1.6*Math.sin(_),S.y-1.6*Math.cos(_)),O=E(S.x+.9*Math.sin(_),S.y-.9*Math.cos(_)),F=E(1.3,2.85),R=E(.5,2.4),U=E(1.6,1.55),G=E(1.2,.85),q=E(0,1.4),H=E(0,.18),L=new Me;L.visible=!1,d.add(L);let z=W(14673130,{roughness:.1,metalness:.92}),D=W(8028296,{roughness:.35,metalness:.8}),Z=(V,ee,fe,ye)=>{let ae=new Me,le=new k(new Re(1,1,.2,40),D);le.position.y=.27,ae.add(le);let xe=new Ze(3,40,6,0,Math.PI*2,0,Math.asin(1/3));xe.translate(0,-3*Math.cos(Math.asin(1/3)),0);let Te=new k(xe,z);Te.material.side=Ut,Te.userData.noInk=!0,ae.add(Te);let Ee=ee.clone().sub(V).normalize().add(fe.clone().sub(V).normalize()).normalize();return ae.quaternion.setFromUnitVectors(new C(0,-1,0),Ee),ae.position.copy(V),ae.scale.setScalar(ye),L.add(ae),ae};Z(B,N,S,.2),Z(O,S,F,.2),Z(F,O,R,.22),Z(R,F,U,.2),Z(U,R,G,.22),Z(G,U,q,.16);let te=Z(q,G,H,.5),ue=new C(0,-1,0).applyQuaternion(te.quaternion),pe=new Me;pe.position.copy(N),L.add(pe);let se=B.clone().sub(N).normalize(),X=new k(new Ze(.42,32,10,0,Math.PI*2,0,Math.PI*.42),z);X.material=z.clone(),X.material.side=Ut,X.quaternion.setFromUnitVectors(new C(0,1,0),se.clone().negate()),X.userData.noInk=!0,pe.add(X);let $=new k(new Ze(.07,16,12),Ge(14268671,{emissive:11566335,emissiveIntensity:1}));$.userData.noInk=!0,pe.add($);let me=W(12106948,{roughness:.25,metalness:.9});for(let V=-4;V<=4;V++)if(V){let ee=new k(new Ze(.028,10,8),me);ee.position.set(0,0,V*.14),pe.add(ee)}let ge=dt(N.clone().addScaledVector(se,-.9),N,.035,Ge(14696490,{emissive:13643808,emissiveIntensity:.6,opacity:.85}));ge.position.z=0,ge.position.sub(N),pe.add(ge);let _e=V=>{let ee=Math.asin(V),fe=new C(-ue.y,ue.x,0),ye=.1;for(let ae=0;ae<40;ae++){let le=q.clone().addScaledVector(fe,ye),xe=q.clone().addScaledVector(fe,-ye),Te=(Math.abs(Math.atan2(le.x-H.x,le.y-H.y))+Math.abs(Math.atan2(xe.x-H.x,xe.y-H.y)))/2;ye*=ee/Te}return ye},Ye=new Dt(new Ot(new ve(5.4,3.85,2.2)),new Pt({color:9080984,transparent:!0,opacity:.55}));Ye.position.set(-.5,1.68,0),L.add(Ye);function dt(V,ee,fe,ye){let ae=ee.x-V.x,le=ee.y-V.y,xe=Math.hypot(ae,le),Te=new k(new ve(fe,xe,.07),ye);return Te.position.set((V.x+ee.x)/2,(V.y+ee.y)/2,0),Te.rotation.z=Math.atan2(le,ae)-Math.PI/2,Te}let Je=new k(new Re(.85,.95,.22,40),di(11061480,{opacity:.38,shininess:95}));Je.position.y=.72,d.add(Je);let et=new k(new Re(1,1.05,.08,40),W(10923188));et.position.y=.58,d.add(et);let tt=new k(new Lt(1.32,.025,8,48),di(10410224,{opacity:.55}));tt.rotation.x=Math.PI/2,tt.position.y=.24,tt.userData.noInk=!0,d.add(tt),y.userData.meniscus=tt;let Q=new Me;d.add(Q);let we=new k(new Re(.35,.4,.18,24),Ge(15319375,{emissive:15245344,emissiveIntensity:.45,shininess:20}));we.position.y=2.05,Q.add(we);let je=new k(new Re(.45,.45,.12,24),W(6975608,{roughness:.3,metalness:.8}));je.position.y=2.2,Q.add(je);let nt=new k(new Re(.55,.4,.14,24),di(13162728,{opacity:.35}));nt.position.y=1.85,Q.add(nt),rt(Q,.9,.9,2.28,W(8028296),{t:.025,railH:.04,overhang:.02});function qe(){m.forEach(Y=>{d.remove(Y),Y.geometry?.dispose()}),f.forEach(Y=>{d.remove(Y),Y.geometry?.dispose()}),u.forEach(Y=>{d.remove(Y),Y.geometry?.dispose()}),m=[],f=[],u=[];let V=c(),ee=$r(yi[s]),fe=yi[s].k==="arfi";w.visible=!ee,b.visible=ee,L.visible=ee,Je.visible=et.visible=nt.visible=!ee,Q.visible=!ee,P.position.set(ee?I.x:0,ee?I.y-1.15:0,0),P.scale.x=ee?I.sx:1,ee&&te.scale.setScalar(_e(yi[s].na)),ee!==l&&(l=ee,h.setFocus(ee?{target:new C(-.5,1.7,0),radius:2.95,radiusY:2.2,yaw:.85,pitch:.3}:{target:new C(0,.9,0),radius:2,radiusY:1.75,yaw:.36,pitch:.48})),y&&(y.visible=fe,y.material.opacity=fe?.42:0,y.material.transparent=!0,y.userData.meniscus&&(y.userData.meniscus.visible=fe));let ye=7,ae=2.2,le=ae/ye,xe=le*.45,Te=le-xe,Ee=Math.max(0,(1-V)*xe*.65),Ae=W(3815992,{shininess:90,specular:16777215}),We=-ae/2;for(let Y=0;Y<ye;Y++){let Se=We+Y*le+Te+xe/2,ce=We+Y*le+Te/2,be=new k(new ve(Math.max(.02,Te),.035,1.2),Ae);ee?(be.position.set(I.x+ce*I.sx,I.y-.07,0),be.scale.set(I.sx,2.2,1)):be.position.set(ce,1.185,0),d.add(be),m.push(be);let Ce=Ge(15314992,{opacity:.4,emissive:15245344,emissiveIntensity:.3,shininess:5});if(!ee){let de=new k(new ve(xe*.65,.95,.07),Ce);de.position.set(Se,.62,0),d.add(de),u.push(de)}if(V>lh){let de=Ge(2787944,{opacity:Math.min(.95,.4+V*.55),emissive:1731144,emissiveIntensity:.12}),ze=Math.max(.035,xe-2*Ee),Ne=new k(new ve(ze,.05,1.05),de);Ne.position.set(Se,.16,0),d.add(Ne),f.push(Ne)}}let $e=new k(new ve(Math.max(.02,Te),.035,1.2),Ae),it=We+ye*le+Te/2;if(ee?($e.position.set(I.x+it*I.sx,I.y-.07,0),$e.scale.set(I.sx,2.2,1)):$e.position.set(it,1.185,0),d.add($e),m.push($e),ee){let Y=()=>Ge(15314992,{opacity:.4,emissive:15245344,emissiveIntensity:.3,shininess:5});[[N,B],[B,S],[S,O],[O,F],[F,R],[R,U],[U,G],[G,q]].forEach(([at,Qt])=>{let fn=dt(at,Qt,.07,Y());d.add(fn),u.push(fn)});let Se=te.scale.x,ce=new C(-ue.y,ue.x,0),be=new C(0,0,1),Ce=[H.x,H.y,H.z];for(let at=0;at<=40;at++){let Qt=at/40*Math.PI*2;Ce.push(...q.clone().addScaledVector(ce,Se*Math.cos(Qt)).addScaledVector(be,Se*Math.sin(Qt)).toArray())}let de=[];for(let at=1;at<=40;at++)de.push(0,at,at+1);let ze=new wt;ze.setAttribute("position",new ot(Ce,3)),ze.setIndex(de),ze.computeVertexNormals();let Ne=Y();Ne.side=Ut,Ne.depthWrite=!1;let vt=new k(ze,Ne);vt.userData.op=.55,d.add(vt),u.push(vt)}if(V<=lh){let Y=new k(new ve(2.2,.04,1.05),Ge(8947848,{opacity:.35}));Y.position.set(0,.16,0),d.add(Y),f.push(Y)}x(),h.invalidate()}let j=h.label('<span class="c-grey">mask</span>',()=>$r(yi[s])?new C(I.x+1.1*I.sx,I.y+.06,0):new C(1.7,1.35,0),""),M=V=>()=>$r(yi[s])?V():null;h.label('<span class="c-grey">mirrors</span>',M(()=>new C(F.x+.1,F.y+.25,0)),""),h.label('<span class="c-grey">vacuum</span>',M(()=>new C(-2.6,3.6,-1.1)),""),h.label('<span class="c-grey">wafer</span>',M(()=>new C(-2.1,.12,.9)),"",!0);let re=h.label("",M(()=>new C(-3,.4,.4)),"");h.label('<span class="c-grey">tin plasma,<br>hit by a CO\u2082 laser</span>',M(()=>new C(N.x-.55,N.y-.3,0)),"",!0);let he=t.controls(i),A=t.readout(i);function x(){let V=yi[s],ee=V.lam/(4*V.na),fe=c();j.el.innerHTML=$r(V)?'<span class="c-grey">reflective mask, lit at ~6\xB0</span>':'<span class="c-grey">mask</span>',re.el.innerHTML=`<span class="c-yellow">NA ${V.na} cone</span>${V.k==="hna"?'<br><span class="c-grey">anamorphic 4\xD7/8\xD7</span>':""}`,A.innerHTML=`${V.label} \xB7 NA ${V.na}${V.k==="arfi"?' \xB7 <span class="c-cyan">immersion film</span>':$r(V)?" \xB7 vacuum, reflective mask, mirrors":""}: <b>${r} nm</b> lines (k\u2081 = ${(r*V.na/V.lam).toFixed(2)}) at <b>${Math.round(fe*100)}%</b> contrast${fe>lh?"":", too little to print"}. Floor \u2248 <b>${Math.round(ee*10)/10} nm</b>.`}t.segmented&&t.segmented(he,{label:"Source",value:s,options:yi.map((V,ee)=>({label:V.k==="arfi"?"ArFi":V.k==="hna"?"High-NA":V.k.toUpperCase(),value:ee,name:"li3-"+V.k})),onchange:V=>{s=V,qe()}}),t.slider(he,{label:"Half-pitch (nm)",name:"li3-hp",min:5,max:500,step:1,value:r,color:t.C.memory,fmt:V=>`${V}`,oninput:V=>{r=V,qe()}}),t.hint(i,'<span class="c-yellow">\u03BB</span> through mask \u2192 <span class="c-green">resist</span> on <span class="c-blue">wafer</span> \xB7 drag pitch until blur'),qe();let J=_t([{obj:g,delay:0,drop:.18},{obj:p,delay:.1,drop:.12},{obj:Je,delay:.22,drop:.2},{obj:w,delay:.35,drop:.22},{obj:je,delay:.48,drop:.25}],{dur:.95});return o=J,J.arm(),h.view.dist<6.7&&(h.view.dist=6.7),h.ready(),!0}function Xd(i,e){let t=e.ui,n=P=>P<560,s=.4,r=null,a=xt(i,{ui:t,label:"Heat leaves the die through a cold plate, a CDU, and an outdoor reject. A pulse circulates the loop.",height:P=>n(P)?340:320,radius:3.65,radiusY:1.53,yaw:-.4,pitch:.36,target:new C(2.6,.4,.1),fitPad:1.26,fov:26,busy:()=>!0,onShow(){r?.arm(),a&&a.invalidate()},step(P){return r&&r.tick(P),s=(s+P*.18)%1,m.position.lerpVectors(f[Math.floor(s*(f.length-1))],f[Math.min(f.length-1,Math.floor(s*(f.length-1))+1)],s*(f.length-1)%1),h.forEach((v,b)=>{let E=Math.abs(b/(h.length-1)-s);v.mat.emissiveIntensity=E<.2?.35:.06}),a.invalidate(),!0}});if(!a)return!1;yt(a.scene,{hemi:1.35,keyI:1.1,fillI:.4,rimI:.3});let o=new Me;a.scene.add(o);let l=2.6,c=Oe(6.5,.1,1.9,Pn(15264486),.04);c.position.set(l,-.15,0),o.add(c);{let P=new Me;P.position.x=l,o.add(P),rt(P,6.4,1.8,-.08,W(13685964),{t:.03,railH:.05,overhang:.025})}let h=[],d=[],u=[{name:"die",x:0,col:14711354,em:14711354},{name:"plate",x:1.6,col:5162176,em:2795684},{name:"CDU",x:3.4,col:4878292,em:2772916},{name:"out",x:5.2,col:4168260,em:2783796}];u.forEach((P,v)=>{let b=new Me;b.position.set(P.x,0,0),o.add(b),d.push(b);let E=W(P.col,{emissive:P.em,emissiveIntensity:.12,roughness:.4,metalness:.6}),I=Oe(1,.7,1,E,.05);I.position.set(0,.35,0),b.add(I),rt(b,1,1,.72,W(11581632),{t:.04,railH:.06,overhang:.03});for(let S of[-1,1])for(let N=0;N<4;N++){let B=new k(new ve(.55,.05,.03),W(10134704));B.position.set(0,.15+N*.15,S*.52),b.add(B)}let _=new k(new ve(.7,.06,.04),Ge(P.col,{emissive:P.em,emissiveIntensity:.45}));if(_.position.set(0,.55,.52),b.add(_),h.push({mat:E,body:I,g:b}),v===0){let S=Oe(.62,.5,.7,W(13138496,{emissive:14711354,emissiveIntensity:.15,roughness:.35,metalness:.8}),.03);S.position.set((P.x+u[1].x)/2,.35,0),o.add(S)}else if(v<u.length-1){let S=new k(new Re(.09,.09,.55,14),W(14711354,{emissive:14711354,emissiveIntensity:.18,roughness:.28,metalness:.6}));S.rotation.z=Math.PI/2,S.position.set((P.x+u[v+1].x)/2,.4,0),o.add(S);for(let N of[P.x+.55,u[v+1].x-.55]){let B=new k(new Re(.13,.13,.09,12),W(9080984));B.rotation.z=Math.PI/2,B.position.set(N,.4,0),o.add(B);let O=new k(new Lt(.12,.02,6,14),W(6975608));O.rotation.y=Math.PI/2,O.position.set(N,.4,0),o.add(O)}}});for(let[P,v]of[[1.6,3.4],[3.4,5.2]]){let b=new k(new ve(v-P-.2,.07,.07),W(5162176,{emissive:2795684,emissiveIntensity:.15,roughness:.35}));b.position.set((P+v)/2,.05,.7),o.add(b);for(let E of[P+.1,v-.1]){let I=new k(new Ze(.07,10,10),W(9080984));I.position.set(E,.05,.7),o.add(I)}}let f=u.map(P=>new C(P.x,.85,0)),m=new k(new Ze(.12,14,14),Ge(16764006,{emissive:16755251,emissiveIntensity:.6}));o.add(m);let y=new k(new Re(.35,.35,.2,16),W(9080984));y.position.set(5.2,.95,0),o.add(y);for(let P=0;P<4;P++){let v=new k(new ve(.28,.02,.06),W(10528944));v.position.set(5.2,1.07,0),v.rotation.y=P/4*Math.PI*2,o.add(v)}let g=new k(new ve(.7,.08,.7),Ge(5924984));g.position.set(0,.75,0),o.add(g);for(let[P,v]of[[-.22,-.22],[.22,-.22],[-.22,.22],[.22,.22]]){let b=new k(new Re(.04,.04,.03,8),W(12886112));b.position.set(P,.81,v),o.add(b)}for(let P of[-.35,.35]){let v=new k(new Re(.08,.08,.12,12),W(8308932));v.rotation.x=Math.PI/2,v.position.set(3.4,.55,P),o.add(v)}a.label('<span class="c-cyan">plate</span>',()=>new C(1.6,1.25,-.2),""),a.label('<span class="c-blue">CDU</span>',()=>new C(3.4,1.25,-.2),""),a.label("TCS loop",()=>new C(2.5,.05,.95),""),a.label("FWS loop",()=>new C(4.3,.05,.95),"");let p=t.readout(i);p.innerHTML='Heat conducts from the <span class="c-orange">die</span> into the <span class="c-cyan">cold plate</span>; coolant carries it to the <span class="c-blue">CDU</span> (TCS loop), and facility water carries it on to the <span class="c-green">outdoor reject</span> (FWS loop). <span class="c-orange">Warm</span> legs go out on top, <span class="c-cyan">cooled</span> legs return in front.',t.hint(i,"drag to turn \xB7 warm legs orange, cooled legs cyan");let w=_t(d.map((P,v)=>({obj:P,delay:v*.12,drop:.3,fromScale:.5})),{dur:.85});return r=w,w.arm(),a.view.dist<6.8&&(a.view.dist=6.8),a.ready(),!0}var _l=[{name:"embed",short:"embed",cost:"1\xD7",col:12886112,em:10780736},{name:"attention",short:"attn",cost:"4\xD7",col:6986464,em:4881088},{name:"MLP",short:"MLP",cost:"8\xD7",col:4878292,em:2772916},{name:"unembed",short:"out",cost:"1\xD7",col:9071288,em:6965912}];function qd(i,e){let t=e.ui,n=I=>I<560,s=1,r=0,a=null,o=xt(i,{ui:t,label:"One transformer block as four stages. Token ribbons feed embed and leave unembed; attention arcs cross the context.",height:I=>n(I)?320:300,radius:3.5,radiusY:1.48,yaw:-.42,pitch:.42,target:new C(1.72,.45,0),fitPad:1.35,fov:28,busy:()=>!0,step(I){return a&&a.tick(I),r+=I,f.forEach((_,S)=>{let N=(r*.35+S*.17)%1;_.bead.position.lerpVectors(_.a,_.b,N)}),g.forEach((_,S)=>{_.mat.opacity=.15+.35*(s===1?.5+.5*Math.sin(r*3+S):.25)}),o.invalidate(),!0},onShow(){a?.arm(),o&&o.invalidate()}});if(!o)return!1;yt(o.scene,{hemi:1.35,keyI:1.15,fillI:.4,rimI:.32});let l=new Me;o.scene.add(l);let c=1.72,h=Oe(4.7,.12,2,Pn(15264486),.05);h.position.set(c,-.18,0),l.add(h);let d=Oe(4.75,.04,2.05,W(13685964,{roughness:.38}),.03);d.position.set(c,-.12,0),l.add(d);{let I=new Me;I.position.x=c,l.add(I),rt(I,4.65,1.95,-.1,W(13159620),{t:.03,railH:.05,overhang:.025})}let u=[];_l.forEach((I,_)=>{let S=new Me;S.position.set(_*1.15,0,0),l.add(S);let N=W(I.col,{emissive:I.em,emissiveIntensity:.1,roughness:.42,metalness:.55,brush:!0}),B=.55+(I.cost==="8\xD7"?.45:I.cost==="4\xD7"?.25:0),O=Oe(.9,B,1,N,.05);O.position.y=B/2,S.add(O),rt(S,.9,1,B+.02,W(12107976),{t:.035,railH:.05,overhang:.025});for(let F of[-1,1])for(let R=0;R<3;R++){let U=new k(new ve(.035,B*.55,.18),W(11055288));U.position.set(F*.42,B*.35,-.2+R*.2),S.add(U)}for(let F=0;F<4;F++){let R=new k(new ve(.7,.03,.03),W(10134445));R.position.set(0,.12+F*(B*.2),.52),S.add(R)}for(let F of[-.3,.3]){let R=new k(new Ze(.04,10,10),Ge(I.col,{emissive:I.em,emissiveIntensity:.35}));R.position.set(F,B+.08,-.35),S.add(R)}if(u.push({g:S,body:O,mat:N,h:B}),_<3){let F=new k(new Re(.07,.07,.22,12),W(10134445,{shininess:70}));F.rotation.z=Math.PI/2,F.position.set(_*1.15+.55,.38,0),l.add(F);for(let R of[_*1.15+.45,_*1.15+.65]){let U=new k(new Re(.1,.1,.06,12),W(9080984));U.rotation.z=Math.PI/2,U.position.set(R,.38,0),l.add(U)}}});let f=[],m=Ge(15255626,{emissive:15255626,emissiveIntensity:.25,opacity:.85,shininess:20});function y(I,_,S,N,B,O){let F=new C(I,_,S),R=new C(N,B,O),U=F.distanceTo(R),G=new k(new ve(U,.04,.1),m.clone());G.position.copy(F).add(R).multiplyScalar(.5),G.lookAt(R),G.rotateY(Math.PI/2),G.rotation.set(0,0,0),G.scale.set(1,1,1);let q=N-I,H=O-S;G.geometry.dispose(),G.geometry=new ve(Math.hypot(q,H)||U,.035,.09),G.position.set((I+N)/2,(_+B)/2,(S+O)/2),G.rotation.y=-Math.atan2(H,q),l.add(G);let L=new k(new Ze(.09,12,12),Ge(16764006,{emissive:16755251,emissiveIntensity:.55}));L.position.copy(F),l.add(L),f.push({a:F,b:R,bead:L,rib:G})}y(-1.15,.35,-.55,-.35,.35,-.3),y(-1.15,.28,-.2,-.35,.4,-.05),y(-1.15,.42,.15,-.35,.3,.2),y(-1.15,.32,.45,-.35,.38,.4),y(-1.15,.48,.65,-.35,.28,.55),y(.45,.55,.35,.85,.65,.35),y(.45,.4,-.25,.85,.5,-.25),y(1.6,.7,-.35,2,.85,-.35),y(1.6,.55,.3,2,.7,.3),y(2.75,.95,.25,3.15,.55,.25),y(2.75,.75,-.3,3.15,.45,-.3),y(3.85,.4,-.4,4.7,.35,-.55),y(3.85,.35,-.05,4.7,.38,.05),y(3.85,.42,.3,4.7,.4,.4),y(3.85,.3,.55,4.7,.32,.6);let g=[];for(let I=0;I<11;I++){let _=Ge(6986464,{opacity:.28,emissive:4881088,emissiveIntensity:.22,shininess:10}),S=new k(new Lt(.28+I*.07,.015,6,28,Math.PI*.95),_);S.rotation.x=Math.PI/2,S.rotation.z=-.55+I*.12,S.position.set(1.15,u[1].h+.22+I%4*.05,-.15+I%3*.1),l.add(S),g.push({mesh:S,mat:_})}o.label('<span class="c-yellow">embed</span>',()=>new C(0,u[0].h+.55,-.15),""),o.label('<span class="c-blue">attn</span>',()=>new C(1.15,u[1].h+.7,-.15),""),o.label('<span class="c-blue">MLP</span>',()=>new C(2.3,u[2].h+.55,-.15),"");function p(){u.forEach((I,_)=>{let S=_===s;I.mat.emissiveIntensity=S?.42:.08,I.body.scale.setScalar(S?1.06:1)}),b(),o.invalidate()}let w=t.controls(i),P=t.readout(i),v=["Tokens become vectors \u2014 table lookup, small next to what follows.","Every token looks at earlier ones. Cost grows with context \xD7 width.","Feed-forward MLP dominates FLOPs in a dense block (~\u2154 of arithmetic).","Vectors \u2192 next-token logits. Softmax over the vocabulary."];function b(){P.innerHTML=`<b class="c-blue">${_l[s].name}</b> (~${_l[s].cost}): ${v[s]} Dense forward \u2248 <b>2N</b> FLOPs/token.`}t.slider(w,{label:"Stage",name:"xf-stage",min:0,max:3,step:1,value:s,color:t.C.learn,fmt:I=>_l[Math.round(I)].short,oninput:I=>{s=Math.round(I),p()}}),t.hint(i,'<span class="c-yellow">token</span> ribbons \xB7 height \u2248 FLOPs \xB7 mid on <span class="c-blue">attention</span> \xB7 out in prose'),p();let E=_t(u.map((I,_)=>({obj:I.g,delay:_*.1,drop:.35,fromScale:.45})),{dur:.9});return a=E,E.arm(),o.view.dist<6.8&&(o.view.dist=6.8),o.ready(),!0}var xy=(i,e,t,n)=>i+(e-i)*Math.min(1,t*n);function Yd(i,e){let t=e.ui,n=B=>B<560,s={a:!0,arm:[.92,.55]},r=null,a=xt(i,{ui:t,label:"Relay cascade: the first contact energises the second coil. Logic stacks without a hand on the second key.",height:B=>n(B)?360:320,radius:2.6,radiusY:1.4,yaw:-.4,pitch:.36,target:new C(.5,.55,.2),fitPad:1.15,fov:26,busy:()=>!0,onShow(){r?.arm(),a&&a.invalidate()},step(B){if(r&&!r.done)return r.tick(B),b(),!0;let O=s.a,F=s.arm[0]>.9;return[[O,0],[F,1]].forEach(([R,U])=>{let G=R?1:0,q=xy(s.arm[U],G,10,B);s.arm[U]=Math.abs(q-G)<.002?G:q}),b(),!0}});if(!a)return!1;yt(a.scene,{hemi:1.4,keyI:1.2,fillI:.45,rimI:.32});let o=new Me;a.scene.add(o);let l=Oe(4.4,.12,2.1,Qi(222),.05);l.position.set(.55,-.1,-.05),o.add(l),rt(o,4.3,2,-.02,Qi(196,{lift:.3}),{t:.035,railH:.05,overhang:.03});let c=Yr(o,-1.2,0,.55,"A"),h=Yr(o,.7,0,-.55,"B"),d=[c,h];[[-1.6,.55],[-.4,.2],[.9,-.35],[2,-.4]].forEach(([B,O],F,R)=>{if(F===R.length-1)return;let[U,G]=R[F+1],q=U-B,H=G-O,L=Math.hypot(q,H),z=new k(new ve(L,.02,.07),W(13215820,{shininess:55}));z.position.set((B+U)/2,-.04,(O+G)/2),z.rotation.y=-Math.atan2(H,q),o.add(z)});let u=new k(new ve(1.6,.04,.08),W(15255626,{emissive:15255626,emissiveIntensity:.2}));u.position.set(-.15,.55,.05),u.rotation.y=-.55,o.add(u);let f=new k(new ve(1.55,.03,.05),W(13938762,{emissive:15255626,emissiveIntensity:.12}));f.position.set(-.15,.48,.12),f.rotation.y=-.55,o.add(f);let m=[];for(let B=0;B<3;B++){let O=new k(new Ze(.055,10,10),Ge(16764006,{emissive:16755251,emissiveIntensity:.4}));O.position.set(-.9+B*.55,.58,.35-B*.28),o.add(O),m.push(O)}let y=new Me;y.position.set(2.5,.35,-.4),o.add(y);let g=new k(new Re(.22,.28,.12,16),W(9080984));g.position.y=-.28,y.add(g);let p=new k(new Ze(.26,18,18),Ge(15000800,{shininess:40}));y.add(p);let w=new k(new ve(1.1,.03,.05),W(13215820));w.position.set(1.85,.12,-.4),o.add(w);let P=new k(jt(.45,.18,.45,.05),Pn(14212326,{emissive:0,emissiveIntensity:0}));P.position.set(-1.2,.05,1.05),o.add(P);let v=new k(new Re(.06,.06,.2,10),W(10134445));v.position.set(-1.2,-.02,1.05),o.add(v),a.label('<span class="c-orange">A</span>',()=>new C(-1.2,1.35,.55),""),a.label('<span class="c-orange">B</span> <span class="c-grey">driven</span>',()=>new C(.7,1.05,-.55),""),a.label('<span class="c-yellow">lamp</span>',()=>new C(2.5,.85,-.4),""),a.label('<span class="c-orange">cascade</span>',()=>new C(-.1,.85,.2),"");function b(){d.forEach((R,U)=>{let G=s.arm[U];R.armRoot.rotation.z=-.42+(.02- -.42)*G;let q=U===0?s.a:s.arm[0]>.9;R.mCoil.emissiveIntensity=q?.35:.05,R.mCoil.color.setHex(q?6986464:4878292)});let F=s.arm[1]>.9;p.material.emissive=new He(F?15245344:0),p.material.emissiveIntensity=F?.7:0,p.material.color.setHex(F?15910991:15000800),u.material.emissiveIntensity=s.arm[0]>.9?.55:.12,f.material.emissiveIntensity=s.arm[0]>.9?.4:.08,m.forEach((R,U)=>{let G=s.arm[0]>.9;R.material.emissiveIntensity=G?.65:.1,R.visible=G||U===0}),P.material.emissiveIntensity=s.a?.25:0,P.position.y=s.a?0:.05,_(),a.invalidate()}let E=t.controls(i),I=t.readout(i);function _(){I.innerHTML=s.a?`Key A down: coil A pulls \u2192 contact feeds <b class="c-blue">coil B</b>. Lamp <b>${s.arm[1]>.9?"on":"catching up"}</b>.`:"Release A and both armatures fall. Stacked contacts \u2014 Shannon depth, lever mass still hurts."}t.button(E,"Toggle A",()=>{s.a=!s.a,a.kick()},{kind:"primary",name:"rc3-a"}),t.hint(i,'one key \xB7 <span class="c-orange">cascade</span> throws the second coil');let S=new ui,N=new Ue;return a.canvas.addEventListener("click",B=>{let O=a.canvas.getBoundingClientRect();N.set((B.clientX-O.left)/O.width*2-1,-((B.clientY-O.top)/O.height)*2+1),S.setFromCamera(N,a.camera),S.intersectObject(P,!0)[0]&&(s.a=!s.a,a.kick())}),r=_t([{obj:l,delay:0,drop:.2},{obj:c.g,delay:.12,drop:.28},{obj:h.g,delay:.28,drop:.28},{obj:y,delay:.42,drop:.22},{obj:P,delay:.5,drop:.15,fromScale:.6}]),b(),a.view.dist<6&&(a.view.dist=6),a.ready(),!0}var ch=(i,e,t)=>Math.max(e,Math.min(t,i));function vl(i,e={}){return Ge(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function $d(i,e){let t=e.ui,n=t.C,s=R=>R<560,r=20,a=2.2,o=20,l=null,c=xt(i,{ui:t,label:"Two piles on a desk: model parameters and training tokens. The height ratio is tokens per parameter. Drag sideways to turn; the slider sets the ratio. About 20:1 is compute-optimal (Chinchilla).",height:R=>s(R)?Math.round(Math.max(300,R*.9)):Math.round(Math.min(420,R*.52)),radius:3.8,radiusY:2.8,yaw:-.55,pitch:.48,target:new C(0,1.35,0),fitPad:1.25,fov:36,busy:()=>!!(l&&!l.done)||t.isPlaying(),onShow(){l?.arm(),c&&c.invalidate()},step(R){if(l&&!l.done)return l.tick(R),!0;if(!t.isPlaying())return b.forEach(G=>G.m.visible=!1),!1;let U=S(v);return b.forEach(G=>{G.t+=R/1.1,G.t>=1&&(G.t-=1,G.x=(Math.random()-.5)*.7,G.z=(Math.random()-.5)*.7);let q=G.t*G.t;G.m.visible=G.t>0,G.m.position.set(1.5+G.x,U+1.5-1.38*q,G.z),G.m.rotation.set(G.t*2.1,G.t*1.3,0)}),!0}});if(!c)return!1;let{scene:h}=c;yt(h,{hemi:.95,keyI:1.3,fillI:.38,rimI:.45,envI:1});let d=new Me;h.add(d);let u=Oe(5.2,.12,2.9,W(12888186,{roughness:.45,metalness:.35,brush:!1}),.04);u.position.y=0,d.add(u);{let R=Oe(5.35,.08,3.05,W(11044960,{roughness:.4,metalness:.4,brush:!1}),.03);R.position.set(0,-.08,0),d.add(R)}rt(d,5.15,2.85,.08,W(12097640),{t:.035,railH:.05,overhang:.03});let f=new Me;f.position.set(-1.4,.06,0),d.add(f);let m=vl(4878292,{emissive:2772916,emissiveIntensity:.12}),y=W(14205040);for(let R=0;R<4;R++)for(let U=0;U<3;U++)for(let G=0;G<3;G++){let q=new k(new ve(.32,.32,.32),m);if(q.position.set((U-1)*.36,.2+R*.36,(G-1)*.36),f.add(q),R===3){let H=new k(new ve(.34,.03,.34),W(6983636));H.position.copy(q.position),H.position.y+=.175,f.add(H)}}fl(f,1.15,.04,1.15,W(3825588),1.55);let g=new Me;g.position.set(1.5,.06,0),d.add(g);let p=vl(4168260,{emissive:2783796,emissiveIntensity:.1}),w=[],P=24;for(let R=0;R<P;R++)for(let U=0;U<4;U++)for(let G=0;G<4;G++){if(R>8&&(U+G+R)%3===0)continue;let q=new k(new ve(.22,.22,.22),p.clone());q.position.set((U-1.5)*.26+R%2*.05,.14+R*.23,(G-1.5)*.26+R%2*.04),q.visible=!1,g.add(q),w.push({mesh:q,layer:R})}let v=2,b=[0,-.36,-.7].map(R=>{let U=new k(new ve(.22,.22,.22),p);return U.visible=!1,d.add(U),{m:U,t:R,x:(Math.random()-.5)*.7,z:(Math.random()-.5)*.7}}),E=new k(new ve(2.4,.06,.08),vl(6971480));E.position.set(.05,.55,1.2),d.add(E);let I=new k(new Ze(.1,12,12),vl(14711354,{emissive:14711354,emissiveIntensity:.4}));I.position.set(.05,.7,1.2),d.add(I);let _=new Pt({color:2829098,transparent:!0,opacity:.2});d.traverse(R=>{if(!(!R.isMesh||!R.geometry||R.geometry.type==="SphereGeometry"))try{R.add(new Dt(new Ot(R.geometry,30),_.clone()))}catch{}}),c.label('<span class="c-blue">parameters</span>',()=>new C(-1.4,1.85,0),""),c.label('<span class="c-green">tokens</span>',()=>new C(2.8,a,.25),""),c.label("~20:1 optimal",()=>Math.abs(r-o)<3?new C(.05,1,1.2):null,"");function S(R){return .14+Math.max(0,R-1)*.23+.12}function N(){let R=ch(Math.round(2+Math.log10(Math.max(r,1))*8.5),2,16);v=R;for(let{mesh:H,layer:L}of w)H.visible=L<R;let U=S(R),G=ch(.85+U*.35,1,2.4);c.setFocus({target:new C(0,G,0),radius:3.8,radiusY:Math.max(2.4,U*.85+.6),pitch:.46});let q=ch(Math.log10(r/2)/Math.log10(100/2),0,1);I.position.x=-1+q*2.1,a=Math.max(.5,U*.62),c.invalidate()}let B=t.controls(i),O=t.readout(i);function F(){let R=r>=o?r>o*1.5?"past compute-optimal \u2014 more tokens than Chinchilla would spend on this model size":"near compute-optimal (Chinchilla ~20 tokens per parameter)":"under-trained vs Chinchilla \u2014 more parameters than the token budget warrants";O.innerHTML=`<b>${r>=10?Math.round(r):r.toPrecision(2)} tokens per parameter</b> \xB7 ${R}.`,N()}return t.slider(B,{label:"Tokens / param",name:"ratio",min:1,max:200,step:1,value:r,color:n.learn||n.cyan||"#3f9a44",fmt:R=>`${R}\xD7`,oninput:R=>{r=R,F()}}),t.hint(i,"raise toward 20\xD7 (Chinchilla)"),F(),c.view.dist=Math.max(c.view.dist,7.6),l=_t([{obj:u,delay:0,drop:.15},{obj:f,delay:.15,drop:.35},{obj:g,delay:.35,drop:.45}]),c.ready(),!0}window.AIX3D={lossSurface:bd,mosfet3d:wd,factoryZoom:Rd,triode3d:Ld,coldPlate3d:Nd,package3d:Ud,tokenBalance3d:$d,cmos3d:Bd,systolic3d:Hd,nvlinkPair3d:zd,yield3d:kd,relay3d:Vd,litho3d:Wd,heatLoop3d:Xd,transformer3d:qd,cascade3d:Yd};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
