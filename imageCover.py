from PIL import Image

# Open the image file
img = Image.open('Playing Cards/red_joker.png')

# Get the size of the image
width, height = img.size

# Loop through each pixel in the image
for x in range(width):
    for y in range(height):
        # Get the pixel value (R, G, B, A)
        pixel = img.getpixel((x, y))

        # Check if the pixel is white
        if pixel == (255, 255, 255, 255):
            # Set the pixel color to black
            img.putpixel((x, y), (0, 0, 0, 255))

# Save the modified image
img.save("Playing Cards/cover.png")
