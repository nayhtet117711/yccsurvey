import React from "react"
import Img5 from "../assets/img5.svg"
import Img6 from "../assets/img6.svg"

function Survey() {
  return (
    <div className="grow relative flex justify-center">
      <div className="absolute p-5 left-0">
        <img src={Img5} className="object-contain w-full md:min-w-[25rem]" />
      </div>
      <div className="w-full lg:w-[40rem] h-[800px] border-r border-b bg-white border-l-0 border-t-0"> 
        Survey
      </div>
      <div className="absolute p-5 right-10 bottom-0">
        <img src={Img6} className="object-contain w-full md:min-w-[25rem]" />
      </div>
    </div>
  )
}

export default Survey
