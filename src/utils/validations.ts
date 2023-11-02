import * as Yup from "yup";

export const categoryThumbnailSchema = Yup.object().shape({
    image: Yup.mixed().nullable().test("fileSize", "حجم آیکن ارسالی حداکثر 200 کیلوبایت است", (value) => {
        if (value === null) {
            return true;
        } else {
            return value.size <= 2 * 102_400;
        }
    }).test("fileType", "فرمت آیکن ارسالی باید از نوع png باشد", (value) => {
        if (value === null) {
            return true;
        } else {
            return ['image/png'].includes(value.type);
        }
    })
});

export const categorySchema = Yup.object().shape({
    title: Yup.string().max(30, "عنوان دسته بندی حداکثر 30 کاراکتری است").required("عنوان دسته بندی الزامی است"),
    slug: Yup.string().max(30, "عنوان دسته بندی (انگلیسی) حداکثر 30 کاراکتری است").matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g, "فرمت عنوان دسته بندی (انگلیسی) نادرست است").required("عنوان دسته بندی (انگلیسی) الزامی است"),
    type: Yup.string().required("نوع دسته بندی الزامی است"),
});

export const newsThumbnailSchema = Yup.object().shape({
    image: Yup.mixed().nullable().test("fileSize", "حجم نمایه ارسالی حداکثر 1 مگابایت است", (value) => {
        if (value === null) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت نمایه ارسالی باید از نوع (png , jpg , jpeg) باشد", (value) => {
        if (value === null) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
});

export const newsSchema = Yup.object().shape({
    title: Yup.string().max(120, "عنوان خبر یا اطلاعیه حداکثر 120 کاراکتری است").required("عنوان خبر یا اطلاعیه الزامی است"),
    slug: Yup.string().max(60, "عنوان خبر یا اطلاعیه (انگلیسی) حداکثر 60 کاراکتری است").matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g, "فرمت عنوان خبر یا اطلاعیه (انگلیسی) نادرست است").required("عنوان خبر یا اطلاعیه (انگلیسی) الزامی است"),
    type: Yup.string().required("نوع خبر یا اطلاعیه الزامی است"),
    place: Yup.string().required("مکان خبر یا اطلاعیه الزامی است"),
    categoryId: Yup.number().typeError("دسته بندی خبر یا اطلاعیه الزامی است").required("دسته بندی خبر یا اطلاعیه الزامی است"),
    source: Yup.string().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, "آدرس منبع ایمن یا کامل نیست"),
    isSuggested: Yup.boolean()
});

export const newsDetailSchema = Yup.object().shape({
    content: Yup.string().required("محتوای خبر یا اطلاعیه الزامی است"),
});

export const conferenceThumbnailSchema = Yup.object().shape({
    image: Yup.mixed().nullable().test("fileSize", "حجم نمایه ارسالی حداکثر 1 مگابایت است", (value) => {
        if (value === null) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت نمایه ارسالی باید از نوع (png , jpg , jpeg) باشد", (value) => {
        if (value === null) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
});

export const conferenceSchema = Yup.object().shape({
    title: Yup.string().max(120, "عنوان همایش یا رویداد حداکثر 120 کاراکتری است").required("عنوان همایش یا رویداد الزامی است"),
    slug: Yup.string().max(60, "عنوان همایش یا رویداد (انگلیسی) حداکثر 60 کاراکتری است").matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g, "فرمت عنوان همایش یا رویداد (انگلیسی) نادرست است").required("عنوان همایش یا رویداد (انگلیسی) الزامی است"),
    type: Yup.string().required("نوع همایش یا رویداد الزامی است"),
    categoryId: Yup.number().typeError("دسته بندی خبر الزامی است").required("دسته بندی خبر الزامی است"),
    date: Yup.string().required("تاریخ برگزاری همایش یا رویداد الزامی است"),
    time: Yup.string().required("زمان برگزاری همایش یا رویداد الزامی است"),
    place: Yup.string().max(200, "مکان همایش یا رویداد حداکثر 200 کاراکتری است").required("محل برگزاری همایش یا رویداد الزامی است"),
});

export const conferenceDetailSchema = Yup.object().shape({
    content: Yup.string().required("محتوای همایش یا رویداد الزامی است"),
});

export const bannerThumbnailSchema = Yup.object().shape({
    image: Yup.mixed().nullable().test("fileSize", "حجم نمایه ارسالی حداکثر 1 مگابایت است", (value) => {
        if (value === null) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت نمایه ارسالی باید از نوع (png , jpg , jpeg) باشد", (value) => {
        if (value === null) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
});

export const bannerSchema = Yup.object().shape({
    place: Yup.string().required("محل نمایش بنر الزامی است"),
    source: Yup.string().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, "آدرس منبع ایمن یا کامل نیست"),
});

export const articleSchema = Yup.object().shape({
    isSuggested: Yup.boolean(),
    isConfirmed: Yup.boolean()
});

export const sendArticleSchema = Yup.object().shape({
    image: Yup.mixed().nullable().test("fileSize", "حجم نمایه ارسالی حداکثر 1 مگابایت است", (value) => {
        if (value === null) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت نمایه ارسالی باید از نوع png , jpeg , jpg باشد", (value) => {
        if (value === null) {
            return true;
        } else {
            return ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type);
        }
    }),
    title: Yup.string().max(120, "عنوان مقاله حداکثر 120 کاراکتری است").required("عنوان مقاله الزامی است"),
    slug: Yup.string().max(30, "عنوان مقاله (انگلیسی) حداکثر 30 کاراکتری است").matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g, "فرمت عنوان مقاله (انگلیسی) نادرست است").required("عنوان مقاله (انگلیسی) الزامی است"),
    categoryId: Yup.number().typeError("دسته بندی مقاله الزامی است").required("دسته بندی مقاله الزامی است"),
    date: Yup.string().required("تاریخ انتشار مقاله الزامی است"),
    language: Yup.string().required("زبان مقاله الزامی است"),
    authors: Yup.string().required("نویسنده یا نویسندگان مقاله الزامی است"),
    isbn: Yup.string().matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g , "فرمت شابک نادرست است"),
    description: Yup.string().max(500, "چکیده مقاله حداکثر 500 کاراکتری است").required("چکیده مقاله الزامی است"),
    type: Yup.string().required("نوع مقاله الزامی است"),
    file: Yup.mixed()
        .test("fileSize", "حجم فایل پیوست ارسالی حداکثر 5 مگابایت است", (value) => value.size <= 5 * 1_024_000)
        .test("fileType", "فرمت فایل پیوست ارسالی باید از نوع pdf باشد", (value) => ['application/pdf'].includes(value.type))
        .required("فایل پیوست الزامی است"),
});

export const gallerySchema = Yup.object().shape({
    isSuggested: Yup.boolean(),
    isConfirmed: Yup.boolean()
});

export const sendGalleryTypeSchema = Yup.object().shape({
    type: Yup.string().required("نوع نگارخانه الزامی است"),
});

export const sendGalleryThumbnailSchema = Yup.object().shape({
    image: Yup.mixed().nullable().test("fileSize", "حجم نمایه ارسالی حداکثر 1 مگابایت است", (value) => {
        if (value === null) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت نمایه ارسالی باید از نوع (png , jpg , jpeg) باشد", (value) => {
        if (value === null) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }),
});

