import { Metadata } from 'next';
import ModalPortal from '@/shared/ui/modal/ModalPortal';
import './globals.css';
import ReactQueryProvider from './providers';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ModalPortal />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
