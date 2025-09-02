document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.querySelector('.edit-btn');
    const signOutBtn = document.querySelector('.signout-btn');

    editBtn.addEventListener('click', () => {
        alert('Edit username functionality coming soon!');
    });

    signOutBtn.addEventListener('click', () => {
        alert('You have signed out.');
        // Here you can redirect: window.location.href = 'login.html';
    });
});
