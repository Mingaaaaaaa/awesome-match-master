/* eslint-disable jsx-quotes */
import { Fragment, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Picker,
  Checkbox,
  CheckboxGroup,
  PageContainer,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { formatDate } from "../../utils/index";
import calendarIcon from "../../assets/calendar.png";
import "./index.scss";

function Export() {
  //改之前获取相应数据
  const today = formatDate(new Date());
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [startTime, setStartTime] = useState(today);
  const [endTime, setEndTime] = useState(today);
  const [inclusion, setInclusion] = useState(["4"]);
  const [order, setOrder] = useState(1);
  const orderName = ["按成就组排序", "按时间排序"];
  const [show, setShow] = useState(false);
  const selectObject = useRef<object>([]);
  const selectTeamName = useRef("");
  const [selteams, setSelTeams] = useState("无");
  const [teams, setTeams] = useState([]);
  const [isFold, setIsFold] = useState([]);
  const [tags, setTags] = useState<Array<Array<object>>>([]);
  const [selectIcon, setSelectIcon] = useState([]);
  const [check, setCheck] = useState([]);
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    Taro.getStorage({
      key: "token",
      success: (token) => {
        Taro.request({
          url: "https://ysjy.alplune.top/yun/api/team/findTeamAll",
          method: "GET",
          header: { token: token.data },
          success: (res1: any) => {
            console.log(res1);
            res1.data.data.map((item, index) => {
              //console.log(item.id);
              Taro.request({
                url: "https://ysjy.alplune.top/yun/api/label/findLabelByTeam",
                method: "GET",
                header: {
                  token: token.data,
                },
                data: {
                  team1_id: item.id,
                },
                success: (res2) => {
                  //console.log(res2);
                  setTeams(res1.data.data);
                  setTags((pre) => {
                    pre.push(res2.data.data);
                    return pre;
                  });
                  let arrIndex = [];
                  let checkIndex = [];
                  let selectIconIndex = [];
                  for (let i = 0; i < res1.data.data.length; i++) {
                    arrIndex.push(true);
                    checkIndex.push(false);
                    selectIconIndex.push(" ");
                  }
                  console.log(selectIconIndex);
                  setIsFold(arrIndex);
                  setCheck(checkIndex);
                  setSelectIcon(selectIconIndex);
                },
              });
            });
          },
          fail: () => {
            Taro.showToast({
              title: "获取数据失败",
              icon: "error",
              duration: 2000,
            });
          },
        });
      },
    });
  }, []);
  const exportRecord = (
    name,
    remarks,
    startTime,
    endTime,
    inclusion,
    order
  ) => {
    Taro.getStorage({
      key: "user_id",
      success: (res) => {
        //16
        Taro.getStorage({
          key: "token",
          success: (res1) => {
            Taro.request({
              url: "https://ysjy.alplune.top/yun/api/record/findRecord",
              method: "GET",
              header: { token: res1.data },
              data: {
                page: 1,
                size: 1111,
                start_time: "2022-01-01",
                end_time: today,
                teams: [],
              },
              success: (res2) => {
                //console.log(res2.data.data.current_data);
                let choice;
                if (selectObject.current) {
                  choice = selectObject.current.filter((i) => i);
                }
                //console.log(choice);
                Taro.request({
                  url: "https://ysjy.alplune.top/yun/api/export/intro",
                  method: "POST",
                  header: {
                    token: res1.data,
                  },
                  data: {
                    type: "文本",
                    start_time: startTime,
                    end_time: endTime,
                    choice: choice,
                    inclusion: inclusion,
                    order: Number(order) + 1,
                    user_id: res.data,
                  },
                  success: (res3) => {
                    //console.log(res3.data.data);
                    let data = res3.data.data.replace(/↵/g, "<pre>");
                    Taro.showModal({
                      title: "复制到剪切板？",
                      content: res3.data.data,
                      success: function (res4) {
                        if (res4.confirm) {
                          Taro.setClipboardData({
                            data: data,
                          });
                          //console.log("用户点击确定");
                        } else if (res4.cancel) {
                          //console.log("用户点击取消");
                        }
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  };
  function getTagByTeam(name, index) {
    if (tags[index]) {
      return (
        <View>
          <View
            id={index}
            className="fold-icon"
            onClick={(e) => {
              console.log(e);
              setIsFold((pre) => {
                console.log(pre);
                pre[index] = !isFold[index];
                return pre;
              });
              setFresh(!fresh);
            }}
          ></View>
          <View className="team-header">
            <View className="team-name">{name}</View>
            <View
              id={index}
              className="all-select"
              style={
                check[index]
                  ? {
                      backgroundImage: `url(../../assets/select.png)`,
                    }
                  : {}
              }
              onClick={(e) => {
                if (!check[index]) {
                  let labels = tags[index].map((item, index) => {
                    return item.id;
                  });
                  selectObject.current[index] = {
                    team_id: teams[index].id,
                    labels: labels,
                  };
                  if (!selectTeamName.current.includes(teams[index].name)) {
                    selectTeamName.current += teams[index].name + "、";
                    //console.log(selectTeamName.current);
                    setSelTeams(selectTeamName.current);
                  }
                } else {
                  selectObject.current[index] = undefined;
                  let str = teams[index].name + "、";
                  let newName = selectTeamName.current.replace(str, " ");
                  selectTeamName.current = newName;
                  setSelTeams(newName);
                }
                console.log(selectObject.current);
                console.log(selectTeamName.current);
                setCheck((pre) => {
                  pre[index] = !pre[index];
                  return pre;
                });
                setFresh(!fresh);
              }}
            ></View>
          </View>
          <CheckboxGroup
            className="group"
            onChange={(e) => {
              let labels = e.detail.value.map((i) => Number(i));
              selectObject.current[index] = {
                team_id: teams[index].id,
                labels: labels,
              };
              if (!selectTeamName.current.includes(teams[index].name)) {
                selectTeamName.current += teams[index].name + "、";
                //console.log(selectTeamName.current);
                setSelTeams(selectTeamName.current);
              }
              console.log(selectObject.current);
            }}
          >
            {tags[index].map((item, index2) => {
              if (index2 < 3) {
                return (
                  <Checkbox key={index2} checked={check[index]} value={item.id}>
                    {item.name}
                  </Checkbox>
                );
              } else {
                console.log(check);
                return (
                  <Checkbox
                    checked={check[index]}
                    key={index2}
                    value={item.id}
                    style={
                      isFold[index] ? { display: "none" } : { display: "block" }
                    }
                  >
                    {item.name}
                  </Checkbox>
                );
              }
            })}
          </CheckboxGroup>
          <View
            className="form-divide"
            style={isFold[index] ? { marginTop: "10PX" } : {}}
          ></View>
        </View>
      );
    }
  }
  return (
    <Fragment>
      <Text className="title">记忆导出</Text>
      <View className="form-wrap">
        <View className="form-item">
          <Text className="form-label">导出类型</Text>
          <View className="form-inner">
            <Picker
              mode="selector"
              // range={["文字导出", "图片导出", "文件导出"]}
              range={["文字导出"]}
              value={0}
              onChange={(e) => {
                //console.log(e.currentTarget);
              }}
            >
              文字导出
            </Picker>
            <View className="form-icon"></View>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <Text className="form-label">日期约束</Text>
          <View className="form-inner">
            <Picker
              style={{ marginRight: "10px" }}
              mode="date"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.detail.value);
              }}
            >
              {startTime}
            </Picker>{" "}
            ~{" "}
            <Picker
              style={{ marginLeft: "10px" }}
              mode="date"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.detail.value);
              }}
            >
              {endTime}
            </Picker>
            <View
              className="form-icon"
              style={{
                backgroundImage: `url(${calendarIcon})`,
              }}
            ></View>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <Text className="form-label">成就组与标签选择</Text>
          <View className="form-inner">
            <View onClick={() => setShow(true)}>已选成就组：{selteams}</View>
            <PageContainer
              show={show}
              position="center"
              onLeave={() => setShow(false)}
            >
              <View style={{ textAlign: "center" }}>成就组与标签选择</View>
              {teams.map((item, index) => {
                if (!(tags[index] == undefined || !tags[index].length)) {
                  return (
                    <View key={index}>{getTagByTeam(item.name, index)}</View>
                  );
                }
              })}
            </PageContainer>

            <View className="form-icon"></View>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <Text className="form-label">格式选择</Text>
          <View className="form-inner tags">
            <CheckboxGroup
              className="format"
              onChange={(e) => {
                //console.log(e);
                setInclusion(e.detail.value);
              }}
            >
              <Checkbox value={1}>日期</Checkbox>
              <Checkbox value={2}>成就组</Checkbox>
              <Checkbox value={3}>标签</Checkbox>
              <Checkbox value={4} checked>
                简介
              </Checkbox>
            </CheckboxGroup>
          </View>
          <View className="form-divide"></View>
        </View>
        <View className="form-item">
          <View className="form-label ">排序方式</View>
          <View className="tag-wrap ">
            <Picker
              range={orderName}
              value={order}
              onChange={(e) => {
                //console.log(e);
                setOrder(Number(e.detail.value));
              }}
            >
              {orderName[order]}
            </Picker>
          </View>
          <View className="form-divide last-divide"></View>
        </View>
        <View className="form-item">
          <View
            className="form-btn"
            onClick={() => {
              exportRecord(name, remarks, startTime, endTime, inclusion, order);
              // //console.log(
              //   startTime,
              //   endTime,
              //   // achievement,
              //   // selTag,
              //   inclusion,
              //   order
              // // );
            }}
          >
            导出
          </View>
        </View>
      </View>
    </Fragment>
  );
}

export default Export;
