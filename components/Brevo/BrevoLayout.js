import Script from 'next/script';
import BrevoChat from './chatBrevo';

const BrevoLayout = ({ children }) => (
  <>
    {/* Your navigation, header, etc. */}
    <Script
      src="https://web-push-sdk.sendinblue.com/sibpush.js"
      onLoad={() => {
        if (window.brevoWebPush) {
          window.brevoWebPush.init({
            appId: 'cfd9nzyek7ecn995jzfs96mf',
            serviceWorkerUrl: '/service-worker.js',
          });
        }
      }}
    />
    {children}

    {/* Add the Brevo chat widget */}
    <BrevoChat />
  </>
);

export default BrevoLayout;