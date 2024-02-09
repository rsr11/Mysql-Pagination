import React, { useEffect, useState } from 'react'

const TestingFilter = () => {

    const [data, setData] = useState([]);
    const [activeStatus, setActiveStatus] = useState("all");
    const [activeSport, setActiveSport] = useState("all");
    
  
    const fetchData = async()=>{
     
      let res = await fetch(`http://localhost:2000/api/getData/${activeStatus}/${activeSport}`);
      let resData = await res.json();
      setData(resData);
      // console.log(resData);
    }
  
  
    const activeChangeHandler = (e)=>{
      console.log(e.target.value);
      setActiveStatus(e.target.value);
    }
  
    
    const activeSportHandler = (e)=>{
      console.log(e.target.value);
      setActiveSport(e.target.value);
    }
  
    useEffect(()=>{
      fetchData();
    },[activeSport,activeStatus])
  

  return (
    <div>
       <h1 className='text-center text-3xl mt-10'> Testing </h1>
    
    <div className='flex w-[80vw] gap-20 mx-auto'>
     
     <select name="" id="" onChange={activeChangeHandler} value={activeStatus} >
      <option value="all" >Any</option>
      <option value="1" >Active</option>
      <option value="0" >Inactive</option>
     </select>

     <select name="" id="" onChange={activeSportHandler} value={activeSport} >
      <option value="all" >Any</option>
      <option value="2" >Cricket</option>
      <option value="1" >Football</option>
      <option value="3" >Tennis</option>
     </select>

    </div>


    <div className='mt-20 w-[80vw] mx-auto'>
           {data.map((e)=>{
              return (
                <>
                 <div className='mt-3'  key={e.id} >
                    <h1> <span>{e.id}</span> {e.matchName}</h1>
                 </div>
                </>
              )
           })}
    </div>
    </div>
  )
}

export default TestingFilter
