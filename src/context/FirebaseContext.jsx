import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { auth } from '../API/firebase'
import Loader from '../components/common/Loader/Loader'

const FireBaseContext = React.createContext()

export const useFirebase = () => useContext(FireBaseContext)

export const FirebaseProvider = ({ children }) => {

   const [loading, setLoading] = useState(true)
   const [user, setUser] = useState(null)
   const history = useHistory()

   useEffect(() => {
      auth.onAuthStateChanged((user) => {
         setUser(user)
         setLoading(false)
         if (user) {
            history.push('/chat')
         }
      })
   }, [user, history])

   const value = { user }

   return (
      <FireBaseContext.Provider value={value}>
         {(!loading && children) || (loading && <Loader />)}
      </FireBaseContext.Provider>
   )
}