import React from 'react'

const navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-900 text-white py-2">
        <div className="logo ">
              <span className="font-bold text-xl mx-9">Itask</span>
        </div>
        <ul className="flex gap-8 mx-9">
           <li className="cursor-pointer hover:font-bold transition-all">home</li>
           <li className="cursor-pointer hover:font-bold transition-all">About us</li>
        </ul>
    </nav>
  )
}

export default navbar
