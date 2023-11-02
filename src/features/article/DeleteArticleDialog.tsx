import {useContext} from "react";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";

//===== services =====//
import {deleteArticle} from "@/services/articleService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== modules =====//
import Dialog from "@/components/ui/Dialog";

const DeleteArticleDialog = () => {

    const queryClient = useQueryClient();
    const {data: session} = useSession();
    const {modal , isOpenModal , _onOpenModal ,_onCloseModal} = useContext(PortalContext);

    const {mutate, isLoading} = useMutation(deleteArticle, {
        onSuccess: data => {
            if (data.status === "success") {
                toast.success(data.message);
                _onCloseModal()
                queryClient.invalidateQueries('getAllArticle');
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در حذف مقاله");
        }
    });

    return (
        <Dialog
            message="آیا از حذف مقاله مطمئن هستید ؟"
            isOpenModal={isOpenModal("delete")}
            onCloseModal={_onCloseModal}
            onSubmit={() => mutate({adminRole: session?.user?.role, articleId: modal?.data?.articleId})}
        />
    )
}

export default DeleteArticleDialog;