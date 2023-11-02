import Head from "next/head";

//===== layouts =====//
import OtherLayout from "@/layouts/OtherLayout";

//===== components =====//
import {Empty} from "@/components/ui/Empty";

//===== assets =====//
import serverDown from "@/assets/images/server-down.svg";

const ServerDown = () => {

    return (
        <OtherLayout>

            <Head>
                <title>خطا</title>
            </Head>

            {/* empty */}
            <Empty
                message='با عرض پوزش خطایی رخ داده است'
                image={serverDown}
                backButton
            />

        </OtherLayout>
    )
}

export default ServerDown;
