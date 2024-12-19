import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';

const ProgressPage = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 500);

    fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new URLSearchParams(location.search))),
    })
      .then((res) => res.blob())
      .then((blob) => {
        clearInterval(timer);
        setProgress(100);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'app.zip';
        a.click();
        navigate('/result');
      });

    return () => clearInterval(timer);
  }, [location.search, navigate]);

  return <ProgressBar progress={progress} />;
};

export default ProgressPage;
