import Cookies from 'js-cookie';
import { isIpAddr } from './string';
// vue中将token存到cookie 使用js-cookie工具
const TokenKey = 'token';
const ExpiresInKey = 'Expires-In';
const domain = getMainDomain();

function getMainDomain(): String {
  let domain = '';
  if (!window) return domain;
  const { hostname } = window.location;
  if (isIpAddr(hostname) || hostname === 'localhost') {
    domain = hostname;
  } else {
    domain = hostname.split('.').slice(-2).join('.');
  }
  return domain;
}

export function getToken() {
  // 获取cookie
  return Cookies.get(TokenKey, { domain, path: '/' });
}

export function setToken(token) {
  // 存入cookie：
  return Cookies.set(TokenKey, token, { domain, path: '/' });
}

export function removeToken() {
  // 删除cookie:
  return Cookies.remove(TokenKey, { domain, path: '/' });
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1;
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time);
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey);
}
