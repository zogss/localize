import {RENT_STATUS} from '../enum';
import {ISpecification} from './specification';

export interface ICar {
  id: string;
  rentedBy?: string;
  status?: RENT_STATUS;
  year?: number;
  kmDrive?: string;
  withdrawalDate?: string;
  devolutionDate?: string;
  title: string;
  description: string;
  price: string;
  specs?: ISpecification;
  image?: string;
}
