import api from "../services/api";

export const authService = {
  isAuthenticated: false,
  user: null,

  async login(username, password) {
    try {
      const obj = await api.post("/v1/auth/login", {
        username: username,
        password: password,
      });
      return new Promise((resolve, reject) => {
        this.isAuthenticated = true;
        this.user = { username, role: "admin" };
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("isAuthenticated", "true");
        resolve(this.user);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(new Error("Invalid credentials"));
      });
    }
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
