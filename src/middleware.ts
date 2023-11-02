import {withAuth} from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({token , session}) => {
            return Boolean(token?.role === process.env.NEXT_PUBLIC_ADMIN_ROLE);
        },
    },
});

export const config = {matcher: ["/account/:path*"]}