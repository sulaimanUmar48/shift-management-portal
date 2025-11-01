import { MdSearch } from "react-icons/md"

type Props = {
    value: string
    setValue: (value: string) => void
    placeHolder: string
}

const SearchInput = ({value, setValue, placeHolder}: Props) => {
  return (
    <div className="w-fit relative"> 
        <input 
        type="text" 
        value={value}
        placeholder={`...${placeHolder}`}
        onChange={(e)=>{setValue(e.currentTarget.value)}}
        className="border rounded w-60 h-7 border-set outline-0 focus:border-secondary text-[11px] pr-2 pl-6"
        />
        <MdSearch className="absolute top-1/2 -translate-y-1/2 left-1.5 opacity-70"/>
    </div>
  )
}

export default SearchInput