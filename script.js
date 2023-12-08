const ul = document.querySelector("#item-list");
const form = document.querySelector("#item-form");
const input = document.querySelector("#item-input");
const clearAllBtn = document.querySelector("#clear");
const liFilter = document.querySelector("#filter");

const addItem = (e) => {
  e.preventDefault();

  const inputValue = input.value;
  // Validate input

  if (inputValue === "") {
    alert("Please Enter the Item in the Input Field");
    return;
  }

  // Create Lit Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(inputValue));

  const button = createButton("remove-item btn-link text-red");
  const icon = createIcon("fa-solid fa-xmark");

  button.appendChild(icon);
  li.appendChild(button);
  ul.appendChild(li);
  checkUI();
  input.value = "";
};

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  // const icon = createIcon("fa-solid fa-xmark");
  // button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to Remove this Item?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

function clearAllItems() {
  // ul.innerHTML = "";
  // Above is not the best way to this
  // Below is a faster way to do this
  if (confirm("Are you sure you want to clear all Items?")) {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  }

  checkUI();
}

function filterItems(e) {
  const lis = ul.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  lis.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const lis = ul.querySelectorAll("li");
  if (lis.length === 0) {
    liFilter.style.display = "none";
    clearAllBtn.style.display = "none";
  } else {
    liFilter.style.display = "block";
    clearAllBtn.style.display = "block";
  }
}

form.addEventListener("submit", addItem);
ul.addEventListener("click", removeItem);
clearAllBtn.addEventListener("click", clearAllItems);
liFilter.addEventListener("input", filterItems);

checkUI();
