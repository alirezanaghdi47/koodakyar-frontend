import {useState} from "react";
import Image from "next/image";

//===== libraries =====//
import {Autoplay, Navigation, Pagination, Thumbs} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {alpha, Box, Stack} from "@mui/material";

//===== modules =====//
import Modal from "@/components/ui/Modal";
const ImageSlideshow = ({title, isOpen, onClose, slides, aspectRatio}) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <Modal
            title={title}
            isOpenModal={isOpen}
            onCloseModal={onClose}
        >

            <Stack
                direction="column"
                justifyContent='space-between'
                alignItems="center"
                gap={2}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >

                {/* slider */}
                <Swiper
                    onBeforeInit={(swiper) => {
                        setActiveSlide(swiper.realIndex);
                    }}
                    onSlideChange={(swiper) => {
                        setActiveSlide(swiper.realIndex);
                    }}
                    modules={[Navigation, Pagination, Autoplay, Thumbs]}
                    autoplay={{
                        delay: 3000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    thumbs={{swiper: thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null}}
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={16}
                    observer={true}
                    observeParents={true}
                    allowTouchMove={true}
                    draggable={true}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {
                        slides.map((slideItem, index) =>
                            <SwiperSlide
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "relative",
                                    width: "100%",
                                    height: "100%"
                                }}
                            >

                                <Box
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                    }}
                                >

                                    <Box
                                        className={`aspect-ratio aspect-ratio__${aspectRatio}`}
                                        style={{
                                            background: "#e5e7eb",
                                            borderRadius: 8,
                                        }}
                                    >

                                        <Image
                                            fill
                                            alt="image"
                                            src={slideItem}
                                            quality={100}
                                            style={{borderRadius: 8}}
                                        />

                                    </Box>

                                </Box>

                            </SwiperSlide>
                        )
                    }

                </Swiper>

                {/* tabs */}
                <Swiper
                    modules={[Thumbs]}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={16}
                    observer={true}
                    observeParents={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                        },
                        480: {
                            slidesPerView: 2,
                        },
                        576: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        992: {
                            slidesPerView: 5,
                        },
                        1200: {
                            slidesPerView: 6,
                        },
                    }}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                >

                    {
                        slides.map((slideItem, index) =>
                            <SwiperSlide
                                key={index}
                                style={{
                                    width: "100%",
                                    cursor: "pointer",
                                }}
                            >

                                <Box
                                    className="aspect-ratio aspect-ratio__1-1"
                                    style={{
                                        background: "#e5e7eb",
                                        borderRadius: 8,
                                    }}
                                >

                                    {
                                        activeSlide !== index && (
                                            <Box
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    zIndex: 10,
                                                    width: "100%",
                                                    height: "100%",
                                                    background: alpha("#1f2937" , 0.80),
                                                    borderRadius: 8,
                                                    transition: "all ease 0.2s"
                                                }}
                                            />
                                        )
                                    }

                                    <Image
                                        fill
                                        alt="image"
                                        src={slideItem}
                                        quality={50}
                                        style={{borderRadius: 8}}
                                    />

                                </Box>

                            </SwiperSlide>
                        )
                    }

                </Swiper>

            </Stack>

        </Modal>
    )
}

export default ImageSlideshow;