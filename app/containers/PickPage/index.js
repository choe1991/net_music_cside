import React from 'react';

import {
  SearchBar,
  WhiteSpace,
  List,
  Button
} from 'antd-mobile';

import axios from 'axios'
import io from 'socket.io-client';
const socket = io("ws://139.9.1.106:4000", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: Infinity
} );
const Item = List.Item;
export default class PickPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: "",
      listData: [],
    }
  }
  onChange = (value) => {
    this.setState({
      keyword: value
    }, () => {
      this.doSearch()
    })
  }

  chooseMusic(id){
    console.log("点击事件",id)
    socket.emit('playRequest', {value:id}); //向服务器发送消息
  }
  componentDidMount() {
    socket.on('disconnect', () =>{
      console.log("点歌端与服务器断开");
      socket = socket.connect();
    });
    socket.on('connect', () =>{ 
      console.log("链接成功");
      socket.emit('clientMsg', {rp:"告诉服务器我链接成功了"}); //向服务器发送消息
    });
    socket.on('reconnect', () =>{
      console.log("重新连接到服务器");
    });
    socket.on("log",(data) =>{
      console.log("服务端:",data.value);
    })
    socket.on("doPlay",songid=>{
      this.playMusic(songid)
    })
  }



  doSearch() {
    axios.get(`http://139.9.1.106:3000/search?keywords=${this.state.keyword}`)
      .then(response => {
        this.setState({
          listData: response.data.result.songs
        })
      })
      .catch(error => {
        console.log(error);
      });
  }
  render(){
    return (
      <article>
        <Button onClick={this.doSearch.bind(this)}>搜索</Button>
        <SearchBar placeholder = "Search" maxLength ={8}
      onSubmit = {
        this.onChange.bind(this)
      }
      /> <WhiteSpace />
      <List className = "my-list" > {
        this.state.listData.map(item =>
          <Item onClick = {
            this.chooseMusic.bind(this, item.id)
          }
          key = {
            item.id
          }
          extra = {`${item.artists.map(i=>i.name).join('/')}`
          } > {
            item.name
          } </Item>
        )
      } </List> 
      
      </article>
    );
  }
}
