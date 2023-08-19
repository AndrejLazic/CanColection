const form = document.getElementById('add-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const alcohol = document.getElementById('alcohol').value;
  const country = document.getElementById('country').value;
  const imageInput = document.getElementById('image');

  const formData = new FormData();
  formData.append('image', imageInput.files[0]);

  const currentDate = new Date();
  const date = currentDate.toISOString().slice(0, 10);

  try {
    const imageResponse = await fetch('http://localhost:3000/upload', {
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
      image: imagePath
    };

    const dataResponse = await fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (dataResponse.ok) {
      console.log('Image uploaded and data added successfully');
      alert('Image uploaded and data added successfully');
      window.location.href = 'http://127.0.0.1:5500/index.html';
    }else {
      console.error('Error adding data');
      alert('Error adding data');
      window.location.href = 'http://127.0.0.1:5500/add.html';
    }

    
  }catch (error) {
    console.error('Error:', error);
  }
});