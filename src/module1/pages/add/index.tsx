import { View } from "@tarojs/components";
import { useEffect, useRef } from "react";
import Taro from "@tarojs/taro";
import TodoForm from "../../../components/TodoForm/TodoForm";

function Add() {
  var type;
  let routes = Taro.getCurrentPages();
  if (routes[0].route?.includes("todo")) {
    type = "todo";
  } else type = "memory";

  const token = useRef();
  useEffect(() => {
    Taro.getStorage({
      key: "token",
      success: (res) => {
        token.current = res.data;
        //
      },
    });
  }, []);

  const addRecord = (props: {
    name: string;
    teamId: string;
    labelId: string;
    introduction: string;
    end_time: string;
  }) => {
    //11  根据时间判断是记忆还是代办
    Taro.request({
      url: "http://124.222.4.79:3310/api/record/addRecord",
      method: "POST",
      header: {
        token: token.current,
      },
      data: {
        name: props.name,
        team1: props.teamId,
        label: props.labelId,
        introduction: props.introduction,
        end_time: props.end_time,
        state: 1,
      },
      success: (res) => {
        //console.log(res);
        if (res.data.data.code == 0) {
        }
      },
    });
  };
  return (
    <View>
      <TodoForm
        mode="add"
        type={type}
        method={addRecord}
        data={null}
      ></TodoForm>
    </View>
  );
}

export default Add;
