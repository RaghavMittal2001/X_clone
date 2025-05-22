import { CREATE_TWEET } from "@/graphql/Queries";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const PostTweet = () => {
    const [loading, setLoading] = React.useState(false);
  const logginuser = useSelector((state: ReduxState) => state.user);
  const [createTweet] = useMutation(CREATE_TWEET);
  console.log("logginuser", logginuser);
  const handleTweet = async (formdata: FormData): Promise<void> => {
    setLoading(true);
    console.log("formdata", formdata);
    console.log("logginuser", logginuser);
    await createTweet({
      variables: {
        content: formdata.get("tweet"),
        userId: logginuser.id,
      },
    });
    setLoading(false);
    
    console.log("Tweet created successfully");
  };
  return (
    <div>
      <div className=" border-t-[0.25px]  border-b-[0.25px] flex items-stretch py-4 space-x-2 border-gray-600 relative">
        <div className="w-14 h-14 bg-slate-400 rounded-full flex-none ">
          <Image
            src={logginuser.avatar_url || "/default-avatar.png"}
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover"
            width={40}
            height={40}
          />
        </div>
        <form className="flex flex-col w-full text-3xl" action={handleTweet}>
          <input
            name="tweet"
            type="text"
            title="tweet"
            className="w-full h-full bg-transparent outline-none border-none border-b-[0.25px] border-gray-800 p-2 text-2xl"
            placeholder="what's happening ?"
          />
          <div className="flex justify-between items-center w-full ">
            <div></div>
            <div className="w-full max-w-[100px] ">
              <button
                title="Tweet"
                formAction={handleTweet}
                disabled={loading}
                type="submit"
                className="bg-primary rounded-full font-bold  px-4 py-2 w-full  text-lg text-center hover:bg-primary-hover transition duration-200"
              >
                POST
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostTweet;
