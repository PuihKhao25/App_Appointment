import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { LANGUAGE } from '../../../utils';
import { getProfileDoctorId } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        console.log('check data', data)
        this.setState({
            dataProfile: data
        })

    }

    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorId(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorId !== prevProps.doctorId) {

        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;

        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName}  ${dataProfile.firstName} `;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName}  ${dataProfile.lastName}`;
        }

        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})` }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGE.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {dataProfile && dataProfile.Markdown
                                && dataProfile.Markdown.description
                                &&
                                <span>
                                    {dataProfile.Markdown.description}
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <div className='price'>
                    Giá khám:
                    {
                        dataProfile && dataProfile.Doctor_infor && language === LANGUAGE.VI &&

                        <NumberFormat
                        className='currency'
                        value={ dataProfile.Doctor_infor.priceIdTypeData.valueVi }
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'VND'}
                    />
                    }
                    {
                        dataProfile && dataProfile.Doctor_infor && language === LANGUAGE.EN &&
                        <NumberFormat
                        className='currency'
                        value={dataProfile.Doctor_infor.priceIdTypeData.valueEn}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'$'}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
