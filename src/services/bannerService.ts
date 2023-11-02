import axios from "axios";

// @ts-ignore
export const addBannerThumbnail = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    const requestHeader = {headers: {adminRole: data.adminRole}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Banner/addBannerThumbnail", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const addBanner = async (data) => {
    const requestBody = {
        place: data.place,
        source: data.source,
    };
    const requestHeader = {headers: {adminRole: data.adminRole, bannerId: data.bannerId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Banner/addBanner", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const editBannerThumbnail = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    const requestHeader = {headers: {adminRole: data.adminRole, bannerId: data.bannerId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Banner/editBannerThumbnail", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const editBanner = async (data) => {
    const requestBody = {
        place: data.place,
        source: data.source,
    };
    const requestHeader = {headers: {adminRole: data.adminRole, bannerId: data.bannerId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Banner/editBanner", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const deleteBanner = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, bannerId: data.bannerId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Banner/deleteBanner", null, requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllBanner = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole , limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Banner/getAllBanner", requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllHomeBanner = async (data) => {
    const requestHeader = {headers: {limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Banner/getAllHomeBanner" , requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllNewsBanner = async (data) => {
    const requestHeader = {headers: {limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Banner/getAllNewsBanner" , requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllConferenceBanner = async (data) => {
    const requestHeader = {headers: {limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Banner/getAllConferenceBanner" , requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllArticleBanner = async (data) => {
    const requestHeader = {headers: {limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Banner/getAllArticleBanner" , requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllGalleryBanner = async (data) => {
    const requestHeader = {headers: {limit: data.limit , offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Banner/getAllGalleryBanner" , requestHeader);
    return response.data;
}