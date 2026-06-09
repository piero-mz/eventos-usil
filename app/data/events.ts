import { Event } from "../types/event";

// ⚠️ NO EDITAR MANUALMENTE — los eventos se agregan via GitHub Issues
// Para publicar un evento: https://github.com/TU-USUARIO/eventos-usil/issues/new/choose

export const events: Event[] = [
  {
    title: "Introducción a la Ciberseguridad Ofensiva",
    description:
      "Charla sobre técnicas de ethical hacking, pentesting y cómo proteger sistemas contra vulnerabilidades comunes. Dictada por profesionales de la industria.",
    date: "2026-07-18",
    time: "18:00",
    location: "Auditorio Principal — Sede Miraflores",
    type: "Presencial",
    is_free: true,
    registration_url: "https://forms.gle/example",
    tags: ["ciberseguridad", "ethical-hacking", "pentesting"],
    organizer: "Facultad de Ingeniería",
  },
  {
    title: "Workshop: APIs REST con Node.js y Express",
    description:
      "Taller práctico para construir APIs modernas con Node.js, Express y buenas prácticas de arquitectura. Trae tu laptop.",
    date: "2026-07-25",
    time: "15:00",
    location: "Lab de Cómputo 3 — Sede La Molina",
    type: "Presencial",
    is_free: false,
    price: "S/ 20",
    registration_url: "https://forms.gle/example2",
    tags: ["software", "nodejs", "apis", "web"],
    organizer: "Club de Desarrollo USIL",
  },
  {
    title: "IA en Ingeniería de Sistemas: casos reales",
    description:
      "Conferencia sobre cómo la inteligencia artificial está transformando la gestión de sistemas y los procesos empresariales en Perú.",
    date: "2026-08-06",
    time: "19:00",
    location: "Online — Zoom",
    type: "Virtual",
    is_free: true,
    registration_url: "https://forms.gle/example3",
    tags: ["ia", "sistemas", "machine-learning"],
    organizer: "Decanato de Ingeniería",
  },
  {
    title: "Cloud Computing con AWS: de cero a producción",
    description:
      "Aprende a desplegar aplicaciones en la nube usando AWS. Veremos EC2, S3, Lambda y buenas prácticas de costos.",
    date: "2026-08-20",
    time: "17:00",
    location: "Auditorio B — Sede Miraflores",
    type: "Híbrido",
    is_free: false,
    price: "S/ 30",
    registration_url: "https://forms.gle/example4",
    tags: ["cloud", "aws", "devops"],
    organizer: "Facultad de Ingeniería",
  },
];
