import { Switch, useHistory } from 'react-router'
import { Route } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import ErrorPage from './Pages/404'
import AddUser from './Pages/AddUser'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import EditUser from './Pages/EditUser'
import UserTable from './Pages/UserTable'
import { PageHeader, Button, } from 'antd';
import { connect } from 'react-redux'

interface IHeader {
    name?: string | null
}

const Header = ({ name }: IHeader) => {
    const history = useHistory();
    return (<PageHeader
        ghost={false}
        onBack={() => history.goBack()}
        title={`Hii, ${name}`}
        extra={[
            <Button onClick={() => { history.push(AppRoutes.add) }} key="3">Add User</Button>,
        ]}
    />)
};




interface IProps {
    token?: string | null,
    name?: string | null
}

const Routes = ({ token = null, name = null }: IProps) => {
    let data: string | null = null;
    if (token === null) {
        data = localStorage.getItem("userapp");
    };
    return (
        <>
            {
                token === null && data === null
                    ?
                    <Switch>
                        <Route path={AppRoutes.login} exact>
                            <Login />
                        </Route>
                        <Route path={AppRoutes.signup} exact>
                            <Signup />
                        </Route>
                        <Route path='*' >
                            <ErrorPage />
                        </Route>
                    </Switch>
                    :
                    <Switch>
                        <Route path={AppRoutes.users} exact>
                            <Header name={name} />
                            <UserTable />
                        </Route>
                        <Route path={`${AppRoutes.edit}/:id`} exact>
                            <Header name={name} />
                            <EditUser />
                        </Route>
                        <Route path={AppRoutes.add} exact>
                            <Header name={name} />
                            <AddUser />
                        </Route>
                        <Route path='*'>
                            <ErrorPage />
                        </Route>
                    </Switch>
            }

        </>
    )
};

const mapStateToProps = (state: any) => {
    return {
        token: state.authReducer.token, name: state.authReducer.name,
    };
};

export default connect(mapStateToProps, null)(Routes);
