import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const BaseLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default BaseLayout;
