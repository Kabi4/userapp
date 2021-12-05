import { Card, Row, Col, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { useState } from 'react';
import client from '../../Api';
import { IResponseData } from '../../Interfaces/Response';
import { LOGIN } from '../../Store/ActionCreators/ActionCreator';
import { useHistory } from 'react-router';
import { AppRoutes } from '../../AppRoutes';
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import { isObjectEmpty } from '../../Utils/Validation';
import { DateCompareToday } from '../../Utils/DateCompare';

const baseurl = `https://users-backend-app.herokuapp.com/login`;

interface IProps {
    email: string
}

export interface IInputChanges {
    field: 'email',
    value: string
};

const Login = ({ ...props }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState<IProps>({
        email: '',
    });

    const onInputsChanged = ({ field, value }: IInputChanges) => {
        setInputs(prev => {
            const old: IProps = { ...prev };
            old[field] = value;
            return { ...old };
        })
    };

    const onLoginHanlder = async () => {
        if (isObjectEmpty(inputs)) {
            toast('Invalid Email!')
            return;
        }
        setLoading(true);
        const response: IResponseData = await client.post(baseurl, { email: inputs.email });
        setLoading(false);
        if (response.error) {
            toast(response?.message || 'Login Failed!')
            return;
        }
        props.loginUser({ name: `${response.data.first_name} ${response.data.last_name}`, token: 'token', dob: response.data.dob });
        if (DateCompareToday(response.data.dob)) {
            toast(`Happy Birthday ${response.data.first_name} ${response.data.last_name}!`);
        }
        history.push(AppRoutes.users);

    }

    return (
        <Row style={{ height: '100vh', width: '100%', placeItems: 'center', display: 'grid' }} >
            {loading ? <Loader /> : <Col span={6}>
                <Card title="Login" style={{ width: 300 }}>
                    <Input.Group size="large">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Input onChange={(e) => { onInputsChanged({ field: 'email', value: e.target.value }) }} value={inputs.email} placeholder="Email" />
                            </Col>
                        </Row>
                    </Input.Group>
                    <br />
                    <Button onClick={onLoginHanlder} type="primary">Login</Button>{" "}
                    <Button onClick={() => { history.push(AppRoutes.signup) }} type="primary">Signup?</Button>
                </Card>
            </Col>}
        </Row>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: async ({ name, token, dob }: { name: string, token: string, dob: string }) => {
            await dispatch(LOGIN({ name: name, token: token, dob: dob }));
        },
    };
};


export default connect(null, mapDispatchToProps)(Login);
