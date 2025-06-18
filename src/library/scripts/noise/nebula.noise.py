import opensimplex as simplex
import numpy as np
import random

from PIL import Image

num_imgs = 30


def multiply_col(col, n):
    return [x * n for x in col]


def random_col(seed):
    random.seed(seed)
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    a = 255
    return [r, g, b, a]


for i in range(num_imgs):
    simplex.seed(i)

    width = 256
    height = 256

    # rgba
    channels = 4

    img_data = np.zeros((height, width, channels), dtype=np.uint8)

    smoothing = random.random() * 0.01

    col = [0, 0, 0, 255]

    for y in range(height):
        for x in range(width):
            n = simplex.noise2(x * smoothing, y * smoothing)
            # noise generates between -1 and 1,
            # but we want positive numbers, so we normalise
            n = (n + 1) / 2
            img_data[y, x] = multiply_col(col, n)

    img = Image.fromarray(img_data, 'RGBA')
    img.save(f'nebulas/map_{i}.png')
