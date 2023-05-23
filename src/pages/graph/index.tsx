import {  WebView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect,   useState } from "react";
import "./index.scss";

function Graph() {
  const [url, setUrl] = useState("");
  useEffect(() => {
    // Taro.getStorage({
    //   key: "user_id",
    //   success: (res) => {
    //     // setUrl(`https://ysjy.alplune.top/index.html`);
    //     // setUrl(`https://ysjy.alplune.top/?id=${res.data}`);
    //     setUrl("localhost:3000");
    //     // setUrl("https://fancy-centaur-1c42ee.netlify.app");
    //   }
    // });
  }, []);
  return (
    <WebView src='https://ysjy.alplune.top'></WebView>
  );
}

export default Graph;
