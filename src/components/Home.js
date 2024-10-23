import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../css/home.module.css";
import { useCookies } from "react-cookie";

export default function Home() {
  const OPENWHETHER_API_KEY = process.env.REACT_APP_OPENWHETHER_API_KEY;
  const [weatherInfo, setWeatherInfo] = useState();
  const [cookies, setCookie] = useCookies(["accessToken"]); // 쿠키 이름을 배열로 전달합니다.
  const [member, setMember] = useState();
  const [bg, setBg] = useState();
  const iconColor = "white";
  const iconSize = "35";

  const weatherIcon = {
    "clear sky": [
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={iconColor}
      >
        <path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm6.312-10.897c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
      </svg>,
      "clear.jpg",
      "맑음",
    ],
    "few clouds": [
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={iconColor}
      >
        <path d="M20.422 11.516c-.178-3.233-3.031-5.778-6.432-5.492-1.087-1.239-2.693-2.024-4.49-2.024-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21.967 0 1.714.25 2.29.644-1.823.922-3.096 2.746-3.212 4.872-2.022.358-3.697 2.127-3.551 4.484z" />
      </svg>,
      "few_clouds.jpg",
      "구름 조금",
    ],
    "broken clouds": [
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={iconColor}
      >
        <path d="M20.422 11.516c-.178-3.233-3.031-5.778-6.432-5.492-1.087-1.239-2.693-2.024-4.49-2.024-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21.967 0 1.714.25 2.29.644-1.823.922-3.096 2.746-3.212 4.872-2.022.358-3.697 2.127-3.551 4.484z" />
      </svg>,
      "clouds.jpg",
      "흐림",
    ],
    "overcast clouds": [
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={iconColor}
      >
        <path d="M20.422 11.516c-.178-3.233-3.031-5.778-6.432-5.492-1.087-1.239-2.693-2.024-4.49-2.024-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21.967 0 1.714.25 2.29.644-1.823.922-3.096 2.746-3.212 4.872-2.022.358-3.697 2.127-3.551 4.484z" />
      </svg>,
      "clouds.jpg",
      "흐림",
    ],
    "scattered clouds": [
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={iconColor}
      >
        <path d="M20.422 11.516c-.178-3.233-3.031-5.778-6.432-5.492-1.087-1.239-2.693-2.024-4.49-2.024-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h10.291c2.406 0 4.355-1.916 4.355-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.022-2.354-2.278 0-2.118 2.104-2.597 3.488-2.512-.05-1.356.137-5.21 4.012-5.21.967 0 1.714.25 2.29.644-1.823.922-3.096 2.746-3.212 4.872-2.022.358-3.697 2.127-3.551 4.484z" />
      </svg>,
      "few_clouds.jpg",
      "구름 조금",
    ],
    thunderstorm: [
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={iconColor}
      >
        <path d="M20.422 7.516c-.178-3.232-3.031-5.777-6.432-5.491-1.087-1.24-2.693-2.025-4.49-2.025-3.172 0-5.754 2.443-5.922 5.516-2.033.359-3.578 2.105-3.578 4.206 0 2.362 1.949 4.278 4.354 4.278h1.326c.771 1.198 2.124 2 3.674 2h1.381l2.078-4.5h6.328l-2.032 4.5h2.535c2.407 0 4.356-1.916 4.356-4.278 0-2.101-1.545-3.847-3.578-4.206zm-15.395 4.484h-.673c-1.297 0-2.354-1.021-2.354-2.278 0-2.118 2.104-2.597 3.488-2.513-.05-1.355.137-5.209 4.012-5.209.967 0 1.714.25 2.29.645-1.823.921-3.096 2.745-3.212 4.871-2.022.357-3.697 2.127-3.551 4.484zm9.973 5h3l-6 7 2-5h-3l2.802-6h3.042l-1.844 4z" />
      </svg>,
      "thunderstorm.jpg",
      "천둥번개",
    ],
    "shower rain": [
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={iconColor}
      >
        <path d="M5.582 23l-1.41-1.41 3.59-3.59 1.41 1.41-3.59 3.59zm8.543-3.59l-1.41-1.41-3.59 3.59 1.41 1.41 3.59-3.59zm4.875 0l-1.41-1.41-3.59 3.59 1.41 1.41 3.59-3.59zm5-6.688c0 2.362-1.949 4.278-4.355 4.278h-10.291c-1.55 0-2.902-.802-3.674-2h-1.326c-2.405 0-4.354-1.916-4.354-4.278 0-2.101 1.545-3.846 3.578-4.206.168-3.073 2.75-5.516 5.922-5.516 1.797 0 3.403.785 4.49 2.024 3.4-.286 6.254 2.258 6.432 5.492 2.033.359 3.578 2.105 3.578 4.206zm-15.422-4.206c.116-2.126 1.389-3.95 3.212-4.872-.576-.394-1.323-.644-2.29-.644-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.256 1.057 2.278 2.354 2.278h.674c-.147-2.357 1.528-4.126 3.55-4.484z" />
      </svg>,
      "shower_rain.jpg",
      "소나기",
    ],
    "moderate rain": [
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={iconColor}
      >
        <path d="M5.582 23l-1.41-1.41 3.59-3.59 1.41 1.41-3.59 3.59zm8.543-3.59l-1.41-1.41-3.59 3.59 1.41 1.41 3.59-3.59zm4.875 0l-1.41-1.41-3.59 3.59 1.41 1.41 3.59-3.59zm5-6.688c0 2.362-1.949 4.278-4.355 4.278h-10.291c-1.55 0-2.902-.802-3.674-2h-1.326c-2.405 0-4.354-1.916-4.354-4.278 0-2.101 1.545-3.846 3.578-4.206.168-3.073 2.75-5.516 5.922-5.516 1.797 0 3.403.785 4.49 2.024 3.4-.286 6.254 2.258 6.432 5.492 2.033.359 3.578 2.105 3.578 4.206zm-15.422-4.206c.116-2.126 1.389-3.95 3.212-4.872-.576-.394-1.323-.644-2.29-.644-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.256 1.057 2.278 2.354 2.278h.674c-.147-2.357 1.528-4.126 3.55-4.484z" />
      </svg>,
      "",
      "비",
    ],
    snow: [
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={iconColor}
      >
        <path d="M14 19.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-3.75 1.25c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm8.75-1.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-3.75 1.25c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm-6.25-1.25c0 .689-.559 1.25-1.25 1.25s-1.25-.561-1.25-1.25.559-1.25 1.25-1.25 1.25.561 1.25 1.25zm-3.75 1.25c-.691 0-1.25.561-1.25 1.25s.559 1.25 1.25 1.25 1.25-.561 1.25-1.25-.559-1.25-1.25-1.25zm18.75-7.778c0 2.362-1.949 4.278-4.355 4.278h-10.291c-1.55 0-2.902-.802-3.674-2h-1.326c-2.405 0-4.354-1.916-4.354-4.278 0-2.101 1.545-3.847 3.578-4.206.168-3.073 2.75-5.516 5.922-5.516 1.797 0 3.403.785 4.49 2.024 3.4-.286 6.254 2.259 6.432 5.491 2.033.36 3.578 2.106 3.578 4.207zm-15.422-4.206c.116-2.126 1.389-3.95 3.212-4.871-.576-.395-1.323-.645-2.29-.645-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.257 1.057 2.278 2.354 2.278h.674c-.147-2.357 1.528-4.127 3.55-4.484zm13.422 4.206c0-2.075-1.979-2.618-3.488-2.513.217-1.438-.241-5.209-4.012-5.209-3.875 0-4.062 3.854-4.012 5.209-1.384-.084-3.488.395-3.488 2.513 0 1.257 1.057 2.278 2.354 2.278h10.291c1.298 0 2.355-1.021 2.355-2.278zm-5.521-3.97l-1.479.881v-1.633h-1v1.633l-1.494-.896-.506.867 1.499.896-1.499.865.537.867 1.463-.865v1.633h1v-1.633l1.467.869.533-.867-1.499-.869 1.499-.881-.521-.867z" />
      </svg>,
      "snow.jpg",
      "눈",
    ],
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getPostionCallback,
        errorCallback
      );
    }
  }, []);

  // 배경 변경
  useEffect(() => {
    document.body.style.backgroundImage = `url("/images/${bg}")`;
    // 여기 바꾸면 배경 확인 가능
    // document.body.style.backgroundImage = `url("/images/clouds.jpg")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat"; // 배경 반복 제거
    document.body.style.backgroundPosition = "center"; /* 중앙에 위치 */

    // 컴포넌트가 파괴될 때 원래 배경으로 복구
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundColor = "white";
    };
  }, [bg]);

  // 사용자 정보
  useEffect(() => {
    // 쿠키 값 가져오기
    const accessToken = cookies.accessToken; // 'token'이라는 이름의 쿠키 값을 가져옵니다.

    if (!accessToken) {
      return;
    }

    axios
      .get("http://localhost:8080/api/member", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setMember({
          nickname: response.data.nickname,
          profile_image: response.data.profile_image,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (weatherInfo?.weather) {
      setBg(weatherIcon[weatherInfo?.weather.description][1]);
    } else {
      setBg("ocean-3605547.jpg");
    }
  }, [weatherInfo]);

  /** 현재 위치 */
  function getPostionCallback(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // 날씨 불러오기
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWHETHER_API_KEY}&units=${"metric"}`
      )
      .then((response) => {
        const data = response.data;

        const tempInfo = data.main;
        const name = data.name;
        const weather = data.weather[0];

        console.log(weather);

        // 위치 상태 변경
        setWeatherInfo({
          name: name,
          temp: {
            current: tempInfo.temp,
            max: tempInfo.temp_max,
            min: tempInfo.temp_min,
          },
          weather: weather,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function errorCallback(error) {
    console.log(error);
  }

  return (
    <>
      <section className={styles.section}>
        {weatherInfo ? (
          <>
            <div className={styles.weatherContainer}>
              <div className={styles.infoContainer}>
                <div className={styles.currentTemp}>
                  <strong>{weatherInfo.temp.current}°C</strong>
                </div>
                <div>{weatherInfo.name}</div>
                <div>{weatherIcon[weatherInfo.weather.description][2]}</div>
              </div>
              <div className={styles.weatherImage}>
                {weatherIcon[weatherInfo.weather.description][0]}
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {member ? (
          <>
            <div className={styles.greeting}>
              <div className={styles.text}>
                안녕하세요, {member.nickname}님!
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.greeting}>Hello, World!</div>
          </>
        )}
      </section>
    </>
  );
}
