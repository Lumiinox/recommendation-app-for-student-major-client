
export const getIdName = (status: number) => {
    switch(status){
        case 1: return "Admin";
        case 2: return "Student";
    }
}

export const checkEmail = (email: string) => {
    const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
}

export const checkPassword = (password: string) => {
    const res = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    const isAlphaNumeric = password.match(res);
    const correctLength = password.length > 8;
    if(!isAlphaNumeric && correctLength){
        return true;
    } else {
        return false;
    }
}

export const checkConfirmedPassword = (password: string, confirmPass: string) => {
    if(password === confirmPass){
        return true;
    } else {
        return false;
    }
}

export const checkIfNumber = (args: any) => {
    if(parseInt(args)){
        return true;
    } else {
        return false;
    }
}