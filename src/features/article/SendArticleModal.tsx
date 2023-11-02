import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";

//===== services =====//
import {getAllCategory} from "@/services/categoryService";
import {sendArticle} from "@/services/articleService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {sendArticleSchema} from "@/utils/validations";

//===== modules =====//
import Modal from "@/components/ui/Modal";
import ImageInput from "@/components/ui/ImageInput";
import FileInput from "@/components/ui/FileInput";
import TextInput from "@/components/ui/TextInput";
import SelectBox from "@/components/ui/SelectBox";
import DatePicker from "@/components/ui/DatePicker";

//===== variables =====//
const languages = [
    {id: 1, label: 'فارسی', value: "fa"},
    {id: 2, label: 'انگلیسی', value: "en"},
    {id: 3, label: 'عربی', value: "ar"},
];

const SendArticleModal = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(sendArticle, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onCloseModal();
                queryClient.invalidateQueries('getAllArticle');
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در ارسال مقاله");
        }
    });

    const formik = useFormik({
        initialValues: {
            image: null,
            title: "",
            slug: "",
            type: "paper",
            categoryId: "",
            date: "",
            language: "",
            authors: "",
            isbn: "",
            description: "",
            file: null,
        },
        validationSchema: sendArticleSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                userId: session?.user?.id
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
            title="فرم ارسال مقاله"
            isOpenModal={isOpenModal("send-article")}
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
                hint="بهترین ابعاد برای نمایه 100x100 پیکسل است"
                name="image"
                value={formik.values.image}
                onChange={(value) => formik.setFieldValue("image", value)}
                touched={formik.touched.image}
                error={formik.errors.image}
                aspectRatio="2-3"
                previewStyle={{
                    width: 100,
                    height: "100%"
                }}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

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

            {/* select box */}
            <SelectBox
                name="language"
                label="زبان"
                options={languages}
                value={formik.values.language}
                onChange={formik.handleChange}
                touched={formik.touched.language}
                error={formik.errors.language}
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
                name="authors"
                label="نویسنده یا نویسندگان"
                hint="برای جدا کردن نام افراد از - استفاده کنید"
                value={formik.values.authors}
                onChange={formik.handleChange}
                touched={formik.touched.authors}
                error={formik.errors.authors}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* text input */}
            <TextInput
                name="isbn"
                label="شابک"
                value={formik.values.isbn}
                onChange={formik.handleChange}
                touched={formik.touched.isbn}
                error={formik.errors.isbn}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* text input */}
            <TextInput
                name="description"
                label="چکیده"
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                touched={formik.touched.description}
                error={formik.errors.description}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* image input */}
            <FileInput
                label="پیوست"
                name="file"
                value={formik.values.file}
                onChange={(value) => formik.setFieldValue("file", value)}
                touched={formik.touched.file}
                error={formik.errors.file}
                style={{width: "100%"}}
            />

        </Modal>
    )

}

export default SendArticleModal;