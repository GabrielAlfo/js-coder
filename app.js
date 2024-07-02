
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