import {useContext} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {IconButton, Tooltip} from "@mui/material";
import {FiPlus} from "react-icons/fi";

//===== services =====//
import {getAllArticle} from "@/services/articleService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== layouts =====//
import AccountLayout from "@/layouts/AccountLayout";

//===== components =====//
import {Heading} from "@/components/ui/Heading";
import {TablePlaceholder} from "@/components/ui/Placeholder";
import {TableEmpty} from "@/components/ui/Empty";

//===== features =====//
import ArticleTable from "@/features/article/ArticleTable";

const EditArticleModal = dynamic(() => import("@/features/article/EditArticleModal") , {ssr: false});
const DeleteArticleDialog = dynamic(() => import("@/features/article/DeleteArticleDialog") , {ssr: false});
const SendArticleModal = dynamic(() => import("@/features/article/SendArticleModal") , {ssr: false});

//===== assets =====//
import empty from "@/assets/images/empty.svg";

const Article = () => {

    const {data: session} = useSession();
    const {_onOpenModal} = useContext(PortalContext);

    const {
        isFetching: articlesIsFetching,
        isError: articlesIsError,
        data: articles
    } = useQuery(
        ["getAllArticle"],
        // @ts-ignore
        () => getAllArticle({adminRole: session?.user?.role, limit: 10000, offset: 0}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(session?.user?.role)
        }
    );

    return (
        <AccountLayout>

            <Head>
                <title>مقالات</title>
            </Head>

            {/* heading */}
            <Heading
                color="black"
                title="مقالات"
                button={
                    <Tooltip title="افزودن">
                        <IconButton
                            color="secondary"
                            onClick={() => _onOpenModal("send-article")}
                        >
                            <FiPlus size={20}/>
                        </IconButton>
                    </Tooltip>
                }
            />

            {/* table */}
            {
                !articlesIsFetching && !articlesIsError && articles?.data.length > 0 && (
                    <ArticleTable tableData={articles?.data}/>
                )
            }

            {/* table placeholder */}
            {
                articlesIsFetching && !articlesIsError && (
                    <TablePlaceholder/>
                )
            }

            {/* table empty */}
            {
                !articlesIsFetching && (articlesIsError || articles?.data.length === 0) && (
                    <TableEmpty
                        message='مقاله ای یافت نشد'
                        image={empty}
                    />
                )
            }

            {/* send modal */}
            <SendArticleModal/>

            {/* edit modal */}
            <EditArticleModal/>

            {/* delete dialog */}
            <DeleteArticleDialog/>

        </AccountLayout>
    )
}

export default Article;
