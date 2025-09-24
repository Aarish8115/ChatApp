import React from 'react'
import { LuPalette, LuUser } from 'react-icons/lu'

const SettingsMenu = () => {
  return (
    <div className='h-full w-[50px] border-r-2 border-r-white/10 bg-white/10 flex flex-col px-1 py-4 items-center gap-2'>
      <LuUser  className='text-xl text-white/75 w-8 h-8 p-1 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-150 hover:text-white'/>
      <LuPalette className='text-xl text-white/75 w-8 h-8 p-1 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-150 hover:text-white'/>
    </div>
  )
}

export default SettingsMenu
