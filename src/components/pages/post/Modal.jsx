import React from 'react'
import { useNavigate } from "react-router-dom";
import { createApplicant, createParticipant, deleteApplicant, updateCurrentCategory } from '../../../services/PostService';

function Modal(props) {
    const navigate = useNavigate();
    const {open, close, header, postId, category} = props;
    const Register = () => {
        if(header ==="모집분야"){
            createApplicant(postId, category.toLowerCase()).then((response) => {
                if(response === 1000){
                    close();
                    navigate('/mainPage');
                }
            })
        }else if(header === "승인하기"){
            createParticipant(postId, category).then((response) => {
                if(response === 1000){
                    console.log('승인하기 성공')
                    updateCurrentCategory(postId, category).then((response) => {
                        if(response === 1000){
                            deleteApplicant(postId, category).then((res) => {
                                if(res === 1000) {
                                    close();
                                }
                            })
                        }
                    })
                }
            })
        }else if(header === "거절하기"){
            deleteApplicant(postId, category).then((response) => {
                if(response === 1000){
                    close();
                }
            })
        }
    }
  return (
    <div className = {open ? 'flex justify-center animate-modalBgShow fixed inset-0 z-99 bg-gray-800 bg-opacity-60': 'hidden fixed inset-0 z-99 bg-gray-600'}>
        {open ? (
            <div className ="w-11/12 max-w-2xl m-auto border rounded-md bg-white overflow-hidden">
                <div className='flex relative p-4 bg-white font-bold'>
                    {header}
                    <button className='close absolute top-4 right-4 w-8 text-xl font-bold text-center bg-sky-100 border rounded-md text-black' onClick = {close}>
                        &times;
                    </button>
                </div>
                <div className ="p-4 border-y border-y-fuchsia-300">{props.children}</div>
                <div className ="p-3 text-right">
                    <button className='p-2 bg-sky-100 border rounded-md text-sm' onClick={() => {Register();}}>
                        예
                    </button>
                    {/* <button className='ml-4 p-2 bg-sky-100 border rounded-md text-sm' onClick={close}>
                        아니오
                    </button> */}
                </div>
            </div>
        ) : null}
    </div>
  );
};

export default Modal