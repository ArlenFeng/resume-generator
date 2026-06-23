// export.js — PDF download using html2pdf.js

function downloadPDF() {
    const element = document.getElementById('resume-preview');
    const name = document.getElementById('name').value || '简历';

    const opt = {
        margin: 0,
        filename: `${name}_简历.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    // Show loading state
    const btn = document.getElementById('btn-download');
    const originalText = btn.textContent;
    btn.textContent = '⏳ 生成中...';
    btn.disabled = true;

    html2pdf().set(opt).from(element).save().then(() => {
        btn.textContent = originalText;
        btn.disabled = false;
    }).catch(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        alert('PDF 生成失败，请重试');
    });
}
