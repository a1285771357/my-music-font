import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

import localStorage from '../../util/storage'
import { Card, Icon, Input, Button, Avatar, message, Menu, Collapse } from 'antd';
import "./home.styl"
import rainbg from "../../assets/imgs/rainbg.jpg"
import {getReviewToMe} from "../../api/api";
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

    this.state = {
      data:[]
    };

  }

  componentDidMount(){
    getReviewToMe({username:localStorage.getUsername()}).then(value => {
      if (value.errorCode == 0){
        this.setState({
          data:value.data
        })
      }

    })
  }



  render() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <div className="box">
        <Collapse accordion>
          <Panel header={[<span>已获得点赞：</span>,<span>{this.props.data}</span>]} disabled key="1"></Panel>
          <Panel header={[<span>已获得评论：</span>,<span>{this.state.data.length}</span>]} key="2">
            {this.state.data.map((item,index) => {
              return (<p className="review">{(index+1)+"、"+item}</p>)
            })}
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default Aboute
