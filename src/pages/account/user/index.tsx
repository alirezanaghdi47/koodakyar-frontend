import Head from "next/head";
import dynamic from "next/dynamic";

//===== libraries =====//
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";

//===== services =====//
import {getAllUser} from "@/services/userService";

//===== layouts =====//
import AccountLayout from "@/layouts/AccountLayout";

//===== components =====//
import {Heading} from "@/components/ui/Heading";
import {TablePlaceholder} from "@/components/ui/Placeholder";
import {TableEmpty} from "@/components/ui/Empty";

//===== features =====//
import UserTable from "@/features/user/UserTable";

const EditUserModal = dynamic(() => import("@/features/user/EditUserModal") , {ssr: false});
const DeleteUserDialog = dynamic(() => import("@/features/user/DeleteUserDialog") , {ssr: false});

//===== assets =====//
import empty from "@/assets/images/empty.svg";

const User = () => {

    const {data: session} = useSession();

    const {
        isFetching: usersIsFetching,
        isError: usersIsError,
        data: users
    } = useQuery(
        ["getAllUser"],
        // @ts-ignore
        () => getAllUser({adminRole: session?.user?.role, limit: 10000, offset: 0}),
        // @ts-ignore
        {
            keepPreviousData: true,
            enabled: Boolean(session?.user?.role)
        }
    );

    return (
        <AccountLayout>

            <Head>
                <title>کاربران</title>
            </Head>

            {/* heading */}
            <Heading
                title="کاربران"
                color="black"
            />

            {/* table */}
            {
                !usersIsFetching && !usersIsError && users?.data.length > 0 && (
                    <UserTable tableData={users?.data}/>
                )
            }

            {/* table placeholder */}
            {
                usersIsFetching && !usersIsError && (
                    <TablePlaceholder/>
                )
            }

            {/* table empty */}
            {
                !usersIsFetching && (usersIsError || users?.data.length === 0) && (
                    <TableEmpty
                        message='کاربری یافت نشد'
                        image={empty}
                    />
                )
            }

            {/* edit modal */}
            <EditUserModal/>

            {/* delete dialog */}
            <DeleteUserDialog/>

        </AccountLayout>
    )
}

export default User;
