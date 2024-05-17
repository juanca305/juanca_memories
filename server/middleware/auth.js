import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    //Do something and then move to the next thing.

    try {
        console.log('req.headers', req.headers);
        //Here I have to see if the user is really who he is claimming to be.
        const token = req.headers.authorization.split(" ")[1];

        //To know if the token is a Google token or our custom token.
        const isCustomAuth = token.length < 500; //This is our own token(true).

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;