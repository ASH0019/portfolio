// ===== AI CHAT WIDGET =====
const SUGGESTED = [
  "What projects has he built?",
  "Is he available to hire?",
  "What's his tech stack?",
  "Tell me about his experience"
];

function createChatWidget() {
  const style = document.createElement('style');
  style.textContent = `
    #ai-chat-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 999;
      background: linear-gradient(135deg, #C07F22, #E8A84A);
      color: #10131A;
      border: none;
      border-radius: 999px;
      padding: 14px 22px;
      font-size: 0.88rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 8px 24px rgba(192,127,34,0.45);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      font-family: inherit;
    }
    #ai-chat-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(192,127,34,0.55);
    }
    #ai-chat-btn .btn-dot {
      width: 8px; height: 8px;
      background: #10131A;
      border-radius: 50%;
      animation: pulse-dot 1.8s ease-in-out infinite;
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.7); }
    }
    #ai-chat-panel {
      position: fixed;
      bottom: 90px;
      right: 28px;
      z-index: 998;
      width: 360px;
      max-height: 520px;
      background: #10131A;
      border: 1px solid rgba(192,127,34,0.3);
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 64px rgba(0,0,0,0.6);
      overflow: hidden;
      opacity: 0;
      transform: translateY(16px) scale(0.97);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    #ai-chat-panel.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }
    .chat-header {
      background: linear-gradient(135deg, rgba(192,127,34,0.15), rgba(44,74,124,0.2));
      padding: 16px 18px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .chat-avatar {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #C07F22, #2C4A7C);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; font-weight: 800; color: #fff;
      flex-shrink: 0;
    }
    .chat-header-text { flex: 1; }
    .chat-header-name { color: #fff; font-size: 0.9rem; font-weight: 700; }
    .chat-header-sub { color: #C07F22; font-size: 0.74rem; margin-top: 1px; }
    .chat-close {
      background: none; border: none; color: #6B7280;
      font-size: 1.2rem; cursor: pointer; padding: 4px;
      transition: color 0.15s;
    }
    .chat-close:hover { color: #fff; }
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.1) transparent;
    }
    .chat-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 0.86rem;
      line-height: 1.5;
    }
    .chat-msg.bot {
      background: rgba(255,255,255,0.07);
      color: #D4D8E2;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .chat-msg.user {
      background: linear-gradient(135deg, #C07F22, #E8A84A);
      color: #10131A;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
      font-weight: 500;
    }
    .chat-msg.typing {
      display: flex; gap: 5px; align-items: center;
      padding: 12px 16px;
    }
    .chat-msg.typing span {
      width: 7px; height: 7px;
      background: #6B7280; border-radius: 50%;
      animation: typing-bounce 1.2s ease-in-out infinite;
    }
    .chat-msg.typing span:nth-child(2) { animation-delay: 0.2s; }
    .chat-msg.typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typing-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }
    .chat-suggested {
      padding: 0 16px 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }
    .chat-suggested button {
      background: rgba(192,127,34,0.12);
      border: 1px solid rgba(192,127,34,0.3);
      color: #C07F22;
      border-radius: 999px;
      padding: 5px 12px;
      font-size: 0.78rem;
      font-weight: 500;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s, border-color 0.15s;
    }
    .chat-suggested button:hover {
      background: rgba(192,127,34,0.22);
      border-color: #C07F22;
    }
    .chat-input-row {
      padding: 12px 16px;
      border-top: 1px solid rgba(255,255,255,0.07);
      display: flex;
      gap: 8px;
    }
    .chat-input-row input {
      flex: 1;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 999px;
      padding: 9px 16px;
      color: #fff;
      font-size: 0.85rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s;
    }
    .chat-input-row input::placeholder { color: #6B7280; }
    .chat-input-row input:focus { border-color: rgba(192,127,34,0.5); }
    .chat-send {
      background: linear-gradient(135deg, #C07F22, #E8A84A);
      border: none;
      border-radius: 50%;
      width: 36px; height: 36px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: transform 0.15s;
    }
    .chat-send:hover { transform: scale(1.08); }
    .chat-send svg { color: #10131A; }
    @media (max-width: 640px) {
      #ai-chat-panel { width: calc(100vw - 32px); right: 16px; bottom: 80px; }
      #ai-chat-btn { right: 16px; bottom: 20px; }
    }
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend', `
    <button id="ai-chat-btn">
      <span class="btn-dot"></span>
      Ask Ashar's AI
    </button>
    <div id="ai-chat-panel">
      <div class="chat-header">
        <div class="chat-avatar">A</div>
        <div class="chat-header-text">
          <div class="chat-header-name">Ashar's AI</div>
          <div class="chat-header-sub">Ask me anything about Ashar</div>
        </div>
        <button class="chat-close" id="chat-close-btn">✕</button>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="chat-msg bot">Hey! I'm Ashar's AI assistant. I know everything about his experience, projects, and skills. What would you like to know?</div>
      </div>
      <div class="chat-suggested" id="chat-suggested">
        ${SUGGESTED.map(q => `<button class="suggest-btn">${q}</button>`).join('')}
      </div>
      <div class="chat-input-row">
        <input type="text" id="chat-input" placeholder="Ask anything about Ashar..." />
        <button class="chat-send" id="chat-send-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
        </button>
      </div>
    </div>
  `);

  const btn = document.getElementById('ai-chat-btn');
  const panel = document.getElementById('ai-chat-panel');
  const closeBtn = document.getElementById('chat-close-btn');
  const messages = document.getElementById('chat-messages');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const suggestedDiv = document.getElementById('chat-suggested');
  let history = [];
  let isLoading = false;

  btn.addEventListener('click', () => panel.classList.toggle('open'));
  closeBtn.addEventListener('click', () => panel.classList.remove('open'));

  function addMsg(text, role) {
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg bot typing';
    div.id = 'typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  async function sendMessage(text) {
    if (!text.trim() || isLoading) return;
    isLoading = true;
    suggestedDiv.style.display = 'none';
    addMsg(text, 'user');
    history.push({ role: 'user', content: text });
    input.value = '';
    showTyping();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      const data = await res.json();
      if (data.error) {
        removeTyping();
        addMsg('Error: ' + data.error, 'bot');
        isLoading = false;
        return;
      }
      const reply = data.content?.[0]?.text || "I couldn't get a response — email Ashar at asharshamim@umass.edu";
      removeTyping();
      addMsg(reply, 'bot');
      history.push({ role: 'assistant', content: reply });
    } catch {
      removeTyping();
      addMsg("Something went wrong. Reach out to Ashar at asharshamim@umass.edu", 'bot');
    }
    isLoading = false;
  }

  sendBtn.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(input.value); });
  document.querySelectorAll('.suggest-btn').forEach(b => b.addEventListener('click', () => sendMessage(b.textContent)));
}

createChatWidget();
