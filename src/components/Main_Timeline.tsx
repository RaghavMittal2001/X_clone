import { useQuery } from "@apollo/client";
import React from "react";
import Tweet from "./servercomponents/Tweet";
import { All_Tweets } from "@/graphql/Queries";
import PostTweet from "./ClientComponents/PostTweet";

const Main_Timeline = () => {
  const { data, error, loading } = useQuery(All_Tweets);
  console.log("data", data);
  const allTweets = data?.tweets || [];

  return (
    <>
      <main className="ml-[275px] p-2 mx-2 flex w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600 bg-background-secondary">
        <h1 className="text-xl font-bold p-2 backdrop-blur bg-black/10 sticky top-0">
          Home
        </h1>
        <PostTweet />
        <div className="flex flex-col">
          {loading && <div className="text-center">Loading...</div>}
          {error && console.error("Error fetching tweets:", error)}
          {!loading && !error && allTweets.length === 0 && (
            <div>No Tweet is there .Timeline is new</div>
          )}
          {!loading &&
            !error &&
            allTweets.length >= 0 &&
            allTweets.map((tweet: TweetType) => (
              <div key={tweet.id}>
                <Tweet {...tweet} />
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Main_Timeline;
