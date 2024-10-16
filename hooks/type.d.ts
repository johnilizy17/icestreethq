type UserDetailsProp = {
  user: {
    email: string;
    firstname: string;
    lastname: string;
    order: number;
    phone: string;
    referrals: any[]; // or you can replace `any[]` with a more specific type if possible
    role: string;
    status: string;
    _id: string
  };
  email: string;
  firstname: string;
  lastname: string;
  order: number;
  phone: string;
  referrals: any[]; // or you can replace `any[]` with a more specific type if possible
  role: string;
  status: string;
  _id: string

}
