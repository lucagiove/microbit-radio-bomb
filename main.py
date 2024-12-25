def explode():
    basic.show_leds("""
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        """)
    basic.show_icon(IconNames.SMALL_SQUARE)
    basic.show_icon(IconNames.SQUARE)
    basic.show_leds("""
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        """)
    basic.show_icon(IconNames.SMALL_SQUARE)
    basic.show_icon(IconNames.SQUARE)
    basic.show_icon(IconNames.CHESSBOARD)
    basic.show_leds("""
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        """)

def on_received_number(receivedNumber):
    global bomb
    if receivedNumber == player2:
        bomb = 1
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    sendBombTo(1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def sendBombTo(player: number):
    global bomb
    if bomb and not (exploded):
        radio.send_number(player)
        bomb = 0

def on_received_string(receivedString):
    global exploded
    if receivedString == "exploded":
        exploded = 1
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    sendBombTo(2)
input.on_button_pressed(Button.B, on_button_pressed_b)

def showBomb():
    basic.show_leds("""
        . . # # #
        . # # . .
        # # . # .
        # # # # .
        . # # . .
        """)
    basic.show_leds("""
        . . # # .
        . # # . .
        # # . # .
        # # # # .
        . # # . .
        """)
exploded = 0
bomb = 0
player2 = 0
player2 = 3
bomb = 0
countdown = 15
exploded = 0
radio.set_group(1)
basic.show_string("" + str(player2))

def on_every_interval():
    global countdown, exploded
    countdown += -1
    if countdown <= 0:
        exploded = 1
        radio.send_string("exploded")
loops.every_interval(1000, on_every_interval)

def on_forever():
    if bomb:
        showBomb()
        if exploded:
            explode()
    else:
        basic.show_icon(IconNames.HAPPY)
basic.forever(on_forever)
