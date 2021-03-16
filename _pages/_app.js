import { ThemeProvider } from 'styled-components';
import Meta from '../components/Meta';
import { GlobalStyles } from '../styles';
import theme from '../styles/theme';
import smoothscroll from 'smoothscroll-polyfill';
import { useEffect } from 'react';
import { AuthProvider, ProtectRoute } from '../context';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function App({ Component, pageProps }) {

  useEffect(() => {
    smoothscroll.polyfill();
  }, [])

  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <ParallaxProvider>
          <ThemeProvider theme={theme}>
            <Meta />
            <ProtectRoute>
              <Component {...pageProps} />
            </ProtectRoute>
          </ThemeProvider>
        </ParallaxProvider>
      </AuthProvider>
    </>
  )
}
