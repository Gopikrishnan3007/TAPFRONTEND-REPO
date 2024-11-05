
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { AgGridReact } from 'ag-grid-react';
// // // // // import 'ag-grid-community/styles/ag-grid.css';
// // // // // import 'ag-grid-community/styles/ag-theme-alpine.css';
// // // // // import Chart from 'react-apexcharts';
// // // // // import moment from 'moment';
// // // // // import ClientSidebar from './ClientSidebar';
// // // // // import ClientNavbar from './ClientNavbar';
// // // // // import { getJobRequirements, getManufacturers } from '../../../services/ClientDashboardService'; // Importing the service functions
 
// // // // // const ClientDashboard = () => {
// // // // //   const [userName, setUserName] = useState('John Doe');
// // // // //   const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
// // // // //   const [jobPosts, setJobPosts] = useState(0);
// // // // //   const [totalApplicants, setTotalApplicants] = useState(0);
// // // // //   const [hiringCount, setHiringCount] = useState(0);
// // // // //   const [rowData, setRowData] = useState([]);
// // // // //   const [chartSeries, setChartSeries] = useState([]);
// // // // //   const [pageSize, setPageSize] = useState(5);
 
// // // // //   const columnDefs = [
// // // // //     { headerName: 'Requirement', field: 'requirement', sortable: true, filter: true },
// // // // //     { headerName: 'Candidate Name', field: 'name', sortable: true, filter: true },
// // // // //     { headerName: 'Status', field: 'status', sortable: true, filter: true },
// // // // //   ];
 
// // // // //   useEffect(() => {
// // // // //     const clientId = 3;
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         const requirementsData = await getJobRequirements(clientId); // Assuming this function still fetches job requirements
// // // // //         setJobPosts(requirementsData);
// // // // //         const candidatesResponse = await fetch('http://localhost:3000/candidates'); // URL to your JSON server
// // // // //         const candidatesData = await candidatesResponse.json();
 
// // // // //         const a = await getJobRequirements(clientId);
// // // // //         setTotalApplicants(requirementsData);

// // // // //         setHiringCount(requirementsData);
 
// // // // //         // Transform candidatesData to match the required structure
// // // // //         const transformedCandidatesData = candidatesData.map(candidate => ({
// // // // //           requirement: candidate.requirement,  // Adjust this based on your data structure
// // // // //           name: candidate.name,
// // // // //           status: candidate.status,
// // // // //         }));
 
// // // // //         setRowData(transformedCandidatesData);
       
// // // // //         const applicationsCount = candidatesData.length;
// // // // //         const interviewsCount = candidatesData.filter(candidate => candidate.status === 'In Process').length;
// // // // //         const offersCount = candidatesData.filter(candidate => candidate.status === 'Offer Made').length;
// // // // //         const hiresCount = candidatesData.filter(candidate => candidate.status === 'Hired').length;
 
// // // // //         setChartSeries([applicationsCount, interviewsCount, offersCount, hiresCount]);
// // // // //       } catch (error) {
// // // // //         console.error("Error fetching data:", error);
// // // // //       }
// // // // //     };
   
// // // // //     fetchData();
// // // // //   }, []);
 
// // // // //   const chartOptions = {
// // // // //     chart: {
// // // // //       type: 'pie',
// // // // //       height: '350',
// // // // //     },
// // // // //     labels: ['Applications', 'Interviews', 'Offers', 'Hires'],
// // // // //     colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
// // // // //     responsive: [{
// // // // //       breakpoint: 480,
// // // // //       options: {
// // // // //         chart: {
// // // // //           width: 200
// // // // //         },
// // // // //         legend: {
// // // // //           position: 'bottom'
// // // // //         }
// // // // //       }
// // // // //     }]
// // // // //   };
 
// // // // //   const handleViewMore = () => {
// // // // //     setPageSize(prevPageSize => prevPageSize + 5); // Increase page size by 5
// // // // //   };
 
