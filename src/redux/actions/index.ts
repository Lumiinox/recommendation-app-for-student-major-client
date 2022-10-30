interface Payload{
    name: string;
    email: string;
    status: number;
    nim: number;
}

interface UpdateAccountData{
    type: "update-acc-data"
    payload: Payload;
}

interface RemoveAccountData{
    type: "remove-acc-data"
}

export type Action = UpdateAccountData | RemoveAccountData;