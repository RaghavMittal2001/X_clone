import { CREATE_LIKE } from '@/graphql/Queries';
import {  useMutation } from '@apollo/client';
import React, { useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const LikeButton = ({selectedTweet}:{selectedTweet:TweetType}) => {
  const LogginUser = useSelector((state:ReduxState)=>state.user);
  const[createlike]=useMutation(CREATE_LIKE);
  const[isliked, setIsLiked]=React.useState(false);
  
    useEffect(() => {
      console.log("selectedTweet", selectedTweet);
    const likedByUser = selectedTweet.likes?.some(
      (like: { user: { id: number } }) => like.user.id === LogginUser.id
    );
    setIsLiked(likedByUser);
  }, [selectedTweet.likes, LogginUser.id]);
  
     const handlelike = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log("like");
      // Handle like functionality here
      //check if user already liked the tweet
     if(isliked){
       // if yes, remove the like
     }
     else{
       // if not, create a like
       await createlike({
         variables: {
           tweetId: selectedTweet?.id,
           userId: LogginUser.id,
          },
        });
      }
    };
  return (
    <div>
      <button
                                   title="Like"
                                   type="button"
                                   onClick={handlelike}
                                   className="text-gray-500 cursor-pointer rounded-full hover:text-primary transition duration-200"
                                 >
                                     {isliked ? <FaHeart /> : <FaRegHeart />}
                                 </button>
    </div>
  )
}

export default LikeButton
