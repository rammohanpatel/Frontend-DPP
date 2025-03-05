import React, { useState, useEffect } from 'react'

const useLocalStorage = (key, initialValue) => {

    const getLocalStorage = () => {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        }
        return initialValue;
    }

    const [value, setValue] = useState(() => {
        return getLocalStorage(key);
    });


    const setLocalStorage = (key, value) => {
        if (value !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value));
        }

    }

    useEffect(() => {
        setLocalStorage(key, value);
    }, [value])

    return [value, setValue];
}

export default useLocalStorage
