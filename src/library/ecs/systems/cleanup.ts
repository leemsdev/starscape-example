import { ecs, Entity } from "..";

export function run(e: Entity) {
    const cleanup = ecs.get().cleanup.get(e)

    if (!cleanup) return;

    ecs.get().active.set(e, false)
    ecs.get().cleanup.delete(e)
}
