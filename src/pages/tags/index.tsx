import { View, Image, Input } from "@tarojs/components";
import { useState } from "react";
import "./index.scss";

function Tags() {
  const [tags, setTags] = useState([
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
  ])
  return (
    <View>
      <Input className='achieveName' value='论文'></Input>
      <View className='divide'></View>
      {tags.map((item, index) => {
        return (
          <View className='tag-item' key={index}>
            <View
              className='tag-color'
              style={{
                background: `${item.background}`,
                boxShadow: `${item.boxShadow}`,
              }}
            ></View>
            <Input className='tag-name' value={item.label}></Input>
            <Image className='delete' src='../../assets/delete.png'></Image>
          </View>

        )
      })}
      <button
        className='add'
        onClick={() => {
          setTags((pre) => {
            return [...pre,
            {
              label: "请输入标签名称",
              background:
                " linear-gradient(135deg, rgba(255, 171, 134, 1) 0%, rgba(229, 229, 229, 1) 0%);",
              boxShadow: "0px 2px 10px 0px rgba(245, 166, 35, 0.6);",
            }]
          })
        }}
      >
        新建
      </button>
    </View>
  );
}
export default Tags;
