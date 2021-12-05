import { Card, Row, Col, Input, Button, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
import { AppRoutes } from '../AppRoutes';
import { connect } from 'react-redux';
import Loader from '../Loader';
import { isObjectEmpty } from '../Utils/Validation';
import { toast } from 'react-toastify';
import { IResponseData } from '../Interfaces/Response';
import client from '../Api';

interface IUserProps {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    id: string,
    email: string,
}

export interface IInputChanges {
    field: 'lastName' | 'firstName' | 'dateOfBirth' | 'id' | 'email',
    value: string
};

const baseurl = 'https://users-backend-app.herokuapp.com/user/';

const EditUser = ({ users }: any) => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const [inputs, setInputs] = useState<IUserProps>({
        firstName: '',
        lastName: '',
        dateOfBirth: '10/10/1999',
        id: id,
        email: ''
    });


    const onInputsChanged = ({ field, value }: IInputChanges) => {
        setInputs(prev => {
            const old: IUserProps = { ...prev };
            old[field] = value;
            return { ...old };
        })
    };

    useEffect(() => {
        setLoading(true);
        const index = users.findIndex((ele: any) => ele.id.id === id);
        if (index === -1) {
            history.push(AppRoutes.notFound)
        }
        const item = users[index];
        setInputs((prev: IUserProps) => {
            const old = { ...prev };
            old.dateOfBirth = item.dateOfBirth;
            old.firstName = item.firstName;
            old.email = item.email;
            old.lastName = item.lastName;
            return { ...old }
        })
        setLoading(false);
    }, [users, id, history]);


    const onEditUser = async () => {
        if (isObjectEmpty(inputs)) {
            toast('Every Field is requried!')
            return;
        }
        setLoading(true);
        const response: IResponseData = await client.put(`${baseurl}${id}`, {
            "email": inputs.email,
            "first_name": inputs.firstName,
            "last_name": inputs.lastName,
            "dob": inputs.dateOfBirth
        })
        setLoading(false);
        if (response.error) {
            toast(response?.message || 'Update user Failed!')
            return;
        }
        toast('User Updated!')
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
                                    <Input onChange={(e) => { onInputsChanged({ field: 'firstName', value: e.target.value }) }} value={inputs.firstName} placeholder="First Name" />
                                </Col>
                            </Row>
                            <br />
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Input onChange={(e) => { onInputsChanged({ field: 'lastName', value: e.target.value }) }} value={inputs.lastName} placeholder="Last Name" />
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
                        <Button onClick={onEditUser} type="primary">Save</Button>
                    </Card>}
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        users: state.usersReducer.users
    };
};


export default connect(mapStateToProps, null)(EditUser);
