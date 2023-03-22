import { Fragment, useState } from "react";
import { View, Text, Input, Picker, Checkbox } from "@tarojs/components";
import { formatDate } from "../../utils/index";
import calendarIcon from "../../assets/calendar.png";
import "./index.scss";

function Export() {
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
      <Text className='title'>记忆导出</Text>
      <View className='form-wrap'>
        <View className='form-item'>
          <Text className='form-label'>导出类型</Text>
          <View className='form-inner'>
            <Picker
              mode='selector'
              range={["文字导出", "图片导出", "文件导出"]}
              value={0}
              onChange={(e) => { console.log(e.currentTarget); }}
            >
              asdsa
            </Picker>
            <View className='form-icon'></View>
          </View>
          <View className='form-divide'></View>
        </View>
        <View className='form-item'>
          <Text className='form-label'>日期约束</Text>
          <View className='form-inner'>
            <Picker mode='time' value={ddl} onChange={(e) => { setDdl(e.detail.value); }}>
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
          <Text className='form-label'>成就组与标签选择</Text>
          <View className='form-inner'>
            <Picker
              mode='multiSelector'
              range={[["成就组1", "成就组2", "成就组3", "成就组4"], ["标签1", "标签2", "标签3", "标签4",]]}
              value={0}
              onChange={() => { console.log("object"); }}
            >asdasasd</Picker>
            <View className='form-icon'></View>
          </View>
          <View className='form-divide'></View>
        </View>
        <View className='form-item'>
          <Text className='form-label'>格式选择</Text>
          <View className='form-inner tags'>
            <Checkbox value='hasDate'>日期</Checkbox>
            <Checkbox value='hasAchi'>成就组</Checkbox>
            <Checkbox value='hasTag'>标签</Checkbox>
            <Checkbox value='hasSummary' checked>简介</Checkbox>
          </View>
          <View className='form-divide'></View>
        </View>
        <View className='form-item'>
          <View className='form-label'>排序方式</View>
          <View className='tag-wrap'>
            <Picker
              range={[1, 2, 3, 4]}
              onChange={() => { console.log("asd"); }}
            >asdasda</Picker>
          </View>
          <View className='form-divide'></View>
        </View>
        <View className='form-item'>
          <View className='form-btn' onClick={() => { console.log(name, remarks, ddl, achievement, selTag); }}>
            导出
          </View>
        </View>
      </View>
    </Fragment >

  );
}

export default Export;
