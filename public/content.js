// Gmail Emoji Quick Response Extension

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
  
  EMOJIS.forEach(({ emoji, label }) => {
    const button = document.createElement('button');
    button.className = 'emoji-quick-btn';
    button.textContent = emoji;
    button.title = label;
    button.setAttribute('aria-label', `Quick reply with ${label}`);
    
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
  // Find all span elements with role="link" (Reply/Forward buttons)
  const allLinks = document.querySelectorAll('span[role="link"]');
  
  allLinks.forEach(link => {
    const text = link.textContent.trim();
    // Check if this is a Reply or Forward button
    if ((text === 'Reply' || text === 'Forward' || text.includes('Reply')) && 
        !link.dataset.emojiAdded) {
      
      link.dataset.emojiAdded = 'true';
      
      // Find the parent row/container
      let container = link.closest('td');
      if (!container) container = link.parentElement;
      
      // Create emoji buttons
      const emojiButtons = createEmojiButtons();
      
      // Try to insert in the same row
      const parent = container?.parentElement;
      if (parent && parent.tagName === 'TR') {
        const newCell = document.createElement('td');
        newCell.style.paddingLeft = '10px';
        newCell.appendChild(emojiButtons);
        container.insertAdjacentElement('afterend', newCell);
      } else if (container) {
        // Fallback: insert after the container
        emojiButtons.style.display = 'inline-block';
        emojiButtons.style.marginLeft = '10px';
        container.insertAdjacentElement('afterend', emojiButtons);
      }
    }
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
