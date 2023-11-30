import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function PasswordReset() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/passwordreset/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // You can redirect the user to the dashboard or login page after successful password change
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error.response.data.error);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] justify-center">
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-5">
            <label
              htmlFor="old_password"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Old Password
            </label>
            <input
              type="password"
              name="old_password"
              id="old_password"
              placeholder="Enter old password"
              onChange={handleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="new_password"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              placeholder="Enter new password"
              onChange={handleChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div>
            <button
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Change Password
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
