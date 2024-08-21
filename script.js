document.getElementById('lastUpdated').innerText = new Date().toLocaleString();

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const role = document.getElementById('role').value;
    const frequency = document.getElementById('frequency').value;
    const firstName = document.getElementById('firstName').value;

    alert(`Thank you, ${firstName}, for your interest in ${role} roles. You will receive ${frequency} updates.`);
});