// // // // //   return (
// // // // //     <div className="flex flex-row mt-8">
// // // // //       <div className="flex-grow p-6 ml-64">
// // // // //         <ClientNavbar />
// // // // //         <ClientSidebar />
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
// // // // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // // // //             <h2 className="text-xl font-bold text-center">Welcome, {userName}!</h2>
// // // // //             <p className="text-gray-600 text-center">{currentTime}</p>
// // // // //           </div>
// // // // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // // // //             <h3 className="text-lg font-bold">Requirements Posted</h3>
// // // // //             <p className="text-2xl">{jobPosts}</p>
// // // // //           </div>
// // // // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // // // //             <h3 className="text-lg font-bold">Total Applicants</h3>
// // // // //             <p className="text-2xl">{totalApplicants}</p>
// // // // //           </div>
// // // // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // // // //             <h3 className="text-lg font-bold">Hiring Count</h3>
// // // // //             <p className="text-2xl">{hiringCount}</p>
// // // // //           </div>
// // // // //         </div>
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
// // // // //           <div className="bg-white shadow-md rounded-lg p-6">
// // // // //             <h3 className="text-lg font-bold mb-4">Job Applications Overview</h3>
// // // // //             <Chart
// // // // //               options={chartOptions}
// // // // //               series={chartSeries}
// // // // //               type="pie"
// // // // //               height={350}
// // // // //             />
// // // // //           </div>
// // // // //           <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
// // // // //             <div className="flex justify-between items-center mb-2">
// // // // //               <p className="text-lg font-semibold">Applicants List</p>
// // // // //               <button
// // // // //                 className="bg-blue-500 text-white px-4 py-1 rounded-md"
// // // // //                 onClick={handleViewMore}
// // // // //               >
// // // // //                 View More
// // // // //               </button>
// // // // //             </div>
// // // // //             <AgGridReact
// // // // //               rowData={rowData}
// // // // //               columnDefs={columnDefs}
// // // // //               pagination={true}
// // // // //               paginationPageSize={pageSize} // Use dynamic page size
// // // // //             />
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };
 
// // // // // export default ClientDashboard;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { AgGridReact } from 'ag-grid-react';
// // // // import 'ag-grid-community/styles/ag-grid.css';
// // // // import 'ag-grid-community/styles/ag-theme-alpine.css';
// // // // import Chart from 'react-apexcharts';
// // // // import moment from 'moment';
// // // // import ClientSidebar from './ClientSidebar';
// // // // import ClientNavbar from './ClientNavbar';
// // // // import { getJobApplications,getJobRequirements, getShortlistedCount, getCandidates } from '../../../services/ClientDashboardService';
// // // // const ClientDashboard = () => {
// // // //   const [userName, setUserName] = useState('John Doe');
// // // //   const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
// // // //   const [jobPosts, setJobPosts] = useState(0);
// // // //   const [totalApplicants, setTotalApplicants] = useState(0);
// // // //   const [hiringCount, setHiringCount] = useState(0);
// // // //   const [rowData, setRowData] = useState([]);
// // // //   const [chartSeries, setChartSeries] = useState([]);
// // // //   const [pageSize, setPageSize] = useState(5);
// // // //   const columnDefs = [
// // // //     { headerName: 'Requirement', field: 'requirement', sortable: true, filter: true },
// // // //     { headerName: 'Candidate Name', field: 'name', sortable: true, filter: true },
// // // //     { headerName: 'Status', field: 'status', sortable: true, filter: true },
// // // //   ];

// // // //   useEffect(() => {
// // // //     const clientId = 3; // Update as needed
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         // Fetch job posts
// // // //         const jobPostCount = await getJobRequirements(clientId);
// // // //         setJobPosts(jobPostCount);

// // // //         // Fetch total applicants and hiring count
// // // //         const totalApplicantsCount = await getCandidates(clientId);
// // // //         setTotalApplicants(totalApplicantsCount.length); // Assume this is an array
// // // //         const hiringCountValue = await getShortlistedCount(clientId); // Assuming this is the hired count
// // // //         setHiringCount(hiringCountValue);

// // // //         // Fetch candidates data for the grid
// // // //         const candidatesData = await getCandidates(clientId);
// // // //         const transformedCandidatesData = candidatesData.map(candidate => ({
// // // //           requirement: candidate.requirement,
// // // //           name: candidate.name,
// // // //           status: candidate.status,
// // // //         }));
// // // //         setRowData(transformedCandidatesData);

// // // //         // Chart data
// // // //         const applicationsCount = candidatesData.length;
// // // //         const interviewsCount = candidatesData.filter(candidate => candidate.status === 'In Process').length;
// // // //         const offersCount = candidatesData.filter(candidate => candidate.status === 'Offer Made').length;
// // // //         const hiresCount = candidatesData.filter(candidate => candidate.status === 'Hired').length;
// // // //         setChartSeries([applicationsCount, interviewsCount, offersCount, hiresCount]);

