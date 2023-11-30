// import React, { useEffect, useLayoutEffect, useState } from "react";
// import SideBar from "../components/SideBar";
// import HistoryTable from "../components/HistoryTable";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { TbPlayerTrackNextFilled , TbPlayerTrackPrevFilled } from "react-icons/tb";

// export default function History() {

//   const accessToken = localStorage.getItem("token");

//   const [history, setHistory] = useState({});

//     useEffect(() => {
//       const fetchHistoryData = async () => {
//         try {
//           const res = await axios.get("http://127.0.0.1:8000/pastexpense/", {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });
//           console.log(res);  
//           const data = res.data;
//           setHistory(data.results);
//           console.log(history);
//           // console.log(monthlyExpense);
//         } catch (error) {
//           toast.error("Error occurred", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }
//       };
  
//       fetchHistoryData(); // Call the function here to execute it when the component mounts
//     }, []); // The empty dependency array ensures that the effect runs only once on mount
  
//   return (
//     <div className="flex flex-row">
//       <div className="flex flex-col items-start basis-1/5 bg-white justify-center h-screen gap-3 sticky top-0">
//          <SideBar />
//       </div>
//       <div className="w-full">
//          <HistoryTable data={history} />
//          <div className="font-semibold text-2xl justify-center m-2">
//           <div className="items-center justify-center flex flex-row">
//             <Link>
//             <TbPlayerTrackPrevFilled className="mr-2" />
//             </Link>
//           <Link to={""}>
//           <TbPlayerTrackNextFilled />
//           </Link>
//           </div>
//          </div>
//       </div>
//     </div>
//   )
// }

// import React, { useEffect, useState } from "react";
// import SideBar from "../components/SideBar";
// import HistoryTable from "../components/HistoryTable";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// export default function History() {
//   const accessToken = localStorage.getItem("token");

//   const [history, setHistory] = useState([]);
//   const [nextPage, setNextPage] = useState(null);
//   const [previousPage, setPreviousPage] = useState(null);

//   const fetchHistoryData = async (url) => {
//     try {
//       const res = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       console.log(res);
//       const data = res.data;
//       setHistory((prevHistory) => [...prevHistory, ...data.results]);
//       setNextPage(data.next);
//       setPreviousPage(data.previous);
//     } catch (error) {
//       toast.error("Error occurred", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   useEffect(() => {
//     fetchHistoryData("http://127.0.0.1:8000/pastexpense/"); // Initial fetch
//   }, [accessToken]);

//   const handlePageChange = (url) => {
//     fetchHistoryData(url);
//   };

//   return (
//     <div className="flex flex-row">
//       <div className="flex flex-col items-start basis-1/5 bg-white justify-center h-screen gap-3 sticky top-0">
//         <SideBar />
//       </div>
//       <div className="w-full">
//         <HistoryTable data={history} />
//         <div className="font-bold text-1.5xl text-indigo-800 justify-center m-2">
//           <div className="items-center justify-center flex flex-row">
//             {previousPage && <button onClick={() => handlePageChange(previousPage)} style={{ marginRight: '20px' }}>Previous <IoIosArrowBack /> </button>}
//             {nextPage && <button onClick={() => handlePageChange(nextPage)}>Next <IoIosArrowForward /></button>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import HistoryTable from "../components/HistoryTable";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function History() {
  const accessToken = localStorage.getItem("token");

  const [history, setHistory] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  // New state variables for filters
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  const fetchHistoryData = async (url) => {
    try {
      // Update the params based on filter values
      const params = {
        start_date: startDate,
        end_date: endDate,
        category: categoryFilter,
        search: searchTerm,
      };

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params, // Include params in the request
      });

      const data = res.data;
      setHistory((prevHistory) => [...prevHistory, ...data.results]);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    } catch (error) {
      toast.error("Error occurred", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    fetchHistoryData("http://127.0.0.1:8000/pastexpense/"); // Initial fetch
  }, [accessToken]);

  const handlePageChange = (url) => {
    fetchHistoryData(url);
  };

  // Function to handle applying filters
  const applyFilters = () => {
    // Clear existing history and fetch data with filters
    setHistory([]);
    fetchHistoryData("http://127.0.0.1:8000/pastexpense/");
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-start basis-1/5 bg-white justify-center h-screen gap-3 sticky top-0">
        <SideBar />
      </div>
      <div className="w-full">
        <div className="font-bold text-1.5xl text-indigo-800 justify-center m-2">
          <div className="items-center justify-center flex flex-row">
            <input
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Term"
            />
            <select
              onChange={(e) => setCategoryFilter(e.target.value)}
              placeholder="Select Category"
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
            <button onClick={applyFilters}>Apply Filters</button>
          </div>
        </div>
        <HistoryTable data={history} />
        <div className="font-bold text-1.5xl text-indigo-800 justify-center m-2">
          <div className="items-center justify-center flex flex-row">
            {previousPage && (
              <button
                onClick={() => handlePageChange(previousPage)}
                style={{ marginRight: "20px" }}
              >
                Previous <IoIosArrowBack />
              </button>
            )}
            {nextPage && (
              <button onClick={() => handlePageChange(nextPage)}>
                Next <IoIosArrowForward />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




