import './global.css';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Task Management App',
  description: 'Manage your tasks and teams efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
  <body className="h-screen flex flex-col">
    <Header />
    <main className="flex-grow overflow-auto" style={{ maxHeight: '98vh' }}>
      {children}
    </main>
    <Footer />
    <Toaster position="top-center" reverseOrder={false} />
  </body>
</html>

  );
}
