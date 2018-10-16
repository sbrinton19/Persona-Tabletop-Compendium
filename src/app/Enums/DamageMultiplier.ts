export enum DamageMultiplier {
    None = 0,
    Light = 0.5,
    Medium = 1,
    Heavy = 2,
    Severe = 3,
    Collosal = 4
}

export function getDamageMultiplierName(damageMultiplier: DamageMultiplier): string {
    switch (damageMultiplier) {
        case DamageMultiplier.None:
        case DamageMultiplier.Light:
        case DamageMultiplier.Medium:
        case DamageMultiplier.Heavy:
        case DamageMultiplier.Severe:
        case DamageMultiplier.Collosal:
        default:
            return DamageMultiplier[damageMultiplier];
    }
}
