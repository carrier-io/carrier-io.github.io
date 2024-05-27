const mobileButton = document.querySelector('.cmn-toggle-switch');
const mobileMenu = document.querySelector('.mobile_menu');

mobileButton.addEventListener('click', () => {
    if (mobileButton.classList.contains('active')) {
        mobileButton.classList.remove('active');
        mobileMenu.classList.add('d-none');
    } else {
        mobileButton.classList.add('active');
        mobileMenu.classList.remove('d-none');
        const menuItems = document.querySelectorAll('.sub-dropdown-item');
        menuItems.forEach(item => {
          console.log(item)
          item.addEventListener('click', () => {
            console.log(1)
            mobileButton.classList.remove('active');
            mobileMenu.classList.add('d-none');
          })
        })
    }
});
