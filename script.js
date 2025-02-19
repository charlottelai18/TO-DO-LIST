const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let player; // YouTube player instance

// Load YouTube API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: 'aTiOiMuSznE', // Your YouTube video ID
    playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo': 0, 'rel': 0 },
  });
}

function playCelebrationSound() {
  if (player) {
    player.seekTo(0); // Restart video from the beginning
    player.setVolume(30);
    player.playVideo();
  }
}


function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");

    if (e.target.classList.contains("checked")) {
      playCelebrationSound(); // Play YouTube video when checked
    }

    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();