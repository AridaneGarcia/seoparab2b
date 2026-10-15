// Generador del sitio: copia /static, crea el blog desde /content/blog y añade /admin. Sin dependencias.
const fs=require('fs'),path=require('path');
const D='https://seoparab2b.com',root=__dirname,dist=path.join(root,'dist');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function cp(a,b){fs.mkdirSync(b,{recursive:true});for(const f of fs.readdirSync(a)){const s=path.join(a,f),d=path.join(b,f);fs.statSync(s).isDirectory()?cp(s,d):fs.copyFileSync(s,d)}}
function parse(raw){raw=raw.replace(/\r\n/g,'\n');const m=raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);if(!m)return{data:{},body:raw};
const data={},L=m[1].split('\n');
for(let i=0;i<L.length;i++){const k=L[i].match(/^([A-Za-z_]+):\s*(.*)$/);if(!k)continue;let v=k[2].trim();
if(/^[>|][-+]?$/.test(v)){const b=[];while(i+1<L.length&&(/^\s+/.test(L[i+1])||L[i+1]==='')){i++;b.push(L[i].trim())}v=b.filter(Boolean).join(' ')}
else if(/^".*"$/.test(v))v=v.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');
else if(/^'.*'$/.test(v))v=v.slice(1,-1).replace(/''/g,"'");
data[k[1]]=v}
return{data,body:m[2]}}
const safe=u=>/^(https?:\/\/|\/|#|mailto:)/i.test(u.trim());
function inline(t){t=esc(t);
t=t.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,(m,a,u)=>safe(u)?`<img src="${u}" alt="${a}" loading="lazy">`:'');
t=t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,a,u)=>safe(u)?`<a href="${u}"${/^https?:/i.test(u)?' rel="noopener"':''}>${a}</a>`:a);
return t.replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/(^|[^*])\*([^*\n]+)\*/g,'$1<em>$2</em>')}
const LI=/^\s*([-*+]|\d+\.)\s+/;
function md(src){const L=src.replace(/\r\n/g,'\n').split('\n'),out=[];let i=0;
while(i<L.length){const l=L[i];let m;
if(/^```/.test(l)){const b=[];i++;while(i<L.length&&!/^```/.test(L[i]))b.push(L[i++]);i++;out.push('<pre><code>'+esc(b.join('\n'))+'</code></pre>');continue}
if(!l.trim()){i++;continue}
if(m=l.match(/^(#{1,4})\s+(.*)$/)){const n=Math.max(2,m[1].length);out.push(`<h${n}>${inline(m[2])}</h${n}>`);i++;continue}
if(/^(-{3,}|\*{3,})\s*$/.test(l)){out.push('<hr>');i++;continue}
if(/^>\s?/.test(l)){const b=[];while(i<L.length&&/^>\s?/.test(L[i]))b.push(L[i++].replace(/^>\s?/,''));out.push('<blockquote>'+inline(b.join(' '))+'</blockquote>');continue}
if(LI.test(l)){const ol=/^\s*\d+\./.test(l),b=[];while(i<L.length&&LI.test(L[i]))b.push('<li>'+inline(L[i++].replace(LI,''))+'</li>');out.push(ol?`<ol>${b.join('')}</ol>`:`<ul>${b.join('')}</ul>`);continue}
const b=[];while(i<L.length&&L[i].trim()&&!/^(#{1,4}\s|```|>\s?|-{3,}\s*$)/.test(L[i])&&!LI.test(L[i]))b.push(L[i++]);
if(!b.length)b.push(L[i++]);out.push('<p>'+inline(b.join(' '))+'</p>')}
return out.join('\n')}
const fmt=d=>new Date(d+'T00:00:00Z').toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
fs.rmSync(dist,{recursive:true,force:true});cp(path.join(root,'static'),dist);cp(path.join(root,'admin'),path.join(dist,'admin'));
const layout=fs.readFileSync(path.join(root,'templates/layout.html'),'utf8');
const render=o=>layout.replace(/\{\{(\w+)\}\}/g,(m,k)=>o[k]!==undefined?o[k]:'');
const dir=path.join(root,'content/blog');let posts=[];
if(fs.existsSync(dir))for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.md'))){
const{data,body}=parse(fs.readFileSync(path.join(dir,f),'utf8'));
if(String(data.draft)==='true'||!data.title)continue;
const slug=f.replace(/\.md$/,'').toLowerCase().replace(/[^a-z0-9-]/g,'-');
const date=(String(data.date||'').match(/^\d{4}-\d{2}-\d{2}/)||[new Date().toISOString().slice(0,10)])[0];
posts.push({slug,title:data.title,description:data.description||'',image:data.image||'',date,body})}
posts.sort((a,b)=>b.date.localeCompare(a.date));
const abs=u=>/^https?:/.test(u)?u:D+u;
for(const p of posts){const url=`${D}/blog/${p.slug}/`,img=p.image?abs(p.image):D+'/og-image.png';
const ld=JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.description,datePublished:p.date,image:img,mainEntityOfPage:url,author:{'@type':'Person',name:'Aridane García Ruiz'},publisher:{'@type':'Organization',name:'SEO PARA B2B'}}).replace(/</g,'\\u003c');
const body=`<style>.post{max-width:760px}.post h2{font-size:1.5rem;margin-top:1.7em}.post p,.post li{color:#c5d2f0;max-width:72ch}.post a{color:var(--cy)}.post img{max-width:100%;height:auto;border-radius:12px}.post blockquote{border-left:3px solid var(--blue);margin:1em 0;padding-left:16px;color:var(--mu)}.post code{background:var(--card);padding:2px 6px;border-radius:6px}.post pre{overflow-x:auto;background:var(--card);padding:14px;border-radius:10px}</style><section><div class="w post"><p class="note"><a href="/">Inicio</a> / <a href="/blog/">Blog</a> / ${esc(p.title)}</p><h1>${esc(p.title)}</h1><p>${fmt(p.date)} · Aridane García Ruiz</p>${p.image?`<img src="${esc(p.image)}" alt="" style="width:100%;margin:12px 0 24px">`:''}${md(p.body)}<div class="card" style="margin-top:40px"><h3>¿Quieres saber cómo está tu sistema de captación?</h3><p style="margin-bottom:16px">Haz el diagnóstico orientativo en cuatro preguntas.</p><a class="btn p" href="/diagnostico-captacion-b2b/">Evaluar mi captación B2B</a></div></div></section>`;
fs.mkdirSync(path.join(dist,'blog',p.slug),{recursive:true});
fs.writeFileSync(path.join(dist,'blog',p.slug,'index.html'),render({title:esc(p.title),description:esc(p.description),url,ogtype:'article',image:esc(img),body,head_extra:`<script type="application/ld+json">${ld}</script>`}))}
const list=posts.length?`<div class="grid">${posts.map(p=>`<a class="card" href="/blog/${p.slug}/" style="text-decoration:none"><h3>${esc(p.title)}</h3><p style="margin-bottom:8px">${fmt(p.date)}</p><p>${esc(p.description)}</p></a>`).join('')}</div>`:'<p class="sub">Espacio editorial en desarrollo. Los primeros artículos sobre SEO B2B, LinkedIn, leads y autoridad digital se publicarán aquí.</p><a class="btn p" href="/diagnostico-captacion-b2b/">Evaluar mi captación B2B</a>';
fs.mkdirSync(path.join(dist,'blog'),{recursive:true});
fs.writeFileSync(path.join(dist,'blog','index.html'),render({title:'Blog y recursos',description:'Ideas para vender mejor en el entorno B2B: SEO, LinkedIn, leads y autoridad digital.',url:D+'/blog/',ogtype:'website',image:D+'/og-image.png',body:`<section><div class="w"><h1>Ideas para vender mejor en el entorno B2B</h1>${list}</div></section>`,head_extra:''}));
const sp=path.join(dist,'sitemap.xml');let sm=fs.readFileSync(sp,'utf8');
sm=sm.replace('</urlset>',posts.map(p=>`<url><loc>${D}/blog/${p.slug}/</loc><lastmod>${p.date}</lastmod></url>`).join('')+'</urlset>');fs.writeFileSync(sp,sm);
console.log(`Sitio generado en dist/ con ${posts.length} entrada(s) de blog.`);
