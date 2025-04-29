// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Toggle checkboxes for activities
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
            
            if (this.classList.contains('checked')) {
                const checkIcon = document.createElement('i');
                checkIcon.className = 'fas fa-check';
                this.appendChild(checkIcon);
                updateProgress();
            } else {
                this.innerHTML = '';
                updateProgress();
            }
        });
    });
    
    // Add new custom activity
    const addButton = document.getElementById('add-activity-btn');
    const activityInput = document.querySelector('.add-activity input');
    
    addButton.addEventListener('click', function() {
        addNewActivity(activityInput.value);
    });
    
    activityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewActivity(activityInput.value);
        }
    });
    
    // Initialize water intake tracking
    const waterActivity = document.querySelector('.activity-card .water').closest('.activity-card');
    const waterProgressText = waterActivity.querySelector('.progress-text');
    let waterIntake = {
        current: 5,
        total: 8
    };
    
    waterActivity.addEventListener('click', function(e) {
        // Only increment if clicking the icon or progress area, not if clicking checkbox
        if (!e.target.closest('.checkbox')) {
            incrementWaterIntake();
        }
    });
    
    // Update progress calculations
    updateProgress();
    
    // Functions
    function addNewActivity(activityText) {
        if (!activityText.trim()) return;
        
        const activitiesGrid = document.querySelector('.activities-grid');
        
        // Array of possible icon classes and colors
        const iconOptions = [
            { icon: 'fas fa-hiking', color: '#26a69a' },
            { icon: 'fas fa-paint-brush', color: '#ec407a' },
            { icon: 'fas fa-music', color: '#7e57c2' },
            { icon: 'fas fa-graduation-cap', color: '#5c6bc0' },
            { icon: 'fas fa-coffee', color: '#8d6e63' }
        ];
        
        // Select random icon and color
        const randomOption = iconOptions[Math.floor(Math.random() * iconOptions.length)];
        
        const newActivityHTML = `
            <div class="activity-card">
                <div class="activity-icon" style="background-color: ${randomOption.color}">
                    <i class="${randomOption.icon}"></i>
                </div>
                <div class="activity-details">
                    <h4>${activityText}</h4>
                    <p>Custom activity</p>
                </div>
                <div class="checkbox"></div>
            </div>
        `;
        
        activitiesGrid.insertAdjacentHTML('beforeend', newActivityHTML);
        activityInput.value = '';
        
        // Add event listener to the new checkbox
        const newCheckbox = activitiesGrid.lastElementChild.querySelector('.checkbox');
        newCheckbox.addEventListener('click', function() {
            this.classList.toggle('checked');
            
            if (this.classList.contains('checked')) {
                const checkIcon = document.createElement('i');
                checkIcon.className = 'fas fa-check';
                this.appendChild(checkIcon);
                updateProgress();
            } else {
                this.innerHTML = '';
                updateProgress();
            }
        });
    }
    
    function incrementWaterIntake() {
        if (waterIntake.current < waterIntake.total) {
            waterIntake.current++;
        } else {
            waterIntake.current = 0;
        }
        
        waterProgressText.textContent = `${waterIntake.current}/${waterIntake.total} glasses`;
        updateProgress();
    }
    
    function updateProgress() {
        // Count checked activities
        const totalActivities = document.querySelectorAll('.activity-card').length;
        const completedActivities = document.querySelectorAll('.checkbox.checked').length;
        
        // Calculate and update progress percentage
        const progressPercentage = Math.round((completedActivities / totalActivities) * 100);
        const progressBar = document.querySelector('.progress-bar');
        const overallProgressText = document.querySelector('.overall-progress');
        
        progressBar.style.width = `${progressPercentage}%`;
        overallProgressText.textContent = `Overall Progress: ${progressPercentage}%`;
    }
});