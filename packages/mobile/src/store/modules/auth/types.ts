import { IUser } from "../../../shared/@types/IUser";
import { LOADING_STATUS } from "../../../shared/enum/LOADING_STATUS";

export type IAuthState = {
  readonly signed: boolean;
  readonly user?: IUser;
  readonly token?: string | null;
  readonly error?: boolean;
  readonly success?: boolean;
  readonly loading?: LOADING_STATUS;
};
