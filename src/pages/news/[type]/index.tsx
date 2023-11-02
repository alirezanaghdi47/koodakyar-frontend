import {useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";

//===== services =====//
import {getTypeNews} from "@/services/newsService";

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
import NewsList from "@/features/news/NewsList";

//===== variables =====//
const breadcrumbs = [
    {id: 1, title: 'خانه', href: '/'},
    {id: 2, title: 'اخبار و اطلاعیه ها', href: '/news'},
];

const TypeNews = () => {

    const router = useRouter();
    const {limit, offset, onPaginate} = usePagination({limit: 6});

    const {
        isFetching: newsTypeIsFetching,
        isError: newsTypeIsError,
        data: newsType
    } = useQuery(
        ["getTypeNews" , {type: router.query.type,limit: limit , offset: offset}],
        () => getTypeNews({type: router.query.type, limit: limit, offset: offset}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(router.query.type)
        }
    );

    useEffect(() => {
        if (newsTypeIsError || (!newsTypeIsFetching && !newsType?.data) || (!newsTypeIsFetching && Object.keys(newsType?.data).length === 0)) {
            router.replace("/404");
        }
    }, [newsTypeIsFetching, newsTypeIsError, newsType]);

    return !newsTypeIsFetching && !newsTypeIsError && newsType?.data.length > 0 ? (

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
                count={newsType?.count}
            />

            {/* list */}
            <NewsList news={newsType?.data}/>

            {/* pagination */}
            <Pagination
                pageCount={Math.ceil(newsType?.count / limit)}
                currentPage={offset}
                onPaginate={onPaginate}
            />

        </MainLayout>

    ) : <PageLoader/>
}

export default TypeNews;
