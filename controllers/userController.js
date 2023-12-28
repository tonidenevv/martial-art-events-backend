const login = (req, res) => {
    res.send('Login...')
};

const register = (req, res) => {
    res.send('Register...');
};

const logout = (req, res) => {
    res.send('Logout...');
}

module.exports = {
    login,
    register,
    logout,
}