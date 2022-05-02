import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers, deleteUserService,
    editUserService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorServices
} from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log('fetchGenderStart err', e)
        }
    }
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (e) {
            dispatch(fetchPositionFail());
            console.log('fetchPositionStart err', e)
        }
    }
};

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFail());
            }

        } catch (e) {
            dispatch(fetchRoleFail());
            console.log('fetchRoleStart err', e)
        }
    }
};

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user success")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                dispatch(saveUserFail());
            }
        } catch (e) {
            dispatch(saveUserFail());
            console.log('saveUserFail err', e)
        }
    }
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
});

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_SUCCESS
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFail());
            }
        } catch (e) {
            dispatch(fetchAllUsersFail());
            console.log('fetchAllUsersStart err', e)
        }
    }
};


export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete user success")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Delete user err")
                dispatch(deleteUserFail());
            }
        } catch (e) {
            dispatch(deleteUserFail());
            console.log('deleteUserFail err', e)
        }
    }
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

export const EditUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("update user success")
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("update user err")
                dispatch(editUserFail());
            }
        } catch (e) {
            dispatch(editUserFail());
            console.log('editUserFail err', e)
        }
    }
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAIL', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDt: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAIL', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
            })
        }
    }
}

export const saveDetailDt = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorServices(data);
            if (res && res.errCode === 0) {
                toast.success("Save success")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS
                })
            } else {
                toast.error("Saves fail")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
                })
            }
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTOR_FAIL', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_SCHEDULE_TIME_FAIL', e)
            dispatch({
                type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAIL,
            })
        }
    }
}

export const getRequireDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_START
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPrice.errCode === 0
                && resProvince && resPrice.errCode === 0
            ) {
                let data ={
                    resPrice:resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data
                }
                dispatch(fetRequireDoctorInfoSuccess(data))
            } else {
                dispatch(fetRequireDoctorInfoFail());
            }
        } catch (e) {
            dispatch(fetRequireDoctorInfoFail());
            console.log('fetRequireDoctorInfoFail err', e)
        }
    }
};
export const fetRequireDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
    data: allRequiredData
});
export const fetRequireDoctorInfoFail = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAIL
});

