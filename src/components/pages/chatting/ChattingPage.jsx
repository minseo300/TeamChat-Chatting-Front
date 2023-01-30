import React, { useState,useEffect } from "react";
import {connect, getRooms, subscribe,getClient,deleteRoom,exitRoom} from '../../../services/ChattingService';
import ChattingRoom from "./ChattingRoom";
import ChattingList from "./list/ChattingList";
import { useRef } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { connectSocket, saveSubscription } from "../../../modules/socket";
import { useNavigate } from "react-router-dom";
import {BrowserRouter, Link, Route, Routes,Router} from "react-router-dom";

export default function ChattingPage() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    let socket=useSelector(state=>state.socket.socket);
    let subscriptions=useSelector(state=>state.socket.subscriptions);

    const [roomList, setRoomList] = useState([]);
    const [room,setRoom]=useState(0);
    // const [room,setRoom]=useState(false);
    const [roomTitle,setRoomTitle]=useState();
    const [address, setAddress] = useState();
    const [boss,setBoss]=useState(0);
    const [btn,setBtn]=useState(false);
    const [text,setText]=useState("");
    let bi=0;

    ///////////////////////////////////// 테스트용 코드
    const [memberId,setMemberId]=useState();
    const handleOnChange = (e) => {
        setMemberId(e.target.value);
    };
    const handleSubmit = async (e) => {
        const input=e.target.value;
        console.log("input",input);
        const infos=input.split(" ");
        setMemberId(infos[0]);
        setNickname(infos[1]);
        // setNickname(infos[1]);
        // setMemberId(e.target.value);
        // e.preventDefault();
        // handleSubmit(msg);
        // setMemberId("");
    };
    

    const [nickname,setNickname]=useState();
    const handleOnChangeNN = (e) => {
        setNickname(e.target.value);
    };
    const handleSubmitNN = async (e) => {
        setNickname(e.target.value);
        // e.preventDefault();
        // handleSubmit(msg);
        // setMemberId("");
    };
    //////////////////////////////////////////////////////////////////


    // 채팅방 선택 시 우측 화면 상단에 채팅방 제목을 보여줌
    const selectRoom=(item,itemTitle)=>{
        console.log('chatting page - selected room id',item);
        console.log('chatting page - selected room title',itemTitle);
        setRoom(item);
        setRoomTitle(itemTitle);
        item.participantList.map((p)=>{
            console.log("p",p.type);
            if(p.type==="팀장") {
                console.log("memberIIIIDDDD",p.memberId);
                bi=p.memberId;
                console.log("boss Id",bi);
            }
        });
        setBtn(true);
        console.log("bossId",typeof(bi));
        console.log("memberId",typeof(memberId));
        if(bi===Number(memberId)) setText("삭제");
        else setText("나가기");
    }

    useEffect(()=>{
    //    connect();
        const client=connect();
        dispatch(connectSocket(client));
        // console.log('chatting page socket',socket);
        getRooms(Number(memberId)).then((response)=>{
            if(response.data.code!==1000) console.log("SERVER ERROR");
            else{
                const data=response.data.result;
                if(data.length===0) console.log("no rooms");
                else{
                    setRoomList(data);
                    console.log("chatting page",roomList);

                }
            }
        });
    },[memberId]); // TODO: memberId 지워야행

    useEffect(()=>{

    },[roomList]);
    
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-full">
            {/* TODO: input 지우기 */}
            <input type="text" id="memberId" value={memberId}
                        onKeyDown={(e)=>{
                            if(e.key==="Enter") {
                                console.log("ENTER");
                                handleSubmit(e);
                            }
                        }}
                        class="bg-gray-50 border md:w-48 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <div className="flex flex-row pt-5 md:h-full">
                <div className='md:h-full md:w-1/3'>
                    <p className="text-2xl font-bold text-gray-900">채팅방 리스트</p>
                    {roomList&&<ChattingList items={roomList} selectRoom={selectRoom} memberId={memberId}/>}
                </div>

                <div className='md:h-fit pl-10 md:w-full'>
                    {room.chattingId===0 ?
                        <div>
                            <p className="text-2xl font-bold text-gray-900">원하는 채팅방을 선택하세요!</p>
                        </div>
                        :
                        <div className="md:w-full md:h-full">
                            <div className="flex">
                                    <p className="text-2xl font-bold text-gray-900">{roomTitle}</p>
                                    {btn?
                                         <button className="ml-auto" onClick={()=>{
                                            if(text==="나가기"){
                                                exitRoom(room.chattingId,memberId).then((response)=>{
                                                    let newRoomList=roomList.filter(
                                                        roomItem=>roomItem.chattingId!=room.chattingId
                                                    )
                                                    setRoomList(newRoomList);
                                                });
                                            }
                                            else if(text==="삭제"){
                                                deleteRoom(room.chattingId,memberId).then((response)=>{
                                                    const des="/sub/chat/"+room.chattingId;
                                                    subscriptions.map((sub)=>{
                                                        if(sub.des===des) socket.unsubscribe(sub.id);
                                                    })
                                                    subscriptions=subscriptions.filter(
                                                        subsrciption=>subsrciption.des!=des
                                                    )
                                                    dispatch(saveSubscription(subscriptions));
                                                    let newRooms=roomList.filter(
                                                        roomItem=>roomItem.chattingId!=room.chattingId
                                                    )
                                                    setRoomList(newRooms);
                                                });
                                            }
                                         }}>{text}</button>
                                         :
                                        <div/>
                                    }
                            </div> 
                            
                            <Routes>
                                <Route path="/:roomId" element={<ChattingRoom room={room} memberId={memberId} nickname={nickname}/>}/>
                            </Routes>
                        </div>
                    }
            </div>
            
            </div>
        </div>
    )
}