// // // //       } catch (error) {
// // // //         console.error("Error fetching data:", error);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, []);

// // // //   const chartOptions = {
// // // //     chart: {
// // // //       type: 'pie',
// // // //       height: '350',
// // // //     },
// // // //     labels: ['Applications', 'Interviews', 'Offers', 'Hires'],
// // // //     colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
// // // //     responsive: [{
// // // //       breakpoint: 480,
// // // //       options: {
// // // //         chart: {
// // // //           width: 200,
// // // //         },
// // // //         legend: {
// // // //           position: 'bottom',
// // // //         },
// // // //       },
// // // //     }],
// // // //   };

// // // //   const handleViewMore = () => {
// // // //     setPageSize(prevPageSize => prevPageSize + 5);
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-row mt-8">
// // // //       <div className="flex-grow p-6 ml-64">
// // // //         <ClientNavbar />
// // // //         <ClientSidebar />
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
// // // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // // //             <h2 className="text-xl font-bold text-center">Welcome, {userName}!</h2>
// // // //             <p className="text-gray-600 text-center">{currentTime}</p>
// // // //           </div>
// // // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // // //             <h3 className="text-lg font-bold">Requirements Posted</h3>
// // // //             <p className="text-2xl">{jobPosts}</p>
// // // //           </div>
// // // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // // //             <h3 className="text-lg font-bold">Total Applicants</h3>
// // // //             <p className="text-2xl">{totalApplicants}</p>
// // // //           </div>
// // // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // // //             <h3 className="text-lg font-bold">Hiring Count</h3>
// // // //             <p className="text-2xl">{hiringCount}</p>
// // // //           </div>
// // // //         </div>
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
// // // //           <div className="bg-white shadow-md rounded-lg p-6">
// // // //             <h3 className="text-lg font-bold mb-4">Job Applications Overview</h3>
// // // //             <Chart
// // // //               options={chartOptions}
// // // //               series={chartSeries}
// // // //               type="pie"
// // // //               height={350}
// // // //             />
// // // //           </div>
// // // //           <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
// // // //             <div className="flex justify-between items-center mb-2">
// // // //               <p className="text-lg font-semibold">Applicants List</p>
// // // //               <button
// // // //                 className="bg-blue-500 text-white px-4 py-1 rounded-md"
// // // //                 onClick={handleViewMore}
// // // //               >
// // // //                 View More
// // // //               </button>
// // // //             </div>
// // // //             <AgGridReact
// // // //               rowData={rowData}
// // // //               columnDefs={columnDefs}
// // // //               pagination={true}
// // // //               paginationPageSize={pageSize}
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ClientDashboard;

// // // import React, { useState, useEffect } from 'react';
// // // import { AgGridReact } from 'ag-grid-react';
// // // import 'ag-grid-community/styles/ag-grid.css';
// // // import 'ag-grid-community/styles/ag-theme-alpine.css';
// // // import Chart from 'react-apexcharts';
// // // import moment from 'moment';
// // // import ClientSidebar from './ClientSidebar';
// // // import ClientNavbar from './ClientNavbar';
// // // import { getJobRequirements, getShortlistedCount, getCandidates } from '../../../services/ClientDashboardService';

// // // const ClientDashboard = () => {
// // //   const [userName, setUserName] = useState('John Doe');
// // //   const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
// // //   const [jobPosts, setJobPosts] = useState(0);
// // //   const [totalApplicants, setTotalApplicants] = useState(0);
// // //   const [hiringCount, setHiringCount] = useState(0);
// // //   const [interviewsCount, setInterviewsCount] = useState(0); // New state for interviews
// // //   const [offersCount, setOffersCount] = useState(0); // New state for offers
// // //   const [rowData, setRowData] = useState([]);
// // //   const [chartSeries, setChartSeries] = useState([0, 0, 0, 0]); // Adjust default values
// // //   const [pageSize, setPageSize] = useState(5);
  
// // //   const columnDefs = [
// // //     { headerName: 'Requirement', field: 'requirement', sortable: true, filter: true },
// // //     { headerName: 'Candidate Name', field: 'name', sortable: true, filter: true },
// // //     { headerName: 'Status', field: 'status', sortable: true, filter: true },
// // //   ];

// // //   useEffect(() => {
// // //     const clientId = 3; // Update as needed
// // //     const fetchData = async () => {
// // //       try {
// // //         // Fetch job posts
// // //         const jobPostCount = await getJobRequirements(clientId);
// // //         setJobPosts(jobPostCount);

