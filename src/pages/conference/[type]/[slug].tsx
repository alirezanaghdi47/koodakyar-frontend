import {useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";

//===== services =====//
import {getSingleConference} from "@/services/conferenceService";

//===== utils =====//
import {convertType} from "@/utils/functions";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageLoader from "@/components/ui/PageLoader";

//===== features =====//
import ConferenceContent from "@/features/conference/ConferenceContent";

//===== variables =====//
const breadcrumbs = [
    {id: 1, title: 'خانه', href: '/'},
    {id: 2, title: 'همایش ها و رویدادها', href: '/conference'},
];

// @ts-ignore
const SingleConference = () => {

    const router = useRouter();

    const {
        isLoading: singleConferenceIsLoading,
        isError: singleConferenceIsError,
        data: singleConference
    } = useQuery(
        ["getSingleConference"],
        () => getSingleConference({slug: router.query.slug}),
        // @ts-ignore
        {enabled: Boolean(router.query.slug)}
    );

    useEffect(() => {
        if (singleConferenceIsError || (!singleConferenceIsLoading && !singleConference?.data) || (!singleConferenceIsLoading && Object.keys(singleConference?.data).length === 0)){
            router.replace("/404");
        }
    } , [singleConferenceIsLoading , singleConferenceIsError , singleConference]);

    return !singleConferenceIsLoading && !singleConferenceIsError && singleConference?.data && Object.keys(singleConference?.data).length > 0 ? (

        <MainLayout>

            <Head>
                <title>{singleConference?.data?.title}</title>
            </Head>

            {/* breadcrumb */}
            <Breadcrumbs
                links={
                    [
                        ...breadcrumbs,
                        {
                            id: 3,
                            title: convertType(singleConference?.data?.type),
                            href: "/conference/" + singleConference?.data?.type
                        }
                    ]
                }
            />

            {/* content */}
            <ConferenceContent conference={singleConference?.data}/>

        </MainLayout>

    ) : <PageLoader/>
}

export default SingleConference;
