import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService'
import moment from 'moment';

class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatent: []
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;

        let formateDate = new Date(currentDate).getTime();

        this.getDataPatient(user, formateDate)

    }

    getDataPatient = async (user, formateDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formateDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatent: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;

            let formateDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formateDate)
        })
    }
    handleBtnConfirm =()=>{
        alert('confirm')
    }
    handleBtnRemedy = ()=>{
        alert('remedy')
    }

    render() {
        console.log('dddddasaaa', this.state)
        let { dataPatent } = this.state
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-6 form-group'>
                        <label>Chọn ngày tháng</label>
                        <DatePicker
                            onChange={this.handleOnchangeDatePicker}
                            className='form-control'
                            value={this.state.currentDate}

                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>actions</th>
                                </tr>
                                {dataPatent && dataPatent.length > 0 ?
                                    dataPatent.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td> {item.patientData.firstName} </td>
                                                <td> {item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button 
                                                    className='mp-btn-confirm'
                                                    onClick={()=>this.handleBtnConfirm()}
                                                    >
                                                        Xác nhận 
                                                        </button>
                                                    <button
                                                     className='mp-btn-remedy'
                                                     onClick={()=> this.handleBtnRemedy()}
                                                     >
                                                         Gửi hóa đơn
                                                         </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        No data
                                    </tr>
                                }

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
