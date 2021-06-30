import { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Loader from '../../components/common/Loader/Loader'
import { auth, firestore } from '../../API/firebase'
import firebase from 'firebase'
import { useFirebase } from '../../context/FirebaseContext'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import style from './Chat.module.scss'
import Message from '../Message/Message'

/**
 * Чат компонента для отображения сообщений и поля ввода/отправки сообщений
 * 
 *  @component
 * 
 */

const Chat = () => {
   /**
    * Создание переменной history с помощью реакт-хука useHistory
    */
   const history = useHistory()
   /**
    * Получение изменяемого ref-объекта
    */
   const scrollWindow = useRef(null)
   /**
    * Декструктуризация объекта user из пользовательского хука useFirebase
    */
   const { user } = useFirebase()
   /**
    * Объявление переменной состояния (text) и функции изменения состояния (setText) для 
    * реализации flux-архитетуры ,контроля и передачи текущего значения input
    * при отправке сообщения в firestore 
    * 
    * @type {[String,Function]} Text
    * @see — https://reactjs.org/docs/hooks-reference.html#usestate
    */
   const [text, setText] = useState('')
   /**
    * Использование хука-firebase для деструктуризации переменной актуальных значений коллекции
    * из firestore (firestoreMessages) и переменной boolean типа (isFirestoreLoading), которая считывает идёт ли в данный момент загрузка
    * данной коллекции (firestoreMessages) в данный момент или нет
    * 
    * @type {[Array,Boolean]} Collection
    * 
    * В качестве параметра принимает название коллекции (в данном случае, для отображения правильного порядка сообщений
    * применяется метод orderBy)
    * 
    * @param collectionPath — Путь до коллеции
    * @return — Возвращается проинициализированная коллеция
    */
   const [firestoreMessages, isFirestoreLoading] = useCollectionData(
      firestore.collection('messages').orderBy('createdAt')
   )

   /**
    * Асинхронная функция, которая вызывает ф/ю firebase -logout для "выхода" из
    * приложения затем с помощью history.push вы возвращаемся на страницу Логин 
    */
   const handleLogout = async () => {
      await auth.signOut()
      history.push('/')
   }

   /**
    * Отправка сообщения.
    * При попытке отправления пустой строки -> сброс функции
    * Если отправляется не пустое сообщение, обращаемся к firestore коллеции 
    * и с помощью метода add добавляем объект сообщения в firestore коллецию
    * @param data объект сообщения
    * @return - возвращает промис выполнения добавления сообщения в firestore
    * 
    * В конце выполнения функции обнуляем input с помощью setText('')
    */

   const handleSendText = () => {
      if (text === '') {
         alert('Нельзя отправить пустое сообщение')
         return
      }
      firestore.collection('messages').add({
         id: user.uid,
         text,
         createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      setText('')
   }

   /**
    * React хук useEffect, который подписывается и следит за "наличием" user из FirebaseContext
    * Если user отсутствует, мы переходим на вкладку '/' для логина
    * Зависимости хука - user и history (хук выполнится, если одна из зависимостей изменится)
    * 
    * @param effect — Принимает функцию, которая содержит императивный код, возможно, с эффектами
    * @param deps — user,history
    * @version — 16.8.0
    * @see — https://reactjs.org/docs/hooks-reference.html#useeffect
    */

   useEffect(() => {
      if (!user || user === null) {
         history.push('/')
         return
      }

   }, [user, history])

   /**
       * React хук useEffect, который подписывается и следит за изменением  коллекции firestoreMessages и прокручивает окно чата до самого конца
       * 
       * @param effect — Принимает функцию, которая содержит императивный код, возможно, с эффектами
       * @param deps — firestoreMessages
       * @version — 16.8.0
       * @see — https://reactjs.org/docs/hooks-reference.html#useeffect
   */
   useEffect(() => {
      const scrollToBottom = () => {
         scrollWindow.current?.scrollIntoView({ behavior: "smooth" });
      }
      scrollToBottom();
   }, [firestoreMessages])

   /**
    * В случае, если переменная isFirestoreLoading хука useCollectionData вернёт true, компонента отрисует Loader
    */

   if (isFirestoreLoading) return <Loader />

   return (
      <div className={style.wrapper}>
         <button className={style.logOut_button} onClick={handleLogout}>Выход</button>
         <div className={style.chat_main_container}>
            <div className={style.chat_body__container}>
               {
                  firestoreMessages
                     .map((message, index) =>
                        <Message
                           key={index}
                           id={user?.uid}
                           message={message}
                        />
                     )
               }
               <div ref={scrollWindow}></div>
            </div>
            <div className={style.chat_input__container}>
               <input
                  className={style.chat_input}
                  value={text}
                  onKeyDown={(e) => { if (e.key === 'Enter') { handleSendText() } }}
                  onChange={(e) => setText(e.target.value)}
               />
               <div
                  onClick={handleSendText}
                  className={style.chat_send_icon} />
            </div>
         </div>
      </div >
   )
}

export default Chat
