document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Perform form validation or any other logic here
        // If validation is successful, redirect to the login page
        // For example, you can simulate a successful form submission with a delay
        setTimeout(() => {
            // Redirect to the login page
            window.location.href = '6.html'; // Replace with your login page URL
        }, 1000); // Delay in milliseconds (optional)
    });
});
