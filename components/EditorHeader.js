import { useReducer, useState } from "react";
import styles from "../styles/EditorHeader.module.css";
import { useRouter } from "next/router";
import UseKey from "@/hooks/useKey";
import { useAppContext } from "@/Context/AppContext";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
export default function EditorHeader() {
  const notify = (msg) => toast(msg);
  const credentials = useSession();
  const { currentProjectTitle, setCurrentProjectTitle, html, css, js } =
    useAppContext();
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  UseKey("enter", () => {
    if (editMode) setEditMode(false);
  });
  function goBack() {
    router.push("/");
  }
  async function savePen() {
    console.log(html, css, js);
    console.log(credentials);
    if (credentials.status === "unauthenticated") {
      notify("you are not authenticated");
      return;
    }
    //save pen

    const response = await axios.post(
      "/api/pen",
      { credentials, html, css, js, title: currentProjectTitle },
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status == "invalid") {
      notify(response.data.message);
      return;
    }

    notify(response.data.message);
    router.push("/");
  }
  return (
    <div className={styles.row}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={goBack}
          style={{ cursor: "pointer" }}
        >
          <path d="M502.3 159.7l-234-156c-8-4.9-16.5-5-24.6 0l-234 156C3.7 163.7 0 170.8 0 178v156c0 7.1 3.7 14.3 9.7 18.3l234 156c8 4.9 16.5 5 24.6 0l234-156c6-4 9.7-11.1 9.7-18.3V178c0-7.1-3.7-14.3-9.7-18.3zM278 63.1l172.3 114.9-76.9 51.4L278 165.7V63.1zm-44 0v102.6l-95.4 63.7-76.9-51.4L234 63.1zM44 219.1l55.1 36.9L44 292.8v-73.7zm190 229.7L61.7 334l76.9-51.4L234 346.3v102.6zm22-140.9l-77.7-52 77.7-52 77.7 52-77.7 52zm22 140.9V346.3l95.4-63.7 76.9 51.4L278 448.8zm190-156l-55.1-36.9L468 219.1v73.7z" />
        </svg>
        <div className={styles.center}>
          {!editMode && currentProjectTitle}
          {editMode && (
            <div>
              <input
                type="text"
                placeholder="enter project name"
                className={styles.nameInput}
                onChange={(e) => setCurrentProjectTitle(e.target.value)}
              ></input>
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={() => setEditMode((prev) => !prev)}
          >
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
          </svg>
        </div>
      </div>

      <button onClick={savePen}>save</button>
    </div>
  );
}
