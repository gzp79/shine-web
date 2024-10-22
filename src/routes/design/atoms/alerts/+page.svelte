<script lang="ts">
    import Alert from '$components/atoms/Alert.svelte';
    import KeyValueTable from '$components/atoms/KeyValueTable.svelte';
    import Box from '$atoms/Box.svelte';
    import Typography from '$src/components/atoms/Typography.svelte';
    import CheckBox from '../../_components/CheckBox.svelte';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Story from '../../_components/Story.svelte';

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
        <Typography variant="text">This is the complex detail of the warning</Typography>
        <Box border>
            <KeyValueTable
                size="xs"
                items={[
                    ['problem1', 'This is a text'],
                    ['problem2', 'Just ignore me']
                ]}
            />
        </Box>
    </Alert>
</Story>
