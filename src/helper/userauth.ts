import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";



export default async function userauth(): Promise<boolean> {

   

    const supabase = createServerComponentClient({ cookies });
    try {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        if (session) {
            console.log("User is logged in:", session.user);
            // router.push("/");
            return true;
        } else {
            console.log("No active session found.");
            // router.push("/SignIn");
            return false;
        }
    } catch (error) {
        console.error("Error fetching session:", error);
        // router.push("/SignIn");
        return false;
    }
}
