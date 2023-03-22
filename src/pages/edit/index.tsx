import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import TodoForm from "../../components/TodoForm/TodoForm";

function Edit() {
  let routes = Taro.getCurrentPages();
  console.log(routes[0].route?.includes("todo"));
  var type
  if (routes[0].route?.includes("todo")) {
    type = "todo"
  }
  else type="memory"
  return (
    <View >
      <TodoForm mode='edit' type={type}></TodoForm>
    </View>
  );
}

export default Edit;
