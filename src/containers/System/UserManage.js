import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
        // console.log('get users from nodejs :' , response)
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users

            })
        }
    }
    handleAddNewUser = () => {
        // alert('click me')
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    createNewUser = async (data) => {
        // alert('call me');
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
        // console.log('check data from child-', data)
    }
    handleDeleteUser = async (user) => {
        // console.log('click', user)
        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditUser = (user) => {
        console.log('check edit user', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    doEitUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact();
            } else {
                alert(res.errCode)
            }
        } catch (e) {
            console.log(e)

        }
        console.log('click save changes', user)
    }

    render() {
        // console.log('check render', this.state)
        let arrUsers = this.state.arrUsers;

        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEitUser}
                    />
                }
                <div className='title text-center' >Manage User</div>
                <div className='mx-2'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus">
                        </i>Add new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-2' >

                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    console.log('check'.arrUsers)
                                    return (

                                        < tr key={index} >
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => { this.handleEditUser(item) }} >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)} >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
