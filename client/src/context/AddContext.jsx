import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()


    const [allCourses,setAllCourses]=useState([])
    //fetch all courses
    const fetchAllCourses =async()=>{
        setAllCourses(dummyCourses)
    }

    // function to calculate average rating of each course 
        const calculateRating =(course)=>{
if(course.courseRatings.length===0){
    return 0;
}
let totalRating =0 
course.courseRatings.forEach(rating =>{
    totalRating+= rating.rating
})
return totalRating / course.courseRatings.length
        }
       // function to calculate course chapter time  
        const calculateChapterTime =(chapter)=>{

            let time = 0
            chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration)
            return  humanizeDuration(time*60*100 ,{units:['h','m']})
            
        }
        // function to claculate course duration 
        const calculateCourseDuration =(course)=>{
                let time =0
                course.courseContent.map((chapter)=>chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration
            ))

            return  humanizeDuration(time*60*100 ,{units:['h','m']})
        }
        //function to claculate the number of the lectures in the course 
        const calculateNoOfLectures=(lecture)=>{
            let totalLectures =0;
            course.courseContent.forEach(chapter=>{
                
            })

        }

    useEffect(()=>{
fetchAllCourses()
    },[])
    const value ={
        currency ,allCourses, navigate,  calculateRating

    }
return(
    <AppContext.Provider value={value} >
        {props.children}
    </AppContext.Provider>
)


}
