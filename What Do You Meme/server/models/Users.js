/* USERS MODEL
 * Server side
 */

const Users = [
    { Name: 'Moshe', Password: '2020', Email: 'plotkinm@newpaltz.edu', userId: 0},
    { Name: 'Bracha', Password: '5780', Email: 'chabadm@newpaltz.edu', userId: 1}
];

module.exports = {
    Login(email, password){
        const user = Users.find(x => x.Email == email);
        if(!user) throw Error('User not found');
        if(user.Password != password) throw Error('Wrong password');
    
        return user;
    },
    Get(userId) { //Get: (userId) => Users[userId]
        return Users[userId];
    }
};