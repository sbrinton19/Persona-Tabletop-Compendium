export enum Element {
    Physical = 0,
    Gun,
    Fire,
    Ice,
    Elec,
    Wind,
    Psy,
    Nuke,
    Bless,
    Curse,
    Almighty,
    Healing,
    Support,
    Ailment,
    Passive,
    Magic,
    AllDamage
}

export function getElementName(element: Element): string {
    switch (element) {
        case Element.Elec:
            return 'Electric';
        case Element.Nuke:
            return 'Nuclear';
        case Element.Psy:
            return 'Psychic';
        case Element.AllDamage:
            return 'any damage';
        case Element.Ailment:
        case Element.Almighty:
        case Element.Bless:
        case Element.Curse:
        case Element.Fire:
        case Element.Gun:
        case Element.Healing:
        case Element.Ice:
        case Element.Magic:
        case Element.Passive:
        case Element.Physical:
        case Element.Support:
        case Element.Wind:
        default:
            return Element[element];
    }
}
