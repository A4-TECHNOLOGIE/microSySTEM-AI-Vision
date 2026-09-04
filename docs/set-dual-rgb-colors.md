# set the two RGB LED colors

Sets RGB0 and RGB1 simultaneously using predefined colors. Writing both LEDs together preserves the selected state of each LED.

```sig
a4MicroSystemAiVision.setDualRgbColors(A4VisionRgbColor.Red, A4VisionRgbColor.Green)
```

## Parameters

- **color0**: color applied to RGB0.
- **color1**: color applied to RGB1.

## Example

```blocks
a4MicroSystemAiVision.setDualRgbColors(
    A4VisionRgbColor.Green,
    A4VisionRgbColor.Green
)
```

## See also

- [set the two RGB LEDs with numeric values](./set-dual-rgb)
- [turn off the RGB LEDs](./clear-rgb)

```package
a4-microsystem-ai-vision=github:A4-TECHNOLOGIE/microSySTEM-AI-Vision
```
