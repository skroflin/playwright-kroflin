import { Locator, Page } from "@playwright/test";

export class JefitSignupPage {
    readonly page: Page
    genderChoice: Locator
    trainingGoal: Locator
    buildDescription: Locator
    bodyGoalType: Locator
    fitnessLevelChoice: Locator
    feetField: Locator
    inchField: Locator
    continueButton: Locator
    currentWeightField: Locator
    goalWeightField: Locator
    ageField: Locator
    workoutPlace: Locator
    gymFamiliarity: Locator
    trainingAmount: Locator
    trainingLength: Locator
    trainingMode: Locator
    trainingLimitations: Locator
    emailField: Locator
    skipButton: Locator
    usernameField: Locator
    passwordField: Locator
    privacyBox: Locator
    signupButton: Locator

    constructor(page: Page) {
        this.page = page
        // this.signupLink = page.getByRole('link', { name: 'Sign up', exact: true })
        this.genderChoice = page.getByRole('img', { name: 'Male' })
        this.trainingGoal = page.getByRole('img', { name: 'Strength' })
        this.buildDescription = page.getByRole('img', { name: 'Average' })
        this.bodyGoalType = page.getByRole('img', { name: 'Berserk' })
        this.fitnessLevelChoice = page.getByText('Advanced')
        this.feetField = page.getByText('ft')
        this.inchField = page.getByText('in')
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.currentWeightField = page.getByText('LBS')
        this.goalWeightField = page.getByText('LBS')
        this.ageField = page.getByText('years')
        this.workoutPlace = page.getByText('Gym')
        this.gymFamiliarity = page.getByText('Advanced')
        this.trainingAmount = page.getByText('5+ times per week')
        this.trainingLength = page.getByText('1 hour')
        this.trainingMode = page.getByRole('img', { name: 'Autoplay mode' })
        this.trainingLimitations = page.getByText(`No I don't have any`)
        this.emailField = page.getByText('Enter your email to get started')
        this.skipButton = page.getByText(`I don't want my personalized plan`)
        this.usernameField = page.getByPlaceholder('Username')
        this.passwordField = page.getByLabel('Password')
        this.privacyBox = page.getByRole('checkbox')
        this.signupButton = page.getByRole('button', { name: 'Sign Up' })
    }


    async signUpWithValidInformation(
        targetZone: 'Arms' | 'Pecs' | 'Legs' | 'Back' | 'Abs',
        heightValue: string,
        weightValue: string
    ) {
        await this.genderChoice.click()
        await this.trainingGoal.click()
        await this.buildDescription.click()
        await this.bodyGoalType.click()
        const targetZoneLink = this.page.getByText(targetZone)
        await targetZoneLink.click()
        await this.fitnessLevelChoice.click()
        await this.feetField.fill(heightValue)
        await this.inchField.fill(heightValue)
        await this.currentWeightField.fill(weightValue)
    }
}