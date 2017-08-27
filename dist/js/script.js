(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var container = document.getElementsByClassName('js-Smiley-container')[0];
var element = document.getElementsByClassName('js-Smiley')[0];
var containerDim = {
  height: container.getBoundingClientRect().height,
  width: container.getBoundingClientRect().width
};

var elementDiameter = element.offsetWidth;
var isMouseDown = false;
var diffX = void 0,
    diffY = void 0,
    mouseX = void 0,
    mouseY = void 0;

function moveElement(el, elX, elY) {
  el.style.left = elX + 'px';
  el.style.top = elY + 'px';
}

function mousedown(event) {
  isMouseDown = true;
  // smiley top and left coordinates relative to the container parent (x & y distance from closest relatively postioned parent)
  var elementX = element.offsetLeft;
  var elementY = element.offsetTop;
  // initial coordinates of mouse on mousedown, relative to the viewport
  mouseX = event.clientX;
  mouseY = event.clientY;

  diffX = mouseX - elementX;
  diffY = mouseY - elementY;
};

function mousemove(event) {
  if (!isMouseDown) {
    return;
  }
  // updated mouse cordinates on mousemove
  mouseX = event.clientX;
  mouseY = event.clientY;
  var newElementX = mouseX - diffX;
  var newElementY = mouseY - diffY;
  var newElementRight = newElementX + elementDiameter;
  var newElementBottom = newElementY + elementDiameter;

  if (newElementX < 0 || newElementY < 0 || newElementRight > containerDim.width || newElementBottom > containerDim.height) {
    if (newElementX < 0) {
      newElementX = 0;
    }
    if (newElementY < 0) {
      newElementY = 0;
    }
    if (newElementRight > containerDim.width) {
      newElementX = containerDim.width - elementDiameter;
    }
    if (newElementBottom > containerDim.height) {
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

},{}]},{},[1])
//# sourceMappingURL=main.js.map
