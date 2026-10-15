# SEO PARA B2B – sitio + panel del blog

- `static/`: páginas del sitio (HTML). `content/blog/`: entradas del blog (las crea el panel). `build.js`: genera `dist/` (sin dependencias). `admin/`: panel Decap CMS en /admin.
- Netlify ejecuta `node build.js` y publica `dist/` (ver netlify.toml).

## Puesta en marcha
1. GitHub: crea el repositorio `AridaneGarcia/seoparab2b` (si usas otro nombre, cámbialo en `admin/config.yml`) y sube todo el contenido de esta carpeta.
2. Netlify: Add new site → Import from Git → elige el repositorio. Build command `node build.js`, publish `dist`.
3. Panel: crea una OAuth App en GitHub (Settings → Developer settings → OAuth Apps), con Homepage `https://seoparab2b.com` y Callback `https://api.netlify.com/auth/done`. En Netlify: Site configuration → Access & security → OAuth → Install provider → GitHub, con el Client ID y Secret.
4. Entra en https://seoparab2b.com/admin, inicia sesión con GitHub y publica entradas. Cada una se guarda en el repositorio y Netlify republica en ~1 minuto.
Si el inicio de sesión falla, revisa el callback y el Client ID/Secret.

## Notas
- Las entradas marcadas como Borrador no se publican.
- Las páginas de servicio, legales y la home se editan en `static/` (GitHub) o pidiéndoselo a Claude.
- El formulario usa Netlify Forms; añade el aviso a contacto@seoparab2b.com en Netlify → Forms.
