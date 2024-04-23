import React from "react";
import styles from "../styles/Editors.module.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";

export const JavascriptEditor = (props) => {
  return <Editor title={"Javascript"} mode="javascript" {...props} />;
};

export const HtmlEditor = (props) => {
  return <Editor title={"HTML"} mode="html" {...props} />;
};

export const CssEditor = (props) => {
  return <Editor title={"CSS"} mode="css" {...props} />;
};

const Editor = ({ title, mode, value, onChange }) => {
  return (
    <div className={styles.editorContainer}>
      <div className={styles.editorTitle}>{title}</div>
      <AceEditor
        mode={mode}
        theme="monokai"
        name={title}
        setOptions={{ useWorker: false }}
        width="100%"
        height="calc(100% - 40px)"
        showPrintMargin={true}
        showGutter={true}
        tabSize={2}
        fontSize={18}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
