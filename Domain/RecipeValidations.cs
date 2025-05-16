namespace Domain;

public static class RecipeValidations
{
    public const int NAME_MIN_LENGTH = 3;

    // bard failed to give me a recipe name above 120 characters: it gave me "Authentisches bayerisches Schweinebraten mit köstlicher Dunkelbiersoße, aromatischem Kartoffelpüree und knackigem Rotkohl"
    // but if you remove the authentic and the aromatic words, it ends up beloew 120 :) And there are more unessarcy, undescrptive words once could remove
    public const int NAME_MAX_LENGTH = 120;
}
