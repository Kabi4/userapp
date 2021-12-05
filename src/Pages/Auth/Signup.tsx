import { Card, Row, Col, Input, DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';

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
    return (
        <Row style={{ height: '100vh', width: '100%', placeItems: 'center', display: 'grid' }} >
            <Col span={6}>
                <Card title="Singup" style={{ width: 300 }}>
                    <Input.Group size="large">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Input defaultValue="First Name" onChange={(e) => { onInputsChanged({ field: 'firstName', value: e.target.value }) }} value={inputs.firstName} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={24}>
                                <Input defaultValue="Last Name" onChange={(e) => { onInputsChanged({ field: 'lastName', value: e.target.value }) }} value={inputs.lastName} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={24}>
                                <Input defaultValue="Email" onChange={(e) => { onInputsChanged({ field: 'email', value: e.target.value }) }} value={inputs.email} />
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={24}>
                            <Col span={24}>
                                <DatePicker style={{ width: '100%' }} defaultValue={moment(inputs.dateOfBirth)} onChange={(moment) => { onInputsChanged({ field: 'dateOfBirth', value: `${moment?.date()}/${moment?.month()}/${moment?.year()}` }) }} />
                            </Col>
                        </Row>
                    </Input.Group>
                </Card>
            </Col>
        </Row>
    )
}

export default Signup
