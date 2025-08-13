
const pwd = document.getElementById('pwd');
const meterBar = document.getElementById('meterBar');
const rLen = document.getElementById('rLen');
const rUpper = document.getElementById('rUpper');
const rLower = document.getElementById('rLower');
const rNumber = document.getElementById('rNumber');
const rSpecial = document.getElementById('rSpecial');
const previewBox = document.getElementById('previewBox');
const copyTip = document.getElementById('copyTip');
const warning = document.getElementById('warning');

const togglePwd = document.getElementById('togglePwd');
const genBtn = document.getElementById('genBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const lenInfo = document.getElementById('lenInfo');
const lengthInput = document.getElementById('lengthInput');

const hasUpper = /[A-Z]/;
const hasLower = /[a-z]/;
const hasNum = /[0-9]/;
const hasSpec = /[^A-Za-z0-9]/;

function checkAll() {
    const v = pwd.value;

    if (v.length > 0 && v.length < 6) {
        warning.textContent = 'Please enter a length between 6 and 16.';
    } else {
        warning.textContent = '';
    }

    updateDot(rLen, v.length >= 8);
    updateDot(rUpper, hasUpper.test(v));
    updateDot(rLower, hasLower.test(v));
    updateDot(rNumber, hasNum.test(v));
    updateDot(rSpecial, hasSpec.test(v));

    let score = 0;
    if (v.length >= 8) score++;
    if (hasUpper.test(v)) score++;
    if (hasLower.test(v)) score++;
    if (hasNum.test(v)) score++;
    if (hasSpec.test(v)) score++;

    const pct = (score / 5) * 100;
    meterBar.style.width = pct + '%';
    meterBar.style.background =
        score <= 1 ? 'var(--bad)' :
            score === 2 ? 'var(--warn)' :
                score === 3 ? 'var(--mid)' :
                    score === 4 ? 'var(--accent)' : 'var(--ok)';

    previewBox.textContent = v || '—';

    lenInfo.textContent = `Length: ${v.length}`;
}

function updateDot(el, ok) {
    if (ok) {
        el.classList.remove('bad');
        el.classList.add('ok');
        el.textContent = '✓';
    } else {
        el.classList.remove('ok');
        el.classList.add('bad');
        el.textContent = '✕';
    }
}

function generatePassword(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let pass = "";
    for (let i = 0; i < length; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
}

pwd.addEventListener('input', () => {
    checkAll();
});

togglePwd.addEventListener('click', () => {
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
    togglePwd.textContent = pwd.type === 'password' ? 'Show' : 'Hide';
});

genBtn.addEventListener('click', () => {
    const len = parseInt(lengthInput.value);
    if (isNaN(len) || len < 6 || len > 16) {
        warning.textContent = 'Please enter a length between 6 and 16.';
        return;
    }
    warning.textContent = '';
    pwd.value = generatePassword(len);
    checkAll();
});

copyBtn.addEventListener('click', async () => {
    if (!pwd.value) return;
    try {
        await navigator.clipboard.writeText(pwd.value);
        copyTip.textContent = 'Copied ✓';
        setTimeout(() => copyTip.textContent = '', 2000);
    } catch {
        copyTip.textContent = 'Copy failed';
    }
});

clearBtn.addEventListener('click', () => {
    pwd.value = '';
    checkAll();
    warning.textContent = '';
});

checkAll();
