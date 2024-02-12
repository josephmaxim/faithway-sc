import { useContext, forwardRef } from "react";
import Link from 'next/link';
import StudentProvider, { StudentContext } from "@/context/StudentContext";
import { Table, Breadcrumb, Panel, IconButton, TagGroup, Tag, Pagination, Form, Button, InputPicker, Input, TagPicker, CheckPicker, SelectPicker, ButtonToolbar } from 'rsuite';

import DashboardLayout from "@/components/Layouts/DashboardLayout";

const StudentPage = () => {

  const { state, dispatch } = useContext(StudentContext)
  const { info } = state;

  return <DashboardLayout>
    <div className="container">
      <Breadcrumb separator=">">
        <Breadcrumb.Item as={NavLink} href="/dashboard">
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item as={NavLink} href="/dashboard/students">
          Students
        </Breadcrumb.Item>
        <Breadcrumb.Item as={NavLink} href={`/dashboard/students/${info._id}`} active>
          ({ info.fullName })
        </Breadcrumb.Item>
      </Breadcrumb>
      <h1>Student Page</h1>
      <p>Still working on it :)</p>
    </div>
  </DashboardLayout>
}

const NavLink = forwardRef((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <Link href={href} as={as} ref={ref} {...rest}/>
  );
});

export default function StudentHOC(){
  return <StudentProvider>
    <StudentPage/>
  </StudentProvider>
};