import Head from "next/head";
import {GetServerSideProps} from "next";

//===== libraries =====//
import {getSession} from "next-auth/react";

//===== layouts =====//
import AuthLayout from "@/layouts/AuthLayout";

//===== features =====//
import SignInForm from "@/features/sign-in/SignInForm";

const SignIn = () => {

    return (
        <AuthLayout>

            <Head>
                <title>ورود</title>
            </Head>

            {/* form */}
            <SignInForm/>

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

export default SignIn;
