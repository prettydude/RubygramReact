if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,c,s)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const f={uri:location.origin+r.slice(1)};return Promise.all(c.map(r=>{switch(r){case"exports":return i;case"module":return f;default:return e(r)}})).then(e=>{const r=s(...e);return i.default||(i.default=r),i})}))}}define("./service-worker.js",["./workbox-d9851aed"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"011728c439f3e40add3b0c9226854e51.ttf",revision:"011728c439f3e40add3b0c9226854e51"},{url:"1.bundle.js",revision:"82ccca33e78d207cb1396f9ae8cebfcd"},{url:"2.bundle.js",revision:"8cb96d5ed9f42be34e96103de68b74a4"},{url:"2.bundle.js.LICENSE.txt",revision:"c44c38e181ce96710b743746aac96dd8"},{url:"404.html",revision:"0f5c216da0d6b08bf43e22907a1d8b99"},{url:"466c22542820d2193b1a8f4133677580.svg",revision:"466c22542820d2193b1a8f4133677580"},{url:"744f2f668c7b70be6c8078c5aeae4ec8.woff",revision:"744f2f668c7b70be6c8078c5aeae4ec8"},{url:"9803264ef4b7b0f35d6e3a1ada1a23d8.eot",revision:"9803264ef4b7b0f35d6e3a1ada1a23d8"},{url:"bundle.js",revision:"3ff384fd4387fe3f6f90c7bba6b4c227"},{url:"fonts/tgico.eot",revision:"9803264ef4b7b0f35d6e3a1ada1a23d8"},{url:"fonts/tgico.svg",revision:"466c22542820d2193b1a8f4133677580"},{url:"fonts/tgico.ttf",revision:"011728c439f3e40add3b0c9226854e51"},{url:"fonts/tgico.woff",revision:"744f2f668c7b70be6c8078c5aeae4ec8"},{url:"icons/favicon-32x32.png",revision:"0b1b86af7e7422353622bae6e868c6f6"},{url:"icons/favicon-32x32.svg",revision:"395a6d99ace276bba5fab8ff8b6b777d"},{url:"icons/shortcut-192x192.png",revision:"820d1d472a0d73db581c84bec9f7f4d5"},{url:"icons/shortcut-512x512.png",revision:"aa391e2613ae983c12cdc933dde982a5"},{url:"images/default_bg.jpg",revision:"9b7ea631ddb3103beee05cec006af20e"},{url:"images/loader.gif",revision:"69dad4bdf6e8163c136d4d7a98ac50e0"},{url:"images/rubygram.png",revision:"55a511681f9ac493ef58b2511d531d85"},{url:"index.html",revision:"7bf08ee7138cc3e10267cb55970121c0"},{url:"manifest.webmanifest",revision:"e713e701c2748dfc56fc6a9a7e82183f"}],{})}));
