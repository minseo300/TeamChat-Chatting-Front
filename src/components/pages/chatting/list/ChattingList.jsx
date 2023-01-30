import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import ChattingListItem from "./ChattingListItem";
import {connect, getRooms, subscribe,client,getChattingListItemInfo} from '../../../../services/ChattingService';
import { connectSocket,saveSubscription } from "../../../../modules/socket";


function ChattingList(props) {
  
    const {items,seletedRoomTitle,onClickItem,selectRoom,memberId}=props;
    const socket=useSelector(state=>state.socket);
    let subscriptions=useSelector(state=>state.socket.subscriptions);
    const [newChat,setNewChat]=useState(null); // 새로 도착한 채팅
    const [numberOfChattings,setNumberOfChattings]=useState();


    const selectedRoom=(item,itemTitle)=>{
        console.log('selected room',item);
        console.log('selected room title',itemTitle);
        selectRoom(item,itemTitle);
    }
    
    return (
      <div class="mt-10 flex flex-col h-96 overflow-auto">
        
        {items && items.map((item,idx)=>{
          // console.log("CHATTING",item.chattingId);
          // getChattingListItemInfo(item.chattingId).then((response)=>{
          //     console.log("CHATTINGLISTITEM",response);
          //     // setNumberOfChattings(response.data.result.number);
          //     // setNewChat(response.data.result.last);
          // });
        // const s={
        //     id: res.id,
        //     des: "/sub/chat/"+roomId
        // }
        // subscriptions.push(s);
        // dispatch(saveSubscription(subscriptions));
            return(
              <ChattingListItem
                key={idx}
                item={item}
                memberId={memberId}
                selectedRoom={selectedRoom}
                onClick={()=>{
                  onClickItem(item);
                }}/>
            );
          })}
       
          
        </div>
    );
    
}

export default ChattingList;