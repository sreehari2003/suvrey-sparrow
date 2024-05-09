export interface Data {
  name: string | null;
  email: string | null;
  number: string | null;
  address: string | null;
  cvv: string | null;
  cardNumber: string | null;
  expiryDate: Date | null;
}

export { One } from "./One";
export { Two } from "./Two";
export { Three } from "./Three";

export interface StepProps {
  handleData: (data: Partial<Data>) => void;
  setData?: React.Dispatch<number>;
  activeStep?: number;
  data?: Data;
}
