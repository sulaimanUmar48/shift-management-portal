import type { IconType } from "react-icons/lib"

type Props = {
    title: string
    count: number
    Icon: IconType
}

const StatsCard = ({title, count, Icon}:Props) => {
  return (
    <div 
    className={`flex-1 h-40 bg-primary-comp-two rounded-lg shadow flex flex-col justify-center px-5 gap-6`}
    >
        {/* CARD TITLE */}
        <p
        className={`
            text-sm
            max-sm:text-xs    
        `}
        >
            {title}
        </p>

        {/* CARD STATS */}
        <div
        className={`
            flex items-center justify-between pr-4
            max-sm:pr-0
        `}
        >
            <div 
            className={`
                w-18 h-18 p-3 rounded-full flex-center bg-secondary/4 
                max-sm:w-14 max-sm:h-14
            `}
            >
                <span 
                className="
                text-4xl font-semibold    
                max-sm:text-2xl"
                >
                    {count}
                </span>
            </div>
            <div>
                <Icon 
                className={`
                    text-[#05666d] h-10 w-10 
                    max-sm:h-6 max-sm:w-6
                `}
                />
            </div>
        </div>
    </div>
  )
}

export default StatsCard