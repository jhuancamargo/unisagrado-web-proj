document.addEventListener('DOMContentLoaded', () => {
    // Carrega o carrinho do localStorage ou cria um vazio
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const summaryItemsContainer = document.getElementById('summary-items');
    const summaryTotalEl = document.getElementById('summary-total');
    const checkoutPayment = document.querySelector('.checkout-payment');

    // Função para salvar o carrinho no localStorage
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Função principal que desenha a sacola na tela
    function renderSummary() {
        summaryItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            summaryItemsContainer.innerHTML = '<p>Sua sacola de compras está vazia. <a href="index.html">Voltar ao cardápio</a>.</p>';
            if(checkoutPayment) checkoutPayment.style.display = 'none';
        } else {
            cart.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.className = 'summary-item';
                itemEl.innerHTML = `
                    <div class="summary-item-details">
                        <p>${item.name}</p>
                        <span>R$ ${item.price.toFixed(2)}</span>
                    </div>
                    <div class="summary-item-controls">
                        <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                        <button class="remove-item-checkout" data-index="${index}"><i class="ph ph-trash"></i></button>
                    </div>
                `;
                summaryItemsContainer.appendChild(itemEl);
                total += item.price * item.quantity;
            });
        }
        summaryTotalEl.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Função para ajustar a quantidade ou remover itens
    function updateItem(index, action) {
        if (index > -1 && index < cart.length) {
            switch (action) {
                case 'increase':
                    cart[index].quantity++;
                    break;
                case 'decrease':
                    cart[index].quantity--;
                    if (cart[index].quantity === 0) {
                        cart.splice(index, 1); // Remove se a quantidade for 0
                    }
                    break;
                case 'remove':
                    cart.splice(index, 1);
                    break;
            }
            saveCart();
            renderSummary(); // Re-desenha a sacola com os novos dados
        }
    }

    // Adiciona os eventos de clique para os botões de controle da sacola
    summaryItemsContainer.addEventListener('click', (event) => {
        const target = event.target.closest('button');
        if (!target) return;

        const index = parseInt(target.dataset.index);
        
        if (target.classList.contains('quantity-btn')) {
            const action = target.dataset.action;
            updateItem(index, action);
        } else if (target.classList.contains('remove-item-checkout')) {
            updateItem(index, 'remove');
        }
    });

    // Desenha a sacola na tela assim que a página carrega
    renderSummary();
});