'use client'

import Loader from '@/components/common/Loader';
import ProfileList from '@/components/Empprofile/ProfileList'
import NavBar from '@/components/NavBar/Navbar'
import React, { useState } from 'react'

function BookingPage() {
  const [loading, setLoading] = useState<boolean>(true);
  // if (loading) {
  //   return <Loader/>;
  // }
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-5">
        <NavBar />
        <div className="flex justify-center mt-20">
            <ProfileList />
        </div>
    </div>
  )
}

export default BookingPage
