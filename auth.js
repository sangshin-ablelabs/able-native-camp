// ─── ABLE Native Camp — Microsoft Auth (MSAL.js 2.x) ───
// Azure AD 앱 등록 후 아래 값을 수정할 것
const msalConfig = {
  auth: {
    clientId: '51e44845-44ad-42fc-88ed-a491c8c28653',
    authority: 'https://login.microsoftonline.com/0b50e04b-4dc3-4bc5-99f7-09c167ccaba8',  // (주)에이블랩스 테넌트
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const loginRequest = { scopes: ['User.Read'] };

let msalInstance = null;

// MSAL 초기화
function initAuth() {
  if (typeof msal === 'undefined') {
    console.warn('MSAL library not loaded');
    return;
  }
  msalInstance = new msal.PublicClientApplication(msalConfig);

  // 리다이렉트 콜백 처리
  msalInstance.handleRedirectPromise().then(resp => {
    if (resp) {
      msalInstance.setActiveAccount(resp.account);
      saveUserProfile(resp.account);
    }
    updateAuthUI();
  }).catch(err => console.error('Auth redirect error:', err));
}

// 로그인
async function signIn() {
  if (!msalInstance) return;
  try {
    const resp = await msalInstance.loginPopup(loginRequest);
    msalInstance.setActiveAccount(resp.account);
    saveUserProfile(resp.account);
    updateAuthUI();
  } catch (err) {
    console.error('Login failed:', err);
  }
}

// 로그아웃
function signOut() {
  if (!msalInstance) return;
  const account = msalInstance.getActiveAccount();
  msalInstance.logoutPopup({ account }).then(() => {
    localStorage.removeItem('ableCampUser');
    updateAuthUI();
  });
}

// 현재 로그인한 사용자 가져오기
function getCurrentUser() {
  if (msalInstance) {
    const account = msalInstance.getActiveAccount()
      || (msalInstance.getAllAccounts().length > 0 ? msalInstance.getAllAccounts()[0] : null);
    if (account) {
      msalInstance.setActiveAccount(account);
      return {
        id: account.localAccountId || account.homeAccountId,
        name: account.name || account.username,
        email: account.username,
      };
    }
  }
  // fallback: localStorage
  try {
    const saved = localStorage.getItem('ableCampUser');
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

// 프로필 로컬 저장
function saveUserProfile(account) {
  const user = {
    id: account.localAccountId || account.homeAccountId,
    name: account.name || account.username,
    email: account.username,
  };
  localStorage.setItem('ableCampUser', JSON.stringify(user));
}

// nav에 로그인/프로필 UI 삽입
function updateAuthUI() {
  const container = document.getElementById('auth-ui');
  if (!container) return;

  const user = getCurrentUser();
  if (user) {
    const initial = (user.name || user.email || '?')[0].toUpperCase();
    container.innerHTML = `
      <div class="auth-profile" onclick="document.getElementById('auth-dropdown').classList.toggle('show')">
        <div class="auth-avatar">${initial}</div>
        <span class="auth-name">${user.name || user.email}</span>
      </div>
      <div id="auth-dropdown" class="auth-dropdown">
        <div class="auth-dropdown-info">${user.email || ''}</div>
        <button onclick="signOut()" class="auth-dropdown-btn">로그아웃</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button onclick="signIn()" class="auth-login-btn">MS 로그인</button>
    `;
  }
  // 로그인/로그아웃 시 페이지별 render 재실행
  if (typeof render === 'function') render();
}

// 페이지 외부 클릭 시 드롭다운 닫기
document.addEventListener('click', (e) => {
  const dd = document.getElementById('auth-dropdown');
  if (dd && !e.target.closest('.auth-profile') && !e.target.closest('#auth-dropdown')) {
    dd.classList.remove('show');
  }
});

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', initAuth);
