(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{101:function(e,t,n){e.exports=n(135)},106:function(e,t,n){},135:function(e,t,n){"use strict";n.r(t);var a,r=n(0),i=n.n(r),o=n(10),c=n.n(o),s=(n(106),n(179)),l=n(28),u=n(80),m=n(45),f=n(57),p=function(e){Object(m.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={hasError:!1},e}return Object(u.a)(n,[{key:"componentDidCatch",value:function(){this.setState({hasError:!0})}},{key:"render",value:function(){return this.state.hasError?i.a.createElement("p",null,"The application is temporarily unavailable"):this.props.children}}]),n}(r.Component),d=n(61),b=n(90),h=n(180),y=n(11);!function(e){e.Index="/",e.Stocks="/stocks"}(a||(a={}));var g,v,O,E=n(34),S=n(26),j=n.n(S),w=n(41),D=n(21),A=n(81),I=n.n(A),x=n(172),C=n(36),M=n.n(C),k=n(169),R=n(173),_=n(184),P=n(181),T=n(177),L=n(178),N=n(182),Y=n(89),B=n.n(Y),K=n(91),G=n(82),H=n.n(G),U=function(e){var t=Object.keys(e),n="";return t.forEach((function(t){var a="object"===typeof e[t],r=a&&e[t].length>=0;a||(n+="".concat(t,"=").concat(e[t],"&")),a&&r&&e[t].forEach((function(e){n+="".concat(t,"=").concat(e,"&")}))})),n?n.slice(0,-1):n},F=function(){var e=Object(w.a)(j.a.mark((function e(t,n){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t&&(null===n||void 0===n?void 0:n.method)){e.next=3;break}return e.abrupt("return",Promise.reject("Please enter endpoint"));case 3:return"GET"===n.method&&(n.paramsSerializer=function(e){return console.log("parsed PAAARAMS",U(e)),U(e)}),console.log("endpoint:",t,"options:",n),e.abrupt("return",H()(t,n).then((function(e){return console.log(e),e.data})));case 9:return e.prev=9,e.t0=e.catch(0),console.log("err",e.t0),e.abrupt("return",Promise.reject(e.t0));case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,n){return e.apply(this,arguments)}}(),W="https://www.alphavantage.co/query?".replace(/\/+$/,""),q=function(e){Object(m.a)(n,e);var t=Object(f.a)(n);function n(e,a){var r;return Object(l.a)(this,n),(r=t.call(this,a)).field=e,r.name=void 0,r}return n}(Object(K.a)(Error)),z=function(e){return{getTimeSeriesDaily:function(t,n,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(!t)throw new q("symbol","Required parameter symbol was null or undefined when calling getTimesSeriesDaily");var i=Object.assign({method:"GET"},r),o={};if(e&&e.apiKey){var c=e.apiKey;o.apikey=c,o.basePath=e.basePath}return i.params={apikey:o.apikey},i.params.function="TIME_SERIES_DAILY",t&&(i.params.symbol=t),n&&(i.params.outputsize=n),a&&(i.params.datatype=a),{url:"",options:i}},searchSymbols:function(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)throw new q("keywords","Required parameter keywords was null or undefined when calling searchSymbols");var r=Object.assign({method:"GET"},a),i={};if(e&&e.apiKey){var o=e.apiKey;i.apikey=o,i.basePath=e.basePath}return r.params={apikey:i.apikey},t&&(r.params.keywords=t),r.params.function="SYMBOL_SEARCH",n&&(r.params.datatype=n),{url:"",options:r}}}},X=function(e){return{getTimeSeriesDaily:function(t,n,a,r){var i=z(e).getTimeSeriesDaily(t,n,a,r);return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W;return F(e+i.url,i.options).catch((function(e){throw e}))}},searchSymbols:function(t,n,a){var r=z(e).searchSymbols(t,n,a);return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W;return F(e+r.url,r.options).catch((function(e){throw e}))}}}},J=new function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(l.a)(this,e),this.apiKey=void 0,this.basePath=void 0,this.apiKey=t.apiKey,this.basePath=t.basePath}({apiKey:"PBZQEWAEXCFONYE9",basePath:"https://www.alphavantage.co/query?"}),Q=(g=J,{getTimeSeriesDaily:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"full",n=arguments.length>2?arguments[2]:void 0,a=arguments.length>3?arguments[3]:void 0;return X(g).getTimeSeriesDaily(e,t,n,a)(v)},searchSymbols:function(e,t,n){return X(g).searchSymbols(e,t,n)(v)}});!function(e){e.symbol="1. symbol",e.name="2. name",e.type="3. type",e.region="4. region?",e.currency="8. currency?"}(O||(O={}));var Z,$={"1. symbol":"FB","2. name":"Facebook Inc.","3. type":"Equity","4. region":"United States","8. currency":"USD"},V=function(e){var t,n=(t=e["Time Series (Daily)"],{x:Object.keys(t),y:Object.keys(t).map((function(e){var n=Object.keys(t[e])[0];return t[e][n]}))}),a=n.x,r=n.y;return console.log("item is",e["Meta Data"]),{x:a,y:r,type:"scatter",mode:"lines",name:e["Meta Data"]["2. Symbol"],line:{color:"rgb(55, 128, 191)",width:1},textinfo:"label+text",text:e["Meta Data"]["2. Symbol"],hoverinfo:"x+y+text"}},ee={title:"Shoreline Stock Market Chart",xaxis:{color:"#7f7f7f",range:["2010-02-17",Date.now()],rangeselector:{buttons:[{count:1,label:"1m",step:"month",stepmode:"backward"},{count:6,label:"6m",step:"month",stepmode:"backward"},{step:"all"}]},rangeslider:{range:["2015-02-17",Date.now()]},type:"date"},yaxis:{color:"#7f7f7f",autorange:!0,range:[86.8700008333,138.870004167],type:"linear"},height:500,showlegend:!1},te=n(35);!function(e){e.ADD_COMPANY="ADD_COMPANY",e.ADD_COMPANIES="ADD_COMPANIES"}(Z||(Z={}));var ne,ae,re,ie,oe=function(e){return{type:Z.ADD_COMPANIES,payload:{companies:e}}},ce=function(e,t){switch(t.type){case Z.ADD_COMPANY:return-1==e.companies.findIndex((function(e){return e[O.symbol]==t.payload.company[O.symbol]}))?{companies:[].concat(Object(E.a)(e.companies),[t.payload.company])}:e;case Z.ADD_COMPANIES:return{companies:Object(E.a)(t.payload.companies)};default:return e}},se={stocks:{companies:[{"1. symbol":"FB","2. name":"Facebook Inc.","3. type":"Equity","4. region":"United States","8. currency":"USD"}]}},le=function(e,t){var n=e.stocks;return{stocks:ce(n,t)}},ue=Object(r.createContext)(Object(te.a)(Object(te.a)({},se),{},{dispatch:function(){}})),me=n(83),fe=n.n(me),pe=n(183),de=Object(k.a)((function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(1),textAlign:"center",color:e.palette.text.secondary},container:{marginTop:30},image:{position:"absolute",top:0,left:20,zIndex:-2,width:300},img:{flex:1,padding:40,maxWidth:"35%"},linearProgress:{width:"70%"}}})),be=function(){var e=de(),t=[$],n=Object(x.a)(["shoreline"]),a=Object(D.a)(n,3),o=a[0],c=a[1],s=a[2],l=Object(r.useState)(""),u=Object(D.a)(l,2),m=u[0],f=u[1],p=Object(r.useState)(),d=Object(D.a)(p,2),b=d[0],h=d[1],y=Object(r.useState)([]),g=Object(D.a)(y,2),v=g[0],S=g[1],A=Object(r.useState)(),C=Object(D.a)(A,2),k=C[0],Y=C[1],K=Object(r.useState)(!1),G=Object(D.a)(K,2),H=G[0],U=G[1],F=Object(r.useContext)(ue),W=F.stocks.companies,q=F.dispatch;Object(r.useEffect)((function(){z()}),[W]),Object(r.useEffect)((function(){if(o.shoreline)var e=M()(o.shoreline),t=setInterval((function(){var n=e.diff(M()());n<=0?(clearInterval(t),f("")):f(M.a.utc(n).format("HH:mm:ss"))}),1e3);else Y([])}),[o]),Object(r.useEffect)((function(){""===m&&s("shoreline")}),[m]);var z=function(){var e=Object(w.a)(j.a.mark((function e(){var t,n,a,r,i;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,o.shoreline||U(!0),t=W.map((function(e){return Q.getTimeSeriesDaily(e[O.symbol])})),e.next=5,Promise.all(t);case 5:n=e.sent,a=n.filter((function(e){return!e.Note})),n.length!==a.length?(Y([{message:"Thank you for using Shoreline! Our standard API call frequency is 5 calls per minute and 500 calls per day."}]),o.shoreline||c("shoreline",M()().add(1,"minutes"),{expires:M()().add(1,"minutes").toDate()}),r=W.filter((function(e){return a.find((function(t){return e["1. symbol"]===t["Meta Data"]["2. Symbol"]}))})),q(oe(r)),U(!1)):(i=a.flatMap((function(e){return e["Time Series (Daily)"]?V(e):[]})),h(i),U(!1)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),Y([{message:"Something went wrong, please try again"}]);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}(),X=function(){var e=Object(w.a)(j.a.mark((function e(t){var n,a,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),t.target[0].value){e.next=3;break}return e.abrupt("return");case 3:return n=t.target[0].value,e.next=6,Q.searchSymbols(n);case 6:a=e.sent,r=a.bestMatches,S(r);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return i.a.createElement("div",null,i.a.createElement(R.a,{container:!0,direction:"column",justify:"center"},i.a.createElement(R.a,{container:!0,justify:"center",item:!0,sm:!0,xs:12,alignContent:"center",alignItems:"center"},i.a.createElement("img",{src:fe.a,className:e.img}),i.a.createElement(N.a,{multiple:!0,id:"fixed-tags-demo",value:W,disabled:!!o.shoreline,onChange:function(e,n){return function(e){q(oe(Object(E.a)(e.filter((function(e){return-1===t.indexOf(e)})))))}(n)},options:v,getOptionLabel:function(e){return e["2. name"]},renderTags:function(e,n){return e.map((function(e,a){return i.a.createElement(_.a,Object.assign({label:e["1. symbol"]},n({index:a}),{disabled:-1!==t.indexOf(e)}))}))},style:{minWidth:"50vw"},renderInput:function(e){return i.a.createElement("form",{onSubmit:X},i.a.createElement(P.a,Object.assign({},e,{id:"filled-basic",label:"Search Company",variant:"outlined",placeholder:"Search Company"})))}})),i.a.createElement(R.a,{container:!0,justify:"center",item:!0,sm:!0,xs:12,alignContent:"center",alignItems:"center"},i.a.createElement("div",null,k&&k.map((function(e){return i.a.createElement(pe.a,{action:i.a.createElement(T.a,{"aria-label":"close",color:"inherit",size:"small",onClick:function(){Y(Object(E.a)(k.filter((function(t){return e.message!==e.message}))))}},i.a.createElement(B.a,{fontSize:"inherit"})),severity:"error"},e.message," ")}))),o.shoreline?i.a.createElement(pe.a,{severity:"info"},"Api available again in ",m):""),H?i.a.createElement(R.a,{container:!0,justify:"center"},i.a.createElement(L.a,{className:e.linearProgress}),i.a.createElement(L.a,{color:"primary",className:e.linearProgress})," "):i.a.createElement(R.a,{item:!0},i.a.createElement(I.a,{data:b||[],layout:ee,config:{responsive:!0,autosizable:!0,showSources:!0},style:{paddingBottom:100,marginBottom:50}}))))},he=function(){return i.a.createElement("div",{"data-testid":"RoutesComponent"},i.a.createElement(y.d,null,i.a.createElement(y.b,{exact:!0,path:a.Index},i.a.createElement(be,null)),i.a.createElement(y.b,{path:a.Index},i.a.createElement(y.a,{to:a.Index}))))},ye=function(e){var t=Object(r.useReducer)(le,se),n=Object(D.a)(t,2),a=n[0],o=n[1];return i.a.createElement(ue.Provider,{value:Object(te.a)(Object(te.a)({},a),{},{dispatch:o})},e.children)};!function(e){e.PRIMARY_MAIN_COLOR="#0f99d6",e.PRIMARY_DARK_COLOR="#034694",e.SUCCESS_COLOR="#8dc63f",e.ERROR_MAIN_COLOR="#ff0000",e.SWITCH_LIGHT_BLUE="#cfebf7",e.SWITCH_LIGHT_GREY="#b0b0b0",e.SWITCH_DISABLED_GREY="#efefef",e.SWITCH_DARK_GREY="#505050",e.BLACK_MEDIUM="rgba(0, 0, 0, 0.8)",e.WHITE="#fff",e.BLACK="#000",e.CARD_BORDER="#f0f0f0"}(ne||(ne={})),function(e){e.FONT_FAMILY='"Open Sans", "Helvetica", "Arial", sans-serif'}(ae||(ae={})),function(e){e[e.MEDIUM=600]="MEDIUM"}(re||(re={})),function(e){e[e.XS=0]="XS",e[e.SM=576]="SM",e[e.MD=768]="MD",e[e.LG=992]="LG",e[e.XL=1200]="XL"}(ie||(ie={}));var ge={typography:{fontFamily:ae.FONT_FAMILY,fontWeightMedium:re.MEDIUM,body2:{fontSize:"0.75rem"}},palette:{primary:{main:ne.PRIMARY_MAIN_COLOR,dark:ne.PRIMARY_DARK_COLOR},secondary:{main:ne.SUCCESS_COLOR},error:{main:ne.ERROR_MAIN_COLOR}},breakpoints:{values:{xs:ie.XS,sm:ie.SM,md:ie.MD,lg:ie.LG,xl:ie.XL}}},ve=Object(b.a)(ge),Oe=function(e){return i.a.createElement("div",{className:"App"},i.a.createElement(s.a,null,i.a.createElement(p,null,i.a.createElement(h.a,{theme:ve},i.a.createElement(d.a,null,i.a.createElement(ye,null,i.a.createElement(he,null)))))))};window.renderShoreline=function(e){var t=document.getElementById(e);t&&c.a.render(i.a.createElement(Oe,null),t)},window.unmountShoreline=function(e){var t=document.getElementById(e);t&&c.a.unmountComponentAtNode(t)},window.isRenderedByContainer||window.renderShoreline("root")},83:function(e,t,n){e.exports=n.p+"static/media/trading.d1bc8b19.jpg"}},[[101,1,2]]]);
//# sourceMappingURL=main.f3cf7f0f.chunk.js.map