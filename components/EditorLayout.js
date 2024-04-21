import styles from "../styles/EditorLayout.module.css";
import React, { useEffect, useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { CssEditor, HtmlEditor, JavascriptEditor } from "./Editors";
import { useDebounce } from "@/hooks/useDebounce";

export default function EditorLayout() {
  const [sizesVertical, setSizesVertical] = useState(["auto", "auto", "auto"]);
  const [sizeHorizontal, setSizesHorizontal] = useState(["50%", "50%"]);
  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [htmlValue, setHtmlValue] = useState("");
  const [jsValue, setJsValue] = useState("");
  const [cssValue, setCssValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const debouncedHtml = useDebounce(htmlValue, 1000);
  const debouncedJs = useDebounce(jsValue, 1000);
  const debouncedCss = useDebounce(cssValue, 1000);
  useEffect(() => {
    const output = `<html>
                    <style>
                    ${debouncedCss}
                    </style>
                    <body>
                    ${debouncedHtml}
                    <script type="text/javascript">
                    ${debouncedJs}
                    </script>
                    </body>
                  </html>`;
    setOutputValue(output);
  }, [debouncedHtml, debouncedCss, debouncedJs]);

  return (
    <div className={styles.container}>
      <SplitPane
        split="horizontal"
        sizes={sizeHorizontal}
        onChange={setSizesHorizontal}
        resizerSize={20}
      >
        <SplitPane
          split="vertical"
          sizes={sizesVertical}
          onChange={setSizesVertical}
          resizerSize={10}
        >
          <Pane minSize={50} maxSize="50%">
            <div
              style={{
                ...layoutCSS,
                background: "hsl(228deg 7.94% 12.35%)",
                margin: "0 5px 0 0",
              }}
            >
              <HtmlEditor
                value={htmlValue}
                onChange={setHtmlValue}
              ></HtmlEditor>
            </div>
          </Pane>
          <div
            style={{
              ...layoutCSS,
              background: "hsl(228deg 7.94% 12.35%)",
              margin: "0 5px 0 0",
            }}
          >
            <CssEditor value={cssValue} onChange={setCssValue}></CssEditor>
          </div>
          <div style={{ ...layoutCSS, background: "hsl(228deg 7.94% 12.35%)" }}>
            <JavascriptEditor
              value={jsValue}
              onChange={setJsValue}
            ></JavascriptEditor>
          </div>
        </SplitPane>
        <div className={styles.iframecontainer}>
          <iframe srcDoc={outputValue} className={styles.previewIframe} />
        </div>
      </SplitPane>
    </div>
  );
}
