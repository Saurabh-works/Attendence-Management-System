import React from 'react'
import AttendanceComponent from './AttendanceComponent';
import UpdateNewStudentData from './UpdateNewStudentData';
import StudentDataTable from './StudentDataTable';
import ShowStudentAttendance from './ShowStudentAttendance';
import ShowBatchAttendance from './ShowBatchAttendance';
import StudentReport from './StudentReport';
import { GiNotebook } from "react-icons/gi";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { FaSquarePollVertical } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";
import { SiGoogleclassroom } from "react-icons/si";
import { MdCalendarMonth } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import AdminDashboard, { AdminDashboardItem } from './AdminDashboard';
import { Link, Route} from "react-router-dom"

function AdminPanelIndex() {
  return (
    <>
<<<<<<< HEAD
      {/* <div>AdminPanel_index</div> <hr/> <br/> <br/>
=======
>>>>>>> 879e0731c9dc2976e3a2656cc2ad54cd9cec559c
      <AttendanceComponent></AttendanceComponent> <hr/> <br/> <br/>
      <UpdateNewStudentData></UpdateNewStudentData> <hr/> <br/> <br/>
      <StudentDataTable></StudentDataTable> <hr/> <br/> <br/>
      <ShowStudentAttendance></ShowStudentAttendance> <hr/> <br/> <br/>
      <ShowBatchAttendance></ShowBatchAttendance> <hr/> <br/> <br/>
      <StudentReport></StudentReport> <hr/> <br/> <br/> */}
           
          
           <div className="flex">
      <AdminDashboard>
      
        <Link to="/AttendanceComponent"><AdminDashboardItem icon={<GiNotebook size={20} />} text="Mark Attendence"/></Link>
        <Link to="/UpdateNewStudentData"><AdminDashboardItem icon={<IoPeopleCircleSharp size={20} />} text="Add New Student" /></Link>
        <Link to="/StudentDataTable"><AdminDashboardItem icon={<PiStudentBold size={20} />} text="Student Attendence" /></Link>
        <AdminDashboardItem icon={<FaSquarePollVertical size={20} />} text="Report" alert/>

        <Link to="/ShowStudentAttendance"><AdminDashboardItem  icon={<TbReportAnalytics size={20} />} text="Student Attendence" /></Link>
        <Link to="/ShowBatchAttendance"><AdminDashboardItem icon={<SiGoogleclassroom size={20} />} text="Batch Attendence" /></Link>
        <Link to="/StudentReport"><AdminDashboardItem icon={<MdCalendarMonth size={20} />} text="Monthly Attendence"/></Link>
        <AdminDashboardItem icon={<TbLogout2 size={20} />} text="Logout"/>
        {/* <Route path='/AttendanceComponent'><AttendanceComponent/></Route> */}
        
        
        </AdminDashboard>
      </div>
      
      
    </>
  )
}
export default AdminPanelIndex;
