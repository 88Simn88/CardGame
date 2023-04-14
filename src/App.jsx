import React, {useState, useEffect} from 'react'
import Card from './components/Card'
import './App.css'

import { images } from './import'

function App() {
  
  const [cards, setCards] = useState([])
  const [firstCard, setFirstCard] = useState({})
  const [secondCard, setSecondCard] = useState({})
  const [score, setScore] = useState(0)

  const [unflippedCards, setUnflippedCards] = useState([])
  const [disabledCards, setDisabledCards] = useState([])

  const shuffleArray = (array) => {
    for(let i = array.length - 1; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1))
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  useEffect(() =>{
    shuffleArray(images)
    setCards(images)
  },[])

  useEffect(() => {
    checkForMatch()
  },[secondCard])

  const flipCard = (name, number) => {
    if(firstCard.name === name && firstCard.number === number){
      return 0;
    }
    if(!firstCard.name){
      setFirstCard({ name, number})
    }
    else if (!secondCard.name){
      setSecondCard({name, number})
    }
    return 1;
  }

  const checkForMatch = () => {
    if(firstCard.name && secondCard.name) {
      const match = firstCard.name === secondCard.name
      
      
      if(match){
        setScore(score +100) 
        disableCards()
        if(score === 600){
          console.log("ganaste")
        //  const winner = document.querySelector("p")
        //  winner.setAttribute("id", "winner") 
        }
        } else {
          unflipCards()
        }
    }
  }

  const disableCards = () => {
    setDisabledCards([firstCard.number, secondCard.number])
    resetCards()
  }

  const unflipCards = () => {
    setUnflippedCards([firstCard.number, secondCard.number])
    resetCards()
  }

  const resetCards = () => {
    setFirstCard({})
    setSecondCard({})
  }

     
  


  return (
    <div className="App">
      <h1 className='title'>Memory Card game</h1>
        <div className='allContainer'>
          <div className='scoreAndRestart'>
          
              
              {
                score===600 ?
                <>
                <div className="winner">You won!!!</div>
                <button className='btn' 
              onClick={() => window.location.reload()}>Restart</button>
                <a className="back" href="">back</a>
              </>
                :
                <>
              <h2 className='subtitle'>Score</h2>
                  <p>{score}</p>
              <button className='btn' 
              onClick={() => window.location.reload()}>Restart</button>
              <a className="back" href="">back</a>

              </>
              }
          </div>
          
          <div className='cards-container'>
          {
            cards.map((card, index) => (
              <Card
              name={card.char}
              number={index}
              frontFace={card.src}
              flipCard={flipCard}
              unflippedCards={unflippedCards}
              disabledCards={disabledCards}
              />
            ))
          }

          </div>
        </div>
        <p className='drawings'>Drawings by 
        <a href="https://www.instagram.com/sakuraliice/" target="_blank"> @sakuralice</a></p>
        <p className='game'>Game idea<a href="https://www.youtube.com/@KevinUrgiles" 
        target="_blank"> @KevinUrgiles</a></p>
    </div>
  )
}

export default App
