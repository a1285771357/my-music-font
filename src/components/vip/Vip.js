import React from "react"
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"

import localStorage from '../../util/storage'
import {buyVip} from "../../api/api";
import { Button, message } from 'antd';
import openbook from "../../assets/imgs/openbook.4gif.gif"
import whitepage from "../../assets/imgs/whitepage.jpg"
import "../../assets/stylus/reset.styl"
import "../../assets/stylus/font.styl"
import "../App.styl"
import "./vip.styl"


class Vip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuShow: false
    };
  }

  componentDidMount() {
    //如果当前路由没有被激活隐藏加载组件
    if (!this.props.match.isExact) {
      this.setState({loading: false});
    }
  }

  handleClick = () => {
    buyVip({username:localStorage.getUsername()}).then(value => {
      if (value.errorCode == 0){
        message.success("开通成功")
      }else {
        message.error(value.errorMessage)
      }
    })

  }

  render() {
    return (
      <div style={{position:"relative",background:`url(${whitepage}) no-repeat`}}>
        <img className="openBook" src={openbook} alt="" width="100%"/>
        <div className="abouteVip showPage">
          <h3>说明</h3>
          <p>Q:如何获得VIP？</p>
          <p>A:通过积分兑换，300积分兑换一个月VIP</p>
          <p>Q:如何获得积分？</p>
          <p>A:每日签到获得10积分</p>
          <p>Q:VIP有什么用？</p>
          <p>A:可以对个人资料加密，听取VIP音乐</p>
          <Button type="primary" className="btn" onClick={this.handleClick}>立即开通</Button>
        </div>
      </div>
    );
  }
}

export default Vip;
