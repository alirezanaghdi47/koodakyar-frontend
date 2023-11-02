import Head from "next/head";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";
import {Stack} from "@mui/material";

//===== services =====//
import {getAllHomeBanner} from "@/services/bannerService";
import {getSuggestionNews} from "@/services/newsService";
import {getFutureConference} from "@/services/conferenceService";
import {getSuggestionArticle} from "@/services/articleService";
import {getSuggestionGallery} from "@/services/galleryService";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import {BannerSlider} from "@/components/ui/Banner";
import {Heading} from "@/components/ui/Heading";
import PageLoader from "@/components/ui/PageLoader";

//===== features =====//
import GallerySlider from "@/features/gallery/GallerySlider";
import ArticleSlider from "@/features/article/ArticleSlider";
import ConferenceSlider from "@/features/conference/ConferenceSlider";
import NewsJumbotron from "@/features/news/NewsJumbotron";
import HomeSponsorsSlider from "@/features/home/HomeSponsorsSlider";
import HomeGuestsSlider from "@/features/home/HomeGuestsSlider";

const Home = () => {

    const {
        isLoading: suggestionNewsIsLoading,
        isError: suggestionNewsIsError,
        data: suggestionNews
    } = useQuery(["getSuggestionNews"], () => getSuggestionNews({limit: 10, offset: 1}));

    const {
        isLoading: allHomeBannerIsLoading,
        isError: allHomeBannerIsError,
        data: allHomeBanner
    } = useQuery(["getAllHomeBanner"], () => getAllHomeBanner({limit: 3, offset: 1}));

    const {
        isLoading: futureConferenceIsLoading,
        isError: futureConferenceIsError,
        data: futureConference
    } = useQuery(["getFutureConference"], () => getFutureConference({limit: 10, offset: 1}));

    const {
        isLoading: suggestionArticleIsLoading,
        isError: suggestionArticleIsError,
        data: suggestionArticle
    } = useQuery(["getSuggestionArticle"], () => getSuggestionArticle({limit: 10, offset: 1}));

    const {
        isLoading: suggestionGalleryIsLoading,
        isError: suggestionGalleryIsError,
        data: suggestionGallery
    } = useQuery(["getSuggestionGallery"], () => getSuggestionGallery({limit: 10, offset: 1}));

    return (
        !suggestionNewsIsLoading && !suggestionNewsIsError &&
        !allHomeBannerIsLoading && !allHomeBannerIsError &&
        !futureConferenceIsLoading && !futureConferenceIsError &&
        !suggestionArticleIsLoading && !suggestionArticleIsError &&
        !suggestionGalleryIsLoading && !suggestionGalleryIsError
    ) ? (

        <MainLayout>

            <Head>
                <title>کودک یار</title>
            </Head>

            {/* news slider */}
            {
                suggestionNews.data.length > 0 && (
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
                            marginTop: -16
                        }}
                    >

                        <Heading
                            title="اخبار پیشنهادی"
                            color="white"
                        />

                        <NewsJumbotron
                            news={suggestionNews?.data}
                            color="white"
                        />

                    </Stack>
                )
            }

            {/* banner slider */}
            {
                allHomeBanner.data.length > 0 && (
                    <BannerSlider banners={allHomeBanner?.data}/>
                )
            }

            {/* conference slider */}
            {
                futureConference.data.length > 0 && (
                    <Stack
                        direction="column"
                        gap={2}
                        width='100%'
                        style={{
                            background: "#0658A5",
                            paddingTop: 32,
                            paddingBottom: 32,
                            paddingRight: 16,
                            paddingLeft: 16,
                        }}
                    >

                        <Heading
                            title='همایش ها و رویداد های آینده'
                            color="white"
                        />

                        <ConferenceSlider
                            conferences={futureConference?.data}
                            color="white"
                        />

                    </Stack>
                )
            }

            {/* guests slider */}
            <Stack
                direction="column"
                gap={2}
                width='100%'
                style={{
                    paddingTop: 32,
                    paddingBottom: 32,
                    paddingRight: 16,
                    paddingLeft: 16,
                    marginTop: -16,
                    marginBottom: -16,
                }}
            >

                <Heading
                    title="اساتید و مدعوین"
                    color="black"
                />

                <HomeGuestsSlider color="primary"/>

            </Stack>

            {/* article slider */}
            {
                suggestionArticle.data.length > 0 && (
                    <Stack
                        direction="column"
                        gap={2}
                        width='100%'
                        style={{
                            background: "#009600",
                            paddingTop: 32,
                            paddingBottom: 32,
                            paddingRight: 16,
                            paddingLeft: 16,
                        }}
                    >

                        <Heading
                            title="مقالات پیشنهادی"
                            color="white"
                        />

                        <ArticleSlider
                            articles={suggestionArticle?.data}
                            color="white"
                        />

                    </Stack>
                )
            }

            {/* sponsors slider */}
            <Stack
                direction="column"
                gap={2}
                width='100%'
                style={{
                    paddingTop: 32,
                    paddingBottom: 32,
                    paddingRight: 16,
                    paddingLeft: 16,
                    marginTop: -16,
                    marginBottom: -16,
                }}
            >

                <Heading
                    title="حامیان"
                    color="black"
                />

                <HomeSponsorsSlider color="primary"/>

            </Stack>

            {/* gallery slider */}
            {
                suggestionGallery.data.length > 0 && (
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
                            marginBottom: -16,
                        }}
                    >

                        <Heading
                            title='نگارخانه پیشنهادی'
                            color="black"
                        />

                        <GallerySlider
                            galleries={suggestionGallery?.data}
                            color="black"
                        />

                    </Stack>
                )
            }

        </MainLayout>

    ) : <PageLoader/>
}

export default Home;
