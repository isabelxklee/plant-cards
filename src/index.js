fetch(flashcardsURL)
    .then(r => r.json())
    .then((flashcardsArr) => {
        loadLearningMode(flashcardsArr)
        learningModeLinkAction()
        quizTimeLinkAction()
    })

function learningModeLinkAction() {
    let learningModeLink = document.getElementById("learning-mode")

    learningModeLink.addEventListener("click", () => {
        fetch(flashcardsURL)
            .then(r => r.json())
            .then((flashcardsArr) => {
                loadLearningMode(flashcardsArr)
            })
    })
}

function loadLearningMode(flashcardsArr) {
    document.body.innerHTML = learningMode
    renderFrontFlashcard(flashcardsArr[0])
    renderPageElements(flashcardsArr)
    learningModeLinkAction()
    quizTimeLinkAction()
}

function renderPageElements(flashcardsArr) {
    let cardCount = document.getElementById("card-count")
    cardCount.innerText = `1 / ${flashcardsArr.length} cards`

    let backButton = document.getElementById("back-button")
    let nextButton = document.getElementById("next-button")

    let indexPosition = 0

    nextButton.addEventListener("click", (event) => {
        indexPosition = indexPosition + 1
        renderFrontFlashcard(flashcardsArr[indexPosition])
        cardCount.innerText = `${indexPosition + 1} / ${flashcardsArr.length} cards`

        console.log(`Index position: ${indexPosition}`)
    })

    backButton.addEventListener("click", (event) => {
        indexPosition = indexPosition - 1
        renderFrontFlashcard(flashcardsArr[indexPosition])
        cardCount.innerText = `${indexPosition + 1} / ${flashcardsArr.length} cards`

        console.log(`Index position: ${indexPosition}`)
    })
}

function renderFrontFlashcard(flash) {
    let innerCard = document.querySelector(".flip-card")
    innerCard.innerHTML = ""

    let plantImage = document.createElement("img")
    plantImage.classList.add("flip-card-front")
    plantImage.id = "plant-image"
    plantImage.src = flash.plant_image

    let plantName = document.createElement("h2")
    plantName.classList.add("flip-card-front")
    plantName.id = "plant-name"
    plantName.innerText = flash.plant_name

    innerCard.append(plantImage, plantName)

    innerCard.addEventListener("click", (event) => {
        innerCard.innerHTML = ""
        renderBackCardInfo(flash)
    })
}

function renderBackCardInfo(flash) {
    let innerCard = document.querySelector(".flip-card")

    let emojiRating = document.createElement("p")
    emojiRating.classList.add("flip-card-back", "rating")
    emojiRating.innerText = flash.emoji_rating

    let lineBreak = document.createElement("br")

    let factTitle = document.createElement("h4")
    factTitle.classList.add("flip-card-back", "title")
    factTitle.innerText = flash.fact_title

    let factContent = document.createElement("p")
    factContent.classList.add("flip-card-back", "content")
    factContent.innerText = flash.fact_content

    innerCard.append(emojiRating, lineBreak, factTitle, factContent)

    innerCard.addEventListener("click", (event) => {
        innerCard.innerHTML = ""
        renderFrontFlashcard(flash)
    })
}

//////////////////////////////////////////////////////////////////////////////////////////

function quizTimeLinkAction() {
    let quizLink = document.getElementById("quiz-time")

    quizLink.addEventListener("click", () => {
        fetch(questionsURL)
            .then(r => r.json())
            .then((questionsArr) => {
                loadQuizMode(questionsArr)
                learningModeLinkAction()
            })
    })
}

function loadQuizMode(questionsArr) {
    document.body.innerHTML = quizTime
    renderQuizElements(questionsArr)
    quizTimeLinkAction()
}

function renderQuizElements(questionsArr) {
    let scoreKeeper = document.getElementById("score")
    let scoreCount = 0
    scoreKeeper.innerText = `Score: ${scoreCount}`

    let answerOptions = document.querySelector(".answer-options")
    let answerStatus = document.getElementById("status")

    let questionIndex = 0
    
    let questionStatement = document.getElementById("question")
    questionStatement.innerText = `${questionsArr[questionIndex].content}`

    let nextQuestion = document.getElementById("next-question")
    nextQuestion.classList.add("incorrect")

    answerOptionLoop(questionsArr[questionIndex])

    nextQuestion.addEventListener("click", (event) => {
        console.log(event.target)

        questionIndex = questionIndex + 1
        console.log(`Next index position: ${questionIndex}`)
        console.log(questionsArr[questionIndex].content)

        answerOptions.innerHTML = ""
        questionStatement.innerText = `${questionsArr[questionIndex].content}`

        answerStatus.innerText = ""

        // load the new answer options
        answerOptionLoop(questionsArr[questionIndex])

    }) // end of continue button event listener
} // end of function

function answerOptionLoop(singleQuestion) {
    let scoreKeeper = document.getElementById("score")
    let scoreCount = 0
    scoreKeeper.innerText = `Score: ${scoreCount}`
    
    let answerOptions = document.querySelector(".answer-options")
    let answerStatus = document.getElementById("status")

    let nextQuestion = document.getElementById("next-question")
    nextQuestion.classList.add("incorrect")

    singleQuestion.answers.forEach((answer) => {    
        let answerButton = document.createElement("button")
        answerButton.innerText = answer.content
        answerOptions.append(answerButton)
    
        answerButton.addEventListener("click", (event) => {
    
            if (answer.correct_answer === true) {
                console.log("This is correct!")
                answerButton.classList.toggle("correct")
    
                answerStatus.innerText = "Correct! 🎉"
    
                scoreCount = scoreCount + 100
                scoreKeeper.innerText = `Score: ${scoreCount}`
    
                nextQuestion.classList.remove("incorrect")
            } else {
                console.log("WRONG!")
                answerStatus.innerText = "Wrong answer 😔"
                answerButton.classList.toggle("incorrect")
            }
        }) // end of answer button event listener
    }) // end of for each statement
}