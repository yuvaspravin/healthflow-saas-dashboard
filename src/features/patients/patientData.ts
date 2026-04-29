import type { Patient } from "../../types/patient";

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    age: 45,
    gender: "Male",
    diagnosis: "Hypertension",
    lastVisit: "2024-03-15",
    status: "Stable",
    email: "john.doe@email.com",
    phone: "+1 234-567-8901",
  },
  {
    id: "2",
    name: "Sarah Smith",
    age: 32,
    gender: "Female",
    diagnosis: "Type 2 Diabetes",
    lastVisit: "2024-03-20",
    status: "Recovering",
    email: "sarah.s@email.com",
    phone: "+1 234-567-8902",
  },
  {
    id: "3",
    name: "Robert Brown",
    age: 68,
    gender: "Male",
    diagnosis: "Acute Bronchitis",
    lastVisit: "2024-03-21",
    status: "Critical",
    email: "r.brown@email.com",
    phone: "+1 234-567-8903",
  },
];
