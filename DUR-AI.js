    let chatDiv = null;
    let lastUserInput = '';
    let lastBotResponse = '';

    document.addEventListener('DOMContentLoaded', function () {
        chatDiv = document.getElementById('chat');
    });

    function sendMessage() {
        const userInputElement = document.getElementById('userInput');
        if (!userInputElement || !(userInputElement instanceof HTMLInputElement)) {
            console.error('userInputElement is null or not an input element');
            return;
        }

        const userInput = userInputElement.value.trim().toLowerCase();

        if (userInput === '#change@') {
            const newResponse = prompt("Give me another answer:");
            if (newResponse && lastUserInput && lastBotResponse) {
                localStorage.setItem(lastUserInput, newResponse);
                lastBotResponse = newResponse;
            }
        } else if (userInput === '#clear@') {
            localStorage.clear();
            chatDiv.innerHTML = '';
        } else {
            let botResponse = "I don't know what it means. Tell me how I should respond.";
            
            if (userInput === 'hello') {
                botResponse = 'Hi! 😊';
            } else if (userInput.includes('how are you')) {
                botResponse = 'I am just a bot, but thanks for asking! 😅';
            } else {
                const storedResponse = localStorage.getItem(userInput);
                if (storedResponse) {
                    botResponse = storedResponse;
                } else {
                    const suggestedResponse = prompt("I don't know what it means. Tell me how I should respond.");
                    if (suggestedResponse) {
                        localStorage.setItem(userInput, suggestedResponse);
                        botResponse = 'Okay, got it! 😎';
                    }
                }
            }

            displayMessage('You', userInput);
            displayMessage('Bot', botResponse);
            lastUserInput = userInput;
            lastBotResponse = botResponse;
        }

        userInputElement.value = '';
    }

    function displayMessage(sender, message) {
        if (!chatDiv) {
            console.error('chatDiv is null');
            return;
        }

        const messageElement = document.createElement('p');
        messageElement.textContent = `${sender}: ${message}`;
        chatDiv.appendChild(messageElement);
    }
