import {useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";

//===== services =====//
import {getTypeGallery} from "@/services/galleryService";

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
import GalleryList from "@/features/gallery/GalleryList";

//===== variables =====//
const breadcrumbs = [
    {id: 1, title: 'خانه', href: '/'},
    {id: 2, title: 'نگارخانه', href: '/gallery'},
];

const TypeGallery = () => {

    const router = useRouter();
    const {limit, offset, onPaginate} = usePagination({limit: 6});

    const {
        isFetching: galleryTypeIsFetching,
        isError: galleryTypeIsError,
        data: galleryType,
    } = useQuery(
        ["getTypeGallery", {type: router.query.type, limit: limit, offset: offset}],
        () => getTypeGallery({type: router.query.type, limit: limit, offset: offset}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(router.query.type)
        }
    );

    useEffect(() => {
        if (galleryTypeIsError || (!galleryTypeIsFetching && !galleryType?.data) || (!galleryTypeIsFetching && Object.keys(galleryType?.data).length === 0)){
            router.replace("/404");
        }
    } , [galleryTypeIsFetching , galleryTypeIsError , galleryType]);
    
    return !galleryTypeIsFetching && !galleryTypeIsError && galleryType?.data.length > 0 ? (

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
                count={galleryType?.count}
            />

            {/* list */}
            <GalleryList galleries={galleryType?.data}/>

            {/* pagination */}
            <Pagination
                pageCount={Math.ceil(galleryType?.count / limit)}
                currentPage={offset}
                onPaginate={onPaginate}
            />

        </MainLayout>

    ): <PageLoader/>
}

export default TypeGallery;
