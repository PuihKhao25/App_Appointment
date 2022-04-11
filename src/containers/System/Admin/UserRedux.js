import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGE } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if(res && res.errCode ===0){
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     // console.log('check log gender',res)
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render =>didUpdate
        //hiện tại (this) và quá khứ (previous

        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
    }
    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl
            })
        }

    }
    openPreviewImage = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    render() {
        // console.log('check log gender state', this.state)
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let getGenders = this.props.isLoadingGender;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Add
                </div>
                <div className="user-redux-body" >

                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>
                                <FormattedMessage id="manage-use.add" />
                            </div>
                            <div className='col-12 ' >{getGenders === true ? 'loading gender' : ''}</div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-use.email" /></label>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <label> <FormattedMessage id="manage-use.password" /></label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-use.first-name" />
                                </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-use.last-name" />
                                </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-use.phone-number" />
                                </label>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-9'>
                                <label>
                                    <FormattedMessage id="manage-use.address" />
                                </label>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-use.gender" />
                                </label>
                                <select className='form-control'>
                                    {
                                        genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>

                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-use.position" />
                                </label>
                                <select className='form-control'>
                                    {
                                        positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-use.role" />
                                </label>
                                <select className='form-control'>
                                    {
                                        roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id="manage-use.image" />
                                </label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>
                                        Tải ảnh
                                        <i className="fas fa-upload  cssAnh" ></i>
                                    </label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary' >
                                    <FormattedMessage id="manage-use.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
        // processLogout:( )=>dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
