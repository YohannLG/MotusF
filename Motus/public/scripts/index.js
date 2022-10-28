let good_word ='' // Le mot du jour va etre enregisté ici

////////////////////////////////////////////////////////////////
    // on appel l'API WORD
    $.get('/word', (data)=> 
    {
        good_word =  data
        const word_test =  $('#word_test')
        word_test[0].setAttribute("maxlength",good_word.length)
        console.log('LE mot du jour : ',good_word,' de longueur ',good_word.length)
        const container = $('.container-grid')
        console.log('ma grid ',container)
        container.empty()
        for (let i = 0; i < good_word.length; i ++) {

            container.append('<div class="grid"><label for="word_test" class="grid-label"></label></div>')
        }


        const grid_labels = $('.grid-label')
        console.log('mes cases : ',grid_labels)

        word_test.keydown(function (event) {
            grid_labels.removeClass('grid_ok')
            grid_labels.removeClass('grid_misplaced')
            grid_labels.removeClass('grid_false')
            const value_test = event.target.value
            const letters = value_test.split('')
            console.log(letters)

            for (let i = 0; i < grid_labels.length; i++) {
                grid_labels.eq(i).empty()
                grid_labels.eq(i).html(letters[i])
                
            }
        });
        word_test.keyup(function (event) {
            grid_labels.removeClass('grid_ok')
            grid_labels.removeClass('grid_misplaced')
            grid_labels.removeClass('grid_false')
            const value_test = event.target.value
            const letters = value_test.split('')
            console.log(letters)

            for (let i = 0; i < grid_labels.length; i++) {
                grid_labels.eq(i).empty()
                grid_labels.eq(i).html(letters[i])
                
            }
      });
        
    })

////////////////////////////////////////////////////////////////
    // on appel l'API NEW WORD POUR GENERER UN NOUVEAU MOT
    const btn_new_word = $('#new_word')
    btn_new_word[0].addEventListener('click', function(event){
        event.preventDefault()
        $.get('/new_word', (new_word)=> {
            good_word = new_word
            const word_test =  $('#word_test')
            word_test[0].setAttribute("maxlength",new_word.length)
            console.log('LE nouveau mot du jour : ',new_word,' de longueur ',new_word.length)

            word_test.val('')
            const container = $('.container-grid')
            console.log('ma grid ',container)
            container.empty()
            for (let i = 0; i < new_word.length; i ++) {
                
                container.append('<div class="grid"><label for="word_test" class="grid-label"></label></div>')
            }


        const grid_labels = $('.grid-label')
        console.log('mes cases : ',grid_labels)
        console.log('Ma value apres new word : ',word_test.val())

        word_test.keydown(function (event) {
            grid_labels.removeClass('grid_ok')
            grid_labels.removeClass('grid_misplaced')
            grid_labels.removeClass('grid_false')
            const value_test = event.target.value
            const letters = value_test.split('')
            console.log(letters)

            for (let i = 0; i < grid_labels.length; i++) {
                grid_labels.eq(i).empty()
                grid_labels.eq(i).html(letters[i])
                
            }
        });
        word_test.keyup(function (event) {
            grid_labels.removeClass('grid_ok')
            grid_labels.removeClass('grid_misplaced')
            grid_labels.removeClass('grid_false')
            const value_test = event.target.value
            const letters = value_test.split('')
            console.log(letters)

            for (let i = 0; i < grid_labels.length; i++) {
                grid_labels.eq(i).empty()
                grid_labels.eq(i).html(letters[i])
                
            }
        });

        })
        
    });
    
////////////////////////////////////////////////////////////////
    // Fonction qui compare les mots lettre par lettre 
    function compareWords(test,good) {
        var compare = false
        var count = 0
        const grid_letters = $('.grid-label')
        grid_letters.removeClass('grid_ok')
        grid_letters.removeClass('grid_misplaced')
        grid_letters.removeClass('grid_false')
        console.log('Votre test : ',test)
        console.log('le mot a trouver : ',good)
        
        const tests = test.split('')
        const goods = good.split('')
        
        
        
        tests.forEach((letter,index) => {
            if (letter == goods[index]) {
                count ++
              //  console.log('Oui : ',letter,' = ',goods[index])
                grid_letters.eq(index).addClass('grid_ok')
                //console.log('MA grille :',grid_letters)
            }else{
                if (goods.includes(letter)) {
                    grid_letters.eq(index).addClass('grid_misplaced')
                } else {
                    grid_letters.eq(index).addClass('grid_false')
                   // console.log('MA grille :',grid_letters)
                }

            }
        });

        if (count == good_word.length) {
            compare =true
        }
        return compare
    }
////////////////////////////////////////////////
    const btn_submit =  $('#submit')
    btn_submit[0].addEventListener('click', function(event){
        event.preventDefault()
        const test =  $('#word_test').val()
        if (test.length != good_word.length) {
            alert('Remplissez la grille avant de tester')
        } else {
           var compare =  compareWords(test,good_word)
            console.log('comparaison',compare)
           if (compare==true) {
            console.clear()
            console.log(' VOUS AVEZ TROUVE LE MOT : ',good_word)
            console.log('Appel de lAPI pour update le score')


        const user = localStorage.getItem('user')
        fetch('http://localhost:4000/get_score?user='+user)
            .then(response => 
            {
                if(response.ok){
                    return response.text();
                }
            }).then(text => {
                const datas = JSON.parse(text)

                var score = datas.score
                var avg_tries = datas.avg_tries
                var all_tries = Math.round(score*avg_tries)

                console.log('score ',score)
                console.log('avg ', avg_tries)
                console.log('all tries ', all_tries)
                score = score + 1
                all_tries = all_tries + 1 
                if (score==0) {
                    avg_tries = all_tries
                }else{
                    avg_tries = (all_tries / score).toFixed(2);
                }
                
                fetch('http://localhost:4000/update_score?user='+user+'&score='+score+'&avg_tries='+avg_tries)
                .then(response => 
                {
                    if(response.ok){
                        return response.text();
                    }
                }).then(text => {
                    const datas = JSON.parse(text)
                    console.log(datas)
                })

            })

            


           } else {
            console.clear()
            console.log('FAUX ! ')
            console.log('Appel de lAPI pour update les essais')
            const user = localStorage.getItem('user')
            fetch('http://localhost:4000/get_score?user='+user)
            .then(response => 
            {
                if(response.ok){
                    return response.text();
                }
            }).then(text => {
                const datas = JSON.parse(text)

                var score = datas.score
                var avg_tries = datas.avg_tries
                if (score != 0) {
                    var all_tries = Math.round(score*avg_tries)
                }else{
                    var all_tries = Math.round(avg_tries)
                }

                console.log('score ',score)
                console.log('avg ', avg_tries)
                console.log('all tries ', all_tries)
                all_tries = all_tries + 1 
                if (score==0) {
                    avg_tries = all_tries
                }else{
                    avg_tries = (all_tries / score).toFixed(2);
                }
                
                fetch('http://localhost:4000/update_score?user='+user+'&score='+score+'&avg_tries='+avg_tries)
                .then(response => 
                {
                    if(response.ok){
                        return response.text();
                    }
                }).then(text => {
                    const datas = JSON.parse(text)
                    console.log(datas)
                })

            })
           }
        }
        
    })
