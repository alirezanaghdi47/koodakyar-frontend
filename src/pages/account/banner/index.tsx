import {useContext} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {IconButton, Tooltip} from "@mui/material";
import {FiPlus} from "react-icons/fi";

//===== services =====//
import {getAllBanner} from "@/services/bannerService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== layouts =====//
import AccountLayout from "@/layouts/AccountLayout";

//===== components =====//
import {Heading} from "@/components/ui/Heading";
import {TablePlaceholder} from "@/components/ui/Placeholder";
import {TableEmpty} from "@/components/ui/Empty";

//===== features =====//
import BannerTable from "@/features/banner/BannerTable";

const AddBannerModal = dynamic(() => import("@/features/banner/AddBannerModal") , {ssr: false});
const EditBannerModal = dynamic(() => import("@/features/banner/EditBannerModal") , {ssr: false});
const DeleteBannerDialog = dynamic(() => import("@/features/banner/DeleteBannerDialog") , {ssr: false});

//===== assets =====//
import empty from "@/assets/images/empty.svg";

const Banner = () => {

    const {data: session} = useSession();
    const {_onOpenModal} = useContext(PortalContext);

    const {
        isFetching: bannersIsFetching,
        isError: bannersIsError,
        data: banners
    } = useQuery(
        ["getAllBanner"],
        // @ts-ignore
        () => getAllBanner({adminRole: session?.user?.role, limit: 10000, offset: 0}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(session?.user?.role)
        }
    );

    return (
        <AccountLayout>

            <Head>
                <title>بنر ها و تبلیغات</title>
            </Head>

            {/* heading */}
            <Heading
                title='بنر ها و تبلیغات'
                color="black"
                button={
                    <Tooltip title="افزودن">
                        <IconButton
                            color="secondary"
                            onClick={() => _onOpenModal("add-1")}
                        >
                            <FiPlus size={20}/>
                        </IconButton>
                    </Tooltip>
                }
            />

            {/* table */}
            <>
                {
                    !bannersIsFetching && !bannersIsError && banners?.data.length > 0 && (
                        <BannerTable tableData={banners?.data}/>
                    )
                }
            </>

            {/* table placeholder */}
            <>
                {
                    bannersIsFetching && !bannersIsError && (
                        <TablePlaceholder/>
                    )
                }
            </>

            {/* table empty */}
            <>
                {
                    !bannersIsFetching && (bannersIsError || banners?.data.length === 0) && (
                        <TableEmpty
                            message='بنر یا تبلیغاتی یافت نشد'
                            image={empty}
                        />
                    )
                }
            </>

            {/* add modal */}
            <AddBannerModal/>

            {/* edit modal */}
            <EditBannerModal/>

            {/* delete dialog */}
            <DeleteBannerDialog/>

        </AccountLayout>
    )
}

export default Banner;
