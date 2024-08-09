<script lang="ts">
    import Card from '$components/Card.svelte';
    import KeyValueTable from '$components/KeyValueTable.svelte';

    const items: Record<string, string> = {
        Name: 'John Doe',
        Email: 'efoo@example.com',
        Phone: '+1234567890',
        Address: '1234 Main St, City, State, 12345',
        Country: 'USA',
        'Postal Code': '12345',
        'Date of Birth': '01/01/2000'
    };
</script>

<div class="max-w-xl">
    <Card caption="Simple" variant="fieldset">
        <KeyValueTable {items}></KeyValueTable>
    </Card>
    <Card caption="Simple extra small" variant="fieldset">
        <KeyValueTable {items} size="xs"></KeyValueTable>
    </Card>
    <Card caption="Simple large" variant="fieldset">
        <KeyValueTable {items} size="lg"></KeyValueTable>
    </Card>
</div>
