import { ecs } from "../../ecs"
import { glow } from "../../ecs/components/glow"
import { twinkle } from "../../ecs/components/twinkle"
import { entity } from "../../entity"
import { math } from "../../math/random"
import { Rect, rect } from "../../physics/rect"
import { vec2, Vector2 } from "../../physics/vector"
import { sprites } from "../../sprites"
import { stats } from "../../stats"
import { color, Color } from "../../visual/color"

// Small chance to generate a star with a non-white color
function randomColor(): Color {
    const res = math.rnd(0, 100)

    if (res < 30) {
        return color.random()
    }

    return color.white()
}

function randomScale() {
    let smoothf = math.rndf(0.006, 0.04)
    const sf = math.rnd(0, 100) * smoothf

    const scaleVector = vec2.make(sf, sf)

    return scaleVector
}

export function makeStar(within: Rect, speed?: Vector2, color?: Color, scale?: Vector2, renderLayer = 1) {

    speed = speed ?? vec2.zero()
    color = color ?? randomColor()
    scale = scale ?? randomScale()

    let e = entity.makeDrawable({
        scale: scale,
        translation: rect.randomPointWithin(within),
        color,
        speed,
        sprite: sprites.star.random(),
        distance: 1,
        renderLayer
    })

    const twinkleSpeedDownScale = Math.random() * Math.random()
    const twinkleSpeed = math.rnd(1, 5) * twinkleSpeedDownScale
    ecs.get().twinkle.set(e, twinkle.make(twinkleSpeed));

    stats.incrementStarCount()

    const rglow = math.rnd(0, 1000)

    if (rglow < 3) {
        const intensity = math.rnd(1, 100) * 0.02
        ecs.get().glow.set(e, glow.make(intensity, color))
    }


    return e
}

/**
 * Distribute stars along a given line.
* TODO: Finish this.
 */
export function distributeStarsAlong(points: Vector2[], translation: Vector2, spread: number = 10, maxPerPoint: number = 8) {
    for (let i = 0; i < points.length; i++) {

        let pt = vec2.add(points[i], translation)

        pt.x += spread * i

        // make rect
        let r = rect.centredOn(pt, 10, 10)

        let numToCreate = math.rnd(1, maxPerPoint);

        // generate star on line first
        makeStars(r, numToCreate)
    }
}

export function makeStars(within: Rect, count: number) {
    for (let i = 0; i < count; i++) {
        makeStar(within)
    }
}

export function makeCluster(bounds: Rect) {
    const numStars = math.rnd(10, 40)

    makeStars(bounds, numStars)
}

export function makeNClustersWithin(area: Rect, n: number) {

    const remainder = n % 5;

    let numCreated = 0;

    for (let i = 0; i < n; i += 5) {
        const c1 = rect.randomRectInside(area)
        const c2 = rect.randomRectInside(area)
        const c3 = rect.randomRectInside(area)
        const c4 = rect.randomRectInside(area)
        const c5 = rect.randomRectInside(area)

        makeCluster(c1)
        makeCluster(c2)
        makeCluster(c3)
        makeCluster(c4)
        makeCluster(c5)

        numCreated += 5;
    }

    for (let i = 0; i < remainder; i++) {

        const c1 = rect.randomRectInside(area)
        makeCluster(c1)
        numCreated++;
    }
}


