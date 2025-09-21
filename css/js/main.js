// O evento 'DOMContentLoaded' garante que nosso código só rodará depois que todo o HTML for carregado.
// Isso evita que o JavaScript tente encontrar um botão que ainda não existe na página.
document.addEventListener('DOMContentLoaded', () => {

    // --- PARTE 1: VARIÁVEIS E ELEMENTOS ---
    // Aqui, guardamos em "variáveis" os pedaços do HTML com os quais vamos interagir.
    // Pense nisso como dar apelidos aos elementos da página para chamá-los facilmente.

    let cart = []; // A "memória" do nosso carrinho. Começa como uma lista vazia.
    const addToCartButtons = document.querySelectorAll('.add-btn'); // Pega TODOS os botões de "Adicionar".
    const cartModalOverlay = document.getElementById('cart-modal-overlay'); // A parte cinza do fundo do modal.
    const openCartBtn = document.getElementById('open-cart-btn'); // O ícone da sacola no menu.
    const closeCartBtn = document.getElementById('close-cart-btn'); // O botão 'X' para fechar a sacola.
    const cartItemsContainer = document.getElementById('cart-items'); // A área onde os itens da sacola aparecem.
    const cartTotalEl = document.getElementById('cart-total'); // Onde mostramos o preço total.
    const cartCounterEl = document.getElementById('cart-counter'); // A bolinha vermelha com o número de itens.
    const checkoutBtn = document.getElementById('checkout-btn'); // O botão para ir para a página de pagamento.


    // --- PARTE 2: FUNÇÕES PRINCIPAIS ---
    // Funções são como "receitas" de ações que podemos executar várias vezes.

    /**
     * Função que dá um feedback visual no botão "Adicionar".
     */
    function showAddedFeedback(button) {
        const originalText = button.textContent;
        button.textContent = 'Adicionado!'; // Muda o texto do botão
        button.disabled = true; // Desabilita o botão temporariamente
        // Depois de 1.5 segundos, volta tudo ao normal.
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    }

    /**
     * Função que adiciona um produto ao carrinho (na nossa variável 'cart').
     */
    function addToCart(name, price) {
        // Primeiro, ele verifica se o item JÁ EXISTE na nossa lista 'cart'.
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            // Se já existe, ele apenas aumenta a quantidade.
            existingItem.quantity++;
        } else {
            // Se é um item novo, ele o adiciona na lista com quantidade 1.
            cart.push({ name, price, quantity: 1 });
        }

        // Depois de qualquer alteração, chamamos a função para atualizar a tela.
        updateCartDisplay();
    }

    /**
     * Função que atualiza TUDO que o usuário vê relacionado ao carrinho.
     */
    function updateCartDisplay() {
        // 1. Limpa a lista de itens na sacola para não exibir itens duplicados.
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        // 2. Se a lista 'cart' estiver vazia, mostra a mensagem.
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty-message">Sua sacola está vazia.</p>';
        } else {
            // 3. Se tiver itens, cria o HTML para cada um deles.
            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                // HTML que representa um item na sacola
                itemEl.innerHTML = `
                    <div class="cart-item-info">
                        <p>${item.name}</p>
                        <span>Qtd: ${item.quantity}</span>
                    </div>
                    <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
                `;
                cartItemsContainer.appendChild(itemEl);

                // 4. Soma os valores para o total.
                total += item.price * item.quantity;
                totalItems += item.quantity;
            });
        }

        // 5. Atualiza o texto do total e do contador no ícone da sacola.
        cartTotalEl.textContent = `R$ ${total.toFixed(2)}`;
        cartCounterEl.textContent = totalItems;
    }
    
    /**
     * Função que leva o usuário para a página de checkout.
     */
    function goToCheckout() {
        if (cart.length === 0) {
            alert('Sua sacola está vazia!');
            return; // Para a execução se o carrinho estiver vazio.
        }
        // Usa o 'localStorage' (memória do navegador) para guardar a sacola.
        // A outra página (`checkout.html`) vai ler essa informação de lá.
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        // Redireciona o usuário para a página de checkout.
        window.location.href = 'checkout.html';
    }


    // --- PARTE 3: EVENTOS (OUVINDO AS AÇÕES DO USUÁRIO) ---
    // Aqui, dizemos ao navegador para "ouvir" os cliques nos botões e executar uma função quando acontecer.

    // Para cada botão de "Adicionar" encontrado na página...
    addToCartButtons.forEach(button => {
        // ...adicione um "ouvinte" de clique.
        button.addEventListener('click', () => {
            // Quando o botão for clicado:  
            const name = button.getAttribute('data-name'); // Pega o nome do produto do atributo 'data-name'.
            const price = parseFloat(button.getAttribute('data-price')); // Pega o preço.
            
            addToCart(name, price); // Chama a função para adicionar ao carrinho.
            showAddedFeedback(button); // Chama a função para dar o feedback visual.
        });
    });

    // Adiciona o ouvinte para abrir a sacola.
    openCartBtn.addEventListener('click', () => cartModalOverlay.classList.add('visible'));
    // Adiciona o ouvinte para fechar a sacola no 'X'.
    closeCartBtn.addEventListener('click', () => cartModalOverlay.classList.remove('visible'));
    // Adiciona o ouvinte para fechar a sacola clicando fora dela.
    cartModalOverlay.addEventListener('click', (event) => {
        if (event.target === cartModalOverlay) {
            cartModalOverlay.classList.remove('visible');
        }
    });
    
    // Adiciona o ouvinte para o botão de "Finalizar Compra".
    checkoutBtn.addEventListener('click', goToCheckout);
});