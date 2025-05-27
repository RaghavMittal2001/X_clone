"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setId } from "@/Redux/userSlice";

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($fullName: String, $email: String!, $profileImage: String) {
    createUser(fullName: $fullName, email: $email, profileImage: $profileImage) {
      id
      username
      email
      profileImage
    }
  }
`;

interface GoogleSignInResponse {
  credential: string;
}

const Authpage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const supabase = createClient();

  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL);
  const [createUser] = useMutation(CREATE_USER);

  const checkSessionAndProceed = useCallback(async () => {
    let retries = 10;
    while (retries--) {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (session) {
        const email = session.user.email;
        try {
          const { data: existingUserData } = await getUserByEmail({ variables: { email } });

          if (existingUserData?.userByEmail) {
            dispatch(setId(existingUserData.userByEmail.id));
            router.push("/Home");
          } else {
            const { user_metadata } = session.user;
            const { data: createdUser } = await createUser({
              variables: {
                fullName: user_metadata.full_name,
                email: email,
                profileImage: user_metadata.avatar_url,
              },
            });

            dispatch(setId(createdUser?.createUser?.id));
            router.push("/Home");
          }
        } catch (err) {
          console.error("Error during GraphQL operations:", err);
        }
        return;
      }

      await new Promise((res) => setTimeout(res, 300));
    }

    console.warn("Supabase session was not established in time.");
  }, [supabase, getUserByEmail, createUser, dispatch, router]);

  const handleSignInWithGoogle = useCallback(
    async ({ credential }: GoogleSignInResponse) => {
      try {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: credential,
        });

        if (error) {
          console.error("Error signing in with Google:", error);
          return;
        }

        await checkSessionAndProceed();
      } catch (err) {
        console.error("Sign-in error:", err);
      }
    },
    [supabase, checkSessionAndProceed]
  );

  const handleCredentialResponse = useCallback(
    (response: google.accounts.id.CredentialResponse) => {
      if (response.credential) {
        handleSignInWithGoogle({ credential: response.credential });
      }
    },
    [handleSignInWithGoogle]
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleCredentialResponse,
          ux_mode: "popup",
          auto_select: true,
          itp_support: true,
          use_fedcm_for_prompt: true,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button")!,
          {
            type: "standard",
            shape: "pill",
            theme: "filled_blue",
            text: "continue_with",
            size: "large",
            logo_alignment: "left",
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [handleCredentialResponse]);

  return (
    <div className="z-50 fixed inset-0 p-14 bg-background-auth flex justify-center items-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-black text-white rounded-2xl shadow-3xl w-full max-w-max p-24"  aria-describedby="dialog-description">
          <DialogTitle className="sr-only">Sign Up</DialogTitle>
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="pr-4">
              <BsTwitter size={50} />
            </div>
            <h2 className="text-3xl font-semibold">Welcome to Twitter 👋</h2>
            <p className="text-ml text-gray-400">Continue with Google to sign in</p>
            <div id="google-signin-button" className="mt-4 text-2xl" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Authpage;
