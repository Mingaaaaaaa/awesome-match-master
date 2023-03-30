import { View, Text, Textarea } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const addFeedback = () => {
    // //15
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/feedback/addFeedback",
    //   method: "POST",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     detail:"没米"
    //   },
    // });
  };
  return (
    <View>
      <Text className="text">输入您的反馈，点赞还是吐槽，我们都很期待...</Text>
      <Textarea
        className="feedback"
        onInput={(e) => {
          setFeedback(e.detail.value);
        }}
      ></Textarea>
      <button
        className="btn"
        onClick={() => {
          console.log("提交" + feedback);
        }}
      >
        提交
      </button>
    </View>
  );
}

export default Feedback;
