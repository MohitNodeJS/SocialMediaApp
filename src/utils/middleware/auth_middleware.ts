import jwt from "jsonwebtoken";
class AuthValidation{
    Validattion(context)
    { 
        let authorization = context.token
        const token = authorization.replace("Bearer ", "")
        try {
            const decoded = jwt.verify(token, "mykey") 
            context.user = decoded
        }
        catch (Error) {
            throw new Error('Invalid Credentials jwt token ') 
        }
    }
}
export default new AuthValidation;