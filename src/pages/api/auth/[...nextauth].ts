import NextAuth, {AuthOptions} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/services/userService";
import jwt_decode from "jwt-decode";
import {NextApiRequest, NextApiResponse} from "next";

const authOptions = (req: NextApiRequest): AuthOptions => ({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: '/auth/sign-in',
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {
                userName: {
                    label: "Email",
                    type: "userName",
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            async authorize(credentials) {
                const response = await login({userName: credentials?.userName, password: credentials?.password});
                if (response?.ok || response.message === "ورود با موفقیت انجام شد") {
                    return jwt_decode(response.data);
                } else {
                    throw new Error(response.message)
                }
            },
        }),
    ],
    callbacks: {
        // @ts-ignore
        jwt: async ({token, user}) => {
            if (user) token = user;
            if (req.query?.avatar) token.avatar = req.query?.avatar;
            if (req.query?.firstName) token.firstName = req.query?.firstName;
            if (req.query?.lastName) token.lastName = req.query?.lastName;
            if (req.query?.email) token.email = req.query?.email;
            if (req.query?.phoneNumber) token.phoneNumber = req.query?.phoneNumber;
            return token;
        },
        // @ts-ignore
        session: ({session, token, user}) => {
            if (token) session.user = token;
            return session;
        },
    },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, authOptions(req));
}

export default handler;