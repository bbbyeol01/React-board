import List from "./List";
import Reply from "../../components/board/Reply";
import Post from "./Post";
import GoTop from "../GoTop";

export default function Read() {
  return (
    <>
      <main>
        <Post />
        <Reply />
        <List page={1} />
        <GoTop />
      </main>
    </>
  );
}
