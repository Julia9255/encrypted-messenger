const chatBox = document.getElementById("chat-box");
const usernameInput = document.getElementById("username-input");
const setUsernameBtn = document.getElementById("set-username");
const messageInput = document.getElementById("message-input");
const messageArea = document.querySelectorAll(".input-area")[1];

let username = null;

// Set username
setUsernameBtn.onclick = () => {
    const name = usernameInput.value.trim();
    if (!name) return;
    username = name;
    usernameInput.parentElement.style.display = "none";
    messageArea.style.display = "flex";

    // Connect WebSocket after username is set
    startWebSocket();
};

let ws;

function startWebSocket() {
    ws = new WebSocket(`ws://${window.location.host}/ws/chat`);

    ws.onmessage = (event) => {
        const msg = event.data;
        chatBox.innerHTML += `<div class="message">${msg}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    };
}

function sendMessage() {
    const msg = messageInput.value.trim();
    if (!msg) return;

    // Include username in the message
    ws.send(`${username}: ${msg}`);
    messageInput.value = "";
}
