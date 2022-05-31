import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { LANGUAGE } from '../../../utils'
import { withRouter } from 'react-router';
import { getAllClinic } from '../../../services/userService';
import './MedicalFacility.scss'

class MedicalFacility extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    async componentDidMount() {
        let res = await getAllClinic();

        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }
    handleViewClinic(clinic) {
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${clinic.id}`)         
         }

    }
    render() {
        let { dataClinic } = this.state

        return (

            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            Cơ sở nổi bật
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage
                                id="homepage.more-infor"
                            />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child'
                                            onClick={() => this.handleViewClinic(item)}
                                            key={index}>
                                            <div className='bg-image section-medical-facility  '
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='clinic-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
