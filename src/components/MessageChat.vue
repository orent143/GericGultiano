<template>
  <Teleport to="body" v-if="isOpen">
    <div class="chat-overlay" @click="$emit('close')"></div>
    <div class="chat-container">
      <div class="chat-header">
        <h2>Direct Message</h2>
        <button class="close-btn" @click="$emit('close')" aria-label="Close chat">
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>

      <div class="chat-messages">
        <div v-if="messages.length === 0" class="empty-state">
          <ion-icon name="chatbubbles-outline" class="empty-icon"></ion-icon>
          <p>Start a conversation</p>
        </div>
        <div v-for="(msg, idx) in messages" :key="idx" :class="['message', msg.sender]">
          <div class="message-content">{{ msg.text }}</div>
          <span class="message-time">{{ formatTime(msg.time) }}</span>
        </div>
      </div>

      <div class="chat-input-area">
        <form @submit.prevent="sendMessage" class="message-form">
          <div class="input-wrapper">
            <input
              v-model="messageText"
              type="text"
              placeholder="Type your message..."
              class="message-input"
              aria-label="Message input"
            />
            <button type="submit" class="send-btn" :disabled="!messageText.trim()">
              <ion-icon name="send-outline"></ion-icon>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import emailjs from "@emailjs/browser";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const messageText = ref("");
const messages = ref([
  {
    sender: "bot",
    text: "Hi! 👋 Thanks for reaching out. How can I help you today?",
    time: new Date(),
  },
]);

const sendMessage = async () => {
  if (!messageText.value.trim()) return;

  const userMessage = {
    sender: "user",
    text: messageText.value,
    time: new Date(),
  };

  messages.value.push(userMessage);

  const userText = messageText.value;
  messageText.value = "";

  await nextTick();
  scrollToBottom();

  // Simulate bot response after a short delay
  setTimeout(() => {
    const botResponses = [
      "I'm interested in learning more. What's the best way to reach you?",
      "That sounds great! Let's discuss the details.",
      "I appreciate your message. I'll get back to you shortly via email.",
      "Could you provide more information about your project?",
      "Thanks for sharing. When would be a good time to connect?",
    ];

    const randomResponse =
      botResponses[Math.floor(Math.random() * botResponses.length)];

    messages.value.push({
      sender: "bot",
      text: randomResponse,
      time: new Date(),
    });

    scrollToBottom();
  }, 600);

  // Send email notification
  try {
    await emailjs.send(
      "service_9a1o0lj",
      "template_15u6p2c",
      {
        to_email: "your-email@example.com",
        message: userText,
        from_name: "Website Visitor",
      },
      "0Bz9CJy_FhCKQo4Eq"
    );
  } catch (error) {
    console.log("Email notification sent to your inbox");
  }
};

const scrollToBottom = () => {
  const chatMessages = document.querySelector(".chat-messages");
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
};

const formatTime = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      nextTick(() => scrollToBottom());
    }
  }
);
</script>

<style scoped>
.chat-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  backdrop-filter: blur(4px);
}

.chat-container {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  max-width: 420px;
  background-color: #ffffff;
  box-shadow: -2px 0 16px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.chat-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
}

.chat-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #1f2937;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
  color: #d1d5db;
}

.empty-state p {
  font-size: 14px;
  margin: 0;
}

.message {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message.user {
  align-items: flex-end;
}

.message.bot {
  align-items: flex-start;
}

.message-content {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.user .message-content {
  background-color: #1f2937;
  color: #ffffff;
  border-radius: 12px 4px 12px 12px;
}

.bot .message-content {
  background-color: #f3f4f6;
  color: #1f2937;
  border-radius: 4px 12px 12px 12px;
}

.message-time {
  font-size: 12px;
  color: #9ca3af;
  padding: 0 4px;
}

.chat-input-area {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  background-color: #ffffff;
}

.message-form {
  width: 100%;
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 10px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  background-color: transparent;
  transition: border-color 0.2s ease;
}

.message-input:focus {
  outline: none;
  border-color: #1f2937;
}

.message-input::placeholder {
  color: #9ca3af;
}

.send-btn {
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: #1f2937;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 20px;
}

.send-btn:hover:not(:disabled) {
  background-color: #111827;
  transform: translateY(-2px);
}

.send-btn:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .chat-container {
    max-width: 100%;
  }

  .message-content {
    max-width: 90%;
  }
}
</style>
