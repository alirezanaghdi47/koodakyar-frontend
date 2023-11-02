import axios from "axios";

// @ts-ignore
export const sendArticle = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("type", data.type);
    formData.append("categoryId", data.categoryId);
    formData.append("date", data.date);
    formData.append("language", data.language);
    formData.append("authors", data.authors);
    formData.append("isbn", data.isbn);
    formData.append("description", data.description);
    formData.append("file", data.file);
    const requestHeader = {headers: {userId: data.userId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Article/sendArticle", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const editArticle = async (data) => {
    const requestBody = {
        isSuggested: data.isSuggested,
        isConfirmed: data.isConfirmed,
    };
    const requestHeader = {headers: {adminRole: data.adminRole, articleId: data.articleId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Article/editArticle", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const deleteArticle = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, articleId: data.articleId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Article/deleteArticle", null, requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllArticle = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Article/getAllArticle", requestHeader);
    return response.data;
}

// @ts-ignore
export const getSingleArticle = async (data) => {
    const requestHeader = {headers: {slug: data.slug}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Article/getSingleArticle", requestHeader);
    return response.data;
}

// @ts-ignore
export const getTypeArticle = async (data) => {
    const requestHeader = {headers: {type: data.type, limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Article/getTypeArticle", requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllTypeArticle = async (data) => {
    const requestHeader = {headers: {limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Article/getAllTypeArticle", requestHeader);
    return response.data;
}

// @ts-ignore
export const getSuggestionArticle = async (data) => {
    const requestHeader = {headers: {limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Article/getSuggestionArticle" , requestHeader);
    return response.data;
}
