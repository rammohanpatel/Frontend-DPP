import React, { useEffect, useState } from 'react'

const useGetRequest = (url) => {

    const [data, setData] = useState();

    const fetchRequest = async () => {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Data from getRequest : ", data)
        setData(data);
    }

    useEffect(() => {
        fetchRequest();
    }, [])

    return [data, setData];
}

export default useGetRequest
