export type SendWppCodeRequest = {
  phone: string;
};

export type ConfirmWppRequest = {
  phone: string;
  code: string;
};

export type SignInRequest = {
  phone: string;
  code: string;
};
