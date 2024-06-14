let controller;
let chatHistory = [];

document.getElementById('chatForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Schakel de knop uit om herhaaldelijk klikken te voorkomen
    document.getElementById('submitBtn').disabled = true;

    // Maak een nieuwe AbortController aan
    controller = new AbortController();
    const signal = controller.signal;


    const ingredients = document.getElementById('ingredients').value.trim();
    console.log(ingredients.length)

    try {
        if (ingredients.length === 0) {
            document.getElementById('error').innerText = 'Voer ten minste één ingrediënt in.';

            throw new Error('Voer ten minste één ingrediënt in.');
        }

        const response = await fetch('https://rr-service.onrender.com/api/chat', {
            mode: "cors",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients }),
            signal: signal
        });

        const data = await response.json();

        // Voeg het ontvangen bericht toe aan de chatgeschiedenis
        chatHistory.push(data.content);

        // Sla de bijgewerkte chatgeschiedenis op in localStorage
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

        // Update de chatgeschiedenis in de HTML
        updateChatHistory();

        document.getElementById('response').innerText = data.content;
    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
        document.getElementById('error').innerText = error.message;
    } finally {
        // Schakel de knop weer in nadat de aanvraag is voltooid
        document.getElementById('submitBtn').disabled = false;
    }
});

function updateChatHistory() {
    const chatHistoryElement = document.getElementById('chatHistory');
    chatHistoryElement.innerHTML = ''; // Leeg de huidige inhoud

    // Voeg elk bericht toe aan de chatgeschiedenis in de HTML
    chatHistory.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatHistoryElement.appendChild(messageElement);
    });
}

// Functie om het verzoek te annuleren
function cancelAPICall() {
    if (controller) {
        controller.abort();
        console.log('API call geannuleerd.');
    } else {
        console.error('Er is geen API call om te annuleren.', error);
    }
}
document.getElementById('cancelBtn').addEventListener('click', cancelAPICall);

