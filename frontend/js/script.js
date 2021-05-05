window.saveDataAcrossSessions = true

const LOOK_DELAY = 2000 // 1 second
const LEFT_CUTOFF = window.innerWidth / 4
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4

let startLookTime = Number.POSITIVE_INFINITY
let lookDirection = null


webgazer
  .setGazeListener((data, timestamp) => {
    console.log(data,timestamp)
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
