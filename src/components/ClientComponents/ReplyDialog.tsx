"use client";
import { CREATE_REPLY } from "@/graphql/Queries";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";

const ReplyDialog = ({ selectedTweet, isOpen,onClose }: ReplyDialogProps) => {
  const logginuser = useSelector((state: ReduxState) => state.user);
  const [commentboxisOpen, setCommentBoxIsOpen] = useState(isOpen);
  const [createReply] = useMutation(CREATE_REPLY);
  const [replycontent, setReplyContent] = useState("");

  useEffect(() => {
    setCommentBoxIsOpen(isOpen);
  }, [isOpen]);

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replycontent.trim()) return;

    try {
      await createReply({
        variables: {
          tweetId: selectedTweet?.id,
          userId: logginuser.id,
          content: replycontent,
        },
      });
      console.log("Reply created successfully");
      setReplyContent("");
      setCommentBoxIsOpen(false);
    } catch (error) {
      console.error("Error in creating reply:", error);
    }
  };
  
  
  if (!commentboxisOpen || !selectedTweet) return null;
  
  return (
    <div className="fixed z-10 top-0  flex items-start justify-center left-2.5 bg-background-auth w-full h-full p-8">
      <Dialog open={commentboxisOpen} onOpenChange={onClose}>
        <DialogDescription className=" hidden">
        Type your reply below and click post to submit.
        </DialogDescription>
        <DialogContent className="text-white rounded-2xl shadow-3xl w-full max-w-max p-4 bg-background-secondary">
          <DialogTitle className="sr-only">Reply</DialogTitle>
          
          <div className="flex flex-col gap-6 items-center justify-center">
          <div className="flex">
          {/* Avatar */}
          <div className="flex flex-col items-center mx-2">
          <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden">
          <Image
          src={
            selectedTweet.author.profileImage || "/default-avatar.png"
          }
          alt="User Avatar"
          className="w-full h-full object-cover"
          width={40}
          height={40}
          />
          </div>
          <div className="w-px flex-1 bg-gray-500 mt-1"></div>
          </div>

          {/* Tweet Content */}
              <div className="flex items-stretch space-x-2 p-2">
              <div className="flex flex-col w-[550px]">
                  <div className="flex flex-row w-full">
                  <div className="text-lg font-bold pr-1">
                      {selectedTweet.author.fullName}
                    </div>
                    <div className="text-gray-500">
                    @{selectedTweet.author.email?.split("@")[0]}
                    </div>
                    <div className="text-gray-500 mt-1">
                    <BsDot />
                    </div>
                    <div className="text-gray-500">1 hour</div>
                    
                    </div>
                    <div className="text py-1">{selectedTweet.content}</div>
                    <div className="py-2 text-sm text-gray-400">
                    Replying to @{selectedTweet.author.email}
                  </div>
                  </div>
                  </div>
                  </div>

            {/* Reply Form */}
            <div className="flex text-white m-2 w-full">
            <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden">
            <Image
                  src={logginuser.avatar_url || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  width={40}
                  height={40}
                  />
              </div>
              <form
                className="flex flex-col w-full text-3xl"
                onSubmit={handleReply}
                >
                <textarea
                value={replycontent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={3}
                maxLength={280}
                className="w-full bg-transparent outline-none border-none border-b-[0.25px] border-gray-800 p-2 mb-8 text-2xl resize-none"
                placeholder="Post your Reply"
                />
                <input type="hidden" name="tweet" value={replycontent} />
                <div className="flex justify-end">
                <button
                type="submit"
                disabled={replycontent.trim() === ""}
                className={`rounded-full font-bold px-4 py-2 w-full max-w-[100px] text-lg text-center transition duration-200
                  ${
                    replycontent.trim() === ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-hover"
                  }`}
                  >
                    Reply
                    </button>
                    </div>
                    </form>
                    </div>
                    </div>
                    </DialogContent>
                  </Dialog>
                </div>
  );
};

export default ReplyDialog;