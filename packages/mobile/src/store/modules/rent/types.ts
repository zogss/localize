import { ICarRental } from '../../../shared/types/ICarRental';

export type IRentState = {
  rent: {
    car: ICarRental;
  }[];
};
