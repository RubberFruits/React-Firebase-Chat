import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { auth } from '../API/firebase'
import Loader from '../components/common/Loader/Loader'

/**
 * Создание объекта контекста FireBaseContext
 */
const FireBaseContext = React.createContext()

/**
 * 
 * Принимает объект контекста (значение, возвращённое из React.createContext) и возвращает 
 * текущее значение контекста для этого контекста.
 * @return - Пользовательский хук useFirebase, деструктуризация которого возрващает FireBaseContext
 * @version — 16.8.0
 * @see — https://reactjs.org/docs/hooks-reference.html#usecontext
 */

export const useFirebase = () => useContext(FireBaseContext)


/**
 * Компонента FirebaseProvider оборачивает дочерние компоненты (children)
 * FireBaseContext.Provider и передаёт в children объект контекста (value)
 * @component
 * @example
 *    const value = { user }
 * return (
 *   <FireBaseContext.Provider value={value}>
         {(!loading && children) || (loading && <Loader />)}
      </FireBaseContext.Provider>
 * )
 * 
 */

export const FirebaseProvider = ({ children }) => {

   /**
    * Объявление переменной состояния (loading) и функции изменения состояния (setLoading) для 
    * для задержки при атентификации пользователя
    * 
    * @type {[Boolean,Function]} Loading
    * @see — https://reactjs.org/docs/hooks-reference.html#usestate
    */
   const [loading, setLoading] = useState(true)
   /**
    * Объявление переменной состояния (user) и функции изменения состояния (setUser) для 
    * для хранения значения объекта пользователя
    * 
    * @type {[Object,Function]} Loading
    * @see — https://reactjs.org/docs/hooks-reference.html#usestate
    */
   const [user, setUser] = useState(null)
   /**
    * Создание переменной history с помощью реакт-хука useHistory
    */
   const history = useHistory()

   /**
    * React хук useEffect, который подписывается и следит за изменение состояния 
    * user из метода firebase - onAuthStateChanged
    * setLoading(false)
    * Если user не пустой, мы переходим на вкладку '/chat'
    * Зависимости хука - user и history (хук выполнится, если одна из зависимостей изменится)
    * 
    * @param effect — Принимает функцию, которая содержит императивный код, возможно, с эффектами
    * @param deps — user,history
    * @version — 16.8.0
    * @see — https://reactjs.org/docs/hooks-reference.html#useeffect
    */
   useEffect(() => {
      auth.onAuthStateChanged(user => {
         setUser(user)
         setLoading(false)
         if (user) {
            history.push('/chat')
         }
      })
   }, [user, history])

   /**
    * Создание переменной value для передачи в атрибут FireBaseContext.Provider value
    */
   const value = { user }

   return (
      <FireBaseContext.Provider value={value}>
         {(!loading && children) || (loading && <Loader />)}
      </FireBaseContext.Provider>
   )
}