const btn = document.querySelector('.calculation__btn');
btn.onclick = () => alert('You calculate it!');

const itemBlock = document.querySelector('.itemsBlock');
const itemLinks = document.querySelectorAll('.item__link');
const pictureParams = document.querySelector('.itemParams__picture');

itemBlock.addEventListener('click', changePicture);

function changePicture(event) {
  const target = event.target;
  if (target.className === 'item__link') {
    for (let i = 0; i < itemLinks.length; i++) {
      itemLinks[i].classList.remove('item__link_active');
      target.classList.add('item__link_active');
    }

    const setPicture = (path) => pictureParams.setAttribute('src', path);

    switch (target.id) {
      case 'link1':
        setPicture('bg/big_window/1_копия.png');
        break;
      case 'link2':
        setPicture('bg/big_window/2_копия.png');
        break;
      case 'link3':
        setPicture('bg/big_window/3_копия.png');
        break;
      case 'link4':
        setPicture('bg/big_window/4_копия.png');
        break;
      case 'link5':
        setPicture('bg/big_window/5.png');
        break;
      default:
        return target;
    }
  }
}