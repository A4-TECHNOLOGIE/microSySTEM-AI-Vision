// Compilation coverage for the complete public API and its dependencies.
//
// These functions are intentionally not called. This allows test.ts to compile
// every block while the MakeCode simulator runs without physical I2C or UART
// hardware. Hardware procedures and pass/fail criteria are in TESTING.md.

function compileAiVisionApi(): void {
    a4MicroSystemAiVision.setDualRgbColors(A4VisionRgbColor.Red, A4VisionRgbColor.Green)
    a4MicroSystemAiVision.setDualRgb(255, 0, 0, 0, 255, 0)
    a4MicroSystemAiVision.setRgbBrightness(64)
    a4MicroSystemAiVision.clearRgb()

    const battery = a4MicroSystemAiVision.batteryLevel()
    serial.writeValue("battery", battery)

    a4MicroSystemAiVision.initLcdUart(SerialPin.P1, SerialPin.P0)
}

function compileLcdDeletionRegression(): void {
    lcdDisplay.lcdClearAll()
    lcdDisplay.lcdSetBgcolor(0xffffff)
    lcdDisplay.lcdDisplayText("Fruit", 3, 75, 125, lcdDisplay.FontSize.Large, 0x00aa00)
    lcdDisplay.lcdDisplayText("ID : 1", 4, 120, 180, lcdDisplay.FontSize.Small, 0x000000)
    lcdDisplay.lcdDeleteWidget(lcdDisplay.getLCDWidgetCategoryTwo(LCDWidgetCategoryTwo.Text), 3)
    lcdDisplay.lcdDeleteWidget(lcdDisplay.getLCDWidgetCategoryTwo(LCDWidgetCategoryTwo.Text), 4)
}

function compileHuskyLensDependency(): void {
    huskylens2.I2CInit()
    huskylens2.switchAlgorithm(huskylens2.Algorithm.AlgorithmSelfLearningClassification)
    huskylens2.getResultSelfLearningClassification()

    if (huskylens2.availableSelfLearningClassification()) {
        const id = huskylens2.cachedSelfLearningClassificationResult(
            huskylens2.SelfLearningClassificationProperty.Id
        )
        serial.writeValue("classification_id", id)
    }
}

function compileLegacyAliases(): void {
    a4_ai_vision.setDualRgbColors(A4VisionRgbColor.Blue, A4VisionRgbColor.Off)
    a4_ai_vision.setDualRgb(0, 0, 255, 0, 0, 0)
    a4_ai_vision.setRgbBrightness(32)
    a4_ai_vision.clearRgb()
    a4_ai_vision.initLcdUart(SerialPin.P1, SerialPin.P0)
    serial.writeValue("legacy_battery", a4_ai_vision.batteryLevel())
}
