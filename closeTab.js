function handleTabClose() {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
        fetch(`${url}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: storedUsername }),
        })
        .then((response) => {
            if (response.ok) {
                console.log('Korisnik je odjavljen');
                sessionStorage.clear();
            } else {
                console.error('Greška prilikom odjave korisnika');
            }
        })
        .catch((error) => {
            console.error('Greška prilikom odjave korisnika:', error);
        });
    }
}

window.addEventListener("beforeunload", function (event) {
    const currentURL = window.location.href;
    if (currentURL.includes('can-collection.netlify.app')) {}
    else{
    handleTabClose();
    }
});
