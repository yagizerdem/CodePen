import LeftBar from "@/components/LeftBar";
import Nav from "@/components/Nav";
import { Fragment } from "react";
import styles from "../styles/HomeLayout.module.css";

export default function HomeLayout({ children }) {
  return (
    <Fragment>
      <LeftBar />
      <Nav />
      <div className={styles.main}>{children}</div>
    </Fragment>
  );
}
