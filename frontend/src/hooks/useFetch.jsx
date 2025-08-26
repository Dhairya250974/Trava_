import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null)
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                if(!response.ok){
                    throw new Error('Failed to fetch')
                }
                const result = await response.json()
                setApiData(result.data ?? result)
                setError(null)
            } catch (err) {
                setError(err?.message || 'Network error')
                setApiData(null)
            }
          }

          fetchData();
    }, [url])
  
    return {apiData, error}
}

export default useFetch