import Head from "next/head";

//===== layouts =====//
import OtherLayout from "@/layouts/OtherLayout";

//===== components =====//
import {Empty} from "@/components/ui/Empty";

//===== assets =====//
import comingSoon from "@/assets/images/coming-soon.svg";

const ComingSoon = () => {

    return (
        <OtherLayout>

            <Head>
                <title>بزودی</title>
            </Head>

            {/* empty */}
            <Empty
                message='بزودی میزبان شما خواهیم بود'
                image={comingSoon}
                backButton
                homeButton
                socialMedia
            />

        </OtherLayout>
    )
}

export default ComingSoon;
