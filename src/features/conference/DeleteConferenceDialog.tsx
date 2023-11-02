import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";

//===== services =====//
import {deleteConference} from "@/services/conferenceService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== modules =====//
import Dialog from "@/components/ui/Dialog";
const DeleteConferenceDialog = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal , isOpenModal , _onOpenModal ,_onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(deleteConference, {
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
            toast.error("خطا در حذف همایش");
        }
    });

    return (
        <Dialog
            message="آیا از حذف همایش یا رویداد مطمئن هستید ؟"
            isOpenModal={isOpenModal("delete")}
            onCloseModal={_onCloseModal}
            onSubmit={() => mutate({adminRole: session?.user?.role, conferenceId: modal?.data?.conferenceId})}
        />
    )
}

export default DeleteConferenceDialog;