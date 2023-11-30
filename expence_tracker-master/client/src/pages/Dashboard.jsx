import React, { useEffect } from "react";
import Charts from "../components/Charts";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import BarChart from "../components/Charts";
import Canva from "../components/Charts";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import HistoryTable from "../components/HistoryTable";
import axios from "axios";
import { useState } from "react"; 
import UserModel from "../components/UserModel";
import { toast } from "react-toastify";
import SideBar from "../components/SideBar";

export default function Dashboard() {
  const accessToken = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [historyData, setHistoryData] = useState({});
  const [chartData, setChartData] = useState({});
  const [monthlyExpense, setMonthlyExpense] = useState("")
  const [data,setData]=useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/recent_transactions/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(res); 
        setHistoryData(res.data);
        console.log(historyData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const fetchMonthlyPercentData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/total-amount-by-category/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        
        setData(res.data) ;
        setChartData(data);
        console.log(chartData);

      } catch (error) {
        toast.error("Error occured",{
          position: "top-right",
          autoClose: 5000, // 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })}
    }
    const fetchMonthyExpense = async () => {
       try {
        const res = await axios.get("http://127.0.0.1:8000/totalexpense/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        console.log(res); 
        const data = res.data
        setMonthlyExpense(data);
        console.log(monthlyExpense)
        // console.log(monthlyExpense);

      } catch (error) {
        toast.error("Error occured",{
          position: "top-right",
          autoClose: 5000, // 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })}
    } 
    fetchData();
    fetchMonthyExpense();
    fetchMonthlyPercentData();
  },[chartData])
  return(
   <>
  <div className="flex flex-row">
    <div className="flex flex-col items-start basis-1/5 bg-blue-950 justify-center h-screen gap-3 sticky top-0">
      {/* <div className="ms-8 mb-10">
      <UserModel />
      </div>
      <div className="text-white flex flex-row justify-center gap-3 font-semibold text-xl items-center">
        <FaRupeeSign /> Balance - 25000
      </div>
      <div className="text-white flex flex-row justify-center gap-3 font-semibold text-xl items-center">
        <FaRupeeSign /> Expense - {monthlyExpense.total_expense}
      </div>
      <Link
        to={"/add_expense"}
        className="uppercase bg-green-600 text-white rounded-lg w-3/4 md:h-12 m-3 p-3"
      >
        <h2 className="text-center">add new expense</h2>
      </Link> */}
      <SideBar />
    </div>
    <div className="basis-4/5 flex flex-col">
      <div>
        {/* <Charts /> */}
        <Canva data = {chartData} />
      </div>
      <div>
        <h2 className="p-3 text-lg font-semibold">Recent transactions</h2>
        <div className="w-full">
        <HistoryTable data={historyData} />
        </div>
      </div>
    </div>
  </div>
</>
)
}
