import Head from "next/head";
import Link from "next/link";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";
import {Button, Stack} from "@mui/material";
import {FiArrowLeft} from "react-icons/fi";

//===== services =====//
import {getAllGalleryBanner} from "@/services/bannerService";
import {getAllTypeGallery, getSuggestionGallery} from "@/services/galleryService";

//===== utils =====//
import {convertType} from "@/utils/functions";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import {BannerSlider} from "@/components/ui/Banner";
import {Heading} from "@/components/ui/Heading";
import PageLoader from "@/components/ui/PageLoader";

//===== features =====//
import GalleryJumbotron from "@/features/gallery/GalleryJumbotron";
import GallerySlider from "@/features/gallery/GallerySlider";
import GalleryType from "@/features/gallery/GalleryType";
const Gallery = () => {

    const {
        isLoading: galleryBannerIsLoading,
        isError: galleryBannerIsError,
        data: galleryBanner
    } = useQuery(["getAllGalleryBanner"], () => getAllGalleryBanner({limit: 3, offset: 1}));

    const {
        isLoading: suggestionGalleryIsLoading,
        isError: suggestionGalleryIsError,
        data: suggestionGallery
    } = useQuery(["getSuggestionGallery"], () => getSuggestionGallery({limit: 3, offset: 1}));

    const {
        isLoading: allTypeGalleryIsLoading,
        isError: allTypeGalleryIsError,
        data: allTypeGallery
    } = useQuery(["getAllTypeGallery"], () => getAllTypeGallery({limit: 3, offset: 1}));

    return (
        !galleryBannerIsLoading && !galleryBannerIsError &&
        !suggestionGalleryIsLoading && !suggestionGalleryIsError &&
        !allTypeGalleryIsLoading && !allTypeGalleryIsError
    ) ? (

        <MainLayout>

            <Head>
                <title>نگارخانه</title>
            </Head>

            {/* banner slider */}
            {
                galleryBanner?.data.length > 0 && (
                    <BannerSlider banners={galleryBanner?.data}/>
                )
            }

            {/* all type ( video ) */}
            {
                allTypeGallery?.data[1]?.galleries.length > 0 && (
                    <>
                        <Heading
                            title={` آخرین ${convertType(allTypeGallery?.data[1]?.type)} ها `}
                            color="black"
                            link={
                                <Button
                                    variant="text"
                                    color="secondary"
                                    LinkComponent={Link}
                                    href={process.env.NEXT_PUBLIC_DOMAIN + `/gallery/${allTypeGallery?.data[1]?.type}`}
                                    endIcon={<FiArrowLeft size={16}/>}
                                >
                                    موارد دیگر
                                </Button>
                            }
                        />

                        <GalleryJumbotron galleries={allTypeGallery?.data[1]?.galleries}/>
                    </>
                )
            }

            {/* slider */}
            {
                suggestionGallery?.data.length > 0 && (
                    <Stack
                        direction="column"
                        gap={2}
                        width='100%'
                        style={{
                            background: "#F7A827",
                            paddingTop: 32,
                            paddingBottom: 32,
                            paddingRight: 16,
                            paddingLeft: 16,
                        }}
                    >

                        <Heading
                            title="پیشنهاد سردبیر"
                            color="black"
                        />

                        <GallerySlider
                            galleries={suggestionGallery?.data}
                            color="black"
                        />

                    </Stack>
                )
            }

            {/* all type ( image ) */}
            {
                allTypeGallery?.data[0]?.galleries.length > 0 && (
                    <>
                        <Heading
                            title={` آخرین ${convertType(allTypeGallery?.data[0]?.type)} ها `}
                            color="black"
                            link={
                                <Button
                                    variant="text"
                                    color="secondary"
                                    LinkComponent={Link}
                                    href={process.env.NEXT_PUBLIC_DOMAIN + `/gallery/${allTypeGallery?.data[0]?.type}`}
                                    endIcon={<FiArrowLeft size={16}/>}
                                >
                                    موارد دیگر
                                </Button>
                            }
                        />

                        <GalleryType
                            galleries={allTypeGallery?.data[0]?.galleries}
                            color="primary"
                        />
                    </>
                )
            }

            {/* all type ( infography ) */}
            {
                allTypeGallery?.data[2]?.galleries.length > 0 && (
                    <>
                        <Heading
                            title={` آخرین ${convertType(allTypeGallery?.data[2]?.type)} ها `}
                            color="black"
                            link={
                                <Button
                                    variant="text"
                                    color="secondary"
                                    LinkComponent={Link}
                                    href={process.env.NEXT_PUBLIC_DOMAIN + `/gallery/${allTypeGallery?.data[2]?.type}`}
                                    endIcon={<FiArrowLeft size={16}/>}
                                >
                                    موارد دیگر
                                </Button>
                            }
                        />

                        <GalleryType
                            galleries={allTypeGallery?.data[2]?.galleries}
                            color="primary"
                        />
                    </>
                )
            }

        </MainLayout>

    ) : <PageLoader/>
}

export default Gallery;
