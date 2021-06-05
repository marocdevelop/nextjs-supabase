// import React, { useContext, useEffect, useState } from 'react';
// import { supabase } from '../../lib/supabase';

// const AuthContext = React.createContext({ user: null, loading: false });

// export function AuthProvider({ children }: any) {
//   const [user, setUser] = useState()
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Check active sessions and sets the user
//     const session: any = supabase.auth.session()

//     setUser(session?.user ?? null)
//     setLoading(false)

//     // Listen for changes on auth state (logged in, signed out, etc.)
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         setUser(session?.user ?? null)
//         setLoading(false)
//       }
//     )

//     return () => {
//       listener?.unsubscribe()
//     }
//   }, [])

//   // Will be passed down to Signup, Login and Dashboard components
//   const value = {
//     signUp: (data) => supabase.auth.signUp(data),
//     signIn: (data) => supabase.auth.signIn(data),
//     signOut: () => supabase.auth.signOut(),
//     user,
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   return useContext(AuthContext)
// }
