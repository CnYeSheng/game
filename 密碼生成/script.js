// 获取 DOM 元素
const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const lengthInput = document.getElementById('length');

// 字符集合
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
// 生成密码函数
function generatePassword() {
  let chars = '';
  let password = '';

  // 根据选项构建字符集合
  if (uppercaseCheckbox.checked) chars += uppercaseChars;
  if (lowercaseCheckbox.checked) chars += lowercaseChars;
  if (numbersCheckbox.checked) chars += numberChars;
  if (symbolsCheckbox.checked) {
    // 移除容易混淆的字符
    const filteredSymbols = symbolChars.replace(/[il\\/'"]/g, '');
    chars += filteredSymbols;
  }

  // 如果没有选择任何选项，显示错误提示
  if (chars.length === 0) {
    Swal.fire({
      title: '错误',
      text: '请选择至少一个选项',
      icon: 'error',
    });
    return;
  }

  // 生成密码
  const length = lengthInput.value;
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // 更新密码输入框
  passwordInput.value = password;
}

// 复制密码函数
function copyPassword() {
  passwordInput.select();
  document.execCommand('copy');
  Swal.fire({
    title: '成功',
    text: '密码已复制到剪贴板',
    icon: 'success',
  });
}

// 事件监听器
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);