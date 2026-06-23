// templates.js — 5 resume template renderers

const Templates = {
    // ========== Template 1: Classic ==========
    classic(data) {
        const { name, target, phone, email, city, age, summary, education, experience, projects, skills, photo } = data;
        let html = '<div class="tpl-classic">';

        // Header
        html += '<div class="header">';
        if (photo) html += `<div class="header-photo"><img src="${photo}" alt="photo"></div>`;
        html += `<h1>${esc(name) || t('yourName')}</h1>`;
        if (target) html += `<div class="target">${esc(target)}</div>`;
        const contacts = [];
        if (phone) contacts.push('📱 ' + esc(phone));
        if (email) contacts.push('✉️ ' + esc(email));
        if (city) contacts.push('📍 ' + esc(city));
        if (age) contacts.push('🎂 ' + esc(age));
        if (contacts.length) html += `<div class="contact-row">${contacts.join('　')}</div>`;
        html += '</div>';

        // Summary
        if (summary) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionSummary')}</div>`;
            html += `<div class="item-desc">${esc(summary)}</div>`;
            html += '</div>';
        }

        // Education
        if (hasItems(education)) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionEducation')}</div>`;
            education.forEach(e => {
                html += '<div class="item-header">';
                html += `<div><span class="item-title">${esc(e.school)}</span>`;
                if (e.major) html += `<span class="item-subtitle">　·　${esc(e.major)}</span>`;
                if (e.degree) html += `<span class="item-subtitle">　·　${esc(e.degree)}</span>`;
                html += '</div>';
                if (e.date) html += `<span class="item-date">${esc(e.date)}</span>`;
                html += '</div>';
                if (e.desc) html += `<div class="item-desc">${esc(e.desc)}</div>`;
            });
            html += '</div>';
        }

        // Experience
        if (hasItems(experience)) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionExperience')}</div>`;
            experience.forEach(e => {
                html += '<div class="item-header">';
                html += `<div><span class="item-title">${esc(e.company)}</span>`;
                if (e.position) html += `<span class="item-subtitle">　·　${esc(e.position)}</span>`;
                html += '</div>';
                if (e.date) html += `<span class="item-date">${esc(e.date)}</span>`;
                html += '</div>';
                if (e.desc) html += `<div class="item-desc">${esc(e.desc)}</div>`;
            });
            html += '</div>';
        }

        // Projects
        if (hasItems(projects)) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionProjects')}</div>`;
            projects.forEach(p => {
                html += '<div class="item-header">';
                html += `<div><span class="item-title">${esc(p.name)}</span>`;
                if (p.role) html += `<span class="item-subtitle">　·　${esc(p.role)}</span>`;
                html += '</div>';
                if (p.date) html += `<span class="item-date">${esc(p.date)}</span>`;
                html += '</div>';
                if (p.desc) html += `<div class="item-desc">${esc(p.desc)}</div>`;
            });
            html += '</div>';
        }

        // Skills
        if (skills && skills.length) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionSkills')}</div>`;
            html += '<div class="skills-list">';
            skills.forEach(s => { html += `<span class="skill-tag">${esc(s)}</span>`; });
            html += '</div></div>';
        }

        // Extra sections
        html += renderExtraSections(data, { section: 'section', sectionTitle: 'section-title' });

        html += '</div>';
        return html;
    },

    // ========== Template 2: Modern (Two-column) ==========
    modern(data) {
        const { name, target, phone, email, city, age, summary, education, experience, projects, skills, photo } = data;
        let html = '<div class="tpl-modern">';

        // Sidebar
        html += '<div class="sidebar">';
        html += '<div class="avatar-area">';
        if (photo) html += `<div class="sidebar-photo"><img src="${photo}" alt="照片"></div>`;
        html += `<h1>${esc(name) || t('yourName')}</h1>`;
        if (target) html += `<div class="target">${esc(target)}</div>`;
        html += '</div>';

        // Contact info in sidebar
        html += `<div class="info-block"><h3>${t('contactInfo')}</h3>`;
        if (phone) html += `<div class="info-item">📱 ${esc(phone)}</div>`;
        if (email) html += `<div class="info-item">✉️ ${esc(email)}</div>`;
        if (city) html += `<div class="info-item">📍 ${esc(city)}</div>`;
        if (age) html += `<div class="info-item">🎂 ${esc(age)}</div>`;
        html += '</div>';

        // Skills in sidebar
        if (skills && skills.length) {
            html += `<div class="info-block"><h3>${t('sectionSkills')}</h3>`;
            skills.forEach(s => { html += `<span class="skill-tag">${esc(s)}</span>`; });
            html += '</div>';
        }
        html += '</div>';

        // Main content
        html += '<div class="main-content">';

        if (summary) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionSummary')}</div>`;
            html += `<div class="item-desc">${esc(summary)}</div>`;
            html += '</div>';
        }

        if (hasItems(education)) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionEducation')}</div>`;
            education.forEach(e => {
                html += '<div class="item-header">';
                html += `<div><span class="item-title">${esc(e.school)}</span>`;
                if (e.major) html += `<span class="item-subtitle">　·　${esc(e.major)}</span>`;
                if (e.degree) html += `<span class="item-subtitle">　·　${esc(e.degree)}</span>`;
                html += '</div>';
                if (e.date) html += `<span class="item-date">${esc(e.date)}</span>`;
                html += '</div>';
                if (e.desc) html += `<div class="item-desc">${esc(e.desc)}</div>`;
            });
            html += '</div>';
        }

        if (hasItems(experience)) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionExperience')}</div>`;
            experience.forEach(e => {
                html += '<div class="item-header">';
                html += `<div><span class="item-title">${esc(e.company)}</span>`;
                if (e.position) html += `<span class="item-subtitle">　·　${esc(e.position)}</span>`;
                html += '</div>';
                if (e.date) html += `<span class="item-date">${esc(e.date)}</span>`;
                html += '</div>';
                if (e.desc) html += `<div class="item-desc">${esc(e.desc)}</div>`;
            });
            html += '</div>';
        }

        if (hasItems(projects)) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionProjects')}</div>`;
            projects.forEach(p => {
                html += '<div class="item-header">';
                html += `<div><span class="item-title">${esc(p.name)}</span>`;
                if (p.role) html += `<span class="item-subtitle">　·　${esc(p.role)}</span>`;
                html += '</div>';
                if (p.date) html += `<span class="item-date">${esc(p.date)}</span>`;
                html += '</div>';
                if (p.desc) html += `<div class="item-desc">${esc(p.desc)}</div>`;
            });
            html += '</div>';
        }

        // Extra sections
        html += renderExtraSections(data, { section: 'section', sectionTitle: 'section-title' });

        html += '</div></div>';
        return html;
    },

    // ========== Template 3: Creative ==========
    creative(data) {
        const { name, target, phone, email, city, age, summary, education, experience, projects, skills, photo } = data;
        let html = '<div class="tpl-creative">';

        // Hero header
        html += '<div class="hero">';
        if (photo) html += `<div class="hero-photo"><img src="${photo}" alt="照片"></div>`;
        html += `<h1>${esc(name) || t('yourName')}</h1>`;
        if (target) html += `<div class="target">${esc(target)}</div>`;
        const contacts = [];
        if (phone) contacts.push('📱 ' + esc(phone));
        if (email) contacts.push('✉️ ' + esc(email));
        if (city) contacts.push('📍 ' + esc(city));
        if (age) contacts.push('🎂 ' + esc(age));
        if (contacts.length) html += `<div class="contact-row">${contacts.join('　')}</div>`;
        html += '</div>';

        // Body
        html += '<div class="body">';

        if (summary) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionSummary')}</div>`;
            html += `<div class="item-desc">${esc(summary)}</div>`;
            html += '</div>';
        }

        if (hasItems(education)) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionEducation')}</div>`;
            education.forEach(e => {
                html += '<div class="card">';
                html += '<div class="item-header">';
                html += `<div><span class="item-title">${esc(e.school)}</span>`;
                if (e.major) html += `<span class="item-subtitle">　·　${esc(e.major)}</span>`;
                if (e.degree) html += `<span class="item-subtitle">　·　${esc(e.degree)}</span>`;
                html += '</div>';
                if (e.date) html += `<span class="item-date">${esc(e.date)}</span>`;
                html += '</div>';
                if (e.desc) html += `<div class="item-desc">${esc(e.desc)}</div>`;
                html += '</div>';
            });
            html += '</div>';
        }

        if (hasItems(experience)) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionExperience')}</div>`;
            experience.forEach(e => {
                html += '<div class="card">';
                html += '<div class="item-header">';
                html += `<div><span class="item-title">${esc(e.company)}</span>`;
                if (e.position) html += `<span class="item-subtitle">　·　${esc(e.position)}</span>`;
                html += '</div>';
                if (e.date) html += `<span class="item-date">${esc(e.date)}</span>`;
                html += '</div>';
                if (e.desc) html += `<div class="item-desc">${esc(e.desc)}</div>`;
                html += '</div>';
            });
            html += '</div>';
        }

        if (hasItems(projects)) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionProjects')}</div>`;
            projects.forEach(p => {
                html += '<div class="card">';
                html += '<div class="item-header">';
                html += `<div><span class="item-title">${esc(p.name)}</span>`;
                if (p.role) html += `<span class="item-subtitle">　·　${esc(p.role)}</span>`;
                html += '</div>';
                if (p.date) html += `<span class="item-date">${esc(p.date)}</span>`;
                html += '</div>';
                if (p.desc) html += `<div class="item-desc">${esc(p.desc)}</div>`;
                html += '</div>';
            });
            html += '</div>';
        }

        if (skills && skills.length) {
            html += '<div class="section">';
            html += `<div class="section-title">${t('sectionSkills')}</div>`;
            html += '<div class="skills-list">';
            skills.forEach(s => { html += `<span class="skill-tag">${esc(s)}</span>`; });
            html += '</div></div>';
        }

        // Extra sections
        html += renderExtraSections(data, { section: 'section', sectionTitle: 'section-title' });

        html += '</div></div>';
        return html;
    },

    // ========== Template 4: Fresh (简约清新) ==========
    fresh(data) {
        const { name, target, phone, email, city, age, summary, education, experience, projects, skills, photo } = data;
        let html = '<div class="tpl-fresh">';

        // Top bar with photo
        html += '<div class="fresh-header">';
        html += '<div class="fresh-header-left">';
        if (photo) html += `<div class="fresh-photo"><img src="${photo}" alt="照片"></div>`;
        html += '<div>';
        html += `<h1>${esc(name) || t('yourName')}</h1>`;
        if (target) html += `<div class="fresh-target">${esc(target)}</div>`;
        html += '</div></div>';
        const contacts = [];
        if (phone) contacts.push('📱 ' + esc(phone));
        if (email) contacts.push('✉️ ' + esc(email));
        if (city) contacts.push('📍 ' + esc(city));
        if (age) contacts.push('🎂 ' + esc(age));
        if (contacts.length) html += `<div class="fresh-contacts">${contacts.join('<br>')}</div>`;
        html += '</div>';

        // Body
        html += '<div class="fresh-body">';

        if (summary) {
            html += '<div class="fresh-section">';
            html += `<div class="fresh-section-title">💡 ${t('sectionSummary')}</div>`;
            html += `<div class="fresh-desc">${esc(summary)}</div>`;
            html += '</div>';
        }

        if (hasItems(education)) {
            html += '<div class="fresh-section">';
            html += `<div class="fresh-section-title">🎓 ${t('sectionEducation')}</div>`;
            education.forEach(e => {
                html += '<div class="fresh-item">';
                html += '<div class="fresh-item-top">';
                html += `<span class="fresh-item-name">${esc(e.school)}</span>`;
                if (e.date) html += `<span class="fresh-item-date">${esc(e.date)}</span>`;
                html += '</div>';
                const sub = [e.major, e.degree].filter(Boolean).map(esc).join(' · ');
                if (sub) html += `<div class="fresh-item-sub">${sub}</div>`;
                if (e.desc) html += `<div class="fresh-desc">${esc(e.desc)}</div>`;
                html += '</div>';
            });
            html += '</div>';
        }

        if (hasItems(experience)) {
            html += '<div class="fresh-section">';
            html += `<div class="fresh-section-title">💼 ${t('sectionExperience')}</div>`;
            experience.forEach(e => {
                html += '<div class="fresh-item">';
                html += '<div class="fresh-item-top">';
                html += `<span class="fresh-item-name">${esc(e.company)}</span>`;
                if (e.date) html += `<span class="fresh-item-date">${esc(e.date)}</span>`;
                html += '</div>';
                if (e.position) html += `<div class="fresh-item-sub">${esc(e.position)}</div>`;
                if (e.desc) html += `<div class="fresh-desc">${esc(e.desc)}</div>`;
                html += '</div>';
            });
            html += '</div>';
        }

        if (hasItems(projects)) {
            html += '<div class="fresh-section">';
            html += `<div class="fresh-section-title">🚀 ${t('sectionProjects')}</div>`;
            projects.forEach(p => {
                html += '<div class="fresh-item">';
                html += '<div class="fresh-item-top">';
                html += `<span class="fresh-item-name">${esc(p.name)}</span>`;
                if (p.date) html += `<span class="fresh-item-date">${esc(p.date)}</span>`;
                html += '</div>';
                if (p.role) html += `<div class="fresh-item-sub">${esc(p.role)}</div>`;
                if (p.desc) html += `<div class="fresh-desc">${esc(p.desc)}</div>`;
                html += '</div>';
            });
            html += '</div>';
        }

        if (skills && skills.length) {
            html += '<div class="fresh-section">';
            html += `<div class="fresh-section-title">🛠️ ${t('sectionSkills')}</div>`;
            html += '<div class="fresh-skills">';
            skills.forEach(s => { html += `<span class="fresh-skill">${esc(s)}</span>`; });
            html += '</div></div>';
        }

        // Extra sections
        html += renderExtraSections(data, { section: 'fresh-section', sectionTitle: 'fresh-section-title', skillsList: 'fresh-skills', skillTag: 'fresh-skill' });

        html += '</div></div>';
        return html;
    },

    // ========== Template 5: Business (商务正式) ==========
    business(data) {
        const { name, target, phone, email, city, age, summary, education, experience, projects, skills, photo } = data;
        let html = '<div class="tpl-business">';

        // Dark header
        html += '<div class="biz-header">';
        if (photo) html += `<div class="biz-photo"><img src="${photo}" alt="照片"></div>`;
        html += '<div class="biz-header-info">';
        html += `<h1>${esc(name) || t('yourName')}</h1>`;
        if (target) html += `<div class="biz-target">${esc(target)}</div>`;
        html += '<div class="biz-contact">';
        if (phone) html += `<span>📱 ${esc(phone)}</span>`;
        if (email) html += `<span>✉️ ${esc(email)}</span>`;
        if (city) html += `<span>📍 ${esc(city)}</span>`;
        if (age) html += `<span>🎂 ${esc(age)}</span>`;
        html += '</div></div></div>';

        // Body
        html += '<div class="biz-body">';

        if (summary) {
            html += '<div class="biz-section">';
            html += `<div class="biz-section-title">${t('sectionSummary')}</div>`;
            html += `<div class="biz-desc">${esc(summary)}</div>`;
            html += '</div>';
        }

        if (hasItems(education)) {
            html += '<div class="biz-section">';
            html += `<div class="biz-section-title">${t('sectionEducation')}</div>`;
            education.forEach(e => {
                html += '<div class="biz-item">';
                html += '<div class="biz-item-header">';
                html += `<span class="biz-item-title">${esc(e.school)}</span>`;
                if (e.date) html += `<span class="biz-item-date">${esc(e.date)}</span>`;
                html += '</div>';
                const sub = [e.major, e.degree].filter(Boolean).map(esc).join(' · ');
                if (sub) html += `<div class="biz-item-sub">${sub}</div>`;
                if (e.desc) html += `<div class="biz-desc">${esc(e.desc)}</div>`;
                html += '</div>';
            });
            html += '</div>';
        }

        if (hasItems(experience)) {
            html += '<div class="biz-section">';
            html += `<div class="biz-section-title">${t('sectionExperience')}</div>`;
            experience.forEach(e => {
                html += '<div class="biz-item">';
                html += '<div class="biz-item-header">';
                html += `<span class="biz-item-title">${esc(e.company)}</span>`;
                if (e.date) html += `<span class="biz-item-date">${esc(e.date)}</span>`;
                html += '</div>';
                if (e.position) html += `<div class="biz-item-sub">${esc(e.position)}</div>`;
                if (e.desc) html += `<div class="biz-desc">${esc(e.desc)}</div>`;
                html += '</div>';
            });
            html += '</div>';
        }

        if (hasItems(projects)) {
            html += '<div class="biz-section">';
            html += `<div class="biz-section-title">${t('sectionProjects')}</div>`;
            projects.forEach(p => {
                html += '<div class="biz-item">';
                html += '<div class="biz-item-header">';
                html += `<span class="biz-item-title">${esc(p.name)}</span>`;
                if (p.date) html += `<span class="biz-item-date">${esc(p.date)}</span>`;
                html += '</div>';
                if (p.role) html += `<div class="biz-item-sub">${esc(p.role)}</div>`;
                if (p.desc) html += `<div class="biz-desc">${esc(p.desc)}</div>`;
                html += '</div>';
            });
            html += '</div>';
        }

        if (skills && skills.length) {
            html += '<div class="biz-section">';
            html += `<div class="biz-section-title">${t('sectionSkills')}</div>`;
            html += '<div class="biz-skills">';
            skills.forEach(s => { html += `<span class="biz-skill">${esc(s)}</span>`; });
            html += '</div></div>';
        }

        // Extra sections
        html += renderExtraSections(data, { section: 'biz-section', sectionTitle: 'biz-section-title', skillsList: 'biz-skills', skillTag: 'biz-skill' });

        html += '</div></div>';
        return html;
    }
};

