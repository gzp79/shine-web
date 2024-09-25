<script lang="ts">
    import type { AppError } from '$src/lib/utils';

    interface Props {
        error: AppError;
    }

    let { error }: Props = $props();
</script>

<div class="error">
    <h1>Something went wrong</h1>
    <h2>{error.message}</h2>
    <h2>{JSON.stringify(error.detail)}</h2>
    <a href="/">Back</a>
    <a href="/login">Login</a>
    <a href="/game">Game</a>
    <a href="/design">Design</a>
</div>
