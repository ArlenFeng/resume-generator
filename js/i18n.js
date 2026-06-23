// i18n.js — Chinese & English translations

let currentLang = localStorage.getItem('resume_lang') || 'zh';

const T = {
    zh: {
        // Top bar
        title: '📄 简历生成器',
        fillDemo: '📋 填充示例',
        clear: '🗑️ 清空',
        downloadPDF: '⬇️ 下载 PDF',
        langSwitch: 'EN',

        // Form sections
        basicInfo: '👤 基本信息',
        education: '🎓 教育经历',
        experience: '💼 工作/实习经历',
        projects: '🚀 项目经历',
        skills: '🛠️ 技能',

        // Basic fields
        name: '姓名',
        namePH: '张三',
        target: '求职意向',
        targetPH: '前端开发工程师',
        phone: '手机',
        phonePH: '138-0000-0000',
        email: '邮箱',
        emailPH: 'zhangsan@email.com',
        city: '城市',
        cityPH: '北京',
        age: '年龄/生日',
        agePH: '22岁 / 2002.06',
        summary: '个人简介',
        summaryPH: '简要介绍自己的优势和特点...',

        // Photo
        photoUpload: '上传照片',
        photoRemove: '移除',
        photoPlaceholder: '📷<br>点击上传照片',

        // Education fields
        school: '学校',
        schoolPH: 'XX大学',
        date: '时间',
        datePH: '2020.09 - 2024.06',
        major: '专业',
        majorPH: '计算机科学与技术',
        degree: '学历',
        degreePH: '本科',
        eduDesc: '补充说明（选填）',
        eduDescPH: 'GPA、奖学金、相关课程等',

        // Experience fields
        company: '公司',
        companyPH: 'XX科技有限公司',
        expDatePH: '2023.07 - 2023.09',
        position: '职位',
        positionPH: '前端开发实习生',
        expDesc: '工作内容',
        expDescPH: '负责XX项目开发，使用XX技术...',

        // Project fields
        projectName: '项目名称',
        projectNamePH: 'XX管理系统',
        projDatePH: '2023.03 - 2023.06',
        role: '角色',
        rolePH: '前端负责人',
        projDesc: '项目描述',
        projDescPH: '项目介绍、技术栈、成果...',

        // Skills
        skillsLabel: '技能标签（用逗号分隔）',
        skillsPH: 'HTML, CSS, JavaScript, React, Python',

        // Buttons
        addEducation: '+ 添加教育经历',
        addExperience: '+ 添加工作经历',
        addProject: '+ 添加项目',

        // Template bar
        templateLabel: '模板风格：',
        tplClassic: '经典简洁',
        tplModern: '现代双栏',
        tplCreative: '创意设计',
        tplFresh: '简约清新',
        tplBusiness: '商务正式',

        // Template content
        yourName: '你的姓名',
        sectionSummary: '个人简介',
        sectionEducation: '教育经历',
        sectionExperience: '工作/实习经历',
        sectionProjects: '项目经历',
        sectionSkills: '专业技能',
        contactInfo: '联系方式',
        sectionAwards: '荣誉奖项',
        sectionCertificates: '证书资质',
        sectionLanguages: '语言能力',
        sectionHobbies: '兴趣爱好',

        // Confirm
        confirmClear: '确定要清空所有内容吗？',
        pdfFail: 'PDF 生成失败，请重试',
    },
    en: {
        // Top bar
        title: '📄 Resume Builder',
        fillDemo: '📋 Fill Demo',
        clear: '🗑️ Clear',
        downloadPDF: '⬇️ Download PDF',
        langSwitch: '中文',

        // Form sections
        basicInfo: '👤 Basic Info',
        education: '🎓 Education',
        experience: '💼 Work Experience',
        projects: '🚀 Projects',
        skills: '🛠️ Skills',

        // Basic fields
        name: 'Full Name',
        namePH: 'John Smith',
        target: 'Job Target',
        targetPH: 'Frontend Developer',
        phone: 'Phone',
        phonePH: '+1-234-567-8900',
        email: 'Email',
        emailPH: 'john@email.com',
        city: 'City',
        cityPH: 'New York',
        age: 'Age / Birthday',
        agePH: '22 / 2002.06',
        summary: 'Summary',
        summaryPH: 'Brief introduction about your strengths...',

        // Photo
        photoUpload: 'Upload Photo',
        photoRemove: 'Remove',
        photoPlaceholder: '📷<br>Click to upload',

        // Education fields
        school: 'School',
        schoolPH: 'MIT',
        date: 'Period',
        datePH: '2020.09 - 2024.06',
        major: 'Major',
        majorPH: 'Computer Science',
        degree: 'Degree',
        degreePH: 'Bachelor',
        eduDesc: 'Additional Info (optional)',
        eduDescPH: 'GPA, scholarships, relevant coursework...',

        // Experience fields
        company: 'Company',
        companyPH: 'Google',
        expDatePH: '2023.07 - 2023.09',
        position: 'Position',
        positionPH: 'Frontend Intern',
        expDesc: 'Description',
        expDescPH: 'Responsibilities and achievements...',

        // Project fields
        projectName: 'Project Name',
        projectNamePH: 'Task Manager App',
        projDatePH: '2023.03 - 2023.06',
        role: 'Role',
        rolePH: 'Lead Developer',
        projDesc: 'Description',
        projDescPH: 'Tech stack, features, results...',

        // Skills
        skillsLabel: 'Skills (comma separated)',
        skillsPH: 'HTML, CSS, JavaScript, React, Python',

        // Buttons
        addEducation: '+ Add Education',
        addExperience: '+ Add Experience',
        addProject: '+ Add Project',

        // Template bar
        templateLabel: 'Template: ',
        tplClassic: 'Classic',
        tplModern: 'Modern',
        tplCreative: 'Creative',
        tplFresh: 'Fresh',
        tplBusiness: 'Business',

        // Template content
        yourName: 'Your Name',
        sectionSummary: 'Summary',
        sectionEducation: 'Education',
        sectionExperience: 'Work Experience',
        sectionProjects: 'Projects',
        sectionSkills: 'Skills',
        contactInfo: 'Contact',
        sectionAwards: 'Awards',
        sectionCertificates: 'Certificates',
        sectionLanguages: 'Languages',
        sectionHobbies: 'Interests',

        // Confirm
        confirmClear: 'Are you sure you want to clear everything?',
        pdfFail: 'PDF generation failed, please try again',
    }
};

