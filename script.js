const mobileButton = document.querySelector('.cmn-toggle-switch');
const mobileMenu = document.querySelector('.mobile_menu');

mobileButton.addEventListener('click', () => {
    if (mobileButton.classList.contains('active')) {
        mobileButton.classList.remove('active');
        mobileMenu.classList.add('d-none');
    } else {
        mobileButton.classList.add('active');
        mobileMenu.classList.remove('d-none');
    }
});