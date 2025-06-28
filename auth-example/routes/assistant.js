async function askAssistant() {
    const prompt = document.getElementById("userInput").value;
    const responseBox = document.getElementById("response");

    const res = await fetch("http://localhost:3000/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    responseBox.textContent = data.reply;
}
