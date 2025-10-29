import { NavLink } from "react-router-dom";

import { MdDashboard } from "react-icons/md"
import type { IconType } from "react-icons/lib";


type Props = {
    name: string
    path: string
    Icon: IconType
}

const PageLink = ({name, path, Icon}:Props) => {
  return (
    <NavLink to={path} className={"flex items-center text-sm px-3 h-10 rounded-r-xl gap-1 [&.active]:bg-black [&.active]:text-secondary-text font-semibold [&.active]:font-normal"}>
        <div>
            <Icon className="w-6 "/>    
        </div> 
        <span>{name}</span>
    </NavLink>
  )
}

export default PageLink