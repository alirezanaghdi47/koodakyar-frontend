import {useContext} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {IconButton, Tooltip} from "@mui/material";
import {FiPlus} from "react-icons/fi";

//===== services =====//
import {getAllNews} from "@/services/newsService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== layouts =====//
import AccountLayout from "@/layouts/AccountLayout";

//===== components =====//
import {Heading} from "@/components/ui/Heading";
import {TablePlaceholder} from "@/components/ui/Placeholder";
import {TableEmpty} from "@/components/ui/Empty";

//===== features =====//
import NewsTable from "@/features/news/NewsTable";

const AddNewsModal = dynamic(() => import("@/features/news/AddNewsModal") , {ssr: false});
const EditNewsModal = dynamic(() => import("@/features/news/EditNewsModal") , {ssr: false});
const DeleteNewsDialog = dynamic(() => import("@/features/news/DeleteNewsDialog") , {ssr: false});

//===== assets =====//
import empty from "@/assets/images/empty.svg";

const News = () => {

    const {data: session} = useSession();
    const {_onOpenModal} = useContext(PortalContext);

    const {
        isFetching: newsIsFetching,
        isError: newsIsError,
        data: news
    } = useQuery(
        ["getAllNews"],
        // @ts-ignore
        () => getAllNews({adminRole: session?.user?.role, limit: 10000, offset: 0}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(session?.user?.role)
        }
    );

    return (
        <AccountLayout>

            <Head>
                <title>اخبار و اطلاعیه ها</title>
            </Head>

            {/* heading */}
            <Heading
                title='اخبار و اطلاعیه ها'
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
            {
                !newsIsFetching && !newsIsError && news?.data.length > 0 && (
                    <NewsTable tableData={news?.data}/>
                )
            }

            {/* table placeholder */}
            {
                newsIsFetching && !newsIsError && (
                    <TablePlaceholder/>
                )
            }

            {/* table empty */}
            {
                !newsIsFetching && (newsIsError || news?.data.length === 0) && (
                    <TableEmpty
                        message='خبر یا اطلاعیه ای یافت نشد'
                        image={empty}
                    />
                )
            }

            {/* add modal */}
            <AddNewsModal/>

            {/* edit modal */}
            <EditNewsModal/>

            {/* delete dialog */}
            <DeleteNewsDialog/>

        </AccountLayout>
    )
}

export default News;
