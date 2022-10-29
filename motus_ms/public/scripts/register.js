const btn_login = $('#register').click(function (event) {
    event.preventDefault()
    var username = $('#username').val()
    var password = $('#password').val()
    var confirm_password = $('#confirm_password').val()
    fetch('http://localhost:5000/register?username='+username+'&password='+password+'&confirm_password='+confirm_password)
        .then(response => 
        {
            if(response.ok){
                return response.text();
            }
        }).then(text => {
            const datas = JSON.parse(text)
            console.log(datas)

            if (datas.erreur != null) {
                console.log(datas.erreur)
                alert(datas.erreur)
            } else {
                console.log(datas.new_user,datas.new_score)
                console.log(datas.new_score.login,datas.new_score.score,datas.new_score.avg_tries)
                console.log('LE USER  CONNECTE APRES INSCRIPTION :',datas.new_user)
                localStorage.setItem('user',datas.new_user.login)
                alert('Votre inscription a été réalisée avec succès !')
                window.location = "index.html"
                fetch('http://localhost:4000/new_score?user='+datas.new_score.login+'&score='+datas.new_score.score+'&avg_tries='+datas.new_score.avg_tries)
                    .then(response => 
                    {
                        if(response.ok){
                            return response.text();
                        }
                    }).then(text => {
                        const datas = JSON.parse(text)
                        console.log(datas)
                    })
                        }
                    })

    

})