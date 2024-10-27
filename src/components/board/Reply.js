import styles from "../../css/reply.module.css";

export default function Reply({ reply }) {
  return (
    <>
      <section className={styles.replySection}>
        <div className={styles.profileImageContainer}>
          <img src="/???" alt="" srcset="" />
        </div>
        <div className={styles.replyContainer}>
          <div className={styles.profileContainer}>
            <div className={styles.nickname}>{reply.nickname}</div>
            <div className={styles.time}>{reply.time}</div>
          </div>

          <div>{reply.content}</div>
          <button className={styles.rereply}>답글</button>
        </div>
      </section>
    </>
  );
}
