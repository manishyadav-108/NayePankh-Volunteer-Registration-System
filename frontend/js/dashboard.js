document.addEventListener('DOMContentLoaded', fetchVolunteers);

async function fetchVolunteers() {
    const tableBody = document.getElementById('volunteerTableBody');
    const totalCountEl = document.getElementById('totalCount');

    try {
        // Backend API se data fetch karna
        const response = await fetch('http://127.0.0.1:8000/api/volunteers/list/');
        
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const volunteers = await response.json();

        // Total count update karna
        totalCountEl.textContent = volunteers.length;

        // Table ko clear karna
        tableBody.innerHTML = '';

        if (volunteers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="p-4 text-center text-gray-500">No volunteers registered yet.</td>
                </tr>`;
            return;
        }

        // Loop chalakar table rows insert karna
        volunteers.forEach(volunteer => {
            // Formatting timestamp to readable date
            const dateJoined = new Date(volunteer.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });

            const row = `
                <tr class="hover:bg-gray-50 transition border-b">
                    <td class="p-4 font-medium text-gray-900">${volunteer.full_name}</td>
                    <td class="p-4 text-gray-600">${volunteer.email}</td>
                    <td class="p-4 text-gray-600">${volunteer.phone}</td>
                    <td class="p-4 text-gray-600 max-w-xs truncate" title="${volunteer.skills}">${volunteer.skills}</td>
                    <td class="p-4">
                        <span class="px-2 py-1 text-xs font-semibold rounded bg-orange-100 text-orange-800">
                            ${volunteer.availability}
                        </span>
                    </td>
                    <td class="p-4 text-gray-500">${dateJoined}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error("Error fetching volunteers:", error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="p-4 text-center text-red-500 font-medium">
                    ❌ Error loading data. Ensure Django server is running!
                </td>
            </tr>`;
    }
}