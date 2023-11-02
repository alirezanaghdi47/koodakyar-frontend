import axios from "axios";

// @ts-ignore
export const register = async (data) => {
    const requestBody = {userName: data.userName, email: data.email, password: data.password};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Users/register", requestBody);
    return response.data;
}

// @ts-ignore
export const login = async (data) => {
    const requestBody = {userName: data.userName, password: data.password};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Users/login", requestBody);
    return response.data;
}

// @ts-ignore
export const editPassword = async (data) => {
    const requestBody = {currentPassword: data.currentPassword, newPassword: data.newPassword};
    const requestHeader = {headers: {userId: data.userId}}
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Users/editPassword", requestBody , requestHeader);
    return response.data;
}

// @ts-ignore
export const editUser = async (data) => {
    const requestBody = {role: data.role , isActive: data.isActive};
    const requestHeader = {headers: {adminRole: data.adminRole , userId: data.userId}}
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Users/editUser", requestBody , requestHeader);
    return response.data;
}

// @ts-ignore
export const editProfile = async (data) => {
    const formData = new FormData();
    formData.append("avatar" , data.avatar);
    formData.append("firstName" , data.firstName);
    formData.append("lastName" , data.lastName);
    formData.append("email" , data.email);
    formData.append("phoneNumber" , data.phoneNumber);
    const requestHeader = {headers: {adminRole: data.adminRole ,userId: data.userId}}
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Users/editProfile", formData , requestHeader);
    return response.data;
}

// @ts-ignore
// export const deleteAvatar = async (data) => {
//     const requestHeader = {headers: {adminRole: data.adminRole , userId: data.userId}};
//     const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Users/deleteAvatar", null, requestHeader);
//     return response.data;
// }

// @ts-ignore
export const deleteUser = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole , userId: data.userId}}
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Users/deleteUser", null , requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllUser = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Users/getAllUser", requestHeader);
    return response.data;
}