// // //         // Fetch total applicants
// // //         const totalApplicantsCount = await getCandidates(clientId);
// // //         setTotalApplicants(totalApplicantsCount.length); // Assume this is an array

// // //         // Fetch hiring and other counts
// // //         const hiringCountValue = await getShortlistedCount(clientId); // Getting hiring count
// // //         setHiringCount(hiringCountValue);

// // //         // Here, you might want to fetch actual counts for interviews and offers if they are not included in the candidates
// // //         // Mocking response as per your requirements
// // //         const interviewCountValue = 5; // Replace with actual API call to fetch this count
// // //         const offerCountValue = 3; // Replace with actual API call to fetch this count

// // //         setInterviewsCount(interviewCountValue);
// // //         setOffersCount(offerCountValue);

// // //         // Update chart series based on fetched counts
// // //         setChartSeries([totalApplicantsCount.length, interviewCountValue, offerCountValue, hiringCountValue]);

// // //         // Fetch candidates data for the grid
// // //         const transformedCandidatesData = totalApplicantsCount.map(candidate => ({
// // //           requirement: candidate.requirement,
// // //           name: candidate.name,
// // //           status: candidate.status,
// // //         }));
// // //         setRowData(transformedCandidatesData);

// // //       } catch (error) {
// // //         console.error("Error fetching data:", error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   const chartOptions = {
// // //     chart: {
// // //       type: 'pie',
// // //       height: '350',
// // //     },
// // //     labels: ['Applications', 'Interviews', 'Offers', 'Hires'],
// // //     colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
// // //     responsive: [{
// // //       breakpoint: 480,
// // //       options: {
// // //         chart: {
// // //           width: 200,
// // //         },
// // //         legend: {
// // //           position: 'bottom',
// // //         },
// // //       },
// // //     }],
// // //   };

// // //   const handleViewMore = () => {
// // //     setPageSize(prevPageSize => prevPageSize + 5);
// // //   };

// // //   return (
// // //     <div className="flex flex-row mt-8">
// // //       <div className="flex-grow p-6 ml-64">
// // //         <ClientNavbar />
// // //         <ClientSidebar />
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
// // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // //             <h2 className="text-xl font-bold text-center">Welcome, {userName}!</h2>
// // //             <p className="text-gray-600 text-center">{currentTime}</p>
// // //           </div>
// // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // //             <h3 className="text-lg font-bold">Requirements Posted</h3>
// // //             <p className="text-2xl">{jobPosts}</p>
// // //           </div>
// // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // //             <h3 className="text-lg font-bold">Total Applicants</h3>
// // //             <p className="text-2xl">{totalApplicants}</p>
// // //           </div>
// // //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// // //             <h3 className="text-lg font-bold">Hiring Count</h3>
// // //             <p className="text-2xl">{hiringCount}</p>
// // //           </div>
// // //         </div>
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
// // //           <div className="bg-white shadow-md rounded-lg p-6">
// // //             <h3 className="text-lg font-bold mb-4">Job Applications Overview</h3>
// // //             <Chart
// // //               options={chartOptions}
// // //               series={chartSeries}
// // //               type="pie"
// // //               height={350}
// // //             />
// // //           </div>
// // //           <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
// // //             <div className="flex justify-between items-center mb-2">
// // //               <p className="text-lg font-semibold">Applicants List</p>
// // //               <button
// // //                 className="bg-blue-500 text-white px-4 py-1 rounded-md"
// // //                 onClick={handleViewMore}
// // //               >
// // //                 View More
// // //               </button>
// // //             </div>
// // //             <AgGridReact
// // //               rowData={rowData}
// // //               columnDefs={columnDefs}
// // //               pagination={true}
// // //               paginationPageSize={pageSize}
// // //             />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ClientDashboard;

// // import React, { useState, useEffect } from 'react';
// // import { AgGridReact } from 'ag-grid-react';
// // import 'ag-grid-community/styles/ag-grid.css';
// // import 'ag-grid-community/styles/ag-theme-alpine.css';
// // import Chart from 'react-apexcharts';
// // import moment from 'moment';
// // import ClientSidebar from './ClientSidebar';
// // import ClientNavbar from './ClientNavbar';
// // import { getJobRequirements, getShortlistedCount, getCandidates } from '../../../services/ClientDashboardService';

