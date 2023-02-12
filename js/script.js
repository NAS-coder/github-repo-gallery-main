//element showing the profile//
const overview = document.querySelector(".overview");
const username = "NAS-coder";
const listing = document.querySelector(".repo-list");
const allRepoInfo = document.querySelector(".repos");
const specificRepoInfo = document.querySelector(".repo-data");


const getData = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await res.json();
    //console.log(data);
    display(data);
};
getData();

//function to display the userdata on the page//
const display = function (data) {
    let user = document.createElement("user");
    user.classList.add("user-info");
    user.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`

  overview.append(user);
  fetchingRepos();

};

const fetchingRepos = async function () {
    const reposUrl = await fetch (
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const reposData = await reposUrl.json();
    //console.log(reposData);
    displayRepos(reposData);
};
//fetchingRepos();

const displayRepos = function (repos) {
    for (let item of repos) {
        const repoList = document.createElement("li");
        repoList.classList.add("repos");
        repoList.innerHTML = `<h3>${item.name}</h3>`;
        listing.append(repoList);
    };
   
//fetchingRepos();
};

listing.addEventListener ("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //console.log(repoName);
        specificRepo(repoName);
    };
    
});

const specificRepo = async function (repoName) {
    const fetchRepo = await fetch (
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await fetchRepo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (
        "https://api.github.com/repos/NAS-coder/subscription-calculator/languages"
    );
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
    for (let key in languageData) {
        languages.push(key);
        console.log(languages);
    }
    displaySpecificRepo(repoInfo, languages);
};

const displaySpecificRepo = function (repoInfo, languages) {
    specificRepoInfo.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
        "git://github.com/NAS-coder/subscription-calculator.git"}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

    specificRepoInfo.append(div);
    specificRepoInfo.classList.remove("hide");
    allRepoInfo.classList.add("hide");
}
