import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../../css/write.module.css";
import { useCookies } from "react-cookie";

export default function Write() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    writer: "unknown",
    title: "",
    content: "",
  });

  const [cookies, setCookie] = useCookies(["accessToken"]); // 쿠키 이름을 배열로 전달합니다.

  const [member, setMember] = useState();

  useEffect(() => {
    // 쿠키 값 가져오기
    const accessToken = cookies.accessToken; // 'token'이라는 이름의 쿠키 값을 가져옵니다.
    console.log(accessToken);

    axios
      .get("http://localhost:8080/api/kakao/member", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMember({
          nickname: response.data.nickname,
          profile_image: response.data.profile_image,
        });

        setFormData((prevState) => ({
          ...prevState,
          nickname: member.nickname,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // name 속성에 따라 업데이트
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log(formData);

    await axios
      .post("http://localhost:8080/api/board", formData)
      .then((response) => {
        console.log(response);

        const idx = response.data.idx;
        console.log(idx);

        navigate(`/board/${idx}`);
      });
  }

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="titleContainer">
            <div className="title">글 작성</div>

            <div className={styles.buttonContainer}>
              <Link to={"/board"}>
                <button className={styles.backBtn}>뒤로가기</button>
              </Link>
              <button className={styles.writeBtn} onClick={console.log("!")}>
                작성
              </button>
            </div>
          </div>
          <div className={styles.inputContainter}>
            <input
              type="text"
              name="title"
              className={styles.title}
              onChange={handleChange}
              maxLength={50}
            />
            <textarea
              type="text"
              name="content"
              className={styles.content}
              onChange={handleChange}
            />
          </div>
        </form>
      </main>
    </>
  );
}
