import {useEffect} from "react";
import {Router} from "next/router";

//===== libraries =====//
import NProgress from "nprogress/nprogress";
const ProgressbarLoader = () => {

    NProgress.configure({
        easing: 'ease',
        speed: 500,
        showSpinner: false
    });

    useEffect(() => {

        const handleRouteStart = () => NProgress.start();
        const handleRouteDone = () => NProgress.done();

        Router.events.on("routeChangeStart", handleRouteStart);
        Router.events.on("routeChangeComplete", handleRouteDone);
        Router.events.on("routeChangeError", handleRouteDone);

        return () => {
            Router.events.off("routeChangeStart", handleRouteStart);
            Router.events.off("routeChangeComplete", handleRouteDone);
            Router.events.off("routeChangeError", handleRouteDone);
        };

    }, [Router]);

}

export default ProgressbarLoader;