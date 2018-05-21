import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

import localStorage from '../../util/storage'
import { Card, Icon, Input, Button, Avatar, message, Menu, Collapse, List, Modal } from 'antd';
import "./home.styl"
import rainbg from "../../assets/imgs/rainbg.jpg"
import {getMyAllDynamic, delDynamic} from "../../api/api";
import {rsa} from "../../util/rsa";
import moment from 'moment';//格式化时间
import momentZhcn from "../../util/moment-zhcn";

const { Meta } = Card;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Panel = Collapse.Panel;


message.config({
  top: 56,
  duration: 2,
  maxCount: 3,
});

momentZhcn()


class Aboute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      id: "",
      index:NaN,
      data: [],
      delText:"删除"
    };

  }

  componentDidMount(){
    if(this.props.username != localStorage.getUsername()){
      this.setState({
        delText:" "
      })
    }
    getMyAllDynamic({username:this.props.username}).then(value => {
      if (value.errorCode == 0){
        this.setState({
          data:value.data
        })
      }else if(value.errorCode == 10002){
        message.warning(value.errorMessage)
      }

    })
  }

  /*删除动态*/
  handleClick = (id,index) => {
    if(this.props.username != localStorage.getUsername()){
      return
    }
    this.showModal()
    this.setState({
      index:index,
      id:id
    })
  }

  showList(index){
    return index == this.state.index ? {display:"none"} : {display:"block"}
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    delDynamic({id:this.state.id})
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
      index: NaN
    })
  }




      render() {
    return (
      <div className="box">
        <List
          header={<div style={{textAlign:"center"}}>我的全部动态</div>}
          dataSource={this.state.data}
          renderItem={(item,index) => (<List.Item style={this.showList(index)} className="pdl8" actions={[<a onClick={this.handleClick.bind(this,item._id,index)}>{this.state.delText}</a>]} extra={<time>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</time>}>{item.dynamicreview}</List.Item>)}
        />
        <Modal
          title="提示"
          cancelText="我再想想"
          okText="狠心确认"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>您确定要删除这条动态么？</p>
        </Modal>
      </div>
    );
  }
}

export default Aboute
