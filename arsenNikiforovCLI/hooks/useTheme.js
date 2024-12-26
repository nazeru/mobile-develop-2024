// hooks/useTheme.js
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const useTheme = () => {
  const colors = useContext(ThemeContext);
  return colors;
};

export default useTheme;