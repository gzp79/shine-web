<script lang="ts">
    import { Dark, DarkAndLight, Light } from '@atoms/icons/common';
    import Button from '@atoms/inputs/Button.svelte';
    import ImageButton from '@atoms/inputs/ImageButton.svelte';
    import InputGroup from '@atoms/inputs/InputGroup.svelte';
    import Popper from '@atoms/layouts/Popper.svelte';
    import { themeStore } from './theme.svelte';

    let theme = themeStore();

    const id = $props.id();

    let icon = $derived.by(() => {
        switch (theme.current) {
            case 'dark':
                return Dark;
            case 'light':
                return Light;
            default:
                return DarkAndLight;
        }
    });
</script>

<!-- <ImageButton
    size="xs"
    variant="ghost"
    src={icon}
    onclick={() => {
        switch (theme.current) {
            case 'dark':
                theme.current = 'light';
                break;
            case 'light':
                theme.current = 'system';
                break;
            default:
                theme.current = 'dark';
                break;
        }
    }}
/> -->

<ImageButton size="xs" variant="ghost" id={`theme-trigger-${id}`} src={icon} />
<Popper
    behavior="click"
    placement="left-end"
    display="flex flex-col rounded-lg border max-h-96 overflow-y-auto"
    trigger={`#theme-trigger-${id}`}
>
    <InputGroup vertical size="sm">
        <Button wide endIcon={Light} onclick={() => (theme.current = 'light')}>Light</Button>
        <Button wide endIcon={Dark} onclick={() => (theme.current = 'dark')}>Dark</Button>
        <Button wide endIcon={DarkAndLight} onclick={() => (theme.current = 'system')}>Auto</Button>
    </InputGroup>
</Popper>
