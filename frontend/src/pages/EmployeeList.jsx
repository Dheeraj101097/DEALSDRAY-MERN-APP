
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';


const EmployeeList = () => {
  const [infoFromDB, setInfoFromDB] = useState([]);
  const [reload, setReload] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');  // Search query state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage] = useState(5); // Rows per page
  const [sortConfig, setSortConfig] = useState(null); // Sorting state

    useEffect(() => {
        axios.get("http://localhost:4001/employee-list")
            .then((res) => {
                setInfoFromDB(res.data);
            })
            .catch((err) => {
                console.log("Error fetching employee data:", err);
            });
        setReload(1);
    }, [reload]);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:4001/employee-list/${id}`)
            .then(() => {
                setReload(prev => prev + 1); 
            })
            .catch(err => {
                console.log("Error deleting user:", err);
            });
    };

    
    const toggleActiveStatus = (id, active) => {
        axios.put(`http://localhost:4001/employee-list/${id}`, { active: !active })
            .then(() => {
                setReload(prev => prev + 1); // Trigger reload after toggling active status
            })
            .catch(err => {
                console.log("Error updating active status:", err);
            });
    };

   
    const filteredEmployees = infoFromDB.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item._id.includes(searchQuery) ||
        item.createdAt.split('T')[0].includes(searchQuery)
    );

   
    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (sortConfig !== null) {
            const { key, direction } = sortConfig;
            const aKey = a[key]?.toLowerCase?.() ?? a[key]; 
            const bKey = b[key]?.toLowerCase?.() ?? b[key];

            if (aKey < bKey) return direction === 'ascending' ? -1 : 1;
            if (aKey > bKey) return direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = sortedEmployees.slice(indexOfFirstItem, indexOfLastItem);

    
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const changePage = (page) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className='w-screen p-4'>
            
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p>Total Count: {filteredEmployees.length}</p>
                    <div className="m-110"><input 
                        type="text" 
                        placeholder="Enter Search Keyword (Name/Email/ID/Date)" 
                        className="border p-2 rounded" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}  // Update search query state
                    /></div>
                    
                </div>
                <Button variant="text">
                    <Link to='/create-employee' className="text-blue-500 underline">Create Employee</Link>
                </Button>
            </div>

            {/* Employee Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className='border px-4 py-2 cursor-pointer' onClick={() => requestSort('id')}>ID</th>
                            <th className='border px-4 py-2'>Image</th>
                            <th className='border px-4 py-2 cursor-pointer' onClick={() => requestSort('name')}>Name</th>
                            <th className='border px-4 py-2 cursor-pointer' onClick={() => requestSort('email')}>Email</th>
                            <th className='border px-4 py-2'>Phone</th>
                            <th className='border px-4 py-2'>Designation</th>
                            <th className='border px-4 py-2'>Gender</th>
                            <th className='border px-4 py-2'>Course</th>
                            <th className='border px-4 py-2 cursor-pointer' onClick={() => requestSort('createdAt')}>CreatedAt</th>
                            <th className='border px-4 py-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {currentEmployees.map((item, i) => (
                            <tr key={item._id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                <td className='border px-4 py-2'>{item._id}</td>
                                <td className='border px-4 py-2'>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgpPwM5mR5lNHGg9vxaoUgcnAIBOJumsoJrg&s" 
                                         alt="Employee" className="h-10 w-10 object-cover" />
                                </td>
                                <td className='border px-4 py-2'>{item.name}</td>
                                <td className='border px-4 py-2'>{item.email}</td>
                                <td className='border px-4 py-2'>{item.phone}</td>
                                <td className='border px-4 py-2'>{item.designation}</td>
                                <td className='border px-4 py-2'>{item.gender}</td>
                                <td className='border px-4 py-2'>{item.course.join(', ')}</td>
                                <td className='border px-4 py-2'>{item.createdAt.split('T')[0]}</td>
                                <td className='border px-4 py-2'>
                                    <Switch
                                        checked={item.active}
                                        onChange={() => toggleActiveStatus(item._id, item.active)}
                                        name="activeStatus"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    /> {item.active ? 'Active' : 'Deactive'}<br />
                                    <Link to={`/edit-employee/${item._id}`} className="bg-yellow-200 mr-1 ml-1 rounded-lg p-2">Edit</Link>
                                    <button className='bg-yellow-200 mr-1 ml-1 rounded-lg p-2 ' onClick={() => deleteUser(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button onClick={() => changePage(currentPage - 1)} className="border px-3 py-1 mr-2">Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => changePage(currentPage + 1)} className="border px-3 py-1 ml-2">Next</button>
            </div>
        </div>
    );
};

export default EmployeeList;
