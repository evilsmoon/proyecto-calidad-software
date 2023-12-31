

/* export interface User {
  _id:      string;
  email:    string;
  name:     string;
  access:    string;
} */

// Generated by https://quicktype.io

export interface User {
  _id:      string;
  name:     string;
  image:    string;
  phone:    string;
  ci:       string;
  email:    string;
  password: string;
  gender:   string;
  role:     string;
  address: {
    province :string;
    city :string;
    streetaddress :string;
    neighborhood :string;
    phone_number :string;
  }
}
