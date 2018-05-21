import React from "react"
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"
import {CSSTransition} from "react-transition-group"
import Skin from "../../containers/Skin"
import localStorage from '../../util/storage'
import {logout} from "../../api/api";
import PropTypes from "prop-types"
import {message} from "antd"

import "./menu.styl"

class Menu extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
			skinShow: false
		};
	}

    static contextTypes = {
      router: PropTypes.object.isRequired
    };
	showSetting = (status) => {
		if (localStorage.getUserlevel() <= 2){
			message.warning("等级不足，还不能设置皮肤，先升到二级吧")
		  	return
		}
		this.close();
        // menu关闭后打开设置
        setTimeout(() => {
        	this.setState({
        		skinShow: status
        	});
        }, 300);
	}
	close = () => {
        this.props.closeMenu();
    }

    handleLogout = () => {
      var _this = this;//更改this指向
      logout().then(value => {
	    if (value.errorCode == 0){
	      localStorage.delLoginStatus()
          window.location.reload()
          _this.context.router.history.push("/musichall/recommend")
        }
      })
    }
	render() {
		return (
			<div>
				<CSSTransition in={this.props.show} timeout={300} classNames="fade"
					onEnter={() => {
						this.refs.bottom.style.display = "block";
					}}
					onExited={() => {
						this.refs.bottom.style.display = "none";
					}}>
			      <div className="bottom-container" onClick={this.close}  ref="bottom">
			        <div className="bottom-wrapper">
			          <div className="item" onClick={() => {this.showSetting(true);}}>
			            皮肤中心
			          </div>
					  <div className="item" onClick={this.handleLogout}>
			            退出登录
			          </div>
			          <div className="item-close" onClick={this.close}>
			            关闭
			          </div>
			        </div>
			      </div>
			    </CSSTransition>
			    <Skin show={this.state.skinShow} close={() => {this.showSetting(false);}} />
		  	</div>
		);
	}
}

export default Menu