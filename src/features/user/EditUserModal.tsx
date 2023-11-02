import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";

//===== services =====//
import {editUser} from "@/services/userService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== utils =====//
import {userSchema} from "@/utils/validations";

//===== modules =====//
import Modal from "@/components/ui/Modal";
import SelectBox from "@/components/ui/SelectBox";
import SwitchBox from "@/components/ui/SwitchBox";

//===== variables =====//
const roles = [
    {id: 1, label: "مدیر", value: process.env.NEXT_PUBLIC_ADMIN_ROLE},
    {id: 2, label: "کاربر", value: process.env.NEXT_PUBLIC_USER_ROLE}
];

const EditUserModal = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal , isOpenModal , _onOpenModal ,_onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(editUser, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onCloseModal();
                queryClient.invalidateQueries('getAllUser');
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در ویرایش کاربر");
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            role: modal?.data?.role ? modal?.data?.role : '',
            isActive: modal?.data?.isActive ? modal?.data?.isActive : false
        },
        validationSchema: userSchema,
        onSubmit: async (data) => {
            // @ts-ignore
            await mutate({
                ...data,
                adminRole: session?.user?.role,
                userId: modal?.data?.userId
            });
        }
    });

    return (
        <Modal
            title="ویرایش کاربر"
            isOpenModal={isOpenModal("edit")}
            onCloseModal={_onCloseModal}
            submitText="بعدی"
            onSubmit={() => formik.handleSubmit()}
            cancelText="انصراف"
            onCancel={_onCloseModal}
            loading={isLoading}
        >

            {/* select box */}
            <SelectBox
                name="role"
                label="نقش کاربر"
                options={roles}
                value={formik.values.role}
                onChange={formik.handleChange}
                touched={formik.touched.role}
                error={formik.errors.role}
                style={{
                    width: "100%",
                    marginBottom: 16
                }}
            />

            {/* switch box */}
            <SwitchBox
                name="isActive"
                caption="کاربر اجازه فعالیت در پنل مدیریتی را دارد ؟"
                label="وضعیت کاربر"
                value={formik.values.isActive}
                onChange={formik.handleChange}
                touched={formik.touched.isActive}
                error={formik.errors.isActive}
                style={{width: "100%"}}
            />

        </Modal>
    )
}

export default EditUserModal;