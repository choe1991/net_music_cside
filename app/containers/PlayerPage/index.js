import React from 'react';
import H1 from 'components/H1';
import {Howl} from 'howler';
import axios from 'axios'
import io from 'socket.io-client';
let socket = io("ws://139.9.1.106:4000", {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax : 5000,
        reconnectionAttempts: Infinity
      } );
let sound = {}
export default class PlayerPage extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            songname:""
        }
    }
    componentDidMount() {
      socket = io("ws://139.9.1.106:4000", {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax : 5000,
        reconnectionAttempts: Infinity
      } );
      var socket = socket;
      
      console.log("很像链接");
        socket.on('connect', () =>{ 
          console.log("播放器链接成功");
          socket.emit('GroupJoin', "a")
        });

        socket.on('disconnect', () =>{
          socket = socket.connect();
          console.log("播放端与服务器断开");
        });
        
        socket.on("doPlay", songid => {
            this.playMusic(songid)
        })
    }
    playMusic(id) {
        const url = `http://139.9.1.106:3000/song/url?id=${id}`
        
        axios
            .get(url)
            .then(response => {
                if (sound instanceof Howl) {
                    sound.unload()
                }
                sound = new Howl({
                    src: [response.data.data[0].url],
                    html5: true
                });
                sound.play();
                this.getSongName(id)
            })
            .catch(error => {
                console.log(error);
            });
    }

    getSongName(id){
        const url = `http://139.9.1.106:3000/song/detail?ids=${id}`
        
        axios
            .get(url)
            .then(response => {
                this.setState({
                    songname: response.data.songs[0].name
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        let {songname} = this.state
        return (
            <article>
                <H1>
                    {songname?songname:"当前暂无播放歌曲"}
                </H1>
            </article>
        );
    }
}
