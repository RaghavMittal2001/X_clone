import React from 'react'
import { BsShare } from 'react-icons/bs'

const ShareButton = () => {
  return (
    <div>
      <button
                             title="Share"
                             type="button"
                             className="text-gray-500 cursor-pointer rounded-full hover:text-primary transition duration-200"
                           >
                             <BsShare />
                           </button>
    </div>
  )
}

export default ShareButton
