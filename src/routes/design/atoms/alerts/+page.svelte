<script lang="ts">
    import Alert from '$components/atoms/Alert.svelte';
    import KeyValueTable from '$components/atoms/KeyValueTable.svelte';
    import CheckBox from '../../_components/CheckBox.svelte';
    import { settingsStore } from '../../_components/currentSettings.svelte';
    import Story from '../../_components/Story.svelte';

    let ghost = $state(false);
    settingsStore().set(settings);
</script>

{#snippet settings()}
    <CheckBox label="Ghost" bind:value={ghost} />
{/snippet}

<Story variant="center">
    <Alert variant="info" {ghost} text="This is an info alert" />
    <Alert variant="warning" {ghost} text="This is a warning alert" />
    <Alert variant="success" {ghost} text="This is a success alert" />
    <Alert variant="error" {ghost} text="This is an error alert" />
    <Alert variant="warning" {ghost} text="Something is not ok">This is the detail of the warning</Alert>
    <Alert variant="warning" {ghost} text="Something is not ok">
        <span>This is the complex detail of the warning</span>
        <KeyValueTable
            size="xs"
            items={[
                ['problem1', 'This is a text'],
                ['problem2', 'Just ignore me']
            ]}
        />
    </Alert>
</Story>
