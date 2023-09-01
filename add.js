const storedUsername = sessionStorage.getItem('username');

if(storedUsername == null){
  window.location.href = 'log.html';
}
else{
  console.log(storedUsername);
  const form = document.getElementById('add-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const alcohol = document.getElementById('alcohol').value;
    const country = document.getElementById('country').value;
    const contributor = storedUsername;
    const location = document.getElementById('location-select').value;
    const imageInput = document.getElementById('image');

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);

    const currentDate = new Date();
    const date = currentDate.toISOString().slice(0, 10);

    try {
      const imageResponse = await fetch('http://188.2.164.39:3000/upload', {
        method: 'POST',
        body: formData
      });

      if (!imageResponse.ok) {
        console.error('Error uploading image');
        return;
      }

      const imagePath = await imageResponse.text();

      const data = {
        name,
        date,
        description,
        alcohol,
        country,
        contributor,
        location,
        image: imagePath
      };

      const dataResponse = await fetch('http://188.2.164.39:3000/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    
      if (dataResponse.ok) {
        console.log('Image uploaded and data added successfully');
        alert('Image uploaded and data added successfully');
        window.location.href = 'index.html';
      }
      else {
        console.error('Error adding data');
        alert('Error adding data');
        window.location.reload();
      }

    }
    catch (error) {
      console.error('Error:', error);
    }
  });

}