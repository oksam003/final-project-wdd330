(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();async function f(){const s=d("/partials/header.html"),r=d("/partials/footer.html"),o=document.getElementById("main-header"),n=document.getElementById("main-footer");c(s,o),c(r,n)}async function c(s,r,o,n,e="afterbegin",t=!0){t&&(r.innerHTML="");const i=await s(o);r.insertAdjacentHTML(e,i),n&&n(o)}function d(s){return async function(){const r=await fetch(s);if(r.ok)return await r.text()}}async function u(s,r,o,n,e){const t=new Headers;t.append("X-eBirdApiToken","j3ujg9aifboj");const i={method:"GET",headers:t,redirect:"follow"};try{return await(await fetch(`https://api.ebird.org/v2/data/obs/US-${s}/historic/${n}/${o}/${r}?maxResults=${e}`,i)).json()}catch(a){return console.log("Error fetching bird data:",a),[]}}export{u as g,f as l};
