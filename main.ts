function mkcsender41 () {
    car4sender.comment("")
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    bM1 = !(bM1)
    zeigeStatus()
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    bMotorPower = !(bMotorPower)
})
function zeigeStatus () {
    if (!(bM1)) {
        basic.showLeds(`
            . . # . .
            . # . # .
            . . # . .
            # # # # #
            # . . . #
            `)
    } else {
        basic.showLeds(`
            # # . . .
            . # . . .
            . # . . .
            . # # # #
            # # # . .
            `)
    }
}
let bM1 = false
let bMotorPower = false
car4sender.beimStart(240)
bMotorPower = false
bM1 = false
zeigeStatus()
loops.everyInterval(400, function () {
    if (bMotorPower) {
        basic.setLedColor(0x0000ff)
    } else {
        basic.setLedColor(basic.rgb(7, 0, 0))
    }
    if (car4sender.joystickQwiic() && !(bM1)) {
        car4sender.sendBuffer_setUint8(car4sender.eBufferOffset.b0_Motor, car4sender.joystickValues(car4sender.eJoystickValue.motor))
        car4sender.sendBuffer_setUint8(car4sender.eBufferOffset.b1_Servo, car4sender.joystickValues(car4sender.eJoystickValue.servo))
        car4sender.sendBuffer_setUint8(car4sender.eBufferOffset.b1_3Bit, 4)
        car4sender.sendBuffer0_setBit(car4sender.eBufferBit.x80_MotorPower, bMotorPower)
        car4sender.sendBuffer0_setBit(car4sender.eBufferBit.x40_Hupe, input.buttonIsPressed(Button.B))
        car4sender.sendBuffer19()
    } else if (car4sender.joystickQwiic() && bM1) {
        radio.sendValue("M1", car4sender.joystickValues(car4sender.eJoystickValue.motor))
    }
    basic.turnRgbLedOff()
})
