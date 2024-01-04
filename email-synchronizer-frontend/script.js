// synmail-app/script.js
document.addEventListener('DOMContentLoaded', function () {
    // Sample data for email accounts and calendar notifications
    let emailAccounts = ['account1@example.com', 'account2@example.com'];
    let calendarNotifications = ['Meeting at 10 AM', 'Task Deadline'];

    // Function to update the account list in the HTML
    function updateAccountList() {
        const accountList = document.getElementById('account-list');
        accountList.innerHTML = '';

        emailAccounts.forEach((email, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<button class="account-button" data-email="${email}">Account ${index + 1}</button>`;
            accountList.appendChild(listItem);
        });
    }

    // Function to update the calendar notifications in the HTML
    function updateCalendarNotifications() {
        const calendarList = document.getElementById('calendar-notifications');
        calendarList.innerHTML = '';

        calendarNotifications.forEach((notification, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = notification;
            calendarList.appendChild(listItem);
        });
    }

    // Function to make a fetch request to login endpoint
    function Userlogin(email, password) {
	    fetch('http://localhost:21167/login', {
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
			    console.error('Login failed:', data.message)
		    }
	    })
	    .catch(error => {
		    console.error('Error during login:', error);
	    });
    }

    // Function to initiate email synchronization
    function syncEmails() {
        // Add logic for email synchronization here
        document.getElementById('sync-status').textContent = 'Sync Status: Completed';
    }

    // Event listener for the "Add Account" button
    document.getElementById('add-account').addEventListener('click', function () {
        const newAccount = prompt('Enter Email Account:');
        if (newAccount) {
            emailAccounts.push(newAccount);
            updateAccountList();
        }
    });

    // Event listener for the "Delete Account" button
    document.getElementById('delete-account').addEventListener('click', function () {
        if (emailAccounts.length > 0) {
            emailAccounts.pop();
            updateAccountList();
        }
    });

    // Event listener for the "Sync Emails" button
    document.getElementById('sync-button').addEventListener('click', syncEmails);

    // Event listener for the "Customize Inbox" button
    document.getElementById('customize-button').addEventListener('click', function () {
        // Add logic for customizing inbox here
        alert('Customizing Inbox...');
    });

    // Initial updates to the HTML based on sample data
    updateAccountList();
    updateCalendarNotifications();

    // Set initial background color (as in previous examples)
    function alternateBackgroundColor() {
        const body = document.body;
        const currentColor = body.style.backgroundColor || getComputedStyle(body).backgroundColor;

        body.style.backgroundColor = currentColor === 'blue' ? 'white' : 'blue';
    }

   // setInterval(alternateBackgroundColor, 5000); // Alternates background color every 5 seconds
});
