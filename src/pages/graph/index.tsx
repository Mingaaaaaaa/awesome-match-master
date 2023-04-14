import {  WebView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect,   useState } from "react";
import "./index.scss";

function Graph() {
  const [url, setUrl] = useState("");
  useEffect(() => {
    Taro.getStorage({
      key: "user_id",
      success: (res) => {
        setUrl(`http://124.222.4.79?id=${res.data}`);
      },
    });
  }, []);
  return (
    // <WebView src="http://localhost:3000/react-neovis-example?id=CALLdb.schema.visualization()"></WebView>
    // <WebView src="http://192.168.43.206:3000/"></WebView>
    <WebView src={url}></WebView>
  );
}

export default Graph;
