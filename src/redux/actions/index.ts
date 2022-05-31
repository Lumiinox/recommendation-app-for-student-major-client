interface Payload{
    name: string;
    email: string;
    status: string;
    nim: string;
}

interface UpdateAccountData{
    type: "update-acc-data"
    payload: Payload;
}

interface RemoveAccountData{
    type: "remove-acc-data"
}

export type Action = UpdateAccountData | RemoveAccountData;