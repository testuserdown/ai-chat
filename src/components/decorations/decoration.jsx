import "./decorations.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { heros } from "../../mocks/ai";
import { SiPolygon } from "react-icons/si";
import { useNavigate } from "react-router-dom";

// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

export default function AISwiper() {
  const navigate = useNavigate();
  return (
    <div className="ai-swiper frame gradient-bg">
      <h1 className="w100 df jcc chat-title">Omni Gods</h1>
      <h2 className="w100 df jcc">Select to talk to your favorite character</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        navigation={true}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 120,
          modifier: -5,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {heros.map((hero, index) => (
          <SwiperSlide
            className="swiper-slide"
            key={index}
            onClick={() => navigate(`/chat/${index}`)}
          >
            <figure className="frame">
              <img src={hero.img} alt="hero" />
              <span className="corner-right-bottom"></span>
              <span className="corner-left-bottom"></span>
            </figure>
            <h1 className="w100">
              {hero.name}{" "}
              <i>
                <SiPolygon />
              </i>
            </h1>
            <span className="w100 df fdc aic">
              <strong>ABOUT:</strong> <br />
              {hero.description}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
      <span className="corner-right-bottom"></span>
      <span className="corner-left-bottom"></span>
    </div>
  );
}
