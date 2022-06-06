import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService'
import moment from 'moment';
import { LANGUAGE, } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';


class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatent: [],
            isOpenRemedyModel: false,
            dataModal: {},
            isShowLoading: true
        }
    }

    async componentDidMount() {

        this.getDataPatient()

    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;

        let formateDate = new Date(currentDate).getTime();

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
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName

        }
        this.setState({
            isOpenRemedyModel: true,
            dataModal: data
        })

    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModel: false,
            dataModal: {}
        })
    }
    sendRemedy = async (dataChild) => {
        console.log('dataChild:', dataChild)
        // return;
        let { dataModal } = this.state;
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        });
        if (res && res.errCode === 0) {
            toast.success('Send remedy success')
            this.closeRemedyModal();
            await this.getDataPatient()
        } else {
            toast.error('wrong...');
            console.log('err Remedy');
        }

    }

    render() {
        let { dataPatent, isOpenRemedyModel, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
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
                                            let time = language === LANGUAGE.VI ?
                                                item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                            let gender = language === LANGUAGE.VI ?
                                                item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td> {item.patientData.firstName} </td>
                                                    <td> {item.patientData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>
                                                        <button
                                                            className='mp-btn-confirm'
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >
                                                            Xác nhận
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center" }}>No data</td>
                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModel}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}

                />

            </>
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
