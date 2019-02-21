export enum Location {
    Anywhere = 1,
    Dorms,
    Campus,
    Downtown,
    Uptown,
    ElectricCity,
    Southside,
    GreatTemple,
    Chinatown,
    Nowhere = 0
}

const DisplayLocations = [Location.Dorms, Location.Campus, Location.Downtown, Location.Uptown,
    Location.ElectricCity, Location.Southside, Location.GreatTemple, Location.Chinatown];

export function getDisplayLocations(): Location[] {
    return DisplayLocations;
}

export function getLocationName(location: Location): string {
    switch (location) {
        case Location.ElectricCity:
            return 'Electric City';
        case Location.GreatTemple:
            return 'Great Temple';
        case Location.Anywhere:
        case Location.Dorms:
        case Location.Campus:
        case Location.Downtown:
        case Location.Uptown:
        case Location.Southside:
        case Location.Chinatown:
        case Location.Nowhere:
            return Location[location];
    }
}
