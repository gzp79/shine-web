<script lang="ts">
    interface Props {
        data: {
            providers: string[];
        };
    }

    let { data }: Props = $props();
    console.log(data);
</script>

<h1>aa {data.providers} bb</h1>
