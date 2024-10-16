import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../css/list.module.css";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

export default function List({ page }) {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/board?page=${Number(page)}`)
      .then((response) => {
        setPosts(response.data.posts);
        setTotalCount(response.data.totalCount[0].total);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <>
      <div className={styles["post-list"]}>
        {posts.map((post, index) => (
          <div
            key={post.idx}
            className={`${styles["post-item"]} ${
              index % 2 == 0 ? styles.even : ""
            }`}
          >
            <div className={styles.titleContainer}>
              <Link to={`/board/${post.idx}`} className={styles.title}>
                {post.title}
              </Link>
            </div>

            <div className={styles.infoContainer}>
              <div className={styles.nickname}>{post.nickname}</div>
              <div className={styles.time}>{post.time}</div>
            </div>
          </div>
        ))}
      </div>
      <Pagination totalCount={totalCount} page={page} />
    </>
  );
}
