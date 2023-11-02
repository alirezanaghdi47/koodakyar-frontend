import {useRouter} from "next/router";
import Link from "next/link";

//===== libraries =====//
import {signIn} from "next-auth/react";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";
import {Button, Stack, Typography} from "@mui/material";
import {FiCheck} from "react-icons/fi";

//===== utils =====//
import {loginSchema} from "@/utils/validations";

//===== components =====//
import PasswordInput from "@/components/ui/PasswordInput";
import TextInput from "@/components/ui/TextInput";

const SignInForm = () => {

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (data) => {

            const response = await signIn("credentials", {
                ...data,
                redirect: false,
                callbackUrl: ""
            });

            if (response?.ok) {
                router.replace("/");
                toast.success("به کودکیار خوش آمدید");
            } else {
                toast.error(response?.error);
            }

        }
    });

    return (
        <Stack
            direction="column"
            gap={2}
            justifyContent="center"
            alignItems="center"
            width="100%"
        >

            <Typography
                variant="h4"
                color="textPrimary"
                fontWeight="bold"
            >
                ورود
            </Typography>

            {/* text input */}
            <TextInput
                name="userName"
                label="نام کاربری"
                value={formik.values.userName}
                onChange={formik.handleChange}
                touched={formik.touched.userName}
                error={formik.errors.userName}
                style={{width: "100%"}}
            />

            {/* password input */}
            <PasswordInput
                name="password"
                label="رمز عبور"
                value={formik.values.password}
                onChange={formik.handleChange}
                touched={formik.touched.password}
                error={formik.errors.password}
                style={{width: "100%"}}
            />

            <Button
                variant="contained"
                color="primary"
                startIcon={<FiCheck size={16}/>}
                // disabled={isLoading}
                onClick={() => formik.handleSubmit()}
                fullWidth
                style={{marginTop: 16}}
            >
                ورود
            </Button>

            <Stack
                direction="row"
                gap={1}
                justifyContent="center"
                alignItems="center"
                width="100%"
            >

                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    fontWeight="bold"
                >
                    حساب کاربری ندارید ؟
                </Typography>

                <Button
                    variant="text"
                    color="info"
                    LinkComponent={Link}
                    href={process.env.NEXT_PUBLIC_DOMAIN + `/auth/sign-up?callbackUrl=${process.env.NEXT_PUBLIC_DOMAIN + "/auth/sign-in"}`}
                    size="small"
                >
                    عضو شوید
                </Button>

            </Stack>

        </Stack>
    )
}

export default SignInForm;