import {useState} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import {AppProps} from "next/app";

//===== libraries =====//
import {SessionProvider} from "next-auth/react";
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalali";
import {CacheProvider} from '@emotion/react';
import createCache from "@emotion/cache";
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

//===== stores =====//
import {PortalProvider} from "@/stores/portalContext";

//===== modules =====//
const ProgressbarLoader = dynamic(() => import("@/components/ui/ProgressbarLoader") , {ssr: false});
const ToastNotification = dynamic(() => import("@/components/ui/ToastNotification") , {ssr: false});

//===== styles =====//
import "@/styles/addon.scss";
import theme from "@/styles/theme";

import 'nprogress/nprogress.css';
import "@/styles/libraries/nprogress.scss";

import 'swiper/css';
import 'swiper/swiper-bundle.css';
import "@/styles/libraries/swiper.scss";

import "@/styles/libraries/tiptap.scss";

import 'simplebar-react/dist/simplebar.min.css';
import '@/styles/libraries/simplebar.scss';

import 'react-rangeslider/lib/index.css';
import '@/styles/libraries/range-slider.scss';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const MyApp = ({Component, pageProps}: AppProps) => {

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnReconnect: false,
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchIntervalInBackground: false,
                retry: false,
                staleTime: 24 * 60 * 60 * 1000,
                cacheTime: 0
            }
        }
    }));

    return (
        <>

            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="prefetch" href="https://koodakyar.iran.liara.run"/>
            </Head>

            {/* progress bar loader */}
            <ProgressbarLoader/>

            {/* toast notification */}
            <ToastNotification/>

            <SessionProvider session={pageProps.session}>

                <QueryClientProvider client={queryClient}>

                    <Hydrate state={pageProps.dehydratedState}>

                        <CacheProvider value={cacheRtl}>

                            <ThemeProvider theme={theme}>

                                <CssBaseline/>

                                <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>

                                    <PortalProvider>

                                        <Component {...pageProps} />

                                    </PortalProvider>

                                </LocalizationProvider>

                            </ThemeProvider>

                        </CacheProvider>

                    </Hydrate>

                </QueryClientProvider>

            </SessionProvider>

        </>
    );
}

export default MyApp;
