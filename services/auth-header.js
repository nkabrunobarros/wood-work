export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.user) {
      return { Authorization: 'Bearer ' + user.user };
    } else {
      return {};
    }
  }