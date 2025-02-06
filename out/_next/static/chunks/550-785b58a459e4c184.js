"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[550],{3610:(e,r,t)=>{t.d(r,{m:()=>o});function o(e,r,{checkForDefaultPrevented:t=!0}={}){return function(o){if(e?.(o),!1===t||!o.defaultPrevented)return r?.(o)}}},8068:(e,r,t)=>{t.d(r,{s:()=>s,t:()=>l});var o=t(2115);function n(e,r){if("function"==typeof e)return e(r);null!=e&&(e.current=r)}function l(...e){return r=>{let t=!1,o=e.map(e=>{let o=n(e,r);return t||"function"!=typeof o||(t=!0),o});if(t)return()=>{for(let r=0;r<o.length;r++){let t=o[r];"function"==typeof t?t():n(e[r],null)}}}}function s(...e){return o.useCallback(l(...e),e)}},8166:(e,r,t)=>{t.d(r,{A:()=>s,q:()=>l});var o=t(2115),n=t(5155);function l(e,r){let t=o.createContext(r),l=e=>{let{children:r,...l}=e,s=o.useMemo(()=>l,Object.values(l));return(0,n.jsx)(t.Provider,{value:s,children:r})};return l.displayName=e+"Provider",[l,function(n){let l=o.useContext(t);if(l)return l;if(void 0!==r)return r;throw Error(`\`${n}\` must be used within \`${e}\``)}]}function s(e,r=[]){let t=[],l=()=>{let r=t.map(e=>o.createContext(e));return function(t){let n=t?.[e]||r;return o.useMemo(()=>({[`__scope${e}`]:{...t,[e]:n}}),[t,n])}};return l.scopeName=e,[function(r,l){let s=o.createContext(l),i=t.length;t=[...t,l];let a=r=>{let{scope:t,children:l,...a}=r,d=t?.[e]?.[i]||s,c=o.useMemo(()=>a,Object.values(a));return(0,n.jsx)(d.Provider,{value:c,children:l})};return a.displayName=r+"Provider",[a,function(t,n){let a=n?.[e]?.[i]||s,d=o.useContext(a);if(d)return d;if(void 0!==l)return l;throw Error(`\`${t}\` must be used within \`${r}\``)}]},function(...e){let r=e[0];if(1===e.length)return r;let t=()=>{let t=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let n=t.reduce((r,{useScope:t,scopeName:o})=>{let n=t(e)[`__scope${o}`];return{...r,...n}},{});return o.useMemo(()=>({[`__scope${r.scopeName}`]:n}),[n])}};return t.scopeName=r.scopeName,t}(l,...r)]}},7028:(e,r,t)=>{t.d(r,{C:()=>s});var o=t(2115),n=t(8068),l=t(6611),s=e=>{let{present:r,children:t}=e,s=function(e){var r,t;let[n,s]=o.useState(),a=o.useRef({}),d=o.useRef(e),c=o.useRef("none"),[u,p]=(r=e?"mounted":"unmounted",t={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},o.useReducer((e,r)=>{let o=t[e][r];return null!=o?o:e},r));return o.useEffect(()=>{let e=i(a.current);c.current="mounted"===u?e:"none"},[u]),(0,l.N)(()=>{let r=a.current,t=d.current;if(t!==e){let o=c.current,n=i(r);e?p("MOUNT"):"none"===n||(null==r?void 0:r.display)==="none"?p("UNMOUNT"):t&&o!==n?p("ANIMATION_OUT"):p("UNMOUNT"),d.current=e}},[e,p]),(0,l.N)(()=>{if(n){var e;let r;let t=null!==(e=n.ownerDocument.defaultView)&&void 0!==e?e:window,o=e=>{let o=i(a.current).includes(e.animationName);if(e.target===n&&o&&(p("ANIMATION_END"),!d.current)){let e=n.style.animationFillMode;n.style.animationFillMode="forwards",r=t.setTimeout(()=>{"forwards"===n.style.animationFillMode&&(n.style.animationFillMode=e)})}},l=e=>{e.target===n&&(c.current=i(a.current))};return n.addEventListener("animationstart",l),n.addEventListener("animationcancel",o),n.addEventListener("animationend",o),()=>{t.clearTimeout(r),n.removeEventListener("animationstart",l),n.removeEventListener("animationcancel",o),n.removeEventListener("animationend",o)}}p("ANIMATION_END")},[n,p]),{isPresent:["mounted","unmountSuspended"].includes(u),ref:o.useCallback(e=>{e&&(a.current=getComputedStyle(e)),s(e)},[])}}(r),a="function"==typeof t?t({present:s.isPresent}):o.Children.only(t),d=(0,n.s)(s.ref,function(e){var r,t;let o=null===(r=Object.getOwnPropertyDescriptor(e.props,"ref"))||void 0===r?void 0:r.get,n=o&&"isReactWarning"in o&&o.isReactWarning;return n?e.ref:(n=(o=null===(t=Object.getOwnPropertyDescriptor(e,"ref"))||void 0===t?void 0:t.get)&&"isReactWarning"in o&&o.isReactWarning)?e.props.ref:e.props.ref||e.ref}(a));return"function"==typeof t||s.isPresent?o.cloneElement(a,{ref:d}):null};function i(e){return(null==e?void 0:e.animationName)||"none"}s.displayName="Presence"},1524:(e,r,t)=>{t.d(r,{c:()=>n});var o=t(2115);function n(e){let r=o.useRef(e);return o.useEffect(()=>{r.current=e}),o.useMemo(()=>(...e)=>r.current?.(...e),[])}},1488:(e,r,t)=>{t.d(r,{i:()=>l});var o=t(2115),n=t(1524);function l({prop:e,defaultProp:r,onChange:t=()=>{}}){let[l,s]=function({defaultProp:e,onChange:r}){let t=o.useState(e),[l]=t,s=o.useRef(l),i=(0,n.c)(r);return o.useEffect(()=>{s.current!==l&&(i(l),s.current=l)},[l,s,i]),t}({defaultProp:r,onChange:t}),i=void 0!==e,a=i?e:l,d=(0,n.c)(t);return[a,o.useCallback(r=>{if(i){let t="function"==typeof r?r(e):r;t!==e&&d(t)}else s(r)},[i,e,s,d])]}},5630:(e,r,t)=>{t.d(r,{U:()=>l});var o=t(2115),n=t(1524);function l(e,r=globalThis?.document){let t=(0,n.c)(e);o.useEffect(()=>{let e=e=>{"Escape"===e.key&&t(e)};return r.addEventListener("keydown",e,{capture:!0}),()=>r.removeEventListener("keydown",e,{capture:!0})},[t,r])}},6611:(e,r,t)=>{t.d(r,{N:()=>n});var o=t(2115),n=globalThis?.document?o.useLayoutEffect:()=>{}},1027:(e,r,t)=>{t.d(r,{F:()=>s});var o=t(3463);let n=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,l=o.$,s=(e,r)=>t=>{var o;if((null==r?void 0:r.variants)==null)return l(e,null==t?void 0:t.class,null==t?void 0:t.className);let{variants:s,defaultVariants:i}=r,a=Object.keys(s).map(e=>{let r=null==t?void 0:t[e],o=null==i?void 0:i[e];if(null===r)return null;let l=n(r)||n(o);return s[e][l]}),d=t&&Object.entries(t).reduce((e,r)=>{let[t,o]=r;return void 0===o||(e[t]=o),e},{});return l(e,a,null==r?void 0:null===(o=r.compoundVariants)||void 0===o?void 0:o.reduce((e,r)=>{let{class:t,className:o,...n}=r;return Object.entries(n).every(e=>{let[r,t]=e;return Array.isArray(t)?t.includes({...i,...d}[r]):({...i,...d})[r]===t})?[...e,t,o]:e},[]),null==t?void 0:t.class,null==t?void 0:t.className)}},3463:(e,r,t)=>{t.d(r,{$:()=>o});function o(){for(var e,r,t=0,o="",n=arguments.length;t<n;t++)(e=arguments[t])&&(r=function e(r){var t,o,n="";if("string"==typeof r||"number"==typeof r)n+=r;else if("object"==typeof r){if(Array.isArray(r)){var l=r.length;for(t=0;t<l;t++)r[t]&&(o=e(r[t]))&&(n&&(n+=" "),n+=o)}else for(o in r)r[o]&&(n&&(n+=" "),n+=o)}return n}(e))&&(o&&(o+=" "),o+=r);return o}},4057:(e,r,t)=>{t.d(r,{A:()=>a});var o=t(2115);let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),l=function(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return r.filter((e,r,t)=>!!e&&""!==e.trim()&&t.indexOf(e)===r).join(" ").trim()};var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,o.forwardRef)((e,r)=>{let{color:t="currentColor",size:n=24,strokeWidth:i=2,absoluteStrokeWidth:a,className:d="",children:c,iconNode:u,...p}=e;return(0,o.createElement)("svg",{ref:r,...s,width:n,height:n,stroke:t,strokeWidth:a?24*Number(i)/Number(n):i,className:l("lucide",d),...p},[...u.map(e=>{let[r,t]=e;return(0,o.createElement)(r,t)}),...Array.isArray(c)?c:[c]])}),a=(e,r)=>{let t=(0,o.forwardRef)((t,s)=>{let{className:a,...d}=t;return(0,o.createElement)(i,{ref:s,iconNode:r,className:l("lucide-".concat(n(e)),a),...d})});return t.displayName="".concat(e),t}},9795:(e,r,t)=>{t.d(r,{QP:()=>eu});let o=e=>{let r=i(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:e=>{let t=e.split("-");return""===t[0]&&1!==t.length&&t.shift(),n(t,r)||s(e)},getConflictingClassGroupIds:(e,r)=>{let n=t[e]||[];return r&&o[e]?[...n,...o[e]]:n}}},n=(e,r)=>{if(0===e.length)return r.classGroupId;let t=e[0],o=r.nextPart.get(t),l=o?n(e.slice(1),o):void 0;if(l)return l;if(0===r.validators.length)return;let s=e.join("-");return r.validators.find(({validator:e})=>e(s))?.classGroupId},l=/^\[(.+)\]$/,s=e=>{if(l.test(e)){let r=l.exec(e)[1],t=r?.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}},i=e=>{let{theme:r,classGroups:t}=e,o={nextPart:new Map,validators:[]};for(let e in t)a(t[e],o,e,r);return o},a=(e,r,t,o)=>{e.forEach(e=>{if("string"==typeof e){(""===e?r:d(r,e)).classGroupId=t;return}if("function"==typeof e){if(c(e)){a(e(o),r,t,o);return}r.validators.push({validator:e,classGroupId:t});return}Object.entries(e).forEach(([e,n])=>{a(n,d(r,e),t,o)})})},d=(e,r)=>{let t=e;return r.split("-").forEach(e=>{t.nextPart.has(e)||t.nextPart.set(e,{nextPart:new Map,validators:[]}),t=t.nextPart.get(e)}),t},c=e=>e.isThemeGetter,u=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let r=0,t=new Map,o=new Map,n=(n,l)=>{t.set(n,l),++r>e&&(r=0,o=t,t=new Map)};return{get(e){let r=t.get(e);return void 0!==r?r:void 0!==(r=o.get(e))?(n(e,r),r):void 0},set(e,r){t.has(e)?t.set(e,r):n(e,r)}}},p=e=>{let{prefix:r,experimentalParseClassName:t}=e,o=e=>{let r;let t=[],o=0,n=0,l=0;for(let s=0;s<e.length;s++){let i=e[s];if(0===o&&0===n){if(":"===i){t.push(e.slice(l,s)),l=s+1;continue}if("/"===i){r=s;continue}}"["===i?o++:"]"===i?o--:"("===i?n++:")"===i&&n--}let s=0===t.length?e:e.substring(l),i=f(s);return{modifiers:t,hasImportantModifier:i!==s,baseClassName:i,maybePostfixModifierPosition:r&&r>l?r-l:void 0}};if(r){let e=r+":",t=o;o=r=>r.startsWith(e)?t(r.substring(e.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:r,maybePostfixModifierPosition:void 0}}if(t){let e=o;o=r=>t({className:r,parseClassName:e})}return o},f=e=>e.endsWith("!")?e.substring(0,e.length-1):e.startsWith("!")?e.substring(1):e,b=e=>{let r=Object.fromEntries(e.orderSensitiveModifiers.map(e=>[e,!0]));return e=>{if(e.length<=1)return e;let t=[],o=[];return e.forEach(e=>{"["===e[0]||r[e]?(t.push(...o.sort(),e),o=[]):o.push(e)}),t.push(...o.sort()),t}},m=e=>({cache:u(e.cacheSize),parseClassName:p(e),sortModifiers:b(e),...o(e)}),g=/\s+/,h=(e,r)=>{let{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:n,sortModifiers:l}=r,s=[],i=e.trim().split(g),a="";for(let e=i.length-1;e>=0;e-=1){let r=i[e],{isExternal:d,modifiers:c,hasImportantModifier:u,baseClassName:p,maybePostfixModifierPosition:f}=t(r);if(d){a=r+(a.length>0?" "+a:a);continue}let b=!!f,m=o(b?p.substring(0,f):p);if(!m){if(!b||!(m=o(p))){a=r+(a.length>0?" "+a:a);continue}b=!1}let g=l(c).join(":"),h=u?g+"!":g,v=h+m;if(s.includes(v))continue;s.push(v);let w=n(m,b);for(let e=0;e<w.length;++e){let r=w[e];s.push(h+r)}a=r+(a.length>0?" "+a:a)}return a};function v(){let e,r,t=0,o="";for(;t<arguments.length;)(e=arguments[t++])&&(r=w(e))&&(o&&(o+=" "),o+=r);return o}let w=e=>{let r;if("string"==typeof e)return e;let t="";for(let o=0;o<e.length;o++)e[o]&&(r=w(e[o]))&&(t&&(t+=" "),t+=r);return t},x=e=>{let r=r=>r[e]||[];return r.isThemeGetter=!0,r},y=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,k=/^\((?:(\w[\w-]*):)?(.+)\)$/i,N=/^\d+\/\d+$/,z=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,M=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,E=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,j=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,O=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,C=e=>N.test(e),P=e=>!!e&&!Number.isNaN(Number(e)),A=e=>!!e&&Number.isInteger(Number(e)),T=e=>e.endsWith("%")&&P(e.slice(0,-1)),$=e=>z.test(e),I=()=>!0,_=e=>M.test(e)&&!E.test(e),S=()=>!1,L=e=>j.test(e),R=e=>O.test(e),U=e=>!W(e)&&!Q(e),G=e=>ee(e,es,S),W=e=>y.test(e),D=e=>ee(e,ei,_),F=e=>ee(e,ea,P),q=e=>ee(e,et,S),V=e=>ee(e,en,R),B=e=>ee(e,S,L),Q=e=>k.test(e),Z=e=>er(e,ei),H=e=>er(e,ed),J=e=>er(e,et),K=e=>er(e,es),X=e=>er(e,en),Y=e=>er(e,ec,!0),ee=(e,r,t)=>{let o=y.exec(e);return!!o&&(o[1]?r(o[1]):t(o[2]))},er=(e,r,t=!1)=>{let o=k.exec(e);return!!o&&(o[1]?r(o[1]):t)},et=e=>"position"===e,eo=new Set(["image","url"]),en=e=>eo.has(e),el=new Set(["length","size","percentage"]),es=e=>el.has(e),ei=e=>"length"===e,ea=e=>"number"===e,ed=e=>"family-name"===e,ec=e=>"shadow"===e;Symbol.toStringTag;let eu=function(e,...r){let t,o,n;let l=function(i){return o=(t=m(r.reduce((e,r)=>r(e),e()))).cache.get,n=t.cache.set,l=s,s(i)};function s(e){let r=o(e);if(r)return r;let l=h(e,t);return n(e,l),l}return function(){return l(v.apply(null,arguments))}}(()=>{let e=x("color"),r=x("font"),t=x("text"),o=x("font-weight"),n=x("tracking"),l=x("leading"),s=x("breakpoint"),i=x("container"),a=x("spacing"),d=x("radius"),c=x("shadow"),u=x("inset-shadow"),p=x("drop-shadow"),f=x("blur"),b=x("perspective"),m=x("aspect"),g=x("ease"),h=x("animate"),v=()=>["auto","avoid","all","avoid-page","page","left","right","column"],w=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],y=()=>["auto","hidden","clip","visible","scroll"],k=()=>["auto","contain","none"],N=()=>[C,"px","full","auto",Q,W,a],z=()=>[A,"none","subgrid",Q,W],M=()=>["auto",{span:["full",A,Q,W]},Q,W],E=()=>[A,"auto",Q,W],j=()=>["auto","min","max","fr",Q,W],O=()=>[Q,W,a],_=()=>["start","end","center","between","around","evenly","stretch","baseline"],S=()=>["start","end","center","stretch"],L=()=>[Q,W,a],R=()=>["px",...L()],ee=()=>["px","auto",...L()],er=()=>[C,"auto","px","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",Q,W,a],et=()=>[e,Q,W],eo=()=>[T,D],en=()=>["","none","full",d,Q,W],el=()=>["",P,Z,D],es=()=>["solid","dashed","dotted","double"],ei=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],ea=()=>["","none",f,Q,W],ed=()=>["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",Q,W],ec=()=>["none",P,Q,W],eu=()=>["none",P,Q,W],ep=()=>[P,Q,W],ef=()=>[C,"full","px",Q,W,a];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[$],breakpoint:[$],color:[I],container:[$],"drop-shadow":[$],ease:["in","out","in-out"],font:[U],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[$],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[$],shadow:[$],spacing:[P],text:[$],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",C,W,Q,m]}],container:["container"],columns:[{columns:[P,W,Q,i]}],"break-after":[{"break-after":v()}],"break-before":[{"break-before":v()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...w(),W,Q]}],overflow:[{overflow:y()}],"overflow-x":[{"overflow-x":y()}],"overflow-y":[{"overflow-y":y()}],overscroll:[{overscroll:k()}],"overscroll-x":[{"overscroll-x":k()}],"overscroll-y":[{"overscroll-y":k()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:N()}],"inset-x":[{"inset-x":N()}],"inset-y":[{"inset-y":N()}],start:[{start:N()}],end:[{end:N()}],top:[{top:N()}],right:[{right:N()}],bottom:[{bottom:N()}],left:[{left:N()}],visibility:["visible","invisible","collapse"],z:[{z:[A,"auto",Q,W]}],basis:[{basis:[C,"full","auto",Q,W,i,a]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[P,C,"auto","initial","none",W]}],grow:[{grow:["",P,Q,W]}],shrink:[{shrink:["",P,Q,W]}],order:[{order:[A,"first","last","none",Q,W]}],"grid-cols":[{"grid-cols":z()}],"col-start-end":[{col:M()}],"col-start":[{"col-start":E()}],"col-end":[{"col-end":E()}],"grid-rows":[{"grid-rows":z()}],"row-start-end":[{row:M()}],"row-start":[{"row-start":E()}],"row-end":[{"row-end":E()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":j()}],"auto-rows":[{"auto-rows":j()}],gap:[{gap:O()}],"gap-x":[{"gap-x":O()}],"gap-y":[{"gap-y":O()}],"justify-content":[{justify:[..._(),"normal"]}],"justify-items":[{"justify-items":[...S(),"normal"]}],"justify-self":[{"justify-self":["auto",...S()]}],"align-content":[{content:["normal",..._()]}],"align-items":[{items:[...S(),"baseline"]}],"align-self":[{self:["auto",...S(),"baseline"]}],"place-content":[{"place-content":_()}],"place-items":[{"place-items":[...S(),"baseline"]}],"place-self":[{"place-self":["auto",...S()]}],p:[{p:R()}],px:[{px:R()}],py:[{py:R()}],ps:[{ps:R()}],pe:[{pe:R()}],pt:[{pt:R()}],pr:[{pr:R()}],pb:[{pb:R()}],pl:[{pl:R()}],m:[{m:ee()}],mx:[{mx:ee()}],my:[{my:ee()}],ms:[{ms:ee()}],me:[{me:ee()}],mt:[{mt:ee()}],mr:[{mr:ee()}],mb:[{mb:ee()}],ml:[{ml:ee()}],"space-x":[{"space-x":L()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":L()}],"space-y-reverse":["space-y-reverse"],size:[{size:er()}],w:[{w:[i,"screen",...er()]}],"min-w":[{"min-w":[i,"screen","none",...er()]}],"max-w":[{"max-w":[i,"screen","none","prose",{screen:[s]},...er()]}],h:[{h:["screen",...er()]}],"min-h":[{"min-h":["screen","none",...er()]}],"max-h":[{"max-h":["screen",...er()]}],"font-size":[{text:["base",t,Z,D]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[o,Q,F]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",T,W]}],"font-family":[{font:[H,W,r]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[n,Q,W]}],"line-clamp":[{"line-clamp":[P,"none",Q,F]}],leading:[{leading:[Q,W,l,a]}],"list-image":[{"list-image":["none",Q,W]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",Q,W]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:et()}],"text-color":[{text:et()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...es(),"wavy"]}],"text-decoration-thickness":[{decoration:[P,"from-font","auto",Q,D]}],"text-decoration-color":[{decoration:et()}],"underline-offset":[{"underline-offset":[P,"auto",Q,W]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:["px",...L()]}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Q,W]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Q,W]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...w(),J,q]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","space","round"]}]}],"bg-size":[{bg:["auto","cover","contain",K,G]}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},A,Q,W],radial:["",Q,W],conic:[A,Q,W]},X,V]}],"bg-color":[{bg:et()}],"gradient-from-pos":[{from:eo()}],"gradient-via-pos":[{via:eo()}],"gradient-to-pos":[{to:eo()}],"gradient-from":[{from:et()}],"gradient-via":[{via:et()}],"gradient-to":[{to:et()}],rounded:[{rounded:en()}],"rounded-s":[{"rounded-s":en()}],"rounded-e":[{"rounded-e":en()}],"rounded-t":[{"rounded-t":en()}],"rounded-r":[{"rounded-r":en()}],"rounded-b":[{"rounded-b":en()}],"rounded-l":[{"rounded-l":en()}],"rounded-ss":[{"rounded-ss":en()}],"rounded-se":[{"rounded-se":en()}],"rounded-ee":[{"rounded-ee":en()}],"rounded-es":[{"rounded-es":en()}],"rounded-tl":[{"rounded-tl":en()}],"rounded-tr":[{"rounded-tr":en()}],"rounded-br":[{"rounded-br":en()}],"rounded-bl":[{"rounded-bl":en()}],"border-w":[{border:el()}],"border-w-x":[{"border-x":el()}],"border-w-y":[{"border-y":el()}],"border-w-s":[{"border-s":el()}],"border-w-e":[{"border-e":el()}],"border-w-t":[{"border-t":el()}],"border-w-r":[{"border-r":el()}],"border-w-b":[{"border-b":el()}],"border-w-l":[{"border-l":el()}],"divide-x":[{"divide-x":el()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":el()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...es(),"hidden","none"]}],"divide-style":[{divide:[...es(),"hidden","none"]}],"border-color":[{border:et()}],"border-color-x":[{"border-x":et()}],"border-color-y":[{"border-y":et()}],"border-color-s":[{"border-s":et()}],"border-color-e":[{"border-e":et()}],"border-color-t":[{"border-t":et()}],"border-color-r":[{"border-r":et()}],"border-color-b":[{"border-b":et()}],"border-color-l":[{"border-l":et()}],"divide-color":[{divide:et()}],"outline-style":[{outline:[...es(),"none","hidden"]}],"outline-offset":[{"outline-offset":[P,Q,W]}],"outline-w":[{outline:["",P,Z,D]}],"outline-color":[{outline:[e]}],shadow:[{shadow:["","none",c,Y,B]}],"shadow-color":[{shadow:et()}],"inset-shadow":[{"inset-shadow":["none",Q,W,u]}],"inset-shadow-color":[{"inset-shadow":et()}],"ring-w":[{ring:el()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:et()}],"ring-offset-w":[{"ring-offset":[P,D]}],"ring-offset-color":[{"ring-offset":et()}],"inset-ring-w":[{"inset-ring":el()}],"inset-ring-color":[{"inset-ring":et()}],opacity:[{opacity:[P,Q,W]}],"mix-blend":[{"mix-blend":[...ei(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":ei()}],filter:[{filter:["","none",Q,W]}],blur:[{blur:ea()}],brightness:[{brightness:[P,Q,W]}],contrast:[{contrast:[P,Q,W]}],"drop-shadow":[{"drop-shadow":["","none",p,Q,W]}],grayscale:[{grayscale:["",P,Q,W]}],"hue-rotate":[{"hue-rotate":[P,Q,W]}],invert:[{invert:["",P,Q,W]}],saturate:[{saturate:[P,Q,W]}],sepia:[{sepia:["",P,Q,W]}],"backdrop-filter":[{"backdrop-filter":["","none",Q,W]}],"backdrop-blur":[{"backdrop-blur":ea()}],"backdrop-brightness":[{"backdrop-brightness":[P,Q,W]}],"backdrop-contrast":[{"backdrop-contrast":[P,Q,W]}],"backdrop-grayscale":[{"backdrop-grayscale":["",P,Q,W]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[P,Q,W]}],"backdrop-invert":[{"backdrop-invert":["",P,Q,W]}],"backdrop-opacity":[{"backdrop-opacity":[P,Q,W]}],"backdrop-saturate":[{"backdrop-saturate":[P,Q,W]}],"backdrop-sepia":[{"backdrop-sepia":["",P,Q,W]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":L()}],"border-spacing-x":[{"border-spacing-x":L()}],"border-spacing-y":[{"border-spacing-y":L()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",Q,W]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[P,"initial",Q,W]}],ease:[{ease:["linear","initial",g,Q,W]}],delay:[{delay:[P,Q,W]}],animate:[{animate:["none",h,Q,W]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[b,Q,W]}],"perspective-origin":[{"perspective-origin":ed()}],rotate:[{rotate:ec()}],"rotate-x":[{"rotate-x":ec()}],"rotate-y":[{"rotate-y":ec()}],"rotate-z":[{"rotate-z":ec()}],scale:[{scale:eu()}],"scale-x":[{"scale-x":eu()}],"scale-y":[{"scale-y":eu()}],"scale-z":[{"scale-z":eu()}],"scale-3d":["scale-3d"],skew:[{skew:ep()}],"skew-x":[{"skew-x":ep()}],"skew-y":[{"skew-y":ep()}],transform:[{transform:[Q,W,"","none","gpu","cpu"]}],"transform-origin":[{origin:ed()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:ef()}],"translate-x":[{"translate-x":ef()}],"translate-y":[{"translate-y":ef()}],"translate-z":[{"translate-z":ef()}],"translate-none":["translate-none"],accent:[{accent:et()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:et()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Q,W]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":L()}],"scroll-mx":[{"scroll-mx":L()}],"scroll-my":[{"scroll-my":L()}],"scroll-ms":[{"scroll-ms":L()}],"scroll-me":[{"scroll-me":L()}],"scroll-mt":[{"scroll-mt":L()}],"scroll-mr":[{"scroll-mr":L()}],"scroll-mb":[{"scroll-mb":L()}],"scroll-ml":[{"scroll-ml":L()}],"scroll-p":[{"scroll-p":L()}],"scroll-px":[{"scroll-px":L()}],"scroll-py":[{"scroll-py":L()}],"scroll-ps":[{"scroll-ps":L()}],"scroll-pe":[{"scroll-pe":L()}],"scroll-pt":[{"scroll-pt":L()}],"scroll-pr":[{"scroll-pr":L()}],"scroll-pb":[{"scroll-pb":L()}],"scroll-pl":[{"scroll-pl":L()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Q,W]}],fill:[{fill:["none",...et()]}],"stroke-w":[{stroke:[P,Z,D,F]}],stroke:[{stroke:["none",...et()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["before","after","placeholder","file","marker","selection","first-line","first-letter","backdrop","*","**"]}})}}]);