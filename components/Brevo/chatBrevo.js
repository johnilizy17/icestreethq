import React, { useEffect } from 'react';

export default function BrevoChat() {

    const BrevoChatWidget = () => {
        useEffect(() => {
            (function (d, w, c) {
                w.ChatraID = '67122436f531abb4860c36d4'; // Replace with your Brevo Chatra ID
                var s = d.createElement('script');
                s.async = true;
                s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
                if (d.head) d.head.appendChild(s);
            })(document, window, 'Chatra');
        }, []);

        return null;
    };

}