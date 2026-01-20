import { test, expect } from "@playwright/test";
import JefitSignupPage from "../POMs/SignupPage";

let signupPage: JefitSignupPage;

test.beforeEach(async ({ page }) => {
    signupPage = new JefitSignupPage(page);
    await page.goto('https://www.jefit.com/signup');
});

test('Successful onboarding flow - initial steps', async () => {
    await signupPage.selectGender('Male');
    await signupPage.selectTrainingGoal('Strength');
    await signupPage.selectCurrentBuild('Average');
    await signupPage.selectGoalBodyType('Berserk');
    await signupPage.selectTargetZones(['Arm', 'Pecs', 'Abs']);
});