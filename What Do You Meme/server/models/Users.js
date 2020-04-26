/* USERS MODEL
 * Server side
 */

const Users = [
    { Name: 'Moshe', Password: '2020', Email: 'plotkinm@newpaltz.edu', userId: 0},
    { Name: 'Bracha', Password: '5780', Email: 'chabadm@newpaltz.edu', userId: 1},
    { Name: 'Bernie', Password: '1234', Email: 'bernie@newpaltz.edu', userId: 2},
    { Name: 'Jane', Password: '5678', Email: 'janedoe@email.com', userId: 3}
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