import {IRent} from '@app/shared';

export type RentState = {
  rents: Pick<IRent, 'car'>[];
};
