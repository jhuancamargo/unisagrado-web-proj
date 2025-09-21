document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const summaryItemsContainer = document.getElementById('summary-items');
    const summaryTotalEl = document.getElementById('summary-total');
    const payBtn = document.querySelector('.pay-btn');
    const confirmationOverlay = document.getElementById('confirmation-overlay');

    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function renderSummary() {
        summaryItemsContainer.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            summaryItemsContainer.innerHTML = '<p>Sua sacola de compras está vazia. <a href="index.html">Voltar ao cardápio</a>.</p>';
            payBtn.disabled = true;
        } else {
            payBtn.disabled = false;
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

    function updateItem(index, action) {
        if (index > -1 && index < cart.length) {
            switch (action) {
                case 'increase':
                    cart[index].quantity++;
                    break;
                case 'decrease':
                    cart[index].quantity--;
                    if (cart[index].quantity === 0) {
                        cart.splice(index, 1);
                    }
                    break;
                case 'remove':
                    cart.splice(index, 1);
                    break;
            }
            saveCart();
            renderSummary();
        }
    }

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

    payBtn.addEventListener('click', (event) => {
        event.preventDefault();
        confirmationOverlay.classList.add('visible');
        localStorage.removeItem('shoppingCart');
    });

    renderSummary();
});