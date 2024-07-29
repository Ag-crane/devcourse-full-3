import { create } from "zustand";

interface StoreState {
    isLoggedIn: boolean; // 상태
    storeLogin: (token: string) => void; // 액션
    storeLogout: () => void; // 액션
}

const getToken = () => {
    return localStorage.getItem("token"); // 없으면 null
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

const removeToken = () => {
    localStorage.removeItem("token");
}

export const useAuthStore = create<StoreState>((set) => ({
    isLoggedIn: getToken() ? true : false,
    storeLogin: (token: string) => {
        set({ isLoggedIn: true });
        setToken(token);
    },
    storeLogout: () => {
        set({ isLoggedIn: false });
        removeToken();
    }
}));
