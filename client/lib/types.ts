export type blood = "a" | "a-" | "b" | "b-" | "ab" | "ab-" | "o" | "o-";

export type donationType = {
  isApproved: boolean;
  _id: string;
  patient: string;
  hospital: string;
  type?: blood;
  date: string;
};

export type userProps = {
  _id: string;
  name: string;
  email?: string;
  dob?: string;
  joined: string;
  phone?: number;
  gender?: string;
  area?: string;
  type?: blood;
  isAvailable?: boolean;
  image?: string | null;
  donations: donationType[] | null;
  lastDonation?: string | null;
};

export type donorType = {
  _id: string;
  name: string;
  area: string;
  type: blood;
  phone: number;
  donations?: donationType[];
  isAvailable: boolean;
  image: string | null;
};

export type donorProfileType = {
  _id: string;
  name: string;
  type: blood;
  donations?: donationType[];
  isAvailable: boolean;
  image: string | null;
  lastDonation: string | null;
  joined: string;
  phone: Number;
  gender: "male" | "female";
  age: Number;
  area: string;
};

export type formValues = {
  name?: string;
  email?: string;
  password?: string;
  phone?: number;
  dob?: string;
  isAvailable?: boolean;
  image?: string | null;
  joined?: string;
  gender: "male" | "female";
  area?: string;
};

export type roleType = "admin" | "dev" | "moderator" | "volunteer";
