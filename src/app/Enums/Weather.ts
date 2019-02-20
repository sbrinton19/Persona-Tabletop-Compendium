export enum Weather {
    Clear,
    Sunny,
    Heatwave,
    Cloudy,
    Rainy,
    Thunderstorm,
    Fog,
    Freezing,
    Snow,
    Blizzard
}

export function getWeatherName(weather: Weather): string {
    switch (weather) {
        case Weather.Clear:
        case Weather.Sunny:
        case Weather.Heatwave:
        case Weather.Cloudy:
        case Weather.Rainy:
        case Weather.Thunderstorm:
        case Weather.Fog:
        case Weather.Freezing:
        case Weather.Snow:
        case Weather.Blizzard:
            return Weather[weather];
    }
}
