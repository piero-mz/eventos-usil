export interface Event {
  title: string;
  description: string;
  date: string;       // "YYYY-MM-DD"
  time: string;       // "HH:MM"
  type: "Presencial" | "Virtual" | "Hibrido";
  is_free: boolean;
  tags: string[];
  location?: string;          // opcional — presencial/hibrido
  meeting_url?: string;       // opcional — virtual/hibrido
  price?: string;             // opcional — solo si is_free es false
  registration_url?: string;  // opcional
  image_url?: string;         // opcional
  organizer?: string;         // opcional
}
