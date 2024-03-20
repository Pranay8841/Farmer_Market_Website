import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, matchPath, useLocation } from 'react-router-dom'

const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
  return (
    <NavLink
    to={link.path}

    >
        <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-brown-600 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>

        </span>

        <div className="flex items-center gap-x-2">
            <Icons.VscAccount />
        </div>
    </NavLink>
  )
}

export default SidebarLink
