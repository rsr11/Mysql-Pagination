import React, { useEffect, useState } from 'react'

const PaginationTest = () => {

   const [data , setData] = useState([]);
   const [page, setPage] = useState(1);
   const [totalPage, setTotalPage] = useState();
  const pageSize = 10; 


   const fetchData = async()=>{
      let res = await fetch(`http://localhost:2000/api/getdata/students?page=${page}&pageSize=${pageSize}`);
      let resData = await res.json();
      setData(resData.data);
      // console.log(resData.totalRow);
      setTotalPage(resData.totalRow[0].row_count);

   }




   useEffect(()=>{
      fetchData();
   },[page])


  return (
    <div className='flex flex-col items=-center justify-center w-full mt-20'>
      <table className='border-2  border-black'>
        <thead>
        <tr className='border-2 border-black'>
          <th className='border-2 p-2 border-black'>Roll No</th>
          <th className='border-2 p-2 border-black'>Name</th>
          <th className='border-2 p-2 border-black'>Gender</th>
          <th className='border-2 p-2 border-black'>Age</th>
        </tr>
        </thead>
        <tbody>
        {data.map((e,index)=>{
          return (
            <tr className='border-2 p-2 border-black' key={e.roll_no}>
              <td className='border-2 p-2 border-black'>{e.roll_no}</td>
              <td className='border-2 p-2 border-black'>{e.name}</td>
              <td className='border-2 p-2 border-black'>{e.gender}</td>
              <td className='border-2 p-2 border-black'>{e.age}</td>
              
            </tr>
          )
        })}
        </tbody>
      </table>
      
      <div className='my-5 mx-10 font-bold'>There are {1} to {10} items from {totalPage}</div>

      <div className='my-5 flex justify-center gap-2 text-white'>
        <button className={`p-2  ${page === 1 ? "bg-blue-200 disable" : "bg-blue-500" }`} onClick={() => setPage((prevPage) => prevPage - 1)} disabled={page === 1} >Prev</button>
        <button className={`p-2 ${page === 1 ? "bg-blue-500" : "bg-blue-200 hover:bg-blue-500" }`} onClick={() => setPage(1)}>1</button>
        <button className={`p-2 ${page === 2 ? "bg-blue-500" : "bg-blue-200 hover:bg-blue-500" }`} onClick={() => setPage(2)}>2</button>
        <button className={`p-2 ${page === 3 ? "bg-blue-500" : "bg-blue-200 hover:bg-blue-500" }`} onClick={() => setPage(3)}>3</button>
        <button className={`p-2  ${page === 3 ? "bg-blue-200 disable" : "bg-blue-500" }`} onClick={() => setPage((prevPage) => prevPage + 1)} disabled={page === 3}>Next</button>

      </div>
      
    </div>
  )
}

export default PaginationTest
