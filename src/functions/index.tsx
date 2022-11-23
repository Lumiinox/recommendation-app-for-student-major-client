
export const getIdName = (status: number) => {
    switch(status){
        case 1: return "Admin";
        case 2: return "Student";
    }
}