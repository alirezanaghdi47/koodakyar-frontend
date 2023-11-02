import Image from "next/image";

//===== libraries =====//
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper";
import {Box, Container, Stack, Typography} from "@mui/material";

//===== utils =====//
import {placeholderDataUrl} from "@/utils/constants";

//===== assets =====//
import logo from "@/assets/images/logo.svg";

//===== variables =====//
const sponsors = [
    {id: 1, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
    {id: 2, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
    {id: 3, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
    {id: 4, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
    {id: 5, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
    {id: 6, title: "سهیل نادری", value: "برنامه نویس فرانت اند", image: logo},
]

// @ts-ignore
const HomeSponsorsSlider = ({color}) => {

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "start",
            }}
        >

            <Swiper
                modules={[Pagination , Autoplay]}
                autoplay={{
                    delay: 3000,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                    bulletClass: `swiper-pagination-bullet ${color}-slider__bullet`,
                    bulletActiveClass: `swiper-pagination-bullet-active ${color}-slider__bullet--active`,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                }}
                spaceBetween={16}
                allowTouchMove
                style={{
                    width: "100%",
                    height: "100%",
                    paddingBottom: 32
                }}
            >

                {
                    // @ts-ignore
                    sponsors.map(sponsorsItem =>
                        <SwiperSlide
                            key={sponsorsItem.id}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >

                            <Stack
                                direction="row"
                                gap={2}
                                justifyContent="center"
                                alignItems="center"
                            >

                                <Box
                                    style={{
                                        position: "relative",
                                        width: 75,
                                        height: 75,
                                        background: "#fafafa",
                                        borderRadius: "50%",
                                        overflow: "hidden"
                                    }}
                                >

                                    <Image
                                        src={sponsorsItem.image}
                                        alt={sponsorsItem.title}
                                        fill
                                        placeholder="blur"
                                        quality={75}
                                        blurDataURL={placeholderDataUrl}
                                    />

                                </Box>

                                <Stack
                                    direction="column"
                                    gap={1}
                                    justifyContent="center"
                                    alignItems="start"
                                >

                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                        fontWeight="bold"
                                    >
                                        {sponsorsItem.title}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        fontWeight="bold"
                                    >
                                        {sponsorsItem.value}
                                    </Typography>

                                </Stack>

                            </Stack>

                        </SwiperSlide>
                    )
                }

            </Swiper>

        </Container>
    )
}

export default HomeSponsorsSlider;