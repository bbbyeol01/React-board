import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Edit() {
  const { id } = useParams(); // URL에서 id 추출

  return (
    <>
      <Link to={"/board"}>뒤로가기</Link>
      <section>
        <h1>{id}번 수정</h1>
        <textarea type="text" name="content" />
        <button>작성</button>
      </section>
    </>
  );
}
