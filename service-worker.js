if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,s,n)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const o={uri:location.origin+r.slice(1)};return Promise.all(s.map(r=>{switch(r){case"exports":return i;case"module":return o;default:return e(r)}})).then(e=>{const r=n(...e);return i.default||(i.default=r),i})}))}}define("./service-worker.js",["./workbox-d9851aed"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"1.bundle.js",revision:"981108421232164d62352de5d4118370"},{url:"1.bundle.js.LICENSE.txt",revision:"b96564043ecfbdc3c5d85795b83ad692"},{url:"404.html",revision:"0f5c216da0d6b08bf43e22907a1d8b99"},{url:"bundle.js",revision:"29eff8847f1190a8f314dcb2892692d0"},{url:"icons/favicon-32x32.png",revision:"80986bb228b2c208b4338b12c5db427a"},{url:"icons/favicon-32x32.svg",revision:"e4c5096b86abee1242d15363b679efda"},{url:"icons/shortcut-192x192.png",revision:"6bb7ab097f441e3653bff4deebaaa5f7"},{url:"icons/shortcut-512x512.png",revision:"5223ece5a9eb58256a802885f6188305"},{url:"images/default_bg.jpg",revision:"9b7ea631ddb3103beee05cec006af20e"},{url:"images/loader.gif",revision:"69dad4bdf6e8163c136d4d7a98ac50e0"},{url:"images/rubygram.png",revision:"55a511681f9ac493ef58b2511d531d85"},{url:"index.html",revision:"4442d7a8bf36aaab57f732650546e126"},{url:"manifest.webmanifest",revision:"e713e701c2748dfc56fc6a9a7e82183f"}],{})}));
