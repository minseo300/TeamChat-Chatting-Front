import React, { useState,useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
function ViewOngoingProject(){
    const navigate = useNavigate();
    const { state } = useLocation();
    const { postId } = useParams();
    //프로젝트 진행중일 때는 데일리 회고록/파일 저장 칸 만들면 될듯?

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 min-w-min ">  
            <div className='mx-40 my-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl'>
                <p>프로젝트 제목: {state.title}</p>
                <div className="mt-5 grid grid-cols-2">
                    <p>작성자: {state.name}</p>
                    <p>작성일자: {state.date}</p>
                </div>
                <div className="mt-5 grid grid-cols-2">
                    <p>모집기한: {state.period}</p>
                    <p>진행기간: {state.duration}개월</p>
                </div>
            </div>

            <div className='mx-40 mt-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl h-auto'>
                <p>프로젝트 세부내용</p>
                <hr className="h-px my-4 border-2 border-indigo-100"></hr>
                <div className="flex-column">
                    <p className="mb-3">1. 프로젝트 아이디어</p>
                    <p>{state.contents}</p>
                </div>
            </div>

            <div className='mx-40 my-7 flex-column border-4 border-sky-200  rounded-2xl p-5 font-bold text-2xl min-h-max'>
                <p>프로젝트 파일관리</p>
                <hr className="h-px my-2 border-2 border-indigo-100 "></hr>
                <div className="my-2 grid grid-cols-2 gap-x-10">
                    <div className="flex-column">
                        <p className="mx-2">데일리 회의록</p>
                        <div className ="my-2 text-xl min-w-max grid grid-cols-2 text-center h-36 overflow-y-auto border-4 border-indigo-100 rounded-md">
                            <p> 2023-01-01 회의록</p>
                            <p> 2023-01-02 회의록</p>
                            <p> 2023-01-03 회의록</p>
                            <p> 2023-01-04 회의록</p>
                            <p> 2023-01-05 회의록</p>
                            <p> 2023-01-06 회의록</p>
                            <p> 2023-01-07 회의록</p>
                            <p> 2023-01-06 회의록</p>
                        </div>
                    </div>
                    <div className="flex-column">
                        <p className="mx-2">업로드된 파일</p>
                        <div className ="my-2 px-2 text-xl grid grid-cols-1 h-36 overflow-y-auto border-4 border-indigo-100 rounded-md">
                            <p>소프트웨어 개발 프로세스 엔지니어링 보고서</p>
                            <p>ForCloud 요구사항 분석 보고서</p>
                            <p>사진3</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default ViewOngoingProject;