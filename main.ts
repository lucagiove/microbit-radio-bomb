function explode () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.showIcon(IconNames.SmallSquare)
    basic.showIcon(IconNames.Square)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.showIcon(IconNames.SmallSquare)
    basic.showIcon(IconNames.Square)
    basic.showIcon(IconNames.Chessboard)
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
}
function nextPlayer () {
    if (player == lastPlayer) {
        return firstPlayer
    } else {
        return player + 1
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == player) {
        bomb = 1
        radio.sendString("bombReceived")
    }
})
function previousPlayer () {
    if (player == firstPlayer) {
        return lastPlayer
    } else {
        return player - 1
    }
}
input.onButtonPressed(Button.A, function () {
    sendBombTo(previousPlayer())
})
function sendBombTo (player: number) {
    if (bomb && !(exploded)) {
        radio.sendNumber(player)
    }
}
function setupPlayer (player: number) {
    countdown = 10
    exploded = 0
    if (player == firstPlayer) {
        bomb = 1
    } else {
        bomb = 0
    }
    basic.showString("" + (player))
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "exploded") {
        exploded = 1
    }
    if (receivedString == "bombReceived") {
        bomb = 0
    }
    if (receivedString == "setup") {
        setupPlayer(player)
    }
})
input.onButtonPressed(Button.B, function () {
    sendBombTo(nextPlayer())
})
function showBomb () {
    basic.showLeds(`
        . . # # #
        . # # . .
        # # . # .
        # # # # .
        . # # . .
        `)
    basic.showLeds(`
        . . # # .
        . # # . .
        # # . # .
        # # # # .
        . # # . .
        `)
}
let countdown = 0
let exploded = 0
let bomb = 0
let lastPlayer = 0
let firstPlayer = 0
let player = 0
player = 1
firstPlayer = 1
lastPlayer = 3
radio.setGroup(1)
radio.sendString("setup")
setupPlayer(player)
loops.everyInterval(1000, function () {
    countdown += -1
    if (countdown <= 0) {
        exploded = 1
        radio.sendString("exploded")
    }
})
basic.forever(function () {
    if (bomb) {
        showBomb()
    } else {
        basic.showIcon(IconNames.Happy)
    }
    if (bomb && exploded) {
        explode()
    }
})
