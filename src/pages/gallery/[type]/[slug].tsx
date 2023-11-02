import {useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";

//===== services =====//
import {getSingleGallery} from "@/services/galleryService";

//===== utils =====//
import {convertType} from "@/utils/functions";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageLoader from "@/components/ui/PageLoader";

//===== features =====//
import {GalleryContentVideo , GalleryContentImage , GalleryContentInfography} from "@/features/gallery/GalleryContent";

//===== variables =====//
const breadcrumbs = [
    {id: 1, title: 'خانه', href: '/'},
    {id: 2, title: 'نگارخانه', href: '/gallery'},
];

// @ts-ignore
const SingleGallery = () => {

    const router = useRouter();

    const {
        isLoading: singleGalleryIsLoading,
        isError: singleGalleryIsError,
        data: singleGallery
    } = useQuery(
        ["getSingleGallery"],
        () => getSingleGallery({slug: router.query.slug}),
        // @ts-ignore
        {enabled: Boolean(router.query.slug)}
    );

    useEffect(() => {
        if (singleGalleryIsError || (!singleGalleryIsLoading && !singleGallery?.data) || (!singleGalleryIsLoading && Object.keys(singleGallery?.data).length === 0)){
            router.replace("/404");
        }
    } , [singleGalleryIsLoading , singleGalleryIsError , singleGallery]);

    return !singleGalleryIsLoading && !singleGalleryIsError && singleGallery?.data && Object.keys(singleGallery?.data).length > 0 ? (

        <MainLayout>

            <Head>
                <title>{singleGallery?.data?.title}</title>
            </Head>

            {/* breadcrumb */}
            <Breadcrumbs
                links={
                    [
                        ...breadcrumbs,
                        {
                            id: 3,
                            title: convertType(singleGallery?.data?.type),
                            href: "/gallery/" + singleGallery?.data?.type
                        }
                    ]
                }
            />

            {/* content */}
            {
                router.query.type === "video" ? (
                    <GalleryContentVideo gallery={singleGallery?.data}/>
                ) : router.query.type === "image" ? (
                    <GalleryContentImage gallery={singleGallery?.data}/>
                ) : router.query.type === "infography" ? (
                    <GalleryContentInfography gallery={singleGallery?.data}/>
                ) : null
            }

        </MainLayout>

    ) : <PageLoader/>
}

export default SingleGallery;
