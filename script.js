fetch('http://localhost:3000')
  .then(response => response.json())
  .then(data => {
    const postsContainer = document.getElementById('posts-container');

    data.forEach(post => {
      const postDiv = document.createElement('div');
      slika = (post.name + ".jpg").toLowerCase();
    
      postDiv.className = 'post';
      postDiv.innerHTML =   `
      <div class="card" id="card" style="width: 18rem;">
      <img src="http://localhost:3000/images/${slika}" class="card-img-top" alt="${slika}">
      <div class="card-body">
        <h5 class="card-title">${post.name}</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Type: ${post.description}</li>
        <li class="list-group-item">Alcohol: ${post.alcohol}</li>
        <li class="list-group-item">Country: ${post.country}</li>
      </ul>
  </div>
        `;
        /*
      postDiv.innerHTML =   `
                            <h2>${post.name}</h2>
                            <p>${post.description}</p>
                            <img src="http://localhost:3000/images/${slika}" alt="fail to get image">
                            `;
        */
      postsContainer.appendChild(postDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });