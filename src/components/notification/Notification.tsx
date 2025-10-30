import { MdLockClock } from "react-icons/md"

const Notification = () => {
  return (
    <div className={`text-secondary-text text-[11px] flex items-center gap-2 p-2 bg-primary-comp-two/10 rounded`}>
        <div className={`w-8 h-8 rounded-full bg-primary-comp-two/10 flex-center`}>
            <MdLockClock/>
        </div>
        <p
        className="opacity-90"
        >
            This is the notification
        </p>
    </div>
  )
}

export default Notification