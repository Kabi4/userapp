import { Card, Row, Col, Input, Button, DatePicker } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import { AppRoutes } from '../AppRoutes';
import { isObjectEmpty } from '../Utils/Validation';
import { toast } from 'react-toastify';
import client from '../Api';
import { IResponseData } from '../Interfaces/Response';
import Loader from '../Loader';

const baseurl = `https://users-backend-app.herokuapp.com/signup`;

interface IUserProps {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
}

export interface IInputChanges {
    field: 'lastName' | 'firstName' | 'dateOfBirth' | 'email',
    value: string
};



const AddUser = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const [inputs, setInputs] = useState<IUserProps>({
        firstName: '',
        lastName: '',
        dateOfBirth: '10/10/1999',
        email: ''
    });


    const onInputsChanged = ({ field, value }: IInputChanges) => {
        setInputs(prev => {
            const old: IUserProps = { ...prev };
            old[field] = value;
            return { ...old };
        })
    };

    const onAddUserHandler = async () => {
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
            toast(response?.message || 'Create user Failed!')
            return;
        }
        toast('User Created!')
        history.push(AppRoutes.users);
    }



    return (
        <div>
            <Row style={{ height: '100vh', width: '100%', placeItems: 'center', display: 'grid' }} >
                <Col span={6}>
                    {loading ? <Loader /> : <Card title="Edit User" style={{ width: 300 }}>
                        <Input.Group size="large">
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Input required onChange={(e) => { onInputsChanged({ field: 'firstName', value: e.target.value }) }} value={inputs.firstName} placeholder="First Name" />
                                </Col>
                            </Row>
                            <br />
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Input required onChange={(e) => { onInputsChanged({ field: 'lastName', value: e.target.value }) }} value={inputs.lastName} placeholder='Last Name' />
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
                        </Input.Group>
                        <br />
                        <Button onClick={() => { history.push(AppRoutes.users) }} type="ghost">Back</Button>{" "}
                        <Button onClick={onAddUserHandler} type="primary">Save</Button>
                    </Card>}
                </Col>
            </Row>
        </div>
    )
}

export default AddUser
