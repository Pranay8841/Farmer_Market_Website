import {AiOutlineCaretDown} from "react-icons/ai"
import userImage from "../../../assets/IMG_20231030_134646 (2).jpg"
import { useRef, useState } from "react"
import useOnClickOutside from "../../../hooks/useOnClickOutside";
const ProfileDropDown = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => setOpen(false));
    
  return (
    <button className='relative'>
        <div className='flex items-center gap-x-1'>
            <img src={userImage} alt="" 
            className='aspect-square w-[30px] rounded-full object-cover'
            />

            <AiOutlineCaretDown className="text-sm text-brown-700" />
        </div>
    </button>
  )
}

export default ProfileDropDown
