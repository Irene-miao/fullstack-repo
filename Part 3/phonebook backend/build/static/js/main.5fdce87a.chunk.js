(this.webpackJsonphello=this.webpackJsonphello||[]).push([[0],{19:function(e,n,t){},39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var o=t(1),c=t(14),a=t.n(c),r=t(3),u=(t(19),t(0)),i=function(e){return Object(u.jsx)("div",{children:Object(u.jsxs)("form",{className:"form",onSubmit:e.onSubmit,children:[Object(u.jsxs)("div",{children:["name:",Object(u.jsx)("input",{value:e.value,onChange:e.onChange})]}),Object(u.jsxs)("div",{children:["number:",Object(u.jsx)("input",{value:e.valueNo,onChange:e.onChangeNo})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})})},s=function(e){return Object(u.jsxs)("div",{className:"form",children:["filter shown with",Object(u.jsx)("input",{value:e.value,onChange:e.onChange})]})},l=function(e){var n=e.persons,t=e.handleDelete;return n.map((function(e){return Object(u.jsxs)("p",{className:"note",children:[e.name," \xa0 ",e.number,"\xa0",Object(u.jsx)("button",{onClick:function(){return t(e.id)},children:"delete"})]},e.id)}))},d=t(4),h=t.n(d),j="https://hidden-brook-55950.herokuapp.com/api/persons",f={getAll:function(){return h.a.get(j).then((function(e){return e.data}))},create:function(e){return h.a.post(j,e).then((function(e){return e.data}))},remove:function(e){return h.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))},update:function(e,n){return h.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))}},b=function(e){var n=e.message;return null===n?null:Object(u.jsx)("div",{className:"notification",children:n.message})},m=function(){var e=Object(o.useState)([]),n=Object(r.a)(e,2),t=n[0],c=n[1],a=Object(o.useState)(""),d=Object(r.a)(a,2),h=d[0],j=d[1],m=Object(o.useState)(""),v=Object(r.a)(m,2),O=v[0],g=v[1],p=Object(o.useState)(""),x=Object(r.a)(p,2),w=x[0],C=x[1],N=Object(o.useState)(null),S=Object(r.a)(N,2),k=S[0],D=S[1];Object(o.useEffect)((function(){console.log("effect"),f.getAll().then((function(e){console.log(e),c(e)}))}),[]);var y=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success";D({message:e,type:n}),setTimeout((function(){D(null)}),5e3)},A=0===w.length?t:t.filter((function(e){return e.name.toLowerCase().indexOf(w.toLowerCase()>0)}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(b,{message:k}),Object(u.jsx)(s,{value:w,onChange:function(e){console.log(e.target.value),C(e.target.value)}}),Object(u.jsx)("h3",{children:"Add a new person details"}),Object(u.jsx)(i,{onSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===h}));n?window.confirm("".concat(n.name," in phonebook, replace the old number with new one?"))&&f.update(n.id,{name:n.name,number:O}).then((function(e){console.log(e),c(t.map((function(t){return t.id!==n.id?t:e}))),y("Changed ".concat(n.name," 's phone number")),j(""),g("")})):f.create({name:h,number:O}).then((function(e){c(t.concat(e)),y("Added ".concat(h)),j(""),g("")})).catch((function(e){console.log(e.response.data.error),y("".concat(e.response.data.error),"error")}))},value:h,onChange:function(e){console.log(e.target.value),j(e.target.value)},valueNo:O,onChangeNo:function(e){console.log(e.target.value),g(e.target.value)}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)("div",{children:Object(u.jsx)(l,{persons:A,handleDelete:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Do you want to delete ".concat(n.name,"?"))&&f.remove(e).then((function(o){c(t.filter((function(n){return n.id!==e}))),y("Deleted ".concat(n.name))})).catch((function(){c(t.filter((function(n){return n.id!==e}))),y("".concat(n.name," was removed"),"error")}))}})})]})};t(39);a.a.render(Object(u.jsx)(m,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.5fdce87a.chunk.js.map