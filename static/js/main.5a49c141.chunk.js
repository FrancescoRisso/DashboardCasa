(this.webpackJsonpdashboard_casa_risso=this.webpackJsonpdashboard_casa_risso||[]).push([[0],{18:function(t,e,n){},19:function(t,e,n){},24:function(t,e,n){"use strict";n.r(e);var s=n(1),r=n.n(s),c=n(9),a=n.n(c),o=(n(18),n(11)),i=n(2),l=n(3),p=n(5),u=n(4),d=(n(19),r.a.createContext({})),h=n(0),j=0,m=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(t){var s;Object(i.a)(this,n),(s=e.call(this,t)).displayTextWidth=function(t,e){var n=document.createElement("canvas").getContext("2d");return n.font=e,n.measureText(t).width},s.updateFontSize=function(){var t,e=document.getElementById(s.state.id),n=e.getBoundingClientRect(),r=Math.floor(100*n.height/133),c=Math.floor(1.25*n.width),a=getComputedStyle(e).fontFamily;for(t=Math.floor(s.displayTextWidth(s.props.text,"".concat(r,"pt ").concat(a)));t>(s.props.icon?c-r:c);)r=Math.floor(.95*r),t=Math.floor(s.displayTextWidth(s.props.text,"".concat(r,"pt ").concat(a)));s.props.group&&(s.context.AdaptiveFontSize.changeFont(s.props.group,s.state.id,r),s.setState({fontSize:s.context.AdaptiveFontSize.groups[s.props.group].fontSize})),s.setState({fontSize:r})},s.componentDidMount=function(){s.props.HTMLtext&&(document.getElementById(s.state.id).children[0].innerHTML=s.props.HTMLtext),window.addEventListener("resize",s.updateFontSize),setTimeout(s.updateFontSize,100)},s.componentWillUnmount=function(){window.removeEventListener("resize",s.updateFontSize)},s.componentDidUpdate=function(t){t.recalc&&!s.props.recalc&&setTimeout(s.updateFontSize,200)};var r=j;return j++,s.state={id:"adaptiveFontSize-".concat(r),fontSize:null},s}return Object(l.a)(n,[{key:"render",value:function(){return Object(h.jsx)("div",{id:this.state.id,className:"".concat(this.props.className," h-100percent"),children:Object(h.jsxs)("p",{className:"center-vertically w-100",style:{fontSize:this.props.group&&this.context.AdaptiveFontSize.groups[this.props.group]?this.context.AdaptiveFontSize.groups[this.props.group].fontSize:this.state.fontSize,verticalAlign:"middle",maxHeight:"100%",margin:"0"},children:[this.props.icon?Object(h.jsx)("span",{className:" center-vertically",children:Object(h.jsx)("img",{height:this.props.group&&this.context.AdaptiveFontSize.groups[this.props.group]?1.2*this.context.AdaptiveFontSize.groups[this.props.group].fontSize:1.2*this.state.fontSize,src:this.props.icon,className:"pr-2 top-0",alt:""})}):Object(h.jsx)(h.Fragment,{}),this.props.text]})})}}]),n}(r.a.Component);m.contextType=d;var b=m,v=n(12),f=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).update=function(t){t?(null!==s.props.firstWait()&&s.props.action(),setTimeout((function(){s.props.action();var t=setInterval(s.props.action,1e3*s.props.time);s.setState({clockInterval:t})}),s.props.firstWait())):clearInterval(s.state.clockInterval)},s.componentDidMount=function(){s.update(!0)},s.componentWillUnmount=function(){s.update(!1)},s.state={clockInterval:null},s}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return Object(h.jsx)(v.a,{onChange:function(e){t.update(e)}})}}]),n}(r.a.Component),x=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(t){var s;Object(i.a)(this,n),(s=e.call(this,t)).updateClockValues=function(){var t=new Date;s.setState({day:t.getDate(),month:t.getMonth(),weekDay:t.getDay(),hour:t.getHours(),min:t.getMinutes()})},s.syncWait=function(){var t=new Date,e=new Date;return e.setMinutes(e.getMinutes()+1),e.setMilliseconds(0),e.setSeconds(0),e-t},s.weekDayNumToWord=["Domenica","Luned\xec","Marted\xec","Mercoled\xec","Gioved\xec","Venerd\xec","Sabato"],s.monthNumToWord=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],s.groupName="dateTitle",s.componentDidMount=function(){s.context.AdaptiveFontSize.registerGroup(s.groupName)};var r=new Date;return s.state={day:r.getDate(),month:r.getMonth(),weekDay:r.getDay(),hour:r.getHours(),min:r.getMinutes()},s}return Object(l.a)(n,[{key:"render",value:function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(f,{action:this.updateClockValues,time:60,firstWait:this.syncWait}),Object(h.jsx)("div",{className:"h-100percent rounded-lg fill-primary",children:Object(h.jsx)("div",{className:"h-100percent align-items-center row",children:Object(h.jsxs)("div",{className:"w-100 h-100percent",children:[Object(h.jsx)("div",{className:"h-50percent",children:Object(h.jsx)(b,{className:"text-center text-white mb-0 bold",text:"".concat(this.weekDayNumToWord[this.state.weekDay]," ").concat(this.state.day," ").concat(this.monthNumToWord[this.state.month]),group:this.groupName})}),Object(h.jsx)("div",{className:"h-50percent",children:Object(h.jsx)(b,{className:"text-center text-white font-percentage mb-0",text:"".concat(this.state.hour.toString().padStart(2,"0"),":").concat(this.state.min.toString().padStart(2,"0")),group:this.groupName})})]})})})]})}}]),n}(r.a.Component);x.contextType=d;var O=x,g=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).componentDidMount=function(){document.getElementById("icon-".concat(s.props.day)).innerHTML=s.props.icon},s.state={},s}return Object(l.a)(n,[{key:"render",value:function(){return Object(h.jsxs)("div",{className:"row m-0 w-100",style:{height:"".concat(100/this.props.count,"%")},children:[Object(h.jsx)("div",{className:"col-4 h-100percent",children:Object(h.jsx)(b,{className:"center-vertically m-0 text-left text py-auto h-100percent",text:"".concat(this.props.day,":"),group:this.props.fontSizeGroups.day})}),Object(h.jsx)("div",{className:"col-2 mx-0 h-100percent w-100 p-0",children:Object(h.jsx)("div",{id:"icon-".concat(this.props.day),className:"h-100percent w-100"})}),Object(h.jsx)("div",{className:"col-6 mx-0 h-100percent",children:Object(h.jsx)(b,{className:"text-center text-half-big m-0 center-vertically",HTMLtext:'<span class="text-blue">'.concat(this.props.temp[0],'</span> - <span class="text-red">').concat(this.props.temp[1],"</span>"),text:"".concat(this.props.temp[0]," - ").concat(this.props.temp[1]),group:this.props.fontSizeGroups.temperatures})})]})}}]),n}(r.a.Component),y=n(8),S=n.n(y),N=n(10),w=function(){var t=Object(N.a)(S.a.mark((function t(e){var n,s;return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("/api".concat(e));case 2:return n=t.sent,t.next=5,n.json();case 5:if(s=t.sent,!n.ok){t.next=10;break}return t.abrupt("return",s);case 10:throw s;case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),k=w,z=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).loadForecasts=function(){k("/weatherNow").then((function(t){s.setState({currentWeather:t})})).catch((function(t){s.setState({currentWeather:"Error"})})),k("/weatherForecast").then((function(t){s.setState({forecasts:t})})).catch((function(t){console.log(t),s.setState({forecasts:"Error"})}))},s.componentDidUpdate=function(){null!==s.state.currentWeather&&(document.getElementById("forecast-now").innerHTML=s.state.currentWeather.icon)},s.componentDidMount=function(){s.context.AdaptiveFontSize.registerGroup("forecasts-days"),s.context.AdaptiveFontSize.registerGroup("forecasts-temperatures")},s.state={currentWeather:null,forecasts:[]},s}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(f,{action:this.loadForecasts,firstWait:function(){return null},time:3600}),Object(h.jsxs)("a",{href:"https://www.3bmeteo.com/meteo/manta",className:"no-link-format",target:"_blank",rel:"noopener noreferrer",children:[Object(h.jsx)("div",{className:"h-40percent py-2",children:Object(h.jsxs)("div",{className:"row m-0 px-2 h-100percent",children:[Object(h.jsxs)("div",{className:"col-6 p-0 h-100percent",children:[Object(h.jsx)("div",{className:"h-35percent",children:Object(h.jsx)(b,{text:"Manta",className:"text-center"})}),Object(h.jsx)("div",{className:"h-65percent",children:Object(h.jsx)("div",{id:"forecast-now",className:"h-100percent"})})]}),Object(h.jsx)("div",{className:"col-6 p-0 h-100percent",children:null===this.state.currentWeather?Object(h.jsx)("span",{className:"text-center col-8 py-auto",children:Object(h.jsx)("div",{className:"center-vertically",children:Object(h.jsx)("div",{className:"spinner-border"})})}):Object(h.jsx)(b,{text:"Error"===this.state.currentWeather?"Si \xe8 verificato un errore":this.state.currentWeather.temperature,className:"text-center"})})]})}),Object(h.jsx)("div",{className:"h-60percent py-2",children:"Error"===this.state.forecasts?Object(h.jsx)("p",{className:"text-center col-12",children:"Si \xe8 verificato un errore."}):this.state.forecasts.map((function(e){return Object(h.jsx)(g,{day:e.day,icon:e.icon,temp:[e.minTemp,e.maxTemp],count:t.state.forecasts.length,fontSizeGroups:{day:"forecasts-days",temperatures:"forecasts-temperatures"}},e.day)}))})]})]})}}]),n}(r.a.Component);z.contextType=d;var M=z,F=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(h.jsxs)("div",{className:"row m-0 fill-primary-light w-100 h-100percent rounded-lg",children:[Object(h.jsx)("div",{className:"col-7 h-100percent",children:Object(h.jsx)(b,{text:this.props.name,recalc:this.props.recalc,className:"text-center",group:this.props.fontSizeGroup})}),Object(h.jsx)("div",{className:"col-5 h-100percent",children:Object(h.jsx)(b,{text:"".concat("boolean"===typeof this.props.value?this.props.value?"ON":"OFF":" kW"===this.props.unit?this.props.value.toFixed(4):this.props.value.toFixed(1)).concat(this.props.unit),recalc:this.props.recalc,className:"text-center",group:this.props.fontSizeGroup})})]})}}]),n}(r.a.Component),G=F,C=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return this.props.values.map((function(e,n){return e.link?Object(h.jsx)("a",{style:{height:"".concat(100/t.props.values.length,"%")},className:"row m-0 w-".concat(t.props.centerSmaller?"50":"100","percent py-1 no-link-format center-horizontally"),target:"_blank",rel:"noopener noreferrer",href:e.link,children:Object(h.jsx)(G,{name:e.label,value:e.value,recalc:t.props.recalc,fontSizeGroup:t.props.fontSizeGroup,unit:t.props.unit})},n):Object(h.jsx)("div",{style:{height:"".concat(100/t.props.values.length,"%")},className:"row m-0 w-".concat(t.props.centerSmaller?"50":"100","percent py-1 center-horizontally"),children:Object(h.jsx)(G,{name:e.label,value:e.value,recalc:t.props.recalc,fontSizeGroup:t.props.fontSizeGroup,unit:t.props.unit})},n)}))}}]),n}(r.a.Component),W=C,L=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(){var t;Object(i.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).componentDidMount=function(){t.context.AdaptiveFontSize.registerGroup("modal-".concat(t.props.id))},t}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return Object(h.jsx)("div",{className:"modal fade",id:"modal-".concat(this.props.id),tabIndex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",children:Object(h.jsx)("div",{className:"modal-dialog modal-dialog-centered modal-lg",role:"document",children:Object(h.jsx)("div",{className:"modal-content h-100percent",children:Object(h.jsxs)("div",{className:"modal-body",children:[Object(h.jsx)("div",{className:"fill-primary rounded-lg py-2 white-text h-12percent",children:Object(h.jsx)(b,{className:"modal-title text-center",text:this.props.title,recalc:this.props.recalc})}),Object(h.jsx)("div",{className:"spacer h-3percent"}),Object(h.jsx)("div",{className:"h-70percent",children:this.props.values&&"Error"!==this.props.values?this.props.values.length<6?Object(h.jsx)(W,{values:this.props.values,recalc:this.props.recalc,unit:this.props.unit,fontSizeGroup:"modal-".concat(this.props.id)}):this.props.values.length%2===0?Object(h.jsxs)("div",{className:"row h-100percent m-0",children:[Object(h.jsx)("div",{className:"col-6 pl-0 pr-1",children:Object(h.jsx)(W,{values:this.props.values.filter((function(t,e){return e%2===0})),recalc:this.props.recalc,unit:this.props.unit,fontSizeGroup:"modal-".concat(this.props.id)})}),Object(h.jsx)("div",{className:"col-6 pr-0 pl-1 h-100percent",children:Object(h.jsx)(W,{values:this.props.values.filter((function(t,e){return e%2!==0})),recalc:this.props.recalc,unit:this.props.unit,fontSizeGroup:"modal-".concat(this.props.id)})})]}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{className:"row m-0",style:{height:"".concat(Math.floor(100*Math.floor(this.props.values.length/2)/Math.ceil(this.props.values.length/2)),"%")},children:[Object(h.jsx)("div",{className:"col-6 pl-0 pr-1",children:Object(h.jsx)(W,{values:this.props.values.filter((function(e,n){return n%2===0&&n+1!==t.props.values.length})),recalc:this.props.recalc,unit:this.props.unit,fontSizeGroup:"modal-".concat(this.props.id)})}),Object(h.jsx)("div",{className:"col-6 pr-0 pl-1",children:Object(h.jsx)(W,{values:this.props.values.filter((function(t,e,n){return e%2!==0})),recalc:this.props.recalc,unit:this.props.unit,fontSizeGroup:"modal-".concat(this.props.id)})})]}),Object(h.jsx)("div",{style:{height:"".concat(100/Math.ceil(this.props.values.length/2),"%")},children:Object(h.jsx)(W,{values:[this.props.values.at(-1)],recalc:this.props.recalc,unit:this.props.unit,fontSizeGroup:"modal-".concat(this.props.id),centerSmaller:!0})})]}):Object(h.jsx)("p",{className:"center text-center",children:"Si \xe8 verificato un errore"})}),Object(h.jsx)("div",{className:"spacer h-3percent"}),Object(h.jsx)("button",{type:"button",className:"btn btn-primary text-center w-100 py-2 h-12percent","data-dismiss":"modal",children:Object(h.jsx)(b,{className:"modal-title text-center",text:"Chiudi",recalc:this.props.recalc})})]})})})})}}]),n}(r.a.Component);L.contextType=d;var A=L,D=n.p+"static/media/heating.9b6db302.svg",H=n.p+"static/media/cooling.b9b74797.svg",T=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).updateValues=function(){k("/".concat(s.props.title)).then((function(t){"Error"===t?s.setState({summary:"Error",values:"Error"}):s.setState({summary:t.shift(),values:t})})).catch((function(t){console.log(t),s.setState({values:"Error"})}))},s.doModalOpen=function(){s.setState({modalOpen:!0},(function(){s.setState({modalOpen:!1})}))},s.state={values:null,summary:null,modalOpen:!1},s}return Object(l.a)(n,[{key:"render",value:function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(f,{time:300,action:this.updateValues,firstWait:function(){return null}}),Object(h.jsx)(A,{id:this.props.title,title:this.props.title,values:this.state.values,recalc:this.state.modalOpen,unit:""}),Object(h.jsx)("button",{className:"h-100percent w-100 btn btn-primary rounded-lg p-0","data-toggle":"modal","data-target":"#modal-".concat(this.props.title),onClick:this.doModalOpen,children:Object(h.jsx)("div",{className:"center-vertically h-100percent",children:null===this.state.summary?Object(h.jsx)("span",{className:"spinner-border"}):Object(h.jsx)(b,{className:"text-center mb-0",text:"".concat(this.props.title,": ").concat(null===this.state.summary?"Si \xe8 verificato un errore":this.state.summary?"ON":"OFF"),group:this.props.fontSizeGroup,icon:"Riscaldamento"===this.props.title?D:H})})})]})}}]),n}(r.a.Component),E=n.p+"static/media/inside.4583e11f.svg",I=n.p+"static/media/outside2.463aa279.svg",B=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).loadData=function(){k("/temp".concat(s.props.title)).then((function(t){s.setState({values:t})})).catch((function(t){console.log(t),s.setState({values:"Error"})}))},s.doModalOpen=function(){s.setState({modalOpen:!0},(function(){s.setState({modalOpen:!1})}))},s.state={values:null,modalOpen:!1},s}return Object(l.a)(n,[{key:"render",value:function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(f,{action:this.loadData,time:300,firstWait:function(){return null}}),Object(h.jsx)(A,{id:this.props.title,title:this.props.title,values:this.state.values,unit:"\xb0C",recalc:this.state.modalOpen}),Object(h.jsx)("button",{className:"h-100percent w-100 btn p-0","data-toggle":"modal","data-target":"#modal-".concat(this.props.title),onClick:this.doModalOpen,children:Object(h.jsx)("div",{className:"my-2 h-100percent",children:Object(h.jsxs)("div",{className:"h-100percent",children:[Object(h.jsx)(b,{text:"".concat(this.props.title,":"),className:"mb-0 h-25percent w-90percent-right text-left",group:this.props.fontSizeGroup,icon:"Interna"===this.props.title?E:I}),null===this.state.values?Object(h.jsx)("span",{className:"spinner-border"}):Object(h.jsx)(b,{text:"Error"===this.state.values?"Si \xe8 verificato un errore":"".concat(this.state.values[0].value.toFixed(1),"\xb0C"),className:"m-0 text-right h-75percent w-90percent-left"})]})})})]})}}]),n}(r.a.Component),U=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(h.jsx)("div",{className:"d-none",children:Object(h.jsxs)("svg",{children:[Object(h.jsx)("title",{children:"Hidden Weather Icon Symbols"}),Object(h.jsxs)("symbol",{id:"svg-symbol-hail",viewBox:"0 0 89 170",children:[Object(h.jsx)("path",{d:"M24,2 L9,37 L24,2 Z M10,5 L2,23 L10,5 Z",stroke:"var(--color-hail)",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round"}),Object(h.jsx)("circle",{fill:"var(--color-hail)",r:"8",cx:"0",cy:"52"})]}),Object(h.jsx)("symbol",{id:"svg-symbol-moon",children:Object(h.jsx)("path",{fill:"var(--color-moon)",d:"M71 0 A 50 48, 150, 1, 0, 118 81 A 60 57, 140, 0, 1, 71 0"})}),Object(h.jsx)("symbol",{id:"svg-symbol-star",children:Object(h.jsx)("path",{fill:"var(--color-star)",d:"M169.6,38.1l-30-6.1l-6.1-30c-0.1-0.5-0.5-1-1.1-1.1c-0.7-0.1-1.3,0.4-1.4,1.1L125,32l-30,6.1c-0.5,0.1-1,0.5-1.1,1.1c-0.1,0.7,0.4,1.3,1.1,1.4l30,6.1l6.1,30c0.1,0.5,0.5,1,1.1,1.1c0.7,0.1,1.3-0.4,1.4-1.1l6.1-30l30-6.1c0.5-0.1,1-0.5,1.1-1.1C170.7,38.8,170.3,38.2,169.6,38.1z"})}),Object(h.jsx)("symbol",{id:"svg-symbol-sun-ray",children:Object(h.jsx)("path",{d:"M100,44.1c3.1,0,6.1,0.3,9,0.7l-5.3-40.7c0,0,0-0.1,0-0.1c-0.3-1.9-2-3.2-4-3c-1.5,0.2-2.7,1.3-3,2.8 c0,0.1-0.1,0.2-0.1,0.2l-5.5,40.7C94.1,44.3,97,44.1,100,44.1z"})}),Object(h.jsxs)("symbol",{id:"svg-symbol-sun",fill:"var(--color-sun)",children:[Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(30, 100, 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(60, 100, 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(90, 100, 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(120, 100, 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(150, 100, 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(180, 100, 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(210, 100, 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(240, 100, 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(270, 100, 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(300, 100, 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-sun-ray",transform:"rotate(330, 100, 100)"}),Object(h.jsx)("circle",{cx:"100",cy:"100",r:"46.1"})]}),Object(h.jsx)("symbol",{id:"svg-symbol-fog-wave",children:Object(h.jsx)("path",{fill:"var(--color-fog)",d:"M198.4,55.3c-0.9-1.2-2.6-1.4-3.7-0.5l-4.6,3.6c0,0,0,0,0,0c-1,1.1-7.6,5.3-15.2,5.4 c-5.3,0.1-9.9-1.8-13.8-5.6c-12.5-12.6-26.9-5.7-32.7-0.3l0,0c0,0,0,0,0,0c-1,1.1-7.8,5.5-15.4,5.7c-5.3,0.1-9.9-1.8-13.8-5.7 c-12.5-12.5-26.9-5.7-32.7-0.3c0,0,0,0,0,0c-1,1.1-7.8,5.6-15.4,5.8c-5.3,0.1-9.9-1.8-13.8-5.7c-12.2-12.3-26.2-6-32.3-0.7L2,59.2 c-1.2,0.9-1.3,2.7-0.4,3.9c0.9,1.2,2.6,1.4,3.8,0.5l2.9-2.3v0c0,0,0,0,0,0l1.8-1.3v0c4-2.8,14-8,23.5,1.5c5.5,5.5,11.6,7.3,17,7.3 c4.7,0,8.9-1.3,11.8-2.5c1.6-0.7,5.8-2.5,7.8-4.7c0.7-0.6,13.3-11.8,25.3,0.2c5.5,5.5,11.6,7.3,17,7.3c4.7,0,8.9-1.3,11.8-2.5 c1.5-0.7,5.7-2.5,7.7-4.7l0,0c0.6-0.5,13.3-11.9,25.3,0.1c5.5,5.5,11.6,7.3,17,7.3c4.7,0,8.9-1.3,11.8-2.5c1.3-0.6,4.7-2,6.8-3.9 l5-3.6C199.2,58.3,199.3,56.4,198.4,55.3z"})}),Object(h.jsx)("symbol",{id:"svg-symbol-snowflake-branch",children:Object(h.jsx)("path",{d:"M100 5 95 40 70 20 96 35 95 98 105 98 105 41 130 20 104 35z",strokeWidth:"8",strokeLinecap:"square",strokeLinejoin:"round"})}),Object(h.jsxs)("symbol",{id:"svg-symbol-snowflake",viewBox:"0 0 200 200",fill:"var(--color-snowflake)",stroke:"var(--color-snowflake)",children:[Object(h.jsx)("use",{xlinkHref:"#svg-symbol-snowflake-branch",transform:"rotate(0 100 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-snowflake-branch",transform:"rotate(60 100 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-snowflake-branch",transform:"rotate(120 100 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-snowflake-branch",transform:"rotate(180 100 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-snowflake-branch",transform:"rotate(240 100 100)"}),Object(h.jsx)("use",{xlinkHref:"#svg-symbol-snowflake-branch",transform:"rotate(300 100 100)"})]}),Object(h.jsx)("symbol",{id:"svg-symbol-cloud",viewBox:"-4 0 204 200",children:Object(h.jsx)("path",{fill:"var(--color-cloud)",d:"M197.9,108.5c-4.7-17.5-22.7-28-40.2-23.4c0,0-1.3,0.3-3.5,0.9c-5.6-20.8-24.6-36.2-47.2-36.2 c-24.5,0-44.8,18.1-48.3,41.6c-0.8-0.2-1.3-0.3-1.3-0.3c-14.8-3.8-30,5-33.9,19.8c-0.9,3.5-1.1,7-0.8,10.4c-7.4,2-12,3.2-12,3.2 c-7,1.9-11.1,9-9.2,16c1.6,6.1,7.3,10,13.4,9.7h150.3c0,0,6.2-0.3,9.4-1.1C192.1,144.3,202.6,126.2,197.9,108.5z"})}),Object(h.jsx)("symbol",{id:"svg-symbol-cloud-junior",viewBox:"0 0 200 200",children:Object(h.jsx)("path",{fill:"var(--color-cloud)",d:"M197.4,52.8c-2.4-8.8-11.3-14-20.1-11.7c0,0-0.6,0.2-1.8,0.5c-2.8-10.4-12.3-18.1-23.6-18.1 c-7.5,0-14.1,3.4-18.6,8.7c3.2,3.7,5.8,7.9,7.9,12.4c1.6-0.2,3.3-0.3,5-0.3c16.9,0,31.8,11.4,36.2,27.8c0.1,0.5,0.2,1,0.3,1.5 c1-0.1,2.2-0.2,3-0.4C194.6,70.7,199.8,61.6,197.4,52.8z"})}),Object(h.jsx)("symbol",{id:"svg-symbol-lightning-bolt",children:Object(h.jsx)("path",{fill:"var(--color-lightning)",d:"M89.9,124.5c0-0.7-0.7-1.2-1.6-1.2h0l0,0H58.9c-0.7,0-1.4,0.4-1.5,0.9l-11.6,33.1 c-0.1,0.1-0.1,0.3-0.1,0.5c0,0.7,0.7,1.2,1.6,1.2h0h10.9l-10.4,29.6h0c-0.1,0.2-0.1,0.4-0.1,0.6c0,1.3,1.4,2.4,3.1,2.4 c1.1,0,2.1-0.5,2.7-1.2l0,0l34.1-45.2h0c0.1-0.2,0.1-0.3,0.1-0.5c0-0.7-0.7-1.2-1.6-1.2c0,0,0,0,0,0v0H75.7l13.9-18.4 C89.8,125,89.9,124.8,89.9,124.5z"})}),Object(h.jsx)("symbol",{id:"svg-symbol-drop",children:Object(h.jsx)("path",{fill:"var(--color-drop)",d:"M82.1,123.3c0.4-0.9-0.2-1.9-1.2-2.2c-0.9-0.3-1.9,0-2.3,0.7h0l-19.4,24.8c-0.4,0.5-0.7,1-1,1.6 c-1.2,3,0.6,6.4,4,7.5c3.4,1.1,7-0.4,8.3-3.3h0L82,123.5L82.1,123.3L82.1,123.3z"})}),Object(h.jsx)("symbol",{id:"svg-symbol-wind",children:Object(h.jsx)("path",{fill:"var(--color-wind)",d:"M85.7,109.4c-3.5,0-6.4-2.8-6.4-6.4s2.8-6.4,6.4-6.4h85.2c4.1-0.1,8-1.5,10.8-4.3       c2.9-2.8,4.6-6.6,4.6-10.5c0.1-3-1.1-5.9-3.2-8c-2.1-2.2-5-3.3-8-3.4H175c-2.2,0-4.3,0.8-5.9,2.4c-1.6,1.5-2.5,3.7-2.5,5.9       c0,0.9,0.2,1.8,0.6,2.6c1.5,3.2,0.1,7-3.1,8.5c-3.2,1.5-7,0.1-8.5-3.1c-1.2-2.6-1.8-5.3-1.7-8.1c0.1-5.7,2.3-10.9,6.4-14.9       c4-3.9,9.3-6,14.8-6h0.1c6.5,0.1,12.5,2.6,17,7.2c4.5,4.6,6.9,10.7,6.9,17.1c-0.1,7.4-3.1,14.3-8.5,19.5       c-5.1,5-12.1,7.7-19.5,7.8L85.7,109.4L85.7,109.4z"})}),Object(h.jsx)("symbol",{id:"svg-symbol-icy",viewBox:"0 0 8.9 10.9",children:Object(h.jsx)("path",{d:"M8.9 1.1L8.1 8c0 .1-.1.2-.2.2s-.2-.1-.2-.2l-.6-4.7-1 7.4c0 .1-.1.2-.2.2s-.3-.1-.3-.2L4.6 3l-.4 3.3c0 .1-.1.1-.1.1-.1 0-.2 0-.2-.1l-.3-2.8-.8 5.6c0 .1-.1.2-.2.2s-.2-.1-.2-.2l-.7-5.2-.4 3.4c0 .1-.1.2-.2.2s-.2-.1-.2-.2L0 1V.9C0 .7 0 .6.1.4.2.1.5 0 .8 0h7.3c.3 0 .5.2.7.4.1.1.1.3.1.5v.2z"})})]})})}}]),n}(r.a.Component),P=U,V=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return Object(h.jsx)("div",{className:"h-33percent ".concat(this.props.padding,"-1"),children:Object(h.jsxs)("button",{className:"h-100percent fill-primary-light rounded-lg py-2 btn w-100","data-toggle":"modal","data-target":"#modal-consumptions",onClick:this.props.doModalOpen,children:[Object(h.jsx)(b,{className:"h-30percent w-90percent-right text-left",text:"".concat(this.props.title,":"),group:this.props.fontSizeGroup}),this.props.values?Object(h.jsx)(b,{className:"h-70percent w-90percent-left text-right",text:"Error"!==this.props.values&&0!==this.props.values.filter((function(e){return e.label===t.props.title})).length?"".concat(this.props.values.filter((function(e){return e.label===t.props.title}))[0].value.toFixed(3).replace(".",",")," kW"):"Si \xe8 verificato un errore"}):Object(h.jsx)("div",{className:"h-70percent w-100",children:Object(h.jsx)("span",{className:"center",children:Object(h.jsx)("span",{className:"spinner-border"})})})]})})}}]),n}(r.a.Component),_=V,R=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).updateData=function(){k("/consumptions").then((function(t){s.setState({values:t})})).catch((function(t){s.setState({values:"Error"})}))},s.doModalOpen=function(){s.setState({modalOpen:!0},(function(){s.setState({modalOpen:!1})}))},s.componentDidMount=function(){s.context.AdaptiveFontSize.registerGroup("titles-consumptions")},s.state={values:null,modalOpen:!1},s}return Object(l.a)(n,[{key:"render",value:function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(f,{action:this.updateData,time:60,firstWait:function(){return null}}),Object(h.jsx)(A,{id:"consumptions",title:"Consumi elettrici",recalc:this.state.modalOpen,values:this.state.values,unit:" kW"}),Object(h.jsx)(_,{padding:"pb",title:"Produzione fotovoltaico",values:this.state.values,doModalOpen:this.doModalOpen,fontSizeGroup:"titles-consumptions"}),Object(h.jsx)(_,{padding:"py",title:"Consumo totale",values:this.state.values,doModalOpen:this.doModalOpen,fontSizeGroup:"titles-consumptions"}),Object(h.jsx)(_,{padding:"pt",title:this.state.values&&this.state.values.filter((function(t){return"Immessa in rete"===t.label}))&&this.state.values.filter((function(t){return"Immessa in rete"===t.label})).length>0&&this.state.values.filter((function(t){return"Immessa in rete"===t.label}))[0].value>0?"Immessa in rete":"Comprata dall'ENEL",values:this.state.values,doModalOpen:this.doModalOpen,fontSizeGroup:"titles-consumptions"})]})}}]),n}(r.a.Component);R.contextType=d;var J=R,Z=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(){var t;Object(i.a)(this,n);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).componentDidMount=function(){t.context.AdaptiveFontSize.registerGroup("titles-temperatures"),t.context.AdaptiveFontSize.registerGroup("titles-onOff")},t}return Object(l.a)(n,[{key:"render",value:function(){return"horizontal"===this.props.orientation?Object(h.jsxs)("div",{className:"container-fluid vh-100",children:[Object(h.jsx)("div",{className:"py-2 h-30",children:Object(h.jsx)(O,{})}),Object(h.jsxs)("div",{className:"row m-0 h-55",children:[Object(h.jsxs)("div",{className:"px-0 col-4 h-100percent pr-1",children:[Object(h.jsx)("div",{className:"h-50percent pb-1",children:Object(h.jsx)("div",{className:"h-100percent fill-primary-light rounded-lg",children:Object(h.jsx)(B,{title:"Interna",fontSizeGroup:"titles-temperatures"})})}),Object(h.jsx)("div",{className:"h-50percent pt-1",children:Object(h.jsx)("div",{className:"h-100percent fill-primary-light rounded-lg",children:Object(h.jsx)(B,{title:"Esterna",fontSizeGroup:"titles-temperatures"})})})]}),Object(h.jsx)("div",{className:"px-0 col-4 h-100percent",children:Object(h.jsx)("div",{className:"mx-1 h-100percent fill-primary-light rounded-lg",children:Object(h.jsx)(M,{})})}),Object(h.jsx)("div",{className:"px-0 pl-1 col-4 h-100percent",children:Object(h.jsx)(J,{})})]}),Object(h.jsxs)("div",{className:"row py-2 mx-auto h-15",children:[Object(h.jsx)("div",{className:"col-6 m-0 p-0 pr-1 h-100percent",children:Object(h.jsx)(T,{title:"Riscaldamento",fontSizeGroup:"titles-onOff"})}),Object(h.jsx)("div",{className:"col-6 m-0 p-0 pl-1 h-100percent",children:Object(h.jsx)(T,{title:"Raffrescamento",fontSizeGroup:"titles-onOff"})})]}),Object(h.jsx)(P,{})]}):Object(h.jsx)("p",{children:"La pagina verticale arriver\xe0 in futuro"})}}]),n}(r.a.Component);Z.contextType=d;var q=Z,$=function(t){Object(p.a)(n,t);var e=Object(u.a)(n);function n(t){var s;return Object(i.a)(this,n),(s=e.call(this,t)).componentDidMount=function(){window.addEventListener("resize",(function(){s.setState({isLandscape:window.matchMedia("(orientation: landscape)").matches})}))},s.registerAdaptiveFontSizeGroup=function(t){s.setState((function(e){return e.AdaptiveFontSizeGroups[t]={fontSize:null,instances:{}},{AdaptiveFontSizeGroups:e.AdaptiveFontSizeGroups}}))},s.changeAdaptiveFontSizeFont=function(t,e,n){s.setState((function(s){return s.AdaptiveFontSizeGroups[t].instances[e]=n,s.AdaptiveFontSizeGroups[t].fontSize=Math.min.apply(Math,Object(o.a)(Object.values(s.AdaptiveFontSizeGroups[t].instances))),{AdaptiveFontSizeGroups:s.AdaptiveFontSizeGroups}}))},s.state={isLandscape:window.matchMedia("(orientation: landscape)").matches,AdaptiveFontSizeGroups:{}},s}return Object(l.a)(n,[{key:"render",value:function(){return Object(h.jsx)(d.Provider,{value:{AdaptiveFontSize:{groups:this.state.AdaptiveFontSizeGroups,registerGroup:this.registerAdaptiveFontSizeGroup,changeFont:this.changeAdaptiveFontSizeFont}},children:Object(h.jsx)(q,{orientation:this.state.isLandscape?"horizontal":"vertical"})})}}]),n}(r.a.Component),K=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(e){var n=e.getCLS,s=e.getFID,r=e.getFCP,c=e.getLCP,a=e.getTTFB;n(t),s(t),r(t),c(t),a(t)}))},Q=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function X(t,e){navigator.serviceWorker.register(t).then((function(t){t.onupdatefound=function(){var n=t.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),e&&e.onUpdate&&e.onUpdate(t)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(t)))})}})).catch((function(t){console.error("Error during service worker registration:",t)}))}a.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)($,{})}),document.getElementById("root")),function(t){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("","/customServiceWorker.js");Q?(!function(t,e){fetch(t,{headers:{"Service-Worker":"script"}}).then((function(n){var s=n.headers.get("content-type");404===n.status||null!=s&&-1===s.indexOf("javascript")?navigator.serviceWorker.ready.then((function(t){t.unregister().then((function(){window.location.reload()}))})):X(t,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,t),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):X(e,t)}))}}(),K()}},[[24,1,2]]]);
//# sourceMappingURL=main.5a49c141.chunk.js.map