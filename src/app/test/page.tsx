import React from 'react'
import { createClient } from '@/utils/supabase/client';
const page = () => {
     const supabase = createClient();
    supabase.auth.getSession().then(({ data, error }) => {
        console.log("User data:", data);
        console.log("Error:", error);
    });
  return (
    <div>
        <h1 className='text-3xl font-bold'>Test</h1>
        <p className='text-xl'>This is a test page</p>
        <p className='text-xl'>Check the console for user data</p>
        <p className='text-xl'>Check the console for error</p>
    </div>
  )
}

export default page
