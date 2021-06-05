import React from 'react'
import { signUp, signInWithGithub, signInWithGoogle } from '../../lib/auth.service'

function Register() {
  const onSignUp = async () => {
    let result = await signUp('kamal.develop@gmail.com', '@kamal123456');
    console.log(`result`, result)
  }
  const onSignUpGithub = async () => {
    let result = await signInWithGithub();
    console.log(`result`, result)
  }

  const onSignUpGoogle = async () => {
    let result = await signInWithGoogle();
    console.log(`result`, result)
  }

  return (
    <section style={{'border': 'solid 1px red', 'padding': '20px', 'margin': '20px'}}>
      <button type="button" onClick={onSignUp}>SignUp</button>
      <button type="button" onClick={onSignUpGithub}>SignUp Github</button>
      <button type="button" onClick={onSignUpGoogle}>SignUp Google</button>
    </section>
  )
}

export default Register
