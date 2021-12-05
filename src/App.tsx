import './App.css';
import "antd/dist/antd.css";
import Routes from './Routes'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { LOGIN } from './Store/ActionCreators/ActionCreator';
import Loader from './Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ loginUser, ...props }: any) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let data: string | null = localStorage.getItem("userapp");
      if (data) {
        let dataTotal: { name: string, token: string } = await JSON.parse(data);
        if (typeof dataTotal !== typeof '') {
          console.log(dataTotal);
          loginUser({ name: dataTotal?.name, token: dataTotal?.token });
        }
      }
      setLoading(false);
    })();
  }, [loginUser]);
  return (
    <div className="App">
      {
        !loading
          ?
          <Routes />
          :
          <Loader />
      }
      <ToastContainer />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginUser: async ({ name, token }: { name: string, token: string }) => {
      await dispatch(LOGIN({ name, token }));
    },
  };
};


export default connect(null, mapDispatchToProps)(App);
