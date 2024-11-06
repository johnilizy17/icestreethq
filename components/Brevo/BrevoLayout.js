import BrevoChat from './chatBrevo';

const BrevoLayout = ({ children }) => (
  <>
    {/* Your navigation, header, etc. */}
    
    {children}

    {/* Add the Brevo chat widget */}
    <BrevoChat />
  </>
);

export default BrevoLayout;