import { Card, Row, Col, Input, Button, DatePicker } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import { AppRoutes } from '../AppRoutes';

interface IUserProps {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    id: string,
}

export interface IInputChanges {
    field: 'lastName' | 'firstName' | 'dateOfBirth' | 'id',
    value: string
};



const AddUser = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const [inputs, setInputs] = useState<IUserProps>({
        firstName: '',
        lastName: '',
        dateOfBirth: '10/10/1999',
        id: ''
    });


    const onInputsChanged = ({ field, value }: IInputChanges) => {
        setInputs(prev => {
            const old: IUserProps = { ...prev };
            old[field] = value;
            return { ...old };
        })
    };



    return (
        <div>
            <Row style={{ height: '100vh', width: '100%', placeItems: 'center', display: 'grid' }} >
                <Col span={6}>
                    <Card title="Edit User" style={{ width: 300 }}>
                        <Input.Group size="large">
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Input required onChange={(e) => { onInputsChanged({ field: 'firstName', value: e.target.value }) }} value={inputs.firstName} defaultValue="Email" />
                                </Col>
                            </Row>
                            <br />
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Input required onChange={(e) => { onInputsChanged({ field: 'lastName', value: e.target.value }) }} value={inputs.lastName} defaultValue="Email" />
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
                        <Button type="primary">Save</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default AddUser
