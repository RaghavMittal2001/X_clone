import React from 'react'
import { BsSearch } from 'react-icons/bs'

const Right_Sidebar = () => {
  return (
    <>  
      <section className="sticky top-0 ml-[900px] flex flex-col space-y-4 p-1 ">
          <div>
            <div className="relative w-full h-[43px] ">
              <div className="absolute top-0 h-full flex items-center mx-4 ">
                <BsSearch className="w-5 h-5 text-gray-500 " />
              </div>
              <input type="text" placeholder="Search Twitter " className=" w-[350px] pl-12  h-full rounded-full p-4 text-start outline-none bg-transparent border border-gray-400 " />
            </div>
          </div>
          <div>
            <div>Treading Topics</div>  
          </div>
        </section> 
    </>
  )
}

export default Right_Sidebar
