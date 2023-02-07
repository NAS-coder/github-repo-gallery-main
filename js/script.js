//element showing the profile//
const overview = document.querySelector(".overview");
const username = "NAS-coder";


const getData = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await res.json();
    console.log(data);
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

};