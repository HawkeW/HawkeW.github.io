export type Introduction = {
  name: string,
  phone: string
  'e-mail': string;
  certificates: string[]
  education: string
  base: string
}

export type WorkExperience = {
  company: string;
  startTime: string;
  endTime: string;
  role: string;
  descriptions: string[];
}

export type ProjectExperience = {
  startTime: string;
  endTime: string;
  name: string;
  role: string;
  descriptions: string[];
}