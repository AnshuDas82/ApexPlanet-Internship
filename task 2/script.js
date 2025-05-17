function validateForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (nameValue === '' && emailValue === '') {
        alert("Please enter your name and email address.");
        return false;
    }
    if (nameValue === '') {
        alert("Please enter your name.");
        return false;
    }

    if (!emailRegex.test(emailValue)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}