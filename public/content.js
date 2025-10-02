// Gmail Emoji Quick Response Extension
console.log('[Gmail Emoji Extension] Script loaded!');

const EMOJIS = [
  { emoji: '👍', label: 'Thumbs up' },
  { emoji: '❤️', label: 'Heart' },
  { emoji: '😊', label: 'Smile' },
  { emoji: '🎉', label: 'Celebrate' },
  { emoji: '👏', label: 'Clap' },
  { emoji: '✅', label: 'Done' }
];

function createEmojiButtons() {
  const container = document.createElement('div');
  container.className = 'gmail-emoji-quick-response';
  container.style.display = 'inline-flex';
  container.style.gap = '8px';
  container.style.marginLeft = '12px';
  container.style.alignItems = 'center';
  
  EMOJIS.forEach(({ emoji, label }) => {
    const button = document.createElement('button');
    button.className = 'emoji-quick-btn';
    button.textContent = emoji;
    button.title = label;
    button.setAttribute('aria-label', `Quick reply with ${label}`);
    button.style.cssText = `
      background: none;
      border: 1px solid #dadce0;
      border-radius: 4px;
      padding: 6px 10px;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.2s;
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.background = '#f1f3f4';
      button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.background = 'none';
      button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleEmojiClick(emoji);
    });
    
    container.appendChild(button);
  });
  
  return container;
}

function handleEmojiClick(emoji) {
  // Find the reply button and click it
  const replyButton = document.querySelector('[role="button"][aria-label*="Reply"]');
  if (replyButton) {
    replyButton.click();
    
    // Wait for compose area to appear
    setTimeout(() => {
      const composeArea = document.querySelector('[role="textbox"][aria-label*="Message"]');
      if (composeArea) {
        composeArea.focus();
        document.execCommand('insertText', false, emoji);
        
        // Optional: Auto-send the emoji
        // Uncomment the lines below if you want to auto-send
        // setTimeout(() => {
        //   const sendButton = document.querySelector('[role="button"][aria-label*="Send"]');
        //   if (sendButton) sendButton.click();
        // }, 100);
      }
    }, 500);
  }
}

function injectEmojiButtons() {
  console.log('[Gmail Emoji] Running injection...');
  
  // Find all tables in the email body that might contain reply buttons
  const tables = document.querySelectorAll('table[role="presentation"]');
  
  tables.forEach(table => {
    // Look for Reply/Forward text in span elements
    const spans = table.querySelectorAll('span[role="link"]');
    
    spans.forEach(span => {
      const text = span.textContent.trim();
      
      if ((text === 'Reply' || text === 'Forward' || text === 'Reply all') && 
          !span.dataset.emojiInjected) {
        
        console.log('[Gmail Emoji] Found button:', text);
        span.dataset.emojiInjected = 'true';
        
        // Find the parent TD
        const td = span.closest('td');
        if (td) {
          // Create emoji buttons
          const emojiContainer = createEmojiButtons();
          
          // Insert in the same cell, right after the link
          span.parentElement.appendChild(emojiContainer);
          
          console.log('[Gmail Emoji] Buttons injected!');
        }
      }
    });
  });
}

// Initial injection
setTimeout(injectEmojiButtons, 1000);

// Watch for DOM changes (when new emails are opened)
const observer = new MutationObserver(() => {
  injectEmojiButtons();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Reinject on navigation
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(injectEmojiButtons, 1000);
  }
}).observe(document, { subtree: true, childList: true });
