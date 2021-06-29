import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { auth, firestore } from '../../API/firebase'
import firebase from 'firebase'
import { useFirebase } from '../../context/FirebaseContext'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import style from './Chat.module.scss'
import Message from '../Message/Message'


const Chat = () => {
   const history = useHistory()
   const { user } = useFirebase()
   const [text, setText] = useState('')
   const [firestoreMessages, isFirestoreLoading] = useCollectionData(
      firestore.collection('messages').orderBy('createdAt')
   )

   const handleLogout = async () => {
      await auth.signOut()
      history.push('/')
   }

   const handleSendText = () => {
      if (text === '') {
         alert('Нельзя отправить пустое сообщение')
         return
      }
      firestore.collection('messages').add({
         id: user.uid,
         text,
         createdAt:firebase.firestore.FieldValue.serverTimestamp()
      })
      setText('')
   }

   useEffect(() => {
      if (!user || user === null) {
         history.push('/')
         return
      }
   }, [user, history])

   if (isFirestoreLoading) return <Loader />

   return (
      <div className={style.wrapper}>
         <button className={style.logOut_button} onClick={handleLogout}>Log Out</button>
         <div className={style.chat_main_container}>
            <div className={style.chat_body__container}>
               {
                  firestoreMessages
                     .map((message, index) =>
                        <Message 
                           key={index} 
                           id={user.uid}
                           message={message}
                         />
                     )
               }
            </div>
            <div className={style.chat_input__container}>
               <input
                  className={style.chat_input}
                  value={text}
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
