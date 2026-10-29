(()=>{var Jh=0,rc=1,Kh=2;var Tr=1,jh=2,Ls=3,Sn=0,Bt=1,Zt=2,Zn=0,Ds=1,Ar=2,ac=3,oc=4,Qh=5;var $i=100,eu=101,tu=102,nu=103,iu=104,su=200,ru=201,au=202,ou=203,lc=204,cc=205,lu=206,cu=207,hu=208,uu=209,du=210,fu=211,pu=212,mu=213,gu=214,Sa=0,wa=1,Ta=2,vs=3,Aa=4,Ra=5,Ca=6,Ia=7,Rr=0,xu=1,yu=2,Hn=0,hc=1,uc=2,dc=3,Cr=4,fc=5,pc=6,mc=7;var gc=300,Li=301,Zi=302,ho=303,uo=304,Ir=306,Vi=1e3,Xn=1001,Pa=1002,$t=1003,_u=1004;var Pr=1005;var Kt=1006,fo=1007;var Di=1008;var un=1009,xc=1010,yc=1011,Ns=1012,po=1013,Gn=1014,wn=1015,zn=1016,mo=1017,go=1018,Us=1020,_c=35902,vc=35899,Mc=1021,bc=1022,Tn=1023,qn=1026,Ni=1027,xo=1028,yo=1029,Ui=1030,_o=1031;var vo=1033,Lr=33776,Dr=33777,Nr=33778,Ur=33779,Mo=35840,bo=35841,Eo=35842,So=35843,wo=36196,To=37492,Ao=37496,Ro=37488,Co=37489,Fr=37490,Io=37491,Po=37808,Lo=37809,Do=37810,No=37811,Uo=37812,Fo=37813,Bo=37814,Oo=37815,Ho=37816,Go=37817,zo=37818,ko=37819,Vo=37820,Wo=37821,Xo=36492,qo=36494,Yo=36495,$o=36283,Zo=36284,Br=36285,Jo=36286;var ir=2300,La=2301,ba=2302,Zl=2303,Jl=2400,Kl=2401,jl=2402;var vu=3200;var Fs=0,Mu=1,An="",kt="srgb",sr="srgb-linear",rr="linear",Mt="srgb";var Ti=7680,Ec=7681;var Sc=517;var Ko=519,bu=512,Eu=513,Su=514,jo=515,wu=516,Tu=517,Qo=518,Au=519,Ru=35044;var wc="300 es",Nn=2e3,Ms=2001;function jd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Qd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Cu(){let i=ar("canvas");return i.style.display="block",i}var xh={},bs=null;function Tc(...i){let e="THREE."+i.shift();bs?bs("log",e,...i):console.log(e,...i)}function Iu(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ze(...i){i=Iu(i);let e="THREE."+i.shift();if(bs)bs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Qe(...i){i=Iu(i);let e="THREE."+i.shift();if(bs)bs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ki(...i){let e=i.join(" ");e in xh||(xh[e]=!0,Ze(...i))}function Pu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Lu={[Sa]:wa,[Ta]:Ca,[Aa]:Ia,[vs]:Ra,[wa]:Sa,[Ca]:Ta,[Ia]:Aa,[Ra]:vs},Yn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ea=Math.PI/180,Da=180/Math.PI;function Or(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function lt(i,e,t){return Math.max(e,Math.min(t,i))}function ef(i,e){return(i%e+e)%e}function Ml(i,e,t){return(1-t)*i+t*e}function Ys(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Lc=class Lc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Lc.prototype.isVector2=!0;var De=Lc,$n=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*x;m<0&&(u=-u,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){let A=Math.acos(m),D=Math.sin(A);p=Math.sin(p*A)/D,o=Math.sin(o*A)/D,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+x*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+x*o;let A=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=A,c*=A,h*=A,d*=A}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-o*f,e[t+2]=c*g+h*f+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Ze("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Dc=class Dc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(yh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(yh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return bl.copy(this).projectOnVector(e),this.sub(bl)}reflect(e){return this.sub(bl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Dc.prototype.isVector3=!0;var P=Dc,bl=new P,yh=new $n,Nc=class Nc{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],A=s[1],D=s[4],M=s[7],v=s[2],b=s[5],I=s[8];return r[0]=a*x+o*A+l*v,r[3]=a*m+o*D+l*b,r[6]=a*p+o*M+l*I,r[1]=c*x+h*A+d*v,r[4]=c*m+h*D+d*b,r[7]=c*p+h*M+d*I,r[2]=u*x+f*A+g*v,r[5]=u*m+f*D+g*b,r[8]=u*p+f*M+g*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=t*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(s*c-h*n)*x,e[2]=(o*n-s*a)*x,e[3]=u*x,e[4]=(h*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return ki("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(El.makeScale(e,t)),this}rotate(e){return ki("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(El.makeRotation(-e)),this}translate(e,t){return ki("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(El.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Nc.prototype.isMatrix3=!0;var tt=Nc,El=new tt,_h=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vh=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tf(){let i={enabled:!0,workingColorSpace:sr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Mt&&(s.r=li(s.r),s.g=li(s.g),s.b=li(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Mt&&(s.r=_s(s.r),s.g=_s(s.g),s.b=_s(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===An?rr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ki("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ki("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[sr]:{primaries:e,whitePoint:n,transfer:rr,toXYZ:_h,fromXYZ:vh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:n,transfer:Mt,toXYZ:_h,fromXYZ:vh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),i}var ht=tf();function li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _s(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var rs,Na=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{rs===void 0&&(rs=ar("canvas")),rs.width=e.width,rs.height=e.height;let s=rs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=rs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ar("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=li(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(li(t[n]/255)*255):t[n]=li(t[n]);return{data:t,width:e.width,height:e.height}}else return Ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},nf=0,Es=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=Or(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Sl(s[a].image)):r.push(Sl(s[a]))}else r=Sl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Sl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Na.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ze("Texture: Unable to serialize Texture."),{})}var sf=0,wl=new P,on=class i extends Yn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Xn,s=Xn,r=Kt,a=Di,o=Tn,l=un,c=i.DEFAULT_ANISOTROPY,h=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=Or(),this.name="",this.source=new Es(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wl).x}get height(){return this.source.getSize(wl).y}get depth(){return this.source.getSize(wl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ze(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vi:e.x=e.x-Math.floor(e.x);break;case Xn:e.x=e.x<0?0:1;break;case Pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vi:e.y=e.y-Math.floor(e.y);break;case Xn:e.y=e.y<0?0:1;break;case Pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=gc;on.DEFAULT_ANISOTROPY=1;var Uc=class Uc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let D=(c+1)/2,M=(f+1)/2,v=(p+1)/2,b=(h+u)/4,I=(d+x)/4,_=(g+m)/4;return D>M&&D>v?D<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(D),s=b/n,r=I/n):M>v?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=b/s,r=_/s):v<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(v),n=I/r,s=_/r),this.set(n,s,r,t),this}let A=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(d-x)/A,this.z=(u-h)/A,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Uc.prototype.isVector4=!0;var It=Uc,Ua=class extends Yn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new It(0,0,e,t),this.scissorTest=!1,this.viewport=new It(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new on(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Es(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},hn=class extends Ua{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},or=class extends on{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Fa=class extends on{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var co=class co{constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,x,m)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new co().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/as.setFromMatrixColumn(e,0).length(),r=1/as.setFromMatrixColumn(e,1).length(),a=1/as.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,f=a*d,g=o*h,x=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-x*c,t[9]=-o*l,t[2]=x-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,g=c*h,x=c*d;t[0]=u+x*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=x+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,g=c*h,x=c*d;t[0]=u-x*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,g=o*h,x=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+x,t[1]=l*d,t[5]=x*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*h,t[4]=x-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-x*d}else if(e.order==="XZY"){let u=a*l,f=a*c,g=o*l,x=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+x,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=x*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rf,e,af)}lookAt(e,t,n){let s=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),Mi.crossVectors(n,dn),Mi.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),Mi.crossVectors(n,dn)),Mi.normalize(),Jr.crossVectors(dn,Mi),s[0]=Mi.x,s[4]=Jr.x,s[8]=dn.x,s[1]=Mi.y,s[5]=Jr.y,s[9]=dn.y,s[2]=Mi.z,s[6]=Jr.z,s[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],A=n[3],D=n[7],M=n[11],v=n[15],b=s[0],I=s[4],_=s[8],w=s[12],N=s[1],O=s[5],B=s[9],U=s[13],S=s[2],F=s[6],z=s[10],W=s[14],H=s[3],C=s[7],G=s[11],L=s[15];return r[0]=a*b+o*N+l*S+c*H,r[4]=a*I+o*O+l*F+c*C,r[8]=a*_+o*B+l*z+c*G,r[12]=a*w+o*U+l*W+c*L,r[1]=h*b+d*N+u*S+f*H,r[5]=h*I+d*O+u*F+f*C,r[9]=h*_+d*B+u*z+f*G,r[13]=h*w+d*U+u*W+f*L,r[2]=g*b+x*N+m*S+p*H,r[6]=g*I+x*O+m*F+p*C,r[10]=g*_+x*B+m*z+p*G,r[14]=g*w+x*U+m*W+p*L,r[3]=A*b+D*N+M*S+v*H,r[7]=A*I+D*O+M*F+v*C,r[11]=A*_+D*B+M*z+v*G,r[15]=A*w+D*U+M*W+v*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15],A=l*f-c*u,D=o*f-c*d,M=o*u-l*d,v=a*f-c*h,b=a*u-l*h,I=a*d-o*h;return t*(x*A-m*D+p*M)-n*(g*A-m*v+p*b)+s*(g*D-x*v+p*I)-r*(g*M-x*b+m*I)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],A=t*o-n*a,D=t*l-s*a,M=t*c-r*a,v=n*l-s*o,b=n*c-r*o,I=s*c-r*l,_=h*x-d*g,w=h*m-u*g,N=h*p-f*g,O=d*m-u*x,B=d*p-f*x,U=u*p-f*m,S=A*U-D*B+M*O+v*N-b*w+I*_;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/S;return e[0]=(o*U-l*B+c*O)*F,e[1]=(s*B-n*U-r*O)*F,e[2]=(x*I-m*b+p*v)*F,e[3]=(u*b-d*I-f*v)*F,e[4]=(l*N-a*U-c*w)*F,e[5]=(t*U-s*N+r*w)*F,e[6]=(m*M-g*I-p*D)*F,e[7]=(h*I-u*M+f*D)*F,e[8]=(a*B-o*N+c*_)*F,e[9]=(n*N-t*B-r*_)*F,e[10]=(g*b-x*M+p*A)*F,e[11]=(d*M-h*b-f*A)*F,e[12]=(o*w-a*O-l*_)*F,e[13]=(t*O-n*w+s*_)*F,e[14]=(x*D-g*v-m*A)*F,e[15]=(h*v-d*D+u*A)*F,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,x=a*h,m=a*d,p=o*d,A=l*c,D=l*h,M=l*d,v=n.x,b=n.y,I=n.z;return s[0]=(1-(x+p))*v,s[1]=(f+M)*v,s[2]=(g-D)*v,s[3]=0,s[4]=(f-M)*b,s[5]=(1-(u+p))*b,s[6]=(m+A)*b,s[7]=0,s[8]=(g+D)*I,s[9]=(m-A)*I,s[10]=(1-(u+x))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=as.set(s[0],s[1],s[2]).length(),o=as.set(s[4],s[5],s[6]).length(),l=as.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Pn.copy(this);let c=1/a,h=1/o,d=1/l;return Pn.elements[0]*=c,Pn.elements[1]*=c,Pn.elements[2]*=c,Pn.elements[4]*=h,Pn.elements[5]*=h,Pn.elements[6]*=h,Pn.elements[8]*=d,Pn.elements[9]*=d,Pn.elements[10]*=d,t.setFromRotationMatrix(Pn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Nn,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===Nn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Ms)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Nn,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s),g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===Nn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Ms)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};co.prototype.isMatrix4=!0;var ft=co,as=new P,Pn=new ft,rf=new P(0,0,0),af=new P(1,1,1),Mi=new P,Jr=new P,dn=new P,Mh=new ft,bh=new $n,Un=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-lt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Mh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bh.setFromEuler(this),this.setFromQuaternion(bh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Un.DEFAULT_ORDER="XYZ";var Ss=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},of=0,Eh=new P,os=new $n,ni=new ft,Kr=new P,$s=new P,lf=new P,cf=new $n,Sh=new P(1,0,0),wh=new P(0,1,0),Th=new P(0,0,1),Ah={type:"added"},hf={type:"removed"},ls={type:"childadded",child:null},Tl={type:"childremoved",child:null},zt=class i extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=Or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new Un,n=new $n,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ft},normalMatrix:{value:new tt}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ss,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return os.setFromAxisAngle(e,t),this.quaternion.multiply(os),this}rotateOnWorldAxis(e,t){return os.setFromAxisAngle(e,t),this.quaternion.premultiply(os),this}rotateX(e){return this.rotateOnAxis(Sh,e)}rotateY(e){return this.rotateOnAxis(wh,e)}rotateZ(e){return this.rotateOnAxis(Th,e)}translateOnAxis(e,t){return Eh.copy(e).applyQuaternion(this.quaternion),this.position.add(Eh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Sh,e)}translateY(e){return this.translateOnAxis(wh,e)}translateZ(e){return this.translateOnAxis(Th,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Kr.copy(e):Kr.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt($s,Kr,this.up):ni.lookAt(Kr,$s,this.up),this.quaternion.setFromRotationMatrix(ni),s&&(ni.extractRotation(s.matrixWorld),os.setFromRotationMatrix(ni),this.quaternion.premultiply(os.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ah),ls.child=e,this.dispatchEvent(ls),ls.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(hf),Tl.child=e,this.dispatchEvent(Tl),Tl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ah),ls.child=e,this.dispatchEvent(ls),ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,e,lf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,cf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};zt.DEFAULT_UP=new P(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var be=class extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}},uf={type:"move"},ws=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new be,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new be,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new be,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(uf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new be;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Du={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},jr={h:0,s:0,l:0};function Al(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Be=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ht.workingColorSpace){if(e=ef(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Al(a,r,e+1/3),this.g=Al(a,r,e),this.b=Al(a,r,e-1/3)}return ht.colorSpaceToWorking(this,s),this}setStyle(e,t=kt){function n(r){r!==void 0&&parseFloat(r)<1&&Ze("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ze("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){let n=Du[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=li(e.r),this.g=li(e.g),this.b=li(e.b),this}copyLinearToSRGB(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return ht.workingToColorSpace(tn.copy(this),e),Math.round(lt(tn.r*255,0,255))*65536+Math.round(lt(tn.g*255,0,255))*256+Math.round(lt(tn.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.workingToColorSpace(tn.copy(this),t);let n=tn.r,s=tn.g,r=tn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ht.workingColorSpace){return ht.workingToColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=kt){ht.workingToColorSpace(tn.copy(this),e);let t=tn.r,n=tn.g,s=tn.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(bi),this.setHSL(bi.h+e,bi.s+t,bi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bi),e.getHSL(jr);let n=Ml(bi.h,jr.h,t),s=Ml(bi.s,jr.s,t),r=Ml(bi.l,jr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},tn=new Be;Be.NAMES=Du;var Wi=class extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ln=new P,ii=new P,Rl=new P,si=new P,cs=new P,hs=new P,Rh=new P,Cl=new P,Il=new P,Pl=new P,Ll=new It,Dl=new It,Nl=new It,oi=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Ln.subVectors(e,t),s.cross(Ln);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Ln.subVectors(s,t),ii.subVectors(n,t),Rl.subVectors(e,t);let a=Ln.dot(Ln),o=Ln.dot(ii),l=Ln.dot(Rl),c=ii.dot(ii),h=ii.dot(Rl),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,si.x),l.addScaledVector(a,si.y),l.addScaledVector(o,si.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Ll.setScalar(0),Dl.setScalar(0),Nl.setScalar(0),Ll.fromBufferAttribute(e,t),Dl.fromBufferAttribute(e,n),Nl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ll,r.x),a.addScaledVector(Dl,r.y),a.addScaledVector(Nl,r.z),a}static isFrontFacing(e,t,n,s){return Ln.subVectors(n,t),ii.subVectors(e,t),Ln.cross(ii).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),Ln.cross(ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;cs.subVectors(s,n),hs.subVectors(r,n),Cl.subVectors(e,n);let l=cs.dot(Cl),c=hs.dot(Cl);if(l<=0&&c<=0)return t.copy(n);Il.subVectors(e,s);let h=cs.dot(Il),d=hs.dot(Il);if(h>=0&&d<=h)return t.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(cs,a);Pl.subVectors(e,r);let f=cs.dot(Pl),g=hs.dot(Pl);if(g>=0&&f<=g)return t.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(hs,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Rh.subVectors(r,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(Rh,o);let p=1/(m+x+u);return a=x*p,o=u*p,t.copy(n).addScaledVector(cs,a).addScaledVector(hs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},mn=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Dn):Dn.fromBufferAttribute(r,a),Dn.applyMatrix4(e.matrixWorld),this.expandByPoint(Dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qr.copy(n.boundingBox)),Qr.applyMatrix4(e.matrixWorld),this.union(Qr)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Dn),Dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),ea.subVectors(this.max,Zs),us.subVectors(e.a,Zs),ds.subVectors(e.b,Zs),fs.subVectors(e.c,Zs),Ei.subVectors(ds,us),Si.subVectors(fs,ds),Oi.subVectors(us,fs);let t=[0,-Ei.z,Ei.y,0,-Si.z,Si.y,0,-Oi.z,Oi.y,Ei.z,0,-Ei.x,Si.z,0,-Si.x,Oi.z,0,-Oi.x,-Ei.y,Ei.x,0,-Si.y,Si.x,0,-Oi.y,Oi.x,0];return!Ul(t,us,ds,fs,ea)||(t=[1,0,0,0,1,0,0,0,1],!Ul(t,us,ds,fs,ea))?!1:(ta.crossVectors(Ei,Si),t=[ta.x,ta.y,ta.z],Ul(t,us,ds,fs,ea))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ri=[new P,new P,new P,new P,new P,new P,new P,new P],Dn=new P,Qr=new mn,us=new P,ds=new P,fs=new P,Ei=new P,Si=new P,Oi=new P,Zs=new P,ea=new P,ta=new P,Hi=new P;function Ul(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Hi.fromArray(i,r);let o=s.x*Math.abs(Hi.x)+s.y*Math.abs(Hi.y)+s.z*Math.abs(Hi.z),l=e.dot(Hi),c=t.dot(Hi),h=n.dot(Hi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Gt=new P,na=new De,df=0,an=class extends Yn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:df++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ru,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)na.fromBufferAttribute(this,t),na.applyMatrix3(e),this.setXY(t,na.x,na.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ys(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ys(t,this.array)),t}setX(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ys(t,this.array)),t}setY(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ys(t,this.array)),t}setZ(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ys(t,this.array)),t}setW(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),n=cn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),n=cn(n,this.array),s=cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),n=cn(n,this.array),s=cn(s,this.array),r=cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var lr=class extends an{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var cr=class extends an{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var at=class extends an{constructor(e,t,n){super(new Float32Array(e),t,n)}},ff=new mn,Js=new P,Fl=new P,ci=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ff.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Js.subVectors(e,this.center);let t=Js.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Js,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Js.copy(e.center).add(Fl)),this.expandByPoint(Js.copy(e.center).sub(Fl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},pf=0,bn=new ft,Bl=new zt,ps=new P,fn=new mn,Ks=new mn,Yt=new P,Ct=class i extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=Or(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jd(e)?cr:lr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new tt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return Bl.lookAt(e),Bl.updateMatrix(),this.applyMatrix4(Bl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ps).negate(),this.translate(ps.x,ps.y,ps.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new at(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ci);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Yt.addVectors(fn.min,Ks.min),fn.expandByPoint(Yt),Yt.addVectors(fn.max,Ks.max),fn.expandByPoint(Yt)):(fn.expandByPoint(Ks.min),fn.expandByPoint(Ks.max))}fn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Yt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Yt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Yt.fromBufferAttribute(o,c),l&&(ps.fromBufferAttribute(e,c),Yt.add(ps)),s=Math.max(s,n.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new an(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new P,l[_]=new P;let c=new P,h=new P,d=new P,u=new De,f=new De,g=new De,x=new P,m=new P;function p(_,w,N){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,N),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,N),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let O=1/(f.x*g.y-g.x*f.y);isFinite(O)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(O),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(O),o[_].add(x),o[w].add(x),o[N].add(x),l[_].add(m),l[w].add(m),l[N].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let _=0,w=A.length;_<w;++_){let N=A[_],O=N.start,B=N.count;for(let U=O,S=O+B;U<S;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let D=new P,M=new P,v=new P,b=new P;function I(_){v.fromBufferAttribute(s,_),b.copy(v);let w=o[_];D.copy(w),D.sub(v.multiplyScalar(v.dot(w))).normalize(),M.crossVectors(b,w);let O=M.dot(l[_])<0?-1:1;a.setXYZW(_,D.x,D.y,D.z,O)}for(let _=0,w=A.length;_<w;++_){let N=A[_],O=N.start,B=N.count;for(let U=O,S=O+B;U<S;U+=3)I(e.getX(U+0)),I(e.getX(U+1)),I(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new an(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,d=new P;if(e)for(let u=0,f=e.count;u<f;u+=3){let g=e.getX(u+0),x=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Yt.fromBufferAttribute(e,t),Yt.normalize(),e.setXYZ(t,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new an(u,h,d)}if(this.index===null)return Ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ol=new P,mf=new P,gf=new tt,pn=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Ol.subVectors(n,t).cross(mf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Ol),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||gf.getNormalMatrix(e),s=this.coplanarPoint(Ol).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},xf=0,Fn=class extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=Or(),this.name="",this.type="Material",this.blending=Ds,this.side=Sn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lc,this.blendDst=cc,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ko,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ze(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new pn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new De().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new De().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ai=new P,Hl=new P,ia=new P,sa=new P,Ts=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Hl.copy(e).add(t).multiplyScalar(.5),ia.copy(t).sub(e).normalize(),sa.copy(this.origin).sub(Hl);let r=e.distanceTo(t)*.5,a=-this.direction.dot(ia),o=sa.dot(this.direction),l=-sa.dot(ia),c=sa.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Hl).addScaledVector(ia,u),f}intersectSphere(e,t){if(e.radius<0)return null;ai.subVectors(e.center,this.origin);let n=ai.dot(this.direction),s=ai.dot(ai)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,g=t.x-a.x,x=t.y-a.y,m=t.z-a.z,p=n.x-a.x,A=n.y-a.y,D=n.z-a.z,M=Math.abs(l),v=Math.abs(c),b=Math.abs(h),I,_,w,N,O,B,U,S,F,z,W,H;if(M>=v&&M>=b?(w=l,B=d,F=g,H=p,l>=0?(I=c,_=h,N=u,O=f,U=x,S=m,z=A,W=D):(I=h,_=c,N=f,O=u,U=m,S=x,z=D,W=A)):v>=b?(w=c,B=u,F=x,H=A,c>=0?(I=h,_=l,N=f,O=d,U=m,S=g,z=D,W=p):(I=l,_=h,N=d,O=f,U=g,S=m,z=p,W=D)):(w=h,B=f,F=m,H=D,h>=0?(I=l,_=c,N=d,O=u,U=g,S=x,z=p,W=A):(I=c,_=l,N=u,O=d,U=x,S=g,z=A,W=p)),w===0)return null;let C=I/w,G=_/w,L=1/w,X=N-C*B,ee=O-G*B,te=U-C*F,se=S-G*F,ce=z-C*H,Z=W-G*H,J=ce*se-Z*te,pe=X*Z-ee*ce,ge=te*ee-se*X;if(s){if(J<0||pe<0||ge<0)return null}else if((J<0||pe<0||ge<0)&&(J>0||pe>0||ge>0))return null;let xe=J+pe+ge;if(xe===0)return null;let $e=L*(J*B+pe*F+ge*H);return(xe>0?$e<0:$e>0)?null:this.at($e/xe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},nn=class extends Fn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Rr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ch=new ft,Gi=new Ts,ra=new ci,Ih=new P,aa=new P,oa=new P,la=new P,Gl=new P,ca=new P,Ph=new P,ha=new P,k=class extends zt{constructor(e=new Ct,t=new nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){ca.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(Gl.fromBufferAttribute(d,e),a?ca.addScaledVector(Gl,h):ca.addScaledVector(Gl.sub(t),h))}t.add(ca)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ra.copy(n.boundingSphere),ra.applyMatrix4(r),Gi.copy(e.ray).recast(e.near),!(ra.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(ra,Ih)===null||Gi.origin.distanceToSquared(Ih)>(e.far-e.near)**2))&&(Ch.copy(r).invert(),Gi.copy(e.ray).applyMatrix4(Ch),!(n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=a[m.materialIndex],A=Math.max(m.start,f.start),D=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=A,v=D;M<v;M+=3){let b=o.getX(M),I=o.getX(M+1),_=o.getX(M+2);s=ua(this,p,e,n,c,h,d,b,I,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let A=o.getX(m),D=o.getX(m+1),M=o.getX(m+2);s=ua(this,a,e,n,c,h,d,A,D,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=a[m.materialIndex],A=Math.max(m.start,f.start),D=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=A,v=D;M<v;M+=3){let b=M,I=M+1,_=M+2;s=ua(this,p,e,n,c,h,d,b,I,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let A=m,D=m+1,M=m+2;s=ua(this,a,e,n,c,h,d,A,D,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function yf(i,e,t,n,s,r,a,o){let l;if(e.side===Bt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Sn,o),l===null)return null;ha.copy(o),ha.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ha);return c<t.near||c>t.far?null:{distance:c,point:ha.clone(),object:i}}function ua(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,aa),i.getVertexPosition(l,oa),i.getVertexPosition(c,la);let h=yf(i,e,t,n,aa,oa,la,Ph);if(h){let d=new P;oi.getBarycoord(Ph,aa,oa,la,d),s&&(h.uv=oi.getInterpolatedAttribute(s,o,l,c,d,new De)),r&&(h.uv1=oi.getInterpolatedAttribute(r,o,l,c,d,new De)),a&&(h.normal=oi.getInterpolatedAttribute(a,o,l,c,d,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new P,materialIndex:0};oi.getNormal(aa,oa,la,u.normal),h.face=u,h.barycoord=d}return h}var hr=class extends on{constructor(e=null,t=1,n=1,s,r,a,o,l,c=$t,h=$t,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var As=class extends an{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ms=new ft,Lh=new ft,da=[],Dh=new mn,_f=new ft,js=new k,Qs=new ci,hi=class extends k{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new As(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,_f)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new mn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ms),Dh.copy(e.boundingBox).applyMatrix4(ms),this.boundingBox.union(Dh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ci),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ms),Qs.copy(e.boundingSphere).applyMatrix4(ms),this.boundingSphere.union(Qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(js.geometry=this.geometry,js.material=this.material,js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qs.copy(this.boundingSphere),Qs.applyMatrix4(n),e.ray.intersectsSphere(Qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ms),Lh.multiplyMatrices(n,ms),js.matrixWorld=Lh,js.raycast(e,da);for(let a=0,o=da.length;a<o;a++){let l=da[a];l.instanceId=r,l.object=this,t.push(l)}da.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new As(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new hr(new Float32Array(s*this.count),s,this.count,xo,wn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},zi=new ci,vf=new De(.5,.5),fa=new P,Rs=class{constructor(e=new pn,t=new pn,n=new pn,s=new pn,r=new pn,a=new pn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Nn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],A=r[12],D=r[13],M=r[14],v=r[15];if(s[0].setComponents(c-a,f-h,p-g,v-A).normalize(),s[1].setComponents(c+a,f+h,p+g,v+A).normalize(),s[2].setComponents(c+o,f+d,p+x,v+D).normalize(),s[3].setComponents(c-o,f-d,p-x,v-D).normalize(),n)s[4].setComponents(l,u,m,M).normalize(),s[5].setComponents(c-l,f-u,p-m,v-M).normalize();else if(s[4].setComponents(c-l,f-u,p-m,v-M).normalize(),t===Nn)s[5].setComponents(c+l,f+u,p+m,v+M).normalize();else if(t===Ms)s[5].setComponents(l,u,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(e){zi.center.set(0,0,0);let t=vf.distanceTo(e.center);return zi.radius=.7071067811865476+t,zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(fa.x=s.normal.x>0?e.max.x:e.min.x,fa.y=s.normal.y>0?e.max.y:e.min.y,fa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(fa)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Dt=class extends Fn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ba=new P,Oa=new P,Nh=new ft,er=new Ts,pa=new ci,zl=new P,Uh=new P,ur=class extends zt{constructor(e=new Ct,t=new Dt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Ba.fromBufferAttribute(t,s-1),Oa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Ba.distanceTo(Oa);e.setAttribute("lineDistance",new at(n,1))}else Ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(s),pa.radius+=r,e.ray.intersectsSphere(pa)===!1)return;Nh.copy(s).invert(),er.copy(e.ray).applyMatrix4(Nh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=c){let p=h.getX(x),A=h.getX(x+1),D=ma(this,e,er,l,p,A,x);D&&t.push(D)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(f),p=ma(this,e,er,l,x,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=c){let p=ma(this,e,er,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=ma(this,e,er,l,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ma(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(Ba.fromBufferAttribute(o,s),Oa.fromBufferAttribute(o,r),t.distanceSqToSegment(Ba,Oa,zl,Uh)>n)return;zl.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(zl);if(!(c<e.near||c>e.far))return{distance:c,point:Uh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Fh=new P,Bh=new P,Ft=class extends ur{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Fh.fromBufferAttribute(t,s),Bh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Fh.distanceTo(Bh);e.setAttribute("lineDistance",new at(n,1))}else Ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var dr=class extends on{constructor(e=[],t=Li,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},En=class extends on{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Ai=class extends on{constructor(e,t,n=Gn,s,r,a,o=$t,l=$t,c,h=qn,d=1){if(h!==qn&&h!==Ni)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Es(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ha=class extends Ai{constructor(e,t=Gn,n=Li,s,r,a=$t,o=$t,l,c=qn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},fr=class extends on{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ye=class i extends Ct{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(d,2));function g(x,m,p,A,D,M,v,b,I,_,w){let N=M/I,O=v/_,B=M/2,U=v/2,S=b/2,F=I+1,z=_+1,W=0,H=0,C=new P;for(let G=0;G<z;G++){let L=G*O-U;for(let X=0;X<F;X++){let ee=X*N-B;C[x]=ee*A,C[m]=L*D,C[p]=S,c.push(C.x,C.y,C.z),C[x]=0,C[m]=0,C[p]=b>0?1:-1,h.push(C.x,C.y,C.z),d.push(X/I),d.push(1-G/_),W+=1}}for(let G=0;G<_;G++)for(let L=0;L<I;L++){let X=u+L+F*G,ee=u+L+F*(G+1),te=u+(L+1)+F*(G+1),se=u+(L+1)+F*G;l.push(X,ee,se),l.push(ee,te,se),H+=6}o.addGroup(f,H,w),f+=H,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Xi=class i extends Ct{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,g=n*2+r,x=s+1,m=new P,p=new P;for(let A=0;A<=g;A++){let D=0,M=0,v=0,b=0;if(A<=n){let w=A/n,N=w*Math.PI/2;M=-h-e*Math.cos(N),v=e*Math.sin(N),b=-e*Math.cos(N),D=w*d}else if(A<=n+r){let w=(A-n)/r;M=-h+w*t,v=e,b=0,D=d+w*u}else{let w=(A-n-r)/n,N=w*Math.PI/2;M=h+e*Math.sin(N),v=e*Math.cos(N),b=e*Math.sin(N),D=d+u+w*d}let I=Math.max(0,Math.min(1,D/f)),_=0;A===0?_=.5/s:A===g&&(_=-.5/s);for(let w=0;w<=s;w++){let N=w/s,O=N*Math.PI*2,B=Math.sin(O),U=Math.cos(O);p.x=-v*U,p.y=M,p.z=v*B,o.push(p.x,p.y,p.z),m.set(-v*U,b,v*B),m.normalize(),l.push(m.x,m.y,m.z),c.push(N+_,I)}if(A>0){let w=(A-1)*x;for(let N=0;N<s;N++){let O=w+N,B=w+N+1,U=A*x+N,S=A*x+N+1;a.push(O,B,U),a.push(B,S,U)}}}this.setIndex(a),this.setAttribute("position",new at(o,3)),this.setAttribute("normal",new at(l,3)),this.setAttribute("uv",new at(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},pr=class i extends Ct{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new P,h=new De;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new at(a,3)),this.setAttribute("normal",new at(o,3)),this.setAttribute("uv",new at(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ae=class i extends Ct{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,x=[],m=n/2,p=0;A(),a===!1&&(e>0&&D(!0),t>0&&D(!1)),this.setIndex(h),this.setAttribute("position",new at(d,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(f,2));function A(){let M=new P,v=new P,b=0,I=(t-e)/n;for(let _=0;_<=r;_++){let w=[],N=_/r,O=N*(t-e)+e;for(let B=0;B<=s;B++){let U=B/s,S=U*l+o,F=Math.sin(S),z=Math.cos(S);v.x=O*F,v.y=-N*n+m,v.z=O*z,d.push(v.x,v.y,v.z),M.set(F,I,z).normalize(),u.push(M.x,M.y,M.z),f.push(U,1-N),w.push(g++)}x.push(w)}for(let _=0;_<s;_++)for(let w=0;w<r;w++){let N=x[w][_],O=x[w+1][_],B=x[w+1][_+1],U=x[w][_+1];(e>0||w!==0)&&(h.push(N,O,U),b+=3),(t>0||w!==r-1)&&(h.push(O,B,U),b+=3)}c.addGroup(p,b,0),p+=b}function D(M){let v=g,b=new De,I=new P,_=0,w=M===!0?e:t,N=M===!0?1:-1;for(let B=1;B<=s;B++)d.push(0,m*N,0),u.push(0,N,0),f.push(.5,.5),g++;let O=g;for(let B=0;B<=s;B++){let S=B/s*l+o,F=Math.cos(S),z=Math.sin(S);I.x=w*z,I.y=m*N,I.z=w*F,d.push(I.x,I.y,I.z),u.push(0,N,0),b.x=F*.5+.5,b.y=z*.5*N+.5,f.push(b.x,b.y),g++}for(let B=0;B<s;B++){let U=v+B,S=O+B;M===!0?h.push(S,S+1,U):h.push(S+1,S,U),_+=3}c.addGroup(p,_,M===!0?1:2),p+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ga=class i extends Ae{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var ga=new P,xa=new P,kl=new P,ya=new oi,Vt=class extends Ct{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(Ea*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:x,b:m,c:p}=ya;if(x.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),ya.getNormal(kl),d[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let A=0;A<3;A++){let D=(A+1)%3,M=d[A],v=d[D],b=ya[h[A]],I=ya[h[D]],_=`${M}_${v}`,w=`${v}_${M}`;w in u&&u[w]?(kl.dot(u[w].normal)<=r&&(f.push(b.x,b.y,b.z),f.push(I.x,I.y,I.z)),u[w]=null):_ in u||(u[_]={index0:c[A],index1:c[D],normal:kl.clone()})}}for(let g in u)if(u[g]){let{index0:x,index1:m}=u[g];ga.fromBufferAttribute(o,x),xa.fromBufferAttribute(o,m),f.push(ga.x,ga.y,ga.z),f.push(xa.x,xa.y,xa.z)}this.setAttribute("position",new at(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},gn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ze("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new De:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,s=[],r=[],a=[],o=new P,l=new ft;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(lt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(lt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},mr=class extends gn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new De){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},za=class extends mr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ac(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var Oh=new P,Hh=new P,Vl=new Ac,Wl=new Ac,Xl=new Ac,ka=class extends gn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new P){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Hh.subVectors(s[0],s[1]).add(s[0]),c=Hh);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Oh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Oh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),Vl.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,x,m),Wl.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,x,m),Xl.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(Vl.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Wl.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Xl.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Vl.calc(l),Wl.calc(l),Xl.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new P().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Gh(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function Mf(i,e){let t=1-i;return t*t*e}function bf(i,e){return 2*(1-i)*i*e}function Ef(i,e){return i*i*e}function tr(i,e,t,n){return Mf(i,e)+bf(i,t)+Ef(i,n)}function Sf(i,e){let t=1-i;return t*t*t*e}function wf(i,e){let t=1-i;return 3*t*t*i*e}function Tf(i,e){return 3*(1-i)*i*i*e}function Af(i,e){return i*i*i*e}function nr(i,e,t,n,s){return Sf(i,e)+wf(i,t)+Tf(i,n)+Af(i,s)}var Va=class extends gn{constructor(e=new De,t=new De,n=new De,s=new De){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new De){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(nr(e,s.x,r.x,a.x,o.x),nr(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Wa=class extends gn{constructor(e=new P,t=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new P){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(nr(e,s.x,r.x,a.x,o.x),nr(e,s.y,r.y,a.y,o.y),nr(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Xa=class extends gn{constructor(e=new De,t=new De){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new De){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new De){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Cs=class extends gn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qa=class extends gn{constructor(e=new De,t=new De,n=new De){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new De){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(tr(e,s.x,r.x,a.x),tr(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qi=class extends gn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(tr(e,s.x,r.x,a.x),tr(e,s.y,r.y,a.y),tr(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ya=class extends gn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new De){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Gh(o,l.x,c.x,h.x,d.x),Gh(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new De().fromArray(s))}return this}},Ql=Object.freeze({__proto__:null,ArcCurve:za,CatmullRomCurve3:ka,CubicBezierCurve:Va,CubicBezierCurve3:Wa,EllipseCurve:mr,LineCurve:Xa,LineCurve3:Cs,QuadraticBezierCurve:qa,QuadraticBezierCurve3:qi,SplineCurve:Ya}),gr=class extends gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ql[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Ql[s.type]().fromJSON(s))}return this}};var Bn=class i extends Ct{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let A=p*u-a;for(let D=0;D<c;D++){let M=D*d-r;g.push(M,-A,0),x.push(0,0,1),m.push(D/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let A=0;A<o;A++){let D=A+c*p,M=A+c*(p+1),v=A+1+c*(p+1),b=A+1+c*p;f.push(D,M,b),f.push(M,v,b)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(x,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Je=class i extends Ct{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new P,u=new P,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let A=[],D=p/n,M=a+D*o,v=e*Math.cos(M),b=Math.sqrt(e*e-v*v),I=0;p===0&&a===0?I=.5/t:p===n&&l===Math.PI&&(I=-.5/t);for(let _=0;_<=t;_++){let w=_/t,N=s+w*r;d.x=-b*Math.cos(N),d.y=v,d.z=b*Math.sin(N),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(w+I,1-D),A.push(c++)}h.push(A)}for(let p=0;p<n;p++)for(let A=0;A<t;A++){let D=h[p][A+1],M=h[p][A],v=h[p+1][A],b=h[p+1][A+1];(p!==0||a>0)&&f.push(D,M,b),(p!==n-1||l<Math.PI)&&f.push(M,v,b)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(x,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Pt=class i extends Ct{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new P,f=new P,g=new P;for(let x=0;x<=n;x++){let m=a+x/n*o;for(let p=0;p<=s;p++){let A=p/s*r;f.x=(e+t*Math.cos(m))*Math.cos(A),f.y=(e+t*Math.cos(m))*Math.sin(A),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),u.x=e*Math.cos(A),u.y=e*Math.sin(A),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let m=1;m<=s;m++){let p=(s+1)*x+m-1,A=(s+1)*(x-1)+m-1,D=(s+1)*(x-1)+m,M=(s+1)*x+m;l.push(p,A,M),l.push(A,D,M)}this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Yi=class i extends Ct{constructor(e=new qi(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,l=new P,c=new De,h=new P,d=[],u=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new at(d,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(f,2));function x(){for(let D=0;D<t;D++)m(D);m(r===!1?t:0),A(),p()}function m(D){h=e.getPointAt(D/t,h);let M=a.normals[D],v=a.binormals[D];for(let b=0;b<=s;b++){let I=b/s*Math.PI*2,_=Math.sin(I),w=-Math.cos(I);l.x=w*M.x+_*v.x,l.y=w*M.y+_*v.y,l.z=w*M.z+_*v.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let D=1;D<=t;D++)for(let M=1;M<=s;M++){let v=(s+1)*(D-1)+(M-1),b=(s+1)*D+(M-1),I=(s+1)*D+M,_=(s+1)*(D-1)+M;g.push(v,b,_),g.push(b,I,_)}}function A(){for(let D=0;D<=t;D++)for(let M=0;M<=s;M++)c.x=D/t,c.y=M/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Ql[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Ji(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(zh(s))s.isRenderTargetTexture?(Ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(zh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function sn(i){let e={};for(let t=0;t<i.length;t++){let n=Ji(i[t]);for(let s in n)e[s]=n[s]}return e}function zh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Rf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Rc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}var Nu={clone:Ji,merge:sn},Cf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,If=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ln=class extends Fn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cf,this.fragmentShader=If,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ji(e.uniforms),this.uniformsGroups=Rf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Be().setHex(s.value);break;case"v2":this.uniforms[n].value=new De().fromArray(s.value);break;case"v3":this.uniforms[n].value=new P().fromArray(s.value);break;case"v4":this.uniforms[n].value=new It().fromArray(s.value);break;case"m3":this.uniforms[n].value=new tt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ft().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},$a=class extends ln{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},On=class extends Fn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xr=class extends On{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new De(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},yr=class extends Fn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Be(16777215),this.specular=new Be(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Rr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var _r=class extends Fn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Rr,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Za=class extends Fn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ja=class extends Fn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function gs(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function ql(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ri=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ka=class extends Ri{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Jl,endingEnd:Jl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Kl:r=e,o=2*t-n;break;case jl:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Kl:a=e,l=2*n-t;break;case jl:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,p=-u*m+2*u*x-u*g,A=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,D=(-1-f)*m+(1.5+f)*x+.5*g,M=f*m-f*x;for(let v=0;v!==o;++v)r[v]=p*a[h+v]+A*a[c+v]+D*a[l+v]+M*a[d+v];return r}},ja=class extends Ri{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},Qa=class extends Ri{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},eo=class extends Ri{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-t)/(s-t),x=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*x+a[l+m]*g;return r}let u=o*2,f=e-1;for(let g=0;g!==o;++g){let x=a[c+g],m=a[l+g],p=f*u+g*2,A=d[p],D=d[p+1],M=e*u+g*2,v=h[M],b=h[M+1],I=Lf(n,t,A,v,s);r[g]=Uu(I,x,D,b,m)}return r}};function Uu(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Pf(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Lf(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=Uu(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Pf(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var xn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=gs(t,this.TimeBufferType),this.values=gs(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:gs(e.times,Array),values:gs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),ql(e.settings)&&(n.settings={inTangents:gs(e.settings.inTangents,Array),outTangents:gs(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Qa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ka(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new eo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ir:t=this.InterpolantFactoryMethodDiscrete;break;case La:t=this.InterpolantFactoryMethodLinear;break;case ba:t=this.InterpolantFactoryMethodSmooth;break;case Zl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ze("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ir;case this.InterpolantFactoryMethodLinear:return La;case this.InterpolantFactoryMethodSmooth:return ba;case this.InterpolantFactoryMethodBezier:return Zl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;ql(this.settings)&&(kh(this.settings.inTangents,e),kh(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Qe("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Qe("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Qe("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Qd(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Qe("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ba,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let x=t[d+g];if(x!==t[u+g]||x!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,ql(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function kh(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=La;var Ci=class extends xn{constructor(e,t,n){super(e,t,n)}};Ci.prototype.ValueTypeName="bool";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=ir;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var to=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}};to.prototype.ValueTypeName="color";var no=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}};no.prototype.ValueTypeName="number";var io=class extends Ri{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)$n.slerpFlat(r,0,a,c-o,a,c,l);return r}},vr=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new io(this.times,this.values,this.getValueSize(),e)}};vr.prototype.ValueTypeName="quaternion";vr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends xn{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="string";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=ir;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var so=class extends xn{constructor(e,t,n,s){super(e,t,n,s)}};so.prototype.ValueTypeName="vector";var ro=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Fu=new ro,ao=class{constructor(e){this.manager=e!==void 0?e:Fu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ao.DEFAULT_MATERIAL_NAME="__DEFAULT";var Is=class extends zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Mr=class extends Is{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Yl=new ft,Vh=new P,Wh=new P,br=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rs,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new It(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Vh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Vh),Wh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Yl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Yl,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Ms||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Yl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},_a=new P,va=new $n,Wn=new P,Er=class extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=Nn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(_a,va,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_a,va,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(_a,va,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_a,va,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},wi=new P,Xh=new De,qh=new De,Jt=class extends Er{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Da*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ea*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Da*2*Math.atan(Math.tan(Ea*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(wi.x,wi.y).multiplyScalar(-e/wi.z),wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(wi.x,wi.y).multiplyScalar(-e/wi.z)}getViewSize(e,t){return this.getViewBounds(e,Xh,qh),t.subVectors(qh,Xh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ea*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var ec=class extends br{constructor(){super(new Jt(90,1,.5,500)),this.isPointLightShadow=!0}},Sr=class extends Is{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ec}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ps=class extends Er{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},tc=class extends br{constructor(){super(new Ps(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Pi=class extends Is{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new tc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var xs=-90,ys=1,oo=class extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Jt(xs,ys,e,t);s.layers=this.layers,this.add(s);let r=new Jt(xs,ys,e,t);r.layers=this.layers,this.add(r);let a=new Jt(xs,ys,e,t);a.layers=this.layers,this.add(a);let o=new Jt(xs,ys,e,t);o.layers=this.layers,this.add(o);let l=new Jt(xs,ys,e,t);l.layers=this.layers,this.add(l);let c=new Jt(xs,ys,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ms)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},lo=class extends Jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Cc="\\[\\]\\.:\\/",Df=new RegExp("["+Cc+"]","g"),Ic="[^"+Cc+"]",Nf="[^"+Cc.replace("\\.","")+"]",Uf=/((?:WC+[\/:])*)/.source.replace("WC",Ic),Ff=/(WCOD+)?/.source.replace("WCOD",Nf),Bf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ic),Of=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ic),Hf=new RegExp("^"+Uf+Ff+Bf+Of+"$"),Gf=["material","materials","bones","map"],nc=class{constructor(e,t,n){let s=n||Rt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Rt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Df,"")}static parseTrackName(e){let t=Hf.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Gf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ze("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Qe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Qe("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Rt.Composite=nc;Rt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Rt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Rt.prototype.GetterByBindingType=[Rt.prototype._getValue_direct,Rt.prototype._getValue_array,Rt.prototype._getValue_arrayElement,Rt.prototype._getValue_toArray];Rt.prototype.SetterByBindingTypeAndVersioning=[[Rt.prototype._setValue_direct,Rt.prototype._setValue_direct_setNeedsUpdate,Rt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_array,Rt.prototype._setValue_array_setNeedsUpdate,Rt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_arrayElement,Rt.prototype._setValue_arrayElement_setNeedsUpdate,Rt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Rt.prototype._setValue_fromArray,Rt.prototype._setValue_fromArray_setNeedsUpdate,Rt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var uy=new Float32Array(1);var Yh=new ft,ui=class{constructor(e,t,n=0,s=1/0){this.ray=new Ts(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ss,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Yh.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yh),this}intersectObject(e,t=!0,n=[]){return ic(e,this,n,t),n.sort($h),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)ic(e[s],this,n,t);return n.sort($h),n}};function $h(i,e){return i.distance-e.distance}function ic(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)ic(r[a],e,t,!0)}}var Fc=class Fc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Fc.prototype.isMatrix2=!0;var sc=Fc;var Zh=new P,Ma,$l,wr=class extends zt{constructor(e=new P(0,0,1),t=new P(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",Ma===void 0&&(Ma=new Ct,Ma.setAttribute("position",new at([0,0,0,0,1,0],3)),$l=new Ga(.5,1,5,1),$l.translate(0,-.5,0)),this.position.copy(t),this.line=new ur(Ma,new Dt({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new k($l,new nn({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Zh.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Zh,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}};function Pc(i,e,t,n){let s=zf(n);switch(t){case Mc:return i*e;case xo:return i*e/s.components*s.byteLength;case yo:return i*e/s.components*s.byteLength;case Ui:return i*e*2/s.components*s.byteLength;case _o:return i*e*2/s.components*s.byteLength;case bc:return i*e*3/s.components*s.byteLength;case Tn:return i*e*4/s.components*s.byteLength;case vo:return i*e*4/s.components*s.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Nr:case Ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bo:case So:return Math.max(i,16)*Math.max(e,8)/4;case Mo:case Eo:return Math.max(i,8)*Math.max(e,8)/2;case wo:case To:case Ro:case Co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ao:case Fr:case Io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case No:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Fo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Oo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ho:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Go:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case zo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ko:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Vo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Xo:case qo:case Yo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case $o:case Zo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Br:case Jo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zf(i){switch(i){case un:case xc:return{byteLength:1,components:1};case Ns:case yc:case zn:return{byteLength:2,components:1};case mo:case go:return{byteLength:2,components:4};case Gn:case po:case wn:return{byteLength:4,components:1};case _c:case vc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function sd(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function $f(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let x=d[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Zf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jf=`#ifdef USE_ALPHAHASH
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
#endif`,Kf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ep=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tp=`#ifdef USE_AOMAP
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
#endif`,np=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ip=`#ifdef USE_BATCHING
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
#endif`,sp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ap=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,op=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,lp=`#ifdef USE_IRIDESCENCE
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
#endif`,cp=`#ifdef USE_BUMPMAP
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
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,yp=`#define PI 3.141592653589793
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
} // validated`,_p=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vp=`vec3 transformedNormal = objectNormal;
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
#endif`,Mp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ap=`#ifdef USE_ENVMAP
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
#endif`,Rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Ip=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
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
#endif`,Lp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Np=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Up=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fp=`#ifdef USE_GRADIENTMAP
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
}`,Bp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Op=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,zp=`#ifdef USE_ENVMAP
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
#endif`,kp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
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
#endif`,Yp=`uniform sampler2D dfgLUT;
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
}`,$p=`
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
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Jp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,t0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,n0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,i0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,s0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,r0=`#if defined( USE_POINTS_UV )
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
#endif`,a0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,o0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,l0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,c0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,h0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u0=`#ifdef USE_MORPHTARGETS
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
#endif`,d0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,f0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,p0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,m0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,x0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,y0=`#ifdef USE_NORMALMAP
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
#endif`,_0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,v0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,M0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,b0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,E0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,S0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,w0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,T0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,A0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,R0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,C0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,I0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,P0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,L0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,D0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,N0=`float getShadowMask() {
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
}`,U0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,F0=`#ifdef USE_SKINNING
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
#endif`,B0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,O0=`#ifdef USE_SKINNING
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
#endif`,H0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,G0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,z0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,k0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,V0=`#ifdef USE_TRANSMISSION
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
#endif`,W0=`#ifdef USE_TRANSMISSION
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
#endif`,X0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Z0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,J0=`uniform sampler2D t2D;
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
}`,K0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,em=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tm=`#include <common>
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
}`,nm=`#if DEPTH_PACKING == 3200
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
}`,im=`#define DISTANCE
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
}`,sm=`#define DISTANCE
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
}`,rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,am=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`uniform float scale;
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
}`,lm=`uniform vec3 diffuse;
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
}`,cm=`#include <common>
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
}`,hm=`uniform vec3 diffuse;
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
}`,um=`#define LAMBERT
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
}`,dm=`#define LAMBERT
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
}`,fm=`#define MATCAP
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
}`,pm=`#define MATCAP
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
}`,mm=`#define NORMAL
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
}`,gm=`#define NORMAL
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
}`,xm=`#define PHONG
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
}`,ym=`#define PHONG
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
}`,_m=`#define STANDARD
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
}`,vm=`#define STANDARD
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
}`,Mm=`#define TOON
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
}`,bm=`#define TOON
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
}`,Em=`uniform float size;
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
}`,Sm=`uniform vec3 diffuse;
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
}`,wm=`#include <common>
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
}`,Tm=`uniform vec3 color;
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
}`,Am=`uniform float rotation;
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
}`,Rm=`uniform vec3 diffuse;
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
}`,rt={alphahash_fragment:Zf,alphahash_pars_fragment:Jf,alphamap_fragment:Kf,alphamap_pars_fragment:jf,alphatest_fragment:Qf,alphatest_pars_fragment:ep,aomap_fragment:tp,aomap_pars_fragment:np,batching_pars_vertex:ip,batching_vertex:sp,begin_vertex:rp,beginnormal_vertex:ap,bsdfs:op,iridescence_fragment:lp,bumpmap_pars_fragment:cp,clipping_planes_fragment:hp,clipping_planes_pars_fragment:up,clipping_planes_pars_vertex:dp,clipping_planes_vertex:fp,color_fragment:pp,color_pars_fragment:mp,color_pars_vertex:gp,color_vertex:xp,common:yp,cube_uv_reflection_fragment:_p,defaultnormal_vertex:vp,displacementmap_pars_vertex:Mp,displacementmap_vertex:bp,emissivemap_fragment:Ep,emissivemap_pars_fragment:Sp,colorspace_fragment:wp,colorspace_pars_fragment:Tp,envmap_fragment:Ap,envmap_common_pars_fragment:Rp,envmap_pars_fragment:Cp,envmap_pars_vertex:Ip,envmap_physical_pars_fragment:zp,envmap_vertex:Pp,fog_vertex:Lp,fog_pars_vertex:Dp,fog_fragment:Np,fog_pars_fragment:Up,gradientmap_pars_fragment:Fp,lightmap_pars_fragment:Bp,lights_lambert_fragment:Op,lights_lambert_pars_fragment:Hp,lights_pars_begin:Gp,lights_toon_fragment:kp,lights_toon_pars_fragment:Vp,lights_phong_fragment:Wp,lights_phong_pars_fragment:Xp,lights_physical_fragment:qp,lights_physical_pars_fragment:Yp,lights_fragment_begin:$p,lights_fragment_maps:Zp,lights_fragment_end:Jp,lightprobes_pars_fragment:Kp,logdepthbuf_fragment:jp,logdepthbuf_pars_fragment:Qp,logdepthbuf_pars_vertex:e0,logdepthbuf_vertex:t0,map_fragment:n0,map_pars_fragment:i0,map_particle_fragment:s0,map_particle_pars_fragment:r0,metalnessmap_fragment:a0,metalnessmap_pars_fragment:o0,morphinstance_vertex:l0,morphcolor_vertex:c0,morphnormal_vertex:h0,morphtarget_pars_vertex:u0,morphtarget_vertex:d0,normal_fragment_begin:f0,normal_fragment_maps:p0,normal_pars_fragment:m0,normal_pars_vertex:g0,normal_vertex:x0,normalmap_pars_fragment:y0,clearcoat_normal_fragment_begin:_0,clearcoat_normal_fragment_maps:v0,clearcoat_pars_fragment:M0,iridescence_pars_fragment:b0,opaque_fragment:E0,packing:S0,premultiplied_alpha_fragment:w0,project_vertex:T0,dithering_fragment:A0,dithering_pars_fragment:R0,roughnessmap_fragment:C0,roughnessmap_pars_fragment:I0,shadowmap_pars_fragment:P0,shadowmap_pars_vertex:L0,shadowmap_vertex:D0,shadowmask_pars_fragment:N0,skinbase_vertex:U0,skinning_pars_vertex:F0,skinning_vertex:B0,skinnormal_vertex:O0,specularmap_fragment:H0,specularmap_pars_fragment:G0,tonemapping_fragment:z0,tonemapping_pars_fragment:k0,transmission_fragment:V0,transmission_pars_fragment:W0,uv_pars_fragment:X0,uv_pars_vertex:q0,uv_vertex:Y0,worldpos_vertex:$0,background_vert:Z0,background_frag:J0,backgroundCube_vert:K0,backgroundCube_frag:j0,cube_vert:Q0,cube_frag:em,depth_vert:tm,depth_frag:nm,distance_vert:im,distance_frag:sm,equirect_vert:rm,equirect_frag:am,linedashed_vert:om,linedashed_frag:lm,meshbasic_vert:cm,meshbasic_frag:hm,meshlambert_vert:um,meshlambert_frag:dm,meshmatcap_vert:fm,meshmatcap_frag:pm,meshnormal_vert:mm,meshnormal_frag:gm,meshphong_vert:xm,meshphong_frag:ym,meshphysical_vert:_m,meshphysical_frag:vm,meshtoon_vert:Mm,meshtoon_frag:bm,points_vert:Em,points_frag:Sm,shadow_vert:wm,shadow_frag:Tm,sprite_vert:Am,sprite_frag:Rm},Re={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},Kn={basic:{uniforms:sn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:sn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:sn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:sn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:sn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Be(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:sn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:sn([Re.points,Re.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:sn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:sn([Re.common,Re.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:sn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:sn([Re.sprite,Re.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distance:{uniforms:sn([Re.common,Re.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distance_vert,fragmentShader:rt.distance_frag},shadow:{uniforms:sn([Re.lights,Re.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};Kn.physical={uniforms:sn([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var el={r:0,b:0,g:0},Cm=new ft,rd=new tt;rd.set(-1,0,0,0,1,0,0,0,1);function Im(i,e,t,n,s,r){let a=new Be(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(A){let D=A.isScene===!0?A.background:null;if(D&&D.isTexture){let M=A.backgroundBlurriness>0;D=e.get(D,M)}return D}function g(A){let D=!1,M=f(A);M===null?m(a,o):M&&M.isColor&&(m(M,1),D=!0);let v=i.xr.getEnvironmentBlendMode();v==="additive"?t.buffers.color.setClear(0,0,0,1,r):v==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||D)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(A,D){let M=f(D);M&&(M.isCubeTexture||M.mapping===Ir)?(c===void 0&&(c=new k(new ye(1,1,1),new ln({name:"BackgroundCubeMaterial",uniforms:Ji(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(v,b,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Cm.makeRotationFromEuler(D.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(rd),c.material.toneMapped=ht.getTransfer(M.colorSpace)!==Mt,(h!==M||d!==M.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new k(new Bn(2,2),new ln({name:"BackgroundMaterial",uniforms:Ji(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,l.material.toneMapped=ht.getTransfer(M.colorSpace)!==Mt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function m(A,D){A.getRGB(el,Rc(i)),t.buffers.color.setClear(el.r,el.g,el.b,D,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,D=1){a.set(A),o=D,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,m(a,o)},render:g,addToRenderList:x,dispose:p}}function Pm(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(O,B,U,S,F){let z=!1,W=d(O,S,U,B);r!==W&&(r=W,c(r.object)),z=f(O,S,U,F),z&&g(O,S,U,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,M(O,B,U,S),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return i.createVertexArray()}function c(O){return i.bindVertexArray(O)}function h(O){return i.deleteVertexArray(O)}function d(O,B,U,S){let F=S.wireframe===!0,z=n[B.id];z===void 0&&(z={},n[B.id]=z);let W=O.isInstancedMesh===!0?O.id:0,H=z[W];H===void 0&&(H={},z[W]=H);let C=H[U.id];C===void 0&&(C={},H[U.id]=C);let G=C[F];return G===void 0&&(G=u(l()),C[F]=G),G}function u(O){let B=[],U=[],S=[];for(let F=0;F<t;F++)B[F]=0,U[F]=0,S[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:U,attributeDivisors:S,object:O,attributes:{},index:null}}function f(O,B,U,S){let F=r.attributes,z=B.attributes,W=0,H=U.getAttributes();for(let C in H)if(H[C].location>=0){let L=F[C],X=z[C];if(X===void 0&&(C==="instanceMatrix"&&O.instanceMatrix&&(X=O.instanceMatrix),C==="instanceColor"&&O.instanceColor&&(X=O.instanceColor)),L===void 0||L.attribute!==X||X&&L.data!==X.data)return!0;W++}return r.attributesNum!==W||r.index!==S}function g(O,B,U,S){let F={},z=B.attributes,W=0,H=U.getAttributes();for(let C in H)if(H[C].location>=0){let L=z[C];L===void 0&&(C==="instanceMatrix"&&O.instanceMatrix&&(L=O.instanceMatrix),C==="instanceColor"&&O.instanceColor&&(L=O.instanceColor));let X={};X.attribute=L,L&&L.data&&(X.data=L.data),F[C]=X,W++}r.attributes=F,r.attributesNum=W,r.index=S}function x(){let O=r.newAttributes;for(let B=0,U=O.length;B<U;B++)O[B]=0}function m(O){p(O,0)}function p(O,B){let U=r.newAttributes,S=r.enabledAttributes,F=r.attributeDivisors;U[O]=1,S[O]===0&&(i.enableVertexAttribArray(O),S[O]=1),F[O]!==B&&(i.vertexAttribDivisor(O,B),F[O]=B)}function A(){let O=r.newAttributes,B=r.enabledAttributes;for(let U=0,S=B.length;U<S;U++)B[U]!==O[U]&&(i.disableVertexAttribArray(U),B[U]=0)}function D(O,B,U,S,F,z,W){W===!0?i.vertexAttribIPointer(O,B,U,F,z):i.vertexAttribPointer(O,B,U,S,F,z)}function M(O,B,U,S){x();let F=S.attributes,z=U.getAttributes(),W=B.defaultAttributeValues;for(let H in z){let C=z[H];if(C.location>=0){let G=F[H];if(G===void 0&&(H==="instanceMatrix"&&O.instanceMatrix&&(G=O.instanceMatrix),H==="instanceColor"&&O.instanceColor&&(G=O.instanceColor)),G!==void 0){let L=G.normalized,X=G.itemSize,ee=e.get(G);if(ee===void 0)continue;let te=ee.buffer,se=ee.type,ce=ee.bytesPerElement,Z=se===i.INT||se===i.UNSIGNED_INT||G.gpuType===po;if(G.isInterleavedBufferAttribute){let J=G.data,pe=J.stride,ge=G.offset;if(J.isInstancedInterleavedBuffer){for(let xe=0;xe<C.locationSize;xe++)p(C.location+xe,J.meshPerAttribute);O.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let xe=0;xe<C.locationSize;xe++)m(C.location+xe);i.bindBuffer(i.ARRAY_BUFFER,te);for(let xe=0;xe<C.locationSize;xe++)D(C.location+xe,X/C.locationSize,se,L,pe*ce,(ge+X/C.locationSize*xe)*ce,Z)}else{if(G.isInstancedBufferAttribute){for(let J=0;J<C.locationSize;J++)p(C.location+J,G.meshPerAttribute);O.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let J=0;J<C.locationSize;J++)m(C.location+J);i.bindBuffer(i.ARRAY_BUFFER,te);for(let J=0;J<C.locationSize;J++)D(C.location+J,X/C.locationSize,se,L,X*ce,X/C.locationSize*J*ce,Z)}}else if(W!==void 0){let L=W[H];if(L!==void 0)switch(L.length){case 2:i.vertexAttrib2fv(C.location,L);break;case 3:i.vertexAttrib3fv(C.location,L);break;case 4:i.vertexAttrib4fv(C.location,L);break;default:i.vertexAttrib1fv(C.location,L)}}}}A()}function v(){w();for(let O in n){let B=n[O];for(let U in B){let S=B[U];for(let F in S){let z=S[F];for(let W in z)h(z[W].object),delete z[W];delete S[F]}}delete n[O]}}function b(O){if(n[O.id]===void 0)return;let B=n[O.id];for(let U in B){let S=B[U];for(let F in S){let z=S[F];for(let W in z)h(z[W].object),delete z[W];delete S[F]}}delete n[O.id]}function I(O){for(let B in n){let U=n[B];for(let S in U){let F=U[S];if(F[O.id]===void 0)continue;let z=F[O.id];for(let W in z)h(z[W].object),delete z[W];delete F[O.id]}}}function _(O){for(let B in n){let U=n[B],S=O.isInstancedMesh===!0?O.id:0,F=U[S];if(F!==void 0){for(let z in F){let W=F[z];for(let H in W)h(W[H].object),delete W[H];delete F[z]}delete U[S],Object.keys(U).length===0&&delete n[B]}}}function w(){N(),a=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:N,dispose:v,releaseStatesOfGeometry:b,releaseStatesOfObject:_,releaseStatesOfProgram:I,initAttributes:x,enableAttribute:m,disableUnusedAttributes:A}}function Lm(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Dm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==Tn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){let _=I===zn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==un&&I!==wn&&!_&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Ze("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),D=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:A,maxVaryings:D,maxFragmentUniforms:M,maxSamples:v,samples:b}}function Nm(i){let e=this,t=null,n=0,s=!1,r=!1,a=new pn,o=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let A=r?0:n,D=A*4,M=p.clippingState||null;l.value=M,M=h(g,u,D,f);for(let v=0;v!==D;++v)M[v]=t[v];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,A=u.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<p)&&(m=new Float32Array(p));for(let D=0,M=f;D!==x;++D,M+=4)a.copy(d[D]).applyMatrix4(A,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var Os=4,Um=6,Fm=20,Bm=256,Hr=new Ps,Bu=new Be,Bc=null,Oc=0,Hc=0,Gc=!1,Om=new P,Ki=new P,Gs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Om}=r;Bc=this._renderer.getRenderTarget(),Oc=this._renderer.getActiveCubeFace(),Hc=this._renderer.getActiveMipmapLevel(),Gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Bc,Oc,Hc),this._renderer.xr.enabled=Gc,e.scissorTest=!1,Bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Li||e.mapping===Zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bc=this._renderer.getRenderTarget(),Oc=this._renderer.getActiveCubeFace(),Hc=this._renderer.getActiveMipmapLevel(),Gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:zn,format:Tn,colorSpace:sr,depthBuffer:!1},s=Ou(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ou(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Hm(r)),this._blurMaterial=zm(r,e,t),this._ggxMaterial=Gm(r,e,t)}return s}_compileMaterial(e){let t=new k(new Ct,e);this._renderer.compile(t,Hr)}_sceneToCubeUV(e,t,n,s,r){let l=new Jt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Bu),d.toneMapping=Hn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new k(new ye,new nn({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,p=!1,A=e.background;A?A.isColor&&(m.color.copy(A),e.background=null,p=!0):(m.color.copy(Bu),p=!0);for(let D=0;D<6;D++){let M=D%3;M===0?(l.up.set(0,c[D],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[D],r.y,r.z)):M===1?(l.up.set(0,0,c[D]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[D],r.z)):(l.up.set(0,c[D],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[D]));let v=this._cubeSize;Bs(s,M*v,D>2?v:0,v,v),d.setRenderTarget(s),p&&d.render(x,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=A}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Li||e.mapping===Zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Bs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Hr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-Os?n-g+Os:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Bs(r,m,p,3*x,2*x),s.setRenderTarget(r),s.render(o,Hr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Bs(e,m,p,3*x,2*x),s.setRenderTarget(e),s.render(o,Hr)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-Os?s-this._lodMax+Os:0),u=4*(this._cubeSize-h);Bs(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,Hr)}};function Hm(i){let e=[],t=[],n=i,s=i-Os+1+Um;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let p=0;p<d;p++){let A=p%3*2/3-1,D=p>2?0:-1,M=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];g.set(M,f*u*p);for(let v=0;v<u;v++){let b=h[v*2]*2-1,I=h[v*2+1]*2-1;p===0?Ki.set(1,I,b):p===1?Ki.set(-b,1,-I):p===2?Ki.set(-b,I,1):p===3?Ki.set(-1,I,-b):p===4?Ki.set(-b,-1,I):Ki.set(b,I,-1),Ki.toArray(x,(p*u+v)*f)}}let m=new Ct;m.setAttribute("position",new an(g,f)),m.setAttribute("outputDirection",new an(x,f)),t.push(new k(m,null)),n>Os&&n--}return{lodMeshes:t,sizeLods:e}}function Ou(i,e,t){let n=new hn(i,e,t);return n.texture.mapping=Ir,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Gm(i,e,t){return new ln({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Bm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function zm(i,e,t){return new ln({name:"SphericalGaussianBlur",defines:{SAMPLES:Fm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:sl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Hu(){return new ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Gu(){return new ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function sl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var nl=class extends hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new dr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ye(5,5,5),r=new ln({name:"CubemapFromEquirect",uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bt,blending:Zn});r.uniforms.tEquirect.value=t;let a=new k(s,r),o=t.minFilter;return t.minFilter===Di&&(t.minFilter=Kt),new oo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function km(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===ho||f===uo)if(e.has(u)){let g=e.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let x=new nl(g.height);return x.fromEquirectangularTexture(i,u),e.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===ho||f===uo,x=f===Li||f===Zi;if(g||x){let m=t.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Gs(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let A=u.image;return g&&A&&A.height>0||x&&A&&l(A)?(n===null&&(n=new Gs(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===ho?u.mapping=Li:f===uo&&(u.mapping=Zi),u}function l(u){let f=0,g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Vm(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ki("WebGLRenderer: "+n+" extension not supported."),s}}}function Wm(i,e,t,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,x=0;if(g===void 0)return;if(f!==null){let A=f.array;x=f.version;for(let D=0,M=A.length;D<M;D+=3){let v=A[D+0],b=A[D+1],I=A[D+2];u.push(v,b,b,I,I,v)}}else{let A=g.array;x=g.version;for(let D=0,M=A.length/3-1;D<M;D+=3){let v=D+0,b=D+1,I=D+2;u.push(v,b,b,I,I,v)}}let m=new(g.count>=65535?cr:lr)(u,1);m.version=x;let p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Xm(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let x=0;for(let m=0;m<f;m++)x+=u[m];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function qm(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Ym(i,e,t){let n=new WeakMap,s=new It;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let w=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],A=o.morphAttributes.color||[],D=0;f===!0&&(D=1),g===!0&&(D=2),x===!0&&(D=3);let M=o.attributes.position.count*D,v=1;M>e.maxTextureSize&&(v=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let b=new Float32Array(M*v*4*d),I=new or(b,M,v,d);I.type=wn,I.needsUpdate=!0;let _=D*4;for(let N=0;N<d;N++){let O=m[N],B=p[N],U=A[N],S=M*v*4*N;for(let F=0;F<O.count;F++){let z=F*_;f===!0&&(s.fromBufferAttribute(O,F),b[S+z+0]=s.x,b[S+z+1]=s.y,b[S+z+2]=s.z,b[S+z+3]=0),g===!0&&(s.fromBufferAttribute(B,F),b[S+z+4]=s.x,b[S+z+5]=s.y,b[S+z+6]=s.z,b[S+z+7]=0),x===!0&&(s.fromBufferAttribute(U,F),b[S+z+8]=s.x,b[S+z+9]=s.y,b[S+z+10]=s.z,b[S+z+11]=U.itemSize===4?s.w:1)}}u={count:d,texture:I,size:new De(M,v)},n.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function $m(i,e,t,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var Zm={[hc]:"LINEAR_TONE_MAPPING",[uc]:"REINHARD_TONE_MAPPING",[dc]:"CINEON_TONE_MAPPING",[Cr]:"ACES_FILMIC_TONE_MAPPING",[pc]:"AGX_TONE_MAPPING",[mc]:"NEUTRAL_TONE_MAPPING",[fc]:"CUSTOM_TONE_MAPPING"};function Jm(i,e,t,n,s,r){let a=new hn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Ct;c.setAttribute("position",new at([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new at([0,2,0,0,2,0],2));let h=new $a({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new k(c,h),u=new Ps(-1,1,1,-1,0,1),f=null,g=null,x=!1,m,p=null,A=[],D=!1;this.setSize=function(M,v){a.setSize(M,v),o!==null&&o.setSize(M,v),l!==null&&l.setSize(M,v);for(let b=0;b<A.length;b++){let I=A[b];I.setSize&&I.setSize(M,v)}},this.setEffects=function(M){A=M,D=A.length>0&&A[0].isRenderPass===!0;let v=a.width,b=a.height;A.length>0&&o===null&&(o=new hn(v,b,{type:zn,depthBuffer:!1,stencilBuffer:!1}),l=new hn(v,b,{type:zn,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<A.length;I++){let _=A[I];_.setSize&&_.setSize(v,b)}},this.begin=function(M,v){if(x||M.toneMapping===Hn&&A.length===0)return!1;if(p=v,v!==null){let b=v.width,I=v.height;(a.width!==b||a.height!==I)&&this.setSize(b,I)}return D===!1&&M.setRenderTarget(a),m=M.toneMapping,M.toneMapping=Hn,!0},this.hasRenderPass=function(){return D},this.end=function(M,v){M.toneMapping=m,x=!0;let b=a,I=o;for(let _=0;_<A.length;_++){let w=A[_];w.enabled!==!1&&(w.render(M,I,b,v),w.needsSwap!==!1&&(b=I,I=I===o?l:o))}if(f!==M.outputColorSpace||g!==M.toneMapping){f=M.outputColorSpace,g=M.toneMapping,h.defines={},ht.getTransfer(f)===Mt&&(h.defines.SRGB_TRANSFER="");let _=Zm[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,M.setRenderTarget(p),M.render(d,u),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var ad=new on,Vc=new Ai(1,1),od=new or,ld=new Fa,cd=new dr,zu=[],ku=[],Vu=new Float32Array(16),Wu=new Float32Array(9),Xu=new Float32Array(4);function zs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=zu[s];if(r===void 0&&(r=new Float32Array(s),zu[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function rl(i,e){let t=ku[e];t===void 0&&(t=new Int32Array(e),ku[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Km(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function jm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2fv(this.addr,e),Xt(t,e)}}function Qm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;i.uniform3fv(this.addr,e),Xt(t,e)}}function eg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4fv(this.addr,e),Xt(t,e)}}function tg(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Xu.set(n),i.uniformMatrix2fv(this.addr,!1,Xu),Xt(t,n)}}function ng(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Wu.set(n),i.uniformMatrix3fv(this.addr,!1,Wu),Xt(t,n)}}function ig(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;Vu.set(n),i.uniformMatrix4fv(this.addr,!1,Vu),Xt(t,n)}}function sg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function rg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2iv(this.addr,e),Xt(t,e)}}function ag(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3iv(this.addr,e),Xt(t,e)}}function og(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4iv(this.addr,e),Xt(t,e)}}function lg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function cg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2uiv(this.addr,e),Xt(t,e)}}function hg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3uiv(this.addr,e),Xt(t,e)}}function ug(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4uiv(this.addr,e),Xt(t,e)}}function dg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Vc.compareFunction=t.isReversedDepthBuffer()?Qo:jo,r=Vc):r=ad,t.setTexture2D(e||r,s)}function fg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ld,s)}function pg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||cd,s)}function mg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||od,s)}function gg(i){switch(i){case 5126:return Km;case 35664:return jm;case 35665:return Qm;case 35666:return eg;case 35674:return tg;case 35675:return ng;case 35676:return ig;case 5124:case 35670:return sg;case 35667:case 35671:return rg;case 35668:case 35672:return ag;case 35669:case 35673:return og;case 5125:return lg;case 36294:return cg;case 36295:return hg;case 36296:return ug;case 35678:case 36198:case 36298:case 36306:case 35682:return dg;case 35679:case 36299:case 36307:return fg;case 35680:case 36300:case 36308:case 36293:return pg;case 36289:case 36303:case 36311:case 36292:return mg}}function xg(i,e){i.uniform1fv(this.addr,e)}function yg(i,e){let t=zs(e,this.size,2);i.uniform2fv(this.addr,t)}function _g(i,e){let t=zs(e,this.size,3);i.uniform3fv(this.addr,t)}function vg(i,e){let t=zs(e,this.size,4);i.uniform4fv(this.addr,t)}function Mg(i,e){let t=zs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function bg(i,e){let t=zs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Eg(i,e){let t=zs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Sg(i,e){i.uniform1iv(this.addr,e)}function wg(i,e){i.uniform2iv(this.addr,e)}function Tg(i,e){i.uniform3iv(this.addr,e)}function Ag(i,e){i.uniform4iv(this.addr,e)}function Rg(i,e){i.uniform1uiv(this.addr,e)}function Cg(i,e){i.uniform2uiv(this.addr,e)}function Ig(i,e){i.uniform3uiv(this.addr,e)}function Pg(i,e){i.uniform4uiv(this.addr,e)}function Lg(i,e,t){let n=this.cache,s=e.length,r=rl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Vc:a=ad;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Dg(i,e,t){let n=this.cache,s=e.length,r=rl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ld,r[a])}function Ng(i,e,t){let n=this.cache,s=e.length,r=rl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||cd,r[a])}function Ug(i,e,t){let n=this.cache,s=e.length,r=rl(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||od,r[a])}function Fg(i){switch(i){case 5126:return xg;case 35664:return yg;case 35665:return _g;case 35666:return vg;case 35674:return Mg;case 35675:return bg;case 35676:return Eg;case 5124:case 35670:return Sg;case 35667:case 35671:return wg;case 35668:case 35672:return Tg;case 35669:case 35673:return Ag;case 5125:return Rg;case 36294:return Cg;case 36295:return Ig;case 36296:return Pg;case 35678:case 36198:case 36298:case 36306:case 35682:return Lg;case 35679:case 36299:case 36307:return Dg;case 35680:case 36300:case 36308:case 36293:return Ng;case 36289:case 36303:case 36311:case 36292:return Ug}}var Wc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=gg(t.type)}},Xc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fg(t.type)}},qc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},zc=/(\w+)(\])?(\[|\.)?/g;function qu(i,e){i.seq.push(e),i.map[e.id]=e}function Bg(i,e,t){let n=i.name,s=n.length;for(zc.lastIndex=0;;){let r=zc.exec(n),a=zc.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){qu(t,c===void 0?new Wc(o,i,e):new Xc(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new qc(o),qu(t,d)),t=d}}}var Hs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Bg(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Yu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Og=37297,Hg=0;function Gg(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var $u=new tt;function zg(i){ht._getMatrix($u,ht.workingColorSpace,i);let e=`mat3( ${$u.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(i)){case rr:return[e,"LinearTransferOETF"];case Mt:return[e,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Zu(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Gg(i.getShaderSource(e),o)}else return r}function kg(i,e){let t=zg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Vg={[hc]:"Linear",[uc]:"Reinhard",[dc]:"Cineon",[Cr]:"ACESFilmic",[pc]:"AgX",[mc]:"Neutral",[fc]:"Custom"};function Wg(i,e){let t=Vg[e];return t===void 0?(Ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var tl=new P;function Xg(){ht.getLuminanceCoefficients(tl);let i=tl.x.toFixed(4),e=tl.y.toFixed(4),t=tl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zr).join(`
`)}function Yg(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function $g(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function zr(i){return i!==""}function Ju(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ku(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Zg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yc(i){return i.replace(Zg,Kg)}var Jg=new Map;function Kg(i,e){let t=rt[e];if(t===void 0){let n=Jg.get(e);if(n!==void 0)t=rt[n],Ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Yc(t)}var jg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ju(i){return i.replace(jg,Qg)}function Qg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Qu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var ex={[Tr]:"SHADOWMAP_TYPE_PCF",[Ls]:"SHADOWMAP_TYPE_VSM"};function tx(i){return ex[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var nx={[Li]:"ENVMAP_TYPE_CUBE",[Zi]:"ENVMAP_TYPE_CUBE",[Ir]:"ENVMAP_TYPE_CUBE_UV"};function ix(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":nx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var sx={[Zi]:"ENVMAP_MODE_REFRACTION"};function rx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":sx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var ax={[Rr]:"ENVMAP_BLENDING_MULTIPLY",[xu]:"ENVMAP_BLENDING_MIX",[yu]:"ENVMAP_BLENDING_ADD"};function ox(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ax[i.combine]||"ENVMAP_BLENDING_NONE"}function lx(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function cx(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=tx(t),c=ix(t),h=rx(t),d=ox(t),u=lx(t),f=qg(t),g=Yg(r),x=s.createProgram(),m,p,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(zr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(zr).join(`
`),p.length>0&&(p+=`
`)):(m=[Qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zr).join(`
`),p=[Qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hn?"#define TONE_MAPPING":"",t.toneMapping!==Hn?rt.tonemapping_pars_fragment:"",t.toneMapping!==Hn?Wg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,kg("linearToOutputTexel",t.outputColorSpace),Xg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(zr).join(`
`)),a=Yc(a),a=Ju(a,t),a=Ku(a,t),o=Yc(o),o=Ju(o,t),o=Ku(o,t),a=ju(a),o=ju(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===wc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let D=A+m+a,M=A+p+o,v=Yu(s,s.VERTEX_SHADER,D),b=Yu(s,s.FRAGMENT_SHADER,M);s.attachShader(x,v),s.attachShader(x,b),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function I(O){if(i.debug.checkShaderErrors){let B=s.getProgramInfoLog(x)||"",U=s.getShaderInfoLog(v)||"",S=s.getShaderInfoLog(b)||"",F=B.trim(),z=U.trim(),W=S.trim(),H=!0,C=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(H=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,v,b);else{let G=Zu(s,v,"vertex"),L=Zu(s,b,"fragment");Qe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+F+`
`+G+`
`+L)}else F!==""?Ze("WebGLProgram: Program Info Log:",F):(z===""||W==="")&&(C=!1);C&&(O.diagnostics={runnable:H,programLog:F,vertexShader:{log:z,prefix:m},fragmentShader:{log:W,prefix:p}})}s.deleteShader(v),s.deleteShader(b),_=new Hs(s,x),w=$g(s,x)}let _;this.getUniforms=function(){return _===void 0&&I(this),_};let w;this.getAttributes=function(){return w===void 0&&I(this),w};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(x,Og)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Hg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=v,this.fragmentShader=b,this}var hx=0,$c=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Zc(e),t.set(e,n)),n}},Zc=class{constructor(e){this.id=hx++,this.code=e,this.usedTimes=0}};function ux(i){return i===Ui||i===Fr||i===Br}function dx(i,e,t,n,s,r){let a=new Ss,o=new $c,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,w,N,O,B,U){let S=O.fog,F=B.geometry,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?O.environment:null,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,H=e.get(_.envMap||z,W),C=H&&H.mapping===Ir?H.image.height:null,G=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Ze("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let L=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,X=L!==void 0?L.length:0,ee=0;F.morphAttributes.position!==void 0&&(ee=1),F.morphAttributes.normal!==void 0&&(ee=2),F.morphAttributes.color!==void 0&&(ee=3);let te,se,ce,Z;if(G){let wt=Kn[G];te=wt.vertexShader,se=wt.fragmentShader}else{te=_.vertexShader,se=_.fragmentShader;let wt=o.getVertexShaderStage(_),_t=o.getFragmentShaderStage(_);o.update(_,wt,_t),ce=wt.id,Z=_t.id}let J=i.getRenderTarget(),pe=i.state.buffers.depth.getReversed(),ge=B.isInstancedMesh===!0,xe=B.isBatchedMesh===!0,$e=!!_.map,ot=!!_.matcap,et=!!H,Q=!!_.aoMap,_e=!!_.lightMap,Ue=!!_.bumpMap&&_.wireframe===!1,Ye=!!_.normalMap,Ke=!!_.displacementMap,ut=!!_.emissiveMap,yt=!!_.metalnessMap,j=!!_.roughnessMap,E=_.anisotropy>0,re=_.clearcoat>0,de=_.dispersion>0,R=_.retroreflectivity>0,y=_.iridescence>0,q=_.sheen>0,K=_.transmission>0,oe=E&&!!_.anisotropyMap,me=re&&!!_.clearcoatMap,ve=re&&!!_.clearcoatNormalMap,le=re&&!!_.clearcoatRoughnessMap,he=y&&!!_.iridescenceMap,Me=y&&!!_.iridescenceThicknessMap,Oe=q&&!!_.sheenColorMap,Ee=q&&!!_.sheenRoughnessMap,Se=!!_.specularMap,Xe=!!_.specularColorMap,je=!!_.specularIntensityMap,it=K&&!!_.transmissionMap,$=K&&!!_.thicknessMap,we=!!_.gradientMap,ue=!!_.alphaMap,Te=_.alphaTest>0,Pe=!!_.alphaHash,fe=!!_.extensions,qe=Hn;_.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(qe=i.toneMapping);let Ve={shaderID:G,shaderType:_.type,shaderName:_.name,vertexShader:te,fragmentShader:se,defines:_.defines,customVertexShaderID:ce,customFragmentShaderID:Z,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:xe,batchingColor:xe&&B._colorsTexture!==null,instancing:ge,instancingColor:ge&&B.instanceColor!==null,instancingMorph:ge&&B.morphTexture!==null,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:ht.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:$e,matcap:ot,envMap:et,envMapMode:et&&H.mapping,envMapCubeUVHeight:C,aoMap:Q,lightMap:_e,bumpMap:Ue,normalMap:Ye,displacementMap:Ke,emissiveMap:ut,normalMapObjectSpace:Ye&&_.normalMapType===Mu,normalMapTangentSpace:Ye&&_.normalMapType===Fs,packedNormalMap:Ye&&_.normalMapType===Fs&&ux(_.normalMap.format),metalnessMap:yt,roughnessMap:j,anisotropy:E,anisotropyMap:oe,clearcoat:re,clearcoatMap:me,clearcoatNormalMap:ve,clearcoatRoughnessMap:le,dispersion:de,retroreflection:R,iridescence:y,iridescenceMap:he,iridescenceThicknessMap:Me,sheen:q,sheenColorMap:Oe,sheenRoughnessMap:Ee,specularMap:Se,specularColorMap:Xe,specularIntensityMap:je,transmission:K,transmissionMap:it,thicknessMap:$,gradientMap:we,opaque:_.transparent===!1&&_.blending===Ds&&_.alphaToCoverage===!1,alphaMap:ue,alphaTest:Te,alphaHash:Pe,combine:_.combine,mapUv:$e&&g(_.map.channel),aoMapUv:Q&&g(_.aoMap.channel),lightMapUv:_e&&g(_.lightMap.channel),bumpMapUv:Ue&&g(_.bumpMap.channel),normalMapUv:Ye&&g(_.normalMap.channel),displacementMapUv:Ke&&g(_.displacementMap.channel),emissiveMapUv:ut&&g(_.emissiveMap.channel),metalnessMapUv:yt&&g(_.metalnessMap.channel),roughnessMapUv:j&&g(_.roughnessMap.channel),anisotropyMapUv:oe&&g(_.anisotropyMap.channel),clearcoatMapUv:me&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ve&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&g(_.sheenRoughnessMap.channel),specularMapUv:Se&&g(_.specularMap.channel),specularColorMapUv:Xe&&g(_.specularColorMap.channel),specularIntensityMapUv:je&&g(_.specularIntensityMap.channel),transmissionMapUv:it&&g(_.transmissionMap.channel),thicknessMapUv:$&&g(_.thicknessMap.channel),alphaMapUv:ue&&g(_.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Ye||E),vertexNormals:!!F.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!F.attributes.uv&&($e||ue),fog:!!S,useFog:_.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||F.attributes.normal===void 0&&Ye===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:X,morphTextureStride:ee,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:qe,decodeVideoTexture:$e&&_.map.isVideoTexture===!0&&ht.getTransfer(_.map.colorSpace)===Mt,decodeVideoTextureEmissive:ut&&_.emissiveMap.isVideoTexture===!0&&ht.getTransfer(_.emissiveMap.colorSpace)===Mt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Zt,flipSided:_.side===Bt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:fe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&_.extensions.multiDraw===!0||xe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ve.vertexUv1s=l.has(1),Ve.vertexUv2s=l.has(2),Ve.vertexUv3s=l.has(3),l.clear(),Ve}function m(_){let w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(let N in _.defines)w.push(N),w.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(p(w,_),A(w,_),w.push(i.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function p(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numSunLights),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numSunLightShadows),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function A(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function D(_){let w=f[_.type],N;if(w){let O=Kn[w];N=Nu.clone(O.uniforms)}else N=_.uniforms;return N}function M(_,w){let N=h.get(w);return N!==void 0?++N.usedTimes:(N=new cx(i,w,_,s),c.push(N),h.set(w,N)),N}function v(_){if(--_.usedTimes===0){let w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function I(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:D,acquireProgram:M,releaseProgram:v,releaseShaderCache:b,programs:c,dispose:I}}function fx(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function px(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ed(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function td(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,x,m,p){let A=i[e];return A===void 0?(A={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},i[e]=A):(A.id=u.id,A.object=u,A.geometry=f,A.material=g,A.materialVariant=a(u),A.groupOrder=x,A.renderOrder=u.renderOrder,A.z=m,A.group=p),e++,A}function l(u,f,g,x,m,p,A){A.reversedDepth===!0&&(m=-m);let D=o(u,f,g,x,m,p);g.transmission>0?n.push(D):g.transparent===!0?s.push(D):t.push(D)}function c(u,f,g,x,m,p){let A=o(u,f,g,x,m,p);g.transmission>0?n.unshift(A):g.transparent===!0?s.unshift(A):t.unshift(A)}function h(u,f){t.length>1&&t.sort(u||px),n.length>1&&n.sort(f||ed),s.length>1&&s.sort(f||ed)}function d(){for(let u=e,f=i.length;u<f;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function mx(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new td,i.set(n,[a])):s>=r.length?(a=new td,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function gx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new Be};break;case"SpotLight":t={position:new P,direction:new P,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function xx(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var yx=0;function _x(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function vx(i){let e=new gx,t=xx(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let s=new P,r=new ft,a=new ft;function o(c){let h=0,d=0,u=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,A=0,D=0,M=0,v=0,b=0,I=0,_=0,w=0,N=0;c.sort(_x);for(let B=0,U=c.length;B<U;B++){let S=c[B],F=S.color,z=S.intensity,W=S.distance,H=null;if(S.shadow&&S.shadow.map&&(S.shadow.map.texture.format===Ui?H=S.shadow.map.texture:H=S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)h+=F.r*z,d+=F.g*z,u+=F.b*z;else if(S.isLightProbe){for(let C=0;C<9;C++)n.probe[C].addScaledVector(S.sh.coefficients[C],z);N++}else if(S.isSunLight){let C=e.get(S);if(C.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let G=S.shadow,L=t.get(S);L.shadowIntensity=G.intensity,L.shadowBias=G.bias,L.shadowNormalBias=G.normalBias,L.shadowRadius=G.radius,L.shadowMapSize.copy(G.mapSize).multiply(G.getFrameExtents()),n.sunShadow[g]=L,n.sunShadowMap[g]=H;let X=G.getViewportCount();for(let ee=0;ee<X;ee++)n.sunShadowMatrix[x+ee]=G.getMatrix(ee),n.sunShadowCascade[x+ee]=G._cascadeData[ee];x+=X,g++}n.sun[f]=C,f++}else if(S.isDirectionalLight){let C=e.get(S);if(C.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let G=S.shadow,L=t.get(S);L.shadowIntensity=G.intensity,L.shadowBias=G.bias,L.shadowNormalBias=G.normalBias,L.shadowRadius=G.radius,L.shadowMapSize=G.mapSize,n.directionalShadow[m]=L,n.directionalShadowMap[m]=H,n.directionalShadowMatrix[m]=S.shadow.matrix,v++}n.directional[m]=C,m++}else if(S.isSpotLight){let C=e.get(S);C.position.setFromMatrixPosition(S.matrixWorld),C.color.copy(F).multiplyScalar(z),C.distance=W,C.coneCos=Math.cos(S.angle),C.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),C.decay=S.decay,n.spot[A]=C;let G=S.shadow;if(S.map&&(n.spotLightMap[_]=S.map,_++,G.updateMatrices(S),S.castShadow&&w++),n.spotLightMatrix[A]=G.matrix,S.castShadow){let L=t.get(S);L.shadowIntensity=G.intensity,L.shadowBias=G.bias,L.shadowNormalBias=G.normalBias,L.shadowRadius=G.radius,L.shadowMapSize=G.mapSize,n.spotShadow[A]=L,n.spotShadowMap[A]=H,I++}A++}else if(S.isRectAreaLight){let C=e.get(S);C.color.copy(F).multiplyScalar(z),C.halfWidth.set(S.width*.5,0,0),C.halfHeight.set(0,S.height*.5,0),n.rectArea[D]=C,D++}else if(S.isPointLight){let C=e.get(S);if(C.color.copy(S.color).multiplyScalar(S.intensity),C.distance=S.distance,C.decay=S.decay,S.castShadow){let G=S.shadow,L=t.get(S);L.shadowIntensity=G.intensity,L.shadowBias=G.bias,L.shadowNormalBias=G.normalBias,L.shadowRadius=G.radius,L.shadowMapSize=G.mapSize,L.shadowCameraNear=G.camera.near,L.shadowCameraFar=G.camera.far,n.pointShadow[p]=L,n.pointShadowMap[p]=H,n.pointShadowMatrix[p]=S.shadow.matrix,b++}n.point[p]=C,p++}else if(S.isHemisphereLight){let C=e.get(S);C.skyColor.copy(S.color).multiplyScalar(z),C.groundColor.copy(S.groundColor).multiplyScalar(z),n.hemi[M]=C,M++}}D>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let O=n.hash;(O.sunLength!==f||O.directionalLength!==m||O.pointLength!==p||O.spotLength!==A||O.rectAreaLength!==D||O.hemiLength!==M||O.numSunShadows!==g||O.numDirectionalShadows!==v||O.numPointShadows!==b||O.numSpotShadows!==I||O.numSpotMaps!==_||O.numLightProbes!==N)&&(n.sun.length=f,n.directional.length=m,n.spot.length=A,n.rectArea.length=D,n.point.length=p,n.hemi.length=M,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.directionalShadowMatrix.length=v,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=I,n.spotShadowMap.length=I,n.spotLightMatrix.length=I+_-w,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=N,O.sunLength=f,O.directionalLength=m,O.pointLength=p,O.spotLength=A,O.rectAreaLength=D,O.hemiLength=M,O.numSunShadows=g,O.numDirectionalShadows=v,O.numPointShadows=b,O.numSpotShadows=I,O.numSpotMaps=_,O.numLightProbes=N,n.version=yx++)}function l(c,h){let d=0,u=0,f=0,g=0,x=0,m=0,p=h.matrixWorldInverse;for(let A=0,D=c.length;A<D;A++){let M=c[A];if(M.isSunLight){let v=n.sun[d];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(p),d++}else if(M.isDirectionalLight){let v=n.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),u++}else if(M.isSpotLight){let v=n.spot[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),g++}else if(M.isRectAreaLight){let v=n.rectArea[x];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),a.identity(),r.copy(M.matrixWorld),r.premultiply(p),a.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){let v=n.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){let v=n.hemi[m];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function nd(i){let e=new vx(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Mx(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new nd(i),e.set(s,[o])):r>=a.length?(o=new nd(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var bx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ex=`uniform sampler2D shadow_pass;
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
}`,Sx=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],wx=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],id=new ft,Gr=new P,kc=new P;function Tx(i,e,t){let n=new Rs,s=new De,r=new De,a=new It,o=new Za,l=new Ja,c={},h=t.maxTextureSize,d={[Sn]:Bt,[Bt]:Sn,[Zt]:Zt},u=new ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:bx,fragmentShader:Ex}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ct;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new k(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tr;let p=this.type;this.render=function(b,I,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===jh&&(Ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Tr);let w=i.getRenderTarget(),N=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Zn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let U=p!==this.type;U&&I.traverse(function(S){S.material&&(Array.isArray(S.material)?S.material.forEach(F=>F.needsUpdate=!0):S.material.needsUpdate=!0)});for(let S=0,F=b.length;S<F;S++){let z=b[S],W=z.shadow;if(W===void 0){Ze("WebGLShadowMap:",z,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let H=W.getFrameExtents();s.multiply(H),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/H.x),s.x=r.x*H.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/H.y),s.y=r.y*H.y,W.mapSize.y=r.y));let C=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=C,W.map===null||U===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Ls){if(z.isPointLight){Ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new hn(s.x,s.y,{format:Ui,type:zn,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),W.map.texture.name=z.name+".shadowMap",W.map.depthTexture=new Ai(s.x,s.y,wn),W.map.depthTexture.name=z.name+".shadowMapDepth",W.map.depthTexture.format=qn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=$t,W.map.depthTexture.magFilter=$t}else z.isPointLight?(W.map=new nl(s.x),W.map.depthTexture=new Ha(s.x,Gn)):(W.map=new hn(s.x,s.y),W.map.depthTexture=new Ai(s.x,s.y,Gn)),W.map.depthTexture.name=z.name+".shadowMap",W.map.depthTexture.format=qn,this.type===Tr?(W.map.depthTexture.compareFunction=C?Qo:jo,W.map.depthTexture.minFilter=Kt,W.map.depthTexture.magFilter=Kt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=$t,W.map.depthTexture.magFilter=$t);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let G=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();z.isPointLight!==!0&&W.updateMatrices(z,_);for(let L=0;L<G;L++){let X=W.getCamera(L);if(z.isPointLight){let ee=W.camera,te=W.matrix,se=z.distance||ee.far;se!==ee.far&&(ee.far=se,ee.updateProjectionMatrix()),Gr.setFromMatrixPosition(z.matrixWorld),ee.position.copy(Gr),kc.copy(ee.position),kc.add(Sx[L]),ee.up.copy(wx[L]),ee.lookAt(kc),ee.updateMatrixWorld(),te.makeTranslation(-Gr.x,-Gr.y,-Gr.z),id.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),W._frustum.setFromProjectionMatrix(id,ee.coordinateSystem,ee.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,L),i.clear();else{L===0&&(i.setRenderTarget(W.map),i.clear());let ee=W.getViewport(L);a.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),B.viewport(a)}n=W.getFrustum(L),M(I,_,X,z,this.type)}W.isPointLightShadow!==!0&&this.type===Ls&&A(W,_),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(w,N,O)};function A(b,I){let _=e.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new hn(s.x,s.y,{format:Ui,type:zn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(I,null,_,u,x,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(I,null,_,f,x,null)}function D(b,I,_,w){let N=null,O=_.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(O!==void 0)N=O;else if(N=_.isPointLight===!0?l:o,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let B=N.uuid,U=I.uuid,S=c[B];S===void 0&&(S={},c[B]=S);let F=S[U];F===void 0&&(F=N.clone(),S[U]=F,I.addEventListener("dispose",v)),N=F}if(N.visible=I.visible,N.wireframe=I.wireframe,w===Ls?N.side=I.shadowSide!==null?I.shadowSide:I.side:N.side=I.shadowSide!==null?I.shadowSide:d[I.side],N.alphaMap=I.alphaMap,N.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,N.map=I.map,N.clipShadows=I.clipShadows,N.clippingPlanes=I.clippingPlanes,N.clipIntersection=I.clipIntersection,N.displacementMap=I.displacementMap,N.displacementScale=I.displacementScale,N.displacementBias=I.displacementBias,N.wireframeLinewidth=I.wireframeLinewidth,N.linewidth=I.linewidth,_.isPointLight===!0&&N.isMeshDistanceMaterial===!0){let B=i.properties.get(N);B.light=_}return N}function M(b,I,_,w,N){if(b.visible===!1)return;if(b.layers.test(I.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&N===Ls)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,b.matrixWorld);let U=e.update(b),S=b.material;if(Array.isArray(S)){let F=U.groups;for(let z=0,W=F.length;z<W;z++){let H=F[z],C=S[H.materialIndex];if(C&&C.visible){let G=D(b,C,w,N);b.onBeforeShadow(i,b,I,_,U,G,H),i.renderBufferDirect(_,null,U,G,b,H),b.onAfterShadow(i,b,I,_,U,G,H)}}}else if(S.visible){let F=D(b,S,w,N);b.onBeforeShadow(i,b,I,_,U,F,null),i.renderBufferDirect(_,null,U,F,b,null),b.onAfterShadow(i,b,I,_,U,F,null)}}let B=b.children;for(let U=0,S=B.length;U<S;U++)M(B[U],I,_,w,N)}function v(b){b.target.removeEventListener("dispose",v);for(let _ in c){let w=c[_],N=b.target.uuid;N in w&&(w[N].dispose(),delete w[N])}}}function Ax(i,e){function t(){let $=!1,we=new It,ue=null,Te=new It(0,0,0,0);return{setMask:function(Pe){ue!==Pe&&!$&&(i.colorMask(Pe,Pe,Pe,Pe),ue=Pe)},setLocked:function(Pe){$=Pe},setClear:function(Pe,fe,qe,Ve,wt){wt===!0&&(Pe*=Ve,fe*=Ve,qe*=Ve),we.set(Pe,fe,qe,Ve),Te.equals(we)===!1&&(i.clearColor(Pe,fe,qe,Ve),Te.copy(we))},reset:function(){$=!1,ue=null,Te.set(-1,0,0,0)}}}function n(){let $=!1,we=!1,ue=null,Te=null,Pe=null;return{setReversed:function(fe){if(we!==fe){let qe=e.get("EXT_clip_control");fe?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),we=fe;let Ve=Pe;Pe=null,this.setClear(Ve)}},getReversed:function(){return we},setTest:function(fe){fe?J(i.DEPTH_TEST):pe(i.DEPTH_TEST)},setMask:function(fe){ue!==fe&&!$&&(i.depthMask(fe),ue=fe)},setFunc:function(fe){if(we&&(fe=Lu[fe]),Te!==fe){switch(fe){case Sa:i.depthFunc(i.NEVER);break;case wa:i.depthFunc(i.ALWAYS);break;case Ta:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case Aa:i.depthFunc(i.EQUAL);break;case Ra:i.depthFunc(i.GEQUAL);break;case Ca:i.depthFunc(i.GREATER);break;case Ia:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Te=fe}},setLocked:function(fe){$=fe},setClear:function(fe){Pe!==fe&&(Pe=fe,we&&(fe=1-fe),i.clearDepth(fe))},reset:function(){$=!1,ue=null,Te=null,Pe=null,we=!1}}}function s(){let $=!1,we=null,ue=null,Te=null,Pe=null,fe=null,qe=null,Ve=null,wt=null;return{setTest:function(_t){$||(_t?J(i.STENCIL_TEST):pe(i.STENCIL_TEST))},setMask:function(_t){we!==_t&&!$&&(i.stencilMask(_t),we=_t)},setFunc:function(_t,In,kn){(ue!==_t||Te!==In||Pe!==kn)&&(i.stencilFunc(_t,In,kn),ue=_t,Te=In,Pe=kn)},setOp:function(_t,In,kn){(fe!==_t||qe!==In||Ve!==kn)&&(i.stencilOp(_t,In,kn),fe=_t,qe=In,Ve=kn)},setLocked:function(_t){$=_t},setClear:function(_t){wt!==_t&&(i.clearStencil(_t),wt=_t)},reset:function(){$=!1,we=null,ue=null,Te=null,Pe=null,fe=null,qe=null,Ve=null,wt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,A=null,D=null,M=null,v=null,b=null,I=null,_=new Be(0,0,0),w=0,N=!1,O=null,B=null,U=null,S=null,F=null,z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,H=0,C=i.getParameter(i.VERSION);C.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(C)[1]),W=H>=1):C.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(C)[1]),W=H>=2);let G=null,L={},X=i.getParameter(i.SCISSOR_BOX),ee=i.getParameter(i.VIEWPORT),te=new It().fromArray(X),se=new It().fromArray(ee);function ce($,we,ue,Te){let Pe=new Uint8Array(4),fe=i.createTexture();i.bindTexture($,fe),i.texParameteri($,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri($,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qe=0;qe<ue;qe++)$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?i.texImage3D(we,0,i.RGBA,1,1,Te,0,i.RGBA,i.UNSIGNED_BYTE,Pe):i.texImage2D(we+qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pe);return fe}let Z={};Z[i.TEXTURE_2D]=ce(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=ce(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=ce(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=ce(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(i.DEPTH_TEST),a.setFunc(vs),Ue(!1),Ye(rc),J(i.CULL_FACE),Q(Zn);function J($){h[$]!==!0&&(i.enable($),h[$]=!0)}function pe($){h[$]!==!1&&(i.disable($),h[$]=!1)}function ge($,we){return u[$]!==we?(i.bindFramebuffer($,we),u[$]=we,$===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=we),$===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=we),!0):!1}function xe($,we){let ue=g,Te=!1;if($){ue=f.get(we),ue===void 0&&(ue=[],f.set(we,ue));let Pe=$.textures;if(ue.length!==Pe.length||ue[0]!==i.COLOR_ATTACHMENT0){for(let fe=0,qe=Pe.length;fe<qe;fe++)ue[fe]=i.COLOR_ATTACHMENT0+fe;ue.length=Pe.length,Te=!0}}else ue[0]!==i.BACK&&(ue[0]=i.BACK,Te=!0);Te&&i.drawBuffers(ue)}function $e($){return x!==$?(i.useProgram($),x=$,!0):!1}let ot={[$i]:i.FUNC_ADD,[eu]:i.FUNC_SUBTRACT,[tu]:i.FUNC_REVERSE_SUBTRACT};ot[nu]=i.MIN,ot[iu]=i.MAX;let et={[su]:i.ZERO,[ru]:i.ONE,[au]:i.SRC_COLOR,[lc]:i.SRC_ALPHA,[du]:i.SRC_ALPHA_SATURATE,[hu]:i.DST_COLOR,[lu]:i.DST_ALPHA,[ou]:i.ONE_MINUS_SRC_COLOR,[cc]:i.ONE_MINUS_SRC_ALPHA,[uu]:i.ONE_MINUS_DST_COLOR,[cu]:i.ONE_MINUS_DST_ALPHA,[fu]:i.CONSTANT_COLOR,[pu]:i.ONE_MINUS_CONSTANT_COLOR,[mu]:i.CONSTANT_ALPHA,[gu]:i.ONE_MINUS_CONSTANT_ALPHA};function Q($,we,ue,Te,Pe,fe,qe,Ve,wt,_t){if($===Zn){m===!0&&(pe(i.BLEND),m=!1);return}if(m===!1&&(J(i.BLEND),m=!0),$!==Qh){if($!==p||_t!==N){if((A!==$i||v!==$i)&&(i.blendEquation(i.FUNC_ADD),A=$i,v=$i),_t)switch($){case Ds:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ar:i.blendFunc(i.ONE,i.ONE);break;case ac:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case oc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Qe("WebGLState: Invalid blending: ",$);break}else switch($){case Ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ar:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ac:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case oc:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",$);break}D=null,M=null,b=null,I=null,_.set(0,0,0),w=0,p=$,N=_t}return}Pe=Pe||we,fe=fe||ue,qe=qe||Te,(we!==A||Pe!==v)&&(i.blendEquationSeparate(ot[we],ot[Pe]),A=we,v=Pe),(ue!==D||Te!==M||fe!==b||qe!==I)&&(i.blendFuncSeparate(et[ue],et[Te],et[fe],et[qe]),D=ue,M=Te,b=fe,I=qe),(Ve.equals(_)===!1||wt!==w)&&(i.blendColor(Ve.r,Ve.g,Ve.b,wt),_.copy(Ve),w=wt),p=$,N=!1}function _e($,we){$.side===Zt?pe(i.CULL_FACE):J(i.CULL_FACE);let ue=$.side===Bt;we&&(ue=!ue),Ue(ue),$.blending===Ds&&$.transparent===!1?Q(Zn):Q($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),a.setFunc($.depthFunc),a.setTest($.depthTest),a.setMask($.depthWrite),r.setMask($.colorWrite);let Te=$.stencilWrite;o.setTest(Te),Te&&(o.setMask($.stencilWriteMask),o.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),o.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),ut($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ue($){O!==$&&($?i.frontFace(i.CW):i.frontFace(i.CCW),O=$)}function Ye($){$!==Jh?(J(i.CULL_FACE),$!==B&&($===rc?i.cullFace(i.BACK):$===Kh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pe(i.CULL_FACE),B=$}function Ke($){$!==U&&(W&&i.lineWidth($),U=$)}function ut($,we,ue){$?(J(i.POLYGON_OFFSET_FILL),(S!==we||F!==ue)&&(S=we,F=ue,a.getReversed()&&(we=-we),i.polygonOffset(we,ue))):pe(i.POLYGON_OFFSET_FILL)}function yt($){$?J(i.SCISSOR_TEST):pe(i.SCISSOR_TEST)}function j($){$===void 0&&($=i.TEXTURE0+z-1),G!==$&&(i.activeTexture($),G=$)}function E($,we,ue){ue===void 0&&(G===null?ue=i.TEXTURE0+z-1:ue=G);let Te=L[ue];Te===void 0&&(Te={type:void 0,texture:void 0},L[ue]=Te),(Te.type!==$||Te.texture!==we)&&(G!==ue&&(i.activeTexture(ue),G=ue),i.bindTexture($,we||Z[$]),Te.type=$,Te.texture=we)}function re(){let $=L[G];$!==void 0&&$.type!==void 0&&(i.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function de(){try{i.compressedTexImage2D(...arguments)}catch($){Qe("WebGLState:",$)}}function R(){try{i.compressedTexImage3D(...arguments)}catch($){Qe("WebGLState:",$)}}function y(){try{i.texSubImage2D(...arguments)}catch($){Qe("WebGLState:",$)}}function q(){try{i.texSubImage3D(...arguments)}catch($){Qe("WebGLState:",$)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch($){Qe("WebGLState:",$)}}function oe(){try{i.compressedTexSubImage3D(...arguments)}catch($){Qe("WebGLState:",$)}}function me(){try{i.texStorage2D(...arguments)}catch($){Qe("WebGLState:",$)}}function ve(){try{i.texStorage3D(...arguments)}catch($){Qe("WebGLState:",$)}}function le(){try{i.texImage2D(...arguments)}catch($){Qe("WebGLState:",$)}}function he(){try{i.texImage3D(...arguments)}catch($){Qe("WebGLState:",$)}}function Me($){return d[$]!==void 0?d[$]:i.getParameter($)}function Oe($,we){d[$]!==we&&(i.pixelStorei($,we),d[$]=we)}function Ee($){te.equals($)===!1&&(i.scissor($.x,$.y,$.z,$.w),te.copy($))}function Se($){se.equals($)===!1&&(i.viewport($.x,$.y,$.z,$.w),se.copy($))}function Xe($,we){let ue=c.get(we);ue===void 0&&(ue=new WeakMap,c.set(we,ue));let Te=ue.get($);Te===void 0&&(Te=i.getUniformBlockIndex(we,$.name),ue.set($,Te))}function je($,we){let Te=c.get(we).get($);l.get(we)!==Te&&(i.uniformBlockBinding(we,Te,$.__bindingPointIndex),l.set(we,Te))}function it(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},G=null,L={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,A=null,D=null,M=null,v=null,b=null,I=null,_=new Be(0,0,0),w=0,N=!1,O=null,B=null,U=null,S=null,F=null,te.set(0,0,i.canvas.width,i.canvas.height),se.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:pe,bindFramebuffer:ge,drawBuffers:xe,useProgram:$e,setBlending:Q,setMaterial:_e,setFlipSided:Ue,setCullFace:Ye,setLineWidth:Ke,setPolygonOffset:ut,setScissorTest:yt,activeTexture:j,bindTexture:E,unbindTexture:re,compressedTexImage2D:de,compressedTexImage3D:R,texImage2D:le,texImage3D:he,pixelStorei:Oe,getParameter:Me,updateUBOMapping:Xe,uniformBlockBinding:je,texStorage2D:me,texStorage3D:ve,texSubImage2D:y,texSubImage3D:q,compressedTexSubImage2D:K,compressedTexSubImage3D:oe,scissor:Ee,viewport:Se,reset:it}}function Rx(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new De,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,y){return g?new OffscreenCanvas(R,y):ar("canvas")}function m(R,y,q){let K=1,oe=de(R);if((oe.width>q||oe.height>q)&&(K=q/Math.max(oe.width,oe.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let me=Math.floor(K*oe.width),ve=Math.floor(K*oe.height);u===void 0&&(u=x(me,ve));let le=y?x(me,ve):u;return le.width=me,le.height=ve,le.getContext("2d").drawImage(R,0,0,me,ve),Ze("WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+me+"x"+ve+")."),le}else return"data"in R&&Ze("WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),R;return R}function p(R){return R.generateMipmaps}function A(R){i.generateMipmap(R)}function D(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(R,y,q,K,oe,me=!1){if(R!==null){if(i[R]!==void 0)return i[R];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ve;K&&(ve=e.get("EXT_texture_norm16"),ve||Ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let le=y;if(y===i.RED&&(q===i.FLOAT&&(le=i.R32F),q===i.HALF_FLOAT&&(le=i.R16F),q===i.UNSIGNED_BYTE&&(le=i.R8),q===i.UNSIGNED_SHORT&&ve&&(le=ve.R16_EXT),q===i.SHORT&&ve&&(le=ve.R16_SNORM_EXT)),y===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(le=i.R8UI),q===i.UNSIGNED_SHORT&&(le=i.R16UI),q===i.UNSIGNED_INT&&(le=i.R32UI),q===i.BYTE&&(le=i.R8I),q===i.SHORT&&(le=i.R16I),q===i.INT&&(le=i.R32I)),y===i.RG&&(q===i.FLOAT&&(le=i.RG32F),q===i.HALF_FLOAT&&(le=i.RG16F),q===i.UNSIGNED_BYTE&&(le=i.RG8),q===i.UNSIGNED_SHORT&&ve&&(le=ve.RG16_EXT),q===i.SHORT&&ve&&(le=ve.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(le=i.RG8UI),q===i.UNSIGNED_SHORT&&(le=i.RG16UI),q===i.UNSIGNED_INT&&(le=i.RG32UI),q===i.BYTE&&(le=i.RG8I),q===i.SHORT&&(le=i.RG16I),q===i.INT&&(le=i.RG32I)),y===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(le=i.RGB8UI),q===i.UNSIGNED_SHORT&&(le=i.RGB16UI),q===i.UNSIGNED_INT&&(le=i.RGB32UI),q===i.BYTE&&(le=i.RGB8I),q===i.SHORT&&(le=i.RGB16I),q===i.INT&&(le=i.RGB32I)),y===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(le=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(le=i.RGBA16UI),q===i.UNSIGNED_INT&&(le=i.RGBA32UI),q===i.BYTE&&(le=i.RGBA8I),q===i.SHORT&&(le=i.RGBA16I),q===i.INT&&(le=i.RGBA32I)),y===i.RGB&&(q===i.UNSIGNED_SHORT&&ve&&(le=ve.RGB16_EXT),q===i.SHORT&&ve&&(le=ve.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(le=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(le=i.R11F_G11F_B10F)),y===i.RGBA){let he=me?rr:ht.getTransfer(oe);q===i.FLOAT&&(le=i.RGBA32F),q===i.HALF_FLOAT&&(le=i.RGBA16F),q===i.UNSIGNED_BYTE&&(le=he===Mt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&ve&&(le=ve.RGBA16_EXT),q===i.SHORT&&ve&&(le=ve.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(le=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(le=i.RGB5_A1)}return(le===i.R16F||le===i.R32F||le===i.RG16F||le===i.RG32F||le===i.RGBA16F||le===i.RGBA32F)&&e.get("EXT_color_buffer_float"),le}function v(R,y){let q;return R?y===null||y===Gn||y===Us?q=i.DEPTH24_STENCIL8:y===wn?q=i.DEPTH32F_STENCIL8:y===Ns&&(q=i.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Gn||y===Us?q=i.DEPTH_COMPONENT24:y===wn?q=i.DEPTH_COMPONENT32F:y===Ns&&(q=i.DEPTH_COMPONENT16),q}function b(R,y){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==$t&&R.minFilter!==Kt?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function I(R){let y=R.target;y.removeEventListener("dispose",I),w(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&d.delete(y)}function _(R){let y=R.target;y.removeEventListener("dispose",_),O(y)}function w(R){let y=n.get(R);if(y.__webglInit===void 0)return;let q=R.source,K=f.get(q);if(K){let oe=K[y.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&N(R),Object.keys(K).length===0&&f.delete(q)}n.remove(R)}function N(R){let y=n.get(R);i.deleteTexture(y.__webglTexture);let q=R.source,K=f.get(q);delete K[y.__cacheKey],a.memory.textures--}function O(R){let y=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(y.__webglFramebuffer[K]))for(let oe=0;oe<y.__webglFramebuffer[K].length;oe++)i.deleteFramebuffer(y.__webglFramebuffer[K][oe]);else i.deleteFramebuffer(y.__webglFramebuffer[K]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[K])}else{if(Array.isArray(y.__webglFramebuffer))for(let K=0;K<y.__webglFramebuffer.length;K++)i.deleteFramebuffer(y.__webglFramebuffer[K]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let K=0;K<y.__webglColorRenderbuffer.length;K++)y.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[K]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let q=R.textures;for(let K=0,oe=q.length;K<oe;K++){let me=n.get(q[K]);me.__webglTexture&&(i.deleteTexture(me.__webglTexture),a.memory.textures--),n.remove(q[K])}n.remove(R)}let B=0;function U(){B=0}function S(){return B}function F(R){B=R}function z(){let R=B;return R>=s.maxTextures&&Ze("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,R}function W(R){let y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function H(R,y){let q=n.get(R);if(R.isVideoTexture&&E(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&q.__version!==R.version){let K=R.image;if(K===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ze("WebGLRenderer: Texture marked for update but image is incomplete");else{pe(q,R,y);return}}else R.isExternalTexture&&(q.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+y)}function C(R,y){let q=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&q.__version!==R.version){pe(q,R,y);return}else R.isExternalTexture&&(q.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+y)}function G(R,y){let q=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&q.__version!==R.version){pe(q,R,y);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+y)}function L(R,y){let q=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&q.__version!==R.version){ge(q,R,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+y)}let X={[Vi]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[Pa]:i.MIRRORED_REPEAT},ee={[$t]:i.NEAREST,[_u]:i.NEAREST_MIPMAP_NEAREST,[Pr]:i.NEAREST_MIPMAP_LINEAR,[Kt]:i.LINEAR,[fo]:i.LINEAR_MIPMAP_NEAREST,[Di]:i.LINEAR_MIPMAP_LINEAR},te={[bu]:i.NEVER,[Au]:i.ALWAYS,[Eu]:i.LESS,[jo]:i.LEQUAL,[Su]:i.EQUAL,[Qo]:i.GEQUAL,[wu]:i.GREATER,[Tu]:i.NOTEQUAL};function se(R,y){if(y.type===wn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Kt||y.magFilter===fo||y.magFilter===Pr||y.magFilter===Di||y.minFilter===Kt||y.minFilter===fo||y.minFilter===Pr||y.minFilter===Di)&&Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,X[y.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,X[y.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,X[y.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,ee[y.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,ee[y.minFilter]),y.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,te[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===$t||y.minFilter!==Pr&&y.minFilter!==Di||y.type===wn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ce(R,y){let q=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",I));let K=y.source,oe=f.get(K);oe===void 0&&(oe={},f.set(K,oe));let me=W(y);if(me!==R.__cacheKey){oe[me]===void 0&&(oe[me]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),oe[me].usedTimes++;let ve=oe[R.__cacheKey];ve!==void 0&&(oe[R.__cacheKey].usedTimes--,ve.usedTimes===0&&N(y)),R.__cacheKey=me,R.__webglTexture=oe[me].texture}return q}function Z(R,y,q){return Math.floor(Math.floor(R/q)/y)}function J(R,y,q,K){let me=R.updateRanges;if(me.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,q,K,y.data);else{me.sort((Oe,Ee)=>Oe.start-Ee.start);let ve=0;for(let Oe=1;Oe<me.length;Oe++){let Ee=me[ve],Se=me[Oe],Xe=Ee.start+Ee.count,je=Z(Se.start,y.width,4),it=Z(Ee.start,y.width,4);Se.start<=Xe+1&&je===it&&Z(Se.start+Se.count-1,y.width,4)===je?Ee.count=Math.max(Ee.count,Se.start+Se.count-Ee.start):(++ve,me[ve]=Se)}me.length=ve+1;let le=t.getParameter(i.UNPACK_ROW_LENGTH),he=t.getParameter(i.UNPACK_SKIP_PIXELS),Me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Oe=0,Ee=me.length;Oe<Ee;Oe++){let Se=me[Oe],Xe=Math.floor(Se.start/4),je=Math.ceil(Se.count/4),it=Xe%y.width,$=Math.floor(Xe/y.width),we=je,ue=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,it),t.pixelStorei(i.UNPACK_SKIP_ROWS,$),t.texSubImage2D(i.TEXTURE_2D,0,it,$,we,ue,q,K,y.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,le),t.pixelStorei(i.UNPACK_SKIP_PIXELS,he),t.pixelStorei(i.UNPACK_SKIP_ROWS,Me)}}function pe(R,y,q){let K=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(K=i.TEXTURE_3D);let oe=ce(R,y),me=y.source;t.bindTexture(K,R.__webglTexture,i.TEXTURE0+q);let ve=n.get(me);if(me.version!==ve.__version||oe===!0){if(t.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let ue=ht.getPrimaries(ht.workingColorSpace),Te=y.colorSpace===An?null:ht.getPrimaries(y.colorSpace),Pe=y.colorSpace===An||ue===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let he=m(y.image,!1,s.maxTextureSize);he=re(y,he);let Me=r.convert(y.format,y.colorSpace),Oe=r.convert(y.type),Ee=M(y.internalFormat,Me,Oe,y.normalized,y.colorSpace,y.isVideoTexture);se(K,y);let Se,Xe=y.mipmaps,je=y.isVideoTexture!==!0,it=ve.__version===void 0||oe===!0,$=me.dataReady,we=b(y,he);if(y.isDepthTexture)Ee=v(y.format===Ni,y.type),it&&(je?t.texStorage2D(i.TEXTURE_2D,1,Ee,he.width,he.height):t.texImage2D(i.TEXTURE_2D,0,Ee,he.width,he.height,0,Me,Oe,null));else if(y.isDataTexture)if(Xe.length>0){je&&it&&t.texStorage2D(i.TEXTURE_2D,we,Ee,Xe[0].width,Xe[0].height);for(let ue=0,Te=Xe.length;ue<Te;ue++)Se=Xe[ue],je?$&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,Se.width,Se.height,Me,Oe,Se.data):t.texImage2D(i.TEXTURE_2D,ue,Ee,Se.width,Se.height,0,Me,Oe,Se.data);y.generateMipmaps=!1}else je?(it&&t.texStorage2D(i.TEXTURE_2D,we,Ee,he.width,he.height),$&&J(y,he,Me,Oe)):t.texImage2D(i.TEXTURE_2D,0,Ee,he.width,he.height,0,Me,Oe,he.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){je&&it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ee,Xe[0].width,Xe[0].height,he.depth);for(let ue=0,Te=Xe.length;ue<Te;ue++)if(Se=Xe[ue],y.format!==Tn)if(Me!==null)if(je){if($)if(y.layerUpdates.size>0){let Pe=Pc(Se.width,Se.height,y.format,y.type);for(let fe of y.layerUpdates){let qe=Se.data.subarray(fe*Pe/Se.data.BYTES_PER_ELEMENT,(fe+1)*Pe/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,fe,Se.width,Se.height,1,Me,qe)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,Se.width,Se.height,he.depth,Me,Se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ue,Ee,Se.width,Se.height,he.depth,0,Se.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?$&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,Se.width,Se.height,he.depth,Me,Oe,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ue,Ee,Se.width,Se.height,he.depth,0,Me,Oe,Se.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{je&&it&&t.texStorage2D(i.TEXTURE_2D,we,Ee,Xe[0].width,Xe[0].height);for(let ue=0,Te=Xe.length;ue<Te;ue++)Se=Xe[ue],y.format!==Tn?Me!==null?je?$&&t.compressedTexSubImage2D(i.TEXTURE_2D,ue,0,0,Se.width,Se.height,Me,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,ue,Ee,Se.width,Se.height,0,Se.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?$&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,Se.width,Se.height,Me,Oe,Se.data):t.texImage2D(i.TEXTURE_2D,ue,Ee,Se.width,Se.height,0,Me,Oe,Se.data)}else if(y.isDataArrayTexture)if(je){if(it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ee,he.width,he.height,he.depth),$)if(y.layerUpdates.size>0){let ue=Pc(he.width,he.height,y.format,y.type);for(let Te of y.layerUpdates){let Pe=he.data.subarray(Te*ue/he.data.BYTES_PER_ELEMENT,(Te+1)*ue/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Te,he.width,he.height,1,Me,Oe,Pe)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Me,Oe,he.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,he.width,he.height,he.depth,0,Me,Oe,he.data);else if(y.isData3DTexture)je?(it&&t.texStorage3D(i.TEXTURE_3D,we,Ee,he.width,he.height,he.depth),$&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Me,Oe,he.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,he.width,he.height,he.depth,0,Me,Oe,he.data);else if(y.isFramebufferTexture){if(it)if(je)t.texStorage2D(i.TEXTURE_2D,we,Ee,he.width,he.height);else{let ue=he.width,Te=he.height;for(let Pe=0;Pe<we;Pe++)t.texImage2D(i.TEXTURE_2D,Pe,Ee,ue,Te,0,Me,Oe,null),ue>>=1,Te>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let ue=i.canvas;if(ue.hasAttribute("layoutsubtree")||ue.setAttribute("layoutsubtree","true"),he.parentNode!==ue){ue.appendChild(he),d.add(y),ue.onpaint=Te=>{let Pe=Te.changedElements;for(let fe of d)Pe.includes(fe.image)&&(fe.needsUpdate=!0)},ue.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,he);else{let Pe=i.RGBA,fe=i.RGBA,qe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Pe,fe,qe,he)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Xe.length>0){if(je&&it){let ue=de(Xe[0]);t.texStorage2D(i.TEXTURE_2D,we,Ee,ue.width,ue.height)}for(let ue=0,Te=Xe.length;ue<Te;ue++)Se=Xe[ue],je?$&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,Me,Oe,Se):t.texImage2D(i.TEXTURE_2D,ue,Ee,Me,Oe,Se);y.generateMipmaps=!1}else if(je){if(it){let ue=de(he);t.texStorage2D(i.TEXTURE_2D,we,Ee,ue.width,ue.height)}$&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Me,Oe,he)}else t.texImage2D(i.TEXTURE_2D,0,Ee,Me,Oe,he);p(y)&&A(K),ve.__version=me.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function ge(R,y,q){if(y.image.length!==6)return;let K=ce(R,y),oe=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+q);let me=n.get(oe);if(oe.version!==me.__version||K===!0){t.activeTexture(i.TEXTURE0+q);let ve=ht.getPrimaries(ht.workingColorSpace),le=y.colorSpace===An?null:ht.getPrimaries(y.colorSpace),he=y.colorSpace===An||ve===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);let Me=y.isCompressedTexture||y.image[0].isCompressedTexture,Oe=y.image[0]&&y.image[0].isDataTexture,Ee=[];for(let fe=0;fe<6;fe++)!Me&&!Oe?Ee[fe]=m(y.image[fe],!0,s.maxCubemapSize):Ee[fe]=Oe?y.image[fe].image:y.image[fe],Ee[fe]=re(y,Ee[fe]);let Se=Ee[0],Xe=r.convert(y.format,y.colorSpace),je=r.convert(y.type),it=M(y.internalFormat,Xe,je,y.normalized,y.colorSpace),$=y.isVideoTexture!==!0,we=me.__version===void 0||K===!0,ue=oe.dataReady,Te=b(y,Se);se(i.TEXTURE_CUBE_MAP,y);let Pe;if(Me){$&&we&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Te,it,Se.width,Se.height);for(let fe=0;fe<6;fe++){Pe=Ee[fe].mipmaps;for(let qe=0;qe<Pe.length;qe++){let Ve=Pe[qe];y.format!==Tn?Xe!==null?$?ue&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe,0,0,Ve.width,Ve.height,Xe,Ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe,it,Ve.width,Ve.height,0,Ve.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe,0,0,Ve.width,Ve.height,Xe,je,Ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe,it,Ve.width,Ve.height,0,Xe,je,Ve.data)}}}else{if(Pe=y.mipmaps,$&&we){Pe.length>0&&Te++;let fe=de(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Te,it,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(Oe){$?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ee[fe].width,Ee[fe].height,Xe,je,Ee[fe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,it,Ee[fe].width,Ee[fe].height,0,Xe,je,Ee[fe].data);for(let qe=0;qe<Pe.length;qe++){let wt=Pe[qe].image[fe].image;$?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe+1,0,0,wt.width,wt.height,Xe,je,wt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe+1,it,wt.width,wt.height,0,Xe,je,wt.data)}}else{$?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Xe,je,Ee[fe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,it,Xe,je,Ee[fe]);for(let qe=0;qe<Pe.length;qe++){let Ve=Pe[qe];$?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe+1,0,0,Xe,je,Ve.image[fe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe+1,it,Xe,je,Ve.image[fe])}}}p(y)&&A(i.TEXTURE_CUBE_MAP),me.__version=oe.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function xe(R,y,q,K,oe,me){let ve=r.convert(q.format,q.colorSpace),le=r.convert(q.type),he=M(q.internalFormat,ve,le,q.normalized,q.colorSpace),Me=n.get(y),Oe=n.get(q);if(Oe.__renderTarget=y,!Me.__hasExternalTextures){let Ee=Math.max(1,y.width>>me),Se=Math.max(1,y.height>>me);oe===i.TEXTURE_3D||oe===i.TEXTURE_2D_ARRAY?t.texImage3D(oe,me,he,Ee,Se,y.depth,0,ve,le,null):t.texImage2D(oe,me,he,Ee,Se,0,ve,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),j(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,oe,Oe.__webglTexture,0,yt(y)):(oe===i.TEXTURE_2D||oe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,oe,Oe.__webglTexture,me),t.bindFramebuffer(i.FRAMEBUFFER,null)}function $e(R,y,q){if(i.bindRenderbuffer(i.RENDERBUFFER,R),y.depthBuffer){let K=y.depthTexture,oe=K&&K.isDepthTexture?K.type:null,me=v(y.stencilBuffer,oe),ve=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;j(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(y),me,y.width,y.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(y),me,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,me,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,R)}else{let K=y.textures;for(let oe=0;oe<K.length;oe++){let me=K[oe],ve=r.convert(me.format,me.colorSpace),le=r.convert(me.type),he=M(me.internalFormat,ve,le,me.normalized,me.colorSpace);j(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(y),he,y.width,y.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(y),he,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,he,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ot(R,y,q){let K=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let oe=n.get(y.depthTexture);if(oe.__renderTarget=y,(!oe.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),K){if(oe.__webglInit===void 0&&(oe.__webglInit=!0,y.depthTexture.addEventListener("dispose",I)),oe.__webglTexture===void 0){oe.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,oe.__webglTexture),se(i.TEXTURE_CUBE_MAP,y.depthTexture);let Me=r.convert(y.depthTexture.format),Oe=r.convert(y.depthTexture.type),Ee;y.depthTexture.format===qn?Ee=i.DEPTH_COMPONENT24:y.depthTexture.format===Ni&&(Ee=i.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,Ee,y.width,y.height,0,Me,Oe,null)}}else H(y.depthTexture,0);let me=oe.__webglTexture,ve=yt(y),le=K?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,he=y.depthTexture.format===Ni?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===qn)j(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,he,le,me,0,ve):i.framebufferTexture2D(i.FRAMEBUFFER,he,le,me,0);else if(y.depthTexture.format===Ni)j(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,he,le,me,0,ve):i.framebufferTexture2D(i.FRAMEBUFFER,he,le,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function et(R){let y=n.get(R),q=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){let K=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),K){let oe=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,K.removeEventListener("dispose",oe)};K.addEventListener("dispose",oe),y.__depthDisposeCallback=oe}y.__boundDepthTexture=K}if(R.depthTexture&&!y.__autoAllocateDepthBuffer)if(q)for(let K=0;K<6;K++)ot(y.__webglFramebuffer[K],R,K);else{let K=R.texture.mipmaps;K&&K.length>0?ot(y.__webglFramebuffer[0],R,0):ot(y.__webglFramebuffer,R,0)}else if(q){y.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[K]),y.__webglDepthbuffer[K]===void 0)y.__webglDepthbuffer[K]=i.createRenderbuffer(),$e(y.__webglDepthbuffer[K],R,!1);else{let oe=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=y.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,me),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,me)}}else{let K=R.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),$e(y.__webglDepthbuffer,R,!1);else{let oe=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,me),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,me)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Q(R,y,q){let K=n.get(R);y!==void 0&&xe(K.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&et(R)}function _e(R){let y=R.texture,q=n.get(R),K=n.get(y);R.addEventListener("dispose",_);let oe=R.textures,me=R.isWebGLCubeRenderTarget===!0,ve=oe.length>1;if(ve||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=y.version,a.memory.textures++),me){q.__webglFramebuffer=[];for(let le=0;le<6;le++)if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer[le]=[];for(let he=0;he<y.mipmaps.length;he++)q.__webglFramebuffer[le][he]=i.createFramebuffer()}else q.__webglFramebuffer[le]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){q.__webglFramebuffer=[];for(let le=0;le<y.mipmaps.length;le++)q.__webglFramebuffer[le]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(ve)for(let le=0,he=oe.length;le<he;le++){let Me=n.get(oe[le]);Me.__webglTexture===void 0&&(Me.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&j(R)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let le=0;le<oe.length;le++){let he=oe[le];q.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[le]);let Me=r.convert(he.format,he.colorSpace),Oe=r.convert(he.type),Ee=M(he.internalFormat,Me,Oe,he.normalized,he.colorSpace,R.isXRRenderTarget===!0),Se=yt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,Ee,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,q.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),$e(q.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(me){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),se(i.TEXTURE_CUBE_MAP,y);for(let le=0;le<6;le++)if(y.mipmaps&&y.mipmaps.length>0)for(let he=0;he<y.mipmaps.length;he++)xe(q.__webglFramebuffer[le][he],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,he);else xe(q.__webglFramebuffer[le],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);p(y)&&A(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let le=0,he=oe.length;le<he;le++){let Me=oe[le],Oe=n.get(Me),Ee=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Ee=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ee,Oe.__webglTexture),se(Ee,Me),xe(q.__webglFramebuffer,R,Me,i.COLOR_ATTACHMENT0+le,Ee,0),p(Me)&&A(Ee)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(le=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,K.__webglTexture),se(le,y),y.mipmaps&&y.mipmaps.length>0)for(let he=0;he<y.mipmaps.length;he++)xe(q.__webglFramebuffer[he],R,y,i.COLOR_ATTACHMENT0,le,he);else xe(q.__webglFramebuffer,R,y,i.COLOR_ATTACHMENT0,le,0);p(y)&&A(le),t.unbindTexture()}R.depthBuffer&&et(R)}function Ue(R){let y=R.textures;for(let q=0,K=y.length;q<K;q++){let oe=y[q];if(p(oe)){let me=D(R),ve=n.get(oe).__webglTexture;t.bindTexture(me,ve),A(me),t.unbindTexture()}}}let Ye=[],Ke=[];function ut(R){if(R.samples>0){if(j(R)===!1){let y=R.textures,q=R.width,K=R.height,oe=i.COLOR_BUFFER_BIT,me=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(R),le=y.length>1;if(le)for(let Me=0;Me<y.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);let he=R.texture.mipmaps;he&&he.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let Me=0;Me<y.length;Me++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(oe|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(oe|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[Me]);let Oe=n.get(y[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Oe,0)}i.blitFramebuffer(0,0,q,K,0,0,q,K,oe,i.NEAREST),l===!0&&(Ye.length=0,Ke.length=0,Ye.push(i.COLOR_ATTACHMENT0+Me),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(Ye.push(me),Ke.push(me),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ke)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ye))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let Me=0;Me<y.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,ve.__webglColorRenderbuffer[Me]);let Oe=n.get(y[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function yt(R){return Math.min(s.maxSamples,R.samples)}function j(R){let y=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function E(R){let y=a.render.frame;h.get(R)!==y&&(h.set(R,y),R.update())}function re(R,y){let q=R.colorSpace,K=R.format,oe=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||q!==sr&&q!==An&&(ht.getTransfer(q)===Mt?(K!==Tn||oe!==un)&&Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",q)),y}function de(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=U,this.getTextureUnits=S,this.setTextureUnits=F,this.setTexture2D=H,this.setTexture2DArray=C,this.setTexture3D=G,this.setTextureCube=L,this.rebindTextures=Q,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=Ue,this.updateMultisampleRenderTarget=ut,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Cx(i,e){function t(n,s=An){let r,a=ht.getTransfer(s);if(n===un)return i.UNSIGNED_BYTE;if(n===mo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===go)return i.UNSIGNED_SHORT_5_5_5_1;if(n===_c)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===vc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===xc)return i.BYTE;if(n===yc)return i.SHORT;if(n===Ns)return i.UNSIGNED_SHORT;if(n===po)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===zn)return i.HALF_FLOAT;if(n===Mc)return i.ALPHA;if(n===bc)return i.RGB;if(n===Tn)return i.RGBA;if(n===qn)return i.DEPTH_COMPONENT;if(n===Ni)return i.DEPTH_STENCIL;if(n===xo)return i.RED;if(n===yo)return i.RED_INTEGER;if(n===Ui)return i.RG;if(n===_o)return i.RG_INTEGER;if(n===vo)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Nr||n===Ur)if(a===Mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mo||n===bo||n===Eo||n===So)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Eo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===So)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===wo||n===To||n===Ao||n===Ro||n===Co||n===Fr||n===Io)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===wo||n===To)return a===Mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ao)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ro)return r.COMPRESSED_R11_EAC;if(n===Co)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Fr)return r.COMPRESSED_RG11_EAC;if(n===Io)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Po||n===Lo||n===Do||n===No||n===Uo||n===Fo||n===Bo||n===Oo||n===Ho||n===Go||n===zo||n===ko||n===Vo||n===Wo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Po)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lo)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Do)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===No)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Uo)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fo)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Bo)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oo)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ho)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Go)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===zo)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ko)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vo)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wo)return a===Mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xo||n===qo||n===Yo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Xo)return a===Mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===$o||n===Zo||n===Br||n===Jo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===$o)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Zo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Br)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Jo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Us?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Ix=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Px=`
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

}`,Jc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new fr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ln({vertexShader:Ix,fragmentShader:Px,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new k(new Bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Kc=class extends Yn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new Jc,p={},A=t.getContextAttributes(),D=null,M=null,v=[],b=[],I=new De,_=null,w=null,N=new Jt;N.viewport=new It;let O=new Jt;O.viewport=new It;let B=[N,O],U=new lo,S=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let J=v[Z];return J===void 0&&(J=new ws,v[Z]=J),J.getTargetRaySpace()},this.getControllerGrip=function(Z){let J=v[Z];return J===void 0&&(J=new ws,v[Z]=J),J.getGripSpace()},this.getHand=function(Z){let J=v[Z];return J===void 0&&(J=new ws,v[Z]=J),J.getHandSpace()};function z(Z){let J=b.indexOf(Z.inputSource);if(J===-1)return;let pe=v[J];pe!==void 0&&(pe.update(Z.inputSource,Z.frame,c||a),pe.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",H);for(let Z=0;Z<v.length;Z++){let J=b[Z];J!==null&&(b[Z]=null,v[Z].disconnect(J))}S=null,F=null,m.reset();for(let Z in p)delete p[Z];if(e.setRenderTarget(D),f=null,u=null,d=null,s=null,M=null,ce.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(I.width,I.height,!1),w!==null){let Z=w.camera;Z.fov=w.fov,Z.zoom=w.zoom,Z.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(D=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",W),s.addEventListener("inputsourceschange",H),A.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(I),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,ge=null,xe=null;A.depth&&(xe=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=A.stencil?Ni:qn,ge=A.stencil?Us:Gn);let $e={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer($e),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new hn(u.textureWidth,u.textureHeight,{format:Tn,type:un,depthTexture:new Ai(u.textureWidth,u.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let pe={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,pe),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new hn(f.framebufferWidth,f.framebufferHeight,{format:Tn,type:un,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ce.setContext(s),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(Z){for(let J=0;J<Z.removed.length;J++){let pe=Z.removed[J],ge=b.indexOf(pe);ge>=0&&(b[ge]=null,v[ge].disconnect(pe))}for(let J=0;J<Z.added.length;J++){let pe=Z.added[J],ge=b.indexOf(pe);if(ge===-1){for(let $e=0;$e<v.length;$e++)if($e>=b.length){b.push(pe),ge=$e;break}else if(b[$e]===null){b[$e]=pe,ge=$e;break}if(ge===-1)break}let xe=v[ge];xe&&xe.connect(pe)}}let C=new P,G=new P;function L(Z,J,pe){C.setFromMatrixPosition(J.matrixWorld),G.setFromMatrixPosition(pe.matrixWorld);let ge=C.distanceTo(G),xe=J.projectionMatrix.elements,$e=pe.projectionMatrix.elements,ot=xe[14]/(xe[10]-1),et=xe[14]/(xe[10]+1),Q=(xe[9]+1)/xe[5],_e=(xe[9]-1)/xe[5],Ue=(xe[8]-1)/xe[0],Ye=($e[8]+1)/$e[0],Ke=ot*Ue,ut=ot*Ye,yt=ge/(-Ue+Ye),j=yt*-Ue;if(J.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(j),Z.translateZ(yt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),xe[10]===-1)Z.projectionMatrix.copy(J.projectionMatrix),Z.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let E=ot+yt,re=et+yt,de=Ke-j,R=ut+(ge-j),y=Q*et/re*E,q=_e*et/re*E;Z.projectionMatrix.makePerspective(de,R,y,q,E,re),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function X(Z,J){J===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(J.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let J=Z.near,pe=Z.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),U.near=O.near=N.near=J,U.far=O.far=N.far=pe,(S!==U.near||F!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),S=U.near,F=U.far),U.layers.mask=Z.layers.mask|6,N.layers.mask=U.layers.mask&-5,O.layers.mask=U.layers.mask&-3;let ge=Z.parent,xe=U.cameras;X(U,ge);for(let $e=0;$e<xe.length;$e++)X(xe[$e],ge);xe.length===2?L(U,N,O):U.projectionMatrix.copy(N.projectionMatrix),w===null&&Z.isPerspectiveCamera&&(w={camera:Z,fov:Z.fov,zoom:Z.zoom}),ee(Z,U,ge)};function ee(Z,J,pe){pe===null?Z.matrix.copy(J.matrixWorld):(Z.matrix.copy(pe.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(J.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(J.projectionMatrix),Z.projectionMatrixInverse.copy(J.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Da*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(Z){return p[Z]};let te=null;function se(Z,J){if(h=J.getViewerPose(c||a),g=J,h!==null){let pe=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let ge=!1;pe.length!==U.cameras.length&&(U.cameras.length=0,ge=!0);for(let et=0;et<pe.length;et++){let Q=pe[et],_e=null;if(f!==null)_e=f.getViewport(Q);else{let Ye=d.getViewSubImage(u,Q);_e=Ye.viewport,et===0&&(e.setRenderTargetTextures(M,Ye.colorTexture,Ye.depthStencilTexture),e.setRenderTarget(M))}let Ue=B[et];Ue===void 0&&(Ue=new Jt,Ue.layers.enable(et),Ue.viewport=new It,B[et]=Ue),Ue.matrix.fromArray(Q.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(Q.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(_e.x,_e.y,_e.width,_e.height),et===0&&(U.matrix.copy(Ue.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ge===!0&&U.cameras.push(Ue)}let xe=s.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let et=d.getDepthInformation(pe[0]);et&&et.isValid&&et.texture&&m.init(et,s.renderState)}if(xe&&xe.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let et=0;et<pe.length;et++){let Q=pe[et].camera;if(Q){let _e=p[Q];_e||(_e=new fr,p[Q]=_e);let Ue=d.getCameraImage(Q);_e.sourceTexture=Ue}}}}for(let pe=0;pe<v.length;pe++){let ge=b[pe],xe=v[pe];ge!==null&&xe!==void 0&&xe.update(ge,J,c||a)}te&&te(Z,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}let ce=new sd;ce.setAnimationLoop(se),this.setAnimationLoop=function(Z){te=Z},this.dispose=function(){}}},Lx=new ft,hd=new tt;hd.set(-1,0,0,0,1,0,0,0,1);function Dx(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Rc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,A,D,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,A,D):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Bt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Bt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let A=e.get(p),D=A.envMap,M=A.envMapRotation;D&&(m.envMap.value=D,m.envMapRotation.value.setFromMatrix4(Lx.makeRotationFromEuler(M)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(hd),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,A,D){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*A,m.scale.value=D*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,A){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let A=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Nx(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,v){let b=v.program;n.uniformBlockBinding(M,b)}function c(M,v){let b=s[M.id];b===void 0&&(m(M),b=h(M),s[M.id]=b,M.addEventListener("dispose",A));let I=v.program;n.updateUBOMapping(M,I);let _=e.render.frame;r[M.id]!==_&&(u(M),r[M.id]=_)}function h(M){let v=d();M.__bindingPointIndex=v;let b=i.createBuffer(),I=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,I,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,b),b}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){let v=s[M.id],b=M.uniforms,I=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let _=0,w=b.length;_<w;_++){let N=b[_];if(Array.isArray(N))for(let O=0,B=N.length;O<B;O++)f(N[O],_,O,I);else f(N,_,0,I)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,v,b,I){if(x(M,v,b,I)===!0){let _=M.__offset,w=M.value;if(Array.isArray(w)){let N=0;for(let O=0;O<w.length;O++){let B=w[O],U=p(B);g(B,M.__data,N),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(N+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function g(M,v,b){typeof M=="number"||typeof M=="boolean"?v[0]=M:M.isMatrix3?(v[0]=M.elements[0],v[1]=M.elements[1],v[2]=M.elements[2],v[3]=0,v[4]=M.elements[3],v[5]=M.elements[4],v[6]=M.elements[5],v[7]=0,v[8]=M.elements[6],v[9]=M.elements[7],v[10]=M.elements[8],v[11]=0):ArrayBuffer.isView(M)?v.set(new M.constructor(M.buffer,M.byteOffset,v.length)):M.toArray(v,b)}function x(M,v,b,I){let _=M.value,w=v+"_"+b;if(I[w]===void 0)return typeof _=="number"||typeof _=="boolean"?I[w]=_:ArrayBuffer.isView(_)?I[w]=_.slice():I[w]=_.clone(),!0;{let N=I[w];if(typeof _=="number"||typeof _=="boolean"){if(N!==_)return I[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(N.equals(_)===!1)return N.copy(_),!0}}return!1}function m(M){let v=M.uniforms,b=0,I=16;for(let w=0,N=v.length;w<N;w++){let O=Array.isArray(v[w])?v[w]:[v[w]];for(let B=0,U=O.length;B<U;B++){let S=O[B],F=Array.isArray(S.value)?S.value:[S.value];for(let z=0,W=F.length;z<W;z++){let H=F[z],C=p(H),G=b%I,L=G%C.boundary,X=G+L;b+=L,X!==0&&I-X<C.storage&&(b+=I-X),S.__data=new Float32Array(C.storage/Float32Array.BYTES_PER_ELEMENT),S.__offset=b,b+=C.storage}}}let _=b%I;return _>0&&(b+=I-_),M.__size=b,M.__cache={},this}function p(M){let v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(v.boundary=16,v.storage=M.byteLength):Ze("WebGLRenderer: Unsupported uniform value type.",M),v}function A(M){let v=M.target;v.removeEventListener("dispose",A);let b=a.indexOf(v.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function D(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:D}}var Ux=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Jn=null;function Fx(){return Jn===null&&(Jn=new hr(Ux,16,16,Ui,zn),Jn.name="DFG_LUT",Jn.minFilter=Kt,Jn.magFilter=Kt,Jn.wrapS=Xn,Jn.wrapT=Xn,Jn.generateMipmaps=!1,Jn.needsUpdate=!0),Jn}var il=class{constructor(e={}){let{canvas:t=Cu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=un}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let x=f,m=new Set([vo,_o,yo]),p=new Set([un,Gn,Ns,Us,mo,go]),A=new Uint32Array(4),D=new Int32Array(4),M=new P,v=null,b=null,I=[],_=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,O=!1,B=null,U=null,S=null,F=null;this._outputColorSpace=kt;let z=0,W=0,H=null,C=-1,G=null,L=new It,X=new It,ee=null,te=new Be(0),se=0,ce=t.width,Z=t.height,J=1,pe=null,ge=null,xe=new It(0,0,ce,Z),$e=new It(0,0,ce,Z),ot=!1,et=new Rs,Q=!1,_e=!1,Ue=new ft,Ye=new P,Ke=new It,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yt=!1;function j(){return H===null?J:1}let E=n;function re(T,Y){return t.getContext(T,Y)}let de,R,y,q,K,oe,me,ve,le,he,Me,Oe,Ee,Se,Xe,je,it,$,we,ue,Te,Pe,fe;try{let T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",wt,!1),t.addEventListener("webglcontextrestored",_t,!1),t.addEventListener("webglcontextcreationerror",In,!1),E===null){let Y="webgl2";if(E=re(Y,T),E===null)throw re(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}qe()}catch(T){throw t.removeEventListener("webglcontextlost",wt,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",In,!1),Qe("WebGLRenderer: "+T.message),T}function qe(){de=new Vm(E),de.init(),Te=new Cx(E,de),R=new Dm(E,de,e,Te),y=new Ax(E,de),R.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),U=E.createFramebuffer(),S=E.createFramebuffer(),F=E.createFramebuffer(),q=new qm(E),K=new fx,oe=new Rx(E,de,y,K,R,Te,q),me=new km(N),ve=new $f(E),Pe=new Pm(E,ve),le=new Wm(E,ve,q,Pe),he=new $m(E,le,ve,Pe,q),$=new Ym(E,R,oe),Xe=new Nm(K),Me=new dx(N,me,de,R,Pe,Xe),Oe=new Dx(N,K),Ee=new mx,Se=new Mx(de),it=new Im(N,me,y,he,g,l),je=new Tx(N,he,R),fe=new Nx(E,q,R,y),we=new Lm(E,de,q),ue=new Xm(E,de,q),q.programs=Me.programs,N.capabilities=R,N.extensions=de,N.properties=K,N.renderLists=Ee,N.shadowMap=je,N.state=y,N.info=q}x!==un&&(w=new Jm(x,t.width,t.height,o,s,r));let Ve=new Kc(N,E);this.xr=Ve,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){let T=de.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=de.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(T){T!==void 0&&(J=T,this.setSize(ce,Z,!1))},this.getSize=function(T){return T.set(ce,Z)},this.setSize=function(T,Y,ae=!0){if(Ve.isPresenting){Ze("WebGLRenderer: Can't change size while VR device is presenting.");return}ce=T,Z=Y,t.width=Math.floor(T*J),t.height=Math.floor(Y*J),ae===!0&&(t.style.width=T+"px",t.style.height=Y+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,T,Y)},this.getDrawingBufferSize=function(T){return T.set(ce*J,Z*J).floor()},this.setDrawingBufferSize=function(T,Y,ae){ce=T,Z=Y,J=ae,t.width=Math.floor(T*ae),t.height=Math.floor(Y*ae),this.setViewport(0,0,T,Y)},this.setEffects=function(T){if(x===un){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let Y=0;Y<T.length;Y++)if(T[Y].isOutputPass===!0){Ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(xe)},this.setViewport=function(T,Y,ae,ne){T.isVector4?xe.set(T.x,T.y,T.z,T.w):xe.set(T,Y,ae,ne),y.viewport(L.copy(xe).multiplyScalar(J).round())},this.getScissor=function(T){return T.copy($e)},this.setScissor=function(T,Y,ae,ne){T.isVector4?$e.set(T.x,T.y,T.z,T.w):$e.set(T,Y,ae,ne),y.scissor(X.copy($e).multiplyScalar(J).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(T){y.setScissorTest(ot=T)},this.setOpaqueSort=function(T){pe=T},this.setTransparentSort=function(T){ge=T},this.getClearColor=function(T){return T.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(T=!0,Y=!0,ae=!0){let ne=0;if(T){let ie=!1;if(H!==null){let Ie=H.texture.format;ie=m.has(Ie)}if(ie){let Ie=H.texture.type,Fe=p.has(Ie),Ce=it.getClearColor(),Ge=it.getClearAlpha(),We=Ce.r,st=Ce.g,ct=Ce.b;Fe?(A[0]=We,A[1]=st,A[2]=ct,A[3]=Ge,E.clearBufferuiv(E.COLOR,0,A)):(D[0]=We,D[1]=st,D[2]=ct,D[3]=Ge,E.clearBufferiv(E.COLOR,0,D))}else ne|=E.COLOR_BUFFER_BIT}Y&&(ne|=E.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ae&&(ne|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&E.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),B=T},this.dispose=function(){t.removeEventListener("webglcontextlost",wt,!1),t.removeEventListener("webglcontextrestored",_t,!1),t.removeEventListener("webglcontextcreationerror",In,!1),it.dispose(),Ee.dispose(),Se.dispose(),K.dispose(),me.dispose(),he.dispose(),Pe.dispose(),fe.dispose(),Me.dispose(),Ve.dispose(),Ve.removeEventListener("sessionstart",lh),Ve.removeEventListener("sessionend",ch),Bi.stop()};function wt(T){T.preventDefault(),Tc("WebGLRenderer: Context Lost."),O=!0}function _t(){Tc("WebGLRenderer: Context Restored."),O=!1;let T=q.autoReset,Y=je.enabled,ae=je.autoUpdate,ne=je.needsUpdate,ie=je.type;qe(),q.autoReset=T,je.enabled=Y,je.autoUpdate=ae,je.needsUpdate=ne,je.type=ie}function In(T){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function kn(T){let Y=T.target;Y.removeEventListener("dispose",kn),Xd(Y)}function Xd(T){qd(T),K.remove(T)}function qd(T){let Y=K.get(T).programs;Y!==void 0&&(Y.forEach(function(ae){Me.releaseProgram(ae)}),T.isShaderMaterial&&Me.releaseShaderCache(T))}this.renderBufferDirect=function(T,Y,ae,ne,ie,Ie){Y===null&&(Y=ut);let Fe=ie.isMesh&&ie.matrixWorld.determinantAffine()<0,Ce=Zd(T,Y,ae,ne,ie);y.setMaterial(ne,Fe);let Ge=ae.index,We=1;if(ne.wireframe===!0){if(Ge=le.getWireframeAttribute(ae),Ge===void 0)return;We=2}let st=ae.drawRange,ct=ae.attributes.position,ze=st.start*We,vt=(st.start+st.count)*We;Ie!==null&&(ze=Math.max(ze,Ie.start*We),vt=Math.min(vt,(Ie.start+Ie.count)*We)),Ge!==null?(ze=Math.max(ze,0),vt=Math.min(vt,Ge.count)):ct!=null&&(ze=Math.max(ze,0),vt=Math.min(vt,ct.count));let Ht=vt-ze;if(Ht<0||Ht===1/0)return;Pe.setup(ie,ne,Ce,ae,Ge);let At,Et=we;if(Ge!==null&&(At=ve.get(Ge),Et=ue,Et.setIndex(At)),ie.isMesh)ne.wireframe===!0?(y.setLineWidth(ne.wireframeLinewidth*j()),Et.setMode(E.LINES)):Et.setMode(E.TRIANGLES);else if(ie.isLine){let Qt=ne.linewidth;Qt===void 0&&(Qt=1),y.setLineWidth(Qt*j()),ie.isLineSegments?Et.setMode(E.LINES):ie.isLineLoop?Et.setMode(E.LINE_LOOP):Et.setMode(E.LINE_STRIP)}else ie.isPoints?Et.setMode(E.POINTS):ie.isSprite&&Et.setMode(E.TRIANGLES);if(ie.isBatchedMesh)if(de.get("WEBGL_multi_draw"))Et.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{let Qt=ie._multiDrawStarts,Ne=ie._multiDrawCounts,rn=ie._multiDrawCount,dt=Ge?ve.get(Ge).bytesPerElement:1,Mn=K.get(ne).currentProgram.getUniforms();for(let Vn=0;Vn<rn;Vn++)Mn.setValue(E,"_gl_DrawID",Vn),Et.render(Qt[Vn]/dt,Ne[Vn])}else if(ie.isInstancedMesh)Et.renderInstances(ze,Ht,ie.count);else if(ae.isInstancedBufferGeometry){let Qt=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,Ne=Math.min(ae.instanceCount,Qt);Et.renderInstances(ze,Ht,Ne)}else Et.render(ze,Ht)};function oh(T,Y,ae,ne){B!==null&&T.isNodeMaterial&&B.setObject(ne,T),Q===!0&&Xe.setState(T,ae,!1),T.transparent===!0&&T.side===Zt&&T.forceSinglePass===!1?(T.side=Bt,T.needsUpdate=!0,Zr(T,Y,ne),T.side=Sn,T.needsUpdate=!0,Zr(T,Y,ne),T.side=Zt):Zr(T,Y,ne)}this.compile=function(T,Y,ae=null){ae===null&&(ae=T),B!==null&&B.renderStart(T,Y,ae),b=Se.get(ae),b.init(Y),_.push(b),ae.traverseVisible(function(ie){ie.isLight&&ie.layers.test(Y.layers)&&(b.pushLight(ie),ie.castShadow&&b.pushShadow(ie))}),T!==ae&&T.traverseVisible(function(ie){ie.isLight&&ie.layers.test(Y.layers)&&(b.pushLight(ie),ie.castShadow&&b.pushShadow(ie))}),b.setupLights(),B!==null&&B.updateLights(b.state.lightsArray),_e=this.localClippingEnabled,Q=Xe.init(this.clippingPlanes,_e),Q===!0&&Xe.setGlobalState(this.clippingPlanes,Y),B!==null&&je.render(b.state.shadowsArray,ae,Y);let ne=new Set;return T.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;let Ie=ie.material;if(Ie)if(Array.isArray(Ie))for(let Fe=0;Fe<Ie.length;Fe++){let Ce=Ie[Fe];oh(Ce,ae,Y,ie),ne.add(Ce)}else oh(Ie,ae,Y,ie),ne.add(Ie)}),b=_.pop(),B!==null&&B.renderEnd(),ne},this.compileAsync=function(T,Y,ae=null){let ne=this.compile(T,Y,ae);return new Promise(ie=>{function Ie(){if(ne.forEach(function(Fe){let Ge=K.get(Fe).currentProgram;(Ge===void 0||Ge.isReady())&&ne.delete(Fe)}),ne.size===0){ie(T);return}setTimeout(Ie,10)}de.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let _l=null;function Yd(T){_l&&_l(T)}function lh(){Bi.stop()}function ch(){Bi.start()}let Bi=new sd;Bi.setAnimationLoop(Yd),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(T){_l=T,Ve.setAnimationLoop(T),T===null?Bi.stop():Bi.start()},Ve.addEventListener("sessionstart",lh),Ve.addEventListener("sessionend",ch),this.render=function(T,Y){if(Y!==void 0&&Y.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;B!==null&&B.renderStart(T,Y);let ae=Ve.enabled===!0&&Ve.isPresenting===!0,ne=w!==null&&(H===null||ae)&&w.begin(N,H);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Ve.enabled===!0&&Ve.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ve.cameraAutoUpdate===!0&&Ve.updateCamera(Y),Y=Ve.getCamera()),T.isScene===!0&&T.onBeforeRender(N,T,Y,H),b=Se.get(T,_.length),b.init(Y),b.state.textureUnits=oe.getTextureUnits(),_.push(b),Ue.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),et.setFromProjectionMatrix(Ue,Nn,Y.reversedDepth),_e=this.localClippingEnabled,Q=Xe.init(this.clippingPlanes,_e),v=Ee.get(T,I.length),v.init(),I.push(v),Ve.enabled===!0&&Ve.isPresenting===!0){let Fe=N.xr.getDepthSensingMesh();Fe!==null&&vl(Fe,Y,-1/0,N.sortObjects)}vl(T,Y,0,N.sortObjects),v.finish(),B!==null&&B.updateLights(b.state.lightsArray),N.sortObjects===!0&&v.sort(pe,ge),yt=Ve.enabled===!1||Ve.isPresenting===!1||Ve.hasDepthSensing()===!1,yt&&it.addToRenderList(v,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Q===!0&&Xe.beginShadows();let ie=b.state.shadowsArray;if(je.render(ie,T,Y),Q===!0&&Xe.endShadows(),(ne&&w.hasRenderPass())===!1){let Fe=v.opaque,Ce=v.transmissive;if(b.setupLights(),Y.isArrayCamera){let Ge=Y.cameras;if(Ce.length>0)for(let We=0,st=Ge.length;We<st;We++){let ct=Ge[We];uh(Fe,Ce,T,ct)}yt&&it.render(T);for(let We=0,st=Ge.length;We<st;We++){let ct=Ge[We];hh(v,T,ct,ct.viewport)}}else Ce.length>0&&uh(Fe,Ce,T,Y),yt&&it.render(T),hh(v,T,Y)}H!==null&&W===0&&(oe.updateMultisampleRenderTarget(H),oe.updateRenderTargetMipmap(H)),ne&&w.end(N),T.isScene===!0&&T.onAfterRender(N,T,Y),Pe.resetDefaultState(),C=-1,G=null,_.pop(),_.length>0?(b=_[_.length-1],oe.setTextureUnits(b.state.textureUnits),Q===!0&&Xe.setGlobalState(N.clippingPlanes,b.state.camera)):b=null,I.pop(),I.length>0?v=I[I.length-1]:v=null,B!==null&&B.renderEnd()};function vl(T,Y,ae,ne){if(T.visible===!1)return;if(T.layers.test(Y.layers)){if(T.isGroup)ae=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(Y);else if(T.isLightProbeGrid)b.pushLightProbeGrid(T);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(et)){ne&&Ke.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ue);let Fe=he.update(T),Ce=T.material;Ce.visible&&v.push(T,Fe,Ce,ae,Ke.z,null,Y)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(et))){let Fe=he.update(T),Ce=T.material;if(ne&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ke.copy(T.boundingSphere.center)):(Fe.boundingSphere===null&&Fe.computeBoundingSphere(),Ke.copy(Fe.boundingSphere.center)),Ke.applyMatrix4(T.matrixWorld).applyMatrix4(Ue)),Array.isArray(Ce)){let Ge=Fe.groups;for(let We=0,st=Ge.length;We<st;We++){let ct=Ge[We],ze=Ce[ct.materialIndex];ze&&ze.visible&&v.push(T,Fe,ze,ae,Ke.z,ct,Y)}}else Ce.visible&&v.push(T,Fe,Ce,ae,Ke.z,null,Y)}}let Ie=T.children;for(let Fe=0,Ce=Ie.length;Fe<Ce;Fe++)vl(Ie[Fe],Y,ae,ne)}function hh(T,Y,ae,ne){let{opaque:ie,transmissive:Ie,transparent:Fe}=T;b.setupLightsView(ae),Q===!0&&Xe.setGlobalState(N.clippingPlanes,ae),ne&&y.viewport(L.copy(ne)),ie.length>0&&$r(ie,Y,ae),Ie.length>0&&$r(Ie,Y,ae),Fe.length>0&&$r(Fe,Y,ae),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function uh(T,Y,ae,ne){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[ne.id]===void 0){let ze=de.has("EXT_color_buffer_half_float")||de.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[ne.id]=new hn(1,1,{generateMipmaps:!0,type:ze?zn:un,minFilter:Di,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ht.workingColorSpace})}let Ie=b.state.transmissionRenderTarget[ne.id],Fe=ne.viewport||L;Ie.setSize(Fe.z*N.transmissionResolutionScale,Fe.w*N.transmissionResolutionScale);let Ce=N.getRenderTarget(),Ge=N.getActiveCubeFace(),We=N.getActiveMipmapLevel();N.setRenderTarget(Ie),N.getClearColor(te),se=N.getClearAlpha(),se<1&&N.setClearColor(16777215,.5),N.clear(),yt&&it.render(ae);let st=N.toneMapping;N.toneMapping=Hn;let ct=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),b.setupLightsView(ne),Q===!0&&Xe.setGlobalState(N.clippingPlanes,ne),$r(T,ae,ne),oe.updateMultisampleRenderTarget(Ie),oe.updateRenderTargetMipmap(Ie),de.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let vt=0,Ht=Y.length;vt<Ht;vt++){let At=Y[vt],{object:Et,geometry:Qt,material:Ne,group:rn}=At;if(Ne.side===Zt&&Et.layers.test(ne.layers)){let dt=Ne.side;Ne.side=Bt,Ne.needsUpdate=!0,dh(Et,ae,ne,Qt,Ne,rn),Ne.side=dt,Ne.needsUpdate=!0,ze=!0}}ze===!0&&(oe.updateMultisampleRenderTarget(Ie),oe.updateRenderTargetMipmap(Ie))}N.setRenderTarget(Ce,Ge,We),N.setClearColor(te,se),ct!==void 0&&(ne.viewport=ct),N.toneMapping=st}function $r(T,Y,ae){let ne=Y.isScene===!0?Y.overrideMaterial:null;for(let ie=0,Ie=T.length;ie<Ie;ie++){let Fe=T[ie],{object:Ce,geometry:Ge,group:We}=Fe,st=Fe.material;st.allowOverride===!0&&ne!==null&&(st=ne),Ce.layers.test(ae.layers)&&dh(Ce,Y,ae,Ge,st,We)}}function dh(T,Y,ae,ne,ie,Ie){B!==null&&ie.isNodeMaterial&&B.setObject(T,ie),T.onBeforeRender(N,Y,ae,ne,ie,Ie),T.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),ie.onBeforeRender(N,Y,ae,ne,T,Ie),ie.transparent===!0&&ie.side===Zt&&ie.forceSinglePass===!1?(ie.side=Bt,ie.needsUpdate=!0,N.renderBufferDirect(ae,Y,ne,ie,T,Ie),ie.side=Sn,ie.needsUpdate=!0,N.renderBufferDirect(ae,Y,ne,ie,T,Ie),ie.side=Zt):N.renderBufferDirect(ae,Y,ne,ie,T,Ie),T.onAfterRender(N,Y,ae,ne,ie,Ie)}function Zr(T,Y,ae){Y.isScene!==!0&&(Y=ut);let ne=K.get(T),ie=b.state.lights,Ie=b.state.shadowsArray,Fe=ie.state.version,Ce=Me.getParameters(T,ie.state,Ie,Y,ae,b.state.lightProbeGridArray),Ge=Me.getProgramCacheKey(Ce),We=ne.programs;ne.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?Y.environment:null,ne.fog=Y.fog;let st=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;ne.envMap=me.get(T.envMap||ne.environment,st),ne.envMapRotation=ne.environment!==null&&T.envMap===null?Y.environmentRotation:T.envMapRotation,We===void 0&&(T.addEventListener("dispose",kn),We=new Map,ne.programs=We);let ct=We.get(Ge);if(ct!==void 0){if(ne.currentProgram===ct&&ne.lightsStateVersion===Fe)return ph(T,Ce),ct}else Ce.uniforms=Me.getUniforms(T),B!==null&&T.isNodeMaterial&&B.build(T,ae,Ce),T.onBeforeCompile(Ce,N),ct=Me.acquireProgram(Ce,Ge),We.set(Ge,ct),ne.uniforms=Ce.uniforms;let ze=ne.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(ze.clippingPlanes=Xe.uniform),ph(T,Ce),ne.needsLights=Kd(T),ne.lightsStateVersion=Fe,ne.needsLights&&(ze.ambientLightColor.value=ie.state.ambient,ze.lightProbe.value=ie.state.probe,ze.sunLights.value=ie.state.sun,ze.sunLightShadows.value=ie.state.sunShadow,ze.directionalLights.value=ie.state.directional,ze.directionalLightShadows.value=ie.state.directionalShadow,ze.spotLights.value=ie.state.spot,ze.spotLightShadows.value=ie.state.spotShadow,ze.rectAreaLights.value=ie.state.rectArea,ze.ltc_1.value=ie.state.rectAreaLTC1,ze.ltc_2.value=ie.state.rectAreaLTC2,ze.pointLights.value=ie.state.point,ze.pointLightShadows.value=ie.state.pointShadow,ze.hemisphereLights.value=ie.state.hemi,ze.sunShadowMatrix.value=ie.state.sunShadowMatrix,ze.sunShadowCascade.value=ie.state.sunShadowCascade,ze.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,ze.spotLightMatrix.value=ie.state.spotLightMatrix,ze.spotLightMap.value=ie.state.spotLightMap,ze.pointShadowMatrix.value=ie.state.pointShadowMatrix),ne.lightProbeGrid=b.state.lightProbeGridArray.length>0,ne.currentProgram=ct,ne.uniformsList=null,ct}function fh(T){if(T.uniformsList===null){let Y=T.currentProgram.getUniforms();T.uniformsList=Hs.seqWithValue(Y.seq,T.uniforms)}return T.uniformsList}function ph(T,Y){let ae=K.get(T);ae.outputColorSpace=Y.outputColorSpace,ae.batching=Y.batching,ae.batchingColor=Y.batchingColor,ae.instancing=Y.instancing,ae.instancingColor=Y.instancingColor,ae.instancingMorph=Y.instancingMorph,ae.skinning=Y.skinning,ae.morphTargets=Y.morphTargets,ae.morphNormals=Y.morphNormals,ae.morphColors=Y.morphColors,ae.morphTargetsCount=Y.morphTargetsCount,ae.numClippingPlanes=Y.numClippingPlanes,ae.numIntersection=Y.numClipIntersection,ae.vertexAlphas=Y.vertexAlphas,ae.vertexTangents=Y.vertexTangents,ae.toneMapping=Y.toneMapping}function $d(T,Y){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;M.setFromMatrixPosition(Y.matrixWorld);for(let ae=0,ne=T.length;ae<ne;ae++){let ie=T[ae];if(ie.texture!==null&&ie.boundingBox.containsPoint(M))return ie}return null}function Zd(T,Y,ae,ne,ie){Y.isScene!==!0&&(Y=ut),oe.resetTextureUnits();let Ie=Y.fog,Fe=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?Y.environment:null,Ce=H===null?N.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:ht.workingColorSpace,Ge=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,We=me.get(ne.envMap||Fe,Ge),st=ne.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,ct=!!ae.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),ze=!!ae.morphAttributes.position,vt=!!ae.morphAttributes.normal,Ht=!!ae.morphAttributes.color,At=Hn;ne.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(At=N.toneMapping);let Et=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Qt=Et!==void 0?Et.length:0,Ne=K.get(ne),rn=b.state.lights;if(Q===!0&&(_e===!0||T!==G)){let Tt=T===G&&ne.id===C;Xe.setState(ne,T,Tt)}let dt=!1;ne.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==rn.state.version||Ne.outputColorSpace!==Ce||ie.isBatchedMesh&&Ne.batching===!1||!ie.isBatchedMesh&&Ne.batching===!0||ie.isBatchedMesh&&Ne.batchingColor===!0&&ie._colorsTexture===null||ie.isBatchedMesh&&Ne.batchingColor===!1&&ie._colorsTexture!==null||ie.isInstancedMesh&&Ne.instancing===!1||!ie.isInstancedMesh&&Ne.instancing===!0||ie.isSkinnedMesh&&Ne.skinning===!1||!ie.isSkinnedMesh&&Ne.skinning===!0||ie.isInstancedMesh&&Ne.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&Ne.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&Ne.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&Ne.instancingMorph===!1&&ie.morphTexture!==null||Ne.envMap!==We||ne.fog===!0&&Ne.fog!==Ie||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==Xe.numPlanes||Ne.numIntersection!==Xe.numIntersection)||Ne.vertexAlphas!==st||Ne.vertexTangents!==ct||Ne.morphTargets!==ze||Ne.morphNormals!==vt||Ne.morphColors!==Ht||Ne.toneMapping!==At||Ne.morphTargetsCount!==Qt||!!Ne.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(dt=!0):(dt=!0,Ne.__version=ne.version);let Mn=Ne.currentProgram;dt===!0&&(Mn=Zr(ne,Y,ie),B&&ne.isNodeMaterial&&B.onUpdateProgram(ne,Mn,Ne));let Vn=!1,yi=!1,is=!1,bt=Mn.getUniforms(),Ut=Ne.uniforms;if(y.useProgram(Mn.program)&&(Vn=!0,yi=!0,is=!0),ne.id!==C&&(C=ne.id,yi=!0),Ne.needsLights){let Tt=$d(b.state.lightProbeGridArray,ie);Ne.lightProbeGrid!==Tt&&(Ne.lightProbeGrid=Tt,yi=!0)}if(Vn||G!==T){y.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),bt.setValue(E,"projectionMatrix",T.projectionMatrix),bt.setValue(E,"viewMatrix",T.matrixWorldInverse);let vi=bt.map.cameraPosition;vi!==void 0&&vi.setValue(E,Ye.setFromMatrixPosition(T.matrixWorld)),R.logarithmicDepthBuffer&&bt.setValue(E,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&bt.setValue(E,"isOrthographic",T.isOrthographicCamera===!0),G!==T&&(G=T,yi=!0,is=!0)}if(Ne.needsLights&&(rn.state.sunShadowMap.length>0&&bt.setValue(E,"sunShadowMap",rn.state.sunShadowMap,oe),rn.state.directionalShadowMap.length>0&&bt.setValue(E,"directionalShadowMap",rn.state.directionalShadowMap,oe),rn.state.spotShadowMap.length>0&&bt.setValue(E,"spotShadowMap",rn.state.spotShadowMap,oe),rn.state.pointShadowMap.length>0&&bt.setValue(E,"pointShadowMap",rn.state.pointShadowMap,oe)),ie.isSkinnedMesh){bt.setOptional(E,ie,"bindMatrix"),bt.setOptional(E,ie,"bindMatrixInverse");let Tt=ie.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),bt.setValue(E,"boneTexture",Tt.boneTexture,oe))}ie.isBatchedMesh&&(bt.setOptional(E,ie,"batchingTexture"),bt.setValue(E,"batchingTexture",ie._matricesTexture,oe),bt.setOptional(E,ie,"batchingIdTexture"),bt.setValue(E,"batchingIdTexture",ie._indirectTexture,oe),bt.setOptional(E,ie,"batchingColorTexture"),ie._colorsTexture!==null&&bt.setValue(E,"batchingColorTexture",ie._colorsTexture,oe));let _i=ae.morphAttributes;if((_i.position!==void 0||_i.normal!==void 0||_i.color!==void 0)&&$.update(ie,ae,Mn),(yi||Ne.receiveShadow!==ie.receiveShadow)&&(Ne.receiveShadow=ie.receiveShadow,bt.setValue(E,"receiveShadow",ie.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&Y.environment!==null&&(Ut.envMapIntensity.value=Y.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=Fx()),yi){if(bt.setValue(E,"toneMappingExposure",N.toneMappingExposure),Ne.needsLights&&Jd(Ut,is),Ie&&ne.fog===!0&&Oe.refreshFogUniforms(Ut,Ie),Oe.refreshMaterialUniforms(Ut,ne,J,Z,b.state.transmissionRenderTarget[T.id]),Ne.needsLights&&Ne.lightProbeGrid){let Tt=Ne.lightProbeGrid;Ut.probesSH.value=Tt.texture,Ut.probesMin.value.copy(Tt.boundingBox.min),Ut.probesMax.value.copy(Tt.boundingBox.max),Ut.probesResolution.value.copy(Tt.resolution)}Hs.upload(E,fh(Ne),Ut,oe)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Hs.upload(E,fh(Ne),Ut,oe),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&bt.setValue(E,"center",ie.center),bt.setValue(E,"modelViewMatrix",ie.modelViewMatrix),bt.setValue(E,"normalMatrix",ie.normalMatrix),bt.setValue(E,"modelMatrix",ie.matrixWorld),ne.uniformsGroups!==void 0){let Tt=ne.uniformsGroups;for(let vi=0,ss=Tt.length;vi<ss;vi++){let gh=Tt[vi];fe.update(gh,Mn),fe.bind(gh,Mn)}}return Mn}function Jd(T,Y){T.ambientLightColor.needsUpdate=Y,T.lightProbe.needsUpdate=Y,T.sunLights.needsUpdate=Y,T.sunLightShadows.needsUpdate=Y,T.directionalLights.needsUpdate=Y,T.directionalLightShadows.needsUpdate=Y,T.pointLights.needsUpdate=Y,T.pointLightShadows.needsUpdate=Y,T.spotLights.needsUpdate=Y,T.spotLightShadows.needsUpdate=Y,T.rectAreaLights.needsUpdate=Y,T.hemisphereLights.needsUpdate=Y}function Kd(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(T,Y,ae){let ne=K.get(T);ne.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),K.get(T.texture).__webglTexture=Y,K.get(T.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:ae,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,Y){let ae=K.get(T);ae.__webglFramebuffer=Y,ae.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(T,Y=0,ae=0){H=T,z=Y,W=ae;let ne=null,ie=!1,Ie=!1;if(T){let Ce=K.get(T);if(Ce.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(E.FRAMEBUFFER,Ce.__webglFramebuffer),L.copy(T.viewport),X.copy(T.scissor),ee=T.scissorTest,y.viewport(L),y.scissor(X),y.setScissorTest(ee),C=-1;return}else if(Ce.__webglFramebuffer===void 0)oe.setupRenderTarget(T);else if(Ce.__hasExternalTextures)oe.rebindTextures(T,K.get(T.texture).__webglTexture,K.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let st=T.depthTexture;if(Ce.__boundDepthTexture!==st){if(st!==null&&K.has(st)&&(T.width!==st.image.width||T.height!==st.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");oe.setupDepthRenderbuffer(T)}}let Ge=T.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Ie=!0);let We=K.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(We[Y])?ne=We[Y][ae]:ne=We[Y],ie=!0):T.samples>0&&oe.useMultisampledRTT(T)===!1?ne=K.get(T).__webglMultisampledFramebuffer:Array.isArray(We)?ne=We[ae]:ne=We,L.copy(T.viewport),X.copy(T.scissor),ee=T.scissorTest}else L.copy(xe).multiplyScalar(J).floor(),X.copy($e).multiplyScalar(J).floor(),ee=ot;if(ae!==0&&(ne=U),y.bindFramebuffer(E.FRAMEBUFFER,ne)&&y.drawBuffers(T,ne),y.viewport(L),y.scissor(X),y.setScissorTest(ee),ie){let Ce=K.get(T.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ce.__webglTexture,ae)}else if(Ie){let Ce=Y;for(let Ge=0;Ge<T.textures.length;Ge++){let We=K.get(T.textures[Ge]);E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0+Ge,We.__webglTexture,ae,Ce)}}else if(T!==null&&ae!==0){let Ce=K.get(T.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Ce.__webglTexture,ae)}C=-1};function mh(T){let Y=K.get(T);return(Y.__readFormat!==T.format||Y.__readType!==T.type)&&(Y.__readFormat=T.format,Y.__readType=T.type,Y.__formatReadable=R.textureFormatReadable(T.format),Y.__typeReadable=R.textureTypeReadable(T.type)),Y}this.readRenderTargetPixels=function(T,Y,ae,ne,ie,Ie,Fe,Ce=0){if(!(T&&T.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=K.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Fe!==void 0&&(Ge=Ge[Fe]),Ge){y.bindFramebuffer(E.FRAMEBUFFER,Ge);try{let We=T.textures[Ce],st=We.format,ct=We.type;T.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+Ce);let ze=mh(We);if(ze.__formatReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ze.__typeReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=T.width-ne&&ae>=0&&ae<=T.height-ie&&E.readPixels(Y,ae,ne,ie,Te.convert(st),Te.convert(ct),Ie)}finally{let We=H!==null?K.get(H).__webglFramebuffer:null;y.bindFramebuffer(E.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(T,Y,ae,ne,ie,Ie,Fe,Ce=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=K.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Fe!==void 0&&(Ge=Ge[Fe]),Ge)if(Y>=0&&Y<=T.width-ne&&ae>=0&&ae<=T.height-ie){y.bindFramebuffer(E.FRAMEBUFFER,Ge);let We=T.textures[Ce],st=We.format,ct=We.type;T.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+Ce);let ze=mh(We);if(ze.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ze.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let vt=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,vt),E.bufferData(E.PIXEL_PACK_BUFFER,Ie.byteLength,E.STREAM_READ),E.readPixels(Y,ae,ne,ie,Te.convert(st),Te.convert(ct),0),E.bindBuffer(E.PIXEL_PACK_BUFFER,null);let Ht=H!==null?K.get(H).__webglFramebuffer:null;y.bindFramebuffer(E.FRAMEBUFFER,Ht);let At=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await Pu(E,At,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,vt),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,Ie),E.bindBuffer(E.PIXEL_PACK_BUFFER,null),E.deleteBuffer(vt),E.deleteSync(At),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,Y=null,ae=0){let ne=Math.pow(2,-ae),ie=Math.floor(T.image.width*ne),Ie=Math.floor(T.image.height*ne),Fe=Y!==null?Y.x:0,Ce=Y!==null?Y.y:0;oe.setTexture2D(T,0),E.copyTexSubImage2D(E.TEXTURE_2D,ae,0,0,Fe,Ce,ie,Ie),y.unbindTexture()},this.copyTextureToTexture=function(T,Y,ae=null,ne=null,ie=0,Ie=0){let Fe,Ce,Ge,We,st,ct,ze,vt,Ht,At=T.isCompressedTexture?T.mipmaps[Ie]:T.image;if(ae!==null)Fe=ae.max.x-ae.min.x,Ce=ae.max.y-ae.min.y,Ge=ae.isBox3?ae.max.z-ae.min.z:1,We=ae.min.x,st=ae.min.y,ct=ae.isBox3?ae.min.z:0;else{let Ut=Math.pow(2,-ie);Fe=Math.floor(At.width*Ut),Ce=Math.floor(At.height*Ut),T.isDataArrayTexture?Ge=At.depth:T.isData3DTexture?Ge=Math.floor(At.depth*Ut):Ge=1,We=0,st=0,ct=0}ne!==null?(ze=ne.x,vt=ne.y,Ht=ne.z):(ze=0,vt=0,Ht=0);let Et=Te.convert(Y.format),Qt=Te.convert(Y.type),Ne;Y.isData3DTexture?(oe.setTexture3D(Y,0),Ne=E.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(oe.setTexture2DArray(Y,0),Ne=E.TEXTURE_2D_ARRAY):(oe.setTexture2D(Y,0),Ne=E.TEXTURE_2D),y.activeTexture(E.TEXTURE0),y.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,Y.flipY),y.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),y.pixelStorei(E.UNPACK_ALIGNMENT,Y.unpackAlignment);let rn=y.getParameter(E.UNPACK_ROW_LENGTH),dt=y.getParameter(E.UNPACK_IMAGE_HEIGHT),Mn=y.getParameter(E.UNPACK_SKIP_PIXELS),Vn=y.getParameter(E.UNPACK_SKIP_ROWS),yi=y.getParameter(E.UNPACK_SKIP_IMAGES);y.pixelStorei(E.UNPACK_ROW_LENGTH,At.width),y.pixelStorei(E.UNPACK_IMAGE_HEIGHT,At.height),y.pixelStorei(E.UNPACK_SKIP_PIXELS,We),y.pixelStorei(E.UNPACK_SKIP_ROWS,st),y.pixelStorei(E.UNPACK_SKIP_IMAGES,ct);let is=T.isDataArrayTexture||T.isData3DTexture,bt=Y.isDataArrayTexture||Y.isData3DTexture;if(T.isDepthTexture){let Ut=K.get(T),_i=K.get(Y),Tt=K.get(Ut.__renderTarget),vi=K.get(_i.__renderTarget);y.bindFramebuffer(E.READ_FRAMEBUFFER,Tt.__webglFramebuffer),y.bindFramebuffer(E.DRAW_FRAMEBUFFER,vi.__webglFramebuffer);for(let ss=0;ss<Ge;ss++)is&&(E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,K.get(T).__webglTexture,ie,ct+ss),E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,K.get(Y).__webglTexture,Ie,Ht+ss)),E.blitFramebuffer(We,st,Fe,Ce,ze,vt,Fe,Ce,E.DEPTH_BUFFER_BIT,E.NEAREST);y.bindFramebuffer(E.READ_FRAMEBUFFER,null),y.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else if(ie!==0||T.isRenderTargetTexture||K.has(T)){let Ut=K.get(T),_i=K.get(Y);y.bindFramebuffer(E.READ_FRAMEBUFFER,S),y.bindFramebuffer(E.DRAW_FRAMEBUFFER,F);for(let Tt=0;Tt<Ge;Tt++)is?E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,Ut.__webglTexture,ie,ct+Tt):E.framebufferTexture2D(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Ut.__webglTexture,ie),bt?E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,_i.__webglTexture,Ie,Ht+Tt):E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,_i.__webglTexture,Ie),ie!==0?E.blitFramebuffer(We,st,Fe,Ce,ze,vt,Fe,Ce,E.COLOR_BUFFER_BIT,E.NEAREST):bt?E.copyTexSubImage3D(Ne,Ie,ze,vt,Ht+Tt,We,st,Fe,Ce):E.copyTexSubImage2D(Ne,Ie,ze,vt,We,st,Fe,Ce);y.bindFramebuffer(E.READ_FRAMEBUFFER,null),y.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else bt?T.isDataTexture||T.isData3DTexture?E.texSubImage3D(Ne,Ie,ze,vt,Ht,Fe,Ce,Ge,Et,Qt,At.data):Y.isCompressedArrayTexture?E.compressedTexSubImage3D(Ne,Ie,ze,vt,Ht,Fe,Ce,Ge,Et,At.data):E.texSubImage3D(Ne,Ie,ze,vt,Ht,Fe,Ce,Ge,Et,Qt,At):T.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,Ie,ze,vt,Fe,Ce,Et,Qt,At.data):T.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,Ie,ze,vt,At.width,At.height,Et,At.data):E.texSubImage2D(E.TEXTURE_2D,Ie,ze,vt,Fe,Ce,Et,Qt,At);y.pixelStorei(E.UNPACK_ROW_LENGTH,rn),y.pixelStorei(E.UNPACK_IMAGE_HEIGHT,dt),y.pixelStorei(E.UNPACK_SKIP_PIXELS,Mn),y.pixelStorei(E.UNPACK_SKIP_ROWS,Vn),y.pixelStorei(E.UNPACK_SKIP_IMAGES,yi),Ie===0&&Y.generateMipmaps&&E.generateMipmap(Ne),y.unbindTexture()},this.initRenderTarget=function(T){K.get(T).__webglFramebuffer===void 0&&oe.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?oe.setTextureCube(T,0):T.isData3DTexture?oe.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?oe.setTexture2DArray(T,0):oe.setTexture2D(T,0),y.unbindTexture()},this.resetState=function(){z=0,W=0,H=null,y.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}};var al=class extends Wi{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new ye;e.deleteAttribute("uv");let t=new On({side:Bt}),n=new On,s=new Sr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new k(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new hi(e,n,6),o=new zt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new k(e,ks(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new k(e,ks(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new k(e,ks(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new k(e,ks(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new k(e,ks(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new k(e,ks(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function ks(i){return new _r({color:0,emissive:16777215,emissiveIntensity:i})}var Bx=new Set(["BoxGeometry","RoundedBoxGeometry","CylinderGeometry","ConeGeometry","SphereGeometry","IcosahedronGeometry","OctahedronGeometry","DodecahedronGeometry","CapsuleGeometry"]),ud=new Set(["PlaneGeometry","CircleGeometry","RingGeometry","ShapeGeometry"]),Ox=`
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
}`,Hx=`
uniform vec3 uCol; uniform float uOp;
#include <clipping_planes_pars_fragment>
void main() {
  #include <clipping_planes_fragment>
  gl_FragColor = vec4(uCol, uOp);
}`;function dd(){return{uRes:{value:new De(1e3,600)},uPx:{value:1.25}}}function Gx(i,e,t,n,s,r){return new ln({uniforms:{uRes:i.uRes,uPx:i.uPx,uUsePos:{value:e?1:0},uR:{value:r},uCol:{value:new Be(t)},uOp:{value:n}},vertexShader:Ox,fragmentShader:Hx,side:Bt,transparent:n<1,depthWrite:!0,clipping:!!(s&&s.length),clippingPlanes:s&&s.length?s:null})}function jc(i,e,t={}){let n=t.color??2762274,s=t.minR??0,r=[];i.traverse(o=>{if(!o.isMesh||o.userData.isInk||o.userData.noInk||o.userData._inked)return;let l=o.geometry,c=o.material;if(!l||!l.attributes||!l.attributes.position||!l.attributes.normal||ud.has(l.type)||!c||Array.isArray(c)||c.isShaderMaterial||c.isPointsMaterial)return;let h=o.userData._revOp!=null?o.userData._revOp:c.opacity??1,d=!!(c.userData&&c.userData.isGlass)||o.userData.inkGlass===!0;h<(d?.02:.97)||(d&&(o.userData._inkGlass=!0),c.blending!==Ar&&(!d&&c.clippingPlanes&&c.clippingPlanes.length||s&&(l.boundingSphere||l.computeBoundingSphere(),l.boundingSphere.radius*o.scale.x<s)||r.push(o)))});let a=0;for(let o of r){let l=!!o.userData._inkGlass,c=Bx.has(o.geometry.type)||o.userData.inkPosDir===!0;o.geometry.boundingSphere||o.geometry.computeBoundingSphere();let h=Gx(e,c,n,1,o.material.clippingPlanes,o.geometry.boundingSphere.radius),d=o.isInstancedMesh?new hi(o.geometry,h,o.count):new k(o.geometry,h);o.isInstancedMesh&&(d.instanceMatrix=o.instanceMatrix,d.count=o.count),d.userData.isInk=!0,o.userData._inked=!0,d.raycast=()=>{},d.renderOrder=o.renderOrder,d.frustumCulled=o.frustumCulled;let u=t.opacity??.92;if(l){let f=o.material;f.stencilWrite||(a=1,f.stencilWrite=!0,f.stencilRef=a,f.stencilFunc=Ko,f.stencilZPass=Ec,f.needsUpdate=!0),h.stencilWrite=!0,h.stencilRef=f.stencilRef,h.stencilFunc=Sc,h.stencilZPass=Ti,h.stencilFail=Ti,h.stencilZFail=Ti,h.transparent=!0,h.depthWrite=!1,d.renderOrder=o.renderOrder+1;let g=o.userData._revOp!=null?o.userData._revOp:f.opacity||1;d.onBeforeRender=()=>{let x=o.material&&o.material.opacity!=null?o.material.opacity:g;h.uniforms.uOp.value=.8*Math.min(1,x/Math.max(g,.001)),d.visible=o.material?o.material.visible!==!1:!0},o.add(d);continue}d.onBeforeRender=()=>{let f=o.material,g=f&&f.opacity!=null?f.opacity:1;h.uniforms.uOp.value=u*g;let x=g<.999||u<1;h.transparent!==x&&(h.transparent=x,h.needsUpdate=!0),d.visible=f?f.visible!==!1:!0},o.add(d)}return r.length}var ol=null;function zx(){if(ol)return ol;let i=document.createElement("canvas");i.width=i.height=128;let e=i.getContext("2d"),t=e.createRadialGradient(64,64,4,64,64,63);return t.addColorStop(0,"rgba(0,0,0,1)"),t.addColorStop(.45,"rgba(0,0,0,0.55)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),ol=new En(i),ol}function Qc(i,e={}){let t=new mn,n=new mn,s=!1;if(i.traverse(l=>{l.userData._revPending&&(s=!0)}),s||(i.traverse(l=>{if(!l.isMesh||l.userData.isInk||l.userData.isShadow||l.userData.noShadowBox||l.geometry&&ud.has(l.geometry.type))return;let c=!0;for(let h=l;h;h=h.parent)if(h.visible===!1){c=!1;break}c&&(n.setFromObject(l),n.isEmpty()||t.union(n))}),t.isEmpty()))return null;let r=t.getSize(new P),a=t.getCenter(new P),o=i.userData._contactShadow;return o||(o=new k(new Bn(1,1),new nn({color:1709072,alphaMap:zx(),transparent:!0,opacity:e.opacity??.2,depthWrite:!1})),o.rotation.x=-Math.PI/2,o.userData.isShadow=!0,o.renderOrder=-1,o.raycast=()=>{},i.add(o),i.userData._contactShadow=o),o.position.set(a.x,t.min.y-.004*Math.max(r.x,r.z),a.z),o.scale.set(r.x*1.35,r.z*1.45,1),o}function mt(i,e){let t=e.ui,n;try{let L=document.createElement("canvas");if(!(L.getContext("webgl2")||L.getContext("webgl")))return null;n=new il({antialias:!0,alpha:!0,stencil:!0,powerPreference:"low-power",preserveDrawingBuffer:!0})}catch{return null}let s=document.createElement("div");s.className="canvas-wrap three-wrap",i.appendChild(s);let r=n.domElement;r.setAttribute("role","img"),r.setAttribute("aria-label",e.label),r.tabIndex=0,s.appendChild(r),n.outputColorSpace=kt,n.toneMapping=Cr,n.toneMappingExposure=e.exposure??1.05,n.setClearColor(16053490,0),e.localClipping&&(n.localClippingEnabled=!0);let a=new Wi;a.userData.renderer=n;let o=new Jt(e.fov||34,1.6,.05,500),l=e.target&&e.target.clone?e.target.clone():new P(0,0,0),c={yaw:e.yaw??0,pitch:e.pitch??.6,dist:8},h=[],d=!0,u=0,f=0,g=!0,x=0,m=0,p=e.radius||3,A=e.radiusY||p*.6,D=e.autoFit!==!1,M=dd(),v=!1,b=e.contactShadow===!1?2:0,I=0;function _(){e.ink!==!1&&(jc(a,M,{color:e.inkColor,opacity:e.inkOpacity,minR:e.inkMinR}),v=!0)}function w(){if(e.place){e.place(o,l,c);return}let L=Math.cos(c.pitch);o.position.set(l.x+c.dist*Math.sin(c.yaw)*L,l.y+c.dist*Math.sin(c.pitch),l.z+c.dist*Math.cos(c.yaw)*L),o.lookAt(l)}function N(){if(!D)return;let L=o.fov*Math.PI/360,X=Math.atan(Math.tan(L)*o.aspect),ee=e.fitPadX??e.fitPad??1.08,te=e.fitPadY??e.fitPad??1.08;c.dist=Math.max(p/Math.tan(X)*ee,A/Math.tan(L)*te)}function O(){x=s.clientWidth||600,m=e.height(x),n.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),n.setSize(x,m,!0);{let L=n.getPixelRatio();M.uRes.value.set(x*L,m*L),M.uPx.value=(e.inkPx??.85)*L}o.aspect=x/m,o.updateProjectionMatrix(),N(),e.onResize&&e.onResize(x,m),F()}function B(){w(),n.render(a,o);let L=new P;for(let X of h){let ee=X.pos();if(!ee){X.el.style.display="none";continue}L.copy(ee).project(o);let te=(L.x+1)/2*x,se=(1-L.y)/2*m,ce=L.z<1&&te>4&&te<x-4&&se>4&&se<m-4;X.el.style.display=ce?"":"none",X.el.style.transform=`translate(${Math.round(te)}px, ${Math.round(se)}px) translate(-50%, ${X.below?"8px":"calc(-100% - 8px)"})`}g=!1}function U(L){u=0;let X=Math.min(.05,(L-f)/1e3||.016);f=L;let ee=!1;if(e.step&&(t.isPlaying()||e.busy&&e.busy()))try{ee=!!e.step(X)}catch{ee=!1,g=!0}b===1&&(I+=X,I>.25&&Qc(a,{opacity:e.shadowOpacity})&&(b=2,g=!0)),(g||ee)&&B(),!u&&d&&(ee||g)&&(u=requestAnimationFrame(U))}function S(){!u&&d&&(g||t.isPlaying()&&e.busy&&e.busy()||e.busy&&e.busy())&&(f=performance.now(),u=requestAnimationFrame(U))}function F(){g=!0,S()}new IntersectionObserver(L=>{let X=d;d=L[0].isIntersecting,d&&!X&&e.onShow&&e.onShow(),S()},{threshold:.15}).observe(r),t.onPlayChange(()=>S()),new ResizeObserver(O).observe(s);let z=new ui,W=new De,H=null;r.style.touchAction="pan-y",r.style.cursor="grab",r.addEventListener("pointerdown",L=>{H={x:L.clientX,y:L.clientY,yaw:c.yaw,pitch:c.pitch,moved:!1,mouse:L.pointerType==="mouse"};try{r.setPointerCapture(L.pointerId)}catch{}}),r.addEventListener("pointermove",L=>{if(!H)return;let X=L.clientX-H.x,ee=L.clientY-H.y;!H.moved&&Math.hypot(X,ee)<6||(H.moved=!0,r.style.cursor="grabbing",c.yaw=H.yaw-X*.008,H.mouse&&(c.pitch=Math.max(.15,Math.min(1.45,H.pitch+ee*.006))),e.onTurn&&e.onTurn(),F())}),r.addEventListener("pointerup",L=>{if(H&&!H.moved&&e.onTap&&e.pickable){let X=r.getBoundingClientRect();W.set((L.clientX-X.left)/X.width*2-1,-((L.clientY-X.top)/X.height)*2+1),w(),z.setFromCamera(W,o);let ee=z.intersectObject(e.pickable(),!0)[0];ee&&e.onTap(ee.point,ee)}H=null,r.style.cursor="grab"}),r.addEventListener("pointercancel",()=>{H=null,r.style.cursor="grab"}),r.addEventListener("keydown",L=>{let X={ArrowLeft:[-.12,0],ArrowRight:[.12,0],ArrowUp:[0,.08],ArrowDown:[0,-.08]}[L.key];X?(c.yaw+=X[0],c.pitch=Math.max(.15,Math.min(1.45,c.pitch+X[1])),F(),L.preventDefault()):(L.key==="Enter"||L.key===" ")&&e.onKey&&(e.onKey(),L.preventDefault())});function C(L,X,ee="",te=!1){let se=document.createElement("div");se.className="l3d "+ee,se.innerHTML=L,se.setAttribute("aria-hidden","true"),s.appendChild(se);let ce={el:se,pos:X,below:te};return h.push(ce),ce}function G(L={}){L.target&&l.copy(L.target),L.radius!=null&&(p=L.radius),L.radiusY!=null&&(A=L.radiusY),L.dist!=null?c.dist=L.dist:N(),L.yaw!=null&&(c.yaw=L.yaw),L.pitch!=null&&(c.pitch=L.pitch),F()}return O(),{scene:a,camera:o,renderer:n,wrap:s,canvas:r,view:c,target:l,invalidate:F,kick:S,label:C,setFocus:G,ready(){v||_(),b===0&&(b=1),g=!0,d?S():(d=!0,B())},inkNew(L){e.ink!==!1&&jc(L||a,M,{color:e.inkColor,opacity:e.inkOpacity,minR:e.inkMinR})},reshadow(){b===2&&e.contactShadow!==!1&&(Qc(a,{opacity:e.shadowOpacity}),F())},get visible(){return d},get radius(){return p}}}var ll=null;function kx(i){if(ll)return ll;let e=new Gs(i);return ll=e.fromScene(new al,.04),e.dispose(),ll}function gt(i,e={}){let t=new Mr(e.sky??16774890,e.ground??9083048,e.hemi??.95);i.add(t);let n=new Pi(e.key??16773856,e.keyI??1.25);n.position.set(e.keyPos?.[0]??3.5,e.keyPos?.[1]??6.5,e.keyPos?.[2]??4),i.add(n);let s=new Pi(e.fill??14543103,e.fillI??.38);s.position.set(e.fillPos?.[0]??-4,e.fillPos?.[1]??2.5,e.fillPos?.[2]??-2.5),i.add(s);let r=new Pi(e.rim??15266047,e.rimI??.45);r.position.set(e.rimPos?.[0]??-2.5,e.rimPos?.[1]??3.5,e.rimPos?.[2]??-5),i.add(r);let a=null;e.glint!==!1&&(a=new Pi(e.glintCol??16773336,e.glintI??.55),a.position.set(e.glintPos?.[0]??6.5,e.glintPos?.[1]??8.5,e.glintPos?.[2]??1.2),i.add(a));let o=e.renderer||i.userData.renderer;if(o&&e.envI!==0)try{if(!i.environment){let l=kx(o);i.environment=l.texture}i.environmentIntensity=e.envI??.75}catch{}return{hemi:t,key:n,fill:s,rim:r,glint:a}}var kr=new P;function Rn(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;kr.copy(e),kr[n]=0,kr.normalize();let c=.5*a/(a+o),h=1-kr.angleTo(i)/l;return Math.sign(kr[t])===1?h*c:o/(a+o)+c+c*(1-h)}var cl=class i extends ye{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new P,c=new P,h=new P(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,g=d.length/6,x=new P,m=.5/a;for(let p=0,A=0;p<d.length;p+=3,A+=2)switch(l.fromArray(d,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),d[p+0]=h.x*Math.sign(l.x)+c.x*r,d[p+1]=h.y*Math.sign(l.y)+c.y*r,d[p+2]=h.z*Math.sign(l.z)+c.z*r,u[p+0]=c.x,u[p+1]=c.y,u[p+2]=c.z,Math.floor(p/g)){case 0:x.set(1,0,0),f[A+0]=Rn(x,c,"z","y",r,n),f[A+1]=1-Rn(x,c,"y","z",r,t);break;case 1:x.set(-1,0,0),f[A+0]=1-Rn(x,c,"z","y",r,n),f[A+1]=1-Rn(x,c,"y","z",r,t);break;case 2:x.set(0,1,0),f[A+0]=1-Rn(x,c,"x","z",r,e),f[A+1]=Rn(x,c,"z","x",r,n);break;case 3:x.set(0,-1,0),f[A+0]=1-Rn(x,c,"x","z",r,e),f[A+1]=1-Rn(x,c,"z","x",r,n);break;case 4:x.set(0,0,1),f[A+0]=1-Rn(x,c,"x","y",r,e),f[A+1]=1-Rn(x,c,"y","x",r,t);break;case 5:x.set(0,0,-1),f[A+0]=Rn(x,c,"x","y",r,e),f[A+1]=1-Rn(x,c,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};var Vx=typeof window<"u"&&window.AIX_STYLE||"clean",fd=Vx==="clean";function Wx(i){let e=new Be(i),t={};e.getHSL(t);let n=.105+(t.h-.105)*.75,s=Math.min(.92,Math.max(.74,.8+.45*(t.s-.4))),r=Math.min(.52,Math.max(.28,.1+.68*t.l));return e.setHSL(n,s,r).getHex()}function pd(i,e){let t=new Be(e),n={};t.getHSL(n),t.setHSL(n.h,Math.min(1,n.s*.9),Math.min(.82,n.l*1.12+.06)),i.side=Zt;let s=i.onBeforeCompile;i.onBeforeCompile=(o,l)=>{s&&s(o,l),o.uniforms.uSec={value:new P(t.r,t.g,t.b)},o.fragmentShader=o.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 uSec;`).replace("#include <dithering_fragment>",`#include <dithering_fragment>
  if (!gl_FrontFacing) gl_FragColor.rgb = uSec;`)};let r=i.customProgramCacheKey?.bind(i);i.customProgramCacheKey=()=>(r?r():"")+"sectionCap";let a=i.clone.bind(i);return i.clone=()=>{let o=a();return pd(o,e)},i}function ke(i,e={}){let t=e.opacity??1,n=new yr({color:i,transparent:t<1,opacity:t,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??0,shininess:e.shininess??28,specular:e.specular??4473924,flatShading:!1,side:e.side??Sn,depthWrite:t>=.95,clippingPlanes:e.clip||e.clippingPlanes||[],clipShadows:!!(e.clip||e.clippingPlanes)});return e.map&&(n.map=e.map),n}var eh=new Map;function Xx(i=128,e=1){let t=i+":"+e.toFixed(2);if(eh.has(t))return eh.get(t);let n=document.createElement("canvas");n.width=i,n.height=i;let s=document.createElement("canvas");s.width=i,s.height=i;let r=n.getContext("2d"),a=s.getContext("2d"),o=r.createImageData(i,i),l=a.createImageData(i,i);for(let u=0;u<i;u++){let f=Math.sin(u*1.15)*.55+Math.sin(u*2.7)*.28+Math.sin(u*5.1)*.12+Math.sin(u*11.3)*.06,g=.55+f*.38+Math.sin(u*.37)*.1;for(let x=0;x<i;x++){let m=Math.sin(x*.04+u*.015)*.08,p=f+m,A=Math.max(0,Math.min(255,Math.floor(128+p*55*e))),D=Math.max(0,Math.min(255,Math.floor(128+Math.sin(x*.55+u*.08)*6*e))),M=(u*i+x)*4;o.data[M]=A,o.data[M+1]=D,o.data[M+2]=255,o.data[M+3]=255;let v=Math.max(0,Math.min(255,Math.floor((g+m*.35)*255)));l.data[M]=v,l.data[M+1]=v,l.data[M+2]=v,l.data[M+3]=255}}r.putImageData(o,0,0),a.putImageData(l,0,0);let c=new En(n);c.wrapS=c.wrapT=Vi,c.colorSpace=An,c.anisotropy=4;let h=new En(s);h.wrapS=h.wrapT=Vi,h.colorSpace=An,h.anisotropy=4;let d={normalMap:c,roughnessMap:h};return eh.set(t,d),d}function V(i,e={}){if(e.phong)return ke(i,{shininess:e.shininess??72,specular:e.specular??11184810,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??.04,opacity:e.opacity??1,side:e.side,map:e.map,clip:e.clip});let t=e.opacity??1;if(fd&&e.brush!=="force"){let a=new Be(i).getHSL({}),o=!e._fromBrass&&a.s<.16&&a.l>.34&&e.emissive==null,l=new On({color:i,metalness:o?.12:Math.min(e.metalness??.82,e._fromBrass?.22:.42),roughness:Math.max(e.roughness??.28,.4),emissive:o?i:e.emissive??0,emissiveIntensity:o?.16:e.emissiveIntensity??.04,transparent:t<1,opacity:t,side:e.side??Sn,depthWrite:t>=.95,clippingPlanes:e.clip||e.clippingPlanes||[],clipShadows:!!(e.clip||e.clippingPlanes),envMapIntensity:o?.3:Math.min(e.envMapIntensity??.7,.5)});return e.map&&(l.map=e.map),(e.clip||e.clippingPlanes)&&e.section!==!1&&pd(l,i),e.streak==="force"&&hl(l,{axis:e.brushAxis??"x",...e.streakOpts||{}}),l}let n=e.clearcoat!=null?e.clearcoat:0,s=n>0?xr:On,r=new s({color:i,metalness:e.metalness??.82,roughness:e.roughness??.28,emissive:e.emissive??0,emissiveIntensity:e.emissiveIntensity??.04,transparent:t<1,opacity:t,side:e.side??Sn,depthWrite:t>=.95,clippingPlanes:e.clip||e.clippingPlanes||[],clipShadows:!!(e.clip||e.clippingPlanes),envMapIntensity:e.envMapIntensity??.7});if(n>0&&(r.clearcoat=n,r.clearcoatRoughness=e.clearcoatRoughness??.2),e.map&&(r.map=e.map),e.brush!==!1){let a=e.brushStrength??1.15,o=Xx(e.brushSize??128,a),l=e.brushRepeatU??e.brushRepeat??2.5,c=e.brushRepeatV??(e.brushRepeat!=null?e.brushRepeat*2.2:7);r.normalMap=o.normalMap,r.normalScale=new De(e.normalScaleX??1.25,e.normalScaleY??.22),r.normalMap.repeat.set(l,c),e.roughnessMap!==!1&&(r.roughnessMap=o.roughnessMap,r.roughnessMap.repeat.set(l,c))}return e.streak&&!e._fromBrass&&hl(r,{axis:e.brushAxis??"x",...e.streakOpts||{}}),r}function di(i,e={}){let t=e.opacity??.18,n=new On({color:i,metalness:.05,roughness:e.roughness??.12,transparent:!0,opacity:t,side:e.side??Zt,depthWrite:!1,envMapIntensity:e.envMapIntensity??.35});return n.userData.isGlass=!0,n}function hl(i,e={}){let t=e.axis??"x",n={uStreakI:{value:e.intensity??.42},uStreakExp:{value:e.exp??90},uGrainF:{value:e.freq??70},uGrainAmt:{value:e.grain??.1}};i.userData.streak=n;let s={x:"vec3(1.0, 0.0, 0.0)",y:"vec3(0.0, 1.0, 0.0)",z:"vec3(0.0, 0.0, 1.0)",circ:"normalize(vec3(-position.z, 0.0, position.x) + vec3(1e-5))"}[t],r={x:"(vObjP.y * 0.8 + vObjP.z * 0.6)",y:"(vObjP.x * 0.8 + vObjP.z * 0.6)",z:"(vObjP.x * 0.6 + vObjP.y * 0.8)",circ:"vObjP.y"}[t],a=i.onBeforeCompile;i.onBeforeCompile=(h,d)=>{a&&a(h,d),Object.assign(h.uniforms,n),h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
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
#include <opaque_fragment>`)};let o=i.clone.bind(i);i.clone=()=>hl(o(),e);let l="brushStreak:"+t,c=i.customProgramCacheKey?.bind(i);return i.customProgramCacheKey=()=>(c?c():"")+l,i}function Ot(i=13936736,e={}){if(fd&&e.brush!=="force"){let n=e.cleanHex??Wx(i);return V(n,{clip:e.clip,side:e.side,opacity:e.opacity,map:e.map,metalness:.22,roughness:.44,envMapIntensity:.35,emissive:n,emissiveIntensity:Math.min(.07,(e.emissiveIntensity??.3)*.2),streak:e.streak==="force"?"force":!1,brushAxis:e.brushAxis,streakOpts:e.streakOpts,_fromBrass:!0})}let t=V(i,{metalness:e.metalness??.58,roughness:e.roughness??.2,emissive:e.emissive??10512416,emissiveIntensity:e.emissiveIntensity??.3,envMapIntensity:e.envMapIntensity??.55,clearcoat:e.clearcoat??.32,clearcoatRoughness:e.clearcoatRoughness??.28,brushStrength:e.brushStrength??2,brushSize:e.brushSize??128,normalScaleX:e.normalScaleX??1.55,normalScaleY:e.normalScaleY??.18,...e,_fromBrass:!0});return e.streak!==!1&&hl(t,{axis:e.brushAxis??"x",...e.streakOpts||{}}),t}function Cn(i,e={}){return ke(i,{shininess:e.shininess??18,specular:e.specular??3355443,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,opacity:e.opacity??1,side:e.side,map:e.map})}function ji(i=220,e={}){let t=i-3<<16|i<<8|Math.min(255,i+8);return Cn(t,{emissive:t,emissiveIntensity:e.lift??.42,envMapIntensity:.15,...e})}function fi(i=14474456,e={}){return Cn(i,{emissive:i,emissiveIntensity:e.lift??.32,...e})}function jt(i,e,t,n=.04,s=3){let r=Math.min(n,i*.45,e*.45,t*.45);return new cl(i,e,t,s,r)}function ul(i,e=28){if(i&&i.type==="RoundedBoxGeometry"&&i.parameters){let t=i.parameters;return new Vt(new ye(t.width*.998,t.height*.998,t.depth*.998),e)}return new Vt(i,e)}function He(i,e,t,n,s=.04,r=3){return new k(jt(i,e,t,s,r),n)}function dl(i,e,t,n,s,r=0){let a=new k(new ye(e+.04,Math.min(.05,t*.25),n+.04),s);return a.position.y=r,i.add(a),a}function nt(i,e,t,n,s,r={}){let a=r.t??.045,o=r.railH??.07,l=r.overhang??.03,c=new k(new ye(e+l*2,a,t+l*2),s);c.position.y=n,i.add(c);let h=n-o/2+a/2;for(let[d,u,f,g]of[[0,t/2+l/2,e+l*2,a],[0,-t/2-l/2,e+l*2,a],[e/2+l/2,0,a,t+l*2],[-e/2-l/2,0,a,t+l*2]]){let x=new k(new ye(f,o,g),s);x.position.set(d,h,u),i.add(x)}return c}function Vs(i,e,t,n,s,r={}){let a=new k(new Pt(e,t??.035,r.radial??8,r.tubular??48),s);return a.rotation.x=Math.PI/2,a.position.y=n,(r.scaleX||r.scaleZ)&&a.scale.set(r.scaleX??1,1,r.scaleZ??1),i.add(a),a}function xt(i,e={}){let t=e.dur??1.15,n=l=>l*l*(3-2*l),s=i.map((l,c)=>{let h=l.obj,d=l.delay??c/Math.max(1,i.length-1)*.45,u=h.position.y;h.userData._revPending=!0;let f=l.fromY??u-(l.drop??.35);return h.position.y=f,h.scale.setScalar(l.fromScale??.55),h.traverse(g=>{g.isMesh&&g.material&&(g.userData._revMat||(g.material=g.material.clone(),g.userData._revMat=!0),g.material.transparent=!0,g.userData._revOp=g.material.opacity??1,g.material.opacity=0)}),{obj:h,delay:d,baseY:u,fromY:f,fromScale:l.fromScale??.55}}),r=0,a=!1,o=!1;return{get done(){return o},arm(){o||(a=!0,r=0)},tick(l){if(!a||o)return!o&&a;r+=l;let c=!0;for(let h of s){let d=Math.max(0,Math.min(1,(r-h.delay)/t)),u=n(d);h.obj.position.y=h.fromY+(h.baseY-h.fromY)*u;let f=h.fromScale+(1-h.fromScale)*u;h.obj.scale.setScalar(f),h.obj.traverse(g=>{g.isMesh&&g.material&&g.userData._revOp!=null&&(g.material.opacity=g.userData._revOp*u,u>=.99&&g.userData._revOp>=.95&&(g.material.transparent=g.userData._revOp<1,g.material.opacity=g.userData._revOp))}),d<1&&(c=!1)}if(c){o=!0,a=!1;for(let h of s)delete h.obj.userData._revPending}return!0}}}var Qi=(i,e)=>.12*(i-1.2)**2+1.5*(e-.35*Math.sin(1.7*i))**2,fl=(i,e)=>{let t=e-.35*Math.sin(1.7*i);return[.24*(i-1.2)+3*t*(-.595*Math.cos(1.7*i)),3*t]},Vr={x:1.2,y:.35*Math.sin(2.04)},md={X0:-3,X1:3,Y0:-1.6,Y1:1.6};var{X0:jn,X1:pi,Y0:mi,Y1:Qn}=md,qx=.62,gd=(i,e)=>qx*Math.log(1+Qi(i,e)),Wr=(i,e,t)=>Math.max(e,Math.min(t,i)),th=i=>[1,3,5].map(e=>parseInt(i.slice(e,e+2),16));function xd(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}var yd=i=>Math.sqrt(-2*Math.log(i()||1e-9))*Math.cos(2*Math.PI*i());function Yx(){let t=document.createElement("canvas");t.width=900,t.height=480;let n=t.getContext("2d"),s=n.createImageData(900,480),r=th("#f3eefc"),a=th("#4f3080"),o=th("#3a2560"),l=new Int16Array(900*480),c=new Float32Array(900*480);for(let d=0;d<480;d++)for(let u=0;u<900;u++){let f=jn+(u+.5)/900*(pi-jn),g=Qn-(d+.5)/480*(Qn-mi),x=Math.log(1+Qi(f,g));c[d*900+u]=x,l[d*900+u]=Math.floor(x*5)}for(let d=0;d<480;d++)for(let u=0;u<900;u++){let f=d*900+u,g=l[f],x=Wr(g/5/2.4,0,1),m=u+1<900&&l[f+1]!==g||d+1<480&&l[f+900]!==g,p=r.map((D,M)=>D+(a[M]-D)*x),A=m?.45:0;s.data.set([p[0]+(o[0]-p[0])*A,p[1]+(o[1]-p[1])*A,p[2]+(o[2]-p[2])*A,255],f*4)}n.putImageData(s,0,0);let h=new En(t);return h.colorSpace=kt,h.anisotropy=4,h}function _d(i,e){let t=e.ui,n=t.C,s=e.mode==="pair",r=Q=>Q<560,a=.06,o=.9,l=.01,c=500,h=.25,d=s?{x:-2.5,y:1.25}:{x:-2.4,y:1.2},u=0,f=xd(2),g=0,x=!0,m=[],p=()=>{f=xd(2),m=(s?[0,1]:[0]).map(Q=>({k:Q,p:{...d},v:{x:0,y:0},trail:[{...d}],n:0,done:0})),b=!0},A=Q=>{let _e=fl(Q.x,Q.y);return u?[_e[0]+u*yd(f)*.6,_e[1]+u*yd(f)*.6]:_e};function D(){for(let Q of m){if(Q.done)continue;let _e=A(Q.p);s?Q.k===0?(Q.p={x:Q.p.x-a*_e[0],y:Q.p.y-a*_e[1]},Q.n++,Qi(Q.p.x,Q.p.y)<l?Q.done=Q.n:Q.n>=c&&(Q.done=-1)):(Q.v={x:o*Q.v.x-a*_e[0],y:o*Q.v.y-a*_e[1]},Q.p={x:Q.p.x+Q.v.x,y:Q.p.y+Q.v.y},Q.n++,Qi(Q.p.x,Q.p.y)<l?Q.done=Q.n:Q.n>=c&&(Q.done=-1)):(Q.p={x:Q.p.x-h*_e[0],y:Q.p.y-h*_e[1]},Q.n++,(Math.hypot(...fl(Q.p.x,Q.p.y))<.004||Q.n>600||!isFinite(Q.p.x)||Math.abs(Q.p.y)>50)&&(Q.done=Q.n)),Q.trail.push(Q.p),Q.trail.length>600&&Q.trail.shift()}b=!0}let M=()=>m.some(Q=>!Q.done),v=()=>{let Q=0;for(;M()&&Q++<2e3;)D()},b=!0,I=null,_=mt(i,{ui:t,label:s?"Two balls rolling down the same three-dimensional error valley: plain steps and steps with momentum. Drag sideways to turn it; tap to drop the balls somewhere else.":"A three-dimensional error landscape for two knobs; a ball rolls downhill by gradient descent. Drag sideways to turn it; tap to drop the ball somewhere else.",height:Q=>r(Q)?Math.round(Math.max(280,Q*.78)):Math.round(Math.min(440,Q*.5)),radius:3.6,radiusY:2.7,yaw:-.42,pitch:.8,target:new P(0,.25,.1),busy:()=>I&&!I.done||x===!1&&M(),step(Q){return I&&!I.done?(I.tick(Q),!0):x||!M()?!1:(g+=Q,g<(s?.04:.11)?!0:(g=0,D(),s&&D(),pe(),M()))},onShow(){I?.arm(),x&&(x=!1,t.isPlaying()||v(),pe(),_&&_.kick())},pickable:()=>F,onTap(Q){d={x:Wr(Q.x,jn,pi),y:Wr(-Q.z,mi,Qn)},p(),x=!1,t.isPlaying()||v(),pe(),et()},onKey(){p(),x=!1,t.isPlaying()||v(),pe()},onTurn(){et()}});if(!_)return!1;let{scene:w}=_;gt(w,{hemi:.85,keyI:1.2,fillI:.35,rimI:.4,envI:.5,sky:16775423,ground:10129584});let N=new be;w.add(N);let O=150,B=80,U=new Bn(pi-jn,Qn-mi,O,B);U.rotateX(-Math.PI/2);let S=U.attributes.position;for(let Q=0;Q<S.count;Q++){let _e=S.getX(Q),Ue=-S.getZ(Q);S.setY(Q,gd(_e,Ue))}U.computeVertexNormals();let F=new k(U,ke(16777215,{map:Yx(),side:Zt,shininess:22,specular:5592439}));N.add(F);let z=-.05,W=Cn(14275558,{side:Zt}),H=Q=>{let _e=new Ct,Ue=[];for(let Ye=0;Ye<Q.length-1;Ye++){let[Ke,ut]=[Q[Ye],Q[Ye+1]];Ue.push(Ke.x,Ke.y,Ke.z,ut.x,ut.y,ut.z,ut.x,z,ut.z,Ke.x,Ke.y,Ke.z,ut.x,z,ut.z,Ke.x,z,Ke.z)}_e.setAttribute("position",new at(Ue,3)),_e.computeVertexNormals(),N.add(new k(_e,W))},C=(Q,_e,Ue=0)=>new P(Q,gd(Q,_e)+Ue,-_e);for(let Q of[[jn,pi,mi,mi],[jn,pi,Qn,Qn],[jn,jn,mi,Qn],[pi,pi,mi,Qn]]){let _e=[];for(let Ue=0;Ue<=120;Ue++){let Ye=Ue/120;_e.push(C(Q[0]+(Q[1]-Q[0])*Ye,Q[2]+(Q[3]-Q[2])*Ye))}H(_e)}let G=new k(new Pt(.11,.022,8,32),new nn({color:16777215}));G.rotation.x=-Math.PI/2,G.position.copy(C(Vr.x,Vr.y,.02)),N.add(G),_.label("lowest point",()=>C(Vr.x,Vr.y,0),"l3d-ink",!0);let L=s?[16777215,new Be(n.on).getHex()]:[new Be(n.on).getHex()],X=.12,ee=L.map(Q=>{let _e=new k(new Je(X,32,16),V(Q,{emissive:Q,emissiveIntensity:.14,roughness:.28,metalness:.55,clearcoat:.4,brush:!1}));return w.add(_e),_e}),te=L.map(()=>{let Q=new k(new Je(X*1.16,32,16),new nn({color:new Be(n.ink),side:Bt}));return w.add(Q),Q}),se=L.map(Q=>new nn({color:Q})),ce=L.map(()=>null),Z=Q=>isFinite(Q.x)&&Q.x>=jn&&Q.x<=pi&&Q.y>=mi&&Q.y<=Qn,J=s?null:new wr(new P(1,0,0),new P,.6,16777215,.18,.11);J&&w.add(J),I=xt([{obj:N,delay:0,drop:.35,fromScale:.92}],{dur:.85}),s&&(_.label("plain steps",()=>Z(m[0].p)?C(m[0].p.x,m[0].p.y,X*5.5):null,"l3d-white"),_.label("with momentum",()=>Z(m[1].p)?C(m[1].p.x,m[1].p.y,X*5.5):null,"l3d-yellow"));function pe(){if(m.forEach((Q,_e)=>{let Ue=Z(Q.p);if(ee[_e].visible=te[_e].visible=Ue,Ue){let Ye=C(Q.p.x,Q.p.y,X*.9);ee[_e].position.copy(Ye),te[_e].position.copy(Ye)}if(b){ce[_e]&&(w.remove(ce[_e]),ce[_e].geometry.dispose(),ce[_e]=null);let Ye=Q.trail.filter(Z).map(Ke=>C(Ke.x,Ke.y,.035));if(Ye.length>1){let Ke=new gr;for(let ut=0;ut<Ye.length-1;ut++)Ke.add(new Cs(Ye[ut],Ye[ut+1]));ce[_e]=new k(new Yi(Ke,Math.min(1200,(Ye.length-1)*2),.022,5,!1),se[_e]),w.add(ce[_e])}}}),b=!1,J){let Q=m[0],_e=fl(Q.p.x,Q.p.y),Ue=Math.hypot(..._e);if(J.visible=Z(Q.p)&&isFinite(Ue)&&Ue>.01,J.visible){let Ye=C(Q.p.x,Q.p.y,X*.9),Ke=.32,ut=C(Wr(Q.p.x-_e[0]/Ue*Ke,jn,pi),Wr(Q.p.y-_e[1]/Ue*Ke,mi,Qn),X*.9),yt=ut.sub(Ye).normalize();J.position.copy(Ye.addScaledVector(yt,X*1.05)),J.setDirection(yt)}}$e(),_.invalidate()}let ge=t.controls(i);s?t.slider(ge,{label:"Noise in each step (smaller batches)",name:"noise",min:0,max:1,step:.05,value:u,color:n.learn,fmt:Q=>Q===0?"none":Q.toFixed(2),oninput:Q=>{u=Q,p(),x=!1,t.isPlaying()||v(),pe()}}):t.slider(ge,{label:"Step size",name:"lr",min:.02,max:.75,step:.01,value:h,color:n.learn,fmt:Q=>Q.toFixed(2),oninput:Q=>{h=Q,p(),x=!1,t.isPlaying()||v(),pe()}}),t.button(ge,"Roll again",()=>{p(),x=!1,t.isPlaying()||v(),pe()},{name:s?"sgd-again":"lv-again"});let xe=t.readout(i);function $e(){if(s){let Ye=Ke=>Ke.done>0?`on the floor in <b>${Ke.done}</b> steps`:Ke.done<0?`not there after ${c} steps`:`error ${Qi(Ke.p.x,Ke.p.y).toFixed(2)} after ${Ke.n} steps`;xe.innerHTML=`To the floor (error below ${l}): <span class="c-grey">plain steps</span> ${Ye(m[0])}; <span class="c-yellow">with momentum</span> ${Ye(m[1])}.`;return}let Q=m[0],_e=Qi(Q.p.x,Q.p.y),Ue=!isFinite(_e)||_e>50||!Z(Q.p);xe.innerHTML=Ue?"The steps are so big the ball <b>flies out of the valley</b>: each step overshoots further than the last.":`Error <b>${_e.toFixed(3)}</b> after <b>${Q.n}</b> steps; the white arrow is the steepest way down.`}let ot=t.hint(i,s?"drag sideways to turn the valley, and tap it to drop both balls somewhere else. Then add noise: each step sees only part of the data, so the slope it measures wobbles.":"drag sideways to turn the landscape, and tap it to drop the ball somewhere else. Then push the step size up until the ball zigzags across the valley.");function et(){ot&&ot.classList&&ot.classList.add("done")}return p(),t.isPlaying()||(x=!1,v()),pe(),!0}var Ws=(i,e,t)=>Math.max(e,Math.min(t,i)),vd=.02585,Md=1.2,IM=Md*vd*Math.LN10,es=.7,ei=(i,e)=>Math.log1p(Math.exp((i-e)/(2*Md*vd)))**2,nh={si:11578532,siMid:10262672,siDark:8420468,source:9089240,drain:6985928,oxide:10135728,gate:6980760,channel:5165e3,fin:12631220,wire:13949148,contact:13936736,spacer:13683908,ild:12106948,cut:15769696};function $x(i,e={}){return ke(i,{opacity:e.opacity??1,side:e.side,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,clip:e.clip,shininess:e.shininess??34,specular:e.specular??6710886})}function Xs(i,e,t,n,s=12){let r=new be,a=Math.max(.01,i-e);r.add(new k(new ye(a,e,t),n));let o=e/2,l=new k(new Ae(o,o,t,s),n);l.rotation.x=Math.PI/2,l.position.x=-i/2+o,r.add(l);let c=l.clone();return c.position.x=i/2-o,r.add(c),r}function Zx(i,e,t,n){let s=new be,r=t/2,a=Math.max(.01,e-t);s.add(new k(new ye(i-t,a,t),n));let o=new k(new Ae(r,r,i-t,16),n);o.rotation.z=Math.PI/2,o.position.y=a/2,s.add(o);let l=o.clone();l.position.y=-a/2,s.add(l);for(let c of[-1,1]){let h=new k(new Je(r,14,12),n);h.scale.set(1,e/t,1),h.position.set(c*(i/2-r),0,0),s.add(h)}return s}function ih(i,e,t,n,s,r,a){let o=new be,l=new k(new Ae(.065,.07,s,16),r);l.position.y=s/2,o.add(l);let c=new k(new Ae(.13,.13,.045,18),a);return c.position.y=s+.02,o.add(c),o.position.set(e,t,n),i.add(o),o}function bd(i,e){let t=e.ui,n=t.C,s=E=>E<560,r=1.15,a=.25+.55*(1.15/2),o=.55,l=.35,c=[],h=null,d=new pn(new P(-1,0,0),0),u=mt(i,{ui:t,label:"A MOSFET cut open in three dimensions. Drag sideways to turn it; Peek morphs planar \u2192 FinFET \u2192 GAA; Gate opens the channel.",height:E=>E<560?400:440,radius:1.08,radiusY:.86,yaw:.6,pitch:.26,target:new P(0,.5,0),localClipping:!0,fitPadY:1.22,fitPadX:1.1,fov:34,busy:()=>h&&!h.done||c.length>0&&o>l*.6,onShow(){h?.arm(),u&&u.invalidate()},step(E){try{h&&!h.done&&h.tick(E);let re=ei(o,l)/ei(es,l),de=re*55*E;for(let R=0;R<de;R++)c.length<100&&c.push({t:Math.random()*.12,lane:Math.random()});for(let R of c)R.t+=E*(.55+re*.95);for(let R=c.length-1;R>=0;R--)c[R].t>1&&c.splice(R,1);return Ye(),c.length>0}catch{return!1}}});if(!u)return!1;let{scene:f}=u;gt(f,{hemi:.4,keyI:1.55,fillI:.22,rimI:.62,sky:16769216,ground:3813408,keyPos:[5,6,4],fillPos:[-4,2,-2],envI:.25,glintI:.18,glintPos:[8,7,1.5]});let g=new be;f.add(g);let x=[d],m=Ot(12623984,{clip:x,metalness:.55,emissiveIntensity:.26,envMapIntensity:.28,brushStrength:1.9,clearcoat:.14,clearcoatRoughness:.32}),p=Ot(11569232,{clip:x,metalness:.55,emissiveIntensity:.24,envMapIntensity:.28,brushStrength:1.6,clearcoat:.12,clearcoatRoughness:.32}),A=V(13157564,{clip:x,roughness:.42,metalness:.3,envMapIntensity:.35}),D=Ot(12099696,{clip:x,metalness:.52,emissive:8413232,emissiveIntensity:.32,envMapIntensity:.3,clearcoat:.18,clearcoatRoughness:.28}),M=Ot(11044952,{clip:x,metalness:.52,emissive:7360552,emissiveIntensity:.32,envMapIntensity:.3,clearcoat:.18,clearcoatRoughness:.28}),v=V(nh.oxide,{clip:x,roughness:.42,metalness:.15,opacity:.38,brush:!1,envMapIntensity:.18}),b=Ot(10123344,{clip:x,metalness:.55,emissive:6307872,emissiveIntensity:.34,clearcoat:.2,clearcoatRoughness:.28,brushStrength:1.6,envMapIntensity:.3}),I=$x(nh.channel,{clip:x,emissive:nh.channel,emissiveIntensity:.4,opacity:.9}),_=Ot(12623984,{clip:x,metalness:.52,emissiveIntensity:.26,brushStrength:1.3,envMapIntensity:.28,clearcoat:.15}),w=Ot(13676656,{clip:x,metalness:.58,emissiveIntensity:.28,clearcoat:.22,clearcoatRoughness:.25,brushStrength:1.4,envMapIntensity:.3}),N=Ot(13146184,{clip:x,emissiveIntensity:.26,brushStrength:1.8,clearcoat:.14,clearcoatRoughness:.3,envMapIntensity:.28}),O=V(11573360,{clip:x,roughness:.35,metalness:.5,brushStrength:.7,emissive:5259304,emissiveIntensity:.08,envMapIntensity:.3}),B=V(9472112,{clip:x,roughness:.45,metalness:.25,opacity:.38,brush:!1,envMapIntensity:.18}),U=He(3.2,.42,2,m,.07);U.position.y=-.02,g.add(U),nt(g,3.15,1.95,.18,Ot(13148256,{clip:x,emissiveIntensity:.3,clearcoat:.18,clearcoatRoughness:.28,envMapIntensity:.3}),{t:.032,railH:.04,overhang:.025});{let E=He(3.15,.09,1.95,p,.04);E.position.set(0,.22,0),g.add(E)}{let E=He(3.22,.07,2.02,A,.035);E.position.set(0,-.26,0),g.add(E)}for(let E=0;E<11;E++){let re=-.9+E*.18,de=new k(new ye(2.95,.028,.045),N);de.position.set(0,.245,re),g.add(de)}for(let E=0;E<7;E++){let re=-1.35+E*.45,de=new k(new ye(.04,.03,1.75),Ot(12093512,{clip:x,emissiveIntensity:.2,brushStrength:1,envMapIntensity:.35}));de.position.set(re,.248,0),g.add(de)}for(let E of[-.85,.85]){let re=He(2.8,.06,.12,A,.02);re.position.set(0,.2,E),g.add(re)}let S=Xs(.95,.28,1.3,D,16);S.position.set(-.95,.3,0),g.add(S);let F=Xs(.95,.28,1.3,M,16);F.position.set(.95,.3,0),g.add(F);{let E=Xs(.78,.06,1.1,N,12);E.position.set(-.95,.46,0),g.add(E)}{let E=Xs(.78,.06,1.1,N,12);E.position.set(.95,.46,0),g.add(E)}for(let E of[-.95,.95])for(let re of[-.35,0,.35]){let de=new k(new ye(.55,.035,.12),N);de.position.set(E,.5,re),g.add(de)}let z=new k(new ye(1.4,.04,1.3),B);z.position.y=.46,g.add(z);let W=new k(new ye(1.05,.045,1.15),v);W.position.set(0,.44,0),g.add(W);let H=Xs(.98,.13,1.1,b,12);H.position.set(0,.54,0),g.add(H);for(let E of[-1,1]){let re=new k(new ye(.08,.16,1.05),O);re.position.set(E*.55,.52,0),g.add(re)}let C=new be;g.add(C);let G=Zx(1.2,.55,.18,_);G.position.set(0,.58,0),C.add(G);let L=new k(new ye(1.1,.48,.035),v);L.position.set(0,.58,.12),C.add(L);let X=L.clone();X.position.z=-.12,C.add(X);let ee=new k(new Ae(.125,.125,1.1,16,1,!1,0,Math.PI));ee.material=v,ee.rotation.z=Math.PI/2,ee.position.set(0,.84,0),C.add(ee);let te=new k(new ye(.95,.48,.08),b);te.position.set(0,.58,.165),C.add(te);let se=te.clone();se.position.z=-.165,C.add(se);let ce=new k(new Ae(.18,.18,.95,20,1,!1,0,Math.PI));ce.material=b,ce.rotation.z=Math.PI/2,ce.position.set(0,.9,0),C.add(ce);for(let E of[-1,1]){let re=new k(new ye(.1,.5,.38),O);re.position.set(E*.55,.6,0),C.add(re)}let Z=new be;g.add(Z);for(let E=0;E<3;E++){let re=.42+E*.28,de=new be;de.add(new k(new ye(1.15,.07,.26),_));for(let q of[-1,1]){let K=new k(new Je(.07,12,10),_);K.scale.set(1,1,1.85),K.position.set(q*.575,0,0),de.add(K)}de.position.y=re,Z.add(de);let R=new k(new ye(.72,.13,.34),v);R.position.set(0,re,0),Z.add(R);let y=Xs(.7,.16,.4,b,10);y.position.set(0,re,0),Z.add(y)}for(let E of[-1,1]){let re=new k(new ye(.12,.85,.2),_);re.position.set(E*.7,.7,0),Z.add(re)}let J=new k(new Xi(.055,.85,6,14),I);J.rotation.z=Math.PI/2,J.position.set(0,.34,0),g.add(J);let pe=ih(g,-.95,.42,.45,.28,w,N),ge=ih(g,.95,.42,.45,.28,w,N),xe=ih(g,0,.55,-.55,.32,w,N),$e=new Je(.028,10,10),ot=ke(3836128,{emissive:3836128,emissiveIntensity:.55}),et=[];for(let E=0;E<100;E++){let re=new k($e,ot);re.visible=!1,g.add(re),et.push(re)}let Q=new Dt({color:3815476,transparent:!0,opacity:.12,clippingPlanes:x});for(let E of[U,S,F])if(E?.geometry)try{E.add(new Ft(new Vt(E.geometry,24),Q.clone()))}catch{}u.label('<span class="c-yellow">gate</span>',()=>new P(0,r>1.4?1.45:r>.5?1.22:.85,-.55),"");function _e(){let E=Ws(1-r,0,1),re=Ws(1-Math.abs(r-1),0,1),de=Ws(r-1,0,1);W.visible=H.visible=E>.08,W.scale.set(1,.5+.5*E,1),H.scale.setScalar(.7+.3*E),H.traverse(y=>{y.isMesh&&y.material&&y.material.emissiveIntensity!=null&&(y.material.emissiveIntensity=.05+.14*(o/es)*E)}),C.visible=re>.06,C.scale.set(1,.55+.45*re,.75+.25*re),Z.visible=de>.06,Z.scale.set(1,.6+.4*de,1);let R=Ws(ei(o,l)/ei(es,l),0,1);J.position.y=.32+.16*re+.26*de,J.scale.set(1,.7+.5*re,.8+.4*re),J.material.opacity=.12+.82*R,J.material.emissiveIntensity=.12+.75*R,J.visible=R>.02,xe.position.y=r>1.3?.55:r>.6?.45:.38,z.material.opacity=.25+.35*(1-Math.max(re,de))}function Ue(){let E=1.5-a*3;d.constant=E}function Ye(){let E=ei(o,l)/ei(es,l),re=J.position.y,de=.08+.07*Ws(r,0,1);for(let R=0;R<et.length;R++){let y=et[R],q=c[R];if(!q||E<.05){y.visible=!1;continue}y.visible=!0,y.position.set(-.5+q.t*1,re+(r>1.2?(R%3-1)*.22*Ws(r-1,0,1):0),(q.lane-.5)*de*2)}u.invalidate()}function Ke(){_e(),Ue(),Ye();let E=ei(o,l)/ei(es,l),re=ei(es,l)/Math.max(1e-12,ei(0,l)),de=r<.45?"planar":r<1.45?"FinFET":"GAA",R=Math.floor(Math.log10(Math.max(E,1e-12))),y=E>=.01?`${Math.round(E*100)}%`:`${(E/10**R).toFixed(1)}\xD710<sup>${R}</sup>`;yt.innerHTML=`<b class="c-blue">${de}</b> \xB7 gate <b>${o.toFixed(2)} V</b> \u2192 channel <b class="c-cyan">${y}</b> \xB7 on/off \u2248 <b>${re>=1e6?(re/1e6).toPrecision(2)+"M":Math.round(re).toLocaleString("en-GB")}\xD7</b>.`,u.invalidate()}let ut=t.controls(i);t.slider(ut,{label:"Peek",name:"gen",min:0,max:2,step:.01,value:r,color:n.compute,fmt:E=>E<.45?"planar":E<1.45?"FinFET":"GAA",oninput:E=>{r=E,a=.25+.55*(E/2),Ke()}}),t.slider(ut,{label:"Gate",name:"vg",min:0,max:es,step:.01,value:o,color:n.cyan,fmt:E=>`${E.toFixed(2)} V`,oninput:E=>{o=E,Ke()}});let yt=t.readout(i);t.hint(i,'<span class="c-blue">gate</span> fills <span class="c-cyan">channel</span> \xB7 <span class="c-blue">source</span>\u2190 \u2192<span class="c-blue">drain</span> \xB7 Peek: planar \u2192 FinFET \u2192 GAA'),Ke();let j=xt([{obj:U,delay:0,drop:.15},{obj:S,delay:.1,drop:.18},{obj:F,delay:.15,drop:.18},{obj:H,delay:.25,drop:.2},{obj:C,delay:.35,drop:.22},{obj:Z,delay:.45,drop:.22}],{dur:.95});return h=j,j.arm(),u.view.dist<3.4&&(u.view.dist=3.4),u.ready(),!0}var yn={usdPerEur:1.13,h100:{tdpW:700,bf16:9894e11,name:"H100 SXM"},dgxH100:{maxW:10200,gpus:8},pue:{best:1.09,avg:1.56},mfu:{lo:.38,hi:.43},eniac:{addPerS:5e3,W:15e4,tubes:17468},dcTWh2024:415,dcTWh2030:945,usDcTWh:{2014:58,2018:76,2023:176,lo2028:325,hi2028:580},irelandDc:{twh2024:6.969,share2024:.22,share2015:.05},colossus:{gpus:1e5,MW:150},ember:{world2025:31734,world2024:30913,us2024:4405,china2024:10070,europe2024:5094,japan2024:1016,ireland2024:36.1},ieaRegions:{us:[186.75,426.75],china:[103.75,278.75],europe:[62.25,107.25],japan:[18.75,33.75]},iea2035:{base:1200,liftOff:1700,highEff:970,headwinds:700},gb200RackKW:120,h100DieMM2:814,dgxH100USD:269e3,chipLifeYears:4,llama3GPUs:16384,nerc2024MW:1500};function sh(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Ct,c=0;for(let h=0;h<i.length;++h){let d=i[h],u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,d=[];for(let u=0;u<i.length;++u){let f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(let h in r){let d=Ed(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][u]);let g=Ed(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function Ed(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new an(a,t,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let d=l/t;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<t;g++){let x=h.getComponent(u,g);o.setComponent(u+d,g,x)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}var gi=(i,e,t)=>Math.max(e,Math.min(t,i)),_n=(i,e,t)=>i+(e-i)*t,Jx=i=>i*i*(3-2*i),Fi=[{key:"die",name:"one GPU die",W:yn.h100.tdpW,note:`H100 SXM \xB7 ${yn.h100.tdpW} W TDP \xB7 ${yn.h100DieMM2} mm\xB2 die`},{key:"board",name:"one server",W:yn.dgxH100.maxW,note:`DGX H100 \xB7 ${yn.dgxH100.maxW/1e3} kW max \xB7 ${yn.dgxH100.gpus} GPUs`},{key:"rack",name:"one rack",W:4*yn.dgxH100.maxW,note:"four DGX-class servers in one cabinet (packing assumed)"},{key:"hall",name:"the GPU hall",W:yn.colossus.gpus/8*yn.dgxH100.maxW,note:`${yn.colossus.gpus.toLocaleString("en-GB")} GPUs \xB7 servers only`},{key:"building",name:"the building",W:yn.colossus.MW*1e6,note:`Colossus \xB7 utility ${yn.colossus.MW} MW for everything inside`}];function Lt(i,e={}){return ke(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function Le(i,e,t,n,s=0,r=0,a=0){let o=new k(new ye(i,e,t),n);return o.position.set(s,r,a),o}function pt(i,e,t,n,s=0,r=0,a=0,o=.04){let l=He(i,e,t,n,o);return l.position.set(s,r,a),l}function Kx(i,{minDim:e=.1,color:t=1844270,opacity:n=.5}={}){i.updateMatrixWorld(!0);let s=new ft().copy(i.matrixWorld).invert(),r=[],a=new P,o=new ft,l=[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]];i.traverse(d=>{if(!d.isMesh||!d.geometry||d.isInstancedMesh)return;let u=d.geometry;u.boundingBox||u.computeBoundingBox();let f=u.boundingBox,g=new P;if(f.getSize(g),Math.max(g.x,g.y,g.z)<e)return;o.multiplyMatrices(s,d.matrixWorld);let x=[];for(let m=0;m<8;m++)a.set(m&1?f.max.x:f.min.x,m&2?f.max.y:f.min.y,m&4?f.max.z:f.min.z).applyMatrix4(o),x.push(a.clone());for(let[m,p]of l)r.push(x[m].x,x[m].y,x[m].z,x[p].x,x[p].y,x[p].z)});let c=new Ct;c.setAttribute("position",new at(r,3));let h=new Ft(c,new Dt({color:t,transparent:!0,opacity:n}));return h.userData.ink=n,i.add(h),h}function rh(i,e,t,n=.04,s=14){let r=i.clone().add(e).multiplyScalar(.5);r.y-=t;let a=new qi(i,r,e);return new Yi(a,s,n,6,!1)}function Xr(i,e,t,n,s,r){let a=new hi(new ye(t,n,s),r,e.length),o=new ft;return e.forEach((l,c)=>{o.makeTranslation(l[0],l[1],l[2]),a.setMatrixAt(c,o)}),a.instanceMatrix.needsUpdate=!0,i.add(a),a}var Sd=i=>i>=1e6?`${+(i/1e6).toPrecision(3)} MW`:i>=1e3?`${+(i/1e3).toPrecision(3)} kW`:`${Math.round(i)} W`;function wd(i,e){let t=e.ui,n=t.C,s=j=>j<560,r=1,a=null,o=0,l=null,c=[{dist:3.6,y:.28,pitch:.62,yaw:-.55},{dist:11.5,y:1.05,pitch:.48,yaw:-.72},{dist:30,y:4.4,pitch:.24,yaw:-.82},{dist:132,y:-3,pitch:.5,yaw:-.95},{dist:195,y:20,pitch:.26,yaw:.88}],h=mt(i,{ui:t,label:"A continuous three-dimensional zoom from one GPU die out through the server, rack and hall to the whole building. Drag sideways to turn; use the zoom control to pull out.",height:j=>s(j)?Math.round(Math.max(320,j*.95)):Math.round(Math.min(460,j*.55)),radius:4,radiusY:2.5,yaw:c[1].yaw,pitch:c[1].pitch,target:new P(0,c[1].y,0),autoFit:!1,contactShadow:!1,fov:34,busy:()=>a!=null||!!(l&&!l.done),onShow(){l?.arm(),Ue(!0),Ye(),h&&h.invalidate()},step(j){if(o+=j,l&&!l.done)return l.tick(j),!0;if(a!=null){let E=a-r;return Math.abs(E)<.004?(r=a,a=null):r+=E*Math.min(1,j*5.5),Ue(!0),Ye(),Ke(!1),!0}if(A){if(A.material.emissiveIntensity=.28+.14*Math.sin(o*2.2),b.visible){for(let E of N){let re=(E.ph+o*.45)%1;E.m.position.x=E.dir*(-2.75+re*5.5)}O.emissiveIntensity=.16+.12*(.5+.5*Math.sin(o*2.6))}return h.invalidate(),!0}return!1}});if(!h)return!1;let{scene:d,view:u,target:f}=h;u.dist=c[1].dist,gt(d,{hemi:.95,keyI:1.35,fillI:.38,rimI:.42,keyPos:[-5,12,7],fillPos:[7,3,-5],envI:.8,glintI:.4});let g=new k(new pr(140,64),Lt(15001824));g.rotation.x=-Math.PI/2,g.position.y=-.04,d.add(g);let x=new be;d.add(x);let m=new be;x.add(m);let p=Lt(14711354,{emissive:14711354,emissiveIntensity:.32}),A=Le(1.05,.14,1.05,p,0,.1,0);m.add(A);let D=Lt(15769696,{emissive:16777215,emissiveIntensity:.06});for(let j=0;j<5;j++)for(let E=0;E<5;E++)m.add(Le(.15,.035,.15,D,-.4+E*.2,.19,-.4+j*.2));let M=Lt(4168260,{emissive:4168260,emissiveIntensity:.1}),v=Lt(13686992);for(let j of[-1,1])for(let E=0;E<8;E++){let re=E%2?3115602:4168260;m.add(Le(.28,.055,.7,Lt(re,{emissive:2783796,emissiveIntensity:.08}),j*.78,.06+E*.07,0)),E<7&&m.add(Le(.26,.012,.65,v,j*.78,.09+E*.07,0))}m.add(pt(2,.07,1.5,V(13685980,{roughness:.42,metalness:.45}),0,.01,0,.04)),m.add(pt(1.95,.03,1.45,V(12106948,{roughness:.35}),0,.05,0,.03)),nt(m,1.95,1.45,.08,V(11055288),{t:.025,railH:.04,overhang:.02}),nt(m,1.05,1.05,.2,V(15769696),{t:.02,railH:.03,overhang:.015});for(let j=0;j<24;j++){let E=j/24*Math.PI*2,re=.92;m.add(Le(.04,.035,.04,Lt(12886112),Math.cos(E)*re,-.01,Math.sin(E)*re*.7))}for(let j=-3;j<=3;j++)for(let E=-2;E<=2;E++)Math.abs(j)+Math.abs(E)<2||m.add(Le(.035,.025,.035,Lt(12095568),j*.18,-.015,E*.18));let b=new be;x.add(b),b.position.set(0,-.08,0);let I=Lt(14474456),_=pt(6.4,.1,3.6,fi(14474456),0,0,0,.04);b.add(_),b.add(Le(6.8,.55,4,Lt(12108496),0,-.28,0)),b.add(Le(6,.04,.1,Lt(9080984),0,.08,1.5)),b.add(Le(6,.04,.1,Lt(9080984),0,.08,-1.5)),nt(b,6.4,3.6,.08,V(11842736),{t:.035,railH:.05,overhang:.03});for(let j=-4;j<=4;j++)b.add(Le(5.8,.015,.035,Lt(4880984,{opacity:.75}),0,.06,j*.32));let w=Lt(16765802,{emissive:16756778,emissiveIntensity:.95}),N=[];for(let j=-4;j<=4;j++)for(let E=0;E<2;E++){let re=Le(.5,.03,.085,w,0,.118,j*.32);b.add(re),N.push({m:re,ph:((j+4)*.37+E*.5)%1,dir:j%2?1:-1})}let O=Lt(14711354,{emissive:14711354,emissiveIntensity:.12}),B=[];for(let j=0;j<8;j++){if(j===2)continue;let E=new be,re=j%2,de=Math.floor(j/2),R=re?1.4:-1.4,y=-1.2+de*.8;E.position.set(R,.12,y),E.add(Le(.5,.1,.5,O)),nt(E,.5,.5,.08,V(15769696),{t:.015,railH:.025,overhang:.01});for(let q of[-.38,.38])for(let K=0;K<4;K++)E.add(Le(.14,.035,.35,M,q,.02+K*.04,0)),K<3&&E.add(Le(.12,.008,.32,v,q,.04+K*.04,0));b.add(E),B.push(E)}let U=new be;x.add(U);let S=V(4874114,{roughness:.4,metalness:.7}),F=V(5927576,{roughness:.45,metalness:.55,opacity:.88}),z=V(4018030,{roughness:.42,metalness:.65}),W=V(11582664,{roughness:.35,metalness:.7}),H=V(5924984,{roughness:.4,metalness:.75}),C=fi(13684940),G=V(14711354,{emissive:14711354,emissiveIntensity:.28,roughness:.38,metalness:.6});for(let j of[-3.5,3.5])for(let E of[-2,2])U.add(pt(.22,9,.22,S,j,4.3,E,.06));U.add(pt(.12,8.8,4,F,-3.55,4.3,0,.02)),U.add(pt(.12,8.8,4,F,3.55,4.3,0,.02)),U.add(pt(7.2,.2,4.2,z,0,.05,0,.06)),U.add(pt(7.2,.2,4.2,z,0,8.7,0,.06));for(let j of[3,6])U.add(pt(7,.1,.12,S,0,j,-2,.03)),U.add(pt(7,.1,.12,S,0,j,2,.03));for(let j=0;j<4;j++){let E=1.1+j*2,re=new be;re.position.y=E,U.add(re),re.add(pt(6.8,.16,3.8,z,0,-.55,0,.05)),re.add(pt(.16,1.55,3.6,W,-3.2,0,0,.04)),re.add(pt(.16,1.55,3.6,W,3.2,0,0,.04)),re.add(pt(6.6,1.55,.16,V(10529976,{roughness:.38,metalness:.7}),0,0,-1.85,.04)),re.add(pt(6.2,.1,.1,V(9083048),0,.55,1.85,.03)),re.add(pt(6,.06,.06,ke(5162176,{emissive:5162176,emissiveIntensity:.55}),0,.55,1.92,.02)),nt(re,6.6,3.6,.22,V(11056320),{t:.03,railH:.04,overhang:.02});for(let de=-1;de<=1;de++){let R=pt(.9,.7,.55,H,de*1.8,-.1,-1.5,.04);re.add(R);for(let q=0;q<4;q++)re.add(pt(.7,.04,.03,V(3817544),de*1.8,-.3+q*.14,-1.2,.01));let y=new k(new Ae(.12,.12,.04,12),V(9080984));y.rotation.x=Math.PI/2,y.position.set(de*1.8,-.1,-1.2),re.add(y)}j!==0&&re.add(pt(5.5,.08,2.8,C,0,.05,0,.04));for(let de of[-1.55,-.52,.52,1.55]){re.add(pt(.78,.09,.72,V(13685980,{roughness:.36,metalness:.78}),de,.14,.05,.04)),re.add(pt(.62,.16,.56,G,de,.28,.05,.04)),re.add(pt(.56,.07,.48,V(4116420,{roughness:.34,metalness:.55,emissive:1940114,emissiveIntensity:.38}),de,.4,.05,.025));for(let R of[-.14,.14])re.add(pt(.06,.12,.06,V(3127470,{roughness:.3,metalness:.6,emissive:1940114,emissiveIntensity:.3}),de+R,.47,-.2,.02));re.add(pt(.55,.04,.08,V(12093520,{roughness:.3,metalness:.7,emissive:8413216,emissiveIntensity:.15}),de,.15,-.4,.02));for(let R of[-.28,.28])for(let y=0;y<4;y++){let q=y%2?3115602:4168260;re.add(pt(.12,.035,.36,ke(q,{emissive:2783796,emissiveIntensity:.14}),de+R,.16+y*.038,.05,.015))}}for(let[de,R,y]of[[-.24,4116420,1940114],[-.36,2789064,1728152]]){let q=new k(new Ae(.045,.045,4,10),V(R,{roughness:.32,metalness:.6,emissive:y,emissiveIntensity:.35,brush:!1}));q.rotation.z=Math.PI/2,q.position.set(0,.53,de),re.add(q)}for(let[de,R]of[[-1.55,-.52],[.52,1.55]])for(let y=0;y<6;y++)re.add(pt(.95,.04,.05,V(8015560,{roughness:.32,metalness:.65,emissive:5910184,emissiveIntensity:.22}),(de+R)/2,.22,-.2+y*.09,.015));for(let de=-5;de<=5;de++)re.add(pt(.09,.42,.72,V(3836506,{roughness:.4,metalness:.5,emissive:2779716,emissiveIntensity:.06}),de*.55,.35,1.1,.025));re.add(pt(6.2,.08,.08,ke(5162176,{emissive:5162176,emissiveIntensity:.75}),0,.65,1.95,.02))}for(let j of[-1,1])for(let E of[1.5,2.5,3.5,4.5,5.5,6.5,7.5]){U.add(pt(.26,.26,3.4,V(2764856,{roughness:.5}),j*3.72,E,0,.05));for(let re=0;re<5;re++){let de=new k(new Ae(.035,.035,.95,8),V(4870232));de.rotation.z=Math.PI/2,de.position.set(j*3.95,E,-1.2+re*.6),U.add(de)}U.add(pt(.12,.12,.12,V(13215820,{roughness:.3,metalness:.8,emissive:10518576,emissiveIntensity:.12}),j*3.85,E,1.55,.03))}{let j=[];for(let de of[-1,1])for(let R of[1.5,2.5,3.5,4.5,5.5,6.5,7.5])for(let[y,q]of[[-1.6,-.2],[0,1.4]])j.push(rh(new P(de*4.02,R,y),new P(de*4.02,R,q),.32,.04,14));U.add(new k(sh(j,!1),V(1974824,{roughness:.5,metalness:.35,brush:!1})));let E=V(6977672,{roughness:.35,metalness:.65,emissive:1713200,emissiveIntensity:.15,brush:!1}),re=V(13215820,{roughness:.28,metalness:.8,emissive:8411680,emissiveIntensity:.18,brush:!1});for(let de=0;de<4;de++){let R=1.1+de*2;for(let y=0;y<10;y++)U.add(pt(.42,.32,.05,E,-2.55+y*.567,R+.25,1.98,.015));for(let y of[-3.05,3.05])U.add(pt(.08,.9,.1,re,y,R,2,.03));U.add(pt(.07,.07,.04,ke(6221962,{emissive:4120688,emissiveIntensity:.9}),2.75,R+.25,2.02,.01))}}b.position.y=1.15,m.position.set(0,1.35,0);let L=new be;x.add(L),L.add(Le(86,.25,54,V(3820120,{roughness:.55,metalness:.4,brush:!1}),0,-.15,0)),L.add(Le(78,.08,5.5,V(8308932,{roughness:.45,metalness:.3,emissive:3844260,emissiveIntensity:.2,brush:!1}),0,.02,0));for(let j of[-18,-9,9,18])L.add(Le(78,.06,2.2,V(13138e3,{roughness:.5,metalness:.25,emissive:10506288,emissiveIntensity:.12,brush:!1}),0,.02,j));let X=V(5930700,{roughness:.4,metalness:.55,emissive:3825324,emissiveIntensity:.14,brush:!1}),ee=V(5925506,{roughness:.42,metalness:.5,brush:!1}),te=V(8030888,{roughness:.4,metalness:.55,brush:!1}),se=V(14711354,{roughness:.38,metalness:.55,emissive:14711354,emissiveIntensity:.28,brush:!1}),ce=ke(5162176,{emissive:5162176,emissiveIntensity:.4}),Z=5,J=9;for(let j=0;j<Z;j++)for(let E=0;E<J;E++){if(j===2&&E===4)continue;let re=(E-(J-1)/2)*7.4,de=(j-(Z-1)/2)*9;for(let R of[-1.25,1.25])for(let y of[-.65,.65])L.add(Le(.16,7.6,.16,X,re+R,3.9,de+y));L.add(Le(2.7,.14,1.5,X,re,.18,de)),L.add(Le(2.7,.14,1.5,X,re,7.5,de));for(let R=0;R<5;R++){let y=.85+R*1.3;L.add(Le(2.5,.09,1.4,ee,re,y-.4,de)),L.add(Le(2.35,.85,.07,te,re,y,de-.62)),L.add(Le(.07,.85,1.2,te,re-1.15,y,de)),L.add(Le(.07,.85,1.2,te,re+1.15,y,de));for(let q of[-.65,.65])L.add(Le(.7,.18,.55,se,re+q,y-.22,de+.05)),L.add(Le(.65,.05,.5,V(4116420,{roughness:.4,metalness:.45,emissive:1940114,emissiveIntensity:.2,brush:!1}),re+q,y-.34,de+.05));R%2===0&&L.add(Le(2,.05,.05,ce,re,y+.32,de+.72))}L.add(Le(2,.08,.07,ce,re,6.5,de+.78)),L.add(Le(.14,6.8,.14,V(2764856,{roughness:.5,brush:!1}),re-1.42,3.6,de)),L.add(Le(.14,6.8,.14,V(2764856,{roughness:.5,brush:!1}),re+1.42,3.6,de));for(let R=0;R<6;R++)L.add(Le(.22,.12,.35,V(4870232,{roughness:.42,metalness:.55,brush:!1}),re-1.55,1+R*1.05,de+.15)),L.add(Le(.55,.05,.05,V(13215820,{roughness:.32,metalness:.75,brush:!1}),re-1.85,1+R*1.05,de+.15));for(let R=0;R<4;R++)L.add(Le(.08,5.5,.08,V(3819608,{roughness:.5,brush:!1}),re-.6+R*.4,3.2,de-.85))}for(let j=-4;j<=4;j++){L.add(Le(84,.28,.28,V(11055264,{roughness:.4,metalness:.6,brush:!1}),0,9.6,j*5.5)),L.add(Le(84,.14,.7,V(6975608,{roughness:.45,metalness:.5,brush:!1}),0,9.15,j*5.5+1.5));for(let E=-5;E<=5;E++)L.add(Le(.18,.55,.18,V(3817544,{roughness:.5,brush:!1}),E*7.2,8.7,j*5.5+1.5))}for(let j of[-18,-9,0,9,18]){L.add(Le(76,.12,.55,V(5922920,{roughness:.48,metalness:.45,brush:!1}),0,.12,j));for(let E=-6;E<=6;E++)L.add(Le(.35,.08,.35,V(2764856,{roughness:.5,brush:!1}),E*5.5,.22,j))}for(let j of[-24,24])for(let E of[-32,-16,0,16,32])L.add(Le(4.2,3,2,V(11581632,{roughness:.4,metalness:.55,brush:!1}),E,1.6,j)),L.add(Le(1.1,.7,1.1,V(9080984,{roughness:.35,metalness:.7,brush:!1}),E,3.4,j)),L.add(Le(3.5,.14,.14,ke(5162176,{emissive:5162176,emissiveIntensity:.55}),E,2.6,j+(j>0?-1.1:1.1)));for(let j=0;j<8;j++){let E=(j-3.5)*7.4;L.add(Le(.08,7.2,8.5,V(8030360,{roughness:.45,metalness:.35,opacity:.55,brush:!1}),E+3.5,3.8,0))}{let j=[],E=[],re=[],de=[],R=[],y=[];for(let K=0;K<Z;K++)for(let oe=0;oe<J;oe++){if(K===2&&oe===4)continue;let me=(oe-(J-1)/2)*7.4,ve=(K-(Z-1)/2)*9;for(let he=0;he<5;he++){let Me=.85+he*1.3,Oe=ve+.69;j.push([me,Me,Oe]);for(let Ee=0;Ee<8;Ee++)E.push([me-.98+Ee*.28,Me+.06,Oe+.03]);re.push([me+1,Me+.3,Oe+.04]),(K+oe+he)%3===0&&de.push([me+.86,Me+.3,Oe+.04]),R.push([me-1.08,Me,Oe+.06]),R.push([me+1.08,Me,Oe+.06])}let le=Math.round(ve/5.5)*5.5+1.5;for(let he of[-.7,.7])y.push(rh(new P(me+he,7.6,ve-.3),new P(me+he*1.6,9.1,le),-.45,.07,10));oe<J-1&&!(K===2&&oe===3)&&y.push(rh(new P(me+1.3,7.3,ve-.5),new P(me+7.4-1.3,7.3,ve-.5),.9,.055,12))}Xr(L,j,2.3,1,.05,V(2765376,{roughness:.45,metalness:.5,brush:!1})),Xr(L,E,.2,.62,.04,V(9083566,{roughness:.35,metalness:.6,emissive:2767438,emissiveIntensity:.2,brush:!1})),Xr(L,re,.09,.09,.04,ke(6221962,{emissive:4120688,emissiveIntensity:.9})),Xr(L,de,.09,.09,.04,ke(16756800,{emissive:16748576,emissiveIntensity:.9})),Xr(L,R,.07,.7,.08,V(13215820,{roughness:.3,metalness:.75,emissive:8413216,emissiveIntensity:.15,brush:!1}));let q=sh(y,!1);L.add(new k(q,V(2238511,{roughness:.55,metalness:.3,brush:!1})))}let pe=Kx(L,{minDim:.3,color:1581098,opacity:.5}),ge=new be;x.add(ge);let xe=Lt(14868698),$e=Lt(13157564),ot=Lt(11578532);ge.add(Le(108,28,1.6,xe,0,14,-40)),ge.add(Le(1.6,28,82,xe,-54,14,0)),ge.add(Le(1.6,28,22,xe,54,14,-30)),ge.add(Le(28,28,1.6,xe,-40,14,40)),ge.add(Le(1.2,28,1.2,ot,54,14,-19)),ge.add(Le(1.2,28,1.2,ot,-26,14,40)),ge.add(Le(70,1,36,$e,-18,28.2,-22)),ge.add(Le(36,1,28,$e,-36,28.2,12));for(let j=0;j<6;j++)ge.add(Le(.8,1.6,48,Lt(10131086),-6+j*14,28.2,4));for(let j=0;j<9;j++){let E=-48+j*12;ge.add(Le(9,4.2,7,V(11581632,{roughness:.4,metalness:.55,brush:!1}),E,31.2,-12)),ge.add(Le(2.5,2.6,2.5,V(9080984,{roughness:.35,metalness:.7,brush:!1}),E-2.3,34.2,-12)),ge.add(Le(2.5,2.6,2.5,V(9080984,{roughness:.35,metalness:.7,brush:!1}),E+2.3,34.2,-12)),ge.add(Le(8,.3,.3,ke(5162176,{emissive:5162176,emissiveIntensity:.35}),E,33.2,-8.2))}for(let j=0;j<6;j++){let E=-36+j*14;ge.add(Le(5,8,5,V(10134445,{roughness:.42,metalness:.5,brush:!1}),E,32.5,18)),ge.add(Le(3.5,1.2,3.5,V(8028810,{roughness:.4,metalness:.6,brush:!1}),E,37.2,18))}for(let j=0;j<7;j++)ge.add(Le(6,5.5,4.2,V(6975608,{roughness:.4,metalness:.6,brush:!1}),-62,2.6,-30+j*11)),ge.add(Le(1.3,3.2,1.3,V(4870232,{roughness:.4,metalness:.65,brush:!1}),-62,7,-30+j*11)),ge.add(Le(.4,4,.4,V(13215820,{roughness:.35,metalness:.8,brush:!1}),-58,4,-30+j*11));for(let j=0;j<4;j++)ge.add(Le(10,4,5,V(5924984,{roughness:.4,metalness:.55,brush:!1}),68,2.2,-20+j*14)),ge.add(Le(3,2.5,3,V(3819608,{roughness:.4,metalness:.6,brush:!1}),68,5.5,-20+j*14));for(let j=0;j<20;j++)ge.add(Le(.35,3.5,.35,V(6975592,{roughness:.5,brush:!1}),-75+j*8,1.6,55));ge.add(Le(160,.3,120,Lt(6975592),0,-.4,0)),ge.add(Le(40,.2,20,Lt(12107944),70,-.2,30));for(let j=0;j<5;j++)for(let E=0;E<14;E++)ge.add(Le(5.2,2.4,.35,Lt(10402e3,{emissive:8035e3,emissiveIntensity:.1}),-48+E*7.2,4.5+j*4.8,-40.6));ge.add(Le(18,.5,8,Lt(11055264),20,8,44)),ge.add(Le(.6,8,.6,ot,12,4,44)),ge.add(Le(.6,8,.6,ot,28,4,44)),l=xt([{obj:m,delay:0,drop:.25,fromScale:.7},{obj:b,delay:.2,drop:.2,fromScale:.85}],{dur:.9});let et=new Dt({color:1974822,transparent:!0,opacity:.4});[m,b,U].forEach(j=>j.traverse(E=>{if(!(!E.isMesh||!E.geometry))try{E.add(new Ft(new Vt(E.geometry,26),et.clone()))}catch{}})),h.label('<span class="c-orange">die</span>',()=>r<.9?new P(m.position.x,m.position.y+.55,m.position.z):null,""),h.label("DGX server",()=>r>.55&&r<1.42?new P(0,b.position.y+1.2,0):null,""),h.label("rack",()=>r>1.42&&r<2.45?new P(0,11.2,0):null,""),h.label("GPU hall",()=>r>2.4&&r<3.55?new P(0,8,22):null,""),h.label("building \xB7 150 MW",()=>r>3.4?new P(0,34,0):null,"");function Q(j){let E=gi(Math.floor(j),0,c.length-2),re=Jx(j-E),de=E===1?Math.pow(re,.22):E===0?Math.pow(re,.35):re,R=E===1?Math.pow(re,.28):E===0?Math.pow(re,.4):re,y=Math.exp(_n(Math.log(c[E].dist),Math.log(c[E+1].dist),de)),q=_n(c[E].y,c[E+1].y,R),K=_n(c[E].pitch,c[E+1].pitch,re);return E===0&&re>=.25&&(y=Math.max(y,_n(c[E].dist,c[E+1].dist,Math.max(.55,re*.95))),q=Math.max(q,_n(c[E].y,c[E+1].y,.55)),K=Math.min(K,_n(c[E].pitch,c[E+1].pitch,.85))),E===1&&re>=.4&&(y=Math.max(y,_n(c[E].dist,c[E+1].dist,.92)),q=Math.max(q,_n(c[E].y,c[E+1].y,.7)),K=Math.min(K,_n(c[E].pitch,c[E+1].pitch,.9))),{dist:y,y:q,pitch:K,yaw:_n(c[E].yaw,c[E+1].yaw,re)}}let _e=c[1].yaw;function Ue(j=!1){let E=Q(r);u.dist=E.dist,u.pitch=E.pitch,j&&(_e=E.yaw,u.yaw=_e);let re=r<.5?_n(m.position.y+.15,E.y,r/.5):E.y;f.set(0,re,0),h.invalidate()}function Ye(){let j=r;m.visible=j<1.5,m.scale.setScalar(j<1?1:_n(1,.4,gi((j-1)/.45,0,1))),b.visible=j<2.5;let E=j<.35?_n(.35,1,j/.35):gi(1-(j-2)/.45,.15,1);_.material.transparent=E<.99,_.material.opacity=E,U.visible=j>1.28&&j<3.4,U.traverse(R=>{if(!R.isMesh)return;let y=gi((j-1.28)/.22,0,1);R.material.transparent=y<.99,R.material.opacity=y,R.visible=y>.02}),L.visible=j>2.25;let re=gi((j-2.25)/.45,0,1);L.traverse(R=>{R.isMesh&&(R.material.transparent=re<.99,R.material.opacity=Math.max(.25,re))}),pe.material.opacity=pe.userData.ink*re,ge.visible=j>3.05;let de=gi((j-3.05)/.45,0,1);ge.traverse(R=>{if(!R.isMesh)return;R.material.transparent=de<.99;let y=R.position.y>26;R.material.opacity=Math.max(y?.55:.85,de)}),j>3.5&&(L.visible=!0,L.traverse(R=>{R.isMesh&&(R.material.transparent=!1,R.material.opacity=1)})),g.material.transparent=!0,g.visible=j>3.2,g.material.opacity=j>3.2?gi((j-3.2)/.5,.2,1):0}function Ke(j=!0){if(Ue(),Ye(),j){let E=gi(Math.round(r),0,Fi.length-1),re=Fi[E],de=Fi[Math.min(Fi.length-1,E+1)];yt.innerHTML=`<b>${re.name[0].toUpperCase()+re.name.slice(1)}</b>: <b>${Sd(re.W)}</b> \xB7 ${re.note}. ${E<Fi.length-1?`Pull out toward <span class="c-orange">${de.name}</span> (${Sd(de.W)}).`:"Site power is the utility figure, not a sum of dies."}`}h.invalidate()}let ut=t.controls(i);t.slider(ut,{label:"Zoom",name:"zoom",min:0,max:Fi.length-1,step:.01,value:r,color:n.heat,fmt:j=>Fi[gi(Math.round(j),0,Fi.length-1)].key,oninput:j=>{a=null,r=j,Ue(!0),Ye(),Ke()}});let yt=t.readout(i);return t.hint(i,"drag to turn \xB7 Zoom: die \u2192 building"),Ke(),h.ready(),!0}var Td=20,Ad=250;function Rd(i,e){let t=e.ui,n=t.C,s=te=>te<560,r=-4,a=!0,o=null,l=[],c=()=>a?Math.max(0,r+Ad/Td)**1.5/(Ad/Td)**1.5:0,h=mt(i,{ui:t,label:"A vacuum triode in three dimensions: electrons leave a hot cathode; the grid voltage lets them through to the plate or turns them back. Drag sideways to turn the tube.",height:te=>s(te)?Math.round(Math.max(300,te*.9)):Math.round(Math.min(400,te*.5)),radius:1.7,radiusY:2.05,yaw:.55,pitch:.22,target:new P(0,.95,0),fitPadY:1.32,fitPadX:1.08,fov:34,busy:()=>a||o&&!o.done,onShow(){o?.arm(),h&&h.invalidate()},step(te){o&&!o.done&&o.tick(te);let se=a?90*te:0;for(let ce=0;ce<se;ce++)l.length<140&&l.push({a:Math.random()*Math.PI*2,r:.08+Math.random()*.12,t:0,pass:Math.random()<c()/1.6,v:.55+Math.random()*.35});for(let ce of l)ce.t+=ce.v*te*(ce.t>.45&&!ce.pass?-1.15:1);for(let ce=l.length-1;ce>=0;ce--)(l[ce].t>1.05||l[ce].t<-.02)&&l.splice(ce,1);return C(),a}});if(!h)return!1;let{scene:d}=h;gt(d,{hemi:.42,keyI:1.85,fillI:.22,rimI:.75,sky:16769216,ground:4864040,keyPos:[4,5,5],fillPos:[-4,2,-2],envI:.42,glintI:.7,glintPos:[7,6,2]});let u=new be;d.add(u);let f=new k(new Ae(1.2,1.2,2.2,48,1,!0),di(12112096,{opacity:.07}));f.position.y=.95,u.add(f);let g=new k(new Je(1.2,36,18,0,Math.PI*2,0,Math.PI/2),di(12112096,{opacity:.08}));g.position.y=2.05,u.add(g);let x=new k(new Ae(1.25,1.35,.38,40),Ot(9070656,{brushAxis:"circ",metalness:.58,roughness:.28,brushStrength:1.4,clearcoat:.35,envMapIntensity:.4}));x.position.y=-.25,u.add(x),Vs(u,1.28,.045,-.05,Ot(13148256,{emissiveIntensity:.22,clearcoat:.4,envMapIntensity:.45})),Vs(u,1.18,.03,1.75,V(12635352,{roughness:.25,metalness:.7,clearcoat:.4,opacity:.75}));for(let te=0;te<10;te++){let se=te/10*Math.PI*2,ce=new k(new Ae(.055,.05,.42,10),Ot(13936736,{emissiveIntensity:.28,clearcoat:.5,brushStrength:1.2}));ce.position.set(Math.cos(se)*.72,-.58,Math.sin(se)*.72),u.add(ce);let Z=new k(new Je(.05,10,8),V(15253624,{roughness:.18,metalness:.95,clearcoat:.6}));Z.position.set(Math.cos(se)*.72,-.8,Math.sin(se)*.72),u.add(Z)}let m=ke(14711354,{emissive:14711354,emissiveIntensity:.6}),p=new k(new Ae(.14,.14,1,18),m);p.position.y=.5,u.add(p);let A=new be;u.add(A);let D=V(5935060,{roughness:.35,metalness:.7,emissive:3438800,emissiveIntensity:.18});for(let te=0;te<14;te++){let se=new k(new Pt(.5,.016,8,40),D);se.rotation.x=Math.PI/2,se.position.y=.18+te*.1,A.add(se)}for(let te of[-.5,.5]){let se=new k(new Ae(.018,.018,1.35,8),D);se.position.set(te,.7,0),A.add(se)}let M=Ot(14196816,{cleanHex:14197792,brushAxis:"circ",emissiveIntensity:.34,brushStrength:2.1,clearcoat:.6,clearcoatRoughness:.12,envMapIntensity:.7,side:Zt}),v=Ot(15253624,{cleanHex:14725168,emissive:12093488,emissiveIntensity:.28,clearcoat:.65,clearcoatRoughness:.1,brushStrength:1.9,envMapIntensity:.72}),b=new be;b.rotation.y=Math.PI,u.add(b);let I=new k(new Ae(1.05,1.05,1.35,48,1,!1,Math.PI*.12,Math.PI*1.76),M);I.position.y=1.25,b.add(I);let _=new k(new Ae(.94,.94,1.28,40,1,!0,Math.PI*.12,Math.PI*1.76),Ot(9070656,{metalness:.55,roughnessIntensity:.12,envMapIntensity:.4,brushStrength:.8}));_.position.y=1.25,b.add(_);for(let te of[Math.PI*.12,Math.PI*.12+Math.PI*1.76]){let se=new k(new ye(.07,1.32,.12),v);se.position.set(Math.cos(te)*1,1.25,Math.sin(te)*1),se.rotation.y=-te,b.add(se)}for(let[te,se]of[[1.9,1.15],[.6,1.12]]){let ce=new k(new Ae(se,se,.1,40,1,!1,Math.PI*.12,Math.PI*1.76),v);ce.position.y=te,b.add(ce)}let w=new k(new Ae(1.1,1.05,.12,40,1,!1,Math.PI*.12,Math.PI*1.76),v);w.position.y=1.95,b.add(w);for(let te of[Math.PI*.55,Math.PI*1,Math.PI*1.45]){let se=new k(jt(.05,1.18,.16,.018),v);se.position.set(Math.cos(te)*1.12,1.25,Math.sin(te)*1.12),se.rotation.y=-te,b.add(se)}let N=b,O=ke(15260872,{transparent:!0,opacity:.7});for(let te of[.12,1.85]){let se=new k(new Ae(.85,.85,.035,28),O);se.position.y=te,u.add(se)}let B=new k(new Je(.48,20,14,0,Math.PI*1.1,0,Math.PI*.55),V(13160664,{shininess:95,specular:16777215,opacity:.5}));B.position.set(.4,1.7,.25),u.add(B);let U=new k(new Pt(.06,.012,6,16),ke(16764006,{emissive:16755251,emissiveIntensity:.7}));U.position.y=.55,U.rotation.x=Math.PI/2,u.add(U);let S=new k(new Pt(.96,.02,8,40),ke(11059408,{transparent:!0,opacity:.35}));S.rotation.x=Math.PI/2,S.position.y=2,u.add(S);let F=new Dt({color:5914672,transparent:!0,opacity:.3});try{x.add(new Ft(new Vt(x.geometry,28),F.clone()))}catch{}u.traverse(te=>{if(!te.isMesh||!te.geometry||!te.material||te===x)return;let se=te.material;if(se.metalness>.4&&(se.emissiveIntensity||0)>.05)try{te.add(new Ft(new Vt(te.geometry,28),F.clone()))}catch{}});let z=new Je(.03,6,6),W=ke(3832020,{emissive:3832020,emissiveIntensity:.55}),H=[];for(let te=0;te<140;te++){let se=new k(z,W);se.visible=!1,u.add(se),H.push(se)}h.label('<span class="c-blue">grid</span>',()=>new P(.75,.85,0),"");function C(){m.emissiveIntensity=a?.55+.25*Math.sin(performance.now()/200):.02,m.color.setHex(a?14711354:6971480);for(let te=0;te<H.length;te++){let se=H[te],ce=l[te];if(!ce){se.visible=!1;continue}se.visible=!0;let Z=.15+ce.t*2,J=ce.r*(ce.t>.45&&!ce.pass?1.4:1);se.position.set(Math.cos(ce.a)*J,Z,Math.sin(ce.a)*J)}h.invalidate()}function G(){let te=c();X.innerHTML=a?te===0?`<span class="c-blue">Grid</span> <b>${String(r).replace("-","\u2212")} V</b> turns every electron back \u2014 tube off.`:`<span class="c-blue">Grid</span> <b>${String(r).replace("-","\u2212")} V</b> \xB7 plate current <b>${Math.round(te*100)}%</b> of 0 V.`:'Heater off: no electrons leave the <span class="c-orange">cathode</span>.',C()}let L=t.controls(i);t.slider(L,{label:"Grid",name:"vg",min:-20,max:2,step:.5,value:r,color:n.compute,fmt:te=>`${te} V`,oninput:te=>{r=te,G()}}),t.button(L,"Heater on / off",()=>{a=!a,G()},{name:"tr3-heat"});let X=t.readout(i);t.hint(i,'drag to turn \xB7 <span class="c-orange">cathode</span> \xB7 <span class="c-blue">grid</span> \xB7 plate \xB7 pull Grid negative to cut'),G();let ee=xt([{obj:x,delay:0,drop:.2},{obj:p,delay:.12,drop:.25},{obj:A,delay:.28,drop:.22},{obj:N,delay:.42,drop:.28},{obj:f,delay:.55,drop:.15}],{dur:1});return o=ee,ee.arm(),h.ready(),!0}var jx=(i,e,t)=>Math.max(e,Math.min(t,i)),Cd={rho:997,cp:4180};function pl(i,e,t,n,s,r,a,o){let l=new k(new ye(e,t,n),s);return l.position.set(r,a,o),i.add(l),l}function xi(i,e,t,n,s=.13){let r=new P().subVectors(t,e),a=r.length(),o=new k(new Ae(s,s,a,16),V(n,{roughness:.32,metalness:.65,emissive:n,emissiveIntensity:.18}));return o.position.copy(e).add(t).multiplyScalar(.5),o.quaternion.setFromUnitVectors(new P(0,1,0),r.clone().normalize()),i.add(o),o}function Id(i,e){let t=e.ui,n=t.C,s=X=>X<560,r=40.8,a=50,o=[],l=()=>a/6e4*Cd.rho,c=()=>r*1e3/(l()*Cd.cp),h,d=null,u=[],f=mt(i,{ui:t,label:"A cold plate over a hot die with inlet and outlet pipes. Water carries the heat; outlet rise follows \u0394T = P / (\u1E41 c). Drag sideways to turn.",height:X=>s(X)?Math.round(Math.max(300,X*.9)):Math.round(Math.min(400,X*.5)),radius:3.35,radiusY:1.95,yaw:-.42,pitch:.48,target:new P(0,.42,0),fitPad:1.28,busy:()=>!0,onShow(){d?.arm(),f&&f.invalidate()},step(X){d&&d.tick(X);let ee=.28+a*.007,te=5,se=(7+a*.18)*X;for(let J=0;J<se;J++)o.length<60&&o.push({u:-.04-Math.random()*.06,lane:Math.floor(Math.random()*te)});for(let J of o)J.u+=ee*X*(.92+J.lane%3*.04);for(let J=o.length-1;J>=0;J--)o[J].u>1.08&&o.splice(J,1);let ce=jx(c()/25,0,1),Z=J=>-.48+J*.24;for(let J=0;J<u.length;J++){let pe=u[J],ge=o[J];if(!ge){pe.visible=!1;continue}pe.visible=!0,pe.position.set(-1.05+ge.u*2.1,.56,Z(ge.lane));let xe=Math.max(0,(ge.u-.4)/.55)*ce;pe.material.color.setRGB(.18+.75*xe,.88-.45*xe,.82-.72*xe),pe.material.opacity=1;let $e=.9+.18*Math.sin(ge.u*8+ge.lane);pe.scale.setScalar($e)}return h&&(h.material.emissiveIntensity=.45+.35*Math.min(1,r/100)+.1*Math.sin(performance.now()/160)),!0}});if(!f)return!1;let{scene:g}=f;gt(g,{hemi:.88,keyI:1.4,fillI:.35,rimI:.5,envI:.9,glintI:.45});let x=new be;g.add(x);let m=He(4.6,.1,3,fi(14474456),.04);m.position.set(0,0,0),x.add(m),nt(x,4.5,2.9,.07,V(11842736),{t:.035,railH:.05,overhang:.03});for(let X=-4;X<=4;X++){let ee=new k(new ye(4,.012,.035),V(12886112,{roughness:.4}));ee.position.set(0,.06,X*.28),x.add(ee)}let p=new be;x.add(p),h=He(1.5,.16,1.5,ke(14711354,{emissive:16736288,emissiveIntensity:.7,shininess:50}),.045),h.position.set(0,.18,.25),p.add(h),nt(p,1.5,1.5,.25,V(15769696),{t:.025,railH:.035,overhang:.015});let A=new k(new Je(.95,20,16),ke(16736288,{opacity:.1,emissive:16728080,emissiveIntensity:.4,shininess:5}));A.position.set(0,.22,.25),p.add(A);for(let X=-2;X<=2;X++)for(let ee=-2;ee<=2;ee++){if(Math.abs(X)+Math.abs(ee)<1)continue;let te=new k(new Ae(.04,.04,.02,8),V(14205040));te.position.set(X*.22,.25,.15+ee*.22),p.add(te)}let D=He(1.55,.04,1.55,ke(8947840),.02);D.position.set(0,.28,.1),x.add(D);let M=new be;x.add(M);let v=V(12109008,{roughness:.28,metalness:.85,brushStrength:1.1}),b=V(10136504,{roughness:.35}),I=He(2.6,.1,2,v,.04);I.position.set(0,.36,0),M.add(I);let _=He(.14,.42,2,v,.03);_.position.set(-1.25,.52,0),M.add(_);let w=He(.14,.42,2,v,.03);w.position.set(1.25,.52,0),M.add(w);let N=He(2.6,.42,.14,v,.03);N.position.set(0,.52,-.95),M.add(N);let O=He(2.4,.08,.12,v,.02);O.position.set(0,.38,.95),M.add(O);for(let[X,ee,te]of[[-1.32,.04,2.05],[1.32,.04,2.05]]){let se=new k(new ye(ee,.06,te),V(10531008));se.position.set(X,.74,0),M.add(se)}for(let[X,ee,te]of[[-1.02,2.6,.04]]){let se=new k(new ye(ee,.06,te),V(10531008));se.position.set(0,.74,X),M.add(se)}let B=[-.48,-.24,0,.24,.48];for(let X=0;X<B.length-1;X++){let ee=(B[X]+B[X+1])/2;pl(M,2.15,.16,.05,Ot(13138496,{metalness:.6,emissiveIntensity:.16,brushStrength:1,envMapIntensity:.35}),0,.5,ee)}for(let X of B)pl(M,2.1,.035,.18,Ot(13666896,{metalness:.55,emissiveIntensity:.18,brushStrength:1.2,envMapIntensity:.4}),0,.42,X);{let X=He(2.35,.03,.28,V(11582664,{roughness:.3,opacity:.35}),.015);X.position.set(0,.74,-.7),M.add(X)}pl(M,.18,.28,.9,V(9083560),-1.05,.55,0),pl(M,.18,.28,.9,V(9083560),1.05,.55,0);for(let[X,ee]of[[-1.15,-.85],[1.15,-.85],[-1.15,.85],[1.15,.85]]){let te=new k(new Ae(.05,.05,.1,10),V(6975608));te.position.set(X,.78,ee),M.add(te)}let U=new be;x.add(U),xi(U,new P(-1.95,.62,.3),new P(-1.15,.62,.3),1940114,.17),xi(U,new P(-1.95,.62,.3),new P(-1.95,.62,-.85),1940114,.17),xi(U,new P(-1.95,.62,-.85),new P(-1.95,.2,-.85),1940114,.17),xi(U,new P(1.15,.62,.3),new P(1.95,.62,.3),14513188,.17),xi(U,new P(1.95,.62,.3),new P(1.95,.62,-.85),14513188,.17),xi(U,new P(1.95,.62,-.85),new P(1.95,.2,-.85),14513188,.17),xi(U,new P(-1,.34,1.15),new P(1,.34,1.15),2795684,.1),xi(U,new P(-1,.34,1.15),new P(-1,.34,.65),2795684,.1),xi(U,new P(1,.34,1.15),new P(1,.34,.65),2795684,.1);for(let X of[-1.45,-1.75,1.45,1.75]){let ee=new k(new Pt(.18,.03,8,16),V(9080984));ee.rotation.y=Math.PI/2,ee.position.set(X,.62,.3),U.add(ee)}let S=new k(new Je(.2,14,14),V(1940114,{roughness:.3,metalness:.7,emissive:1940114,emissiveIntensity:.25}));S.position.set(-1.15,.62,.3),U.add(S);let F=new k(new Je(.2,14,14),V(14513188,{roughness:.3,metalness:.7,emissive:14513188,emissiveIntensity:.25}));F.position.set(1.15,.62,.3),U.add(F);let z=new Dt({color:2829098,transparent:!0,opacity:.2});x.traverse(X=>{if(!X.isMesh||!X.geometry)return;let ee=X.geometry.type;if(!(ee==="SphereGeometry"||ee==="CylinderGeometry"))try{X.add(new Ft(new Vt(X.geometry,28),z.clone()))}catch{}});let W=new Je(.055,12,12);u=[];for(let X=0;X<80;X++){let ee=new k(W,new nn({color:4116420,transparent:!1,opacity:1,depthWrite:!0}));ee.visible=!1,x.add(ee),u.push(ee)}for(let X=0;X<5;X++)for(let ee=0;ee<4;ee++)o.push({u:(ee+.35)/4.5+X%2*.05,lane:X});f.label('<span class="c-cyan">in</span>',()=>new P(-2,1.05,.35),""),f.label('<span class="c-orange">out</span>',()=>new P(2,1.05,.35),"");let H=t.controls(i),C=t.readout(i);function G(){let X=c();C.innerHTML=`Heat load <b>${r>=1?r.toFixed(1)+" kW":Math.round(r*1e3)+" W"}</b> \xB7 flow <b>${a} L/min</b> \u2192 outlet \u0394T <b>${X<10?X.toFixed(1):Math.round(X)} \xB0C</b> (model P = \u1E41 c \u0394T).`,f.invalidate()}t.slider(H,{label:"Heat load",name:"kw",min:.7,max:120,step:.1,value:r,color:n.heat,fmt:X=>X>=1?`${+X.toPrecision(3)} kW`:`${Math.round(X*1e3)} W`,oninput:X=>{r=X,G()}}),t.slider(H,{label:"Flow",name:"lpm",min:5,max:120,step:1,value:a,color:n.cyan,fmt:X=>`${X} L/min`,oninput:X=>{a=X,G()}}),t.hint(i,'drag to turn \xB7 <span class="c-orange">die</span> glow under open plate \xB7 raise heat or slow the flow'),G();let L=xt([{obj:p,delay:0,drop:.18},{obj:M,delay:.12,drop:.28}],{dur:.85});return d=L,L.arm(),f.view.dist<7&&(f.view.dist=7),f.ready(),!0}function Nt(i,e={}){return e.metal?V(i,e):ke(i,{shininess:e.shininess??36,specular:e.specular??5592405,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,opacity:e.opacity??1})}function ti(i,e,t,n,s,r,a,o){let l=new k(new ye(e,t,n,1,1,1),s);return l.position.set(r,a,o),i.add(l),l}function Pd(i,e){let t=e.ui,n=t.C,s=H=>H<560,r=10,a=.42,o=null,l=null,c=[],h=[],d=mt(i,{ui:t,label:"A GPU package in three dimensions: logic die, HBM stacks beside it, NVLink pads at the edge. A pulse follows the path a number travels. Drag sideways to turn.",height:H=>s(H)?Math.round(Math.max(300,H*.9)):Math.round(Math.min(420,H*.52)),radius:2.85,radiusY:1.85,yaw:-.72,pitch:.42,target:new P(0,.35,0),fitPad:1.2,fov:30,busy:()=>!0,onShow(){o?.arm(),d&&d.invalidate()},step(H){try{if(o&&o.tick(H),!l)return!0;let C=Number(H)||.016;a=(a+C*.32)%1,Number.isFinite(a)||(a=0);let G=a,L=h;if(!L||L.length<2)return!0;let X=L.length-1,ee=G*X,te=Math.max(0,Math.min(X-1,Math.floor(ee))),se=ee-te,ce=L[te],Z=L[te+1];if(!ce||!Z)return!0;l.position.set(ce.x+(Z.x-ce.x)*se,ce.y+(Z.y-ce.y)*se,ce.z+(Z.z-ce.z)*se),l.material.emissiveIntensity=.45+.35*Math.sin(a*Math.PI*2);let J=te===2;for(let pe=0;pe<c.length;pe++)c[pe].emissiveIntensity=J?.22:.06}catch{}return!0}});if(!d)return!1;let{scene:u}=d;gt(u,{hemi:1.45,keyI:1.25,fillI:.5,rimI:.35});let f=new be;u.add(f);let g=He(4.6,.14,4,Nt(14210248),.06);g.position.set(0,0,0),f.add(g);let x=He(4.4,.07,3.8,V(13684942,{roughness:.4,metalness:.55}),.05);x.position.set(0,.1,0),f.add(x);let m=He(4.5,.04,3.9,V(12632254,{roughness:.35}),.04);m.position.set(0,.15,0),f.add(m),nt(f,4.5,3.9,.17,V(11842736),{t:.035,railH:.05,overhang:.03});let p=new be;f.add(p);let A=He(2,.16,2,Nt(5935060,{emissive:3438800,emissiveIntensity:.14}),.045);A.position.set(0,.3,0),p.add(A);let D=He(1.92,.04,1.92,Nt(6988e3),.03);D.position.set(0,.4,0),p.add(D);for(let H=-3;H<=3;H++)for(let C=-3;C<=3;C++)Math.abs(H)+Math.abs(C)>5||ti(p,.18,.025,.18,Nt(4882372),H*.24,.43,C*.24);let M=new k(new Je(.12,18,18),Nt(15255626,{emissive:15255626,emissiveIntensity:.55}));M.position.set(0,.55,0),f.add(M);let v=new be;f.add(v),ti(v,1.6,.09,.45,Nt(10276714,{emissive:7317562,emissiveIntensity:.1}),0,.44,.7),nt(v,1.6,.45,.5,V(7909448),{t:.02,railH:.035,overhang:.015});for(let H=-3;H<=3;H++){let C=new k(new ye(.16,.04,.28),Nt(3115618));C.position.set(H*.22,.5,.7),v.add(C)}nt(f,2,2,.42,V(4882372),{t:.035,railH:.05,overhang:.025});let b=Nt(14205040,{emissive:11575360,emissiveIntensity:.12,metal:!0});for(let H=-4;H<=4;H++)for(let C=-4;C<=4;C++){if(Math.abs(H)+Math.abs(C)<2||(Math.abs(H)+Math.abs(C))%2===0)continue;let G=new k(new Ae(.035,.035,.025,8),b);G.position.set(H*.18,.455,C*.18),f.add(G)}function I(H){let C=new be;C.position.set(H,.22,0),f.add(C);let G=12;for(let L=0;L<G;L++){let X=L%3===0?8962121:L%3===1?9750616:10670184,ee=Nt(X,{emissive:1927752,emissiveIntensity:.06});c.push(ee);let te=new k(new ye(.58,.055,1.55),ee);if(te.position.y=L*.068,C.add(te),L<G-1){let se=new k(new ye(.54,.012,1.48),Nt(13686992));if(se.position.y=L*.068+.034,C.add(se),L%2===0){let ce=new k(new ye(.5,.008,1.4),V(12886112));ce.position.y=L*.068+.04,C.add(ce)}}}ti(C,.52,.04,1.45,Nt(8947840),0,-.06,0),ti(C,.54,.03,1.48,Nt(3844210),0,G*.068,0),nt(C,.58,1.55,G*.068+.02,V(7317562),{t:.025,railH:.04,overhang:.02}),ti(C,.02,G*.068,1.52,Nt(7317562),.3,G*.034,0),ti(C,.02,G*.068,1.52,Nt(7317562),-.3,G*.034,0);for(let L=-1;L<=1;L++)for(let X=-2;X<=2;X++){let ee=new k(new Je(.03,8,8),V(14205040));ee.position.set(L*.15,G*.068+.04,X*.22),C.add(ee)}return C}let _=I(-1.55),w=I(1.55),N=new be;f.add(N),ti(N,3.4,.05,.58,Nt(5916792),0,.1,1.72),nt(N,3.4,.58,.14,V(6969488),{t:.03,railH:.045,overhang:.02});for(let H=-7;H<=7;H++)ti(N,.16,.09,.4,Nt(9071316,{emissive:6965940,emissiveIntensity:.16}),H*.22,.16,1.72),ti(N,.13,.03,.08,Nt(14205040,{emissive:11575360,emissiveIntensity:.2}),H*.22,.22,1.9);for(let H of[-1.55,1.55])for(let C=0;C<12;C++){let G=new k(new Ae(.022,.022,.7,8),V(12886112));G.position.set(H+C%3*.1-.1,.5,-.55+Math.floor(C/3)*.28),f.add(G)}let O=Nt(12886112,{emissive:10780736,emissiveIntensity:.08});for(let H=-9;H<=9;H++)for(let C=-7;C<=7;C++){if((Math.abs(H)+Math.abs(C))%2===1||Math.abs(H)<2&&Math.abs(C)<2)continue;let G=new k(new Je(.048,10,10),O);G.position.set(H*.28,-.1,C*.28),f.add(G)}for(let H=0;H<40;H++){let C=H/40*Math.PI*2,G=2.2,L=new k(new Ae(.025,.025,.09,8),Nt(12886112));L.position.set(Math.cos(C)*G*.95,.05,Math.sin(C)*G*.85),f.add(L)}for(let H=-4;H<=4;H++)ti(f,.04,.02,3.2,Nt(11055296),H*.45,.17,0);let B=new Dt({color:2829098,transparent:!0,opacity:.12});f.traverse(H=>{if(!(!H.isMesh||!H.geometry||H.geometry.type==="SphereGeometry"||H.geometry.type==="CylinderGeometry"))try{H.add(new Ft(new Vt(H.geometry,28),B.clone()))}catch{}}),l=new k(new Je(.09,14,14),Nt(14711354,{emissive:14711354,emissiveIntensity:.6})),f.add(l),h.push(new P(0,.55,0),new P(0,.42,.55),new P(1.55,.55,0),new P(0,.12,1.55));let U=Nt(14205040,{emissive:11575360,emissiveIntensity:.15});for(let H=-3;H<=3;H++)for(let C=-2;C<=2;C++){if(Math.abs(H)+Math.abs(C)<1)continue;let G=new k(new Ae(.04,.04,.03,8),U);G.position.set(H*.22,.72,C*.22),f.add(G)}d.label('<span class="c-green">HBM</span>',()=>new P(1.55,1.1,0),""),d.label('<span class="c-violet">NVLink</span>',()=>new P(0,.38,2.05),"",!0);let S=t.controls(i),F=t.readout(i);function z(){let H=4.6000000000000005,C=640/r,G=H+C;F.innerHTML=`Path: register \u2192 <b class="c-green">SRAM (5 pJ)</b> \u2192 <b class="c-green">HBM/DRAM (640 pJ)</b> \u2192 NVLink (900 GB/s). Horowitz 45 nm via Han et al. Reuse <b>${r}\xD7</b> \u2192 ~<b>${+(H+C).toPrecision(3)} pJ</b> per multiply-add; <b>${Math.round(C/G*100)}%</b> is moving data.`,d.invalidate()}t.slider(S,{label:"Reuse",name:"reuse",min:1,max:1e3,step:1,value:r,color:n.memory||n.cyan||"#2f8a62",fmt:H=>`${H}\xD7`,oninput:H=>{r=Math.round(H),z()}}),t.hint(i,"drag to turn \xB7 raise reuse to cut memory\u2019s share of each multiply-add"),z();let W=xt([{obj:p,delay:0,drop:.28},{obj:v,delay:.12,drop:.22},{obj:_,delay:.22,drop:.42},{obj:w,delay:.32,drop:.42},{obj:N,delay:.48,drop:.3,fromScale:.45}],{dur:.95});return f.userData.reveal=W,o=W,W.arm(),d.view.dist<6.3&&(d.view.dist=6.3),d.ready(),!0}var Qx=(i,e,t)=>Math.max(e,Math.min(t,i)),Ld=.02585,ey=1.2,vn=.7,ty=.35,qr=i=>Math.log1p(Math.exp((i-ty)/(2*ey*Ld)))**2,ml=(i,e)=>qr(i)*(1-Math.exp(-Math.max(0,e)/Ld)),ny=ml(vn,vn);function iy(i){let e=0,t=vn;for(let s=0;s<40;s++){let r=(e+t)/2;ml(i,r)-ml(vn-i,vn-r)<0?e=r:t=r}let n=(e+t)/2;return{vo:n,i:ml(i,n)/ny,gn:qr(i)/qr(vn),gp:qr(vn-i)/qr(vn)}}function Dd(i,e){let t=e.ui,n=t.C,s=C=>C<560,r=.32,a=null,o,l,c,h,d=mt(i,{ui:t,label:"A CMOS inverter in three dimensions: a p-type transistor above an n-type, sharing the output node. Drag to turn; Input voltage flips the output.",height:C=>s(C)?Math.round(Math.max(300,C*.9)):Math.round(Math.min(600,C*.8)),radius:1.7,radiusY:1.6,yaw:.78,pitch:.38,target:new P(0,.95,0),fitPadY:1.08,fitPadX:.95,fov:32,autoFit:!0,busy:()=>!!(a&&!a.done),onShow(){a?.arm(),d&&d.invalidate()},step(C){return a&&!a.done?(a.tick(C),!0):!1}});if(!d)return!1;let{scene:u}=d;gt(u,{hemi:.55,keyI:1.55,fillI:.25,rimI:.6,envI:.6,glintI:.5});let f=new be;u.add(f);let g=new be;f.add(g),g.add(He(2.45,.2,1.35,V(13158596,{roughness:.42,metalness:.4,brush:!1}),.05)),g.children[0].position.set(0,-.28,0),nt(g,2.4,1.3,-.16,V(13158596,{roughness:.4}),{t:.03,railH:.05,overhang:.025});let x=new be;f.add(x);let m=He(2.25,.14,.72,V(12095552,{roughness:.28,metalness:.85,emissive:8937504,emissiveIntensity:.1,clearcoat:.45,clearcoatRoughness:.15}),.045);m.position.set(0,1.95,0),x.add(m);let p=He(2.25,.14,.72,V(6975608,{roughness:.4,metalness:.7}),.045);p.position.set(0,-.05,0),x.add(p);let A=new be;f.add(A),o=He(1.15,.38,.95,V(4881100,{roughness:.28,metalness:.78,emissive:2775724,emissiveIntensity:.1,brushStrength:1.2,clearcoat:.35}),.06),o.position.set(0,1.45,0),A.add(o),nt(A,1.1,.9,1.66,V(9090288,{roughness:.32}),{t:.028,railH:.045,overhang:.018});let D=He(.22,.58,1,V(9090288,{roughness:.3,metalness:.65}),.04);D.position.set(-.72,1.45,0),A.add(D);for(let C of[-.28,.28]){let G=new k(new Ae(.07,.07,.035,12),V(12886112,{roughness:.28,metalness:.85}));G.position.set(.28,1.68,C),A.add(G)}let M=new be;f.add(M),l=He(1.15,.38,.95,V(3832e3,{roughness:.28,metalness:.78,emissive:1726624,emissiveIntensity:.1,brushStrength:1.2,clearcoat:.35}),.06),l.position.set(0,.4,0),M.add(l),nt(M,1.1,.9,.61,V(8037600,{roughness:.32}),{t:.028,railH:.045,overhang:.018});let v=He(.22,.58,1,V(9090288,{roughness:.3,metalness:.65}),.04);v.position.set(-.72,.4,0),M.add(v);for(let C of[-.28,.28]){let G=new k(new Ae(.07,.07,.035,12),V(12886112,{roughness:.28,metalness:.85}));G.position.set(.28,.63,C),M.add(G)}let b=new be;f.add(b);let I=V(14212324,{roughness:.4,metalness:.2,opacity:.55,brush:!1}),_=V(14736596,{roughness:.5,metalness:.25});for(let C of[1.45,.4]){let G=He(.07,.42,.88,I,.02);G.position.set(-.56,C,0),b.add(G);for(let L of[-1,1]){let X=He(.13,.4,.11,_,.025);X.position.set(-.5,C,L*.44),b.add(X)}}let w=new be;f.add(w);let N=V(12101752,{roughness:.3,metalness:.8,emissive:11044952,emissiveIntensity:.08});for(let[C,G,L]of[[.55,1.95,.25],[.55,.92,.25],[.55,-.05,.25]]){let X=new k(new Ae(.065,.065,.22,12),N);X.position.set(C,G,L),w.add(X);let ee=new k(new Ae(.11,.11,.045,12),N);ee.position.set(C,G+.11,L),w.add(ee)}c=new k(new Je(.17,18,18),V(15255626,{roughness:.28,metalness:.7,emissive:15255626,emissiveIntensity:.4})),c.position.set(0,.92,0),w.add(c);let O=V(11580604,{roughness:.35,metalness:.75});for(let[C,G]of[[.38,1.72],[.52,.92],[.32,.18]]){let L=new k(new Ae(.085,.085,C,14),O);L.position.set(0,G,0),w.add(L)}let B=V(4882372,{roughness:.32,metalness:.65,emissive:2777e3,emissiveIntensity:.18}),U=new k(new Ae(.045,.045,1.2,12),B);U.position.set(-.72,.92,0),w.add(U);let S=new k(new Je(.11,14,14),B);S.position.set(-.72,.92,.58),w.add(S),h=new k(new Xi(.11,1.4,6,12),ke(14711354,{emissive:14711354,emissiveIntensity:.5,opacity:0})),h.position.set(0,.95,0),f.add(h),d.label('<span class="c-yellow">out</span>',()=>new P(.5,.92,.4),"");let F=t.controls(i),z=t.readout(i);function W(){let{vo:C,i:G,gn:L,gp:X}=iy(r);o?.material&&(o.material.emissiveIntensity=.06+.4*X),l?.material&&(l.material.emissiveIntensity=.06+.4*L),o.scale.set(1,.88+.22*X,1),l.scale.set(1,.88+.22*L,1),c.material.emissiveIntensity=.2+.55*(C/vn),c.material.color.setHex(C>vn/2?15255626:9080984);let ee=Qx(1-Math.abs(r-vn/2)/(vn/2),0,1),te=.05+.55*ee*Math.min(1,G*8);h.visible=te>.08,h.material.opacity=te,h.material.emissiveIntensity=.2+.7*ee,h.material.transparent=!0;let se=Math.floor(Math.log10(Math.max(G,1e-12))),ce=G>=.01?`${Math.round(G*100)}%`:`${(G/10**se).toFixed(1)}\xD710<sup>${se}</sup>`;z.innerHTML=`<span class="c-blue">in</span> <b>${r.toFixed(2)} V</b> \u2192 <span class="c-yellow">out</span> <b>${C.toFixed(2)} V</b> \xB7 <span class="c-blue">pMOS</span>/<span class="c-blue">nMOS</span> current <b class="c-orange">${ce}</b>${ee>.4?" \xB7 both open":""}`,d.invalidate()}t.slider(F,{label:"Input",name:"vin",min:0,max:vn,step:.01,value:r,color:n.compute,fmt:C=>`${C.toFixed(2)} V`,oninput:C=>{r=C,W()}}),t.hint(i,'drag to turn \xB7 <span class="c-blue">pMOS</span> above \xB7 <span class="c-blue">nMOS</span> below \xB7 slide Input through the middle'),W();let H=xt([{obj:g,delay:0,drop:.2},{obj:x,delay:.08,drop:.22},{obj:A,delay:.18,drop:.28},{obj:M,delay:.28,drop:.28},{obj:b,delay:.38,drop:.15},{obj:w,delay:.48,drop:.2}],{dur:.9});return a=H,H.arm(),d.view.dist=Math.max(d.view.dist,7.4),d.ready(),!0}var St=4,ts=3*St-2,sy=1.05,ry=[[1,2,0,1],[0,1,1,2],[2,0,1,1],[1,1,0,2]],ay=[[1,0,2,1],[2,1,0,1],[0,2,1,0],[1,1,1,2]];function Nd(i,e={}){return ke(i,e)}function Ud(i,e){let t=e.ui,n=C=>C<560,s=St+.55,r=!0,a=.4,o=null,l=mt(i,{ui:t,label:"A four-by-four systolic array in three dimensions. Inputs march along rows, weights down columns; each cell multiplies the pair that meet and keeps a running total.",height:C=>n(C)?Math.round(Math.max(340,C*.95)):Math.round(Math.min(460,C*.55)),radius:3.2,radiusY:2.4,yaw:-.55,pitch:.48,target:new P(1.35,.35,1.35),fitPad:1.12,fov:30,busy:()=>r||o&&!o.done,onShow(){o?.arm(),l&&l.invalidate()},step(C){return o&&o.tick(C),!r&&!(o&&!o.done)?!1:a>0?(a-=C,F(),!0):(s=Math.min(ts+.999,s+C*sy),s>=ts+.999&&(r=!1,s=ts),F(),r)}});if(!l)return!1;gt(l.scene,{hemi:1.4,keyI:1.15,fillI:.45,rimI:.35});let c=new be;l.scene.add(c);let h=.95,d=ke(14869214,{shininess:30,specular:5592405}),u=V(13158596,{shininess:70}),f=V(11842736,{shininess:55}),g=V(12886112),x=[],m=new Be(15319375),p=new Be(14977104),A=new Be;function D(C){let G=document.createElement("canvas");G.width=128,G.height=128;let L=G.getContext("2d");L.clearRect(0,0,128,128),L.font="700 56px ui-sans-serif, system-ui, sans-serif",L.textAlign="center",L.textBaseline="middle",L.fillStyle="#1a1a18",L.fillText(C,64,68);let X=new En(G);X.colorSpace=kt;let ee=new nn({map:X,transparent:!0,depthWrite:!1}),te=new k(new Bn(.5,.5),ee);return te.rotation.x=-Math.PI/2,te.userData.canvas=G,te.userData.ctx=L,te.userData.tex=X,te}for(let C=0;C<St;C++)for(let G=0;G<St;G++){let L=new be,X=He(.7,.28,.7,d.clone(),.05);L.add(X);let ee=He(.74,.035,.74,u,.02);ee.position.y=.15,L.add(ee);for(let ce of[-1,1])for(let Z=0;Z<3;Z++){let J=new k(new ye(.03,.14,.12),f);J.position.set(ce*.36,.02,-.18+Z*.18),L.add(J)}for(let ce of[-1,1])for(let Z=0;Z<3;Z++){let J=new k(new ye(.12,.14,.03),f);J.position.set(-.18+Z*.18,.02,ce*.36),L.add(J)}for(let ce=0;ce<8;ce++){let Z=ce/8*Math.PI*2,J=new k(new Ae(.028,.028,.035,8),g);J.position.set(Math.cos(Z)*.28,.16,Math.sin(Z)*.28),L.add(J)}let te=new k(new Je(.045,10,10),ke(4116420,{emissive:1940114,emissiveIntensity:.1}));te.position.set(.22,.2,-.22),L.add(te);let se=D("0");se.position.y=.2,L.add(se),L.position.set(G*h,0,C*h),c.add(L),x.push({g:L,body:X,i:C,j:G,mat:X.material,glyph:se,led:te})}let M=St*h+.7,v=St*h+.7,b=new be;b.position.set((St-1)*h/2,-.2,(St-1)*h/2),c.add(b);let I=new k(jt(M,.1,v,.04),fi(14474456));b.add(I),nt(b,M-.08,v-.08,.07,V(11842736),{t:.035,railH:.05,overhang:.03}),dl(b,M-.12,.03,v-.12,V(13158596),.09);for(let C=0;C<St;C++){let G=new k(new ye(St*h+.3,.015,.05),V(8962121,{shininess:60}));G.position.set((St-1)*h/2,-.13,C*h),c.add(G);let L=new k(new ye(.05,.015,St*h+.3),V(5162176,{shininess:60}));L.position.set(C*h,-.125,(St-1)*h/2),c.add(L)}let _=xt([{obj:b,delay:0,drop:.18,fromScale:.7}].concat(x.map((C,G)=>({obj:C.g,delay:.12+G*.04,drop:.32,fromScale:.35}))),{dur:.75});o=_,_.arm();let w=Nd(8962121,{emissive:5937706,emissiveIntensity:.3}),N=Nd(5950401,{emissive:2795684,emissiveIntensity:.3}),O=[],B=[];for(let C=0;C<St;C++)for(let G=0;G<St;G++){let L=new k(new Je(.12,12,12),w);L.visible=!1,c.add(L),O.push({mesh:L,i:C,k:G})}for(let C=0;C<St;C++)for(let G=0;G<St;G++){let L=new k(new Je(.12,12,12),N);L.visible=!1,c.add(L),B.push({mesh:L,j:C,k:G})}let U=new Dt({color:2829098,transparent:!0,opacity:.1});c.traverse(C=>{if(!(!C.isMesh||!C.geometry||C.geometry.type==="SphereGeometry"||C.geometry.type==="CylinderGeometry"))try{C.add(new Ft(ul(C.geometry,28),U.clone()))}catch{}}),l.label('<span class="c-green">A \u2192</span>',()=>new P(-1.15,.55,(St-1)*h/2),""),l.label('<span class="c-cyan">B \u2193</span>',()=>new P((St-1)*h/2,.55,-1.15),"");function S(C,G,L){let X=0;for(let ee=0;ee<St;ee++)ee+C+G<=L&&(X+=ry[C][ee]*ay[ee][G]);return X}function F(){let C=Math.floor(s),G=s-C,L=(te,se)=>G<=te?0:G>=se?1:(ce=>ce*ce*(3-2*ce))((G-te)/(se-te)),X=C+L(.35,.7),ee=C+L(.7,1);for(let{body:te,i:se,j:ce,glyph:Z,led:J}of x){let pe=te.material,ge=C-se-ce,xe=ge>=0&&ge<St,$e=C>=se+ce+St-1,ot=S(se,ce,C),et=S(se,ce,1e9)||1,Q=Math.max(0,Math.min(1,ot/et));if(A.setHex(14869214).lerp(m,Math.min(1,Q*1.6)).lerp(p,$e?1:Math.max(0,Q-.4)/.6*.7),pe.color.copy(xe?m:A),pe.emissive.copy(xe?m:A),pe.emissiveIntensity=xe?.28:Q>0?.12:0,te.scale.y=xe?1.15:1,J&&(J.material.emissiveIntensity=xe?.7:$e?.25:.08,J.material.color.setHex(xe?15319375:$e?14977104:13158596)),Z){let _e=Z.userData.ctx,Ue=Z.userData.tex;_e.clearRect(0,0,128,128),_e.font="700 56px ui-sans-serif, system-ui, sans-serif",_e.textAlign="center",_e.textBaseline="middle",_e.fillStyle=$e?"#ffffff":ot?"#2a2622":"#9aa0a8",_e.fillText(String(ot),64,68),Ue.needsUpdate=!0}}for(let{mesh:te,i:se,k:ce}of O){let Z=X-ce-se,J=Z>-1.2&&Z<St+.2;te.visible=J,J&&te.position.set(Z*h,.35,se*h)}for(let{mesh:te,j:se,k:ce}of B){let Z=ee-ce-se,J=Z>-1.2&&Z<St+.2;te.visible=J,J&&te.position.set(se*h,.35,Z*h)}H(),l.invalidate()}let z=t.controls(i),W=t.readout(i);function H(){let C=Math.min(Math.floor(s),ts),G=0;for(let L=0;L<St;L++)for(let X=0;X<St;X++){let ee=C-L-X;ee>=0&&ee<St&&G++}W.innerHTML=C>=ts?`Done in <b>${ts}</b> ticks: <b class="c-blue">64</b> multiply-adds from <b>32</b> numbers, each reused four times.`:`Tick <b>${C}</b>: <b class="c-blue">${G}</b> of 16 cells multiplying \u2014 no cell goes back to memory.`}return t.button(z,"Play",()=>{s=0,a=.25,r=!0,F(),l.kick()},{kind:"primary",name:"sy3-play"}),t.button(z,"Next tick",()=>{r=!1,s=(Math.floor(s)+1)%(ts+1),F()},{name:"sy3-step"}),t.hint(i,'mid-wave \xB7 <span class="c-green">inputs</span> and <span class="c-cyan">weights</span> meet; sums warm to <span class="c-orange">orange</span>'),F(),l.view.dist<6.2&&(l.view.dist=6.2),l.ready(),!0}function ns(i,e={}){return ke(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function Fd(i,e){let t=new be;t.position.x=e,i.add(t),t.add(He(2.2,.18,1.6,V(14211286,{roughness:.45,metalness:.4}),.05)),nt(t,2.15,1.55,.1,V(12632254),{t:.03,railH:.05,overhang:.025});let n=He(2,.12,1.4,V(12632254,{roughness:.4}),.04);n.position.set(0,.14,0),t.add(n);let s=He(.95,.14,.85,V(5219046,{emissive:2781104,emissiveIntensity:.12,roughness:.45,metalness:.3}),.035);s.position.set(0,.28,0),t.add(s),nt(t,.95,.85,.36,V(4163272),{t:.025,railH:.04,overhang:.02});for(let l=-2;l<=2;l++)for(let c=-1;c<=1;c++){if(Math.abs(l)+Math.abs(c)<1)continue;let h=new k(new Ae(.03,.03,.02,8),V(14205040));h.position.set(l*.14,.37,c*.16),t.add(h)}let r=ns(4168260,{emissive:2783796,emissiveIntensity:.15});for(let l of[-.85,.85])for(let c=0;c<8;c++){let h=c%2?3115602:4168260,d=new k(jt(.28,.048,.55,.012),ns(h,{emissive:2783796,emissiveIntensity:.12}));if(d.position.set(l,.2+c*.055,0),t.add(d),c<7){let u=new k(new ye(.26,.01,.5),ns(13160648));u.position.set(l,.228+c*.055,0),t.add(u)}}let a=new k(jt(1.4,.06,.28,.02),ns(9071288,{emissive:6965912,emissiveIntensity:.2}));a.position.set(0,.12,.75),t.add(a);let o=ns(12886112);for(let l=-3;l<=3;l++)for(let c=-2;c<=2;c++){let h=new k(new Je(.04,8,8),o);h.position.set(l*.22,-.12,c*.2),t.add(h)}return t}function Bd(i,e){let t=e.ui,n=v=>v<560,s=.45,r=!0,a=null,o={a:new P(-2.2,.22,.75),b:new P(2.2,.22,.75),pulse:null},l=mt(i,{ui:t,label:"Two GPU packages on one board, joined by NVLink. A pulse crosses the link at Epoch\u2019s 900 GB/s bandwidth.",height:v=>n(v)?300:280,radius:2.38,radiusY:1.52,yaw:-.58,pitch:.32,target:new P(0,.1,.1),fitPad:1.18,fov:28,busy:()=>r||a&&!a.done,onShow(){a?.arm(),l&&l.invalidate()},step(v){return a&&a.tick(v),o.pulse?(s=(s+v*.35)%1,o.pulse.position.lerpVectors(o.a,o.b,s),l.invalidate(),!0):!!(a&&!a.done)}});if(!l)return!1;gt(l.scene,{hemi:.95,keyI:1.25,fillI:.36,rimI:.45,envI:1});let c=new be;l.scene.add(c);let h=He(6.8,.12,2.8,fi(14474456),.04);h.position.y=-.28,c.add(h),nt(c,6.7,2.7,-.2,V(11842736),{t:.035,railH:.05,overhang:.03});let d=ns(4880984,{opacity:.7});for(let v=-2;v<=2;v++){let b=new k(new ye(6.4,.02,.04),d);b.position.set(0,-.2,v*.35),c.add(b)}let u=Fd(c,-2.2),f=Fd(c,2.2),g=new be;c.add(g);let x=V(9071288,{emissive:6965912,emissiveIntensity:.42,roughness:.28,metalness:.82,brushStrength:1.25}),m=He(2.7,.03,.55,V(6965912,{roughness:.35,metalness:.7,emissive:4860536,emissiveIntensity:.18}),.02);m.position.set(0,.14,.5),g.add(m);for(let v=-3;v<=3;v++){let b=He(2.65,.07,.075,x,.022);b.position.set(0,.2,.5+v*.085),g.add(b)}for(let v of[-1.25,1.25])for(let b=-3;b<=3;b++){let I=new k(new Ae(.055,.055,.09,12),V(14205040,{roughness:.32,metalness:.85}));I.rotation.z=Math.PI/2,I.position.set(v,.2,.5+b*.085),g.add(I)}let p=new k(new Je(.11,14,14),ns(14711354,{emissive:14711354,emissiveIntensity:.55}));p.position.lerpVectors(o.a,o.b,s),c.add(p),o.pulse=p;let A=new Dt({color:2829098,transparent:!0,opacity:.22});c.traverse(v=>{if(!(!v.isMesh||!v.geometry||v.geometry.type==="SphereGeometry"))try{v.add(new Ft(ul(v.geometry,28),A.clone()))}catch{}}),l.label('<span class="c-violet">NVLink</span>',()=>new P(0,.55,1.15),"");let D=t.readout(i);D.innerHTML='Pulse on <b class="c-violet">NVLink</b> \xB7 Epoch <b>900 GB/s</b> (bandwidth only). Leaving package A is the off-die hop.',t.hint(i,'packages <span class="c-blue">A</span>/<span class="c-blue">B</span> \xB7 <span class="c-violet">NVLink</span> 900 GB/s \xB7 mid-crossing');let M=xt([{obj:u,delay:0,drop:.35},{obj:f,delay:.15,drop:.35},{obj:g,delay:.35,drop:.2,fromScale:.5}],{dur:.9});return a=M,M.arm(),l.view.dist<5.9&&(l.view.dist=5.9),l.ready(),!0}function oy(i){let e=i>>>0;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function gl(i,e={}){return ke(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function Od(i,e){let t=e.ui,n=S=>S<560,s=150,r=20,a=.1,o=!1,l=null,c=mt(i,{ui:t,label:"A three-hundred-millimetre wafer with random defects. Drag die size; good dies stay blue.",height:S=>(n(S),400),radius:2.45,radiusY:1.8,yaw:-.2,pitch:.44,target:new P(0,.15,0),fitPad:1.1,fov:28,busy:()=>!!(l&&!l.done),onShow(){l?.arm(),c&&c.invalidate()},step(S){return l&&!l.done?(l.tick(S),!0):!1}});if(!c)return!1;gt(c.scene,{hemi:.95,keyI:1.3,fillI:.38,rimI:.42,envI:1});let h=new be;c.scene.add(h);let d=1/58,u=s*d,f=V(14212326,{roughness:.28,metalness:.55,brush:!1,emissive:11581640,emissiveIntensity:.04}),g=new k(new Ae(u*.55,u*.7,.18,48),V(9080984,{roughness:.4,metalness:.75}));g.position.y=-.14,h.add(g),nt(h,u*1.15,u*1.15,-.02,V(10528944),{t:.03,railH:.05,overhang:.02});let x=new k(new Ae(u,u,.08,64),f);h.add(x);let m=new k(new Pt(u-.02,.035,8,64),V(12633808,{roughness:.35,metalness:.7}));m.rotation.x=Math.PI/2,m.position.y=.04,h.add(m);let p=new k(new Pt(u-.08,.018,6,64),V(14212326,{shininess:90}));p.rotation.x=Math.PI/2,p.position.y=.05,h.add(p);let A=new k(jt(.18,.1,.12,.025),gl(12107464));A.position.set(0,.02,-u+.02),h.add(A);for(let S=0;S<6;S++){let F=S/6*Math.PI*2,z=new k(new Ae(.04,.04,.04,10),V(5922920));z.position.set(Math.cos(F)*u*.35,-.04,Math.sin(F)*u*.35),h.add(z)}let D=new be;h.add(D);let M=new be;h.add(M);let v=gl(4878292,{emissive:2772916,emissiveIntensity:.12}),b=gl(13660240,{emissive:11554864,emissiveIntensity:.15}),I=gl(2829098,{emissive:1118481,emissiveIntensity:.1});function _(){let S=oy(11),F=Math.round(a*Math.PI*15**2),z=[];for(;z.length<F;){let G=(S()*2-1)*s,L=(S()*2-1)*s;G*G+L*L<s*s&&z.push([G,L])}let W=o?r/2:r,H=[],C=0;for(let G=-s;G<s;G+=W)for(let L=-s;L<s;L+=W){if([[L,G],[L+W,G],[L,G+W],[L+W,G+W]].some(([ee,te])=>ee*ee+te*te>(s-3)**2))continue;let X=z.some(([ee,te])=>ee>=L&&ee<L+W&&te>=G&&te<G+W);X||C++,H.push([L,G,X])}return{dies:H,defects:z,gross:H.length,good:C,a:W}}function w(){for(;D.children.length;)D.remove(D.children[0]);for(;M.children.length;)M.remove(M.children[0]);let{dies:S,defects:F,a:z}=_(),H=Math.max(.04,z*d-.015),C=.07,G=V(4878292,{emissive:2772916,emissiveIntensity:.14,roughness:.45,metalness:.55,brush:!1}),L=V(13660240,{emissive:11554864,emissiveIntensity:.18,roughness:.45,metalness:.5,brush:!1}),X=V(6983636),ee=V(14717040);for(let[te,se,ce]of S){let J=H>.07?He(H,C,H,ce?L:G,Math.min(.02,H*.15)):new k(new ye(H,C,H),ce?b:v);if(J.position.set((te+z/2)*d,.08,(se+z/2)*d),D.add(J),H>.1){let pe=He(H+.012,.014,H+.012,ce?ee:X,.008);pe.position.set((te+z/2)*d,.08+C/2+.005,(se+z/2)*d),D.add(pe)}}for(let[te,se]of F){let ce=new k(new Je(.035,8,8),I);ce.position.set(te*d,.14,se*d),M.add(ce)}B(),c.invalidate()}let N=t.controls(i),O=t.readout(i);function B(){let{gross:S,good:F}=_(),z=r*r/100,W=Math.exp(o?-z/4*a:-z*a);O.innerHTML=o?`Four <span class="c-blue">chiplets</span> of ${r/2}\xD7${r/2} mm: <b>${F}</b> of ${S} good (~${Math.round(W*100)}%) \u2192 ${Math.floor(F/4)} complete chips.`:`<b>${r}\xD7${r} mm</b> die (${(z*100).toFixed(0)} mm\xB2): <b class="c-blue">${F}</b> of ${S} good (~${Math.round(W*100)}% by formula).`}t.slider(N,{label:"Die side (mm)",name:"yd-side",min:5,max:30,step:1,value:r,color:t.C.compute,fmt:S=>`${S}`,oninput:S=>{r=S,w()}}),t.slider(N,{label:"Defects / cm\xB2",name:"yd-d0",min:.02,max:.5,step:.01,value:a,color:t.C.heat,fmt:S=>S.toFixed(2),oninput:S=>{a=S,w()}}),t.button(N,"Split into four chiplets",()=>{o=!o,w()},{name:"yd3-chip"}),t.hint(i,'<span class="c-blue">good dies</span> \xB7 <span class="c-orange">defects</span> \xB7 drag size'),w();let U=xt([{obj:g,delay:0,drop:.15},{obj:x,delay:.12,drop:.18},{obj:D,delay:.3,drop:.12},{obj:M,delay:.45,drop:.1}],{dur:.9});return l=U,U.arm(),c.view.dist<7.05&&(c.view.dist=7.05),c.ready(),!0}var ly=(i,e,t,n)=>i+(e-i)*Math.min(1,t*n);function Yr(i,e,t,n,s){let r=new be;r.position.set(e,t,n),i.add(r);let a=ji(204),o=V(4878292,{emissive:2772916,emissiveIntensity:.05}),l=V(12886112,{shininess:55,specular:8939059}),c=V(10134188,{shininess:60}),h=V(14209216,{shininess:80,specular:16777215}),d=He(1.4,.1,.9,a,.04);d.position.y=0,r.add(d);let u=new k(new Ae(.14,.14,.85,20),o);u.rotation.z=Math.PI/2,u.position.set(0,.32,0),r.add(u);for(let v=0;v<9;v++){let b=new k(new Pt(.2,.035,8,20),l);b.rotation.y=Math.PI/2,b.position.set(-.36+v*.09,.32,0),r.add(b)}let f=new k(jt(.08,.55,.55,.025),V(10923188));f.position.set(-.55,.35,0),r.add(f);let g=new k(jt(.08,.55,.55,.025),V(10923188));g.position.set(.55,.35,0),r.add(g);let x=new be;x.position.set(.62,.62,0),r.add(x);let m=new k(jt(.95,.08,.22,.025),c);m.position.set(.4,0,0),x.add(m);let p=new k(new ye(.95,.02,.24),V(9080984));p.position.set(.4,.05,0),x.add(p);let A=new k(new Je(.07,14,14),h);A.position.set(.88,0,0),x.add(A);let D=new k(new Je(.06,12,12),h);D.position.set(1.35,.48,0),r.add(D);let M=new k(new Ae(.04,.04,.35,10),V(9080984));return M.position.set(1.35,.28,0),r.add(M),{g:r,armRoot:x,tip:A,core:u,mCoil:o,label:s}}function Hd(i,e){let t=e.ui,n=B=>B<560,s={a:!0,b:!0,arm:[.92,.35],series:!0},r=[0,0],a=null,o=mt(i,{ui:t,label:"Two soft-solid relays. Each coil pulls an armature that closes a contact. Series = AND, parallel = OR.",height:B=>n(B)?420:380,radius:2.75,radiusY:1.55,yaw:-.42,pitch:.36,target:new P(.5,.45,.15),fitPad:1.24,fov:28,busy:()=>!0,onShow(){a?.arm(),o&&o.invalidate()},step(B){if(a&&!a.done)return a.tick(B),b(),!0;let U=!1;return[s.a,s.b].forEach((S,F)=>{let z=S?1:0,W=s.arm[F],H=ly(W,z,12,B);s.arm[F]=Math.abs(H-z)<.002?z:H,Math.abs(s.arm[F]-z)>.002&&(U=!0),W<.9&&s.arm[F]>=.9&&(r[F]=.45),r[F]>0&&(r[F]-=B)}),b(),U||r[0]>0||r[1]>0||t.isPlaying()}});if(!o)return!1;gt(o.scene,{hemi:1.4,keyI:1.2,fillI:.45,rimI:.32});let l=new be;o.scene.add(l);let c=He(4.6,.12,2.6,ji(222),.05);c.position.set(.5,-.12,.05),l.add(c),nt(l,4.5,2.5,-.04,ji(196,{lift:.3}),{t:.035,railH:.05,overhang:.03});let h=Yr(l,-1.3,0,.2,"A"),d=Yr(l,.9,0,.2,"B"),u=[h,d],f=new be;f.position.set(2.6,.35,.2),l.add(f);let g=new k(new Je(.28,20,20),ke(15000800,{shininess:40}));f.add(g);let x=new k(new Ae(.18,.22,.2,14),V(9080984));x.position.y=-.3,f.add(x);let m=V(5924976,{shininess:40}),p=V(15255626,{emissive:15255626,emissiveIntensity:.45,shininess:50}),A=[];function D(B,U,S,F){let z=S-B,W=F-U,H=Math.hypot(z,W),C=new k(new ye(H,.03,.05),m.clone());return C.position.set((B+S)/2,.02,(U+F)/2),C.rotation.y=-Math.atan2(W,z),l.add(C),A.push(C),C}D(-1.3,.2,.9,.2),D(.9,.2,2.4,.2),D(-1.3,-.5,2.4,-.5),o.label('<span class="c-orange">A</span>',()=>new P(-1.3,1.35,.2),""),o.label('<span class="c-orange">B</span>',()=>new P(.9,1.35,.2),""),o.label('<span class="c-yellow">lamp</span>',()=>new P(2.6,.85,.2),"");let M=[o.label('<span class="c-orange">click</span>',()=>new P(-.1,.85,.2),""),o.label('<span class="c-orange">click</span>',()=>new P(2.1,.85,.2),"")],v=[];[[-1.3,-1],[.9,-1]].forEach(([B,U],S)=>{let F=new k(jt(.45,.18,.45,.05),Cn(14212326,{emissive:0,emissiveIntensity:0}));F.position.set(B,.05,U),F.userData.key=S,l.add(F),v.push(F)});function b(){u.forEach((W,H)=>{let C=s.arm[H];W.armRoot.rotation.z=-.42+(.02- -.42)*C;let G=[s.a,s.b][H];W.mCoil.emissiveIntensity=G?.35:.05,W.mCoil.color.setHex(G?6986464:4878292),v[H].material.emissive=new Be(G?4878292:0),v[H].material.emissiveIntensity=G?.25:0,v[H].position.y=G?0:.05,M[H].el.style.opacity=r[H]>0?String(Math.min(1,r[H]*3)):"0"});let S=s.arm[0]>.92,F=s.arm[1]>.92,z=s.series?S&&F:S||F;g.material.emissive=new Be(z?15245344:0),g.material.emissiveIntensity=z?.7:0,g.material.color.setHex(z?15910991:15000800),A.forEach((W,H)=>{let C=z||H===0&&S;W.material.color.copy(C?p.color:m.color),W.material.emissive.copy(C?p.emissive:m.emissive),W.material.emissiveIntensity=C?.4:0}),w(),o.invalidate()}let I=t.controls(i),_=t.readout(i);function w(){let B=s.series?s.arm[0]>.92&&s.arm[1]>.92:s.arm[0]>.92||s.arm[1]>.92;_.innerHTML=s.series?`Series = <b>AND</b>: both <span class="c-blue">coils</span> must pull. Lamp is <b>${B?"on":"off"}</b>.`:`Parallel = <b>OR</b>: either <span class="c-blue">armature</span> closes the lamp. Lamp is <b>${B?"on":"off"}</b>.`}t.segmented&&t.segmented(I,{label:"Contacts",value:!0,options:[{label:"series (AND)",value:!0,name:"rl3-ser"},{label:"parallel (OR)",value:!1,name:"rl3-par"}],onchange:B=>{s.series=B,b(),o.kick()}}),t.button(I,"Toggle A",()=>{s.a=!s.a,o.kick()},{name:"rl3-a"}),t.button(I,"Toggle B",()=>{s.b=!s.b,o.kick()},{name:"rl3-b"}),t.hint(i,'tap keys or buttons \xB7 watch the <span class="c-blue">armature</span> click'),o.canvas.addEventListener("pointerup",B=>{});let N=new ui,O=new De;return o.canvas.addEventListener("click",B=>{let U=o.canvas.getBoundingClientRect();O.set((B.clientX-U.left)/U.width*2-1,-((B.clientY-U.top)/U.height)*2+1),N.setFromCamera(O,o.camera);let S=N.intersectObjects(v,!0)[0];S&&(S.object.userData.key===0?s.a=!s.a:s.b=!s.b,o.kick())}),a=xt([{obj:c,delay:0,drop:.2},{obj:h.g,delay:.1,drop:.28},{obj:d.g,delay:.25,drop:.28},{obj:f,delay:.4,drop:.22}]),b(),o.view.dist<6&&(o.view.dist=6),o.ready(),!0}var qs=[{k:"g",label:"g-line 436 nm",lam:436,na:.45,yr:"1980s"},{k:"i",label:"i-line 365 nm",lam:365,na:.6,yr:"1990s"},{k:"krf",label:"KrF 248 nm",lam:248,na:.8,yr:"late 1990s"},{k:"arf",label:"ArF 193 nm",lam:193,na:.93,yr:"2000s"},{k:"arfi",label:"ArF immersion",lam:193,na:1.35,yr:"since ~2007"},{k:"euv",label:"EUV 13.5 nm",lam:13.5,na:.33,yr:"since 2019"},{k:"hna",label:"High-NA EUV",lam:13.5,na:.55,yr:"2025\u201326"}],cy=i=>i>=1?0:2/Math.PI*(Math.acos(i)-i*Math.sqrt(1-i*i));function Gd(i,e){let t=e.ui,n=S=>S<560,s=4,r=60,a=0,o=null,l=()=>cy(qs[s].lam/(4*qs[s].na*r)),c=mt(i,{ui:t,label:"Light through a chrome mask onto photoresist on a wafer. Features blur as half-pitch nears the wavelength limit.",height:S=>n(S)?400:380,radius:2,radiusY:1.75,yaw:.36,pitch:.48,target:new P(0,.9,0),fitPad:1.14,fov:32,busy:()=>!0,onShow(){o?.arm(),c&&c.invalidate()},step(S){return o&&!o.done&&o.tick(S),a+=S,d.forEach((F,z)=>{F.material.opacity=.25+.35*(.5+.5*Math.sin(a*4+z*.4))}),c.invalidate(),t.isPlaying()}});if(!c)return!1;gt(c.scene,{hemi:.95,keyI:1.25,fillI:.36,rimI:.42,envI:1});let h=new be;c.scene.add(h);let d=[],u=[],f=[],g=null,x=new k(new Ae(1.6,1.6,.12,48),V(12173514,{roughness:.35,metalness:.55,brush:!1}));x.position.y=0,h.add(x),Vs(h,1.55,.04,.06,V(11055288)),Vs(h,1.4,.02,.08,V(12634320,{shininess:90}));let m=new k(new Ae(1.45,1.45,.06,40),ke(7259296,{opacity:.55,shininess:20}));m.position.y=.12,h.add(m),g=new k(new Ae(1.35,1.35,.05,40),di(8308968,{opacity:0,shininess:95,specular:16777215})),g.position.y=.22,g.visible=!1,h.add(g);let p=He(2.6,.06,1.4,di(13162728,{opacity:.4}),.03);p.position.y=1.15,h.add(p);let A=He(2.7,.04,1.5,V(9080984,{roughness:.3,metalness:.8}),.025);A.position.y=1.12,h.add(A),nt(h,2.7,1.5,1.16,V(10133672),{t:.03,railH:.05,overhang:.025});let D=new k(new Ae(.85,.95,.22,40),di(11061480,{opacity:.38,shininess:95}));D.position.y=.72,h.add(D);let M=new k(new Ae(1,1.05,.08,40),V(10923188));M.position.y=.58,h.add(M);let v=new k(new Pt(1.32,.025,8,48),di(10410224,{opacity:.55}));v.rotation.x=Math.PI/2,v.position.y=.24,v.userData.noInk=!0,h.add(v),g.userData.meniscus=v;let b=new k(new Ae(.35,.4,.18,24),ke(15319375,{emissive:15245344,emissiveIntensity:.45,shininess:20}));b.position.y=2.05,h.add(b);let I=new k(new Ae(.45,.45,.12,24),V(6975608,{roughness:.3,metalness:.8}));I.position.y=2.2,h.add(I);let _=new k(new Ae(.55,.4,.14,24),di(13162728,{opacity:.35}));_.position.y=1.85,h.add(_),nt(h,.9,.9,2.28,V(8028296),{t:.025,railH:.04,overhang:.02});function w(){f.forEach(se=>{h.remove(se),se.geometry?.dispose()}),u.forEach(se=>{h.remove(se),se.geometry?.dispose()}),d.forEach(se=>{h.remove(se),se.geometry?.dispose()}),f=[],u=[],d=[];let S=l(),F=qs[s].k==="arfi"||qs[s].k==="hna";g&&(g.visible=F,g.material.opacity=F?.42:0,g.material.transparent=!0,g.userData.meniscus&&(g.userData.meniscus.visible=F));let z=7,W=2.2,H=W/z,C=H*.45,G=H-C,L=Math.max(0,(1-S)*C*.65),X=V(3815992,{shininess:90,specular:16777215}),ee=-W/2;for(let se=0;se<z;se++){let ce=ee+se*H+G+C/2,Z=ee+se*H+G/2,J=new k(new ye(Math.max(.02,G),.035,1.2),X);J.position.set(Z,1.185,0),h.add(J),f.push(J);let pe=ke(15314992,{opacity:.4,emissive:15245344,emissiveIntensity:.3,shininess:5}),ge=new k(new ye(C*.65,.95,.07),pe);if(ge.position.set(ce,.62,0),h.add(ge),d.push(ge),S>.12){let xe=ke(2787944,{opacity:Math.min(.95,.4+S*.55),emissive:1731144,emissiveIntensity:.12}),$e=Math.max(.035,C-2*L),ot=new k(new ye($e,.05,1.05),xe);ot.position.set(ce,.16,0),h.add(ot),u.push(ot)}}let te=new k(new ye(Math.max(.02,G),.035,1.2),X);if(te.position.set(ee+z*H+G/2,1.185,0),h.add(te),f.push(te),S<=.12){let se=new k(new ye(2.2,.04,1.05),ke(8947848,{opacity:.35}));se.position.set(0,.16,0),h.add(se),u.push(se)}B(),c.invalidate()}c.label('<span class="c-grey">mask</span>',()=>new P(1.7,1.35,0),"");let N=t.controls(i),O=t.readout(i);function B(){let S=qs[s],F=S.lam/(4*S.na),z=l();O.innerHTML=`${S.label} \xB7 NA ${S.na}${S.k==="arfi"||S.k==="hna"?' \xB7 <span class="c-cyan">immersion film</span>':""}: <b>${r} nm</b> lines at <b>${Math.round(z*100)}%</b> contrast. Floor \u2248 <b>${Math.round(F*10)/10} nm</b>.`}t.segmented&&t.segmented(N,{label:"Source",value:s,options:qs.map((S,F)=>({label:S.k==="arfi"?"ArFi":S.k==="hna"?"High-NA":S.k.toUpperCase(),value:F,name:"li3-"+S.k})),onchange:S=>{s=S,w()}}),t.slider(N,{label:"Half-pitch (nm)",name:"li3-hp",min:5,max:500,step:1,value:r,color:t.C.memory,fmt:S=>`${S}`,oninput:S=>{r=S,w()}}),t.hint(i,'<span class="c-yellow">\u03BB</span> through mask \u2192 <span class="c-green">resist</span> on <span class="c-blue">wafer</span> \xB7 drag pitch until blur'),w();let U=xt([{obj:x,delay:0,drop:.18},{obj:m,delay:.1,drop:.12},{obj:D,delay:.22,drop:.2},{obj:p,delay:.35,drop:.22},{obj:I,delay:.48,drop:.25}],{dur:.95});return o=U,U.arm(),c.view.dist<6.7&&(c.view.dist=6.7),c.ready(),!0}function zd(i,e){let t=e.ui,n=v=>v<560,s=.4,r=null,a=mt(i,{ui:t,label:"Heat leaves the die through a cold plate, a CDU, and an outdoor reject. A pulse circulates the loop.",height:v=>n(v)?340:320,radius:3.65,radiusY:1.53,yaw:-.4,pitch:.36,target:new P(2.6,.4,.1),fitPad:1.26,fov:26,busy:()=>!0,onShow(){r?.arm(),a&&a.invalidate()},step(v){return r&&r.tick(v),s=(s+v*.18)%1,m.position.lerpVectors(x[Math.floor(s*(x.length-1))],x[Math.min(x.length-1,Math.floor(s*(x.length-1))+1)],s*(x.length-1)%1),h.forEach((b,I)=>{let _=Math.abs(I/(h.length-1)-s);b.mat.emissiveIntensity=_<.2?.35:.06}),a.invalidate(),!0}});if(!a)return!1;gt(a.scene,{hemi:1.35,keyI:1.1,fillI:.4,rimI:.3});let o=new be;a.scene.add(o);let l=2.6,c=He(6.5,.1,1.9,Cn(15264486),.04);c.position.set(l,-.15,0),o.add(c);{let v=new be;v.position.x=l,o.add(v),nt(v,6.4,1.8,-.08,V(13685964),{t:.03,railH:.05,overhang:.025})}let h=[],d=[],u=[{name:"die",x:0,col:14711354,em:14711354},{name:"plate",x:1.6,col:5162176,em:2795684},{name:"CDU",x:3.4,col:4878292,em:2772916},{name:"out",x:5.2,col:4168260,em:2783796}];u.forEach((v,b)=>{let I=new be;I.position.set(v.x,0,0),o.add(I),d.push(I);let _=V(v.col,{emissive:v.em,emissiveIntensity:.12,roughness:.4,metalness:.6}),w=He(1,.7,1,_,.05);w.position.set(0,.35,0),I.add(w),nt(I,1,1,.72,V(11581632),{t:.04,railH:.06,overhang:.03});for(let O of[-1,1])for(let B=0;B<4;B++){let U=new k(new ye(.55,.05,.03),V(10134704));U.position.set(0,.15+B*.15,O*.52),I.add(U)}let N=new k(new ye(.7,.06,.04),ke(v.col,{emissive:v.em,emissiveIntensity:.45}));if(N.position.set(0,.55,.52),I.add(N),h.push({mat:_,body:w,g:I}),b<u.length-1){let O=new k(new Ae(.09,.09,.55,14),V(8308932,{roughness:.28,metalness:.75}));O.rotation.z=Math.PI/2,O.position.set((v.x+u[b+1].x)/2,.4,0),o.add(O);for(let B of[v.x+.55,u[b+1].x-.55]){let U=new k(new Ae(.13,.13,.09,12),V(9080984));U.rotation.z=Math.PI/2,U.position.set(B,.4,0),o.add(U);let S=new k(new Pt(.12,.02,6,14),V(6975608));S.rotation.y=Math.PI/2,S.position.set(B,.4,0),o.add(S)}}});let f=new k(new ye(5.2,.06,.06),V(14711354,{opacity:.75,emissive:14711354,emissiveIntensity:.18,roughness:.35}));f.position.set(2.6,.05,.7),o.add(f);let g=new k(new ye(5.2,.05,.05),V(5162176,{opacity:.7,emissive:2795684,emissiveIntensity:.15,roughness:.35}));g.position.set(2.6,.05,-.7),o.add(g);for(let v of[-.7,.7])for(let b of[.5,2.6,4.7]){let I=new k(new Je(.07,10,10),V(9080984));I.position.set(b,.05,v),o.add(I)}let x=u.map(v=>new P(v.x,.85,0)),m=new k(new Je(.12,14,14),ke(16764006,{emissive:16755251,emissiveIntensity:.6}));o.add(m);let p=new k(new Ae(.35,.35,.2,16),V(9080984));p.position.set(5.2,.95,0),o.add(p);for(let v=0;v<4;v++){let b=new k(new ye(.28,.02,.06),V(10528944));b.position.set(5.2,1.07,0),b.rotation.y=v/4*Math.PI*2,o.add(b)}let A=new k(new ye(.7,.08,.7),ke(5924984));A.position.set(0,.75,0),o.add(A);for(let[v,b]of[[-.22,-.22],[.22,-.22],[-.22,.22],[.22,.22]]){let I=new k(new Ae(.04,.04,.03,8),V(12886112));I.position.set(v,.81,b),o.add(I)}for(let v of[-.35,.35]){let b=new k(new Ae(.08,.08,.12,12),V(8308932));b.rotation.x=Math.PI/2,b.position.set(3.4,.55,v),o.add(b)}a.label('<span class="c-cyan">plate</span>',()=>new P(1.6,1.25,-.2),""),a.label('<span class="c-blue">CDU</span>',()=>new P(3.4,1.25,-.2),"");let D=t.readout(i);D.innerHTML='Heat circulates <span class="c-orange">die</span> \u2192 <span class="c-cyan">cold plate</span> \u2192 <span class="c-blue">CDU</span> \u2192 <span class="c-green">outdoor reject</span>.',t.hint(i,"mid-loop \xB7 drag to turn");let M=xt(d.map((v,b)=>({obj:v,delay:b*.12,drop:.3,fromScale:.5})),{dur:.85});return r=M,M.arm(),a.view.dist<6.8&&(a.view.dist=6.8),a.ready(),!0}var xl=[{name:"embed",short:"embed",cost:"1\xD7",col:12886112,em:10780736},{name:"attention",short:"attn",cost:"4\xD7",col:6986464,em:4881088},{name:"MLP",short:"MLP",cost:"8\xD7",col:4878292,em:2772916},{name:"unembed",short:"out",cost:"1\xD7",col:9071288,em:6965912}];function kd(i,e){let t=e.ui,n=I=>I<560,s=1,r=0,a=null,o=mt(i,{ui:t,label:"One transformer block as four stages. Token ribbons feed embed and leave unembed; attention arcs cross the context.",height:I=>n(I)?320:300,radius:3.5,radiusY:1.48,yaw:-.42,pitch:.42,target:new P(1.72,.45,0),fitPad:1.35,fov:28,busy:()=>!0,step(I){return a&&a.tick(I),r+=I,f.forEach((_,w)=>{let N=(r*.35+w*.17)%1;_.bead.position.lerpVectors(_.a,_.b,N)}),m.forEach((_,w)=>{_.mat.opacity=.15+.35*(s===1?.5+.5*Math.sin(r*3+w):.25)}),o.invalidate(),!0},onShow(){a?.arm(),o&&o.invalidate()}});if(!o)return!1;gt(o.scene,{hemi:1.35,keyI:1.15,fillI:.4,rimI:.32});let l=new be;o.scene.add(l);let c=1.72,h=He(4.7,.12,2,Cn(15264486),.05);h.position.set(c,-.18,0),l.add(h);let d=He(4.75,.04,2.05,V(13685964,{roughness:.38}),.03);d.position.set(c,-.12,0),l.add(d);{let I=new be;I.position.x=c,l.add(I),nt(I,4.65,1.95,-.1,V(13159620),{t:.03,railH:.05,overhang:.025})}let u=[];xl.forEach((I,_)=>{let w=new be;w.position.set(_*1.15,0,0),l.add(w);let N=V(I.col,{emissive:I.em,emissiveIntensity:.1,roughness:.42,metalness:.55,brush:!0}),O=.55+(I.cost==="8\xD7"?.45:I.cost==="4\xD7"?.25:0),B=He(.9,O,1,N,.05);B.position.y=O/2,w.add(B),nt(w,.9,1,O+.02,V(12107976),{t:.035,railH:.05,overhang:.025});for(let U of[-1,1])for(let S=0;S<3;S++){let F=new k(new ye(.035,O*.55,.18),V(11055288));F.position.set(U*.42,O*.35,-.2+S*.2),w.add(F)}for(let U=0;U<4;U++){let S=new k(new ye(.7,.03,.03),V(10134445));S.position.set(0,.12+U*(O*.2),.52),w.add(S)}for(let U of[-.3,.3]){let S=new k(new Je(.04,10,10),ke(I.col,{emissive:I.em,emissiveIntensity:.35}));S.position.set(U,O+.08,-.35),w.add(S)}if(u.push({g:w,body:B,mat:N,h:O}),_<3){let U=new k(new Ae(.07,.07,.22,12),V(10134445,{shininess:70}));U.rotation.z=Math.PI/2,U.position.set(_*1.15+.55,.38,0),l.add(U);for(let S of[_*1.15+.45,_*1.15+.65]){let F=new k(new Ae(.1,.1,.06,12),V(9080984));F.rotation.z=Math.PI/2,F.position.set(S,.38,0),l.add(F)}}});let f=[],g=ke(15255626,{emissive:15255626,emissiveIntensity:.25,opacity:.85,shininess:20});function x(I,_,w,N,O,B){let U=new P(I,_,w),S=new P(N,O,B),F=U.distanceTo(S),z=new k(new ye(F,.04,.1),g.clone());z.position.copy(U).add(S).multiplyScalar(.5),z.lookAt(S),z.rotateY(Math.PI/2),z.rotation.set(0,0,0),z.scale.set(1,1,1);let W=N-I,H=B-w;z.geometry.dispose(),z.geometry=new ye(Math.hypot(W,H)||F,.035,.09),z.position.set((I+N)/2,(_+O)/2,(w+B)/2),z.rotation.y=-Math.atan2(H,W),l.add(z);let C=new k(new Je(.09,12,12),ke(16764006,{emissive:16755251,emissiveIntensity:.55}));C.position.copy(U),l.add(C),f.push({a:U,b:S,bead:C,rib:z})}x(-1.15,.35,-.55,-.35,.35,-.3),x(-1.15,.28,-.2,-.35,.4,-.05),x(-1.15,.42,.15,-.35,.3,.2),x(-1.15,.32,.45,-.35,.38,.4),x(-1.15,.48,.65,-.35,.28,.55),x(.45,.55,.35,.85,.65,.35),x(.45,.4,-.25,.85,.5,-.25),x(1.6,.7,-.35,2,.85,-.35),x(1.6,.55,.3,2,.7,.3),x(2.75,.95,.25,3.15,.55,.25),x(2.75,.75,-.3,3.15,.45,-.3),x(3.85,.4,-.4,4.7,.35,-.55),x(3.85,.35,-.05,4.7,.38,.05),x(3.85,.42,.3,4.7,.4,.4),x(3.85,.3,.55,4.7,.32,.6);let m=[];for(let I=0;I<11;I++){let _=ke(6986464,{opacity:.28,emissive:4881088,emissiveIntensity:.22,shininess:10}),w=new k(new Pt(.28+I*.07,.015,6,28,Math.PI*.95),_);w.rotation.x=Math.PI/2,w.rotation.z=-.55+I*.12,w.position.set(1.15,u[1].h+.22+I%4*.05,-.15+I%3*.1),l.add(w),m.push({mesh:w,mat:_})}o.label('<span class="c-yellow">embed</span>',()=>new P(0,u[0].h+.55,-.15),""),o.label('<span class="c-blue">attn</span>',()=>new P(1.15,u[1].h+.7,-.15),""),o.label('<span class="c-blue">MLP</span>',()=>new P(2.3,u[2].h+.55,-.15),"");function p(){u.forEach((I,_)=>{let w=_===s;I.mat.emissiveIntensity=w?.42:.08,I.body.scale.setScalar(w?1.06:1)}),v(),o.invalidate()}let A=t.controls(i),D=t.readout(i),M=["Tokens become vectors \u2014 table lookup, small next to what follows.","Every token looks at earlier ones. Cost grows with context \xD7 width.","Feed-forward MLP dominates FLOPs in a dense block (~\u2154 of arithmetic).","Vectors \u2192 next-token logits. Softmax over the vocabulary."];function v(){D.innerHTML=`<b class="c-blue">${xl[s].name}</b> (~${xl[s].cost}): ${M[s]} Dense forward \u2248 <b>2N</b> FLOPs/token.`}t.slider(A,{label:"Stage",name:"xf-stage",min:0,max:3,step:1,value:s,color:t.C.learn,fmt:I=>xl[Math.round(I)].short,oninput:I=>{s=Math.round(I),p()}}),t.hint(i,'<span class="c-yellow">token</span> ribbons \xB7 height \u2248 FLOPs \xB7 mid on <span class="c-blue">attention</span> \xB7 out in prose'),p();let b=xt(u.map((I,_)=>({obj:I.g,delay:_*.1,drop:.35,fromScale:.45})),{dur:.9});return a=b,b.arm(),o.view.dist<6.8&&(o.view.dist=6.8),o.ready(),!0}var hy=(i,e,t,n)=>i+(e-i)*Math.min(1,t*n);function Vd(i,e){let t=e.ui,n=O=>O<560,s={a:!0,arm:[.92,.55]},r=null,a=mt(i,{ui:t,label:"Relay cascade: the first contact energises the second coil. Logic stacks without a hand on the second key.",height:O=>n(O)?360:320,radius:2.6,radiusY:1.4,yaw:-.4,pitch:.36,target:new P(.5,.55,.2),fitPad:1.15,fov:26,busy:()=>!0,onShow(){r?.arm(),a&&a.invalidate()},step(O){if(r&&!r.done)return r.tick(O),v(),!0;let B=s.a,U=s.arm[0]>.9;return[[B,0],[U,1]].forEach(([S,F])=>{let z=S?1:0,W=hy(s.arm[F],z,10,O);s.arm[F]=Math.abs(W-z)<.002?z:W}),v(),!0}});if(!a)return!1;gt(a.scene,{hemi:1.4,keyI:1.2,fillI:.45,rimI:.32});let o=new be;a.scene.add(o);let l=He(4.4,.12,2.1,ji(222),.05);l.position.set(.55,-.1,-.05),o.add(l),nt(o,4.3,2,-.02,ji(196,{lift:.3}),{t:.035,railH:.05,overhang:.03});let c=Yr(o,-1.2,0,.55,"A"),h=Yr(o,.7,0,-.55,"B"),d=[c,h];[[-1.6,.55],[-.4,.2],[.9,-.35],[2,-.4]].forEach(([O,B],U,S)=>{if(U===S.length-1)return;let[F,z]=S[U+1],W=F-O,H=z-B,C=Math.hypot(W,H),G=new k(new ye(C,.02,.07),V(13215820,{shininess:55}));G.position.set((O+F)/2,-.04,(B+z)/2),G.rotation.y=-Math.atan2(H,W),o.add(G)});let u=new k(new ye(1.6,.04,.08),V(15255626,{emissive:15255626,emissiveIntensity:.2}));u.position.set(-.15,.55,.05),u.rotation.y=-.55,o.add(u);let f=new k(new ye(1.55,.03,.05),V(13938762,{emissive:15255626,emissiveIntensity:.12}));f.position.set(-.15,.48,.12),f.rotation.y=-.55,o.add(f);let g=[];for(let O=0;O<3;O++){let B=new k(new Je(.055,10,10),ke(16764006,{emissive:16755251,emissiveIntensity:.4}));B.position.set(-.9+O*.55,.58,.35-O*.28),o.add(B),g.push(B)}let x=new be;x.position.set(2.5,.35,-.4),o.add(x);let m=new k(new Ae(.22,.28,.12,16),V(9080984));m.position.y=-.28,x.add(m);let p=new k(new Je(.26,18,18),ke(15000800,{shininess:40}));x.add(p);let A=new k(new ye(1.1,.03,.05),V(13215820));A.position.set(1.85,.12,-.4),o.add(A);let D=new k(jt(.45,.18,.45,.05),Cn(14212326,{emissive:0,emissiveIntensity:0}));D.position.set(-1.2,.05,1.05),o.add(D);let M=new k(new Ae(.06,.06,.2,10),V(10134445));M.position.set(-1.2,-.02,1.05),o.add(M),a.label('<span class="c-orange">A</span>',()=>new P(-1.2,1.35,.55),""),a.label('<span class="c-orange">B</span> <span class="c-grey">driven</span>',()=>new P(.7,1.05,-.55),""),a.label('<span class="c-yellow">lamp</span>',()=>new P(2.5,.85,-.4),""),a.label('<span class="c-orange">cascade</span>',()=>new P(-.1,.85,.2),"");function v(){d.forEach((S,F)=>{let z=s.arm[F];S.armRoot.rotation.z=-.42+(.02- -.42)*z;let W=F===0?s.a:s.arm[0]>.9;S.mCoil.emissiveIntensity=W?.35:.05,S.mCoil.color.setHex(W?6986464:4878292)});let U=s.arm[1]>.9;p.material.emissive=new Be(U?15245344:0),p.material.emissiveIntensity=U?.7:0,p.material.color.setHex(U?15910991:15000800),u.material.emissiveIntensity=s.arm[0]>.9?.55:.12,f.material.emissiveIntensity=s.arm[0]>.9?.4:.08,g.forEach((S,F)=>{let z=s.arm[0]>.9;S.material.emissiveIntensity=z?.65:.1,S.visible=z||F===0}),D.material.emissiveIntensity=s.a?.25:0,D.position.y=s.a?0:.05,_(),a.invalidate()}let b=t.controls(i),I=t.readout(i);function _(){I.innerHTML=s.a?`Key A down: coil A pulls \u2192 contact feeds <b class="c-blue">coil B</b>. Lamp <b>${s.arm[1]>.9?"on":"catching up"}</b>.`:"Release A and both armatures fall. Stacked contacts \u2014 Shannon depth, lever mass still hurts."}t.button(b,"Toggle A",()=>{s.a=!s.a,a.kick()},{kind:"primary",name:"rc3-a"}),t.hint(i,'one key \xB7 <span class="c-orange">cascade</span> throws the second coil');let w=new ui,N=new De;return a.canvas.addEventListener("click",O=>{let B=a.canvas.getBoundingClientRect();N.set((O.clientX-B.left)/B.width*2-1,-((O.clientY-B.top)/B.height)*2+1),w.setFromCamera(N,a.camera),w.intersectObject(D,!0)[0]&&(s.a=!s.a,a.kick())}),r=xt([{obj:l,delay:0,drop:.2},{obj:c.g,delay:.12,drop:.28},{obj:h.g,delay:.28,drop:.28},{obj:x,delay:.42,drop:.22},{obj:D,delay:.5,drop:.15,fromScale:.6}]),v(),a.view.dist<6&&(a.view.dist=6),a.ready(),!0}var ah=(i,e,t)=>Math.max(e,Math.min(t,i));function yl(i,e={}){return ke(i,{opacity:e.opacity??1,emissive:e.emissive,emissiveIntensity:e.emissiveIntensity,shininess:e.shininess??36,specular:e.specular??5592405,side:e.side})}function Wd(i,e){let t=e.ui,n=t.C,s=S=>S<560,r=20,a=2.2,o=20,l=null,c=mt(i,{ui:t,label:"Two piles on a desk: model parameters and training tokens. The height ratio is tokens per parameter. Drag sideways to turn; the slider sets the ratio. About 20:1 is compute-optimal (Chinchilla).",height:S=>s(S)?Math.round(Math.max(300,S*.9)):Math.round(Math.min(420,S*.52)),radius:3.8,radiusY:2.8,yaw:-.55,pitch:.48,target:new P(0,1.35,0),fitPad:1.25,fov:36,busy:()=>!!(l&&!l.done)||t.isPlaying(),onShow(){l?.arm(),c&&c.invalidate()},step(S){if(l&&!l.done)return l.tick(S),!0;if(!t.isPlaying())return v.forEach(z=>z.m.visible=!1),!1;let F=w(M);return v.forEach(z=>{z.t+=S/1.1,z.t>=1&&(z.t-=1,z.x=(Math.random()-.5)*.7,z.z=(Math.random()-.5)*.7);let W=z.t*z.t;z.m.visible=z.t>0,z.m.position.set(1.5+z.x,F+1.5-1.38*W,z.z),z.m.rotation.set(z.t*2.1,z.t*1.3,0)}),!0}});if(!c)return!1;let{scene:h}=c;gt(h,{hemi:.95,keyI:1.3,fillI:.38,rimI:.45,envI:1});let d=new be;h.add(d);let u=He(5.2,.12,2.9,V(12888186,{roughness:.45,metalness:.35,brush:!1}),.04);u.position.y=0,d.add(u);{let S=He(5.35,.08,3.05,V(11044960,{roughness:.4,metalness:.4,brush:!1}),.03);S.position.set(0,-.08,0),d.add(S)}nt(d,5.15,2.85,.08,V(12097640),{t:.035,railH:.05,overhang:.03});let f=new be;f.position.set(-1.4,.06,0),d.add(f);let g=yl(4878292,{emissive:2772916,emissiveIntensity:.12}),x=V(14205040);for(let S=0;S<4;S++)for(let F=0;F<3;F++)for(let z=0;z<3;z++){let W=new k(new ye(.32,.32,.32),g);if(W.position.set((F-1)*.36,.2+S*.36,(z-1)*.36),f.add(W),S===3){let H=new k(new ye(.34,.03,.34),V(6983636));H.position.copy(W.position),H.position.y+=.175,f.add(H)}}dl(f,1.15,.04,1.15,V(3825588),1.55);let m=new be;m.position.set(1.5,.06,0),d.add(m);let p=yl(4168260,{emissive:2783796,emissiveIntensity:.1}),A=[],D=24;for(let S=0;S<D;S++)for(let F=0;F<4;F++)for(let z=0;z<4;z++){if(S>8&&(F+z+S)%3===0)continue;let W=new k(new ye(.22,.22,.22),p.clone());W.position.set((F-1.5)*.26+S%2*.05,.14+S*.23,(z-1.5)*.26+S%2*.04),W.visible=!1,m.add(W),A.push({mesh:W,layer:S})}let M=2,v=[0,-.36,-.7].map(S=>{let F=new k(new ye(.22,.22,.22),p);return F.visible=!1,d.add(F),{m:F,t:S,x:(Math.random()-.5)*.7,z:(Math.random()-.5)*.7}}),b=new k(new ye(2.4,.06,.08),yl(6971480));b.position.set(.05,.55,1.2),d.add(b);let I=new k(new Je(.1,12,12),yl(14711354,{emissive:14711354,emissiveIntensity:.4}));I.position.set(.05,.7,1.2),d.add(I);let _=new Dt({color:2829098,transparent:!0,opacity:.2});d.traverse(S=>{if(!(!S.isMesh||!S.geometry||S.geometry.type==="SphereGeometry"))try{S.add(new Ft(new Vt(S.geometry,30),_.clone()))}catch{}}),c.label('<span class="c-blue">parameters</span>',()=>new P(-1.4,1.85,0),""),c.label('<span class="c-green">tokens</span>',()=>new P(2.8,a,.25),""),c.label("~20:1 optimal",()=>Math.abs(r-o)<3?new P(.05,1,1.2):null,"");function w(S){return .14+Math.max(0,S-1)*.23+.12}function N(){let S=ah(Math.round(2+Math.log10(Math.max(r,1))*8.5),2,16);M=S;for(let{mesh:H,layer:C}of A)H.visible=C<S;let F=w(S),z=ah(.85+F*.35,1,2.4);c.setFocus({target:new P(0,z,0),radius:3.8,radiusY:Math.max(2.4,F*.85+.6),pitch:.46});let W=ah(Math.log10(r/2)/Math.log10(100/2),0,1);I.position.x=-1+W*2.1,a=Math.max(.5,F*.62),c.invalidate()}let O=t.controls(i),B=t.readout(i);function U(){let S=r>=o?r>o*1.5?"past compute-optimal \u2014 more tokens than Chinchilla would spend on this model size":"near compute-optimal (Chinchilla ~20 tokens per parameter)":"under-trained vs Chinchilla \u2014 more parameters than the token budget warrants";B.innerHTML=`<b>${r>=10?Math.round(r):r.toPrecision(2)} tokens per parameter</b> \xB7 ${S}.`,N()}return t.slider(O,{label:"Tokens / param",name:"ratio",min:1,max:200,step:1,value:r,color:n.learn||n.cyan||"#3f9a44",fmt:S=>`${S}\xD7`,oninput:S=>{r=S,U()}}),t.hint(i,"raise toward 20\xD7 (Chinchilla)"),U(),c.view.dist=Math.max(c.view.dist,7.6),l=xt([{obj:u,delay:0,drop:.15},{obj:f,delay:.15,drop:.35},{obj:m,delay:.35,drop:.45}]),c.ready(),!0}window.AIX3D={lossSurface:_d,mosfet3d:bd,factoryZoom:wd,triode3d:Rd,coldPlate3d:Id,package3d:Pd,tokenBalance3d:Wd,cmos3d:Dd,systolic3d:Ud,nvlinkPair3d:Bd,yield3d:Od,relay3d:Hd,litho3d:Gd,heatLoop3d:zd,transformer3d:kd,cascade3d:Vd};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
