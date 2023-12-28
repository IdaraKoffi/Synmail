const registerUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:${port}/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Response from server:', data);

    // Handle the response data or update the UI as needed
  } catch (error) {
    console.error('Error during fetch:', error);
    // Handle errors, update the UI accordingly
  }
};
