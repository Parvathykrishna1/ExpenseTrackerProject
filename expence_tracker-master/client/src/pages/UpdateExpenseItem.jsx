import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function UpdateExpenseItem() {
  const params = useParams();
  const accessToken = localStorage.getItem('token');
  const [formData, setFormData] = useState({});
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/edit_expense/${params.itemId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setItem(res.data);
      } catch (error) {
        console.error('Error fetching expense details:', error);
      }
    };

    fetchDetails();
  }, [params.itemId, accessToken]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/edit_expense/${params.itemId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success('Expense updated successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Redirect to the desired page after successful update
        navigate('/desired-page');
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      toast.error('Error updating expense', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit} method="POST">
            {/* Your form fields go here */}
            {/* ... */}
            <div>
              <button
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Submit
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
