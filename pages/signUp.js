import HomeLayout from "@/Layouts/HomeLayout";
import styles from "../styles/singup.module.css";
import { ValidateSingUp } from "@/lib/FormValidator";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function SingUp() {
  const notify = (msg) => toast(msg);
  const router = useRouter();
  const ref = useRef();
  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(ref.current);
    const obj = {};
    for (const [key, value] of formData) {
      obj[key] = value;
    }
    // client side validation
    let result = ValidateSingUp(obj);
    if (result.status == "invalid") {
      notify(result.message);
      return;
    }
    //

    // router.push("/");
  }

  return (
    <HomeLayout>
      <div className={styles.container}>
        <form ref={ref}>
          <div className={styles.formgroup}>
            <label>enter your first name</label>
            <input placeholder=" first name" name="firstname"></input>
          </div>
          <div className={styles.formgroup}>
            <label>enter your last name</label>
            <input placeholder=" last name" name="lastname"></input>
          </div>
          <div className={styles.formgroup}>
            <label>enter password</label>
            <input
              placeholder=" passowrd"
              type="password"
              name="password"
            ></input>
          </div>
          <div className={styles.formgroup}>
            <label>enter password again</label>
            <input
              placeholder=" passowrd again"
              type="password"
              name="passwordagain"
            ></input>
          </div>
          <div className={styles.formgroup}>
            <label>enter email</label>
            <input placeholder="email" type="email" name="email"></input>
          </div>
          <button
            type="submit"
            className={styles.submtibtn}
            onClick={(e) => submitHandler(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
