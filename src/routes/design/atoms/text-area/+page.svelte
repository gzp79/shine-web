<script lang="ts">
    import { z } from 'zod';
    import { logDesigner } from '$lib/loggers';
    import Box from '$atoms/Box.svelte';
    import Stack from '$atoms/Stack.svelte';
    import TextArea from '$atoms/TextArea.svelte';
    import { type ActionColor, type Size, actionColorList, sizeList } from '$atoms/types';
    import { EmailSchema, RangedIntegerSchema } from '$atoms/types/validator';
    import ValidatedTextArea from '$components/ValidatedTextArea.svelte';
    import { CheckBox, Select, Story, settingsStore } from '../../_components';

    let color = $state<ActionColor>('primary');
    let size = $state<Size>('md');
    let disabled = $state(false);

    const onEnter = (text: string) => {
        logDesigner(`Text value: [${text}]`);
    };

    let isValid1 = $state(false);
    let isValid2 = $state(false);
    let isValid3 = $state(false);
    let isValid4 = $state(false);
    const validNumber = (text: string) => {
        try {
            RangedIntegerSchema(0, 10).parse(text);
            return undefined;
        } catch (e) {
            return e as z.ZodError;
        }
    };

    const validNumberWithSuccess = (text: string) => {
        if (!text) {
            return { info: 'Provide a number in [0,10]' };
        }
        try {
            RangedIntegerSchema(0, 10).parse(text);
            return { success: 'All good!' };
        } catch (e) {
            return e as z.ZodError;
        }
    };

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <Select label="Color" options={actionColorList} bind:value={color} />
    <Select label="Size" options={sizeList} bind:value={size} />
    <CheckBox label="Disabled" bind:value={disabled} />
{/snippet}

<Story variant="center">
    <Box border>
        <Stack>
            <TextArea {size} {color} placeholder="Default..." {onEnter} />
            <TextArea rows={[1, 10]} {size} {color} placeholder="Auto grow 1..10 rows" {onEnter} />
            <TextArea rows={4} {size} {color} placeholder="4 rows..." {onEnter} />
            <TextArea rows="single" {size} {color} placeholder="Single line..." {onEnter} />
        </Stack>
    </Box>

    <fieldset class="border p-2 h-max">
        <legend>No parent box</legend>
        <Stack>
            <TextArea placeholder="Default" />
            <TextArea variant="outline" placeholder="Outline" />
            <TextArea variant="ghost" placeholder="Ghost" />
        </Stack>
    </fieldset>
    <Box border legend="Parent box">
        <Stack>
            <TextArea placeholder="Default" />
            <TextArea variant="outline" placeholder="Outline" />
            <TextArea variant="ghost" placeholder="Ghost" />
            <Box border>
                <Stack>
                    <TextArea placeholder="Default" />
                    <TextArea variant="outline" placeholder="Outline" />
                    <TextArea variant="ghost" placeholder="Ghost" />
                    <Box border>
                        <Stack>
                            <TextArea placeholder="Default" />
                            <TextArea variant="outline" placeholder="Outline" />
                            <TextArea variant="ghost" placeholder="Ghost" />
                        </Stack>
                    </Box>
                </Stack>
            </Box>
            <Box border shadow variant={{ color }}>
                <Stack>
                    <TextArea placeholder="Default" />
                    <TextArea variant="outline" placeholder="Outline" />
                    <TextArea variant="ghost" placeholder="Ghost" />
                </Stack>
            </Box>
        </Stack>
    </Box>

    <Box border legend="Validated">
        <Stack>
            <ValidatedTextArea
                rows="single"
                placeholder="Number in [0,10]"
                validate={validNumber}
                bind:valid={isValid1}
            />
            Valid: {isValid1}
            <ValidatedTextArea
                rows="single"
                placeholder="Number in [0,10] - live"
                validate={validNumber}
                bind:valid={isValid2}
            />
            Valid: {isValid2}
            <ValidatedTextArea
                rows="single"
                placeholder="Number in [0,10]"
                validate={validNumberWithSuccess}
                bind:valid={isValid3}
            />
            Valid: {isValid3}
            <ValidatedTextArea
                rows="single"
                placeholder="Email"
                validate={EmailSchema}
                preserveErrorSpace
                bind:valid={isValid4}
            />
            Valid: {isValid4}
        </Stack>
    </Box>
</Story>
