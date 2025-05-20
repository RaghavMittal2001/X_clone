"use client";
import Left_Sidebar from "@/components/Left_Sidebar";
import Main_Timeline from "@/components/Main_Timeline";
import Right_Sidebar from "@/components/Right_Sidebar";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";
import { Session } from "@supabase/supabase-js"; // Import Session and User types from Supabase
import { useDispatch, useSelector } from "react-redux";
import { setId, setUser } from "@/Redux/userSlice"; // Import your Redux action
import { gql, useLazyQuery } from "@apollo/client";

const GET_USER_BY_EMAIL = gql`
    query GetUserByEmail($email: String!) {
      userByEmail(email: $email) {
        id
        email
      }
    }
  `;

const Home = () => {
  const dispatch = useDispatch();
  const user=useSelector((state: ReduxState) => state.user);
  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL);
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
      // Check if user already exists in the database
        if(!user.id){
                    const { data: existingUserData } = await getUserByEmail({
                                variables: { email: user.email },
                              });
                    if (existingUserData && existingUserData.userByEmail) {
                      console.log(
                        "User already exists in the database with ID:",
                        existingUserData.userByEmail.id
                      );
                      dispatch(setId(existingUserData.userByEmail.id));
                    }
    }
    };

    fetchSession();
    
  }, [  ]);
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
