export type Level = "Basic" | "Intermedium" | "Higth" | "Native";

export interface Timezone {
  utc: string;
  zone: string;
  country: string;
}

export interface JobExperiences {
  company: string;
  startDate: string;
  finishDate: string | null;
  role: string;
  description: string;
}
