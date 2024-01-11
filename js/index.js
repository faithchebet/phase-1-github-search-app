document.addEventListener('DOMContentLoaded', function () {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = searchInput.value;
  
    
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      
      fetchUserData(username);
    });
  
    function fetchUserData(username) {
      
      fetch(`https://api.github.com/search/users?q=${username}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })
        .then(response => response.json())
        .then(data => {
          displayUserResults(data.items);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  
    function displayUserResults(users) {
      users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
          <img src='${user.avatar_url}' alt='${user.login}' width='50' height='50'>
          <p>${user.login}</p>
          <a href='${user.html_url}' target='_blank'>View Profile</a>
        `;
        userItem.addEventListener('click', function () {
          fetchUserRepos(user.login);
        });
        userList.appendChild(userItem);
      });
    }
  
    function fetchUserRepos(username) {
      
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })
        .then(response => response.json())
        .then(repos => {
          displayRepoResults(repos);
        })
        .catch(error => console.error('Error fetching repositories:', error));
    }
  
    function displayRepoResults(repos) {
      repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.innerHTML = `
          <p><strong>${repo.name}</strong></p>
          <p>${repo.description || 'No description available'}</p>
        `;
        reposList.appendChild(repoItem);
      });
    }
  });
  
