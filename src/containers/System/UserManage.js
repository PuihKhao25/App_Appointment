import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService'
import ModalUser from './ModalUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers:[],
            isOpenModalUser: false
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users

            })

        }
        // console.log('get users from nodejs :' , response)
    }

    handleAddNewUser = () =>{
        // alert('click me')
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal =() =>{
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers;

        return (
            <div className="users-container">
                <ModalUser 
                    isOpen ={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    test={'abc'}
                />
                <div className='title text-center' >Manage User</div>
                <div className='mx-2'>
                    <button className='btn btn-primary px-3'
                    onClick={()=> this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus">
                            </i>Add new user</button>
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
                                    return (

                                        < tr key={index} >
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit'>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button className='btn-delete'>
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
