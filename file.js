// File Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    createDragonSeeds();
    
    // File upload elements
    const fileInput = document.getElementById('work-attachment');
    const uploadBox = document.getElementById('file-upload-box');
    const fileList = document.getElementById('file-list');
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    
    // Click on upload box to trigger file input
    uploadBox.addEventListener('click', () => fileInput.click());
    
    // Drag and drop functionality
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    });
    
    // Handle file input change
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    function handleFiles(files) {
        for (let file of files) {
            // Check file size
            if (file.size > maxSize) {
                alert(`File "${file.name}" exceeds 10MB limit. Please upload a smaller file.`);
                continue;
            }
            
            // Check file type
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'image/jpeg',
                'image/jpg',
                'image/png',
                'application/zip',
                'application/x-rar-compressed'
            ];
            
            if (!allowedTypes.includes(file.type)) {
                alert(`File "${file.name}" has an unsupported file type.`);
                continue;
            }
            
            addFileToList(file);
        }
        
        // Reset input to allow uploading same file again
        fileInput.value = '';
    }
    
    function addFileToList(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileSize = formatFileSize(file.size);
        const fileIcon = getFileIcon(file.type);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">${fileIcon}</span>
                <div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${fileSize}</div>
                </div>
            </div>
            <button type="button" class="file-remove" title="Remove file">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Remove file button
        fileItem.querySelector('.file-remove').addEventListener('click', () => {
            fileItem.remove();
        });
        
        fileList.appendChild(fileItem);
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function getFileIcon(fileType) {
        if (fileType.includes('pdf')) return '<i class="fas fa-file-pdf"></i>';
        if (fileType.includes('word') || fileType.includes('document')) return '<i class="fas fa-file-word"></i>';
        if (fileType.includes('image')) return '<i class="fas fa-file-image"></i>';
        if (fileType.includes('zip') || fileType.includes('rar')) return '<i class="fas fa-file-archive"></i>';
        return '<i class="fas fa-file"></i>';
    }
});