function t(key) {
    return T[currentLang][key] || T['zh'][key] || key;
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('resume_lang', lang);
    updateAllText();
    renderPreview();
}

function updateAllText() {
    // Top bar
    document.querySelector('.top-bar h1').textContent = t('title');
    document.getElementById('btn-fill-demo').textContent = t('fillDemo');
    document.getElementById('btn-clear').textContent = t('clear');
    document.getElementById('btn-download').textContent = t('downloadPDF');
    document.getElementById('btn-lang').textContent = t('langSwitch');

    // Section titles
    const sections = document.querySelectorAll('.form-section h3');
    if (sections[0]) sections[0].textContent = t('basicInfo');
    if (sections[1]) sections[1].textContent = t('education');
    if (sections[2]) sections[2].textContent = t('experience');
    if (sections[3]) sections[3].textContent = t('projects');
    if (sections[4]) sections[4].textContent = t('skills');

    // Photo
    document.getElementById('btn-upload-photo').textContent = t('photoUpload');
    document.getElementById('btn-remove-photo').textContent = t('photoRemove');
    if (!photoData) {
        document.getElementById('photo-preview').innerHTML = `<span class="photo-placeholder">${t('photoPlaceholder')}</span>`;
    }

    // Labels for basic info
    const labels = document.querySelectorAll('.form-section:first-child .form-group label');
    const basicKeys = ['name', 'target', 'phone', 'email', 'city', 'age', 'summary'];
    labels.forEach((label, i) => {
        if (basicKeys[i]) label.textContent = t(basicKeys[i]);
    });

    // Placeholders for basic info
    const basicInputs = ['name', 'target', 'phone', 'email', 'city', 'age', 'summary'];
    basicInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.placeholder = t(id + 'PH');
    });

    // Skills
    const skillsLabel = document.querySelector('.form-section:last-child .form-group label');
    if (skillsLabel) skillsLabel.textContent = t('skillsLabel');
    const skillsInput = document.getElementById('skills');
    if (skillsInput) skillsInput.placeholder = t('skillsPH');

    // Add buttons
    const addBtns = document.querySelectorAll('.btn-add');
    if (addBtns[0]) addBtns[0].textContent = t('addEducation');
    if (addBtns[1]) addBtns[1].textContent = t('addExperience');
    if (addBtns[2]) addBtns[2].textContent = t('addProject');

    // Template buttons
    document.querySelectorAll('.template-btn').forEach(btn => {
        const key = 'tpl' + btn.dataset.template.charAt(0).toUpperCase() + btn.dataset.template.slice(1);
        btn.textContent = t(key);
    });
    document.querySelector('.template-bar span').textContent = t('templateLabel');

    // Repeatable items labels
    updateRepeatableLabels();
}

