// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../api/auth.api";

export const ProtectedRoute = ({ children }: any) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            await getProfile();
            setIsAuth(true);
        } catch {
            setIsAuth(false);
        }
    };

    if (isAuth === null) return null;

    return isAuth ?
        <div className="protect-container">
            {children}
        </div>
        : <Navigate to="/login" />;
};
