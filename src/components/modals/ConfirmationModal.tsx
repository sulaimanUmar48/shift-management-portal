import { MdCheck, MdClose,  MdQuestionMark } from "react-icons/md"
import { useModalStore } from "../../store/modal-store"


const ConfirmationModal = () => {
    const {confirmationModal, setConfirmation, confirmationMessage} = useModalStore()

    

  return (
    <div className={`
        absolute w-full h-full bg-secondary/40 left-0 top-0 flex-center
        ${!confirmationModal && "opacity-0 pointer-events-none"} transition-set
    `}>
        <div className={`w-[300px] h-fit bg-primary shadow rounded-lg p-4 text-[10px] flex flex-col gap-6`}>
            <p className={`text-sm font-semibold mb-2 flex items-center`}>
                Confirm User Details
                <MdQuestionMark size={20} className={`text-accent-one/80`} />
            </p>
            <p
            className={`leading-4 whitespace-pre-line`}
            >
                {confirmationMessage}

            </p>
            <div
            className={`
                flex justify-end gap-2
                [&>button]:px-2 [&>button]:py-1 [&>button]:rounded [&>button]:flex [&>button]:gap-1 [&>button]:items-center [&>button]:active:scale-90 [&>button]:transition-set [&>button]:cursor-pointer
            `}
            >
                <button
                className={`bg-accent-one text-white`}
                >
                    <MdCheck/>
                    Yes
                </button>
                <button
                className={`bg-primary-comp-two shadow `}
                onClick={()=>{setConfirmation(false, "")}}
                >
                    <MdClose/>
                    No
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal