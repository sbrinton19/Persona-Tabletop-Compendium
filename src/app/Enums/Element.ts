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

const DisplayElements = [Element.Physical, Element.Gun, Element.Fire, Element.Ice, Element.Elec, Element.Wind,
    Element.Psy, Element.Nuke, Element.Bless, Element.Curse, Element.Almighty, Element.Healing, Element.Support,
    Element.Ailment, Element.Passive];

export function getDisplayElements(): Element[] {
    return DisplayElements;
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
