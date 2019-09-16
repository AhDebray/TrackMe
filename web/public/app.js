$('#navbar').load('navbar.html');
$('#footer').load('footer.html');
const API_URL = 'http://localhost:5000/api';

$.get(`${API_URL}/devices`)
.then(response => {
    response.forEach(device => {
        $('#devices tbody').append(`
            <tr>
            <td>${device.user}</td>
            <td>${device.name}</td>
            </tr>`
        );
    });
})
.catch(error => {
console.error(`Error: ${error}`);
});

const users = JSON.parse(localStorage.getItem('users')) || [];
const isAuthenticated = "";
var check = "false";

const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = 'login.html';
}


users.forEach(function(users)
{
    $('#users tbody').append(`
    <tr>
        <td>${users.username}</td>
        <td>${users.password}</td>
        <td>${users.confirmpassword}</td>
    </tr>`
    );
});

$('#add-device').on('click', () => {
    const name = $('#name').val();
    const user = $('#user').val();
    const sensorData = [];

    const body = {
        name,
        user,
        sensorData
    };

    $.post(`${API_URL}/devices`, body)
    .then(response => {
        location.href = '/';
    })

    .catch(error => {
        console.error(`Error: ${error}`);
    });
});
   
   $('#register').on('click', function() {
    const newuser = $('#username').val();
    const newpassword = $('#password').val();
    const newpassword2 = $('#confirmpassword').val();

    const exists = users.find(users => users.username === newuser);
    

    if( newpassword == newpassword2)
    {
        if(exists)
        {
            $('#errormessage').append("This user Already Exists");
        }
        else
        {
            users.push({ username: newuser, password: newpassword});
            localStorage.setItem('users', JSON.stringify(users));
            location.href = 'login.html';
        }
    }
   });

   $('#login').on('click', function() {
    const user = $('#username').val();
    const password = $('#password').val();
    
    const exists = users.find(users => users.username === user);

    if(exists && exists.password == password )
    {
        check = "true";
        localStorage.setItem('isAuthenticated', 'true');
        location.href = '/';
    }
    else 
    {
        localStorage.setItem('isAuthenticated', 'false');
        $('#errorrmessage').append("The password or the Username is wrong");
    }
    if (localStorage.getItem('isAuthenticated'))
    {
        location.href = 'register-device.html';
    }
   });

$('#send-command').on('click', function() {
    const command = $('#command').val();
    console.log(`command is: ${command}`);
   });
   