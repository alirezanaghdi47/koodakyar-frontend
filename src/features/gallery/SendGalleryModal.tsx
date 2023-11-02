import {useContext, useState} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";
import {Stack, Box, IconButton, Typography, Chip} from "@mui/material";
import {FiTrash2} from "react-icons/fi";

//===== services =====//
import {sendGallery, sendGalleryDetail, sendGalleryFile, sendGalleryThumbnail} from "@/services/galleryService";
import {getAllCategory} from "@/services/categoryService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {
    sendGallerySchema,
    sendGalleryDetailSchema,
    sendGalleryThumbnailSchema,
    sendGalleryTypeSchema,
    sendGalleryImageSchema,
    sendGalleryInfographySchema,
    sendGalleryVideoSchema
} from "@/utils/validations";
import {formatSize} from "@/utils/functions";

//===== modules =====//
import Modal from "@/components/ui/Modal";
import ImageInput from "@/components/ui/ImageInput";
import FileInput from "@/components/ui/FileInput";
import TextInput from "@/components/ui/TextInput";
import SelectBox from "@/components/ui/SelectBox";
import DatePicker from "@/components/ui/DatePicker";
import TextEditor from "@/components/ui/TextEditor";

//===== data =====//
import provinces from "@/assets/data/provinces.json";

//===== variables =====//
const types = [
    {id: 1, label: 'ویدیو', value: "video"},
    {id: 2, label: 'تصویر', value: "image"},
    {id: 3, label: 'اینفوگرافی', value: "infography"},
];

export const SendGalleryModalFirstPart = () => {

    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const formik = useFormik({
        initialValues: {
            type: "",
        },
        validationSchema: sendGalleryTypeSchema,
        onSubmit: async (data) => {
            _onOpenModal("send-gallery-2", {type: data?.type});
        }
    });

    return (
        <Modal
            title="افزودن نگارخانه جدید"
            isOpenModal={isOpenModal("send-gallery-1")}
            onCloseModal={_onCloseModal}
            submitText="بعدی"
            onSubmit={() => formik.handleSubmit()}
            cancelText="انصراف"
            onCancel={_onCloseModal}
        >

            {/* select box */}
            <SelectBox
                name="type"
                label="نوع"
                options={types}
                value={formik.values.type}
                onChange={formik.handleChange}
                touched={formik.touched.type}
                error={formik.errors.type}
                style={{width: "100%"}}
            />

        </Modal>
    )

}

export const SendGalleryModalSecondPart = () => {

    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(sendGalleryThumbnail, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onOpenModal("send-gallery-3", {...modal?.data, galleryId: data?.data});
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن نمایه نگارخانه");
        }
    });

    const formik = useFormik({
        initialValues: {
            image: null,
        },
        validationSchema: sendGalleryThumbnailSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                userId: session?.user?.id
            });
        }
    });

    return (
        <Modal
            title="افزودن نگارخانه جدید"
            isOpenModal={isOpenModal("send-gallery-2")}
            onCloseModal={_onCloseModal}
            submitText="بعدی"
            onSubmit={() => formik.handleSubmit()}
            cancelText="انصراف"
            onCancel={_onCloseModal}
            loading={isLoading}
        >

            {/* image input */}
            <ImageInput
                label="نمایه"
                hint={` بهترین ابعاد برای نمایه ${modal?.data?.type === "infography" ? '360x480' : '480x360'} پیکسل است `}
                name="image"
                value={formik.values.image}
                onChange={(value) => formik.setFieldValue("image", value)}
                touched={formik.touched.image}
                error={formik.errors.image}
                aspectRatio={modal?.data?.type === "infography" ? "2-3" : "4-3"}
                style={{width: "100%"}}
            />

        </Modal>
    )

}

