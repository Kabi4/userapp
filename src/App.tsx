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
        let dataTotal: { name: string, token: string, dob: string } = await JSON.parse(data);
        if (typeof dataTotal !== typeof '') {
          loginUser({ name: dataTotal?.name, token: dataTotal?.token, dob: dataTotal?.dob });
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
      <ToastContainer autoClose={3000} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginUser: async ({ name, token, dob }: { name: string, token: string, dob: string }) => {
      await dispatch(LOGIN({ name, token, dob }));
    },
  };
};


export default connect(null, mapDispatchToProps)(App);
