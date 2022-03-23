import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

class ProductManage extends Component {

    state = {

    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    render() {
        console.log('check child props', this.props);
        console.log('check child open modal', this.props.isOpen)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'model-user-container'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' className='input' />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' className='input' />
                        </div>
                        <div className='input-container'>
                            <label>FirstName</label>
                            <input type='text' className='input' />
                        </div>
                        <div className='input-container'>
                            <label>LastName</label>
                            <input type='password' className='input' />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='password' className='input' />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => { this.toggle() }}
                        className="px-3"
                    >
                        Save changes
                    </Button>
                    {' '}
                    <Button onClick={() => { this.toggle() }}
                        className="px-3"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
