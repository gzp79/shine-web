<script lang="ts">
    interface Props {
        data: {
            providers: string[];
        };
    }

    let { data }: Props = $props();
</script>

<h1>aa {data.providers} bb</h1>