function updateRepeatableLabels() {
    // Education items
    document.querySelectorAll('#education-list .repeatable-item').forEach(item => {
        const labels = item.querySelectorAll('label');
        if (labels[0]) labels[0].textContent = t('school');
        if (labels[1]) labels[1].textContent = t('date');
        if (labels[2]) labels[2].textContent = t('major');
        if (labels[3]) labels[3].textContent = t('degree');
        if (labels[4]) labels[4].textContent = t('eduDesc');
        const inputs = item.querySelectorAll('input, textarea');
        if (inputs[0]) inputs[0].placeholder = t('schoolPH');
        if (inputs[1]) inputs[1].placeholder = t('datePH');
        if (inputs[2]) inputs[2].placeholder = t('majorPH');
        if (inputs[3]) inputs[3].placeholder = t('degreePH');
        if (inputs[4]) inputs[4].placeholder = t('eduDescPH');
    });

    // Experience items
    document.querySelectorAll('#experience-list .repeatable-item').forEach(item => {
        const labels = item.querySelectorAll('label');
        if (labels[0]) labels[0].textContent = t('company');
        if (labels[1]) labels[1].textContent = t('date');
        if (labels[2]) labels[2].textContent = t('position');
        if (labels[3]) labels[3].textContent = t('expDesc');
        const inputs = item.querySelectorAll('input, textarea');
        if (inputs[0]) inputs[0].placeholder = t('companyPH');
        if (inputs[1]) inputs[1].placeholder = t('expDatePH');
        if (inputs[2]) inputs[2].placeholder = t('positionPH');
        if (inputs[3]) inputs[3].placeholder = t('expDescPH');
    });

    // Project items
    document.querySelectorAll('#project-list .repeatable-item').forEach(item => {
        const labels = item.querySelectorAll('label');
        if (labels[0]) labels[0].textContent = t('projectName');
        if (labels[1]) labels[1].textContent = t('date');
        if (labels[2]) labels[2].textContent = t('role');
        if (labels[3]) labels[3].textContent = t('projDesc');
        const inputs = item.querySelectorAll('input, textarea');
        if (inputs[0]) inputs[0].placeholder = t('projectNamePH');
        if (inputs[1]) inputs[1].placeholder = t('projDatePH');
        if (inputs[2]) inputs[2].placeholder = t('rolePH');
        if (inputs[3]) inputs[3].placeholder = t('projDescPH');
    });
}
