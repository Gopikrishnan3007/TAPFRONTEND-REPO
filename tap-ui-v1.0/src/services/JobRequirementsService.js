import axios from 'axios';


const BASE_URL = 'http://localhost:8080/demo/api'; 


export const fetchRequirements = async () => {
  try {
    const response = await axios.get(BASE_URL+"/allRequirements");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error; 
  }
};


export const updateRequirement = async (requirementData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update`, requirementData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};


export const deleteRequirement = async (requirementId) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${requirementId}`);
  } catch (error) {
    throw error; 
  }
};