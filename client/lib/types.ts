export type bloodType = "a" | "a-" | "b" | "b-" | "ab" | "ab-" | "o" | "o-";
export type genderType = "male" | "female";

export type donationType = {
  isApproved: boolean;
  _id: string;
  patient: string;
  hospital: string;
  type?: bloodType;
  date: string;
};

export type userProps = {
  token: any;
  uid?: string;
  _id?: string;
  name?: string | null;
  email?: string | null;
  dob?: string;
  joined?: string;
  phone?: number;
  gender?: string;
  area?: string;
  type?: bloodType;
  isAvailable?: boolean;
  image?: string | null;
  donations?: donationType[] | null;
  lastDonation?: string | null;
};

export type donorType = {
  _id: string;
  name: string;
  area: string;
  dob: Date | string;
  type: bloodType;
  phone: number;
  donations?: donationType[];
  isAvailable: boolean;
  image?: string;
  lastDonation: string | null;
  joined: string;
  gender: genderType;
};

export type donorProfileType = {
  _id: string;
  name: string;
  type: bloodType;
  donations?: donationType[];
  isAvailable: boolean;
  image?: string;
  lastDonation: string | null;
  joined: string;
  phone: Number;
  gender: genderType;
  dob: Date | string;
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
  gender: genderType;
  area?: string;
};

export type roleType = "admin" | "dev" | "moderator" | "volunteer";
