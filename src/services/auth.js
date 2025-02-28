export const authService = {
  isAuthenticated: false,
  user: null,

  login(username, password) {
    return new Promise((resolve, reject) => {
      if (username === "admin" && password === "password") {
        this.isAuthenticated = true;
        this.user = { username, role: "admin" };
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("isAuthenticated", "true");
        resolve(this.user);
      } else {
        reject(new Error("Invalid credentials"));
      }
    });
  },

  checkAuth() {
    const user = localStorage.getItem("user");
    const isAuth = localStorage.getItem("isAuthenticated");

    if (user && isAuth === "true") {
      this.isAuthenticated = true;
      this.user = JSON.parse(user);
      return true;
    }
    return false;
  },

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  },
};
