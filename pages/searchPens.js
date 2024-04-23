import HomeLayout from "@/Layouts/HomeLayout";
import { Fragment } from "react";
import styles from "../styles/SearchPens.module.css";
import sql from "better-sqlite3";
import { useRouter } from "next/router";
import { useAppContext } from "@/Context/AppContext";
export default function SearchPens({ pens }) {
  const router = useRouter();
  const { setCurrentProjectTitle, setHtml, setCss, setJs } = useAppContext();
  function clickHandler(pen) {
    setCurrentProjectTitle(pen.title);
    setHtml(pen.htmlcode);
    setCss(pen.csscode);
    setJs(pen.jscode);
    router.push("/pen");
  }
  return (
    <HomeLayout>
      <h1 className={styles.title}>All Pens</h1>
      <ul className={styles.grid}>
        {pens &&
          pens.map((item, i) => {
            return (
              <li key={i} onClick={() => clickHandler(item)}>
                <div className={styles.card}>
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.summary}>{item.summary}</p>
                  <p className={styles.author}>
                    {item.firstname + " " + item.lastname}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </HomeLayout>
  );
}

export async function getStaticProps() {
  const db = sql(process.env.DBNAME);

  try {
    var result = db
      .prepare(
        `
        SELECT *
FROM pens
LEFT JOIN authors ON pens.authorid = authors.id;`
      )
      .all();
  } catch (err) {
    console.log(err);
    return {
      props: {
        pens: null,
      },
    };
  }
  return {
    props: {
      pens: result,
    },
    revalidate: 10, // In seconds
  };
}
