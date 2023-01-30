import React, { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useRef } from "react";
import {connect, getRooms, subscribe,publish,getChattings,client,updateLastRead} from '../../../services/ChattingService';
import { useParams } from 'react-router-dom';
import MessageList from "./list/\bMessageList";
import { useDispatch,useSelector } from 'react-redux';
import { connectSocket,saveSubscription,saveRoomId } from "../../../modules/socket";


export default function ChattingRoom(props) {
    const dispatch=useDispatch();
    const socket=useSelector(state=>state.socket.socket);
    let subscriptions=useSelector(state=>state.socket.subscriptions);
    let beforeRoomId=useSelector(state=>state.socket.roomId);

    const {memberId,room,nickname}=props; // TODO: memberId,nickname props로 안넘길거 지금은 걍 테스트
    // console.log('ChattingRoom: roomId - ',roomId);
    // const client=useRef({});
    const [msg,setMsg]=useState("");
    const {roomId}=useParams();
    // console.log("roomId",roomId);
    const [newChat,setNewChat]=useState(null); // 새로 도착한 채팅
    const [chatList, setChatList] = useState([]); // 화면에 표시될 채팅 기록
    const [checkChatList,setCheckChatList]=useState(false);
    const [firstMsg,setFirstMsg]=useState();

    const handleOnChange = (e) => {
        // console.log("handleOnChange: ",e.target.value);
        setMsg(e.target.value);
    };
    const handleSubmit = async (e) => {
        // timestamp formatting TODO: 함수로 뺄까
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        month = month >= 10 ? month : '0' + month
        let day = date.getDate()
        day = day >= 10 ? day : '0' + day
        let hour = date.getHours()
        hour = hour >= 10 ? hour : '0' + hour
        let min = date.getMinutes()
        let sec = date.getSeconds()
        sec = sec >= 10 ? sec : '0' + sec
        
        let now = year + month + day + hour + min + sec;
        const info=memberId.split(" ");
        
        publish(roomId,msg,info[0],nickname,now); // TODO 수정해야해애애애애ㅐㅇ애
        // console.log("msg",msg);
        setMsg("");
    };

    useEffect(() => {
        
        // 채팅 내역 불러오기
        getChattings(roomId).then((response)=>{
            if(response.data.code!==1000) console.log("SERVER ERROR");
            else{
                const data=response.data.result;
                if(data.length===0) console.log("no chats");
                else{
                    setChatList(data);
                    setCheckChatList(true);
                    setFirstMsg(data[0]);
                    
                }
            }
        })
        // const dest="/sub/chat/"+roomId;
        
        // subscriptions.map((sub)=>{
           
        //     if(sub.des===dest){
        //         socket.unsubscribe(sub.id);
                
        //     } 
        // })
        // subscriptions=subscriptions.filter(
        //     subscription=>subscription.des!=dest
        // );
        // dispatch(saveSubscription(subscriptions));
        
        // const res=socket.subscribe('/sub/chat/' + roomId, ({body}) => {
            
        //     const received=JSON.parse(body);

        //     const data={
        //         nickName:received.nickName,
        //         memberId:received.memberId,
        //         roomId:received.roomId,
        //         msg:received.msg,
        //         timestamp:received.timestamp
        //     }
        //     if(Number(data.roomId)===Number(roomId)){
        //         console.log("data.roomId",data.roomId);
        //         console.log("roomId",roomId);
        //         setNewChat(data);
        //         console.log("set new chat");
        //     }
            
        // });
        // const s={
        //     id: res.id,
        //     des: "/sub/chat/"+roomId
        // }
        // subscriptions.push(s);
        // dispatch(saveSubscription(subscriptions));
    }, [roomId]);

    useEffect(() => {
        // console.log("ROOMID",roomId);
        const dest="/sub/chat/"+roomId;
        console.log("###subscriptions: ",subscriptions);
        subscriptions.map((sub)=>{
           
            if(sub.des===dest){
                socket.unsubscribe(sub.id); 
            } 
        })
        subscriptions=subscriptions.filter(
            subscription=>subscription.des!=dest
        );
        dispatch(saveSubscription(subscriptions));

        const res=socket.subscribe('/sub/chat/' + roomId, ({body}) => {
            
            const received=JSON.parse(body);

            const data={
                nickName:received.nickName,
                memberId:received.memberId,
                roomId:received.roomId,
                msg:received.msg,
                timestamp:received.timestamp
            }
           
            setNewChat(data);
        });
        const s={
            id: res.id,
            des: "/sub/chat/"+roomId
        }
        subscriptions.push(s);
        dispatch(saveSubscription(subscriptions));
    }, [socket]);

    useEffect(() => {
        if(newChat!==null&&Number(newChat.roomId)===Number(roomId)){
            // console.log("set new chat");
            setChatList(chatList=>[...chatList,newChat]);
        }
    }, [newChat]);

   

    return (
        <div className="md:w-full max-w-full rounded-lg bg-blue-100 mt-6 pb-0">
            {checkChatList&&<MessageList items={chatList} firstMsg={firstMsg} memberId={memberId}/>}
            <div className="md:w-full">
                <input type="text" id="default-input" className="bg-white w-full border-2 rounded-lg py-1 pl-2" value={msg} onChange={handleOnChange}
                    onKeyPress={(e)=>{
                        if(e.key==="Enter") {
                            console.log("ENTER");
                            handleSubmit(e);
                        }
                    }}
                    class="bg-gray-50 border md:w-full border-gray-300 text-gray-900 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
        </div>
    )
}