import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";

//===== services =====//
import {deleteUser} from "@/services/userService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== modules =====//
import Dialog from "@/components/ui/Dialog";
const DeleteUserDialog = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal , isOpenModal , _onOpenModal ,_onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(deleteUser, {
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
            toast.error("خطا در حذف کاربر");
        }
    });

    return (
        <Dialog
            message="آیا از حذف کاربر مطمئن هستید ؟"
            isOpenModal={isOpenModal("delete")}
            onCloseModal={_onCloseModal}
            onSubmit={() => mutate({adminRole: session?.user?.role, userId: modal?.data?.userId})}
        />
    )
}

export default DeleteUserDialog;