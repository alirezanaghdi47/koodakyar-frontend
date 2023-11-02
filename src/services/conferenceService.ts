import axios from "axios";

// @ts-ignore
export const addConferenceThumbnail = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    const requestHeader = {headers: {adminRole: data.adminRole}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Conference/addConferenceThumbnail", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const addConference = async (data) => {
    const requestBody = {
        title: data.title,
        slug: data.slug,
        type: data.type,
        categoryId: data.categoryId,
        place: data.place,
        date: data.date,
        time: data.time
    };
    const requestHeader = {headers: {adminRole: data.adminRole, conferenceId: data.conferenceId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Conference/addConference", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const addConferenceDetail = async (data) => {
    const requestBody = {content: data.content};
    const requestHeader = {headers: {adminRole: data.adminRole, conferenceId: data.conferenceId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Conference/addConferenceDetail", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const editConferenceThumbnail = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    const requestHeader = {headers: {adminRole: data.adminRole, conferenceId: data.conferenceId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Conference/editConferenceThumbnail", formData, requestHeader);
    return response.data;
}

// @ts-ignore
export const editConference = async (data) => {
    const requestBody = {
        title: data.title,
        slug: data.slug,
        type: data.type,
        categoryId: data.categoryId,
        place: data.place,
        date: data.date,
        time: data.time
    };
    const requestHeader = {headers: {adminRole: data.adminRole, conferenceId: data.conferenceId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Conference/editConference", requestBody, requestHeader);
    return response.data;
}


// @ts-ignore
export const editConferenceDetail = async (data) => {
    const requestBody = {content: data.content};
    const requestHeader = {headers: {adminRole: data.adminRole, conferenceId: data.conferenceId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Conference/editConferenceDetail", requestBody, requestHeader);
    return response.data;
}

// @ts-ignore
export const deleteConference = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, conferenceId: data.conferenceId}};
    const response = await axios.post(process.env.NEXT_PUBLIC_API + "/Conference/deleteConference", null, requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllConference = async (data) => {
    const requestHeader = {headers: {adminRole: data.adminRole, limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Conference/getAllConference", requestHeader);
    return response.data;
}

// @ts-ignore
export const getSingleConference = async (data) => {
    const requestHeader = {headers: {slug: data.slug}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Conference/getSingleConference", requestHeader);
    return response.data;
}

// @ts-ignore
export const getFutureConference = async (data) => {
    const requestHeader = {headers: {limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Conference/getFutureConference", requestHeader);
    return response.data;
}

// @ts-ignore
export const getOldConference = async (data) => {
    const requestHeader = {headers: {type: data.type, limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Conference/getOldConferences", requestHeader);
    return response.data;
}

// @ts-ignore
export const getAllTypeConference = async (data) => {
    const requestHeader = {headers: {limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Conference/getAllTypeConference", requestHeader);
    return response.data;
}

// @ts-ignore
export const getTypeConference = async (data) => {
    const requestHeader = {headers: {type: data.type, limit: data.limit, offset: data.offset}};
    const response = await axios.get(process.env.NEXT_PUBLIC_API + "/Conference/getTypeConference", requestHeader);
    return response.data;
}
