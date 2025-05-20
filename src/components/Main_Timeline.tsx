'use client';
import { gql, useLazyQuery } from "@apollo/client";
import React from "react";
import { AiOutlineLike, AiOutlineRetweet } from "react-icons/ai";
import { BsDot, BsShare, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import Image from "next/image";

const All_Tweets = gql`
    query AllTweets {
        tweets {
    userId
    updatedAt
    id
    createdAt
    content
    author {
      id
      fullName
      email
     profileImage
    }
  
  }
    }
    `;
const CREATE_TWEET = gql`
  mutation CreateTweet($content: String!, $userId: Int!) {
    createTweet(content: $content, userId: $userid) {
      id
      content
    }
  }
`;
const Main_Timeline = () => {
    const [commentboxisOpen, setCommentBoxIsOpen] = React.useState(false);
    const [allTweets, setAllTweets] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const logginuser = useSelector((state: ReduxState) => state.user);
    const [createTweet] = useMutation(CREATE_TWEET);
    const [getAllTweets] = useLazyQuery(All_Tweets, {
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            console.log("Fetched tweets:", data.tweets);
            setAllTweets(data.tweets);
        },
        onError: (error) => {
            console.error("Error fetching tweets:", error);
            console.error("GraphQL Error:", error.graphQLErrors);
            console.error("Network Error:", error.networkError);
        },
    });
    React.useEffect(() => {
        getAllTweets();
    }, []
    );

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
    }

    const handlelike = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("like");
        // Handle like functionality here
        //check if user already liked the tweet
        // if not, create a like
        // if yes, remove the like
    }
    const handlerepost = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("repost");
        // Handle repost functionality here
        //check if user already reposted the tweet
        // if not, create a repost
        // if yes, remove the repost
    }
    return (
        <>
            <main className="ml-[275px] p-2 mx-2 flex w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600 bg-background-secondary">
                <h1 className="text-xl font-bold p-2 backdrop-blur bg-black/10 sticky top-0">
                    Home
                </h1>
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
                <div className="flex flex-col">
                    {allTweets && allTweets.map((tweet: TweetType) => (
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
                                    <div className="text-xl font-bold mx-2">{tweet.author.fullName}</div>
                                    <div className="text-gray-500 "> @{tweet.author.email?.split('@')[0]}</div>
                                    <div className="text-gray-500 mt-1">
                                        <BsDot />
                                    </div>
                                    <div className="text-gray-500">1 hour </div>
                                    <div className="text-gray-500 ml-auto mr-3  text-2xl">
                                        <BsThreeDots />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="text-sm mx-2">
                                        {tweet.content}
                                    </div>
                                    <div className="text-gray-500 aspect-auto bg-slate-400  w-full h-80 rounded-xl mt-2"></div>
                                    <div className="flex items-center justify-start space-x-20 mt-2 p-1 w-full">
                                        <button
                                            title="Comment"
                                            type="button"
                                            onClick={() => {setCommentBoxIsOpen(true)}}
                                            className="text-gray-500 flex  cursor-pointer rounded-full hover:text-primary transition duration-200"
                                        >
                                            <FaRegComment />
                                        </button>
                                        <button
                                            title="Repost"
                                            type="button"
                                            onClick={handlerepost}
                                            className="text-gray-500 flex cursor-pointer rounded-full hover:text-primary transition duration-200"
                                        >
                                            <AiOutlineRetweet />
                                        </button>
                                        <button
                                            title="Like"
                                            type="button"
                                            onClick={handlelike}
                                            className="text-gray-500 cursor-pointer rounded-full hover:text-primary transition duration-200"
                                        >
                                            <AiOutlineLike />
                                        </button>
                                        <button
                                            title="Views"
                                            type="button"
                                            className="text-gray-500 cursor-pointer rounded-full hover:text-primary transition duration-200"
                                        >
                                            <IoStatsChartSharp />
                                        </button>
                                        <button
                                            title="Share"
                                            type="button"
                                            className="text-gray-500 cursor-pointer rounded-full hover:text-primary transition duration-200"
                                        >
                                            <BsShare />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Main_Timeline;
