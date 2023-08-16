const form = document.getElementById('add-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const alcohol = document.getElementById('alcohol').value;
  const country = document.getElementById('country').value;
  const image = document.getElementById('image').value;
  const currentDate = new Date();
  const date = currentDate.toISOString().slice(0, 10);

  const data = {
    name,
    date,
    description,
    alcohol,
    country,
    image
  };

  try {
    const response = await fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('Data added successfully');
      alert("CAN IS SUCCESSFULY ADDED");
    } else {
      console.error('Error adding data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});