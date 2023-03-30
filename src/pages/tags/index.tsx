import { View, Image, Input, Button, PageContainer } from "@tarojs/components";
import { useEffect, useState } from "react";
import ColorPicker from "./components/ColorPicker";
import "./index.scss";

function Tags() {
  const [isShow, setIsShow] = useState(false);
  const [tags, setTags] = useState([
    {
      id: 0,
      label: "High",
      background:
        "linear-gradient(208.63deg, rgba(247, 57, 95, 1) 0%, rgba(245, 34, 34, 1) 100%)",
    },
    {
      id: 1,
      label: "Medium",
      background:
        "linear-gradient(135deg, rgba(66, 166, 237, 1) 0%, rgba(42, 130, 228, 1) 100%)",
    },
    {
      id: 2,
      label: "Low",
      background:
        "linear-gradient(135deg, rgba(255, 171, 134, 1) 0%, rgba(255, 217, 105, 1) 100%)",
    },
  ]);
  const [changeTagId, setChangeTageId] = useState();
  useEffect(() => {
    //7
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/label/findLabelByTeam",
    //   method: "GET",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     team1_id: 3,
    //   },
    // });
  });
  const deleteTag = () => {
    // //9
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/label/delLabel",
    //   method: "GET",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     label_id: 1,
    //   },
    // });
  };
  const handleTag = () => {
    // //5  add label
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/label/addLabel",
    //   method: "GET",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     color: "green",
    //     name: "论文撰写1",
    //     team1: 3,
    //   },
    // });
    
    //6  update label
    // Taro.request({
    //   url: "http://124.222.4.79:3310/api/label/updateLabel",
    //   method: "POST",
    //   header: {
    //     token: token,
    //   },
    //   data: {
    //     id: 24,
    //     color: "green",
    //     name: "论文撰写111",
    //     team1: 3,
    //     user_id:1
    //   },
    // });
  };
  return (
    <View>
      <Input className="achieveName" value="论文"></Input>
      <View className="divide"></View>
      {tags.map((item, index) => {
        return (
          <View className="tag-item" key={index}>
            <View
              id={item.id.toString()}
              key={index}
              className="tag-color"
              style={{ background: `${item.background}` }}
              onClick={(e) => {
                setIsShow(true);
                console.log(e.mpEvent.target.id);
                setChangeTageId(e.mpEvent.target.id);
              }}
            ></View>
            <Input className="tag-name" value={item.label}></Input>
            <Image
              className="delete"
              src="../../assets/delete.png"
              onClick={deleteTag()}
            ></Image>
          </View>
        );
      })}
      <ColorPicker
        show={isShow}
        setIsShow={setIsShow}
        setTags={setTags}
        changeTagId={changeTagId}
      />
      <Button
        className="add"
        onClick={() => {
          setTags((pre) => {
            return [
              ...pre,
              {
                id: pre.length,
                label: "请输入标签名称",
                background:
                  " linear-gradient(135deg, rgba(255, 171, 134, 1) 0%, rgba(229, 229, 229, 1) 0%);",
              },
            ];
          });
        }}
      >
        新建
      </Button>
    </View>
  );
}
export default Tags;
