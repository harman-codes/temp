export type UsersDataType = {
    users: {
        id: string;
        name: string;
        email: string;
    }[];
    departments: {
        id: string;
        name: string;
        code: string;
    }[];
};

export type UserType = {
    id: string;
    name: string;
    email: string;
};
export type DepartmentType = {
    id: string;
    name: string;
    code: string;
};
