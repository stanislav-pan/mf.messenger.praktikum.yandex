export interface IUserRequest {
  id: number;
  firs_name: string;
  second_name: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface IUser {
  id: number;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ISelectableUser extends IUser {
  selected: boolean;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IChangeProfileRequest {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}
