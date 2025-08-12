import React from 'react'
import { UserType } from '../types/user.type';

/*
    validate is reponsable to validate fields in user form.
    - its already prepared with new fields
*/
function isPopulated (value: string | undefined) {
    return (value == "" || value == null) ? false : true;
}

const validate = (values: UserType) => {
    const errors: any = {}
    if (isPopulated(values.firstName)){
        errors.firstName = 'Required'
    } 
    if (isPopulated(values.lastName)) {
        errors.lastName = 'Required'
    } 

    if (isPopulated(values.birthday)) {
        errors.birthday = 'Required'
    } else{

        var CurrentDate = new Date();
        var GivenDate = new Date(values.birthday);
    
        if(GivenDate > CurrentDate){
            errors.birthday = 'Date is greater than the current date.';
        }
    }
    if (isPopulated(values.phone)) {
        errors.mobile_phone = 'Required'
    } else if ((values.phone || "").replace(/\ /g, "").length < 11) {
        errors.mobile_phone = 'Invalid phone number, must be 10 digits'
    }
    if (isPopulated(values.department)) {
        errors.title = 'Required'
    } 

    if (values.citizen_id && ((values.citizen_id as string) || "").replace(/\-/g, "").length != 13) {
        errors.citizen_id = 'Invalid Citizen ID, must be 13 digits'
    }
    return errors
}


export default validate