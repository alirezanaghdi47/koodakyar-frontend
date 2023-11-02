import {useState} from "react";
import Head from "next/head";

//===== layouts =====//
import AccountLayout from "@/layouts/AccountLayout";

//===== components =====//
import {Heading} from "@/components/ui/Heading";

//===== features =====//
import ProfileTabs from "@/features/profile/ProfileTabs";
import ProfileInformation from "@/features/profile/ProfileInformation";
import ProfileSecurity from "@/features/profile/ProfileSecurity";

const Profile = () => {

    const [page, setPage] = useState(0);

    return (
        <AccountLayout>

            <Head>
                <title>حساب کاربری</title>
            </Head>

            {/* heading */}
            <Heading
                title="حساب کاربری"
                color="black"
            />

            {/* tabs */}
            <ProfileTabs
                page={page}
                setPage={(value) => setPage(value)}
            />

            {/* information */}
            {
                page === 0 && (
                    <ProfileInformation/>
                )
            }

            {/* security */}
            {
                page === 1 && (
                    <ProfileSecurity/>
                )
            }

        </AccountLayout>
    )
}

export default Profile;
