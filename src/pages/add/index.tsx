import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import TodoForm from "../../components/TodoForm/TodoForm";

function Add() {
  let routes = Taro.getCurrentPages();
  console.log(routes[0].route?.includes("todo"));
  var type;
  if (routes[0].route?.includes("todo")) {
    type = "todo";
  } else type = "memory";

  const addRecord = () => {
    //11  根据时间判断是记忆还是代办
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/record/addRecord",
    //   method: "POST",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     name: "test1123",
    //     team1: 3,
    //     label: 25,
    //     introduction: "1aaaa2312",
    //     end_time: "2023",
    //     state: 1,
    //   },
    // });

  };
  return (
    <View>
      <TodoForm mode="add" type={type}></TodoForm>
    </View>
  );
}

export default Add;
