import items from "./item.js";

let itemsContainer = document.querySelector(".items");
let previewContainer = document.querySelector(".preview");

/**
 * Format the title 
 * @param {HTMLParagraphElement} element
 */

function formatTitle(element,availableWidth) {

  let elementWidth = element.clientWidth;

  const title = element.textContent,
        titleLength = title.length,
        mid = titleLength / 2;

  let distance = 1;

  while (elementWidth >= availableWidth) {

    let newTitle = title.slice(0, mid - distance + 1) + "..." + title.slice(mid + distance);
    element.innerHTML = newTitle;
    elementWidth = element.clientWidth;
    distance++;
  }
}

/**
 * @param {Number} index Index which to preview
 */

function updatePreview(index) {
  let imageLink = items[index].previewImage;
  let imageTitle = items[index].title;

  let preview = `
          <img class="preview-image" src=${imageLink}>
          <p class="preview-title">${imageTitle}</p>
      `;
  previewContainer.innerHTML = preview;
}

function getHorizontalMargin(element){
  
  let style = window.getComputedStyle(element)
  let padding = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  return padding

}

function getHorizontalPadding(element){

  let style = window.getComputedStyle(element)
  let padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  return padding
}

function generateItemList() {
  items.forEach((item, index) => {

    //Creating Image Element
    let itemImage = document.createElement("img");
    itemImage.classList.add("item-image");
    itemImage.setAttribute("src", item.previewImage);

    //Creating Title Element
    let itemTitle = document.createElement("p");
    itemTitle.classList.add("item-text");
    itemTitle.innerHTML = item.title;

    // Creating Item Container 
    let itemNode = document.createElement("div");
    itemNode.setAttribute("id", index);
    itemNode.classList.add("item-container");
    itemNode.appendChild(itemImage);
    itemNode.appendChild(itemTitle);
    itemsContainer.appendChild(itemNode);


    const itemContentWidth = itemNode.clientWidth - getHorizontalPadding(itemNode) - itemImage.clientWidth
    const availableWidth = itemContentWidth - getHorizontalMargin(itemTitle)
    
    formatTitle(itemTitle,availableWidth);

    // Setting item at 0th index as default selected
    if (index == 0) {
      updatePreview(0);
      itemNode.classList.add("selected");
    }

    itemNode.addEventListener("click", () => {
      let prevSelectedItem = document.querySelector(".item-container.selected");

      if (prevSelectedItem != null)
        prevSelectedItem.classList.remove("selected");

      itemNode.classList.add("selected");
      updatePreview(index);
    });
  });
}

document.addEventListener("keyup", (event) => {
  let selectedItem = document.querySelector(".item-container.selected");
  let newSelectedItem = null;

  switch (event.key) {
    case "ArrowUp":
      newSelectedItem = selectedItem.previousElementSibling;
      break;

    case "ArrowDown":
      newSelectedItem = selectedItem.nextElementSibling;
      break;

    default:
      return;
  }

  // If there are no more element in the button direction
  if (newSelectedItem === null) return;

  selectedItem.classList.remove("selected");
  newSelectedItem.classList.add("selected");

  let newSelectedIndex = newSelectedItem.getAttribute("id");

  updatePreview(newSelectedIndex);
});

generateItemList();
