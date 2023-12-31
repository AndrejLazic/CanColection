const storedUsername = sessionStorage.getItem('username');
const url = 'https://limenke.giize.com:3000';

if(storedUsername == null){
  window.location.href = 'log.html';
}
else{
  const form = document.getElementById('add-form');
  const submitButton = document.getElementById('submit-button');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitButton.disabled = true;

    var name = document.getElementById('name').value;
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

    const words = name.split(' ');

    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    name = capitalizedWords.join(' ');

    try {
      const imageResponse = await fetch(`${url}/upload`, {
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

      const dataResponse = await fetch(`${url}/add`, {
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