import { io } from "socket.io-client";
import { store } from "../redux/store";

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnecting = false;
    this.eventHandlers = new Map();
    this.onlineUsersCallback = null;
  }

  connect() {
    if (this.isConnecting) {
      console.log("🔄 [SOCKET] Уже подключаемся...");
      return;
    }

    if (this.socket?.connected) {
      console.log("✅ [SOCKET] Уже подключен");
      return;
    }

    this.isConnecting = true;
    console.log("🔄 [SOCKET] Подключение к серверу...");

    const user = store.getState().auth.user;
    if (!user) {
      console.error("❌ [SOCKET] Пользователь не авторизован");
      this.isConnecting = false;
      return;
    }

    this.socket = io("https://miraplay-back.onrender.com", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      withCredentials: true,
      auth: {
        token: localStorage.getItem("token"),
        user: user,
      },
    });

    this.socket.on("connect", () => {
      console.log("✅ [SOCKET] Подключено к серверу");
      this.isConnecting = false;
      this.emitUserLogin(user);
    });

    this.socket.on("connect_error", (error) => {
      console.error("❌ [SOCKET] Ошибка подключения:", error);
      this.isConnecting = false;
      if (error.message.includes("Unauthorized")) {
        store.dispatch({ type: "auth/clearAuthState" });
      }
    });

    this.socket.on("disconnect", (reason) => {
      console.log("🔌 [SOCKET] Отключено от сервера:", reason);
      this.isConnecting = false;
    });

    this.socket.on("onlineUsers", (users) => {
      console.log("👥 [SOCKET] Получен список пользователей:", users);
      if (this.onlineUsersCallback) {
        this.onlineUsersCallback(users);
      }
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      console.log("🔌 [SOCKET] Отключение...");
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emitUserLogin(user) {
    if (!this.socket?.connected) {
      console.log("🔄 [SOCKET] Сокет не подключен, подключаемся...");
      this.connect();
    }

    console.log("📤 [SOCKET] Отправка данных пользователя:", user);
    this.socket?.emit("userLogin", user);
  }

  emitUserLogout(userId) {
    if (!this.socket?.connected) {
      console.log("🔄 [SOCKET] Сокет не подключен при попытке выхода");
      return;
    }

    console.log("📤 [SOCKET] Отправка события выхода пользователя:", userId);
    this.socket?.emit("userLogout", userId);
    this.disconnect();
  }

  subscribeToOnlineUsers(callback) {
    if (!this.socket?.connected) {
      console.log("🔄 [SOCKET] Сокет не подключен, подключаемся...");
      this.connect();
    }

    this.onlineUsersCallback = callback;
    console.log("👥 [SOCKET] Подписка на обновления онлайн пользователей");
    this.socket?.emit("getUserList");
  }

  unsubscribeFromOnlineUsers() {
    this.onlineUsersCallback = null;
    this.socket?.off("userList");
  }

  subscribe(event, callback) {
    if (!this.socket?.connected) {
      console.log("🔄 [SOCKET] Сокет не подключен, подключаемся...");
      this.connect();
    }

    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }

    const handlers = this.eventHandlers.get(event);
    handlers.add(callback);

    this.socket?.on(event, callback);
  }

  unsubscribe(event, callback) {
    if (!this.socket) return;

    if (callback) {
      const handlers = this.eventHandlers.get(event);
      if (handlers) {
        handlers.delete(callback);
        this.socket.off(event, callback);
      }
    } else {
      this.eventHandlers.delete(event);
      this.socket.off(event);
    }
  }
}

export const socketService = new SocketService();
