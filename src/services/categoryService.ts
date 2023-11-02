import axios from "axios";

// @ts-ignore
export const addCategoryThumbnail = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    const requestHeader = {headers: {adminRole: data.adminRole}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Category/addCategoryThumbnail", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const addCategory = async (data) => {
    const requestBody = {
        title: data.title,
        slug: data.slug,
        type: data.type,
    };
    const requestHeader = {headers: {adminRole: data.adminRole, categoryId: data.categoryId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Category/addCategory", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const editCategoryThumbnail = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    const requestHeader = {headers: {adminRole: data.adminRole, categoryId: data.categoryId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Category/editCategoryThumbnail", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const editCategory = async (data) => {
    const requestBody = {
        title: data.title,
        slug: data.slug,
        type: data.type,
    };
    const requestHeader = {headers: {adminRole: data.adminRole, categoryId: data.categoryId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Category/editCategory", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const deleteCategory = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, categoryId: data.categoryId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Category/deleteCategory", null, requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllCategory = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, type: data.type , limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Category/getAllCategory", requestHeader);
    return response.data;
}