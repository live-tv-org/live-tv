(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{0:function(n,e){n.exports=React},11:function(n,e){n.exports=ReactDOM},29:function(n,e,t){n.exports=t(41)},41:function(n,e,t){"use strict";t.r(e);var o=t(0),r=t.n(o),a=t(11),c=t.n(a),i=t(10),u=t(17),s=t(26),m=function(){return r.a.createElement(u.a,{bg:"dark",variant:"dark",expand:"lg"},r.a.createElement(i.a,{className:"App"},r.a.createElement(u.a.Brand,{href:"/"},"\ud83c\udf7f"," Live TV"),r.a.createElement(s.a,{className:"mr-auto"})))},f=function(){return r.a.createElement("footer",{className:"text-muted"},r.a.createElement(i.a,null,r.a.createElement("p",null,"\xa9 2019 LiveTV")))},l=t(23),d=t(24),h=t(27),E=t(25),w=t(28),p=function(n,e){var t;return{bootstrap:function(){return t=new Promise(function(t,o){(function(n,e){return fetch("".concat(e,"/asset-manifest.json")).then(function(n){return n.json()},function(){throw new Error("Not loaded asset-manifest.json")})})(0,e).then(function(o){return function(n,e){return new Promise(function(t,o){var r=document.createElement("script");r.id=e.name,r.src="".concat(n).concat(e.files["main.js"]),r.onload=function(){return t()},r.onerror=function(){return o()},document.head.appendChild(r)})}(e,o).then(function(){var e="".concat(n,"Render");if("function"!==typeof window[e])throw new Error('The "'.concat(n,'" micro frontend was not bootstrapped.'));t()})}).catch(function(n){console.log(n),o()})})},render:function(){t||new Error('The "'.concat(n,'" micro frontend was not mounted before bootstrapping.')),t.then(function(){return function(n){var e="".concat(n,"Render"),t=document.getElementById(n);if(!t)throw new Error('The "'.concat(n,'" micro frontend do not have a container.'));window[e](t)}(n)}).catch(function(n){console.error(n)})},unmount:function(){t||new Error('The "'.concat(n,'" micro frontend was not unmounted before bootstrapping.')),t.then(function(){return function(n){var e="".concat(n,"Unmount");"function"===typeof window[e]?window[e]():new Error('The "'.concat(n,'" micro frontend was not unmounted.'))}(n)})}}},T=function(n){function e(n){var t;Object(l.a)(this,e),t=Object(h.a)(this,Object(E.a)(e).call(this,n));var o=n.name,r=n.host;return t.mf=p(o,r),t}return Object(w.a)(e,n),Object(d.a)(e,[{key:"componentDidMount",value:function(){this.mf.bootstrap().then(this.mf.render)}},{key:"componentWillUnmount",value:function(){this.mf.unmount()}},{key:"render",value:function(){var n=this.props.name;return r.a.createElement("div",{id:n})}}]),e}(o.Component),v=Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_GAMES_HOST:"https://live-tv.org/packages/games",REACT_APP_GA_ID:"UA-33213350-2",REACT_APP_TWITCH_CLIENT_ID:"ic6z1uh3naxxwq83cy2ebq55xxxv1p"}),_=v.REACT_APP_GAMES_HOST,b=v.REACT_APP_TWITCH_CLIENT_ID,g=function(){return Object(o.useEffect)(function(){sessionStorage.getItem("TWITCH_CLIENT_ID")||sessionStorage.setItem("TWITCH_CLIENT_ID",b)}),r.a.createElement(r.a.Fragment,null,r.a.createElement(m,null),r.a.createElement("main",{className:"mt-4 mb-4"},r.a.createElement(i.a,null,r.a.createElement(T,{name:"games",host:_}))),r.a.createElement(f,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(n){n.unregister()})}},[[29,1,2]]]);
//# sourceMappingURL=main.877f4341.chunk.js.map