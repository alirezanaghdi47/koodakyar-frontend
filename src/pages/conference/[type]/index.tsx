import {useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router";

//===== libraries =====//
import {useQuery} from "@tanstack/react-query";

//===== services =====//
import {getTypeConference} from "@/services/conferenceService";

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
import ConferenceList from "@/features/conference/ConferenceList";

//===== variables =====//
const breadcrumbs = [
    {id: 1, title: 'خانه', href: '/'},
    {id: 2, title: 'همایش ها و رویدادها', href: '/conference'},
];

const TypeConference = () => {

    const router = useRouter();
    const {limit, offset, onPaginate} = usePagination({limit: 6});

    const {
        isFetching: conferenceTypeIsFetching,
        isError: conferenceTypeIsError,
        data: conferenceType,
    } = useQuery(
        ["getTypeConference" , {type: router.query.type,limit: limit , offset: offset}],
        () => getTypeConference({type: router.query.type, limit: limit, offset: offset}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(router.query.type),
        }
    );

    useEffect(() => {
        if (conferenceTypeIsError || (!conferenceTypeIsFetching && !conferenceType?.data) || (!conferenceTypeIsFetching && Object.keys(conferenceType?.data).length === 0)){
            router.replace("/404");
        }
    } , [conferenceTypeIsFetching , conferenceTypeIsError , conferenceType]);

    return !conferenceTypeIsFetching && !conferenceTypeIsError && conferenceType?.data.length > 0 ? (

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
                count={conferenceType?.count}
            />

            {/* list */}
            <ConferenceList conferences={conferenceType?.data}/>

            {/* pagination */}
            <Pagination
                pageCount={Math.ceil(conferenceType?.count / limit)}
                currentPage={offset}
                onPaginate={onPaginate}
            />

        </MainLayout>

    ) : <PageLoader/>
}

export default TypeConference;
