export enum DamageMultiplier {
    None = 0,
    Light = 0.5,
    Medium = 1,
    Heavy = 2,
    Severe = 3,
    Collosal = 4
}

export function getDamageMultiplierString(damageMultiplier: DamageMultiplier): string {
    switch (damageMultiplier) {
        default:
            return DamageMultiplier[damageMultiplier];
    }
}