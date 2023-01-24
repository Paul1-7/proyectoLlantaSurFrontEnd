import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

const Loadable = (Component) =>
  // eslint-disable-next-line func-names, react/display-name
  function (props) {
    const { pathname } = useLocation();
    const isDashboard = pathname.includes('/dashboard');

    return (
      <Suspense
        fallback={
          <LoadingScreen
            sx={{
              ...(!isDashboard && {
                top: 0,
                left: 0,
                width: 1,
                zIndex: 9999,
                position: 'fixed',
              }),
            }}
          />
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;
