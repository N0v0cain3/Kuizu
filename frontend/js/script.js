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
      options :[
        {
         option:"GV",
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
  option[0].innerText=Questions[Number(event.innerText)-1].options[0].option
  option[1].innerText=Questions[Number(event.innerText)-1].options[1].option
  option[2].innerText=Questions[Number(event.innerText)-1].options[2].option
console.log(event.innerText)
}