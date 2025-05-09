document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop normal form submission

    const form = e.target;

    fetch("https://formsubmit.co/kidistayele37@gmail.com", {
        method: "POST",
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            form.reset();
            document.getElementById('successMessage').style.display = 'block';
        } else {
            alert("Oops! Something went wrong.");
        }
    })
    .catch(error => alert("Error: " + error));
});

