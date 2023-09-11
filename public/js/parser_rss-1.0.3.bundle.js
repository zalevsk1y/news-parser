(()=>{"use strict";var e,t={5670:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.ProgressIndicator=void 0;var i=o(r(2735)),u=r(8576);t.ProgressIndicator=function(e){var t=e.hidden,r=e.total,n=e.count,a=e.children,o=(0,u.useScrolling)(),l=o[0],s=o[1];(0,i.useLayoutEffect)((function(){t?l():s()}),[t]);var c=(0,i.useMemo)((function(){return{width:"".concat(Math.round(100*n/r),"%")}}),[r,n]);return i.default.createElement("div",{hidden:t,"aria-hidden":t,role:"group","data-testid":"progress-indicator-container",className:"progress-indicator-container position-fixed"},i.default.createElement("div",{className:"progress-bar-outer"},i.default.createElement("div",{className:"progress-bar-inner",style:c,role:"progressbar","aria-valuemin":0,"aria-valuemax":r,"aria-valuenow":n,"data-testid":"progress-bar-inner"})),a)}},5593:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SidebarRightPost=t.SidebarRightTemplateSingle=t.SidebarRightTemplate=t.default=void 0;var n=r(8291);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.SidebarRight}});var a=r(2121);Object.defineProperty(t,"SidebarRightTemplate",{enumerable:!0,get:function(){return a.SidebarRightTemplate}});var o=r(2028);Object.defineProperty(t,"SidebarRightTemplateSingle",{enumerable:!0,get:function(){return o.SidebarRightTemplateSingle}});var i=r(3212);Object.defineProperty(t,"SidebarRightPost",{enumerable:!0,get:function(){return i.SidebarRightPost}})},2866:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.InputFormSection=void 0;var i=o(r(2735)),u=r(72),l=r(9402),s=r(5514),c=r(2386);t.InputFormSection=function(e){var t=e.buttonName,r=e.initValue,n=e.disabled,a=(0,c.useShowMessage)(),o=(0,i.useCallback)((function(e){(0,u.validateIntupUrl)(e)?(0,u.setUrlSearchParams)({entity:s.configConstantsEntities.PARSER_RSS_LIST,url:e}):a("error","Please enter valid url.")}),[s.configConstantsEntities.PARSER_RSS_LIST,u.setUrlSearchParams]);return i.default.createElement(l.InputForm,{className:"np-fs-16",buttonName:t,submitAction:o,initValue:r,disabled:n,isLoading:n})}},3739:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=o(r(2735)),l=i(r(4589)),s=o(r(5593)),c=r(6669),d=r(3193),f=r(6507),p=r(2386),b=r(2866),m=r(1554);r(4810);t.default=function(){var e=(0,d.useFetchPostsList)(),t=e[0],r=e[1],n=(0,f.useFetchTemplate)(),a=n[0],o=n[1],i=(0,p.useShowMessage)(),v=(0,u.useState)((function(){var e=new URLSearchParams(window.location.href),t=!!e.has("url")&&e.get("url");return t?(r(t).catch((function(e){return i("error",e.message)})),o(t),{url:t}):{url:!1}}))[0];return u.default.createElement("div",{className:"wrap"},u.default.createElement(c.VisualConstructor,null,u.default.createElement(s.default,{tabs:["Templat","Post"]},u.default.createElement(s.SidebarRightTemplate,null),u.default.createElement(s.SidebarRightPost,null)),u.default.createElement(c.VisualConstructorFooterRss,{rssUrl:v.url})),u.default.createElement("div",{className:"parsing-title"},u.default.createElement("h1",null,"News-Parser ",u.default.createElement("b",{className:"main-page-header"},"RSS"))),u.default.createElement(l.default,null),u.default.createElement(b.InputFormSection,{buttonName:"Parse RSS Feed",initValue:v.url||"",disabled:t}),u.default.createElement(m.PostsSection,{isFetching:t||a,rssUrl:v.url}))}},1554:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return a(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.PostsSection=void 0;var u=o(r(2735)),l=i(r(6372)),s=r(9683),c=r(3193),d=r(6507),f=r(2386),p=r(5436),b=r(3193),m=r(5670);t.PostsSection=function(e){var t=e.isFetching,r=e.rssUrl,n=(0,u.useState)(0),a=n[0],o=n[1],i=(0,f.useShowMessage)(),v=(0,b.useParsePosts)(),g=v[0],h=v[1],_=v[2],P=(0,p.useOpenVisualConstructor)(),O=(0,c.useGetPosts)(),y=(0,d.useGetTemplate)(),S=(0,c.useSelectPost)(),j=(0,u.useCallback)((function(e){y?S(e):i("error","Save parsing template first.")}),[y]),E=(0,u.useMemo)((function(){var e=O.filter((function(e){return e.select}));return[e,e.length]}),[O]),w=E[0],M=E[1],R=u.default.createElement(u.default.Fragment,null,"You have selected ",u.default.createElement("strong",null,M)," posts."),C=(0,u.useCallback)((function(){"string"==typeof r&&(_(w,"race",r),o(w.length))}),[w]);return u.default.createElement(u.default.Fragment,null,u.default.createElement(m.ProgressIndicator,{hidden:!h,total:a,count:g},u.default.createElement("div",{className:"progress-message"},"".concat(g,"/").concat(a," posts were parsed."))),u.default.createElement(s.ActionAlert,{hidden:0===M||h},u.default.createElement("span",{className:"flex-grow-1 lh-2"},R),u.default.createElement("button",{className:"btn btn-secondary",onClick:C,disabled:!r},"Parse")),!t&&u.default.createElement(l.default,{selectPost:j,posts:O,openEditor:P}))}},1405:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(r(2735)),o=n(r(2788)),i=r(659),u=r(766),l=n(r(8033)),s=n(r(3390)),c=n(r(3739)),d=(0,u.configureStore)({reducer:s.default,devTools:!1});window.addEventListener("DOMContentLoaded",(function(){o.default.render(a.default.createElement(i.Provider,{store:d},a.default.createElement(l.default,null,a.default.createElement(c.default,null))),document.getElementById("parsing-rss-app"))}))},3390:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(6680),o=r(8584),i=r(6168),u=r(7885),l=r(963),s=n(r(181)),c=n(r(1635)),d=(0,a.combineReducers)({items:o.items,dialog:c.default,message:i.message,sidebar:u.sidebar,sidebarTemplate:s.default,template:l.template});t.default=(0,a.combineReducers)({parse:d})},9683:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ActionAlert=void 0;var a=n(r(2735));t.ActionAlert=function(e){var t=e.hidden,r=e.children;return a.default.createElement("div",{hidden:t},a.default.createElement("div",{className:"col-lg-10 alert alert-secondary d-flex mx-auto",role:"alertdialog"},r))}},6669:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.VisualConstructorFooterPage=t.VisualConstructorFooterRss=t.VisualConstructor=void 0;var n=r(2956);Object.defineProperty(t,"VisualConstructor",{enumerable:!0,get:function(){return n.VisualConstructor}});var a=r(1839);Object.defineProperty(t,"VisualConstructorFooterRss",{enumerable:!0,get:function(){return a.VisualConstructorFooterRss}});var o=r(5484);Object.defineProperty(t,"VisualConstructorFooterPage",{enumerable:!0,get:function(){return o.VisualConstructorFooterPage}})},6885:e=>{e.exports=window}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var o=r[e]={exports:{}};return t[e].call(o.exports,o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,r,a,o)=>{if(!r){var i=1/0;for(c=0;c<e.length;c++){for(var[r,a,o]=e[c],u=!0,l=0;l<r.length;l++)(!1&o||i>=o)&&Object.keys(n.O).every((e=>n.O[e](r[l])))?r.splice(l--,1):(u=!1,o<i&&(i=o));if(u){e.splice(c--,1);var s=a();void 0!==s&&(t=s)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[r,a,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={204:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,o,[i,u,l]=r,s=0;if(i.some((t=>0!==e[t]))){for(a in u)n.o(u,a)&&(n.m[a]=u[a]);if(l)var c=l(n)}for(t&&t(r);s<i.length;s++)o=i[s],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},r=self.webpackChunk=self.webpackChunk||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[63,527,340,127],(()=>n(1405)));a=n.O(a)})();