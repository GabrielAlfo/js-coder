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
    mostrarCarrito();
  }
  function deleteToCart(index) {
    cart.splice(index, 1);
    mostrarCarrito();
  }

  function mostrarCarrito() {
    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = '';
  
    let total = 0;
  
    for (let i = 0; i < cart.length; i++) {
      const producto = cart[i];
  
      const productoElement = document.createElement('div');
      productoElement.textContent = `${producto.nombre} - $${producto.precio}`;
  
      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.addEventListener('click', () => {
        deleteToCart(i)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Elemento eliminado Correctamente",
          showConfirmButton: false,
          timer: 1500
        });
      });
  
      productoElement.appendChild(botonEliminar);
      carritoElement.appendChild(productoElement);
  
      total += producto.precio;
    }
  
    const totalElement = document.createElement('div');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    carritoElement.appendChild(totalElement);
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
  