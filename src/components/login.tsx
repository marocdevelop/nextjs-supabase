import React from 'react'
import { signIn } from '../../lib/auth.service'

function Login() {
  const onSignIn = async () => {
    let result = await signIn('kamal.develop@gmail.com', '@kamal123456');
    console.log(`result`, result)
  }

  return (
    <>
      <button type="button" onClick={onSignIn}>Sign in</button>
    </>
  )
}

export default Login
