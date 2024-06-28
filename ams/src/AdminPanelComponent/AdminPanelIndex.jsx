import React from 'react'

function AdminPanelIndex() {
  return (
    <div className='flex bg-blue-600'>
      <span className='p-5 text-[20px] text-white font-bold'>Teacher Panel</span>
      <nav className='flex list-none ml-auto gap-4 text-white p-5 text-[20px]'>
        <li>Dashboard</li>
        <li>Batches</li>
        <li>Attendance</li>
      </nav>
    </div>
  )
}
export default AdminPanelIndex;
