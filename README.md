# eventos-usil

Directorio de eventos tech de la Universidad San Ignacio de Loyola — conferencias, talleres y charlas de Sistemas, Software, Ciberseguridad, IA y más.

## 📅 Publicar un evento

¡No necesitas saber programar! Solo necesitas una cuenta de GitHub:

1. Ve a [Issues → New Issue](../../issues/new/choose)
2. Selecciona **"Agregar Evento"**
3. Completa el formulario
4. Un mantenedor revisará y publicará el evento

## 🛠️ Tecnologías

- [Next.js 15](https://nextjs.org/) — framework web
- [React 19](https://react.dev/) — UI
- [Tailwind CSS](https://tailwindcss.com/) — estilos
- [TypeScript](https://www.typescriptlang.org/) — tipado
- [Vercel](https://vercel.com/) — hosting automático

## 💻 Desarrollo local

```bash
git clone https://github.com/TU-USUARIO/eventos-usil.git
cd eventos-usil
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🤖 Automatización con Jules

Este repo usa [Jules](https://jules.google.com/) para automatizar la publicación de eventos:

1. Alguien crea un Issue con el formulario de evento
2. Jules lee el Issue y genera el código para agregarlo
3. Jules abre un Pull Request automáticamente
4. El mantenedor revisa y aprueba el PR
5. Vercel despliega el sitio actualizado

## 📁 Estructura del proyecto

```
eventos-usil/
├── app/
│   ├── data/
│   │   └── events.ts        ← aquí viven los eventos
│   ├── types/
│   │   └── event.ts         ← estructura de un evento
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── .agents/
│   └── skills/
│       └── add-event.md     ← instrucciones para Jules
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── add-event.yml    ← formulario de Issues
└── ...
```

## Licencia

MIT
