import { Fragment } from "react";
import styles from "../styles/NavBar.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
// import { toast } from "react-toastify";

export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.searchcontainer}>
        <svg viewBox="0 0 56.7 56.7" class="SearchForm-module_iconMag-09rf5">
          <path d="M42.8 7.3C33-2.4 17.1-2.4 7.3 7.3c-9.8 9.8-9.8 25.7 0 35.5 8.7 8.7 22.2 9.7 32 2.9l9.6 9.6c1.8 1.8 4.7 1.8 6.4 0 1.8-1.8 1.8-4.7 0-6.4l-9.6-9.6c6.8-9.8 5.8-23.3-2.9-32zm-6.2 29.3c-6.4 6.4-16.7 6.4-23.1 0s-6.4-16.7 0-23.1c6.4-6.4 16.7-6.4 23.1 0 6.4 6.4 6.4 16.8 0 23.1z"></path>
        </svg>
        <input
          type="text"
          className={styles.search}
          placeholder="Search CodePen..."
        ></input>
      </div>
      <div>
        {!session && (
          <Fragment>
            <button
              className={styles.btnslogin}
              onClick={() => router.push("login")}
            >
              login
            </button>
            <button
              className={styles.btnssingUp}
              onClick={() => router.push("signUp")}
            >
              singUp
            </button>
          </Fragment>
        )}
        {session && (
          <Fragment>
            <div>profile</div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
