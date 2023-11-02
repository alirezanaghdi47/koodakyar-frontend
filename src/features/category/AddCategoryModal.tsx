import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";

//===== services =====//
import {addCategory, addCategoryThumbnail} from "@/services/categoryService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {categorySchema, categoryThumbnailSchema} from "@/utils/validations";

//===== modules =====//
import Modal from "@/components/ui/Modal";
import ImageInput from "@/components/ui/ImageInput";
import TextInput from "@/components/ui/TextInput";
import SelectBox from "@/components/ui/SelectBox";

//===== variables =====//
const types = [
    {id: 1, label: 'خبر', value: "report"},
    {id: 2, label: 'اطلاعیه', value: "notice"},
    {id: 3, label: 'همایش', value: "meeting"},
    {id: 4, label: 'رویداد', value: "event"},
    {id: 5, label: 'نوشته', value: "paper"},
    {id: 6, label: 'عکس', value: "image"},
    {id: 7, label: 'اینفوگرافی', value: "infography"},
    {id: 8, label: 'ویدیو', value: "video"},
];

export const AddCategoryModalFirstPart = () => {

    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(addCategoryThumbnail, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onOpenModal("add-2", {categoryId: data?.data})
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن آیکن دسته بندی");
        }
    });

    const formik = useFormik({
        initialValues: {
            image: null,
        },
        validationSchema: categoryThumbnailSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                adminRole: session?.user?.role,
            });
        }
    });

    return (
        <Modal
            title="افزودن دسته بندی جدید"
            isOpenModal={isOpenModal("add-1")}
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
                hint="بهترین ابعاد برای نمایه 30x30 پیکسل است"
                name="image"
                value={formik.values.image}
                onChange={(value) => formik.setFieldValue("image", value)}
                touched={formik.touched.image}
                error={formik.errors.image}
                aspectRatio="1-1"
                previewStyle={{
                    width: 60,
                    height: 60
                }}
                style={{width: "100%"}}
            />

        </Modal>
    )

}

export const AddCategoryModalSecondPart = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(addCategory, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onCloseModal();
                queryClient.invalidateQueries('getAllCategory');
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن دسته بندی");
        }
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            slug: "",
            type: ""
        },
        validationSchema: categorySchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                // @ts-ignore
                adminRole: session?.user?.role,
                categoryId: modal?.data?.categoryId
            });
        }
    });

    return (
        <Modal
            title="افزودن دسته بندی جدید"
            isOpenModal={isOpenModal("add-2")}
            onCloseModal={_onCloseModal}
            submitText="بعدی"
            onSubmit={() => formik.handleSubmit()}
            cancelText="انصراف"
            onCancel={_onCloseModal}
            loading={isLoading}
        >

            {/* select box */}
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

            {/* select box */}
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

const AddCategoryModal = () => {

    const {modal} = useContext(PortalContext);

    if (modal.isOpen === true && modal.type === "add-1") return <AddCategoryModalFirstPart/>;
    if (modal.isOpen === true && modal.type === "add-2") return <AddCategoryModalSecondPart/>;

}

export default AddCategoryModal;