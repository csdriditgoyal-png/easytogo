let selectedPackage = {
  name: "Tropical Paradise",
  price: 99999
};

let discount = 0;

const cards = document.querySelectorAll(".card");
const travelersInput = document.getElementById("travelers");
const packageName = document.getElementById("packageName");
const calc = document.getElementById("calc");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const confirmBtn = document.getElementById("confirmBtn");

// Update price summary
function updateSummary() {
  const travelers = Number(travelersInput.value);
  const subtotal = selectedPackage.price * travelers;
  const total = subtotal - subtotal * discount;

  packageName.textContent = selectedPackage.name;
  calc.textContent = `₹${selectedPackage.price.toLocaleString()} × ${travelers}`;
  subtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
  totalEl.textContent = `₹${total.toLocaleString()}`;
  confirmBtn.textContent = `Confirm – ₹${total.toLocaleString()}`;
}

// Handle package selection
cards.forEach(card => {
  const btn = card.querySelector(".select-btn");

  btn.addEventListener("click", () => {
    cards.forEach(c => {
      c.classList.remove("selected");
      c.querySelector(".select-btn").textContent = "Select";
    });

    card.classList.add("selected");
    btn.textContent = "Selected";

    selectedPackage.name = card.dataset.name;
    selectedPackage.price = Number(card.dataset.price);
    discount = 0;

    updateSummary();
  });
});

// Travelers change
travelersInput.addEventListener("input", updateSummary);

// Apply discount
document.getElementById("applyBtn").addEventListener("click", () => {
  const code = document.getElementById("coupon").value.toUpperCase();

  if (code === "SAVE10") discount = 0.10;
  else if (code === "SAVE20") discount = 0.20;
  else if (code === "WINTER25") discount = 0.25;
  else discount = 0;

  updateSummary();
});

// Confirm booking
confirmBtn.addEventListener("click", () => {
  alert(
    `Booking Confirmed!\n\nPackage: ${selectedPackage.name}\nTotal: ${totalEl.textContent}`
  );
});

// Initial load
updateSummary();
