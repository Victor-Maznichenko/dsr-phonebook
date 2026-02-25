interface TokenPayload {
    email: string;
    id: number;
    role: string;
};

type RequestWithUser = import('express-serve-static-core').Request & {
    user: TokenPayload;
};
