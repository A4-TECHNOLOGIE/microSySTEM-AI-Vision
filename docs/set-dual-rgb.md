# set the two RGB LEDs with numeric values

Sets RGB0 and RGB1 simultaneously with red, green and blue values from 0 to 255.

```sig
a4MicroSystemAiVision.setDualRgb(255, 0, 0, 0, 255, 0)
```

## Parameters

- **r0**, **g0**, **b0**: red, green and blue values for RGB0.
- **r1**, **g1**, **b1**: red, green and blue values for RGB1.

Values below 0 or above 255 are automatically limited to the supported range.

## Example

This example displays red on RGB0 and blue on RGB1.

```blocks
a4MicroSystemAiVision.setDualRgb(255, 0, 0, 0, 0, 255)
```

## See also

- [set the two RGB LED colors](./set-dual-rgb-colors)
- [set RGB brightness](./set-rgb-brightness)

```package
a4-microsystem-ai-vision=github:A4-TECHNOLOGIE/microSySTEM-AI-Vision
```
