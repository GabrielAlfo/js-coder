const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');

let cart = [];
let totalPrice = 0;

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
    cartItem.textContent = `${product.name} - $${product.price}`;
    cartItems.appendChild(cartItem);

    totalPrice += product.price;
  });

  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

const phones = [
    { name: "iPhone", price: 899 },
    { name: "Samsung", price: 799 },
    { name: "Motorola", price: 699 },
    { name: "Alcatel", price: 969 },
    { name: "Xiaomi", price: 599 }
  ];
  
  // Track de Pedido
  function generateOrderNumber() {
    const orderNumber = Math.floor(Math.random() * 100000);
    document.getElementById("orderNumber").textContent = `Número de Pedido: ${orderNumber}`;

    localStorage.setItem("orderNumber", orderNumber);
  }
  
  // lista
  function displayPhones() {
    const phoneList = document.getElementById("phoneList");
    phones.forEach(phone => {
      const listItem = document.createElement("li");
      listItem.textContent = `${phone.name} - $${phone.price}`;
      phoneList.appendChild(listItem);
    });
  }
  
  function service() {
    const serviceType = document.getElementById("serviceType").value;
    const repairForm = document.getElementById("repairForm");
    const purchaseForm = document.getElementById("purchaseForm");
  
    if (serviceType === "repair") {
      repairForm.style.display = "block";
      purchaseForm.style.display = "none";
    } else if (serviceType === "purchase") {
      repairForm.style.display = "none";
      purchaseForm.style.display = "block";
      displayPhones();
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
    } else if (serviceType === "purchase") {
      console.log("Servicio de compra de teléfono solicitado");
    }
  });
  
  const orderNumber = localStorage.getItem("orderNumber");
  if (orderNumber) {
    document.getElementById("orderNumber").textContent = `Número de Pedido: ${orderNumber}`;
  }
  const b1 = document.getElementById("b1");
  b1.addEventListener("click", () =>{
    Swal.fire("Se añadio un procucto al carrito");
  });
  const b2 = document.getElementById("b2");
  b2.addEventListener("click", () =>{
    Swal.fire("Se añadio un procucto al carrito");
  });
  const b3 = document.getElementById("b3");
  b3.addEventListener("click", () =>{
    Swal.fire("Se añadio un procucto al carrito");
  });
  const b4 = document.getElementById("b4");
  b4.addEventListener("click", () =>{
    Swal.fire("Se añadio un procucto al carrito");
  });
  const b5 = document.getElementById("b5");
  b5.addEventListener("click", () =>{
    Swal.fire("Se añadio un procucto al carrito");
  });

  fetch('stock.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);

    const stockDataElement = document.getElementById('stockData');

    data.forEach(id => {
      const itemElement = document.createElement('div');
      itemElement.textContent = `Name: ${id.nombre}, Price: ${id.precio}`;
      stockDataElement.appendChild(itemElement);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });