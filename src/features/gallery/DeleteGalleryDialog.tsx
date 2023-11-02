import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";

//===== services =====//
import {deleteGallery} from "@/services/galleryService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== modules =====//
import Dialog from "@/components/ui/Dialog";

const DeleteGalleryDialog = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal , isOpenModal , _onOpenModal ,_onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(deleteGallery, {
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
            toast.error("خطا در حذف نگارخانه");
        }
    });

    return (
        <Dialog
            message="آیا از حذف نگارخانه مطمئن هستید ؟"
            isOpenModal={isOpenModal("delete")}
            onCloseModal={_onCloseModal}
            onSubmit={() => mutate({adminRole: session?.user?.role, galleryId: modal?.data?.galleryId})}
        />
    )
}

export default DeleteGalleryDialog;