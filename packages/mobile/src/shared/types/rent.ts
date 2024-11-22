import { RENT_STATUS } from '../enum';
import { ICar } from './car';
import { ILocation } from './location';
import { ITimestamp } from './timestamp';
import { IUser } from './user';

export interface IRent extends ITimestamp {
  id: string;
  car: ICar;
  status: RENT_STATUS;
  withdrawalDate: string;
  devolutionDate: string;
  rentedBy: IUser;
  images: string[];
  location: ILocation;
  contact: string;
}

const teste: IRent = {
  id: '1',
  car: {
    id: '1',
    title: 'Car 1',
    description: 'Car with 4 doors and 5 seats',
    price: '120000',
    specs: {
      brand: {
        id: '1',
        name: 'Fiat',
        slug: 'fiat',
        image: 'https://i.imgur.com/0hj1aXZ.png',
      },
      model: 'Palio',
      year: '2020',
      engineType: '1.0',
      transition: 'Manual',
      color: 'Red',
      doors: '4',
      fuelType: 'gasoline',
      condition: 'new',
      chassisType: 'SUV',
      driveType: 'manual',
      kmDrive: 1000,
    },
    image: 'https://i.imgur.com/0hj1aXZ.png',
  },
  status: RENT_STATUS.AVAILABLE,
  withdrawalDate: '2021-01-01',
  devolutionDate: '2021-01-02',
  rentedBy: {
    id: '1',
    firstName: 'Rodrigo',
    lastName: 'Ferreira',
    email: 'dsad',
    phone: 'dsadsa',
    username: 'dsadsa',
    fullName: 'dsadsa',
    createdAt: 'dsadsa',
    updatedAt: 'dsadsa',
  },
  images: ['https://i.imgur.com/0hj1aXZ.png'],
  location: {
    country: 'dsadsa',
    state: 'dsadsa',
    city: 'dsadsa',
    street: 'dsadsa',
    number: 'dsadsa',
    zipCode: 'dsadsa',
  },
  contact: 'dsadsa',
  createdAt: 'dsadsa',
  updatedAt: 'dsadsa',
};
