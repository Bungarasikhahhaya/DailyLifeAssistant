document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const transactionTypeInput = document.getElementById('transaction-type');
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const dateInput = document.getElementById('date');
    const descriptionInput = document.getElementById('description');
    const addTransactionBtn = document.getElementById('add-transaction');
    const transactionsTable = document.getElementById('transactions-table');
    
    // Load existing transactions
    loadTransactions();
    
    // Initialize date input with current date
    const today = new Date();
    const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
    dateInput.value = formattedDate;
    
    // Add transaction button click event
    addTransactionBtn.addEventListener('click', function() {
        // Get form values
        const transactionType = transactionTypeInput.value.trim();
        const amount = amountInput.value.trim();
        const category = categoryInput.value.trim();
        const date = dateInput.value.trim();
        const description = descriptionInput.value.trim();
        
        // Validate inputs
        if (!transactionType || !amount || !category || !date) {
            alert('Please fill all required fields');
            return;
        }
        
        // Create transaction object
        const transaction = {
            type: transactionType.toLowerCase(),
            amount: parseFloat(amount.replace(/[^0-9.-]+/g, '')),
            category,
            date,
            description,
            timestamp: new Date().getTime()
        };
        
        // Determine if it's income or expense
        if (transaction.type === 'income') {
            transaction.amount = Math.abs(transaction.amount);
        } else if (transaction.type === 'expense') {
            transaction.amount = -Math.abs(transaction.amount);
        }
        
        // Save transaction
        saveTransaction(transaction);
        
        // Clear form
        clearForm();
        
        // Show success message
        alert('Transaction added successfully!');
    });
    
    // Function to save transaction
    function saveTransaction(transaction) {
        // Get existing transactions
        let transactions = JSON.parse(localStorage.getItem('financialTransactions')) || [];
        
        // Add new transaction
        transactions.push(transaction);
        
        // Sort by date (newest first)
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Save to localStorage
        localStorage.setItem('financialTransactions', JSON.stringify(transactions));
        
        // Update display
        loadTransactions();
    }
    
    // Function to load transactions
    function loadTransactions() {
        // Get transactions from localStorage
        const transactions = JSON.parse(localStorage.getItem('financialTransactions')) || [];
        
        // Clear table
        const tbody = transactionsTable.querySelector('tbody');
        tbody.innerHTML = '';

        // If no transactions, add sample data
        if (transactions.length === 0) {
            const sampleData = [
                {
                    date: '04/16/2025',
                    category: 'Food',
                    description: 'Lunch with colleagues',
                    amount: -100000,
                    type: 'expense'
                },
                {
                    date: '04/15/2025',
                    category: 'Transportation',
                    description: 'Gasoline',
                    amount: -200000,
                    type: 'expense'
                },
                {
                    date: '04/15/2025',
                    category: 'Salary',
                    description: 'Web design',
                    amount: 10000000,
                    type: 'income'
                }
            ];
            
            sampleData.forEach(transaction => {
                const row = createTransactionRow(transaction);
                tbody.appendChild(row);
            });
            
            return;
        }
        
        // Add transactions to table
        transactions.forEach(transaction => {
            const row = createTransactionRow(transaction);
            tbody.appendChild(row);
        });
    }
    
    // Function to create transaction row
    function createTransactionRow(transaction) {
        const row = document.createElement('tr');
        
        // Format date for display
        const dateParts = transaction.date.split('/');
        const displayDate = `Apr ${dateParts[1]}, ${dateParts[2]}`;
        
        // Format amount for display
        const isIncome = transaction.type === 'income' || transaction.amount > 0;
        const formattedAmount = formatCurrency(Math.abs(transaction.amount), isIncome);
        
        // Create row HTML
        row.innerHTML = `
            <td class="transaction-date">${displayDate}</td>
            <td class="transaction-category">${transaction.category}</td>
            <td class="transaction-description">${transaction.description}</td>
            <td class="transaction-amount ${isIncome ? 'amount-positive' : 'amount-negative'}">${formattedAmount}</td>
        `;
        
        return row;
    }
    
    // Function to format currency
    function formatCurrency(amount, isIncome) {
        // Format number with Indonesian Rupiah
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
        
        const formattedAmount = formatter.format(amount);
        // Replace "IDR" with "Rp" and remove space
        const cleanAmount = formattedAmount.replace('IDR', 'Rp').replace(/\s/g, '');
        
        return isIncome ? `+${cleanAmount}` : `-${cleanAmount}`;
    }
    
    // Function to clear form
    function clearForm() {
        transactionTypeInput.value = '';
        amountInput.value = '';
        categoryInput.value = '';
        descriptionInput.value = '';
        
        // Reset date to current date
        dateInput.value = formattedDate;
    }
    
    // Menu item click handler
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        
        });

    // Tambahkan ikon dropdown dan kalender
    // Tambahan ini diletakkan di dalam DOMContentLoaded, sebelum penutup });
    const typeSelect = document.getElementById('transaction-type');
    const categorySelect = document.getElementById('category');
    const dateField = document.getElementById('date');

    // Wrap select elements with a styled div dan tambahkan ikon dropdown
    [typeSelect, categorySelect].forEach(select => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('select-wrapper');
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);

        const icon = document.createElement('span');
        icon.classList.add('dropdown-icon');
        icon.innerHTML = '&#9662;'; // Unicode panah bawah
        wrapper.appendChild(icon);
    });

    // Tambahkan ikon kalender ke input tanggal
    const dateWrapper = document.createElement('div');
    dateWrapper.classList.add('date-wrapper');
    dateField.parentNode.insertBefore(dateWrapper, dateField);
    dateWrapper.appendChild(dateField);

    const calendarIcon = document.createElement('span');
    calendarIcon.classList.add('calendar-icon');
    calendarIcon.innerHTML = '&#128197;'; // Unicode ikon kalender
    dateWrapper.appendChild(calendarIcon);

    });
});