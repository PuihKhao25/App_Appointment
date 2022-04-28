import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import { LANGUAGE } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { months } from 'moment';
import {getScheduleDoctorByDate} from '../../../services/userService'
import { compose } from 'redux';



class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: []
        }
    }

    async componentDidMount() {
        let { language } = this.props;

        console.log('moment vie:', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en:', moment(new Date()).locale('en').format('dddd - DD/MM'));
        this.setArray(language)
    }

    setArray = (language) =>{

        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if(language === LANGUAGE.VI){
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');   
            }else{
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM'); 
            }
         
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object)
        }
        this.setState({
            allDays:allDays
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language){
            this.setArray(this.props.language )
        }
    }
    handleOnchangeSelect =async(event) =>{
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res= await getScheduleDoctorByDate(doctorId,date)
            console.log('check datas:',res)
        }
    }


    render() {
        let {allDays} = this.state;

        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select
                    onChange={(event)=> this.handleOnchangeSelect(event)}
                    >
                        {allDays && allDays.length >0 && 
                        allDays.map((item,index) =>{
                            return  (
                                <option 
                                value={item.value} 
                                key={index}
                                >
                                    {item.label }
                                </option>
                            )
                        })}
    
                    </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
