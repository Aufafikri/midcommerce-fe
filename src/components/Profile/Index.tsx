import { useFetchMyProfile } from '@/features/profile/useFetchMyProfile'
import React from 'react'

const Profile = () => {
    const { data: profile } = useFetchMyProfile()
    console.log('profile', profile)
  return (
    <div>
        <p> {profile?.name} </p>
    </div>
  )
}

export default Profile