import { RENT_STATUS } from '@app/shared/enum/RENT_STATUS';
import { ICar } from '@app/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { RootState } from '../store';
import { RentState } from './rent.types';

const initialState: RentState = {
  rents: [
    {
      car: {
        id: '1',
        rentedBy: 'Rodrigo',
        status: RENT_STATUS.RENTED,
        title: 'Car 1',
        price: '$ 600,00',
        year: 2020,
        kmDrive: '1000',
        description: 'Car with 4 doors and 5 seats',
        withdrawalDate: DateTime.now().toISO() || '',
        devolutionDate: DateTime.now().toISO() || '',
      },
    },
    {
      car: {
        id: '2',
        rentedBy: 'Rodrigo',
        status: RENT_STATUS.AVAILABLE,
        title: 'Car 2',
        price: '$ 1600,00',
        year: 2020,
        kmDrive: '1000',
        description: 'Car with 4 doors and 5 seats',
        withdrawalDate: DateTime.now().toISO() || '',
        devolutionDate: DateTime.now().toISO() || '',
      },
    },
    {
      car: {
        id: '3',
        rentedBy: 'Rodrigo',
        status: RENT_STATUS.AVAILABLE,
        title: 'Car 3',
        price: '$ 800,00',
        year: 2020,
        kmDrive: '1000',
        description: 'Car with 4 doors and 5 seats',
        withdrawalDate: DateTime.now().toISO() || '',
        devolutionDate: DateTime.now().toISO() || '',
      },
    },
    {
      car: {
        id: '4',
        rentedBy: 'Rodrigo',
        status: RENT_STATUS.RENTED,
        title: 'Car 4',
        price: '$ 200,00',
        year: 2020,
        kmDrive: '1000',
        description: 'Car with 4 doors and 5 seats',
        withdrawalDate: DateTime.now().toISO() || '',
        devolutionDate: DateTime.now().toISO() || '',
      },
    },
    {
      car: {
        id: '5',
        rentedBy: 'Rodrigo',
        status: RENT_STATUS.RENTED,
        title: 'Car 5',
        price: '$ 1200,00',
        year: 2020,
        kmDrive: '1000',
        description: 'Car with 4 doors and 5 seats',
        withdrawalDate: DateTime.now().toISO() || '',
        devolutionDate: DateTime.now().toISO() || '',
      },
    },
    {
      car: {
        id: '6',
        rentedBy: 'Rodrigo',
        status: RENT_STATUS.AVAILABLE,
        title: 'Car 6',
        price: '$ 1200,00',
        year: 2020,
        kmDrive: '1000',
        description: 'Car with 4 doors and 5 seats',
        withdrawalDate: DateTime.now().toISO() || '',
        devolutionDate: DateTime.now().toISO() || '',
      },
    },
    {
      car: {
        id: '7',
        rentedBy: 'Rodrigo',
        status: RENT_STATUS.RENTED,
        title: 'Car 6',
        price: '$ 1200,00',
        year: 2020,
        kmDrive: '1000',
        description: 'Car with 4 doors and 5 seats',
        withdrawalDate: DateTime.now().toISO() || '',
        devolutionDate: DateTime.now().toISO() || '',
      },
    },
    {
      car: {
        id: '8',
        rentedBy: 'Rodrigo',
        status: RENT_STATUS.AVAILABLE,
        title: 'Car 6',
        price: '$ 1200,00',
        year: 2020,
        kmDrive: '1000',
        description: 'Car with 4 doors and 5 seats',
        withdrawalDate: DateTime.now().toISO() || '',
        devolutionDate: DateTime.now().toISO() || '',
      },
    },
  ],
};

export const rentSlice = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    onReset: () => ({ ...initialState }),
    createRent(state, action: PayloadAction<{ car: ICar }>) {
      state.rents = [
        ...state.rents,
        {
          car: action.payload.car,
        },
      ];
    },
    updateRent(state, action: PayloadAction<{ car: ICar }>) {
      const rentIndex = state.rents.findIndex(
        (rent) => rent.car!.id === action.payload.car.id,
      );
      state.rents[rentIndex] = {
        car: action.payload.car,
      };
    },
  },
});

export const selectRent = ({ rent }: RootState) => rent;
export const { createRent, updateRent } = rentSlice.actions;
