import style from "./Loader.module.scss"
const Loader = () => {
   return (
      <div className={style.loader_wrapper}>
         <div className={style.lds_ring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
      </div>
   )
}

export default Loader
