// Global API base endpoint
let apiBaseEndpoint = "";

// DOM Elements
const emailForm = document.getElementById("emailForm");
const receiverEmailInput = document.getElementById("receiverEmail");
const sendEmailBtn = document.getElementById("sendEmailBtn");
const responseMessage = document.getElementById("responseMessage");

// Load configuration on page load
window.addEventListener("DOMContentLoaded", async () => {
  await loadConfig();
});

async function loadConfig() {
  try {
    console.log("🔄 Loading API base endpoint from Azure configuration...");

    // Get API base endpoint from Azure Static Web App environment variables
    const configResponse = await fetch("/api/config");

    console.log("📡 Config response status:", configResponse.status);

    if (configResponse.ok) {
      const config = await configResponse.json();
      console.log("📦 Config loaded:", config);

      apiBaseEndpoint = config.apiBaseEndpoint;

      if (apiBaseEndpoint) {
        console.log("✅ API base endpoint configured:", apiBaseEndpoint);
        showMessage(
          "✅ API endpoint loaded successfully. Ready to send emails!",
          true
        );
      } else {
        console.error(
          "❌ API_BASE_ENDPOINT not set in Azure environment variables"
        );
        showMessage(
          "❌ API endpoint not configured. Please set API_BASE_ENDPOINT in Azure Static Web App environment variables.",
          false
        );
      }
    } else {
      throw new Error(
        `Config endpoint returned status ${configResponse.status}`
      );
    }
  } catch (error) {
    console.error("❌ Configuration load error:", error);
    showMessage(
      "❌ Cannot load configuration. Please check your deployment.",
      false
    );
  }
}

// Handle form submission - Automatically appends /api/sendemail to base endpoint
emailForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const receiverEmail = receiverEmailInput.value.trim();

  // Validation
  if (!apiBaseEndpoint) {
    showMessage(
      "❌ API endpoint not configured. Please check Azure environment variables.",
      false
    );
    return;
  }

  if (!receiverEmail || !isValidEmail(receiverEmail)) {
    showMessage("Please enter a valid email address", false);
    return;
  }

  // Construct full API endpoint by appending /api/sendemail
  const emailEndpoint = `${apiBaseEndpoint}/api/sendemail`;

  // Disable form
  sendEmailBtn.disabled = true;
  sendEmailBtn.innerHTML = '<span class="spinner"></span> Sending Email...';
  responseMessage.innerHTML = "";

  try {
    console.log("📧 Sending email request to:", emailEndpoint);
    console.log("📨 Receiver email:", receiverEmail);
    console.log("📤 Request payload:", { receiverEmail });

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
    console.log("📥 Response headers:", response.headers);

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
