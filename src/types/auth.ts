export interface ILoginRes {
    isSuccess: boolean;
    isEmailVerified: boolean;
    authorization: boolean;
    loginDetails: {
        name: string | null;
        email: string;
        role: number;
    };
}


export interface IRegisterReq {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export interface IRegisterRes {
  isSuccess: boolean;
  message: string;
}
export interface errRegister {
    isSuccess: boolean,
    error: string
    
} 
export interface errorResponseData {
    data: errRegister
}
export interface errorResponse {
    response: errorResponseData
}

export const UserRoleId = {
  Admin: 1,
  User: 2,
} as const;

export type UserRoleId = typeof UserRoleId[keyof typeof UserRoleId];

export interface ILogOutRes {
    isLogOut: boolean;
}

export interface ProfileDetailRes {
  id: number;
  name: string;
  roleId: number;
  email: string;
  createdAt: string;
}