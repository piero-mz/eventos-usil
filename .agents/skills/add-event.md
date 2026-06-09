# Skill: Agregar Evento

## Descripción
Procesa Issues con el label `evento` y agrega el nuevo evento al archivo `app/data/events.ts`.

## Cuándo usar este skill
Cuando un Issue tenga el label `evento` y haya sido creado con el template "Agregar Evento".

## Pasos

### 1. Leer el Issue
Extrae estos campos del Issue:
- **Título del Issue** → `title` (leer directamente del título del Issue, ignorando el prefijo [EVENTO])
- **Descripción** → `description`
- **Fecha** → `date` (debe estar en formato `YYYY-MM-DD`)
- **Hora** → `time` (formato `HH:MM`)
- **Lugar** → `location`
- **Modalidad** → `type` (exactamente: `"Presencial"`, `"Virtual"` o `"Híbrido"`)
- **¿Es gratuito?** → `is_free` (`true` si dice "Sí, es gratuito", `false` si no)
- **Precio** → `price` (solo incluir si `is_free` es `false` y el campo no está vacío)
- **URL de registro** → `registration_url`
- **Temas del evento** → `tags` (array, ver conversión abajo)
- **Organizador** → `organizer` (solo incluir si no está vacío)

### 2. Convertir los tags
Convierte los temas seleccionados a kebab-case en minúsculas:
- "Ingeniería de Sistemas" → `"sistemas"`
- "Ingeniería de Software" → `"software"`
- "Ciberseguridad" → `"ciberseguridad"`
- "Inteligencia Artificial" → `"ia"`
- "Cloud Computing" → `"cloud"`
- "Redes y Telecomunicaciones" → `"redes"`
- "DevOps" → `"devops"`
- "Desarrollo Web" → `"web"`
- "Desarrollo Móvil" → `"mobile"`
- "Data Science" → `"data-science"`

### 3. Construir el objeto evento
```typescript
{
  title: "...",
  description: "...",
  date: "YYYY-MM-DD",
  time: "HH:MM",
  location: "...",
  type: "Presencial" | "Virtual" | "Híbrido",
  is_free: true | false,
  price: "S/ XX",         // solo si is_free es false
  registration_url: "https://...",
  tags: ["tag1", "tag2"],
  organizer: "...",       // solo si fue proporcionado
}
```

### 4. Actualizar `app/data/events.ts`
- Abre el archivo `app/data/events.ts`
- Agrega el nuevo evento al array `events`
- Mantén el array ordenado por fecha de más próxima a más lejana (ascendente)
- Respeta el formato y la indentación existente

### 5. Crear el Pull Request
- Branch name: `evento/[slug-del-titulo]` (ej. `evento/workshop-docker-principiantes`)
- Título del PR: `feat: agregar evento "[título del evento]"`
- Descripción del PR:
  ```
  Agrega el evento propuesto en el Issue #[número].
  
  - Título: [título]
  - Fecha: [fecha] a las [hora]
  - Modalidad: [tipo]
  - Costo: [Gratuito / precio]
  ```

## Reglas importantes
- No modificar ningún otro archivo
- Si la fecha tiene un formato incorrecto, intentar corregirla a `YYYY-MM-DD`
- Si la URL de registro no empieza con `https://`, agregarle el prefijo
- Si algún campo requerido está vacío, dejar un comentario en el Issue solicitando la información faltante y no crear el PR
