import Image from "next/image";
import Link from "next/link";

//===== libraries =====//
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper";
import {Box, Container} from "@mui/material";

//===== utils =====//
import {placeholderDataUrl} from "@/utils/constants";

// @ts-ignore
export const BannerSlider = ({banners}) => {

    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    pauseOnMouseEnter: false
                }}
                spaceBetween={16}
                slidesPerView={1}
                allowTouchMove={true}
                draggable={true}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >

                {
                    // @ts-ignore
                    banners?.map(banner =>
                        <SwiperSlide
                            key={banner.bannerId}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 8,
                            }}
                        >

                            {
                                banner.source ? (

                                    <Link
                                        href={banner.source}
                                    >

                                        <Box
                                            className="aspect-ratio aspect-ratio__3-1"
                                            style={{
                                                background: "#e5e7eb",
                                                borderRadius: 8,
                                            }}
                                        >

                                            <Image
                                                src={banner?.thumbnail}
                                                alt="بنر"
                                                fill
                                                placeholder="blur"
                                                quality={75}
                                                blurDataURL={placeholderDataUrl}
                                                style={{borderRadius: 8}}
                                            />

                                        </Box>

                                    </Link>

                                ) : (

                                    <Box
                                        className="aspect-ratio aspect-ratio__3-1"
                                        style={{
                                            background: "#fafafa",
                                            borderRadius: 8,
                                        }}
                                    >

                                        <Image
                                            src={banner?.thumbnail}
                                            alt="بنر"
                                            fill
                                            placeholder="blur"
                                            quality={75}
                                            blurDataURL={placeholderDataUrl}
                                            style={{borderRadius: 8}}
                                        />

                                    </Box>

                                )
                            }

                        </SwiperSlide>
                    )
                }

            </Swiper>

        </Container>
    )
}