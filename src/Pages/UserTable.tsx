import { Table, Button, Modal } from 'antd';
import { FolderViewOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';

interface IUserProps {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    id: string,
}



const dataSource = [
    {
        key: '1',
        firstName: 'Mikey',
        lastName: 'Draken',
        dateOfBirth: '19/02/200',
        id: {
            firstName: 'Mikey',
            lastName: 'Draken',
            dateOfBirth: '19/02/200',
            id: 1
        }
    },
    {
        key: '2',
        firstName: 'John',
        lastName: 'Beckham',
        dateOfBirth: '19/02/200',
        id: {
            firstName: 'John',
            lastName: 'Beckham',
            dateOfBirth: '19/02/200',
            id: 1,
        }
    },
];



const UserTable = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const history = useHistory();

    const [modalData, setModalData] = useState<IUserProps>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        id: ''
    });

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const showModal = ({ firstName, lastName, dateOfBirth, id }: IUserProps) => {
        setModalData({ firstName, lastName, dateOfBirth, id });
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showDeleteModal = ({ firstName, lastName, dateOfBirth, id }: IUserProps) => {
        setModalData({ firstName, lastName, dateOfBirth, id });
        setDeleteModal(true);
    };

    const handlerCancelInDelete = () => {
        setDeleteModal(false);
    };

    const deleteAUser = () => {
        setDeleteModal(false);
    }


    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        }, {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id: IUserProps) => {
                return (<>
                    <Button onClick={() => { showModal({ firstName: id.firstName, lastName: id.lastName, dateOfBirth: id.dateOfBirth, id: id.id }) }} type="primary" icon={<FolderViewOutlined />} size={'large'} />
                    {" "}<Button type="primary" icon={<EditOutlined />} onClick={() => { history.push(`/edit-user/${id.id}`) }} size={'large'} />{" "}
                    <Button type="primary" onClick={() => { showDeleteModal({ firstName: id.firstName, lastName: id.lastName, dateOfBirth: id.dateOfBirth, id: id.id }) }} icon={<DeleteOutlined />} size={'large'} />
                </>)
            }
        },
    ];

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel} key="back">
                        Return
                    </Button>,

                ]}>
                <p>First Name: {modalData.firstName}</p>
                <p>Last Name: {modalData.lastName}</p>
                <p>Date of Birth: {modalData.dateOfBirth}</p>
                <p>ID: {modalData.id}</p>
            </Modal>
            <Modal title="Delete user" visible={deleteModal} onOk={deleteAUser} onCancel={handlerCancelInDelete}
                footer={[
                    <Button onClick={handlerCancelInDelete} key="back">
                        Cancel
                    </Button>,
                    <Button onClick={deleteAUser} key="submit" type="primary" >
                        Confirm
                    </Button>,
                ]}>
                <p>You want to delete Select user?</p>
            </Modal>
        </div>
    )
}

export default UserTable
