import styles from './Login.module.scss'
import { useState } from 'react'
import firebase from 'firebase/app'
import { auth } from '../../API/firebase'

/**
 * Логин компонента для пользовательского входа в приложение
 *  @component
 */
const Login = () => {

   /**
    * Объявление переменной состояния (load) и функции изменения состояния (setLoad) для 
    * выключения клавиш в случае попытки пользователем входа
    * 
    * @type {[Boolean,Function]} Load
    * @see — https://reactjs.org/docs/hooks-reference.html#usestate
    */
   const [load, setLoad] = useState(false)


   /**
    * Асинхронная ф/я для реализации входа в Google аккаунт 
    * 
    * Перевод состояния load в true
    * Аутентифицирует клиента Firebase с помощью перенаправления на страницу.
    * В качестве параметра принимает provider, на страницу которого необходимо сделать редирект
    * После выполнения асинхронной фунции, перевод состояния load в false
    * @webonly
    * @param provider
    */

   const googleLogin = async () => {
      setLoad(true)
      await auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      setLoad(false)
   }

   /**
    * Асинхронная ф/я для реализации входа в приложение анонимно
    * 
    * Перевод состояния load в true
    * @example 
    * firebase.auth().signInAnonymously().catch(function(error) {
    *  Handle Errors here.
    * var errorCode = error.code;
    *  var errorMessage = error.message;
    * if (errorCode === 'auth/operation-not-allowed') {
    * alert('You must enable Anonymous auth in the Firebase Console.');
    * } else {
    * console.error(error);
    * }
    * });
    * После выполнения асинхронной фунции, перевод состояния load в false
    * @webonly
    * @param provider
    */

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
                  Приветствую
               </h1>
               <p className={styles.decorate_left_box__text}>
                  Чат приложение на React и Firebase
               </p>
            </div>
            <div className={styles.login_right_box}>
               <h1 className={styles.login_right_box__header}>
                  Вход
               </h1>
               <button
                  className={styles.login_right_box__button}
                  disabled={load}
                  onClick={() => googleLogin()}
               >
                  Войти через Google
               </button>
               <button className={styles.login_right_box__button}
                  disabled={load}
                  onClick={() => anonLogin()}
               >
                  Войти анонимно
               </button>
            </div>
         </div>
      </div>
   )
}

export default Login
