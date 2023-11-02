import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";

//===== services =====//
import {deleteCategory} from "@/services/categoryService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== modules =====//
import Dialog from "@/components/ui/Dialog";
const DeleteCategoryDialog = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal , isOpenModal , _onOpenModal ,_onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(deleteCategory, {
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
            toast.error("خطا در حذف دسته بندی");
        }
    });

    return (
        <Dialog
            message="آیا از حذف دسته بندی مطمئن هستید ؟"
            isOpenModal={isOpenModal("delete")}
            onCloseModal={_onCloseModal}
            onSubmit={() => mutate({adminRole: session?.user?.role, categoryId: modal?.data?.categoryId})}
        />
    )
}

export default DeleteCategoryDialog;