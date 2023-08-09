import { Outlet } from 'react-router-dom';
import { Footer, Navbar, Sidebar } from '../components';

const SharedPage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};
export default SharedPage;
