import { ThemeProvider } from 'styled-components';
import Meta from '../components/Meta';
import { GlobalStyles } from '../styles';
import theme from '../styles/theme';
import smoothscroll from 'smoothscroll-polyfill';
import { useEffect } from 'react';
import { AuthProvider, ProtectRoute } from '../context';
import { ParallaxProvider } from 'react-scroll-parallax';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App({ Component, pageProps }) {
  const runAOS = () => {
    if (!AOS.refresh()) {
      AOS.init({
        disable: false,
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        offset: 120,
        delay: 0,
        duration: 1000,
        easing: 'ease',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom',
        ssr: true,
      });
    }
  };

  useEffect(() => {
    runAOS();
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
