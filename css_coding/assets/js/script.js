// ===== ENQUIRY FORM VALIDATION (FINAL FIXED VERSION) =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiryForm");
  const cancelBtn = document.getElementById("cancelBtn");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Lấy giá trị người dùng nhập
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const category = document.getElementById("category").value;
    const message = document.getElementById("message").value.trim();
    const contactMethod = document.querySelector('input[name="method"]:checked');

    let isValid = true;

    // Reset lỗi
    document.querySelectorAll(".input-group").forEach((group) => {
      group.classList.remove("has-error");
      const error = group.querySelector(".error-text");
      if (error) error.textContent = "";
    });

    // ==== Kiểm tra từng trường ====
    if (fullname === "") {
      showError("fullname", "error-fullname", "Full Name is required");
      isValid = false;
    }

    if (email === "") {
      showError("email", "error-email", "Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("email", "error-email", "Enter a valid email format");
      isValid = false;
    }

    if (contact === "") {
      showError("contact", "error-contact", "Contact Number is required");
      isValid = false;
    } else if (!/^\+?\d{8,15}$/.test(contact)) {
      showError("contact", "error-contact", "Enter a valid phone number");
      isValid = false;
    }

    if (!category) {
      showError("category", "error-category", "Please select a category");
      isValid = false;
    }

    if (!contactMethod) {
      document.getElementById("error-method").textContent =
        "Please select a contact method";
      isValid = false;
    }

    if (message === "") {
      showError("message", "error-message", "Message is required");
      isValid = false;
    }

    // ===== Nếu thiếu dữ liệu: hiện cảnh báo (giống hình 3) =====
    if (!isValid) {
      alert("PLEASE ENTER THE VALUES!");
      return;
    }

    // ===== Nếu hợp lệ: hiện bảng thông báo (giống hình 1) =====
    alert(
      `Congratulations...!!\n\n` +
        `Name : ${fullname}\n` +
        `Email : ${email}\n` +
        `Contact Number : ${contact}\n` +
        `Category of Enquiry : ${category}\n` +
        `Preferred Method : ${contactMethod.value}\n` +
        `Message : ${message}`
    );

    form.reset();
  });

  // ===== Xử lý nút Cancel (giống hình 4) =====
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const confirmCancel = confirm(
      "Are you sure you want to cancel? All entered data will be lost."
    );
    if (confirmCancel) {
      form.reset();
      document.querySelectorAll(".input-group").forEach((group) => {
        group.classList.remove("has-error");
        const error = group.querySelector(".error-text");
        if (error) error.textContent = "";
      });
    }
  });

  // ==== Hàm hiển thị lỗi ====
  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const group = input.closest(".input-group");
    const error = document.getElementById(errorId);
    if (group && error) {
      group.classList.add("has-error");
      error.textContent = message;
    }
  }
});
