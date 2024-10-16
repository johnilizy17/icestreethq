import { useEffect } from "react";
import { useRouter } from "next/router";
import useUserDetails from "../hooks/auth.hook";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn, loading } = useUserDetails()
    const router = useRouter();



    useEffect(() => {
        console.log(loading)
        if (loading) return

        if (!isLoggedIn)
            router.push("/login")

    }, [isLoggedIn, loading, router])


    return <>{isLoggedIn && children}</>;
};

export default ProtectedRoute;
