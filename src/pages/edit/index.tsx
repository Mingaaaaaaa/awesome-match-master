import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import TodoForm from "../../components/TodoForm/TodoForm";

function Edit() {
  let routes = Taro.getCurrentPages();
  console.log(routes[0].route?.includes("todo"));
  var type;
  if (routes[0].route?.includes("todo")) {
    type = "todo";
  } else type = "memory";

  const editItem = () => {
    // //12
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/record/updateRecord",
    //   method: "POST",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     name: "test-update!",
    //     team1: 1,
    //     label_id: "test label",
    //     introduction: "666",
    //     end_time: "2023",
    //     state: 1,
    //   },
    // });
  };
  return (
    <View>
      <TodoForm mode="edit" type={type}></TodoForm>
    </View>
  );
}

export default Edit;
