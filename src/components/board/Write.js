import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../../css/write.module.css";
import { useCookies } from "react-cookie";

export default function Write() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    writer: "",
    title: "",
    content: "",
  });

  const [cookies, setCookie] = useCookies(["accessToken"]);

  const [member, setMember] = useState();

  useEffect(() => {
    // 쿠키 가져오기
    const accessToken = cookies.accessToken;
    console.log(accessToken);

    axios
      .get("http://localhost:8080/api/member", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        if (response.data) {
          setMember({
            id: response.data?.id,
            nickname: response.data?.nickname,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      writer: member?.id,
      nickname: member?.nickname,
    }));
  }, [member]);

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
