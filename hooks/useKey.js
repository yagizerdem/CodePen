const { useEffect } = require("react");

function UseKey(key_, callback) {
  useEffect(() => {
    document.addEventListener("keypress", helper);
    function helper({ key, code }) {
      if (key_.toLowerCase() == key.toLowerCase()) callback();
    }
    return () => document.removeEventListener("keypress", helper);
  }, [key_, callback]);
}
export default UseKey;
