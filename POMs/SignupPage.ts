import { Locator, Page } from "@playwright/test";

export class JefitSignupPage {
    readonly page: Page
    signupLink: Locator
    genderChoice: Locator
    trainingGoal: Locator
    buildDescription: Locator
    bodyGoalType: Locator
    targetZone: Locator
    fitnessLevelChoice: Locator
    feetField: Locator
    inchField: Locator
    currentWeightField: Locator
    goalWeightField: Locator
    ageField: Locator
    workoutPlace: Locator
    gymFamiliarity: Locator
    trainingAmount: Locator
    trainingLength: Locator
    trainingMode: Locator
    trainingLimitations: Locator
    continueButton: Locator
    emailField: Locator
    skipButton: Locator
    continueButton: Locator
    usernameField: Locator
    passwordField: Locator
    signupButton: Locator
    disclaimerButton: Locator

    constructor(page: Page) {
        this.page = page
        this.signupLink = page.getByRole('link', {name: 'Sign up'})
        this.genderChoice = page.getByRole('img', {name: 'Male'})
        this.trainingGoal = page.getByRole('img', {name: 'Strength'})
        this.buildDescription = page.getByRole('img', {name: 'Average'})
        this.bodyGoalType = page.getByRole('img', {name: 'Berserk'})
    }
}