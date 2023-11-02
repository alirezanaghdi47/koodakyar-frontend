import {useState} from "react";

//===== libraries =====//
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectCoverflow, Pagination, Thumbs} from "swiper";
import {BreakPointHooks} from "@react-hooks-library/core";
import {Container, Grid} from "@mui/material";

//===== utils =====//
import {breakpoints} from "@/utils/constants";

//===== features =====//
import {ConferenceSliderImageCard , ConferenceSliderContentCard} from "@/features/conference/ConferenceCard";

// @ts-ignore
const ConferenceSlider = ({conferences, color}) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const {useSmaller} = BreakPointHooks(breakpoints);
    const isMobile = useSmaller("sm");

    return (
        <Container
            maxWidth="lg"
            style={{
                position: "relative",
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "start",
            }}
        >

            <Grid
                container
                spacing={4}
                columnSpacing={4}
            >

                {/* detail */}
                <Grid
                    item
                    xs={12}
                    sm={5}
                    md={6}
                    lg={7}
                    style={{order: isMobile ? 2 : 1}}
                >

                    <Swiper
                        modules={[Thumbs]}
                        speed={0}
                        // @ts-ignore
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        slidesPerView={1}
                        spaceBetween={16}
                        observer={true}
                        observeParents={true}
                        draggable={false}
                        allowTouchMove={false}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    >

                        {
                            conferences?.map(conferenceItem =>
                                <SwiperSlide
                                    key={conferenceItem?.conferenceId}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                >

                                    {/* card */}
                                    <ConferenceSliderContentCard
                                        conference={conferenceItem}
                                        color={color}
                                    />

                                </SwiperSlide>
                            )
                        }

                    </Swiper>

                </Grid>

                {/* image */}
                <Grid
                    item
                    xs={12}
                    sm={7}
                    md={6}
                    lg={5}
                    style={{order: isMobile ? 1 : 2}}
                >

                    <Swiper
                        modules={[Pagination, Autoplay, Thumbs, EffectCoverflow]}
                        effect="coverflow"
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 16,
                            modifier: 16,
                            slideShadows: false
                        }}
                        autoplay={{
                            delay: 3000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            bulletClass: `swiper-pagination-bullet ${color}-slider__bullet`,
                            bulletActiveClass: `swiper-pagination-bullet-active ${color}-slider__bullet--active`,
                        }}
                        thumbs={{swiper: thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null}}
                        loop={true}
                        centeredSlides={true}
                        slidesPerView="auto"
                        spaceBetween={16}
                        observer={true}
                        observeParents={true}
                        allowTouchMove={true}
                        draggable={true}
                        style={{
                            width: "100%",
                            height: "100%",
                            paddingBottom: 32
                        }}
                    >
                        {
                            // @ts-ignore
                            conferences?.map(conferenceItem =>
                                <SwiperSlide
                                    key={conferenceItem?.conferenceId}
                                    style={{
                                        position: "relative",
                                        width: "75%",
                                        height: "auto",
                                    }}
                                >

                                    {/* card */}
                                    <ConferenceSliderImageCard conference={conferenceItem}/>

                                </SwiperSlide>
                            )
                        }

                    </Swiper>

                </Grid>

            </Grid>

        </Container>
    )
}
export default ConferenceSlider;
