import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import BarChart from '../components/BarChart';
import { Button } from '@material-tailwind/react';

const TotalExpensesByCategory = () => {
  const [expensesByCategory, setExpensesByCategory] = useState({});
  const [filterData, setFilterData] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [monthlyData, setMonthlyData] = useState({})
  const accessToken = localStorage.getItem('token');


  useEffect(() => {
    console.log(filterData);
    setYear(filterData.year);
    setMonth(filterData.month);
  }, [filterData]);

  useEffect(() => {
    const fetchTotalExpensesByCategory = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`http://127.0.0.1:8000/expensebycategory/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setExpensesByCategory(response.data);
        setData(filterData);
      } catch (error) {
        console.error('Error fetching total expenses by category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalExpensesByCategory();
  }, [filterData, accessToken]);

  const handleInput = (e) => {
    setFilterData({
      ...filterData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchMonthlyData();
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/monthly-report/?year=${year}&month=${month}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data) {
        const data = response.data;
        setMonthlyData(data);
      } else {
        console.error('Empty response data.');
      }
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  return (
    <div className='flex flex-row'>
      <div className=''>
        <SideBar />
      </div>
      <div className='w-full'>
        <div className='mt-3'>
          <label className='ms-3 text-lg font-medium'>Select Year</label>
          <input
            id='year'
            onChange={handleInput}
            placeholder=''
            className='ms-2 border border-solid border-x-gray-800 rounded-lg p-1 text-lg'
          />
        </div>
        <div className='mt-3 flex flex-row'>
          <label className='ms-3 text-lg font-medium'>Select Month</label>
          <input
            id='month'
            type='number'
            min='1'
            max='12'
            onChange={handleInput}
            placeholder=''
            className='ms-2 border border-solid border-x-gray-800 rounded-lg p-1 text-lg'
          />
          <div className='flex w-max gap-4'>
            <Button onClick={handleFilter} variant='text'>
              Filter
            </Button>
          </div>
        </div>
        <div className='w-full'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BarChart data={monthlyData} />
          )}
        </div>
        <div className='m-5 mt-5 grid grid-cols-5 gap-4'>
          {Object.entries(expensesByCategory).map(([category, value]) => (
            <div key={category} className='bg-blue-100 p-4 rounded-md'>
              <h3 className='text-lg text-black font-semibold mb-2'>{category}</h3>
              <p className='text-black text-xl'>${value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalExpensesByCategory;
