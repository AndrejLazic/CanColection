const url = 'https://limenke.giize.com:3000';

document.addEventListener('DOMContentLoaded', () => {

  const searchSelect = document.getElementById('search-select');
  const sortSelect = document.getElementById('sort-select');
  const sortDirection = document.getElementById('sort-direction');

  function updatePosts() {
    const searchBy = searchSelect.value;
    const sortBy = sortSelect.value;
    const orderBy = sortDirection.value;

    fetch(`${url}/sorted?sortBy=${sortBy}&orderBy=${orderBy}&searchBy=${searchBy}`)
      .then(response => response.json())
      .then(data => {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';

        data.forEach(post => {
          const postDiv = document.createElement('div');
          postDiv.className = 'col';

          var image = post.image;
          image = image.substring(image.lastIndexOf('/') + 1);

          var date = post.date;
          console.log(date);
          date = date.split("T");
          date = date[0];
          date = date.split("-");
          date[2] = parseInt(date[2]) + 1;
          console.log(date);
        
          
          postDiv.innerHTML = `
                                <div class="card">
                                  <div class="card-img-top" style="width: auto; height: 300px; display: flex; justify-content: center; overflow: hidden;">
                                    <img src="${url}/images/${image}" style="width: auto; height: 100%;" alt="${image}">
                                  </div>
                                  <div class="card-body">
                                    <h5 class="card-title">${post.name}</h5>
                                  <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Type: ${post.description}</li>
                                    <li class="list-group-item">Alcohol: ${(post.alcohol).toFixed(1)}%</li>
                                    <li class="list-group-item">Country: ${post.country}</li>
                                    <li class="list-group-item">Contributor: ${post.Contributor}</li>
                                    <li class="list-group-item">Date added: ${date[2]++}.${date[1]}.${date[0]}.</li>
                                  </ul>
                                </div>
                              `;

          postsContainer.appendChild(postDiv);
        });
      })

      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  searchSelect.addEventListener('change', updatePosts);
  sortSelect.addEventListener('change', updatePosts);
  sortDirection.addEventListener('change', updatePosts);
  
  updatePosts();

});
