import Head from "next/head";

//===== libraries =====//
import {Stack} from "@mui/material";

//===== layouts =====//
import MainLayout from "@/layouts/MainLayout";

//===== components =====//
import {Heading} from "@/components/ui/Heading";

//===== features =====//
import AboutUsDetail from "@/features/about-us/AboutUsDetail";
import AboutUsQA from "@/features/about-us/AboutUsQA";
import AboutUsCoWorker from "@/features/about-us/AboutUsCoWorker";
import AboutUsContactUs from "@/features/about-us/AboutUsContactUs";

const News = () => {

    return (
        <MainLayout>

            <Head>
                <title>درباره ما</title>
            </Head>

            {/* detail */}
            <>
                {/*<Heading*/}
                {/*    title="درباره ما"*/}
                {/*    color="black"*/}
                {/*    centered*/}
                {/*/>*/}

                <AboutUsDetail/>
            </>

            {/* coworker */}
            <Stack
                direction="column"
                gap={2}
                width='100%'
                style={{
                    background: "#D20A00",
                    paddingTop: 64,
                    paddingBottom: 64,
                    paddingRight: 32,
                    paddingLeft: 32,
                    marginBottom: 16,
                }}
            >

                {/*<Heading*/}
                {/*    title="تیم ما"*/}
                {/*    color="white"*/}
                {/*    centered*/}
                {/*/>*/}

                <AboutUsCoWorker/>

            </Stack>

            {/* qa */}
            <>
                {/*<Heading*/}
                {/*    title="پرسش و پاسخ"*/}
                {/*    color="black"*/}
                {/*    centered*/}
                {/*/>*/}

                <AboutUsQA/>
            </>

            {/* contact us */}
            <Stack
                direction="column"
                gap={2}
                width='100%'
                style={{
                    background: "#0658A5",
                    paddingTop: 64,
                    paddingBottom: 64,
                    paddingRight: 32,
                    paddingLeft: 32,
                    marginTop: 16,
                    marginBottom: -16
                }}
            >

                {/*<Heading*/}
                {/*    title="تماس با ما"*/}
                {/*    color="white"*/}
                {/*    centered*/}
                {/*/>*/}

                <AboutUsContactUs/>

            </Stack>

        </MainLayout>
    )
}

export default News;
