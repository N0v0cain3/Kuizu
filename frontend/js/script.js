window.saveDataAcrossSessions = true

const LOOK_DELAY = 2000 // 1 second
const LEFT_CUTOFF = window.innerWidth / 4
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4

let startLookTime = Number.POSITIVE_INFINITY
let lookDirection = null


webgazer
  .setGazeListener((data, timestamp) => {
    // console.log(data,timestamp)
    if (data == null || lookDirection === "STOP") return

    if (
      data.x < LEFT_CUTOFF &&
      lookDirection !== "LEFT" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = timestamp
      lookDirection = "LEFT"
    } else if (
      data.x > RIGHT_CUTOFF &&
      lookDirection !== "RIGHT" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = timestamp
      lookDirection = "RIGHT"
    } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
      startLookTime = Number.POSITIVE_INFINITY
      lookDirection = null
    }

    if (startLookTime + LOOK_DELAY < timestamp) {
      if (lookDirection === "LEFT") {
       playAudio()
        alert("stop looking around")
       

      } else {
        playAudio()
        alert("stop looking around")
      }

      startLookTime = Number.POSITIVE_INFINITY
      lookDirection = "STOP"
      setTimeout(() => {
        lookDirection = "RESET"
      }, 200)
    }
  })
  .begin()


  function playAudio() {
    var x = document.getElementById("myAudio"); 

    x.play()
  }
// webgazer.showVideoPreview(false).showPredictionPoints(false)

function select(event){
  let option = document.getElementsByClassName("option")
  option[0].classList.remove("selected")
  option[1].classList.remove("selected")
  option[2].classList.remove("selected")
  event.classList.add("selected")
  console.log(event.innerText)
}




function showQuestion(event){
  const Questions =[
    {
      question:"What is the capital of india",
      correct:"Gujarat",
      options :[
        {
         option:"Wuhan",
         correct:false 
        },
        {
          option:"Gujarat",
          correct:true 
         },
         {
          option:"Lahore",
          correct:false 
         }
      ]
    },
    {
      question:"Who invented the Light Bulb?",
      correct:"Shivam Mehta",
      options :[
        {
         option:"Ricky Gervais",
         correct:false 
        },
        {
          option:"Shivam Mehta",
          correct:true 
         },
         {
          option:"Thomas Shelby",
          correct:false 
         }
      ]
    },
    {
      question:"One kilogram equals how many grams?",
      correct:"1000",
      options :[
        {
         option:"1000",
         correct:false 
        },
        {
          option:"100",
          correct:true 
         },
         {
          option:"10",
          correct:false 
         }
      ]
    },
    {
      question:"Which is the smallest even number?",
      correct:"2",
      options :[
        {
         option:"0",
         correct:false 
        },
        {
          option:"-2",
          correct:true 
         },
         {
          option:"2",
          correct:false 
         }
      ]
    },
    {
      question:"5 times 6 equals to",
      correct:"30",
      options :[
        {
         option:"30",
         correct:false 
        },
        {
          option:"11",
          correct:true 
         },
         {
          option:"300",
          correct:false 
         }
      ]
    },
    {
      question:"Capital of Himachal Pradesh",
      correct:"F",
      options :[
        {
         option:"Shimla",
         correct:false 
        },
        {
          option:"Dharmashala",
          correct:true 
         },
         {
          option:"F",
          correct:false 
         }
      ]
    },
  ]
question = document.getElementById("question")
question.innerText = Questions[Number(event.innerText)-1].question
let option = document.getElementsByClassName("option")
option[0].classList.remove("selected")
option[1].classList.remove("selected")
option[2].classList.remove("selected")
  option[0].innerText=Questions[Number(event.innerText)-1].options[0].option
  option[1].innerText=Questions[Number(event.innerText)-1].options[1].option
  option[2].innerText=Questions[Number(event.innerText)-1].options[2].option
console.log(event.innerText)
}

// var answers =[]

function save(event) {
option = document.getElementsByClassName("option")
console.log(option[0].classList)
if(option[0].classList.contains("selected")){
if(!answers.includes(option[0].innerText))
answers.push(option[0].innerText)
}
else if(option[1].classList.contains("selected")){
  if(!answers.includes(option[1].innerText))
  answers.push(option[1].innerText)
}
else if(option[2].classList.contains("selected")){
  if(!answers.includes(option[2].innerText))
  answers.push(option[2].innerText)
}
else{
console.log('ille')
}
console.log(answers)
}

function result(){
  correct=0
  correctAnswers = ["Gujarat","Shivam Mehta","1000","2","30","F"]
  console.log(answers)
  for(i in answers){
    for(j in correctAnswers)
    if(answers[i]==correctAnswers[j]){
      correct+=1
    }
  }
 
  x = document.getElementById("result")
  x.innerText = ` Your score is ${correct}`
  localStorage.setItem("result", correct);
  console.log("Result : ", correct)
  window.location.replace("http://127.0.0.1:5500/frontend/index.html");

}