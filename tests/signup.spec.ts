import { test, expect } from "@playwright/test";
import { JefitSignupPage } from "../POMs/SignupPage";

let signupPage: JefitSignupPage;

test.beforeEach(async ({ page }) => {
    signupPage = new JefitSignupPage(page);
    await page.goto('https://www.jefit.com/signup');
});

test('Successful signup - initial steps', async () => {
    await signupPage.selectGender('Male');
    await signupPage.selectTrainingGoal('Strength');
    await signupPage.selectCurrentBuild('Average');
    await signupPage.selectGoalBodyType('Berserk');
    await signupPage.selectTargetZones(['Arm', 'Pecs', 'Abs']);
    await signupPage.selectFitnessLevel('Advanced');
    await signupPage.fillHeight('6', '2');
});

test('Validation error for height below minimum', async () => {
    await signupPage.selectGender('Male');
    await signupPage.selectTrainingGoal('Strength');
    await signupPage.selectCurrentBuild('Average');
    await signupPage.selectGoalBodyType('Berserk');
    await signupPage.selectTargetZones(['Arm']);
    await signupPage.selectFitnessLevel('Advanced');

    await signupPage.heightFeetInput.fill('2');
    await signupPage.heightInchesInput.fill('0');
    await signupPage.continueButton.click();

    const message = await signupPage.getHeightFeetValidationMessage();

    expect(message).toContain('Value must be greater than or equal to 3');

    await expect(signupPage.heightTitle).toBeVisible();
});

test('Validation error for invalid weight 0', async () => {
    await signupPage.selectGender('Male');
    await signupPage.selectTrainingGoal('Strength');
    await signupPage.selectCurrentBuild('Average');
    await signupPage.selectGoalBodyType('Berserk');
    await signupPage.selectTargetZones(['Arm']);
    await signupPage.selectFitnessLevel('Advanced');
    await signupPage.fillHeight('6', '0');

    await signupPage.weightInput.fill('0');
    await signupPage.continueButton.click();

    const message = await signupPage.getWeightValidationMessage();
    expect(message).toContain('Value must be greater than or equal to 55');
    await expect(signupPage.weightTitle).toBeVisible();
});