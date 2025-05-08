document.addEventListener('DOMContentLoaded', function() {
    // Element references
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const notificationToggle = document.getElementById('notification-toggle');
    const reminderToggle = document.getElementById('reminder-toggle');
    const editButtons = document.querySelectorAll('.edit-btn');
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const deleteBtn = document.querySelector('.delete-btn');
    const actionButtons = document.querySelectorAll('.action-btn');
    const profilePicture = document.querySelector('.profile-picture');
    const profileUpload = document.getElementById('profile-upload');
    
    // Modal elements
    const editModal = document.getElementById('edit-modal');
    const deleteModal = document.getElementById('delete-modal');
    const passwordModal = document.getElementById('password-modal');
    const closeButtons = document.querySelectorAll('.close-btn');
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    
    // Form elements
    const editFieldName = document.getElementById('edit-field-name');
    const editInput = document.getElementById('edit-input');
    const saveBtn = document.querySelector('.save-btn');
    const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');
    const savePasswordBtn = document.querySelector('.save-password-btn');
    
    // User data storage
    const userData = {
        name: 'Budi Santoso',
        email: 'budi.santoso@example.com',
        phone: '+62 812 3456 7890',
        birthdate: '15 Januari 1990'
    };

    // Toggle dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // Toggle notifications
    if (localStorage.getItem('notifications') === 'false') {
        notificationToggle.checked = false;
    }

    notificationToggle.addEventListener('change', function() {
        localStorage.setItem('notifications', this.checked);
    });

    // Toggle daily reminders
    if (localStorage.getItem('reminders') === 'false') {
        reminderToggle.checked = false;
    }

    reminderToggle.addEventListener('change', function() {
        localStorage.setItem('reminders', this.checked);
    });

    // Profile picture upload
    profilePicture.addEventListener('click', function() {
        profileUpload.click();
    });

    profileUpload.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                document.getElementById('profile-image').src = e.target.result;
                // Here you would typically upload the image to a server
                showAlert('Foto profil berhasil diperbarui!');
            };
            
            reader.readAsDataURL(file);
        }
    });

    // Edit profile button (same as clicking any edit button)
    editProfileBtn.addEventListener('click', function() {
        openEditModal('Nama Lengkap', userData.name);
    });

    // Edit field buttons
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fieldType = this.parentElement.previousElementSibling.textContent;
            let currentValue = '';
            
            switch(fieldType) {
                case 'Nama Lengkap':
                    currentValue = userData.name;
                    break;
                case 'Email':
                    currentValue = userData.email;
                    break;
                case 'Nomor Telepon':
                    currentValue = userData.phone;
                    break;
                case 'Tanggal Lahir':
                    currentValue = userData.birthdate;
                    break;
            }
            
            openEditModal(fieldType, currentValue);
        });
    });

    // Action buttons (currently only one for change password)
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionType = this.parentElement.previousElementSibling.textContent;
            
            if (actionType === 'Ubah Kata Sandi') {
                openPasswordModal();
            } else if (actionType === 'Pusat Bantuan') {
                // Redirect to help center or open help modal
                showAlert('Membuka pusat bantuan...');
            }
        });
    });

    // Delete account button
    deleteBtn.addEventListener('click', function() {
        openDeleteModal();
    });

    // Close modals with X button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Close modals with Cancel button
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Save changes from edit modal
    saveBtn.addEventListener('click', function() {
        const fieldType = editFieldName.textContent;
        const newValue = editInput.value.trim();
        
        if (newValue) {
            // Update the user data
            switch(fieldType) {
                case 'Nama Lengkap':
                    userData.name = newValue;
                    document.querySelector('.profile-info h2').textContent = newValue;
                    break;
                case 'Email':
                    userData.email = newValue;
                    document.querySelector('.profile-info p').textContent = newValue;
                    break;
                case 'Nomor Telepon':
                    userData.phone = newValue;
                    break;
                case 'Tanggal Lahir':
                    userData.birthdate = newValue;
                    break;
            }
            
            // Update the displayed value
            const settingItems = document.querySelectorAll('.setting-item');
            settingItems.forEach(item => {
                const label = item.querySelector('.setting-label');
                if (label && label.textContent === fieldType) {
                    const valueEl = item.querySelector('.setting-value');
                    const valueText = valueEl.childNodes[0];
                    if (valueText.nodeType === Node.TEXT_NODE) {
                        valueText.nodeValue = newValue + ' ';
                    }
                }
            });
            
            showAlert('Data berhasil diperbarui!');
            closeAllModals();
        } else {
            showAlert('Nilai tidak boleh kosong!', 'error');
        }
    });

    // Save password changes
    savePasswordBtn.addEventListener('click', function() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            showAlert('Semua kolom harus diisi!', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showAlert('Konfirmasi kata sandi tidak cocok!', 'error');
            return;
        }
        
        // Here you would typically validate the current password against stored password
        // and then update the password in the database
        
        showAlert('Kata sandi berhasil diperbarui!');
        closeAllModals();
    });

    // Confirm account deletion
    confirmDeleteBtn.addEventListener('click', function() {
        // Here you would typically send a request to delete the account
        showAlert('Akun berhasil dihapus!');
        
        // Redirect to login page after a short delay
        setTimeout(function() {
            // window.location.href = 'login.html';
            showAlert('Mengalihkan ke halaman login...');
        }, 2000);
    });

    // Helper functions
    function openEditModal(fieldType, currentValue) {
        editFieldName.textContent = fieldType;
        editInput.value = currentValue;
        editModal.classList.add('show');
    }

    function openPasswordModal() {
        // Clear previous inputs
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
        
        passwordModal.classList.add('show');
    }

    function openDeleteModal() {
        deleteModal.classList.add('show');
    }

    function closeAllModals() {
        editModal.classList.remove('show');
        deleteModal.classList.remove('show');
        passwordModal.classList.remove('show');
    }

    function showAlert(message, type = 'success') {
        // Create alert element
        const alertElement = document.createElement('div');
        alertElement.className = `alert ${type}`;
        alertElement.textContent = message;
        
        // Append to body
        document.body.appendChild(alertElement);
        
        // Add styles
        Object.assign(alertElement.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '1100',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
            transition: 'opacity 0.5s ease'
        });
        
        // Set background color based on type
        if (type === 'success') {
            alertElement.style.backgroundColor = '#28a745';
        } else if (type === 'error') {
            alertElement.style.backgroundColor = '#dc3545';
        }
        
        // Remove after 3 seconds
        setTimeout(() => {
            alertElement.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(alertElement);
            }, 500);
        }, 3000);
    }

    // Prevent form submission on enter key
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                
                // Simulate button click based on context
                if (this.id === 'edit-input') {
                    saveBtn.click();
                } else if (this.id === 'confirm-password') {
                    savePasswordBtn.click();
                }
            }
        });
    });

    // Initialize event listeners for all modals for when they're clicked outside
    [editModal, deleteModal, passwordModal].forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeAllModals();
            }
        });
    });

    // Key press event for ESC key to close modals
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
});