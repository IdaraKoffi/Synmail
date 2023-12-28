import axios from 'axios';

const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/register', userData);

    // Axios automatically throws an error for non-2xx responses
    const data = response.data;
    console.log('Response from server:', data);

    // Handle the response data or update the UI as needed
  } catch (error) {
    console.error('Error during Axios request:', error);
    // Handle errors, update the UI accordingly
  }
};
