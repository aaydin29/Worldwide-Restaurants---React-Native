import {useState, useEffect} from 'react';
import axios from 'axios';
import Config from 'react-native-config';

export default function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.yelp.com/v3/businesses/search';
      const config = {
        headers: {
          Authorization: `Bearer ${Config.API_KEY}`,
        },
        params: {
          term: 'restaurants',
          location: 'San Francisco',
          categories: 'all',
          sort_by: 'rating',
        },
      };

      try {
        const response = await axios.get(url, config);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {data, loading};
}
