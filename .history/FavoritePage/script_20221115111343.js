window.addEventListener("click", function (event) {
    if (event.target.hasAttribute('src')) {
        const card = event.target.closest('.card')
        console.log(card)
    }
})