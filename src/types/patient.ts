export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  diagnosis: string;
  lastVisit: string;
  status: "Stable" | "Critical" | "Recovering";
  email: string;
  phone: string;
}

export type ViewMode = "grid" | "list";
