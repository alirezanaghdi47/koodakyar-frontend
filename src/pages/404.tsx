import Head from "next/head";

//===== layouts =====//
import OtherLayout from "@/layouts/OtherLayout";

//===== components =====//
import {Empty} from "@/components/ui/Empty";

//===== assets =====//
import clientDown from "@/assets/images/client-down.svg";

const ComingSoon = () => {

    return (
        <OtherLayout>

            <Head>
                <title>خطا</title>
            </Head>

            {/* empty */}
            <Empty
                message='صفحه مورد نظر یافت نشد'
                image={clientDown}
                backButton
            />

        </OtherLayout>
    )
}

export default ComingSoon;
