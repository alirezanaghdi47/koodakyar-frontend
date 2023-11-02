import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";

//===== services =====//
import {addConference, addConferenceDetail, addConferenceThumbnail} from "@/services/conferenceService";
import {getAllCategory} from "@/services/categoryService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {conferenceSchema, conferenceDetailSchema, conferenceThumbnailSchema,} from "@/utils/validations";

//===== modules =====//
import Modal from "@/components/ui/Modal";
import ImageInput from "@/components/ui/ImageInput";
import TextInput from "@/components/ui/TextInput";
import SelectBox from "@/components/ui/SelectBox";
import DatePicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import TextEditor from "@/components/ui/TextEditor";

//===== variables =====//
const types = [
    {id: 1, label: 'همایش', value: "meeting"},
    {id: 2, label: 'رویداد', value: "event"},
];

export const AddConferenceModalFirstPart = () => {

    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(addConferenceThumbnail, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onOpenModal("add-2", {conferenceId: data?.data});
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن نمایه همایش یا رویداد");
        }
    });

    const formik = useFormik({
        initialValues: {
            image: null,
        },
        validationSchema: conferenceThumbnailSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                adminRole: session?.user?.role,
            });
        }
    });

    return (
        <Modal
            title="افزودن همایش یا رویداد جدید"
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
                hint="بهترین ابعاد برای نمایه 360x480 پیکسل است"
                name="image"
                value={formik.values.image}
                onChange={(value) => formik.setFieldValue("image", value)}
                touched={formik.touched.image}
                error={formik.errors.image}
                aspectRatio="2-3"
                previewStyle={{
                    width: 300,
                    height: "100%"
                }}
                style={{width: "100%"}}
            />

        </Modal>
    )

}

export const AddConferenceModalSecondPart = () => {

    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(addConference, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onOpenModal("add-3", modal?.data);
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن همایش یا رویداد");
        }
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            slug: "",
            type: "",
            categoryId: "",
            date: "",
            time: "",
            place: "",
        },
        validationSchema: conferenceSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                // @ts-ignore
                adminRole: session?.user?.role,
                conferenceId: modal?.data?.conferenceId
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
            title="افزودن همایش یا رویداد جدید"
            isOpenModal={isOpenModal("add-2")}
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

            {/* date picker */}
            <DatePicker
                name="date"
                label="تاریخ"
                value={formik.values.date}
                onChange={(value) => formik.setFieldValue("date", value)}
                touched={formik.touched.date}
                error={formik.errors.date}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* time picker */}
            <TimePicker
                name="time"
                label="زمان"
                value={formik.values.time}
                onChange={(value) => formik.setFieldValue("time", value)}
                touched={formik.touched.time}
                error={formik.errors.time}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* text input */}
            <TextInput
                name="place"
                label="مکان"
                rows={3}
                value={formik.values.place}
                onChange={formik.handleChange}
                touched={formik.touched.place}
                error={formik.errors.place}
                style={{width: "100%"}}
            />

        </Modal>
    )

}

export const AddConferenceModalThirdPart = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(addConferenceDetail, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onCloseModal();
                queryClient.invalidateQueries('getAllConference');
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن همایش یا رویداد");
        }
    });

    const formik = useFormik({
        initialValues: {
            content: "",
        },
        validationSchema: conferenceDetailSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                // @ts-ignore
                adminRole: session?.user?.role,
                conferenceId: modal?.data?.conferenceId
            });
        }
    });

    return (
        <Modal
            title="افزودن همایش یا رویداد جدید"
            isOpenModal={isOpenModal("add-3")}
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

const AddConferenceModal = () => {

    const {modal} = useContext(PortalContext);

    if (modal.isOpen === true && modal.type === "add-1") return <AddConferenceModalFirstPart/>;
    if (modal.isOpen === true && modal.type === "add-2") return <AddConferenceModalSecondPart/>;
    if (modal.isOpen === true && modal.type === "add-3") return <AddConferenceModalThirdPart/>;

}

export default AddConferenceModal;