import { IBrand } from './brand';

export interface ISpecification {
  year: string;
  model: string;
  brand: IBrand;
  engineType: string;
  transition: string;
  color: string;
  doors: string;
  fuelType: 'gasoline' | 'alcohol' | 'flex' | 'diesel';
  condition: 'new' | 'used';
  chassisType:
    | 'SUV'
    | 'sedan'
    | 'hatchback'
    | 'pickup'
    | 'coupe'
    | 'convertible'
    | 'minivan'
    | 'stationWagon';
  driveType: 'manual' | 'automatic';
  kmDrive: number;
}
