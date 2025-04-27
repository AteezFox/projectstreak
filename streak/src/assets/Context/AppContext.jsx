import { createContext, useContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [selectedAddress, setSelectedAddress] = useState(
        localStorage.getItem('selectedAddress') || 'Select Address'
    );
    const [userId, setUserId] = useState(
        localStorage.getItem('userId') || null
    );
    const [userType, setUserType] = useState(
        localStorage.getItem('userType') || null
    );
    const [cartItems, setCartItems] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(null);

    const user = {
        userId,
        userType
    };

    const updateAddress = (address) => {
        setSelectedAddress(address);
        localStorage.setItem('selectedAddress', address);
    };

    const updateUser = (id, type) => {
        setUserId(id);
        setUserType(type);
        localStorage.setItem('userId', id);
        localStorage.setItem('userType', type);
    };

    const updateCart = (items) => {
        setCartItems(items);
    };

    // Kijelentkezésnél töröljük a localStorage-t
    const logout = () => {
        setUserId(null);
        setUserType(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
    };

    return (
        <AppContext.Provider 
            value={{
                selectedAddress,
                updateAddress,
                userId,
                userType,
                user,
                updateUser,
                cartItems,
                updateCart,
                logout,
                filteredProducts,
                setFilteredProducts
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}