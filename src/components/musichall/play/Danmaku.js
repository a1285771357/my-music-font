import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"
import io from "socket.io-client"
import {getMusic} from "../../../api/api"

import "../../../assets/stylus/reset.styl"
import "../../../assets/stylus/font.styl"
import "../../App.styl"
import "./danmaku.styl"

class Danmaku extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ["第一", "第二", "第三", "第四"]
    }
  }

  componentDidMount() {
    //如果当前路由没有被激活隐藏加载组件
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      console.log(socket.connected); // true
    });socket.on('danmaku show', (msg) => {
      // alert(msg)
    });
    socket.emit('danmaku send',"张雷");



    var data = "张雷"


    // var a = document.getElementById("myMusic").
    // console.log(a)
    // getMusic().addEventListener('timeUpdate', function () {
    //   console.log()
    //   // CM.time(getMusic().currentTime * 1000); // 时刻通知流媒体播放时间
    // });

    // socket.on('danmaku-update', function (data) {
    //   alert(JSON.stringify(data))
    //   CM.insert(data); // 注意这里是把弹幕插入时间轴。
    // });
    // var data ={
    //   time:10,
    //   content:"张雷"
    // }
    // document.getElementById("myMusic").ontimeupdate=function () {
    //   if(parseInt(this.currentTime) == data.time){
    //     alert(data.content)
    //   }
    // }

  }





  render() {
    return (
      <div style={{background:"red",width:"100%",height:"100%",position:"relative"}}>
        {this.state.data.map((item,index)=>{
          return (<span className="move moveTo">{item}</span>)
        })}
      </div>
  );
  }
}

export default Danmaku;
