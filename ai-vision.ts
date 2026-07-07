enum A4VisionRgbColor {
    //% block="red"
    Red = 0,
    //% block="green"
    Green = 1,
    //% block="blue"
    Blue = 2,
    //% block="yellow"
    Yellow = 3,
    //% block="cyan"
    Cyan = 4,
    //% block="magenta"
    Magenta = 5,
    //% block="white"
    White = 6,
    //% block="off"
    Off = 7
}

//% block="a4 AI Vision"
//% weight=100 color=#5b3fe8 icon="\uf06e"
//% groups='["System", "RGB LEDs", "LCD"]'
namespace a4_ai_vision {
    const DFR1216_I2C_ADDRESS = 0x33
    const BATTERY_LEVEL_REGISTER = 0x87
    const RGB_LED_REGISTER = 0x90

    let initialized = false
    let rgb0Red = 0
    let rgb0Green = 0
    let rgb0Blue = 0
    let rgb1Red = 0
    let rgb1Green = 0
    let rgb1Blue = 0
    let rgbBrightness = 255

    function initDfr1216(): void {
        if (!initialized) {
            initialized = true
            basic.pause(100)
        }
    }

    function makeBuffer(values: number[]): Buffer {
        const buffer = pins.createBuffer(values.length)
        for (let i = 0; i < values.length; i++) {
            buffer[i] = Math.clamp(0, 255, values[i])
        }
        return buffer
    }

    function writeRegister(registerAddress: number, data: Buffer): void {
        const buffer = pins.createBuffer(data.length + 1)
        buffer[0] = registerAddress
        for (let i = 0; i < data.length; i++) {
            buffer[i + 1] = data[i]
        }
        pins.i2cWriteBuffer(DFR1216_I2C_ADDRESS, buffer)
    }

    function readRegister(registerAddress: number, length: number): Buffer {
        pins.i2cWriteNumber(DFR1216_I2C_ADDRESS, registerAddress, NumberFormat.UInt8BE)
        return pins.i2cReadBuffer(DFR1216_I2C_ADDRESS, length)
    }

    function colorToRgb(color: A4VisionRgbColor): number[] {
        switch (color) {
            case A4VisionRgbColor.Red: return [255, 0, 0]
            case A4VisionRgbColor.Green: return [0, 255, 0]
            case A4VisionRgbColor.Blue: return [0, 0, 255]
            case A4VisionRgbColor.Yellow: return [255, 255, 0]
            case A4VisionRgbColor.Cyan: return [0, 255, 255]
            case A4VisionRgbColor.Magenta: return [255, 0, 255]
            case A4VisionRgbColor.White: return [255, 255, 255]
            case A4VisionRgbColor.Off:
            default: return [0, 0, 0]
        }
    }

    function writeRgbValues(r0: number, g0: number, b0: number, r1: number, g1: number, b1: number): void {
        initDfr1216()

        rgb0Red = Math.clamp(0, 255, r0)
        rgb0Green = Math.clamp(0, 255, g0)
        rgb0Blue = Math.clamp(0, 255, b0)
        rgb1Red = Math.clamp(0, 255, r1)
        rgb1Green = Math.clamp(0, 255, g1)
        rgb1Blue = Math.clamp(0, 255, b1)

        writeRegister(RGB_LED_REGISTER, makeBuffer([
            1,
            rgbBrightness,
            rgb0Red,
            rgb0Green,
            rgb0Blue,
            rgb1Red,
            rgb1Green,
            rgb1Blue
        ]))
    }

    /**
     * Returns the DFR1216 battery level in percent.
     */
    //% blockId=a4_ai_vision_battery_level
    //% block="battery level (\\%)"
    //% weight=100
    //% group="System"
    export function batteryLevel(): number {
        initDfr1216()
        return readRegister(BATTERY_LEVEL_REGISTER, 1)[0]
    }

    /**
     * Sets the two onboard DFR1216 RGB LEDs at the same time, using predefined colors.
     * @param color0 color applied to RGB0
     * @param color1 color applied to RGB1
     */
    //% blockId=a4_ai_vision_set_dual_rgb_colors
    //% block="set RGB0 to %color0 and RGB1 to %color1"
    //% weight=90
    //% group="RGB LEDs"
    //% inlineInputMode=inline
    export function setDualRgbColors(color0: A4VisionRgbColor, color1: A4VisionRgbColor): void {
        const c0 = colorToRgb(color0)
        const c1 = colorToRgb(color1)
        writeRgbValues(c0[0], c0[1], c0[2], c1[0], c1[1], c1[2])
    }

    /**
     * Sets the two onboard DFR1216 RGB LEDs at the same time, using RGB values from 0 to 255.
     * @param r0 red value for RGB0, from 0 to 255
     * @param g0 green value for RGB0, from 0 to 255
     * @param b0 blue value for RGB0, from 0 to 255
     * @param r1 red value for RGB1, from 0 to 255
     * @param g1 green value for RGB1, from 0 to 255
     * @param b1 blue value for RGB1, from 0 to 255
     */
    //% blockId=a4_ai_vision_set_dual_rgb
    //% block="set RGB0 R %r0 G %g0 B %b0 and RGB1 R %r1 G %g1 B %b1"
    //% r0.min=0 r0.max=255 r0.defl=255
    //% g0.min=0 g0.max=255 g0.defl=255
    //% b0.min=0 b0.max=255 b0.defl=255
    //% r1.min=0 r1.max=255 r1.defl=255
    //% g1.min=0 g1.max=255 g1.defl=255
    //% b1.min=0 b1.max=255 b1.defl=255
    //% weight=80
    //% group="RGB LEDs"
    //% inlineInputMode=external
    export function setDualRgb(r0: number, g0: number, b0: number, r1: number, g1: number, b1: number): void {
        writeRgbValues(r0, g0, b0, r1, g1, b1)
    }

    /**
     * Sets the brightness used by the two onboard DFR1216 RGB LEDs.
     * @param brightness brightness value, from 0 to 255
     */
    //% blockId=a4_ai_vision_set_rgb_brightness
    //% block="set RGB brightness %brightness"
    //% brightness.min=0 brightness.max=255 brightness.defl=255
    //% weight=70
    //% group="RGB LEDs"
    export function setRgbBrightness(brightness: number): void {
        rgbBrightness = Math.clamp(0, 255, brightness)
        writeRgbValues(rgb0Red, rgb0Green, rgb0Blue, rgb1Red, rgb1Green, rgb1Blue)
    }

    /**
     * Turns off the two onboard DFR1216 RGB LEDs.
     */
    //% blockId=a4_ai_vision_clear_rgb
    //% block="turn off RGB LEDs"
    //% weight=60
    //% group="RGB LEDs"
    export function clearRgb(): void {
        writeRgbValues(0, 0, 0, 0, 0, 0)
    }

    /**
     * Initializes the DFRobot LCD display over UART at 9600 baud.
     * Use crossed wiring: display R to the controller TX pin, and display T to the controller RX pin.
     * @param tx controller TX pin connected to the display R pin, eg: SerialPin.P8
     * @param rx controller RX pin connected to the display T pin, eg: SerialPin.P12
     */
    //% blockId=a4_ai_vision_lcd_uart_init
    //% block="initialize LCD UART TX %tx RX %rx"
    //% tx.defl=SerialPin.P8
    //% rx.defl=SerialPin.P12
    //% weight=50
    //% group="LCD"
    export function initLcdUart(tx: SerialPin, rx: SerialPin): void {
        serial.redirect(tx, rx, BaudRate.BaudRate9600)
        basic.pause(1000)
    }
}
