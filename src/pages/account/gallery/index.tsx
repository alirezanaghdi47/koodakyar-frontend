import {useContext} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {IconButton, Tooltip} from "@mui/material";
import {FiPlus} from "react-icons/fi";

//===== services =====//
import {getAllGallery} from "@/services/galleryService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== layouts =====//
import AccountLayout from "@/layouts/AccountLayout";

//===== components =====//
import {Heading} from "@/components/ui/Heading";
import {TablePlaceholder} from "@/components/ui/Placeholder";
import {TableEmpty} from "@/components/ui/Empty";

//===== features =====//
import GalleryTable from "@/features/gallery/GalleryTable";

const SendGalleryModal = dynamic(() => import("@/features/gallery/SendGalleryModal") , {ssr: false});
const EditGalleryModal = dynamic(() => import("@/features/gallery/EditGalleryModal") , {ssr: false});
const DeleteGalleryDialog = dynamic(() => import("@/features/gallery/DeleteGalleryDialog") , {ssr: false});

//===== assets =====//
import empty from "@/assets/images/empty.svg";

const Article = () => {

    const {data: session} = useSession();
    const {_onOpenModal} = useContext(PortalContext);

    const {
        isFetching: galleriesIsFetching,
        isError: galleriesIsError,
        data: galleries
    } = useQuery(
        ["getAllGallery"],
        // @ts-ignore
        () => getAllGallery({adminRole: session?.user?.role, limit: 10000, offset: 0}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(session?.user?.role)
        }
    );

    return (
        <AccountLayout>

            <Head>
                <title>نگارخانه</title>
            </Head>

            {/* heading */}
            <Heading
                title='نگارخانه'
                color="black"
                button={
                    <Tooltip title="افزودن">
                        <IconButton
                            color="secondary"
                            onClick={() => _onOpenModal("send-gallery-1")}
                        >
                            <FiPlus size={20}/>
                        </IconButton>
                    </Tooltip>
                }
            />

            {/* table */}
            {
                !galleriesIsFetching && !galleriesIsError && galleries?.data.length > 0 && (
                    <GalleryTable tableData={galleries?.data}/>

                )
            }

            {/* table placeholder */}
            {
                galleriesIsFetching && !galleriesIsError && (
                    <TablePlaceholder/>
                )
            }

            {/* table empty */}
            {
                !galleriesIsFetching && (galleriesIsError || galleries?.data.length === 0) && (
                    <TableEmpty
                        message='نگارخانه ای یافت نشد'
                        image={empty}
                    />
                )
            }

            {/* send modal */}
            <SendGalleryModal/>

            {/* edit modal */}
            <EditGalleryModal/>

            {/* delete dialog */}
            <DeleteGalleryDialog/>

        </AccountLayout>
    )
}

export default Article;
