import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

import { Card, Icon, Input, Button, Avatar, message, Menu, Collapse, List } from 'antd';
import "./home.styl"
import female from "../../assets/imgs/female.png"
import male from "../../assets/imgs/male.png"
import novip from "../../assets/imgs/novip.png"
import vip from "../../assets/imgs/vip.png"

const { Meta } = Card;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Panel = Collapse.Panel;


message.config({
  top: 56,
  duration: 2,
  maxCount: 3,
});


class Info extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {};

  }

  showSex = (sex) =>{
    if (sex == "female"){
      return female
    }else if(sex == "male"){
      return male
    }
  }

  showVip = (isVip) =>{
    if (isVip){
      return vip
    }else if(!isVip){
      return novip
    }
  }



  render() {
    return (
      <div className="info">
        <div>
          <h3>个人信息</h3>
          <p style={{width:"60px",height:"20px",borderRadius:"5px",border:"1px solid #B59143",color:"#B59143",padding:"2px"}}> 等级：<span>{this.props.data.level}</span></p>
          <p>性别：<span><img src={this.showSex(this.props.data.sex)} alt="" width="20px" /></span></p>
          <p>VIP：<span> <img src={this.showVip(this.props.data.isVip)} alt="" width="20px" /></span></p>
          <p>积分：<span>400</span></p>
        </div>
        <div>
          <h3>个人简介</h3>
          <p>{this.props.data.proverbs}</p>
        </div>
      </div>
    );
  }
}

export default Info