export const sendGalleryImageSchema = Yup.object().shape({
    file: Yup.mixed().test("fileType", "فرمت فایل پیوست ارسالی باید از نوع (png , jpg , jpeg) باشد", (value) => {
        if (value === null) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }).test("fileSize", "حجم فایل پیوست ارسالی حداکثر 1 مگابایت است", (value) => {
        if (value === null) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).required("فایل پیوست الزامی است ")
});

export const sendGalleryInfographySchema = Yup.object().shape({
    file: Yup.mixed().test("fileType", "فرمت فایل پیوست ارسالی باید از نوع (png , jpg , jpeg) باشد", (value) => {
        if (value === null) {
            return true;
        } else {
            return ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type);
        }
    }).test("fileSize", "حجم فایل پیوست ارسالی حداکثر 1 مگابایت است", (value) => {
        if (value === null) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).required("فایل پیوست الزامی است "),
});

export const sendGalleryVideoSchema = Yup.object().shape({
    file: Yup.mixed().test("fileType", "فرمت فایل پیوست ارسالی باید از نوع mp4 باشد", (value) => {
        if (value === null) {
            return true;
        } else {
            return ['video/mp4'].includes(value.type);
        }
    }).test("fileSize", "حجم فایل پیوست ارسالی حداکثر 20 مگابایت است", (value) => {
        if (value === null) {
            return true;
        } else {
            return value.size <= 20 * 1_024_000;
        }
    }).required("فایل پیوست الزامی است "),
});

export const sendGallerySchema = Yup.object().shape({
    title: Yup.string().max(120, "عنوان نگارخانه حداکثر 120 کاراکتری است").required("عنوان نگارخانه الزامی است"),
    slug: Yup.string().max(60, "عنوان نگارخانه (انگلیسی) حداکثر 60 کاراکتری است").matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g, "فرمت عنوان نگارخانه (انگلیسی) نادرست است").required("عنوان نگارخانه (انگلیسی) الزامی است"),
    type: Yup.string(),
    categoryId: Yup.number().typeError("دسته بندی نگارخانه الزامی است").required("دسته بندی نگارخانه الزامی است"),
    author: Yup.string().required("عکاس یا تولیدکننده نگارخانه الزامی است"),
    place: Yup.string().required("مکان نگارخانه الزامی است"),
    date: Yup.string().required("تاریخ انتشار نگارخانه الزامی است"),
    source: Yup.string().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, "آدرس منبع ایمن یا کامل نیست"),
});

export const sendGalleryDetailSchema = Yup.object().shape({
    content: Yup.string(),
});

export const userSchema = Yup.object().shape({
    role: Yup.string().required("نقش کاربر الزامی است"),
    isActive: Yup.boolean()
});

export const profileSchema = Yup.object().shape({
    avatar: Yup.mixed().nullable().test("fileSize", "حجم نمایه ارسالی حداکثر 1 مگابایت است", (value) => {
        if (value === null) {
            return true;
        } else {
            return value.size <= 1_024_000;
        }
    }).test("fileType", "فرمت نمایه ارسالی باید از نوع png , jpeg , jpg باشد", (value) => {
        if (value === null) {
            return true;
        } else {
            return ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type);
        }
    }),
    userName: Yup.string(),
    firstName: Yup.string().max(50, "نام حداکثر 50 کاراکتری است").required("نام الزامی است"),
    lastName: Yup.string().max(50, "نام خانوادگی حداکثر 50 کاراکتری است").required("نام خانوادگی الزامی است"),
    email: Yup.string().email("فرمت ایمیل نادرست است").required("ایمیل الزامی است"),
    phoneNumber: Yup.string().matches(/^(\+98|0)?9\d{9}$/g, "شماره تلفن همراه نادرست است").required("شماره تلفن همراه الزامی است")
});

export const securitySchema = Yup.object().shape({
    currentPassword: Yup.string().required("رمز عبور فعلی الزامی است"),
    newPassword: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور جدید باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").test('passwords-match', 'رمز عبور فعلی و جدید یکسان است', function (value) {
        return this.parent.currentPassword !== value
    }).required("رمز عبور جدید الزامی است"),
    // @ts-ignore
    newPasswordRepeat: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "تکرار رمز عبور جدید باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").oneOf([Yup.ref('newPassword'), null], "رمز عبور جدید با تکرار آن یکسان نیست").required("تکرار رمز عبور جدید الزامی است")
});

export const loginSchema = Yup.object().shape({
    userName: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").required("رمز عبور الزامی است")
});

export const registerSchema = Yup.object().shape({
    userName: Yup.string().max(30, "نام کاربری حداکثر 30 کاراکتری است").min(3, "نام کاربری حداقل 3 کاراکتری است").required("نام کاربری الزامی است"),
    email: Yup.string().email("فرمت ایمیل نادرست است").required("ایمیل الزامی است"),
    password: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").required("رمز عبور الزامی است"),
    // @ts-ignore
    passwordRepeat: Yup.string().matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "تکرار رمز عبور باید حداقل 8 کاراکتر به همراه حروف بزرگ و کوچک و عدد و علائم باشد").oneOf([Yup.ref('password'), null], "رمز عبور با تکرار آن یکسان نیست").required("تکرار رمز عبور الزامی است")
});

export const linkSchema = Yup.object().shape({
    link: Yup.string().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, "لینک ایمن یا کامل نیست").required("لینک الزامی است"),
});