const V=Object.entries,nt=Object.fromEntries,ot="ENTRIES",T="KEYS",R="VALUES",F="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===F)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==F).join("")}value(){return E(this._path).node.get(F)}result(){switch(this._type){case R:return this.value();case T:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],ut=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return W(e,t,s,n,i,1,o,""),n},W=(e,t,s,n,o,u,i,r)=>{const d=u*i;t:for(const l of e.keys())if(l===F){const a=o[d-1];a<=s&&n.set(r,[e.get(l),a])}else{let a=u;for(let h=0;h<l.length;++h,++a){const m=l[h],p=i*a,f=p-i;let c=o[p];const g=Math.max(0,a-s-1),_=Math.min(i-1,a+s);for(let y=g;y<_;++y){const b=m!==t[y],z=o[f+y]+ +b,A=o[f+y+1]+1,w=o[p+y]+1,L=o[p+y+1]=Math.min(z,A,w);L<c&&(c=L)}if(c>s)continue t}W(e.get(l),t,s,n,o,a,i,r+l)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=M(n);for(const i of o.keys())if(i!==F&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,it(this._tree,t)}entries(){return new D(this,ot)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ut(this._tree,t,s)}get(t){const s=I(this._tree,t);return s!==void 0?s.get(F):void 0}has(t){const s=I(this._tree,t);return s!==void 0&&s.has(F)}keys(){return new D(this,T)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,O(this._tree,t).set(F,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=O(this._tree,t);return n.set(F,s(n.get(F))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=O(this._tree,t);let o=n.get(F);return o===void 0&&n.set(F,o=s()),o}values(){return new D(this,R)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==F&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},I=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==F&&t.startsWith(s))return I(e.get(s),t.slice(s.length))},O=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==F&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const d=e.get(u);if(r===u.length)e=d;else{const l=new Map;l.set(u.slice(r),d),e.set(t.slice(n,n+r),l),e.delete(u),e=l}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},it=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(F),s.size===0)q(n);else if(s.size===1){const[o,u]=s.entries().next().value;$(n,o,u)}}},q=e=>{if(e.length===0)return;const[t,s]=M(e);if(t.delete(s),t.size===0)q(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==F&&$(e.slice(0,-1),n,o)}},$=(e,t,s)=>{if(e.length===0)return;const[n,o]=M(e);n.set(o+t,s),n.delete(o)},M=e=>e[e.length-1],rt=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},ct=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,S="or",P="and",lt="and_not",ht=(e,t)=>{e.includes(t)||e.push(t)},G=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},N=({score:e},{score:t})=>t-e,dt=()=>new Map,k=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},H=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,at={[S]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),G(n.terms,u)}}return e},[P]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);G(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[lt]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},ft=(e,t,s,n,o,u)=>{const{k:i,b:r,d}=u;return Math.log(1+(s-t+.5)/(t+.5))*(d+e*(i+1)/(e+i*(1-r+r*n/o)))},gt=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},J=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},mt=(e,t,s,n)=>{if(!e._index.has(n)){J(e,s,t,n);return}const o=e._index.fetch(n,dt),u=o.get(t);u==null||u.get(s)==null?J(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},pt={k:1.2,b:.7,d:.5},Ft={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(ct),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof console?.[e]=="function"&&console[e](t)},autoVacuum:!0},U={combineWith:S,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:pt},_t={combineWith:P,prefix:(e,t,s)=>t===s.length-1},yt={batchSize:1e3,batchWait:10},Y={minDirtFactor:.1,minDirtCount:20},At={...yt,...Y},X=(e,t=S)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(at[s])||new Map},B=(e,t,s,n,o,u,i,r,d=new Map)=>{if(o==null)return d;for(const l of Object.keys(u)){const a=u[l],h=e._fieldIds[l],m=o.get(h);if(m==null)continue;let p=m.size;const f=e._avgFieldLength[h];for(const c of m.keys()){if(!e._documentIds.has(c)){mt(e,h,c,s),p-=1;continue}const g=i?i(e._documentIds.get(c),s,e._storedFields.get(c)):1;if(!g)continue;const _=m.get(c),y=e._fieldLength.get(c)[h],b=ft(_,p,e._documentCount,y,f,r),z=n*a*g*b,A=d.get(c);if(A){A.score+=z,ht(A.terms,t);const w=H(A.match,s);w?w.push(l):A.match[s]=[l]}else d.set(c,{score:z,terms:[t],match:{[s]:[l]}})}}return d},Ct=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((c,g)=>({...c,[g]:H(n.boost,g)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:d}=n,{fuzzy:l,prefix:a}={...U.weights,...i},h=e._index.get(t.term),m=B(e,t.term,t.term,1,h,o,u,d);let p,f;if(t.prefix&&(p=e._index.atPrefix(t.term)),t.fuzzy){const c=t.fuzzy===!0?.2:t.fuzzy,g=c<1?Math.min(r,Math.round(t.term.length*c)):c;g&&(f=e._index.fuzzyGet(t.term,g))}if(p)for(const[c,g]of p){const _=c.length-t.term.length;if(!_)continue;f?.delete(c);const y=a*c.length/(c.length+.3*_);B(e,t.term,c,y,g,o,u,d,m)}if(f)for(const c of f.keys()){const[g,_]=f.get(c);if(!_)continue;const y=l*c.length/(c.length+_);B(e,t.term,c,y,g,o,u,d,m)}return m},K=(e,t,s={})=>{if(typeof t!="string"){const a={...s,...t,queries:void 0},h=t.queries.map(m=>K(e,m,a));return X(h,a.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:d}=i,l=r(t).flatMap(a=>d(a)).filter(a=>!!a).map(gt(i)).map(a=>Ct(e,a,i));return X(l,i.combineWith)},Q=(e,t,s={})=>{const n=K(e,t,s),o=[];for(const[u,{score:i,terms:r,match:d}]of n){const l=r.length,a={id:e._documentIds.get(u),score:i*l,terms:Object.keys(d),match:d};Object.assign(a,e._storedFields.get(u)),(s.filter==null||s.filter(a))&&o.push(a)}return o.sort(N),o},Et=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of Q(e,t,s)){const r=i.join(" "),d=n.get(r);d!=null?(d.score+=u,d.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:d}]of n)o.push({suggestion:u,terms:r,score:i/d});return o.sort(N),o};class zt{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(t?.fields==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?At:t.autoVacuum;this._options={...Ft,...t,autoVacuum:s,searchOptions:{...U,...t.searchOptions||{}},autoSuggestOptions:{..._t,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=Y,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const wt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:d,serializationVersion:l},a)=>{if(l!==1&&l!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const h=new zt(a);h._documentCount=t,h._nextId=s,h._documentIds=k(n),h._idToShortId=new Map,h._fieldIds=o,h._fieldLength=k(u),h._avgFieldLength=i,h._storedFields=k(r),h._dirtCount=d||0,h._index=new C;for(const[m,p]of h._documentIds)h._idToShortId.set(p,m);for(const[m,p]of e){const f=new Map;for(const c of Object.keys(p)){let g=p[c];l===1&&(g=g.ds),f.set(parseInt(c,10),k(g))}h._index.set(m,f)}return h},j=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(l,a=!1)=>{let h="";i===0?h=l.length>20?`… ${l.slice(-20)}`:l:a?h=l.length+i>100?`${l.slice(0,100-i)}… `:l:h=l.length>20?`${l.slice(0,20)} … ${l.slice(-20)}`:l,h&&o.push(h),i+=h.length,a||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let d=s.indexOf(n,u);if(d===-1)return null;for(;d>=0;){const l=d+n.length;if(r(e.slice(u,d)),u=l,i>100)break;d=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},Z=/[\u4e00-\u9fa5]/g,tt=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(Z)||[],n=t.replace(Z,"").toLowerCase();return n?[n,...s]:[...s]},...e}),xt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),kt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),et=(e,t,s={})=>{const n={};return Q(t,e,tt({boost:{h:2,t:1,c:4},...s})).forEach(o=>{const{id:u,terms:i,score:r}=o,d=u.includes("@"),l=u.includes("#"),[a,h]=u.split(/[#@]/),m=i.sort((f,c)=>f.length-c.length).filter((f,c)=>i.slice(c+1).every(g=>!g.includes(f))),{contents:p}=n[a]??={title:"",contents:[]};if(d)p.push([{type:"customField",key:a,index:h,display:m.map(f=>o.c.map(c=>j(c,f))).flat().filter(f=>f!==null)},r]);else{const f=m.map(c=>j(o.h,c)).filter(c=>c!==null);if(f.length&&p.push([{type:l?"heading":"title",key:a,...l&&{anchor:h},display:f},r]),"t"in o)for(const c of o.t){const g=m.map(_=>j(c,_)).filter(_=>_!==null);g.length&&p.push([{type:"text",key:a,...l&&{anchor:h},display:g},r])}}}),V(n).sort(([,o],[,u])=>"max"==="total"?xt(o,u):kt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=rt(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},st=(e,t,s={})=>Et(t,e,tt(s)).map(({suggestion:n})=>n),v=nt(V(JSON.parse("{\"/\":{\"documentCount\":67,\"nextId\":67,\"documentIds\":{\"0\":\"v-8daa1a0e\",\"1\":\"v-184f4da6\",\"2\":\"v-1473bf53\",\"3\":\"v-1473bf53@0\",\"4\":\"v-4e65ec78\",\"5\":\"v-4e65ec78@0\",\"6\":\"v-4e65ec78@1\",\"7\":\"v-33d62ebc\",\"8\":\"v-33d62ebc@0\",\"9\":\"v-33d62ebc@1\",\"10\":\"v-438ffe52\",\"11\":\"v-438ffe52#markdown-介绍\",\"12\":\"v-438ffe52#markdown-配置\",\"13\":\"v-438ffe52#markdown-扩展\",\"14\":\"v-438ffe52#vuepress-扩展\",\"15\":\"v-438ffe52#主题扩展\",\"16\":\"v-438ffe52#提示容器\",\"17\":\"v-438ffe52#代码块\",\"18\":\"v-438ffe52#上下角标\",\"19\":\"v-438ffe52#自定义对齐\",\"20\":\"v-438ffe52#attrs\",\"21\":\"v-438ffe52#脚注\",\"22\":\"v-438ffe52#标记\",\"23\":\"v-438ffe52#任务列表\",\"24\":\"v-438ffe52#图片增强\",\"25\":\"v-438ffe52#组件\",\"26\":\"v-438ffe52@0\",\"27\":\"v-438ffe52@1\",\"28\":\"v-6e19edb7\",\"29\":\"v-6e19edb7#页面标题\",\"30\":\"v-6e19edb7#页面信息\",\"31\":\"v-6e19edb7#页面内容\",\"32\":\"v-6e19edb7#组件\",\"33\":\"v-6e19edb7@0\",\"34\":\"v-6e19edb7@1\",\"35\":\"v-14f0dace\",\"36\":\"v-14f0dace@0\",\"37\":\"v-14f0dace@1\",\"38\":\"v-67648c2e\",\"39\":\"v-67648c2e@0\",\"40\":\"v-67648c2e@1\",\"41\":\"v-4f4a209b\",\"42\":\"v-4f4a209b@0\",\"43\":\"v-4f4a209b@1\",\"44\":\"v-20955d24\",\"45\":\"v-20955d24@0\",\"46\":\"v-20955d24@1\",\"47\":\"v-4a0f1b50\",\"48\":\"v-4a0f1b50@0\",\"49\":\"v-4a0f1b50@1\",\"50\":\"v-7177c9e8\",\"51\":\"v-7177c9e8@0\",\"52\":\"v-7177c9e8@1\",\"53\":\"v-5d523e7e\",\"54\":\"v-5d523e7e@0\",\"55\":\"v-5d523e7e@1\",\"56\":\"v-c8c5ae34\",\"57\":\"v-c8c5ae34@0\",\"58\":\"v-c8c5ae34@1\",\"59\":\"v-55fe055a\",\"60\":\"v-55fe055a@0\",\"61\":\"v-55fe055a@1\",\"62\":\"v-d5411460\",\"63\":\"v-d5411460@0\",\"64\":\"v-d5411460@1\",\"65\":\"v-146a1089\",\"66\":\"v-139a9e40\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1],\"1\":[1,2],\"2\":[1],\"3\":[null,null,1],\"4\":[1,18],\"5\":[null,null,1],\"6\":[null,null,1],\"7\":[1,20],\"8\":[null,null,1],\"9\":[null,null,1],\"10\":[2,11],\"11\":[2,8],\"12\":[2,13],\"13\":[2,11],\"14\":[2,10],\"15\":[1,10],\"16\":[1,19],\"17\":[1,1],\"18\":[1,3],\"19\":[1,3],\"20\":[1,5],\"21\":[1,2],\"22\":[1,3],\"23\":[1,6],\"24\":[1,2],\"25\":[1],\"26\":[null,null,1],\"27\":[null,null,1],\"28\":[1,3],\"29\":[1,19],\"30\":[1,20],\"31\":[1,12],\"32\":[1,13],\"33\":[null,null,1],\"34\":[null,null,2],\"35\":[1,1],\"36\":[null,null,1],\"37\":[null,null,1],\"38\":[1],\"39\":[null,null,1],\"40\":[null,null,1],\"41\":[1],\"42\":[null,null,1],\"43\":[null,null,1],\"44\":[1],\"45\":[null,null,1],\"46\":[null,null,1],\"47\":[1],\"48\":[null,null,1],\"49\":[null,null,1],\"50\":[1,1],\"51\":[null,null,1],\"52\":[null,null,1],\"53\":[1],\"54\":[null,null,1],\"55\":[null,null,1],\"56\":[1],\"57\":[null,null,1],\"58\":[null,null,1],\"59\":[1,1],\"60\":[null,null,1],\"61\":[null,null,1],\"62\":[1],\"63\":[null,null,1],\"64\":[null,null,1],\"65\":[1],\"66\":[1]},\"averageFieldLength\":[1.1282159915181802,7.389362029884906,0.7695485055246788],\"storedFields\":{\"0\":{\"h\":\"主页\"},\"1\":{\"h\":\"介绍页\",\"t\":[\"将你的个人介绍和档案放置在此处。\"]},\"2\":{\"h\":\"主要功能与配置演示\"},\"3\":{\"c\":[\"使用指南\"]},\"4\":{\"h\":\"布局与功能禁用\",\"t\":[\"你可以通过设置页面的 Frontmatter，在页面禁用功能与布局。\",\"本页面就是一个示例，禁用了如下功能:\",\"导航栏\",\"侧边栏\",\"路径导航\",\"页面信息\",\"贡献者\",\"编辑此页链接\",\"更新时间\",\"上一篇/下一篇 链接\",\"评论\",\"页脚\",\"返回顶部按钮\"]},\"5\":{\"c\":[\"使用指南\"]},\"6\":{\"c\":[\"禁用\"]},\"7\":{\"h\":\"布局\",\"t\":[\"布局包括:\",\"导航栏\",\"侧边栏\",\"页脚\",\"同时每个页面包含:\",\"路径导航\",\"标题和页面信息\",\"TOC (文章标题列表)\",\"贡献者、更新时间等页面元信息\",\"评论\",\"主题也带有以下元素:\",\"夜间模式按钮\",\"返回顶部按钮\",\"打印按钮\",\"你可以在主题选项和页面的 frontmatter 中自定义它们。\"]},\"8\":{\"c\":[\"指南\"]},\"9\":{\"c\":[\"布局\"]},\"10\":{\"h\":\"Markdown 展示\",\"t\":[\"VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。\",\"你应该创建和编写 Markdown 文件，以便 VuePress 可以根据文件结构将它们转换为不同的页面。\"]},\"11\":{\"h\":\"Markdown 介绍\",\"t\":[\"如果你是一个新手，还不会编写 Markdown，请先阅读 Markdown 介绍 和 Markdown 演示。\"]},\"12\":{\"h\":\"Markdown 配置\",\"t\":[\"VuePress 通过 Frontmatter 为每个 Markdown 页面引入配置。\",\"相关信息\",\"Frontmatter 是 VuePress 中很重要的一个概念，如果你不了解它，你需要阅读 Frontmatter 介绍。\"]},\"13\":{\"h\":\"Markdown 扩展\",\"t\":[\"VuePress 会使用 markdown-it 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 语法扩展 。\"]},\"14\":{\"h\":\"VuePress 扩展\",\"t\":[\"为了丰富文档写作，VuePress 对 Markdown 语法进行了扩展。\",\"关于这些扩展，请阅读 VuePress 中的 Markdown 扩展。\"]},\"15\":{\"h\":\"主题扩展\",\"t\":[\"通过 vuepress-plugin-md-enhance，主题扩展了更多 Markdown 语法，提供更加丰富的写作功能。\"]},\"16\":{\"h\":\"提示容器\",\"t\":[\"安全的在 Markdown 中使用 {{ variable }}。\",\"自定义标题\",\"信息容器，包含 代码 与 链接。\",\"const a = 1; \",\"自定义标题\",\"提示容器\",\"自定义标题\",\"警告容器\",\"自定义标题\",\"危险容器\",\"自定义标题\",\"详情容器\",\"查看详情\"]},\"17\":{\"h\":\"代码块\",\"t\":[\"查看详情\"]},\"18\":{\"h\":\"上下角标\",\"t\":[\"19th H2O\",\"查看详情\"]},\"19\":{\"h\":\"自定义对齐\",\"t\":[\"我是居中的\",\"我在右对齐\",\"查看详情\"]},\"20\":{\"h\":\"Attrs\",\"t\":[\"一个拥有 ID 的 单词。\",\"查看详情\"]},\"21\":{\"h\":\"脚注\",\"t\":[\"此文字有脚注^first.\",\"查看详情\"]},\"22\":{\"h\":\"标记\",\"t\":[\"你可以标记 重要的内容 。\",\"查看详情\"]},\"23\":{\"h\":\"任务列表\",\"t\":[\"[x] 计划 1\",\"[ ] 计划 2\",\"查看详情\"]},\"24\":{\"h\":\"图片增强\",\"t\":[\"支持为图片设置颜色模式和大小\",\"查看详情\"]},\"25\":{\"h\":\"组件\"},\"26\":{\"c\":[\"使用指南\"]},\"27\":{\"c\":[\"Markdown\"]},\"28\":{\"h\":\"页面配置\",\"t\":[\"more 注释之前的内容被视为文章摘要。\"]},\"29\":{\"h\":\"页面标题\",\"t\":[\"The first H1 title in Markdown will be regarded as page title.\",\"Markdown 中的第一个 H1 标题会被视为页面标题。\",\"你可以在 Markdown 的 Frontmatter 中设置页面标题。\",\"--- title: 页面标题 --- \"]},\"30\":{\"h\":\"页面信息\",\"t\":[\"你可以在 Markdown 的 Frontmatter 中设置页面信息。\",\"作者设置为 Ms.Hope。\",\"写作日期为 2020 年 1 月 1 日\",\"分类为 “使用指南”\",\"标签为 “页面配置” 和 “使用指南”\"]},\"31\":{\"h\":\"页面内容\",\"t\":[\"你可以自由在这里书写你的 Markdown。\",\"图片引入\",\"你可以将图片和 Markdown 文件放置在一起使用相对路径进行引用。\",\"对于 .vuepress/public 文件夹的图片，请使用绝对链接 / 进行引用。\"]},\"32\":{\"h\":\"组件\",\"t\":[\"每个 Markdown 页面都会被转换为一个 Vue 组件，这意味着你可以在 Markdown 中使用 Vue 语法：\",\"{{ 1 + 1 }}\",\"{{ i }}\",\"你也可以创建并引入你自己的组件。\"]},\"33\":{\"c\":[\"使用指南\"]},\"34\":{\"c\":[\"页面配置\",\"使用指南\"]},\"35\":{\"h\":\"数学\",\"t\":[\"唯有数学不会说谎\"]},\"36\":{\"c\":[\"数学\"]},\"37\":{\"c\":[\"Essays\"]},\"38\":{\"h\":\"游戏引擎杂谈\"},\"39\":{\"c\":[\"游戏引擎\"]},\"40\":{\"c\":[\"Essays\"]},\"41\":{\"h\":\"图形学概论\"},\"42\":{\"c\":[\"图形学\"]},\"43\":{\"c\":[\"Essays\"]},\"44\":{\"h\":\"编程语言\"},\"45\":{\"c\":[\"编程语言\"]},\"46\":{\"c\":[\"Essays\"]},\"47\":{\"h\":\"动漫\"},\"48\":{\"c\":[\"动漫\"]},\"49\":{\"c\":[\"Essays\"]},\"50\":{\"h\":\"电影\",\"t\":[\"测试\"]},\"51\":{\"c\":[\"电影\"]},\"52\":{\"c\":[\"Essays\"]},\"53\":{\"h\":\"音乐\"},\"54\":{\"c\":[\"音乐\"]},\"55\":{\"c\":[\"Essays\"]},\"56\":{\"h\":\"胡思乱想\"},\"57\":{\"c\":[\"胡思乱想\"]},\"58\":{\"c\":[\"Essays\"]},\"59\":{\"h\":\"数学\",\"t\":[\"唯有数学不会说谎\"]},\"60\":{\"c\":[\"数学\"]},\"61\":{\"c\":[\"Essays\"]},\"62\":{\"h\":\"编程语言\"},\"63\":{\"c\":[\"胡思乱想\"]},\"64\":{\"c\":[\"Essays\"]},\"65\":{\"h\":\"Code\"},\"66\":{\"h\":\"Essays\"}},\"dirtCount\":0,\"index\":[[\"code\",{\"0\":{\"65\":1}}],[\"const\",{\"1\":{\"16\":1}}],[\"胡思乱想\",{\"0\":{\"56\":1},\"2\":{\"57\":1,\"63\":1}}],[\"音乐\",{\"0\":{\"53\":1},\"2\":{\"54\":1}}],[\"测试\",{\"1\":{\"50\":1}}],[\"电影\",{\"0\":{\"50\":1},\"2\":{\"51\":1}}],[\"动漫\",{\"0\":{\"47\":1},\"2\":{\"48\":1}}],[\"编程语言\",{\"0\":{\"44\":1,\"62\":1},\"2\":{\"45\":1}}],[\"编辑此页链接\",{\"1\":{\"4\":1}}],[\"图形学\",{\"2\":{\"42\":1}}],[\"图形学概论\",{\"0\":{\"41\":1}}],[\"图片引入\",{\"1\":{\"31\":1}}],[\"图片增强\",{\"0\":{\"24\":1}}],[\"游戏引擎\",{\"2\":{\"39\":1}}],[\"游戏引擎杂谈\",{\"0\":{\"38\":1}}],[\"essays\",{\"0\":{\"66\":1},\"2\":{\"37\":1,\"40\":1,\"43\":1,\"46\":1,\"49\":1,\"52\":1,\"55\":1,\"58\":1,\"61\":1,\"64\":1}}],[\"enhance\",{\"1\":{\"15\":1}}],[\"唯有数学不会说谎\",{\"1\":{\"35\":1,\"59\":1}}],[\"数学\",{\"0\":{\"35\":1,\"59\":1},\"2\":{\"36\":1,\"60\":1}}],[\"+\",{\"1\":{\"32\":1}}],[\"这意味着你可以在\",{\"1\":{\"32\":1}}],[\"每个\",{\"1\":{\"32\":1}}],[\"进行引用\",{\"1\":{\"31\":1}}],[\"分类为\",{\"1\":{\"30\":1}}],[\"日\",{\"1\":{\"30\":1}}],[\"月\",{\"1\":{\"30\":1}}],[\"年\",{\"1\":{\"30\":1}}],[\"写作日期为\",{\"1\":{\"30\":1}}],[\"作者设置为\",{\"1\":{\"30\":1}}],[\"public\",{\"1\":{\"31\":1}}],[\"page\",{\"1\":{\"29\":1}}],[\"plugin\",{\"1\":{\"15\":1}}],[\"regarded\",{\"1\":{\"29\":1}}],[\"be\",{\"1\":{\"29\":1}}],[\"will\",{\"1\":{\"29\":1}}],[\"hope\",{\"1\":{\"30\":1}}],[\"h1\",{\"1\":{\"29\":2}}],[\"h2o\",{\"1\":{\"18\":1}}],[\"first\",{\"1\":{\"29\":1}}],[\"frontmatter\",{\"1\":{\"4\":1,\"7\":1,\"12\":3,\"29\":1,\"30\":1}}],[\"title\",{\"1\":{\"29\":3}}],[\"the\",{\"1\":{\"29\":1}}],[\"toc\",{\"1\":{\"7\":1}}],[\"注释之前的内容被视为文章摘要\",{\"1\":{\"28\":1}}],[\"组件\",{\"0\":{\"25\":1,\"32\":1},\"1\":{\"32\":1}}],[\"支持为图片设置颜色模式和大小\",{\"1\":{\"24\":1}}],[\"2020\",{\"1\":{\"30\":1}}],[\"2\",{\"1\":{\"23\":1}}],[\"计划\",{\"1\":{\"23\":2}}],[\"x\",{\"1\":{\"23\":1}}],[\"任务列表\",{\"0\":{\"23\":1}}],[\"重要的内容\",{\"1\":{\"22\":1}}],[\"标签为\",{\"1\":{\"30\":1}}],[\"标题会被视为页面标题\",{\"1\":{\"29\":1}}],[\"标题和页面信息\",{\"1\":{\"7\":1}}],[\"标记\",{\"0\":{\"22\":1}}],[\"此文字有脚注^first\",{\"1\":{\"21\":1}}],[\"脚注\",{\"0\":{\"21\":1}}],[\"单词\",{\"1\":{\"20\":1}}],[\"的\",{\"1\":{\"20\":1,\"29\":1,\"30\":1}}],[\"i\",{\"1\":{\"32\":1}}],[\"in\",{\"1\":{\"29\":1}}],[\"id\",{\"1\":{\"20\":1}}],[\"it\",{\"1\":{\"13\":2}}],[\"一个拥有\",{\"1\":{\"20\":1}}],[\"我在右对齐\",{\"1\":{\"19\":1}}],[\"我是居中的\",{\"1\":{\"19\":1}}],[\"自定义对齐\",{\"0\":{\"19\":1}}],[\"自定义标题\",{\"1\":{\"16\":5}}],[\"上下角标\",{\"0\":{\"18\":1}}],[\"上一篇\",{\"1\":{\"4\":1}}],[\"查看详情\",{\"1\":{\"16\":1,\"17\":1,\"18\":1,\"19\":1,\"20\":1,\"21\":1,\"22\":1,\"23\":1,\"24\":1}}],[\"详情容器\",{\"1\":{\"16\":1}}],[\"危险容器\",{\"1\":{\"16\":1}}],[\"警告容器\",{\"1\":{\"16\":1}}],[\"19th\",{\"1\":{\"18\":1}}],[\"1\",{\"1\":{\"16\":1,\"23\":1,\"30\":2,\"32\":2}}],[\"=\",{\"1\":{\"16\":1}}],[\"as\",{\"1\":{\"29\":1}}],[\"attrs\",{\"0\":{\"20\":1}}],[\"a\",{\"1\":{\"16\":1}}],[\"与\",{\"1\":{\"16\":1}}],[\"代码块\",{\"0\":{\"17\":1}}],[\"代码\",{\"1\":{\"16\":1}}],[\"包含\",{\"1\":{\"16\":1}}],[\"信息容器\",{\"1\":{\"16\":1}}],[\"vue\",{\"1\":{\"32\":2}}],[\"vuepress\",{\"0\":{\"14\":1},\"1\":{\"10\":2,\"12\":2,\"13\":1,\"14\":2,\"15\":1,\"31\":1}}],[\"variable\",{\"1\":{\"16\":1}}],[\"安全的在\",{\"1\":{\"16\":1}}],[\"提示容器\",{\"0\":{\"16\":1},\"1\":{\"16\":1}}],[\"提供更加丰富的写作功能\",{\"1\":{\"15\":1}}],[\"ms\",{\"1\":{\"30\":1}}],[\"more\",{\"1\":{\"28\":1}}],[\"md\",{\"1\":{\"15\":1}}],[\"markdown\",{\"0\":{\"10\":1,\"11\":1,\"12\":1,\"13\":1},\"1\":{\"10\":2,\"11\":3,\"12\":1,\"13\":3,\"14\":2,\"15\":1,\"16\":1,\"29\":3,\"30\":1,\"31\":2,\"32\":2},\"2\":{\"27\":1}}],[\"请使用绝对链接\",{\"1\":{\"31\":1}}],[\"请阅读\",{\"1\":{\"14\":1}}],[\"请先阅读\",{\"1\":{\"11\":1}}],[\"关于这些扩展\",{\"1\":{\"14\":1}}],[\"语法\",{\"1\":{\"15\":1,\"32\":1}}],[\"语法进行了扩展\",{\"1\":{\"14\":1}}],[\"语法扩展\",{\"1\":{\"13\":1}}],[\"对于\",{\"1\":{\"31\":1}}],[\"对\",{\"1\":{\"14\":1}}],[\"为了丰富文档写作\",{\"1\":{\"14\":1}}],[\"为每个\",{\"1\":{\"12\":1}}],[\"插件来实现\",{\"1\":{\"13\":1}}],[\"内容\",{\"1\":{\"13\":1}}],[\"来解析\",{\"1\":{\"13\":1}}],[\"会使用\",{\"1\":{\"13\":1}}],[\"扩展\",{\"0\":{\"13\":1,\"14\":1},\"1\":{\"14\":1}}],[\"如果你不了解它\",{\"1\":{\"12\":1}}],[\"如果你是一个新手\",{\"1\":{\"11\":1}}],[\"中设置页面信息\",{\"1\":{\"30\":1}}],[\"中设置页面标题\",{\"1\":{\"29\":1}}],[\"中使用\",{\"1\":{\"16\":1,\"32\":1}}],[\"中的第一个\",{\"1\":{\"29\":1}}],[\"中的\",{\"1\":{\"14\":1}}],[\"中很重要的一个概念\",{\"1\":{\"12\":1}}],[\"中自定义它们\",{\"1\":{\"7\":1}}],[\"是\",{\"1\":{\"12\":1}}],[\"相关信息\",{\"1\":{\"12\":1}}],[\"通过\",{\"1\":{\"12\":1,\"15\":1}}],[\"配置\",{\"0\":{\"12\":1}}],[\"演示\",{\"1\":{\"11\":1}}],[\"和\",{\"1\":{\"11\":1,\"30\":1}}],[\"还不会编写\",{\"1\":{\"11\":1}}],[\"介绍\",{\"0\":{\"11\":1},\"1\":{\"11\":1,\"12\":1}}],[\"介绍页\",{\"0\":{\"1\":1}}],[\"可以根据文件结构将它们转换为不同的页面\",{\"1\":{\"10\":1}}],[\"以便\",{\"1\":{\"10\":1}}],[\"你也可以创建并引入你自己的组件\",{\"1\":{\"32\":1}}],[\"你需要阅读\",{\"1\":{\"12\":1}}],[\"你应该创建和编写\",{\"1\":{\"10\":1}}],[\"你可以将图片和\",{\"1\":{\"31\":1}}],[\"你可以自由在这里书写你的\",{\"1\":{\"31\":1}}],[\"你可以在\",{\"1\":{\"29\":1,\"30\":1}}],[\"你可以在主题选项和页面的\",{\"1\":{\"7\":1}}],[\"你可以标记\",{\"1\":{\"22\":1}}],[\"你可以使用它轻松生成文档或博客站点\",{\"1\":{\"10\":1}}],[\"你可以通过设置页面的\",{\"1\":{\"4\":1}}],[\"因此可以借助于\",{\"1\":{\"13\":1}}],[\"因此\",{\"1\":{\"10\":1}}],[\"文件夹的图片\",{\"1\":{\"31\":1}}],[\"文件放置在一起使用相对路径进行引用\",{\"1\":{\"31\":1}}],[\"文件\",{\"1\":{\"10\":1}}],[\"文件生成页面\",{\"1\":{\"10\":1}}],[\"文章标题列表\",{\"1\":{\"7\":1}}],[\"展示\",{\"0\":{\"10\":1}}],[\"指南\",{\"2\":{\"8\":1}}],[\"打印按钮\",{\"1\":{\"7\":1}}],[\"夜间模式按钮\",{\"1\":{\"7\":1}}],[\"同时每个页面包含\",{\"1\":{\"7\":1}}],[\"布局包括\",{\"1\":{\"7\":1}}],[\"布局\",{\"0\":{\"7\":1},\"2\":{\"9\":1}}],[\"布局与功能禁用\",{\"0\":{\"4\":1}}],[\"禁用\",{\"2\":{\"6\":1}}],[\"禁用了如下功能\",{\"1\":{\"4\":1}}],[\"返回顶部按钮\",{\"1\":{\"4\":1,\"7\":1}}],[\"页面都会被转换为一个\",{\"1\":{\"32\":1}}],[\"页面内容\",{\"0\":{\"31\":1}}],[\"页面标题\",{\"0\":{\"29\":1},\"1\":{\"29\":1}}],[\"页面配置\",{\"0\":{\"28\":1},\"1\":{\"30\":1},\"2\":{\"34\":1}}],[\"页面引入配置\",{\"1\":{\"12\":1}}],[\"页面信息\",{\"0\":{\"30\":1},\"1\":{\"4\":1}}],[\"页脚\",{\"1\":{\"4\":1,\"7\":1}}],[\"评论\",{\"1\":{\"4\":1,\"7\":1}}],[\"链接\",{\"1\":{\"4\":1,\"16\":1}}],[\"下一篇\",{\"1\":{\"4\":1}}],[\"更新时间等页面元信息\",{\"1\":{\"7\":1}}],[\"更新时间\",{\"1\":{\"4\":1}}],[\"贡献者\",{\"1\":{\"4\":1,\"7\":1}}],[\"路径导航\",{\"1\":{\"4\":1,\"7\":1}}],[\"侧边栏\",{\"1\":{\"4\":1,\"7\":1}}],[\"导航栏\",{\"1\":{\"4\":1,\"7\":1}}],[\"本页面就是一个示例\",{\"1\":{\"4\":1}}],[\"在页面禁用功能与布局\",{\"1\":{\"4\":1}}],[\"使用指南\",{\"1\":{\"30\":2},\"2\":{\"3\":1,\"5\":1,\"26\":1,\"33\":1,\"34\":1}}],[\"主题扩展了更多\",{\"1\":{\"15\":1}}],[\"主题扩展\",{\"0\":{\"15\":1}}],[\"主题也带有以下元素\",{\"1\":{\"7\":1}}],[\"主要从\",{\"1\":{\"10\":1}}],[\"主要功能与配置演示\",{\"0\":{\"2\":1}}],[\"主页\",{\"0\":{\"0\":1}}],[\"将你的个人介绍和档案放置在此处\",{\"1\":{\"1\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,wt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(st(t,v[s],n)):e==="search"?self.postMessage(et(t,v[s],n)):self.postMessage({suggestions:st(t,v[s],n),results:et(t,v[s],n)})};
//# sourceMappingURL=index.js.map