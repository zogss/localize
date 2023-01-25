import { RENT_STATUS } from '../enum/RENT_STATUS';

export interface ICarRental {
  id: string;
  rentedBy: string;
  status: RENT_STATUS;
  title: string;
  price: string;
  year: number;
  kmDrive: string;
  description: string;
  withdrawalDate: Date;
  devolutionDate: Date;
}
