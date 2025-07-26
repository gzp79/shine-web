import { z } from 'zod';

export const DateStringSchema = z
    .string()
    .refine((str) => !isNaN(Date.parse(str)), {
        message: 'Invalid date format'
    })
    .transform((str) => new Date(str));

export const OptionalSchema = <T extends z.ZodType>(schema: T) =>
    schema
        .nullable()
        .transform((value) => (value === null ? undefined : value))
        .optional();
