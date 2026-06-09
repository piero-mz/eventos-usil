export interface Event {
  title: string;
  description: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
  location: string;
  type: "Presencial" | "Virtual" | "Híbrido";
  is_free: boolean;
  price?: string; // ej. "S/ 30" — solo si is_free es false
  registration_url: string;
  tags: string[];
  organizer?: string;
  image_url?: string;
}
