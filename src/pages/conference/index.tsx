import {Fragment} from "react";
import Head from "next/head";
import Link from "next/link";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";
import {Stack, Button} from "@mui/material";
import {FiArrowLeft} from "react-icons/fi";

//===== services =====//
import {getAllConferenceBanner} from "@/services/bannerService";
import {getAllTypeConference, getFutureConference} from "@/services/conferenceService";

//===== utils =====//
import {convertType} from "@/utils/functions";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import {BannerSlider} from "@/components/ui/Banner";
import {Heading} from "@/components/ui/Heading";
import PageLoader from "@/components/ui/PageLoader";

//===== features =====//
import ConferenceSlider from "@/features/conference/ConferenceSlider";
import ConferenceType from "@/features/conference/ConferenceType";

const Conference = () => {

    const {
        isLoading: allConferenceBannerIsLoading,
        isError: allConferenceBannerIsError,
        data: allConferenceBanner
    } = useQuery(["getAllConferenceBanner"], () => getAllConferenceBanner({limit: 3, offset: 1}));

    const {
        isLoading: futureConferenceIsLoading,
        isError: futureConferenceIsError,
        data: futureConference
    } = useQuery(["getFutureConference"], () => getFutureConference({limit: 10, offset: 1}));

    const {
        isLoading: allTypeConferenceIsLoading,
        isError: allTypeConferenceIsError,
        data: allTypeConference
    } = useQuery(["getAllTypeConference"], () => getAllTypeConference({limit: 3, offset: 1}));

    return (
        !allConferenceBannerIsLoading && !allConferenceBannerIsError &&
        !futureConferenceIsLoading && !futureConferenceIsError &&
        !allTypeConferenceIsLoading && !allTypeConferenceIsError
    ) ? (

        <MainLayout>

            <Head>
                <title>همایش ها و رویدادها</title>
            </Head>

            {/* banner slider */}
            {
                allConferenceBanner?.data.length > 0 && (
                    <BannerSlider banners={allConferenceBanner?.data}/>
                )
            }

            {/* future slider */}
            {
                futureConference?.data.length > 0 && (
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

            {/* all type slider */}
            {
               allTypeConference?.data.map((conference, index) => {

                        return conference?.conferences.length > 0 && (

                            <Fragment key={index}>

                                <Heading
                                    title={` آخرین ${convertType(conference?.type)} ها `}
                                    color="black"
                                    link={
                                        <Button
                                            variant="text"
                                            color="secondary"
                                            LinkComponent={Link}
                                            href={process.env.NEXT_PUBLIC_DOMAIN + `/conference/${conference?.type}`}
                                            endIcon={<FiArrowLeft size={16}/>}
                                        >
                                            موارد دیگر
                                        </Button>
                                    }
                                />

                                <ConferenceType
                                    conferences={conference?.conferences}
                                    color="primary"
                                />

                            </Fragment>
                        )
                    }
                )
            }

        </MainLayout>

    ) : <PageLoader/>
}

export default Conference;
