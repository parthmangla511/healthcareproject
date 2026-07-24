export interface Doctor {
  name: string;
  profession: string;
  experience: number;
  qualification: string;
  clinic: string;
  address: string;
  phone: string;
  imageKey: string;
}

export interface Service {
  title: string;
  imageKey: string;
  doctors: Doctor[];
}