// Elements
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotOptions = document.getElementById('chatbot-options');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotGeneralInput = document.getElementById('chatbot-general-input');
const chatbotGeneralSend = document.getElementById('chatbot-general-send');

// Show Chatbot
chatbotIcon.addEventListener('click', () => {
    chatbotWindow.style.display = 'block';
    displayGreeting();
});

// Hide Chatbot
chatbotClose.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});

// Display Timely Greeting
function displayGreeting() {
    const currentHour = new Date().getHours();
    let greeting = 'Hello! How can I assist you today?';

    if (currentHour < 12) {
        greeting = 'Good Morning! How can I assist you today?';
    } else if (currentHour < 18) {
        greeting = 'Good Afternoon! How can I assist you today?';
    } else {
        greeting = 'Good Evening! How can I assist you today?';
    }

    clearChat();
    appendMessage('Bot', greeting);
    displayOptions();
}

// Clear Chat History and Append Main Menu Button
function clearChat() {
    chatbotMessages.innerHTML = '';
    chatbotInput.value = '';
    document.getElementById('chatbot-input-container').style.display = 'none';
}

// Display Main Menu Button
function displayMainMenu() {
    clearChat();
    appendMessage('Bot', 'Returning to the main menu...');
    displayOptions();
}

// Display Initial Options
function displayOptions() {
    chatbotOptions.innerHTML = `
        <button class="btn btn-primary" onclick="searchProduct()">Search a Product</button>
        <button class="btn btn-secondary" onclick="bookProduct()">Book Your Product</button>
        <button class="btn btn-info" onclick="trackOrder()">Track Your Order/Booking</button>
    `;
}

// Append Message to Chat Window
function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;  // Scroll to the bottom
}

// Append Message with Personalized Tone
function appendToneMessage(sender, message, toneClass) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> <span class="${toneClass}">${message}</span>`;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Search Product Option
function searchProduct() {
    clearChat();
    appendMessage('Bot', 'Please provide the product title or details.');
    chatbotInput.placeholder = 'Enter product title';
    document.getElementById('chatbot-input-container').style.display = 'flex';

    chatbotSend.onclick = () => {
        const userInput = chatbotInput.value.trim();
        if (userInput) {
            appendMessage('User', userInput);
            chatbotInput.value = '';
            displayProductInfo(userInput);
        }
    };
}

// Display Product Info
function displayProductInfo(product) {
    appendMessage('Bot', `Product Name: ${product} Scented Candle\nDescription: "A soothing blend of ${product} and vanilla, perfect for relaxation."\nSKU: CNDL0134\nPrice: $25.99`);
    chatbotOptions.innerHTML = `
        <button class="btn btn-success" onclick="bookProduct('${product}', 'CNDL0134')">Book Now</button>
        <button class="btn btn-warning" onclick="displayMainMenu()">Main Menu</button>
    `;
}

// Book Product Option
function bookProduct(product = '', sku = '') {
    clearChat();
    appendMessage('Bot', 'Select a platform to book your product:');
    chatbotOptions.innerHTML = `
        <button class="btn btn-primary" onclick="selectPlatform('Shopify', '${sku}')">Shopify</button>
        <button class="btn btn-secondary" onclick="selectPlatform('WooCommerce', '${sku}')">WooCommerce</button>
        <button class="btn btn-info" onclick="selectPlatform('Calendly', '${sku}')">Calendly</button>
    `;
}

// Select Platform for Booking
function selectPlatform(platform, sku) {
    clearChat();
    appendMessage('Bot', `Selected platform: ${platform}`);
    appendMessage('Bot', 'Enter the SKU Code of the product you\'d like to book.');

    chatbotInput.placeholder = 'Enter SKU Code';
    document.getElementById('chatbot-input-container').style.display = 'flex';
    chatbotInput.value = sku; // Autofill if available

    chatbotSend.onclick = () => {
        const skuCode = chatbotInput.value.trim();
        if (skuCode) {
            appendMessage('User', skuCode);
            chatbotInput.value = '';
            confirmBooking(skuCode);
        }
    };
}

// Confirm Booking
function confirmBooking(sku) {
    appendMessage('Bot', `You have successfully booked the product. This is your Track ID: PROD0743. Use it to track your order.`);
    chatbotOptions.innerHTML = `
        <button class="btn btn-warning" onclick="displayMainMenu()">Main Menu</button>
    `;
}

// Track Order Option
function trackOrder() {
    clearChat();
    appendMessage('Bot', 'Enter your Track ID to check the status of your order.');

    chatbotInput.placeholder = 'Enter Track ID';
    document.getElementById('chatbot-input-container').style.display = 'flex';

    chatbotSend.onclick = () => {
        const trackId = chatbotInput.value.trim();
        if (trackId) {
            appendMessage('User', trackId);
            chatbotInput.value = '';
            displayOrderStatus(trackId);
        }
    };
}

// Display Order Status
function displayOrderStatus(trackId) {
    appendMessage('Bot', `Your order is currently: On The Way.`);
    chatbotOptions.innerHTML = `
        <button class="btn btn-warning" onclick="displayMainMenu()">Main Menu</button>
    `;
}

// Tone Personalization
chatbotGeneralInput.addEventListener('keyup', () => {
    const userInput = chatbotGeneralInput.value.toLowerCase();
    if (userInput.includes('please') || userInput.includes('thank')) {
        appendToneMessage('Bot', 'I see you are being formal. How may I assist you further?', 'formal-response');
    } else if (userInput.includes('hey') || userInput.includes('yo')) {
        appendToneMessage('Bot', 'Hey! Got it, let me check that for you!', 'casual-response');
    }
});

// Live Agent Handoff (for demo)
chatbotGeneralSend.onclick = () => {
    const userQuery = chatbotGeneralInput.value.trim();
    if (userQuery) {
        appendMessage('User', userQuery);
        chatbotGeneralInput.value = '';
        if (userQuery.length > 50) { // Example: "I need you to find an Order which was shown delivered a few days ago, but not in hand yet"
            liveAgentHandoff();
        } else {
            appendMessage('Bot', 'That sounds interesting! Let me assist you with that.');
        }
    }
};

function liveAgentHandoff() {
    clearChat();
    appendMessage('Bot', 'It seems like this might require more personalized assistance. I\'ll connect you to one of our experts!');
    appendMessage('Bot', 'Connecting you with an agent...');
    setTimeout(() => {
        appendMessage('Agent', 'Hello, this is Alex. How can I help you?');
    }, 2000);
}
