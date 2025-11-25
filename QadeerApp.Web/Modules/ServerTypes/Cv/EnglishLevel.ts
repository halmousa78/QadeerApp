import { registerEnum } from "@serenity-is/corelib";

export enum EnglishLevel {
    Weak = 1,
    Good = 2,
    VeryGood = 3,
    Excellent = 4
}
registerEnum(EnglishLevel, 'QadeerApp.Cv.EnglishLevel', 'Cv.EnglishLevel');