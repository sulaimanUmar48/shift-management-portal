import { useState, type FormEvent } from "react"
import { MdEmail, MdLock, MdLogin, MdVisibility, MdVisibilityOff } from "react-icons/md"
import {PulseLoader} from "react-spinners"
import { toast } from "react-toastify"

const SignIn = () => {

    const [viewPassword, setViewPassword] = useState(false)
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try{
            await new Promise((resolve) => setTimeout(resolve, 5000))

            const isFailed = Math.random() < 0.5
            console.log(isFailed)
            if (isFailed) throw new Error("Network Request Failed")
            toast.success("Login In Successful")
        }
        catch(err: any){
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }


  return (
    <div
    className={`
      h-screen max-h-screen w-screen p-4 flex flex-col gap-4 overflow-y-scroll pb-4 absolute top-0 right-0 bg-primary flex-center
    `}
    > 
        <form 
        className={`
            w-[300px] h-70 rounded-lg border border-secondary/20 p-4 bg-linear-to-r from-primary-comp to-primary-comp-two shadow
        `}
        onSubmit={handleSubmit}
        >
            <h1
            className={`
                text-center font-bold text tracking-wider uppercase
            `}
            >
                Welcome
            </h1>
            <p
            className={`
                text-center text-[10px] mt-2
            `}
            >
                Enter your log in details
            </p>

            <fieldset 
            className={`
                flex flex-col items-center mt-5 gap-3
                [&>label]:w-fit [&>label]:max-w-70 [&>label]:relative 
                [&_input]:w-50 [&_input]:border [&_input]:border-secondary/20 [&_input]:rounded [&_input]:text-[10px] [&_input]:h-8 [&_input]:outline-0 [&_input]:focus:shadow-inner [&_input]:focus:shadow-secondary/20 [&_input]:pl-6 [&_input]:transition [&_input]:duration-200 [&_input]:ease-out     
            `}
            >
                <label>

                    <MdEmail 
                    size={12}
                    className={`
                        absolute top-1/2 -translate-y-1/2 left-1 text-accent-one
                    `}

                    />
                    <input 
                    type="email" 
                    required
                    />

                </label>
                <label>
                    <MdLock
                    size={12}
                    className={`
                        absolute top-1/2 -translate-y-1/2 left-1 text-accent-one
                    `}
                    />
                    
                    <input 
                    type={viewPassword ? 'text' : 'password'} 
                    required
                    />

                    <button
                    className={`rounded-full absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer`}
                    onClick={()=>{
                        setViewPassword(prev => !prev)
                    }}
                    type="button"
                    >
                        {viewPassword === false ? 
                        <MdVisibility
                        size={13}
                        className={`text-accent-one`}
                        /> :
                        <MdVisibilityOff
                        size={13}
                        className={`text-accent-one`}
                        />}
                    </button>
                </label>
            </fieldset>
            <button
            className={`
                w-50 bg-accent-one mx-auto mt-5 h-8 rounded text-white text-xs font-bold active:scale-95 active:shadow active:shadow-secondary transition-set cursor-pointer hover:bg-accent-one/80 flex-center gap-1
            `}
            >
                {
                    loading ? 
                    <PulseLoader
                    size={8} 
                    color={"#FFF"}
                    /> :
                    <>
                        <MdLogin
                        size={13}
                        />
                        Sign In
                    </>

                }
            </button>
        </form>
    </div>
  )
}

export default SignIn