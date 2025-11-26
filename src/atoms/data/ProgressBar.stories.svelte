<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import ProgressBar from '@atoms/data/ProgressBar.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';
    import type { ActionColor, Size } from '@atoms/types';

    type ProgressVariant = 'solid' | 'striped' | 'animated';

    const { Story } = defineMeta({
        component: ProgressBar,
        title: 'Atoms/Data/ProgressBar',
        tags: ['autodocs'],
        args: {
            percent: 60,
            label: 'Label',
            color: 'primary' as ActionColor,
            size: 'md' as Size,
            showPercent: true,
            variant: 'solid' as ProgressVariant
        },
        argTypes: {
            percent: {
                control: { type: 'range', min: 0, max: 100, step: 1 },
                description: 'Progress percentage (0-100)',
                table: {
                    type: { summary: 'number' },
                    defaultValue: { summary: '0' }
                }
            },
            label: {
                control: 'text',
                description: 'Optional label text to display',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' }
                }
            },
            color: {
                control: 'select',
                options: ['primary', 'secondary', 'info', 'warning', 'danger', 'success'] satisfies ActionColor[],
                description: 'Color theme',
                table: {
                    type: { summary: 'ActionColor' },
                    defaultValue: { summary: 'primary' }
                }
            },
            size: {
                control: 'select',
                options: ['xs', 'sm', 'md', 'lg'] satisfies Size[],
                description: 'Size variant',
                table: {
                    type: { summary: 'Size' },
                    defaultValue: { summary: 'md' }
                }
            },
            showPercent: {
                control: 'boolean',
                description: 'Show percentage text',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' }
                }
            },
            variant: {
                control: 'select',
                options: ['solid', 'striped', 'animated'] satisfies ProgressVariant[],
                description: 'Progress bar variant (solid, striped static, or animated moving stripes)',
                table: {
                    type: { summary: 'ProgressVariant' },
                    defaultValue: { summary: 'solid' }
                }
            }
        }
    });
</script>

<Story name="Default" />

<Story name="Variants">
    {#snippet template(args)}
        <Stack>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Solid</p>
                <ProgressBar {...args} variant="solid" percent={60} showPercent />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Striped (static)</p>
                <ProgressBar {...args} variant="striped" percent={60} showPercent />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Animated (moving stripes)</p>
                <ProgressBar {...args} variant="animated" percent={60} showPercent />
            </div>
        </Stack>
    {/snippet}
</Story>

<Story name="Sizes">
    {#snippet template(args)}
        <Stack>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Extra Small (xs)</p>
                <ProgressBar {...args} size="xs" percent={75} />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Small (sm)</p>
                <ProgressBar {...args} size="sm" percent={60} />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Medium (md)</p>
                <ProgressBar {...args} size="md" percent={45} />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Large (lg)</p>
                <ProgressBar {...args} size="lg" percent={30} />
            </div>
        </Stack>
    {/snippet}
</Story>

<Story name="Colors">
    {#snippet template(args)}
        <Stack>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Primary</p>
                <ProgressBar {...args} color="primary" percent={85} showPercent />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Secondary</p>
                <ProgressBar {...args} color="secondary" percent={70} showPercent />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Info</p>
                <ProgressBar {...args} color="info" percent={55} showPercent />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Warning</p>
                <ProgressBar {...args} color="warning" percent={40} showPercent />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Danger</p>
                <ProgressBar {...args} color="danger" percent={25} showPercent />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Success</p>
                <ProgressBar {...args} color="success" percent={100} showPercent />
            </div>
        </Stack>
    {/snippet}
</Story>

<Story name="ProgressStates">
    {#snippet template(args)}
        <Stack>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Not Started</p>
                <ProgressBar {...args} percent={0} label="Initializing" color="info" />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">In Progress</p>
                <ProgressBar {...args} percent={35} label="Processing" showPercent color="primary" variant="animated" />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Almost Done</p>
                <ProgressBar {...args} percent={90} label="Finishing up" showPercent color="warning" />
            </div>
            <div>
                <p class="mb-2 text-sm text-on-surface/70">Complete</p>
                <ProgressBar {...args} percent={100} label="Done" color="success" />
            </div>
        </Stack>
    {/snippet}
</Story>
