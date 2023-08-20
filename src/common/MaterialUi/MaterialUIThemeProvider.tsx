import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useTheme } from '../../context/theme';

type Props = {
  children: React.ReactNode;
};
export default function MaterialUIThemeProvider({ children }: Props) {
  const { theme } = useTheme();

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: theme || 'light',
          background: {
            paper: theme === 'dark' ? '#24303F' : '#ffffff',
            default: theme === 'dark' ? '#24303F' : '#ffffff',
          },
        },
      })}
    >
      {children}
    </ThemeProvider>
  );
}
