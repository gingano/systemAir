"use strict"

const menuBg = document.querySelector('.menu-bg');
const nav = document.querySelector('.nav');
const navMenu = document.querySelector('.nav-menu');
const navCheckbox = document.querySelector('.nav-checkbox');
const listItems = document.querySelectorAll('.list-item');
let counter = {};

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: top,
    left: left
  };
};