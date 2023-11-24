import PageNotFound from '@components/PageNotPound/index';
import { ScreenApp } from '@modules/app';
import { useEffect, useState } from 'react';

function App() {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);

    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  return (
    <div style={{ backgroundColor: '#ffffff', height: '100vh', width: '100vw' }}>
      {screenSize.width > 1024 ? <PageNotFound /> : <ScreenApp />}
    </div>
  );
}

export default App;
