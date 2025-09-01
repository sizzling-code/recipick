import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        console.log('done');

        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            console.log(token)

            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            console.log('yes', 'token exists')

            try {
                console.log('yayy, still token');
                
                const res = await fetch("https://list-la.onrender.com/user-home", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                console.log(res)


                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem("token");
                }
            } catch (err) {
                console.error(err);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
