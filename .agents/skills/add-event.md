# Skill: Agregar Evento

## Descripción
Procesa Issues con el label `evento` y agrega el nuevo evento al archivo `app/data/events.ts`.

## Cuándo usar este skill
Cuando un Issue tenga el label `evento` y haya sido creado con el template "Agregar Evento".

## Campos obligatorios y opcionales

Obligatorios (sin estos no crear el PR):
- title, description, date, time, type, is_free, tags

Opcionales (omitir del objeto si están vacíos o dicen "No response"):
- location, meeting_url, price, registration_url, image_url, organizer

## Pasos

### 1. Leer el Issue
- **Título del Issue** → `title` (ignorar el prefijo [EVENTO])
- **Descripción** → `description`
- **Fecha** → `date` (formato YYYY-MM-DD)
- **Hora** → `time` (formato HH:MM)
- **Lugar** → `location` (OPCIONAL)
- **Link de la reunion** → `meeting_url` (OPCIONAL)
- **Modalidad** → `type` ("Presencial", "Virtual" o "Hibrido")
- **Es gratuito?** → `is_free` (true si dice "Si, es gratuito")
- **Precio** → `price` (OPCIONAL, solo si is_free es false)
- **URL de registro** → `registration_url` (OPCIONAL)
- **Imagen del evento** → `image_url` (OPCIONAL — si contiene markdown ![...](url), extraer solo la URL)
- **Temas del evento** → `tags`
- **Organizador** → `organizer` (OPCIONAL)

### 2. Convertir los tags
- "Ingenieria de Sistemas" → `"sistemas"`
- "Ingenieria de Software" → `"software"`
- "Ciberseguridad" → `"ciberseguridad"`
- "Inteligencia Artificial" → `"ia"`
- "Cloud Computing" → `"cloud"`
- "Redes y Telecomunicaciones" → `"redes"`
- "DevOps" → `"devops"`
- "Desarrollo Web" → `"web"`
- "Desarrollo Movil" → `"mobile"`
- "Data Science" → `"data-science"`

### 3. Construir el objeto evento
Incluir solo los campos que tienen valor:
```typescript
{
  title: "...",
  description: "...",
  date: "YYYY-MM-DD",
  time: "HH:MM",
  type: "Presencial" | "Virtual" | "Hibrido",
  is_free: true | false,
  tags: ["tag1", "tag2"],
  // opcionales — incluir solo si tienen valor:
  location: "...",
  meeting_url: "https://...",
  price: "S/ XX",
  registration_url: "https://...",
  image_url: "https://...",
  organizer: "...",
}
```

### 4. Actualizar `app/data/events.ts`
- Agregar el evento al array `events`
- Mantener ordenado por fecha ascendente
- Respetar formato e indentación existente

### 5. Crear el Pull Request
- Branch: `evento/[slug-del-titulo]`
- Título: `feat: agregar evento "[título]"`

## Reglas importantes
- No modificar ningún otro archivo
- Si un campo opcional está vacío o dice "No response", simplemente omitirlo
- Solo detener el proceso si falta un campo OBLIGATORIO
- Si la fecha tiene formato incorrecto, corregirla a YYYY-MM-DD
- Si una URL no empieza con https://, agregarle el prefijo
- Para image_url: si el valor contiene markdown tipo ![texto](url), extraer solo la URL
