import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

import localStorage from '../../util/storage'
import { Card, Icon, Input, Button, Avatar, message, Menu } from 'antd';
import "./home.styl"
import rainbg from "../../assets/imgs/rainbg.jpg"
import edit from "../../assets/imgs/edit.png"
import Aboute from "./AbouteMe"
import MyDymic from "./MyDymic"
import UserInfo from "./UserInfo"
import {checkLogin, getMyHome} from "../../api/api";
import {rsa} from "../../util/rsa";

const { Meta } = Card;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


message.config({
  top: 56,
  duration: 2,
  maxCount: 3,
});


class HOME extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data:{},
      key:"aboutme"
    };

  }

  componentDidMount(){
    var _this = this
    getMyHome({
      username:localStorage.getUsername()
    }).then(value => {
      if (value.errorCode == 0){
          if (value.data.length > 0){
            this.setState({
              data:value.data[0]
            })
            // console.log(this.state.data)
          }
      }else {
        _this.props.history.push("/login")
      }
    })

  }
  /*选中class*/
  active = (key) => {
    return this.state.key == key ? "ant-menu-submenu-active" : ""
  }

  /*显示组件*/
  showSection = (key) => {
    if (key == "aboutme"){
      return <Aboute data={this.formatFloat(this.state.data.likenum)}/>
    }else if(key == "dymic"){
      return <MyDymic/>
    }else if(key == "privateinfo"){
      return <UserInfo data={this.state.data}/>
    }
  }

  handleSelect = (value) => {
    this.setState({key:value.key});
  }

  /*格式化数字，超过万,四舍五入显示两位小数x.yyW*/
  formatFloat(num){
    if (num >= 10000){
      return Math.floor(num/10000).toFixed(2) + " W"
    }else {
      return num
    }
  }




  render() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <div className="wrap">
        <img src={rainbg} height="100%"/>
        <Card
          bordered={false}
          style={{ width: "100%" }}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={this.state.data.username}
            description={[<span>关注 <span>{this.formatFloat(this.state.data.watchnum)}</span></span>,<span> | </span>,<span>粉丝 <span>{this.formatFloat(this.state.data.fansnum)}</span></span>]}
          />
          <span style={{float:"right",cursor:"pointer"}}><img src={edit} alt="" width="20px"/></span>
        </Card>
        <Menu
          className="nav"
          mode="horizontal"
          onSelect={this.handleSelect}
        >
          <Menu.Item key="aboutme" className={this.active("aboutme")}>
            <Icon type="bell" />关于我
          </Menu.Item><Menu.Item key="dymic" className={this.active("dymic")}>
            <Icon type="mail" />动态
          </Menu.Item><Menu.Item key="privateinfo" className={this.active("privateinfo")}>
            <Icon type="user" />个人资料
          </Menu.Item>
        </Menu>
        <div>
          {this.showSection(this.state.key)}
        </div>

      </div>
    );
  }
}

export default HOME
