'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Offer alert event
    document.querySelector('.offer__alert-close').addEventListener('click', () => {
        document.querySelector('.offer__alert').classList.add('offer__alert-hide');
    })
});