import CreateUserResponse from "./CreateUserResponse";

interface User extends CreateUserResponse {

    token: string

}

export default User