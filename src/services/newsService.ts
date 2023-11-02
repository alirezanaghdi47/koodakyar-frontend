import axios from "axios";

// @ts-ignore
export const addNewsThumbnail = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    const requestHeader = {headers: {adminRole: data.adminRole , userId: data.userId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/News/addNewsThumbnail", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const addNews = async (data) => {
    const requestBody = {
        title: data.title,
        slug: data.slug,
        type: data.type,
        place: data.place,
        categoryId: data.categoryId,
        isSuggested: data.isSuggested,
        source: data.source
    };
    const requestHeader = {headers: {adminRole: data.adminRole, newsId: data.newsId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/News/addNews", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const addNewsDetail = async (data) => {
    const requestBody = {content: data.content};
    const requestHeader = {headers: {adminRole: data.adminRole, newsId: data.newsId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/News/addNewsDetail", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const editNewsThumbnail = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    const requestHeader = {headers: {adminRole: data.adminRole, newsId: data.newsId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/News/editNewsThumbnail", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const editNews = async (data) => {
    const requestBody = {
        title: data.title,
        slug: data.slug,
        type: data.type,
        place: data.place,
        categoryId: data.categoryId,
        isSuggested: data.isSuggested,
        source: data.source
    };
    const requestHeader = {headers: {adminRole: data.adminRole, newsId: data.newsId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/News/editNews", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const editNewsDetail = async (data) => {
    const requestBody = {content: data.content};
    const requestHeader = {headers: {adminRole: data.adminRole, newsId: data.newsId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/News/editNewsDetail", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const deleteNews = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, newsId: data.newsId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/News/deleteNews", null, requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllNews = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/News/getAllNews", requestHeader);
    return response.data;
}

// @ts-ignore
export const getSingleNews = async (data) => {
    const requestHeader = {headers: {slug: data.slug}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/News/getSingleNews", requestHeader);
    return response.data;
}

// @ts-ignore
export const getTypeNews = async (data) => {
    const requestHeader = {headers: {type: data?.type, limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/News/getTypeNews", requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllTypeNews = async (data) => {
    const requestHeader = {headers: {limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/News/getAllTypeNews", requestHeader);
    return response.data;
}

// @ts-ignore
export const getSuggestionNews = async (data) => {
    const requestHeader = {headers: {limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/News/getSuggestionNews" , requestHeader);
    return response.data;
}
