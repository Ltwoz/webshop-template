
function sendToken(user, statusCode, res) {
    const token = user.getJWTToken();

    const expires = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

    res.status(statusCode)
        .setHeader(
            "Set-Cookie",
            `token=${token}; Expires=${expires}; HttpOnly; Path=/`
        )
        .json({
            success: true,
            user,
            token,
        });
}

export default sendToken;
