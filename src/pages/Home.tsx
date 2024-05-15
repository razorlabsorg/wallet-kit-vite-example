import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='container'>
      <button className='page-button' onClick={() => navigate('/aptos')}>
        Connect to M1
      </button>
      <button className='page-button' onClick={() => navigate('/sui')}>
        Connect to M2
      </button>
    </div>
  );
};

export default Home;
