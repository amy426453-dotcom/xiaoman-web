from collections import deque
from pathlib import Path
from PIL import Image

source = Path('/var/folders/my/h3j7mbjn2_9cw6t42hbx0xkw0000gn/T/codex-clipboard-e67a2cd9-c7dc-434f-8fac-63d1350a37f6.png')
target = Path('/Users/carmen/Documents/新/assets/generated/纸箱_封闭_透明背景.png')
target.parent.mkdir(parents=True, exist_ok=True)

image = Image.open(source).convert('RGBA')
width, height = image.size
pixels = image.load()

def looks_like_checkerboard(rgb):
    r, g, b = rgb
    # The attached checkerboard is near-neutral white/gray. Keep warm cardboard
    # and illustrated edges intact by requiring both low chroma and high value.
    return max(r, g, b) - min(r, g, b) <= 7 and min(r, g, b) >= 235

visited = bytearray(width * height)
background = bytearray(width * height)
queue = deque()

for x in range(width):
    queue.append((x, 0))
    queue.append((x, height - 1))
for y in range(height):
    queue.append((0, y))
    queue.append((width - 1, y))

while queue:
    x, y = queue.popleft()
    index = y * width + x
    if visited[index]:
        continue
    visited[index] = 1
    if not looks_like_checkerboard(pixels[x, y][:3]):
        continue
    background[index] = 1
    for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
        if 0 <= nx < width and 0 <= ny < height:
            neighbor = ny * width + nx
            if not visited[neighbor]:
                queue.append((nx, ny))

for y in range(height):
    for x in range(width):
        index = y * width + x
        if background[index]:
            pixels[x, y] = (0, 0, 0, 0)

image.save(target, 'PNG')
print(target)
print(f'size={width}x{height}')
