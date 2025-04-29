document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const moodIcons = document.querySelectorAll('.mood-icon');
    const diaryText = document.getElementById('diary-text');
    const saveButton = document.getElementById('save-entry');
    const historyContainer = document.getElementById('history-container');
    
    // Variables
    let selectedMood = null;
    
    // Initialize existing entries from localStorage
    loadMoodHistory();
    
    // Set up mood selection
    moodIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove 'selected' class from all icons
            moodIcons.forEach(item => item.classList.remove('selected'));
            
            // Add 'selected' class to the clicked icon
            this.classList.add('selected');
            
            // Store the selected mood
            selectedMood = this.getAttribute('data-mood');
        });
    });
    
    // Save diary entry
    saveButton.addEventListener('click', function() {
        if (!selectedMood) {
            alert('Please select a mood before saving your entry');
            return;
        }
        
        if (diaryText.value.trim() === '') {
            alert('Please write something in your diary before saving');
            return;
        }
        
        // Save the entry
        saveMoodEntry(selectedMood, diaryText.value);
        
        // Reset form
        moodIcons.forEach(item => item.classList.remove('selected'));
        diaryText.value = '';
        selectedMood = null;
        
        // Show success message
        alert('Your mood entry has been saved!');
    });
    
    // Function to save mood entry
    function saveMoodEntry(mood, text) {
        const currentDate = new Date();
        
        // Create entry object
        const entry = {
            date: currentDate.toISOString(),
            formattedDate: formatDate(currentDate),
            mood: mood,
            text: text,
            emoji: getMoodEmoji(mood)
        };
        
        // Get existing entries
        let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        
        // Add new entry at the beginning
        entries.unshift(entry);
        
        // Save to localStorage
        localStorage.setItem('moodEntries', JSON.stringify(entries));
        
        // Update the display
        loadMoodHistory();
    }
    
    // Function to load mood history
    function loadMoodHistory() {
        // Get entries from localStorage
        const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
        
        // Clear the container
        historyContainer.innerHTML = '';
        
        // If no entries, add sample entries for demonstration
        if (entries.length === 0) {
            addSampleEntries();
            return;
        }
        
        // Add entries to the container (limit to most recent 8)
        entries.slice(0, 8).forEach(entry => {
            const entryElement = createEntryElement(entry);
            historyContainer.appendChild(entryElement);
        });
    }
    
    // Function to create an entry element
    function createEntryElement(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'history-entry';
        
        entryDiv.innerHTML = `
            <div class="entry-header">
                <span class="entry-date">${entry.formattedDate}</span>
                <span class="entry-emoji">${entry.emoji}</span>
            </div>
            <div class="entry-content">
                ${entry.text}
            </div>
        `;
        
        return entryDiv;
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
    
    // Function to get emoji based on mood
    function getMoodEmoji(mood) {
        const emojis = {
            'excited': '😄',
            'happy': '🙂',
            'good': '😊',
            'okay': '😐',
            'sad': '😞',
            'stressed': '😣',
            'exhausted': '😩'
        };
        
        return emojis[mood] || '😐';
    }
    
    // Add sample entries for demonstration
    function addSampleEntries() {
        const sampleEntries = [
            {
                date: '2025-04-15T12:00:00',
                formattedDate: 'April 15, 2025',
                mood: 'excited',
                text: 'Write about your day and how you\'re feeling...',
                emoji: '😄'
            },
            {
                date: '2025-04-10T12:00:00',
                formattedDate: 'April 10, 2025',
                mood: 'happy',
                text: 'Write about your day and how you\'re feeling...',
                emoji: '🙂'
            },
            {
                date: '2025-04-08T12:00:00',
                formattedDate: 'April 8, 2025',
                mood: 'stressed',
                text: 'Write about your day and how you\'re feeling...',
                emoji: '😣'
            },
            {
                date: '2025-04-01T12:00:00',
                formattedDate: 'April 1, 2025',
                mood: 'good',
                text: 'Write about your day and how you\'re feeling...',
                emoji: '😊'
            }
        ];
        
        // Save to localStorage
        localStorage.setItem('moodEntries', JSON.stringify(sampleEntries));
        
        // Update display
        loadMoodHistory();
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