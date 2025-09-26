'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Creating first promise

  const firstPromise = new Promise((resolve, reject) => {
    function onMouseDown(e) {
      if (e.button === 0) {
        clearTimeout(timer);

        document.removeEventListener('mousedown', onMouseDown);

        resolve('First promise was resolved');
      }
    }

    const timer = setTimeout(() => {
      document.removeEventListener('mousedown', onMouseDown);

      reject('First promise was rejected');
    }, 3000);

    document.addEventListener('mousedown', onMouseDown);
  });

  firstPromise
    .then((value) => {
      creatingNotification(value, 'success');
    })
    .catch((error) => {
      creatingNotification(error, 'error');
    });

  // Creating second promise

  const secondPromise = new Promise((resolve) => {
    document.addEventListener(
      'mousedown',
      (e) => {
        if (e.button === 0 || e.button === 2) {
          resolve('Second promise was resolved');
        }
      },
      { once: true },
    );
  });

  secondPromise.then((value) => {
    creatingNotification(value, 'success');
  });

  // Creating third promise

  const thirdPromise = new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    document.addEventListener(
      'click',
      () => {
        leftClick = true;

        buttonsWasClicked();
      },
      { once: true },
    );

    document.addEventListener(
      'contextmenu',
      (e) => {
        e.preventDefault();

        rightClick = true;

        buttonsWasClicked();
      },
      { once: true },
    );

    function buttonsWasClicked() {
      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    }
  });

  thirdPromise.then((value) => {
    creatingNotification(value, 'success');
  });

  // Creating notification for Promisses

  function creatingNotification(text, type) {
    const div = document.createElement('div');

    div.classList.add('message', type);
    div.setAttribute('data-qa', 'notification');
    div.textContent = text;

    document.body.append(div);
  }
});
