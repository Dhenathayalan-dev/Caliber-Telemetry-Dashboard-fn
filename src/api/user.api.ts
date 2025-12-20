import API from "./api";
import type { DeleteUserReq, UpdateUserReq, UpdateUserRes, User } from "../types/user";


export const getUsers = async (): Promise<User[]> => {
    const res = await API.get("/users/get");
    return res.data.data;
};

export const createUser = async (data: {
    name: string;
    email: string;
}) => {
    return await API.post("/user/create", data);
};

export const updateUser = async (data: UpdateUserReq): Promise<UpdateUserRes> => API.post("/user/update", data);

export const deleteUser = async (data: DeleteUserReq) => {
    return API.post("/user/delete", data);
};
