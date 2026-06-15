document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Form ko auto-reload hone se rokne ke liye

    // Form elements se data extract karna
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value;
    const availability = document.getElementById('availability').value;

    const messageDiv = document.getElementById('message');

    // Data object jo backend ko bhejna hai
    const formData = {
        full_name: fullName,
        email: email,
        phone: phone,
        skills: skills,
        availability: availability
    };

    try {
        // Django Backend API hitting
        const response = await fetch('http://127.0.0.1:8000/api/volunteers/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            // Success response handle karna
            messageDiv.textContent = "🎉 Registration Successful! Thank you for joining NayePankh Foundation.";
            messageDiv.className = "p-4 mb-4 rounded text-center font-medium bg-green-100 text-green-700 block";
            document.getElementById('registrationForm').reset(); // Form clear karne ke liye
        } else {
            // Error handling (e.g., Email already exists)
            let errorMsg = "Registration Failed: ";
            if (data.email) errorMsg += "This email is already registered.";
            else errorMsg += "Please check your details.";

            messageDiv.textContent = errorMsg;
            messageDiv.className = "p-4 mb-4 rounded text-center font-medium bg-red-100 text-red-700 block";
        }
    } catch (error) {
        // Network or server down issue
        messageDiv.textContent = "❌ Connection Error. Make sure your Django server is running!";
        messageDiv.className = "p-4 mb-4 rounded text-center font-medium bg-red-100 text-red-700 block";
        console.error("Error:", error);
    }
});