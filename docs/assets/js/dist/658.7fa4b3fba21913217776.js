"use strict";(self.webpackChunktodo_pwa=self.webpackChunktodo_pwa||[]).push([[658],{658:function(e,o,t){t.r(o);const n=document.querySelector(".accordion"),c=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>({behavior:c?"auto":"smooth",block:"center"});function r(e,o){document.querySelector(`[data-bs-target="${e}"]`)&&function(e,o){const t=n.querySelector(e),c=o.getOrCreateInstance(t,{toggle:!1});window.location.search?function(e,o,t){const n=e.replace(/\?id=/,"#"),c=document.querySelector(o),r=c.querySelector(n)?c.querySelector(n):c;c.addEventListener("shown.bs.collapse",(()=>{r.scrollIntoView(a())})),t.show()}(window.location.search,e,c):(c.show(),t.scrollIntoView(a()))}(e,o)}o.default=function(e){window.location.hash&&r(window.location.hash,e),window.addEventListener("hashchange",(o=>{r(window.location.hash,e)}))}}}]);