// // const ClientDashboard = () => {
// //   const [userName, setUserName] = useState('John Doe');
// //   const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
// //   const [jobPosts, setJobPosts] = useState(0);
// //   const [totalApplicants, setTotalApplicants] = useState(0);
// //   const [hiringCount, setHiringCount] = useState(0);
// //   const [rowData, setRowData] = useState([]);
// //   const [chartSeries, setChartSeries] = useState([0, 0, 0]); // Updated to reflect three counts
// //   const [pageSize, setPageSize] = useState(5);

// //   const columnDefs = [
// //     { headerName: 'Requirement', field: 'probableDesignation', sortable: true, filter: true },
// //     { headerName: 'Resource Needed', field: 'requiredResourceCount', sortable: true, filter: true },
// //     { headerName: 'Resource Assigned', field: 'assignedResourceCount', sortable: true, filter: true },
// //   ];

// //   useEffect(() => {
// //     const clientId = 3; // Update as needed
// //     const fetchData = async () => {
// //       try {
// //         // Fetch job posts
// //         const jobPostCount = await getJobRequirements(clientId);
// //         setJobPosts(jobPostCount);

// //         // Fetch total applicants and hiring count
// //         const totalApplicantsCount = await getCandidates(clientId);
// //         setTotalApplicants(totalApplicantsCount.length); // Assuming this is an array
// //         const hiringCountValue = await getShortlistedCount(clientId); // Assuming this is the hired count
// //         setHiringCount(hiringCountValue);
        
// //         // Fetch candidates data for the grid
// //         const transformedCandidatesData = totalApplicantsCount.map(candidate => ({
// //           requirement: candidate.requirement,
// //           name: candidate.name,
// //           status: candidate.status,
// //         }));
// //         setRowData(transformedCandidatesData);

// //         // Set chart data based on fetched counts
// //         setChartSeries([totalApplicantsCount.length, hiringCountValue, jobPostCount]);

// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // Updated chart options
// //   const chartOptions = {
// //     chart: {
// //       type: 'pie',
// //       height: '350',
// //     },
// //     labels: ['Total Applicants', 'Hiring Count', 'Job Posts'],
// //     colors: ['#008FFB', '#00E396', '#FEB019'],
// //     responsive: [{
// //       breakpoint: 480,
// //       options: {
// //         chart: {
// //           width: 200,
// //         },
// //         legend: {
// //           position: 'bottom',
// //         },
// //       },
// //     }],
// //   };

// //   const handleViewMore = () => {
// //     setPageSize(prevPageSize => prevPageSize + 5);
// //   };

// //   return (
// //     <div className="flex flex-row mt-8">
// //       <div className="flex-grow p-6 ml-64">
// //         <ClientNavbar />
// //         <ClientSidebar />
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
// //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// //             <h2 className="text-xl font-bold text-center">Welcome, {userName}!</h2>
// //             <p className="text-gray-600 text-center">{currentTime}</p>
// //           </div>
// //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// //             <h3 className="text-lg font-bold">Requirements Posted</h3>
// //             <p className="text-2xl">{jobPosts}</p>
// //           </div>
// //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// //             <h3 className="text-lg font-bold">Total Applicants</h3>
// //             <p className="text-2xl">{totalApplicants}</p>
// //           </div>
// //           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
// //             <h3 className="text-lg font-bold">Hiring Count</h3>
// //             <p className="text-2xl">{hiringCount}</p>
// //           </div>
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
// //           <div className="bg-white shadow-md rounded-lg p-6">
// //             <h3 className="text-lg font-bold mb-4">Job Applications Overview</h3>
// //             <Chart
// //               options={chartOptions}
// //               series={chartSeries}
// //               type="pie"
// //               height={350}
// //             />
// //           </div>
// //           <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
// //             <div className="flex justify-between items-center mb-2">
// //               <p className="text-lg font-semibold">Applicants List</p>
// //               <button
// //                 className="bg-blue-500 text-white px-4 py-1 rounded-md"
// //                 onClick={handleViewMore}
// //               >
// //                 View More
// //               </button>
// //             </div>
// //             <AgGridReact
// //               rowData={rowData}
// //               columnDefs={columnDefs}
// //               pagination={true}
// //               paginationPageSize={pageSize}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClientDashboard;


// import React, { useState, useEffect } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import Chart from 'react-apexcharts';
// import moment from 'moment';
// import ClientSidebar from './ClientSidebar';
// import ClientNavbar from './ClientNavbar';
// import { getJobRequirements, getShortlistedCount, getCandidates } from '../../../services/ClientDashboardService';

