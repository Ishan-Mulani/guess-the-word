const inputs  = document.querySelector(".inputs"),
btnReset = document.querySelector(".btn-reset"),
hint = document.querySelector(".hint span"),
typingInput = document.querySelector(".typing-input"),
wrongLetter = document.querySelector(".wrong-letters span"),
guessLeft = document.querySelector(".guess-left span")

let movie
let correctLetterArray = [] 
let wrongLetterArray = []
let maxGuess = 6


const randomMovie = ()=>{
    maxGuess = 6
    correctLetterArray = [] 
    wrongLetterArray = []
    
    const randomObject = movieList[Math.floor(Math.random()*movieList.length)]
    movie = randomObject.name
    hint.innerText = randomObject.hint
    guessLeft.innerText = maxGuess
    wrongLetter.innerText = wrongLetterArray
    
    console.log(movie)

    let html = ''
    for(let letters of movie){
        html += `<input type="text" disabled>`
    }
    inputs.innerHTML = html
}

randomMovie()

const initGame = (e)=>{
    let key = e.target.value
    if(key.match(/^[a-zA-Z\s]+$/) && !wrongLetterArray.includes(` ${key}`) && !correctLetterArray.includes(key)){
        console.log(key)
        if(movie.includes(key)){
            for(let i=0; i<=movie.length; i++){
                if(movie[i]===key){
                    inputs.querySelectorAll("input")[i].value = key
                    correctLetterArray.push(key)
                }

            }
        } else{
            wrongLetterArray.push(` ${key}`)
            maxGuess--
        }
        guessLeft.innerText = maxGuess
        wrongLetter.innerText = wrongLetterArray
    }
    typingInput.value = ''
    setTimeout(()=>{
        if(correctLetterArray.length === movie.length){
            alert(`Congrats You found movie ${movie.toUpperCase()}`)
            randomMovie()
    
        }else if(maxGuess < 1){
            alert("You ran out of guesses")
            for(let i=0; i<=movie.length; i++){
            inputs.querySelectorAll("input")[i].value = movie[i]
        }
    
        }
    },1)
}   

btnReset.addEventListener("click", randomMovie)
typingInput.addEventListener("input", initGame)
document.addEventListener("keydown", ()=> typingInput.focus())
inputs.addEventListener("click", ()=> typingInput.focus())
