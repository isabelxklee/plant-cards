// persistent header throughout the entire user experience

let header = `
    <div class="header">
        <a href="#default" class="logo">🌿 Plant Flashcards 🌿</a>
        <div class="header-right">
            <a href="#default" id="learning-mode">Learning mode</a>
            <a href="#default" id="quiz-time">Quiz time</a>
        </div>
    </div>
`

// load a single flashcard
// fill the inner card div with the correct flashcard information

let learningMode = `

    ${header}

    <div class="card-intro">
        <h1>Click on the card to flip it.</h1>
        <div class="flip-card">
        </div>

        <div id="flashcard-navigation">
            <p id="card-count"></p>
            <div class="btn-group">
                <button class="navigation" id="back-button">Previous</button>
                <button class="navigation" id="next-button">Next</button>
            </div>
        </div>
    </div>
`

// quiz game

let quizTime = `

    ${header}

    <div class="quiz-intro">
        <p id="card-count"></p>
        
        <h1 id="question"></h1>
        <div class="answer-options">
        </div><br>

        <h2 id="status"></h2>
        <h2 id="score">Score: 0</h2>

        <button class="navigation" id="next-question">Continue</button>
    </div>
`

let scoreboard = `

    ${header}

    <h1>All scores</h1>
`