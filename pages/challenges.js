import HomeLayout from "@/Layouts/HomeLayout";
import styles from "../styles/challenges.module.css";
const chessimg = require("../public/chessicon.png");
const xoximg = require("../public/xoxicon.png");
const quizimg = require("../public/quiz.png");
import Image from "next/image";
export default function Challneges() {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.card}>
          <h3 className={styles.title}>Chess</h3>
          <hr />
          <div className={styles.imgcontainer}>
            <Image src={chessimg} fill></Image>
          </div>
          <div className={styles.desc}>a standart chess game ...</div>
        </div>
        <div className={styles.card}>
          <h3 className={styles.title}>XOX</h3>
          <hr />
          <div className={styles.imgcontainer}>
            <Image src={xoximg} fill></Image>
          </div>
          <div className={styles.desc}>
            make xox game with beautiful ui , maybe good starting poing ?
          </div>
        </div>
        <div className={styles.card}>
          <h3 className={styles.title}>Quiz Game</h3>
          <hr />
          <div className={styles.imgcontainer}>
            <Image src={quizimg} fill></Image>
          </div>
          <div className={styles.desc}>
            quiz game which has count down timer , and takes questions from api
            ...
          </div>
        </div>
      </div>
      <p className={styles.more}>coming more ... </p>
    </HomeLayout>
  );
}
