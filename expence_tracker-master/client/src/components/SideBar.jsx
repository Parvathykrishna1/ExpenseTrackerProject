import React from 'react'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    PlusIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { Link, useNavigate } from 'react-router-dom';

export default function SideBar() {

    const navigate = useNavigate()
    const username= localStorage.getItem("username")

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

  return (
    <Card className="bg-blue-950 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
    <div className="mb-2 p-4">
      <Typography variant="h5" color="green">
        {username}
      </Typography>
    </div>
    <List>
        <Link to={"/dashboard"}>
        <ListItem className='gap-2 text-white text-lg font-bold'>
        <ListItemPrefix>
          <PresentationChartBarIcon className="h-5 w-5" />
        </ListItemPrefix>
        Dashboard
      </ListItem>

        </Link>
        <Link to={"/add_expense"}>
        <ListItem className='gap-2 text-white text-lg font-bold'>
        <ListItemPrefix>
          <PlusIcon className="h-5 w-5" />
        </ListItemPrefix>
        Add Expense
       </ListItem>
        </Link>
     
     <Link to={"/history"}>
     <ListItem className='gap-2 text-white text-lg font-bold'>
        <ListItemPrefix>
          <InboxIcon className="h-5 w-5" />
        </ListItemPrefix>
        History
        <ListItemSuffix>
          <Chip value="" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
        </ListItemSuffix>
      </ListItem>
     </Link>
     
     <Link to={"/report"}>
      <ListItem className='gap-2 text-white text-lg font-bold'>
        <ListItemPrefix>
          <UserCircleIcon className="h-5 w-5" />
        </ListItemPrefix>
        Report
      </ListItem>
      </Link>
      <Link to={"/passwordreset"}>
      <ListItem className='gap-2 text-white text-lg font-bold'>
        <ListItemPrefix>
          <PowerIcon className="h-5 w-5"/>
        </ListItemPrefix>
        Change Password
      </ListItem>
      </Link>
      <ListItem className='gap-2 text-white text-lg font-bold' onClick={logOut}>
        <ListItemPrefix>
          <PowerIcon className="h-5 w-5" />
        </ListItemPrefix>
        Log Out
      </ListItem>
    </List>
  </Card>
  )
}
