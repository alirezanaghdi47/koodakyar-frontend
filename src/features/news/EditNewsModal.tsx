import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";

//===== services =====//
import {getAllCategory} from "@/services/categoryService";
import {editNews, editNewsDetail, editNewsThumbnail} from "@/services/newsService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {newsSchema, newsThumbnailSchema, newsDetailSchema} from "@/utils/validations";

//===== modules =====//
import Modal from "@/components/ui/Modal";
import ImageInput from "@/components/ui/ImageInput";
import TextInput from "@/components/ui/TextInput";
import SelectBox from "@/components/ui/SelectBox";
import SwitchBox from "@/components/ui/SwitchBox";
import TextEditor from "@/components/ui/TextEditor";

//===== data =====//
import provinces from "@/assets/data/provinces.json";

//===== variables =====//
const types = [
    {id: 1, label: 'خبر', value: "report"},
    {id: 2, label: 'اطلاعیه', value: "notice"},
];

export const EditNewsModalFirstPart = () => {

    const {data: session} = useSession();
    const {modal , isOpenModal , _onOpenModal ,_onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(editNewsThumbnail, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onOpenModal("edit-2" , modal?.data);
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در ویرایش نمایه خبر یا اطلاعیه");
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            image: null,
        },
        validationSchema: newsThumbnailSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                adminRole: session?.user?.role,
                newsId: modal?.data?.newsId
            });
        }
    });

    return (
        <Modal
            title="ویرایش خبر یا اطلاعیه"
            isOpenModal={isOpenModal("edit-1")}
            onCloseModal={_onCloseModal}
            submitText="بعدی"
            onSubmit={() => formik.handleSubmit()}
            cancelText="انصراف"
            onCancel={_onCloseModal}
            loading={isLoading}
        >

            {/* file input */}
            <ImageInput
                label="نمایه"
                hint="بهترین ابعاد برای نمایه 480x320 پیکسل است"
                name="image"
                preview={modal?.data?.thumbnail}
                value={formik.values.image}
                onChange={(value) => formik.setFieldValue("image", value)}
                touched={formik.touched.image}
                error={formik.errors.image}
                aspectRatio="4-3"
                style={{width: "100%"}}
            />

        </Modal>
    )

}

export const EditNewsModalSecondPart = () => {

    const {data: session} = useSession();
    const {modal , isOpenModal , _onOpenModal ,_onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(editNews, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onOpenModal("edit-3" , modal?.data);
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در ویرایش خبر یا اطلاعیه");
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: modal?.data?.title ? modal?.data?.title : "",
            slug: modal?.data?.slug ? modal?.data?.slug : "",
            type: modal?.data?.type ? modal?.data?.type : "",
            place: modal?.data?.place ? modal?.data?.place : "",
            categoryId: modal?.data?.category?.categoryId ? modal?.data?.category?.categoryId : "",
            source: modal?.data?.source ? modal?.data?.source : "",
            isSuggested: modal?.data?.isSuggested ? modal?.data?.isSuggested : false,
        },
        validationSchema: newsSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                // @ts-ignore
                adminRole: session?.user?.role,
                newsId: modal?.data?.newsId
            });
        }
    });

    const {
        data: categories,
        isFetching: categoriesIsLoading,
        isError: categoriesIsError
    } = useQuery(
        ["getAllCategory", {adminRole: session?.user?.role, type: formik.values.type, limit: 100 , offset: 0}],
        // @ts-ignore
        () => getAllCategory({adminRole: session?.user?.role, type: formik.values.type, limit: 100 , offset: 0}),
        // @ts-ignore
        {enabled: Boolean(formik.values.type)}
    );

    return (
        <Modal
            title="ویرایش خبر یا اطلاعیه"
            isOpenModal={isOpenModal("edit-2")}
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
                name="type"
                label="نوع"
                options={types}
                value={formik.values.type}
                onChange={formik.handleChange}
                touched={formik.touched.type}
                error={formik.errors.type}
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

            {/* text input */}
            <TextInput
                name="source"
                label="منبع"
                value={decodeURI(formik.values.source)}
                onChange={formik.handleChange}
                touched={formik.touched.source}
                error={formik.errors.source}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* switch box */}
            <SwitchBox
                name="isSuggested"
                caption="توسط سر دبیر توصیه می شود ؟"
                label="توصیه سردبیر"
                value={formik.values.isSuggested}
                onChange={formik.handleChange}
                touched={formik.touched.isSuggested}
                error={formik.errors.isSuggested}
                style={{width: "100%"}}
            />

        </Modal>
    )

}

export const EditNewsModalThirdPart = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal , isOpenModal , _onOpenModal ,_onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(editNewsDetail, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onCloseModal();
                queryClient.invalidateQueries('getAllNews');
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در ویرایش خبر یا اطلاعیه");
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            content: modal?.data?.content ? modal?.data?.content : "",
        },
        validationSchema: newsDetailSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                // @ts-ignore
                adminRole: session?.user?.role,
                newsId: modal?.data?.newsId
            });
        }
    });

    return (
        <Modal
            title="ویرایش خبر یا اطلاعیه"
            isOpenModal={isOpenModal("edit-3")}
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

const EditNewsModal = () => {

    const {modal} = useContext(PortalContext);

    if (modal.isOpen === true && modal.type === "edit-1")  return <EditNewsModalFirstPart/>;
    if (modal.isOpen === true && modal.type === "edit-2")  return <EditNewsModalSecondPart/>;
    if (modal.isOpen === true && modal.type === "edit-3")  return <EditNewsModalThirdPart/>;

}

export default EditNewsModal;