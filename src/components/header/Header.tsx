import { MdExpandMore } from "react-icons/md"
import HeaderDropDown from "./HeaderDropDown"
import { useState } from "react"
import { usePageStore } from "../../store/page-store"

const Header = () => {

    // Store Values
    const {currentPage} = usePageStore()

    const [isDropDownActive, setIsDropDownActive] = useState(false)


  return (
    <header
    className=" w-full h-15 border-0 border-b border-set"
    >
        <nav
        className="flex justify-between items-center px-6 h-full"
        >
            <h1 className="font-bold">
                {currentPage}
            </h1>

            {/* User Information */}
            <div
            className="flex items-center gap-2"
            >
                <figure 
                className="w-8 h-8 bg-gray-400 rounded-full overflow-hidden"
                >
                    <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Profile-img" 
                    className="w-full h-full object-cover object-center"
                    />
                </figure>
                <div>
                    {/* User Name */}
                    <p 
                    className="text-sm font-semibold max-sm:text-[10px]"
                    >
                        Umar-Balogun Sulaiman
                    </p>
                    
                    {/* User Role */}
                    <p
                    className="text-[11px] max-sm:text-[8px]"
                    >
                        Admin
                    </p>
                </div>
                <div>
                    <button
                    className="cursor-pointer"
                    onClick={()=>{setIsDropDownActive(prev => !prev)}}
                    >
                        <MdExpandMore className="w-6"/>
                    </button>
                    <HeaderDropDown isActive={isDropDownActive} setIsActive={setIsDropDownActive}/>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header