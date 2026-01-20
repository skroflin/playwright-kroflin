import { Locator, Page, expect } from "@playwright/test";

export class JefitSignupPage {
    readonly page: Page;
    readonly maleOption: Locator;
    readonly femaleOption: Locator;
    readonly continueButton: Locator;
    readonly trainingGoalTitle: Locator;
    readonly bulkingGoal: Locator;
    readonly strengthGoal: Locator;
    readonly cuttingGoal: Locator;
    readonly maintainingGoal: Locator;
    readonly currentBuildTitle: Locator;
    readonly skinnyBuild: Locator;
    readonly averageBuild: Locator;
    readonly overweightBuild: Locator;
    readonly goalBodyTitle: Locator;
    readonly shreddedGoal: Locator;
    readonly bulkGoal: Locator;
    readonly berserkGoal: Locator;
    readonly targetZonesTitle: Locator;
    readonly fitnessLevelTitle: Locator;
    readonly newToFitness: Locator;
    readonly beginnerLevel: Locator;
    readonly intermediateLevel: Locator;
    readonly advancedLevel: Locator;
    readonly heightTitle: Locator;
    readonly heightFeetInput: Locator;
    readonly heightInchesInput: Locator;
    readonly weightTitle: Locator;
    readonly weightInput: Locator;

    constructor(page: Page) {
        this.page = page;

        this.maleOption = page.locator('div, span, [role="radio"]').filter({ hasText: /^male$/i }).last();
        this.femaleOption = page.locator('div, span, [role="radio"]').filter({ hasText: /^female$/i }).last();

        this.trainingGoalTitle = page.getByText("What's your main goal for training?");
        this.bulkingGoal = page.locator('div, span, [role="radio"]').filter({ hasText: /^bulking$/i }).last();
        this.strengthGoal = page.locator('div, span, [role="radio"]').filter({ hasText: /^strength$/i }).last();
        this.cuttingGoal = page.locator('div, span, [role="radio"]').filter({ hasText: /^cutting$/i }).last();
        this.maintainingGoal = page.locator('div, span, [role="radio"]').filter({ hasText: /^maintaining$/i }).last();

        this.currentBuildTitle = page.getByText("Which describes your current build best?");
        this.skinnyBuild = page.locator('div, span, [role="radio"]').filter({ hasText: /^skinny$/i }).last();
        this.averageBuild = page.locator('div, span, [role="radio"]').filter({ hasText: /^average$/i }).last();
        this.overweightBuild = page.locator('div, span, [role="radio"]').filter({ hasText: /^overweight$/i }).last();

        this.goalBodyTitle = page.getByText("What is your goal body type?");
        this.shreddedGoal = page.locator('div, span, [role="radio"]').filter({ hasText: /^shredded$/i }).last();
        this.bulkGoal = page.locator('div, span, [role="radio"]').filter({ hasText: /^bulk$/i }).last();
        this.berserkGoal = page.locator('div, span, [role="radio"]').filter({ hasText: /^berserk$/i }).last();

        this.targetZonesTitle = page.getByText("What are your target zones?");

        this.fitnessLevelTitle = page.getByText("What is your fitness level?");
        this.newToFitness = page.locator('div, span, [role="radio"]').filter({ hasText: /^new to fitness$/i }).last();
        this.beginnerLevel = page.locator('div, span, [role="radio"]').filter({ hasText: /^beginner$/i }).last();
        this.intermediateLevel = page.locator('div, span, [role="radio"]').filter({ hasText: /^intermediate$/i }).last();
        this.advancedLevel = page.locator('div, span, [role="radio"]').filter({ hasText: /^advanced$/i }).last();

        this.heightTitle = page.getByText("What is your height?");
        this.heightFeetInput = page.locator('#heightFeet');
        this.heightInchesInput = page.locator('#heightInches');

        this.weightTitle = page.getByText("What is your current weight?");
        this.weightInput = page.locator('#weight');

        this.continueButton = page.getByRole('button', { name: /continue/i });
    }

    async selectGender(gender: 'Male' | 'Female') {
        const option = gender === 'Male' ? this.maleOption : this.femaleOption;
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async selectTrainingGoal(goal: 'Bulking' | 'Strength' | 'Cutting' | 'Maintaining') {
        await expect(this.trainingGoalTitle).toBeVisible({ timeout: 10000 });
        const goalMap = { 'Bulking': this.bulkingGoal, 'Strength': this.strengthGoal, 'Cutting': this.cuttingGoal, 'Maintaining': this.maintainingGoal };
        const option = goalMap[goal];
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async selectCurrentBuild(build: 'Skinny' | 'Average' | 'Overweight') {
        await expect(this.currentBuildTitle).toBeVisible({ timeout: 10000 });
        const buildMap = { 'Skinny': this.skinnyBuild, 'Average': this.averageBuild, 'Overweight': this.overweightBuild };
        const option = buildMap[build];
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async selectGoalBodyType(type: 'Shredded' | 'Bulk' | 'Berserk') {
        await expect(this.goalBodyTitle).toBeVisible({ timeout: 10000 });
        const typeMap = { 'Shredded': this.shreddedGoal, 'Bulk': this.bulkGoal, 'Berserk': this.berserkGoal };
        const option = typeMap[type];
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async selectTargetZones(zones: ('Arm' | 'Back' | 'Pecs' | 'Abs' | 'Legs')[]) {
        await expect(this.targetZonesTitle).toBeVisible({ timeout: 10000 });
        for (const zone of zones) {
            await this.page.locator('div, span').filter({ hasText: new RegExp(`^${zone}$`, 'i') }).last().click();
        }
        await this.continueButton.click();
    }

    async selectFitnessLevel(level: 'New to fitness' | 'Beginner' | 'Intermediate' | 'Advanced') {
        await expect(this.fitnessLevelTitle).toBeVisible({ timeout: 10000 });
        const levelMap = { 'New to fitness': this.newToFitness, 'Beginner': this.beginnerLevel, 'Intermediate': this.intermediateLevel, 'Advanced': this.advancedLevel };
        const option = levelMap[level];
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async fillHeight(ft: string, inch: string) {
        await expect(this.heightTitle).toBeVisible({ timeout: 10000 });
        await this.heightFeetInput.fill(ft);
        await this.heightInchesInput.fill(inch);
        await this.continueButton.click();
    }

    async getHeightFeetValidationMessage() {
        return await this.heightFeetInput.evaluate((node: HTMLInputElement) => node.validationMessage);
    }

    async fillWeight(lbs: string) {
        await expect(this.weightTitle).toBeVisible({ timeout: 10000 });
        await this.weightInput.fill(lbs);
        await this.continueButton.click();
    }

    async getWeightValidationMessage() {
        return await this.weightInput.evaluate((node: HTMLInputElement) => node.validationMessage);
    }
}

export default JefitSignupPage;