//===== libraries =====//
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from "swiper";
import {Container} from "@mui/material";

//===== features =====//
import {NewsSliderCard} from "@/features/news/NewsCard";

// @ts-ignore
const NewsSlider = ({news , color}) => {

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

            <Swiper
                modules={[Pagination]}
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
                    news?.map(newsItem =>
                        <SwiperSlide
                            key={newsItem.newsId}
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                        >

                            {/* card */}
                            <NewsSliderCard
                                news={newsItem}
                                color={color}
                            />

                        </SwiperSlide>
                    )
                }

            </Swiper>

        </Container>
    )
}

export default NewsSlider;