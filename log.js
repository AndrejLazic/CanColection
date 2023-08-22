const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const formData = {username, password};

    try{
        const dataResponse = await fetch('http://localhost:3000/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (dataResponse.ok) {
            console.log('Successfully loged in');
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