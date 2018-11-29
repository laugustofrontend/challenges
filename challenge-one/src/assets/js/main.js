const renderProducts = () => {
  const templateProduct = ({ name, image, price, effect, ingredients, alt = name }) => {
    return `
    <div class="products_item col-xs-6 col-lg-4">
        <a href="assets/images/products/${image}" class="lightbox"
          data-title="${name}"
          data-description="<h3>Use/Effect</h3> <br> ${effect}"
            data-type="image"
          >
            <img class="products_item_image" src="assets/images/products/${image}" alt="${alt}">
        </a>
        <p class="products_item_title">
            ${name} -
            <span class="products_item_price">$${price}</span>
        </p>
    </div>
    `;
  }

  const render = (potions) => {
    const _products = document.querySelector('.products');

    potions.map(potion => {
      _products.innerHTML += templateProduct(potion, 'title');
    });
  }

  axios.get('potions.json')
    .then(res => {
      const { potions } = res.data;

      render(potions);
    })
    .then(res => {
      const lightBox = GLightbox({
        selector: 'lightbox',
        descPosition: 'right'
      });
    });
}


renderProducts();
