import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function HistoryTable({data}) {
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem("token");
    
    useEffect(() => {
        if (data && data.length > 0) {
          setLoading(false);
        }
      }, [data]);

      const handleDelete = (itemId) => {
        const apiUrl = `http://127.0.0.1:8000/edit_expense/${itemId}/`
        
        axios.delete(apiUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then(response => {
              // Handle success
              toast.success("Item deleted sucessfully",{
                position: "top-right",
                autoClose: 5000, // 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              setTimeout(() => {
                window.location.reload();
              },3000);
            })
            .catch(error => {
              // Handle error
              console.error('Error deleting item:', error);
            });

      }

  return (
    <div className="flex flex-col">
    <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Expense Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Amount_Spent
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                D.O.T
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Category
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                Edit
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                Delete
                            </th>
                        </tr>
                    </thead>
                    {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <h2 className="uppercase text-xl font-semibold text-slate-600">Loading...</h2>
                    </td>
                  </tr>
                </tbody>
              ) : (data.map((item) => (<tbody key={item.id} className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {item.id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {item.expense_name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {item.amount_spent}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {item.date_of_transaction}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                               {item.category}
                            </td>
                            <Link to={`/update-listing/${item.id}`}>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                    className="text-green-500 hover:text-green-700"
                                    href="#"
                                >
                                    Edit
                                </a>
                            </td>
                            </Link>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </a>
                            </td>
                        </tr>
                    </tbody>)))}
                    
                </table>
                <ToastContainer />
            </div>
        </div>
    </div>
</div>
  )
}
