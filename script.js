const ul = document.querySelector("#item-list");
const form = document.querySelector("#item-form");
const input = document.querySelector("#item-input");
const clearAllBtn = document.querySelector("#clear");
const liFilter = document.querySelector("#filter");
const fromBtn = form.querySelector("button");
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

const onAddItemSubmit = (e) => {
  e.preventDefault();

  const inputValue = input.value;
  // Validate input

  if (inputValue === "") {
    alert("Please Enter the Item in the Input Field");
    return;
  }

  // Check for Edit Mode
  if (isEditMode) {
    const itemToEdit = ul.querySelector(".edit-mode");

    removeItemFromLocalStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(inputValue)) {
      alert("This Item is Already Exists!");
      input.value = "";
      return;
    }
  }

  // Create the DOM element
  addItemToDOM(inputValue);

  // Add item to LocalStorage
  addItemToLocaLStorage(inputValue);

  checkUI();
  input.value = "";
};

function addItemToDOM(item) {
  // Create Lit Item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  const icon = createIcon("fa-solid fa-xmark");

  button.appendChild(icon);
  li.appendChild(button);
  ul.appendChild(li);
}

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

function addItemToLocaLStorage(item) {
  const itemsFromStorage = getItemFromStorage();

  //Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemFromStorage(item) {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item);
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  ul.querySelectorAll("li").forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  fromBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
  fromBtn.style.backgroundColor = "green";
  input.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Are you sure you want to Remove this Item?")) {
    // Remove from DOM
    item.remove();

    // Remove from Local Storage
    removeItemFromLocalStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromLocalStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  // Filter out items to be Removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Reset Local Storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
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

  // Clear Local Storage
  localStorage.removeItem("items");

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
  input.value = "";

  const lis = ul.querySelectorAll("li");
  if (lis.length === 0) {
    liFilter.style.display = "none";
    clearAllBtn.style.display = "none";
  } else {
    liFilter.style.display = "block";
    clearAllBtn.style.display = "block";
  }

  fromBtn.innerHTML = "<i class='fa-solid fa-plsu'></i> Add Item";
  fromBtn.style.backgroundColor = "#444";

  isEditMode = false;
}

// Initialize App

function init() {
  form.addEventListener("submit", onAddItemSubmit);
  ul.addEventListener("click", onClickItem);
  clearAllBtn.addEventListener("click", clearAllItems);
  liFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
