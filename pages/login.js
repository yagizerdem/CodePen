import HomeLayout from "@/Layouts/HomeLayout";
import styles from "../styles/login.module.css";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Login() {
  const notify = (msg) => toast(msg);
  const ref = useRef();
  const router = useRouter();
  function clickHandler(e) {
    e.preventDefault();
    const credentials = new FormData(ref.current);
    const obj = {};
    for (const [key, value] of credentials) {
      obj[key] = value;
    }

    signIn("credentials", { ...obj, redirect: false }).then((result) => {
      console.log(result);
      if (result.error) {
        notify("incorrect email or password");
        return;
      }
      router.push("/");
      notify("log in success");
    });
  }

  return (
    <HomeLayout>
      <div className={styles.container}>
        <form ref={ref}>
          <label>Enter Mail</label>
          <input placeholder="enter mail" name="mail"></input>
          <label>Enter password</label>
          <input
            type="password"
            placeholder="enter password"
            name="password"
          ></input>
          <button type="submit" onClick={(e) => clickHandler(e)}>
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
