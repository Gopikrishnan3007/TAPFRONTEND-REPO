
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './Navbar';
import * as JobRequirementsService from '../../../services/JobRequirementsService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import moment from 'moment';

const JobRequirementsTable = () => {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentRequirement, setCurrentRequirement] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditConfirmationOpen, setIsEditConfirmationOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    requirementId:'',
    probableDesignation: '',
    requiredResourceCount: '',
    requiredExperience: '',
    requiredSkills: '',
    jobLocation: '',
    timeline: '',
    minimumBudget: '',
    maximumBudget: '',
  });
  const [errors, setErrors] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const data = await JobRequirementsService.fetchRequirements();
        const formattedData = data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
        const sortedData = formattedData.sort((a, b) => b.createdAt - a.createdAt);
        const finalData = sortedData.map((item) => ({
          ...item,
          createdAt: item.createdAt.toLocaleDateString('en-GB'),
        }));

        setRequirements(finalData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    

// const fetchRequirements = async () => {
//   try {
//     const data = await JobRequirementsService.fetchRequirements();
//     console.log("Raw data fetched:", data); // Debugging step

//     const formattedData = data.map((item) => {
//       const createdAt = moment(item.createdAt, moment.ISO_8601, true).isValid() 
//         ? moment(item.createdAt).toDate() 
//         : new Date(item.createdAt); // Handle different formats
//       console.log("Parsed createdAt with Moment.js:", createdAt); // Debugging step
//       return { ...item, createdAt };
//     });

//     const sortedData = formattedData.sort((a, b) => b.createdAt - a.createdAt);

//     const finalData = sortedData.map((item) => ({
//       ...item,
//       createdAt: item.createdAt.toLocaleDateString('en-GB'),
//     }));

//     setRequirements(finalData);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     setError(error.message);
//   } finally {
//     setLoading(false);
//   }
// };


    fetchRequirements();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEdit = (requirement) => {
    setCurrentRequirement(requirement);
    setFormData(requirement);
    setIsEditConfirmationOpen(true);
  };

  const handleView = (requirement) => {
    setCurrentRequirement(requirement);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeletingId(id);
    setIsConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await JobRequirementsService.deleteRequirement(deletingId);
      setRequirements(requirements.filter((item) => item.id !== deletingId));
      setIsConfirmationOpen(false);
      toast.success('Requirement deleted successfully!');
    } catch (error) {
      console.error('Error deleting requirement:', error);
      toast.error('Error deleting requirement.');
    }
  };

  const handleShortlist = (requirement) => {
    navigate(`/CandidateTable/${requirement.id}`); 
  };

  const handleSave = async () => {
    const isValid = validateFields();
    if (!isValid) return;

    const hasChanges = Object.keys(formData).some(
      (key) => formData[key] !== currentRequirement[key]
    );

    if (!hasChanges) {
      toast.error('Nothing to save. Please make changes before saving.');
      return;
    }

    try {
      await JobRequirementsService.updateRequirement(formData);
      // setRequirements(
      //   requirements.map((req) =>
      //     req.id === currentRequirement.id ? { ...req, ...formData } : req
      //   )
      // );
      setIsEditModalOpen(false);
      setIsEditConfirmationOpen(false);
      toast.success('Job requirement updated successfully!');
    } catch (error) {
      console.error('Error updating requirement:', error);
      setErrors({ submit: 'Error updating requirement.' });
      toast.error('Error updating requirement.');
    }
  };

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = ['probableDesignation', 'requiredResourceCount', 'jobLocation', 'minimumBudget', 'maximumBudget'];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required.`;
      }
    });

    if (formData.requiredResourceCount <= 0 || isNaN(formData.requiredResourceCount)) {
      newErrors.requiredResourceCount = 'Resource Count must be a positive number.';
    }

    if (formData.minimumBudget <= 0 || isNaN(formData.minimumBudget)) {
      newErrors.minimumBudget = 'Minimum Budget must be a positive number.';
    }

    if (formData.maximumBudget <= formData.minimumBudget || isNaN(formData.maximumBudget)) {
      newErrors.maximumBudget = 'Maximum Budget must be greater than Minimum Budget.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setErrors({});
    setIsEditConfirmationOpen(false);
    setIsViewModalOpen(false);
  };

  const confirmEdit = () => {
    setIsEditModalOpen(true);
    setIsEditConfirmationOpen(false);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-10">
      <Toaster />
      <Navbar toggleSidebar={toggleSidebar} />
      <h1 className="text-2xl font-bold mt-20 text-center text-[#27235C] mb-6 ">Job Requirements</h1>
      <div className={`flex justify-end mb-4 transition-all duration-300 ${isSidebarOpen ? 'w-11/12' : 'w-full'}`}>
        <div className="overflow-x-auto w-full  max-w-7xl flex justify-center ml-2">
          <table className="bg-white border border-[#27235C] text-sm">
            <thead>
              <tr className="bg-[#27235C] text-white">
                {['Job Title', 'Resource Count', 'Location', 'Budget (in LPA)', 'Created At'].map((header, index) => (
                  <th key={index} className="py-2 px-4 border-b text-center">{header}</th>
                ))}
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requirements.length > 0 ? (
                requirements.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{(item.probableDesignation)}</td>
                    <td className="py-2 px-4 border-b text-center">{item.requiredResourceCount}</td>
                    <td className="py-2 px-4 border-b">{(item.jobLocation)}</td>
                    <td className="py-2 px-4 border-b">{item.minimumBudget} - {item.maximumBudget} LPA</td>
                    <td className="py-2 px-4 border-b">{item.createdAt}</td>
                    <td className="py-2 px-4 border-b flex justify-center items-center h-full">
                      <div className="flex space-x-3">
                        <button onClick={() => handleEdit(item)} className="text-[#27235C] hover:text-blue-500">
                          <FontAwesomeIcon icon={faEdit} size="sm" />
                        </button>
                        <button onClick={() => handleView(item)} className="text-[#27235C] hover:text-blue-500">
                          <FontAwesomeIcon icon={faEye} size="sm" />
                        </button>
                        <button onClick={() => handleDelete(item.requirementId)} className="text-red-500 hover:text-red-700">
                          <FontAwesomeIcon icon={faTrash} size="sm" />
                        </button>
                        <button onClick={() => handleShortlist(item)} className="text-green-500 hover:text-green-700">
                          Shortlisted 
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-2">No requirements found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Confirmation Modal */}
      {isEditConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-center text-[#27235E]">Confirm Edit</h2>
            <p className="mb-4 text-center">Are you sure you want to edit this requirement?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmEdit}
                className="bg-[#27235E] text-white rounded-lg px-4 py-1"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsEditConfirmationOpen(false)}
                className="bg-gray-300 text-gray-700 rounded-lg px-4 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl relative mt-10">
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              className="absolute top-3 right-3 text-[#27235C] hover:text-[#27235C] cursor-pointer transition duration-200"
              onClick={closeModal}
            />
            <h2 className="text-lg font-semibold mb-4 text-center text-[#27235E]">Edit Job Requirement</h2>
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['probableDesignation', 'requiredResourceCount', 'requiredExperience', 'requiredSkills', 'jobLocation', 'timeline', 'minimumBudget', 'maximumBudget'].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm font-medium text-[#27235E]">{capitalizeFirstLetter(field.replace(/([A-Z])/g, ' $1'))}</label>
                  {field === 'jobLocation' ? (
                    <div className="flex space-x-2">
                      {['On-Site', 'Work From Home', 'Hybrid'].map((location) => (
                        <label key={location} className="text-[#27235C] text-xs">
                          <input
                            type="radio"
                            name={field}
                            value={location}
                            checked={formData.jobLocation === location}
                            onChange={handleChange}
                          />
                          {capitalizeFirstLetter(location)}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={['requiredResourceCount', 'minimumBudget', 'maximumBudget'].includes(field) ? 'number' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                      className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#27235E] h-10 text-xs"
                    />
                  )}
                  {errors[field] && <span className="text-red-600 text-xs">{errors[field]}</span>}
                </div>
              ))}
            </form>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSave}
                className="bg-[#27235E] text-white rounded-lg px-4 py-1"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="ml-2 bg-gray-300 text-gray-700 rounded-lg px-4 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl relative mt-10">
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              className="absolute top-3 right-3 text-[#27235C] hover:text-[#27235C] cursor-pointer transition duration-200"
              onClick={closeModal}
            />
            <h2 className="text-lg font-semibold mb-4 text-center text-[#27235E]">View Job Requirement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['probableDesignation', 'requiredResourceCount', 'requiredExperience', 'requiredSkills', 'jobLocation', 'timeline', 'minimumBudget', 'maximumBudget'].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm font-medium text-[#27235E]">{capitalizeFirstLetter(field.replace(/([A-Z])/g, ' $1'))}</label>
                  <input
                    type="text"
                    value={currentRequirement ? currentRequirement[field] : ''}
                    readOnly
                    className="border border-gray-300 p-2 rounded-lg h-10 text-xs bg-gray-100"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 rounded-lg px-4 py-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Deletion */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-center text-[#27235E]">Confirm Deletion</h2>
            <p className="mb-4 text-center">Are you sure you want to delete this requirement?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-[#27235E] text-white rounded-lg px-4 py-1"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="bg-gray-300 text-gray-700 rounded-lg px-4 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRequirementsTable;