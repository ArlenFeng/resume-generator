// app.js — Main application logic

const STORAGE_KEY = 'resume_generator_data';
let currentTemplate = 'classic';
let photoData = ''; // base64 data URL

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    bindEvents();
    addDefaultItems();
    renderPreview();
});

// ========== Event Bindings ==========
function bindEvents() {
    // Form inputs → live preview
    document.querySelector('.form-panel').addEventListener('input', () => {
        renderPreview();
        saveData();
    });

    // Template switch
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTemplate = btn.dataset.template;
            renderPreview();
        });
    });

    // Buttons
    document.getElementById('btn-download').addEventListener('click', downloadPDF);
    document.getElementById('btn-fill-demo').addEventListener('click', fillDemo);
    document.getElementById('btn-clear').addEventListener('click', clearAll);

    // Photo upload
    const photoInput = document.getElementById('photo-input');
    const photoPreview = document.getElementById('photo-preview');
    const btnUpload = document.getElementById('btn-upload-photo');
    const btnRemove = document.getElementById('btn-remove-photo');

    btnUpload.addEventListener('click', () => photoInput.click());
    photoPreview.addEventListener('click', () => photoInput.click());

    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            photoData = ev.target.result;
            updatePhotoPreview();
            renderPreview();
            saveData();
        };
        reader.readAsDataURL(file);
    });

    btnRemove.addEventListener('click', () => {
        photoData = '';
        photoInput.value = '';
        updatePhotoPreview();
        renderPreview();
        saveData();
    });
}

// ========== Render Preview ==========
function renderPreview() {
    const data = collectData();
    const preview = document.getElementById('resume-preview');
    preview.innerHTML = Templates[currentTemplate](data);
}

// ========== Collect Form Data ==========
function collectData() {
    return {
        name: val('name'),
        target: val('target'),
        phone: val('phone'),
        email: val('email'),
        city: val('city'),
        age: val('age'),
        summary: val('summary'),
        photo: photoData,
        education: collectRepeatable('education', ['school', 'major', 'degree', 'date', 'desc']),
        experience: collectRepeatable('experience', ['company', 'position', 'date', 'desc']),
        projects: collectRepeatable('project', ['name', 'role', 'date', 'desc']),
        skills: val('skills').split(/[,，]/).map(s => s.trim()).filter(Boolean)
    };
}

// ========== Photo Preview ==========
function updatePhotoPreview() {
    const preview = document.getElementById('photo-preview');
    const btnRemove = document.getElementById('btn-remove-photo');
    if (photoData) {
        preview.innerHTML = `<img src="${photoData}" alt="照片">`;
        btnRemove.style.display = '';
    } else {
        preview.innerHTML = '<span class="photo-placeholder">📷<br>点击上传照片</span>';
        btnRemove.style.display = 'none';
    }
}

function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

function collectRepeatable(prefix, fields) {
    const items = [];
    const container = document.getElementById(prefix + '-list');
    if (!container) return items;
    container.querySelectorAll('.repeatable-item').forEach(item => {
        const entry = {};
        let hasValue = false;
        fields.forEach(f => {
            const input = item.querySelector(`[data-field="${f}"]`);
            entry[f] = input ? input.value.trim() : '';
            if (entry[f]) hasValue = true;
        });
        if (hasValue) items.push(entry);
    });
    return items;
}

// ========== Repeatable Items ==========
function addEducation(data = {}) {
    const container = document.getElementById('education-list');
    const item = document.createElement('div');
    item.className = 'repeatable-item';
    item.innerHTML = `
        <button class="btn-remove" onclick="this.parentElement.remove();renderPreview();saveData();">×</button>
        <div class="form-row">
            <div class="form-group">
                <label>学校</label>
                <input type="text" data-field="school" placeholder="XX大学" value="${esc(data.school || '')}">
            </div>
            <div class="form-group">
                <label>时间</label>
                <input type="text" data-field="date" placeholder="2020.09 - 2024.06" value="${esc(data.date || '')}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>专业</label>
                <input type="text" data-field="major" placeholder="计算机科学与技术" value="${esc(data.major || '')}">
            </div>
            <div class="form-group">
                <label>学历</label>
                <input type="text" data-field="degree" placeholder="本科" value="${esc(data.degree || '')}">
            </div>
        </div>
        <div class="form-group">
            <label>补充说明（选填）</label>
            <textarea data-field="desc" rows="2" placeholder="GPA、奖学金、相关课程等">${esc(data.desc || '')}</textarea>
        </div>
    `;
    container.appendChild(item);
}

function addExperience(data = {}) {
    const container = document.getElementById('experience-list');
    const item = document.createElement('div');
    item.className = 'repeatable-item';
    item.innerHTML = `
        <button class="btn-remove" onclick="this.parentElement.remove();renderPreview();saveData();">×</button>
        <div class="form-row">
            <div class="form-group">
                <label>公司</label>
                <input type="text" data-field="company" placeholder="XX科技有限公司" value="${esc(data.company || '')}">
            </div>
            <div class="form-group">
                <label>时间</label>
                <input type="text" data-field="date" placeholder="2023.07 - 2023.09" value="${esc(data.date || '')}">
            </div>
        </div>
        <div class="form-group">
            <label>职位</label>
            <input type="text" data-field="position" placeholder="前端开发实习生" value="${esc(data.position || '')}">
        </div>
        <div class="form-group">
            <label>工作内容</label>
            <textarea data-field="desc" rows="3" placeholder="负责XX项目开发，使用XX技术...">${esc(data.desc || '')}</textarea>
        </div>
    `;
    container.appendChild(item);
}

function addProject(data = {}) {
    const container = document.getElementById('project-list');
    const item = document.createElement('div');
    item.className = 'repeatable-item';
    item.innerHTML = `
        <button class="btn-remove" onclick="this.parentElement.remove();renderPreview();saveData();">×</button>
        <div class="form-row">
            <div class="form-group">
                <label>项目名称</label>
                <input type="text" data-field="name" placeholder="XX管理系统" value="${esc(data.name || '')}">
            </div>
            <div class="form-group">
                <label>时间</label>
                <input type="text" data-field="date" placeholder="2023.03 - 2023.06" value="${esc(data.date || '')}">
            </div>
        </div>
        <div class="form-group">
            <label>角色</label>
            <input type="text" data-field="role" placeholder="前端负责人" value="${esc(data.role || '')}">
        </div>
        <div class="form-group">
            <label>项目描述</label>
            <textarea data-field="desc" rows="3" placeholder="项目介绍、技术栈、成果...">${esc(data.desc || '')}</textarea>
        </div>
    `;
    container.appendChild(item);
}

function addDefaultItems() {
    // Only add if containers are empty
    if (document.getElementById('education-list').children.length === 0) addEducation();
    if (document.getElementById('experience-list').children.length === 0) addExperience();
    if (document.getElementById('project-list').children.length === 0) addProject();
}

// ========== Local Storage ==========
function saveData() {
    const data = collectData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
        const data = JSON.parse(saved);
        // Basic fields
        ['name', 'target', 'phone', 'email', 'city', 'age', 'summary', 'skills'].forEach(f => {
            const el = document.getElementById(f);
            if (el && data[f]) el.value = Array.isArray(data[f]) ? data[f].join(', ') : data[f];
        });
        // Photo
        if (data.photo) {
            photoData = data.photo;
            updatePhotoPreview();
        }
        // Repeatable items
        if (data.education && data.education.length) {
            document.getElementById('education-list').innerHTML = '';
            data.education.forEach(e => addEducation(e));
        }
        if (data.experience && data.experience.length) {
            document.getElementById('experience-list').innerHTML = '';
            data.experience.forEach(e => addExperience(e));
        }
        if (data.projects && data.projects.length) {
            document.getElementById('project-list').innerHTML = '';
            data.projects.forEach(p => addProject(p));
        }
    } catch (e) {
        console.warn('Failed to load saved data:', e);
    }
}

// ========== Demo Data ==========
function fillDemo() {
    document.getElementById('name').value = '张三';
    document.getElementById('target').value = '前端开发工程师';
    document.getElementById('phone').value = '138-0000-1234';
    document.getElementById('email').value = 'zhangsan@email.com';
    document.getElementById('city').value = '北京';
    document.getElementById('age').value = '22岁 / 2002.06';
    document.getElementById('summary').value = '计算机科学与技术专业本科在读，热爱前端开发，熟悉 React、Vue 等主流框架。有良好的学习能力和团队协作精神，参与过多个实际项目的开发。';
    document.getElementById('skills').value = 'HTML, CSS, JavaScript, React, Vue, Node.js, Git, Python';

    // Education
    document.getElementById('education-list').innerHTML = '';
    addEducation({
        school: '北京理工大学',
        major: '计算机科学与技术',
        degree: '本科',
        date: '2020.09 - 2024.06',
        desc: 'GPA 3.6/4.0，获校级二等奖学金，ACM程序设计竞赛省级铜奖'
    });

    // Experience
    document.getElementById('experience-list').innerHTML = '';
    addExperience({
        company: '字节跳动',
        position: '前端开发实习生',
        date: '2023.07 - 2023.09',
        desc: '• 参与公司内部管理系统的前端开发，使用 React + TypeScript\n• 负责用户权限模块的页面开发与联调\n• 优化页面加载性能，首屏加载时间减少 30%'
    });

    // Projects
    document.getElementById('project-list').innerHTML = '';
    addProject({
        name: '在线协作文档编辑器',
        role: '前端负责人',
        date: '2023.03 - 2023.06',
        desc: '• 基于 React + WebSocket 实现实时协作编辑功能\n• 使用 Operational Transformation 算法处理冲突\n• 支持多人同时编辑、光标显示、版本回退等功能'
    });

    renderPreview();
    saveData();
}

// ========== Clear All ==========
function clearAll() {
    if (!confirm('确定要清空所有内容吗？')) return;
    ['name', 'target', 'phone', 'email', 'city', 'age', 'summary', 'skills'].forEach(f => {
        const el = document.getElementById(f);
        if (el) el.value = '';
    });
    photoData = '';
    document.getElementById('photo-input').value = '';
    updatePhotoPreview();
    document.getElementById('education-list').innerHTML = '';
    document.getElementById('experience-list').innerHTML = '';
    document.getElementById('project-list').innerHTML = '';
    addDefaultItems();
    renderPreview();
    localStorage.removeItem(STORAGE_KEY);
}
