<script lang="ts">
    // This component renders nothing, but it is useful for enforcing Tailwind CSS classes to be generated.

    interface Props {
        classList?: string;
    }

    const { classList }: Props = $props();

    // mark classList as used
    void classList;
</script>
