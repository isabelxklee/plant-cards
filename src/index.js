fetch(plantsURL)
    .then(r => r.json())
    .then((plantsArr) => {
        loadLearningMode(plantsArr)
    })

function learningModeLinkAction() {
    let learningModeLink = document.getElementById("learning-mode")

    learningModeLink.addEventListener("click", () => {
        fetch(plantsURL)
            .then(r => r.json())
            .then((plantsArr) => {
                loadLearningMode(plantsArr)
            })
    })
}

function loadLearningMode(plantsArr) {
    document.body.innerHTML = learningMode
    learningModeLinkAction()
    quizTimeLinkAction()
    scoreboardLinkAction()
    plantFlashcard(plantsArr[0])
    renderPageElements(plantsArr)
}

function renderPageElements(plantsArr) {
    let plantCount = document.getElementById("plant-count")
    plantCount.innerText = `1 / ${plantsArr.length} plants`

    let backButton = document.getElementById("back-button")
    let nextButton = document.getElementById("next-button")

    let indexPosition = 0

    nextButton.addEventListener("click", (event) => {
        indexPosition = indexPosition + 1
        renderFrontFlashcard(plantsArr[indexPosition])
        plantCount.innerText = `${indexPosition + 1} / ${plantsArr.length} plants`

        console.log(`Index position: ${indexPosition}`)
    })

    backButton.addEventListener("click", (event) => {
        indexPosition = indexPosition - 1
        renderFrontFlashcard(plantsArr[indexPosition])
        plantCount.innerText = `${indexPosition + 1} / ${plantsArr.length} plants`

        console.log(`Index position: ${indexPosition}`)
    })
}

function plantFlashcard(plant) {
    let pageContainer = document.querySelector(".card-intro")

    let innerCard = document.getElementById("plant-info")
    innerCard.innerHTML = ""

    let plantImage = document.createElement("img")
    plantImage.id = "plant-image"
    plantImage.src = plant.image

    let plantName = document.createElement("h1")
    plantName.id = "plant-name"
    plantName.innerText = plant.name

    innerCard.append(plantName, plantImage)

    plant.flashcards.forEach((flashcard) => {
        let pageContainer = document.querySelector(".card-intro")

        let flashcardContainer = document.createElement("div")
        flashcardContainer.classList.add("card", "flashcard")
        flashcardContainer.id = `number-${flashcard.id}`

        pageContainer.append(flashcardContainer)

        loadFront(flashcard)
    })
}

function loadFront(flashcard) {
    let pageContainer = document.querySelector(".card-intro")
    let flashcardContainer = pageContainer.querySelector(`#number-${flashcard.id}`)

    let factTitle = document.createElement("h2")
    factTitle.classList.add("flip-card-front", "title")
    factTitle.innerText = flashcard.fact_title

    flashcardContainer.append(factTitle)

    flashcardContainer.addEventListener("click", () => {
        flashcardContainer.innerHTML = ""
        loadBack(flashcard)
    })
}

function loadBack(flashcard) {
    let pageContainer = document.querySelector(".card-intro")
    let flashcardContainer = pageContainer.querySelector(`#number-${flashcard.id}`)

    let emojiRating = document.createElement("p")
    emojiRating.classList.add("flip-card-back", "rating")
    emojiRating.innerText = flashcard.emoji_rating

    let lineBreak = document.createElement("br")

    let factContent = document.createElement("p")
    factContent.classList.add("flip-card-back", "content")
    factContent.innerText = flashcard.fact_content

    flashcardContainer.append(emojiRating, lineBreak, factContent)

    flashcardContainer.addEventListener("click", () => {
        flashcardContainer.innerHTML = ""
        loadFront(flashcard)
    })
}