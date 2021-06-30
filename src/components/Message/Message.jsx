import style from './Message.module.scss'

/**
 * Компонента сообщения для отображения одного сообщения
 * 
 *  @component
 *  @example
 *    const message = {
 *       message.id:'123',
 *       message.text:''
 *    }
 * const id = '431'
 * return (
 *   <Message message={message} id={id} />
 * )
 */


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