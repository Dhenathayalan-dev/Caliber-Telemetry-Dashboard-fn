export interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  createdAt: string;
}

export interface CreateUserReq {
  name: string;
  email: string;

}

export interface CreateUserRes {
  id: number;
  isCreated: boolean;
}

export interface UpdateUserRes {
  isUpdated: boolean;
}

export interface UpdateUserReq extends CreateUserReq {
  id: string
}

export interface DeleteUserReq {
  id: number;
}

export interface DeleteUserRes {
  isDeleted: boolean;
}