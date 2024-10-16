import styles from "../css/goTop.module.css";

export default function GoTop() {
  function handleClick() {
    window.scrollTo({
      top: 0, // 스크롤의 목표 위치 (0: 맨 위)
      behavior: "smooth", // 스크롤을 부드럽게 이동
    });
  }

  return (
    <>
      <div className={styles.goTop} onClick={handleClick}>
        Top
      </div>
    </>
  );
}
