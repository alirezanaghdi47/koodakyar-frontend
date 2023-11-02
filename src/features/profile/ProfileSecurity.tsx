import {useRouter} from "next/router";

//===== libraries =====//
import {signOut, useSession} from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";
import {Container, Button, Stack} from "@mui/material";
import {FiEdit2} from "react-icons/fi";

//===== services =====//
import {editPassword} from "@/services/userService";

//===== utils =====//
import {securitySchema} from "@/utils/validations";

//===== components =====//
import PasswordInput from "@/components/ui/PasswordInput";
const ProfileSecurity = () => {

    const router = useRouter();
    const {data: session} = useSession();

    const {mutate, isLoading} = useMutation(editPassword, {
        onSuccess: data => {
            if (data.status === "success") {
                signOut({redirect: false, callbackUrl: ""})
                    .then(res => {
                        router.replace("/");
                        toast.success(data.message);
                    });
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در ویرایش رمز عبور");
        }
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            newPasswordRepeat: "",
        },
        validationSchema: securitySchema,
        onSubmit: async (data) => {
            // @ts-ignore
            await mutate({
                ...data,
                adminRole: session?.user?.role,
                userId: session?.user?.id
            });
        }
    });

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "end",
            }}
        >

            <Stack
                direction="column"
                gap={2}
                justifyContent="center"
                alignItems="end"
                width="100%"
            >

                {/* password input */}
                <PasswordInput
                    name="currentPassword"
                    label="رمز عبور فعلی"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    touched={formik.touched.currentPassword}
                    error={formik.errors.currentPassword}
                    style={{width: "100%"}}
                />

                {/* password input */}
                <PasswordInput
                    name="newPassword"
                    label="رمز عبور جدید"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    touched={formik.touched.newPassword}
                    error={formik.errors.newPassword}
                    style={{width: "100%"}}
                />

                {/* password input */}
                <PasswordInput
                    name="newPasswordRepeat"
                    label="تکرار رمز عبور جدید"
                    value={formik.values.newPasswordRepeat}
                    onChange={formik.handleChange}
                    touched={formik.touched.newPasswordRepeat}
                    error={formik.errors.newPasswordRepeat}
                    style={{width: "100%"}}
                />

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FiEdit2 size={16}/>}
                    disabled={isLoading}
                    onClick={() => formik.handleSubmit()}
                    style={{marginTop: 16}}
                >
                    ویرایش
                </Button>

            </Stack>

        </Container>
    )
}

export default ProfileSecurity;