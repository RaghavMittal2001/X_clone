import React from 'react'
import { AiOutlineRetweet } from 'react-icons/ai'

const ReTweet = () => {
    const handlerepost = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log("repost");
      // Handle repost functionality here
      //check if user already reposted the tweet
      // if not, create a repost
      // if yes, remove the repost
    };
  return (
    <div>
      <button
                             title="Repost"
                             type="button"
                             onClick={handlerepost}
                             className="text-gray-500 flex cursor-pointer rounded-full hover:text-primary transition duration-200"
                           >
                             <AiOutlineRetweet />
                           </button>
    </div>
  )
}

export default ReTweet
