import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGE } from '../../../utils';
import { months } from 'moment';
import { getScheduleDoctorByDate } from '../../../services/userService'
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfo: false
        }
    }

    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { isShowDetailInfo } = this.state
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>Địa chỉ khám</div>
                    <div className='name-clinic'>Phòng khám chuyên khoa da liễu</div>
                    <div className='detail-address'>120 hai bà trưng - hà nội</div>
                </div>
                <div className='content-down'>
                    {
                        isShowDetailInfo === false &&
                        <div className='short-info'>
                            Giá khám : 250.000đ. 
                            <span
                                onClick={() => this.showHideDetailInfo(true)}
                            >
                                Xem chi tiết
                            </span>

                        </div>
                    }

                    {isShowDetailInfo === true &&
                        <>
                            <div className='title-price'>Giá khám: </div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>2500.000đ</span>
                                </div>
                               <div className='note'>
                               Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD
                               </div>
                                
                            </div>
                            <div className='payment'>
                                Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
                                </div>
                            <div className='hide-price'>
                            <span
                                onClick={() => this.showHideDetailInfo(false)}
                            >
                                Ẩn bảng giá
                            </span>
                            </div>
                        </>
                    }


                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
