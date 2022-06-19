import { toPattern } from "vanilla-masker";

export const toCPF = (value) => toPattern(value, '999.999.999-99');

export const toCNPJ = (value) => toPattern(value, '99.999.999/9999-99');
