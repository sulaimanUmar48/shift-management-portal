import { MdNotifications } from "react-icons/md"

const NotificationTwo = () => {
  return (
    <div
    className={`
    w-full h-14 rounded border border-black/15 p-1 flex items-center pl-3 gap-2
    `}
    >
        <div>
        <MdNotifications
        className={`text-2xl text-accent-one`}
        />
        </div>
        <div>
        <p
        className={`
        text-[10px]  
        `}
        >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        </p>
        </div>
    </div>
  )
}

export default NotificationTwo