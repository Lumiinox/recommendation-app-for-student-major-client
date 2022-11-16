import React from "react";

export const getIdName = (currentId: number) => {
    switch(currentId){
        case 1: return "Admin";
        case 2: return "Student";
    }
}