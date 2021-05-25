function register()
{
    var data={
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        password:document.getElementById('password').value
    }
    var xh = new XMLHttpRequest();
    xh.open("POST", "http://localhost:3000/user/signup", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.send(JSON.stringify(data))
    xh.onload=function(){
        if(this.status==200)
        {
            alert('registered successfully! Login to continue')
            window.location.replace('login.html')
        }
        else{
            alert('Failed! Try again')
            window.location.replace('signup.html')
        }
}
}

function login()
{
    var data=
    {
	"email":document.getElementById('email').value,
	"password":document.getElementById('password').value
    }
    var xh = new XMLHttpRequest();
    xh.open("POST", "http://localhost:3000/user/login", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.send(JSON.stringify(data))
    xh.onload=function(){
        if(this.status==200)
        {
            var data = JSON.parse(this.responseText)
            localStorage.setItem("JWT_Token", "JWT " + data.token)
            window.location.replace('selection.html')
        }
        else{
            alert('Invalid login credentials')
            window.location.replace('login.html')
        }
}
}


