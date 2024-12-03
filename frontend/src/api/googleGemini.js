// import DOMPurify from 'dompurify';
// import { marked } from 'marked';


let session;

async function runPrompt(prompt, params) {
  try {
    if (!session) {
      session = await chrome.aiOriginTrial.languageModel.create(params);
    }
    return session.prompt(prompt);
  } catch (e) {
    console.log('Prompt failed');
    console.error(e);
    console.log('Prompt:', prompt);
    // Reset session
    reset();
    throw e;
  }
}

async function reset() {
  if (session) {
    session.destroy();
  }
  session = null;
}

async function initDefaults() {
  
  if (!('aiOriginTrial' in chrome)) {
    console.log('Origin trial not available');
    return;
  }
  const defaults = await chrome.aiOriginTrial.languageModel.capabilities();
  console.log('Model default:', defaults);
  if (defaults.available !== 'readily') {
    console.log('Model not available');
    return;
  }
}

export { runPrompt, reset, initDefaults };

