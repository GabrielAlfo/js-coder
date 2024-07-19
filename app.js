const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsBody = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');


let cart = [];
let totalPrice = 0;

fetch('stock.json')
  .then(response => response.json())
  .then(data => {
    const productContainer = document.querySelector('.products');

    data.forEach(product => {
  
      const productElement = document.createElement('div');
      productElement.classList.add('products');


      const productImage = document.createElement('img');
      productImage.src = product.imagen;
      productImage.alt = 'Product Image';
      productElement.appendChild(productImage);

      const productTitle = document.createElement('h3');
      productTitle.textContent = product.nombre;
      productElement.appendChild(productTitle);


      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.precio}`;
      productElement.appendChild(productPrice);

      const productDsc = document.createElement('p');
      productDsc.textContent = `${product.descripcion}`;
      productElement.appendChild(productDsc);

      const addToCartButton = document.createElement('button');
      addToCartButton.classList.add('add-to-cart');
      addToCartButton.textContent = 'Añadir al Carrito';
      addToCartButton.addEventListener('click', () => {
        addToCart(product)
        Swal.fire("Se añadio un producto al carrito");
    });
      
      productElement.appendChild(addToCartButton);
      productContainer.appendChild(productElement);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  function addToCart(product) {
    cart.push(product);
    console.log('Producto agregado al carrito:', product);
  }
  function removeFromCart(product) {
    cart = cart.filter(item => item !== product);
    console.log('Producto eliminado del carrito:', product);
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const product = {
        name: button.previousElementSibling.previousElementSibling.textContent,
        price: parseFloat(button.previousElementSibling.textContent.slice(1))
      };
  
      cart.push(product);
      updateCart();
    });
  });
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }
  
  function updateCart() {
    cartItems.innerHTML = '';
    totalPrice = 0;
    cart.forEach(product => {
      const cartItem = document.createElement('div');
      const cartbtn = document.createElement('button');
      cartItem.textContent = `${product.nombre} - $${product.precio}`;
      cartItems.appendChild(cartItem);
  
      totalPrice += product.price;
    });
  
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }
  

  
  // Track de Pedido
  function generateOrderNumber() {
    const orderNumber = Math.floor(Math.random() * 100000);
    document.getElementById("orderNumber").textContent = `Número de Pedido: ${orderNumber}`;

    localStorage.setItem("orderNumber", orderNumber);
  }
  
    
  function service() {
    const serviceType = document.getElementById("serviceType").value;
     const purchaseForm = document.getElementById("purchaseForm");
  
    if (serviceType === "repair") {
      repairForm.style.display = "block";
      purchaseForm.style.display = "none";
    } else {
      repairForm.style.display = "none";
      purchaseForm.style.display = "none";
    }
  }
  
  document.getElementById("serviceType").addEventListener("change", service);
  
  document.getElementById("serviceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const serviceType = document.getElementById("serviceType").value;
    if (serviceType === "repair") {
      const problemDescription = document.getElementById("problemDescription").value;
      console.log("Servicio de reparación solicitado:", problemDescription);
    } 
  });
  
  const orderNumber = localStorage.getItem("orderNumber");
  if (orderNumber) {
    document.getElementById("orderNumber").textContent = `Número de Pedido: ${orderNumber}`;
  }
  