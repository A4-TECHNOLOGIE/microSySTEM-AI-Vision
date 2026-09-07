// Hardware regression test for lcdDeleteWidget.
// Text objects 3 and 4 must disappear after two seconds, while the rectangle
// object 5 and the title remain visible.

a4MicroSystemAiVision.initLcd()
lcdDisplay.lcdClearAll()
lcdDisplay.lcdSetBgcolor(0xffffff)

lcdDisplay.lcdDisplayText(
    "DELETE TEST",
    1,
    75,
    25,
    lcdDisplay.FontSize.Large,
    0x000000
)
lcdDisplay.lcdDisplayText(
    "FRUIT",
    3,
    100,
    90,
    lcdDisplay.FontSize.Large,
    0x00aa00
)
lcdDisplay.lcdDisplayText(
    "ID : 1",
    4,
    120,
    140,
    lcdDisplay.FontSize.Small,
    0x000000
)
lcdDisplay.lcdDrawRectangle(
    5,
    55,
    70,
    210,
    110,
    3,
    0x00aa00,
    lcdDisplay.DrawType.NotFill,
    0xffffff,
    lcdDisplay.RectangleRound.NoneRound
)

basic.pause(2000)

lcdDisplay.lcdDeleteWidget(
    lcdDisplay.getLCDWidgetCategoryTwo(LCDWidgetCategoryTwo.Text),
    3
)
lcdDisplay.lcdDeleteWidget(
    lcdDisplay.getLCDWidgetCategoryTwo(LCDWidgetCategoryTwo.Text),
    4
)
