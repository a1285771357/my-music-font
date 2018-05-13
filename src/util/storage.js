/**
 * 本地持久化对象
 */
let localStorage = {
	setSkin(key) {
	    window.localStorage.setItem("skin", key);
	},
	getSkin() {
	    let skin = window.localStorage.getItem("skin");
	    return !skin ? "coolBlack" : skin;
	},
	setCurrentSong(song) {
		window.localStorage.setItem("song", JSON.stringify(song));
	},
	getCurrentSong() {
		let song = window.localStorage.getItem("song");
		return song ? JSON.parse(song) : {};
	},
	setSongs(songs) {
		window.localStorage.setItem("songs", JSON.stringify(songs));
	},
	getSongs() {
		let songs = window.localStorage.getItem("songs");
		return songs ? JSON.parse(songs) : [];
	},
  	/*获取公钥*/
  	getPublicKey(){
      let publicKey = window.localStorage.getItem("publicKey");
      return publicKey ? publicKey : "";
	},
  	/*设置公钥*/
  	setPublicKey(publicKey){
      window.localStorage.setItem("publicKey", publicKey);
	},
  	/*设置登录状态*/
  	setLoginStatus(status){
      window.localStorage.setItem("loginStatus", status);
	},
  	/*获取登录状态*/
  	getLoginStatus(){
      let loginStatus = window.localStorage.getItem("loginStatus");
      return loginStatus ? true : false;
	},
  	/*删除登录状态*/
  	delLoginStatus(){
      let loginStatus = window.localStorage.removeItem("loginStatus");
	},
 	 /*获取用户名*/
  	getUsername(){
    	let username = window.localStorage.getItem("username");
    	return username ? username : "";
  	},
 	 /*设置用户名*/
 	setUsername(username){
    	window.localStorage.setItem("username", username);
  	},
}

export default localStorage