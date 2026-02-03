import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('factsscan_user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('factsscan_user');
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Get all registered users
        const users = JSON.parse(localStorage.getItem('factsscan_users') || '[]');

        // Find user with matching email and password
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const userData = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('factsscan_user', JSON.stringify(userData));
            return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    const signup = (userData) => {
        // Get existing users
        const users = JSON.parse(localStorage.getItem('factsscan_users') || '[]');

        // Check if email already exists
        if (users.some(u => u.email === userData.email)) {
            return { success: false, error: 'Email already registered' };
        }

        // Add new user
        const newUser = {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('factsscan_users', JSON.stringify(users));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('factsscan_user');
    };

    const updatePassword = (email, newPassword) => {
        const users = JSON.parse(localStorage.getItem('factsscan_users') || '[]');
        const userIndex = users.findIndex(u => u.email === email);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('factsscan_users', JSON.stringify(users));
            return { success: true };
        }

        return { success: false, error: 'User not found' };
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        updatePassword
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
