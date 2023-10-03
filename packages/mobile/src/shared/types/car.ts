import { ISpecification } from './specification';

export interface ICar {
  id: string;
  title: string;
  description: string;
  price: string;
  specs: ISpecification;
  image: string;
}
