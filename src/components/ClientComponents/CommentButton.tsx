import React from "react";
import { FaRegComment } from "react-icons/fa";
import ReplyDialog from "./ReplyDialog";

const CommentButton = ({selectedTweet}:CommentButtonProps) => {
  const [CommentBoxisOpen, setCommentBoxIsOpen] = React.useState(false);
 
  return (
    <>
      <ReplyDialog isOpen={CommentBoxisOpen} selectedTweet={selectedTweet} onClose={() => setCommentBoxIsOpen(false)}/>
      <button
        title="Comment"
        type="button"
        onClick={() => {
          setCommentBoxIsOpen(true);
        }}
        className="text-gray-500 flex  cursor-pointer rounded-full hover:text-primary transition duration-200"
      >
        <FaRegComment/>
      </button>
    </>
  );
};

export default CommentButton;
