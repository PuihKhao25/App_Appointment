import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime:[],

    allRequiredDoctorInfo:[]

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.position = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAIL:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDt;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAIL:
            state.allDoctors = [];
            return {
                ...state,
            }
            case actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS:
                state.allScheduleTime = action.dataTime;
                return {
                    ...state,
                }
            case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAIL:
                state.allScheduleTime = [];
                return {
                    ...state,
                }
                case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS:
                    state.allRequiredDoctorInfo = action.data;
                    return {
                        ...state,
                    }
                case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAIL:
                    state.allRequiredDoctorInfo = [];
                    return {
                        ...state,
                    }
        default:
            return state;
    }
}

export default adminReducer;