import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Edit() {
  const { idx } = useParams(); // URL에서 idx 추출

  return (
    <>
      <Link to={"/board"}>뒤로가기</Link>
      <main>
        <h1>{idx}번 수정</h1>
        <textarea type="text" name="content" />
        <button>작성</button>
      </main>
    </>
  );
}
