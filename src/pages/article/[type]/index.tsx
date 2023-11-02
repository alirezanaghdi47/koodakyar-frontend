import {useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";

//===== services =====//
import {getTypeArticle} from "@/services/articleService";

//===== hooks =====//
import usePagination from "@/hooks/usePagination";

//===== utils =====//
import {convertType} from "@/utils/functions";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {Heading} from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import PageLoader from "@/components/ui/PageLoader";

//===== features =====//
import ArticleList from "@/features/article/ArticleList";

//===== variables =====//
const breadcrumbs = [
    {id: 1, title: 'خانه', href: '/'},
    {id: 2, title: 'مقالات', href: '/article'},
];

const TypeArticle = () => {

    const router = useRouter();
    const {limit, offset, onPaginate} = usePagination({limit: 6});

    const {
        isFetching: articleTypeIsFetching,
        isError: articleTypeIsError,
        data: articleType
    } = useQuery(
        ["getTypeArticle" ,{type: router.query.type,limit: limit , offset: offset}],
        () => getTypeArticle({type: router.query.type, limit: limit, offset: offset}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(router.query.type)
        }
    );

    useEffect(() => {
        if (articleTypeIsError || (!articleTypeIsFetching && !articleType?.data) || (!articleTypeIsFetching && Object.keys(articleType?.data).length === 0)){
            router.replace("/404");
        }
    } , [articleTypeIsFetching , articleTypeIsError , articleType]);

    return !articleTypeIsFetching && !articleTypeIsError && articleType?.data?.length > 0 ? (

        <MainLayout>

            <Head>

                <title>
                    {router.query.type ? "آخرین " + convertType(router.query.type) + " ها" : ""}
                </title>

            </Head>

            {/* breadcrumb */}
            <Breadcrumbs links={breadcrumbs}/>

            {/* heading */}
            <Heading
                title={` آخرین ${convertType(router.query.type)} ها `}
                color="black"
                count={articleType?.count}
            />

            {/* list */}
            <ArticleList articles={articleType?.data}/>

            {/* pagination */}
            <Pagination
                pageCount={Math.ceil(articleType?.count / limit)}
                currentPage={offset}
                onPaginate={onPaginate}
            />

        </MainLayout>

    ): <PageLoader/>
}

export default TypeArticle;
