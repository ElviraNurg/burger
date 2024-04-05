import { useState, useEffect} from 'react';
import { SCREEN_S } from '../utils/constants/constants';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event: any) => {
       // console.log(event.currentTarget.innerWidth); 
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return {
    isScreenS: width < SCREEN_S,
  };
};