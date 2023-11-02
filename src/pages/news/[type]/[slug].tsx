import {useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";

//===== services =====//
import {getSingleNews} from "@/services/newsService";

//===== utils =====//
import {convertType} from "@/utils/functions";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageLoader from "@/components/ui/PageLoader";

//===== features =====//
import NewsContent from "@/features/news/NewsContent";

//===== variables =====//
const breadcrumbs = [
    {id: 1, title: 'خانه', href: '/'},
    {id: 2, title: 'اخبار و اطلاعیه ها', href: '/news'},
];

// @ts-ignore
const SingleNews = () => {

    const router = useRouter();

    const {
        isLoading: singleNewsIsLoading,
        isError: singleNewsIsError,
        data: singleNews
    } = useQuery(
        ["getSingleNews"],
        () => getSingleNews({slug: router.query.slug}),
        // @ts-ignore
        {enabled: Boolean(router.query.slug)}
    );

    useEffect(() => {
        if (singleNewsIsError || (!singleNewsIsLoading && !singleNews?.data) || (!singleNewsIsLoading && Object.keys(singleNews?.data).length === 0)) {
            router.replace("/404");
        }
    }, [singleNewsIsLoading, singleNewsIsError, singleNews]);

    return !singleNewsIsLoading && !singleNewsIsError && singleNews?.data && Object.keys(singleNews?.data).length > 0 ? (

        <MainLayout>

            <Head>
                <title>{singleNews?.data?.title}</title>
            </Head>

            {/* breadcrumb */}
            <Breadcrumbs
                links={
                    [
                        ...breadcrumbs,
                        {
                            id: 3,
                            title: convertType(singleNews?.data.type),
                            href: "/news/" + singleNews?.data.type
                        }
                    ]
                }
            />

            {/* content */}
            <NewsContent news={singleNews?.data}/>

        </MainLayout>

    ) : <PageLoader/>
}

export default SingleNews;
