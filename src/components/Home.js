import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../css/home.module.css";
import { useCookies } from "react-cookie";
import useMemberStore from "../../src/store";

export default function Home() {
  const ICON_PATH = process.env.REACT_APP_ICON_PATH;
  const OPENWHETHER_API_KEY = process.env.REACT_APP_OPENWHETHER_API_KEY;
  const [weatherInfo, setWeatherInfo] = useState();
  const [cookies, setCookies] = useCookies(["accessToken"]); // 쿠키 이름을 배열로 전달합니다.
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState(new Set());

  const { getMemberInfo } = useMemberStore();
  const [bg, setBg] = useState();
  const [inputTodo, setInputTodo] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [memberInfo, setMemberInfo] = useState({
    nickname: "",
    profile_image: "",
  });

  const weatherData = {
    "clear sky": [`${ICON_PATH}/clear.svg`, "clear.jpg", "맑음"],
    "few clouds": [
      `${ICON_PATH}/few_clouds.svg`,
      "few_clouds.jpg",
      "구름 조금",
    ],
    "broken clouds": [`${ICON_PATH}/clouds.svg`, "clouds.jpg", "흐림"],
    "overcast clouds": [`${ICON_PATH}/clouds.svg`, "clouds.jpg", "흐림"],
    "scattered clouds": [
      `${ICON_PATH}/few_clouds.svg`,
      "few_clouds.jpg",
      "구름 조금",
    ],
    thunderstorm: [
      `${ICON_PATH}/thunderstorm.svg`,
      "thunderstorm.jpg",
      "천둥번개",
    ],
    "shower rain": [
      `${ICON_PATH}/shower_rain.svg`,
      "shower_rain.jpg",
      "소나기",
    ],
    "moderate rain": [`${ICON_PATH}/rain.svg`, "", "비"],
    snow: [`${ICON_PATH}/snow.svg`, "snow.jpg", "눈"],
    mist: [`${ICON_PATH}/mist.png`, "mist.jpg", "안개"],
    fog: [`${ICON_PATH}/mist.png`, "mist.jpg", "흐림"],
  };

  /** 사용자 위치 불러오기 */
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

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const accessToken = cookies.accessToken; // 'token'이라는 이름의 쿠키 값을 가져옵니다.

      const memberInfo = await getMemberInfo(accessToken); // 비동기 호출에서 await 사용
      setMemberInfo({
        nickname: memberInfo.nickname,
        profile_image: memberInfo.profile_image,
      });
    };

    fetchMemberInfo();
  }, [cookies.accessToken]);

  // 날씨 갱신 시 배경 변경
  useEffect(() => {
    if (weatherInfo?.weather) {
      setBg(weatherData[weatherInfo?.weather.description][1]);
    } else {
      setBg("ocean-3605547.jpg");
    }
  }, [weatherInfo]);

  // todo 불러오기
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      // 저장이 todo : 값,값,값
      setTodos(storedTodos.split(","));
    }
  }, []);

  // 완료된 todo 불러오기
  useEffect(() => {
    const completeTodos = localStorage.getItem("completeTodos");

    if (completeTodos) {
      setCompleteTodos(new Set(completeTodos.split(",")));
    }
  }, []);

  /** 위치 콜백 -> 날씨 불러오기 */
  function getPostionCallback(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // 날씨 - openweather
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWHETHER_API_KEY}&units=${"metric"}`
      )
      .then((response) => {
        const data = response.data;

        const tempInfo = data.main;
        const name = data.name;
        const weather = data?.weather[0];

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

  // 위치 오류 콜백
  function errorCallback(error) {
    console.log(error);
  }

  function handleTodoInputChange(e) {
    setInputTodo(e.target.value);
  }

  function handleTodoSubmit(e) {
    e.stopPropagation();
    e.preventDefault();

    if (inputTodo.trim()) {
      setTodos((prev) => {
        const updateTodos = [...prev, inputTodo.trim()];
        localStorage.setItem("todos", updateTodos);
        return updateTodos;
      });
    }

    setInputTodo("");
  }

  function handleShowAllClick() {
    setShowAll((prev) => !prev);
  }

  function handleTodoClick(e) {
    setCompleteTodos((prev) => {
      const newCompleteTodos = new Set(completeTodos.add(e.target.innerText));
      localStorage.setItem("completeTodos", Array.from(newCompleteTodos));

      return newCompleteTodos;
    });
  }

  function handleTodoDeleteClick(targetTodo) {
    setTodos((prev) => {
      const updatedTodos = prev.filter((todo) => todo !== targetTodo);
      if (updatedTodos) {
        const updateCompleteTodos = Array.from(completeTodos).filter(
          (todo) => todo !== targetTodo
        );
        // const updateCompleteTodos = completeTodos.delete(targetTodo);
        localStorage.setItem("completeTodos", updateCompleteTodos);
        setCompleteTodos(new Set(updateCompleteTodos));
        // setCompleteTodos(updateCompleteTodos)
      }

      // 업데이트된 todos를 localStorage에 저장
      localStorage.setItem("todos", updatedTodos);
      return updatedTodos;
    });
  }

  return (
    <>
      <section className={styles.section}>
        <div className={styles.todoContainer}>
          <div className={styles["todo-list"]}>
            {todos?.length > 0 ? (
              <div className={styles.todoTitle}>Tasks</div>
            ) : (
              ""
            )}
            {todos.map((todo, index) => {
              if (3 <= index && !showAll) {
                return;
              }
              return (
                <>
                  <div
                    key={index}
                    className={`${styles.todo} ${
                      completeTodos.has(todo) ? styles.complete : ""
                    }`}
                  >
                    <div onClick={handleTodoClick}>{todo}</div>
                    <div
                      onClick={() => handleTodoDeleteClick(todo)}
                      className={styles.deleteTodo}
                    >
                      <img src={`${ICON_PATH}/delete.svg`} alt="" srcset="" />
                    </div>
                  </div>
                </>
              );
            })}
            {!showAll && todos?.length > 3 ? (
              <div className={styles.showAll} onClick={handleShowAllClick}>
                더보기 &or;
              </div>
            ) : (
              ""
            )}
            {showAll && todos?.length > 3 ? (
              <div className={styles.showAll} onClick={handleShowAllClick}>
                접기 &and;
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <article className={styles.infoContainer}>
          {weatherInfo ? (
            <>
              <div className={styles.weatherContainer}>
                <div className={styles.currentTemp}>
                  <strong>{Math.floor(weatherInfo.temp.current)}°C</strong>
                </div>
                <div>{weatherInfo.name}</div>
                <div>{weatherData[weatherInfo.weather.description][2]}</div>
              </div>
              <div className={styles.weatherImage}>
                <img
                  src={`${weatherData[weatherInfo.weather.description][0]}`}
                  alt=""
                />
              </div>
            </>
          ) : (
            ""
          )}
        </article>
        {memberInfo.nickname ? (
          <>
            <article className={styles.greeting}>
              <div className={styles.text}>
                안녕하세요, {memberInfo.nickname}님!
              </div>
            </article>
          </>
        ) : (
          <>
            <div className={styles.greeting}>Hello, World!</div>
          </>
        )}
      </section>
      <section className={styles.todoInputContainer}>
        <form className={styles.inputTodo} onSubmit={handleTodoSubmit}>
          <input
            type="text"
            maxLength={15}
            onChange={handleTodoInputChange}
            value={inputTodo}
            placeholder="할 일을 등록해보세요."
          />
          <button>
            <img src={`${ICON_PATH}/enter.svg`} alt="" />
          </button>
        </form>
      </section>
      <section className={styles.dimmed}></section>
    </>
  );
}