// ========== Helpers ==========
function esc(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function hasItems(arr) {
    return arr && arr.length > 0 && arr.some(item => {
        return Object.values(item).some(v => v && v.trim());
    });
}

// Render new sections (awards, certificates, languages, hobbies)
function renderExtraSections(data, style) {
    const { awards, certificates, languages, hobbies } = data;
    let html = '';

    if (hasItems(awards)) {
        html += `<div class="${style.section}">`;
        html += `<div class="${style.sectionTitle}">${t('sectionAwards')}</div>`;
        awards.forEach(a => {
            html += `<div class="${style.item || ''}">`;
            html += '<div class="item-header">';
            html += `<span class="item-title">${esc(a.title)}</span>`;
            if (a.date) html += `<span class="item-date">${esc(a.date)}</span>`;
            html += '</div>';
            if (a.desc) html += `<div class="item-desc">${esc(a.desc)}</div>`;
            html += '</div>';
        });
        html += '</div>';
    }

    if (certificates && certificates.length) {
        html += `<div class="${style.section}">`;
        html += `<div class="${style.sectionTitle}">${t('sectionCertificates')}</div>`;
        html += `<div class="${style.skillsList || 'skills-list'}">`;
        certificates.forEach(s => { html += `<span class="${style.skillTag || 'skill-tag'}">${esc(s)}</span>`; });
        html += '</div></div>';
    }

    if (languages && languages.length) {
        html += `<div class="${style.section}">`;
        html += `<div class="${style.sectionTitle}">${t('sectionLanguages')}</div>`;
        html += `<div class="${style.skillsList || 'skills-list'}">`;
        languages.forEach(s => { html += `<span class="${style.skillTag || 'skill-tag'}">${esc(s)}</span>`; });
        html += '</div></div>';
    }

    if (hobbies && hobbies.length) {
        html += `<div class="${style.section}">`;
        html += `<div class="${style.sectionTitle}">${t('sectionHobbies')}</div>`;
        html += `<div class="${style.skillsList || 'skills-list'}">`;
        hobbies.forEach(s => { html += `<span class="${style.skillTag || 'skill-tag'}">${esc(s)}</span>`; });
        html += '</div></div>';
    }

    return html;
}
