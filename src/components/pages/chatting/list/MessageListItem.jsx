import React, { useEffect } from 'react'
import { useState, Fragment } from 'react'
import { useNavigate} from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ForwardIcon, TrashIcon,ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { useSelector,useDispatch } from 'react-redux';
import { ms } from 'date-fns/locale';
import { useRef } from 'react';
import { saveBeforeMsg } from '../../../../modules/socket';

function MessageListItem(props) {
    const {item,memberId,idx,beforeMsg}=props;

    const time=item.timestamp.substr(8,2)+":"+item.timestamp.substr(10,2);
    const [checkType,setCheckType]=useState(false);
    const [dateChanged,setDateChanged]=useState(false);
    
    useEffect(() => {
        if(idx===0) {
            setDateChanged(true);
        }
        else{
            if(beforeMsg.timestamp.substr(0,8)!==item.timestamp.substr(0,8)) setDateChanged(true);
        }
    }, [])
   
    
    // TODO: memberId number로 형변환한거 삭제
    return (
        <div>
            {dateChanged&&<div className="rounded-lg text-center bg-slate-500 text-white text-sm font-medium">{item.timestamp.substr(0,4)+"년 "+item.timestamp.substr(4,2)+"월 "+item.timestamp.substr(6,2)+"일"}</div>}
            <div className={"font-normal w-20 " + (Number(memberId)!==item.memberId ? "ml-2":"ml-auto text-end mr-2") }>
                {item.nickName}
            </div>
            {Number(memberId)!==item.memberId?
                <div className='flex'>
                    <div className='rounded-sm w-fit min-w-fit h-full text-sm font-bold bg-blue-300 text-black ml-2 py-1 px-2'>
                        {item.msg}
                    </div>
                    <div className={"text-xs font-thin text-gray-600 pt-4 pl-1"}>
                        {time}
                    </div>
                </div>
                :
                <div className='flex ml-auto'>
                    <div className={"text-xs font-thin text-gray-600 pt-4 ml-auto pr-1"}>
                        {time}
                    </div>
                    <div className='rounded-sm w-fit h-full text-sm font-bold bg-sky-200 text-black mr-2 py-1 px-2'>
                        {item.msg}
                    </div>
                </div>
            }
           
            
        </div>
    )
}

export default MessageListItem;