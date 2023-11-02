import Head from "next/head";
import Link from "next/link";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";
import {Stack, Button} from "@mui/material";
import {FiArrowLeft} from "react-icons/fi";

//===== services =====//
import {getAllNewsBanner} from "@/services/bannerService";
import {getAllTypeNews, getSuggestionNews} from "@/services/newsService";

//===== utils =====//
import {convertType} from "@/utils/functions";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import {BannerSlider} from "@/components/ui/Banner";
import {Heading} from "@/components/ui/Heading";
import PageLoader from "@/components/ui/PageLoader";

//===== features =====//
import NewsJumbotron from "@/features/news/NewsJumbotron";
import NewsSlider from "@/features/news/NewsSlider";
import NewsType from "@/features/news/NewsType";
const News = () => {

    const {
        isLoading: allNewsBannerIsLoading,
        isError: allNewsBannerIsError,
        data: allNewsBanner
    } = useQuery(["getAllNewsBanner"], () => getAllNewsBanner({limit: 3, offset: 1}));

    const {
        isLoading: suggestionNewsIsLoading,
        isError: suggestionNewsIsError,
        data: suggestionNews
    } = useQuery(["getSuggestionNews"], () => getSuggestionNews({limit: 10, offset: 1}));

    const {
        isLoading: allTypeNewsIsLoading,
        isError: allTypeNewsIsError,
        data: allTypeNews
    } = useQuery(["getAllTypeNews"], () => getAllTypeNews({limit: 3, offset: 1}));

    return (
        !allNewsBannerIsLoading && !allNewsBannerIsError &&
        !suggestionNewsIsLoading && !suggestionNewsIsError &&
        !allTypeNewsIsLoading && !allTypeNewsIsError
    ) ? (

        <MainLayout>

            <Head>
                <title>اخبار و اطلاعیه ها</title>
            </Head>

            {/* banner slider */}
            {
                allNewsBanner?.data.length > 0 && (
                    <BannerSlider banners={allNewsBanner?.data}/>
                )
            }

            {/* jumbotron */}
            {
                allTypeNews?.data[0]?.news.length > 0 && (
                    <>
                        <Heading
                            title={` آخرین ${convertType(allTypeNews?.data[0]?.type)} ها `}
                            color="black"
                            link={
                                <Button
                                    variant="text"
                                    color="secondary"
                                    LinkComponent={Link}
                                    href={process.env.NEXT_PUBLIC_DOMAIN + `/news/${allTypeNews?.data[0]?.type}`}
                                    endIcon={<FiArrowLeft size={16}/>}
                                >
                                    موارد دیگر
                                </Button>
                            }
                        />

                        <NewsJumbotron news={allTypeNews?.data[0]?.news}/>
                    </>
                )
            }

            {/* slider */}
            {
                suggestionNews?.data.length > 0 && (
                    <Stack
                        direction="column"
                        gap={2}
                        width='100%'
                        style={{
                            background: "#D20A00",
                            paddingTop: 32,
                            paddingBottom: 32,
                            paddingRight: 16,
                            paddingLeft: 16,
                        }}
                    >

                        <Heading
                            title="پیشنهاد سردبیر"
                            color="white"
                        />

                        <NewsSlider
                            news={suggestionNews?.data}
                            color="white"
                        />

                    </Stack>
                )
            }

            {/* type */}
            {
                allTypeNews?.data[1]?.news.length > 0 && (
                    <>
                        <Heading
                            title={` آخرین ${convertType(allTypeNews?.data[1]?.type)} ها `}
                            color="black"
                            link={
                                <Button
                                    variant="text"
                                    color="secondary"
                                    LinkComponent={Link}
                                    href={process.env.NEXT_PUBLIC_DOMAIN + `/news/${allTypeNews?.data[1]?.type}`}
                                    endIcon={<FiArrowLeft size={16}/>}
                                >
                                    موارد دیگر
                                </Button>
                            }
                        />

                        <NewsType
                            news={allTypeNews?.data[1]?.news}
                            color="primary"
                        />
                    </>
                )
            }

        </MainLayout>

    ) : <PageLoader/>
}

export default News;
