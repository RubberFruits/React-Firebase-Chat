import styles from './Login.module.scss'
import { useState } from 'react'
import firebase from 'firebase/app'
import { auth } from '../../API/firebase'

const Login = () => {

   const [load, setLoad] = useState(false)

   const googleLogin = async () => {
      setLoad(true)
      await auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      setLoad(false)
   }

   const anonLogin = async () => {
      setLoad(true)
      await auth.signInAnonymously()
      setLoad(false)
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.flex_container}>
            <div className={styles.decorate_left_box}>
               <h1 className={styles.decorate_left_box__header}>
                  Welcome
               </h1>
               <p className={styles.decorate_left_box__text}>
                  Chat application based on React and Firebase
               </p>
            </div>
            <div className={styles.login_right_box}>
               <h1 className={styles.login_right_box__header}>
                  Login
               </h1>
               <button
                  className={styles.login_right_box__button}
                  disabled={load}
                  onClick={() => googleLogin()}
               >
                  Sign in with Google
               </button>
               <button className={styles.login_right_box__button}
                  disabled={load}
                  onClick={() => anonLogin()}
               >
                  Anonymously
               </button>
            </div>
         </div>
      </div>
   )
}

export default Login
