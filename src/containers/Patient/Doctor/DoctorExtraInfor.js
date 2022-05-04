import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGE } from '../../../utils';
import { months } from 'moment';
import { getExtraInfoDoctorId } from '../../../services/userService'
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {}
        }
    }

    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInfoDoctorId(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }

        }
    }
    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { isShowDetailInfo, extraInfo } = this.state;
        let { language } = this.props
        console.log('check extraInfo:', this.state)
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id="patient.extra-info-doctor.text-address" />
                    </div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {
                        isShowDetailInfo === false &&
                        <div className='short-info'>
                            <FormattedMessage id="patient.extra-info-doctor.price" />
                            {
                                extraInfo && extraInfo.priceIdTypeData && language === LANGUAGE.VI
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfo.priceIdTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }
                            {
                                extraInfo && extraInfo.priceIdTypeData && language === LANGUAGE.EN
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfo.priceIdTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }

                            <span className='detail'
                                onClick={() => this.showHideDetailInfo(true)}
                            >
                                <FormattedMessage id="patient.extra-info-doctor.detail" />
                            </span>

                        </div>
                    }

                    {isShowDetailInfo === true &&
                        <>
                            <div className='title-price'><FormattedMessage id="patient.extra-info-doctor.price" /> </div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'><FormattedMessage id="patient.extra-info-doctor.price" /></span>
                                    <span className='right'>
                                        {
                                            extraInfo && extraInfo.priceIdTypeData && language === LANGUAGE.VI
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfo.priceIdTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {
                                            extraInfo && extraInfo.priceIdTypeData && language === LANGUAGE.EN
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfo.priceIdTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfo && extraInfo.note ? extraInfo.note : ''}
                                </div>

                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-info-doctor.payment" />
                                {extraInfo && extraInfo.paymentIdTypeData && language === LANGUAGE.VI
                                    ?
                                    extraInfo.paymentIdTypeData.valueVi : ''}
                                {extraInfo && extraInfo.paymentIdTypeData && language === LANGUAGE.EN
                                    ?
                                    extraInfo.paymentIdTypeData.valueEn : ''}
                            </div>
                            <div className='hide-price'>
                                <span
                                    onClick={() => this.showHideDetailInfo(false)}
                                >
                                    <FormattedMessage id="patient.extra-info-doctor.hide-price" />
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
