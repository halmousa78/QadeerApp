export interface ScriptUserDefinition {
    Username?: string;
    DisplayName?: string;
    IsAdmin?: boolean;
    HasCompletedCv?: boolean;
    Permissions?: { [key: string]: boolean };
}
