(()=>{"use strict";var e,t={988:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SidebarRightTemplateSingle=t.SidebarRightTemplate=t.SidebarRightPost=t.default=void 0;var n=r(8291);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.SidebarRight}});var a=r(3212);Object.defineProperty(t,"SidebarRightPost",{enumerable:!0,get:function(){return a.SidebarRightPost}});var u=r(2121);Object.defineProperty(t,"SidebarRightTemplate",{enumerable:!0,get:function(){return u.SidebarRightTemplate}});var o=r(2028);Object.defineProperty(t,"SidebarRightTemplateSingle",{enumerable:!0,get:function(){return o.SidebarRightTemplateSingle}})},7470:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return a(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.InputFormSection=void 0;var o=u(r(2735)),i=r(72),l=r(9402),s=r(2386);t.InputFormSection=function(e){var t=e.buttonName,r=e.inputSubmit,n=(0,s.useShowMessage)(),a=(0,o.useCallback)((function(e){(0,i.validateIntupUrl)(e)?r(e):n("error","Please enter valid url.")}),[r]);return o.default.createElement(l.InputForm,{buttonName:t,submitAction:a,initValue:"",disabled:!1})}},6306:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return a(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=u(r(2735)),l=o(r(4589)),s=u(r(988)),c=r(8457),d=r(5436),f=r(3193),b=r(7470),p=r(3668);r(4810);t.default=function(){var e=(0,d.useOpenVisualConstructor)(),t=(0,f.useCreateLocalPost)(),r=(0,i.useCallback)((function(t){e(!1,t)}),[t,e]);return i.default.createElement("div",{className:"wrap"},i.default.createElement(c.VisualConstructor,null,i.default.createElement(s.default,{tabs:["Templat","Post"]},i.default.createElement(s.SidebarRightTemplateSingle,null),i.default.createElement(s.SidebarRightPost,null)),i.default.createElement(c.VisualConstructorFooterPage,null)),i.default.createElement("div",{className:"parsing-title"},i.default.createElement("h1",null,"News-Parser ",i.default.createElement("b",{className:"main-page-header"},"WEB PAGE"))),i.default.createElement(l.default,null),i.default.createElement(b.InputFormSection,{buttonName:"Parse page",inputSubmit:r}),i.default.createElement(p.ParsedPostsSection,null))}},3668:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var a=Object.getOwnPropertyDescriptor(t,r);a&&!("get"in a?!t.__esModule:a.writable||a.configurable)||(a={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,a)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r);return a(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.ParsedPostsSection=void 0;var i=u(r(2735)),l=o(r(6372)),s=r(3193),c=r(6507),d=r(2386),f=r(5436);t.ParsedPostsSection=function(e){var t=e.isFetching,r=(0,d.useShowMessage)(),n=(0,f.useOpenVisualConstructor)(),a=(0,s.useGetPosts)(),u=(0,c.useGetTemplate)(),o=(0,s.useSelectPost)(),b=(0,i.useCallback)((function(e){u?o(e):r("error","Save parsing template first.")}),[u]);return i.default.createElement(i.default.Fragment,null,!t&&i.default.createElement(l.default,{selectPost:b,posts:a,openEditor:n}))}},9119:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(r(2735)),u=n(r(2788)),o=r(659),i=r(766),l=n(r(8033)),s=n(r(7142)),c=n(r(6306)),d=(0,i.configureStore)({reducer:s.default,devTools:!1});window.addEventListener("DOMContentLoaded",(function(){u.default.render(a.default.createElement(o.Provider,{store:d},a.default.createElement(l.default,null,a.default.createElement(c.default,null))),document.getElementById("parsing-rss-app"))}))},7142:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(6680),u=r(8584),o=r(6168),i=r(7885),l=r(963),s=n(r(181)),c=n(r(1635)),d=(0,a.combineReducers)({items:u.items,dialog:c.default,message:o.message,sidebar:i.sidebar,sidebarTemplate:s.default,template:l.template});t.default=(0,a.combineReducers)({parse:d})},8457:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.VisualConstructorFooterRss=t.VisualConstructorFooterPage=t.VisualConstructor=void 0;var n=r(2956);Object.defineProperty(t,"VisualConstructor",{enumerable:!0,get:function(){return n.VisualConstructor}});var a=r(5484);Object.defineProperty(t,"VisualConstructorFooterPage",{enumerable:!0,get:function(){return a.VisualConstructorFooterPage}});var u=r(1839);Object.defineProperty(t,"VisualConstructorFooterRss",{enumerable:!0,get:function(){return u.VisualConstructorFooterRss}})},6885:e=>{e.exports=window}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var u=r[e]={exports:{}};return t[e].call(u.exports,u,u.exports,n),u.exports}n.m=t,e=[],n.O=(t,r,a,u)=>{if(!r){var o=1/0;for(c=0;c<e.length;c++){for(var[r,a,u]=e[c],i=!0,l=0;l<r.length;l++)(!1&u||o>=u)&&Object.keys(n.O).every((e=>n.O[e](r[l])))?r.splice(l--,1):(i=!1,u<o&&(o=u));if(i){e.splice(c--,1);var s=a();void 0!==s&&(t=s)}}return t}u=u||0;for(var c=e.length;c>0&&e[c-1][2]>u;c--)e[c]=e[c-1];e[c]=[r,a,u]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={415:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,u,[o,i,l]=r,s=0;if(o.some((t=>0!==e[t]))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(l)var c=l(n)}for(t&&t(r);s<o.length;s++)u=o[s],n.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return n.O(c)},r=self.webpackChunk=self.webpackChunk||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[63,527,340,127],(()=>n(9119)));a=n.O(a)})();