export const SendGalleryModalThirdPart = () => {

    const [files, setFiles] = useState([]);

    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(sendGalleryFile, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onOpenModal("send-gallery-4", modal?.data);
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن فایل نگارخانه");
        }
    });

    const formik = useFormik({
        initialValues: {
            file: null,
        },
        validationSchema: modal?.data?.type === "image" ? sendGalleryImageSchema : modal?.data?.type === "infography" ? sendGalleryInfographySchema : modal?.data?.type === "video" ? sendGalleryVideoSchema : null,
        onSubmit: async (data) => {
            _handleAddFile(data.file);
        }
    });

    const _handleAddFile = (file) => {
        if (!formik.values.file) return toast.error("فایلی برای پیوست یافت نشد");
        setFiles([...files, file]);
    }
    const _handleRemoveFile = (id) => setFiles(files.filter((file, index) => id !== index));
    const _handleAddGalleryFile = async () => {
        if (files.length === 0) return toast.error("فایلی برای پیوست یافت نشد");
        if (files.length > 10 && modal?.data?.type === "image") return toast.error("حداکثر تعداد فایل قابل ارسال 10 عدد می باشد");
        if (files.length > 1 && modal?.data?.type === "video") return toast.error("حداکثر تعداد فایل قابل ارسال 1 عدد می باشد");
        if (files.length > 1 && modal?.data?.type === "infography") return toast.error("حداکثر تعداد فایل قابل ارسال 1 عدد می باشد");
        await mutate({
            files: files,
            role: session?.user?.role,
            galleryId: modal?.data?.galleryId,
            type: modal?.data?.type,
        });
    }

    return (
        <Modal
            title="افزودن نگارخانه جدید"
            isOpenModal={isOpenModal("send-gallery-3")}
            onCloseModal={_onCloseModal}
            submitText="بعدی"
            onSubmit={_handleAddGalleryFile}
            cancelText="انصراف"
            onCancel={_onCloseModal}
            loading={isLoading}
        >

            <Stack
                direction="column"
                gap={2}
                justifyContent="center"
                alignItems="center"
                width="100%"
                style={{marginBottom: 16}}
            >

                {
                    files.map((file, index) =>
                        <Box
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                background: "#f2f3f6",
                                borderRadius: 8,
                                padding: 8
                            }}
                        >

                            <Stack
                                direction="row"
                                gap={2}
                                justifyContent="start"
                                alignItems="center"
                                width='max-content'
                            >

                                <Chip
                                    label={index + 1}
                                    color="secondary"
                                />

                                <Typography
                                    variant='body2'
                                    color="textPrimary"
                                    fontWeight='bold'
                                    width="50%"
                                    maxWidth={240}
                                    className="text-truncate text-truncate__1"
                                >
                                    {file?.name}
                                </Typography>

                                <Typography
                                    variant='caption'
                                    color="textSecondary"
                                    fontWeight='bold'
                                >
                                    {formatSize(file?.size)}
                                </Typography>

                            </Stack>

                            <IconButton
                                color='error'
                                onClick={() => _handleRemoveFile(index)}
                            >
                                <FiTrash2 size={16}/>
                            </IconButton>

                        </Box>
                    )
                }

            </Stack>

            {/* file input */}
            <FileInput
                label="پیوست"
                name="file"
                value={formik.values.file}
                onChange={(value) => formik.setFieldValue("file", value)}
                onSubmit={() => formik.handleSubmit()}
                onReset={() => formik.resetForm()}
                touched={formik.touched.file}
                error={formik.errors.file}
                multiple
                style={{width: "100%"}}
            />

        </Modal>
    )

}

