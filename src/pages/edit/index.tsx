/* eslint-disable jsx-quotes */
import { View } from "@tarojs/components";
import { useEffect, useRef } from "react";
import Taro from "@tarojs/taro";
import TodoForm from "../../components/TodoForm/TodoForm";

function Edit() {
  const token = useRef();
  const userId = useRef();
  const data = Taro.useRouter().params
  useEffect(() => {
    Taro.getStorage({
      key: "token",
      success: (res) => {
        token.current = res.data;
        // 获取所需修改表格的所有数据
      }
    });
    Taro.getStorage({
      key: "user_id",
      success: (res) => {
        userId.current = res.data;
        // 获取所需修改表格的所有数据
      },
  })}, []);
  var type;
  let routes = Taro.getCurrentPages();
  if (routes[0].route?.includes("todo")) {
    type = "todo";
  } else type = "memory";
  let result;

  const editItem = (props: {
    name: string;
    teamId: string;
    labelId: string;
    introduction: string;
    end_time: string;
  }) => {
    //12
    Taro.request({
      url: "http://124.222.4.79:3310/api/record/updateRecord",
      method: "POST",
      header: { token: token.current },
      data: {
        name: props.name,
        team1: props.teamId,
        label: props.labelId,
        introduction: props.introduction,
        end_time: props.end_time,
        state: 1,
        user_id:userId.current
      },
      success: (res) => {
        result = res.data.data;
      },
    });
    return result;
  };
  return (
    <View>
      <TodoForm
        mode="edit"
        type={type}
        method={editItem}
        data={data}
      ></TodoForm>
    </View>
  );
}
export default Edit
