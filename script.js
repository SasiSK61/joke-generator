/* ===========================
   JOKE GENERATOR APP
   Using Official Joke API
   =========================== */

// API Configuration
const API_BASE_URL = 'https://official-joke-api.appspot.com';
const STORAGE_KEY = 'jokeHistory';

// DOM Elements
const jokeText = document.getElementById('joke-text');
const jokeType = document.getElementById('joke-type');
const getJokeBtn = document.getElementById('get-joke-btn');
const copyBtn = document.getElementById('copy-btn');
const shareBtn = document.getElementById('share-btn');
const categorySelect = document.getElementById('category-select');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorText = document.getElementById('error-text');
const jokeHistory = document.getElementById('joke-history');
const clearHistoryBtn = document.getElementById('clear-history-btn');

// State
let currentJoke = null;
let jokes = [];

/* ===========================
   INITIALIZATION
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    loadHistory();
    
    // Event Listeners
    getJokeBtn.addEventListener('click', fetchJoke);
    copyBtn.addEventListener('click', copyJoke);
    shareBtn.addEventListener('click', shareJoke);
    categorySelect.addEventListener('change', fetchJoke);
    clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Fetch initial joke
    fetchJoke();
});

/* ===========================
   FETCH JOKE FROM API
   =========================== */

async function fetchJoke() {
    try {
        showLoading();
        hideError();
        
        const category = categorySelect.value;
        let url = `${API_BASE_URL}/jokes`;
        
        // Build URL based on category
        if (category !== 'any') {
            url += `/random?type=${category}`;
        } else {
            url += '/random';
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch joke: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle both single joke and array responses
        const joke = Array.isArray(data) ? data[0] : data;
        
        currentJoke = {
            setup: joke.setup,
            punchline: joke.punchline,
            type: joke.type,
            timestamp: new Date().toLocaleTimeString()
        };
        
        displayJoke(currentJoke);
        addToHistory(currentJoke);
        
    } catch (err) {
        showError(`Oops! ${err.message} Try again!`);
        console.error('Error fetching joke:', err);
    } finally {
        hideLoading();
    }
}

/* ===========================
   DISPLAY JOKE
   =========================== */

function displayJoke(joke) {
    if (joke.setup && joke.punchline) {
        jokeText.textContent = `${joke.setup} ${joke.punchline}`;
    } else {
        jokeText.textContent = joke.setup || 'No joke available';
    }
    
    jokeType.textContent = `Type: ${joke.type || 'general'}`;
}

/* ===========================
   COPY JOKE TO CLIPBOARD
   =========================== */

function copyJoke() {
    if (!currentJoke) {
        showError('No joke to copy!');
        return;
    }
    
    const jokeText = currentJoke.setup && currentJoke.punchline
        ? `${currentJoke.setup} ${currentJoke.punchline}`
        : currentJoke.setup;
    
    navigator.clipboard.writeText(jokeText).then(() => {
        // Show feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        copyBtn.style.background = '#51cf66';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        showError('Failed to copy joke');
        console.error('Copy error:', err);
    });
}

/* ===========================
   SHARE JOKE
   =========================== */

function shareJoke() {
    if (!currentJoke) {
        showError('No joke to share!');
        return;
    }
    
    const jokeText = currentJoke.setup && currentJoke.punchline
        ? `${currentJoke.setup} ${currentJoke.punchline}`
        : currentJoke.setup;
    
    const shareText = `😂 Check out this joke: "${jokeText}"`;
    
    // Use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: 'Random Joke',
            text: shareText,
            url: window.location.href
        }).catch(err => console.error('Share error:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Joke copied to clipboard!');
        }).catch(err => {
            showError('Unable to share joke');
            console.error('Share error:', err);
        });
    }
}

/* ===========================
   HISTORY MANAGEMENT
   =========================== */

function addToHistory(joke) {
    // Add to beginning of array
    jokes.unshift({
        ...joke,
        id: Date.now()
    });
    
    // Keep only last 10 jokes
    if (jokes.length > 10) {
        jokes.pop();
    }
    
    saveHistory();
    renderHistory();
}

function saveHistory() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jokes));
}

function loadHistory() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        jokes = stored ? JSON.parse(stored) : [];
        renderHistory();
    } catch (err) {
        console.error('Error loading history:', err);
        jokes = [];
    }
}

function renderHistory() {
    if (jokes.length === 0) {
        jokeHistory.innerHTML = '<li class="empty-history">No jokes yet. Get started!</li>';
        clearHistoryBtn.classList.add('hidden');
        return;
    }
    
    clearHistoryBtn.classList.remove('hidden');
    
    jokeHistory.innerHTML = jokes.map(joke => `
        <li>
            ${joke.setup}${joke.punchline ? ` ${joke.punchline}` : ''}
            <br><small>${joke.timestamp}</small>
        </li>
    `).join('');
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        jokes = [];
        saveHistory();
        renderHistory();
    }
}

/* ===========================
   UI STATE MANAGEMENT
   =========================== */

function showLoading() {
    loading.classList.remove('hidden');
    getJokeBtn.disabled = true;
}

function hideLoading() {
    loading.classList.add('hidden');
    getJokeBtn.disabled = false;
}

function showError(message) {
    errorText.textContent = message;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

/* ===========================
   KEYBOARD SHORTCUTS
   =========================== */

document.addEventListener('keydown', (e) => {
    // Press 'Space' to get new joke
    if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        fetchJoke();
    }
    
    // Press 'C' to copy joke
    if ((e.key === 'c' || e.key === 'C') && e.ctrlKey) {
        e.preventDefault();
        copyJoke();
    }
});

/* ===========================
   HELPER FUNCTIONS
   =========================== */

// Format time nicely
function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Check if device supports sharing
function supportsWebShare() {
    return navigator && navigator.share;
}