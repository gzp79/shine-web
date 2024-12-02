import { z } from 'zod';

export const DateStringSchema = z
    .string()
    .refine((str) => !isNaN(Date.parse(str)), {
        message: 'Invalid date format'
    })
    .transform((str) => new Date(str));

export const OptionalSchema = <T extends z.ZodTypeAny>(schema: T) =>
    schema
        .optional()
        .nullable()
        .transform((value) => (value === null ? undefined : value));
