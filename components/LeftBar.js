import { useRouter } from "next/navigation";
import styles from "../styles/LeftBar.module.css";
export default function LeftBar() {
  const router = useRouter();

  function clickHandler() {
    router.push("pen");
  }

  return (
    <div className={styles.container}>
      <svg
        viewBox="0 0 138 26"
        fill="none"
        stroke="#fff"
        stroke-width="2.3"
        stroke-linecap="round"
        stroke-linejoin="round"
        title="CodePen"
      >
        <path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path>
      </svg>
      <br></br>
      <h3 className={styles.tryonlineeditor}>TRY OUR ONLINE EDITOR</h3>
      <button className={styles.startCoding} onClick={clickHandler}>
        Start Coding
      </button>
      <ul>
        <li className={styles.item}>Search pens</li>
        <li className={styles.item}>Challenges</li>
        <li className={styles.item}>Spark</li>
      </ul>
    </div>
  );
}
