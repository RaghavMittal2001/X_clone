"use client";
import Left_Sidebar from "@/components/Left_Sidebar";
import Main_Timeline from "@/components/Main_Timeline";
import Right_Sidebar from "@/components/Right_Sidebar";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { useDispatch } from "react-redux";
import { setId, setUser } from "@/Redux/userSlice";
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
  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const session: Session | null = data.session;

        const userMeta = session?.user.user_metadata;

        if (userMeta?.email) {
          const email = userMeta.email;

          dispatch(setUser({
            username: email.split('@')[0],
            email: email,
            full_name: userMeta.full_name ?? null,
            avatar_url: userMeta.avatar_url ?? null
          }));

          const { data: existingUserData } = await getUserByEmail({
            variables: { email }
          });

          if (existingUserData?.userByEmail?.id) {
            dispatch(setId(existingUserData.userByEmail.id));
          }
        }
      } catch (error) {
        console.error("Error fetching session/user:", error);
      }
    };

    fetchUser();
  }, [dispatch, getUserByEmail]);

  return (
    <div className="h-full w-full flex items-center justify-center bg-back relative">
      <div className="max-w-screen-xl w-full flex relative">
        <div className="hidden lg:block">
      <Left_Sidebar />
    </div>
        <Main_Timeline />
        <Right_Sidebar />
      </div>
    </div>
  );
};

export default Home;
