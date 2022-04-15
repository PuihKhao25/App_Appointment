import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUsersRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUser !== this.props.listUser) {
            this.setState({
                usersRedux: this.props.listUser
            })
        }
    }
    handleDeleteUser = (user) => {
        // console.log('delete',user)
        this.props.deleteUserRedux(user.id)
    }
    handleEditUser =(user) => {
        // console.log('edit',user)
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        console.log('check all user ', this.props.listUser)
        console.log('check state user ', this.state.usersRedux)
        let arrUsers = this.state.usersRedux;
        return (
            <table id='TableManageUser'>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                    return (
                        <tbody>
                            < tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-edit'
                                    onClick={()=> this.handleEditUser(item)}
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                        onClick={() => this.handleDeleteUser(item)}
                                        className='btn-delete'
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}

            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
