import { Link } from "react-router-dom";
import styles from "../css/pagination.module.css";
import { useState } from "react";

export default function Pagination({ totalCount, page }) {
  const length = Math.ceil(totalCount / 10); // 총 페이지 수 계산
  const size = 5; // 페이지 그룹 크기

  const [currentPage, setCurrentPage] = useState(page || 1);
  const [startPage, setStartPage] = useState(1);

  // 페이지 그룹의 마지막 페이지를 계산
  const endPage = Math.min(startPage + size - 1, length);

  // 이전 페이지 그룹으로 이동하는 함수
  function handlePrev() {
    if (startPage > 1) {
      const newStartPage = Math.max(startPage - size, 1);
      setStartPage(newStartPage);
    }
  }

  // 다음 페이지 그룹으로 이동하는 함수
  function handleNext() {
    if (endPage < length) {
      const newStartPage = startPage + size;
      setStartPage(newStartPage);
    }
  }

  return (
    <>
      <div className={styles["page-list"]}>
        {/* 이전 버튼 */}
        <button
          className={`${styles.prev} ${styles["page-item"]}`}
          onClick={handlePrev}
          disabled={startPage === 1} // 첫 페이지 그룹일 때 비활성화
        >
          &lt;
        </button>

        {/* 페이지 번호 리스트 */}
        {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
          const pageNum = startPage + i;
          return (
            <Link key={pageNum} to={`/board?page=${pageNum}`}>
              <button
                className={`${styles["page-item"]} ${
                  currentPage === pageNum ? styles.active : ""
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            </Link>
          );
        })}

        {/* 다음 버튼 */}
        <button
          className={`${styles.prev} ${styles["page-item"]}`}
          onClick={handleNext}
          disabled={endPage === length} // 마지막 페이지 그룹일 때 비활성화
        >
          &gt;
        </button>
      </div>
    </>
  );
}
