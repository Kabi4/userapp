import { Card, Row, Col, Input, } from 'antd';

const ErrorPage = () => {
    return (
        <Row style={{ height: '100vh', width: '100%', placeItems: 'center', display: 'grid' }} >
            <Col span={6}>
                <Card title="Something Went Wrong" style={{ width: 300 }}>
                    <Row gutter={24}>
                        <Col span={24}>
                            Error 404 Page not found!
                        </Col>
                    </Row>
                    <br />
                </Card>
            </Col>
        </Row>
    )
}

export default ErrorPage
