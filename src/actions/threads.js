export function addMessage(threadId, message) {
  return {
    type: 'ADD_MESSAGE',
    threadId: threadId,
    message: message
  };
}

export function setCurrentMessage(threadId, message) {
  return {
    type: 'SET_CURRENT',
    threadId: threadId,
    message: message
  };
}

export function toggleSending(threadId) {
  return {
    type: 'TOGGLE_SENDING',
    threadId: threadId
  };
}

export function toggleSettings(threadId) {
  return {
    type: 'TOGGLE_SETTINGS',
    threadId: threadId
  };
}

export function setMessages(threadId, messages) {
  return {
    type: 'SET_MESSAGES',
    threadId: threadId,
    messages: messages
  };
}

export function addThread(threadId, title) {
  return {
    type: 'ADD_THREAD',
    id: threadId,
    title: title
  };
}

export function removeThread(threadId) {
  return {
    type: 'REMOVE_THREAD',
    id: threadId
  };
}

export function setThreads(threads) {
  return {
    type: 'SET_THREADS',
    threads: threads
  };
}

export function clearThreads() {
  return {
    type: 'CLEAR_THREADS',
  };
}