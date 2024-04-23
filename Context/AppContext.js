import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();
export default function MapProvider({ children }) {}

function AppProvider({ children }) {
  const [currentProjectTitle, setCurrentProjectTitle] = useState("Untitled");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  return (
    <Context.Provider
      value={{
        currentProjectTitle,
        setCurrentProjectTitle,
        html,
        css,
        js,
        setHtml,
        setCss,
        setJs,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useAppContext() {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("MapContext is outside of  provider");
  }
  return context;
}
export { useAppContext, AppProvider };
