export enum SkillCardType {
    Ally = 1,
    Main
}

export function getSkillCardTypeName(skillCardType: SkillCardType): string {
    switch (skillCardType) {
        case SkillCardType.Ally:
        case SkillCardType.Main:
        default:
            return SkillCardType[skillCardType];
    }
}
