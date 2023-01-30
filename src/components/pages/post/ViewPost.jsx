import React, { useState, useEffect} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getApplicant, deleteMyPost, updatePostView, updatePostStatus } from "../../../services/PostService";
import Modal from "./Modal";
function ViewPost() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { postId } = useParams();
    const [member, setMember] = useState([]); // 회원==true, 비회원==false
    const [myPost, setMyPost] = useState([]); // 자신이 쓴 글==true, 다른 사람이 쓴 글==false
    const [applicant, setApplicant] = useState([]);
    const [clickedCategory, setClickedCategory] = useState([]);
    //지금은 각각 모달 state를 만들었지만 전역 모달로 바꿔서 해도 될듯
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    
    const openModal = (value) => {
        setClickedCategory(value.target.value)
        setRegisterModalOpen(true);
    };
    const approveModal = (value) => {
        setClickedCategory(value.target.value)
        setApproveModalOpen(true);
    };
    const rejectModal = (value) => {
        setClickedCategory(value.target.value)
        setRejectModalOpen(true);
    };

    const closeModal1 = () => {
        setRegisterModalOpen(false);
    };
    const closeModal2 = () => {
        setApproveModalOpen(false);
    };
    const closeModal3 = () => {
        setRejectModalOpen(false);
    };

    // 조회수 증가
    useEffect(() => {
        updatePostView(postId);
    }, [])

    //자신이 쓴 글이면 수정하기 버튼 + 신청하기 x
    //다른 사람이 쓴 글이면 + 신청하기 버튼만 ㅇ
    useEffect(() => {
        // // 회원, 비회원 구분
        // if(response.member_case===true){
        //     setMember(true);
        // }
        // else if(response.member_case===false){
        //     setMember(false);
        // }

        // 자신이 쓴 글, 다른 사람이 쓴 글 구분
        if (state.name === localStorage.getItem('name')) {
            setMyPost(true);
            getApplicant(postId).then((response) => {
                setApplicant(response);
            })
        } else {
            setMyPost(false);
        }
        console.log(state)
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 min-w-min">
            <div className='mx-40 my-7 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl'>
                <div className ="flex">
                    <p>프로젝트 제목: {state.title}</p>
                    {state.postType === "recruiting" && myPost && <button className = "ml-auto text-sky-500" onClick={() => {
                        updatePostStatus(postId).then(()=>{
                            console.log("모집완료")
                            navigate('/mainPage');
                        })
                    }}>완료하기</button>}
                    
                    {state.postType === "recruiting" && myPost && <button className = "ml-5 text-violet-500 " onClick={() => {
                        //글 쓰는 페이지로 이동하면서 현재 postId의 값을 다 가지고 와야함.
                        // deleteMyPost(state.postId).then(()=>{
                        //     navigate('/mainPage');
                        // })
                    }}>수정하기</button>
                    }

                    {myPost && <button className = {state.postType === "recruiting" ? "ml-5 text-red-500" : "ml-auto text-red-500"} onClick={() => {
                        deleteMyPost(postId).then(()=>{
                            console.log("삭제완료")
                            navigate('/mainPage');
                        })
                    }}>삭제하기</button>}

                </div>
                <div className="mt-5 grid grid-cols-2">
                    <p>작성자: {state.name}</p>
                    <p>작성일자: {state.date}</p>
                </div>
                <div className="mt-5 grid grid-cols-2">
                    <p>모집기한: {state.period}</p>
                    <p>진행기간: {state.duration}개월</p>
                </div>
            </div>

            <div className='mx-40 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl'>
                모집분야
                <hr className="h-px mt-4 border-2 border-indigo-100"></hr>
                <div className='mt-4 flex-column'>
                    {state.area.map((k, key) => {
                        return (
                            <div key={key} className="flex mb-1">
                                <div className="flex">
                                    <img className="mr-1 rounded-2xl w-10 h-11" src={k.img} alt={k.name} />
                                    <p className="m-auto">{k.name}</p>
                                </div>
                                <p className="my-auto ml-auto"> {k.current} / {k.value} 명</p>
                                {state.postType === "recruiting" && !myPost && <button
                                    key={key}
                                    onClick={openModal}
                                    value={k.name}
                                    className="ml-4 border rounded-md w-24 bg-sky-100 outline-none hover:bg-sky-200">신청하기</button>}
                                {registerModalOpen && <Modal open={registerModalOpen} close={closeModal1} header="모집분야" postId ={postId} category={clickedCategory}>
                                    해당 모집분야에 신청하시겠습니까?
                                </Modal>}
                            </div>
                        );
                    })}
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

            {state.postType === "recruiting" && myPost && <div className='mx-40 mt-7 mb-4 border-4 border-sky-200 rounded-2xl p-5 flex-column font-bold text-2xl max-h-96'>
                <p>신청자 리스트</p>
                <hr className="h-px my-4 border-2 border-indigo-100 "></hr>
                <div className="flex-column max-h-72 overflow-y-auto scrollbar-hide">
                    {applicant && applicant.map((item, idx) => {
                        return (
                            <div key={idx} className="flex my-2 pb-1 border-b border-b-cyan-100">
                                <p className="ml-1">이름: {item.name}</p>
                                <p className="ml-4">신청: {item.requested}</p>
                                <div className ="ml-auto">
                                    <button
                                        onClick = {approveModal}
                                        value={item.name}
                                        className="ml-4 border rounded-md w-24 bg-sky-100 outline-none hover:bg-sky-200">승인</button>
                                       
                                    {approveModalOpen && <Modal open={approveModalOpen} close={closeModal2} header="승인하기" postId ={postId} category={clickedCategory}>
                                        해당 인원을 승인시키겠습니까?
                                    </Modal>}

                                    <button
                                        value={item.name}
                                        className="ml-4 border rounded-md w-24 bg-sky-100 outline-none hover:bg-sky-200">포트폴리오</button>
                                        
                                    <button
                                        onClick = {rejectModal}
                                        value={item.name}
                                        className="ml-4 border rounded-md w-24 bg-sky-100 outline-none hover:bg-sky-200">거절</button>
                                        
                                    {rejectModalOpen&&<Modal open={rejectModalOpen} close={closeModal3} header="거절하기" postId ={postId} category={clickedCategory}>
                                        해당 신청을 거절하시겠습니까?
                                    </Modal>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    );

}
export default ViewPost;