import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MessageListItem from "./MessageListItem";
import {connect, getRooms, subscribe} from '../../../../services/ChattingService';
import { setDate } from "date-fns";
import { saveBeforeMsg } from "../../../../modules/socket";


function MessageList(props) {
    const dispatch=useDispatch();
    const {items,memberId}=props;
    const [chats,setChats]=useState([]);
    // const [msg,setMsg]=useState();
    // const [beforeMsg,setBeforeMsg]=useState();
    let beforeMsg;
  
    useEffect(() => {
        console.log("MessageList - chats",items);
        setChats(items);
    }, [items]);
    
    return (
      <div class="mt-6 flex-row-reverse h-96 overflow-y-auto md:w-full">
        {items && items.map((item,idx)=>{
           if(idx===0) beforeMsg=item;
           else beforeMsg=items[idx-1];
            return(
                <MessageListItem
                    key={idx}
                    idx={idx}
                    memberId={memberId}
                    beforeMsg={beforeMsg}
                    item={item}/>
            );
        })}
        </div>
    );
    
}

export default MessageList;