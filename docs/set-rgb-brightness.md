# set RGB brightness

Sets the brightness used by the two onboard RGB LEDs. The value is limited to the range 0 to 255.

```sig
a4MicroSystemAiVision.setRgbBrightness(128)
```

## Parameters

- **brightness**: 0 turns the LEDs off and 255 selects maximum brightness.

## Example

```blocks
a4MicroSystemAiVision.setDualRgbColors(
    A4VisionRgbColor.Cyan,
    A4VisionRgbColor.Magenta
)
a4MicroSystemAiVision.setRgbBrightness(64)
```

## See also

- [set the two RGB LED colors](./set-dual-rgb-colors)
- [turn off the RGB LEDs](./clear-rgb)

```package
a4-microsystem-ai-vision=github:A4-TECHNOLOGIE/microSySTEM-AI-Vision
```
