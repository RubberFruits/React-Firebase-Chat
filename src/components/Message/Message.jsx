import style from './Message.module.scss'

const Message = ({ message, id }) => {
   return (
      <div className={style.message_container}>
         <div className={id === message.id ? style.message_body_from_me : style.message_body}>
            <p className={style.message_author}>From: {message.id.slice(0, 15)}...</p>
            <br />
            <p className={style.message_text}>{message.text}</p>
         </div>
      </div>
   )
}

export default Message