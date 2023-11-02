import {useRouter} from "next/router";

//===== libraries =====//
import {useSession} from "next-auth/react";
import axios from "axios";
import {useMutation} from "@tanstack/react-query";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";
import {Button, Container, Grid,} from "@mui/material";
import {FiEdit2} from "react-icons/fi";

//===== services =====//
import {editProfile} from "@/services/userService";

//===== utils =====//
import {profileSchema} from "@/utils/validations";

//===== modules =====//
import TextInput from "@/components/ui/TextInput";
import ImageInput from "@/components/ui/ImageInput";
const ProfileInformation = () => {

    const {data: session} = useSession();
    const router = useRouter();

    const {mutate, isLoading} = useMutation(editProfile, {
        onSuccess: async (data) => {
            if (data.status === "success") {
                await axios.get(`/api/auth/session?${data?.data.avatar ? "avatar=" + data?.data.avatar + "&" : "&"}firstName=${data?.data.firstName}&lastName=${data?.data.lastName}&email=${data?.data.email}&phoneNumber=${data?.data.phoneNumber}`);
                router.reload();
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        },
        onError: error => {
            toast.error("خطا در ویرایش اطلاعات کاربری");
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            avatar: null,
            firstName: session?.user?.firstName ? session?.user?.firstName : '',
            lastName: session?.user?.lastName ? session?.user?.lastName : '',
            userName: session?.user?.userName ? session?.user?.userName : '',
            email: session?.user?.email ? session?.user?.email : '',
            phoneNumber: session?.user?.phoneNumber ? session?.user?.phoneNumber : '',
        },
        validationSchema: profileSchema,
        onSubmit: async (data) => {
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
                justifyContent: "start",
                alignItems: "center",
            }}
        >

            <Grid
                container
                spacing={2}
            >

                <Grid
                    item
                    xs={12}
                >

                    {/* avatar input */}
                    <ImageInput
                        label="آواتار"
                        hint="بهترین ابعاد برای آواتار 100x100 پیکسل است"
                        name="avatar"
                        preview={session?.user?.avatar}
                        value={formik.values.avatar}
                        onChange={(value) => formik.setFieldValue("avatar", value)}
                        touched={formik.touched.avatar}
                        error={formik.errors.avatar}
                        aspectRatio="1-1"
                        circle
                        previewStyle={{
                            width: 150,
                            height: 150
                        }}
                        style={{width: "max-content"}}
                    />

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                >

                    {/* text input */}
                    <TextInput
                        name="firstName"
                        label="نام"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        touched={formik.touched.firstName}
                        error={formik.errors.firstName}
                        style={{width: "100%"}}
                    />

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                >

                    {/* text input */}
                    <TextInput
                        name="lastName"
                        label="نام خانوادگی"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        touched={formik.touched.lastName}
                        error={formik.errors.lastName}
                        style={{width: "100%"}}
                    />

                </Grid>

                <Grid
                    item
                    xs={12}
                >

                    {/* text input */}
                    <TextInput
                        name="userName"
                        label="نام کاربری"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        touched={formik.touched.userName}
                        error={formik.errors.userName}
                        disabled
                        style={{width: "100%"}}
                    />

                </Grid>

                <Grid
                    item
                    xs={12}
                >

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

                </Grid>

                <Grid
                    item
                    xs={12}
                >

                    {/* text input */}
                    <TextInput
                        name="phoneNumber"
                        label="شماره همراه"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        touched={formik.touched.phoneNumber}
                        error={formik.errors.phoneNumber}
                        style={{width: "100%"}}
                    />

                </Grid>

                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center"
                    }}
                >

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

                </Grid>

            </Grid>

        </Container>
    )
}

export default ProfileInformation;