import {useRouter} from "next/router";
import Link from "next/link";

//===== libraries =====//
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";
import {Stack, Button, Typography} from "@mui/material";
import {FiCheck} from "react-icons/fi";

//===== services =====//
import {register} from "@/services/userService";

//===== utils =====//
import {registerSchema} from "@/utils/validations";

//===== components =====//
import PasswordInput from "@/components/ui/PasswordInput";
import TextInput from "@/components/ui/TextInput";
const SignUpForm = () => {

    const router = useRouter();

    const {mutate , isLoading} = useMutation(register , {
        onSuccess: data => {
            if (data.status === "success"){
                toast.success(data.message);
                router.replace("/auth/sign-in");
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در عضویت کاربر");
        }
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            passwordRepeat: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (data) => {
            await mutate(data);
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
                عضویت
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

            {/* text input */}
            <TextInput
                name="email"
                label="ایمیل"
                value={formik.values.email}
                onChange={formik.handleChange}
                touched={formik.touched.email}
                error={formik.errors.email}
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

            {/* password input */}
            <PasswordInput
                name="passwordRepeat"
                label="تکرار رمز عبور"
                value={formik.values.passwordRepeat}
                onChange={formik.handleChange}
                touched={formik.touched.passwordRepeat}
                error={formik.errors.passwordRepeat}
                style={{width: "100%"}}
            />

            <Button
                variant="contained"
                color="primary"
                startIcon={<FiCheck size={16}/>}
                disabled={isLoading}
                onClick={() => formik.handleSubmit()}
                fullWidth
                style={{marginTop: 16}}
            >
                عضویت
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
                     اگر حساب کاربری دارید
                </Typography>

                <Button
                    variant="text"
                    color="info"
                    LinkComponent={Link}
                    href={process.env.NEXT_PUBLIC_DOMAIN + `/auth/sign-in?callbackUrl=${process.env.NEXT_PUBLIC_DOMAIN + "/auth/sign-up"}`}
                    size="small"
                >
                    وارد شوید
                </Button>

            </Stack>

        </Stack>
    )
}

export default SignUpForm;