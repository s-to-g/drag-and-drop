const container = document.getElementsByClassName('js-Smiley-container')[0];
const element = document.getElementsByClassName('js-Smiley')[0];
let containerDim = {
  height: container.getBoundingClientRect().height,
  width: container.getBoundingClientRect().width
}

let elementDiameter = element.offsetWidth;
let isMouseDown = false;
let diffX, diffY, mouseX, mouseY;

function moveElement(el, elX, elY) {
  el.style.left = `${elX}px`;
  el.style.top = `${elY}px`;
}

function mousedown(event) {
  isMouseDown = true;
  // smiley top and left coordinates relative to the container parent (x & y distance from closest relatively postioned parent)
  let elementX = element.offsetLeft;
  let elementY = element.offsetTop;
  // initial coordinates of mouse on mousedown, relative to the viewport
  mouseX = event.clientX;
  mouseY = event.clientY;

  diffX = mouseX - elementX;
  diffY = mouseY - elementY;
};

function mousemove(event) {
  if(!isMouseDown) { return; }
  // updated mouse cordinates on mousemove
  mouseX = event.clientX;
  mouseY = event.clientY;
  let newElementX = mouseX - diffX;
  let newElementY = mouseY - diffY;
  let newElementRight = newElementX + elementDiameter;
  let newElementBottom = newElementY + elementDiameter;

  if(newElementX < 0 || newElementY < 0 || newElementRight > containerDim.width || newElementBottom > containerDim.height) {
    if(newElementX < 0) {
       newElementX = 0;
    }
    if(newElementY < 0) {
      newElementY = 0;
    }
    if(newElementRight > containerDim.width) {
      newElementX = containerDim.width - elementDiameter;
    }
    if(newElementBottom > containerDim.height) {
      newElementY = containerDim.height - elementDiameter;
    }
    element.classList.add('is-on-border');
  } else {
    element.classList.remove('is-on-border');
  }

  moveElement(element, newElementX, newElementY);
};

function mouseup() {
  isMouseDown = false;
}

element.addEventListener('mousedown', mousedown);
// eventListener on document instead of element. If you drag it outside of the container, it still follows
document.addEventListener('mousemove', mousemove);
// eventListener on document instead of element. If you drag it outside of the container and drop, the event still fires
document.addEventListener('mouseup', mouseup);
