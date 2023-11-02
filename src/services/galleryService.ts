import axios from "axios";

// @ts-ignore
export const sendGalleryThumbnail = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    const requestHeader = {headers: {userId: data.userId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Gallery/sendGalleryThumbnail", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const sendGalleryFile = async (data) => {
    const formData = new FormData();
    for (let i = 0; i < data?.files.length; i++) {
        formData.append("files", data.files[i]);
    }
    const requestHeader = {headers: {role: data.role, galleryId: data.galleryId, type: data.type}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Gallery/sendGalleryFile", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const sendGallery = async (data) => {
    const requestBody = {
        title: data.title,
        slug: data.slug,
        type: data.type,
        categoryId: data.categoryId,
        author: data.author,
        place: data.place,
        date: data.date,
        source: data.source,
        isSuggested: data.isSuggested,
    };
    const requestHeader = {headers: {role: data.role, galleryId: data.galleryId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Gallery/sendGallery", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const sendGalleryDetail = async (data) => {
    const requestBody = {content: data.content};
    const requestHeader = {headers: {role: data.role, galleryId: data.galleryId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Gallery/sendGalleryDetail", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const editGallery = async (data) => {
    const requestBody = {
        isSuggested: data.isSuggested,
        isConfirmed: data.isConfirmed,
    };
    const requestHeader = {headers: {adminRole: data.adminRole, galleryId: data.galleryId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Gallery/editGallery", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const deleteGallery = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, galleryId: data.galleryId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Gallery/deleteGallery", null, requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllGallery = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Gallery/getAllGallery", requestHeader);
    return response.data;
}

// @ts-ignore
export const getSingleGallery = async (data) => {
    const requestHeader = {headers: {slug: data.slug}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Gallery/getSingleGallery", requestHeader);
    return response.data;
}

// @ts-ignore
export const getTypeGallery = async (data) => {
    const requestHeader = {headers: {type: data?.type, limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Gallery/getTypeGallery", requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllTypeGallery = async (data) => {
    const requestHeader = {headers: {limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Gallery/getAllTypeGallery", requestHeader);
    return response.data;
}

// @ts-ignore
export const getSuggestionGallery = async (data) => {
    const requestHeader = {headers: {limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Gallery/getSuggestionGallery" , requestHeader);
    return response.data;
}