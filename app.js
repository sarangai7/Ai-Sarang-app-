function createSafePrompt(question) {
    const sanitized = question.replace(/[<>"'&]/g, '').trim();
    return `You are AI Sarang, a helpful daily life solver. 
User asked: "${sanitized}". 
Give short, practical, zero-cost solution in simple English. Be safe and positive.`;
}

function getAISolution() {
    const questionField = document.getElementById('userQuestion');
    const question = questionField.value.trim();
    if (!question) {
        alert("Please type your question!");
        return;
    }

    const responseArea = document.getElementById('responseArea');
    const answerDiv = document.getElementById('aiResponse');

    answerDiv.innerHTML = `
        <strong>Your Question:</strong> ${question}<br><br>
        <em>Copy this safe prompt and ask Grok for the full answer:</em><br><br>
        <span class="text-xs bg-slate-900/80 p-4 block rounded-2xl font-mono">${createSafePrompt(question)}</span>
    `;

    responseArea.classList.remove('hidden');
    questionField.value = '';
}

function copySolution() {
    const text = document.getElementById('aiResponse').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Solution copied to clipboard!");
    });
}

function shareSolution() {
    const text = document.getElementById('aiResponse').innerText;
    if (navigator.share) {
        navigator.share({
            title: 'AI Sarang Solution',
            text: text
        });
    } else {
        alert("Solution copied! You can share it manually.");
        copySolution();
    }
}
