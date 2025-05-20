"use server"

import { createClient } from "@/utils/supabase/server";

export async function handleTweet(formdata: FormData): Promise<void> {

    console.log("formdata", formdata);
    const tweet = formdata.get("tweet");
  console.log("Tweet content:", tweet);

  if(!tweet) {
    throw new Error("Tweet content is required");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tweets")
    .insert([
      {
        content: tweet,
        user_id: "1", // Replace with the actual user ID
      },
    ])
    .select("*");
  console.log("data", data);
    
    if (error) {
        console.error("Error inserting tweet:", error);
        throw new Error("Failed to insert tweet");
    }   
    console.log("Tweet inserted successfully:", data);
    return ;
}