export const SendGalleryModalFourthPart = () => {

    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(sendGallery, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onOpenModal("send-gallery-5", modal?.data);
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن نگارخانه");
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            slug: "",
            type: modal?.data?.type,
            categoryId: "",
            author: "",
            place: "",
            date: "",
            source: "",
        },
        validationSchema: sendGallerySchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                role: session?.user?.role,
                galleryId: modal?.data?.galleryId
            });
        }
    });

    const {
        data: categories,
        isFetching: categoriesIsLoading,
        isError: categoriesIsError
    } = useQuery(
        ["getAllCategory", {adminRole: session?.user?.role, type: formik.values.type, limit: 100, offset: 0}],
        // @ts-ignore
        () => getAllCategory({adminRole: session?.user?.role, type: formik.values.type, limit: 100, offset: 0}),
        // @ts-ignore
        {enabled: Boolean(formik.values.type)}
    );

    return (
        <Modal
            title="افزودن نگارخانه جدید"
            isOpenModal={isOpenModal("send-gallery-4")}
            onCloseModal={_onCloseModal}
            submitText="بعدی"
            onSubmit={() => formik.handleSubmit()}
            cancelText="انصراف"
            onCancel={_onCloseModal}
            loading={isLoading}
        >

            {/* text input */}
            <TextInput
                name="title"
                label="عنوان"
                value={formik.values.title}
                onChange={formik.handleChange}
                touched={formik.touched.title}
                error={formik.errors.title}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* text input */}
            <TextInput
                name="slug"
                label="عنوان ( انگلیسی )"
                hint="عنوان انگلیسی از کلمات و - برای جداسازی آنان استفاده می کند"
                value={formik.values.slug}
                onChange={formik.handleChange}
                touched={formik.touched.slug}
                error={formik.errors.slug}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* select box */}
            <SelectBox
                name="categoryId"
                label="دسته بندی"
                options={categories?.data?.map(category => ({
                    id: category.categoryId,
                    value: category.categoryId,
                    label: category.title
                }))}
                value={(categoriesIsLoading || categoriesIsError || categories?.data?.length === 0) ? "" : formik.values.categoryId}
                onChange={formik.handleChange}
                touched={formik.touched.categoryId}
                error={formik.errors.categoryId}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* text input */}
            <TextInput
                name="author"
                label="عکاس یا تولیدکننده"
                value={formik.values.author}
                onChange={formik.handleChange}
                touched={formik.touched.author}
                error={formik.errors.author}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* select box */}
            <SelectBox
                name="place"
                label="مکان"
                options={provinces.map(province => ({id: province.id, label: province.title, value: province.slug}))}
                value={formik.values.place}
                onChange={formik.handleChange}
                touched={formik.touched.place}
                error={formik.errors.place}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* date picker */}
            <DatePicker
                name="date"
                label="تاریخ انتشار"
                value={formik.values.date}
                onChange={(value) => formik.setFieldValue("date", value)}
                touched={formik.touched.date}
                error={formik.errors.date}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* text input */}
            <TextInput
                name="source"
                label="منبع"
                value={formik.values.source}
                onChange={formik.handleChange}
                touched={formik.touched.source}
                error={formik.errors.source}
                style={{
                    width: "100%",
                    marginBottom: 16,
                }}
            />

        </Modal>
    )

}

export const SendGalleryModalFifthPart = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(sendGalleryDetail, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onCloseModal();
                queryClient.invalidateQueries('getAllGallery');
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن نگارخانه");
        }
    });

    const formik = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: sendGalleryDetailSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                role: session?.user?.role,
                galleryId: modal?.data?.galleryId
            });
        }
    });

    return (
        <Modal
            title="افزودن نگارخانه جدید"
            isOpenModal={isOpenModal("send-gallery-5")}
            onCloseModal={_onCloseModal}
            submitText="بعدی"
            onSubmit={() => formik.handleSubmit()}
            cancelText="انصراف"
            onCancel={_onCloseModal}
            loading={isLoading}
        >

            {/* text editor */}
            <TextEditor
                name="content"
                label="محتوا"
                value={formik.values.content}
                onChange={(value) => formik.setFieldValue("content", value)}
                touched={formik.touched.content}
                error={formik.errors.content}
                style={{width: "100%"}}
            />

        </Modal>
    )

}

const SendGalleryModal = () => {

    const {modal} = useContext(PortalContext);

    if (modal.isOpen === true && modal.type === "send-gallery-1") return <SendGalleryModalFirstPart/>;
    if (modal.isOpen === true && modal.type === "send-gallery-2") return <SendGalleryModalSecondPart/>;
    if (modal.isOpen === true && modal.type === "send-gallery-3") return <SendGalleryModalThirdPart/>;
    if (modal.isOpen === true && modal.type === "send-gallery-4") return <SendGalleryModalFourthPart/>;
    if (modal.isOpen === true && modal.type === "send-gallery-5") return <SendGalleryModalFifthPart/>;

}

export default SendGalleryModal;