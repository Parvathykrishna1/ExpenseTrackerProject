import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function AddExpense() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");
  const [formData , setformData] = useState({
  })

  const handleChange = (e) => {
  setformData({...formData,
  [e.target.id] : e.target.value})
  console.log(formData)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
console.log(accessToken);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/create/",
        formData, // Move formData to the correct argument
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res);
      if(res.status === 201){
       toast.success("Expense added sucessfully",{
        position: "top-right",
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return <div className="flex flex-row">
    <div>
      <SideBar />
    </div>
  <div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full max-w-[550px] justify-center">
    <form onSubmit={handleSubmit} method="POST">
      <div class="-mx-3 flex flex-wrap">
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="fName"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Expense Name
            </label>
            <input
              type="text"
              name="expense_name"
              id="expense_name"
              placeholder="Enter expense name"
              onChange={handleChange}
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          
        </div>
        <div class="w-full px-3 sm:w-1/2">

        </div>
      </div>
      <div class="mb-5">
        <label
          for="guest"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Amount Spent
        </label>
        <input
          type="number"
          name="amount_spent"
          id="amount_spent"
          placeholder="Enter the amount spent"
          min="0"
          onChange={handleChange}
          class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <div class="-mx-3 flex flex-wrap">
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="date"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Date of Transaction
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="date"
              id="date_of_transaction"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div class="w-full px-3 sm:w-1/2">
          {/* <div class="mb-5">
            <label
              for="time"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div> */}
        </div>
        <div className="mb-5 ms-3">
        <select
              id="category"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              className="border rounded-lg p-2"
            >
              <option className="font-semibold text-lg" value=''>Select Category</option>
              <option value={"Food"}>Food</option>
              <option value={"Personal"}>Personal</option>
              <option value={"Transportation"}>Travel</option>
              <option value={"Entertainment"}>Entertainment</option>
              <option value={"Utilities"}>Utilities</option>
              <option value={"Health/MedicalCare"}>Health/Medical care</option>
              <option value={"Other"}>Others</option>
            </select>
        </div>
      </div>

      <div>
        <button
          class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Add 
        </button>
      </div>
    </form>
    <ToastContainer />
  </div>
  
</div>
</div>
}
