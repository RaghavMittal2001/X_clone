"use client";
import Left_Sidebar from "@/components/Left_Sidebar";
import Main_Timeline from "@/components/Main_Timeline";
import Right_Sidebar from "@/components/Right_Sidebar";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";
import { Session } from "@supabase/supabase-js"; // Import Session and User types from Supabase
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/userSlice"; // Import your Redux action

const Home = () => {
  const dispatch = useDispatch();
  const [session, setSession] = React.useState<{
    session: Session | null;
  } | null>(null);
  
  useEffect(() => {
    const supabase = createClient();
    console.log("Supabase client initialized:", supabase);
    console.log('session :',session);
    const fetchSession = async () => {
      await supabase.auth
        .getSession()
        .then((data) => {
          console.log("User data:", data.data.session?.user.user_metadata);
          console.log("Session data:", data.data.session);
          
          dispatch(setUser({
            id: data.data.session?.user.id ?? null,
            username: data.data.session?.user.user_metadata.email?.split('@')[0] ?? null,
            email: data.data.session?.user.user_metadata.email ?? null,
            full_name: data.data.session?.user.user_metadata.full_name ?? null,
            avatar_url: data.data.session?.user.user_metadata.avatar_url ?? null
          }));
         
          setSession({ session: data.data?.session });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    };

    fetchSession();
  }, []);
  // Check if user is logged in

  return (
    <div className="h-full w-full flex items-center justify-center bg-back relative">
      <div className="max-w-screen-xl w-full flex relative">
      
        {/* Left sidebar */}
        <Left_Sidebar  />
        {/* Main content */}
        <Main_Timeline />
        {/* Right sidebar */}
        <Right_Sidebar />
      </div>
    </div>
  );
};

export default Home;
