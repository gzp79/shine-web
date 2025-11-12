<script lang="ts">
    import Box from '@atoms/Box.svelte';
    import Stack from '@atoms/Stack.svelte';
    import Typography from '@atoms/Typography.svelte';
    import KeyValueTable from '@atoms/data/PropertyList.svelte';
    import Alert from '@components/Alert.svelte';
    import { CheckBox, Story, settingsStore } from '../../_components';

    let shadow = $state(true);

    settingsStore().set(settings);
</script>

{#snippet settings()}
    <CheckBox label="Shadow" bind:value={shadow} />
{/snippet}

<Story variant="center">
    <Alert variant="info" {shadow} caption="This is an info alert" />
    <Alert variant="warning" {shadow} caption="This is a warning alert" />
    <Alert variant="success" {shadow} caption="This is a success alert" />
    <Alert variant="error" {shadow} caption="This is an error alert" />
    <Alert variant="warning" {shadow} caption="Something is not ok">This is the detail of the warning</Alert>
    <Alert variant="error" {shadow} caption="Something is not ok">
        <Stack spacing={2}>
            <Typography variant="text">This is the complex detail of the warning</Typography>
            <Box border>
                <KeyValueTable
                    size="xs"
                    items={[
                        { key: 'problem1', value: 'This is a text' },
                        { key: 'problem2', value: 'Just ignore me' }
                    ]}
                />
            </Box>
        </Stack>
    </Alert>
</Story>
