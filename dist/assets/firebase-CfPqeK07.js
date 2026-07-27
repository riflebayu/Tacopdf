var e=Object.defineProperty,t=(t,n,r)=>((t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r)(t,"symbol"!=typeof n?n+"":n,r);var n={};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=63&s|128):55296==(64512&s)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++r)),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=63&s|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=63&s|128)}return t},s={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<e.length;s+=3){const t=e[s],i=s+1<e.length,a=i?e[s+1]:0,o=s+2<e.length,u=o?e[s+2]:0,c=t>>2,l=(3&t)<<4|a>>4;let h=(15&a)<<2|u>>6,d=63&u;o||(d=64,i||(h=64)),r.push(n[c],n[l],n[h],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(r(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const s=e[n++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=e[n++];t[r++]=String.fromCharCode((31&s)<<6|63&i)}else if(s>239&&s<365){const i=((7&s)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(i>>10)),t[r++]=String.fromCharCode(56320+(1023&i))}else{const i=e[n++],a=e[n++];t[r++]=String.fromCharCode((15&s)<<12|(63&i)<<6|63&a)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<e.length;){const t=n[e.charAt(s++)],a=s<e.length?n[e.charAt(s)]:0;++s;const o=s<e.length?n[e.charAt(s)]:64;++s;const u=s<e.length?n[e.charAt(s)]:64;if(++s,null==t||null==a||null==o||null==u)throw new i;const c=t<<2|a>>4;if(r.push(c),64!==o){const e=a<<4&240|o>>2;if(r.push(e),64!==u){const e=o<<6&192|u;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class i extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const a=function(e){return function(e){const t=r(e);return s.encodeByteArray(t,!0)}(e).replace(/\./g,"")},o=function(e){try{return s.decodeString(e,!0)}catch(Yd){}return null};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const u=()=>
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,c=()=>{try{return u()||(()=>{if("undefined"==typeof process)return;const e=n.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(Yd){return}const t=e&&o(e[1]);return t&&JSON.parse(t)})()}catch(Yd){return}},l=e=>{var t,n;return null==(n=null==(t=c())?void 0:t.emulatorHosts)?void 0:n[e]},h=e=>{const t=l(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},d=()=>{var e;return null==(e=c())?void 0:e.config},p=e=>{var t;return null==(t=c())?void 0:t[`_${e}`]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class f{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i={iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...e};return[a(JSON.stringify({alg:"none",type:"JWT"})),a(JSON.stringify(i)),""].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function y(){return!function(){var e;const t=null==(e=c())?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(Yd){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}class _ extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,_.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,v.prototype.create)}}class v{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,s=this.errors[e],i=s?function(e,t){return e.replace(w,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}(s,n):"Error",a=`${this.serviceName}: ${i} (${r}).`;return new _(r,a,n)}}const w=/\{\$([^}]+)}/g;function E(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const s of n){if(!r.includes(s))return!1;const n=e[s],i=t[s];if(T(n)&&T(i)){if(!E(n,i))return!1}else if(n!==i)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function T(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function I(e){const t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function C(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class A{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=S),void 0===r.error&&(r.error=S),void 0===r.complete&&(r.complete=S);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(Yd){}}),this.observers.push(r),s}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(Yd){"undefined"!=typeof console&&console.error}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function S(){}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(e){return e&&e._delegate?e._delegate:e}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function O(e){return(await fetch(e,{credentials:"include"})).ok}class k{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new f;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(Yd){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=(null==e?void 0:e.optional)??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(Yd){if(n)return null;throw Yd}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:D})}catch(Yd){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(Yd){}}}}clearInstance(e=D){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=D){return this.instances.has(e)}getOptions(e=D){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,i]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(s)&&i.resolve(r)}return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const s=this.instances.get(n);return s&&e(s,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===D?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var r;return n||null}normalizeInstanceIdentifier(e=D){return this.component?this.component.multipleInstances?e:D:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class P{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new L(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x,M;(M=x||(x={}))[M.DEBUG=0]="DEBUG",M[M.VERBOSE=1]="VERBOSE",M[M.INFO=2]="INFO",M[M.WARN=3]="WARN",M[M.ERROR=4]="ERROR",M[M.SILENT=5]="SILENT";const U={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},V=x.INFO,F={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},B=(e,t,...n)=>{if(t<e.logLevel)return;(new Date).toISOString();if(!F[t])throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class ${constructor(e){this.name=e,this._logLevel=V,this._logHandler=B,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?U[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}let q,j;const H=new WeakMap,G=new WeakMap,z=new WeakMap,K=new WeakMap,W=new WeakMap;let Y={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return G.get(e);if("objectStoreNames"===t)return e.objectStoreNames||z.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return J(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Q(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(j||(j=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(Z(this),t),J(H.get(this))}:function(...t){return J(e.apply(Z(this),t))}:function(t,...n){const r=e.call(Z(this),t,...n);return z.set(r,t.sort?t.sort():[t]),J(r)}}function X(e){return"function"==typeof e?Q(e):(e instanceof IDBTransaction&&function(e){if(G.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",i),e.removeEventListener("abort",i)},s=()=>{t(),r()},i=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",s),e.addEventListener("error",i),e.addEventListener("abort",i)});G.set(e,t)}(e),t=e,(q||(q=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,Y):e);var t}function J(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",s),e.removeEventListener("error",i)},s=()=>{t(J(e.result)),r()},i=()=>{n(e.error),r()};e.addEventListener("success",s),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&H.set(t,e)}).catch(()=>{}),W.set(t,e),t}(e);if(K.has(e))return K.get(e);const t=X(e);return t!==e&&(K.set(e,t),W.set(t,e)),t}const Z=e=>W.get(e);const ee=["get","getKey","getAll","getAllKeys","count"],te=["put","add","delete","clear"],ne=new Map;function re(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(ne.get(t))return ne.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=te.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!s&&!ee.includes(n))return;const i=async function(e,...t){const i=this.transaction(e,s?"readwrite":"readonly");let a=i.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),s&&i.done]))[0]};return ne.set(t,i),i}Y=(e=>({...e,get:(t,n,r)=>re(t,n)||e.get(t,n,r),has:(t,n)=>!!re(t,n)||e.has(t,n)}))(Y);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class se{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const ie="@firebase/app",ae="0.15.1",oe=new $("@firebase/app"),ue="@firebase/app-compat",ce="@firebase/analytics-compat",le="@firebase/analytics",he="@firebase/app-check-compat",de="@firebase/app-check",pe="@firebase/auth",fe="@firebase/auth-compat",ge="@firebase/database",me="@firebase/data-connect",ye="@firebase/database-compat",_e="@firebase/functions",ve="@firebase/functions-compat",we="@firebase/installations",Ee="@firebase/installations-compat",Te="@firebase/messaging",be="@firebase/messaging-compat",Ie="@firebase/performance",Ce="@firebase/performance-compat",Ae="@firebase/remote-config",Se="@firebase/remote-config-compat",Ne="@firebase/storage",Re="@firebase/storage-compat",Oe="@firebase/firestore",ke="@firebase/ai",De="@firebase/firestore-compat",Le="firebase",Pe="[DEFAULT]",xe={[ie]:"fire-core",[ue]:"fire-core-compat",[le]:"fire-analytics",[ce]:"fire-analytics-compat",[de]:"fire-app-check",[he]:"fire-app-check-compat",[pe]:"fire-auth",[fe]:"fire-auth-compat",[ge]:"fire-rtdb",[me]:"fire-data-connect",[ye]:"fire-rtdb-compat",[_e]:"fire-fn",[ve]:"fire-fn-compat",[we]:"fire-iid",[Ee]:"fire-iid-compat",[Te]:"fire-fcm",[be]:"fire-fcm-compat",[Ie]:"fire-perf",[Ce]:"fire-perf-compat",[Ae]:"fire-rc",[Se]:"fire-rc-compat",[Ne]:"fire-gcs",[Re]:"fire-gcs-compat",[Oe]:"fire-fst",[De]:"fire-fst-compat",[ke]:"fire-vertex","fire-js":"fire-js",[Le]:"fire-js-all"},Me=new Map,Ue=new Map,Ve=new Map;function Fe(e,t){try{e.container.addComponent(t)}catch(Yd){oe.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,Yd)}}function Be(e){const t=e.name;if(Ve.has(t))return oe.debug(`There were multiple attempts to register component ${t}.`),!1;Ve.set(t,e);for(const n of Me.values())Fe(n,e);for(const n of Ue.values())Fe(n,e);return!0}function $e(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function qe(e){return null!=e&&void 0!==e.settings}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const je=new v("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class He{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new k("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw je.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ge="12.16.0";function ze(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const r={name:Pe,automaticDataCollectionEnabled:!0,...t},s=r.name;if("string"!=typeof s||!s)throw je.create("bad-app-name",{appName:String(s)});if(n||(n=d()),!n)throw je.create("no-options");const i=Me.get(s);if(i){if(E(n,i.options)&&E(r,i.config))return i;throw je.create("duplicate-app",{appName:s})}const a=new P(s);for(const u of Ve.values())a.addComponent(u);const o=new He(n,r,a);return Me.set(s,o),o}function Ke(e=Pe){const t=Me.get(e);if(!t&&e===Pe&&d())return ze();if(!t)throw je.create("no-app",{appName:e});return t}function We(e,t,n){let r=xe[e]??e;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const e=[`Unable to register library "${r}" with version "${t}":`];return s&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&e.push("and"),i&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void oe.warn(e.join(" "))}Be(new k(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ye="firebase-heartbeat-store";let Qe=null;function Xe(){return Qe||(Qe=function(e,t,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(e,t),o=J(a);return r&&a.addEventListener("upgradeneeded",e=>{r(J(a.result),e.oldVersion,e.newVersion,J(a.transaction),e)}),n&&a.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),o.then(e=>{i&&e.addEventListener("close",()=>i()),s&&e.addEventListener("versionchange",e=>s(e.oldVersion,e.newVersion,e))}).catch(()=>{}),o}("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(Ye)}catch(Yd){}}}).catch(e=>{throw je.create("idb-open",{originalErrorMessage:e.message})})),Qe}async function Je(e,t){try{const n=(await Xe()).transaction(Ye,"readwrite"),r=n.objectStore(Ye);await r.put(t,Ze(e)),await n.done}catch(Yd){if(Yd instanceof _)oe.warn(Yd.message);else{const t=je.create("idb-set",{originalErrorMessage:null==Yd?void 0:Yd.message});oe.warn(t.message)}}}function Ze(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new nt(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=tt();if(null==(null==(e=this._heartbeatsCache)?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null==(t=this._heartbeatsCache)?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(Yd){oe.warn(Yd)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null==(e=this._heartbeatsCache)?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=tt(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){const n=[];let r=e.slice();for(const s of e){const e=n.find(e=>e.agent===s.agent);if(e){if(e.dates.push(s.date),rt(n)>t){e.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),rt(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),s=a(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(Yd){return oe.warn(Yd),""}}}function tt(){return(new Date).toISOString().substring(0,10)}class nt{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(Yd){return!1}}()&&new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var e;t((null==(e=s.error)?void 0:e.message)||"")}}catch(n){t(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await Xe()).transaction(Ye),n=await t.objectStore(Ye).get(Ze(e));return await t.done,n}catch(Yd){if(Yd instanceof _)oe.warn(Yd.message);else{const t=je.create("idb-get",{originalErrorMessage:null==Yd?void 0:Yd.message});oe.warn(t.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Je(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Je(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function rt(e){return a(JSON.stringify({version:2,heartbeats:e})).length}var st;st="",Be(new k("platform-logger",e=>new se(e),"PRIVATE")),Be(new k("heartbeat",e=>new et(e),"PRIVATE")),We(ie,ae,st),We(ie,ae,"esm2020"),We("fire-js","");var it,at,ot="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function n(e,t,n){n||(n=0);const r=Array(16);if("string"==typeof t)for(var s=0;s<16;++s)r[s]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(s=0;s<16;++s)r[s]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],s=e.g[2];let i,a=e.g[3];i=t+(a^n&(s^a))+r[0]+3614090360&4294967295,i=a+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[1]+3905402710&4294967295,a=t+(i<<12&4294967295|i>>>20),i=s+(n^a&(t^n))+r[2]+606105819&4294967295,i=n+(t^(s=a+(i<<17&4294967295|i>>>15))&(a^t))+r[3]+3250441966&4294967295,i=t+(a^(n=s+(i<<22&4294967295|i>>>10))&(s^a))+r[4]+4118548399&4294967295,i=a+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[5]+1200080426&4294967295,a=t+(i<<12&4294967295|i>>>20),i=s+(n^a&(t^n))+r[6]+2821735955&4294967295,i=n+(t^(s=a+(i<<17&4294967295|i>>>15))&(a^t))+r[7]+4249261313&4294967295,i=t+(a^(n=s+(i<<22&4294967295|i>>>10))&(s^a))+r[8]+1770035416&4294967295,i=a+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[9]+2336552879&4294967295,a=t+(i<<12&4294967295|i>>>20),i=s+(n^a&(t^n))+r[10]+4294925233&4294967295,i=n+(t^(s=a+(i<<17&4294967295|i>>>15))&(a^t))+r[11]+2304563134&4294967295,i=t+(a^(n=s+(i<<22&4294967295|i>>>10))&(s^a))+r[12]+1804603682&4294967295,i=a+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[13]+4254626195&4294967295,a=t+(i<<12&4294967295|i>>>20),i=s+(n^a&(t^n))+r[14]+2792965006&4294967295,i=n+(t^(s=a+(i<<17&4294967295|i>>>15))&(a^t))+r[15]+1236535329&4294967295,i=t+(s^a&((n=s+(i<<22&4294967295|i>>>10))^s))+r[1]+4129170786&4294967295,i=a+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[6]+3225465664&4294967295,a=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(a^t))+r[11]+643717713&4294967295,i=n+(a^t&((s=a+(i<<14&4294967295|i>>>18))^a))+r[0]+3921069994&4294967295,i=t+(s^a&((n=s+(i<<20&4294967295|i>>>12))^s))+r[5]+3593408605&4294967295,i=a+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[10]+38016083&4294967295,a=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(a^t))+r[15]+3634488961&4294967295,i=n+(a^t&((s=a+(i<<14&4294967295|i>>>18))^a))+r[4]+3889429448&4294967295,i=t+(s^a&((n=s+(i<<20&4294967295|i>>>12))^s))+r[9]+568446438&4294967295,i=a+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[14]+3275163606&4294967295,a=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(a^t))+r[3]+4107603335&4294967295,i=n+(a^t&((s=a+(i<<14&4294967295|i>>>18))^a))+r[8]+1163531501&4294967295,i=t+(s^a&((n=s+(i<<20&4294967295|i>>>12))^s))+r[13]+2850285829&4294967295,i=a+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[2]+4243563512&4294967295,a=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(a^t))+r[7]+1735328473&4294967295,i=n+(a^t&((s=a+(i<<14&4294967295|i>>>18))^a))+r[12]+2368359562&4294967295,i=t+((n=s+(i<<20&4294967295|i>>>12))^s^a)+r[5]+4294588738&4294967295,i=a+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[8]+2272392833&4294967295,a=t+(i<<11&4294967295|i>>>21),i=s+(a^t^n)+r[11]+1839030562&4294967295,i=n+((s=a+(i<<16&4294967295|i>>>16))^a^t)+r[14]+4259657740&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^a)+r[1]+2763975236&4294967295,i=a+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[4]+1272893353&4294967295,a=t+(i<<11&4294967295|i>>>21),i=s+(a^t^n)+r[7]+4139469664&4294967295,i=n+((s=a+(i<<16&4294967295|i>>>16))^a^t)+r[10]+3200236656&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^a)+r[13]+681279174&4294967295,i=a+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[0]+3936430074&4294967295,a=t+(i<<11&4294967295|i>>>21),i=s+(a^t^n)+r[3]+3572445317&4294967295,i=n+((s=a+(i<<16&4294967295|i>>>16))^a^t)+r[6]+76029189&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^a)+r[9]+3654602809&4294967295,i=a+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[12]+3873151461&4294967295,a=t+(i<<11&4294967295|i>>>21),i=s+(a^t^n)+r[15]+530742520&4294967295,i=n+((s=a+(i<<16&4294967295|i>>>16))^a^t)+r[2]+3299628645&4294967295,i=t+(s^((n=s+(i<<23&4294967295|i>>>9))|~a))+r[0]+4096336452&4294967295,i=a+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[7]+1126891415&4294967295,a=t+(i<<10&4294967295|i>>>22),i=s+(t^(a|~n))+r[14]+2878612391&4294967295,i=n+(a^((s=a+(i<<15&4294967295|i>>>17))|~t))+r[5]+4237533241&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~a))+r[12]+1700485571&4294967295,i=a+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[3]+2399980690&4294967295,a=t+(i<<10&4294967295|i>>>22),i=s+(t^(a|~n))+r[10]+4293915773&4294967295,i=n+(a^((s=a+(i<<15&4294967295|i>>>17))|~t))+r[1]+2240044497&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~a))+r[8]+1873313359&4294967295,i=a+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[15]+4264355552&4294967295,a=t+(i<<10&4294967295|i>>>22),i=s+(t^(a|~n))+r[6]+2734768916&4294967295,i=n+(a^((s=a+(i<<15&4294967295|i>>>17))|~t))+r[13]+1309151649&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~a))+r[4]+4149444226&4294967295,i=a+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[11]+3174756917&4294967295,a=t+(i<<10&4294967295|i>>>22),i=s+(t^(a|~n))+r[2]+718787259&4294967295,i=n+(a^((s=a+(i<<15&4294967295|i>>>17))|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(s+(i<<21&4294967295|i>>>11))&4294967295,e.g[2]=e.g[2]+s&4294967295,e.g[3]=e.g[3]+a&4294967295}function r(e,t){this.h=t;const n=[];let r=!0;for(let s=e.length-1;s>=0;s--){const i=0|e[s];r&&i==t||(n[s]=i,r=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.F=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.D=function(e,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return t.prototype[n].apply(e,s)}}(t,function(){this.blockSize=-1}),t.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.v=function(e,t){void 0===t&&(t=e.length);const r=t-this.blockSize,s=this.C;let i=this.h,a=0;for(;a<t;){if(0==i)for(;a<=r;)n(this,e,a),a+=this.blockSize;if("string"==typeof e){for(;a<t;)if(s[i++]=e.charCodeAt(a++),i==this.blockSize){n(this,s),i=0;break}}else for(;a<t;)if(s[i++]=e[a++],i==this.blockSize){n(this,s),i=0;break}}this.h=i,this.o+=t},t.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var n=e.length-8;n<e.length;++n)e[n]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,n=0;n<4;++n)for(let r=0;r<32;r+=8)e[t++]=this.g[n]>>>r&255;return e};var s={};function i(e){return-128<=e&&e<128?function(e,t){var n=s;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,function(e){return new r([0|e],e<0?-1:0)}):new r([0|e],e<0?-1:0)}function a(e){if(isNaN(e)||!isFinite(e))return o;if(e<0)return d(a(-e));const t=[];let n=1;for(let r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new r(t,0)}var o=i(0),u=i(1),c=i(16777216);function l(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function h(e){return-1==e.h}function d(e){const t=e.g.length,n=[];for(let r=0;r<t;r++)n[r]=~e.g[r];return new r(n,~e.h).add(u)}function p(e,t){return e.add(d(t))}function f(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function g(e,t){this.g=e,this.h=t}function m(e,t){if(l(t))throw Error("division by zero");if(l(e))return new g(o,o);if(h(e))return t=m(d(e),t),new g(d(t.g),d(t.h));if(h(t))return t=m(e,d(t)),new g(d(t.g),t.h);if(e.g.length>30){if(h(e)||h(t))throw Error("slowDivide_ only works with positive integers.");for(var n=u,r=t;r.l(e)<=0;)n=y(n),r=y(r);var s=_(n,1),i=_(r,1);for(r=_(r,2),n=_(n,2);!l(r);){var c=i.add(r);c.l(e)<=0&&(s=s.add(n),i=c),r=_(r,1),n=_(n,1)}return t=p(e,s.j(t)),new g(s,t)}for(s=o;e.l(t)>=0;){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=(r=Math.ceil(Math.log(n)/Math.LN2))<=48?1:Math.pow(2,r-48),c=(i=a(n)).j(t);h(c)||c.l(e)>0;)c=(i=a(n-=r)).j(t);l(i)&&(i=u),s=s.add(i),e=p(e,c)}return new g(s,e)}function y(e){const t=e.g.length+1,n=[];for(let r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new r(n,e.h)}function _(e,t){const n=t>>5;t%=32;const s=e.g.length-n,i=[];for(let r=0;r<s;r++)i[r]=t>0?e.i(r+n)>>>t|e.i(r+n+1)<<32-t:e.i(r+n);return new r(i,e.h)}(e=r.prototype).m=function(){if(h(this))return-d(this).m();let e=0,t=1;for(let n=0;n<this.g.length;n++){const r=this.i(n);e+=(r>=0?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(l(this))return"0";if(h(this))return"-"+d(this).toString(e);const t=a(Math.pow(e,6));var n=this;let r="";for(;;){const s=m(n,t).g;let i=(((n=p(n,s.j(t))).g.length>0?n.g[0]:n.h)>>>0).toString(e);if(l(n=s))return i+r;for(;i.length<6;)i="0"+i;r=i+r}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return h(e=p(this,e))?-1:l(e)?0:1},e.abs=function(){return h(this)?d(this):this},e.add=function(e){const t=Math.max(this.g.length,e.g.length),n=[];let s=0;for(let r=0;r<=t;r++){let t=s+(65535&this.i(r))+(65535&e.i(r)),i=(t>>>16)+(this.i(r)>>>16)+(e.i(r)>>>16);s=i>>>16,t&=65535,i&=65535,n[r]=i<<16|t}return new r(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(l(this)||l(e))return o;if(h(this))return h(e)?d(this).j(d(e)):d(d(this).j(e));if(h(e))return d(this.j(d(e)));if(this.l(c)<0&&e.l(c)<0)return a(this.m()*e.m());const t=this.g.length+e.g.length,n=[];for(var s=0;s<2*t;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(let t=0;t<e.g.length;t++){const r=this.i(s)>>>16,i=65535&this.i(s),a=e.i(t)>>>16,o=65535&e.i(t);n[2*s+2*t]+=i*o,f(n,2*s+2*t),n[2*s+2*t+1]+=r*o,f(n,2*s+2*t+1),n[2*s+2*t+1]+=i*a,f(n,2*s+2*t+1),n[2*s+2*t+2]+=r*a,f(n,2*s+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new r(n,0)},e.B=function(e){return m(this,e).h},e.and=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new r(n,this.h&e.h)},e.or=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new r(n,this.h|e.h)},e.xor=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new r(n,this.h^e.h)},t.prototype.digest=t.prototype.A,t.prototype.reset=t.prototype.u,t.prototype.update=t.prototype.v,at=t,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=a,r.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if((n=n||10)<2||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character');const r=a(Math.pow(n,8));let s=o;for(let o=0;o<t.length;o+=8){var i=Math.min(8,t.length-o);const e=parseInt(t.substring(o,o+i),n);i<8?(i=a(Math.pow(n,i)),s=s.j(i).add(a(e))):(s=s.j(r),s=s.add(a(e)))}return s},it=r}).apply(void 0!==ot?ot:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var ut,ct,lt,ht,dt,pt,ft,gt,mt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e,t=Object.defineProperty;var n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof mt&&mt];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);function r(e,r){if(r)e:{var s=n;e=e.split(".");for(var i=0;i<e.length-1;i++){var a=e[i];if(!(a in s))break e;s=s[a]}(r=r(i=s[e=e[e.length-1]]))!=i&&null!=r&&t(s,e,{configurable:!0,writable:!0,value:r})}}r("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(e){return e||function(e){var t,n=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.push([t,e[t]]);return n}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var s=s||{},i=this||self;function a(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function o(e,t,n){return e.call.apply(e.bind,arguments)}function u(e,t,n){return(u=o).apply(null,arguments)}function c(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function l(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Ob=function(e,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return t.prototype[n].apply(e,s)}}var h="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function d(e){const t=e.length;if(t>0){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function p(e,t){for(let r=1;r<arguments.length;r++){const t=arguments[r];var n=typeof t;if("array"==(n="object"!=n?n:t?Array.isArray(t)?"array":n:"null")||"object"==n&&"number"==typeof t.length){n=e.length||0;const r=t.length||0;e.length=n+r;for(let s=0;s<r;s++)e[n+s]=t[s]}else e.push(t)}}function f(e){i.setTimeout(()=>{throw e},0)}function g(){var e=w;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var m=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new y,e=>e.reset());class y{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let _,v=!1,w=new class{constructor(){this.h=this.g=null}add(e,t){const n=m.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},E=()=>{const e=Promise.resolve(void 0);_=()=>{e.then(T)}};function T(){for(var e;e=g();){try{e.h.call(e.g)}catch(n){f(n)}var t=m;t.j(e),t.h<100&&(t.h++,e.next=t.g,t.g=e)}v=!1}function b(){this.u=this.u,this.C=this.C}function I(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},I.prototype.h=function(){this.defaultPrevented=!0};var C=function(){if(!i.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};i.addEventListener("test",e,t),i.removeEventListener("test",e,t)}catch(n){}return e}();function A(e){return/^[\s\xa0]*$/.test(e)}function S(e,t){I.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}l(S,I),S.prototype.init=function(e,t){const n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,(t=e.relatedTarget)||("mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement)),this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&S.Z.h.call(this)},S.prototype.h=function(){S.Z.h.call(this);const e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var N="closure_listenable_"+(1e6*Math.random()|0),R=0;function O(e,t,n,r,s){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=s,this.key=++R,this.da=this.fa=!1}function k(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function D(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function L(e){const t={};for(const n in e)t[n]=e[n];return t}const P="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function x(e,t){let n,r;for(let s=1;s<arguments.length;s++){for(n in r=arguments[s],r)e[n]=r[n];for(let t=0;t<P.length;t++)n=P[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function M(e){this.src=e,this.g={},this.h=0}function U(e,t){const n=t.type;if(n in e.g){var r,s=e.g[n],i=Array.prototype.indexOf.call(s,t,void 0);(r=i>=0)&&Array.prototype.splice.call(s,i,1),r&&(k(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function V(e,t,n,r){for(let s=0;s<e.length;++s){const i=e[s];if(!i.da&&i.listener==t&&i.capture==!!n&&i.ha==r)return s}return-1}M.prototype.add=function(e,t,n,r,s){const i=e.toString();(e=this.g[i])||(e=this.g[i]=[],this.h++);const a=V(e,t,r,s);return a>-1?(t=e[a],n||(t.fa=!1)):((t=new O(t,this.src,i,!!r,s)).fa=n,e.push(t)),t};var F="closure_lm_"+(1e6*Math.random()|0),B={};function $(e,t,n,r,s){if(Array.isArray(t)){for(let i=0;i<t.length;i++)$(e,t[i],n,r,s);return null}return n=W(n),e&&e[N]?e.J(t,n,!!a(r)&&!!r.capture,s):function(e,t,n,r,s,i){if(!t)throw Error("Invalid event type");const o=a(s)?!!s.capture:!!s;let u=z(e);if(u||(e[F]=u=new M(e)),n=u.add(t,n,r,o,i),n.proxy)return n;if(r=function(){function e(n){return t.call(e.src,e.listener,n)}const t=G;return e}(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)C||(s=o),void 0===s&&(s=!1),e.addEventListener(t.toString(),r,s);else if(e.attachEvent)e.attachEvent(H(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}(e,t,n,!1,r,s)}function q(e,t,n,r,s){if(Array.isArray(t))for(var i=0;i<t.length;i++)q(e,t[i],n,r,s);else r=a(r)?!!r.capture:!!r,n=W(n),e&&e[N]?(e=e.i,(i=String(t).toString())in e.g&&((n=V(t=e.g[i],n,r,s))>-1&&(k(t[n]),Array.prototype.splice.call(t,n,1),0==t.length&&(delete e.g[i],e.h--)))):e&&(e=z(e))&&(t=e.g[t.toString()],e=-1,t&&(e=V(t,n,r,s)),(n=e>-1?t[e]:null)&&j(n))}function j(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[N])U(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(H(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=z(t))?(U(n,e),0==n.h&&(n.src=null,t[F]=null)):k(e)}}}function H(e){return e in B?B[e]:B[e]="on"+e}function G(e,t){if(e.da)e=!0;else{t=new S(t,this);const n=e.listener,r=e.ha||e.src;e.fa&&j(e),e=n.call(r,t)}return e}function z(e){return(e=e[F])instanceof M?e:null}var K="__closure_events_fn_"+(1e9*Math.random()>>>0);function W(e){return"function"==typeof e?e:(e[K]||(e[K]=function(t){return e.handleEvent(t)}),e[K])}function Y(){b.call(this),this.i=new M(this),this.M=this,this.G=null}function Q(e,t){var n,r=e.G;if(r)for(n=[];r;r=r.G)n.push(r);if(e=e.M,r=t.type||t,"string"==typeof t)t=new I(t,e);else if(t instanceof I)t.target=t.target||e;else{var s=t;x(t=new I(r,e),s)}let i,a;if(s=!0,n)for(a=n.length-1;a>=0;a--)i=t.g=n[a],s=X(i,r,!0,t)&&s;if(i=t.g=e,s=X(i,r,!0,t)&&s,s=X(i,r,!1,t)&&s,n)for(a=0;a<n.length;a++)i=t.g=n[a],s=X(i,r,!1,t)&&s}function X(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();let s=!0;for(let i=0;i<t.length;++i){const a=t[i];if(a&&!a.da&&a.capture==n){const t=a.listener,n=a.ha||a.src;a.fa&&U(e.i,a),s=!1!==t.call(n,r)&&s}}return s&&!r.defaultPrevented}function J(e){e.g=function(e,t){if("function"!=typeof e){if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=u(e.handleEvent,e)}return Number(t)>2147483647?-1:i.setTimeout(e,t||0)}(()=>{e.g=null,e.i&&(e.i=!1,J(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}l(Y,b),Y.prototype[N]=!0,Y.prototype.removeEventListener=function(e,t,n,r){q(this,e,t,n,r)},Y.prototype.N=function(){if(Y.Z.N.call(this),this.i){var e=this.i;for(const t in e.g){const n=e.g[t];for(let e=0;e<n.length;e++)k(n[e]);delete e.g[t],e.h--}}this.G=null},Y.prototype.J=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},Y.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class Z extends b{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:J(this)}N(){super.N(),this.g&&(i.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ee(e){b.call(this),this.h=e,this.g={}}l(ee,b);var te=[];function ne(e){D(e.g,function(e,t){this.g.hasOwnProperty(t)&&j(e)},e),e.g={}}ee.prototype.N=function(){ee.Z.N.call(this),ne(this)},ee.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var re=i.JSON.stringify,se=i.JSON.parse,ie=class{stringify(e){return i.JSON.stringify(e,void 0)}parse(e){return i.JSON.parse(e,void 0)}};function ae(){}function oe(){}var ue={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ce(){I.call(this,"d")}function le(){I.call(this,"c")}l(ce,I),l(le,I);var he={},de=null;function pe(){return de=de||new Y}function fe(e){I.call(this,he.Ia,e)}function ge(e){const t=pe();Q(t,new fe(t))}function me(e,t){I.call(this,he.STAT_EVENT,e),this.stat=t}function ye(e){const t=pe();Q(t,new me(t,e))}function _e(e,t){I.call(this,he.Ja,e),this.size=t}function ve(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return i.setTimeout(function(){e()},t)}function we(){this.g=!0}function Ee(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{const i=JSON.parse(t);if(i)for(e=0;e<i.length;e++)if(Array.isArray(i[e])){var n=i[e];if(!(n.length<2)){var r=n[1];if(Array.isArray(r)&&!(r.length<1)){var s=r[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(let e=1;e<r.length;e++)r[e]=""}}}return re(i)}catch(i){return t}}(e,n)+(r?" "+r:"")})}he.Ia="serverreachability",l(fe,I),he.STAT_EVENT="statevent",l(me,I),he.Ja="timingevent",l(_e,I),we.prototype.ua=function(){this.g=!1},we.prototype.info=function(){};var Te,be={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ie={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function Ce(){}function Ae(e){return encodeURIComponent(String(e))}function Se(e){var t=1;e=e.split(":");const n=[];for(;t>0&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function Ne(e,t,n,r){this.j=e,this.i=t,this.l=n,this.S=r||1,this.V=new ee(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Re}function Re(){this.i=null,this.g="",this.h=!1}l(Ce,ae),Ce.prototype.g=function(){return new XMLHttpRequest},Te=new Ce;var Oe={},ke={};function De(e,t,n){e.M=1,e.A=rt(Je(t)),e.u=n,e.R=!0,Le(e,null)}function Le(e,t){e.F=Date.now(),Me(e),e.B=Je(e.A);var n=e.B,r=e.S;Array.isArray(r)||(r=[String(r)]),At(n.i,"t",r),e.C=0,n=e.j.L,e.h=new Re,e.g=pn(e.j,n?t:null,!e.u),e.P>0&&(e.O=new Z(u(e.Y,e,e.g),e.P)),t=e.V,n=e.g,r=e.ba;var s="readystatechange";Array.isArray(s)||(s&&(te[0]=s.toString()),s=te);for(let i=0;i<s.length;i++){const e=$(n,s[i],r||t.handleEvent,!1,t.h||t);if(!e)break;t.g[e.key]=e}t=e.J?L(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),ge(),function(e,t,n,r,s,i){e.info(function(){if(e.g)if(i){var a="",o=i.split("&");for(let e=0;e<o.length;e++){var u=o[e].split("=");if(u.length>1){const e=u[0];u=u[1];const t=e.split("_");a=t.length>=2&&"type"==t[1]?a+(e+"=")+u+"&":a+(e+"=redacted&")}}}else a=null;else a=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+t+"\n"+n+"\n"+a})}(e.i,e.v,e.B,e.l,e.S,e.u)}function Pe(e){return!!e.g&&("GET"==e.v&&2!=e.M&&e.j.Aa)}function xe(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?ke:(n=Number(t.substring(n,r)),isNaN(n)?Oe:(r+=1)+n>t.length?ke:(t=t.slice(r,r+n),e.C=r+n,t))}function Me(e){e.T=Date.now()+e.H,Ue(e,e.H)}function Ue(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=ve(u(e.aa,e),t)}function Ve(e){e.D&&(i.clearTimeout(e.D),e.D=null)}function Fe(e){0==e.j.I||e.K||un(e.j,e)}function Be(e){Ve(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,ne(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function $e(e,t){try{var n=e.j;if(0!=n.I&&(n.g==e||ze(n.h,e)))if(!e.L&&ze(n.h,e)&&3==n.I){try{var r=n.Ba.g.parse(t)}catch(l){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){e:if(!n.v){if(n.g){if(!(n.g.F+3e3<e.F))break e;on(n),Qt(n)}rn(n),ye(18)}}else n.xa=s[1],0<n.xa-n.K&&s[2]<37500&&n.F&&0==n.A&&!n.C&&(n.C=ve(u(n.Va,n),6e3));Ge(n.h)<=1&&n.ta&&(n.ta=void 0)}else ln(n,11)}else if((e.L||n.g==e)&&on(n),!A(t))for(s=n.Ba.g.parse(t),t=0;t<s.length;t++){let u=s[t];const l=u[0];if(!(l<=n.K))if(n.K=l,u=u[1],2==n.I)if("c"==u[0]){n.M=u[1],n.ba=u[2];const t=u[3];null!=t&&(n.ka=t,n.j.info("VER="+n.ka));const s=u[4];null!=s&&(n.za=s,n.j.info("SVER="+n.za));const l=u[5];null!=l&&"number"==typeof l&&l>0&&(r=1.5*l,n.O=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var i=r.h;i.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(Ke(i,i.h),i.h=null))}if(r.G){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.wa=e,nt(r.J,r.G,e))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-e.F,n.j.info("Handshake RTT: "+n.T+"ms"));var a=e;if((r=n).na=dn(r,r.L?r.ba:null,r.W),a.L){We(r.h,a);var o=a,c=r.O;c&&(o.H=c),o.D&&(Ve(o),Me(o)),r.g=a}else nn(r);n.i.length>0&&Jt(n)}else"stop"!=u[0]&&"close"!=u[0]||ln(n,7);else 3==n.I&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?ln(n,7):Yt(n):"noop"!=u[0]&&n.l&&n.l.qa(u),n.A=0)}ge()}catch(l){}}Ne.prototype.ba=function(e){e=e.target;const t=this.O;t&&3==Gt(e)?t.j():this.Y(e)},Ne.prototype.Y=function(e){try{if(e==this.g)e:{const u=Gt(this.g),c=this.g.ya();this.g.ca();if(!(u<3)&&(3!=u||this.g&&(this.h.h||this.g.la()||zt(this.g)))){this.K||4!=u||7==c||ge(),Ve(this);var t=this.g.ca();this.X=t;var n=function(e){if(!Pe(e))return e.g.la();const t=zt(e.g);if(""===t)return"";let n="";const r=t.length,s=4==Gt(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return Be(e),Fe(e),"";e.h.i=new i.TextDecoder}for(let i=0;i<r;i++)e.h.h=!0,n+=e.h.i.decode(t[i],{stream:!(s&&i==r-1)});return t.length=0,e.h.g+=n,e.C=0,e.h.g}(this);if(this.o=200==t,function(e,t,n,r,s,i,a){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+t+"\n"+n+"\n"+i+" "+a})}(this.i,this.v,this.B,this.l,this.S,u,t),this.o){if(this.U&&!this.L){t:{if(this.g){var r,s=this.g;if((r=s.g?s.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!A(r)){var a=r;break t}}a=null}if(!(e=a)){this.o=!1,this.m=3,ye(12),Be(this),Fe(this);break e}Ee(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,$e(this,e)}if(this.R){let t;for(e=!0;!this.K&&this.C<n.length;){if(t=xe(this,n),t==ke){4==u&&(this.m=4,ye(14),e=!1),Ee(this.i,this.l,null,"[Incomplete Response]");break}if(t==Oe){this.m=4,ye(15),Ee(this.i,this.l,n,"[Invalid Chunk]"),e=!1;break}Ee(this.i,this.l,t,null),$e(this,t)}if(Pe(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=u||0!=n.length||this.h.h||(this.m=1,ye(16),e=!1),this.o=this.o&&e,e){if(n.length>0&&!this.W){this.W=!0;var o=this.j;o.g==this&&o.aa&&!o.P&&(o.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),sn(o),o.P=!0,ye(11))}}else Ee(this.i,this.l,n,"[Invalid Chunked Response]"),Be(this),Fe(this)}else Ee(this.i,this.l,n,null),$e(this,n);4==u&&Be(this),this.o&&!this.K&&(4==u?un(this.j,this):(this.o=!1,Me(this)))}else(function(e){const t={};e=(e.g&&Gt(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(A(e[r]))continue;var n=Se(e[r]);const s=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=t[s]||[];t[s]=i,i.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==t&&n.indexOf("Unknown SID")>0?(this.m=3,ye(12)):(this.m=0,ye(13)),Be(this),Fe(this)}}}catch(u){}},Ne.prototype.cancel=function(){this.K=!0,Be(this)},Ne.prototype.aa=function(){this.D=null;const e=Date.now();e-this.T>=0?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.B),2!=this.M&&(ge(),ye(17)),Be(this),this.m=2,Fe(this)):Ue(this,this.T-e)};var qe=class{constructor(e,t){this.g=e,this.map=t}};function je(e){this.l=e||10,i.PerformanceNavigationTiming?e=(e=i.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(i.chrome&&i.chrome.loadTimes&&i.chrome.loadTimes()&&i.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function He(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Ge(e){return e.h?1:e.g?e.g.size:0}function ze(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Ke(e,t){e.g?e.g.add(t):e.h=t}function We(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Ye(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.G);return t}return d(e.i)}je.prototype.cancel=function(){if(this.i=Ye(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var Qe=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xe(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof Xe?(this.l=e.l,Ze(this,e.j),this.o=e.o,this.g=e.g,et(this,e.u),this.h=e.h,tt(this,St(e.i)),this.m=e.m):e&&(t=String(e).match(Qe))?(this.l=!1,Ze(this,t[1]||"",!0),this.o=st(t[2]||""),this.g=st(t[3]||"",!0),et(this,t[4]),this.h=st(t[5]||"",!0),tt(this,t[6]||"",!0),this.m=st(t[7]||"")):(this.l=!1,this.i=new Et(null,this.l))}function Je(e){return new Xe(e)}function Ze(e,t,n){e.j=n?st(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function et(e,t){if(t){if(t=Number(t),isNaN(t)||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function tt(e,t,n){t instanceof Et?(e.i=t,function(e,t){t&&!e.j&&(Tt(e),e.i=null,e.g.forEach(function(e,t){const n=t.toLowerCase();t!=n&&(bt(this,t),At(this,n,e))},e)),e.j=t}(e.i,e.l)):(n||(t=it(t,vt)),e.i=new Et(t,e.l))}function nt(e,t,n){e.i.set(t,n)}function rt(e){return nt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function st(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function it(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,at),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function at(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}Xe.prototype.toString=function(){const e=[];var t=this.j;t&&e.push(it(t,ot,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(it(t,ot,!0),"@"),e.push(Ae(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.u)&&e.push(":",String(n))),(n=this.h)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(it(n,"/"==n.charAt(0)?_t:yt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",it(n,wt)),e.join("")},Xe.prototype.resolve=function(e){const t=Je(this);let n=!!e.j;n?Ze(t,e.j):n=!!e.o,n?t.o=e.o:n=!!e.g,n?t.g=e.g:n=null!=e.u;var r=e.h;if(n)et(t,e.u);else if(n=!!e.h){if("/"!=r.charAt(0))if(this.g&&!this.h)r="/"+r;else{var s=t.h.lastIndexOf("/");-1!=s&&(r=t.h.slice(0,s+1)+r)}if(".."==(s=r)||"."==s)r="";else if(-1!=s.indexOf("./")||-1!=s.indexOf("/.")){r=0==s.lastIndexOf("/",0),s=s.split("/");const e=[];for(let t=0;t<s.length;){const n=s[t++];"."==n?r&&t==s.length&&e.push(""):".."==n?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),r&&t==s.length&&e.push("")):(e.push(n),r=!0)}r=e.join("/")}else r=s}return n?t.h=r:n=""!==e.i.toString(),n?tt(t,St(e.i)):n=!!e.m,n&&(t.m=e.m),t};var ot=/[#\/\?@]/g,yt=/[#\?:]/g,_t=/[#\?]/g,vt=/[#\?@]/g,wt=/#/g;function Et(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function Tt(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(let n=0;n<e.length;n++){const r=e[n].indexOf("=");let s,i=null;r>=0?(s=e[n].substring(0,r),i=e[n].substring(r+1)):s=e[n],t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function bt(e,t){Tt(e),t=Nt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function It(e,t){return Tt(e),t=Nt(e,t),e.g.has(t)}function Ct(e,t){Tt(e);let n=[];if("string"==typeof t)It(e,t)&&(n=n.concat(e.g.get(Nt(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)n=n.concat(e[t]);return n}function At(e,t,n){bt(e,t),n.length>0&&(e.i=null,e.g.set(Nt(e,t),d(n)),e.h+=n.length)}function St(e){const t=new Et;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function Nt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function Rt(e,t,n,r,s){try{s&&(s.onload=null,s.onerror=null,s.onabort=null,s.ontimeout=null),r(n)}catch(i){}}function Ot(){this.g=new ie}function kt(e){this.i=e.Sb||null,this.h=e.ab||!1}function Dt(e,t){Y.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function Lt(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function Pt(e){e.readyState=4,e.l=null,e.j=null,e.B=null,xt(e)}function xt(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function Mt(e){let t="";return D(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function Ut(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=Mt(n),"string"==typeof e?null!=n&&Ae(n):nt(e,t,n))}function Vt(e){Y.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(e=Et.prototype).add=function(e,t){Tt(this),this.i=null,e=Nt(this,e);let n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){Tt(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},e.set=function(e,t){return Tt(this),this.i=null,It(this,e=Nt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&(e=Ct(this,e)).length>0?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(let r=0;r<t.length;r++){var n=t[r];const s=Ae(n);n=Ct(this,n);for(let t=0;t<n.length;t++){let r=s;""!==n[t]&&(r+="="+Ae(n[t])),e.push(r)}}return this.i=e.join("&")},l(kt,ae),kt.prototype.g=function(){return new Dt(this.i,this.h)},l(Dt,Y),(e=Dt.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,xt(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||i).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,Pt(this)),this.readyState=0},e.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,xt(this)),this.g&&(this.readyState=3,xt(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==i.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Lt(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))},e.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Pt(this):xt(this),3==this.readyState&&Lt(this)}},e.Oa=function(e){this.g&&(this.response=this.responseText=e,Pt(this))},e.Na=function(e){this.g&&(this.response=e,Pt(this))},e.ga=function(){this.g&&Pt(this)},e.setRequestHeader=function(e,t){this.A.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(Dt.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),l(Vt,Y);var Ft=/^https?$/i,Bt=["POST","PUT"];function $t(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,qt(e),Ht(e)}function qt(e){e.A||(e.A=!0,Q(e,"complete"),Q(e,"error"))}function jt(e){if(e.h&&void 0!==s)if(e.v&&4==Gt(e))setTimeout(e.Ca.bind(e),0);else if(Q(e,"readystatechange"),4==Gt(e)){e.h=!1;try{const s=e.ca();e:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===s){let t=String(e.D).match(Qe)[1]||null;!t&&i.self&&i.self.location&&(t=i.self.location.protocol.slice(0,-1)),r=!Ft.test(t?t.toLowerCase():"")}n=r}if(n)Q(e,"complete"),Q(e,"success");else{e.o=6;try{var a=Gt(e)>2?e.g.statusText:""}catch(o){a=""}e.l=a+" ["+e.ca()+"]",qt(e)}}finally{Ht(e)}}}function Ht(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);const r=e.g;e.g=null,t||Q(e,"ready");try{r.onreadystatechange=null}catch(n){}}}function Gt(e){return e.g?e.g.readyState:0}function zt(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Kt(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Wt(e){this.za=0,this.i=[],this.j=new we,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Kt("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Kt("baseRetryDelayMs",5e3,e),this.Za=Kt("retryDelaySeedMs",1e4,e),this.Ta=Kt("forwardChannelMaxRetries",2,e),this.va=Kt("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new je(e&&e.concurrentRequestLimit),this.Ba=new Ot,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function Yt(e){if(Xt(e),3==e.I){var t=e.V++,n=Je(e.J);if(nt(n,"SID",e.M),nt(n,"RID",t),nt(n,"TYPE","terminate"),en(e,n),(t=new Ne(e,e.j,t)).M=2,t.A=rt(Je(n)),n=!1,i.navigator&&i.navigator.sendBeacon)try{n=i.navigator.sendBeacon(t.A.toString(),"")}catch(r){}!n&&i.Image&&((new Image).src=t.A,n=!0),n||(t.g=pn(t.j,null),t.g.ea(t.A)),t.F=Date.now(),Me(t)}hn(e)}function Qt(e){e.g&&(sn(e),e.g.cancel(),e.g=null)}function Xt(e){Qt(e),e.v&&(i.clearTimeout(e.v),e.v=null),on(e),e.h.cancel(),e.m&&("number"==typeof e.m&&i.clearTimeout(e.m),e.m=null)}function Jt(e){if(!He(e.h)&&!e.m){e.m=!0;var t=e.Ea;_||E(),v||(_(),v=!0),w.add(t,e),e.D=0}}function Zt(e,t){var n;n=t?t.l:e.V++;const r=Je(e.J);nt(r,"SID",e.M),nt(r,"RID",n),nt(r,"AID",e.K),en(e,r),e.u&&e.o&&Ut(r,e.u,e.o),n=new Ne(e,e.j,n,e.D+1),null===e.u&&(n.J=e.o),t&&(e.i=t.G.concat(e.i)),t=tn(e,n,1e3),n.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),Ke(e.h,n),De(n,r,t)}function en(e,t){e.H&&D(e.H,function(e,n){nt(t,n,e)}),e.l&&D({},function(e,n){nt(t,n,e)})}function tn(e,t,n){n=Math.min(e.i.length,n);const r=e.l?u(e.l.Ka,e.l,e):null;e:{var s=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?n>0?(t=s[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let u=!0;for(let l=0;l<n;l++){var i=s[l].g;const n=s[l].map;if((i-=t)<0)t=Math.max(0,s[l].g-100),u=!1;else try{i="req"+i+"_"||"";try{var o=n instanceof Map?n:Object.entries(n);for(const[t,n]of o){let r=n;a(n)&&(r=re(n)),e.push(i+t+"="+encodeURIComponent(r))}}catch(c){throw e.push(i+"type="+encodeURIComponent("_badmap")),c}}catch(c){r&&r(n)}}if(u){o=e.join("&");break e}}o=void 0}return e=e.i.splice(0,n),t.G=e,o}function nn(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;_||E(),v||(_(),v=!0),w.add(t,e),e.A=0}}function rn(e){return!(e.g||e.v||e.A>=3)&&(e.Y++,e.v=ve(u(e.Da,e),cn(e,e.A)),e.A++,!0)}function sn(e){null!=e.B&&(i.clearTimeout(e.B),e.B=null)}function an(e){e.g=new Ne(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=Je(e.na);nt(t,"RID","rpc"),nt(t,"SID",e.M),nt(t,"AID",e.K),nt(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&nt(t,"TO",e.ia),nt(t,"TYPE","xmlhttp"),en(e,t),e.u&&e.o&&Ut(t,e.u,e.o),e.O&&(e.g.H=e.O);var n=e.g;e=e.ba,n.M=1,n.A=rt(Je(t)),n.u=null,n.R=!0,Le(n,e)}function on(e){null!=e.C&&(i.clearTimeout(e.C),e.C=null)}function un(e,t){var n=null;if(e.g==t){on(e),sn(e),e.g=null;var r=2}else{if(!ze(e.h,t))return;n=t.G,We(e.h,t),r=1}if(0!=e.I)if(t.o)if(1==r){n=t.u?t.u.length:0,t=Date.now()-t.F;var s=e.D;Q(r=pe(),new _e(r,n)),Jt(e)}else nn(e);else if(3==(s=t.m)||0==s&&t.X>0||!(1==r&&function(e,t){return!(Ge(e.h)>=e.h.j-(e.m?1:0)||(e.m?(e.i=t.G.concat(e.i),0):1==e.I||2==e.I||e.D>=(e.Sa?0:e.Ta)||(e.m=ve(u(e.Ea,e,t),cn(e,e.D)),e.D++,0)))}(e,t)||2==r&&rn(e)))switch(n&&n.length>0&&(t=e.h,t.i=t.i.concat(n)),s){case 1:ln(e,5);break;case 4:ln(e,10);break;case 3:ln(e,6);break;default:ln(e,2)}}function cn(e,t){let n=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(n*=2),n*t}function ln(e,t){if(e.j.info("Error code "+t),2==t){var n=u(e.bb,e),r=e.Ua;const t=!r;r=new Xe(r||"//www.google.com/images/cleardot.gif"),i.location&&"http"==i.location.protocol||Ze(r,"https"),rt(r),t?function(e,t){const n=new we;if(i.Image){const r=new Image;r.onload=c(Rt,n,"TestLoadImage: loaded",!0,t,r),r.onerror=c(Rt,n,"TestLoadImage: error",!1,t,r),r.onabort=c(Rt,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=c(Rt,n,"TestLoadImage: timeout",!1,t,r),i.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(r.toString(),n):function(e,t){new we;const n=new AbortController,r=setTimeout(()=>{n.abort(),Rt(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(r),e.ok?Rt(0,0,!0,t):Rt(0,0,!1,t)}).catch(()=>{clearTimeout(r),Rt(0,0,!1,t)})}(r.toString(),n)}else ye(2);e.I=0,e.l&&e.l.pa(t),hn(e),Xt(e)}function hn(e){if(e.I=0,e.ja=[],e.l){const t=Ye(e.h);0==t.length&&0==e.i.length||(p(e.ja,t),p(e.ja,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.oa()}}function dn(e,t,n){var r=n instanceof Xe?Je(n):new Xe(n);if(""!=r.g)t&&(r.g=t+"."+r.g),et(r,r.u);else{var s=i.location;r=s.protocol,t=t?t+"."+s.hostname:s.hostname,s=+s.port;const e=new Xe(null);r&&Ze(e,r),t&&(e.g=t),s&&et(e,s),n&&(e.h=n),r=e}return n=e.G,t=e.wa,n&&t&&nt(r,n,t),nt(r,"VER",e.ka),en(e,r),r}function pn(e,t,n){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Aa&&!e.ma?new Vt(new kt({ab:n})):new Vt(e.ma)).Fa(e.L),t}function fn(){}function gn(){}function mn(e,t){Y.call(this),this.g=new Wt(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!A(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!A(t)&&(this.g.G=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new vn(this)}function yn(e){ce.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function _n(){le.call(this),this.status=1}function vn(e){this.g=e}(e=Vt.prototype).Fa=function(e){this.H=e},e.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Te.g(),this.g.onreadystatechange=h(u(this.Ca,this));try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(a){return void $t(this,a)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)n.set(s,r[s]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=i.FormData&&e instanceof i.FormData,!(Array.prototype.indexOf.call(Bt,t,void 0)>=0)||r||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(e),this.v=!1}catch(a){$t(this,a)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,Q(this,"complete"),Q(this,"abort"),Ht(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ht(this,!0)),Vt.Z.N.call(this)},e.Ca=function(){this.u||(this.B||this.v||this.j?jt(this):this.Xa())},e.Xa=function(){jt(this)},e.isActive=function(){return!!this.g},e.ca=function(){try{return Gt(this)>2?this.g.status:-1}catch(e){return-1}},e.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),se(t)}},e.ya=function(){return this.o},e.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Wt.prototype).ka=8,e.I=1,e.connect=function(e,t,n,r){ye(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.J=dn(this,null,this.W),Jt(this)},e.Ea=function(e){if(this.m)if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const s=new Ne(this,this.j,e);let i=this.o;if(this.U&&(i?(i=L(i),x(i,this.U)):i=this.U),null!==this.u||this.R||(s.J=i,i=null),this.S)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if((t+=r)>4096){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=tn(this,s,t),nt(n=Je(this.J),"RID",e),nt(n,"CVER",22),this.G&&nt(n,"X-HTTP-Session-Id",this.G),en(this,n),i&&(this.R?t="headers="+Ae(Mt(i))+"&"+t:this.u&&Ut(n,this.u,i)),Ke(this.h,s),this.Ra&&nt(n,"TYPE","init"),this.S?(nt(n,"$req",t),nt(n,"SID","null"),s.U=!0,De(s,n,null)):De(s,n,t),this.I=2}}else 3==this.I&&(e?Zt(this,e):0==this.i.length||He(this.h)||Zt(this))},e.Da=function(){if(this.v=null,an(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=ve(u(this.Wa,this),e)}},e.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ye(10),Qt(this),an(this))},e.Va=function(){null!=this.C&&(this.C=null,Qt(this),rn(this),ye(19))},e.bb=function(e){e?(this.j.info("Successfully pinged google.com"),ye(2)):(this.j.info("Failed to ping google.com"),ye(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=fn.prototype).ra=function(){},e.qa=function(){},e.pa=function(){},e.oa=function(){},e.isActive=function(){return!0},e.Ka=function(){},gn.prototype.g=function(e,t){return new mn(e,t)},l(mn,Y),mn.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},mn.prototype.close=function(){Yt(this.g)},mn.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=re(e),e=n);t.i.push(new qe(t.Ya++,e)),3==t.I&&Jt(t)},mn.prototype.N=function(){this.g.l=null,delete this.j,Yt(this.g),delete this.g,mn.Z.N.call(this)},l(yn,ce),l(_n,le),l(vn,fn),vn.prototype.ra=function(){Q(this.g,"a")},vn.prototype.qa=function(e){Q(this.g,new yn(e))},vn.prototype.pa=function(e){Q(this.g,new _n)},vn.prototype.oa=function(){Q(this.g,"b")},gn.prototype.createWebChannel=gn.prototype.g,mn.prototype.send=mn.prototype.o,mn.prototype.open=mn.prototype.m,mn.prototype.close=mn.prototype.close,gt=function(){return new gn},ft=function(){return pe()},pt=he,dt={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},be.NO_ERROR=0,be.TIMEOUT=8,be.HTTP_ERROR=6,ht=be,Ie.COMPLETE="complete",lt=Ie,oe.EventType=ue,ue.OPEN="a",ue.CLOSE="b",ue.ERROR="c",ue.MESSAGE="d",Y.prototype.listen=Y.prototype.J,ct=oe,Vt.prototype.listenOnce=Vt.prototype.K,Vt.prototype.getLastError=Vt.prototype.Ha,Vt.prototype.getLastErrorCode=Vt.prototype.ya,Vt.prototype.getStatus=Vt.prototype.ca,Vt.prototype.getResponseJson=Vt.prototype.La,Vt.prototype.getResponseText=Vt.prototype.la,Vt.prototype.send=Vt.prototype.ea,Vt.prototype.setWithCredentials=Vt.prototype.Fa,ut=Vt}).apply(void 0!==mt?mt:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});
/*!
 * re2js
 * RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
 *
 * @version v0.4.3
 * @author Alexey Vasiliev
 * @homepage https://github.com/le0pard/re2js#readme
 * @repository github:le0pard/re2js
 * @license MIT
 */
const yt=class{};t(yt,"FOLD_CASE",1),t(yt,"LITERAL",2),t(yt,"CLASS_NL",4),t(yt,"DOT_NL",8),t(yt,"ONE_LINE",16),t(yt,"NON_GREEDY",32),t(yt,"PERL_X",64),t(yt,"UNICODE_GROUPS",128),t(yt,"WAS_DOLLAR",256),t(yt,"MATCH_NL",yt.CLASS_NL|yt.DOT_NL),t(yt,"PERL",yt.CLASS_NL|yt.ONE_LINE|yt.PERL_X|yt.UNICODE_GROUPS),t(yt,"POSIX",0),t(yt,"UNANCHORED",0),t(yt,"ANCHOR_START",1),t(yt,"ANCHOR_BOTH",2);let _t=yt;class vt{static toUpperCase(e){const t=String.fromCodePoint(e).toUpperCase();if(t.length>1)return e;const n=String.fromCodePoint(t.codePointAt(0)).toLowerCase();return n.length>1||n.codePointAt(0)!==e?e:t.codePointAt(0)}static toLowerCase(e){const t=String.fromCodePoint(e).toLowerCase();if(t.length>1)return e;const n=String.fromCodePoint(t.codePointAt(0)).toUpperCase();return n.length>1||n.codePointAt(0)!==e?e:t.codePointAt(0)}}t(vt,"CODES",(()=>new Map([["",7],["\b",8],["\t",9],["\n",10],["\v",11],["\f",12],["\r",13],[" ",32],['"',34],["$",36],["&",38],["(",40],[")",41],["*",42],["+",43],["-",45],[".",46],["0",48],["1",49],["2",50],["3",51],["4",52],["5",53],["6",54],["7",55],["8",56],["9",57],[":",58],["<",60],[">",62],["?",63],["A",65],["B",66],["C",67],["F",70],["P",80],["Q",81],["U",85],["Z",90],["[",91],["\\",92],["]",93],["^",94],["_",95],["a",97],["b",98],["f",102],["i",105],["m",109],["n",110],["r",114],["s",115],["t",116],["v",118],["x",120],["z",122],["{",123],["|",124],["}",125]]))());const wt=class{};t(wt,"CASE_ORBIT",(()=>new Map([[75,107],[107,8490],[8490,75],[83,115],[115,383],[383,83],[181,924],[924,956],[956,181],[197,229],[229,8491],[8491,197],[452,453],[453,454],[454,452],[455,456],[456,457],[457,455],[458,459],[459,460],[460,458],[497,498],[498,499],[499,497],[837,921],[921,953],[953,8126],[8126,837],[914,946],[946,976],[976,914],[917,949],[949,1013],[1013,917],[920,952],[952,977],[977,1012],[1012,920],[922,954],[954,1008],[1008,922],[928,960],[960,982],[982,928],[929,961],[961,1009],[1009,929],[931,962],[962,963],[963,931],[934,966],[966,981],[981,934],[937,969],[969,8486],[8486,937],[1042,1074],[1074,7296],[7296,1042],[1044,1076],[1076,7297],[7297,1044],[1054,1086],[1086,7298],[7298,1054],[1057,1089],[1089,7299],[7299,1057],[1058,1090],[1090,7300],[7300,7301],[7301,1058],[1066,1098],[1098,7302],[7302,1066],[1122,1123],[1123,7303],[7303,1122],[7304,42570],[42570,42571],[42571,7304],[7776,7777],[7777,7835],[7835,7776],[223,7838],[7838,223],[8064,8072],[8072,8064],[8065,8073],[8073,8065],[8066,8074],[8074,8066],[8067,8075],[8075,8067],[8068,8076],[8076,8068],[8069,8077],[8077,8069],[8070,8078],[8078,8070],[8071,8079],[8079,8071],[8080,8088],[8088,8080],[8081,8089],[8089,8081],[8082,8090],[8090,8082],[8083,8091],[8091,8083],[8084,8092],[8092,8084],[8085,8093],[8093,8085],[8086,8094],[8094,8086],[8087,8095],[8095,8087],[8096,8104],[8104,8096],[8097,8105],[8105,8097],[8098,8106],[8106,8098],[8099,8107],[8107,8099],[8100,8108],[8108,8100],[8101,8109],[8109,8101],[8102,8110],[8110,8102],[8103,8111],[8111,8103],[8115,8124],[8124,8115],[8131,8140],[8140,8131],[912,8147],[8147,912],[944,8163],[8163,944],[8179,8188],[8188,8179],[64261,64262],[64262,64261],[66560,66600],[66600,66560],[66561,66601],[66601,66561],[66562,66602],[66602,66562],[66563,66603],[66603,66563],[66564,66604],[66604,66564],[66565,66605],[66605,66565],[66566,66606],[66606,66566],[66567,66607],[66607,66567],[66568,66608],[66608,66568],[66569,66609],[66609,66569],[66570,66610],[66610,66570],[66571,66611],[66611,66571],[66572,66612],[66612,66572],[66573,66613],[66613,66573],[66574,66614],[66614,66574],[66575,66615],[66615,66575],[66576,66616],[66616,66576],[66577,66617],[66617,66577],[66578,66618],[66618,66578],[66579,66619],[66619,66579],[66580,66620],[66620,66580],[66581,66621],[66621,66581],[66582,66622],[66622,66582],[66583,66623],[66623,66583],[66584,66624],[66624,66584],[66585,66625],[66625,66585],[66586,66626],[66626,66586],[66587,66627],[66627,66587],[66588,66628],[66628,66588],[66589,66629],[66629,66589],[66590,66630],[66630,66590],[66591,66631],[66631,66591],[66592,66632],[66632,66592],[66593,66633],[66633,66593],[66594,66634],[66634,66594],[66595,66635],[66635,66595],[66596,66636],[66636,66596],[66597,66637],[66637,66597],[66598,66638],[66638,66598],[66599,66639],[66639,66599],[66736,66776],[66776,66736],[66737,66777],[66777,66737],[66738,66778],[66778,66738],[66739,66779],[66779,66739],[66740,66780],[66780,66740],[66741,66781],[66781,66741],[66742,66782],[66782,66742],[66743,66783],[66783,66743],[66744,66784],[66784,66744],[66745,66785],[66785,66745],[66746,66786],[66786,66746],[66747,66787],[66787,66747],[66748,66788],[66788,66748],[66749,66789],[66789,66749],[66750,66790],[66790,66750],[66751,66791],[66791,66751],[66752,66792],[66792,66752],[66753,66793],[66793,66753],[66754,66794],[66794,66754],[66755,66795],[66795,66755],[66756,66796],[66796,66756],[66757,66797],[66797,66757],[66758,66798],[66798,66758],[66759,66799],[66799,66759],[66760,66800],[66800,66760],[66761,66801],[66801,66761],[66762,66802],[66802,66762],[66763,66803],[66803,66763],[66764,66804],[66804,66764],[66765,66805],[66805,66765],[66766,66806],[66806,66766],[66767,66807],[66807,66767],[66768,66808],[66808,66768],[66769,66809],[66809,66769],[66770,66810],[66810,66770],[66771,66811],[66811,66771],[66928,66967],[66967,66928],[66929,66968],[66968,66929],[66930,66969],[66969,66930],[66931,66970],[66970,66931],[66932,66971],[66971,66932],[66933,66972],[66972,66933],[66934,66973],[66973,66934],[66935,66974],[66974,66935],[66936,66975],[66975,66936],[66937,66976],[66976,66937],[66938,66977],[66977,66938],[66940,66979],[66979,66940],[66941,66980],[66980,66941],[66942,66981],[66981,66942],[66943,66982],[66982,66943],[66944,66983],[66983,66944],[66945,66984],[66984,66945],[66946,66985],[66985,66946],[66947,66986],[66986,66947],[66948,66987],[66987,66948],[66949,66988],[66988,66949],[66950,66989],[66989,66950],[66951,66990],[66990,66951],[66952,66991],[66991,66952],[66953,66992],[66992,66953],[66954,66993],[66993,66954],[66956,66995],[66995,66956],[66957,66996],[66996,66957],[66958,66997],[66997,66958],[66959,66998],[66998,66959],[66960,66999],[66999,66960],[66961,67e3],[67e3,66961],[66962,67001],[67001,66962],[66964,67003],[67003,66964],[66965,67004],[67004,66965],[68736,68800],[68800,68736],[68737,68801],[68801,68737],[68738,68802],[68802,68738],[68739,68803],[68803,68739],[68740,68804],[68804,68740],[68741,68805],[68805,68741],[68742,68806],[68806,68742],[68743,68807],[68807,68743],[68744,68808],[68808,68744],[68745,68809],[68809,68745],[68746,68810],[68810,68746],[68747,68811],[68811,68747],[68748,68812],[68812,68748],[68749,68813],[68813,68749],[68750,68814],[68814,68750],[68751,68815],[68815,68751],[68752,68816],[68816,68752],[68753,68817],[68817,68753],[68754,68818],[68818,68754],[68755,68819],[68819,68755],[68756,68820],[68820,68756],[68757,68821],[68821,68757],[68758,68822],[68822,68758],[68759,68823],[68823,68759],[68760,68824],[68824,68760],[68761,68825],[68825,68761],[68762,68826],[68826,68762],[68763,68827],[68827,68763],[68764,68828],[68828,68764],[68765,68829],[68829,68765],[68766,68830],[68830,68766],[68767,68831],[68831,68767],[68768,68832],[68832,68768],[68769,68833],[68833,68769],[68770,68834],[68834,68770],[68771,68835],[68835,68771],[68772,68836],[68836,68772],[68773,68837],[68837,68773],[68774,68838],[68838,68774],[68775,68839],[68839,68775],[68776,68840],[68840,68776],[68777,68841],[68841,68777],[68778,68842],[68842,68778],[68779,68843],[68843,68779],[68780,68844],[68844,68780],[68781,68845],[68845,68781],[68782,68846],[68846,68782],[68783,68847],[68847,68783],[68784,68848],[68848,68784],[68785,68849],[68849,68785],[68786,68850],[68850,68786],[71840,71872],[71872,71840],[71841,71873],[71873,71841],[71842,71874],[71874,71842],[71843,71875],[71875,71843],[71844,71876],[71876,71844],[71845,71877],[71877,71845],[71846,71878],[71878,71846],[71847,71879],[71879,71847],[71848,71880],[71880,71848],[71849,71881],[71881,71849],[71850,71882],[71882,71850],[71851,71883],[71883,71851],[71852,71884],[71884,71852],[71853,71885],[71885,71853],[71854,71886],[71886,71854],[71855,71887],[71887,71855],[71856,71888],[71888,71856],[71857,71889],[71889,71857],[71858,71890],[71890,71858],[71859,71891],[71891,71859],[71860,71892],[71892,71860],[71861,71893],[71893,71861],[71862,71894],[71894,71862],[71863,71895],[71895,71863],[71864,71896],[71896,71864],[71865,71897],[71897,71865],[71866,71898],[71898,71866],[71867,71899],[71899,71867],[71868,71900],[71900,71868],[71869,71901],[71901,71869],[71870,71902],[71902,71870],[71871,71903],[71903,71871],[93760,93792],[93792,93760],[93761,93793],[93793,93761],[93762,93794],[93794,93762],[93763,93795],[93795,93763],[93764,93796],[93796,93764],[93765,93797],[93797,93765],[93766,93798],[93798,93766],[93767,93799],[93799,93767],[93768,93800],[93800,93768],[93769,93801],[93801,93769],[93770,93802],[93802,93770],[93771,93803],[93803,93771],[93772,93804],[93804,93772],[93773,93805],[93805,93773],[93774,93806],[93806,93774],[93775,93807],[93807,93775],[93776,93808],[93808,93776],[93777,93809],[93809,93777],[93778,93810],[93810,93778],[93779,93811],[93811,93779],[93780,93812],[93812,93780],[93781,93813],[93813,93781],[93782,93814],[93814,93782],[93783,93815],[93815,93783],[93784,93816],[93816,93784],[93785,93817],[93817,93785],[93786,93818],[93818,93786],[93787,93819],[93819,93787],[93788,93820],[93820,93788],[93789,93821],[93821,93789],[93790,93822],[93822,93790],[93791,93823],[93823,93791],[125184,125218],[125218,125184],[125185,125219],[125219,125185],[125186,125220],[125220,125186],[125187,125221],[125221,125187],[125188,125222],[125222,125188],[125189,125223],[125223,125189],[125190,125224],[125224,125190],[125191,125225],[125225,125191],[125192,125226],[125226,125192],[125193,125227],[125227,125193],[125194,125228],[125228,125194],[125195,125229],[125229,125195],[125196,125230],[125230,125196],[125197,125231],[125231,125197],[125198,125232],[125232,125198],[125199,125233],[125233,125199],[125200,125234],[125234,125200],[125201,125235],[125235,125201],[125202,125236],[125236,125202],[125203,125237],[125237,125203],[125204,125238],[125238,125204],[125205,125239],[125239,125205],[125206,125240],[125240,125206],[125207,125241],[125241,125207],[125208,125242],[125242,125208],[125209,125243],[125243,125209],[125210,125244],[125244,125210],[125211,125245],[125245,125211],[125212,125246],[125246,125212],[125213,125247],[125247,125213],[125214,125248],[125248,125214],[125215,125249],[125249,125215],[125216,125250],[125250,125216],[125217,125251],[125251,125217]]))()),t(wt,"C",[[0,31,1],[127,159,1],[173,888,715],[889,896,7],[897,899,1],[907,909,2],[930,1328,398],[1367,1368,1],[1419,1420,1],[1424,1480,56],[1481,1487,1],[1515,1518,1],[1525,1541,1],[1564,1757,193],[1806,1807,1],[1867,1868,1],[1970,1983,1],[2043,2044,1],[2094,2095,1],[2111,2140,29],[2141,2143,2],[2155,2159,1],[2191,2199,1],[2274,2436,162],[2445,2446,1],[2449,2450,1],[2473,2481,8],[2483,2485,1],[2490,2491,1],[2501,2502,1],[2505,2506,1],[2511,2518,1],[2520,2523,1],[2526,2532,6],[2533,2559,26],[2560,2564,4],[2571,2574,1],[2577,2578,1],[2601,2609,8],[2612,2618,3],[2619,2621,2],[2627,2630,1],[2633,2634,1],[2638,2640,1],[2642,2648,1],[2653,2655,2],[2656,2661,1],[2679,2688,1],[2692,2702,10],[2706,2729,23],[2737,2740,3],[2746,2747,1],[2758,2766,4],[2767,2769,2],[2770,2783,1],[2788,2789,1],[2802,2808,1],[2816,2820,4],[2829,2830,1],[2833,2834,1],[2857,2865,8],[2868,2874,6],[2875,2885,10],[2886,2889,3],[2890,2894,4],[2895,2900,1],[2904,2907,1],[2910,2916,6],[2917,2936,19],[2937,2945,1],[2948,2955,7],[2956,2957,1],[2961,2966,5],[2967,2968,1],[2971,2973,2],[2976,2978,1],[2981,2983,1],[2987,2989,1],[3002,3005,1],[3011,3013,1],[3017,3022,5],[3023,3025,2],[3026,3030,1],[3032,3045,1],[3067,3071,1],[3085,3089,4],[3113,3130,17],[3131,3141,10],[3145,3150,5],[3151,3156,1],[3159,3163,4],[3164,3166,2],[3167,3172,5],[3173,3184,11],[3185,3190,1],[3213,3217,4],[3241,3252,11],[3258,3259,1],[3269,3273,4],[3278,3284,1],[3287,3292,1],[3295,3300,5],[3301,3312,11],[3316,3327,1],[3341,3345,4],[3397,3401,4],[3408,3411,1],[3428,3429,1],[3456,3460,4],[3479,3481,1],[3506,3516,10],[3518,3519,1],[3527,3529,1],[3531,3534,1],[3541,3543,2],[3552,3557,1],[3568,3569,1],[3573,3584,1],[3643,3646,1],[3676,3712,1],[3715,3717,2],[3723,3748,25],[3750,3774,24],[3775,3781,6],[3783,3791,8],[3802,3803,1],[3808,3839,1],[3912,3949,37],[3950,3952,1],[3992,4029,37],[4045,4059,14],[4060,4095,1],[4294,4296,2],[4297,4300,1],[4302,4303,1],[4681,4686,5],[4687,4695,8],[4697,4702,5],[4703,4745,42],[4750,4751,1],[4785,4790,5],[4791,4799,8],[4801,4806,5],[4807,4823,16],[4881,4886,5],[4887,4955,68],[4956,4989,33],[4990,4991,1],[5018,5023,1],[5110,5111,1],[5118,5119,1],[5789,5791,1],[5881,5887,1],[5910,5918,1],[5943,5951,1],[5972,5983,1],[5997,6001,4],[6004,6015,1],[6110,6111,1],[6122,6127,1],[6138,6143,1],[6158,6170,12],[6171,6175,1],[6265,6271,1],[6315,6319,1],[6390,6399,1],[6431,6444,13],[6445,6447,1],[6460,6463,1],[6465,6467,1],[6510,6511,1],[6517,6527,1],[6572,6575,1],[6602,6607,1],[6619,6621,1],[6684,6685,1],[6751,6781,30],[6782,6794,12],[6795,6799,1],[6810,6815,1],[6830,6831,1],[6863,6911,1],[6989,6991,1],[7039,7156,117],[7157,7163,1],[7224,7226,1],[7242,7244,1],[7305,7311,1],[7355,7356,1],[7368,7375,1],[7419,7423,1],[7958,7959,1],[7966,7967,1],[8006,8007,1],[8014,8015,1],[8024,8030,2],[8062,8063,1],[8117,8133,16],[8148,8149,1],[8156,8176,20],[8177,8181,4],[8191,8203,12],[8204,8207,1],[8234,8238,1],[8288,8303,1],[8306,8307,1],[8335,8349,14],[8350,8351,1],[8385,8399,1],[8433,8447,1],[8588,8591,1],[9255,9279,1],[9291,9311,1],[11124,11125,1],[11158,11508,350],[11509,11512,1],[11558,11560,2],[11561,11564,1],[11566,11567,1],[11624,11630,1],[11633,11646,1],[11671,11679,1],[11687,11743,8],[11870,11903,1],[11930,12020,90],[12021,12031,1],[12246,12271,1],[12352,12439,87],[12440,12544,104],[12545,12548,1],[12592,12687,95],[12772,12782,1],[12831,42125,29294],[42126,42127,1],[42183,42191,1],[42540,42559,1],[42744,42751,1],[42955,42959,1],[42962,42964,2],[42970,42993,1],[43053,43055,1],[43066,43071,1],[43128,43135,1],[43206,43213,1],[43226,43231,1],[43348,43358,1],[43389,43391,1],[43470,43482,12],[43483,43485,1],[43519,43575,56],[43576,43583,1],[43598,43599,1],[43610,43611,1],[43715,43738,1],[43767,43776,1],[43783,43784,1],[43791,43792,1],[43799,43807,1],[43815,43823,8],[43884,43887,1],[44014,44015,1],[44026,44031,1],[55204,55215,1],[55239,55242,1],[55292,63743,1],[64110,64111,1],[64218,64255,1],[64263,64274,1],[64280,64284,1],[64311,64317,6],[64319,64325,3],[64451,64466,1],[64912,64913,1],[64968,64974,1],[64976,65007,1],[65050,65055,1],[65107,65127,20],[65132,65135,1],[65141,65277,136],[65278,65280,1],[65471,65473,1],[65480,65481,1],[65488,65489,1],[65496,65497,1],[65501,65503,1],[65511,65519,8],[65520,65531,1],[65534,65535,1],[65548,65575,27],[65595,65598,3],[65614,65615,1],[65630,65663,1],[65787,65791,1],[65795,65798,1],[65844,65846,1],[65935,65949,14],[65950,65951,1],[65953,65999,1],[66046,66175,1],[66205,66207,1],[66257,66271,1],[66300,66303,1],[66340,66348,1],[66379,66383,1],[66427,66431,1],[66462,66500,38],[66501,66503,1],[66518,66559,1],[66718,66719,1],[66730,66735,1],[66772,66775,1],[66812,66815,1],[66856,66863,1],[66916,66926,1],[66939,66955,16],[66963,66966,3],[66978,66994,16],[67002,67005,3],[67006,67071,1],[67383,67391,1],[67414,67423,1],[67432,67455,1],[67462,67505,43],[67515,67583,1],[67590,67591,1],[67593,67638,45],[67641,67643,1],[67645,67646,1],[67670,67743,73],[67744,67750,1],[67760,67807,1],[67827,67830,3],[67831,67834,1],[67868,67870,1],[67898,67902,1],[67904,67967,1],[68024,68027,1],[68048,68049,1],[68100,68103,3],[68104,68107,1],[68116,68120,4],[68150,68151,1],[68155,68158,1],[68169,68175,1],[68185,68191,1],[68256,68287,1],[68327,68330,1],[68343,68351,1],[68406,68408,1],[68438,68439,1],[68467,68471,1],[68498,68504,1],[68509,68520,1],[68528,68607,1],[68681,68735,1],[68787,68799,1],[68851,68857,1],[68904,68911,1],[68922,69215,1],[69247,69290,43],[69294,69295,1],[69298,69372,1],[69416,69423,1],[69466,69487,1],[69514,69551,1],[69580,69599,1],[69623,69631,1],[69710,69713,1],[69750,69758,1],[69821,69827,6],[69828,69839,1],[69865,69871,1],[69882,69887,1],[69941,69960,19],[69961,69967,1],[70007,70015,1],[70112,70133,21],[70134,70143,1],[70162,70210,48],[70211,70271,1],[70279,70281,2],[70286,70302,16],[70314,70319,1],[70379,70383,1],[70394,70399,1],[70404,70413,9],[70414,70417,3],[70418,70441,23],[70449,70452,3],[70458,70469,11],[70470,70473,3],[70474,70478,4],[70479,70481,2],[70482,70486,1],[70488,70492,1],[70500,70501,1],[70509,70511,1],[70517,70655,1],[70748,70754,6],[70755,70783,1],[70856,70863,1],[70874,71039,1],[71094,71095,1],[71134,71167,1],[71237,71247,1],[71258,71263,1],[71277,71295,1],[71354,71359,1],[71370,71423,1],[71451,71452,1],[71468,71471,1],[71495,71679,1],[71740,71839,1],[71923,71934,1],[71943,71944,1],[71946,71947,1],[71956,71959,3],[71990,71993,3],[71994,72007,13],[72008,72015,1],[72026,72095,1],[72104,72105,1],[72152,72153,1],[72165,72191,1],[72264,72271,1],[72355,72367,1],[72441,72447,1],[72458,72703,1],[72713,72759,46],[72774,72783,1],[72813,72815,1],[72848,72849,1],[72872,72887,15],[72888,72959,1],[72967,72970,3],[73015,73017,1],[73019,73022,3],[73032,73039,1],[73050,73055,1],[73062,73065,3],[73103,73106,3],[73113,73119,1],[73130,73439,1],[73465,73471,1],[73489,73531,42],[73532,73533,1],[73562,73647,1],[73649,73663,1],[73714,73726,1],[74650,74751,1],[74863,74869,6],[74870,74879,1],[75076,77711,1],[77811,77823,1],[78896,78911,1],[78934,82943,1],[83527,92159,1],[92729,92735,1],[92767,92778,11],[92779,92781,1],[92863,92874,11],[92875,92879,1],[92910,92911,1],[92918,92927,1],[92998,93007,1],[93018,93026,8],[93048,93052,1],[93072,93759,1],[93851,93951,1],[94027,94030,1],[94088,94094,1],[94112,94175,1],[94181,94191,1],[94194,94207,1],[100344,100351,1],[101590,101631,1],[101641,110575,1],[110580,110588,8],[110591,110883,292],[110884,110897,1],[110899,110927,1],[110931,110932,1],[110934,110947,1],[110952,110959,1],[111356,113663,1],[113771,113775,1],[113789,113791,1],[113801,113807,1],[113818,113819,1],[113824,118527,1],[118574,118575,1],[118599,118607,1],[118724,118783,1],[119030,119039,1],[119079,119080,1],[119155,119162,1],[119275,119295,1],[119366,119487,1],[119508,119519,1],[119540,119551,1],[119639,119647,1],[119673,119807,1],[119893,119965,72],[119968,119969,1],[119971,119972,1],[119975,119976,1],[119981,119994,13],[119996,120004,8],[120070,120075,5],[120076,120085,9],[120093,120122,29],[120127,120133,6],[120135,120137,1],[120145,120486,341],[120487,120780,293],[120781,121484,703],[121485,121498,1],[121504,121520,16],[121521,122623,1],[122655,122660,1],[122667,122879,1],[122887,122905,18],[122906,122914,8],[122917,122923,6],[122924,122927,1],[122990,123022,1],[123024,123135,1],[123181,123183,1],[123198,123199,1],[123210,123213,1],[123216,123535,1],[123567,123583,1],[123642,123646,1],[123648,124111,1],[124154,124895,1],[124903,124908,5],[124911,124927,16],[125125,125126,1],[125143,125183,1],[125260,125263,1],[125274,125277,1],[125280,126064,1],[126133,126208,1],[126270,126463,1],[126468,126496,28],[126499,126501,2],[126502,126504,2],[126515,126520,5],[126522,126524,2],[126525,126529,1],[126531,126534,1],[126536,126540,2],[126544,126547,3],[126549,126550,1],[126552,126560,2],[126563,126565,2],[126566,126571,5],[126579,126589,5],[126591,126602,11],[126620,126624,1],[126628,126634,6],[126652,126703,1],[126706,126975,1],[127020,127023,1],[127124,127135,1],[127151,127152,1],[127168,127184,16],[127222,127231,1],[127406,127461,1],[127491,127503,1],[127548,127551,1],[127561,127567,1],[127570,127583,1],[127590,127743,1],[128728,128731,1],[128749,128751,1],[128765,128767,1],[128887,128890,1],[128986,128991,1],[129004,129007,1],[129009,129023,1],[129036,129039,1],[129096,129103,1],[129114,129119,1],[129160,129167,1],[129198,129199,1],[129202,129279,1],[129620,129631,1],[129646,129647,1],[129661,129663,1],[129673,129679,1],[129726,129734,8],[129735,129741,1],[129756,129759,1],[129769,129775,1],[129785,129791,1],[129939,129995,56],[129996,130031,1],[130042,131071,1],[173792,173823,1],[177978,177983,1],[178206,178207,1],[183970,183983,1],[191457,191471,1],[192094,194559,1],[195102,196607,1],[201547,201551,1],[205744,917759,1],[918e3,1114111,1]]),t(wt,"Cc",[[0,31,1],[127,159,1]]),t(wt,"Cf",[[173,1536,1363],[1537,1541,1],[1564,1757,193],[1807,2192,385],[2193,2274,81],[6158,8203,2045],[8204,8207,1],[8234,8238,1],[8288,8292,1],[8294,8303,1],[65279,65529,250],[65530,65531,1],[69821,69837,16],[78896,78911,1],[113824,113827,1],[119155,119162,1],[917505,917536,31],[917537,917631,1]]),t(wt,"Co",[[57344,63743,1],[983040,1048573,1],[1048576,1114109,1]]),t(wt,"Cs",[[55296,57343,1]]),t(wt,"L",[[65,90,1],[97,122,1],[170,181,11],[186,192,6],[193,214,1],[216,246,1],[248,705,1],[710,721,1],[736,740,1],[748,750,2],[880,884,1],[886,887,1],[890,893,1],[895,902,7],[904,906,1],[908,910,2],[911,929,1],[931,1013,1],[1015,1153,1],[1162,1327,1],[1329,1366,1],[1369,1376,7],[1377,1416,1],[1488,1514,1],[1519,1522,1],[1568,1610,1],[1646,1647,1],[1649,1747,1],[1749,1765,16],[1766,1774,8],[1775,1786,11],[1787,1788,1],[1791,1808,17],[1810,1839,1],[1869,1957,1],[1969,1994,25],[1995,2026,1],[2036,2037,1],[2042,2048,6],[2049,2069,1],[2074,2084,10],[2088,2112,24],[2113,2136,1],[2144,2154,1],[2160,2183,1],[2185,2190,1],[2208,2249,1],[2308,2361,1],[2365,2384,19],[2392,2401,1],[2417,2432,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2493,2510,17],[2524,2525,1],[2527,2529,1],[2544,2545,1],[2556,2565,9],[2566,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2649,2652,1],[2654,2674,20],[2675,2676,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2749,2768,19],[2784,2785,1],[2809,2821,12],[2822,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2877,2908,31],[2909,2911,2],[2912,2913,1],[2929,2947,18],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3024,3077,53],[3078,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3133,3160,27],[3161,3162,1],[3165,3168,3],[3169,3200,31],[3205,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3261,3293,32],[3294,3296,2],[3297,3313,16],[3314,3332,18],[3333,3340,1],[3342,3344,1],[3346,3386,1],[3389,3406,17],[3412,3414,1],[3423,3425,1],[3450,3455,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3585,3632,1],[3634,3635,1],[3648,3654,1],[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3760,1],[3762,3763,1],[3773,3776,3],[3777,3780,1],[3782,3804,22],[3805,3807,1],[3840,3904,64],[3905,3911,1],[3913,3948,1],[3976,3980,1],[4096,4138,1],[4159,4176,17],[4177,4181,1],[4186,4189,1],[4193,4197,4],[4198,4206,8],[4207,4208,1],[4213,4225,1],[4238,4256,18],[4257,4293,1],[4295,4301,6],[4304,4346,1],[4348,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4992,5007,1],[5024,5109,1],[5112,5117,1],[5121,5740,1],[5743,5759,1],[5761,5786,1],[5792,5866,1],[5873,5880,1],[5888,5905,1],[5919,5937,1],[5952,5969,1],[5984,5996,1],[5998,6e3,1],[6016,6067,1],[6103,6108,5],[6176,6264,1],[6272,6276,1],[6279,6312,1],[6314,6320,6],[6321,6389,1],[6400,6430,1],[6480,6509,1],[6512,6516,1],[6528,6571,1],[6576,6601,1],[6656,6678,1],[6688,6740,1],[6823,6917,94],[6918,6963,1],[6981,6988,1],[7043,7072,1],[7086,7087,1],[7098,7141,1],[7168,7203,1],[7245,7247,1],[7258,7293,1],[7296,7304,1],[7312,7354,1],[7357,7359,1],[7401,7404,1],[7406,7411,1],[7413,7414,1],[7418,7424,6],[7425,7615,1],[7680,7957,1],[7960,7965,1],[7968,8005,1],[8008,8013,1],[8016,8023,1],[8025,8031,2],[8032,8061,1],[8064,8116,1],[8118,8124,1],[8126,8130,4],[8131,8132,1],[8134,8140,1],[8144,8147,1],[8150,8155,1],[8160,8172,1],[8178,8180,1],[8182,8188,1],[8305,8319,14],[8336,8348,1],[8450,8455,5],[8458,8467,1],[8469,8473,4],[8474,8477,1],[8484,8490,2],[8491,8493,1],[8495,8505,1],[8508,8511,1],[8517,8521,1],[8526,8579,53],[8580,11264,2684],[11265,11492,1],[11499,11502,1],[11506,11507,1],[11520,11557,1],[11559,11565,6],[11568,11623,1],[11631,11648,17],[11649,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[11823,12293,470],[12294,12337,43],[12338,12341,1],[12347,12348,1],[12353,12438,1],[12445,12447,1],[12449,12538,1],[12540,12543,1],[12549,12591,1],[12593,12686,1],[12704,12735,1],[12784,12799,1],[13312,19903,1],[19968,42124,1],[42192,42237,1],[42240,42508,1],[42512,42527,1],[42538,42539,1],[42560,42606,1],[42623,42653,1],[42656,42725,1],[42775,42783,1],[42786,42888,1],[42891,42954,1],[42960,42961,1],[42963,42965,2],[42966,42969,1],[42994,43009,1],[43011,43013,1],[43015,43018,1],[43020,43042,1],[43072,43123,1],[43138,43187,1],[43250,43255,1],[43259,43261,2],[43262,43274,12],[43275,43301,1],[43312,43334,1],[43360,43388,1],[43396,43442,1],[43471,43488,17],[43489,43492,1],[43494,43503,1],[43514,43518,1],[43520,43560,1],[43584,43586,1],[43588,43595,1],[43616,43638,1],[43642,43646,4],[43647,43695,1],[43697,43701,4],[43702,43705,3],[43706,43709,1],[43712,43714,2],[43739,43741,1],[43744,43754,1],[43762,43764,1],[43777,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[43824,43866,1],[43868,43881,1],[43888,44002,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[63744,64109,1],[64112,64217,1],[64256,64262,1],[64275,64279,1],[64285,64287,2],[64288,64296,1],[64298,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64433,1],[64467,64829,1],[64848,64911,1],[64914,64967,1],[65008,65019,1],[65136,65140,1],[65142,65276,1],[65313,65338,1],[65345,65370,1],[65382,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1],[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1],[66176,66204,1],[66208,66256,1],[66304,66335,1],[66349,66368,1],[66370,66377,1],[66384,66421,1],[66432,66461,1],[66464,66499,1],[66504,66511,1],[66560,66717,1],[66736,66771,1],[66776,66811,1],[66816,66855,1],[66864,66915,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[67072,67382,1],[67392,67413,1],[67424,67431,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3],[67648,67669,1],[67680,67702,1],[67712,67742,1],[67808,67826,1],[67828,67829,1],[67840,67861,1],[67872,67897,1],[67968,68023,1],[68030,68031,1],[68096,68112,16],[68113,68115,1],[68117,68119,1],[68121,68149,1],[68192,68220,1],[68224,68252,1],[68288,68295,1],[68297,68324,1],[68352,68405,1],[68416,68437,1],[68448,68466,1],[68480,68497,1],[68608,68680,1],[68736,68786,1],[68800,68850,1],[68864,68899,1],[69248,69289,1],[69296,69297,1],[69376,69404,1],[69415,69424,9],[69425,69445,1],[69488,69505,1],[69552,69572,1],[69600,69622,1],[69635,69687,1],[69745,69746,1],[69749,69763,14],[69764,69807,1],[69840,69864,1],[69891,69926,1],[69956,69959,3],[69968,70002,1],[70006,70019,13],[70020,70066,1],[70081,70084,1],[70106,70108,2],[70144,70161,1],[70163,70187,1],[70207,70208,1],[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70312,1],[70320,70366,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70461,70480,19],[70493,70497,1],[70656,70708,1],[70727,70730,1],[70751,70753,1],[70784,70831,1],[70852,70853,1],[70855,71040,185],[71041,71086,1],[71128,71131,1],[71168,71215,1],[71236,71296,60],[71297,71338,1],[71352,71424,72],[71425,71450,1],[71488,71494,1],[71680,71723,1],[71840,71903,1],[71935,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71983,1],[71999,72001,2],[72096,72103,1],[72106,72144,1],[72161,72163,2],[72192,72203,11],[72204,72242,1],[72250,72272,22],[72284,72329,1],[72349,72368,19],[72369,72440,1],[72704,72712,1],[72714,72750,1],[72768,72818,50],[72819,72847,1],[72960,72966,1],[72968,72969,1],[72971,73008,1],[73030,73056,26],[73057,73061,1],[73063,73064,1],[73066,73097,1],[73112,73440,328],[73441,73458,1],[73474,73476,2],[73477,73488,1],[73490,73523,1],[73648,73728,80],[73729,74649,1],[74880,75075,1],[77712,77808,1],[77824,78895,1],[78913,78918,1],[82944,83526,1],[92160,92728,1],[92736,92766,1],[92784,92862,1],[92880,92909,1],[92928,92975,1],[92992,92995,1],[93027,93047,1],[93053,93071,1],[93760,93823,1],[93952,94026,1],[94032,94099,67],[94100,94111,1],[94176,94177,1],[94179,94208,29],[94209,100343,1],[100352,101589,1],[101632,101640,1],[110576,110579,1],[110581,110587,1],[110589,110590,1],[110592,110882,1],[110898,110928,30],[110929,110930,1],[110933,110948,15],[110949,110951,1],[110960,111355,1],[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[119808,119892,1],[119894,119964,1],[119966,119967,1],[119970,119973,3],[119974,119977,3],[119978,119980,1],[119982,119993,1],[119995,119997,2],[119998,120003,1],[120005,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120094,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120146,120485,1],[120488,120512,1],[120514,120538,1],[120540,120570,1],[120572,120596,1],[120598,120628,1],[120630,120654,1],[120656,120686,1],[120688,120712,1],[120714,120744,1],[120746,120770,1],[120772,120779,1],[122624,122654,1],[122661,122666,1],[122928,122989,1],[123136,123180,1],[123191,123197,1],[123214,123536,322],[123537,123565,1],[123584,123627,1],[124112,124139,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1],[124928,125124,1],[125184,125251,1],[125259,126464,1205],[126465,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),t(wt,"foldL",[[837,837,1]]),t(wt,"Ll",[[97,122,1],[181,223,42],[224,246,1],[248,255,1],[257,311,2],[312,328,2],[329,375,2],[378,382,2],[383,384,1],[387,389,2],[392,396,4],[397,402,5],[405,409,4],[410,411,1],[414,417,3],[419,421,2],[424,426,2],[427,429,2],[432,436,4],[438,441,3],[442,445,3],[446,447,1],[454,460,3],[462,476,2],[477,495,2],[496,499,3],[501,505,4],[507,563,2],[564,569,1],[572,575,3],[576,578,2],[583,591,2],[592,659,1],[661,687,1],[881,883,2],[887,891,4],[892,893,1],[912,940,28],[941,974,1],[976,977,1],[981,983,1],[985,1007,2],[1008,1011,1],[1013,1019,3],[1020,1072,52],[1073,1119,1],[1121,1153,2],[1163,1215,2],[1218,1230,2],[1231,1327,2],[1376,1416,1],[4304,4346,1],[4349,4351,1],[5112,5117,1],[7296,7304,1],[7424,7467,1],[7531,7543,1],[7545,7578,1],[7681,7829,2],[7830,7837,1],[7839,7935,2],[7936,7943,1],[7952,7957,1],[7968,7975,1],[7984,7991,1],[8e3,8005,1],[8016,8023,1],[8032,8039,1],[8048,8061,1],[8064,8071,1],[8080,8087,1],[8096,8103,1],[8112,8116,1],[8118,8119,1],[8126,8130,4],[8131,8132,1],[8134,8135,1],[8144,8147,1],[8150,8151,1],[8160,8167,1],[8178,8180,1],[8182,8183,1],[8458,8462,4],[8463,8467,4],[8495,8505,5],[8508,8509,1],[8518,8521,1],[8526,8580,54],[11312,11359,1],[11361,11365,4],[11366,11372,2],[11377,11379,2],[11380,11382,2],[11383,11387,1],[11393,11491,2],[11492,11500,8],[11502,11507,5],[11520,11557,1],[11559,11565,6],[42561,42605,2],[42625,42651,2],[42787,42799,2],[42800,42801,1],[42803,42865,2],[42866,42872,1],[42874,42876,2],[42879,42887,2],[42892,42894,2],[42897,42899,2],[42900,42901,1],[42903,42921,2],[42927,42933,6],[42935,42947,2],[42952,42954,2],[42961,42969,2],[42998,43002,4],[43824,43866,1],[43872,43880,1],[43888,43967,1],[64256,64262,1],[64275,64279,1],[65345,65370,1],[66600,66639,1],[66776,66811,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[68800,68850,1],[71872,71903,1],[93792,93823,1],[119834,119859,1],[119886,119892,1],[119894,119911,1],[119938,119963,1],[119990,119993,1],[119995,119997,2],[119998,120003,1],[120005,120015,1],[120042,120067,1],[120094,120119,1],[120146,120171,1],[120198,120223,1],[120250,120275,1],[120302,120327,1],[120354,120379,1],[120406,120431,1],[120458,120485,1],[120514,120538,1],[120540,120545,1],[120572,120596,1],[120598,120603,1],[120630,120654,1],[120656,120661,1],[120688,120712,1],[120714,120719,1],[120746,120770,1],[120772,120777,1],[120779,122624,1845],[122625,122633,1],[122635,122654,1],[122661,122666,1],[125218,125251,1]]),t(wt,"foldLl",[[65,90,1],[192,214,1],[216,222,1],[256,302,2],[306,310,2],[313,327,2],[330,376,2],[377,381,2],[385,386,1],[388,390,2],[391,393,2],[394,395,1],[398,401,1],[403,404,1],[406,408,1],[412,413,1],[415,416,1],[418,422,2],[423,425,2],[428,430,2],[431,433,2],[434,435,1],[437,439,2],[440,444,4],[452,453,1],[455,456,1],[458,459,1],[461,475,2],[478,494,2],[497,498,1],[500,502,2],[503,504,1],[506,562,2],[570,571,1],[573,574,1],[577,579,2],[580,582,1],[584,590,2],[837,880,43],[882,886,4],[895,902,7],[904,906,1],[908,910,2],[911,913,2],[914,929,1],[931,939,1],[975,984,9],[986,1006,2],[1012,1015,3],[1017,1018,1],[1021,1071,1],[1120,1152,2],[1162,1216,2],[1217,1229,2],[1232,1326,2],[1329,1366,1],[4256,4293,1],[4295,4301,6],[5024,5109,1],[7312,7354,1],[7357,7359,1],[7680,7828,2],[7838,7934,2],[7944,7951,1],[7960,7965,1],[7976,7983,1],[7992,7999,1],[8008,8013,1],[8025,8031,2],[8040,8047,1],[8072,8079,1],[8088,8095,1],[8104,8111,1],[8120,8124,1],[8136,8140,1],[8152,8155,1],[8168,8172,1],[8184,8188,1],[8486,8490,4],[8491,8498,7],[8579,11264,2685],[11265,11311,1],[11360,11362,2],[11363,11364,1],[11367,11373,2],[11374,11376,1],[11378,11381,3],[11390,11392,1],[11394,11490,2],[11499,11501,2],[11506,42560,31054],[42562,42604,2],[42624,42650,2],[42786,42798,2],[42802,42862,2],[42873,42877,2],[42878,42886,2],[42891,42893,2],[42896,42898,2],[42902,42922,2],[42923,42926,1],[42928,42932,1],[42934,42948,2],[42949,42951,1],[42953,42960,7],[42966,42968,2],[42997,65313,22316],[65314,65338,1],[66560,66599,1],[66736,66771,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[68736,68786,1],[71840,71871,1],[93760,93791,1],[125184,125217,1]]),t(wt,"Lm",[[688,705,1],[710,721,1],[736,740,1],[748,750,2],[884,890,6],[1369,1600,231],[1765,1766,1],[2036,2037,1],[2042,2074,32],[2084,2088,4],[2249,2417,168],[3654,3782,128],[4348,6103,1755],[6211,6823,612],[7288,7293,1],[7468,7530,1],[7544,7579,35],[7580,7615,1],[8305,8319,14],[8336,8348,1],[11388,11389,1],[11631,11823,192],[12293,12337,44],[12338,12341,1],[12347,12445,98],[12446,12540,94],[12541,12542,1],[40981,42232,1251],[42233,42237,1],[42508,42623,115],[42652,42653,1],[42775,42783,1],[42864,42888,24],[42994,42996,1],[43e3,43001,1],[43471,43494,23],[43632,43741,109],[43763,43764,1],[43868,43871,1],[43881,65392,21511],[65438,65439,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[92992,92995,1],[94099,94111,1],[94176,94177,1],[94179,110576,16397],[110577,110579,1],[110581,110587,1],[110589,110590,1],[122928,122989,1],[123191,123197,1],[124139,125259,1120]]),t(wt,"Lo",[[170,186,16],[443,448,5],[449,451,1],[660,1488,828],[1489,1514,1],[1519,1522,1],[1568,1599,1],[1601,1610,1],[1646,1647,1],[1649,1747,1],[1749,1774,25],[1775,1786,11],[1787,1788,1],[1791,1808,17],[1810,1839,1],[1869,1957,1],[1969,1994,25],[1995,2026,1],[2048,2069,1],[2112,2136,1],[2144,2154,1],[2160,2183,1],[2185,2190,1],[2208,2248,1],[2308,2361,1],[2365,2384,19],[2392,2401,1],[2418,2432,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2493,2510,17],[2524,2525,1],[2527,2529,1],[2544,2545,1],[2556,2565,9],[2566,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2649,2652,1],[2654,2674,20],[2675,2676,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2749,2768,19],[2784,2785,1],[2809,2821,12],[2822,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2877,2908,31],[2909,2911,2],[2912,2913,1],[2929,2947,18],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3024,3077,53],[3078,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3133,3160,27],[3161,3162,1],[3165,3168,3],[3169,3200,31],[3205,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3261,3293,32],[3294,3296,2],[3297,3313,16],[3314,3332,18],[3333,3340,1],[3342,3344,1],[3346,3386,1],[3389,3406,17],[3412,3414,1],[3423,3425,1],[3450,3455,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3585,3632,1],[3634,3635,1],[3648,3653,1],[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3760,1],[3762,3763,1],[3773,3776,3],[3777,3780,1],[3804,3807,1],[3840,3904,64],[3905,3911,1],[3913,3948,1],[3976,3980,1],[4096,4138,1],[4159,4176,17],[4177,4181,1],[4186,4189,1],[4193,4197,4],[4198,4206,8],[4207,4208,1],[4213,4225,1],[4238,4352,114],[4353,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4992,5007,1],[5121,5740,1],[5743,5759,1],[5761,5786,1],[5792,5866,1],[5873,5880,1],[5888,5905,1],[5919,5937,1],[5952,5969,1],[5984,5996,1],[5998,6e3,1],[6016,6067,1],[6108,6176,68],[6177,6210,1],[6212,6264,1],[6272,6276,1],[6279,6312,1],[6314,6320,6],[6321,6389,1],[6400,6430,1],[6480,6509,1],[6512,6516,1],[6528,6571,1],[6576,6601,1],[6656,6678,1],[6688,6740,1],[6917,6963,1],[6981,6988,1],[7043,7072,1],[7086,7087,1],[7098,7141,1],[7168,7203,1],[7245,7247,1],[7258,7287,1],[7401,7404,1],[7406,7411,1],[7413,7414,1],[7418,8501,1083],[8502,8504,1],[11568,11623,1],[11648,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[12294,12348,54],[12353,12438,1],[12447,12449,2],[12450,12538,1],[12543,12549,6],[12550,12591,1],[12593,12686,1],[12704,12735,1],[12784,12799,1],[13312,19903,1],[19968,40980,1],[40982,42124,1],[42192,42231,1],[42240,42507,1],[42512,42527,1],[42538,42539,1],[42606,42656,50],[42657,42725,1],[42895,42999,104],[43003,43009,1],[43011,43013,1],[43015,43018,1],[43020,43042,1],[43072,43123,1],[43138,43187,1],[43250,43255,1],[43259,43261,2],[43262,43274,12],[43275,43301,1],[43312,43334,1],[43360,43388,1],[43396,43442,1],[43488,43492,1],[43495,43503,1],[43514,43518,1],[43520,43560,1],[43584,43586,1],[43588,43595,1],[43616,43631,1],[43633,43638,1],[43642,43646,4],[43647,43695,1],[43697,43701,4],[43702,43705,3],[43706,43709,1],[43712,43714,2],[43739,43740,1],[43744,43754,1],[43762,43777,15],[43778,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[43968,44002,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[63744,64109,1],[64112,64217,1],[64285,64287,2],[64288,64296,1],[64298,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64433,1],[64467,64829,1],[64848,64911,1],[64914,64967,1],[65008,65019,1],[65136,65140,1],[65142,65276,1],[65382,65391,1],[65393,65437,1],[65440,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1],[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1],[66176,66204,1],[66208,66256,1],[66304,66335,1],[66349,66368,1],[66370,66377,1],[66384,66421,1],[66432,66461,1],[66464,66499,1],[66504,66511,1],[66640,66717,1],[66816,66855,1],[66864,66915,1],[67072,67382,1],[67392,67413,1],[67424,67431,1],[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3],[67648,67669,1],[67680,67702,1],[67712,67742,1],[67808,67826,1],[67828,67829,1],[67840,67861,1],[67872,67897,1],[67968,68023,1],[68030,68031,1],[68096,68112,16],[68113,68115,1],[68117,68119,1],[68121,68149,1],[68192,68220,1],[68224,68252,1],[68288,68295,1],[68297,68324,1],[68352,68405,1],[68416,68437,1],[68448,68466,1],[68480,68497,1],[68608,68680,1],[68864,68899,1],[69248,69289,1],[69296,69297,1],[69376,69404,1],[69415,69424,9],[69425,69445,1],[69488,69505,1],[69552,69572,1],[69600,69622,1],[69635,69687,1],[69745,69746,1],[69749,69763,14],[69764,69807,1],[69840,69864,1],[69891,69926,1],[69956,69959,3],[69968,70002,1],[70006,70019,13],[70020,70066,1],[70081,70084,1],[70106,70108,2],[70144,70161,1],[70163,70187,1],[70207,70208,1],[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70312,1],[70320,70366,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70461,70480,19],[70493,70497,1],[70656,70708,1],[70727,70730,1],[70751,70753,1],[70784,70831,1],[70852,70853,1],[70855,71040,185],[71041,71086,1],[71128,71131,1],[71168,71215,1],[71236,71296,60],[71297,71338,1],[71352,71424,72],[71425,71450,1],[71488,71494,1],[71680,71723,1],[71935,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71983,1],[71999,72001,2],[72096,72103,1],[72106,72144,1],[72161,72163,2],[72192,72203,11],[72204,72242,1],[72250,72272,22],[72284,72329,1],[72349,72368,19],[72369,72440,1],[72704,72712,1],[72714,72750,1],[72768,72818,50],[72819,72847,1],[72960,72966,1],[72968,72969,1],[72971,73008,1],[73030,73056,26],[73057,73061,1],[73063,73064,1],[73066,73097,1],[73112,73440,328],[73441,73458,1],[73474,73476,2],[73477,73488,1],[73490,73523,1],[73648,73728,80],[73729,74649,1],[74880,75075,1],[77712,77808,1],[77824,78895,1],[78913,78918,1],[82944,83526,1],[92160,92728,1],[92736,92766,1],[92784,92862,1],[92880,92909,1],[92928,92975,1],[93027,93047,1],[93053,93071,1],[93952,94026,1],[94032,94208,176],[94209,100343,1],[100352,101589,1],[101632,101640,1],[110592,110882,1],[110898,110928,30],[110929,110930,1],[110933,110948,15],[110949,110951,1],[110960,111355,1],[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[122634,123136,502],[123137,123180,1],[123214,123536,322],[123537,123565,1],[123584,123627,1],[124112,124138,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1],[124928,125124,1],[126464,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),t(wt,"Lt",[[453,459,3],[498,8072,7574],[8073,8079,1],[8088,8095,1],[8104,8111,1],[8124,8140,16],[8188,8188,1]]),t(wt,"foldLt",[[452,454,2],[455,457,2],[458,460,2],[497,499,2],[8064,8071,1],[8080,8087,1],[8096,8103,1],[8115,8131,16],[8179,8179,1]]),t(wt,"Lu",[[65,90,1],[192,214,1],[216,222,1],[256,310,2],[313,327,2],[330,376,2],[377,381,2],[385,386,1],[388,390,2],[391,393,2],[394,395,1],[398,401,1],[403,404,1],[406,408,1],[412,413,1],[415,416,1],[418,422,2],[423,425,2],[428,430,2],[431,433,2],[434,435,1],[437,439,2],[440,444,4],[452,461,3],[463,475,2],[478,494,2],[497,500,3],[502,504,1],[506,562,2],[570,571,1],[573,574,1],[577,579,2],[580,582,1],[584,590,2],[880,882,2],[886,895,9],[902,904,2],[905,906,1],[908,910,2],[911,913,2],[914,929,1],[931,939,1],[975,978,3],[979,980,1],[984,1006,2],[1012,1015,3],[1017,1018,1],[1021,1071,1],[1120,1152,2],[1162,1216,2],[1217,1229,2],[1232,1326,2],[1329,1366,1],[4256,4293,1],[4295,4301,6],[5024,5109,1],[7312,7354,1],[7357,7359,1],[7680,7828,2],[7838,7934,2],[7944,7951,1],[7960,7965,1],[7976,7983,1],[7992,7999,1],[8008,8013,1],[8025,8031,2],[8040,8047,1],[8120,8123,1],[8136,8139,1],[8152,8155,1],[8168,8172,1],[8184,8187,1],[8450,8455,5],[8459,8461,1],[8464,8466,1],[8469,8473,4],[8474,8477,1],[8484,8490,2],[8491,8493,1],[8496,8499,1],[8510,8511,1],[8517,8579,62],[11264,11311,1],[11360,11362,2],[11363,11364,1],[11367,11373,2],[11374,11376,1],[11378,11381,3],[11390,11392,1],[11394,11490,2],[11499,11501,2],[11506,42560,31054],[42562,42604,2],[42624,42650,2],[42786,42798,2],[42802,42862,2],[42873,42877,2],[42878,42886,2],[42891,42893,2],[42896,42898,2],[42902,42922,2],[42923,42926,1],[42928,42932,1],[42934,42948,2],[42949,42951,1],[42953,42960,7],[42966,42968,2],[42997,65313,22316],[65314,65338,1],[66560,66599,1],[66736,66771,1],[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[68736,68786,1],[71840,71871,1],[93760,93791,1],[119808,119833,1],[119860,119885,1],[119912,119937,1],[119964,119966,2],[119967,119973,3],[119974,119977,3],[119978,119980,1],[119982,119989,1],[120016,120041,1],[120068,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120120,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120172,120197,1],[120224,120249,1],[120276,120301,1],[120328,120353,1],[120380,120405,1],[120432,120457,1],[120488,120512,1],[120546,120570,1],[120604,120628,1],[120662,120686,1],[120720,120744,1],[120778,125184,4406],[125185,125217,1]]),t(wt,"Upper",wt.Lu),t(wt,"foldLu",[[97,122,1],[181,223,42],[224,246,1],[248,255,1],[257,303,2],[307,311,2],[314,328,2],[331,375,2],[378,382,2],[383,384,1],[387,389,2],[392,396,4],[402,405,3],[409,410,1],[414,417,3],[419,421,2],[424,429,5],[432,436,4],[438,441,3],[445,447,2],[453,454,1],[456,457,1],[459,460,1],[462,476,2],[477,495,2],[498,499,1],[501,505,4],[507,543,2],[547,563,2],[572,575,3],[576,578,2],[583,591,2],[592,596,1],[598,599,1],[601,603,2],[604,608,4],[609,613,2],[614,616,2],[617,620,1],[623,625,2],[626,629,3],[637,640,3],[642,643,1],[647,652,1],[658,669,11],[670,837,167],[881,883,2],[887,891,4],[892,893,1],[940,943,1],[945,974,1],[976,977,1],[981,983,1],[985,1007,2],[1008,1011,1],[1013,1019,3],[1072,1119,1],[1121,1153,2],[1163,1215,2],[1218,1230,2],[1231,1327,2],[1377,1414,1],[4304,4346,1],[4349,4351,1],[5112,5117,1],[7296,7304,1],[7545,7549,4],[7566,7681,115],[7683,7829,2],[7835,7841,6],[7843,7935,2],[7936,7943,1],[7952,7957,1],[7968,7975,1],[7984,7991,1],[8e3,8005,1],[8017,8023,2],[8032,8039,1],[8048,8061,1],[8112,8113,1],[8126,8144,18],[8145,8160,15],[8161,8165,4],[8526,8580,54],[11312,11359,1],[11361,11365,4],[11366,11372,2],[11379,11382,3],[11393,11491,2],[11500,11502,2],[11507,11520,13],[11521,11557,1],[11559,11565,6],[42561,42605,2],[42625,42651,2],[42787,42799,2],[42803,42863,2],[42874,42876,2],[42879,42887,2],[42892,42897,5],[42899,42900,1],[42903,42921,2],[42933,42947,2],[42952,42954,2],[42961,42967,6],[42969,42998,29],[43859,43888,29],[43889,43967,1],[65345,65370,1],[66600,66639,1],[66776,66811,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1],[68800,68850,1],[71872,71903,1],[93792,93823,1],[125218,125251,1]]),t(wt,"M",[[768,879,1],[1155,1161,1],[1425,1469,1],[1471,1473,2],[1474,1476,2],[1477,1479,2],[1552,1562,1],[1611,1631,1],[1648,1750,102],[1751,1756,1],[1759,1764,1],[1767,1768,1],[1770,1773,1],[1809,1840,31],[1841,1866,1],[1958,1968,1],[2027,2035,1],[2045,2070,25],[2071,2073,1],[2075,2083,1],[2085,2087,1],[2089,2093,1],[2137,2139,1],[2200,2207,1],[2250,2273,1],[2275,2307,1],[2362,2364,1],[2366,2383,1],[2385,2391,1],[2402,2403,1],[2433,2435,1],[2492,2494,2],[2495,2500,1],[2503,2504,1],[2507,2509,1],[2519,2530,11],[2531,2558,27],[2561,2563,1],[2620,2622,2],[2623,2626,1],[2631,2632,1],[2635,2637,1],[2641,2672,31],[2673,2677,4],[2689,2691,1],[2748,2750,2],[2751,2757,1],[2759,2761,1],[2763,2765,1],[2786,2787,1],[2810,2815,1],[2817,2819,1],[2876,2878,2],[2879,2884,1],[2887,2888,1],[2891,2893,1],[2901,2903,1],[2914,2915,1],[2946,3006,60],[3007,3010,1],[3014,3016,1],[3018,3021,1],[3031,3072,41],[3073,3076,1],[3132,3134,2],[3135,3140,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3170,3171,1],[3201,3203,1],[3260,3262,2],[3263,3268,1],[3270,3272,1],[3274,3277,1],[3285,3286,1],[3298,3299,1],[3315,3328,13],[3329,3331,1],[3387,3388,1],[3390,3396,1],[3398,3400,1],[3402,3405,1],[3415,3426,11],[3427,3457,30],[3458,3459,1],[3530,3535,5],[3536,3540,1],[3542,3544,2],[3545,3551,1],[3570,3571,1],[3633,3636,3],[3637,3642,1],[3655,3662,1],[3761,3764,3],[3765,3772,1],[3784,3790,1],[3864,3865,1],[3893,3897,2],[3902,3903,1],[3953,3972,1],[3974,3975,1],[3981,3991,1],[3993,4028,1],[4038,4139,101],[4140,4158,1],[4182,4185,1],[4190,4192,1],[4194,4196,1],[4199,4205,1],[4209,4212,1],[4226,4237,1],[4239,4250,11],[4251,4253,1],[4957,4959,1],[5906,5909,1],[5938,5940,1],[5970,5971,1],[6002,6003,1],[6068,6099,1],[6109,6155,46],[6156,6157,1],[6159,6277,118],[6278,6313,35],[6432,6443,1],[6448,6459,1],[6679,6683,1],[6741,6750,1],[6752,6780,1],[6783,6832,49],[6833,6862,1],[6912,6916,1],[6964,6980,1],[7019,7027,1],[7040,7042,1],[7073,7085,1],[7142,7155,1],[7204,7223,1],[7376,7378,1],[7380,7400,1],[7405,7412,7],[7415,7417,1],[7616,7679,1],[8400,8432,1],[11503,11505,1],[11647,11744,97],[11745,11775,1],[12330,12335,1],[12441,12442,1],[42607,42610,1],[42612,42621,1],[42654,42655,1],[42736,42737,1],[43010,43014,4],[43019,43043,24],[43044,43047,1],[43052,43136,84],[43137,43188,51],[43189,43205,1],[43232,43249,1],[43263,43302,39],[43303,43309,1],[43335,43347,1],[43392,43395,1],[43443,43456,1],[43493,43561,68],[43562,43574,1],[43587,43596,9],[43597,43643,46],[43644,43645,1],[43696,43698,2],[43699,43700,1],[43703,43704,1],[43710,43711,1],[43713,43755,42],[43756,43759,1],[43765,43766,1],[44003,44010,1],[44012,44013,1],[64286,65024,738],[65025,65039,1],[65056,65071,1],[66045,66272,227],[66422,66426,1],[68097,68099,1],[68101,68102,1],[68108,68111,1],[68152,68154,1],[68159,68325,166],[68326,68900,574],[68901,68903,1],[69291,69292,1],[69373,69375,1],[69446,69456,1],[69506,69509,1],[69632,69634,1],[69688,69702,1],[69744,69747,3],[69748,69759,11],[69760,69762,1],[69808,69818,1],[69826,69888,62],[69889,69890,1],[69927,69940,1],[69957,69958,1],[70003,70016,13],[70017,70018,1],[70067,70080,1],[70089,70092,1],[70094,70095,1],[70188,70199,1],[70206,70209,3],[70367,70378,1],[70400,70403,1],[70459,70460,1],[70462,70468,1],[70471,70472,1],[70475,70477,1],[70487,70498,11],[70499,70502,3],[70503,70508,1],[70512,70516,1],[70709,70726,1],[70750,70832,82],[70833,70851,1],[71087,71093,1],[71096,71104,1],[71132,71133,1],[71216,71232,1],[71339,71351,1],[71453,71467,1],[71724,71738,1],[71984,71989,1],[71991,71992,1],[71995,71998,1],[72e3,72002,2],[72003,72145,142],[72146,72151,1],[72154,72160,1],[72164,72193,29],[72194,72202,1],[72243,72249,1],[72251,72254,1],[72263,72273,10],[72274,72283,1],[72330,72345,1],[72751,72758,1],[72760,72767,1],[72850,72871,1],[72873,72886,1],[73009,73014,1],[73018,73020,2],[73021,73023,2],[73024,73029,1],[73031,73098,67],[73099,73102,1],[73104,73105,1],[73107,73111,1],[73459,73462,1],[73472,73473,1],[73475,73524,49],[73525,73530,1],[73534,73538,1],[78912,78919,7],[78920,78933,1],[92912,92916,1],[92976,92982,1],[94031,94033,2],[94034,94087,1],[94095,94098,1],[94180,94192,12],[94193,113821,19628],[113822,118528,4706],[118529,118573,1],[118576,118598,1],[119141,119145,1],[119149,119154,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[119362,119364,1],[121344,121398,1],[121403,121452,1],[121461,121476,15],[121499,121503,1],[121505,121519,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1],[123023,123184,161],[123185,123190,1],[123566,123628,62],[123629,123631,1],[124140,124143,1],[125136,125142,1],[125252,125258,1],[917760,917999,1]]),t(wt,"foldM",[[921,953,32],[8126,8126,1]]),t(wt,"Mc",[[2307,2363,56],[2366,2368,1],[2377,2380,1],[2382,2383,1],[2434,2435,1],[2494,2496,1],[2503,2504,1],[2507,2508,1],[2519,2563,44],[2622,2624,1],[2691,2750,59],[2751,2752,1],[2761,2763,2],[2764,2818,54],[2819,2878,59],[2880,2887,7],[2888,2891,3],[2892,2903,11],[3006,3007,1],[3009,3010,1],[3014,3016,1],[3018,3020,1],[3031,3073,42],[3074,3075,1],[3137,3140,1],[3202,3203,1],[3262,3264,2],[3265,3268,1],[3271,3272,1],[3274,3275,1],[3285,3286,1],[3315,3330,15],[3331,3390,59],[3391,3392,1],[3398,3400,1],[3402,3404,1],[3415,3458,43],[3459,3535,76],[3536,3537,1],[3544,3551,1],[3570,3571,1],[3902,3903,1],[3967,4139,172],[4140,4145,5],[4152,4155,3],[4156,4182,26],[4183,4194,11],[4195,4196,1],[4199,4205,1],[4227,4228,1],[4231,4236,1],[4239,4250,11],[4251,4252,1],[5909,5940,31],[6070,6078,8],[6079,6085,1],[6087,6088,1],[6435,6438,1],[6441,6443,1],[6448,6449,1],[6451,6456,1],[6681,6682,1],[6741,6743,2],[6753,6755,2],[6756,6765,9],[6766,6770,1],[6916,6965,49],[6971,6973,2],[6974,6977,1],[6979,6980,1],[7042,7073,31],[7078,7079,1],[7082,7143,61],[7146,7148,1],[7150,7154,4],[7155,7204,49],[7205,7211,1],[7220,7221,1],[7393,7415,22],[12334,12335,1],[43043,43044,1],[43047,43136,89],[43137,43188,51],[43189,43203,1],[43346,43347,1],[43395,43444,49],[43445,43450,5],[43451,43454,3],[43455,43456,1],[43567,43568,1],[43571,43572,1],[43597,43643,46],[43645,43755,110],[43758,43759,1],[43765,44003,238],[44004,44006,2],[44007,44009,2],[44010,44012,2],[69632,69634,2],[69762,69808,46],[69809,69810,1],[69815,69816,1],[69932,69957,25],[69958,70018,60],[70067,70069,1],[70079,70080,1],[70094,70188,94],[70189,70190,1],[70194,70195,1],[70197,70368,171],[70369,70370,1],[70402,70403,1],[70462,70463,1],[70465,70468,1],[70471,70472,1],[70475,70477,1],[70487,70498,11],[70499,70709,210],[70710,70711,1],[70720,70721,1],[70725,70832,107],[70833,70834,1],[70841,70843,2],[70844,70846,1],[70849,71087,238],[71088,71089,1],[71096,71099,1],[71102,71216,114],[71217,71218,1],[71227,71228,1],[71230,71340,110],[71342,71343,1],[71350,71456,106],[71457,71462,5],[71724,71726,1],[71736,71984,248],[71985,71989,1],[71991,71992,1],[71997,72e3,3],[72002,72145,143],[72146,72147,1],[72156,72159,1],[72164,72249,85],[72279,72280,1],[72343,72751,408],[72766,72873,107],[72881,72884,3],[73098,73102,1],[73107,73108,1],[73110,73461,351],[73462,73475,13],[73524,73525,1],[73534,73535,1],[73537,94033,20496],[94034,94087,1],[94192,94193,1],[119141,119142,1],[119149,119154,1]]),t(wt,"Me",[[1160,1161,1],[6846,8413,1567],[8414,8416,1],[8418,8420,1],[42608,42610,1]]),t(wt,"Mn",[[768,879,1],[1155,1159,1],[1425,1469,1],[1471,1473,2],[1474,1476,2],[1477,1479,2],[1552,1562,1],[1611,1631,1],[1648,1750,102],[1751,1756,1],[1759,1764,1],[1767,1768,1],[1770,1773,1],[1809,1840,31],[1841,1866,1],[1958,1968,1],[2027,2035,1],[2045,2070,25],[2071,2073,1],[2075,2083,1],[2085,2087,1],[2089,2093,1],[2137,2139,1],[2200,2207,1],[2250,2273,1],[2275,2306,1],[2362,2364,2],[2369,2376,1],[2381,2385,4],[2386,2391,1],[2402,2403,1],[2433,2492,59],[2497,2500,1],[2509,2530,21],[2531,2558,27],[2561,2562,1],[2620,2625,5],[2626,2631,5],[2632,2635,3],[2636,2637,1],[2641,2672,31],[2673,2677,4],[2689,2690,1],[2748,2753,5],[2754,2757,1],[2759,2760,1],[2765,2786,21],[2787,2810,23],[2811,2815,1],[2817,2876,59],[2879,2881,2],[2882,2884,1],[2893,2901,8],[2902,2914,12],[2915,2946,31],[3008,3021,13],[3072,3076,4],[3132,3134,2],[3135,3136,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3170,3171,1],[3201,3260,59],[3263,3270,7],[3276,3277,1],[3298,3299,1],[3328,3329,1],[3387,3388,1],[3393,3396,1],[3405,3426,21],[3427,3457,30],[3530,3538,8],[3539,3540,1],[3542,3633,91],[3636,3642,1],[3655,3662,1],[3761,3764,3],[3765,3772,1],[3784,3790,1],[3864,3865,1],[3893,3897,2],[3953,3966,1],[3968,3972,1],[3974,3975,1],[3981,3991,1],[3993,4028,1],[4038,4141,103],[4142,4144,1],[4146,4151,1],[4153,4154,1],[4157,4158,1],[4184,4185,1],[4190,4192,1],[4209,4212,1],[4226,4229,3],[4230,4237,7],[4253,4957,704],[4958,4959,1],[5906,5908,1],[5938,5939,1],[5970,5971,1],[6002,6003,1],[6068,6069,1],[6071,6077,1],[6086,6089,3],[6090,6099,1],[6109,6155,46],[6156,6157,1],[6159,6277,118],[6278,6313,35],[6432,6434,1],[6439,6440,1],[6450,6457,7],[6458,6459,1],[6679,6680,1],[6683,6742,59],[6744,6750,1],[6752,6754,2],[6757,6764,1],[6771,6780,1],[6783,6832,49],[6833,6845,1],[6847,6862,1],[6912,6915,1],[6964,6966,2],[6967,6970,1],[6972,6978,6],[7019,7027,1],[7040,7041,1],[7074,7077,1],[7080,7081,1],[7083,7085,1],[7142,7144,2],[7145,7149,4],[7151,7153,1],[7212,7219,1],[7222,7223,1],[7376,7378,1],[7380,7392,1],[7394,7400,1],[7405,7412,7],[7416,7417,1],[7616,7679,1],[8400,8412,1],[8417,8421,4],[8422,8432,1],[11503,11505,1],[11647,11744,97],[11745,11775,1],[12330,12333,1],[12441,12442,1],[42607,42612,5],[42613,42621,1],[42654,42655,1],[42736,42737,1],[43010,43014,4],[43019,43045,26],[43046,43052,6],[43204,43205,1],[43232,43249,1],[43263,43302,39],[43303,43309,1],[43335,43345,1],[43392,43394,1],[43443,43446,3],[43447,43449,1],[43452,43453,1],[43493,43561,68],[43562,43566,1],[43569,43570,1],[43573,43574,1],[43587,43596,9],[43644,43696,52],[43698,43700,1],[43703,43704,1],[43710,43711,1],[43713,43756,43],[43757,43766,9],[44005,44008,3],[44013,64286,20273],[65024,65039,1],[65056,65071,1],[66045,66272,227],[66422,66426,1],[68097,68099,1],[68101,68102,1],[68108,68111,1],[68152,68154,1],[68159,68325,166],[68326,68900,574],[68901,68903,1],[69291,69292,1],[69373,69375,1],[69446,69456,1],[69506,69509,1],[69633,69688,55],[69689,69702,1],[69744,69747,3],[69748,69759,11],[69760,69761,1],[69811,69814,1],[69817,69818,1],[69826,69888,62],[69889,69890,1],[69927,69931,1],[69933,69940,1],[70003,70016,13],[70017,70070,53],[70071,70078,1],[70089,70092,1],[70095,70191,96],[70192,70193,1],[70196,70198,2],[70199,70206,7],[70209,70367,158],[70371,70378,1],[70400,70401,1],[70459,70460,1],[70464,70502,38],[70503,70508,1],[70512,70516,1],[70712,70719,1],[70722,70724,1],[70726,70750,24],[70835,70840,1],[70842,70847,5],[70848,70850,2],[70851,71090,239],[71091,71093,1],[71100,71101,1],[71103,71104,1],[71132,71133,1],[71219,71226,1],[71229,71231,2],[71232,71339,107],[71341,71344,3],[71345,71349,1],[71351,71453,102],[71454,71455,1],[71458,71461,1],[71463,71467,1],[71727,71735,1],[71737,71738,1],[71995,71996,1],[71998,72003,5],[72148,72151,1],[72154,72155,1],[72160,72193,33],[72194,72202,1],[72243,72248,1],[72251,72254,1],[72263,72273,10],[72274,72278,1],[72281,72283,1],[72330,72342,1],[72344,72345,1],[72752,72758,1],[72760,72765,1],[72767,72850,83],[72851,72871,1],[72874,72880,1],[72882,72883,1],[72885,72886,1],[73009,73014,1],[73018,73020,2],[73021,73023,2],[73024,73029,1],[73031,73104,73],[73105,73109,4],[73111,73459,348],[73460,73472,12],[73473,73526,53],[73527,73530,1],[73536,73538,2],[78912,78919,7],[78920,78933,1],[92912,92916,1],[92976,92982,1],[94031,94095,64],[94096,94098,1],[94180,113821,19641],[113822,118528,4706],[118529,118573,1],[118576,118598,1],[119143,119145,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[119362,119364,1],[121344,121398,1],[121403,121452,1],[121461,121476,15],[121499,121503,1],[121505,121519,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1],[123023,123184,161],[123185,123190,1],[123566,123628,62],[123629,123631,1],[124140,124143,1],[125136,125142,1],[125252,125258,1],[917760,917999,1]]),t(wt,"foldMn",[[921,953,32],[8126,8126,1]]),t(wt,"N",[[48,57,1],[178,179,1],[185,188,3],[189,190,1],[1632,1641,1],[1776,1785,1],[1984,1993,1],[2406,2415,1],[2534,2543,1],[2548,2553,1],[2662,2671,1],[2790,2799,1],[2918,2927,1],[2930,2935,1],[3046,3058,1],[3174,3183,1],[3192,3198,1],[3302,3311,1],[3416,3422,1],[3430,3448,1],[3558,3567,1],[3664,3673,1],[3792,3801,1],[3872,3891,1],[4160,4169,1],[4240,4249,1],[4969,4988,1],[5870,5872,1],[6112,6121,1],[6128,6137,1],[6160,6169,1],[6470,6479,1],[6608,6618,1],[6784,6793,1],[6800,6809,1],[6992,7001,1],[7088,7097,1],[7232,7241,1],[7248,7257,1],[8304,8308,4],[8309,8313,1],[8320,8329,1],[8528,8578,1],[8581,8585,1],[9312,9371,1],[9450,9471,1],[10102,10131,1],[11517,12295,778],[12321,12329,1],[12344,12346,1],[12690,12693,1],[12832,12841,1],[12872,12879,1],[12881,12895,1],[12928,12937,1],[12977,12991,1],[42528,42537,1],[42726,42735,1],[43056,43061,1],[43216,43225,1],[43264,43273,1],[43472,43481,1],[43504,43513,1],[43600,43609,1],[44016,44025,1],[65296,65305,1],[65799,65843,1],[65856,65912,1],[65930,65931,1],[66273,66299,1],[66336,66339,1],[66369,66378,9],[66513,66517,1],[66720,66729,1],[67672,67679,1],[67705,67711,1],[67751,67759,1],[67835,67839,1],[67862,67867,1],[68028,68029,1],[68032,68047,1],[68050,68095,1],[68160,68168,1],[68221,68222,1],[68253,68255,1],[68331,68335,1],[68440,68447,1],[68472,68479,1],[68521,68527,1],[68858,68863,1],[68912,68921,1],[69216,69246,1],[69405,69414,1],[69457,69460,1],[69573,69579,1],[69714,69743,1],[69872,69881,1],[69942,69951,1],[70096,70105,1],[70113,70132,1],[70384,70393,1],[70736,70745,1],[70864,70873,1],[71248,71257,1],[71360,71369,1],[71472,71483,1],[71904,71922,1],[72016,72025,1],[72784,72812,1],[73040,73049,1],[73120,73129,1],[73552,73561,1],[73664,73684,1],[74752,74862,1],[92768,92777,1],[92864,92873,1],[93008,93017,1],[93019,93025,1],[93824,93846,1],[119488,119507,1],[119520,119539,1],[119648,119672,1],[120782,120831,1],[123200,123209,1],[123632,123641,1],[124144,124153,1],[125127,125135,1],[125264,125273,1],[126065,126123,1],[126125,126127,1],[126129,126132,1],[126209,126253,1],[126255,126269,1],[127232,127244,1],[130032,130041,1]]),t(wt,"Nd",[[48,57,1],[1632,1641,1],[1776,1785,1],[1984,1993,1],[2406,2415,1],[2534,2543,1],[2662,2671,1],[2790,2799,1],[2918,2927,1],[3046,3055,1],[3174,3183,1],[3302,3311,1],[3430,3439,1],[3558,3567,1],[3664,3673,1],[3792,3801,1],[3872,3881,1],[4160,4169,1],[4240,4249,1],[6112,6121,1],[6160,6169,1],[6470,6479,1],[6608,6617,1],[6784,6793,1],[6800,6809,1],[6992,7001,1],[7088,7097,1],[7232,7241,1],[7248,7257,1],[42528,42537,1],[43216,43225,1],[43264,43273,1],[43472,43481,1],[43504,43513,1],[43600,43609,1],[44016,44025,1],[65296,65305,1],[66720,66729,1],[68912,68921,1],[69734,69743,1],[69872,69881,1],[69942,69951,1],[70096,70105,1],[70384,70393,1],[70736,70745,1],[70864,70873,1],[71248,71257,1],[71360,71369,1],[71472,71481,1],[71904,71913,1],[72016,72025,1],[72784,72793,1],[73040,73049,1],[73120,73129,1],[73552,73561,1],[92768,92777,1],[92864,92873,1],[93008,93017,1],[120782,120831,1],[123200,123209,1],[123632,123641,1],[124144,124153,1],[125264,125273,1],[130032,130041,1]]),t(wt,"Nl",[[5870,5872,1],[8544,8578,1],[8581,8584,1],[12295,12321,26],[12322,12329,1],[12344,12346,1],[42726,42735,1],[65856,65908,1],[66369,66378,9],[66513,66517,1],[74752,74862,1]]),t(wt,"No",[[178,179,1],[185,188,3],[189,190,1],[2548,2553,1],[2930,2935,1],[3056,3058,1],[3192,3198,1],[3416,3422,1],[3440,3448,1],[3882,3891,1],[4969,4988,1],[6128,6137,1],[6618,8304,1686],[8308,8313,1],[8320,8329,1],[8528,8543,1],[8585,9312,727],[9313,9371,1],[9450,9471,1],[10102,10131,1],[11517,12690,1173],[12691,12693,1],[12832,12841,1],[12872,12879,1],[12881,12895,1],[12928,12937,1],[12977,12991,1],[43056,43061,1],[65799,65843,1],[65909,65912,1],[65930,65931,1],[66273,66299,1],[66336,66339,1],[67672,67679,1],[67705,67711,1],[67751,67759,1],[67835,67839,1],[67862,67867,1],[68028,68029,1],[68032,68047,1],[68050,68095,1],[68160,68168,1],[68221,68222,1],[68253,68255,1],[68331,68335,1],[68440,68447,1],[68472,68479,1],[68521,68527,1],[68858,68863,1],[69216,69246,1],[69405,69414,1],[69457,69460,1],[69573,69579,1],[69714,69733,1],[70113,70132,1],[71482,71483,1],[71914,71922,1],[72794,72812,1],[73664,73684,1],[93019,93025,1],[93824,93846,1],[119488,119507,1],[119520,119539,1],[119648,119672,1],[125127,125135,1],[126065,126123,1],[126125,126127,1],[126129,126132,1],[126209,126253,1],[126255,126269,1],[127232,127244,1]]),t(wt,"P",[[33,35,1],[37,42,1],[44,47,1],[58,59,1],[63,64,1],[91,93,1],[95,123,28],[125,161,36],[167,171,4],[182,183,1],[187,191,4],[894,903,9],[1370,1375,1],[1417,1418,1],[1470,1472,2],[1475,1478,3],[1523,1524,1],[1545,1546,1],[1548,1549,1],[1563,1565,2],[1566,1567,1],[1642,1645,1],[1748,1792,44],[1793,1805,1],[2039,2041,1],[2096,2110,1],[2142,2404,262],[2405,2416,11],[2557,2678,121],[2800,3191,391],[3204,3572,368],[3663,3674,11],[3675,3844,169],[3845,3858,1],[3860,3898,38],[3899,3901,1],[3973,4048,75],[4049,4052,1],[4057,4058,1],[4170,4175,1],[4347,4960,613],[4961,4968,1],[5120,5742,622],[5787,5788,1],[5867,5869,1],[5941,5942,1],[6100,6102,1],[6104,6106,1],[6144,6154,1],[6468,6469,1],[6686,6687,1],[6816,6822,1],[6824,6829,1],[7002,7008,1],[7037,7038,1],[7164,7167,1],[7227,7231,1],[7294,7295,1],[7360,7367,1],[7379,8208,829],[8209,8231,1],[8240,8259,1],[8261,8273,1],[8275,8286,1],[8317,8318,1],[8333,8334,1],[8968,8971,1],[9001,9002,1],[10088,10101,1],[10181,10182,1],[10214,10223,1],[10627,10648,1],[10712,10715,1],[10748,10749,1],[11513,11516,1],[11518,11519,1],[11632,11776,144],[11777,11822,1],[11824,11855,1],[11858,11869,1],[12289,12291,1],[12296,12305,1],[12308,12319,1],[12336,12349,13],[12448,12539,91],[42238,42239,1],[42509,42511,1],[42611,42622,11],[42738,42743,1],[43124,43127,1],[43214,43215,1],[43256,43258,1],[43260,43310,50],[43311,43359,48],[43457,43469,1],[43486,43487,1],[43612,43615,1],[43742,43743,1],[43760,43761,1],[44011,64830,20819],[64831,65040,209],[65041,65049,1],[65072,65106,1],[65108,65121,1],[65123,65128,5],[65130,65131,1],[65281,65283,1],[65285,65290,1],[65292,65295,1],[65306,65307,1],[65311,65312,1],[65339,65341,1],[65343,65371,28],[65373,65375,2],[65376,65381,1],[65792,65794,1],[66463,66512,49],[66927,67671,744],[67871,67903,32],[68176,68184,1],[68223,68336,113],[68337,68342,1],[68409,68415,1],[68505,68508,1],[69293,69461,168],[69462,69465,1],[69510,69513,1],[69703,69709,1],[69819,69820,1],[69822,69825,1],[69952,69955,1],[70004,70005,1],[70085,70088,1],[70093,70107,14],[70109,70111,1],[70200,70205,1],[70313,70731,418],[70732,70735,1],[70746,70747,1],[70749,70854,105],[71105,71127,1],[71233,71235,1],[71264,71276,1],[71353,71484,131],[71485,71486,1],[71739,72004,265],[72005,72006,1],[72162,72255,93],[72256,72262,1],[72346,72348,1],[72350,72354,1],[72448,72457,1],[72769,72773,1],[72816,72817,1],[73463,73464,1],[73539,73551,1],[73727,74864,1137],[74865,74868,1],[77809,77810,1],[92782,92783,1],[92917,92983,66],[92984,92987,1],[92996,93847,851],[93848,93850,1],[94178,113823,19645],[121479,121483,1],[125278,125279,1]]),t(wt,"Pc",[[95,8255,8160],[8256,8276,20],[65075,65076,1],[65101,65103,1],[65343,65343,1]]),t(wt,"Pd",[[45,1418,1373],[1470,5120,3650],[6150,8208,2058],[8209,8213,1],[11799,11802,3],[11834,11835,1],[11840,11869,29],[12316,12336,20],[12448,65073,52625],[65074,65112,38],[65123,65293,170],[69293,69293,1]]),t(wt,"Pe",[[41,93,52],[125,3899,3774],[3901,5788,1887],[8262,8318,56],[8334,8969,635],[8971,9002,31],[10089,10101,2],[10182,10215,33],[10217,10223,2],[10628,10648,2],[10713,10715,2],[10749,11811,1062],[11813,11817,2],[11862,11868,2],[12297,12305,2],[12309,12315,2],[12318,12319,1],[64830,65048,218],[65078,65092,2],[65096,65114,18],[65116,65118,2],[65289,65341,52],[65373,65379,3]]),t(wt,"Pf",[[187,8217,8030],[8221,8250,29],[11779,11781,2],[11786,11789,3],[11805,11809,4]]),t(wt,"Pi",[[171,8216,8045],[8219,8220,1],[8223,8249,26],[11778,11780,2],[11785,11788,3],[11804,11808,4]]),t(wt,"Po",[[33,35,1],[37,39,1],[42,46,2],[47,58,11],[59,63,4],[64,92,28],[161,167,6],[182,183,1],[191,894,703],[903,1370,467],[1371,1375,1],[1417,1472,55],[1475,1478,3],[1523,1524,1],[1545,1546,1],[1548,1549,1],[1563,1565,2],[1566,1567,1],[1642,1645,1],[1748,1792,44],[1793,1805,1],[2039,2041,1],[2096,2110,1],[2142,2404,262],[2405,2416,11],[2557,2678,121],[2800,3191,391],[3204,3572,368],[3663,3674,11],[3675,3844,169],[3845,3858,1],[3860,3973,113],[4048,4052,1],[4057,4058,1],[4170,4175,1],[4347,4960,613],[4961,4968,1],[5742,5867,125],[5868,5869,1],[5941,5942,1],[6100,6102,1],[6104,6106,1],[6144,6149,1],[6151,6154,1],[6468,6469,1],[6686,6687,1],[6816,6822,1],[6824,6829,1],[7002,7008,1],[7037,7038,1],[7164,7167,1],[7227,7231,1],[7294,7295,1],[7360,7367,1],[7379,8214,835],[8215,8224,9],[8225,8231,1],[8240,8248,1],[8251,8254,1],[8257,8259,1],[8263,8273,1],[8275,8277,2],[8278,8286,1],[11513,11516,1],[11518,11519,1],[11632,11776,144],[11777,11782,5],[11783,11784,1],[11787,11790,3],[11791,11798,1],[11800,11801,1],[11803,11806,3],[11807,11818,11],[11819,11822,1],[11824,11833,1],[11836,11839,1],[11841,11843,2],[11844,11855,1],[11858,11860,1],[12289,12291,1],[12349,12539,190],[42238,42239,1],[42509,42511,1],[42611,42622,11],[42738,42743,1],[43124,43127,1],[43214,43215,1],[43256,43258,1],[43260,43310,50],[43311,43359,48],[43457,43469,1],[43486,43487,1],[43612,43615,1],[43742,43743,1],[43760,43761,1],[44011,65040,21029],[65041,65046,1],[65049,65072,23],[65093,65094,1],[65097,65100,1],[65104,65106,1],[65108,65111,1],[65119,65121,1],[65128,65130,2],[65131,65281,150],[65282,65283,1],[65285,65287,1],[65290,65294,2],[65295,65306,11],[65307,65311,4],[65312,65340,28],[65377,65380,3],[65381,65792,411],[65793,65794,1],[66463,66512,49],[66927,67671,744],[67871,67903,32],[68176,68184,1],[68223,68336,113],[68337,68342,1],[68409,68415,1],[68505,68508,1],[69461,69465,1],[69510,69513,1],[69703,69709,1],[69819,69820,1],[69822,69825,1],[69952,69955,1],[70004,70005,1],[70085,70088,1],[70093,70107,14],[70109,70111,1],[70200,70205,1],[70313,70731,418],[70732,70735,1],[70746,70747,1],[70749,70854,105],[71105,71127,1],[71233,71235,1],[71264,71276,1],[71353,71484,131],[71485,71486,1],[71739,72004,265],[72005,72006,1],[72162,72255,93],[72256,72262,1],[72346,72348,1],[72350,72354,1],[72448,72457,1],[72769,72773,1],[72816,72817,1],[73463,73464,1],[73539,73551,1],[73727,74864,1137],[74865,74868,1],[77809,77810,1],[92782,92783,1],[92917,92983,66],[92984,92987,1],[92996,93847,851],[93848,93850,1],[94178,113823,19645],[121479,121483,1],[125278,125279,1]]),t(wt,"Ps",[[40,91,51],[123,3898,3775],[3900,5787,1887],[8218,8222,4],[8261,8317,56],[8333,8968,635],[8970,9001,31],[10088,10100,2],[10181,10214,33],[10216,10222,2],[10627,10647,2],[10712,10714,2],[10748,11810,1062],[11812,11816,2],[11842,11861,19],[11863,11867,2],[12296,12304,2],[12308,12314,2],[12317,64831,52514],[65047,65077,30],[65079,65091,2],[65095,65113,18],[65115,65117,2],[65288,65339,51],[65371,65375,4],[65378,65378,1]]),t(wt,"S",[[36,43,7],[60,62,1],[94,96,2],[124,126,2],[162,166,1],[168,169,1],[172,174,2],[175,177,1],[180,184,4],[215,247,32],[706,709,1],[722,735,1],[741,747,1],[749,751,2],[752,767,1],[885,900,15],[901,1014,113],[1154,1421,267],[1422,1423,1],[1542,1544,1],[1547,1550,3],[1551,1758,207],[1769,1789,20],[1790,2038,248],[2046,2047,1],[2184,2546,362],[2547,2554,7],[2555,2801,246],[2928,3059,131],[3060,3066,1],[3199,3407,208],[3449,3647,198],[3841,3843,1],[3859,3861,2],[3862,3863,1],[3866,3871,1],[3892,3896,2],[4030,4037,1],[4039,4044,1],[4046,4047,1],[4053,4056,1],[4254,4255,1],[5008,5017,1],[5741,6107,366],[6464,6622,158],[6623,6655,1],[7009,7018,1],[7028,7036,1],[8125,8127,2],[8128,8129,1],[8141,8143,1],[8157,8159,1],[8173,8175,1],[8189,8190,1],[8260,8274,14],[8314,8316,1],[8330,8332,1],[8352,8384,1],[8448,8449,1],[8451,8454,1],[8456,8457,1],[8468,8470,2],[8471,8472,1],[8478,8483,1],[8485,8489,2],[8494,8506,12],[8507,8512,5],[8513,8516,1],[8522,8525,1],[8527,8586,59],[8587,8592,5],[8593,8967,1],[8972,9e3,1],[9003,9254,1],[9280,9290,1],[9372,9449,1],[9472,10087,1],[10132,10180,1],[10183,10213,1],[10224,10626,1],[10649,10711,1],[10716,10747,1],[10750,11123,1],[11126,11157,1],[11159,11263,1],[11493,11498,1],[11856,11857,1],[11904,11929,1],[11931,12019,1],[12032,12245,1],[12272,12287,1],[12292,12306,14],[12307,12320,13],[12342,12343,1],[12350,12351,1],[12443,12444,1],[12688,12689,1],[12694,12703,1],[12736,12771,1],[12783,12800,17],[12801,12830,1],[12842,12871,1],[12880,12896,16],[12897,12927,1],[12938,12976,1],[12992,13311,1],[19904,19967,1],[42128,42182,1],[42752,42774,1],[42784,42785,1],[42889,42890,1],[43048,43051,1],[43062,43065,1],[43639,43641,1],[43867,43882,15],[43883,64297,20414],[64434,64450,1],[64832,64847,1],[64975,65020,45],[65021,65023,1],[65122,65124,2],[65125,65126,1],[65129,65284,155],[65291,65308,17],[65309,65310,1],[65342,65344,2],[65372,65374,2],[65504,65510,1],[65512,65518,1],[65532,65533,1],[65847,65855,1],[65913,65929,1],[65932,65934,1],[65936,65948,1],[65952,66e3,48],[66001,66044,1],[67703,67704,1],[68296,71487,3191],[73685,73713,1],[92988,92991,1],[92997,113820,20823],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119140,1],[119146,119148,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119296,119361,1],[119365,119552,187],[119553,119638,1],[120513,120539,26],[120571,120597,26],[120629,120655,26],[120687,120713,26],[120745,120771,26],[120832,121343,1],[121399,121402,1],[121453,121460,1],[121462,121475,1],[121477,121478,1],[123215,123647,432],[126124,126128,4],[126254,126704,450],[126705,126976,271],[126977,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127245,127405,1],[127462,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1]]),t(wt,"Sc",[[36,162,126],[163,165,1],[1423,1547,124],[2046,2047,1],[2546,2547,1],[2555,2801,246],[3065,3647,582],[6107,8352,2245],[8353,8384,1],[43064,65020,21956],[65129,65284,155],[65504,65505,1],[65509,65510,1],[73693,73696,1],[123647,126128,2481]]),t(wt,"Sk",[[94,96,2],[168,175,7],[180,184,4],[706,709,1],[722,735,1],[741,747,1],[749,751,2],[752,767,1],[885,900,15],[901,2184,1283],[8125,8127,2],[8128,8129,1],[8141,8143,1],[8157,8159,1],[8173,8175,1],[8189,8190,1],[12443,12444,1],[42752,42774,1],[42784,42785,1],[42889,42890,1],[43867,43882,15],[43883,64434,20551],[64435,64450,1],[65342,65344,2],[65507,127995,62488],[127996,127999,1]]),t(wt,"Sm",[[43,60,17],[61,62,1],[124,126,2],[172,177,5],[215,247,32],[1014,1542,528],[1543,1544,1],[8260,8274,14],[8314,8316,1],[8330,8332,1],[8472,8512,40],[8513,8516,1],[8523,8592,69],[8593,8596,1],[8602,8603,1],[8608,8614,3],[8622,8654,32],[8655,8658,3],[8660,8692,32],[8693,8959,1],[8992,8993,1],[9084,9115,31],[9116,9139,1],[9180,9185,1],[9655,9665,10],[9720,9727,1],[9839,10176,337],[10177,10180,1],[10183,10213,1],[10224,10239,1],[10496,10626,1],[10649,10711,1],[10716,10747,1],[10750,11007,1],[11056,11076,1],[11079,11084,1],[64297,65122,825],[65124,65126,1],[65291,65308,17],[65309,65310,1],[65372,65374,2],[65506,65513,7],[65514,65516,1],[120513,120539,26],[120571,120597,26],[120629,120655,26],[120687,120713,26],[120745,120771,26],[126704,126705,1]]),t(wt,"So",[[166,169,3],[174,176,2],[1154,1421,267],[1422,1550,128],[1551,1758,207],[1769,1789,20],[1790,2038,248],[2554,2928,374],[3059,3064,1],[3066,3199,133],[3407,3449,42],[3841,3843,1],[3859,3861,2],[3862,3863,1],[3866,3871,1],[3892,3896,2],[4030,4037,1],[4039,4044,1],[4046,4047,1],[4053,4056,1],[4254,4255,1],[5008,5017,1],[5741,6464,723],[6622,6655,1],[7009,7018,1],[7028,7036,1],[8448,8449,1],[8451,8454,1],[8456,8457,1],[8468,8470,2],[8471,8478,7],[8479,8483,1],[8485,8489,2],[8494,8506,12],[8507,8522,15],[8524,8525,1],[8527,8586,59],[8587,8597,10],[8598,8601,1],[8604,8607,1],[8609,8610,1],[8612,8613,1],[8615,8621,1],[8623,8653,1],[8656,8657,1],[8659,8661,2],[8662,8691,1],[8960,8967,1],[8972,8991,1],[8994,9e3,1],[9003,9083,1],[9085,9114,1],[9140,9179,1],[9186,9254,1],[9280,9290,1],[9372,9449,1],[9472,9654,1],[9656,9664,1],[9666,9719,1],[9728,9838,1],[9840,10087,1],[10132,10175,1],[10240,10495,1],[11008,11055,1],[11077,11078,1],[11085,11123,1],[11126,11157,1],[11159,11263,1],[11493,11498,1],[11856,11857,1],[11904,11929,1],[11931,12019,1],[12032,12245,1],[12272,12287,1],[12292,12306,14],[12307,12320,13],[12342,12343,1],[12350,12351,1],[12688,12689,1],[12694,12703,1],[12736,12771,1],[12783,12800,17],[12801,12830,1],[12842,12871,1],[12880,12896,16],[12897,12927,1],[12938,12976,1],[12992,13311,1],[19904,19967,1],[42128,42182,1],[43048,43051,1],[43062,43063,1],[43065,43639,574],[43640,43641,1],[64832,64847,1],[64975,65021,46],[65022,65023,1],[65508,65512,4],[65517,65518,1],[65532,65533,1],[65847,65855,1],[65913,65929,1],[65932,65934,1],[65936,65948,1],[65952,66e3,48],[66001,66044,1],[67703,67704,1],[68296,71487,3191],[73685,73692,1],[73697,73713,1],[92988,92991,1],[92997,113820,20823],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119140,1],[119146,119148,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119296,119361,1],[119365,119552,187],[119553,119638,1],[120832,121343,1],[121399,121402,1],[121453,121460,1],[121462,121475,1],[121477,121478,1],[123215,126124,2909],[126254,126976,722],[126977,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127245,127405,1],[127462,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,127994,1],[128e3,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1]]),t(wt,"Z",[[32,160,128],[5760,8192,2432],[8193,8202,1],[8232,8233,1],[8239,8287,48],[12288,12288,1]]),t(wt,"Zl",[[8232,8232,1]]),t(wt,"Zp",[[8233,8233,1]]),t(wt,"Zs",[[32,160,128],[5760,8192,2432],[8193,8202,1],[8239,8287,48],[12288,12288,1]]),t(wt,"Adlam",[[125184,125259,1],[125264,125273,1],[125278,125279,1]]),t(wt,"Ahom",[[71424,71450,1],[71453,71467,1],[71472,71494,1]]),t(wt,"Anatolian_Hieroglyphs",[[82944,83526,1]]),t(wt,"Arabic",[[1536,1540,1],[1542,1547,1],[1549,1562,1],[1564,1566,1],[1568,1599,1],[1601,1610,1],[1622,1647,1],[1649,1756,1],[1758,1791,1],[1872,1919,1],[2160,2190,1],[2192,2193,1],[2200,2273,1],[2275,2303,1],[64336,64450,1],[64467,64829,1],[64832,64911,1],[64914,64967,1],[64975,65008,33],[65009,65023,1],[65136,65140,1],[65142,65276,1],[69216,69246,1],[69373,69375,1],[126464,126467,1],[126469,126495,1],[126497,126498,1],[126500,126503,3],[126505,126514,1],[126516,126519,1],[126521,126523,2],[126530,126535,5],[126537,126541,2],[126542,126543,1],[126545,126546,1],[126548,126551,3],[126553,126561,2],[126562,126564,2],[126567,126570,1],[126572,126578,1],[126580,126583,1],[126585,126588,1],[126590,126592,2],[126593,126601,1],[126603,126619,1],[126625,126627,1],[126629,126633,1],[126635,126651,1],[126704,126705,1]]),t(wt,"Armenian",[[1329,1366,1],[1369,1418,1],[1421,1423,1],[64275,64279,1]]),t(wt,"Avestan",[[68352,68405,1],[68409,68415,1]]),t(wt,"Balinese",[[6912,6988,1],[6992,7038,1]]),t(wt,"Bamum",[[42656,42743,1],[92160,92728,1]]),t(wt,"Bassa_Vah",[[92880,92909,1],[92912,92917,1]]),t(wt,"Batak",[[7104,7155,1],[7164,7167,1]]),t(wt,"Bengali",[[2432,2435,1],[2437,2444,1],[2447,2448,1],[2451,2472,1],[2474,2480,1],[2482,2486,4],[2487,2489,1],[2492,2500,1],[2503,2504,1],[2507,2510,1],[2519,2524,5],[2525,2527,2],[2528,2531,1],[2534,2558,1]]),t(wt,"Bhaiksuki",[[72704,72712,1],[72714,72758,1],[72760,72773,1],[72784,72812,1]]),t(wt,"Bopomofo",[[746,747,1],[12549,12591,1],[12704,12735,1]]),t(wt,"Brahmi",[[69632,69709,1],[69714,69749,1],[69759,69759,1]]),t(wt,"Braille",[[10240,10495,1]]),t(wt,"Buginese",[[6656,6683,1],[6686,6687,1]]),t(wt,"Buhid",[[5952,5971,1]]),t(wt,"Canadian_Aboriginal",[[5120,5759,1],[6320,6389,1],[72368,72383,1]]),t(wt,"Carian",[[66208,66256,1]]),t(wt,"Caucasian_Albanian",[[66864,66915,1],[66927,66927,1]]),t(wt,"Chakma",[[69888,69940,1],[69942,69959,1]]),t(wt,"Cham",[[43520,43574,1],[43584,43597,1],[43600,43609,1],[43612,43615,1]]),t(wt,"Cherokee",[[5024,5109,1],[5112,5117,1],[43888,43967,1]]),t(wt,"Chorasmian",[[69552,69579,1]]),t(wt,"Common",[[0,64,1],[91,96,1],[123,169,1],[171,185,1],[187,191,1],[215,247,32],[697,735,1],[741,745,1],[748,767,1],[884,894,10],[901,903,2],[1541,1548,7],[1563,1567,4],[1600,1757,157],[2274,2404,130],[2405,3647,1242],[4053,4056,1],[4347,5867,1520],[5868,5869,1],[5941,5942,1],[6146,6147,1],[6149,7379,1230],[7393,7401,8],[7402,7404,1],[7406,7411,1],[7413,7415,1],[7418,8192,774],[8193,8203,1],[8206,8292,1],[8294,8304,1],[8308,8318,1],[8320,8334,1],[8352,8384,1],[8448,8485,1],[8487,8489,1],[8492,8497,1],[8499,8525,1],[8527,8543,1],[8585,8587,1],[8592,9254,1],[9280,9290,1],[9312,10239,1],[10496,11123,1],[11126,11157,1],[11159,11263,1],[11776,11869,1],[12272,12292,1],[12294,12296,2],[12297,12320,1],[12336,12343,1],[12348,12351,1],[12443,12444,1],[12448,12539,91],[12540,12688,148],[12689,12703,1],[12736,12771,1],[12783,12832,49],[12833,12895,1],[12927,13007,1],[13055,13144,89],[13145,13311,1],[19904,19967,1],[42752,42785,1],[42888,42890,1],[43056,43065,1],[43310,43471,161],[43867,43882,15],[43883,64830,20947],[64831,65040,209],[65041,65049,1],[65072,65106,1],[65108,65126,1],[65128,65131,1],[65279,65281,2],[65282,65312,1],[65339,65344,1],[65371,65381,1],[65392,65438,46],[65439,65504,65],[65505,65510,1],[65512,65518,1],[65529,65533,1],[65792,65794,1],[65799,65843,1],[65847,65855,1],[65936,65948,1],[66e3,66044,1],[66273,66299,1],[113824,113827,1],[118608,118723,1],[118784,119029,1],[119040,119078,1],[119081,119142,1],[119146,119162,1],[119171,119172,1],[119180,119209,1],[119214,119274,1],[119488,119507,1],[119520,119539,1],[119552,119638,1],[119648,119672,1],[119808,119892,1],[119894,119964,1],[119966,119967,1],[119970,119973,3],[119974,119977,3],[119978,119980,1],[119982,119993,1],[119995,119997,2],[119998,120003,1],[120005,120069,1],[120071,120074,1],[120077,120084,1],[120086,120092,1],[120094,120121,1],[120123,120126,1],[120128,120132,1],[120134,120138,4],[120139,120144,1],[120146,120485,1],[120488,120779,1],[120782,120831,1],[126065,126132,1],[126209,126269,1],[126976,127019,1],[127024,127123,1],[127136,127150,1],[127153,127167,1],[127169,127183,1],[127185,127221,1],[127232,127405,1],[127462,127487,1],[127489,127490,1],[127504,127547,1],[127552,127560,1],[127568,127569,1],[127584,127589,1],[127744,128727,1],[128732,128748,1],[128752,128764,1],[128768,128886,1],[128891,128985,1],[128992,129003,1],[129008,129024,16],[129025,129035,1],[129040,129095,1],[129104,129113,1],[129120,129159,1],[129168,129197,1],[129200,129201,1],[129280,129619,1],[129632,129645,1],[129648,129660,1],[129664,129672,1],[129680,129725,1],[129727,129733,1],[129742,129755,1],[129760,129768,1],[129776,129784,1],[129792,129938,1],[129940,129994,1],[130032,130041,1],[917505,917536,31],[917537,917631,1]]),t(wt,"foldCommon",[[924,956,32]]),t(wt,"Coptic",[[994,1007,1],[11392,11507,1],[11513,11519,1]]),t(wt,"Cuneiform",[[73728,74649,1],[74752,74862,1],[74864,74868,1],[74880,75075,1]]),t(wt,"Cypriot",[[67584,67589,1],[67592,67594,2],[67595,67637,1],[67639,67640,1],[67644,67647,3]]),t(wt,"Cypro_Minoan",[[77712,77810,1]]),t(wt,"Cyrillic",[[1024,1156,1],[1159,1327,1],[7296,7304,1],[7467,7544,77],[11744,11775,1],[42560,42655,1],[65070,65071,1],[122928,122989,1],[123023,123023,1]]),t(wt,"Deseret",[[66560,66639,1]]),t(wt,"Devanagari",[[2304,2384,1],[2389,2403,1],[2406,2431,1],[43232,43263,1],[72448,72457,1]]),t(wt,"Dives_Akuru",[[71936,71942,1],[71945,71948,3],[71949,71955,1],[71957,71958,1],[71960,71989,1],[71991,71992,1],[71995,72006,1],[72016,72025,1]]),t(wt,"Dogra",[[71680,71739,1]]),t(wt,"Duployan",[[113664,113770,1],[113776,113788,1],[113792,113800,1],[113808,113817,1],[113820,113823,1]]),t(wt,"Egyptian_Hieroglyphs",[[77824,78933,1]]),t(wt,"Elbasan",[[66816,66855,1]]),t(wt,"Elymaic",[[69600,69622,1]]),t(wt,"Ethiopic",[[4608,4680,1],[4682,4685,1],[4688,4694,1],[4696,4698,2],[4699,4701,1],[4704,4744,1],[4746,4749,1],[4752,4784,1],[4786,4789,1],[4792,4798,1],[4800,4802,2],[4803,4805,1],[4808,4822,1],[4824,4880,1],[4882,4885,1],[4888,4954,1],[4957,4988,1],[4992,5017,1],[11648,11670,1],[11680,11686,1],[11688,11694,1],[11696,11702,1],[11704,11710,1],[11712,11718,1],[11720,11726,1],[11728,11734,1],[11736,11742,1],[43777,43782,1],[43785,43790,1],[43793,43798,1],[43808,43814,1],[43816,43822,1],[124896,124902,1],[124904,124907,1],[124909,124910,1],[124912,124926,1]]),t(wt,"Georgian",[[4256,4293,1],[4295,4301,6],[4304,4346,1],[4348,4351,1],[7312,7354,1],[7357,7359,1],[11520,11557,1],[11559,11565,6]]),t(wt,"Glagolitic",[[11264,11359,1],[122880,122886,1],[122888,122904,1],[122907,122913,1],[122915,122916,1],[122918,122922,1]]),t(wt,"Gothic",[[66352,66378,1]]),t(wt,"Grantha",[[70400,70403,1],[70405,70412,1],[70415,70416,1],[70419,70440,1],[70442,70448,1],[70450,70451,1],[70453,70457,1],[70460,70468,1],[70471,70472,1],[70475,70477,1],[70480,70487,7],[70493,70499,1],[70502,70508,1],[70512,70516,1]]),t(wt,"Greek",[[880,883,1],[885,887,1],[890,893,1],[895,900,5],[902,904,2],[905,906,1],[908,910,2],[911,929,1],[931,993,1],[1008,1023,1],[7462,7466,1],[7517,7521,1],[7526,7530,1],[7615,7936,321],[7937,7957,1],[7960,7965,1],[7968,8005,1],[8008,8013,1],[8016,8023,1],[8025,8031,2],[8032,8061,1],[8064,8116,1],[8118,8132,1],[8134,8147,1],[8150,8155,1],[8157,8175,1],[8178,8180,1],[8182,8190,1],[8486,43877,35391],[65856,65934,1],[65952,119296,53344],[119297,119365,1]]),t(wt,"foldGreek",[[181,837,656]]),t(wt,"Gujarati",[[2689,2691,1],[2693,2701,1],[2703,2705,1],[2707,2728,1],[2730,2736,1],[2738,2739,1],[2741,2745,1],[2748,2757,1],[2759,2761,1],[2763,2765,1],[2768,2784,16],[2785,2787,1],[2790,2801,1],[2809,2815,1]]),t(wt,"Gunjala_Gondi",[[73056,73061,1],[73063,73064,1],[73066,73102,1],[73104,73105,1],[73107,73112,1],[73120,73129,1]]),t(wt,"Gurmukhi",[[2561,2563,1],[2565,2570,1],[2575,2576,1],[2579,2600,1],[2602,2608,1],[2610,2611,1],[2613,2614,1],[2616,2617,1],[2620,2622,2],[2623,2626,1],[2631,2632,1],[2635,2637,1],[2641,2649,8],[2650,2652,1],[2654,2662,8],[2663,2678,1]]),t(wt,"Han",[[11904,11929,1],[11931,12019,1],[12032,12245,1],[12293,12295,2],[12321,12329,1],[12344,12347,1],[13312,19903,1],[19968,40959,1],[63744,64109,1],[64112,64217,1],[94178,94179,1],[94192,94193,1],[131072,173791,1],[173824,177977,1],[177984,178205,1],[178208,183969,1],[183984,191456,1],[191472,192093,1],[194560,195101,1],[196608,201546,1],[201552,205743,1]]),t(wt,"Hangul",[[4352,4607,1],[12334,12335,1],[12593,12686,1],[12800,12830,1],[12896,12926,1],[43360,43388,1],[44032,55203,1],[55216,55238,1],[55243,55291,1],[65440,65470,1],[65474,65479,1],[65482,65487,1],[65490,65495,1],[65498,65500,1]]),t(wt,"Hanifi_Rohingya",[[68864,68903,1],[68912,68921,1]]),t(wt,"Hanunoo",[[5920,5940,1]]),t(wt,"Hatran",[[67808,67826,1],[67828,67829,1],[67835,67839,1]]),t(wt,"Hebrew",[[1425,1479,1],[1488,1514,1],[1519,1524,1],[64285,64310,1],[64312,64316,1],[64318,64320,2],[64321,64323,2],[64324,64326,2],[64327,64335,1]]),t(wt,"Hiragana",[[12353,12438,1],[12445,12447,1],[110593,110879,1],[110898,110928,30],[110929,110930,1],[127488,127488,1]]),t(wt,"Imperial_Aramaic",[[67648,67669,1],[67671,67679,1]]),t(wt,"Inherited",[[768,879,1],[1157,1158,1],[1611,1621,1],[1648,2385,737],[2386,2388,1],[6832,6862,1],[7376,7378,1],[7380,7392,1],[7394,7400,1],[7405,7412,7],[7416,7417,1],[7616,7679,1],[8204,8205,1],[8400,8432,1],[12330,12333,1],[12441,12442,1],[65024,65039,1],[65056,65069,1],[66045,66272,227],[70459,118528,48069],[118529,118573,1],[118576,118598,1],[119143,119145,1],[119163,119170,1],[119173,119179,1],[119210,119213,1],[917760,917999,1]]),t(wt,"foldInherited",[[921,953,32],[8126,8126,1]]),t(wt,"Inscriptional_Pahlavi",[[68448,68466,1],[68472,68479,1]]),t(wt,"Inscriptional_Parthian",[[68416,68437,1],[68440,68447,1]]),t(wt,"Javanese",[[43392,43469,1],[43472,43481,1],[43486,43487,1]]),t(wt,"Kaithi",[[69760,69826,1],[69837,69837,1]]),t(wt,"Kannada",[[3200,3212,1],[3214,3216,1],[3218,3240,1],[3242,3251,1],[3253,3257,1],[3260,3268,1],[3270,3272,1],[3274,3277,1],[3285,3286,1],[3293,3294,1],[3296,3299,1],[3302,3311,1],[3313,3315,1]]),t(wt,"Katakana",[[12449,12538,1],[12541,12543,1],[12784,12799,1],[13008,13054,1],[13056,13143,1],[65382,65391,1],[65393,65437,1],[110576,110579,1],[110581,110587,1],[110589,110590,1],[110592,110880,288],[110881,110882,1],[110933,110948,15],[110949,110951,1]]),t(wt,"Kawi",[[73472,73488,1],[73490,73530,1],[73534,73561,1]]),t(wt,"Kayah_Li",[[43264,43309,1],[43311,43311,1]]),t(wt,"Kharoshthi",[[68096,68099,1],[68101,68102,1],[68108,68115,1],[68117,68119,1],[68121,68149,1],[68152,68154,1],[68159,68168,1],[68176,68184,1]]),t(wt,"Khitan_Small_Script",[[94180,101120,6940],[101121,101589,1]]),t(wt,"Khmer",[[6016,6109,1],[6112,6121,1],[6128,6137,1],[6624,6655,1]]),t(wt,"Khojki",[[70144,70161,1],[70163,70209,1]]),t(wt,"Khudawadi",[[70320,70378,1],[70384,70393,1]]),t(wt,"Lao",[[3713,3714,1],[3716,3718,2],[3719,3722,1],[3724,3747,1],[3749,3751,2],[3752,3773,1],[3776,3780,1],[3782,3784,2],[3785,3790,1],[3792,3801,1],[3804,3807,1]]),t(wt,"Latin",[[65,90,1],[97,122,1],[170,186,16],[192,214,1],[216,246,1],[248,696,1],[736,740,1],[7424,7461,1],[7468,7516,1],[7522,7525,1],[7531,7543,1],[7545,7614,1],[7680,7935,1],[8305,8319,14],[8336,8348,1],[8490,8491,1],[8498,8526,28],[8544,8584,1],[11360,11391,1],[42786,42887,1],[42891,42954,1],[42960,42961,1],[42963,42965,2],[42966,42969,1],[42994,43007,1],[43824,43866,1],[43868,43876,1],[43878,43881,1],[64256,64262,1],[65313,65338,1],[65345,65370,1],[67456,67461,1],[67463,67504,1],[67506,67514,1],[122624,122654,1],[122661,122666,1]]),t(wt,"Lepcha",[[7168,7223,1],[7227,7241,1],[7245,7247,1]]),t(wt,"Limbu",[[6400,6430,1],[6432,6443,1],[6448,6459,1],[6464,6468,4],[6469,6479,1]]),t(wt,"Linear_A",[[67072,67382,1],[67392,67413,1],[67424,67431,1]]),t(wt,"Linear_B",[[65536,65547,1],[65549,65574,1],[65576,65594,1],[65596,65597,1],[65599,65613,1],[65616,65629,1],[65664,65786,1]]),t(wt,"Lisu",[[42192,42239,1],[73648,73648,1]]),t(wt,"Lycian",[[66176,66204,1]]),t(wt,"Lydian",[[67872,67897,1],[67903,67903,1]]),t(wt,"Mahajani",[[69968,70006,1]]),t(wt,"Makasar",[[73440,73464,1]]),t(wt,"Malayalam",[[3328,3340,1],[3342,3344,1],[3346,3396,1],[3398,3400,1],[3402,3407,1],[3412,3427,1],[3430,3455,1]]),t(wt,"Mandaic",[[2112,2139,1],[2142,2142,1]]),t(wt,"Manichaean",[[68288,68326,1],[68331,68342,1]]),t(wt,"Marchen",[[72816,72847,1],[72850,72871,1],[72873,72886,1]]),t(wt,"Masaram_Gondi",[[72960,72966,1],[72968,72969,1],[72971,73014,1],[73018,73020,2],[73021,73023,2],[73024,73031,1],[73040,73049,1]]),t(wt,"Medefaidrin",[[93760,93850,1]]),t(wt,"Meetei_Mayek",[[43744,43766,1],[43968,44013,1],[44016,44025,1]]),t(wt,"Mende_Kikakui",[[124928,125124,1],[125127,125142,1]]),t(wt,"Meroitic_Cursive",[[68e3,68023,1],[68028,68047,1],[68050,68095,1]]),t(wt,"Meroitic_Hieroglyphs",[[67968,67999,1]]),t(wt,"Miao",[[93952,94026,1],[94031,94087,1],[94095,94111,1]]),t(wt,"Modi",[[71168,71236,1],[71248,71257,1]]),t(wt,"Mongolian",[[6144,6145,1],[6148,6150,2],[6151,6169,1],[6176,6264,1],[6272,6314,1],[71264,71276,1]]),t(wt,"Mro",[[92736,92766,1],[92768,92777,1],[92782,92783,1]]),t(wt,"Multani",[[70272,70278,1],[70280,70282,2],[70283,70285,1],[70287,70301,1],[70303,70313,1]]),t(wt,"Myanmar",[[4096,4255,1],[43488,43518,1],[43616,43647,1]]),t(wt,"Nabataean",[[67712,67742,1],[67751,67759,1]]),t(wt,"Nag_Mundari",[[124112,124153,1]]),t(wt,"Nandinagari",[[72096,72103,1],[72106,72151,1],[72154,72164,1]]),t(wt,"New_Tai_Lue",[[6528,6571,1],[6576,6601,1],[6608,6618,1],[6622,6623,1]]),t(wt,"Newa",[[70656,70747,1],[70749,70753,1]]),t(wt,"Nko",[[1984,2042,1],[2045,2047,1]]),t(wt,"Nushu",[[94177,110960,16783],[110961,111355,1]]),t(wt,"Nyiakeng_Puachue_Hmong",[[123136,123180,1],[123184,123197,1],[123200,123209,1],[123214,123215,1]]),t(wt,"Ogham",[[5760,5788,1]]),t(wt,"Ol_Chiki",[[7248,7295,1]]),t(wt,"Old_Hungarian",[[68736,68786,1],[68800,68850,1],[68858,68863,1]]),t(wt,"Old_Italic",[[66304,66339,1],[66349,66351,1]]),t(wt,"Old_North_Arabian",[[68224,68255,1]]),t(wt,"Old_Permic",[[66384,66426,1]]),t(wt,"Old_Persian",[[66464,66499,1],[66504,66517,1]]),t(wt,"Old_Sogdian",[[69376,69415,1]]),t(wt,"Old_South_Arabian",[[68192,68223,1]]),t(wt,"Old_Turkic",[[68608,68680,1]]),t(wt,"Old_Uyghur",[[69488,69513,1]]),t(wt,"Oriya",[[2817,2819,1],[2821,2828,1],[2831,2832,1],[2835,2856,1],[2858,2864,1],[2866,2867,1],[2869,2873,1],[2876,2884,1],[2887,2888,1],[2891,2893,1],[2901,2903,1],[2908,2909,1],[2911,2915,1],[2918,2935,1]]),t(wt,"Osage",[[66736,66771,1],[66776,66811,1]]),t(wt,"Osmanya",[[66688,66717,1],[66720,66729,1]]),t(wt,"Pahawh_Hmong",[[92928,92997,1],[93008,93017,1],[93019,93025,1],[93027,93047,1],[93053,93071,1]]),t(wt,"Palmyrene",[[67680,67711,1]]),t(wt,"Pau_Cin_Hau",[[72384,72440,1]]),t(wt,"Phags_Pa",[[43072,43127,1]]),t(wt,"Phoenician",[[67840,67867,1],[67871,67871,1]]),t(wt,"Psalter_Pahlavi",[[68480,68497,1],[68505,68508,1],[68521,68527,1]]),t(wt,"Rejang",[[43312,43347,1],[43359,43359,1]]),t(wt,"Runic",[[5792,5866,1],[5870,5880,1]]),t(wt,"Samaritan",[[2048,2093,1],[2096,2110,1]]),t(wt,"Saurashtra",[[43136,43205,1],[43214,43225,1]]),t(wt,"Sharada",[[70016,70111,1]]),t(wt,"Shavian",[[66640,66687,1]]),t(wt,"Siddham",[[71040,71093,1],[71096,71133,1]]),t(wt,"SignWriting",[[120832,121483,1],[121499,121503,1],[121505,121519,1]]),t(wt,"Sinhala",[[3457,3459,1],[3461,3478,1],[3482,3505,1],[3507,3515,1],[3517,3520,3],[3521,3526,1],[3530,3535,5],[3536,3540,1],[3542,3544,2],[3545,3551,1],[3558,3567,1],[3570,3572,1],[70113,70132,1]]),t(wt,"Sogdian",[[69424,69465,1]]),t(wt,"Sora_Sompeng",[[69840,69864,1],[69872,69881,1]]),t(wt,"Soyombo",[[72272,72354,1]]),t(wt,"Sundanese",[[7040,7103,1],[7360,7367,1]]),t(wt,"Syloti_Nagri",[[43008,43052,1]]),t(wt,"Syriac",[[1792,1805,1],[1807,1866,1],[1869,1871,1],[2144,2154,1]]),t(wt,"Tagalog",[[5888,5909,1],[5919,5919,1]]),t(wt,"Tagbanwa",[[5984,5996,1],[5998,6e3,1],[6002,6003,1]]),t(wt,"Tai_Le",[[6480,6509,1],[6512,6516,1]]),t(wt,"Tai_Tham",[[6688,6750,1],[6752,6780,1],[6783,6793,1],[6800,6809,1],[6816,6829,1]]),t(wt,"Tai_Viet",[[43648,43714,1],[43739,43743,1]]),t(wt,"Takri",[[71296,71353,1],[71360,71369,1]]),t(wt,"Tamil",[[2946,2947,1],[2949,2954,1],[2958,2960,1],[2962,2965,1],[2969,2970,1],[2972,2974,2],[2975,2979,4],[2980,2984,4],[2985,2986,1],[2990,3001,1],[3006,3010,1],[3014,3016,1],[3018,3021,1],[3024,3031,7],[3046,3066,1],[73664,73713,1],[73727,73727,1]]),t(wt,"Tangsa",[[92784,92862,1],[92864,92873,1]]),t(wt,"Tangut",[[94176,94208,32],[94209,100343,1],[100352,101119,1],[101632,101640,1]]),t(wt,"Telugu",[[3072,3084,1],[3086,3088,1],[3090,3112,1],[3114,3129,1],[3132,3140,1],[3142,3144,1],[3146,3149,1],[3157,3158,1],[3160,3162,1],[3165,3168,3],[3169,3171,1],[3174,3183,1],[3191,3199,1]]),t(wt,"Thaana",[[1920,1969,1]]),t(wt,"Thai",[[3585,3642,1],[3648,3675,1]]),t(wt,"Tibetan",[[3840,3911,1],[3913,3948,1],[3953,3991,1],[3993,4028,1],[4030,4044,1],[4046,4052,1],[4057,4058,1]]),t(wt,"Tifinagh",[[11568,11623,1],[11631,11632,1],[11647,11647,1]]),t(wt,"Tirhuta",[[70784,70855,1],[70864,70873,1]]),t(wt,"Toto",[[123536,123566,1]]),t(wt,"Ugaritic",[[66432,66461,1],[66463,66463,1]]),t(wt,"Vai",[[42240,42539,1]]),t(wt,"Vithkuqi",[[66928,66938,1],[66940,66954,1],[66956,66962,1],[66964,66965,1],[66967,66977,1],[66979,66993,1],[66995,67001,1],[67003,67004,1]]),t(wt,"Wancho",[[123584,123641,1],[123647,123647,1]]),t(wt,"Warang_Citi",[[71840,71922,1],[71935,71935,1]]),t(wt,"Yezidi",[[69248,69289,1],[69291,69293,1],[69296,69297,1]]),t(wt,"Yi",[[40960,42124,1],[42128,42182,1]]),t(wt,"Zanabazar_Square",[[72192,72263,1]]),t(wt,"CATEGORIES",new Map([["C",wt.C],["Cc",wt.Cc],["Cf",wt.Cf],["Co",wt.Co],["Cs",wt.Cs],["L",wt.L],["Ll",wt.Ll],["Lm",wt.Lm],["Lo",wt.Lo],["Lt",wt.Lt],["Lu",wt.Lu],["M",wt.M],["Mc",wt.Mc],["Me",wt.Me],["Mn",wt.Mn],["N",wt.N],["Nd",wt.Nd],["Nl",wt.Nl],["No",wt.No],["P",wt.P],["Pc",wt.Pc],["Pd",wt.Pd],["Pe",wt.Pe],["Pf",wt.Pf],["Pi",wt.Pi],["Po",wt.Po],["Ps",wt.Ps],["S",wt.S],["Sc",wt.Sc],["Sk",wt.Sk],["Sm",wt.Sm],["So",wt.So],["Z",wt.Z],["Zl",wt.Zl],["Zp",wt.Zp],["Zs",wt.Zs]])),t(wt,"SCRIPTS",new Map([["Adlam",wt.Adlam],["Ahom",wt.Ahom],["Anatolian_Hieroglyphs",wt.Anatolian_Hieroglyphs],["Arabic",wt.Arabic],["Armenian",wt.Armenian],["Avestan",wt.Avestan],["Balinese",wt.Balinese],["Bamum",wt.Bamum],["Bassa_Vah",wt.Bassa_Vah],["Batak",wt.Batak],["Bengali",wt.Bengali],["Bhaiksuki",wt.Bhaiksuki],["Bopomofo",wt.Bopomofo],["Brahmi",wt.Brahmi],["Braille",wt.Braille],["Buginese",wt.Buginese],["Buhid",wt.Buhid],["Canadian_Aboriginal",wt.Canadian_Aboriginal],["Carian",wt.Carian],["Caucasian_Albanian",wt.Caucasian_Albanian],["Chakma",wt.Chakma],["Cham",wt.Cham],["Cherokee",wt.Cherokee],["Chorasmian",wt.Chorasmian],["Common",wt.Common],["Coptic",wt.Coptic],["Cuneiform",wt.Cuneiform],["Cypriot",wt.Cypriot],["Cypro_Minoan",wt.Cypro_Minoan],["Cyrillic",wt.Cyrillic],["Deseret",wt.Deseret],["Devanagari",wt.Devanagari],["Dives_Akuru",wt.Dives_Akuru],["Dogra",wt.Dogra],["Duployan",wt.Duployan],["Egyptian_Hieroglyphs",wt.Egyptian_Hieroglyphs],["Elbasan",wt.Elbasan],["Elymaic",wt.Elymaic],["Ethiopic",wt.Ethiopic],["Georgian",wt.Georgian],["Glagolitic",wt.Glagolitic],["Gothic",wt.Gothic],["Grantha",wt.Grantha],["Greek",wt.Greek],["Gujarati",wt.Gujarati],["Gunjala_Gondi",wt.Gunjala_Gondi],["Gurmukhi",wt.Gurmukhi],["Han",wt.Han],["Hangul",wt.Hangul],["Hanifi_Rohingya",wt.Hanifi_Rohingya],["Hanunoo",wt.Hanunoo],["Hatran",wt.Hatran],["Hebrew",wt.Hebrew],["Hiragana",wt.Hiragana],["Imperial_Aramaic",wt.Imperial_Aramaic],["Inherited",wt.Inherited],["Inscriptional_Pahlavi",wt.Inscriptional_Pahlavi],["Inscriptional_Parthian",wt.Inscriptional_Parthian],["Javanese",wt.Javanese],["Kaithi",wt.Kaithi],["Kannada",wt.Kannada],["Katakana",wt.Katakana],["Kawi",wt.Kawi],["Kayah_Li",wt.Kayah_Li],["Kharoshthi",wt.Kharoshthi],["Khitan_Small_Script",wt.Khitan_Small_Script],["Khmer",wt.Khmer],["Khojki",wt.Khojki],["Khudawadi",wt.Khudawadi],["Lao",wt.Lao],["Latin",wt.Latin],["Lepcha",wt.Lepcha],["Limbu",wt.Limbu],["Linear_A",wt.Linear_A],["Linear_B",wt.Linear_B],["Lisu",wt.Lisu],["Lycian",wt.Lycian],["Lydian",wt.Lydian],["Mahajani",wt.Mahajani],["Makasar",wt.Makasar],["Malayalam",wt.Malayalam],["Mandaic",wt.Mandaic],["Manichaean",wt.Manichaean],["Marchen",wt.Marchen],["Masaram_Gondi",wt.Masaram_Gondi],["Medefaidrin",wt.Medefaidrin],["Meetei_Mayek",wt.Meetei_Mayek],["Mende_Kikakui",wt.Mende_Kikakui],["Meroitic_Cursive",wt.Meroitic_Cursive],["Meroitic_Hieroglyphs",wt.Meroitic_Hieroglyphs],["Miao",wt.Miao],["Modi",wt.Modi],["Mongolian",wt.Mongolian],["Mro",wt.Mro],["Multani",wt.Multani],["Myanmar",wt.Myanmar],["Nabataean",wt.Nabataean],["Nag_Mundari",wt.Nag_Mundari],["Nandinagari",wt.Nandinagari],["New_Tai_Lue",wt.New_Tai_Lue],["Newa",wt.Newa],["Nko",wt.Nko],["Nushu",wt.Nushu],["Nyiakeng_Puachue_Hmong",wt.Nyiakeng_Puachue_Hmong],["Ogham",wt.Ogham],["Ol_Chiki",wt.Ol_Chiki],["Old_Hungarian",wt.Old_Hungarian],["Old_Italic",wt.Old_Italic],["Old_North_Arabian",wt.Old_North_Arabian],["Old_Permic",wt.Old_Permic],["Old_Persian",wt.Old_Persian],["Old_Sogdian",wt.Old_Sogdian],["Old_South_Arabian",wt.Old_South_Arabian],["Old_Turkic",wt.Old_Turkic],["Old_Uyghur",wt.Old_Uyghur],["Oriya",wt.Oriya],["Osage",wt.Osage],["Osmanya",wt.Osmanya],["Pahawh_Hmong",wt.Pahawh_Hmong],["Palmyrene",wt.Palmyrene],["Pau_Cin_Hau",wt.Pau_Cin_Hau],["Phags_Pa",wt.Phags_Pa],["Phoenician",wt.Phoenician],["Psalter_Pahlavi",wt.Psalter_Pahlavi],["Rejang",wt.Rejang],["Runic",wt.Runic],["Samaritan",wt.Samaritan],["Saurashtra",wt.Saurashtra],["Sharada",wt.Sharada],["Shavian",wt.Shavian],["Siddham",wt.Siddham],["SignWriting",wt.SignWriting],["Sinhala",wt.Sinhala],["Sogdian",wt.Sogdian],["Sora_Sompeng",wt.Sora_Sompeng],["Soyombo",wt.Soyombo],["Sundanese",wt.Sundanese],["Syloti_Nagri",wt.Syloti_Nagri],["Syriac",wt.Syriac],["Tagalog",wt.Tagalog],["Tagbanwa",wt.Tagbanwa],["Tai_Le",wt.Tai_Le],["Tai_Tham",wt.Tai_Tham],["Tai_Viet",wt.Tai_Viet],["Takri",wt.Takri],["Tamil",wt.Tamil],["Tangsa",wt.Tangsa],["Tangut",wt.Tangut],["Telugu",wt.Telugu],["Thaana",wt.Thaana],["Thai",wt.Thai],["Tibetan",wt.Tibetan],["Tifinagh",wt.Tifinagh],["Tirhuta",wt.Tirhuta],["Toto",wt.Toto],["Ugaritic",wt.Ugaritic],["Vai",wt.Vai],["Vithkuqi",wt.Vithkuqi],["Wancho",wt.Wancho],["Warang_Citi",wt.Warang_Citi],["Yezidi",wt.Yezidi],["Yi",wt.Yi],["Zanabazar_Square",wt.Zanabazar_Square]])),t(wt,"FOLD_CATEGORIES",new Map([["L",wt.foldL],["Ll",wt.foldLl],["Lt",wt.foldLt],["Lu",wt.foldLu],["M",wt.foldM],["Mn",wt.foldMn]])),t(wt,"FOLD_SCRIPT",new Map([["Common",wt.foldCommon],["Greek",wt.foldGreek],["Inherited",wt.foldInherited]]));let Et=wt;class Tt{static is32(e,t){let n=0,r=e.length;for(;n<r;){let s=n+Math.floor((r-n)/2),i=e[s];if(i[0]<=t&&t<=i[1])return(t-i[0])%i[2]===0;t<i[0]?r=s:n=s+1}return!1}static is(e,t){if(t<=this.MAX_LATIN1){for(let n of e)if(!(t>n[1]))return!(t<n[0])&&(t-n[0])%n[2]===0;return!1}return e.length>0&&t>=e[0][0]&&this.is32(e,t)}static isUpper(e){if(e<=this.MAX_LATIN1){const t=String.fromCodePoint(e);return t.toUpperCase()===t&&t.toLowerCase()!==t}return this.is(Et.Upper,e)}static isPrint(e){return e<=this.MAX_LATIN1?e>=32&&e<127||e>=161&&173!==e:this.is(Et.L,e)||this.is(Et.M,e)||this.is(Et.N,e)||this.is(Et.P,e)||this.is(Et.S,e)}static simpleFold(e){if(Et.CASE_ORBIT.has(e))return Et.CASE_ORBIT.get(e);const t=vt.toLowerCase(e);return t!==e?t:vt.toUpperCase(e)}static equalsIgnoreCase(e,t){if(e<0||t<0||e===t)return!0;if(e<=this.MAX_ASCII&&t<=this.MAX_ASCII)return vt.CODES.get("A")<=e&&e<=vt.CODES.get("Z")&&(e|=32),vt.CODES.get("A")<=t&&t<=vt.CODES.get("Z")&&(t|=32),e===t;for(let n=this.simpleFold(e);n!==e;n=this.simpleFold(n))if(n===t)return!0;return!1}}t(Tt,"MAX_RUNE",1114111),t(Tt,"MAX_ASCII",127),t(Tt,"MAX_LATIN1",255),t(Tt,"MAX_BMP",65535),t(Tt,"MIN_FOLD",65),t(Tt,"MAX_FOLD",125251);class bt{static emptyInts(){return[]}static isalnum(e){return vt.CODES.get("0")<=e&&e<=vt.CODES.get("9")||vt.CODES.get("a")<=e&&e<=vt.CODES.get("z")||vt.CODES.get("A")<=e&&e<=vt.CODES.get("Z")}static unhex(e){return vt.CODES.get("0")<=e&&e<=vt.CODES.get("9")?e-vt.CODES.get("0"):vt.CODES.get("a")<=e&&e<=vt.CODES.get("f")?e-vt.CODES.get("a")+10:vt.CODES.get("A")<=e&&e<=vt.CODES.get("F")?e-vt.CODES.get("A")+10:-1}static escapeRune(e){let t="";if(Tt.isPrint(e))this.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case vt.CODES.get('"'):t+='\\"';break;case vt.CODES.get("\\"):t+="\\\\";break;case vt.CODES.get("\t"):t+="\\t";break;case vt.CODES.get("\n"):t+="\\n";break;case vt.CODES.get("\r"):t+="\\r";break;case vt.CODES.get("\b"):t+="\\b";break;case vt.CODES.get("\f"):t+="\\f";break;default:{let n=e.toString(16);e<256?(t+="\\x",1===n.length&&(t+="0"),t+=n):t+=`\\x{${n}}`;break}}return t}static stringToRunes(e){return String(e).split("").map(e=>e.codePointAt(0))}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return vt.CODES.get("a")<=e&&e<=vt.CODES.get("z")||vt.CODES.get("A")<=e&&e<=vt.CODES.get("Z")||vt.CODES.get("0")<=e&&e<=vt.CODES.get("9")||e===vt.CODES.get("_")}static emptyOpContext(e,t){let n=0;return e<0&&(n|=this.EMPTY_BEGIN_TEXT|this.EMPTY_BEGIN_LINE),e===vt.CODES.get("\n")&&(n|=this.EMPTY_BEGIN_LINE),t<0&&(n|=this.EMPTY_END_TEXT|this.EMPTY_END_LINE),t===vt.CODES.get("\n")&&(n|=this.EMPTY_END_LINE),this.isWordRune(e)!==this.isWordRune(t)?n|=this.EMPTY_WORD_BOUNDARY:n|=this.EMPTY_NO_WORD_BOUNDARY,n}static quoteMeta(e){return e.split("").map(e=>this.METACHARACTERS.indexOf(e)>=0?`\\${e}`:e).join("")}static charCount(e){return e>Tt.MAX_BMP?2:1}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return Array.from((new TextEncoder).encode(e));{let t=[],n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=63&s|128):55296==(64512&s)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++r)),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=63&s|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=63&s|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder)return new TextDecoder("utf-8").decode(new Uint8Array(e));{let t=[],n=0,r=0;for(;n<e.length;){let s=e[n++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){let i=e[n++];t[r++]=String.fromCharCode((31&s)<<6|63&i)}else if(s>239&&s<365){let i=((7&s)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(i>>10)),t[r++]=String.fromCharCode(56320+(1023&i))}else{let i=e[n++],a=e[n++];t[r++]=String.fromCharCode((15&s)<<12|(63&i)<<6|63&a)}}return t.join("")}}}t(bt,"METACHARACTERS","\\.+*?()|[]{}^$"),t(bt,"EMPTY_BEGIN_LINE",1),t(bt,"EMPTY_END_LINE",2),t(bt,"EMPTY_BEGIN_TEXT",4),t(bt,"EMPTY_END_TEXT",8),t(bt,"EMPTY_WORD_BOUNDARY",16),t(bt,"EMPTY_NO_WORD_BOUNDARY",32),t(bt,"EMPTY_ALL",(()=>-1)());const It=(e=[],t=0)=>{const n={};for(let r=0;r<e.length;r++){const s=e[r],i=t+r;n[s]=i,n[i]=s}return Object.freeze(n)},Ct=class e{getEncoding(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===e.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===e.Encoding.UTF_16}};t(Ct,"Encoding",It(["UTF_16","UTF_8"]));let At=Ct;class St extends At{constructor(e=null){super(),this.bytes=e}getEncoding(){return At.Encoding.UTF_8}asCharSequence(){return bt.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}}class Nt extends At{constructor(e=null){super(),this.charSequence=e}getEncoding(){return At.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return this.charSequence.toString().split("").map(e=>e.codePointAt(0))}length(){return this.charSequence.length}}class Rt{static utf16(e){return new Nt(e)}static utf8(e){return Array.isArray(e)?new St(e):new St(bt.stringToUtf8ByteArray(e))}}class Ot extends Error{constructor(e){super(e),this.name="RE2JSException"}}class kt extends Ot{constructor(e,t=null){let n=`error parsing regexp: ${e}`;t&&(n+=`: \`${t}\``),super(n),this.name="RE2JSSyntaxException",this.message=n,this.error=e,this.input=t}getDescription(){return this.error}getPattern(){return this.input}}class Dt extends Ot{constructor(e){super(e),this.name="RE2JSCompileException"}}class Lt extends Ot{constructor(e){super(e),this.name="RE2JSGroupException"}}class Pt extends Ot{constructor(e){super(e),this.name="RE2JSFlagsException"}}class xt{static quoteReplacement(e){return e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(e=>{const t=e.codePointAt(0);return t===vt.CODES["\\"]||t===vt.CODES.$?`\\${e}`:e}).join("")}constructor(e,t){if(null===e)throw new Error("pattern is null");this.patternInput=e;const n=this.patternInput.re2();this.patternGroupCount=n.numberOfCapturingGroups(),this.groups=[],this.namedGroups=n.namedGroups,t instanceof At?this.resetMatcherInput(t):Array.isArray(t)?this.resetMatcherInput(Rt.utf8(t)):this.resetMatcherInput(Rt.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(null===e)throw new Error("input is null");return this.matcherInput=e,this.reset(),this}start(e=0){if("string"==typeof e){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new Lt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if("string"==typeof e){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new Lt(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}group(e=0){if("string"==typeof e){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new Lt(`group '${e}' not found`);e=t}const t=this.start(e),n=this.end(e);return t<0&&n<0?null:this.substring(t,n)}groupCount(){return this.patternGroupCount}loadGroup(e){if(e<0||e>this.patternGroupCount)throw new Lt(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new Lt("perhaps no match attempted");if(0===e||this.hasGroups)return;let t=this.groups[1]+1;t>this.matcherInputLength&&(t=this.matcherInputLength);const n=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount);if(!n[0])throw new Lt("inconsistency in matching group data");this.groups=n[1],this.hasGroups=!0}matches(){return this.genMatch(0,_t.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,_t.ANCHOR_START)}find(e=null){if(null!==e){if(e<0||e>this.matcherInputLength)throw new Lt(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}return e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1]&&e++),this.genMatch(e,_t.UNANCHORED)}genMatch(e,t){const n=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1);return!!n[0]&&(this.groups=n[1],this.hasMatch=!0,this.hasGroups=!1,this.anchorFlag=t,!0)}substring(e,t){return this.matcherInput.isUTF8Encoding()?bt.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let n="";const r=this.start(),s=this.end();return this.appendPos<r&&(n+=this.substring(this.appendPos,r)),this.appendPos=s,n+=t?this.appendReplacementInternalPerl(e):this.appendReplacementInternal(e),n}appendReplacementInternal(e){let t="",n=0;const r=e.length;for(let s=0;s<r-1;s++)if(e.codePointAt(s)!==vt.CODES.get("\\")){if(e.codePointAt(s)===vt.CODES.get("$")){let i=e.codePointAt(s+1);if(vt.CODES.get("0")<=i&&i<=vt.CODES.get("9")){let a=i-vt.CODES.get("0");for(n<s&&(t+=e.substring(n,s)),s+=2;s<r&&(i=e.codePointAt(s),!(i<vt.CODES.get("0")||i>vt.CODES.get("9")||10*a+i-vt.CODES.get("0")>this.patternGroupCount));s++)a=10*a+i-vt.CODES.get("0");if(a>this.patternGroupCount)throw new Lt(`n > number of groups: ${a}`);const o=this.group(a);null!==o&&(t+=o),n=s,s--;continue}if(i===vt.CODES.get("{")){n<s&&(t+=e.substring(n,s)),s++;let r=s+1;for(;r<e.length&&e.codePointAt(r)!==vt.CODES.get("}")&&e.codePointAt(r)!==vt.CODES.get(" ");)r++;if(r===e.length||e.codePointAt(r)!==vt.CODES.get("}"))throw new Lt("named capture group is missing trailing '}'");const i=e.substring(s+1,r);t+=this.group(i),n=r+1}}}else n<s&&(t+=e.substring(n,s)),s++,n=s;return n<r&&(t+=e.substring(n,r)),t}appendReplacementInternalPerl(e){let t="",n=0;const r=e.length;for(let s=0;s<r-1;s++)if(e.codePointAt(s)===vt.CODES.get("$")){let i=e.codePointAt(s+1);if(vt.CODES.get("$")===i){n<s&&(t+=e.substring(n,s)),t+="$",s++,n=s+1;continue}if(vt.CODES.get("&")===i){n<s&&(t+=e.substring(n,s));const r=this.group(0);t+=null!==r?r:"$&",s++,n=s+1;continue}if(vt.CODES.get("1")<=i&&i<=vt.CODES.get("9")){let a=i-vt.CODES.get("0");for(n<s&&(t+=e.substring(n,s)),s+=2;s<r&&(i=e.codePointAt(s),!(i<vt.CODES.get("0")||i>vt.CODES.get("9")||10*a+i-vt.CODES.get("0")>this.patternGroupCount));s++)a=10*a+i-vt.CODES.get("0");if(a>this.patternGroupCount){t+=`$${a}`,n=s,s--;continue}const o=this.group(a);null!==o&&(t+=o),n=s,s--;continue}if(i===vt.CODES.get("<")){n<s&&(t+=e.substring(n,s)),s++;let r=s+1;for(;r<e.length&&e.codePointAt(r)!==vt.CODES.get(">")&&e.codePointAt(r)!==vt.CODES.get(" ");)r++;if(r===e.length||e.codePointAt(r)!==vt.CODES.get(">")){t+=e.substring(s-1,r+1),n=r+1;continue}const i=e.substring(s+1,r);Object.prototype.hasOwnProperty.call(this.namedGroups,i)?t+=this.group(i):t+=`$<${i}>`,n=r+1}}return n<r&&(t+=e.substring(n,r)),t}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,n=!1){let r="";for(this.reset();this.find()&&(r+=this.appendReplacement(e,n),t););return r+=this.appendTail(),r}}class Mt{static EOF(){return-8}canCheckPrefix(){return!0}endPos(){return this.end}}class Ut extends Mt{constructor(e,t=0,n=e.length){super(),this.bytes=e,this.start=t,this.end=n}step(e){if((e+=this.start)>=this.end)return Mt.EOF();let t=255&this.bytes[e++];return 128&t?192==(224&t)?(t&=31,e>=this.end?Mt.EOF():(t=t<<6|63&this.bytes[e++],t<<3|2)):224==(240&t)?(t&=15,e+1>=this.end?Mt.EOF():(t=t<<6|63&this.bytes[e++],t=t<<6|63&this.bytes[e++],t<<3|3)):(t&=7,e+2>=this.end?Mt.EOF():(t=t<<6|63&this.bytes[e++],t=t<<6|63&this.bytes[e++],t=t<<6|63&this.bytes[e++],t<<3|4)):t<<3|1}index(e,t){t+=this.start;const n=this.indexOf(this.bytes,e.prefixUTF8,t);return n<0?n:n-t}context(e){let t=-1;if((e+=this.start)>this.start&&e<=this.end){let n=e-1;if(t=this.bytes[n--],t>=128){let r=e-4;for(r<this.start&&(r=this.start);n>=r&&128==(192&this.bytes[n]);)n--;n<this.start&&(n=this.start),t=this.step(n)>>3}}const n=e<this.end?this.step(e)>>3:-1;return bt.emptyOpContext(t,n)}indexOf(e,t,n=0){let r=t.length;if(0===r)return-1;let s=e.length;for(let i=n;i<=s-r;i++)for(let n=0;n<r&&e[i+n]===t[n];n++)if(n===r-1)return i;return-1}}class Vt extends Mt{constructor(e,t=0,n=e.length){super(),this.charSequence=e,this.start=t,this.end=n}step(e){if((e+=this.start)<this.end){const t=this.charSequence.codePointAt(e);return t<<3|bt.charCount(t)}return Mt.EOF()}index(e,t){t+=this.start;const n=this.charSequence.indexOf(e.prefix,t);return n<0?n:n-t}context(e){const t=(e+=this.start)>0&&e<=this.charSequence.length?this.charSequence.codePointAt(e-1):-1,n=e<this.charSequence.length?this.charSequence.codePointAt(e):-1;return bt.emptyOpContext(t,n)}}class Ft{static fromUTF8(e,t=0,n=e.length){return new Ut(e,t,n)}static fromUTF16(e,t=0,n=e.length){return new Vt(e,t,n)}}const Bt=class e{static isPseudoOp(t){return t>=e.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===vt.CODES.get("-")?"\\":""}static fromRegexp(t){const n=new e(t.op);return n.flags=t.flags,n.subs=t.subs,n.runes=t.runes,n.cap=t.cap,n.min=t.min,n.max=t.max,n.name=t.name,n.namedGroups=t.namedGroups,n}constructor(t){this.op=t,this.flags=0,this.subs=e.emptySubs(),this.runes=null,this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups={}}reinit(){this.flags=0,this.subs=e.emptySubs(),this.runes=null,this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups={}}toString(){return this.appendTo()}appendTo(){let t="";switch(this.op){case e.Op.NO_MATCH:t+="[^\\x00-\\x{10FFFF}]";break;case e.Op.EMPTY_MATCH:t+="(?:)";break;case e.Op.STAR:case e.Op.PLUS:case e.Op.QUEST:case e.Op.REPEAT:{const n=this.subs[0];switch(n.op>e.Op.CAPTURE||n.op===e.Op.LITERAL&&n.runes.length>1?t+=`(?:${n.appendTo()})`:t+=n.appendTo(),this.op){case e.Op.STAR:t+="*";break;case e.Op.PLUS:t+="+";break;case e.Op.QUEST:t+="?";break;case e.Op.REPEAT:t+=`{${this.min}`,this.min!==this.max&&(t+=",",this.max>=0&&(t+=this.max)),t+="}"}0!==(this.flags&_t.NON_GREEDY)&&(t+="?");break}case e.Op.CONCAT:for(let n of this.subs)n.op===e.Op.ALTERNATE?t+=`(?:${n.appendTo()})`:t+=n.appendTo();break;case e.Op.ALTERNATE:{let e="";for(let n of this.subs)t+=e,e="|",t+=n.appendTo();break}case e.Op.LITERAL:0!==(this.flags&_t.FOLD_CASE)&&(t+="(?i:");for(let e of this.runes)t+=bt.escapeRune(e);0!==(this.flags&_t.FOLD_CASE)&&(t+=")");break;case e.Op.ANY_CHAR_NOT_NL:t+="(?-s:.)";break;case e.Op.ANY_CHAR:t+="(?s:.)";break;case e.Op.CAPTURE:null===this.name||0===this.name.length?t+="(":t+=`(?P<${this.name}>`,this.subs[0].op!==e.Op.EMPTY_MATCH&&(t+=this.subs[0].appendTo()),t+=")";break;case e.Op.BEGIN_TEXT:t+="\\A";break;case e.Op.END_TEXT:0!==(this.flags&_t.WAS_DOLLAR)?t+="(?-m:$)":t+="\\z";break;case e.Op.BEGIN_LINE:t+="^";break;case e.Op.END_LINE:t+="$";break;case e.Op.WORD_BOUNDARY:t+="\\b";break;case e.Op.NO_WORD_BOUNDARY:t+="\\B";break;case e.Op.CHAR_CLASS:if(this.runes.length%2!=0){t+="[invalid char class]";break}if(t+="[",0===this.runes.length)t+="^\\x00-\\x{10FFFF}";else if(0===this.runes[0]&&this.runes[this.runes.length-1]===Tt.MAX_RUNE){t+="^";for(let n=1;n<this.runes.length-1;n+=2){const r=this.runes[n]+1,s=this.runes[n+1]-1;t+=e.quoteIfHyphen(r),t+=bt.escapeRune(r),r!==s&&(t+="-",t+=e.quoteIfHyphen(s),t+=bt.escapeRune(s))}}else for(let n=0;n<this.runes.length;n+=2){const r=this.runes[n],s=this.runes[n+1];t+=e.quoteIfHyphen(r),t+=bt.escapeRune(r),r!==s&&(t+="-",t+=e.quoteIfHyphen(s),t+=bt.escapeRune(s))}t+="]";break;default:t+=this.op}return t}maxCap(){let t=0;if(this.op===e.Op.CAPTURE&&(t=this.cap),null!==this.subs)for(let e of this.subs){const n=e.maxCap();t<n&&(t=n)}return t}equals(t){if(!(null!==t&&t instanceof e))return!1;if(this.op!==t.op)return!1;switch(this.op){case e.Op.END_TEXT:if((this.flags&_t.WAS_DOLLAR)!==(t.flags&_t.WAS_DOLLAR))return!1;break;case e.Op.LITERAL:case e.Op.CHAR_CLASS:if(null===this.runes&&null===t.runes)break;if(null===this.runes||null===t.runes)return!1;if(this.runes.length!==t.runes.length)return!1;for(let e=0;e<this.runes.length;e++)if(this.runes[e]!==t.runes[e])return!1;break;case e.Op.ALTERNATE:case e.Op.CONCAT:if(this.subs.length!==t.subs.length)return!1;for(let e=0;e<this.subs.length;++e)if(!this.subs[e].equals(t.subs[e]))return!1;break;case e.Op.STAR:case e.Op.PLUS:case e.Op.QUEST:if((this.flags&_t.NON_GREEDY)!==(t.flags&_t.NON_GREEDY)||!this.subs[0].equals(t.subs[0]))return!1;break;case e.Op.REPEAT:if((this.flags&_t.NON_GREEDY)!==(t.flags&_t.NON_GREEDY)||this.min!==t.min||this.max!==t.max||!this.subs[0].equals(t.subs[0]))return!1;break;case e.Op.CAPTURE:if(this.cap!==t.cap||(null===this.name?null!==t.name:this.name!==t.name)||!this.subs[0].equals(t.subs[0]))return!1}return!0}};t(Bt,"Op",It(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","LEFT_PAREN","VERTICAL_BAR"]));let $t=Bt;const qt=class e{static isRuneOp(t){return e.RUNE<=t&&t<=e.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let n of e)t+=bt.escapeRune(n);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=null}matchRune(e){if(1===this.runes.length){const t=this.runes[0];return 0!==(this.arg&_t.FOLD_CASE)?Tt.equalsIgnoreCase(t,e):e===t}for(let r=0;r<this.runes.length&&r<=8;r+=2){if(e<this.runes[r])return!1;if(e<=this.runes[r+1])return!0}let t=0,n=this.runes.length/2|0;for(;t<n;){const r=t+((n-t)/2|0);if(this.runes[2*r]<=e){if(e<=this.runes[2*r+1])return!0;t=r+1}else n=r}return!1}toString(){switch(this.op){case e.ALT:return`alt -> ${this.out}, ${this.arg}`;case e.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case e.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case e.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case e.MATCH:return"match";case e.FAIL:return"fail";case e.NOP:return`nop -> ${this.out}`;case e.RUNE:return null===this.runes?"rune <null>":["rune ",e.escapeRunes(this.runes),0!==(this.arg&_t.FOLD_CASE)?"/i":""," -> ",this.out].join("");case e.RUNE1:return`rune1 ${e.escapeRunes(this.runes)} -> ${this.out}`;case e.RUNE_ANY:return`any -> ${this.out}`;case e.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}};t(qt,"ALT",1),t(qt,"ALT_MATCH",2),t(qt,"CAPTURE",3),t(qt,"EMPTY_WIDTH",4),t(qt,"FAIL",5),t(qt,"MATCH",6),t(qt,"NOP",7),t(qt,"RUNE",8),t(qt,"RUNE1",9),t(qt,"RUNE_ANY",10),t(qt,"RUNE_ANY_NOT_NL",11);let jt=qt;class Ht{constructor(){this.inst=[],this.start=0,this.numCap=2}getInst(e){return this.inst[e]}numInst(){return this.inst.length}addInst(e){this.inst.push(new jt(e))}skipNop(e){let t=this.inst[e];for(;t.op===jt.NOP||t.op===jt.CAPTURE;)t=this.inst[e],e=t.out;return t}prefix(){let e="",t=this.skipNop(this.start);if(!jt.isRuneOp(t.op)||1!==t.runes.length)return[t.op===jt.MATCH,e];for(;jt.isRuneOp(t.op)&&1===t.runes.length&&0===(t.arg&_t.FOLD_CASE);)e+=String.fromCodePoint(t.runes[0]),t=this.skipNop(t.out);return[t.op===jt.MATCH,e]}startCond(){let e=0,t=this.start;e:for(;;){const n=this.inst[t];switch(n.op){case jt.EMPTY_WIDTH:e|=n.arg;break;case jt.FAIL:return-1;case jt.CAPTURE:case jt.NOP:break;default:break e}t=n.out}return e}next(e){const t=this.inst[e>>1];return 1&e?t.arg:t.out}patch(e,t){for(;0!==e;){const n=this.inst[e>>1];1&e?(e=n.arg,n.arg=t):(e=n.out,n.out=t)}}append(e,t){if(0===e)return t;if(0===t)return e;let n=e;for(;;){const e=this.next(n);if(0===e)break;n=e}const r=this.inst[n>>1];return 1&n?r.arg=t:r.out=t,e}toString(){let e="";for(let t=0;t<this.inst.length;t++){const n=e.length;e+=t,t===this.start&&(e+="*"),e+="        ".substring(e.length-n),e+=this.inst[t],e+="\n"}return e}}class Gt{constructor(e=0,t=0,n=!1){this.i=e,this.out=t,this.nullable=n}}class zt{static ANY_RUNE_NOT_NL(){return[0,vt.CODES.get("\n")-1,vt.CODES.get("\n")+1,Tt.MAX_RUNE]}static ANY_RUNE(){return[0,Tt.MAX_RUNE]}static compileRegexp(e){const t=new zt,n=t.compile(e);return t.prog.patch(n.out,t.newInst(jt.MATCH).i),t.prog.start=n.i,t.prog}constructor(){this.prog=new Ht,this.newInst(jt.FAIL)}newInst(e){return this.prog.addInst(e),new Gt(this.prog.numInst()-1,0,!0)}nop(){const e=this.newInst(jt.NOP);return e.out=e.i<<1,e}fail(){return new Gt}cap(e){const t=this.newInst(jt.CAPTURE);return t.out=t.i<<1,this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return 0===e.i||0===t.i?this.fail():(this.prog.patch(e.out,t.i),new Gt(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(0===e.i)return t;if(0===t.i)return e;const n=this.newInst(jt.ALT),r=this.prog.getInst(n.i);return r.out=e.i,r.arg=t.i,n.out=this.prog.append(e.out,t.out),n.nullable=e.nullable||t.nullable,n}loop(e,t){const n=this.newInst(jt.ALT),r=this.prog.getInst(n.i);return t?(r.arg=e.i,n.out=n.i<<1):(r.out=e.i,n.out=n.i<<1|1),this.prog.patch(e.out,n.i),n}quest(e,t){const n=this.newInst(jt.ALT),r=this.prog.getInst(n.i);return t?(r.arg=e.i,n.out=n.i<<1):(r.out=e.i,n.out=n.i<<1|1),n.out=this.prog.append(n.out,e.out),n}star(e,t){return e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return new Gt(e.i,this.loop(e,t).out,e.nullable)}empty(e){const t=this.newInst(jt.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=t.i<<1,t}rune(e,t){const n=this.newInst(jt.RUNE);n.nullable=!1;const r=this.prog.getInst(n.i);return r.runes=e,t&=_t.FOLD_CASE,1===e.length&&Tt.simpleFold(e[0])!==e[0]||(t&=-2),r.arg=t,n.out=n.i<<1,0===(t&_t.FOLD_CASE)&&1===e.length||2===e.length&&e[0]===e[1]?r.op=jt.RUNE1:2===e.length&&0===e[0]&&e[1]===Tt.MAX_RUNE?r.op=jt.RUNE_ANY:4===e.length&&0===e[0]&&e[1]===vt.CODES.get("\n")-1&&e[2]===vt.CODES.get("\n")+1&&e[3]===Tt.MAX_RUNE&&(r.op=jt.RUNE_ANY_NOT_NL),n}compile(e){switch(e.op){case $t.Op.NO_MATCH:return this.fail();case $t.Op.EMPTY_MATCH:return this.nop();case $t.Op.LITERAL:if(0===e.runes.length)return this.nop();{let t=null;for(let n of e.runes){const r=this.rune([n],e.flags);t=null===t?r:this.cat(t,r)}return t}case $t.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case $t.Op.ANY_CHAR_NOT_NL:return this.rune(zt.ANY_RUNE_NOT_NL(),0);case $t.Op.ANY_CHAR:return this.rune(zt.ANY_RUNE(),0);case $t.Op.BEGIN_LINE:return this.empty(bt.EMPTY_BEGIN_LINE);case $t.Op.END_LINE:return this.empty(bt.EMPTY_END_LINE);case $t.Op.BEGIN_TEXT:return this.empty(bt.EMPTY_BEGIN_TEXT);case $t.Op.END_TEXT:return this.empty(bt.EMPTY_END_TEXT);case $t.Op.WORD_BOUNDARY:return this.empty(bt.EMPTY_WORD_BOUNDARY);case $t.Op.NO_WORD_BOUNDARY:return this.empty(bt.EMPTY_NO_WORD_BOUNDARY);case $t.Op.CAPTURE:{const t=this.cap(e.cap<<1),n=this.compile(e.subs[0]),r=this.cap(e.cap<<1|1);return this.cat(this.cat(t,n),r)}case $t.Op.STAR:return this.star(this.compile(e.subs[0]),0!==(e.flags&_t.NON_GREEDY));case $t.Op.PLUS:return this.plus(this.compile(e.subs[0]),0!==(e.flags&_t.NON_GREEDY));case $t.Op.QUEST:return this.quest(this.compile(e.subs[0]),0!==(e.flags&_t.NON_GREEDY));case $t.Op.CONCAT:if(0===e.subs.length)return this.nop();{let t=null;for(let n of e.subs){const e=this.compile(n);t=null===t?e:this.cat(t,e)}return t}case $t.Op.ALTERNATE:if(0===e.subs.length)return this.nop();{let t=null;for(let n of e.subs){const e=this.compile(n);t=null===t?e:this.alt(t,e)}return t}default:throw new Dt("regexp: unhandled case in compile")}}}class Kt{static simplify(e){if(null===e)return null;switch(e.op){case $t.Op.CAPTURE:case $t.Op.CONCAT:case $t.Op.ALTERNATE:{let t=e;for(let n=0;n<e.subs.length;n++){const r=e.subs[n],s=Kt.simplify(r);t===e&&s!==r&&(t=$t.fromRegexp(e),t.runes=null,t.subs=e.subs.slice(0,e.subs.length)),t!==e&&(t.subs[n]=s)}return t}case $t.Op.STAR:case $t.Op.PLUS:case $t.Op.QUEST:{const t=Kt.simplify(e.subs[0]);return Kt.simplify1(e.op,e.flags,t,e)}case $t.Op.REPEAT:{if(0===e.min&&0===e.max)return new $t($t.Op.EMPTY_MATCH);const t=Kt.simplify(e.subs[0]);if(-1===e.max){if(0===e.min)return Kt.simplify1($t.Op.STAR,e.flags,t,null);if(1===e.min)return Kt.simplify1($t.Op.PLUS,e.flags,t,null);const n=new $t($t.Op.CONCAT),r=[];for(let s=0;s<e.min-1;s++)r.push(t);return r.push(Kt.simplify1($t.Op.PLUS,e.flags,t,null)),n.subs=r.slice(0),n}if(1===e.min&&1===e.max)return t;let n=null;if(e.min>0){n=[];for(let r=0;r<e.min;r++)n.push(t)}if(e.max>e.min){let r=Kt.simplify1($t.Op.QUEST,e.flags,t,null);for(let n=e.min+1;n<e.max;n++){const n=new $t($t.Op.CONCAT);n.subs=[t,r],r=Kt.simplify1($t.Op.QUEST,e.flags,n,null)}if(null===n)return r;n.push(r)}if(null!==n){const e=new $t($t.Op.CONCAT);return e.subs=n.slice(0),e}return new $t($t.Op.NO_MATCH)}}return e}static simplify1(e,t,n,r){return n.op===$t.Op.EMPTY_MATCH||e===n.op&&(t&_t.NON_GREEDY)===(n.flags&_t.NON_GREEDY)?n:(null!==r&&r.op===e&&(r.flags&_t.NON_GREEDY)===(t&_t.NON_GREEDY)&&n===r.subs[0]||((r=new $t(e)).flags=t,r.subs=[n]),r)}}class Wt{constructor(e,t){this.sign=e,this.cls=t}}const Yt=[48,57],Qt=[9,10,12,13,32,32],Xt=[48,57,65,90,95,95,97,122],Jt=new Map([["\\d",new Wt(1,Yt)],["\\D",new Wt(-1,Yt)],["\\s",new Wt(1,Qt)],["\\S",new Wt(-1,Qt)],["\\w",new Wt(1,Xt)],["\\W",new Wt(-1,Xt)]]),Zt=[48,57,65,90,97,122],en=[65,90,97,122],tn=[0,127],nn=[9,9,32,32],rn=[0,31,127,127],sn=[48,57],an=[33,126],on=[97,122],un=[32,126],cn=[33,47,58,64,91,96,123,126],ln=[9,13,32,32],hn=[65,90],dn=[48,57,65,90,95,95,97,122],pn=[48,57,65,70,97,102],fn=new Map([["[:alnum:]",new Wt(1,Zt)],["[:^alnum:]",new Wt(-1,Zt)],["[:alpha:]",new Wt(1,en)],["[:^alpha:]",new Wt(-1,en)],["[:ascii:]",new Wt(1,tn)],["[:^ascii:]",new Wt(-1,tn)],["[:blank:]",new Wt(1,nn)],["[:^blank:]",new Wt(-1,nn)],["[:cntrl:]",new Wt(1,rn)],["[:^cntrl:]",new Wt(-1,rn)],["[:digit:]",new Wt(1,sn)],["[:^digit:]",new Wt(-1,sn)],["[:graph:]",new Wt(1,an)],["[:^graph:]",new Wt(-1,an)],["[:lower:]",new Wt(1,on)],["[:^lower:]",new Wt(-1,on)],["[:print:]",new Wt(1,un)],["[:^print:]",new Wt(-1,un)],["[:punct:]",new Wt(1,cn)],["[:^punct:]",new Wt(-1,cn)],["[:space:]",new Wt(1,ln)],["[:^space:]",new Wt(-1,ln)],["[:upper:]",new Wt(1,hn)],["[:^upper:]",new Wt(-1,hn)],["[:word:]",new Wt(1,dn)],["[:^word:]",new Wt(-1,dn)],["[:xdigit:]",new Wt(1,pn)],["[:^xdigit:]",new Wt(-1,pn)]]);class gn{static charClassToString(e,t){let n="[";for(let r=0;r<t;r+=2){r>0&&(n+=" ");const t=e[r],s=e[r+1];n+=t===s?`0x${t.toString(16)}`:`0x${t.toString(16)}-0x${s.toString(16)}`}return n+="]",n}static cmp(e,t,n,r){const s=e[t]-n;return 0!==s?s:r-e[t+1]}static qsortIntPair(e,t,n){const r=(t+n)/2&-2,s=e[r],i=e[r+1];let a=t,o=n;for(;a<=o;){for(;a<n&&gn.cmp(e,a,s,i)<0;)a+=2;for(;o>t&&gn.cmp(e,o,s,i)>0;)o-=2;if(a<=o){if(a!==o){let t=e[a];e[a]=e[o],e[o]=t,t=e[a+1],e[a+1]=e[o+1],e[o+1]=t}a+=2,o-=2}}t<o&&gn.qsortIntPair(e,t,o),a<n&&gn.qsortIntPair(e,a,n)}constructor(e=bt.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.len===this.r.length?this.r:this.r.slice(0,this.len)}cleanClass(){if(this.len<4)return this;gn.qsortIntPair(this.r,0,this.len-2);let e=2;for(let t=2;t<this.len;t+=2){const n=this.r[t],r=this.r[t+1];if(n<=this.r[e-1]+1){r>this.r[e-1]&&(this.r[e-1]=r);continue}this.r[e]=n,this.r[e+1]=r,e+=2}return this.len=e,this}appendLiteral(e,t){return 0!==(t&_t.FOLD_CASE)?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0)for(let n=2;n<=4;n+=2)if(this.len>=n){const r=this.r[this.len-n],s=this.r[this.len-n+1];if(e<=s+1&&r<=t+1)return e<r&&(this.r[this.len-n]=e),t>s&&(this.r[this.len-n+1]=t),this}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=Tt.MIN_FOLD&&t>=Tt.MAX_FOLD)return this.appendRange(e,t);if(t<Tt.MIN_FOLD||e>Tt.MAX_FOLD)return this.appendRange(e,t);e<Tt.MIN_FOLD&&(this.appendRange(e,Tt.MIN_FOLD-1),e=Tt.MIN_FOLD),t>Tt.MAX_FOLD&&(this.appendRange(Tt.MAX_FOLD+1,t),t=Tt.MAX_FOLD);for(let n=e;n<=t;n++){this.appendRange(n,n);for(let e=Tt.simpleFold(n);e!==n;e=Tt.simpleFold(e))this.appendRange(e,e)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let n=0;n<e.length;n+=2){const r=e[n],s=e[n+1];t<=r-1&&this.appendRange(t,r-1),t=s+1}return t<=Tt.MAX_RUNE&&this.appendRange(t,Tt.MAX_RUNE),this}appendTable(e){for(let t of e){const e=t[0],n=t[1],r=t[2];if(1!==r)for(let t=e;t<=n;t+=r)this.appendRange(t,t);else this.appendRange(e,n)}return this}appendNegatedTable(e){let t=0;for(let n of e){const e=n[0],r=n[1],s=n[2];if(1!==s)for(let n=e;n<=r;n+=s)t<=n-1&&this.appendRange(t,n-1),t=n+1;else t<=e-1&&this.appendRange(t,e-1),t=r+1}return t<=Tt.MAX_RUNE&&this.appendRange(t,Tt.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let n=0;n<this.len;n+=2){const r=this.r[n],s=this.r[n+1];e<=r-1&&(this.r[t]=e,this.r[t+1]=r-1,t+=2),e=s+1}return this.len=t,e<=Tt.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=Tt.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let n=e.cls;return t&&(n=(new gn).appendFoldedClass(n).cleanClass().toArray()),this.appendClassWithSign(n,e.sign)}toString(){return gn.charClassToString(this.r,this.len)}}class mn{static of(e,t){return new mn(e,t)}constructor(e,t){this.first=e,this.second=t}}class yn{constructor(e){this.str=e,this.position=0}pos(){return this.position}rewindTo(e){this.position=e}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(e){this.position+=e}skipString(e){this.position+=e.length}pop(){const e=this.str.codePointAt(this.position);return this.position+=bt.charCount(e),e}lookingAt(e){return this.rest().startsWith(e)}rest(){return this.str.substring(this.position)}from(e){return this.str.substring(e,this.position)}toString(){return this.rest()}}const _n=class e{static ANY_TABLE(){return[[0,Tt.MAX_RUNE,1]]}static unicodeTable(t){return"Any"===t?mn.of(e.ANY_TABLE(),e.ANY_TABLE()):Et.CATEGORIES.has(t)?mn.of(Et.CATEGORIES.get(t),Et.FOLD_CATEGORIES.get(t)):Et.SCRIPTS.has(t)?mn.of(Et.SCRIPTS.get(t),Et.FOLD_SCRIPT.get(t)):null}static minFoldRune(e){if(e<Tt.MIN_FOLD||e>Tt.MAX_FOLD)return e;let t=e;const n=e;for(e=Tt.simpleFold(e);e!==n;e=Tt.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===$t.Op.EMPTY_MATCH)return null;if(e.op===$t.Op.CONCAT&&e.subs.length>0){const t=e.subs[0];return t.op===$t.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){const n=new $t($t.Op.LITERAL);return n.flags=t,n.runes=bt.stringToRunes(e),n}static parse(t,n){return new e(t,n).parseInternal()}static parseRepeat(t){const n=t.pos();if(!t.more()||!t.lookingAt("{"))return-1;t.skip(1);const r=e.parseInt(t);if(-1===r)return-1;if(!t.more())return-1;let s;if(t.lookingAt(",")){if(t.skip(1),!t.more())return-1;if(t.lookingAt("}"))s=-1;else if(-1===(s=e.parseInt(t)))return-1}else s=r;if(!t.more()||!t.lookingAt("}"))return-1;if(t.skip(1),r<0||r>1e3||-2===s||s>1e3||s>=0&&r>s)throw new kt(e.ERR_INVALID_REPEAT_SIZE,t.from(n));return r<<16|s&Tt.MAX_BMP}static isValidCaptureName(e){if(0===e.length)return!1;for(let t=0;t<e.length;t++){const n=e.codePointAt(t);if(n!==vt.CODES.get("_")&&!bt.isalnum(n))return!1}return!0}static parseInt(e){const t=e.pos();for(;e.more()&&e.peek()>=vt.CODES.get("0")&&e.peek()<=vt.CODES.get("9");)e.skip(1);const n=e.from(t);return 0===n.length||n.length>1&&n.codePointAt(0)===vt.CODES.get("0")?-1:n.length>8?-2:parseFloat(n,10)}static isCharClass(e){return e.op===$t.Op.LITERAL&&1===e.runes.length||e.op===$t.Op.CHAR_CLASS||e.op===$t.Op.ANY_CHAR_NOT_NL||e.op===$t.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case $t.Op.LITERAL:return 1===e.runes.length&&e.runes[0]===t;case $t.Op.CHAR_CLASS:for(let n=0;n<e.runes.length;n+=2)if(e.runes[n]<=t&&t<=e.runes[n+1])return!0;return!1;case $t.Op.ANY_CHAR_NOT_NL:return t!==vt.CODES.get("\n");case $t.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(t,n){switch(t.op){case $t.Op.ANY_CHAR:break;case $t.Op.ANY_CHAR_NOT_NL:e.matchRune(n,vt.CODES.get("\n"))&&(t.op=$t.Op.ANY_CHAR);break;case $t.Op.CHAR_CLASS:n.op===$t.Op.LITERAL?t.runes=new gn(t.runes).appendLiteral(n.runes[0],n.flags).toArray():t.runes=new gn(t.runes).appendClass(n.runes).toArray();break;case $t.Op.LITERAL:if(n.runes[0]===t.runes[0]&&n.flags===t.flags)break;t.op=$t.Op.CHAR_CLASS,t.runes=(new gn).appendLiteral(t.runes[0],t.flags).appendLiteral(n.runes[0],n.flags).toArray()}}static parseEscape(t){const n=t.pos();if(t.skip(1),!t.more())throw new kt(e.ERR_TRAILING_BACKSLASH);let r=t.pop();e:switch(r){case vt.CODES.get("1"):case vt.CODES.get("2"):case vt.CODES.get("3"):case vt.CODES.get("4"):case vt.CODES.get("5"):case vt.CODES.get("6"):case vt.CODES.get("7"):if(!t.more()||t.peek()<vt.CODES.get("0")||t.peek()>vt.CODES.get("7"))break;case vt.CODES.get("0"):{let e=r-vt.CODES.get("0");for(let n=1;n<3&&!(!t.more()||t.peek()<vt.CODES.get("0")||t.peek()>vt.CODES.get("7"));n++)e=8*e+t.peek()-vt.CODES.get("0"),t.skip(1);return e}case vt.CODES.get("x"):{if(!t.more())break;if(r=t.pop(),r===vt.CODES.get("{")){let e=0,n=0;for(;;){if(!t.more())break e;if(r=t.pop(),r===vt.CODES.get("}"))break;const s=bt.unhex(r);if(s<0)break e;if(n=16*n+s,n>Tt.MAX_RUNE)break e;e++}if(0===e)break e;return n}const e=bt.unhex(r);if(!t.more())break;r=t.pop();const n=bt.unhex(r);if(e<0||n<0)break;return 16*e+n}case vt.CODES.get("a"):return vt.CODES.get("");case vt.CODES.get("f"):return vt.CODES.get("\f");case vt.CODES.get("n"):return vt.CODES.get("\n");case vt.CODES.get("r"):return vt.CODES.get("\r");case vt.CODES.get("t"):return vt.CODES.get("\t");case vt.CODES.get("v"):return vt.CODES.get("\v");default:if(!bt.isalnum(r))return r}throw new kt(e.ERR_INVALID_ESCAPE,t.from(n))}static parseClassChar(t,n){if(!t.more())throw new kt(e.ERR_MISSING_BRACKET,t.from(n));return t.lookingAt("\\")?e.parseEscape(t):t.pop()}static concatRunes(e,t){return[...e,...t]}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups={},this.stack=[],this.free=null}newRegexp(e){let t=this.free;return null!==t&&null!==t.subs&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):t=new $t(e),t}reuse(e){null!==e.subs&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}pop(){return this.stack.pop()}popToPseudo(){const e=this.stack.length;let t=e;for(;t>0&&!$t.isPseudoOp(this.stack[t-1].op);)t--;const n=this.stack.slice(t,e);return this.stack=this.stack.slice(0,t),n}push(e){if(e.op===$t.Op.CHAR_CLASS&&2===e.runes.length&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],-2&this.flags))return null;e.op=$t.Op.LITERAL,e.runes=[e.runes[0]],e.flags=-2&this.flags}else if(e.op===$t.Op.CHAR_CLASS&&4===e.runes.length&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&Tt.simpleFold(e.runes[0])===e.runes[2]&&Tt.simpleFold(e.runes[2])===e.runes[0]||e.op===$t.Op.CHAR_CLASS&&2===e.runes.length&&e.runes[0]+1===e.runes[1]&&Tt.simpleFold(e.runes[0])===e.runes[1]&&Tt.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|_t.FOLD_CASE))return null;e.op=$t.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|_t.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),e}maybeConcat(t,n){const r=this.stack.length;if(r<2)return!1;const s=this.stack[r-1],i=this.stack[r-2];return s.op===$t.Op.LITERAL&&i.op===$t.Op.LITERAL&&(s.flags&_t.FOLD_CASE)===(i.flags&_t.FOLD_CASE)&&(i.runes=e.concatRunes(i.runes,s.runes),t>=0?(s.runes=[t],s.flags=n,!0):(this.pop(),this.reuse(s),!1))}newLiteral(t,n){const r=this.newRegexp($t.Op.LITERAL);return r.flags=n,0!==(n&_t.FOLD_CASE)&&(t=e.minFoldRune(t)),r.runes=[t],r}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){const t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(t,n,r,s,i,a){let o=this.flags;if(0!==(o&_t.PERL_X)&&(i.more()&&i.lookingAt("?")&&(i.skip(1),o^=_t.NON_GREEDY),-1!==a))throw new kt(e.ERR_INVALID_REPEAT_OP,i.from(a));const u=this.stack.length;if(0===u)throw new kt(e.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const c=this.stack[u-1];if($t.isPseudoOp(c.op))throw new kt(e.ERR_MISSING_REPEAT_ARGUMENT,i.from(s));const l=this.newRegexp(t);l.min=n,l.max=r,l.flags=o,l.subs=[c],this.stack[u-1]=l}concat(){this.maybeConcat(-1,0);const e=this.popToPseudo();return 0===e.length?this.push(this.newRegexp($t.Op.EMPTY_MATCH)):this.push(this.collapse(e,$t.Op.CONCAT))}alternate(){const e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),0===e.length?this.push(this.newRegexp($t.Op.NO_MATCH)):this.push(this.collapse(e,$t.Op.ALTERNATE))}cleanAlt(e){e.op===$t.Op.CHAR_CLASS&&(e.runes=new gn(e.runes).cleanClass().toArray(),2===e.runes.length&&0===e.runes[0]&&e.runes[1]===Tt.MAX_RUNE?(e.runes=null,e.op=$t.Op.ANY_CHAR):4===e.runes.length&&0===e.runes[0]&&e.runes[1]===vt.CODES.get("\n")-1&&e.runes[2]===vt.CODES.get("\n")+1&&e.runes[3]===Tt.MAX_RUNE&&(e.runes=null,e.op=$t.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(1===e.length)return e[0];let n=0;for(let a of e)n+=a.op===t?a.subs.length:1;let r=new Array(n).fill(null),s=0;for(let a of e)a.op===t?(r.splice(s,a.subs.length,...a.subs),s+=a.subs.length,this.reuse(a)):r[s++]=a;let i=this.newRegexp(t);if(i.subs=r,t===$t.Op.ALTERNATE&&(i.subs=this.factor(i.subs),1===i.subs.length)){const e=i;i=i.subs[0],this.reuse(e)}return i}factor(t){if(t.length<2)return t;let n=0,r=t.length,s=0,i=null,a=0,o=0,u=0;for(let e=0;e<=r;e++){let c=null,l=0,h=0;if(e<r){let r=t[n+e];if(r.op===$t.Op.CONCAT&&r.subs.length>0&&(r=r.subs[0]),r.op===$t.Op.LITERAL&&(c=r.runes,l=r.runes.length,h=r.flags&_t.FOLD_CASE),h===o){let e=0;for(;e<a&&e<l&&i[e]===c[e];)e++;if(e>0){a=e;continue}}}if(e===u);else if(e===u+1)t[s++]=t[n+u];else{const r=this.newRegexp($t.Op.LITERAL);r.flags=o,r.runes=i.slice(0,a);for(let s=u;s<e;s++)t[n+s]=this.removeLeadingString(t[n+s],a);const c=this.collapse(t.slice(n+u,n+e),$t.Op.ALTERNATE),l=this.newRegexp($t.Op.CONCAT);l.subs=[r,c],t[s++]=l}u=e,i=c,a=l,o=h}r=s,n=0,u=0,s=0;let c=null;for(let l=0;l<=r;l++){let i=null;if(!(l<r&&(i=e.leadingRegexp(t[n+l]),null!==c&&c.equals(i)&&(e.isCharClass(c)||c.op===$t.Op.REPEAT&&c.min===c.max&&e.isCharClass(c.subs[0]))))){if(l===u);else if(l===u+1)t[s++]=t[n+u];else{const e=c;for(let s=u;s<l;s++){const e=s!==u;t[n+s]=this.removeLeadingRegexp(t[n+s],e)}const r=this.collapse(t.slice(n+u,n+l),$t.Op.ALTERNATE),i=this.newRegexp($t.Op.CONCAT);i.subs=[e,r],t[s++]=i}u=l,c=i}}r=s,n=0,u=0,s=0;for(let l=0;l<=r;l++)if(!(l<r&&e.isCharClass(t[n+l]))){if(l===u);else if(l===u+1)t[s++]=t[n+u];else{let r=u;for(let e=u+1;e<l;e++){const s=t[n+r],i=t[n+e];(s.op<i.op||s.op===i.op&&(null!==s.runes?s.runes.length:0)<(null!==i.runes?i.runes.length:0))&&(r=e)}const i=t[n+u];t[n+u]=t[n+r],t[n+r]=i;for(let s=u+1;s<l;s++)e.mergeCharClass(t[n+u],t[n+s]),this.reuse(t[n+s]);this.cleanAlt(t[n+u]),t[s++]=t[n+u]}l<r&&(t[s++]=t[n+l]),u=l+1}r=s,n=0,u=0,s=0;for(let e=0;e<r;++e)e+1<r&&t[n+e].op===$t.Op.EMPTY_MATCH&&t[n+e+1].op===$t.Op.EMPTY_MATCH||(t[s++]=t[n+e]);return r=s,n=0,t.slice(n,r)}removeLeadingString(e,t){if(e.op===$t.Op.CONCAT&&e.subs.length>0){const n=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=n,n.op===$t.Op.EMPTY_MATCH)switch(this.reuse(n),e.subs.length){case 0:case 1:e.op=$t.Op.EMPTY_MATCH,e.subs=null;break;case 2:{const t=e;e=e.subs[1],this.reuse(t);break}default:e.subs=e.subs.slice(1,e.subs.length)}return e}return e.op===$t.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),0===e.runes.length&&(e.op=$t.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===$t.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=$t.Op.EMPTY_MATCH,e.subs=$t.emptySubs();break;case 1:{const t=e;e=e.subs[0],this.reuse(t);break}}return e}return t&&this.reuse(e),this.newRegexp($t.Op.EMPTY_MATCH)}parseInternal(){if(0!==(this.flags&_t.LITERAL))return e.literalRegexp(this.wholeRegexp,this.flags);let t=-1,n=-1,r=-1;const s=new yn(this.wholeRegexp);for(;s.more();){let i=-1;e:switch(s.peek()){case vt.CODES.get("("):if(0!==(this.flags&_t.PERL_X)&&s.lookingAt("(?")){this.parsePerlFlags(s);break}this.op($t.Op.LEFT_PAREN).cap=++this.numCap,s.skip(1);break;case vt.CODES.get("|"):this.parseVerticalBar(),s.skip(1);break;case vt.CODES.get(")"):this.parseRightParen(),s.skip(1);break;case vt.CODES.get("^"):0!==(this.flags&_t.ONE_LINE)?this.op($t.Op.BEGIN_TEXT):this.op($t.Op.BEGIN_LINE),s.skip(1);break;case vt.CODES.get("$"):0!==(this.flags&_t.ONE_LINE)?this.op($t.Op.END_TEXT).flags|=_t.WAS_DOLLAR:this.op($t.Op.END_LINE),s.skip(1);break;case vt.CODES.get("."):0!==(this.flags&_t.DOT_NL)?this.op($t.Op.ANY_CHAR):this.op($t.Op.ANY_CHAR_NOT_NL),s.skip(1);break;case vt.CODES.get("["):this.parseClass(s);break;case vt.CODES.get("*"):case vt.CODES.get("+"):case vt.CODES.get("?"):{i=s.pos();let e=null;switch(s.pop()){case vt.CODES.get("*"):e=$t.Op.STAR;break;case vt.CODES.get("+"):e=$t.Op.PLUS;break;case vt.CODES.get("?"):e=$t.Op.QUEST}this.repeat(e,n,r,i,s,t);break}case vt.CODES.get("{"):{i=s.pos();const a=e.parseRepeat(s);if(a<0){s.rewindTo(i),this.literal(s.pop());break}n=a>>16,r=(a&Tt.MAX_BMP)<<16>>16,this.repeat($t.Op.REPEAT,n,r,i,s,t);break}case vt.CODES.get("\\"):{const t=s.pos();if(s.skip(1),0!==(this.flags&_t.PERL_X)&&s.more()){switch(s.pop()){case vt.CODES.get("A"):this.op($t.Op.BEGIN_TEXT);break e;case vt.CODES.get("b"):this.op($t.Op.WORD_BOUNDARY);break e;case vt.CODES.get("B"):this.op($t.Op.NO_WORD_BOUNDARY);break e;case vt.CODES.get("C"):throw new kt(e.ERR_INVALID_ESCAPE,"\\C");case vt.CODES.get("Q"):{let e=s.rest();const t=e.indexOf("\\E");t>=0&&(e=e.substring(0,t)),s.skipString(e),s.skipString("\\E");let n=0;for(;n<e.length;){const t=e.codePointAt(n);this.literal(t),n+=bt.charCount(t)}break e}case vt.CODES.get("z"):this.op($t.Op.END_TEXT);break e;default:s.rewindTo(t)}}const n=this.newRegexp($t.Op.CHAR_CLASS);if(n.flags=this.flags,s.lookingAt("\\p")||s.lookingAt("\\P")){const e=new gn;if(this.parseUnicodeClass(s,e)){n.runes=e.toArray(),this.push(n);break e}}const r=new gn;if(this.parsePerlClassEscape(s,r)){n.runes=r.toArray(),this.push(n);break e}s.rewindTo(t),this.reuse(n),this.literal(e.parseEscape(s));break}default:this.literal(s.pop())}t=i}this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate();if(1!==this.stack.length)throw new kt(e.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(t){const n=t.pos(),r=t.rest();if(r.startsWith("(?P<")||r.startsWith("(?<")){const n="P"===r.charAt(2)?4:3,s=r.indexOf(">");if(s<0)throw new kt(e.ERR_INVALID_NAMED_CAPTURE,r);const i=r.substring(n,s);if(t.skipString(i),t.skip(n+1),!e.isValidCaptureName(i))throw new kt(e.ERR_INVALID_NAMED_CAPTURE,r.substring(0,s+1));const a=this.op($t.Op.LEFT_PAREN);if(a.cap=++this.numCap,this.namedGroups[i])throw new kt(e.ERR_DUPLICATE_NAMED_CAPTURE,i);return this.namedGroups[i]=this.numCap,void(a.name=i)}t.skip(2);let s=this.flags,i=1,a=!1;e:for(;t.more();){const e=t.pop();switch(e){case vt.CODES.get("i"):s|=_t.FOLD_CASE,a=!0;break;case vt.CODES.get("m"):s&=-17,a=!0;break;case vt.CODES.get("s"):s|=_t.DOT_NL,a=!0;break;case vt.CODES.get("U"):s|=_t.NON_GREEDY,a=!0;break;case vt.CODES.get("-"):if(i<0)break e;i=-1,s=~s,a=!1;break;case vt.CODES.get(":"):case vt.CODES.get(")"):if(i<0){if(!a)break e;s=~s}return e===vt.CODES.get(":")&&this.op($t.Op.LEFT_PAREN),void(this.flags=s);default:break e}}throw new kt(e.ERR_INVALID_PERL_OP,t.from(n))}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op($t.Op.VERTICAL_BAR)}swapVerticalBar(){const t=this.stack.length;if(t>=3&&this.stack[t-2].op===$t.Op.VERTICAL_BAR&&e.isCharClass(this.stack[t-1])&&e.isCharClass(this.stack[t-3])){let n=this.stack[t-1],r=this.stack[t-3];if(n.op>r.op){const e=r;r=n,n=e,this.stack[t-3]=r}return e.mergeCharClass(r,n),this.reuse(n),this.pop(),!0}if(t>=2){const e=this.stack[t-1],n=this.stack[t-2];if(n.op===$t.Op.VERTICAL_BAR)return t>=3&&this.cleanAlt(this.stack[t-3]),this.stack[t-2]=e,this.stack[t-1]=n,!0}return!1}parseRightParen(){this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate();if(this.stack.length<2)throw new kt(e.ERR_INTERNAL_ERROR,"stack underflow");const t=this.pop(),n=this.pop();if(n.op!==$t.Op.LEFT_PAREN)throw new kt(e.ERR_MISSING_PAREN,this.wholeRegexp);this.flags=n.flags,0===n.cap?this.push(t):(n.op=$t.Op.CAPTURE,n.subs=[t],this.push(n))}parsePerlClassEscape(e,t){const n=e.pos();if(0===(this.flags&_t.PERL_X)||!e.more()||e.pop()!==vt.CODES.get("\\")||!e.more())return!1;e.pop();const r=e.from(n),s=Jt.has(r)?Jt.get(r):null;return null!==s&&(t.appendGroup(s,0!==(this.flags&_t.FOLD_CASE)),!0)}parseNamedClass(t,n){const r=t.rest(),s=r.indexOf(":]");if(s<0)return!1;const i=r.substring(0,s+2);t.skipString(i);const a=fn.has(i)?fn.get(i):null;if(null===a)throw new kt(e.ERR_INVALID_CHAR_RANGE,i);return n.appendGroup(a,0!==(this.flags&_t.FOLD_CASE)),!0}parseUnicodeClass(t,n){const r=t.pos();if(0===(this.flags&_t.UNICODE_GROUPS)||!t.lookingAt("\\p")&&!t.lookingAt("\\P"))return!1;t.skip(1);let s,i=1,a=t.pop();if(a===vt.CODES.get("P")&&(i=-1),!t.more())throw t.rewindTo(r),new kt(e.ERR_INVALID_CHAR_RANGE,t.rest());if(a=t.pop(),a!==vt.CODES.get("{"))s=bt.runeToString(a);else{const n=t.rest(),i=n.indexOf("}");if(i<0)throw t.rewindTo(r),new kt(e.ERR_INVALID_CHAR_RANGE,t.rest());s=n.substring(0,i),t.skipString(s),t.skip(1)}0!==s.length&&s.codePointAt(0)===vt.CODES.get("^")&&(i=0-i,s=s.substring(1));const o=e.unicodeTable(s);if(null===o)throw new kt(e.ERR_INVALID_CHAR_RANGE,t.from(r));const u=o.first,c=o.second;if(0===(this.flags&_t.FOLD_CASE)||null===c)n.appendTableWithSign(u,i);else{const e=(new gn).appendTable(u).appendTable(c).cleanClass().toArray();n.appendClassWithSign(e,i)}return!0}parseClass(t){const n=t.pos();t.skip(1);const r=this.newRegexp($t.Op.CHAR_CLASS);r.flags=this.flags;const s=new gn;let i=1;t.more()&&t.lookingAt("^")&&(i=-1,t.skip(1),0===(this.flags&_t.CLASS_NL)&&s.appendRange(vt.CODES.get("\n"),vt.CODES.get("\n")));let a=!0;for(;!t.more()||t.peek()!==vt.CODES.get("]")||a;){if(t.more()&&t.lookingAt("-")&&0===(this.flags&_t.PERL_X)&&!a){const r=t.rest();if("-"===r||!r.startsWith("-]"))throw t.rewindTo(n),new kt(e.ERR_INVALID_CHAR_RANGE,t.rest())}a=!1;const r=t.pos();if(t.lookingAt("[:")){if(this.parseNamedClass(t,s))continue;t.rewindTo(r)}if(this.parseUnicodeClass(t,s))continue;if(this.parsePerlClassEscape(t,s))continue;t.rewindTo(r);const i=e.parseClassChar(t,n);let o=i;if(t.more()&&t.lookingAt("-"))if(t.skip(1),t.more()&&t.lookingAt("]"))t.skip(-1);else if(o=e.parseClassChar(t,n),o<i)throw new kt(e.ERR_INVALID_CHAR_RANGE,t.from(r));0===(this.flags&_t.FOLD_CASE)?s.appendRange(i,o):s.appendFoldedRange(i,o)}t.skip(1),s.cleanClass(),i<0&&s.negateClass(),r.runes=s.toArray(),this.push(r)}};t(_n,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),t(_n,"ERR_INVALID_CHAR_RANGE","invalid character class range"),t(_n,"ERR_INVALID_ESCAPE","invalid escape sequence"),t(_n,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),t(_n,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),t(_n,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),t(_n,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),t(_n,"ERR_MISSING_BRACKET","missing closing ]"),t(_n,"ERR_MISSING_PAREN","missing closing )"),t(_n,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),t(_n,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),t(_n,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name");let vn=_n;class wn{constructor(){this.inst=null,this.cap=[]}}class En{constructor(){this.sparse=[],this.densePcs=[],this.denseThreads=[],this.size=0}contains(e){const t=this.sparse[e];return t<this.size&&this.densePcs[t]===e}isEmpty(){return 0===this.size}add(e){const t=this.size++;return this.sparse[e]=t,this.denseThreads[t]=null,this.densePcs[t]=e,t}clear(){this.sparse=[],this.densePcs=[],this.denseThreads=[],this.size=0}toString(){let e="{";for(let t=0;t<this.size;t++)0!==t&&(e+=", "),e+=this.densePcs[t];return e+="}",e}}class Tn{static fromRE2(e){const t=new Tn;return t.prog=e.prog,t.re2=e,t.q0=new En(t.prog.numInst()),t.q1=new En(t.prog.numInst()),t.pool=[],t.poolSize=0,t.matched=!1,t.matchcap=Array(t.prog.numCap<2?2:t.prog.numCap).fill(0),t.ncap=0,t}static fromMachine(e){const t=new Tn;return t.re2=e.re2,t.prog=e.prog,t.q0=e.q0,t.q1=e.q1,t.pool=e.pool,t.poolSize=e.poolSize,t.matched=e.matched,t.matchcap=e.matchcap,t.ncap=e.ncap,t}init(e){this.ncap=e,e>this.matchcap.length?this.initNewCap(e):this.resetCap(e)}resetCap(e){for(let t=0;t<this.poolSize;t++){this.pool[t].cap=Array(e).fill(0)}}initNewCap(e){for(let t=0;t<this.poolSize;t++){this.pool[t].cap=Array(e).fill(0)}this.matchcap=Array(e).fill(0)}submatches(){return 0===this.ncap?bt.emptyInts():this.matchcap.slice(0,this.ncap)}alloc(e){let t;return this.poolSize>0?(this.poolSize--,t=this.pool[this.poolSize]):t=new wn,t.inst=e,t}freeQueue(e,t=0){const n=e.size-t,r=this.poolSize+n;this.pool.length<r&&(this.pool=this.pool.slice(0,Math.max(2*this.pool.length,r)));for(let s=t;s<e.size;s++){const t=e.denseThreads[s];null!==t&&(this.pool[this.poolSize]=t,this.poolSize++)}e.clear()}freeThread(e){this.pool.length<=this.poolSize&&(this.pool=this.pool.slice(0,2*this.pool.length)),this.pool[this.poolSize]=e,this.poolSize++}match(e,t,n){const r=this.re2.cond;if(r===bt.EMPTY_ALL)return!1;if((n===_t.ANCHOR_START||n===_t.ANCHOR_BOTH)&&0!==t)return!1;this.matched=!1,this.matchcap=Array(this.prog.numCap).fill(-1);let s,i=this.q0,a=this.q1,o=e.step(t),u=o>>3,c=7&o,l=-1,h=0;for(o!==Mt.EOF()&&(o=e.step(t+c),l=o>>3,h=7&o),s=0===t?bt.emptyOpContext(-1,u):e.context(t);;){if(i.isEmpty()){if(0!==(r&bt.EMPTY_BEGIN_TEXT)&&0!==t)break;if(this.matched)break;if(0!==this.re2.prefix.length&&l!==this.re2.prefixRune&&e.canCheckPrefix()){const n=e.index(this.re2,t);if(n<0)break;t+=n,o=e.step(t),u=o>>3,c=7&o,o=e.step(t+c),l=o>>3,h=7&o}}this.matched||0!==t&&n!==_t.UNANCHORED||(this.ncap>0&&(this.matchcap[0]=t),this.add(i,this.prog.start,t,this.matchcap,s,null));const d=t+c;if(s=e.context(d),this.step(i,a,t,d,u,s,n,t===e.endPos()),0===c)break;if(0===this.ncap&&this.matched)break;t+=c,u=l,c=h,-1!==u&&(o=e.step(t+c),l=o>>3,h=7&o);const p=i;i=a,a=p}return this.freeQueue(a),this.matched}step(e,t,n,r,s,i,a,o){const u=this.re2.longest;for(let c=0;c<e.size;c++){let l=e.denseThreads[c];if(null===l)continue;if(u&&this.matched&&this.ncap>0&&this.matchcap[0]<l.cap[0]){this.freeThread(l);continue}const h=l.inst;let d=!1;switch(h.op){case jt.MATCH:if(a===_t.ANCHOR_BOTH&&!o)break;this.ncap>0&&(!u||!this.matched||this.matchcap[1]<n)&&(l.cap[1]=n,this.matchcap=l.cap.slice(0,this.ncap)),u||this.freeQueue(e,c+1),this.matched=!0;break;case jt.RUNE:d=h.matchRune(s);break;case jt.RUNE1:d=s===h.runes[0];break;case jt.RUNE_ANY:d=!0;break;case jt.RUNE_ANY_NOT_NL:d=s!==vt.CODES.get("\n");break;default:throw new Error("bad inst")}d&&(l=this.add(t,h.out,r,l.cap,i,l)),null!==l&&(this.freeThread(l),e.denseThreads[c]=null)}e.clear()}add(e,t,n,r,s,i){if(0===t)return i;if(e.contains(t))return i;const a=e.add(t),o=this.prog.inst[t];switch(o.op){case jt.FAIL:break;case jt.ALT:case jt.ALT_MATCH:i=this.add(e,o.out,n,r,s,i),i=this.add(e,o.arg,n,r,s,i);break;case jt.EMPTY_WIDTH:0===(o.arg&~s)&&(i=this.add(e,o.out,n,r,s,i));break;case jt.NOP:i=this.add(e,o.out,n,r,s,i);break;case jt.CAPTURE:if(o.arg<this.ncap){const t=r[o.arg];r[o.arg]=n,this.add(e,o.out,n,r,s,null),r[o.arg]=t}else i=this.add(e,o.out,n,r,s,i);break;case jt.MATCH:case jt.RUNE:case jt.RUNE1:case jt.RUNE_ANY:case jt.RUNE_ANY_NOT_NL:null===i?i=this.alloc(o):i.inst=o,this.ncap>0&&i.cap!==r&&(i.cap=r.slice(0,this.ncap)),e.denseThreads[a]=i,i=null;break;default:throw new Error("unhandled")}return i}}class bn{constructor(e){this.value=e}get(){return this.value}set(e){this.value=e}compareAndSet(e,t){return this.value===e&&(this.value=t,!0)}}class In{static initTest(e){const t=In.compile(e),n=new In(t.expr,t.prog,t.numSubexp,t.longest);return n.cond=t.cond,n.prefix=t.prefix,n.prefixUTF8=t.prefixUTF8,n.prefixComplete=t.prefixComplete,n.prefixRune=t.prefixRune,n}static compile(e){return In.compileImpl(e,_t.PERL,!1)}static compilePOSIX(e){return In.compileImpl(e,_t.POSIX,!0)}static compileImpl(e,t,n){let r=vn.parse(e,t);const s=r.maxCap();r=Kt.simplify(r);const i=zt.compileRegexp(r),a=new In(e,i,s,n),[o,u]=i.prefix();return a.prefixComplete=o,a.prefix=u,a.prefixUTF8=bt.stringToUtf8ByteArray(a.prefix),a.prefix.length>0&&(a.prefixRune=a.prefix.codePointAt(0)),a.namedGroups=r.namedGroups,a}static match(e,t){return In.compile(e).match(t)}constructor(e,t,n=0,r=0){this.expr=e,this.prog=t,this.numSubexp=n,this.longest=r,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.pooled=new bn}numberOfCapturingGroups(){return this.numSubexp}get(){let e;do{e=this.pooled.get()}while(e&&!this.pooled.compareAndSet(e,e.next));return e}reset(){this.pooled.set(null)}put(e,t){let n=this.pooled.get();do{n=this.pooled.get(),!t&&n&&(e=Tn.fromMachine(e),t=!0),e.next!==n&&(e.next=n)}while(!this.pooled.compareAndSet(n,e))}toString(){return this.expr}doExecute(e,t,n,r){let s=this.get(),i=!1;s?null!==s.next&&(s=Tn.fromMachine(s),i=!0):(s=Tn.fromRE2(this),i=!0),s.init(r);const a=s.match(e,t,n)?s.submatches():null;return this.put(s,i),a}match(e){return null!==this.doExecute(Ft.fromUTF16(e),0,_t.UNANCHORED,0)}matchWithGroup(e,t,n,r,s){return e instanceof At||(e=Rt.utf16(e)),this.matchMachineInput(e,t,n,r,s)}matchMachineInput(e,t,n,r,s){if(t>n)return[!1,null];const i=e.isUTF16Encoding()?Ft.fromUTF16(e.asCharSequence(),0,n):Ft.fromUTF8(e.asBytes(),0,n),a=this.doExecute(i,t,r,2*s);return null===a?[!1,null]:[!0,a]}matchUTF8(e){return null!==this.doExecute(Ft.fromUTF8(e),0,_t.UNANCHORED,0)}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,n){let r=0,s=0,i="";const a=Ft.fromUTF16(e);let o=0;for(;s<=e.length;){const u=this.doExecute(a,s,_t.UNANCHORED,2);if(null===u||0===u.length)break;i+=e.substring(r,u[0]),(u[1]>r||0===u[0])&&(i+=t(e.substring(u[0],u[1])),o++),r=u[1];const c=7&a.step(s);if(s+c>u[1]?s+=c:s+1>u[1]?s++:s=u[1],o>=n)break}return i+=e.substring(r),i}pad(e){if(null===e)return null;let t=2*(1+this.numSubexp);if(e.length<t){let n=new Array(t).fill(-1);for(let t=0;t<e.length;t++)n[t]=e[t];e=n}return e}allMatches(e,t,n=e=>e){let r=[];const s=e.endPos();t<0&&(t=s+1);let i=0,a=0,o=-1;for(;a<t&&i<=s;){const t=this.doExecute(e,i,_t.UNANCHORED,this.prog.numCap);if(null===t||0===t.length)break;let u=!0;if(t[1]===i){t[0]===o&&(u=!1);const n=e.step(i);n<0?i=s+1:i+=7&n}else i=t[1];o=t[1],u&&(r.push(n(this.pad(t))),a++)}return r}findUTF8(e){const t=this.doExecute(Ft.fromUTF8(e),0,_t.UNANCHORED,2);return null===t?null:e.slice(t[0],t[1])}findUTF8Index(e){const t=this.doExecute(Ft.fromUTF8(e),0,_t.UNANCHORED,2);return null===t?null:t.slice(0,2)}find(e){const t=this.doExecute(Ft.fromUTF16(e),0,_t.UNANCHORED,2);return null===t?"":e.substring(t[0],t[1])}findIndex(e){return this.doExecute(Ft.fromUTF16(e),0,_t.UNANCHORED,2)}findUTF8Submatch(e){const t=this.doExecute(Ft.fromUTF8(e),0,_t.UNANCHORED,this.prog.numCap);if(null===t)return null;const n=new Array(1+this.numSubexp).fill(null);for(let r=0;r<n.length;r++)2*r<t.length&&t[2*r]>=0&&(n[r]=e.slice(t[2*r],t[2*r+1]));return n}findUTF8SubmatchIndex(e){return this.pad(this.doExecute(Ft.fromUTF8(e),0,_t.UNANCHORED,this.prog.numCap))}findSubmatch(e){const t=this.doExecute(Ft.fromUTF16(e),0,_t.UNANCHORED,this.prog.numCap);if(null===t)return null;const n=new Array(1+this.numSubexp).fill(null);for(let r=0;r<n.length;r++)2*r<t.length&&t[2*r]>=0&&(n[r]=e.substring(t[2*r],t[2*r+1]));return n}findSubmatchIndex(e){return this.pad(this.doExecute(Ft.fromUTF16(e),0,_t.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){const n=this.allMatches(Ft.fromUTF8(e),t,t=>e.slice(t[0],t[1]));return 0===n.length?null:n}findAllUTF8Index(e,t){const n=this.allMatches(Ft.fromUTF8(e),t,e=>e.slice(0,2));return 0===n.length?null:n}findAll(e,t){const n=this.allMatches(Ft.fromUTF16(e),t,t=>e.substring(t[0],t[1]));return 0===n.length?null:n}findAllIndex(e,t){const n=this.allMatches(Ft.fromUTF16(e),t,e=>e.slice(0,2));return 0===n.length?null:n}findAllUTF8Submatch(e,t){const n=this.allMatches(Ft.fromUTF8(e),t,t=>{let n=new Array(t.length/2|0).fill(null);for(let r=0;r<n.length;r++)t[2*r]>=0&&(n[r]=e.slice(t[2*r],t[2*r+1]));return n});return 0===n.length?null:n}findAllUTF8SubmatchIndex(e,t){const n=this.allMatches(Ft.fromUTF8(e),t);return 0===n.length?null:n}findAllSubmatch(e,t){const n=this.allMatches(Ft.fromUTF16(e),t,t=>{let n=new Array(t.length/2|0).fill(null);for(let r=0;r<n.length;r++)t[2*r]>=0&&(n[r]=e.substring(t[2*r],t[2*r+1]));return n});return 0===n.length?null:n}findAllSubmatchIndex(e,t){const n=this.allMatches(Ft.fromUTF16(e),t);return 0===n.length?null:n}}const Cn=class e{static quote(e){return bt.quoteMeta(e)}static compile(t,n=0){let r=t;if(0!==(n&e.CASE_INSENSITIVE)&&(r=`(?i)${r}`),0!==(n&e.DOTALL)&&(r=`(?s)${r}`),0!==(n&e.MULTILINE)&&(r=`(?m)${r}`),-32&n)throw new Pt("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH");let s=_t.PERL;0!==(n&e.DISABLE_UNICODE_GROUPS)&&(s&=-129);const i=new e(t,n);return i.re2Input=In.compileImpl(r,s,0!==(n&e.LONGEST_MATCH)),i}static matches(t,n){return e.compile(t).matcher(n).matches()}static initTest(t,n,r){if(null==t)throw new Error("pattern is null");if(null==r)throw new Error("re2 is null");const s=new e(t,n);return s.re2Input=r,s}constructor(e,t){this.patternInput=e,this.flagsInput=t}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.matcher(e).matches()}matcher(e){return Array.isArray(e)&&(e=Rt.utf8(e)),new xt(this,e)}split(e,t=0){const n=this.matcher(e),r=[];let s=0,i=0;for(;n.find();)if(0!==i||0!==n.end()){if(t>0&&r.length===t-1)break;if(i===n.start()){if(0===t){s+=1,i=n.end();continue}}else for(;s>0;)r.push(""),s-=1;r.push(n.substring(i,n.start())),i=n.end()}else i=n.end();if(0===t&&i!==n.inputLength()){for(;s>0;)r.push(""),s-=1;r.push(n.substring(i,n.inputLength()))}return 0===t&&0!==r.length||r.push(n.substring(i,n.inputLength())),r}toString(){return this.patternInput}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e||null!==e&&this.constructor===e.constructor&&(this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput)}};t(Cn,"CASE_INSENSITIVE",1),t(Cn,"DOTALL",2),t(Cn,"MULTILINE",4),t(Cn,"DISABLE_UNICODE_GROUPS",8),t(Cn,"LONGEST_MATCH",16);let An=Cn;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Sn.UNAUTHENTICATED=new Sn(null),Sn.GOOGLE_CREDENTIALS=new Sn("google-credentials-uid"),Sn.FIRST_PARTY=new Sn("first-party-uid"),Sn.MOCK_USER=new Sn("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Nn="12.15.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Rn=new $("@firebase/firestore");function On(){return Rn.logLevel}function kn(e,...t){if(Rn.logLevel<=x.DEBUG){const n=t.map(Pn);Rn.debug(`Firestore (${Nn}): ${e}`,...n)}}function Dn(e,...t){if(Rn.logLevel<=x.ERROR){const n=t.map(Pn);Rn.error(`Firestore (${Nn}): ${e}`,...n)}}function Ln(e,...t){if(Rn.logLevel<=x.WARN){const n=t.map(Pn);Rn.warn(`Firestore (${Nn}): ${e}`,...n)}}function Pn(e){if("string"==typeof e)return e;try{return t=e,JSON.stringify(t)}catch(n){return e}var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xn(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,Mn(e,r,n)}function Mn(e,t,n){let r=`FIRESTORE (${Nn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(s){r+=" CONTEXT: "+n}throw Dn(r),new Error(r)}function Un(e,t,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,e||Mn(t,s,r)}function Vn(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Bn extends _{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class jn{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Sn.UNAUTHENTICATED))}shutdown(){}}class Hn{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Gn{constructor(e){this.t=e,this.currentUser=Sn.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Un(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let s=new $n;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new $n,e.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},a=e=>{kn("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?a(e):(kn("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new $n)}},0),i()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(kn("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(Un("string"==typeof t.accessToken,31837,{l:t}),new qn(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Un(null===e||"string"==typeof e,2055,{h:e}),new Sn(e)}}class zn{constructor(e,t,n){this.T=e,this.P=t,this.R=n,this.type="FirstParty",this.user=Sn.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const e=this.A();return e&&this.I.set("Authorization",e),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class Kn{constructor(e,t,n){this.T=e,this.P=t,this.R=n}getToken(){return Promise.resolve(new zn(this.T,this.P,this.R))}start(e,t){e.enqueueRetryable(()=>t(Sn.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Wn{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Yn{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,qe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Un(void 0===this.o,3512);const n=e=>{null!=e.error&&kn("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,kn("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{kn("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):kn("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Wn(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(Un("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new Wn(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=Qn(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function Jn(e,t){return e<t?-1:e>t?1:0}function Zn(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),s=t.charAt(r);if(n!==s)return nr(n)===nr(s)?Jn(n,s):nr(n)?1:-1}return Jn(e.length,t.length)}const er=55296,tr=57343;function nr(e){const t=e.charCodeAt(0);return t>=er&&t<=tr}function rr(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr="__name__";class ir{constructor(e,t,n){void 0===t?t=0:t>e.length&&xn(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&xn(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===ir.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ir?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=ir.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return Jn(e.length,t.length)}static compareSegments(e,t){const n=ir.isNumericId(e),r=ir.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?ir.extractNumericId(e).compare(ir.extractNumericId(t)):Zn(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return it.fromString(e.substring(4,e.length-2))}}class ar extends ir{construct(e,t,n){return new ar(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new Bn(Fn.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new ar(t)}static emptyPath(){return new ar([])}}const or=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ur extends ir{construct(e,t,n){return new ur(e,t,n)}static isValidIdentifier(e){return or.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ur.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===sr}static keyField(){return new ur([sr])}static fromServerFormat(e){const t=[];let n="",r=0;const s=()=>{if(0===n.length)throw new Bn(Fn.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let i=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new Bn(Fn.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new Bn(Fn.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(i=!i,r++):"."!==t||i?(n+=t,r++):(s(),r++)}if(s(),i)throw new Bn(Fn.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ur(t)}static emptyPath(){return new ur([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(e){this.path=e}static fromPath(e){return new cr(ar.fromString(e))}static fromName(e){return new cr(ar.fromString(e).popFirst(5))}static empty(){return new cr(ar.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===ar.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return ar.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new cr(new ar(e.slice()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lr(e,t,n){if(!n)throw new Bn(Fn.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function hr(e){if(!cr.isDocumentKey(e))throw new Bn(Fn.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function dr(e){if(cr.isDocumentKey(e))throw new Bn(Fn.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function pr(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function fr(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var t;return"function"==typeof e?"a function":xn(12329,{type:typeof e})}function gr(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new Bn(Fn.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=fr(e);throw new Bn(Fn.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mr(e,t){const n={typeString:e};return t&&(n.value=t),n}function yr(e,t){if(!pr(e))throw new Bn(Fn.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const a=e[r];if(s&&typeof a!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(void 0!==i&&a!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new Bn(Fn.INVALID_ARGUMENT,n);return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _r=-62135596800,vr=1e6;class wr{static now(){return wr.fromMillis(Date.now())}static fromDate(e){return wr.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*vr);return new wr(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Bn(Fn.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Bn(Fn.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<_r)throw new Bn(Fn.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Bn(Fn.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/vr}_compareTo(e){return this.seconds===e.seconds?Jn(this.nanoseconds,e.nanoseconds):Jn(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:wr._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(yr(e,wr._jsonSchema))return new wr(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-_r;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}wr._jsonSchemaVersion="firestore/timestamp/1.0",wr._jsonSchema={type:mr("string",wr._jsonSchemaVersion),seconds:mr("number"),nanoseconds:mr("number")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Er{static fromTimestamp(e){return new Er(e)}static min(){return new Er(new wr(0,0))}static max(){return new Er(new wr(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tr(e){return new br(e.readTime,e.key,-1)}class br{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new br(Er.min(),cr.empty(),-1)}static max(){return new br(Er.max(),cr.empty(),-1)}}function Ir(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=cr.comparator(e.documentKey,t.documentKey),0!==n?n:Jn(e.largestBatchId,t.largestBatchId)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}class Cr{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ar(e){if(e.code!==Fn.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;kn("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&xn(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new Sr((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof Sr?t:Sr.resolve(t)}catch(t){return Sr.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):Sr.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):Sr.reject(t)}static resolve(e){return new Sr((t,n)=>{t(e)})}static reject(e){return new Sr((t,n)=>{n(e)})}static waitFor(e){return new Sr((t,n)=>{let r=0,s=0,i=!1;e.forEach(e=>{++r,e.next(()=>{++s,i&&s===r&&t()},e=>n(e))}),i=!0,s===r&&t()})}static or(e){let t=Sr.resolve(!1);for(const n of e)t=t.next(e=>e?Sr.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new Sr((n,r)=>{const s=e.length,i=new Array(s);let a=0;for(let o=0;o<s;o++){const u=o;t(e[u]).next(e=>{i[u]=e,++a,a===s&&n(i)},e=>r(e))}})}static doWhile(e,t){return new Sr((n,r)=>{const s=()=>{!0===e()?t().next(()=>{s()},r):n()};s()})}}function Nr(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Rr.ce=-1;function Or(e){return null==e}function kr(e){return 0===e&&1/e==-1/0}function Dr(e,t){let n=t;const r=e.length;for(let s=0;s<r;s++){const t=e.charAt(s);switch(t){case"\0":n+="";break;case"":n+="";break;default:n+=t}}return n}function Lr(e){return e+""}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t){this.comparator=e,this.root=t||Mr.EMPTY}insert(e,t){return new Pr(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Mr.BLACK,null,null))}remove(e){return new Pr(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Mr.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new xr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new xr(this.root,e,this.comparator,!1)}getReverseIterator(){return new xr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new xr(this.root,e,this.comparator,!0)}}class xr{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Mr{constructor(e,t,n,r,s){this.key=e,this.value=t,this.color=null!=n?n:Mr.RED,this.left=null!=r?r:Mr.EMPTY,this.right=null!=s?s:Mr.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,s){return new Mr(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const s=n(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===s?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Mr.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return Mr.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Mr.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Mr.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw xn(43730,{key:this.key,value:this.value});if(this.right.isRed())throw xn(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw xn(27949);return e+(this.isRed()?0:1)}}Mr.EMPTY=null,Mr.RED=!0,Mr.BLACK=!1,Mr.EMPTY=new class{constructor(){this.size=0}get key(){throw xn(57766)}get value(){throw xn(16141)}get color(){throw xn(16727)}get left(){throw xn(29726)}get right(){throw xn(36894)}copy(e,t,n,r,s){return this}insert(e,t,n){return new Mr(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ur{constructor(e){this.comparator=e,this.data=new Pr(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Vr(this.data.getIterator())}getIteratorFrom(e){return new Vr(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof Ur))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ur(this.comparator);return t.data=e,t}}class Vr{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e){this.fields=e,e.sort(ur.comparator)}static empty(){return new Fr([])}unionWith(e){let t=new Ur(ur.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Fr(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return rr(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function $r(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function qr(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(t){throw"undefined"!=typeof DOMException&&t instanceof DOMException?new jr("Invalid base64 string: "+t):t}}(e);return new Hr(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new Hr(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Jn(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Hr.EMPTY_BYTE_STRING=new Hr("");const Gr=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function zr(e){if(Un(!!e,39018),"string"==typeof e){let t=0;const n=Gr.exec(e);if(Un(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Kr(e.seconds),nanos:Kr(e.nanos)}}function Kr(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Wr(e){return"string"==typeof e?Hr.fromBase64String(e):Hr.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr="server_timestamp",Qr="__type__",Xr="__previous_value__",Jr="__local_write_time__";function Zr(e){var t,n;return(null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[Qr])?void 0:n.stringValue)===Yr}function es(e){const t=e.mapValue.fields[Xr];return Zr(t)?es(t):t}function ts(e){const t=zr(e.mapValue.fields[Jr].timestampValue);return new wr(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t,n,r,s,i,a,o,u,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=a,this.longPollingOptions=o,this.useFetchStreams=u,this.isUsingEmulator=c,this.apiKey=l}}const rs="(default)";class ss{constructor(e,t){this.projectId=e,this.database=t||rs}static empty(){return new ss("","")}get isDefaultDatabase(){return this.database===rs}isEqual(e){return e instanceof ss&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const is="__type__",as="__max__",os={},us="__vector__",cs="value",ls={nullValue:"NULL_VALUE"},hs={booleanValue:!0},ds={booleanValue:!1};function ps(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?Zr(e)?4:function(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===as}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)?9007199254740991:Os(e)?10:11:xn(28295,{value:e})}function fs(e,t,n){if(e===t)return!0;const r=ps(e);if(r!==ps(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return ts(e).isEqual(ts(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=zr(e.timestampValue),r=zr(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return s=t,Wr(e.bytesValue).isEqual(Wr(s.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Kr(e.geoPointValue.latitude)===Kr(t.geoPointValue.latitude)&&Kr(e.geoPointValue.longitude)===Kr(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t,n){if("integerValue"in e&&"integerValue"in t)return Kr(e.integerValue)===Kr(t.integerValue);let r,s;if("doubleValue"in e&&"doubleValue"in t)r=Kr(e.doubleValue),s=Kr(t.doubleValue);else{if(!(null==n?void 0:n.Ee))return!1;r=Kr(e.integerValue??e.doubleValue),s=Kr(t.integerValue??t.doubleValue)}return r===s?!!(null==n?void 0:n.he)||kr(r)===kr(s):!(void 0!==n&&!n.Te)&&isNaN(r)&&isNaN(s)}(e,t,n);case 9:return rr(e.arrayValue.values||[],t.arrayValue.values||[],(e,t)=>fs(e,t,n));case 10:case 11:return function(e,t,n){const r=e.mapValue.fields||{},s=t.mapValue.fields||{};if(Br(r)!==Br(s))return!1;for(const i in r)if(r.hasOwnProperty(i)&&(void 0===s[i]||!fs(r[i],s[i],n)))return!1;return!0}(e,t,n);default:return xn(52216,{left:e})}var s}function gs(e,t){return void 0!==(e.values||[]).find(e=>fs(e,t))}function ms(e,t){if(e===t)return 0;const n=ps(e),r=ps(t);if(n!==r)return Jn(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Jn(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Kr(e.integerValue||e.doubleValue),r=Kr(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return ys(e.timestampValue,t.timestampValue);case 4:return ys(ts(e),ts(t));case 5:return Zn(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Wr(e),r=Wr(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let s=0;s<n.length&&s<r.length;s++){const e=Jn(n[s],r[s]);if(0!==e)return e}return Jn(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=Jn(Kr(e.latitude),Kr(t.latitude));return 0!==n?n:Jn(Kr(e.longitude),Kr(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return _s(e.arrayValue,t.arrayValue);case 10:return function(e,t){var n,r,s,i;const a=e.fields||{},o=t.fields||{},u=null==(n=a[cs])?void 0:n.arrayValue,c=null==(r=o[cs])?void 0:r.arrayValue,l=Jn((null==(s=null==u?void 0:u.values)?void 0:s.length)||0,(null==(i=null==c?void 0:c.values)?void 0:i.length)||0);return 0!==l?l:_s(u,c)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===os&&t===os)return 0;if(e===os)return 1;if(t===os)return-1;const n=e.fields||{},r=Object.keys(n),s=t.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let a=0;a<r.length&&a<i.length;++a){const e=Zn(r[a],i[a]);if(0!==e)return e;const t=ms(n[r[a]],s[i[a]]);if(0!==t)return t}return Jn(r.length,i.length)}(e.mapValue,t.mapValue);default:throw xn(23264,{Pe:n})}}function ys(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return Jn(e,t);const n=zr(e),r=zr(t),s=Jn(n.seconds,r.seconds);return 0!==s?s:Jn(n.nanos,r.nanos)}function _s(e,t){const n=e.values||[],r=t.values||[];for(let s=0;s<n.length&&s<r.length;++s){const e=ms(n[s],r[s]);if(void 0!==e&&0!==e)return e}return Jn(n.length,r.length)}function vs(e){return ws(e)}function ws(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=zr(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?Wr(e.bytesValue).toBase64():"referenceValue"in e?function(e){return cr.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=ws(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const s of t)r?r=!1:n+=",",n+=`${s}:${ws(e.fields[s])}`;return n+"}"}(e.mapValue):xn(61005,{value:e})}function Es(e){switch(ps(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=es(e);return t?16+Es(t):16;case 5:return 2*e.stringValue.length;case 6:return Wr(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return(e.arrayValue.values||[]).reduce((e,t)=>e+Es(t),0);case 10:case 11:return function(e){let t=0;return $r(e.fields,(e,n)=>{t+=e.length+Es(n)}),t}(e.mapValue);default:throw xn(13486,{value:e})}}function Ts(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function bs(e){return!!e&&"integerValue"in e}function Is(e){return!!e&&"doubleValue"in e}function Cs(e){return bs(e)||Is(e)}function As(e){return!!e&&"arrayValue"in e}function Ss(e){return!!e&&"nullValue"in e}function Ns(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Rs(e){return!!e&&"mapValue"in e}function Os(e){var t,n;return(null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[is])?void 0:n.stringValue)===us}function ks(e){var t,n;return null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[cs])?void 0:n.arrayValue}function Ds(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return $r(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=Ds(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=Ds(e.arrayValue.values[n]);return t}return{...e}}class Ls{constructor(e){this.value=e}static empty(){return new Ls({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Rs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ds(t)}setAll(e){let t=ur.emptyPath(),n={},r=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=s.popLast()}e?n[s.lastSegment()]=Ds(e):r.push(s.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,r)}delete(e){const t=this.field(e.popLast());Rs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return fs(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];Rs(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){$r(t,(t,n)=>e[t]=n);for(const r of n)delete e[r]}clone(){return new Ls(Ds(this.value))}}function Ps(e){const t=[];return $r(e.fields,(e,n)=>{const r=new ur([e]);if(Rs(n)){const e=Ps(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new Fr(t)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}function xs(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:kr(t)?"-0":t}}function Ms(e){return{integerValue:""+e}}function Us(e,t,n){return Number.isInteger(t)&&(null==n?void 0:n.preferIntegers)||function(e){return"number"==typeof e&&Number.isInteger(e)&&!kr(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}(t)?Ms(t):xs(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(){this._=void 0}}function Fs(e,t,n){return e instanceof qs?function(e,t){const n={fields:{[Qr]:{stringValue:Yr},[Jr]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&Zr(t)&&(t=es(t)),t&&(n.fields[Xr]=t),{mapValue:n}}(n,t):e instanceof js?Hs(e,t):e instanceof Gs?zs(e,t):e instanceof Ws?function(e,t){const n=$s(e,t),r=Js(n)+Js(e.Re);return bs(n)&&bs(e.Re)?Ms(r):xs(e.serializer,r)}(e,t):e instanceof Ys?Xs(e,t,Math.min):e instanceof Qs?function(e,t){return Xs(e,t,Math.max)}(e,t):void 0}function Bs(e,t,n){return e instanceof js?Hs(e,t):e instanceof Gs?zs(e,t):n}function $s(e,t){return e instanceof Ws?Cs(t)?t:{integerValue:0}:null}class qs extends Vs{}class js extends Vs{constructor(e){super(),this.elements=e}}function Hs(e,t){const n=Zs(t);for(const r of e.elements)n.some(e=>fs(e,r))||n.push(r);return{arrayValue:{values:n}}}class Gs extends Vs{constructor(e){super(),this.elements=e}}function zs(e,t){let n=Zs(t);for(const r of e.elements)n=n.filter(e=>!fs(e,r));return{arrayValue:{values:n}}}class Ks extends Vs{constructor(e,t){super(),this.serializer=e,this.Re=t}}class Ws extends Ks{}class Ys extends Ks{}class Qs extends Ks{}function Xs(e,t,n){if(!Cs(t))return e.Re;const r=n(Js(t),Js(e.Re));return bs(t)&&bs(e.Re)?Ms(r):xs(e.serializer,r)}function Js(e){return Kr(e.integerValue||e.doubleValue)}function Zs(e){return As(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e,t){this.field=e,this.transform=t}}class ti{constructor(e,t){this.version=e,this.transformResults=t}}class ni{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ni}static exists(e){return new ni(void 0,e)}static updateTime(e){return new ni(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ri(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class si{}function ii(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new gi(e.key,ni.none()):new li(e.key,e.data,ni.none());{const n=e.data,r=Ls.empty();let s=new Ur(ur.comparator);for(let e of t.fields)if(!s.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),s=s.add(e)}return new hi(e.key,r,new Fr(s.toArray()),ni.none())}}function ai(e,t,n){var r;e instanceof li?function(e,t,n){const r=e.value.clone(),s=pi(e.fieldTransforms,t,n.transformResults);r.setAll(s),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof hi?function(e,t,n){if(!ri(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=pi(e.fieldTransforms,t,n.transformResults),s=t.data;s.setAll(di(e)),s.setAll(r),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):(r=n,t.convertToNoDocument(r.version).setHasCommittedMutations())}function oi(e,t,n,r){return e instanceof li?function(e,t,n,r){if(!ri(e.precondition,t))return n;const s=e.value.clone(),i=fi(e.fieldTransforms,r,t);return s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null}(e,t,n,r):e instanceof hi?function(e,t,n,r){if(!ri(e.precondition,t))return n;const s=fi(e.fieldTransforms,r,t),i=t.data;return i.setAll(di(e)),i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):(s=t,i=n,ri(e.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):i);var s,i}function ui(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),s=$s(r.transform,e||null);null!=s&&(null===n&&(n=Ls.empty()),n.set(r.field,s))}return n||null}function ci(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&rr(n,r,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof js&&r instanceof js||n instanceof Gs&&r instanceof Gs?rr(n.elements,r.elements,fs):n instanceof Ws&&r instanceof Ws||n instanceof Ys&&r instanceof Ys||n instanceof Qs&&r instanceof Qs?fs(n.Re,r.Re):n instanceof qs&&r instanceof qs);var n,r}(e,t)))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask)));var n,r}class li extends si{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class hi extends si{constructor(e,t,n,r,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function di(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function pi(e,t,n){const r=new Map;Un(e.length===n.length,32656,{Ie:n.length,Ae:e.length});for(let s=0;s<n.length;s++){const i=e[s],a=i.transform,o=t.data.field(i.field);r.set(i.field,Bs(a,o,n[s]))}return r}function fi(e,t,n){const r=new Map;for(const s of e){const e=s.transform,i=n.data.field(s.field);r.set(s.field,Fs(e,i,t))}return r}class gi extends si{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class mi extends si{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(e,t){this.position=e,this.inclusive=t}}function _i(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],a=e.position[s];if(r=i.field.isKeyField()?cr.comparator(cr.fromName(a.referenceValue),n.key):ms(a,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function vi(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!fs(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{}class Ei extends wi{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new Ni(e,t,n):"array-contains"===t?new Di(e,n):"in"===t?new Li(e,n):"not-in"===t?new Pi(e,n):"array-contains-any"===t?new xi(e,n):new Ei(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new Ri(e,n):new Oi(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(ms(t,this.value)):null!==t&&ps(this.value)===ps(t)&&this.matchesComparison(ms(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return xn(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ti extends wi{constructor(e,t){super(),this.filters=e,this.op=t,this.Ve=null}static create(e,t){return new Ti(e,t)}matches(e){return bi(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Ve||(this.Ve=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function bi(e){return"and"===e.op}function Ii(e){return function(e){for(const t of e.filters)if(t instanceof Ti)return!1;return!0}(e)&&bi(e)}function Ci(e){if(e instanceof Ei)return e.field.canonicalString()+e.op.toString()+vs(e.value);if(Ii(e))return e.filters.map(e=>Ci(e)).join(",");{const t=e.filters.map(e=>Ci(e)).join(",");return`${e.op}(${t})`}}function Ai(e,t){return e instanceof Ei?(n=e,(r=t)instanceof Ei&&n.op===r.op&&n.field.isEqual(r.field)&&fs(n.value,r.value)):e instanceof Ti?function(e,t){return t instanceof Ti&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&Ai(n,t.filters[r]),!0)}(e,t):void xn(19439);var n,r}function Si(e){return e instanceof Ei?`${(t=e).field.canonicalString()} ${t.op} ${vs(t.value)}`:e instanceof Ti?function(e){return e.op.toString()+" {"+e.getFilters().map(Si).join(" ,")+"}"}(e):"Filter";var t}class Ni extends Ei{constructor(e,t,n){super(e,t,n),this.key=cr.fromName(n.referenceValue)}matches(e){const t=cr.comparator(e.key,this.key);return this.matchesComparison(t)}}class Ri extends Ei{constructor(e,t){super(e,"in",t),this.keys=ki("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Oi extends Ei{constructor(e,t){super(e,"not-in",t),this.keys=ki("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function ki(e,t){var n;return((null==(n=t.arrayValue)?void 0:n.values)||[]).map(e=>cr.fromName(e.referenceValue))}class Di extends Ei{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return As(t)&&gs(t.arrayValue,this.value)}}class Li extends Ei{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&gs(this.value.arrayValue,t)}}class Pi extends Ei{constructor(e,t){super(e,"not-in",t)}matches(e){if(gs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!gs(this.value.arrayValue,t)}}class xi extends Ei{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!As(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>gs(this.value.arrayValue,e))}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ui(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,t,n,r,s,i,a){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=a}static newInvalidDocument(e){return new Vi(e,0,Er.min(),Er.min(),Er.min(),Ls.empty(),0)}static newFoundDocument(e,t,n,r){return new Vi(e,1,t,Er.min(),n,r,0)}static newNoDocument(e,t){return new Vi(e,2,t,Er.min(),Er.min(),Ls.empty(),0)}static newUnknownDocument(e,t){return new Vi(e,3,t,Er.min(),Er.min(),Ls.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Er.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ls.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ls.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Er.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof Vi&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Vi(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e,t=null,n=[],r=[],s=null,i=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=a,this.de=null}}function Bi(e,t=null,n=[],r=[],s=null,i=null,a=null){return new Fi(e,t,n,r,s,i,a)}function $i(e){const t=Vn(e);if(null===t.de){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>Ci(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>{return(t=e).field.canonicalString()+t.dir;var t}).join(","),Or(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>vs(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>vs(e)).join(",")),t.de=e}return t.de}function qi(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Ui(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!Ai(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!vi(e.startAt,t.startAt)&&vi(e.endAt,t.endAt)}function ji(e){return!!e.isCorePipeline}function Hi(e){return!!e.path&&cr.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t=null,n=[],r=[],s=null,i="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=a,this.endAt=o,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function zi(e){return new Gi(e)}function Ki(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Wi(e){return null!==e.collectionGroup}function Yi(e){const t=Vn(e);if(null===t.fe){t.fe=[];const e=new Set;for(const r of t.explicitOrderBy)t.fe.push(r),e.add(r.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(e){let t=new Ur(ur.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t})(t).forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.fe.push(new Mi(r,n))}),e.has(ur.keyField().canonicalString())||t.fe.push(new Mi(ur.keyField(),n))}return t.fe}function Qi(e){const t=Vn(e);return t.me||(t.me=function(e,t){if("F"===e.limitType)return Bi(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new Mi(e.field,t)});const n=e.endAt?new yi(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new yi(e.startAt.position,e.startAt.inclusive):null;return Bi(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}(t,Yi(e))),t.me}function Xi(e,t){const n=e.filters.concat([t]);return new Gi(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Ji(e,t,n){return new Gi(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Zi(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>Si(e)).join(", ")}]`),Or(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>{return`${(t=e).field.canonicalString()} (${t.dir})`;var t}).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>vs(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>vs(e)).join(",")),`Target(${t})`}(Qi(e))}; limitType=${e.limitType})`}function ea(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):cr.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of Yi(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(r=t,!((n=e).startAt&&!function(e,t,n){const r=_i(e,t,n);return e.inclusive?r<=0:r<0}(n.startAt,Yi(n),r)||n.endAt&&!function(e,t,n){const r=_i(e,t,n);return e.inclusive?r>=0:r>0}(n.endAt,Yi(n),r)));var n,r}function ta(e){return(t,n)=>{let r=!1;for(const s of Yi(e)){const e=na(s,t,n);if(0!==e)return e;r=r||s.field.isKeyField()}return 0}}function na(e,t,n){const r=e.field.isKeyField()?cr.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),s=n.data.field(e);return null!==r&&null!==s?ms(r,s):xn(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return xn(19790,{direction:e.dir})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var sa,ia;function aa(e){if(void 0===e)return Dn("GRPC error has no .code"),Fn.UNKNOWN;switch(e){case sa.OK:return Fn.OK;case sa.CANCELLED:return Fn.CANCELLED;case sa.UNKNOWN:return Fn.UNKNOWN;case sa.DEADLINE_EXCEEDED:return Fn.DEADLINE_EXCEEDED;case sa.RESOURCE_EXHAUSTED:return Fn.RESOURCE_EXHAUSTED;case sa.INTERNAL:return Fn.INTERNAL;case sa.UNAVAILABLE:return Fn.UNAVAILABLE;case sa.UNAUTHENTICATED:return Fn.UNAUTHENTICATED;case sa.INVALID_ARGUMENT:return Fn.INVALID_ARGUMENT;case sa.NOT_FOUND:return Fn.NOT_FOUND;case sa.ALREADY_EXISTS:return Fn.ALREADY_EXISTS;case sa.PERMISSION_DENIED:return Fn.PERMISSION_DENIED;case sa.FAILED_PRECONDITION:return Fn.FAILED_PRECONDITION;case sa.ABORTED:return Fn.ABORTED;case sa.OUT_OF_RANGE:return Fn.OUT_OF_RANGE;case sa.UNIMPLEMENTED:return Fn.UNIMPLEMENTED;case sa.DATA_LOSS:return Fn.DATA_LOSS;default:return xn(39323,{code:e})}}(ia=sa||(sa={}))[ia.OK=0]="OK",ia[ia.CANCELLED=1]="CANCELLED",ia[ia.UNKNOWN=2]="UNKNOWN",ia[ia.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ia[ia.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ia[ia.NOT_FOUND=5]="NOT_FOUND",ia[ia.ALREADY_EXISTS=6]="ALREADY_EXISTS",ia[ia.PERMISSION_DENIED=7]="PERMISSION_DENIED",ia[ia.UNAUTHENTICATED=16]="UNAUTHENTICATED",ia[ia.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ia[ia.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ia[ia.ABORTED=10]="ABORTED",ia[ia.OUT_OF_RANGE=11]="OUT_OF_RANGE",ia[ia.UNIMPLEMENTED=12]="UNIMPLEMENTED",ia[ia.INTERNAL=13]="INTERNAL",ia[ia.UNAVAILABLE=14]="UNAVAILABLE",ia[ia.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class oa{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,s]of n)if(this.equalsFn(r,e))return s}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return void(r[s]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){$r(this.inner,(t,n)=>{for(const[r,s]of n)e(r,s)})}isEmpty(){return qr(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ua=new Pr(cr.comparator);function ca(){return ua}const la=new Pr(cr.comparator);function ha(...e){let t=la;for(const n of e)t=t.insert(n.key,n);return t}function da(e){let t=la;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function pa(){return ga()}function fa(){return ga()}function ga(){return new oa(e=>e.toString(),(e,t)=>e.isEqual(t))}const ma=new Pr(cr.comparator),ya=new Ur(cr.comparator);function _a(...e){let t=ya;for(const n of e)t=t.add(n);return t}const va=new Ur(Jn);
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const wa=new it([4294967295,4294967295],0);function Ea(e){const t=(new TextEncoder).encode(e),n=new at;return n.update(t),new Uint8Array(n.digest())}function Ta(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new it([n,r],0),new it([s,i],0)]}class ba{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Ia(`Invalid padding: ${t}`);if(n<0)throw new Ia(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new Ia(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new Ia(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.ye=it.fromNumber(this.ge)}we(e,t,n){let r=e.add(t.multiply(it.fromNumber(n)));return 1===r.compare(wa)&&(r=new it([r.getBits(0),r.getBits(1)],0)),r.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=Ea(e),[n,r]=Ta(t);for(let s=0;s<this.hashCount;s++){const e=this.we(n,r,s);if(!this.be(e))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),i=new ba(s,r,t);return n.forEach(e=>i.insert(e)),i}insert(e){if(0===this.ge)return;const t=Ea(e),[n,r]=Ta(t);for(let s=0;s<this.hashCount;s++){const e=this.we(n,r,s);this.ve(e)}}ve(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Ia extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e,t,n,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.augmentedDocumentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,Aa.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ca(Er.min(),r,new Pr(Jn),ca(),ca(),_a())}}class Aa{constructor(e,t,n,r,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Aa(n,t,_a(),_a(),_a())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,t,n,r){this.Se=e,this.removedTargetIds=t,this.key=n,this.De=r}}class Na{constructor(e,t){this.targetId=e,this.xe=t}}class Ra{constructor(e,t,n=Hr.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class Oa{constructor(e){this.targetId=e,this.Ce=0,this.Fe=Pa(),this.Oe=Hr.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return 0!==this.Ce}get Be(){return this.Ne}Ue(e){e.approximateByteSize()>0&&(this.Ne=!0,this.Oe=e)}ke(){let e=_a(),t=_a(),n=_a();return this.Fe.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:xn(38017,{changeType:s})}}),new Aa(this.Oe,this.Me,e,t,n)}qe(){this.Ne=!1,this.Fe=Pa()}$e(e,t){this.Ne=!0,this.Fe=this.Fe.insert(e,t)}Ke(e){this.Ne=!0,this.Fe=this.Fe.remove(e)}We(){this.Ce+=1}Qe(){this.Ce-=1,Un(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const ka="WatchChangeAggregator";class Da{constructor(e){this.ze=e,this.je=new Map,this.He=ca(),this.Je=La(),this.Ye=ca(),this.Ze=La(),this.Xe=new Pr(Jn)}et(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.tt(t,e.De):this.nt(t,e.key,e.De);for(const t of e.removedTargetIds)this.nt(t,e.key,e.De)}rt(e){this.forEachTarget(e,t=>{const n=this.je.get(t);if(n)switch(e.state){case 0:this.it(t)&&n.Ue(e.resumeToken);break;case 1:n.Qe(),n.Le||n.qe(),n.Ue(e.resumeToken);break;case 2:n.Qe(),n.Le||this.removeTarget(t);break;case 3:this.it(t)&&(n.Ge(),n.Ue(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),n.Ue(e.resumeToken));break;default:xn(56790,{state:e.state})}else kn(ka,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach((e,n)=>{this.it(n)&&t(n)})}_t(e){var t;return ji(e)?"documents"===e.getPipelineSourceType()&&1===(null==(t=e.getPipelineDocuments())?void 0:t.length):Hi(e)}ot(e){const t=e.targetId,n=e.xe.count,r=this.ut(t);if(r){const s=r.target;if(this._t(s))if(0===n){const e=new cr(ji(s)?ar.fromString(s.getPipelineDocuments()[0]):s.path);this.nt(t,e,Vi.newNoDocument(e,Er.min()))}else Un(1===n,20013,"Single document existence filter with count: "+n);else{const r=this.ct(t);if(r!==n){const n=this.lt(e),s=n?this.Et(n,e,r):1;if(0!==s){this.st(t);const e=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(t,e)}}}}}lt(e){const t=e.xe.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=t;let i,a;try{i=Wr(n).toUint8Array()}catch(o){if(o instanceof jr)return Ln("Decoding the base64 bloom filter in existence filter failed ("+o.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw o}try{a=new ba(i,r,s)}catch(o){return Ln(o instanceof Ia?"BloomFilter error: ":"Applying bloom filter failed: ",o),null}return 0===a.ge?null:a}Et(e,t,n){return t.xe.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.ze.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const s=this.ze.Tt(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;e.mightContain(i)||(this.nt(t,n,null),r++)}),r}Rt(e){const t=new Map;this.je.forEach((n,r)=>{const s=this.ut(r);if(s){if(n.current&&this._t(s.target)){const t=ji(s.target)?ar.fromString(s.target.getPipelineDocuments()[0]):s.target.path,n=new cr(t);this.It(n).has(r)||this.At(r,n)||this.nt(r,n,Vi.newNoDocument(n,e))}n.Be&&(t.set(r,n.ke()),n.qe())}});let n=_a();this.Ze.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ut(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.He.forEach((t,n)=>n.setReadTime(e)),this.Ye.forEach((t,n)=>n.setReadTime(e));const r=new Ca(e,t,this.Xe,this.He,this.Ye,n);return this.He=ca(),this.Je=La(),this.Ye=ca(),this.Ze=La(),this.Xe=new Pr(Jn),r}tt(e,t){const n=this.je.get(e);if(!n||!this.it(e))return void kn(ka,`addDocumentToTarget received document for unknown inactive target (${e})`);const r=this.At(e,t.key)?2:0;n.$e(t.key,r),ji(this.ut(e).target)&&"exact"!==this.ut(e).target.getPipelineFlavor()?this.Ye=this.Ye.insert(t.key,t):this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.Ze=this.Ze.insert(t.key,this.Vt(t.key).add(e))}nt(e,t,n){const r=this.je.get(e);r&&this.it(e)?(this.At(e,t)?r.$e(t,1):r.Ke(t),this.Ze=this.Ze.insert(t,this.Vt(t).delete(e)),this.Ze=this.Ze.insert(t,this.Vt(t).add(e)),n&&(ji(this.ut(e).target)&&"exact"!==this.ut(e).target.getPipelineFlavor()?this.Ye=this.Ye.insert(t,n):this.He=this.He.insert(t,n))):kn(ka,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.je.delete(e)}ct(e){const t=this.je.get(e);if(!t)return 0;const n=t.ke();return this.ze.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}We(e){let t=this.je.get(e);t||(kn(ka,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Oa(e),this.je.set(e,t)),t.We()}Vt(e){let t=this.Ze.get(e);return t||(t=new Ur(Jn),this.Ze=this.Ze.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Ur(Jn),this.Je=this.Je.insert(e,t)),t}it(e){const t=null!==this.ut(e);return t||kn(ka,"Detected inactive target",e),t}ut(e){const t=this.je.get(e);return void 0===t||t.Le?null:this.ze.dt(e)}st(e){this.je.set(e,new Oa(e)),this.ze.getRemoteKeysForTarget(e).forEach(t=>{this.nt(e,t,null)})}At(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function La(){return new Pr(cr.comparator)}function Pa(){return new Pr(cr.comparator)}const xa=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Ma=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Ua=(()=>({and:"AND",or:"OR"}))();class Va{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Fa(e,t){return e.useProto3Json||Or(t)?t:{value:t}}function Ba(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function $a(e){const t=zr(e);return new wr(t.seconds,t.nanos)}function qa(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function ja(e,t){return Ba(e,t.toTimestamp())}function Ha(e){return Un(!!e,49232),Er.fromTimestamp($a(e))}function Ga(e,t){return za(e,t).canonicalString()}function za(e,t){const n=(r=e,new ar(["projects",r.projectId,"databases",r.database])).child("documents");var r;return void 0===t?n:n.child(t)}function Ka(e){const t=ar.fromString(e);return Un(po(t),10190,{key:t.toString()}),t}function Wa(e,t){return Ga(e.databaseId,t.path)}function Ya(e,t){const n=Ka(t);if(n.get(1)!==e.databaseId.projectId)throw new Bn(Fn.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new Bn(Fn.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new cr(Ja(n))}function Qa(e,t){return Ga(e.databaseId,t)}function Xa(e){return new ar(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Ja(e){return Un(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function Za(e,t,n){return{name:Wa(e,t),fields:n.value.mapValue.fields}}function eo(e,t){return{documents:[Qa(e,t.path)]}}function to(e,t){const n={structuredQuery:{}},r=t.path;let s;null!==t.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Qa(e,s);const i=function(e){if(0!==e.length)return lo(Ti.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const a=function(e){if(0!==e.length)return e.map(e=>{return{field:uo((t=e).field),direction:io(t.dir)};var t})}(t.orderBy);a&&(n.structuredQuery.orderBy=a);const o=Fa(e,t.limit);return null!==o&&(n.structuredQuery.limit=o),t.startAt&&(n.structuredQuery.startAt={before:(u=t.startAt).inclusive,values:u.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{yt:n,parent:s};var u}function no(e){let t=function(e){const t=Ka(e);return 4===t.length?ar.emptyPath():Ja(t)}(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Un(1===r,65062);const e=n.from[0];e.allDescendants?s=e.collectionId:t=t.child(e.collectionId)}let i=[];n.where&&(i=function(e){const t=so(e);return t instanceof Ti&&Ii(t)?t.getFilters():[t]}(n.where));let a=[];n.orderBy&&(a=n.orderBy.map(e=>{return new Mi(co((t=e).field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction));var t}));let o=null;n.limit&&(o=function(e){let t;return t="object"==typeof e?e.value:e,Or(t)?null:t}(n.limit));let u=null;n.startAt&&(u=function(e){const t=!!e.before,n=e.values||[];return new yi(n,t)}(n.startAt));let c=null;return n.endAt&&(c=function(e){const t=!e.before,n=e.values||[];return new yi(n,t)}(n.endAt)),function(e,t,n,r,s,i,a,o){return new Gi(e,t,n,r,s,i,a,o)}(t,s,a,i,o,"F",u,c)}function ro(e,t){return{structuredPipeline:{pipeline:{stages:t.stages.map(t=>t._toProto(e))}}}}function so(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=co(e.unaryFilter.field);return Ei.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=co(e.unaryFilter.field);return Ei.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=co(e.unaryFilter.field);return Ei.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=co(e.unaryFilter.field);return Ei.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return xn(61313);default:return xn(60726)}}(e):void 0!==e.fieldFilter?(t=e,Ei.create(co(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return xn(58110);default:return xn(50506)}}(t.fieldFilter.op),t.fieldFilter.value)):void 0!==e.compositeFilter?function(e){return Ti.create(e.compositeFilter.filters.map(e=>so(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return xn(1026)}}(e.compositeFilter.op))}(e):xn(30097,{filter:e});var t}function io(e){return xa[e]}function ao(e){return Ma[e]}function oo(e){return Ua[e]}function uo(e){return{fieldPath:e.canonicalString()}}function co(e){return ur.fromServerFormat(e.fieldPath)}function lo(e){return e instanceof Ei?function(e){if("=="===e.op){if(Ns(e.value))return{unaryFilter:{field:uo(e.field),op:"IS_NAN"}};if(Ss(e.value))return{unaryFilter:{field:uo(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Ns(e.value))return{unaryFilter:{field:uo(e.field),op:"IS_NOT_NAN"}};if(Ss(e.value))return{unaryFilter:{field:uo(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:uo(e.field),op:ao(e.op),value:e.value}}}(e):e instanceof Ti?function(e){const t=e.getFilters().map(e=>lo(e));return 1===t.length?t[0]:{compositeFilter:{op:oo(e.op),filters:t}}}(e):xn(54877,{filter:e})}function ho(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function po(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function fo(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}function go(e,t){const n={fields:{}};return t.forEach((t,r)=>{if("string"!=typeof r)throw new Error(`Cannot encode map with non-string key: ${r}`);n.fields[r]=t._toProto(e)}),{mapValue:n}}function mo(e){return{stringValue:e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yo(e){return new Va(e,!0)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(e){this._byteString=e}static fromBase64String(e){try{return new _o(Hr.fromBase64String(e))}catch(t){throw new Bn(Fn.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new _o(Hr.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:_o._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(yr(e,_o._jsonSchema))return _o.fromBase64String(e.bytes)}}_o._jsonSchemaVersion="firestore/bytes/1.0",_o._jsonSchema={type:mr("string",_o._jsonSchemaVersion),bytes:mr("string")};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vo{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new Bn(Fn.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ur(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wo{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Bn(Fn.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Bn(Fn.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Jn(this._lat,e._lat)||Jn(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Eo._jsonSchemaVersion}}static fromJSON(e){if(yr(e,Eo._jsonSchema))return new Eo(e.latitude,e.longitude)}}function To(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}Eo._jsonSchemaVersion="firestore/geoPoint/1.0",Eo._jsonSchema={type:mr("string",Eo._jsonSchemaVersion),latitude:mr("number"),longitude:mr("number")};class bo{bt(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io="ConnectivityMonitor";class Co{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(e){this.Ct.push(e)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){kn(Io,"Network connectivity changed: AVAILABLE");for(const e of this.Ct)e(0)}xt(){kn(Io,"Network connectivity changed: UNAVAILABLE");for(const e of this.Ct)e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ao=null;function So(){return null===Ao?Ao=268435456+Math.round(2147483648*Math.random()):Ao++,"0x"+Ao.toString(16)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const No="RestConnection",Ro={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Oo{get Ot(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Mt=t+"://"+e.host,this.Nt=`projects/${n}/databases/${r}`,this.Lt=this.databaseId.database===rs?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Bt(e,t,n,r,s){const i=So(),a=this.Ut(e,t.toUriEncodedString());kn(No,`Sending RPC '${e}' ${i}:`,a,n);const o={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(o,r,s);const{host:u}=new URL(a),c=R(u);return this.qt(e,a,o,n,c).then(t=>(kn(No,`Received RPC '${e}' ${i}: `,t),t),t=>{throw Ln(No,`RPC '${e}' ${i} failed with error: `,t,"url: ",a,"request:",n),t})}$t(e,t,n,r,s,i){return this.Bt(e,t,n,r,s)}kt(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+Nn,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}Ut(e,t){const n=Ro[e];let r=`${this.Mt}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e){this.Kt=e.Kt,this.Wt=e.Wt}Qt(e){this.Gt=e}zt(e){this.jt=e}Ht(e){this.Jt=e}onMessage(e){this.Yt=e}close(){this.Wt()}send(e){this.Kt(e)}Zt(){this.Gt()}Xt(){this.jt()}en(e){this.Jt(e)}tn(e){this.Yt(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do="WebChannelConnection",Lo=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(t){setTimeout(()=>{throw t},0)}})};class Po extends Oo{constructor(e){super(e),this.nn=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static rn(){if(!Po.sn){const e=ft();Lo(e,pt.STAT_EVENT,e=>{e.stat===dt.PROXY?kn(Do,"STAT_EVENT: detected buffering proxy"):e.stat===dt.NOPROXY&&kn(Do,"STAT_EVENT: detected no buffering proxy")}),Po.sn=!0}}qt(e,t,n,r,s){const i=So();return new Promise((s,a)=>{const o=new ut;o.setWithCredentials(!0),o.listenOnce(lt.COMPLETE,()=>{try{switch(o.getLastErrorCode()){case ht.NO_ERROR:const t=o.getResponseJson();kn(Do,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case ht.TIMEOUT:kn(Do,`RPC '${e}' ${i} timed out`),a(new Bn(Fn.DEADLINE_EXCEEDED,"Request time out"));break;case ht.HTTP_ERROR:const n=o.getStatus();if(kn(Do,`RPC '${e}' ${i} failed with status:`,n,"response text:",o.getResponseText()),n>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=null==e?void 0:e.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(Fn).indexOf(t)>=0?t:Fn.UNKNOWN}(t.status);a(new Bn(e,t.message))}else a(new Bn(Fn.UNKNOWN,"Server responded with status "+o.getStatus()))}else a(new Bn(Fn.UNAVAILABLE,"Connection failed."));break;default:xn(9055,{_n:e,streamId:i,an:o.getLastErrorCode(),un:o.getLastError()})}}finally{kn(Do,`RPC '${e}' ${i} completed.`)}});const u=JSON.stringify(r);kn(Do,`RPC '${e}' ${i} sending request:`,r),o.send(t,"POST",u,n,15)})}cn(e,t,n){const r=So(),s=[this.Mt,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=this.createWebChannelTransport(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},o=this.longPollingOptions.timeoutSeconds;void 0!==o&&(a.longPollingTimeout=Math.round(1e3*o)),this.useFetchStreams&&(a.useFetchStreams=!0),this.kt(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const u=s.join("");kn(Do,`Creating RPC '${e}' stream ${r}: ${u}`,a);const c=i.createWebChannel(u,a);this.En(c);let l=!1,h=!1;const d=new ko({Kt:t=>{h?kn(Do,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(l||(kn(Do,`Opening RPC '${e}' stream ${r} transport.`),c.open(),l=!0),kn(Do,`RPC '${e}' stream ${r} sending:`,t),c.send(t))},Wt:()=>c.close()});return Lo(c,ct.EventType.OPEN,()=>{h||(kn(Do,`RPC '${e}' stream ${r} transport opened.`),d.Zt())}),Lo(c,ct.EventType.CLOSE,()=>{h||(h=!0,kn(Do,`RPC '${e}' stream ${r} transport closed`),d.en(),this.hn(c))}),Lo(c,ct.EventType.ERROR,t=>{h||(h=!0,Ln(Do,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),d.en(new Bn(Fn.UNAVAILABLE,"The operation could not be completed")))}),Lo(c,ct.EventType.MESSAGE,t=>{var n;if(!h){const s=t.data[0];Un(!!s,16349);const i=s,a=(null==i?void 0:i.error)||(null==(n=i[0])?void 0:n.error);if(a){kn(Do,`RPC '${e}' stream ${r} received error:`,a);const t=a.status;let n=function(e){const t=sa[e];if(void 0!==t)return aa(t)}(t),s=a.message;"NOT_FOUND"===t&&s.includes("database")&&s.includes("does not exist")&&s.includes(this.databaseId.database)&&Ln(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),void 0===n&&(n=Fn.INTERNAL,s="Unknown error status: "+t+" with message "+a.message),h=!0,d.en(new Bn(n,s)),c.close()}else kn(Do,`RPC '${e}' stream ${r} received:`,s),d.tn(s)}}),Po.rn(),setTimeout(()=>{d.Xt()},0),d}terminate(){this.nn.forEach(e=>e.close()),this.nn=[]}En(e){this.nn.push(e)}hn(e){this.nn=this.nn.filter(t=>t===e)}kt(e,t,n){super.kt(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return gt()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Po.sn=!1;class xo{constructor(e,t,n=1e3,r=1.5,s=6e4){this.Tn=e,this.timerId=t,this.Pn=n,this.Rn=r,this.In=s,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(e){this.cancel();const t=Math.floor(this.An+this.pn()),n=Math.max(0,Date.now()-this.dn),r=Math.max(0,t-n);r>0&&kn("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.An} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,r,()=>(this.dn=Date.now(),e())),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){null!==this.Vn&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){null!==this.Vn&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo="PersistentStream";class Uo{constructor(e,t,n,r,s,i,a,o){this.Tn=e,this.yn=n,this.wn=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new xo(e,t)}Cn(){return 1===this.state||5===this.state||this.Fn()}Fn(){return 2===this.state||3===this.state}start(){this.Dn=0,4!==this.state?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&null===this.vn&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,()=>this.Ln()))}Bn(e){this.Un(),this.stream.send(e)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(e,t){this.Un(),this.kn(),this.xn.cancel(),this.bn++,4!==e?this.xn.reset():t&&t.code===Fn.RESOURCE_EXHAUSTED?(Dn(t.toString()),Dn("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):t&&t.code===Fn.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.qn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ht(t)}qn(){}auth(){this.state=1;const e=this.$n(this.bn),t=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.bn===t&&this.Kn(e,n)},t=>{e(()=>{const e=new Bn(Fn.UNKNOWN,"Fetching auth token failed: "+t.message);return this.Wn(e)})})}Kn(e,t){const n=this.$n(this.bn);this.stream=this.Qn(e,t),this.stream.Qt(()=>{n(()=>this.listener.Qt())}),this.stream.zt(()=>{n(()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,()=>(this.Fn()&&(this.state=3),Promise.resolve())),this.listener.zt()))}),this.stream.Ht(e=>{n(()=>this.Wn(e))}),this.stream.onMessage(e=>{n(()=>1==++this.Dn?this.Gn(e):this.onNext(e))})}On(){this.state=5,this.xn.mn(async()=>{this.state=0,this.start()})}Wn(e){return kn(Mo,`close with error: ${e}`),this.stream=null,this.close(4,e)}$n(e){return t=>{this.Tn.enqueueAndForget(()=>this.bn===e?t():(kn(Mo,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Vo extends Uo{constructor(e,t,n,r,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}Qn(e,t){return this.connection.cn("Listen",e,t)}Gn(e){return this.onNext(e)}onNext(e){this.xn.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const s="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:xn(39313,{state:r}),i=t.targetChange.targetIds||[],a=function(e,t){return e.useProto3Json?(Un(void 0===t||"string"==typeof t,58123),Hr.fromBase64String(t||"")):(Un(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),Hr.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,u=o&&function(e){const t=void 0===e.code?Fn.UNKNOWN:aa(e.code);return new Bn(t,e.message||"")}(o);n=new Ra(s,i,a,u||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ya(e,r.document.name),i=Ha(r.document.updateTime),a=r.document.createTime?Ha(r.document.createTime):Er.min(),o=new Ls({mapValue:{fields:r.document.fields}}),u=Vi.newFoundDocument(s,i,a,o),c=r.targetIds||[],l=r.removedTargetIds||[];n=new Sa(c,l,u.key,u)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Ya(e,r.document),i=r.readTime?Ha(r.readTime):Er.min(),a=Vi.newNoDocument(s,i),o=r.removedTargetIds||[];n=new Sa([],o,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Ya(e,r.document),i=r.removedTargetIds||[];n=new Sa([],i,s,null)}else{if(!("filter"in t))return xn(11601,{ft:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:s}=e,i=new ra(r,s),a=e.targetId;n=new Na(a,i)}}var r;return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return Er.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?Er.min():t.readTime?Ha(t.readTime):Er.min()}(e);return this.listener.zn(t,n)}jn(e){const t={};t.database=Xa(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=ji(r)?{pipelineQuery:ro(e,r)}:Hi(r)?{documents:eo(e,r)}:{query:to(e,r).yt},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=qa(e,t.resumeToken);const r=Fa(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(Er.min())>0){n.readTime=Ba(e,t.snapshotVersion.toTimestamp());const r=Fa(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return xn(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.Bn(t)}Hn(e){const t={};t.database=Xa(this.serializer),t.removeTarget=e,this.Bn(t)}}class Fo extends Uo{constructor(e,t,n,r,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(e,t){return this.connection.cn("Write",e,t)}Gn(e){return Un(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Un(!e.writeResults||0===e.writeResults.length,55816),this.listener.Zn()}onNext(e){Un(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.xn.reset();const t=function(e,t){return e&&e.length>0?(Un(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?Ha(e.updateTime):Ha(t);return n.isEqual(Er.min())&&(n=Ha(t)),new ti(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=Ha(e.commitTime);return this.listener.Xn(n,t)}er(){const e={};e.database=Xa(this.serializer),this.Bn(e)}Yn(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>function(e,t){let n;if(t instanceof li)n={update:Za(e,t.key,t.value)};else if(t instanceof gi)n={delete:Wa(e,t.key)};else if(t instanceof hi)n={update:Za(e,t.key,t.data),updateMask:ho(t.fieldMask)};else{if(!(t instanceof mi))return xn(16599,{gt:t.type});n={verify:Wa(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof qs)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof js)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Gs)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Ws)return{fieldPath:t.field.canonicalString(),increment:n.Re};if(n instanceof Ys)return{fieldPath:t.field.canonicalString(),minimum:n.Re};if(n instanceof Qs)return{fieldPath:t.field.canonicalString(),maximum:n.Re};throw xn(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=(r=e,void 0!==(s=t.precondition).updateTime?{updateTime:ja(r,s.updateTime)}:void 0!==s.exists?{exists:s.exists}:xn(27497))),n;var r,s}(this.serializer,e))};this.Bn(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{}class $o extends Bo{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.tr=!1}nr(){if(this.tr)throw new Bn(Fn.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(e,t,n,r){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Bt(e,za(t,n),r,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Fn.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Bn(Fn.UNKNOWN,e.toString())})}$t(e,t,n,r,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.$t(e,za(t,n),r,i,a,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Fn.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Bn(Fn.UNKNOWN,e.toString())})}terminate(){this.tr=!0,this.connection.terminate()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const qo=new Map;
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const jo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ho=41943040;class Go{static withCacheSize(e){return new Go(e,Go.DEFAULT_COLLECTION_PERCENTILE,Go.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}Go.DEFAULT_COLLECTION_PERCENTILE=10,Go.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Go.DEFAULT=new Go(Ho,Go.DEFAULT_COLLECTION_PERCENTILE,Go.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Go.DISABLED=new Go(-1,0,0);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const zo="LruGarbageCollector";function Ko([e,t],[n,r]){const s=Jn(e,n);return 0===s?Jn(t,r):s}class Wo{constructor(e){this.rr=e,this.buffer=new Ur(Ko),this.ir=0}sr(){return++this.ir}_r(e){const t=[e,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();Ko(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Yo{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.ar=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return null!==this.ar}ur(e){kn(zo,`Garbage collection scheduled in ${e}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Nr(e)?kn(zo,"Ignoring IndexedDB error during garbage collection: ",e):await Ar(e)}await this.ur(3e5)})}}class Qo{constructor(e,t){this.cr=e,this.params=t}calculateTargetCount(e,t){return this.cr.lr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return Sr.resolve(Rr.ce);const n=new Wo(t);return this.cr.forEachTarget(e,e=>n._r(e.sequenceNumber)).next(()=>this.cr.Er(e,e=>n._r(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.cr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.cr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(kn("LruGarbageCollector","Garbage collection skipped; disabled"),Sr.resolve(jo)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(kn("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),jo):this.hr(e,t))}getCacheSize(e){return this.cr.getCacheSize(e)}hr(e,t){let n,r,s,i,a,o,u;const c=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(kn("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,i=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,a=Date.now(),this.removeTargets(e,n,t))).next(t=>(s=t,o=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(u=Date.now(),On()<=x.DEBUG&&kn("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-c}ms\n\tDetermined least recently used ${r} in `+(a-i)+`ms\n\tRemoved ${s} targets in `+(o-a)+`ms\n\tRemoved ${e} documents in `+(u-o)+`ms\nTotal Duration: ${u-c}ms`),Sr.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:e})))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Xo="firestore.googleapis.com",Jo=!0;class Zo{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new Bn(Fn.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Xo,this.ssl=Jo}else this.host=e.host,this.ssl=e.ssl??Jo;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=Ho;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new Bn(Fn.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,r){if(!0===t&&!0===r)throw new Bn(Fn.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=To(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new Bn(Fn.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new Bn(Fn.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new Bn(Fn.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(
/**
    * @license
    * Copyright 2023 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,n}}class eu{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Zo({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Bn(Fn.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new Bn(Fn.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Zo(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new jn;switch(e.type){case"firstParty":return new Kn(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new Bn(Fn.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=qo.get(e);t&&(kn("ComponentProvider","Removing Datastore"),qo.delete(e),t.terminate())}(this),Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tu{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new tu(this.firestore,e,this._query)}}class nu{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ru(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new nu(this.firestore,e,this._key)}toJSON(){return{type:nu._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(yr(t,nu._jsonSchema))return new nu(e,n||null,new cr(ar.fromString(t.referencePath)))}}nu._jsonSchemaVersion="firestore/documentReference/1.0",nu._jsonSchema={type:mr("string",nu._jsonSchemaVersion),referencePath:mr("string")};class ru extends tu{constructor(e,t,n){super(e,t,zi(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new nu(this.firestore,null,new cr(e))}withConverter(e){return new ru(this.firestore,e,this._path)}}function su(e,t,...n){if(e=N(e),lr("collection","path",t),e instanceof eu){const r=ar.fromString(t,...n);return dr(r),new ru(e,null,r)}{if(!(e instanceof nu||e instanceof ru))throw new Bn(Fn.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ar.fromString(t,...n));return dr(r),new ru(e.firestore,null,r)}}function iu(e,t,...n){if(e=N(e),1===arguments.length&&(t=Xn.newId()),lr("doc","path",t),e instanceof eu){const r=ar.fromString(t,...n);return hr(r),new nu(e,null,new cr(r))}{if(!(e instanceof nu||e instanceof ru))throw new Bn(Fn.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ar.fromString(t,...n));return hr(r),new nu(e.firestore,e instanceof ru?e.converter:null,new cr(r))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:au._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(yr(e,au._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new au(e.vectorValues);throw new Bn(Fn.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}au._jsonSchemaVersion="firestore/vectorValue/1.0",au._jsonSchema={type:mr("string",au._jsonSchemaVersion),vectorValues:mr("object")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ou=/^__.*__$/;class uu{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new hi(e,this.data,this.fieldMask,t,this.fieldTransforms):new li(e,this.data,t,this.fieldTransforms)}}class cu{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new hi(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function lu(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw xn(40011,{dataSource:e})}}class hu{constructor(e,t,n,r,s,i){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new hu({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var t;const n=null==(t=this.path)?void 0:t.child(e),r=this.contextWith({path:n,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var t;const n=null==(t=this.path)?void 0:t.child(e),r=this.contextWith({path:n,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Cu(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(0===e.length)throw this.createError("Document fields must not be empty");if(lu(this.dataSource)&&ou.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class du{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||yo(e)}createContext(e,t,n,r=!1){return new hu({dataSource:e,methodName:t,targetDoc:n,path:ur.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function pu(e){const t=e._freezeSettings(),n=yo(e._databaseId);return new du(e._databaseId,!!t.ignoreUndefinedProperties,n)}function fu(e,t,n,r,s,i={}){const a=e.createContext(i.merge||i.mergeFields?2:0,t,n,s);Eu("Data must be an object, but it was:",a,r);const o=vu(r,a);let u,c;if(i.merge)u=new Fr(a.fieldMask),c=a.fieldTransforms;else if(i.mergeFields){const e=[];for(const r of i.mergeFields){const s=Tu(t,r,n);if(!a.contains(s))throw new Bn(Fn.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Au(e,s)||e.push(s)}u=new Fr(e),c=a.fieldTransforms.filter(e=>u.covers(e.field))}else u=null,c=a.fieldTransforms;return new uu(new Ls(o),u,c)}class gu extends wo{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof gu}}class mu extends wo{_toFieldTransform(e){return new ei(e.path,new qs)}isEqual(e){return e instanceof mu}}class yu extends wo{constructor(e,t){super(e),this.Pr=t}_toFieldTransform(e){const t=new Ws(e.serializer,Us(e.serializer,this.Pr));return new ei(e.path,t)}isEqual(e){return e instanceof yu&&(this.Pr===e.Pr||Number.isNaN(this.Pr)&&Number.isNaN(e.Pr))}}function _u(e,t,n){if(wu(e=N(e)))return Eu("Unsupported field value:",t,e),vu(e,t);if(e instanceof wo)return function(e,t){if(!lu(t.dataSource))throw t.createError(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.createError(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.createError("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const s of e){let e=_u(s,t.childContextForArray(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t,n){if(null===(e=N(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return Us(t.serializer,e,n);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=wr.fromDate(e);return{timestampValue:Ba(t.serializer,n)}}if(e instanceof wr){const n=new wr(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Ba(t.serializer,n)}}if(e instanceof Eo)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof _o)return{bytesValue:qa(t.serializer,e._byteString)};if(e instanceof nu){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.createError(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Ga(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof au)return function(e,t){const n=e instanceof au?e.toArray():e;return{mapValue:{fields:{[is]:{stringValue:us},[cs]:{arrayValue:{values:n.map(e=>{if("number"!=typeof e)throw t.createError("VectorValues must only contain numeric values.");return xs(t.serializer,e)})}}}}}}(e,t);if(fo(e))return e._toProto(t.serializer);throw t.createError(`Unsupported field value: ${fr(e)}`)}(e,t,n)}function vu(e,t){const n={};return qr(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):$r(e,(e,r)=>{const s=_u(r,t.childContextForField(e));null!=s&&(n[e]=s)}),{mapValue:{fields:n}}}function wu(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof wr||e instanceof Eo||e instanceof _o||e instanceof nu||e instanceof wo||e instanceof au||fo(e))}function Eu(e,t,n){if(!wu(n)||!pr(n)){const r=fr(n);throw"an object"===r?t.createError(e+" a custom object"):t.createError(e+" "+r)}}function Tu(e,t,n){if((t=N(t))instanceof vo)return t._internalPath;if("string"==typeof t)return Iu(e,t);throw Cu("Field path arguments must be of type string or ",e,!1,void 0,n)}const bu=new RegExp("[~\\*/\\[\\]]");function Iu(e,t,n){if(t.search(bu)>=0)throw Cu(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new vo(...t.split("."))._internalPath}catch(r){throw Cu(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Cu(e,t,n,r,s){const i=r&&!r.isEmpty(),a=void 0!==s;let o=`Function ${t}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new Bn(Fn.INVALID_ARGUMENT,o+e+u)}function Au(e,t){return e.some(e=>e.isEqual(t))}function Su(e){return"function"==typeof e._readUserData}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const n=Ls.empty();for(const r in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(r)){const s=this.optionDefinitions[r];if(r in e){const i=e[r];let a;s.nestedOptions&&pr(i)?a={mapValue:{fields:new Nu(s.nestedOptions).getOptionsProto(t,i)}}:i&&(a=_u(i,t)??void 0),a&&n.set(ur.fromServerFormat(s.serverName),a)}}return n}getOptionsProto(e,t,n){const r=this._getKnownOptions(t,e);if(n){const t=new Map(function(e,t){const n=[];for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.push(t(e[r],r,e));return n}(n,(t,n)=>[ur.fromServerFormat(n),void 0!==t?_u(t,e):null]));r.setAll(t)}return r.value.mapValue.fields??{}}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ru(){return new mu("serverTimestamp")}function Ou(e){return new yu("increment",e)}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ku(e){let t;return e instanceof Pu?e:(t=pr(e)?function(e){const t=[];for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)){const r=e[n];t.push(qu(n)),t.push(ku(r))}return new Hu("map",t,"map")}(e):e instanceof Array?function(e){return function(e,t){return new Hu("array",e.map(e=>ku(e)),t)}(e,"array")}(e):ju(e,void 0),t)}function Du(e){if(e instanceof Pu)return e;if(e instanceof au)return qu(e);if(Array.isArray(e))return qu(function(e){return new au(e)}(e));throw new Error("Unsupported value: "+typeof e)}function Lu(e){return function(e){return"string"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)?Bu(e):ku(e)}class Pu{constructor(){this._protoValueType="ProtoValue"}add(e){return new Hu("add",[this,ku(e)],"add")}asBoolean(){if(this instanceof Gu)return this;if(this instanceof $u)return new Ku(this);if(this instanceof Fu)return new Wu(this);if(this instanceof Hu)return new zu(this);throw new Bn("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new Hu("subtract",[this,ku(e)],"subtract")}multiply(e){return new Hu("multiply",[this,ku(e)],"multiply")}divide(e){return new Hu("divide",[this,ku(e)],"divide")}mod(e){return new Hu("mod",[this,ku(e)],"mod")}equal(e){return new Hu("equal",[this,ku(e)],"equal").asBoolean()}notEqual(e){return new Hu("not_equal",[this,ku(e)],"notEqual").asBoolean()}lessThan(e){return new Hu("less_than",[this,ku(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new Hu("less_than_or_equal",[this,ku(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new Hu("greater_than",[this,ku(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new Hu("greater_than_or_equal",[this,ku(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const n=[e,...t].map(e=>ku(e));return new Hu("array_concat",[this,...n],"arrayConcat")}arrayContains(e){return new Hu("array_contains",[this,ku(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Vu(e.map(ku),"arrayContainsAll"):e;return new Hu("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Vu(e.map(ku),"arrayContainsAny"):e;return new Hu("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new Hu("array_reverse",[this])}arrayLength(){return new Hu("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Vu(e.map(ku),"equalAny"):e;return new Hu("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Vu(e.map(ku),"notEqualAny"):e;return new Hu("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new Hu("exists",[this],"exists").asBoolean()}charLength(){return new Hu("char_length",[this],"charLength")}like(e){return new Hu("like",[this,ku(e)],"like").asBoolean()}regexContains(e){return new Hu("regex_contains",[this,ku(e)],"regexContains").asBoolean()}regexFind(e){return new Hu("regex_find",[this,ku(e)],"regexFind")}regexFindAll(e){return new Hu("regex_find_all",[this,ku(e)],"regexFindAll")}regexMatch(e){return new Hu("regex_match",[this,ku(e)],"regexMatch").asBoolean()}stringContains(e){return new Hu("string_contains",[this,ku(e)],"stringContains").asBoolean()}startsWith(e){return new Hu("starts_with",[this,ku(e)],"startsWith").asBoolean()}endsWith(e){return new Hu("ends_with",[this,ku(e)],"endsWith").asBoolean()}toLower(){return new Hu("to_lower",[this],"toLower")}toUpper(){return new Hu("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(ku(e)),new Hu("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(ku(e)),new Hu("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(ku(e)),new Hu("rtrim",t,"rtrim")}type(){return new Hu("type",[this])}isType(e){return new Hu("is_type",[this,qu(e)],"isType").asBoolean()}stringConcat(e,...t){const n=[e,...t].map(ku);return new Hu("string_concat",[this,...n],"stringConcat")}stringIndexOf(e){return new Hu("string_index_of",[this,ku(e)],"stringIndexOf")}stringRepeat(e){return new Hu("string_repeat",[this,ku(e)],"stringRepeat")}stringReplaceAll(e,t){return new Hu("string_replace_all",[this,ku(e),ku(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new Hu("string_replace_one",[this,ku(e),ku(t)],"stringReplaceOne")}concat(e,...t){const n=[e,...t].map(ku);return new Hu("concat",[this,...n],"concat")}reverse(){return new Hu("reverse",[this],"reverse")}arrayFilter(e,t){return new Hu("array_filter",[this,ku(e),t],"arrayFilter")}arrayTransform(e,t){return new Hu("array_transform",[this,ku(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,n){return new Hu("array_transform",[this,ku(e),ku(t),n],"arrayTransformWithIndex")}arraySlice(e,t){const n=[this,ku(e)];return void 0!==t&&n.push(ku(t)),new Hu("array_slice",n,"arraySlice")}arrayFirst(){return new Hu("array_first",[this],"arrayFirst")}arrayFirstN(e){return new Hu("array_first_n",[this,ku(e)],"arrayFirstN")}arrayLast(){return new Hu("array_last",[this],"arrayLast")}arrayLastN(e){return new Hu("array_last_n",[this,ku(e)],"arrayLastN")}arrayMaximum(){return new Hu("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new Hu("maximum_n",[this,ku(e)],"arrayMaximumN")}arrayMinimum(){return new Hu("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new Hu("minimum_n",[this,ku(e)],"arrayMinimumN")}arrayIndexOf(e){return new Hu("array_index_of",[this,ku(e),ku("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new Hu("array_index_of",[this,ku(e),ku("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new Hu("array_index_of_all",[this,ku(e)],"arrayIndexOfAll")}byteLength(){return new Hu("byte_length",[this],"byteLength")}ceil(){return new Hu("ceil",[this])}floor(){return new Hu("floor",[this])}abs(){return new Hu("abs",[this])}exp(){return new Hu("exp",[this])}mapGet(e){return new Hu("map_get",[this,qu(e)],"mapGet")}mapSet(e,t,...n){const r=[this,ku(e),ku(t),...n.map(ku)];return new Hu("map_set",r,"mapSet")}mapKeys(){return new Hu("map_keys",[this],"mapKeys")}mapValues(){return new Hu("map_values",[this],"mapValues")}mapEntries(){return new Hu("map_entries",[this],"mapEntries")}getField(e){return new Hu("get_field",[this,ku(e)],"get_field")}count(){return xu._create("count",[this],"count")}sum(){return xu._create("sum",[this],"sum")}average(){return xu._create("average",[this],"average")}minimum(){return xu._create("minimum",[this],"minimum")}maximum(){return xu._create("maximum",[this],"maximum")}first(){return xu._create("first",[this],"first")}last(){return xu._create("last",[this],"last")}arrayAgg(){return xu._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return xu._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return xu._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const n=[e,...t];return new Hu("maximum",[this,...n.map(ku)],"logicalMaximum")}logicalMinimum(e,...t){const n=[e,...t];return new Hu("minimum",[this,...n.map(ku)],"minimum")}vectorLength(){return new Hu("vector_length",[this],"vectorLength")}cosineDistance(e){return new Hu("cosine_distance",[this,Du(e)],"cosineDistance")}dotProduct(e){return new Hu("dot_product",[this,Du(e)],"dotProduct")}euclideanDistance(e){return new Hu("euclidean_distance",[this,Du(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new Hu("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new Hu("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new Hu("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new Hu("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new Hu("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new Hu("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new Hu("timestamp_add",[this,ku(e),ku(t)],"timestampAdd")}timestampSubtract(e,t){return new Hu("timestamp_subtract",[this,ku(e),ku(t)],"timestampSubtract")}timestampDiff(e,t){return new Hu("timestamp_diff",[this,Lu(e),ku(t)],"timestampDiff")}timestampExtract(e,t){const n=[this,ku(e)];return t&&n.push(ku(t)),new Hu("timestamp_extract",n,"timestampExtract")}documentId(){return new Hu("document_id",[this],"documentId")}parent(){return new Hu("parent",[this],"parent")}substring(e,t){const n=ku(e);return new Hu("substring",void 0===t?[this,n]:[this,n,ku(t)],"substring")}arrayGet(e){return new Hu("array_get",[this,ku(e)],"arrayGet")}isError(){return new Hu("is_error",[this],"isError").asBoolean()}ifError(e){const t=new Hu("if_error",[this,ku(e)],"ifError");return e instanceof Gu?t.asBoolean():t}isAbsent(){return new Hu("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new Hu("map_remove",[this,ku(e)],"mapRemove")}mapMerge(e,...t){const n=ku(e),r=t.map(ku);return new Hu("map_merge",[this,n,...r],"mapMerge")}pow(e){return new Hu("pow",[this,ku(e)])}trunc(e){return void 0===e?new Hu("trunc",[this]):new Hu("trunc",[this,ku(e)],"trunc")}round(e){return void 0===e?new Hu("round",[this]):new Hu("round",[this,ku(e)],"round")}collectionId(){return new Hu("collection_id",[this])}length(){return new Hu("length",[this])}ln(){return new Hu("ln",[this])}sqrt(){return new Hu("sqrt",[this])}stringReverse(){return new Hu("string_reverse",[this])}ifAbsent(e){return new Hu("if_absent",[this,ku(e)],"ifAbsent")}ifNull(e){return new Hu("if_null",[this,ku(e)],"ifNull")}coalesce(e,...t){return new Hu("coalesce",[this,ku(e),...t.map(ku)],"coalesce")}join(e){return new Hu("join",[this,ku(e)],"join")}log10(){return new Hu("log10",[this])}arraySum(){return new Hu("sum",[this])}split(e){return new Hu("split",[this,ku(e)])}timestampTruncate(e,t){const n=[this,ku(e)];return t&&n.push(ku(t)),new Hu("timestamp_trunc",n)}ascending(){return new Yu(Lu(this),"ascending","ascending")}descending(){return new Yu(Lu(this),"descending","descending")}as(e){return new Uu(this,e,"as")}}class xu{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,n){const r=new xu(e,t);return r._methodName=n,r}as(e){return new Mu(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e))}}class Mu{constructor(e,t,n){this.aggregate=e,this.alias=t,this._methodName=n}_readUserData(e){this.aggregate._readUserData(e)}}class Uu{constructor(e,t,n){this.expr=e,this.alias=t,this._methodName=n,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Vu extends Pu{constructor(e,t){super(),this.Rr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.Rr.map(t=>t._toProto(e))}}}_readUserData(e){this.Rr.forEach(t=>t._readUserData(e))}}class Fu extends Pu{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new Hu("geo_distance",[this,ku(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function Bu(e){return function(e,t){return new Fu("string"==typeof e?sr===e?new vo(sr)._internalPath:Tu("field",e):e._internalPath,t)}(e,"field")}class $u extends Pu{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new $u(e,void 0);return t._protoValue=e,t}_toProto(e){return Un(void 0!==this._protoValue,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,function(e){return"object"==typeof e&&null!==e&&!!("nullValue"in e&&(null===e.nullValue||"NULL_VALUE"===e.nullValue)||"booleanValue"in e&&(null===e.booleanValue||"boolean"==typeof e.booleanValue)||"integerValue"in e&&(null===e.integerValue||"number"==typeof e.integerValue||"string"==typeof e.integerValue)||"doubleValue"in e&&(null===e.doubleValue||"number"==typeof e.doubleValue)||"timestampValue"in e&&(null===e.timestampValue||(t=e.timestampValue,"object"==typeof t&&null!==t&&"seconds"in t&&(null===t.seconds||"number"==typeof t.seconds||"string"==typeof t.seconds)&&"nanos"in t&&(null===t.nanos||"number"==typeof t.nanos)))||"stringValue"in e&&(null===e.stringValue||"string"==typeof e.stringValue)||"bytesValue"in e&&(null===e.bytesValue||e.bytesValue instanceof Uint8Array)||"referenceValue"in e&&(null===e.referenceValue||"string"==typeof e.referenceValue)||"geoPointValue"in e&&(null===e.geoPointValue||function(e){return"object"==typeof e&&null!==e&&"latitude"in e&&(null===e.latitude||"number"==typeof e.latitude)&&"longitude"in e&&(null===e.longitude||"number"==typeof e.longitude)}(e.geoPointValue))||"arrayValue"in e&&(null===e.arrayValue||function(e){return"object"==typeof e&&null!==e&&!(!("values"in e)||null!==e.values&&!Array.isArray(e.values))}(e.arrayValue))||"mapValue"in e&&(null===e.mapValue||function(e){return"object"==typeof e&&null!==e&&!(!("fields"in e)||null!==e.fields&&!pr(e.fields))}(e.mapValue))||"fieldReferenceValue"in e&&(null===e.fieldReferenceValue||"string"==typeof e.fieldReferenceValue)||"functionValue"in e&&(null===e.functionValue||function(e){return"object"==typeof e&&null!==e&&!(!("name"in e)||null!==e.name&&"string"!=typeof e.name||!("args"in e)||null!==e.args&&!Array.isArray(e.args))}(e.functionValue))||"pipelineValue"in e&&(null===e.pipelineValue||function(e){return"object"==typeof e&&null!==e&&!(!("stages"in e)||null!==e.stages&&!Array.isArray(e.stages))}(e.pipelineValue)));var t}(this._protoValue)||(this._protoValue=_u(this.value,e))}}function qu(e,t){return ju(e,"constant")}function ju(e,t){const n=new $u(e,t);return"boolean"==typeof e?new Ku(n):n}class Hu extends Pu{constructor(e,t,n,r){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,void 0!==n&&(this._methodName=n),void 0!==r&&(this._options=r)}get _optionsUtil(){return new Nu({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e)),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class Gu extends Pu{get _methodName(){return this._expr._methodName}countIf(){return xu._create("count_if",[this],"countIf")}not(){return new Hu("not",[this],"not").asBoolean()}conditional(e,t){return new Hu("conditional",[this,e,t],"conditional")}ifError(e){const t=ku(e),n=new Hu("if_error",[this,t],"ifError");return t instanceof Gu?n.asBoolean():n}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class zu extends Gu{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class Ku extends Gu{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class Wu extends Gu{constructor(e){super(),this._expr=e,this.expressionType="Field"}}class Yu{constructor(e,t,n){this.expr=e,this.direction=t,this._methodName=n,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:mo(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(e){this.optionsProto=void 0,({rawOptions:this.rawOptions,...this.knownOptions}=e)}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class Xu extends Qu{get _name(){return"add_fields"}get _optionsUtil(){return new Nu({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[go(e,this.fields)]}}_readUserData(e){super._readUserData(e),lc(this.fields,e)}}class Ju extends Qu{get _name(){return"aggregate"}get _optionsUtil(){return new Nu({})}constructor(e,t,n){super(n),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[go(e,this.accumulators),go(e,this.groups)]}}_readUserData(e){super._readUserData(e),lc(this.groups,e),lc(this.accumulators,e)}}class Zu extends Qu{get _name(){return"distinct"}get _optionsUtil(){return new Nu({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[go(e,this.groups)]}}_readUserData(e){super._readUserData(e),lc(this.groups,e)}}class ec extends Qu{get _name(){return"collection"}get _optionsUtil(){return new Nu({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Vr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Vr}]}}_readUserData(e){super._readUserData(e)}}class tc extends Qu{get _name(){return"collection_group"}get _optionsUtil(){return new Nu({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class nc extends Qu{get _name(){return"database"}get _optionsUtil(){return new Nu({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class rc extends Qu{get _name(){return"documents"}get _optionsUtil(){return new Nu({})}constructor(e,t){if(super(t),!e||0===e.length)throw new Bn(Fn.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const n=e.map(e=>e.startsWith("/")?e:"/"+e),r=new Set(n);if(r.size!==n.length)throw new Bn(Fn.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=n,this.mr=r}_toProto(e){return{...super._toProto(e),args:this.dr.map(e=>({referenceValue:e}))}}_readUserData(e){super._readUserData(e)}}class sc extends Qu{get _name(){return"where"}get _optionsUtil(){return new Nu({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),lc(this.condition,e)}}class ic extends Qu{get _name(){return"limit"}get _optionsUtil(){return new Nu({})}constructor(e,t){Un(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[Us(e,this.limit)]}}}class ac extends Qu{get _name(){return"offset"}get _optionsUtil(){return new Nu({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[Us(e,this.offset)]}}}class oc extends Qu{get _name(){return"select"}get _optionsUtil(){return new Nu({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[go(e,this.selections)]}}_readUserData(e){super._readUserData(e),lc(this.selections,e)}}class uc extends Qu{get _name(){return"sort"}get _optionsUtil(){return new Nu({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map(t=>t._toProto(e))}}_readUserData(e){super._readUserData(e),lc(this.orderings,e)}}class cc extends Qu{get _name(){return"replace_with"}get _optionsUtil(){return new Nu({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),mo(cc.pr)]}}_readUserData(e){super._readUserData(e),lc(this.map,e)}}function lc(e,t){return Su(e)?e._readUserData(t):Array.isArray(e)||e instanceof Map?e.forEach(e=>e._readUserData(t)):Object.values(e).forEach(e=>e._readUserData(t)),e}
// Copyright 2024 Google LLC* @license
cc.pr="full_replace";class hc{constructor(e,t,n){this.serializer=e,this.stages=t,this.listenOptions=n,this.isCorePipeline=!0}getPipelineCollection(){return pc(this)}getPipelineCollectionGroup(){return fc(this)}getPipelineCollectionId(){return function(e){switch(dc(e)){case"collection":return ar.fromString(pc(e)).lastSegment();case"collection_group":return fc(e);default:return}}(this)}getPipelineDocuments(){return gc(this)}getPipelineFlavor(){return function(e){let t="exact";return e.stages.forEach((n,r)=>{n._name!==Zu.name&&n._name!==Ju.name||(t="keyless"),n._name===oc.name&&"exact"===t&&(t="augmented"),n._name===Xu.name&&r<e.stages.length-1&&"exact"===t&&(t="augmented")}),t}(this)}getPipelineSourceType(){return dc(this)}}function dc(e){const t=e.stages[0];return t instanceof ec||t instanceof tc||t instanceof nc||t instanceof rc?t._name:"unknown"}function pc(e){if("collection"===dc(e))return e.stages[0].Vr}function fc(e){if("collection_group"===dc(e))return e.stages[0].collectionId}function gc(e){if("documents"===dc(e))return e.stages[0].dr}class mc{constructor(e,t,n,r){this._db=e,this.userDataReader=t,this._userDataWriter=n,this.stages=r}wr(e,t){const n=this.userDataReader.createContext(3,e);return Su(t)?t._readUserData(n):(Array.isArray(t),t.forEach(e=>e._readUserData(n))),t}where(e){const t=this.stages.map(e=>e);return this.wr("where",e),t.push(new sc(e,{})),new mc(this._db,this.userDataReader,this._userDataWriter,t)}limit(e){const t=this.stages.map(e=>e);return t.push(new ic(e,{})),new mc(this._db,this.userDataReader,this._userDataWriter,t)}sort(e,...t){const n=this.stages.map(e=>e);return"orderings"in e?n.push(new uc(this.wr("sort",e.orderings),{})):n.push(new uc(this.wr("sort",[e,...t]),{})),new mc(this._db,this.userDataReader,this._userDataWriter,n)}br(e){return{pipeline:{stages:this.stages.map(t=>t._toProto(e))}}}}
// Copyright 2024 Google LLC* @license
class yc{constructor(e,t){this.type=e,this.value=t}static vr(){return new yc("ERROR",void 0)}static Sr(){return new yc("UNSET",void 0)}static Dr(){return new yc("NULL",ls)}static newValue(e){return Ss(e)?new yc("NULL",ls):(t=e)&&"booleanValue"in t?new yc("BOOLEAN",e):bs(e)?new yc("INT",e):Is(e)?new yc("DOUBLE",e):function(e){return!!e&&"timestampValue"in e&&!!e.timestampValue}(e)?new yc("TIMESTAMP",e):function(e){return!!e&&"stringValue"in e}(e)?new yc("STRING",e):function(e){return!!e&&"bytesValue"in e}(e)?new yc("BYTES",e):e.referenceValue?new yc("REFERENCE",e):e.geoPointValue?new yc("GEO_POINT",e):As(e)?new yc("ARRAY",e):Os(e)?new yc("VECTOR",e):Rs(e)?new yc("MAP",e):new yc("ERROR",void 0);var t}Cr(){return"ERROR"===this.type||"UNSET"===this.type}Fr(){return"NULL"===this.type}}function _c(e){if(!e.Cr())return e.value}function vc(e){return e instanceof Gu?e._expr:e}function wc(e){if((e=vc(e))instanceof Fu)return new Ec(e);if(e instanceof $u)return new Tc(e);if(e instanceof Vu)return new bc(e);if(e instanceof Hu){if("add"===e.name)return new Oc(e);if("subtract"===e.name)return new kc(e);if("multiply"===e.name)return new Dc(e);if("divide"===e.name)return new Lc(e);if("mod"===e.name)return new Pc(e);if("and"===e.name)return new xc(e);if("equal"===e.name)return new Xc(e);if("not_equal"===e.name)return new Jc(e);if("less_than"===e.name)return new Zc(e);if("less_than_or_equal"===e.name)return new el(e);if("greater_than"===e.name)return new tl(e);if("greater_than_or_equal"===e.name)return new nl(e);if("array_concat"===e.name)return new rl(e);if("array_reverse"===e.name)return new sl(e);if("array_contains"===e.name)return new il(e);if("array_contains_all"===e.name)return new al(e);if("array_contains_any"===e.name)return new ol(e);if("array_length"===e.name)return new ul(e);if("array_element"===e.name)return new cl(e);if("equal_any"===e.name)return new Fc(e);if("not_equal_any"===e.name)return new Bc(e);if("is_nan"===e.name)return new $c(e);if("is_not_nan"===e.name)return new qc(e);if("is_null"===e.name)return new jc(e);if("is_not_null"===e.name)return new Hc(e);if("is_error"===e.name)return new Gc(e);if("exists"===e.name)return new zc(e);if("not"===e.name)return new Mc(e);if("or"===e.name)return new Uc(e);if("xor"===e.name)return new Vc(e);if("conditional"===e.name)return new Kc(e);if("maximum"===e.name)return new Wc(e);if("minimum"===e.name)return new Yc(e);if("reverse"===e.name)return new ll(e);if("replace_first"===e.name)return new hl(e);if("replace_all"===e.name)return new dl(e);if("char_length"===e.name)return new pl(e);if("byte_length"===e.name)return new fl(e);if("like"===e.name)return new ml(e);if("regex_contains"===e.name)return new yl(e);if("regex_match"===e.name)return new _l(e);if("string_contains"===e.name)return new vl(e);if("starts_with"===e.name)return new wl(e);if("ends_with"===e.name)return new El(e);if("to_lower"===e.name)return new Tl(e);if("to_upper"===e.name)return new bl(e);if("trim"===e.name)return new Il(e);if("string_concat"===e.name)return new Cl(e);if("map_get"===e.name)return new Al(e);if("cosine_distance"===e.name)return new Nl(e);if("dot_product"===e.name)return new Rl(e);if("euclidean_distance"===e.name)return new Ol(e);if("vector_length"===e.name)return new kl(e);if("unix_micros_to_timestamp"===e.name)return new zl(e);if("timestamp_to_unix_micros"===e.name)return new Ql(e);if("unix_millis_to_timestamp"===e.name)return new Kl(e);if("timestamp_to_unix_millis"===e.name)return new Xl(e);if("unix_seconds_to_timestamp"===e.name)return new Wl(e);if("timestamp_to_unix_seconds"===e.name)return new Jl(e);if("timestamp_add"===e.name)return new eh(e);if("timestamp_subtract"===e.name)return new th(e)}throw new Error(`Unknown Expr : ${e}`)}class Ec{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===sr)return yc.newValue({referenceValue:Wa(e.serializer,t.key)});if("__update_time__"===this.expr.fieldName)return yc.newValue({timestampValue:ja(e.serializer,t.version)});if("__create_time__"===this.expr.fieldName)return yc.newValue({timestampValue:ja(e.serializer,t.createTime)});const n=t.data.field(this.expr._fieldPath);return n?Zr(n)?yc.newValue(function(e,t){if("estimate"===e.serverTimestampBehavior)return{timestampValue:ja(e.serializer,Er.fromTimestamp(ts(t)))};if("previous"===e.serverTimestampBehavior){const e=es(t);if(e)return e}return{nullValue:"NULL_VALUE"}}(e,n)):yc.newValue(n):yc.Sr()}}class Tc{constructor(e){this.expr=e}evaluate(e,t){return yc.newValue(this.expr._getValue())}}class bc{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.Rr.map(n=>wc(n).evaluate(e,t));return n.some(e=>e.Cr())?yc.vr():yc.newValue({arrayValue:{values:n.map(e=>e.value)}})}}function Ic(e){return Is(e)?Number(e.doubleValue):Number(e.integerValue)}function Cc(e){return BigInt(e.integerValue)}const Ac=BigInt("0x7fffffffffffffff"),Sc=-BigInt("0x8000000000000000");class Nc{constructor(e){this.expr=e}evaluate(e,t){Un(this.expr.params.length>=2,24778);const n=wc(this.expr.params[0]).evaluate(e,t),r=wc(this.expr.params[1]).evaluate(e,t);let s=this.Or(n,r);for(const i of this.expr.params.slice(2)){const n=wc(i).evaluate(e,t);s=this.Or(s,n)}return s}Or(e,t){if(e.Cr()||t.Cr())return yc.vr();if(e.Fr()||t.Fr())return yc.Dr();const n=e.value,r=t.value;if(!Is(n)&&!bs(n)||!Is(r)&&!bs(r))return yc.vr();if(Is(n)||Is(r)){const e=this.Mr(n,r);return e?yc.newValue(e):yc.vr()}if(bs(n)&&bs(r)){const e=this.Nr(n,r);return void 0===e?yc.vr():"number"==typeof e?yc.newValue({doubleValue:e}):e<Sc||e>Ac?yc.vr():yc.newValue({integerValue:`${e}`})}return yc.vr()}}function Rc(e,t){return ps(e)!==ps(t)?"TYPE_MISMATCH":Ns(e)||Ns(t)?"NOT_EQ":Ss(e)&&Ss(t)?"EQ":Ss(e)||Ss(t)?"NULL":As(e)&&As(t)?function(e,t){var n,r,s;if((null==(n=e.values)?void 0:n.length)!==(null==(r=t.values)?void 0:r.length))return"NOT_EQ";let i=!1;for(let a=0;a<((null==(s=e.values)?void 0:s.length)??0);a++){const n=e.values[a],r=t.values[a];switch(Rc(n,r)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:xn(44609,{Lr:n,Br:r})}}return i?"NULL":"EQ"}(e.arrayValue,t.arrayValue):Os(e)&&Os(t)||Rs(e)&&Rs(t)?function(e,t){const n=e.fields||{},r=t.fields||{};if(Br(n)!==Br(r))return"NOT_EQ";let s=!1;for(const i in n)if(n.hasOwnProperty(i)){if(void 0===r[i])return"NOT_EQ";switch(Rc(n[i],r[i])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":s=!0}}return s?"NULL":"EQ"}(e.mapValue,t.mapValue):fs(e,t,{Te:!1,Ee:!0,he:!0})?"EQ":"NOT_EQ"}class Oc extends Nc{Nr(e,t){return Cc(e)+Cc(t)}Mr(e,t){return{doubleValue:Ic(e)+Ic(t)}}}class kc extends Nc{constructor(e){super(e),this.expr=e}Nr(e,t){return Cc(e)-Cc(t)}Mr(e,t){return{doubleValue:Ic(e)-Ic(t)}}}class Dc extends Nc{constructor(e){super(e),this.expr=e}Nr(e,t){return Cc(e)*Cc(t)}Mr(e,t){return{doubleValue:Ic(e)*Ic(t)}}}class Lc extends Nc{constructor(e){super(e),this.expr=e}Nr(e,t){const n=Cc(t);if(n!==BigInt(0))return Cc(e)/n}Mr(e,t){const n=Ic(t);return 0===n?{doubleValue:kr(n)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Ic(e)/n}}}class Pc extends Nc{constructor(e){super(e),this.expr=e}Nr(e,t){const n=Cc(t);if(n!==BigInt(0))return Cc(e)%n}Mr(e,t){const n=Ic(t);if(0!==n)return{doubleValue:Ic(e)%n}}}class xc{constructor(e){this.expr=e}evaluate(e,t){var n;let r=!1,s=!1;for(const i of this.expr.params){const a=wc(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(!(null==(n=a.value)?void 0:n.booleanValue))return yc.newValue(ds);break;case"NULL":s=!0;break;default:r=!0}}return r?yc.vr():s?yc.Dr():yc.newValue(hs)}}class Mc{constructor(e){this.expr=e}evaluate(e,t){var n;Un(1===this.expr.params.length,9634);const r=wc(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return yc.newValue({booleanValue:!(null==(n=r.value)?void 0:n.booleanValue)});case"NULL":return yc.Dr();default:return yc.vr()}}}class Uc{constructor(e){this.expr=e}evaluate(e,t){var n;let r=!1,s=!1;for(const i of this.expr.params){const a=wc(i).evaluate(e,t);switch(a.type){case"BOOLEAN":if(null==(n=a.value)?void 0:n.booleanValue)return yc.newValue(hs);break;case"NULL":s=!0;break;default:r=!0}}return r?yc.vr():s?yc.Dr():yc.newValue(ds)}}class Vc{constructor(e){this.expr=e}evaluate(e,t){var n;let r=!1,s=!1;for(const i of this.expr.params){const a=wc(i).evaluate(e,t);switch(a.type){case"BOOLEAN":r=Vc.xor(r,!!(null==(n=a.value)?void 0:n.booleanValue));break;case"NULL":s=!0;break;default:return yc.vr()}}return s?yc.Dr():yc.newValue({booleanValue:r})}static xor(e,t){return(e||t)&&!(e&&t)}}class Fc{constructor(e){this.expr=e}evaluate(e,t){var n,r;Un(2===this.expr.params.length,55094);let s=!1;const i=wc(this.expr.params[0]).evaluate(e,t);switch(i.type){case"NULL":s=!0;break;case"ERROR":case"UNSET":return yc.vr()}const a=wc(this.expr.params[1]).evaluate(e,t);switch(a.type){case"ARRAY":break;case"NULL":s=!0;break;default:return yc.vr()}if(s)return yc.Dr();for(const o of(null==(r=null==(n=a.value)?void 0:n.arrayValue)?void 0:r.values)??[])switch(Ss(i.value)&&Ss(o)?"EQ":Rc(i.value,o)){case"EQ":return yc.newValue(hs);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":s=!0;break;default:xn(44608,{value:i.value,candidate:o})}return s?yc.Dr():yc.newValue(ds)}}class Bc{constructor(e){this.expr=e}evaluate(e,t){return new Mc(new Hu("not",[new Hu("equal_any",this.expr.params)])).evaluate(e,t)}}class $c{constructor(e){this.expr=e}evaluate(e,t){Un(1===this.expr.params.length,23322);const n=wc(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return yc.newValue(ds);case"DOUBLE":return yc.newValue({booleanValue:isNaN(Ic(n.value))});case"NULL":return yc.Dr();default:return yc.vr()}}}class qc{constructor(e){this.expr=e}evaluate(e,t){return Un(1===this.expr.params.length,50406),new Mc(new Hu("not",[new Hu("is_nan",this.expr.params)])).evaluate(e,t)}}class jc{constructor(e){this.expr=e}evaluate(e,t){switch(Un(1===this.expr.params.length,23123),wc(this.expr.params[0]).evaluate(e,t).type){case"NULL":return yc.newValue(hs);case"UNSET":case"ERROR":return yc.vr();default:return yc.newValue(ds)}}}class Hc{constructor(e){this.expr=e}evaluate(e,t){return Un(1===this.expr.params.length,23167),new Mc(new Hu("not",[new Hu("is_null",this.expr.params)])).evaluate(e,t)}}class Gc{constructor(e){this.expr=e}evaluate(e,t){return Un(1===this.expr.params.length,5228),"ERROR"===wc(this.expr.params[0]).evaluate(e,t).type?yc.newValue(hs):yc.newValue(ds)}}class zc{constructor(e){this.expr=e}evaluate(e,t){switch(Un(1===this.expr.params.length,6877),wc(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return yc.vr();case"UNSET":return yc.newValue(ds);default:return yc.newValue(hs)}}}class Kc{constructor(e){this.expr=e}evaluate(e,t){var n;Un(3===this.expr.params.length,11706);const r=wc(this.expr.params[0]).evaluate(e,t);switch(r.type){case"BOOLEAN":return(null==(n=r.value)?void 0:n.booleanValue)?wc(this.expr.params[1]).evaluate(e,t):wc(this.expr.params[2]).evaluate(e,t);case"NULL":return wc(this.expr.params[2]).evaluate(e,t);default:return yc.vr()}}}class Wc{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(n=>wc(n).evaluate(e,t));let r;for(const s of n)switch(s.type){case"ERROR":case"UNSET":case"NULL":continue;default:r=void 0===r||ms(s.value,r.value)>0?s:r}return void 0===r?yc.Dr():r}}class Yc{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(n=>wc(n).evaluate(e,t));let r;for(const s of n)switch(s.type){case"ERROR":case"UNSET":case"NULL":continue;default:r=void 0===r||ms(s.value,r.value)<0?s:r}return void 0===r?yc.Dr():r}}class Qc{constructor(e){this.expr=e}evaluate(e,t){Un(2===this.expr.params.length,31033,`${this.expr.name}() function should have exactly 2 params`);const n=wc(this.expr.params[0]).evaluate(e,t);switch(n.type){case"ERROR":case"UNSET":return yc.vr()}const r=wc(this.expr.params[1]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return yc.vr()}return this.Ur(n,r)}}class Xc extends Qc{constructor(e){super(e),this.expr=e}Ur(e,t){if(e.Fr()&&t.Fr())return yc.newValue(hs);if(e.Fr()||t.Fr())return yc.newValue(ds);if(Ns(e.value)||Ns(t.value))return yc.newValue(ds);if(ps(e.value)!==ps(t.value))return yc.newValue(ds);switch(Rc(e.value,t.value)){case"EQ":return yc.newValue(hs);case"NOT_EQ":return yc.newValue(ds);case"NULL":return yc.Dr();default:xn(44615,{left:e,right:t})}}}class Jc extends Qc{constructor(e){super(e),this.expr=e}Ur(e,t){switch(Rc(e.value,t.value)){case"EQ":return yc.newValue(ds);case"NOT_EQ":case"TYPE_MISMATCH":return yc.newValue(hs);case"NULL":return yc.Dr();default:xn(44614,{left:e,right:t})}}}class Zc extends Qc{constructor(e){super(e),this.expr=e}Ur(e,t){return ps(e.value)!==ps(t.value)||Ns(e.value)||Ns(t.value)?yc.newValue(ds):yc.newValue({booleanValue:ms(e.value,t.value)<0})}}class el extends Qc{constructor(e){super(e),this.expr=e}Ur(e,t){return ps(e.value)!==ps(t.value)||Ns(e.value)||Ns(t.value)?yc.newValue(ds):"EQ"===Rc(e.value,t.value)?yc.newValue(hs):yc.newValue({booleanValue:ms(e.value,t.value)<0})}}class tl extends Qc{constructor(e){super(e),this.expr=e}Ur(e,t){return ps(e.value)!==ps(t.value)||Ns(e.value)||Ns(t.value)?yc.newValue(ds):yc.newValue({booleanValue:ms(e.value,t.value)>0})}}class nl extends Qc{constructor(e){super(e),this.expr=e}Ur(e,t){return ps(e.value)!==ps(t.value)||Ns(e.value)||Ns(t.value)?yc.newValue(ds):"EQ"===Rc(e.value,t.value)?yc.newValue(hs):yc.newValue({booleanValue:ms(e.value,t.value)>0})}}class rl{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class sl{constructor(e){this.expr=e}evaluate(e,t){var n;Un(1===this.expr.params.length,216);const r=wc(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":return yc.Dr();case"ARRAY":{const e=(null==(n=r.value.arrayValue)?void 0:n.values)??[];return yc.newValue({arrayValue:{values:[...e].reverse()}})}default:return yc.vr()}}}class il{constructor(e){this.expr=e}evaluate(e,t){return Un(2===this.expr.params.length,52884),new Fc(new Hu("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class al{constructor(e){this.expr=e}evaluate(e,t){var n,r,s,i;Un(2===this.expr.params.length,1392);let a=!1;const o=wc(this.expr.params[0]).evaluate(e,t);switch(o.type){case"ARRAY":break;case"NULL":a=!0;break;default:return yc.vr()}const u=wc(this.expr.params[1]).evaluate(e,t);switch(u.type){case"ARRAY":break;case"NULL":a=!0;break;default:return yc.vr()}if(a)return yc.Dr();const c=(null==(r=null==(n=u.value)?void 0:n.arrayValue)?void 0:r.values)??[],l=(null==(i=null==(s=o.value)?void 0:s.arrayValue)?void 0:i.values)??[];for(const h of c){let e=!1;a=!1;for(const t of l){switch(Ss(h)&&Ss(t)?"EQ":Rc(h,t)){case"EQ":e=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":a=!0;break;default:xn(44613,{value:t,search:h})}if(e)break}if(!e)return yc.newValue(ds)}return yc.newValue(hs)}}class ol{constructor(e){this.expr=e}evaluate(e,t){var n,r,s,i;Un(2===this.expr.params.length,2680);let a=!1;const o=wc(this.expr.params[0]).evaluate(e,t);switch(o.type){case"ARRAY":break;case"NULL":a=!0;break;default:return yc.vr()}const u=wc(this.expr.params[1]).evaluate(e,t);switch(u.type){case"ARRAY":break;case"NULL":a=!0;break;default:return yc.vr()}if(a)return yc.Dr();const c=(null==(r=null==(n=u.value)?void 0:n.arrayValue)?void 0:r.values)??[],l=(null==(i=null==(s=o.value)?void 0:s.arrayValue)?void 0:i.values)??[];for(const h of l)for(const e of c)switch(Ss(h)&&Ss(e)?"EQ":Rc(h,e)){case"EQ":return yc.newValue(hs);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":a=!0;break;default:xn(44608,{value:h,search:e})}return a?yc.Dr():yc.newValue(ds)}}class ul{constructor(e){this.expr=e}evaluate(e,t){var n,r,s;Un(1===this.expr.params.length,38605);const i=wc(this.expr.params[0]).evaluate(e,t);switch(i.type){case"NULL":return yc.Dr();case"ARRAY":return yc.newValue({integerValue:`${(null==(s=null==(r=null==(n=i.value)?void 0:n.arrayValue)?void 0:r.values)?void 0:s.length)??0}`});default:return yc.vr()}}}class cl{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class ll{constructor(e){this.expr=e}evaluate(e,t){var n,r;Un(1===this.expr.params.length,1508);const s=wc(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":return yc.Dr();case"BYTES":{const e=null==(n=s.value)?void 0:n.bytesValue;if("string"==typeof e){const t=Hr.fromBase64String(e).toUint8Array();return t.reverse(),yc.newValue({bytesValue:Hr.fromUint8Array(t).toBase64()})}return yc.newValue({bytesValue:new Uint8Array(e).reverse()})}case"STRING":{const e=null==(r=s.value)?void 0:r.stringValue,t=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(e),n=Array.from(t,e=>e.segment).reverse();return yc.newValue({stringValue:n.join("")})}default:return yc.vr()}}}class hl{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class dl{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class pl{constructor(e){this.expr=e}evaluate(e,t){Un(1===this.expr.params.length,19400);const n=wc(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return yc.Dr();case"STRING":{const e=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.codePointAt(n);if(void 0===r)return;if(r<=65535)if(r>=55296&&r<=57343)if(r<=56319){const r=e.codePointAt(n+1);void 0!==r&&r>=56320&&r<=57343?(t+=1,n++):t+=1}else t+=1;else t+=1;else{if(!(r<=1114111))return;t+=1,n++}}return t}(n.value.stringValue);return void 0===e?yc.vr():yc.newValue({integerValue:e})}default:return yc.vr()}}}class fl{constructor(e){this.expr=e}evaluate(e,t){var n,r;Un(1===this.expr.params.length,8486);const s=wc(this.expr.params[0]).evaluate(e,t);switch(s.type){case"BYTES":{const e=null==(n=s.value)?void 0:n.bytesValue;return"string"==typeof e?yc.newValue({integerValue:Hr.fromBase64String(e).toUint8Array().length}):yc.newValue({integerValue:new Uint8Array(e).length})}case"STRING":{const e=function(e){let t=0;for(let n=0;n<e.length;n++){const r=e.codePointAt(n);if(void 0===r)return;if(r>=55296&&r<=57343){if(!(r<=56319))return;{const r=e.codePointAt(n+1);if(void 0===r||!(r>=56320&&r<=57343))return;t+=4,n++}}else if(r<=127)t+=1;else if(r<=2047)t+=2;else if(r<=65535)t+=3;else{if(!(r<=1114111))return;t+=4,n++}}return t}(null==(r=s.value)?void 0:r.stringValue);return void 0===e?yc.vr():yc.newValue({integerValue:e})}case"NULL":return yc.Dr();default:return yc.vr()}}}class gl{constructor(e){this.expr=e}evaluate(e,t){var n,r;Un(2===this.expr.params.length,39773,`${this.expr.name}() function should have exactly two parameters`);let s=!1;const i=wc(this.expr.params[0]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":s=!0;break;default:return yc.vr()}const a=wc(this.expr.params[1]).evaluate(e,t);switch(a.type){case"STRING":break;case"NULL":s=!0;break;default:return yc.vr()}return s?yc.Dr():this.kr(null==(n=i.value)?void 0:n.stringValue,null==(r=a.value)?void 0:r.stringValue)}}class ml extends gl{kr(e,t){try{const n=function(e){let t="";for(let n=0;n<e.length;n++){const r=e.charAt(n);switch(r){case"_":t+=".";break;case"%":t+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":t+="\\"+r;break;default:t+=r}}return"^"+t+"$"}(t),r=An.compile(n);return yc.newValue({booleanValue:r.matches(e)})}catch(n){return Ln(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${n}`),yc.vr()}}}class yl extends gl{kr(e,t){try{const n=An.compile(t);return yc.newValue({booleanValue:n.matcher(e).find()})}catch(n){return Ln(`Invalid regex pattern found in regex_contains: ${t}, returning error`),yc.vr()}}}class _l extends gl{kr(e,t){try{return yc.newValue({booleanValue:An.compile(t).matches(e)})}catch(n){return Ln(`Invalid regex pattern found in regex_match: ${t}, returning error`),yc.vr()}}}class vl extends gl{kr(e,t){return yc.newValue({booleanValue:e.includes(t)})}}class wl extends gl{kr(e,t){return yc.newValue({booleanValue:e.startsWith(t)})}}class El extends gl{kr(e,t){return yc.newValue({booleanValue:e.endsWith(t)})}}class Tl{constructor(e){this.expr=e}evaluate(e,t){var n,r;Un(1===this.expr.params.length,29079);const s=wc(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":return yc.newValue({stringValue:null==(r=null==(n=s.value)?void 0:n.stringValue)?void 0:r.toLowerCase()});case"NULL":return yc.Dr();default:return yc.vr()}}}class bl{constructor(e){this.expr=e}evaluate(e,t){var n,r;Un(1===this.expr.params.length,60487);const s=wc(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":return yc.newValue({stringValue:null==(r=null==(n=s.value)?void 0:n.stringValue)?void 0:r.toUpperCase()});case"NULL":return yc.Dr();default:return yc.vr()}}}class Il{constructor(e){this.expr=e}evaluate(e,t){var n,r;Un(1===this.expr.params.length,28544);const s=wc(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":return yc.newValue({stringValue:null==(r=null==(n=s.value)?void 0:n.stringValue)?void 0:r.trim()});case"NULL":return yc.Dr();default:return yc.vr()}}}class Cl{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(n=>wc(n).evaluate(e,t));let r="",s=!1;for(const i of n)switch(i.type){case"STRING":r+=i.value.stringValue;break;case"NULL":s=!0;break;default:return yc.vr()}return s?yc.Dr():yc.newValue({stringValue:r})}}class Al{constructor(e){this.expr=e}evaluate(e,t){var n,r,s,i;Un(2===this.expr.params.length,4483);const a=wc(this.expr.params[0]).evaluate(e,t);switch(a.type){case"UNSET":return yc.Sr();case"MAP":break;default:return yc.vr()}const o=wc(this.expr.params[1]).evaluate(e,t);if("STRING"!==o.type)return yc.vr();const u=null==(i=null==(r=null==(n=a.value)?void 0:n.mapValue)?void 0:r.fields)?void 0:i[null==(s=o.value)?void 0:s.stringValue];return void 0===u?yc.Sr():yc.newValue(u)}}class Sl{constructor(e){this.expr=e}evaluate(e,t){var n,r;Un(2===this.expr.params.length,25231,`${this.expr.name}() function should have exactly 2 params`);let s=!1;const i=wc(this.expr.params[0]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":s=!0;break;default:return yc.vr()}const a=wc(this.expr.params[1]).evaluate(e,t);switch(a.type){case"VECTOR":break;case"NULL":s=!0;break;default:return yc.vr()}if(s)return yc.Dr();const o=ks(i.value),u=ks(a.value);if(void 0===o||void 0===u||(null==(n=o.values)?void 0:n.length)!==(null==(r=u.values)?void 0:r.length))return yc.vr();const c=this.qr(o,u);return void 0===c||isNaN(c)?yc.vr():yc.newValue({doubleValue:c})}}class Nl extends Sl{qr(e,t){const n=(null==e?void 0:e.values)??[],r=(null==t?void 0:t.values)??[];if(0===n.length)return;let s=0,i=0,a=0;for(let u=0;u<n.length;u++){if(!Cs(n[u])||!Cs(r[u]))return;const e=Ic(n[u]),t=Ic(r[u]);s+=e*t,i+=e*e,a+=t*t}const o=Math.sqrt(i)*Math.sqrt(a);return 0!==o?1-Math.max(-1,Math.min(1,s/o)):void 0}}class Rl extends Sl{qr(e,t){const n=(null==e?void 0:e.values)??[],r=(null==t?void 0:t.values)??[];if(0===n.length)return 0;let s=0;for(let i=0;i<n.length;i++){if(!Cs(n[i])||!Cs(r[i]))return;s+=Ic(n[i])*Ic(r[i])}return s}}class Ol extends Sl{qr(e,t){const n=(null==e?void 0:e.values)??[],r=(null==t?void 0:t.values)??[];if(0===n.length)return 0;let s=0;for(let i=0;i<n.length;i++){if(!Cs(n[i])||!Cs(r[i]))return;const e=Ic(n[i]),t=Ic(r[i]);s+=Math.pow(e-t,2)}return Math.sqrt(s)}}class kl{constructor(e){this.expr=e}evaluate(e,t){var n;Un(1===this.expr.params.length,39044);const r=wc(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":{const e=ks(r.value);return yc.newValue({integerValue:(null==(n=null==e?void 0:e.values)?void 0:n.length)??0})}case"NULL":return yc.Dr();default:return yc.vr()}}}const Dl=BigInt(-62135596800),Ll=BigInt(253402300799),Pl=BigInt(1e3),xl=BigInt(1e6),Ml=Dl*Pl,Ul=Ll*Pl+BigInt(999),Vl=Dl*xl,Fl=Ll*xl+BigInt(999999);function Bl(e){return e>=Vl&&e<=Fl}function $l(e){return e>=Dl&&e<=Ll}function ql(e,t){const n=BigInt(e);return!(n<Dl||n>Ll||t<0||t>=1e9||n===Dl&&0!==t||n===Ll&&t>999999999)}function jl(e,t){return t<0?{seconds:e-1,nanos:t+1e9}:{seconds:e,nanos:t}}function Hl(e){return BigInt(e.seconds)*xl+BigInt(Math.trunc(e.nanoseconds/1e3))}class Gl{constructor(e){this.expr=e}evaluate(e,t){Un(1===this.expr.params.length,49262,`${this.expr.name}() function should have exactly one parameter`);const n=wc(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return this.toTimestamp(BigInt(n.value.integerValue));case"NULL":return yc.Dr();default:return yc.vr()}}}class zl extends Gl{toTimestamp(e){if(!Bl(e))return yc.vr();let t=Number(e/xl),n=Number(e%xl*BigInt(1e3));const r=jl(t,n);return t=r.seconds,n=r.nanos,ql(t,n)?yc.newValue({timestampValue:{seconds:t,nanos:n}}):yc.vr()}}class Kl extends Gl{toTimestamp(e){if(!((t=e)>=Ml&&t<=Ul))return yc.vr();var t;let n=Number(e/Pl),r=Number(e%Pl*BigInt(1e6));const s=jl(n,r);return n=s.seconds,r=s.nanos,ql(n,r)?yc.newValue({timestampValue:{seconds:n,nanos:r}}):yc.vr()}}class Wl extends Gl{toTimestamp(e){if(!$l(e))return yc.vr();const t=Number(e);return yc.newValue({timestampValue:{seconds:t,nanos:0}})}}class Yl{constructor(e){this.expr=e}evaluate(e,t){Un(1===this.expr.params.length,1265,`${this.expr.name}() function should have exactly one parameter`);const n=wc(this.expr.params[0]).evaluate(e,t);switch(n.type){case"TIMESTAMP":break;case"NULL":return yc.Dr();default:return yc.vr()}const r=$a(n.value.timestampValue);return ql(r.seconds,r.nanoseconds)?this.$r(r):yc.vr()}}class Ql extends Yl{$r(e){const t=Hl(e);return Bl(t)?yc.newValue({integerValue:`${t.toString()}`}):yc.vr()}}class Xl extends Yl{$r(e){const t=Hl(e),n=t/BigInt(1e3),r=t%BigInt(1e3);return n>BigInt(0)||r===BigInt(0)?yc.newValue({integerValue:n.toString()}):yc.newValue({integerValue:(n-BigInt(1)).toString()})}}class Jl extends Yl{$r(e){const t=BigInt(e.seconds);return $l(t)?yc.newValue({integerValue:t.toString()}):yc.vr()}}class Zl{constructor(e){this.expr=e}evaluate(e,t){Un(3===this.expr.params.length,2775,`${this.expr.name}() function should have exactly 3 parameters`);let n=!1;const r=wc(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":n=!0;break;default:return yc.vr()}const s=wc(this.expr.params[1]).evaluate(e,t);let i;switch(s.type){case"STRING":if(i=function(e){switch(e){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}}(s.value.stringValue),void 0===i)return yc.vr();break;case"NULL":n=!0;break;default:return yc.vr()}const a=wc(this.expr.params[2]).evaluate(e,t);switch(a.type){case"INT":break;case"NULL":n=!0;break;default:return yc.vr()}if(n)return yc.Dr();const o=BigInt(a.value.integerValue);let u;try{switch(i){case"microsecond":u=o;break;case"millisecond":u=o*BigInt(1e3);break;case"second":u=o*BigInt(1e6);break;case"minute":u=o*BigInt(6e7);break;case"hour":u=o*BigInt(36e8);break;case"day":u=o*BigInt(864e8);break;default:return yc.vr()}if("microsecond"!==i&&o!==BigInt(0)&&u/o!==BigInt(this.Kr(i)))return yc.vr()}catch(m){return Ln(`Error during timestamp arithmetic: ${m}`),yc.vr()}const c=$a(r.value.timestampValue);if(!ql(c.seconds,c.nanoseconds))return yc.vr();const l=Hl(c),h=this.Wr(l,u);if(!Bl(h))return yc.vr();const d=Number(h/xl),p=h%xl,f=Number((p<0?p+xl:p)*BigInt(1e3)),g=p<0?d-1:d;return ql(g,f)?yc.newValue({timestampValue:{seconds:g,nanos:f}}):yc.vr()}Kr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class eh extends Zl{Wr(e,t){return e+t}}class th extends Zl{Wr(e,t){return e-t}}function nh(e){if((e=vc(e))instanceof Fu)return`fld(${e.fieldName})`;if(e instanceof $u)return`cst(${t=e.value,null===t?"null":"number"==typeof t?t.toString():"string"==typeof t?`"${t}"`:t instanceof nu?`ref(${t.path})`:t instanceof au?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})`;var t;if(e instanceof Hu)return`fn(${e.name},[${e.params.map(nh).join(",")}])`;if("ListOfExpressions"===e.expressionType)return`list([${e.Rr.map(nh).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(e,null,2)}`)}function rh(e){return`${Array.from(e.entries()).sort().map(([e,t])=>`${e}=${nh(t)}`).join(",")}`}function sh(e){return e.stages.map(e=>function(e){if(e instanceof Xu)return`${e._name}(${rh(e.fields)})`;if(e instanceof Ju){let t=`${e._name}(${rh(e.accumulators)})`;return e.groups.size>0&&(t+=`grouping(${rh(e.groups)})`),t}if(e instanceof Zu)return`${e._name}(${rh(e.groups)})`;if(e instanceof ec)return`${e._name}(${e.Vr})`;if(e instanceof tc)return`${e._name}(${e.collectionId})`;if(e instanceof nc)return`${e._name}()`;if(e instanceof rc)return`${e._name}(${e.dr.sort()})`;if(e instanceof sc)return`${e._name}(${nh(e.condition)})`;if(e instanceof ic)return`${e._name}(${e.limit})`;if(e instanceof uc)return`${e._name}(${t=e.orderings,t.map(e=>`${nh(e.expr)}${e.direction}`).join(",")})`;var t;throw new Error(`Unrecognized stage ${e._name}`)}(e)).join("|")}function ih(e,t){return sh(e)===sh(t)}function ah(e){return e instanceof hc}function oh(e){return ah(e)?sh(e):Zi(e)}function uh(e){return ah(e)?sh(e):`${$i(Qi(t=e))}|lt:${t.limitType}`;var t}function ch(e,t){return e instanceof hc&&t instanceof hc?ih(e,t):!(e instanceof hc&&!(t instanceof hc)||!(e instanceof hc)&&t instanceof hc)&&function(e,t){return qi(Qi(e),Qi(t))&&e.limitType===t.limitType}(e,t)}function lh(e){return ji(e)?sh(e):$i(e)}function hh(e,t){return e instanceof hc&&t instanceof hc?ih(e,t):!(e instanceof hc&&!(t instanceof hc)||!(e instanceof hc)&&t instanceof hc)&&qi(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class dh{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&ai(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=oi(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=oi(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=fa();return this.mutations.forEach(r=>{const s=e.get(r.key),i=s.overlayedDocument;let a=this.applyToLocalView(i,s.mutatedFields);a=t.has(r.key)?null:a;const o=ii(i,a);null!==o&&n.set(r.key,o),i.isValidDocument()||i.convertToNoDocument(Er.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),_a())}isEqual(e){return this.batchId===e.batchId&&rr(this.mutations,e.mutations,(e,t)=>ci(e,t))&&rr(this.baseMutations,e.baseMutations,(e,t)=>ci(e,t))}}class ph{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){Un(e.mutations.length===n.length,58842,{Qr:e.mutations.length,Gr:n.length});let r=function(){return ma}();const s=e.mutations;for(let i=0;i<s.length;i++)r=r.insert(s[i].key,n[i].version);return new ph(e,t,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e,t,n,r,s=Er.min(),i=Er.min(),a=Hr.EMPTY_BYTE_STRING,o=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=a,this.expectedCount=o}withSequenceNumber(e){return new gh(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new gh(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new gh(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new gh(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(e){this.zr=e}}function yh(e){const t=no({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Ji(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(){this.Hi=new vh}addToCollectionParentIndex(e,t){return this.Hi.add(t),Sr.resolve()}getCollectionParents(e,t){return Sr.resolve(this.Hi.getEntries(t))}addFieldIndex(e,t){return Sr.resolve()}deleteFieldIndex(e,t){return Sr.resolve()}deleteAllFieldIndexes(e){return Sr.resolve()}createTargetIndexes(e,t){return Sr.resolve()}getDocumentsMatchingTarget(e,t){return Sr.resolve(null)}getIndexType(e,t){return Sr.resolve(0)}getFieldIndexes(e,t){return Sr.resolve([])}getNextCollectionGroupToUpdate(e){return Sr.resolve(null)}getMinOffset(e,t){return Sr.resolve(br.min())}getMinOffsetFromCollectionGroup(e,t){return Sr.resolve(br.min())}updateCollectionGroup(e,t,n){return Sr.resolve()}updateIndexEntries(e,t){return Sr.resolve()}}class vh{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new Ur(ar.comparator),s=!r.has(n);return this.index[t]=r.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new Ur(ar.comparator)).toArray()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(e){this.Ds=e}next(){return this.Ds+=2,this.Ds}static xs(){return new wh(0)}static Cs(){return new wh(-1)}}
// Copyright 2024 Google LLC* @license
function Eh(e,t){var n;let r=t;for(const s of e.stages)r=bh({serializer:e.serializer,serverTimestampBehavior:null==(n=e.listenOptions)?void 0:n.serverTimestampBehavior},s,r);return r}function Th(e,t){return Eh(e,[t]).length>0}function bh(e,t,n){if(t instanceof ec)return r=t,n.filter(e=>e.isFoundDocument()&&`/${e.key.getCollectionPath().canonicalString()}`===r.Vr);var r;if(t instanceof sc)return function(e,t,n){return n.filter(n=>{const r=_c(wc(t.condition).evaluate(e,n));return void 0!==r&&fs(r,hs)})}(e,t,n);if(t instanceof tc)return function(e,t,n){return n.filter(e=>e.isFoundDocument()&&e.key.getCollectionPath().lastSegment()===t.collectionId)}(0,t,n);if(t instanceof nc)return function(e,t,n){return n.filter(e=>e.isFoundDocument())}(0,0,n);if(t instanceof rc)return function(e,t,n){return n.filter(e=>e.isFoundDocument()&&t.mr.has(e.key.path.toStringWithLeadingSlash()))}(0,t,n);if(t instanceof ic)return function(e,t,n){return n.slice(0,t.limit)}(0,t,n);if(t instanceof uc)return function(e,t,n){const r=t.orderings.map(e=>({ks:wc(e.expr),direction:e.direction}));return[...n].sort((t,n)=>{for(const{ks:s,direction:i}of r){const r=_c(s.evaluate(e,t)),a=_c(s.evaluate(e,n)),o=ms(r??ls,a??ls);if(0!==o)return"ascending"===i?o:-o}return 0})}(e,t,n);throw new Error(`Unknown stage: ${t._name}`)}function Ih(e){const t=function(e){for(let t=e.stages.length-1;t>=0;t--){const n=e.stages[t];if(n instanceof uc)return n.orderings}throw new Error("Pipeline must contain at least one Sort stage")}(e);return(n,r)=>{for(const s of t){const t=_c(wc(s.expr).evaluate({serializer:e.serializer},n)),i=_c(wc(s.expr).evaluate({serializer:e.serializer},r)),a=ms(t||ls,i||ls);if(0!==a)return"ascending"===s.direction?a:-a}return 0}}function Ch(e){for(let t=e.stages.length-1;t>=0;t--){const n=e.stages[t];if(n instanceof ic)return{limit:n.limit}}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(){this.changes=new oa(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Vi.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?Sr.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&oi(n.mutation,e,Fr.empty(),wr.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,_a()).next(()=>t))}getLocalViewOfDocuments(e,t,n=_a()){const r=pa();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=ha();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=pa();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,_a()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let s=ca();const i=ga(),a=ga();return t.forEach((e,t)=>{const a=n.get(t.key);r.has(t.key)&&(void 0===a||a.mutation instanceof hi)?s=s.insert(t.key,t):void 0!==a?(i.set(t.key,a.mutation.getFieldMask()),oi(a.mutation,t,a.mutation.getFieldMask(),wr.now())):i.set(t.key,Fr.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>a.set(e,new Sh(t,i.get(e)??null))),a))}recalculateAndSaveOverlays(e,t){const n=ga();let r=new Pr((e,t)=>e-t),s=_a();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const s of e)s.keys().forEach(e=>{const i=t.get(e);if(null===i)return;let a=n.get(e)||Fr.empty();a=s.applyToLocalView(i,a),n.set(e,a);const o=(r.get(s.batchId)||_a()).add(e);r=r.insert(s.batchId,o)})}).next(()=>{const i=[],a=r.getReverseIterator();for(;a.hasNext();){const r=a.getNext(),o=r.key,u=r.value,c=fa();u.forEach(e=>{if(!s.has(e)){const r=ii(t.get(e),n.get(e));null!==r&&c.set(e,r),s=s.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,o,c))}return Sr.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return ah(t)?this.getDocumentsMatchingPipeline(e,t,n,r):function(e){return cr.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Wi(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-s.size):Sr.resolve(pa());let a=-1,o=s;return i.next(t=>Sr.forEach(t,(t,n)=>(a<n.largestBatchId&&(a=n.largestBatchId),s.get(t)?Sr.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,o,t,_a())).next(e=>({batchId:a,changes:da(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new cr(t)).next(e=>{let t=ha();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const s=t.collectionGroup;let i=ha();return this.indexManager.getCollectionParents(e,s).next(a=>Sr.forEach(a,a=>{const o=(u=t,c=a.child(s),new Gi(c,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt));var u,c;return this.getDocumentsMatchingCollectionQuery(e,o,n,r).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,r))).next(e=>this.retrieveMatchingLocalDocuments(s,e,e=>ea(t,e)))}getDocumentsMatchingPipeline(e,t,n,r){if("collection_group"===dc(t)){const s=fc(t);let i=ha();return this.indexManager.getCollectionParents(e,s).next(a=>Sr.forEach(a,a=>{const o=function(e,t){const n=e.stages.map(e=>e instanceof tc?new ec(t.canonicalString(),{}):e);return new hc(e.serializer,n)}(t,a.child(s));return this.getDocumentsMatchingPipeline(e,o,n,r).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}{let s;return this.getOverlaysForPipeline(e,t,n.largestBatchId).next(i=>{switch(s=i,dc(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,r);case"documents":let i=_a();for(const e of gc(t))i=i.add(cr.fromPath(e));return this.remoteDocumentCache.getEntries(e,i);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new Bn("invalid-argument",`Invalid pipeline source to execute offline: ${sh(t)}`)}}).next(e=>this.retrieveMatchingLocalDocuments(s,e,e=>Th(t,e)))}}retrieveMatchingLocalDocuments(e,t,n){e.forEach((e,n)=>{const r=n.getKey();null===t.get(r)&&(t=t.insert(r,Vi.newInvalidDocument(r)))});let r=ha();return t.forEach((t,s)=>{const i=e.get(t);void 0!==i&&oi(i.mutation,s,Fr.empty(),wr.now()),n(s)&&(r=r.insert(t,s))}),r}getOverlaysForPipeline(e,t,n){switch(dc(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,ar.fromString(pc(t)),n);case"collection_group":throw new Bn("invalid-argument",`Unexpected collection group pipeline: ${sh(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,gc(t).map(e=>cr.fromPath(e)));case"database":return this.documentOverlayCache.getAllOverlays(e,n);default:throw new Bn("invalid-argument",`Failed to get overlays for pipeline: ${sh(t)}`)}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{constructor(e){this.serializer=e,this.Hs=new Map,this.Js=new Map}getBundleMetadata(e,t){return Sr.resolve(this.Hs.get(t))}saveBundleMetadata(e,t){return this.Hs.set(t.id,{id:(n=t).id,version:n.version,createTime:Ha(n.createTime)}),Sr.resolve();var n}getNamedQuery(e,t){return Sr.resolve(this.Js.get(t))}saveNamedQuery(e,t){return this.Js.set(t.name,{name:(n=t).name,query:yh(n.bundledQuery),readTime:Ha(n.readTime)}),Sr.resolve();var n}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(){this.overlays=new Pr(cr.comparator),this.Ys=new Map}getOverlay(e,t){return Sr.resolve(this.overlays.get(t))}getOverlays(e,t){const n=pa();return Sr.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}getAllOverlays(e,t){const n=pa();return this.overlays.forEach((e,r)=>{r.largestBatchId>t&&n.set(e,r)}),Sr.resolve(n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.Hr(e,t,r)}),Sr.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.Ys.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.Ys.delete(n)),Sr.resolve()}getOverlaysForCollection(e,t,n){const r=pa(),s=t.length+1,i=new cr(t.child("")),a=this.overlays.getIteratorFrom(i);for(;a.hasNext();){const e=a.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===s&&e.largestBatchId>n&&r.set(e.getKey(),e)}return Sr.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let s=new Pr((e,t)=>e-t);const i=this.overlays.getIterator();for(;i.hasNext();){const e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=s.get(e.largestBatchId);null===t&&(t=pa(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const a=pa(),o=s.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=r)););return Sr.resolve(a)}Hr(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.Ys.get(r.largestBatchId).delete(n.key);this.Ys.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new fh(t,n));let s=this.Ys.get(t);void 0===s&&(s=_a(),this.Ys.set(t,s)),this.Ys.set(t,s.add(n.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{constructor(){this.sessionToken=Hr.EMPTY_BYTE_STRING}getSessionToken(e){return Sr.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,Sr.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(){this.Zs=new Ur(Lh.Xs),this.e_=new Ur(Lh.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(e,t){const n=new Lh(e,t);this.Zs=this.Zs.add(n),this.e_=this.e_.add(n)}n_(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.r_(new Lh(e,t))}i_(e,t){e.forEach(e=>this.removeReference(e,t))}s_(e){const t=new cr(new ar([])),n=new Lh(t,e),r=new Lh(t,e+1),s=[];return this.e_.forEachInRange([n,r],e=>{this.r_(e),s.push(e.key)}),s}__(){this.Zs.forEach(e=>this.r_(e))}r_(e){this.Zs=this.Zs.delete(e),this.e_=this.e_.delete(e)}o_(e){const t=new cr(new ar([])),n=new Lh(t,e),r=new Lh(t,e+1);let s=_a();return this.e_.forEachInRange([n,r],e=>{s=s.add(e.key)}),s}containsKey(e){const t=new Lh(e,0),n=this.Zs.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class Lh{constructor(e,t){this.key=e,this.a_=t}static Xs(e,t){return cr.comparator(e.key,t.key)||Jn(e.a_,t.a_)}static t_(e,t){return Jn(e.a_,t.a_)||cr.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.gs=1,this.u_=new Ur(Lh.Xs)}checkEmpty(e){return Sr.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const s=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new dh(s,t,n,r);this.mutationQueue.push(i);for(const a of r)this.u_=this.u_.add(new Lh(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return Sr.resolve(i)}lookupMutationBatch(e,t){return Sr.resolve(this.c_(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.l_(n),s=r<0?0:r;return Sr.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return Sr.resolve(0===this.mutationQueue.length?-1:this.gs-1)}getAllMutationBatches(e){return Sr.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Lh(t,0),r=new Lh(t,Number.POSITIVE_INFINITY),s=[];return this.u_.forEachInRange([n,r],e=>{const t=this.c_(e.a_);s.push(t)}),Sr.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Ur(Jn);return t.forEach(e=>{const t=new Lh(e,0),r=new Lh(e,Number.POSITIVE_INFINITY);this.u_.forEachInRange([t,r],e=>{n=n.add(e.a_)})}),Sr.resolve(this.E_(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let s=n;cr.isDocumentKey(s)||(s=s.child(""));const i=new Lh(new cr(s),0);let a=new Ur(Jn);return this.u_.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(a=a.add(e.a_)),!0)},i),Sr.resolve(this.E_(a))}E_(e){const t=[];return e.forEach(e=>{const n=this.c_(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){Un(0===this.h_(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.u_;return Sr.forEach(t.mutations,r=>{const s=new Lh(r.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.u_=n})}bs(e){}containsKey(e,t){const n=new Lh(t,0),r=this.u_.firstAfterOrEqual(n);return Sr.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,Sr.resolve()}h_(e,t){return this.l_(e)}l_(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}c_(e){const t=this.l_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(e){this.T_=e,this.docs=new Pr(cr.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),s=r?r.size:0,i=this.T_(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return Sr.resolve(n?n.document.mutableCopy():Vi.newInvalidDocument(t))}getEntries(e,t){let n=ca();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Vi.newInvalidDocument(e))}),Sr.resolve(n)}getAllEntries(e){let t=ca();return this.docs.forEach((e,n)=>{t=t.insert(e,n.document)}),Sr.resolve(t)}getDocumentsMatchingQuery(e,t,n,r){let s,i;ah(t)?(s=ar.fromString(pc(t)),i=e=>Th(t,e)):(s=t.path,i=e=>ea(t,e));let a=ca();const o=new cr(s.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(o);for(;u.hasNext();){const{key:e,value:{document:t}}=u.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||Ir(Tr(t),n)<=0||(r.has(t.key)||i(t))&&(a=a.insert(t.key,t.mutableCopy()))}return Sr.resolve(a)}getAllFromCollectionGroup(e,t,n,r){xn(9500)}P_(e,t){return Sr.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new Mh(this)}getSize(e){return Sr.resolve(this.size)}}class Mh extends Ah{constructor(e){super(),this.zs=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.zs.addEntry(e,r)):this.zs.removeEntry(n)}),Sr.waitFor(t)}getFromCache(e,t){return this.zs.getEntry(e,t)}getAllFromCache(e,t){return this.zs.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uh{constructor(e){this.persistence=e,this.R_=new oa(e=>lh(e),hh),this.lastRemoteSnapshotVersion=Er.min(),this.highestTargetId=0,this.I_=0,this.A_=new Dh,this.targetCount=0,this.V_=wh.xs()}forEachTarget(e,t){return this.R_.forEach((e,n)=>t(n)),Sr.resolve()}getLastRemoteSnapshotVersion(e){return Sr.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return Sr.resolve(this.I_)}allocateTargetId(e){return this.highestTargetId=this.V_.next(),Sr.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.I_&&(this.I_=t),Sr.resolve()}Ms(e){this.R_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.V_=new wh(t),this.highestTargetId=t),e.sequenceNumber>this.I_&&(this.I_=e.sequenceNumber)}addTargetData(e,t){return this.Ms(t),this.targetCount+=1,Sr.resolve()}updateTargetData(e,t){return this.Ms(t),Sr.resolve()}removeTargetData(e,t){return this.R_.delete(t.target),this.A_.s_(t.targetId),this.targetCount-=1,Sr.resolve()}removeTargets(e,t,n){let r=0;const s=[];return this.R_.forEach((i,a)=>{a.sequenceNumber<=t&&null===n.get(a.targetId)&&(this.R_.delete(i),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),Sr.waitFor(s).next(()=>r)}getTargetCount(e){return Sr.resolve(this.targetCount)}getTargetData(e,t){const n=this.R_.get(t)||null;return Sr.resolve(n)}addMatchingKeys(e,t,n){return this.A_.n_(t,n),Sr.resolve()}removeMatchingKeys(e,t,n){this.A_.i_(t,n);const r=this.persistence.referenceDelegate,s=[];return r&&t.forEach(t=>{s.push(r.markPotentiallyOrphaned(e,t))}),Sr.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.A_.s_(t),Sr.resolve()}getMatchingKeysForTargetId(e,t){const n=this.A_.o_(t);return Sr.resolve(n)}containsKey(e,t){return Sr.resolve(this.A_.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vh{constructor(e,t){this.d_={},this.overlays={},this.f_=new Rr(0),this.m_=!1,this.m_=!0,this.p_=new kh,this.referenceDelegate=e(this),this.g_=new Uh(this),this.indexManager=new _h,this.remoteDocumentCache=new xh(e=>this.referenceDelegate.y_(e)),this.serializer=new mh(t),this.w_=new Rh(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Oh,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.d_[e.toKey()];return n||(n=new Ph(t,this.referenceDelegate),this.d_[e.toKey()]=n),n}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(e,t,n){kn("MemoryPersistence","Starting transaction:",e);const r=new Fh(this.f_.next());return this.referenceDelegate.b_(),n(r).next(e=>this.referenceDelegate.v_(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}S_(e,t){return Sr.or(Object.values(this.d_).map(n=>()=>n.containsKey(e,t)))}}class Fh extends Cr{constructor(e){super(),this.currentSequenceNumber=e}}class Bh{constructor(e){this.persistence=e,this.D_=new Dh,this.x_=null}static C_(e){return new Bh(e)}get F_(){if(this.x_)return this.x_;throw xn(60996)}addReference(e,t,n){return this.D_.addReference(n,t),this.F_.delete(n.toString()),Sr.resolve()}removeReference(e,t,n){return this.D_.removeReference(n,t),this.F_.add(n.toString()),Sr.resolve()}markPotentiallyOrphaned(e,t){return this.F_.add(t.toString()),Sr.resolve()}removeTarget(e,t){this.D_.s_(t.targetId).forEach(e=>this.F_.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.F_.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}b_(){this.x_=new Set}v_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Sr.forEach(this.F_,n=>{const r=cr.fromPath(n);return this.O_(e,r).next(e=>{e||t.removeEntry(r,Er.min())})}).next(()=>(this.x_=null,t.apply(e)))}updateLimboDocument(e,t){return this.O_(e,t).next(e=>{e?this.F_.delete(t.toString()):this.F_.add(t.toString())})}y_(e){return 0}O_(e,t){return Sr.or([()=>Sr.resolve(this.D_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.S_(e,t)])}}class $h{constructor(e,t){this.persistence=e,this.M_=new oa(e=>function(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=Lr(t)),t=Dr(e.get(n),t);return Lr(t)}(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=function(e,t){return new Qo(e,t)}(this,t)}static C_(e,t){return new $h(e,t)}b_(){}v_(e){return Sr.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}lr(e){const t=this.Ls(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}Ls(e){let t=0;return this.Er(e,e=>{t++}).next(()=>t)}Er(e,t){return Sr.forEach(this.M_,(n,r)=>this.Us(e,n,r).next(e=>e?Sr.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.P_(e,r=>this.Us(e,r,t).next(e=>{e||(n++,s.removeEntry(r,Er.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.M_.set(t,e.currentSequenceNumber),Sr.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.M_.set(n,e.currentSequenceNumber),Sr.resolve()}removeReference(e,t,n){return this.M_.set(n,e.currentSequenceNumber),Sr.resolve()}updateLimboDocument(e,t){return this.M_.set(t,e.currentSequenceNumber),Sr.resolve()}y_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Es(e.data.value)),t}Us(e,t,n){return Sr.or([()=>this.persistence.S_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.M_.get(t);return Sr.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.wo=n,this.bo=r}static vo(e,t){let n=_a(),r=_a();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new qh(e,t.fromCache,n,r)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jh(e,t){return cr.comparator(e.key,t.key)}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=y()?8:function(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}(m())>0?6:4}initialize(e,t){this.Fo=e,this.indexManager=t,this.So=!0}getDocumentsMatchingQuery(e,t,n,r){const s={result:null};return this.Oo(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.Mo(e,t,r,n).next(e=>{s.result=e})}).next(()=>{if(s.result)return;const n=new Hh;return this.No(e,t,n).next(r=>{if(s.result=r,this.Do)return this.Lo(e,t,n,r.size)})}).next(()=>s.result)}Lo(e,t,n,r){return ah(t)?Sr.resolve():n.documentReadCount<this.xo?(On()<=x.DEBUG&&kn("QueryEngine","SDK will not create cache indexes for query:",Zi(t),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),Sr.resolve()):(On()<=x.DEBUG&&kn("QueryEngine","Query:",Zi(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.Co*r?(On()<=x.DEBUG&&kn("QueryEngine","The SDK decides to create cache indexes for query:",Zi(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Qi(t))):Sr.resolve())}Oo(e,t){if(ah(t))return Sr.resolve(null);let n=t;if(Ki(n))return Sr.resolve(null);let r=Qi(n);return this.indexManager.getIndexType(e,r).next(t=>0===t?null:(null!==n.limit&&1===t&&(n=Ji(n,null,"F"),r=Qi(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(t=>{const s=_a(...t);return this.Fo.getDocuments(e,s).next(t=>this.indexManager.getMinOffset(e,r).next(r=>{const i=this.Bo(n,t);return this.Uo(n,i,s,r.readTime)?this.Oo(e,Ji(n,null,"F")):this.ko(e,i,n,r)}))})))}Mo(e,t,n,r){return(ah(t)?function(e){for(const t of e.stages){if(t instanceof ic||t instanceof ac)return!1;if(t instanceof sc){if(t.condition instanceof zu&&"exists"===t.condition._expr.name&&t.condition._expr.params[0]instanceof Fu&&t.condition._expr.params[0].fieldName===sr)continue;return!1}}return!0}(t):Ki(t))||r.isEqual(Er.min())?Sr.resolve(null):this.Fo.getDocuments(e,n).next(s=>{const i=this.Bo(t,s);return this.Uo(t,i,n,r)?Sr.resolve(null):(On()<=x.DEBUG&&kn("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),oh(t)),this.ko(e,i,t,function(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=Er.fromTimestamp(1e9===r?new wr(n+1,0):new wr(n,r));return new br(s,cr.empty(),t)}(r,-1)).next(e=>e))})}Bo(e,t){let n,r;return ah(e)?(n=new Ur(jh),r=t=>Th(e,t)):(n=new Ur(ta(e)),r=t=>ea(e,t)),t.forEach((e,t)=>{r(t)&&(n=n.add(t))}),n}Uo(e,t,n,r){if(ah(e))return e.stages.some(e=>e instanceof ic||e instanceof ac);if(null===e.limit)return!1;if(n.size!==t.size)return!0;const s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}No(e,t,n){return On()<=x.DEBUG&&kn("QueryEngine","Using full collection scan to execute query:",oh(t)),this.Fo.getDocumentsMatchingQuery(e,t,br.min(),n)}ko(e,t,n,r){return this.Fo.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh="LocalStore";class Kh{constructor(e,t,n,r){this.persistence=e,this.qo=t,this.serializer=r,this.$o=new Pr(Jn),this.Ko=new oa(e=>lh(e),hh),this.Wo=new Map,this.Qo=e.getRemoteDocumentCache(),this.g_=e.getTargetCache(),this.w_=e.getBundleCache(),this.Go(n)}Go(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Nh(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.$o))}}async function Wh(e,t){const n=Vn(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(s=>(r=s,n.Go(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const s=[],i=[];let a=_a();for(const e of r){s.push(e.batchId);for(const t of e.mutations)a=a.add(t.key)}for(const e of t){i.push(e.batchId);for(const t of e.mutations)a=a.add(t.key)}return n.localDocuments.getDocuments(e,a).next(e=>({zo:e,removedBatchIds:s,addedBatchIds:i}))})})}function Yh(e){const t=Vn(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.g_.getLastRemoteSnapshotVersion(e))}function Qh(e,t){const n=Vn(e),r=t.snapshotVersion;let s=n.$o;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const i=n.Qo.newChangeBuffer({trackRemovals:!0});s=n.$o;const a=[];t.targetChanges.forEach((i,o)=>{const u=s.get(o);if(!u)return;a.push(n.g_.removeMatchingKeys(e,i.removedDocuments,o).next(()=>n.g_.addMatchingKeys(e,i.addedDocuments,o)));let c=u.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(o)?c=c.withResumeToken(Hr.EMPTY_BYTE_STRING,Er.min()).withLastLimboFreeSnapshotVersion(Er.min()):i.resumeToken.approximateByteSize()>0&&(c=c.withResumeToken(i.resumeToken,r)),s=s.insert(o,c),function(e,t,n){if(0===e.resumeToken.approximateByteSize())return!0;if(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8)return!0;return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(u,c,i)&&a.push(n.g_.updateTargetData(e,c))});let o=ca(),u=_a();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),a.push(function(e,t,n){let r=_a(),s=_a();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=ca();return n.forEach((n,i)=>{const a=e.get(n);i.isFoundDocument()!==a.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(Er.min())?(t.removeEntry(n,i.readTime),r=r.insert(n,i)):!a.isValidDocument()||i.version.compareTo(a.version)>0||0===i.version.compareTo(a.version)&&a.hasPendingWrites?(t.addEntry(i),r=r.insert(n,i)):kn(zh,"Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",i.version)}),{jo:r,Ho:s}})}(e,i,t.documentUpdates).next(e=>{o=e.jo,u=e.Ho})),!r.isEqual(Er.min())){const t=n.g_.getLastRemoteSnapshotVersion(e).next(t=>n.g_.setTargetsMetadata(e,e.currentSequenceNumber,r));a.push(t)}return Sr.waitFor(a).next(()=>i.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,o,u)).next(()=>o)}).then(e=>(n.$o=s,e))}function Xh(e,t){const n=Vn(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}async function Jh(e,t,n){const r=Vn(e),s=r.$o.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,e=>r.persistence.referenceDelegate.removeTarget(e,s))}catch(a){if(!Nr(a))throw a;kn(zh,`Failed to update sequence numbers for target ${t}: ${a}`)}r.$o=r.$o.remove(t),r.Ko.delete(s.target)}function Zh(e,t,n){const r=Vn(e);let s=Er.min(),i=_a();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=Vn(e),s=r.Ko.get(n);return void 0!==s?Sr.resolve(r.$o.get(s)):r.g_.getTargetData(t,n)}(r,e,ah(t)?t:Qi(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,r.g_.getMatchingKeysForTargetId(e,t.targetId).next(e=>{i=e})}).next(()=>r.qo.getDocumentsMatchingQuery(e,t,n?s:Er.min(),n?i:_a())).next(e=>(function(e,t){t.forEach((t,n)=>{const r=n.key.getCollectionGroup(),s=e.Wo.get(r)||Er.min();n.readTime.compareTo(s)>0&&e.Wo.set(r,n.readTime)})}(r,e),{documents:e,Jo:i})))}class ed{constructor(){this.activeTargetIds=va}na(e){this.activeTargetIds=this.activeTargetIds.add(e)}ra(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ta(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class td{constructor(){this.Ua=new ed,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Ua.na(e),this.ka[e]||"not-current"}updateQueryState(e,t,n){this.ka[e]=t}removeLocalQueryTarget(e){this.Ua.ra(e)}isLocalQueryTarget(e){return this.Ua.activeTargetIds.has(e)}clearQueryState(e){delete this.ka[e]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(e){return this.Ua.activeTargetIds.has(e)}start(){return this.Ua=new ed,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function nd(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){0===this.qa&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve())))}za(e){"Online"===this.state?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Qa("Offline")))}set(e){this.ja(),this.qa=0,"Online"===e&&(this.Ka=!1),this.Qa(e)}Qa(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}Ga(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(Dn(t),this.Ka=!1):kn("OnlineStateTracker",t)}ja(){null!==this.$a&&(this.$a.cancel(),this.$a=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sd="RemoteStore";class id{constructor(e,t,n,r,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new wh(1e3),this.eu=new wh(1001),this.tu=new Set,this.nu=[],this.ru=s,this.ru.bt(e=>{n.enqueueAndForget(async()=>{gd(this)&&(kn(sd,"Restarting streams for network reachability change."),await async function(e){const t=Vn(e);t.tu.add(4),await od(t),t.iu.set("Unknown"),t.tu.delete(4),await ad(t)}(this))})}),this.iu=new rd(n,r)}}async function ad(e){if(gd(e))for(const t of e.nu)await t(!0)}async function od(e){for(const t of e.nu)await t(!1)}function ud(e,t){return e.Ya.get(t)||void 0}function cd(e,t){const n=Vn(e),r=ud(n,t.targetId);if(void 0!==r&&n.Ja.has(r))return;const s=function(e,t){const n=ud(e,t);void 0!==n&&e.Za.delete(n);const r=(s=e,t%2!=0?s.eu.next():s.Xa.next());var s;return e.Ya.set(t,r),e.Za.set(r,t),r}(n,t.targetId);kn(sd,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const i=new gh(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);n.Ja.set(s,i),fd(n)?pd(n):Ld(n).Fn()&&hd(n,i)}function ld(e,t){const n=Vn(e),r=Ld(n),s=ud(n,t);kn(sd,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),n.Ja.delete(s),n.Ya.delete(t),n.Za.delete(s),r.Fn()&&dd(n,s),0===n.Ja.size&&(r.Fn()?r.Nn():gd(n)&&n.iu.set("Unknown"))}function hd(e,t){if(e.su.We(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(Er.min())>0){const n=e.Za.get(t.targetId);if(void 0===n)return void kn(sd,"SDK target ID not found for remote ID: "+t.targetId);const r=e.remoteSyncer.getRemoteKeysForTarget(n).size;t=t.withExpectedCount(r)}Ld(e).jn(t)}function dd(e,t){e.su.We(t),Ld(e).Hn(t)}function pd(e){e.su=new Da({getRemoteKeysForTarget:t=>{const n=e.Za.get(t);return void 0!==n?e.remoteSyncer.getRemoteKeysForTarget(n):_a()},dt:t=>e.Ja.get(t)||null,Tt:()=>e.datastore.serializer.databaseId}),Ld(e).start(),e.iu.Wa()}function fd(e){return gd(e)&&!Ld(e).Cn()&&e.Ja.size>0}function gd(e){return 0===Vn(e).tu.size}function md(e){e.su=void 0}async function yd(e){e.iu.set("Online")}async function _d(e){e.Ja.forEach((t,n)=>{hd(e,t)})}async function vd(e,t){md(e),fd(e)?(e.iu.za(t),pd(e)):e.iu.set("Unknown")}async function wd(e,t,n){if(e.iu.set("Online"),t instanceof Ra&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds){if(e.Ja.has(r)){const t=e.Za.get(r);void 0!==t&&(await e.remoteSyncer.rejectListen(t,n),e.Ya.delete(t),e.Za.delete(r)),e.Ja.delete(r)}e.su.removeTarget(r)}}(e,t)}catch(r){kn(sd,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Ed(e,r)}else if(t instanceof Sa?e.su.et(t):t instanceof Na?e.su.ot(t):e.su.rt(t),!n.isEqual(Er.min()))try{const t=await Yh(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.su.Rt(t);n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=e.Ja.get(r);s&&e.Ja.set(r,s.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ja.get(t);if(!r)return;e.Ja.set(t,r.withResumeToken(Hr.EMPTY_BYTE_STRING,r.snapshotVersion)),dd(e,t);const s=new gh(r.target,t,n,r.sequenceNumber);hd(e,s)});const r=function(e,t){const n=new Map;t.targetChanges.forEach((t,r)=>{const s=e.Za.get(r);void 0!==s&&n.set(s,t)});let r=new Pr(Jn);return t.targetMismatches.forEach((t,n)=>{const s=e.Za.get(t);void 0!==s&&(r=r.insert(s,n))}),new Ca(t.snapshotVersion,n,r,t.documentUpdates,t.augmentedDocumentUpdates,t.resolvedLimboDocuments)}(e,n);return e.remoteSyncer.applyRemoteEvent(r)}(e,n)}catch(s){kn(sd,"Failed to raise snapshot:",s),await Ed(e,s)}}async function Ed(e,t,n){if(!Nr(t))throw t;e.tu.add(1),await od(e),e.iu.set("Offline"),n||(n=()=>Yh(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{kn(sd,"Retrying IndexedDB access"),await n(),e.tu.delete(1),await ad(e)})}function Td(e,t){return t().catch(n=>Ed(e,n,t))}async function bd(e){const t=Vn(e),n=Pd(t);let r=t.Ha.length>0?t.Ha[t.Ha.length-1].batchId:-1;for(;Id(t);)try{const e=await Xh(t.localStore,r);if(null===e){0===t.Ha.length&&n.Nn();break}r=e.batchId,Cd(t,e)}catch(s){await Ed(t,s)}Ad(t)&&Sd(t)}function Id(e){return gd(e)&&e.Ha.length<10}function Cd(e,t){e.Ha.push(t);const n=Pd(e);n.Fn()&&n.Jn&&n.Yn(t.mutations)}function Ad(e){return gd(e)&&!Pd(e).Cn()&&e.Ha.length>0}function Sd(e){Pd(e).start()}async function Nd(e){Pd(e).er()}async function Rd(e){const t=Pd(e);for(const n of e.Ha)t.Yn(n.mutations)}async function Od(e,t,n){const r=e.Ha.shift(),s=ph.from(r,t,n);await Td(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await bd(e)}async function kd(e,t){t&&Pd(e).Jn&&await async function(e,t){if(function(e){switch(e){case Fn.OK:return xn(64938);case Fn.CANCELLED:case Fn.UNKNOWN:case Fn.DEADLINE_EXCEEDED:case Fn.RESOURCE_EXHAUSTED:case Fn.INTERNAL:case Fn.UNAVAILABLE:case Fn.UNAUTHENTICATED:return!1;case Fn.INVALID_ARGUMENT:case Fn.NOT_FOUND:case Fn.ALREADY_EXISTS:case Fn.PERMISSION_DENIED:case Fn.FAILED_PRECONDITION:case Fn.ABORTED:case Fn.OUT_OF_RANGE:case Fn.UNIMPLEMENTED:case Fn.DATA_LOSS:return!0;default:return xn(15467,{code:e})}}(n=t.code)&&n!==Fn.ABORTED){const n=e.Ha.shift();Pd(e).Mn(),await Td(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await bd(e)}var n}(e,t),Ad(e)&&Sd(e)}async function Dd(e,t){const n=Vn(e);n.asyncQueue.verifyOperationInProgress(),kn(sd,"RemoteStore received new credentials");const r=gd(n);n.tu.add(3),await od(n),r&&n.iu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.tu.delete(3),await ad(n)}function Ld(e){return e._u||(e._u=function(e,t,n){const r=Vn(e);return r.nr(),new Vo(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Qt:yd.bind(null,e),zt:_d.bind(null,e),Ht:vd.bind(null,e),zn:wd.bind(null,e)}),e.nu.push(async t=>{t?(e._u.Mn(),fd(e)?pd(e):e.iu.set("Unknown")):(await e._u.stop(),md(e))})),e._u}function Pd(e){return e.ou||(e.ou=function(e,t,n){const r=Vn(e);return r.nr(),new Fo(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Qt:()=>Promise.resolve(),zt:Nd.bind(null,e),Ht:kd.bind(null,e),Zn:Rd.bind(null,e),Xn:Od.bind(null,e)}),e.nu.push(async t=>{t?(e.ou.Mn(),await bd(e)):(await e.ou.stop(),e.Ha.length>0&&(kn(sd,`Stopping write stream with ${e.Ha.length} pending writes`),e.Ha=[]))})),e.ou
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class xd{constructor(e,t,n,r,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new $n,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,s){const i=Date.now()+n,a=new xd(e,t,i,r,s);return a.start(n),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Bn(Fn.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Md(e,t){if(Dn("AsyncQueue",`${t}: ${e}`),Nr(e))return new Bn(Fn.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{static emptySet(e){return new Ud(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||cr.comparator(t.key,n.key):(e,t)=>cr.comparator(e.key,t.key),this.keyedMap=ha(),this.sortedSet=new Pr(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ud))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Ud;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(){this.au=new Pr(cr.comparator)}track(e){const t=e.doc.key,n=this.au.get(t);n?0!==e.type&&3===n.type?this.au=this.au.insert(t,e):3===e.type&&1!==n.type?this.au=this.au.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.au=this.au.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.au=this.au.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.au=this.au.remove(t):1===e.type&&2===n.type?this.au=this.au.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.au=this.au.insert(t,{type:2,doc:e.doc}):xn(63341,{ft:e,uu:n}):this.au=this.au.insert(t,e)}cu(){const e=[];return this.au.inorderTraversal((t,n)=>{e.push(n)}),e}}class Fd{constructor(e,t,n,r,s,i,a,o,u){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=u}static fromInitialDocuments(e,t,n,r,s){const i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new Fd(e,t,Ud.emptySet(t),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ch(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some(e=>e.Tu())}}class $d{constructor(){this.queries=qd(),this.onlineState="Unknown",this.Pu=new Set}terminate(){!function(e,t){const n=Vn(e),r=n.queries;n.queries=qd(),r.forEach((e,n)=>{for(const r of n.Eu)r.onError(t)})}(this,new Bn(Fn.ABORTED,"Firestore shutting down"))}}function qd(){return new oa(e=>uh(e),ch)}async function jd(e,t){const n=Vn(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.hu()&&t.Tu()&&(r=2):(i=new Bd,r=t.Tu()?0:1);try{switch(r){case 0:i.lu=await n.onListen(s,!0);break;case 1:i.lu=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(a){const e=Md(a,`Initialization of query '${ah(t.query)?sh(t.query):Zi(t.query)}' failed`);return void t.onError(e)}n.queries.set(s,i),i.Eu.push(t),t.Ru(n.onlineState),i.lu&&t.Iu(i.lu)&&Kd(n)}async function Hd(e,t){const n=Vn(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const e=i.Eu.indexOf(t);e>=0&&(i.Eu.splice(e,1),0===i.Eu.length?s=t.Tu()?0:1:!i.hu()&&t.Tu()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function Gd(e,t){const n=Vn(e);let r=!1;for(const s of t){const e=s.query,t=n.queries.get(e);if(t){for(const e of t.Eu)e.Iu(s)&&(r=!0);t.lu=s}}r&&Kd(n)}function zd(e,t,n){const r=Vn(e),s=r.queries.get(t);if(s)for(const i of s.Eu)i.onError(n);r.queries.delete(t)}function Kd(e){e.Pu.forEach(e=>{e.next()})}var Wd,Yd;(Yd=Wd||(Wd={})).Default="default",Yd.Cache="cache";class Qd{constructor(e,t,n){this.query=e,this.Au=t,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=n||{}}Iu(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Fd(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.fu(e)&&(this.Au.next(e),t=!0):this.mu(e,this.onlineState)&&(this.pu(e),t=!0),this.du=e,t}onError(e){this.Au.error(e)}Ru(e){this.onlineState=e;let t=!1;return this.du&&!this.Vu&&this.mu(this.du,e)&&(this.pu(this.du),t=!0),t}mu(e,t){if(!e.fromCache)return!0;if(!this.Tu())return!0;const n="Offline"!==t;return(!this.options.waitForSyncWhenOnline||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}fu(e){if(e.docChanges.length>0)return!0;const t=this.du&&this.du.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}pu(e){e=Fd.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.Au.next(e)}Tu(){return this.options.source!==Wd.Cache}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e){this.key=e}}class Jd{constructor(e){this.key=e}}class Zd{constructor(e,t){this.query=e,this.Ou=t,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=_a(),this.mutatedKeys=_a(),this.Lu=ah(e)?Ih(e):ta(e),this.Bu=new Ud(this.Lu)}get Uu(){return this.Ou}ku(e,t){const n=t?t.qu:new Vd,r=t?t.Bu:this.Bu;let s=t?t.mutatedKeys:this.mutatedKeys,i=r,a=!1;const[o,u]=this.$u(this.query,r);e.inorderTraversal((e,t)=>{const c=r.get(e),l=function(e,t){return ah(e)?Th(e,t):ea(e,t)}(this.query,t)?t:null,h=!!c&&this.mutatedKeys.has(c.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let p=!1;c&&l?c.data.isEqual(l.data)?h!==d&&(n.track({type:3,doc:l}),p=!0):this.Ku(c,l)||(n.track({type:2,doc:l}),p=!0,(o&&this.Lu(l,o)>0||u&&this.Lu(l,u)<0)&&(a=!0)):!c&&l?(n.track({type:0,doc:l}),p=!0):c&&!l&&(n.track({type:1,doc:c}),p=!0,(o||u)&&(a=!0)),p&&(l?(i=i.add(l),s=d?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))});const c=this.Wu(this.query);if(c)if(ah(this.query)){const e=[];i.forEach(t=>e.push(t));const t=Eh(this.query,e);let r=new Ud(Ih(this.query));for(const n of t)r=r.add(n);i.forEach(e=>{r.has(e.key)||(s=s.delete(e.key),n.track({type:1,doc:e}))}),i=r}else{const e=this.Qu(this.query);for(;i.size>c;){const t="F"===e?i.last():i.first();i=i.delete(t.key),s=s.delete(t.key),n.track({type:1,doc:t})}}return{Bu:i,qu:n,Uo:a,mutatedKeys:s}}Wu(e){var t;return ah(e)?null==(t=Ch(e))?void 0:t.limit:e.limit||void 0}Qu(e){if(ah(e)){const t=Ch(e);return t&&t.limit<0?"L":"F"}return e.limitType}$u(e,t){var n;if(ah(e)){const r=null==(n=Ch(e))?void 0:n.limit;return[t.size===r?t.last():null,null]}return["F"===e.limitType&&t.size===this.Wu(this.query)?t.last():null,"L"===e.limitType&&t.size===this.Wu(this.query)?t.first():null]}Ku(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const s=this.Bu;this.Bu=e.Bu,this.mutatedKeys=e.mutatedKeys;const i=e.qu.cu();i.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return xn(20277,{ft:e})}};return n(e)-n(t)}(e.type,t.type)||this.Lu(e.doc,t.doc)),this.Gu(n),r=r??!1;const a=t&&!r?this.zu():[],o=0===this.Nu.size&&this.current&&!r?1:0,u=o!==this.Mu;return this.Mu=o,0!==i.length||u?{snapshot:new Fd(this.query,e.Bu,s,i,e.mutatedKeys,0===o,u,!1,!!n&&n.resumeToken.approximateByteSize()>0),ju:a}:{ju:a}}Ru(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new Vd,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(e){return!this.Ou.has(e)&&!!this.Bu.has(e)&&!this.Bu.get(e).hasLocalMutations}Gu(e){e&&(e.addedDocuments.forEach(e=>this.Ou=this.Ou.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ou=this.Ou.delete(e)),this.current=e.current)}zu(){if(!this.current)return[];const e=this.Nu;this.Nu=_a(),this.Bu.forEach(e=>{this.Hu(e.key)&&(this.Nu=this.Nu.add(e.key))});const t=[];return e.forEach(e=>{this.Nu.has(e)||t.push(new Jd(e))}),this.Nu.forEach(n=>{e.has(n)||t.push(new Xd(n))}),t}Ju(e){this.Ou=e.Jo,this.Nu=_a();const t=this.ku(e.documents);return this.applyChanges(t,!0)}Yu(){return Fd.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,0===this.Mu,this.hasCachedResults)}}const ep="SyncEngine";class tp{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class np{constructor(e){this.key=e,this.Zu=!1}}class rp{constructor(e,t,n,r,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Xu={},this.ec=new oa(e=>uh(e),ch),this.tc=new Map,this.nc=new Set,this.rc=new Pr(cr.comparator),this.sc=new Map,this._c=new Dh,this.oc={},this.ac=new Map,this.uc=wh.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return!0===this.cc}}async function sp(e,t,n=!0){const r=Cp(e);let s;const i=r.ec.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Yu()):s=await ap(r,t,n,!0),s}async function ip(e,t){const n=Cp(e);await ap(n,t,!0,!1)}async function ap(e,t,n,r){const s=await function(e,t){const n=Vn(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.g_.getTargetData(e,t).next(s=>s?(r=s,Sr.resolve(r)):n.g_.allocateTargetId(e).next(s=>(r=new gh(t,s,"TargetPurposeListen",e.currentSequenceNumber),n.g_.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.$o.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.$o=n.$o.insert(e.targetId,e),n.Ko.set(t,e.targetId)),e})}(e.localStore,ah(t)?t:Qi(t)),i=s.targetId,a=e.sharedClientState.addLocalQueryTarget(i,n);let o;return r&&(o=await async function(e,t,n,r,s){e.lc=(t,n,r)=>async function(e,t,n,r){let s=t.view.ku(n);s.Uo&&(s=await Zh(e.localStore,t.query,!1).then(({documents:e})=>t.view.ku(e,s)));const i=r&&r.targetChanges.get(t.targetId),a=r&&null!=r.targetMismatches.get(t.targetId),o=t.view.applyChanges(s,e.isPrimaryClient,i,a);return vp(e,t.targetId,o.ju),o.snapshot}(e,t,n,r);const i=await Zh(e.localStore,t,!0),a=new Zd(t,i.Jo),o=a.ku(i.documents),u=Aa.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,s),c=a.applyChanges(o,e.isPrimaryClient,u);vp(e,n,c.ju);const l=new tp(t,n,a);return e.ec.set(t,l),e.tc.has(n)?e.tc.get(n).push(t):e.tc.set(n,[t]),c.snapshot}(e,t,i,"current"===a,s.resumeToken)),e.isPrimaryClient&&n&&cd(e.remoteStore,s),o}async function op(e,t,n){const r=Vn(e),s=r.ec.get(t),i=r.tc.get(s.targetId);if(i.length>1)return r.tc.set(s.targetId,i.filter(e=>!ch(e,t))),void r.ec.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Jh(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&ld(r.remoteStore,s.targetId),yp(r,s.targetId)}).catch(Ar)):(yp(r,s.targetId),await Jh(r.localStore,s.targetId,!0))}async function up(e,t){const n=Vn(e),r=n.ec.get(t),s=n.tc.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),ld(n.remoteStore,r.targetId))}async function cp(e,t,n){const r=function(e){const t=Vn(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=pp.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=fp.bind(null,t),t}(e);try{const e=await function(e,t){const n=Vn(e),r=wr.now(),s=t.reduce((e,t)=>e.add(t.key),_a());let i,a;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let o=ca(),u=_a();return n.Qo.getEntries(e,s).next(e=>{o=e,o.forEach((e,t)=>{t.isValidDocument()||(u=u.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,o)).next(s=>{i=s;const a=[];for(const e of t){const t=ui(e,i.get(e.key).overlayedDocument);null!=t&&a.push(new hi(e.key,t,Ps(t.value.mapValue),ni.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,a,t)}).next(t=>{a=t;const r=t.applyToLocalDocumentSet(i,u);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:a.batchId,changes:da(i)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.oc[e.currentUser.toKey()];r||(r=new Pr(Jn)),r=r.insert(t,n),e.oc[e.currentUser.toKey()]=r}(r,e.batchId,n),await Tp(r,e.changes),await bd(r.remoteStore)}catch(s){const e=Md(s,"Failed to persist write");n.reject(e)}}async function lp(e,t){const n=Vn(e);try{const e=await Qh(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.sc.get(t);r&&(Un(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.Zu=!0:e.modifiedDocuments.size>0?Un(r.Zu,14607):e.removedDocuments.size>0&&(Un(r.Zu,42227),r.Zu=!1))}),await Tp(n,e,t)}catch(r){await Ar(r)}}function hp(e,t,n){const r=Vn(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.ec.forEach((n,r)=>{const s=r.view.Ru(t);s.snapshot&&e.push(s.snapshot)}),function(e,t){const n=Vn(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const s of n.Eu)s.Ru(t)&&(r=!0)}),r&&Kd(n)}(r.eventManager,t),e.length&&r.Xu.zn(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function dp(e,t,n){const r=Vn(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.sc.get(t),i=s&&s.key;if(i){let e=new Pr(cr.comparator);e=e.insert(i,Vi.newNoDocument(i,Er.min()));const n=_a().add(i),s=new Ca(Er.min(),new Map,new Pr(Jn),e,ca(),n);await lp(r,s),r.rc=r.rc.remove(i),r.sc.delete(t),Ep(r)}else await Jh(r.localStore,t,!1).then(()=>yp(r,t,n)).catch(Ar)}async function pp(e,t){const n=Vn(e),r=t.batch.batchId;try{const e=await function(e,t){const n=Vn(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),s=n.Qo.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const s=n.batch,i=s.keys();let a=Sr.resolve();return i.forEach(e=>{a=a.next(()=>r.getEntry(t,e)).next(t=>{const i=n.docVersions.get(e);Un(null!==i,48541),t.version.compareTo(i)<0&&(s.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,s))}(n,e,t,s).next(()=>s.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=_a();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}(n.localStore,t);mp(n,r,null),gp(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Tp(n,e)}catch(s){await Ar(s)}}async function fp(e,t,n){const r=Vn(e);try{const e=await function(e,t){const n=Vn(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(Un(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);mp(r,t,n),gp(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Tp(r,e)}catch(s){await Ar(s)}}function gp(e,t){(e.ac.get(t)||[]).forEach(e=>{e.resolve()}),e.ac.delete(t)}function mp(e,t,n){const r=Vn(e);let s=r.oc[r.currentUser.toKey()];if(s){const e=s.get(t);e&&(n?e.reject(n):e.resolve(),s=s.remove(t)),r.oc[r.currentUser.toKey()]=s}}function yp(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.tc.get(t))e.ec.delete(r),n&&e.Xu.Ec(r,n);e.tc.delete(t),e.isPrimaryClient&&e._c.s_(t).forEach(t=>{e._c.containsKey(t)||_p(e,t)})}function _p(e,t){e.nc.delete(t.path.canonicalString());const n=e.rc.get(t);null!==n&&(ld(e.remoteStore,n),e.rc=e.rc.remove(t),e.sc.delete(n),Ep(e))}function vp(e,t,n){for(const r of n)r instanceof Xd?(e._c.addReference(r.key,t),wp(e,r)):r instanceof Jd?(kn(ep,"Document no longer in limbo: "+r.key),e._c.removeReference(r.key,t),e._c.containsKey(r.key)||_p(e,r.key)):xn(19791,{hc:r})}function wp(e,t){const n=t.key,r=n.path.canonicalString();e.rc.get(n)||e.nc.has(r)||(kn(ep,"New document in limbo: "+n),e.nc.add(r),Ep(e))}function Ep(e){for(;e.nc.size>0&&e.rc.size<e.maxConcurrentLimboResolutions;){const t=e.nc.values().next().value;e.nc.delete(t);const n=new cr(ar.fromString(t)),r=e.uc.next();e.sc.set(r,new np(n)),e.rc=e.rc.insert(n,r),cd(e.remoteStore,new gh(Qi(zi(n.path)),r,"TargetPurposeLimboResolution",Rr.ce))}}async function Tp(e,t,n){const r=Vn(e),s=[],i=[],a=[];r.ec.isEmpty()||(r.ec.forEach((e,o)=>{a.push(r.lc(o,t,n).then(e=>{var t;if((e||n)&&r.isPrimaryClient){const s=e?!e.fromCache:null==(t=null==n?void 0:n.targetChanges.get(o.targetId))?void 0:t.current;r.sharedClientState.updateQueryState(o.targetId,s?"current":"not-current")}if(e){s.push(e);const t=qh.vo(o.targetId,e);i.push(t)}}))}),await Promise.all(a),r.Xu.zn(s),await async function(e,t){const n=Vn(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>Sr.forEach(t,t=>Sr.forEach(t.wo,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>Sr.forEach(t.bo,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(r){if(!Nr(r))throw r;kn(zh,"Failed to update sequence numbers: "+r)}for(const s of t){const e=s.targetId;if(!s.fromCache){const t=n.$o.get(e),r=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(r);n.$o=n.$o.insert(e,s)}}}(r.localStore,i))}async function bp(e,t){const n=Vn(e);if(!n.currentUser.isEqual(t)){kn(ep,"User change. New user:",t.toKey());const e=await Wh(n.localStore,t);n.currentUser=t,s="'waitForPendingWrites' promise is rejected due to a user change.",(r=n).ac.forEach(e=>{e.forEach(e=>{e.reject(new Bn(Fn.CANCELLED,s))})}),r.ac.clear(),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Tp(n,e.zo)}var r,s}function Ip(e,t){const n=Vn(e),r=n.sc.get(t);if(r&&r.Zu)return _a().add(r.key);{let e=_a();const r=n.tc.get(t);if(!r)return e;for(const t of r??[]){const r=n.ec.get(t);e=e.unionWith(r.view.Uu)}return e}}function Cp(e){const t=Vn(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=lp.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ip.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=dp.bind(null,t),t.Xu.zn=Gd.bind(null,t.eventManager),t.Xu.Ec=zd.bind(null,t.eventManager),t}class Ap{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=yo(e.databaseInfo.databaseId),this.sharedClientState=this.Rc(e),this.persistence=this.Ic(e),await this.persistence.start(),this.localStore=this.Ac(e),this.gcScheduler=this.Vc(e,this.localStore),this.indexBackfillerScheduler=this.dc(e,this.localStore)}Vc(e,t){return null}dc(e,t){return null}Ac(e){return function(e,t,n,r){return new Kh(e,t,n,r)}(this.persistence,new Gh,e.initialUser,this.serializer)}Ic(e){return new Vh(Bh.C_,this.serializer)}Rc(e){return new td}async terminate(){var e,t;null==(e=this.gcScheduler)||e.stop(),null==(t=this.indexBackfillerScheduler)||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ap.provider={build:()=>new Ap};class Sp extends Ap{constructor(e){super(),this.cacheSizeBytes=e}Vc(e,t){Un(this.persistence.referenceDelegate instanceof $h,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Yo(n,e.asyncQueue,t)}Ic(e){const t=void 0!==this.cacheSizeBytes?Go.withCacheSize(this.cacheSizeBytes):Go.DEFAULT;return new Vh(e=>$h.C_(e,t),this.serializer)}}class Np{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>hp(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=bp.bind(null,this.syncEngine),await async function(e,t){const n=Vn(e);t?(n.tu.delete(2),await ad(n)):t||(n.tu.add(2),await od(n),n.iu.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new $d}createDatastore(e){const t=yo(e.databaseInfo.databaseId),n=function(e){return new Po(e)}(e.databaseInfo);return function(e,t,n,r){return new $o(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,r=e.asyncQueue,s=e=>hp(this.syncEngine,e,0),i=Co.C()?new Co:new bo,new id(t,n,r,s,i);var t,n,r,s,i}createSyncEngine(e,t){return function(e,t,n,r,s,i,a){const o=new rp(e,t,n,r,s,i);return a&&(o.cc=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(e){const t=Vn(e);kn(sd,"RemoteStore shutting down."),t.tu.add(5),await od(t),t.ru.shutdown(),t.iu.set("Unknown")}(this.remoteStore),null==(e=this.datastore)||e.terminate(),null==(t=this.eventManager)||t.terminate()}}Np.provider={build:()=>new Np};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.mc(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.mc(this.observer.error,e):Dn("Uncaught Error in snapshot listener:",e.toString()))}gc(){this.muted=!0}mc(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Op="FirestoreClient";class kp{constructor(e,t,n,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=r,this.user=Sn.UNAUTHENTICATED,this.clientId=Xn.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async e=>{kn(Op,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(kn(Op,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new $n;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Md(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Dp(e,t){e.asyncQueue.verifyOperationInProgress(),kn(Op,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Wh(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Lp(e,t){e.asyncQueue.verifyOperationInProgress();const n=await async function(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){kn(Op,"Using user provided OfflineComponentProvider");try{await Dp(e,e._uninitializedComponentsProvider._offline)}catch(t){const s=t;if(!("FirebaseError"===(n=s).name?n.code===Fn.FAILED_PRECONDITION||n.code===Fn.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw s;Ln("Error using user provided cache. Falling back to memory cache: "+s),await Dp(e,new Ap)}}else kn(Op,"Using default OfflineComponentProvider"),await Dp(e,new Sp(void 0));var n;return e._offlineComponents}(e);kn(Op,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>Dd(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>Dd(t.remoteStore,n)),e._onlineComponents=t}async function Pp(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(kn(Op,"Using user provided OnlineComponentProvider"),await Lp(e,e._uninitializedComponentsProvider._online)):(kn(Op,"Using default OnlineComponentProvider"),await Lp(e,new Np))),e._onlineComponents}async function xp(e){const t=await Pp(e),n=t.eventManager;return n.onListen=sp.bind(null,t.syncEngine),n.onUnlisten=op.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=ip.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=up.bind(null,t.syncEngine),n}function Mp(e,t,n={}){const r=new $n;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new Rp({next:n=>{i.gc(),t.enqueueAndForget(()=>Hd(e,a)),n.fromCache&&"server"===r.source?s.reject(new Bn(Fn.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:e=>s.reject(e)}),a=new Qd(n instanceof mc?function(e,t){const n=function(e){let t=!1;const n=[];for(const r of e)if(r instanceof uc)if(t=!0,r.orderings.some(e=>e.expr instanceof Fu&&e.expr.fieldName===sr))n.push(r);else{const e=r.orderings.map(e=>e);e.push(Bu(sr).ascending()),n.push(new uc(e,{}))}else r instanceof ic?(t||(n.push(new uc([Bu(sr).ascending()],{})),t=!0),n.push(r)):n.push(r);return t||n.push(new uc([Bu(sr).ascending()],{})),n}(e.stages);if(e.userDataReader){const t=e.userDataReader.createContext(3,"toCorePipeline");n.forEach(e=>e._readUserData(t))}return new hc(e.userDataReader.serializer,n,t)}(n):n,i,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return jd(e,a)}(await xp(e),e.asyncQueue,t,n,r)),r.promise}function Up(e,t){const n=new $n;return e.asyncQueue.enqueueAndForget(async()=>cp(await function(e){return Pp(e).then(e=>e.syncEngine)}(e),t,n)),n.promise
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const Vp="AsyncQueue";class Fp{constructor(e=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new xo(this,"async_queue_retry"),this.jc=()=>{const e=nd();e&&kn(Vp,"Visibility state changed to "+e.visibilityState),this.xn.gn()},this.Hc=e;const t=nd();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.$c){this.$c=!0,this.Gc=e||!1;const t=nd();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.jc)}}enqueue(e){if(this.Jc(),this.$c)return new Promise(()=>{});const t=new $n;return this.Yc(()=>this.$c&&this.Gc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.qc.push(e),this.Zc()))}async Zc(){if(0!==this.qc.length){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(Yd){if(!Nr(Yd))throw Yd;kn(Vp,"Operation failed with retryable error: "+Yd)}this.qc.length>0&&this.xn.mn(()=>this.Zc())}}Yc(e){const t=this.Hc.then(()=>(this.Qc=!0,e().catch(e=>{throw this.Wc=e,this.Qc=!1,Dn("INTERNAL UNHANDLED ERROR: ",Bp(e)),e}).then(e=>(this.Qc=!1,e))));return this.Hc=t,t}enqueueAfterDelay(e,t,n){this.Jc(),this.zc.indexOf(e)>-1&&(t=0);const r=xd.createAndSchedule(this,e,t,n,e=>this.Xc(e));return this.Kc.push(r),r}Jc(){this.Wc&&xn(47125,{el:Bp(this.Wc)})}verifyOperationInProgress(){}async tl(){let e;do{e=this.Hc,await e}while(e!==this.Hc)}nl(e){for(const t of this.Kc)if(t.timerId===e)return!0;return!1}rl(e){return this.tl().then(()=>{this.Kc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.Kc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.tl()})}il(e){this.zc.push(e)}Xc(e){const t=this.Kc.indexOf(e);this.Kc.splice(t,1)}}function Bp(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}class $p extends eu{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new Fp,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Fp(e),this._firestoreClient=void 0,await e}}}function qp(e,t){const n="object"==typeof e?e:Ke(),r="string"==typeof e?e:rs,s=$e(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const e=h("firestore");e&&function(e,t,n,r={}){var s;e=gr(e,eu);const i=R(t),a=e._getSettings(),o={...a,emulatorOptions:e._getEmulatorOptions()},u=`${t}:${n}`;i&&O(`https://${u}`),a.host!==Xo&&a.host!==u&&Ln("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...a,host:u,ssl:i,emulatorOptions:r};if(!E(c,o)&&(e._setSettings(c),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=Sn.MOCK_USER;else{t=g(r.mockUserToken,null==(s=e._app)?void 0:s.options.projectId);const i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new Bn(Fn.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new Sn(i)}e._authCredentials=new Hn(new qn(t,n))}}(s,...e)}return s}function jp(e){if(e._terminated)throw new Bn(Fn.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){var t,n,r,s;const i=e._freezeSettings(),a=function(e,t,n,r,s){return new ns(e,t,n,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,To(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}(e._databaseId,(null==(t=e._app)?void 0:t.options.appId)||"",e._persistenceKey,null==(n=e._app)?void 0:n.options.apiKey,i);e._componentsProvider||(null==(r=i.localCache)?void 0:r._offlineComponentProvider)&&(null==(s=i.localCache)?void 0:s._onlineComponentProvider)&&(e._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),e._firestoreClient=new kp(e._authCredentials,e._appCheckCredentials,e._queue,a,e._componentsProvider&&function(e){const t=null==e?void 0:e._online.build();return{_offline:null==e?void 0:e._offline.build(t),_online:t}}(e._componentsProvider))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e),e._firestoreClient}class Hp{convertValue(e,t="none"){switch(ps(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Kr(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Wr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw xn(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return $r(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){var t,n,r;const s=null==(r=null==(n=null==(t=e.fields)?void 0:t[cs].arrayValue)?void 0:n.values)?void 0:r.map(e=>Kr(e.doubleValue));return new au(s)}convertGeoPoint(e){return new Eo(Kr(e.latitude),Kr(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=es(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ts(e));default:return null}}convertTimestamp(e){const t=zr(e);return new wr(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ar.fromString(e);Un(po(n),9688,{name:e});const r=new ss(n.get(1),n.get(3)),s=new cr(n.popFirst(5));return r.isEqual(t)||Dn(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp extends Hp{constructor(e){super(),this.firestore=e}convertBytes(e){return new _o(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new nu(this.firestore,null,t)}}const zp="@firebase/firestore",Kp="4.16.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wp(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}(e,["next","error","complete"])}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{constructor(e,t,n,r,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new nu(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new Qp(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return(null==(e=this._document)?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Tu("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class Qp extends Yp{data(){return super.data()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xp(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new Bn(Fn.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Jp{}class Zp extends Jp{}function ef(e,t,...n){let r=[];t instanceof Jp&&r.push(t),r=r.concat(n),function(e){const t=e.filter(e=>e instanceof nf).length,n=e.filter(e=>e instanceof tf).length;if(t>1||t>0&&n>0)throw new Bn(Fn.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)e=s._apply(e);return e}class tf extends Zp{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new tf(e,t,n)}_apply(e){const t=this._parse(e);return uf(e._query,t),new tu(e.firestore,e.converter,Xi(e._query,t))}_parse(e){const t=pu(e.firestore),n=function(e,t,n,r,s,i,a){let o;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new Bn(Fn.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on documentId().`);if("in"===i||"not-in"===i){of(a,i);const t=[];for(const n of a)t.push(af(r,e,n));o={arrayValue:{values:t}}}else o=af(r,e,a)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||of(a,i),o=function(e,t,n,r=!1){return _u(n,e.createContext(r?4:3,t))}(n,t,a,"in"===i||"not-in"===i);return Ei.create(s,i,o)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}class nf extends Jp{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new nf(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:Ti.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const s of r)uf(n,s),n=Xi(n,s)}(e._query,t),new tu(e.firestore,e.converter,Xi(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class rf extends Zp{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new rf(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new Bn(Fn.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new Bn(Fn.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Mi(t,n)}(e._query,this._field,this._direction);return new tu(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new Gi(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function sf(e,t="asc"){const n=t,r=Tu("orderBy",e);return rf._create(r,n)}function af(e,t,n){if("string"==typeof(n=N(n))){if(""===n)throw new Bn(Fn.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Wi(t)&&-1!==n.indexOf("/"))throw new Bn(Fn.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(ar.fromString(n));if(!cr.isDocumentKey(r))throw new Bn(Fn.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ts(e,new cr(r))}if(n instanceof nu)return Ts(e,n._key);throw new Bn(Fn.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${fr(n)}.`)}function of(e,t){if(!Array.isArray(e)||0===e.length)throw new Bn(Fn.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function uf(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new Bn(Fn.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new Bn(Fn.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function cf(e,t,n){let r;return r=e?e.toFirestore(t):t,r}class lf{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class hf extends Yp{constructor(e,t,n,r,s,i){super(e,t,n,r,i),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new df(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Tu("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new Bn(Fn.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=hf._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}hf._jsonSchemaVersion="firestore/documentSnapshot/1.0",hf._jsonSchema={type:mr("string",hf._jsonSchemaVersion),bundleSource:mr("string","DocumentSnapshot"),bundleName:mr("string"),bundle:mr("string")};class df extends hf{data(e={}){return super.data(e)}}class pf{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new lf(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new df(this._firestore,this._userDataWriter,n.key,n,new lf(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new Bn(Fn.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{ah(e._snapshot.query)?Ih(e._snapshot.query):ta(e.query._query);const r=new df(e._firestore,e._userDataWriter,n.doc.key,n.doc,new lf(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new df(e._firestore,e._userDataWriter,t.doc.key,t.doc,new lf(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let s=-1,i=-1;return 0!==t.type&&(s=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),i=n.indexOf(t.doc.key)),{type:ff(t.type),doc:r,oldIndex:s,newIndex:i}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new Bn(Fn.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=pf._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Xn.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],r=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),r.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function ff(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return xn(61501,{type:e})}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function gf(e){e=gr(e,nu);const t=gr(e.firestore,$p);return function(e,t,n={}){const r=new $n;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new Rp({next:o=>{i.gc(),t.enqueueAndForget(()=>Hd(e,a));const u=o.docs.has(n);!u&&o.fromCache?s.reject(new Bn(Fn.UNAVAILABLE,"Failed to get document because the client is offline.")):u&&o.fromCache&&r&&"server"===r.source?s.reject(new Bn(Fn.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):s.resolve(o)},error:e=>s.reject(e)}),a=new Qd(zi(n.path),i,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return jd(e,a)}(await xp(e),e.asyncQueue,t,n,r)),r.promise}(jp(t),e._key).then(n=>bf(t,e,n))}function mf(e){e=gr(e,tu);const t=gr(e.firestore,$p),n=jp(t),r=new Gp(t);return Xp(e._query),Mp(n,e._query).then(n=>new pf(t,r,e,n))}function yf(e,t,n){e=gr(e,nu);const r=gr(e.firestore,$p),s=cf(e.converter,t);return Tf(r,[fu(pu(r),"setDoc",e._key,s,null!==e.converter,n).toMutation(e._key,ni.none())])}function _f(e,t,n,...r){e=gr(e,nu);const s=gr(e.firestore,$p),i=pu(s);let a;return a="string"==typeof(t=N(t))||t instanceof vo?function(e,t,n,r,s,i){const a=e.createContext(1,t,n),o=[Tu(t,r,n)],u=[s];if(i.length%2!=0)throw new Bn(Fn.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)o.push(Tu(t,i[d])),u.push(i[d+1]);const c=[],l=Ls.empty();for(let d=o.length-1;d>=0;--d)if(!Au(c,o[d])){const e=o[d];let t=u[d];t=N(t);const n=a.childContextForFieldPath(e);if(t instanceof gu)c.push(e);else{const r=_u(t,n);null!=r&&(c.push(e),l.set(e,r))}}const h=new Fr(c);return new cu(l,h,a.fieldTransforms)}(i,"updateDoc",e._key,t,n,r):function(e,t,n,r){const s=e.createContext(1,t,n);Eu("Data must be an object, but it was:",s,r);const i=[],a=Ls.empty();$r(r,(e,r)=>{const o=Iu(t,e,n);r=N(r);const u=s.childContextForFieldPath(o);if(r instanceof gu)i.push(o);else{const e=_u(r,u);null!=e&&(i.push(o),a.set(o,e))}});const o=new Fr(i);return new cu(a,o,s.fieldTransforms)}(i,"updateDoc",e._key,t),Tf(s,[a.toMutation(e._key,ni.exists(!0))])}function vf(e){return Tf(gr(e.firestore,$p),[new gi(e._key,ni.none())])}function wf(e,t){const n=gr(e.firestore,$p),r=iu(e),s=cf(e.converter,t);return Tf(n,[fu(pu(e.firestore),"addDoc",r._key,s,null!==e.converter,{}).toMutation(r._key,ni.exists(!1))]).then(()=>r)}function Ef(e,...t){var n,r,s;e=N(e);let i={includeMetadataChanges:!1,source:"default"},a=0;"object"!=typeof t[a]||Wp(t[a])||(i=t[a++]);const o={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Wp(t[a])){const e=t[a];t[a]=null==(n=e.next)?void 0:n.bind(e),t[a+1]=null==(r=e.error)?void 0:r.bind(e),t[a+2]=null==(s=e.complete)?void 0:s.bind(e)}let u,c,l;if(e instanceof nu)c=gr(e.firestore,$p),l=zi(e._key.path),u={next:n=>{t[a]&&t[a](bf(c,e,n))},error:t[a+1],complete:t[a+2]};else{const n=gr(e,tu);c=gr(n.firestore,$p),l=n._query;const r=new Gp(c);u={next:e=>{t[a]&&t[a](new pf(c,r,n,e))},error:t[a+1],complete:t[a+2]},Xp(e._query)}return function(e,t,n,r){const s=new Rp(r),i=new Qd(t,s,n);return e.asyncQueue.enqueueAndForget(async()=>jd(await xp(e),i)),()=>{s.gc(),e.asyncQueue.enqueueAndForget(async()=>Hd(await xp(e),i))}}(jp(c),l,o,u)}function Tf(e,t){return Up(jp(e),t)}function bf(e,t,n){const r=n.docs.get(t._key),s=new Gp(e);return new hf(e,s,t._key,r,new lf(n.hasPendingWrites,n.fromCache),t.converter)}pf._jsonSchemaVersion="firestore/querySnapshot/1.0",pf._jsonSchema={type:mr("string",pf._jsonSchemaVersion),bundleSource:mr("string","QuerySnapshot"),bundleName:mr("string"),bundle:mr("string")},function(e,t=!0){(function(e){Nn=e})(Ge),Be(new k("firestore",(e,{instanceIdentifier:n,options:r})=>{const s=e.getProvider("app").getImmediate(),i=new $p(new Gn(e.getProvider("auth-internal")),new Yn(s,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new Bn(Fn.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ss(e.options.projectId,t)}(s,n),s);return r={useFetchStreams:t,...r},i._setSettings(r),i},"PUBLIC").setMultipleInstances(!0)),We(zp,Kp,e),We(zp,Kp,"esm2020")}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
We("firebase","12.16.0","app");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const If="firebasestorage.googleapis.com";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cf extends _{constructor(e,t,n=0){super(Of(e),`Firebase Storage: ${t} (${Of(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Cf.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Of(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var Af,Sf,Nf,Rf;function Of(e){return"storage/"+e}function kf(e){return new Cf(Af.INVALID_ARGUMENT,e)}function Df(){return new Cf(Af.APP_DELETED,"The Firebase app was deleted.")}(Sf=Af||(Af={})).UNKNOWN="unknown",Sf.OBJECT_NOT_FOUND="object-not-found",Sf.BUCKET_NOT_FOUND="bucket-not-found",Sf.PROJECT_NOT_FOUND="project-not-found",Sf.QUOTA_EXCEEDED="quota-exceeded",Sf.UNAUTHENTICATED="unauthenticated",Sf.UNAUTHORIZED="unauthorized",Sf.UNAUTHORIZED_APP="unauthorized-app",Sf.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",Sf.INVALID_CHECKSUM="invalid-checksum",Sf.CANCELED="canceled",Sf.INVALID_EVENT_NAME="invalid-event-name",Sf.INVALID_URL="invalid-url",Sf.INVALID_DEFAULT_BUCKET="invalid-default-bucket",Sf.NO_DEFAULT_BUCKET="no-default-bucket",Sf.CANNOT_SLICE_BLOB="cannot-slice-blob",Sf.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",Sf.NO_DOWNLOAD_URL="no-download-url",Sf.INVALID_ARGUMENT="invalid-argument",Sf.INVALID_ARGUMENT_COUNT="invalid-argument-count",Sf.APP_DELETED="app-deleted",Sf.INVALID_ROOT_OPERATION="invalid-root-operation",Sf.INVALID_FORMAT="invalid-format",Sf.INTERNAL_ERROR="internal-error",Sf.UNSUPPORTED_ENVIRONMENT="unsupported-environment";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Lf{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=Lf.makeFromUrl(e,t)}catch(Yd){return new Lf(e,"")}if(""===n.path)return n;throw r=e,new Cf(Af.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)";const s=new RegExp("^gs://"+r+"(/(.*))?$","i");function i(e){e.path_=decodeURIComponent(e.path)}const a=t.replace(/[.]/g,"\\."),o=[{regex:s,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:i},{regex:new RegExp(`^https?://${t===If?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:i}];for(let u=0;u<o.length;u++){const t=o[u],r=t.regex.exec(e);if(r){const e=r[t.indices.bucket];let s=r[t.indices.path];s||(s=""),n=new Lf(e,s),t.postModify(n);break}}if(null==n)throw function(e){return new Cf(Af.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return n}}class Pf{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xf(e,t,n,r){if(r<t)throw kf(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw kf(`Invalid value for '${e}'. Expected ${n} or less.`)}(Rf=Nf||(Nf={}))[Rf.NO_ERROR=0]="NO_ERROR",Rf[Rf.NETWORK_ERROR=1]="NETWORK_ERROR",Rf[Rf.ABORT=2]="ABORT";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Mf{constructor(e,t,n,r,s,i,a,o,u,c,l,h=!0,d=!1){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=s,this.additionalRetryCodes_=i,this.callback_=a,this.errorCallback_=o,this.timeout_=u,this.progressCallback_=c,this.connectionFactory_=l,this.retry=h,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){const e=(e,t)=>{if(t)return void e(!1,new Uf(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===Nf.NO_ERROR,s=n.getStatus();if(!t||
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){const n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),s=-1!==t.indexOf(e);return n||r||s}(s,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===Nf.ABORT;return void e(!1,new Uf(!1,null,t))}const i=-1!==this.successCodes_.indexOf(s);e(!0,new Uf(i,n))})},t=(e,t)=>{const n=this.resolve_,r=this.reject_,s=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(s,s.getResponse());void 0!==e?n(e):n()}catch(Yd){r(Yd)}else if(null!==s){const e=new Cf(Af.UNKNOWN,"An unknown error occurred, please check the error payload for server response.");e.serverResponse=s.getErrorText(),this.errorCallback_?r(this.errorCallback_(s,e)):r(e)}else if(t.canceled){r(this.appDelete_?Df():new Cf(Af.CANCELED,"User canceled the upload/download."))}else{r(new Cf(Af.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))}};this.canceled_?t(0,new Uf(!1,null,!0)):this.backoffId_=function(e,t,n){let r=1,s=null,i=null,a=!1,o=0;function u(){return 2===o}let c=!1;function l(...e){c||(c=!0,t.apply(null,e))}function h(t){s=setTimeout(()=>{s=null,e(p,u())},t)}function d(){i&&clearTimeout(i)}function p(e,...t){if(c)return void d();if(e)return d(),void l.call(null,e,...t);if(u()||a)return d(),void l.call(null,e,...t);let n;r<64&&(r*=2),1===o?(o=2,n=0):n=1e3*(r+Math.random()),h(n)}let f=!1;function g(e){f||(f=!0,d(),c||(null!==s?(e||(o=2),clearTimeout(s),h(0)):e||(o=1)))}return h(0),i=setTimeout(()=>{a=!0,g(!0)},n),g}(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class Uf{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function Vf(e,t,n,r,s,i,a=!0,o=!1){const u=function(e){const t=encodeURIComponent;let n="?";for(const r in e)e.hasOwnProperty(r)&&(n=n+(t(r)+"=")+t(e[r])+"&");return n=n.slice(0,-1),n}(e.urlParams),c=e.url+u,l=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(l,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(l,n),function(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}(l,i),function(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}(l,r),new Mf(c,e.method,l,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s,a,o)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ff{constructor(e,t){this._service=e,this._location=t instanceof Lf?t:Lf.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Ff(e,t)}get root(){const e=new Lf(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return function(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}(this._location.path)}get storage(){return this._service}get parent(){const e=function(e){if(0===e.length)return null;const t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;const t=new Lf(this._location.bucket,e);return new Ff(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw function(e){return new Cf(Af.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)}}function Bf(e,t){const n=null==t?void 0:t.storageBucket;return null==n?null:Lf.makeFromBucketSpec(n,e)}class $f{constructor(e,t,n,r,s,i=!1){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=s,this._isUsingEmulator=i,this._bucket=null,this._host=If,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?Lf.makeFromBucketSpec(r,this._host):Bf(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=Lf.makeFromBucketSpec(this._url,e):this._bucket=Bf(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){xf("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){xf("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if(qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});if(e){return(await e.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Ff(this,e)}_makeRequest(e,t,n,r,s=!0){if(this._deleted)return new Pf(Df());{const i=Vf(e,this._appId,n,r,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(e,t){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}const qf="@firebase/storage",jf="0.14.3",Hf="storage";function Gf(e=Ke(),t){const n=$e(e=N(e),Hf).getImmediate({identifier:t}),r=h("storage");return r&&function(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`;const s=R(t);s&&O(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(e._overrideAuthToken="string"==typeof i?i:g(i,e.app.options.projectId))}(e,t,n,r)}(n,...r),n}function zf(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new $f(n,r,s,t,Ge)}function Kf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}Be(new k(Hf,zf,"PUBLIC").setMultipleInstances(!0)),We(qf,jf,""),We(qf,jf,"esm2020");const Wf=Kf,Yf=new v("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),Qf=new $("@firebase/auth");function Xf(e,...t){Qf.logLevel<=x.ERROR&&Qf.error(`Auth (${Ge}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(e,...t){throw ng(e,...t)}function Zf(e,...t){return ng(e,...t)}function eg(e,t,n){const r={...Wf(),[t]:n};return new v("auth","Firebase",r).create(t,{appName:e.name})}function tg(e){return eg(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ng(e,...t){if("string"!=typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return Yf.create(e,...t)}function rg(e,t,...n){if(!e)throw ng(t,...n)}function sg(e){const t="INTERNAL ASSERTION FAILED: "+e;throw Xf(t),new Error(t)}function ig(e,t){e||sg(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ag(){var e;return"undefined"!=typeof self&&(null==(e=self.location)?void 0:e.href)||""}function og(){var e;return"undefined"!=typeof self&&(null==(e=self.location)?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ug(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==og()&&"https:"!==og()&&!function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&!("connection"in navigator)||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class cg{constructor(e,t){this.shortDelay=e,this.longDelay=t,ig(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(m())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return ug()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lg(e,t){ig(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void sg("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void sg("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void sg("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},pg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],fg=new cg(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function mg(e,t,n,r,s={}){return yg(e,s,async()=>{let s={},i={};r&&("GET"===t?i=r:s={body:JSON.stringify(r)});const a=b({...i,key:e.config.apiKey}).slice(1),o=await e._getAdditionalHeaders();o["Content-Type"]="application/json",e.languageCode&&(o["X-Firebase-Locale"]=e.languageCode);const u={method:t,headers:o,...s};return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(u.referrerPolicy="strict-origin-when-cross-origin"),e.emulatorConfig&&R(e.emulatorConfig.host)&&(u.credentials="include"),hg.fetch()(await vg(e,e.config.apiHost,n,a),u)})}async function yg(e,t,n){e._canInitEmulator=!1;const r={...dg,...t};try{const t=new Eg(e),s=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const i=await s.json();if("needConfirmation"in i)throw Tg(e,"account-exists-with-different-credential",i);if(s.ok&&!("errorMessage"in i))return i;{const t=s.ok?i.errorMessage:i.error.message,[n,a]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw Tg(e,"credential-already-in-use",i);if("EMAIL_EXISTS"===n)throw Tg(e,"email-already-in-use",i);if("USER_DISABLED"===n)throw Tg(e,"user-disabled",i);const o=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(a)throw eg(e,o,a);Jf(e,o)}}catch(Yd){if(Yd instanceof _)throw Yd;Jf(e,"network-request-failed",{message:String(Yd)})}}async function _g(e,t,n,r,s={}){const i=await mg(e,t,n,r,s);return"mfaPendingCredential"in i&&Jf(e,"multi-factor-auth-required",{_serverResponse:i}),i}async function vg(e,t,n,r){const s=`${t}${n}?${r}`,i=e,a=i.config.emulator?lg(e.config,s):`${e.config.apiScheme}://${s}`;if(pg.includes(n)&&(await i._persistenceManagerAvailable,"COOKIE"===i._getPersistenceType())){return i._getPersistence()._getFinalTarget(a).toString()}return a}function wg(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Eg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(Zf(this.auth,"network-request-failed")),fg.get())})}}function Tg(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Zf(e,t,r);return s.customData._tokenResponse=n,s}function bg(e){return void 0!==e&&void 0!==e.enterprise}class Ig{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return wg(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Cg(e,t){return mg(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ag(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(Yd){}}function Sg(e){return 1e3*Number(e)}function Ng(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return Xf("JWT malformed, contained fewer than 3 sections"),null;try{const e=o(n);return e?JSON.parse(e):(Xf("Failed to decode base64 JWT payload"),null)}catch(Yd){return Xf("Caught error parsing JWT payload as JSON",null==Yd?void 0:Yd.toString()),null}}function Rg(e){const t=Ng(e);return rg(t,"internal-error"),rg(void 0!==t.exp,"internal-error"),rg(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Og(e,t,n=!1){if(n)return t;try{return await t}catch(Yd){throw Yd instanceof _&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(Yd)&&e.auth.currentUser===e&&await e.auth.signOut(),Yd}}class kg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(Yd){return void("auth/network-request-failed"===(null==Yd?void 0:Yd.code)&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ag(this.lastLoginAt),this.creationTime=Ag(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lg(e){var t;const n=e.auth,r=await e.getIdToken(),s=await Og(e,Cg(n,{idToken:r}));rg(null==s?void 0:s.users.length,n,"internal-error");const i=s.users[0];e._notifyReloadListener(i);const a=(null==(t=i.providerUserInfo)?void 0:t.length)?Pg(i.providerUserInfo):[],o=(u=e.providerData,c=a,[...u.filter(e=>!c.some(t=>t.providerId===e.providerId)),...c]);var u,c;const l=e.isAnonymous,h=!(e.email&&i.passwordHash||(null==o?void 0:o.length)),d=!!l&&h,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Dg(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(e,p)}function Pg(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xg{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){rg(e.idToken,"internal-error"),rg(void 0!==e.idToken,"internal-error"),rg(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):Rg(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){rg(0!==e.length,"internal-error");const t=Rg(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(rg(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:s}=await async function(e,t){const n=await yg(e,{},async()=>{const n=b({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:s}=e.config,i=await vg(e,r,"/v1/token",`key=${s}`),a=await e._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const o={method:"POST",headers:a,body:n};return e.emulatorConfig&&R(e.emulatorConfig.host)&&(o.credentials="include"),hg.fetch()(i,o)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,r,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:s}=t,i=new xg;return n&&(rg("string"==typeof n,"internal-error",{appName:e}),i.refreshToken=n),r&&(rg("string"==typeof r,"internal-error",{appName:e}),i.accessToken=r),s&&(rg("number"==typeof s,"internal-error",{appName:e}),i.expirationTime=s),i}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new xg,this.toJSON())}_performRefresh(){return sg("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mg(e,t){rg("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Ug{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId="firebase",this.proactiveRefresh=new kg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Dg(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Og(this,this.stsTokenManager.getToken(this.auth,e));return rg(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=N(e),r=await n.getIdToken(t),s=Ng(r);rg(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i="object"==typeof s.firebase?s.firebase:void 0,a=null==i?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Ag(Sg(s.auth_time)),issuedAtTime:Ag(Sg(s.iat)),expirationTime:Ag(Sg(s.exp)),signInProvider:a||null,signInSecondFactor:(null==i?void 0:i.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=N(e);await Lg(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(rg(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ug({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){rg(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Lg(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(qe(this.auth.app))return Promise.reject(tg(this.auth));const e=await this.getIdToken();return await Og(this,
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){return mg(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,s=t.phoneNumber??void 0,i=t.photoURL??void 0,a=t.tenantId??void 0,o=t._redirectEventId??void 0,u=t.createdAt??void 0,c=t.lastLoginAt??void 0,{uid:l,emailVerified:h,isAnonymous:d,providerData:p,stsTokenManager:f}=t;rg(l&&f,e,"internal-error");const g=xg.fromJSON(this.name,f);rg("string"==typeof l,e,"internal-error"),Mg(n,e.name),Mg(r,e.name),rg("boolean"==typeof h,e,"internal-error"),rg("boolean"==typeof d,e,"internal-error"),Mg(s,e.name),Mg(i,e.name),Mg(a,e.name),Mg(o,e.name),Mg(u,e.name),Mg(c,e.name);const m=new Ug({uid:l,auth:e,email:r,emailVerified:h,displayName:n,isAnonymous:d,photoURL:i,phoneNumber:s,tenantId:a,stsTokenManager:g,createdAt:u,lastLoginAt:c});return p&&Array.isArray(p)&&(m.providerData=p.map(e=>({...e}))),o&&(m._redirectEventId=o),m}static async _fromIdTokenResponse(e,t,n=!1){const r=new xg;r.updateFromServerResponse(t);const s=new Ug({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await Lg(s),s}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];rg(void 0!==r.localId,"internal-error");const s=void 0!==r.providerUserInfo?Pg(r.providerUserInfo):[],i=!(r.email&&r.passwordHash||(null==s?void 0:s.length)),a=new xg;a.updateFromIdToken(n);const o=new Ug({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:i}),u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new Dg(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash||(null==s?void 0:s.length))};return Object.assign(o,u),o}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vg=new Map;function Fg(e){ig(e instanceof Function,"Expected a class definition");let t=Vg.get(e);return t?(ig(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Vg.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Bg.type="NONE";const $g=Bg;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qg(e,t,n){return`firebase:${e}:${t}:${n}`}class jg{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:s}=this.auth;this.fullUserKey=qg(this.userKey,r.apiKey,s),this.fullPersistenceKey=qg("persistence",r.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await Cg(this.auth,{idToken:e}).catch(()=>{});return t?Ug._fromGetAccountInfoResponse(this.auth,t,e):null}return Ug._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new jg(Fg($g),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let s=r[0]||Fg($g);const i=qg(n,e.config.apiKey,e.name);let a=null;for(const u of t)try{const t=await u._get(i);if(t){let n;if("string"==typeof t){const r=await Cg(e,{idToken:t}).catch(()=>{});if(!r)break;n=await Ug._fromGetAccountInfoResponse(e,r,t)}else n=Ug._fromJSON(e,t);u!==s&&(a=n),s=u;break}}catch{}const o=r.filter(e=>e._shouldAllowMigration);return s._shouldAllowMigration&&o.length?(s=o[0],a&&await s._set(i,a.toJSON()),await Promise.all(t.map(async e=>{if(e!==s)try{await e._remove(i)}catch{}})),new jg(s,e,n)):new jg(s,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hg(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Wg(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Gg(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Qg(t))return"Blackberry";if(Xg(t))return"Webos";if(zg(t))return"Safari";if((t.includes("chrome/")||Kg(t))&&!t.includes("edge/"))return"Chrome";if(Yg(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function Gg(e=m()){return/firefox\//i.test(e)}function zg(e=m()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Kg(e=m()){return/crios\//i.test(e)}function Wg(e=m()){return/iemobile/i.test(e)}function Yg(e=m()){return/android/i.test(e)}function Qg(e=m()){return/blackberry/i.test(e)}function Xg(e=m()){return/webos/i.test(e)}function Jg(e=m()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Zg(){return function(){const e=m();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function em(e=m()){return Jg(e)||Yg(e)||Xg(e)||Qg(e)||/windows phone/i.test(e)||Wg(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(e,t=[]){let n;switch(e){case"Browser":n=Hg(m());break;case"Worker":n=`${Hg(m())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ge}/${r}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{n(e(t))}catch(Yd){r(Yd)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(Yd){t.reverse();for(const r of t)try{r()}catch(n){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==Yd?void 0:Yd.message})}}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rm{constructor(e){var t;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??6,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),void 0!==n.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),void 0!==n.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),void 0!==n.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),void 0!==n.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(null==(t=e.allowedNonAlphanumericCharacters)?void 0:t.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new am(this),this.idTokenSubscription=new am(this),this.beforeStateQueue=new nm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Yf,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Fg(t)),this._initializationPromise=this.queue(async()=>{var n,r,s;if(!this._deleted&&(this.persistenceManager=await jg.create(this,e),null==(n=this._resolvePersistenceManagerAvailable)||n.call(this),!this._deleted)){if(null==(r=this._popupRedirectResolver)?void 0:r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(Yd){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null==(s=this.currentUser)?void 0:s.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(e,!0)):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await Cg(this,{idToken:e}),n=await Ug._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(qe(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null==(t=this.redirectUser)?void 0:t._redirectEventId,i=null==r?void 0:r._redirectEventId,a=await this.tryRedirectSignIn(e);n&&n!==i||!(null==a?void 0:a.user)||(r=a.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(Yd){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(Yd))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return rg(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(Yd){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Lg(e)}catch(Yd){if("auth/network-request-failed"!==(null==Yd?void 0:Yd.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(qe(this.app))return Promise.reject(tg(this));const t=e?N(e):null;return t&&rg(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&rg(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return qe(this.app)?Promise.reject(tg(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return qe(this.app)?Promise.reject(tg(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Fg(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return mg(e,"GET","/v2/passwordPolicy",gg(e,t))}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this),t=new rm(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new v("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return mg(e,"POST","/v2/accounts:revokeToken",gg(e,t))}(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null==(e=this._currentUser)?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Fg(e)||this._popupRedirectResolver;rg(t,this,"argument-error"),this.redirectPersistenceManager=await jg.create(this,[Fg(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),(null==(t=this._currentUser)?void 0:t._redirectEventId)===e?this._currentUser:(null==(n=this.redirectUser)?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=(null==(e=this.currentUser)?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const s="function"==typeof t?t:t.next.bind(t);let i=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(rg(a,this,"internal-error"),a.then(()=>{i||s(this.currentUser)}),"function"==typeof t){const s=e.addObserver(t,n,r);return()=>{i=!0,s()}}{const n=e.addObserver(t);return()=>{i=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return rg(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=tm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null==(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await(null==(e=this.appCheckServiceProvider.getImmediate({optional:!0}))?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){Qf.logLevel<=x.WARN&&Qf.warn(`Auth (${Ge}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function im(e){return N(e)}class am{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new A(e,t);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return rg(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let om={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function um(e){return om.loadJS(e)}class cm{constructor(){this.enterprise=new lm}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class lm{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const hm="NO_RECAPTCHA",dm="onFirebaseAuthREInstanceReady";class pm{constructor(e){this.type="recaptcha-enterprise",this.auth=im(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{(async function(e,t){return mg(e,"GET","/v2/recaptchaConfig",gg(e,t))})(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new Ig(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})}function r(t,n,r){const s=window.grecaptcha;bg(s)?s.enterprise.ready(()=>{s.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(hm)})}):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new cm).execute("siteKey",{action:"verify"})}return new Promise((e,s)=>{n(this.auth).then(async n=>{if(!t&&bg(window.grecaptcha)&&pm.scriptInjectionDeferred)await pm.scriptInjectionDeferred.promise,r(n,e,s);else{if("undefined"==typeof window)return void s(new Error("RecaptchaVerifier is only supported in browser"));let t=om.recaptchaEnterpriseScript;0!==t.length&&(t+=n+`&onload=${dm}`),pm.scriptInjectionDeferred=new f,window[dm]=()=>{var e;null==(e=pm.scriptInjectionDeferred)||e.resolve()},um(t).then(()=>{var e;return null==(e=pm.scriptInjectionDeferred)?void 0:e.promise}).then(()=>{r(n,e,s)}).catch(e=>{s(e)})}}).catch(e=>{s(e)})})}}async function fm(e,t,n,r=!1,s=!1){const i=new pm(e);let a;if(s)a=hm;else try{a=await i.verify(n)}catch(u){a=await i.verify(n,!0)}const o={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in o){const e=o.phoneEnrollmentInfo.phoneNumber,t=o.phoneEnrollmentInfo.recaptchaToken;Object.assign(o,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in o){const e=o.phoneSignInInfo.recaptchaToken;Object.assign(o,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return o}return r?Object.assign(o,{captchaResp:a}):Object.assign(o,{captchaResponse:a}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function gm(e,t,n,r,s){var i;if(null==(i=e._getRecaptchaConfig())?void 0:i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await fm(e,t,n,"getOobCode"===n);return r(e,s)}return r(e,t).catch(async s=>{if("auth/missing-recaptcha-token"===s.code){const s=await fm(e,t,n,"getOobCode"===n);return r(e,s)}return Promise.reject(s)})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mm(e,t,n){const r=im(e);rg(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=ym(t),{host:i,port:a}=function(e){const t=ym(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const e=s[1];return{host:e,port:_m(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:_m(t)}}}(t),o=null===a?"":`:${a}`,u={url:`${s}//${i}${o}/`},c=Object.freeze({host:i,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:!1})});if(!r._canInitEmulator)return rg(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void rg(E(u,r.config.emulator)&&E(c,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=u,r.emulatorConfig=c,r.settings.appVerificationDisabledForTesting=!0,R(i)?O(`${s}//${i}${o}`):function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&console.info;"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function ym(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function _m(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}pm.scriptInjectionDeferred=null;class vm{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return sg("not implemented")}_getIdTokenResponse(e){return sg("not implemented")}_linkToIdToken(e,t){return sg("not implemented")}_getReauthenticationResolver(e){return sg("not implemented")}}async function wm(e,t){return mg(e,"POST","/v1/accounts:signUp",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Em(e,t){return _g(e,"POST","/v1/accounts:signInWithPassword",gg(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tm extends vm{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Tm(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Tm(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return gm(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",Em);case"emailLink":return async function(e,t){return _g(e,"POST","/v1/accounts:signInWithEmailLink",gg(e,t))}(e,{email:this._email,oobCode:this._password});default:Jf(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return gm(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",wm);case"emailLink":return async function(e,t){return _g(e,"POST","/v1/accounts:signInWithEmailLink",gg(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:Jf(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bm(e,t){return _g(e,"POST","/v1/accounts:signInWithIdp",gg(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Im extends vm{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Im(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Jf("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...s}=t;if(!n||!r)return null;const i=new Im(n,r);return i.idToken=s.idToken||void 0,i.accessToken=s.accessToken||void 0,i.secret=s.secret,i.nonce=s.nonce,i.pendingToken=s.pendingToken||null,i}_getIdTokenResponse(e){return bm(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,bm(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,bm(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=b(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(e){const t=I(C(e)),n=t.apiKey??null,r=t.oobCode??null,s=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);rg(n&&r&&s,"argument-error"),this.apiKey=n,this.operation=s,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=function(e){const t=I(C(e)).link,n=t?I(C(t)).deep_link_id:null,r=I(C(e)).deep_link_id;return(r?I(C(r)).link:null)||r||n||t||e}(e);try{return new Cm(t)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(){this.providerId=Am.PROVIDER_ID}static credential(e,t){return Tm._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Cm.parseLink(t);return rg(n,"argument-error"),Tm._fromEmailAndCode(e,n.code,n.tenantId)}}Am.PROVIDER_ID="password",Am.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Am.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Sm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nm extends Sm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm extends Nm{constructor(){super("facebook.com")}static credential(e){return Im._fromParams({providerId:Rm.PROVIDER_ID,signInMethod:Rm.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rm.credentialFromTaggedObject(e)}static credentialFromError(e){return Rm.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return Rm.credential(e.oauthAccessToken)}catch{return null}}}Rm.FACEBOOK_SIGN_IN_METHOD="facebook.com",Rm.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Om extends Nm{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Im._fromParams({providerId:Om.PROVIDER_ID,signInMethod:Om.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Om.credentialFromTaggedObject(e)}static credentialFromError(e){return Om.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Om.credential(t,n)}catch{return null}}}Om.GOOGLE_SIGN_IN_METHOD="google.com",Om.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class km extends Nm{constructor(){super("github.com")}static credential(e){return Im._fromParams({providerId:km.PROVIDER_ID,signInMethod:km.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return km.credentialFromTaggedObject(e)}static credentialFromError(e){return km.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return km.credential(e.oauthAccessToken)}catch{return null}}}km.GITHUB_SIGN_IN_METHOD="github.com",km.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Dm extends Nm{constructor(){super("twitter.com")}static credential(e,t){return Im._fromParams({providerId:Dm.PROVIDER_ID,signInMethod:Dm.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Dm.credentialFromTaggedObject(e)}static credentialFromError(e){return Dm.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Dm.credential(t,n)}catch{return null}}}Dm.TWITTER_SIGN_IN_METHOD="twitter.com",Dm.PROVIDER_ID="twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Lm{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const s=await Ug._fromIdTokenResponse(e,n,r),i=Pm(n);return new Lm({user:s,providerId:i,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=Pm(n);return new Lm({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function Pm(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm extends _{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,xm.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new xm(e,t,n,r)}}function Mm(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw xm._fromErrorAndOperation(e,n,t,r);throw n})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Um(e,t,n=!1){if(qe(e.app))return Promise.reject(tg(e));const r="signIn",s=await Mm(e,r,t),i=await Lm._fromIdTokenResponse(e,r,s);return n||await e._updateCurrentUser(i.user),i}function Vm(e,t,n){return qe(e.app)?Promise.reject(tg(e)):async function(e,t){return Um(im(e),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(N(e),Am.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&async function(e){const t=im(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}(e),t})}function Fm(e,t,n,r){return N(e).onAuthStateChanged(t,n,r)}function Bm(e){return N(e).signOut()}const $m="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem($m,"1"),this.storage.removeItem($m),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jm extends qm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=em(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},s=this.storage.getItem(n);Zg()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}jm.type="LOCAL";const Hm=jm;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm extends qm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Gm.type="SESSION";const zm=Gm;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Km{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new Km(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:s}=t.data,i=this.handlersMap[r];if(!(null==i?void 0:i.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const a=Array.from(i).map(async e=>e(t.origin,s)),o=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}(a);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:o})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Wm(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Km.receivers=[];class Ym{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,i;return new Promise((a,o)=>{const u=Wm("",20);r.port1.start();const c=setTimeout(()=>{o(new Error("unsupported_event"))},n);i={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===u)switch(t.data.status){case"ack":clearTimeout(c),s=setTimeout(()=>{o(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(t.data.response);break;default:clearTimeout(c),clearTimeout(s),o(new Error("invalid_response"))}}},this.handlers.add(i),r.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[r.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qm(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Xm(){return void 0!==Qm().WorkerGlobalScope&&"function"==typeof Qm().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Jm="firebaseLocalStorageDb",Zm="firebaseLocalStorage",ey="fbase_key";class ty{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ny(e,t){return e.transaction([Zm],t?"readwrite":"readonly").objectStore(Zm)}function ry(){const e=indexedDB.open(Jm,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(Zm,{keyPath:ey})}catch(Yd){n(Yd)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(Zm)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(Jm);return new ty(e).toPromise()}(),t(await ry()))})})}async function sy(e,t,n){const r=ny(e,!0).put({[ey]:t,value:n});return new ty(r).toPromise()}function iy(e,t){const n=ny(e,!0).delete(t);return new ty(n).toPromise()}class ay{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise||(this.dbPromise=ry(),this.dbPromise.catch(()=>{this.dbPromise=null})),this.dbPromise}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(Yd){if(t++>3)throw Yd;if(this.dbPromise){(await this.dbPromise).close(),this.dbPromise=null}}}async initializeServiceWorkerMessaging(){return Xm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Km._getInstance(Xm()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}(),!this.activeServiceWorker)return;this.sender=new Ym(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null==(e=n[0])?void 0:e.fulfilled)&&(null==(t=n[0])?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null==(t=null==navigator?void 0:navigator.serviceWorker)?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return!!indexedDB&&(await this._withRetries(async e=>{await sy(e,$m,"1"),await iy(e,$m)}),!0)}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>sy(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=ny(e,!1).get(t),r=await new ty(n).toPromise();return void 0===r?null:r.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>iy(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=ny(e,!1).getAll();return new ty(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:s}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}ay.type="LOCAL";const oy=ay;new cg(3e4,6e4);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class uy extends vm{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return bm(e,this._buildIdpRequest())}_linkToIdToken(e,t){return bm(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return bm(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function cy(e){return Um(e.auth,new uy(e),e.bypassAuthState)}function ly(e){const{auth:t,user:n}=e;return rg(n,t,"internal-error"),
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t,n=!1){const{auth:r}=e;if(qe(r.app))return Promise.reject(tg(r));const s="reauthenticate";try{const i=await Og(e,Mm(r,s,t,e),n);rg(i.idToken,r,"internal-error");const a=Ng(i.idToken);rg(a,r,"internal-error");const{sub:o}=a;return rg(e.uid===o,r,"user-mismatch"),Lm._forOperation(e,s,i)}catch(Yd){throw"auth/user-not-found"===(null==Yd?void 0:Yd.code)&&Jf(r,"user-mismatch"),Yd}}(n,new uy(e),e.bypassAuthState)}async function hy(e){const{auth:t,user:n}=e;return rg(n,t,"internal-error"),async function(e,t,n=!1){const r=await Og(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Lm._forOperation(e,"link",r)}(n,new uy(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dy{constructor(e,t,n,r,s=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(Yd){this.reject(Yd)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:s,error:i,type:a}=e;if(i)return void this.reject(i);const o={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(o))}catch(Yd){this.reject(Yd)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return cy;case"linkViaPopup":case"linkViaRedirect":return hy;case"reauthViaPopup":case"reauthViaRedirect":return ly;default:Jf(this.auth,"internal-error")}}resolve(e){ig(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ig(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py=new cg(2e3,1e4);class fy extends dy{constructor(e,t,n,r,s){super(e,t,r,s),this.provider=n,this.authWindow=null,this.pollId=null,fy.currentPopupAction&&fy.currentPopupAction.cancel(),fy.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return rg(e,this.auth,"internal-error"),e}async onExecution(){ig(1===this.filter.length,"Popup operations only handle one event");const e=Wm();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(Zf(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null==(e=this.authWindow)?void 0:e.associatedEvent)||null}cancel(){this.reject(Zf(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,fy.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null==(n=null==(t=this.authWindow)?void 0:t.window)?void 0:n.closed)?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Zf(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,py.get())};e()}}fy.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gy="pendingRedirect",my=new Map;class yy extends dy{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=my.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return qg(gy,e.config.apiKey,e.name)}(t),r=function(e){return Fg(e._redirectPersistence)}(e);if(!(await r._isAvailable()))return!1;const s="true"===await r._get(n);return await r._remove(n),s}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(Yd){e=()=>Promise.reject(Yd)}my.set(this.auth._key(),e)}return this.bypassAuthState||my.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function _y(e,t){my.set(e._key(),t)}async function vy(e,t,n=!1){if(qe(e.app))return Promise.reject(tg(e));const r=im(e),s=
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){return t?Fg(t):(rg(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}(r,t),i=new yy(r,s,n),a=await i.execute();return a&&!n&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,t)),a}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ty(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Ty(e)){const r=(null==(n=e.error.code)?void 0:n.split("auth/")[1])||"internal-error";t.onError(Zf(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ey(e))}saveEventToCache(e){this.cachedEventUids.add(Ey(e)),this.lastProcessedEventTime=Date.now()}}function Ey(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function Ty({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const by=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Iy=/^https?/;async function Cy(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return mg(e,"GET","/v1/projects",t)}(e);for(const n of t)try{if(Ay(n))return}catch{}Jf(e,"unauthorized-domain")}function Ay(e){const t=ag(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const s=new URL(e);return""===s.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&s.hostname===r}if(!Iy.test(n))return!1;if(by.test(e))return r===e;const s=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sy=new cg(3e4,6e4);function Ny(){const e=Qm().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function Ry(e){return new Promise((t,n)=>{var r,s,i;function a(){Ny(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Ny(),n(Zf(e,"network-request-failed"))},timeout:Sy.get()})}if(null==(s=null==(r=Qm().gapi)?void 0:r.iframes)?void 0:s.Iframe)t(gapi.iframes.getContext());else{if(!(null==(i=Qm().gapi)?void 0:i.load)){const t=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return Qm()[t]=()=>{gapi.load?a():n(Zf(e,"network-request-failed"))},um(`${om.gapiScript}?onload=${t}`).catch(e=>n(e))}a()}}).catch(e=>{throw Oy=null,e})}let Oy=null;
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ky=new cg(5e3,15e3),Dy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ly=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Py(e){const t=e.config;rg(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?lg(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:Ge},s=Ly.get(e.config.apiHost);s&&(r.eid=s);const i=e._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${b(r).slice(1)}`}async function xy(e){const t=await function(e){return Oy=Oy||Ry(e),Oy}(e),n=Qm().gapi;return rg(n,e,"internal-error"),t.open({where:document.body,url:Py(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Dy,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const s=Zf(e,"network-request-failed"),i=Qm().setTimeout(()=>{r(s)},ky.get());function a(){Qm().clearTimeout(i),n(t)}t.ping(a).then(a,()=>{r(s)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const My={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Uy{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(Yd){}}}function Vy(e,t,n,r=500,s=600){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let o="";const u={...My,width:r.toString(),height:s.toString(),top:i,left:a},c=m().toLowerCase();n&&(o=Kg(c)?"_blank":n),Gg(c)&&(t=t||"http://localhost",u.scrollbars="yes");const l=Object.entries(u).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=m()){var t;return Jg(e)&&!!(null==(t=window.navigator)?void 0:t.standalone)}(c)&&"_self"!==o)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t||"",o),new Uy(null);const h=window.open(t||"",o,l);rg(h,e,"popup-blocked");try{h.focus()}catch(Yd){}return new Uy(h)}const Fy="__/auth/handler",By="emulator/auth/handler",$y=encodeURIComponent("fac");async function qy(e,t,n,r,s,i){rg(e.config.authDomain,e,"auth-domain-config-required"),rg(e.config.apiKey,e,"invalid-api-key");const a={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:Ge,eventId:s};if(t instanceof Sm){t.setDefaultLanguage(e.languageCode),a.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(a.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))a[e]=t}if(t instanceof Nm){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(a.scopes=e.join(","))}e.tenantId&&(a.tid=e.tenantId);const o=a;for(const l of Object.keys(o))void 0===o[l]&&delete o[l];const u=await e._getAppCheckToken(),c=u?`#${$y}=${encodeURIComponent(u)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${Fy}`;return lg(e,By)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)}?${b(o).slice(1)}${c}`}const jy="webStorageSupport";const Hy=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=zm,this._completeRedirectFn=vy,this._overrideRedirectResult=_y}async _openPopup(e,t,n,r){var s;ig(null==(s=this.eventManagers[e._key()])?void 0:s.manager,"_initialize() not called before _openPopup()");return Vy(e,await qy(e,t,n,ag(),r),Wm())}async _openRedirect(e,t,n,r){await this._originValidation(e);return function(e){Qm().location.href=e}(await qy(e,t,n,ag(),r)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(ig(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await xy(e),n=new wy(e);return t.register("authEvent",t=>{rg(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(jy,{type:jy},n=>{var r;const s=null==(r=null==n?void 0:n[0])?void 0:r[jy];void 0!==s&&t(!!s),Jf(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Cy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return em()||zg()||Jg()}};var Gy="@firebase/auth",zy="1.13.3";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ky{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null==(e=this.auth.currentUser)?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){rg(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Wy=p("authIdTokenMaxAge")||300;let Yy=null;function Qy(e=Ke()){const t=$e(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=$e(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(E(n.getOptions(),t??{}))return e;Jf(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:Hy,persistence:[oy,Hm,zm]}),r=p("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(r,location.origin);if(location.origin===e.origin){const t=(s=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>Wy)return;const r=null==t?void 0:t.token;Yy!==r&&(Yy=r,await fetch(s,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))});!function(e,t,n){N(e).beforeAuthStateChanged(t,n)}(n,t,()=>t(n.currentUser)),function(e,t,n,r){N(e).onIdTokenChanged(t,n,r)}(n,e=>t(e))}}var s;const i=l("auth");return i&&mm(n,`http://${i}`),n}var Xy,Jy;Xy={loadJS:e=>new Promise((t,n)=>{const r=document.createElement("script");var s;r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=Zf("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",((null==(s=document.getElementsByTagName("head"))?void 0:s[0])??document).appendChild(r)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},om=Xy,Jy="Browser",Be(new k("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:i,authDomain:a}=n.options;rg(i&&!i.includes(":"),"invalid-api-key",{appName:n.name});const o={apiKey:i,authDomain:a,clientPlatform:Jy,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:tm(Jy)},u=new sm(n,r,s,o);return function(e,t){const n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Fg);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Be(new k("auth-internal",e=>{const t=im(e.getProvider("auth").getImmediate());return new Ky(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),We(Gy,zy,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(Jy)),We(Gy,zy,"esm2020");export{Gf as a,mf as b,su as c,iu as d,gf as e,Qy as f,qp as g,vf as h,ze as i,wf as j,Ru as k,Bm as l,Fm as m,Ef as n,sf as o,yf as p,ef as q,Ou as r,Vm as s,_f as u};
