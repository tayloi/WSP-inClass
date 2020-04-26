const Users = [
    { Name: 'Moshe', Password: '2020', Email: 'plotkinm@newpaltz.edu'},
    { Name: 'Bracha', Password: '5780', Email: 'chabadm@newpaltz.edu'},
    { Name: 'Bernie', Password: '1234', Email: 'bernie@newpaltz.edu'},
    { Name: 'Jane', Password: '5678', Email: 'janedoe@email.com'}
];

export let CurrentUser = null;

export function Login(email, password){
    const user = Users.find(x => x.Email == email);
    if(!user) throw Error('User not found');
    if(user.Password != password) throw Error('Wrong password');

    return CurrentUser = user;
}