
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
    const regex = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/);
    const isAlphaNumeric = regex.test(password);
    const correctLength = password.length > 8;
    console.log("isAlphaNumeric");
    console.log(isAlphaNumeric);
    console.log("isCorrectLength");
    console.log(correctLength);
    if(isAlphaNumeric && correctLength){
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

export const updateLastUrl = (url: string) => {
    const userData = sessionStorage.getItem('loginUser');
    if (userData){
        const parsedUserData = JSON.parse(userData);
        const updatedData = {
            name: parsedUserData?.name,
            email: parsedUserData?.email,
            status: parsedUserData?.status,
            currentId: parsedUserData?.currentId,
            lastUrl: url
        };
        sessionStorage.setItem('loginUser', JSON.stringify(updatedData));
    }
    
}