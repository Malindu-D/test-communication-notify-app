// HARDCODED API endpoint - bypassing environment variable
let apiBaseEndpoint = "https://test-dotnet-emailapi-fsbceeebbhg6bybf.southeastasia-01.azurewebsites.net";

console.log("✅ app.js loaded - Using hardcoded endpoint:", apiBaseEndpoint);

// DOM Elements
const emailForm = document.getElementById("emailForm");
const receiverEmailInput = document.getElementById("receiverEmail");
const sendEmailBtn = document.getElementById("sendEmailBtn");
const responseMessage = document.getElementById("responseMessage");

// Show ready message when page loads
window.addEventListener("DOMContentLoaded", () => {
  console.log("🎯 Page loaded and ready");
  showMessage("✅ Ready to send emails!", true);
});

// Handle form submission - Automatically appends /api/sendemail to base endpoint
emailForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("🔥 FORM SUBMITTED!");

  const receiverEmail = receiverEmailInput.value.trim();
  console.log("📧 Email input value:", receiverEmail);

  // Validation
  if (!receiverEmail || !isValidEmail(receiverEmail)) {
    console.error("❌ Invalid email:", receiverEmail);
    showMessage("Please enter a valid email address", false);
    return;
  }

  // Construct full API endpoint by appending /api/sendemail
  const emailEndpoint = `${apiBaseEndpoint}/api/sendemail`;

  console.log("🎯 Target endpoint:", emailEndpoint);

  // Disable form
  sendEmailBtn.disabled = true;
  sendEmailBtn.innerHTML = '<span class="spinner"></span> Sending Email...';
  responseMessage.innerHTML = "";

  try {
    console.log("📧 Sending POST request to:", emailEndpoint);
    console.log("📨 Payload:", { receiverEmail });

    const response = await fetch(emailEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        receiverEmail: receiverEmail,
      }),
    });

    console.log("📥 Response status:", response.status);

    const data = await response.json();
    console.log("📦 Response data:", data);

    if (response.ok && data.success) {
      showMessage(`✅ Success! Email sent to ${receiverEmail}`, true);
      emailForm.reset();
    } else {
      showMessage(`❌ Error: ${data.message || "Failed to send email"}`, false);
    }
  } catch (error) {
    console.error("❌ Email send error:", error);
    showMessage(
      "❌ Cannot connect to API. Please check connection and try again.",
      false
    );
  } finally {
    sendEmailBtn.disabled = false;
    sendEmailBtn.innerHTML = "Send Email Notification";
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(message, isSuccess) {
  responseMessage.innerHTML = `<div class="message ${
    isSuccess ? "success" : "error"
  }">${message}</div>`;

  if (isSuccess) {
    setTimeout(() => {
      responseMessage.innerHTML = "";
    }, 5000);
  }
}
