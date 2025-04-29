document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasksContainer = document.querySelector('.tasks-container');
    
    // Add new task
    addTaskBtn.addEventListener('click', function() {
        addNewTask();
    });
    
    // Add task on Enter key
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewTask();
        }
    });
    
    // Function to add new task
    function addNewTask() {
        const taskText = newTaskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        
        // Create new task item
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        const currentDate = new Date();
        const today = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        
        taskItem.innerHTML = `
            <div class="task-left">
                <div class="checkbox"></div>
                <span class="task-text">${taskText}</span>
            </div>
            <div class="task-right">
                <span class="task-date">Today</span>
                <button class="task-edit">Edit</button>
                <button class="task-delete">Delete</button>
            </div>
        `;
        
        // Add to tasks container
        tasksContainer.appendChild(taskItem);
        
        // Clear input
        newTaskInput.value = '';
        
        // Add event listeners to new task
        addTaskEventListeners(taskItem);
    }
    
    // Add event listeners to all existing tasks
    function initializeTaskEvents() {
        const taskItems = document.querySelectorAll('.task-item');
        
        taskItems.forEach(task => {
            addTaskEventListeners(task);
        });
    }
    
    // Add necessary event listeners to a task item
    function addTaskEventListeners(taskItem) {
        // Checkbox toggle
        const checkbox = taskItem.querySelector('.checkbox');
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
            if (this.classList.contains('checked')) {
                this.innerHTML = '<i class="fas fa-check"></i>';
                taskItem.classList.add('completed');
            } else {
                this.innerHTML = '';
                taskItem.classList.remove('completed');
            }
        });
        
        // Delete button
        const deleteBtn = taskItem.querySelector('.task-delete');
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this task?')) {
                taskItem.remove();
            }
        });
        
        // Edit button
        const editBtn = taskItem.querySelector('.task-edit');
        editBtn.addEventListener('click', function() {
            const taskText = taskItem.querySelector('.task-text');
            const newText = prompt('Edit task:', taskText.textContent);
            
            if (newText !== null && newText.trim() !== '') {
                taskText.textContent = newText.trim();
            }
        });
    }
    
    // Initialize existing tasks
    initializeTaskEvents();
    
    // Menu item click handler
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});