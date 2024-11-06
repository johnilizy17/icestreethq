import React, { useEffect } from 'react';
import Script from 'next/script';

export default function BrevoChat() {

    const BrevoChatWidget = () => {
        useEffect(() => {
            (function (d, w, c) {
                w.BrevoConversationsID = '67122436f531abb4860c36d4';
                w[c] = w[c] || function () {
                    (w[c].q = w[c].q || []).push(arguments);
                };
                var s = d.createElement('script');
                s.async = true;
                s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
                if (d.head) d.head.appendChild(s);
            })(document, window, 'BrevoConversations');
        }, []);

        useEffect(() => {
            // Initialize Brevo Web Push after SDK is loaded
            if (window.brevoWebPush) {
              window.brevoWebPush.init({
                appId: 'cfd9nzyek7ecn995jzfs96mf', // Replace with your Brevo App ID
                serviceWorkerUrl: '/service-worker.js', // Service worker file
              });
            }
          }, []);

        return null;
    };

}