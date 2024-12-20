import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export default class DarkModeService {
    private darkModeOn = false;

    public watchMediaQueryChange(): void {
        // Use matchMedia to check the user preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        // Initialize the dark palette based on the initial
        // value of the prefers-color-scheme media query
        this.initializeDarkMode(prefersDark.matches);

        // Listen for changes to the prefers-color-scheme media query
        prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkMode(mediaQuery.matches));
    }

    // Check/uncheck the toggle and update the palette based on isDark
    public initializeDarkMode(isDark: boolean): void {
        this.toggleDarkMode(isDark);
    }

    // Add or remove the "ion-palette-dark" class on the html element
    public toggleDarkMode(darkModeOn: boolean): void {
        this.darkModeOn = darkModeOn;

        document.documentElement.classList.toggle('ion-palette-dark', this.darkModeOn);
    }

    public isDarkModeOn(): boolean {
        return this.darkModeOn;
    }
}
