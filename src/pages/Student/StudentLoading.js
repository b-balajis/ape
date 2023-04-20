import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoadingPage = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const history = useHistory();

  useEffect(() => {
    Promise.all([
      axios.get('/api/endpoint1'),
      axios.get('/api/endpoint2'),
      axios.get('/api/endpoint3')
    ]).then(() => {
      history.push('/landing-page');
    });
  }, [history]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1
      );
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <ProgressBar animated now={loadingProgress} />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPage;
