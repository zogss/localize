import { ICarRental } from '@app/shared/types/ICarRental';

export type RentState = {
  rent: {
    car: ICarRental;
  }[];
};
