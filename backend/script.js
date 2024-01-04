function Userlogin(email, password) {
    const serverUrl = 'http://192.168.43.28:21167/login';

    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Login successful');
        } else {
            console.error('Login failed:', data.message);
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
    });
}
