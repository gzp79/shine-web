import { z } from 'zod';

export const IntegerSchema = z
    .string()
    .superRefine((val, ctx) => {
        if (val === '') {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: JSON.stringify({ token: 'validation.required' }) });
            return;
        }
        if (!/^-?\d+$/.test(val)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: JSON.stringify({ token: 'validation.notInteger' }) });
            return;
        }
    })
    .transform((val) => parseInt(val, 10))
    .refine(Number.isInteger, { message: JSON.stringify({ token: 'validation.notInteger' }) });

export const RangedIntegerSchema = (min: number, max: number) =>
    IntegerSchema.refine((val) => val === undefined || (val >= min && val <= max), {
        message: JSON.stringify({ token: 'validation.outOfRange', min, max })
    });

export const EmailSchema = z.string().email(JSON.stringify({ token: 'validation.invalidEmail' }));
