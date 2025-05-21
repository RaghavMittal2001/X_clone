import Image from 'next/image';
import React from 'react'
import { IoStatsChartSharp } from 'react-icons/io5';
import LikeButton from '../ClientComponents/LikeButton';
import ShareButton from '../ClientComponents/ShareButton';
import ReTweet from '../ClientComponents/ReTweet';
import CommentButton from '../ClientComponents/CommentButton';
import { BsDot, BsThreeDots } from 'react-icons/bs';

const Tweet = (tweet:TweetType) => {
 
   
  return (
    <>
      <div
                     key={tweet.id}
                     className="flex items-stretch space-x-2 border-b-[0.5px]  border-gray-600 p-2"
                   >
                     <div>
                       <div className="w-14 h-14 bg-slate-200 rounded-full flex-none ">
                         <Image
                           src={tweet.author.profileImage || "/default-avatar.png"}
                           alt="User Avatar"
                           className="w-full h-full rounded-full object-cover"
                           width={40}
                           height={40}
                         />
                       </div>
                     </div>
                     <div className="flex flex-col w-full">
                       <div className="flex flex-row w-full">
                         <div className="text-xl font-bold mx-2">
                           {tweet.author.fullName}
                         </div>
                         <div className="text-gray-500 ">
                           {" "}
                           @{tweet.author.email?.split("@")[0]}
                         </div>
                         <div className="text-gray-500 mt-1">
                           <BsDot />
                         </div>
                         <div className="text-gray-500">1 hour </div>
                         <div className="text-gray-500 ml-auto mr-3  text-2xl">
                           <BsThreeDots />
                         </div>
                       </div>
                       <div className="flex flex-col w-full">
                         <div className="text-sm mx-2">{tweet.content}</div>
                         <div className="text-gray-500 aspect-auto bg-slate-400  w-full h-80 rounded-xl mt-2"></div>
                         <div className="flex items-center justify-start space-x-20 mt-2 p-1 w-full">
                           <CommentButton selectedTweet={tweet} />
                           <ReTweet/>
                           <LikeButton selectedTweet={tweet}/>  
                           <button
                             title="Views"
                             type="button"
                             className="text-gray-500 cursor-pointer rounded-full hover:text-primary transition duration-200"
                           >
                             <IoStatsChartSharp />
                           </button>
                           <ShareButton/>
                         </div>
                       </div>
                     </div>
                   </div>  
    </>
  )
}

export default Tweet
