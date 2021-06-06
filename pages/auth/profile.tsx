import React from 'react'
import { supabase } from '../../lib/supabase';
import { basePath } from '../../utils/siteConfig';

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/auth', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}

export default Profile;
