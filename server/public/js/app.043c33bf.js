(function(t){function e(e){for(var a,s,o=e[0],u=e[1],l=e[2],c=0,d=[];c<o.length;c++)s=o[c],i[s]&&d.push(i[s][0]),i[s]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(t[a]=u[a]);m&&m(e);while(d.length)d.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,s=1;s<n.length;s++){var o=n[s];0!==i[o]&&(a=!1)}a&&(r.splice(e--,1),t=u(u.s=n[0]))}return t}var a={},s={app:0},i={app:0},r=[];function o(t){return u.p+"js/"+({}[t]||t)+"."+{"chunk-1289c320":"d8cc6675","chunk-1f39505a":"dc282700","chunk-262748c7":"93271da8","chunk-2ad8e3a5":"601aa833","chunk-2d215fa4":"dcfd311f","chunk-32e9e842":"5cf55d44","chunk-36504de9":"2f10f52f","chunk-64b69e8e":"db357761","chunk-74ad6a71":"ec43746c","chunk-7eeaaee0":"b85b7094"}[t]+".js"}function u(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(t){var e=[],n={"chunk-1289c320":1,"chunk-1f39505a":1,"chunk-262748c7":1,"chunk-2ad8e3a5":1,"chunk-32e9e842":1,"chunk-36504de9":1,"chunk-64b69e8e":1,"chunk-7eeaaee0":1};s[t]?e.push(s[t]):0!==s[t]&&n[t]&&e.push(s[t]=new Promise(function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-1289c320":"28a2a5ff","chunk-1f39505a":"5224eef2","chunk-262748c7":"4359a6ed","chunk-2ad8e3a5":"a6cc05a8","chunk-2d215fa4":"31d6cfe0","chunk-32e9e842":"3ccff60c","chunk-36504de9":"e01bf7e4","chunk-64b69e8e":"b8836fa4","chunk-74ad6a71":"31d6cfe0","chunk-7eeaaee0":"fa9c4c35"}[t]+".css",i=u.p+a,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var l=r[o],c=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(c===a||c===i))return e()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){l=d[o],c=l.getAttribute("data-href");if(c===a||c===i)return e()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=e,m.onerror=function(e){var a=e&&e.target&&e.target.src||i,r=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete s[t],m.parentNode.removeChild(m),n(r)},m.href=i;var f=document.getElementsByTagName("head")[0];f.appendChild(m)}).then(function(){s[t]=0}));var a=i[t];if(0!==a)if(a)e.push(a[2]);else{var r=new Promise(function(e,n){a=i[t]=[e,n]});e.push(a[2]=r);var l,c=document.createElement("script");c.charset="utf-8",c.timeout=120,u.nc&&c.setAttribute("nonce",u.nc),c.src=o(t),l=function(e){c.onerror=c.onload=null,clearTimeout(d);var n=i[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src,r=new Error("Loading chunk "+t+" failed.\n("+a+": "+s+")");r.type=a,r.request=s,n[1](r)}i[t]=void 0}};var d=setTimeout(function(){l({type:"timeout",target:c})},12e4);c.onerror=c.onload=l,document.head.appendChild(c)}return Promise.all(e)},u.m=t,u.c=a,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)u.d(n,a,function(e){return t[e]}.bind(null,a));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/",u.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var m=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0170":function(t,e,n){"use strict";var a=n("6f4b"),s=n.n(a);s.a},"143e":function(t,e,n){},"23a4":function(t,e,n){},"23e6":function(t,e,n){"use strict";var a=n("5dee"),s=n.n(a);s.a},"2aab":function(t,e,n){"use strict";var a=n("a176"),s=n.n(a);s.a},"2dd7":function(t,e,n){},"2f37":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"btnRow",staticClass:"button-row border-round",attrs:{"data-open":t.state.open},on:{click:t.clicked}},[n("span",{staticClass:"title colour-fill-dark no-click"},[t._t("label",[t._v("\n\t\t\t\tLabel\n\t\t\t")]),n("div",{staticClass:"button-row-icon anim-3"})],2),n("div",{staticClass:"row-content anim-6"},[t._t("default",[t._v("\n\t\t\t\tContent\n\t\t\t")])],2)])},s=[],i={name:"cButtonExpand",data:function(){return{state:{open:!1}}},methods:{clicked:function(){this.$emit("click"),this.state.open=!this.state.open}},mounted:function(){},components:{}},r=i,o=(n("5ce7"),n("2877")),u=Object(o["a"])(r,a,s,!1,null,null,null);e["a"]=u.exports},"3c13":function(t,e,n){"use strict";var a=n("7166"),s=n.n(a);s.a},4240:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel-parent"},[n("div",{staticClass:"panel center-auto-h colour-bg-pop border-round width-95 shadow"},[n("header",{},[n("p",{staticClass:"header"},[t._t("header")],2),n("div",{staticClass:"options flex-row flex-row-end center-auto-h"},[t._t("options")],2)]),n("div",{staticClass:"center-auto-h"},[n("main",{staticClass:"text"},[t._t("default")],2),t._t("no-margin"),n("footer",{staticClass:"footer"},[n("p",{staticClass:"text"},[t._t("footer")],2)])],2)])])},s=[];n("2dd7");var i={name:"cPanel"},r=i,o=n("2877"),u=Object(o["a"])(r,a,s,!1,null,null,null);e["a"]=u.exports},"559a":function(t,e,n){"use strict";var a=n("f608"),s=n.n(a);s.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("c-navbar",{scopedSlots:t._u([{key:"active",fn:function(){return[n("router-link",{staticClass:"link colour-bg-pop border-round delay-2",attrs:{to:"/logout"}},[n("p",{staticClass:"colour-fill-dark header text-link"},[t._v(" \n\t\t\t\t\t\tLogout\n\t\t\t\t\t")])]),n("router-link",{staticClass:"link colour-bg-pop border-round delay-2",attrs:{to:"/account"}},[n("p",{staticClass:"colour-fill-dark header text-link"},[t._v(" \n\t\t\t\t\t\tAccount\n\t\t\t\t\t")])]),n("router-link",{staticClass:"link colour-bg-pop border-round delay-2",attrs:{to:"/admin/request"}},[n("p",{staticClass:"colour-fill-dark header text-link"},[t._v(" \n\t\t\t\t\t\tAdminRequest\n\t\t\t\t\t")])]),n("router-link",{staticClass:"link colour-bg-pop border-round delay-2",attrs:{to:"/admin"}},[n("p",{staticClass:"colour-fill-dark header text-link"},[t._v(" \n\t\t\t\t\t\tAdminBoard\n\t\t\t\t\t")])]),n("router-link",{staticClass:"link title colour-on-focus",attrs:{to:"/cron/instance/"}},[t._v("\n\t\t\t\t\tCron Clean\n\t\t\t")]),n("router-link",{staticClass:"link title colour-on-focus",attrs:{to:"/meta/instance/all"}},[t._v("\n\t\t\t\t\tGames\n\t\t\t")])]},proxy:!0},{key:"none-active",fn:function(){return[n("router-link",{staticClass:"link colour-bg-pop border-round delay-2",attrs:{to:"/login"}},[n("p",{staticClass:"colour-fill-dark header text-link"},[t._v(" \n\t\t\t\t\t\tLogin\n\t\t\t\t\t")])])]},proxy:!0}])},[n("router-link",{staticClass:"link colour-bg-pop border-round delay-2",attrs:{to:"/board/create"}},[n("p",{staticClass:"colour-fill-dark header text-link"},[t._v(" \n\t\t\t\t\t\tCreate\n\t\t\t\t\t")])])],1),n("router-view"),n("c-footer")],1)},i=[];n("7371"),n("23a4"),n("143e"),n("ff4e"),n("a093");var r=function(){return n.e("chunk-36504de9").then(n.bind(null,"1f80"))},o=function(){return n.e("chunk-7eeaaee0").then(n.bind(null,"35ba"))},u={name:"App",created:function(){document.title="BS-Bingo",this.$store.dispatch("user/init",this.$request.get_SecureKeyFile)},computed:{},methods:{},components:{"c-navbar":r,"c-footer":o}},l=u,c=n("2877"),d=Object(c["a"])(l,s,i,!1,null,null,null),m=d.exports,f=n("bd86"),p=n("8c4f"),h=n("2f62");n("7f7f"),n("28a5");function v(t){if(!1===t||"false"===t)return!1;var e={},n=[];return n=t.split("."),e.raw=t,e.payload=JSON.parse(window.atob(n[1])),e.payload}function g(){var t=window.localStorage.getItem("tokenStringKube");return null===t?"":t}function b(t){window.localStorage.setItem("tokenStringKube",t)}function _(){window.localStorage.removeItem("tokenStringKube")}var y={namespaced:!0,state:{requestObj:Function,session:{active:Boolean,user:{id:String,name:String,email:String,role:String},token:"token"}},getters:{get_active:function(t){return t.session.active},get_user:function(t){return t.session.user},get_token:function(t){return t.session.token}},mutations:{requestObj:function(t,e){t.requestObj=e},active:function(t,e){t.session.active=e},user:function(t,e){t.session.user.id=e.id,t.session.user.name=e.name,t.session.user.email=e.email,t.session.user.role=e.role},token:function(t,e){t.session.token=e,b(e),t.requestObj()}},actions:{init:function(t,e){t.commit("requestObj",e);var n=g();n.length<5?t.dispatch("logout_success"):t.dispatch("login_success",n)},login_success:function(t,e){var n=v(e);t.commit("active",!0),t.commit("user",n),t.commit("token",e)},logout_success:function(t){var e={id:"",name:"",email:"",role:""};t.commit("active",!1),t.commit("user",e),t.commit("token",""),_()}}};function w(t,e){var n=-1;if(void 0===e.id){var a={line:e,id:k(e)};e=a}for(var s=0;s<t.length;s++)if(t[s].id===e.id)return s;return n}var k=function(t){var e=0;if(0==t.length)return e;for(var n=0;n<t.length;n++){var a=t.charCodeAt(n);e=(e<<5)-e+a,e&=e}return e},x=function(t){return t.game.board&&t.game.instance&&t.game.lines&&t.game.joined&&t.game.mode===C[0]&&t.game.result===S[0]?(t.game.mode=C[1],!0):(t.game.mode=C[0],!1)},C=["","playing"],S=["","won","lost"],j={namespaced:!0,state:{lines:[],game:{board:!1,instance:!1,lines:!1,joined:!1,mode:C[0],result:S[0],winner:{url:"",data:{score:0,name:""}}}},getters:{get_lines:function(t){return t.lines},get_game:function(t){return t.game},get_winner:function(t){return t.game.winner}},mutations:{lines:function(t,e){t.lines=e,e.length>0&&(t.game.lines=!0)},line_submit:function(t,e){var n=w(t.lines,e);t.lines[n].waiting=!0},line_add:function(t,e){var n=w(t.lines,e);t.lines[n].selected=!0,t.lines[n].waiting=!1},line_remove:function(t,e){var n=w(t.lines,e);t.lines[n].selected=!1,t.lines[n].waiting=!1},game:function(t,e){void 0!==e.board&&(t.game.board=e.board),void 0!==e.instance&&(t.game.instance=e.instance),void 0!==e.joined&&(t.game.joined=e.joined);t.game.mode;if(t.game.mode!==C[1])x(t);void 0!==e.result&&""!==e.result&&(t.game.mode=C[0],t.game.result=e.result,void 0!==e.winner&&(t.game.winner.url=e.winner.url,t.game.winner.data.name=e.winner.data.name,t.game.winner.data.score=e.winner.data.score))},exit:function(t,e){t.lines=[],t.game.board=!1,t.game.instance=!1,t.game.lines=!1,t.game.joined=!1,t.game.mode=C[0],t.game.result=S[0],t.game.winner.url="",t.game.winner.data.name="",t.game.winner.data.score=0}},actions:{set_lines:function(t,e){t.commit("lines",e)},submit_line:function(t,e){t.commit("line_submit",e)},add_line:function(t,e){t.commit("line_add",e)},remove_line:function(t,e){t.commit("line_remove",e)},set_game:function(t,e){t.commit("game",e)},exit:function(t){t.commit("exit")}}},O=(C[0],S[0],{namespaced:!0,state:{action:{url:"",method:"GET",JSON:!1},url:"",data:{name:"",lines:[]}},getters:{get_action:function(t){return t.action},get_board:function(t){return t},get_lines:function(t){return t.data.lines}},mutations:{action:function(t,e){void 0!==e.url&&(t.action.url=e.url),void 0!==e.method&&(t.action.method=e.method),void 0!==e.JSON&&(t.action.JSON=e.JSON)},board:function(t,e){void 0!==e.url&&(t.url=e.url),void 0!==e.data&&(void 0!==e.data.name&&(t.data.name=e.data.name),void 0!==e.data.lines&&(t.data.lines=e.data.lines))}},actions:{set_action:function(t,e){t.commit("action",e)},set_board:function(t,e){t.commit("board",e)},exit:function(t){t.commit("action",$.action),t.commit("board",$)}}}),$={action:{url:"",method:"GET",JSON:!1},url:"",data:{name:"",lines:[]}},E={namespaced:!0,state:{action:{url:"",method:"GET",JSON:!0},url:"",data:{players:[],game:{win:0,display:0,winner:""}}},getters:{get_action:function(t){return t.action},get_instance:function(t){return t},get_players:function(t){return t.data.players},get_win:function(t){return t.data.game.win},get_display:function(t){return t.data.game.display}},mutations:{action:function(t,e){void 0!==e.url&&(t.action.url=e.url),void 0!==e.method&&(t.action.method=e.method),void 0!==e.JSON&&(t.action.JSON=e.JSON)},instance:function(t,e){void 0!==e.url&&(t.url=e.url),void 0!==e.data&&(t.data.players=e.data.players,t.data.game.win=e.data.game.win,t.data.game.display=e.data.game.display,t.data.game.winner=e.data.game.winner)},players:function(t,e){void 0!==e.data&&void 0!==e.data.players&&(t.data.players=e.data.players)}},actions:{set_action:function(t,e){t.commit("action",e)},set_instance:function(t,e){t.commit("instance",e)},set_players:function(t,e){t.commit("players",e)},exit:function(t){t.commit("action",N.action),t.commit("instance",N)}}},N={action:{url:"",method:"GET",JSON:!0},url:"",data:{players:[],game:{win:0,display:0,winner:""}}},T={namespaced:!0,state:{player:{url:"",data:{name:"",score:0}}},getters:{get_player:function(t){return t.player},get_url:function(t){return t.player.url},get_name:function(t){return t.player.data.name},get_score:function(t){return t.player.data.score}},mutations:{player:function(t,e){void 0!==e.url&&(t.player.url=e.url),void 0!==e.data&&(void 0!==e.data.name&&(t.player.data.name=e.data.name,q.data.name=e.data.name),void 0!==e.data.score&&(t.player.data.score=e.data.score))}},actions:{set_player:function(t,e){t.commit("player",e)},reset:function(t){t.commit("player",q)},exit:function(t){t.commit("player",q)}}},q={url:"",data:{name:"",score:0}};a["a"].use(h["a"]);var P=new h["a"].Store({state:{},mutations:{},getters:{},actions:{},modules:{user:y,game:j,board:O,instance:E,player:T}}),J=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("c-panel",[n("h1",{staticClass:"colour-fill-dark",attrs:{slot:"header"},slot:"header"},[t._v(" \n\t\t\t\tWelcome to "),n("wbr"),t._v(" BS-Bingo \n\t\t")]),n("br"),n("p",{staticClass:"text text-left"},[t._v(" BS-Bingo is a fun party game designed to be played during large events, that funny tv show or those boring office meetings. Enjoy. ")]),n("br"),n("c-button-row",[n("template",{slot:"label"},[t._v(" How to play? ")]),n("p",{staticClass:"text text-left"},[t._v("\n\t\t\t\tWhen you hear a word or phrase that's in your board, select it. Once you have more than 6 you could be a winner depending on who else is playing!\n\t\t\t")])],2),n("c-button-row",[n("template",{slot:"label"},[t._v(" What do you need? ")]),n("p",{staticClass:"text text-left"},[t._v("\n\t\t\t\tCreating a board takes no time at all.\n\t\t\t\tAll you need is a catchy name and at least 8 common words or phrases.\n\n\t\t\t\t"),n("br"),n("br"),t._v("\n\n\t\t\t\tTo make it more fun it's reccomended to have far more as everyone who plays gets a random selection each time.\n\n\t\t\t\t"),n("br"),n("br"),t._v("\n\n\t\t\t\tOnce you've created a board, you'll be sent to it's lobby from there you can play and share it with friends.\n\n\t\t\t")])],2),n("br"),n("div",{staticClass:"text-center buttons"},[n("c-button",{attrs:{onClick:t.button_create}},[t._v("\n\t\t\t\tCreate\n\t\t\t")]),n("span",{staticClass:"text colour-fill-dark button-helper"},[t._v("\n\t\t\t\tand play with friends!\n\t\t\t")])],1),n("br")],1),n("c-panel",[n("h1",{attrs:{slot:"header"},slot:"header"},[t._v(" Boards ")]),n("div",{staticStyle:{width:"100%"}},[n("c-front-latest",{staticStyle:{width:"50%",display:"inline-block"}}),n("c-front-popular",{staticStyle:{width:"50%",display:"inline-block"}})],1),n("c-front-server-stats",{attrs:{slot:"footer"},slot:"footer"})],1)],1)},A=[],B=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"colour-fill-bg-inv text-left chart"},[n("p",{staticClass:"title"},[t._v("Latest")]),t._l(t.boards,function(e,a){return n("router-link",{key:e.url,staticClass:"text-link colour-fill-dark",attrs:{title:t.get_title(e),to:t.get_url(e)}},[t._v(t._s(e.name))])})],2)},L=[],R=n("a42b"),F={name:"cFrontLatest",mixins:[R["a"]],data:function(){return{attrs:{max_timeouts:5,action:Object,timing:5e3},state:{init:0,timeouts:0},boards:[]}},methods:{get_url:function(t){return"/board/"+t.url},get_title:function(t){return t.plays+" plays"},init:function(){var t={url:"/meta/board/latest",method:"GET",JSON:!1,body:""};this.attrs.action=t,this.latest_submit()},latest_submit:function(){this.onSubmit(this.attrs.action,this,null,null,this.latest_success,this.latest_error)},latest_success:function(t){this.boards=t.data},latest_error:function(t){if(this.state.timeouts<this.attrs.max_timeouts){var e=this;setTimeout(function(){e.state.timeouts+=1,e.latest_submit()},e.attrs.timing)}}},mounted:function(){this.init()},beforeDestroy:function(){},components:{}},D=F,M=(n("0170"),Object(c["a"])(D,B,L,!1,null,"391e7e16",null)),G=M.exports,K=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"colour-fill-bg-inv text-right chart"},[n("p",{staticClass:"title"},[t._v("Popular")]),t._l(t.boards,function(e,a){return n("router-link",{key:e.url,staticClass:"text-link colour-fill-dark",attrs:{title:t.get_title(e),to:t.get_url(e)}},[t._v(t._s(e.name))])})],2)},H=[],I={name:"cFrontPopular",mixins:[R["a"]],data:function(){return{attrs:{max_timeouts:5,action:Object,timing:5e3},state:{init:0,timeouts:0},boards:[]}},methods:{get_url:function(t){return"/board/"+t.url},get_title:function(t){return t.plays+" plays"},init:function(){var t={url:"/meta/board/popular",method:"GET",JSON:!1,body:""};this.attrs.action=t,this.latest_submit()},latest_submit:function(){this.onSubmit(this.attrs.action,this,null,null,this.latest_success,this.latest_error)},latest_success:function(t){this.boards=t.data},latest_error:function(t){if(this.state.timeouts<this.attrs.max_timeouts){var e=this;setTimeout(function(){e.state.timeouts+=1,e.latest_submit()},e.attrs.timing)}}},mounted:function(){this.init()},beforeDestroy:function(){},components:{}},W=I,U=(n("559a"),Object(c["a"])(W,K,H,!1,null,"9cd94f1a",null)),z=U.exports,X=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[t.stats.games.length?n("div",[n("div",{staticClass:"br-split"}),n("p",{staticClass:"title"},[t._v(" Games in progress ")]),n("div",t._l(t.stats.games,function(e){return n("router-link",{key:e,staticClass:"text-link colour-fill-dark",attrs:{to:t.game_url(e)}},[t._v(t._s(e))])}),1)]):t._e(),n("div",{staticClass:"br-split"}),n("span",{staticClass:"small"},[t._v("Players "+t._s(t.stats.players)+",")]),n("div",{staticClass:"div-split"}),n("span",{staticClass:"small"},[t._v("games "+t._s(t.stats.games.length)+",")]),n("div",{staticClass:"div-split"}),n("span",{staticClass:"small"},[t._v("played "+t._s(t.stats.games_played)+",")]),n("div",{staticClass:"div-split"}),n("span",{staticClass:"small"},[t._v("won "+t._s(t.stats.games_won)+".")])])},Q=[],V=(n("c5f6"),{name:"cFrontServerStats",mixins:[R["a"]],data:function(){return{attrs:{max_timeouts:5,action:Object,timing:5e3},state:{timeouts:0},stats:{games_played:Number,games_won:Number,games:Array,players:Number}}},methods:{game_url:function(t){return"/instance/"+t},init:function(){var t={url:"/meta/server/stats",method:"GET",JSON:!1,body:""};this.attrs.action=t;var e=this;this.onSubmit(e.attrs.action,e,null,null,e.success,e.error)},success:function(t){this.stats=t.data},error:function(){}},mounted:function(){this.init()}}),Y=V,Z=(n("e91a"),Object(c["a"])(Y,X,Q,!1,null,"648fff06",null)),tt=Z.exports,et=n("b99b"),nt=n("2f37"),at=n("4240"),st={name:"home",mounted:function(){var t=this;setTimeout(function(){t.$root.$emit("page-title","")},100)},methods:{button_create:function(){this.$router.push("/board/create/")}},components:{"c-panel":at["a"],"c-button":et["a"],"c-button-row":nt["a"],"c-front-latest":G,"c-front-popular":z,"c-front-server-stats":tt}},it=st,rt=Object(c["a"])(it,J,A,!1,null,null,null),ot=rt.exports,ut=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("c-panel",[n("template",{slot:"header"},[t._v("\n\t\tAccount Login\n\t")]),n("form",{staticClass:"form",attrs:{action:"/api/account/login",method:"POST"},on:{submit:function(e){return e.preventDefault(),t.onLogin(e)}}},[n("c-account-input",{attrs:{input:t.form}}),n("c-message",{ref:"msgSubmit",staticClass:"colour-fill-bg-inv"}),n("br"),n("c-button",{ref:"btnSubmit"},[t._v("\n\t\t\t\tLogin\n\t\t\t")])],1),n("template",{slot:"footer"},[n("p",{staticClass:"colour-fill-bg-inv"},[t._v("\n\t\t\tDont have an account, why not \n\n\t\t\t"),n("router-link",{staticClass:"colour-fill-accent",attrs:{to:"/register"}},[t._v("\n\t\t\t\t\tregister?\n\t\t\t")])],1)])],2)},lt=[],ct=n("d0a4"),dt=n("e82d"),mt=n("f979"),ft={name:"Login",mixins:[R["a"]],data:function(){return{attrs:{validate:{max:30,name:3,password:7},server:{max_timeouts:5,timing:1500},action:Object},state:{init:!1,timeouts:0},form:{name:{show:!1,isRequired:!1,value:""},email:{show:!0,isRequired:!0,value:""},password:{show:!0,isRequired:!0,value:""},validate:!1}}},methods:{init:function(){if(!this.state.init){var t={url:"/api/account/login",method:"POST",JSON:!0,body:{email:"",password:""}};this.attrs.action=t,this.state.init=!0}},onLogin:function(t){if(mt["a"].email(this.form.email.value)&&mt["a"].length(this.form.password.value,this.attrs.validate.password,100)){this.attrs.action.body.email=this.form.email.value,this.attrs.action.body.password=this.form.password.value;var e=this;this.onSubmit(this.attrs.action,e,e.$refs.btnSubmit,e.$refs.msgSubmit,e.onSuccess,e.onError)}},onSuccess:function(t){var e=this;e.$refs.btnSubmit.$emit("state","message","Hello!"),e.$store.dispatch("user/login_success",t.token),setTimeout(function(){e.$router.push("/")},2e3)},onError:function(t){if(this.state.timeouts<this.attrs.server.max_timeouts){if(this.$refs.btnSubmit.$emit("state","message","Error!"),408!==t.status)return;var e=this;setTimeout(function(){e.state.timeouts+=1,e.onSubmit(e.attrs.action,e,e.$refs.btnSubmit,e.$refs.msgSubmit,e.onSuccess,e.onError)},e.attrs.server.timing)}}},mounted:function(){this.init()},components:{"c-account-input":ct["a"],"c-button":et["a"],"c-message":dt["a"],"c-panel":at["a"]}},pt=ft,ht=Object(c["a"])(pt,ut,lt,!1,null,null,null),vt=ht.exports;a["a"].use(p["a"]);var gt=function(t,e,n){if("user"!==t.meta.type&&"admin"!==t.meta.type)return n();var a=P.getters["user/get_user"],s="user"===a.role,i="admin"===a.role;return"user"===t.meta.type&&(s||i)?n():"admin"===t.meta.type&&i?n():n({path:"/login"})},bt=new p["a"]({mode:"history",base:"/",routes:[{path:"/",name:"index",component:ot},{path:"/register",name:"register",component:function(){return n.e("chunk-64b69e8e").then(n.bind(null,"73cf"))}},{path:"/login",name:"login",component:vt},{path:"/logout",name:"logout",component:function(){return n.e("chunk-2d215fa4").then(n.bind(null,"c100"))},meta:{type:"user"},beforeEnter:gt},Object(f["a"])({path:"/account",name:"account",component:function(){return n.e("chunk-1f39505a").then(n.bind(null,"77be"))},beforeEnter:gt,meta:{type:"user"}},"beforeEnter",gt),{path:"/admin/request",name:"adminrequest",component:function(){return n.e("chunk-74ad6a71").then(n.bind(null,"81e94"))},meta:{type:"user"},beforeEnter:gt},{path:"/admin",name:"admin",component:function(){return n.e("chunk-2ad8e3a5").then(n.bind(null,"3530"))},meta:{type:"admin"},beforeEnter:gt},{path:"/board/create",name:"board create",component:function(){return n.e("chunk-262748c7").then(n.bind(null,"828b"))}},{path:"/board/:board",name:"board lobby",component:function(){return n.e("chunk-32e9e842").then(n.bind(null,"1074"))}},{path:"/instance/:instance",name:"board game",component:function(){return n.e("chunk-1289c320").then(n.bind(null,"c8a6"))}}]});n("6b54");function _t(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=arguments.length>3?arguments[3]:void 0,s=arguments.length>4?arguments[4]:void 0,i=new XMLHttpRequest;i.open(e,t,!0),n&&i.setRequestHeader("Content-Type","application/json; charset=UTF-8");var r=kt();r.length>5&&i.setRequestHeader("Authorization","Bearer "+r),i.send(a),i.onload=function(){if(this.status>=200&&this.status<300)return s(null,JSON.parse(this.responseText));var t={};try{t=JSON.parse(this.responseText.toString("ascii"))}catch(n){var e=this.statusText;return 0===e.length&&(e="No network connection."),s({status:this.status,message:this.statusText})}return s(t)},i.ontimeout=function(){return s(this.response)},i.onerror=function(){var t=this.statusText;return 0===t.length&&(t="No network connection."),s({status:this.status,message:t})}}var yt="";function wt(t){yt=t.length<=5?"":t}function kt(){return yt}function xt(){var t=window.localStorage.getItem("tokenStringKube");wt(t)}function Ct(t,e){t.preventDefault();var n=t.target.action,a=t.target.method,s=new FormData(t.target);_t(n,a,!1,s,function(t,n){return t?e(t):e(null,n)})}function St(t,e){var n={},a=t.JSON||!1;void 0!==t.body&&a&&(n=JSON.stringify(t.body)),_t(t.url,t.method,a,n,function(t,n){return t?e(t):e(null,n)})}var jt={request_url:St,request_url_form:Ct,set_SecureKey:wt,get_SecureKey:kt,get_SecureKeyFile:xt},Ot={install:function(t){t.prototype.$request=jt}};a["a"].config.productionTip=!0,a["a"].use(Ot),new a["a"]({router:bt,store:P,render:function(t){return t(m)}}).$mount("#app")},"5bb6":function(t,e,n){},"5c50":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"result"},[n("div",{staticClass:"result-pass"}),n("div",{staticClass:"result-fail"})])}],i={name:"cFieldResult"},r=i,o=(n("3c13"),n("2877")),u=Object(o["a"])(r,a,s,!1,null,null,null);e["a"]=u.exports},"5ce7":function(t,e,n){"use strict";var a=n("8f19"),s=n.n(a);s.a},"5dee":function(t,e,n){},"616f":function(t,e,n){},"6f4b":function(t,e,n){},7166:function(t,e,n){},7371:function(t,e,n){},"8f19":function(t,e,n){},"98bc":function(t,e,n){"use strict";var a=n("5bb6"),s=n.n(a);s.a},a093:function(t,e,n){},a176:function(t,e,n){},a42b:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var a={methods:{onSubmit:function(t,e,n,a,s,i){var r=null!==a&&void 0!==a,o=null!==n&&void 0!==n;o&&n.$emit("state","waiting"),e.$request.request_url(t,function(t,e){return o&&n.$emit("state","reset"),t?(o&&n.$emit("state","error"),r&&a.$emit("message",{class:"error text-negative",message:t.message}),i(t)):(o&&n.$emit("state","success"),r&&a.$emit("message",{class:"success text-positive",message:e.message}),s(e))})}}}},b99b:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("button",{staticClass:"button shadow fade-in colour-bg-dark border-round",class:t.get_state,on:{click:t.clicked}},[n("p",{staticClass:"colour-fill-pop label"},[t._t("default",[t._v(" \n\t\t\t \tSubmit \n\t\t\t")])],2),n("p",{staticClass:"text colour-fill-pop text-bold message anim-3"},[t._v("\n\t\t\t"+t._s(t.obj.message)+" \n\t")]),n("div",{staticClass:"anim-container",class:t.get_strobes},[n("span",{staticClass:"strobe colour-bg-pop delay-5"}),n("span",{staticClass:"strobe colour-bg-pop delay-5"}),n("span",{staticClass:"strobe colour-bg-pop delay-5"})]),n("div",{staticClass:"anim-result anim-3",class:{"is-active":t.get_result}})])},s=[],i={name:"cButton",data:function(){return{obj:{state:"",strobes:!1,hasMessage:!1,message:"",result:!1},time:{min:2300,message:2300}}},props:{onClick:Function},computed:{get_state:function(){var t=this.obj.state;return this.obj.hasMessage&&(t+=" msg-is-active"),t},get_strobes:function(){return this.obj.strobes?"is-active":""},get_result:function(){return this.obj.result}},methods:{init:function(){this.clear_state(),this.message_reset()},clear_state:function(){this.set_strobes(!1),this.obj.state=""},set_state:function(t,e){"waiting"===t&&(this.obj.state="is-waiting",this.set_strobes(!0)),"success"===t&&(this.obj.state="is-success",this.set_strobes(!1),this.set_result(!0)),"error"===t&&(this.obj.state="is-error",this.set_strobes(!1),this.set_result(!0)),""!==t&&"reset"!==t||(this.init(),this.set_result(!1)),"message"===t&&(this.clear_state(),this.message_set(e))},set_strobes:function(t){if(t){var e=this;setTimeout(function(){"is-waiting"===e.obj.state&&(e.obj.strobes=!0)},350)}else this.obj.strobes=!1},set_result:function(t){if(this.obj.result=t,this.obj.result){var e=this;setTimeout(function(){e.obj.result=!1},1500)}},message_set:function(t){this.obj.message=t,this.obj.hasMessage=!0,this.message_reset()},message_reset:function(){var t=this;setTimeout(function(){t.obj.hasMessage=!1},t.time.message)},clicked:function(){void 0!==this.onClick&&this.onClick()}},mounted:function(){this.$on("state",this.set_state),this.init()},beforeDestroy:function(){this.$off("state",this.set_state)},components:{}},r=i,o=(n("98bc"),n("2877")),u=Object(o["a"])(r,a,s,!1,null,null,null);e["a"]=u.exports},d0a4:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"account-input"},[t.NameShow?n("div",{ref:"field_name",staticClass:"field field-result"},[n("p",{staticClass:"text label colour-fill-bg-inv"},[t._v("\n\t\t\t\tName:\n\t\t")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.input.name.value,expression:"input.name.value"}],staticClass:"text colour-fill-bg-inv text-input",attrs:{type:"string",name:"name",pattern:t.name_pattern,title:t.name_title,placeholder:"Name",required:t.input.name.isRequired},domProps:{value:t.input.name.value},on:{change:t.validate_name,input:function(e){e.target.composing||t.$set(t.input.name,"value",e.target.value)}}}),n("c-field-result")],1):t._e(),t.EmailShow?n("div",{ref:"field_email",staticClass:"field field-result"},[n("p",{staticClass:"text label colour-fill-bg-inv"},[t._v("\n\t\t\t\tEmail:\n\t\t")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.input.email.value,expression:"input.email.value"}],staticClass:"text colour-fill-bg-inv text-input",attrs:{type:"email",name:"email",placeholder:"Email",required:t.input.email.isRequired},domProps:{value:t.input.email.value},on:{change:t.validate_email,input:function(e){e.target.composing||t.$set(t.input.email,"value",e.target.value)}}}),n("c-field-result")],1):t._e(),t.PasswordShow?n("div",{ref:"field_password",staticClass:"field field-result"},[n("p",{staticClass:"text label colour-fill-bg-inv"},[t._v("\n\t\t\t\tPassword:\n\t\t")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.input.password.value,expression:"input.password.value"}],staticClass:"text colour-fill-bg-inv text-input",attrs:{type:"password",name:"password",placeholder:"Password",pattern:t.password_pattern,title:t.password_title,required:t.input.password.isRequired},domProps:{value:t.input.password.value},on:{change:t.validate_password,input:function(e){e.target.composing||t.$set(t.input.password,"value",e.target.value)}}}),n("c-field-result")],1):t._e()])},s=[],i=(n("7f7f"),n("f979")),r=n("5c50"),o={name:"AccountInput",data:function(){return{attrs:{max:30,name:3,password:7}}},props:{input:{name:Object,email:Object,password:Object,validate:Boolean}},computed:{NameShow:function(){return!(void 0===this.input.name||!this.input.name.show)},EmailShow:function(){return!(void 0===this.input.email||!this.input.email.show)},PasswordShow:function(){return!(void 0===this.input.password||!this.input.password.show)},name_pattern:function(){var t=".{"+this.attrs.name+","+this.attrs.max+"}";return t},name_title:function(){var t="name must be between "+this.attrs.password+" and "+this.attrs.max+" characters long.";return t},password_pattern:function(){var t=".{"+this.attrs.password+",}";return t},password_title:function(){var t="password must be atleast "+this.attrs.password+" characters long.";return t}},methods:{init:function(){},validate_name:function(){if(this.input.validate){var t=this.input.name.value,e=this.$refs.field_name,n=i["a"].length(t,this.attrs.name,this.attrs.max);this.validate_result(n,e)}},validate_email:function(){if(this.input.validate){var t=this.input.email.value,e=this.$refs.field_email,n=i["a"].email(t);this.validate_result(n,e)}},validate_password:function(){if(this.input.validate){var t=this.input.password.value,e=this.$refs.field_password,n=i["a"].length(t,this.attrs.password,100);this.validate_result(n,e)}},validate_result:function(t,e){null!==t?t?t&&this.set_element_pass(e):this.set_element_fail(e):this.set_element_default(e)},set_element_default:function(t){return t.className="field field-result"},set_element_pass:function(t){return t.className="field field-result pass"},set_element_fail:function(t){return t.className="field field-result fail"}},mounted:function(){this.init()},components:{"c-field-result":r["a"]}},u=o,l=(n("2aab"),n("2877")),c=Object(l["a"])(u,a,s,!1,null,null,null);e["a"]=c.exports},e82d:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"message text-center"},[n("p",{class:t.get_class},[t._v(" \n\t\t"+t._s(t.get_message)+" \n\t")])])},s=[],i=null,r=null,o={name:"cMessage",data:function(){return{obj:{class:"",message:""},duration_sec:4}},props:{},computed:{get_class:function(){return this.obj.class},get_message:function(){return this.obj.message}},methods:{init:function(){this.obj.class="hide",this.$on("message",this.message_set)},message_set:function(t){this.obj.class=t.class,this.obj.message=t.message,this.message_reset()},message_reset:function(){var t=this;i=setTimeout(function(){t.obj.class="hide"},1e3*(t.duration_sec-1)),r=setTimeout(function(){t.obj.message=""},1e3*t.duration_sec)}},mounted:function(){this.init()},beforeDestroy:function(){clearTimeout(i),clearTimeout(r),this.$off("message",this.message_set)},components:{}},u=o,l=(n("23e6"),n("2877")),c=Object(l["a"])(u,a,s,!1,null,"6b414ffd",null);e["a"]=c.exports},e91a:function(t,e,n){"use strict";var a=n("616f"),s=n.n(a);s.a},f608:function(t,e,n){},f979:function(t,e,n){"use strict";var a={default_min:3,default_max:30},s="field-result",i="fail",r="pass",o=function(t,e){void 0!==t&&(void 0!==t.className&&(t.className=e),void 0!==t.$el&&(t.$el.className=e))},u=function(t){o(t,s+" "+r)},l=function(t){o(t,s+" "+i)},c=function(t,e){void 0!==t&&null!==t&&void 0!==e&&null!==e&&t.$emit("message",e)},d=function(t,e){o(t,s),void 0!==e&&"string"===typeof e&&(e=""),void 0!==e&&"number"===typeof e&&(e=0)},m=function(t,e,n){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:a.default_min,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:a.default_max;if(d(t),void 0!==e){if(0===e.length)return null;var r=e.length<s,o=e.length>i;return r&&c(n,{class:"error",message:"is less than "+s+" characters."}),o&&c(n,{class:"error",message:"is more than "+i+" characters."}),r||o?(l(t),!1):(u(t),!0)}},f=function(t,e,n){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:a.default_min,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:a.default_max;d(t);var r=m(t,e,n,s,i);if(r){var o=e.indexOf("@"),f=e.indexOf("."),p=!1,h=!1;return o>1&&o<e.length-2&&(p=!0),f>0&&f<e.length-1&&(h=!0),p&&h?(u(t),!0):(c(n,{class:"error",message:"Not an email address."}),l(t),!1)}return!1};e["a"]={reset:d,length:m,email:f}},ff4e:function(t,e,n){}});
//# sourceMappingURL=app.043c33bf.js.map