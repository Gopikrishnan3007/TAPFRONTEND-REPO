import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios'; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaSearch } from 'react-icons/fa'; 

const CandidateTable = () => {
  const [candidatesData, setCandidatesData] = useState([]); 
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/candidates'); 
        setCandidatesData(response.data);
      } catch (error) {
        console.error('Error fetching the candidates data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = candidatesData.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { headerName: 'Name', field: 'name', filter: true, flex: 1, minWidth: 200 },
    { headerName: 'Email', field: 'email', filter: true, flex: 1, minWidth: 250 },
    { headerName: 'Skills', field: 'skills', filter: true, flex: 1, minWidth: 200 },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params) => (
        <button
          className="bg-[#27235C] text-white py-1 px-3 rounded transition duration-200 hover:bg-[#524F7D]"
          onClick={() => setSelectedCandidate(params.data)}
        >
          View More
        </button>
      ),
      width: 120, // Set fixed width for the action column
      maxWidth: 120, // Avoid expanding beyond this width
      minWidth: 120 // Ensure it doesn't shrink too much
    },
  ];

  const closeModal = () => {
    setSelectedCandidate(null);
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4 mt-20">
      {/* Search Bar */}
      <div className="flex items-center mb-6 w-full max-w-4xl">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-full pl-10 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Ag-Grid Table */}
      <div className="ag-theme-alpine w-full max-w-4xl h-96">
        <AgGridReact
          rowData={filteredData}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={5}
          enableSorting={true}
          domLayout='autoHeight'
          suppressRowHoverHighlight={true} 
        />
      </div>

      {/* Candidate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg transition-transform transform scale-100 hover:scale-105">
            <div className="bg-[#27235C] text-white rounded-t-lg p-4">
              <h2 className="text-xl font-bold text-center">{selectedCandidate.name}</h2>
            </div>
            <div className="flex items-center mb-4 mt-4">
              <img
                src={selectedCandidate.profilePhoto || 'https://via.placeholder.com/50'}
                alt={`${selectedCandidate.name}'s profile`}
                className="w-16 h-16 rounded-full border-2 border-blue-500 mr-4"
              />
            </div>
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Email:</strong> {selectedCandidate.email}</p>
              <p className="text-gray-700"><strong>Skills:</strong> {selectedCandidate.skills}</p>
              <p className="text-gray-700"><strong>Address:</strong> {selectedCandidate.address}</p>
              <p className="text-gray-700"><strong>Aadhaar Number:</strong> {selectedCandidate.aadhaar}</p>
              <p className="text-gray-700"><strong>PAN Number:</strong> {selectedCandidate.pan}</p>
            </div>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateTable;
