import { Card, Row, Button, Col, Input, DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import client from '../../Api';
import { AppRoutes } from '../../AppRoutes';
import { IResponseData } from '../../Interfaces/Response';
import Loader from '../../Loader';
import { isObjectEmpty } from '../../Utils/Validation';

const baseurl = `https://users-backend-app.herokuapp.com/signup`;


interface IUserProps {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string
}

export interface IInputChanges {
    field: 'lastName' | 'firstName' | 'dateOfBirth' | 'email',
    value: string
};


const Signup = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: '',
        lastName: '',
        firstName: '',
        dateOfBirth: '10/10/1999',
    });

    const onInputsChanged = ({ field, value }: IInputChanges) => {
        setInputs(prev => {
            const old: IUserProps = { ...prev };
            old[field] = value;
            return { ...old };
        })
    };

    const onSignupHandler = async () => {
        if (isObjectEmpty(inputs)) {
            toast('Every Field is requried!')
            return;
        }
        setLoading(true);
        const response: IResponseData = await client.post(baseurl, {
            "email": inputs.email,
            "first_name": inputs.firstName,
            "last_name": inputs.lastName,
            "dob": inputs.dateOfBirth
        })
        setLoading(false);
        if (response.error) {
            toast(response?.message || 'Signup Failed!')
            return;
        }
        toast('Signup Succesfull!')
        history.push(AppRoutes.login);
    }


    return (
        <Row style={{ height: '100vh', width: '100%', placeItems: 'center', display: 'grid' }} >
            <Col span={6}>
                {loading ? <Loader /> : <Card title="Signup" style={{ width: 300 }}>
                    <Input.Group size="large">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Input defaultValue="First Name" onChange={(e) => { onInputsChanged({ field: 'firstName', value: e.target.value }) }} placeholder='First Name' value={inputs.firstName} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={24}>
                                <Input defaultValue="Last Name" onChange={(e) => { onInputsChanged({ field: 'lastName', value: e.target.value }) }} value={inputs.lastName} placeholder='Last Name' />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={24}>
                                <Input defaultValue="Email" onChange={(e) => { onInputsChanged({ field: 'email', value: e.target.value }) }} value={inputs.email} placeholder='Email' />
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={24}>
                            <Col span={24}>
                                <DatePicker style={{ width: '100%' }} defaultValue={moment(inputs.dateOfBirth)} onChange={(moment) => { onInputsChanged({ field: 'dateOfBirth', value: `${moment?.date()}/${moment?.month()}/${moment?.year()}` }) }} />
                            </Col>
                        </Row>
                        <br />
                        <Button onClick={onSignupHandler} type="primary">Signup</Button>{" "}
                        <br />
                        <br />
                        <Button onClick={() => { history.goBack() }} type="primary">Back</Button>

                    </Input.Group>
                </Card>}
            </Col>
        </Row>
    )
}

export default Signup
