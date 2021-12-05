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
import { LOGOUT } from './Store/ActionCreators/ActionCreator'

interface IHeader {
    name?: string | null,
    logoutUser?: any
}

const Header = ({ name, logoutUser }: IHeader) => {
    const history = useHistory();
    return (<PageHeader
        ghost={false}
        onBack={() => history.push(AppRoutes.users)}
        title={`Hii, ${name}`}
        extra={[
            <Button onClick={() => { history.push(AppRoutes.add) }} key="3">Add User</Button>,
            <Button onClick={() => { logoutUser(); history.push(AppRoutes.login) }} key="3" type='primary' >Logout</Button>
        ]}
    />)
};




interface IProps {
    token?: string | null,
    name?: string | null,
    logoutUser: any
}

const Routes = ({ token = null, name = null, logoutUser = null }: IProps) => {
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
                            <Header logoutUser={logoutUser} name={name} />
                            <UserTable />
                        </Route>
                        <Route path={`${AppRoutes.edit}/:id`} exact>
                            <Header logoutUser={logoutUser} name={name} />
                            <EditUser />
                        </Route>
                        <Route path={AppRoutes.add} exact>
                            <Header logoutUser={logoutUser} name={name} />
                            <AddUser />
                        </Route>
                        <Route path={AppRoutes.notFound} exact>
                            <Header logoutUser={logoutUser} name={name} />
                            <ErrorPage />
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        logoutUser: async () => {
            await dispatch(LOGOUT());
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Routes);
