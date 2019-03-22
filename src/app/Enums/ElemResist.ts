export enum ElemResist {
    Weak = 0,
    Neutral,
    Resist,
    Null,
    Repel,
    Absorb
}

const DisplayElemResists = [ElemResist.Weak, ElemResist.Neutral, ElemResist.Resist, ElemResist.Null, ElemResist.Repel, ElemResist.Absorb];

export function getDisplayElemResists(): ElemResist[] {
    return DisplayElemResists;
}

export function getElemShort(elem: ElemResist): string {
    switch (elem) {
        case ElemResist.Weak:
            return 'wk';
        case ElemResist.Neutral:
            return '-';
        case ElemResist.Resist:
            return 'rs';
        case ElemResist.Null:
            return 'nu';
        case ElemResist.Repel:
            return 'rp';
        case ElemResist.Absorb:
            return 'ab';
    }
}

export function getElemFull(elem: ElemResist): string {
    switch (elem) {
        case ElemResist.Neutral:
            return '-';
        case ElemResist.Weak:
        case ElemResist.Resist:
        case ElemResist.Null:
        case ElemResist.Repel:
        case ElemResist.Absorb:
            return ElemResist[elem];
    }
}
