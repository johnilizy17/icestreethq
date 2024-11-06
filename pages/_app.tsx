import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Inter } from '@next/font/google'
import { Toaster } from 'react-hot-toast'
import BrevoLayout from '../components/Brevo/BrevoLayout';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BrevoLayout>
      <style jsx global>{`
    html {
      font-family: ${inter.style.fontFamily};
       }
     `}
      </style>
      <main className={inter.className}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </BrevoLayout>
  )
}
