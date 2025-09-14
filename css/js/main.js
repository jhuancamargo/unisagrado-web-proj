// Adicione esta função no seu js/main.js
function showAddedFeedback(button) {
    const originalText = button.textContent;
    button.textContent = 'Adicionado!';
    button.disabled = true;
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 1500); // O botão volta ao normal depois de 1.5 segundos
}

// Dentro do evento de clique, chame a função assim:
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
        showAddedFeedback(button); // <-- Adicione esta linha
    });
});