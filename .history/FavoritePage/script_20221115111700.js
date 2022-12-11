window.addEventListener("click", function (event) {
    if (event.target.hasAttribute('src')) {
        const card = event.target.closest('.card')
        
        const productInfo = {
            id: card.dataset.id
             name: result.name,
      image: result.sprites.other["official-artwork"].front_default,
      weight: result.weight,
      id: result.id,
        }

        console.log(productInfo)
    }
})