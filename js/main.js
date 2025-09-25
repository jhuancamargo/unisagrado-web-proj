// O evento 'DOMContentLoaded' garante que nosso código só rodará depois que todo o HTML for carregado.
// Isso evita que o JavaScript tente encontrar um botão que ainda não existe na página.
document.addEventListener('DOMContentLoaded', () => {

    // SISTEMA DE TRADUÇÃO (adicionar no início do DOMContentLoaded)
const translations = {
    pt: {
        "navbar.title": "Cantina & Store",
        "highlights.title": "Destaques do Dia",
        "highlights.item1.name": "Combo Lanche + Fritas",
        "highlights.item2.name": "Caderno Oficial ADS",
        "menu.title": "Nosso Cardápio",
        "menu.categories.food": "Para Comer",
        "menu.categories.drinks": "Para Beber", 
        "menu.categories.materials": "Store | Materiais",
        "menu.items.coxinha.name": "Coxinha de Frango",
        "menu.items.coxinha.description": "A melhor da região!",
        "button.add": "Adicionar",
        "button.added": "Adicionado!",
        "cart.title": "Sua Sacola",
        "cart.empty": "Sua sacola está vazia.",
        "cart.total": "Total:",
        "button.checkout": "Finalizar Compra"
    },
    en: {
        "navbar.title": "Cafeteria & Store",
        "highlights.title": "Today's Highlights",
                "highlights.item1.name": "Combo: Burger + Fries", 
        "highlights.item2.name": "Official ADS Notebook",
        "menu.title": "Our Menu",
        "menu.categories.food": "Food",
        "menu.categories.drinks": "Drinks",
        "menu.categories.materials": "Store | Materials",
        "menu.items.coxinha.name": "Chicken Coxinha",
        "menu.items.coxinha.description": "The best in town!",
        "menu.items.paoqueijo.name": "Cheese Bread",
        "menu.items.paoqueijo.description": "Warm and delicious.",
        "menu.items.brownie.name": "Chocolate Brownie", 
        "menu.items.brownie.description": "With chocolate chips.",
        "menu.items.soda.name": "Soda Can",
        "menu.items.soda.description": "Coke, Guarana, etc.",
        "menu.items.juice.name": "Natural Juice 300ml",
        "menu.items.juice.description": "Orange or Pineapple.",
        "menu.items.coffee.name": "Espresso Coffee",
        "menu.items.coffee.description": "For that energy boost!",
        "menu.items.pen.name": "UNISAGRADO Pen",
        "menu.items.pen.description": "Blue or black ink.",
        "menu.items.thermos.name": "Thermos Cup 450ml", 
        "menu.items.thermos.description": "Maintains temperature.",
        "button.add": "Add to Cart",
        "button.added": "Added!",
        "cart.title": "Your Cart",
        "cart.empty": "Your cart is empty.",
        "cart.total": "Total:",
        "button.checkout": "Checkout"
    },
    es: {
        "navbar.title": "Cafetería & Tienda", 
        "highlights.title": "Destacados del Día",
        "highlights.item1.name": "Combo Hamburguesa + Papas",
        "highlights.item2.name": "Cuaderno Oficial ADS", 
        "menu.title": "Nuestro Menú",
        "menu.categories.food": "Comida",
        "menu.categories.drinks": "Bebidas",
        "menu.categories.materials": "Tienda | Materiales",
        "menu.items.coxinha.name": "Coxinha de Pollo",
        "menu.items.coxinha.description": "¡La mejor de la región!",
        "menu.items.paoqueijo.name": "Pan de Queso",
        "menu.items.paoqueijo.description": "Calentito y delicioso.",
        "menu.items.brownie.name": "Brownie de Chocolate",
        "menu.items.brownie.description": "Con chispas de chocolate.",
        "menu.items.soda.name": "Refresco en Lata",
        "menu.items.soda.description": "Coca-Cola, Guaraná, etc.",
        "menu.items.juice.name": "Jugo Natural 300ml",
        "menu.items.juice.description": "Naranja o Piña.",
        "menu.items.coffee.name": "Café Expreso",
        "menu.items.coffee.description": "¡Para darte energía!",
        "menu.items.pen.name": "Bolígrafo UNISAGRADO",
        "menu.items.pen.description": "Tinta azul o negra.",
        "menu.items.thermos.name": "Taza Térmica 450ml",
        "menu.items.thermos.description": "Mantiene la temperatura.",
        "button.add": "Añadir",
        "button.added": "¡Añadido!",
        "cart.title": "Tu Bolsa", 
        "cart.empty": "Tu bolsa está vacía.",
        "cart.total": "Total:",
        "button.checkout": "Finalizar Compra"
    }
};

function applyTranslation(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    localStorage.setItem('preferredLanguage', lang);
}

// DENTRO do DOMContentLoaded, após as variáveis:
const savedLang = localStorage.getItem('preferredLanguage') || 'pt';
applyTranslation(savedLang);

document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        applyTranslation(lang);
    });
});

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