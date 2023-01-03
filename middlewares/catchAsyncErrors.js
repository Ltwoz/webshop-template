// eslint-disable-next-line import/no-anonymous-default-export
export default (func) => async (req, res) => {
    try {
        await func(req, res);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
