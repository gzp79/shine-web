<script lang="ts">
    import Alert from '$components/atoms/Alert.svelte';
    import KeyValueTable from '$components/atoms/KeyValueTable.svelte';
</script>

<div class="max-w-lg">
    <Alert variant="info" text="This is an info alert" class="m-5" />
    <Alert variant="warning" text="This is a warning alert" class="m-5" />
    <Alert variant="success" text="This is a success alert" class="m-5" />
    <Alert variant="error" text="This is an error alert" class="m-5" />
    <Alert variant="warning" text="Something is not ok" class="m-5">This is the detail of the warning</Alert>
    <Alert variant="warning" text="Something is not ok" class="m-5">
        <span>This is the complex detail of the warning</span>
        <KeyValueTable
            size="xs"
            items={[
                ['problem1', 'This is a text'],
                ['problem2', 'Just ignore me']
            ]}
        />
    </Alert>
</div>
