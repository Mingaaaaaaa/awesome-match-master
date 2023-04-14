import { View, Text, Textarea } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import "./index.scss";

function Feedback() {
  const [token, setToken] = useState("");

  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    Taro.getStorage({
      key: "token",
      success: (res) => {
        setToken(res.data);
      },
    });
  }, []);

  const addFeedback = () => {
    //15
    Taro.request({
      url: "https://ysjy.alplune.top/yun/api/feedback/addFeedback",
      method: "POST",
      header: {
        token: token,
      },
      data: {
        detail: feedback,
      },
      success: (res) => {
        if (res.data.code == 0) {
          Taro.showToast({
            title: res.data.data,
            icon: "success",
            duration: 700,
          });
        }
        setFeedback("");
      },
    });
  };
  return (
    <View>
      <View className="text">输入您的反馈，点赞还是吐槽，我们都很期待...</View>
      <Textarea
        className="feedback"
        onInput={(e) => {
          setFeedback(e.detail.value);
        }}
      ></Textarea>
      <button
        className="btn"
        onClick={() => {
          addFeedback();
        }}
      >
        提交
      </button>
    </View>
  );
}

export default Feedback;
