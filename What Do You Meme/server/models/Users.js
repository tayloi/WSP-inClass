const Users = [
    { Name: 'Moshe', Password: '2020', Email: 'plotkinm@newpaltz.edu'},
    { Name: 'Bracha', Password: '5780', Email: 'chabadm@newpaltz.edu'}
];

module.exports = {
    CurrentUser: null,

    Login(email, password){
        const user = Users.find(x => x.Email == email);
        if(!user) throw Error('User not found');
        if(user.Password != password) throw Error('Wrong password');
    
        return this.CurrentUser = user;
    }
};