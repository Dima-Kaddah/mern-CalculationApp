(this["webpackJsonpquiz-app-frontend"]=this["webpackJsonpquiz-app-frontend"]||[]).push([[5],{52:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var a=n(8),r=n.n(a),l=n(15),o=n(4),c=n(0),s=n.n(c),u=n(9),i=n(2),p=n(21),m=n(17),d=(n(52),n(28)),b=n(14),h=n.n(b),g=n(18),v=n.n(g),E=n(16);t.default=function(){var e=Object(c.useState)({}),t=Object(o.a)(e,2),n=t[0],a=t[1],b=Object(p.a)(),g=Object(o.a)(b,2),f=g[0],O=g[1],j=Object(m.a)(),w=j.isLoading,x=j.error,y=j.sendRequest,q=Object(i.g)(),N=function(){var e=Object(l.a)(r.a.mark((function e(t){var n,l,o,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n="".concat("https://mathquzi.herokuapp.com/api","/addQuestion"),l={index:f.index,question:f.question,answer:f.answer,role:f.role},o={method:"POST",body:JSON.stringify(l),headers:{"Content-Type":"application/json"}},e.prev=4,e.next=7,y(n,o.method,o.body,o.headers);case 7:c=e.sent,q.push("/newQuestion"),a(c),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(4),console.log("can't create user",e.t0);case 15:case"end":return e.stop()}}),e,null,[[4,12]])})));return function(t){return e.apply(this,arguments)}}();return console.log(n),s.a.createElement(c.Fragment,null,w&&s.a.createElement("img",{src:h.a,alt:"Loading"}),x&&s.a.createElement("img",{src:v.a,alt:"Error"}),!w&&!x&&s.a.createElement(c.Fragment,null,s.a.createElement(u.a,null,s.a.createElement("title",null,"Math-Quiz App - Admin")),s.a.createElement("section",null,s.a.createElement(d.a,null),s.a.createElement("h1",null,"Hello Admin! this is add Question page :)"),s.a.createElement("form",{onSubmit:N},s.a.createElement("input",{type:"number",name:"index",placeholder:"QNumber",value:f.index||"",onChange:O,className:"inputForm",autoFocus:!0}),s.a.createElement("input",{type:"text",name:"question",placeholder:"Question",value:f.question||"",onChange:O,className:"inputForm",validators:[Object(E.a)()]}),s.a.createElement("input",{type:"text",name:"answer",placeholder:"Answer",value:f.answer||"",onChange:O,className:"inputForm",validator:[Object(E.b)(6)]}),s.a.createElement("input",{type:"text",name:"role",placeholder:"Level",value:f.role||"",onChange:O,className:"inputForm",validator:[Object(E.b)(6)]}),s.a.createElement("div",{className:"signup-btn-container"},s.a.createElement("button",{type:"submit",className:"signup-btn btn"},"Add Question"))))))}}}]);
//# sourceMappingURL=5.290e97f3.chunk.js.map