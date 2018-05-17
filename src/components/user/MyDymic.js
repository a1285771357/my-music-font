import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

import localStorage from '../../util/storage'
import { Card, Icon, Input, Button, Avatar, message, Menu, Collapse, List } from 'antd';
import "./home.styl"
import rainbg from "../../assets/imgs/rainbg.jpg"
import {checkLogin, doLogin} from "../../api/api";
import {rsa} from "../../util/rsa";

const { Meta } = Card;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Panel = Collapse.Panel;


message.config({
  top: 56,
  duration: 2,
  maxCount: 3,
});


class Aboute extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {};

  }





  render() {
    // const { getFieldDecorator } = this.props.form;
    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ];
    return (
      <div className="box">
        <List
          header={<div style={{textAlign:"center"}}>我的全部动态</div>}
          dataSource={data}
          renderItem={item => (<List.Item className="pdl8" actions={[<a>删除</a>]}>{item}</List.Item>)}
        />
      </div>
    );
  }
}

export default Aboute
