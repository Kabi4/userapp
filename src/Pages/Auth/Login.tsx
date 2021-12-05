import { Card, Row, Col, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { useState } from 'react';
import client from '../../Api';
import { IResponseData } from '../../Interfaces/Response';
import { LOGIN } from '../../Store/ActionCreators/ActionCreator';
import { useHistory } from 'react-router';
import { AppRoutes } from '../../AppRoutes';

const baseurl = `https://dummyapi.io/data/v1/user/create`;

interface IProps {
    email: string
}

export interface IInputChanges {
    field: 'email',
    value: string
};

const Login = ({ ...props }) => {
    const history = useHistory();
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
        // const response: IResponseData = await client.post(baseurl, { email: inputs.email });
        props.loginUser({ name: inputs.email, token: 'token' });
        history.push(AppRoutes.users);
    }

    return (
        <Row style={{ height: '100vh', width: '100%', placeItems: 'center', display: 'grid' }} >
            <Col span={6}>
                <Card title="Login" style={{ width: 300 }}>
                    <Input.Group size="large">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Input onChange={(e) => { onInputsChanged({ field: 'email', value: e.target.value }) }} value={inputs.email} defaultValue="Email" />
                            </Col>
                        </Row>
                    </Input.Group>
                    <br />
                    <Button onClick={onLoginHanlder} type="primary">Login</Button>
                </Card>
            </Col>
        </Row>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: async ({ name, token }: { name: string, token: string }) => {
            await dispatch(LOGIN({ name: name, token: token }));
        },
    };
};


export default connect(null, mapDispatchToProps)(Login);
