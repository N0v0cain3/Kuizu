function getquiz() {
    var jwt = localStorage.getItem('JWT_Token')
    console.log(jwt)
    var xh = new XMLHttpRequest();
    xh.open("GET", "http://localhost:3000/quiz/view?id=60afab9285e4e0d50adce366", true)
    xh.setRequestHeader('Content-Type', 'application/json')
    xh.setRequestHeader('Authorization', jwt)
    xh.send()
    xh.onload = function () {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText)
            console.log(data.quiz.quiz)
            const newdata = data.quiz.quiz
            console.log(newdata.questions)
            for (var i = 0; i < newdata.questions.length; i++) {
                
                $('#questionContainer').append(`<div class="item">
                <div class="question">
                    <p>${newdata.questions[i].title}</p>
                    <div class ="options" id="options"> </div>
                </div>
               
            </div>`)
            for (var j = 0; j < 3; j++){
                $('#options').append(`<p>${newdata.questions[i].options[j]}</p>`)
            }

            }
           
          

        }
        else if(this.status==400){
            alert('Error in getting items')
        }
        else if(this.status==401){
            alert('Please authenticate user')
        }
    }

}
