'use client';
import { Provider } from 'react-redux'
import { store } from '@/Redux/store'
import React from 'react'

const Reduxprovider = ({children}:{children:React.ReactNode}) => {
  return (
   
       <Provider store={store}>
             {children}
           </Provider>
   
  )
}

export default Reduxprovider