// const ClientDashboard = () => {
//   const [userName, setUserName] = useState('John Doe');
//   const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
//   const [jobPosts, setJobPosts] = useState(0);
//   const [totalApplicants, setTotalApplicants] = useState(0);
//   const [hiringCount, setHiringCount] = useState(0);
//   const [rowData, setRowData] = useState([]);
//   const [chartSeries, setChartSeries] = useState([0, 0, 0]); // Updated to reflect three counts
//   const [pageSize, setPageSize] = useState(5);

//   const columnDefs = [
//     { headerName: 'Requirement', field: 'probableDesignation', sortable: true, filter: true },
//     { headerName: 'Resource Needed', field: 'requiredResourceCount', sortable: true, filter: true },
//     { headerName: 'Resource Assigned', field: 'assignedResourceCount', sortable: true, filter: true },
//   ];

//   useEffect(() => {
//     const clientId = 3; // Update as needed
//     const fetchData = async () => {
//       try {
//         // Fetch job posts
//         const jobPostCount = await getJobRequirements(clientId);
//         setJobPosts(jobPostCount);

//         const totalApplicantsCount = await getCandidates(clientId);
//         setTotalApplicants(totalApplicantsCount.length); // Assuming this is an array
//         const hiringCountValue = await getShortlistedCount(clientId); // Assuming this is the hired count
//         setHiringCount(hiringCountValue);
        
//         // Fetch candidates data for the grid
        
//         const transformedCandidatesData = 
//         totalApplicantsCount.map(candidate => ({
//           requirement: candidate.requirement,
//           name: candidate.name,
//           status: candidate.status,
//         }));
//         setRowData(transformedCandidatesData);
        

//         // Set chart data based on fetched counts
//         setChartSeries([totalApplicantsCount.length, hiringCountValue, jobPostCount]);

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Updated chart options
//   const chartOptions = {
//     chart: {
//       type: 'pie',
//       height: '350',
//     },
//     labels: ['Total Applicants', 'Hiring Count', 'Job Posts'],
//     colors: ['#008FFB', '#00E396', '#FEB019'],
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         chart: {
//           width: 200,
//         },
//         legend: {
//           position: 'bottom',
//         },
//       },
//     }],
//   };

//   const handleViewMore = () => {
//     setPageSize(prevPageSize => prevPageSize + 5);
//   };

//   return (
//     <div className="flex flex-row mt-8">
//       <div className="flex-grow p-6 ml-64">
//         <ClientNavbar />
//         <ClientSidebar />
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
//           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
//             <h2 className="text-xl font-bold text-center">Welcome, {userName}!</h2>
//             <p className="text-gray-600 text-center">{currentTime}</p>
//           </div>
//           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
//             <h3 className="text-lg font-bold">Requirements Posted</h3>
//             <p className="text-2xl">{jobPosts}</p>
//           </div>
//           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
//             <h3 className="text-lg font-bold">Total Applicants</h3>
//             <p className="text-2xl">{totalApplicants}</p>
//           </div>
//           <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
//             <h3 className="text-lg font-bold">Hiring Count</h3>
//             <p className="text-2xl">{hiringCount}</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <h3 className="text-lg font-bold mb-4">Job Applications Overview</h3>
//             <Chart
//               options={chartOptions}
//               series={chartSeries}
//               type="pie"
//               height={350}
//             />
//           </div>
//           <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
//             <div className="flex justify-between items-center mb-2">
//               <p className="text-lg font-semibold">Applicants List</p>
//               <button
//                 className="bg-blue-500 text-white px-4 py-1 rounded-md"
//                 onClick={handleViewMore}
//               >
//                 View More
//               </button>
//             </div>
//             <AgGridReact
//               rowData={rowData}
//               columnDefs={columnDefs}
//               pagination={true}
//               paginationPageSize={pageSize}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDashboard;

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
 
        // Transform received data and fetch assigned resource counts
        const transformedData = await Promise.all(requirementsData.map(async (requirement) => {
          const resourceNeeded = requirement.requiredResourceCount; // Assuming this is the field in response
          const assignedResponse = await axios.get(`http://localhost:8080/demo/api/hired/${requirement.id}`); // Modify 'id' as necessary
          const resourceAssigned = assignedResponse.data.length; // Assuming this is an array
 
          return {
            requirement: requirement.probableDesignation,
            resourceNeeded,
            resourceAssigned,
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
