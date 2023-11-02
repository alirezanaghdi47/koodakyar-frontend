import Jalaali from "jalaali-js";
import {format} from "date-fns-jalali";
export const getTimestampFromDate = (date, time) => {
    const year = Number(date?.split("/")[0]);
    const month = Number(date?.split("/")[1]);
    const day = Number(date?.split("/")[2]);
    const hour = Number(time?.split(":")[0]);
    const minute = Number(time?.split(":")[1]);
    const second = Number(time?.split(":")[2]);

    const {gy, gm, gd} = Jalaali.toGregorian(year, month, day);

    const parsedDateTime = new Date(
        +gy,
        +gm - 1,
        +gd,
        +hour,
        +minute,
        +second
    );

    return parsedDateTime.getTime();
}

export const getIsoStringFromDate = (date) => {
    const year = Number(date?.split("/")[0]);
    const month = Number(date?.split("/")[1]);
    const day = Number(date?.split("/")[2]);

    const {gy, gm, gd} = Jalaali.toGregorian(year, month, day);

    const parsedDate = new Date();
    parsedDate.setFullYear(gy, gm - 1, gd);

    return new Date(parsedDate);
}

export const getDateFromIsoString = (isoString) => format(new Date(isoString), "yyyy/MM/dd");

export const getIsoStringFromTime = (time) => {
    const hour = Number(time?.split(":")[0]);
    const minute = Number(time?.split(":")[1]);

    const parsedTime = new Date();
    parsedTime.setHours(hour);
    parsedTime.setMinutes(minute);

    return new Date(parsedTime);
}

export const getTimeFromIsoString = (isoString) => format(new Date(isoString), "HH:mm");

export const convertRole = (role) => {
    switch (role) {
        case process.env.NEXT_PUBLIC_ADMIN_ROLE:
            return "مدیر";
        case process.env.NEXT_PUBLIC_USER_ROLE:
            return "کاربر";
        default:
            return null;
    }
}

export const convertType = (type) => {
    switch (type) {
        case "report":
            return "خبر";
        case "notice":
            return "اطلاعیه";
        case "meeting":
            return "همایش";
        case "event":
            return "رویداد";
        case "paper":
            return "نوشته";
        case "video":
            return "ویدیو";
        case "image":
            return "تصویر";
        case "infography":
            return "اینفوگرافی";
        default:
            return null;
    }
}

export const convertPlace = (place) => {
    switch (place) {
        case "home":
            return {title: "صفحه اصلی", value: "/"};
        case "news":
            return {title: "صفحه اخبار و اطلاعیه ها", value: "/news"};
        case "conference":
            return {title: "صفحه همایش ها و رویداد ها", value: "/conference"};
        case "article":
            return {title: "صفحه مقالات", value: "/article"};
        case "gallery":
            return {title: "صفحه نگارخانه", value: "/gallery"};
        default:
            return null;
    }
}

export const convertLanguage = (type) => {
    switch (type) {
        case "en":
            return "انگلیسی";
        case "fa":
            return "فارسی";
        case "ar":
            return "عربی";
        default:
            return null;
    }
}

export const formatSize = (bytes) => {
    if (bytes == 0) return '0 Bytes';
    let k = 1000,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const formatDuration = (seconds) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = ('0' + date.getUTCSeconds()).slice(-2)
    if (hh) {
        return `${hh}:${('0' + mm).slice(-2)}:${ss}`
    }
    return `${mm}:${ss}`
}