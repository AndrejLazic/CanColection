var sortBy = 'alcohol';
var sort = 'desc';

fetch(`http://localhost:3000/sorted?sortBy=${sortBy}&sortOrder=${sort}`)
  .then(response => response.json())
  .then(data => {
    const postsContainer = document.getElementById('posts-container');

    data.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.style.margin = '1rem'

      var image = post.image;
      image = image.substring(image.lastIndexOf('/') + 1);

      var date = post.date;
      date = date.split("T");
      date = date[0];
      date = date.split("-");
    
      postDiv.className = 'post';
      postDiv.innerHTML = `
                            <div class="card" id="card" style="width: 18rem;">
                              <img src="http://localhost:3000/images/${image}" class="card-img-top" alt="${image}">
                              <div class="card-body">
                                <h5 class="card-title">${post.name}</h5>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item">Type: ${post.description}</li>
                                <li class="list-group-item">Alcohol: ${post.alcohol}%</li>
                                <li class="list-group-item">Country: ${post.country}</li>
                                <li class="list-group-item">Date added: ${date[2]}.${date[1]}.${date[0]}</li>
                              </ul>
                            </div>
                          `;

      postsContainer.appendChild(postDiv);
    });
  })

  .catch(error => {
    console.error('Error fetching data:', error);
  });

