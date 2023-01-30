import axios from 'axios';
import SockJS from 'sockjs-client';
// import Stomp from '@stomp/stompjs';



// 채팅방 리스트 조회
export async function getRooms(memberId){
    // var memberId=localStorage.getItem('memberId');
   
    const response=await axios.get(`/api/member/${memberId}/rooms`);
    console.log('getRooms response: ',response);
    return response;
}
// 채팅 내역 가져오기
export async function getChattings(roomId){
    const response=await axios.get(`/chat/${roomId}`);
    console.log("[getChattings] ",response);
    return response;
}

// 채팅방 나가기
export async function exitRoom(roomId,memberId){
    const response=await axios.delete(`/api/member/${memberId}/rooms/${roomId}/participant`);
    console.log("[exitRoom]",response);
    return response;
}

// 채팅방 삭제
export async function deleteRoom(roomId,memberId){
    console.log("try to delete room");
    const response=await axios.delete(`/api/member/${memberId}/rooms/${roomId}`);
    console.log("[deleteRoom]",response);
    return response;
}

// ChattingListItem에 넣기 위한 데이터 가져오기 - 채팅 이력에 의한 채팅 개수, 마지막 채팅
export async function getChattingListItemInfo(roomId){
    const response=await axios.get(`/chat/chatting/${roomId}`);
    // const lastReadNum=await axios.get(`/api/member/${memberId}/`)
    return response;
}

// 제일 최근 읽은 채팅 메세지 idx 갱신
export async function updateLastRead(memberId,roomId,chattingIdx){
    const response=await axios.patch(`/api/member/${memberId}/rooms/${roomId}/${chattingIdx}`);
    console.log("-------resposne",response);
    return response;
}

// 가장 최근에 읽은 메세지 인덱스 가져오기
export async function getLastRead(roomId,memberId){
    const response=await axios.get(`/api/member/${memberId}/rooms/${roomId}`);
    return response;
}
export const stomp = require('stompjs');
export let client;
// 채팅방 참여 - receive message
export function subscribe(socket,roomId){
    var response;
    console.log('subscribe: ',socket);
    socket.subscribe('/sub/chat/' + roomId, ({body}) => {
        console.log('subscribe - received message',body);
        response=body;
    // const json_body = JSON.parse(body.body);
    // setChatList((_chat_list) => [
    //     ..._chat_list, json_body
    // ]);
    });
    // client.subscribe(`http://localhost:8081/sub/room.${roomId}`, (body) => {
    //     console.log('subscribe - received message',body);
    // // const json_body = JSON.parse(body.body);
    // // setChatList((_chat_list) => [
    // //     ..._chat_list, json_body
    // // ]);
    // });
};

// 채팅방 참여 - send message TODO: memberId, nickname 수정 필요
export function publish(roomId,message,memberId,nickname,now){
    client.send(`/pub/chat.message.${roomId}`,{}, JSON.stringify({
        msg: message,
        nickName: nickname,
        roomId: roomId,
        timestamp: now,
        memberId: memberId
    }));
};

// 채팅방 참여 - enter 
export function enter(roomId,msg,sender){
    
    client.send('/pub/chat.enter.' + roomId, (body) => {
    // const json_body = JSON.parse(body.body);
    // setChatList((_chat_list) => [
    //     ..._chat_list, json_body
    // ]);
    });
};

export function callback(message){
    const received=JSON.parse(message.body);
    const data={
        nickName:received.nickName,
        memberId:received.memberId,
        roomId:received.roomId,
        msg:received.msg,
        timestamp:received.timestamp
    }
    return data;
}

// 소켓 연결
export function connect(){ // 연결할 때
    let socket=new SockJS('http://localhost:8081/stomp/chat');
    client=stomp.over(socket);
    console.log("client ",client);
    client.connect({},function(){
        // var rooms=[];
        // rooms=getRooms().result;
        // for(let i=0;i<rooms.length;i++){
        //     subscribe(rooms[i].roomId);
        // }
        // subscribe();
    });
    // client.current.activate(); // 클라이언트 활성화
    return client;
};

export function disconnect(client){ // 연결이 끊겼을 때 
    client.current.deactivate();
};

