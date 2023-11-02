import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";

//===== services =====//
import {addBanner, addBannerThumbnail} from "@/services/bannerService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {bannerSchema, bannerThumbnailSchema} from "@/utils/validations";

//===== modules =====//
import Modal from "@/components/ui/Modal";
import ImageInput from "@/components/ui/ImageInput";
import TextInput from "@/components/ui/TextInput";
import SelectBox from "@/components/ui/SelectBox";

//===== variables =====//
const places = [
    {id: 1, label: 'صفحه اصلی', value: "home"},
    {id: 2, label: 'صفحه اخبار و اطلاعیه ها', value: "news"},
    {id: 3, label: 'صفحه همایش ها و رویداد ها', value: "conference"},
    {id: 4, label: 'صفحه مقالات', value: "article"},
    {id: 5, label: 'صفحه نگارخانه', value: "gallery"},
];

export const AddBannerModalFirstPart = () => {

    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(addBannerThumbnail, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onOpenModal("add-2", {bannerId: data?.data})
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن نمایه بنر");
        }
    });

    const formik = useFormik({
        initialValues: {
            image: null,
        },
        validationSchema: bannerThumbnailSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                adminRole: session?.user?.role,
            });
        }
    });

    return (
        <Modal
            title="افزودن بنر یا تبلیغ جدید"
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
                hint="بهترین ابعاد برای نمایه 960x320 پیکسل است"
                name="image"
                value={formik.values.image}
                onChange={(value) => formik.setFieldValue("image", value)}
                touched={formik.touched.image}
                error={formik.errors.image}
                aspectRatio="3-1"
                style={{width: "100%"}}
            />

        </Modal>
    )

}

export const AddBannerModalSecondPart = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal, isOpenModal, _onOpenModal, _onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(addBanner, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onCloseModal();
                queryClient.invalidateQueries('getAllBanner');
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در افزودن بنر");
        }
    });

    const formik = useFormik({
        initialValues: {
            place: "",
            source: "",
        },
        validationSchema: bannerSchema,
        onSubmit: async (data) => {
            await mutate({
                ...data,
                adminRole: session?.user?.role,
                bannerId: modal?.data?.bannerId
            });
        }
    });

    return (
        <Modal
            title="افزودن بنر یا تبلیغ جدید"
            isOpenModal={isOpenModal("add-2")}
            onCloseModal={_onCloseModal}
            submitText="بعدی"
            onSubmit={() => formik.handleSubmit()}
            cancelText="انصراف"
            onCancel={_onCloseModal}
            loading={isLoading}
        >

            {/* select box */}
            <SelectBox
                name="place"
                label="محل نمایش"
                options={places}
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
                style={{width: "100%"}}
            />

        </Modal>
    )

}

const AddBannerModal = () => {

    const {modal} = useContext(PortalContext);

    if (modal.isOpen === true && modal.type === "add-1") return <AddBannerModalFirstPart/>;
    if (modal.isOpen === true && modal.type === "add-2") return <AddBannerModalSecondPart/>;

}

export default AddBannerModal;