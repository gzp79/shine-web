<script lang="ts">
    import Card from '$components/Card.svelte';
    import { lorem } from '$components/lorem';
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
            <button class="btn btn-primary"> Ok</button>
            <button class="btn btn-secondary"> Cancel</button>
            <button class="btn btn-warning"> Maybe</button>
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
                <button class="btn"> Action</button>
            {/snippet}
        </Card>
        {#snippet action()}
            <button class="btn btn-warning">Done</button>
        {/snippet}
    </Card>
</div>
