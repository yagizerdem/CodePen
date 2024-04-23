import HomeLayout from "@/Layouts/HomeLayout";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import sql from "better-sqlite3";
import styles from "../styles/Profile.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Fragment, useRef, useState } from "react";
import { useAppContext } from "@/Context/AppContext";
import { useRouter } from "next/router";

export default function Profile({ pens }) {
  const router = useRouter();
  const { setCurrentProjectTitle, setHtml, setCss, setJs } = useAppContext();
  const [pens_, setPens] = useState(pens);
  const [summaryMode, setSummaryMode] = useState(false);
  const summaryref = useRef();
  const notify = (msg) => toast(msg);
  async function deletepen(penid) {
    var result = await axios.post("/api/deletepen", {
      penid,
    });
    // console.log(result);
    if (result.data.status == "valid") {
      setPens((prev) => prev.filter((item) => item.id != penid));
    }
    notify(result.data.message);
  }

  async function submitSummary(id) {
    const summary = summaryref.current.value;
    const result = await axios.post("/api/updatesummary", {
      summary,
      penid: id,
    });
    if (result.data.status == "invlaid") {
      notify(result.data.message);
      return;
    }
    // ui update on client sise
    setSummaryMode(false);
    var targetpen = pens_.find((item) => item.id == id);
    targetpen.summary = summaryref.current.value;
    notify(result.data.message);
    //
  }
  async function editCode(id) {
    const result = await axios.get(`/api/pen?penid=${id}`);
    const pendata = result.data.pen;
    setCurrentProjectTitle(pendata.title);
    setCss(pendata.csscode);
    setHtml(pendata.htmlcode);
    setJs(pendata.jscode);
    router.push("/pen");
  }

  return (
    <HomeLayout>
      <div className={styles.header}>Profile</div>
      {pens && (
        <ul className={styles.grid}>
          {pens_.map((item, i) => {
            return (
              <li key={i} className={styles.listitem}>
                <p className={styles.listitemtitle}>{item.title}</p>
                <hr></hr>
                {!summaryMode && (
                  <p className={styles.summary}>{item.summary}</p>
                )}
                <br></br>
                <div className={styles.row}>
                  {!summaryMode && (
                    <Fragment>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => editCode(item.id)}
                      >
                        Edit Code
                      </button>
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={() => setSummaryMode(true)}
                      >
                        Set Summary
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => deletepen(item.id)}
                      >
                        Delete
                      </button>
                    </Fragment>
                  )}
                  {summaryMode && (
                    <div className={styles.summaryform}>
                      <textarea
                        placeholder="enter summary of project"
                        className={styles.textarea}
                        ref={summaryref}
                      ></textarea>
                      <br></br>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => setSummaryMode(false)}
                      >
                        cancel
                      </button>
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={() => submitSummary(item.id)}
                      >
                        submit summary
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </HomeLayout>
  );
}
export async function getServerSideProps({ req }) {
  const user = await getSession({ req });
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const db = sql(process.env.DBNAME);
  const authorid = user.userData.id;
  // fetch pens
  const pens = db
    .prepare(
      `
  SELECT * FROM pens WHERE authorid = '${authorid}';
  `
    )
    .all();
  return { props: { pens } };
}
