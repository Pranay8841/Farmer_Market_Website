import { AiOutlineCaretDown } from "react-icons/ai"
import { useRef, useState } from "react"
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { Link, useNavigate } from "react-router-dom"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/authAPI";
// import {useDispatch} from "react-redux"

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;
  return (
    <button className='relative' onClick={() => setOpen(true)}>
      <div className='flex items-center gap-x-1'>
        <img src={user?.image}
          alt={`profile-${user?.firstName}`}
          className='aspect-square w-[30px] rounded-full object-cover'
        />

        <AiOutlineCaretDown className="text-sm text-brown-700" />
      </div>

      {
        open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-brown-700 overflow-hidden rounded-md border-[1px] border-brown-700 bg-main"
            ref={ref}
          >
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text- font-bold text-[#7e7e73]  hover:text-brown-700">
                <VscDashboard className='text-lg' />
                Dashboard
              </div>
            </Link>

            <div
              onClick={() => {
                dispatch(logout(navigate))
                setOpen(false)
              }}
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text- font-bold text-[#7e7e73]  hover:text-brown-700">
              <VscSignOut className='text-lg' />
              Log Out
            </div>
          </div>
        )
      }
    </button>
  )
}

export default ProfileDropDown
