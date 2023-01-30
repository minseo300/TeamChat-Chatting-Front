import React, { useEffect } from 'react'
import { useState, Fragment } from 'react'
import { useNavigate} from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ForwardIcon, TrashIcon,ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { useSelector,useDispatch } from 'react-redux';
import { connectSocket,saveSubscription,saveRoomId } from "../../../../modules/socket";
import {connect, getRooms, subscribe,getChattingListItemInfo,updateLastRead,getLastRead} from '../../../../services/ChattingService';
import { set } from 'date-fns';


function ChattingListItem(props) {
    const dispatch=useDispatch();


    const {item,selectedRoom,memberId}=props;
    // console.log("list item key: ",key);
    const navigate=useNavigate();
    const socket=useSelector(state=>state.socket.socket);
    let subscriptions=useSelector(state=>state.socket.subscriptions);
    const [newChat,setNewChat]=useState(null); // 새로 도착한 채팅
    const [numberOfChattings,setNumberOfChattings]=useState();
    const [check,setCheck]=useState(false);
    const [numDiv,setNumDiv]=useState(true);
    const [unRead,setUnRead]=useState(true);
    const [lastRead,setLastRead]=useState();

    // 채팅방 리스트에서 클릭 시 채팅방으로 이동, 안읽은 메세지 개수 0으로 갱신(안읽은 메세지 개수 div 안보이게)
    const updateRoom=()=>{
        // 최근 읽은 채팅 메세지 갱신
        // setUnRead(false);
        setNumberOfChattings(item.last);
        updateLastRead(memberId,item.chattingId,numberOfChattings);
        selectedRoom(item,item.title);
        setNumDiv(false);
        navigate(`/rooms/${item.chattingId}`);

    }
    
    useEffect(() => {
        getChattingListItemInfo(item.chattingId).then((response)=>{
            setNumberOfChattings(response.data.result.number-1);
            setNewChat(response.data.result.last);
            setCheck(true);
            if(numberOfChattings-1-item.last===0) {
                console.log("It's ZERO");
                setUnRead(false);
            }
        })
        // getLastRead(item.chattingId,memberId).then((response)=>{
        //     setLastRead(response.data.result.last);
        // })
    }, []);
    
    useEffect(() => {
        const dest="/sub/chat/"+item.chattingId;
            console.log("---subscriptions: ",subscriptions);
            subscriptions.map((sub)=>{
                console.log("try to unsubscribe",sub);
                if(sub.des===dest){
                    socket.unsubscribe(sub.id);
                    console.log("unsubscribed - roomId",item.chattingId);
                } 
            })
            subscriptions=subscriptions.filter(
                subscription=>subscription.des!=dest
            );
            dispatch(saveSubscription(subscriptions));
            const res=socket.subscribe('/sub/chat/' + item.chattingId, ({body}) => {
                console.log('subscribe - received message',body.msg);
                const received=JSON.parse(body);
                console.log("received parsing:",received.msg);
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
            des: "/sub/chat/"+item.chattingId
        }
        subscriptions.push(s);
        dispatch(saveSubscription(subscriptions));
    }, [socket]);

    useEffect(() => {
        if(newChat!==null){
            console.log("newchat.memberId",newChat.memberId);
            console.log("memberId",memberId);
            console.log("numberOfChatting",numberOfChattings);
            console.log("newChat.roomId",newChat.roomId);
            console.log("item.chattingid",item.chattingId);
        }
        if(newChat!==null&&newChat.memberId!==Number(memberId)) {
            console.log("true");
            setNumDiv(true);
            setNumberOfChattings(numberOfChattings => numberOfChattings + 1);
        }
    }, [newChat]);
    
    return (
            <div className='grid-rows-2 border-4 rounded-xl mb-2 hover:bg-blue-100' onClick={()=>{
                updateRoom();
            }}>
                <div className='flex'>
                    <div className='flex grow'>
                        <p className="text-lg text-black font-black pl-4 pt-2">{item.title}</p>
                        <p className="text-lg text-gray-700 font-thin pl-2 pt-2">{item.participantList.length}</p>
                    </div>
                    {check&&<p className='mr-4 pt-2 text-sm text-gray-500'>{newChat.timestamp.substr(0,4)+"/"+newChat.timestamp.substr(4,2)+"/"+newChat.timestamp.substr(6,2)+" "+newChat.timestamp.substr(8,2)+":"+newChat.timestamp.substr(10,2)}</p>}
                </div>
                <div className='flex'>
                    {check&&<p className="text-sm font-extralight pl-6 grow mt-4 mb-2"> {newChat.msg} </p>}
                    {numDiv&&numberOfChattings-item.last>0?
                        <div className='flex justify-center content-center text-sm font-bold rounded-full md:w-6 md:h-6 mr-4 mt-4 text-center bg-indigo-300 text-white'>
                            <div className='m-auto'>{numberOfChattings-item.last}</div>
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
       
       
    )
}

export default ChattingListItem