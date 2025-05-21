import { CREATE_LIKE, DELETE_LIKE } from '@/graphql/Queries';
import {  useMutation } from '@apollo/client';
import React, { useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const LikeButton = ({selectedTweet}:{selectedTweet:TweetType}) => {
  const LogginUser = useSelector((state:ReduxState)=>state.user);
  const[createlike]=useMutation(CREATE_LIKE);
  const[deletelike]=useMutation(DELETE_LIKE);
  const[isliked, setIsLiked]=React.useState(false);
  
    useEffect(() => {
      console.log("selectedTweet", selectedTweet);
    const likedByUser = selectedTweet.likes?.some(
      (like: { user: { id: number } }) => like.user.id === LogginUser.id
    );
    setIsLiked(likedByUser);
  }, [selectedTweet, LogginUser.id]);
  
     const handlelike = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      
      // Handle like functionality here
      //check if user already liked the tweet
     if(isliked){// if yes, remove the like
      deletelike({
        variables: {
          tweetId: selectedTweet?.id,
          userId: LogginUser.id,
        },
      });
      setIsLiked(false);
      console.log("Unlike the tweet");
    }
     else{
       // if not, create a like
       await createlike({
         variables: {
           tweetId: selectedTweet?.id,
           userId: LogginUser.id,
          },
        });
        setIsLiked(true);
        console.log("like the tweet");
      }
    };
  return (
    <div>
      <button
                                   title="Like"
                                   type="button"
                                   onClick={handlelike}
                                   className="text-gray-500 cursor-pointer rounded-full hover:text-red-600 transition duration-200"
                                 >
                                     {isliked ? <FaHeart color='red'/> : <FaRegHeart />}
                                 </button>
    </div>
  )
}

export default LikeButton
