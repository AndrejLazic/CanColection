const storedUsername = sessionStorage.getItem('username');
const url = 'http://limenke.giize.com:3000';

if(storedUsername !== null){
    window.location.href = 'add.html';
}
else{

    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const formData = {username, password};

        try{
            const dataResponse = await fetch(`${url}/log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (dataResponse.ok) {
                console.log('Successfully loged in');
                sessionStorage.setItem('username', username);
                window.location.href = 'add.html';
            }
            else {
                console.error('Bad username or password');
                alert('Bad username or password');
                window.location.reload();
            }
        }
        catch(error){
            console.error('Error:', error);
        }
    });
}