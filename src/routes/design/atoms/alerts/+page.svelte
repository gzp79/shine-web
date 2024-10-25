<script lang="ts">
    import Alert from '$atoms/Alert.svelte';
    import Box from '$atoms/Box.svelte';
    import KeyValueTable from '$atoms/KeyValueTable.svelte';
    import Typography from '$atoms/Typography.svelte';
    import { settingsStore, CheckBox, Story } from '../../_components';

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
