"use strict"

let menuBgResize = function (bg, padding = 30) {
  bg.style.height = navMenu.clientHeight + padding + 'px';
}

menuBgResize(menuBg);

window.addEventListener('resize', function () {
  menuBgResize(menuBg, 0);
})

navCheckbox.addEventListener('change', function () {
  if (navCheckbox.checked) {
    menuBg.style.visibility = 'visible';
    menuBg.style.opacity = '1';
  } else {
    menuBg.style.visibility = 'hidden';
    menuBg.style.opacity = '0';
  }
})

if (document.documentElement.clientWidth < 1200) {
  listItems.forEach(function (item) {
    let arrow = item.querySelector('.item-arrow');
    if (item.children.length > 1) {
      item.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (event.target.parentElement.querySelector('.menu-list') !== null) {
          if ([...event.target.parentElement.querySelector('.menu-list').classList].includes('second') &&
            ![...event.target.classList].includes('item-arrow')) {
            event.target.parentElement.querySelector('.second').classList.add('active');
            arrow.classList.add('item-arrow-active');

            if (counter[event.target.innerText + 'IsActive'] === undefined ||
              counter[event.target.innerText + 'IsActive'] === false) {
              counter[event.target.innerText + 'IsActive'] = true;
            } else {
              window.location = event.target.href;
            }
          } else if ([...event.target.parentElement.querySelector('.menu-list').classList].includes('third') &&
            ![...event.target.classList].includes('item-arrow')) {
            event.target.parentElement.querySelector('.third').classList.add('active');
            arrow.classList.add('item-arrow-active');

            if (counter[event.target.innerText + 'IsActive'] === undefined ||
              counter[event.target.innerText + 'IsActive'] === false) {
              counter[event.target.innerText + 'IsActive'] = true;
            } else {
              window.location = event.target.href;
            }
          } else if ([...event.target.classList].includes('item-arrow')) {
            arrow.classList.remove('item-arrow-active');
            if (event.target.parentElement.querySelector('.second') !== null) {
              event.target.parentElement.querySelector('.second').classList.remove('active');
            } else if (event.target.parentElement.querySelector('.third') !== null) {
              event.target.parentElement.querySelector('.third').classList.remove('active');
            }
            counter[event.target.parentElement.querySelector('a').innerText + 'IsActive'] = false;
          }
        } else {
          window.location = event.target.href;
        }

        menuBgResize(menuBg, 0)
      })
    } else {
      item.classList.add('just-link');
    }
  })
}