<script context="module" lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Typography from '@atoms/Typography.svelte';
    import Button from '@atoms/inputs/Button.svelte';
    import TextArea from '@atoms/inputs/TextArea.svelte';
    import Box from '@atoms/layouts/Box.svelte';
    import Stack from '@atoms/layouts/Stack.svelte';

    const { Story } = defineMeta({
        title: 'Atoms/Examples'
    });
</script>

<Story name="Basic Card">
    <Box border shadow legend="User Card">
        <Stack spacing={2}>
            <Typography variant="h5">John Doe</Typography>
            <Typography variant="text">Software Engineer</Typography>
            <Typography variant="footnote">john.doe@example.com</Typography>
        </Stack>
    </Box>
</Story>

<Story name="Horizontal Card">
    <Box border shadow>
        <Stack direction="row" spacing={4} align="center">
            <Box color="primary" class="w-16 h-16 rounded-full"></Box>
            <Stack spacing={1}>
                <Typography variant="h6">Jane Smith</Typography>
                <Typography variant="footnote">Product Manager</Typography>
            </Stack>
        </Stack>
    </Box>
</Story>

<Story name="Card Grid">
    <Stack direction="row" spacing={4} wrap grow>
        {#each ['Alice', 'Bob', 'Carol', 'Dave'] as name}
            <Box border shadow class="min-w-48">
                <Stack spacing={2}>
                    <Box color="primary" class="w-full h-32"></Box>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="footnote">Team Member</Typography>
                </Stack>
            </Box>
        {/each}
    </Stack>
</Story>

<Story name="Dashboard Layout">
    <Stack spacing={4}>
        <Box border shadow legend="Dashboard">
            <Stack spacing={4}>
                <Typography variant="h4">Analytics Dashboard</Typography>

                <Stack direction="row" spacing={4} grow>
                    <Box color="primary" border>
                        <Stack spacing={2}>
                            <Typography variant="footnote">Total Users</Typography>
                            <Typography variant="h3">1,234</Typography>
                            <Typography variant="footnote">+12% from last month</Typography>
                        </Stack>
                    </Box>
                    <Box color="success" border>
                        <Stack spacing={2}>
                            <Typography variant="footnote">Revenue</Typography>
                            <Typography variant="h3">$45.2K</Typography>
                            <Typography variant="footnote">+8% from last month</Typography>
                        </Stack>
                    </Box>
                    <Box color="info" border>
                        <Stack spacing={2}>
                            <Typography variant="footnote">Active Sessions</Typography>
                            <Typography variant="h3">892</Typography>
                            <Typography variant="footnote">+5% from last month</Typography>
                        </Stack>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={4} grow>
                    <Box border legend="Recent Activity">
                        <Stack spacing={3}>
                            {#each ['User registered', 'Payment received', 'Order shipped'] as activity}
                                <Stack direction="row" spacing={2} align="center">
                                    <Box color="info" compact class="w-2 h-2 rounded-full"></Box>
                                    <Typography variant="footnote">{activity}</Typography>
                                </Stack>
                            {/each}
                        </Stack>
                    </Box>
                    <Box border legend="Quick Stats">
                        <Stack spacing={2}>
                            <Stack direction="row" justify="between">
                                <Typography variant="text">Conversion Rate</Typography>
                                <Typography variant="text" class="font-bold">3.2%</Typography>
                            </Stack>
                            <Stack direction="row" justify="between">
                                <Typography variant="text">Avg. Session</Typography>
                                <Typography variant="text" class="font-bold">5m 32s</Typography>
                            </Stack>
                            <Stack direction="row" justify="between">
                                <Typography variant="text">Bounce Rate</Typography>
                                <Typography variant="text" class="font-bold">42%</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    </Stack>
</Story>

<Story name="Form Layout">
    <Box border shadow legend="User Registration">
        <Stack spacing={4}>
            <Stack spacing={2}>
                <Typography variant="text" class="font-bold">Full Name</Typography>
                <TextArea rows={1} placeholder="Enter your name" />
            </Stack>

            <Stack spacing={2}>
                <Typography variant="text" class="font-bold">Email</Typography>
                <TextArea rows={1} placeholder="your@email.com" />
            </Stack>

            <Stack direction="row" spacing={4} grow>
                <Stack spacing={2}>
                    <Typography variant="text" class="font-bold">Country</Typography>
                    <TextArea rows={1} placeholder="Select country" />
                </Stack>
                <Stack spacing={2}>
                    <Typography variant="text" class="font-bold">Phone</Typography>
                    <TextArea rows={1} placeholder="+1 234 567 890" />
                </Stack>
            </Stack>

            <Stack direction="row" spacing={2} justify="end">
                <Button>Cancel</Button>
                <Button>Submit</Button>
            </Stack>
        </Stack>
    </Box>
</Story>

<Story name="Sidebar Layout">
    <Stack direction="row" spacing={0} class="h-screen">
        <Box color="sub-container" class="w-64 h-full" border>
            <Stack spacing={1} class="p-4">
                <Typography variant="h6" class="mb-2">Navigation</Typography>
                {#each ['Dashboard', 'Users', 'Settings', 'Reports', 'Help'] as item}
                    <Box ghost compact class="px-4 py-2 rounded hover:bg-surface">
                        <Typography variant="text">{item}</Typography>
                    </Box>
                {/each}
            </Stack>
        </Box>

        <Box class="flex-1">
            <Stack spacing={4} class="p-6">
                <Typography variant="h4">Main Content Area</Typography>
                <Box border shadow>
                    <Typography variant="text">Content goes here...</Typography>
                </Box>
                <Box border shadow>
                    <Typography variant="text">More content...</Typography>
                </Box>
            </Stack>
        </Box>
    </Stack>
</Story>

<Story name="Timeline">
    <Box border legend="Activity Timeline">
        <Stack spacing={4}>
            {#each [{ time: '2 hours ago', title: 'Task Completed', desc: 'Finished the UI redesign', color: 'success' }, { time: '5 hours ago', title: 'Meeting Scheduled', desc: 'Team sync at 3 PM', color: 'info' }, { time: '1 day ago', title: 'Issue Reported', desc: 'Bug in payment flow', color: 'warning' }] as event}
                <Stack direction="row" spacing={3}>
                    <Box color={event.color} compact class="w-3 h-3 rounded-full mt-1"></Box>
                    <Stack spacing={1} class="flex-1">
                        <Stack direction="row" justify="between" align="center">
                            <Typography variant="text" class="font-bold">{event.title}</Typography>
                            <Typography variant="footnote">{event.time}</Typography>
                        </Stack>
                        <Typography variant="footnote">{event.desc}</Typography>
                    </Stack>
                </Stack>
            {/each}
        </Stack>
    </Box>
</Story>

<Story name="Pricing Cards">
    <Stack direction="row" spacing={4} align="stretch" grow>
        {#each [{ name: 'Basic', price: '$9', features: ['10 GB Storage', '2 Users', 'Email Support'] }, { name: 'Pro', price: '$29', features: ['100 GB Storage', '10 Users', 'Priority Support'], highlight: true }, { name: 'Enterprise', price: '$99', features: ['Unlimited Storage', 'Unlimited Users', '24/7 Support'] }] as plan}
            <Box border shadow color={plan.highlight ? 'primary' : undefined}>
                <Stack spacing={4} align="center">
                    <Typography variant="h5">{plan.name}</Typography>
                    <Typography variant="h3">{plan.price}</Typography>
                    <Typography variant="footnote">per month</Typography>
                    <Stack spacing={2} class="w-full">
                        {#each plan.features as feature}
                            <Typography variant="footnote" class="text-center">{feature}</Typography>
                        {/each}
                    </Stack>
                    <Box color={plan.highlight ? 'secondary' : 'primary'} border compact class="px-8 py-2 w-full">
                        <Typography variant="text" class="text-center">Choose Plan</Typography>
                    </Box>
                </Stack>
            </Box>
        {/each}
    </Stack>
</Story>

<Story name="Nested Sections">
    <Stack spacing={4}>
        <Box border legend="Profile">
            <Stack spacing={4}>
                <Stack direction="row" spacing={4} align="center">
                    <Box color="primary" class="w-20 h-20 rounded-full"></Box>
                    <Stack spacing={1}>
                        <Typography variant="h5">Sarah Johnson</Typography>
                        <Typography variant="text">Senior Developer</Typography>
                    </Stack>
                </Stack>

                <Box border legend="Contact Information">
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <Typography variant="text" class="font-bold w-24">Email:</Typography>
                            <Typography variant="text">sarah@example.com</Typography>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Typography variant="text" class="font-bold w-24">Phone:</Typography>
                            <Typography variant="text">+1 234 567 8900</Typography>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Typography variant="text" class="font-bold w-24">Location:</Typography>
                            <Typography variant="text">San Francisco, CA</Typography>
                        </Stack>
                    </Stack>
                </Box>

                <Box border legend="Skills">
                    <Stack direction="row" spacing={2} wrap>
                        {#each ['JavaScript', 'TypeScript', 'Svelte', 'React', 'Node.js', 'Python'] as skill}
                            <Box color="info" compact class="px-3 py-1 rounded-full">
                                <Typography variant="footnote">{skill}</Typography>
                            </Box>
                        {/each}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    </Stack>
</Story>
