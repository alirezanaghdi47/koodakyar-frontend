import Head from "next/head";
import {GetServerSideProps} from "next";

//===== libraries =====//
import {getSession} from "next-auth/react";

//===== layouts =====//
import AuthLayout from "@/layouts/AuthLayout";

//===== features =====//
import SignUpForm from "@/features/sign-up/SignUpForm";

const SignUp = () => {

    return (
        <AuthLayout>

            <Head>
                <title>عضویت</title>
            </Head>

            {/* form */}
            <SignUpForm/>

        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, res, ...context}) => {

    const session = await getSession({req, res});

    if (session?.user && Object.keys(session?.user).length > 0) {
        return {
            redirect: {
                permanent: false,
                destination: context.query.callbackUrl ? context.query.callbackUrl : "/"
            }
        }
    } else {
        return {
            props: {}
        }
    }
}

export default SignUp;
