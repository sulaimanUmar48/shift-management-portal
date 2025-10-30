import { MdLogout, MdPerson } from "react-icons/md"

type Props = {
    isActive: boolean
    setIsActive: (value: boolean) => void
}

const HeaderDropDown = ({isActive, setIsActive}: Props) => {
  return (
    <div
    className={`h-20 w-30 absolute top-12  right-6 rounded bg-primary-comp border border-set ${!isActive && "display-inactive"} transition-set flex flex-col flex-center text-sm gap-2 p-2`}
    >
        <button
        className="flex items-center gap-1 w-full px-4 cursor-pointer py-1 rounded hover:bg-secondary/10 active:scale-95 transition-set"
        onClick={()=>{setIsActive(false)}}
        >
            <MdPerson/>
            Profile
        </button>
        <button
        className="flex items-center gap-1 w-full px-4 cursor-pointer py-1 rounded hover:bg-secondary/10 active:scale-95 transition-set"
        onClick={()=>{setIsActive(false)}}
        >
            <MdLogout/>
            Log Out
        </button>
    </div>
  )
}

export default HeaderDropDown