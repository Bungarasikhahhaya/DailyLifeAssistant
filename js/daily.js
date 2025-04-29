document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const quoteForm = document.getElementById('quote-form');
    const quoteTextInput = document.getElementById('quote-text');
    const quoteAuthorInput = document.getElementById('quote-author');
    const saveQuoteBtn = document.getElementById('save-quote');
    const shareQuoteBtn = document.getElementById('share-quote');
    const quotesGrid = document.querySelector('.quotes-grid');
    const quoteOfTheDay = document.querySelector('.quote-box .quote-text');
    const quoteAuthorOfTheDay = document.querySelector('.quote-box .quote-author');
    
    // Load saved quotes
    loadSavedQuotes();
    
    // Set today's quote (randomly or from API)
    loadQuoteOfTheDay();
    
    // Save Quote Button Click
    saveQuoteBtn.addEventListener('click', function() {
        // Get current quote and author
        const quoteText = quoteOfTheDay.textContent;
        // Extract author text without the bullet
        const authorFull = quoteAuthorOfTheDay.textContent;
        const author = authorFull.replace('•', '').trim();
        
        // Save to localStorage
        saveQuote(quoteText, author);
        
        alert('Quote saved to your favorites!');
    });
    
    // Share Quote Button Click
    shareQuoteBtn.addEventListener('click', function() {
        const quoteText = quoteOfTheDay.textContent;
        const authorFull = quoteAuthorOfTheDay.textContent;
        const author = authorFull.replace('•', '').trim();
        
        // Create share text
        const shareText = `${quoteText} - ${author}`;
        
        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: 'Daily Quote',
                text: shareText
            }).catch(err => {
                console.error('Error sharing:', err);
                fallbackShare(shareText);
            });
        } else {
            fallbackShare(shareText);
        }
    });
    
    // Fallback share method
    function fallbackShare(text) {
        // Create a temporary input
        const input = document.createElement('textarea');
        input.value = text;
        document.body.appendChild(input);
        
        // Select and copy
        input.select();
        document.execCommand('copy');
        
        // Remove the input
        document.body.removeChild(input);
        
        alert('Quote copied to clipboard! You can paste it anywhere you want to share.');
    }
    
    // Add new quote form submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const quoteText = quoteTextInput.value.trim();
        const author = quoteAuthorInput.value.trim();
        
        if (!quoteText) {
            alert('Please enter a quote.');
            return;
        }
        
        if (!author) {
            alert('Please enter the author\'s name.');
            return;
        }
        
        // Save the quote
        saveQuote(quoteText, author);
        
        // Clear inputs
        quoteTextInput.value = '';
        quoteAuthorInput.value = '';
        
        alert('Your quote has been added!');
    });
    
    // Function to save a quote
    function saveQuote(text, author) {
        const currentDate = new Date();
        
        // Create quote object
        const quote = {
            text: text,
            author: author,
            date: currentDate.toISOString(),
            formattedDate: formatDate(currentDate)
        };
        
        // Get existing quotes
        let quotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
        
        // Add new quote
        quotes.unshift(quote);
        
        // Save to localStorage (limit to 20 quotes)
        localStorage.setItem('savedQuotes', JSON.stringify(quotes.slice(0, 20)));
        
        // Update display
        loadSavedQuotes();
    }
    
    // Function to load saved quotes
    function loadSavedQuotes() {
        // Get quotes from localStorage
        const quotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
        
        // If no saved quotes, show example quotes
        if (quotes.length === 0) {
            // No need to clear the grid since we have example quotes in HTML
            return;
        }
        
        // Clear quotes grid
        quotesGrid.innerHTML = '';
        
        // Show recent quotes (max 4)
        quotes.slice(0, 4).forEach(quote => {
            // Create quote card
            const quoteCard = createQuoteCard(quote);
            quotesGrid.appendChild(quoteCard);
        });
    }
    
    // Function to create a quote card
    function createQuoteCard(quote) {
        const card = document.createElement('div');
        card.className = 'quote-card';
        
        card.innerHTML = `
            <p class="quote-text">"${quote.text}"</p>
            <p class="quote-author">
                <span class="bullet">•</span> ${quote.author}
            </p>
            <p class="quote-date">${quote.formattedDate}</p>
        `;
        
        return card;
    }
    
    // Function to load quote of the day
    function loadQuoteOfTheDay() {
        // For demonstration, we'll use a static quote
        // In a real app, you might fetch from an API or have a rotating collection
        
        // Check if we already set a quote today
        const today = new Date().toDateString();
        const lastQuoteDate = localStorage.getItem('lastQuoteDate');
        
        if (today === lastQuoteDate) {
            const savedDailyQuote = JSON.parse(localStorage.getItem('dailyQuote'));
            if (savedDailyQuote) {
                quoteOfTheDay.textContent = savedDailyQuote.text;
                quoteAuthorOfTheDay.innerHTML = `<span class="bullet">•</span> ${savedDailyQuote.author}`;
                return;
            }
        }
        
        // If not, select a new quote
        const quotesList = [
            {
                text: "The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            },
            {
                text: "Life is what happens when you're busy making other plans.",
                author: "John Lennon"
            },
            {
                text: "The future belongs to those who believe in the beauty of their dreams.",
                author: "Eleanor Roosevelt"
            },
            {
                text: "In the middle of difficulty lies opportunity.",
                author: "Albert Einstein"
            },
            {
                text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
                author: "Winston Churchill"
            }
        ];
        
        // Select random quote
        const randomIndex = Math.floor(Math.random() * quotesList.length);
        const dailyQuote = quotesList[randomIndex];
        
        // Update display
        quoteOfTheDay.textContent = dailyQuote.text;
        quoteAuthorOfTheDay.innerHTML = `<span class="bullet">•</span> ${dailyQuote.author}`;
        
        // Save to localStorage
        localStorage.setItem('dailyQuote', JSON.stringify(dailyQuote));
        localStorage.setItem('lastQuoteDate', today);
    }
    
    // Function to format date
    function formatDate(date) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        
        return `${month} ${day}, ${year}`;
    }
    
    // Menu item click handler
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});