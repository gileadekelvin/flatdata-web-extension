// alert("Hello from your Chrome extension!")

console.log('FlatData Extension working')

let paragraphs = document.getElementsByTagName('p')

for (elem of paragraphs) {
  elem.style['background-color'] = 'green'
}
// INIT

// get Owner and Repository
const owner = document.getElementsByClassName('author')[0].outerText
const repository = document.querySelectorAll('[itemprop="name"]')[0].outerText;

// Get commit sha
const commitURL = document.getElementsByClassName('text-small text-mono Link--secondary')[0].href;
const parsedCommitSha = commitURL.match(/commit\/(.*)/)[1]

// Get path to the data inside repository
const tabURL = window.location.href;
const parsedDataPath = tabURL.match(/blob\/(.*)/)[1].match(/\/(.*)/)[1];

// Button definition
const btn = document.createElement('BUTTON')
const t = document.createTextNode('Flat Data Viewer');
btn.appendChild(t);
btn.onclick = function () {
  const url = `https://flatgithub.com/${owner}/${repository}?filename=${parsedDataPath}&sha=${parsedCommitSha}`
  window.open(url, '_blank').focus();
  return false;
}

document.body.appendChild(btn);
