import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import java from "../../../category_img/java.png";
import javascript from "../../../category_img/javascript.png";
import python from "../../../category_img/python.jpg";
import react from "../../../category_img/react.png";
import spring from "../../../category_img/spring.png";
import springboot from "../../../category_img/springBoot.png";
import { getProject } from '../../../services/PostService';
function ProjectManage() {
    const navigate = useNavigate();
    const tool = [
      {
        name: "Java",
        img: java,
        type: "backend"
      },
      {
        name: "Python",
        img: python,
        type: "backend"
      },
      {
        name: "React",
        img: react,
        type: "frontend"
      },
      {
        name: "JavaScript",
        img: javascript,
        type: "frontend"
      },
      {
        name: "Spring",
        img: spring,
        type: "backend"
      },
      {
        name: "SpringBoot",
        img: springboot,
        type: "backend"
      }
    ];

    const [myProjectList, setMyProjectList] = useState([]);
    useEffect(()=> {
       getProject().then((response) => {
        setMyProjectList(response);
       })
    }, [])

      const ProjectList = (num) => {
        if(myProjectList.length === 0) return;
        const postList = num === 1 ? myProjectList.filter(el => el.projectType.includes("onGoing")) : 
        myProjectList.filter(el => el.projectType.includes("completed"));

        const area = postList.map(data => {
          if (!data.postResponse.area) {
            return {
              ...data.postResponse, area: [
    
              ]
            }
          }
        })
        console.log(area)
    
        const modifiedPost = area.map(data => {
          delete data.post_category.id;
          const abc = [];
          for (const [key, value] of Object.entries(data.post_category).filter(([, count]) => count > 0)) {
            const aaa = {
              img: `${key}`,
              name: `${key}`,
              value: `${value}`
            };
            abc.push(aaa);
          }
    
          delete data.post_category;
          return {
            ...data,
            area: data.area.concat(abc)
          };
        })

        return modifiedPost.map((item,idx) => (
          <div key ={idx} className="min-w-max rounded-2xl mx-2 border flex-column hover:bg-sky-50 transition cursor-pointer"
            onClick = {()=>{navigate(`/viewProject/${item.id}`, {state: item})}}>
            <h3 className="mx-5 my-2 text-dark font-weight-bold">프로젝트 제목: {item.title}</h3>
            <h3 className="mx-5 my-2 text-dark font-weight-bold">모집기한: {item.period}</h3>
            <h3 className="mx-5 my-2 text-dark font-weight-bold">진행기간: {item.duration}개월</h3>
            <hr className="h-px mx-4 my-2 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <h3 className="mx-5 my-2 text-dark font-weight-bold text-center">모집분야</h3>
            <div className="mx-6 grid grid-rows-2 grid-cols-2 gap-x-2 gap-y-2">
            {item.area.map((k, key) => {
            for(let i=0; i<tool.length; i++){
              if(tool[i].name.toLowerCase() === k.img.toLowerCase()){
                k.img = tool[i].img;
                k.name = tool[i].name;
                break;
              }
            }
            return (
              <div key={key} className="flex border rounded-2xl">
                <img className="rounded-2xl w-9 h-10" src={k.img} alt={k.name} />
                <p className="m-auto">{k.name}</p>
              </div>
            );
          })}
            </div>
            <hr className="h-px mx-4 my-2 first-line:mt-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="flex my-2">
              <h3 className="mx-auto text-dark font-weight-bold">작성자: {item.name}</h3>
              <h3 className="mx-auto text-dark font-weight-bold">조회수: {item.view}회</h3>
            </div>
          </div>
        ))
      }


  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 my-7 border-4 border-sky-200 rounded-2xl">
        <p className="text-2xl font-bold text-gray-900 m-4">참여중인 프로젝트</p>
        <div className="grid grid-cols-4 overflow-auto"> {ProjectList(1)} </div>
        <hr className="h-px my-4 border-2 border-indigo-100"></hr>

        <p className="text-2xl font-bold text-gray-900 m-4">완료된 프로젝트</p>
        <div className="mb-4 grid grid-cols-4 overflow-auto"> {ProjectList(2)} </div>
    </div>
  )
}

export default ProjectManage