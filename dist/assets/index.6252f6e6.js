import{d as b,o as s,c as N,u as C,R as V,r as p,a as $,b as a,w as _,v as y,F as g,e as k,f as w,g as h,t as f,h as B,i as E,j as F,k as O}from"./vendor.0e8e32dc.js";const A=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}};A();const M=b({setup(m){return(r,n)=>(s(),N(C(V)))}}),P=h("p",null,"first",-1),R=["value"],S=h("p",null,"second",-1),j=["value"],D={key:2},T={key:3},U=b({setup(m){const r=p(null),n=p(!0),c=p(null),e=p(""),o=p(""),l=p("");function x(){return n.value=!0,fetch(`http://localhost:8080/api/furs/compare/${e.value}/${o.value}`,{method:"get"}).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.text()}).then(t=>{l.value=t}).catch(t=>{c.value=t}).then(()=>{n.value=!1})}function L(){return n.value=!0,fetch("http://localhost:8080/api/furs/names",{method:"get"}).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.json()}).then(t=>{r.value=t}).catch(t=>{c.value=t}).then(()=>{n.value=!1})}return $(()=>{L()}),(t,i)=>(s(),a("main",null,[P,!n.value&&r.value?_((s(),a("select",{key:0,"onUpdate:modelValue":i[0]||(i[0]=u=>e.value=u)},[(s(!0),a(g,null,k(r.value,(u,d)=>(s(),a("option",{key:d,value:u},f(u),9,R))),128))],512)),[[y,e.value]]):w("",!0),S,!n.value&&r.value?_((s(),a("select",{key:1,"onUpdate:modelValue":i[1]||(i[1]=u=>o.value=u)},[(s(!0),a(g,null,k(r.value,(u,d)=>(s(),a("option",{key:d,value:u},f(u),9,j))),128))],512)),[[y,o.value]]):w("",!0),h("button",{onClick:x},"Check"),!n.value&&l.value?(s(),a("p",D,f(l.value),1)):(s(),a("p",T,f(c.value),1))]))}}),q=B({history:E("/"),routes:[{path:"/",name:"home",component:U}]}),v=F(M);v.use(O());v.use(q);v.mount("#app");
