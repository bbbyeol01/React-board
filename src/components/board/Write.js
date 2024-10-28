import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../../css/write.module.css";
import { useCookies } from "react-cookie";
import useMemberStore from "../../../src/store";

export default function Write() {
  const navigate = useNavigate();
  const { getId } = useMemberStore();
  const [cookies, setCookies] = useCookies(["accessToken"]); // 쿠키 이름을 배열로 전달합니다.

  const [formData, setFormData] = useState({
    writer: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const accessToken = cookies.accessToken; // 'token'이라는 이름의 쿠키 값을 가져옵니다.

      const id = await getId(accessToken);
      setFormData({
        writer: id,
        title: "",
        content: "",
      });
    };

    fetchMemberInfo();
  }, [cookies.accessToken]);

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
