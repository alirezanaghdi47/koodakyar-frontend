import localFont from "next/font/local";

//===== libraries =====//
import {Toaster} from "react-hot-toast";

//===== styles =====//
import theme from "@/styles/theme";

//===== variables =====//
const vazirFD = localFont({src: './../../assets/fonts/Vazirmatn-FD-Bold.woff2'});

const ToastNotification = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                position: 'bottom-center',
                duration: 1500,
                style: {
                    background: theme.palette.background.paper,
                    fontSize: theme.typography.body2.fontSize,
                    fontFamily: vazirFD.style.fontFamily,
                    lineHeight: 1.5,
                    color: theme.palette.text.primary,
                    boxShadow: theme.shadows[3]
                }
            }}
            containerStyle={{
                margin: 32
            }}
        />
    )
}

export default ToastNotification;