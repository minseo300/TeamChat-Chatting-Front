
import NotFound from './components/common/NotFound';
import Home from './components/pages/Home';



import MainPage from './components/pages/post/MainPage';
import ViewPost from './components/pages/post/ViewPost';
import ProjectManage from './components/pages/post/ProjectManage';
import ViewProject from './components/pages/post/ViewProject';
import PostManage from './components/pages/post/PostManage';


import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ChattingPage from './components/pages/chatting/ChattingPage';
import ChattingRoom from './components/pages/chatting/ChattingRoom';


function App() {
  return (
     //<Provider store={store}>
     <>
      <Header />
      <div className='min-h-screen'>
        <BrowserRouter>
            
                <Routes>


                      
                      
            

                      <Route path="/" element={<Home />} />
                      <Route path="rooms/*" element={<ChattingPage/>}/>
                      <Route path="member/:memberId/rooms/:roomId" element={<ChattingRoom />} />
                      <Route path="/mainPage" element={<MainPage />} />
                      <Route path="/viewPost/:postId" element={<ViewPost />} />
                      <Route path="/projectManage" element={<ProjectManage />} />
                      <Route path="/postManage" element={<PostManage />} />
                      <Route path="/viewProject/:postId" element={<ViewProject />} />
                      {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                      <Route path="*" element={<NotFound />}></Route>
                  </Routes>
            
        </BrowserRouter>
      </div>
      <Footer />
     </>
  );
}

export default App;
