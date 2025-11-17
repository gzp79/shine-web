import { z } from 'zod';
import { i18nValidationMessage, rawValidationMessage } from './validation-messages';

export const IntegerSchema = z
    .string()
    .superRefine((val, ctx) => {
        if (val === '') {
            ctx.addIssue({
                code: 'custom',
                message: i18nValidationMessage('validation.required')
            });
            return;
        }
        if (!/^-?\d+$/.test(val)) {
            ctx.addIssue({
                code: 'custom',
                message: i18nValidationMessage('validation.notInteger')
            });
            return;
        }
    })
    .transform((val) => parseInt(val, 10))
    .refine(Number.isInteger, { message: i18nValidationMessage('validation.notInteger') });

export const RangedIntegerSchema = (min: number, max: number) =>
    IntegerSchema.refine((val) => val === undefined || (val >= min && val <= max), {
        message: i18nValidationMessage('validation.outOfRange', { min, max })
    });

export const EmailSchema = z.email(i18nValidationMessage('validation.invalidEmail'));

export const DateStringSchema = z
    .string()
    .refine((str) => !isNaN(Date.parse(str)), {
        message: rawValidationMessage('Invalid date format')
    })
    .transform((str) => new Date(str));

export const OptionalSchema = <T extends z.ZodType>(schema: T) =>
    schema
        .nullable()
        .transform((value) => (value === null ? undefined : value))
        .optional();
