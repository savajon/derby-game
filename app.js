let players = [];
function generatePlayers(numberOfPlayers) {
    if (isNaN(numberOfPlayers) || numberOfPlayers == "") { console.error("invalid number of players") }
    else { showPlayers(numberOfPlayers) }
}
function hideSetup() { document.getElementById('setup').style.display = "none" }
function showSetup() { document.getElementById('setup').style.display = "block" }
function showPlayers(numberOfPlayers) {
    resetPlayers()
    document.getElementById('playerContainer').style.display = "block";
    for (let i = 1; i <= numberOfPlayers; i++) { addPlayerEntry(i) }
    document.getElementById("startGame").style.visibility = "visible"
}
function resetPlayers() { document.getElementById('playerContainer').innerHTML = "" }
function addPlayerEntry(playerNumber) {
    let playerContainer = document.getElementById('playerContainer')
    let player = document.createElement('div')
    player.innerText = `Enter Name for player #${playerNumber}: `
    let playerInput = document.createElement('input')
    playerInput.type = "text";
    playerInput.id = `playerInput${playerNumber}`
    player.appendChild(playerInput)
    playerContainer.appendChild(player)
    players.push({ id: playerNumber, leftPos: 0 })
}
function startGame() {
    hideSetup();
    document.getElementById("play").style.visibility = "visible"
    for (let player of players) {
        player.name = document.getElementById(`playerInput${player.id}`).value
        createPlayer(player)
    }
    runLoop()
}
function runLoop() {
    let startTime = new Date().getTime()
    let raceInterval = setInterval(function () {
        for (let player of players) {
            let finishRight = document.getElementById('playerTrack').offsetWidth
            let playerDOM = document.getElementById(`player${player.id}`)
            let playerRight = parseInt(playerDOM.style.left) + parseInt(playerDOM.offsetWidth)
            if (playerRight >= finishRight) {
                clearInterval(raceInterval)
                let winnerDiv = document.getElementById('winner')
                winnerDiv.innerHTML = `${player.name} Wins!!!<br>Run time was ${player.runTime}`
                winnerDiv.style.visibility = "visible"
            }
            player.leftPos += Math.ceil(Math.random() * 10);
            player.runTime = calculateSecondsElapsed(startTime, new Date().getTime()) 
            document.getElementById('timer').innerText = player.runTime
            playerDOM.style.left = `${player.leftPos}px`;
            playerDOM.style.transform = `rotate(${(Math.round(Math.random()) * 2 - 1) * 2}deg)`;
        }
    }, 50)
}

function calculateSecondsElapsed(start, current){
    let secondsElapsed = new Date(0);
    secondsElapsed.setSeconds((current - start) / 1000);
    return secondsElapsed.toISOString().substring(11, 19)

}

function createPlayer(player) {
    let playDiv = document.getElementById('play')
    let playerElement = document.createElement('div')
    playerElement.textContent = player.name
    playerElement.style.border = "1px solid black"
    playerElement.style.width = "10%"
    playerElement.style.height = "150px"
    playerElement.style.position = "relative"
    playerElement.id = `player${player.id}`
    playerElement.style.backgroundImage = `url('https://thishorsedoesnotexist.com?${playerElement.id}')`
    playerElement.style.backgroundSize = "cover"
    playDiv.appendChild(playerElement)
}
//event listeners
document.getElementById('generatePlayers').addEventListener('click', () => {
    let numberOfPlayers = document.getElementById('numberOfPlayers').value;
    generatePlayers(+numberOfPlayers)
})
document.getElementById("startGame").addEventListener('click', () => { startGame() })