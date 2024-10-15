import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../css/list.module.css";
import { Link } from "react-router-dom";

export default function List(page) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/board?page=${page.page}`)
      .then((response) => {
        setPosts(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <div className={styles["post-list"]}>
      {posts.map((post) => (
        <div key={post.idx} className={styles["post-item"]}>
          <div className={styles.titleContainer}>
            <Link to={`/board/${post.idx}`} className={styles.title}>
              {post.title}
            </Link>
          </div>

          <div className={styles.timeContainer}>
            <div>{post.nickname}</div>
            <div className={styles.time}>{post.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
