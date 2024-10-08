<script lang="ts">
    interface Props {
        text?: string;
    }

    const { text }: Props = $props();
</script>

<div class="divider">
    {text}
</div>
