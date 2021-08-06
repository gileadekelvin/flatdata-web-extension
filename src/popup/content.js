// TEST IF CONTENT SCRIPT IS WORKING

// console.log("FlatData Extension working");

// let paragraphs = document.getElementsByTagName("p");

// for (elem of paragraphs) {
//   elem.style["background-color"] = "green";
// }

// INIT
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === "hello!") {
    console.log(request.url); // new url is now in content scripts!
    addFlatDataButton();
  }
});

const addFlatDataButton = () => {
  // get Owner and Repository
  const owner = document.getElementsByClassName("author")[0].outerText;
  const repository =
    document.querySelectorAll('[itemprop="name"]')[0].outerText;

  // Get commit sha
  const commitURL = document.getElementsByClassName(
    "text-small text-mono Link--secondary"
  )[0];
  const parsedCommitSha = commitURL
    ? commitURL.href.match(/commit\/(.*)/)[1]
    : "";

  // Get path to the data inside repository
  const tabURL = window.location.href;
  const parsedDataPath = tabURL.match(/blob\/(.*)/)[1].match(/\/(.*)/)[1];

  // Button definition
  const btn = document.createElement("DIV");

  //append icon
  const elem = document.createElement("img");
  elem.setAttribute("src", "https://flatgithub.com/assets/flat.630c008a.svg");
  elem.setAttribute("height", "18");
  elem.setAttribute("width", "18");
  elem.setAttribute("alt", "");
  elem.setAttribute("class", "octicon pr-1");
  btn.appendChild(elem);

  //append text
  const t = document.createTextNode("Flat Viewer");
  btn.appendChild(t);
  btn.className = "btn btn-sm";

  //define onclick
  btn.onclick = function () {
    const url = `https://flatgithub.com/${owner}/${repository}?filename=${parsedDataPath}&sha=${parsedCommitSha}`;
    window.open(url, "_blank").focus();
    return false;
  };

  // add button to div
  const btnGroup = document.getElementsByClassName(
    "d-flex py-1 py-md-0 flex-auto flex-order-1 flex-md-order-2 flex-sm-grow-0 flex-justify-between hide-sm hide-md"
  )[0];
  console.log("btnGroup", btnGroup);

  btnGroup.appendChild(btn);
};

addFlatDataButton();
