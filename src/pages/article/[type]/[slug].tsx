import {useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";

//===== services =====//
import {getSingleArticle} from "@/services/articleService";

//===== utils =====//
import {convertType} from "@/utils/functions";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageLoader from "@/components/ui/PageLoader";

//===== features =====//
import ArticleContent from "@/features/article/ArticleContent";

//===== variables =====//
const breadcrumbs = [
    {id: 1, title: 'خانه', href: '/'},
    {id: 2, title: 'مقالات', href: '/article'},
];

// @ts-ignore
const SingleArticle = () => {

    const router = useRouter();

    const {
        isLoading: singleArticleIsLoading,
        isError: singleArticleIsError,
        data: singleArticle
    } = useQuery(
        ["getSingleArticle"],
        () => getSingleArticle({slug: router.query.slug}),
        // @ts-ignore
        {enabled: Boolean(router.query.slug)}
    );

    useEffect(() => {
        if (singleArticleIsError || (!singleArticleIsLoading && !singleArticle?.data) || (!singleArticleIsLoading && Object.keys(singleArticle?.data).length === 0)){
            router.replace("/404");
        }
    } , [singleArticleIsLoading , singleArticleIsError , singleArticle]);

    return !singleArticleIsLoading && !singleArticleIsError && singleArticle?.data && Object.keys(singleArticle?.data).length > 0 ? (

        <MainLayout>

            <Head>
                <title>{singleArticle?.data?.title}</title>
            </Head>

            {/* breadcrumb */}
            <Breadcrumbs
                links={
                    [
                        ...breadcrumbs,
                        {
                            id: 3,
                            title: convertType(singleArticle?.data?.type),
                            href: "/article/" + singleArticle?.data?.type
                        }
                    ]
                }
            />

            {/* content */}
            <ArticleContent article={singleArticle?.data}/>

        </MainLayout>

    ) : <PageLoader/>
}

export default SingleArticle;
