(function(){var K='sp_cookie_consent',D=document,GA_ID='';/* GA_ID: pega aquí tu ID real de GA4 (G-XXXXXXX) si añades analítica */
function get(){try{return JSON.parse(localStorage.getItem(K))}catch(e){return null}}
function save(c){try{localStorage.setItem(K,JSON.stringify(c))}catch(e){}}
function apply(c){if(!c)return;
if(c.fonts&&!D.getElementById('sp-gf')){var l=D.createElement('link');l.id='sp-gf';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=Figtree:wght@400;600&display=swap';D.head.appendChild(l)}
if(c.analytics&&GA_ID&&!D.getElementById('sp-ga')){var s=D.createElement('script');s.id='sp-ga';s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;D.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',GA_ID)}}
var st=D.createElement('style');st.textContent='#spck{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:50;max-width:620px;margin:0 auto;background:#0d1a3a;color:#f4f7ff;border:1px solid #2f6bff;border-radius:16px;padding:18px;font:15px/1.5 Figtree,system-ui,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.5)}#spck p{margin:0 0 12px;color:#c5d2f0}#spck a{color:#22d3ee}#spck .r{display:flex;gap:10px;flex-wrap:wrap}#spck button{font:600 15px Figtree,system-ui,sans-serif;padding:11px 16px;border-radius:10px;border:1px solid #2f6bff;background:transparent;color:#f4f7ff;cursor:pointer}#spck button.p{background:linear-gradient(135deg,#2f6bff,#22d3ee);border:0;color:#021022}#spck button:focus-visible{outline:3px solid #22d3ee;outline-offset:2px}#spck label{display:flex;gap:10px;margin:0 0 10px;color:#c5d2f0}#spck input{margin-top:4px}';D.head.appendChild(st);
function close(){var b=D.getElementById('spck');if(b)b.remove()}
function decide(c){save(c);apply(c);close()}
function open(cfg){close();var b=D.createElement('div');b.id='spck';b.setAttribute('role','dialog');b.setAttribute('aria-label','Preferencias de cookies');
var h=cfg?'<p><strong>Preferencias de cookies</strong></p><label><input type="checkbox" checked disabled><span>Necesarias: guardan tu elección sobre cookies. Siempre activas.</span></label><label><input type="checkbox" id="spf"'+((get()||{}).fonts?' checked':'')+'><span>Fuentes de Google: cargan la tipografía de la web desde servidores de Google. Si no las aceptas, se usa una tipografía del sistema.</span></label><div class="r"><button class="p" id="sps">Guardar preferencias</button><button id="spr">Rechazar todo</button></div>':'<p>Usamos solo lo imprescindible para recordar tu elección. Con tu permiso, también cargamos las fuentes de Google. Más información en la <a href="/politica-de-cookies/">política de cookies</a>.</p><div class="r"><button class="p" id="spa">Aceptar todo</button><button id="spr">Rechazar todo</button><button id="spc">Configurar</button></div>';
b.innerHTML=h;D.body.appendChild(b);var q=function(i){return D.getElementById(i)};
if(q('spa'))q('spa').onclick=function(){decide({fonts:true,analytics:true,t:Date.now()})};
q('spr').onclick=function(){decide({fonts:false,analytics:false,t:Date.now()})};
if(q('spc'))q('spc').onclick=function(){open(true)};
if(q('sps'))q('sps').onclick=function(){decide({fonts:q('spf').checked,analytics:false,t:Date.now()})};
var f=b.querySelector('button.p');if(f)f.focus()}
D.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-ck]');if(a){e.preventDefault();open(true)}});
var c=get();if(c)apply(c);else if(D.readyState!='loading')open(false);else D.addEventListener('DOMContentLoaded',function(){open(false)})})();
