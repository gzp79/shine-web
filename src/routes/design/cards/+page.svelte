<script lang="ts">
    import { lorem } from '$components/lorem';
    import Card from '$atoms/Card.svelte';
    import Button from '$atoms/Button.svelte';
</script>

<div class="max-w-xl">
    <Card caption="Simple (top)">
        <h1>This is the content</h1>
        <p>{lorem.slice(0, 50)}</p>
    </Card>

    <Card caption="Simple action (top)">
        <h1>This is the content</h1>
        <p>{lorem.slice(0, 50)}</p>
        {#snippet action()}
            <Button label="Ok" />
            <Button label="Cancel" color="secondary" />
            <Button label="Maybe" color="warning" />
        {/snippet}
    </Card>

    <Card caption="Nested (fieldset)" variant="fieldset">
        <Card caption="Data (data)" variant="data">
            <h1>This is the content</h1>
            <p>{lorem.slice(0, 50)}</p>
        </Card>
        <Card caption="Data action (data)" variant="data">
            <h1>This is the content</h1>
            <p>{lorem.slice(0, 50)}</p>
            {#snippet action()}
                <Button label="Action" />
            {/snippet}
        </Card>
        {#snippet action()}
            <Button label="Done" color="warning" />
        {/snippet}
    </Card>
</div>
