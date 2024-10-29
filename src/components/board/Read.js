import List from "./List";
import Reply from "../../components/board/Reply";
import Post from "./Post";
import GoTop from "../GoTop";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../css/read.module.css";
import useMemberStore from "../../store";
import { useCookies } from "react-cookie";

export default function Read() {
  const { idx } = useParams(); // URL에서 idx 추출

  const [replys, setReplys] = useState([]);
  const [inputReply, setInputReply] = useState("");
  const [cookies, setCookies] = useCookies(["accessToken"]); // 쿠키 이름을 배열로 전달합니다.

  const { getId } = useMemberStore();

  // 글번호, 댓글목록 변경되면 댓글 다시 로드
  useEffect(() => {
    axios.get(`http://localhost:8080/api/reply/${idx}`).then((response) => {
      setReplys(response.data.replys);
    });
  }, [idx]);

  // 댓글 입력창 변경됐을 때
  function handleInputReplyChange(e) {
    setInputReply(e.target.value);
  }

  async function handleReplyRegistBtnClick(e) {
    e.preventDefault();

    const accessToken = cookies.accessToken;
    const id = await getId(accessToken);

    axios
      .post("http://localhost:8080/api/reply", {
        post_idx: idx,
        member_id: id,
        content: inputReply,
      })
      .then((response) => {
        console.log(response.data.message);
        return axios.get(`http://localhost:8080/api/reply/${idx}`);
      })
      .then((response) => {
        console.log("reply response", response);
        setReplys(response.data.replys);
        setInputReply("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <main>
        <GoTop />
        <Post />
        <div className={styles.replyTitle}>
          <div className={styles.length}>{replys.length}개</div>의 댓글
        </div>
        <form className={styles.replyContainer}>
          <div className={styles.inputContainer}>
            <img
              className={styles.profileImage}
              src="/images/default_profile.png"
              alt=""
            />
            <textarea
              value={inputReply}
              name="reply"
              onChange={handleInputReplyChange}
              className={styles.reply}
            ></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={handleReplyRegistBtnClick}
              className={styles.replyBtn}
            >
              작성
            </button>
          </div>
        </form>
        {replys ? replys.map((reply) => <Reply reply={reply}></Reply>) : ""}
        <form className={styles.replyContainer}>
          <div className={styles.inputContainer}>
            <img
              className={styles.profileImage}
              src="/images/default_profile.png"
              alt=""
            />
            <textarea
              value={inputReply}
              name="reply"
              onChange={handleInputReplyChange}
              className={styles.reply}
            ></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={handleReplyRegistBtnClick}
              className={styles.replyBtn}
            >
              작성
            </button>
          </div>
        </form>
        <List page={1} />
      </main>
    </>
  );
}
