window.addEventListener("click", function (event) {
    if (event.target.hasAttribute('src')) {
        const card = event.target.closest('.card')
        
        const productInfo = {
            id: card.dataset
        }

    }
})