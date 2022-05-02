import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss'
import { FormattedMessage } from 'react-intl'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGE } from '../../../utils';
import { getDetailInfoDoctor } from '../../../services/userService';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequireDoctorInfo()
    }

    buildDataInputSelect = (inputData,type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type ==='USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labeEn = type ==='USERS' ? `${item.firstName} ${item.lastName} ` : item.valueEn;
                object.label = language === LANGUAGE.VI ? labelVi : labeEn;
                object.value = item.id;
                result.push(object)
            })

        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors,'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice)
            let dataSelectPayment = this.buildDataInputSelect(resPayment)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)

            console.log('check all new data',dataSelectPrice,dataSelectPayment,dataSelectProvince)

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }

    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })

    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });

        let res = await getDetailInfoDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    };

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className='content-right '>
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea
                            className='form-control'
                            rows='4'
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá  '}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control' />
                    </div>
                </div>
                <div className='mamage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}

                >
                    {
                        hasOldData === true ?
                            <span><FormattedMessage id="admin.manage-doctor.save" /> </span>
                            :
                            <span><FormattedMessage id="admin.manage-doctor.add" /></span>
                    }
                </button>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequireDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDt(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
