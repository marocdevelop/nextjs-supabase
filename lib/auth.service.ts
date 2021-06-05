import { supabase } from "./supabase"

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email: 'kamal.develop@gmail.com',
    password: 'ftSPQUmqVkdqFOPlOTmK'
  })
}

export const signIn = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signIn({
    email: 'kamal.develop@gmail.com',
    password: 'ftSPQUmqVkdqFOPlOTmK'
  })
}

export const signInWithGithub = async () => {
  return await supabase.auth.signIn({
    provider: 'github'
  })
}

export const signInWithGoogle = async () => {
  const { user, error } = await supabase.auth.signIn({
    provider: 'google'
  })
}

export const signInWithFacebook = async () => {
  const { user, error } = await supabase.auth.signIn({
    provider: 'facebook'
  })
}

export const logout = async (): Promise<boolean> => {
  let { error } = await supabase.auth.signOut();
  return error ? false : true;
}
