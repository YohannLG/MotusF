const btn_login = $('#login').click(function (event) {
    event.preventDefault()
    var username = $('#username').val()
    var password = $('#password').val()
    fetch('http://localhost:5000/login?username='+username+'&password='+password)
        .then(response => 
        {
            if(response.ok){
                return response.text();
            }
        }).then(text => {
            const datas = JSON.parse(text)
            console.log(datas)
            if ($.isEmptyObject(datas)) {
                console.log(' vide')
                alert('Login ou MDP incorrect, veuillez réessayer')
            } else {
                console.log('login ',datas.login)
                localStorage.setItem('user',username)
                window.location = "index.html"
            }
        })

})