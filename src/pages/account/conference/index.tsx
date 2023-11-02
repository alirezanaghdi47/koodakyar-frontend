import {useContext} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {IconButton, Tooltip} from "@mui/material";
import {FiPlus} from "react-icons/fi";

//===== services =====//
import {getAllConference} from "@/services/conferenceService";

//===== stores =====//
import {PortalContext} from "@/stores/portalContext";

//===== layouts =====//
import AccountLayout from "@/layouts/AccountLayout";

//===== components =====//
import {Heading} from "@/components/ui/Heading";
import {TablePlaceholder} from "@/components/ui/Placeholder";
import {TableEmpty} from "@/components/ui/Empty";

//===== features =====//
import ConferenceTable from "@/features/conference/ConferenceTable";

const AddConferenceModal = dynamic(() => import("@/features/conference/AddConferenceModal") , {ssr: false});
const EditConferenceModal = dynamic(() => import("@/features/conference/EditConferenceModal") , {ssr: false});
const DeleteConferenceDialog = dynamic(() => import("@/features/conference/DeleteConferenceDialog") , {ssr: false});

//===== assets =====//
import empty from "@/assets/images/empty.svg";

const Conference = () => {

    const {data: session} = useSession();
    const {_onOpenModal} = useContext(PortalContext);

    const {
        isFetching: conferencesIsFetching,
        isError: conferencesIsError,
        data: conferences
    } = useQuery(
        ["getAllConference"],
        // @ts-ignore
        () => getAllConference({adminRole: session?.user?.role, limit: 10000, offset: 0}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(session?.user?.role)
        }
    );

    return (
        <AccountLayout>

            <Head>
                <title>همایش ها و رویداد ها</title>
            </Head>

            {/* heading */}
            <Heading
                title='همایش ها و رویدادها'
                color="black"
                button={
                    <Tooltip title="افزودن">
                        <IconButton
                            color="secondary"
                            onClick={() => _onOpenModal("add-1")}
                        >
                            <FiPlus size={20}/>
                        </IconButton>
                    </Tooltip>
                }
            />

            {/* table */}
            <>
                {
                    !conferencesIsFetching && !conferencesIsError && conferences?.data.length > 0 && (
                        <ConferenceTable tableData={conferences?.data}/>
                    )
                }
            </>

            {/* table placeholder */}
            <>
                {
                    conferencesIsFetching && !conferencesIsError && (
                        <TablePlaceholder tableData={conferences?.data}/>
                    )
                }
            </>

            {/* table empty */}
            <>
                {
                    !conferencesIsFetching && (conferencesIsError || conferences?.data.length === 0) && (
                        <TableEmpty
                            message='همایش یا رویدادی یافت نشد'
                            image={empty}
                        />
                    )
                }
            </>

            {/* add modal */}
            <AddConferenceModal/>

            {/* edit modal */}
            <EditConferenceModal/>

            {/* delete dialog */}
            <DeleteConferenceDialog/>

        </AccountLayout>
    )
}

export default Conference;
