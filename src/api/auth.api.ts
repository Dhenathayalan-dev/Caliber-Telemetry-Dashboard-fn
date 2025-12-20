import type { ILoginRes, ILogOutRes, IRegisterReq } from "../types/auth";
import API from "./api";

export const getProfile = () => API.get("/auth/profile");
export const login = (data: any): Promise<ILoginRes> => API.post("/auth/login", data);
export const logout = ():Promise<ILogOutRes> => API.post("/auth/logout");
export const registerUser = (data: IRegisterReq) => API.post("/auth/register", data);
