import { Table, Button, Modal } from 'antd';
import { FolderViewOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IResponseData } from '../Interfaces/Response';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import client from '../Api';
import { SETUSERS } from '../Store/ActionCreators/ActionCreator';
import { connect } from 'react-redux';

interface IUserProps {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    id: string,
    email: string
}





const baseurl = `https://users-backend-app.herokuapp.com/users`;
const baseurlDelete = `https://users-backend-app.herokuapp.com/user/`;

const UserTable = ({ setUsers, users }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const history = useHistory();

    const [modalData, setModalData] = useState<IUserProps>({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        id: '',
        email: ''
    });

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const showModal = ({ firstName, lastName, dateOfBirth, id, email }: IUserProps) => {
        setModalData({ firstName, lastName, dateOfBirth, id, email });
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showDeleteModal = ({ firstName, lastName, dateOfBirth, id, email }: IUserProps) => {
        setModalData({ firstName, lastName, dateOfBirth, id, email });
        setDeleteModal(true);
    };

    const handlerCancelInDelete = () => {
        setDeleteModal(false);
    };

    const deleteAUser = async () => {
        setLoading(true);
        const response: IResponseData = await client.delete(`${baseurlDelete}${modalData.id}`);
        if (response.error) {
            toast('Cannot Delete!')
            return;
        }
        fetchAndSetUsers();
        setModalData({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            id: '',
            email: ''
        });
        toast('User Deleted Succesfully!')
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id: IUserProps) => {
                return (<>
                    <Button onClick={() => { showModal({ firstName: id.firstName, lastName: id.lastName, dateOfBirth: id.dateOfBirth, id: id.id, email: id.email }) }} type="primary" icon={<FolderViewOutlined />} size={'large'} />
                    {" "}<Button type="primary" icon={<EditOutlined />} onClick={() => { history.push(`/edit-user/${id.id}`) }} size={'large'} />{" "}
                    <Button type="primary" onClick={() => { showDeleteModal({ firstName: id.firstName, lastName: id.lastName, dateOfBirth: id.dateOfBirth, id: id.id, email: id.email }) }} icon={<DeleteOutlined />} size={'large'} />
                </>)
            }
        },
    ];




    const fetchAndSetUsers = useCallback(() => {
        (async () => {
            setLoading(true);
            const response: IResponseData = await client.get(baseurl);
            setLoading(false);
            if (response.error) {
                toast('Fetch Failed!')
                return;
            }
            setUsers(response.data.map((ele: any, i: number) => {
                return {
                    key: i,
                    firstName: ele.first_name,
                    lastName: ele.last_name,
                    dateOfBirth: ele.dob,
                    email: ele.email,
                    id: {
                        firstName: ele.first_name,
                        lastName: ele.last_name,
                        dateOfBirth: ele.dob,
                        email: ele.email,
                        id: ele._id,
                    }
                }
            })
            )
        })();
    }, [setUsers]);

    useEffect(() => {
        (fetchAndSetUsers)();
    }, [fetchAndSetUsers]);

    return (
        <div>
            {loading ? <Loader /> : <Table dataSource={users} columns={columns} />}
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button onClick={handleCancel} key="back">
                        Return
                    </Button>,

                ]}>
                <p>First Name: {modalData.firstName}</p>
                <p>Last Name: {modalData.lastName}</p>
                <p>Date of Birth: {modalData.dateOfBirth}</p>
                <p>Email: {modalData.email}</p>
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
                <p>You want to delete {modalData.firstName} {modalData.lastName}?</p>
            </Modal>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        users: state.usersReducer.users
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUsers: async (users: any) => {
            await dispatch(SETUSERS({ users }));
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserTable)
