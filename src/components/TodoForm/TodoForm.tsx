import { Fragment, useState } from "react";
import { View, Text, Input, Picker } from "@tarojs/components";
import { formatDate } from "../../utils/index";
import featIcon from "../../assets/feat.png";
import calendarIcon from "../../assets/calendar.png";
import "./TodoForm.scss";

const Tags = [
  {
    label: "High",
    background:
      "linear-gradient(208.63deg, rgba(247, 57, 95, 1) 0%, rgba(245, 34, 34, 1) 100%)",
    boxShadow: "0px 1px 7.5px 0px rgba(74, 144, 226, 0.6)",
  },
  {
    label: "Medium",
    background:
      "linear-gradient(135deg, rgba(66, 166, 237, 1) 0%, rgba(42, 130, 228, 1) 100%)",
    boxShadow: "0px 1px 5px 0px rgba(80, 227, 194, 0.6)",
  },
  {
    label: "Low",
    background:
      "linear-gradient(135deg, rgba(255, 171, 134, 1) 0%, rgba(255, 217, 105, 1) 100%)",
    boxShadow: "0px 1px 5px 0px rgba(245, 166, 35, 0.6)",
  },
];
function TodoForm(props: { mode: "add" | "edit", type: "todo" | "memory" }) {
  const { mode, type } = props;
  //改之前获取相应数据
  const today = formatDate(new Date());
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [ddl, setDdl] = useState(today);
  const achievements = ["A", "B", "C"]
  const [achievement, setAchievement] = useState(0);
  const [selTag, setSelTag] = useState(0);
  return (
    <Fragment>
      <Text className='title'>{mode == "add" ? "新增" : "修改"}{type == "memory" ? "记忆" : "计划"}</Text>
      <View className='form-wrap'>
        <View className='form-item'>
          <Text className='form-label'>{type=="todo"?"计划":"记忆"}名称</Text>
          <View className='form-inner'>
            <Input
              type='text'
              value={name}
              onInput={(e) => { setName(e.detail.value) }}
              placeholder={type=="todo"?"请输入计划名称":"请输入记忆名称"}
            />
            <View className='form-icon'></View>
          </View>
          <View className='form-divide'></View>
        </View>
        <View className='form-item'>
          <Text className='form-label'>{type=="todo"?"截止":"完成"}日期</Text>
          <View className='form-inner'>
            <Picker mode='date' value={ddl} onChange={(e) => { setDdl(e.detail.value); }}>
              {ddl}
              <View
                className='form-icon'
                style={{
                  backgroundImage: `url(${calendarIcon})`,
                }}
              ></View>
            </Picker>

          </View>
          <View className='form-divide'></View>
        </View> 
        <View className='form-item'>
          <Text className='form-label'>{type=="todo"?"计划":"记忆"}备注</Text>
          <View className='form-inner'>
            <Input
              type='text'
              value={remarks}
              onInput={(e) => { setRemarks(e.detail.value) }}
              placeholder={type=="todo"?"请输入计划备注":"请输入记忆备注" }
            />
            <View className='form-icon'></View>
          </View>
          <View className='form-divide'></View>
        </View>
        <View className='form-item'>
          <Text className='form-label'>成就组</Text>
          <View className='form-inner'>
            <Picker mode='selector' range={achievements} onChange={(e) => { setAchievement(Number(e.detail.value)) }}>
              {achievements[achievement]}
              <View
                className='form-icon'
                style={{
                  backgroundImage: `url(${featIcon})`,
                }}
              ></View>
            </Picker>
          </View>
          <View className='form-divide'></View>
        </View>
        <View className='form-item'>
          <View className='form-label'>标签</View>
          <View className='tag-wrap'>
            {Tags.map((item, index) => {
              return (
                <View
                  key={index}
                  className='tag-item'
                  onClick={() => {
                    setSelTag(index);
                  }}
                >
                  <View
                    className={
                      index === selTag ? "tag-color active" : "tag-color"
                    }
                    style={{
                      background: `${item.background}`,
                      boxShadow: `${item.boxShadow}`,
                    }}
                  ></View>
                  <View className='tag-label'>{item.label}</View>
                </View>
              );
            })}
          </View>
        </View>
        <View className='form-item'>
          <View className='form-btn' onClick={() => { console.log(name, remarks, ddl, achievement, selTag); }}>{mode === "add" ? "创建" : "修改"}</View>
          {mode !== "add" ? <View className='form-del'>删除任务</View> : null}
        </View>
      </View>
    </Fragment>

  );
}

export default TodoForm;
