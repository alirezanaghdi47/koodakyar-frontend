import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";

//===== services =====//
import {editGallery} from "@/services/galleryService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {gallerySchema} from "@/utils/validations";

//===== modules =====//
import Modal from "@/components/ui/Modal";
import SwitchBox from "@/components/ui/SwitchBox";
const EditArticleModal = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal , isOpenModal , _onOpenModal ,_onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(editGallery, {
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
            toast.error("خطا در ویرایش نگارخانه");
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            isSuggested: modal?.data?.isSuggested ? modal?.data?.isSuggested : false,
            isConfirmed: modal?.data?.isConfirmed ? modal?.data?.isConfirmed : false,
        },
        validationSchema: gallerySchema,
        onSubmit: async (data) => {
            // @ts-ignore
            await mutate({
                ...data,
                adminRole: session?.user?.role,
                galleryId: modal?.data?.galleryId
            });
        }
    });

    return (
        <Modal
            title="ویرایش نگارخانه"
            isOpenModal={isOpenModal("edit")}
            onCloseModal={_onCloseModal}
            submitText="ویرایش"
            onSubmit={() => formik.handleSubmit()}
            cancelText="انصراف"
            onCancel={_onCloseModal}
            loading={isLoading}
        >

            {/* switch box */}
            <SwitchBox
                name="isConfirmed"
                caption="آیا این نگارخانه در سایت منتشر شود ؟"
                label="وضعیت انتشار"
                value={formik.values.isConfirmed}
                onChange={formik.handleChange}
                touched={formik.touched.isConfirmed}
                error={formik.errors.isConfirmed}
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

export default EditArticleModal;