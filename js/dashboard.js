document.addEventListener('DOMContentLoaded', function() {
    // Task checkboxes functionality
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.color = '#888';
                updateTaskProgress();
            } else {
                label.style.textDecoration = 'none';
                label.style.color = '#333';
                updateTaskProgress();
            }
        });
    });
    
    // Function to update task progress
    function updateTaskProgress() {
        const total = checkboxes.length;
        const completed = [...checkboxes].filter(cb => cb.checked).length;
        const percentage = Math.round((completed / total) * 100);
        
        console.log(`Tasks completed: ${percentage}%`);
        // You could update a progress indicator here if desired
    }
    
    // Water intake tracker
    const waterGlasses = document.querySelector('.water').parentElement.querySelector('p');
    const [current, total] = waterGlasses.textContent.split('/');
    
    // Self-care items interaction
    const selfCareItems = document.querySelectorAll('.self-care-item');
    
    selfCareItems.forEach(item => {
        item.addEventListener('click', function() {
            const icon = this.querySelector('.self-care-icon');
            
            // Toggle between completed and not completed
            if (icon.classList.contains('completed')) {
                icon.classList.remove('completed');
                icon.classList.add('not-completed');
                icon.textContent = '❌';
            } else if (icon.classList.contains('not-completed')) {
                icon.classList.remove('not-completed');
                icon.classList.add('completed');
                icon.textContent = '✅';
            } else if (icon.classList.contains('water')) {
                // Handle water intake
                let [current, total] = icon.parentElement.querySelector('p').textContent.split('/');
                current = parseInt(current);
                total = parseInt(total.split(' ')[0]);
                
                if (current < total) {
                    current++;
                    icon.parentElement.querySelector('p').textContent = `${current}/${total} Glasses`;
                }
            }
        });
    });
    
    // Menu item click handler
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Simulated data for demonstration purposes only
    // In a real app, this would come from a backend
    const mockMoodData = [
        { day: 'Mon', mood: '😀' },
        { day: 'Tue', mood: '😃' },
        { day: 'Wed', mood: '😡' },
        { day: 'Thu', mood: '😊' },
        { day: 'Fri', mood: '🙂' },
        { day: 'Sat', mood: '😊' },
        { day: 'Sun', mood: '😊' }
    ];
    
    const mockFinancialData = {
        income: 'Rp 2.500.000',
        income: 'Rp 3.500.000',
        expenses: 'Rp 1.250.000',
        balance: 'Rp 1.250.000'
    };
    
    // This function would update the UI with data from a backend in a real application
    function updateDashboardData() {
        // Update mood history
        const moodDays = document.querySelectorAll('.mood-day');
        moodDays.forEach((day, index) => {
            if (mockMoodData[index]) {
                day.querySelector('.emoji').textContent = mockMoodData[index].mood;
                day.querySelector('p').textContent = mockMoodData[index].day;
            }
        });
        
        // Update financial data
        document.querySelector('.income').textContent = mockFinancialData.income;
        document.querySelector('.expenses').textContent = mockFinancialData.expenses;
        document.querySelector('.balance p:last-child').textContent = mockFinancialData.balance;
    }
    
    // Initialize dashboard
    updateDashboardData();
});