import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Chart from 'react-apexcharts';
import moment from 'moment';
import ClientSidebar from './ClientSidebar';
import ClientNavbar from './ClientNavbar';
import { getJobRequirements, getShortlistedCount, getCandidates } from '../../../services/ClientDashboardService';
import axios from 'axios'; // Make sure to import axios
 
const ClientDashboard = () => {
  const [userName, setUserName] = useState('John Doe');
  const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
  const [jobPosts, setJobPosts] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [hiringCount, setHiringCount] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [chartSeries, setChartSeries] = useState([0, 0, 0]);
  const [pageSize, setPageSize] = useState(5);
 
  const columnDefs = [
    { headerName: 'Requirement', field: 'requirement', sortable: true, filter: true },
    { headerName: 'Resource Needed', field: 'resourceNeeded', sortable: true, filter: true },
    { headerName: 'Resource Assigned', field: 'resourceAssigned', sortable: true, filter: true },
  ];
 
  useEffect(() => {
    const clientId = 3; // Update as needed
    const fetchData = async () => {
      try {
        // Fetch job posts
        const jobPostCount = await getJobRequirements(clientId);
        setJobPosts(jobPostCount);
 
        const totalApplicantsCount = await getCandidates(clientId);
        setTotalApplicants(totalApplicantsCount.length); // Assuming this is an array
        const hiringCountValue = await getShortlistedCount(clientId);
        setHiringCount(hiringCountValue);
 
        // Fetch requirements data for the grid
        const requirementsResponse = await axios.get(`http://localhost:8080/demo/api/requirement-by-client/${clientId}`);
        const requirementsData = requirementsResponse.data;
        console.log(requirementsData);
 
        // Transform received data and fetch assigned resource counts
        const transformedData = await Promise.all(requirementsData.map(async (requirement) => {
          const resourceNeeded = requirement.requiredResourceCount; // Assuming this is the field in response
          const assignedResponse = await axios.get(`http://localhost:8080/demo/api/hired/${requirement.requirementId}`); // Modify 'id' as necessary
          console.log(assignedResponse);
 
 
          return {
            requirement: requirement.probableDesignation,
            resourceNeeded,
            resourceAssigned:assignedResponse.data,
          };
        }));
       
        setRowData(transformedData);
 
        // Set chart data based on fetched counts
        setChartSeries([totalApplicantsCount.length, hiringCountValue, jobPostCount]);
 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 
    fetchData();
  }, []);
 
  const chartOptions = {
    chart: {
      type: 'pie',
      height: '350',
    },
    labels: ['Total Applicants', 'Hiring Count', 'Job Posts'],
    colors: ['#008FFB', '#00E396', '#FEB019'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };
 
  const handleViewMore = () => {
    setPageSize(prevPageSize => prevPageSize + 5);
  };
 
  return (
    <div className="flex flex-row mt-8">
      <div className="flex-grow p-6 ml-64">
        <ClientNavbar />
        <ClientSidebar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-center">Welcome, {userName}!</h2>
            <p className="text-gray-600 text-center">{currentTime}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">Requirements Posted</h3>
            <p className="text-2xl">{jobPosts}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">Total Applicants</h3>
            <p className="text-2xl">{totalApplicants}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">Hiring Count</h3>
            <p className="text-2xl">{hiringCount}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">Job Applications Overview</h3>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="pie"
              height={350}
            />
          </div>
          <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold">Applicants List</p>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md"
                onClick={handleViewMore}
              >
                View More
              </button>
            </div>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={pageSize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ClientDashboard;
 