"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { createClient } from '@/utils/supabase/client'
import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";


const Authpage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const supabase=createClient();

  const handleSignInWithGoogle = React.useCallback(
    async (response: GoogleSignInResponse): Promise<void> => {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
      });
      if (error) {
        console.error("Error signing in with Google:", error);
        return;
      } else {
        console.log("Successfully signed in with Google:", data);
        // Handle successful sign-in, e.g., redirect or update UI
      
      }
      // Wait for Supabase to persist the session before redirecting
      const checkSessionInterval = setInterval(async () => {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          clearInterval(checkSessionInterval);
          router.push("/Home");
        }
      }, 300);
    },
    [router, supabase]
  );

  const handleCredentialResponse = React.useCallback(
    (response: google.accounts.id.CredentialResponse) => {
      console.log("Google Credential:", response.credential);
      handleSignInWithGoogle({
        credential: response.credential,
      });
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
      if (window.google && window.google.accounts.id) {
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
  }, [handleCredentialResponse]);
  return (
    <div>
  <div className="z-50 fixed inset-0 p-14 bg-background-auth flex justify-center items-center">
    <div className="bg-background-auth">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          aria-describedby="auth-description"
          className="bg-black text-white rounded-2xl shadow-3xl  w-full max-w-max p-24   "
        >
          <DialogTitle className="sr-only">Sign Up</DialogTitle>

          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="pr-4 ">
              <BsTwitter size={50} />
            </div>
            <h2 className="text-3xl font-semibold">Welcome to Twitter 👋</h2>
            <p className="text-ml text-gray-400">
              Continue with Google to sign in
            </p>
            <div id="google-signin-button" className="mt-4 text-2xl"></div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</div>

  );
};

export default Authpage;
